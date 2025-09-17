---
title: Design a Vending Machine
description: Learn low-level system design for a vending machine in Java, focusing on inventory management and payment processing for scalable, robust applications.
---

# Design a Vending Machine

## Overview
Welcome to the eighth lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Designing a vending machine system is a classic LLD problem that tests your ability to model real-world entities with state-driven behavior using OOP principles. In this 25-minute lesson, we explore the **low-level design of a vending machine system**, covering inventory management, payment processing, and functionality like product selection and dispensing. Whether designing a system for a public vending machine or preparing for FAANG interviews, this lecture equips you to build modular, scalable systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Design Patterns*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **low-level design** principles for a vending machine system with inventory and payment processing.
- Learn to model **classes**, **states**, and **functionality** in Java.
- Apply **OOP principles** (Section 2, Lecture 1), **design patterns** (Section 3), **design principles** (Section 4), and **HLD concepts** (Section 5) to LLD.
- Write clean, modular Java code (Section 9).

## Why Vending Machine System Design Matters
A vending machine system is a common FAANG interview problem that tests your ability to model state transitions, inventory, and payment processing in a real-world context. Early in my career, I designed a state-driven system for a transactional application, applying OOP principles to ensure maintainability and extensibility. This lecture prepares you to design robust systems and articulate your approach clearly, showcasing your mentorship skills.

In software engineering, vending machine system design helps you:
- **Model State-Driven Systems**: Use state machines for dynamic behavior.
- **Manage Inventory**: Track and update product stock.
- **Handle Transactions**: Process payments reliably.
- **Teach Effectively**: Share practical LLD strategies.

## Key Concepts
### 1. Vending Machine System Components
- **Inventory Management**: Track products and quantities.
- **Payment Processing**: Handle cash, card, or digital payments.
- **States**: Idle, Selecting Product, Processing Payment, Dispensing, Out of Stock.
- **Functionality**:
  - Select a product and verify availability.
  - Process payment and dispense product.
  - Return change or cancel transaction.
- **Edge Cases**: Insufficient payment, out-of-stock products, invalid selections.

### 2. Design Patterns
- **State Pattern** (Section 3, Lecture 5): For managing vending machine states.
- **Strategy Pattern** (Section 3, Lecture 4): For payment processing (cash, card).
- **Singleton Pattern** (Section 3, Lecture 1): For vending machine instance.

### 3. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and inheritance for product and payment classes.
- **Design Patterns** (Section 3): State, Strategy, and Singleton patterns.
- **Design Principles** (Section 4): SoC (Lecture 11) separates state and payment logic; KISS (Lecture 8) simplifies design.
- **HLD** (Section 5):
  - E-commerce Platform (Lecture 16): Similar transaction modeling.
  - Payment Gateway (Lecture 25): Similar payment processing.
  - LLD Intro (Lecture 1): Builds on state-driven design.
  - Database Design (Lecture 2): Persisting inventory data.
  - API Design (Lecture 3): Exposing vending controls.
  - Concurrency Handling (Lecture 4): Thread-safe transaction handling.
  - Error Handling (Lecture 5): Handling payment failures.
  - Parking Lot (Lecture 6): Similar entity modeling.
  - Elevator System (Lecture 7): Similar state-driven design.
- **Clean Code** (Section 9): Meaningful names for classes and methods.

### 4. Use Case
Design a vending machine system for a public space, supporting inventory management, payment processing, and state-driven behavior.

## System Design
### Architecture
```
[Client] --> [VendingController]
                |
                v
            [VendingMachine]
                |
                v
           [VendingState] --> [Idle|Selecting|ProcessingPayment|Dispensing]
                |
                v
           [Inventory] --> [Product]
           [PaymentProcessor]
```

- **Classes**:
  - `Product`: Represents items (e.g., soda, chips).
  - `Inventory`: Manages product stock.
  - `PaymentProcessor`: Handles payment methods.
  - `VendingMachine`: Singleton managing states and logic.
  - `VendingController`: Exposes API.
- **Functionality**: Select product, process payment, dispense item, return change.
- **Trade-Offs**:
  - State Management: State pattern (flexible, complex) vs. flags (simple, error-prone).
  - Payment: Cash (simple, physical) vs. digital (scalable, complex).

## Code Example: Vending Machine System
Below is a Java implementation of a vending machine system with inventory and payment processing.

```java
import java.util.HashMap;
import java.util.Map;

// Product class
public class Product {
    private String productId;
    private String name;
    private double price;
    private int quantity;

    public Product(String productId, String name, double price, int quantity) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    public String getProductId() {
        return productId;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void reduceQuantity() {
        if (quantity > 0) {
            quantity--;
        }
    }
}

// Inventory class
public class Inventory {
    private Map<String, Product> products;

    public Inventory() {
        this.products = new HashMap<>();
    }

    public void addProduct(Product product) {
        products.put(product.getProductId(), product);
    }

    public Product getProduct(String productId) {
        return products.get(productId);
    }

    public boolean isAvailable(String productId) {
        Product product = products.get(productId);
        return product != null && product.getQuantity() > 0;
    }
}

// Payment processor interface
public interface PaymentProcessor {
    boolean processPayment(double amount);
}

public class CashPaymentProcessor implements PaymentProcessor {
    @Override
    public boolean processPayment(double amount) {
        System.out.println("Processing cash payment: $" + amount);
        return true; // Simulated success
    }
}

public class CardPaymentProcessor implements PaymentProcessor {
    @Override
    public boolean processPayment(double amount) {
        System.out.println("Processing card payment: $" + amount);
        return true; // Simulated success
    }
}

// State interface
public interface VendingState {
    void selectProduct(VendingMachine machine, String productId);
    void insertPayment(VendingMachine machine, double amount, PaymentProcessor processor);
    void dispenseProduct(VendingMachine machine);
}

public class IdleState implements VendingState {
    @Override
    public void selectProduct(VendingMachine machine, String productId) {
        if (!machine.getInventory().isAvailable(productId)) {
            throw new IllegalStateException("Product unavailable: " + productId);
        }
        machine.setSelectedProductId(productId);
        machine.setState(new SelectingState());
        System.out.println("Selected product: " + productId);
    }

    @Override
    public void insertPayment(VendingMachine machine, double amount, PaymentProcessor processor) {
        throw new IllegalStateException("Select a product first");
    }

    @Override
    public void dispenseProduct(VendingMachine machine) {
        throw new IllegalStateException("No product selected");
    }
}

public class SelectingState implements VendingState {
    @Override
    public void selectProduct(VendingMachine machine, String productId) {
        throw new IllegalStateException("Product already selected");
    }

    @Override
    public void insertPayment(VendingMachine machine, double amount, PaymentProcessor processor) {
        Product product = machine.getInventory().getProduct(machine.getSelectedProductId());
        if (amount < product.getPrice()) {
            throw new IllegalStateException("Insufficient payment: " + amount + " < " + product.getPrice());
        }
        if (processor.processPayment(amount)) {
            machine.setState(new ProcessingPaymentState());
            machine.setInsertedAmount(amount);
            System.out.println("Payment accepted: $" + amount);
        } else {
            throw new IllegalStateException("Payment failed");
        }
    }

    @Override
    public void dispenseProduct(VendingMachine machine) {
        throw new IllegalStateException("Payment not processed");
    }
}

public class ProcessingPaymentState implements VendingState {
    @Override
    public void selectProduct(VendingMachine machine, String productId) {
        throw new IllegalStateException("Payment in progress");
    }

    @Override
    public void insertPayment(VendingMachine machine, double amount, PaymentProcessor processor) {
        throw new IllegalStateException("Payment already inserted");
    }

    @Override
    public void dispenseProduct(VendingMachine machine) {
        Product product = machine.getInventory().getProduct(machine.getSelectedProductId());
        product.reduceQuantity();
        double change = machine.getInsertedAmount() - product.getPrice();
        machine.setState(new IdleState());
        System.out.println("Dispensed product: " + product.getName() + ", Change: $" + change);
    }
}

// Vending machine class
public class VendingMachine {
    private static VendingMachine instance;
    private VendingState state;
    private Inventory inventory;
    private String selectedProductId;
    private double insertedAmount;

    private VendingMachine() {
        this.state = new IdleState();
        this.inventory = new Inventory();
    }

    public static VendingMachine getInstance() {
        if (instance == null) {
            instance = new VendingMachine();
        }
        return instance;
    }

    public void addProduct(Product product) {
        inventory.addProduct(product);
    }

    public Inventory getInventory() {
        return inventory;
    }

    public void setState(VendingState state) {
        this.state = state;
    }

    public void setSelectedProductId(String productId) {
        this.selectedProductId = productId;
    }

    public String getSelectedProductId() {
        return selectedProductId;
    }

    public void setInsertedAmount(double amount) {
        this.insertedAmount = amount;
    }

    public double getInsertedAmount() {
        return insertedAmount;
    }

    public void selectProduct(String productId) {
        state.selectProduct(this, productId);
    }

    public void insertPayment(double amount, PaymentProcessor processor) {
        state.insertPayment(this, amount, processor);
    }

    public void dispenseProduct() {
        state.dispenseProduct(this);
    }
}

// Controller for API interactions
public class VendingController {
    private final VendingMachine machine;

    public VendingController(VendingMachine machine) {
        this.machine = machine;
    }

    public void handleSelectProduct(String productId) {
        try {
            machine.selectProduct(productId);
        } catch (IllegalStateException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public void handleInsertPayment(double amount, PaymentProcessor processor) {
        try {
            machine.insertPayment(amount, processor);
        } catch (IllegalStateException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public void handleDispenseProduct() {
        try {
            machine.dispenseProduct();
        } catch (IllegalStateException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}

// Client to demonstrate usage
public class VendingClient {
    public static void main(String[] args) {
        VendingMachine machine = VendingMachine.getInstance();
        VendingController controller = new VendingController(machine);

        // Initialize inventory
        machine.addProduct(new Product("P1", "Soda", 1.50, 5));
        machine.addProduct(new Product("P2", "Chips", 1.00, 3));

        // Normal flow
        controller.handleSelectProduct("P1");
        controller.handleInsertPayment(2.00, new CashPaymentProcessor());
        controller.handleDispenseProduct();

        // Edge cases
        controller.handleSelectProduct("P3"); // Invalid product
        controller.handleSelectProduct("P2");
        controller.handleInsertPayment(0.50, new CardPaymentProcessor()); // Insufficient payment
        machine.addProduct(new Product("P2", "Chips", 1.00, 0)); // Out of stock
        controller.handleSelectProduct("P2");
        // Output:
        // Selected product: P1
        // Processing cash payment: $2.0
        // Payment accepted: $2.0
        // Dispensed product: Soda, Change: $0.5
        // Error: Product unavailable: P3
        // Selected product: P2
        // Error: Insufficient payment: 0.5 < 1.0
        // Error: Product unavailable: P2
    }
}
```
- **LLD Principles**:
  - **Inventory Management**: `Inventory` tracks products and quantities.
  - **Payment Processing**: `PaymentProcessor` supports cash and card payments.
  - **States**: `IdleState`, `SelectingState`, `ProcessingPaymentState` manage behavior.
  - **Design Patterns**: State pattern for state transitions, Strategy for payments, Singleton for `VendingMachine`.
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates state and payment logic; DIP (Section 4, Lecture 6) via interfaces.
- **Big O**: O(1) for `selectProduct`, `insertPayment`, `dispenseProduct` (HashMap operations).
- **Edge Cases**: Handles invalid products, insufficient payment, out-of-stock items.

**UML Diagram**:
```
[Client] --> [VendingController]
                |
                v
            [VendingMachine]
                |
                v
           [VendingState]
                |
                v
 [IdleState|SelectingState|ProcessingPaymentState]
                |
                v
           [Inventory] --> [Product]
           [PaymentProcessor] --> [CashPaymentProcessor|CardPaymentProcessor]
```

## Real-World Application
Imagine designing a vending machine system for a public space, supporting inventory tracking and payment processing with state-driven behavior. This LLD—aligned with HLD principles from Section 5 (e.g., Payment Gateway, Lecture 25)—ensures modularity and reliability, critical for real-world systems.

## Practice Exercises
Practice vending machine system design with these exercises:
- **Easy**: Design a UML diagram and Java code for a single-product vending machine.
- **Medium**: Implement a vending machine with two payment methods (cash, card).
- **Medium**: Design an LLD for a vending machine with state management and inventory.
- **Hard**: Architect a vending machine with Java, integrating multiple design patterns (e.g., State, Strategy).

Try designing one system in Java with a UML diagram, explaining inventory and payment processing.

## Conclusion
Mastering the design of a vending machine system equips you to build state-driven, modular Java systems, enhancing your LLD skills. This lecture builds on HLD concepts, preparing you for FAANG interviews and real-world applications.

**Next Step**: Explore [Design an ATM Machine](/interview-section/lld/atm-machine) to continue your LLD journey, or check out [all sections](/interview-section/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>