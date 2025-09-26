---
title: Java Multithreading & Concurrency (Part 1) - Thread Basics
description: Learn the basics of threads in Java — what they are, their lifecycle, and how to create them using Thread, Runnable, and Callable, with pros/cons of each approach.
---

# Java Multithreading & Concurrency (Part 1): Thread Basics

Multithreading is a **core concept in Java** and a **favorite interview topic**.  
Before diving into synchronization, executors, or concurrency utilities, we must understand the **fundamentals of threads**.  


## 1. What is a Thread?

- A **thread** is the smallest unit of execution in a process.  
- Each Java application starts with one **main thread**.  
- Additional threads can be created to perform tasks concurrently.  

**Why use threads?**
- Perform multiple tasks simultaneously (e.g., UI responsiveness + background computation).
- Utilize multiple CPU cores.
- Handle high I/O workloads (e.g., web servers).



## 2. Thread Lifecycle

A thread in Java goes through several states, defined in the `Thread.State` enum:

1. **New** – Thread object created but not started (`new Thread()`).
2. **Runnable** – Eligible to run, waiting for CPU scheduling.
3. **Running** – Currently executing instructions.
4. **Waiting/Timed Waiting** – Paused, waiting for a condition or timeout.
5. **Blocked** – Waiting to acquire a lock.
6. **Terminated** – Completed execution.

**Diagram (simplified):**
```
 New → Runnable → Running → Terminated
          ↑        ↓
        Waiting/Timed Waiting/Blocked
```



## 3. Creating Threads

There are three main ways to create threads in Java:

### A) Extending the `Thread` Class
```java
class MyThread extends Thread {
    public void run() {
        System.out.println("Thread running: " + Thread.currentThread().getName());
    }
}

public class ThreadExample {
    public static void main(String[] args) {
        MyThread t1 = new MyThread();
        t1.start(); // starts a new thread
    }
}
```
✅ Simple to use.  
❌ Can’t extend another class (Java allows only single inheritance).

---

### B) Implementing the `Runnable` Interface
```java
class MyRunnable implements Runnable {
    public void run() {
        System.out.println("Runnable running: " + Thread.currentThread().getName());
    }
}

public class RunnableExample {
    public static void main(String[] args) {
        Thread t1 = new Thread(new MyRunnable());
        t1.start();
    }
}
```
✅ Allows extending another class.  
✅ Clean separation between **task** (Runnable) and **execution** (Thread).  
❌ No direct return value from `run()`.  

---

### C) Using `Callable` with `Future`
```java
import java.util.concurrent.*;

public class CallableExample {
    public static void main(String[] args) throws Exception {
        Callable<Integer> task = () -> {
            System.out.println("Callable running: " + Thread.currentThread().getName());
            return 42; // return a result
        };

        ExecutorService executor = Executors.newSingleThreadExecutor();
        Future<Integer> future = executor.submit(task);

        System.out.println("Result: " + future.get()); // blocks until result is ready
        executor.shutdown();
    }
}
```
✅ Supports return values and exceptions.  
✅ Works with the **Executor Framework** (preferred in modern Java).  
❌ Slightly more verbose than Runnable.  



## 4. Pros and Cons of Each Approach

| Approach                 | Pros ✅                                  | Cons ❌                                   |
|--------------------------|------------------------------------------|-------------------------------------------|
| **Extending Thread**     | Easy to implement                        | Single inheritance limitation; less flexible |
| **Implementing Runnable**| Decouples task from execution; reusable  | No return value from task                 |
| **Using Callable**       | Supports return values & exceptions; integrates with ExecutorService | More boilerplate; requires executor setup |



## 5. Interview Takeaways

- Always prefer **Runnable** or **Callable** over extending `Thread`.  
- Use `Callable` when you need **results** from tasks.  
- In modern Java, avoid manually managing threads — use the **Executor Framework** (covered in Part 3).  



## Conclusion

Threads are the foundation of **Java concurrency**.  
Understanding what they are, their lifecycle, and how to create them is the first step.  

Next, we’ll explore **Synchronization & Thread Safety** in Part 2 of this series.
