---
title: Designing Modular Code
description: Learn to design modular code with small functions, cohesive classes, and low cyclomatic complexity, using a Java-based inventory system example, tailored for FAANG interviews.
---

# Designing Modular Code

## Overview
Welcome to the third lecture of **Section 9: Writing Clean Code** in the *Official CTO* journey! **Modular code** enhances maintainability and scalability by breaking systems into small, cohesive, and manageable components. In this 20-minute lesson, we explore techniques for designing modular code, focusing on **small functions** (<20 lines, *Code Complete 2* Ch. 5), **cohesive classes**, and **reducing cyclomatic complexity** (Ch. 19) to prevent Large Class and Long Method code smells. Using a Java-based example of an inventory system for a travel platform, we’ll prepare you for FAANG interviews and real-world projects. Drawing from my 8+ years of mentoring engineers, this lecture equips you to write modular, high-quality code. Let’s continue your *Official CTO* journey to become a well-rounded engineer!

Inspired by *Clean Code* by Robert C. Martin, *Code Complete 2*, and Google’s Java Style Guide, this lesson provides actionable insights and a practical example.

## Learning Objectives
- Master **modular code techniques**: small functions, cohesive classes, low cyclomatic complexity.
- Learn to **avoid Large Class and Long Method smells** in software design.
- Prepare for **FAANG interviews** with modularity-focused questions.
- Apply modular code in an **inventory system** example.

## Why Modular Code Matters
Modular code simplifies maintenance, enhances scalability, and improves collaboration, making it a critical skill for FAANG interviews. Drawing from my experience mentoring engineers, I’ve seen modular code distinguish candidates in code reviews and leadership roles. This lecture ensures you can design modular systems, articulate their benefits, and align with industry standards.

In software engineering, modular code helps you:
- **Ace Interviews**: Demonstrate clarity in coding exercises and system design.
- **Reduce Technical Debt**: Simplify refactoring and updates.
- **Enhance Scalability**: Build systems that are easy to extend.
- **Improve Collaboration**: Enable teams to work on independent components.

## Key Concepts
### 1. Small Functions
- **Definition**: Functions should be concise (<20 lines, *Code Complete 2* Ch. 5), with a single responsibility.
- **Guidelines**: Extract logic into smaller methods, avoid nested conditionals.
- **Example**: Split a monolithic inventory update into smaller functions.

### 2. Cohesive Classes
- **Definition**: Classes should have a single, well-defined purpose (Single Responsibility Principle, *Clean Code*).
- **Guidelines**: Group related functionality, avoid unrelated methods.
- **Example**: Separate inventory management from booking logic in a travel platform.

### 3. Cyclomatic Complexity
- **Definition**: Measures the number of independent paths through a function (*Code Complete 2* Ch. 19).
- **Guidelines**: Keep complexity low (<10) by simplifying conditionals and loops.
- **Example**: Reduce complexity in inventory availability checks.

### 4. Code Smells
- **Large Class**: Classes with too many responsibilities (e.g., handling bookings and inventory).
- **Long Method**: Functions exceeding 20 lines, hard to maintain.
- **Prevention**: Refactor into smaller functions and cohesive classes.

### 5. Role in FAANG Interviews
- Technical questions test modularity (e.g., “Refactor this code into smaller functions”).
- Behavioral questions assess experience (e.g., “Tell me about a time you modularized a system”).
- Align with company priorities (e.g., Google’s clarity, Amazon’s scalability).

### 6. Relation to Previous Sections
- **Algorithms** (Section 1): Modular code clarifies algorithmic logic.
- **OOD** (Section 2): Aligns with cohesive class design.
- **Design Patterns** (Section 3): Patterns support modular implementations.
- **Design Principles** (Section 4): SOLID drives modularity (e.g., SRP).
- **HLD/LLD** (Sections 5–6): Modular code supports system design (e.g., Mock LLD Interview, Lecture 31).
- **Behavioral Skills** (Section 7): Articulating modularity builds on communication (Lecture 2).
- **Domain-Specific Topics** (Section 8): Modular code ensures maintainable cloud systems (e.g., microservices, Lecture 7).
- **Clean Code Intro** (Section 9, Lecture 1): Builds on clean code principles.
- **Readable Code** (Section 9, Lecture 2): Complements meaningful names and formatting.

## Code Example: Modular Code in an Inventory System
Below is a Java example demonstrating modular code for an inventory system in a travel platform, avoiding Large Class and Long Method smells.

```java
public class InventoryManager {
    private final InventoryRepository inventoryRepository;
    private final AvailabilityChecker availabilityChecker;

    public InventoryManager(InventoryRepository inventoryRepository, AvailabilityChecker availabilityChecker) {
        this.inventoryRepository = inventoryRepository;
        this.availabilityChecker = availabilityChecker;
    }

    public ReservationResult reserveFlight(FlightRequest request) {
        if (!isValidRequest(request)) {
            return new ReservationResult(false, "Invalid flight request");
        }

        FlightAvailability availability = availabilityChecker.checkAvailability(request.getFlightId());
        if (!availability.isAvailable()) {
            return new ReservationResult(false, "Flight not available");
        }

        boolean isReserved = inventoryRepository.reserveFlight(request.getFlightId(), request.getSeats());
        return new ReservationResult(isReserved, isReserved ? "Reservation successful" : "Reservation failed");
    }

    private boolean isValidRequest(FlightRequest request) {
        return request != null && request.getSeats() > 0 && request.getFlightId() > 0;
    }
}

public class FlightRequest {
    private final long flightId;
    private final int seats;

    public FlightRequest(long flightId, int seats) {
        this.flightId = flightId;
        this.seats = seats;
    }

    public long getFlightId() {
        return flightId;
    }

    public int getSeats() {
        return seats;
    }
}

public class FlightAvailability {
    private final boolean isAvailable;
    private final int availableSeats;

    public FlightAvailability(boolean isAvailable, int availableSeats) {
        this.isAvailable = isAvailable;
        this.availableSeats = availableSeats;
    }

    public boolean isAvailable() {
        return isAvailable;
    }
}

public class ReservationResult {
    private final boolean isSuccessful;
    private final String message;

    public ReservationResult(boolean isSuccessful, String message) {
        this.isSuccessful = isSuccessful;
        this.message = message;
    }

    public boolean isSuccessful() {
        return isSuccessful;
    }

    public String getMessage() {
        return message;
    }
}

interface InventoryRepository {
    boolean reserveFlight(long flightId, int seats);
}

interface AvailabilityChecker {
    FlightAvailability checkAvailability(long flightId);
}
```

- **Explanation**:
  - **Small Functions**: `reserveFlight` and `isValidRequest` are concise (<20 lines), each with a single responsibility (*Code Complete 2* Ch. 5).
  - **Cohesive Classes**: `InventoryManager` focuses solely on reservation logic, avoiding Large Class smell.
  - **Low Cyclomatic Complexity**: Simple conditionals keep complexity low (<10, *Code Complete 2* Ch. 19).
  - **Testability**: Dependency injection (`InventoryRepository`, `AvailabilityChecker`) enables mocking.
- **Setup**:
  - Run with Java 17+ (no external dependencies).
  - In production, implement `InventoryRepository` with a database and `AvailabilityChecker` with a cache.
- **Big O**: O(1) for reservation logic (excluding external calls).
- **Edge Cases**: Handles null requests, invalid seat counts, and unavailable flights.
- **Trade-Offs**: Modular design for maintainability vs. simpler monolithic logic; dependency injection for testability vs. in-memory storage.

## FAANG-Specific Tips
- **Amazon (Ownership)**:
  - Highlight ownership in modular design (e.g., “I refactored for modularity”).
  - Emphasize scalability (e.g., “Ensured scalable inventory management”).
  - STAR Response:
    - **Situation**: “Our inventory system was hard to maintain.”
    - **Task**: “I was responsible for improving modularity.”
    - **Action**: “I refactored into small functions and cohesive classes, taking ownership.”
    - **Result**: “Reduced maintenance time by 30%, improving scalability.”
- **Google (Clarity)**:
  - Focus on Google’s Java Style Guide (e.g., “I designed cohesive classes”).
  - Emphasize collaboration (e.g., “Aligned with team on modular design”).
  - STAR Response:
    - **Situation**: “Our system had complex, monolithic code.”
    - **Task**: “I was tasked with refactoring.”
    - **Action**: “I applied Google’s style guide, creating small functions and collaborating.”
    - **Result**: “Improved code clarity, praised by team.”
- **Meta (Execution Speed)**:
  - Highlight rapid refactoring (e.g., “I modularized code in a sprint”).
  - Focus on maintainability (e.g., “Enabled faster feature updates”).
  - STAR Response:
    - **Situation**: “Our inventory system slowed development.”
    - **Task**: “I was responsible for refactoring.”
    - **Action**: “I quickly refactored into modular components for faster updates.”
    - **Result**: “Reduced feature delivery time by 25%.”
- **Netflix (Freedom & Responsibility)**:
  - Emphasize autonomous refactoring (e.g., “I independently modularized code”).
  - Focus on high-impact outcomes (e.g., “Enhanced system maintainability”).
  - STAR Response:
    - **Situation**: “Our system had unmaintainable code.”
    - **Task**: “I was responsible for improvements.”
    - **Action**: “I independently refactored into small, cohesive components.”
    - **Result**: “Reduced bugs by 30%, boosting maintainability.”

## Practice Exercise
**Problem**: Refactor a monolithic inventory function into modular code.
1. **Define Requirements**:
   - Break a large function into small functions (<20 lines).
   - Create cohesive classes with single responsibilities.
   - Reduce cyclomatic complexity (<10).
2. **Craft a STAR Response**:
   - **Situation**: Describe a project with monolithic code (e.g., inventory system).
   - **Task**: Clarify your role (e.g., code refactorer).
   - **Action**: List 2–3 actions (e.g., split functions, created classes).
   - **Result**: Quantify outcomes (e.g., reduced bugs, faster maintenance).
3. **Write Modular Code**:
   - Refactor a sample Java function into small methods and cohesive classes.
   - Test locally to ensure functionality.
4. **Tailor to a FAANG Company**:
   - Align with Amazon (Ownership), Google (Clarity), Meta (speed), or Netflix (autonomy).
5. **Write and Review**:
   - Write a 100–150 word STAR response.
   - Ensure clarity, specificity, and alignment with modular code principles.

**Sample Response (Amazon - Ownership)**:
- **Situation**: “Our inventory system had a monolithic function, causing delays.”
- **Task**: “As lead, I was responsible for improving modularity.”
- **Action**: “I refactored into small functions and cohesive classes, ensuring single responsibilities.”
- **Result**: “Reduced maintenance time by 30%, improving system scalability.”

## Conclusion
Mastering modular code equips you to excel in FAANG interviews and build maintainable systems. This lecture builds on clean code principles and readability from Lectures 1–2, advancing your *Official CTO* journey.

**Next Step**: Explore [Robust Error Handling](/sections/clean-code/error-handling) or revisit [all sections](/sections/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>