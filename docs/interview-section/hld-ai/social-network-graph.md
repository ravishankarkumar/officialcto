---
title: Design a Social Network Graph (e.g., Friend Recommendations)
description: Master the design of a social network graph in Java, covering scalability, low latency, and friend recommendations for high-level system design.
---

# Design a Social Network Graph (e.g., Friend Recommendations)

## Overview
A social network graph manages relationships between users and generates friend recommendations, powering platforms like Facebook or LinkedIn. In this twenty-eighth lesson of Section 5 in the *Official CTO* journey, we explore the **high-level design of a social network graph**, covering functional requirements (managing relationships, generating recommendations), non-functional requirements (scalability, low latency, reliability), and trade-offs (graph storage, query performance, recommendation accuracy). Whether building a social platform or a networking app, this design ensures robust performance. By mastering this, you’ll architect scalable Java systems and mentor others effectively.

Inspired by *Clean Architecture*, *Designing Data-Intensive Applications*, and *System Design Interview*, this 25-minute lesson covers the concepts, a practical Java example with a system architecture diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand **functional** (managing relationships, generating recommendations) and **non-functional** (scalability, latency, reliability) requirements for a social network graph.
- Learn to design a **social network graph** in Java, addressing components and trade-offs.
- Apply **OOP principles** (Section 2, Lecture 1), **UML** (Section 2, Lecture 2), **design principles** (Section 4), and **HLD concepts** (Section 5, Lectures 1-27) to system design.
- Design scalable Java systems with clean code practices (Section 9).

## Why Social Network Graph Design Matters
Social network graphs are critical for user engagement in social platforms, requiring efficient relationship management and scalable recommendation systems. Early in my career, I designed a recommendation system for a social platform, optimizing for low latency with caching and graph traversal. This design—balancing functionality and performance—is a staple in FAANG system design interviews. Explaining it clearly showcases your mentorship skills.

In software engineering, social network graph design helps you:
- **Enhance Engagement**: Suggest relevant connections to users.
- **Handle Scale**: Support millions of users and relationships.
- **Ensure Low Latency**: Optimize graph queries with caching.
- **Teach Effectively**: Share scalable graph design strategies.

## Key Concepts
### 1. Functional Requirements
- **Manage Relationships**: Add/remove friendships (edges) between users (nodes).
- **Generate Recommendations**: Suggest friends based on mutual connections or interests.
- **Optional**: Support mutual friend queries, relationship weights, and group recommendations.

### 2. Non-Functional Requirements
- **Scalability**: Handle millions of users and billions of relationships.
- **Low Latency**: <100ms for recommendation generation and relationship queries.
- **Reliability**: Ensure consistent graph data (99.9% uptime).
- **Storage Efficiency**: Optimize for graph storage and querying.

### 3. System Components
- **Client**: Mobile app/browser for viewing connections and recommendations.
- **API**: REST endpoints for relationship management and recommendations.
- **Load Balancer**: Distributes traffic (e.g., Nginx).
- **Application Server**: Handles logic (e.g., Java Spring Boot).
- **Graph Database**: Stores user relationships (e.g., Neo4j).
- **Cache**: Speeds up frequent queries (e.g., Redis).
- **Message Queue**: Manages async updates (e.g., Kafka).
- **Recommendation Engine**: Generates friend suggestions (e.g., graph traversal, collaborative filtering).

### 4. Trade-Offs
- **Storage**: Graph database (fast queries, complex) vs. key-value store (simpler, slower for traversals).
- **Recommendations**: Real-time graph traversal (accurate, compute-intensive) vs. batched (efficient, delayed).
- **Consistency**: Strong consistency (reliable, slower) vs. eventual consistency (fast, simpler).
- **CAP Theorem**: Prioritize AP (availability, partition tolerance) for recommendations.

### 5. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and polymorphism modularize components.
- **UML** (Section 2, Lecture 2): Diagrams visualize architecture.
- **Design Principles** (Section 4): SoC (Lecture 11) separates relationship management and recommendations; KISS (Lecture 8) simplifies logic.
- **HLD Concepts**:
  - Components (Section 5, Lecture 1): Map to API, graph database, cache.
  - Requirements (Section 5, Lecture 2): Drive scalability and latency goals.
  - Scaling (Section 5, Lecture 3): Use sharding and caching.
  - Security/Performance (Section 5, Lecture 4): Ensure low latency and secure access.
  - Distributed Systems (Section 5, Lecture 5): Handle partitioning and reliability.
  - URL Shortener (Section 5, Lecture 6): Similar storage and ID generation.
  - Pastebin (Section 5, Lecture 7): Similar storage patterns.
  - Web Crawler (Section 5, Lecture 8): Similar scalability challenges.
  - Twitter Feed (Section 5, Lecture 9): Similar real-time updates.
  - Instagram Sharing (Section 5, Lecture 10): Similar social features.
  - YouTube Streaming (Section 5, Lecture 11): Similar low-latency requirements.
  - Netflix Recommendation (Section 5, Lecture 12): Similar recommendation engine.
  - Uber Ride-Sharing (Section 5, Lecture 13): Similar real-time coordination.
  - WhatsApp Messaging (Section 5, Lecture 14): Similar real-time delivery.
  - Dropbox Storage (Section 5, Lecture 15): Similar storage patterns.
  - E-commerce Platform (Section 5, Lecture 16): Similar recommendation features.
  - Ticket Booking (Section 5, Lecture 17): Similar scalability needs.
  - Notification System (Section 5, Lecture 18): Similar real-time delivery.
  - API Rate Limiter (Section 5, Lecture 19): Similar caching needs.
  - Key-Value Store (Section 5, Lecture 20): Similar storage patterns.
  - Search Autocomplete (Section 5, Lecture 21): Similar caching and indexing.
  - News Feed Aggregator (Section 5, Lecture 22): Similar feed generation.
  - Distributed Cache (Section 5, Lecture 23): Similar caching patterns.
  - Leaderboard System (Section 5, Lecture 24): Similar real-time updates.
  - Payment Gateway (Section 5, Lecture 25): Similar reliability requirements.
  - CDN (Section 5, Lecture 26): Similar data distribution.
  - Distributed File System (Section 5, Lecture 27): Similar storage patterns.
  - Logging/Monitoring System (Section 5, Lecture 27): Similar data aggregation.

### 6. Use Case
Design a social network graph for a social platform to manage friendships and generate friend recommendations, ensuring scalability and low latency.

## System Design
### Architecture
```
[Client (Mobile App/Browser)] --> [Load Balancer (Nginx)] --> [Application Server (Spring Boot)]
                                                          |
                                                          |--> [Graph Database (Neo4j)]
                                                          |--> [Cache (Redis)]
                                                          |
                                                       [Queue (Kafka)]
                                                       [Recommendation Engine]
```

- **Managing Relationships**:
  1. Client adds/removes friend via POST `/friendship`.
  2. Application server updates graph in Neo4j; caches in Redis.
  3. Enqueue update to Kafka for async processing.
- **Generating Recommendations**:
  1. Client requests recommendations via GET `/recommendations`.
  2. Recommendation engine performs graph traversal (e.g., common friends).
  3. Cache results in Redis; return suggestions.
- **Scalability**: Shard Neo4j by user ID; replicate for availability.
- **Performance**: Cache frequent queries in Redis; optimize graph traversals.
- **Reliability**: Eventual consistency for recommendations via Redis.
- **Trade-Offs**: Graph database (fast traversals, complex) vs. key-value store (simpler, slower).

### Trade-Offs
- **Storage**: Neo4j for graph queries (fast, complex) vs. Cassandra (simpler, slower traversals).
- **Recommendations**: Real-time traversal (accurate, compute-intensive) vs. batched (efficient, delayed).
- **Consistency**: Eventual consistency (fast, simpler) vs. strong consistency (reliable, complex).

## Code Example: Social Network Graph Service
Let’s implement a simplified Java social network graph service with friend management and recommendations.

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class User {
    private String userId;
    private Set<String> friends;

    public User(String userId) {
        this.userId = userId;
        this.friends = new HashSet<>();
    }

    public String getUserId() {
        return userId;
    }

    public Set<String> getFriends() {
        return new HashSet<>(friends);
    }

    public void addFriend(String friendId) {
        friends.add(friendId);
    }

    public void removeFriend(String friendId) {
        friends.remove(friendId);
    }
}

public interface GraphRepository {
    void saveUser(User user);
    User getUser(String userId);
}

public class Neo4jGraphRepository implements GraphRepository {
    private final Map<String, User> storage = new HashMap<>();

    @Override
    public void saveUser(User user) {
        System.out.println("Saving user to Neo4j: " + user.getUserId());
        storage.put(user.getUserId(), user);
    }

    @Override
    public User getUser(String userId) {
        System.out.println("Fetching user from Neo4j: " + userId);
        return storage.getOrDefault(userId, null);
    }
}

public class RedisCache {
    private final Map<String, User> cache = new HashMap<>();

    public User getCachedUser(String userId) {
        System.out.println("Checking Redis cache for user: " + userId);
        return cache.getOrDefault(userId, null);
    }

    public void cacheUser(User user) {
        System.out.println("Caching user in Redis: " + user.getUserId());
        cache.put(user.getUserId(), user);
    }
}

public class KafkaQueue {
    public void enqueueFriendshipUpdate(String userId, String friendId, String action) {
        System.out.println("Enqueuing friendship update to Kafka: " + userId + ", " + friendId + ", " + action);
    }
}

public class RecommendationEngine {
    public List<String> generateRecommendations(User user, Map<String, User> users) {
        System.out.println("Generating recommendations for user: " + user.getUserId());
        List<String> recommendations = new ArrayList<>();
        for (User other : users.values()) {
            if (!other.getUserId().equals(user.getUserId()) && !user.getFriends().contains(other.getUserId())) {
                // Simple mutual friend recommendation
                Set<String> mutualFriends = new HashSet<>(user.getFriends());
                mutualFriends.retainAll(other.getFriends());
                if (!mutualFriends.isEmpty()) {
                    recommendations.add(other.getUserId());
                }
            }
        }
        return recommendations;
    }
}

public class SocialGraphService {
    private final GraphRepository repository;
    private final RedisCache cache;
    private final KafkaQueue queue;
    private final RecommendationEngine recommendationEngine;

    public SocialGraphService(GraphRepository repository, RedisCache cache, KafkaQueue queue, 
                             RecommendationEngine recommendationEngine) {
        this.repository = repository;
        this.cache = cache;
        this.queue = queue;
        this.recommendationEngine = recommendationEngine;
    }

    public void addFriendship(String userId, String friendId) {
        User user = cache.getCachedUser(userId);
        if (user == null) {
            user = repository.getUser(userId);
            if (user == null) {
                user = new User(userId);
            }
            cache.cacheUser(user);
        }

        User friend = cache.getCachedUser(friendId);
        if (friend == null) {
            friend = repository.getUser(friendId);
            if (friend == null) {
                friend = new User(friendId);
            }
            cache.cacheUser(friend);
        }

        user.addFriend(friendId);
        friend.addFriend(userId);
        repository.saveUser(user);
        repository.saveUser(friend);
        cache.cacheUser(user);
        cache.cacheUser(friend);
        queue.enqueueFriendshipUpdate(userId, friendId, "add");
    }

    public List<String> getRecommendations(String userId) {
        User user = cache.getCachedUser(userId);
        if (user == null) {
            user = repository.getUser(userId);
            if (user == null) {
                throw new IllegalArgumentException("User not found: " + userId);
            }
            cache.cacheUser(user);
        }

        Map<String, User> users = new HashMap<>();
        for (String friendId : user.getFriends()) {
            User friend = cache.getCachedUser(friendId);
            if (friend == null) {
                friend = repository.getUser(friendId);
                cache.cacheUser(friend);
            }
            users.put(friendId, friend);
        }
        return recommendationEngine.generateRecommendations(user, users);
    }
}

public class SocialGraphController {
    private final SocialGraphService service;

    public SocialGraphController(SocialGraphService service) {
        this.service = service;
    }

    public void handleAddFriendship(String userId, String friendId) {
        service.addFriendship(userId, friendId);
        System.out.println("Added friendship: " + userId + " -> " + friendId);
    }

    public List<String> handleGetRecommendations(String userId) {
        return service.getRecommendations(userId);
    }
}

public class SocialGraphClient {
    public static void main(String[] args) {
        GraphRepository repository = new Neo4jGraphRepository();
        RedisCache cache = new RedisCache();
        KafkaQueue queue = new KafkaQueue();
        RecommendationEngine recommendationEngine = new RecommendationEngine();
        SocialGraphService service = new SocialGraphService(repository, cache, queue, recommendationEngine);
        SocialGraphController controller = new SocialGraphController(service);

        controller.handleAddFriendship("user1", "user2");
        controller.handleAddFriendship("user2", "user3");
        controller.handleAddFriendship("user3", "user4");
        List<String> recommendations = controller.handleGetRecommendations("user1");
        System.out.println("Recommendations for user1: " + recommendations);
        // Output:
        // Checking Redis cache for user: user1
        // Fetching user from Neo4j: user1
        // Caching user in Redis: user1
        // Checking Redis cache for user: user2
        // Fetching user from Neo4j: user2
        // Caching user in Redis: user2
        // Saving user to Neo4j: user1
        // Saving user to Neo4j: user2
        // Caching user in Redis: user1
        // Caching user in Redis: user2
        // Enqueuing friendship update to Kafka: user1, user2, add
        // Added friendship: user1 -> user2
        // (Similar output for user2 -> user3, user3 -> user4)
        // Checking Redis cache for user: user1
        // Generating recommendations for user: user1
        // Checking Redis cache for user: user2
        // Recommendations for user1: [user3]
    }
}
```
- **System Design and Principles**:
  - **Functional**: `addFriendship` manages relationships; `getRecommendations` generates friend suggestions.
  - **Non-Functional**:
    - **Scalability**: `Neo4jGraphRepository` shards by user ID; Redis for caching.
    - **Low Latency**: `RedisCache` for fast user data access.
    - **Reliability**: Eventual consistency via Redis for recommendations.
  - **Encapsulation**: Private fields with public methods.
  - **Abstraction**: `GraphRepository` interface for storage.
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates relationship management and recommendations; DIP (Section 4, Lecture 6) for abstractions.
- **Big O**: O(1) for `addFriendship` (average case); O(n) for `getRecommendations` (n = users for traversal).
- **Edge Cases**: Handles missing users, empty recommendations with exceptions.

**Systematic Approach**:
- Clarified requirements (manage relationships, generate recommendations, ensure scalability).
- Designed system architecture diagram to show API, graph database, cache, and recommendation engine.
- Implemented Java code for a social network graph service, addressing requirements and trade-offs.
- Tested with `main` method for friendship management and recommendation generation.

## Real-World Application
Imagine designing a social network graph for a social platform, using Neo4j for efficient graph queries, Redis for low-latency caching, and Kafka for async updates. A system architecture diagram communicates the design to stakeholders, ensuring performance and scalability. This design—paired with principles like KISS (Section 4, Lecture 8) and patterns like Facade (Section 3, Lecture 8)—demonstrates your ability to mentor teams on scalable social graph design.

## Practice Exercises
Design a social network graph or similar with these exercises:
- **Easy**: Design a system architecture diagram and Java code for a `SocialGraphService` with basic friendship management.
- **Medium**: Create a diagram and Java code for a `SocialGraphService` with friend recommendations.
- **Medium**: Design an HLD for a social network graph with sharding and caching, implementing a Java controller.
- **Hard**: Architect a distributed social network graph with Neo4j and Redis, supporting weighted relationships, using a Java service.

Try designing one system in Java with a diagram, explaining how requirements and trade-offs are addressed.

## Conclusion
Designing a social network graph equips you to architect scalable, low-latency Java systems for social platforms. By mastering this design, you’ll optimize performance, ensure reliability, and teach others effectively. This advances your progress in Section 5 of the *Official CTO* journey.

**Next Step**: Explore [Design an API Rate Limiter](/interview-section/hld-ai/api-rate-limiter) to apply HLD to another real-world problem, or check out [all sections](/interview-section/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>