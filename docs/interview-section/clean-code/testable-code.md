---
title: Writing Testable Code
description: Learn to write testable code with dependency injection, mocks/stubs, and 80%+ test coverage, using a Java-based decommissioning tool example, tailored for FAANG interviews.
---

# Writing Testable Code

## Overview
Welcome to the fifth lecture of **Section 9: Writing Clean Code** in the *Official CTO* journey! **Testable code** is essential for ensuring software reliability and maintainability, enabling robust unit testing. In this 20-minute lesson, we explore techniques for writing testable code, focusing on **dependency injection**, **mocks/stubs**, and achieving **80%+ test coverage** (*Code Complete 2* Ch. 22). Using a Java-based example of a decommissioning tool for a distributed system, we’ll prepare you for FAANG interviews and real-world projects. Drawing from my 8+ years of mentoring engineers, this lecture equips you to write testable, high-quality code. Let’s continue your *Official CTO* journey to become a well-rounded engineer!

Inspired by *Clean Code* by Robert C. Martin, *Code Complete 2*, and Google’s Java Style Guide, this lesson provides actionable insights and a practical example with unit tests.

## Learning Objectives
- Master **testable code techniques**: dependency injection, mocks/stubs, high test coverage.
- Learn to **write robust unit tests** for maintainable software.
- Prepare for **FAANG interviews** with testing-focused questions.
- Apply testable code in a **decommissioning tool** example.

## Why Testable Code Matters
Testable code ensures reliability, simplifies debugging, and supports rapid iteration, making it a critical skill for FAANG interviews. Drawing from my experience mentoring engineers, I’ve seen testable code distinguish candidates in code reviews and leadership roles. This lecture ensures you can design testable systems, write effective unit tests, and align with industry standards.

In software engineering, testable code helps you:
- **Ace Interviews**: Demonstrate robust testing in coding exercises and reviews.
- **Reduce Bugs**: Catch issues early through unit tests.
- **Enhance Maintainability**: Simplify code updates and refactoring.
- **Improve Collaboration**: Enable teams to verify functionality.

## Key Concepts
### 1. Dependency Injection
- **Definition**: Inject dependencies (e.g., via constructors) to isolate components for testing (*Clean Code*).
- **Guidelines**: Use interfaces to decouple implementations, enable mocking.
- **Example**: Inject a repository into a decommissioning tool for testability.

### 2. Mocks and Stubs
- **Definition**: Mocks simulate behavior, stubs provide predefined responses (*Code Complete 2* Ch. 22).
- **Guidelines**: Use frameworks like Mockito to mock dependencies.
- **Example**: Mock a database in a decommissioning tool’s unit tests.

### 3. Test Coverage
- **Definition**: Percentage of code executed by tests, aiming for 80%+ (*Code Complete 2* Ch. 22).
- **Guidelines**: Cover main paths, edge cases, and error conditions.
- **Example**: Test all scenarios in a decommissioning tool (success, failure).

### 4. Role in FAANG Interviews
- Technical questions test testing skills (e.g., “Write unit tests for this function”).
- Behavioral questions assess experience (e.g., “Tell me about a time you improved test coverage”).
- Align with company priorities (e.g., Google’s testing rigor, Amazon’s reliability).

### 5. Relation to Previous Sections
- **Algorithms** (Section 1): Testable code clarifies algorithmic logic.
- **OOD** (Section 2): Aligns with dependency injection and interfaces.
- **Design Patterns** (Section 3): Patterns like Facade support testing.
- **Design Principles** (Section 4): SOLID drives testable design (e.g., Dependency Inversion).
- **HLD/LLD** (Sections 5–6): Testable code supports system design (e.g., Mock LLD Interview, Lecture 31).
- **Behavioral Skills** (Section 7): Articulating testing builds on communication (Lecture 2).
- **Domain-Specific Topics** (Section 8): Testable code ensures reliable cloud systems (e.g., microservices, Lecture 7).
- **Clean Code Intro** (Section 9, Lecture 1): Builds on clean code principles.
- **Readable Code** (Section 9, Lecture 2): Complements clear naming.
- **Modular Code** (Section 9, Lecture 3): Supports cohesive, testable components.
- **Error Handling** (Section 9, Lecture 4): Complements robust exception handling.

## Code Example: Testable Code in a Decommissioning Tool
Below is a Java example of testable code for a decommissioning tool in a distributed system, with unit tests using Mockito.

```java
public class DecommissioningService {
    private final NodeRepository nodeRepository;
    private final HealthChecker healthChecker;

    public DecommissioningService(NodeRepository nodeRepository, HealthChecker healthChecker) {
        this.nodeRepository = nodeRepository;
        this.healthChecker = healthChecker;
    }

    public DecommissionResult decommissionNode(String nodeId) {
        if (nodeId == null || nodeId.isEmpty()) {
            return new DecommissionResult(false, "Invalid node ID");
        }

        if (!healthChecker.isNodeHealthy(nodeId)) {
            return new DecommissionResult(false, "Node is unhealthy");
        }

        try {
            nodeRepository.removeNode(nodeId);
            return new DecommissionResult(true, "Node decommissioned successfully");
        } catch (RepositoryException e) {
            return new DecommissionResult(false, "Failed to decommission node: " + e.getMessage());
        }
    }
}

public class DecommissionResult {
    private final boolean isSuccessful;
    private final String message;

    public DecommissionResult(boolean isSuccessful, String message) {
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

interface NodeRepository {
    void removeNode(String nodeId) throws RepositoryException;
}

interface HealthChecker {
    boolean isNodeHealthy(String nodeId);
}

class RepositoryException extends Exception {
    public RepositoryException(String message) {
        super(message);
    }
}
```

### Unit Tests
```java
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class DecommissioningServiceTest {
    private NodeRepository nodeRepository;
    private HealthChecker healthChecker;
    private DecommissioningService service;

    @BeforeEach
    void setUp() {
        nodeRepository = mock(NodeRepository.class);
        healthChecker = mock(HealthChecker.class);
        service = new DecommissioningService(nodeRepository, healthChecker);
    }

    @Test
    void testDecommissionNode_Success() {
        String nodeId = "node123";
        when(healthChecker.isNodeHealthy(nodeId)).thenReturn(true);

        DecommissionResult result = service.decommissionNode(nodeId);

        assertTrue(result.isSuccessful());
        assertEquals("Node decommissioned successfully", result.getMessage());
        verify(nodeRepository).removeNode(nodeId);
    }

    @Test
    void testDecommissionNode_InvalidNodeId() {
        DecommissionResult result = service.decommissionNode("");

        assertFalse(result.isSuccessful());
        assertEquals("Invalid node ID", result.getMessage());
        verifyNoInteractions(nodeRepository);
    }

    @Test
    void testDecommissionNode_UnhealthyNode() {
        String nodeId = "node123";
        when(healthChecker.isNodeHealthy(nodeId)).thenReturn(false);

        DecommissionResult result = service.decommissionNode(nodeId);

        assertFalse(result.isSuccessful());
        assertEquals("Node is unhealthy", result.getMessage());
        verifyNoInteractions(nodeRepository);
    }

    @Test
    void testDecommissionNode_RepositoryException() throws RepositoryException {
        String nodeId = "node123";
        when(healthChecker.isNodeHealthy(nodeId)).thenReturn(true);
        doThrow(new RepositoryException("Database error")).when(nodeRepository).removeNode(nodeId);

        DecommissionResult result = service.decommissionNode(nodeId);

        assertFalse(result.isSuccessful());
        assertEquals("Failed to decommission node: Database error", result.getMessage());
    }
}
```

- **Explanation**:
  - **Dependency Injection**: Uses constructor injection (`NodeRepository`, `HealthChecker`) for testability (*Clean Code*).
  - **Mocks/Stubs**: Mockito mocks dependencies to isolate `DecommissioningService`.
  - **Test Coverage**: Tests cover success, invalid input, unhealthy node, and exception cases, aiming for 80%+ coverage (*Code Complete 2* Ch. 22).
  - **Clear Design**: Small methods, clear interfaces, robust error handling.
- **Setup**:
  - Add dependencies: `org.junit.jupiter:junit-jupiter`, `org.mockito:mockito-core`.
  - Run tests with `mvn test` or an IDE.
- **Big O**: O(1) for decommissioning logic (excluding external calls).
- **Edge Cases**: Handles null/empty node IDs, unhealthy nodes, and repository failures.
- **Trade-Offs**: Dependency injection for testability vs. simpler in-memory logic; comprehensive tests vs. minimal testing for speed.

## FAANG-Specific Tips
- **Amazon (Ownership)**:
  - Highlight ownership in testing (e.g., “I ensured high test coverage”).
  - Emphasize reliability (e.g., “Prevented system failures”).
  - STAR Response:
    - **Situation**: “Our system lacked unit tests, causing bugs.”
    - **Task**: “I was responsible for improving testability.”
    - **Action**: “I used dependency injection and wrote Mockito tests, ensuring 80% coverage.”
    - **Result**: “Reduced bugs by 30%, improving reliability.”
- **Google (Clarity)**:
  - Focus on Google’s Java Style Guide (e.g., “I wrote clear, testable code”).
  - Emphasize collaboration (e.g., “Aligned with team on testing”).
  - STAR Response:
    - **Situation**: “Our system had untestable code.”
    - **Task**: “I was tasked with refactoring.”
    - **Action**: “I applied dependency injection and wrote clear tests, collaborating with the team.”
    - **Result**: “Achieved 85% coverage, praised for clarity.”
- **Meta (Execution Speed)**:
  - Highlight rapid testing (e.g., “I implemented tests in a sprint”).
  - Focus on maintainability (e.g., “Enabled faster iterations”).
  - STAR Response:
    - **Situation**: “Our system slowed development due to poor tests.”
    - **Task**: “I was responsible for improving testability.”
    - **Action**: “I quickly refactored with mocks and wrote tests for fast iteration.”
    - **Result**: “Reduced testing time by 25%.”
- **Netflix (Freedom & Responsibility)**:
  - Emphasize autonomous testing (e.g., “I independently wrote tests”).
  - Focus on high-impact outcomes (e.g., “Enhanced system reliability”).
  - STAR Response:
    - **Situation**: “Our system lacked reliable tests.”
    - **Task**: “I was responsible for improvements.”
    - **Action**: “I independently refactored for testability and wrote Mockito tests.”
    - **Result**: “Achieved 80% coverage, reducing bugs by 30%.”

## Practice Exercise
**Problem**: Refactor a decommissioning function to be testable and write unit tests.
1. **Define Requirements**:
   - Use dependency injection for testability.
   - Write unit tests with mocks/stubs for 80%+ coverage.
2. **Craft a STAR Response**:
   - **Situation**: Describe a project with untestable code (e.g., decommissioning tool).
   - **Task**: Clarify your role (e.g., code refactorer).
   - **Action**: List 2–3 actions (e.g., added dependency injection, wrote tests).
   - **Result**: Quantify outcomes (e.g., reduced bugs, improved coverage).
3. **Write Testable Code and Tests**:
   - Refactor a Java function to use interfaces and dependency injection.
   - Write Mockito-based unit tests covering main paths and edge cases.
   - Test with `mvn test`.
4. **Tailor to a FAANG Company**:
   - Align with Amazon (Ownership), Google (Clarity), Meta (speed), or Netflix (autonomy).
5. **Write and Review**:
   - Write a 100–150 word STAR response.
   - Ensure clarity, specificity, and alignment with testable code principles.

**Sample Response (Google - Clarity)**:
- **Situation**: “Our decommissioning tool was hard to test, causing delays.”
- **Task**: “As lead, I was responsible for improving testability.”
- **Action**: “I refactored with dependency injection, wrote Mockito tests per Google’s style guide, and collaborated on reviews.”
- **Result**: “Achieved 85% test coverage, reducing bugs by 30%.”

## Conclusion
Mastering testable code equips you to excel in FAANG interviews and build reliable systems. This lecture builds on clean code principles, readability, modularity, and error handling from Lectures 1–4, advancing your *Official CTO* journey.

**Next Step**: Explore [Balancing Performance and Clarity](/interview-section/clean-code/performance-clarity) or revisit [all sections](/interview-section/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>