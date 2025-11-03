---
title: Concurrency Control (Locks, Deadlocks, Semaphores)
description: A deep dive into concurrency control in operating systems, covering locks, semaphores, deadlocks, race conditions, monitors, starvation, and interview tips.
---

# Concurrency Control (Locks, Deadlocks, Semaphores)

Modern operating systems and databases must handle **concurrent execution of multiple processes/threads**.  
Without proper synchronization, concurrency can cause:  
- **Race conditions** (wrong/inconsistent results).  
- **Deadlocks** (no progress).  
- **Starvation** (some processes never get a chance).  

**Concurrency control techniques** ensure **correctness, fairness, and efficiency** when processes share resources (files, memory, CPU, devices).



## 1. Locks

A **lock** enforces **mutual exclusion (mutex)**: only one process can access a critical section at a time.

### Types of Locks
1. **Mutex (Mutual Exclusion Lock)**  
   - Binary state (locked/unlocked).  
   - Only the owner can release it.  

2. **Spinlock**  
   - Busy-waiting: thread continuously checks if lock is free.  
   - Good for short critical sections on multiprocessors (avoids context-switch overhead).  

3. **Read-Write Lock (RWLock)**  
   - Multiple readers can hold the lock simultaneously.  
   - Writers get exclusive access.  
   - Example: Database queries (many readers, few writers).  

4. **Ticket/Fair Locks**  
   - Processes get a "ticket number," ensuring **FIFO order** to prevent starvation.  

### Locking Problems
- **Priority Inversion**: A high-priority task waits because a low-priority task holds a lock.  
  - Solution: **Priority inheritance protocol** (boost priority temporarily).  
- **Deadlock**: If two locks are acquired in different orders, deadlock may occur.  
- **Starvation**: If scheduling favors some processes, others may never acquire lock.  

**Example (Python-like pseudo-code):**
```python
lock.acquire()
# critical section
lock.release()
```



## 2. Semaphores

A **semaphore** is a synchronization primitive represented as a protected **integer variable**.  
It regulates how many processes/threads can access a resource at once, using two atomic operations: `wait()` and `signal()`.


### 2.1 The Role of the Integer Value

- The **integer value** represents the **number of available units** of a resource.  
- When a process calls `wait()`:  
  - The value is **decremented**.  
  - If the value is still **≥ 0**, the process can proceed (resource granted).  
  - If the value becomes **< 0**, the process is **blocked** and placed in a wait queue.  

- When a process calls `signal()`:  
  - The value is **incremented**.  
  - If the value is **≤ 0**, it means there are blocked processes → one of them is woken up.  

In short:  
- **Positive / Zero value** → free resources available.  
- **Negative value** → absolute value = number of processes waiting in the queue.  


### 2.2 Types of Semaphores

1. **Binary Semaphore**  
   - Integer is either 0 or 1.  
   - Only one process can hold it at a time (mutex behavior).  

2. **Counting Semaphore**  
   - Integer starts at `N` (number of identical resources).  
   - Multiple processes can acquire the semaphore **simultaneously**, as long as the counter stays ≥ 0.  
   - Example: If 3 printers are available, semaphore initialized to 3 → up to 3 processes can print at once.  



### 2.3 Example: Counting Semaphore (3 Printers)

```python
sem = Semaphore(3)   # 3 printers available

def print_job(job):
    sem.wait()       # tries to take 1 printer
    use_printer(job) # critical section
    sem.signal()     # releases printer
```

#### How it works:
- At start: `sem = 3`.  
- First process calls `wait()`, sem → 2 (allowed).  
- Second process calls `wait()`, sem → 1 (allowed).  
- Third process calls `wait()`, sem → 0 (allowed).  
- Fourth process calls `wait()`, sem → -1 → **blocked** until one of the others calls `signal()`.  

This is how **multiple processes can hold the semaphore "lock" at the same time**:  
because the counter tracks how many resources are left, not just a binary lock.



### 2.4 Example: Binary Semaphore (Mutex)

```python
mutex = Semaphore(1)  # only 1 at a time

def update_balance(amount):
    mutex.wait()        # lock
    balance += amount   # critical section
    mutex.signal()      # unlock
```

- If one process holds it, the counter = 0 → next `wait()` will block.  
- Acts just like a **mutex**.  



### 2.5 Real-World Uses
- **Binary Semaphore** → Mutual exclusion (critical section).  
- **Counting Semaphore** → Resource pool management (threads, printers, DB connections).  
- **Producer-Consumer** → Classic problem solved with two semaphores (`empty`, `full`).  



### 2.6 Summary of Integer Meaning

| Semaphore Value | Meaning |
|-----------------|---------|
| `> 0`           | Number of resources immediately available. |
| `= 0`           | No free resource, but no one waiting yet. |
| `< 0`           | Number of processes waiting (absolute value). |



### 2.7 Analogy

- **Binary Semaphore (1)** = **one bathroom key** → only one person can enter.  
- **Counting Semaphore (N)** = **parking lot with N slots** → N cars can park at once.  
  - If lot full → arriving cars wait (value goes negative).  




## 3. Race Conditions

A **race condition** occurs when the final outcome depends on the **timing of concurrent execution**.  

**Example: Bank Account**
- Initial balance = 100.  
- Thread A deposits +50, Thread B withdraws -30 at the same time.  
- Without lock:  
  - Both read balance = 100.  
  - A writes 150, B writes 70 → final = 70 (deposit lost).  

**Solution:** Protect shared data with **mutexes, semaphores, or atomic operations**.



## 4. Deadlocks

A **deadlock** happens when processes are stuck **waiting forever** for resources held by each other.

### Coffman’s 4 Conditions (necessary for deadlock)
1. **Mutual Exclusion** → resources not sharable.  
2. **Hold and Wait** → process holds one resource and waits for another.  
3. **No Preemption** → resources cannot be forcibly taken away.  
4. **Circular Wait** → cycle of processes each waiting for resource held by another.  

If all four hold → deadlock possible.

### Deadlock Handling
1. **Prevention** → Break one condition.  
   - No circular wait (impose order on resource acquisition).  
   - Preempt resources when necessary.  
2. **Avoidance** → Use algorithms to avoid unsafe states.  
   - **Banker’s Algorithm**: ensures system always remains in a “safe” state.  
3. **Detection & Recovery**  
   - Construct wait-for graph → detect cycles.  
   - Kill/restart process or preempt resources.  



## 5. Starvation & Livelock

- **Starvation**: Process waits indefinitely (e.g., low-priority task always skipped).  
- **Livelock**: Processes keep changing state but make no progress (e.g., two people stepping aside repeatedly in a hallway).  

Solutions:  
- Use **fair locks** (FIFO order).  
- Aging → gradually increase priority of waiting processes.  



## 6. Monitors & Condition Variables

A **monitor** is a **high-level synchronization construct** that combines:  
1. **Mutual exclusion** (only one thread active inside at a time).  
2. **Condition variables** (to allow threads to wait and be signaled when certain conditions are met).  

Monitors simplify concurrent programming because the compiler/runtime enforces mutual exclusion automatically.  
This makes them **safer and less error-prone** than raw semaphores.


### 6.1 Why Monitors?
- With semaphores, programmers must manually `wait()` and `signal()` in the right places → error-prone.  
- Monitors **encapsulate synchronization with data** → making code easier to reason about.  
- Languages like **Java, C#, Go, Python (threading.Condition)** provide built-in monitor-like constructs.


### 6.2 Condition Variables Inside Monitors

A **condition variable (CV)** is used to **wait for a condition to become true**.  
It provides two key operations:  
- `wait(cv)` → releases the monitor lock and suspends the calling thread until another thread signals `cv`.  
- `signal(cv)` → wakes up one waiting thread (if any).  

**Important difference from semaphores:**  
- Condition variables **do not have counters**.  
- They are just waiting lists associated with conditions inside a monitor.  


### 6.3 Example: Producer-Consumer with Monitor

```python
monitor Buffer {
    condition notEmpty, notFull
    queue data
    int capacity = 5

    procedure insert(item):
        if data.size == capacity:
            wait(notFull)         # release lock, go to sleep
        data.enqueue(item)
        signal(notEmpty)          # wake up one waiting consumer

    procedure remove():
        if data.empty():
            wait(notEmpty)        # release lock, go to sleep
        item = data.dequeue()
        signal(notFull)           # wake up one waiting producer
        return item
}
```

#### How this works:
- **Mutual exclusion**: Only one process runs inside the monitor at any given time.  
- **Condition variables**:  
  - If buffer is full → producers wait on `notFull`.  
  - If buffer is empty → consumers wait on `notEmpty`.  
- **Signal**: Wakes up a thread waiting on that condition.  



### 6.4 Real-World Implementations
- **Java**:  
  - Every object has an implicit monitor.  
  - `synchronized` methods/blocks enforce mutual exclusion.  
  - `wait()` and `notify()/notifyAll()` act like condition variable operations.  
  ```java
  class Buffer {
      private Queue<Integer> data = new LinkedList<>();
      private int capacity = 5;

      public synchronized void insert(int item) throws InterruptedException {
          while (data.size() == capacity) wait();
          data.add(item);
          notify(); // signal notEmpty
      }

      public synchronized int remove() throws InterruptedException {
          while (data.isEmpty()) wait();
          int item = data.remove();
          notify(); // signal notFull
          return item;
      }
  }
  ```

- **pthreads (C)**:  
  - Uses `pthread_mutex_t` (lock) + `pthread_cond_t` (condition variables).  

- **Python** (`threading.Condition`):  
  - Encapsulates a lock + condition variable.  



### 6.5 Monitors vs Semaphores

| Aspect              | Semaphore                         | Monitor                                |
|---------------------|-----------------------------------|----------------------------------------|
| Level               | Low-level primitive               | High-level abstraction                 |
| Encapsulation       | Separate from data                | Bundled with shared data               |
| Responsibility      | Programmer must handle correctness | Compiler/runtime enforces correctness |
| Condition handling  | Counters (wait decreases, signal increases) | Explicit wait/signal on condition vars |
| Error-prone?        | High (forgotten signals, deadlocks) | Lower (built-in discipline)            |



### 6.6 Analogy
- **Semaphore** = doorman with a counter: lets N people in, others wait.  
- **Monitor** = automatic door + waiting lounge:  
  - Only one person inside room.  
  - If room isn’t ready, people wait in lounge (condition variables).  
  - Once ready, system automatically lets someone in.  


Languages like **Java (synchronized blocks)** and **pthreads** implement monitors.



## 7. Concurrency in Real Systems

- **Databases**: Use 2-phase locking, transactions, isolation levels.  
- **Linux Kernel**: Spinlocks, semaphores, RCU (Read-Copy-Update).  
- **Java**: `synchronized`, `ReentrantLock`, `Semaphore`, `CountDownLatch`.  



## 8. Interview Tips

- **Mutex vs Semaphore**: Mutex has single owner, semaphore is counter.  
- **Deadlock conditions**: Be able to state all four.  
- **Banker’s Algorithm**: Explain “safe state” with small example.  
- **Starvation vs Deadlock**: Deadlock = stuck, Starvation = ignored.  
- **Real-world examples**:  
  - Locks: File system access.  
  - Semaphores: Controlling DB connections.  
  - Deadlock: Two trains on single track, both waiting.  

**Analogies:**  
- **Lock** = one bathroom key.  
- **Semaphore** = parking lot with limited slots.  
- **Deadlock** = two cars stuck on a one-lane bridge.  
- **Starvation** = a car always letting others go first, never moving.  
- **Livelock** = two people stepping aside endlessly, blocking each other.  


## 9. Banker’s Algorithm (Deadlock Avoidance)

The **Banker’s Algorithm** (by Dijkstra) is used for **deadlock avoidance**.  
It ensures the system never enters an **unsafe state** where deadlock is possible.

### Key Ideas
- Each process must declare the **maximum resources** it may need.  
- The OS only grants resource requests if, after allocation, the system can still remain in a **safe state** (i.e., there exists a sequence in which all processes can finish).  

### Data Structures
- **Available[]** → number of available instances of each resource type.  
- **Max[][]** → maximum demand of each process.  
- **Allocation[][]** → resources currently allocated to each process.  
- **Need[][] = Max - Allocation** → remaining resources each process still needs.  

### Safety Algorithm (to check if system is safe)
1. Initialize `Work = Available`, `Finish[i] = false`.  
2. Find a process `i` such that:  
   - `Finish[i] == false`, and  
   - `Need[i] <= Work`.  
3. If found → pretend to allocate, set `Work = Work + Allocation[i]`, `Finish[i] = true`.  
4. Repeat until no such process is found.  
5. If all `Finish[i] == true`, the system is in a **safe state**.  

---

### Example

Suppose we have **3 processes (P0, P1, P2)** and **3 resource types (A, B, C)**.

- Total instances: `A=10, B=5, C=7`.  
- Current allocation and maximum demand:

| Process | Allocation (A B C) | Max (A B C) |
|---------|--------------------|-------------|
| P0      | 0 1 0              | 7 5 3       |
| P1      | 2 0 0              | 3 2 2       |
| P2      | 3 0 2              | 9 0 2       |

**Step 1: Compute Need = Max - Allocation**

| Process | Need (A B C) |
|---------|--------------|
| P0      | 7 4 3        |
| P1      | 1 2 2        |
| P2      | 6 0 0        |

**Step 2: Compute Available**
Available = Total - Sum(Allocation)
= (10, 5, 7) - (0+2+3, 1+0+0, 0+0+2)
= (5, 4, 5)

**Step 3: Apply Safety Algorithm**

- Work = (5,4,5).  
- P1’s Need (1,2,2) ≤ Work → allocate to P1 → Work = Work + Allocation(P1) = (7,4,5).  
- P2’s Need (6,0,0) ≤ Work → allocate → Work = (10,4,7).  
- P0’s Need (7,4,3) ≤ Work → allocate → Work = (10,5,7).  

All processes finish → **Safe sequence = P1 → P2 → P0**.  

✅ The system is in a safe state, so the request is granted.  

---

### Interview Tip
If asked about Banker’s Algorithm:  
- State clearly that it’s for **deadlock avoidance (not prevention/detection)**.  
- Mention: works like a bank checking if a loan can be granted without risk.  
- Always mention **safe state** and the idea of “pretend allocation, then check.”  

**Analogy:**  
Bank doesn’t give out loans unless it knows it can still satisfy everyone eventually → hence the name *Banker’s Algorithm*.  

---


<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
