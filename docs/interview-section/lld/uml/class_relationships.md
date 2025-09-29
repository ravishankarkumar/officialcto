---
title: Relationships Between Classes in OOP
description: Learn about class relationships in Object-Oriented Programming (OOP) - Association, Aggregation, Composition, and Inheritance (Is-A, Has-A).
tags: [OOP, Class Relationships, Java, LLD, UML]
---

# Relationships Between Classes in OOP

## Overview
In Object-Oriented Programming (OOP), classes rarely exist in isolation. Real-world systems are built by connecting classes through **relationships**, which describe how objects interact with one another.  

The most common relationships are:  
- **Association** (works with)  
- **Aggregation** (has-a, weak ownership)  
- **Composition** (has-a, strong ownership)  
- **Inheritance** (is-a)  

Understanding these is critical for **Low-Level Design (LLD)** and **UML diagrams**.

---

## 1. Association (Works With)
- **Definition**: A general connection between two classes.  
- **Nature**: Neither class owns the other.  
- **UML**: A simple line between two classes.  

### Example: Teacher–Student
```java
class Student {
    String name;
}

class Teacher {
    String name;
    void teach(Student s) {
        System.out.println(name + " teaches " + s.name);
    }
}
```

👉 Teacher *works with* Student, but neither owns the other.

---

## 2. Aggregation (Has-A, Weak Ownership)
- **Definition**: A "has-a" relationship where one class holds a reference to another, but the lifetime of the part is **independent** of the whole.  
- **UML**: Hollow diamond.  

### Example: Department–Teacher
```java
class Teacher {
    String name;
}

class Department {
    String name;
    List<Teacher> teachers; // Aggregation

    Department(String name) {
        this.name = name;
        this.teachers = new ArrayList<>();
    }
}
```

👉 A **Department has Teachers**, but Teachers can exist without the Department.

---

## 3. Composition (Has-A, Strong Ownership)
- **Definition**: A "has-a" relationship where the lifetime of the part is **dependent** on the whole.  
- **UML**: Filled diamond.  

### Example: House–Room
```java
class Room {
    String type;
    Room(String type) { this.type = type; }
}

class House {
    private List<Room> rooms;

    House() {
        rooms = new ArrayList<>();
        rooms.add(new Room("Kitchen"));
        rooms.add(new Room("Bedroom"));
    }
}
```

👉 A **House has Rooms**, and if the House is destroyed, the Rooms are destroyed too.

---

## 4. Inheritance (Is-A)
- **Definition**: A subclass derives from a parent class, inheriting attributes and behaviors.  
- **UML**: Solid line with a hollow arrow.  

### Example: Vehicle–Car
```java
class Vehicle {
    String type;
}

class Car extends Vehicle {
    String model;
}
```

👉 A **Car is a Vehicle**.

---

## UML Summary
```
[Car] --|> [Vehicle]            // Inheritance (is-a)
[Department] o-- [Teacher]      // Aggregation (has-a, weak)
[House] *-- [Room]              // Composition (has-a, strong)
[Teacher] ---- [Student]        // Association (works with)
```

---

## Conclusion
Class relationships are fundamental to **OOP and LLD**.  
- Use **Inheritance (is-a)** when a subclass logically extends a parent.  
- Use **Composition (has-a, strong)** when a part cannot exist without the whole.  
- Use **Aggregation (has-a, weak)** when parts can exist independently.  
- Use **Association (works with)** for loose relationships.  

By mastering these, you can design **modular, reusable, and scalable systems**, and express them clearly in **UML diagrams** during interviews or system design sessions.

**Next Step**: Explore [UML Class Diagrams](/interview-section/lld/uml/class_diagrams) to learn how to visualize these relationships.
