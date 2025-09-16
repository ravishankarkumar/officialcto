---
title: Advanced OOD - Elevator System
description: Master advanced object-oriented design in Java by building an elevator system with state machines, using OOP and UML for scalable, thread-safe solutions in software engineering.
---

# Advanced OOD: Elevator System

## Overview
Advanced object-oriented design (OOD) tackles complex systems by combining OOP principles with patterns like state machines. In this fifth lesson of Section 2 in the *Official CTO* journey, we explore designing an **elevator system** using Java, leveraging encapsulation, polymorphism, abstraction, and state machine patterns. Whether controlling elevators in a high-rise building or managing a logistics system, this lesson teaches you to create robust, scalable systems. By mastering advanced OOD, you’ll design reliable software and mentor others effectively.

Inspired by *Head First Design Patterns*, *Clean Code*, and *Java Concurrency in Practice*, this 25-minute lesson covers the concepts, a practical Java implementation with a UML diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Apply **OOP principles** (encapsulation, polymorphism, abstraction) to complex system design.
- Use **state machine patterns** to model dynamic behavior in Java.
- Incorporate **concurrency** for thread-safe elevator operations (from Lecture 4).
- Design a scalable system with **UML modeling** (from Lecture 2).

## Why Advanced OOD Matters
Complex systems like elevators require careful design to handle dynamic states and concurrent requests. Early in my career, I designed a control system for a multi-elevator setup in a commercial building, using state machines to manage transitions and concurrency to handle multiple users. Advanced OOD—combining OOP, state patterns, and thread safety—ensures scalable, maintainable systems. Explaining these designs clearly showcases your mentorship skills.

In software engineering, advanced OOD helps you:
- **Model Complex Behavior**: Use state machines for dynamic systems.
- **Ensure Scalability**: Handle concurrent requests efficiently.
- **Clarify Design**: Use UML to align stakeholders (Lecture 2).
- **Teach Effectively**: Share sophisticated design strategies with teams.

## Key Concepts
### 1. OOP Principles (Review from Lecture 1)
- **Encapsulation**: Protect elevator state (e.g., current floor, direction).
- **Polymorphism**: Handle different elevator states (e.g., moving, idle) via a common interface.
- **Abstraction**: Hide state transition logic with interfaces or abstract classes.

### 2. State Machine Pattern
A state machine models a system’s behavior as states (e.g., Idle, MovingUp, MovingDown, DoorsOpen) with defined transitions.

- **States**: Represent elevator conditions (e.g., Idle, Moving).
- **Transitions**: Define valid state changes (e.g., Idle → MovingUp).
- **Context**: The `Elevator` class manages state transitions.

**Use Case**: Model elevator behavior with states and transitions.

### 3. Concurrency in OOD (Review from Lecture 4)
- Use `synchronized`, `ReentrantLock`, or `ExecutorService` for thread-safe request handling.
- Ensure atomic operations for state changes and floor requests.

### 4. UML for System Design (Review from Lecture 2)
- Model `Elevator`, `ElevatorState`, and relationships (e.g., composition).
- Use state diagrams to visualize transitions.

## Code Example: Elevator System
Let’s design an elevator system for a high-rise building, using Java with a state machine pattern, thread-safe operations, and a UML class diagram.

### UML Class Diagram
```
+---------------------+       1       +---------------------+
|     Elevator       |-------------|   ElevatorState     |
+---------------------+       1       +---------------------+
| -elevatorId: int   |              | +handleRequest(floor: int) |
| -currentFloor: int |              | +getStateName(): String |
| -state: ElevatorState |           +---------------------+
| -requests: Queue<Integer> |              |
| -lock: ReentrantLock |                   | implements
+---------------------+                   |
| +requestFloor(floor: int) |              |
| +move()              |                   |
+---------------------+                   |
                                          |
                            +-------------+-------------+
                            |             |             |
                   +----------------+ +----------------+ +----------------+
                   |    IdleState   | |  MovingUpState | | MovingDownState |
                   +----------------+ +----------------+ +----------------+
                   | +handleRequest | | +handleRequest | | +handleRequest |
                   | +getStateName  | | +getStateName  | | +getStateName  |
                   +----------------+ +----------------+ +----------------+
```

### Java Implementation
```java
import java.util.LinkedList;
import java.util.Queue;
import java.util.concurrent.locks.ReentrantLock;

// State interface
public interface ElevatorState {
    void handleRequest(Elevator elevator, int floor);
    String getStateName();
}

// Idle state
public class IdleState implements ElevatorState {
    @Override
    public void handleRequest(Elevator elevator, int floor) {
        if (floor > elevator.getCurrentFloor()) {
            elevator.setState(new MovingUpState());
        } else if (floor < elevator.getCurrentFloor()) {
            elevator.setState(new MovingDownState());
        }
        elevator.addRequest(floor);
    }
    
    @Override
    public String getStateName() {
        return "Idle";
    }
}

// MovingUp state
public class MovingUpState implements ElevatorState {
    @Override
    public void handleRequest(Elevator elevator, int floor) {
        elevator.addRequest(floor);
    }
    
    @Override
    public String getStateName() {
        return "MovingUp";
    }
}

// MovingDown state
public class MovingDownState implements ElevatorState {
    @Override
    public void handleRequest(Elevator elevator, int floor) {
        elevator.addRequest(floor);
    }
    
    @Override
    public String getStateName() {
        return "MovingDown";
    }
}

// Elevator class
public class Elevator {
    private int elevatorId;
    private int currentFloor;
    private ElevatorState state;
    private Queue<Integer> requests;
    private ReentrantLock lock;
    
    public Elevator(int elevatorId) {
        this.elevatorId = elevatorId;
        this.currentFloor = 0;
        this.state = new IdleState();
        this.requests = new LinkedList<>();
        this.lock = new ReentrantLock();
    }
    
    public void requestFloor(int floor) {
        lock.lock();
        try {
            System.out.println("Elevator " + elevatorId + " (" + state.getStateName() + ") received request for floor " + floor);
            state.handleRequest(this, floor);
        } finally {
            lock.unlock();
        }
    }
    
    public void move() {
        lock.lock();
        try {
            if (requests.isEmpty()) {
                state = new IdleState();
                return;
            }
            
            int targetFloor = requests.peek();
            if (targetFloor > currentFloor) {
                state = new MovingUpState();
                currentFloor++;
            } else if (targetFloor < currentFloor) {
                state = new MovingDownState();
                currentFloor--;
            } else {
                System.out.println("Elevator " + elevatorId + " arrived at floor " + currentFloor);
                requests.poll();
                state = new IdleState();
            }
        } finally {
            lock.unlock();
        }
    }
    
    public void addRequest(int floor) {
        requests.offer(floor);
    }
    
    public void setState(ElevatorState state) {
        this.state = state;
    }
    
    public int getCurrentFloor() {
        return currentFloor;
    }
    
    // Example usage with concurrency
    public static void main(String[] args) {
        Elevator elevator = new Elevator(1);
        
        // Simulate concurrent requests
        Thread t1 = new Thread(() -> elevator.requestFloor(5));
        Thread t2 = new Thread(() -> elevator.requestFloor(3));
        
        t1.start();
        t2.start();
        
        // Simulate elevator movement
        for (int i = 0; i < 6; i++) {
            elevator.move();
            try {
                Thread.sleep(1000); // Simulate movement time
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
```
- **OOP and Concurrency Principles**:
  - **Encapsulation**: Private fields (`currentFloor`, `state`) with getters/setters.
  - **Polymorphism**: `ElevatorState` interface with state-specific behavior.
  - **Abstraction**: `Elevator` hides state transition logic.
  - **Thread Safety**: Uses `ReentrantLock` for concurrent requests (Lecture 4).
  - **Clean Code**: Meaningful names, modularity (Section 9).
- **Big O**: O(1) for `requestFloor`, `move`, O(n) for processing all requests.
- **Edge Cases**: Handles empty requests, same floor, concurrent requests.

**Systematic Approach**:
- Gathered requirements (handle floor requests, state transitions, thread safety).
- Designed UML diagram to model `Elevator`, `ElevatorState`, and states.
- Implemented Java classes with state machine and concurrency.
- Tested with `main` method simulating concurrent requests.

## Real-World Application
Imagine managing elevators in a high-rise building, where a state machine ensures smooth transitions (Idle → MovingUp → DoorsOpen) and thread-safe operations handle concurrent user requests. This design—using OOP and concurrency—supports scalability and reliability, demonstrating your ability to mentor teams on robust system design.

## Practice Exercises
Apply advanced OOD with these exercises:
- **Easy**: Design a UML diagram and Java code for a `VendingMachine` system with states (Idle, Dispensing).
- **Medium**: Create a UML diagram and Java code for a thread-safe `TrafficLight` system with states (Red, Green, Yellow).
- **Medium**: Implement a state-based `OrderProcessing` system with `Order`, `OrderState` (e.g., Pending, Shipped).
- **Hard**: Design a thread-safe `ATM` system with states (Idle, Authenticating, Processing).

Try designing one system in Java with a UML diagram, ensuring state machine and concurrency principles.

## Conclusion
Advanced OOD with state machines equips you to design scalable, thread-safe Java systems like elevators. By mastering these techniques, you’ll build robust software, optimize complex systems, and teach others effectively. This advances your progress in Section 2 of the *Official CTO* journey.

**Next Step**: Explore [OOD for E-Commerce: Inventory Management](/sections/ood/ecommerce-inventory-management) to design a large-scale system, or check out [all sections](/sections/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>