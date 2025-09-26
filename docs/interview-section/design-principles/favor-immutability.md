---
title: Favor Immutability
description: Learn the principle of Favor Immutability in Java. Discover why immutable designs improve safety, clarity, and concurrency with examples, UML, and interview prep.
---

# Favor Immutability

## Overview
The principle of **Favor Immutability** encourages designing classes whose state cannot change after creation. Immutable objects are thread-safe, easy to reason about, and less error-prone. This principle is widely used in Java, especially in classes like `String`, `Integer`, and `LocalDate`. By preferring immutability, you make systems more reliable and easier to maintain.

## Learning Objectives
- Understand what immutability means in Java.  
- Learn the **benefits of immutability**: simplicity, safety, thread-safety.  
- Implement immutable classes in Java with practical examples.  
- Explore trade-offs and when mutability might be necessary.  
- Prepare for interviews with common immutability questions.  

## Why It Matters
Mutable state often leads to bugs, especially in concurrent or distributed systems. Immutable designs eliminate classes of problems like unintended side effects, race conditions, and inconsistent state. While immutability can require more object creation, modern JVMs optimize for it, making it a practical design choice.

**Benefits:**
- **Thread-Safety**: Immutable objects require no synchronization.  
- **Clarity**: Behavior is predictable—no hidden state changes.  
- **Reusability**: Same object can be safely shared across contexts.  
- **Defensive Programming**: Prevents accidental modification of data.  

## Key Concepts
1. **Immutable Object**: Once created, its state never changes.  
2. **Java Examples**: `String`, wrapper classes (`Integer`, `Double`), `LocalDate`, `UUID`.  
3. **How to Create Immutable Classes**:  
   - Mark fields as `private final`.  
   - No setters—initialize in the constructor.  
   - Avoid exposing mutable references.  
   - Return defensive copies for mutable fields.  

4. **Trade-offs**:  
   - May increase memory usage due to new object creation.  
   - Sometimes mutability is needed (e.g., caches, buffers).  

## Code Example: Immutable BankAccount

### Mutable Design (Problematic)
```java
// Mutable class (state can change after creation)
public class BankAccount {
    private double balance;
    
    public BankAccount(double balance) {
        this.balance = balance;
    }
    
    public void deposit(double amount) {
        balance += amount;
    }
    
    public void withdraw(double amount) {
        balance -= amount;
    }
    
    public double getBalance() {
        return balance;
    }
}
```
- **Problems**: Balance can be modified anytime, leading to race conditions in multithreaded environments.  

### Immutable Design (Safer)
```java
// Immutable class
public final class BankAccount {
    private final double balance;
    
    public BankAccount(double balance) {
        if (balance < 0) throw new IllegalArgumentException("Balance cannot be negative");
        this.balance = balance;
    }
    
    public double getBalance() {
        return balance;
    }
    
    // Operations return new objects instead of modifying state
    public BankAccount deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Deposit must be positive");
        return new BankAccount(this.balance + amount);
    }
    
    public BankAccount withdraw(double amount) {
        if (amount <= 0 || amount > balance) throw new IllegalArgumentException("Invalid withdrawal");
        return new BankAccount(this.balance - amount);
    }
}
```
- **Solution**: State cannot be changed once created. All operations return new objects.  
- **Result**: Thread-safe, predictable, no side effects.  

### UML (Immutable Design)
```
+---------------------+
|    BankAccount      |<<final>>
+---------------------+
| -balance: double    |
+---------------------+
| +getBalance(): double |
| +deposit(amount): BankAccount |
| +withdraw(amount): BankAccount |
+---------------------+
```

## Real-World Applications
- **Java Core Classes**: `String`, `LocalDate`, `UUID`.  
- **Functional Programming**: Encourages immutable data structures.  
- **Concurrent Systems**: Immutable objects avoid synchronization overhead.  
- **Configuration Objects**: Immutable configs ensure safety during runtime.  

## Practice Exercises
- **Easy**: Create an immutable `Point` class with `x` and `y` coordinates. Add methods to move the point, returning new instances.  
- **Medium**: Implement an immutable `UserProfile` with fields for name and email. Add methods to update fields immutably.  
- **Medium**: Build an immutable `Order` object that supports adding items without changing existing state.  
- **Hard**: Design an immutable `Graph` class where adding nodes and edges returns new graph instances.  

## Interview Insights
- *“Why are immutable objects thread-safe?”*  
- *“What are examples of immutable classes in Java?”*  
- *“How do you design an immutable class?”*  
- *“When might mutability be preferable?”*  

## Conclusion
Favoring immutability simplifies reasoning about code, improves safety, and makes systems easier to maintain. While mutability has its uses, immutable designs are often the safer default in Java. By leveraging immutability, you create robust, concurrent-friendly applications.

**Next Step**: Explore [Information Hiding](/interview-section/design-principles/information-hiding) to learn how concealing implementation details further strengthens modular design.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
