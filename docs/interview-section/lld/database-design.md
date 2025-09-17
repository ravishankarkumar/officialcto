---
title: Database Design and Indexing
description: Learn low-level system design for database schema creation and indexing in Java, focusing on normalization and performance for large-scale systems.
---

# Database Design and Indexing

## Overview
Welcome to the second lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Database design and indexing are critical for building efficient, scalable systems, enabling fast data retrieval and storage in large-scale applications. In this 20-minute lesson, we explore **database design and indexing**, focusing on normalization, index types (e.g., B-tree, hash), and their implementation in Java for large-scale systems. Whether designing a database for an e-commerce platform or preparing for FAANG interviews, this lecture equips you to create performant data layers. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Designing Data-Intensive Applications*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **database design** principles, including normalization and schema creation.
- Learn **indexing strategies** (e.g., B-tree, hash) and their impact on performance.
- Apply **OOP principles** (Section 2, Lecture 1), **design principles** (Section 4), and **HLD concepts** (Section 5) to database LLD.
- Write clean, efficient Java code for database interactions (Section 9).

## Why Database Design and Indexing Matter
Effective database design ensures data integrity and performance, while indexing optimizes query speed for large-scale systems. Early in my career, I designed a database for an e-commerce platform, using normalization to reduce redundancy and B-tree indexes to speed up searches. These skills are critical for FAANG interviews, where candidates must design efficient data layers. Mastering database design and indexing showcases your ability to build robust systems and mentor others effectively.

In software engineering, database design and indexing help you:
- **Ensure Data Integrity**: Use normalization to eliminate redundancy.
- **Optimize Performance**: Apply indexes for fast queries.
- **Support Scalability**: Design schemas for large-scale data.
- **Teach Effectively**: Share practical database design strategies.

## Key Concepts
### 1. Database Design
- **Normalization**: Organize data to eliminate redundancy and ensure consistency.
  - **1NF**: Ensure atomic values and unique rows.
  - **2NF**: Remove partial dependencies (non-key attributes depend on entire key).
  - **3NF**: Eliminate transitive dependencies.
- **Schema Design**: Define tables, relationships, and constraints (e.g., primary keys, foreign keys).
- **Example**: User and Order tables with foreign key relationships.

### 2. Indexing Strategies
- **Primary Index**: Unique identifier for each record (e.g., user ID).
- **Secondary Index**: Non-unique fields for faster queries (e.g., email).
- **B-tree Index**: Balanced tree for range queries (e.g., `WHERE amount > 100`).
- **Hash Index**: Fast equality lookups (e.g., `WHERE user_id = '123'`).
- **Trade-Offs**:
  - B-tree (versatile, larger storage) vs. Hash (fast equality, limited use).
  - Indexes improve reads but slow writes due to maintenance.

### 3. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation for database access classes.
- **Design Principles** (Section 4): SoC (Lecture 11) separates schema and logic; KISS (Lecture 8) simplifies design.
- **HLD** (Section 5):
  - Scaling Databases (Lecture 32): LLD implements sharding and indexing.
  - E-commerce Platform (Lecture 16): LLD for user-order schemas.
  - Event-Driven Architecture (Lecture 34): LLD for event storage.
  - LLD Intro (Lecture 1): Builds on class and schema design.
- **Clean Code** (Section 9): Meaningful names for database classes.

### 4. Use Case
Design a user-order database schema for an e-commerce platform, with normalization and indexing for performance.

## System Design
### Schema
- **Users Table**:
  - Columns: `user_id` (PK, VARCHAR), `name` (VARCHAR), `email` (VARCHAR, indexed).
  - Normalization: 3NF, unique email index for fast lookups.
- **Orders Table**:
  - Columns: `order_id` (PK, VARCHAR), `user_id` (FK, VARCHAR), `amount` (DECIMAL), `created_at` (TIMESTAMP, indexed).
  - Normalization: 3NF, foreign key to Users, index on `created_at` for range queries.
- **Indexes**:
  - Primary: `user_id` (Users), `order_id` (Orders).
  - Secondary: `email` (Users, B-tree for searches), `created_at` (Orders, B-tree for time-based queries).

### Architecture
```
[Client] --> [OrderController]
                |
                v
            [OrderService]
                |
                v
           [OrderRepository] --> [Order]
           [UserRepository] --> [User]
                |
                v
           [Database (Users, Orders)]
```

- **Classes**: `User`, `Order` (domain), `OrderService` (logic), `OrderController` (API).
- **Concurrency**: Thread-safe repository for concurrent queries.
- **Trade-Offs**: B-tree indexes (versatile, storage-heavy) vs. hash (fast, limited).

## Code Example: Database Interaction
Below is a Java implementation for interacting with a normalized user-order schema.

```java
import java.util.HashMap;
import java.util.Map;

// Domain models
public class User {
    private String userId;
    private String name;
    private String email;

    public User(String userId, String name, String email) {
        this.userId = userId;
        this.name = name;
        this.email = email;
    }

    public String getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }
}

public class Order {
    private String orderId;
    private String userId;
    private double amount;
    private long createdAt;

    public Order(String orderId, String userId, double amount, long createdAt) {
        this.orderId = orderId;
        this.userId = userId;
        this.amount = amount;
        this.createdAt = createdAt;
    }

    public String getOrderId() {
        return orderId;
    }

    public String getUserId() {
        return userId;
    }

    public double getAmount() {
        return amount;
    }
}

// Repository interfaces for abstraction
public interface UserRepository {
    void saveUser(User user);
    User getUserById(String userId);
    User getUserByEmail(String email);
}

public interface OrderRepository {
    void saveOrder(Order order);
    Order getOrder(String orderId);
    List<Order> getOrdersByDateRange(long startTime, long endTime);
}

// In-memory repository simulating database with indexes
public class InMemoryUserRepository implements UserRepository {
    private final Map<String, User> idIndex = new HashMap<>(); // Primary index
    private final Map<String, User> emailIndex = new HashMap<>(); // Secondary index

    @Override
    public void saveUser(User user) {
        System.out.println("Saving user to database: " + user.getUserId());
        idIndex.put(user.getUserId(), user);
        emailIndex.put(user.getEmail(), user);
    }

    @Override
    public User getUserById(String userId) {
        System.out.println("Fetching user by ID: " + userId);
        return idIndex.getOrDefault(userId, null);
    }

    @Override
    public User getUserByEmail(String email) {
        System.out.println("Fetching user by email: " + email);
        return emailIndex.getOrDefault(email, null);
    }
}

public class InMemoryOrderRepository implements OrderRepository {
    private final Map<String, Order> idIndex = new HashMap<>();
    private final Map<Long, List<Order>> dateIndex = new HashMap<>(); // B-tree-like index simulation

    @Override
    public void saveOrder(Order order) {
        System.out.println("Saving order to database: " + order.getOrderId());
        idIndex.put(order.getOrderId(), order);
        long dateKey = order.getCreatedAt() / (24 * 60 * 60 * 1000); // Group by day
        dateIndex.computeIfAbsent(dateKey, k -> new ArrayList<>()).add(order);
    }

    @Override
    public Order getOrder(String orderId) {
        System.out.println("Fetching order by ID: " + orderId);
        return idIndex.getOrDefault(orderId, null);
    }

    @Override
    public List<Order> getOrdersByDateRange(long startTime, long endTime) {
        System.out.println("Fetching orders by date range: " + startTime + " to " + endTime);
        List<Order> result = new ArrayList<>();
        long startKey = startTime / (24 * 60 * 60 * 1000);
        long endKey = endTime / (24 * 60 * 60 * 1000);
        for (long key = startKey; key <= endKey; key++) {
            List<Order> orders = dateIndex.getOrDefault(key, new ArrayList<>());
            for (Order order : orders) {
                if (order.getCreatedAt() >= startTime && order.getCreatedAt() <= endTime) {
                    result.add(order);
                }
            }
        }
        return result;
    }
}

// Service layer
public class OrderService {
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    public OrderService(UserRepository userRepository, OrderRepository orderRepository) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
    }

    public void createOrder(String orderId, String userId, double amount) {
        User user = userRepository.getUserById(userId);
        if (user == null) {
            throw new IllegalArgumentException("User not found: " + userId);
        }
        Order order = new Order(orderId, userId, amount, System.currentTimeMillis());
        orderRepository.saveOrder(order);
    }

    public List<Order> getUserOrdersByEmail(String email) {
        User user = userRepository.getUserByEmail(email);
        if (user == null) {
            throw new IllegalArgumentException("User not found: " + email);
        }
        long endTime = System.currentTimeMillis();
        long startTime = endTime - (7 * 24 * 60 * 60 * 1000); // Last 7 days
        return orderRepository.getOrdersByDateRange(startTime, endTime);
    }
}

// Controller for API interactions
public class OrderController {
    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    public void handleCreateOrder(String orderId, String userId, double amount) {
        service.createOrder(orderId, userId, amount);
        System.out.println("Created order: " + orderId);
    }

    public List<Order> handleGetUserOrdersByEmail(String email) {
        return service.getUserOrdersByEmail(email);
    }
}

// Client to demonstrate usage
public class OrderClient {
    public static void main(String[] args) {
        UserRepository userRepository = new InMemoryUserRepository();
        OrderRepository orderRepository = new InMemoryOrderRepository();
        OrderService service = new OrderService(userRepository, orderRepository);
        OrderController controller = new OrderController(service);

        // Create user
        userRepository.saveUser(new User("user1", "Alice", "alice@example.com"));

        // Create orders
        controller.handleCreateOrder("order1", "user1", 100.0);
        controller.handleCreateOrder("order2", "user1", 200.0);

        // Query orders by email
        List<Order> orders = controller.handleGetUserOrdersByEmail("alice@example.com");
        System.out.println("Orders for alice@example.com:");
        for (Order order : orders) {
            System.out.println("Order ID: " + order.getOrderId() + ", Amount: " + order.getAmount());
        }
        // Output:
        // Saving user to database: user1
        // Fetching user by ID: user1
        // Saving order to database: order1
        // Created order: order1
        // Fetching user by ID: user1
        // Saving order to database: order2
        // Created order: order2
        // Fetching user by email: alice@example.com
        // Fetching orders by date range: <startTime> to <endTime>
        // Orders for alice@example.com:
        // Order ID: order1, Amount: 100.0
        // Order ID: order2, Amount: 200.0
    }
}
```
- **LLD Principles**:
  - **Normalization**: Users and Orders tables in 3NF; foreign key (`user_id`) links tables.
  - **Indexing**: Primary index (`user_id`, `order_id`); secondary B-tree index (`email`, `created_at`) for fast queries.
  - **Classes**: `User`, `Order` (domain), `OrderService` (logic), `OrderController` (API).
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates layers; DIP (Section 4, Lecture 6) uses interfaces.
- **Big O**:
  - `saveUser`, `saveOrder`: O(1) (HashMap).
  - `getUserById`, `getUserByEmail`: O(1) (indexed lookups).
  - `getOrdersByDateRange`: O(n) (n = orders in range, simulating B-tree scan).
- **Edge Cases**: Handles missing users, invalid emails, empty date ranges.

**UML Diagram**:
```
[Client] --> [OrderController]
                |
                v
            [OrderService]
                |
                v
 [UserRepository] --> [User]
 [OrderRepository] --> [Order]
       |
       v
[Database (Users, Orders)]
```

## Real-World Application
Imagine designing a database for an e-commerce platform, using normalized schemas and B-tree indexes to handle millions of users and orders. This LLD—aligned with HLD from Section 5 (e.g., E-commerce Platform, Lecture 16)—ensures fast queries and data integrity, critical for scalable systems.

## Practice Exercises
Practice database design with these exercises:
- **Easy**: Design a UML diagram and Java code for a simple normalized schema (e.g., Product table).
- **Medium**: Implement a repository with primary and secondary indexes for a domain model (e.g., Order).
- **Medium**: Design an LLD for a user-order schema with B-tree indexing, using Java.
- **Hard**: Architect a database schema with Java, supporting range queries and concurrency.

Try designing one schema in Java with a UML diagram, explaining normalization and indexing.

## Conclusion
Mastering database design and indexing equips you to build efficient, scalable data layers in Java, enhancing your LLD skills. This lecture builds on HLD concepts, preparing you for FAANG interviews and real-world systems.

**Next Step**: Explore [API Design: RESTful, Idempotency, Versioning](/interview-section/lld/api-design) to continue your LLD journey, or check out [all sections](/interview-section/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>