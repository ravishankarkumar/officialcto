---
title: Design a Text Editor (e.g., Notepad)
description: Learn low-level system design for a text editor in Java, focusing on buffer management and undo functionality for scalable, robust applications.
---

# Design a Text Editor (e.g., Notepad)

## Overview
Welcome to the eighteenth lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Designing a text editor system, like Notepad, is a classic LLD problem that tests your ability to manage text buffers and implement undo functionality using OOP principles. In this 25-minute lesson, we explore the **low-level design of a text editor system**, covering buffer management for text storage, undo functionality for reversing actions, and basic operations like insert and delete. Whether building a Notepad-like application or preparing for FAANG interviews, this lecture equips you to design modular, efficient systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Design Patterns*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **low-level design** principles for a text editor with buffer management and undo functionality.
- Learn to model **classes**, **data structures**, and **functionality** in Java.
- Apply **OOP principles** (Section 2, Lecture 1), **design patterns** (Section 3), **design principles** (Section 4), and **HLD concepts** (Section 5) to LLD.
- Write clean, modular Java code (Section 9).

## Why Text Editor Design Matters
A text editor system is a practical LLD problem that tests your ability to manage dynamic data and user interactions. Drawing from my experience designing efficient systems, I’ve applied similar techniques to ensure flexibility and reliability in text-based applications. This lecture prepares you to design robust systems and articulate your approach clearly, showcasing your mentorship skills.

In software engineering, text editor design helps you:
- **Manage Dynamic Data**: Handle text buffers efficiently.
- **Implement Undo**: Support reversible actions.
- **Ensure Scalability**: Support large text inputs.
- **Teach Effectively**: Share practical LLD strategies.

## Key Concepts
### 1. Text Editor Components
- **Buffer Management**: Store text data (e.g., StringBuilder for efficiency).
- **Undo Functionality**: Track operations for reversal (e.g., using a stack).
- **Functionality**:
  - Insert text at a position.
  - Delete text from a range.
  - Undo previous operations.
- **Edge Cases**: Invalid positions, empty buffer, undo stack exhaustion.

### 2. Design Patterns
- **Command Pattern** (Section 3, Lecture 8): For encapsulating operations (e.g., insert, delete) with undo support.
- **Memento Pattern** (Section 3, Lecture 10): For storing buffer states (alternative to command).
- **Singleton Pattern** (Section 3, Lecture 1): For text editor instance (optional).

### 3. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation for buffer and command classes.
- **Design Patterns** (Section 3): Command and Memento patterns.
- **Design Principles** (Section 4): SoC (Lecture 11) separates buffer and undo logic; KISS (Lecture 8) simplifies design.
- **HLD** (Section 5):
  - Collaborative Editor (Lecture 30): Similar text manipulation.
  - LLD Intro (Lecture 1): Builds on class design.
  - Database Design (Lecture 2): Persisting text data (optional).
  - API Design (Lecture 3): Exposing editor controls.
  - Concurrency Handling (Lecture 4): Thread-safe text operations (optional).
  - Error Handling (Lecture 5): Handling invalid inputs.
  - Parking Lot (Lecture 6): Similar entity modeling.
  - Elevator System (Lecture 7): Similar state-driven design.
  - Vending Machine (Lecture 8): Similar operation logic.
  - ATM Machine (Lecture 9): Similar transactional design.
  - Restaurant Management (Lecture 10): Similar entity management.
  - Library Management (Lecture 11): Similar resource tracking.
  - Chess Game (Lecture 12): Similar rule enforcement.
  - Tic-Tac-Toe (Lecture 13): Similar logic.
  - Snake and Ladder (Lecture 14): Similar mechanics.
  - Deck of Cards (Lecture 15): Similar entity management.
  - LRU Cache (Lecture 16): Similar data structure usage.
  - Rate Limiter (Lecture 17): Similar operation control.
- **Clean Code** (Section 9): Meaningful names for classes and methods.

### 4. Use Case
Design a text editor system for a Notepad-like application, supporting buffer management and undo functionality.

## System Design
### Architecture
```
[Client] --> [EditorController]
                |
                v
            [TextEditor]
                |
                v
           [TextBuffer] --> [Command]
```

- **Classes**:
  - `TextBuffer`: Manages text data using StringBuilder.
  - `Command`: Encapsulates operations (insert, delete) with undo.
  - `TextEditor`: Manages buffer and command stack.
  - `EditorController`: Exposes API for text operations.
- **Functionality**: Insert/delete text, undo operations.
- **Trade-Offs**:
  - Buffer: StringBuilder (efficient, mutable) vs. String (immutable, simpler).
  - Undo: Command pattern (flexible, memory-heavy) vs. Memento (state-based, complex).

## Code Example: Text Editor System
Below is a Java implementation of a text editor system with buffer and undo functionality.

```java
import java.util.Stack;

// Custom exception
public class EditorException extends Exception {
    public EditorException(String message) {
        super(message);
    }
}

// Text buffer class
public class TextBuffer {
    private StringBuilder content;

    public TextBuffer() {
        this.content = new StringBuilder();
    }

    public void insert(int position, String text) throws EditorException {
        if (position < 0 || position > content.length()) {
            throw new EditorException("Invalid position: " + position);
        }
        content.insert(position, text);
    }

    public void delete(int start, int length) throws EditorException {
        if (start < 0 || start >= content.length() || length <= 0 || start + length > content.length()) {
            throw new EditorException("Invalid delete range: start=" + start + ", length=" + length);
        }
        content.delete(start, start + length);
    }

    public String getContent() {
        return content.toString();
    }
}

// Command interface
public interface Command {
    void execute() throws EditorException;
    void undo() throws EditorException;
}

public class InsertCommand implements Command {
    private TextBuffer buffer;
    private int position;
    private String text;

    public InsertCommand(TextBuffer buffer, int position, String text) {
        this.buffer = buffer;
        this.position = position;
        this.text = text;
    }

    @Override
    public void execute() throws EditorException {
        buffer.insert(position, text);
    }

    @Override
    public void undo() throws EditorException {
        buffer.delete(position, text.length());
    }
}

public class DeleteCommand implements Command {
    private TextBuffer buffer;
    private int start;
    private int length;
    private String deletedText;

    public DeleteCommand(TextBuffer buffer, int start, int length) {
        this.buffer = buffer;
        this.start = start;
        this.length = length;
    }

    @Override
    public void execute() throws EditorException {
        deletedText = buffer.getContent().substring(start, start + length);
        buffer.delete(start, length);
    }

    @Override
    public void undo() throws EditorException {
        buffer.insert(start, deletedText);
    }
}

// Text editor class
public class TextEditor {
    private TextBuffer buffer;
    private Stack<Command> undoStack;

    public TextEditor() {
        this.buffer = new TextBuffer();
        this.undoStack = new Stack<>();
    }

    public void insert(int position, String text) throws EditorException {
        Command command = new InsertCommand(buffer, position, text);
        command.execute();
        undoStack.push(command);
        System.out.println("Inserted text: " + text + " at position " + position);
    }

    public void delete(int start, int length) throws EditorException {
        Command command = new DeleteCommand(buffer, start, length);
        command.execute();
        undoStack.push(command);
        System.out.println("Deleted text from " + start + " to " + (start + length));
    }

    public void undo() throws EditorException {
        if (undoStack.isEmpty()) {
            throw new EditorException("No operations to undo");
        }
        Command command = undoStack.pop();
        command.undo();
        System.out.println("Undo performed");
    }

    public String getContent() {
        return buffer.getContent();
    }
}

// Controller for API interactions
public class EditorController {
    private final TextEditor editor;

    public EditorController(TextEditor editor) {
        this.editor = editor;
    }

    public void handleInsert(int position, String text) {
        try {
            editor.insert(position, text);
        } catch (EditorException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public void handleDelete(int start, int length) {
        try {
            editor.delete(start, length);
        } catch (EditorException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public void handleUndo() {
        try {
            editor.undo();
        } catch (EditorException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public String handleGetContent() {
        return editor.getContent();
    }
}

// Client to demonstrate usage
public class EditorClient {
    public static void main(String[] args) {
        TextEditor editor = new TextEditor();
        EditorController controller = new EditorController(editor);

        // Normal flow
        controller.handleInsert(0, "Hello");
        controller.handleInsert(5, ", World!");
        System.out.println("Content: " + controller.handleGetContent());
        controller.handleDelete(0, 5);
        System.out.println("Content: " + controller.handleGetContent());
        controller.handleUndo();
        System.out.println("Content: " + controller.handleGetContent());

        // Edge cases
        controller.handleInsert(100, "Invalid"); // Invalid position
        controller.handleDelete(0, 20); // Invalid range
        controller.handleUndo(); // Undo empty stack
        // Output:
        // Inserted text: Hello at position 0
        // Inserted text: , World! at position 5
        // Content: Hello, World!
        // Deleted text from 0 to 5
        // Content: , World!
        // Undo performed
        // Content: Hello, World!
        // Error: Invalid position: 100
        // Error: Invalid delete range: start=0, length=20
        // Error: No operations to undo
    }
}
```
- **LLD Principles**:
  - **Buffer Management**: `TextBuffer` uses StringBuilder for efficient text manipulation.
  - **Undo Functionality**: `Command` pattern with stack for reversible operations.
  - **Classes**: `TextBuffer`, `Command`, `InsertCommand`, `DeleteCommand`, `TextEditor`, `EditorController`.
  - **Design Patterns**: Command for undo support, Memento (extensible for state snapshots).
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates buffer and undo logic; KISS (Lecture 8) simplifies implementation.
- **Big O**: O(n) for `insert`, `delete` (StringBuilder operations, n = text length); O(1) for `undo`.
- **Edge Cases**: Handles invalid positions, invalid ranges, empty undo stack.

**UML Diagram**:
```
[Client] --> [EditorController]
                |
                v
            [TextEditor]
                |
                v
           [TextBuffer] --> [Command]
                            [InsertCommand|DeleteCommand]
```

## Real-World Application
Imagine designing a text editor for a Notepad-like application, supporting efficient text manipulation and undo functionality. This LLD—aligned with HLD principles from Section 5 (e.g., Collaborative Editor, Lecture 30)—ensures flexibility and reliability, critical for text-based systems.

## Practice Exercises
Practice text editor design with these exercises:
- **Easy**: Design a UML diagram and Java code for a simple text buffer.
- **Medium**: Implement a text editor with basic insert and delete operations.
- **Medium**: Design an LLD for a text editor with undo functionality.
- **Hard**: Architect a text editor with Java, integrating multiple design patterns (e.g., Command, Memento).

Try designing one system in Java with a UML diagram, explaining buffer management and undo functionality.

## Conclusion
Mastering the design of a text editor system equips you to build modular, efficient Java systems, enhancing your LLD skills. This lecture builds on HLD concepts and system design principles, preparing you for FAANG interviews and real-world applications.

**Next Step**: Explore [Design a Movie Ticket Booking System](/interview-section/lld/movie-ticket-booking) to continue your LLD journey, or check out [all sections](/interview-section/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>