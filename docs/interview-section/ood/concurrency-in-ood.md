---
title: Concurrency in Object-Oriented Design
description: Master concurrency in Java OOP design to build thread-safe, scalable systems, with practical examples for better software engineering.
---

# Concurrency in Object-Oriented Design

## Overview
Concurrency is a critical aspect of modern software systems, enabling multiple tasks to run simultaneously while maintaining data integrity. In this fourth lesson of Section 2 in the *Official CTO* journey, we explore **concurrency in object-oriented design (OOD)**, using Java’s concurrency mechanisms to build thread-safe systems. Whether synchronizing bookings in a ticketing system or managing inventory in an e-commerce platform, these techniques ensure robust, scalable designs. By mastering concurrency, you’ll create reliable Java systems and mentor others effectively.

Inspired by *Java Concurrency in Practice* and *Clean Code*, this 20-minute lesson covers concurrency concepts, a practical Java example with a UML diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand **concurrency challenges** (e.g., race conditions, deadlocks) in OOD.
- Learn **Java concurrency tools** (`synchronized`, `Lock`, `ConcurrentHashMap`, `ExecutorService`).
- Apply **thread-safe design** principles with OOP (encapsulation, abstraction).
- Design and implement a concurrent Java system with UML modeling.

## Why Concurrency in OOD Matters
Concurrent systems handle multiple users or tasks efficiently, but they introduce challenges like race conditions and deadlocks. Early in my career, I designed a ticketing system for a travel platform, using thread-safe OOP to ensure simultaneous bookings didn’t cause conflicts. Concurrency in OOD—combining thread safety with encapsulation and abstraction—ensures reliable, scalable systems. Explaining these designs clearly showcases your mentorship skills.

In software engineering, concurrency in OOD helps you:
- **Ensure Reliability**: Prevent data corruption in multi-threaded systems.
- **Enhance Scalability**: Handle high-concurrency workloads.
- **Simplify Design**: Use OOP to encapsulate concurrency logic.
- **Teach Effectively**: Share thread-safe design strategies with teams.

## Key Concepts
### 1. Concurrency Challenges
- **Race Conditions**: Multiple threads accessing shared data simultaneously, causing inconsistent results.
- **Deadlocks**: Threads waiting indefinitely for each other’s resources.
- **Thread Safety**: Ensuring objects behave correctly under concurrent access.

### 2. Java Concurrency Tools
- **synchronized**: Locks methods or blocks to prevent concurrent access.
- **Lock Interface**: Flexible locking (e.g., `ReentrantLock` for explicit control).
- **Concurrent Collections**: Thread-safe collections like `ConcurrentHashMap`.
- **ExecutorService**: Manages thread pools for task execution.

### 3. Thread-Safe OOD Principles
- **Encapsulation**: Hide shared data with private fields and synchronized accessors.
- **Abstraction**: Use interfaces to abstract concurrency details (e.g., `BookingService`).
- **Immutability**: Prefer immutable objects to avoid synchronization.
- **Atomic Operations**: Use atomic classes (e.g., `AtomicInteger`) for simple updates.

**Use Case**: Design a thread-safe ticket booking system with synchronized access to seats.

## Code Example: Thread-Safe Ticket Booking System
Let’s design a ticket booking system for a travel platform, using Java with OOP and concurrency, visualized with a UML class diagram.

### UML Class Diagram
```
+---------------------+       1       +---------------------+
|   BookingService   |-------------|       Ticket        |
+---------------------+       1..*   +---------------------+
| -tickets: Map<Integer, Ticket> |  | -ticketId: int      |
| -lock: ReentrantLock |           | -isBooked: boolean  |
| -executor: ExecutorService |     | -userId: String     |
+---------------------+            +---------------------+
| +bookTicket(ticketId, userId) | | +book(userId: String) |
| +cancelTicket(ticketId)       | | +cancel()            |
| +getAvailableTickets(): int   | +---------------------+
+---------------------+
```

### Java Implementation
```java
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.locks.ReentrantLock;

// Ticket class
public class Ticket {
    private int ticketId;
    private boolean isBooked;
    private String userId;
    
    public Ticket(int ticketId) {
        this.ticketId = ticketId;
        this.isBooked = false;
        this.userId = null;
    }
    
    public synchronized void book(String userId) {
        if (!isBooked) {
            this.isBooked = true;
            this.userId = userId;
        }
    }
    
    public synchronized void cancel() {
        if (isBooked) {
            this.isBooked = false;
            this.userId = null;
        }
    }
    
    public boolean isBooked() {
        return isBooked;
    }
    
    public String getUserId() {
        return userId;
    }
    
    public int getTicketId() {
        return ticketId;
    }
}

// BookingService class
public class BookingService {
    private Map<Integer, Ticket> tickets;
    private ReentrantLock lock;
    private ExecutorService executor;
    
    public BookingService(int totalTickets) {
        this.tickets = new ConcurrentHashMap<>();
        for (int i = 1; i <= totalTickets; i++) {
            tickets.put(i, new Ticket(i));
        }
        this.lock = new ReentrantLock();
        this.executor = Executors.newFixedThreadPool(4); // Thread pool
    }
    
    public boolean bookTicket(int ticketId, String userId) {
        lock.lock();
        try {
            Ticket ticket = tickets.get(ticketId);
            if (ticket == null || ticket.isBooked()) {
                return false;
            }
            ticket.book(userId);
            return true;
        } finally {
            lock.unlock();
        }
    }
    
    public boolean cancelTicket(int ticketId) {
        lock.lock();
        try {
            Ticket ticket = tickets.get(ticketId);
            if (ticket == null || !ticket.isBooked()) {
                return false;
            }
            ticket.cancel();
            return true;
        } finally {
            lock.unlock();
        }
    }
    
    public int getAvailableTickets() {
        lock.lock();
        try {
            int count = 0;
            for (Ticket ticket : tickets.values()) {
                if (!ticket.isBooked()) {
                    count++;
                }
            }
            return count;
        } finally {
            lock.unlock();
        }
    }
    
    // Example usage with concurrency
    public static void main(String[] args) {
        BookingService service = new BookingService(3);
        
        // Simulate concurrent bookings
        Runnable bookTask1 = () -> service.bookTicket(1, "User1");
        Runnable bookTask2 = () -> service.bookTicket(1, "User2");
        Runnable cancelTask = () -> service.cancelTicket(1);
        
        service.executor.execute(bookTask1);
        service.executor.execute(bookTask2);
        service.executor.execute(cancelTask);
        
        // Wait for tasks to complete
        service.executor.shutdown();
        try {
            service.executor.awaitTermination(5, java.util.concurrent.TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println("Available tickets: " + service.getAvailableTickets());
    }
}
```
- **OOP and Concurrency Principles**:
  - **Encapsulation**: Private `tickets` map and `lock` with public methods.
  - **Abstraction**: `BookingService` hides concurrency details.
  - **Thread Safety**: Uses `ReentrantLock` and `synchronized` for safe access.
  - **Clean Code**: Meaningful names, modularity (Section 9).
- **Big O**: O(1) for `bookTicket`, `cancelTicket` (with `ConcurrentHashMap`), O(n) for `getAvailableTickets`.
- **Edge Cases**: Handles invalid ticket IDs, concurrent bookings, empty system.

**Systematic Approach**:
- Gathered requirements (book/cancel tickets, thread-safe).
- Designed UML diagram to model `BookingService` and `Ticket`.
- Implemented Java classes with concurrency (`ReentrantLock`, `ConcurrentHashMap`).
- Tested with `main` method simulating concurrent tasks.

## Real-World Application
Imagine designing a ticketing system for a travel platform, where multiple users book seats simultaneously. Using `ReentrantLock` and `ConcurrentHashMap`, you ensure thread-safe operations without race conditions, supporting high-concurrency workloads. This approach—combining OOP and concurrency—ensures a reliable, scalable system and demonstrates your ability to mentor teams on robust design.

## Practice Exercises
Apply concurrency in OOD with these exercises:
- **Easy**: Design a thread-safe `Counter` class with `increment` and `decrement` methods using `synchronized`.
- **Medium**: Create a UML diagram and Java code for a thread-safe `Inventory` system with `addItem` and `removeItem`.
- **Medium**: Implement a `Queue` system with thread-safe `enqueue` and `dequeue` using `ReentrantLock`.
- **Hard**: Design a thread-safe `Reservation` system for a restaurant with `Table` and `Booking` classes, using `ExecutorService`.

Try implementing one system in Java with a UML diagram, ensuring thread safety and OOP principles.

## Conclusion
Concurrency in OOD equips you to design thread-safe, scalable Java systems. By mastering tools like `synchronized`, `ReentrantLock`, and `ConcurrentHashMap`, you’ll build reliable software, optimize high-concurrency systems, and teach others effectively. This advances your progress in Section 2 of the *Official CTO* journey.

**Next Step**: Explore [Advanced OOD: Elevator System](/interview-section/ood/elevator-system-design) to design a state-based system, or check out [all sections](/interview-section/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>