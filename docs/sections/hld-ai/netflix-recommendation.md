---
title: Design Netflix/Recommendation System
description: Master the design of a Netflix-like recommendation system in Java, covering scalability, low latency, and personalization for high-level system design.
---

# Design a Netflix/Recommendation System

## Overview
A recommendation system, like Netflix’s, delivers personalized content suggestions to users while supporting video streaming, enhancing user engagement and retention. In this twelfth lesson of Section 5 in the *Official CTO* journey, we explore the **high-level design of a recommendation system**, covering functional requirements (generating recommendations, streaming content), non-functional requirements (scalability, low latency, availability), and trade-offs (personalization vs. compute cost, storage). Whether building a media platform or a content-sharing app, this design ensures robust performance. By mastering this, you’ll architect scalable Java systems and mentor others effectively.

Inspired by *Clean Architecture*, *Designing Data-Intensive Applications*, and *System Design Interview*, this 25-minute lesson covers the concepts, a practical Java example with a system architecture diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand **functional** (recommendations, streaming) and **non-functional** (scalability, latency, availability) requirements for a recommendation system.
- Learn to design a **Netflix-like system** in Java, addressing components and trade-offs.
- Apply **OOP principles** (Section 2, Lecture 1), **UML** (Section 2, Lecture 2), **design principles** (Section 4), and **HLD concepts** (Section 5, Lectures 1-11) to system design.
- Design scalable Java systems with clean code practices (Section 9).

## Why Recommendation System Design Matters
Recommendation systems drive user engagement by suggesting relevant content, requiring efficient personalization and scalable streaming. Early in my career, I designed a recommendation system for a media platform, optimizing for low latency with caching and balancing personalization with compute costs. This design—integrating machine learning and streaming—is a staple in FAANG system design interviews. Explaining it clearly showcases your mentorship skills.

In software engineering, recommendation system design helps you:
- **Enhance Engagement**: Deliver personalized content to users.
- **Handle Scale**: Support millions of users with distributed systems.
- **Ensure Low Latency**: Optimize recommendation and streaming delivery.
- **Teach Effectively**: Share scalable recommendation design strategies.

## Key Concepts
### 1. Functional Requirements
- **Generate Recommendations**: Suggest videos based on user history and preferences.
- **Stream Content**: Deliver videos for playback across devices.
- **Optional**: Support watch history, ratings, and playlists.

### 2. Non-Functional Requirements
- **Scalability**: Handle billions of videos and millions of concurrent users.
- **Low Latency**: <200ms for recommendation generation; <1s for streaming startup.
- **Availability**: 99.9% uptime with fault tolerance.
- **Storage Efficiency**: Optimize for video and metadata storage.

### 3. System Components
- **Client**: Browser/mobile app for viewing recommendations and streaming.
- **API**: REST endpoints for recommendations and playback.
- **Load Balancer**: Distributes traffic (e.g., Nginx).
- **Application Server**: Handles logic (e.g., Java Spring Boot).
- **Object Storage**: Stores videos (e.g., S3).
- **Database**: Stores metadata and user data (e.g., Cassandra).
- **Cache**: Speeds up recommendations (e.g., Redis).
- **CDN**: Delivers videos globally (e.g., CloudFront).
- **Recommendation Engine**: Generates suggestions (e.g., collaborative filtering).
- **Message Queue**: Manages updates (e.g., Kafka).

### 4. Trade-Offs
- **Recommendation Accuracy**: Complex models (high compute) vs. simple heuristics (fast but less accurate).
- **Storage**: S3 for videos (scalable) vs. database for metadata (fast queries).
- **CAP Theorem**: Prioritize AP (availability, partition tolerance) for recommendations and streaming.

### 5. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and polymorphism modularize components.
- **UML** (Section 2, Lecture 2): Diagrams visualize architecture.
- **Design Principles** (Section 4): SoC (Lecture 11) separates recommendation and streaming; KISS (Lecture 8) simplifies logic.
- **HLD Concepts**:
  - Components (Section 5, Lecture 1): Map to API, storage, CDN.
  - Requirements (Section 5, Lecture 2): Drive scalability and latency goals.
  - Scaling (Section 5, Lecture 3): Use sharding and caching.
  - Security/Performance (Section 5, Lecture 4): Ensure low latency with CDN.
  - Distributed Systems (Section 5, Lecture 5): Handle partitioning and availability.
  - URL Shortener (Section 5, Lecture 6): Similar storage and ID generation.
  - Pastebin (Section 5, Lecture 7): Similar storage and retrieval patterns.
  - Web Crawler (Section 5, Lecture 8): Similar scalability challenges.
  - Twitter Feed (Section 5, Lecture 9): Similar feed generation patterns.
  - Instagram Sharing (Section 5, Lecture 10): Similar storage and feed delivery.
  - YouTube Streaming (Section 5, Lecture 11): Similar streaming architecture.

### 6. Use Case
Design a recommendation system for a media platform to suggest videos and stream content, ensuring scalability and low latency.

## System Design
### Architecture
```
[Client (Browser/Mobile)] --> [Load Balancer (Nginx)] --> [Application Server (Spring Boot)]
                                                          |
                                                          |--> [Object Storage (S3)]
                                                          |--> [Database (Cassandra)]
                                                          |--> [Cache (Redis)]
                                                          |--> [Recommendation Engine]
                                                          |
                                                       [CDN (CloudFront)]
                                                       [Queue (Kafka)]
```

- **Generating Recommendations**:
  1. Client requests recommendations via GET `/recommendations`.
  2. Application server queries recommendation engine for suggestions.
  3. Cache results in Redis; fetch metadata from Cassandra.
  4. Return personalized video list.
- **Streaming Content**:
  1. Client requests video via GET `/video/{id}`.
  2. Check Redis for metadata; query Cassandra if missed.
  3. CDN delivers video from S3.
- **Scalability**: Shard Cassandra by user ID/video ID; replicate for availability.
- **Performance**: Use CDN for streaming; cache recommendations in Redis.
- **Trade-Offs**: Precompute recommendations (high storage) vs. on-demand (high compute).

### Trade-Offs
- **Recommendation Accuracy**: Collaborative filtering (accurate, high compute) vs. simple rules (fast, less accurate).
- **Storage**: S3 for videos (scalable) vs. database for metadata (fast queries).
- **Caching**: Redis for recommendations (fast) vs. no caching (high database load).

## Code Example: Recommendation Service
Let’s implement a simplified Java recommendation service with streaming support.

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Video {
    private String videoId;
    private String userId;
    private String videoUrl;
    private String title;
    private long timestamp;
    
    public Video(String videoId, String userId, String videoUrl, String title, long timestamp) {
        this.videoId = videoId;
        this.userId = userId;
        this.videoUrl = videoUrl;
        this.title = title;
        this.timestamp = timestamp;
    }
    
    public String getVideoId() {
        return videoId;
    }
    
    public String getUserId() {
        return userId;
    }
    
    public String getVideoUrl() {
        return videoUrl;
    }
    
    public String getTitle() {
        return title;
    }
}

public interface VideoRepository {
    void saveVideo(Video video);
    Video getVideo(String videoId);
}

public class CassandraVideoRepository implements VideoRepository {
    private final Map<String, Video> storage = new HashMap<>();
    
    @Override
    public void saveVideo(Video video) {
        System.out.println("Saving video metadata to Cassandra: " + video.getVideoId());
        storage.put(video.getVideoId(), video);
    }
    
    @Override
    public Video getVideo(String videoId) {
        System.out.println("Fetching video metadata from Cassandra: " + videoId);
        return storage.getOrDefault(videoId, null);
    }
}

public class S3Storage {
    public void saveVideoFile(String videoId, String videoUrl) {
        System.out.println("Saving video file to S3: " + videoId + " -> " + videoUrl);
    }
}

public class RedisCache {
    private final Map<String, List<Video>> recommendationCache = new HashMap<>();
    private final Map<String, Video> videoCache = new HashMap<>();
    
    public List<Video> getCachedRecommendations(String userId) {
        System.out.println("Checking Redis cache for recommendations: " + userId);
        return recommendationCache.getOrDefault(userId, null);
    }
    
    public void cacheRecommendations(String userId, List<Video> recommendations) {
        System.out.println("Caching recommendations in Redis for user: " + userId);
        recommendationCache.put(userId, recommendations);
    }
    
    public Video getCachedVideo(String videoId) {
        System.out.println("Checking Redis cache for video: " + videoId);
        return videoCache.getOrDefault(videoId, null);
    }
    
    public void cacheVideo(Video video) {
        System.out.println("Caching video metadata in Redis: " + video.getVideoId());
        videoCache.put(video.getVideoId(), video);
    }
}

public class CDNService {
    public String getCdnUrl(String videoId) {
        return "https://cdn.example.com/videos/" + videoId;
    }
}

public class RecommendationEngine {
    public List<Video> generateRecommendations(String userId) {
        // Simulate simple recommendation logic (e.g., based on user history)
        System.out.println("Generating recommendations for user: " + userId);
        return List.of(
            new Video("video1", "creator1", "s3://bucket/video1.mp4", "Sample Video 1", System.currentTimeMillis()),
            new Video("video2", "creator2", "s3://bucket/video2.mp4", "Sample Video 2", System.currentTimeMillis())
        );
    }
}

public class RecommendationService {
    private final VideoRepository repository;
    private final S3Storage storage;
    private final RedisCache cache;
    private final CDNService cdn;
    private final RecommendationEngine engine;
    
    public RecommendationService(VideoRepository repository, S3Storage storage, RedisCache cache, 
                                CDNService cdn, RecommendationEngine engine) {
        this.repository = repository;
        this.storage = storage;
        this.cache = cache;
        this.cdn = cdn;
        this.engine = engine;
    }
    
    public void uploadVideo(String videoId, String userId, String videoUrl, String title) {
        storage.saveVideoFile(videoId, videoUrl);
        Video video = new Video(videoId, userId, cdn.getCdnUrl(videoId), title, System.currentTimeMillis());
        repository.saveVideo(video);
        cache.cacheVideo(video);
    }
    
    public List<Video> getRecommendations(String userId) {
        List<Video> cached = cache.getCachedRecommendations(userId);
        if (cached != null) {
            return cached;
        }
        
        List<Video> recommendations = engine.generateRecommendations(userId);
        cache.cacheRecommendations(userId, recommendations);
        return recommendations;
    }
    
    public Video getVideo(String videoId) {
        Video cached = cache.getCachedVideo(videoId);
        if (cached != null) {
            return cached;
        }
        
        Video video = repository.getVideo(videoId);
        if (video == null) {
            throw new IllegalArgumentException("Video not found: " + videoId);
        }
        cache.cacheVideo(video);
        return video;
    }
}

public class RecommendationController {
    private final RecommendationService service;
    
    public RecommendationController(RecommendationService service) {
        this.service = service;
    }
    
    public void handleUploadVideo(String videoId, String userId, String videoUrl, String title) {
        service.uploadVideo(videoId, userId, videoUrl, title);
        System.out.println("Video uploaded: " + videoId);
    }
    
    public List<Video> handleGetRecommendations(String userId) {
        return service.getRecommendations(userId);
    }
    
    public Video handleGetVideo(String videoId) {
        return service.getVideo(videoId);
    }
}

public class RecommendationClient {
    public static void main(String[] args) {
        VideoRepository repository = new CassandraVideoRepository();
        S3Storage storage = new S3Storage();
        RedisCache cache = new RedisCache();
        CDNService cdn = new CDNService();
        RecommendationEngine engine = new RecommendationEngine();
        RecommendationService service = new RecommendationService(repository, storage, cache, cdn, engine);
        RecommendationController controller = new RecommendationController(service);
        
        controller.handleUploadVideo("video1", "user1", "s3://bucket/video1.mp4", "My first video!");
        List<Video> recommendations = controller.handleGetRecommendations("user1");
        System.out.println("Recommendations for user1: " + recommendations);
        Video video = controller.handleGetVideo("video1");
        System.out.println("Retrieved video: " + video.getVideoId() + ", URL: " + video.getVideoUrl());
        // Output:
        // Saving video file to S3: video1 -> s3://bucket/video1.mp4
        // Saving video metadata to Cassandra: video1
        // Caching video metadata in Redis: video1
        // Video uploaded: video1
        // Checking Redis cache for recommendations: user1
        // Generating recommendations for user: user1
        // Caching recommendations in Redis for user: user1
        // Recommendations for user1: [Video{videoId='video1', ...}, Video{videoId='video2', ...}]
        // Checking Redis cache for video: video1
        // Retrieved video: video1, URL: https://cdn.example.com/videos/video1
    }
}
```
- **System Design and Principles**:
  - **Functional**: `uploadVideo` stores videos; `getRecommendations` generates suggestions; `getVideo` retrieves for streaming.
  - **Non-Functional**:
    - **Scalability**: `CassandraVideoRepository` shards by video ID; S3 for video storage.
    - **Low Latency**: `RedisCache` for recommendations and metadata; `CDNService` for streaming.
    - **Availability**: Cassandra with replication.
  - **Encapsulation**: Private fields with public methods.
  - **Abstraction**: `VideoRepository` interface for storage.
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates recommendation and streaming; DIP (Section 4, Lecture 6) for abstractions.
- **Big O**: O(1) for `uploadVideo`, `getVideo`, `cacheVideo` (average case); O(n) for `getRecommendations` (n = recommended videos).
- **Edge Cases**: Handles missing videos, cache misses with exceptions.

**Systematic Approach**:
- Clarified requirements (generate recommendations, stream videos, ensure scalability).
- Designed system architecture diagram to show API, storage, CDN, and recommendation engine.
- Implemented Java code for a recommendation service, addressing requirements and trade-offs.
- Tested with `main` method for video upload, recommendation, and retrieval.

## Real-World Application
Imagine designing a recommendation system for a media platform to suggest personalized videos, using a recommendation engine for accuracy, S3 for scalable storage, and a CDN for low-latency streaming. A system architecture diagram communicates the design to stakeholders, ensuring performance and reliability. This design—paired with principles like KISS (Section 4, Lecture 8) and patterns like Facade (Section 3, Lecture 8)—demonstrates your ability to mentor teams on scalable recommendation design.

## Practice Exercises
Design a recommendation system or similar with these exercises:
- **Easy**: Design a system architecture diagram and Java code for a `RecommendationService` with basic video suggestions.
- **Medium**: Create a diagram and Java code for a `ContentRecommendationService` with user-based filtering.
- **Medium**: Design an HLD for a recommendation system with sharding, caching, and CDN, implementing a Java controller.
- **Hard**: Architect a recommendation system with Cassandra, S3, and a machine learning engine, supporting ratings, using a Java service.

Try designing one system in Java with a diagram, explaining how requirements and trade-offs are addressed.

## Conclusion
Designing a Netflix-like recommendation system equips you to architect scalable, low-latency Java systems for media platforms. By mastering this design, you’ll optimize performance, enhance user engagement, and teach others effectively. This advances your progress in Section 5 of the *Official CTO* journey.

**Next Step**: Explore [Design Uber/Ride-Sharing App](/sections/hld-ai/uber-ride-sharing) to apply HLD to another real-world problem, or check out [all sections](/sections/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>