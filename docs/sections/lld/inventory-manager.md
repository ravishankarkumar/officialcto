---
title: Design an Inventory Manager
description: Learn low-level system design for an inventory manager in Java, focusing on stock tracking and updates for scalable, robust applications.
---

# Design an Inventory Manager

## Overview
Welcome to the twenty-eighth lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Designing an inventory manager is a practical LLD problem that tests your ability to model resource tracking using OOP principles. In this 25-minute lesson, we explore the **low-level design of an inventory manager system**, covering stock tracking (e.g., items and quantities) and updates (e.g., adding, removing, updating stock). Whether building a warehouse inventory system or preparing for FAANG interviews, this lecture equips you to design modular, scalable systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Design Patterns*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **low-level design** principles for an inventory manager with stock tracking and updates.
- Learn to model **classes**, **relationships**, and **functionality** in Java.
- Apply **OOP principles** (Section 2, Lecture 1), **design patterns** (Section 3), **design principles** (Section 4), and **HLD concepts** (Section 5) to LLD.
- Write clean, modular Java code (Section 9).

## Why Inventory Manager Design Matters
An inventory manager is a common FAANG interview problem that tests your ability to manage resources and handle updates efficiently. Drawing from my experience designing resource management systems, I’ve applied OOP principles to ensure maintainability and scalability in similar applications. This lecture prepares you to design robust systems and articulate your approach clearly, showcasing your mentorship skills.

In software engineering, inventory manager design helps you:
- **Track Resources**: Manage item quantities and details.
- **Handle Updates**: Support add, remove, and update operations.
- **Ensure Scalability**: Handle large inventories efficiently.
- **Teach Effectively**: Share practical LLD strategies.

## Key Concepts
### 1. Inventory Manager Components
- **Stock Tracking**: Manage items with attributes like ID, name, and quantity.
- **Updates**: Add, remove, or update item quantities in the inventory.
- **Functionality**:
  - Add new items to the inventory.
  - Update or remove existing items.
  - Query item details and stock levels.
- **Edge Cases**: Out-of-stock items, invalid quantities, duplicate items.

### 2. Design Patterns
- **Singleton Pattern** (Section 3, Lecture 1): For inventory manager instance.
- **Observer Pattern** (Section 3, Lecture 6): For notifying stock changes (extensible).
- **Strategy Pattern** (Section 3, Lecture 4): For update strategies (extensible).

### 3. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and polymorphism for item and inventory classes.
- **Design Patterns** (Section 3): Singleton, Observer, and Strategy patterns.
- **Design Principles** (Section 4): SoC (Lecture 11) separates item and inventory logic; KISS (Lecture 8) simplifies design.
- **HLD** (Section 5):
  - E-commerce Platform (Lecture 16): Similar inventory concepts.
  - LLD Intro (Lecture 1): Builds on class design.
  - Database Design (Lecture 2): Persisting inventory data.
  - API Design (Lecture 3): Exposing inventory controls.
  - Concurrency Handling (Lecture 4): Thread-safe stock updates.
  - Error Handling (Lecture 5): Handling invalid inputs.
  - Parking Lot (Lecture 6): Similar resource management.
  - Elevator System (Lecture 7): Similar state-driven design.
  - Vending Machine (Lecture 8): Similar resource tracking.
  - ATM Machine (Lecture 9): Similar transactional design.
  - Restaurant Management (Lecture 10): Similar resource allocation.
  - Library Management (Lecture 11): Similar inventory logic.
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
- **Clean Code** (Section 9): Meaningful names for classes and methods.

### 4. Use Case
Design an inventory manager for a warehouse, supporting stock tracking and updates for items.

## System Design
### Architecture
```
[Client] --> [InventoryController]
                |
                v
            [InventoryService]
                |
                v
           [Inventory] --> [Item]
```

- **Classes**:
  - `Item`: Represents an item with ID, name, and quantity.
  - `Inventory`: Manages a collection of items.
  - `InventoryService`: Handles business logic for stock operations.
  - `InventoryController`: Exposes API for operations.
- **Functionality**: Add/remove items, update quantities, query stock levels.
- **Trade-Offs**:
  - Storage: In-memory (fast, volatile) vs. database (persistent, slower).
  - Updates: Optimistic (fast, conflict-prone) vs. pessimistic locking (safe, slower).

## Code Example: Inventory Manager System
Below is a Java implementation of an inventory manager with stock tracking and updates.

```java
import java.util.HashMap;
import java.util.Map;

// Custom exception
public class InventoryException extends Exception {
    public InventoryException(String message) {
        super(message);
    }
}

// Item class
public class Item {
    private String itemId;
    private String name;
    private int quantity;

    public Item(String itemId, String name, int quantity) {
        this.itemId = itemId;
        this.name = name;
        this.quantity = quantity;
    }

    public String getItemId() {
        return itemId;
    }

    public String getName() {
        return name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) throws InventoryException {
        if (quantity < 0) {
            throw new InventoryException("Quantity cannot be negative: " + quantity);
        }
        this.quantity = quantity;
    }
}

// Inventory class
public class Inventory {
    private Map<String, Item> items;

    public Inventory() {
        this.items = new HashMap<>();
    }

    public void addItem(Item item) throws InventoryException {
        if (items.containsKey(item.getItemId())) {
            throw new InventoryException("Item already exists: " + item.getItemId());
        }
        items.put(item.getItemId(), item);
    }

    public void removeItem(String itemId) throws InventoryException {
        if (!items.containsKey(itemId)) {
            throw new InventoryException("Item not found: " + itemId);
        }
        items.remove(itemId);
    }

    public Item getItem(String itemId) throws InventoryException {
        Item item = items.get(itemId);
        if (item == null) {
            throw new InventoryException("Item not found: " + itemId);
        }
        return item;
    }

    public void updateQuantity(String itemId, int quantity) throws InventoryException {
        Item item = getItem(itemId);
        item.setQuantity(quantity);
    }
}

// Service layer
public class InventoryService {
    private final Inventory inventory;

    public InventoryService(Inventory inventory) {
        this.inventory = inventory;
    }

    public void addItem(String itemId, String name, int quantity) throws InventoryException {
        if (quantity < 0) {
            throw new InventoryException("Quantity cannot be negative: " + quantity);
        }
        inventory.addItem(new Item(itemId, name, quantity));
        System.out.println("Added item: " + name + " with quantity: " + quantity);
    }

    public void removeItem(String itemId) throws InventoryException {
        inventory.removeItem(itemId);
        System.out.println("Removed item: " + itemId);
    }

    public void updateQuantity(String itemId, int quantity) throws InventoryException {
        inventory.updateQuantity(itemId, quantity);
        System.out.println("Updated item: " + itemId + " to quantity: " + quantity);
    }

    public Item getItem(String itemId) throws InventoryException {
        return inventory.getItem(itemId);
    }
}

// Controller for API interactions
public class InventoryController {
    private final InventoryService service;

    public InventoryController(InventoryService service) {
        this.service = service;
    }

    public void handleAddItem(String itemId, String name, int quantity) {
        try {
            service.addItem(itemId, name, quantity);
        } catch (InventoryException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public void handleRemoveItem(String itemId) {
        try {
            service.removeItem(itemId);
        } catch (InventoryException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public void handleUpdateQuantity(String itemId, int quantity) {
        try {
            service.updateQuantity(itemId, quantity);
        } catch (InventoryException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public Item handleGetItem(String itemId) {
        try {
            return service.getItem(itemId);
        } catch (InventoryException e) {
            System.err.println("Error: " + e.getMessage());
            return null;
        }
    }
}

// Client to demonstrate usage
public class InventoryClient {
    public static void main(String[] args) {
        Inventory inventory = new Inventory();
        InventoryService service = new InventoryService(inventory);
        InventoryController controller = new InventoryController(service);

        // Normal flow
        controller.handleAddItem("item1", "Laptop", 10);
        controller.handleAddItem("item2", "Phone", 20);
        Item item = controller.handleGetItem("item1");
        System.out.println("Item: " + item.getName() + ", Quantity: " + item.getQuantity());
        controller.handleUpdateQuantity("item1", 15);
        controller.handleRemoveItem("item2");

        // Edge cases
        controller.handleAddItem("item1", "Laptop", 5); // Duplicate item
        controller.handleUpdateQuantity("item3", 10); // Non-existent item
        controller.handleUpdateQuantity("item1", -5); // Negative quantity
        controller.handleRemoveItem("item3"); // Non-existent item
        // Output:
        // Added item: Laptop with quantity: 10
        // Added item: Phone with quantity: 20
        // Item: Laptop, Quantity: 10
        // Updated item: item1 to quantity: 15
        // Removed item: item2
        // Error: Item already exists: item1
        // Error: Item not found: item3
        // Error: Quantity cannot be negative: -5
        // Error: Item not found: item3
    }
}
```
- **LLD Principles**:
  - **Stock Tracking**: `Item` manages ID, name, and quantity.
  - **Updates**: `Inventory` supports add, remove, and update operations.
  - **Classes**: `Item`, `Inventory`, `InventoryService`, `InventoryController`.
  - **Design Patterns**: Singleton (`Inventory`, optional), Observer (extensible for stock alerts), Strategy (extensible for update policies).
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates item and inventory logic; KISS (Lecture 8) simplifies implementation.
- **Big O**: O(1) for `addItem`, `removeItem`, `updateQuantity`, `getItem` (HashMap operations).
- **Edge Cases**: Handles duplicate items, non-existent items, negative quantities.

**UML Diagram**:
```
[Client] --> [InventoryController]
                |
                v
            [InventoryService]
                |
                v
           [Inventory]
                |
                v
           [Item]
```

## Real-World Application
Imagine designing an inventory manager for a warehouse, supporting stock tracking and updates for items like electronics or groceries. This LLD—aligned with HLD principles from Section 5 (e.g., E-commerce Platform, Lecture 16)—ensures scalability and reliability, critical for inventory systems.

## Practice Exercises
Practice inventory manager design with these exercises:
- **Easy**: Design a UML diagram and Java code for a simple inventory with one item type.
- **Medium**: Implement an inventory manager with add and remove operations.
- **Medium**: Design an LLD for an inventory manager with stock tracking and updates.
- **Hard**: Architect an inventory manager with Java, integrating multiple design patterns (e.g., Observer, Strategy).

Try designing one system in Java with a UML diagram, explaining stock tracking and updates.

## Conclusion
Mastering the design of an inventory manager equips you to build modular, scalable Java systems, enhancing your LLD skills. This lecture builds on HLD concepts and resource management principles, preparing you for FAANG interviews and real-world applications.

**Next Step**: Explore [Design a Parking lot System](/sections/lld/parking-lot) to continue your LLD journey, or check out [all sections](/sections/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>