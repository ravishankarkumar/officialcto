---
title: Concurrency Control (Locks, Deadlocks, Semaphores)
description: Understanding concurrency control in operating systems, covering locks, deadlocks, and semaphores with examples and interview tips.
---

# Concurrency Control (Locks, Deadlocks, Semaphores)

When multiple processes or threads run at the same time, they often need to **share resources** (files, memory, CPU).  
Without proper control, this can lead to **race conditions, deadlocks, or inconsistent results**.  

Concurrency control techniques help maintain **correctness and efficiency**.

---

## 1. Locks

- A **lock** ensures only one thread/process can access a shared resource at a time.  
- Types of locks:  
  - **Mutex (Mutual Exclusion)** → binary lock (only one holder).  
  - **Read-Write Lock** → multiple readers allowed, only one writer.  

**Problem:** If a thread forgets to release lock → deadlock.  

**Example (Python-like pseudo-code):**  
```python
lock.acquire()
# critical section
lock.release()
```

---

## 2. Semaphores

- A **semaphore** is a synchronization primitive introduced by **Dijkstra**.  
- Can be used to control access to resources.  

### Types:
- **Binary Semaphore** → like a mutex (0 or 1).  
- **Counting Semaphore** → allows multiple threads to access limited resources.  

**Example:** 3 printers shared among many users → counting semaphore initialized to 3.  

**Pseudo-code:**  
```python
sem.wait()   # acquire
# critical section
sem.signal() # release
```

---

## 3. Deadlocks

A **deadlock** happens when two or more processes are **waiting for each other forever**.  

### Conditions for Deadlock (Coffman’s Conditions)
1. **Mutual Exclusion** → only one can use resource at a time.  
2. **Hold and Wait** → process holds resource while waiting for another.  
3. **No Preemption** → resources cannot be forcibly taken away.  
4. **Circular Wait** → a cycle of processes waiting for each other.  

If all four conditions hold → deadlock possible.  

### Deadlock Handling
- **Prevention**: Break one of the conditions. Example: force ordering of resources.  
- **Avoidance**: Use Banker’s Algorithm (check if safe state).  
- **Detection & Recovery**: Detect cycle in wait graph → kill/restart process.  

---

## 4. Race Conditions

- Occur when multiple threads/processes update shared data without proper synchronization.  
- Example: Two ATM withdrawals at the same time may overdraw account.  
- Solution: Use **locks, atomic operations, or transactions**.  

---

## 5. Interview Tips

- Be ready to:  
  - Explain difference between **mutex, lock, semaphore**.  
  - List **deadlock conditions**.  
  - Give **real-world example** (ATM withdrawals, DB transactions).  
- Analogy:  
  - **Lock** = single bathroom key.  
  - **Semaphore** = limited parking slots.  
  - **Deadlock** = two cars stuck on a one-lane bridge, both waiting.  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
