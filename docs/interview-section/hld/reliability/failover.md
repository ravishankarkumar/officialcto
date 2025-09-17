---
title: Failover Strategies — Active-Passive vs Active-Active
description: Understanding failover strategies in distributed systems, comparing active-passive and active-active architectures for reliability.
---

# Failover Strategies — Active-Passive vs Active-Active

In distributed systems, **failover** ensures that if one component fails, another can take over with minimal disruption.  
Two common failover strategies are **active-passive** and **active-active**.

---

## 1. Active-Passive Failover

### How It Works
- One node is **active** (handles traffic).  
- Another node is **passive/standby**, replicating data from active.  
- If active fails → passive promoted to active.  

### Advantages
- Simpler to implement.  
- Easier to reason about consistency.  
- Lower operational cost (only one active at a time).  

### Disadvantages
- Failover delay (detection + promotion time).  
- Standby resources underutilized.  
- Risk of data loss if replication lags.  

### Example
- PostgreSQL with hot standby.  
- Many traditional RDBMS clusters.  

---

## 2. Active-Active Failover

### How It Works
- Multiple nodes are **active simultaneously**.  
- Traffic distributed via load balancer.  
- If one fails, others continue seamlessly.  

### Advantages
- No downtime (continuous availability).  
- Better resource utilization.  
- Supports geo-distribution (multi-region).  

### Disadvantages
- More complex (conflict resolution needed).  
- Higher operational cost (all nodes active).  
- Requires strong coordination (e.g., consensus, quorum).  

### Example
- DynamoDB, Cassandra (multi-master setups).  
- Google Spanner global clusters.  

---

## 3. Active-Passive vs Active-Active — Comparison

| Feature         | Active-Passive                 | Active-Active                  |
|-----------------|--------------------------------|--------------------------------|
| Availability    | Failover delay                 | Continuous availability        |
| Resource usage  | Standby underutilized          | All nodes utilized             |
| Complexity      | Simple                         | Complex (conflicts, sync)      |
| Cost            | Lower                          | Higher                         |
| Use case        | Smaller systems, RDBMS         | Large-scale, globally distributed |

---

## 4. Failover Detection

- **Heartbeats**: active node sends periodic signals.  
- **Timeouts**: if heartbeats missed, promote standby.  
- **Orchestrators**: ZooKeeper, etcd, Kubernetes controllers manage failover.  

---

## 5. Interview Tips

- Mention failover when discussing **HA systems**.  
- Say: *“For smaller systems, I’d use active-passive. For global scale, active-active is better.”*  
- Call out trade-offs: active-passive simpler, active-active complex but resilient.  
- Tie into replication strategies (sync vs async).  

---

## 6. Next Steps

- Explore [Geo-replication & Multi-region](/interview-section/hld/reliability/geo-replication.md).  
- Learn about [Graceful Degradation](/interview-section/hld/reliability/graceful-degradation.md).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
