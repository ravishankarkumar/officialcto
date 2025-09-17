---
title: Workload Estimation
description: How to estimate QPS, throughput, storage, and bandwidth for system design interviews and real-world architectures.
---

# Workload Estimation

Workload estimation is one of the **first steps** in any system design exercise.  
Before drawing architecture diagrams, you should know **the scale of the problem** — how many users, how many requests, how much data, and what latency is acceptable.

This page gives you a structured way to estimate:
- **Requests per second (QPS) & throughput**
- **Storage needs (GB → TB → PB)**
- **Network bandwidth & latency considerations**

---

## 1. Why Workload Estimation Matters

- It **anchors your design**: without numbers, you can’t justify why you picked sharding, caching, or microservices.
- It helps you **identify bottlenecks early** (DB writes, bandwidth, disk space).
- Interviewers love to see you **quantify assumptions**, even with rough math.

---

## 2. Estimating Requests per Second (QPS)

### Formula
```
QPS = (Total Requests per Day) ÷ (Seconds per Day)
```

- Seconds per day = 24 × 3600 = **86,400**

### Example: Social Media Feed
- Users = 10M Daily Active Users (DAU)  
- Each user = 20 feed refreshes/day  
- Total requests/day = 200M  

```
QPS = 200,000,000 ÷ 86,400 ≈ 2,314 QPS
```

Add a **peak factor** (×10) → ~23,000 QPS.  
Always design for **peak QPS**, not average.

---

## 3. Estimating Throughput (Reads vs Writes)

- Define **read-to-write ratio** (often 90:10 or 80:20).
- Reads and writes may scale differently.

### Example: Messaging App
- Total requests/day = 100M
- Assume 80% reads, 20% writes

```
Reads/day = 80M → ~926 QPS (avg) → ~9.2k QPS peak
Writes/day = 20M → ~231 QPS (avg) → ~2.3k QPS peak
```

This tells you DB writes are fewer, but read scaling matters much more.

---

## 4. Storage Estimation

### Formula
```
Storage per object × Objects per user × Users
```

### Example: Photo Sharing App
- Average photo size = 500 KB  
- 10 photos/user/day  
- 1M users/day  

```
Daily storage = 500 KB × 10 × 1,000,000 = 5,000,000,000 KB
              = 5,000 GB = 5 TB per day
```

- For 1 year → 5 TB × 365 ≈ **1.8 PB/year**  
- With replication (×3) → ~5.4 PB/year

Always **include replication factor** when estimating storage.

---

## 5. Bandwidth Estimation

### Formula
```
Bandwidth (bytes/sec) = Requests/sec × Data per request
```

### Example: Video Streaming
- 100,000 concurrent viewers  
- Each stream = 2 Mbps  

```
Total bandwidth = 100,000 × 2 Mbps = 200 Gbps
```

Implication: need CDNs + edge caching to handle this traffic.

---

## 6. Latency Budgets

- Latency budget = acceptable end-to-end response time.
- Break it down into components:
  - Network latency (client → server → client)
  - Processing time (app + DB query)
  - Queueing delays
  - Cache lookup vs DB lookup

### Typical Targets
- API requests: < 200 ms (95th percentile)
- Page load: < 2 sec
- Realtime chat: < 100 ms
- Video streaming start: < 1–2 sec

**Interview tip:** say “I’ll assume 200 ms P95 latency for API requests, unless stricter requirements are specified.”

---

## 7. Quick Estimation Checklist

- [ ] **Users**: DAU, MAU (daily/monthly active users)  
- [ ] **Requests per user**: average requests/day/user  
- [ ] **Total requests/day → QPS** (with peak factor)  
- [ ] **Read/write ratio** (to size DB load)  
- [ ] **Data size per object** (KB → MB → GB)  
- [ ] **Storage growth rate** (daily, monthly, yearly)  
- [ ] **Replication factor**  
- [ ] **Bandwidth needs** (bytes/sec or Mbps)  
- [ ] **Latency budget** (what’s acceptable?)  

---

## 8. Practice Examples

1. **URL Shortener**
   - 100M new short URLs per year
   - Each record = 100 bytes  
   - Storage = ~10 GB/year (small, bottleneck is QPS not storage).

2. **Chat App**
   - 10M DAU × 50 messages/day = 500M messages/day
   - Each message ~200 bytes  
   - Storage/day = ~100 GB  
   - QPS ≈ 5,800 avg → 58k peak  

3. **Video Platform**
   - 1M DAU × 2 GB video uploads/day = 2 PB/year  
   - Bandwidth for streaming is dominant, not storage.

---

## 9. Interview Tips

- Always **state assumptions** (users, activity, object size).  
- Show **back-of-the-envelope math** (write it step by step).  
- Call out **replication overhead**.  
- Differentiate **hot data vs cold data** (recent vs archived).  
- Mention **peak vs average QPS** explicitly.  

---

## 10. Next Steps

- Move to **[Sharding & Replication](/interview-section/hld/database-for-hld)** once workloads exceed a single machine.  
- Or learn about **[Caching Strategies](/interview-section/hld/caching/strategies.md)** for latency-sensitive scaling.

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
