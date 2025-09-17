---
title: Simplifying Code through Refactoring
description: Learn refactoring techniques like Extract Method and Decompose Conditional to simplify code, using a Java-based notification dispatcher example, tailored for FAANG interviews.
---

# Simplifying Code through Refactoring

## Overview
Welcome to the third lecture of **Section 10: Mastering Refactoring** in the *Official CTO* journey! Simplifying code through **refactoring** enhances maintainability and readability, critical for FAANG-quality codebases. In this 20-minute lesson, we explore techniques like **Extract Method**, **Introduce Explaining Variable**, **Decompose Conditional**, and **Replace Magic Number with Named Constant** (*Refactoring* by Fowler, *Code Complete 2* Ch. 24) to simplify complex logic. Using a Java-based example of a notification dispatcher for a social app, we’ll prepare you for FAANG interviews and real-world projects. Drawing from my 8+ years of mentoring engineers, this lecture equips you to streamline code effectively. Let’s continue your *Official CTO* journey!

Inspired by *Refactoring*, *Code Complete 2*, and Refactoring.Guru, this lesson provides actionable insights and a practical example.

## Learning Objectives
- Master **refactoring techniques** to simplify code: Extract Method, Introduce Explaining Variable, Decompose Conditional, Replace Magic Number.
- Learn to **improve code maintainability** and readability.
- Prepare for **FAANG interviews** with simplification-focused questions.
- Apply refactoring in a **notification dispatcher** example.

## Why Simplifying Code Matters
Simplifying code reduces technical debt, improves collaboration, and enhances maintainability, making it a key skill for FAANG interviews. Drawing from my experience mentoring engineers, I’ve seen simplified code distinguish candidates in code reviews and leadership roles. This lecture ensures you can apply refactoring techniques, articulate their benefits, and align with industry standards.

In software engineering, simplifying code helps you:
- **Ace Interviews**: Demonstrate clarity in refactoring tasks.
- **Reduce Technical Debt**: Simplify maintenance and prevent rewrites.
- **Enhance Collaboration**: Improve code readability for teams.
- **Improve Scalability**: Build maintainable, extensible systems.

## Key Concepts
### 1. Extract Method
- **Definition**: Break large methods into smaller, reusable ones (*Refactoring* by Fowler).
- **Benefits**: Improves readability, reduces complexity.
- **Example**: Extract notification sending logic into a separate method.

### 2. Introduce Explaining Variable
- **Definition**: Use variables to clarify complex expressions (*Refactoring*).
- **Benefits**: Enhances code intent, reduces cognitive load.
- **Example**: Name a variable to explain notification eligibility.

### 3. Decompose Conditional
- **Definition**: Split complex conditionals into smaller, named methods (*Refactoring*).
- **Benefits**: Clarifies logic, improves testability.
- **Example**: Decompose notification validation logic.

### 4. Replace Magic Number with Named Constant
- **Definition**: Replace hardcoded numbers with named constants (*Code Complete 2* Ch. 24).
- **Benefits**: Improves readability, reduces errors.
- **Example**: Use a constant for notification retry limits.

### 5. Role in FAANG Interviews
- Technical questions test simplification (e.g., “Simplify this complex function”).
- Behavioral questions assess experience (e.g., “Tell me about a time you simplified code”).
- Align with company priorities (e.g., Google’s clarity, Amazon’s ownership).

### 6. Relation to Previous Sections
- **Algorithms** (Section 1): Simplification clarifies algorithmic logic.
- **OOD** (Section 2): Aligns with cohesive class design.
- **Design Patterns** (Section 3): Patterns support simplified implementations.
- **Design Principles** (Section 4): SOLID drives simplification.
- **HLD/LLD** (Sections 5–6): Simplification supports system design (e.g., Mock LLD Interview, Lecture 31).
- **Behavioral Skills** (Section 7): Articulating simplification builds on communication (Lecture 2).
- **Domain-Specific Topics** (Section 8): Simplification ensures maintainable cloud systems (e.g., microservices, Lecture 7).
- **Clean Code** (Section 9): Builds on readability, modularity, error handling, testability, documentation.
- **Refactoring Intro** (Section 10, Lecture 1): Builds on refactoring goals.
- **Code Smells** (Section 10, Lecture 2): Addresses smells like Long Method.

## Code Example: Refactoring a Notification Dispatcher
Below is a Java example showing a poorly written notification dispatcher with code smells, followed by its refactored version using simplification techniques.

### Before Refactoring
```java
public class NotificationDispatcher {
    public boolean send(String user, String msg, int type, int priority) {
        if (user != null && msg != null && !msg.isEmpty() && type >= 0 && type <= 2 && priority > 0 && priority <= 10) {
            // Send notification if user is active and priority is high
            if (type == 1 && priority > 5) {
                System.out.println("Sending email to " + user + ": " + msg);
                return true;
            } else if (type == 2 && priority > 3) {
                System.out.println("Sending SMS to " + user + ": " + msg);
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
}
```

### After Refactoring
```java
public class NotificationDispatcher {
    private static final int MAX_PRIORITY = 10;
    private static final int HIGH_PRIORITY_THRESHOLD = 5;
    private static final int SMS_PRIORITY_THRESHOLD = 3;

    private final NotificationSender notificationSender;

    public NotificationDispatcher(NotificationSender notificationSender) {
        this.notificationSender = notificationSender;
    }

    /**
     * Sends a notification to a user based on type and priority.
     *
     * @param userId User identifier
     * @param message Notification message
     * @param type Notification type (1=email, 2=SMS)
     * @param priority Notification priority (1 to 10)
     * @return true if sent successfully, false otherwise
     */
    public boolean sendNotification(String userId, String message, int type, int priority) {
        if (!isValidInput(userId, message, type, priority)) {
            return false;
        }

        boolean isHighPriority = priority > HIGH_PRIORITY_THRESHOLD;
        boolean isSmsPriority = priority > SMS_PRIORITY_THRESHOLD;

        if (type == 1 && isHighPriority) {
            return notificationSender.sendEmail(userId, message);
        } else if (type == 2 && isSmsPriority) {
            return notificationSender.sendSms(userId, message);
        }
        return false;
    }

    private boolean isValidInput(String userId, String message, int type, int priority) {
        return userId != null && message != null && !message.isEmpty() &&
               type >= 1 && type <= 2 && priority > 0 && priority <= MAX_PRIORITY;
    }
}

interface NotificationSender {
    boolean sendEmail(String userId, String message);
    boolean sendSms(String userId, String message);
}
```

### Unit Tests
```java
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class NotificationDispatcherTest {
    private NotificationSender notificationSender;
    private NotificationDispatcher dispatcher;

    @BeforeEach
    void setUp() {
        notificationSender = mock(NotificationSender.class);
        dispatcher = new NotificationDispatcher(notificationSender);
    }

    @Test
    void testSendNotification_EmailHighPriority() {
        when(notificationSender.sendEmail("user123", "Hello")).thenReturn(true);

        boolean result = dispatcher.sendNotification("user123", "Hello", 1, 6);

        assertTrue(result);
        verify(notificationSender).sendEmail("user123", "Hello");
    }

    @Test
    void testSendNotification_InvalidInput() {
        boolean result = dispatcher.sendNotification(null, "Hello", 1, 6);

        assertFalse(result);
        verifyNoInteractions(notificationSender);
    }
}
```

- **Explanation**:
  - **Before Refactoring**: The original code has a Long Method smell, complex conditionals, and magic numbers (e.g., 5, 3).
  - **After Refactoring**:
    - **Extract Method**: Moves validation logic to `isValidInput`.
    - **Introduce Explaining Variable**: Uses `isHighPriority` and `isSmsPriority` to clarify conditions.
    - **Decompose Conditional**: Simplifies nested conditionals for readability.
    - **Replace Magic Number**: Uses `MAX_PRIORITY`, `HIGH_PRIORITY_THRESHOLD`, `SMS_PRIORITY_THRESHOLD`.
  - **Test-Driven**: Unit tests ensure behavior preservation (*Refactoring* by Fowler).
  - **Improvements**: Enhances readability, reduces complexity, improves testability.
- **Setup**:
  - Add dependencies: `org.junit.jupiter:junit-jupiter`, `org.mockito:mockito-core`.
  - Run tests with `mvn test` or an IDE.
- **Big O**: O(1) for notification logic (excluding external calls).
- **Edge Cases**: Handles null inputs, invalid types, and priorities.
- **Trade-Offs**: Modular code for maintainability vs. monolithic for simplicity; constants for clarity vs. hardcoded values.

## FAANG-Specific Tips
- **Amazon (Ownership)**:
  - Highlight ownership in simplification (e.g., “I simplified complex logic”).
  - Emphasize reliability (e.g., “Improved notification reliability”).
  - STAR Response:
    - **Situation**: “Our notification system had complex logic.”
    - **Task**: “I was responsible for simplifying it.”
    - **Action**: “I applied Extract Method and Decompose Conditional, ensuring tests passed.”
    - **Result**: “Reduced complexity by 30%, improving reliability.”
- **Google (Clarity)**:
  - Focus on Google’s Java Style Guide (e.g., “I simplified with clear naming”).
  - Emphasize collaboration (e.g., “Aligned with team on refactoring”).
  - STAR Response:
    - **Situation**: “Our notification code was hard to read.”
    - **Task**: “I was tasked with simplifying.”
    - **Action**: “I used Extract Method per Google’s style guide, collaborating on reviews.”
    - **Result**: “Improved clarity, praised by team.”
- **Meta (Execution Speed)**:
  - Highlight rapid simplification (e.g., “I simplified code in a sprint”).
  - Focus on maintainability (e.g., “Enabled faster updates”).
  - STAR Response:
    - **Situation**: “Our notification system slowed development.”
    - **Task**: “I was responsible for refactoring.”
    - **Action**: “I quickly applied Decompose Conditional and wrote tests.”
    - **Result**: “Reduced maintenance time by 25%.”
- **Netflix (Freedom & Responsibility)**:
  - Emphasize autonomous simplification (e.g., “I independently simplified code”).
  - Focus on high-impact outcomes (e.g., “Improved maintainability”).
  - STAR Response:
    - **Situation**: “Our notification logic was complex.”
    - **Task**: “I was responsible for improvements.”
    - **Action**: “I independently applied Extract Method and named constants.”
    - **Result**: “Reduced bugs by 30%, boosting maintainability.”

## Practice Exercise
**Problem**: Simplify a complex notification function using refactoring techniques.
1. **Define Requirements**:
   - Apply Extract Method, Decompose Conditional, and Replace Magic Number.
   - Ensure behavior preservation with unit tests.
2. **Craft a STAR Response**:
   - **Situation**: Describe a project with complex code (e.g., notification system).
   - **Task**: Clarify your role (e.g., code refactorer).
   - **Action**: List 2–3 actions (e.g., extracted methods, decomposed conditionals).
   - **Result**: Quantify outcomes (e.g., reduced complexity, improved maintainability).
3. **Write Refactored Code**:
   - Refactor a Java function using specified techniques.
   - Write unit tests to verify behavior.
   - Test with `mvn test`.
4. **Tailor to a FAANG Company**:
   - Align with Amazon (Ownership), Google (Clarity), Meta (speed), or Netflix (autonomy).
5. **Write and Review**:
   - Write a 100–150 word STAR response.
   - Ensure clarity, specificity, and alignment with refactoring principles.

**Sample Response (Google - Clarity)**:
- **Situation**: “Our notification system had complex, unreadable logic.”
- **Task**: “As lead, I was responsible for simplifying.”
- **Action**: “I applied Extract Method and Decompose Conditional per Google’s style guide, collaborating on reviews.”
- **Result**: “Reduced complexity by 25%, praised for clarity.”

## Conclusion
Mastering code simplification through refactoring equips you to excel in FAANG interviews and build maintainable systems. This lecture builds on refactoring goals and code smells from Lectures 1–2, advancing your *Official CTO* journey.

**Next Step**: Explore [Refactoring with Patterns and Principles](/interview-section/refactoring/patterns-principles) or revisit [all sections](/interview-section/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>