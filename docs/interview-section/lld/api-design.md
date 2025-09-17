---
title: API Design - RESTful, Idempotency, Versioning
description: Learn low-level system design for RESTful API design in Java, focusing on idempotency and versioning for scalable systems.
---

# API Design: RESTful, Idempotency, Versioning

## Overview
Welcome to the third lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Designing RESTful APIs with idempotency and versioning is crucial for building scalable, maintainable systems. In this 20-minute lesson, we explore **low-level design principles for API design**, covering RESTful principles, idempotency to handle duplicate requests, and versioning for backward compatibility. Whether creating APIs for an e-commerce platform or preparing for FAANG interviews, this lecture equips you to design robust APIs. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Designing Data-Intensive Applications*, and *RESTful Web Services*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **RESTful API design** principles for modular, scalable systems.
- Learn **idempotency** to ensure safe retry operations.
- Explore **versioning** strategies for backward compatibility.
- Apply **OOP principles** (Section 2, Lecture 1), **design principles** (Section 4), and **HLD concepts** (Section 5) to API LLD.
- Write clean, modular Java code for APIs (Section 9).

## Why API Design Matters
Well-designed APIs ensure seamless communication, scalability, and maintainability in modern systems. Early in my career, I built a RESTful API for an e-commerce platform, using idempotency to handle retries and versioning to support legacy clients. These skills are critical for FAANG interviews, where candidates must design APIs that scale and evolve. Mastering API design showcases your ability to build robust systems and mentor others effectively.

In software engineering, API design helps you:
- **Enable Scalability**: Support high-traffic systems with RESTful principles.
- **Ensure Reliability**: Handle retries with idempotency.
- **Support Evolution**: Maintain compatibility with versioning.
- **Teach Effectively**: Share practical API design strategies.

## Key Concepts
### 1. RESTful API Principles
- **Resource-Based**: Model entities as resources (e.g., `/orders`, `/users`).
- **HTTP Methods**: Use GET (retrieve), POST (create), PUT (update), DELETE (remove).
- **Statelessness**: Each request contains all necessary information.
- **Uniform Interface**: Consistent endpoints and responses (e.g., JSON).
- **HATEOAS (Optional)**: Include links to related resources.

### 2. Idempotency
- **Definition**: Repeated requests produce the same result without side effects.
- **Example**: `PUT /orders/{id}` updates an order; multiple calls don’t duplicate data.
- **Implementation**: Use unique request IDs or check existing state.

### 3. Versioning
- **Strategies**:
  - URL Versioning: `/v1/orders` (simple, clear).
  - Header Versioning: `Accept: application/vnd.api.v1+json` (flexible, complex).
  - Query Parameter: `/orders?version=1` (less common).
- **Purpose**: Ensure backward compatibility for evolving APIs.

### 4. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation for API controllers and services.
- **Design Principles** (Section 4): SoC (Lecture 11) separates API logic; KISS (Lecture 8) simplifies endpoints.
- **HLD** (Section 5):
  - E-commerce Platform (Lecture 16): LLD for order APIs.
  - API Rate Limiter (Lecture 19): LLD for API throttling.
  - Event-Driven Architecture (Lecture 34): LLD for async API interactions.
  - LLD Intro (Lecture 1): Builds on class design for APIs.
  - Database Design (Lecture 2): APIs interact with normalized schemas.
- **Clean Code** (Section 9): Meaningful names for API components.

### 5. Use Case
Design a RESTful API for order management in an e-commerce platform, ensuring idempotency and versioning.

## System Design
### API Endpoints
- **POST /v1/orders**: Create an order (idempotent with request ID).
- **GET /v1/orders/{id}**: Retrieve an order.
- **PUT /v1/orders/{id}**: Update an order (idempotent).
- **Schema**: Order (order_id, user_id, amount, created_at).
- **Idempotency**: Use request IDs to prevent duplicate creations.
- **Versioning**: URL-based (`/v1/`), supporting future `/v2/`.

### Architecture
```
[Client] --> [OrderController]
                |
                v
            [OrderService]
                |
                v
           [OrderRepository] --> [Order]
                |
                v
           [Database (Orders)]
```

- **Classes**: `Order` (domain), `OrderService` (logic), `OrderController` (API).
- **Idempotency**: Check request ID or existing order before creation.
- **Versioning**: Handle `/v1/orders` with backward-compatible logic.
- **Trade-Offs**:
  - Idempotency: Request ID checks (reliable, extra storage) vs. state checks (simpler, less reliable).
  - Versioning: URL versioning (simple, clear) vs. header versioning (flexible, complex).

## Code Example: RESTful API with Idempotency and Versioning
Below is a Java implementation of a RESTful order management API using Spring Boot (simulated).

```java
import java.util.HashMap;
import java.util.Map;

// Domain model
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

// Repository interface
public interface OrderRepository {
    void saveOrder(Order order);
    Order getOrder(String orderId);
    boolean requestIdExists(String requestId);
    void saveRequestId(String requestId, String orderId);
}

// In-memory repository
public class InMemoryOrderRepository implements OrderRepository {
    private final Map<String, Order> orders = new HashMap<>();
    private final Map<String, String> requestIds = new HashMap<>();

    @Override
    public void saveOrder(Order order) {
        System.out.println("Saving order to database: " + order.getOrderId());
        orders.put(order.getOrderId(), order);
    }

    @Override
    public Order getOrder(String orderId) {
        System.out.println("Fetching order from database: " + orderId);
        return orders.getOrDefault(orderId, null);
    }

    @Override
    public boolean requestIdExists(String requestId) {
        return requestIds.containsKey(requestId);
    }

    @Override
    public void saveRequestId(String requestId, String orderId) {
        System.out.println("Saving request ID: " + requestId);
        requestIds.put(requestId, orderId);
    }
}

// Service layer with idempotency
public class OrderService {
    private final OrderRepository repository;

    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }

    public String createOrder(String userId, double amount, String requestId) {
        if (repository.requestIdExists(requestId)) {
            String orderId = repository.requestIds.get(requestId);
            System.out.println("Idempotent request detected: " + requestId);
            return orderId;
        }

        String orderId = "order-" + System.currentTimeMillis();
        Order order = new Order(orderId, userId, amount, System.currentTimeMillis());
        repository.saveOrder(order);
        repository.saveRequestId(requestId, orderId);
        return orderId;
    }

    public Order getOrder(String orderId) {
        Order order = repository.getOrder(orderId);
        if (order == null) {
            throw new IllegalArgumentException("Order not found: " + orderId);
        }
        return order;
    }

    public void updateOrder(String orderId, double amount) {
        Order order = getOrder(orderId);
        // Idempotent: Updating to same amount is safe
        order = new Order(orderId, order.getUserId(), amount, order.getCreatedAt());
        repository.saveOrder(order);
    }
}

// Controller for RESTful API (simulating Spring Boot)
public class OrderController {
    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    // POST /v1/orders
    public String handleCreateOrder(String userId, double amount, String requestId) {
        return service.createOrder(userId, amount, requestId);
    }

    // GET /v1/orders/{id}
    public Order handleGetOrder(String orderId) {
        return service.getOrder(orderId);
    }

    // PUT /v1/orders/{id}
    public void handleUpdateOrder(String orderId, double amount) {
        service.updateOrder(orderId, amount);
    }
}

// Client to demonstrate usage
public class OrderClient {
    public static void main(String[] args) {
        OrderRepository repository = new InMemoryOrderRepository();
        OrderService service = new OrderService(repository);
        OrderController controller = new OrderController(service);

        // Create order (idempotent)
        String requestId = "req-123";
        String orderId1 = controller.handleCreateOrder("user1", 100.0, requestId);
        System.out.println("Created order: " + orderId1);
        String orderId2 = controller.handleCreateOrder("user1", 100.0, requestId); // Idempotent retry
        System.out.println("Retry create order: " + orderId2);

        // Get order
        Order order = controller.handleGetOrder(orderId1);
        System.out.println("Retrieved order: ID=" + order.getOrderId() + ", Amount=" + order.getAmount());

        // Update order (idempotent)
        controller.handleUpdateOrder(orderId1, 150.0);
        controller.handleUpdateOrder(orderId1, 150.0); // Idempotent update
        order = controller.handleGetOrder(orderId1);
        System.out.println("Updated order: ID=" + order.getOrderId() + ", Amount=" + order.getAmount());
        // Output:
        // Saving order to database: order-<timestamp>
        // Saving request ID: req-123
        // Created order: order-<timestamp>
        // Idempotent request detected: req-123
        // Retry create order: order-<timestamp>
        // Fetching order from database: order-<timestamp>
        // Retrieved order: ID=order-<timestamp>, Amount=100.0
        // Fetching order from database: order-<timestamp>
        // Saving order to database: order-<timestamp>
        // Fetching order from database: order-<timestamp>
        // Saving order to database: order-<timestamp>
        // Fetching order from database: order-<timestamp>
        // Updated order: ID=order-<timestamp>, Amount=150.0
    }
}
```
- **LLD Principles**:
  - **RESTful**: Endpoints (`POST /v1/orders`, `GET /v1/orders/{id}`, `PUT /v1/orders/{id}`) follow REST conventions.
  - **Idempotency**: `createOrder` uses request IDs; `updateOrder` ensures safe retries.
  - **Versioning**: URL-based (`/v1/`), simulating versioned endpoints.
  - **Classes**: `Order` (domain), `OrderService` (logic), `OrderController` (API).
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates layers; DIP (Section 4, Lecture 6) uses interfaces.
- **Big O**: O(1) for `saveOrder`, `getOrder`, `requestIdExists` (HashMap).
- **Edge Cases**: Handles duplicate requests, missing orders with exceptions.

**UML Diagram**:
```
[Client] --> [OrderController]
                |
                v
            [OrderService]
                |
                v
           [OrderRepository] --> [Order]
                |
                v
           [Database (Orders)]
```

## Real-World Application
Imagine designing a RESTful API for an e-commerce platform, ensuring idempotency for reliable order creation and versioning for backward compatibility. This LLD—aligned with HLD from Section 5 (e.g., E-commerce Platform, Lecture 16)—ensures scalability and maintainability, critical for modern systems.

## Practice Exercises
Practice API design with these exercises:
- **Easy**: Design a UML diagram and Java code for a simple RESTful API (e.g., Product endpoint).
- **Medium**: Implement a RESTful API with idempotency for a domain model (e.g., Order).
- **Medium**: Design an LLD for a versioned API with Java, supporting multiple versions.
- **Hard**: Architect a RESTful API with Java, integrating idempotency, versioning, and rate limiting.

Try designing one API in Java with a UML diagram, explaining RESTful principles, idempotency, and versioning.

## Conclusion
Mastering RESTful API design with idempotency and versioning equips you to build scalable, reliable Java APIs, enhancing your LLD skills. This lecture builds on HLD concepts, preparing you for FAANG interviews and real-world systems.

**Next Step**: Explore [Concurrency Handling: Locks, Threads](/interview-section/lld/concurrency-handling) to continue your LLD journey, or check out [all sections](/interview-section/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>