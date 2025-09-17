---
title: DRY - Don’t Repeat Yourself
description: Master the DRY principle in Java to eliminate code duplication, with practical examples for better software engineering.
---

# DRY: Don’t Repeat Yourself

## Overview
The DRY (Don’t Repeat Yourself) principle, popularized by *The Pragmatic Programmer*, emphasizes that every piece of knowledge in a system should have a single, unambiguous representation, avoiding code duplication to enhance maintainability. In this seventh lesson of Section 4 in the *Official CTO* journey, we explore **DRY**, its implementation in Java, and its applications in system design. Whether consolidating report generation logic in an e-commerce app or streamlining user validation in a social platform, DRY reduces redundancy and improves efficiency. By mastering DRY, you’ll create maintainable Java systems and mentor others effectively.

Inspired by *Clean Code*, *Effective Java*, and *The Pragmatic Programmer*, this 20-minute lesson covers the concepts, a practical Java example with a UML diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand the **DRY principle** and its role in software design.
- Learn to implement **DRY** in Java to eliminate code duplication.
- Apply **OOP principles** (Section 2, Lecture 1), **UML** (Section 2, Lecture 2), and **design patterns** (Section 3) to DRY design.
- Use DRY in real-world scenarios with clean code practices (Section 9).

## Why the DRY Principle Matters
DRY eliminates redundant code, reducing maintenance overhead and the risk of inconsistencies. Early in my career, I refactored a reporting system for an e-commerce platform by consolidating duplicate logic, making updates easier and less error-prone. This principle—leveraging modularity and abstraction—aligns with clean code practices and is critical for FAANG-level designs. Explaining DRY clearly showcases your mentorship skills.

In software engineering, DRY helps you:
- **Reduce Maintenance**: Update logic in one place.
- **Improve Consistency**: Avoid discrepancies from duplicated code.
- **Enhance Readability**: Simplify codebases with clear abstractions.
- **Teach Effectively**: Share efficient design strategies with teams.

## Key Concepts
### 1. DRY Principle Overview
Introduced by Andrew Hunt and David Thomas, DRY ensures that every piece of knowledge (e.g., business logic, algorithms) is represented once, avoiding duplication across code, documentation, or data.

**Core Idea**:
- Consolidate repeated logic into reusable components (e.g., methods, classes).
- Use abstractions (e.g., interfaces, utilities) to centralize functionality.

### 2. DRY and SOLID
- **Single Responsibility** (Lecture 2): DRY complements SRP by ensuring single-purpose classes avoid redundant logic.
- **Open-Closed** (Lecture 3): DRY supports extensibility by reusing common logic.
- **Liskov Substitution** (Lecture 4): DRY ensures consistent behavior in hierarchies.
- **Interface Segregation** (Lecture 5): DRY aligns with focused interfaces.
- **Dependency Inversion** (Lecture 6): DRY leverages abstractions for reuse.

### 3. Relation to Design Patterns
- **Template Method** (Section 3, Lecture 13): Reuses algorithm skeletons.
- **Strategy Pattern** (Section 3, Lecture 10): Centralizes interchangeable logic.
- **Decorator** (Section 3, Lecture 7): Reuses behavior extensions.

### 4. Use Cases
- Consolidating report formatting logic in an e-commerce app.
- Reusing validation logic in a social app’s user manager.
- Centralizing logging utilities in a cloud system.

**Example**: Refactoring a reporting system to consolidate duplicate formatting logic.

## Code Example: Reporting System Refactoring
Let’s refactor a reporting system to follow DRY, with a UML class diagram.

### Before DRY: Duplicated Code
**UML Diagram (Before)**
```
+---------------------+
|   SalesReport       |
+---------------------+
| +generateReport(data: List<String>) |
+---------------------+
+---------------------+
|  InventoryReport    |
+---------------------+
| +generateReport(data: List<String>) |
+---------------------+
```

```java
// Duplicated report generation (violates DRY)
public class SalesReport {
    public void generateReport(List<String> data) {
        // Format header
        StringBuilder report = new StringBuilder();
        report.append("===== Sales Report =====\n");
        report.append("Date: ").append(new java.util.Date()).append("\n");
        report.append("-----------------------\n");
        
        // Format data
        for (String item : data) {
            report.append(item).append("\n");
        }
        
        // Format footer
        report.append("=======================\n");
        System.out.println(report.toString());
    }
}

public class InventoryReport {
    public void generateReport(List<String> data) {
        // Format header
        StringBuilder report = new StringBuilder();
        report.append("===== Inventory Report =====\n");
        report.append("Date: ").append(new java.util.Date()).append("\n");
        report.append("-----------------------\n");
        
        // Format data
        for (String item : data) {
            report.append(item).append("\n");
        }
        
        // Format footer
        report.append("=======================\n");
        System.out.println(report.toString());
    }
}
```
- **Issues**:
  - Violates DRY: Identical header, footer, and data formatting logic in both classes.
  - Hard to maintain: Changes to formatting require updates in multiple places.
  - Error-prone: Inconsistent updates lead to discrepancies.

### After DRY: Consolidated Logic
**UML Diagram (After)**
```
+---------------------+
|   ReportFormatter   |
+---------------------+
| +formatReport(title: String, data: List<String>): String |
+---------------------+
            |
            | used by
+---------------------+       +---------------------+
|   SalesReport       |       |  InventoryReport    |
+---------------------+       +---------------------+
| -formatter: ReportFormatter | -formatter: ReportFormatter |
+---------------------+       +---------------------+
| +generateReport(data: List<String>) | +generateReport(data: List<String>) |
+---------------------+       +---------------------+
```

```java
// Consolidated report formatting following DRY
public class ReportFormatter {
    public String formatReport(String title, List<String> data) {
        StringBuilder report = new StringBuilder();
        // Format header
        report.append("===== ").append(title).append(" =====\n");
        report.append("Date: ").append(new java.util.Date()).append("\n");
        report.append("-----------------------\n");
        
        // Format data
        for (String item : data) {
            report.append(item).append("\n");
        }
        
        // Format footer
        report.append("=======================\n");
        return report.toString();
    }
}

public class SalesReport {
    private final ReportFormatter formatter;
    
    public SalesReport(ReportFormatter formatter) {
        this.formatter = formatter;
    }
    
    public void generateReport(List<String> data) {
        String report = formatter.formatReport("Sales Report", data);
        System.out.println(report);
    }
}

public class InventoryReport {
    private final ReportFormatter formatter;
    
    public InventoryReport(ReportFormatter formatter) {
        this.formatter = formatter;
    }
    
    public void generateReport(List<String> data) {
        String report = formatter.formatReport("Inventory Report", data);
        System.out.println(report);
    }
}

public class ReportClient {
    public static void main(String[] args) {
        ReportFormatter formatter = new ReportFormatter();
        SalesReport salesReport = new SalesReport(formatter);
        InventoryReport inventoryReport = new InventoryReport(formatter);
        
        List<String> salesData = List.of("Sale: $100", "Sale: $200");
        List<String> inventoryData = List.of("Item: Laptop", "Item: Phone");
        
        salesReport.generateReport(salesData);
        inventoryReport.generateReport(inventoryData);
        // Output:
        // ===== Sales Report =====
        // Date: [current date]
        // -----------------------
        // Sale: $100
        // Sale: $200
        // =======================
        // ===== Inventory Report =====
        // Date: [current date]
        // -----------------------
        // Item: Laptop
        // Item: Phone
        // =======================
    }
}
```
- **DRY and OOP Principles**:
  - **DRY**: `ReportFormatter` consolidates formatting logic, eliminating duplication.
  - **Encapsulation**: Private `formatter` field with constructor injection.
  - **Abstraction**: `ReportFormatter` hides formatting details.
  - **Clean Code**: Meaningful names, modularity (Section 9).
- **Big O**: O(n) for `formatReport` (n = data size), O(1) for other operations.
- **Edge Cases**: Handles empty data lists, null inputs via validation (implementation-specific).

**Systematic Approach**:
- Clarified requirements (generate reports, consolidate formatting logic).
- Designed UML diagrams to show duplicated vs. DRY-compliant designs.
- Refactored Java code to follow DRY, using Dependency Injection (Section 3, Lecture 14).
- Tested with `main` method for different report types.

## Real-World Application
Imagine designing a reporting system for an e-commerce app, where DRY consolidates duplicate formatting logic into a single utility, ensuring updates to headers or footers occur in one place. This reduces maintenance effort and prevents inconsistencies when adding new report types. DRY—paired with principles like SRP (Lecture 2) and patterns like Template Method (Section 3, Lecture 13)—demonstrates your ability to mentor teams on efficient design.

## Practice Exercises
Apply the DRY principle with these exercises:
- **Easy**: Design a UML diagram and Java code for a `Logger` system, consolidating duplicate logging logic.
- **Medium**: Refactor a `Validation` system for a social app to follow DRY, centralizing user validation rules.
- **Medium**: Create a `Formatter` for a reporting system, consolidating CSV and JSON output logic.
- **Hard**: Design a `Notification` system for a cloud app, centralizing message formatting logic.

Try refactoring one system in Java with a UML diagram, explaining how DRY improves maintainability.

## Conclusion
The DRY principle equips you to design maintainable, efficient Java systems by eliminating code duplication. By mastering DRY, you’ll optimize software, enhance consistency, and teach others effectively. This advances your progress in Section 4 of the *Official CTO* journey.

**Next Step**: Explore [KISS: Keep It Simple, Stupid](/interview-section/design-principles/kiss-principle) to learn about simplifying designs, or check out [all sections](/interview-section/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>