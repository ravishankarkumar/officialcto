---
title: Database Jargons Every Engineer Should Know
description: A deep dive into key database internals like WAL, SSTable, LSM Tree, MVCC, Consensus protocols, and more. Perfect for HLD interviews and real-world system design.
---

# Database Jargons Every Engineer Should Know

## 1. Introduction
When you dive into system design or database internals, you’ll quickly run into terms like **WAL, SSTable, B-Tree, LSM Tree, Paxos, Raft, Consistent Hashing**, and more.  

These aren’t just buzzwords — they describe the *internal mechanics* of how modern databases guarantee **reliability, scalability, and performance**.  

This article explains the most important jargons in a way that prepares you for **High-Level Design (HLD) interviews** and helps you reason about trade-offs in real-world systems.  

---

## 2. Core Jargons

### 2.1 Write-Ahead Log (WAL)
- **Definition**: An append-only log where every change is recorded before applying it to the main database.  
- **Purpose**: Ensures durability and crash recovery.  
- **Used in**: PostgreSQL, MySQL (InnoDB), HDFS JournalNodes.  
- **Analogy**: Like keeping receipts before updating your bank account.  

---

### 2.2 SSTable (Sorted String Table)
- **Definition**: Immutable, sorted files of key-value pairs stored on disk.  
- **Why it matters**: Enables fast sequential writes and efficient range scans.  
- **Used in**: Cassandra, Bigtable, LevelDB, RocksDB.  
- **How it works**:
  1. Data first written to **MemTable (in-memory)**
  2. Flushed to disk as an **SSTable**
  3. **Compaction** merges SSTables for efficiency  

---

### 2.3 B-Tree & B+Tree
- **Definition**: Balanced tree data structures used for indexing.  
- **Why**: Keeps read/write operations logarithmic (O(log n)).  
- **Used in**: MySQL (InnoDB), PostgreSQL.  
- **B+Tree variation**: Internal nodes store keys, leaf nodes store values + linked list for fast range queries.  

---

### 2.4 LSM Tree (Log Structured Merge Tree)
- **Definition**: Write-optimized data structure that batches writes in memory, then flushes them to disk as SSTables.  
- **Strength**: High write throughput.  
- **Weakness**: Reads can be slower (need to check multiple SSTables).  
- **Used in**: Cassandra, LevelDB, RocksDB, HBase.  

---

### 2.5 Journal / Redo Log
- **Definition**: A log of committed transactions used to replay changes after a crash.  
- **Difference from WAL**: WAL is more general, journal is specific to file systems/databases.  
- **Used in**: EXT4 file system, MongoDB (journaling), InnoDB redo logs.  

---

### 2.6 Checkpoint
- **Definition**: A snapshot of database state written periodically to avoid replaying the entire WAL after crash.  
- **Why**: Speeds up recovery.  
- **Used in**: PostgreSQL, MySQL.  

---

### 2.7 MVCC (Multi-Version Concurrency Control)
- **Definition**: Stores multiple versions of a row to allow readers and writers to work concurrently.  
- **Tradeoff**: Higher storage usage, but avoids locking.  
- **Used in**: PostgreSQL, Oracle, MySQL (InnoDB).  

---

### 2.8 Consensus Protocols (Paxos, Raft, ZAB)
- **Definition**: Algorithms that help distributed databases agree on a single truth despite failures.  
- **Examples**:  
  - **Raft**: Simpler consensus protocol (used in etcd, CockroachDB).  
  - **Paxos**: Theoretical foundation (used in Google Spanner).  
  - **ZAB**: Used in Apache Zookeeper.  

---

### 2.9 Gossip Protocol
- **Definition**: Peer-to-peer communication method where nodes share state info gradually.  
- **Why**: Helps large distributed DBs scale without centralized coordination.  
- **Used in**: Cassandra, DynamoDB.  

---

### 2.10 Consistent Hashing
- **Definition**: Hashing technique to evenly distribute keys across nodes with minimal reshuffling when nodes are added/removed.  
- **Used in**: DynamoDB, Cassandra, caching systems (Memcached).  

---

## 3. Trade-Offs & Interview Tips
- **B-Tree vs LSM Tree**: B-Trees better for reads, LSM better for writes.  
- **WAL vs Journaling**: WAL is universal, journaling more about file systems.  
- **Consensus protocols**: Raft easier to explain in interviews, Paxos is theoretically deeper.  

---

## 4. Diagram Section
*(You can include visual diagrams here for better clarity)*  
- WAL flow diagram (Client → WAL → Data Files → Checkpoint).  
- LSM Tree workflow (MemTable → SSTable → Compaction).  
- B+Tree indexing example.  
- Consistent Hashing ring.  

---

## 5. Conclusion
By understanding these jargons, you not only impress interviewers but also gain real intuition about **why databases behave the way they do**.  

Whether it’s Postgres, Cassandra, or MongoDB, these concepts are the foundation of reliable, scalable storage systems.  

---

👉 Next Steps: Pair this with our article on [SQL vs NoSQL databases](/sections/hld/fundamentals/database-sql-vs-nosql.md) and [Scaling to Millions of Users](/sections/hld/scaling-to-millions-users.md) for complete HLD prep.


---
<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
