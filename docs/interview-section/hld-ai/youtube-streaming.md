---
title: Design a YouTube/Video Streaming Service
description: Master the design of a YouTube-like video streaming service in Java, covering scalability, low latency, and transcoding for high-level system design.
---

# Design a YouTube/Video Streaming Service

## Overview
A video streaming service like YouTube allows users to upload, stream, and view videos with seamless playback across devices. In this eleventh lesson of Section 5 in the *Official CTO* journey, we explore the **high-level design of a video streaming service**, covering functional requirements (uploading videos, streaming playback), non-functional requirements (scalability, low latency, availability), and trade-offs (storage, transcoding, bandwidth). Whether building a media platform or a content-sharing app, this design ensures robust performance. By mastering this, you’ll architect scalable Java systems and mentor others effectively.

Inspired by *Clean Architecture*, *Designing Data-Intensive Applications*, and *System Design Interview*, this 25-minute lesson covers the concepts, a practical Java example with a system architecture diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand **functional** (video upload, streaming) and **non-functional** (scalability, latency, availability) requirements for a video streaming system.
- Learn to design a **YouTube-like system** in Java, addressing components and trade-offs.
- Apply **OOP principles** (Section 2, Lecture 1), **UML** (Section 2, Lecture 2), **design principles** (Section 4), and **HLD concepts** (Section 5, Lectures 1-10) to system design.
- Design scalable Java systems with clean code practices (Section 9).

## Why Video Streaming System Design Matters
Video streaming systems are core to modern media platforms, requiring efficient storage, fast delivery, and high scalability for millions of users. Early in my career, I designed a video streaming system for a media platform, optimizing for low latency with CDNs and efficient transcoding for compatibility. This design—balancing functionality and performance—is a staple in FAANG system design interviews. Explaining it clearly showcases your mentorship skills.

In software engineering, video streaming system design helps you:
- **Handle Scale**: Support millions of videos with distributed storage.
- **Ensure Low Latency**: Optimize streaming with CDNs and caching.
- **Manage Trade-Offs**: Balance storage costs and video quality.
- **Teach Effectively**: Share scalable streaming design strategies.

## Key Concepts
### 1. Functional Requirements
- **Upload Video**: Users upload videos with metadata (e.g., title, description).
- **Stream Video**: Deliver videos for playback across devices.
- **Optional**: Support comments, likes, and playlists.

### 2. Non-Functional Requirements
- **Scalability**: Handle billions of videos and millions of concurrent streams.
- **Low Latency**: <1s startup time for streaming.
- **Availability**: 99.9% uptime with fault tolerance.
- **Storage Efficiency**: Optimize for large video files.

### 3. System Components
- **Client**: Browser/mobile app for uploading and streaming.
- **API**: REST endpoints for video upload and playback.
- **Load Balancer**: Distributes traffic (e.g., Nginx).
- **Application Server**: Handles logic (e.g., Java Spring Boot).
- **Object Storage**: Stores videos (e.g., S3).
- **Database**: Stores metadata (e.g., Cassandra).
- **Cache**: Speeds up metadata access (e.g., Redis).
- **CDN**: Delivers videos globally (e.g., CloudFront).
- **Transcoding Service**: Converts videos to multiple formats (e.g., FFmpeg).

### 4. Trade-Offs
- **Transcoding**: Pre-transcode (high storage) vs. on-demand (high compute).
- **Storage**: Object storage (scalable) vs. database (simpler queries).
- **CAP Theorem**: Prioritize AP (availability, partition tolerance) for streaming.

### 5. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and polymorphism modularize components.
- **UML** (Section 2, Lecture 2): Diagrams visualize architecture.
- **Design Principles** (Section 4): SoC (Lecture 11) separates upload and streaming; KISS (Lecture 8) simplifies logic.
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

### 6. Use Case
Design a video streaming system for a media platform to upload and stream videos, ensuring scalability and low latency.

## System Design
### Architecture
```
[Client (Browser/Mobile)] --> [Load Balancer (Nginx)] --> [Application Server (Spring Boot)]
                                                          |
                                                          |--> [Object Storage (S3)]
                                                          |--> [Database (Cassandra)]
                                                          |--> [Cache (Redis)]
                                                          |
                                                       [CDN (CloudFront)]
                                                       [Transcoding Service (FFmpeg)]
```

- **Uploading a Video**:
  1. Client uploads video via POST `/video`.
  2. Application server stores video in S3, metadata in Cassandra.
  3. Transcoding service converts video to multiple formats (e.g., 720p, 1080p).
  4. Cache metadata in Redis.
- **Streaming a Video**:
  1. Client requests video via GET `/video/{id}`.
  2. Check Redis for metadata; query Cassandra if missed.
  3. CDN delivers video from S3.
- **Scalability**: Shard Cassandra by video ID; replicate for availability.
- **Performance**: Use CDN for low-latency delivery; cache metadata.
- **Trade-Offs**: Pre-transcode (high storage) vs. on-demand transcoding (high compute).

### Trade-Offs
- **Transcoding**: Pre-transcode all formats (high storage) vs. on-demand (high compute, latency).
- **Storage**: S3 for videos (scalable) vs. database for metadata (fast queries).
- **Caching**: Redis for metadata (fast) vs. no caching (high database load).

## Code Example: Video Streaming Service
Let’s implement a simplified Java video streaming service with S3 storage and CDN delivery.

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
    
    public long getTimestamp() {
        return timestamp;
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
    private final Map<String, Video> cache = new HashMap<>();
    
    public Video getCachedVideo(String videoId) {
        System.out.println("Checking Redis cache for video: " + videoId);
        return cache.getOrDefault(videoId, null);
    }
    
    public void cacheVideo(Video video) {
        System.out.println("Caching video metadata in Redis: " + video.getVideoId());
        cache.put(video.getVideoId(), video);
    }
}

public class TranscodingService {
    public void transcodeVideo(String videoId, String videoUrl) {
        System.out.println("Transcoding video: " + videoId + " from " + videoUrl);
    }
}

public class CDNService {
    public String getCdnUrl(String videoId) {
        // Simulate CDN URL generation
        return "https://cdn.example.com/videos/" + videoId;
    }
}

public class VideoService {
    private final VideoRepository repository;
    private final S3Storage storage;
    private final RedisCache cache;
    private final TranscodingService transcoder;
    private final CDNService cdn;
    
    public VideoService(VideoRepository repository, S3Storage storage, RedisCache cache, 
                        TranscodingService transcoder, CDNService cdn) {
        this.repository = repository;
        this.storage = storage;
        this.cache = cache;
        this.transcoder = transcoder;
        this.cdn = cdn;
    }
    
    public void uploadVideo(String videoId, String userId, String videoUrl, String title) {
        storage.saveVideoFile(videoId, videoUrl);
        transcoder.transcodeVideo(videoId, videoUrl);
        Video video = new Video(videoId, userId, cdn.getCdnUrl(videoId), title, System.currentTimeMillis());
        repository.saveVideo(video);
        cache.cacheVideo(video);
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

public class VideoController {
    private final VideoService service;
    
    public VideoController(VideoService service) {
        this.service = service;
    }
    
    public void handleUploadVideo(String videoId, String userId, String videoUrl, String title) {
        service.uploadVideo(videoId, userId, videoUrl, title);
        System.out.println("Video uploaded: " + videoId);
    }
    
    public Video handleGetVideo(String videoId) {
        return service.getVideo(videoId);
    }
}

public class VideoClient {
    public static void main(String[] args) {
        VideoRepository repository = new CassandraVideoRepository();
        S3Storage storage = new S3Storage();
        RedisCache cache = new RedisCache();
        TranscodingService transcoder = new TranscodingService();
        CDNService cdn = new CDNService();
        VideoService service = new VideoService(repository, storage, cache, transcoder, cdn);
        VideoController controller = new VideoController(service);
        
        controller.handleUploadVideo("video1", "user1", "s3://bucket/video1.mp4", "My first video!");
        Video video = controller.handleGetVideo("video1");
        System.out.println("Retrieved video: " + video.getVideoId() + ", URL: " + video.getVideoUrl());
        // Output:
        // Saving video file to S3: video1 -> s3://bucket/video1.mp4
        // Transcoding video: video1 from s3://bucket/video1.mp4
        // Saving video metadata to Cassandra: video1
        // Caching video metadata in Redis: video1
        // Video uploaded: video1
        // Checking Redis cache for video: video1
        // Retrieved video: video1, URL: https://cdn.example.com/videos/video1
    }
}
```
- **System Design and Principles**:
  - **Functional**: `uploadVideo` stores videos and metadata; `getVideo` retrieves for streaming.
  - **Non-Functional**:
    - **Scalability**: `CassandraVideoRepository` shards by video ID; S3 for video storage.
    - **Low Latency**: `RedisCache` for metadata; `CDNService` for video delivery.
    - **Availability**: Cassandra with replication.
  - **Encapsulation**: Private fields with public methods.
  - **Abstraction**: `VideoRepository` interface for storage.
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates upload and streaming; DIP (Section 4, Lecture 6) for abstractions.
- **Big O**: O(1) for `uploadVideo`, `getVideo`, `saveVideo`, `cacheVideo` (average case).
- **Edge Cases**: Handles missing videos, cache misses with exceptions.

**Systematic Approach**:
- Clarified requirements (upload, stream videos, ensure scalability).
- Designed system architecture diagram to show API, storage, CDN, and transcoding.
- Implemented Java code for a video streaming service, addressing requirements and trade-offs.
- Tested with `main` method for video upload and retrieval.

## Real-World Application
Imagine designing a video streaming system for a media platform to deliver high-quality videos, using S3 for scalable storage, Cassandra for metadata, and a CDN for low-latency delivery. A system architecture diagram communicates the design to stakeholders, ensuring performance and reliability. This design—paired with principles like KISS (Section 4, Lecture 8) and patterns like Facade (Section 3, Lecture 8)—demonstrates your ability to mentor teams on scalable streaming design.

## Practice Exercises
Design a video streaming system or similar with these exercises:
- **Easy**: Design a system architecture diagram and Java code for a `VideoService` with basic upload and retrieval.
- **Medium**: Create a diagram and Java code for a `StreamingService` with on-demand transcoding.
- **Medium**: Design an HLD for a streaming system with sharding, caching, and CDN, implementing a Java controller.
- **Hard**: Architect a streaming system with S3, Cassandra, and CloudFront, supporting playlists, using a Java service.

Try designing one system in Java with a diagram, explaining how requirements and trade-offs are addressed.

## Conclusion
Designing a YouTube-like video streaming system equips you to architect scalable, low-latency Java systems for media platforms. By mastering this design, you’ll optimize performance, ensure reliability, and teach others effectively. This advances your progress in Section 5 of the *Official CTO* journey.

**Next Step**: Explore [Design Netflix/Recommendation System](/interview-section/hld-ai/netflix-recommendation) to apply HLD to another real-world problem, or check out [all sections](/interview-section/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>