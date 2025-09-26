---
title: Streams API in Java
description: A 6,000-word deep dive into the Java Streams API. Covers creation, intermediate and terminal operations, parallel streams, performance considerations, real-world examples, and interview preparation.
---

# Streams API in Java

The **Streams API**, introduced in Java 8, brought functional-style operations to collections and data processing. Streams provide a powerful way to **transform, filter, and aggregate data** in a declarative, readable manner. This post (~6,000 words) will explore streams in depth, from basics to advanced usage, with real-world examples and interview prep.

---

## 1. Introduction to Streams

### Collections vs Streams
- **Collections**: store data (e.g., `List`, `Set`, `Map`).
- **Streams**: describe *computation on data*.
  - Collections = *data at rest*.
  - Streams = *data in motion*.

**Example:**
```java
List<String> names = Arrays.asList("Tom", "Jerry", "Mickey");
List<String> upper = names.stream()
                          .map(String::toUpperCase)
                          .toList();
```

### Stream Pipeline Concept
A stream pipeline consists of:
1. **Source** → collection, array, generator, file.
2. **Intermediate operations** → transform stream (lazy).
3. **Terminal operation** → produces result (eager).

---

## 2. Creating Streams

### From Collections
```java
List<String> list = List.of("a", "b", "c");
Stream<String> s = list.stream();
Stream<String> ps = list.parallelStream();
```

### From Arrays
```java
String[] arr = {"x", "y", "z"};
Stream<String> s = Arrays.stream(arr);
```

### Using Stream.of
```java
Stream<Integer> s = Stream.of(1, 2, 3, 4);
```

### Infinite Streams
- `generate()` → supplier-based.
```java
Stream<Double> randoms = Stream.generate(Math::random);
```

- `iterate()` → seed + function.
```java
Stream<Integer> nums = Stream.iterate(1, n -> n + 1);
```

Use `limit()` to bound infinite streams.

### Stream Builder
```java
Stream<String> s = Stream.<String>builder()
    .add("one").add("two").build();
```

---

## 3. Intermediate Operations

### map
Transform elements.
```java
Stream.of("a", "bb", "ccc")
      .map(String::length)
      .forEach(System.out::println);
```

### filter
Keep elements matching predicate.
```java
Stream.of(1,2,3,4,5)
      .filter(n -> n % 2 == 0)
      .forEach(System.out::println);
```

### flatMap
Flatten nested streams.
```java
List<List<Integer>> list = List.of(List.of(1,2), List.of(3,4));
list.stream().flatMap(List::stream).forEach(System.out::println);
```

### distinct
Remove duplicates.
```java
Stream.of(1,2,2,3,3)
      .distinct()
      .forEach(System.out::println);
```

### sorted
```java
Stream.of("c","a","b")
      .sorted()
      .forEach(System.out::println);
```

### limit
```java
Stream.iterate(1, n -> n+1)
      .limit(5)
      .forEach(System.out::println);
```

### peek
For debugging.
```java
Stream.of("x","y")
      .peek(e -> System.out.println("Processing: " + e))
      .forEach(System.out::println);
```

---

## 4. Terminal Operations

### forEach
```java
Stream.of("a","b").forEach(System.out::println);
```

### collect
```java
List<String> list = Stream.of("a","b")
                          .collect(Collectors.toList());
```

### reduce
Aggregate values.
```java
int sum = Stream.of(1,2,3).reduce(0, Integer::sum);
```

### min / max
```java
Optional<Integer> max = Stream.of(1,5,2).max(Integer::compare);
```

### count
```java
long c = Stream.of(1,2,3).count();
```

### anyMatch / allMatch
```java
boolean hasEven = Stream.of(1,2,3).anyMatch(n -> n % 2 == 0);
```

### Collectors
- `toList`, `toSet`, `toMap`.
- `groupingBy`.
- `partitioningBy`.
- `joining`.

**Example:**
```java
Map<Integer, List<String>> byLength =
    Stream.of("a","bb","ccc")
          .collect(Collectors.groupingBy(String::length));
```

---

## 5. Parallel Streams

### When to Use
- CPU-intensive tasks.
- Large data sets.

### ForkJoinPool Under the Hood
- Parallel streams use common ForkJoinPool.
- Work is split into subtasks.

### Pitfalls
- Not efficient for small data.
- Order-sensitive operations may behave differently.
- Thread-safety required for shared state.

---

## 6. Performance Considerations

### Laziness
- Intermediate ops are lazy.
- No work until terminal operation.

### Short-circuiting
- `limit`, `anyMatch` can terminate early.

### Loops vs Streams
- Loops may be simpler/faster for trivial cases.
- Streams shine for readability and complex pipelines.

---

## 7. Real-World Examples

### CSV File Parsing
```java
try (Stream<String> lines = Files.lines(Paths.get("data.csv"))) {
    lines.map(l -> l.split(","))
         .map(arr -> new Person(arr[0], arr[1]))
         .forEach(System.out::println);
}
```

### Group Employees by Department
```java
Map<String, List<Employee>> grouped = employees.stream()
    .collect(Collectors.groupingBy(Employee::getDepartment));
```

### Word Frequency Count
```java
Map<String, Long> freq = Files.lines(Paths.get("text.txt"))
    .flatMap(line -> Arrays.stream(line.split(" ")))
    .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
```

---

## 8. Interview Section

### Q1: Difference between map and flatMap?
- `map`: transforms one element → one result.
- `flatMap`: transforms one element → many results, then flattens.

### Q2: Why are streams lazy?
- Intermediate operations don’t execute until a terminal op.
- Optimizes pipeline (fuses operations).

### Q3: Parallel streams vs sequential — when to use?
- Use parallel for large, CPU-intensive workloads.
- Avoid for small tasks, IO-bound tasks, or when ordering matters.

---

## Summary
- Streams separate data from computation.
- Pipelines: source → intermediate ops → terminal op.
- Rich operators: map, filter, flatMap, reduce, collect.
- Parallel streams can help but must be used wisely.
- Interview focus: **map vs flatMap, laziness, parallel vs sequential**.

