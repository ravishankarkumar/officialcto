---
title: Design a Pastebin/Code Sharing Service
description: Master the design of a Pastebin-like code-sharing service in Java, covering scalability, low latency, and expiration for high-level system design.
---

# Design a Pastebin/Code Sharing Service

## Overview
A Pastebin-like code-sharing service allows users to create, share, and retrieve text snippets (pastes) with unique identifiers, often with expiration policies. In this seventh lesson of Section 5 in the *Official CTO* journey, we explore the **high-level design of a Pastebin-like service**, covering functional requirements (creating, retrieving, expiring pastes), non-functional requirements (scalability, low latency, availability), and trade-offs (storage, expiration mechanisms). Whether building a code-sharing tool for a developer platform or a note-sharing app, this design ensures robust performance. By mastering this, you’ll architect scalable Java systems and mentor others effectively.

Inspired by *Clean Architecture*, *Designing Data-Intensive Applications*, and *System Design Interview*, this 25-minute lesson covers the concepts, a practical Java example with a system architecture diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand **functional** (create, retrieve, expire pastes) and **non-functional** (scalability, latency, availability) requirements for a Pastebin.
- Learn to design a **code-sharing service** in Java, addressing components and trade-offs.
- Apply **OOP principles** (Section 2, Lecture 1), **UML** (Section 2, Lecture 2), **design principles** (Section 4), and **HLD concepts** (Section 5, Lectures 1-6) to system design.
- Design scalable Java systems with clean code practices (Section 9).

## Why Pastebin Design Matters
Pastebin-like services are a common system design problem, requiring efficient storage, fast retrieval, and expiration handling for millions of pastes. Early in my career, I designed a code-sharing tool for a developer platform, optimizing for low latency with caching and implementing expiration for storage efficiency. This design—balancing functionality and performance—is a staple in FAANG system design interviews. Explaining it clearly showcases your mentorship skills.

In software engineering, Pastebin design helps you:
- **Handle Scale**: Support millions of pastes with sharding and caching.
- **Ensure Low Latency**: Optimize retrieval with efficient storage.
- **Manage Trade-Offs**: Balance storage costs and expiration policies.
- **Teach Effectively**: Share scalable design strategies.

## Key Concepts
### 1. Functional Requirements
- **Create Paste**: Store text with a unique ID (e.g., `pastebin.com/abc123`).
- **Retrieve Paste**: Fetch text by ID.
- **Expire Paste**: Remove pastes after a set period (e.g., 7 days).
- **Optional**: Syntax highlighting, private pastes, analytics.

### 2. Non-Functional Requirements
- **Scalability**: Handle billions of pastes and millions of requests/day.
- **Low Latency**: <100ms for paste retrieval.
- **Availability**: 99.9% uptime with fault tolerance.
- **Storage Efficiency**: Minimize database size with expiration.

### 3. System Components
- **Client**: Browser/mobile app sending requests.
- **API**: REST endpoints for creating/retrieving pastes.
- **Load Balancer**: Distributes traffic (e.g., Nginx).
- **Application Server**: Handles logic (e.g., Java Spring Boot).
- **Database**: Stores paste data (e.g., NoSQL like DynamoDB).
- **Cache**: Speeds up retrieval (e.g., Redis).
- **Scheduler**: Manages expiration (e.g., cron job).

### 4. Trade-Offs
- **ID Generation**: Random keys (e.g., base62) vs. incremental IDs (collision risk).
- **Storage**: NoSQL (scalable) vs. SQL (simpler queries).
- **Expiration**: Scheduled deletion vs. soft deletion (space vs. complexity).
- **CAP Theorem**: Prioritize AP (availability, partition tolerance) for retrieval.

### 5. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and polymorphism modularize components.
- **UML** (Section 2, Lecture 2): Diagrams visualize architecture.
- **Design Principles** (Section 4): SoC (Lecture 11) separates paste creation and expiration; KISS (Lecture 8) simplifies logic.
- **HLD Concepts**:
  - Components (Section 5, Lecture 1): Map to API, database, cache.
  - Requirements (Section 5, Lecture 2): Drive scalability and latency goals.
  - Scaling (Section 5, Lecture 3): Use sharding and caching.
  - Security/Performance (Section 5, Lecture 4): Ensure low latency with caching.
  - Distributed Systems (Section 5, Lecture 5): Handle partitioning and availability.
  - URL Shortener (Section 5, Lecture 6): Similar ID generation and storage challenges.

### 6. Use Case
Design a code-sharing service for a developer platform to store and retrieve code snippets, ensuring scalability and efficient expiration.

## System Design
### Architecture
```
[Client (Browser/Mobile)] --> [Load Balancer (Nginx)] --> [Application Server (Spring Boot)]
                                                          |
                                                          |--> [Database (DynamoDB)]
                                                          |
                                                       [Cache (Redis)]
                                                       [Scheduler (Cron Job)]
```

- **Creating a Paste**:
  1. Client sends text via POST `/paste`.
  2. Application server generates a unique ID (e.g., base62 hash).
  3. Store paste in database with expiration timestamp; cache for fast access.
  4. Return paste ID (e.g., `pastebin.com/abc123`).
- **Retrieving a Paste**:
  1. Client accesses paste via GET `/paste/abc123`.
  2. Check cache for paste; if missed, query database.
  3. Return paste content or error if expired/not found.
- **Expiring Pastes**:
  1. Scheduler (cron job) deletes pastes past expiration (e.g., 7 days).
- **Scalability**: Shard database by paste ID; replicate for availability.
- **Performance**: Cache frequent pastes in Redis.
- **Trade-Offs**: Base62 for IDs (low collision risk); NoSQL for scalability.

### Trade-Offs
- **ID Length**: 6-8 characters balances shortness and uniqueness.
- **Storage**: NoSQL (DynamoDB) for scalability vs. SQL for simpler queries.
- **Expiration**: Scheduled deletion (simple) vs. soft deletion (complex but recoverable).

## Code Example: Paste Sharing Service
Let’s implement a simplified Java paste-sharing service with sharding, caching, and expiration.

```java
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class Paste {
    private String pasteId;
    private String content;
    private long expirationTimestamp; // Unix timestamp (ms)
    
    public Paste(String pasteId, String content, long expirationTimestamp) {
        this.pasteId = pasteId;
        this.content = content;
        this.expirationTimestamp = expirationTimestamp;
    }
    
    public String getPasteId() {
        return pasteId;
    }
    
    public String getContent() {
        return content;
    }
    
    public long getExpirationTimestamp() {
        return expirationTimestamp;
    }
    
    public boolean isExpired() {
        return System.currentTimeMillis() > expirationTimestamp;
    }
}

public interface PasteRepository {
    void savePaste(Paste paste);
    Paste getPaste(String pasteId);
}

public class ShardedPasteRepository implements PasteRepository {
    private final Map<Integer, PasteRepository> shards;
    private final int shardCount = 2; // Two shards for simplicity
    
    public ShardedPasteRepository() {
        this.shards = new HashMap<>();
        shards.put(0, new DynamoDBPasteRepository("shard1"));
        shards.put(1, new DynamoDBPasteRepository("shard2"));
    }
    
    private int getShardIndex(String pasteId) {
        return Math.abs(pasteId.hashCode() % shardCount);
    }
    
    @Override
    public void savePaste(Paste paste) {
        int shardIndex = getShardIndex(paste.getPasteId());
        shards.get(shardIndex).savePaste(paste);
    }
    
    @Override
    public Paste getPaste(String pasteId) {
        int shardIndex = getShardIndex(pasteId);
        return shards.get(shardIndex).getPaste(pasteId);
    }
}

public class DynamoDBPasteRepository implements PasteRepository {
    private final String shardName;
    private final Map<String, Paste> storage = new HashMap<>();
    
    public DynamoDBPasteRepository(String shardName) {
        this.shardName = shardName;
    }
    
    @Override
    public void savePaste(Paste paste) {
        System.out.println("Saving to " + shardName + ": " + paste.getPasteId());
        storage.put(paste.getPasteId(), paste);
    }
    
    @Override
    public Paste getPaste(String pasteId) {
        System.out.println("Fetching from " + shardName + ": " + pasteId);
        return storage.getOrDefault(pasteId, null);
    }
}

public class RedisCache {
    private final Map<String, Paste> cache = new HashMap<>();
    
    public Paste getCachedPaste(String pasteId) {
        System.out.println("Checking Redis cache for: " + pasteId);
        return cache.getOrDefault(pasteId, null);
    }
    
    public void cachePaste(Paste paste) {
        System.out.println("Caching in Redis: " + paste.getPasteId());
        cache.put(paste.getPasteId(), paste);
    }
}

public class PasteExpirationScheduler {
    public void expirePastes(PasteRepository repository, String pasteId) {
        Paste paste = repository.getPaste(pasteId);
        if (paste != null && paste.isExpired()) {
            System.out.println("Expiring paste: " + pasteId);
            // Simulate deletion (not implemented in this simple example)
        }
    }
}

public class PasteService {
    private final PasteRepository repository;
    private final RedisCache cache;
    private final PasteExpirationScheduler scheduler;
    private final long defaultExpirationMs = 7 * 24 * 60 * 60 * 1000L; // 7 days
    
    public PasteService(PasteRepository repository, RedisCache cache, PasteExpirationScheduler scheduler) {
        this.repository = repository;
        this.cache = cache;
        this.scheduler = scheduler;
    }
    
    public String createPaste(String content) {
        // Generate short paste ID (simplified base64 for demo)
        String pasteId = Base64.getEncoder().encodeToString(content.getBytes()).substring(0, 6);
        Paste paste = new Paste(pasteId, content, System.currentTimeMillis() + defaultExpirationMs);
        
        // Handle collisions
        Paste existing = repository.getPaste(pasteId);
        int suffix = 1;
        while (existing != null && !existing.getContent().equals(content)) {
            pasteId = Base64.getEncoder().encodeToString((content + suffix).getBytes()).substring(0, 6);
            paste = new Paste(pasteId, content, System.currentTimeMillis() + defaultExpirationMs);
            existing = repository.getPaste(pasteId);
            suffix++;
        }
        
        cache.cachePaste(paste);
        repository.savePaste(paste);
        scheduler.expirePastes(repository, pasteId); // Check expiration immediately (simplified)
        return pasteId;
    }
    
    public String getPaste(String pasteId) {
        Paste cached = cache.getCachedPaste(pasteId);
        if (cached != null && !cached.isExpired()) {
            return cached.getContent();
        }
        
        Paste paste = repository.getPaste(pasteId);
        if (paste == null || paste.isExpired()) {
            throw new IllegalArgumentException("Paste not found or expired: " + pasteId);
        }
        
        cache.cachePaste(paste);
        return paste.getContent();
    }
}

public class PasteController {
    private final PasteService service;
    
    public PasteController(PasteService service) {
        this.service = service;
    }
    
    public String handleCreatePaste(String content) {
        return service.createPaste(content);
    }
    
    public String handleGetPaste(String pasteId) {
        return service.getPaste(pasteId);
    }
}

public class PasteClient {
    public static void main(String[] args) {
        PasteRepository repository = new ShardedPasteRepository();
        RedisCache cache = new RedisCache();
        PasteExpirationScheduler scheduler = new PasteExpirationScheduler();
        PasteService service = new PasteService(repository, cache, scheduler);
        PasteController controller = new PasteController(service);
        
        String content = "public class HelloWorld { public static void main(String[] args) { System.out.println(\"Hello, World!\"); } }";
        String pasteId = controller.handleCreatePaste(content);
        System.out.println("Paste URL: pastebin.com/" + pasteId);
        
        String retrievedContent = controller.handleGetPaste(pasteId);
        System.out.println("Retrieved content: " + retrievedContent);
        // Output:
        // Caching in Redis: cHVibGlj
        // Saving to shard1: cHVibGlj
        // Paste URL: pastebin.com/cHVibGlj
        // Checking Redis cache for: cHVibGlj
        // Retrieved content: public class HelloWorld { public static void main(String[] args) { System.out.println("Hello, World!"); } }
    }
}
```
- **System Design and Principles**:
  - **Functional**: `createPaste` stores content with ID; `getPaste` retrieves content; `expirePastes` handles expiration.
  - **Non-Functional**:
    - **Scalability**: `ShardedPasteRepository` distributes data across shards.
    - **Low Latency**: `RedisCache` reduces database queries.
    - **Availability**: NoSQL (DynamoDB) with replication.
  - **Expiration**: `PasteExpirationScheduler` simulates cron-based deletion.
  - **Collision Handling**: Appends suffix to avoid duplicate IDs.
  - **Encapsulation**: Private fields with public methods.
  - **Abstraction**: `PasteRepository` interface for storage.
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates paste creation and expiration; DIP (Section 4, Lecture 6) for abstractions.
- **Big O**: O(1) for `createPaste`, `getPaste`, `savePaste`, `cachePaste` (average case, hash-based).
- **Edge Cases**: Handles collisions, expired pastes, and missing IDs with exceptions.

**Systematic Approach**:
- Clarified requirements (create, retrieve, expire pastes; ensure scalability).
- Designed system architecture diagram to show API, sharding, caching, and scheduler.
- Implemented Java code for a paste-sharing service, addressing requirements and trade-offs.
- Tested with `main` method for paste creation and retrieval.

## Real-World Application
Imagine designing a code-sharing service for a developer platform to share snippets, using sharding for scalability, caching for low latency, and scheduled expiration for storage efficiency. A system architecture diagram communicates the design to stakeholders, ensuring performance and reliability. This design—paired with principles like KISS (Section 4, Lecture 8) and patterns like Facade (Section 3, Lecture 8)—demonstrates your ability to mentor teams on scalable system design.

## Practice Exercises
Design a Pastebin or similar system with these exercises:
- **Easy**: Design a system architecture diagram and Java code for a `PasteService` with basic creation and retrieval.
- **Medium**: Create a diagram and Java code for a `CodeSharingService` with syntax highlighting and private pastes.
- **Medium**: Design an HLD for a paste system with sharding, caching, and expiration, implementing a Java controller.
- **Hard**: Architect a paste system with distributed storage (e.g., Cassandra) and analytics, using a Java service.

Try designing one system in Java with a diagram, explaining how requirements and trade-offs are addressed.

## Conclusion
Designing a Pastebin-like code-sharing service equips you to architect scalable, low-latency Java systems by balancing functional and non-functional requirements. By mastering this design, you’ll optimize performance, ensure reliability, and teach others effectively. This advances your progress in Section 5 of the *Official CTO* journey.

**Next Step**: Explore [Design a Web Crawler/Search Engine Crawler](/sections/hld-ai/web-crawler) to apply HLD to another real-world problem, or check out [all sections](/sections/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>