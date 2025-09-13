---
title: Sharding vs Replication
description: Sharding and replication are two fundamental strategies for scaling databases. While replication improves fault tolerance and read scalability, sharding enables horizontal partitioning of data to scale writes. Understanding both and their trade-offs is key in high-level design interviews.
---

# Sharding vs. Replication

Scaling databases beyond a single machine is one of the most important system design decisions. Two common approaches are **replication** and **sharding**. Though both involve multiple nodes, they solve different problems.

<!-- --- -->

## 1. Replication (Copying Data)

Replication means **duplicating the same data across multiple database nodes**.  

### Goals:
- High **availability** (if one replica fails, others take over).
- Better **read scalability** (distribute read queries to replicas).
- **Disaster recovery** (failover, backups).

### Types of Replication:
- **Primary–Secondary (Master–Slave):** One write node, many read replicas.  
- **Primary–Primary (Multi-Master):** Multiple nodes accept writes, but conflict resolution is needed.  

### Trade-offs:
- Replication does **not increase write throughput** (writes still go to primary or multiple primaries with conflict handling).
- Risk of **replication lag** in async setups.
- Synchronous replication → strong consistency, but higher latency and reduced availability.

<!-- --- -->

## 2. Sharding (Horizontal Partitioning)

Sharding means **splitting data across multiple nodes** based on a sharding key (e.g., `user_id`). Each shard holds a different subset of data.  

### Goals:
- Scale **write throughput** (different writes go to different shards).
- Scale **storage capacity** (no single node holds the entire dataset).
- Keep queries faster by **reducing dataset size per node**.

### Common Sharding Strategies:
- **Range-based:** Divide by ranges (e.g., users 1–1M, 1M–2M).  
- **Hash-based:** Hash a key and map to shards (balances load better).  
- **Directory/Lookup:** Central mapping of keys → shards.  

### Trade-offs:
- Adds **complexity** to app logic (queries must be routed to correct shard).  
- Harder to support **joins across shards**.  
- **Rebalancing** (moving data when shards fill up) is non-trivial.  
- Poor sharding key choice can lead to **hotspots** (e.g., time-based sharding with all recent writes hitting one shard).

<!-- --- -->

## 3. Replication vs Sharding — Key Differences

| Feature               | Replication                                  | Sharding                                |
|------------------------|-----------------------------------------------|-----------------------------------------|
| **What it does**       | Copies same data across multiple nodes        | Splits data into partitions across nodes |
| **Main benefit**       | High availability, fault tolerance, read scale| Write scaling, storage scaling           |
| **Writes**             | Still bottlenecked at primary (unless multi-master) | Distributed across shards (parallel writes) |
| **Reads**              | Can scale reads via replicas                  | Reads must go to correct shard           |
| **Complexity**         | Easier to implement (built into most DBs)     | More complex (routing, rebalancing)      |
| **Joins/Transactions** | Still work (within one replica set)           | Hard across shards                       |

<!-- --- -->

## 4. Combining Replication and Sharding

In real-world large-scale systems, you almost always use **both together**:  
- **Replication** inside each shard (to improve availability).  
- **Sharding** across multiple shards (to scale writes and storage).  

Example: MongoDB, Cassandra, and HBase all use sharding + replication.

<!-- --- -->

## 5. When to Use What?

- **Replication only:**  
  - Your workload is read-heavy.  
  - You need higher availability but writes are manageable by a single node.  
  - Example: Content-heavy apps, analytics dashboards.  

- **Sharding only (rare):**  
  - You need to split massive datasets across nodes but don’t care about redundancy.  
  - Not recommended (single points of failure).  

- **Sharding + Replication (recommended at scale):**  
  - Both reads and writes are massive.  
  - You need resilience, global distribution, and high throughput.  
  - Example: Facebook, Twitter, Uber scale.  

<!-- --- -->

## 6. Diagrams

1. **Replication:** One primary with multiple replicas.  
2. **Sharding:** Data split into multiple shards.  
3. **Sharding + Replication:** Each shard has replicas.

<!-- TODO:// -->
*(Insert diagrams here for clarity — can be drawn like we did with CAP triangle and decision flow.)*

<!-- --- -->

## 7. Interview Takeaways

- Replication = **read scaling + availability**.  
- Sharding = **write scaling + storage scaling**.  
- They solve **different problems** but are often **combined**.  
- Always mention **trade-offs**: consistency, lag, joins, rebalancing, conflict resolution.  

---
