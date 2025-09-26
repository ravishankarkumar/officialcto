---
title: Concurrency Utilities in Java
description: Learn Java concurrency utilities like CountDownLatch, CyclicBarrier, Semaphore, BlockingQueue, ConcurrentHashMap, and thread-safe collections with examples and trade-offs.
---

# Concurrency Utilities in Java

The **`java.util.concurrent`** package provides powerful utilities that simplify building thread-safe and scalable applications. Instead of manually handling synchronization, locks, and wait/notify, developers can use these high-level constructs to coordinate threads and manage shared resources effectively.

---

## 1. CountDownLatch

A **CountDownLatch** allows one or more threads to wait until a set of operations being performed by other threads completes.

- **Use case**: Ensuring that a service starts only after multiple worker threads finish initialization.
- **Behavior**: Initialized with a count; each `countDown()` call decreases it. Threads calling `await()` block until the count reaches zero.

```java
import java.util.concurrent.CountDownLatch;

class CountDownLatchExample {
    public static void main(String[] args) throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(3);

        Runnable worker = () -> {
            try {
                Thread.sleep(1000); // simulate work
                System.out.println(Thread.currentThread().getName() + " finished work");
                latch.countDown();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        };

        for (int i = 0; i < 3; i++) {
            new Thread(worker).start();
        }

        latch.await(); // wait for all workers
        System.out.println("All workers finished. Proceeding...");
    }
}
```

✅ **Pros**: Simple one-time synchronization.  
⚠️ **Cons**: Latch cannot be reset; for reusable synchronization, use `CyclicBarrier`.

---

## 2. CyclicBarrier

A **CyclicBarrier** makes threads wait until a predefined number of threads reach the barrier, then releases all at once.

- **Use case**: Coordinating phases in parallel computations (e.g., divide-and-conquer algorithms).
- **Behavior**: Can be reused (unlike `CountDownLatch`). Optional **barrier action** runs once when all parties arrive.

```java
import java.util.concurrent.CyclicBarrier;

class CyclicBarrierExample {
    public static void main(String[] args) {
        Runnable barrierAction = () -> System.out.println("All parties arrived, barrier lifted!");
        CyclicBarrier barrier = new CyclicBarrier(3, barrierAction);

        Runnable task = () -> {
            try {
                System.out.println(Thread.currentThread().getName() + " waiting...");
                barrier.await();
                System.out.println(Thread.currentThread().getName() + " passed barrier");
            } catch (Exception e) {
                e.printStackTrace();
            }
        };

        for (int i = 0; i < 3; i++) {
            new Thread(task).start();
        }
    }
}
```

✅ **Pros**: Reusable, supports barrier action.  
⚠️ **Cons**: More complex error handling (`BrokenBarrierException`).

---

## 3. Semaphore

A **Semaphore** controls access to a limited number of resources by maintaining permits.

- **Use case**: Limiting concurrent access to a shared resource (e.g., 3 threads allowed in a database connection pool).
- **Behavior**: Threads call `acquire()` to get a permit and `release()` to return it.

```java
import java.util.concurrent.Semaphore;

class SemaphoreExample {
    public static void main(String[] args) {
        Semaphore semaphore = new Semaphore(3); // 3 permits

        Runnable worker = () -> {
            try {
                semaphore.acquire();
                System.out.println(Thread.currentThread().getName() + " acquired permit");
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            } finally {
                System.out.println(Thread.currentThread().getName() + " released permit");
                semaphore.release();
            }
        };

        for (int i = 0; i < 6; i++) {
            new Thread(worker).start();
        }
    }
}
```

✅ **Pros**: Ideal for rate limiting or resource pools.  
⚠️ **Cons**: Mismanagement (forgetting `release()`) can cause deadlocks.

---

## 4. BlockingQueue

A **BlockingQueue** provides thread-safe producer-consumer support, blocking on `put()` if full and `take()` if empty.

- **Use case**: Producer-consumer systems, job queues.
- **Types**:
  - `ArrayBlockingQueue`: bounded, fixed capacity.
  - `LinkedBlockingQueue`: optionally bounded, scalable.
  - `PriorityBlockingQueue`: orders elements by priority.
  - `DelayQueue`: elements available only after delay.

```java
import java.util.concurrent.*;

class BlockingQueueExample {
    public static void main(String[] args) {
        BlockingQueue<Integer> queue = new ArrayBlockingQueue<>(5);

        Runnable producer = () -> {
            try {
                for (int i = 0; i < 10; i++) {
                    queue.put(i);
                    System.out.println("Produced: " + i);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        };

        Runnable consumer = () -> {
            try {
                for (int i = 0; i < 10; i++) {
                    int item = queue.take();
                    System.out.println("Consumed: " + item);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        };

        new Thread(producer).start();
        new Thread(consumer).start();
    }
}
```

✅ **Pros**: Simplifies producer-consumer patterns.  
⚠️ **Cons**: Need tuning of queue size; risk of blocking under pressure.

---

## 5. ConcurrentHashMap

A **ConcurrentHashMap** is a thread-safe alternative to `HashMap` without global locking.

- **Use case**: Shared mutable maps with high read/write concurrency.
- **Behavior**: Uses fine-grained locks (segments/buckets in older versions, synchronized nodes in JDK 8+).

```java
import java.util.concurrent.*;

class ConcurrentHashMapExample {
    public static void main(String[] args) {
        ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
        map.put("A", 1);
        map.putIfAbsent("B", 2);

        map.compute("A", (k, v) -> v + 1);
        System.out.println("Value of A: " + map.get("A"));
    }
}
```

✅ **Pros**: Highly concurrent, non-blocking reads.  
⚠️ **Cons**: Iterators are weakly consistent (may not reflect latest changes).

---

## 6. Thread-Safe Collections

- `CopyOnWriteArrayList`: Optimized for **frequent reads** and **rare writes** (writes copy entire array).
- `CopyOnWriteArraySet`: Backed by `CopyOnWriteArrayList`.
- `ConcurrentLinkedQueue`: Non-blocking, thread-safe queue based on CAS (compare-and-swap).

```java
import java.util.concurrent.CopyOnWriteArrayList;

class CopyOnWriteExample {
    public static void main(String[] args) {
        CopyOnWriteArrayList<String> list = new CopyOnWriteArrayList<>();
        list.add("A");
        list.add("B");

        for (String s : list) {
            System.out.println(s);
            list.add("C"); // safe, no ConcurrentModificationException
        }
    }
}
```

✅ **Pros**: Safe iteration during concurrent modifications.  
⚠️ **Cons**: Expensive writes; not suitable for write-heavy scenarios.

---

# Summary

The **Java Concurrency Utilities** simplify multi-threaded programming with higher-level constructs:
- `CountDownLatch` and `CyclicBarrier` for coordination.  
- `Semaphore` for resource control.  
- `BlockingQueue` for producer-consumer systems.  
- `ConcurrentHashMap` and thread-safe collections for shared data.  

👉 Mastering these utilities is critical for building scalable systems and answering concurrency questions in **FAANG interviews**.
