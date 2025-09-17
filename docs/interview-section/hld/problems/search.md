---
title: Search System (Google / Elasticsearch)
description: Design a search system covering indexing, query processing, ranking, caching, scalability, and trade-offs.
---

# Search System (Google / Elasticsearch)

Search is one of the most **fundamental system design problems**. The challenge is to design a system that can **index massive amounts of data** and return relevant results in milliseconds.

---

## 1. Requirements

### Functional
- Ingest and index documents (web pages, posts, products).  
- Support keyword search (full-text).  
- Support filters (date, category, author).  
- Return ranked results based on relevance.  

### Non-functional
- Low query latency (<200ms P95).  
- High availability and scalability.  
- Handle billions of documents.  
- Support real-time indexing (near-real-time search).  

Optional: autocomplete, spell correction, personalization.

---

## 2. High-Level Architecture

1. **Crawler / Ingestion Pipeline**  
   - Collect documents from the web (Google) or internal DBs (Elasticsearch).  
   - Normalize/clean data, extract text and metadata.  

2. **Indexing Service**  
   - Build an **inverted index** mapping words → document IDs.  
   - Store term frequency, positions, metadata.  
   - Support incremental updates for new/changed documents.  

3. **Query Service**  
   - Parse user query → tokenize, normalize, remove stopwords.  
   - Match query terms to inverted index.  
   - Fetch candidate documents and rank them.  

4. **Ranking Service**  
   - Use scoring models (e.g., TF-IDF, BM25, ML-based ranking).  
   - Rank by relevance, recency, and other features.  

5. **Storage**  
   - Inverted index (e.g., Lucene, Elastic).  
   - Document store for metadata.  
   - Distributed file/object storage for raw data.  

6. **Cache Layer**  
   - Query cache for popular queries.  
   - Shard-level caching of partial results.  

---

## 3. Indexing Details

- **Inverted Index**: word → list of (docID, positions, frequency).  
- **Compression**: reduce memory footprint (delta encoding, bitmaps).  
- **Sharding**: partition documents by hash/range into multiple shards.  
- **Replication**: multiple replicas for fault tolerance and higher query throughput.  
- **Near-Real-Time (NRT)**: batch index updates and refresh frequently.  

---

## 4. Query Processing Flow

1. User submits query → Load balancer → Query service.  
2. Query parsed, tokens extracted.  
3. Inverted index lookup → get candidate docIDs.  
4. Rank candidates (BM25/ML).  
5. Merge results from multiple shards.  
6. Apply filters, sort, paginate.  
7. Return final ranked results.  

---

## 5. Ranking Approaches

- **Classical**: TF-IDF, BM25.  
- **Learning-to-rank (LTR)**: ML models trained with features (CTR, recency, user signals).  
- **Neural search**: embeddings + vector search (e.g., dense retrieval with FAISS).  
- **Hybrid**: keyword matching + vector similarity.  

---

## 6. Scaling Challenges

- **Large index size**: use compression + tiered storage.  
- **High QPS**: use query caching, replicas.  
- **Skewed queries**: hot queries handled with cache or precomputed results.  
- **Realtime indexing**: trade-off between indexing throughput and query freshness.  
- **Shard rebalancing**: moving shards during scale-out.  

---

## 7. Trade-offs

- **Index freshness vs query latency**: faster updates → more CPU usage.  
- **Ranking quality vs performance**: deep ML ranking costs more.  
- **Consistency vs availability**: AP design usually chosen (eventual consistency okay).  
- **Shard size vs number of shards**: large shards = fewer, but harder to rebalance.  

---

## 8. Monitoring & Metrics

- Query latency distribution (P50/P95/P99).  
- Index size, growth rate, replication lag.  
- Cache hit ratio.  
- Error rates (timeouts, failed queries).  

---

## 9. Security & Abuse Prevention

- Rate limiting to prevent scraping or abuse.  
- Access control for restricted datasets.  
- Query sanitization (prevent injection).  

---

## 10. Extensions

- Autocomplete and query suggestions.  
- Personalization based on user history.  
- Multilingual indexing & search.  
- Federated search across multiple datasets.  

---

## 11. Interview Tips

- Start with **inverted index** as the core.  
- Do capacity math (docs, index size).  
- Mention sharding + replication.  
- Show awareness of caching and ranking trade-offs.  
- If asked about modern search → mention **vector embeddings**.  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
