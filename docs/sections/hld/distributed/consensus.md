---
title: Consensus Algorithms — Raft & Paxos
description: Understanding consensus in distributed systems, with focus on Raft and Paxos, for high-level design interviews.
---

# Consensus Algorithms — Raft & Paxos

In distributed systems, nodes must **agree on a single value or state**, even in the presence of failures.  
This is known as the **consensus problem**.  
Consensus algorithms like **Raft** and **Paxos** ensure coordination across distributed systems.

---

## 1. Why Consensus Matters?

- **Leader election**: picking a primary node.  
- **Log replication**: keeping state machines consistent.  
- **Coordination**: ensuring agreement despite failures.  

Consensus is the foundation for:  
- Databases (Spanner, etcd).  
- Coordination services (ZooKeeper, Consul).  
- Distributed logs (Kafka controllers).  

---

## 2. Paxos (Classical Algorithm)

### Overview
- Proposed by Leslie Lamport.  
- Ensures consensus even with faulty nodes.  
- Theoretically elegant, but **hard to implement and understand**.  

### Roles
- **Proposers**: propose values.  
- **Acceptors**: vote on proposals.  
- **Learners**: learn final chosen value.  

### Phases
1. Proposer sends proposal with unique ID.  
2. Acceptors promise not to accept older proposals.  
3. If majority accept, value chosen.  

### Downsides
- Very complex in practice.  
- Multiple variants (Multi-Paxos, Fast Paxos).  
- Hard for engineers to reason about.  

---

## 3. Raft (Practical Alternative)

### Overview
- Designed to be **understandable and implementable**.  
- Widely adopted (etcd, Consul, RethinkDB).  

### Roles
- **Leader**: handles client requests, manages log replication.  
- **Followers**: passive, respond to leader’s requests.  
- **Candidates**: run in elections when no leader.  

### Phases
1. **Leader Election**  
   - If follower times out, becomes candidate, requests votes.  
   - Majority votes → candidate becomes leader.  

2. **Log Replication**  
   - Leader appends entries to its log.  
   - Sends entries to followers.  
   - Commits once majority acknowledge.  

3. **Safety & Consistency**  
   - Logs remain consistent even with leader changes.  
   - Ensures no committed entry is lost.  

### Advantages
- Easier to understand vs Paxos.  
- Production-grade implementations exist.  
- Actively used in Kubernetes (etcd).  

---

## 4. Paxos vs Raft

| Feature          | Paxos                        | Raft                          |
|------------------|------------------------------|-------------------------------|
| Complexity       | Very complex, theoretical    | Simple, practical             |
| Adoption         | Limited direct use           | Widely adopted (etcd, Consul) |
| Learning curve   | Steep                        | Easier                        |
| Variants         | Many (Multi, Fast, Cheap)    | Single, well-defined          |

---

## 5. Interview Tips

- If asked about consensus, mention both Paxos & Raft.  
- Say: *“Paxos is theoretical and hard, Raft was designed for practical use and is widely implemented.”*  
- Use real-world examples:  
  - etcd (Kubernetes) → Raft.  
  - ZooKeeper → Zab (similar to Paxos).  
- No need to dive into proofs — focus on **leader election + log replication**.  

---

## 6. Diagram (Simplified Raft Flow)

```
[ Client ] → [ Leader ] → replicate → [ Followers ]
                   | commit confirmed by majority |
```

---

## 7. Next Steps

- Learn about [Quorum Reads/Writes](/sections/hld/distributed/quorum.md).  
- Explore [Leader Election & Failover](/sections/hld/distributed/leader-election.md).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
