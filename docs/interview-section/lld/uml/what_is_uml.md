---
title: What is UML?
description: Understand UML (Unified Modeling Language), its purpose, key diagram types, and how it is used in system and low-level design.
tags: [UML, System Design, LLD, Diagrams]
---

# What is UML?

## Overview
**UML (Unified Modeling Language)** is a standardized visual language used to **model software systems**. It helps developers, architects, and stakeholders understand the structure and behavior of a system through diagrams.  

Think of UML as the **blueprint of software**: just like architects draw floor plans before constructing a building, engineers use UML diagrams before (and during) implementation.

---

## Why UML Matters
- **Clarity**: Converts abstract requirements into visual models.  
- **Communication**: Bridges developers, product managers, and non-technical stakeholders.  
- **Design Aid**: Makes it easier to spot flaws in architecture before coding.  
- **Interview Relevance**: Frequently used in **LLD interviews** to explain class design, API flow, and service interactions.  

---

## Types of UML Diagrams
UML defines many diagrams, but in practice, these are the most commonly used:

1. **Structural Diagrams (Static view)**  
   - **Class Diagram**: Shows classes, attributes, methods, and relationships.  
   - **Component Diagram**: High-level modules or services and their interactions.  

2. **Behavioral Diagrams (Dynamic view)**  
   - **Sequence Diagram**: How objects/services interact step-by-step.  
   - **Use Case Diagram**: High-level user actions and system responses.  
   - **Activity Diagram**: Workflow or process representation.  

---

## Example: Class Diagram (User Management)
```
+-------------------+       +---------------------+
|      User         |       |   UserRepository    |
+-------------------+       +---------------------+
| - id: String      |<>---->| + save(User): void  |
| - name: String    |       | + find(id): User    |
+-------------------+       +---------------------+
```
- **User** is a domain entity.  
- **UserRepository** manages persistence.  
- The `<>` arrow shows association (UserRepository depends on User).  

---

## Example: Sequence Diagram (User Creation Flow)
```
Client -> UserController: createUser(name, email)
UserController -> UserService: createUser(name, email)
UserService -> UserRepository: save(User)
UserRepository --> UserService: success
UserService --> UserController: User created
UserController --> Client: Response 201 Created
```
This shows the **flow of function calls** when a client creates a user.  

---

## When to Use UML
- **Before coding**: To clarify design in interviews or team discussions.  
- **During coding**: To validate class relationships and data flow.  
- **After coding**: For documentation and onboarding new team members.  

---

## Conclusion
UML is a **visual toolkit** for designing, explaining, and documenting software systems. By mastering a few key diagrams—**class, sequence, and activity**—you can communicate complex ideas clearly and perform better in both **real-world design** and **system design interviews**.  

**Next Step**: Learn how to [create a Class Diagram for LLD](/interview-section/lld/uml/class_diagrams).
