---
title: Abstraction vs Encapsulation in OOP
description: Learn the difference between Abstraction and Encapsulation in Object-Oriented Programming (OOP), with clear examples, a comparison table, and interview tips.
---

# Abstraction vs Encapsulation

## Introduction
In Object-Oriented Programming (OOP), **Abstraction** and **Encapsulation** are two fundamental concepts. They often sound similar but serve **different purposes**. In interviews, candidates are frequently asked to distinguish between them. Let’s break it down with clarity.



## Abstraction
- **Definition**: Hiding *implementation details* and exposing only the *essential features* to the outside world.
- **Purpose**: Focuses on **what a class does**, not *how* it does it.
- **Achieved By**:
  - Abstract classes
  - Interfaces
- **Example**:
  ```java
  interface Vehicle {
      void start(); // abstract method – no implementation
  }

  class Car implements Vehicle {
      @Override
      public void start() {
          System.out.println("Car engine starts with a key");
      }
  }

  class ElectricCar implements Vehicle {
      @Override
      public void start() {
          System.out.println("Electric car starts with a button");
      }
  }
  ```
  Here, `Vehicle` provides **abstraction**. Users only care that vehicles can `start()`, not *how*.



## Encapsulation
- **Definition**: Binding **data** (fields) and **methods** (functions) into a single unit and restricting direct access to the data.
- **Purpose**: Protects the internal state of an object.
- **Achieved By**:
  - Private fields
  - Public getters/setters
- **Example**:
  ```java
  class BankAccount {
      private double balance; // hidden from outside

      public void deposit(double amount) {
          balance += amount;
      }

      public double getBalance() {
          return balance;
      }
  }
  ```
  Here, `balance` is **encapsulated**. No external code can directly manipulate it.



## Key Differences (Comparison Table)

| Aspect                | Abstraction                              | Encapsulation                              |
|------------------------|------------------------------------------|--------------------------------------------|
| **Definition**         | Hides *implementation details*           | Hides *internal data* using access control |
| **Focus**              | What the object does (behavior)          | How data is protected and accessed         |
| **Achieved By**        | Abstract classes, Interfaces             | Access modifiers (private, public), getters/setters |
| **Level**              | Design level (conceptual)                | Implementation level (code, access control) |
| **Example**            | `Vehicle` interface → `Car`, `Bike`      | `BankAccount` with private `balance`       |
| **Analogy**            | **TV remote**: You know which button does what, not the circuitry inside. | **Capsule**: Medicine wrapped so internals are safe from direct access. |



## Interview Tip
A common way to phrase the difference:
- **Abstraction** = Hiding *implementation*.  
- **Encapsulation** = Hiding *data*.  



## Conclusion
Both **abstraction** and **encapsulation** are essential for **modularity**, **security**, and **clean design** in OOP. Abstraction helps you define *what to expose*, while encapsulation helps you control *how it’s accessed*.
