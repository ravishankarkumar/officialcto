---
title: Cache Pitfalls — Invalidation & Hot Keys
description: Common pitfalls in caching — cache invalidation problems, stale data, hot keys, and how to mitigate them in high-level system design.
---

# Cache Pitfalls — Invalidation & Hot Keys

Caching is powerful for improving performance, but it introduces **new challenges**.  
In system design interviews, interviewers often test if you’re aware of **cache pitfalls** — especially **invalidation** and **hot keys**.

---

## 1. Cache Invalidation

### The Problem
- When data in DB changes, the cache may still hold **stale data**.  
- Serving stale data can cause incorrect behavior (e.g., showing wrong balance in a bank account).  

### Strategies for Invalidation
1. **Write-through**  
   - Update cache + DB together.  
   - Pros: always consistent.  
   - Cons: higher write latency.

2. **Write-around**  
   - Write goes only to DB; cache updated on next read.  
   - Pros: avoids caching rarely-read data.  
   - Cons: cache misses after writes.

3. **Write-back**  
   - Write goes to cache first, DB updated later.  
   - Pros: fast writes.  
   - Cons: high risk of stale data or loss.

4. **Explicit Invalidation**  
   - Application deletes cache entry on update.  
   - Example: `DELETE key:user:123` after updating user profile in DB.  
   - Cons: must be carefully managed.

### Interview Tip
Always acknowledge: *“Cache invalidation is one of the hardest problems in computer science.”*  
Show you know common strategies and their trade-offs.

---

## 2. Cache Consistency Models

- **Strong consistency** → cache always matches DB (expensive).  
- **Eventual consistency** → cache may lag DB briefly.  
- Many real-world systems accept **eventual consistency** for performance.  

Example:  
- Banking → needs strong consistency.  
- Social media feed → eventual consistency is acceptable.

---

## 3. Hot Keys

### The Problem
- Some cache keys get **extremely high traffic**.  
- Example: profile of a celebrity, trending hashtag, global configuration key.  
- Result: overload of one cache node (hotspot).  

### Mitigation Strategies
1. **Sharding hot keys**  
   - Break a key into multiple sub-keys (e.g., `celebrity:123:1`, `celebrity:123:2`).  
   - Distribute across nodes.

2. **Local in-process caching**  
   - Each app server keeps its own small cache.  
   - Reduces pressure on centralized cache.

3. **Request coalescing**  
   - Combine multiple concurrent requests into one DB fetch.  
   - Prevents thundering herd.

4. **Replication of hot keys**  
   - Store copies of hot keys across multiple nodes.  
   - Load balancer distributes requests.

---

## 4. Cache Stampede (Dogpile Effect)

### The Problem
- When a popular item expires, many requests miss cache → all hit DB at once.  
- Can overwhelm DB (thundering herd).  

### Mitigation Strategies
- **Stale-while-revalidate** → serve stale content while refreshing in background.  
- **Randomized TTLs** → prevent many keys expiring at same time.  
- **Request coalescing** → only one request fetches from DB, others wait.

---

## 5. Checklist for Caching Pitfalls

- [ ] How do we handle **cache invalidation** on updates?  
- [ ] Are we okay with **eventual consistency**?  
- [ ] Do we have a strategy for **hot keys**?  
- [ ] How do we prevent **cache stampedes**?  
- [ ] Do we monitor cache hit ratio and eviction patterns?  

---

## 6. Interview Tips

- Always mention invalidation when proposing caching.  
- Call out hot keys as a potential bottleneck.  
- Use real-world examples (celebrity profiles, trending hashtags).  
- Show awareness of **trade-offs** between freshness, consistency, and performance.

---

## 7. Next Steps

- Explore [Load Balancing in Networking](/interview-section/hld/networking/load-balancing.md).  
- Learn about [Event-driven Architectures](/interview-section/hld/scalability/event-driven.md).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
