---
title: Single Responsibility Principle
description: Master the Single Responsibility Principle (SRP) in Java with real-world examples, UML diagrams, interview prep, and clean code practices to build modular, maintainable systems.
---

# Single Responsibility Principle

## Overview
The Single Responsibility Principle (SRP), part of the SOLID principles, states that a class should have **only one reason to change**, ensuring each class has a single, well-defined responsibility. In this section, we explore **SRP**, its implementation in Java, and its applications in system design.

Unlike the misconception that SRP means “only one method per class,” the true meaning is broader: a class should encapsulate **one kind of responsibility**. If multiple reasons exist for it to change (e.g., logging, validation, and payment processing), then SRP is being violated.

## Learning Objectives
- Understand the **Single Responsibility Principle** and its role in SOLID.
- Learn to implement **SRP** in Java to separate concerns.
- Apply **OOP principles** (Section 2, Lecture 1), **UML** (Section 2, Lecture 2), and **design patterns** (Section 3) to SRP design.
- Use SRP in real-world scenarios with clean code practices (Section 9).
- Prepare for interview questions like: *“How would you refactor a God Class?”*

## Why the Single Responsibility Principle Matters
SRP ensures that each class has a single, focused purpose, reducing complexity and making code easier to maintain and extend. Early in my career, I refactored a monolithic payment processor for an e-commerce platform by applying SRP, splitting payment logic, validation, and logging into separate classes, improving scalability and testability. This principle—leveraging encapsulation and modularity—aligns with clean code practices and is critical for FAANG-level designs. Explaining SRP clearly showcases your mentors...

In software engineering, SRP helps you:
- **Enhance Modularity**: Separate concerns for low coupling.
- **Improve Maintainability**: Limit changes to one responsibility per class.
- **Simplify Testing**: Test classes in isolation (Section 9).
- **Teach Effectively**: Share modular design strategies with teams.

## Key Concepts
### 1. Single Responsibility Principle Overview
SRP, introduced by Robert Martin in *Clean Code*, states that a class should have only one reason to change, meaning it should handle a single responsibility.

**Core Idea**:
- A class should focus on one task (e.g., payment processing, not logging).
- Changes to one responsibility (e.g., payment logic) shouldn’t affect unrelated functionality (e.g., logging).

### 2. SRP in SOLID
- **Single Responsibility** (this lecture): One class, one job.
- **Open/Closed** (Lecture 3): Extend without modifying.
- **Liskov Substitution** (Lecture 4): Substitutable subclasses.
- **Interface Segregation** (Lecture 5): Focused interfaces.
- **Dependency Inversion** (Lecture 6): Depend on abstractions.

### 3. Use Cases
- Separating payment processing from logging in an e-commerce app.
- Dividing user authentication from profile management in a social app.
- Isolating data validation from business logic in a cloud system.

**Example**: Refactoring a payment processor to separate payment, validation, and logging responsibilities.

## Code Example: Refactoring a Payment Processor
Let’s refactor a monolithic payment processor to follow SRP, with a UML class diagram.

### Before SRP: Monolithic Design
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
| +validatePayment()  |
| +logTransaction()   |
+---------------------+
```

```java
// Monolithic payment processor (violates SRP)
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
        validatePayment();
        System.out.println("Processing " + paymentType + " payment: $" + amount + " for " + userId);
        logTransaction();
    }
    
    private void validatePayment() {
        System.out.println("Validating " + paymentType + " for " + userId);
    }
    
    private void logTransaction() {
        System.out.println("Logging transaction: $" + amount + " for " + userId);
    }
}
```
- **Issues**:
  - Violates SRP: Handles payment processing, validation, and logging.
  - Hard to maintain: Changes to validation affect processing logic.
  - Hard to test: Multiple responsibilities complicate unit tests.

### After SRP: Modular Design
**UML Diagram (After)**
```
+---------------------+       +---------------------+       +---------------------+
| PaymentProcessor    | uses  | PaymentValidator    |       | TransactionLogger   |
+---------------------+ ----> +---------------------+       +---------------------+
| -validator          |       | +validate(type, id) |       | +log(amount, id)    |
| -logger             |       +---------------------+       +---------------------+
| -paymentService     |
+---------------------+
| +processPayment(...)|
+---------------------+
            |
            | depends on
            v
+---------------------+       +---------------------+
|   PaymentService    |<------+ CreditCardService   |
+---------------------+       +---------------------+
| +process(amount,id) |       | +process            |
+---------------------+       +---------------------+
                            +---------------------+
                            |   PayPalService     |
                            +---------------------+
                            | +process            |
                            +---------------------+
```

```java
// Principled design following SRP
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

public class PaymentValidator {
    public void validate(String paymentType, String userId) {
        if (!paymentType.equals("CreditCard") && !paymentType.equals("PayPal")) {
            throw new IllegalArgumentException("Unsupported payment type: " + paymentType);
        }
        System.out.println("Validating " + paymentType + " for " + userId);
    }
}

public class TransactionLogger {
    public void log(double amount, String userId) {
        System.out.println("Logging transaction: $" + amount + " for " + userId);
    }
}

public class PaymentProcessor {
    private final PaymentService paymentService;
    private final PaymentValidator validator;
    private final TransactionLogger logger;
    
    // In real-world Java, frameworks like Spring inject these dependencies
    public PaymentProcessor(PaymentService paymentService, PaymentValidator validator, TransactionLogger logger) {
        this.paymentService = paymentService;
        this.validator = validator;
        this.logger = logger;
    }
    
    public void processPayment(double amount, String userId, String paymentType) {
        validator.validate(paymentType, userId);
        paymentService.process(amount, userId);
        logger.log(amount, userId);
    }
}

public class PaymentClient {
    public static void main(String[] args) {
        PaymentValidator validator = new PaymentValidator();
        TransactionLogger logger = new TransactionLogger();
        
        PaymentProcessor creditCardProcessor = new PaymentProcessor(new CreditCardService(), validator, logger);
        PaymentProcessor payPalProcessor = new PaymentProcessor(new PayPalService(), validator, logger);
        
        creditCardProcessor.processPayment(100.0, "user1", "CreditCard");
        payPalProcessor.processPayment(50.0, "user2", "PayPal");
        
        // Uncomment to test invalid type:
        // creditCardProcessor.processPayment(20.0, "user3", "Crypto");
    }
}
```
- **SRP and OOP Principles**:
  - **Single Responsibility**: `PaymentProcessor` orchestrates, `PaymentService` processes, `PaymentValidator` validates, `TransactionLogger` logs.
  - **Encapsulation**: Private fields with public methods.
  - **Polymorphism**: `PaymentService` interface supports multiple payment types.
  - **Abstraction**: Classes hide implementation details.
  - **Clean Code**: Meaningful names, modularity (Section 9).
- **Big O**: O(1) for `processPayment`, `validate`, `log` (direct calls).
- **Edge Cases**: Invalid payment types handled gracefully.

**Systematic Approach**:
- Clarified requirements (process payments, separate concerns).
- Designed UML diagrams to show monolithic vs. SRP-compliant designs.
- Refactored Java code to follow SRP, integrating with patterns like Strategy (Section 3, Lecture 10).
- Tested with `main` method for different payment types.

## Real-World Application
Imagine refactoring a payment processor for an e-commerce app, where SRP separates payment processing, validation, and logging into distinct classes. This ensures that changes to one responsibility (e.g., adding a new payment type) don’t affect others (e.g., logging), improving scalability and testability.  

In interviews, SRP is often tested with questions like: *“How would you refactor a God Class?”* A strong answer is to split responsibilities into multiple classes using SRP, then enhance with patterns like **Strategy** (Section 3, Lecture 10) or **Dependency Injection** for real-world maintainability.

## Practice Exercises
Apply the Single Responsibility Principle with these exercises:
- **Easy**: Design a UML diagram and Java code for a `Logger` system, separating logging from formatting.
- **Medium**: Refactor a `UserManager` for a social app to follow SRP, separating authentication and profile management.
- **Medium**: Create a `BookingSystem` for a travel platform, separating reservation and notification logic.
- **Hard**: Design an `OrderProcessor` for an e-commerce app, separating order validation, processing, and logging.
- **Interview**: Refactor a “God Class” with too many responsibilities. Explain how SRP applies, and suggest complementary patterns.

Try refactoring one system in Java with a UML diagram, explaining how SRP improves the design.

## Conclusion
The Single Responsibility Principle equips you to design modular, maintainable Java systems by ensuring each class has a single purpose. By mastering SRP, you’ll optimize software, enhance scalability, and teach others effectively. This advances your progress in Section 4 of the *Official CTO* journey.

**Next Step**: Explore [Open-Closed Principle](/interview-section/design-principles/open-closed-principle) to learn about extensible design, or check out [all sections](/interview-section/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
