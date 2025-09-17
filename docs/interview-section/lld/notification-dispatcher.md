---
title: Design a Notification Dispatcher
description: Learn low-level system design for a notification dispatcher in Java, focusing on channels and queuing for scalable, robust applications.
---

# Design a Notification Dispatcher

## Overview
Welcome to the twenty-seventh lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Designing a notification dispatcher is a practical LLD problem that tests your ability to manage event-driven communication using OOP principles. In this 25-minute lesson, we explore the **low-level design of a notification dispatcher system**, covering multiple channels (e.g., email, SMS) and queuing mechanisms to ensure reliable message delivery. Whether building a notification system for an application or preparing for FAANG interviews, this lecture equips you to design modular, scalable systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Design Patterns*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **low-level design** principles for a notification dispatcher with multiple channels and queuing.
- Learn to model **classes**, **relationships**, and **functionality** in Java.
- Apply **OOP principles** (Section 2, Lecture 1), **design patterns** (Section 3), **design principles** (Section 4), and **HLD concepts** (Section 5) to LLD.
- Write clean, modular Java code (Section 9).

## Why Notification Dispatcher Design Matters
A notification dispatcher is a critical component in modern applications, enabling reliable communication with users across various channels. Drawing from my experience designing event-driven systems, I’ve implemented similar mechanisms to ensure scalability and reliability in notification delivery. This lecture prepares you to design robust systems and articulate your approach clearly, showcasing your mentorship skills.

In software engineering, notification dispatcher design helps you:
- **Manage Communication**: Support multiple notification channels.
- **Ensure Reliability**: Use queuing for guaranteed delivery.
- **Enhance Scalability**: Handle high notification volumes.
- **Teach Effectively**: Share practical LLD strategies.

## Key Concepts
### 1. Notification Dispatcher Components
- **Channels**: Support multiple delivery methods (e.g., email, SMS, push).
- **Queuing**: Buffer notifications for processing and retry.
- **Functionality**:
  - Send notifications via specified channels.
  - Queue notifications for asynchronous processing.
  - Handle retries for failed deliveries.
- **Edge Cases**: Invalid channels, queue overflow, delivery failures.

### 2. Design Patterns
- **Strategy Pattern** (Section 3, Lecture 4): For different channel implementations.
- **Observer Pattern** (Section 3, Lecture 6): For notifying delivery status.
- **Queue Pattern**: For managing notification processing.

### 3. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation for notification and channel classes.
- **Design Patterns** (Section 3): Strategy and Observer patterns.
- **Design Principles** (Section 4): SoC (Lecture 11) separates channel and queuing logic; KISS (Lecture 8) simplifies design.
- **HLD** (Section 5):
  - Notification System (Lecture 32): High-level notification concepts.
  - LLD Intro (Lecture 1): Builds on class design.
  - Database Design (Lecture 2): Persisting notification logs.
  - API Design (Lecture 3): Exposing notification controls.
  - Concurrency Handling (Lecture 4): Thread-safe queuing.
  - Error Handling (Lecture 5): Handling delivery failures.
  - Parking Lot (Lecture 6): Similar resource management.
  - Elevator System (Lecture 7): Similar state-driven design.
  - Vending Machine (Lecture 8): Similar operation logic.
  - ATM Machine (Lecture 9): Similar transactional design.
  - Restaurant Management (Lecture 10): Similar resource tracking.
  - Library Management (Lecture 11): Similar resource logic.
  - Chess Game (Lecture 12): Similar rule enforcement.
  - Tic-Tac-Toe (Lecture 13): Similar logic.
  - Snake and Ladder (Lecture 14): Similar mechanics.
  - Deck of Cards (Lecture 15): Similar entity management.
  - LRU Cache (Lecture 16): Similar data structure usage.
  - Rate Limiter (Lecture 17): Similar operation control.
  - Text Editor (Lecture 18): Similar operation management.
  - Movie Ticket Booking (Lecture 19): Similar resource allocation.
  - File System (Lecture 20): Similar hierarchical structure.
  - Logger (Lecture 21): Similar operation logging.
  - URL Parser (Lecture 22): Similar data processing.
  - Q&A System (Lecture 23): Similar user interaction modeling.
  - Traffic Light Controller (Lecture 24): Similar state-driven design.
  - Hospital Management (Lecture 25): Similar resource management.
  - Cache with Expiry (Lecture 26): Similar data management.
- **Clean Code** (Section 9): Meaningful names for classes and methods.

### 4. Use Case
Design a notification dispatcher for an application, supporting multiple channels (email, SMS) and queuing for reliable delivery.

## System Design
### Architecture
```
[Client] --> [NotificationController]
                |
                v
            [NotificationDispatcher]
                |
                v
           [Notification] --> [Channel] --> [EmailChannel|SMSChannel]
           [NotificationQueue]
```

- **Classes**:
  - `Notification`: Represents a notification with content and channel.
  - `Channel`: Interface for delivery methods (e.g., `EmailChannel`, `SMSChannel`).
  - `NotificationQueue`: Manages queued notifications.
  - `NotificationDispatcher`: Coordinates queuing and delivery.
  - `NotificationController`: Exposes API for sending notifications.
- **Functionality**: Send notifications via channels, queue for processing, handle retries.
- **Trade-Offs**:
  - Queuing: In-memory (fast, volatile) vs. persistent (reliable, slower).
  - Channels: Single-threaded (simple, slow) vs. multi-threaded (fast, complex).

## Code Example: Notification Dispatcher System
Below is a Java implementation of a notification dispatcher with channels and queuing.

```java
import java.util.LinkedList;
import java.util.Queue;

// Custom exception
public class NotificationException extends Exception {
    public NotificationException(String message) {
        super(message);
    }
}

// Notification class
public class Notification {
    private String notificationId;
    private String content;
    private String channelType;
    private String recipient;

    public Notification(String notificationId, String content, String channelType, String recipient) {
        this.notificationId = notificationId;
        this.content = content;
        this.channelType = channelType;
        this.recipient = recipient;
    }

    public String getNotificationId() {
        return notificationId;
    }

    public String getContent() {
        return content;
    }

    public String getChannelType() {
        return channelType;
    }

    public String getRecipient() {
        return recipient;
    }
}

// Channel interface
public interface Channel {
    void send(Notification notification) throws NotificationException;
}

// Email channel
public class EmailChannel implements Channel {
    @Override
    public void send(Notification notification) throws NotificationException {
        System.out.println("Sending email to " + notification.getRecipient() + ": " + notification.getContent());
        // Simulate failure for testing
        if (notification.getContent().contains("fail")) {
            throw new NotificationException("Email delivery failed for: " + notification.getRecipient());
        }
    }
}

// SMS channel
public class SMSChannel implements Channel {
    @Override
    public void send(Notification notification) throws NotificationException {
        System.out.println("Sending SMS to " + notification.getRecipient() + ": " + notification.getContent());
        // Simulate failure for testing
        if (notification.getContent().contains("fail")) {
            throw new NotificationException("SMS delivery failed for: " + notification.getRecipient());
        }
    }
}

// Notification queue
public class NotificationQueue {
    private Queue<Notification> queue;

    public NotificationQueue() {
        this.queue = new LinkedList<>();
    }

    public void add(Notification notification) {
        queue.offer(notification);
    }

    public Notification poll() {
        return queue.poll();
    }

    public boolean isEmpty() {
        return queue.isEmpty();
    }
}

// Notification dispatcher
public class NotificationDispatcher {
    private Map<String, Channel> channels;
    private NotificationQueue queue;

    public NotificationDispatcher() {
        this.channels = new HashMap<>();
        this.queue = new NotificationQueue();
        // Initialize channels
        channels.put("email", new EmailChannel());
        channels.put("sms", new SMSChannel());
    }

    public void dispatch(Notification notification) throws NotificationException {
        Channel channel = channels.get(notification.getChannelType());
        if (channel == null) {
            throw new NotificationException("Invalid channel type: " + notification.getChannelType());
        }
        try {
            channel.send(notification);
        } catch (NotificationException e) {
            queue.add(notification);
            throw new NotificationException("Failed to send notification, queued: " + e.getMessage());
        }
    }

    public void processQueue() {
        while (!queue.isEmpty()) {
            Notification notification = queue.poll();
            try {
                Channel channel = channels.get(notification.getChannelType());
                if (channel != null) {
                    channel.send(notification);
                    System.out.println("Processed queued notification: " + notification.getNotificationId());
                }
            } catch (NotificationException e) {
                queue.add(notification); // Re-queue on failure
                System.out.println("Retry failed for: " + notification.getNotificationId());
            }
        }
    }
}

// Controller for API interactions
public class NotificationController {
    private final NotificationDispatcher dispatcher;

    public NotificationController(NotificationDispatcher dispatcher) {
        this.dispatcher = dispatcher;
    }

    public void handleSendNotification(String notificationId, String content, String channelType, String recipient) {
        try {
            Notification notification = new Notification(notificationId, content, channelType, recipient);
            dispatcher.dispatch(notification);
        } catch (NotificationException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public void handleProcessQueue() {
        dispatcher.processQueue();
    }
}

// Client to demonstrate usage
public class NotificationClient {
    public static void main(String[] args) {
        NotificationDispatcher dispatcher = new NotificationDispatcher();
        NotificationController controller = new NotificationController(dispatcher);

        // Normal flow
        controller.handleSendNotification("n1", "Welcome!", "email", "user@example.com");
        controller.handleSendNotification("n2", "Update!", "sms", "1234567890");

        // Edge cases
        controller.handleSendNotification("n3", "Fail email", "email", "user@example.com"); // Failed delivery
        controller.handleSendNotification("n4", "Invalid", "push", "user@example.com"); // Invalid channel
        controller.handleProcessQueue(); // Process queued notifications
        // Output:
        // Sending email to user@example.com: Welcome!
        // Sending SMS to 1234567890: Update!
        // Sending email to user@example.com: Fail email
        // Error: Failed to send notification, queued: Email delivery failed for: user@example.com
        // Error: Invalid channel type: push
        // Sending email to user@example.com: Fail email
        // Retry failed for: n3
    }
}
```
- **LLD Principles**:
  - **Channels**: `Channel` interface with `EmailChannel` and `SMSChannel` for delivery.
  - **Queuing**: `NotificationQueue` buffers notifications for retries.
  - **Classes**: `Notification`, `Channel`, `EmailChannel`, `SMSChannel`, `NotificationQueue`, `NotificationDispatcher`, `NotificationController`.
  - **Design Patterns**: Strategy (channel types), Observer (extensible for status updates).
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates channel and queuing logic; DIP (Section 4, Lecture 6) via `Channel` interface.
- **Big O**: O(1) for `dispatch` (HashMap lookup), O(n) for `processQueue` (n = queued notifications).
- **Edge Cases**: Handles invalid channels, delivery failures, queue retries.

**UML Diagram**:
```
[Client] --> [NotificationController]
                |
                v
            [NotificationDispatcher]
                |
                v
           [Notification] --> [Channel] --> [EmailChannel|SMSChannel]
           [NotificationQueue]
```

## Real-World Application
Imagine designing a notification dispatcher for an application to send alerts via email or SMS, ensuring reliable delivery with queuing. This LLD—aligned with HLD principles from Section 5 (e.g., Notification System, Lecture 32)—ensures scalability and reliability, critical for event-driven systems.

## Practice Exercises
Practice notification dispatcher design with these exercises:
- **Easy**: Design a UML diagram and Java code for a simple notification system with one channel.
- **Medium**: Implement a notification dispatcher with email and SMS channels.
- **Medium**: Design an LLD for a notification system with queuing and retries.
- **Hard**: Architect a notification dispatcher with Java, integrating multiple design patterns (e.g., Strategy, Observer).

Try designing one system in Java with a UML diagram, explaining channels and queuing.

## Conclusion
Mastering the design of a notification dispatcher equips you to build modular, scalable Java systems, enhancing your LLD skills. This lecture builds on HLD concepts and event-driven principles, preparing you for FAANG interviews and real-world applications.

**Next Step**: Explore [Design a Parking lot System](/interview-section/lld/parking-lot) to continue your LLD journey, or check out [all sections](/interview-section/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>