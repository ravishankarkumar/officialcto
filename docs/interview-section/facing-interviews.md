---
title: Facing Interviews
description: Points to keep in mind while facing/attempting interviews.
---

# Tech Interview One-Pager: Do's, Don'ts, Time Allocation, Requirements, and Revision Topics

## 1. Do's and Don'ts of Tech Interviews
### Do's:
- Think out loud.
- Clarify assumptions with the interviewer; never assume anything.
- Approach with a framework:  
  - Coding → Brute force solutions are significantly better than no answers.  
  - Behavioral → STAR method, data-driven answers.  
  - Design → get design buyin, and discuss trade-offs early.
- Align non-technical conversations with company culture and leadership principles (e.g., Amazon’s Ownership, Google’s Clarity).
- Be ready (preferably before interview) with questions to ask from interviewer when given opportunity.

### Don’ts:
- Don’t ignore behavioral prep — referrals & stories matter.
- Avoid jargon without explanation.
- Don’t say “done” prematurely; verify edge cases and bottlenecks.
- Don’t assume interviews are only technical — cultural fit is key.
- Don’t neglect English/communication; practice explaining probably questions clearly.
- Avoid negative framing; highlight learnings from failures.
- Don’t skip edge cases or trade-offs.
- Avoid vague answers; quantify impact (e.g., *reduced latency by 30%*).
- Don’t install packages in coding interviews — use built-ins.
- Don’t rush; manage time wisely.


## 2. Tackling different types of interviews

### DS/Algo (Coding Interview)
#### Topics to review before interviews
- **Data Structures**: Arrays, Strings, Linked Lists, Stacks/Queues, Trees/Graphs, Heaps, Hashing.
- **Algorithms**: Sorting (Quick/Merge), Searching (Binary), DP, Greedy, BFS/DFS, Backtracking.
- **Other**: Bit manipulation, combinatorics, math puzzles.

#### How to spend 1 hous?
- 0–5 min: Clarify problem, constraints, edge cases.
- 5–20 min: Discuss approach, DS/Algo choice, complexity.
- 20–40 min: Write code, explain as you go, handle errors.
- 40–50 min: Test with examples & edge cases; optimize.
- 50–60 min: Discuss alternatives, clean up.

::: info if multiple questions gets asked, or the first question is simple/warm up question
Repeat the process at 2× speed.
:::

#### Requirement Gathering
Even if you think you have understood the problem, be explicit in getting absolute clarity of the questions being asked.

#### Testing
Be very thorough in testing the solution by specifying all the test cases you can think of. Be sure to check edge cases.

--- 
### LLD (Low-Level Design)
### DS/Algo (Coding Interview)
#### Topics to review before interviews
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

#### How to spend 1 hous?
- 0–3 min: Clarify the interview type (schema, API, service design, or class design / OOP).
- 3–7 min: Clarify requirements, functional/non-functional needs, use cases.
- 7–15 min: Identify classes, interfaces; UML diagrams; discuss OOD principles (SOLID, DRY, KISS, YAGNI).
- 15–40 min: Implement key classes/methods; show modularity, testability, error handling.
- 40–50 min: Discuss trade-offs (extensibility vs. simplicity); add unit test ideas.
- 50–60 min: Q&A, refine based on feedback.

#### Requirement Gathering
In LLD interviews, requirement gathering is a two step process.

- Understanding what kind of interview this is.
  - Some may ask you to design services, i.e. what all services will be there, and what those services will do, and then ask you to detail one service. 
  - Some companies asks about API design, other asks about Class design.
  - Some companies want working code by the end if this interview, some just wants a simple flow explained in a diagram.
  - Some companies asks a combination of these, for example wayfair LLD has 3 parts in their interview. Please check on [wayfair interview FAQ page](https://www.aboutwayfair.com/careers/tech-blog/commencing-your-technology-journey-at-wayfair-the-interview-process-for-software-engineers) under `App Architecture and Data Modeling` section.

- Functional and non-functional requirement gathering.
::: info Non-functional requirements
It's easy to miss non-functional requirements in LLD interviews. Use the following hint to come up with some non-functional requirements in your interview.

|NFR	 | LLD Focus / Translation	 | Examples in LLD Interview |
|---|---|---|
|Performance (Latency/Throughput)	| Algorithm efficiency and Data Structures.	| Discussing the time complexity (O(N)) of a method, choosing a Hash Map over a Linked List for fast lookups (e.g., in a Cache or Rate Limiter design), or optimizing database query performance. |
|Maintainability & Extensibility	| SOLID Principles and Design Patterns.	| Applying the Open/Closed Principle to allow adding new types without modifying existing code (e.g., using the Strategy or Factory Pattern), or designing clear, modular class boundaries. |
| Testability	| Class separation and Dependency Injection.	| Designing classes such that dependencies can be easily mocked or injected to facilitate unit testing. |
| Security	| Data validation and Access Control.	| Discussing where and how input validation is performed, or implementing the Authentication and Authorization logic within a service component using appropriate patterns. |
| Reliability/Fault Tolerance |	Exception handling and Concurrency.	| Implementing robust error handling (try-catch blocks), using thread-safe data structures, or correctly using locks/mutexes to handle concurrency in a multi-threaded component (like a game manager or a concurrent cache).|
:::

---
### HLD (High-Level Design)
#### Topics to review before interviews
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

#### How to spend 1 hous?
- 0–5 min: Clarify requirements, scope, constraints (scalability, latency, availability).
- 5–10 min: Present high-level idea; get interviewer buy-in.
- 10–15 min: Define core components (DB, cache, services); sketch diagram.
- 15–35 min: Detail data flow, trade-offs (sharding vs. replication, CAP theorem).
- 35–50 min: Cover scalability, caching, reliability, monitoring; consider extensions.
- 50–60 min: Wrap up, summarize, discuss next steps.

#### Requirement Gathering
**Functional:**
- Define *what* the system does.
- Examples: user login, send message, process payment.
- Focus: actions, inputs/outputs, use cases.

**Non-Functional:**
- Define *how* the system performs.
- Examples: scalability (1M users/sec), latency (<100ms), availability (99.9%), security, usability.
- Focus: performance, reliability, maintainability.

In HLD, start with functional → then non-functional to guide architecture.


---
### Behavioral/Leadership
#### Topics to review before interviews
- STAR stories (5–10): conflict, leadership, failure, influence.
- Company values:  
  - Amazon → Ownership, Customer Obsession.  
  - Google → Clarity, Collaboration.  
  - Meta → Speed, Boldness.  
  - Netflix → Freedom & Responsibility.
- Focus: teamwork, growth mindset, handling ambiguity, quantifiable impact.

#### How to spend 1 hous?
- 0–5 min: Icebreaker, self-intro, context.
- 5–40 min: 3–5 STAR answers (Situation: 10s, Task: 10s, Action: 1–2 min, Result: 30s).
- 40–50 min: Ask thoughtful questions (culture, challenges).
- 50–60 min: Thank interviewer, reiterate interest.


<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
