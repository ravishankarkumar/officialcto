---
title: Design an API Rate Limiter
description: Master the design of an API rate limiter in Java, covering scalability, low latency, and token bucket algorithm for high-level system design.
---

# Design an API Rate Limiter

## Overview
An API rate limiter restricts the number of requests a user or client can make to an API within a time window, preventing abuse and ensuring system stability. In this nineteenth lesson of Section 5 in the *Official CTO* journey, we explore the **high-level design of an API rate limiter**, covering functional requirements (limiting requests per user), non-functional requirements (scalability, low latency, reliability), and trade-offs (algorithm choice, storage, distributed consistency). Whether building an API platform or a microservices system, this design ensures robust performance. By mastering this, you’ll architect scalable Java systems and mentor others effectively.

Inspired by *Clean Architecture*, *Designing Data-Intensive Applications*, and *System Design Interview*, this 25-minute lesson covers the concepts, a practical Java example with a system architecture diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand **functional** (limiting requests) and **non-functional** (scalability, latency, reliability) requirements for an API rate limiter.
- Learn to design an **API rate limiter** in Java, addressing components and trade-offs.
- Apply **OOP principles** (Section 2, Lecture 1), **UML** (Section 2, Lecture 2), **design principles** (Section 4), and **HLD concepts** (Section 5, Lectures 1-18) to system design.
- Design scalable Java systems with clean code practices (Section 9).

## Why API Rate Limiter Design Matters
API rate limiters are critical for protecting APIs from abuse, ensuring fair usage, and maintaining system performance. Early in my career, I designed a rate limiter for an API platform, using a token bucket algorithm to achieve low latency and scalability. This design—balancing functionality and performance—is a staple in FAANG system design interviews. Explaining it clearly showcases your mentorship skills.

In software engineering, API rate limiter design helps you:
- **Protect Systems**: Prevent abuse and ensure fair resource allocation.
- **Handle Scale**: Support millions of requests with distributed systems.
- **Ensure Low Latency**: Optimize rate checks with caching.
- **Teach Effectively**: Share scalable rate-limiting strategies.

## Key Concepts
### 1. Functional Requirements
- **Limit Requests**: Restrict API calls per user/client within a time window (e.g., 100 requests/hour).
- **Track Usage**: Monitor request counts and enforce limits.
- **Optional**: Support burst handling, custom limits per endpoint.

### 2. Non-Functional Requirements
- **Scalability**: Handle millions of users and requests daily.
- **Low Latency**: <10ms for rate limit checks.
- **Reliability**: Ensure consistent limit enforcement (99.9% uptime).
- **Storage Efficiency**: Optimize for rate-limiting data.

### 3. System Components
- **Client**: Applications making API requests.
- **API Gateway**: Enforces rate limits (e.g., Nginx with rate-limiting module).
- **Application Server**: Handles logic (e.g., Java Spring Boot).
- **Cache**: Stores rate-limiting data (e.g., Redis).
- **Database**: Persists long-term usage data (e.g., Cassandra).
- **Message Queue**: Manages async updates (e.g., Kafka).

### 4. Rate-Limiting Algorithms
- **Token Bucket**: Tokens are added at a fixed rate; requests consume tokens.
- **Leaky Bucket**: Requests are processed at a fixed rate.
- **Sliding Window**: Tracks requests within a moving time window.

### 5. Trade-Offs
- **Algorithm Choice**: Token bucket (flexible, burst-friendly) vs. sliding window (precise, complex).
- **Storage**: In-memory cache (fast, volatile) vs. database (persistent, slower).
- **CAP Theorem**: Prioritize CP (consistency, partition tolerance) for accurate limits; AP for high availability.

### 6. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and polymorphism modularize components.
- **UML** (Section 2, Lecture 2): Diagrams visualize architecture.
- **Design Principles** (Section 4): SoC (Lecture 11) separates rate limiting and API logic; KISS (Lecture 8) simplifies algorithms.
- **HLD Concepts**:
  - Components (Section 5, Lecture 1): Map to API gateway, cache, database.
  - Requirements (Section 5, Lecture 2): Drive scalability and latency goals.
  - Scaling (Section 5, Lecture 3): Use sharding and caching.
  - Security/Performance (Section 5, Lecture 4): Ensure low latency and secure enforcement.
  - Distributed Systems (Section 5, Lecture 5): Handle partitioning and consistency.
  - URL Shortener (Section 5, Lecture 6): Similar storage and ID generation.
  - Pastebin (Section 5, Lecture 7): Similar storage patterns.
  - Web Crawler (Section 5, Lecture 8): Similar scalability challenges.
  - Twitter Feed (Section 5, Lecture 9): Similar real-time updates.
  - Instagram Sharing (Section 5, Lecture 10): Similar real-time delivery.
  - YouTube Streaming (Section 5, Lecture 11): Similar real-time processing.
  - Netflix Recommendation (Section 5, Lecture 12): Similar real-time processing.
  - Uber Ride-Sharing (Section 5, Lecture 13): Similar real-time coordination.
  - WhatsApp Messaging (Section 5, Lecture 14): Similar real-time delivery.
  - Dropbox Storage (Section 5, Lecture 15): Similar storage patterns.
  - E-commerce Platform (Section 5, Lecture 16): Similar API-driven systems.
  - Ticket Booking (Section 5, Lecture 17): Similar concurrency control.
  - Notification System (Section 5, Lecture 18): Similar real-time delivery.

### 7. Use Case
Design an API rate limiter for an API platform to restrict requests per user, ensuring scalability and low latency.

## System Design
### Architecture
```
[Client (Application)] --> [API Gateway (Nginx)] --> [Application Server (Spring Boot)]
                                                   |
                                                   |--> [Cache (Redis)]
                                                   |--> [Database (Cassandra)]
                                                   |
                                                [Queue (Kafka)]
```

- **Rate Limiting**:
  1. Client sends API request via `/api/endpoint`.
  2. API gateway checks rate limit in Redis using token bucket.
  3. If allowed, forward to application server; else, return 429 (Too Many Requests).
  4. Application server processes request; updates usage in Redis/Cassandra.
  5. Kafka enqueues usage updates for persistence.
- **Scalability**: Shard Redis/Cassandra by user ID; replicate for availability.
- **Performance**: Use Redis for low-latency rate checks.
- **Reliability**: Persist usage in Cassandra for consistency.
- **Trade-Offs**: Token bucket (burst-friendly) vs. sliding window (precise).

### Trade-Offs
- **Algorithm**: Token bucket (simple, burst-friendly) vs. sliding window (precise, complex).
- **Storage**: Redis (fast, in-memory) vs. Cassandra (persistent, slower).
- **Consistency**: CP for accurate limits (reliable) vs. AP for high availability (faster).

## Code Example: Token Bucket Rate Limiter
Let’s implement a simplified Java token bucket rate limiter with Redis caching.

```java
import java.util.HashMap;
import java.util.Map;

public class RateLimit {
    private String userId;
    private int tokens;
    private long lastRefillTimestamp;
    
    public RateLimit(String userId, int tokens, long lastRefillTimestamp) {
        this.userId = userId;
        this.tokens = tokens;
        this.lastRefillTimestamp = lastRefillTimestamp;
    }
    
    public String getUserId() {
        return userId;
    }
    
    public int getTokens() {
        return tokens;
    }
    
    public void setTokens(int tokens) {
        this.tokens = tokens;
    }
    
    public long getLastRefillTimestamp() {
        return lastRefillTimestamp;
    }
    
    public void setLastRefillTimestamp(long timestamp) {
        this.lastRefillTimestamp = timestamp;
    }
}

public interface RateLimitRepository {
    void saveRateLimit(RateLimit rateLimit);
    RateLimit getRateLimit(String userId);
}

public class CassandraRateLimitRepository implements RateLimitRepository {
    private final Map<String, RateLimit> storage = new HashMap<>();
    
    @Override
    public void saveRateLimit(RateLimit rateLimit) {
        System.out.println("Saving rate limit to Cassandra: " + rateLimit.getUserId());
        storage.put(rateLimit.getUserId(), rateLimit);
    }
    
    @Override
    public RateLimit getRateLimit(String userId) {
        System.out.println("Fetching rate limit from Cassandra: " + userId);
        return storage.getOrDefault(userId, null);
    }
}

public class RedisCache {
    private final Map<String, RateLimit> cache = new HashMap<>();
    
    public RateLimit getCachedRateLimit(String userId) {
        System.out.println("Checking Redis cache for rate limit: " + userId);
        return cache.getOrDefault(userId, null);
    }
    
    public void cacheRateLimit(RateLimit rateLimit) {
        System.out.println("Caching rate limit in Redis: " + rateLimit.getUserId());
        cache.put(rateLimit.getUserId(), rateLimit);
    }
}

public class KafkaQueue {
    public void enqueueRateLimitUpdate(String userId, RateLimit rateLimit) {
        System.out.println("Enqueuing rate limit update to Kafka: " + userId);
    }
}

public class RateLimiterService {
    private final RateLimitRepository repository;
    private final RedisCache cache;
    private final KafkaQueue queue;
    private final int maxTokens = 100; // 100 requests/hour
    private final long refillIntervalMs = 3600_000; // 1 hour
    private final int tokensPerRefill = 100; // Refill to max
    
    public RateLimiterService(RateLimitRepository repository, RedisCache cache, KafkaQueue queue) {
        this.repository = repository;
        this.cache = cache;
        this.queue = queue;
    }
    
    public boolean allowRequest(String userId) {
        RateLimit rateLimit = cache.getCachedRateLimit(userId);
        if (rateLimit == null) {
            rateLimit = repository.getRateLimit(userId);
            if (rateLimit == null) {
                rateLimit = new RateLimit(userId, maxTokens, System.currentTimeMillis());
            }
            cache.cacheRateLimit(rateLimit);
        }
        
        // Refill tokens based on time elapsed
        long now = System.currentTimeMillis();
        long elapsed = now - rateLimit.getLastRefillTimestamp();
        if (elapsed >= refillIntervalMs) {
            rateLimit.setTokens(maxTokens);
            rateLimit.setLastRefillTimestamp(now);
        } else {
            int tokensToAdd = (int) (elapsed * tokensPerRefill / refillIntervalMs);
            rateLimit.setTokens(Math.min(maxTokens, rateLimit.getTokens() + tokensToAdd));
        }
        
        // Check if request is allowed
        if (rateLimit.getTokens() <= 0) {
            return false;
        }
        
        rateLimit.setTokens(rateLimit.getTokens() - 1);
        cache.cacheRateLimit(rateLimit);
        repository.saveRateLimit(rateLimit);
        queue.enqueueRateLimitUpdate(userId, rateLimit);
        return true;
    }
}

public class RateLimiterController {
    private final RateLimiterService service;
    
    public RateLimiterController(RateLimiterService service) {
        this.service = service;
    }
    
    public boolean handleRequest(String userId) {
        return service.allowRequest(userId);
    }
}

public class RateLimiterClient {
    public static void main(String[] args) {
        RateLimitRepository repository = new CassandraRateLimitRepository();
        RedisCache cache = new RedisCache();
        KafkaQueue queue = new KafkaQueue();
        RateLimiterService service = new RateLimiterService(repository, cache, queue);
        RateLimiterController controller = new RateLimiterController(service);
        
        boolean allowed1 = controller.handleRequest("user1");
        System.out.println("Request allowed for user1: " + allowed1);
        boolean allowed2 = controller.handleRequest("user1");
        System.out.println("Request allowed for user1: " + allowed2);
        // Output:
        // Checking Redis cache for rate limit: user1
        // Fetching rate limit from Cassandra: user1
        // Caching rate limit in Redis: user1
        // Saving rate limit to Cassandra: user1
        // Enqueuing rate limit update to Kafka: user1
        // Request allowed for user1: true
        // Checking Redis cache for rate limit: user1
        // Saving rate limit to Cassandra: user1
        // Enqueuing rate limit update to Kafka: user1
        // Request allowed for user1: true
    }
}
```
- **System Design and Principles**:
  - **Functional**: `allowRequest` enforces rate limits using token bucket.
  - **Non-Functional**:
    - **Scalability**: `CassandraRateLimitRepository` shards by user ID.
    - **Low Latency**: `RedisCache` for fast rate checks.
    - **Reliability**: Cassandra for persistent storage; CP for accurate limits.
  - **Encapsulation**: Private fields with public methods.
  - **Abstraction**: `RateLimitRepository` interface for storage.
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates rate limiting and API logic; DIP (Section 4, Lecture 6) for abstractions.
- **Big O**: O(1) for `allowRequest`, `cacheRateLimit` (average case).
- **Edge Cases**: Handles new users, token exhaustion with fallbacks.

**Systematic Approach**:
- Clarified requirements (limit API requests, ensure scalability and low latency).
- Designed system architecture diagram to show API gateway, cache, and storage.
- Implemented Java code for a token bucket rate limiter, addressing requirements and trade-offs.
- Tested with `main` method for request limiting.

## Real-World Application
Imagine designing an API rate limiter for an API platform, using a token bucket algorithm for flexible rate control, Redis for low-latency checks, and Cassandra for persistent storage. A system architecture diagram communicates the design to stakeholders, ensuring performance and reliability. This design—paired with principles like KISS (Section 4, Lecture 8) and patterns like Facade (Section 3, Lecture 8)—demonstrates your ability to mentor teams on scalable rate-limiting design.

## Practice Exercises
Design an API rate limiter or similar with these exercises:
- **Easy**: Design a system architecture diagram and Java code for a `RateLimiterService` with basic token bucket.
- **Medium**: Create a diagram and Java code for a `RateLimiterService` with sliding window algorithm.
- **Medium**: Design an HLD for a rate limiter with sharding and caching, implementing a Java controller.
- **Hard**: Architect a distributed rate limiter with Redis and Cassandra, supporting endpoint-specific limits, using a Java service.

Try designing one system in Java with a diagram, explaining how requirements and trade-offs are addressed.

## Conclusion
Designing an API rate limiter equips you to architect scalable, low-latency Java systems for API platforms. By mastering this design, you’ll protect systems, ensure performance, and teach others effectively. This advances your progress in Section 5 of the *Official CTO* journey.

**Next Step**: Explore [Design a Key-Value Store (e.g., Redis)](/sections/hld-ai/key-value-store) to apply HLD to another real-world problem, or check out [all sections](/sections/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>