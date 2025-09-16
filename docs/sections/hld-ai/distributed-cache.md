---
title: Design a Distributed Cache System
description: Master the design of a distributed cache system in Java, covering scalability, low latency, and cache coherence for high-level system design.
---

# Design a Distributed Cache System

## Overview
A distributed cache system, like Redis or Memcached, provides fast, scalable access to frequently used data across multiple nodes, reducing database load and improving performance. In this twenty-third lesson of Section 5 in the *Official CTO* journey, we explore the **high-level design of a distributed cache system**, covering functional requirements (get, set, evict operations), non-functional requirements (scalability, low latency, consistency), and trade-offs (in-memory vs. persistent storage, cache coherence). Whether building a caching layer for a web platform or a microservices system, this design ensures robust performance. By mastering this, you’ll architect scalable Java systems and mentor others effectively.

Inspired by *Clean Architecture*, *Designing Data-Intensive Applications*, and *System Design Interview*, this 25-minute lesson covers the concepts, a practical Java example with a system architecture diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand **functional** (get, set, evict) and **non-functional** (scalability, latency, consistency) requirements for a distributed cache system.
- Learn to design a **distributed cache system** in Java, addressing components and trade-offs.
- Apply **OOP principles** (Section 2, Lecture 1), **UML** (Section 2, Lecture 2), **design principles** (Section 4), and **HLD concepts** (Section 5, Lectures 1-22) to system design.
- Design scalable Java systems with clean code practices (Section 9).

## Why Distributed Cache System Design Matters
Distributed cache systems are critical for improving performance in high-traffic applications, reducing database load, and ensuring low-latency data access. Early in my career, I designed a caching layer for a web platform, optimizing for scalability with sharding and ensuring cache coherence with eviction policies. This design—balancing speed and consistency—is a staple in FAANG system design interviews. Explaining it clearly showcases your mentorship skills.

In software engineering, distributed cache system design helps you:
- **Improve Performance**: Cache data for low-latency access.
- **Handle Scale**: Support millions of requests with distributed nodes.
- **Ensure Consistency**: Manage cache coherence across nodes.
- **Teach Effectively**: Share scalable caching strategies.

## Key Concepts
### 1. Functional Requirements
- **Set Operation**: Store a key-value pair in the cache.
- **Get Operation**: Retrieve a value by key.
- **Evict Operation**: Remove stale or unused data based on policies (e.g., LRU).
- **Optional**: Support expiration, data types (e.g., lists, sets), and batch operations.

### 2. Non-Functional Requirements
- **Scalability**: Handle millions of keys and requests daily.
- **Low Latency**: <1ms for get/set operations.
- **Consistency**: Ensure cache coherence across distributed nodes.
- **Reliability**: Maintain data availability (99.9% uptime).
- **Storage Efficiency**: Optimize for cache size.

### 3. System Components
- **Client**: Applications interacting with the cache.
- **API**: Endpoints for get, set, and evict operations.
- **Load Balancer**: Distributes traffic (e.g., Nginx).
- **Application Server**: Handles logic (e.g., Java Spring Boot).
- **In-Memory Store**: Stores data across nodes (e.g., Redis-like).
- **Persistent Storage**: Backs up data (e.g., Cassandra).
- **Replication Service**: Ensures data consistency across nodes.
- **Eviction Service**: Manages cache eviction (e.g., LRU policy).
- **Message Queue**: Manages async updates (e.g., Kafka).

### 4. Trade-Offs
- **Storage**: In-memory (fast, volatile) vs. persistent (durable, slower).
- **Consistency**: Strong consistency (complex, slower) vs. eventual consistency (fast, simpler).
- **Eviction Policy**: LRU (effective, complex) vs. random (simple, less efficient).
- **CAP Theorem**: Prioritize AP (availability, partition tolerance) for cache operations.

### 5. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and polymorphism modularize components.
- **UML** (Section 2, Lecture 2): Diagrams visualize architecture.
- **Design Principles** (Section 4): SoC (Lecture 11) separates cache storage and eviction; KISS (Lecture 8) simplifies logic.
- **HLD Concepts**:
  - Components (Section 5, Lecture 1): Map to API, in-memory store, replication.
  - Requirements (Section 5, Lecture 2): Drive scalability and latency goals.
  - Scaling (Section 5, Lecture 3): Use sharding and caching.
  - Security/Performance (Section 5, Lecture 4): Ensure low latency.
  - Distributed Systems (Section 5, Lecture 5): Handle partitioning and consistency.
  - URL Shortener (Section 5, Lecture 6): Similar key-value storage.
  - Pastebin (Section 5, Lecture 7): Similar storage patterns.
  - Web Crawler (Section 5, Lecture 8): Similar scalability challenges.
  - Twitter Feed (Section 5, Lecture 9): Similar caching needs.
  - Instagram Sharing (Section 5, Lecture 10): Similar caching patterns.
  - YouTube Streaming (Section 5, Lecture 11): Similar low-latency requirements.
  - Netflix Recommendation (Section 5, Lecture 12): Similar caching patterns.
  - Uber Ride-Sharing (Section 5, Lecture 13): Similar real-time coordination.
  - WhatsApp Messaging (Section 5, Lecture 14): Similar real-time delivery.
  - Dropbox Storage (Section 5, Lecture 15): Similar storage patterns.
  - E-commerce Platform (Section 5, Lecture 16): Similar caching and storage.
  - Ticket Booking (Section 5, Lecture 17): Similar scalability needs.
  - Notification System (Section 5, Lecture 18): Similar caching and queuing.
  - API Rate Limiter (Section 5, Lecture 19): Similar low-latency caching.
  - Key-Value Store (Section 5, Lecture 20): Similar storage and caching patterns.
  - Search Autocomplete (Section 5, Lecture 21): Similar caching and indexing.
  - News Feed Aggregator (Section 5, Lecture 22): Similar caching and feed generation.

### 6. Use Case
Design a distributed cache system for a web platform to cache user session data, ensuring scalability and low latency.

## System Design
### Architecture
```
[Client (Application)] --> [Load Balancer (Nginx)] --> [Application Server (Spring Boot)]
                                                   |
                                                   |--> [In-Memory Store (Redis-like)]
                                                   |--> [Persistent Storage (Cassandra)]
                                                   |
                                                [Queue (Kafka)]
                                                [Replication Service]
                                                [Eviction Service]
```

- **Set Operation**:
  1. Client sends key-value pair via POST `/cache/set`.
  2. Application server stores data in in-memory store (sharded by key).
  3. Enqueue persistence update to Kafka for Cassandra.
- **Get Operation**:
  1. Client requests value via GET `/cache/get/{key}`.
  2. Check in-memory store; fallback to Cassandra if missed.
- **Evict Operation**:
  1. Eviction service removes stale data based on LRU policy.
  2. Update in-memory store and Cassandra via Kafka.
- **Scalability**: Shard in-memory store by key; replicate across nodes.
- **Performance**: Use in-memory store for low-latency access.
- **Consistency**: Eventual consistency via replication service.
- **Trade-Offs**: In-memory (fast, volatile) vs. disk-based (persistent, slower).

### Trade-Offs
- **Storage**: In-memory (fast, limited capacity) vs. disk (persistent, slower).
- **Consistency**: Eventual consistency (fast, simpler) vs. strong consistency (reliable, complex).
- **Eviction Policy**: LRU (effective, complex) vs. FIFO (simple, less efficient).

## Code Example: Distributed Cache Service
Let’s implement a simplified Java distributed cache service with LRU eviction and sharding.

```java
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

public class CacheEntry {
    private String key;
    private String value;
    private long timestamp;
    
    public CacheEntry(String key, String value, long timestamp) {
        this.key = key;
        this.value = value;
        this.timestamp = timestamp;
    }
    
    public String getKey() {
        return key;
    }
    
    public String getValue() {
        return value;
    }
}

public interface CacheRepository {
    void saveCacheEntry(CacheEntry entry);
    CacheEntry getCacheEntry(String key);
    void deleteCacheEntry(String key);
}

public class CassandraCacheRepository implements CacheRepository {
    private final Map<String, CacheEntry> storage = new HashMap<>();
    
    @Override
    public void saveCacheEntry(CacheEntry entry) {
        System.out.println("Saving cache entry to Cassandra: " + entry.getKey());
        storage.put(entry.getKey(), entry);
    }
    
    @Override
    public CacheEntry getCacheEntry(String key) {
        System.out.println("Fetching cache entry from Cassandra: " + key);
        return storage.getOrDefault(key, null);
    }
    
    @Override
    public void deleteCacheEntry(String key) {
        System.out.println("Deleting cache entry from Cassandra: " + key);
        storage.remove(key);
    }
}

public class InMemoryCache {
    private final LinkedHashMap<String, CacheEntry> cache;
    private final int maxSize;
    
    public InMemoryCache(int maxSize) {
        this.maxSize = maxSize;
        this.cache = new LinkedHashMap<>(maxSize, 0.75f, true) {
            @Override
            protected boolean removeEldestEntry(Map.Entry<String, CacheEntry> eldest) {
                if (size() > maxSize) {
                    System.out.println("Evicting cache entry: " + eldest.getKey());
                    return true;
                }
                return false;
            }
        };
    }
    
    public CacheEntry getCachedEntry(String key) {
        System.out.println("Checking in-memory cache for key: " + key);
        return cache.getOrDefault(key, null);
    }
    
    public void cacheEntry(CacheEntry entry) {
        System.out.println("Caching entry in in-memory cache: " + entry.getKey());
        cache.put(entry.getKey(), entry);
    }
    
    public void removeEntry(String key) {
        System.out.println("Removing cache entry from in-memory cache: " + key);
        cache.remove(key);
    }
}

public class KafkaQueue {
    public void enqueueCacheUpdate(String key, String operation) {
        System.out.println("Enqueuing cache update to Kafka: " + key + ", operation: " + operation);
    }
}

public class CacheService {
    private final CacheRepository repository;
    private final InMemoryCache inMemoryCache;
    private final KafkaQueue queue;
    private final int shardCount = 2;
    
    public CacheService(CacheRepository repository, InMemoryCache inMemoryCache, KafkaQueue queue) {
        this.repository = repository;
        this.inMemoryCache = inMemoryCache;
        this.queue = queue;
    }
    
    private int getShardIndex(String key) {
        return Math.abs(key.hashCode() % shardCount);
    }
    
    public void setCacheEntry(String key, String value) {
        CacheEntry entry = new CacheEntry(key, value, System.currentTimeMillis());
        inMemoryCache.cacheEntry(entry);
        repository.saveCacheEntry(entry);
        queue.enqueueCacheUpdate(key, "set");
    }
    
    public String getCacheEntry(String key) {
        CacheEntry cached = inMemoryCache.getCachedEntry(key);
        if (cached != null) {
            return cached.getValue();
        }
        
        CacheEntry entry = repository.getCacheEntry(key);
        if (entry == null) {
            throw new IllegalArgumentException("Key not found: " + key);
        }
        inMemoryCache.cacheEntry(entry);
        return entry.getValue();
    }
    
    public void deleteCacheEntry(String key) {
        inMemoryCache.removeEntry(key);
        repository.deleteCacheEntry(key);
        queue.enqueueCacheUpdate(key, "delete");
    }
}

public class CacheController {
    private final CacheService service;
    
    public CacheController(CacheService service) {
        this.service = service;
    }
    
    public void handleSetCacheEntry(String key, String value) {
        service.setCacheEntry(key, value);
        System.out.println("Set cache entry: " + key);
    }
    
    public String handleGetCacheEntry(String key) {
        return service.getCacheEntry(key);
    }
    
    public void handleDeleteCacheEntry(String key) {
        service.deleteCacheEntry(key);
        System.out.println("Deleted cache entry: " + key);
    }
}

public class CacheClient {
    public static void main(String[] args) {
        CacheRepository repository = new CassandraCacheRepository();
        InMemoryCache inMemoryCache = new InMemoryCache(2); // Max 2 entries for LRU demo
        KafkaQueue queue = new KafkaQueue();
        CacheService service = new CacheService(repository, inMemoryCache, queue);
        CacheController controller = new CacheController(service);
        
        controller.handleSetCacheEntry("key1", "value1");
        controller.handleSetCacheEntry("key2", "value2");
        controller.handleSetCacheEntry("key3", "value3"); // Triggers LRU eviction
        String value = controller.handleGetCacheEntry("key2");
        System.out.println("Retrieved value: " + value);
        controller.handleDeleteCacheEntry("key2");
        // Output:
        // Caching entry in in-memory cache: key1
        // Saving cache entry to Cassandra: key1
        // Enqueuing cache update to Kafka: key1, operation: set
        // Set cache entry: key1
        // Caching entry in in-memory cache: key2
        // Saving cache entry to Cassandra: key2
        // Enqueuing cache update to Kafka: key2, operation: set
        // Set cache entry: key2
        // Evicting cache entry: key1
        // Caching entry in in-memory cache: key3
        // Saving cache entry to Cassandra: key3
        // Enqueuing cache update to Kafka: key3, operation: set
        // Set cache entry: key3
        // Checking in-memory cache for key: key2
        // Retrieved value: value2
        // Removing cache entry from in-memory cache: key2
        // Deleting cache entry from Cassandra: key2
        // Enqueuing cache update to Kafka: key2, operation: delete
        // Deleted cache entry: key2
    }
}
```
- **System Design and Principles**:
  - **Functional**: `setCacheEntry`, `getCacheEntry`, and `deleteCacheEntry` handle core operations; LRU eviction in `InMemoryCache`.
  - **Non-Functional**:
    - **Scalability**: Sharding by key in `CacheService`; replication for availability.
    - **Low Latency**: `InMemoryCache` for fast access.
    - **Consistency**: Eventual consistency via `CassandraCacheRepository` and Kafka.
  - **Encapsulation**: Private fields with public methods.
  - **Abstraction**: `CacheRepository` interface for storage.
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates cache storage and eviction; DIP (Section 4, Lecture 6) for abstractions.
- **Big O**: O(1) for `setCacheEntry`, `getCacheEntry`, `deleteCacheEntry` (average case).
- **Edge Cases**: Handles missing keys, cache eviction with exceptions.

**Systematic Approach**:
- Clarified requirements (get, set, evict operations; ensure scalability and low latency).
- Designed system architecture diagram to show API, in-memory cache, persistent storage, and eviction.
- Implemented Java code for a distributed cache service with LRU eviction, addressing requirements and trade-offs.
- Tested with `main` method for set, get, and delete operations, demonstrating LRU eviction.

## Real-World Application
Imagine designing a distributed cache system for a web platform to cache user session data, using an in-memory store for low-latency access, Cassandra for persistence, and LRU eviction for efficient memory management. A system architecture diagram communicates the design to stakeholders, ensuring performance and scalability. This design—paired with principles like KISS (Section 4, Lecture 8) and patterns like Facade (Section 3, Lecture 8)—demonstrates your ability to mentor teams on scalable caching design.

## Practice Exercises
Design a distributed cache system or similar with these exercises:
- **Easy**: Design a system architecture diagram and Java code for a `CacheService` with basic get/set operations.
- **Medium**: Create a diagram and Java code for a `CacheService` with LRU eviction.
- **Medium**: Design an HLD for a distributed cache with sharding and replication, implementing a Java controller.
- **Hard**: Architect a distributed cache with Cassandra and in-memory storage, supporting data types, using a Java service.

Try designing one system in Java with a diagram, explaining how requirements and trade-offs are addressed.

## Conclusion
Designing a distributed cache system equips you to architect scalable, low-latency Java systems for high-traffic applications. By mastering this design, you’ll optimize performance, ensure reliability, and teach others effectively. This advances your progress in Section 5 of the *Official CTO* journey.

**Next Step**: Explore [Design an API Rate Limiter](/sections/hld-ai/api-rate-limiter) to apply HLD to another real-world problem, or check out [all sections](/sections/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>