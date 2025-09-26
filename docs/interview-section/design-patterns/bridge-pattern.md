---
title: Bridge Pattern
description: Learn the Bridge Pattern in Java to decouple abstractions from implementations, enabling flexibility and scalability in large systems.
---

# Bridge Pattern

## Overview
The **Bridge Pattern** is a **structural design pattern** that decouples an abstraction from its implementation so that the two can vary independently. Instead of binding an abstraction to a specific implementation at compile time, the Bridge Pattern uses composition to delegate work to an implementation object.

---

## Learning Objectives
- Understand the **intent** of the Bridge Pattern.
- Learn how to separate **abstractions** from **implementations** using composition.
- Implement Bridge in **Java** with UML and real-world examples.
- Differentiate Bridge from Adapter and Strategy patterns.
- Apply Bridge to avoid class explosion in systems with multiple dimensions of variation.

---

## Why Bridge Matters
- **Scalability**: Prevents combinatorial explosion of subclasses.
- **Flexibility**: Abstraction and implementation can evolve independently.
- **Maintainability**: Changes in implementation don’t affect the abstraction layer.

Example: A drawing application supporting multiple shapes (Circle, Square) and rendering APIs (OpenGL, DirectX). Without Bridge, you’d need a class for each combination (`OpenGLCircle`, `DirectXCircle`), but with Bridge, you can mix and match dynamically.

---

## Key Concepts
- **Abstraction**: Defines the high-level control interface.
- **Refined Abstraction**: Extends the abstraction’s interface.
- **Implementor**: Defines the low-level interface.
- **Concrete Implementor**: Provides implementation-specific behavior.

---

## UML Diagram
```
        Abstraction
        + operation()
             |
             v
   RefinedAbstraction
             |
             v
       Implementor <----> ConcreteImplementorA
                        <----> ConcreteImplementorB
```

---

## Code Example: Drawing Shapes with Bridge

### Implementor
```java
public interface DrawingAPI {
    void drawCircle(int x, int y, int radius);
}
```

### Concrete Implementors
```java
public class OpenGLAPI implements DrawingAPI {
    @Override
    public void drawCircle(int x, int y, int radius) {
        System.out.println("OpenGL drawing circle at (" + x + "," + y + ") with radius " + radius);
    }
}

public class DirectXAPI implements DrawingAPI {
    @Override
    public void drawCircle(int x, int y, int radius) {
        System.out.println("DirectX drawing circle at (" + x + "," + y + ") with radius " + radius);
    }
}
```

### Abstraction
```java
public abstract class Shape {
    protected DrawingAPI drawingAPI;

    protected Shape(DrawingAPI drawingAPI) {
        this.drawingAPI = drawingAPI;
    }

    public abstract void draw();
}
```

### Refined Abstraction
```java
public class Circle extends Shape {
    private int x, y, radius;

    public Circle(int x, int y, int radius, DrawingAPI drawingAPI) {
        super(drawingAPI);
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    @Override
    public void draw() {
        drawingAPI.drawCircle(x, y, radius);
    }
}
```

### Client Code
```java
public class BridgeDemo {
    public static void main(String[] args) {
        Shape circle1 = new Circle(1, 2, 5, new OpenGLAPI());
        Shape circle2 = new Circle(3, 4, 10, new DirectXAPI());

        circle1.draw(); // OpenGL drawing circle at (1,2) with radius 5
        circle2.draw(); // DirectX drawing circle at (3,4) with radius 10
    }
}
```

---

## Real-World Examples
- **JDBC Drivers**: JDBC provides the abstraction, while drivers (MySQL, PostgreSQL) are concrete implementors.
- **UI Frameworks**: Separate UI abstraction (buttons, windows) from platform-specific rendering.
- **Logging Frameworks**: Logging API (abstraction) + different logging backends (Log4j, SLF4J).

---

## Relation to Other Patterns
- **Adapter**: Makes unrelated interfaces compatible. Bridge separates abstraction from implementation by design.
- **Strategy**: Focuses on interchangeable algorithms, while Bridge focuses on decoupling abstraction and implementation.
- **Decorator**: Adds behavior dynamically, while Bridge separates hierarchies.

---

## Practice Exercises
- **Easy**: Implement a `Notification` abstraction with different channels (Email, SMS) as implementors.
- **Medium**: Build a `RemoteControl` abstraction with devices (TV, Radio) as implementors.
- **Hard**: Design a cross-platform `DocumentEditor` where formatting and content management are decoupled using Bridge.

---

## Conclusion
The Bridge Pattern provides flexibility by decoupling abstractions from implementations, enabling independent evolution of both. By applying Bridge, you reduce class explosion and increase maintainability.

**Next Step**: Explore [Flyweight Pattern](/interview-section/design-patterns/flyweight-pattern) or revisit the [Design Patterns Hub](/interview-section/design-patterns).

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
