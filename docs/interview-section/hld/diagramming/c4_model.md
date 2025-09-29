---
title: What is the C4 Model?
description: Learn about the C4 model for software architecture, its four levels (Context, Container, Component, Code), and how it bridges HLD and LLD in system design.
tags: [C4 Model, System Design, HLD, LLD, Architecture]
---

# What is the C4 Model?

## Overview
The **C4 Model** is a modern approach to software architecture diagrams, created by **Simon Brown**. It provides a **hierarchical set of diagrams** that help developers and stakeholders visualize a system from different levels of abstraction — from the big picture to the code.  

Think of C4 as a **map of your software**:  
- Level 1 (Context) = World Map  
- Level 2 (Container) = Country Map  
- Level 3 (Component) = City Map  
- Level 4 (Code) = Street Map  

---

## Why the C4 Model Matters
- **Clarity**: Avoids messy "big ball of boxes and arrows" diagrams.  
- **Scalability**: Works for startups, large enterprises, and microservices.  
- **Bridges HLD & LLD**: Higher levels (Context, Container) are used in HLD; lower levels (Component, Code) are used in LLD.  
- **Communication**: Helps both technical and non-technical stakeholders.  

---

## The Four Levels of C4

### 1. **Context Diagram (Level 1)**
- Shows the **system as a whole** and its external users/systems.  
- Answers: *Who uses the system? What does it interact with?*  

Example:  
```
[User] ---> [E-commerce System] ---> [Payment Gateway]
```

---

### 2. **Container Diagram (Level 2)**
- Zooms into the system and shows **major containers**: applications, services, databases, APIs.  
- Answers: *What are the main building blocks? How do they communicate?*  

Example:  
- Web App  
- Mobile App  
- API Server  
- Database  
- Cache  

---

### 3. **Component Diagram (Level 3)**
- Breaks down a container into **internal components** (e.g., modules, services, libraries).  
- Answers: *How is a container structured internally?*  

Example (API Server split into):  
- Authentication Component  
- Order Management Component  
- Notification Component  

---

### 4. **Code Diagram (Level 4)**
- Optional. Shows the **class-level detail** for a single component.  
- Answers: *What classes, methods, or packages exist?*  
- Usually auto-generated from IDEs or UML tools.  

---

## Example: E-commerce Platform with C4
- **Context**: User interacts with E-commerce System, which talks to Payment Gateway and Email Service.  
- **Container**: System has a Web App, Mobile App, API Server, and Database.  
- **Component**: API Server has Auth, Order, and Payment components.  
- **Code**: Order component → OrderController, OrderService, OrderRepository.  

---

## C4 in HLD vs LLD
- **HLD**: Use Context + Container diagrams.  
- **LLD**: Use Component + Code diagrams.  

This makes C4 a **unifying framework** that bridges **high-level architecture** with **low-level design**.  

---

## Conclusion
The C4 Model gives software teams a **structured way to visualize systems** at different zoom levels. By mastering it, you can avoid vague architecture diagrams and instead **communicate clearly with both engineers and stakeholders**.  

