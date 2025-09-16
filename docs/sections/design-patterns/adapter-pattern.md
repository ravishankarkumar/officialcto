---
title: Adapter Pattern
description: Master the Adapter pattern in Java to bridge incompatible interfaces, with practical examples for better software engineering.
---

# Adapter Pattern

## Overview
The Adapter pattern is a structural design pattern that allows incompatible interfaces to work together, enabling seamless integration of legacy or third-party systems. In this sixth lesson of Section 3 in the *Official CTO* journey, we explore the **Adapter pattern**, its implementation in Java, and its applications in system design. Whether integrating a legacy payment API into a modern e-commerce app or adapting a third-party library for a social platform, this pattern ensures compatibility and modularity. By mastering Adapter, you’ll create flexible Java systems and mentor others effectively.

Inspired by *Design Patterns* by Gang of Four, *Head First Design Patterns*, and *Clean Code*, this 15-minute lesson covers the concepts, a practical Java example with a UML diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand the **Adapter pattern** and its role as a structural pattern.
- Learn to implement an **Adapter** in Java for incompatible interfaces.
- Apply **OOP principles** (Section 2, Lecture 1) and **UML** (Section 2, Lecture 2) to Adapter design.
- Use the pattern in real-world scenarios with clean code practices (Section 9).

## Why the Adapter Pattern Matters
The Adapter pattern enables integration of systems with mismatched interfaces, critical for working with legacy code or third-party APIs. Early in my career, I used it to adapt a legacy payment API to a modern e-commerce system, ensuring seamless transactions without rewriting the core logic. This pattern—leveraging abstraction and encapsulation—enhances compatibility and maintainability. Explaining it clearly showcases your mentorship skills.

In software engineering, the Adapter pattern helps you:
- **Enable Compatibility**: Bridge old and new systems seamlessly.
- **Enhance Modularity**: Isolate integration logic for low coupling.
- **Improve Maintainability**: Write clean, reusable code (Section 9).
- **Teach Effectively**: Share integration strategies with teams.

## Key Concepts
### 1. Adapter Pattern Overview
The Adapter pattern converts the interface of one class (adaptee) into another interface (target) that a client expects.

**Structure**:
- **Target**: The interface the client expects (e.g., `PaymentProcessor`).
- **Adaptee**: The incompatible system (e.g., `LegacyPaymentAPI`).
- **Adapter**: Implements the target interface, wrapping the adaptee to translate calls.
- **Client**: Uses the target interface without knowing about the adaptee.

### 2. Types of Adapters
- **Class Adapter**: Uses inheritance (extends adaptee, implements target).
- **Object Adapter**: Uses composition (holds adaptee instance), preferred for flexibility.

### 3. Use Cases
- Integrating legacy payment APIs with modern systems.
- Adapting third-party libraries to match application interfaces.
- Wrapping external services for consistent usage.

**Example**: Adapting a legacy payment API to a modern payment processor interface.

## Code Example: Legacy Payment Adapter
Let’s implement an adapter to integrate a legacy payment API into a modern e-commerce app, with a UML class diagram.

### UML Class Diagram
```
+---------------------+
| PaymentProcessor    |
+---------------------+
| +processPayment(amount: double, userId: String) |
+---------------------+
            |
            | implements
+---------------------+       +---------------------+
| LegacyPaymentAdapter |-------| LegacyPaymentAPI    |
+---------------------+  uses | +charge(amount: double, user: String) |
| -legacyApi: LegacyPaymentAPI | +---------------------+
+---------------------+
| +processPayment     |
+---------------------+
```

### Java Implementation
```java
// Target interface
public interface PaymentProcessor {
    void processPayment(double amount, String userId);
}

// Adaptee (legacy system)
public class LegacyPaymentAPI {
    public void charge(double amount, String user) {
        System.out.println("Legacy API: Charged $" + amount + " for user " + user);
    }
}

// Adapter (object adapter)
public class LegacyPaymentAdapter implements PaymentProcessor {
    private final LegacyPaymentAPI legacyApi;
    
    public LegacyPaymentAdapter(LegacyPaymentAPI legacyApi) {
        this.legacyApi = legacyApi;
    }
    
    @Override
    public void processPayment(double amount, String userId) {
        // Translate modern interface to legacy
        legacyApi.charge(amount, userId);
    }
}

// Client code
public class PaymentClient {
    private final PaymentProcessor processor;
    
    public PaymentClient(PaymentProcessor processor) {
        this.processor = processor;
    }
    
    public void processTransaction(double amount, String userId) {
        processor.processPayment(amount, userId);
    }
    
    // Example usage
    public static void main(String[] args) {
        // Simulate concurrent payment processing
        LegacyPaymentAPI legacyApi = new LegacyPaymentAPI();
        PaymentProcessor adapter = new LegacyPaymentAdapter(legacyApi);
        PaymentClient client = new PaymentClient(adapter);
        
        Thread t1 = new Thread(() -> client.processTransaction(100.0, "user1"));
        Thread t2 = new Thread(() -> client.processTransaction(50.0, "user2"));
        
        t1.start();
        t2.start();
        
        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        // Output: Legacy API: Charged $100.0 for user user1
        //         Legacy API: Charged $50.0 for user user2
    }
}
```
- **Adapter and OOP Principles**:
  - **Encapsulation**: Private `legacyApi` field in adapter.
  - **Abstraction**: `PaymentProcessor` interface hides legacy details.
  - **Polymorphism**: Adapter implements target interface for client use.
  - **Clean Code**: Meaningful names, modularity (Section 9).
- **Big O**: O(1) for `processPayment` (direct call to adaptee).
- **Edge Cases**: Handles null inputs, concurrent calls (stateless adapter).

**Systematic Approach**:
- Clarified requirements (integrate legacy payment API with modern interface).
- Designed UML diagram to model `PaymentProcessor`, `LegacyPaymentAPI`, and `LegacyPaymentAdapter`.
- Implemented Java classes with object adapter pattern.
- Tested with `main` method for concurrent usage.

## Real-World Application
Imagine integrating a legacy payment API into a modern e-commerce app, where the Adapter pattern bridges the old API’s interface to a new system’s requirements. This ensures seamless transactions without rewriting legacy code, maintaining modularity and scalability. The Adapter pattern—leveraging abstraction and encapsulation—demonstrates your ability to mentor teams on robust integration solutions.

## Practice Exercises
Apply the Adapter pattern with these exercises:
- **Easy**: Design a UML diagram and Java code for an adapter to integrate a legacy `LoggerAPI` with a modern `Logger` interface.
- **Medium**: Implement an adapter to bridge a third-party `AuthService` with a modern `Authentication` interface.
- **Medium**: Create an adapter for a legacy `FileReaderAPI` to match a modern `DataReader` interface.
- **Hard**: Design an adapter for a third-party `NotificationAPI` to integrate with a modern `NotificationService` in a social app.

Try implementing one exercise in Java with a UML diagram, ensuring clean code principles.

## Conclusion
The Adapter pattern equips you to design flexible Java systems that integrate incompatible interfaces. By mastering this structural pattern, you’ll optimize software integration, ensure maintainability, and teach others effectively. This advances your progress in Section 3 of the *Official CTO* journey.

**Next Step**: Explore [Decorator Pattern](/sections/design-patterns/decorator-pattern) to learn dynamic functionality extension, or check out [all sections](/sections/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>