---
title: Capstone - Combining LLD Components into a System
description: Learn how to combine low-level system design components in Java, integrating cache, logger, and notification dispatcher into an e-commerce system for scalable, robust applications.
---

# Capstone: Combining LLD Components into a System

## Overview
Welcome to the thirty-third and final lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! This capstone lecture brings together concepts from prior lessons to demonstrate how to combine multiple LLD components into a cohesive system. In this 25-minute lesson, we design a **simplified e-commerce system**, integrating components like a **cache with expiry** (Lecture 26), **logger** (Lecture 21), and **notification dispatcher** (Lecture 27) to manage product queries, logging, and user notifications. Whether building an online store or preparing for FAANG interviews, this lecture equips you to integrate modular systems effectively. Let’s dive into LLD and conclude Section 6 with a robust design!

Inspired by *Clean Architecture*, *Design Patterns*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand how to **combine LLD components** into a cohesive system.
- Learn to integrate **cache**, **logger**, and **notification dispatcher** in a Java-based e-commerce system.
- Apply **OOP principles** (Section 2, Lecture 1), **design patterns** (Section 3), **design principles** (Section 4), and **HLD concepts** (Section 5) to LLD.
- Write clean, modular Java code (Section 9).

## Why Combining LLD Components Matters
Combining LLD components is a critical skill for building real-world systems, a common expectation in FAANG interviews. Drawing from my experience designing integrated systems, I’ve combined components like caches and loggers to ensure scalability and observability. This capstone lecture prepares you to architect cohesive systems and articulate your approach clearly, showcasing your mentorship skills.

In software engineering, combining LLD components helps you:
- **Build Cohesive Systems**: Integrate modular components for functionality.
- **Ensure Scalability**: Use caches and queues for performance.
- **Enhance Observability**: Incorporate logging and notifications.
- **Teach Effectively**: Share practical LLD strategies.

## Key Concepts
### 1. E-commerce System Components
- **Cache with Expiry** (Lecture 26): Cache product details for fast retrieval.
- **Logger** (Lecture 21): Log system events (e.g., product queries, purchases).
- **Notification Dispatcher** (Lecture 27): Notify users of order updates.
- **Functionality**:
  - Query product details (cached).
  - Log system events (e.g., purchases).
  - Send notifications (e.g., order confirmation).
- **Edge Cases**: Cache misses, logging failures, notification errors.

### 2. Design Patterns
- **Strategy Pattern** (Section 3, Lecture 4): For notification channels and cache eviction.
- **Observer Pattern** (Section 3, Lecture 6): For notifying order updates.
- **Singleton Pattern** (Section 3, Lecture 1): For system components.

### 3. Design Principles
- **Single Responsibility Principle (SRP)** (Section 4, Lecture 1): Each component handles one task.
- **Open/Closed Principle (OCP)** (Section 4, Lecture 2): Extendable notification channels.
- **Dependency Inversion Principle (DIP)** (Section 4, Lecture 6): Depend on abstractions.

### 4. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation for product, order, and system classes.
- **Design Patterns** (Section 3): Strategy, Observer, Singleton.
- **Design Principles** (Section 4): SRP, OCP, DIP.
- **HLD** (Section 5):
  - E-commerce Platform (Lecture 16): High-level e-commerce concepts.
  - LLD Intro (Lecture 1): Builds on class design.
  - Database Design (Lecture 2): Persisting product/order data.
  - API Design (Lecture 3): Exposing system controls.
  - Concurrency Handling (Lecture 4): Thread-safe operations.
  - Error Handling (Lecture 5): Handling invalid inputs.
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
  - LRU Cache (Lecture 16): Similar caching mechanics.
  - Rate Limiter (Lecture 17): Similar operation control.
  - Text Editor (Lecture 18): Similar operation management.
  - Movie Ticket Booking (Lecture 19): Similar resource allocation.
  - File System (Lecture 20): Similar hierarchical structure.
  - Logger (Lecture 21): Direct reuse.
  - URL Parser (Lecture 22): Similar data processing.
  - Q&A System (Lecture 23): Similar user interaction modeling.
  - Traffic Light Controller (Lecture 24): Similar state-driven design.
  - Hospital Management (Lecture 25): Similar resource management.
  - Cache with Expiry (Lecture 26): Direct reuse.
  - Notification Dispatcher (Lecture 27): Direct reuse.
  - Inventory Manager (Lecture 28): Similar resource tracking.
  - Matchmaking Engine (Lecture 29): Similar queue-based processing.
  - Telemetry Collector (Lecture 30): Similar data aggregation.
  - Mock LLD Interview (Lecture 31): Similar class diagramming.
  - LLD with Design Patterns (Lecture 32): Similar pattern integration.
- **Clean Code** (Section 9): Meaningful names for classes and methods.

### 5. Use Case
Design a simplified e-commerce system integrating cache with expiry, logger, and notification dispatcher to manage product queries, logging, and order notifications.

## System Design
### Architecture
```
[Client] --> [ECommerceController]
                |
                v
            [ECommerceService]
                |
                v
           [ECommerceSystem] --> [Product][Order]
                |               [User]
                v
           [CacheWithExpiry][Logger][NotificationDispatcher]
```

- **Classes**:
  - `Product`: Represents product details (ID, name, price).
  - `User`: Represents users placing orders.
  - `Order`: Manages order details.
  - `CacheWithExpiry` (Lecture 26): Caches product data.
  - `Logger` (Lecture 21): Logs system events.
  - `NotificationDispatcher` (Lecture 27): Sends order notifications.
  - `ECommerceSystem`: Integrates components.
  - `ECommerceService`: Handles business logic.
  - `ECommerceController`: Exposes API.
- **Functionality**: Query products (cached), place orders, log events, notify users.
- **Trade-Offs**:
  - Storage: In-memory (fast, volatile) vs. database (persistent, slower).
  - Integration: Tight coupling (simple, rigid) vs. loose coupling (complex, extensible).

## Code Example: E-commerce System
Below is a Java implementation of an e-commerce system integrating cache, logger, and notification dispatcher.

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.LinkedList;
import java.util.concurrent.locks.ReentrantReadWriteLock;

// Custom exceptions
public class ECommerceException extends Exception {
    public ECommerceException(String message) {
        super(message);
    }
}

public class CacheException extends Exception {
    public CacheException(String message) {
        super(message);
    }
}

public class LoggerException extends Exception {
    public LoggerException(String message) {
        super(message);
    }
}

public class NotificationException extends Exception {
    public NotificationException(String message) {
        super(message);
    }
}

// Product class
public class Product {
    private String productId;
    private String name;
    private double price;

    public Product(String productId, String name, double price) {
        this.productId = productId;
        this.name = name;
        this.price = price;
    }

    public String getProductId() {
        return productId;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }
}

// User class
public class User {
    private String userId;
    private String name;

    public User(String userId, String name) {
        this.userId = userId;
        this.name = name;
    }

    public String getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public void receiveNotification(String message) {
        System.out.println("Notification to " + name + ": " + message);
    }
}

// Order class
public class Order {
    private String orderId;
    private String userId;
    private String productId;
    private double total;

    public Order(String orderId, String userId, String productId, double total) {
        this.orderId = orderId;
        this.userId = userId;
        this.productId = productId;
        this.total = total;
    }

    public String getOrderId() {
        return orderId;
    }

    public String getUserId() {
        return userId;
    }

    public String getProductId() {
        return productId;
    }

    public double getTotal() {
        return total;
    }
}

// Cache entry class (from Lecture 26)
public class CacheEntry {
    private String key;
    private Product value;
    private long expiryTime;

    public CacheEntry(String key, Product value, long ttl) {
        this.key = key;
        this.value = value;
        this.expiryTime = System.currentTimeMillis() + ttl;
    }

    public String getKey() {
        return key;
    }

    public Product getValue() {
        return value;
    }

    public boolean isExpired() {
        return System.currentTimeMillis() > expiryTime;
    }
}

// Cache with expiry (simplified from Lecture 26)
public class CacheWithExpiry {
    private final Map<String, CacheEntry> cache;
    private final ReentrantReadWriteLock lock;

    public CacheWithExpiry() {
        this.cache = new HashMap<>();
        this.lock = new ReentrantReadWriteLock();
    }

    public Product get(String key) throws CacheException {
        lock.readLock().lock();
        try {
            CacheEntry entry = cache.get(key);
            if (entry == null) {
                throw new CacheException("Key not found: " + key);
            }
            if (entry.isExpired()) {
                lock.readLock().unlock();
                lock.writeLock().lock();
                try {
                    cache.remove(key);
                    throw new CacheException("Key expired: " + key);
                } finally {
                    lock.writeLock().unlock();
                    lock.readLock().lock();
                }
            }
            return entry.getValue();
        } finally {
            lock.readLock().unlock();
        }
    }

    public void put(String key, Product value, long ttl) throws CacheException {
        lock.writeLock().lock();
        try {
            cache.put(key, new CacheEntry(key, value, ttl));
        } finally {
            lock.writeLock().unlock();
        }
    }
}

// Log level enum (from Lecture 21)
public enum LogLevel {
    DEBUG, INFO, ERROR
}

// Logger interface and implementation (from Lecture 21)
public interface Appender {
    void append(LogLevel level, String message);
}

public class ConsoleAppender implements Appender {
    @Override
    public void append(LogLevel level, String message) {
        System.out.println("[" + level + "] " + message);
    }
}

public class Logger {
    private List<Appender> appenders;

    public Logger() {
        this.appenders = new ArrayList<>();
    }

    public void addAppender(Appender appender) {
        appenders.add(appender);
    }

    public void log(LogLevel level, String message) throws LoggerException {
        if (level == null || message == null) {
            throw new LoggerException("Invalid log level or message");
        }
        for (Appender appender : appenders) {
            appender.append(level, message);
        }
    }
}

// Notification classes (from Lecture 27)
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

public interface Channel {
    void send(Notification notification) throws NotificationException;
}

public class EmailChannel implements Channel {
    @Override
    public void send(Notification notification) throws NotificationException {
        System.out.println("Sending email to " + notification.getRecipient() + ": " + notification.getContent());
    }
}

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

public class NotificationDispatcher {
    private Map<String, Channel> channels;
    private NotificationQueue queue;

    public NotificationDispatcher() {
        this.channels = new HashMap<>();
        this.queue = new NotificationQueue();
        channels.put("email", new EmailChannel());
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
                }
            } catch (NotificationException e) {
                queue.add(notification);
            }
        }
    }
}

// E-commerce system class
public class ECommerceSystem {
    private Map<String, Product> products;
    private Map<String, User> users;
    private Map<String, Order> orders;
    private CacheWithExpiry cache;
    private Logger logger;
    private NotificationDispatcher notifier;

    public ECommerceSystem() {
        this.products = new HashMap<>();
        this.users = new HashMap<>();
        this.orders = new HashMap<>();
        this.cache = new CacheWithExpiry();
        this.logger = new Logger();
        this.notifier = new NotificationDispatcher();
        this.logger.addAppender(new ConsoleAppender());
    }

    public void addProduct(String productId, String name, double price) throws ECommerceException {
        if (products.containsKey(productId)) {
            throw new ECommerceException("Product already exists: " + productId);
        }
        Product product = new Product(productId, name, price);
        products.put(productId, product);
        try {
            cache.put(productId, product, 60_000); // Cache for 60 seconds
            logger.log(LogLevel.INFO, "Added product: " + productId);
        } catch (CacheException | LoggerException e) {
            logger.log(LogLevel.ERROR, "Failed to cache/log product: " + e.getMessage());
            throw new ECommerceException("Error adding product: " + e.getMessage());
        }
    }

    public void addUser(String userId, String name) throws ECommerceException {
        if (users.containsKey(userId)) {
            throw new ECommerceException("User already exists: " + userId);
        }
        users.put(userId, new User(userId, name));
        try {
            logger.log(LogLevel.INFO, "Added user: " + userId);
        } catch (LoggerException e) {
            throw new ECommerceException("Error logging user: " + e.getMessage());
        }
    }

    public Product getProduct(String productId) throws ECommerceException {
        try {
            Product product = cache.get(productId);
            logger.log(LogLevel.INFO, "Cache hit for product: " + productId);
            return product;
        } catch (CacheException e) {
            logger.log(LogLevel.DEBUG, "Cache miss for product: " + productId + ", reason: " + e.getMessage());
            Product product = products.get(productId);
            if (product == null) {
                logger.log(LogLevel.ERROR, "Product not found: " + productId);
                throw new ECommerceException("Product not found: " + productId);
            }
            try {
                cache.put(productId, product, 60_000); // Re-cache
            } catch (CacheException ce) {
                logger.log(LogLevel.ERROR, "Failed to re-cache product: " + ce.getMessage());
            }
            return product;
        } catch (LoggerException le) {
            throw new ECommerceException("Error logging product query: " + le.getMessage());
        }
    }

    public void placeOrder(String orderId, String userId, String productId) throws ECommerceException {
        User user = users.get(userId);
        Product product = getProduct(productId);
        if (user == null) {
            logger.log(LogLevel.ERROR, "User not found: " + userId);
            throw new ECommerceException("User not found: " + userId);
        }
        Order order = new Order(orderId, userId, productId, product.getPrice());
        orders.put(orderId, order);
        try {
            logger.log(LogLevel.INFO, "Placed order: " + orderId + " for user: " + userId);
            String notificationId = "notif-" + orderId;
            notifier.dispatch(new Notification(notificationId, "Order " + orderId + " placed for " + product.getName(), "email", user.getName()));
        } catch (LoggerException | NotificationException e) {
            logger.log(LogLevel.ERROR, "Error logging/notifying order: " + e.getMessage());
            throw new ECommerceException("Error processing order: " + e.getMessage());
        }
    }

    public void processNotifications() {
        notifier.processQueue();
    }
}

// Service layer
public class ECommerceService {
    private final ECommerceSystem system;

    public ECommerceService(ECommerceSystem system) {
        this.system = system;
    }

    public void addProduct(String productId, String name, double price) throws ECommerceException {
        system.addProduct(productId, name, price);
    }

    public void addUser(String userId, String name) throws ECommerceException {
        system.addUser(userId, name);
    }

    public Product getProduct(String productId) throws ECommerceException {
        return system.getProduct(productId);
    }

    public void placeOrder(String orderId, String userId, String productId) throws ECommerceException {
        system.placeOrder(orderId, userId, productId);
    }

    public void processNotifications() {
        system.processNotifications();
    }
}

// Controller for API interactions
public class ECommerceController {
    private final ECommerceService service;

    public ECommerceController(ECommerceService service) {
        this.service = service;
    }

    public void handleAddProduct(String productId, String name, double price) {
        try {
            service.addProduct(productId, name, price);
        } catch (ECommerceException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public void handleAddUser(String userId, String name) {
        try {
            service.addUser(userId, name);
        } catch (ECommerceException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public Product handleGetProduct(String productId) {
        try {
            return service.getProduct(productId);
        } catch (ECommerceException e) {
            System.err.println("Error: " + e.getMessage());
            return null;
        }
    }

    public void handlePlaceOrder(String orderId, String userId, String productId) {
        try {
            service.placeOrder(orderId, userId, productId);
        } catch (ECommerceException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public void handleProcessNotifications() {
        service.processNotifications();
    }
}

// Client to demonstrate usage
public class ECommerceClient {
    public static void main(String[] args) {
        ECommerceSystem system = new ECommerceSystem();
        ECommerceService service = new ECommerceService(system);
        ECommerceController controller = new ECommerceController(service);

        // Normal flow
        controller.handleAddUser("user1", "Alice");
        controller.handleAddProduct("prod1", "Laptop", 999.99);
        Product product = controller.handleGetProduct("prod1");
        System.out.println("Product: " + (product != null ? product.getName() : "null") + ", Price: " + (product != null ? product.getPrice() : 0));
        controller.handlePlaceOrder("order1", "user1", "prod1");

        // Edge cases
        controller.handleAddProduct("prod1", "Duplicate", 499.99); // Duplicate product
        controller.handleGetProduct("prod2"); // Non-existent product
        controller.handlePlaceOrder("order2", "user2", "prod1"); // Invalid user
        controller.handlePlaceOrder("order2", "user1", "prod2"); // Invalid product
        // Output:
        // [INFO] Added user: user1
        // [INFO] Added product: prod1
        // [INFO] Cache hit for product: prod1
        // Product: Laptop, Price: 999.99
        // [INFO] Cache hit for product: prod1
        // [INFO] Placed order: order1 for user: user1
        // Sending email to Alice: Order order1 placed for Laptop
        // [ERROR] Product already exists: prod1
        // Error: Product already exists: prod1
        // [DEBUG] Cache miss for product: prod2, reason: Key not found: prod2
        // [ERROR] Product not found: prod2
        // Error: Product not found: prod2
        // [ERROR] User not found: user2
        // Error: User not found: user2
        // [DEBUG] Cache miss for product: prod2, reason: Key not found: prod2
        // [ERROR] Product not found: prod2
        // Error: Product not found: prod2
    }
}
```
- **LLD Principles**:
  - **Integration**: Combines `CacheWithExpiry`, `Logger`, and `NotificationDispatcher` for cohesive functionality.
  - **Patterns**:
    - **Strategy**: `Channel` interface for notification channels.
    - **Observer**: `User.receiveNotification` for order updates.
    - **Singleton**: Implicit in single `ECommerceSystem` instance.
  - **Principles**:
    - **SRP**: Each class (e.g., `CacheWithExpiry`, `Logger`) handles one responsibility.
    - **OCP**: New channels or appenders can be added without modifying core logic.
    - **DIP**: Depends on abstractions (e.g., `Channel`, `Appender`).
  - **Classes**: `Product`, `User`, `Order`, `CacheEntry`, `CacheWithExpiry`, `Logger`, `ConsoleAppender`, `Notification`, `Channel`, `EmailChannel`, `NotificationQueue`, `NotificationDispatcher`, `ECommerceSystem`, `ECommerceService`, `ECommerceController`.
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Big O**: O(1) for `addProduct`, `addUser`, `placeOrder` (HashMap); O(n) for `processQueue` (n = notifications).
- **Edge Cases**: Handles duplicate products/users, cache misses, invalid users/products, notification failures.

**UML Diagram**:
```
[Client] --> [ECommerceController]
                |
                v
            [ECommerceService]
                |
                v
           [ECommerceSystem] --> [Product][Order]
                |               [User]
                v
           [CacheWithExpiry][Logger][NotificationDispatcher]
                |               |          |
                v               v          v
           [CacheEntry]   [Appender]  [Notification][Channel]
                                  |              |
                                  v              v
                           [ConsoleAppender] [EmailChannel]
```

## Real-World Application
Imagine designing an e-commerce system like Amazon, integrating cache, logger, and notification dispatcher for fast product queries, event logging, and user notifications. This LLD—aligned with HLD principles from Section 5 (e.g., E-commerce Platform, Lecture 16)—ensures scalability and reliability, critical for real-world applications.

## Practice Exercises
Practice combining LLD components with these exercises:
- **Easy**: Design a UML diagram for an e-commerce system with one component (e.g., cache).
- **Medium**: Implement an e-commerce system in Java with cache and logger integration.
- **Medium**: Design an LLD for an e-commerce system integrating cache, logger, and notifications.
- **Hard**: Architect a system in Java, integrating multiple LLD components (e.g., cache, logger, notifications) with a UML diagram.

Try designing one system in Java with a UML diagram, explaining component integration.

## Conclusion
Mastering the integration of LLD components equips you to build modular, scalable Java systems, completing Section 6 with a robust capstone. This lecture builds on prior LLD and HLD concepts, preparing you for FAANG interviews and real-world applications.

**Next Step**: Check out [all sections](/interview-section/) to revisit other topics or explore new areas in your *Official CTO* journey!

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>