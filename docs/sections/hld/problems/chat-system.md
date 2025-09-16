---
title: Chat System (WhatsApp / Slack)
description: Design a chat system like WhatsApp or Slack — requirements, architecture, storage, delivery guarantees, and trade-offs.
---

# Chat System (WhatsApp / Slack)

Design a chat system that supports **1:1 messaging, group chats, message delivery guarantees, and presence**.  
This is a classic HLD problem because it touches real-time communication, consistency, and scaling.

---

## 1. Requirements

### Functional
- Send/receive 1:1 and group messages.  
- Show message delivery status (sent, delivered, read).  
- Support media (images, files, videos).  
- Show user presence (online/offline, typing).  
- Push notifications for new messages.  

### Non-functional (NFRs)
- Low latency delivery (<100ms).  
- High availability (works even under partial failures).  
- Durable storage (no message loss).  
- Scale to millions of concurrent users.  

---

## 2. Workload Estimation (Example)

Assume:
- 100M DAU, each sends 50 messages/day → 5B messages/day.  
- Messages/sec = 5,000,000,000 / 86,400 ≈ 57,870 MPS avg.  
- Peak (×5–10) → design for **~500k MPS** at peak.  

Storage:
- Each message ≈ 300 bytes (text + metadata).  
- Daily = 1.5 TB, yearly ≈ 550 TB (before replication).  
- With 3× replication → 1.65 PB/year.  

---

## 3. High-Level Architecture

Components:
1. **API Gateway / Load Balancer** → entry point.  
2. **Chat Service** → handles send/receive logic.  
3. **Message Queue / Pub-Sub** → decouple sender/receiver (Kafka, RabbitMQ).  
4. **Storage Layer** → message persistence (Cassandra, DynamoDB, HBase).  
5. **Presence Service** → track online/offline/typing status.  
6. **Push Notification Service** → mobile push (APNS, FCM).  
7. **Media Service** → upload media → stored in object store (S3, GCS) + CDN.  

---

## 4. Message Flow

### 1:1 Chat
1. Sender sends message → API Gateway → Chat Service.  
2. Chat Service writes message to DB + message queue.  
3. Receiver’s device subscribed to queue → receives message in real time.  
4. Delivery/read receipts updated asynchronously.

### Group Chat
- Fan-out to group members via message queue.  
- For large groups, use batch fan-out and optimize storage with shared pointers.  

---

## 5. Delivery Guarantees

- **At least once delivery** → retries on failure.  
- **Idempotency keys** to prevent duplicates.  
- **Acknowledgments** from receiver for delivery status.  
- Store-undelivered messages in persistent queue until acked.  

---

## 6. Data Storage

- **Messages** → stored in partitioned wide-column DB (Cassandra).  
  - Partition key = (chat_id, message_id).  
  - Optimized for write-heavy workloads.  
- **Indexes** → user-based indexes for search/history.  
- **Media** → stored in object store (S3, GCS) with CDN for delivery.  
- **Metadata** → delivery status, read receipts stored separately.  

---

## 7. Presence & State

- Maintain ephemeral presence in in-memory store (Redis).  
- Clients send periodic heartbeats to update presence.  
- Typing indicators → short-lived events (not persisted).  

---

## 8. Reliability & Scaling

- **Sharding** by chat_id or user_id for DB partitioning.  
- **Replication** for durability and HA.  
- **Async processing** for media and notifications.  
- **Backpressure** to avoid overloading queues.  

---

## 9. Security

- **End-to-End Encryption (E2EE)** for 1:1 chats (like WhatsApp Signal protocol).  
- **Transport encryption (TLS)** for all client-server communication.  
- **Access control** for group membership and media URLs.  

---

## 10. Monitoring & Metrics

- MPS (messages/sec), delivery latency percentiles.  
- Queue lag and DB write latency.  
- Online user count and presence updates.  
- Push notification delivery success.  

---

## 11. Trade-offs

- **E2EE vs server features**: encrypted messages can’t be ranked/searched server-side.  
- **Push vs pull**: push gives real-time, but requires long-lived connections.  
- **Durability vs latency**: syncing all replicas adds latency; async replication reduces it but risks data loss in rare cases.  

---

## 12. Extensions

- Message search and indexing.  
- Ephemeral messages (disappear after time).  
- Reactions, threading, voice/video calls.  
- Multi-device sync (harder with E2EE).  

---

## 13. Interview Tips

- Start with message flow (send → store → deliver).  
- Mention durability (DB + queue) and latency.  
- Talk about group vs 1:1 separately.  
- Call out presence and push notifications.  
- Discuss scaling storage + fan-out with sharding.  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
