---
title: Common JavaScript Interview Questions (Frontend + Backend)
description: A unified set of JavaScript interview questions applicable to both frontend and backend roles — covering language fundamentals, event loop, async patterns, memory, security, and best practices.
sidebar: true
date: 2025-11-24
---

# Common JavaScript Interview Questions (Frontend + Backend)

This article covers **core JavaScript concepts** that every engineer must know — whether interviewing for frontend, backend (Node.js), or full-stack roles. These questions focus on the language itself, runtime behavior, memory, async patterns, and cross-environment principles.

---

## 1. JavaScript Fundamentals
These are universal to all JS environments.

### Key Topics
- Scopes & closures
- Hoisting
- `this` binding rules
- Prototypal inheritance
- Modules: CommonJS vs ESM
- Pure vs impure functions
- Immutability vs mutability

### Sample Questions
1. What are closures? Provide real-world use cases.
2. What is hoisting and how does it work for variables vs functions?
3. Explain all 4 rules of `this` binding.
4. What is prototypal inheritance? How does it differ from class inheritance?
5. What is the difference between `==` and `===`?
6. What is the difference between `undefined` and `null`?

---

## 2. The Event Loop (Browser + Node)
This is the single most important shared topic.

### Topics to Know
- Call stack, heap
- Web APIs vs Node APIs
- Macrotasks vs microtasks
- Rendering steps (browser)
- libuv phases (Node)
- `setTimeout` vs `setImmediate` vs `process.nextTick`

### Sample Questions
1. Explain the difference between microtasks and macrotasks.
2. Predict the output of code involving Promises, `setTimeout`, and async/await.
3. What is the difference between the browser event loop and Node's event loop?
4. Why does long synchronous code block both frontend and backend environments?

---

## 3. Async Patterns (Universal)
Async JS is at the heart of frontend & backend behavior.

### Sample Questions
1. Compare callbacks vs promises vs async/await.
2. Why is error handling with async/await tricky?
3. What is a race condition in JavaScript?
4. Explain `Promise.all` vs `Promise.race` vs `Promise.allSettled`.
5. What is event delegation and why is it useful in async-heavy UIs?
6. How do you cancel an asynchronous operation?

---

## 4. Memory, Performance & Garbage Collection
Memory fundamentals matter in both browser and backend.

### Key Topics
- Memory allocation
- Garbage collection (mark and sweep)
- Leaks via closures, global objects, DOM references
- High CPU load impact on the event loop

### Sample Questions
1. How does garbage collection work in V8?
2. What causes memory leaks in JS?
3. How will a memory leak affect your frontend performance? How about a Node server?
4. Explain tail call optimization. Does JavaScript support it?

---

## 5. Security (Shared Concepts)
### Topics
- Prototype pollution
- XSS (relevant to both FE & BE template rendering)
- CSRF (relevant to full-stack or API design)
- Safe handling of `JSON.parse`
- Avoiding insecure eval or dynamic code execution

### Sample Questions
1. What is prototype pollution and how do you prevent it?
2. Why is `innerHTML` dangerous even on backend-rendered templates?
3. What is CORS and how does it work at a high level?
4. What is CSRF? When is it applicable?

---

## 6. Functional Programming Concepts
These concepts apply everywhere modern JS is written.

### Sample Questions
1. What is a pure function?
2. What is referential transparency?
3. What is currying? Provide an example.
4. What are higher-order functions?
5. How does immutability help avoid bugs?

---

## 7. Error Handling
### Sample Questions
1. Difference between `throw` and returning an error.
2. What happens when a promise rejection is unhandled?
3. Why is it dangerous to throw inside async functions?
4. How do you perform global error handling in JavaScript?

---

## 8. Modules, Bundling & Build Systems
Relevant to both environments.

### Sample Questions
1. Difference between ESM and CommonJS.
2. Explain tree shaking. What does it require?
3. What is a polyfill? When do you need one?
4. What are source maps?

---

## 9. JSON, Data Structures & Serialization
### Sample Questions
1. Why is JSON not allowed to contain functions?
2. How do you deep clone an object (without libraries)?
3. What are the limitations of `JSON.stringify`?
4. Explain structured cloning.

---

## 10. Coding Problems (Common)
- Implement `debounce` and `throttle`.
- Flatten a deeply nested JavaScript array.
- Implement a simple event emitter.
- Implement `Promise.all`.
- Build a retry wrapper for async functions.
- Write a memoization function.

---

## 11. Take-Home Assignments
These assignments test universal JS skills.

- Build a small in-memory cache system.
- Implement a simple pub/sub system.
- Build a JSON-based config loader with validation.
- Implement an async queue with concurrency limits.

---

<footer>
  <p>Maintained by OfficialCTO — &copy; 2025 Official CTO.</p>
</footer>