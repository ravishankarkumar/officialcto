---
title: Databases in System Design
description: A deep dive into SQL and NoSQL databases, their types, tradeoffs, internal structures, scaling strategies, and how to choose the right one in high-level design interviews.
---

# Databases in System Design

## 1. Introduction
Databases form the backbone of almost every system design. Choosing the right database, understanding its tradeoffs, and knowing how to scale it are key skills for both building real-world systems and succeeding in HLD interviews.

In this article, we’ll cover:
- Types of databases (SQL & NoSQL).
- Tradeoffs and when to choose one over another.
- CAP theorem and consistency tradeoffs.
- Internal structures and storage mechanisms.
- Scaling strategies.
- Popular databases and their use cases.

---

## 2. Broad Classification

### 2.1 Relational Databases (SQL)
- **Examples:** MySQL, PostgreSQL, Oracle, MS SQL Server.
- **Characteristics:**
  - Data stored in structured tables with rows and columns.
  - Rigid schema (enforces data integrity).
  - Support for complex joins and transactions (ACID guarantees).
- **Best for:** Strong consistency, financial apps, systems with structured data and relationships.

---

### 2.2 NoSQL Databases
NoSQL databases trade strict relational guarantees for flexibility, scalability, and performance.

#### (a) Document-Based
- **Examples:** MongoDB, CouchDB.
- **Data Model:** JSON-like documents (key-value pairs, nested structures).
- **When to Use:** Flexible schema, hierarchical data, fast iteration, unstructured/semi-structured data.
- **MongoDB Spotlight:**
  - Documents stored as BSON.
  - Secondary indexes, sharding, replica sets.
  - Internals: Uses **B-trees** for indexes, **journaling** for durability.

#### (b) Key-Value Stores
- **Examples:** Redis, DynamoDB, Riak.
- **Data Model:** Simple dictionary-like key-value pairs.
- **When to Use:** Caching, sessions, leaderboards, very fast lookups.
- **Tradeoff:** No rich querying. Optimized for speed.

#### (c) Columnar Databases
- **Examples:** Cassandra, HBase, Bigtable.
- **Data Model:** Data stored by columns instead of rows.
- **When to Use:** Write-heavy workloads, analytics, time-series data.
- **Internals:** Built on **LSM Trees** + **SSTables** (append-only, compacted for efficiency).

#### (d) Graph Databases
- **Examples:** Neo4j, ArangoDB, JanusGraph.
- **Data Model:** Nodes (entities) + Edges (relationships).
- **When to Use:** Social networks, recommendation engines, fraud detection.
- **Tradeoff:** Harder to scale horizontally.

---

## 3. How to Choose: SQL vs NoSQL

### SQL (Relational)
✅ ACID transactions  
✅ Strong consistency  
✅ Joins, complex queries  
❌ Harder to scale horizontally  
❌ Schema rigidity  

### NoSQL
✅ Flexible schema  
✅ Easy horizontal scaling (sharding, replication)  
✅ Optimized for specific workloads  
❌ Often weaker consistency (eventual consistency in distributed systems)  
❌ Limited support for joins/transactions  

---

## 4. CAP Theorem in Practice
- **Consistency:** Every read receives the latest write.  
- **Availability:** Every request gets a response, even if not the latest.  
- **Partition Tolerance:** System continues despite network splits.  

➡️ You can only guarantee **two out of three** in distributed systems:
- **CP systems (Consistency + Partition tolerance):** MongoDB, HBase.  
- **AP systems (Availability + Partition tolerance):** DynamoDB, Cassandra.  

---

## 5. Performance & Indexing
- **SQL Databases:** Use **B+ Trees** for indexes, optimized for range queries.  
- **MongoDB:** Uses **B-trees**, supports compound indexes, text indexes, geospatial indexes.  
- **LSM Tree-based DBs (Cassandra, HBase):** Optimized for high write throughput.  
- **Redis:** Uses **hash tables** and **skip lists** internally for sorted sets.  

---

## 6. Internal Structures & Storage

- **Write-Ahead Log (WAL) / Journaling:** Ensures durability by logging before applying changes. (Postgres, MongoDB, MySQL InnoDB).  
- **SSTables (Sorted String Tables):** Immutable, append-only files used in LSM-tree databases (Cassandra, HBase).  
- **Memtables:** In-memory component before flushing to SSTables.  
- **B/B+ Trees:** Balanced trees used for indexes (MySQL, Postgres, MongoDB).  
- **Skip Lists:** Used in Redis for sorted sets.  

---

## 7. Scaling Each Database

### SQL
- **Vertical scaling:** Bigger servers (limited).  
- **Replication:** Master-slave or master-replica.  
- **Sharding:** Harder to implement (manual partitioning).  

### Document DBs (MongoDB)
- **Sharding:** Built-in, shard key selection is critical.  
- **Replication:** Replica sets for HA and durability.  
- **Tradeoff:** Joins are limited → sometimes denormalization is needed.  

### Key-Value Stores (Redis, DynamoDB)
- **Horizontal partitioning:** Natural, since access is key-based.  
- **Replication:** Leader-follower or consistent hashing.  
- **Tradeoff:** Limited querying capabilities.  

### Columnar DBs (Cassandra, HBase)
- **Designed for scale-out.**  
- Consistent hashing, peer-to-peer replication.  
- Write-heavy workloads, but range queries are harder.  

### Graph DBs
- **Harder to shard.**  
- Mostly scale vertically.  
- Tradeoff: Scalability vs query expressiveness.  

---

## 8. When NOT to Choose

- **SQL:** Not great for rapidly evolving schemas or massive scale with unstructured data.  
- **MongoDB (Document DB):** Avoid for heavy joins, multi-document ACID transactions across large sets.  
- **Redis (Key-Value):** Don’t use as a primary database — it’s in-memory (expensive).  
- **Cassandra (Columnar):** Not ideal for strong consistency or relational queries.  
- **Graph DBs:** Poor fit if data doesn’t have rich relationships.  

---

## 9. Popular Examples & Use Cases
- **MySQL/Postgres:** Banking, e-commerce, SaaS apps.  
- **MongoDB:** Content management, IoT, analytics.  
- **Redis:** Caching, leaderboards, rate limiting.  
- **Cassandra:** Messaging, logging, time-series.  
- **Neo4j:** Social graphs, recommendations.  

---

## 10. Interview Tips
- Always justify *why* you choose a particular DB.  
- Mention **tradeoffs explicitly** (consistency vs availability, query flexibility vs scaling).  
- Use real examples (e.g., "Instagram uses Cassandra for scale, but MySQL for core transactions").  
- Bring in **scaling strategies**: replication, sharding, indexing, caching.  

---

## 11. Conclusion
There is no “one-size-fits-all” database. Each comes with tradeoffs. The right choice depends on access patterns, consistency requirements, and scaling needs. For HLD interviews, being able to reason about these tradeoffs is more important than memorizing features.


---
<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
