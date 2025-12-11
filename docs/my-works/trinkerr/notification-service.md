
# Notification Service

Trinkerr was a **copy-trading platform** where followers replicated trades made by top traders. This required a **real-time, high-fan-out, personalized notification system** that could alert thousands of followers within seconds when a trader executed a trade — along with a **calculated proportional quantity suggestion** for each follower based on their portfolio size.

This is the system I designed, optimized, and scaled.



## Upstream Event Flow

After a trader’s order executed, the trading engine emitted a Kafka event:

```
trade.executed(traderId, tradeDetails)
```

The Notification Service consumed this event and began the fan-out workflow.



## Batch Processing of Followers

Some traders had **thousands** of followers. Fetching them individually would have overwhelmed the DB and slowed fan-out.

So we:

* Fetched followers in **batches**
* Calculated the **portfolio ratio** per follower
* Generated a **personalized notification payload** for each follower

Example:

```
traderPortfolio = 100,000
followerPortfolio = 10,000 → ratio = 0.1
suggestedQty = executedQty × ratio
```

This personalization made every notification unique.



## Notification Record Creation (MongoDB)

For each follower, we created a notification document containing:

* User & trader context
* Suggested quantity
* Target delivery channels
* Delivery state (pending / delivered / failed / retryCount / timestamps)

**Why MongoDB?**

* Schema evolved frequently
* Nested delivery metadata fit naturally
* Zero-downtime iteration without migrations

SQL could have handled the load with proper tuning, but **MongoDB gave faster developer iteration**, which mattered in a fast-changing startup environment.



## In-App Notification Table

Apart from the primary notification table, we also maintained a **dedicated in-app notification table**.

Purpose:

* Power the **in-app notification center**
* Allow users to view recent trade alerts
* Keep only **valid and relevant** notifications

Flow:

1. When generating notifications, we inserted a corresponding entry into the **in-app notifications table**.
2. Before inserting, we **deleted outdated notifications** for that user/trader pair.
3. There was an internal validity algorithm (e.g., intraday notifications expire quickly), but the details aren’t relevant for system design conversations.

This ensured that users always saw **fresh, contextually relevant** alerts without clutter.



## Dispatch Queue (SQS)

Once notification records were written to MongoDB, each **notification ID** was pushed into an **SQS delivery queue**.

This decoupled:

* **Notification generation** (fast, CPU-heavy)
* **Notification delivery** (slow, vendor-latency-bound)

SQS absorbed surge traffic—especially when high-profile traders triggered large fan-outs.



## Delivery Workers

A pool of workers subscribed to the SQS queue.
Each worker:

1. Loaded the notification record
2. Determined which channels to deliver to
3. Sent notification via:

   * APNS (Apple devices)
   * FCM (Android devices)
   * SMS gateway
   * In-app update trigger
4. Updated delivery status in MongoDB

We intentionally keep this high-level to avoid vendor-specific rabbit holes.



## Delivery Status Updates

After each attempt, workers updated the notification document:

```
status: "DELIVERED" / "FAILED"
attemptCount: n
lastAttemptAt: timestamp
errorMessage: optional
```

This provided:

* Accurate UI state
* Retry visibility
* Operational debugging traces



## Retry Logic & Failure Handling

Included:

* **Exponential backoff retries**
* **Channel-level retry counters**
* **Max retry caps**
* **Permanent failure marking**
* **Manual review bucket**

Circuit breakers prevented slow vendors from dragging down the entire system.



## Scaling Strategy

Peak times (like celebrity trades) created massive load spikes.
We scaled delivery using:

* Increased SQS concurrency
* Horizontally scaled worker pool
* Connection reuse for lower latency

This delivered **10× throughput improvement** and significantly lower internal processing latency.

> Note: These improvements reduced *our* latency, not vendor push/SMS latency.



## End-to-End Flow Summary

1. Trader executes trade
2. Kafka event emitted
3. Notification Service consumes event
4. Batch fetch followers
5. Compute personalized suggested quantities
6. Insert:

   * Notification entry in MongoDB
   * In-app notification entry (after pruning outdated ones)
7. Push notification ID to SQS
8. Workers process messages
9. Push/SMS/in-app deliveries
10. Update delivery status in MongoDB
11. Retry failures or mark as permanent



## The Core Impact

* **Scaled notification delivery 10×**
* **Reduced peak-hour latency** using batching + queueing + concurrency
* **Increased reliability** with retries and circuit breakers
* **Kept in-app experience clean** with curated, up-to-date notifications
* **Enabled richer product flows** using personalized proportional quantities

