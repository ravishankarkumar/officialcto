---
title: JavaScript Event Loop Explained (2025 Edition)
description: A complete, modern, interview-ready explanation of the JavaScript event loop, including microtasks, macrotasks, promises, async/await, browser vs Node.js differences, and diagrams.
---

# JavaScript Event Loop: The Ultimate Guide (2025 Edition)
A clear, modern explanation of the event loop, microtasks, macrotasks, timers, promises, and how Node.js and browsers differ.

---

## 1. Why the Event Loop Exists
JavaScript runs in a **single thread** — meaning it can execute only **one piece of code at a time**.

But real applications need to:
- Fetch data from APIs
- Handle user events
- Read files
- Run timers
- Animate the UI

Executing these synchronously would block the entire app.

➡️ **The event loop allows JavaScript to be non-blocking and asynchronous despite being single-threaded.**

---

## 2. Big Picture Architecture
A JavaScript runtime (Browser or Node.js) includes:

1. **Call Stack**
2. **Heap (Memory)**
3. **Web APIs / Node APIs**
4. **Macrotask Queue (Task Queue)**
5. **Microtask Queue**
6. **Event Loop**

High-level flow:

```
JS Code → Call Stack → (async APIs) → Microtasks / Macrotasks
                               ↑
                           Event Loop
```

The Event Loop checks:
> **“Is the call stack empty?”**  
If yes → pushes the next task.

---

## 3. Synchronous vs Asynchronous Execution
### Synchronous
Runs immediately on the call stack:

```js
console.log("A");
console.log("B");
```

Output:
```
A
B
```

### Asynchronous
offloaded to the environment:

```js
setTimeout(() => console.log("C"), 0);
console.log("D");
```

Output:
```
D
C
```

---

## 4. Macrotasks vs Microtasks
JavaScript has **two task queues**.

### 4.1 Macrotasks
Examples:
- `setTimeout`
- `setInterval`
- DOM events
- I/O callbacks
- setImmediate (Node.js)
- MessageChannel

### 4.2 Microtasks
Examples:
- `Promise.then()`
- `async/await`
- `queueMicrotask()`
- MutationObserver

### Execution Order
1. Execute **one macrotask**
2. Execute **all microtasks**
3. Re-render (browser)
4. Repeat

---

## 5. The Golden Rule
### **Promise callbacks run *before* setTimeout callbacks.**

Example:
```js
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");
```

Output:
```
A
D
C
B
```

Because:
- Microtasks (Promise) run **before** macrotasks (setTimeout)

---

## 6. queueMicrotask()
`queueMicrotask()` forces a function into the microtask queue.

```js
queueMicrotask(() => console.log("M"));
setTimeout(() => console.log("T"), 0);
console.log("S");
```

Output:
```
S
M
T
```

Used heavily in custom Promise implementations.

---

## 7. Browser vs Node.js Event Loop
### Browser Event Loop
- After each macrotask → run all microtasks → re-render UI

### Node.js Event Loop (libuv)
Node runs tasks in **6 phases**:

1. **Timers** → setTimeout, setInterval
2. **Pending Callbacks**
3. **Idle/Prepare**
4. **Poll** → I/O events
5. **Check** → setImmediate
6. **Close Callbacks**

Microtasks run:
- After each callback
- Between phases

### Ordering Example (Node.js)
```js
setTimeout(() => console.log("timeout"));
setImmediate(() => console.log("immediate"));
```

May output either:
```
immediate
timeout
```
or the opposite.

Inside I/O:
```js
fs.readFile("file.txt", () => {
  setTimeout(() => console.log("timeout"));
  setImmediate(() => console.log("immediate"));
});
```

Always outputs:
```
immediate
timeout
```

---

## 8. Visual Diagram
```
 ┌───────────────────────────┐
 │       Call Stack          │
 └─────────────┬─────────────┘
               │
               ↓
 ┌───────────────────────────┐
 │      Web/Node APIs        │
 └─────────────┬─────────────┘
               │
       ┌───────┴────────┐
       ↓                ↓
┌────────────┐   ┌──────────────┐
│ Microtasks │   │  Macrotasks  │
└────────────┘   └──────────────┘
       ↑                │
       └───────┬────────┘
               ↓
        ┌──────────────┐
        │  Event Loop   │
        └──────────────┘
```

---

## 9. async/await and the Event Loop
`async/await` uses Promises under the hood.

```js
async function run() {
  console.log("1");
  await null;
  console.log("2");
}
run();
console.log("3");
```

Output:
```
1
3
time micro tasks -> 2
```

Because `await` schedules a microtask.

---

## 10. Why UI Freezes (Browser)
```js
while (true) {}   // Infinite loop
```

The event loop never becomes free to process:
- Clicks
- Scroll events
- Rendering

Thus the browser “hangs”.

---

## 11. Event Loop Interview Tips
- Mention **single-threaded JS**
- Explain **microtasks vs macrotasks**
- Promise → microtask
- setTimeout → macrotask
- Node.js has **6 phases**
- Browser renders after microtasks

Common interview trick:
> **Why does Promise resolve run before setTimeout?**

Answer:
> Because microtasks always run before the next macrotask.

---

## 12. Final Summary
| Concept | Meaning |
|--------|---------|
| **Event Loop** | Controls async execution |
| **Microtasks** | Higher priority (Promises) |
| **Macrotasks** | Lower priority (Timers, I/O) |
| **Browser Loop** | Microtasks → render → next task |
| **Node Loop** | 6-phase libuv loop |

---
<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>

