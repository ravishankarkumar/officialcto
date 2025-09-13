---
title: Database Indexing — Techniques, Patterns, and Best Practices
description: Learn how database indexing works, different indexing techniques, primary vs secondary indexes, stale index handling, and indexing vs reverse search databases.
---

# Database Indexing: A Complete Guide

Indexes are the backbone of database performance. They can speed up queries by orders of magnitude, but if used incorrectly, they can also slow down writes, bloat storage, or even mislead query planners.

In this article, we’ll explore indexing from the ground up — what it is, techniques used in modern databases, patterns and anti-patterns, stale index handling, and how indexing differs from full-text or reverse-search systems.

---

## What is an Index?

An **index** is a data structure that improves the speed of data retrieval operations on a database table at the cost of additional writes and storage.

Think of it as the index of a book: instead of scanning every page, you jump directly to the page number where the topic is listed.

Without indexes, a database often has to perform a **full table scan** — reading every row to find matching data.

---

## Why Indexes Matter: Disk I/O and Performance

Most databases store data on disk, and **disk I/O is much slower than in-memory operations**.

- Without an index, a query may need to **scan the entire table**, reading many disk pages into memory before finding the required rows.  
- With an index, the database can **navigate directly to the relevant disk page** using the index structure (like a B-Tree).  

This means:
- Queries become faster because fewer disk reads are required.  
- Frequently accessed index blocks often stay in memory (buffer cache), further reducing disk trips.  

👉 **Cost-Benefit:**
- A proper index reduces read latency dramatically.  
- But every `INSERT`, `UPDATE`, or `DELETE` must also update the index, which adds overhead.  
- More indexes = faster reads, slower writes, higher storage.  

This is why **index design is always a tradeoff** between query performance and write cost.

---

## Types of Indexing Techniques

### 1. B-Tree Index
- Most common indexing method.  
- Balanced tree structure; allows binary search.  
- Efficient for equality and range queries (`=`, `<`, `>`, `BETWEEN`).  
- Supported by: **MySQL (InnoDB), PostgreSQL, Oracle, SQL Server**.

### 2. Hash Index
- Uses a hash function on the indexed column.  
- O(1) lookups for equality (`=`).  
- Not good for range queries.  
- Examples: **MySQL MEMORY engine, PostgreSQL hash indexes**.

### 3. Bitmap Index
- Stores bitmaps for distinct values.  
- Excellent for low-cardinality columns (e.g., gender, status flags).  
- Heavy on storage but great for OLAP workloads.  
- Examples: **Oracle, PostgreSQL (via extensions)**.

### 4. Full-Text Index
- Specialized for text search.  
- Supports tokenization, stemming, ranking.  
- Example: `MATCH ... AGAINST` in MySQL, `GIN` indexes with `tsvector` in PostgreSQL.

### 5. Spatial Index
- Used for geographic data (coordinates, polygons).  
- Based on **R-Trees** or **QuadTrees**.  
- Examples: **PostGIS, MySQL spatial indexes, MongoDB 2dsphere**.

### 6. Covering Index
- Index that includes all columns needed for a query.  
- Prevents accessing the base table (Index-Only Scan).  
- Example: `(first_name, last_name, age)` index covering `SELECT first_name, last_name, age`.

### 7. Composite Index
- Index on multiple columns.  
- Useful when queries filter by multiple fields.  
- Order matters: `(a, b, c)` can optimize queries on `(a)` or `(a, b)` but not `(b, c)` alone.

---

## Primary vs Secondary Indexes

- **Primary Index:**  
  - Usually created on the **primary key** of a table.  
  - In clustered index systems (like **MySQL InnoDB**), the table’s data is physically stored with the primary index.  
  - Guarantees uniqueness and acts as the main way to locate rows.  

- **Secondary Index:**  
  - Any index created on non-primary key columns.  
  - Points to the primary index (or row ID) to fetch full row data.  
  - Speeds up queries but adds extra storage and maintenance cost.  

👉 Rule of thumb: **Every table should have a well-chosen primary index**. Add secondary indexes only for queries that truly benefit.

---

## Indexing in Different Databases

### MySQL (InnoDB)
- Default **B+Tree** indexes.  
- Supports **FULLTEXT** indexes for text.  
- Primary keys are clustered indexes (table data is stored with the index).  

### PostgreSQL
- Richest index support among relational databases.  
- Supports **B-Tree, Hash, GiST, SP-GiST, GIN, BRIN** indexes.  
- `GIN` indexes are commonly used for full-text search and JSONB.  
- `BRIN` indexes are space-efficient for very large tables with natural ordering.

### MongoDB
- Default **B-Tree indexes**.  
- Supports compound indexes, geospatial indexes, text indexes, and wildcard indexes.  
- TTL (Time-To-Live) indexes to automatically expire documents.  

### Elasticsearch / Solr (Reverse Search Databases)
- Instead of indexes in the RDBMS sense, these are built on **inverted indexes**.  
- Optimized for full-text search and ranking, not transactional workloads.  
- Designed for searching across billions of documents quickly.

---

## Indexing Patterns

✅ **Patterns that work well:**
- **Index frequently queried columns** (WHERE, JOIN, ORDER BY, GROUP BY).  
- **Use covering indexes** to avoid extra lookups.  
- **Composite indexes** for multi-column queries, with careful column ordering.  
- **Partial indexes** (PostgreSQL): only index rows that meet certain conditions.  
- **Unique indexes** to enforce constraints and speed up lookups.  

---

## Indexing Anti-Patterns

❌ **Things to avoid:**
- **Over-indexing:** Each index adds write overhead (INSERT/UPDATE/DELETE must update all indexes).  
- **Indexing every column:** Bloats storage and slows down writes.  
- **Redundant indexes:** `(a)` and `(a, b)` — the first is unnecessary if you always query `(a, b)`.  
- **Ignoring selectivity:** Indexes on low-cardinality columns (like `is_active`) rarely help unless combined with others.  
- **Unmaintained indexes:** Old indexes left behind after schema changes.

---

## Handling Stale Indexes

Indexes can become inefficient over time due to:
- **Data skew:** Values no longer distributed evenly.  
- **Bloat/fragmentation:** Frequent updates and deletes leave gaps.  

**How to handle stale indexes:**
- **PostgreSQL:** Use `ANALYZE` to refresh statistics; `VACUUM` or `REINDEX` to rebuild.  
- **MySQL:** Use `OPTIMIZE TABLE` or `ALTER TABLE ... DROP/ADD INDEX`.  
- **Monitoring:** Track unused indexes with query plans and slow query logs.  

---

## Indexing vs Reverse Search Databases

- **Indexes in RDBMS:** Optimized for transactional queries (point lookups, range scans).  
- **Reverse search / inverted indexes (Elasticsearch, Solr):** Optimized for **full-text search** and relevance ranking.  
- **Trade-off:** RDBMS indexes = strict consistency; Reverse-search indexes = eventual consistency but powerful querying.

---

## Related Topics

- **Clustered vs Non-Clustered Indexes:** In clustered indexes (MySQL InnoDB, SQL Server), table data is stored with the index. Non-clustered indexes are separate.  
- **Index-Only Scans:** Queries served entirely from index without touching base table.  
- **Adaptive Indexing:** Some modern systems (e.g., Oracle) automatically create/drop indexes based on workload.  
- **Hypothetical Indexes:** PostgreSQL allows creating "hypothetical" indexes for query planning without actually building them.  

---

## Key Takeaways

- Indexing is a **balancing act**: faster reads vs slower writes, more storage vs better performance.  
- A good index reduces **expensive disk I/O** and keeps frequently accessed data in memory.  
- Every table needs a **well-designed primary index**, with secondary indexes chosen carefully.  
- Always monitor **query patterns, index usage, and database statistics** to avoid performance pitfalls.  
- Choose indexes based on **workload, not guesswork** — measure before optimizing.  

---

In short: **Indexes are the steering wheel of your database — they guide queries toward efficiency, but misuse can send performance off the road.**
