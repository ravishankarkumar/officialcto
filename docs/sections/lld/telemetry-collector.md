---
title: Design a Telemetry Collector
description: Learn low-level system design for a telemetry collector in Java, focusing on data aggregation and storage for scalable, robust applications.
---

# Design a Telemetry Collector

## Overview
Welcome to the thirtieth lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Designing a telemetry collector is a practical LLD problem that tests your ability to aggregate and store system metrics or events using OOP principles. In this 25-minute lesson, we explore the **low-level design of a telemetry collector system**, covering data aggregation (e.g., metrics, logs) and storage (e.g., in-memory or persistent). Whether building an application monitoring system or preparing for FAANG interviews, this lecture equips you to design modular, scalable systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Design Patterns*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **low-level design** principles for a telemetry collector with data aggregation and storage.
- Learn to model **classes**, **relationships**, and **functionality** in Java.
- Apply **OOP principles** (Section 2, Lecture 1), **design patterns** (Section 3), **design principles** (Section 4), and **HLD concepts** (Section 5) to LLD.
- Write clean, modular Java code (Section 9).

## Why Telemetry Collector Design Matters
A telemetry collector is a critical component in modern applications, enabling monitoring, debugging, and performance analysis. Drawing from my experience designing event-driven systems, I’ve implemented similar mechanisms to ensure observability and reliability in high-performance applications. This lecture prepares you to design robust telemetry systems and articulate your approach clearly, showcasing your mentorship skills.

In software engineering, telemetry collector design helps you:
- **Aggregate Data**: Collect metrics or events efficiently.
- **Store Data**: Persist data for analysis or real-time use.
- **Ensure Scalability**: Handle high data volumes.
- **Teach Effectively**: Share practical LLD strategies.

## Key Concepts
### 1. Telemetry Collector Components
- **Data Aggregation**: Collect metrics or events (e.g., CPU usage, request counts).
- **Storage**: Store aggregated data (e.g., in-memory, file, database).
- **Functionality**:
  - Collect telemetry data from sources.
  - Aggregate data (e.g., count, sum, average).
  - Store or retrieve data for analysis.
- **Edge Cases**: Invalid metrics, storage failures, high data rates.

### 2. Design Patterns
- **Observer Pattern** (Section 3, Lecture 6): For collecting data from sources.
- **Strategy Pattern** (Section 3, Lecture 4): For storage mechanisms (extensible).
- **Singleton Pattern** (Section 3, Lecture 1): For telemetry collector instance (optional).

### 3. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation for telemetry data and storage classes.
- **Design Patterns** (Section 3): Observer and Strategy patterns.
- **Design Principles** (Section 4): SoC (Lecture 11) separates aggregation and storage logic; KISS (Lecture 8) simplifies design.
- **HLD** (Section 5):
  - Logging System (Lecture 31): Similar data collection concepts.
  - Notification System (Lecture 32): Similar event-driven processing.
  - LLD Intro (Lecture 1): Builds on class design.
  - Database Design (Lecture 2): Persisting telemetry data.
  - API Design (Lecture 3): Exposing telemetry controls.
  - Concurrency Handling (Lecture 4): Thread-safe data collection.
  - Error Handling (Lecture 5): Handling invalid data.
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
  - Logger (Lecture 21): Similar data logging.
  - URL Parser (Lecture 22): Similar data processing.
  - Q&A System (Lecture 23): Similar user interaction modeling.
  - Traffic Light Controller (Lecture 24): Similar state-driven design.
  - Hospital Management (Lecture 25): Similar resource management.
  - Cache with Expiry (Lecture 26): Similar data management.
  - Notification Dispatcher (Lecture 27): Similar event-driven processing.
  - Inventory Manager (Lecture 28): Similar resource tracking.
  - Matchmaking Engine (Lecture 29): Similar queue-based processing.
- **Clean Code** (Section 9): Meaningful names for classes and methods.

### 4. Use Case
Design a telemetry collector for an application monitoring system, supporting data aggregation and storage for metrics like request latency or error counts.

## System Design
### Architecture
```
[Client] --> [TelemetryController]
                |
                v
            [TelemetryCollector]
                |
                v
           [Metric] --> [Storage] --> [InMemoryStorage|FileStorage]
```

- **Classes**:
  - `Metric`: Represents telemetry data (e.g., name, value, timestamp).
  - `Storage`: Interface for storage mechanisms (e.g., `InMemoryStorage`, `FileStorage`).
  - `TelemetryCollector`: Manages metric aggregation and storage.
  - `TelemetryController`: Exposes API for collecting and retrieving metrics.
- **Functionality**: Collect metrics, aggregate data, store/retrieve metrics.
- **Trade-Offs**:
  - Storage: In-memory (fast, volatile) vs. file-based (persistent, slower).
  - Aggregation: Real-time (fast, resource-intensive) vs. batch (efficient, delayed).

## Code Example: Telemetry Collector System
Below is a Java implementation of a telemetry collector with data aggregation and storage.

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Custom exception
public class TelemetryException extends Exception {
    public TelemetryException(String message) {
        super(message);
    }
}

// Metric class
public class Metric {
    private String name;
    private double value;
    private long timestamp;

    public Metric(String name, double value, long timestamp) {
        this.name = name;
        this.value = value;
        this.timestamp = timestamp;
    }

    public String getName() {
        return name;
    }

    public double getValue() {
        return value;
    }

    public long getTimestamp() {
        return timestamp;
    }
}

// Storage interface
public interface Storage {
    void store(Metric metric) throws TelemetryException;
    List<Metric> retrieve(String metricName) throws TelemetryException;
}

// In-memory storage
public class InMemoryStorage implements Storage {
    private Map<String, List<Metric>> metrics;

    public InMemoryStorage() {
        this.metrics = new HashMap<>();
    }

    @Override
    public void store(Metric metric) throws TelemetryException {
        if (metric.getName() == null || metric.getName().isEmpty()) {
            throw new TelemetryException("Invalid metric name");
        }
        metrics.computeIfAbsent(metric.getName(), k -> new ArrayList<>()).add(metric);
    }

    @Override
    public List<Metric> retrieve(String metricName) throws TelemetryException {
        List<Metric> result = metrics.get(metricName);
        if (result == null) {
            throw new TelemetryException("Metric not found: " + metricName);
        }
        return new ArrayList<>(result);
    }
}

// File storage (simulated)
public class FileStorage implements Storage {
    @Override
    public void store(Metric metric) throws TelemetryException {
        if (metric.getName() == null || metric.getName().isEmpty()) {
            throw new TelemetryException("Invalid metric name");
        }
        System.out.println("Writing to file: " + metric.getName() + ", value: " + metric.getValue());
    }

    @Override
    public List<Metric> retrieve(String metricName) throws TelemetryException {
        throw new TelemetryException("File retrieval not implemented for demo");
    }
}

// Telemetry collector class
public class TelemetryCollector {
    private List<Storage> storages;
    private Map<String, List<Double>> aggregations;

    public TelemetryCollector() {
        this.storages = new ArrayList<>();
        this.aggregations = new HashMap<>();
    }

    public void addStorage(Storage storage) {
        storages.add(storage);
    }

    public void collect(String name, double value) throws TelemetryException {
        Metric metric = new Metric(name, value, System.currentTimeMillis());
        aggregations.computeIfAbsent(name, k -> new ArrayList<>()).add(value);
        for (Storage storage : storages) {
            storage.store(metric);
        }
        System.out.println("Collected metric: " + name + ", value: " + value);
    }

    public double getAverage(String name) throws TelemetryException {
        List<Double> values = aggregations.get(name);
        if (values == null || values.isEmpty()) {
            throw new TelemetryException("No data for metric: " + name);
        }
        double sum = 0;
        for (Double value : values) {
            sum += value;
        }
        return sum / values.size();
    }

    public List<Metric> retrieveMetrics(String name) throws TelemetryException {
        List<Metric> result = new ArrayList<>();
        for (Storage storage : storages) {
            try {
                result.addAll(storage.retrieve(name));
            } catch (TelemetryException e) {
                // Continue with other storages
                System.err.println("Storage error: " + e.getMessage());
            }
        }
        if (result.isEmpty()) {
            throw new TelemetryException("No metrics found for: " + name);
        }
        return result;
    }
}

// Controller for API interactions
public class TelemetryController {
    private final TelemetryCollector collector;

    public TelemetryController(TelemetryCollector collector) {
        this.collector = collector;
    }

    public void handleAddStorage(Storage storage) {
        collector.addStorage(storage);
    }

    public void handleCollect(String name, double value) {
        try {
            collector.collect(name, value);
        } catch (TelemetryException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public double handleGetAverage(String name) {
        try {
            return collector.getAverage(name);
        } catch (TelemetryException e) {
            System.err.println("Error: " + e.getMessage());
            return -1;
        }
    }

    public List<Metric> handleRetrieveMetrics(String name) {
        try {
            return collector.retrieveMetrics(name);
        } catch (TelemetryException e) {
            System.err.println("Error: " + e.getMessage());
            return new ArrayList<>();
        }
    }
}

// Client to demonstrate usage
public class TelemetryClient {
    public static void main(String[] args) {
        TelemetryCollector collector = new TelemetryCollector();
        TelemetryController controller = new TelemetryController(collector);

        // Normal flow
        controller.handleAddStorage(new InMemoryStorage());
        controller.handleAddStorage(new FileStorage());
        controller.handleCollect("request_latency", 120.5);
        controller.handleCollect("request_latency", 130.2);
        System.out.println("Average latency: " + controller.handleGetAverage("request_latency"));
        List<Metric> metrics = controller.handleRetrieveMetrics("request_latency");
        System.out.println("Retrieved metrics: " + metrics.size());

        // Edge cases
        controller.handleCollect("", 100.0); // Invalid metric name
        controller.handleGetAverage("error_count"); // No data
        controller.handleRetrieveMetrics("error_count"); // No metrics
        // Output:
        // Collected metric: request_latency, value: 120.5
        // Writing to file: request_latency, value: 120.5
        // Collected metric: request_latency, value: 130.2
        // Writing to file: request_latency, value: 130.2
        // Average latency: 125.35
        // Storage error: File retrieval not implemented for demo
        // Retrieved metrics: 2
        // Error: Invalid metric name
        // Error: No data for metric: error_count
        // Error: No metrics found for: error_count
    }
}
```
- **LLD Principles**:
  - **Data Aggregation**: `TelemetryCollector` aggregates metrics and computes averages.
  - **Storage**: `Storage` interface with `InMemoryStorage` and `FileStorage` for persistence.
  - **Classes**: `Metric`, `Storage`, `InMemoryStorage`, `FileStorage`, `TelemetryCollector`, `TelemetryController`.
  - **Design Patterns**: Strategy (storage mechanisms), Observer (extensible for data sources).
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates aggregation and storage logic; DIP (Section 4, Lecture 6) via `Storage` interface.
- **Big O**: O(1) for `collect` (HashMap and list operations), O(n) for `getAverage` (n = values), O(m) for `retrieveMetrics` (m = metrics).
- **Edge Cases**: Handles invalid metric names, missing data, storage failures.

**UML Diagram**:
```
[Client] --> [TelemetryController]
                |
                v
            [TelemetryCollector]
                |
                v
           [Metric] --> [Storage] --> [InMemoryStorage|FileStorage]
```

## Real-World Application
Imagine designing a telemetry collector for an application monitoring system, aggregating metrics like request latency and storing them for analysis. This LLD—aligned with HLD principles from Section 5 (e.g., Logging System, Lecture 31)—ensures scalability and reliability, critical for monitoring systems.

## Practice Exercises
Practice telemetry collector design with these exercises:
- **Easy**: Design a UML diagram and Java code for a simple metric collector with in-memory storage.
- **Medium**: Implement a telemetry collector with basic aggregation and storage.
- **Medium**: Design an LLD for a telemetry collector with multiple storage options.
- **Hard**: Architect a telemetry collector with Java, integrating multiple design patterns (e.g., Strategy, Observer).

Try designing one system in Java with a UML diagram, explaining data aggregation and storage.

## Conclusion
Mastering the design of a telemetry collector equips you to build modular, scalable Java systems, enhancing your LLD skills. This lecture builds on HLD concepts and event-driven principles, preparing you for FAANG interviews and real-world applications.

**Next Step**: Explore [Design a Parking lot System](/sections/lld/parking-lot) to continue your LLD journey, or check out [all sections](/sections/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>