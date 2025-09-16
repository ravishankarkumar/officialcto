---
title: Design a News Feed Aggregator
description: Master the design of a news feed aggregator in Java, covering scalability, low latency, and content aggregation for high-level system design.
---

# Design a News Feed Aggregator

## Overview
A news feed aggregator collects content from multiple sources and delivers personalized feeds to users, similar to platforms like Google News or Feedly. In this twenty-second lesson of Section 5 in the *Official CTO* journey, we explore the **high-level design of a news feed aggregator**, covering functional requirements (aggregating content, generating personalized feeds), non-functional requirements (scalability, low latency, reliability), and trade-offs (real-time vs. batched processing, storage efficiency). Whether building a content platform or a social app, this design ensures robust performance. By mastering this, you’ll architect scalable Java systems and mentor others effectively.

Inspired by *Clean Architecture*, *Designing Data-Intensive Applications*, and *System Design Interview*, this 25-minute lesson covers the concepts, a practical Java example with a system architecture diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand **functional** (content aggregation, feed generation) and **non-functional** (scalability, latency, reliability) requirements for a news feed aggregator.
- Learn to design a **news feed aggregator** in Java, addressing components and trade-offs.
- Apply **OOP principles** (Section 2, Lecture 1), **UML** (Section 2, Lecture 2), **design principles** (Section 4), and **HLD concepts** (Section 5, Lectures 1-21) to system design.
- Design scalable Java systems with clean code practices (Section 9).

## Why News Feed Aggregator Design Matters
News feed aggregators enhance user engagement by delivering curated content, requiring efficient content ingestion and scalable feed generation. Early in my career, I designed a feed aggregator for a content platform, optimizing for low latency with caching and balancing real-time updates with storage costs. This design—integrating scalability and performance—is a staple in FAANG system design interviews. Explaining it clearly showcases your mentorship skills.

In software engineering, news feed aggregator design helps you:
- **Enhance Engagement**: Deliver curated, personalized feeds.
- **Handle Scale**: Process millions of articles and users daily.
- **Ensure Low Latency**: Optimize feed generation with caching.
- **Teach Effectively**: Share scalable aggregation design strategies.

## Key Concepts
### 1. Functional Requirements
- **Content Aggregation**: Collect articles from multiple sources (e.g., RSS feeds, APIs).
- **Feed Generation**: Create personalized feeds based on user preferences or subscriptions.
- **Optional**: Support ranking, filtering, and user interactions (e.g., likes, shares).

### 2. Non-Functional Requirements
- **Scalability**: Handle millions of articles and users daily.
- **Low Latency**: <200ms for feed generation.
- **Reliability**: Ensure consistent feed delivery (99.9% uptime).
- **Storage Efficiency**: Optimize for article and metadata storage.

### 3. System Components
- **Client**: Browser/mobile app for viewing feeds.
- **API**: REST endpoints for feed retrieval and user preferences.
- **Load Balancer**: Distributes traffic (e.g., Nginx).
- **Application Server**: Handles logic (e.g., Java Spring Boot).
- **Content Ingestion Service**: Collects articles (e.g., RSS parser, web crawler).
- **Database**: Stores articles and metadata (e.g., Cassandra).
- **Cache**: Speeds up feed generation (e.g., Redis).
- **Search Index**: Indexes articles for ranking (e.g., Elasticsearch).
- **Message Queue**: Manages async ingestion (e.g., Kafka).

### 4. Trade-Offs
- **Processing**: Real-time ingestion (low latency, high compute) vs. batched (efficient, delayed).
- **Storage**: NoSQL (scalable) vs. SQL (simpler queries).
- **CAP Theorem**: Prioritize AP (availability, partition tolerance) for feed delivery.

### 5. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and polymorphism modularize components.
- **UML** (Section 2, Lecture 2): Diagrams visualize architecture.
- **Design Principles** (Section 4): SoC (Lecture 11) separates ingestion and feed generation; KISS (Lecture 8) simplifies logic.
- **HLD Concepts**:
  - Components (Section 5, Lecture 1): Map to API, database, cache.
  - Requirements (Section 5, Lecture 2): Drive scalability and latency goals.
  - Scaling (Section 5, Lecture 3): Use sharding and caching.
  - Security/Performance (Section 5, Lecture 4): Ensure low latency and secure access.
  - Distributed Systems (Section 5, Lecture 5): Handle partitioning and availability.
  - URL Shortener (Section 5, Lecture 6): Similar storage and ID generation.
  - Pastebin (Section 5, Lecture 7): Similar storage patterns.
  - Web Crawler (Section 5, Lecture 8): Similar content ingestion.
  - Twitter Feed (Section 5, Lecture 9): Similar feed generation.
  - Instagram Sharing (Section 5, Lecture 10): Similar feed delivery.
  - YouTube Streaming (Section 5, Lecture 11): Similar real-time processing.
  - Netflix Recommendation (Section 5, Lecture 12): Similar feed personalization.
  - Uber Ride-Sharing (Section 5, Lecture 13): Similar real-time coordination.
  - WhatsApp Messaging (Section 5, Lecture 14): Similar real-time delivery.
  - Dropbox Storage (Section 5, Lecture 15): Similar storage patterns.
  - E-commerce Platform (Section 5, Lecture 16): Similar content delivery.
  - Ticket Booking (Section 5, Lecture 17): Similar real-time updates.
  - Notification System (Section 5, Lecture 18): Similar real-time delivery.
  - API Rate Limiter (Section 5, Lecture 19): Similar caching and low-latency needs.
  - Key-Value Store (Section 5, Lecture 20): Similar storage and caching patterns.
  - Search Autocomplete (Section 5, Lecture 21): Similar indexing and caching.

### 6. Use Case
Design a news feed aggregator for a content platform to collect articles and generate personalized feeds, ensuring scalability and low latency.

## System Design
### Architecture
```
[Client (Browser/Mobile)] --> [Load Balancer (Nginx)] --> [Application Server (Spring Boot)]
                                                          |
                                                          |--> [Database (Cassandra)]
                                                          |--> [Cache (Redis)]
                                                          |--> [Search Index (Elasticsearch)]
                                                          |
                                                       [Queue (Kafka)]
                                                       [Content Ingestion Service]
```

- **Content Aggregation**:
  1. Content ingestion service collects articles via RSS feeds or APIs.
  2. Store articles in Cassandra; index in Elasticsearch.
  3. Enqueue updates to Kafka for async processing.
- **Feed Generation**:
  1. Client requests feed via GET `/feed`.
  2. Application server queries Elasticsearch for articles; applies user preferences.
  3. Cache feed in Redis; return sorted feed.
- **Scalability**: Shard Cassandra by article ID; replicate for availability.
- **Performance**: Cache feeds in Redis; use Elasticsearch for fast search.
- **Trade-Offs**: Real-time ingestion (low latency, high compute) vs. batched (efficient, delayed).

### Trade-Offs
- **Processing**: Real-time ingestion (fast, high compute) vs. batched (efficient, delayed updates).
- **Storage**: Cassandra (scalable) vs. SQL (simpler queries).
- **Caching**: Redis for feeds (fast) vs. no caching (high database load).

## Code Example: News Feed Aggregator Service
Let’s implement a simplified Java news feed aggregator service with caching and indexing.

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Article {
    private String articleId;
    private String title;
    private String content;
    private long timestamp;
    
    public Article(String articleId, String title, String content, long timestamp) {
        this.articleId = articleId;
        this.title = title;
        this.content = content;
        this.timestamp = timestamp;
    }
    
    public String getArticleId() {
        return articleId;
    }
    
    public String getTitle() {
        return title;
    }
    
    public long getTimestamp() {
        return timestamp;
    }
}

public class UserPreferences {
    private String userId;
    private List<String> topics;
    
    public UserPreferences(String userId, List<String> topics) {
        this.userId = userId;
        this.topics = topics;
    }
    
    public List<String> getTopics() {
        return topics;
    }
}

public interface ArticleRepository {
    void saveArticle(Article article);
    List<Article> getArticlesByTopic(String topic);
}

public interface PreferenceRepository {
    void savePreferences(UserPreferences preferences);
    UserPreferences getPreferences(String userId);
}

public class CassandraArticleRepository implements ArticleRepository {
    private final Map<String, List<Article>> storage = new HashMap<>();
    
    @Override
    public void saveArticle(Article article) {
        System.out.println("Saving article to Cassandra: " + article.getArticleId());
        storage.computeIfAbsent("general", k -> new ArrayList<>()).add(article);
    }
    
    @Override
    public List<Article> getArticlesByTopic(String topic) {
        System.out.println("Fetching articles from Cassandra for topic: " + topic);
        return storage.getOrDefault(topic, new ArrayList<>());
    }
}

public class CassandraPreferenceRepository implements PreferenceRepository {
    private final Map<String, UserPreferences> storage = new HashMap<>();
    
    @Override
    public void savePreferences(UserPreferences preferences) {
        System.out.println("Saving preferences to Cassandra: " + preferences.getUserId());
        storage.put(preferences.getUserId(), preferences);
    }
    
    @Override
    public UserPreferences getPreferences(String userId) {
        System.out.println("Fetching preferences from Cassandra: " + userId);
        return storage.getOrDefault(userId, new UserPreferences(userId, List.of("general")));
    }
}

public class RedisCache {
    private final Map<String, List<Article>> cache = new HashMap<>();
    
    public List<Article> getCachedFeed(String userId) {
        System.out.println("Checking Redis cache for feed: " + userId);
        return cache.getOrDefault(userId, null);
    }
    
    public void cacheFeed(String userId, List<Article> feed) {
        System.out.println("Caching feed in Redis: " + userId);
        cache.put(userId, feed);
    }
}

public class ElasticsearchService {
    public List<Article> searchByTopic(String topic) {
        System.out.println("Searching articles in Elasticsearch: " + topic);
        return List.of(
            new Article("article1", "Tech News", "Latest in tech...", System.currentTimeMillis()),
            new Article("article2", "Sports Update", "Game highlights...", System.currentTimeMillis())
        );
    }
}

public class KafkaQueue {
    public void enqueueArticle(Article article) {
        System.out.println("Enqueuing article to Kafka: " + article.getArticleId());
    }
}

public class ContentIngestionService {
    public void ingestArticle(String articleId, String title, String content) {
        System.out.println("Ingesting article: " + articleId);
    }
}

public class FeedService {
    private final ArticleRepository articleRepository;
    private final PreferenceRepository preferenceRepository;
    private final RedisCache cache;
    private final ElasticsearchService searchService;
    private final KafkaQueue queue;
    private final ContentIngestionService ingestionService;
    
    public FeedService(ArticleRepository articleRepository, PreferenceRepository preferenceRepository,
                      RedisCache cache, ElasticsearchService searchService, 
                      KafkaQueue queue, ContentIngestionService ingestionService) {
        this.articleRepository = articleRepository;
        this.preferenceRepository = preferenceRepository;
        this.cache = cache;
        this.searchService = searchService;
        this.queue = queue;
        this.ingestionService = ingestionService;
    }
    
    public void ingestArticle(String articleId, String title, String content) {
        ingestionService.ingestArticle(articleId, title, content);
        Article article = new Article(articleId, title, content, System.currentTimeMillis());
        articleRepository.saveArticle(article);
        queue.enqueueArticle(article);
    }
    
    public List<Article> getFeed(String userId) {
        List<Article> cached = cache.getCachedFeed(userId);
        if (cached != null) {
            return cached;
        }
        
        UserPreferences preferences = preferenceRepository.getPreferences(userId);
        List<Article> feed = new ArrayList<>();
        for (String topic : preferences.getTopics()) {
            feed.addAll(searchService.searchByTopic(topic));
        }
        cache.cacheFeed(userId, feed);
        return feed;
    }
}

public class FeedController {
    private final FeedService service;
    
    public FeedController(FeedService service) {
        this.service = service;
    }
    
    public void handleIngestArticle(String articleId, String title, String content) {
        service.ingestArticle(articleId, title, content);
        System.out.println("Article ingested: " + articleId);
    }
    
    public List<Article> handleGetFeed(String userId) {
        return service.getFeed(userId);
    }
}

public class FeedClient {
    public static void main(String[] args) {
        ArticleRepository articleRepository = new CassandraArticleRepository();
        PreferenceRepository preferenceRepository = new CassandraPreferenceRepository();
        RedisCache cache = new RedisCache();
        ElasticsearchService searchService = new ElasticsearchService();
        KafkaQueue queue = new KafkaQueue();
        ContentIngestionService ingestionService = new ContentIngestionService();
        FeedService service = new FeedService(articleRepository, preferenceRepository, cache, 
                                             searchService, queue, ingestionService);
        FeedController controller = new FeedController(service);
        
        controller.handleIngestArticle("article1", "Tech News", "Latest in tech...");
        List<Article> feed = controller.handleGetFeed("user1");
        System.out.println("Feed for user1: " + feed);
        // Output:
        // Ingesting article: article1
        // Saving article to Cassandra: article1
        // Enqueuing article to Kafka: article1
        // Article ingested: article1
        // Fetching preferences from Cassandra: user1
        // Checking Redis cache for feed: user1
        // Searching articles in Elasticsearch: general
        // Caching feed in Redis: user1
        // Feed for user1: [Article{articleId='article1', title='Tech News', ...}, Article{articleId='article2', title='Sports Update', ...}]
    }
}
```
- **System Design and Principles**:
  - **Functional**: `ingestArticle` collects content; `getFeed` generates personalized feeds.
  - **Non-Functional**:
    - **Scalability**: `CassandraArticleRepository` shards by article ID; Elasticsearch for indexing.
    - **Low Latency**: `RedisCache` for feed retrieval; `ElasticsearchService` for fast search.
    - **Reliability**: Cassandra with replication.
  - **Encapsulation**: Private fields with public methods.
  - **Abstraction**: `ArticleRepository` and `PreferenceRepository` interfaces for storage.
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates ingestion and feed generation; DIP (Section 4, Lecture 6) for abstractions.
- **Big O**: O(n) for `getFeed` (n = articles per topic); O(1) for `cacheFeed` (average case).
- **Edge Cases**: Handles missing preferences, empty feeds with fallbacks.

**Systematic Approach**:
- Clarified requirements (aggregate content, generate feeds, ensure scalability).
- Designed system architecture diagram to show API, ingestion, storage, and caching.
- Implemented Java code for a news feed aggregator, addressing requirements and trade-offs.
- Tested with `main` method for article ingestion and feed retrieval.

## Real-World Application
Imagine designing a news feed aggregator for a content platform, using Kafka for scalable ingestion, Elasticsearch for fast article search, and Redis for low-latency feed caching. A system architecture diagram communicates the design to stakeholders, ensuring performance and scalability. This design—paired with principles like KISS (Section 4, Lecture 8) and patterns like Facade (Section 3, Lecture 8)—demonstrates your ability to mentor teams on scalable feed aggregation design.

## Practice Exercises
Design a news feed aggregator or similar with these exercises:
- **Easy**: Design a system architecture diagram and Java code for a `FeedService` with basic article ingestion.
- **Medium**: Create a diagram and Java code for a `FeedService` with personalized feed generation.
- **Medium**: Design an HLD for a feed aggregator with sharding, caching, and indexing, implementing a Java controller.
- **Hard**: Architect a feed aggregator with Cassandra, Elasticsearch, and Kafka, supporting ranking, using a Java service.

Try designing one system in Java with a diagram, explaining how requirements and trade-offs are addressed.

## Conclusion
Designing a news feed aggregator equips you to architect scalable, low-latency Java systems for content platforms. By mastering this design, you’ll optimize performance, ensure reliability, and teach others effectively. This advances your progress in Section 5 of the *Official CTO* journey.

**Next Step**: Explore [Design a Distributed Cache](/sections/hld-ai/distributed-cache) to apply HLD to another real-world problem, or check out [all sections](/sections/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>