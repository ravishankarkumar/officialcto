---
title: Frequently Asked HLD Problems
description: Extended problem bank for practicing high-level design (HLD) interviews beyond the classic problems.
---

# Frequently Asked HLD Problems

Beyond the **classic problems** (URL shortener, chat system, etc.), interviewers often ask variations or deeper system challenges.  
This section collects a **growing problem bank** to practice advanced and niche scenarios.

---

## 1. Design a Key-Value Store (like DynamoDB, Redis)

- Core: put(key, value), get(key).  
- Handle replication, sharding, leader election.  
- Consider consistency models (eventual vs strong).  
- Optimizations: TTLs, eviction, persistence.  

---

## 2. Design a Rate Limiter

- Requirements: limit requests/user/IP.  
- Algorithms: Token Bucket, Leaky Bucket, Fixed Window, Sliding Window.  
- Store counters in Redis for distributed environments.  
- Must be low latency, fault tolerant.  

---

## 3. Design a Notification Service

- Send email, SMS, push notifications.  
- Support retries, scheduling, batching.  
- Ensure idempotency (avoid duplicate messages).  
- Use queues + workers (Kafka, SQS, Celery).  
- Handle fan-out (1 event → millions of notifications).  

---

## 4. Design Collaborative Editing (Google Docs)

- Requirements: multiple users editing same doc in real-time.  
- Conflict resolution: Operational Transformation (OT) or CRDTs.  
- Low latency updates via WebSockets.  
- Persistence + version history.  
- Offline edits + sync later.  

---

## 5. Design a Leaderboard & Ranking System

- Requirements: millions of players, real-time updates.  
- Use Redis Sorted Sets for fast ranking.  
- Shard leaderboards for scalability.  
- Support queries: top N, rank of player, player’s neighbors.  
- Handle seasonal resets.  

---

## 6. Design a Multi-Tenant SaaS Platform

- Requirements: shared infra for multiple customers.  
- Isolation strategies:  
  - Shared DB with tenantID column.  
  - Separate schema per tenant.  
  - Separate DB per tenant (high isolation, costly).  
- Configurable limits per tenant.  
- Billing and metering per tenant.  

---

## 7. Design a Distributed Cache (like Redis Cluster)

- Requirements: partitioned + replicated cache.  
- Consistent hashing for sharding.  
- Gossip protocol for cluster membership.  
- Failover with replication.  
- Handle eviction + persistence.  

---

## 8. Design a Video Conferencing System (Zoom/Meet)

- Requirements: low latency (<200ms), high quality.  
- Use WebRTC for peer-to-peer streaming.  
- Media servers (SFU/MCU) for multiparty calls.  
- Adaptive bitrate streaming.  
- Handle NAT traversal (TURN/STUN servers).  
- Features: screen share, chat, recording.  

---

## 9. More Practice Ideas

- Design an API Gateway.  
- Design a Search Autocomplete system.  
- Design a Distributed File System (GFS/HDFS).  
- Design an IoT Data Ingestion System.  
- Design a Blockchain-based ledger.  

---

## Interview Tip

In interviews, if you’re asked an **unfamiliar problem**:  

- Break it down into known building blocks (DB, cache, queues, consistency).  
- State assumptions clearly.  
- Trade-offs matter more than perfect solutions.  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
