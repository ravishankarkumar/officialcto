---
title: What is an Activity Diagram?
description: Learn about UML Activity Diagrams, their purpose, symbols, and how they are used to represent workflows in system and low-level design.
tags: [UML, Activity Diagram, System Design, LLD, Workflow]
---

# What is an Activity Diagram?

## Overview
An **Activity Diagram** is a type of **UML (Unified Modeling Language)** diagram used to model the **workflow of a process**. It shows the sequence of steps, decisions, and parallel flows in a system.  

Think of it as a **flowchart on steroids** — Activity Diagrams go beyond simple flows to model **concurrent processes, synchronization, and business logic**.

---

## Why Activity Diagrams Matter
- **Clarify workflows**: Visualize how tasks proceed step-by-step.  
- **Spot bottlenecks**: Identify slow or complex decision points.  
- **Team communication**: Provide a non-technical view for stakeholders.  
- **LLD interviews**: Commonly used to show request flows, order lifecycles, or API usage.  

---

## Key Elements of Activity Diagrams
- **Initial Node**: Black circle → starting point.  
- **Activity/Action**: Rounded rectangle → a step/task.  
- **Decision Node**: Diamond → branching based on conditions.  
- **Merge Node**: Diamond → merging flows back together.  
- **Fork/Join**: Bars → represent parallelism and synchronization.  
- **Final Node**: Black circle with a ring → end of the workflow.  

---

## Example: Online Order Workflow
Here’s how an **e-commerce order process** might be represented:

```
[Start]
   |
   v
[User Adds Item to Cart]
   |
   v
[Checkout]
   |
   v
+----------------+
| Payment Done?  |
+----------------+
   |Yes                 |No
   v                    v
[Generate Order]   [Cancel Order]
   |
   v
[Send Confirmation Email]
   |
   v
[End]
```

---

## When to Use Activity Diagrams
- **Business processes** (e.g., order fulfillment, loan approval).  
- **System workflows** (e.g., API request handling, microservice communication).  
- **Interviews**: To explain how components interact at a workflow level.  

---

## Conclusion
Activity Diagrams are a **powerful UML tool** for modeling workflows and decision-making processes. By mastering them, you can clearly communicate **how data and tasks flow** across a system, both in **real projects** and **system design interviews**.  

**Next Step**: Explore [Sequence Diagrams](/interview-section/lld/uml/sequence_diagrams) to learn how to model interactions between objects and services.
