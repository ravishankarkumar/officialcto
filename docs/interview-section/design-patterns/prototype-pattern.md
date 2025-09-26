---
title: Prototype Pattern
description: Learn the Prototype Pattern in Java to create objects by cloning existing ones, reducing the cost of instantiation and supporting dynamic object creation.
---

# Prototype Pattern

## Overview
The **Prototype Pattern** is a **creational design pattern** that lets you create new objects by copying existing ones (prototypes), rather than instantiating new objects directly. This is especially useful when object creation is expensive or complex, or when you want to dynamically decide which kind of object to create at runtime.

---

## Learning Objectives
- Understand the **intent** of the Prototype Pattern.
- Implement cloning in **Java** using `clone()` and copy constructors.
- Explore **shallow vs. deep copying** in Java.
- Apply Prototype in **real-world use cases** such as configuration objects and game entities.
- Compare Prototype with other **creational patterns** like Factory and Builder.

---

## Why Prototype Matters
- **Performance**: Avoids costly initialization logic by reusing existing objects.
- **Flexibility**: New types can be introduced at runtime without tightly coupling to constructors.
- **Dynamic behavior**: Allows clients to work with object copies without knowing exact implementation.

Example: In a graphics editor, instead of instantiating new shapes from scratch, you duplicate an existing one and adjust its properties.

---

## Key Concepts
- **Prototype**: An existing object that serves as a blueprint for creating new objects.
- **Clone Method**: Defines how to copy an object (shallow vs deep).
- **Registry**: A catalog of prototypes to pick from and clone.

---

## UML Diagram
```
+--------------------+
|   Prototype        |
+--------------------+
| +clone(): Object   |
+--------------------+
           ^
           |
+--------------------+
| ConcretePrototypeA |
+--------------------+
| +clone(): Object   |
+--------------------+
           ^
           |
+--------------------+
| ConcretePrototypeB |
+--------------------+
| +clone(): Object   |
+--------------------+
```

---

## Code Example: Shape Prototypes

### Prototype Interface
```java
public interface Prototype extends Cloneable {
    Prototype clone();
}
```

### Concrete Prototype: Circle
```java
public class Circle implements Prototype {
    private int radius;
    
    public Circle(int radius) {
        this.radius = radius;
    }
    
    @Override
    public Prototype clone() {
        return new Circle(this.radius); // deep copy for primitive field
    }
    
    public void draw() {
        System.out.println("Drawing circle with radius " + radius);
    }
}
```

### Concrete Prototype: Rectangle
```java
public class Rectangle implements Prototype {
    private int width;
    private int height;
    
    public Rectangle(int width, int height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    public Prototype clone() {
        return new Rectangle(this.width, this.height);
    }
    
    public void draw() {
        System.out.println("Drawing rectangle " + width + "x" + height);
    }
}
```

### Client Code
```java
public class PrototypeDemo {
    public static void main(String[] args) {
        Circle circle1 = new Circle(10);
        Circle circle2 = (Circle) circle1.clone(); // copy of circle1
        
        Rectangle rect1 = new Rectangle(20, 30);
        Rectangle rect2 = (Rectangle) rect1.clone(); // copy of rect1
        
        circle1.draw(); // Drawing circle with radius 10
        circle2.draw(); // Drawing circle with radius 10
        
        rect1.draw();   // Drawing rectangle 20x30
        rect2.draw();   // Drawing rectangle 20x30
    }
}
```

---

## Shallow vs Deep Copy in Java
- **Shallow Copy**: Copies primitive fields; references still point to the same objects.  
- **Deep Copy**: Creates new instances for referenced objects, ensuring full independence.

Example:
```java
class Address {
    String city;
    Address(String city) { this.city = city; }
}

class Person implements Cloneable {
    String name;
    Address address;
    
    Person(String name, Address address) {
        this.name = name;
        this.address = address;
    }
    
    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone(); // shallow copy
    }
    
    public Person deepCopy() {
        return new Person(this.name, new Address(this.address.city)); // deep copy
    }
}
```

---

## Real-World Examples
1. **Document Templates**: Create new documents by cloning a template.
2. **Game Characters**: Duplicate entities with the same attributes (e.g., NPC soldiers).
3. **Configuration Objects**: Copy existing settings and adjust them.
4. **UI Components**: Copy complex widgets instead of reconstructing them.

---

## Relation to Other Patterns
- **Factory Method**: Creates objects via subclassing; Prototype creates via cloning.
- **Builder**: Step-by-step construction, while Prototype clones prebuilt instances.
- **Singleton**: Ensures one instance, opposite of Prototype which creates multiple.

---

## Practice Exercises
- **Easy**: Implement a `Book` prototype with fields `title` and `author`, and clone it.  
- **Medium**: Implement a `Car` prototype with an `Engine` object, demonstrating shallow vs deep copy.  
- **Hard**: Create a `PrototypeRegistry` that stores multiple prototypes (Circle, Rectangle) and allows clients to request clones dynamically.

---

## Conclusion
The Prototype Pattern provides a clean way to create objects by cloning existing ones, reducing instantiation cost and complexity. By mastering it, you’ll design more flexible and reusable systems. Prototype is especially powerful in scenarios where object creation is expensive or you need dynamic flexibility.

**Next Step**: Explore [Adapter Pattern](/interview-section/design-patterns/adapter-pattern) or revisit the [Design Patterns Hub](/interview-section/design-patterns).

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
