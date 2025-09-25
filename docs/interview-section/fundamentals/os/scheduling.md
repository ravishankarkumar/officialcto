---
title: CPU Scheduling & Context Switching
description: Overview of CPU scheduling algorithms (FCFS, SJF, Priority, Round Robin) and how context switching works in operating systems.
---

# CPU Scheduling & Context Switching

Modern operating systems manage **multiple processes and threads** by scheduling CPU time fairly and efficiently.  
Two core concepts are:  
1. **CPU Scheduling** → deciding which process/thread gets the CPU next.  
2. **Context Switching** → saving and restoring process state when switching.  


## 1. CPU Scheduling

### Why Scheduling Matters?
- CPUs are much faster than I/O devices.  
- To keep the CPU **fully utilized**, the OS must schedule tasks smartly.  
- Good scheduling improves:  
  - **Fairness** (no task waits forever).  
  - **Responsiveness** (snappy interactive systems).  
  - **Throughput** (more work done per unit time).  
  - **CPU utilization** (avoid idle CPU).  

---

### Common CPU Scheduling Algorithms

#### 1. First-Come, First-Served (FCFS)
- Processes run in order of arrival (like a queue at a ticket counter).  
- **Data structure used**: FIFO **queue**.  
- Pros: Simple, predictable.  
- Cons: Can cause **convoy effect** (a long job delays all others).  

---

#### 2. Shortest Job First (SJF)
- Process with the smallest CPU burst time runs first.  
- **Data structure used**: usually a **priority queue/min-heap** keyed on burst time.  
- Pros: Optimal for **minimum average waiting time**.  
- Cons: Requires knowledge of CPU burst length (hard in practice).  
- Variants:  
  - **Preemptive SJF (Shortest Remaining Time First)** → allows interruption if a shorter job arrives.  
  - **Non-preemptive SJF** → once started, process runs till completion.  

---

#### 3. Priority Scheduling
- Each process has a **priority number** → highest priority runs first.  
- **Data structure used**: **priority queue** (often implemented as a heap).  
- Pros: Flexible, can prioritize critical tasks.  
- Cons: **Starvation** (low-priority processes may wait indefinitely).  
- Solution: **Aging** (gradually increase priority of waiting processes).  

---

#### 4. Round Robin (RR)
- Each process gets a fixed **time slice (quantum)**.  
- If unfinished, it’s placed at the **end of the ready queue**.  
- **Data structure used**: **circular queue** (or simple FIFO queue rotated).  
- Pros: Fair, great for time-sharing systems.  
- Cons: Performance depends heavily on quantum size:  
  - Too small → excessive context switching overhead.  
  - Too large → behaves like FCFS.  

---

#### 5. Multilevel Queue & Multilevel Feedback Queue (MLFQ)
- **Multilevel Queue**: Different queues for different classes of processes (e.g., system, interactive, batch).  
- **MLFQ**: Processes can move between queues based on runtime behavior (e.g., CPU-bound → lower priority, I/O-bound → higher priority).  
- Used in real-world OS schedulers (like Linux’s Completely Fair Scheduler, which builds on similar ideas).  


## 2. Context Switching

### What is Context Switching?
When the CPU switches from one process/thread to another, the OS must:  
1. Save the **state of the old process**.  
2. Load the **state of the new process**.  

This ensures that when the old process resumes, it continues exactly where it left off.  

---

### What is Saved During a Context Switch?
- **Program Counter (PC)** → address of next instruction.  
- **CPU registers** (general-purpose + special registers).  
- **Stack pointer** and **stack frames**.  
- **Memory management info** (page tables, base/limit registers).  
- **Accounting info** (CPU usage, priority, scheduling stats).  

---

### Overhead of Context Switching
- Consumes CPU cycles but does no “useful” work.  
- More processes/threads = more context switches = higher overhead.  
- **Trade-off**:  
  - Too few switches → bad responsiveness.  
  - Too many switches → wasted CPU time.  

Real-world optimization: Some OS kernels use **lazy context switching** (delay saving/restoring certain registers until needed).  


## 3. Interview Tips & Analogies

- **Round Robin vs Priority Scheduling** → RR ensures fairness; Priority ensures importance.  
- **Context Switching Overhead** → Always mention it in system design interviews for multi-threaded servers.  
- **Analogy**:  
  - **Scheduling** = teacher deciding which student answers next.  
  - **Context Switching** = current student leaves podium, next one sets up with their notes.  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
