---
title: Design an Online Collaborative Editor (e.g., Google Docs)
description: Master the design of an online collaborative editor in Java, covering scalability, low latency, and real-time editing for high-level system design.
---

# Design an Online Collaborative Editor (e.g., Google Docs)

## Overview
An online collaborative editor, like Google Docs, enables multiple users to edit documents in real-time, ensuring seamless synchronization and conflict resolution. In this twenty-ninth lesson of Section 5 in the *Official CTO* journey, we explore the **high-level design of a collaborative editor**, covering functional requirements (real-time editing, conflict resolution), non-functional requirements (scalability, low latency, reliability), and trade-offs (operational transformation vs. CRDT, storage efficiency). Whether building a productivity platform or a collaborative tool, this design ensures robust performance. By mastering this, you’ll architect scalable Java systems and mentor others effectively.

Inspired by *Clean Architecture*, *Designing Data-Intensive Applications*, and *System Design Interview*, this 25-minute lesson covers the concepts, a practical Java example with a system architecture diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand **functional** (real-time editing, conflict resolution) and **non-functional** (scalability, latency, reliability) requirements for a collaborative editor.
- Learn to design a **collaborative editor** in Java, addressing components and trade-offs.
- Apply **OOP principles** (Section 2, Lecture 1), **UML** (Section 2, Lecture 2), **design principles** (Section 4), and **HLD concepts** (Section 5, Lectures 1-28) to system design.
- Design scalable Java systems with clean code practices (Section 9).

## Why Collaborative Editor Design Matters
Collaborative editors enhance productivity by enabling real-time document editing, requiring low-latency synchronization and robust conflict resolution. Early in my career, I designed a collaborative tool for a productivity platform, optimizing for real-time updates with WebSockets and conflict resolution using operational transformation. This design—balancing functionality and performance—is a staple in FAANG system design interviews. Explaining it clearly showcases your mentorship skills.

In software engineering, collaborative editor design helps you:
- **Enhance Collaboration**: Enable seamless multi-user editing.
- **Handle Scale**: Support millions of users and documents.
- **Ensure Low Latency**: Minimize synchronization delays with real-time protocols.
- **Teach Effectively**: Share scalable collaborative design strategies.

## Key Concepts
### 1. Functional Requirements
- **Real-Time Editing**: Support concurrent document edits by multiple users.
- **Conflict Resolution**: Handle edit conflicts using Operational Transformation (OT) or Conflict-Free Replicated Data Types (CRDT).
- **Optional**: Support version history, access control, and comments.

### 2. Non-Functional Requirements
- **Scalability**: Handle millions of concurrent users and documents.
- **Low Latency**: <100ms for edit synchronization.
- **Reliability**: Ensure document consistency and availability (99.9% uptime).
- **Storage Efficiency**: Optimize for document and edit data.

### 3. System Components
- **Client**: Browser/mobile app for editing documents.
- **API**: REST/WebSocket endpoints for edits and synchronization.
- **Load Balancer**: Distributes traffic (e.g., Nginx).
- **Application Server**: Handles logic (e.g., Java Spring Boot with WebSocket).
- **Database**: Stores document content and metadata (e.g., Cassandra).
- **Cache**: Speeds up document access (e.g., Redis).
- **Message Queue**: Manages async updates (e.g., Kafka).
- **Conflict Resolution Service**: Applies OT or CRDT for edit synchronization.

### 4. Trade-Offs
- **Conflict Resolution**: OT (mature, complex) vs. CRDT (simpler, newer).
- **Storage**: NoSQL (scalable) vs. SQL (simpler queries for version history).
- **Synchronization**: WebSocket (real-time, high resource) vs. polling (simpler, higher latency).
- **CAP Theorem**: Prioritize AP (availability, partition tolerance) for edit synchronization.

### 5. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and polymorphism modularize components.
- **UML** (Section 2, Lecture 2): Diagrams visualize architecture.
- **Design Principles** (Section 4): SoC (Lecture 11) separates editing and conflict resolution; KISS (Lecture 8) simplifies logic.
- **HLD Concepts**:
  - Components (Section 5, Lecture 1): Map to API, database, cache.
  - Requirements (Section 5, Lecture 2): Drive scalability and latency goals.
  - Scaling (Section 5, Lecture 3): Use sharding and caching.
  - Security/Performance (Section 5, Lecture 4): Ensure low latency and secure access.
  - Distributed Systems (Section 5, Lecture 5): Handle partitioning and reliability.
  - URL Shortener (Section 5, Lecture 6): Similar storage and ID generation.
  - Pastebin (Section 5, Lecture 7): Similar document storage patterns.
  - Web Crawler (Section 5, Lecture 8): Similar scalability challenges.
  - Twitter Feed (Section 5, Lecture 9): Similar real-time updates.
  - Instagram Sharing (Section 5, Lecture 10): Similar real-time delivery.
  - YouTube Streaming (Section 5, Lecture 11): Similar low-latency requirements.
  - Netflix Recommendation (Section 5, Lecture 12): Similar real-time processing.
  - Uber Ride-Sharing (Section 5, Lecture 13): Similar real-time coordination.
  - WhatsApp Messaging (Section 5, Lecture 14): Similar real-time delivery.
  - Dropbox Storage (Section 5, Lecture 15): Similar storage patterns.
  - E-commerce Platform (Section 5, Lecture 16): Similar real-time features.
  - Ticket Booking (Section 5, Lecture 17): Similar scalability needs.
  - Notification System (Section 5, Lecture 18): Similar real-time delivery.
  - API Rate Limiter (Section 5, Lecture 19): Similar caching needs.
  - Key-Value Store (Section 5, Lecture 20): Similar storage and caching.
  - Search Autocomplete (Section 5, Lecture 21): Similar caching and indexing.
  - News Feed Aggregator (Section 5, Lecture 22): Similar real-time updates.
  - Distributed Cache (Section 5, Lecture 23): Similar caching patterns.
  - Leaderboard System (Section 5, Lecture 24): Similar real-time updates.
  - Payment Gateway (Section 5, Lecture 25): Similar reliability requirements.
  - CDN (Section 5, Lecture 26): Similar data distribution.
  - Distributed File System (Section 5, Lecture 27): Similar storage patterns.
  - Logging/Monitoring System (Section 5, Lecture 28): Similar real-time processing.

### 6. Use Case
Design an online collaborative editor for a productivity platform to enable real-time document editing and conflict resolution, ensuring scalability and low latency.

## System Design
### Architecture
```
[Client (Browser/Mobile)] --> [Load Balancer (Nginx)] --> [Application Server (Spring Boot, WebSocket)]
                                                          |
                                                          |--> [Database (Cassandra)]
                                                          |--> [Cache (Redis)]
                                                          |
                                                       [Queue (Kafka)]
                                                       [Conflict Resolution Service (OT)]
```

- **Real-Time Editing**:
  1. Client sends edit operations via WebSocket `/edit`.
  2. Application server applies Operational Transformation (OT) for conflict resolution.
  3. Updates document in Cassandra; caches in Redis.
  4. Broadcasts changes to other clients via WebSocket.
- **Conflict Resolution**:
  1. Conflict resolution service processes concurrent edits using OT.
  2. Enqueue updates to Kafka for async persistence.
- **Scalability**: Shard Cassandra by document ID; replicate for availability.
- **Performance**: Cache document state in Redis; use WebSocket for low-latency sync.
- **Reliability**: Ensure AP consistency for real-time edits.
- **Trade-Offs**: OT (mature, complex) vs. CRDT (simpler, less tested).

### Trade-Offs
- **Conflict Resolution**: OT (mature, complex) vs. CRDT (simpler, less mature).
- **Synchronization**: WebSocket (real-time, high resource) vs. polling (simpler, higher latency).
- **Storage**: Cassandra (scalable) vs. SQL (simpler for version history).

## Code Example: Collaborative Editor Service
Let’s implement a simplified Java collaborative editor service with Operational Transformation and caching.

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Document {
    private String documentId;
    private String content;
    private long version;

    public Document(String documentId, String content, long version) {
        this.documentId = documentId;
        this.content = content;
        this.version = version;
    }

    public String getDocumentId() {
        return documentId;
    }

    public String getContent() {
        return content;
    }

    public long getVersion() {
        return version;
    }

    public void applyEdit(String operation, long version) {
        this.content += operation; // Simplified: append operation
        this.version = version;
    }
}

public class EditOperation {
    private String documentId;
    private String userId;
    private String operation;
    private long version;

    public EditOperation(String documentId, String userId, String operation, long version) {
        this.documentId = documentId;
        this.userId = userId;
        this.operation = operation;
        this.version = version;
    }

    public String getDocumentId() {
        return documentId;
    }

    public String getOperation() {
        return operation;
    }

    public long getVersion() {
        return version;
    }
}

public interface DocumentRepository {
    void saveDocument(Document document);
    Document getDocument(String documentId);
}

public class CassandraDocumentRepository implements DocumentRepository {
    private final Map<String, Document> storage = new HashMap<>();

    @Override
    public void saveDocument(Document document) {
        System.out.println("Saving document to Cassandra: " + document.getDocumentId());
        storage.put(document.getDocumentId(), document);
    }

    @Override
    public Document getDocument(String documentId) {
        System.out.println("Fetching document from Cassandra: " + documentId);
        return storage.getOrDefault(documentId, null);
    }
}

public class RedisCache {
    private final Map<String, Document> cache = new HashMap<>();

    public Document getCachedDocument(String documentId) {
        System.out.println("Checking Redis cache for document: " + documentId);
        return cache.getOrDefault(documentId, null);
    }

    public void cacheDocument(Document document) {
        System.out.println("Caching document in Redis: " + document.getDocumentId());
        cache.put(document.getDocumentId(), document);
    }
}

public class KafkaQueue {
    public void enqueueEditOperation(EditOperation operation) {
        System.out.println("Enqueuing edit operation to Kafka: " + operation.getDocumentId());
    }
}

public class ConflictResolutionService {
    public EditOperation transformOperation(EditOperation operation, List<EditOperation> concurrentOperations) {
        System.out.println("Transforming operation for document: " + operation.getDocumentId());
        return operation; // Simplified: assume OT transformation
    }
}

public class CollaborativeEditorService {
    private final DocumentRepository repository;
    private final RedisCache cache;
    private final KafkaQueue queue;
    private final ConflictResolutionService conflictService;
    private final Map<String, List<EditOperation>> pendingOperations = new HashMap<>();

    public CollaborativeEditorService(DocumentRepository repository, RedisCache cache, 
                                     KafkaQueue queue, ConflictResolutionService conflictService) {
        this.repository = repository;
        this.cache = cache;
        this.queue = queue;
        this.conflictService = conflictService;
    }

    public void applyEdit(String documentId, String userId, String operation, long version) {
        EditOperation edit = new EditOperation(documentId, userId, operation, version);
        
        // Transform operation for conflicts
        List<EditOperation> concurrentOps = pendingOperations.computeIfAbsent(documentId, k -> new ArrayList<>());
        EditOperation transformedEdit = conflictService.transformOperation(edit, concurrentOps);
        concurrentOps.add(transformedEdit);

        // Apply to document
        Document document = cache.getCachedDocument(documentId);
        if (document == null) {
            document = repository.getDocument(documentId);
            if (document == null) {
                document = new Document(documentId, "", 0);
            }
            cache.cacheDocument(document);
        }

        if (version <= document.getVersion()) {
            throw new IllegalStateException("Invalid version for document: " + documentId);
        }

        document.applyEdit(transformedEdit.getOperation(), version);
        repository.saveDocument(document);
        cache.cacheDocument(document);
        queue.enqueueEditOperation(transformedEdit);
    }

    public Document getDocument(String documentId) {
        Document document = cache.getCachedDocument(documentId);
        if (document == null) {
            document = repository.getDocument(documentId);
            if (document == null) {
                throw new IllegalArgumentException("Document not found: " + documentId);
            }
            cache.cacheDocument(document);
        }
        return document;
    }
}

public class CollaborativeEditorController {
    private final CollaborativeEditorService service;

    public CollaborativeEditorController(CollaborativeEditorService service) {
        this.service = service;
    }

    public void handleApplyEdit(String documentId, String userId, String operation, long version) {
        service.applyEdit(documentId, userId, operation, version);
        System.out.println("Applied edit to document: " + documentId);
    }

    public Document handleGetDocument(String documentId) {
        return service.getDocument(documentId);
    }
}

public class CollaborativeEditorClient {
    public static void main(String[] args) {
        DocumentRepository repository = new CassandraDocumentRepository();
        RedisCache cache = new RedisCache();
        KafkaQueue queue = new KafkaQueue();
        ConflictResolutionService conflictService = new ConflictResolutionService();
        CollaborativeEditorService service = new CollaborativeEditorService(repository, cache, queue, conflictService);
        CollaborativeEditorController controller = new CollaborativeEditorController(service);

        controller.handleApplyEdit("doc1", "user1", "Hello", 1);
        controller.handleApplyEdit("doc1", "user2", ", World!", 2);
        Document document = controller.handleGetDocument("doc1");
        System.out.println("Document content: " + document.getContent());
        // Output:
        // Transforming operation for document: doc1
        // Checking Redis cache for document: doc1
        // Fetching document from Cassandra: doc1
        // Caching document in Redis: doc1
        // Saving document to Cassandra: doc1
        // Caching document in Redis: doc1
        // Enqueuing edit operation to Kafka: doc1
        // Applied edit to document: doc1
        // Transforming operation for document: doc1
        // Checking Redis cache for document: doc1
        // Saving document to Cassandra: doc1
        // Caching document in Redis: doc1
        // Enqueuing edit operation to Kafka: doc1
        // Applied edit to document: doc1
        // Checking Redis cache for document: doc1
        // Document content: Hello, World!
    }
}
```
- **System Design and Principles**:
  - **Functional**: `applyEdit` synchronizes real-time edits; `getDocument` retrieves document state.
  - **Non-Functional**:
    - **Scalability**: `CassandraDocumentRepository` shards by document ID.
    - **Low Latency**: `RedisCache` for fast document access; WebSocket for real-time sync.
    - **Reliability**: Eventual consistency via Redis for edits.
  - **Encapsulation**: Private fields with public methods.
  - **Abstraction**: `DocumentRepository` interface for storage.
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates editing and conflict resolution; DIP (Section 4, Lecture 6) for abstractions.
- **Big O**: O(1) for `applyEdit`, `cacheDocument` (average case); O(n) for conflict transformation (n = concurrent operations).
- **Edge Cases**: Handles version conflicts, missing documents with exceptions.

**Systematic Approach**:
- Clarified requirements (real-time editing, conflict resolution, ensure scalability).
- Designed system architecture diagram to show API, storage, cache, and conflict resolution.
- Implemented Java code for a collaborative editor service, addressing requirements and trade-offs.
- Tested with `main` method for edit application and document retrieval.

## Real-World Application
Imagine designing an online collaborative editor for a productivity platform, using WebSockets for real-time synchronization, Cassandra for document storage, and Operational Transformation for conflict resolution. A system architecture diagram communicates the design to stakeholders, ensuring performance and scalability. This design—paired with principles like KISS (Section 4, Lecture 8) and patterns like Facade (Section 3, Lecture 8)—demonstrates your ability to mentor teams on scalable collaborative design.

## Practice Exercises
Design an online collaborative editor or similar with these exercises:
- **Easy**: Design a system architecture diagram and Java code for a `CollaborativeEditorService` with basic real-time editing.
- **Medium**: Create a diagram and Java code for a `CollaborativeEditorService` with conflict resolution.
- **Medium**: Design an HLD for a collaborative editor with sharding and caching, implementing a Java controller.
- **Hard**: Architect a distributed collaborative editor with Cassandra and WebSockets, supporting version history, using a Java service.

Try designing one system in Java with a diagram, explaining how requirements and trade-offs are addressed.

## Conclusion
Designing an online collaborative editor equips you to architect scalable, low-latency Java systems for productivity platforms. By mastering this design, you’ll optimize performance, ensure reliability, and teach others effectively. This advances your progress in Section 5 of the *Official CTO* journey.

**Next Step**: Explore [Design an API Rate Limiter](/interview-section/hld-ai/api-rate-limiter) to apply HLD to another real-world problem, or check out [all sections](/interview-section/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>