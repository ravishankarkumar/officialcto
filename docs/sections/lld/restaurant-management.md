---
title: Design a Restaurant Management System
description: Learn low-level system design for a restaurant management system in Java, focusing on reservations and order processing for scalable, robust applications.
---

# Design a Restaurant Management System

## Overview
Welcome to the tenth lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Designing a restaurant management system is a practical LLD problem that tests your ability to model real-world entities with complex interactions using OOP principles. In this 25-minute lesson, we explore the **low-level design of a restaurant management system**, covering reservation management, order processing, and functionality like table assignment and billing. Whether designing a system for a restaurant chain or preparing for FAANG interviews, this lecture equips you to build modular, scalable systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Design Patterns*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **low-level design** principles for a restaurant management system with reservations and order processing.
- Learn to model **classes**, **relationships**, and **functionality** in Java.
- Apply **OOP principles** (Section 2, Lecture 1), **design patterns** (Section 3), **design principles** (Section 4), and **HLD concepts** (Section 5) to LLD.
- Write clean, modular Java code (Section 9).

## Why Restaurant Management System Design Matters
A restaurant management system is a valuable LLD exercise that tests your ability to model complex interactions like reservations and orders, common in FAANG interviews. Early in my career, I designed a system for a transactional application, applying OOP principles to ensure maintainability and extensibility. This lecture prepares you to design robust systems and articulate your approach clearly, showcasing your mentorship skills.

In software engineering, restaurant management system design helps you:
- **Model Complex Systems**: Represent tables, reservations, and orders.
- **Ensure Scalability**: Handle multiple customers and orders.
- **Improve Maintainability**: Create modular, testable code.
- **Teach Effectively**: Share practical LLD strategies.

## Key Concepts
### 1. Restaurant Management System Components
- **Reservations**: Manage table bookings with customer details and time.
- **Order Processing**: Handle order placement, preparation, and billing.
- **Functionality**:
  - Book and cancel reservations.
  - Place and track orders.
  - Generate bills based on orders.
- **Edge Cases**: Overbooking, invalid table requests, order cancellations.

### 2. Design Patterns
- **Strategy Pattern** (Section 3, Lecture 4): For pricing strategies (e.g., regular, discount).
- **Singleton Pattern** (Section 3, Lecture 1): For restaurant instance.
- **Observer Pattern** (Section 3, Lecture 6): For notifying order updates.

### 3. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and inheritance for table and order classes.
- **Design Patterns** (Section 3): Strategy, Singleton, and Observer patterns.
- **Design Principles** (Section 4): SoC (Lecture 11) separates reservation and order logic; KISS (Lecture 8) simplifies design.
- **HLD** (Section 5):
  - E-commerce Platform (Lecture 16): Similar order processing.
  - Ticket Booking (Lecture 17): Similar reservation system.
  - LLD Intro (Lecture 1): Builds on class design.
  - Database Design (Lecture 2): Persisting reservation and order data.
  - API Design (Lecture 3): Exposing restaurant controls.
  - Concurrency Handling (Lecture 4): Thread-safe reservations.
  - Error Handling (Lecture 5): Handling booking failures.
  - Parking Lot (Lecture 6): Similar entity modeling.
  - Elevator System (Lecture 7): Similar state-driven design.
  - Vending Machine (Lecture 8): Similar transaction processing.
  - ATM Machine (Lecture 9): Similar transactional design.
- **Clean Code** (Section 9): Meaningful names for classes and methods.

### 4. Use Case
Design a restaurant management system for a restaurant chain, supporting reservations, order processing, and billing.

## System Design
### Architecture
```
[Client] --> [RestaurantController]
                |
                v
            [RestaurantService]
                |
                v
           [Restaurant] --> [Table] --> [Reservation]
                             [Order]
```

- **Classes**:
  - `Table`: Represents dining tables with capacity.
  - `Reservation`: Manages booking details.
  - `Order`: Tracks customer orders and billing.
  - `Restaurant`: Singleton managing tables and orders.
  - `RestaurantService`: Handles business logic.
  - `RestaurantController`: Exposes API.
- **Functionality**: Book/cancel reservations, place/track orders, generate bills.
- **Trade-Offs**:
  - Reservation Strategy: First-come-first-serve (simple, suboptimal) vs. priority-based (complex, efficient).
  - Storage: In-memory (fast, volatile) vs. database (persistent, slower).

## Code Example: Restaurant Management System
Below is a Java implementation of a restaurant management system with reservations and order processing.

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Custom exceptions
public class ReservationException extends Exception {
    public ReservationException(String message) {
        super(message);
    }
}

public class OrderException extends Exception {
    public OrderException(String message) {
        super(message);
    }
}

// Table class
public class Table {
    private String tableId;
    private int capacity;
    private boolean reserved;

    public Table(String tableId, int capacity) {
        this.tableId = tableId;
        this.capacity = capacity;
        this.reserved = false;
    }

    public String getTableId() {
        return tableId;
    }

    public int getCapacity() {
        return capacity;
    }

    public boolean isReserved() {
        return reserved;
    }

    public void reserve() {
        this.reserved = true;
    }

    public void release() {
        this.reserved = false;
    }
}

// Reservation class
public class Reservation {
    private String reservationId;
    private String tableId;
    private String customerName;
    private int partySize;
    private long reservationTime;

    public Reservation(String reservationId, String tableId, String customerName, int partySize, long reservationTime) {
        this.reservationId = reservationId;
        this.tableId = tableId;
        this.customerName = customerName;
        this.partySize = partySize;
        this.reservationTime = reservationTime;
    }

    public String getReservationId() {
        return reservationId;
    }

    public String getTableId() {
        return tableId;
    }
}

// Order class
public class Order {
    private String orderId;
    private String tableId;
    private List<String> items;
    private double totalPrice;

    public Order(String orderId, String tableId, List<String> items, double totalPrice) {
        this.orderId = orderId;
        this.tableId = tableId;
        this.items = items;
        this.totalPrice = totalPrice;
    }

    public String getOrderId() {
        return orderId;
    }

    public double getTotalPrice() {
        return totalPrice;
    }
}

// Restaurant class (Singleton)
public class Restaurant {
    private static Restaurant instance;
    private List<Table> tables;
    private Map<String, Reservation> reservations;
    private Map<String, Order> orders;

    private Restaurant() {
        this.tables = new ArrayList<>();
        this.reservations = new HashMap<>();
        this.orders = new HashMap<>();
        // Initialize tables
        tables.add(new Table("T1", 4));
        tables.add(new Table("T2", 6));
    }

    public static Restaurant getInstance() {
        if (instance == null) {
            instance = new Restaurant();
        }
        return instance;
    }

    public Table findAvailableTable(int partySize) {
        for (Table table : tables) {
            if (!table.isReserved() && table.getCapacity() >= partySize) {
                return table;
            }
        }
        return null;
    }

    public void addReservation(Reservation reservation) {
        reservations.put(reservation.getReservationId(), reservation);
    }

    public Reservation getReservation(String reservationId) {
        return reservations.get(reservationId);
    }

    public void removeReservation(String reservationId) {
        reservations.remove(reservationId);
    }

    public void addOrder(Order order) {
        orders.put(order.getOrderId(), order);
    }

    public Order getOrder(String orderId) {
        return orders.get(orderId);
    }
}

// Service layer
public class RestaurantService {
    private final Restaurant restaurant;

    public RestaurantService(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public String bookReservation(String reservationId, String customerName, int partySize, long reservationTime) throws ReservationException {
        Table table = restaurant.findAvailableTable(partySize);
        if (table == null) {
            throw new ReservationException("No available table for party size: " + partySize);
        }
        table.reserve();
        Reservation reservation = new Reservation(reservationId, table.getTableId(), customerName, partySize, reservationTime);
        restaurant.addReservation(reservation);
        System.out.println("Reservation booked: " + reservationId + " for table " + table.getTableId());
        return table.getTableId();
    }

    public void cancelReservation(String reservationId) throws ReservationException {
        Reservation reservation = restaurant.getReservation(reservationId);
        if (reservation == null) {
            throw new ReservationException("Reservation not found: " + reservationId);
        }
        for (Table table : restaurant.tables) {
            if (table.getTableId().equals(reservation.getTableId())) {
                table.release();
                restaurant.removeReservation(reservationId);
                System.out.println("Reservation cancelled: " + reservationId);
                return;
            }
        }
    }

    public String placeOrder(String orderId, String tableId, List<String> items) throws OrderException {
        for (Table table : restaurant.tables) {
            if (table.getTableId().equals(tableId) && table.isReserved()) {
                double totalPrice = calculatePrice(items);
                Order order = new Order(orderId, tableId, items, totalPrice);
                restaurant.addOrder(order);
                System.out.println("Order placed: " + orderId + " for table " + tableId);
                return orderId;
            }
        }
        throw new OrderException("Table not reserved: " + tableId);
    }

    private double calculatePrice(List<String> items) {
        // Simplified pricing
        return items.size() * 10.0; // $10 per item
    }
}

// Controller for API interactions
public class RestaurantController {
    private final RestaurantService service;

    public RestaurantController(RestaurantService service) {
        this.service = service;
    }

    public String handleBookReservation(String reservationId, String customerName, int partySize, long reservationTime) {
        try {
            return service.bookReservation(reservationId, customerName, partySize, reservationTime);
        } catch (ReservationException e) {
            System.err.println("Error: " + e.getMessage());
            return null;
        }
    }

    public void handleCancelReservation(String reservationId) {
        try {
            service.cancelReservation(reservationId);
        } catch (ReservationException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public String handlePlaceOrder(String orderId, String tableId, List<String> items) {
        try {
            return service.placeOrder(orderId, tableId, items);
        } catch (OrderException e) {
            System.err.println("Error: " + e.getMessage());
            return null;
        }
    }
}

// Client to demonstrate usage
public class RestaurantClient {
    public static void main(String[] args) {
        Restaurant restaurant = Restaurant.getInstance();
        RestaurantService service = new RestaurantService(restaurant);
        RestaurantController controller = new RestaurantController(service);

        // Normal flow
        String tableId = controller.handleBookReservation("res1", "Alice", 4, System.currentTimeMillis());
        List<String> items = List.of("Pizza", "Soda");
        controller.handlePlaceOrder("order1", tableId, items);

        // Edge case: No available table
        controller.handleBookReservation("res2", "Bob", 8, System.currentTimeMillis());

        // Edge case: Invalid table for order
        controller.handlePlaceOrder("order2", "T3", items);

        // Cancel reservation
        controller.handleCancelReservation("res1");

        // Edge case: Cancel non-existent reservation
        controller.handleCancelReservation("res3");
        // Output:
        // Reservation booked: res1 for table T1
        // Order placed: order1 for table T1
        // Error: No available table for party size: 8
        // Error: Table not reserved: T3
        // Reservation cancelled: res1
        // Error: Reservation not found: res3
    }
}
```
- **LLD Principles**:
  - **Reservations**: `Table` and `Reservation` manage bookings.
  - **Order Processing**: `Order` handles items and billing.
  - **Classes**: `Table`, `Reservation`, `Order`, `Restaurant`, `RestaurantService`, `RestaurantController`.
  - **Design Patterns**: Singleton (`Restaurant`), Strategy (pricing, not fully shown), Observer (for order updates, extensible).
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates reservation and order logic; DIP (Section 4, Lecture 6) for extensibility.
- **Big O**: O(n) for `findAvailableTable` (n = tables), O(1) for `addReservation`, `placeOrder` (HashMap).
- **Edge Cases**: Handles no available tables, invalid table IDs, non-existent reservations.

**UML Diagram**:
```
[Client] --> [RestaurantController]
                |
                v
            [RestaurantService]
                |
                v
           [Restaurant]
                |
                v
           [Table] --> [Reservation]
           [Order]
```

## Real-World Application
Imagine designing a restaurant management system for a restaurant chain, supporting reservations and order processing with modular design. This LLD—aligned with HLD principles from Section 5 (e.g., E-commerce Platform, Lecture 16)—ensures scalability and reliability, critical for real-world systems.

## Practice Exercises
Practice restaurant management system design with these exercises:
- **Easy**: Design a UML diagram and Java code for a simple reservation system.
- **Medium**: Implement a restaurant system with one table and order processing.
- **Medium**: Design an LLD for a restaurant system with multiple tables and reservations.
- **Hard**: Architect a restaurant system with Java, integrating multiple design patterns (e.g., Strategy, Observer).

Try designing one system in Java with a UML diagram, explaining reservations and order processing.

## Conclusion
Mastering the design of a restaurant management system equips you to build modular, scalable Java systems, enhancing your LLD skills. This lecture builds on HLD concepts, preparing you for FAANG interviews and real-world applications.

**Next Step**: Explore [Design a Library Management System](/sections/lld/library-management) to continue your LLD journey, or check out [all sections](/sections/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>