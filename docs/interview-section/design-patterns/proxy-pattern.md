---
title: Proxy Pattern
description: Learn the Proxy Pattern in Java to control access to objects, add indirection, and support lazy loading, security, and logging with real-world examples.
---

# Proxy Pattern

## Overview
The **Proxy Pattern** is a **structural design pattern** that provides a surrogate or placeholder for another object to control access to it. The proxy acts as an intermediary between the client and the real object, adding extra behavior such as access control, caching, logging, or lazy initialization.

---

## Learning Objectives
- Understand the **intent** of the Proxy Pattern.
- Learn different types of proxies: **Virtual**, **Protection**, **Remote**, **Caching**, and **Logging**.
- Implement the Proxy Pattern in **Java** with real-world use cases.
- Explore UML structure and how Proxy relates to other patterns.

---

## Why Proxy Matters
- **Access Control**: Restrict who can access an object.
- **Performance**: Delay creation of expensive objects (lazy loading).
- **Remote Access**: Represent an object in a different address space (e.g., RMI).
- **Cross-Cutting Concerns**: Add logging, monitoring, or caching without changing the real object.

Example: A large image in a document editor is only loaded when displayed — using a **Virtual Proxy**.

---

## Key Concepts
- **Subject**: The common interface implemented by RealSubject and Proxy.
- **RealSubject**: The actual object that does the work.
- **Proxy**: Controls access to RealSubject, adding extra behavior.
- **Client**: Uses Subject without knowing if it’s talking to Proxy or RealSubject.

---

## UML Diagram
```
+------------------+
|     Subject      |
+------------------+
| +request()       |
+------------------+
        ^
        |
+------------------+        +------------------+
|     Proxy        |------->|   RealSubject    |
+------------------+        +------------------+
| -realSubject     |        | +request()       |
| +request()       |        +------------------+
+------------------+
```

---

## Code Example: Virtual Proxy for Images

### Subject Interface
```java
public interface Image {
    void display();
}
```

### RealSubject: Expensive Image
```java
public class RealImage implements Image {
    private String filename;

    public RealImage(String filename) {
        this.filename = filename;
        loadFromDisk();
    }

    private void loadFromDisk() {
        System.out.println("Loading image: " + filename);
    }

    @Override
    public void display() {
        System.out.println("Displaying " + filename);
    }
}
```

### Proxy: Lazy Initialization
```java
public class ProxyImage implements Image {
    private RealImage realImage;
    private String filename;

    public ProxyImage(String filename) {
        this.filename = filename;
    }

    @Override
    public void display() {
        if (realImage == null) {
            realImage = new RealImage(filename); // load only when needed
        }
        realImage.display();
    }
}
```

### Client Code
```java
public class ProxyDemo {
    public static void main(String[] args) {
        Image image1 = new ProxyImage("photo1.jpg");
        Image image2 = new ProxyImage("photo2.jpg");

        // Image loaded only on first display
        image1.display(); // Loading + Displaying
        image1.display(); // Displaying only (no load)

        image2.display(); // Loading + Displaying
    }
}
```

---

## Types of Proxy
1. **Virtual Proxy**: Lazy loading (e.g., images in a document).
2. **Protection Proxy**: Access control based on roles/permissions.
3. **Remote Proxy**: Represents an object in a different JVM or server (e.g., Java RMI).
4. **Caching Proxy**: Store results to avoid recomputation or network calls.
5. **Logging/Monitoring Proxy**: Add logging or profiling without modifying the real object.

---

## Real-World Examples
- **Spring AOP Proxies**: Wrapping beans with proxies for transaction management, logging, and security.
- **Hibernate Lazy Loading**: Entities are proxied and loaded from DB only when accessed.
- **Java RMI**: Remote proxies represent objects across JVMs.

---

## Relation to Other Patterns
- **Decorator**: Both wrap objects, but Proxy controls access while Decorator adds new behavior.
- **Adapter**: Changes interface, Proxy keeps the same interface.
- **Facade**: Simplifies a subsystem, Proxy represents a specific object.

---

## Practice Exercises
- **Easy**: Implement a `LoggerProxy` that logs method calls to a service.
- **Medium**: Build a `PermissionProxy` that restricts file access based on user roles.
- **Hard**: Create a `CachingProxy` for a `WeatherService` that stores responses for repeated queries.

---

## Conclusion
The Proxy Pattern provides a flexible way to control access, optimize performance, and add cross-cutting concerns without altering the real object. By mastering Proxy, you’ll understand lazy loading, security, and monitoring in enterprise systems.

**Next Step**: Explore [Bridge Pattern](/interview-section/design-patterns/bridge-pattern) or revisit the [Design Patterns Hub](/interview-section/design-patterns).

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
