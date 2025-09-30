# Abstract Factory Pattern in Java – Building a Thematic Home Decorator

*By Ravi Shankar · officialcto.com*

---

## Introduction

When we talk about design patterns, the **Abstract Factory** pattern is often introduced as a way to create **families of related objects without depending on their concrete implementations**.  

But it can feel abstract (pun intended) unless you see it in action. In this article, I’ll walk you through a practical and relatable example: **an interior decoration setup**.  

Imagine you want to decorate a room. The theme could be *Victorian*, *Modern*, *Minimalist*, or any other style. For each theme, you’ll need a **chair**, a **sofa**, a **table**, and a **carpet** — all styled consistently.  

This is exactly where the Abstract Factory shines.  

---

## What is Abstract Factory?

- **Definition**: Provide an interface for creating families of related or dependent objects without specifying their concrete classes.  
- **Why?**: To ensure consistency across related products while decoupling client code from concrete implementations.  
- **When to use?**:  
  - When objects are designed to be used together (e.g., Victorian furniture pieces).  
  - When you want to switch families at runtime (swap Victorian for Modern).  
  - When client code should remain agnostic to object creation details.

---

## High-Level Design

Here’s the logical flow of our home decoration system:

```
          +---------------------+
          |       IFactory      |   (Abstract Factory)
          |---------------------|
          | + createChair()     |
          | + createSofa()      |
          | + createTable()     |
          | + createCarpet()    |
          +---------------------+
                   ^
                   |
     +-----------------------------+
     |   VictorianFactory          |   (Concrete Factory)
     +-----------------------------+
       |            |          |
   VictorianChair VictorianSofa VictorianTable VictorianCarpet
     (Product A)    (Product B)   (Product C)     (Product D)
```

And on the client side:

```
 HomeDecorator → uses IFactory → produces styled furniture → decorates room
```

---

## The Interfaces

```java
package interfaces;

public interface IChair {
    void sitOn();
    String style();
}

public interface ISofa {
    void lieOn();
    String style();
}

public interface ITable {
    void putObject(String item);
    String style();
}

public interface ICarpet {
    void spread();
    String style();
}

public interface IFactory {
    IChair createChair();
    ISofa createSofa();
    ICarpet createCarpet();
    ITable createTable();
}
```

---

## The Victorian Family (Concrete Products)

```java
package factories.victorian;

import interfaces.IChair;

public class VictorianChair implements IChair {
    @Override
    public void sitOn() {
        System.out.println("Sitting on a Victorian Chair");
    }

    @Override
    public String style() {
        return "Victorian Chair";
    }
}
```

```java
package factories.victorian;

import interfaces.ISofa;

public class VictorianSofa implements ISofa {
    @Override
    public void lieOn() {
        System.out.println("Lying on a plush Victorian sofa.");
    }

    @Override
    public String style() {
        return "Victorian Sofa";
    }
}
```

```java
package factories.victorian;

import interfaces.ITable;

public class VictorianTable implements ITable {
    @Override
    public void putObject(String item) {
        System.out.println("Placed '" + item + "' on Victorian table.");
    }

    @Override
    public String style() {
        return "Victorian Table";
    }
}
```

```java
package factories.victorian;

import interfaces.ICarpet;

public class VictorianCarpet implements ICarpet {
    @Override
    public void spread() {
        System.out.println("Victorian carpet is spread with intricate motifs.");
    }

    @Override
    public String style() {
        return "Victorian Carpet";
    }
}
```

---

## The Victorian Factory

```java
package factories.victorian;

import interfaces.*;

public class VictorianFactory implements IFactory {
    @Override
    public IChair createChair() {
        return new VictorianChair();
    }

    @Override
    public ISofa createSofa() {
        return new VictorianSofa();
    }

    @Override
    public ICarpet createCarpet() {
        return new VictorianCarpet();
    }

    @Override
    public ITable createTable() {
        return new VictorianTable();
    }
}
```

---

## The Client: HomeDecorator

```java
import interfaces.*;

public class HomeDecorator {
    private final IFactory factory;
    private final IChair chair;
    private final ISofa sofa;
    private final ITable table;
    private final ICarpet carpet;

    public HomeDecorator(IFactory factory) {
        if (factory == null) throw new IllegalArgumentException("Factory cannot be null");
        this.factory = factory;
        this.chair = factory.createChair();
        this.sofa = factory.createSofa();
        this.table = factory.createTable();
        this.carpet = factory.createCarpet();
    }

    public void decorateRoom() {
        System.out.println("Decorating room using theme: " + chair.style());
        carpet.spread();
        chair.sitOn();
        sofa.lieOn();
        table.putObject("vase");
    }
}
```

---

## The Main Program

```java
import factories.victorian.VictorianFactory;
import interfaces.IFactory;

class Main {
    public static void main(String[] args) {
        IFactory factory = new VictorianFactory();
        HomeDecorator hs = new HomeDecorator(factory);
        hs.decorateRoom();
    }
}
```

### Output
```
Decorating room using theme: Victorian Chair
Victorian carpet is spread with intricate motifs.
Sitting on a Victorian Chair
Lying on a plush Victorian sofa.
Placed 'vase' on Victorian table.
```

---

## Why is this Abstract Factory?

1. **Family of related products**: All furniture items (Chair, Sofa, Table, Carpet) belong to the *Victorian* family.  
2. **Client agnostic to concrete classes**: `HomeDecorator` doesn’t know or care about `VictorianChair` or `VictorianSofa`.  
3. **Easy to swap themes**: Tomorrow, you can implement a `ModernFactory` with `ModernChair`, `ModernSofa`, etc. `HomeDecorator` will work unchanged.  

---

## Advantages

- **Consistency**: Enforces themed families of objects.  
- **Flexibility**: Easy to switch between themes at runtime.  
- **Decoupling**: Client code depends on interfaces, not concrete implementations.  
- **Extensibility**: Add new themes without changing client code.  

---

## Limitations

- **Rigid when adding new product types**: If you want to add `Lamp`, you must update the `IFactory` and all existing factories.  
- **Class explosion**: Each theme requires a full set of product classes.  
- **Overhead for simple use cases**: If you only need one or two products, Abstract Factory may be overkill.  

---

## Suggested Improvements & TODOs

1. **Add another theme**: Implement `ModernFactory` to demonstrate swapping styles at runtime.  
2. **Factory Provider**: Create a `FactoryRegistry` that returns a factory based on user input or config.  
3. **Use Builders for customization**: If a Victorian Chair should allow different upholsteries/colors, return a `ChairBuilder` from the factory.  
4. **Unit Tests**: Add JUnit tests to verify that the factory produces the right concrete classes.  
5. **Logging**: Replace `System.out.println` with a logging framework (e.g., SLF4J) for real applications.  
6. **Split factories**: If the product list grows large, consider specialized factories (SeatingFactory, TextileFactory).  
7. **Internationalization**: Add styles or localization for messages (e.g., different languages).  

---

## Conclusion

The Abstract Factory pattern is a powerful way to **enforce consistency across families of related objects** while keeping your client code decoupled from specific implementations.  

In this article, we used a **home decorator example** where each theme (Victorian, Modern, etc.) produces its own chair, sofa, table, and carpet. The client (`HomeDecorator`) stays agnostic to the specific theme and only depends on interfaces.  

This design makes it trivial to add new styles without touching the client code.  

---

✍️ *Written by Ravi Shankar for officialcto.com*
