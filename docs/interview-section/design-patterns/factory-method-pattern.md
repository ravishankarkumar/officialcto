# Factory Method Pattern in Java – Payment Modes Example

*By Ravi Shankar · officialcto.com*

---

## Introduction

When building applications, we often need to create objects based on **runtime input**.  
For example, in a payment gateway system, users might choose to pay with **Credit Card**, **UPI**, or **PayPal**.  

If we simply scatter `new CreditCardPayment()` and `new UpiPayment()` everywhere in our code, it becomes **hard to maintain, extend, and test**.  

The **Factory Method pattern** provides a clean way to handle this problem by **centralizing object creation**.

---

## The Problem: Without a Factory

Imagine this naive approach:

```java
public class Main {
    public static void main(String[] args) {
        // Direct instantiation
        Payment payment = new CreditCardPayment();
        payment.pay(1000);

        Payment upi = new UpiPayment();
        upi.pay(500);
    }
}
```

Looks fine at first. But what if tomorrow we add:
- **PayPalPayment**
- **CryptoPayment**
- **NetBankingPayment**

We’d need to change the client code in multiple places.  
That’s a violation of the **Open/Closed Principle (OCP)** — code should be *open for extension, closed for modification*.

---

## Enter the Factory Method Pattern

Instead of the client directly instantiating concrete classes, we introduce a **factory** that decides which `Payment` object to return based on input.

---

## Code Walkthrough

### 1. The Product (Abstract Class)

```java
abstract class Payment {
    public abstract void pay(int amount);
}
```

All payment modes extend this abstract class and implement their own logic.

---

### 2. Concrete Products

```java
public class CreditCardPayment extends Payment {
    @Override
    public void pay(int amount) {
        System.out.println("Paid " + amount + " using Credit Card.");
    }
}

public class UpiPayment extends Payment {
    @Override
    public void pay(int amount) {
        System.out.println("Paid " + amount + " using UPI.");
    }
}
```

---

### 3. The Factory

```java
public class PaymentsFactory {
    public static Payment createPayment(String type) {
        if (type.equalsIgnoreCase("CREDIT_CARD")) {
            return new CreditCardPayment();
        } else if (type.equalsIgnoreCase("UPI")) {
            return new UpiPayment();
        }
        throw new IllegalArgumentException("Unknown payment type: " + type);
    }
}
```

👉 The **factory method** here is `createPayment(String type)`.  
It decides which concrete class to instantiate, based on input.

---

### 4. The Client

```java
public class Main {
    public static void main(String[] args) {
        Payment payment1 = PaymentsFactory.createPayment("CREDIT_CARD");
        payment1.pay(1000);

        Payment payment2 = PaymentsFactory.createPayment("UPI");
        payment2.pay(500);
    }
}
```

Notice:  
- The client never uses `new`.  
- It only depends on `Payment` (the abstract class).  
- Creation logic is isolated in `PaymentsFactory`.

---

## UML Diagram

```
            +----------------+
            |   Payment      |  <---- Abstract Product
            +----------------+
            | + pay(amount)  |
            +----------------+
                 ^        ^
                 |        |
    +----------------+  +----------------+
    | CreditCardPayment | |   UpiPayment  |
    +----------------+  +----------------+

            +---------------------+
            |   PaymentsFactory   |  <---- Factory
            +---------------------+
            | + createPayment()   |
            +---------------------+
```

---

## Why This is Factory Method

- **Client is decoupled** from concrete classes.  
- **Factory encapsulates creation logic**.  
- **Adding new payment modes** only requires updating the factory (or registering new types).  

---

## Advantages

✅ Centralized object creation  
✅ Client code is clean and depends only on abstractions  
✅ Easy to add new payment types  
✅ Improved testability — you can swap payment modes without touching client logic  

---

## Limitations

⚠️ The current implementation requires editing the factory every time you add a new payment mode (switch/if chain grows).  
⚠️ Static factories are harder to extend compared to registry-based or DI-driven factories.  
⚠️ It’s not the **pure GoF Factory Method pattern** (which uses subclassed creators) — this is a **Simple Factory**, often confused with Factory Method.  

---

## TODOs & Suggested Improvements

1. **Use `enum` instead of raw strings**  
   ```java
   enum PaymentType { CREDIT_CARD, UPI }
   ```

2. **Registry-based Factory**  
   Use a `Map<String, Supplier<Payment>>` to avoid `if-else` clutter.  

3. **Abstract Factory**  
   If you need *families of related products* (e.g., `Payment`, `Refund`, `Invoice` for each provider), use the **Abstract Factory** pattern instead.  

4. **Dependency Injection**  
   In real systems, payment objects often need configs, credentials, and clients. A DI framework (Spring) can manage that.  

---

## Conclusion

The Factory Method pattern (or more precisely, the **Simple Factory** approach we implemented) is a **clean and practical solution** for problems where object creation depends on runtime input.  

Our **payment modes example** demonstrates how to keep client code clean, avoid hard-coded instantiation, and make the system easier to extend.  

In real-world systems, factories often evolve into **registry-based factories** or get integrated with **dependency injection frameworks** for maximum flexibility.

---

✍️ *Written by Ravi Shankar for officialcto.com*
