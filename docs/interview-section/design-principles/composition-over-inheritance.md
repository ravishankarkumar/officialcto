---
title: Composition over Inheritance
description: Learn why composition is often better than inheritance in Java. Explore flexibility, reduced coupling, and real-world examples with UML, code, and interview prep.
---

# Composition over Inheritance

## Overview
The principle of **Composition over Inheritance** encourages developers to favor building systems by composing objects rather than relying heavily on class inheritance. While inheritance models "is-a" relationships, composition models "has-a" relationships, offering more flexibility, reduced coupling, and greater reuse. This principle is central to writing maintainable Java systems and is widely applied in design patterns such as Strategy, Decorator, and Adapter.

## Learning Objectives
- Understand the difference between **inheritance** and **composition**.  
- Learn the drawbacks of deep inheritance hierarchies.  
- Apply composition to achieve flexibility and reduce rigidity.  
- Implement real-world Java examples with UML diagrams.  
- Prepare for interviews with common composition vs inheritance questions.  

## Why It Matters
Excessive inheritance often leads to rigid, fragile designs where changes in base classes ripple across subclasses. This violates the Open-Closed Principle and increases coupling. Composition avoids these pitfalls by allowing behavior to be assembled dynamically at runtime through object references.

**Benefits of Composition:**
- **Flexibility**: Swap or extend behavior without modifying hierarchies.  
- **Reduced Coupling**: Clients depend on abstractions, not base class internals.  
- **Reusability**: Reuse components across different contexts.  
- **Maintainability**: Avoid deep inheritance chains that are hard to manage.  

## Key Concepts
1. **Inheritance ("is-a")**: Subclass extends a parent class. Often leads to fragile hierarchies if overused.  
2. **Composition ("has-a")**: Class uses other objects to provide functionality. Encourages modular design.  
3. **Relation to Design Patterns**: Strategy, Decorator, Adapter, Bridge, and Composite all leverage composition.  
4. **Best Practice**: Use inheritance sparingly (for clear "is-a" relationships). Prefer composition when flexibility is key.  

## Code Example: Notification System

### Inheritance-Based Design (Rigid)
```java
// Using inheritance for different notifications
class Notification {
    public void send(String message) {
        System.out.println("Sending generic notification: " + message);
    }
}

class EmailNotification extends Notification {
    @Override
    public void send(String message) {
        System.out.println("Sending EMAIL: " + message);
    }
}

class SMSNotification extends Notification {
    @Override
    public void send(String message) {
        System.out.println("Sending SMS: " + message);
    }
}

public class Client {
    public static void main(String[] args) {
        Notification email = new EmailNotification();
        Notification sms = new SMSNotification();
        email.send("Hello via Email");
        sms.send("Hello via SMS");
    }
}
```
- **Problem**: Adding a new notification type requires subclassing.  
- **Fragility**: Base class changes can break all subclasses.  
- **Limited Flexibility**: Cannot easily mix behaviors (e.g., log + send).  

### Composition-Based Design (Flexible)
```java
// Behavior abstraction
interface NotificationSender {
    void send(String message);
}

// Concrete behaviors
class EmailSender implements NotificationSender {
    public void send(String message) {
        System.out.println("Sending EMAIL: " + message);
    }
}

class SMSSender implements NotificationSender {
    public void send(String message) {
        System.out.println("Sending SMS: " + message);
    }
}

// Composed class
class Notification {
    private final NotificationSender sender;
    
    public Notification(NotificationSender sender) {
        this.sender = sender;
    }
    
    public void notifyUser(String message) {
        sender.send(message);
    }
}

public class Client {
    public static void main(String[] args) {
        Notification emailNotification = new Notification(new EmailSender());
        Notification smsNotification = new Notification(new SMSSender());
        
        emailNotification.notifyUser("Hello via Email");
        smsNotification.notifyUser("Hello via SMS");
    }
}
```
- **Solution**: `Notification` composes `NotificationSender`. Adding new types only requires implementing the interface, not changing existing code.  
- **Flexibility**: Can mix behaviors (e.g., add `LoggingSender`, `PushSender`) dynamically.  

### UML (Composition-Based)
```
+-----------------------+
|   NotificationSender  |<<interface>>
+-----------------------+
| +send(message)        |
+-----------------------+
        ^
        |
+-----------------+    +----------------+
|  EmailSender    |    |   SMSSender    |
+-----------------+    +----------------+
| +send(...)      |    | +send(...)     |
+-----------------+    +----------------+
        ^
        |
+--------------------------+
|      Notification        |
+--------------------------+
| -sender: NotificationSender |
| +notifyUser(message)     |
+--------------------------+
```

## Real-World Applications
- **UI Frameworks**: Components composed from smaller parts (buttons, layouts, event handlers).  
- **Game Development**: Entities composed of behaviors (movement, rendering, health).  
- **Spring Framework**: Beans wired via dependency injection rather than inheritance.  
- **Logging**: Different appenders (console, file, remote) composed into loggers.  

## Practice Exercises
- **Easy**: Refactor a `Logger` to support multiple outputs (console, file) using composition.  
- **Medium**: Build a `PaymentProcessor` that supports interchangeable `PaymentService` implementations.  
- **Medium**: Design a `Shape` class that uses composition to support drawing behaviors.  
- **Hard**: Implement a `Character` in a game that can swap attack strategies at runtime (Strategy pattern).  

## Interview Insights
- *“Why prefer composition over inheritance?”*  
- *“Give an example where inheritance causes problems.”*  
- *“Which design patterns use composition?”*  
- *“Can inheritance and composition coexist?”*  

## Conclusion
Composition over Inheritance reduces rigidity and fosters modular, extensible designs. While inheritance has its place for true "is-a" relationships, composition is often the better choice for maintainability. By embracing composition, you create Java systems that adapt easily to new requirements.

**Next Step**: Explore [Favor Immutability](/interview-section/design-principles/favor-immutability) to learn another principle for creating robust and reliable software.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
