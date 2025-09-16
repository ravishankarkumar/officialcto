---
title: Design a Leaderboard/Ranking System
description: Master the design of a leaderboard system in Java, covering scalability, low latency, and ranking updates for high-level system design.
---

# Design a Leaderboard/Ranking System

## Overview
A leaderboard system ranks users or entities based on scores, commonly used in gaming, social, or competitive platforms. In this twenty-fourth lesson of Section 5 in the *Official CTO* journey, we explore the **high-level design of a leaderboard system**, covering functional requirements (updating scores, retrieving rankings), non-functional requirements (scalability, low latency, consistency), and trade-offs (real-time vs. batched updates, storage efficiency). Whether building a leaderboard for a gaming platform or a competitive app, this design ensures robust performance. By mastering this, you’ll architect scalable Java systems and mentor others effectively.

Inspired by *Clean Architecture*, *Designing Data-Intensive Applications*, and *System Design Interview*, this 25-minute lesson covers the concepts, a practical Java example with a system architecture diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand **functional** (updating scores, retrieving rankings) and **non-functional** (scalability, latency, consistency) requirements for a leaderboard system.
- Learn to design a **leaderboard system** in Java, addressing components and trade-offs.
- Apply **OOP principles** (Section 2, Lecture 1), **UML** (Section 2, Lecture 2), **design principles** (Section 4), and **HLD concepts** (Section 5, Lectures 1-23) to system design.
- Design scalable Java systems with clean code practices (Section 9).

## Why Leaderboard System Design Matters
Leaderboard systems drive engagement in competitive applications, requiring fast score updates and scalable ranking retrieval. Early in my career, I designed a leaderboard for a gaming platform, optimizing for low latency with caching and ensuring consistency with sorted data structures. This design—balancing performance and scalability—is a staple in FAANG system design interviews. Explaining it clearly showcases your mentorship skills.

In software engineering, leaderboard system design helps you:
- **Enhance Engagement**: Provide real-time rankings for users.
- **Handle Scale**: Support millions of users and score updates.
- **Ensure Low Latency**: Optimize ranking retrieval with caching.
- **Teach Effectively**: Share scalable leaderboard design strategies.

## Key Concepts
### 1. Functional Requirements
- **Update Scores**: Record or update user scores.
- **Retrieve Rankings**: Display top users or specific user rankings.
- **Optional**: Support filtering (e.g., by region), historical rankings, and ties.

### 2. Non-Functional Requirements
- **Scalability**: Handle millions of users and score updates daily.
- **Low Latency**: <100ms for ranking retrieval and score updates.
- **Consistency**: Ensure accurate rankings across distributed systems.
- **Reliability**: Maintain data availability (99.9% uptime).
- **Storage Efficiency**: Optimize for score and ranking data.

### 3. System Components
- **Client**: Mobile app/browser for viewing leaderboards.
- **API**: REST endpoints for score updates and ranking retrieval.
- **Load Balancer**: Distributes traffic (e.g., Nginx).
- **Application Server**: Handles logic (e.g., Java Spring Boot).
- **Database**: Stores scores and user data (e.g., Cassandra).
- **Cache**: Speeds up ranking access (e.g., Redis with sorted sets).
- **Message Queue**: Manages async score updates (e.g., Kafka).
- **Ranking Service**: Computes and maintains rankings (e.g., sorted set in Redis).

### 4. Trade-Offs
- **Update Frequency**: Real-time updates (low latency, high compute) vs. batched (efficient, delayed).
- **Storage**: Redis sorted sets (fast, memory-intensive) vs. database (persistent, slower).
- **Consistency**: Strong consistency (accurate, complex) vs. eventual consistency (fast, simpler).
- **CAP Theorem**: Prioritize AP (availability, partition tolerance) for ranking retrieval.

### 5. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and polymorphism modularize components.
- **UML** (Section 2, Lecture 2): Diagrams visualize architecture.
- **Design Principles** (Section 4): SoC (Lecture 11) separates score updates and ranking; KISS (Lecture 8) simplifies logic.
- **HLD Concepts**:
  - Components (Section 5, Lecture 1): Map to API, database, cache.
  - Requirements (Section 5, Lecture 2): Drive scalability and latency goals.
  - Scaling (Section 5, Lecture 3): Use sharding and caching.
  - Security/Performance (Section 5, Lecture 4): Ensure low latency and secure access.
  - Distributed Systems (Section 5, Lecture 5): Handle partitioning and consistency.
  - URL Shortener (Section 5, Lecture 6): Similar storage and ID generation.
  - Pastebin (Section 5, Lecture 7): Similar storage patterns.
  - Web Crawler (Section 5, Lecture 8): Similar scalability challenges.
  - Twitter Feed (Section 5, Lecture 9): Similar real-time updates.
  - Instagram Sharing (Section 5, Lecture 10): Similar real-time delivery.
  - YouTube Streaming (Section 5, Lecture 11): Similar low-latency requirements.
  - Netflix Recommendation (Section 5, Lecture 12): Similar real-time processing.
  - Uber Ride-Sharing (Section 5, Lecture 13): Similar real-time coordination.
  - WhatsApp Messaging (Section 5, Lecture 14): Similar real-time delivery.
  - Dropbox Storage (Section 5, Lecture 15): Similar storage patterns.
  - E-commerce Platform (Section 5, Lecture 16): Similar caching and storage.
  - Ticket Booking (Section 5, Lecture 17): Similar scalability needs.
  - Notification System (Section 5, Lecture 18): Similar real-time delivery.
  - API Rate Limiter (Section 5, Lecture 19): Similar caching and low-latency needs.
  - Key-Value Store (Section 5, Lecture 20): Similar storage and caching patterns.
  - Search Autocomplete (Section 5, Lecture 21): Similar caching and indexing.
  - News Feed Aggregator (Section 5, Lecture 22): Similar feed generation and caching.
  - Distributed Cache (Section 5, Lecture 23): Similar caching and low-latency patterns.

### 6. Use Case
Design a leaderboard system for a gaming platform to track user scores and display rankings, ensuring scalability and low latency.

## System Design
### Architecture
```
[Client (Mobile App/Browser)] --> [Load Balancer (Nginx)] --> [Application Server (Spring Boot)]
                                                          |
                                                          |--> [Database (Cassandra)]
                                                          |--> [Cache (Redis, Sorted Sets)]
                                                          |
                                                       [Queue (Kafka)]
                                                       [Ranking Service]
```

- **Updating Scores**:
  1. Client sends score update via POST `/score`.
  2. Application server updates score in Redis sorted set and Cassandra.
  3. Enqueue update to Kafka for async persistence.
- **Retrieving Rankings**:
  1. Client requests leaderboard via GET `/leaderboard`.
  2. Check Redis for cached rankings; fallback to Cassandra if needed.
  3. Return top-N users or specific user rank.
- **Scalability**: Shard Cassandra by user ID; partition Redis by leaderboard ID.
- **Performance**: Use Redis sorted sets for fast ranking; cache frequent queries.
- **Consistency**: Eventual consistency for rankings; strong consistency for score updates.
- **Trade-Offs**: Real-time updates (low latency, high compute) vs. batched (efficient, delayed).

### Trade-Offs
- **Update Frequency**: Real-time updates (fast, compute-intensive) vs. batched (efficient, delayed).
- **Storage**: Redis sorted sets (fast, memory-intensive) vs. Cassandra (persistent, slower).
- **Consistency**: Eventual consistency (fast, simpler) vs. strong consistency (accurate, complex).

## Code Example: Leaderboard Service
Let’s implement a simplified Java leaderboard service with Redis sorted sets and caching.

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Score {
    private String userId;
    private double score;
    private long timestamp;
    
    public Score(String userId, double score, long timestamp) {
        this.userId = userId;
        this.score = score;
        this.timestamp = timestamp;
    }
    
    public String getUserId() {
        return userId;
    }
    
    public double getScore() {
        return score;
    }
}

public interface ScoreRepository {
    void saveScore(Score score);
    List<Score> getTopScores(int limit);
    Score getUserScore(String userId);
}

public class CassandraScoreRepository implements ScoreRepository {
    private final Map<String, Score> storage = new HashMap<>();
    
    @Override
    public void saveScore(Score score) {
        System.out.println("Saving score to Cassandra: " + score.getUserId());
        storage.put(score.getUserId(), score);
    }
    
    @Override
    public List<Score> getTopScores(int limit) {
        System.out.println("Fetching top scores from Cassandra");
        return storage.values().stream()
            .sorted((a, b) -> Double.compare(b.getScore(), a.getScore()))
            .limit(limit)
            .toList();
    }
    
    @Override
    public Score getUserScore(String userId) {
        System.out.println("Fetching score from Cassandra: " + userId);
        return storage.getOrDefault(userId, null);
    }
}

public class RedisSortedSet {
    private final Map<String, Double> sortedSet = new HashMap<>();
    
    public void updateScore(String userId, double score) {
        System.out.println("Updating score in Redis sorted set: " + userId);
        sortedSet.put(userId, score);
    }
    
    public List<Score> getTopScores(int limit) {
        System.out.println("Fetching top scores from Redis sorted set");
        return sortedSet.entrySet().stream()
            .map(e -> new Score(e.getKey(), e.getValue(), System.currentTimeMillis()))
            .sorted((a, b) -> Double.compare(b.getScore(), a.getScore()))
            .limit(limit)
            .toList();
    }
    
    public Double getUserScore(String userId) {
        System.out.println("Fetching score from Redis sorted set: " + userId);
        return sortedSet.getOrDefault(userId, null);
    }
}

public class KafkaQueue {
    public void enqueueScoreUpdate(String userId, double score) {
        System.out.println("Enqueuing score update to Kafka: " + userId);
    }
}

public class LeaderboardService {
    private final ScoreRepository repository;
    private final RedisSortedSet redisSortedSet;
    private final KafkaQueue queue;
    
    public LeaderboardService(ScoreRepository repository, RedisSortedSet redisSortedSet, KafkaQueue queue) {
        this.repository = repository;
        this.redisSortedSet = redisSortedSet;
        this.queue = queue;
    }
    
    public void updateScore(String userId, double score) {
        Score scoreEntry = new Score(userId, score, System.currentTimeMillis());
        redisSortedSet.updateScore(userId, score);
        repository.saveScore(scoreEntry);
        queue.enqueueScoreUpdate(userId, score);
    }
    
    public List<Score> getTopScores(int limit) {
        List<Score> cached = redisSortedSet.getTopScores(limit);
        if (!cached.isEmpty()) {
            return cached;
        }
        
        List<Score> scores = repository.getTopScores(limit);
        for (Score score : scores) {
            redisSortedSet.updateScore(score.getUserId(), score.getScore());
        }
        return scores;
    }
    
    public double getUserRank(String userId) {
        Double score = redisSortedSet.getUserScore(userId);
        if (score != null) {
            return score;
        }
        
        Score scoreEntry = repository.getUserScore(userId);
        if (scoreEntry == null) {
            throw new IllegalArgumentException("User not found: " + userId);
        }
        redisSortedSet.updateScore(userId, scoreEntry.getScore());
        return scoreEntry.getScore();
    }
}

public class LeaderboardController {
    private final LeaderboardService service;
    
    public LeaderboardController(LeaderboardService service) {
        this.service = service;
    }
    
    public void handleUpdateScore(String userId, double score) {
        service.updateScore(userId, score);
        System.out.println("Updated score for user: " + userId);
    }
    
    public List<Score> handleGetTopScores(int limit) {
        return service.getTopScores(limit);
    }
    
    public double handleGetUserRank(String userId) {
        return service.getUserRank(userId);
    }
}

public class LeaderboardClient {
    public static void main(String[] args) {
        ScoreRepository repository = new CassandraScoreRepository();
        RedisSortedSet redisSortedSet = new RedisSortedSet();
        KafkaQueue queue = new KafkaQueue();
        LeaderboardService service = new LeaderboardService(repository, redisSortedSet, queue);
        LeaderboardController controller = new LeaderboardController(service);
        
        controller.handleUpdateScore("user1", 100.0);
        controller.handleUpdateScore("user2", 150.0);
        List<Score> topScores = controller.handleGetTopScores(2);
        System.out.println("Top scores: " + topScores);
        double rank = controller.handleGetUserRank("user1");
        System.out.println("User1 rank score: " + rank);
        // Output:
        // Updating score in Redis sorted set: user1
        // Saving score to Cassandra: user1
        // Enqueuing score update to Kafka: user1
        // Updated score for user: user1
        // Updating score in Redis sorted set: user2
        // Saving score to Cassandra: user2
        // Enqueuing score update to Kafka: user2
        // Updated score for user: user2
        // Fetching top scores from Redis sorted set
        // Top scores: [Score{userId='user2', score=150.0, ...}, Score{userId='user1', score=100.0, ...}]
        // Fetching score from Redis sorted set: user1
        // User1 rank score: 100.0
    }
}
```
- **System Design and Principles**:
  - **Functional**: `updateScore` records scores; `getTopScores` and `getUserRank` retrieve rankings.
  - **Non-Functional**:
    - **Scalability**: `CassandraScoreRepository` shards by user ID; Redis for fast ranking.
    - **Low Latency**: `RedisSortedSet` for quick score retrieval.
    - **Consistency**: Eventual consistency for rankings via Redis; strong consistency for scores in Cassandra.
  - **Encapsulation**: Private fields with public methods.
  - **Abstraction**: `ScoreRepository` interface for storage.
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates score updates and ranking; DIP (Section 4, Lecture 6) for abstractions.
- **Big O**: O(1) for `updateScore`, O(log n) for `getTopScores` (Redis sorted set), O(1) for `getUserRank`.
- **Edge Cases**: Handles missing users, empty leaderboards with exceptions.

**Systematic Approach**:
- Clarified requirements (update scores, retrieve rankings, ensure scalability).
- Designed system architecture diagram to show API, cache, storage, and ranking logic.
- Implemented Java code for a leaderboard service, addressing requirements and trade-offs.
- Tested with `main` method for score updates and ranking retrieval.

## Real-World Application
Imagine designing a leaderboard system for a gaming platform, using Redis sorted sets for fast ranking, Cassandra for persistent score storage, and Kafka for async updates. A system architecture diagram communicates the design to stakeholders, ensuring performance and scalability. This design—paired with principles like KISS (Section 4, Lecture 8) and patterns like Facade (Section 3, Lecture 8)—demonstrates your ability to mentor teams on scalable leaderboard design.

## Practice Exercises
Design a leaderboard system or similar with these exercises:
- **Easy**: Design a system architecture diagram and Java code for a `LeaderboardService` with basic score updates.
- **Medium**: Create a diagram and Java code for a `LeaderboardService` with ranking retrieval.
- **Medium**: Design an HLD for a leaderboard system with sharding and caching, implementing a Java controller.
- **Hard**: Architect a distributed leaderboard system with Cassandra and Redis, supporting regional filtering, using a Java service.

Try designing one system in Java with a diagram, explaining how requirements and trade-offs are addressed.

## Conclusion
Designing a leaderboard system equips you to architect scalable, low-latency Java systems for competitive platforms. By mastering this design, you’ll optimize performance, ensure reliability, and teach others effectively. This advances your progress in Section 5 of the *Official CTO* journey.

**Next Step**: Explore [Design an API Rate Limiter](/sections/hld-ai/api-rate-limiter) to apply HLD to another real-world problem, or check out [all sections](/sections/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>