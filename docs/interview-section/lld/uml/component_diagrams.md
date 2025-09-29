---
title: What is a Component Diagram?
description: Learn about UML Component Diagrams, their purpose, symbols, and how they are used to represent modular structures in system and low-level design.
tags: [UML, Component Diagram, System Design, LLD, Architecture]
---

# What is a Component Diagram?

## Overview
A **Component Diagram** is a type of **UML (Unified Modeling Language)** diagram that shows the **modular structure of a system**. It focuses on how different components (services, modules, APIs) interact with each other via interfaces and dependencies.  

Think of it as a **blueprint of system modules** — while a **Class Diagram** goes deep into attributes and methods, a **Component Diagram** zooms out to show how modules are wired together.

---

## Why Component Diagrams Matter
- **Modularity**: Visualize system components and their responsibilities.  
- **Communication**: Show how different modules/services depend on one another.  
- **Architecture View**: Useful for both **HLD (system architecture)** and **LLD (module design)**.  
- **Interview Relevance**: Often used to describe microservices, APIs, or modular monoliths.  

---

## Key Elements of Component Diagrams
- **Component**: Represented as a rectangle with the keyword `<<component>>`.  
- **Interface**: Small circle (provided) or half-circle (required) showing contracts.  
- **Dependency**: Dashed arrow showing one component depends on another.  

---

## Example: E-Commerce Platform
Here’s how an **e-commerce platform** might be shown in a component diagram:

```
+-------------------+       +------------------+
| <<component>>     |       | <<component>>    |
|  User Service     |<----->|  Order Service   |
+-------------------+       +------------------+
         |                           |
         v                           v
+-------------------+       +------------------+
| <<component>>     |       | <<component>>    |
|  Auth Service     |       |  Payment Service |
+-------------------+       +------------------+
```

- **User Service** communicates with **Auth Service** for login.  
- **Order Service** depends on **Payment Service** for transactions.  
- All are independent components that can be developed/tested separately.  

---

## When to Use Component Diagrams
- **System design interviews**: To show how services interact.  
- **Microservices architecture**: Mapping service-to-service communication.  
- **API design**: Illustrating dependencies between modules.  
- **Documentation**: For teams to understand system structure quickly.  

---

## Conclusion
Component Diagrams provide a **high-level view of modular structure**, making them ideal for explaining system dependencies in both **real-world systems** and **interviews**. By mastering them, you’ll be able to communicate **system architecture clearly and concisely**.  

**Next Step**: Explore [Activity Diagrams](/interview-section/lld/uml/activity_diagrams) to learn how to represent workflows inside these components.
