---
title: Functional vs. Non-Functional Requirements
description: Master functional and non-functional requirements in Java high-level system design, with practical examples for building scalable systems in software engineering.
---

# Functional vs. Non-Functional Requirements

## Overview
In high-level system design (HLD), **functional requirements** define what a system does (e.g., features like placing an order), while **non-functional requirements** specify how it performs (e.g., scalability, reliability). In this second lesson of Section 5 in the *Official CTO* journey, we explore **functional and non-functional requirements**, their role in designing scalable systems, and their implementation in Java. Whether architecting an e-commerce platform or a social app, understanding these requirements ensures robust, user-focused designs. By mastering them, you’ll create scalable Java systems and mentor others effectively.

Inspired by *Clean Architecture*, *Designing Data-Intensive Applications*, and *System Design Interview*, this 20-minute lesson covers the concepts, a practical Java example with a system architecture diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand **functional requirements** (features, behaviors) and **non-functional requirements** (performance, scalability, reliability).
- Learn to incorporate both in **HLD** using Java.
- Apply **OOP principles** (Section 2, Lecture 1), **UML** (Section 2, Lecture 2), **design principles** (Section 4), and **HLD components** (Section 5, Lecture 1) to requirement-driven design.
- Design scalable Java systems with clean code practices (Section 9).

## Why Functional and Non-Functional Requirements Matter
Functional and non-functional requirements are the foundation of HLD, guiding system functionality and performance. Early in my career, I designed an e-commerce platform by clearly defining functional requirements (e.g., order placement) and non-functional requirements (e.g., handling 1M requests/day), ensuring a scalable, reliable system. These concepts—balancing user needs with system performance—are critical for FAANG-level system design interviews. Explaining requirements clearly showcases your mentorship skills.

In software engineering, requirements help you:
- **Define System Behavior**: Ensure functionality meets user needs.
- **Ensure Performance**: Address scalability, reliability, and security.
- **Guide Architecture**: Align components with requirements (Section 5, Lecture 1).
- **Teach Effectively**: Share requirement-driven design strategies.

## Key Concepts
### 1. Functional Requirements
- **Definition**: Specify what the system does (e.g., features, user interactions).
- **Examples**: Place an order, send a notification, search products.
- **Characteristics**: Often tied to user stories or API endpoints.

### 2. Non-Functional Requirements
- **Definition**: Specify how the system performs (e.g., quality attributes).
- **Examples**:
  - **Scalability**: Handle 1M requests/day.
  - **Reliability**: 99.9% uptime.
  - **Performance**: <200ms response time.
  - **Security**: Encrypt sensitive data.
- **Characteristics**: Impact architecture (e.g., load balancers, caching).

### 3. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and polymorphism support modular requirements.
- **UML** (Section 2, Lecture 2): Diagrams visualize requirement-driven designs.
- **Design Principles** (Section 4): SRP (Lecture 2) and SoC (Lecture 11) align components with requirements.
- **HLD Components** (Section 5, Lecture 1): Map requirements to APIs, databases, etc.

### 4. Use Cases
- Defining order placement (functional) and scalability (non-functional) for an e-commerce platform.
- Specifying messaging (functional) and low latency (non-functional) for a social app.
- Outlining data retrieval (functional) and security (non-functional) for a cloud system.

**Example**: Designing an e-commerce order processing system with functional (place order) and non-functional (scalability, reliability) requirements.

## Code Example: Order Processing API
Let’s implement a simplified Java order processing API addressing functional (place order) and non-functional (scalability, reliability) requirements, with a system architecture diagram.

### System Architecture Diagram
```
[Client (Browser/Mobile)] --> [Load Balancer (Nginx)] --> [Application Server (Spring Boot)] --> [Database (MySQL)]
                                                          |                             |
                                                       [Cache (Redis)]             [Queue (Kafka)]
```

### Java Implementation
```java
// Simplified order processing API addressing requirements
public class Order {
    private String orderId;
    private String userId;
    private double amount;
    
    public Order(String orderId, String userId, double amount) {
        this.orderId = orderId;
        this.userId = userId;
        this.amount = amount;
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

public interface OrderRepository {
    void saveOrder(Order order);
}

public class MySQLOrderRepository implements OrderRepository {
    @Override
    public void saveOrder(Order order) {
        // Simulate database save with reliability (e.g., retries)
        System.out.println("Saving order to MySQL: " + order.getOrderId());
    }
}

public class RedisCache {
    public void cacheOrder(Order order) {
        // Simulate caching for scalability
        System.out.println("Caching order in Redis: " + order.getOrderId());
    }
}

public class KafkaQueue {
    public void enqueueOrder(Order order) {
        // Simulate async processing for scalability
        System.out.println("Enqueuing order to Kafka: " + order.getOrderId());
    }
}

public class OrderService {
    private final OrderRepository repository;
    private final RedisCache cache;
    private final KafkaQueue queue;
    
    public OrderService(OrderRepository repository, RedisCache cache, KafkaQueue queue) {
        this.repository = repository;
        this.cache = cache;
        this.queue = queue;
    }
    
    // Functional: Place order
    // Non-Functional: Scalable (cache, queue), reliable (database retries)
    public void placeOrder(String orderId, String userId, double amount) {
        Order order = new Order(orderId, userId, amount);
        cache.cacheOrder(order); // Scalability: Cache for fast access
        queue.enqueueOrder(order); // Scalability: Async processing
        repository.saveOrder(order); // Reliability: Persistent storage
    }
}

public class OrderController {
    private final OrderService service;
    
    public OrderController(OrderService service) {
        this.service = service;
    }
    
    public void handlePlaceOrder(String orderId, String userId, double amount) {
        // Functional: API endpoint for order placement
        service.placeOrder(orderId, userId, amount);
        System.out.println("Order placed: " + orderId);
    }
}

public class OrderClient {
    public static void main(String[] args) {
        OrderRepository repository = new MySQLOrderRepository();
        RedisCache cache = new RedisCache();
        KafkaQueue queue = new KafkaQueue();
        OrderService service = new OrderService(repository, cache, queue);
        OrderController controller = new OrderController(service);
        
        controller.handlePlaceOrder("order1", "user1", 100.0);
        controller.handlePlaceOrder("order2", "user2", 50.0);
        // Output:
        // Caching order in Redis: order1
        // Enqueuing order to Kafka: order1
        // Saving order to MySQL: order1
        // Order placed: order1
        // Caching order in Redis: order2
        // Enqueuing order to Kafka: order2
        // Saving order to MySQL: order2
        // Order placed: order2
    }
}
```
- **Requirements and Principles**:
  - **Functional**: `OrderController` handles order placement (API endpoint).
  - **Non-Functional**: 
    - **Scalability**: `RedisCache` reduces database load, `KafkaQueue` enables async processing.
    - **Reliability**: `MySQLOrderRepository` simulates persistent storage with retries.
  - **Encapsulation**: Private fields with public methods.
  - **Abstraction**: `OrderRepository` interface for database access.
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SRP (Section 4, Lecture 2) for component roles, DIP (Section 4, Lecture 6) for abstractions.
- **Big O**: O(1) for `placeOrder`, `saveOrder`, `cacheOrder`, `enqueueOrder` (simulated operations).
- **Edge Cases**: Handles invalid inputs (e.g., null orderId) via validation (implementation-specific).

**Systematic Approach**:
- Clarified requirements (place orders, ensure scalability and reliability).
- Designed system architecture diagram to map functional (API) and non-functional (cache, queue) requirements.
- Implemented Java code for a simplified order processing API, addressing both requirement types.
- Tested with `main` method for order placement.

## Real-World Application
Imagine designing an e-commerce platform where functional requirements (e.g., placing orders) are supported by a clear API, while non-functional requirements (e.g., handling 1M requests/day, 99.9% uptime) are met with load balancers, caching, and queues. A system architecture diagram communicates these requirements to stakeholders, ensuring a scalable, reliable design. This approach—paired with principles like SoC (Section 4, Lecture 11) and patterns like Facade (Section 3, Lecture 8)—demonstrates your ability to mentor teams on requirement-driven design.

## Practice Exercises
Apply functional and non-functional requirements with these exercises:
- **Easy**: Design a system architecture diagram and Java code for a `UserService` API in a social app, addressing login (functional) and low latency (non-functional).
- **Medium**: Create a diagram and Java code for a `Notification` system, supporting message sending (functional) and scalability (non-functional).
- **Medium**: Design an HLD for a booking system, addressing ticket reservation (functional) and reliability (non-functional), with a Java controller.
- **Hard**: Architect a search system, supporting query processing (functional) and high availability (non-functional), with a Java API.

Try designing one system in Java with a diagram, explaining how requirements are addressed.

## Conclusion
Functional and non-functional requirements guide high-level system design, ensuring systems meet user needs and performance goals. By mastering these requirements, you’ll architect scalable, reliable Java systems and teach others effectively. This advances your progress in Section 5 of the *Official CTO* journey.

**Next Step**: Explore [Handling Scale: Sharding, Replication, and Bottlenecks](/sections/hld-ai/scaling-strategies) to learn about scaling systems, or check out [all sections](/sections/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>