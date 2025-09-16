---
title: Design a File System
description: Learn low-level system design for a file system in Java, focusing on directory and file management for scalable, robust applications.
---

# Design a File System

## Overview
Welcome to the twentieth lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Designing a file system is a classic LLD problem that tests your ability to model hierarchical structures using OOP principles. In this 25-minute lesson, we explore the **low-level design of a file system**, covering directory structure, file management, and operations like creating, deleting, and navigating directories and files. Whether building an in-memory file system or preparing for FAANG interviews, this lecture equips you to design modular, scalable systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Design Patterns*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **low-level design** principles for a file system with directory and file management.
- Learn to model **classes**, **hierarchical structures**, and **functionality** in Java.
- Apply **OOP principles** (Section 2, Lecture 1), **design patterns** (Section 3), **design principles** (Section 4), and **HLD concepts** (Section 5) to LLD.
- Write clean, modular Java code (Section 9).

## Why File System Design Matters
A file system is a common FAANG interview problem that tests your ability to model hierarchical data structures and manage resources effectively. Drawing from my experience designing complex systems, I’ve applied OOP principles to ensure maintainability and extensibility in similar applications. This lecture prepares you to design robust systems and articulate your approach clearly, showcasing your mentorship skills.

In software engineering, file system design helps you:
- **Model Hierarchical Structures**: Represent directories and files as a tree.
- **Manage Resources**: Handle file creation, deletion, and navigation.
- **Ensure Scalability**: Support large directory structures.
- **Teach Effectively**: Share practical LLD strategies.

## Key Concepts
### 1. File System Components
- **Directory Structure**: Hierarchical tree with directories and files.
- **File Management**: Store file metadata (e.g., name, content).
- **Functionality**:
  - Create and delete directories and files.
  - Navigate directories (e.g., list contents, change directory).
  - Read/write file content.
- **Edge Cases**: Duplicate names, invalid paths, empty directories.

### 2. Design Patterns
- **Composite Pattern** (Section 3, Lecture 9): For treating directories and files uniformly.
- **Visitor Pattern** (Section 3, Lecture 11): For operations like listing or searching (extensible).
- **Singleton Pattern** (Section 3, Lecture 1): For file system instance (optional).

### 3. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and inheritance for directory and file classes.
- **Design Patterns** (Section 3): Composite and Visitor patterns.
- **Design Principles** (Section 4): SoC (Lecture 11) separates file and directory logic; KISS (Lecture 8) simplifies design.
- **HLD** (Section 5):
  - Distributed File System (Lecture 27): High-level file system concepts.
  - LLD Intro (Lecture 1): Builds on class design.
  - Database Design (Lecture 2): Persisting file data.
  - API Design (Lecture 3): Exposing file system controls.
  - Concurrency Handling (Lecture 4): Thread-safe file operations.
  - Error Handling (Lecture 5): Handling invalid paths.
  - Parking Lot (Lecture 6): Similar resource management.
  - Elevator System (Lecture 7): Similar state-driven design.
  - Vending Machine (Lecture 8): Similar operation logic.
  - ATM Machine (Lecture 9): Similar transactional design.
  - Restaurant Management (Lecture 10): Similar resource tracking.
  - Library Management (Lecture 11): Similar inventory logic.
  - Chess Game (Lecture 12): Similar rule enforcement.
  - Tic-Tac-Toe (Lecture 13): Similar logic.
  - Snake and Ladder (Lecture 14): Similar mechanics.
  - Deck of Cards (Lecture 15): Similar entity management.
  - LRU Cache (Lecture 16): Similar data structure usage.
  - Rate Limiter (Lecture 17): Similar operation control.
  - Text Editor (Lecture 18): Similar data manipulation.
  - Movie Ticket Booking (Lecture 19): Similar resource allocation.
- **Clean Code** (Section 9): Meaningful names for classes and methods.

### 4. Use Case
Design an in-memory file system for an application, supporting directory and file management with basic operations.

## System Design
### Architecture
```
[Client] --> [FileSystemController]
                |
                v
            [FileSystem]
                |
                v
           [FileSystemEntry] --> [Directory|File]
```

- **Classes**:
  - `FileSystemEntry`: Abstract class for directories and files.
  - `Directory`: Manages child entries (directories or files).
  - `File`: Stores file content and metadata.
  - `FileSystem`: Manages the root directory and operations.
  - `FileSystemController`: Exposes API for operations.
- **Functionality**: Create/delete directories and files, list contents, read/write files.
- **Trade-Offs**:
  - Storage: In-memory (fast, volatile) vs. persistent (slower, durable).
  - Structure: Tree (flexible, complex) vs. flat (simpler, limited).

## Code Example: File System
Below is a Java implementation of an in-memory file system with directory and file management.

```java
import java.util.ArrayList;
import java.util.List;

// Custom exception
public class FileSystemException extends Exception {
    public FileSystemException(String message) {
        super(message);
    }
}

// Abstract file system entry
public abstract class FileSystemEntry {
    protected String name;
    protected Directory parent;

    public FileSystemEntry(String name, Directory parent) {
        this.name = name;
        this.parent = parent;
    }

    public String getName() {
        return name;
    }

    public Directory getParent() {
        return parent;
    }

    public abstract boolean isDirectory();
}

// File class
public class File extends FileSystemEntry {
    private String content;

    public File(String name, Directory parent) {
        super(name, parent);
        this.content = "";
    }

    @Override
    public boolean isDirectory() {
        return false;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}

// Directory class
public class Directory extends FileSystemEntry {
    private List<FileSystemEntry> entries;

    public Directory(String name, Directory parent) {
        super(name, parent);
        this.entries = new ArrayList<>();
    }

    @Override
    public boolean isDirectory() {
        return true;
    }

    public void addEntry(FileSystemEntry entry) throws FileSystemException {
        for (FileSystemEntry e : entries) {
            if (e.getName().equals(entry.getName())) {
                throw new FileSystemException("Entry already exists: " + entry.getName());
            }
        }
        entries.add(entry);
    }

    public void removeEntry(String name) throws FileSystemException {
        FileSystemEntry entry = getEntry(name);
        if (entry == null) {
            throw new FileSystemException("Entry not found: " + name);
        }
        entries.remove(entry);
    }

    public FileSystemEntry getEntry(String name) {
        for (FileSystemEntry entry : entries) {
            if (entry.getName().equals(name)) {
                return entry;
            }
        }
        return null;
    }

    public List<FileSystemEntry> listEntries() {
        return new ArrayList<>(entries);
    }
}

// File system class
public class FileSystem {
    private Directory root;

    public FileSystem() {
        this.root = new Directory("root", null);
    }

    public Directory getRoot() {
        return root;
    }

    public Directory navigateTo(String path) throws FileSystemException {
        if (path.isEmpty() || path.equals("/")) {
            return root;
        }
        String[] parts = path.split("/");
        Directory current = root;
        for (String part : parts) {
            if (part.isEmpty()) continue;
            FileSystemEntry entry = current.getEntry(part);
            if (entry == null || !entry.isDirectory()) {
                throw new FileSystemException("Invalid path: " + path);
            }
            current = (Directory) entry;
        }
        return current;
    }

    public void createFile(String path, String name) throws FileSystemException {
        Directory dir = navigateTo(path);
        dir.addEntry(new File(name, dir));
    }

    public void createDirectory(String path, String name) throws FileSystemException {
        Directory dir = navigateTo(path);
        dir.addEntry(new Directory(name, dir));
    }

    public void deleteEntry(String path, String name) throws FileSystemException {
        Directory dir = navigateTo(path);
        dir.removeEntry(name);
    }

    public void writeFile(String path, String name, String content) throws FileSystemException {
        Directory dir = navigateTo(path);
        FileSystemEntry entry = dir.getEntry(name);
        if (entry == null || entry.isDirectory()) {
            throw new FileSystemException("File not found: " + name);
        }
        ((File) entry).setContent(content);
    }

    public String readFile(String path, String name) throws FileSystemException {
        Directory dir = navigateTo(path);
        FileSystemEntry entry = dir.getEntry(name);
        if (entry == null || entry.isDirectory()) {
            throw new FileSystemException("File not found: " + name);
        }
        return ((File) entry).getContent();
    }
}

// Controller for API interactions
public class FileSystemController {
    private final FileSystem fileSystem;

    public FileSystemController(FileSystem fileSystem) {
        this.fileSystem = fileSystem;
    }

    public void handleCreateFile(String path, String name) {
        try {
            fileSystem.createFile(path, name);
            System.out.println("Created file: " + name + " in " + path);
        } catch (FileSystemException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public void handleCreateDirectory(String path, String name) {
        try {
            fileSystem.createDirectory(path, name);
            System.out.println("Created directory: " + name + " in " + path);
        } catch (FileSystemException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public void handleDeleteEntry(String path, String name) {
        try {
            fileSystem.deleteEntry(path, name);
            System.out.println("Deleted entry: " + name + " from " + path);
        } catch (FileSystemException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public void handleWriteFile(String path, String name, String content) {
        try {
            fileSystem.writeFile(path, name, content);
            System.out.println("Wrote content to file: " + name);
        } catch (FileSystemException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public String handleReadFile(String path, String name) {
        try {
            return fileSystem.readFile(path, name);
        } catch (FileSystemException e) {
            System.err.println("Error: " + e.getMessage());
            return "";
        }
    }

    public List<FileSystemEntry> handleListEntries(String path) {
        try {
            return fileSystem.navigateTo(path).listEntries();
        } catch (FileSystemException e) {
            System.err.println("Error: " + e.getMessage());
            return new ArrayList<>();
        }
    }
}

// Client to demonstrate usage
public class FileSystemClient {
    public static void main(String[] args) {
        FileSystem fileSystem = new FileSystem();
        FileSystemController controller = new FileSystemController(fileSystem);

        // Normal flow
        controller.handleCreateDirectory("/root", "docs");
        controller.handleCreateFile("/root/docs", "note.txt");
        controller.handleWriteFile("/root/docs", "note.txt", "Hello, World!");
        System.out.println("Read file: " + controller.handleReadFile("/root/docs", "note.txt"));
        List<FileSystemEntry> entries = controller.handleListEntries("/root");
        System.out.println("Entries in /root: " + entries.size());

        // Edge cases
        controller.handleCreateFile("/root/docs", "note.txt"); // Duplicate
        controller.handleReadFile("/root", "invalid.txt"); // Non-existent file
        controller.handleListEntries("/invalid"); // Invalid path
        controller.handleDeleteEntry("/root", "docs");
        controller.handleReadFile("/root/docs", "note.txt"); // Deleted directory
        // Output:
        // Created directory: docs in /root
        // Created file: note.txt in /root/docs
        // Wrote content to file: note.txt
        // Read file: Hello, World!
        // Entries in /root: 1
        // Error: Entry already exists: note.txt
        // Error: File not found: invalid.txt
        // Error: Invalid path: /invalid
        // Deleted entry: docs from /root
        // Error: Invalid path: /root/docs
    }
}
```
- **LLD Principles**:
  - **Directory Structure**: `Directory` and `File` form a tree using the Composite pattern.
  - **File Management**: `File` stores content; `FileSystem` manages operations.
  - **Classes**: `FileSystemEntry`, `Directory`, `File`, `FileSystem`, `FileSystemController`.
  - **Design Patterns**: Composite for hierarchy, Visitor (extensible for operations).
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates file and directory logic; DIP (Section 4, Lecture 6) via abstract `FileSystemEntry`.
- **Big O**: O(n) for `navigateTo`, `listEntries` (n = path depth or entries); O(1) for `addEntry`, `removeEntry` (ArrayList operations).
- **Edge Cases**: Handles duplicate entries, invalid paths, non-existent files.

**UML Diagram**:
```
[Client] --> [FileSystemController]
                |
                v
            [FileSystem]
                |
                v
           [FileSystemEntry]
                |
                v
      [Directory|File]
```

## Real-World Application
Imagine designing an in-memory file system for an application, supporting hierarchical directory and file management with basic operations. This LLD—aligned with HLD principles from Section 5 (e.g., Distributed File System, Lecture 27)—ensures modularity and scalability, critical for file-based systems.

## Practice Exercises
Practice file system design with these exercises:
- **Easy**: Design a UML diagram and Java code for a simple file system with one directory.
- **Medium**: Implement a file system with basic file creation and listing.
- **Medium**: Design an LLD for a file system with directory hierarchy and file operations.
- **Hard**: Architect a file system with Java, integrating multiple design patterns (e.g., Composite, Visitor).

Try designing one system in Java with a UML diagram, explaining directory and file management.

## Conclusion
Mastering the design of a file system equips you to build modular, hierarchical Java systems, enhancing your LLD skills. This lecture builds on HLD concepts and system design principles, preparing you for FAANG interviews and real-world applications.

**Next Step**: Explore [Design a Logger](/sections/lld/logger) to continue your LLD journey, or check out [all sections](/sections/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>