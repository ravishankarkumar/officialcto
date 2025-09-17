---
title: Quorum Reads & Writes
description: Understanding quorum-based consistency in distributed systems, how quorum reads/writes work, and their trade-offs in system design.
---

# Quorum Reads & Writes

In distributed databases, **quorum reads/writes** ensure consistency across replicas.  
Instead of requiring **all nodes** to agree, a quorum allows progress with a **majority of nodes**.

---

## 1. What is a Quorum?

A **quorum** is the minimum number of votes needed to make a decision in a distributed system.  
For reads/writes:  
- **Read Quorum (R)** = number of replicas that must respond for a read.  
- **Write Quorum (W)** = number of replicas that must acknowledge a write.  

Given **N replicas**:  
- For strong consistency → `R + W > N`.  
- Ensures at least one replica in read quorum overlaps with write quorum.  

---

## 2. Example

Let’s say **N = 3 replicas**.

- **Strong Consistency**:  
  - `W = 2`, `R = 2`.  
  - At least one replica is guaranteed to have latest write.  

- **High Availability (weaker consistency)**:  
  - `W = 1`, `R = 1`.  
  - Faster, but reads may return stale data.  

---

## 3. Trade-offs

| Setting      | Pros                     | Cons                           |
|--------------|--------------------------|--------------------------------|
| Strong (R+W > N) | Consistent reads guaranteed | Higher latency, lower availability |
| Weak (R+W ≤ N)   | Fast, highly available     | Reads may be stale              |

---

## 4. Real-World Databases

- **Cassandra / DynamoDB** → tunable consistency: choose R & W per query.  
- **MongoDB** → read preferences (primary, secondary, majority).  
- **CockroachDB / Spanner** → quorum-based with strong consistency.  

---

## 5. Interview Tips

- Mention quorum when asked about **consistency in replication**.  
- Say: *“If I want strong consistency, I’d ensure R + W > N. If I want lower latency, I’d relax this.”*  
- Bring up tunable consistency (Cassandra) as a real-world example.  
- Always tie back to CAP theorem trade-offs.  

---

## 6. Diagram (N=3, Quorum Example)

```
   Replicas: [ R1 ] [ R2 ] [ R3 ]

   Write (W=2): R1 + R2 must ack.
   Read (R=2):  R2 + R3 must respond.

   Overlap → ensures latest data read.
```

---

## 7. Next Steps

- Learn about [Leader Election & Failover](/interview-section/hld/distributed/leader-election.md).  
- Explore [Eventual vs Strong Consistency](/interview-section/hld/distributed/consistency-tradeoffs.md).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
