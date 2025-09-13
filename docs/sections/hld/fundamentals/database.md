---
title: Databases in System Design — SQL, NoSQL, Internals, and Scaling
description: A single, comprehensive guide to relational and non-relational databases, internals (WAL, SSTable, LSM, B+Tree), scaling strategies (replication, sharding, caching), and how to pick the right DB for HLD interviews and real systems.
---

# Databases in System Design — SQL, NoSQL, Internals, and Scaling

## 1. Introduction
Databases are the backbone of any large system. The database you choose and how you scale it will shape latency, cost, complexity, and reliability. This article merges taxonomy (SQL vs NoSQL), internals (WAL, LSM, SSTable, B+Tree), scaling strategies (replication, sharding, caching), and interview-focused guidance into a single reference for HLD interviews and real-world architecture.

We’ll cover:
- Database types and when to use them
- Internals and storage mechanisms
- Performance, indexing and consistency (CAP)
- How to scale and common pitfalls
- Interview tips and a concise checklist

---

## 2. Broad Classification: SQL vs NoSQL

### 2.1 Relational Databases (SQL)
- **Examples:** PostgreSQL, MySQL, Oracle, SQL Server.  
- **Characteristics:** strong schema, ACID transactions, joins, mature tooling.  
- **Best for:** financial systems, OLTP, anywhere data integrity and transactions matter.

### 2.2 NoSQL (Non-relational) — categories
NoSQL trades some relational guarantees to gain flexibility and scale.

#### Document Stores
- **Examples:** MongoDB (spotlight), CouchDB.  
- **Model:** JSON/BSON documents, nested structures, flexible schema.  
- **When to use:** content management, user profiles, evolving schema, fast iteration.  
- **MongoDB spotlight:** BSON storage, replica sets for HA, sharding for scale, B-tree indexes, journaling for durability.

#### Key-Value Stores
- **Examples:** Redis, DynamoDB.  
- **Model:** simple key -> value map.  
- **When to use:** caching, session storage, real-time leaderboards.

#### Column-Family / Wide-Column Stores
- **Examples:** Cassandra, HBase, Bigtable.  
- **Model:** columns grouped in families; optimized for time-series & write-heavy loads.  
- **Internals:** LSM Trees + SSTables.

#### Graph Databases
- **Examples:** Neo4j, JanusGraph.  
- **Model:** nodes + edges; optimized for highly connected data and graph traversals.  
- **When to use:** recommendations, social graphs, fraud detection.

---

## 3. How to Choose (Decision Flow)
Ask:
1. Need ACID & relational joins? → **SQL**  
2. Expect huge scale + flexible schema? → **NoSQL (Document/Key-Value/Column)**  
3. Many complex joins across entities? → **SQL**  
4. Write-heavy, time-series, or analytics? → **Column-family (Cassandra/HBase)**  
5. Highly connected data? → **Graph DB**  

*(Insert SQL vs NoSQL decision flow diagram here)*

**Practical tip:** You can use both — SQL for transactional core, NoSQL for high-throughput or flexible parts (polyglot persistence).

---

## 4. Core Internals — What actually runs under the hood

### 4.1 Write-Ahead Log (WAL) / Journaling
- **Purpose:** durability and crash recovery. Write intent to durable log before applying to data files. Used in Postgres, InnoDB, MongoDB journaling.

### 4.2 B-Tree / B+Tree Indexes
- **Structure:** balanced tree for ordered keys; B+Tree stores values at leaves with linked leaves for range scans.  
- **Used for:** primary indexes in MySQL/Postgres, fast range queries.

### 4.3 LSM Tree (Log-Structured Merge Tree)
- **Idea:** buffer writes in memory (MemTable), flush to disk as immutable SSTables, periodically compact.  
- **Tradeoffs:** excellent write throughput; reads may need to consult multiple SSTables (mitigated by Bloom filters and compaction).  
- **Used in:** Cassandra, RocksDB, LevelDB, HBase.

### 4.4 SSTables & MemTables
- **SSTable:** sorted, immutable on-disk table file (fast sequential writes, easy merges).  
- **MemTable:** in-memory buffer; flush becomes an SSTable.

### 4.5 Skip Lists, Hash Tables, and Others
- **Redis internals:** hash tables + skip lists for sorted sets.  
- **Bloom filters:** probabilistic structure to quickly test if a key may exist in an SSTable (reduces disk lookups).

### 4.6 MVCC (Multi-Version Concurrency Control)
- Stores multiple versions of rows to allow non-blocking reads concurrent with writes (Postgres, InnoDB).

### 4.7 Consensus & Replication Internals
- **Raft / Paxos / ZAB:** ensure agreement among distributed nodes for leader election and consistent replication (etcd, CockroachDB, Spanner variants).

---

## 5. Performance & Indexing: B-Tree vs LSM tradeoffs
- **B-Tree (RDBMS):** good for point & range reads, updates require in-place writes. Best when reads dominate and updates are moderate.  
- **LSM Tree:** writes are append-only (fast), compaction handles background merging. Best for high write throughput and append-heavy workloads.  
- **Indexes:** secondary indexes speed reads but slow writes & consume storage. Use partial/compound indexes carefully.

---

## 6. Consistency Models & CAP Theorem
- **Consistency:** read the latest write.  
- **Availability:** system responds to every request.  
- **Partition Tolerance:** system continues despite network partitions.

You can only fully guarantee two of three in the face of partitioning. Practically:
- **CP systems:** favor consistency over availability (MongoDB in certain configs, HBase).  
- **AP systems:** favor availability (Cassandra, Dynamo-like systems).

*(Insert CAP triangle diagram here)*

**Practical nuance:** Many systems provide *tunable consistency* (Cassandra consistency levels, DynamoDB read/write options, MongoDB read preferences).

---

## 7. Scaling: replication, sharding, caching, and more

### 7.1 Replication
- **Primary-Secondary:** single writer, many readers. Simpler but write-limited. Replication can be sync (stronger consistency) or async (better availability/performance).  
- **Primary-Primary (Multi-master):** multiple writable nodes; conflict resolution required (last-write-wins, vector clocks, app-level reconciliation).

**Interview tip:** discuss replication lag, read-after-write consistency, and geo-replication choices.

### 7.2 Sharding (Horizontal Partitioning)
- **Purpose:** split dataset across nodes by shard key (user_id, hash, ranges).  
- **Strategies:** range-based, hash-based (consistent hashing), directory mapping.  
- **Pitfalls:** wrong shard key → hotspots; joins across shards are expensive; rebalancing complexity.

### 7.3 Combining Replication + Sharding
- Typical at scale: each **shard** has **replicas** for availability. (MongoDB, Cassandra examples).

### 7.4 Caching
- **Patterns:** cache-aside (lazy), write-through, write-back.  
- **Stores:** Redis, Memcached.  
- **Pitfalls:** cache invalidation, hot keys, cache stampedes — mitigated via request coalescing, sharding, and TTL strategies.

### 7.5 Query Routing & Middleware
- Use proxies (ProxySQL, PgBouncer) or app-level routing for read/write separation and shard selection.

---

## 8. When NOT to choose a database
- **SQL:** not ideal for highly unstructured, rapidly changing schemas or massive sequential writes without careful sharding strategy.  
- **MongoDB:** avoid for multi-document transactional integrity across large sets unless you accept the complexity/perf cost.  
- **Redis:** avoid as single-source-of-truth for durable, large datasets (cost + memory limits).  
- **Cassandra:** avoid if you need strong single-row transactional consistency or complex joins.  
- **Graph DBs:** avoid unless the core problem is relationship traversal.

---

## 9. Operational Concerns
- **Backups & Recovery:** snapshotting, point-in-time recovery, test restores.  
- **Monitoring & SLOs:** metrics, tracing, logs; define SLIs/SLOs rather than vague uptime goals.  
- **Upgrades & Migrations:** schema migrations, rolling upgrades, zero-downtime strategies.  
- **Cost:** storage tiers, caching to reduce reads, right-sizing.

---

## 10. Interview Tips & Checklist
- Always justify *why* — tie choice to access patterns, consistency needs, and scale.  
- Discuss **trade-offs** explicitly (latency vs correctness, complexity vs cost).  
- Mention **scaling knobs**: replication, sharding, caching, offline processing, CDNs.  
- Be prepared to draw internals (WAL flow, LSM workflow, B+Tree).  
- **Checklist to mention in interviews:**
  - Bottleneck identification (CPU, memory, IO, network)
  - Read/write ratios
  - Data size & growth trends
  - Consistency requirements (read-after-write? cross-row transactions?)
  - Operational maturity & cost constraints

---

## 11. Popular Examples & Typical Uses
- **Postgres/MySQL:** transactional systems, strong consistency.  
- **MongoDB:** flexible document store for content, user profiles.  
- **Redis:** caching, ephemeral data, counters.  
- **Cassandra/HBase:** write-heavy workloads, telemetry, event logging.  
- **Neo4j/JanusGraph:** connected graph queries.

---

## 12. Diagrams / Visuals (placeholders)
- CAP theorem triangle.  
- SQL vs NoSQL decision flow.  
- WAL flow: Client → WAL → Mem/Files → Checkpoint.  
- LSM workflow: MemTable → SSTable → Compaction (with Bloom filter).  
- B+Tree leaf/index diagram.  

*(Insert diagrams here — PNG/SVGs)*

---

## 13. Further Reading
- *Designing Data-Intensive Applications* — Martin Kleppmann  
- *System Design Interview* — Alex Xu  
- Google SRE Book  
- High Scalability blog

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
