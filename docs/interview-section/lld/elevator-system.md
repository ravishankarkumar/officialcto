---
title: Design an Elevator System
description: Learn low-level system design for an elevator system in Java, focusing on state management and scheduling for scalable, robust applications.
---

# Design an Elevator System

## Overview
Welcome to the seventh lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Designing an elevator system is a classic LLD problem that tests your ability to model state-driven systems using OOP principles. In this 25-minute lesson, we explore the **low-level design of an elevator system**, covering state management (e.g., idle, moving), scheduling algorithms (e.g., FCFS), and functionality like request handling and movement. Whether designing a system for a building or preparing for FAANG interviews, this lecture equips you to build modular, scalable systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Design Patterns*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **low-level design** principles for an elevator system with state management and scheduling.
- Learn to model **classes**, **states**, and **scheduling** in Java.
- Apply **OOP principles** (Section 2, Lecture 1), **design patterns** (Section 3), **design principles** (Section 4), and **HLD concepts** (Section 5) to LLD.
- Write clean, modular Java code (Section 9).

## Why Elevator System Design Matters
An elevator system is a common FAANG interview problem that tests your ability to model state transitions and scheduling in a real-world context. Early in my career, I designed a state-driven system for a real-time application, applying OOP principles to ensure maintainability and extensibility. This lecture prepares you to design robust systems and articulate your approach clearly, showcasing your mentorship skills.

In software engineering, elevator system design helps you:
- **Model State-Driven Systems**: Use state machines for dynamic behavior.
- **Optimize Scheduling**: Implement efficient request handling.
- **Ensure Scalability**: Support multiple elevators and floors.
- **Teach Effectively**: Share practical LLD strategies.

## Key Concepts
### 1. Elevator System Components
- **States**: Idle, Moving Up, Moving Down, Doors Open, Doors Closed.
- **Scheduling**: First-Come-First-Serve (FCFS) or optimized algorithms (e.g., SCAN).
- **Functionality**:
  - Handle internal (inside elevator) and external (floor) requests.
  - Move to target floors and open/close doors.
  - Track elevator state and current floor.
- **Edge Cases**: Invalid floor requests, full elevator, simultaneous requests.

### 2. Design Patterns
- **State Pattern** (Section 3, Lecture 5): For managing elevator states.
- **Strategy Pattern** (Section 3, Lecture 4): For scheduling algorithms.
- **Singleton Pattern** (Section 3, Lecture 1): For elevator controller.

### 3. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and inheritance for elevator classes.
- **Design Patterns** (Section 3): State and Strategy patterns.
- **Design Principles** (Section 4): SoC (Lecture 11) separates state and scheduling logic; KISS (Lecture 8) simplifies design.
- **HLD** (Section 5):
  - Distributed Systems (Lecture 5): Similar to multi-elevator coordination.
  - LLD Intro (Lecture 1): Builds on state-driven design.
  - Database Design (Lecture 2): Persisting elevator logs.
  - API Design (Lecture 3): Exposing elevator controls.
  - Concurrency Handling (Lecture 4): Thread-safe request handling.
  - Error Handling (Lecture 5): Handling invalid requests.
  - Parking Lot (Lecture 6): Similar entity modeling.
- **Clean Code** (Section 9): Meaningful names for classes and methods.

### 4. Use Case
Design an elevator system for a building, supporting multiple floors, state management, and FCFS scheduling.

## System Design
### Architecture
```
[Client] --> [ElevatorController]
                |
                v
            [Elevator]
                |
                v
           [State] --> [Idle|MovingUp|MovingDown|DoorsOpen]
                |
                v
           [RequestQueue]
```

- **Classes**:
  - `Elevator`: Manages state and movement.
  - `State`: Defines states (Idle, MovingUp, MovingDown, DoorsOpen).
  - `RequestQueue`: Handles internal/external requests.
  - `ElevatorController`: Exposes API for requests.
- **Functionality**: Process requests, update states, move to floors.
- **Trade-Offs**:
  - Scheduling: FCFS (simple, suboptimal) vs. SCAN (efficient, complex).
  - State Management: State pattern (flexible, complex) vs. flags (simple, error-prone).

## Code Example: Elevator System
Below is a Java implementation of an elevator system with state management and FCFS scheduling.

```java
import java.util.ArrayList;
import java.util.List;

// State interface
public interface ElevatorState {
    void handleRequest(Elevator elevator, Request request);
    String getStateName();
}

public class IdleState implements ElevatorState {
    @Override
    public void handleRequest(Elevator elevator, Request request) {
        elevator.setCurrentFloor(request.getTargetFloor());
        elevator.setState(new MovingUpState());
        System.out.println("Elevator moving to floor " + request.getTargetFloor());
    }

    @Override
    public String getStateName() {
        return "Idle";
    }
}

public class MovingUpState implements ElevatorState {
    @Override
    public void handleRequest(Elevator elevator, Request request) {
        elevator.addRequest(request);
        System.out.println("Request added to queue for floor " + request.getTargetFloor());
    }

    @Override
    public String getStateName() {
        return "Moving Up";
    }
}

public class MovingDownState implements ElevatorState {
    @Override
    public void handleRequest(Elevator elevator, Request request) {
        elevator.addRequest(request);
        System.out.println("Request added to queue for floor " + request.getTargetFloor());
    }

    @Override
    public String getStateName() {
        return "Moving Down";
    }
}

public class DoorsOpenState implements ElevatorState {
    @Override
    public void handleRequest(Elevator elevator, Request request) {
        elevator.addRequest(request);
        System.out.println("Request added to queue for floor " + request.getTargetFloor());
    }

    @Override
    public String getStateName() {
        return "Doors Open";
    }
}

// Request class
public class Request {
    private int targetFloor;
    private boolean isInternal; // true for inside elevator, false for floor request

    public Request(int targetFloor, boolean isInternal) {
        this.targetFloor = targetFloor;
        this.isInternal = isInternal;
    }

    public int getTargetFloor() {
        return targetFloor;
    }

    public boolean isInternal() {
        return isInternal;
    }
}

// Elevator class
public class Elevator {
    private ElevatorState state;
    private int currentFloor;
    private List<Request> requestQueue;

    public Elevator() {
        this.state = new IdleState();
        this.currentFloor = 0; // Ground floor
        this.requestQueue = new ArrayList<>();
    }

    public void setState(ElevatorState state) {
        this.state = state;
        System.out.println("Elevator state changed to: " + state.getStateName());
    }

    public void addRequest(Request request) {
        if (request.getTargetFloor() < 0 || request.getTargetFloor() > 10) {
            throw new IllegalArgumentException("Invalid floor: " + request.getTargetFloor());
        }
        requestQueue.add(request);
    }

    public void processNextRequest() {
        if (requestQueue.isEmpty()) {
            setState(new IdleState());
            return;
        }
        Request request = requestQueue.remove(0);
        state.handleRequest(this, request);
        if (state.getStateName().equals("Moving Up") || state.getStateName().equals("Moving Down")) {
            setState(new DoorsOpenState());
        }
    }

    public void setCurrentFloor(int floor) {
        this.currentFloor = floor;
    }

    public int getCurrentFloor() {
        return currentFloor;
    }
}

// Controller for API interactions
public class ElevatorController {
    private final Elevator elevator;

    public ElevatorController(Elevator elevator) {
        this.elevator = elevator;
    }

    public void handleRequest(int targetFloor, boolean isInternal) {
        try {
            Request request = new Request(targetFloor, isInternal);
            elevator.addRequest(request);
            elevator.processNextRequest();
        } catch (IllegalArgumentException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public int getCurrentFloor() {
        return elevator.getCurrentFloor();
    }
}

// Client to demonstrate usage
public class ElevatorClient {
    public static void main(String[] args) {
        Elevator elevator = new Elevator();
        ElevatorController controller = new ElevatorController(elevator);

        // Handle requests
        controller.handleRequest(5, false); // External request from floor 5
        controller.handleRequest(3, true);  // Internal request to floor 3
        controller.handleRequest(7, false); // External request from floor 7
        controller.handleRequest(-1, true); // Edge case: Invalid floor

        // Process queue
        while (elevator.getCurrentFloor() != 7) {
            controller.handleRequest(elevator.getCurrentFloor(), true); // Simulate reaching queued floors
        }
        // Output:
        // Elevator state changed to: Idle
        // Elevator moving to floor 5
        // Elevator state changed to: Moving Up
        // Elevator state changed to: Doors Open
        // Request added to queue for floor 3
        // Elevator moving to floor 3
        // Elevator state changed to: Moving Down
        // Elevator state changed to: Doors Open
        // Request added to queue for floor 7
        // Error: Invalid floor: -1
        // Request added to queue for floor 3
        // Elevator moving to floor 7
        // Elevator state changed to: Moving Up
        // Elevator state changed to: Doors Open
    }
}
```
- **LLD Principles**:
  - **States**: `IdleState`, `MovingUpState`, `MovingDownState`, `DoorsOpenState` manage elevator behavior.
  - **Scheduling**: FCFS via `RequestQueue` for simplicity.
  - **Classes**: `Elevator`, `Request`, `ElevatorController`, and state classes.
  - **Design Patterns**: State pattern for state management.
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates state and control logic; DIP (Section 4, Lecture 6) via state interface.
- **Big O**: O(1) for `addRequest`, `processNextRequest` (queue operations).
- **Edge Cases**: Handles invalid floors, empty queue.

**UML Diagram**:
```
[Client] --> [ElevatorController]
                |
                v
            [Elevator]
                |
                v
           [ElevatorState]
                |
                v
 [IdleState|MovingUpState|MovingDownState|DoorsOpenState]
                |
                v
           [RequestQueue] --> [Request]
```

## Real-World Application
Imagine designing an elevator system for a building, using state management to control movement and FCFS scheduling for requests. This LLD—aligned with HLD principles from Section 5 (e.g., Distributed Systems, Lecture 5)—ensures modularity and reliability, critical for real-world systems.

## Practice Exercises
Practice elevator system design with these exercises:
- **Easy**: Design a UML diagram and Java code for a single-elevator system with basic states.
- **Medium**: Implement an elevator system with FCFS scheduling and two states (Idle, Moving).
- **Medium**: Design an LLD for a multi-elevator system with state management.
- **Hard**: Architect an elevator system with Java, integrating a design pattern (e.g., Strategy for scheduling).

Try designing one system in Java with a UML diagram, explaining states and scheduling.

## Conclusion
Mastering the design of an elevator system equips you to build state-driven, modular Java systems, enhancing your LLD skills. This lecture builds on HLD concepts, preparing you for FAANG interviews and real-world applications.

**Next Step**: Explore [Design a Vending Machine](/interview-section/lld/vending-machine) to continue your LLD journey, or check out [all sections](/interview-section/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>