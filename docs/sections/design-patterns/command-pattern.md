---
title: Command Pattern
description: Master the Command pattern in Java to encapsulate actions as objects, enabling undoable operations, with practical examples for better software engineering.
---

# Command Pattern

## Overview
The Command pattern is a behavioral design pattern that encapsulates a request as an object, enabling parameterization, queuing, and undoable operations. In this twelfth lesson of Section 3 in the *Official CTO* journey, we explore the **Command pattern**, its implementation in Java, and its applications in system design. Whether implementing undoable text edits in a productivity app or queuing tasks in a workflow system, this pattern ensures flexibility and modularity. By mastering Command, you’ll create dynamic Java systems and mentor others effectively.

Inspired by *Design Patterns* by Gang of Four, *Head First Design Patterns*, and *Clean Code*, this 20-minute lesson covers the concepts, a practical Java example with a UML diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand the **Command pattern** and its role as a behavioral pattern.
- Learn to implement a **thread-safe Command** in Java with undo functionality.
- Apply **OOP principles** (Section 2, Lecture 1) and **UML** (Section 2, Lecture 2) to Command design.
- Use the pattern in real-world scenarios with clean code practices (Section 9).

## Why the Command Pattern Matters
The Command pattern decouples the requester of an action from its executor, enabling features like undo/redo and task queuing. Early in my career, I used it to implement a text editor for a productivity app, allowing users to undo text changes seamlessly. This pattern—leveraging encapsulation and polymorphism—enhances flexibility and maintainability. Explaining it clearly showcases your mentorship skills.

In software engineering, the Command pattern helps you:
- **Enable Flexibility**: Encapsulate actions for parameterization and queuing.
- **Support Undo/Redo**: Store commands for reversible operations.
- **Improve Maintainability**: Write clean, modular code (Section 9).
- **Teach Effectively**: Share dynamic action design solutions with teams.

## Key Concepts
### 1. Command Pattern Overview
The Command pattern encapsulates a request as an object, allowing it to be passed, stored, or undone.

**Structure**:
- **Command**: Interface defining execute and undo methods (e.g., `Command`).
- **Concrete Command**: Implements the command, binding a receiver to an action (e.g., `TextEditCommand`).
- **Receiver**: Performs the actual work (e.g., `TextEditor`).
- **Invoker**: Triggers command execution (e.g., `EditorController`).
- **Client**: Configures commands and invoker.

### 2. Comparison to Other Behavioral Patterns
- **Strategy** (Lecture 10): Encapsulates interchangeable algorithms.
- **Observer** (Lecture 11): Manages event-driven notifications.
- **Command**: Encapsulates actions as objects for execution and undoing.

### 3. Thread Safety
In multi-threaded environments, ensure thread-safe command execution:
- Use `synchronized` or concurrent collections for command history.
- Ensure receivers handle concurrent access safely.

### 4. Use Cases
- Undoable text edits in a text editor.
- Task queuing in a workflow system.
- Remote control systems for device commands.

**Example**: A text editor with undoable text edit commands.

## Code Example: Text Editor Command System
Let’s implement a thread-safe text editor command system for a productivity app, with a UML class diagram.

### UML Class Diagram
```
+---------------------+
|      Command        |
+---------------------+
| +execute()          |
| +undo()             |
+---------------------+
            |
            | implements
+---------------------+       +---------------------+
|   TextEditCommand   |-------|    TextEditor      |
+---------------------+  uses | -text: String      |
| -editor: TextEditor |       |                    |
| -newText: String    |       +---------------------+
| -oldText: String    |       | +setText(text: String) |
+---------------------+       | +getText(): String |
| +execute            |       +---------------------+
| +undo               |
+---------------------+
            |
            | used by
+---------------------+
|   EditorController  |
+---------------------+
| -history: List<Command> |
+---------------------+
| +executeCommand(command: Command) |
| +undoLastCommand() |
+---------------------+
```

### Java Implementation
```java
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.locks.ReentrantLock;

// Receiver
public class TextEditor {
    private String text;
    private final ReentrantLock lock;
    
    public TextEditor() {
        this.text = "";
        this.lock = new ReentrantLock();
    }
    
    public void setText(String text) {
        lock.lock();
        try {
            this.text = text;
        } finally {
            lock.unlock();
        }
    }
    
    public String getText() {
        lock.lock();
        try {
            return text;
        } finally {
            lock.unlock();
        }
    }
}

// Command interface
public interface Command {
    void execute();
    void undo();
}

// Concrete command
public class TextEditCommand implements Command {
    private final TextEditor editor;
    private final String newText;
    private String oldText;
    
    public TextEditCommand(TextEditor editor, String newText) {
        this.editor = editor;
        this.newText = newText;
    }
    
    @Override
    public void execute() {
        oldText = editor.getText();
        editor.setText(newText);
    }
    
    @Override
    public void undo() {
        editor.setText(oldText);
    }
}

// Invoker
public class EditorController {
    private final List<Command> history;
    private final ReentrantLock lock;
    
    public EditorController() {
        this.history = new ArrayList<>();
        this.lock = new ReentrantLock();
    }
    
    public void executeCommand(Command command) {
        lock.lock();
        try {
            command.execute();
            history.add(command);
        } finally {
            lock.unlock();
        }
    }
    
    public void undoLastCommand() {
        lock.lock();
        try {
            if (!history.isEmpty()) {
                Command lastCommand = history.remove(history.size() - 1);
                lastCommand.undo();
            }
        } finally {
            lock.unlock();
        }
    }
}

// Client code
public class TextEditorClient {
    public static void main(String[] args) {
        TextEditor editor = new TextEditor();
        EditorController controller = new EditorController();
        
        // Simulate concurrent edits
        Thread t1 = new Thread(() -> {
            Command command = new TextEditCommand(editor, "Hello, World!");
            controller.executeCommand(command);
        });
        
        Thread t2 = new Thread(() -> {
            Command command = new TextEditCommand(editor, "Welcome to CTO!");
            controller.executeCommand(command);
        });
        
        t1.start();
        t2.start();
        
        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println("Current text: " + editor.getText());
        controller.undoLastCommand();
        System.out.println("After undo: " + editor.getText());
        // Output example:
        // Current text: Welcome to CTO!
        // After undo: Hello, World!
    }
}
```
- **Command and OOP Principles**:
  - **Encapsulation**: Private fields (`text`, `history`, `oldText`) with public methods.
  - **Polymorphism**: `Command` interface supports different commands.
  - **Abstraction**: `EditorController` hides command execution details.
  - **Thread Safety**: Uses `ReentrantLock` for safe history and text updates (Section 2, Lecture 4).
  - **Clean Code**: Meaningful names, modularity (Section 9).
- **Big O**: O(1) for `execute`, `undo`, `setText`, `getText`.
- **Edge Cases**: Handles empty history, concurrent commands.

**Systematic Approach**:
- Clarified requirements (undoable text edits, thread-safe).
- Designed UML diagram to model `Command`, `TextEditCommand`, `TextEditor`, `EditorController`.
- Implemented Java classes with Command pattern and thread safety.
- Tested with `main` method for concurrent edits and undo.

## Real-World Application
Imagine designing a text editor for a productivity app, where the Command pattern enables undoable text changes, supporting features like edit history and rollback. Thread-safe execution ensures concurrent edits don’t cause conflicts. The Command pattern—leveraging encapsulation and polymorphism—demonstrates your ability to mentor teams on flexible, action-oriented design solutions.

## Practice Exercises
Apply the Command pattern with these exercises:
- **Easy**: Design a UML diagram and Java code for a `DrawingCommand` with `DrawShape` and `EraseShape` commands.
- **Medium**: Implement a `TaskQueue` system with `TaskCommand` for scheduling and undoing tasks.
- **Medium**: Create a `Calculator` with `AddCommand` and `SubtractCommand` for reversible operations.
- **Hard**: Design a `DocumentEditor` with `InsertTextCommand` and `DeleteTextCommand` for a collaborative app.

Try implementing one exercise in Java with a UML diagram, ensuring thread safety and clean code principles.

## Conclusion
The Command pattern equips you to design flexible, undoable Java systems by encapsulating actions as objects. By mastering this behavioral pattern, you’ll optimize software, ensure maintainability, and teach others effectively. This advances your progress in Section 3 of the *Official CTO* journey.

**Next Step**: Explore [Template Method Pattern](/sections/design-patterns/template-method-pattern) to define algorithm skeletons, or check out [all sections](/sections/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>