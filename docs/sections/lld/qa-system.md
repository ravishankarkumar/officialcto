---
title: Design a Stack Overflow-like Q&A System (Core)
description: Learn low-level system design for a Stack Overflow-like Q&A system in Java, focusing on question posting and answering for scalable, robust applications.
---

# Design a Stack Overflow-like Q&A System (Core)

## Overview
Welcome to the twenty-third lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Designing a Stack Overflow-like Q&A system is a practical LLD problem that tests your ability to model user-driven content interactions using OOP principles. In this 25-minute lesson, we explore the **low-level design of a Q&A system**, focusing on core functionality like posting questions, adding answers, and managing basic interactions. Whether building a Q&A platform or preparing for FAANG interviews, this lecture equips you to design modular, scalable systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Design Patterns*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **low-level design** principles for a Q&A system with question posting and answering.
- Learn to model **classes**, **relationships**, and **functionality** in Java.
- Apply **OOP principles** (Section 2, Lecture 1), **design patterns** (Section 3), **design principles** (Section 4), and **HLD concepts** (Section 5) to LLD.
- Write clean, modular Java code (Section 9).

## Why Q&A System Design Matters
A Q&A system like Stack Overflow is a common FAANG interview problem that tests your ability to model user interactions and content management. Drawing from my experience designing social platforms, I’ve applied OOP principles to ensure maintainability and scalability in similar applications. This lecture prepares you to design robust systems and articulate your approach clearly, showcasing your mentorship skills.

In software engineering, Q&A system design helps you:
- **Model User Interactions**: Manage questions and answers efficiently.
- **Ensure Scalability**: Handle large volumes of posts.
- **Enhance Maintainability**: Create modular, testable code.
- **Teach Effectively**: Share practical LLD strategies.

## Key Concepts
### 1. Q&A System Components
- **Question Posting**: Users create questions with titles and content.
- **Answering**: Users add answers to questions.
- **Functionality**:
  - Create and retrieve questions.
  - Add and list answers for a question.
  - Track user interactions (e.g., who posted what).
- **Edge Cases**: Duplicate questions, invalid user IDs, empty content.

### 2. Design Patterns
- **Composite Pattern** (Section 3, Lecture 9): For modeling questions and answers hierarchically.
- **Singleton Pattern** (Section 3, Lecture 1): For Q&A system instance (optional).
- **Observer Pattern** (Section 3, Lecture 6): For notifying updates (extensible).

### 3. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and polymorphism for question and answer classes.
- **Design Patterns** (Section 3): Composite and Observer patterns.
- **Design Principles** (Section 4): SoC (Lecture 11) separates question and answer logic; KISS (Lecture 8) simplifies design.
- **HLD** (Section 5):
  - Social Network Graph (Lecture 29): Similar user interaction modeling.
  - LLD Intro (Lecture 1): Builds on class design.
  - Database Design (Lecture 2): Persisting Q&A data.
  - API Design (Lecture 3): Exposing Q&A controls.
  - Concurrency Handling (Lecture 4): Thread-safe interactions.
  - Error Handling (Lecture 5): Handling invalid inputs.
  - Parking Lot (Lecture 6): Similar resource management.
  - Elevator System (Lecture 7): Similar state-driven design.
  - Vending Machine (Lecture 8): Similar operation logic.
  - ATM Machine (Lecture 9): Similar transactional design.
  - Restaurant Management (Lecture 10): Similar resource tracking.
  - Library Management (Lecture 11): Similar resource logic.
  - Chess Game (Lecture 12): Similar rule enforcement.
  - Tic-Tac-Toe (Lecture 13): Similar logic.
  - Snake and Ladder (Lecture 14): Similar mechanics.
  - Deck of Cards (Lecture 15): Similar entity management.
  - LRU Cache (Lecture 16): Similar data structure usage.
  - Rate Limiter (Lecture 17): Similar operation control.
  - Text Editor (Lecture 18): Similar data manipulation.
  - Movie Ticket Booking (Lecture 19): Similar resource allocation.
  - File System (Lecture 20): Similar hierarchical structure.
  - Logger (Lecture 21): Similar operation management.
  - URL Parser (Lecture 22): Similar data processing.
- **Clean Code** (Section 9): Meaningful names for classes and methods.

### 4. Use Case
Design a core Q&A system for a platform like Stack Overflow, supporting question posting and answering with user interaction tracking.

## System Design
### Architecture
```
[Client] --> [QAController]
                |
                v
            [QAService]
                |
                v
           [QASystem] --> [Question] --> [Answer]
                          [User]
```

- **Classes**:
  - `User`: Represents users posting questions or answers.
  - `Question`: Stores question details (title, content).
  - `Answer`: Stores answer details linked to a question.
  - `QASystem`: Manages questions, answers, and users.
  - `QAService`: Handles business logic.
  - `QAController`: Exposes API for operations.
- **Functionality**: Post questions, add answers, retrieve questions and answers.
- **Trade-Offs**:
  - Storage: In-memory (fast, volatile) vs. database (persistent, slower).
  - Structure: Hierarchical (flexible, complex) vs. flat (simple, limited).

## Code Example: Q&A System
Below is a Java implementation of a core Q&A system with question posting and answering.

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Custom exception
public class QAException extends Exception {
    public QAException(String message) {
        super(message);
    }
}

// User class
public class User {
    private String userId;
    private String username;

    public User(String userId, String username) {
        this.userId = userId;
        this.username = username;
    }

    public String getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }
}

// Question class
public class Question {
    private String questionId;
    private String title;
    private String content;
    private String userId;
    private List<Answer> answers;

    public Question(String questionId, String title, String content, String userId) {
        this.questionId = questionId;
        this.title = title;
        this.content = content;
        this.userId = userId;
        this.answers = new ArrayList<>();
    }

    public String getQuestionId() {
        return questionId;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getUserId() {
        return userId;
    }

    public List<Answer> getAnswers() {
        return new ArrayList<>(answers);
    }

    public void addAnswer(Answer answer) {
        answers.add(answer);
    }
}

// Answer class
public class Answer {
    private String answerId;
    private String questionId;
    private String content;
    private String userId;

    public Answer(String answerId, String questionId, String content, String userId) {
        this.answerId = answerId;
        this.questionId = questionId;
        this.content = content;
        this.userId = userId;
    }

    public String getAnswerId() {
        return answerId;
    }

    public String getContent() {
        return content;
    }

    public String getUserId() {
        return userId;
    }
}

// Q&A system class
public class QASystem {
    private Map<String, User> users;
    private Map<String, Question> questions;

    public QASystem() {
        this.users = new HashMap<>();
        this.questions = new HashMap<>();
    }

    public void addUser(User user) throws QAException {
        if (users.containsKey(user.getUserId())) {
            throw new QAException("User already exists: " + user.getUserId());
        }
        users.put(user.getUserId(), user);
    }

    public void postQuestion(String questionId, String title, String content, String userId) throws QAException {
        if (!users.containsKey(userId)) {
            throw new QAException("User not found: " + userId);
        }
        if (questions.containsKey(questionId)) {
            throw new QAException("Question already exists: " + questionId);
        }
        if (title.isEmpty() || content.isEmpty()) {
            throw new QAException("Title or content cannot be empty");
        }
        questions.put(questionId, new Question(questionId, title, content, userId));
    }

    public void postAnswer(String answerId, String questionId, String content, String userId) throws QAException {
        if (!users.containsKey(userId)) {
            throw new QAException("User not found: " + userId);
        }
        Question question = questions.get(questionId);
        if (question == null) {
            throw new QAException("Question not found: " + questionId);
        }
        if (content.isEmpty()) {
            throw new QAException("Answer content cannot be empty");
        }
        question.addAnswer(new Answer(answerId, questionId, content, userId));
    }

    public Question getQuestion(String questionId) throws QAException {
        Question question = questions.get(questionId);
        if (question == null) {
            throw new QAException("Question not found: " + questionId);
        }
        return question;
    }
}

// Service layer
public class QAService {
    private final QASystem qaSystem;

    public QAService(QASystem qaSystem) {
        this.qaSystem = qaSystem;
    }

    public void addUser(String userId, String username) throws QAException {
        qaSystem.addUser(new User(userId, username));
        System.out.println("Added user: " + username);
    }

    public void postQuestion(String questionId, String title, String content, String userId) throws QAException {
        qaSystem.postQuestion(questionId, title, content, userId);
        System.out.println("Posted question: " + questionId);
    }

    public void postAnswer(String answerId, String questionId, String content, String userId) throws QAException {
        qaSystem.postAnswer(answerId, questionId, content, userId);
        System.out.println("Posted answer: " + answerId + " for question: " + questionId);
    }

    public Question getQuestion(String questionId) throws QAException {
        return qaSystem.getQuestion(questionId);
    }
}

// Controller for API interactions
public class QAController {
    private final QAService service;

    public QAController(QAService service) {
        this.service = service;
    }

    public void handleAddUser(String userId, String username) {
        try {
            service.addUser(userId, username);
        } catch (QAException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public void handlePostQuestion(String questionId, String title, String content, String userId) {
        try {
            service.postQuestion(questionId, title, content, userId);
        } catch (QAException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public void handlePostAnswer(String answerId, String questionId, String content, String userId) {
        try {
            service.postAnswer(answerId, questionId, content, userId);
        } catch (QAException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public Question handleGetQuestion(String questionId) {
        try {
            return service.getQuestion(questionId);
        } catch (QAException e) {
            System.err.println("Error: " + e.getMessage());
            return null;
        }
    }
}

// Client to demonstrate usage
public class QAClient {
    public static void main(String[] args) {
        QASystem qaSystem = new QASystem();
        QAService service = new QAService(qaSystem);
        QAController controller = new QAController(service);

        // Normal flow
        controller.handleAddUser("user1", "Alice");
        controller.handlePostQuestion("q1", "What is Java?", "Explain Java programming.", "user1");
        controller.handlePostAnswer("a1", "q1", "Java is a versatile programming language.", "user1");
        Question question = controller.handleGetQuestion("q1");
        System.out.println("Question: " + question.getTitle() + ", Answers: " + question.getAnswers().size());

        // Edge cases
        controller.handlePostQuestion("q1", "Duplicate", "Content", "user1"); // Duplicate question
        controller.handlePostAnswer("a2", "q2", "Invalid answer", "user1"); // Invalid question
        controller.handlePostQuestion("q2", "", "Content", "user1"); // Empty title
        controller.handleGetQuestion("q3"); // Non-existent question
        // Output:
        // Added user: Alice
        // Posted question: q1
        // Posted answer: a1 for question: q1
        // Question: What is Java?, Answers: 1
        // Error: Question already exists: q1
        // Error: Question not found: q2
        // Error: Title or content cannot be empty
        // Error: Question not found: q3
    }
}
```
- **LLD Principles**:
  - **Question Posting**: `Question` stores title, content, and user details.
  - **Answering**: `Answer` links to questions with content and user details.
  - **Classes**: `User`, `Question`, `Answer`, `QASystem`, `QAService`, `QAController`.
  - **Design Patterns**: Composite (question-answer hierarchy), Observer (extensible for notifications).
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates question and answer logic; DIP (Section 4, Lecture 6) for extensibility.
- **Big O**: O(1) for `postQuestion`, `postAnswer`, `getQuestion` (HashMap); O(n) for answer retrieval (n = answers).
- **Edge Cases**: Handles duplicate questions, invalid users/questions, empty content.

**UML Diagram**:
```
[Client] --> [QAController]
                |
                v
            [QAService]
                |
                v
           [QASystem]
                |
                v
           [Question] --> [Answer]
           [User]
```

## Real-World Application
Imagine designing a Q&A system for a platform like Stack Overflow, supporting core features like question posting and answering. This LLD—aligned with HLD principles from Section 5 (e.g., Social Network Graph, Lecture 29)—ensures modularity and scalability, critical for user-driven systems.

## Practice Exercises
Practice Q&A system design with these exercises:
- **Easy**: Design a UML diagram and Java code for a simple question posting system.
- **Medium**: Implement a Q&A system with question and answer creation.
- **Medium**: Design an LLD for a Q&A system with user and answer management.
- **Hard**: Architect a Q&A system with Java, integrating multiple design patterns (e.g., Composite, Observer).

Try designing one system in Java with a UML diagram, explaining question and answer management.

## Conclusion
Mastering the design of a Q&A system equips you to build modular, scalable Java systems, enhancing your LLD skills. This lecture builds on HLD concepts and system design principles, preparing you for FAANG interviews and real-world applications.

**Next Step**: Explore [Design a Parking lot System](/sections/lld/parking-lot) to continue your LLD journey, or check out [all sections](/sections/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>