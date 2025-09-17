---
title: Design an LRU Cache
description: Learn low-level system design for an LRU cache in Java, focusing on hashmap and doubly linked list implementation for scalable, efficient applications.
---

# Design an LRU Cache

## Overview
Welcome to the sixteenth lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Designing an LRU (Least Recently Used) cache is a classic LLD problem that tests your ability to combine data structures for efficient performance using OOP principles. In this 25-minute lesson, we explore the **low-level design of an LRU cache**, covering hashmap for O(1) lookups, doubly linked list for O(1) updates, and eviction policies to manage capacity. Whether building a caching system for a web application or preparing for FAANG interviews, this lecture equips you to design modular, efficient systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Design Patterns*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **low-level design** principles for an LRU cache with hashmap and doubly linked list.
- Learn to model **classes**, **data structures**, and **functionality** in Java.
- Apply **OOP principles** (Section 2, Lecture 1), **design patterns** (Section 3), **design principles** (Section 4), and **HLD concepts** (Section 5) to LLD.
- Write clean, modular Java code (Section 9).

## Why LRU Cache Design Matters
An LRU cache is a common FAANG interview problem that tests your ability to combine data structures for performance optimization. Drawing from my experience designing efficient systems, I’ve applied similar techniques to ensure fast data access in high-performance applications. This lecture prepares you to design robust caching systems and articulate your approach clearly, showcasing your mentorship skills.

In software engineering, LRU cache design helps you:
- **Optimize Performance**: Achieve O(1) get and put operations.
- **Manage Resources**: Evict least recently used items efficiently.
- **Ensure Scalability**: Support high-throughput systems.
- **Teach Effectively**: Share practical LLD strategies.

## Key Concepts
### 1. LRU Cache Components
- **HashMap**: Stores key-value pairs for O(1) lookups.
- **Doubly Linked List**: Tracks usage order for O(1) updates and evictions.
- **Functionality**:
  - `get(key)`: Retrieve value, mark as recently used.
  - `put(key, value)`: Add/update key-value pair, evict least recently used if full.
- **Edge Cases**: Invalid keys, full cache, null values.

### 2. Design Patterns
- **Strategy Pattern** (Section 3, Lecture 4): For eviction policies (extensible).
- **Composite Pattern** (Section 3, Lecture 9): Combining hashmap and linked list.

### 3. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation for cache nodes and operations.
- **Design Patterns** (Section 3): Strategy and Composite patterns.
- **Design Principles** (Section 4): SoC (Lecture 11) separates cache logic; KISS (Lecture 8) simplifies design.
- **HLD** (Section 5):
  - Distributed Cache (Lecture 23): Similar caching concepts.
  - LLD Intro (Lecture 1): Builds on class design.
  - Database Design (Lecture 2): Persisting cache data (optional).
  - API Design (Lecture 3): Exposing cache operations.
  - Concurrency Handling (Lecture 4): Thread-safe cache (optional).
  - Error Handling (Lecture 5): Handling invalid keys.
  - Parking Lot (Lecture 6): Similar entity modeling.
  - Elevator System (Lecture 7): Similar state-driven design.
  - Vending Machine (Lecture 8): Similar rule-based logic.
  - ATM Machine (Lecture 9): Similar transactional design.
  - Restaurant Management (Lecture 10): Similar entity management.
  - Library Management (Lecture 11): Similar inventory logic.
  - Chess Game (Lecture 12): Similar rule-based design.
  - Tic-Tac-Toe (Lecture 13): Similar game logic.
  - Snake and Ladder (Lecture 14): Similar mechanics.
  - Deck of Cards (Lecture 15): Similar entity management.
- **Clean Code** (Section 9): Meaningful names for classes and methods.

### 4. Use Case
Design an LRU cache for a web application, supporting fast key-value access with eviction of least recently used items.

## System Design
### Architecture
```
[Client] --> [CacheController]
                |
                v
            [LRUCache]
                |
                v
           [Node] --> [DoublyLinkedList]
           [HashMap]
```

- **Classes**:
  - `Node`: Represents a key-value pair in the doubly linked list.
  - `DoublyLinkedList`: Manages usage order.
  - `LRUCache`: Combines hashmap and linked list for cache operations.
  - `CacheController`: Exposes API for get/put.
- **Functionality**: Get and put operations, evict least recently used item when full.
- **Trade-Offs**:
  - Data Structure: HashMap + Doubly Linked List (O(1) operations, complex) vs. Array (simpler, O(n) updates).
  - Eviction: LRU (efficient for recency) vs. FIFO (simpler, less optimal).

## Code Example: LRU Cache System
Below is a Java implementation of an LRU cache using a hashmap and doubly linked list.

```java
import java.util.HashMap;
import java.util.Map;

// Custom exception
public class CacheException extends Exception {
    public CacheException(String message) {
        super(message);
    }
}

// Node class for doubly linked list
public class Node {
    int key;
    int value;
    Node prev;
    Node next;

    public Node(int key, int value) {
        this.key = key;
        this.value = value;
    }
}

// Doubly linked list for LRU order
public class DoublyLinkedList {
    private Node head;
    private Node tail;

    public DoublyLinkedList() {
        head = new Node(0, 0); // Dummy head
        tail = new Node(0, 0); // Dummy tail
        head.next = tail;
        tail.prev = head;
    }

    public void addNode(Node node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }

    public void removeNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    public Node removeTail() {
        Node node = tail.prev;
        removeNode(node);
        return node;
    }

    public void moveToHead(Node node) {
        removeNode(node);
        addNode(node);
    }
}

// LRU Cache class
public class LRUCache {
    private Map<Integer, Node> cache;
    private DoublyLinkedList list;
    private int capacity;

    public LRUCache(int capacity) {
        this.cache = new HashMap<>();
        this.list = new DoublyLinkedList();
        this.capacity = capacity;
    }

    public int get(int key) throws CacheException {
        Node node = cache.get(key);
        if (node == null) {
            throw new CacheException("Key not found: " + key);
        }
        list.moveToHead(node);
        return node.value;
    }

    public void put(int key, int value) {
        Node node = cache.get(key);
        if (node != null) {
            node.value = value;
            list.moveToHead(node);
        } else {
            Node newNode = new Node(key, value);
            cache.put(key, newNode);
            list.addNode(newNode);
            if (cache.size() > capacity) {
                Node lru = list.removeTail();
                cache.remove(lru.key);
                System.out.println("Evicted key: " + lru.key);
            }
        }
        System.out.println("Put key: " + key + ", value: " + value);
    }
}

// Controller for API interactions
public class CacheController {
    private final LRUCache cache;

    public CacheController(LRUCache cache) {
        this.cache = cache;
    }

    public int handleGet(int key) {
        try {
            return cache.get(key);
        } catch (CacheException e) {
            System.err.println("Error: " + e.getMessage());
            return -1;
        }
    }

    public void handlePut(int key, int value) {
        cache.put(key, value);
    }
}

// Client to demonstrate usage
public class CacheClient {
    public static void main(String[] args) {
        LRUCache cache = new LRUCache(2); // Capacity 2
        CacheController controller = new CacheController(cache);

        // Normal flow
        controller.handlePut(1, 100);
        controller.handlePut(2, 200);
        System.out.println("Get key 1: " + controller.handleGet(1)); // Access moves to head
        controller.handlePut(3, 300); // Evicts key 2
        System.out.println("Get key 2: " + controller.handleGet(2)); // Not found

        // Edge cases
        controller.handlePut(3, 400); // Update existing key
        controller.handleGet(4); // Invalid key
        // Output:
        // Put key: 1, value: 100
        // Put key: 2, value: 200
        // Get key 1: 100
        // Put key: 3, value: 300
        // Evicted key: 2
        // Error: Key not found: 2
        // Get key 2: -1
        // Put key: 3, value: 400
        // Error: Key not found: 4
    }
}
```
- **LLD Principles**:
  - **HashMap**: `cache` map for O(1) key-value lookups.
  - **Doubly Linked List**: `DoublyLinkedList` for O(1) usage tracking and eviction.
  - **Classes**: `Node`, `DoublyLinkedList`, `LRUCache`, `CacheController`.
  - **Design Patterns**: Composite (hashmap + linked list), Strategy (extensible eviction).
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates cache logic; KISS (Lecture 8) simplifies implementation.
- **Big O**: O(1) for `get`, `put` (HashMap and linked list operations).
- **Edge Cases**: Handles invalid keys, full cache, updates to existing keys.

**UML Diagram**:
```
[Client] --> [CacheController]
                |
                v
            [LRUCache]
                |
                v
           [Node] --> [DoublyLinkedList]
           [HashMap]
```

## Real-World Application
Imagine designing an LRU cache for a web application to store frequently accessed data, ensuring fast retrieval and efficient memory use. This LLD—aligned with HLD principles from Section 5 (e.g., Distributed Cache, Lecture 23)—ensures performance and scalability, critical for caching systems.

## Practice Exercises
Practice LRU cache design with these exercises:
- **Easy**: Design a UML diagram and Java code for a simple key-value cache.
- **Medium**: Implement an LRU cache with a fixed capacity and basic get/put.
- **Medium**: Design an LLD for an LRU cache with hashmap and doubly linked list.
- **Hard**: Architect an LRU cache with Java, integrating a design pattern (e.g., Strategy for eviction).

Try designing one system in Java with a UML diagram, explaining hashmap and linked list integration.

## Conclusion
Mastering the design of an LRU cache equips you to build efficient, scalable Java systems, enhancing your LLD skills. This lecture builds on HLD concepts and algorithmic principles from your prior work, preparing you for FAANG interviews and real-world applications.

**Next Step**: Explore [Design a Rate Limiter](/interview-section/lld/rate-limiter) to continue your LLD journey, or check out [all sections](/interview-section/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>