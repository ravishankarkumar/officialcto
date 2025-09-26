---
title: Synchronization Basics in Java
description: Learn why synchronization is needed in Java, how the synchronized keyword works, intrinsic locks, wait/notify, limitations, and common interview questions with examples.
---

# Synchronization Basics in Java

Java is a multi-threaded language, and **synchronization** is one of the most fundamental concepts in ensuring **thread safety**. Without proper synchronization, threads may interfere with each other, leading to **race conditions**, **inconsistent state**, or **visibility problems**.

This article introduces the **why**, **how**, and **when** of synchronization, along with practical examples and interview insights.

---

## 1. Why Synchronization is Needed

### Problems Without Synchronization
1. **Race Conditions** – When two or more threads try to modify shared data at the same time, leading to unpredictable results.  
   Example: Incrementing a shared counter without synchronization may miss updates.

2. **Visibility Issues** – Changes made by one thread may not be visible to another due to **CPU caching** or **compiler reordering**.

3. **Atomicity** – Operations that seem atomic (like `count++`) are actually multiple steps (read → increment → write), and can be interrupted mid-way.

---

## 2. The `synchronized` Keyword

Java provides the `synchronized` keyword for **mutual exclusion**. Only one thread at a time can hold the lock for a given object/monitor.

### Synchronized Methods
```java
class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++; // only one thread at a time can execute this
    }

    public synchronized int getCount() {
        return count;
    }
}
```

Here, both `increment()` and `getCount()` methods are synchronized. The lock is implicitly on the **instance (this)**.

### Synchronized Blocks
```java
class Counter {
    private int count = 0;

    public void increment() {
        synchronized (this) {  // lock only around critical section
            count++;
        }
    }
}
```

- Method-level sync locks the **whole method**.  
- Block-level sync locks only the **critical section**, improving concurrency.

---

## 3. Intrinsic Locks and Monitor Concept

- Every Java object has an **intrinsic lock (monitor)**.  
- When a thread enters a synchronized block, it **acquires the monitor**; other threads trying to enter must wait.  
- When it exits the block, it **releases the monitor**.

This ensures **mutual exclusion** and **visibility guarantees** (writes are flushed to main memory when lock is released).

---

## 4. Thread Communication: `wait()`, `notify()`, `notifyAll()`

Besides mutual exclusion, synchronization also enables **coordination** between threads.

- `wait()` → Makes the current thread wait until another thread calls `notify()`/`notifyAll()`.  
- `notify()` → Wakes up one waiting thread.  
- `notifyAll()` → Wakes up all waiting threads.

⚠️ These methods must be called **inside a synchronized block**, otherwise they throw `IllegalMonitorStateException`.

### Example: Simple Producer–Consumer
```java
class SharedBuffer {
    private int data;
    private boolean hasData = false;

    public synchronized void produce(int value) throws InterruptedException {
        while (hasData) {
            wait(); // wait until data is consumed
        }
        data = value;
        hasData = true;
        System.out.println("Produced: " + value);
        notify(); // wake up consumer
    }

    public synchronized int consume() throws InterruptedException {
        while (!hasData) {
            wait(); // wait until data is produced
        }
        hasData = false;
        System.out.println("Consumed: " + data);
        notify(); // wake up producer
        return data;
    }
}
```

---

## 5. Limitations of `synchronized`

- **Blocking**: If a thread holds a lock, all other threads must wait.  
- **No Try/Timeout**: Unlike `ReentrantLock`, there’s no `tryLock()` or timed lock attempt.  
- **Single Condition Queue**: Only one `wait()` queue per lock.  
- **Deadlocks**: Poorly designed synchronized blocks can lead to circular waiting.  
- **Scalability Issues**: For high contention, `synchronized` may become a bottleneck.

---

## 6. Code Example: Race Condition vs Fixed with Synchronization

### Without Synchronization
```java
class RaceConditionDemo {
    private static int counter = 0;

    public static void main(String[] args) throws InterruptedException {
        Runnable task = () -> {
            for (int i = 0; i < 1000; i++) counter++;
        };

        Thread t1 = new Thread(task);
        Thread t2 = new Thread(task);
        t1.start(); t2.start();
        t1.join(); t2.join();

        System.out.println("Final count: " + counter); // expected 2000, often less
    }
}
```

### With Synchronization
```java
class SynchronizedDemo {
    private static int counter = 0;

    public synchronized static void increment() {
        counter++;
    }

    public static void main(String[] args) throws InterruptedException {
        Runnable task = () -> {
            for (int i = 0; i < 1000; i++) increment();
        };

        Thread t1 = new Thread(task);
        Thread t2 = new Thread(task);
        t1.start(); t2.start();
        t1.join(); t2.join();

        System.out.println("Final count: " + counter); // always 2000
    }
}
```

---

## 7. Interview Focus

- **When to use `synchronized`?**
  - For simple mutual exclusion when managing shared state.
  - When you don’t need advanced features like timed lock attempts or multiple conditions.

- **What’s the overhead of `synchronized`?**
  - Context switching, blocking, and lock contention.
  - JVM optimizations like **biased locking** and **lock elision** reduce cost, but heavy contention still hurts performance.

- **Difference between method-level and block-level synchronization?**
  - Method-level → coarser; easier to implement, less concurrency.  
  - Block-level → finer; better performance but requires careful design.

---

## Conclusion

`synchronized` is the **simplest and most widely used tool** for synchronization in Java. It provides:
- **Mutual exclusion**: Only one thread executes the critical section.  
- **Visibility guarantee**: Changes by one thread are visible to others.  
- **Coordination**: Enables wait/notify communication.  

However, its **limitations** (blocking, deadlocks, lack of advanced control) mean that for complex use cases, we should use **explicit locks** or **higher-level concurrency utilities**.

---
