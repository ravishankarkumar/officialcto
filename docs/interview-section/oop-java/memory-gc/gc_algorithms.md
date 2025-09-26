---
title: Garbage Collection Algorithms
---

# Garbage Collection Algorithms

Efficient memory management is one of the most critical aspects of modern programming languages and runtime environments. Garbage Collection (GC) ensures that unused memory is reclaimed automatically, freeing developers from manual memory management while preventing memory leaks and dangling pointers. In this post, we’ll explore **common GC algorithms**, their trade-offs, and how they appear in practice.

---

## Stop-the-World & Safepoints

Before diving into specific algorithms, it’s important to understand how garbage collection interacts with a running program.

- **Stop-the-World (STW):** During a GC cycle, the program (mutator) must pause so that the collector can safely examine and manipulate memory. This is called a stop-the-world event.
- **Safepoints:** A safepoint is a well-defined location in the program execution where all threads can be paused without risk of inconsistent state. The collector waits until all active threads reach a safepoint before starting collection.

👉 **Interview Tip:** Expect questions like: *“Why does GC require a stop-the-world pause?”* Answer: Because object graphs must be scanned in a consistent state; otherwise, mutator threads may change object references mid-collection.

---

## Mark-and-Sweep

This is the classic garbage collection algorithm.

1. **Mark phase:** Traverse the object graph starting from root references (stack variables, global variables, registers). Mark all reachable objects.
2. **Sweep phase:** Linearly scan the heap, reclaiming memory from unmarked (unreachable) objects.

**Pros:**
- Simple to implement.
- Works well when fragmentation isn’t severe.

**Cons:**
- Leaves fragmentation in memory.
- Requires full heap scan → potentially long pauses.

---

## Copying Collection

Instead of sweeping, this algorithm divides the heap into two regions: **from-space** and **to-space**.

1. Active objects are copied from the from-space into to-space.
2. The roles of the spaces are swapped.

**Pros:**
- Compacts memory automatically (no fragmentation).
- Allocation is fast (just bump a pointer).

**Cons:**
- Requires double the memory space.
- Copying cost can be high if many live objects exist.

---

## Mark-Compact

This is a hybrid between mark-and-sweep and copying.

1. Mark live objects (like mark-and-sweep).
2. Instead of sweeping, compact them by sliding live objects together and updating references.

**Pros:**
- Avoids fragmentation.
- Doesn’t require double memory like copying collectors.

**Cons:**
- Compaction phase is expensive (updating all references).
- Still stop-the-world.

---

## Generational Garbage Collection

Most modern garbage collectors are **generational**.

### Key Observations (Generational Hypothesis):
1. Most objects die young (e.g., temporary variables, short-lived objects).
2. Objects that survive multiple collections tend to live longer.

### Heap Division:
- **Young Generation:** Newly allocated objects.
- **Old Generation (Tenured):** Objects that survive multiple collections.

### Process:
- **Minor GC:** Collects only the young generation. Fast, frequent, usually a copying collector.
- **Major (Full) GC:** Collects both young and old generations. More expensive.

👉 **Interview Tip:** When asked *“Why generational GC?”*, highlight that by focusing on the young generation, collections are **smaller and faster**, reducing overall pause times.

---

## Example: GC Logs (Minor vs Major)

A sample GC log from a JVM-based system:

```
[GC (Allocation Failure) [PSYoungGen: 1024K->128K(1536K)] 2048K->1152K(5632K), 0.0045 secs]
[Full GC (Ergonomics) [PSYoungGen: 128K->0K(1536K)] [ParOldGen: 1024K->512K(4096K)] 1152K->512K(5632K), [Metaspace: 2560K->2560K(1056768K)], 0.035 secs]
```

Explanation:
- **Minor GC:** Young generation shrank from 1024K to 128K.
- **Full GC:** Both young and old generations were collected, reducing total usage from 1152K to 512K.

---

## Interview Focus: Generational GC

- **Question:** *“Explain how generational GC works.”*
- **Answer Outline:**
  1. Heap divided into young and old generations.
  2. Minor collections focus on the young generation, copying survivors into the old generation.
  3. Full collections occasionally reclaim old generation as well.
  4. Improves performance since most objects die young.

---

## Summary

- **Stop-the-world pauses** are unavoidable but can be optimized.
- **Mark-and-sweep** is simple but suffers fragmentation.
- **Copying collectors** solve fragmentation but cost memory.
- **Mark-compact** avoids double memory but is slower due to reference updates.
- **Generational GC** dominates in modern runtimes by exploiting object lifetime patterns.

👉 If you’re preparing for interviews, always be ready to explain **why generational GC reduces pause times** and provide a sample GC log interpretation.

