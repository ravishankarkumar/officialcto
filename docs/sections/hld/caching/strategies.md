---
title: Cache Strategies — Cache-aside, Write-through, Write-back
description: Caching strategies every engineer should know for system design interviews and real-world systems - cache-aside, write-through, and write-back with pros, cons, and use cases.
---

# Cache Strategies — Cache-aside, Write-through, Write-back

Caching is one of the **first tools** used to improve scalability and performance in distributed systems.  
It helps reduce load on databases and improves latency for end users.  

There are three core caching strategies to know for HLD interviews and real-world design:
1. **Cache-aside (lazy loading)**
2. **Write-through**
3. **Write-back (write-behind)**

---

## 1. Cache-aside (Lazy Loading)

### How it works
- Application first checks the cache.  
- If data is **present (cache hit)** → return from cache.  
- If data is **absent (cache miss)** → fetch from DB, put into cache, return to user.  

### Example flow
```
GET request →
   Check cache →
   - Hit → return value
   - Miss → query DB → update cache → return value
```

### Pros
- Simple to implement.
- Cache only stores **frequently accessed data** (natural eviction).
- No stale data if invalidated correctly.

### Cons
- First request = **cache miss penalty** (slow).
- Risk of **stale data** if cache invalidation fails.
- Cache population is demand-driven, not proactive.

### Common use cases
- Read-heavy workloads (e.g., user profiles, product catalog).
- Systems where some staleness is tolerable.

---

## 2. Write-through

### How it works
- Every **write** goes to **both DB and cache** (synchronously).  
- Reads are always served from cache (hot data always available).  

### Example flow
```
PUT request →
   Update cache →
   Update DB →
   Ack to client
```

### Pros
- Cache is always in sync with DB.
- High **cache hit ratio** (data is always written into cache).
- Simplifies reads (always from cache).

### Cons
- **Higher write latency** (write to cache + DB).
- Cache stores data that may never be read again (wasted space).
- Write path failure needs error handling (what if cache update succeeds but DB fails?).

### Common use cases
- Systems where read latency must be consistently low (authentication tokens, session stores).
- When **consistency** between cache & DB is critical.

---

## 3. Write-back (Write-behind)

### How it works
- Write only goes to **cache** first.  
- Cache asynchronously writes to DB (later, in batches).  

### Example flow
```
PUT request →
   Write to cache →
   (Async job flushes to DB later)
```

### Pros
- **Low write latency** (client gets ack quickly).
- Can batch DB writes → fewer DB operations → cost/performance savings.

### Cons
- Risk of **data loss** if cache fails before flush.
- DB is eventually consistent with cache (staleness).
- Implementation is complex (needs durable cache, queue, or WAL).

### Common use cases
- Write-heavy workloads where eventual consistency is acceptable.
- Analytics pipelines, counters, logs, metrics aggregation.

---

## 4. Comparison Table

| Strategy       | Read Latency | Write Latency | Consistency     | Risk of Data Loss | Best For |
|----------------|--------------|---------------|-----------------|-------------------|----------|
| Cache-aside    | Fast (after miss) | Normal (DB writes only) | Eventually consistent | None (writes go to DB) | Read-heavy apps |
| Write-through  | Always fast  | Slower (write twice) | Strong (cache = DB) | None (writes to both) | Session data, critical reads |
| Write-back     | Always fast  | Very fast (cache only) | Eventually consistent | High (if cache dies) | Write-heavy, analytics |

---

## 5. Interview Tips

- Always **state which strategy you’d use** and why:
  - Cache-aside → simple, most common, read-heavy systems.  
  - Write-through → strong consistency needed, read-latency critical.  
  - Write-back → write-heavy, can tolerate eventual consistency.  
- Mention **failure modes** (cache crash, DB crash, network partition).  
- Show awareness of **trade-offs** (latency vs consistency vs durability).  
- Bring up **eviction policies** (LRU, LFU) and TTLs if time allows.

---

## 6. Next Steps

- Explore [TTLs & Eviction Policies](/sections/hld/caching/eviction-policies.md).  
- Learn about [CDN caching](/sections/hld/caching/cdn-caching.md).  
- Understand pitfalls in [Cache Invalidation & Hot Keys](/sections/hld/caching/pitfalls.md).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
