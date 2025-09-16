---
title: Common Pitfalls in HLD
description: Learn common pitfalls in high-level system design with Java examples, covering unclear requirements, improper sharding, and trade-offs for scalable systems.
---

# Common Pitfalls in HLD

## Overview
High-level system design (HLD) is critical for building scalable systems, but common pitfalls can derail even well-intentioned designs. In this thirty-fifth lesson of Section 5 in the *Official CTO* journey, we explore **common pitfalls in HLD**, such as unclear requirements, improper sharding, ignoring trade-offs, and neglecting non-functional requirements, along with solutions to avoid them. By understanding these mistakes, you’ll design robust systems and excel in system design interviews. This 25-minute lesson covers key concepts, a practical Java example with a system architecture diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Designing Data-Intensive Applications*, and *System Design Interview*, this lesson helps you avoid HLD mistakes and design scalable Java systems effectively.

## Learning Objectives
- Identify **common pitfalls** in HLD, including unclear requirements, improper sharding, and ignoring trade-offs.
- Learn **solutions** to address these pitfalls for scalable, reliable systems.
- Apply **OOP principles** (Section 2, Lecture 1), **UML** (Section 2, Lecture 2), **design principles** (Section 4), and **HLD concepts** (Section 5, Lectures 1-34) to avoid HLD mistakes.
- Design robust Java systems with clean code practices (Section 9).

## Why Avoiding HLD Pitfalls Matters
HLD pitfalls can lead to unscalable, unreliable systems or failed system design interviews. Early in my career, I encountered a scalability issue due to improper sharding in a web platform, which taught me the importance of clear requirements and trade-off analysis. Avoiding these pitfalls—by applying lessons from FAANG interview prep—ensures robust designs and clear communication, showcasing your mentorship skills.

In software engineering, avoiding HLD pitfalls helps you:
- **Build Scalable Systems**: Prevent bottlenecks in high-traffic applications.
- **Ensure Reliability**: Avoid data loss or inconsistency.
- **Ace Interviews**: Demonstrate structured thinking in system design.
- **Teach Effectively**: Share best practices for robust design.

## Key Concepts
### 1. Common HLD Pitfalls and Solutions
- **Unclear Requirements**:
  - **Pitfall**: Failing to clarify functional (e.g., features) and non-functional (e.g., scalability, latency) requirements.
  - **Solution**: Ask clarifying questions (e.g., scale, latency goals) and document assumptions.
- **Improper Sharding**:
  - **Pitfall**: Poor shard key selection (e.g., uneven data distribution) causing hotspots.
  - **Solution**: Use consistent hashing or range-based sharding; monitor shard balance.
- **Ignoring Trade-Offs**:
  - **Pitfall**: Overlooking consistency vs. availability or latency vs. accuracy.
  - **Solution**: Apply CAP theorem; prioritize based on use case (e.g., CP for payments, AP for feeds).
- **Neglecting Non-Functional Requirements**:
  - **Pitfall**: Focusing only on features, ignoring scalability or reliability.
  - **Solution**: Define scalability, latency, and reliability goals upfront (e.g., 99.9% uptime).
- **Overcomplicating Design**:
  - **Pitfall**: Adding unnecessary complexity (e.g., premature optimization).
  - **Solution**: Follow KISS (Section 4, Lecture 8) and iterate incrementally.

### 2. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation modularizes components, avoiding overcomplication.
- **UML** (Section 2, Lecture 2): Diagrams clarify requirements and architecture.
- **Design Principles** (Section 4): SoC (Lecture 11) separates concerns; KISS (Lecture 8) avoids complexity.
- **HLD Concepts**:
  - Components (Section 5, Lecture 1): Map to API, database, cache.
  - Requirements (Section 5, Lecture 2): Emphasize clear functional/non-functional needs.
  - Scaling (Section 5, Lecture 3): Address sharding and replication.
  - Security/Performance (Section 5, Lecture 4): Ensure latency and reliability.
  - Distributed Systems (Section 5, Lecture 5): Handle partitioning and consistency.
  - URL Shortener (Section 5, Lecture 6): Avoided improper sharding.
  - Pastebin (Section 5, Lecture 7): Similar storage pitfalls.
  - Web Crawler (Section 5, Lecture 8): Avoided scalability issues.
  - Twitter Feed (Section 5, Lecture 9): Addressed latency trade-offs.
  - Instagram Sharing (Section 5, Lecture 10): Similar real-time pitfalls.
  - YouTube Streaming (Section 5, Lecture 11): Addressed latency requirements.
  - Netflix Recommendation (Section 5, Lecture 12): Avoided overcomplication.
  - Uber Ride-Sharing (Section 5, Lecture 13): Clarified requirements.
  - WhatsApp Messaging (Section 5, Lecture 14): Handled real-time consistency.
  - Dropbox Storage (Section 5, Lecture 15): Avoided storage pitfalls.
  - E-commerce Platform (Section 5, Lecture 16): Addressed scalability.
  - Ticket Booking (Section 5, Lecture 17): Handled high-throughput pitfalls.
  - Notification System (Section 5, Lecture 18): Avoided latency issues.
  - API Rate Limiter (Section 5, Lecture 19): Addressed caching pitfalls.
  - Key-Value Store (Section 5, Lecture 20): Avoided improper sharding.
  - Search Autocomplete (Section 5, Lecture 21): Handled latency trade-offs.
  - News Feed Aggregator (Section 5, Lecture 22): Avoided overcomplication.
  - Distributed Cache (Section 5, Lecture 23): Addressed caching pitfalls.
  - Leaderboard System (Section 5, Lecture 24): Handled real-time issues.
  - Payment Gateway (Section 5, Lecture 25): Ensured consistency.
  - CDN (Section 5, Lecture 26): Addressed latency trade-offs.
  - Distributed File System (Section 5, Lecture 27): Avoided storage pitfalls.
  - Logging/Monitoring System (Section 5, Lecture 28): Handled high-throughput ingestion.
  - Social Network Graph (Section 5, Lecture 29): Addressed scalability.
  - Collaborative Editor (Section 5, Lecture 30): Avoided real-time pitfalls.
  - AI Data Center Telemetry System (Section 5, Lecture 31): Handled high-throughput issues.
  - Scaling Databases (Section 5, Lecture 32): Addressed sharding pitfalls.
  - Event-Driven Architecture (Section 5, Lecture 33): Avoided event ordering issues.
  - Mock HLD Interview (Section 5, Lecture 34): Emphasized requirement clarification.

### 3. Use Case
Address common HLD pitfalls in designing a scalable web platform, focusing on avoiding improper sharding for high-throughput data storage.

## Example Pitfall and Solution: Improper Sharding
### Pitfall
A common HLD pitfall is choosing a poor shard key, leading to uneven data distribution (hotspots). For example, sharding by user ID in a web platform may overload certain shards if some users generate significantly more data.

### System Design (Pitfall)
```
[Client (Application)] --> [Load Balancer (Nginx)] --> [Application Server (Spring Boot)]
                                                   |
                                                   |--> [Database (Cassandra, Poor Sharding)]
                                                   |--> [Cache (Redis)]
```

- **Issue**: Sharding by user ID causes hotspots (e.g., celebrity users overload shards).
- **Impact**: Uneven load, high latency, and potential shard failure.

### System Design (Solution)
```
[Client (Application)] --> [Load Balancer (Nginx)] --> [Application Server (Spring Boot)]
                                                   |
                                                   |--> [Database (Cassandra, Consistent Hashing)]
                                                   |--> [Cache (Redis)]
                                                   |
                                                [Queue (Kafka)]
```

- **Solution**: Use consistent hashing for sharding to distribute data evenly.
- **Architecture**:
  1. Client sends data via POST `/data`.
  2. Application server routes to shard using consistent hashing.
  3. Store data in Cassandra; cache in Redis; enqueue to Kafka for async replication.
- **Benefits**: Balanced load, improved scalability, reduced latency.

## Code Example: Fixing Poor Sharding
Let’s implement a Java service showing a poor sharding strategy (user ID-based) and a fixed version using consistent hashing.

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

public class DataRecord {
    private String key;
    private String value;
    private long timestamp;

    public DataRecord(String key, String value, long timestamp) {
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

public interface DataRepository {
    void saveRecord(DataRecord record, int shardIndex);
    DataRecord getRecord(String key, int shardIndex);
}

public class CassandraDataRepository implements DataRepository {
    private final Map<Integer, Map<String, DataRecord>> shards = new HashMap<>();

    @Override
    public void saveRecord(DataRecord record, int shardIndex) {
        System.out.println("Saving record to Cassandra shard " + shardIndex + ": " + record.getKey());
        shards.computeIfAbsent(shardIndex, k -> new HashMap<>()).put(record.getKey(), record);
    }

    @Override
    public DataRecord getRecord(String key, int shardIndex) {
        System.out.println("Fetching record from Cassandra shard " + shardIndex + ": " + key);
        return shards.getOrDefault(shardIndex, new HashMap<>()).getOrDefault(key, null);
    }
}

public class RedisCache {
    private final Map<String, DataRecord> cache = new HashMap<>();

    public DataRecord getCachedRecord(String key) {
        System.out.println("Checking Redis cache for record: " + key);
        return cache.getOrDefault(key, null);
    }

    public void cacheRecord(DataRecord record) {
        System.out.println("Caching record in Redis: " + record.getKey());
        cache.put(record.getKey(), record);
    }
}

public class KafkaQueue {
    public void enqueueWriteOperation(String key, int shardIndex) {
        System.out.println("Enqueuing write operation to Kafka: " + key + ", shard: " + shardIndex);
    }
}

// Poor sharding strategy (user ID-based)
public class PoorShardingService {
    private final DataRepository repository;
    private final RedisCache cache;
    private final KafkaQueue queue;
    private final int shardCount = 4;

    public PoorShardingService(DataRepository repository, RedisCache cache, KafkaQueue queue) {
        this.repository = repository;
        this.cache = cache;
        this.queue = queue;
    }

    // Pitfall: Sharding by user ID causes hotspots
    public int getShardIndex(String userId) {
        return Math.abs(userId.hashCode() % shardCount); // Uneven distribution
    }

    public void writeRecord(String userId, String value) {
        int shardIndex = getShardIndex(userId);
        DataRecord record = new DataRecord(userId, value, System.currentTimeMillis());
        repository.saveRecord(record, shardIndex);
        cache.cacheRecord(record);
        queue.enqueueWriteOperation(userId, shardIndex);
    }

    public String readRecord(String userId) {
        DataRecord cached = cache.getCachedRecord(userId);
        if (cached != null) {
            return cached.getValue();
        }

        int shardIndex = getShardIndex(userId);
        DataRecord record = repository.getRecord(userId, shardIndex);
        if (record == null) {
            throw new IllegalArgumentException("Record not found: " + userId);
        }
        cache.cacheRecord(record);
        return record.getValue();
    }
}

// Fixed sharding strategy (consistent hashing)
public class ConsistentHashingService {
    private final DataRepository repository;
    private final RedisCache cache;
    private final KafkaQueue queue;
    private final TreeMap<Long, Integer> hashRing = new TreeMap<>();
    private final int shardCount = 4;
    private final int virtualNodes = 100; // Virtual nodes per shard

    public ConsistentHashingService(DataRepository repository, RedisCache cache, KafkaQueue queue) {
        this.repository = repository;
        this.cache = cache;
        this.queue = queue;
        // Initialize hash ring
        for (int i = 0; i < shardCount; i++) {
            for (int j = 0; j < virtualNodes; j++) {
                long hash = hash("shard" + i + "vn" + j);
                hashRing.put(hash, i);
            }
        }
    }

    private long hash(String key) {
        return Math.abs(key.hashCode()); // Simplified hash function
    }

    public int getShardIndex(String key) {
        long hash = hash(key);
        Long ceilingKey = hashRing.ceilingKey(hash);
        if (ceilingKey == null) {
            ceilingKey = hashRing.firstKey(); // Wrap around
        }
        return hashRing.get(ceilingKey);
    }

    public void writeRecord(String key, String value) {
        int shardIndex = getShardIndex(key);
        DataRecord record = new DataRecord(key, value, System.currentTimeMillis());
        repository.saveRecord(record, shardIndex);
        cache.cacheRecord(record);
        queue.enqueueWriteOperation(key, shardIndex);
    }

    public String readRecord(String key) {
        DataRecord cached = cache.getCachedRecord(key);
        if (cached != null) {
            return cached.getValue();
        }

        int shardIndex = getShardIndex(key);
        DataRecord record = repository.getRecord(key, shardIndex);
        if (record == null) {
            throw new IllegalArgumentException("Record not found: " + key);
        }
        cache.cacheRecord(record);
        return record.getValue();
    }
}

public class ShardingController {
    private final PoorShardingService poorService;
    private final ConsistentHashingService consistentService;

    public ShardingController(PoorShardingService poorService, ConsistentHashingService consistentService) {
        this.poorService = poorService;
        this.consistentService = consistentService;
    }

    public void handlePoorShardingWrite(String userId, String value) {
        poorService.writeRecord(userId, value);
        System.out.println("Wrote record with poor sharding: " + userId);
    }

    public String handlePoorShardingRead(String userId) {
        return poorService.readRecord(userId);
    }

    public void handleConsistentShardingWrite(String key, String value) {
        consistentService.writeRecord(key, value);
        System.out.println("Wrote record with consistent hashing: " + key);
    }

    public String handleConsistentShardingRead(String key) {
        return consistentService.readRecord(key);
    }
}

public class ShardingClient {
    public static void main(String[] args) {
        DataRepository repository = new CassandraDataRepository();
        RedisCache cache = new RedisCache();
        KafkaQueue queue = new KafkaQueue();
        PoorShardingService poorService = new PoorShardingService(repository, cache, queue);
        ConsistentHashingService consistentService = new ConsistentHashingService(repository, cache, queue);
        ShardingController controller = new ShardingController(poorService, consistentService);

        // Poor sharding example (hotspots likely)
        controller.handlePoorShardingWrite("user1", "data1");
        controller.handlePoorShardingWrite("user2", "data2");
        String value = controller.handlePoorShardingRead("user1");
        System.out.println("Read value (poor sharding): " + value);

        // Consistent hashing example (balanced distribution)
        controller.handleConsistentShardingWrite("key1", "data1");
        controller.handleConsistentShardingWrite("key2", "data2");
        value = controller.handleConsistentShardingRead("key1");
        System.out.println("Read value (consistent hashing): " + value);
        // Output:
        // Saving record to Cassandra shard <shardIndex>: user1
        // Caching record in Redis: user1
        // Enqueuing write operation to Kafka: user1, shard: <shardIndex>
        // Wrote record with poor sharding: user1
        // Saving record to Cassandra shard <shardIndex>: user2
        // Caching record in Redis: user2
        // Enqueuing write operation to Kafka: user2, shard: <shardIndex>
        // Wrote record with poor sharding: user2
        // Checking Redis cache for record: user1
        // Read value (poor sharding): data1
        // Saving record to Cassandra shard <shardIndex>: key1
        // Caching record in Redis: key1
        // Enqueuing write operation to Kafka: key1, shard: <shardIndex>
        // Wrote record with consistent hashing: key1
        // Saving record to Cassandra shard <shardIndex>: key2
        // Caching record in Redis: key2
        // Enqueuing write operation to Kafka: key2, shard: <shardIndex>
        // Wrote record with consistent hashing: key2
        // Checking Redis cache for record: key1
        // Read value (consistent hashing): data1
    }
}
```
- **System Design and Principles**:
  - **Pitfall**: `PoorShardingService` uses user ID-based sharding, risking hotspots.
  - **Solution**: `ConsistentHashingService` uses consistent hashing with virtual nodes for balanced distribution.
  - **Functional**: `writeRecord` stores data; `readRecord` retrieves data.
  - **Non-Functional**:
    - **Scalability**: Consistent hashing ensures even shard distribution.
    - **Low Latency**: `RedisCache` for fast reads.
    - **Reliability**: Cassandra with replication; Kafka for async writes.
  - **Encapsulation**: Private fields with public methods.
  - **Abstraction**: `DataRepository` interface for storage.
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates sharding logic; DIP (Section 4, Lecture 6) for abstractions.
- **Big O**: O(1) for `writeRecord`, `readRecord` (average case); O(log n) for consistent hashing lookup (n = virtual nodes).
- **Edge Cases**: Handles missing records, shard routing errors with exceptions.

**Systematic Approach**:
- Identified common HLD pitfalls (e.g., improper sharding) and solutions (e.g., consistent hashing).
- Designed system architecture diagram to show poor vs. fixed sharding strategies.
- Implemented Java code for both poor and fixed sharding services, addressing the pitfall.
- Tested with `main` method for write and read operations.

## Real-World Application
Imagine designing a scalable web platform and avoiding HLD pitfalls like improper sharding. Using consistent hashing with Cassandra and Redis ensures balanced data distribution and low-latency access. A system architecture diagram communicates the design to stakeholders, demonstrating your ability to mentor teams on robust HLD practices.

## Practice Exercises
Identify and address HLD pitfalls with these exercises:
- **Easy**: Design a system architecture diagram and Java code for a service with basic sharding, identifying potential pitfalls.
- **Medium**: Create a diagram and Java code to fix an improper sharding strategy using consistent hashing.
- **Medium**: Design an HLD for a system, addressing a pitfall (e.g., ignoring trade-offs), with a Java controller.
- **Hard**: Architect a system with Cassandra, Redis, and Kafka, avoiding multiple HLD pitfalls (e.g., unclear requirements, overcomplication), using a Java service.

Try designing one system in Java with a diagram, explaining how pitfalls are avoided.

## Conclusion
Understanding and avoiding common HLD pitfalls equips you to architect scalable, reliable Java systems and excel in system design interviews. By mastering these lessons, you’ll optimize performance, ensure robustness, and teach others effectively. This advances your progress in Section 5 of the *Official CTO* journey.

**Next Step**: Explore [Design an API Rate Limiter](/sections/hld-ai/api-rate-limiter) to apply HLD to another real-world problem, or check out [all sections](/sections/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>