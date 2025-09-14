---
title: Sharding vs Replication
description: Understand the difference between database sharding and replication, when to use them, their trade-offs, and how real-world systems combine both to achieve scalability and reliability.
---

# Sharding vs Replication

When databases grow beyond a single machine, we need **scaling strategies**.  
The two most important ones are **Replication** and **Sharding**.  
They solve different problems and are often used together in real-world systems.

---

## 1. Replication

### What is Replication?
Replication = **copying the same data across multiple machines**.  

### Types
1. **Primary-Secondary (Master-Slave)**  
   - Writes → Primary.  
   - Reads → Replicas.  
   - Example: MySQL with read replicas.  

2. **Multi-Primary (Multi-Master)**  
   - Writes allowed on multiple nodes.  
   - Requires conflict resolution (last-write-wins, version vectors).  
   - Example: MongoDB Replica Sets, PostgreSQL BDR.  

### Benefits
- **High Availability**: If one node fails, another serves data.  
- **Read Scalability**: Distribute reads across replicas.  
- **Disaster Recovery**: Backups from replicas.  
- **Geo-Distribution**: Place replicas closer to users.  

### Downsides
- Replication lag (replicas behind primary).  
- Conflict resolution (multi-master).  
- Extra storage cost.  

---

## 2. Sharding

### What is Sharding?
Sharding = **splitting data across multiple machines**.  
Each shard stores only a subset of data.

**Example:**  
- Shard 1 → Users A–M  
- Shard 2 → Users N–Z  

### Strategies
- **Range-based**: Based on value range (`user_id 1–1000`, `1001–2000`).  
- **Hash-based**: Hash of key determines shard.  
- **Directory-based**: Lookup service decides which shard to query.  

### Benefits
- **Write Scalability**: Distributes load across servers.  
- **Storage Scalability**: Data split across machines.  
- **Parallelism**: Queries can be processed by multiple shards.  

### Downsides
- Complex query routing (joins across shards are expensive).  
- Rebalancing shards is hard (when one shard grows too large = hotspot).  
- Application complexity (must know shard key).  

---

## 3. Sharding vs Replication (Comparison)

| Feature                  | Replication                                | Sharding                               |
|--------------------------|--------------------------------------------|----------------------------------------|
| **Definition**           | Copies of the same data on multiple nodes | Splits data across multiple nodes       |
| **Improves**             | Availability, Read scalability            | Write scalability, Storage capacity     |
| **Data Stored**          | Full copy on each replica                  | Subset on each shard                   |
| **Query Routing**        | Any replica can serve reads                | Must find the correct shard            |
| **Failure Tolerance**    | High (replicas act as backup)              | Lower (if a shard fails, partial data lost) |
| **Use Case**             | Read-heavy workloads, fault tolerance      | Large datasets, write-heavy workloads  |

---

## 4. When to Use What

- **Replication**  
  - If your workload is **read-heavy**.  
  - If you need **high availability**.  
  - If your dataset fits on a single machine, but you want fault tolerance.  

- **Sharding**  
  - If your workload is **write-heavy**.  
  - If your dataset is too large for a single machine.  
  - If you need **parallel query processing**.  

---

## 5. Sharding + Replication (Together)

In practice, most large-scale systems use **both**:  

- **Sharded cluster with replication inside each shard.**  
  - Each shard = subset of data.  
  - Each shard has replicas for HA and read-scaling.  

**Example:**  
- MongoDB Sharded Clusters.  
- Cassandra (replication + partitioning).  
- Google Spanner (sharding + synchronous replication).  

---

## 6. Real-World Examples

- **Instagram** → PostgreSQL with sharding + Memcached.  
- **Twitter** → Sharded MySQL for tweets.  
- **Cassandra** → Partitioned (sharded) data + replication for HA.  
- **Spanner** → Sharding + synchronous replication + global consistency.  

---

## 7. Interview Tips

- **Clarify the bottleneck**:  
  - If reads → talk about replication.  
  - If writes / dataset size → talk about sharding.  

- **Mention trade-offs**:  
  - Replication lag.  
  - Shard rebalancing & hotspots.  

- **Bonus points**:  
  - Talk about combining both.  
  - Mention CAP/PACELC links.  

👉 Example Answer:  
*“If the system is read-heavy, I’d add replication to scale reads and ensure availability. If writes are the bottleneck or the dataset is too large for one server, I’d introduce sharding. In practice, I’d use both — a sharded cluster with replication inside each shard for HA.”*

---

## 8. Recap

- **Replication** = copies of the same data → improves availability & read scaling.  
- **Sharding** = splits data → improves write scaling & storage.  
- Both are **complementary** and often combined.  

---

## Next Steps
👉 Continue with [Database Scaling Patterns](/sections/database/scaling-patterns.md) for a broader view of scaling strategies beyond sharding and replication.

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
