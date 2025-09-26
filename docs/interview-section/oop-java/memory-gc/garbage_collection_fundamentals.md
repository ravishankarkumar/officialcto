---
title: Garbage Collection Fundamentals in Java
description: Learn the fundamentals of Garbage Collection in Java, including why GC is needed, reference counting vs tracing collectors, GC roots, reachability analysis, and reference types, with interview insights.
---

# Garbage Collection Fundamentals in Java

Garbage Collection (GC) is a cornerstone of Java’s memory management model. It frees developers from the burden of manual memory management, reducing memory leaks and dangling pointers, while introducing its own performance trade-offs.

---

## 1. Why Garbage Collection?

In languages like C/C++, developers manually allocate (`malloc`) and free (`free`) memory. Errors such as double-free, memory leaks, and dangling pointers are common.

Java automates this process:
- The JVM automatically reclaims memory occupied by objects that are **no longer reachable**.
- Reduces programmer errors and improves reliability.
- However, GC introduces **runtime overhead** and pauses.

**Interview Angle**: Why Java uses GC → To improve safety and developer productivity, trading some performance overhead.

---

## 2. Reference Counting vs Tracing Collectors

### Reference Counting
- Each object has a counter tracking references.
- When counter → 0, object is eligible for collection.
- **Problem**: Cannot handle **cyclic references** (e.g., two objects referring to each other).

### Tracing Collectors (Used in JVM)
- GC starts from **GC Roots** and marks reachable objects.
- Unreachable objects are reclaimed.
- Handles cyclic references naturally.

**Interview Angle**: JVM avoids reference counting due to cyclic references.

---

## 3. GC Roots & Reachability Analysis

GC uses a **graph traversal** from special objects called **GC Roots**.

### GC Roots include:
- Local variables on the **stack**.
- Active **thread objects**.
- Static variables in the **method area**.
- JNI references (native code).

Objects reachable from these roots are **alive**; others are **garbage**.

Example:
```
Thread → Local Variable → Object A → Object B
```  
If A is reachable, B is also kept alive.

**Interview Angle**: Q: *How does Java decide which objects to collect?*  
A: By performing reachability analysis from GC Roots.

---

## 4. Types of References

Java provides different reference strengths, affecting GC eligibility.

- **Strong Reference**: Normal references (e.g., `Object obj = new Object();`).  
  - Never collected as long as reachable.  
- **Soft Reference** (`SoftReference<T>`):  
  - Collected **only if memory is low**. Useful for caches.  
- **Weak Reference** (`WeakReference<T>`):  
  - Collected eagerly in next GC cycle. Useful for maps with temporary keys (`WeakHashMap`).  
- **Phantom Reference** (`PhantomReference<T>`):  
  - Always collected; used with `ReferenceQueue` to know when object’s memory is freed.

**Example**:
```java
Object strong = new Object();  // Strong ref
SoftReference<Object> soft = new SoftReference<>(new Object());
WeakReference<Object> weak = new WeakReference<>(new Object());
PhantomReference<Object> phantom = new PhantomReference<>(new Object(), new ReferenceQueue<>());
```

---

## 5. Interview Focus

**Common Questions**:
1. Why does JVM prefer reachability analysis over reference counting?  
2. What are **GC Roots**? Examples?  
3. Difference between **strong**, **soft**, **weak**, and **phantom** references?  
4. When would you use `WeakHashMap`?  

**Key Point**: Java determines collectable objects using **reachability from GC Roots**.

---

## Conclusion

Garbage Collection simplifies development by removing the need for manual memory management. The JVM relies on **tracing collectors** and **reachability analysis**, with different reference strengths influencing GC decisions.

In the next post, we’ll dive into **GC Algorithms (Serial, Parallel, G1, ZGC, Shenandoah)** and when to use them.

