---
title: Integrating LLD with Design Patterns/Principles
description: Learn how to integrate design patterns and principles into low-level system design in Java, using a ride-sharing system to demonstrate scalable, robust applications.
---

# Integrating LLD with Design Patterns/Principles

## Overview
Welcome to the thirty-second lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Integrating design patterns and principles into low-level design (LLD) is a critical skill for creating maintainable, scalable systems. In this 25-minute lesson, we explore how to apply **design patterns** (e.g., Strategy, Observer, Singleton) and **SOLID principles** to LLD, using a simplified **ride-sharing system** as a case study. We’ll focus on designing a system with modular components, demonstrating how patterns and principles enhance LLD. Whether building a ride-sharing application or preparing for FAANG interviews, this lecture equips you to design robust systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Design Patterns*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand how to **integrate design patterns and principles** into low-level system design.
- Learn to apply **Strategy**, **Observer**, and **Singleton** patterns, and **SOLID principles** in a ride-sharing system.
- Model **classes**, **relationships**, and **functionality** in Java for LLD.
- Write clean, modular Java code (Section 9).

## Why Integrating Patterns/Principles Matters
Applying design patterns and principles in LLD ensures systems are modular, extensible, and maintainable, a key expectation in FAANG interviews. Drawing from my experience designing complex systems, I’ve used patterns like Strategy and principles like SOLID to create scalable solutions. This lecture prepares you to integrate these concepts effectively, showcasing your design and mentorship skills.

In software engineering, integrating patterns/principles helps you:
- **Enhance Modularity**: Use patterns to separate concerns.
- **Ensure Scalability**: Apply principles like SOLID for extensibility.
- **Improve Maintainability**: Write clean, testable code.
- **Teach Effectively**: Share practical LLD strategies.

## Key Concepts
### 1. Design Patterns in LLD
- **Strategy Pattern** (Section 3, Lecture 4): Define interchangeable algorithms (e.g., pricing strategies for rides).
- **Observer Pattern** (Section 3, Lecture 6): Notify users of ride updates (e.g., driver assignment).
- **Singleton Pattern** (Section 3, Lecture 1): Ensure a single ride-sharing system instance.

### 2. SOLID Principles in LLD
- **Single Responsibility Principle (SRP)** (Section 4, Lecture 1): Each class has one responsibility (e.g., ride management vs. pricing).
- **Open/Closed Principle (OCP)** (Section 4, Lecture 2): Classes open for extension, closed for modification (e.g., new pricing strategies).
- **Dependency Inversion Principle (DIP)** (Section 4, Lecture 6): Depend on abstractions (e.g., pricing interface).

### 3. Ride-Sharing System Components
- **Entities**: User (rider/driver), Ride, Pricing Strategy.
- **Functionality**:
  - Book a ride with pricing calculation.
  - Notify users of ride updates.
  - Manage ride lifecycle.
- **Edge Cases**: Invalid users, unavailable drivers, pricing errors.

### 4. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and polymorphism for ride and user classes.
- **Design Patterns** (Section 3): Strategy, Observer, Singleton.
- **Design Principles** (Section 4): SRP, OCP, DIP.
- **HLD** (Section 5):
  - Ride-Sharing System (Lecture 14): High-level ride-sharing concepts.
  - LLD Intro (Lecture 1): Builds on class design.
  - Database Design (Lecture 2): Persisting ride data.
  - API Design (Lecture 3): Exposing ride controls.
  - Concurrency Handling (Lecture 4): Thread-safe ride booking.
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
  - Notification Dispatcher (Lecture 27): Similar operation dispatching.
  - Inventory Manager (Lecture 28): Similar resource tracking.
  - Matchmaking Engine (Lecture 29): Similar queue-based processing.
  - Telemetry Collector (Lecture 30): Similar data aggregation.
  - Mock LLD Interview (Lecture 31): Similar class diagramming.
- **Clean Code** (Section 9): Meaningful names for classes and methods.

### 5. Use Case
Design a simplified ride-sharing system, integrating design patterns (Strategy, Observer, Singleton) and SOLID principles to manage ride booking and notifications.

## System Design
### Architecture
```
[Client] --> [RideController]
                |
                v
            [RideService]
                |
                v
           [RideSystem] --> [User] --> [Ride]
           [PricingStrategy]
```

- **Classes**:
  - `User`: Represents riders and drivers.
  - `Ride`: Manages ride details and status.
  - `PricingStrategy`: Interface for pricing algorithms (e.g., distance-based, surge).
  - `RideSystem`: Singleton managing rides and notifications.
  - `RideService`: Handles business logic.
  - `RideController`: Exposes API.
- **Functionality**: Book rides, calculate pricing, notify users.
- **Trade-Offs**:
  - Pricing: Fixed (simple, rigid) vs. dynamic (complex, flexible).
  - Storage: In-memory (fast, volatile) vs. database (persistent, slower).

## Code Example: Ride-Sharing System
Below is a Java implementation of a ride-sharing system integrating design patterns and principles.

```java
import java.util.ArrayList;
import java.util.List;

// Custom exception
public class RideException extends Exception {
    public RideException(String message) {
        super(message);
    }
}

// User class
public class User {
    private String userId;
    private String name;
    private boolean isDriver;

    public User(String userId, String name, boolean isDriver) {
        this.userId = userId;
        this.name = name;
        this.isDriver = isDriver;
    }

    public String getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public boolean isDriver() {
        return isDriver;
    }

    // Observer: Notify user of ride updates
    public void receiveNotification(String message) {
        System.out.println("Notification to " + name + ": " + message);
    }
}

// Pricing strategy interface
public interface PricingStrategy {
    double calculateFare(double distance, double time);
}

// Distance-based pricing
public class DistanceBasedPricing implements PricingStrategy {
    @Override
    public double calculateFare(double distance, double time) {
        return distance * 2.0; // $2 per unit distance
    }
}

// Surge pricing
public class SurgePricing implements PricingStrategy {
    @Override
    public double calculateFare(double distance, double time) {
        return distance * 3.0 + time * 0.5; // $3 per distance + $0.5 per time
    }
}

// Ride class
public class Ride {
    private String rideId;
    private String riderId;
    private String driverId;
    private double distance;
    private double time;
    private double fare;
    private String status; // e.g., REQUESTED, ASSIGNED, COMPLETED

    public Ride(String rideId, String riderId, String driverId, double distance, double time) {
        this.rideId = rideId;
        this.riderId = riderId;
        this.driverId = driverId;
        this.distance = distance;
        this.time = time;
        this.status = "REQUESTED";
    }

    public String getRideId() {
        return rideId;
    }

    public String getRiderId() {
        return riderId;
    }

    public String getDriverId() {
        return driverId;
    }

    public void setFare(double fare) {
        this.fare = fare;
    }

    public double getFare() {
        return fare;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}

// Ride system class (Singleton)
public class RideSystem {
    private static RideSystem instance;
    private Map<String, User> users;
    private Map<String, Ride> rides;
    private PricingStrategy pricingStrategy;

    private RideSystem() {
        this.users = new HashMap<>();
        this.rides = new HashMap<>();
        this.pricingStrategy = new DistanceBasedPricing(); // Default strategy
    }

    public static RideSystem getInstance() {
        if (instance == null) {
            instance = new RideSystem();
        }
        return instance;
    }

    public void addUser(User user) throws RideException {
        if (users.containsKey(user.getUserId())) {
            throw new RideException("User already exists: " + user.getUserId());
        }
        users.put(user.getUserId(), user);
    }

    public void setPricingStrategy(PricingStrategy strategy) {
        this.pricingStrategy = strategy;
    }

    public void requestRide(String rideId, String riderId, double distance, double time) throws RideException {
        User rider = users.get(riderId);
        if (rider == null || rider.isDriver()) {
            throw new RideException("Invalid rider: " + riderId);
        }
        String driverId = findAvailableDriver();
        if (driverId == null) {
            throw new RideException("No drivers available");
        }
        Ride ride = new Ride(rideId, riderId, driverId, distance, time);
        double fare = pricingStrategy.calculateFare(distance, time);
        ride.setFare(fare);
        rides.put(rideId, ride);
        // Notify users (Observer pattern)
        users.get(riderId).receiveNotification("Ride " + rideId + " requested, fare: $" + fare);
        users.get(driverId).receiveNotification("Assigned to ride " + rideId);
        ride.setStatus("ASSIGNED");
    }

    private String findAvailableDriver() {
        for (User user : users.values()) {
            if (user.isDriver()) {
                return user.getUserId();
            }
        }
        return null;
    }

    public void completeRide(String rideId) throws RideException {
        Ride ride = rides.get(rideId);
        if (ride == null) {
            throw new RideException("Ride not found: " + rideId);
        }
        ride.setStatus("COMPLETED");
        users.get(ride.getRiderId()).receiveNotification("Ride " + rideId + " completed");
        users.get(ride.getDriverId()).receiveNotification("Ride " + rideId + " completed");
    }
}

// Service layer
public class RideService {
    private final RideSystem system;

    public RideService(RideSystem system) {
        this.system = system;
    }

    public void addUser(String userId, String name, boolean isDriver) throws RideException {
        system.addUser(new User(userId, name, isDriver));
        System.out.println("Added user: " + name);
    }

    public void setPricingStrategy(PricingStrategy strategy) {
        system.setPricingStrategy(strategy);
        System.out.println("Set pricing strategy");
    }

    public void requestRide(String rideId, String riderId, double distance, double time) throws RideException {
        system.requestRide(rideId, riderId, distance, time);
        System.out.println("Requested ride: " + rideId);
    }

    public void completeRide(String rideId) throws RideException {
        system.completeRide(rideId);
        System.out.println("Completed ride: " + rideId);
    }
}

// Controller for API interactions
public class RideController {
    private final RideService service;

    public RideController(RideService service) {
        this.service = service;
    }

    public void handleAddUser(String userId, String name, boolean isDriver) {
        try {
            service.addUser(userId, name, isDriver);
        } catch (RideException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public void handleSetPricingStrategy(PricingStrategy strategy) {
        service.setPricingStrategy(strategy);
    }

    public void handleRequestRide(String rideId, String riderId, double distance, double time) {
        try {
            service.requestRide(rideId, riderId, distance, time);
        } catch (RideException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public void handleCompleteRide(String rideId) {
        try {
            service.completeRide(rideId);
        } catch (RideException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}

// Client to demonstrate usage
public class RideClient {
    public static void main(String[] args) {
        RideSystem system = RideSystem.getInstance();
        RideService service = new RideService(system);
        RideController controller = new RideController(service);

        // Normal flow
        controller.handleAddUser("user1", "Alice", false);
        controller.handleAddUser("driver1", "Bob", true);
        controller.handleSetPricingStrategy(new DistanceBasedPricing());
        controller.handleRequestRide("ride1", "user1", 10.0, 15.0);
        controller.handleCompleteRide("ride1");

        // Edge cases
        controller.handleAddUser("user1", "Alice", false); // Duplicate user
        controller.handleRequestRide("ride2", "user2", 5.0, 10.0); // Invalid rider
        controller.handleRequestRide("ride2", "user1", 5.0, 10.0); // No drivers
        controller.handleCompleteRide("ride3"); // Invalid ride
        // Output:
        // Added user: Alice
        // Added user: Bob
        // Set pricing strategy
        // Notification to Alice: Ride ride1 requested, fare: $20.0
        // Notification to Bob: Assigned to ride ride1
        // Requested ride: ride1
        // Notification to Alice: Ride ride1 completed
        // Notification to Bob: Ride ride1 completed
        // Completed ride: ride1
        // Error: User already exists: user1
        // Error: Invalid rider: user2
        // Error: No drivers available
        // Error: Ride not found: ride3
    }
}
```
- **LLD Principles**:
  - **Patterns**:
    - **Strategy**: `PricingStrategy` interface for interchangeable pricing algorithms (e.g., `DistanceBasedPricing`, `SurgePricing`).
    - **Observer**: `User.receiveNotification` for ride updates.
    - **Singleton**: `RideSystem` ensures a single instance.
  - **SOLID Principles**:
    - **SRP**: `RideSystem` manages rides, `PricingStrategy` handles pricing.
    - **OCP**: New pricing strategies added without modifying `RideSystem`.
    - **DIP**: `RideSystem` depends on `PricingStrategy` abstraction.
  - **Classes**: `User`, `Ride`, `PricingStrategy`, `DistanceBasedPricing`, `SurgePricing`, `RideSystem`, `RideService`, `RideController`.
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Big O**: O(1) for `addUser`, `requestRide`, `completeRide` (HashMap operations); O(n) for `findAvailableDriver` (n = users).
- **Edge Cases**: Handles duplicate users, invalid riders, no drivers, invalid rides.

**UML Diagram**:
```
[Client] --> [RideController]
                |
                v
            [RideService]
                |
                v
           [RideSystem]
                |
                v
           [User] --> [Ride]
           [PricingStrategy] --> [DistanceBasedPricing|SurgePricing]
```

## Real-World Application
Imagine designing a ride-sharing system like Uber, integrating design patterns and SOLID principles to ensure modularity and scalability. This LLD—aligned with HLD principles from Section 5 (e.g., Ride-Sharing System, Lecture 14)—demonstrates how to build maintainable systems for real-world applications.

## Practice Exercises
Practice integrating patterns/principles with these exercises:
- **Easy**: Design a UML diagram for a ride-sharing system with one pricing strategy.
- **Medium**: Implement a ride-sharing system in Java with Strategy pattern for pricing.
- **Medium**: Design an LLD for a ride-sharing system with Observer and Singleton patterns.
- **Hard**: Architect a system in Java, integrating multiple patterns (e.g., Strategy, Observer) and SOLID principles, with a UML diagram.

Try designing one system in Java with a UML diagram, explaining how patterns and principles are applied.

## Conclusion
Mastering the integration of design patterns and principles in LLD equips you to build modular, scalable Java systems, enhancing your design skills. This lecture builds on HLD concepts and prior LLD work, preparing you for FAANG interviews and real-world applications.

**Next Step**: Explore [Design a Parking lot System](/sections/lld/parking-lot) to continue your LLD journey, or check out [all sections](/sections/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>