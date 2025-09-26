---
title: Read-Write & Stamped Locks
description: Deep dive into ReadWriteLock (ReentrantReadWriteLock) and StampedLock, with examples, use-cases, trade-offs, and interview focus.
---

# Read-Write & Stamped Locks

This post explains Java's **ReadWriteLock** (via `ReentrantReadWriteLock`) and **StampedLock** (Java 8), when to use them, and how they compare to other synchronization primitives. It includes example implementations for a simple cache and interview-focused guidance.

---

## Why read-write locks?

Many systems are **read-heavy**: multiple threads concurrently read the same data while writes are rare. A **ReadWriteLock** allows:

- **Multiple readers** to access the data concurrently (no mutual exclusion for reads).
- **A single writer** to have exclusive access (writers block readers and other writers).

This improves throughput for read-heavy workloads compared to a single mutual-exclusion lock (`synchronized` or `ReentrantLock`) which serializes both reads and writes.

---

## ReentrantReadWriteLock

### Key features
- Two separate locks: `readLock()` and `writeLock()`.
- Reentrant: a thread can reacquire the same lock it already holds.
- Supports fairness policy via constructor (fair vs non-fair).

### Basic usage
```java
import java.util.concurrent.locks.ReentrantReadWriteLock;
import java.util.Map;
import java.util.HashMap;

public class ReadWriteCache<K,V> {
    private final Map<K,V> map = new HashMap<>();
    private final ReentrantReadWriteLock rw = new ReentrantReadWriteLock();

    public V get(K key) {
        rw.readLock().lock();
        try {
            return map.get(key);
        } finally {
            rw.readLock().unlock();
        }
    }

    public void put(K key, V value) {
        rw.writeLock().lock();
        try {
            map.put(key, value);
        } finally {
            rw.writeLock().unlock();
        }
    }
}
```

### Use cases
- Thread-safe caches (many reads, few writes).
- Config data readers updated rarely.
- File metadata access where reads dominate.

### Trade-offs & caveats
- **Write starvation**: continuous readers can starve writers (unless fair lock is used).
- **Complexity**: more error-prone than `synchronized` if not careful with lock ordering.
- **Overhead**: acquiring read locks has some overhead; beneficial only when reads significantly outnumber writes.

---

## StampedLock (Java 8)

`StampedLock` provides three modes:
- **Write lock** (`writeLock()`): exclusive, like writeLock above.
- **Read lock** (`readLock()`): shared read lock.
- **Optimistic read** (`tryOptimisticRead()`): a *non-blocking* read that may be validated later.

### Optimistic read pattern
Optimistic reads are fast because they don't block writers. After reading, the thread must validate that no write occurred during the read using `validate(stamp)`.

Example:
```java
import java.util.concurrent.locks.StampedLock;
import java.util.Map;
import java.util.HashMap;

public class StampedCache<K,V> {
    private final Map<K,V> map = new HashMap<>();
    private final StampedLock sl = new StampedLock();

    public V get(K key) {
        long stamp = sl.tryOptimisticRead();
        V value = map.get(key);
        if (!sl.validate(stamp)) {
            // Fallback to read lock
            stamp = sl.readLock();
            try {
                value = map.get(key);
            } finally {
                sl.unlockRead(stamp);
            }
        }
        return value;
    }

    public void put(K key, V value) {
        long stamp = sl.writeLock();
        try {
            map.put(key, value);
        } finally {
            sl.unlockWrite(stamp);
        }
    }
}
```

### Benefits
- **Lower contention** for reads: optimistic reads avoid locking in the common case.
- **Performance**: very effective for high-read low-write workloads with short critical sections.

### Caveats
- **Not reentrant**: `StampedLock` is not reentrant; the same thread cannot reacquire a stamp.
- **Complexity**: optimistic pattern requires validation and a fallback path, increasing code complexity.
- **Spinning & retries**: in high-write scenarios, optimistic reads often fail and fall back, reducing benefit.

---

## Example: Simple cache with expiry using ReentrantReadWriteLock

```java
import java.util.concurrent.locks.ReentrantReadWriteLock;
import java.util.Map;
import java.util.HashMap;

public class ExpiringCache<K,V> {
    private final Map<K, V> map = new HashMap<>();
    private final Map<K, Long> expiry = new HashMap<>();
    private final ReentrantReadWriteLock rw = new ReentrantReadWriteLock();

    public V get(K key) {
        rw.readLock().lock();
        try {
            Long exp = expiry.get(key);
            if (exp == null || exp < System.currentTimeMillis()) {
                return null;
            }
            return map.get(key);
        } finally {
            rw.readLock().unlock();
        }
    }

    public void put(K key, V value, long ttlMillis) {
        rw.writeLock().lock();
        try {
            map.put(key, value);
            expiry.put(key, System.currentTimeMillis() + ttlMillis);
        } finally {
            rw.writeLock().unlock();
        }
    }
}
```

---

## Interview Focus: When to prefer RWLock or StampedLock?

- Prefer **ReentrantReadWriteLock** when:
  - Reads greatly outnumber writes.
  - Simpler semantics and reentrancy are beneficial.
  - You need fairness options to avoid writer starvation.

- Consider **StampedLock** when:
  - You need the absolute best read throughput.
  - You can handle non-reentrancy and added complexity.
  - Read operations are short and you can tolerate occasional retry/fallback.

- Use **synchronized / simple locks** when:
  - Simplicity is more important than throughput.
  - Contention is low or predictable.

### Talking points in interviews
- Explain why RW locks increase concurrency for read-heavy workloads.
- Describe write-starvation and how fairness vs bias affects performance.
- Show understanding of optimistic reads (StampedLock) and when they fail (frequent writes).
- Discuss reentrancy and why StampedLock is not suitable for code that relies on reentrant behavior.

---

## Performance considerations
- Measure before optimizing: lock overhead vs contention matters.
- For highly read-heavy workloads, RW locks usually help — but if reads are extremely cheap, the lock overhead may not pay off.
- For mixed workloads, profile optimistic reads vs read-lock fallback under realistic write rates.

---

## Summary
- **ReentrantReadWriteLock**: easy-to-use read/write separation; reentrant; appropriate for many caches/config data.
- **StampedLock**: offers optimistic reads for improved throughput but comes with complexity and no reentrancy.
- Choose the tool based on **read/write ratio**, **need for reentrancy**, and **code complexity tolerance**.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
