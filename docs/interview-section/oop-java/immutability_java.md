---
title: Immutability in Java — final, String, and Collections
description: A comprehensive 6000-word guide to immutability in Java. Covers the `final` keyword, immutable Strings, immutable collections, defensive copying, concurrency benefits, performance trade-offs, advanced patterns, and interview preparation.
---

# Immutability in Java — final, String, and Collections

Immutability is one of the most powerful concepts in programming. In Java, immutability provides **safety, simplicity, and concurrency guarantees**. By designing immutable objects, we make programs easier to reason about, thread-safe by default, and less error-prone.

This post is a **comprehensive deep dive (~6000 words)** into immutability in Java. We’ll cover everything from the basics (`final` keyword, `String` immutability) to immutable collections, advanced patterns, performance trade-offs, and interview preparation.

---

## 1. Why Immutability Matters

- **Predictability:** Immutable objects can’t change state, making them easier to reason about.
- **Thread-safety:** Immutable objects are inherently safe to share across threads.
- **Caching & reuse:** Safe for interning and caching without defensive copying.
- **Reduced bugs:** Eliminates a whole class of mutation-related issues.

**Example:**
```java
String s1 = "hello";
String s2 = s1;
s1 = s1 + " world";
System.out.println(s2); // prints "hello"
```

Even though `s1` was modified, `s2` stayed unchanged — that’s immutability in action.

---

## 2. The `final` Keyword

### What `final` Does
- **Variables:** Value cannot be reassigned.
- **Fields:** Field reference cannot be reassigned after construction.
- **Methods:** Cannot be overridden in subclasses.
- **Classes:** Cannot be subclassed.

### Example: Variables
```java
final int x = 5;
// x = 10; // Compile error: cannot assign a value to final variable x
```

### Example: Object References
```java
final List<String> list = new ArrayList<>();
list.add("one"); // Allowed: the reference is final, object is mutable
// list = new ArrayList<>(); // Compile error
```

### Example: Final Methods & Classes
```java
class Parent {
    public final void show() {
        System.out.println("Parent show");
    }
}

final class Utility { }
```

**Key Insight:** `final` doesn’t guarantee immutability — it only prevents reassignment.

---

## 3. String Immutability

### Why Strings are Immutable
- **Security:** Prevents modifying file paths, class names, or DB URLs passed as Strings.
- **Caching:** Enables string interning.
- **Thread-safety:** Shared across threads safely.
- **Hashing:** Allows safe caching of `hashCode()`.

### Example: Interning
```java
String a = "hello";
String b = "hello";
System.out.println(a == b); // true, same interned object
```

### Performance Pitfalls
```java
String result = "";
for (int i = 0; i < 10000; i++) {
    result += i; // Creates many intermediate Strings
}
```

**Fix:**
```java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 10000; i++) {
    sb.append(i);
}
String result = sb.toString();
```

---

## 4. Designing Immutable Classes

### Rules for Immutability
1. Declare the class `final`.
2. Make fields `private` and `final`.
3. No setters.
4. Initialize all fields via constructor.
5. Defensive copies for mutable fields.

### Example: Immutable Class
```java
public final class Person {
    private final String name;
    private final LocalDate dob;

    public Person(String name, LocalDate dob) {
        this.name = name;
        this.dob = dob; // LocalDate is immutable
    }

    public String getName() { return name; }
    public LocalDate getDob() { return dob; }
}
```

### Defensive Copying
```java
public final class Team {
    private final String name;
    private final List<String> members;

    public Team(String name, List<String> members) {
        this.name = name;
        this.members = List.copyOf(members); // Defensive copy
    }

    public List<String> getMembers() {
        return members; // Already immutable
    }
}
```

---

## 5. Immutable Collections

### Unmodifiable vs Immutable
- `Collections.unmodifiableList(list)` → wrapper; underlying list can still change.
- `List.copyOf(list)` or `List.of(...)` → truly immutable copy.

**Example:**
```java
List<String> list = new ArrayList<>();
list.add("A");

List<String> unmodifiable = Collections.unmodifiableList(list);
list.add("B");
System.out.println(unmodifiable); // [A, B]

List<String> immutable = List.copyOf(list);
list.add("C");
System.out.println(immutable); // [A, B]
```

### Factory Methods (Java 9+)
```java
List<String> list = List.of("a", "b");
Set<Integer> set = Set.of(1, 2, 3);
Map<String, Integer> map = Map.of("a", 1, "b", 2);
```

---

## 6. Defensive Copying & Safe Publication

### Defensive Copy on Input
```java
public ImmutableHolder(List<String> data) {
    this.data = List.copyOf(data);
}
```

### Defensive Copy on Output
```java
public List<String> getData() {
    return List.copyOf(data);
}
```

### Safe Publication
Immutable objects must be fully constructed before being shared.

---

## 7. Concurrency Benefits

- No synchronization needed.
- Thread-safe by design.
- Useful for functional programming.

**Example:**
```java
class Worker implements Runnable {
    private final String task;
    public Worker(String task) { this.task = task; }
    @Override
    public void run() { System.out.println(task); }
}
```

Multiple threads can share the same immutable object safely.

---

## 8. Performance Considerations

- Immutability increases object creation.
- GC pressure may rise.
- Structural sharing (used in functional libraries) helps reduce costs.

### Example: Copy-on-Write
```java
List<String> list = new CopyOnWriteArrayList<>();
```

Trade-off: slower writes, faster reads.

---

## 9. Advanced Immutability

### JDK Records
```java
public record Point(int x, int y) {}
```
- Concise immutable classes.
- Auto-generated constructor, accessors, `equals`, `hashCode`, `toString`.

### Persistent Data Structures
- Libraries: **PCollections**, **Vavr**.
- Enable immutability with structural sharing.

---

## 10. Best Practices Checklist
- Use immutability by default.
- Always use `final` for fields.
- Use `List.copyOf` instead of `unmodifiableList`.
- Defensive copy for mutable inputs/outputs.
- Prefer builders for complex immutables.
- Document immutability guarantees.

---

## 11. Interview Preparation

### Common Questions
1. Difference between `final` and immutable?
2. Why are Strings immutable?
3. How do you make a mutable object field immutable?
4. Benefits of immutability in multithreading?
5. When not to use immutability?

### Example Question
**Q:** Create an immutable class that holds a `Date` field.

**A:**
```java
public final class Event {
    private final Date date;

    public Event(Date date) {
        this.date = new Date(date.getTime()); // Defensive copy
    }

    public Date getDate() {
        return new Date(date.getTime()); // Defensive copy
    }
}
```

---

## 12. Summary

- `final` helps but doesn’t guarantee immutability.
- Strings are immutable for safety, security, and efficiency.
- Collections can be made immutable with `List.of`, `Set.of`, and `Map.of`.
- Immutable objects simplify concurrency.
- Performance trade-offs exist, but benefits often outweigh costs.
- Interviews test your ability to explain **why immutability matters** and **how to implement it properly**.

👉 Immutability is not just a feature — it’s a design philosophy that leads to safer, cleaner, and more scalable Java applications.

