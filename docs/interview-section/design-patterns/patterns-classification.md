---
title: Classification of Design Patterns
description: Understand how design patterns are classified — Creational, Structural, Behavioral — and see where all 23 GoF patterns plus common modern patterns fit. Includes examples and quick guidance for interviews.
---

# Classification of Design Patterns

## Overview
Design patterns are reusable solutions to recurring design problems. A common and practical way to organize them is by **intent** — what problem they solve. The classic Gang of Four (GoF) book groups patterns into three categories:

- **Creational** — patterns for object creation.
- **Structural** — patterns for composing classes and objects.
- **Behavioral** — patterns for communication and responsibility between objects.

This page explains each category, lists all **23 GoF patterns** in their groups, and includes modern / architectural patterns that you'll encounter in real systems.

---

## Creational Patterns (What and Why)
Creational patterns abstract the instantiation process, making systems more flexible and reusable by decoupling code from concrete classes.

**When to use**:
- Object creation is complex.
- You want to decouple client code from concrete implementations.
- You need controlled lifecycle or object caching.

**GoF Creational Patterns (5)**:
1. **Singleton** — ensure a class has one instance and provide a global access point.
2. **Factory Method** — define an interface for creating an object, but let subclasses decide which class to instantiate.
3. **Abstract Factory** — provide an interface for creating families of related objects without specifying concrete classes.
4. **Builder** — construct complex objects step-by-step; useful for immutable objects.
5. **Prototype** — create new objects by cloning existing instances.

**Quick examples**:
- Use **Factory** when adding new products without changing client code.
- Use **Builder** for complex constructors (e.g., immutable configuration objects).

---

## Structural Patterns (What and Why)
Structural patterns focus on how classes and objects are composed to form larger structures and help ensure the resulting structures are flexible and efficient.

**When to use**:
- You need to change object composition at runtime.
- You want to simplify interactions with a complex subsystem.
- You need lightweight sharing of many fine-grained objects.

**GoF Structural Patterns (7)**:
1. **Adapter** — convert the interface of a class into another interface clients expect.
2. **Bridge** — decouple an abstraction from its implementation so both can vary independently.
3. **Composite** — compose objects into tree structures to represent part-whole hierarchies.
4. **Decorator** — add responsibilities to objects dynamically.
5. **Facade** — provide a simplified interface to a complex subsystem.
6. **Flyweight** — share state between many similar objects to reduce memory usage.
7. **Proxy** — provide a surrogate or placeholder for another object to control access.

**Quick examples**:
- **Facade** to provide a single API for multiple subsystems (e.g., payment gateway facade).
- **Proxy** used by frameworks for lazy loading or access control.

---

## Behavioral Patterns (What and Why)
Behavioral patterns are about communication between objects and assigning responsibilities. They help design robust interaction models and algorithms.

**When to use**:
- You need to define clear communication protocols between objects.
- You want to encapsulate algorithms or workflows.
- You need dynamic behavior changes at runtime.

**GoF Behavioral Patterns (11)**:
1. **Chain of Responsibility** — pass requests along a chain of handlers.
2. **Command** — encapsulate a request as an object (supports undo/redo, queuing).
3. **Interpreter** — define a grammar and interpret sentences in the language.
4. **Iterator** — provide a way to access elements of a collection sequentially.
5. **Mediator** — centralize complex communication between related objects.
6. **Memento** — capture and restore an object's internal state.
7. **Observer** — define a subscription mechanism to notify multiple observers of state changes.
8. **State** — allow an object to alter its behavior when its internal state changes.
9. **Strategy** — define a family of interchangeable algorithms.
10. **Template Method** — define the skeleton of an algorithm and defer steps to subclasses.
11. **Visitor** — represent an operation to be performed on elements of an object structure without changing the classes on which it operates.

**Quick examples**:
- **Observer** for event systems (UI updates, pub/sub).
- **Strategy** for interchangeable sorting/compression algorithms.

---

## Modern & Architectural Patterns (Context)
Beyond GoF, modern systems use higher-level and enterprise patterns. These are not GoF patterns but are essential in real-world applications:

- **Dependency Injection (DI)** — invert control to inject dependencies (popular in Spring).
- **Repository Pattern** — abstract data access behind a collection-like interface.
- **Event Sourcing** — store state changes as a sequence of events.
- **CQRS (Command Query Responsibility Segregation)** — separate read and write models for scalability.
- **MVC / MVVM / MVP** — architectural patterns for UI and separation of concerns.

These patterns often *compose* multiple GoF patterns internally (e.g., MVC uses Observer).

---

## How to Choose a Pattern (Practical Tips)
1. **Understand the problem** before picking a pattern — patterns are tools, not rules.  
2. **Prefer simple solutions** first (KISS). Use a pattern when it clearly solves a problem or prevents repetition.  
3. **Combine patterns**: many robust systems use multiple patterns together (e.g., Builder + Singleton + Factory).  
4. **Know trade-offs**: patterns introduce indirection and structure; use them when benefits outweigh complexity.

---

## Interview Quick-Reference
- **List the three GoF categories** and examples of patterns in each.  
- **Explain the intent** of a pattern (what problem it solves).  
- **Trade-offs**: when a pattern hurts more than helps (e.g., Singleton -> global state issues).  
- **Mapping**: show how a real system (e.g., payment processor) uses patterns — Strategy for payment algorithms, Factory for object creation, Facade for unified API.

---

## Summary Table (GoF 23)
| Category     | Patterns (GoF) |
|--------------|----------------|
| Creational   | Singleton, Factory Method, Abstract Factory, Builder, Prototype |
| Structural   | Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy |
| Behavioral   | Chain of Responsibility, Command, Interpreter, Iterator, Mediator, Memento, Observer, State, Strategy, Template Method, Visitor |

---

## Further Reading
- *Design Patterns — Elements of Reusable Object-Oriented Software* (Gamma et al.) — the original GoF book.  
- *Head First Design Patterns* — approachable, example-driven.  
- *Patterns of Enterprise Application Architecture* (Martin Fowler) — enterprise-level patterns like Repository, Unit of Work.  
- *Clean Architecture* (Robert C. Martin) — architectural guidance and dependency rules.

---
