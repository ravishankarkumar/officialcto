---
title: Java Multithreading & Concurrency (Part 1) - Thread Basics
description: Learn the basics of threads in Java — what they are, their lifecycle, and how to create them using Thread, Runnable, and Callable, with pros/cons and best practices.
---

# Java Multithreading & Concurrency (Part 1): Thread Basics

Multithreading is a **core concept in Java** and a **favorite interview topic**.  
Before diving into synchronization, executors, or concurrency utilities, we must understand the **fundamentals of threads**.  


## 1. What is a Thread?

- A **thread** is the smallest unit of execution in a process.  
- Each Java program starts with one **main thread** (the one running your `main()` method).  
- Additional threads can be created to perform tasks concurrently.

### 🧩 Why Use Threads?

- **Perform multiple tasks simultaneously** — e.g., UI responsiveness + background computation.  
- **Utilize multiple CPU cores** for performance (parallelism).  
- **Handle high I/O workloads** — e.g., web servers or file processing.

---

## 2. Thread Lifecycle

A thread in Java goes through several states, represented by the `Thread.State` enum:

| State | Description |
|--------|-------------|
| **NEW** | Thread object created but not started (`new Thread()`). |
| **RUNNABLE** | Thread is ready to run or running (depends on CPU scheduler). |
| **BLOCKED** | Waiting to acquire a monitor lock (synchronization). |
| **WAITING** | Waiting indefinitely for another thread’s action (e.g., `wait()`). |
| **TIMED_WAITING** | Waiting for a specified time (e.g., `sleep(1000)`, `join(5000)`). |
| **TERMINATED** | Thread has completed execution. |

**Simplified Diagram:**
```
 New → Runnable → Running → Terminated
          ↑        ↓
     Waiting / Timed Waiting / Blocked
```

---

## 3. Creating Threads

There are **three main ways** to create threads in Java.

---

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

🧠 **Under the Hood:**
- Calling `start()` tells the **JVM** to create a new OS-level thread and call the `run()` method *in that new thread*.
- If you call `run()` directly, it executes **in the same thread** (no new thread is created).

✅ Simple to use  
❌ Can’t extend another class (Java allows only single inheritance)

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

🧠 **Under the Hood:**
- `Runnable` represents a **task** that can be executed by a thread.
- The `Thread` object acts as a **worker**, while `Runnable` defines the **job**.

✅ Allows extending another class  
✅ Clean separation between *task* and *execution mechanism*  
❌ No return value or checked exception handling

💡 **Best Practice:**  
> Prefer `Runnable` over extending `Thread` for cleaner, reusable design.

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

🧠 **Under the Hood:**
- `Callable<V>` is like `Runnable`, but it can **return a result** and **throw checked exceptions**.
- When submitted to an `ExecutorService`, it returns a `Future<V>` — a placeholder for the result.
- Calling `future.get()` blocks until the computation completes.

✅ Supports return values & exceptions  
✅ Works seamlessly with the Executor Framework  
❌ Slightly more boilerplate; requires an executor setup  

💡 **Use Case Example:**
> Useful for background computations that need to return data — like fetching user info from multiple APIs simultaneously.

---

## 4. Thread Utility Methods (Must-Know)

| Method | Purpose | Notes |
|--------|----------|-------|
| `start()` | Start new thread; invokes `run()` in a separate thread. | Always use this, not `run()` directly. |
| `join()` | Wait for a thread to finish. | `t1.join()` blocks until t1 completes. |
| `sleep(ms)` | Pause thread temporarily. | Does **not** release locks. |
| `interrupt()` | Send interrupt signal to a thread. | Used for cooperative cancellation. |
| `isAlive()` | Check if thread is still running. | Returns false if terminated. |

```java
Thread t = new Thread(() -> {
    try {
        Thread.sleep(2000);
        System.out.println("Work done!");
    } catch (InterruptedException e) {
        System.out.println("Interrupted!");
    }
});

t.start();
t.interrupt(); // sends interrupt signal
```

---

## 5. Pros and Cons of Each Approach

| Approach | Pros ✅ | Cons ❌ |
|-----------|---------|---------|
| **Extending Thread** | Simple; minimal setup | Single inheritance limitation; less flexible |
| **Implementing Runnable** | Decouples logic from execution; reusable | No return values |
| **Using Callable/Future** | Return values + checked exceptions; integrates with Executors | Slightly more complex setup |

---

## 6. Interview Insights 🧠

- **Q:** What’s the difference between `start()` and `run()`?  
  **A:** `start()` creates a new thread; `run()` executes in the current one.

- **Q:** Which is preferred: `Runnable` or `Thread`?  
  **A:** Always prefer `Runnable` for flexibility and cleaner design.

- **Q:** When do you use `Callable`?  
  **A:** When you need a return value or to handle checked exceptions.

- **Q:** What is a `Future`?  
  **A:** A handle to a result that will be available in the future (from a `Callable`).

---

## 7. Modern Java Tip 💡

In modern Java (≥8), use **lambdas** and **ExecutorService** for clean, scalable threading:

```java
ExecutorService pool = Executors.newFixedThreadPool(4);
pool.submit(() -> System.out.println("Task running on " + Thread.currentThread().getName()));
pool.shutdown();
```

> The `Executor` framework (covered in Part 3) manages thread pools and reduces overhead of manual thread creation.

---

## Conclusion

Threads are the foundation of **Java concurrency**.  
Understanding what they are, their lifecycle, and how to create them is the **first step** toward mastering parallelism and performance tuning.

Next up in **Part 2: Synchronization & Thread Safety**, we’ll explore how threads safely share data and coordinate work.
