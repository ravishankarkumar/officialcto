# CQRS (Command Query Responsibility Segregation) — 20 minute lesson (Java-first)

**Estimated time:** 20 minutes

**Goal:** Understand the intent, participants, architecture, a practical Java-based example (command model, query model, event publishing), trade-offs, and how to explain CQRS in interviews. Includes tips for consistency, scaling, testing, and patterns often used with CQRS (Event Sourcing).

---

## 1. Motivation / When to use

CQRS separates the responsibility for handling **commands** (writes) from **queries** (reads). Instead of a single model handling both, CQRS uses distinct models and often separate data stores optimized for their purpose. Use CQRS when:
- Read and write workloads have different scalability needs.
- Read side needs denormalized, performant views for UI/analytics.
- Complex domain logic or different consistency/latency requirements exist between reads and writes.
- Pairing with Event Sourcing for a complete audit/log and multi-model projections.

Not every app needs CQRS — it adds operational and conceptual complexity.

---

## 2. Intent (one-liner)

Separate the models and data stores used for updates (commands) and queries to optimize and scale each independently.

---

## 3. Core Concepts & Participants

- **Command:** Imperative message expressing intent to change state (e.g., `CreateOrderCommand`).
- **Command Handler / Write Model:** Validates command, enforces business invariants, and produces events or updates the write database.
- **Event (optional):** Immutable facts emitted by the write model; used to update projections.
- **Read Model / Query Model / Projections:** Denormalized data structures optimized for queries. Built from events or direct replication from write DB.
- **Query:** Read-only request returning data (e.g., `GetOrderSummaryQuery`).
- **Query Handler / Read Store:** Executes queries against read-optimized store (SQL, NoSQL, caches).
- **Message Bus / Event Bus:** Transport for events and integration between components.

CQRS is an architectural style rather than a concrete framework — it can be implemented with synchronous or asynchronous communication between write and read sides.

---

## 4. High-level architecture

```
Client -> Command -> CommandHandler (Write Model) -> (persist / emit Events)
Events -> Projectors -> update Read Model
Client -> Query -> QueryHandler (Read Model) -> return data
```

Variants:
- **Synchronous CQRS:** Command handler updates both write DB and read DB synchronously (simpler, tighter coupling).
- **Asynchronous CQRS:** Command handler persists events or writes to write DB; projectors consume events and update read DB asynchronously (eventual consistency between write and read sides).

---

## 5. Java example (concise sketch)

This example shows a simple flow: command -> write model -> publish event -> projector updates read repository; queries read from read repository.

```java
// Commands
public class CreateOrderCommand { public final UUID orderId; public final String product; public CreateOrderCommand(UUID id, String p){ this.orderId = id; this.product = p; } }

// Events
public interface Event {}
public class OrderCreated implements Event { public final UUID orderId; public final String product; public OrderCreated(UUID id, String p){ this.orderId = id; this.product = p; } }

// Write-side Aggregate (simple)
public class OrderAggregate {
    private UUID id; private String product; private boolean created = false;
    private final List<Event> uncommitted = new ArrayList<>();

    public void handle(CreateOrderCommand cmd) {
        if (created) throw new IllegalStateException("already created");
        apply(new OrderCreated(cmd.orderId, cmd.product));
    }
    private void apply(Event e){
        if (e instanceof OrderCreated) { this.id = ((OrderCreated)e).orderId; this.product = ((OrderCreated)e).product; this.created = true; }
        uncommitted.add(e);
    }
    public List<Event> getUncommitted(){ return Collections.unmodifiableList(uncommitted); }
    public void clearUncommitted(){ uncommitted.clear(); }
}

// Simple EventBus
public interface EventBus { void publish(Event e); }

// Projector (updates read model)
public class OrderProjector {
    private final OrderReadRepository readRepo; // e.g., SQL table
    public void on(OrderCreated e){ readRepo.save(new OrderSummary(e.orderId, e.product)); }
}

// Read repository & DTO
public class OrderSummary { public UUID id; public String product; public OrderSummary(UUID id,String p){ this.id=id;this.product=p;} }
public interface OrderReadRepository { void save(OrderSummary s); Optional<OrderSummary> findById(UUID id); }

// Command handler wiring (coordinator)
public class OrderCommandHandler {
    private final EventStore eventStore; private final EventBus bus; // eventStore could be DB or ES
    public void handle(CreateOrderCommand cmd){
        var agg = new OrderAggregate();
        agg.handle(cmd);
        eventStore.append(cmd.orderId, agg.getUncommitted());
        agg.getUncommitted().forEach(bus::publish);
        agg.clearUncommitted();
    }
}
```

**Notes:** This is a minimal sketch. In production you’ll have persistence, optimistic concurrency, transactions, and retries.

---

## 6. Consistency models

- **Strong consistency (synchronous):** Read model updated within same transaction — simpler but limits scalability and decoupling.
- **Eventual consistency (asynchronous):** Read model is updated asynchronously via events — scalable but clients must handle stale reads and possibly wait for read model to catch up.

Patterns to mitigate eventual consistency:
- Return a resource location or the newly-created resource from the command response.
- Use client-side polling with backoff until read model reflects the change.
- Provide query APIs that read from the write model for critical reads.

---

## 7. Scaling and performance

- Scale read side independently: multiple read replicas, caching, specialized DBs (Elasticsearch, Redis).
- Scale write side by partitioning aggregates (sharding by aggregate id) and using bounded contexts.
- Use projections to precompute expensive joins or aggregates.

---

## 8. Testing & deployment tips

- Unit-test command handlers and aggregates by asserting emitted events and state transitions.
- Integration-test projections by wiring EventBus and in-memory read repositories.
- Use consumer groups and idempotent projectors to handle at-least-once delivery semantics.
- Deploy read model updaters and projectors as independent services for operational isolation.

---

## 9. When to combine with Event Sourcing

CQRS and Event Sourcing are complementary: the write model persists events (event store) and projectors build read models. Event Sourcing gives a complete audit trail and easier projector rebuilding, but adds event versioning and operational overhead.

---

## 10. Pros & Cons

**Pros:**
- Optimized read and write models, independent scaling.
- Clear separation of concerns; easier to implement specialized read models.
- Better alignment for complex domains and analytics.

**Cons:**
- Added system complexity: more components, messaging, eventual consistency.
- Operational burden: monitoring, backups, replaying events, migrations.
- Not worth it for simple CRUD apps.

---

## 11. Anti-patterns & pitfalls

- Overusing CQRS: applying it to simple CRUD increases complexity unnecessarily.
- Mixing transactional updates across read and write stores without guarantees.
- Poorly designed events that leak persistence details or lack versioning.
- Non-idempotent projectors that fail on retries and corrupt read models.

---

## 12. Interview checklist (how to explain in 2–3 minutes)

1. Intent: separate read/write models to optimize each.
2. Main elements: Command, CommandHandler (write), Events, Projectors, Read Model, QueryHandler.
3. Explain consistency (sync vs async) and trade-offs.
4. Mention when to use (scaling, complex reads) and when not to use (simple CRUD).
5. If relevant, mention Event Sourcing pairing and snapshotting.

---

## 13. Quick quiz (2 questions)

1. What’s a common consequence of asynchronous CQRS and how do you mitigate it? (Answer: eventual consistency; mitigate by returning location, polling, or reading from write model for critical reads.)
2. Why might you shard by aggregate id in a CQRS system? (Answer: to scale write-side throughput and keep aggregates independent.)

---

## 14. References / further reading
- Microsoft patterns & practices on CQRS and Event Sourcing
- Greg Young — CQRS/ES talks
- "Building Microservices" and "Designing Data-Intensive Applications" for architectural context

*Prepared for: interview-section/architecture — CQRS (Java-first)*