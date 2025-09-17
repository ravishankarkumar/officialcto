---
title: Decorator Pattern
description: Master the Decorator pattern in Java to dynamically extend object functionality, with practical examples for better software engineering.
---

# Decorator Pattern

## Overview
The Decorator pattern is a structural design pattern that allows you to dynamically add responsibilities to objects without modifying their code. In this seventh lesson of Section 3 in the *Official CTO* journey, we explore the **Decorator pattern**, its implementation in Java, and its applications in system design. Whether adding features to notifications in a social app or enhancing services in an e-commerce platform, this pattern ensures flexibility and modularity. By mastering Decorator, you’ll create extensible Java systems and mentor others effectively.

Inspired by *Design Patterns* by Gang of Four, *Head First Design Patterns*, and *Clean Code*, this 20-minute lesson covers the concepts, a practical Java example with a UML diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand the **Decorator pattern** and its role as a structural pattern.
- Learn to implement a **Decorator** in Java for dynamic functionality.
- Apply **OOP principles** (Section 2, Lecture 1) and **UML** (Section 2, Lecture 2) to Decorator design.
- Use the pattern in real-world scenarios with clean code practices (Section 9).

## Why the Decorator Pattern Matters
The Decorator pattern enables dynamic extension of object behavior, ideal for systems requiring flexible feature additions. Early in my career, I used it to enhance a notification system for a social app, adding logging and formatting without altering core logic. This pattern—leveraging polymorphism and composition—enhances extensibility and maintainability. Explaining it clearly showcases your mentorship skills.

In software engineering, the Decorator pattern helps you:
- **Extend Functionality**: Add features dynamically without changing existing code.
- **Enhance Modularity**: Use composition for loose coupling.
- **Improve Maintainability**: Write clean, reusable code (Section 9).
- **Teach Effectively**: Share flexible design solutions with teams.

## Key Concepts
### 1. Decorator Pattern Overview
The Decorator pattern attaches additional responsibilities to an object dynamically, using a wrapper that implements the same interface.

**Structure**:
- **Component**: Interface or abstract class defining core functionality (e.g., `Notification`).
- **Concrete Component**: Implements the core functionality (e.g., `BasicNotification`).
- **Decorator**: Abstract class implementing the component interface, holding a component reference.
- **Concrete Decorators**: Add specific behaviors (e.g., `LoggingDecorator`, `FormattedDecorator`).

### 2. Comparison to Other Structural Patterns
- **Adapter** (Lecture 6): Converts interfaces for compatibility.
- **Decorator**: Extends functionality while maintaining the same interface.

### 3. Use Cases
- Adding logging or formatting to notifications.
- Enhancing UI components with additional styles or behaviors.
- Extending services with optional features (e.g., encryption, caching).

**Example**: Decorating notifications with logging and formatting in a social app.

## Code Example: Notification Decorator
Let’s implement a notification system with decorators to add logging and formatting, with a UML class diagram.

### UML Class Diagram
```
+---------------------+
|    Notification     |
+---------------------+
| +send(message: String) |
+---------------------+
            |
            | implements
+---------------------+       +---------------------+
|  BasicNotification  |       | NotificationDecorator |
+---------------------+       +---------------------+
| +send               |       | -notification: Notification |
+---------------------+       +---------------------+
                                    | +send               |
                                    +---------------------+
                                            |
                                            | extends
+---------------------+       +---------------------+
|  LoggingDecorator   |       | FormattedDecorator  |
+---------------------+       +---------------------+
| +send               |       | +send               |
+---------------------+       +---------------------+
```

### Java Implementation
```java
// Component interface
public interface Notification {
    void send(String message);
}

// Concrete component
public class BasicNotification implements Notification {
    @Override
    public void send(String message) {
        System.out.println("Sending notification: " + message);
    }
}

// Abstract decorator
public abstract class NotificationDecorator implements Notification {
    protected Notification notification;
    
    public NotificationDecorator(Notification notification) {
        this.notification = notification;
    }
    
    @Override
    public void send(String message) {
        notification.send(message);
    }
}

// Concrete decorator: Logging
public class LoggingDecorator extends NotificationDecorator {
    public LoggingDecorator(Notification notification) {
        super(notification);
    }
    
    @Override
    public void send(String message) {
        System.out.println("Logging: Notification sent at " + System.currentTimeMillis());
        notification.send(message);
    }
}

// Concrete decorator: Formatting
public class FormattedDecorator extends NotificationDecorator {
    public FormattedDecorator(Notification notification) {
        super(notification);
    }
    
    @Override
    public void send(String message) {
        String formattedMessage = "[Formatted] " + message.toUpperCase();
        notification.send(formattedMessage);
    }
}

// Client code
public class NotificationClient {
    public static void main(String[] args) {
        // Create a decorated notification
        Notification notification = new LoggingDecorator(
            new FormattedDecorator(
                new BasicNotification()
            )
        );
        
        // Simulate concurrent notification sending
        Thread t1 = new Thread(() -> notification.send("Hello, user!"));
        Thread t2 = new Thread(() -> notification.send("New message!"));
        
        t1.start();
        t2.start();
        
        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        // Output example:
        // Logging: Notification sent at 1698765432100
        // Sending notification: [Formatted] HELLO, USER!
        // Logging: Notification sent at 1698765432101
        // Sending notification: [Formatted] NEW MESSAGE!
    }
}
```
- **Decorator and OOP Principles**:
  - **Encapsulation**: `NotificationDecorator` holds a reference to the wrapped component.
  - **Polymorphism**: `Notification` interface supports multiple decorators.
  - **Abstraction**: Decorators extend functionality transparently.
  - **Clean Code**: Meaningful names, modularity (Section 9).
- **Big O**: O(1) for `send` (constant-time operations per decorator).
- **Edge Cases**: Handles null messages, concurrent calls (stateless decorators).

**Systematic Approach**:
- Clarified requirements (extend notifications with logging and formatting).
- Designed UML diagram to model `Notification`, `NotificationDecorator`, and concrete decorators.
- Implemented Java classes with Decorator pattern.
- Tested with `main` method for concurrent usage.

## Real-World Application
Imagine enhancing a notification system for a social app, where the Decorator pattern adds logging for analytics and formatting for user display without modifying the core notification logic. This ensures flexibility for adding new features (e.g., encryption) and maintains modularity. The Decorator pattern—leveraging composition and polymorphism—demonstrates your ability to mentor teams on extensible design solutions.

## Practice Exercises
Apply the Decorator pattern with these exercises:
- **Easy**: Design a UML diagram and Java code for a `Logger` with decorators for timestamp and file output.
- **Medium**: Implement a `TextEditor` with decorators for bold and italic formatting.
- **Medium**: Create a `PaymentService` with decorators for logging and encryption.
- **Hard**: Design a `NotificationService` with decorators for analytics, formatting, and retry logic in a social app.

Try implementing one exercise in Java with a UML diagram, ensuring clean code principles.

## Conclusion
The Decorator pattern equips you to design flexible, extensible Java systems by dynamically adding functionality. By mastering this structural pattern, you’ll optimize software, ensure maintainability, and teach others effectively. This advances your progress in Section 3 of the *Official CTO* journey.

**Next Step**: Explore [Facade Pattern](/interview-section/design-patterns/facade-pattern) to simplify complex subsystems, or check out [all sections](/interview-section/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>