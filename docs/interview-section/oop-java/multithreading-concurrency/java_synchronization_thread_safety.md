---
title: Synchronization & Thread Safety in Java
description: Learn synchronization tools in Java (synchronized, locks, volatile, atomic classes), their trade-offs, and best practices for ensuring thread safety in multithreaded applications.
---

# Synchronization & Thread Safety in Java

Concurrency introduces challenges when multiple threads **access and modify shared state** at the same time. Without proper safeguards, you risk **race conditions, inconsistent data, deadlocks, or subtle memory visibility bugs**. This article explores the tools Java provides to ensure **thread safety**.



## 1. Shared Mutable State

- **Problem**: When multiple threads modify the same variable/object concurrently, results can be unpredictable.  
- Example:
```java
class Counter {
    private int count = 0;
    public void increment() { count++; }
    public int getCount() { return count; }
}

Counter c = new Counter();
for (int i = 0; i < 1000; i++) {
    new Thread(c::increment).start();
}
System.out.println(c.getCount()); // Not always 1000!
```

- **Cause**: Increment (`count++`) is not atomic: it involves read → modify → write, which can interleave across threads.  



## 2. `synchronized` Keyword

Java’s simplest synchronization mechanism.

- **Method synchronization**:
```java
class Counter {
    private int count = 0;
    public synchronized void increment() { count++; }
    public synchronized int getCount() { return count; }
}
```

- **Block synchronization**:
```java
synchronized(this) {
    // critical section
}
```

- **Pros**:
  - Easy to use.
  - Automatically provides **mutual exclusion** and **memory visibility guarantees**.
- **Cons**:
  - Can cause **blocking** and reduce throughput.
  - Prone to **deadlocks** if multiple locks are nested.



## 3. Locks (`ReentrantLock`, `ReadWriteLock`)

The `java.util.concurrent.locks` package provides more advanced locking.

### ReentrantLock
```java
import java.util.concurrent.locks.*;

class Counter {
    private int count = 0;
    private final ReentrantLock lock = new ReentrantLock();

    public void increment() {
        lock.lock();
        try {
            count++;
        } finally {
            lock.unlock();
        }
    }
    public int getCount() { return count; }
}
```

- **Pros**:
  - More flexible (supports `tryLock()`, lock fairness).
  - Can break out of deadlock with timeout.
- **Cons**:
  - More verbose; must always unlock in `finally`.
  - Easier to misuse compared to `synchronized`.

### ReadWriteLock
- Allows **multiple readers** but only **one writer**.
```java
ReadWriteLock rwLock = new ReentrantReadWriteLock();
rwLock.readLock().lock();
// read data
rwLock.readLock().unlock();
```
- Useful when reads dominate writes.



## 4. `volatile` and Memory Visibility

- Ensures that updates to a variable are **always visible** to other threads.  
- Does **not** guarantee atomicity.  
- Example:
```java
volatile boolean flag = true;

public void stop() {
    flag = false; // visible across threads
}
```

- **Use Case**: Flags, simple state indicators.  
- **Not safe** for compound operations (e.g., `count++`).  



## 5. Atomic Classes

The `java.util.concurrent.atomic` package provides **lock-free, thread-safe** classes.

- Example:
```java
import java.util.concurrent.atomic.AtomicInteger;

class Counter {
    private AtomicInteger count = new AtomicInteger(0);
    public void increment() { count.incrementAndGet(); }
    public int getCount() { return count.get(); }
}
```

- **Pros**:
  - Fast and scalable for simple atomic operations.
- **Cons**:
  - Limited to basic operations (increment, CAS).
  - For complex updates, locks may still be needed.



## 6. Trade-Offs

| Tool              | Guarantees                        | Pros                                    | Cons                         | Use Cases |
|-------------------|-----------------------------------|----------------------------------------|------------------------------|-----------|
| `synchronized`    | Mutual exclusion + visibility     | Simple, built-in                       | Blocking, risk of deadlock   | Critical sections, simple thread safety |
| `ReentrantLock`   | Mutual exclusion + visibility     | Flexible, tryLock(), fairness options  | Verbose, manual unlock       | Advanced locking scenarios |
| `ReadWriteLock`   | Multiple readers, 1 writer        | Great for read-heavy workloads         | Writers can starve           | Caches, configs, databases |
| `volatile`        | Visibility only                   | Lightweight, non-blocking              | No atomicity                 | Flags, status variables |
| `Atomic classes`  | Atomic operations, CAS-based      | Lock-free, fast                        | Limited operations           | Counters, accumulators |



## Conclusion

Java offers **multiple synchronization tools** depending on your needs:

- Use `synchronized` for **simplicity**.  
- Use `ReentrantLock` when you need **fine-grained control**.  
- Use `volatile` for **visibility of simple flags**.  
- Use **Atomic classes** for **lock-free counters** and basic operations.  
- Always balance **performance vs. correctness**.  
