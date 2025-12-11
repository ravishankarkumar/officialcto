

# Portfolio Service – System Design Deep-Dive Q&A

## Why MongoDB? Why not SQL?

Portfolio data is **heterogeneous, variable-length, and frequently updated**, which made MongoDB’s document model a better natural fit. A portfolio can contain anywhere from 1 to 50+ holdings, with inconsistent shapes across users. Representing this as normalized SQL tables would require:

* A `portfolios` table
* A `portfolio_positions` table
* Multiple JOINs or multiple queries per portfolio

At the scale of **500,000 portfolios × every 5 minutes**, this would generate JOIN-heavy, write-heavy workload that SQL can support — but only with **significant tuning, indexing effort, and sharding strategy**.

MongoDB worked better for these reasons:

### Schemaless portfolio spreads

Documents allowed storing the entire spread inline without JOINs. SQL *can* model this, but with normalized tables and relationships that add complexity and increase per-portfolio query load.

### Efficient bulk projection queries

MongoDB’s ability to fetch only selected fields (e.g., `{ spread: 1, last_nav: 1 }`) is extremely fast. SQL *also* supports column-based projection, but JOINing position tables for 500K portfolios every 5 minutes would be more expensive unless heavily denormalized.

### Read replicas are trivial to scale horizontally

MongoDB replica sets allow read scaling with minimal operations overhead. SQL replicas also scale reads, but:

* replication lag is more common
* tuning read/write separation requires more care
* scaling many replicas is harder operationally

MongoDB handled **20 Lambdas hitting it every 5 minutes** without sophisticated ops.

### NAV calculation is not transactional or relational

SQL shines in transactional, constraint-heavy workflows. NAV computation is:

* periodic
* read-heavy
* CPU-heavy
* operating on independent documents

No multi-row transactions or relational guarantees were needed.

### Summary:

**Both SQL and MongoDB can handle read-heavy workloads**, but the document shape, read patterns, and bulk-projection-heavy workflow favored MongoDB for simplicity, operational ease, and performance at this scale.



## Why AWS Lambda instead of EC2 or Kubernetes?

NAV computation is:

* periodic (every 5 minutes)
* embarrassingly parallel
* stateless across cycles
* bursty and compute-heavy only during specific intervals

Lambda matched this pattern extremely well.

Lambda benefits:

### Zero infrastructure to manage

No autoscaling groups, no cluster, no worker pods. With limited DevOps resources, Lambda enabled immediate scaling during rapid user growth.

### Instant parallelism

Triggering 20 Lambdas results in immediate concurrency without tuning horizontal pod autoscalers or instance warm-up.

### Pay-per-execution

At early scale (hundreds → tens of thousands of portfolios), Lambda was cost-efficient and elastic. Costs only started to rise at very high scale.

### Simple operational model

NAV calculation required:

* fetch tick data
* read bulk portfolio spreads
* compute
* bulk write results

Lambda’s ephemeral, stateless execution fit the job well.

### Why not Kubernetes initially?

Operating Kubernetes requires:

* cluster management
* autoscaling policies
* centralized logging/instrumentation
* image management

At the time, Lambda allowed the team to scale **10× faster with essentially no ops**. If I had enough time, I would have preferred kubernetes based solution, but the sudden marketing burst led me to look for the fastest solution.



## Why only 20 Lambda partitions?

20 was chosen as the optimal balance of:

### DB throughput

Each Lambda performs:

* paginated bulk reads
* symbol extraction
* bulk writes

MongoDB read replicas could safely handle ~20 concurrent projection workloads. Increasing to 50–100 risked:

* read spikes
* saturating IOPS
* replica lag

### Lambda concurrency quotas

AWS enforces account-level concurrency limits.
20 long-running Lambdas kept us comfortably below the threshold.

### Batch size efficiency

500,000 portfolios ÷ 20 = ~25,000 portfolios per Lambda.

This was:

* small enough for memory
* large enough to amortize symbol-deduplication and tick caching
* ideal for batch processing efficiency

### Operational simplicity

Monitoring:

* 20 shards
* 20 dashboards
* 20 alert streams

Scaling to 60–100 partitions complicates ops significantly.



## Why hash partitioning instead of queues or dynamic assignment?

Hashing (`portfolio_id % 20`) provided:

### Deterministic ownership

Same portfolio always goes to the same partition → no double processing, no race conditions.

### Very fast batch queries

Mongo query:

```js
find({ hash: HASH_ID })
```

is efficient and requires no sorting or queue coordination.

### Even distribution

Portfolio IDs are uniformly distributed, producing balanced shards.

### Simplicity over queue-based designs

Queues introduce:

* work stealing
* dead-letter queue handling
* uneven partition sizes
* backpressure orchestration

Hashing gave a **stable, predictable, low-ops** partitioning scheme.



## Why bulk reads? Why not per-portfolio queries?

Because the workload is large and repeated every 5 minutes.
Per-portfolio queries would mean:

```
500,000 portfolios × 20 fields × every 5 minutes
```

Bulk reads:

* reduce total queries to a handful
* use MongoDB’s efficient projection engine
* minimize network roundtrips
* leverage read replicas more effectively

SQL could also perform bulk reads, but complex JOINs and normalized row models would increase cost significantly.



## Why bulk writes?

NAV updates for 25K portfolios per Lambda generate huge write volume. Writing one document at a time would:

* overwhelm MongoDB primary
* increase replication lag
* increase network overhead
* risk partial updates under load

Bulk writes:

* compress thousands of updates
* reduce oplog pressure
* reduce latency
* keep writes atomic at the batch level

Both SQL and MongoDB support bulk writes — but Mongo’s `bulk_write()` API is seamless for document updates.



## Why skip NAV computation for inactive portfolios?

Portfolios not accessed in the last 24 hours do not need minute-level accuracy.

Skipping them:

* reduces compute
* reduces DB read load
* reduces DB write load
* improves 5-minute SLA for active users

They were still recomputed via:

* a nightly EOD NAV job
* corporate actions adjustments

This technique is widely used in trading and analytics systems.



## Why precompute unique stock symbols per batch?

Each partition (~25K portfolios) typically references **300–800 unique symbols**.

Precomputing symbols allowed:

* 1 tick fetch per symbol, not per portfolio
* faster Lambda execution
* smaller in-memory working set
* less repeated network traffic

This optimization dramatically reduced tick-provider latency and cost.



## Why not Kafka for NAV ingestion?

Kafka is excellent for event-driven processing, but NAV calculation is:

* periodic
* scheduled
* deterministic
* CPU-heavy
* not triggered by user events

Using Kafka would introduce:

* operational complexity
* a consumer group per partition
* need for offset management
* need for idempotency & event storage

For a strictly **time-triggered batch computation**, Kafka would add more overhead than value.



## Why move to Kubernetes later?

Lambda was ideal during explosive growth, providing frictionless scaling.
But at mature scale:

### Costs grew significantly

20 Lambdas × every 5 minutes × long executions = expensive.

### More control needed

K8s gives:

* configurable CPU/memory per job
* warmer caches
* longer execution windows
* easier tracing/logging/debugging

### Predictability

Workers running as CronJobs on K8s behave more consistently than ephemeral Lambdas.

Kubernetes was the natural next step for **cost and operational efficiency**.



## Why not use Redis to cache spreads from day 1?

Because the **spread update pipeline was evolving**.
Early introduction of Redis caching risked:

* stale spreads
* correctness bugs
* invalidation complexity

MongoDB reads were sufficient at early scale thanks to replica sets.
Once the workload matured, spread caching became the obvious next optimization.



## What was the biggest engineering challenge?

Recomputing NAV for **500,000+ portfolios every 5 minutes** while:

* maintaining DB health
* not impacting user-facing APIs
* staying within time budgets
* handling market-driven volatility
* keeping infra cost under control

The redesign solved this through sharding, bulk I/O, Lambda parallelism, and caching.



## What would I improve in hindsight?

* Migrate computation from Lambda → Kubernetes for cost + control
* Aggressively cache portfolio spreads (with trade-based invalidation)
* Potentially adopt CQRS-like separation for read-heavy workloads

These are natural evolutions after achieving stability.
