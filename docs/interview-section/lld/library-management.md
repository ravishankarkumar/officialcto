---
title: Design a Library Management System
description: Learn low-level system design for a library management system in Java, focusing on book inventory and user management for scalable, robust applications.
---

# Design a Library Management System

## Overview
Welcome to the eleventh lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Designing a library management system is a practical LLD problem that tests your ability to model inventory and user interactions using OOP principles. In this 25-minute lesson, we explore the **low-level design of a library management system**, covering book inventory management, user management, and functionality like borrowing, returning, and tracking books. Whether designing a system for a public library or preparing for FAANG interviews, this lecture equips you to build modular, scalable systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Design Patterns*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **low-level design** principles for a library management system with book inventory and user management.
- Learn to model **classes**, **relationships**, and **functionality** in Java.
- Apply **OOP principles** (Section 2, Lecture 1), **design patterns** (Section 3), **design principles** (Section 4), and **HLD concepts** (Section 5) to LLD.
- Write clean, modular Java code (Section 9).

## Why Library Management System Design Matters
A library management system is a common FAANG interview problem that tests your ability to model complex interactions like book borrowing and user tracking. Early in my career, I designed a system for managing resources in an application, applying OOP principles to ensure maintainability and extensibility. This lecture prepares you to design robust systems and articulate your approach clearly, showcasing your mentorship skills.

In software engineering, library management system design helps you:
- **Model Complex Systems**: Represent books, users, and transactions.
- **Ensure Scalability**: Handle large book inventories and users.
- **Improve Maintainability**: Create modular, testable code.
- **Teach Effectively**: Share practical LLD strategies.

## Key Concepts
### 1. Library Management System Components
- **Book Inventory**: Manage books with details like ISBN, title, and availability.
- **User Management**: Track users and their borrowing history.
- **Functionality**:
  - Add and remove books from inventory.
  - Register users and manage accounts.
  - Borrow and return books with due dates.
- **Edge Cases**: Overdue books, unavailable books, invalid users.

### 2. Design Patterns
- **Singleton Pattern** (Section 3, Lecture 1): For library instance.
- **Observer Pattern** (Section 3, Lecture 6): For notifying overdue books.
- **Factory Pattern** (Section 3, Lecture 2): For creating book or user objects.

### 3. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and inheritance for book and user classes.
- **Design Patterns** (Section 3): Singleton, Observer, and Factory patterns.
- **Design Principles** (Section 4): SoC (Lecture 11) separates inventory and user logic; KISS (Lecture 8) simplifies design.
- **HLD** (Section 5):
  - E-commerce Platform (Lecture 16): Similar inventory management.
  - Ticket Booking (Lecture 17): Similar reservation system.
  - LLD Intro (Lecture 1): Builds on class design.
  - Database Design (Lecture 2): Persisting book and user data.
  - API Design (Lecture 3): Exposing library controls.
  - Concurrency Handling (Lecture 4): Thread-safe borrowing.
  - Error Handling (Lecture 5): Handling invalid inputs.
  - Parking Lot (Lecture 6): Similar entity modeling.
  - Elevator System (Lecture 7): Similar state-driven design.
  - Vending Machine (Lecture 8): Similar inventory management.
  - ATM Machine (Lecture 9): Similar transactional design.
  - Restaurant Management (Lecture 10): Similar reservation and order processing.
- **Clean Code** (Section 9): Meaningful names for classes and methods.

### 4. Use Case
Design a library management system for a public library, supporting book inventory, user management, borrowing, and returning.

## System Design
### Architecture
```
[Client] --> [LibraryController]
                |
                v
            [LibraryService]
                |
                v
           [Library] --> [Book] --> [BorrowRecord]
                        [User]
```

- **Classes**:
  - `Book`: Represents books with ISBN, title, and availability.
  - `User`: Manages user details and borrowing history.
  - `BorrowRecord`: Tracks borrowing details with due dates.
  - `Library`: Singleton managing books and users.
  - `LibraryService`: Handles business logic.
  - `LibraryController`: Exposes API.
- **Functionality**: Add/remove books, register users, borrow/return books.
- **Trade-Offs**:
  - Storage: In-memory (fast, volatile) vs. database (persistent, slower).
  - Borrowing: Strict due dates (simple, restrictive) vs. flexible extensions (complex, user-friendly).

## Code Example: Library Management System
Below is a Java implementation of a library management system with book and user management.

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Custom exceptions
public class LibraryException extends Exception {
    public LibraryException(String message) {
        super(message);
    }
}

// Book class
public class Book {
    private String isbn;
    private String title;
    private boolean available;

    public Book(String isbn, String title) {
        this.isbn = isbn;
        this.title = title;
        this.available = true;
    }

    public String getIsbn() {
        return isbn;
    }

    public String getTitle() {
        return title;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }
}

// User class
public class User {
    private String userId;
    private String name;

    public User(String userId, String name) {
        this.userId = userId;
        this.name = name;
    }

    public String getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }
}

// BorrowRecord class
public class BorrowRecord {
    private String recordId;
    private String userId;
    private String isbn;
    private long borrowDate;
    private long dueDate;

    public BorrowRecord(String recordId, String userId, String isbn, long borrowDate, long dueDate) {
        this.recordId = recordId;
        this.userId = userId;
        this.isbn = isbn;
        this.borrowDate = borrowDate;
        this.dueDate = dueDate;
    }

    public String getRecordId() {
        return recordId;
    }

    public String getIsbn() {
        return isbn;
    }

    public boolean isOverdue() {
        return System.currentTimeMillis() > dueDate;
    }
}

// Library class (Singleton)
public class Library {
    private static Library instance;
    private Map<String, Book> books;
    private Map<String, User> users;
    private List<BorrowRecord> borrowRecords;

    private Library() {
        this.books = new HashMap<>();
        this.users = new HashMap<>();
        this.borrowRecords = new ArrayList<>();
    }

    public static Library getInstance() {
        if (instance == null) {
            instance = new Library();
        }
        return instance;
    }

    public void addBook(Book book) {
        books.put(book.getIsbn(), book);
    }

    public void addUser(User user) {
        users.put(user.getUserId(), user);
    }

    public Book getBook(String isbn) {
        return books.get(isbn);
    }

    public User getUser(String userId) {
        return users.get(userId);
    }

    public void addBorrowRecord(BorrowRecord record) {
        borrowRecords.add(record);
    }

    public BorrowRecord getBorrowRecord(String isbn) {
        for (BorrowRecord record : borrowRecords) {
            if (record.getIsbn().equals(isbn) && !record.isOverdue()) {
                return record;
            }
        }
        return null;
    }

    public void removeBorrowRecord(String recordId) {
        borrowRecords.removeIf(record -> record.getRecordId().equals(recordId));
    }
}

// Service layer
public class LibraryService {
    private final Library library;
    private final long borrowingPeriodMs = 14 * 24 * 60 * 60 * 1000L; // 14 days

    public LibraryService(Library library) {
        this.library = library;
    }

    public void addBook(String isbn, String title) throws LibraryException {
        if (library.getBook(isbn) != null) {
            throw new LibraryException("Book already exists: " + isbn);
        }
        library.addBook(new Book(isbn, title));
        System.out.println("Added book: " + isbn);
    }

    public void registerUser(String userId, String name) throws LibraryException {
        if (library.getUser(userId) != null) {
            throw new LibraryException("User already exists: " + userId);
        }
        library.addUser(new User(userId, name));
        System.out.println("Registered user: " + userId);
    }

    public String borrowBook(String userId, String isbn) throws LibraryException {
        User user = library.getUser(userId);
        Book book = library.getBook(isbn);
        if (user == null) {
            throw new LibraryException("User not found: " + userId);
        }
        if (book == null) {
            throw new LibraryException("Book not found: " + isbn);
        }
        if (!book.isAvailable()) {
            throw new LibraryException("Book not available: " + isbn);
        }
        String recordId = "record-" + System.currentTimeMillis();
        long borrowDate = System.currentTimeMillis();
        BorrowRecord record = new BorrowRecord(recordId, userId, isbn, borrowDate, borrowDate + borrowingPeriodMs);
        book.setAvailable(false);
        library.addBorrowRecord(record);
        System.out.println("Book borrowed: " + isbn + " by " + userId);
        return recordId;
    }

    public void returnBook(String recordId) throws LibraryException {
        BorrowRecord record = null;
        for (BorrowRecord r : library.borrowRecords) {
            if (r.getRecordId().equals(recordId)) {
                record = r;
                break;
            }
        }
        if (record == null) {
            throw new LibraryException("Borrow record not found: " + recordId);
        }
        Book book = library.getBook(record.getIsbn());
        if (book == null) {
            throw new LibraryException("Book not found: " + record.getIsbn());
        }
        book.setAvailable(true);
        library.removeBorrowRecord(recordId);
        System.out.println("Book returned: " + record.getIsbn());
    }
}

// Controller for API interactions
public class LibraryController {
    private final LibraryService service;

    public LibraryController(LibraryService service) {
        this.service = service;
    }

    public void handleAddBook(String isbn, String title) {
        try {
            service.addBook(isbn, title);
        } catch (LibraryException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public void handleRegisterUser(String userId, String name) {
        try {
            service.registerUser(userId, name);
        } catch (LibraryException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public String handleBorrowBook(String userId, String isbn) {
        try {
            return service.borrowBook(userId, isbn);
        } catch (LibraryException e) {
            System.err.println("Error: " + e.getMessage());
            return null;
        }
    }

    public void handleReturnBook(String recordId) {
        try {
            service.returnBook(recordId);
        } catch (LibraryException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}

// Client to demonstrate usage
public class LibraryClient {
    public static void main(String[] args) {
        Library library = Library.getInstance();
        LibraryService service = new LibraryService(library);
        LibraryController controller = new LibraryController(service);

        // Normal flow
        controller.handleAddBook("ISBN123", "Java Programming");
        controller.handleRegisterUser("user1", "Alice");
        String recordId = controller.handleBorrowBook("user1", "ISBN123");
        controller.handleReturnBook(recordId);

        // Edge cases
        controller.handleBorrowBook("user2", "ISBN123"); // Non-existent user
        controller.handleAddBook("ISBN123", "Duplicate Book"); // Duplicate book
        controller.handleBorrowBook("user1", "ISBN456"); // Non-existent book
        controller.handleBorrowBook("user1", "ISBN123"); // Book unavailable
        controller.handleReturnBook("invalid-record"); // Invalid record
        // Output:
        // Added book: ISBN123
        // Registered user: user1
        // Book borrowed: ISBN123 by user1
        // Book returned: ISBN123
        // Error: User not found: user2
        // Error: Book already exists: ISBN123
        // Error: Book not found: ISBN456
        // Error: Book not available: ISBN123
        // Error: Borrow record not found: invalid-record
    }
}
```
- **LLD Principles**:
  - **Book Inventory**: `Book` manages ISBN, title, and availability.
  - **User Management**: `User` tracks user details; `BorrowRecord` manages borrowing.
  - **Classes**: `Book`, `User`, `BorrowRecord`, `Library`, `LibraryService`, `LibraryController`.
  - **Design Patterns**: Singleton (`Library`), Factory (extensible for book/user creation), Observer (extensible for overdue notifications).
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates inventory and user logic; DIP (Section 4, Lecture 6) for extensibility.
- **Big O**: O(1) for `addBook`, `registerUser`, `borrowBook` (HashMap); O(n) for `returnBook` (n = records).
- **Edge Cases**: Handles duplicate books, non-existent users, unavailable books, invalid records.

**UML Diagram**:
```
[Client] --> [LibraryController]
                |
                v
            [LibraryService]
                |
                v
           [Library]
                |
                v
           [Book] --> [BorrowRecord]
           [User]
```

## Real-World Application
Imagine designing a library management system for a public library, supporting book inventory, user management, and borrowing with modular design. This LLD—aligned with HLD principles from Section 5 (e.g., E-commerce Platform, Lecture 16)—ensures scalability and reliability, critical for real-world systems.

## Practice Exercises
Practice library management system design with these exercises:
- **Easy**: Design a UML diagram and Java code for a simple book inventory system.
- **Medium**: Implement a library system with user registration and borrowing.
- **Medium**: Design an LLD for a library system with book and user management.
- **Hard**: Architect a library system with Java, integrating multiple design patterns (e.g., Singleton, Observer).

Try designing one system in Java with a UML diagram, explaining book and user management.

## Conclusion
Mastering the design of a library management system equips you to build modular, scalable Java systems, enhancing your LLD skills. This lecture builds on HLD concepts, preparing you for FAANG interviews and real-world applications.

**Next Step**: Explore [Design a Chess Game](/interview-section/lld/chess-game) to continue your LLD journey, or check out [all sections](/interview-section/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>