---
title: System Design Mindset
description: How to approach system design interviews - clarifying functional & non-functional requirements, constraints, finding bottlenecks, and a step-by-step scaling mindset.
---

# System Design Mindset

This page teaches the *way of thinking* you should bring to any High-Level Design (HLD) question — whether it’s an interview or a real-world architecture discussion.

Good system design is mostly about **clarity, structure, and trade-offs**. Start with *what* the system must do, then decide *how well* it must do it, then design incrementally with clear checkpoints.

---

## 1. Quick summary (the short elevator version)

1. **Clarify requirements** — ask about functional and non-functional requirements (NFRs).  
2. **Identify constraints & assumptions** — resources, deadlines, legacy tech.  
3. **Estimate workload** — QPS, throughput, storage, latency targets.  
4. **Sketch a simple design** (monolith) that satisfies requirements.  
5. **Find bottlenecks** and iterate: caching, replication, partitioning, async.  
6. **Call out trade-offs** at every step and show monitoring & failure plans.

---

## 2. Functional vs Non-Functional Requirements

**Functional requirements** (the *what*): concrete features and behaviors.
- Example items: create user, upload image, send message, redirect short URL.

**Non-functional requirements (NFRs)** (the *how well*): quality attributes and constraints.
- Scalability (e.g., must handle 100k QPS).
- Latency (e.g., < 200 ms tail latency).
- Availability (e.g., 99.95% uptime).
- Consistency (strong vs eventual).
- Durability, security, cost, maintainability, compliance.

**Interview habit:** always repeat requirements back and ask which NFRs are critical. e.g., *“Do you want strict consistency for this API, or is eventual consistency acceptable?”*

---

## 3. Clarify constraints & assumptions (fast)

Ask explicit questions before designing. Typical constraints:
- Time: do you have 15 minutes to design or 45 minutes?  
- Budget: can we use managed cloud services or must be cost-sensitive?  
- Existing systems: any legacy DBs or languages?  
- Geographic: single region or global users?  
- Team: how many engineers for maintenance?

State assumptions out loud if interviewer doesn’t specify them:
> *“I’ll assume 1M daily active users, ~10M requests/day, and low-latency reads are most important. If that’s wrong, tell me.”*

---

## 4. Find bottlenecks — what to look for

Bottlenecks depend on workload. Common hotspots:
- **CPU** — expensive compute (image processing, ML inference).  
- **Memory** — large in-memory caches, per-connection state.  
- **Disk / IOPS** — DB writes, backups, compaction.  
- **Network** — bandwidth-heavy workloads (video).  
- **DB connections** — connection limits & locks.  
- **Single Point of Failure** — single DB, single load balancer, etc.

**How to present this:** show a quick table linking requirements → likely bottlenecks. Example: "If system is write-heavy, DB write throughput is the likely bottleneck."

---

## 5. Step-by-step scaling roadmap (the interview-friendly flow)

1. **Start simple** — single app server + single DB (monolith).  
2. **Optimize vertically** — bigger machine, better disks (short-term).  
3. **Add cache & read replicas** — reduce DB load for reads.  
4. **Partition (shard) and distribute** — split data when DB won't fit/handle writes.  
5. **Move to microservices** only when domains require independent scaling.  
6. **Geo-distribute** with replication & edge caches for global users.  
7. **Automate & observe** — add autoscaling, monitoring, distributed tracing.  

Always justify each move: don’t jump to microservices or sharding without explaining why.

---

## 6. Decision cues — when to do what

- **Use caching** when reads >> writes and latency is critical.  
- **Use read replicas** when read scaling is needed but writes are limited.  
- **Shard** when dataset size or write throughput exceeds single-node capacity.  
- **Use specialized DBs** when problem fits (graph for relationships, time-series for metrics).  
- **Use asynchronous processing** for non-critical or long-running tasks (image processing, emails).  
- **Prefer eventual consistency** in user-facing features where slight staleness is acceptable (feeds), but require strong consistency for money transfers.

---

## 7. A small worked example — URL Shortener (brief)

1. **Clarify requirements**
   - Functional: create short URL, redirect, track analytics.
   - NFRs: low latency on redirects (<50ms), high availability, 100M short links stored.

2. **Capacity sketch** (example arithmetic shown step-by-step)

   Suppose: 1,000,000 daily active users, each performs 10 redirects/day → total requests/day = 1,000,000 × 10 = 10,000,000 requests/day.

   Convert to requests/sec:
   - Seconds/day = 24 × 3600 = 86,400.
   - Requests/sec = 10,000,000 / 86,400.  
     Step-by-step:
     - 24 × 3600 = 86,400.
     - Divide: 10,000,000 ÷ 86,400 = 115.740740...  
   - So average QPS ≈ **116 req/s**. Plan for peak: use a 10× factor → **~1,160 req/s**.

   From here:
   - One small web server can serve thousands of cached redirects; use CDN for static redirect results.  
   - Data size: 100M short-links × 100 bytes/link ≈ 10,000,000,000 bytes ≈ 10 GB (double-check assumptions for metadata).

3. **Simple architecture**
   - A web layer with CDN for redirects.  
   - Key-value store (Redis/DynamoDB) for short->long mapping (fast reads).  
   - A write path that writes to durable DB and populates cache.  
   - Async pipeline for analytics.

4. **Trade-offs**
   - Storing canonical mapping in a durable DB vs caching for latency.  
   - Collision handling (hash length decisions).  
   - Analytics can be eventually consistent.

---

## 8. Design process checklist (step-by-step to use in interviews)

1. **Clarify** functional & non-functional requirements (repeat them).  
2. **State constraints & assumptions** (and ask clarifying questions).  
3. **Estimate load** (QPS, storage, bandwidth). Show any calculations briefly.  
4. **Draw a minimal architecture** that satisfies requirements.  
5. **Identify bottlenecks** in that design.  
6. **Propose targeted optimizations** (cache, replicas, partitions).  
7. **Discuss trade-offs** (cost, complexity, consistency).  
8. **Add observability & failure plan** (monitoring, retries, graceful degradation).  
9. **Summarize** — repeat final architecture and why it meets the key NFRs.

---

## 9. Interview tips — what interviewers want to hear

- **Ask clarifying questions** before designing.  
- **Speak in a structured way**: requirements → constraints → architecture → scaling plan.  
- **Show numbers** (even rough estimations) — interviewers like capacity reasoning.  
- **Call out trade-offs** explicitly. Say which requirement you’re prioritizing (latency vs durability vs cost).  
- **Start simple** and iterate — show incremental improvements as load grows.  
- **Mention observability & testing** — how you’ll detect and recover from failures.  
- **Use real-world analogies and case studies** where relevant.

---

## 10. Quick checklist to keep on hand

- Have I asked about functional & non-functional requirements? ✅  
- Have I stated assumptions and constraints? ✅  
- Did I estimate QPS/throughput and storage? ✅  
- Is my initial design simple and end-to-end? ✅  
- Did I point out the major bottlenecks and fixes? ✅  
- Did I call out trade-offs explicitly? ✅  
- Did I add monitoring and failure handling? ✅

---

## 11. Next steps / links
- Continue to **[Workload Estimation](/interview-section/hld/foundations/workload-estimation.md)** for worked examples of capacity calculations.  
- See practical patterns in **[Caching strategies](/interview-section/hld/caching/strategies.md)** and **[Sharding & Replication](/interview-section/hld/database-for-hld.md)**.

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
