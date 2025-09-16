---
title: Advanced Refactoring Techniques and Tools
description: Learn advanced refactoring techniques like Replace Inheritance with Delegation and Extract Superclass, using a Java-based inventory system example, tailored for FAANG interviews.
---

# Advanced Refactoring Techniques and Tools

## Overview
Welcome to the sixth lecture of **Section 10: Mastering Refactoring** in the *Official CTO* journey! **Advanced refactoring techniques** like Replace Inheritance with Delegation, Extract Superclass, and Consolidate Conditional Expression enhance code extensibility and maintainability, while tools like IntelliJ and SonarQube streamline the process. In this 20-minute lesson, we explore these techniques and tools, using a Java-based example of an inventory system for extensibility. Drawing from my 8+ years of mentoring engineers, this lecture equips you for FAANG interviews and real-world projects. Let’s continue your *Official CTO* journey!

Inspired by *Refactoring* by Martin Fowler, *Code Complete 2* (Chapter 24), and Refactoring.Guru, this lesson provides actionable insights and a practical example.

## Learning Objectives
- Master **advanced refactoring techniques**: Replace Inheritance with Delegation, Extract Superclass, Consolidate Conditional Expression.
- Learn to use **tools** like IntelliJ and SonarQube for refactoring.
- Prepare for **FAANG interviews** with advanced refactoring questions.
- Apply refactoring in an **inventory system** example.

## Why Advanced Refactoring Matters
Advanced refactoring techniques and tools ensure code is extensible, maintainable, and FAANG-ready. Drawing from my experience mentoring engineers, I’ve seen these skills distinguish candidates in code reviews and leadership roles. This lecture ensures you can apply advanced techniques, leverage tools, and align with industry standards.

In software engineering, advanced refactoring helps you:
- **Ace Interviews**: Demonstrate expertise in complex refactoring tasks.
- **Reduce Technical Debt**: Simplify maintenance and prevent rewrites.
- **Enhance Extensibility**: Build systems that adapt to new requirements.
- **Improve Collaboration**: Create clear, maintainable code with tool support.

## Key Concepts
### 1. Replace Inheritance with Delegation
- **Definition**: Replace inheritance with composition to reduce tight coupling (*Refactoring* by Fowler).
- **Benefits**: Increases flexibility, avoids rigid hierarchies.
- **Example**: Delegate inventory validation to a separate component.

### 2. Extract Superclass
- **Definition**: Extract common logic into a superclass to reduce duplication (*Refactoring*).
- **Benefits**: Promotes code reuse, simplifies maintenance.
- **Example**: Create a superclass for inventory item types.

### 3. Consolidate Conditional Expression
- **Definition**: Combine multiple conditionals into a single expression (*Refactoring*).
- **Benefits**: Improves readability, reduces complexity.
- **Example**: Consolidate inventory stock checks.

### 4. Refactoring Tools
- **IntelliJ**: Automates refactorings like Extract Method, Replace Inheritance.
- **SonarQube**: Detects code smells, suggests improvements.
- **Example**: Use IntelliJ to refactor an inventory system.

### 5. Role in FAANG Interviews
- Technical questions test advanced refactoring (e.g., “Refactor this inheritance hierarchy”).
- Behavioral questions assess experience (e.g., “Tell me about a time you improved extensibility”).
- Align with company priorities (e.g., Google’s clarity, Amazon’s ownership).

### 6. Relation to Previous Sections
- **Algorithms** (Section 1): Refactoring clarifies algorithmic logic.
- **OOD** (Section 2): Aligns with composition and inheritance design.
- **Design Patterns** (Section 3): Supports delegation and abstraction patterns.
- **Design Principles** (Section 4): Builds on SOLID principles.
- **HLD/LLD** (Sections 5–6): Refactoring supports system design (e.g., Mock LLD Interview, Lecture 31).
- **Behavioral Skills** (Section 7): Articulating refactoring builds on communication (Lecture 2).
- **Domain-Specific Topics** (Section 8): Refactoring enhances cloud systems (e.g., microservices, Lecture 7).
- **Clean Code** (Section 9): Builds on readability, modularity, error handling, testability, documentation.
- **Refactoring Intro** (Section 10, Lecture 1): Builds on refactoring goals.
- **Code Smells** (Section 10, Lecture 2): Addresses smells like Large Class.
- **Simplifying Code** (Section 10, Lecture 3): Complements simplification techniques.
- **Patterns and Principles** (Section 10, Lecture 4): Builds on SOLID and Strategy pattern.
- **Concurrency and Performance** (Section 10, Lecture 5): Enhances extensible concurrency.

## Code Example: Refactoring an Inventory System
Below is a Java example showing a poorly written inventory system with code smells, followed by its refactored version using advanced techniques.

### Before Refactoring
```java
public class InventoryItem extends Product {
    private String name;
    private double price;
    private int stock;
    private boolean isAvailable;

    public InventoryItem(String name, double price, int stock) {
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.isAvailable = stock > 0;
    }

    public String updateStock(String itemName, int quantity, boolean isRestock, boolean checkAvailability) {
        if (itemName != null && itemName.equals(name)) {
            if (checkAvailability) {
                if (stock > 0 && quantity <= stock) {
                    stock -= quantity;
                    isAvailable = stock > 0;
                    return "Stock updated: " + stock;
                } else {
                    return "Insufficient stock";
                }
            } else if (isRestock) {
                stock += quantity;
                isAvailable = stock > 0;
                return "Stock restocked: " + stock;
            } else {
                return "Invalid operation";
            }
        }
        return "Item not found";
    }
}

class Product {
    protected String name;
    protected double price;
}
```

### After Refactoring
```java
/**
 * Abstract base class for inventory items.
 */
public abstract class InventoryItem {
    protected final String name;
    protected final double price;

    protected InventoryItem(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }
}

/**
 * Manages stock for an inventory item.
 */
public class StockItem extends InventoryItem {
    private final StockManager stockManager;

    /**
     * Constructs a StockItem with stock management capabilities.
     *
     * @param name Item name
     * @param price Item price
     * @param initialStock Initial stock quantity
     * @param stockManager Manages stock operations
     */
    public StockItem(String name, double price, int initialStock, StockManager stockManager) {
        super(name, price);
        this.stockManager = stockManager;
        this.stockManager.initializeStock(initialStock);
    }

    /**
     * Updates stock based on the operation.
     *
     * @param quantity Quantity to update
     * @param isRestock True for restock, false for reduction
     * @return Result of the stock update
     */
    public String updateStock(int quantity, boolean isRestock) {
        if (quantity <= 0) {
            return "Invalid quantity";
        }
        return isRestock ? stockManager.restock(quantity) : stockManager.reduceStock(quantity);
    }
}

/**
 * Manages stock operations for an item.
 */
public class StockManager {
    private int stock;
    private boolean isAvailable;

    public void initializeStock(int initialStock) {
        this.stock = initialStock;
        this.isAvailable = initialStock > 0;
    }

    public String restock(int quantity) {
        stock += quantity;
        isAvailable = true;
        return "Stock restocked: " + stock;
    }

    public String reduceStock(int quantity) {
        if (!isStockSufficient(quantity)) {
            return "Insufficient stock";
        }
        stock -= quantity;
        isAvailable = stock > 0;
        return "Stock updated: " + stock;
    }

    private boolean isStockSufficient(int quantity) {
        return stock > 0 && quantity <= stock;
    }
}
```

### Unit Tests
```java
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class StockItemTest {
    private StockItem item;

    @BeforeEach
    void setUp() {
        StockManager stockManager = new StockManager();
        item = new StockItem("Laptop", 999.99, 10, stockManager);
    }

    @Test
    void testReduceStock_Success() {
        String result = item.updateStock(5, false);
        assertEquals("Stock updated: 5", result);
    }

    @Test
    void testRestock_Success() {
        String result = item.updateStock(5, true);
        assertEquals("Stock restocked: 15", result);
    }

    @Test
    void testReduceStock_Insufficient() {
        String result = item.updateStock(15, false);
        assertEquals("Insufficient stock", result);
    }

    @Test
    void testInvalidQuantity() {
        String result = item.updateStock(0, false);
        assertEquals("Invalid quantity", result);
    }
}
```

- **Explanation**:
  - **Before Refactoring**: The original code uses inheritance (`extends Product`), has a Large Class smell (mixing item and stock logic), and complex conditionals.
  - **After Refactoring**:
    - **Replace Inheritance with Delegation**: Delegates stock operations to `StockManager`, reducing coupling.
    - **Extract Superclass**: Creates `InventoryItem` for shared attributes (`name`, `price`).
    - **Consolidate Conditional Expression**: Combines stock checks into `isStockSufficient`.
  - **Tools**: IntelliJ can automate Extract Superclass; SonarQube can detect Large Class smells.
  - **Test-Driven**: Unit tests ensure behavior preservation (*Refactoring* by Fowler).
  - **Improvements**: Enhances extensibility, reduces complexity, improves maintainability.
- **Setup**:
  - Add dependency: `org.junit.jupiter:junit-jupiter`.
  - Run tests with `mvn test` or an IDE.
  - Use IntelliJ for automated refactoring (e.g., Extract Superclass).
- **Big O**: O(1) for stock updates and checks.
- **Edge Cases**: Handles invalid quantities, insufficient stock, and restocking scenarios.
- **Trade-Offs**: Delegation for flexibility vs. inheritance for simplicity; superclass for reuse vs. standalone classes.

## FAANG-Specific Tips
- **Amazon (Ownership)**:
  - Highlight ownership in advanced refactoring (e.g., “I refactored for extensibility”).
  - Emphasize scalability (e.g., “Improved inventory system scalability”).
  - STAR Response:
    - **Situation**: “Our inventory system was rigid and hard to extend.”
    - **Task**: “I was responsible for refactoring.”
    - **Action**: “I used delegation and Extract Superclass, ensuring test coverage.”
    - **Result**: “Improved extensibility, reducing maintenance time by 30%.”
- **Google (Clarity)**:
  - Focus on Google’s Java Style Guide (e.g., “I refactored with clear delegation”).
  - Emphasize collaboration (e.g., “Aligned with team on refactoring”).
  - STAR Response:
    - **Situation**: “Our inventory code lacked clarity.”
    - **Task**: “I was tasked with refactoring.”
    - **Action**: “I applied Extract Superclass per Google’s style guide, collaborating on reviews.”
    - **Result**: “Improved clarity, praised by team.”
- **Meta (Execution Speed)**:
  - Highlight rapid refactoring (e.g., “I refactored in a sprint”).
  - Focus on maintainability (e.g., “Enabled faster updates”).
  - STAR Response:
    - **Situation**: “Our inventory system slowed development.”
    - **Task**: “I was responsible for refactoring.”
    - **Action**: “I quickly applied delegation and consolidated conditionals.”
    - **Result**: “Reduced maintenance time by 25%.”
- **Netflix (Freedom & Responsibility)**:
  - Emphasize autonomous refactoring (e.g., “I independently refactored code”).
  - Focus on high-impact outcomes (e.g., “Improved extensibility”).
  - STAR Response:
    - **Situation**: “Our inventory system was unmaintainable.”
    - **Task**: “I was responsible for improvements.”
    - **Action**: “I independently applied Extract Superclass and delegation.”
    - **Result**: “Reduced bugs by 30%, boosting extensibility.”

## Practice Exercise
**Problem**: Refactor an inventory system using advanced techniques.
1. **Define Requirements**:
   - Apply Replace Inheritance with Delegation, Extract Superclass, Consolidate Conditional Expression.
   - Ensure behavior preservation with unit tests.
2. **Craft a STAR Response**:
   - **Situation**: Describe a project with rigid code (e.g., inventory system).
   - **Task**: Clarify your role (e.g., code refactorer).
   - **Action**: List 2–3 actions (e.g., applied delegation, extracted superclass).
   - **Result**: Quantify outcomes (e.g., reduced complexity, improved extensibility).
3. **Write Refactored Code**:
   - Refactor a Java class using specified techniques.
   - Write unit tests to verify behavior.
   - Test with `mvn test`.
   - Optionally, use IntelliJ to automate refactorings.
4. **Tailor to a FAANG Company**:
   - Align with Amazon (Ownership), Google (Clarity), Meta (speed), or Netflix (autonomy).
5. **Write and Review**:
   - Write a 100–150 word STAR response.
   - Ensure clarity, specificity, and alignment with advanced refactoring principles.

**Sample Response (Google - Clarity)**:
- **Situation**: “Our inventory system had unclear, rigid code.”
- **Task**: “As lead, I was responsible for refactoring.”
- **Action**: “I applied Extract Superclass and delegation per Google’s style guide, collaborating on reviews.”
- **Result**: “Reduced complexity by 25%, praised for clarity.”

## Conclusion
Mastering advanced refactoring techniques and tools equips you to excel in FAANG interviews and build extensible systems. This lecture builds on refactoring goals, code smells, simplification, patterns, and concurrency from Lectures 1–5, advancing your *Official CTO* journey.

**Next Step**: Explore [Refactoring Case Study: Monolith to Microservices](/sections/refactoring/monolith-microservices) or revisit [all sections](/sections/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>