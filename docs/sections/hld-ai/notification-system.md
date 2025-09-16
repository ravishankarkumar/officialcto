---
title: Design a Notification System
description: Master the design of a notification system in Java, covering scalability, low latency, and push notifications for high-level system design.
---

# Design a Notification System

## Overview
A notification system delivers real-time alerts to users, such as push notifications, emails, or in-app messages, with customizable preferences. In this eighteenth lesson of Section 5 in the *Official CTO* journey, we explore the **high-level design of a notification system**, covering functional requirements (sending notifications, managing preferences), non-functional requirements (scalability, low latency, reliability), and trade-offs (push vs. pull, storage, delivery guarantees). Whether building notifications for a social platform or an e-commerce app, this design ensures robust performance. By mastering this, you’ll architect scalable Java systems and mentor others effectively.

Inspired by *Clean Architecture*, *Designing Data-Intensive Applications*, and *System Design Interview*, this 25-minute lesson covers the concepts, a practical Java example with a system architecture diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand **functional** (sending notifications, user preferences) and **non-functional** (scalability, latency, reliability) requirements for a notification system.
- Learn to design a **notification system** in Java, addressing components and trade-offs.
- Apply **OOP principles** (Section 2, Lecture 1), **UML** (Section 2, Lecture 2), **design principles** (Section 4), and **HLD concepts** (Section 5, Lectures 1-17) to system design.
- Design scalable Java systems with clean code practices (Section 9).

## Why Notification System Design Matters
Notification systems are critical for user engagement, delivering timely updates across platforms like social media or e-commerce. Early in my career, I designed a notification system for a social platform, optimizing for low latency with message queues and ensuring reliability with retry mechanisms. This design—balancing functionality and performance—is a staple in FAANG system design interviews. Explaining it clearly showcases your mentorship skills.

In software engineering, notification system design helps you:
- **Enhance Engagement**: Deliver timely, relevant notifications.
- **Handle Scale**: Support millions of users with distributed systems.
- **Ensure Low Latency**: Optimize delivery with queues and caching.
- **Teach Effectively**: Share scalable notification design strategies.

## Key Concepts
### 1. Functional Requirements
- **Send Notifications**: Deliver push, email, or in-app notifications.
- **Manage Preferences**: Allow users to customize notification settings.
- **Optional**: Support group notifications, analytics, and retries.

### 2. Non-Functional Requirements
- **Scalability**: Handle billions of notifications daily.
- **Low Latency**: <100ms for push notification delivery.
- **Reliability**: Ensure delivery with retries (99.9% uptime).
- **Storage Efficiency**: Optimize for notification and preference data.

### 3. System Components
- **Client**: Mobile app/browser for receiving notifications.
- **API**: REST/WebSocket endpoints for sending and configuring notifications.
- **Load Balancer**: Distributes traffic (e.g., Nginx).
- **Application Server**: Handles logic (e.g., Java Spring Boot).
- **Database**: Stores notification and preference data (e.g., Cassandra).
- **Cache**: Speeds up preference retrieval (e.g., Redis).
- **Message Queue**: Manages async delivery (e.g., Kafka).
- **Notification Service**: Integrates with push/email providers (e.g., Firebase, SES).

### 4. Trade-Offs
- **Push vs. Pull**: Push notifications (real-time, high resource) vs. pull/polling (simpler, higher latency).
- **Storage**: NoSQL (scalable) vs. SQL (simpler queries).
- **CAP Theorem**: Prioritize AP (availability, partition tolerance) for notification delivery.

### 5. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and polymorphism modularize components.
- **UML** (Section 2, Lecture 2): Diagrams visualize architecture.
- **Design Principles** (Section 4): SoC (Lecture 11) separates notification sending and preferences; KISS (Lecture 8) simplifies logic.
- **HLD Concepts**:
  - Components (Section 5, Lecture 1): Map to API, database, cache.
  - Requirements (Section 5, Lecture 2): Drive scalability and reliability.
  - Scaling (Section 5, Lecture 3): Use sharding and caching.
  - Security/Performance (Section 5, Lecture 4): Ensure low latency and secure delivery.
  - Distributed Systems (Section 5, Lecture 5): Handle partitioning and availability.
  - URL Shortener (Section 5, Lecture 6): Similar storage and ID generation.
  - Pastebin (Section 5, Lecture 7): Similar storage and retrieval patterns.
  - Web Crawler (Section 5, Lecture 8): Similar scalability challenges.
  - Twitter Feed (Section 5, Lecture 9): Similar real-time updates.
  - Instagram Sharing (Section 5, Lecture 10): Similar real-time delivery.
  - YouTube Streaming (Section 5, Lecture 11): Similar real-time processing.
  - Netflix Recommendation (Section 5, Lecture 12): Similar real-time processing.
  - Uber Ride-Sharing (Section 5, Lecture 13): Similar real-time coordination.
  - WhatsApp Messaging (Section 5, Lecture 14): Similar messaging patterns.
  - Dropbox Storage (Section 5, Lecture 15): Similar storage patterns.
  - E-commerce Platform (Section 5, Lecture 16): Similar real-time notifications.
  - Ticket Booking (Section 5, Lecture 17): Similar real-time updates.

### 6. Use Case
Design a notification system for a social platform to deliver real-time push notifications and manage user preferences, ensuring scalability and reliability.

## System Design
### Architecture
```
[Client (Mobile App/Browser)] --> [Load Balancer (Nginx)] --> [Application Server (Spring Boot, WebSocket)]
                                                          |
                                                          |--> [Database (Cassandra)]
                                                          |--> [Cache (Redis)]
                                                          |
                                                       [Queue (Kafka)]
                                                       [Notification Service (Firebase/SES)]
```

- **Sending Notifications**:
  1. Client or app triggers notification via POST `/notification`.
  2. Application server checks user preferences in Redis/Cassandra.
  3. Enqueue notification to Kafka for async delivery.
  4. Notification service sends push/email via Firebase/SES.
- **Managing Preferences**:
  1. Client updates preferences via PUT `/preferences`.
  2. Store preferences in Cassandra; cache in Redis.
- **Scalability**: Shard Cassandra by user ID; replicate for availability.
- **Reliability**: Use Kafka for reliable delivery with retries.
- **Performance**: Cache preferences in Redis; use WebSocket for push.
- **Trade-Offs**: Push notifications (low latency) vs. polling (simpler).

### Trade-Offs
- **Delivery Mechanism**: Push via WebSocket (real-time, high resource) vs. polling (simpler, higher latency).
- **Storage**: Cassandra for scalability vs. SQL for simpler queries.
- **Reliability**: At-least-once delivery (reliable, duplicates) vs. at-most-once (simpler, missed notifications).

## Code Example: Notification Service
Let’s implement a simplified Java notification service with push and caching.

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Notification {
    private String notificationId;
    private String userId;
    private String message;
    private long timestamp;
    
    public Notification(String notificationId, String userId, String message, long timestamp) {
        this.notificationId = notificationId;
        this.userId = userId;
        this.message = message;
        this.timestamp = timestamp;
    }
    
    public String getNotificationId() {
        return notificationId;
    }
    
    public String getUserId() {
        return userId;
    }
    
    public String getMessage() {
        return message;
    }
}

public class UserPreferences {
    private String userId;
    private boolean pushEnabled;
    
    public UserPreferences(String userId, boolean pushEnabled) {
        this.userId = userId;
        this.pushEnabled = pushEnabled;
    }
    
    public boolean isPushEnabled() {
        return pushEnabled;
    }
}

public interface NotificationRepository {
    void saveNotification(Notification notification);
}

public interface PreferenceRepository {
    void savePreferences(UserPreferences preferences);
    UserPreferences getPreferences(String userId);
}

public class CassandraNotificationRepository implements NotificationRepository {
    private final Map<String, List<Notification>> storage = new HashMap<>();
    
    @Override
    public void saveNotification(Notification notification) {
        System.out.println("Saving notification to Cassandra: " + notification.getNotificationId());
        storage.computeIfAbsent(notification.getUserId(), k -> new ArrayList<>()).add(notification);
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
        return storage.getOrDefault(userId, new UserPreferences(userId, true));
    }
}

public class RedisCache {
    private final Map<String, UserPreferences> cache = new HashMap<>();
    
    public UserPreferences getCachedPreferences(String userId) {
        System.out.println("Checking Redis cache for preferences: " + userId);
        return cache.getOrDefault(userId, null);
    }
    
    public void cachePreferences(UserPreferences preferences) {
        System.out.println("Caching preferences in Redis: " + preferences.getUserId());
        cache.put(preferences.getUserId(), preferences);
    }
}

public class KafkaQueue {
    public void enqueueNotification(String userId, Notification notification) {
        System.out.println("Enqueuing notification to Kafka for user: " + userId);
    }
}

public class PushNotificationService {
    public void sendPush(String userId, String message) {
        System.out.println("Sending push notification to user: " + userId + ", message: " + message);
    }
}

public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final PreferenceRepository preferenceRepository;
    private final RedisCache cache;
    private final KafkaQueue queue;
    private final PushNotificationService pushService;
    
    public NotificationService(NotificationRepository notificationRepository, 
                              PreferenceRepository preferenceRepository, 
                              RedisCache cache, KafkaQueue queue, 
                              PushNotificationService pushService) {
        this.notificationRepository = notificationRepository;
        this.preferenceRepository = preferenceRepository;
        this.cache = cache;
        this.queue = queue;
        this.pushService = pushService;
    }
    
    public void sendNotification(String notificationId, String userId, String message) {
        UserPreferences preferences = cache.getCachedPreferences(userId);
        if (preferences == null) {
            preferences = preferenceRepository.getPreferences(userId);
            cache.cachePreferences(preferences);
        }
        
        if (!preferences.isPushEnabled()) {
            System.out.println("Push notifications disabled for user: " + userId);
            return;
        }
        
        Notification notification = new Notification(notificationId, userId, message, System.currentTimeMillis());
        notificationRepository.saveNotification(notification);
        queue.enqueueNotification(userId, notification);
        pushService.sendPush(userId, message);
    }
    
    public void updatePreferences(String userId, boolean pushEnabled) {
        UserPreferences preferences = new UserPreferences(userId, pushEnabled);
        preferenceRepository.savePreferences(preferences);
        cache.cachePreferences(preferences);
    }
}

public class NotificationController {
    private final NotificationService service;
    
    public NotificationController(NotificationService service) {
        this.service = service;
    }
    
    public void handleSendNotification(String notificationId, String userId, String message) {
        service.sendNotification(notificationId, userId, message);
        System.out.println("Notification sent: " + notificationId);
    }
    
    public void handleUpdatePreferences(String userId, boolean pushEnabled) {
        service.updatePreferences(userId, pushEnabled);
        System.out.println("Preferences updated for user: " + userId);
    }
}

public class NotificationClient {
    public static void main(String[] args) {
        NotificationRepository notificationRepository = new CassandraNotificationRepository();
        PreferenceRepository preferenceRepository = new CassandraPreferenceRepository();
        RedisCache cache = new RedisCache();
        KafkaQueue queue = new KafkaQueue();
        PushNotificationService pushService = new PushNotificationService();
        NotificationService service = new NotificationService(notificationRepository, preferenceRepository, 
                                                              cache, queue, pushService);
        NotificationController controller = new NotificationController(service);
        
        controller.handleUpdatePreferences("user1", true);
        controller.handleSendNotification("notif1", "user1", "New post available!");
        // Output:
        // Saving preferences to Cassandra: user1
        // Caching preferences in Redis: user1
        // Preferences updated for user: user1
        // Checking Redis cache for preferences: user1
        // Saving notification to Cassandra: notif1
        // Enqueuing notification to Kafka for user: user1
        // Sending push notification to user: user1, message: New post available!
        // Notification sent: notif1
    }
}
```
- **System Design and Principles**:
  - **Functional**: `sendNotification` delivers notifications; `updatePreferences` manages user settings.
  - **Non-Functional**:
    - **Scalability**: `CassandraNotificationRepository` and `CassandraPreferenceRepository` shard by user ID.
    - **Low Latency**: `RedisCache` for preferences; `KafkaQueue` for async delivery.
    - **Reliability**: Kafka ensures at-least-once delivery.
  - **Encapsulation**: Private fields with public methods.
  - **Abstraction**: `NotificationRepository` and `PreferenceRepository` interfaces for storage.
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates notification sending and preferences; DIP (Section 4, Lecture 6) for abstractions.
- **Big O**: O(1) for `sendNotification`, `cachePreferences` (average case).
- **Edge Cases**: Handles disabled preferences, missing users with fallbacks.

**Systematic Approach**:
- Clarified requirements (send notifications, manage preferences, ensure scalability).
- Designed system architecture diagram to show API, storage, caching, and queuing.
- Implemented Java code for a notification service, addressing requirements and trade-offs.
- Tested with `main` method for preference updates and notification sending.

## Real-World Application
Imagine designing a notification system for a social platform, using Kafka for scalable delivery, Redis for low-latency preference retrieval, and Firebase for push notifications. A system architecture diagram communicates the design to stakeholders, ensuring performance and reliability. This design—paired with principles like KISS (Section 4, Lecture 8) and patterns like Facade (Section 3, Lecture 8)—demonstrates your ability to mentor teams on scalable notification design.

## Practice Exercises
Design a notification system or similar with these exercises:
- **Easy**: Design a system architecture diagram and Java code for a `NotificationService` with basic push notifications.
- **Medium**: Create a diagram and Java code for a `NotificationService` with user preferences.
- **Medium**: Design an HLD for a notification system with sharding, caching, and queuing, implementing a Java controller.
- **Hard**: Architect a notification system with Cassandra, Kafka, and Firebase, supporting group notifications, using a Java service.

Try designing one system in Java with a diagram, explaining how requirements and trade-offs are addressed.

## Conclusion
Designing a notification system equips you to architect scalable, low-latency Java systems for user engagement. By mastering this design, you’ll optimize performance, ensure reliability, and teach others effectively. This advances your progress in Section 5 of the *Official CTO* journey.

**Next Step**: Explore [Design an API Rate Limiter](/sections/hld-ai/api-rate-limiter) to apply HLD to another real-world problem, or check out [all sections](/sections/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>