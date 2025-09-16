---
title: News Feed (Facebook/Twitter)
description: Design a social media news feed system — requirements, system design, scaling strategies, and trade-offs.
---

# News Feed (Facebook/Twitter)

Designing a **news feed system** (like Facebook or Twitter) tests knowledge of **data modeling, caching, fanout strategies, and consistency trade-offs**.

---

## 1. Requirements

### Functional
- Users can post updates.  
- Followers see posts in their feed.  
- Support likes, comments, shares (optional).  
- Support pagination & infinite scroll.  

### Non-functional (NFRs)
- Low latency feed generation (< 200 ms).  
- High write throughput (millions of posts/day).  
- Personalized ordering (most recent or ranked).  
- High availability.  

---

## 2. Capacity Estimation (Example)

Assume:
- 100M DAU.  
- Each user posts 2 updates/day → 200M writes/day.  
- Each user reads feed 10×/day → 1B reads/day.

Calculations:
- Writes/sec ≈ 200M / 86,400 ≈ 2.3K WPS.  
- Reads/sec ≈ 1B / 86,400 ≈ 11.6K RPS.  
- Peak factor (×10) → **~23K WPS, 116K RPS**.  

Storage:
- Average post (text + metadata) = 1 KB.  
- 200M/day = 200 GB/day = ~73 TB/year.  

---

## 3. High-level Design

Components:
1. **API Gateway** → handles requests.  
2. **Post Service** → stores posts.  
3. **Feed Service** → generates personalized feed.  
4. **User Graph Service** → stores followers/following relationships.  
5. **Cache (Redis/Memcached)** → hot feeds & timelines.  
6. **Search/Ranking Service** → orders posts by relevance/recency.  
7. **Message Queue (Kafka)** → decouple fanout operations.  

---

## 4. Feed Generation Approaches

### 4.1 Fan-out on Write
- Push new posts to all followers’ feeds immediately.  
- Fast reads, slow writes.  
- Problem: celebrity users with millions of followers.  

### 4.2 Fan-out on Read
- Compute feed at read time.  
- Fast writes, slow reads.  
- Heavy load during read.  

### 4.3 Hybrid (Real-world)
- Fanout for regular users.  
- On-demand for celebrity users.  
- Cached feeds for most users.  

---

## 5. Data Modeling

- **Posts Table**: `post_id, user_id, content, timestamp`.  
- **Followers Table**: `user_id, follower_id`.  
- **Feed Table (optional)**: precomputed feeds per user.  

Indexes:  
- By `user_id` for fast writes.  
- By `timestamp` for ordering feeds.  

---

## 6. Scaling Strategies

- Partition posts DB by user ID (sharding).  
- Use NoSQL (Cassandra, DynamoDB) for high write throughput.  
- Cache feeds in Redis with TTL.  
- Precompute hot feeds asynchronously.  
- Use message queues for fanout (Kafka → Feed workers).  

---

## 7. Ranking & Personalization

- Simple: reverse chronological order.  
- Advanced: ML ranking model (engagement prediction).  
- Signals: recency, likes, comments, relationships.  

---

## 8. Bottlenecks & Solutions

- **Hot users** (millions of followers) → hybrid fanout.  
- **Cache misses** → background workers warm feeds.  
- **Large feed storage** → TTL old posts or store only IDs.  
- **Consistency vs latency** → eventual consistency acceptable.  

---

## 9. Monitoring & Metrics

- Feed latency (P95/P99).  
- Cache hit ratio.  
- Write vs read QPS.  
- Queue lag for fanout workers.  

---

## 10. Interview Tips

- Start with fanout trade-offs (read vs write).  
- Mention hybrid model.  
- Talk about caching and sharding early.  
- Call out **hot user problem**.  
- Mention ranking if time permits.

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
