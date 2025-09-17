---
title: Strategy Pattern
description: Master the Strategy pattern in Java to implement interchangeable algorithms, with practical examples for better software engineering.
---

# Strategy Pattern

## Overview
The Strategy pattern is a behavioral design pattern that enables interchangeable algorithms to be selected at runtime, promoting flexibility and modularity. In this tenth lesson of Section 3 in the *Official CTO* journey, we explore the **Strategy pattern**, its implementation in Java, and its applications in system design. Whether sorting products in an e-commerce catalog or applying discounts in a retail app, this pattern ensures dynamic behavior. By mastering Strategy, you’ll create adaptable Java systems and mentor others effectively.

Inspired by *Design Patterns* by Gang of Four, *Head First Design Patterns*, and *Clean Code*, this 20-minute lesson covers the concepts, a practical Java example with a UML diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand the **Strategy pattern** and its role as a behavioral pattern.
- Learn to implement a **Strategy** in Java for interchangeable algorithms.
- Apply **OOP principles** (Section 2, Lecture 1) and **UML** (Section 2, Lecture 2) to Strategy design.
- Use the pattern in real-world scenarios with clean code practices (Section 9).

## Why the Strategy Pattern Matters
The Strategy pattern allows systems to switch algorithms dynamically, enhancing flexibility without altering core logic. Early in my career, I used it to implement sorting strategies for an e-commerce product catalog, enabling users to sort by price or rating seamlessly. This pattern—leveraging polymorphism and encapsulation—promotes maintainability and scalability. Explaining it clearly showcases your mentorship skills.

In software engineering, the Strategy pattern helps you:
- **Enable Flexibility**: Switch algorithms at runtime.
- **Enhance Modularity**: Encapsulate algorithms for low coupling.
- **Improve Maintainability**: Write clean, reusable code (Section 9).
- **Teach Effectively**: Share dynamic design solutions with teams.

## Key Concepts
### 1. Strategy Pattern Overview
The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable within a context.

**Structure**:
- **Context**: Maintains a reference to a strategy (e.g., `ProductCatalog`).
- **Strategy Interface**: Defines the algorithm interface (e.g., `SortStrategy`).
- **Concrete Strategies**: Implement specific algorithms (e.g., `PriceSort`, `RatingSort`).
- **Client**: Configures the context with a strategy.

### 2. Comparison to Other Behavioral Patterns
- **Strategy**: Encapsulates interchangeable algorithms.
- **Observer** (upcoming Lecture 11): Manages event-driven communication.
- **Command** (upcoming Lecture 12): Encapsulates actions as objects.

### 3. Use Cases
- Sorting products by different criteria (price, rating).
- Applying various discount strategies in a retail app.
- Processing payments with different algorithms (e.g., credit card, PayPal).

**Example**: A product catalog with interchangeable sorting strategies.

## Code Example: Sorting Strategy for Product Catalog
Let’s implement a sorting strategy system for an e-commerce product catalog, with a UML class diagram.

### UML Class Diagram
```
+---------------------+
|   ProductCatalog    |
+---------------------+
| -strategy: SortStrategy |
| -products: List<Product> |
+---------------------+
| +setStrategy(strategy: SortStrategy) |
| +sortProducts(): List<Product> |
+---------------------+
            |
            | uses
+---------------------+
|    SortStrategy     |
+---------------------+
| +sort(products: List<Product>): List<Product> |
+---------------------+
            |
            | implements
+---------------------+       +---------------------+
|   PriceSortStrategy |       | RatingSortStrategy  |
+---------------------+       +---------------------+
| +sort               |       | +sort               |
+---------------------+       +---------------------+
```

### Java Implementation
```java
import java.util.ArrayList;
import java.util.List;
import java.util.Comparator;

// Product class
public class Product {
    private String name;
    private double price;
    private double rating;
    
    public Product(String name, double price, double rating) {
        this.name = name;
        this.price = price;
        this.rating = rating;
    }
    
    public String getName() {
        return name;
    }
    
    public double getPrice() {
        return price;
    }
    
    public double getRating() {
        return rating;
    }
    
    @Override
    public String toString() {
        return "Product{name='" + name + "', price=" + price + ", rating=" + rating + "}";
    }
}

// Strategy interface
public interface SortStrategy {
    List<Product> sort(List<Product> products);
}

// Concrete strategy: PriceSort
public class PriceSortStrategy implements SortStrategy {
    @Override
    public List<Product> sort(List<Product> products) {
        List<Product> sorted = new ArrayList<>(products);
        sorted.sort(Comparator.comparingDouble(Product::getPrice));
        return sorted;
    }
}

// Concrete strategy: RatingSort
public class RatingSortStrategy implements SortStrategy {
    @Override
    public List<Product> sort(List<Product> products) {
        List<Product> sorted = new ArrayList<>(products);
        sorted.sort(Comparator.comparingDouble(Product::getRating).reversed());
        return sorted;
    }
}

// Context: ProductCatalog
public class ProductCatalog {
    private SortStrategy strategy;
    private List<Product> products;
    
    public ProductCatalog() {
        this.products = new ArrayList<>();
    }
    
    public void addProduct(Product product) {
        products.add(product);
    }
    
    public void setStrategy(SortStrategy strategy) {
        this.strategy = strategy;
    }
    
    public List<Product> sortProducts() {
        if (strategy == null) {
            throw new IllegalStateException("Sort strategy not set");
        }
        return strategy.sort(products);
    }
    
    // Example usage
    public static void main(String[] args) {
        ProductCatalog catalog = new ProductCatalog();
        catalog.addProduct(new Product("Laptop", 999.99, 4.5));
        catalog.addProduct(new Product("Phone", 499.99, 4.8));
        catalog.addProduct(new Product("Tablet", 299.99, 4.2));
        
        // Sort by price
        catalog.setStrategy(new PriceSortStrategy());
        System.out.println("Sorted by price: " + catalog.sortProducts());
        
        // Sort by rating
        catalog.setStrategy(new RatingSortStrategy());
        System.out.println("Sorted by rating: " + catalog.sortProducts());
        // Output:
        // Sorted by price: [Product{name='Tablet', price=299.99, rating=4.2}, Product{name='Phone', price=499.99, rating=4.8}, Product{name='Laptop', price=999.99, rating=4.5}]
        // Sorted by rating: [Product{name='Phone', price=499.99, rating=4.8}, Product{name='Laptop', price=999.99, rating=4.5}, Product{name='Tablet', price=299.99, rating=4.2}]
    }
}
```
- **Strategy and OOP Principles**:
  - **Encapsulation**: Private `strategy` and `products` fields in `ProductCatalog`.
  - **Polymorphism**: `SortStrategy` interface supports multiple algorithms.
  - **Abstraction**: `ProductCatalog` hides sorting logic.
  - **Clean Code**: Meaningful names, modularity (Section 9).
- **Big O**: O(n log n) for `sortProducts` (due to sorting), O(1) for `setStrategy`, `addProduct`.
- **Edge Cases**: Handles null strategy, empty product list.

**Systematic Approach**:
- Clarified requirements (sort products by different criteria, flexible algorithms).
- Designed UML diagram to model `ProductCatalog`, `SortStrategy`, and concrete strategies.
- Implemented Java classes with Strategy pattern.
- Tested with `main` method for different sorting strategies.

## Real-World Application
Imagine designing a product catalog for an e-commerce app, where the Strategy pattern allows users to sort products by price, rating, or other criteria dynamically. This ensures flexibility for adding new sorting algorithms (e.g., by popularity) without modifying core logic. The Strategy pattern—leveraging polymorphism and encapsulation—demonstrates your ability to mentor teams on adaptable design solutions.

## Practice Exercises
Apply the Strategy pattern with these exercises:
- **Easy**: Design a UML diagram and Java code for a `DiscountStrategy` with `PercentageDiscount` and `FixedDiscount` for a retail app.
- **Medium**: Implement a `PaymentStrategy` with `CreditCardPayment` and `PayPalPayment` for an e-commerce app.
- **Medium**: Create a `CompressionStrategy` with `ZipCompression` and `GzipCompression` for a file system.
- **Hard**: Design a `RecommendationStrategy` for a social app, supporting `PopularityBased` and `UserPreferenceBased` algorithms.

Try implementing one exercise in Java with a UML diagram, ensuring clean code principles.

## Conclusion
The Strategy pattern equips you to design flexible Java systems with interchangeable algorithms. By mastering this behavioral pattern, you’ll optimize software, ensure maintainability, and teach others effectively. This advances your progress in Section 3 of the *Official CTO* journey.

**Next Step**: Explore [Observer Pattern](/interview-section/design-patterns/observer-pattern) to manage event-driven systems, or check out [all sections](/interview-section/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>