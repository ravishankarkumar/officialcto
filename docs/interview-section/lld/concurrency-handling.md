---
title: Concurrency Handling - Locks, Threads
description: Learn low-level system design for concurrency handling in Java, focusing on locks, threads, and executors for scalable, thread-safe systems.
---

# Concurrency Handling: Locks, Threads

## Overview
Welcome to the fourth lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Concurrency handling is essential for building scalable, high-performance systems that manage multiple tasks simultaneously. In this 20-minute lesson, we explore **low-level design principles for concurrency**, focusing on locks, threads, and Java executors to ensure thread safety and efficiency. Whether processing tasks in a web platform or preparing for FAANG interviews, this lecture equips you to design robust concurrent systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Java Concurrency in Practice*, and *Designing Data-Intensive Applications*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **concurrency handling** principles using locks, threads, and Java executors.
- Learn to design **thread-safe systems** in Java for scalability and performance.
- Apply **OOP principles** (Section 2, Lecture 1), **design principles** (Section 4), and **HLD concepts** (Section 5) to concurrency LLD.
- Write clean, thread-safe Java code (Section 9).

## Why Concurrency Handling Matters
Concurrency enables systems to handle multiple tasks simultaneously, improving performance and scalability. Early in my career, I designed a concurrent task processing system for a web platform, using Java executors to manage threads and locks for thread safety. These skills are critical for FAANG interviews, where candidates must design efficient, thread-safe systems. Mastering concurrency handling showcases your ability to build robust systems and mentor others effectively.

In software engineering, concurrency handling helps you:
- **Improve Performance**: Execute tasks in parallel.
- **Ensure Thread Safety**: Prevent race conditions and data corruption.
- **Support Scalability**: Handle high concurrency in large-scale systems.
- **Teach Effectively**: Share practical concurrency design strategies.

## Key Concepts
### 1. Concurrency Basics
- **Threads**: Independent execution units within a process.
- **Race Conditions**: Occur when threads access shared resources concurrently.
- **Thread Safety**: Ensure data integrity during concurrent access.

### 2. Locks
- **Synchronized Blocks/Methods**: Java’s built-in locking mechanism.
- **ReentrantLock**: Flexible lock with explicit control (e.g., tryLock).
- **ReadWriteLock**: Separate read and write locks for better concurrency.
- **Trade-Offs**: Locks ensure safety but can cause contention or deadlocks.

### 3. Java Executors
- **ExecutorService**: Manages thread pools for task execution.
- **Types**: FixedThreadPool, CachedThreadPool, ScheduledThreadPool.
- **Benefits**: Simplifies thread management, improves scalability.
- **Trade-Offs**: Thread pools (efficient, resource-limited) vs. raw threads (flexible, complex).

### 4. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation for thread-safe classes.
- **Design Principles** (Section 4): SoC (Lecture 11) separates task logic; KISS (Lecture 8) simplifies concurrency.
- **HLD** (Section 5):
  - Event-Driven Architecture (Lecture 34): LLD for concurrent event processing.
  - Scaling Databases (Lecture 32): LLD for concurrent database access.
  - LLD Intro (Lecture 1): Builds on concurrency concepts.
  - Database Design (Lecture 2): Concurrent queries on schemas.
  - API Design (Lecture 3): Concurrent API handling.
- **Clean Code** (Section 9): Meaningful names for concurrency components.

### 5. Use Case
Design a concurrent task queue system for a web platform, using Java executors and locks to process tasks thread-safely.

## System Design
### Architecture
```
[Client] --> [TaskController]
                |
                v
            [TaskService]
                |
                v
           [TaskQueue] --> [Task]
                |
                v
           [ExecutorService]
```

- **Classes**: `Task` (domain), `TaskQueue` (shared resource), `TaskService` (logic), `TaskController` (API).
- **Concurrency**: Use `ExecutorService` for thread management; `ReentrantLock` for queue access.
- **Trade-Offs**:
  - Locks: `ReentrantLock` (flexible, explicit) vs. synchronized (simple, less control).
  - Executors: FixedThreadPool (predictable, limited) vs. CachedThreadPool (dynamic, resource-heavy).

## Code Example: Concurrent Task Queue
Below is a Java implementation of a concurrent task queue system using executors and locks.

```java
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.locks.ReentrantLock;

// Domain model
public class Task {
    private String taskId;
    private String description;
    private boolean completed;

    public Task(String taskId, String description) {
        this.taskId = taskId;
        this.description = description;
        this.completed = false;
    }

    public String getTaskId() {
        return taskId;
    }

    public String getDescription() {
        return description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void complete() {
        this.completed = true;
    }
}

// Thread-safe task queue
public class TaskQueue {
    private final List<Task> tasks = new ArrayList<>();
    private final ReentrantLock lock = new ReentrantLock();

    public void addTask(Task task) {
        lock.lock();
        try {
            System.out.println("Adding task: " + task.getTaskId());
            tasks.add(task);
        } finally {
            lock.unlock();
        }
    }

    public Task getNextTask() {
        lock.lock();
        try {
            if (tasks.isEmpty()) {
                return null;
            }
            Task task = tasks.get(0);
            tasks.remove(0);
            return task;
        } finally {
            lock.unlock();
        }
    }
}

// Service layer with executor
public class TaskService {
    private final TaskQueue queue;
    private final ExecutorService executor;

    public TaskService(TaskQueue queue) {
        this.queue = queue;
        this.executor = Executors.newFixedThreadPool(4); // Fixed thread pool
    }

    public void submitTask(String taskId, String description) {
        Task task = new Task(taskId, description);
        queue.addTask(task);
        executor.submit(() -> processTask(task));
    }

    private void processTask(Task task) {
        System.out.println("Processing task: " + task.getTaskId() + " on thread: " + Thread.currentThread().getName());
        try {
            Thread.sleep(100); // Simulate work
            task.complete();
            System.out.println("Completed task: " + task.getTaskId());
        } catch (InterruptedException e) {
            System.err.println("Task interrupted: " + task.getTaskId());
        }
    }

    public void shutdown() {
        executor.shutdown();
    }
}

// Controller for API interactions
public class TaskController {
    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    public void handleSubmitTask(String taskId, String description) {
        service.submitTask(taskId, description);
        System.out.println("Submitted task: " + taskId);
    }
}

// Client to demonstrate usage
public class TaskClient {
    public static void main(String[] args) throws InterruptedException {
        TaskQueue queue = new TaskQueue();
        TaskService service = new TaskService(queue);
        TaskController controller = new TaskController(service);

        // Submit tasks concurrently
        controller.handleSubmitTask("task1", "Process order");
        controller.handleSubmitTask("task2", "Send notification");
        controller.handleSubmitTask("task3", "Update inventory");

        // Wait for tasks to complete
        Thread.sleep(1000);
        service.shutdown();
        // Output (order may vary due to concurrency):
        // Adding task: task1
        // Submitted task: task1
        // Processing task: task1 on thread: pool-1-thread-1
        // Adding task: task2
        // Submitted task: task2
        // Processing task: task2 on thread: pool-1-thread-2
        // Adding task: task3
        // Submitted task: task3
        // Processing task: task3 on thread: pool-1-thread-3
        // Completed task: task1
        // Completed task: task2
        // Completed task: task3
    }
}
```
- **LLD Principles**:
  - **Threads**: `ExecutorService` manages a fixed thread pool for task processing.
  - **Locks**: `ReentrantLock` ensures thread-safe queue access.
  - **Classes**: `Task` (domain), `TaskQueue` (shared resource), `TaskService` (logic), `TaskController` (API).
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates task logic; DIP (Section 4, Lecture 6) for future extensibility.
- **Big O**: O(1) for `addTask`, `getNextTask` (with lock contention).
- **Edge Cases**: Handles empty queue, task interruptions.

**UML Diagram**:
```
[Client] --> [TaskController]
                |
                v
            [TaskService]
                |
                v
           [TaskQueue] --> [Task]
                |
                v
           [ExecutorService]
```

## Real-World Application
Imagine designing a concurrent task queue for a web platform, using Java executors to process orders and notifications in parallel. This LLD—aligned with HLD from Section 5 (e.g., Event-Driven Architecture, Lecture 34)—ensures thread safety and scalability, critical for high-performance systems.

## Practice Exercises
Practice concurrency handling with these exercises:
- **Easy**: Design a UML diagram and Java code for a simple thread-safe queue.
- **Medium**: Implement a task processor using Java `ExecutorService`.
- **Medium**: Design an LLD for a concurrent system with locks and threads in Java.
- **Hard**: Architect a concurrent task system with Java, integrating a design pattern (e.g., Producer-Consumer).

Try designing one system in Java with a UML diagram, explaining concurrency mechanisms.

## Conclusion
Mastering concurrency handling with locks, threads, and Java executors equips you to build scalable, thread-safe Java systems, enhancing your LLD skills. This lecture builds on HLD concepts, preparing you for FAANG interviews and real-world systems.

**Next Step**: Explore [Error Handling, Edge Cases, and Resilience](/interview-section/lld/error-handling) to continue your LLD journey, or check out [all sections](/interview-section/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>