---
title: Database Fundamentals
description: Learn the basics of databases, relational vs non-relational models, ACID vs BASE properties, and common terminology essential for system design interviews and real-world systems.
---

# Database Fundamentals

Databases are the backbone of every application — from a simple note-taking app to planet-scale services like Facebook or WhatsApp.  
Before diving into advanced scaling techniques, let’s build a solid foundation.

---

## 1. What is a Database?

A **database** is an organized collection of data that can be easily accessed, managed, and updated.  
At its core:  
- It stores data.  
- It provides structured access (queries).  
- It ensures durability (data isn’t lost when servers crash).  

**Analogy:** Think of a database as a *digital filing cabinet*, where tables, documents, or key-value pairs replace physical folders.

---

## 2. Relational vs Non-Relational Databases

### Relational Databases (SQL)
- Data is organized into **tables** (rows and columns).
- Each row = record, each column = attribute.
- Use **SQL (Structured Query Language)** for queries.
- Schema: predefined and rigid (strong structure).
- Examples: PostgreSQL, MySQL, Oracle, SQL Server.

**Strengths:**
- Strong consistency guarantees.
- Powerful querying (joins, aggregations).
- Mature ecosystem.

**Weaknesses:**
- Harder to scale horizontally.
- Schema changes can be slow.

---

### Non-Relational Databases (NoSQL)
- Schema-less or flexible schema.
- Store data in different formats:
  - **Key-Value** (Redis, DynamoDB)
  - **Document** (MongoDB, Couchbase)
  - **Wide-Column** (Cassandra, HBase)
  - **Graph** (Neo4j, JanusGraph)

**Strengths:**
- Scales horizontally more easily.
- Flexible data models (good for evolving apps).
- Optimized for specific workloads (e.g., graphs, time-series).

**Weaknesses:**
- Weaker consistency (often eventual consistency).
- Limited query capabilities compared to SQL.
- Immature tooling compared to relational DBs.

---

### Quick Example

| Use Case                  | Better Fit      |
|----------------------------|-----------------|
| Banking System             | Relational (SQL)|
| Social Media Feed          | Document (NoSQL)|
| Real-time Analytics        | Wide-Column DB  |
| Recommendation Engine      | Graph DB        |

---

## 3. ACID vs BASE Properties

### ACID (Relational World)
Guarantees correctness and reliability of transactions.  
- **A – Atomicity**: All or nothing (transfer $100 → debit + credit both succeed or both fail).  
- **C – Consistency**: Database always moves from one valid state to another.  
- **I – Isolation**: Concurrent transactions don’t interfere.  
- **D – Durability**: Once committed, data won’t be lost (crash recovery).  

👉 ACID is strong but can slow down distributed systems.

---

### BASE (NoSQL World)
Trade-off to achieve scale.  
- **B – Basically Available**: System is always available (maybe with stale data).  
- **S – Soft State**: State may change over time, even without input (due to replication).  
- **E – Eventually Consistent**: If no new updates, replicas will converge to the same state.  

👉 BASE gives up strict guarantees in favor of scalability and performance.

---

### Analogy
- **ACID**: Like a bank — you’d never want your balance inconsistent.  
- **BASE**: Like Facebook feed — if your friend’s like shows up a few seconds later, it’s acceptable.

---

## 4. Common Terminology (Jargon)

Here are terms you’ll keep encountering:

- **Transaction**: A unit of work (e.g., money transfer).  
- **Primary Key**: Unique identifier for a record (e.g., `user_id`).  
- **Foreign Key**: Links one table to another (relationships).  
- **Index**: Auxiliary structure to speed up queries (like a book’s index).  
- **Replication**: Copying data across multiple machines for availability.  
- **Sharding**: Splitting data across machines for scalability.  
- **Latency**: Time taken to complete a query.  
- **Throughput**: Number of queries a system can handle per second.  

---

## 5. Interview Tip

- If asked *“Which DB would you use?”* — don’t just say SQL or NoSQL.  
  Instead:  
  - Identify the workload (read-heavy, write-heavy, analytical, transactional).  
  - Talk about **trade-offs** (consistency vs availability, flexibility vs structure).  
  - Reference ACID vs BASE.  

> Example answer:  
> *“For a payment system, I’d prefer a relational DB like PostgreSQL because ACID guarantees are critical. For a real-time chat app, a NoSQL store like Cassandra works better because it scales horizontally and provides eventual consistency, which is acceptable.”*

---

## 6. Recap

- Databases are structured stores of data.  
- **SQL vs NoSQL** is about structure & scaling trade-offs.  
- **ACID vs BASE** defines how databases guarantee correctness vs scalability.  
- Mastering terminology is the first step before diving into scaling techniques.

---

## Next Steps
👉 Continue with [SQL vs NoSQL](/interview-section/database/sql-vs-nosql.md) for a deeper dive into database models and their trade-offs.

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
