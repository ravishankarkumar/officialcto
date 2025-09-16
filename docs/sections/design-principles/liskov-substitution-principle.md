---
title: Liskov Substitution Principle
description: Master the Liskov Substitution Principle in Java to ensure substitutable subclasses, with practical examples for better software engineering.
---

# Liskov Substitution Principle

## Overview
The Liskov Substitution Principle (LSP), part of the SOLID principles, states that objects of a subclass should be substitutable for objects of their base class without affecting the correctness of the program. In this fourth lesson of Section 4 in the *Official CTO* journey, we explore **LSP**, its implementation in Java, and its applications in system design. Whether designing a payment hierarchy for an e-commerce app or a notification system for a social platform, LSP ensures reliable polymorphism and maintainability. By mastering LSP, you’ll create robust Java systems and mentor others effectively.

Inspired by *Clean Code*, *Effective Java*, and *Design Patterns* by Gang of Four, this 20-minute lesson covers the concepts, a practical Java example with a UML diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand the **Liskov Substitution Principle** and its role in SOLID.
- Learn to implement **LSP** in Java for reliable inheritance hierarchies.
- Apply **OOP principles** (Section 2, Lecture 1), **UML** (Section 2, Lecture 2), and **design patterns** (Section 3) to LSP design.
- Use LSP in real-world scenarios with clean code practices (Section 9).

## Why the Liskov Substitution Principle Matters
LSP ensures that subclasses adhere to the behavior expected by their base class, preventing unexpected errors in polymorphic systems. Early in my career, I refactored a payment hierarchy for an e-commerce platform to follow LSP, ensuring new payment types could be used interchangeably without breaking client code. This principle—leveraging polymorphism and inheritance—enhances reliability and scalability, critical for FAANG-level designs. Explaining LSP clearly showcases your mentorship skills.

In software engineering, LSP helps you:
- **Ensure Reliability**: Subclasses behave as expected in place of their base class.
- **Enhance Maintainability**: Prevent bugs from incorrect inheritance.
- **Support Polymorphism**: Enable flexible, extensible designs.
- **Teach Effectively**: Share robust inheritance strategies with teams.

## Key Concepts
### 1. Liskov Substitution Principle Overview
Introduced by Barbara Liskov, LSP states that if `S` is a subtype of `T`, then objects of type `T` can be replaced with objects of type `S` without altering program correctness.

**Core Idea**:
- Subclasses must honor the contract (behavior, invariants) of their base class.
- Avoid overriding methods in ways that violate base class expectations.

### 2. LSP in SOLID
- **Single Responsibility** (Lecture 2): One class, one job.
- **Open-Closed** (Lecture 3): Extend without modifying.
- **Liskov Substitution** (this lecture): Substitutable subclasses.
- **Interface Segregation** (Lecture 5): Focused interfaces.
- **Dependency Inversion** (Lecture 6): Depend on abstractions.

### 3. Relation to Design Patterns
- **Strategy Pattern** (Section 3, Lecture 10): Uses polymorphism for algorithms.
- **Factory Method** (Section 3, Lecture 3): Creates substitutable objects.
- **Decorator** (Section 3, Lecture 7): Extends behavior while preserving contracts.

### 4. Use Cases
- Designing payment hierarchies with substitutable payment types.
- Creating notification systems with interchangeable notification methods.
- Building extensible UI components in a web app.

**Example**: Refactoring a payment hierarchy to ensure substitutable payment types.

## Code Example: Payment Hierarchy Refactoring
Let’s refactor a payment hierarchy to follow LSP, with a UML class diagram.

### Before LSP: Non-Substitutable Design
**UML Diagram (Before)**
```
+---------------------+
|    Payment          |
+---------------------+
| +process(amount: double, userId: String) |
+---------------------+
            |
            | extends
+---------------------+       +---------------------+
| CreditCardPayment   |       |   PayPalPayment     |
+---------------------+       +---------------------+
| +process            |       | +process            |
+---------------------+       +---------------------+
```

```java
// Non-LSP-compliant payment hierarchy
public abstract class Payment {
    public abstract void process(double amount, String userId);
}

public class CreditCardPayment extends Payment {
    @Override
    public void process(double amount, String userId) {
        System.out.println("Processing credit card payment: $" + amount + " for " + userId);
    }
}

public class PayPalPayment extends Payment {
    @Override
    public void process(double amount, String userId) {
        if (amount > 1000) {
            throw new UnsupportedOperationException("PayPal does not support payments over $1000");
        }
        System.out.println("Processing PayPal payment: $" + amount + " for " + userId);
    }
}

public class PaymentClient {
    public static void main(String[] args) {
        Payment payment = new PayPalPayment();
        try {
            payment.process(1500.0, "user1"); // Fails due to PayPal restriction
        } catch (UnsupportedOperationException e) {
            System.out.println(e.getMessage());
        }
        // Output: PayPal does not support payments over $1000
    }
}
```
- **Issues**:
  - Violates LSP: `PayPalPayment` imposes a restriction (no payments over $1000) not present in the base class, breaking substitutability.
  - Causes errors: Clients expecting `Payment` behavior may fail unexpectedly.
  - Hard to maintain: Subclass-specific constraints complicate usage.

### After LSP: Substitutable Design
**UML Diagram (After)**
```
+---------------------+
|    PaymentService   |
+---------------------+
| +process(amount: double, userId: String): boolean |
+---------------------+
            |
            | implements
+---------------------+       +---------------------+
| CreditCardService   |       |   PayPalService     |
+---------------------+       +---------------------+
| +process            |       | +process            |
| +getMaxAmount(): double |   | +getMaxAmount(): double |
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
// LSP-compliant payment hierarchy
public interface PaymentService {
    boolean process(double amount, String userId);
    double getMaxAmount();
}

public class CreditCardService implements PaymentService {
    private static final double MAX_AMOUNT = Double.MAX_VALUE;
    
    @Override
    public boolean process(double amount, String userId) {
        System.out.println("Processing credit card payment: $" + amount + " for " + userId);
        return true;
    }
    
    @Override
    public double getMaxAmount() {
        return MAX_AMOUNT;
    }
}

public class PayPalService implements PaymentService {
    private static final double MAX_AMOUNT = 1000.0;
    
    @Override
    public boolean process(double amount, String userId) {
        if (amount > MAX_AMOUNT) {
            System.out.println("PayPal payment rejected: Amount exceeds $" + MAX_AMOUNT);
            return false;
        }
        System.out.println("Processing PayPal payment: $" + amount + " for " + userId);
        return true;
    }
    
    @Override
    public double getMaxAmount() {
        return MAX_AMOUNT;
    }
}

public class PaymentProcessor {
    private final PaymentService service;
    
    public PaymentProcessor(PaymentService service) {
        this.service = service;
    }
    
    public void processPayment(double amount, String userId) {
        if (amount <= service.getMaxAmount()) {
            service.process(amount, userId);
        } else {
            throw new IllegalArgumentException("Amount exceeds maximum for this payment type: $" + service.getMaxAmount());
        }
    }
}

public class PaymentClient {
    public static void main(String[] args) {
        PaymentProcessor creditCardProcessor = new PaymentProcessor(new CreditCardService());
        PaymentProcessor payPalProcessor = new PaymentProcessor(new PayPalService());
        
        creditCardProcessor.processPayment(1500.0, "user1");
        try {
            payPalProcessor.processPayment(1500.0, "user2");
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
        payPalProcessor.processPayment(500.0, "user2");
        // Output:
        // Processing credit card payment: $1500.0 for user1
        // Amount exceeds maximum for this payment type: $1000.0
        // Processing PayPal payment: $500.0 for user2
    }
}
```
- **LSP and OOP Principles**:
  - **Liskov Substitution**: Subclasses (`CreditCardService`, `PayPalService`) are substitutable via `PaymentService` interface, with constraints explicit in `getMaxAmount`.
  - **Encapsulation**: Private constants and public methods.
  - **Polymorphism**: `PaymentService` interface supports multiple implementations.
  - **Abstraction**: `PaymentProcessor` hides service details.
  - **Clean Code**: Meaningful names, modularity (Section 9).
- **Big O**: O(1) for `process`, `getMaxAmount`, `processPayment`.
- **Edge Cases**: Handles excessive amounts, invalid inputs via explicit checks.

**Systematic Approach**:
- Clarified requirements (process payments, ensure substitutable types).
- Designed UML diagrams to show non-LSP vs. LSP-compliant designs.
- Refactored Java code to follow LSP, using Strategy pattern (Section 3, Lecture 10) and Dependency Injection (Section 3, Lecture 14).
- Tested with `main` method for different payment types.

## Real-World Application
Imagine designing a payment system for an e-commerce app, where LSP ensures that payment types (e.g., credit card, PayPal) can be used interchangeably without breaking client code. This prevents errors from unexpected subclass behavior and supports scalability for new payment methods. LSP—paired with principles like OCP (Lecture 3) and patterns like Factory Method (Section 3, Lecture 3)—demonstrates your ability to mentor teams on reliable, polymorphic design.

## Practice Exercises
Apply the Liskov Substitution Principle with these exercises:
- **Easy**: Design a UML diagram and Java code for a `Notification` hierarchy, ensuring substitutable types (e.g., email, push).
- **Medium**: Refactor a `Vehicle` hierarchy (e.g., car, bicycle) to follow LSP, handling specific constraints (e.g., speed limits).
- **Medium**: Create a `Discount` hierarchy for a retail app, ensuring substitutable discount types (e.g., percentage, fixed).
- **Hard**: Design a `Report` hierarchy for a reporting system, ensuring substitutable report formats (e.g., PDF, CSV).

Try refactoring one system in Java with a UML diagram, explaining how LSP ensures substitutability.

## Conclusion
The Liskov Substitution Principle equips you to design reliable, polymorphic Java systems by ensuring substitutable subclasses. By mastering LSP, you’ll optimize software, enhance maintainability, and teach others effectively. This advances your progress in Section 4 of the *Official CTO* journey.

**Next Step**: Explore [Interface Segregation Principle](/sections/design-principles/interface-segregation-principle) to learn about focused interfaces, or check out [all sections](/sections/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>