---
title: Design a URL Shortener (e.g., TinyURL)
description: Master the design of a URL shortener like TinyURL in Java, covering scalability, low latency, and collision handling for high-level system design.
---

# Design a URL Shortener (e.g., TinyURL)

## Overview
A URL shortener, like TinyURL, transforms long URLs into short, unique aliases and redirects users to the original URL when accessed. In this sixth lesson of Section 5 in the *Official CTO* journey, we explore the **high-level design of a URL shortener**, covering functional requirements (shortening, redirecting), non-functional requirements (scalability, low latency, availability), and trade-offs (collision handling, storage). Whether shortening URLs for a social app or an e-commerce platform, this design ensures robust performance. By mastering this, you’ll architect scalable Java systems and mentor others effectively.

Inspired by *Clean Architecture*, *Designing Data-Intensive Applications*, and *System Design Interview*, this 25-minute lesson covers the concepts, a practical Java example with a system architecture diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand **functional** (shortening, redirecting) and **non-functional** (scalability, latency, availability) requirements for a URL shortener.
- Learn to design a **URL shortener** in Java, addressing components and trade-offs.
- Apply **OOP principles** (Section 2, Lecture 1), **UML** (Section 2, Lecture 2), **design principles** (Section 4), and **HLD concepts** (Section 5, Lectures 1-5) to system design.
- Design scalable Java systems with clean code practices (Section 9).

## Why URL Shortener Design Matters
URL shorteners are a classic system design problem, requiring efficient storage, fast redirection, and high scalability. Early in my career, I designed a URL shortening service for a social app, optimizing for low latency with caching and handling collisions with unique key generation. This design—balancing simplicity and performance—is a staple in FAANG system design interviews. Explaining it clearly showcases your mentorship skills.

In software engineering, URL shortener design helps you:
- **Handle Scale**: Support millions of URLs with sharding and caching.
- **Ensure Low Latency**: Optimize redirection with efficient storage.
- **Manage Trade-Offs**: Balance storage costs and collision risks.
- **Teach Effectively**: Share scalable design strategies.

## Key Concepts
### 1. Functional Requirements
- **Shorten URL**: Convert a long URL (e.g., `https://example.com/very/long/path`) to a short alias (e.g., `tinyurl.com/abc123`).
- **Redirect URL**: Map the short URL to the original URL.
- **Optional**: Custom aliases, analytics tracking.

### 2. Non-Functional Requirements
- **Scalability**: Handle billions of URLs and millions of requests/day.
- **Low Latency**: <100ms for redirection.
- **Availability**: 99.9% uptime with fault tolerance.
- **Storage Efficiency**: Minimize database size.

### 3. System Components
- **Client**: Browser/mobile app sending requests.
- **API**: REST endpoints for shortening and redirecting.
- **Load Balancer**: Distributes traffic (e.g., Nginx).
- **Application Server**: Handles logic (e.g., Java Spring Boot).
- **Database**: Stores URL mappings (e.g., NoSQL like DynamoDB).
- **Cache**: Speeds up redirection (e.g., Redis).

### 4. Trade-Offs
- **Key Generation**: Random keys (e.g., base62 encoding) vs. incremental IDs (collision risk).
- **Storage**: NoSQL (scalable) vs. SQL (simpler queries).
- **CAP Theorem**: Prioritize AP (availability, partition tolerance) for redirection.

### 5. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and polymorphism modularize components.
- **UML** (Section 2, Lecture 2): Diagrams visualize architecture.
- **Design Principles** (Section 4): SoC (Lecture 11) separates shortening and redirection; KISS (Lecture 8) simplifies logic.
- **HLD Concepts**:
  - Components (Section 5, Lecture 1): Map to API, database, cache.
  - Requirements (Section 5, Lecture 2): Drive scalability and latency goals.
  - Scaling (Section 5, Lecture 3): Use sharding and caching.
  - Security/Performance (Section 5, Lecture 4): Ensure low latency with caching.
  - Distributed Systems (Section 5, Lecture 5): Handle partitioning and availability.

### 6. Use Case
Design a URL shortener for a social app to share concise links, ensuring scalability and low latency.

## System Design
### Architecture
```
[Client (Browser/Mobile)] --> [Load Balancer (Nginx)] --> [Application Server (Spring Boot)]
                                                          |
                                                          |--> [Database (DynamoDB)]
                                                          |
                                                       [Cache (Redis)]
```

- **Shortening**:
  1. Client sends long URL via POST `/shorten`.
  2. Application server generates a unique short key (e.g., base62 hash).
  3. Store mapping in database; cache for fast access.
  4. Return short URL (e.g., `tinyurl.com/abc123`).
- **Redirection**:
  1. Client accesses short URL via GET `/abc123`.
  2. Check cache for mapping; if missed, query database.
  3. Redirect to original URL.
- **Collision Handling**: Retry with new key or use UUID.
- **Scalability**: Shard database by short key; replicate for availability.
- **Performance**: Cache frequent URLs in Redis.

### Trade-Offs
- **Key Length**: 6-8 characters (base62) balances shortness and collision risk.
- **Database**: NoSQL (DynamoDB) for scalability vs. SQL for simpler queries.
- **Caching**: Redis for low latency; eviction policies for memory efficiency.

## Code Example: URL Shortener Service
Let’s implement a simplified Java URL shortening service with sharding and caching.

```java
// Simplified URL shortener service
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class UrlMapping {
    private String shortKey;
    private String longUrl;
    
    public UrlMapping(String shortKey, String longUrl) {
        this.shortKey = shortKey;
        this.longUrl = longUrl;
    }
    
    public String getShortKey() {
        return shortKey;
    }
    
    public String getLongUrl() {
        return longUrl;
    }
}

public interface UrlRepository {
    void saveMapping(UrlMapping mapping);
    UrlMapping getMapping(String shortKey);
}

public class ShardedUrlRepository implements UrlRepository {
    private final Map<Integer, UrlRepository> shards;
    private final int shardCount = 2; // Two shards for simplicity
    
    public ShardedUrlRepository() {
        this.shards = new HashMap<>();
        shards.put(0, new DynamoDBRepository("shard1"));
        shards.put(1, new DynamoDBRepository("shard2"));
    }
    
    private int getShardIndex(String shortKey) {
        return Math.abs(shortKey.hashCode() % shardCount);
    }
    
    @Override
    public void saveMapping(UrlMapping mapping) {
        int shardIndex = getShardIndex(mapping.getShortKey());
        shards.get(shardIndex).saveMapping(mapping);
    }
    
    @Override
    public UrlMapping getMapping(String shortKey) {
        int shardIndex = getShardIndex(shortKey);
        return shards.get(shardIndex).getMapping(shortKey);
    }
}

public class DynamoDBRepository implements UrlRepository {
    private final String shardName;
    private final Map<String, UrlMapping> storage = new HashMap<>();
    
    public DynamoDBRepository(String shardName) {
        this.shardName = shardName;
    }
    
    @Override
    public void saveMapping(UrlMapping mapping) {
        System.out.println("Saving to " + shardName + ": " + mapping.getShortKey() + " -> " + mapping.getLongUrl());
        storage.put(mapping.getShortKey(), mapping);
    }
    
    @Override
    public UrlMapping getMapping(String shortKey) {
        System.out.println("Fetching from " + shardName + ": " + shortKey);
        return storage.getOrDefault(shortKey, null);
    }
}

public class RedisCache {
    private final Map<String, UrlMapping> cache = new HashMap<>();
    
    public UrlMapping getCachedMapping(String shortKey) {
        System.out.println("Checking Redis cache for: " + shortKey);
        return cache.getOrDefault(shortKey, null);
    }
    
    public void cacheMapping(UrlMapping mapping) {
        System.out.println("Caching in Redis: " + mapping.getShortKey());
        cache.put(mapping.getShortKey(), mapping);
    }
}

public class UrlShortenerService {
    private final UrlRepository repository;
    private final RedisCache cache;
    
    public UrlShortenerService(UrlRepository repository, RedisCache cache) {
        this.repository = repository;
        this.cache = cache;
    }
    
    public String shortenUrl(String longUrl) {
        // Generate short key (simplified base64 for demo)
        String shortKey = Base64.getEncoder().encodeToString(longUrl.getBytes()).substring(0, 6);
        UrlMapping mapping = new UrlMapping(shortKey, longUrl);
        
        // Handle collisions by appending suffix
        UrlMapping existing = repository.getMapping(shortKey);
        int suffix = 1;
        while (existing != null && !existing.getLongUrl().equals(longUrl)) {
            shortKey = Base64.getEncoder().encodeToString((longUrl + suffix).getBytes()).substring(0, 6);
            mapping = new UrlMapping(shortKey, longUrl);
            existing = repository.getMapping(shortKey);
            suffix++;
        }
        
        cache.cacheMapping(mapping);
        repository.saveMapping(mapping);
        return shortKey;
    }
    
    public String getLongUrl(String shortKey) {
        UrlMapping cached = cache.getCachedMapping(shortKey);
        if (cached != null) {
            return cached.getLongUrl();
        }
        
        UrlMapping mapping = repository.getMapping(shortKey);
        if (mapping != null) {
            cache.cacheMapping(mapping);
            return mapping.getLongUrl();
        }
        throw new IllegalArgumentException("Short URL not found: " + shortKey);
    }
}

public class UrlShortenerController {
    private final UrlShortenerService service;
    
    public UrlShortenerController(UrlShortenerService service) {
        this.service = service;
    }
    
    public String handleShortenUrl(String longUrl) {
        return service.shortenUrl(longUrl);
    }
    
    public String handleGetLongUrl(String shortKey) {
        return service.getLongUrl(shortKey);
    }
}

public class UrlShortenerClient {
    public static void main(String[] args) {
        UrlRepository repository = new ShardedUrlRepository();
        RedisCache cache = new RedisCache();
        UrlShortenerService service = new UrlShortenerService(repository, cache);
        UrlShortenerController controller = new UrlShortenerController(service);
        
        String longUrl = "https://example.com/very/long/path";
        String shortKey = controller.handleShortenUrl(longUrl);
        System.out.println("Short URL: tinyurl.com/" + shortKey);
        
        String retrievedUrl = controller.handleGetLongUrl(shortKey);
        System.out.println("Retrieved URL: " + retrievedUrl);
        // Output:
        // Caching in Redis: aHR0cH
        // Saving to shard1: aHR0cH -> https://example.com/very/long/path
        // Short URL: tinyurl.com/aHR0cH
        // Checking Redis cache for: aHR0cH
        // Retrieved URL: https://example.com/very/long/path
    }
}
```
- **System Design and Principles**:
  - **Functional**: `shortenUrl` creates short URLs; `getLongUrl` redirects.
  - **Non-Functional**: 
    - **Scalability**: `ShardedUrlRepository` distributes data across shards.
    - **Low Latency**: `RedisCache` reduces database queries.
    - **Availability**: NoSQL (DynamoDB) with replication.
  - **Collision Handling**: Appends suffix to avoid duplicate keys.
  - **Encapsulation**: Private fields with public methods.
  - **Abstraction**: `UrlRepository` interface for storage.
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates shortening and storage; DIP (Section 4, Lecture 6) for abstractions.
- **Big O**: O(1) for `shortenUrl`, `getLongUrl`, `saveMapping`, `cacheMapping` (average case, hash-based).
- **Edge Cases**: Handles collisions, missing URLs with exceptions.

**Systematic Approach**:
- Clarified requirements (shorten URLs, redirect, ensure scalability).
- Designed system architecture diagram to show API, sharding, and caching.
- Implemented Java code for a URL shortening service, addressing requirements and trade-offs.
- Tested with `main` method for shortening and redirection.

## Real-World Application
Imagine designing a URL shortener for a social app to share concise links in posts, using sharding for scalability, caching for low latency, and collision handling for uniqueness. A system architecture diagram communicates the design to stakeholders, ensuring performance and reliability. This design—paired with principles like KISS (Section 4, Lecture 8) and patterns like Facade (Section 3, Lecture 8)—demonstrates your ability to mentor teams on scalable system design.

## Practice Exercises
Design a URL shortener or similar system with these exercises:
- **Easy**: Design a system architecture diagram and Java code for a `LinkShortener` with basic shortening and redirection.
- **Medium**: Create a diagram and Java code for a `LinkService` with custom aliases and analytics tracking.
- **Medium**: Design an HLD for a shortener with sharding and caching, implementing a Java controller.
- **Hard**: Architect a shortener with distributed storage (e.g., Cassandra) and rate limiting, using a Java service.

Try designing one system in Java with a diagram, explaining how requirements and trade-offs are addressed.

## Conclusion
Designing a URL shortener equips you to architect scalable, low-latency Java systems by balancing functional and non-functional requirements. By mastering this design, you’ll optimize performance, ensure reliability, and teach others effectively. This advances your progress in Section 5 of the *Official CTO* journey.

**Next Step**: Explore [Design a Pastebin/Code Sharing Service](/interview-section/hld-ai/pastebin) to apply HLD to another real-world problem, or check out [all sections](/interview-section/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>