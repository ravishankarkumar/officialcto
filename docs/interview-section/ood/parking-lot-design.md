---
title: Designing Simple Systems - Parking Lot
description: Master object-oriented design in Java by building a parking lot system, using OOP principles and UML to create modular, scalable solutions for better software engineering.
---

# Designing Simple Systems: Parking Lot

## Overview
Designing modular systems is a core skill for software engineers, blending object-oriented programming (OOP) principles with practical architecture. In this third lesson of Section 2 in the *Official CTO* journey, we explore how to design a **parking lot system** using OOP and UML, applying encapsulation, inheritance, polymorphism, and abstraction. Whether managing parking spaces in a mall or modeling a ticketing system, this lesson teaches you to create robust, extensible Java systems. By mastering system design, you’ll build better software and mentor others effectively.

Inspired by *Head First Design Patterns* and *Clean Code*, this 25-minute lesson covers the concepts, a practical Java implementation with a UML diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Apply **OOP principles** (encapsulation, inheritance, polymorphism, abstraction) to system design.
- Use **UML class diagrams** to model a parking lot system (from Lecture 2).
- Design a **modular system** with clear requirements and relationships.
- Implement a scalable Java system with clean code practices (Section 9).

## Why System Design Matters
System design translates real-world problems into software, ensuring modularity and scalability. Early in my career, I designed a parking management system for a retail platform, using OOP to handle diverse vehicle types and UML to align stakeholders. This approach—OOP for structure, UML for clarity—ensures maintainable code and clear communication. Explaining your design process showcases your mentorship skills.

In software engineering, system design helps you:
- **Enhance Modularity**: Encapsulate logic for low coupling.
- **Ensure Scalability**: Use polymorphism for extensibility.
- **Clarify Intent**: Model systems with UML for team alignment.
- **Teach Effectively**: Share design rationale clearly.

## Key Concepts
### 1. OOP Principles (Review from Lecture 1)
- **Encapsulation**: Protect data (e.g., vehicle details) with private fields and public methods.
- **Inheritance**: Define hierarchies (e.g., `Car` extends `Vehicle`).
- **Polymorphism**: Handle different vehicle types via a common interface.
- **Abstraction**: Hide complexity with interfaces (e.g., `ParkingService`).

### 2. UML Class Diagrams (Review from Lecture 2)
- **Classes**: Define attributes (e.g., `licensePlate`) and methods (e.g., `park()`).
- **Relationships**: Use inheritance (arrow), association (line), or composition (filled diamond).
- **Multiplicity**: Indicate one-to-many (e.g., `ParkingLot` has many `ParkingSpot`).

### 3. System Design Process
- **Gather Requirements**: Define functionality (e.g., park vehicle, assign spot, calculate fees).
- **Identify Classes**: Map entities (e.g., `Vehicle`, `ParkingSpot`, `ParkingLot`).
- **Define Relationships**: Use UML to model interactions (e.g., `ParkingLot` contains `ParkingSpot`).
- **Implement in Java**: Write clean, modular code with OOP principles.

**Use Case**: Design a parking lot system to assign spots, park vehicles, and calculate fees.

## Code Example: Parking Lot System
Let’s design a parking lot system for a mall, using Java to implement classes and a UML class diagram to visualize the design.

### UML Class Diagram
```
+---------------------+       1       +---------------------+
|    ParkingLot      |-------------|    ParkingSpot      |
+---------------------+       1..*   +---------------------+
| -lotId: int         |              | -spotId: int        |
| -spots: List<ParkingSpot> |       | -isOccupied: boolean |
| -capacity: int      |              | -vehicle: Vehicle   |
+---------------------+              +---------------------+
| +parkVehicle(vehicle: Vehicle) |   | +park(vehicle: Vehicle) |
| +removeVehicle(spotId: int)    |   | +removeVehicle()       |
| +getAvailableSpots(): int      |   +---------------------+
+---------------------+                     |
                                            |
                                            | 1
                                            |
                                     +---------------------+
                                     |      Vehicle        |
                                     +---------------------+
                                     | -licensePlate: String |
                                     | -type: String       |
                                     +---------------------+
                                     | +getType(): String  |
                                     +---------------------+
                                            |
                                            | extends
                                            |
                                     +---------------------+
                                     |       Car          |
                                     +---------------------+
                                     | -color: String     |
                                     +---------------------+
                                     | +getColor(): String |
                                     +---------------------+
```

### Java Implementation
```java
import java.util.ArrayList;
import java.util.List;

// Vehicle class (base class)
public abstract class Vehicle {
    private String licensePlate;
    private String type;
    
    public Vehicle(String licensePlate, String type) {
        this.licensePlate = licensePlate;
        this.type = type;
    }
    
    public String getLicensePlate() {
        return licensePlate;
    }
    
    public String getType() {
        return type;
    }
}

// Car class (inherits from Vehicle)
public class Car extends Vehicle {
    private String color;
    
    public Car(String licensePlate, String color) {
        super(licensePlate, "Car");
        this.color = color;
    }
    
    public String getColor() {
        return color;
    }
}

// ParkingSpot class
public class ParkingSpot {
    private int spotId;
    private boolean isOccupied;
    private Vehicle vehicle;
    
    public ParkingSpot(int spotId) {
        this.spotId = spotId;
        this.isOccupied = false;
        this.vehicle = null;
    }
    
    public boolean isOccupied() {
        return isOccupied;
    }
    
    public void park(Vehicle vehicle) {
        this.vehicle = vehicle;
        this.isOccupied = true;
    }
    
    public Vehicle removeVehicle() {
        Vehicle temp = vehicle;
        this.vehicle = null;
        this.isOccupied = false;
        return temp;
    }
    
    public int getSpotId() {
        return spotId;
    }
    
    public Vehicle getVehicle() {
        return vehicle;
    }
}

// ParkingLot class
public class ParkingLot {
    private int lotId;
    private List<ParkingSpot> spots;
    private int capacity;
    
    public ParkingLot(int lotId, int capacity) {
        this.lotId = lotId;
        this.capacity = capacity;
        this.spots = new ArrayList<>();
        for (int i = 1; i <= capacity; i++) {
            spots.add(new ParkingSpot(i));
        }
    }
    
    public boolean parkVehicle(Vehicle vehicle) {
        for (ParkingSpot spot : spots) {
            if (!spot.isOccupied()) {
                spot.park(vehicle);
                return true;
            }
        }
        return false; // No available spots
    }
    
    public Vehicle removeVehicle(int spotId) {
        for (ParkingSpot spot : spots) {
            if (spot.getSpotId() == spotId && spot.isOccupied()) {
                return spot.removeVehicle();
            }
        }
        return null; // Spot not found or empty
    }
    
    public int getAvailableSpots() {
        int count = 0;
        for (ParkingSpot spot : spots) {
            if (!spot.isOccupied()) {
                count++;
            }
        }
        return count;
    }
    
    // Example usage
    public static void main(String[] args) {
        ParkingLot lot = new ParkingLot(1, 3);
        Vehicle car = new Car("ABC123", "Blue");
        
        lot.parkVehicle(car);
        System.out.println("Available spots: " + lot.getAvailableSpots());
        // Output: Available spots: 2
        
        Vehicle removed = lot.removeVehicle(1);
        System.out.println("Removed vehicle: " + removed.getType());
        System.out.println("Available spots: " + lot.getAvailableSpots());
        // Output: Removed vehicle: Car
        //         Available spots: 3
    }
}
```
- **OOP Principles**:
  - **Encapsulation**: Private fields (`licensePlate`, `isOccupied`) with getters.
  - **Inheritance**: `Car` extends `Vehicle`.
  - **Polymorphism**: `Vehicle` type handles different vehicles (extensible for `Truck`, etc.).
  - **Abstraction**: `ParkingLot` hides spot management details.
  - **Clean Code**: Meaningful names, modularity (Section 9).
- **Big O**: O(n) for `parkVehicle` and `getAvailableSpots` (n = number of spots), O(1) for `removeVehicle` with valid spotId.
- **Edge Cases**: Handles empty lot, no available spots, invalid spotId.

**Systematic Approach**:
- Gathered requirements (park, remove, track available spots).
- Designed UML diagram to model `ParkingLot`, `ParkingSpot`, `Vehicle`, `Car`.
- Implemented Java classes with OOP principles.
- Tested with `main` method for functionality.

## Real-World Application
Imagine managing parking for a mall, where a UML class diagram clarifies relationships between `ParkingLot`, `ParkingSpot`, and `Vehicle` for stakeholders. The Java implementation supports efficient parking operations, extensible for different vehicle types or fee calculations. This approach—OOP for structure, UML for clarity—ensures a scalable, maintainable system and demonstrates your ability to mentor teams on robust design.

## Practice Exercises
Apply OOD and UML with these exercises:
- **Easy**: Design a UML diagram and Java code for a `Library` system with `Book` and `Shelf` classes.
- **Medium**: Create a UML diagram and Java code for a `Ticket` system with `Ticket` and `Event` classes.
- **Medium**: Model a `Restaurant` system with `Table`, `Order`, and `Menu` classes.
- **Hard**: Design a UML diagram and Java code for a `Car Rental` system with `Car`, `Customer`, and `Rental` classes.

Try designing one system in Java with a UML diagram, ensuring OOP principles and clear notation.

## Conclusion
Designing a parking lot system with OOP and UML equips you to build modular, scalable Java systems. By mastering these techniques, you’ll create robust software, communicate designs clearly, and teach others effectively. This advances your progress in Section 2 of the *Official CTO* journey.

**Next Step**: Explore [Concurrency in OOD](/interview-section/ood/concurrency-in-ood) to handle thread-safety in system design, or check out [all sections](/interview-section/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>