---
title: HLD Series Hub
description: A structured guide to High-Level Design (HLD) for interviews and real-world systems — covering foundations, databases, caching, scalability, distributed systems, reliability, and more.
---

# High-Level Design (HLD) Series: From Basics to Millions of Users

High-Level Design (HLD) is at the heart of **system design interviews** and **real-world architecture**.  
This series is structured to take you from **fundamentals → advanced distributed systems → practical case studies**, so you can use it as a course or jump into topics as needed.  

---

## 📑 Articles in This Series

### **1. Foundations**
1. [System Design Mindset](/sections/hld/foundations/system-design-mindset.md)  
   Clarifying requirements → constraints → bottlenecks → scaling.  
   Always start simple (monolith) and scale step by step.  
2. [Workload Estimation](/sections/hld/foundations/workload-estimation.md)  
   Requests/sec, QPS, throughput.  
   Storage needs (GB → TB → PB).  
   Network bandwidth & latency awareness.  

---

### **2. Databases & Storage**
<!-- //todo PACELC in parallel tp cap etc -->
1. [Database for HLD](/sections/hld/database-for-hld.md)  
<!-- 2. [Sharding, Replication & Scaling Patterns](/sections/hld/databases/sharding-replication-scaling.md)  
3. [Caching & Query Optimization](/sections/hld/databases/caching-query-optimization.md)  
4. [Consistency Models & CAP/PACELC](/sections/hld/databases/consistency-models.md)  
5. [Specialized Databases (KV, Document, Graph, Search, Time-series)](/sections/hld/databases/specialized-databases.md)   -->

---

### **3. Caching**
1. [Cache-aside, Write-through, Write-back](/sections/hld/caching/strategies.md)  
2. [TTLs & Eviction Policies](/sections/hld/caching/eviction-policies.md)  
3. [CDN Caching](/sections/hld/caching/cdn-caching.md)  
4. [Pitfalls: Invalidation & Hot Keys](/sections/hld/caching/pitfalls.md)  

---

### **4. Networking & Communication**
1. [Protocols: HTTP/HTTPS, gRPC, WebSockets](/sections/hld/networking/protocols.md)  
2. [APIs: REST vs GraphQL](/sections/hld/networking/apis.md)  
3. [Load Balancing (L4 vs L7, Algorithms)](/sections/hld/networking/load-balancing.md)  
4. [CDNs & Edge Computing](/sections/hld/networking/cdns-edge.md)  

---

### **5. Scalability Patterns**
1. [Horizontal vs Vertical Scaling](/sections/hld/scalability/scaling.md)  
2. [Microservices vs Monoliths](/sections/hld/scalability/microservices-vs-monoliths.md)  
3. [Event-driven Architectures: Queues, Pub/Sub, Retries, Backpressure](/sections/hld/scalability/event-driven.md)  

---

### **6. Distributed Systems Concepts**
1. [CAP Theorem & PACELC](/sections/hld/distributed/cap-pacelc.md)  
2. [Consensus Algorithms: Raft, Paxos](/sections/hld/distributed/consensus.md)  
3. [Quorum Reads/Writes](/sections/hld/distributed/quorum.md)  
4. [Leader Election, Heartbeats, Failover](/sections/hld/distributed/leader-election.md)  
5. [Eventual vs Strong Consistency](/sections/hld/distributed/consistency-tradeoffs.md)  

---

### **7. Reliability & Fault Tolerance**
1. [Replication (Sync vs Async)](/sections/hld/reliability/replication.md)  
2. [Failover Strategies (Active-Passive, Active-Active)](/sections/hld/reliability/failover.md)  
3. [Geo-replication & Multi-region Systems](/sections/hld/reliability/geo-replication.md)  
4. [Graceful Degradation](/sections/hld/reliability/graceful-degradation.md)  
5. [Circuit Breakers, Retries, Timeouts](/sections/hld/reliability/circuit-breakers.md)  

---

### **8. Security**
1. [Authentication vs Authorization (OAuth2, JWT, RBAC)](/sections/hld/security/authentication-authorization.md)  
2. [TLS & Encryption (At Rest vs In Transit)](/sections/hld/security/encryption.md)  
3. [Rate Limiting & Throttling](/sections/hld/security/rate-limiting.md)  
4. [DDoS Protection](/sections/hld/security/ddos.md)  

---

### **9. Observability**
1. [Monitoring (Prometheus, Datadog)](/sections/hld/observability/monitoring.md)  
2. [Centralized Logging (ELK, Splunk)](/sections/hld/observability/logging.md)  
3. [Distributed Tracing (Jaeger, OpenTelemetry)](/sections/hld/observability/tracing.md)  
4. [Alerting Systems (PagerDuty, OpsGenie)](/sections/hld/observability/alerting.md)  

---

### **10. Common System Design Problems**
1. [URL Shortener (TinyURL)](/sections/hld/problems/url-shortener.md)  
2. [News Feed (Facebook/Twitter)](/sections/hld/problems/news-feed.md)  
3. [Chat System (WhatsApp, Slack)](/sections/hld/problems/chat-system.md)  
4. [Search (Google/Elasticsearch)](/sections/hld/problems/search.md)  
5. [Video Streaming (YouTube/Netflix)](/sections/hld/problems/video-streaming.md)  
6. [E-commerce Checkout (Amazon)](/sections/hld/problems/ecommerce.md)  
7. [Ride Hailing (Uber)](/sections/hld/problems/ride-hailing.md)  
8. [Payment System](/sections/hld/problems/payment-system.md)  

---

### **11. Soft Skills for HLD Interviews**
1. [Interview Strategy & Trade-offs](/sections/hld/soft-skills-hld.md)  

---

### **12. Scaling to Millions**
1. [Scaling One-Pager](/sections/hld/scaling-one-pager.md)  

---

### **13. Frequently Asked Problems**
1. [Index page](/sections/hld/faq-problems/frequently-asked-problems)
<!-- 1. [Design a Key-Value Store (DynamoDB)](/sections/hld/faq-problems/kv-store.md)  
2. [Design a Rate Limiter](/sections/hld/faq-problems/rate-limiter.md)  
3. [Design a Notification Service](/sections/hld/faq-problems/notification-service.md)  
4. [Collaborative Editing (Google Docs)](/sections/hld/faq-problems/collaborative-editing.md)  
5. [Leaderboards & Ranking System](/sections/hld/faq-problems/leaderboard.md)  
6. [Multi-tenant SaaS Platform](/sections/hld/faq-problems/multi-tenant-saas.md)  
7. [Distributed Cache (Redis)](/sections/hld/faq-problems/distributed-cache.md)  
8. [Video Conferencing (Zoom/Meet)](/sections/hld/faq-problems/video-conferencing.md)   -->

---

## 🎯 How to Use This Series
- **Beginner?** Start with Foundations + Databases.  
- **Interview Prep?** Focus on Scalability, CAP, Reliability, and Common Problems.  
- **Real-world Engineer?** Deep dive into Distributed Systems, Observability, and Security.  
- **Quick Review?** Read the Scaling One-Pager before your interview.  

---

## 📚 Further Reading
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
