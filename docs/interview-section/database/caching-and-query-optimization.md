---
title: Caching & Query Optimization
description: Learn how caching improves performance, different caching strategies, query optimization techniques, and common pitfalls in real-world systems and interviews.
---

# Caching & Query Optimization

When systems scale, **databases become a bottleneck**.  
Two of the most effective optimizations are:  
1. **Caching** — avoid hitting the database repeatedly.  
2. **Query Optimization** — make queries faster and more efficient.  

---

## 1. Why Caching Matters

Without caching:
- Every request goes to the database.
- Causes high latency + overload.

With caching:
- Frequently accessed data is served from **memory** (much faster).
- Database load decreases significantly.

👉 Serving data from memory (cache) can be **10x–100x faster** than disk-based DB access.

---

## 2. Types of Caching

### 2.1 Client-Side Caching
- Data cached in the browser or mobile client.
- Example: HTTP caching with `Cache-Control` headers.

### 2.2 CDN (Content Delivery Network) Caching
- Static content (HTML, CSS, JS, images, videos) cached at edge servers.
- Examples: Cloudflare, Akamai, AWS CloudFront.

### 2.3 Application-Side Caching
- Application caches data in memory or distributed caches.
- Examples: Redis, Memcached.

### 2.4 Database Caching
- Some databases have internal query/result caching.
- Example: MySQL query cache (deprecated), Postgres prepared statements.

---

## 3. Caching Strategies

### 3.1 Cache-Aside (Lazy Loading)
- App checks cache first.
- If not found, load from DB and put into cache.
- Simple but risks stale data.

**Use case:** Read-heavy workloads with some tolerance for staleness.

---

### 3.2 Write-Through
- Write goes to DB **and** cache simultaneously.
- Ensures cache always has fresh data.
- Slower writes (must update two systems).

**Use case:** Systems requiring strong consistency between cache & DB.

---

### 3.3 Write-Back (Write-Behind)
- Writes go to cache, DB updated asynchronously.
- Very fast writes.
- Risk: data loss if cache fails before DB update.

**Use case:** High write throughput systems (analytics, logs).

---

### 3.4 Time-to-Live (TTL) & Expiration
- Cached data expires after a certain period.
- Useful when data changes frequently.
- Example: Stock prices cached for 5 seconds.

---

## 4. Common Caching Pitfalls

- **Cache Invalidation**:  
  *“There are only two hard things in computer science: cache invalidation and naming things.”*  
  - If DB updates, cache must be updated/invalidated.  
  - Otherwise, stale data may be served.  

- **Hot Keys**:  
  - If one key is accessed too often (e.g., celebrity profile), it can overload one cache node.  
  - Solutions: Shard cache, local caches, request coalescing.  

- **Over-Caching**:  
  - Caching everything wastes memory and increases eviction churn.  

---

## 5. Query Optimization Techniques

### 5.1 Use Indexes
- Indexes speed up lookups and range queries.
- Always review indexing for frequently queried columns.

### 5.2 Avoid SELECT *
- Fetch only the required columns.
- Reduces data transfer and parsing cost.

### 5.3 Optimize Joins
- Ensure join columns are indexed.
- Consider denormalization for performance (at cost of storage).

### 5.4 Analyze Query Plans
- Use DB tools: `EXPLAIN` in MySQL/Postgres, query profiler.
- Identify full table scans, missing indexes, or inefficient joins.

### 5.5 Partitioning
- Split large tables (by range or hash).
- Helps queries scan smaller chunks.

### 5.6 Materialized Views
- Pre-compute expensive queries and store results.
- Example: Aggregated sales by day.

---

## 6. Real-World Patterns

- **Read-Heavy Workloads**  
  - Use replication + caching (e.g., Redis).  
  - Example: Instagram uses Memcached to reduce DB reads.  

- **Write-Heavy Workloads**  
  - Use write-back caching carefully.  
  - Use partitioned DB tables to spread writes.  

- **Analytics Systems**  
  - Use materialized views + columnar DBs + caching.  

---

## 7. Interview Tips

1. Always mention caching when asked *“How to scale?”*.  
2. Explain strategy (cache-aside, write-through, etc.).  
3. Mention trade-offs:  
   - Cache staleness.  
   - Invalidation complexity.  
   - Hot keys.  
4. For query optimization, talk about:  
   - Indexing.  
   - Reducing SELECT *.  
   - Using query plans.  

👉 Example Answer:  
*“To optimize performance, I’d first add caching using Redis with a cache-aside strategy. This reduces DB load. For queries, I’d review indexes and avoid SELECT *, since fetching unnecessary data adds overhead. If needed, I’d use materialized views for expensive aggregations.”*

---

## 8. Recap

- Caching = serve from memory → huge speedup.  
- Strategies: cache-aside, write-through, write-back.  
- Pitfalls: invalidation, hot keys, over-caching.  
- Query optimization = smart indexing, lean queries, and query plan analysis.  
- In interviews, always link caching + indexing as **first-line optimizations**.  

---

## Next Steps
👉 Continue with [Distributed Transactions & Patterns](/interview-section/database/distributed-transactions.md) to understand how databases handle complex multi-step operations.

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
