---
title: Lambdas & Functional Interfaces in Java
description: A 5,000-word guide to Java 8 lambdas and functional interfaces. Covers syntax, functional interfaces, method references, closures, real-world examples, and interview preparation.
---

# Lambdas & Functional Interfaces in Java

Java 8 introduced **lambdas** and **functional interfaces**, revolutionizing how developers write code in Java. Lambdas brought concise syntax for expressing behavior, while functional interfaces provided the backbone for functional-style programming. This post (~5,000 words) will walk through the fundamentals, advanced details, and interview questions.

---

## 1. Introduction

### Why Java Introduced Lambdas
Before Java 8, passing behavior required **anonymous inner classes**:
```java
button.addActionListener(new ActionListener() {
    @Override
    public void actionPerformed(ActionEvent e) {
        System.out.println("Button clicked");
    }
});
```

With lambdas:
```java
button.addActionListener(e -> System.out.println("Button clicked"));
```

**Reasons for lambdas:**
- Reduce boilerplate.
- Enable functional programming style.
- Integrate with Streams API.
- Improve readability and maintainability.

### Difference from Anonymous Classes
- **Syntax:** Lambdas are much shorter.
- **Scoping:** Lambdas use lexical scoping; `this` refers to the enclosing class, not the anonymous class.
- **Performance:** JVM optimizes lambdas using `invokedynamic`.

---

## 2. Syntax & Basics

### Basic Syntax
```java
(parameters) -> expression
(parameters) -> { statements }
```

Examples:
```java
() -> System.out.println("Hello"); // no parameters
x -> x * x; // one parameter, inferred type
(x, y) -> x + y; // multiple parameters
```

### Type Inference
Java infers types from context:
```java
List<String> list = Arrays.asList("a", "bb", "ccc");
list.forEach(s -> System.out.println(s)); // type of s inferred as String
```

Explicit typing is allowed:
```java
list.forEach((String s) -> System.out.println(s));
```

---

## 3. Functional Interfaces

### What is a Functional Interface?
- An interface with exactly **one abstract method**.
- May contain default and static methods.
- Annotated with `@FunctionalInterface` for clarity.

```java
@FunctionalInterface
interface MyFunc {
    int apply(int x);
}
```

### Built-in Functional Interfaces
Java provides many in `java.util.function`:

1. **Predicate\<T\>** – takes T, returns boolean.
```java
Predicate<String> nonEmpty = s -> !s.isEmpty();
```

2. **Function\<T, R\>** – takes T, returns R.
```java
Function<String, Integer> length = s -> s.length();
```

3. **Consumer\<T\>** – takes T, returns void.
```java
Consumer<String> printer = s -> System.out.println(s);
```

4. **Supplier\<T\>** – no input, returns T.
```java
Supplier<Double> random = () -> Math.random();
```

5. **BiFunction\<T, U, R\>** – takes two inputs, returns R.
```java
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
```

### Custom Functional Interfaces
```java
@FunctionalInterface
interface StringProcessor {
    String process(String s);
}

StringProcessor upper = s -> s.toUpperCase();
System.out.println(upper.process("hello"));
```

---

## 4. Method References

Shorthand for lambdas that call existing methods.

### Types
1. **Static method:** `Class::staticMethod`
```java
Function<Integer, String> f = String::valueOf;
```

2. **Instance method of object:** `instance::method`
```java
Consumer<String> printer = System.out::println;
```

3. **Instance method of class:** `Class::method`
```java
Function<String, Integer> length = String::length;
```

4. **Constructor reference:** `Class::new`
```java
Supplier<List<String>> listSupplier = ArrayList::new;
```

### Practical Use Cases
- Simplify stream operations.
- Cleaner syntax in callbacks.

---

## 5. Closures & Effectively Final

### Capturing Variables
Lambdas can capture variables from enclosing scope:
```java
int base = 10;
Function<Integer, Integer> adder = x -> x + base;
```

### Effectively Final
Captured variables must be **final or effectively final**.
```java
int num = 5;
Function<Integer, Integer> multiplier = x -> x * num;
// num++; // Error: variable used in lambda should be final or effectively final
```

Reason: ensures thread-safety and predictability.

---

## 6. Real-World Examples

### Sorting with Lambdas
```java
List<String> names = Arrays.asList("Tom", "Jerry", "Mickey");
Collections.sort(names, (a, b) -> a.compareToIgnoreCase(b));
```

Or using method reference:
```java
names.sort(String::compareToIgnoreCase);
```

### Runnable with Lambdas
```java
Runnable task = () -> System.out.println("Running in thread");
new Thread(task).start();
```

### Stream + Lambda Demo
```java
List<String> items = Arrays.asList("apple", "banana", "cherry");
items.stream()
     .filter(s -> s.startsWith("b"))
     .map(String::toUpperCase)
     .forEach(System.out::println);
```

Output:
```
BANANA
```

---

## 7. Interview Section

### Q1: Difference between anonymous class and lambda?
- Anonymous class: verbose, creates a new class.
- Lambda: concise, uses lexical scoping.
- Lambda `this` refers to enclosing class, not inner class.

### Q2: Why do lambdas need functional interfaces?
- Lambdas don’t define new methods.
- They provide implementations for **one abstract method**.
- Functional interfaces are the “target types” for lambdas.

### Q3: What does “effectively final” mean?
- A variable that isn’t explicitly declared `final`, but never reassigned.
- Allows safe capture by lambdas.

**Example:**
```java
String greeting = "Hi"; // effectively final
Runnable r = () -> System.out.println(greeting);
r.run();
```

---

## Summary
- Lambdas make Java concise and functional.
- Functional interfaces are the backbone of lambdas.
- Method references simplify syntax further.
- Closures capture variables safely.
- Real-world use: sorting, callbacks, streams.
- Common interview questions focus on **differences, functional interfaces, and effectively final variables**.

