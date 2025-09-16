---
title: TTLs & Eviction Policies
description: Understanding TTLs, cache eviction strategies like LRU, LFU, FIFO, and their trade-offs in system design interviews and real-world systems.
---

# TTLs & Eviction Policies

Caching improves performance, but **cache size is limited**.  
Eventually, some items must be removed to make space for new ones.  
This is where **TTLs (time-to-live)** and **eviction policies** come in.

In HLD interviews, knowing these strategies helps you show awareness of **trade-offs in caching**.

---

## 1. Time-to-Live (TTL)

TTL = how long a cache entry is valid before it expires.

### How it works
- Each cache entry has an expiration time.  
- After TTL expires, the entry is considered invalid and must be refreshed from the database.  

### Pros
- Prevents serving stale data forever.  
- Automatic cleanup of old items.  

### Cons
- May evict still-hot items if TTL is too short.  
- Too long TTL risks serving stale data.  

### Common use cases
- **DNS records** (e.g., 24h TTL).  
- **Web sessions** (30m–1h TTL).  
- **Product catalog** (hours/days).  

**Interview tip:** state assumptions for TTL, e.g., *“I’ll set a 1-hour TTL for product data to balance freshness and performance.”*

---

## 2. Eviction Policies

When cache is full, which item should be removed?  
Eviction policy decides this.

### 2.1 Least Recently Used (LRU)
- Removes the item that hasn’t been accessed for the longest time.  

**Pros**: Matches many real-world workloads (recently used = likely to be used again).  
**Cons**: Needs extra bookkeeping (linked list or counters).  

---

### 2.2 Least Frequently Used (LFU)
- Removes the item used the least often.  

**Pros**: Retains frequently accessed “hot” items longer.  
**Cons**: More expensive to maintain (need frequency counters).  
**Problem**: Cache pollution — one item accessed many times in past may stay forever.  

---

### 2.3 First-In, First-Out (FIFO)
- Removes the oldest inserted item.  

**Pros**: Simple to implement.  
**Cons**: Doesn’t account for usage patterns — may evict a hot item.  

---

### 2.4 Random Replacement
- Removes a random item.  

**Pros**: Super simple, no bookkeeping.  
**Cons**: May evict useful items. Rare in production but used in some lightweight caches.  

---

### 2.5 Adaptive Policies (ARC, TinyLFU)
- Combine recency and frequency awareness.  
- ARC (Adaptive Replacement Cache) dynamically balances between LRU and LFU.  
- TinyLFU improves LFU by adding admission control (deciding if a new item should even be cached).  

---

## 3. Choosing a Policy — Trade-offs

| Policy | Pros | Cons | Best For |
|--------|------|------|----------|
| **LRU** | Simple, effective for recency-based workloads | Some overhead | General-purpose, web caches |
| **LFU** | Keeps hot items | Complex, may keep stale hot items | Long-tail workloads (search) |
| **FIFO** | Simple, low overhead | Evicts hot items | Streaming workloads |
| **Random** | Very fast | Unpredictable | Simple embedded caches |
| **ARC/TinyLFU** | Adaptive, better hit ratio | Complex | Databases, advanced systems |

---

## 4. Combining TTL + Eviction

- TTL ensures **freshness**.  
- Eviction ensures **capacity control**.  

Example:
- Product catalog → TTL of 1 hour + LRU eviction.  
- Session store → short TTL (30 mins), eviction on memory pressure.  
- Metrics cache → LFU or TinyLFU, since hot metrics repeat often.  

---

## 5. Interview Tips

- Always mention TTL + eviction together.  
- State assumptions (TTL values, policy type).  
- Show awareness of **cache pollution** and **hot keys**.  
- Mention that eviction policy choice depends on workload.  

---

## 6. Next Steps

- Explore [CDN caching](/sections/hld/caching/cdn-caching.md).  
- Learn about [Cache Invalidation & Hot Keys](/sections/hld/caching/pitfalls.md).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
