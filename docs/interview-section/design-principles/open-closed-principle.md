---
title: Open-Closed Principle
description: Master the Open-Closed Principle in Java to create extensible, maintainable systems, with practical examples for better software engineering.
---

# Open-Closed Principle

## Overview
The Open-Closed Principle (OCP), part of the SOLID principles, states that software entities (classes, modules, functions) should be **open for extension but closed for modification**, allowing new functionality without altering existing code. In this third lesson of Section 4 in the *Official CTO* journey, we explore **OCP**, its implementation in Java, and its applications in system design. Whether adding new payment types to an e-commerce app or extending features in a social platform, OCP promotes extensibility and maintainability. By mastering OCP, you’ll create robust Java systems and mentor others effectively.

Inspired by *Clean Code*, *Effective Java*, and *Design Patterns* by Gang of Four, this 20-minute lesson covers the concepts, a practical Java example with a UML diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand the **Open-Closed Principle** and its role in SOLID.
- Learn to implement **OCP** in Java using interfaces and polymorphism.
- Apply **OOP principles** (Section 2, Lecture 1), **UML** (Section 2, Lecture 2), and **design patterns** (Section 3) to OCP design.
- Use OCP in real-world scenarios with clean code practices (Section 9).

## Why the Open-Closed Principle Matters
OCP ensures systems can be extended with new functionality without modifying existing, tested code, reducing bugs and improving scalability. Early in my career, I applied OCP to extend a payment system for an e-commerce platform, adding new payment methods without altering core logic. This principle—leveraging polymorphism and abstraction—aligns with clean code practices and is critical for FAANG-level designs. Explaining OCP clearly showcases your mentorship skills.

In software engineering, OCP helps you:
- **Enhance Extensibility**: Add features without changing existing code.
- **Improve Maintainability**: Minimize regression risks in tested modules.
- **Support Scalability**: Enable systems to grow with new requirements.
- **Teach Effectively**: Share extensible design strategies with teams.

## Key Concepts
### 1. Open-Closed Principle Overview
OCP, introduced by Bertrand Meyer and popularized by Robert Martin, ensures classes are open for extension (e.g., via subclasses or interfaces) but closed for modification (no changes to source code).

**Core Idea**:
- Use abstractions (interfaces, abstract classes) to allow new implementations.
- Avoid modifying existing classes when adding functionality.

### 2. OCP in SOLID
- **Single Responsibility** (Lecture 2): One class, one job.
- **Open-Closed** (this lecture): Extend without modifying.
- **Liskov Substitution** (Lecture 4): Substitutable subclasses.
- **Interface Segregation** (Lecture 5): Focused interfaces.
- **Dependency Inversion** (Lecture 6): Depend on abstractions.

### 3. Relation to Design Patterns
- **Strategy Pattern** (Section 3, Lecture 10): Enables algorithm extension.
- **Factory Method** (Section 3, Lecture 3): Creates extensible objects.
- **Decorator** (Section 3, Lecture 7): Adds behavior dynamically.

### 4. Use Cases
- Adding new payment methods in an e-commerce app.
- Extending notification types in a social platform.
- Supporting new report formats in a reporting system.

**Example**: Extending a payment system to support new payment methods without modifying existing code.

## Code Example: Extensible Payment System
Let’s refactor a payment system to follow OCP, with a UML class diagram.

### Before OCP: Non-Extensible Design
**UML Diagram (Before)**
```
+---------------------+
|   PaymentProcessor  |
+---------------------+
| -userId: String     |
| -amount: double     |
| -paymentType: String|
+---------------------+
| +processPayment()   |
+---------------------+
```

```java
// Non-extensible payment processor (violates OCP)
public class PaymentProcessor {
    private String userId;
    private double amount;
    private String paymentType;
    
    public PaymentProcessor(String userId, double amount, String paymentType) {
        this.userId = userId;
        this.amount = amount;
        this.paymentType = paymentType;
    }
    
    public void processPayment() {
        if (paymentType.equals("CreditCard")) {
            System.out.println("Processing credit card payment: $" + amount + " for " + userId);
        } else if (paymentType.equals("PayPal")) {
            System.out.println("Processing PayPal payment: $" + amount + " for " + userId);
        } else {
            throw new IllegalArgumentException("Unknown payment type: " + paymentType);
        }
    }
}
```
- **Issues**:
  - Violates OCP: Adding a new payment type requires modifying `processPayment`.
  - Violates SRP (Lecture 2): Combines payment logic for multiple types.
  - Hard to extend: New payment types break existing code.

### After OCP: Extensible Design
**UML Diagram (After)**
```
+---------------------+
|   PaymentService    |
+---------------------+
| +process(amount: double, userId: String) |
+---------------------+
            |
            | implements
+---------------------+       +---------------------+
| CreditCardService   |       |   PayPalService     |
+---------------------+       +---------------------+
| +process            |       | +process            |
+---------------------+       +---------------------+
            |
            | used by
+---------------------+
|   PaymentProcessor  |
+---------------------+
| -service: PaymentService |
+---------------------+
| +processPayment(amount: double, userId: String) |
+---------------------+
```

```java
// Extensible payment system following OCP
public interface PaymentService {
    void process(double amount, String userId);
}

public class CreditCardService implements PaymentService {
    @Override
    public void process(double amount, String userId) {
        System.out.println("Processing credit card payment: $" + amount + " for " + userId);
    }
}

public class PayPalService implements PaymentService {
    @Override
    public void process(double amount, String userId) {
        System.out.println("Processing PayPal payment: $" + amount + " for " + userId);
    }
}

public class PaymentProcessor {
    private final PaymentService service;
    
    public PaymentProcessor(PaymentService service) {
        this.service = service;
    }
    
    public void processPayment(double amount, String userId) {
        service.process(amount, userId);
    }
}

public class PaymentClient {
    public static void main(String[] args) {
        // Create processors with different services
        PaymentProcessor creditCardProcessor = new PaymentProcessor(new CreditCardService());
        PaymentProcessor payPalProcessor = new PaymentProcessor(new PayPalService());
        
        // Process payments
        creditCardProcessor.processPayment(100.0, "user1");
        payPalProcessor.processPayment(50.0, "user2");
        // Output:
        // Processing credit card payment: $100.0 for user1
        // Processing PayPal payment: $50.0 for user2
    }
}
```
- **OCP and OOP Principles**:
  - **Open-Closed**: New payment types (e.g., `CryptoService`) added via new classes without modifying `PaymentProcessor`.
  - **Encapsulation**: Private `service` field with constructor injection.
  - **Polymorphism**: `PaymentService` interface supports multiple implementations.
  - **Abstraction**: `PaymentProcessor` hides service details.
  - **Clean Code**: Meaningful names, modularity (Section 9).
- **Big O**: O(1) for `processPayment` (direct call to service).
- **Edge Cases**: Handles invalid inputs via service implementations.

**Systematic Approach**:
- Clarified requirements (process payments, support extensibility).
- Designed UML diagrams to show non-extensible vs. OCP-compliant designs.
- Refactored Java code to follow OCP, using Strategy pattern (Section 3, Lecture 10) for extensibility.
- Tested with `main` method for different payment types.

## Real-World Application
Imagine designing a payment system for an e-commerce app, where OCP allows adding new payment methods (e.g., cryptocurrency) without modifying existing code. This ensures stability in tested modules and supports scalability for future payment types. OCP—paired with patterns like Dependency Injection (Section 3, Lecture 14) and SRP (Lecture 2)—demonstrates your ability to mentor teams on extensible design.

## Practice Exercises
Apply the Open-Closed Principle with these exercises:
- **Easy**: Design a UML diagram and Java code for a `NotificationSystem`, extending notification types (e.g., email, push) without modifying core logic.
- **Medium**: Refactor a `Logger` system to follow OCP, supporting new log outputs (e.g., console, file).
- **Medium**: Create a `DiscountSystem` for a retail app, allowing new discount types without code changes.
- **Hard**: Design a `ReportGenerator` for a reporting system, supporting new report formats (e.g., PDF, CSV) using OCP.

Try refactoring one system in Java with a UML diagram, explaining how OCP improves extensibility.

## Conclusion
The Open-Closed Principle equips you to design extensible, maintainable Java systems by allowing new functionality without modifying existing code. By mastering OCP, you’ll optimize software, enhance scalability, and teach others effectively. This advances your progress in Section 4 of the *Official CTO* journey.

**Next Step**: Explore [Liskov Substitution Principle](/interview-section/design-principles/liskov-substitution-principle) to learn about substitutable subclasses, or check out [all sections](/interview-section/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>