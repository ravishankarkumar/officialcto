# Event Sourcing — 20 minute lesson (Java-first)

**Estimated time:** 20 minutes

**Goal:** Understand intent, participants, structure, a practical Java-based example (commands, events, aggregate, in-memory event store, replay), trade-offs, and how to explain the pattern in interviews. Includes tips for snapshots, versioning, and testing.

---

## 1. Motivation / When to use

Event Sourcing records all changes to application state as a sequence of immutable events instead of persisting the current state. The current state is derived by replaying events. This approach is useful when you need:
- An audit log of every change (who/when/what).
- Temporal queries ("what did the state look like at time T?").
- Ability to rebuild state, debug by replaying events, or project multiple read models.
- Integration by publishing events to other systems.

Common scenarios: financial systems, order processing, complex domain logic, CQRS (Command Query Responsibility Segregation) setups.

---

## 2. Intent (one-liner)

Persist domain state as an append-only stream of domain events and reconstruct state by replaying those events.

---

## 3. Participants

- **Event:** Immutable record of a domain fact (e.g., `OrderPlaced`).
- **Aggregate / AggregateRoot:** Applies events to mutate its state in-memory and emits new events in response to commands.
- **Command:** Intent to perform an action (e.g., `PlaceOrderCommand`). Commands are handled by aggregates or command handlers and produce events.
- **EventStore (append-only):** Persists events in order per aggregate stream.
- **Projector / Read Model:** Consumes events to build query-optimized read models.
- **Snapshot Store (optional):** Stores periodic snapshots of aggregate state to speed up recovery.

---

## 4. Structure (high-level)

```
Client -> CommandHandler -> Aggregate (apply command -> produce events)
Aggregate emits events -> EventStore.append(streamId, events)
EventStore -> durable storage (append-only)
Projectors subscribe -> update read models
To rebuild: EventStore.load(streamId) -> replay events -> Aggregate loads state
```

---

## 5. Java example (concise, runnable sketches)

The example shows an `Account` aggregate with deposit/withdraw commands and an in-memory event store to persist and replay events.

```java
// Event.java
public interface Event { String getType(); }

// AccountEvents.java
public class MoneyDeposited implements Event {
    public final long amount;
    public MoneyDeposited(long amount) { this.amount = amount; }
    public String getType() { return "MoneyDeposited"; }
}
public class MoneyWithdrawn implements Event {
    public final long amount;
    public MoneyWithdrawn(long amount) { this.amount = amount; }
    public String getType() { return "MoneyWithdrawn"; }
}

// Account.java (AggregateRoot)
import java.util.*;
public class Account {
    private UUID id;
    private long balance = 0;
    private int version = 0; // optimistic concurrency
    private final List<Event> uncommitted = new ArrayList<>();

    public Account(UUID id) { this.id = id; }

    // Command handlers
    public void deposit(long amount) {
        if (amount <= 0) throw new IllegalArgumentException("amount>0");
        applyAndCollect(new MoneyDeposited(amount));
    }
    public void withdraw(long amount) {
        if (amount <= 0) throw new IllegalArgumentException("amount>0");
        if (balance < amount) throw new IllegalStateException("insufficient funds");
        applyAndCollect(new MoneyWithdrawn(amount));
    }

    // event applier
    private void apply(Event e) {
        if (e instanceof MoneyDeposited) {
            balance += ((MoneyDeposited)e).amount;
        } else if (e instanceof MoneyWithdrawn) {
            balance -= ((MoneyWithdrawn)e).amount;
        }
        version++;
    }

    private void applyAndCollect(Event e) {
        apply(e);
        uncommitted.add(e);
    }

    public List<Event> getUncommitted() { return Collections.unmodifiableList(uncommitted); }
    public void clearUncommitted() { uncommitted.clear(); }

    // replay
    public static Account replay(UUID id, List<Event> history) {
        Account a = new Account(id);
        for (Event e : history) a.apply(e);
        a.clearUncommitted();
        return a;
    }

    public long getBalance() { return balance; }
    public int getVersion() { return version; }
}

// EventStore.java
import java.util.*;
public interface EventStore {
    void append(UUID streamId, int expectedVersion, List<Event> events) throws ConcurrencyException;
    List<Event> load(UUID streamId);
}

// InMemoryEventStore.java
import java.util.concurrent.ConcurrentHashMap;
public class InMemoryEventStore implements EventStore {
    private final Map<UUID, List<Event>> store = new ConcurrentHashMap<>();
    private final Map<UUID, Integer> versions = new ConcurrentHashMap<>();

    public void append(UUID streamId, int expectedVersion, List<Event> events) throws ConcurrencyException {
        store.putIfAbsent(streamId, new ArrayList<>());
        int current = versions.getOrDefault(streamId, 0);
        if (current != expectedVersion) throw new ConcurrencyException();
        store.get(streamId).addAll(events);
        versions.put(streamId, current + events.size());
    }

    public List<Event> load(UUID streamId) {
        return Collections.unmodifiableList(store.getOrDefault(streamId, Collections.emptyList()));
    }
}

// ConcurrencyException.java
public class ConcurrencyException extends RuntimeException {}

// CommandHandler (coordinator)
public class AccountService {
    private final EventStore store;
    public AccountService(EventStore store) { this.store = store; }

    public void handleDeposit(UUID accountId, long amount) {
        var history = store.load(accountId);
        var account = Account.replay(accountId, history);
        account.deposit(amount);
        var events = account.getUncommitted();
        store.append(accountId, account.getVersion() - events.size(), events);
        account.clearUncommitted();
    }
}
```

**How it works:**
1. Load historical events for aggregate `accountId` and `replay` to get current state.
2. Apply command on aggregate — it `applyAndCollect` new events.
3. Append uncommitted events to the `EventStore` with optimistic concurrency (expectedVersion).

---

## 6. Snapshots and optimization

Replaying thousands of events can be slow. Use snapshots:
- Periodically persist aggregate state (snapshot) with its version.
- During load, start from latest snapshot and replay only subsequent events.

Snapshot example (concept): store `(version, serializedState)` per aggregate and use it as a loading starting point.

---

## 7. Projections / Read models

Projectors subscribe to the event stream (or read events from the store) and update read models (SQL tables, caches, search indexes). These are denormalized representations optimized for queries.

---

## 8. Versioning & compatibility

Event schema evolves. Strategies:
- Add new fields with defaults (backward-compatible changes).
- Use upcasters: transform old event shapes into current shape during load.
- Version events explicitly and store serializer metadata.

---

## 9. Pros & Cons

**Pros:**
- Full audit trail and time-travel debugging.
- Natural integration points (events can be published to other systems).
- Enables CQRS and high-performance read models.

**Cons:**
- Increased complexity vs CRUD. Requires careful thinking about consistency, ordering, idempotency.
- Event versioning and migration are challenging.
- Operational overhead: storage, backups, retention policies, projections.

---

## 10. Testing & debugging

- Unit-test command handling by constructing aggregates, applying commands, and asserting emitted events.
- Integration test by wiring in-memory event store and asserting projections.
- Replay event logs in a staging environment to validate projections.

---

## 11. Implementation tips

- Make events immutable data objects; prefer explicit fields over unstructured payloads.
- Use idempotent consumers (projectors) — process events with deduplication via event sequence numbers.
- Ensure tuple (streamId, sequence) uniqueness in event store for ordering.
- Keep command validation inside aggregate to maintain invariants.
- Use optimistic concurrency (version check) to detect conflicting updates.
- Consider at-least-once vs exactly-once delivery semantics for projections and external consumers.

---

## 12. Alternatives and when not to use

- For simple CRUD apps without complex audit/time-travel needs, prefer standard ACID-backed models with transactions.
- Event sourcing shines when auditability, complex workflows, or integration are top priorities.

---

## 13. Interview checklist (how to explain in 2–3 minutes)

1. Intent: persist state as a stream of events and rebuild state by replaying them.
2. Core elements: Events, Aggregate, EventStore, Projector, Snapshot.
3. Walk through sequence: command -> aggregate -> events -> append -> projector.
4. Mention optimistic concurrency, snapshots, and event versioning.
5. Trade-offs: power vs complexity.

---

## 14. Quick quiz (2 questions)

1. How do you prevent lost updates when multiple clients modify the same aggregate? (Answer: optimistic concurrency with expected version checks.)
2. Name one strategy for handling changes in event schema. (Answer: upcasters, versioned events, default values.)

---

## 15. References / further reading
- Martin Fowler — Event Sourcing articles
- Greg Young — presentations and articles on Event Sourcing and CQRS
- "Designing Data-Intensive Applications" — for storage and replication patterns

*Prepared for: interview-section/architecture — Event Sourcing (Java-first)*

