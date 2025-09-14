---
title: Database Internals
description: Learn the internal mechanisms that make modern databases work — write-ahead logs, MVCC, SSTables, LSM trees, and consensus algorithms.
---

# Database Internals

To understand how databases achieve **performance, reliability, and consistency**, it helps to know their **internal mechanics**.  
These concepts are often called *database jargons* but they form the foundation of scaling and reliability.

---

## 1. Write-Ahead Log (WAL)

### Concept
- All changes are first written to a **log on disk** before being applied to the main data files.  
- Ensures durability — if the system crashes, it can replay the log.  

### Example
- PostgreSQL → WAL.  
- MySQL (InnoDB) → redo log.  

**Key Benefit:** *Guarantees durability (D in ACID).*  

---

## 2. Multi-Version Concurrency Control (MVCC)

### Concept
- Allows multiple readers/writers without blocking.  
- Instead of overwriting data, DB creates **new versions**.  

### Example
- PostgreSQL → old row versions kept until vacuumed.  
- Oracle, MySQL (InnoDB) also use MVCC.  

**Key Benefit:** *High concurrency without read locks.*  

---

## 3. B-Trees & SSTables

### B-Trees
- Balanced tree data structure.  
- Widely used for **indexes** in relational DBs.  

### SSTables (Sorted String Tables)
- Immutable, sorted files written sequentially.  
- Paired with **LSM trees** in NoSQL DBs.  

---

## 4. Log-Structured Merge Trees (LSM Trees)

### Concept
- Write-heavy optimization:  
  - Writes go to a **memtable** (in-memory).  
  - Flushed to SSTables sequentially.  
  - Periodically compacted (merge sort).  

### Examples
- Cassandra, RocksDB, LevelDB, HBase.  

**Trade-off:**  
- Faster writes.  
- Reads slower (must check multiple SSTables).  

---

## 5. Consensus Algorithms

Distributed databases need agreement across nodes.  

### Raft
- Leader-based consensus.  
- Simpler than Paxos, widely adopted.  
- Used in etcd, CockroachDB.  

### Paxos
- More complex, but strong theoretical foundation.  
- Used in Google Chubby lock service.  

### ZAB (Zookeeper Atomic Broadcast)
- Used in Apache Zookeeper.  

**Use Case:** *Leader election, replication consistency, fault tolerance.*  

---

## 6. Consistent Hashing

### Concept
- Hashing technique for distributing keys across nodes.  
- When nodes are added/removed, only a small portion of keys need to be remapped.  

### Examples
- DynamoDB, Cassandra.  

**Key Benefit:** *Smooth scaling and rebalancing.*  

---

## 7. Bloom Filters

### Concept
- Probabilistic data structure for set membership.  
- Answers: “Is key **possibly** in set?”  
- Reduces unnecessary disk lookups.  

### Examples
- Used in Cassandra, HBase with SSTables.  

**Trade-off:**  
- False positives possible.  
- No false negatives.  

---

## 8. Quorum Reads/Writes

### Concept
- In replicated systems, not all replicas need to agree.  
- Use quorum: majority of nodes must acknowledge.  

### Example
- Cassandra uses tunable consistency:  
  - `QUORUM` = majority of replicas.  
  - `ONE`, `ALL` also possible.  

**Trade-off:**  
- Stronger consistency → higher latency.  
- Weaker consistency → better availability.  

---

## 9. Recap

- **WAL** → durability.  
- **MVCC** → concurrency.  
- **B-Trees / SSTables** → storage structures.  
- **LSM Trees** → write optimization.  
- **Consensus (Raft, Paxos)** → distributed consistency.  
- **Consistent Hashing** → smooth sharding.  
- **Bloom Filters** → faster lookups.  
- **Quorums** → balance consistency & availability.  

---

## Interview Tip

When asked about **database internals** in interviews:
- Mention WAL + MVCC for RDBMS.  
- Mention LSM + SSTables for NoSQL.  
- Mention Raft/Paxos for distributed DBs.  
- Bonus: Explain trade-offs (e.g., LSM better for writes, B-Trees better for reads).  

---

## Next Steps
👉 Revisit [Sharding vs Replication](/sections/database/sharding-vs-replication.md) and [Scaling Patterns](/sections/database/scaling-patterns.md) to see how these internals play into distributed scaling.

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
