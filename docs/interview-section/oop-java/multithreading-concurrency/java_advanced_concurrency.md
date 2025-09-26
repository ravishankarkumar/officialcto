---
title: Advanced Topics in Java Concurrency
description: Explore advanced Java concurrency concepts — deadlocks, livelocks, starvation, ThreadLocal, Future vs CompletableFuture, parallel streams, and best practices for large-scale systems.
---

# Advanced Topics in Java Concurrency

As you grow beyond the basics of threads, synchronization, and executors, advanced concurrency concepts become critical to building **scalable and resilient systems**. This article covers **deadlocks, livelocks, starvation, ThreadLocal variables, Future vs CompletableFuture, parallel streams**, and **best practices for large systems**.

---

## 1. Deadlocks, Livelocks, and Starvation

### Deadlock
Occurs when two or more threads wait indefinitely for each other to release resources.

**Example**:
```java
class DeadlockDemo {
    private final Object lock1 = new Object();
    private final Object lock2 = new Object();

    public void method1() {
        synchronized (lock1) {
            System.out.println("Thread 1 acquired lock1");
            synchronized (lock2) {
                System.out.println("Thread 1 acquired lock2");
            }
        }
    }

    public void method2() {
        synchronized (lock2) {
            System.out.println("Thread 2 acquired lock2");
            synchronized (lock1) {
                System.out.println("Thread 2 acquired lock1");
            }
        }
    }
}
```

If `method1()` and `method2()` run simultaneously, a **deadlock** may occur.

**Prevention strategies**:
- Acquire locks in a consistent global order.
- Use `tryLock()` with timeouts.
- Prefer higher-level concurrency abstractions.

---

### Livelock
Threads keep responding to each other but make no progress.

**Analogy**: Two people trying to pass each other in a hallway, both stepping left/right repeatedly.

---

### Starvation
A thread never gets CPU or resource access because others dominate.

**Example**: Low-priority threads in a heavily loaded system.

**Fix**:
- Use fair locks (`new ReentrantLock(true)`).
- Ensure balanced scheduling.

---

## 2. ThreadLocal

`ThreadLocal` provides thread-specific variables. Each thread accessing a `ThreadLocal` variable has its **own isolated copy**.

**Example**:
```java
public class ThreadLocalDemo {
    private static ThreadLocal<Integer> threadLocal = ThreadLocal.withInitial(() -> 0);

    public static void main(String[] args) {
        Runnable task = () -> {
            int value = threadLocal.get();
            threadLocal.set(value + 1);
            System.out.println(Thread.currentThread().getName() + " -> " + threadLocal.get());
        };

        new Thread(task, "T1").start();
        new Thread(task, "T2").start();
    }
}
```

**Use cases**:
- Store user session data.
- Store DB connection or transaction context.
- Avoid passing context through multiple layers.

⚠️ Be careful with **ThreadLocal leaks** in thread pools (always call `remove()`).

---

## 3. Future vs CompletableFuture

### Future
Represents the result of an async computation.
- Provides `get()`, `cancel()`, and `isDone()`.
- Blocking: `get()` waits until result is ready.
- No chaining or composition.

### CompletableFuture
Introduced in Java 8, it improves on `Future`:
- Non-blocking and chainable (`thenApply`, `thenCompose`, `thenAccept`).
- Can combine multiple async tasks (`allOf`, `anyOf`).
- Supports timeouts and exceptions.

**Example**:
```java
CompletableFuture.supplyAsync(() -> "Hello")
    .thenApply(s -> s + " World")
    .thenAccept(System.out::println);
```

Output: `Hello World`

---

## 4. Parallel Streams (Java 8+)

Streams API allows parallel processing by splitting tasks across multiple threads using the **ForkJoinPool**.

**Example**:
```java
List<Integer> list = IntStream.range(1, 100).boxed().toList();

int sum = list.parallelStream()
              .mapToInt(Integer::intValue)
              .sum();

System.out.println(sum);
```

- Parallel streams use the **common ForkJoinPool**.
- Suitable for **CPU-bound** tasks.
- ⚠️ Avoid for I/O-bound tasks (blocking will harm throughput).
- ⚠️ Be careful with shared mutable state inside parallel streams.

---

## 5. Best Practices for Large Systems

1. **Avoid shared mutable state** — prefer immutability.
2. **Use higher-level abstractions** (`ExecutorService`, `CompletableFuture`) over raw threads.
3. **Apply backpressure** — prevent unbounded task submission.
4. **Use monitoring & profiling** to detect deadlocks, thread leaks, or contention.
5. **Separate CPU-bound and I/O-bound tasks** with different executors.
6. **Use timeouts** (`Future.get(timeout)`, `tryLock(timeout)`) to prevent infinite blocking.
7. **Gracefully handle shutdowns** — always call `shutdown()` and `awaitTermination()`.

---

# Summary

Advanced concurrency requires understanding not just **how to create threads**, but also how to **avoid pitfalls** like deadlocks and starvation, use **ThreadLocal** wisely, leverage **CompletableFuture** for async programming, and apply **parallel streams** correctly. These tools and best practices are crucial for **scalable, production-grade systems** and are frequently tested in **FAANG interviews**.
