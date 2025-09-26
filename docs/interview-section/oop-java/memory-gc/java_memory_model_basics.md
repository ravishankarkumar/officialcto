---
title: Java Memory Model Basics
description: Learn the basics of Java memory model and JVM architecture — heap, stack, method area, object creation, and key interview questions on memory management.
---

# Java Memory Model Basics

Memory management is one of the most fundamental topics in Java. A strong understanding of how the **Java Virtual Machine (JVM)** organizes memory is essential for writing efficient applications, troubleshooting performance issues, and excelling in interviews.

---

## JVM Architecture and Memory Areas

The JVM organizes memory into several runtime areas:

- **Heap**  
  - Shared among all threads.  
  - Stores objects and arrays.  
  - Divided into **Young Generation** and **Old Generation**.  

- **Stack**  
  - Each thread has its own stack.  
  - Stores **method frames**, **local variables**, and **partial results**.  
  - Memory is reclaimed automatically when methods exit.  

- **Method Area**  
  - Stores class metadata, method bytecode, and static variables.  
  - Since Java 8, replaced by **Metaspace** (uses native memory).  

- **Program Counter (PC) Register**  
  - Each thread has its own PC register.  
  - Points to the current instruction being executed.  

- **Native Method Stacks**  
  - Used by native (non-Java) code invoked via JNI (Java Native Interface).  

---

## Heap Memory Regions

The **heap** is further divided for efficient garbage collection:

- **Young Generation**  
  - Stores newly created objects.  
  - Subdivided into:
    - **Eden Space**: where new objects are allocated.  
    - **Survivor Spaces (S0, S1)**: objects surviving GC are moved here.  
  - Collected frequently by **Minor GC**.  

- **Old Generation (Tenured Space)**  
  - Stores long-lived objects.  
  - Collected less frequently by **Major GC**.  

- **Metaspace** (replaces PermGen in Java 8+)  
  - Stores class metadata, method info, and reflection data.  
  - Grows dynamically, unlike PermGen which had a fixed size.  

---

## Object Creation & Memory Layout

1. **Class Loading**  
   - The class is loaded into the **Method Area / Metaspace**.  

2. **Object Allocation**  
   - Memory for the object is allocated in the **Heap** (usually Eden Space).  

3. **Reference on the Stack**  
   - A reference to the object is stored in the **Stack** of the executing thread.  

### Example

```java
class User {
    String name;
    int age;
}

public class Main {
    public static void main(String[] args) {
        User u = new User();  // Object in Heap, reference 'u' on Stack
        u.name = "Alice";
        u.age = 25;
    }
}
```

- **User object** resides in the Heap.  
- **Reference `u`** is stored on the thread’s Stack.  
- **Class `User` metadata** is in Metaspace.  

---

## Interview Focus: Heap vs Stack

| Feature         | Heap | Stack |
|-----------------|------|-------|
| **Scope**       | Shared across all threads | One stack per thread |
| **Stores**      | Objects, arrays | References, local variables, method calls |
| **GC Managed**  | Yes (garbage collected) | No (auto-managed when methods return) |
| **Access**      | Slower (global access) | Faster (LIFO access) |
| **Lifetime**    | Until GC frees | Until method completes |

**Common Interview Questions**:
1. What is stored in heap vs stack?  
2. What happens when stack overflows?  
3. Why was PermGen replaced by Metaspace in Java 8?  
4. Explain Minor vs Major GC in the context of memory regions.  

---

## Summary

- JVM memory is divided into **Heap, Stack, Method Area (Metaspace), PC Registers, and Native Stacks**.  
- Heap is subdivided into **Young Gen, Old Gen, and Metaspace**.  
- Objects live in the Heap, references in the Stack.  
- Understanding these fundamentals helps in **GC tuning, debugging OutOfMemoryErrors, and interview prep**.
