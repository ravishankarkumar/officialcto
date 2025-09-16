---
title: Identifying Code Smells
description: Learn to identify code smells like Long Method, Large Class, and Duplicated Code, using a Java-based e-commerce API integration example, tailored for FAANG interviews.
---

# Identifying Code Smells

## Overview
Welcome to the second lecture of **Section 10: Mastering Refactoring** in the *Official CTO* journey! **Code smells** are indicators of poor code design that signal the need for refactoring to improve maintainability and quality. In this 20-minute lesson, we explore common code smells—**Long Method**, **Large Class**, **Duplicated Code**, **Data Clumps**, **Feature Envy**, **Primitive Obsession**, and **Shotgun Surgery**—as outlined in *Refactoring* by Martin Fowler and *Code Complete 2* (Chapter 24). Using a Java-based example of a third-party API integration for an e-commerce platform, we’ll prepare you for FAANG interviews and real-world projects. Drawing from my 8+ years of mentoring engineers, this lecture equips you to detect and address code smells effectively. Let’s continue your *Official CTO* journey!

Inspired by *Refactoring*, *Code Complete 2*, and Refactoring.Guru, this lesson provides actionable insights and a practical example.

## Learning Objectives
- Understand **code smells** and their impact on code quality.
- Learn to **identify common smells** like Long Method and Large Class.
- Prepare for **FAANG interviews** with code smell detection questions.
- Apply smell identification in a **third-party API integration** example.

## Why Identifying Code Smells Matters
Code smells signal potential issues that increase technical debt and hinder collaboration, making their identification a critical skill for FAANG interviews. Drawing from my experience mentoring engineers, I’ve seen the ability to detect smells distinguish candidates in code reviews and leadership roles. This lecture ensures you can identify smells, articulate their impact, and align with industry standards.

In software engineering, identifying code smells helps you:
- **Ace Interviews**: Demonstrate refactoring skills in coding exercises.
- **Reduce Technical Debt**: Address issues before they escalate.
- **Enhance Collaboration**: Improve code clarity for teams.
- **Improve Maintainability**: Simplify future updates and scaling.

## Key Concepts
### 1. Code Smells
- **Definition**: Indicators of poor code design that suggest refactoring (*Refactoring* by Fowler).
- **Key Smells** (*Refactoring* catalog, *Code Complete 2* Ch. 24):
  - **Long Method**: Functions with excessive lines or complexity.
  - **Large Class**: Classes with too many responsibilities.
  - **Duplicated Code**: Repeated logic across methods or classes.
  - **Data Clumps**: Groups of variables passed together, indicating a missing class.
  - **Feature Envy**: Methods overly dependent on another class’s data.
  - **Primitive Obsession**: Overuse of primitive types instead of objects.
  - **Shotgun Surgery**: Single change requiring updates in multiple places.

### 2. Detection Techniques
- **Manual Review**: Inspect code for length, repetition, or complexity.
- **Tools**: Use IntelliJ, SonarQube to detect smells automatically.
- **Example**: Spot Duplicated Code in an API integration’s parsing logic.

### 3. Role in FAANG Interviews
- Technical questions test smell detection (e.g., “Identify smells in this code”).
- Behavioral questions assess experience (e.g., “Tell me about a time you refactored a smelly codebase”).
- Align with company priorities (e.g., Google’s clarity, Amazon’s ownership).

### 4. Relation to Previous Sections
- **Algorithms** (Section 1): Smells obscure algorithmic clarity.
- **OOD** (Section 2): Aligns with cohesive class design.
- **Design Patterns** (Section 3): Patterns prevent smells like Feature Envy.
- **Design Principles** (Section 4): SOLID avoids Large Class, Data Clumps.
- **HLD/LLD** (Sections 5–6): Smell detection supports system design (e.g., Mock LLD Interview, Lecture 31).
- **Behavioral Skills** (Section 7): Articulating smells builds on communication (Lecture 2).
- **Domain-Specific Topics** (Section 8): Smells impact cloud systems (e.g., microservices, Lecture 7).
- **Clean Code** (Section 9): Builds on readability, modularity, error handling, testability, documentation.
- **Refactoring Intro** (Section 10, Lecture 1): Builds on refactoring goals and process.

## Code Example: Code Smells in an E-commerce API Integration
Below is a Java example showing a poorly written third-party API integration with code smells, followed by a discussion of identified issues.

```java
public class OrderProcessor {
    // Processes order and fetches payment status from API
    public String process(long id, String user, String addr, String city, String state, int zip, double amt, String apiKey) {
        String result = "";
        if (id > 0 && user != null && addr != null && city != null && state != null && zip > 0 && amt > 0) {
            try {
                URL url = new URL("https://api.payment.com/charge?key=" + apiKey + "&amount=" + amt + "&user=" + user);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("POST");
                int responseCode = conn.getResponseCode();
                if (responseCode == 200) {
                    BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                    String inputLine;
                    StringBuilder response = new StringBuilder();
                    while ((inputLine = in.readLine()) != null) {
                        response.append(inputLine);
                    }
                    in.close();
                    if (response.toString().contains("success")) {
                        // Log order details
                        System.out.println("Order: " + id + ", User: " + user + ", Address: " + addr + ", " + city + ", " + state + ", " + zip + ", Amount: " + amt);
                        result = "Success";
                    } else {
                        result = "Failed";
                    }
                } else {
                    result = "API error: " + responseCode;
                }
                // Duplicate logging logic
                System.out.println("Order: " + id + ", User: " + user + ", Address: " + addr + ", " + city + ", " + state + ", " + zip + ", Amount: " + amt);
            } catch (Exception e) {
                result = "Error: " + e.getMessage();
            }
        }
        return result;
    }
}
```

### Identified Code Smells
- **Long Method**: `process` is too long (>20 lines), mixing API calls, parsing, and logging.
- **Data Clumps**: `user`, `addr`, `city`, `state`, `zip` are passed together, indicating a missing `Address` class.
- **Duplicated Code**: Logging logic is repeated in success and failure cases.
- **Primitive Obsession**: Uses `String` and `int` for address data instead of an object.
- **Feature Envy**: `process` directly manipulates API response data, which could belong to a separate `ApiClient` class.
- **Shotgun Surgery**: Changing logging format requires updates in multiple places.

### Suggested Refactorings
- **Extract Method**: Split API call, parsing, and logging into separate methods.
- **Introduce Parameter Object**: Create an `Address` class for `user`, `addr`, `city`, `state`, `zip`.
- **Remove Duplicated Code**: Consolidate logging logic.
- **Replace Primitive with Object**: Use an `Address` class for structured data.
- **Move Method**: Move API logic to an `ApiClient` class.

- **Setup**: Run with Java 17+ (requires `java.net.http` for API calls in production).
- **Big O**: O(1) for API call initiation; runtime depends on network latency.
- **Edge Cases**: Handles invalid inputs, API failures, and exceptions.
- **Trade-Offs**: Complex method for simplicity vs. modular code for maintainability; primitive types for brevity vs. objects for structure.

## FAANG-Specific Tips
- **Amazon (Ownership)**:
  - Highlight ownership in smell detection (e.g., “I identified and fixed smells”).
  - Emphasize reliability (e.g., “Improved API integration reliability”).
  - STAR Response:
    - **Situation**: “Our e-commerce API integration was hard to maintain.”
    - **Task**: “I was responsible for improving it.”
    - **Action**: “I identified Long Method and Data Clumps, refactoring with Extract Method.”
    - **Result**: “Reduced maintenance time by 30%, improving reliability.”
- **Google (Clarity)**:
  - Focus on Google’s Java Style Guide (e.g., “I identified smells for clarity”).
  - Emphasize collaboration (e.g., “Aligned with team on refactoring”).
  - STAR Response:
    - **Situation**: “Our API code had unclear smells.”
    - **Task**: “I was tasked with refactoring.”
    - **Action**: “I identified Duplicated Code, applied Google’s style guide, and collaborated.”
    - **Result**: “Improved clarity, praised by team.”
- **Meta (Execution Speed)**:
  - Highlight rapid smell detection (e.g., “I identified smells in a sprint”).
  - Focus on maintainability (e.g., “Enabled faster updates”).
  - STAR Response:
    - **Situation**: “Our API integration slowed development.”
    - **Task**: “I was responsible for refactoring.”
    - **Action**: “I quickly identified Long Method and refactored for maintainability.”
    - **Result**: “Reduced maintenance time by 25%.”
- **Netflix (Freedom & Responsibility)**:
  - Emphasize autonomous smell detection (e.g., “I independently identified smells”).
  - Focus on high-impact outcomes (e.g., “Improved maintainability”).
  - STAR Response:
    - **Situation**: “Our API code was unmaintainable.”
    - **Task**: “I was responsible for improvements.”
    - **Action**: “I independently identified Data Clumps and refactored.”
    - **Result**: “Reduced bugs by 30%, boosting maintainability.”

## Practice Exercise
**Problem**: Identify code smells in a third-party API integration and suggest refactorings.
1. **Define Requirements**:
   - Identify at least three code smells (e.g., Long Method, Data Clumps).
   - Suggest refactorings (e.g., Extract Method, Introduce Parameter Object).
2. **Craft a STAR Response**:
   - **Situation**: Describe a project with smelly code (e.g., API integration).
   - **Task**: Clarify your role (e.g., code reviewer).
   - **Action**: List 2–3 actions (e.g., identified smells, proposed refactorings).
   - **Result**: Quantify outcomes (e.g., reduced complexity, improved maintainability).
3. **Analyze Code**:
   - Review a sample Java function for smells.
   - Document findings and refactoring suggestions.
4. **Tailor to a FAANG Company**:
   - Align with Amazon (Ownership), Google (Clarity), Meta (speed), or Netflix (autonomy).
5. **Write and Review**:
   - Write a 100–150 word STAR response.
   - Ensure clarity, specificity, and alignment with code smell principles.

**Sample Response (Google - Clarity)**:
- **Situation**: “Our e-commerce API integration had complex, duplicated code.”
- **Task**: “As lead, I was responsible for improving clarity.”
- **Action**: “I identified Long Method and Duplicated Code smells, proposed Extract Method, and collaborated on reviews per Google’s style guide.”
- **Result**: “Reduced complexity by 25%, praised for clarity.”

## Conclusion
Mastering code smell identification equips you to excel in FAANG interviews and improve codebases. This lecture builds on refactoring goals from Lecture 1, advancing your *Official CTO* journey.

**Next Step**: Explore [Simplifying Code through Refactoring](/sections/refactoring/simplifying-code) or revisit [all sections](/sections/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>