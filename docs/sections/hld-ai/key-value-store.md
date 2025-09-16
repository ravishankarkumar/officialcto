---
title: Design a Key-Value Store (e.g., Redis)
description: Master the design of a Redis-like key-value store in Java, covering scalability, low latency, and persistence for high-level system design.
---

# Design a Key-Value Store (e.g., Redis)

## Overview
A key-value store, like Redis, provides a fast, scalable way to store and retrieve data using simple key-value pairs, often used for caching or real-time applications. In this twentieth lesson of Section 5 in the *Official CTO* journey, we explore the **high-level design of a key-value store**, covering functional requirements (get, set, delete operations), non-functional requirements (scalability, low latency, persistence), and trade-offs (in-memory vs. disk storage, consistency vs. availability). Whether building a caching layer for a web platform or a configuration store, this design ensures robust performance. By mastering this, you’ll architect scalable Java systems and mentor others effectively.

Inspired by *Clean Architecture*, *Designing Data-Intensive Applications*, and *System Design Interview*, this 25-minute lesson covers the concepts, a practical Java example with a system architecture diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand **functional** (get, set, delete) and **non-functional** (scalability, latency, persistence) requirements for a key-value store.
- Learn to design a **Redis-like system** in Java, addressing components and trade-offs.
- Apply **OOP principles** (Section 2, Lecture 1), **UML** (Section 2, Lecture 2), **design principles** (Section 4), and **HLD concepts** (Section 5, Lectures 1-19) to system design.
- Design scalable Java systems with clean code practices (Section 9).

## Why Key-Value Store Design Matters
Key-value stores are foundational for caching, session management, and real-time data access, requiring low latency and high scalability. Early in my career, I designed a caching layer for a web platform using a key-value store, optimizing for performance with in-memory storage and ensuring reliability with persistence. This design—balancing simplicity and scalability—is a staple in FAANG system design interviews. Explaining it clearly showcases your mentorship skills.

In software engineering, key-value store design helps you:
- **Handle Scale**: Support millions of operations with distributed systems.
- **Ensure Low Latency**: Optimize data access with in-memory storage.
- **Manage Trade-Offs**: Balance speed and persistence.
- **Teach Effectively**: Share scalable storage design strategies.

## Key Concepts
### 1. Functional Requirements
- **Set Operation**: Store a key-value pair.
- **Get Operation**: Retrieve a value by key.
- **Delete Operation**: Remove a key-value pair.
- **Optional**: Support expiration, batch operations, and data types (e.g., lists, sets).

### 2. Non-Functional Requirements
- **Scalability**: Handle millions of keys and requests daily.
- **Low Latency**: <1ms for get/set operations.
- **Reliability**: Ensure data availability (99.9% uptime).
- **Persistence**: Support optional disk storage for durability.
- **Storage Efficiency**: Optimize for key-value data.

### 3. System Components
- **Client**: Applications interacting with the store.
- **API**: Endpoints for get, set, and delete operations.
- **Load Balancer**: Distributes traffic (e.g., Nginx).
- **Application Server**: Handles logic (e.g., Java Spring Boot).
- **In-Memory Store**: Stores data for fast access (e.g., Redis-like).
- **Persistent Storage**: Backs up data (e.g., Cassandra).
- **Replication Service**: Ensures data availability across nodes.
- **Message Queue**: Manages async persistence (e.g., Kafka).

### 4. Trade-Offs
- **Storage**: In-memory (fast, volatile) vs. disk-based (persistent, slower).
- **Consistency**: Strong consistency (complex, slower) vs. eventual consistency (fast, simpler).
- **CAP Theorem**: Prioritize AP (availability, partition tolerance) for read/write operations.

### 5. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and polymorphism modularize components.
- **UML** (Section 2, Lecture 2): Diagrams visualize architecture.
- **Design Principles** (Section 4): SoC (Lecture 11) separates storage and replication; KISS (Lecture 8) simplifies logic.
- **HLD Concepts**:
  - Components (Section 5, Lecture 1): Map to API, storage, replication.
  - Requirements (Section 5, Lecture 2): Drive scalability and latency goals.
  - Scaling (Section 5, Lecture 3): Use sharding and caching.
  - Security/Performance (Section 5, Lecture 4): Ensure low latency.
  - Distributed Systems (Section 5, Lecture 5): Handle partitioning and availability.
  - URL Shortener (Section 5, Lecture 6): Similar key-value storage.
  - Pastebin (Section 5, Lecture 7): Similar storage patterns.
  - Web Crawler (Section 5, Lecture 8): Similar scalability challenges.
  - Twitter Feed (Section 5, Lecture 9): Similar caching needs.
  - Instagram Sharing (Section 5, Lecture 10): Similar storage patterns.
  - YouTube Streaming (Section 5, Lecture 11): Similar low-latency requirements.
  - Netflix Recommendation (Section 5, Lecture 12): Similar caching patterns.
  - Uber Ride-Sharing (Section 5, Lecture 13): Similar real-time coordination.
  - WhatsApp Messaging (Section 5, Lecture 14): Similar real-time delivery.
  - Dropbox Storage (Section 5, Lecture 15): Similar storage patterns.
  - E-commerce Platform (Section 5, Lecture 16): Similar caching and storage.
  - Ticket Booking (Section 5, Lecture 17): Similar scalability needs.
  - Notification System (Section 5, Lecture 18): Similar caching and queuing.
  - API Rate Limiter (Section 5, Lecture 19): Similar low-latency caching.

### 6. Use Case
Design a key-value store for a web platform to cache session data, ensuring scalability and low latency.

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
```

- **Set Operation**:
  1. Client sends key-value pair via POST `/set`.
  2. Application server stores data in in-memory store.
  3. Enqueue persistence update to Kafka for Cassandra.
- **Get Operation**:
  1. Client requests value via GET `/get/{key}`.
  2. Check in-memory store; fallback to Cassandra if missed.
- **Delete Operation**:
  1. Client deletes key via DELETE `/delete/{key}`.
  2. Remove from in-memory store and Cassandra.
- **Scalability**: Shard in-memory store and Cassandra by key; replicate for availability.
- **Performance**: Use in-memory store for low-latency access.
- **Persistence**: Async writes to Cassandra for durability.
- **Trade-Offs**: In-memory (fast, volatile) vs. disk-based (persistent, slower).

### Trade-Offs
- **Storage**: In-memory (fast, limited capacity) vs. disk (persistent, slower).
- **Consistency**: Eventual consistency (fast, simpler) vs. strong consistency (reliable, complex).
- **Replication**: Leaderless (scalable) vs. leader-follower (simpler).

## Code Example: Key-Value Store
Let’s implement a simplified Java key-value store with in-memory caching and persistence.

```java
import java.util.HashMap;
import java.util.Map;

public class KeyValue {
    private String key;
    private String value;
    private long timestamp;
    
    public KeyValue(String key, String value, long timestamp) {
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

public interface KeyValueRepository {
    void saveKeyValue(KeyValue keyValue);
    KeyValue getKeyValue(String key);
    void deleteKeyValue(String key);
}

public class CassandraKeyValueRepository implements KeyValueRepository {
    private final Map<String, KeyValue> storage = new HashMap<>();
    
    @Override
    public void saveKeyValue(KeyValue keyValue) {
        System.out.println("Saving key-value to Cassandra: " + keyValue.getKey());
        storage.put(keyValue.getKey(), keyValue);
    }
    
    @Override
    public KeyValue getKeyValue(String key) {
        System.out.println("Fetching key-value from Cassandra: " + key);
        return storage.getOrDefault(key, null);
    }
    
    @Override
    public void deleteKeyValue(String key) {
        System.out.println("Deleting key-value from Cassandra: " + key);
        storage.remove(key);
    }
}

public class InMemoryStore {
    private final Map<String, KeyValue> cache = new HashMap<>();
    
    public KeyValue getCachedKeyValue(String key) {
        System.out.println("Checking in-memory store for key: " + key);
        return cache.getOrDefault(key, null);
    }
    
    public void cacheKeyValue(KeyValue keyValue) {
        System.out.println("Caching key-value in in-memory store: " + keyValue.getKey());
        cache.put(keyValue.getKey(), keyValue);
    }
    
    public void removeKeyValue(String key) {
        System.out.println("Removing key-value from in-memory store: " + key);
        cache.remove(key);
    }
}

public class KafkaQueue {
    public void enqueueKeyValueUpdate(String key, String operation) {
        System.out.println("Enqueuing key-value update to Kafka: " + key + ", operation: " + operation);
    }
}

public class KeyValueService {
    private final KeyValueRepository repository;
    private final InMemoryStore inMemoryStore;
    private final KafkaQueue queue;
    
    public KeyValueService(KeyValueRepository repository, InMemoryStore inMemoryStore, KafkaQueue queue) {
        this.repository = repository;
        this.inMemoryStore = inMemoryStore;
        this.queue = queue;
    }
    
    public void setKeyValue(String key, String value) {
        KeyValue keyValue = new KeyValue(key, value, System.currentTimeMillis());
        inMemoryStore.cacheKeyValue(keyValue);
        repository.saveKeyValue(keyValue);
        queue.enqueueKeyValueUpdate(key, "set");
    }
    
    public String getKeyValue(String key) {
        KeyValue cached = inMemoryStore.getCachedKeyValue(key);
        if (cached != null) {
            return cached.getValue();
        }
        
        KeyValue keyValue = repository.getKeyValue(key);
        if (keyValue == null) {
            throw new IllegalArgumentException("Key not found: " + key);
        }
        inMemoryStore.cacheKeyValue(keyValue);
        return keyValue.getValue();
    }
    
    public void deleteKeyValue(String key) {
        inMemoryStore.removeKeyValue(key);
        repository.deleteKeyValue(key);
        queue.enqueueKeyValueUpdate(key, "delete");
    }
}

public class KeyValueController {
    private final KeyValueService service;
    
    public KeyValueController(KeyValueService service) {
        this.service = service;
    }
    
    public void handleSetKeyValue(String key, String value) {
        service.setKeyValue(key, value);
        System.out.println("Set key-value: " + key);
    }
    
    public String handleGetKeyValue(String key) {
        return service.getKeyValue(key);
    }
    
    public void handleDeleteKeyValue(String key) {
        service.deleteKeyValue(key);
        System.out.println("Deleted key-value: " + key);
    }
}

public class KeyValueClient {
    public static void main(String[] args) {
        KeyValueRepository repository = new CassandraKeyValueRepository();
        InMemoryStore inMemoryStore = new InMemoryStore();
        KafkaQueue queue = new KafkaQueue();
        KeyValueService service = new KeyValueService(repository, inMemoryStore, queue);
        KeyValueController controller = new KeyValueController(service);
        
        controller.handleSetKeyValue("session1", "user_data");
        String value = controller.handleGetKeyValue("session1");
        System.out.println("Retrieved value: " + value);
        controller.handleDeleteKeyValue("session1");
        // Output:
        // Caching key-value in in-memory store: session1
        // Saving key-value to Cassandra: session1
        // Enqueuing key-value update to Kafka: session1, operation: set
        // Set key-value: session1
        // Checking in-memory store for key: session1
        // Retrieved value: user_data
        // Removing key-value from in-memory store: session1
        // Deleting key-value from Cassandra: session1
        // Enqueuing key-value update to Kafka: session1, operation: delete
        // Deleted key-value: session1
    }
}
```
- **System Design and Principles**:
  - **Functional**: `setKeyValue`, `getKeyValue`, and `deleteKeyValue` handle core operations.
  - **Non-Functional**:
    - **Scalability**: `CassandraKeyValueRepository` shards by key; replication ensures availability.
    - **Low Latency**: `InMemoryStore` for fast access.
    - **Persistence**: Cassandra for durable storage.
  - **Encapsulation**: Private fields with public methods.
  - **Abstraction**: `KeyValueRepository` interface for storage.
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates in-memory and persistent storage; DIP (Section 4, Lecture 6) for abstractions.
- **Big O**: O(1) for `setKeyValue`, `getKeyValue`, `deleteKeyValue` (average case).
- **Edge Cases**: Handles missing keys with exceptions.

**Systematic Approach**:
- Clarified requirements (get, set, delete operations; ensure scalability and low latency).
- Designed system architecture diagram to show API, in-memory store, persistent storage, and replication.
- Implemented Java code for a key-value store, addressing requirements and trade-offs.
- Tested with `main` method for set, get, and delete operations.

## Real-World Application
Imagine designing a key-value store for a web platform to cache session data, using an in-memory store for low-latency access and Cassandra for persistence. A system architecture diagram communicates the design to stakeholders, ensuring performance and reliability. This design—paired with principles like KISS (Section 4, Lecture 8) and patterns like Facade (Section 3, Lecture 8)—demonstrates your ability to mentor teams on scalable storage design.

## Practice Exercises
Design a key-value store or similar with these exercises:
- **Easy**: Design a system architecture diagram and Java code for a `KeyValueService` with basic get/set operations.
- **Medium**: Create a diagram and Java code for a `KeyValueService` with expiration support.
- **Medium**: Design an HLD for a key-value store with sharding and replication, implementing a Java controller.
- **Hard**: Architect a distributed key-value store with Cassandra and in-memory caching, supporting data types, using a Java service.

Try designing one system in Java with a diagram, explaining how requirements and trade-offs are addressed.

## Conclusion
Designing a Redis-like key-value store equips you to architect scalable, low-latency Java systems for caching and data storage. By mastering this design, you’ll optimize performance, ensure reliability, and teach others effectively. This advances your progress in Section 5 of the *Official CTO* journey.

**Next Step**: Explore [Design a Distributed Cache](/sections/hld-ai/distributed-cache) to apply HLD to another real-world problem, or check out [all sections](/sections/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>