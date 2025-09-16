---
title: Leader Election, Heartbeats & Failover
description: How distributed systems use leader election, heartbeats, and failover mechanisms for coordination and fault tolerance.
---

# Leader Election, Heartbeats & Failover

In distributed systems, many tasks require a **single leader** (primary) to coordinate.  
Systems need ways to **elect leaders, detect failures, and failover** safely.

---

## 1. Why Leader Election?

- Some tasks must be **coordinated by one node**:  
  - Writing to a database.  
  - Managing cluster membership.  
  - Assigning partitions in Kafka.  
- Without a leader → conflicts, duplicate work, data corruption.  

---

## 2. Leader Election Algorithms

### 2.1 Bully Algorithm
- Nodes have IDs.  
- Highest ID becomes leader.  
- If leader fails, next-highest takes over.  
- Simple but assumes reliable communication.  

### 2.2 Raft / Paxos
- Consensus-based election.  
- Nodes vote for leader.  
- Requires majority agreement.  
- More robust than Bully.  

### 2.3 ZooKeeper / etcd (Real-World)
- Nodes create **ephemeral znode** (temporary entry).  
- First node succeeds → leader.  
- If leader dies, node’s session expires → new leader elected.  

---

## 3. Heartbeats

- Leaders periodically send **heartbeat messages** to followers.  
- Purpose: assure followers that leader is alive.  
- If followers miss heartbeats for a timeout → trigger election.  

### Example
- Raft uses heartbeats to maintain leadership.  
- Kafka controller uses ZooKeeper to monitor node health.  

---

## 4. Failover

### Process
1. Detect leader failure (via missing heartbeats).  
2. Trigger election among remaining nodes.  
3. New leader takes over.  

### Challenges
- **Split brain**: two leaders elected simultaneously due to partition.  
- **Data loss**: if leader fails before replicating logs.  
- **Downtime**: gap between failure detection and new leader election.  

---

## 5. Real-World Examples

- **Kafka** → controller manages partitions, elected via ZooKeeper.  
- **MongoDB Replica Set** → primary/secondary, elections triggered on failure.  
- **Kubernetes** → leader election for controllers (via etcd).  

---

## 6. Interview Tips

- Always mention leader election for **coordination services**.  
- Show awareness of **split brain** issue and quorum-based elections.  
- Say: *“Leader sends heartbeats, if missed → election → failover.”*  
- Tie to real-world systems: ZooKeeper, etcd, Raft.  

---

## 7. Diagram (Simplified Raft Election)

```
   [ Followers ] --timeout--> [ Candidate ]
         | request votes (majority wins)
         v
       [ Leader ] --heartbeats--> followers
```

---

## 8. Next Steps

- Learn about [Eventual vs Strong Consistency](/sections/hld/distributed/consistency-tradeoffs.md).  
- Explore [Replication (Sync vs Async)](/sections/hld/reliability/replication.md).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
