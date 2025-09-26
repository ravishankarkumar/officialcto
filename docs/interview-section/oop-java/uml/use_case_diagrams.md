---
title: Use Case Diagrams - Actors and Goals
description: Learn how to represent actors, use cases, system boundaries, and relationships using UML use case diagrams. Essential for object-oriented modeling and system design interviews.
---

# Use Case Diagrams: Showing Actors and Goals

A **Use Case Diagram** is one of the most widely used diagrams in **UML (Unified Modeling Language)**. It visually represents the interactions between **actors** (external entities) and the **system** under design, focusing on the goals (use cases) rather than implementation details.

![Use case diagram](/images/cg_use_case_diagram.png)

## Key Elements of Use Case Diagrams

### 1. Actors
- Represent external entities interacting with the system.
- Can be:
  - **Humans**: End-users, administrators.
  - **Systems**: Payment gateway, external API.
- **Depiction**: Stick figure.

### 2. Use Cases
- Represent functions or goals the system provides to actors.
- **Depiction**: Ovals with descriptive names.
- **Examples**: `Login`, `Place Order`, `Generate Report`.

### 3. System Boundary
- A rectangle enclosing all use cases.
- Defines what functionality belongs to the system vs. external interactions.
![System Boundary](/images/cg_system_boundary.png)

### 4. Relationships
- **Association (line)**: Actor ↔ Use case interaction.  
- **Include**: One use case always calls another (mandatory behavior).  
- **Extend**: Optional/conditional use case adds behavior.  
- **Generalization**: Inheritance relationship between actors or between use cases.  



## Example Scenario: Online Shopping System

- **Actors**: Customer, Admin, Payment Gateway.  
- **Use Cases**: `Browse Items`, `Place Order`, `Make Payment`, `Update Catalog`.  
- **System Boundary**: Defines that browsing, ordering, and payments are part of the system.  
- **Relationships**:
  - `Place Order` **includes** `Make Payment`.
  - `Admin` is a specialized actor (generalization) of `User`.  



## Why Use Case Diagrams?
- **Interview Relevance**: Helps explain system requirements clearly during system design discussions.  
- **Requirement Gathering**: Aligns developers and stakeholders on goals.  
- **Abstraction**: Focuses on "what" the system does, not "how".  



## Quick Tips
- Use descriptive names for use cases (`Login`, not `Enter username and password`).  
- Keep diagrams simple and high-level.  
- Combine with **sequence diagrams** for detailed interactions.  



## Further Reading
- *Head First Object-Oriented Analysis & Design* (Brett McLaughlin, Gary Pollice, Dave West).  
- UML official specification by OMG.  
- Online UML tools like Lucidchart, PlantUML, or Visual Paradigm.  
