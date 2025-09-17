---
title: Error Handling, Edge Cases, and Resilience
description: Learn low-level system design for error handling, edge cases, and resilience in Java, ensuring robust, scalable systems.
---

# Error Handling, Edge Cases, and Resilience

## Overview
Welcome to the fifth lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Error handling, edge cases, and resilience are critical for building robust systems that gracefully handle failures and unexpected inputs. In this 20-minute lesson, we explore **low-level design principles for error handling**, focusing on try-catch mechanisms, custom exceptions, edge case management, and resilience strategies like retries. Whether processing orders in an e-commerce platform or preparing for FAANG interviews, this lecture equips you to design reliable systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Java Concurrency in Practice*, and *Designing Data-Intensive Applications*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **error handling** principles using try-catch and custom exceptions.
- Learn to address **edge cases** for robust system design.
- Explore **resilience** strategies like retries and fallbacks.
- Apply **OOP principles** (Section 2, Lecture 1), **design principles** (Section 4), and **HLD concepts** (Section 5) to LLD.
- Write clean, resilient Java code (Section 9).

## Why Error Handling and Resilience Matter
Robust systems must handle errors and edge cases gracefully to ensure reliability and user trust. Early in my career, I designed an order processing system for an e-commerce platform, implementing retry logic to handle transient failures and custom exceptions for clear error reporting. These skills are critical for FAANG interviews, where candidates must design systems that withstand failures. Mastering error handling and resilience showcases your ability to build robust systems and mentor others effectively.

In software engineering, error handling and resilience help you:
- **Ensure Reliability**: Recover from failures without crashing.
- **Handle Edge Cases**: Manage unexpected inputs or states.
- **Improve User Experience**: Provide clear error messages.
- **Teach Effectively**: Share practical resilience strategies.

## Key Concepts
### 1. Error Handling
- **Try-Catch**: Handle exceptions to prevent system crashes.
- **Custom Exceptions**: Define specific exceptions for clear error reporting.
- **Logging**: Record errors for debugging and monitoring.

### 2. Edge Cases
- **Definition**: Unexpected or boundary conditions (e.g., null inputs, invalid data).
- **Examples**: Empty orders, duplicate IDs, network failures.
- **Strategy**: Validate inputs, test boundary conditions, and handle gracefully.

### 3. Resilience
- **Retries**: Retry transient failures (e.g., network timeouts).
- **Fallbacks**: Provide alternative paths for failures.
- **Circuit Breakers**: Prevent cascading failures in distributed systems.
- **Trade-Offs**: Retries (improve reliability, increase latency) vs. immediate failure (fast, less reliable).

### 4. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation for error handling logic.
- **Design Principles** (Section 4): SoC (Lecture 11) separates error handling; KISS (Lecture 8) simplifies logic.
- **HLD** (Section 5):
  - E-commerce Platform (Lecture 16): LLD for resilient order processing.
  - Payment Gateway (Lecture 25): LLD for transaction error handling.
  - LLD Intro (Lecture 1): Builds on modular design.
  - Database Design (Lecture 2): Error handling for database operations.
  - API Design (Lecture 3): Error handling for API responses.
  - Concurrency Handling (Lecture 4): Resilience in concurrent systems.
- **Clean Code** (Section 9): Meaningful exception names and logging.

### 5. Use Case
Design a resilient order processing system for an e-commerce platform, handling errors and edge cases with retry logic.

## System Design
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

- **Classes**: `Order` (domain), `OrderService` (logic with retries), `OrderController` (API).
- **Error Handling**: Try-catch for database errors; custom exceptions for invalid inputs.
- **Edge Cases**: Handle null inputs, duplicate orders, database failures.
- **Resilience**: Implement retry logic for transient database errors.
- **Trade-Offs**:
  - Retries: Improve reliability but increase latency.
  - Custom Exceptions: Clear but add code complexity.

## Code Example: Resilient Order Processing
Below is a Java implementation of a resilient order processing system with error handling and retries.

```java
import java.util.HashMap;
import java.util.Map;

// Custom exceptions
public class InvalidOrderException extends Exception {
    public InvalidOrderException(String message) {
        super(message);
    }
}

public class DatabaseFailureException extends Exception {
    public DatabaseFailureException(String message) {
        super(message);
    }
}

// Domain model
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

// Repository interface
public interface OrderRepository {
    void saveOrder(Order order) throws DatabaseFailureException;
    Order getOrder(String orderId) throws DatabaseFailureException;
}

// In-memory repository with simulated failures
public class InMemoryOrderRepository implements OrderRepository {
    private final Map<String, Order> orders = new HashMap<>();
    private int failureCount = 0;

    @Override
    public void saveOrder(Order order) throws DatabaseFailureException {
        if (failureCount < 2 && Math.random() < 0.5) { // Simulate transient failure
            failureCount++;
            throw new DatabaseFailureException("Transient database failure");
        }
        System.out.println("Saving order to database: " + order.getOrderId());
        orders.put(order.getOrderId(), order);
    }

    @Override
    public Order getOrder(String orderId) throws DatabaseFailureException {
        System.out.println("Fetching order from database: " + orderId);
        return orders.getOrDefault(orderId, null);
    }
}

// Service layer with retries
public class OrderService {
    private final OrderRepository repository;
    private final int maxRetries = 3;
    private final long retryDelayMs = 100;

    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }

    public void createOrder(String orderId, String userId, double amount) throws InvalidOrderException, DatabaseFailureException {
        if (orderId == null || userId == null || amount <= 0) {
            throw new InvalidOrderException("Invalid order data: ID=" + orderId + ", User=" + userId + ", Amount=" + amount);
        }
        if (repository.getOrder(orderId) != null) {
            throw new InvalidOrderException("Order already exists: " + orderId);
        }

        Order order = new Order(orderId, userId, amount);
        int attempt = 0;
        while (attempt < maxRetries) {
            try {
                repository.saveOrder(order);
                return;
            } catch (DatabaseFailureException e) {
                attempt++;
                if (attempt == maxRetries) {
                    throw new DatabaseFailureException("Failed to save order after " + maxRetries + " attempts: " + orderId);
                }
                try {
                    Thread.sleep(retryDelayMs); // Wait before retry
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    throw new RuntimeException("Retry interrupted", ie);
                }
                System.out.println("Retry attempt " + attempt + " for order: " + orderId);
            }
        }
    }

    public Order getOrder(String orderId) throws InvalidOrderException, DatabaseFailureException {
        if (orderId == null) {
            throw new InvalidOrderException("Invalid order ID: null");
        }
        Order order = repository.getOrder(orderId);
        if (order == null) {
            throw new InvalidOrderException("Order not found: " + orderId);
        }
        return order;
    }
}

// Controller for API interactions
public class OrderController {
    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    public void handleCreateOrder(String orderId, String userId, double amount) {
        try {
            service.createOrder(orderId, userId, amount);
            System.out.println("Created order: " + orderId);
        } catch (InvalidOrderException | DatabaseFailureException e) {
            System.err.println("Error creating order: " + e.getMessage());
        }
    }

    public Order handleGetOrder(String orderId) {
        try {
            return service.getOrder(orderId);
        } catch (InvalidOrderException | DatabaseFailureException e) {
            System.err.println("Error fetching order: " + e.getMessage());
            return null;
        }
    }
}

// Client to demonstrate usage
public class OrderClient {
    public static void main(String[] args) {
        OrderRepository repository = new InMemoryOrderRepository();
        OrderService service = new OrderService(repository);
        OrderController controller = new OrderController(service);

        // Edge case: Invalid input
        controller.handleCreateOrder(null, "user1", -100.0); // Invalid data
        // Edge case: Duplicate order
        controller.handleCreateOrder("order1", "user1", 100.0);
        controller.handleCreateOrder("order1", "user1", 100.0); // Duplicate
        // Normal case with retries
        controller.handleCreateOrder("order2", "user2", 200.0);
        // Fetch order
        Order order = controller.handleGetOrder("order2");
        if (order != null) {
            System.out.println("Retrieved order: ID=" + order.getOrderId() + ", Amount=" + order.getAmount());
        }
        // Edge case: Missing order
        controller.handleGetOrder("order3");
        // Output (varies due to simulated failures):
        // Error creating order: Invalid order data: ID=null, User=user1, Amount=-100.0
        // Saving order to database: order1
        // Created order: order1
        // Error creating order: Order already exists: order1
        // Transient database failure
        // Retry attempt 1 for order: order2
        // Saving order to database: order2
        // Created order: order2
        // Fetching order from database: order2
        // Retrieved order: ID=order2, Amount=200.0
        // Fetching order from database: order3
        // Error fetching order: Order not found: order3
    }
}
```
- **LLD Principles**:
  - **Error Handling**: Try-catch for database errors; `InvalidOrderException` for input validation.
  - **Edge Cases**: Handles null inputs, negative amounts, duplicate orders, missing orders.
  - **Resilience**: Retry logic for transient database failures.
  - **Classes**: `Order` (domain), `OrderService` (logic with retries), `OrderController` (API).
  - **Clean Code**: Meaningful exception names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates error handling; DIP (Section 4, Lecture 6) uses interfaces.
- **Big O**: O(1) for `saveOrder`, `getOrder` (HashMap).
- **Edge Cases**: Null inputs, duplicates, transient failures handled.

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
Imagine designing a resilient order processing system for an e-commerce platform, handling errors like invalid inputs and database failures with retries. This LLD—aligned with HLD from Section 5 (e.g., E-commerce Platform, Lecture 16)—ensures reliability and user trust, critical for scalable systems.

## Practice Exercises
Practice error handling and resilience with these exercises:
- **Easy**: Design a UML diagram and Java code for a simple system with try-catch error handling.
- **Medium**: Implement a service with custom exceptions for edge cases (e.g., invalid inputs).
- **Medium**: Design an LLD for a resilient system with retry logic in Java.
- **Hard**: Architect a system with Java, integrating retries, circuit breakers, and custom exceptions.

Try designing one system in Java with a UML diagram, explaining error handling and resilience strategies.

## Conclusion
Mastering error handling, edge cases, and resilience equips you to build reliable, scalable Java systems, enhancing your LLD skills. This lecture builds on HLD concepts, preparing you for FAANG interviews and real-world systems.

**Next Step**: Explore [Design a Parking Lot System](/interview-section/lld/parking-lot) to continue your LLD journey, or check out [all sections](/interview-section/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>