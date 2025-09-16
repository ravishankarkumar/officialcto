---
title: Design a Cache with Expiry
description: Learn low-level system design for a cache with expiry in Java, focusing on time-based eviction and thread-safety for scalable, robust applications.
---

# Design a Cache with Expiry

## Overview
Welcome to the twenty-sixth lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Designing a cache with expiry is a critical LLD problem that tests your ability to manage data with time-based eviction using OOP principles. In this 25-minute lesson, we explore the **low-level design of a cache with expiry**, covering time-based eviction (e.g., TTL) and thread-safety to ensure efficient, concurrent access. Whether building a cache for a web application or preparing for FAANG interviews, this lecture equips you to design modular, scalable systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Design Patterns*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **low-level design** principles for a cache with expiry, focusing on time-based eviction and thread-safety.
- Learn to model **classes**, **data structures**, and **functionality** in Java.
- Apply **OOP principles** (Section 2, Lecture 1), **design patterns** (Section 3), **design principles** (Section 4), and **HLD concepts** (Section 5) to LLD.
- Write clean, thread-safe Java code (Section 9).

## Why Cache with Expiry Design Matters
A cache with expiry is a common FAANG interview problem that tests your ability to combine data structures and concurrency for performance optimization. Drawing from my experience designing performance-critical systems, I’ve implemented caching mechanisms to ensure fast data access while managing resource constraints. This lecture prepares you to design robust caching systems and articulate your approach clearly, showcasing your mentorship skills.

In software engineering, cache with expiry design helps you:
- **Optimize Performance**: Achieve O(1) get and put operations with expiry.
- **Manage Resources**: Evict stale data based on TTL.
- **Ensure Thread-Safety**: Handle concurrent access reliably.
- **Teach Effectively**: Share practical LLD strategies.

## Key Concepts
### 1. Cache with Expiry Components
- **Time-Based Eviction**: Remove entries after a specified Time-To-Live (TTL).
- **Thread-Safety**: Ensure concurrent get/put operations are safe.
- **Functionality**:
  - `get(key)`: Retrieve value if not expired, update access time.
  - `put(key, value, ttl)`: Add/update key-value pair with expiry time.
  - Remove expired entries.
- **Edge Cases**: Expired entries, invalid keys, concurrent modifications.

### 2. Design Patterns
- **Strategy Pattern** (Section 3, Lecture 4): For eviction policies (extensible).
- **Composite Pattern** (Section 3, Lecture 9): Combining hashmap and expiry tracking.
- **Decorator Pattern** (Section 3, Lecture 13): For adding thread-safety (optional).

### 3. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation for cache entries.
- **Design Patterns** (Section 3): Strategy, Composite, and Decorator patterns.
- **Design Principles** (Section 4): SoC (Lecture 11) separates cache and expiry logic; KISS (Lecture 8) simplifies design.
- **HLD** (Section 5):
  - Distributed Cache (Lecture 23): Similar caching concepts.
  - LLD Intro (Lecture 1): Builds on class design.
  - Database Design (Lecture 2): Persisting cache data (optional).
  - API Design (Lecture 3): Exposing cache operations.
  - Concurrency Handling (Lecture 4): Thread-safe cache operations.
  - Error Handling (Lecture 5): Handling invalid keys.
  - Parking Lot (Lecture 6): Similar resource management.
  - Elevator System (Lecture 7): Similar state-driven design.
  - Vending Machine (Lecture 8): Similar operation logic.
  - ATM Machine (Lecture 9): Similar transactional design.
  - Restaurant Management (Lecture 10): Similar resource tracking.
  - Library Management (Lecture 11): Similar resource logic.
  - Chess Game (Lecture 12): Similar rule enforcement.
  - Tic-Tac-Toe (Lecture 13): Similar logic.
  - Snake and Ladder (Lecture 14): Similar mechanics.
  - Deck of Cards (Lecture 15): Similar entity management.
  - LRU Cache (Lecture 16): Similar caching mechanics.
  - Rate Limiter (Lecture 17): Similar operation control.
  - Text Editor (Lecture 18): Similar operation management.
  - Movie Ticket Booking (Lecture 19): Similar resource allocation.
  - File System (Lecture 20): Similar hierarchical structure.
  - Logger (Lecture 21): Similar operation logging.
  - URL Parser (Lecture 22): Similar data processing.
  - Q&A System (Lecture 23): Similar user interaction modeling.
  - Traffic Light Controller (Lecture 24): Similar state-driven design.
  - Hospital Management (Lecture 25): Similar resource management.
- **Clean Code** (Section 9): Meaningful names for classes and methods.

### 4. Use Case
Design a cache with expiry for a web application to store frequently accessed data with time-based eviction and thread-safe operations.

## System Design
### Architecture
```
[Client] --> [CacheController]
                |
                v
            [CacheWithExpiry]
                |
                v
           [CacheEntry] --> [HashMap]
```

- **Classes**:
  - `CacheEntry`: Stores key, value, and expiry time.
  - `CacheWithExpiry`: Manages entries with TTL and thread-safety.
  - `CacheController`: Exposes API for get/put operations.
- **Functionality**: Get/put with TTL, evict expired entries, ensure thread-safety.
- **Trade-Offs**:
  - Eviction: Periodic cleanup (simple, delayed) vs. on-access (complex, immediate).
  - Thread-Safety: Locks (simple, contention) vs. concurrent collections (scalable, complex).

## Code Example: Cache with Expiry System
Below is a Java implementation of a cache with expiry using a hashmap and thread-safety.

```java
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.locks.ReentrantReadWriteLock;

// Custom exception
public class CacheException extends Exception {
    public CacheException(String message) {
        super(message);
    }
}

// Cache entry class
public class CacheEntry {
    private int key;
    private int value;
    private long expiryTime; // Expiry time in milliseconds

    public CacheEntry(int key, int value, long ttl) {
        this.key = key;
        this.value = value;
        this.expiryTime = System.currentTimeMillis() + ttl;
    }

    public int getKey() {
        return key;
    }

    public int getValue() {
        return value;
    }

    public boolean isExpired() {
        return System.currentTimeMillis() > expiryTime;
    }
}

// Cache with expiry class
public class CacheWithExpiry {
    private final Map<Integer, CacheEntry> cache;
    private final ReentrantReadWriteLock lock;

    public CacheWithExpiry() {
        this.cache = new HashMap<>();
        this.lock = new ReentrantReadWriteLock();
    }

    public int get(int key) throws CacheException {
        lock.readLock().lock();
        try {
            CacheEntry entry = cache.get(key);
            if (entry == null) {
                throw new CacheException("Key not found: " + key);
            }
            if (entry.isExpired()) {
                lock.readLock().unlock();
                lock.writeLock().lock();
                try {
                    cache.remove(key); // Remove expired entry
                    throw new CacheException("Key expired: " + key);
                } finally {
                    lock.writeLock().unlock();
                    lock.readLock().lock();
                }
            }
            return entry.getValue();
        } finally {
            lock.readLock().unlock();
        }
    }

    public void put(int key, int value, long ttl) throws CacheException {
        if (ttl <= 0) {
            throw new CacheException("Invalid TTL: " + ttl);
        }
        lock.writeLock().lock();
        try {
            cache.put(key, new CacheEntry(key, value, ttl));
            System.out.println("Put key: " + key + ", value: " + value + ", TTL: " + ttl + "ms");
        } finally {
            lock.writeLock().unlock();
        }
    }

    public void cleanupExpired() {
        lock.writeLock().lock();
        try {
            cache.entrySet().removeIf(entry -> entry.getValue().isExpired());
            System.out.println("Cleaned up expired entries");
        } finally {
            lock.writeLock().unlock();
        }
    }
}

// Controller for API interactions
public class CacheController {
    private final CacheWithExpiry cache;

    public CacheController(CacheWithExpiry cache) {
        this.cache = cache;
    }

    public int handleGet(int key) {
        try {
            return cache.get(key);
        } catch (CacheException e) {
            System.err.println("Error: " + e.getMessage());
            return -1;
        }
    }

    public void handlePut(int key, int value, long ttl) {
        try {
            cache.put(key, value, ttl);
        } catch (CacheException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public void handleCleanupExpired() {
        cache.cleanupExpired();
    }
}

// Client to demonstrate usage
public class CacheClient {
    public static void main(String[] args) throws InterruptedException {
        CacheWithExpiry cache = new CacheWithExpiry();
        CacheController controller = new CacheController(cache);

        // Normal flow
        controller.handlePut(1, 100, 2000); // 2-second TTL
        controller.handlePut(2, 200, 3000); // 3-second TTL
        System.out.println("Get key 1: " + controller.handleGet(1)); // Should return 100
        Thread.sleep(2500); // Wait for key 1 to expire
        System.out.println("Get key 1: " + controller.handleGet(1)); // Should expire
        System.out.println("Get key 2: " + controller.handleGet(2)); // Should return 200
        controller.handleCleanupExpired(); // Clean up expired entries

        // Edge cases
        controller.handlePut(3, 300, 0); // Invalid TTL
        controller.handleGet(4); // Non-existent key
        // Output:
        // Put key: 1, value: 100, TTL: 2000ms
        // Put key: 2, value: 200, TTL: 3000ms
        // Get key 1: 100
        // Error: Key expired: 1
        // Get key 1: -1
        // Get key 2: 200
        // Cleaned up expired entries
        // Error: Invalid TTL: 0
        // Error: Key not found: 4
    }
}
```
- **LLD Principles**:
  - **Time-Based Eviction**: `CacheEntry` tracks TTL; expired entries removed on access or cleanup.
  - **Thread-Safety**: `ReentrantReadWriteLock` ensures safe concurrent access.
  - **Classes**: `CacheEntry`, `CacheWithExpiry`, `CacheController`.
  - **Design Patterns**: Composite (hashmap + entry), Strategy (extensible eviction).
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates cache and eviction logic; DIP (Section 4, Lecture 6) for extensibility.
- **Big O**: O(1) for `get`, `put` (HashMap operations); O(n) for `cleanupExpired` (n = entries).
- **Edge Cases**: Handles expired entries, invalid TTL, non-existent keys.

**UML Diagram**:
```
[Client] --> [CacheController]
                |
                v
            [CacheWithExpiry]
                |
                v
           [CacheEntry] --> [HashMap]
```

## Real-World Application
Imagine designing a cache with expiry for a web application to store frequently accessed data with time-based eviction, ensuring efficient memory use. This LLD—aligned with HLD principles from Section 5 (e.g., Distributed Cache, Lecture 23)—ensures performance and scalability, critical for caching systems.

## Practice Exercises
Practice cache with expiry design with these exercises:
- **Easy**: Design a UML diagram and Java code for a simple cache with fixed TTL.
- **Medium**: Implement a cache with expiry using a hashmap and basic eviction.
- **Medium**: Design an LLD for a cache with TTL and thread-safety.
- **Hard**: Architect a cache with expiry in Java, integrating multiple design patterns (e.g., Strategy, Composite).

Try designing one system in Java with a UML diagram, explaining time-based eviction and thread-safety.

## Conclusion
Mastering the design of a cache with expiry equips you to build efficient, thread-safe Java systems, enhancing your LLD skills. This lecture builds on HLD concepts and caching principles from your prior work, preparing you for FAANG interviews and real-world applications.

**Next Step**: Explore [Design a Parking lot System](/sections/lld/parking-lot) to continue your LLD journey, or check out [all sections](/sections/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>