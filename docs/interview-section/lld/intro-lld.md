---
title: LLD Intro - From HLD to Detailed Design
description: Learn low-level system design (LLD) in Java through a structured workflow - from problem statement to REST APIs, services, classes, concurrency, and machine-code implementation with design principles and patterns.
tags: [LLD, Java, API Design, Service Design, Machine Coding, SOLID, Design Patterns]
---

# LLD Intro: From HLD to Detailed Design

## Overview
Low-Level Design (LLD) bridges **high-level system design (HLD)** and working code. It answers:  
- *Which APIs should I expose?*  
- *What services and responsibilities should exist?*  
- *How should classes be structured?*  
- *How do I ensure thread safety, extensibility, and testability?*  

In this introduction, we’ll combine a **repeatable attack plan** for any LLD problem with a **concrete User Management example** that goes from **problem statement → APIs → services → classes → code**. This is the foundation you’ll need for both **FAANG interviews** and **real-world engineering**.

---

## Why LLD Matters
LLD ensures that systems are:
- **Modular** → easy to extend and maintain.  
- **Testable** → supports unit, integration, and contract tests.  
- **Thread-safe** → handles concurrency without corruption.  
- **Scalable** → designs can grow without rewrites.  

In interviews, LLD is often tested via *machine-coding rounds*: you must implement a working system in 45–60 minutes, demonstrating both design and coding ability.

---

## Attack Plan: How to Approach Any LLD Problem
1. **Clarify scope & NFRs** (persistence, concurrency, scale).  
2. **Define API surface** (REST endpoints, payloads, status codes).  
3. **Identify domain objects (classes)** from the problem statement.  
4. **Choose architecture & layers** (Controller → Service → Repository).  
5. **Design classes & interfaces** (apply SOLID + patterns).  
6. **Implement happy-path logic** (machine coding).  
7. **Add concurrency & resilience** (locks, retries, thread-safety).  
8. **Write tests / main** (prove correctness).  
9. **Discuss trade-offs & scaling** (caching, async, DB sharding).  

Keep this flow in mind — interviewers look for structured thinking more than perfect code.

::: info Which of the above steps to perform within the LLD time limit
One doesn't need to do all the above steps in an interview. Many companies ask Machine Coding, where one has to write code that actually runs. Others stop at Service Design (Code Architecture and layers).

Some companies want a detailed API design based on REST philosophy, others don't care. It's important to clarify what the interviewer wants at the beginning of the interview.
:::

---

## Problem Statement
Design a **User Management component** for a web application.  

### Requirements
1. Create a user with `name` and `email`.  
2. Fetch a user by `userId`.  
3. Update user’s email safely (concurrent updates must not corrupt data).  

### Non-functional Requirements
- Thread safety.  
- Persistence abstraction (in-memory or DB).  
- Extensibility for future features (delete, list, etc.).  

---

## Step 1: API Design (REST)
### Endpoints
```
POST   /v1/users
GET    /v1/users/{userId}
PATCH  /v1/users/{userId}/email
```

### Examples
- **Create User**
  - Request:
    ```json
    { "name": "Alice", "email": "alice@example.com" }
    ```
  - Response `201 Created`:
    ```json
    { "id": "user_123", "name": "Alice", "email": "alice@example.com" }
    ```

- **Get User**
  - Response `200 OK`:
    ```json
    { "id": "user_123", "name": "Alice", "email": "alice@example.com" }
    ```
  - Error: `404 Not Found`.

- **Update Email**
  - Request:
    ```json
    { "email": "alice.new@example.com" }
    ```
  - Response `200 OK`:
    ```json
    { "id": "user_123", "name": "Alice", "email": "alice.new@example.com" }
    ```

**Principles applied:** versioning (`/v1`), consistent nouns (`/users`), idempotency on updates, structured errors.

---

## Step 2: Service Design
### Layers
- **Controller (`UserController`)** → maps HTTP requests to service methods.  
- **Service (`UserService`)** → business logic, validation, concurrency safety.  
- **Repository (`UserRepository`)** → persistence abstraction.  
- **Domain (`User`)** → immutable user object.  

### Service Interaction Diagram
```
[Client] → [UserController] → [UserService] → [UserRepository] → [Storage]
```

---

## Step 3: Class Design & Code
```java
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

// Domain model (immutable)
public final class User {
    private final String id;
    private final String name;
    private final String email;
    public User(String id, String name, String email) {
        this.id = Objects.requireNonNull(id);
        this.name = Objects.requireNonNull(name);
        this.email = Objects.requireNonNull(email);
    }
    public String id() { return id; }
    public String name() { return name; }
    public String email() { return email; }
    public User withEmail(String newEmail) { return new User(this.id, this.name, newEmail); }
}

// Repository abstraction
public interface UserRepository {
    Optional<User> findById(String id);
    void save(User user);
}

// Thread-safe in-memory repo
public class InMemoryUserRepository implements UserRepository {
    private final Map<String, User> storage = new ConcurrentHashMap<>();
    @Override public Optional<User> findById(String id) { return Optional.ofNullable(storage.get(id)); }
    @Override public void save(User user) { storage.put(user.id(), user); }
}

// Service layer
public class UserService {
    private final UserRepository repo;
    public UserService(UserRepository repo) { this.repo = repo; }

    public User createUser(String name, String email) {
        String id = UUID.randomUUID().toString();
        User user = new User(id, name, email);
        repo.save(user);
        return user;
    }

    public User getUser(String id) {
        return repo.findById(id).orElseThrow(() -> new NoSuchElementException("User not found: " + id));
    }

    public User updateEmail(String id, String newEmail) {
        synchronized (id.intern()) { // lock per userId
            User existing = getUser(id);
            User updated = existing.withEmail(newEmail);
            repo.save(updated);
            return updated;
        }
    }
}

// Controller (simulated)
public class UserController {
    private final UserService service;
    public UserController(UserService service) { this.service = service; }
    public User handleCreate(String name, String email) { return service.createUser(name, email); }
    public User handleGet(String id) { return service.getUser(id); }
    public User handleUpdateEmail(String id, String email) { return service.updateEmail(id, email); }
}

// Demo client
public class UserClient {
    public static void main(String[] args) {
        UserRepository repo = new InMemoryUserRepository();
        UserService service = new UserService(repo);
        UserController controller = new UserController(service);

        User user = controller.handleCreate("Alice", "alice@example.com");
        System.out.println("Created: " + user.id());

        User updated = controller.handleUpdateEmail(user.id(), "alice@new.com");
        System.out.println("Updated: " + updated.email());
    }
}
```

---

## Step 4: Design Principles & Patterns Applied
- **SOLID**  
  - SRP → Each class has one responsibility.  
  - DIP → `UserService` depends on `UserRepository` interface, not concrete impl.  
- **Patterns**  
  - Repository Pattern → abstracts persistence.  
  - Factory → `UserService` generates user IDs and builds objects.  
  - Strategy-ready → Repository can be swapped (in-memory vs DB).  
- **Concurrency**  
  - `ConcurrentHashMap` for storage.  
  - `synchronized` per userId for safe updates.  

---

## Step 5: LLD Checklist (interview use)
- ✅ Requirements clarified (functional + NFRs).  
- ✅ API contract defined (endpoints, payloads, idempotency).  
- ✅ Domain model designed (User).  
- ✅ Layers separated (Controller → Service → Repository).  
- ✅ Core code implemented (happy-path).  
- ✅ Concurrency handled.  
- ✅ Extensibility discussed (delete, list, DB).  

---

## Practice Exercises
1. Extend with `DELETE /v1/users/{id}`.  
2. Add a DB-backed repository (`users` table).  
3. Implement caching using the **Decorator pattern**.  
4. Make email updates asynchronous via a queue.  

---

## Conclusion
This intro combined:
- A **repeatable attack plan** for LLD problems.  
- A **concrete example** (User Management) with APIs, services, classes, and code.  
- Application of **SOLID principles, design patterns, and concurrency techniques**.  

By mastering this flow, you’ll be able to handle machine-coding interviews, implement robust services in production, and mentor others effectively.  

**Next Step:** Explore [Database Design & Indexing](/interview-section/lld/database-design) or attempt one of the exercises to deepen your skills.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
