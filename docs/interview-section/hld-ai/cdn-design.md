---
title: Design a Content Delivery Network (CDN)
description: Master the design of a Content Delivery Network in Java, covering scalability, low latency, and content caching for high-level system design.
---

# Design a Content Delivery Network (CDN)

## Overview
A Content Delivery Network (CDN) caches and delivers static and dynamic content globally through edge servers, reducing latency and improving performance. In this twenty-sixth lesson of Section 5 in the *Official CTO* journey, we explore the **high-level design of a CDN**, covering functional requirements (content caching, delivery), non-functional requirements (scalability, low latency, reliability), and trade-offs (cache hit ratio vs. storage, edge vs. origin server). Whether building a CDN for a media platform or a web application, this design ensures robust performance. By mastering this, you’ll architect scalable Java systems and mentor others effectively.

Inspired by *Clean Architecture*, *Designing Data-Intensive Applications*, and *System Design Interview*, this 25-minute lesson covers the concepts, a practical Java example with a system architecture diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand **functional** (content caching, delivery) and **non-functional** (scalability, latency, reliability) requirements for a CDN.
- Learn to design a **Content Delivery Network** in Java, addressing components and trade-offs.
- Apply **OOP principles** (Section 2, Lecture 1), **UML** (Section 2, Lecture 2), **design principles** (Section 4), and **HLD concepts** (Section 5, Lectures 1-25) to system design.
- Design scalable Java systems with clean code principles (Section 9).

## Why CDN Design Matters
CDNs are critical for delivering content with low latency to global users, reducing server load and enhancing user experience. Early in my career, I designed a content delivery system for a media platform, optimizing for low latency with edge caching and ensuring reliability with failover mechanisms. This design—balancing performance and scalability—is a staple in FAANG system design interviews. Explaining it clearly showcases your mentorship skills.

In software engineering, CDN design helps you:
- **Reduce Latency**: Deliver content from edge servers close to users.
- **Handle Scale**: Support millions of requests with distributed systems.
- **Ensure Reliability**: Maintain content availability with failover.
- **Teach Effectively**: Share scalable CDN design strategies.

## Key Concepts
### 1. Functional Requirements
- **Content Caching**: Store static/dynamic content at edge servers.
- **Content Delivery**: Serve content from the nearest edge server.
- **Optional**: Support cache invalidation, content prefetching, and dynamic content delivery.

### 2. Non-Functional Requirements
- **Scalability**: Handle billions of requests and terabytes of content daily.
- **Low Latency**: <50ms for content delivery.
- **Reliability**: Ensure content availability (99.9% uptime).
- **Storage Efficiency**: Optimize cache storage at edge servers.
- **Security**: Protect content with HTTPS and access controls.

### 3. System Components
- **Client**: Browser/mobile app requesting content.
- **Edge Servers**: Cache and serve content (e.g., Nginx-based).
- **Origin Server**: Stores original content (e.g., S3).
- **API**: Endpoints for content requests and cache management.
- **Load Balancer**: Distributes traffic (e.g., Nginx).
- **Application Server**: Handles logic (e.g., Java Spring Boot).
- **Cache**: Stores content at edge servers (e.g., Redis).
- **Database**: Stores metadata (e.g., Cassandra).
- **Message Queue**: Manages cache updates (e.g., Kafka).
- **DNS Service**: Routes requests to nearest edge server.

### 4. Trade-Offs
- **Cache Hit Ratio vs. Storage**: Larger cache (higher hit ratio, more storage) vs. smaller cache (less storage, lower hit ratio).
- **Edge vs. Origin**: Edge caching (fast, limited capacity) vs. origin fetch (reliable, slower).
- **Consistency**: Eventual consistency (fast, simpler) vs. strong consistency (reliable, complex).
- **CAP Theorem**: Prioritize AP (availability, partition tolerance) for content delivery.

### 5. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and polymorphism modularize components.
- **UML** (Section 2, Lecture 2): Diagrams visualize architecture.
- **Design Principles** (Section 4): SoC (Lecture 11) separates caching and delivery; KISS (Lecture 8) simplifies logic.
- **HLD Concepts**:
  - Components (Section 5, Lecture 1): Map to edge servers, origin, cache.
  - Requirements (Section 5, Lecture 2): Drive scalability and latency goals.
  - Scaling (Section 5, Lecture 3): Use sharding and caching.
  - Security/Performance (Section 5, Lecture 4): Ensure low latency and secure delivery.
  - Distributed Systems (Section 5, Lecture 5): Handle partitioning and availability.
  - URL Shortener (Section 5, Lecture 6): Similar storage and ID generation.
  - Pastebin (Section 5, Lecture 7): Similar storage patterns.
  - Web Crawler (Section 5, Lecture 8): Similar scalability challenges.
  - Twitter Feed (Section 5, Lecture 9): Similar caching needs.
  - Instagram Sharing (Section 5, Lecture 10): Similar content delivery.
  - YouTube Streaming (Section 5, Lecture 11): Similar low-latency delivery.
  - Netflix Recommendation (Section 5, Lecture 12): Similar caching patterns.
  - Uber Ride-Sharing (Section 5, Lecture 13): Similar real-time coordination.
  - WhatsApp Messaging (Section 5, Lecture 14): Similar real-time delivery.
  - Dropbox Storage (Section 5, Lecture 15): Similar storage patterns.
  - E-commerce Platform (Section 5, Lecture 16): Similar content delivery.
  - Ticket Booking (Section 5, Lecture 17): Similar scalability needs.
  - Notification System (Section 5, Lecture 18): Similar caching and delivery.
  - API Rate Limiter (Section 5, Lecture 19): Similar caching and low-latency needs.
  - Key-Value Store (Section 5, Lecture 20): Similar caching patterns.
  - Search Autocomplete (Section 5, Lecture 21): Similar caching and indexing.
  - News Feed Aggregator (Section 5, Lecture 22): Similar content delivery.
  - Distributed Cache (Section 5, Lecture 23): Similar caching patterns.
  - Leaderboard System (Section 5, Lecture 24): Similar caching and low-latency needs.
  - Payment Gateway (Section 5, Lecture 25): Similar scalability and reliability.

### 6. Use Case
Design a CDN for a media platform to cache and deliver video content globally, ensuring scalability and low latency.

## System Design
### Architecture
```
[Client (Browser/Mobile)] --> [DNS Service] --> [Edge Servers (Nginx, Cache)]
                                          |
                                       [Origin Server (S3)]
                                       [Application Server (Spring Boot)]
                                          |
                                          |--> [Database (Cassandra)]
                                          |--> [Cache (Redis)]
                                          |
                                       [Queue (Kafka)]
```

- **Content Caching**:
  1. Client requests content via GET `/content/{id}`.
  2. DNS routes to nearest edge server.
  3. Edge server checks cache (Redis); serves content if hit.
  4. On cache miss, fetch from origin server (S3); cache in Redis.
- **Content Delivery**:
  1. Edge server delivers content to client.
  2. Update metadata in Cassandra; enqueue cache updates to Kafka.
- **Scalability**: Deploy edge servers globally; shard Cassandra by content ID.
- **Performance**: Use Redis for fast cache access; edge servers for low latency.
- **Reliability**: Replicate edge caches; failover to origin server.
- **Trade-Offs**: Larger cache (higher hit ratio, more storage) vs. smaller cache (less storage, lower hit ratio).

### Trade-Offs
- **Cache Hit Ratio vs. Storage**: Larger cache (better performance, higher cost) vs. smaller cache (cost-effective, lower hit ratio).
- **Edge vs. Origin**: Edge caching (fast, limited capacity) vs. origin fetch (reliable, slower).
- **Consistency**: Eventual consistency for cache (fast) vs. strong consistency for metadata (reliable).

## Code Example: CDN Service
Let’s implement a simplified Java CDN service with caching and content delivery.

```java
import java.util.HashMap;
import java.util.Map;

public class Content {
    private String contentId;
    private String url;
    private long timestamp;
    
    public Content(String contentId, String url, long timestamp) {
        this.contentId = contentId;
        this.url = url;
        this.timestamp = timestamp;
    }
    
    public String getContentId() {
        return contentId;
    }
    
    public String getUrl() {
        return url;
    }
}

public interface ContentRepository {
    void saveContent(Content content);
    Content getContent(String contentId);
}

public class CassandraContentRepository implements ContentRepository {
    private final Map<String, Content> storage = new HashMap<>();
    
    @Override
    public void saveContent(Content content) {
        System.out.println("Saving content metadata to Cassandra: " + content.getContentId());
        storage.put(content.getContentId(), content);
    }
    
    @Override
    public Content getContent(String contentId) {
        System.out.println("Fetching content metadata from Cassandra: " + contentId);
        return storage.getOrDefault(contentId, null);
    }
}

public class RedisCache {
    private final Map<String, Content> cache = new HashMap<>();
    
    public Content getCachedContent(String contentId) {
        System.out.println("Checking Redis cache for content: " + contentId);
        return cache.getOrDefault(contentId, null);
    }
    
    public void cacheContent(Content content) {
        System.out.println("Caching content in Redis: " + content.getContentId());
        cache.put(content.getContentId(), content);
    }
}

public class OriginServer {
    public String fetchContent(String contentId) {
        System.out.println("Fetching content from origin server (S3): " + contentId);
        return "s3://bucket/" + contentId;
    }
}

public class KafkaQueue {
    public void enqueueCacheUpdate(String contentId) {
        System.out.println("Enqueuing cache update to Kafka: " + contentId);
    }
}

public class CDNService {
    private final ContentRepository repository;
    private final RedisCache cache;
    private final OriginServer originServer;
    private final KafkaQueue queue;
    
    public CDNService(ContentRepository repository, RedisCache cache, OriginServer originServer, KafkaQueue queue) {
        this.repository = repository;
        this.cache = cache;
        this.originServer = originServer;
        this.queue = queue;
    }
    
    public String getContent(String contentId) {
        Content cached = cache.getCachedContent(contentId);
        if (cached != null) {
            return cached.getUrl();
        }
        
        Content content = repository.getContent(contentId);
        if (content == null) {
            String url = originServer.fetchContent(contentId);
            content = new Content(contentId, url, System.currentTimeMillis());
            repository.saveContent(content);
            cache.cacheContent(content);
            queue.enqueueCacheUpdate(contentId);
        } else {
            cache.cacheContent(content);
        }
        return content.getUrl();
    }
}

public class CDNController {
    private final CDNService service;
    
    public CDNController(CDNService service) {
        this.service = service;
    }
    
    public String handleGetContent(String contentId) {
        return service.getContent(contentId);
    }
}

public class CDNClient {
    public static void main(String[] args) {
        ContentRepository repository = new CassandraContentRepository();
        RedisCache cache = new RedisCache();
        OriginServer originServer = new OriginServer();
        KafkaQueue queue = new KafkaQueue();
        CDNService service = new CDNService(repository, cache, originServer, queue);
        CDNController controller = new CDNController(service);
        
        String url1 = controller.handleGetContent("video1");
        System.out.println("Retrieved content URL: " + url1);
        String url2 = controller.handleGetContent("video1");
        System.out.println("Retrieved content URL: " + url2);
        // Output:
        // Checking Redis cache for content: video1
        // Fetching content metadata from Cassandra: video1
        // Fetching content from origin server (S3): video1
        // Saving content metadata to Cassandra: video1
        // Caching content in Redis: video1
        // Enqueuing cache update to Kafka: video1
        // Retrieved content URL: s3://bucket/video1
        // Checking Redis cache for content: video1
        // Retrieved content URL: s3://bucket/video1
    }
}
```
- **System Design and Principles**:
  - **Functional**: `getContent` serves cached or origin content.
  - **Non-Functional**:
    - **Scalability**: `CassandraContentRepository` shards by content ID; edge server caching.
    - **Low Latency**: `RedisCache` for fast content retrieval.
    - **Reliability**: Cassandra replication; failover to origin server.
  - **Encapsulation**: Private fields with public methods.
  - **Abstraction**: `ContentRepository` interface for storage.
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates caching and delivery; DIP (Section 4, Lecture 6) for abstractions.
- **Big O**: O(1) for `getContent`, `cacheContent` (average case).
- **Edge Cases**: Handles cache misses, missing content with origin fallback.

**Systematic Approach**:
- Clarified requirements (cache and deliver content, ensure scalability and low latency).
- Designed system architecture diagram to show edge servers, origin, cache, and routing.
- Implemented Java code for a CDN service, addressing requirements and trade-offs.
- Tested with `main` method for content retrieval with cache hit and miss scenarios.

## Real-World Application
Imagine designing a CDN for a media platform to deliver video content globally, using Redis for edge caching, S3 as the origin server, and Cassandra for metadata storage. A system architecture diagram communicates the design to stakeholders, ensuring performance and reliability. This design—paired with principles like KISS (Section 4, Lecture 8) and patterns like Facade (Section 3, Lecture 8)—demonstrates your ability to mentor teams on scalable CDN design.

## Practice Exercises
Design a CDN or similar with these exercises:
- **Easy**: Design a system architecture diagram and Java code for a `CDNService` with basic content caching.
- **Medium**: Create a diagram and Java code for a `CDNService` with cache invalidation.
- **Medium**: Design an HLD for a CDN with edge caching and sharding, implementing a Java controller.
- **Hard**: Architect a CDN with Redis, S3, and Cassandra, supporting dynamic content, using a Java service.

Try designing one system in Java with a diagram, explaining how requirements and trade-offs are addressed.

## Conclusion
Designing a Content Delivery Network equips you to architect scalable, low-latency Java systems for content platforms. By mastering this design, you’ll optimize performance, ensure reliability, and teach others effectively. This advances your progress in Section 5 of the *Official CTO* journey.

**Next Step**: Explore [Design an API Rate Limiter](/interview-section/hld-ai/api-rate-limiter) to apply HLD to another real-world problem, or check out [all sections](/interview-section/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>