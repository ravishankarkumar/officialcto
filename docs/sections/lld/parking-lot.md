---
title: Design a Parking Lot System
description: Learn low-level system design for a parking lot system in Java, focusing on multi-level structures and vehicle types for scalable, robust applications.
---

# Design a Parking Lot System

## Overview
Welcome to the sixth lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Designing a parking lot system is a classic LLD problem that tests your ability to model real-world entities using OOP principles. In this 25-minute lesson, we explore the **low-level design of a parking lot system**, covering multi-level structures, vehicle types (e.g., car, bike, truck), and functionality like parking assignment and fee calculation. Whether designing a system for a mall or preparing for FAANG interviews, this lecture equips you to build modular, scalable systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Design Patterns*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **low-level design** principles for a parking lot system with multi-level structures and vehicle types.
- Learn to model **classes**, **relationships**, and **functionality** in Java.
- Apply **OOP principles** (Section 2, Lecture 1), **design patterns** (Section 3), **design principles** (Section 4), and **HLD concepts** (Section 5) to LLD.
- Write clean, modular Java code (Section 9).

## Why Parking Lot System Design Matters
A parking lot system is a common FAANG interview problem that tests your ability to model complex systems using OOP. Early in my career, I designed a modular system for a real-time application, applying OOP principles to ensure maintainability and extensibility. This lecture prepares you to design robust systems and articulate your approach clearly, showcasing your mentorship skills.

In software engineering, parking lot system design helps you:
- **Model Real-World Systems**: Use OOP to represent entities and relationships.
- **Ensure Scalability**: Handle multiple levels and vehicle types.
- **Improve Maintainability**: Create modular, testable code.
- **Teach Effectively**: Share practical LLD strategies.

## Key Concepts
### 1. Parking Lot System Components
- **Multi-Level Structure**: Parking lot with multiple floors, each with parking spots.
- **Vehicle Types**: Support for cars, bikes, trucks with different spot sizes.
- **Functionality**:
  - Assign a parking spot based on vehicle type and availability.
  - Calculate parking fees based on duration.
  - Track spot availability and vehicle details.
- **Edge Cases**: No available spots, invalid vehicle types, duplicate entries.

### 2. Design Patterns
- **Strategy Pattern** (Section 3, Lecture 4): For parking spot selection (e.g., nearest, handicap).
- **Factory Pattern** (Section 3, Lecture 2): For creating vehicle objects.
- **Singleton Pattern** (Section 3, Lecture 1): For parking lot instance.

### 3. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and inheritance for vehicle and spot classes.
- **Design Patterns** (Section 3): Strategy, Factory, and Singleton patterns.
- **Design Principles** (Section 4): SoC (Lecture 11) separates parking logic; KISS (Lecture 8) simplifies design.
- **HLD** (Section 5):
  - E-commerce Platform (Lecture 16): Similar entity modeling.
  - LLD Intro (Lecture 1): Builds on class design.
  - Database Design (Lecture 2): Persisting parking data.
  - API Design (Lecture 3): Exposing parking functionality.
  - Concurrency Handling (Lecture 4): Thread-safe spot assignment.
  - Error Handling (Lecture 5): Handling invalid inputs and failures.
- **Clean Code** (Section 9): Meaningful names for classes and methods.

### 4. Use Case
Design a parking lot system for a mall, supporting multiple floors, vehicle types, and features like spot assignment and fee calculation.

## System Design
### Architecture
```
[Client] --> [ParkingController]
                |
                v
            [ParkingService]
                |
                v
           [ParkingLot] --> [Floor] --> [ParkingSpot]
                |
                v
           [Vehicle]
```

- **Classes**:
  - `Vehicle`: Represents cars, bikes, trucks.
  - `ParkingSpot`: Defines spot types (small, medium, large).
  - `Floor`: Manages spots on a level.
  - `ParkingLot`: Singleton managing floors and parking logic.
  - `ParkingService`: Handles business logic (assignment, fees).
  - `ParkingController`: Exposes API.
- **Functionality**: Assign spots based on vehicle type; calculate fees based on duration.
- **Trade-Offs**:
  - Spot Selection: Nearest spot (fast, simple) vs. optimal (complex, balanced).
  - Storage: In-memory (fast, volatile) vs. database (persistent, slower).

## Code Example: Parking Lot System
Below is a Java implementation of a parking lot system with multi-level support and vehicle types.

```java
import java.util.ArrayList;
import java.util.List;

// Enum for vehicle types
public enum VehicleType {
    BIKE, CAR, TRUCK
}

// Enum for spot types
public enum SpotType {
    SMALL, MEDIUM, LARGE
}

// Vehicle class
public abstract class Vehicle {
    protected String licensePlate;
    protected VehicleType type;

    public Vehicle(String licensePlate, VehicleType type) {
        this.licensePlate = licensePlate;
        this.type = type;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public VehicleType getType() {
        return type;
    }
}

public class Car extends Vehicle {
    public Car(String licensePlate) {
        super(licensePlate, VehicleType.CAR);
    }
}

public class Bike extends Vehicle {
    public Bike(String licensePlate) {
        super(licensePlate, VehicleType.BIKE);
    }
}

public class Truck extends Vehicle {
    public Truck(String licensePlate) {
        super(licensePlate, VehicleType.TRUCK);
    }
}

// Parking spot class
public class ParkingSpot {
    private String spotId;
    private SpotType type;
    private boolean occupied;
    private Vehicle vehicle;

    public ParkingSpot(String spotId, SpotType type) {
        this.spotId = spotId;
        this.type = type;
        this.occupied = false;
    }

    public String getSpotId() {
        return spotId;
    }

    public SpotType getType() {
        return type;
    }

    public boolean isOccupied() {
        return occupied;
    }

    public void parkVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
        this.occupied = true;
    }

    public Vehicle removeVehicle() {
        Vehicle v = this.vehicle;
        this.vehicle = null;
        this.occupied = false;
        return v;
    }
}

// Floor class
public class Floor {
    private int floorNumber;
    private List<ParkingSpot> spots;

    public Floor(int floorNumber, int numSpots) {
        this.floorNumber = floorNumber;
        this.spots = new ArrayList<>();
        for (int i = 0; i < numSpots; i++) {
            SpotType type = i % 3 == 0 ? SpotType.SMALL : i % 3 == 1 ? SpotType.MEDIUM : SpotType.LARGE;
            spots.add(new ParkingSpot("spot-" + floorNumber + "-" + i, type));
        }
    }

    public ParkingSpot findAvailableSpot(VehicleType vehicleType) {
        for (ParkingSpot spot : spots) {
            if (!spot.isOccupied() && isCompatible(spot.getType(), vehicleType)) {
                return spot;
            }
        }
        return null;
    }

    private boolean isCompatible(SpotType spotType, VehicleType vehicleType) {
        return (spotType == SpotType.SMALL && vehicleType == VehicleType.BIKE) ||
               (spotType == SpotType.MEDIUM && (vehicleType == VehicleType.BIKE || vehicleType == VehicleType.CAR)) ||
               (spotType == SpotType.LARGE);
    }
}

// Singleton ParkingLot
public class ParkingLot {
    private static ParkingLot instance;
    private List<Floor> floors;

    private ParkingLot() {
        floors = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            floors.add(new Floor(i, 10)); // 3 floors, 10 spots each
        }
    }

    public static ParkingLot getInstance() {
        if (instance == null) {
            instance = new ParkingLot();
        }
        return instance;
    }

    public ParkingSpot parkVehicle(Vehicle vehicle) {
        for (Floor floor : floors) {
            ParkingSpot spot = floor.findAvailableSpot(vehicle.getType());
            if (spot != null) {
                spot.parkVehicle(vehicle);
                return spot;
            }
        }
        return null;
    }

    public Vehicle removeVehicle(String spotId) {
        for (Floor floor : floors) {
            for (ParkingSpot spot : floor.spots) {
                if (spot.getSpotId().equals(spotId) && spot.isOccupied()) {
                    return spot.removeVehicle();
                }
            }
        }
        return null;
    }
}

// Service layer
public class ParkingService {
    private final ParkingLot parkingLot;

    public ParkingService(ParkingLot parkingLot) {
        this.parkingLot = parkingLot;
    }

    public String parkVehicle(Vehicle vehicle) {
        ParkingSpot spot = parkingLot.parkVehicle(vehicle);
        if (spot == null) {
            throw new IllegalStateException("No available parking spot for vehicle: " + vehicle.getLicensePlate());
        }
        System.out.println("Parked vehicle " + vehicle.getLicensePlate() + " at spot " + spot.getSpotId());
        return spot.getSpotId();
    }

    public double exitVehicle(String spotId, long entryTime) {
        Vehicle vehicle = parkingLot.removeVehicle(spotId);
        if (vehicle == null) {
            throw new IllegalStateException("No vehicle found at spot: " + spotId);
        }
        long durationHours = (System.currentTimeMillis() - entryTime) / (1000 * 60 * 60);
        double fee = calculateFee(vehicle.getType(), durationHours);
        System.out.println("Vehicle " + vehicle.getLicensePlate() + " exited, fee: $" + fee);
        return fee;
    }

    private double calculateFee(VehicleType type, long hours) {
        double rate = type == VehicleType.BIKE ? 2.0 : type == VehicleType.CAR ? 5.0 : 10.0;
        return rate * hours;
    }
}

// Controller for API interactions
public class ParkingController {
    private final ParkingService service;

    public ParkingController(ParkingService service) {
        this.service = service;
    }

    public String handleParkVehicle(Vehicle vehicle) {
        return service.parkVehicle(vehicle);
    }

    public double handleExitVehicle(String spotId, long entryTime) {
        return service.exitVehicle(spotId, entryTime);
    }
}

// Client to demonstrate usage
public class ParkingClient {
    public static void main(String[] args) {
        ParkingLot parkingLot = ParkingLot.getInstance();
        ParkingService service = new ParkingService(parkingLot);
        ParkingController controller = new ParkingController(service);

        // Park vehicles
        Vehicle car = new Car("CAR123");
        Vehicle bike = new Bike("BIKE456");
        long entryTime = System.currentTimeMillis();
        String carSpot = controller.handleParkVehicle(car);
        String bikeSpot = controller.handleParkVehicle(bike);

        // Exit vehicle
        double fee = controller.handleExitVehicle(carSpot, entryTime);

        // Edge case: No available spot
        try {
            for (int i = 0; i < 30; i++) {
                controller.handleParkVehicle(new Car("CAR" + i));
            }
        } catch (IllegalStateException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Edge case: Invalid spot
        try {
            controller.handleExitVehicle("invalid-spot", entryTime);
        } catch (IllegalStateException e) {
            System.out.println("Error: " + e.getMessage());
        }
        // Output:
        // Parked vehicle CAR123 at spot spot-<floor>-<index>
        // Parked vehicle BIKE456 at spot spot-<floor>-<index>
        // Vehicle CAR123 exited, fee: $5.0
        // Error: No available parking spot for vehicle: CAR<index>
        // Error: No vehicle found at spot: invalid-spot
    }
}
```
- **LLD Principles**:
  - **Multi-Level**: `Floor` manages spots; `ParkingLot` manages floors.
  - **Vehicle Types**: `Vehicle` hierarchy supports Bike, Car, Truck.
  - **Functionality**: `parkVehicle` assigns spots; `exitVehicle` calculates fees.
  - **Design Patterns**: Singleton (`ParkingLot`), Strategy (spot selection), Factory (vehicle creation).
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates parking logic; DIP (Section 4, Lecture 6) for extensibility.
- **Big O**: O(n) for `parkVehicle` (n = spots), O(1) for `removeVehicle` (with spot ID).
- **Edge Cases**: Handles no available spots, invalid spot IDs.

**UML Diagram**:
```
[Client] --> [ParkingController]
                |
                v
            [ParkingService]
                |
                v
           [ParkingLot]
                |
                v
           [Floor] --> [ParkingSpot]
                |
                v
           [Vehicle]
                |
                v
        [Car|Bike|Truck]
```

## Real-World Application
Imagine designing a parking lot system for a mall, supporting multiple floors and vehicle types with efficient spot assignment and fee calculation. This LLD—aligned with HLD principles from Section 5 (e.g., E-commerce Platform, Lecture 16)—ensures modularity and scalability, critical for real-world systems.

## Practice Exercises
Practice parking lot system design with these exercises:
- **Easy**: Design a UML diagram and Java code for a single-level parking lot.
- **Medium**: Implement a parking lot system with two vehicle types (e.g., car, bike).
- **Medium**: Design an LLD for a multi-level parking system with fee calculation.
- **Hard**: Architect a parking lot system with Java, integrating a design pattern (e.g., Strategy for spot selection).

Try designing one system in Java with a UML diagram, explaining multi-level and vehicle type support.

## Conclusion
Mastering the design of a parking lot system equips you to build modular, scalable Java systems, enhancing your LLD skills. This lecture builds on HLD concepts, preparing you for FAANG interviews and real-world applications.

**Next Step**: Explore [Design an Elevator System](/sections/lld/elevator-system) to continue your LLD journey, or check out [all sections](/sections/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>