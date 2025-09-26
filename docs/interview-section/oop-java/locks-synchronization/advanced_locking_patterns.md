---
title: Advanced Locking & Patterns in Java
description: Explore lock fairness, deadlocks, starvation, livelock, lock striping, and best practices for writing robust concurrent Java applications.
---

# Advanced Locking & Patterns in Java

## 1. Lock Fairness
Locks can be **fair** or **non-fair**:
- **Fair locks**: Threads acquire the lock in the order they requested it (FIFO).
- **Non-fair locks**: Threads may “cut in line,” giving better throughput but risking starvation.

In Java:
```java
ReentrantLock fairLock = new ReentrantLock(true);  // fair
ReentrantLock unfairLock = new ReentrantLock(false); // default non-fair
```

**Trade-offs**:  
- Fair locks improve predictability but reduce throughput.  
- Non-fair locks improve performance but may starve low-priority threads.

---

## 2. Deadlock: Causes & Prevention
A **deadlock** occurs when threads wait on each other indefinitely.  
Conditions for deadlock:
1. **Mutual exclusion** — only one thread at a time can access a resource.
2. **Hold and wait** — a thread holds a resource and waits for another.
3. **No preemption** — resources cannot be forcibly taken.
4. **Circular wait** — a cycle of threads waiting for each other’s locks.

### Example: Classic Deadlock
```java
class DeadlockExample {
    private final Object lock1 = new Object();
    private final Object lock2 = new Object();

    public void method1() {
        synchronized (lock1) {
            synchronized (lock2) {
                System.out.println("method1");
            }
        }
    }

    public void method2() {
        synchronized (lock2) {
            synchronized (lock1) {
                System.out.println("method2");
            }
        }
    }
}
```

### Prevention Strategies
- **Lock ordering**: Always acquire locks in a consistent global order.  
- **tryLock() with timeout**: Use `ReentrantLock.tryLock(timeout)` to avoid waiting indefinitely.  
- **Detect and recover**: Monitor thread states and restart stuck processes (more common in databases).  

---

## 3. Starvation and Livelock
- **Starvation**: A thread never acquires resources because others always get ahead.  
  - Cause: unfair scheduling or lock bias.  
  - Fix: use fair locks or better scheduling policies.  

- **Livelock**: Threads keep responding to each other but make no progress.  
  - Example: Two threads backing off and retrying forever.  
  - Fix: randomized backoff, or adding priority rules.

---

## 4. Lock Striping for Performance
**Lock striping** divides a resource into smaller segments, each protected by its own lock. This increases concurrency.

### Example
```java
class LockStripedCache {
    private final Object[] locks;
    private final Map<Integer, String> map;

    public LockStripedCache(int stripes) {
        locks = new Object[stripes];
        for (int i = 0; i < stripes; i++) locks[i] = new Object();
        map = new HashMap<>();
    }

    public void put(int key, String value) {
        int lockIndex = key % locks.length;
        synchronized (locks[lockIndex]) {
            map.put(key, value);
        }
    }

    public String get(int key) {
        int lockIndex = key % locks.length;
        synchronized (locks[lockIndex]) {
            return map.get(key);
        }
    }
}
```
This reduces contention compared to one global lock.

---

## 5. Best Practices
- Always **release locks in a `finally` block**:
```java
lock.lock();
try {
    // critical section
} finally {
    lock.unlock();
}
```
- Avoid **nested locks** — they increase risk of deadlocks.  
- Keep critical sections **short and focused**.  
- Use higher-level concurrency utilities (`BlockingQueue`, `ConcurrentHashMap`) instead of manual locking when possible.  
- Prefer **immutable objects** to reduce need for synchronization.

---

## 6. Interview Focus
**Q: How do you avoid deadlocks in Java?**  
- Acquire locks in a consistent global order.  
- Use `tryLock()` with timeout instead of blocking forever.  
- Keep lock scope small.  
- Use higher-level concurrency utilities when possible.  

**Q: Difference between starvation and livelock?**  
- Starvation: A thread never progresses because others dominate resources.  
- Livelock: Threads actively change state in response to others but still make no progress.

---

## Conclusion
Advanced locking introduces nuances like fairness, starvation, livelock, and patterns like lock striping. Understanding these helps you write **robust concurrent code** and answer **interview questions** confidently.
