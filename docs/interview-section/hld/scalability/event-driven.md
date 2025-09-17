---
title: Event-driven Architectures
description: Understanding event-driven architectures, message queues, pub/sub, retries, and backpressure in scalable distributed systems.
---

# Event-driven Architectures

Not all work in a system needs to be **synchronous**.  
Event-driven architectures allow systems to process tasks **asynchronously**, improving scalability, resilience, and responsiveness.

---

## 1. What is Event-driven Architecture?

- System components communicate by **emitting and consuming events**.  
- An **event** = “something happened” (e.g., *user signed up*, *payment processed*).  
- Producers publish events → Consumers process them asynchronously.  

### Core Components
- **Producers**: emit events (e.g., user service).  
- **Message Broker/Queue**: transports events (Kafka, RabbitMQ, SQS, Pub/Sub).  
- **Consumers**: listen and react to events (e.g., email service sends welcome email).  

---

## 2. Messaging Models

### 2.1 Message Queues (Point-to-Point)
- Each message consumed by **one consumer**.  
- Ensures work distribution.  
- Examples: RabbitMQ, AWS SQS.  

### 2.2 Publish/Subscribe (Pub/Sub)
- Each message delivered to **all subscribers**.  
- Good for fan-out events (e.g., *user uploaded photo* → notify feed service, analytics service).  
- Examples: Kafka, Google Pub/Sub.  

---

## 3. Benefits of Event-driven Systems

- **Decoupling**: producers don’t need to know consumers.  
- **Scalability**: consumers can scale independently.  
- **Resilience**: queues buffer load spikes.  
- **Flexibility**: multiple consumers can reuse same events.  

---

## 4. Challenges & Pitfalls

- **At-least-once delivery** → duplicate events possible.  
- **Ordering issues** in distributed brokers.  
- **Debugging harder** → async flow is complex.  
- **Data consistency** → eventual consistency model.  

---

## 5. Reliability Patterns

### 5.1 Retries & Dead-letter Queues
- Failed messages retried automatically.  
- Dead-letter queues store poison messages for manual handling.  

### 5.2 Idempotency
- Consumers should be **idempotent** (processing same event twice = no side effect).  

### 5.3 Backpressure
- If consumers can’t keep up, brokers apply **rate limiting** or drop messages.  

---

## 6. Real-World Use Cases

- **E-commerce** → order placed event triggers inventory, payment, email.  
- **Social media** → user post event triggers feed, notifications, analytics.  
- **IoT systems** → millions of sensors stream events to central processing.  
- **Streaming** → Kafka for log aggregation, metrics pipelines.  

---

## 7. Event-driven in Interviews

- Always suggest async queues for **non-critical tasks** (emails, analytics).  
- Mention **backpressure + retries** to show awareness of failure modes.  
- Call out **eventual consistency**: some tasks don’t update instantly.  
- Example: *“When a user signs up, I’d process email sending via an event queue, not in the critical path.”*  

---

## 8. Diagram (Conceptual)

```
   [Producer Service] → [Message Broker/Queue] → [Consumer Service]
                               |
                               → [Another Consumer]
```

---

## 9. Next Steps

- Learn about [CAP Theorem & PACELC](/interview-section/hld/distributed/cap-pacelc.md).  
- Explore [Circuit breakers](/interview-section/hld/reliability/circuit-breakers.md).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
