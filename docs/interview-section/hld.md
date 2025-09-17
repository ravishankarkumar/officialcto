---
title: HLD Series Hub
description: A structured guide to High-Level Design (HLD) for interviews and real-world systems — covering foundations, databases, caching, scalability, distributed systems, reliability, and more.
---

# High-Level Design (HLD) Series: From Basics to Millions of Users

High-Level Design (HLD) is at the heart of **system design interviews** and **real-world architecture**.  
This series is structured to take you from **fundamentals → advanced distributed systems → practical case studies**, so you can use it as a course or jump into topics as needed.  

---

## Articles in This Series

### **1. Foundations**
1. [System Design Mindset](/interview-section/hld/foundations/system-design-mindset.md)  
   Clarifying requirements → constraints → bottlenecks → scaling.  
   Always start simple (monolith) and scale step by step.  
2. [Workload Estimation](/interview-section/hld/foundations/workload-estimation.md)  
   Requests/sec, QPS, throughput.  
   Storage needs (GB → TB → PB).  
   Network bandwidth & latency awareness.  

---

### **2. Databases & Storage**
<!-- //todo PACELC in parallel tp cap etc -->
1. [Database for HLD](/interview-section/hld/database-for-hld.md)  
<!-- 2. [Sharding, Replication & Scaling Patterns](/interview-section/hld/databases/sharding-replication-scaling.md)  
3. [Caching & Query Optimization](/interview-section/hld/databases/caching-query-optimization.md)  
4. [Consistency Models & CAP/PACELC](/interview-section/hld/databases/consistency-models.md)  
5. [Specialized Databases (KV, Document, Graph, Search, Time-series)](/interview-section/hld/databases/specialized-databases.md)   -->

---

### **3. Caching**
1. [Cache-aside, Write-through, Write-back](/interview-section/hld/caching/strategies.md)  
2. [TTLs & Eviction Policies](/interview-section/hld/caching/eviction-policies.md)  
3. [CDN Caching](/interview-section/hld/caching/cdn-caching.md)  
4. [Pitfalls: Invalidation & Hot Keys](/interview-section/hld/caching/pitfalls.md)  

---

### **4. Networking & Communication**
1. [Protocols: HTTP/HTTPS, gRPC, WebSockets](/interview-section/hld/networking/protocols.md)  
2. [APIs: REST vs GraphQL](/interview-section/hld/networking/apis.md)  
3. [Load Balancing (L4 vs L7, Algorithms)](/interview-section/hld/networking/load-balancing.md)  
4. [CDNs & Edge Computing](/interview-section/hld/networking/cdns-edge.md)  

---

### **5. Scalability Patterns**
1. [Horizontal vs Vertical Scaling](/interview-section/hld/scalability/scaling.md)  
2. [Microservices vs Monoliths](/interview-section/hld/scalability/microservices-vs-monoliths.md)  
3. [Event-driven Architectures: Queues, Pub/Sub, Retries, Backpressure](/interview-section/hld/scalability/event-driven.md)  

---

### **6. Distributed Systems Concepts**
1. [CAP Theorem & PACELC](/interview-section/hld/distributed/cap-pacelc.md)  
2. [Consensus Algorithms: Raft, Paxos](/interview-section/hld/distributed/consensus.md)  
3. [Quorum Reads/Writes](/interview-section/hld/distributed/quorum.md)  
4. [Leader Election, Heartbeats, Failover](/interview-section/hld/distributed/leader-election.md)  
5. [Eventual vs Strong Consistency](/interview-section/hld/distributed/consistency-tradeoffs.md)  

---

### **7. Reliability & Fault Tolerance**
1. [Replication (Sync vs Async)](/interview-section/hld/reliability/replication.md)  
2. [Failover Strategies (Active-Passive, Active-Active)](/interview-section/hld/reliability/failover.md)  
3. [Geo-replication & Multi-region Systems](/interview-section/hld/reliability/geo-replication.md)  
4. [Graceful Degradation](/interview-section/hld/reliability/graceful-degradation.md)  
5. [Circuit Breakers, Retries, Timeouts](/interview-section/hld/reliability/circuit-breakers.md)  

---

### **8. Security**
1. [Authentication vs Authorization (OAuth2, JWT, RBAC)](/interview-section/hld/security/authentication-authorization.md)  
2. [TLS & Encryption (At Rest vs In Transit)](/interview-section/hld/security/encryption.md)  
3. [Rate Limiting & Throttling](/interview-section/hld/security/rate-limiting.md)  
4. [DDoS Protection](/interview-section/hld/security/ddos.md)  

---

### **9. Observability**
1. [Monitoring (Prometheus, Datadog)](/interview-section/hld/observability/monitoring.md)  
2. [Centralized Logging (ELK, Splunk)](/interview-section/hld/observability/logging.md)  
3. [Distributed Tracing (Jaeger, OpenTelemetry)](/interview-section/hld/observability/tracing.md)  
4. [Alerting Systems (PagerDuty, OpsGenie)](/interview-section/hld/observability/alerting.md)  

---

### **10. Common System Design Problems**
1. [URL Shortener (TinyURL)](/interview-section/hld/problems/url-shortener.md)  
2. [News Feed (Facebook/Twitter)](/interview-section/hld/problems/news-feed.md)  
3. [Chat System (WhatsApp, Slack)](/interview-section/hld/problems/chat-system.md)  
4. [Search (Google/Elasticsearch)](/interview-section/hld/problems/search.md)  
5. [Video Streaming (YouTube/Netflix)](/interview-section/hld/problems/video-streaming.md)  
6. [E-commerce Checkout (Amazon)](/interview-section/hld/problems/ecommerce.md)  
7. [Ride Hailing (Uber)](/interview-section/hld/problems/ride-hailing.md)  
8. [Payment System](/interview-section/hld/problems/payment-system.md)  

---

### **11. Soft Skills for HLD Interviews**
1. [Interview Strategy & Trade-offs](/interview-section/hld/soft-skills-hld.md)  

---

### **12. Scaling to Millions**
1. [Scaling One-Pager](/interview-section/hld/scaling-one-pager.md)  

---

### **13. Frequently Asked Problems**
1. [Index page](/interview-section/hld/faq-problems/frequently-asked-problems)
<!-- 1. [Design a Key-Value Store (DynamoDB)](/interview-section/hld/faq-problems/kv-store.md)  
2. [Design a Rate Limiter](/interview-section/hld/faq-problems/rate-limiter.md)  
3. [Design a Notification Service](/interview-section/hld/faq-problems/notification-service.md)  
4. [Collaborative Editing (Google Docs)](/interview-section/hld/faq-problems/collaborative-editing.md)  
5. [Leaderboards & Ranking System](/interview-section/hld/faq-problems/leaderboard.md)  
6. [Multi-tenant SaaS Platform](/interview-section/hld/faq-problems/multi-tenant-saas.md)  
7. [Distributed Cache (Redis)](/interview-section/hld/faq-problems/distributed-cache.md)  
8. [Video Conferencing (Zoom/Meet)](/interview-section/hld/faq-problems/video-conferencing.md)   -->

---

## How to Use This Series
- **Beginner?** Start with Foundations + Databases.  
- **Interview Prep?** Focus on Scalability, CAP, Reliability, and Common Problems.  
- **Real-world Engineer?** Deep dive into Distributed Systems, Observability, and Security.  
- **Quick Review?** Read the Scaling One-Pager before your interview.  

---

## Further Reading
- *Designing Data-Intensive Applications* — Martin Kleppmann  
- *System Design Interview* — Alex Xu  
- *Site Reliability Engineering (SRE)* — Google  
- High Scalability Blog  
- Engineering blogs of Netflix, Uber, Airbnb, and Meta  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
