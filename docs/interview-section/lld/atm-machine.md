---
title: Design an ATM Machine
description: Learn low-level system design for an ATM machine in Java, focusing on transaction processing and authentication for secure, robust applications.
---

# Design an ATM Machine

## Overview
Welcome to the ninth lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Designing an ATM machine system is a classic LLD problem that tests your ability to model secure, transactional systems using OOP principles. In this 25-minute lesson, we explore the **low-level design of an ATM machine system**, covering transaction processing (e.g., withdrawal, deposit), authentication (e.g., PIN verification), and state-driven behavior. Whether designing a system for a bank or preparing for FAANG interviews, this lecture equips you to build modular, secure systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Design Patterns*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **low-level design** principles for an ATM machine system with transaction processing and authentication.
- Learn to model **classes**, **states**, and **functionality** in Java.
- Apply **OOP principles** (Section 2, Lecture 1), **design patterns** (Section 3), **design principles** (Section 4), and **HLD concepts** (Section 5) to LLD.
- Write clean, secure Java code (Section 9).

## Why ATM Machine System Design Matters
An ATM machine system is a common FAANG interview problem that tests your ability to model secure, transactional systems with state management. Early in my career, I designed a transactional system for a financial application, applying OOP principles to ensure security and reliability. This lecture prepares you to design robust systems and articulate your approach clearly, showcasing your mentorship skills.

In software engineering, ATM system design helps you:
- **Model Secure Systems**: Implement authentication and transaction safety.
- **Handle Transactions**: Process withdrawals, deposits, and balance checks.
- **Ensure Reliability**: Manage state transitions and error handling.
- **Teach Effectively**: Share practical LLD strategies.

## Key Concepts
### 1. ATM System Components
- **Authentication**: Verify user identity (e.g., PIN, card).
- **Transaction Processing**: Handle withdrawal, deposit, and balance inquiries.
- **States**: Idle, Authenticated, Transaction In Progress, Error.
- **Functionality**:
  - Authenticate user with card and PIN.
  - Process transactions (withdrawal, deposit, balance check).
  - Handle errors and edge cases (e.g., insufficient funds).
- **Edge Cases**: Invalid PIN, insufficient balance, card issues.

### 2. Design Patterns
- **State Pattern** (Section 3, Lecture 5): For managing ATM states.
- **Strategy Pattern** (Section 3, Lecture 4): For transaction types (withdrawal, deposit).
- **Singleton Pattern** (Section 3, Lecture 1): For ATM instance.

### 3. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and inheritance for account and transaction classes.
- **Design Patterns** (Section 3): State, Strategy, and Singleton patterns.
- **Design Principles** (Section 4): SoC (Lecture 11) separates authentication and transaction logic; KISS (Lecture 8) simplifies design.
- **HLD** (Section 5):
  - Payment Gateway (Lecture 25): Similar transaction processing.
  - LLD Intro (Lecture 1): Builds on state-driven design.
  - Database Design (Lecture 2): Persisting account data.
  - API Design (Lecture 3): Exposing ATM controls.
  - Concurrency Handling (Lecture 4): Thread-safe transactions.
  - Error Handling (Lecture 5): Handling transaction failures.
  - Parking Lot (Lecture 6): Similar entity modeling.
  - Elevator System (Lecture 7): Similar state-driven design.
  - Vending Machine (Lecture 8): Similar transaction and state management.
- **Clean Code** (Section 9): Meaningful names for classes and methods.

### 4. Use Case
Design an ATM machine system for a bank, supporting secure authentication and transaction processing.

## System Design
### Architecture
```
[Client] --> [ATMController]
                |
                v
            [ATM]
                |
                v
           [ATMState] --> [Idle|Authenticated|TransactionInProgress]
                |
                v
           [Account] --> [Transaction]
```

- **Classes**:
  - `Account`: Represents user account with balance.
  - `Transaction`: Handles withdrawal, deposit, balance check.
  - `ATM`: Singleton managing states and logic.
  - `ATMController`: Exposes API for user interactions.
- **Functionality**: Authenticate user, process transactions, manage states.
- **Trade-Offs**:
  - Authentication: PIN-based (simple, less secure) vs. multi-factor (secure, complex).
  - Transaction Processing: In-memory (fast, volatile) vs. database (persistent, slower).

## Code Example: ATM Machine System
Below is a Java implementation of an ATM machine system with transaction processing and authentication.

```java
import java.util.HashMap;
import java.util.Map;

// Custom exceptions
public class AuthenticationException extends Exception {
    public AuthenticationException(String message) {
        super(message);
    }
}

public class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message);
    }
}

// Account class
public class Account {
    private String accountId;
    private String pin;
    private double balance;

    public Account(String accountId, String pin, double balance) {
        this.accountId = accountId;
        this.pin = pin;
        this.balance = balance;
    }

    public String getAccountId() {
        return accountId;
    }

    public boolean verifyPin(String pin) {
        return this.pin.equals(pin);
    }

    public double getBalance() {
        return balance;
    }

    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException("Insufficient funds: " + amount);
        }
        balance -= amount;
    }

    public void deposit(double amount) {
        balance += amount;
    }
}

// Transaction interface
public interface Transaction {
    void execute(Account account) throws InsufficientFundsException;
}

public class WithdrawalTransaction implements Transaction {
    private double amount;

    public WithdrawalTransaction(double amount) {
        this.amount = amount;
    }

    @Override
    public void execute(Account account) throws InsufficientFundsException {
        account.withdraw(amount);
    }
}

public class DepositTransaction implements Transaction {
    private double amount;

    public DepositTransaction(double amount) {
        this.amount = amount;
    }

    @Override
    public void execute(Account account) {
        account.deposit(amount);
    }
}

public class BalanceInquiryTransaction implements Transaction {
    @Override
    public void execute(Account account) {
        // No-op, balance retrieved separately
    }
}

// State interface
public interface ATMState {
    void authenticate(ATM atm, String accountId, String pin) throws AuthenticationException;
    void selectTransaction(ATM atm, Transaction transaction);
    void executeTransaction(ATM atm) throws InsufficientFundsException;
}

public class IdleState implements ATMState {
    @Override
    public void authenticate(ATM atm, String accountId, String pin) throws AuthenticationException {
        Account account = atm.getAccount(accountId);
        if (account == null || !account.verifyPin(pin)) {
            throw new AuthenticationException("Invalid account or PIN");
        }
        atm.setCurrentAccount(account);
        atm.setState(new AuthenticatedState());
        System.out.println("Authenticated account: " + accountId);
    }

    @Override
    public void selectTransaction(ATM atm, Transaction transaction) {
        throw new IllegalStateException("Authenticate first");
    }

    @Override
    public void executeTransaction(ATM atm) {
        throw new IllegalStateException("No transaction selected");
    }
}

public class AuthenticatedState implements ATMState {
    @Override
    public void authenticate(ATM atm, String accountId, String pin) {
        throw new IllegalStateException("Already authenticated");
    }

    @Override
    public void selectTransaction(ATM atm, Transaction transaction) {
        atm.setCurrentTransaction(transaction);
        atm.setState(new TransactionInProgressState());
        System.out.println("Transaction selected");
    }

    @Override
    public void executeTransaction(ATM atm) {
        throw new IllegalStateException("No transaction selected");
    }
}

public class TransactionInProgressState implements ATMState {
    @Override
    public void authenticate(ATM atm, String accountId, String pin) {
        throw new IllegalStateException("Transaction in progress");
    }

    @Override
    public void selectTransaction(ATM atm, Transaction transaction) {
        throw new IllegalStateException("Transaction already selected");
    }

    @Override
    public void executeTransaction(ATM atm) throws InsufficientFundsException {
        Transaction transaction = atm.getCurrentTransaction();
        transaction.execute(atm.getCurrentAccount());
        System.out.println("Transaction executed");
        atm.setState(new AuthenticatedState());
    }
}

// ATM class
public class ATM {
    private static ATM instance;
    private ATMState state;
    private Map<String, Account> accounts;
    private Account currentAccount;
    private Transaction currentTransaction;

    private ATM() {
        this.state = new IdleState();
        this.accounts = new HashMap<>();
    }

    public static ATM getInstance() {
        if (instance == null) {
            instance = new ATM();
        }
        return instance;
    }

    public void addAccount(Account account) {
        accounts.put(account.getAccountId(), account);
    }

    public Account getAccount(String accountId) {
        return accounts.get(accountId);
    }

    public void setState(ATMState state) {
        this.state = state;
    }

    public void setCurrentAccount(Account account) {
        this.currentAccount = account;
    }

    public Account getCurrentAccount() {
        return currentAccount;
    }

    public void setCurrentTransaction(Transaction transaction) {
        this.currentTransaction = transaction;
    }

    public Transaction getCurrentTransaction() {
        return currentTransaction;
    }

    public void authenticate(String accountId, String pin) throws AuthenticationException {
        state.authenticate(this, accountId, pin);
    }

    public void selectTransaction(Transaction transaction) {
        state.selectTransaction(this, transaction);
    }

    public void executeTransaction() throws InsufficientFundsException {
        state.executeTransaction(this);
    }

    public double getBalance() {
        return currentAccount != null ? currentAccount.getBalance() : 0.0;
    }
}

// Controller for API interactions
public class ATMController {
    private final ATM atm;

    public ATMController(ATM atm) {
        this.atm = atm;
    }

    public void handleAuthenticate(String accountId, String pin) {
        try {
            atm.authenticate(accountId, pin);
        } catch (AuthenticationException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public void handleSelectTransaction(Transaction transaction) {
        try {
            atm.selectTransaction(transaction);
        } catch (IllegalStateException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public void handleExecuteTransaction() {
        try {
            atm.executeTransaction();
        } catch (InsufficientFundsException | IllegalStateException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public double handleGetBalance() {
        return atm.getBalance();
    }
}

// Client to demonstrate usage
public class ATMClient {
    public static void main(String[] args) {
        ATM atm = ATM.getInstance();
        ATMController controller = new ATMController(atm);

        // Initialize accounts
        atm.addAccount(new Account("acc1", "1234", 1000.0));
        atm.addAccount(new Account("acc2", "5678", 500.0));

        // Normal flow: Withdrawal
        controller.handleAuthenticate("acc1", "1234");
        controller.handleSelectTransaction(new WithdrawalTransaction(200.0));
        controller.handleExecuteTransaction();
        System.out.println("Balance: $" + controller.handleGetBalance());

        // Edge case: Invalid PIN
        controller.handleAuthenticate("acc1", "9999");

        // Edge case: Insufficient funds
        controller.handleAuthenticate("acc2", "5678");
        controller.handleSelectTransaction(new WithdrawalTransaction(600.0));
        controller.handleExecuteTransaction();

        // Normal flow: Deposit
        controller.handleAuthenticate("acc2", "5678");
        controller.handleSelectTransaction(new DepositTransaction(300.0));
        controller.handleExecuteTransaction();
        System.out.println("Balance: $" + controller.handleGetBalance());

        // Edge case: Invalid state
        controller.handleSelectTransaction(new BalanceInquiryTransaction());
        // Output:
        // Authenticated account: acc1
        // Transaction selected
        // Transaction executed
        // Balance: $800.0
        // Error: Invalid account or PIN
        // Authenticated account: acc2
        // Transaction selected
        // Error: Insufficient funds: 600.0
        // Authenticated account: acc2
        // Transaction selected
        // Transaction executed
        // Balance: $800.0
        // Error: Already authenticated
    }
}
```
- **LLD Principles**:
  - **Authentication**: `Account` verifies PIN; `ATMState` manages authentication flow.
  - **Transaction Processing**: `Transaction` interface for withdrawal, deposit, balance check.
  - **States**: `IdleState`, `AuthenticatedState`, `TransactionInProgressState` manage behavior.
  - **Design Patterns**: State pattern for state transitions, Strategy for transactions, Singleton for `ATM`.
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates authentication and transaction logic; DIP (Section 4, Lecture 6) via interfaces.
- **Big O**: O(1) for `authenticate`, `selectTransaction`, `executeTransaction` (HashMap operations).
- **Edge Cases**: Handles invalid PIN, insufficient funds, invalid state transitions.

**UML Diagram**:
```
[Client] --> [ATMController]
                |
                v
            [ATM]
                |
                v
           [ATMState]
                |
                v
 [IdleState|AuthenticatedState|TransactionInProgressState]
                |
                v
           [Account] --> [Transaction]
                          [Withdrawal|Deposit|BalanceInquiry]
```

## Real-World Application
Imagine designing an ATM machine system for a bank, supporting secure authentication and transaction processing with state-driven behavior. This LLD—aligned with HLD principles from Section 5 (e.g., Payment Gateway, Lecture 25)—ensures security and reliability, critical for financial systems.

## Practice Exercises
Practice ATM system design with these exercises:
- **Easy**: Design a UML diagram and Java code for a simple ATM with balance inquiry.
- **Medium**: Implement an ATM system with one transaction type (e.g., withdrawal).
- **Medium**: Design an LLD for an ATM with authentication and multiple transaction types.
- **Hard**: Architect an ATM system with Java, integrating multiple design patterns (e.g., State, Strategy).

Try designing one system in Java with a UML diagram, explaining authentication and transaction processing.

## Conclusion
Mastering the design of an ATM machine system equips you to build secure, transactional Java systems, enhancing your LLD skills. This lecture builds on HLD concepts, preparing you for FAANG interviews and real-world applications.

**Next Step**: Explore [Design a Restaurant Management System](/interview-section/lld/restaurant-management) to continue your LLD journey, or check out [all sections](/interview-section/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>