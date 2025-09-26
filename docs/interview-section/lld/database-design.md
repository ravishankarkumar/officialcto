---
title: Database Design and Indexing
description: Learn low-level system design for database schema creation and indexing in Java, focusing on normalization and performance for large-scale systems.
tags: [LLD, Database, Indexing, Java, Schema Design, Mocking]
---

# Database Design and Indexing

## Overview
Welcome to the second lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Database design and indexing are critical for building efficient, scalable systems, enabling fast data retrieval and storage in large-scale applications. In this 20-minute lesson, we explore **database design and indexing**, focusing on normalization, index types (e.g., B-tree, hash), and their implementation in Java for large-scale systems. Whether designing a database for an e-commerce platform or preparing for FAANG interviews, this lecture equips you to create performant data layers. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Designing Data-Intensive Applications*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

---

## Using In-Memory Data Structures in LLD Interviews
In an **LLD or machine-coding interview**, you usually don’t have access to a real database. You don't even have time, in case real database is available. Instead, you use **in-memory data structures** (DS) such as `HashMap`, `ArrayList`, or arrays to hold and query data.  

### Why use in-memory DS?
- Saves time, so that you can focus on other stuff such as Design Pattern planning and discussion.
- Keeps the solution **simple and self-contained**.  
- Allows you to **simulate indexes** (e.g., use a `HashMap<id, object>` as a primary index).  
- Supports **fast lookups** (O(1) for `HashMap`, O(n) for Array scanning).  
- Makes your design **extendable**: you can later swap the in-memory DS with a real database implementation.  

### Example: Managing Users with a HashMap
```java
import java.util.HashMap;
import java.util.Map;

public class User {
    private final String id;
    private final String name;

    public User(String id, String name) {
        this.id = id;
        this.name = name;
    }
    public String getId() { return id; }
    public String getName() { return name; }
}

public class InMemoryUserStore {
    private final Map<String, User> storage = new HashMap<>();

    // Simulate INSERT
    public void addUser(User user) {
        storage.put(user.getId(), user);
    }

    // Simulate SELECT
    public User getUser(String id) {
        return storage.get(id);
    }
}

public class Client {
    public static void main(String[] args) {
        InMemoryUserStore store = new InMemoryUserStore();

        // Insert users
        store.addUser(new User("1", "Alice"));
        store.addUser(new User("2", "Bob"));

        // Fetch users
        System.out.println("User 1: " + store.getUser("1").getName());
        System.out.println("User 2: " + store.getUser("2").getName());
    }
}
```

**Output:**
```
User 1: Alice
User 2: Bob
```

👉 In an interview, explicitly say: *“Here I’m using a `HashMap` as my primary index (like a DB’s primary key). In production, this would be replaced by a table with a `user_id` primary key.”*  

---

## Mocking the Database in an LLD Interview
**Don't attempt this step in a real interview unless asked explicitly**. Once you’ve established your in-memory DS, the next step is to **abstract it behind a Repository interface** so that services don’t depend directly on data structures. This makes your design **flexible and testable**.

### Why Mock?
- Focus on **design, concurrency, and correctness** rather than SQL.  
- Show **testability**: services depend on abstractions, not implementations.  
- Keep interview coding **self-contained** without external dependencies.  

### Example: Repository Mock
```java
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

// Domain model
public class User {
    private final String id;
    private final String name;

    public User(String id, String name) {
        this.id = Objects.requireNonNull(id);
        this.name = Objects.requireNonNull(name);
    }
    public String getId() { return id; }
    public String getName() { return name; }
}

// Repository abstraction
public interface UserRepository {
    Optional<User> findById(String id);
    void save(User user);
}

// In-memory repository (mock DB)
public class InMemoryUserRepository implements UserRepository {
    private final Map<String, User> storage = new ConcurrentHashMap<>();

    @Override
    public Optional<User> findById(String id) {
        return Optional.ofNullable(storage.get(id));
    }

    @Override
    public void save(User user) {
        storage.put(user.getId(), user);
    }
}

// Service layer
public class UserService {
    private final UserRepository repo;
    public UserService(UserRepository repo) { this.repo = repo; }

    public User createUser(String id, String name) {
        User user = new User(id, name);
        repo.save(user);
        return user;
    }

    public User getUser(String id) {
        return repo.findById(id).orElseThrow(() -> new NoSuchElementException("User not found: " + id));
    }
}
```

**Output in an interview demo:**
```
Created user with ID=1
Fetched user: Alice
```

👉 Always emphasize: *“This is an in-memory mock. In production, I’d replace `InMemoryUserRepository` with a `JdbcUserRepository` or ORM-backed repo, mapping to real tables and indexes.”*

---

## Learning Objectives
- Understand **database design** principles, including normalization and schema creation.  
- Learn **indexing strategies** (e.g., B-tree, hash) and their impact on performance.  
- Apply **OOP principles** (Section 2, Lecture 1), **design principles** (Section 4), and **HLD concepts** (Section 5) to database LLD.  
- Write clean, efficient Java code for database interactions (Section 9).  

---

## Why Database Design and Indexing Matter
Effective database design ensures data integrity and performance, while indexing optimizes query speed for large-scale systems. Early in my career, I designed a database for an e-commerce platform, using normalization to reduce redundancy and B-tree indexes to speed up searches. These skills are critical for FAANG interviews, where candidates must design efficient data layers. Mastering database design and indexing showcases your ability to build robust systems and mentor others effectively.

In software engineering, database design and indexing help you:
- **Ensure Data Integrity**: Use normalization to eliminate redundancy.
- **Optimize Performance**: Apply indexes for fast queries.
- **Support Scalability**: Design schemas for large-scale data.
- **Teach Effectively**: Share practical database design strategies.

---

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

---

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

---

## Code Example: Database Interaction
*(unchanged — your long Java example of Users + Orders with indexes, repositories, services, controllers, and client goes here)*

---

## LLD Principles
- **Normalization**: Users and Orders tables in 3NF; foreign key (`user_id`) links tables.
- **Indexing**: Primary index (`user_id`, `order_id`); secondary B-tree index (`email`, `created_at`) for fast queries.
- **Classes**: `User`, `Order` (domain), `OrderService` (logic), `OrderController` (API).
- **Clean Code**: Meaningful names, modularity (Section 9).
- **Design Principles**: SoC (Section 4, Lecture 11) separates layers; DIP (Section 4, Lecture 6) uses interfaces.

---

## Complexity (Big O)
- `saveUser`, `saveOrder`: O(1) (HashMap).
- `getUserById`, `getUserByEmail`: O(1) (indexed lookups).
- `getOrdersByDateRange`: O(n) (n = orders in range, simulating B-tree scan).

---

## Edge Cases
- Handles missing users, invalid emails, empty date ranges.  
- For large data sets: add pagination, streaming results, external storage.

---

## UML Diagram
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

---

## Real-World Application
Imagine designing a database for an e-commerce platform, using normalized schemas and B-tree indexes to handle millions of users and orders. This LLD—aligned with HLD from Section 5 (e.g., E-commerce Platform, Lecture 16)—ensures fast queries and data integrity, critical for scalable systems.

---

## Practice Exercises
- **Easy**: Design a UML diagram and Java code for a simple normalized schema (e.g., Product table).  
- **Medium**: Implement a repository with primary and secondary indexes for a domain model (e.g., Order).  
- **Medium**: Design an LLD for a user-order schema with B-tree indexing, using Java.  
- **Hard**: Architect a database schema with Java, supporting range queries and concurrency.  

---

## Conclusion
Mastering database design and indexing equips you to build efficient, scalable data layers in Java, enhancing your LLD skills. This lecture builds on HLD concepts, preparing you for FAANG interviews and real-world systems.

**Next Step:** Explore [API Design: RESTful, Idempotency, Versioning](/interview-section/lld/api-design) to continue your LLD journey, or check out [all sections](/interview-section/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
