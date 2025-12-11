
# Scaling Portfolio NAV Calculation from Hundreds to 500,000+ Portfolios

### *A Technical Case Study of the Portfolio Service Architecture*



## Introduction

The Portfolio Service was central to the platform’s trading ecosystem. It stored user portfolios, maintained portfolio spreads (stock holdings), provided portfolio-related APIs to other microservices, and computed **Net Asset Value (NAV)** every **5 minutes** during market hours.

Initially the system handled only a few hundred portfolios, but after several marketing campaigns, the workload ballooned to **500,000+ portfolios**. The original cron-based computation inside the core monolithic backend quickly became the bottleneck—unable to complete its work within the 5-minute window—and began affecting unrelated parts of the system.

This document describes the architectural challenges, the redesign into a scalable microservice, the hash-partitioned AWS Lambda workflow, caching and DB optimizations, resilience layers, and future improvements.



## Original Architecture & Failure Modes

### How NAV Was Originally Computed

A cron job inside the main backend executed every 5 minutes and iterated through all portfolios:

1. Fetch portfolio spread (list of holdings)
2. Fetch last computed NAV
3. Fetch stock ticks
4. Compute new NAV
5. Write back to MongoDB

### What Went Wrong at Scale

Once the portfolio count crossed **500K**, the architecture failed:

* Cron couldn’t complete within 5 minutes (overlapping executions)
* Backend CPU was saturated
* MongoDB reads surged, affecting live APIs
* Per-portfolio writes caused write amplification
* No isolation, no resilience, and limited observability

It became clear that NAV computation needed to be separated and redesigned.



## Extracting Portfolio Service Into Its Own Microservice

To isolate responsibilities and reduce load on the monolith, the Portfolio Service was extracted into a dedicated microservice.

### New Responsibilities

* Store and manage **portfolio spreads**
* Update spreads only when trades occur (from the Order Service)
* Serve portfolio data to:

  * other microservices,
  * the main backend,
  * the NAV computation pipeline (Lambda jobs)

### Non-Responsibilities

* Did **not** manage order execution
* Did **not** compute or verify trades
* Did **not** handle brokerage workflows

This clean separation allowed the Portfolio Service to scale independently and reliably.



## Dedicated Portfolio Database with Read Replicas

As traffic increased, Portfolio Service received:

* Its **own MongoDB cluster** (isolated from the main backend DB)
* Multiple **read replicas** dedicated to absorbing:

  * High read throughput from NAV Lambdas
  * Reads from internal services needing portfolio data

This ensured the heavy NAV workload **never impacted user-facing APIs**.



## Hash-Partitioned NAV Computation Using AWS Lambda

To parallelize NAV calculations across half a million portfolios, I implemented a **hash-partitioning strategy**:

```js
hash_id = portfolio_id % 20
```

This produced **20 equally distributed partitions**, each processed independently.

### Execution Flow

* EventBridge triggered **20 Lambda functions** every 5 minutes
* Each Lambda received either:

  * an environment variable like `HASH_ID=3`, or
  * an event payload `{ "hash": 3 }`

  > (I don’t recall exactly which method was used.)

### What Each Lambda Did

1. **Bulk load** all portfolios belonging to its hash partition in a paginated manner:

   ```js
   find({ hash: hash_id }, { projection: { spread: 1, last_nav: 1 } })
   ```
2. **Precompute unique stock symbols** from the already-fetched portfolios.
3. **Precompute additional symbols** only when new pages of portfolios were fetched.
4. **Fetch stock ticks once** and cache them inside the invocation.
5. **Compute NAV** for thousands of portfolios in batch.
6. **Write updated NAVs in bulk** to MongoDB.

Partitioning the portfolios enabled predictable scaling. A failure in one shard never affected the others.



## Optimizations Implemented

### Bulk Fetching Portfolio Spreads

Instead of per-portfolio queries, each Lambda performed a **paginated bulk projection query**.
This reduced:

* 25,000+ reads → **a small number of paginated bulk reads**
* overall read latency
* MongoDB IOPS

Read replicas absorbed these heavy queries without impacting production traffic.



### Skipping NAV for Inactive Portfolios

Portfolios **not accessed in the last 24 hours** were skipped during the 5-minute NAV cycle.

* These were recomputed by a **separate end-of-day NAV cron**
* This significantly reduced unnecessary computation and DB reads



### Precomputing Unique Stock Symbols per Partition

Although each Lambda processed ~25,000 portfolios, the **unique stock count** was typically only **300–800**.

Workflow:

1. Extract all symbols from the partition’s portfolios
2. Deduplicate
3. Fetch tick data **once per symbol**
4. Reuse across all NAV calculations

Benefits:

* Reduced repeated lookups
* Faster computation
* Lower memory footprint
* Better overall Lambda performance

This optimization was a major driver behind the **100× scaling**.



### Bulk Writes to MongoDB

Each Lambda used:

```js
bulk_write([ ...updates ])
```

Benefits:

* Reduced write amplification
* Lower oplog pressure
* More predictable latency
* Less stress on DB primaries

Bulk writes enabled sustained updates across partitions during peak market hours.



## Resilience and Observability Layer

### Resilience Patterns

* **Circuit breakers** around multiple stock-tick providers
* **Retry with exponential backoff + jitter**
* **Idempotent writes** to avoid double computation
* **Dead-letter logging** for failed NAV writes

### Observability

Dashboards included:

* ingestion lag
* Lambda duration per hash partition
* DB read/write heatmaps
* per-shard error rates
* tick provider latency

Alerts were triggered for:

* abnormal execution time per partition
* spikes in DB read pressure

These ensured rapid detection of issues during volatile market periods.



## Remaining Bottlenecks & What I Would Improve Next

Even though the system scaled 100×, two key improvements would further optimize cost and throughput.



### 1. Migrate from AWS Lambda to In-House Kubernetes Jobs

Lambda offered easy horizontal scaling but became expensive:

* 20 Lambdas × every 5 minutes × long runtime = high operational cost

Kubernetes CronJobs would provide:

* **Lower cost** (compute-based billing)
* Dedicated CPU & memory per worker
* Long-running workers that can retain warm caches

  > (Though tick data must be refreshed frequently)
* Better debugging, logging, observability
* Flexible scaling (20 → 50 → 100+ workers)

This is a natural evolution once traffic patterns stabilize.



### 2. Aggressive Caching of Portfolio Spreads

Portfolio spreads change **only when trades occur**, not every 5 minutes.

Fetching spreads during every NAV cycle is unnecessary.

**Proposed improvement:**

* Maintain a cached version of portfolio spreads (Redis or dedicated collection)
* Invalidate only when:

  * a trade is executed
  * a corporate action modifies holdings

NAV jobs (Lambda or K8s workers) would read spreads directly from cache.

**Expected benefits:**

* Reduce DB reads by **90–95%**
* Shorter compute cycles
* Improved stability during market spikes

## Decision making
If you are curious about how we made decisions, you are welcome to read my next [article](/my-works/trinkerr/portfolio-service-qna)


