---
title: Distributed Transactions & Patterns
description: Learn how distributed systems handle transactions across multiple nodes with 2PC, 3PC, Saga pattern, CQRS, and Event Sourcing.
---

# Distributed Transactions & Patterns

When applications scale across multiple databases or services, ensuring **data consistency** becomes difficult.  
Distributed transactions are techniques to **coordinate changes across multiple nodes** so that the system remains reliable.

This article covers **2PC, 3PC, Saga pattern, CQRS, and Event Sourcing.**

---

## 1. What is a Distributed Transaction?

A **transaction** is a unit of work that must be executed **atomically** (all or nothing).  

In a **single database**, ACID transactions make this easy.  
In **distributed systems**, transactions may span multiple services or databases, making coordination complex.

**Example:**  
Booking a trip involves:  
- Deducting money from the wallet DB.  
- Booking a flight in another DB.  
- Reserving a hotel in yet another DB.  

👉 If one fails, all must be rolled back.

---

## 2. Two-Phase Commit (2PC)

Classic protocol for distributed transactions.

### Phases:
1. **Prepare Phase**  
   - Coordinator asks all participants: *“Can you commit?”*  
   - Each participant replies: *“Yes”* or *“No”*.  

2. **Commit Phase**  
   - If all replied *Yes*, coordinator sends *Commit*.  
   - Otherwise, sends *Abort*.  

### Pros
- Guarantees atomicity.  
- Works for strong consistency.  

### Cons
- **Blocking**: If coordinator fails, participants may wait indefinitely.  
- Performance overhead.  
- Not scalable for high-throughput systems.  

👉 Still used in relational DB clusters, but less common in cloud-native systems.

---

## 3. Three-Phase Commit (3PC)

Extension of 2PC to reduce blocking.

### Phases:
1. **CanCommit** — Ask participants if they can commit.  
2. **PreCommit** — Coordinator sends a prepare-to-commit message.  
3. **DoCommit** — Final commit.  

### Improvements
- Participants can move forward without coordinator in some cases.  

### Cons
- Still complex.  
- Assumes network is reliable (not always true in real systems).  

---

## 4. Saga Pattern

Modern alternative for microservices.

### Concept
- Break a transaction into a sequence of **local transactions**.  
- Each local transaction has a **compensating action** if it fails.  

### Example (Trip Booking)
1. Book flight (local TX).  
2. Book hotel (local TX).  
3. Deduct payment (local TX).  

If hotel booking fails → **compensating action**: cancel flight.

### Orchestration vs Choreography
- **Orchestration**: Central saga coordinator manages flow.  
- **Choreography**: Services emit events and react to each other.  

### Pros
- Non-blocking.  
- Scales better than 2PC.  
- Works well in microservices.  

### Cons
- Complexity of compensating logic.  
- Possible intermediate inconsistent states.  

---

## 5. CQRS (Command Query Responsibility Segregation)

### Concept
- Separate the **write model (commands)** from the **read model (queries)**.  
- Write DB optimized for updates.  
- Read DB optimized for fast queries.  

### Example
- Writes go to OLTP DB (Postgres).  
- Reads go to denormalized store or cache (Elasticsearch, Redis).  

### Pros
- Scales reads independently.  
- Clear separation of concerns.  
- Enables event sourcing.  

### Cons
- Eventual consistency between write and read DB.  
- More moving parts.  

---

## 6. Event Sourcing

### Concept
- Instead of storing the current state, store a **log of events**.  
- Current state = replay of all past events.  

### Example (Bank Account)
- `Deposit $100`  
- `Withdraw $50`  
- Balance = $50 (recomputed from events).  

### Pros
- Complete audit trail.  
- Enables time-travel debugging.  
- Works well with CQRS.  

### Cons
- Event log can grow large (needs snapshots).  
- Harder to query current state directly.  

---

## 7. Comparing Patterns

| Pattern       | Guarantees           | Use Case                          | Trade-Offs                  |
|---------------|----------------------|-----------------------------------|-----------------------------|
| **2PC**       | Strong consistency   | Traditional DB clusters           | Blocking, low scalability   |
| **3PC**       | Non-blocking attempt | Research / niche systems          | Assumes reliable network    |
| **Saga**      | Eventual consistency | Microservices, cloud-native apps  | Complex compensations       |
| **CQRS**      | Eventual consistency | Read-heavy systems                | Data duplication            |
| **Event Sourcing** | Auditability    | Financial, audit-heavy systems    | Event log complexity        |

---

## 8. Interview Tips

- If asked *“How do you ensure consistency across services?”*:  
  - Mention **2PC** for strong guarantees.  
  - Mention **Saga** for microservices.  
  - Mention **CQRS + Event Sourcing** for scalability.  

👉 Example Answer:  
*“For a microservices architecture, I’d avoid 2PC because it blocks and reduces scalability. Instead, I’d use the Saga pattern with compensating actions. For read-heavy systems, I’d add CQRS so that writes and reads scale independently. If auditability is required, I’d combine it with event sourcing.”*

---

## 9. Recap

- **2PC**: Strong consistency, blocking.  
- **3PC**: Adds non-blocking, still complex.  
- **Saga**: Event-driven, scalable, eventual consistency.  
- **CQRS**: Separate read/write, great for scaling reads.  
- **Event Sourcing**: Store events, not state — great for auditability.  

---

## Next Steps
👉 Continue with [Polyglot Persistence & System Design Patterns](/sections/database/polyglot-persistence.md) to see how different databases and patterns come together in real-world systems.

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
