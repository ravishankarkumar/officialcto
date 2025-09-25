---
title: Caches & Memory Hierarchy
description: Deep dive into memory hierarchy in computer systems, focusing on caches, cache levels, mapping techniques, coherence, and performance. Essential for system design interviews and performance engineering.
---

# Caches & Memory Hierarchy

Modern CPUs are extremely fast, but memory access often becomes the bottleneck.  
This article explores the **memory hierarchy** and the role of **caches**, highlighting how they optimize performance — crucial knowledge for **system design interviews** and **real-world engineering**.



## 1. What is the Memory Hierarchy?

The **memory hierarchy** organizes storage systems by **speed, cost, and size**:  

1. **Registers** → Fastest, inside the CPU, store temporary data.  
2. **Cache Memory (SRAM)** → Very fast, small, located close to CPU.  
3. **Main Memory (DRAM / RAM)** → Larger but slower.  
4. **Secondary Storage (SSD/HDD)** → Very large, much slower.  
5. **Tertiary Storage (tapes/archives)** → Extremely large, extremely slow.  

**Goal**: Give the CPU **fast access** to frequently used data while keeping costs manageable.



## 2. Why Do We Need Caches?

- CPU clock cycles are in **nanoseconds**.  
- DRAM access can take **tens to hundreds of nanoseconds**.  
- Without caches, CPUs would spend most of their time **waiting** for data.  

**Caches act as a “middle layer”** — small but fast memory that stores hot (frequently used) data.  



## 3. Cache Fundamentals

### 3.1 Key Characteristics
- **Speed** → Built from **SRAM** (faster but costlier than DRAM).  
- **Size** → KB–MB range (vs. GBs of RAM).  
- **Proximity** → On or very close to CPU cores.  

### 3.2 Principles of Locality
1. **Temporal Locality** → If data is used now, it’ll likely be used again soon.  
2. **Spatial Locality** → If one memory address is used, nearby ones are likely needed too.  

Caches exploit these principles to decide **what to keep**.



## 4. How Caches Work

- **Cache Hit** → Data is in cache → fast access.  
- **Cache Miss** → Data not in cache → fetch from RAM (slow).  
- **Cache Line** → Data fetched in blocks (e.g., 64 bytes) to benefit from spatial locality.  

### Write Policies
- **Write-Through** → Update both cache + RAM immediately.  
- **Write-Back** → Update cache only; write to RAM when line is evicted (faster, but riskier).  



## 5. Cache Mapping Techniques

How does the CPU decide **where to store a memory block in cache**?  

1. **Direct Mapping**  
   - Each block maps to exactly one cache line.  
   - ✅ Simple, fast lookup.  
   - ❌ Prone to conflicts (different blocks mapping to same line).  

2. **Fully Associative**  
   - Any block can go anywhere in cache.  
   - ✅ Flexible, fewer conflicts.  
   - ❌ Expensive hardware (must search all lines).  

3. **Set-Associative (N-way)**  
   - Compromise: Cache divided into sets; block can go into any line in a set.  
   - ✅ Balance between simplicity and flexibility.  
   - Example: 4-way set-associative cache = each set has 4 lines.  



## 6. Cache Replacement Policies

When cache is full, we need to evict something:  

- **Least Recently Used (LRU)** → Evict data unused longest.  
- **First-In-First-Out (FIFO)** → Evict oldest data.  
- **Random** → Pick a line randomly.  

LRU is common but expensive in hardware → approximations often used.



## 7. Cache Levels (L1, L2, L3)

Modern CPUs use a **multi-level cache hierarchy**:

- **L1 Cache** → Per core, very small (32–64 KB), fastest. Often split into:  
  - L1i (instructions)  
  - L1d (data)  

- **L2 Cache** → Per core, larger (256 KB–1 MB), slower than L1.  

- **L3 Cache** → Shared across cores, very large (4–50 MB), slower but still faster than RAM.  

**Key Insight**: Lower-level caches (L1) prioritize speed, higher levels (L3) prioritize capacity.



## 8. Cache Coherence (Multi-Core Issue)

In multi-core systems, each core has its own cache. Problem: **what if two cores cache the same data and one modifies it?**

### Solutions
- **MESI Protocol**  
  - Cache lines marked as: Modified, Exclusive, Shared, Invalid.  
  - Ensures only one valid copy exists.  
- **Directory-Based Protocols**  
  - Central directory tracks which core holds which cache line.  

**Interview Tip**: Be able to explain MESI with a real-world analogy (e.g., shared whiteboard updates).



## 9. Cache Performance Metrics

- **Hit Rate** = Hits ÷ Total Accesses.  
  - Higher = better (90%+ common).  
- **Miss Penalty** = Extra cycles for RAM fetch (can be 100x slower).  
- **Average Memory Access Time (AMAT)** =  
  ```
  AMAT = Hit Time + Miss Rate × Miss Penalty
  ```

### Example
- L1 hit time = 1 cycle, miss penalty = 100 cycles, miss rate = 5%.  
- AMAT = 1 + 0.05 × 100 = 6 cycles.  
- Caches reduce memory access from 100 cycles → ~6 cycles.



## 10. Performance Pitfalls

- **Cache Thrashing** → Repeated misses due to poor locality.  
- **False Sharing** → In multi-core systems, different variables in same cache line cause unnecessary invalidations.  
- **Working Set Too Large** → Program uses more data than cache can hold → frequent misses.  



## 11. Real-World Context

- **Interview Relevance**  
  - Explain cache mapping, hit/miss, AMAT.  
  - MESI protocol often comes up in multi-core discussions.  

- **Practical Engineering**  
  - Write **cache-friendly code**:  
    - Iterate over arrays in order (good spatial locality).  
    - Reuse recently accessed data (good temporal locality).  
  - Performance debugging often reveals **memory access bottlenecks**, not CPU speed.  

- **Modern Trends**  
  - **Hardware Prefetching**: CPU preloads data it thinks you’ll need.  
  - **Non-Volatile Memory (NVM)** like Intel Optane sits between RAM and SSD.  
  - **Big.LITTLE architectures**: mobile CPUs optimize cache differently for power efficiency.  



## 12. Further Reading
- *Computer Organization and Design* — Patterson & Hennessy  
- *Structured Computer Organization* — Andrew S. Tanenbaum  
- Intel & AMD architecture manuals (cache sizes, associativity, protocols).  
- Research papers on cache coherence (MESI, MOESI, directory protocols).  



<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
