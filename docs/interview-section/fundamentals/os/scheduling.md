---
title: CPU Scheduling & Context Switching
description: Overview of CPU scheduling algorithms (FCFS, SJF, Priority, Round Robin) and how context switching works in operating systems.
---

# CPU Scheduling & Context Switching

Modern operating systems manage **multiple processes and threads** by scheduling CPU time fairly and efficiently.  
Two core concepts are:  
1. **CPU Scheduling** → deciding which process/thread gets the CPU next.  
2. **Context Switching** → saving and restoring process state when switching.  

---

## 1. CPU Scheduling

### Why Scheduling Matters?
- CPUs are much faster than I/O devices.  
- To keep CPU **fully utilized**, OS schedules tasks smartly.  
- Ensures fairness, responsiveness, and throughput.  

### Common CPU Scheduling Algorithms

#### 1. First-Come, First-Served (FCFS)
- Processes run in order of arrival.  
- Simple, but can cause **convoy effect** (long job delays others).  

#### 2. Shortest Job First (SJF)
- Process with smallest burst time runs first.  
- Optimal for average wait time, but requires knowledge of job length.  

#### 3. Priority Scheduling
- Processes assigned priorities → highest priority runs first.  
- Can cause **starvation** (low-priority tasks wait forever).  
- Solution: **aging** (gradually increase waiting process priority).  

#### 4. Round Robin (RR)
- Each process gets a fixed **time slice (quantum)**.  
- If unfinished, it goes back to queue.  
- Fair, widely used in time-sharing systems.  

#### 5. Multilevel Queue / Feedback Queue
- Different queues for different priorities (foreground, background).  
- Feedback queue allows processes to move between queues based on behavior.  

---

## 2. Context Switching

### What is Context Switching?
- When CPU switches from one process/thread to another, OS must save the **state of the old process** and load the **state of the new process**.  

### What is Saved?
- Program counter (next instruction).  
- CPU registers.  
- Stack pointer.  
- Memory management info.  

### Overhead of Context Switching
- Consumes CPU cycles (no useful work during switch).  
- More threads/processes = more context switches = overhead.  
- Trade-off: responsiveness vs performance.  

---

## 3. Interview Tips

- Be ready to compare **Round Robin vs Priority Scheduling**.  
- For system design → mention context switching overhead in **multi-threaded servers**.  
- Analogy:  
  - **Scheduling** = deciding which student answers next in class.  
  - **Context switching** = current student leaving podium, next one setting up.  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
