---
title: Geo-replication & Multi-region
description: Understanding geo-replication and multi-region database architectures for low-latency, fault-tolerant systems.
---

# Geo-replication & Multi-region

As systems scale globally, users expect **low latency** and **high availability** regardless of location.  
**Geo-replication** and **multi-region deployments** are key strategies to meet these goals.

---

## 1. What is Geo-replication?

- Replicating data across **multiple geographic regions**.  
- Ensures users get data from the nearest location.  
- Provides redundancy in case of regional outages.  

---

## 2. Benefits of Multi-region Systems

1. **Low Latency**  
   - Users served from nearest data center.  
   - Example: AWS, GCP, Azure have regional deployments.  

2. **Fault Tolerance**  
   - Survive region-wide outages (disasters, power loss, etc.).  
   - Example: Active-active across US-East & US-West.  

3. **Regulatory Compliance**  
   - Data residency laws (GDPR, HIPAA).  
   - Keep data within country/region.  

4. **Scalability**  
   - Distribute workload across multiple regions.  

---

## 3. Deployment Models

### 3.1 Active-Passive (DR Setup)
- One primary region handles all traffic.  
- Secondary region is standby (disaster recovery).  
- Simple, cheaper, but slower failover.  

### 3.2 Active-Active (Global)
- Multiple regions serve traffic simultaneously.  
- Users automatically routed to nearest region.  
- Requires conflict resolution & consensus.  
- More complex, but better performance & availability.  

---

## 4. Challenges

- **Consistency**: keeping replicas in sync across regions.  
- **Latency**: synchronous replication across continents is slow.  
- **Conflict resolution**: when writes happen in different regions.  
- **Cost**: cross-region replication and infra costs.  

---

## 5. Real-World Examples

- **Google Spanner** → global DB with synchronous replication, strong consistency.  
- **AWS DynamoDB Global Tables** → async replication, eventual consistency.  
- **Azure Cosmos DB** → tunable consistency (5 levels).  

---

## 6. Interview Tips

- Mention geo-replication for **global user bases**.  
- Say: *“I’d use multi-region active-active for global apps, but active-passive for simpler DR setups.”*  
- Tie it to CAP/PACELC: global systems often trade latency for consistency.  
- Bring up compliance (GDPR) if relevant.  

---

## 7. Diagram

```
   [ User in Europe ] --> EU Data Center
   [ User in US ] ----> US Data Center
   Data synced between regions (sync/async).
```

---

## 8. Next Steps

- Learn about [Graceful Degradation](/interview-section/hld/reliability/graceful-degradation.md).  
- Explore [Circuit Breakers, Retries, Timeouts](/interview-section/hld/reliability/circuit-breakers.md).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
