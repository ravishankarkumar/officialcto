---
title: Interview Guide - Databases in HLD
description: Learn how to approach database design in system design interviews, common pitfalls, trade-offs, and a structured checklist.
---

# Interview Guide: Databases in HLD

System design interviews often revolve around **databases** — scaling them, choosing the right type, and handling trade-offs.  
This guide will help you approach database questions **step by step**, avoid pitfalls, and impress interviewers with structured thinking.

---

## 1. How to Approach Database Questions

### Step 1: Clarify Requirements
- Is workload **read-heavy** or **write-heavy**?  
- Expected **scale**: thousands vs millions of users?  
- Latency requirements: milliseconds or seconds?  
- Consistency vs availability trade-offs (CAP theorem).  

---

### Step 2: Start Simple
- Always start with a **monolithic setup**:  
  - One server → app + DB + cache.  
- Interviewers appreciate **step-by-step scaling**, not overengineering.  

---

### Step 3: Identify Bottlenecks
- Where will the system break?  
  - DB writes? Reads? Storage? Latency?  
- Mention **observability**: metrics, logs, query plans.  

---

### Step 4: Scale Gradually
- **Vertical scaling** first (bigger machine).  
- Then **horizontal scaling**:  
  - **Replication** (read-heavy).  
  - **Sharding** (write-heavy).  
  - **Caching** (hot data).  
  - **Polyglot persistence** (specialized DBs).  

---

### Step 5: Tie to Real-World Case Studies
- Instagram: Postgres → Memcached → Sharding.  
- WhatsApp: Erlang + Cassandra.  
- Netflix: Cassandra + MySQL + Elasticsearch.  
- Uber: MySQL + Cassandra + Redis + Elasticsearch.  

👉 This shows awareness of **industry practices**.

---

## 2. Common Pitfalls

1. **Overengineering Early**
   - Don’t start with microservices + sharding in minute 1.  
   - Start simple, then scale.  

2. **Ignoring CAP/PACELC**
   - Interviewers expect you to mention trade-offs.  
   - Example: *“If we prioritize availability, we may get stale reads (AP system).”*  

3. **Forgetting Write Path**
   - Many candidates optimize only for reads.  
   - Always discuss write amplification, replication lag, shard rebalancing.  

4. **Not Mentioning Caching**
   - Cache is often the **first optimization**.  
   - Forgetting it is a red flag.  

5. **Vague Database Choice**
   - Saying “use NoSQL” is weak.  
   - Instead: *“For social graph → Graph DB like Neo4j. For caching → Redis.”*  

---

## 3. Checklist for Interview Answers

When asked to design a system, always cover:

- **Database choice**
  - SQL vs NoSQL? Which specialized DB? Why?  

- **Scaling approach**
  - Vertical vs horizontal.  
  - Replication vs sharding.  

- **Consistency model**
  - Strong vs eventual.  
  - Mention CAP/PACELC.  

- **Indexing**
  - Primary vs secondary indexes.  
  - Trade-offs (faster reads vs slower writes).  

- **Caching**
  - Cache-aside, write-through, TTLs.  
  - Pitfalls: invalidation, hot keys.  

- **Transactions**
  - Single-node ACID vs distributed (2PC, Saga, Event Sourcing).  

- **Polyglot persistence**
  - Use the right DB for each workload.  

- **Observability**
  - Logs, metrics, query plans.  

- **Failure handling**
  - Replication lag, shard rebalancing, failover.  

---

## 4. Example: Design a Scalable Messaging System

**Step 1: Start simple**  
- One server: app + Postgres + Redis cache.  

**Step 2: Identify bottlenecks**  
- Messages are write-heavy → DB write bottleneck.  

**Step 3: Scale out**  
- Add **sharding** by user ID.  
- Add **replication** for read scaling.  
- Use **Redis** for hot conversations.  
- Use **Kafka** for async processing.  

**Step 4: Handle consistency**  
- Eventual consistency acceptable for message delivery.  
- Strong consistency for billing/payments.  

**Step 5: Real-world analogy**  
- *“WhatsApp solved this with Erlang concurrency + Cassandra.”*  

---

## 5. Recap

- System design interviews test **structured thinking**, not memorization.  
- Start simple → identify bottlenecks → scale step by step.  
- Mention CAP/PACELC, caching, indexing, replication, sharding.  
- Use **real-world examples** to stand out.  
- Checklist ensures you don’t miss critical aspects.  

---

## Next Steps
👉 Revisit [Database Fundamentals](/sections/database/fundamentals.md) to strengthen your foundation, or check [Scaling Patterns](/sections/database/scaling-patterns.md) for scaling playbooks.

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
