---
title: Ride Hailing (Uber)
description: Design a ride-hailing system covering matching, real-time tracking, surge pricing, scalability, and trade-offs.
---

# Ride Hailing (Uber)

Design a ride-hailing system where riders can request trips, drivers can accept requests, and the platform manages matching, payments, and real-time tracking. This problem tests your ability to design **low-latency, real-time, geo-distributed systems**.

---

## 1. Requirements

### Functional
- Rider requests a trip (pickup → drop).  
- Match rider with nearby driver.  
- Real-time location tracking for both rider & driver.  
- Fare calculation (distance, time, surge).  
- Payment processing.  
- Trip history for riders and drivers.  

### Non-functional
- Low latency matching (<2s).  
- Handle millions of concurrent riders/drivers.  
- High availability, fault tolerance.  
- Geo-distributed (multi-region).  

Optional: pooling (shared rides), scheduling, promotions.

---

## 2. Workload Estimation (Example)

- 10M DAU (5M riders, 1M drivers active concurrently).  
- Avg 10 rides/sec → peak ~100 rides/sec globally.  
- Location updates every 5s per driver → 1M/5 = 200k updates/sec.  
- High read/write load on location store.

---

## 3. High-Level Architecture

1. **Rider App** → request trip, real-time tracking.  
2. **Driver App** → send location updates, accept rides.  
3. **API Gateway** → routes requests.  
4. **Dispatch/Matching Service** → matches rider with nearest driver.  
5. **Location Service** → stores live driver locations (high write QPS).  
6. **Trip Service** → manages state of trip (requested → accepted → completed).  
7. **Payment Service** → handles fare calculation & payments.  
8. **Notification Service** → updates for trip events (push/SMS).  
9. **Data Pipeline** → stream processing for analytics, surge pricing.  
10. **Storage** → rider/driver DB, trip history DB, location DB.  

---

## 4. Location Service

- Stores live driver locations.  
- Needs high write throughput & low-latency reads.  
- Implementation options:  
  - Redis with geo-indexing.  
  - Specialized DB (MongoDB with geo queries, PostGIS, DynamoDB).  
- Use **geohash partitioning** for efficient lookup.  

---

## 5. Matching Algorithm

1. Rider requests trip (pickup location).  
2. Location Service returns nearby drivers (within X km).  
3. Matching Service selects best driver (closest, availability, driver score).  
4. Sends ride request to driver → driver accepts → confirmation sent to rider.  

Optimizations:
- Precompute nearest drivers by geohash buckets.  
- Use load balancing across drivers (don’t overload a few).  
- Handle retries if driver declines.  

---

## 6. Surge Pricing

- Triggered when demand > supply in an area.  
- Surge multiplier calculated via real-time analytics pipeline (Kafka + stream processors).  
- Factors: #requests, #drivers, avg wait time.  
- Update fare estimate dynamically.  

---

## 7. Trip Flow

1. Rider requests trip.  
2. Matching Service finds driver.  
3. Driver accepts → Trip Service marks trip active.  
4. Location Service continuously updates driver location → rider app gets updates.  
5. Trip completes → fare calculated → Payment Service charges rider & pays driver.  
6. Trip stored in history DB.  

---

## 8. Storage Design

- **User DB**: rider & driver profiles (SQL/NoSQL).  
- **Location DB**: real-time driver locations (geo-indexed store).  
- **Trip DB**: active + historical trips.  
- **Payment DB**: financial transactions (SQL for ACID).  

---

## 9. Scaling Challenges

- **High write QPS** from driver locations → use in-memory geo DB.  
- **Hotspot regions** (city centers) → shard by geohash.  
- **Matching latency** → cache nearest drivers; use async retries.  
- **Surge calculation** → stream processing for real-time analytics.  

---

## 10. Monitoring & Metrics

- Driver acceptance rate.  
- Trip request latency.  
- Surge pricing accuracy.  
- Location DB write latency.  
- Rider wait times.  

---

## 11. Security & Fraud Prevention

- Identity verification (drivers).  
- Payment fraud checks.  
- Prevent GPS spoofing (validate via multiple signals).  
- Rating & feedback system for trust.  

---

## 12. Trade-offs

- **Strong vs eventual consistency**: location data can be eventually consistent; payments need strong consistency.  
- **Centralized vs distributed matching**: centralized easier to optimize, distributed scales better.  
- **Surge fairness** vs revenue optimization.  

---

## 13. Real-world Examples

- **Uber**: uses H3 (hexagonal geospatial index), Kafka pipelines, ML-based surge.  
- **Lyft**: similar system with emphasis on driver fairness and ETAs.  

---

## 14. Interview Tips

- Start with trip flow and real-time constraints.  
- Do QPS math (driver updates dominate load).  
- Mention geo-indexing (geohash, H3).  
- Bring up surge pricing pipeline.  
- Discuss trade-offs (latency vs consistency).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
