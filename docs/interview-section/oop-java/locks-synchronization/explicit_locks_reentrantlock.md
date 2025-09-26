---
title: Explicit Locks in Java — ReentrantLock
description: Learn Java's ReentrantLock for advanced synchronization — lock(), unlock(), tryLock(), fairness, conditions, producer-consumer example, and interview prep.
---

# Explicit Locks in Java — ReentrantLock

The `synchronized` keyword provides a simple way to achieve thread safety, but it has **limitations** — lack of flexibility, fairness control, and advanced features.  
Java's **`Lock` interface** (in `java.util.concurrent.locks`) and its primary implementation **`ReentrantLock`** provide more powerful synchronization mechanisms.

---

## 1. Introduction to Lock Interface
- `Lock` is an alternative to intrinsic locks (monitors used by `synchronized`).  
- Provides explicit methods to acquire and release locks (`lock()`, `unlock()`).  
- Offers advanced features like fairness, timed lock acquisition, and multiple condition variables.

```java
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

class SharedResource {
    private final Lock lock = new ReentrantLock();
    private int counter = 0;

    public void increment() {
        lock.lock();   // Acquire lock
        try {
            counter++;
        } finally {
            lock.unlock(); // Always release in finally
        }
    }

    public int getCounter() {
        return counter;
    }
}
```

---

## 2. ReentrantLock Features

### 2.1 Basic Lock/Unlock
- **lock()** acquires the lock, blocking if unavailable.
- **unlock()** releases it.  
⚠️ Must always call `unlock()` in a `finally` block to avoid deadlocks.

### 2.2 tryLock()
- Attempts to acquire lock without blocking indefinitely.
- Returns `true` if lock acquired, `false` otherwise.

```java
if (lock.tryLock()) {
    try {
        // Critical section
    } finally {
        lock.unlock();
    }
} else {
    // Could not acquire lock, do something else
}
```

### 2.3 Timeout Lock
```java
if (lock.tryLock(1, TimeUnit.SECONDS)) {
    try {
        // work
    } finally {
        lock.unlock();
    }
}
```

### 2.4 Fair vs Non-Fair Locks
- By default, `ReentrantLock` is **non-fair** (threads may barge in).
- With fairness set to true: `new ReentrantLock(true)`, threads acquire in FIFO order.
- Fair locks reduce starvation but are slower.

### 2.5 Condition Variables
- `Condition` objects (via `lock.newCondition()`) allow fine-grained thread communication.
- Similar to `wait()`/`notify()`, but more flexible.

```java
import java.util.concurrent.locks.Condition;

class BoundedBuffer {
    private final Lock lock = new ReentrantLock();
    private final Condition notFull = lock.newCondition();
    private final Condition notEmpty = lock.newCondition();
    private final int[] items = new int[5];
    private int count, putPtr, takePtr;

    public void put(int x) throws InterruptedException {
        lock.lock();
        try {
            while (count == items.length) notFull.await();
            items[putPtr] = x;
            putPtr = (putPtr + 1) % items.length;
            count++;
            notEmpty.signal();
        } finally {
            lock.unlock();
        }
    }

    public int take() throws InterruptedException {
        lock.lock();
        try {
            while (count == 0) notEmpty.await();
            int x = items[takePtr];
            takePtr = (takePtr + 1) % items.length;
            count--;
            notFull.signal();
            return x;
        } finally {
            lock.unlock();
        }
    }
}
```

---

## 3. Example: Producer-Consumer with ReentrantLock

```java
class ProducerConsumer {
    private final Lock lock = new ReentrantLock();
    private final Condition notFull = lock.newCondition();
    private final Condition notEmpty = lock.newCondition();
    private final int[] buffer = new int[5];
    private int count, putPtr, takePtr;

    public void produce(int value) throws InterruptedException {
        lock.lock();
        try {
            while (count == buffer.length) notFull.await();
            buffer[putPtr] = value;
            putPtr = (putPtr + 1) % buffer.length;
            count++;
            System.out.println("Produced: " + value);
            notEmpty.signal();
        } finally {
            lock.unlock();
        }
    }

    public int consume() throws InterruptedException {
        lock.lock();
        try {
            while (count == 0) notEmpty.await();
            int value = buffer[takePtr];
            takePtr = (takePtr + 1) % buffer.length;
            count--;
            System.out.println("Consumed: " + value);
            notFull.signal();
            return value;
        } finally {
            lock.unlock();
        }
    }
}

public class Main {
    public static void main(String[] args) {
        ProducerConsumer pc = new ProducerConsumer();

        Runnable producer = () -> {
            for (int i = 0; i < 10; i++) {
                try {
                    pc.produce(i);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        };

        Runnable consumer = () -> {
            for (int i = 0; i < 10; i++) {
                try {
                    pc.consume();
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        };

        new Thread(producer).start();
        new Thread(consumer).start();
    }
}
```

---

## 4. Interview Focus: Synchronized vs ReentrantLock

| Aspect                | synchronized                | ReentrantLock                 |
|------------------------|-----------------------------|-------------------------------|
| Acquisition           | Implicit (monitor)          | Explicit (`lock()`)           |
| Release               | Automatic                   | Manual (`unlock()` required)  |
| Fairness              | Not possible                | Fair or non-fair              |
| Try/Timeout Lock      | Not available               | Available (`tryLock()`)       |
| Condition Variables   | Single (`wait/notify`)      | Multiple (`Condition`)        |
| Readability           | Simple                      | Verbose but flexible          |

---

## Conclusion
- `ReentrantLock` provides **greater control** than `synchronized`, with features like fairness, tryLock, and conditions.  
- However, it requires **manual discipline** (must unlock).  
- For most cases, `synchronized` is enough. Use `ReentrantLock` when advanced features are needed.

