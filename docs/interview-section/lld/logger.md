---
title: Design a Logger
description: Learn low-level system design for a logger system in Java, focusing on log levels and appenders for scalable, robust applications.
---

# Design a Logger

## Overview
Welcome to the twenty-first lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Designing a logger system is a practical LLD problem that tests your ability to manage logging functionality with flexibility and performance using OOP principles. In this 25-minute lesson, we explore the **low-level design of a logger system**, covering log levels (e.g., DEBUG, INFO, ERROR), appenders (e.g., console, file), and operations like logging messages and configuring outputs. Whether building a logging system for an application or preparing for FAANG interviews, this lecture equips you to design modular, scalable systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Design Patterns*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **low-level design** principles for a logger system with log levels and appenders.
- Learn to model **classes**, **relationships**, and **functionality** in Java.
- Apply **OOP principles** (Section 2, Lecture 1), **design patterns** (Section 3), **design principles** (Section 4), and **HLD concepts** (Section 5) to LLD.
- Write clean, modular Java code (Section 9).

## Why Logger System Design Matters
A logger system is a critical component in modern applications, enabling debugging, monitoring, and auditing. Drawing from my experience designing system-level components, I’ve implemented logging mechanisms to ensure observability and reliability in high-performance applications. This lecture prepares you to design robust logging systems and articulate your approach clearly, showcasing your mentorship skills.

In software engineering, logger system design helps you:
- **Enhance Observability**: Log events for debugging and monitoring.
- **Support Flexibility**: Configure log levels and outputs.
- **Ensure Scalability**: Handle high-volume logs efficiently.
- **Teach Effectively**: Share practical LLD strategies.

## Key Concepts
### 1. Logger System Components
- **Log Levels**: Define severity (e.g., DEBUG, INFO, WARN, ERROR, FATAL).
- **Appenders**: Output destinations (e.g., console, file, database).
- **Functionality**:
  - Log messages with specified levels.
  - Configure appenders and log levels.
  - Filter logs based on level thresholds.
- **Edge Cases**: Invalid log levels, missing appenders, high log volume.

### 2. Design Patterns
- **Strategy Pattern** (Section 3, Lecture 4): For different appender types.
- **Singleton Pattern** (Section 3, Lecture 1): For logger instance.
- **Chain of Responsibility Pattern** (Section 3, Lecture 12): For filtering log levels.

### 3. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation for logger and appender classes.
- **Design Patterns** (Section 3): Strategy, Singleton, and Chain of Responsibility patterns.
- **Design Principles** (Section 4): SoC (Lecture 11) separates logging and appender logic; KISS (Lecture 8) simplifies design.
- **HLD** (Section 5):
  - Logging System (Lecture 31): High-level logging concepts.
  - LLD Intro (Lecture 1): Builds on class design.
  - Database Design (Lecture 2): Persisting logs (optional).
  - API Design (Lecture 3): Exposing logger controls.
  - Concurrency Handling (Lecture 4): Thread-safe logging.
  - Error Handling (Lecture 5): Handling invalid log inputs.
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
- **Clean Code** (Section 9): Meaningful names for classes and methods.

### 4. Use Case
Design a logger system for an application, supporting configurable log levels and multiple appenders for flexible logging.

## System Design
### Architecture
```
[Client] --> [LoggerController]
                |
                v
            [Logger]
                |
                v
           [Appender] --> [ConsoleAppender|FileAppender]
```

- **Classes**:
  - `Logger`: Manages log levels and appenders.
  - `Appender`: Interface for output destinations.
  - `ConsoleAppender`, `FileAppender`: Concrete appenders.
  - `LoggerController`: Exposes API for logging.
- **Functionality**: Log messages, configure appenders, filter by log level.
- **Trade-Offs**:
  - Appender: Console (simple, transient) vs. File (persistent, slower).
  - Filtering: Level-based (simple, effective) vs. custom rules (flexible, complex).

## Code Example: Logger System
Below is a Java implementation of a logger system with log levels and appenders.

```java
import java.util.ArrayList;
import java.util.List;

// Log level enum
public enum LogLevel {
    DEBUG, INFO, WARN, ERROR, FATAL
}

// Custom exception
public class LoggerException extends Exception {
    public LoggerException(String message) {
        super(message);
    }
}

// Appender interface
public interface Appender {
    void append(LogLevel level, String message);
}

// Console appender
public class ConsoleAppender implements Appender {
    @Override
    public void append(LogLevel level, String message) {
        System.out.println("[" + level + "] " + message);
    }
}

// File appender (simulated)
public class FileAppender implements Appender {
    @Override
    public void append(LogLevel level, String message) {
        // Simulate file write
        System.out.println("Writing to file: [" + level + "] " + message);
    }
}

// Logger class
public class Logger {
    private static Logger instance;
    private LogLevel minLevel;
    private List<Appender> appenders;

    private Logger() {
        this.minLevel = LogLevel.DEBUG;
        this.appenders = new ArrayList<>();
    }

    public static Logger getInstance() {
        if (instance == null) {
            instance = new Logger();
        }
        return instance;
    }

    public void addAppender(Appender appender) {
        appenders.add(appender);
    }

    public void setMinLevel(LogLevel level) {
        this.minLevel = level;
    }

    public void log(LogLevel level, String message) throws LoggerException {
        if (level == null || message == null) {
            throw new LoggerException("Invalid log level or message");
        }
        if (level.ordinal() >= minLevel.ordinal()) {
            for (Appender appender : appenders) {
                appender.append(level, message);
            }
        }
    }

    public void debug(String message) throws LoggerException {
        log(LogLevel.DEBUG, message);
    }

    public void info(String message) throws LoggerException {
        log(LogLevel.INFO, message);
    }

    public void warn(String message) throws LoggerException {
        log(LogLevel.WARN, message);
    }

    public void error(String message) throws LoggerException {
        log(LogLevel.ERROR, message);
    }

    public void fatal(String message) throws LoggerException {
        log(LogLevel.FATAL, message);
    }
}

// Controller for API interactions
public class LoggerController {
    private final Logger logger;

    public LoggerController(Logger logger) {
        this.logger = logger;
    }

    public void handleAddAppender(Appender appender) {
        logger.addAppender(appender);
    }

    public void handleSetMinLevel(LogLevel level) {
        logger.setMinLevel(level);
    }

    public void handleLog(LogLevel level, String message) {
        try {
            logger.log(level, message);
        } catch (LoggerException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}

// Client to demonstrate usage
public class LoggerClient {
    public static void main(String[] args) {
        Logger logger = Logger.getInstance();
        LoggerController controller = new LoggerController(logger);

        // Normal flow
        controller.handleAddAppender(new ConsoleAppender());
        controller.handleAddAppender(new FileAppender());
        controller.handleSetMinLevel(LogLevel.INFO);
        controller.handleLog(LogLevel.DEBUG, "This should not log"); // Below min level
        controller.handleLog(LogLevel.INFO, "Info message");
        controller.handleLog(LogLevel.ERROR, "Error message");

        // Edge cases
        controller.handleLog(null, "Invalid level"); // Invalid level
        controller.handleLog(LogLevel.INFO, null); // Invalid message
        // Output:
        // [INFO] Info message
        // Writing to file: [INFO] Info message
        // [ERROR] Error message
        // Writing to file: [ERROR] Error message
        // Error: Invalid log level or message
        // Error: Invalid log level or message
    }
}
```
- **LLD Principles**:
  - **Log Levels**: `LogLevel` enum defines severity (DEBUG to FATAL).
  - **Appenders**: `Appender` interface with `ConsoleAppender` and `FileAppender`.
  - **Classes**: `Logger`, `Appender`, `ConsoleAppender`, `FileAppender`, `LoggerController`.
  - **Design Patterns**: Strategy (appender types), Singleton (`Logger`), Chain of Responsibility (level filtering).
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates logging and appender logic; DIP (Section 4, Lecture 6) via `Appender` interface.
- **Big O**: O(n) for `log` (n = appenders), O(1) for level checks.
- **Edge Cases**: Handles invalid log levels, null messages, no appenders.

**UML Diagram**:
```
[Client] --> [LoggerController]
                |
                v
            [Logger]
                |
                v
           [Appender]
                |
                v
 [ConsoleAppender|FileAppender]
```

## Real-World Application
Imagine designing a logger system for an application to record events for debugging and monitoring. This LLD—aligned with HLD principles from Section 5 (e.g., Logging System, Lecture 31)—ensures flexibility and reliability, critical for observability in real-world systems.

## Practice Exercises
Practice logger system design with these exercises:
- **Easy**: Design a UML diagram and Java code for a simple logger with one appender.
- **Medium**: Implement a logger system with multiple log levels and a console appender.
- **Medium**: Design an LLD for a logger with multiple appenders and level filtering.
- **Hard**: Architect a logger system with Java, integrating multiple design patterns (e.g., Strategy, Chain of Responsibility).

Try designing one system in Java with a UML diagram, explaining log levels and appenders.

## Conclusion
Mastering the design of a logger system equips you to build modular, flexible Java systems, enhancing your LLD skills. This lecture builds on HLD concepts and system design principles, preparing you for FAANG interviews and real-world applications.

**Next Step**: Explore [Design a URL Parser](/interview-section/lld/url-parser) to continue your LLD journey, or check out [all sections](/interview-section/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>