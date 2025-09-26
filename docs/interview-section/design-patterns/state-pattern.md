---
title: State Pattern
description: Learn the State Pattern in Java to manage object behavior based on its internal state, with UML, Java examples, and real-world use cases.
---

# State Pattern

## Overview
The **State Pattern** is a **behavioral design pattern** that allows an object to alter its behavior when its internal state changes. From the outside, the object appears to change its class. Instead of using large conditional blocks to handle behavior changes, State encapsulates state-specific behavior into separate classes.

---

## Learning Objectives
- Understand the **intent** of the State Pattern.
- Implement state transitions using **composition** and **delegation**.
- Replace conditional-heavy code with clean, extensible state objects.
- Apply State in **Java** with UML and practical examples.
- Differentiate State from Strategy and other patterns.

---

## Why State Matters
- **Simplifies Code**: Removes large `if-else` or `switch` statements for behavior based on state.
- **Extensible**: Add new states without modifying existing logic.
- **Encapsulation**: State-specific behavior is localized in state classes.
- **Maintainability**: Each state is easier to understand, test, and extend.

Example: A TCP connection behaves differently when it is in `Closed`, `Listening`, or `Established` state. Instead of hardcoding conditionals, each state is represented as a class.

---

## Key Concepts
- **Context**: Maintains a reference to the current state and delegates behavior.
- **State Interface**: Defines common operations.
- **Concrete States**: Implement behavior for a particular state.

---

## UML Diagram
```
+-------------------+          +----------------+
|      Context      |<>------->|     State      |
+-------------------+          +----------------+
| - state: State    |          | +handle()      |
| +setState(State)  |          +----------------+
| +request()        |                  ^
+-------------------+                  |
                                       |
                 +---------------------+---------------------+
                 |                                           |
       +-------------------+                      +-------------------+
       | ConcreteStateA    |                      | ConcreteStateB    |
       +-------------------+                      +-------------------+
       | +handle()         |                      | +handle()         |
       +-------------------+                      +-------------------+
```

---

## Code Example: Vending Machine States

### State Interface
```java
public interface VendingState {
    void insertCoin();
    void pressButton();
    void dispense();
}
```

### Concrete States
```java
public class NoCoinState implements VendingState {
    private final VendingMachine machine;

    public NoCoinState(VendingMachine machine) {
        this.machine = machine;
    }

    @Override
    public void insertCoin() {
        System.out.println("Coin inserted.");
        machine.setState(machine.getHasCoinState());
    }

    @Override
    public void pressButton() {
        System.out.println("Insert coin first.");
    }

    @Override
    public void dispense() {
        System.out.println("Insert coin first.");
    }
}

public class HasCoinState implements VendingState {
    private final VendingMachine machine;

    public HasCoinState(VendingMachine machine) {
        this.machine = machine;
    }

    @Override
    public void insertCoin() {
        System.out.println("Coin already inserted.");
    }

    @Override
    public void pressButton() {
        System.out.println("Button pressed.");
        machine.setState(machine.getDispensingState());
    }

    @Override
    public void dispense() {
        System.out.println("Press button to dispense.");
    }
}

public class DispensingState implements VendingState {
    private final VendingMachine machine;

    public DispensingState(VendingMachine machine) {
        this.machine = machine;
    }

    @Override
    public void insertCoin() {
        System.out.println("Please wait, dispensing.");
    }

    @Override
    public void pressButton() {
        System.out.println("Already dispensing.");
    }

    @Override
    public void dispense() {
        System.out.println("Item dispensed.");
        machine.setState(machine.getNoCoinState());
    }
}
```

### Context (Vending Machine)
```java
public class VendingMachine {
    private final VendingState noCoinState;
    private final VendingState hasCoinState;
    private final VendingState dispensingState;
    private VendingState currentState;

    public VendingMachine() {
        noCoinState = new NoCoinState(this);
        hasCoinState = new HasCoinState(this);
        dispensingState = new DispensingState(this);
        currentState = noCoinState;
    }

    public void setState(VendingState state) {
        this.currentState = state;
    }

    public VendingState getNoCoinState() { return noCoinState; }
    public VendingState getHasCoinState() { return hasCoinState; }
    public VendingState getDispensingState() { return dispensingState; }

    public void insertCoin() { currentState.insertCoin(); }
    public void pressButton() { currentState.pressButton(); }
    public void dispense() { currentState.dispense(); }
}
```

### Client Code
```java
public class StateDemo {
    public static void main(String[] args) {
        VendingMachine machine = new VendingMachine();

        machine.insertCoin();
        machine.pressButton();
        machine.dispense();

        machine.pressButton(); // Insert coin first.
    }
}
```

---

## Real-World Examples
- **TCP Connection**: Closed, Listen, Established states.
- **Document Workflow**: Draft, Review, Published states.
- **UI Buttons**: Enabled, Disabled, Hover, Pressed states.
- **Media Player**: Play, Pause, Stop states.

---

## Relation to Other Patterns
- **Strategy Pattern**: Both encapsulate behavior, but Strategy is chosen by the client, while State changes internally.
- **Command Pattern**: Encapsulates requests, not object state transitions.
- **Observer Pattern**: Can be combined with State to notify changes.

---

## Practice Exercises
- **Easy**: Implement a `TrafficLight` with Red, Yellow, Green states.
- **Medium**: Build a `Document` workflow with Draft, Review, and Published states.
- **Hard**: Create a `MediaPlayer` supporting Play, Pause, and Stop using State.

---

## Conclusion
The State Pattern simplifies behavior changes by encapsulating state-specific logic into separate classes, avoiding conditionals, and enabling cleaner transitions. By mastering State, you can design more maintainable and extensible systems.

**Next Step**: Explore [Strategy Pattern](/interview-section/design-patterns/strategy-pattern) or revisit the [Design Patterns Hub](/interview-section/design-patterns).

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
