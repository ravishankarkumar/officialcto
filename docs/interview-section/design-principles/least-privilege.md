---
title: Principle of Least Privilege (Least Authority)
description: Learn the Principle of Least Privilege in Java. Understand how granting only the minimum rights necessary improves security, maintainability, and robustness, with code, UML, and interview prep.
---

# Principle of Least Privilege / Least Authority

## Overview
The **Principle of Least Privilege (PoLP)**, also known as **Least Authority**, states that a system or user should have only the minimum rights and permissions necessary to perform its functions. This principle minimizes potential damage from errors, bugs, or malicious actions, and is a cornerstone of secure software design.

## Learning Objectives
- Understand the **Principle of Least Privilege** and its role in security and design.  
- Learn how to apply it in **Java code, systems, and APIs**.  
- Implement examples that restrict access using access modifiers and limited privileges.  
- Recognize its relationship with **Information Hiding** and **Separation of Concerns**.  
- Prepare for interviews with real-world PoLP scenarios.  

## Why It Matters
Overly permissive systems are fragile and vulnerable. If every class, method, or user has broad privileges, misuse—intentional or accidental—can cause significant issues. By limiting authority, systems remain robust, secure, and easier to maintain.

**Benefits:**
- **Security**: Restricting access reduces attack surface.  
- **Stability**: Fewer unintended side effects from excessive privileges.  
- **Maintainability**: Easier to reason about responsibilities and scope.  
- **Compliance**: Supports industry best practices and regulations (e.g., GDPR, HIPAA).  

## Key Concepts
1. **Least Privilege in Code**: Use the lowest visibility (`private` > `protected` > `public`).  
2. **Least Privilege in APIs**: Expose only necessary endpoints, keep internal ones hidden.  
3. **Least Privilege in Systems**: Users and processes should operate with minimal permissions.  
4. **Relation to Design Principles**: Complements Information Hiding and Separation of Concerns by restricting unnecessary access.  

## Code Example: File Access

### Without Least Privilege
```java
// Overexposed: anyone can delete files directly
public class FileManager {
    public void deleteFile(String filePath) {
        File file = new File(filePath);
        if (file.exists()) file.delete();
    }
}
```
- **Problem**: Every client has full authority to delete files, risking data loss.  

### With Least Privilege
```java
// Restrict privileges: provide only necessary operations
public class SafeFileManager {
    private final Path directory;
    
    public SafeFileManager(String dir) {
        this.directory = Paths.get(dir);
    }
    
    // Only allow reading files, not deletion
    public String readFile(String filename) throws IOException {
        Path filePath = directory.resolve(filename);
        return Files.readString(filePath);
    }
}
```
- **Solution**: Clients have only the minimal authority needed (read-only). Deletion or modification is not exposed.  

### UML (After)
```
+---------------------+
|   SafeFileManager   |
+---------------------+
| -directory: Path    |
+---------------------+
| +readFile(filename): String |
+---------------------+
```

## Real-World Applications
- **Java Classes**: Fields are `private`, exposing only getters/setters when necessary.  
- **Databases**: Users granted only SELECT when they don’t need UPDATE or DELETE.  
- **Operating Systems**: Processes run with user privileges, not root/admin, unless needed.  
- **Microservices**: Services expose minimal APIs and operate with least authority.  

## Practice Exercises
- **Easy**: Create a `User` class with private password storage, exposing only validation methods.  
- **Medium**: Refactor a `BankAccount` to expose only deposit/withdraw, not direct balance modification.  
- **Medium**: Design a `Logger` that exposes only logging APIs without giving access to internal buffers.  
- **Hard**: Build a role-based access control system in Java where roles have only the minimum rights required.  

## Interview Insights
- *“What is the Principle of Least Privilege?”*  
- *“How does it differ from Information Hiding?”*  
- *“Give an example of applying least privilege in code and in systems.”*  
- *“Why is least privilege important for security?”*  

## Conclusion
The Principle of Least Privilege ensures that systems and users operate with only the minimum rights necessary. By applying this principle, you enhance security, reduce risk, and simplify system design. Combined with Information Hiding and Separation of Concerns, it creates robust, secure, and maintainable Java systems.

**Next Step**: Explore [High Cohesion & Low Coupling](/interview-section/design-principles/high-cohesion-low-coupling) to learn how modularity complements least privilege for cleaner designs.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
