---
title: Template Method Pattern
description: Master the Template Method pattern in Java to define reusable algorithm skeletons, with practical examples for better software engineering.
---

# Template Method Pattern

## Overview
The Template Method pattern is a behavioral design pattern that defines the skeleton of an algorithm in an abstract class, allowing subclasses to customize specific steps without altering the overall structure. In this thirteenth lesson of Section 3 in the *Official CTO* journey, we explore the **Template Method pattern**, its implementation in Java, and its applications in system design. Whether defining a payment processing workflow for an e-commerce app or a data processing pipeline for a social platform, this pattern ensures reusability and modularity. By mastering Template Method, you’ll create maintainable Java systems and mentor others effectively.

Inspired by *Design Patterns* by Gang of Four, *Head First Design Patterns*, and *Clean Code*, this 15-minute lesson covers the concepts, a practical Java example with a UML diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand the **Template Method pattern** and its role as a behavioral pattern.
- Learn to implement a **Template Method** in Java for reusable algorithms.
- Apply **OOP principles** (Section 2, Lecture 1) and **UML** (Section 2, Lecture 2) to Template Method design.
- Use the pattern in real-world scenarios with clean code practices (Section 9).

## Why the Template Method Pattern Matters
The Template Method pattern promotes code reuse by defining a fixed algorithm structure while allowing flexibility in specific steps. Early in my career, I used it to standardize payment processing workflows in an e-commerce app, enabling different payment types to customize validation and logging steps. This pattern—leveraging inheritance and polymorphism—enhances maintainability and scalability. Explaining it clearly showcases your mentorship skills.

In software engineering, the Template Method pattern helps you:
- **Promote Reusability**: Define common algorithms with customizable steps.
- **Enhance Modularity**: Isolate variable logic in subclasses.
- **Improve Maintainability**: Write clean, reusable code (Section 9).
- **Teach Effectively**: Share structured algorithm design with teams.

## Key Concepts
### 1. Template Method Pattern Overview
The Template Method pattern defines an algorithm’s skeleton in an abstract class, with abstract methods for steps that subclasses implement.

**Structure**:
- **Abstract Class**: Defines the template method and abstract steps (e.g., `AbstractPaymentProcessor`).
- **Concrete Classes**: Implement specific steps (e.g., `CreditCardProcessor`, `PayPalProcessor`).
- **Client**: Calls the template method, unaware of implementation details.

### 2. Comparison to Other Behavioral Patterns
- **Strategy** (Lecture 10): Encapsulates interchangeable algorithms via composition.
- **Observer** (Lecture 11): Manages event-driven notifications.
- **Command** (Lecture 12): Encapsulates actions as objects.
- **Template Method**: Defines algorithm skeletons via inheritance.

### 3. Use Cases
- Payment processing workflows with varying validation steps.
- Data processing pipelines with customizable transformations.
- Report generation with flexible formatting.

**Example**: A payment processing workflow with customizable validation and logging.

## Code Example: Payment Processing Workflow
Let’s implement a payment processing workflow for an e-commerce app, with a UML class diagram.

### UML Class Diagram
```
+---------------------+
| AbstractPaymentProcessor |
+---------------------+
| -userId: String     |
| -amount: double     |
+---------------------+
| +processPayment()   |
| #validatePayment()  |
| #logTransaction()   |
+---------------------+
            |
            | extends
+---------------------+       +---------------------+
| CreditCardProcessor |       |   PayPalProcessor   |
+---------------------+       +---------------------+
| +validatePayment    |       | +validatePayment    |
| +logTransaction     |       | +logTransaction     |
+---------------------+       +---------------------+
```

### Java Implementation
```java
// Abstract class
public abstract class AbstractPaymentProcessor {
    protected String userId;
    protected double amount;
    
    public AbstractPaymentProcessor(String userId, double amount) {
        this.userId = userId;
        this.amount = amount;
    }
    
    // Template method
    public void processPayment() {
        validatePayment();
        System.out.println("Processing payment of $" + amount + " for user " + userId);
        logTransaction();
    }
    
    protected abstract void validatePayment();
    protected abstract void logTransaction();
}

// Concrete class: CreditCardProcessor
public class CreditCardProcessor extends AbstractPaymentProcessor {
    public CreditCardProcessor(String userId, double amount) {
        super(userId, amount);
    }
    
    @Override
    protected void validatePayment() {
        System.out.println("Validating credit card for user " + userId);
    }
    
    @Override
    protected void logTransaction() {
        System.out.println("Logging credit card transaction: $" + amount + " for " + userId);
    }
}

// Concrete class: PayPalProcessor
public class PayPalProcessor extends AbstractPaymentProcessor {
    public PayPalProcessor(String userId, double amount) {
        super(userId, amount);
    }
    
    @Override
    protected void validatePayment() {
        System.out.println("Validating PayPal account for user " + userId);
    }
    
    @Override
    protected void logTransaction() {
        System.out.println("Logging PayPal transaction: $" + amount + " for " + userId);
    }
}

// Client code
public class PaymentClient {
    public static void main(String[] args) {
        // Process credit card payment
        AbstractPaymentProcessor creditCardProcessor = new CreditCardProcessor("user1", 100.0);
        creditCardProcessor.processPayment();
        
        // Process PayPal payment
        AbstractPaymentProcessor payPalProcessor = new PayPalProcessor("user2", 50.0);
        payPalProcessor.processPayment();
        // Output:
        // Validating credit card for user user1
        // Processing payment of $100.0 for user user1
        // Logging credit card transaction: $100.0 for user1
        // Validating PayPal account for user user2
        // Processing payment of $50.0 for user user2
        // Logging PayPal transaction: $50.0 for user2
    }
}
```
- **Template Method and OOP Principles**:
  - **Encapsulation**: Protected fields (`userId`, `amount`) with constructor.
  - **Polymorphism**: Abstract methods (`validatePayment`, `logTransaction`) customized by subclasses.
  - **Abstraction**: `processPayment` hides algorithm details.
  - **Clean Code**: Meaningful names, modularity (Section 9).
- **Big O**: O(1) for `processPayment` (constant-time steps).
- **Edge Cases**: Handles invalid inputs via validation logic (implementation-specific).

**Systematic Approach**:
- Clarified requirements (standard payment workflow, customizable steps).
- Designed UML diagram to model `AbstractPaymentProcessor` and concrete processors.
- Implemented Java classes with Template Method pattern.
- Tested with `main` method for different payment types.

## Real-World Application
Imagine designing a payment processing workflow for an e-commerce app, where the Template Method pattern standardizes steps like validation and logging while allowing flexibility for payment types (e.g., credit card, PayPal). This ensures reusability and maintainability, supporting new payment methods seamlessly. The Template Method pattern—leveraging inheritance and polymorphism—demonstrates your ability to mentor teams on structured algorithm design.

## Practice Exercises
Apply the Template Method pattern with these exercises:
- **Easy**: Design a UML diagram and Java code for a `ReportGenerator` with customizable formatting steps.
- **Medium**: Implement a `DataProcessor` with `CSVProcessor` and `JSONProcessor` for data parsing steps.
- **Medium**: Create a `Workflow` for order processing with customizable validation and notification.
- **Hard**: Design a `Pipeline` for a data analytics app with customizable transformation and aggregation steps.

Try implementing one exercise in Java with a UML diagram, ensuring clean code principles.

## Conclusion
The Template Method pattern equips you to design reusable, maintainable Java systems with standardized algorithm skeletons. By mastering this behavioral pattern, you’ll optimize software, ensure modularity, and teach others effectively. This advances your progress in Section 3 of the *Official CTO* journey.

**Next Step**: Explore [Dependency Injection](/sections/design-patterns/dependency-injection) to achieve loose coupling, or check out [all sections](/sections/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>