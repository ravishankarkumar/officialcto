---
title: Backend JavaScript Interview Questions (Node.js Focus)
description: Comprehensive list of backend JavaScript/Node.js interview questions with explanations, categorized by difficulty and topic.
sidebar: true
date: 2025-11-24
---

# Backend JavaScript Interview Questions (Node.js)

This article covers **backend-focused JavaScript and Node.js interview questions**, from fundamentals to advanced system design. Each section includes conceptual questions, scenario-based questions, and practical coding prompts.

---

## 1. Core JavaScript (Backend-Relevant)
Even backend interviews expect strong JS fundamentals.

### Key Topics
- Closures
- Scopes & hoisting
- `this` binding
- Prototypes & classes
- Async patterns: callbacks, promises, async/await
- Event loop (browser vs Node differences)

### Sample Questions
1. Explain how closures work. Why are they useful in backend code?
2. What is the difference between microtasks and macrotasks in Node.js?
3. Why does `async/await` still use promises under the hood?
4. What is the difference between `process.nextTick()` and `queueMicrotask()`?
5. Does Node use the browser event loop? What’s the difference?

---

## 2. Event Loop & Asynchronous Behavior
Backend roles require deeper knowledge of Node's internals.

### Sample Questions
1. Walk me through the 6 phases of the Node.js event loop.
2. What is libuv? What problems does it solve?
3. What happens when you call `setTimeout(fn, 0)`?
4. When does Node execute microtasks?
5. Compare `setImmediate` vs `setTimeout`.
6. How do promises integrate with the event loop in Node.js?

### Scenario
A heavy CPU task blocks your server. How do you fix this?
- Worker threads
- Offloading to another service
- Breaking work into chunks (`setImmediate`)

---

## 3. Node APIs & Runtime Behavior
### Sample Questions
1. How do streams work internally?
2. What is backpressure? How does Node handle it?
3. Explain different kinds of streams: readable, writable, duplex, transform.
4. What is the difference between `fs.readFile` and `fs.createReadStream`?
5. When would you use `Buffer.allocUnsafe()`?
6. What is the role of the threadpool in Node?

---

## 4. Architecture & Scaling
### Sample Questions
1. Why is Node.js good for I/O-bound tasks but not CPU-heavy tasks?
2. What are worker threads? When should you use them?
3. What is clustering in Node.js? What does it NOT solve?
4. How do you scale a Node application horizontally?
5. What is PM2 and why is it used in production?
6. How would you design a rate limiter in Node?

---

## 5. Networking & HTTP
### Sample Questions
1. Explain the lifecycle of an HTTP request in Node.
2. What is `Keep-Alive`? How does it impact performance?
3. How do you handle slowloris attacks in Node.js?
4. What is chunked transfer encoding?
5. Explain the difference between HTTP/1.1, HTTP/2, and HTTP/3.
6. What is a reverse proxy? Why do we use Nginx with Node?

---

## 6. Databases & Persistence
### Sample Questions
1. How do you optimize database connections in Node?
2. What are connection pools and why do we need them?
3. How does Node handle long-running queries?
4. Why should database calls NOT block the event loop?

---

## 7. Security
### Sample Questions
1. What is SQL injection and how do you prevent it in Node?
2. What is CSRF? Is it relevant on backend-only APIs?
3. What is CORS and how does Node handle it?
4. How do you securely manage secrets in Node.js?
5. What is prototype pollution? How do you mitigate it?

---

## 8. Error Handling & Reliability
### Sample Questions
1. Why is `throw` inside an async function dangerous?
2. How do you handle uncaught exceptions?
3. How do you ensure graceful shutdown of a Node server?
4. What happens if a promise rejection is unhandled?
5. How do you build retry logic for failed I/O operations?

---

## 9. Performance, Monitoring & Debugging
### Sample Questions
1. How do you detect memory leaks in Node?
2. What tools are available for performance profiling?
3. What is a flamegraph?
4. How does garbage collection work in V8?
5. How do you implement caching in Node.js?

---

## 10. System Design (Backend JS)
### Sample Questions
1. Design a real-time chat server using Node.
2. Design a high-throughput file upload pipeline.
3. Build a distributed job queue.
4. How would you design a scalable notification system?
5. Build a streaming-based log processing system.

---

## 11. Coding Problems (Backend-Oriented)
- Implement a streaming CSV parser.
- Implement a rate limiter (token bucket / sliding window).
- Build a basic in-memory message queue.
- Implement a function to retry a promise with exponential backoff.
- Write a Node server that can handle 100k concurrent connections.

---

## 12. Bonus: Practical Take-home Assignments
- Build a file upload service with streaming + chunking + retry.
- Build a local cache with TTL and LRU.
- Implement a pub/sub event system.
- Build a Node CLI tool.

---

<footer>
  <p>Maintained by OfficialCTO — &copy; 2025 Official CTO.</p>
</footer>