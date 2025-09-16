---
title: Mock Interview - Applying Patterns
description: Master design patterns in Java through a mock interview, designing a notification system with Factory Method, Observer, and Decorator patterns for better software engineering.
---

# Mock Interview: Applying Patterns

## Overview
Design patterns are a cornerstone of technical interviews, testing your ability to apply reusable solutions to real-world problems under time pressure. In this fifteenth and final lesson of Section 3 in the *Official CTO* journey, we simulate a **live design patterns interview** by designing a notification system, combining **Factory Method**, **Observer**, and **Decorator** patterns. Whether preparing for a FAANG interview or building a social app’s notification system, this lesson equips you with practical skills. By mastering pattern application, you’ll excel in interviews, design robust Java systems, and mentor others effectively.

Inspired by *Design Patterns* by Gang of Four, *Head First Design Patterns*, and *Clean Code*, this 30-minute lesson walks through the interview process, a practical Java implementation with a UML diagram, and practice exercises to prepare you for success. Let’s wrap up Section 3 and continue the journey to becoming a better engineer!

## Learning Objectives
- Understand the **design patterns interview process** (requirements, pattern selection, design, implementation).
- Apply **multiple patterns** (Factory Method, Observer, Decorator) from Section 3.
- Integrate **OOP principles** (Section 2, Lecture 1), **UML** (Section 2, Lecture 2), **concurrency** (Section 2, Lecture 4), and **clean code** (Section 9).
- Practice clear communication for interview scenarios.

## Why Design Patterns Interviews Matter
Design patterns interviews assess your ability to select and apply patterns to solve real-world problems, demonstrating technical depth and communication skills. Early in my career, I aced an interview by designing a notification system using multiple patterns, explaining trade-offs clearly. This approach—combining Factory Method for creation, Observer for notifications, and Decorator for extensibility—showcases your ability to design scalable systems. Mastering these interviews prepares you for real-world challenges and mentorship.

In software engineering, design patterns interviews help you:
- **Demonstrate Design Skills**: Apply patterns to modular systems.
- **Communicate Clearly**: Explain pattern choices and trade-offs.
- **Handle Complexity**: Integrate multiple patterns effectively.
- **Prepare for Success**: Excel in FAANG and industry interviews.

## Key Concepts
### 1. Design Patterns Interview Process
- **Clarify Requirements**: Understand system scope (e.g., notification types, concurrency).
- **Select Patterns**: Choose appropriate patterns (e.g., Factory Method for creation, Observer for updates).
- **Design UML**: Model classes and relationships (Section 2, Lecture 2).
- **Implement in Code**: Write clean, thread-safe Java code (Section 2, Lectures 1, 4; Section 9).
- **Discuss Trade-Offs**: Balance performance, maintainability, and extensibility (Section 2, Lecture 7).

### 2. Review of Section 3 Patterns
- **Creational**: Singleton (Lecture 2), Factory Method (Lecture 3), Abstract Factory (Lecture 4), Builder (Lecture 5).
- **Structural**: Adapter (Lecture 6), Decorator (Lecture 7), Facade (Lecture 8), Composite (Lecture 9).
- **Behavioral**: Strategy (Lecture 10), Observer (Lecture 11), Command (Lecture 12), Template Method (Lecture 13), Dependency Injection (Lecture 14).

### 3. System Requirements
- **Functionality**: Send notifications (email, push), support extensibility (e.g., formatting), handle concurrent updates.
- **Patterns Used**: Factory Method (create notifications), Observer (notify subscribers), Decorator (extend functionality).
- **Constraints**: Thread-safe, modular, extensible.

## Code Example: Notification System
Let’s simulate an OOD interview by designing a thread-safe notification system for a social app, combining Factory Method, Observer, and Decorator patterns, with a UML class diagram.

### UML Class Diagram
```
+---------------------+       +---------------------+
| NotificationFactory |       |    Notification     |
+---------------------+       +---------------------+
| +createNotification(type: String): Notification | +send(message: String) |
+---------------------+       +---------------------+
            |                           |
            | creates                   | implements
+---------------------+       +---------------------+       +---------------------+
|  EmailNotification  |       | NotificationDecorator |       |    UserManager     |
+---------------------+       +---------------------+       | -observers: List<Observer> |
| +send               |       | -notification: Notification | +addObserver(observer: Observer) |
+---------------------+       | +send               |       | +notifyObservers(message: String) |
            |               +---------------------+       +---------------------+
            |                           |
+---------------------+       +---------------------+       +---------------------+
|  PushNotification   |       | LoggingDecorator   |       |    Observer         |
+---------------------+       | +send               |       | +update(message: String) |
| +send               |       +---------------------+       +---------------------+
+---------------------+                 |                           |
                                    +---------------------+       | implements
                                    | FormattedDecorator  |       +---------------------+
                                    | +send               |       |   UserSubscriber   |
                                    +---------------------+       +---------------------+
                                                                | +update             |
                                                                +---------------------+
```

### Java Implementation
```java
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.locks.ReentrantLock;

// Observer interface
public interface Observer {
    void update(String message);
}

// Concrete observer
public class UserSubscriber implements Observer {
    private String userId;
    
    public UserSubscriber(String userId) {
        this.userId = userId;
    }
    
    @Override
    public void update(String message) {
        System.out.println("User " + userId + " received: " + message);
    }
}

// Subject
public class UserManager {
    private List<Observer> observers = new CopyOnWriteArrayList<>();
    
    public void addObserver(Observer observer) {
        observers.add(observer);
    }
    
    public void notifyObservers(String message) {
        for (Observer observer : observers) {
            observer.update(message);
        }
    }
}

// Notification interface
public interface Notification {
    void send(String message);
}

// Concrete notifications (Factory Method)
public class EmailNotification implements Notification {
    @Override
    public void send(String message) {
        System.out.println("Sending email: " + message);
    }
}

public class PushNotification implements Notification {
    @Override
    public void send(String message) {
        System.out.println("Sending push: " + message);
    }
}

// Factory Method
public class NotificationFactory {
    private static final ReentrantLock lock = new ReentrantLock();
    
    public Notification createNotification(String type) {
        lock.lock();
        try {
            switch (type.toLowerCase()) {
                case "email":
                    return new EmailNotification();
                case "push":
                    return new PushNotification();
                default:
                    throw new IllegalArgumentException("Unknown notification type: " + type);
            }
        } finally {
            lock.unlock();
        }
    }
}

// Abstract decorator
public abstract class NotificationDecorator implements Notification {
    protected Notification notification;
    
    public NotificationDecorator(Notification notification) {
        this.notification = notification;
    }
    
    @Override
    public void send(String message) {
        notification.send(message);
    }
}

// Concrete decorator: Logging
public class LoggingDecorator extends NotificationDecorator {
    public LoggingDecorator(Notification notification) {
        super(notification);
    }
    
    @Override
    public void send(String message) {
        System.out.println("Logging: Notification sent at " + System.currentTimeMillis());
        notification.send(message);
    }
}

// Concrete decorator: Formatting
public class FormattedDecorator extends NotificationDecorator {
    public FormattedDecorator(Notification notification) {
        super(notification);
    }
    
    @Override
    public void send(String message) {
        String formattedMessage = "[Formatted] " + message.toUpperCase();
        notification.send(formattedMessage);
    }
}

// Client code
public class NotificationClient {
    public static void main(String[] args) {
        NotificationFactory factory = new NotificationFactory();
        UserManager userManager = new UserManager();
        
        // Add observers
        userManager.addObserver(new UserSubscriber("user1"));
        userManager.addObserver(new UserSubscriber("user2"));
        
        // Create decorated notification
        Notification notification = new LoggingDecorator(
            new FormattedDecorator(
                factory.createNotification("email")
            )
        );
        
        // Simulate concurrent notifications
        Thread t1 = new Thread(() -> {
            notification.send("Welcome to the app!");
            userManager.notifyObservers("Welcome to the app!");
        });
        Thread t2 = new Thread(() -> {
            Notification push = new LoggingDecorator(factory.createNotification("push"));
            push.send("New message!");
            userManager.notifyObservers("New message!");
        });
        
        t1.start();
        t2.start();
        
        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        // Output example:
        // Logging: Notification sent at 1698765432100
        // Sending email: [Formatted] WELCOME TO THE APP!
        // User user1 received: Welcome to the app!
        // User user2 received: Welcome to the app!
        // Logging: Notification sent at 1698765432101
        // Sending push: New message!
        // User user1 received: New message!
        // User user2 received: New message!
    }
}
```
- **Design Patterns and OOP Principles**:
  - **Factory Method (Lecture 3)**: `NotificationFactory` creates notifications.
  - **Observer (Lecture 11)**: `UserManager` notifies `UserSubscriber` observers.
  - **Decorator (Lecture 7)**: `LoggingDecorator` and `FormattedDecorator` extend notification functionality.
  - **Encapsulation**: Private fields with public methods.
  - **Polymorphism**: Interfaces (`Notification`, `Observer`) support multiple implementations.
  - **Thread Safety**: Uses `ReentrantLock` and `CopyOnWriteArrayList` (Section 2, Lecture 4).
  - **Clean Code**: Meaningful names, modularity (Section 9).
- **Big O**: O(1) for `createNotification`, `send`, `addObserver`; O(n) for `notifyObservers` (n = observers).
- **Edge Cases**: Handles invalid notification types, concurrent sends, empty observers.

**Systematic Approach**:
- Clarified requirements (send notifications, support extensibility, notify users, thread-safe).
- Selected patterns: Factory Method for creation, Observer for notifications, Decorator for extensibility.
- Designed UML diagram to model `NotificationFactory`, `Notification`, `UserManager`, and decorators.
- Implemented Java classes with integrated patterns and thread safety.
- Discussed trade-offs: Factory Method vs. Abstract Factory (Lecture 4), composition vs. inheritance.
- Tested with `main` method for concurrent operations.

## Real-World Application
Imagine designing a notification system for a social app, where Factory Method creates notification types, Observer broadcasts updates to users, and Decorator adds logging or formatting. This ensures scalability for new notification types and thread-safe operation for concurrent users. Combining patterns demonstrates your ability to mentor teams on robust, modular design solutions.

## Practice Exercises
Apply multiple design patterns in these mock interview exercises:
- **Easy**: Design a UML diagram and Java code for a `LoggerSystem` using Singleton (Lecture 2) and Decorator (Lecture 7).
- **Medium**: Implement a `PaymentSystem` with Factory Method (Lecture 3) and Strategy (Lecture 10) for payment types and algorithms.
- **Medium**: Create a `ContentDeliverySystem` with Abstract Factory (Lecture 4) and Observer (Lecture 11) for content and notifications.
- **Hard**: Design a `BookingSystem` with Builder (Lecture 5), Command (Lecture 12), and Dependency Injection (Lecture 14) for bookings and services.

Try designing one system in Java with a UML diagram in a 45-minute mock interview, explaining your process aloud.

## Conclusion
Mastering design patterns in interviews equips you to design modular, scalable Java systems under pressure. By combining Factory Method, Observer, and Decorator, you’ll excel in interviews, build robust software, and teach others effectively. This completes Section 3, setting you up for success in the *Official CTO* journey.

**Next Step**: Explore [Composite Pattern](/sections/design-patterns/composite-pattern) to manage hierarchical structures, or check out [all sections](/sections/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>