---
title: Memory Management (Paging, Segmentation)
description: Introduction to memory management in operating systems, covering paging, segmentation, TLB, virtual memory, and common interview questions.
---

# Memory Management (Paging, Segmentation)

Memory management is a **core responsibility of the operating system (OS)**.  
It ensures efficient use of RAM, process isolation, and smooth execution of programs.  


## 1. Why Memory Management?

- Programs need memory to load code, store variables, and manage execution.  
- OS must:  
  - Allocate/deallocate memory fairly.  
  - Prevent one program from corrupting another’s memory.  
  - Handle cases when programs need more memory than available (virtual memory).  


## 2. Contiguous Memory Allocation

- Early OS → one program loaded at a time.  
- Later → multiprogramming (multiple programs in memory simultaneously).  
- Problem: **Fragmentation**  
  - **Internal fragmentation** → allocated block bigger than needed.  
  - **External fragmentation** → free spaces scattered, too small to use efficiently.  


## 3. Paging

Paging solves **external fragmentation** by breaking memory into **fixed-size blocks**.  

- **Frame** = fixed-size block in physical memory.  
- **Page** = fixed-size block in logical (virtual) memory.  
- OS uses a **page table** to map virtual pages → physical frames.  

**Advantages:**  
- Eliminates external fragmentation.  
- Easy to swap pages between RAM and disk.  

**Disadvantages:**  
- Page table overhead (large processes need big page tables).  
- Internal fragmentation (last page may not be fully used).  
- Page faults → costly disk access.  

**Example:**  
- Process needs 8KB, page size = 1KB → process divided into 8 pages.  


## 4. Translation Lookaside Buffer (TLB)

Accessing the **page table in main memory** for every memory reference would be very slow.  
To speed things up, modern CPUs use a **cache called the TLB (Translation Lookaside Buffer)**.  

### What is TLB?
- A small, fast hardware cache that stores **recently used page table entries**.  
- Located inside the **MMU (Memory Management Unit)**.  

### How it Works
1. CPU generates a **virtual address**.  
2. MMU first checks the **TLB**.  
   - If entry is found → **TLB hit** → fast translation to physical address.  
   - If not found → **TLB miss** → access page table in RAM (slower).  
3. The physical address is used to access memory.  

### TLB Characteristics
- Very small (typically 32–1024 entries).  
- Associative (entries searched in parallel).  
- Separate TLBs may exist for **instruction fetches** and **data accesses**.  

### Example
- Accessing memory without TLB: Each memory reference may require **two RAM accesses** (one for page table, one for actual data).  
- With TLB: On a hit, only **one RAM access** is needed.  

**TLB Miss Penalty:** The performance hit when TLB doesn’t contain the required entry.  



## 5. Segmentation

Segmentation divides memory into **variable-sized segments** based on program logic.  

- Each segment has a **segment number** and **offset**.  
- OS maintains a **segment table** storing base and limit of each segment.  

**Examples of segments:**  
- **Code segment** → instructions.  
- **Data segment** → global variables.  
- **Stack segment** → function calls and local variables.  

**Advantages:**  
- Matches program structure (compiler/programmer friendly).  
- Enables fine-grained protection (e.g., read-only code segment).  

**Disadvantages:**  
- External fragmentation.  
- Complex allocation and compaction.  


## 6. Paging vs Segmentation

| Aspect        | Paging                          | Segmentation                   |
|---------------|---------------------------------|--------------------------------|
| Block Size    | Fixed (e.g., 4KB pages)         | Variable (depends on program)  |
| Fragmentation | Internal (last page partly empty) | External (holes in memory)    |
| Mapping       | Virtual page → physical frame   | Segment → memory block         |
| Data Structure| Page table + TLB                | Segment table                  |
| Programmer    | Invisible (done by OS)          | Visible (logical structure)    |


## 7. Virtual Memory

Virtual memory allows programs to use **more memory than physically available** by extending RAM with disk storage.  

- Uses **demand paging**: only required pages are loaded into RAM.  
- If a page is missing, a **page fault** occurs → OS loads it from disk.  

**Page Replacement Algorithms** (when RAM is full):  
- **FIFO** → replace oldest page.  
- **LRU (Least Recently Used)** → replace least recently accessed page.  
- **Optimal** → replace page not needed for longest future duration (theoretical).  

**Thrashing:**  
- When too many page faults occur → CPU spends most time swapping pages instead of executing.  


## 8. Example: Address Translation (Paging)

Suppose:  
- Logical address = 16 bits.  
- Page size = 1 KB (2¹⁰).  
- → Lower 10 bits = **page offset**, upper 6 bits = **page number**.  
- If logical address = `0x1234`:  
  - Page number = `0x04` (upper 6 bits).  
  - Offset = `0x234` (lower 10 bits).  
- OS looks up page table entry for page 4 → finds corresponding frame → final physical address = frame base + offset.  

If the entry is in the **TLB**, translation is instant. Otherwise, a TLB miss requires consulting the page table in RAM.  


## 9. Interview Tips

Be prepared for:  
- **Page faults**: what happens when a page is not in RAM?  
- **Fragmentation**: difference between internal vs external.  
- **TLB**: role in speeding up paging, hit/miss penalties.  
- **Page replacement policies**: pros/cons of FIFO, LRU.  
- **Multi-level paging**: why needed (large address spaces → page table too big).  
- **Thrashing**: detection and prevention.  

**Analogies:**  
- Paging = slicing book into equal-sized pages, store anywhere.  
- Segmentation = storing entire chapters of variable length.  
- TLB = a **bookmark** that remembers recently used pages so you don’t have to scan the whole book each time.  



<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
