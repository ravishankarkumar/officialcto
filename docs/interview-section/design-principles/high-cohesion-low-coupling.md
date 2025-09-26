---
title: High Cohesion & Low Coupling
description: Learn the principle of High Cohesion and Low Coupling in Java. Discover how to group related responsibilities and minimize dependencies for modular, maintainable systems with examples, UML, and interview prep.
---

# High Cohesion & Low Coupling

## Overview
The principle of **High Cohesion & Low Coupling** emphasizes designing classes and modules so that each has a clear, focused purpose (high cohesion) and minimal dependencies on other components (low coupling). Together, these principles lead to software that is easier to maintain, extend, and test. They form the foundation of modular design in object-oriented systems.

## Learning Objectives
- Understand what **cohesion** and **coupling** mean in software design.  
- Learn why high cohesion and low coupling are desirable.  
- Implement examples in Java to illustrate both good and bad designs.  
- Apply these concepts with UML diagrams and real-world analogies.  
- Prepare for interviews with practical questions on cohesion and coupling.  

## Why It Matters
- **High Cohesion**: When a class or module focuses on a single, well-defined purpose, it is easier to understand, reuse, and maintain.  
- **Low Coupling**: When components depend minimally on each other, changes in one module don’t ripple across the system.  

Together, they improve:  
- **Modularity**: Systems can be developed and tested in parts.  
- **Scalability**: New features can be added with minimal impact.  
- **Maintainability**: Easier debugging and reduced regression risk.  

## Key Concepts
1. **Cohesion**: Degree to which elements inside a module belong together.  
   - High Cohesion: Related tasks grouped together.  
   - Low Cohesion: A “God Class” doing too many unrelated tasks.  

2. **Coupling**: Degree of interdependence between modules.  
   - Low Coupling: Modules interact via simple, stable interfaces.  
   - High Coupling: Modules rely on each other’s internal details.  

3. **Relation to Other Principles**:  
   - SRP promotes cohesion by assigning one responsibility per class.  
   - DIP reduces coupling by depending on abstractions.  
   - Information Hiding prevents unnecessary coupling.  

## Code Example: Library Management System

### Bad Design: Low Cohesion, High Coupling
```java
// God Class doing everything
public class LibraryManager {
    // Data
    private List<String> books = new ArrayList<>();
    private Map<String, String> borrowed = new HashMap<>();
    
    // Add book
    public void addBook(String title) {
        books.add(title);
    }
    
    // Borrow book
    public void borrowBook(String title, String user) {
        if (books.contains(title)) {
            borrowed.put(title, user);
            books.remove(title);
        }
    }
    
    // Print report
    public void printReport() {
        System.out.println("Books: " + books);
        System.out.println("Borrowed: " + borrowed);
    }
}
```
- **Problems**:  
  - Class handles unrelated concerns (storage, borrowing, reporting).  
  - Coupling between data and operations is too tight.  
  - Hard to test or extend (e.g., change reporting format).  

### Good Design: High Cohesion, Low Coupling
```java
// Separate classes for different responsibilities

class BookCatalog {
    private List<String> books = new ArrayList<>();
    public void addBook(String title) { books.add(title); }
    public boolean contains(String title) { return books.contains(title); }
    public void removeBook(String title) { books.remove(title); }
    public List<String> listBooks() { return new ArrayList<>(books); }
}

class BorrowingService {
    private Map<String, String> borrowed = new HashMap<>();
    public void borrow(String title, String user, BookCatalog catalog) {
        if (catalog.contains(title)) {
            borrowed.put(title, user);
            catalog.removeBook(title);
        }
    }
    public Map<String, String> getBorrowed() { return new HashMap<>(borrowed); }
}

class ReportGenerator {
    public void printReport(BookCatalog catalog, BorrowingService borrowing) {
        System.out.println("Books: " + catalog.listBooks());
        System.out.println("Borrowed: " + borrowing.getBorrowed());
    }
}

public class Client {
    public static void main(String[] args) {
        BookCatalog catalog = new BookCatalog();
        BorrowingService borrowing = new BorrowingService();
        ReportGenerator report = new ReportGenerator();
        
        catalog.addBook("Design Patterns");
        catalog.addBook("Effective Java");
        
        borrowing.borrow("Design Patterns", "Alice", catalog);
        
        report.printReport(catalog, borrowing);
    }
}
```
- **Advantages**:  
  - High Cohesion: Each class has a single, focused responsibility.  
  - Low Coupling: Classes interact through clear, minimal APIs.  
  - Flexibility: Easy to change reporting without touching catalog or borrowing logic.  

### UML (After)
```
+-----------------+    +------------------+    +------------------+
|  BookCatalog    |    | BorrowingService |    | ReportGenerator  |
+-----------------+    +------------------+    +------------------+
| +addBook()      |    | +borrow()        |    | +printReport()   |
| +removeBook()   |    | +getBorrowed()   |    +------------------+
| +listBooks()    |    +------------------+
+-----------------+
```

## Real-World Applications
- **Microservices**: Services should be cohesive (focused on one domain) and loosely coupled (communicate via APIs).  
- **UI Components**: Buttons, forms, and layouts should encapsulate their logic and interact minimally.  
- **Enterprise Systems**: Divide into cohesive modules (billing, inventory, reporting) with minimal coupling.  
- **Frameworks**: Spring promotes cohesion (focused beans) and low coupling (dependency injection).  

## Practice Exercises
- **Easy**: Refactor a `UserManager` class that mixes authentication, logging, and reporting into cohesive classes.  
- **Medium**: Build a `ShoppingCart` with separate classes for item management, discounts, and payment.  
- **Medium**: Design a `ChatApplication` with separate services for messaging, notifications, and persistence.  
- **Hard**: Implement a `HospitalSystem` with cohesive modules (Patient, Doctor, Appointment, Billing) and low coupling between them.  

## Interview Insights
- *“What is cohesion? What is coupling?”*  
- *“Why is high cohesion and low coupling desirable?”*  
- *“How do SRP and DIP relate to cohesion and coupling?”*  
- *“Give an example where high coupling caused system issues.”*  

## Conclusion
High Cohesion and Low Coupling are core principles for building modular, maintainable software. By grouping related responsibilities together and minimizing dependencies, you design Java systems that are easier to understand, extend, and test.

**Next Step**: Explore [GRASP Principles](/interview-section/design-principles/pola-grasp-principles) to learn advanced responsibility assignment guidelines for object-oriented systems.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
