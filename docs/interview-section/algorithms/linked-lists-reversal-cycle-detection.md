---
title: Linked Lists - Reversal and Cycle Detection
description: Master linked list reversal and cycle detection techniques in Java to solve problems efficiently, with practical examples for better software engineering.
---

# Linked Lists: Reversal and Cycle Detection

## Overview
Linked lists are a fundamental data structure in software engineering, enabling dynamic data storage and manipulation. In this fourth lesson of the *Official CTO* journey, we explore **linked list reversal and cycle detection**, essential techniques for solving problems efficiently. Whether reversing a playlist in a music app or detecting loops in a messaging system, these algorithms sharpen your coding craft. By mastering them, you’ll write robust Java code and mentor others effectively.

Inspired by *Cracking the Coding Interview* and LeetCode, this 15-minute lesson covers the concepts, practical Java examples, and practice problems to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand **linked list reversal** (iterative and recursive) for reordering data.
- Learn **cycle detection** using Floyd’s tortoise-hare algorithm.
- Apply these techniques to optimize Java code for linked list problems.
- Solve real-world challenges with efficient algorithms.

## Why Linked Lists Matter
Linked lists are versatile, used in systems where data is dynamically linked, like navigation menus or transaction logs. Early in my career, I debugged a messaging system where a loop in the data flow caused crashes. Using cycle detection, I identified the issue, and reversing lists helped reorder data efficiently. These techniques—reversal for reordering, cycle detection for debugging—are critical for scalable code. Explaining them clearly showcases your mentorship skills.

In software engineering, these techniques help you:
- **Optimize Performance**: Reverse lists in O(n) time, detect cycles efficiently.
- **Simplify Code**: Write clean, maintainable solutions.
- **Teach Effectively**: Break down complex problems for teams.

## Key Concepts
### 1. Linked List Reversal
Reversing a linked list reorders its nodes (e.g., 1→2→3 becomes 3→2→1). Two approaches:
- **Iterative**: Use pointers to swap node links in a single pass.
- **Recursive**: Recursively reverse the tail, then adjust the head.

**Use Cases**:
- Reordering a playlist in a music app.
- Reversing a transaction log for audit trails.

**Time Complexity**: O(n) time, O(1) space (iterative) or O(n) space (recursive).

### 2. Cycle Detection
Cycle detection identifies loops in a linked list (e.g., a node pointing back). Floyd’s tortoise-hare algorithm uses two pointers moving at different speeds to detect cycles.

**How It Works**:
- **Tortoise**: Moves one step.
- **Hare**: Moves two steps.
- If they meet, a cycle exists.

**Use Cases**:
- Detecting loops in a messaging system’s data flow.
- Validating graph structures for cyclic dependencies.

**Time Complexity**: O(n) time, O(1) space.

## Code Example: Reversal and Cycle Detection
Let’s apply these techniques to two classic problems: *Reverse a linked list* and *Detect a cycle in a linked list*.

### Define ListNode
```java
public class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}
```

### Reverse Linked List (Iterative)
```java
public class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode current = head;
        
        while (current != null) {
            ListNode next = current.next; // Save next node
            current.next = prev;         // Reverse link
            prev = current;              // Move prev forward
            current = next;              // Move current forward
        }
        
        return prev; // New head
    }
}
```
- **Big O**: O(n) time (single pass), O(1) space (no extra memory).
- **Technique**: Iterative reversal using three pointers (`prev`, `current`, `next`).
- **Edge Cases**: Handles empty list (`head = null`) and single node.

### Detect Cycle (Floyd’s Tortoise-Hare)
```java
public class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) {
            return false;
        }
        
        ListNode slow = head; // Tortoise
        ListNode fast = head; // Hare
        
        while (fast != null && fast.next != null) {
            slow = slow.next;         // Move one step
            fast = fast.next.next;    // Move two steps
            if (slow == fast) {
                return true; // Cycle detected
            }
        }
        
        return false; // No cycle
    }
}
```
- **Big O**: O(n) time (single pass until meeting or end), O(1) space (two pointers).
- **Technique**: Floyd’s algorithm detects cycles by converging pointers.
- **Edge Cases**: Handles empty list, single node, and no cycle.

**Systematic Approach**:
- Clarified inputs (linked list head).
- Explored naive solutions (e.g., HashSet for cycle detection, O(n) space).
- Optimized with iterative reversal and Floyd’s algorithm.
- Tested edge cases (e.g., null, single node, cycle at head).

## Real-World Application
Imagine debugging a messaging system where data packets form a linked list, but a loop causes infinite processing. Floyd’s tortoise-hare algorithm detects the cycle, allowing you to fix the issue. Similarly, reversing a linked list can reorder a playlist in a music app for user-friendly navigation. These techniques—reversal for data manipulation, cycle detection for debugging—improve system reliability and demonstrate your ability to mentor teams on robust solutions.

## Practice Problems
Apply linked list reversal and cycle detection with these LeetCode problems:
- **Easy**: [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/) (iterative reversal).
- **Medium**: [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/) (Floyd’s algorithm).
- **Medium**: [Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/) (partial reversal).
- **Hard**: [Merge K Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/) (reversal in merging).

Try solving one problem in Java, using the systematic approach: clarify, explore, analyze, code, and explain.

## Conclusion
Linked list reversal and cycle detection are essential for writing efficient, reliable Java code. By mastering these techniques, you’ll solve linked list problems faster, improve real-world systems, and teach others effectively. These skills are your next step in becoming a better software engineer.

**Next Step**: Explore [Stacks and Queues: Monotonic Stacks and BFS/DFS](/interview-section/algorithms/stacks-queues-bfs-dfs) to dive into stack and queue patterns, or check out [all sections](/interview-section/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>