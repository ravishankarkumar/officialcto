---
title: Scaling to millions of users
description: There are certain patterns that are used for scaling simple monolithic structures to handle millions of users. These patterns are important because they serve as our initial guide when designing real world systems as well as they are extremely important while tackling HLD(High level design) interviews.
---

# Scaling to Millions of Users
## Introduction

There are certain patterns that are used for scaling simple monolithic structures to handle millions of users. These patterns are important because they serve as our initial guide when designing real world systems as well as they are extremely important while tackling HLD(High level design) interviews.

**NOTE**: There are many philosophies in designing a high level architecture of an application including API-First principle, DevOps principle ("The phoenix project" book) and 12-factor app principle. In our case, we will try to follow [15 factor app principle](https://developer.ibm.com/articles/15-factor-applications/), which is an extension of [12 factor app principle](https://12factor.net/) to guide us in our journey. If we follow 12/15-factor app principle, it justifies our action, such as stateless architecture etc.

### Why scaling matters?

1. User growth is unpredictable. But, a system which is designed keeping in mind scalability will find it easy to adapt when growth surge is experienced. Best example is Instagram, which had a million users in 2/3 months of its launch. Another good example if Pokemon GO.
2. Business actually depends on ability to scale quickly so that the user experience is not compromised. A system that can't handle scale will face breakdown and cause inconsistent user experience hampering business. Downtime also damages trust and reliability, further causing harm to the business.
3. Scaling is not just about handling more users, but doing so in cost-effective manner. Had this not been a constraint, we could easily say that we will use amazon AWS lambda, but will that be cost-effective? So, we need to scale keeping the cost in mind.
4. A good understanding of the tradeoffs involved in scaling a system is useful for the interviews. Though one can't design a good system in 45-60 minutes, but it is enough to show that we are capable of thinking in right direction and that is what matters in interviews. In interviews *structured thinking and methodologies, understanding of the trade-offs, and general awareness of scalling pattern* matter as much as the output.

*NOTE:* In interviews, it is important to sometimes take cues from interviewer. In one of the interviews which I was giving at one of the Indian fintech company the interviewer asked me to design a highly synchronous system. He extended the intervie for a  hour, and in that two hour he rejected every single solution that I presented. In the final moment he said that he was dissapointed in my because I didn't use queing service (Amazon SQS/kafka etc) in the system design. After 2 hours of non-stop torture I was finally rejected. Had I taken the cues, I mightn't have had to face rejection there.

## Step 1: Start Simple (Monolith)
It is never wise to start with something complicated. It runs the risk of over-optimising the less important stuff and not-optimising the important areas expected by the interviewer. 

It's best to begin with, *One server: web app + DB + cache*. A basic setup that works end-to-end should be the starting point. And then, scale it from there by identifying bottlenecks.

How to identify bottlenecks?
Look at: CPU, memory, DB connections, DB data size, SPOF (single point of failure).

*NOTE:* This is not a no-brainer step. Your choice of database will keep influencing your design down the road. If you are in an interview, you will need to explain why you chose a particular database. Read this [fundamental chapter](/sections/hld/fundamentals/database-sql-vs-nosql) for pointers on how to choose a database.

## Step 2: Vertical Scaling

Vertical scaling means bigger machines to solve the given problem. Example, if a machine with 4GB RAM is not enough, use a machine with 8 or 16GB RAM. If vertical scaling(more CPU/RAM) can solve the problem, do it. And then look for SPOF (single point of failure) to make the system more resilient. This helps in keeping the system working end-to-end, while optimising other components one by one. It makes sense to scale out (increasing no of servers etc), once we have exhausted the limit of vertical scaling, or when we need to remove SPOFs.

*NOTE*: When we go blank in interviews, we can buy time to think while performing vertical scaling. It also subconsciously nudges interviewer to give us some hints if he is looking for some particular element in our system design.

*NOTE 2*: Now a days, system design interviews almost always expect horizontal scaling. So, don't spend a lot of time at this step. It makes sense to move to the next step as quickly as possible. Please note that Vertical scaling is still relevant in practice for short-term relief or when bottlenecks are small (CPU-bound jobs, JVM heap, etc.).

## Step 3: Horizontal Scaling
Unless explicitly mentioned, or the requirement is such that vertical scaling is enough, we are expected to perform horizontal scaling in at least one of the components. Some interviewer may still be okay with only vertical scaling, but a majority of them looks some sort of horizontal scaling. This mentality has come from the rise of microservices. So, it's better to be aware of this concept.
Add more servers.

Horizontal scaling means adding more no of machines. If a machine with 4GB RAM is insufficient, we don't use another machine with 16GB RAM, rather we keep using the machine with 4GB RAM, and add one extra machine with same specification ie 4GB RAM. Instead of one machine, now two machines with 4GB each is put to use. If that becomes insufficient, we add more no of such machines. This is the basic idea of horizontal scaling.

Horizontal; scaling comes with it's own set of problems. How do you balance load between new machines? We have to put in load balancers(Nginx, HAProxy, AWS ELB) etc.

Horizontal scaling comes with it's own set of problem such as distributing the load which enables us to keep using smaller machines.  This also adds resiliency in the system. When one machine fails, others are still working so the system doesn't go blank at once. But, this resiliency doesn't come cheap. Now you also have to handle *state/session*. We will see later how to handle this.

## Step 4: Database Scaling
### Replication (copying data across multiple DB nodes)
Almost always, we need to replicate the database. Even if we are going for vertical scaling, we still need database replication to add resilience to our system in case of natural disaster, hardware or network failure etc. 

Advantages of replication?
- High Availability: If one node fails, others can still serve traffic.
- Read Scalability: Redirect read queries to replicas (especially common in SQL).
- Disaster Recovery: Backups + replicas protect against data center failure.
- Latency Reduction: Place replicas closer to users (geo-distributed).

Data replication types:

1. **Primary-Secondary (one write, many reads)**: In this strategy, we perform write operation on only one node, and reads are conveniently done on all, or only secondary nodes. Data replication can be synchronous or asynchronous. Example include MySQL with read replicas, PostgreSQL streaming replication. It is easier to achieve *one write many reads* type data replication, but is also has downsides of data replication lag.
2. **Primary-Primary (multi-write)**: In this strategy, we write data on multiple nodes. Useful for write-heavy use cases. Also useful in geo-distributed systems. It sounds all nice until we reach conflicts. What if same data has been modified on two separate masters? In that case we may need conflict resolution mechanisms like last-write-wins, version vectors, or app-level reconciliation. Examples incluse MySQL Group Replication, PostgreSQL BDR, MongoDB replica sets with elections.

Trade-offs:
- Consistency vs availability([CAP Theorem](/sections/hld/fundamentals/cap-theorem.md))
  - Synchronous system provides consistency, but compromises on availability.
  - Asynchronous system ensures availability, but runs the risk of stale data reads.
  - There are some databases that have chosen eventual consistency as their model, and they are doing great.
- Replication lag
  - In async setups, replicas may be seconds (or more) behind primary.
  - Applications must tolerate stale reads or implement read-after-write consistency guarantees.
- Latency in Geo-Replication:
  - Writing to distant replicas increases write latency.
  - Many systems use local writes + async cross-region replication.

Tips on choosing replication strategy
- Primary–Secondary: When your workload is read-heavy and you can tolerate slightly stale reads (e.g., analytics, product catalogs).
- Primary–Primary: When you need high write availability and geo-distributed writes (e.g., collaborative apps, global user bases).

HLD Interview tips:
- Emphasize, why replication is needed (fault tolerance, scaling).
- Clearly explain which type you’d choose for the given problem.
- Clearly explain how you’d handle lag and conflicts.

### Sharding
While data replication means copying same data across different nodes, sharding means splitting the data across nodes. When the amount of data is massive and can't be fitted in one machine, or when the writes are so massive that a single database server can't handle it, we have to split the data across servers ie perform sharding.

Sharding can be done on the basis of keys(eg user ID), or hash (hash of userID etc), or by features such as orders in one shard and user data in another shard, or any other logic as deemed capable of solving bottlenecks. Common sharding is range-based, hash-based or directory-based as mentioned already.

Please note that incorrect sharding can lead to hotspot problem. Also, sharding requires rebalancing effort, which is not trivial.

Oftentimes, sharding is used in combination with replication to achieve optimal results.

[Please read about sharding vs replication here](/sections/hld/fundamentals/database-sharding-vs-replication.md).

### Bottleneck Mitigation

With scale, database starts to become bottlenecks. Let's look at a few ways to mitigate them.

- **Caching (Redis/Memcached)**: It helps avoid going to database for every read(sometime write also) operation by maintain frequently accessed data in memory. Let's look at a few caching strategy.
  - Cache-aside (lazy loading): App checks cache first, loads from DB if missing, and then updates the cache. It runs the risk of stale data if DB is updated but cache is not.
  - Write-through: Writes go to both cache and DB simultaneously. It's downside is higher write latency.
  - Write-back (less common): Writes go to cache first, DB updated asynchronously. It runs the risk of data loss if cache crashes before persisting.
- **Indexing (speed up queries)**: Index is an auxiliary data structure (commonly a B-Tree or Hash Index) that makes lookups, range queries, and sorts faster. Good schema design + proper indexing can cut query latency by orders of magnitude.
  - Trade-offs:
      - Faster reads.
      - Slower writes (inserts/updates must also update indexes).
      - More storage usage.
- **Load Balancing at DB/Query Level**
  - Distribute traffic evenly to prevent overloading a single DB node.
  - Read replicas: Send read queries to replicas, write queries to the primary.
  - Query routing: Smart proxies (e.g., PgBouncer, ProxySQL) can route queries based on type (read vs write) or shard key.
  - Application-level load balancing: The app decides which replica/shard to hit based on consistent hashing or routing rules.

- **Common Pitfalls**
  - Cache Invalidation: One of the hardest problems in computer science. When DB updates, cache must be updated or invalidated — otherwise, clients may see stale data.
  - Hot Keys: If one cache key is accessed too frequently (e.g., celebrity profile in social media), it may overwhelm a single cache node.
    - Solutions:
      - Sharding the cache (consistent hashing).
      - Local in-process caches.
      - Request coalescing (collapse duplicate cache misses into one DB hit).

**Interview Tips**: In HLD interviews
- Always mention cache + indexes as first optimizations.
- Call out pitfalls (invalidations, hot keys, replication lag).
- Show you understand the trade-offs (reads vs writes, consistency vs performance).

## Step 5: Content Delivery Networks (CDN)

When your users are spread across the globe, latency becomes a killer. Even if your servers respond in milliseconds, network hops across continents can slow everything down.

**CDNs (Content Delivery Networks)** solve this by caching content at edge locations closer to the user.

Use cases:
- Static files (HTML, CSS, JS)
- Images, video streaming
- Dynamic content caching (API caching, edge workers like Cloudflare Workers)

Techniques:
- Cache-Control headers control how long data is cached.
- Purging/invalidation strategies ensure updates propagate fast.

Trade-off: CDNs improve latency but harder with personalized data (user-specific responses)

**Examples**: Cloudflare, Akamai, AWS CloudFront, Fastly.

## Step 6: Stateless Application Layer

Stateful applications (where servers hold session data in-memory) don’t scale horizontally. So, stateless application is gaining significant traction now. This is magnified by the rise of kubernetes based architecture, where the pods are fungible in nature.

Why Stateless Matters:
-Any request can hit any server.
-Easy to add/remove servers under load.

How to Externalize State:
- Store sessions in Redis, Memcached, or a database.
- Use sticky sessions only as a last resort.

Towards Microservices: Microservices are not a silver bullet that solve every problem. They create their own set of challenges, yet, they are one way to solve scalibility issues.
- Break monoliths into services that scale independently.

## Step 7: Asynchronous Processing
Not all work needs to be synchronous. Some tasks can be handled later without blocking the user.
Use cases:
- Sending emails or notifications
- Video/image processing
- Data pipelines (ETL, analytics)

How it works:
- Producers publish tasks into a message queue.
- Consumers (workers) process tasks asynchronously.

Reliability Features:
- Retries for failed tasks
- Dead-letter queues for poisoned messages
- Idempotency to avoid duplicate effects

**Examples**: Kafka, RabbitMQ, AWS SQS, Celery.

## Step 8: Observability & Bottleneck Analysis
You can’t fix what you can’t see. Observability is key to scaling.
- Monitoring: Metrics dashboards (Prometheus, Grafana, Datadog).
- Logging: Centralized logs (ELK stack, Splunk).
- Tracing: Distributed tracing (Jaeger, OpenTelemetry).
- Alerting: PagerDuty, OpsGenie.

Finding bottlenecks:
- Amdahl’s Law: Parallelization has diminishing returns.
- 80/20 rule: 80% of time often spent in 20% of requests.

## Step 9: Reliability & Availability

Scaling isn’t just about speed — it’s also about uptime.
- Multi-AZ deployments: Spread across availability zones.
- Multi-region: Survive entire region outages.
- Redundancy vs Cost: Active-active vs active-passive.
- CAP Theorem: Can’t have perfect Consistency, Availability, Partition tolerance at the same time.
- Graceful Degradation: Serve cached/partial data during failures.

## Step 10: Security & Compliance

As scale increases, so does your attack surface.
- Encryption: HTTPS everywhere (TLS).
- Authentication & Authorization: OAuth2, JWT, RBAC.
- Rate limiting & DDoS protection: WAF, Cloudflare, API Gateway throttling.
- Compliance: GDPR, HIPAA, SOC2 depending on industry.

## Step 11: Cost Optimization

Scaling adds cost — optimization keeps it sustainable.
- Autoscaling: Match capacity to load.
- Right-sizing: Avoid over-provisioning.
- Spot/preemptible VMs: Use cheaper, short-lived instances.
- Storage tiering: Hot vs cold storage (S3 vs Glacier).
- Caching: Save infra cost by reducing DB hits.

## Step 12: Trade-offs & Common Pitfalls

- Premature Optimization: Don’t overengineer early.
- Scaling Too Late: Plan ahead for bottlenecks.
- Wrong Shard Keys: Leads to uneven load.
- Ignoring Observability: Flying blind under scale.

## Case Studies

- Instagram: Started with Postgres + Memcached + CDN.
- Twitter: From Rails monolith → microservices + caching layers.
- WhatsApp: Used Erlang’s concurrency to scale with a small team.
- E-commerce Orders DB: Sharding + replication + caching.

## Scaling Checklist

- Can you handle 10x traffic tomorrow?
- Do you know your current bottleneck?
- Is your system observable (metrics, logs, alerts)?
- Can it fail gracefully (fallbacks, partial service)?
- Can you add/remove capacity easily?

## Practice Exercises (for Interview Prep)

- Easy: Design a UserService that shards by userId.
- Medium: Build a NotificationService with replication + caching.
- Medium: Scale a booking system with sharding + replication.
- Hard: Architect a distributed Search System with sharding, replication, and caching.

## Conclusion

Scaling is iterative: start simple, scale step by step.
- In interviews: demonstrate structured thinking & trade-off awareness.
- In real-world: build incrementally, monitor constantly, optimize continuously.

## Further Reading

System Design Interview – Alex Xu.
Designing Data-Intensive Applications – Martin Kleppmann.
Google SRE Book.
High Scalability Blog.

---
<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>