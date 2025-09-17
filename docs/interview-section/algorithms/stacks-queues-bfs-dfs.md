---
title: Stacks and Queues - BFS/DFS
description: Master stacks, queues, monotonic stacks, and BFS/DFS algorithms in Java to solve problems efficiently, with practical examples for better software engineering.
---

# Stacks and Queues: BFS/DFS

## Overview
Stacks and queues are foundational data structures that power efficient algorithms, while BFS (Breadth-First Search) and DFS (Depth-First Search) unlock solutions for graph and tree problems. In this fifth lesson of the *Official CTO* journey, we explore **stacks, queues, monotonic stacks, and BFS/DFS**, essential techniques for solving problems with elegance. Whether finding the next greater element in a job scheduler or traversing a social network graph, these tools sharpen your coding craft. By mastering them, you’ll write robust Java code and mentor others effectively.

Inspired by *Cracking the Coding Interview* and LeetCode, this 20-minute lesson covers the concepts, practical Java examples, and practice problems to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand **stacks** (LIFO) and **queues** (FIFO) and their applications.
- Learn **monotonic stacks** for problems like Next Greater Element.
- Master **BFS** and **DFS** for graph and tree traversals.
- Apply these techniques to optimize Java code for real-world challenges.

## Why Stacks, Queues, and BFS/DFS Matter
As a senior engineer, I’ve used stacks and queues to optimize processing pipelines and BFS/DFS to navigate complex data relationships. For example, I once optimized a job scheduler by using a monotonic stack to prioritize tasks, and traversed a social network graph to recommend connections using BFS. These techniques—stacks for tracking, queues for ordering, and BFS/DFS for exploration—are critical for scalable code. Explaining them clearly showcases your mentorship skills.

In software engineering, these techniques help you:
- **Optimize Performance**: Reduce time complexity (e.g., O(n) for monotonic stacks).
- **Simplify Code**: Write clean, maintainable solutions.
- **Teach Effectively**: Break down complex traversals for teams.

## Key Concepts
### 1. Stacks
Stacks follow Last-In-First-Out (LIFO), where the last element added is the first removed. Operations: `push`, `pop`, `peek`.

**Use Cases**:
- Undo functionality in a text editor.
- Monotonic stacks for finding next greater/previous smaller elements.

**Time Complexity**: O(1) for push/pop/peek.

### 2. Queues
Queues follow First-In-First-Out (FIFO), where the first element added is the first removed. Operations: `enqueue`, `dequeue`, `peek`.

**Use Cases**:
- Task scheduling in a job queue.
- Level-order traversal in trees (used in BFS).

**Time Complexity**: O(1) for enqueue/dequeue/peek.

### 3. Monotonic Stacks
A monotonic stack maintains elements in increasing or decreasing order, popping when the order is violated.

**Use Case**: Finding the next greater element in an array.

**Time Complexity**: O(n) time (single pass), O(n) space.

### 4. BFS and DFS
- **BFS**: Explores nodes level by level using a queue, ideal for shortest paths.
- **DFS**: Explores nodes deeply using a stack (explicit or recursive), ideal for connectivity or cycles.

**Use Cases**:
- BFS: Shortest path in a social network graph.
- DFS: Detecting cycles in a dependency graph.

**Time Complexity**: O(V + E) for both (V = vertices, E = edges), space O(V) for queue/stack.

## Code Example: Next Greater Element and BFS
Let’s apply these techniques to two problems: *Next Greater Element* (using a monotonic stack) and *Graph Traversal* (using BFS).

### Next Greater Element (Monotonic Stack)
Given an array, find the next greater element for each element (or -1 if none exists).

```java
import java.util.Stack;

public class Solution {
    public int[] nextGreaterElement(int[] nums) {
        int[] result = new int[nums.length];
        Stack<Integer> stack = new Stack<>();
        
        for (int i = 0; i < nums.length; i++) {
            // Pop elements while current is greater, assign next greater
            while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {
                result[stack.pop()] = nums[i];
            }
            stack.push(i);
        }
        
        // Remaining elements have no greater element
        while (!stack.isEmpty()) {
            result[stack.pop()] = -1;
        }
        
        return result;
    }
}
```
- **Big O**: O(n) time (single pass), O(n) space (stack).
- **Technique**: Monotonic stack (decreasing order), popping when a larger element is found.
- **Edge Cases**: Handles empty array, all equal elements.

### Graph Traversal (BFS)
Given a graph (adjacency list), perform BFS to visit all nodes.

```java
import java.util.*;

public class Solution {
    public List<Integer> bfs(int vertices, List<List<Integer>> adjList) {
        List<Integer> result = new ArrayList<>();
        boolean[] visited = new boolean[vertices];
        Queue<Integer> queue = new LinkedList<>();
        
        // Start BFS from vertex 0 (arbitrary)
        queue.offer(0);
        visited[0] = true;
        
        while (!queue.isEmpty()) {
            int vertex = queue.poll();
            result.add(vertex);
            
            // Visit neighbors
            for (int neighbor : adjList.get(vertex)) {
                if (!visited[neighbor]) {
                    queue.offer(neighbor);
                    visited[neighbor] = true;
                }
            }
        }
        
        return result;
    }
}
```
- **Big O**: O(V + E) time (visit all vertices and edges), O(V) space (queue, visited array).
- **Technique**: BFS using a queue to explore nodes level by level.
- **Edge Cases**: Handles disconnected graphs, empty graph.

**Systematic Approach**:
- Clarified inputs (array for NGE, graph for BFS).
- Explored naive solutions (e.g., O(n²) for NGE, recursive DFS).
- Optimized with monotonic stack and BFS.
- Tested edge cases (e.g., empty inputs, single node).

## Real-World Application
Imagine building a recommendation system for a social network where you need to traverse a user connection graph to suggest friends (BFS) or prioritize tasks in a job scheduler using a monotonic stack (Next Greater Element). These techniques—stacks for tracking, queues for ordering, BFS for exploration—improve system efficiency and demonstrate your ability to mentor teams on robust solutions.

## Practice Problems
Apply stacks, queues, and BFS/DFS with these LeetCode problems:
- **Easy**: [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) (stack).
- **Medium**: [Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/) (monotonic stack).
- **Medium**: [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/) (BFS).
- **Hard**: [Number of Islands](https://leetcode.com/problems/number-of-islands/) (DFS/BFS).

Try solving one problem in Java, using the systematic approach: clarify, explore, analyze, code, and explain.

## Conclusion
Stacks, queues, and BFS/DFS are essential for writing efficient, scalable Java code. By mastering these techniques, you’ll solve complex problems faster, improve real-world systems, and teach others effectively. These skills are your next step in becoming a better software engineer.

**Next Step**: Explore [Trees: Traversals and Balancing](/interview-section/algorithms/binary-trees-traversals-balancing) to dive into tree algorithms, or check out [all sections](/interview-section/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>