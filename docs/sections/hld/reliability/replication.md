---
title: Replication — Sync vs Async
description: Understanding replication in distributed systems, comparing synchronous vs asynchronous replication, trade-offs, and real-world examples.
---

# Replication — Sync vs Async

Replication is a core strategy for **fault tolerance, scalability, and availability** in distributed systems.  
It means keeping **multiple copies of data** across nodes or regions.

---

## 1. Why Replication?

- **High availability** → if one node fails, replicas serve traffic.  
- **Read scalability** → reads can be distributed across replicas.  
- **Disaster recovery** → replicas protect against data center failure.  
- **Low latency** → replicas closer to users (geo-replication).  

---

## 2. Synchronous Replication

### How It Works
- Write is acknowledged **only after all replicas confirm**.  
- Guarantees **strong consistency**.  

### Advantages
- No stale reads (always up-to-date).  
- Safe for critical data (e.g., banking).  

### Disadvantages
- Slower writes (must wait for replicas).  
- If one replica is slow, whole system is slow.  
- Lower availability (replicas must all be reachable).  

### Example
- Google Spanner (uses TrueTime + synchronous replication).  
- PostgreSQL synchronous replication.  

---

## 3. Asynchronous Replication

### How It Works
- Write is acknowledged **after primary node confirms**, replicas updated later.  
- Provides **eventual consistency**.  

### Advantages
- Faster writes.  
- Higher availability (replicas can lag).  
- Good for read-heavy systems.  

### Disadvantages
- Reads may be stale.  
- Risk of data loss if primary fails before replicas updated.  

### Example
- MySQL async replication.  
- Cassandra (eventual consistency).  

---

## 4. Semi-Synchronous Replication

- Hybrid approach.  
- Primary waits for **at least one replica** before ack.  
- Balances latency and durability.  

---

## 5. Trade-offs Summary

| Type             | Consistency   | Latency | Availability | Risk of Data Loss |
|------------------|---------------|---------|--------------|-------------------|
| Sync             | Strong        | High    | Lower        | Low               |
| Async            | Eventual      | Low     | High         | Higher            |
| Semi-sync        | Tunable       | Medium  | Medium       | Medium            |

---

## 6. Interview Tips

- Always mention replication for **HA & scalability**.  
- Say: *“For banking, I’d use synchronous replication. For social media feeds, async is fine.”*  
- Bring up **semi-sync** as a middle ground.  
- Tie to CAP theorem: sync → consistency, async → availability.  

---

## 7. Next Steps

- Learn about [Failover Strategies](/sections/hld/reliability/failover.md).  
- Explore [Geo-replication & Multi-region](/sections/hld/reliability/geo-replication.md).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
