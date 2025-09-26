---
title: Polymorphism in Object-Oriented Programming
description: Learn polymorphism in OOP, covering method overloading, overriding, runtime vs compile-time polymorphism, examples in Java, and interview tips.
---

# Polymorphism in Object-Oriented Programming

## Introduction
**Polymorphism** is one of the four fundamental pillars of object-oriented programming (OOP), alongside **encapsulation**, **abstraction**, and **inheritance**. The term comes from Greek, meaning *“many forms.”* In programming, polymorphism allows objects of different types to be treated through a common interface.  

This makes code more **flexible, reusable, and maintainable**, which is especially valuable in large-scale system design and interviews.



## What is Polymorphism?
At its core, polymorphism enables the same operation to behave differently on different classes. In Java and other OOP languages, this is achieved through **method overriding** (runtime polymorphism) and **method overloading** (compile-time polymorphism).  

### Key Idea:
- A **single interface** can represent **multiple implementations**.
- Behavior is **determined at runtime** (dynamic dispatch).



## Types of Polymorphism

### 1. **Compile-Time Polymorphism (Static Binding)**
- Achieved through **method overloading** or **operator overloading** (in some languages).
- The decision of which method to call is made at **compile time**.

**Example: Method Overloading**
```java
class Calculator {
    int add(int a, int b) {
        return a + b;
    }

    double add(double a, double b) {
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println(calc.add(5, 10));       // Calls int version
        System.out.println(calc.add(5.5, 10.2));  // Calls double version
    }
}
```



### 2. **Runtime Polymorphism (Dynamic Binding)**
- Achieved through **method overriding** in inheritance.
- The method call is resolved **at runtime** using the actual object type, not the reference type.

**Example: Method Overriding**
```java
class Animal {
    void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Dog barks");
    }
}

class Cat extends Animal {
    @Override
    void sound() {
        System.out.println("Cat meows");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal a1 = new Dog();
        Animal a2 = new Cat();

        a1.sound(); // Dog barks
        a2.sound(); // Cat meows
    }
}
```



## Advantages of Polymorphism
1. **Code Reusability** – One interface, multiple implementations.
2. **Extensibility** – Easily add new classes without changing client code.
3. **Maintainability** – Centralizes logic in abstract contracts or interfaces.
4. **Flexibility** – Promotes loosely coupled systems.



## Real-World Analogy
Think of a **remote control**:
- The remote has the same buttons (**interface**).
- But it can control a **TV**, **fan**, or **AC** (**different implementations**).
- The action of pressing "power" depends on the device (runtime polymorphism).



## Polymorphism in Interviews
### Common Questions
- Difference between **overloading** and **overriding**.
- How polymorphism is achieved in Java.
- Role of **virtual methods** and **dynamic dispatch**.
- How interfaces and abstract classes support polymorphism.

### Best Practices
- Prefer **interfaces** for extensibility.
- Use polymorphism to reduce `if-else` or `switch` statements (replace with dynamic dispatch).
- Avoid overusing method overloading where it reduces code clarity.



## Conclusion
Polymorphism is about writing **generic, extensible, and clean code** where behavior is determined dynamically. By leveraging **overriding**, **overloading**, and **interfaces**, developers can build systems that scale easily and adapt to change.


