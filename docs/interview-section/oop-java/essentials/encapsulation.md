---
title: Encapsulation in OOP
description: Learn encapsulation in object-oriented programming (OOP), why hiding implementation details matters, and how it’s applied in Java with examples.
---

# Encapsulation: Hiding Implementation Details

Encapsulation is one of the **four core principles of object-oriented programming (OOP)**, alongside **abstraction, inheritance, and polymorphism**.  
It is the practice of **hiding implementation details** and exposing only what’s necessary through a controlled interface.


## What is Encapsulation?
- **Definition**: Encapsulation means bundling **data (fields)** and **behavior (methods)** together inside a class, while restricting direct access to the data.  
- **Goal**: Prevent external code from depending on internal details, ensuring flexibility and maintainability.  
- **Access Control**: Achieved via **access modifiers** like `private`, `protected`, and `public`.



## Why Encapsulation Matters
1. **Hides Complexity**: Users interact with a clear API, without worrying about internals.
2. **Improves Maintainability**: Internal changes don’t affect external code, as long as the interface stays the same.
3. **Protects Data Integrity**: Ensures fields cannot be arbitrarily modified (e.g., negative bank balance).
4. **Enhances Reusability**: Classes can evolve independently and safely.
5. **Supports Abstraction**: Encapsulation is the foundation for creating abstracted models.



## Java Example

```java
public class BankAccount {
    // Fields are private → cannot be accessed directly
    private double balance;

    // Public methods act as the controlled interface
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;
    }

    public double getBalance() {
        return balance;
    }
}
```

### Usage
```java
public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount();
        account.deposit(500);
        account.withdraw(100);
        System.out.println("Balance: " + account.getBalance()); // Balance: 400
    }
}
```

 Here, the `balance` is **hidden** from direct access.  
 Users only interact through methods (`deposit`, `withdraw`, `getBalance`).  
 The implementation can change later (e.g., logging, database storage) without breaking external code.



## Encapsulation vs. Abstraction
- **Encapsulation**: Concerned with **how data is hidden** and controlled. (Implementation detail hiding)  
- **Abstraction**: Concerned with **what operations are exposed** to represent essential features. (Conceptual detail hiding)  

Think: *Encapsulation is the mechanism, abstraction is the design principle.*



## Common Interview Questions
1. **What is encapsulation in OOP?**
   - Hiding internal details and exposing only necessary parts via a public API.
2. **How does Java achieve encapsulation?**
   - Using access modifiers (`private`, `public`, `protected`) and getter/setter methods.
3. **Difference between encapsulation and abstraction?**
   - Encapsulation hides *implementation*, abstraction hides *conceptual details*.
4. **Real-world example?**
   - A car: you use the **steering wheel** and **pedals**, but the engine internals are hidden.



## Quick Recap
- Encapsulation = **hide implementation, expose interface**.  
- Achieved via **classes, access modifiers, getters/setters**.  
- Improves **security, maintainability, and reusability**.  
- Foundation for building robust, interview-ready system designs.


