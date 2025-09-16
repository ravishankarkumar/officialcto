---
title: CAP Theorem & PACELC
description: Understanding the CAP theorem and PACELC trade-offs in distributed systems for high-level design interviews.
---

# CAP Theorem & PACELC

In distributed systems, **consistency, availability, and partition tolerance** cannot all be achieved at the same time.  
This trade-off is captured in the **CAP theorem**, and extended by the **PACELC model**.

---

## 1. CAP Theorem

Proposed by Eric Brewer, formalized by Gilbert & Lynch.

### The Three Properties
1. **Consistency (C)**  
   - Every read receives the most recent write (single, up-to-date view).  
   - Example: Banking system shows same balance on all servers.  

2. **Availability (A)**  
   - Every request receives a response (may not be latest data).  
   - Example: Amazon shopping cart always responds, even if slightly stale.  

3. **Partition Tolerance (P)**  
   - System continues to operate despite network partitions (communication failures).  
   - Example: Some servers can’t talk to others, but system still works.  

### The Trade-off
- In presence of a **network partition**, you must choose:  
  - **CP** → Consistent + Partition-tolerant (sacrifice availability).  
  - **AP** → Available + Partition-tolerant (sacrifice consistency).  

**Important**: You can’t avoid partition tolerance in real distributed systems.  
So the real trade-off is **C vs A** during partitions.  

---

## 2. PACELC Model

CAP only explains trade-offs **during a partition**.  
Daniel Abadi extended this with **PACELC**:

- **If Partition (P)** → trade-off between **Availability (A)** and **Consistency (C)**.  
- **Else (E)** (no partition) → trade-off between **Latency (L)** and **Consistency (C)**.  

### Examples
- **DynamoDB / Cassandra** → PA/EL (available, low latency, eventual consistency).  
- **Spanner** → PC/EC (consistent, higher latency, synchronous replication).  

---

## 3. Real-World Examples

- **AP Systems (Available, Eventually Consistent)**  
  - DynamoDB, Cassandra, CouchDB.  
  - Great for shopping carts, social media feeds.  

- **CP Systems (Consistent, Less Available during Partition)**  
  - HBase, ZooKeeper, Spanner.  
  - Great for banking, critical data systems.  

---

## 4. Interview Tips

- Always mention CAP when designing distributed DBs.  
- Say: *“In presence of partition, I’d choose availability over consistency for a social app, but consistency for a banking system.”*  
- Use **PACELC** to show advanced understanding: latency vs consistency trade-offs even when no partition exists.  
- Tie it back to real-world databases: DynamoDB (AP), Spanner (CP).  

---

## 5. Diagram (Simplified CAP)

```
        Consistency
           /\
          /  \
         /    \
        /      \
Availability----Partition Tolerance
```

---

## 6. Next Steps

- Learn about [Consensus Algorithms (Raft, Paxos)](/sections/hld/distributed/consensus.md).  
- Explore [Quorum Reads/Writes](/sections/hld/distributed/quorum.md).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
