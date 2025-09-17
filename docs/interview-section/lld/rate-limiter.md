---
title: Design a Rate Limiter
description: Learn low-level system design for a rate limiter in Java, focusing on algorithms and thread-safety for scalable, robust applications.
---

# Design a Rate Limiter

## Overview
Welcome to the seventeenth lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Designing a rate limiter is a critical LLD problem that tests your ability to control access frequency in high-traffic systems using OOP principles. In this 25-minute lesson, we explore the **low-level design of a rate limiter**, covering algorithms (e.g., token bucket, sliding window) and thread-safety to ensure scalability and reliability. Whether building a rate limiter for a web application or preparing for FAANG interviews, this lecture equips you to design modular, efficient systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Designing Data-Intensive Applications*, and *System Design Interview*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **low-level design** principles for a rate limiter with algorithms and thread-safety.
- Learn to model **classes**, **algorithms**, and **functionality** in Java.
- Apply **OOP principles** (Section 2, Lecture 1), **design patterns** (Section 3), **design principles** (Section 4), and **HLD concepts** (Section 5) to LLD.
- Write clean, thread-safe Java code (Section 9).

## Why Rate Limiter Design Matters
Rate limiters are essential for protecting systems from abuse, ensuring fair resource usage, and maintaining performance. Drawing from my experience designing performance-critical systems, I’ve implemented similar mechanisms to manage API traffic efficiently. This lecture prepares you to design robust rate limiters and articulate your approach clearly, showcasing your mentorship skills.

In software engineering, rate limiter design helps you:
- **Protect Systems**: Prevent overload from excessive requests.
- **Ensure Fairness**: Limit usage per client or user.
- **Enhance Scalability**: Maintain performance under high load.
- **Teach Effectively**: Share practical LLD strategies.

## Key Concepts
### 1. Rate Limiter Components
- **Algorithms**:
  - **Token Bucket**: Fixed tokens replenished at a rate; allows burst traffic.
  - **Sliding Window**: Tracks requests in a time window for precise control.
- **Thread-Safety**: Ensure concurrent access doesn’t break limits.
- **Functionality**:
  - Check if a request is allowed based on rate limits.
  - Track requests per client (e.g., by user ID or IP).
  - Handle burst and sustained traffic.
- **Edge Cases**: Concurrent requests, time window boundaries, invalid client IDs.

### 2. Design Patterns
- **Strategy Pattern** (Section 3, Lecture 4): For switching between rate limiting algorithms.
- **Singleton Pattern** (Section 3, Lecture 1): For centralized rate limiter instance (optional).

### 3. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation for rate limiter logic.
- **Design Patterns** (Section 3): Strategy and Singleton patterns.
- **Design Principles** (Section 4): SoC (Lecture 11) separates rate limiting logic; KISS (Lecture 8) simplifies design.
- **HLD** (Section 5):
  - API Rate Limiter (Lecture 19): High-level rate limiting concepts.
  - Distributed Cache (Lecture 23): Similar data structure usage.
  - LLD Intro (Lecture 1): Builds on class design.
  - Database Design (Lecture 2): Persisting rate limit data (optional).
  - API Design (Lecture 3): Rate-limited APIs.
  - Concurrency Handling (Lecture 4): Thread-safe operations.
  - Error Handling (Lecture 5): Handling invalid requests.
  - Parking Lot (Lecture 6): Similar resource management.
  - Elevator System (Lecture 7): Similar state-driven design.
  - Vending Machine (Lecture 8): Similar rule-based logic.
  - ATM Machine (Lecture 9): Similar transactional design.
  - Restaurant Management (Lecture 10): Similar entity management.
  - Library Management (Lecture 11): Similar resource tracking.
  - Chess Game (Lecture 12): Similar rule enforcement.
  - Tic-Tac-Toe (Lecture 13): Similar game logic.
  - Snake and Ladder (Lecture 14): Similar mechanics.
  - Deck of Cards (Lecture 15): Similar entity management.
  - LRU Cache (Lecture 16): Similar data structure usage.
- **Clean Code** (Section 9): Meaningful names for classes and methods.

### 4. Use Case
Design a rate limiter for a web application to control API request frequency per user, ensuring thread-safety and scalability.

## System Design
### Architecture
```
[Client] --> [RateLimiterController]
                |
                v
            [RateLimiter]
                |
                v
           [TokenBucket]
           [SlidingWindow]
```

- **Classes**:
  - `RateLimiter`: Interface for rate limiting algorithms.
  - `TokenBucket`: Implements token bucket algorithm.
  - `SlidingWindow`: Implements sliding window algorithm (optional).
  - `RateLimiterController`: Exposes API for rate limit checks.
- **Functionality**: Check if a request is allowed, track per client, ensure thread-safety.
- **Trade-Offs**:
  - Algorithm: Token Bucket (simple, burst-friendly) vs. Sliding Window (precise, complex).
  - Storage: In-memory (fast, volatile) vs. distributed (persistent, slower).

## Code Example: Rate Limiter System
Below is a Java implementation of a rate limiter using the token bucket algorithm with thread-safety.

```java
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.locks.ReentrantLock;

// Custom exception
public class RateLimitException extends Exception {
    public RateLimitException(String message) {
        super(message);
    }
}

// Rate limiter interface
public interface RateLimiter {
    boolean allowRequest(String clientId) throws RateLimitException;
}

// Token bucket implementation
public class TokenBucket implements RateLimiter {
    private final int capacity; // Max tokens
    private final double tokensPerSecond; // Token replenish rate
    private final Map<String, Bucket> buckets;
    private final ReentrantLock lock;

    private static class Bucket {
        double tokens;
        long lastRefillTimestamp;

        Bucket(int capacity, long timestamp) {
            this.tokens = capacity;
            this.lastRefillTimestamp = timestamp;
        }
    }

    public TokenBucket(int capacity, double tokensPerSecond) {
        this.capacity = capacity;
        this.tokensPerSecond = tokensPerSecond;
        this.buckets = new HashMap<>();
        this.lock = new ReentrantLock();
    }

    private void refillTokens(String clientId, long currentTime) {
        lock.lock();
        try {
            Bucket bucket = buckets.computeIfAbsent(clientId, k -> new Bucket(capacity, currentTime));
            long elapsedTime = currentTime - bucket.lastRefillTimestamp;
            double newTokens = elapsedTime * tokensPerSecond / 1000.0;
            bucket.tokens = Math.min(bucket.tokens + newTokens, capacity);
            bucket.lastRefillTimestamp = currentTime;
        } finally {
            lock.unlock();
        }
    }

    @Override
    public boolean allowRequest(String clientId) throws RateLimitException {
        if (clientId == null) {
            throw new RateLimitException("Invalid client ID");
        }
        long currentTime = System.currentTimeMillis();
        refillTokens(clientId, currentTime);
        lock.lock();
        try {
            Bucket bucket = buckets.get(clientId);
            if (bucket.tokens >= 1.0) {
                bucket.tokens -= 1.0;
                System.out.println("Request allowed for client: " + clientId);
                return true;
            }
            System.out.println("Request denied for client: " + clientId);
            return false;
        } finally {
            lock.unlock();
        }
    }
}

// Controller for API interactions
public class RateLimiterController {
    private final RateLimiter rateLimiter;

    public RateLimiterController(RateLimiter rateLimiter) {
        this.rateLimiter = rateLimiter;
    }

    public boolean handleRequest(String clientId) {
        try {
            return rateLimiter.allowRequest(clientId);
        } catch (RateLimitException e) {
            System.err.println("Error: " + e.getMessage());
            return false;
        }
    }
}

// Client to demonstrate usage
public class RateLimiterClient {
    public static void main(String[] args) throws InterruptedException {
        // 5 tokens, replenish 1 token per second
        RateLimiter rateLimiter = new TokenBucket(5, 1.0);
        RateLimiterController controller = new RateLimiterController(rateLimiter);

        // Normal flow
        for (int i = 0; i < 7; i++) {
            controller.handleRequest("client1");
            Thread.sleep(100); // Simulate time between requests
        }

        // Wait for token replenishment
        Thread.sleep(2000);
        controller.handleRequest("client1");

        // Edge case: Invalid client ID
        controller.handleRequest(null);
        // Output (example):
        // Request allowed for client: client1
        // Request allowed for client: client1
        // Request allowed for client: client1
        // Request allowed for client: client1
        // Request allowed for client: client1
        // Request denied for client: client1
        // Request denied for client: client1
        // Request allowed for client: client1
        // Error: Invalid client ID
    }
}
```
- **LLD Principles**:
  - **Algorithm**: `TokenBucket` implements token bucket for rate limiting.
  - **Thread-Safety**: `ReentrantLock` ensures safe concurrent access.
  - **Classes**: `RateLimiter`, `TokenBucket`, `RateLimiterController`.
  - **Design Patterns**: Strategy (extensible for algorithms).
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates rate limiting logic; KISS (Lecture 8) simplifies implementation.
- **Big O**: O(1) for `allowRequest` (HashMap and lock operations).
- **Edge Cases**: Handles invalid client IDs, token exhaustion.

**UML Diagram**:
```
[Client] --> [RateLimiterController]
                |
                v
            [RateLimiter]
                |
                v
           [TokenBucket]
```

## Real-World Application
Imagine designing a rate limiter for a web application to control API request frequency per user, ensuring scalability and protection against abuse. This LLD—aligned with HLD principles from Section 5 (e.g., API Rate Limiter, Lecture 19)—ensures performance and reliability, critical for high-traffic systems.

## Practice Exercises
Practice rate limiter design with these exercises:
- **Easy**: Design a UML diagram and Java code for a simple token bucket rate limiter.
- **Medium**: Implement a rate limiter with thread-safe token bucket algorithm.
- **Medium**: Design an LLD for a rate limiter supporting multiple clients.
- **Hard**: Architect a rate limiter with Java, integrating a design pattern (e.g., Strategy for algorithms).

Try designing one system in Java with a UML diagram, explaining rate limiting algorithms and thread-safety.

## Conclusion
Mastering the design of a rate limiter equips you to build efficient, thread-safe Java systems, enhancing your LLD skills. This lecture builds on HLD concepts and algorithmic principles, preparing you for FAANG interviews and real-world applications.

**Next Step**: Explore [Design a Text Editor (e.g., Notepad)](/interview-section/lld/text-editor) to continue your LLD journey, or check out [all sections](/interview-section/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>