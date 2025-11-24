---
title: Database Indexing
description: Learn how database indexes speed up queries, the different indexing techniques, trade-offs, and common pitfalls to avoid in real-world systems and interviews.
---

# Database Indexing

Indexes are one of the most important optimizations in databases.  
They act like a **lookup guide** (similar to a book’s index) that helps you find rows quickly without scanning the entire table.

In this article, we’ll explore how indexes work, different types, their trade-offs, and common pitfalls.

---

## 1. Why Indexing Matters

Without an index, the database must perform a **full table scan**:  
- Every row is checked to find the required data.  
- Time complexity ≈ **O(n)**.  

With an index:  
- DB navigates directly to relevant rows (e.g., via B-tree).  
- Time complexity ≈ **O(log n)**.  

👉 This is why **proper indexing can reduce query time from seconds to milliseconds**.

---

## 2. How Indexes Work (Analogy)

- Imagine searching for “Physics” in a **500-page textbook**.  
  - Without an index: you flip through every page (full scan).  
  - With an index: you go to the index section, find “Physics → Page 312,” and jump directly.  

That’s what a database index does for your queries.

---

## 3. Types of Indexes

### 3.1 B-Tree Index
- The most common indexing method.  
- Balanced tree structure, keeps data sorted.  
- Efficient for equality (`=`) and range queries (`BETWEEN`, `<`, `>`).  
- Example: PostgreSQL default index.

**Good for:**  
- Numeric ranges, sorted queries, primary key lookups.

---

### 3.2 Hash Index
- Stores a hash of the indexed column.  
- O(1) lookups for equality queries (`=`).  
- Not good for range queries (no ordering).  
- Example: Memory-optimized tables in PostgreSQL, Redis uses hash structures internally.

**Good for:**  
- Exact matches, e.g., `user_id = 123`.

---

### 3.3 Bitmap Index
- Uses bit arrays to represent values.  
- Very efficient for columns with **low cardinality** (few distinct values).  
- Example: Gender (M/F), Boolean flags.  

**Good for:**  
- Data warehouses, OLAP queries.

---

### 3.4 Full-Text Index
- Optimized for text search.  
- Breaks text into tokens and indexes them.  
- Supports ranking, relevance, partial matches.  
- Examples: MySQL `FULLTEXT`, PostgreSQL `GIN/GIST`, Elasticsearch.  

**Good for:**  
- Search bars, product catalogs, document search.

---

### 3.5 Spatial Index
- Specialized indexes for geometric data (maps, locations).  
- Example: R-tree.  
- Used in GIS systems, Uber’s geospatial queries.  

---

## 4. Primary vs Secondary Indexes

- **Primary Index**:  
  - Built on the table’s primary key.  
  - Data is stored in sorted order of the primary key.  

- **Secondary Index**:  
  - Built on non-primary key columns.  
  - Points back to the row (via primary key).  

**Example (Users Table):**  
- Primary Key: `user_id`  
- Secondary Index: `email`  

Query: `SELECT * FROM users WHERE email='x@example.com';`  
→ Uses secondary index to jump directly to the right row.

---

## 5. Trade-Offs of Indexing

Indexes **speed up reads**, but at a cost:

- **Slower writes**  
  Every `INSERT`, `UPDATE`, `DELETE` must also update indexes.  

- **Extra storage**  
  Indexes consume disk space (can be large for many columns).  

- **Maintenance overhead**  
  Fragmentation may require reindexing.  

👉 Rule of Thumb: **Index columns that are frequently queried, not everything.**

---

## 6. Common Pitfalls

1. **Too Many Indexes**  
   - Slows down writes.  
   - Use indexes strategically, not blindly.  

2. **Unused Indexes**  
   - Wastes disk + memory.  
   - Regularly monitor with tools like `pg_stat_user_indexes` in PostgreSQL.  

3. **Stale Indexes**  
   - Over time, deleted/updated rows can bloat indexes.  
   - Requires **reindexing** or **VACUUM** (Postgres).  

4. **Wrong Index Type**  
   - Hash index on range queries = bad performance.  
   - B-tree on text search = suboptimal.  

5. **Composite Index Misuse**  
   - If you create `(col1, col2)` index, queries must use `col1` for it to be effective.  

---

## 7. Interview Tip

When asked *“How do you optimize slow queries?”*:

1. **Check indexing first.**  
2. Mention trade-offs (faster reads vs slower writes).  
3. Differentiate index types.  
4. Bonus: Talk about **stale indexes** and **maintenance**.  

👉 Example Answer:  
*“I’d start by adding a B-Tree index on the column used in WHERE clause. If queries are equality-based on a small column (like status), a bitmap index might work better. I’d also check for unused or stale indexes, since too many indexes can slow down writes.”*

---

## 8. Recap

- Indexes = shortcuts to avoid full scans.  
- Types: B-Tree, Hash, Bitmap, Full-Text, Spatial.  
- Primary vs Secondary indexes.  
- Trade-offs: Faster reads, slower writes, extra storage.  
- Pitfalls: Too many, unused, stale, or wrong indexes.  

---

## Next Steps
👉 Continue with [Sharding vs Replication vs Partitioning](/interview-section/database/sharding-vs-replication-vs-partitioning.md) to learn scaling strategies beyond indexing.

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
