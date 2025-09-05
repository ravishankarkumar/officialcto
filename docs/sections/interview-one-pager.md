---
title: Interviews one pager
description: Points to keep in mind while attempting interviews.
---

# Tech Interview One-Pager: Do's, Don'ts, Time Allocation, Requirements, and Revision Topics

## 1. Do's and Don'ts of Tech Interviews

### Do's:
- It’s possible to feel blank at the start of the interview. Stay calm, buy time, and explain your thought process: *“Here’s what I’m thinking…”*.
- Get a referral if possible.
- Clarify assumptions with the interviewer; never assume anything.
- Practice with a framework:  
  - Coding → company-tagged questions.  
  - Behavioral → STAR method, data-driven answers.  
  - Design → discuss trade-offs early.
- Research company culture and leadership principles (e.g., Amazon’s Ownership, Google’s Clarity).
- Use open-ended questions in behavioral rounds to show curiosity.
- Be honest; don’t make up stories.
- For coding, estimate time/space complexities on the fly; for design, cover trade-offs early.
- Mock practice: LeetCode, system design mocks, and behavioral stories.

### Don’ts:
- Don’t ignore behavioral prep — referrals & stories matter.
- Avoid jargon without explanation.
- Don’t say “done” prematurely; verify edge cases and bottlenecks.
- Don’t assume interviews are only technical — cultural fit is key.
- Don’t neglect English/communication; practice explaining clearly.
- Avoid negative framing; highlight learnings from failures.
- Don’t skip edge cases or trade-offs.
- Avoid vague answers; quantify impact (e.g., *reduced latency by 30%*).
- Don’t install packages in coding interviews — use built-ins.
- Don’t rush; manage time wisely.

---

## 2. How to Spend One Hour in Different Interview Types

### DS/Algo (Coding Interview)
#### If one problem is asked:
- 0–5 min: Clarify problem, constraints, edge cases.
- 5–20 min: Discuss approach, DS/Algo choice, complexity.
- 20–40 min: Write code, explain as you go, handle errors.
- 40–50 min: Test with examples & edge cases; optimize.
- 50–60 min: Discuss alternatives, clean up.

#### If multiple problems are asked:
- Repeat the process at 2× speed.

---

### LLD (Low-Level Design)
- 0–3 min: Clarify the interview type (schema, API, service design, or class design / OOP).
- 3–7 min: Clarify requirements, functional/non-functional needs, use cases.
- 7–15 min: Identify classes, interfaces; UML diagrams; discuss OOD principles (SOLID, DRY, KISS, YAGNI).
- 15–40 min: Implement key classes/methods; show modularity, testability, error handling.
- 40–50 min: Discuss trade-offs (extensibility vs. simplicity); add unit test ideas.
- 50–60 min: Q&A, refine based on feedback.

---

### HLD (High-Level Design)
- 0–5 min: Clarify requirements, scope, constraints (scalability, latency, availability).
- 5–10 min: Present high-level idea; get interviewer buy-in.
- 10–15 min: Define core components (DB, cache, services); sketch diagram.
- 15–35 min: Detail data flow, trade-offs (sharding vs. replication, CAP theorem).
- 35–50 min: Cover scalability, caching, reliability, monitoring; consider extensions.
- 50–60 min: Wrap up, summarize, discuss next steps.

---

### Behavioral/Leadership
- 0–5 min: Icebreaker, self-intro, context.
- 5–40 min: 3–5 STAR answers (Situation: 10s, Task: 10s, Action: 1–2 min, Result: 30s).
- 40–50 min: Ask thoughtful questions (culture, challenges).
- 50–60 min: Thank interviewer, reiterate interest.

---

## 3. Functional vs Non-Functional Requirements

### Functional:
- Define *what* the system does.
- Examples: user login, send message, process payment.
- Focus: actions, inputs/outputs, use cases.

### Non-Functional:
- Define *how* the system performs.
- Examples: scalability (1M users/sec), latency (<100ms), availability (99.9%), security, usability.
- Focus: performance, reliability, maintainability.

👉 In design: start with functional → then non-functional to guide architecture.

---

## 4. Topics to Revise for Different Interviews

### DS/Algo (Coding Interview)
- **Data Structures**: Arrays, Strings, Linked Lists, Stacks/Queues, Trees/Graphs, Heaps, Hashing.
- **Algorithms**: Sorting (Quick/Merge), Searching (Binary), DP, Greedy, BFS/DFS, Backtracking.
- **Other**: Bit manipulation, combinatorics, math puzzles.
- **Practice**: 1–2 LeetCode daily (medium/hard), focus on patterns (sliding window, union-find).

---

### LLD (Low-Level Design)
**Core Principles**
- OOP concepts: encapsulation, abstraction, inheritance, polymorphism.
- SOLID + DRY, KISS, YAGNI.

**Design Patterns**
- Creational: Factory, Singleton, Builder.
- Structural: Adapter, Decorator, Proxy, Composite.
- Behavioral: Observer, Strategy, State, Command.

**UML & Visualization**
- Class, Sequence, Activity, State diagrams.

**Implementation**
- Clean, testable code; interfaces; modularity.
- Handle concurrency, thread-safety, race conditions.

**Practice Systems**
- Parking Lot, Movie Booking, Vending Machine, ATM, Chess, Food Delivery, Library Management, Ride-sharing.

---

### HLD (High-Level Design)
**Scalability & Performance**
- Horizontal vs. Vertical Scaling.
- Sharding, Replication, Consistent Hashing.
- Load balancing, rate limiting, API versioning.

**Caching**
- Redis, Memcached.
- Policies: LRU, LFU, write-through, cache invalidation.

**Databases**
- SQL vs. NoSQL.
- Indexing, partitioning, transactions, replication.

**Reliability**
- Fault tolerance, retries, timeouts, circuit breakers.
- Availability (CAP theorem).

**Components**
- API Gateway, CDN, MQ (Kafka, RabbitMQ), Microservices vs. Monolith.

**Monitoring**
- Metrics, logging, alerting, observability.

**Common Systems**
- Messaging App, URL Shortener, Social Media Feed, Ride-Sharing.

---

### Behavioral/Leadership
- STAR stories (5–10): conflict, leadership, failure, influence.
- Company values:  
  - Amazon → Ownership, Customer Obsession.  
  - Google → Clarity, Collaboration.  
  - Meta → Speed, Boldness.  
  - Netflix → Freedom & Responsibility.
- Focus: teamwork, growth mindset, handling ambiguity, quantifiable impact.

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
