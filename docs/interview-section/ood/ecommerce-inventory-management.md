---
title: OOD for E-Commerce - Inventory Management
description: Master object-oriented design in Java by building a scalable, thread-safe e-commerce inventory system, using OOP, UML, and concurrency for better software engineering.
---

# OOD for E-Commerce: Inventory Management

## Overview
Designing scalable, thread-safe systems is crucial for e-commerce platforms handling high-concurrency workloads. In this sixth lesson of Section 2 in the *Official CTO* journey, we explore **object-oriented design (OOD) for an e-commerce inventory system**, leveraging OOP principles (encapsulation, polymorphism, abstraction) and concurrency to manage inventory efficiently. Whether managing hotel bookings for a travel platform or products in an online store, this lesson teaches you to create robust, extensible Java systems. By mastering this design, you’ll build reliable software and mentor others effectively.

Inspired by *Head First Design Patterns*, *Clean Code*, and *Java Concurrency in Practice*, this 25-minute lesson covers the concepts, a practical Java implementation with a UML diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Apply **OOP principles** (encapsulation, polymorphism, abstraction) to inventory system design.
- Use **UML class diagrams** to model inventory relationships (Lecture 2).
- Incorporate **concurrency** for thread-safe inventory operations (Lecture 4).
- Design a **scalable system** handling high-concurrency e-commerce workloads.

## Why Inventory System Design Matters
Inventory systems are the backbone of e-commerce, managing stock, bookings, or resources under high demand. Early in my career, I designed an inventory system for a travel platform, ensuring thread-safe updates for hotel bookings across multiple users. This approach—combining OOP for modularity, UML for clarity, and concurrency for reliability—ensures scalable, maintainable systems. Explaining these designs clearly showcases your mentorship skills.

In software engineering, inventory system design helps you:
- **Ensure Scalability**: Handle thousands of concurrent updates.
- **Enhance Modularity**: Encapsulate logic for low coupling.
- **Clarify Design**: Use UML to align stakeholders (Lecture 2).
- **Teach Effectively**: Share scalable design strategies with teams.

## Key Concepts
### 1. OOP Principles (Review from Lecture 1)
- **Encapsulation**: Protect inventory data (e.g., stock levels) with private fields.
- **Polymorphism**: Handle different item types (e.g., hotel rooms, products) via a common interface.
- **Abstraction**: Hide complex inventory logic with interfaces (e.g., `InventoryService`).

### 2. UML Class Diagrams (Review from Lecture 2)
- Model `Inventory`, `Item`, and relationships (e.g., composition, inheritance).
- Use multiplicity to indicate one-to-many (e.g., `Inventory` manages many `Item`).

### 3. Concurrency in OOD (Review from Lecture 4)
- Use `ReentrantLock`, `ConcurrentHashMap`, or `synchronized` for thread-safe stock updates.
- Ensure atomic operations for add/remove stock actions.

### 4. Inventory System Design
- **Requirements**: Track items, manage stock levels, support concurrent updates, handle errors (e.g., out-of-stock).
- **Classes**: `Item` (base class), `HotelRoom` (subclass), `Inventory` (manager), `InventoryService` (interface).
- **Design Goals**: Scalability, thread safety, extensibility for new item types.

## Code Example: Inventory System
Let’s design a thread-safe inventory system for a travel platform, managing hotel bookings, with a UML class diagram.

### UML Class Diagram
```
+---------------------+       1       +---------------------+
|    Inventory       |-------------|      Item           |
+---------------------+       1..*   +---------------------+
| -items: ConcurrentHashMap<Integer, Item> | -id: int       |
| -lock: ReentrantLock |              | -name: String      |
|                     |              | -stock: int        |
+---------------------+              +---------------------+
| +addStock(id, qty)  |              | +updateStock(qty: int) |
| +removeStock(id, qty) |            +---------------------+
| +getStock(id): int  |                     |
+---------------------+                     | extends
                                            |
                                     +---------------------+
                                     |    HotelRoom       |
                                     +---------------------+
                                     | -roomType: String  |
                                     +---------------------+
                                     | +getRoomType(): String |
                                     +---------------------+
       1 |
         | implements
+---------------------+
|  InventoryService   |
+---------------------+
| +addStock(id, qty)  |
| +removeStock(id, qty) |
| +getStock(id): int  |
+---------------------+
```

### Java Implementation
```java
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantLock;

// Item base class
public abstract class Item {
    private int id;
    private String name;
    private int stock;
    
    public Item(int id, String name, int stock) {
        this.id = id;
        this.name = name;
        this.stock = stock;
    }
    
    public synchronized void updateStock(int quantity) {
        if (stock + quantity >= 0) {
            stock += quantity;
        } else {
            throw new IllegalStateException("Insufficient stock for item " + id);
        }
    }
    
    public int getId() {
        return id;
    }
    
    public String getName() {
        return name;
    }
    
    public int getStock() {
        return stock;
    }
}

// HotelRoom subclass
public class HotelRoom extends Item {
    private String roomType;
    
    public HotelRoom(int id, String name, int stock, String roomType) {
        super(id, name, stock);
        this.roomType = roomType;
    }
    
    public String getRoomType() {
        return roomType;
    }
}

// InventoryService interface
public interface InventoryService {
    void addStock(int id, int quantity);
    void removeStock(int id, int quantity);
    int getStock(int id);
}

// Inventory class
public class Inventory implements InventoryService {
    private ConcurrentHashMap<Integer, Item> items;
    private ReentrantLock lock;
    
    public Inventory() {
        this.items = new ConcurrentHashMap<>();
        this.lock = new ReentrantLock();
    }
    
    public void addItem(Item item) {
        items.put(item.getId(), item);
    }
    
    @Override
    public void addStock(int id, int quantity) {
        lock.lock();
        try {
            Item item = items.get(id);
            if (item == null) {
                throw new IllegalArgumentException("Item " + id + " not found");
            }
            item.updateStock(quantity);
        } finally {
            lock.unlock();
        }
    }
    
    @Override
    public void removeStock(int id, int quantity) {
        lock.lock();
        try {
            Item item = items.get(id);
            if (item == null) {
                throw new IllegalArgumentException("Item " + id + " not found");
            }
            item.updateStock(-quantity);
        } finally {
            lock.unlock();
        }
    }
    
    @Override
    public int getStock(int id) {
        lock.lock();
        try {
            Item item = items.get(id);
            if (item == null) {
                throw new IllegalArgumentException("Item " + id + " not found");
            }
            return item.getStock();
        } finally {
            lock.unlock();
        }
    }
    
    // Example usage with concurrency
    public static void main(String[] args) {
        Inventory inventory = new Inventory();
        Item room = new HotelRoom(101, "Deluxe Suite", 10, "Suite");
        inventory.addItem(room);
        
        // Simulate concurrent updates
        Thread t1 = new Thread(() -> inventory.removeStock(101, 2));
        Thread t2 = new Thread(() -> inventory.addStock(101, 5));
        
        t1.start();
        t2.start();
        
        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println("Stock for item 101: " + inventory.getStock(101));
        // Output: Stock for item 101: 13
    }
}
```
- **OOP and Concurrency Principles**:
  - **Encapsulation**: Private fields (`id`, `stock`) with getters and synchronized updates.
  - **Polymorphism**: `Item` base class supports different types (e.g., `HotelRoom`).
  - **Abstraction**: `InventoryService` interface hides implementation details.
  - **Thread Safety**: Uses `ReentrantLock` and `ConcurrentHashMap` for concurrent updates (Lecture 4).
  - **Clean Code**: Meaningful names, modularity (Section 9).
- **Big O**: O(1) for `addStock`, `removeStock`, `getStock` (with `ConcurrentHashMap`), O(n) for iteration if needed.
- **Edge Cases**: Handles invalid item IDs, insufficient stock, concurrent updates.

**Systematic Approach**:
- Gathered requirements (manage inventory, support concurrent updates, handle errors).
- Designed UML diagram to model `Inventory`, `Item`, `HotelRoom`, `InventoryService`.
- Implemented Java classes with OOP and concurrency.
- Tested with `main` method simulating concurrent stock updates.

## Real-World Application
Imagine managing hotel bookings for a travel platform, where multiple users update inventory simultaneously. Using `ConcurrentHashMap` and `ReentrantLock`, you ensure thread-safe stock updates, preventing overselling. This design—combining OOP for modularity, concurrency for scalability, and UML for clarity—supports high-concurrency e-commerce systems and demonstrates your ability to mentor teams on robust design.

## Practice Exercises
Apply OOD and concurrency with these exercises:
- **Easy**: Design a UML diagram and Java code for a thread-safe `Product` inventory with `addStock` and `removeStock`.
- **Medium**: Create a UML diagram and Java code for a thread-safe `Warehouse` system with `Item` and `Category` classes.
- **Medium**: Implement a thread-safe `TicketInventory` for events, using `ConcurrentHashMap`.
- **Hard**: Design a UML diagram and Java code for a thread-safe `RetailInventory` with `Product` and `Supplier` classes.

Try designing one system in Java with a UML diagram, ensuring OOP, concurrency, and clean code principles.

## Conclusion
Designing an e-commerce inventory system with OOD equips you to build scalable, thread-safe Java systems. By mastering OOP, UML, and concurrency, you’ll create robust software, optimize high-concurrency systems, and teach others effectively. This advances your progress in Section 2 of the *Official CTO* journey.

**Next Step**: Explore [Trade-Offs and Refactoring](/interview-section/ood/trade-offs-refactoring) to balance design decisions, or check out [all sections](/interview-section/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>