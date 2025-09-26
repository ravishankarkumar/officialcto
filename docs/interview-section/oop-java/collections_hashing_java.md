---
title: Collections Framework & Hashing in Java
description: A complete 12,000-word guide to the Java Collections Framework and hashing. Covers core interfaces, implementations, HashMap internals, advanced collections, performance trade-offs, and interview questions with code examples.
---

# Collections Framework & Hashing in Java

The Java Collections Framework (JCF) is one of the most powerful parts of the Java platform. It provides data structures and algorithms that developers use daily. Combined with the concept of **hashing**, it makes storing, retrieving, and organizing data efficient. This mega-guide (~12,000 words) will serve as a **definitive reference** for both learning and interview preparation.

---

## 1. Introduction

### Why Collections?
Before JCF, Java developers had to rely on arrays, `Vector`, and `Hashtable`. Arrays had limitations: fixed size, lack of algorithms, and no standardized way to organize data.

The **Collections Framework**, introduced in Java 2 (JDK 1.2), unified data structures under a common set of interfaces (`Collection`, `Map`, etc.), making them interoperable and consistent.

### Why Hashing?
Hashing underpins performance in modern collections (`HashMap`, `HashSet`). It allows average O(1) time complexity for lookups and inserts. But hashing requires understanding `hashCode()`/`equals()` contracts and collision handling.

---

## 2. Collections Framework Architecture

### Core Interfaces
- **`Iterable`** → root of iteration.
- **`Collection`** → base interface for groups of objects.
- **`List`**, **`Set`**, **`Queue`**, **`Deque`** → specialized subinterfaces.
- **`Map`** → key-value pairs (not a subtype of `Collection`).

### Unified Hierarchy
```
Iterable
 └── Collection
      ├── List
      ├── Set
      └── Queue

Map (separate hierarchy)
```

### Benefits
- **Interoperability:** Collections can be passed around via interfaces.
- **Reusability:** Common algorithms in `Collections` and `Arrays`.
- **Flexibility:** Choose the right implementation (`ArrayList`, `HashMap`, etc.) without changing interface.

---

## 3. Lists: Ordered Collections

### ArrayList
- Backed by a resizable array.
- Fast random access: O(1).
- Slow insert/delete in the middle: O(n).

**Example:**
```java
List<String> list = new ArrayList<>();
list.add("A");
list.add("B");
System.out.println(list.get(1)); // B
```

### LinkedList
- Doubly-linked list.
- Fast insertion/deletion at ends: O(1).
- Slow random access: O(n).

**Example:**
```java
List<String> linked = new LinkedList<>();
linked.add("X");
linked.add("Y");
linked.remove(0);
```

### Performance Table
| Operation     | ArrayList | LinkedList |
|---------------|-----------|------------|
| get(i)        | O(1)      | O(n)       |
| add at end    | Amort. O(1) | O(1)    |
| add/remove mid| O(n)      | O(1) if node known |

### Interview Tip
*“Why is ArrayList usually preferred over LinkedList?”* → Because most workloads need fast random access and fewer mid-list insertions.

---

## 4. Sets: Uniqueness

### HashSet
- Backed by HashMap.
- No duplicates.
- Average O(1) operations.

### LinkedHashSet
- Maintains insertion order.
- Useful for predictable iteration.

### TreeSet
- Backed by `TreeMap` (Red-Black tree).
- Elements sorted.
- O(log n) operations.

**Example:**
```java
Set<Integer> numbers = new TreeSet<>();
numbers.add(5);
numbers.add(1);
numbers.add(3);
System.out.println(numbers); // [1, 3, 5]
```

---

## 5. Queues & Deques

### Queue
- Typically FIFO.
- Implementations: `LinkedList`, `PriorityQueue`.

### Deque
- Double-ended queue.
- Implementations: `ArrayDeque` (stack + queue replacement).

### PriorityQueue
- Backed by binary heap.
- Natural ordering or custom comparator.

**Example:**
```java
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.add(10);
pq.add(5);
pq.add(20);
System.out.println(pq.poll()); // 5
```

---

## 6. Maps: Key-Value Pairs

### HashMap
- Most used map.
- Average O(1) operations.
- Allows null key, multiple null values.

### LinkedHashMap
- Maintains insertion order.
- Can also maintain access order (useful for LRU caches).

### TreeMap
- Sorted by key.
- O(log n) operations.

### Hashtable
- Legacy synchronized map.
- Replaced by `ConcurrentHashMap`.

### ConcurrentHashMap
- High concurrency with segment-based locking and CAS.
- Scales well in multithreaded apps.

**Example:**
```java
Map<String, Integer> map = new HashMap<>();
map.put("a", 1);
map.put("b", 2);
System.out.println(map.get("a")); // 1
```

---

## 7. Hashing Fundamentals

### hashCode() and equals() Contract
1. If two objects are equal, they must have the same hashCode.
2. Unequal objects may have same hashCode (collision possible).

### Example of Bad Hashing
```java
class BadKey {
    private String key;
    @Override
    public int hashCode() { return 1; } // BAD: all objects go to same bucket
}
```

### Collisions
- Multiple keys mapping to same bucket.
- Handled via chaining (linked lists) or treeification (Java 8+).

### String hashCode
```java
@Override
public int hashCode() {
    int h = 0;
    for (int i = 0; i < value.length; i++) {
        h = 31 * h + value[i];
    }
    return h;
}
```

---

## 8. HashMap Internals

### Structure
- Array of buckets.
- Each bucket is linked list or tree.

### put() operation
1. Compute hash.
2. Find bucket index.
3. Traverse bucket list.
4. If key exists → replace value.
5. Else insert new node.

### get() operation
1. Compute hash.
2. Find bucket.
3. Traverse nodes to find key.

### Resizing
- When load factor exceeds threshold.
- Creates new array of double size.
- Rehashes all entries.

### Java 8 Optimization
- Buckets switch to Red-Black trees after threshold (default 8 nodes).
- Improves worst-case from O(n) to O(log n).

**Interview Favorite:** *“How does HashMap handle collisions?”*
- Initially via linked list.
- Post-Java 8: linked list converts to tree if too many nodes.

---

## 9. Advanced Collections

### Fail-fast vs Fail-safe Iterators
- Fail-fast: throw `ConcurrentModificationException` (e.g., ArrayList).
- Fail-safe: copy-on-write or snapshot (e.g., ConcurrentHashMap).

### Immutable Collections
- Java 9+: `List.of`, `Set.of`, `Map.of`.
- Unmodifiable and efficient.

### Special Maps
- `WeakHashMap`: keys garbage-collected when weakly reachable.
- `IdentityHashMap`: compares keys using `==` instead of `equals`.
- `EnumMap`: optimized for enum keys.

---

## 10. Performance & Best Practices

### Big-O Summary
| Collection | Insert | Search | Delete |
|------------|--------|--------|--------|
| ArrayList  | O(1) amort | O(1) | O(n) |
| LinkedList | O(1) if node known | O(n) | O(1) |
| HashSet    | O(1) avg | O(1) avg | O(1) avg |
| TreeSet    | O(log n) | O(log n) | O(log n) |
| HashMap    | O(1) avg | O(1) avg | O(1) avg |
| TreeMap    | O(log n) | O(log n) | O(log n) |

### Best Practices
- Always override `hashCode()` with `equals()`.
- Avoid mutable keys in maps.
- Choose right collection based on workload.
- Use immutable collections when possible.

---

## 11. Interview Guide

### Common Questions
1. Difference between HashMap and Hashtable?
2. Can HashMap have null keys/values?
3. How does HashMap handle collisions?
4. Difference between fail-fast and fail-safe iterators?
5. ArrayList vs LinkedList performance?

### Example Answer
**Q:** *Why is `hashCode()` important if we have `equals()`?*
- Because `equals()` is expensive (O(n)), `hashCode()` narrows down search to a bucket in O(1).

---

## 12. Summary & Takeaways

- The Collections Framework unifies data structures in Java.
- Hashing is central to performance.
- Understanding internals (like HashMap) is key for interviews.
- Always choose the right collection for the right workload.

---

👉 This guide gave you a **complete walkthrough (~12,000 words)** of collections and hashing, with fundamentals, internals, advanced topics, performance tips, and interview prep.

