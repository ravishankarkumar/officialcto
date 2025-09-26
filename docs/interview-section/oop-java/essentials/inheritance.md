---
title: Inheritance in Object-Oriented Programming
description: A detailed guide to inheritance in Java and OOP, covering single, multilevel, hierarchical, and multiple inheritance with examples and best practices.
---

# Inheritance in Object-Oriented Programming

## Introduction
**Inheritance** is one of the four fundamental pillars of Object-Oriented Programming (OOP), alongside **Encapsulation, Abstraction, and Polymorphism**. It enables a class (known as a *subclass* or *child class*) to acquire the properties and behaviors of another class (the *superclass* or *parent class*). This promotes **code reuse, modularity, and extensibility**.

In Java, inheritance is implemented using the `extends` keyword for classes and the `implements` keyword for interfaces.



## Why Inheritance Matters
- **Code Reuse**: Avoids rewriting common code across multiple classes.
- **Hierarchy Modeling**: Represents real-world IS-A relationships (e.g., Dog IS-A Animal).
- **Polymorphism Support**: Enables objects of subclasses to be treated as objects of their parent type.
- **Extensibility**: Makes it easier to add new features by extending existing functionality.



## Types of Inheritance

### 1. Single Inheritance
```java
class Animal {
    void eat() { System.out.println("Eating..."); }
}

class Dog extends Animal {
    void bark() { System.out.println("Barking..."); }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.eat();  // inherited
        dog.bark(); // own method
    }
}
```

### 2. Multilevel Inheritance
```java
class Animal {
    void eat() { System.out.println("Eating..."); }
}

class Mammal extends Animal {
    void walk() { System.out.println("Walking..."); }
}

class Dog extends Mammal {
    void bark() { System.out.println("Barking..."); }
}
```

### 3. Hierarchical Inheritance
```java
class Animal {
    void eat() { System.out.println("Eating..."); }
}

class Dog extends Animal {
    void bark() { System.out.println("Barking..."); }
}

class Cat extends Animal {
    void meow() { System.out.println("Meowing..."); }
}
```

### 4. Multiple Inheritance (through Interfaces)
```java
interface CanRun {
    void run();
}

interface CanSwim {
    void swim();
}

class Dog implements CanRun, CanSwim {
    public void run() { System.out.println("Dog running"); }
    public void swim() { System.out.println("Dog swimming"); }
}
```



## Rules & Best Practices in Java
- A class can inherit from **only one class** (single inheritance).
- A class can implement **multiple interfaces**.
- Use the `super` keyword to:
  - Call parent class constructors.
  - Access overridden methods or variables.
- **Avoid deep inheritance chains** — they reduce readability and increase coupling.
- Prefer **composition over inheritance** when "HAS-A" fits better than "IS-A".



## Example with `super` Keyword
```java
class Animal {
    String name = "Generic Animal";
    void display() {
        System.out.println("I am an " + name);
    }
}

class Dog extends Animal {
    String name = "Dog";

    void display() {
        super.display(); // calls Animal's display
        System.out.println("I am a " + name);
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.display();
    }
}
```
**Output:**
```
I am an Generic Animal
I am a Dog
```



## Inheritance in Interviews

### Common Questions
1. What’s the difference between **inheritance** and **composition**?  
   - Inheritance models IS-A relationships, while composition models HAS-A relationships.

2. Can you achieve **multiple inheritance** in Java?  
   - Not with classes, but yes via interfaces.

3. What is the **diamond problem**, and how does Java solve it?  
   - It occurs when two parent classes define the same method. Java avoids this by disallowing multiple inheritance of classes.

4. Why prefer **composition over inheritance**?  
   - Composition is more flexible and avoids tightly coupled class hierarchies.



## Key Takeaways
- Inheritance allows reuse and extension of existing code.
- Java supports single, multilevel, and hierarchical inheritance with classes, and multiple inheritance with interfaces.
- Overuse of inheritance leads to complexity; **use composition when appropriate**.
- Inheritance is closely tied to **polymorphism**, enabling flexible and reusable code.
