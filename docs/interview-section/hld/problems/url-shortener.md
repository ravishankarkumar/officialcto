---
title: URL Shortener (TinyURL)
description: Design a URL shortening service — requirements, capacity planning, system architecture, bottlenecks, and trade-offs.
---

# URL Shortener (TinyURL)

Design a URL shortening service where users can provide a long URL and receive a short alias (e.g., `bit.ly/abc123`) that redirects to the original URL. This is a classic HLD interview problem that tests your ability to balance storage, QPS, latency, and availability.

---

## 1. Requirements

### Functional
- Create a short URL for a given long URL.  
- Redirect short URL to the original long URL.  
- Optional: custom aliases, analytics (click counts).

### Non-functional (NFRs)
- High availability (99.99% uptime).  
- Low latency for redirects (< 50 ms).  
- Handle high QPS (design for peak).  
- Durable storage for mappings.  

---

## 2. Capacity Estimation (Example)

Assume:
- 1M daily active users (DAU).  
- Each user creates 1 short URL/day → 1M writes/day.  
- Each user performs 10 redirects/day → 10M redirects/day.

Calculations:
- Seconds per day = 86,400.  
- Avg writes/sec = 1,000,000 / 86,400 ≈ 11.6 WPS (write/s).  
- Avg redirects/sec = 10,000,000 / 86,400 ≈ 116 RPS.  
- Peak factor (×10) → plan for **~1,160 RPS** redirects at peak.

Storage:
- Each mapping entry (short + long + metadata) ≈ 200 bytes.  
- 1M new links/day → 200 MB/day → ~73 GB/year.  
- With replication (×3) → ~219 GB/year.

---

## 3. High-level Design

Components:
1. **API Servers**: handle create requests and redirects.  
2. **Load Balancer / CDN**: route users to nearest edge and cache redirects.  
3. **Database**: durable store for short→long mappings (Key-Value store).  
4. **Cache (Redis)**: hot mappings for fast redirects.  
5. **ID Generation Service**: create unique short keys.  
6. **Analytics Pipeline**: asynchronously process click events.  

### Read Path (Redirect)
- Client hits `GET /<short>` → LB → edge cache/CDN → if cache hit, redirect.  
- If cache miss → API server reads from DB → returns redirect and caches it.

### Write Path (Create)
- Client posts long URL → API server validates → ID generation → write to DB → write to cache → return short URL.  
- Analytics events queued to message broker for processing.

---

## 4. Key Design Details

### ID Generation Strategies
- **Base62 counter**: centralized counter encoded in Base62. Simple but single point of contention.  
- **Hash of URL**: deterministic, but collisions must be handled.  
- **Random key with collision check**: generate random 6–8 char key, retry on collision.  
- **Snowflake-style IDs**: distributed unique IDs, then encode.

Trade-offs: counter → short URLs but needs coordination; random → easier to scale, slightly longer keys.

### Database Choice
- Use a **Key-Value store** (DynamoDB, Bigtable, Cassandra, or Redis with persistence).  
- Requirements: low-latency reads, high availability, horizontal scaling.

### Caching & CDN
- Use CDN/edge cache for redirects (most redirects are reads).  
- Cache TTL could be long since mappings are immutable.  
- Edge cache reduces backend load dramatically.

### Handling Custom Aliases
- Check uniqueness on create; if collision, return error.  
- Might use a separate namespace/table for custom aliases.

### Analytics & Click Tracking
- Emit click events to a message queue (Kafka/SQS).  
- Process asynchronously to update counters/analytics dashboards.

---

## 5. Bottlenecks & Solutions

- **ID generation contention** → use distributed ID generation or random keys.  
- **DB hot partitions** → shard by hash, use consistent hashing, or multi-region replication.  
- **Cache stampede** → use cache pre-warming, request coalescing, or stale-while-revalidate.  
- **Traffic spikes (viral links)** → CDNs, autoscaling, rate limiting.

---

## 6. Trade-offs

- **Short key length vs collision risk**: shorter keys easier to type but higher collision chance.  
- **Consistency vs availability**: prefer availability for redirects (AP systems okay).  
- **Latency vs cost**: CDN/edge caching reduces latency but costs more.

---

## 7. Security & Abuse Prevention

- Rate limit create requests per IP/API key.  
- Detect and block malicious URLs (malware phishing).  
- Validate redirect targets (optional allowlist/denylist).

---

## 8. Monitoring & Metrics

- Monitor QPS, error rates, cache hit ratio, DB latency, and ID generation failures.  
- Alert on high error rates and low cache hit ratio.  

---

## 9. Extensions & Features

- Expiration of short links (TTL-based deletion).  
- Custom domains / vanity URLs.  
- Analytics dashboard (geography, referrer, device).  
- GDPR compliance: deletion requests, data retention policies.

---

## 10. Interview Tips

- Start with requirements and assumptions.  
- Do capacity math out loud.  
- Sketch simple architecture then iterate for bottlenecks.  
- Mention caching/CDN early for read-heavy services.  
- Discuss ID generation strategies and their trade-offs.

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
