---
title: Design a Traffic Light Controller
description: Learn low-level system design for a traffic light controller in Java, focusing on state transitions and timing for scalable, robust applications.
---

# Design a Traffic Light Controller

## Overview
Welcome to the twenty-fourth lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Designing a traffic light controller is a practical LLD problem that tests your ability to model state-driven systems using OOP principles. In this 25-minute lesson, we explore the **low-level design of a traffic light controller system**, covering state transitions (e.g., green, yellow, red) and timing mechanisms to manage light changes. Whether building an intersection traffic light system or preparing for FAANG interviews, this lecture equips you to design modular, reliable systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Design Patterns*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **low-level design** principles for a traffic light controller with state transitions and timing.
- Learn to model **classes**, **state machines**, and **functionality** in Java.
- Apply **OOP principles** (Section 2, Lecture 1), **design patterns** (Section 3), **design principles** (Section 4), and **HLD concepts** (Section 5) to LLD.
- Write clean, modular Java code (Section 9).

## Why Traffic Light Controller Design Matters
A traffic light controller is a classic FAANG interview problem that tests your ability to model state transitions and timing in real-time systems. Drawing from my experience designing state-driven systems, I’ve applied OOP principles to ensure reliability and maintainability in similar applications. This lecture prepares you to design robust systems and articulate your approach clearly, showcasing your mentorship skills.

In software engineering, traffic light controller design helps you:
- **Model State-Driven Systems**: Manage transitions between green, yellow, and red states.
- **Implement Timing**: Control light durations accurately.
- **Ensure Reliability**: Maintain consistent system behavior.
- **Teach Effectively**: Share practical LLD strategies.

## Key Concepts
### 1. Traffic Light Controller Components
- **State Transitions**: Cycle through green, yellow, red states with defined durations.
- **Timing Mechanism**: Manage state change intervals (e.g., 30s green, 5s yellow).
- **Functionality**:
  - Initialize traffic light states.
  - Transition between states based on timers.
  - Query current state.
- **Edge Cases**: Invalid state transitions, timer interruptions, concurrent access.

### 2. Design Patterns
- **State Pattern** (Section 3, Lecture 5): For managing traffic light states.
- **Singleton Pattern** (Section 3, Lecture 1): For traffic light controller instance.
- **Observer Pattern** (Section 3, Lecture 6): For notifying state changes (extensible).

### 3. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and polymorphism for state and controller classes.
- **Design Patterns** (Section 3): State, Singleton, and Observer patterns.
- **Design Principles** (Section 4): SoC (Lecture 11) separates state and timing logic; KISS (Lecture 8) simplifies design.
- **HLD** (Section 5):
  - Traffic Control System (Lecture 33): High-level traffic system concepts.
  - LLD Intro (Lecture 1): Builds on class design.
  - Database Design (Lecture 2): Persisting state logs (optional).
  - API Design (Lecture 3): Exposing controller controls.
  - Concurrency Handling (Lecture 4): Thread-safe state transitions.
  - Error Handling (Lecture 5): Handling invalid states.
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
- **Clean Code** (Section 9): Meaningful names for classes and methods.

### 4. Use Case
Design a traffic light controller for an intersection, supporting state transitions and timing for green, yellow, and red lights.

## System Design
### Architecture
```
[Client] --> [TrafficLightController]
                |
                v
            [TrafficLight]
                |
                v
           [TrafficLightState] --> [GreenState|YellowState|RedState]
```

- **Classes**:
  - `TrafficLightState`: Interface for states (green, yellow, red).
  - `GreenState`, `YellowState`, `RedState`: Concrete state implementations.
  - `TrafficLight`: Manages state transitions and timing.
  - `TrafficLightController`: Exposes API for operations.
- **Functionality**: Cycle through states, manage timing, query current state.
- **Trade-Offs**:
  - State Management: State pattern (flexible, complex) vs. flags (simple, error-prone).
  - Timing: Fixed intervals (simple, rigid) vs. dynamic (flexible, complex).

## Code Example: Traffic Light Controller System
Below is a Java implementation of a traffic light controller with state transitions and timing.

```java
import java.util.concurrent.TimeUnit;

// Custom exception
public class TrafficLightException extends Exception {
    public TrafficLightException(String message) {
        super(message);
    }
}

// State interface
public interface TrafficLightState {
    void transition(TrafficLight light) throws TrafficLightException;
    String getStateName();
    long getDuration();
}

// Concrete states
public class GreenState implements TrafficLightState {
    @Override
    public void transition(TrafficLight light) throws TrafficLightException {
        light.setState(new YellowState());
    }

    @Override
    public String getStateName() {
        return "Green";
    }

    @Override
    public long getDuration() {
        return 30000; // 30 seconds
    }
}

public class YellowState implements TrafficLightState {
    @Override
    public void transition(TrafficLight light) throws TrafficLightException {
        light.setState(new RedState());
    }

    @Override
    public String getStateName() {
        return "Yellow";
    }

    @Override
    public long getDuration() {
        return 5000; // 5 seconds
    }
}

public class RedState implements TrafficLightState {
    @Override
    public void transition(TrafficLight light) throws TrafficLightException {
        light.setState(new GreenState());
    }

    @Override
    public String getStateName() {
        return "Red";
    }

    @Override
    public long getDuration() {
        return 30000; // 30 seconds
    }
}

// Traffic light class
public class TrafficLight {
    private TrafficLightState state;

    public TrafficLight() {
        this.state = new GreenState();
    }

    public void setState(TrafficLightState state) {
        this.state = state;
        System.out.println("State changed to: " + state.getStateName());
    }

    public void transition() throws TrafficLightException {
        state.transition(this);
    }

    public String getCurrentState() {
        return state.getStateName();
    }

    public long getCurrentDuration() {
        return state.getDuration();
    }
}

// Controller for API interactions
public class TrafficLightController {
    private final TrafficLight light;

    public TrafficLightController(TrafficLight light) {
        this.light = light;
    }

    public void handleTransition() {
        try {
            light.transition();
        } catch (TrafficLightException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public String handleGetCurrentState() {
        return light.getCurrentState();
    }

    public void runCycle() throws InterruptedException {
        while (true) {
            System.out.println("Current state: " + handleGetCurrentState());
            Thread.sleep(light.getCurrentDuration());
            handleTransition();
        }
    }
}

// Client to demonstrate usage
public class TrafficLightClient {
    public static void main(String[] args) throws InterruptedException {
        TrafficLight light = new TrafficLight();
        TrafficLightController controller = new TrafficLightController(light);

        // Normal flow: Run a few cycles
        System.out.println("Starting traffic light cycle...");
        controller.runCycle(); // Run for demonstration (interrupt manually)

        // Note: Edge cases like invalid transitions are handled by state design
        // Output:
        // Starting traffic light cycle...
        // Current state: Green
        // State changed to: Yellow
        // Current state: Yellow
        // State changed to: Red
        // Current state: Red
        // State changed to: Green
        // ...
    }
}
```
- **LLD Principles**:
  - **State Transitions**: `TrafficLightState` and concrete states (`GreenState`, `YellowState`, `RedState`) manage transitions.
  - **Timing**: Fixed durations per state (e.g., 30s green, 5s yellow).
  - **Classes**: `TrafficLightState`, `GreenState`, `YellowState`, `RedState`, `TrafficLight`, `TrafficLightController`.
  - **Design Patterns**: State for state management, Singleton (optional for `TrafficLight`), Observer (extensible for notifications).
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates state and controller logic; KISS (Lecture 8) simplifies implementation.
- **Big O**: O(1) for `transition`, `getCurrentState`.
- **Edge Cases**: Handles invalid transitions via state design; timing interruptions are managed by exception handling.

**UML Diagram**:
```
[Client] --> [TrafficLightController]
                |
                v
            [TrafficLight]
                |
                v
           [TrafficLightState]
                |
                v
 [GreenState|YellowState|RedState]
```

## Real-World Application
Imagine designing a traffic light controller for an intersection, managing state transitions and timing to control traffic flow. This LLD—aligned with HLD principles from Section 5 (e.g., Traffic Control System, Lecture 33)—ensures reliability and modularity, critical for real-time systems.

## Practice Exercises
Practice traffic light controller design with these exercises:
- **Easy**: Design a UML diagram and Java code for a simple traffic light with two states.
- **Medium**: Implement a traffic light controller with green, yellow, red states and fixed timing.
- **Medium**: Design an LLD for a traffic light system with state transitions and dynamic timing.
- **Hard**: Architect a traffic light controller with Java, integrating multiple design patterns (e.g., State, Observer).

Try designing one system in Java with a UML diagram, explaining state transitions and timing.

## Conclusion
Mastering the design of a traffic light controller equips you to build modular, state-driven Java systems, enhancing your LLD skills. This lecture builds on HLD concepts and state-driven design principles, preparing you for FAANG interviews and real-world applications.

**Next Step**: Explore [Design a Parking lot System](/sections/lld/parking-lot) to continue your LLD journey, or check out [all sections](/sections/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>