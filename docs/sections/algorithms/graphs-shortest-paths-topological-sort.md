---
title: Graphs - Shortest Paths and Topological Sort
description: Master Dijkstra’s algorithm for shortest paths and Kahn’s algorithm for topological sort in Java to solve graph problems efficiently, with practical examples for better software engineering.
---

# Graphs: Shortest Paths and Topological Sort

## Overview
Graphs are powerful data structures for modeling relationships, from social networks to logistics systems. In this seventh lesson of the *Official CTO* journey, we explore **Dijkstra’s algorithm** for finding shortest paths in weighted graphs and **Kahn’s algorithm** for topological sorting in directed acyclic graphs (DAGs). These techniques enable you to write efficient Java code, whether optimizing routes in a ride-sharing app or scheduling tasks in a build system. By mastering them, you’ll solve complex graph problems and mentor others effectively.

Inspired by *Cracking the Coding Interview* and LeetCode, this 25-minute lesson covers the concepts, practical Java examples, and practice problems to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand **Dijkstra’s algorithm** for shortest paths in weighted graphs.
- Learn **Kahn’s algorithm** for topological sorting in DAGs.
- Apply these techniques to optimize Java code for graph problems.
- Solve real-world challenges with efficient graph algorithms.

## Why Graphs Matter
Graphs are ubiquitous in software engineering, powering systems like recommendation engines, navigation apps, and dependency managers. Early in my career, I optimized a route-planning feature for a logistics platform, using shortest path algorithms to minimize delivery times. Similarly, topological sorting helped schedule tasks in a build system. These techniques—shortest paths for optimization, topological sort for ordering—are critical for scalable code. Explaining them clearly showcases your mentorship skills.

In software engineering, these techniques help you:
- **Optimize Performance**: Find shortest paths in O((V + E) log V) or sort dependencies in O(V + E).
- **Simplify Code**: Write clean, maintainable graph algorithms.
- **Teach Effectively**: Break down complex graph problems for teams.

## Key Concepts
### 1. Dijkstra’s Algorithm (Shortest Paths)
Dijkstra’s algorithm finds the shortest path from a source node to all nodes in a weighted graph (non-negative weights).

**How It Works**:
- Use a priority queue to select the node with the smallest current distance.
- Update distances to neighbors if a shorter path is found.
- Track visited nodes to avoid cycles.

**Use Cases**:
- Route optimization in a ride-sharing app.
- Network latency calculations in a cloud system.

**Time Complexity**: O((V + E) log V) with a priority queue, where V = vertices, E = edges.

### 2. Kahn’s Algorithm (Topological Sort)
Kahn’s algorithm performs a topological sort on a DAG, ordering nodes such that if there’s an edge from u to v, u comes before v.

**How It Works**:
- Compute in-degrees (number of incoming edges) for each node.
- Start with nodes having in-degree 0, add to queue.
- Process queue, removing edges and updating in-degrees.

**Use Cases**:
- Task scheduling in a build system (e.g., Maven dependencies).
- Course prerequisite ordering.

**Time Complexity**: O(V + E) time, O(V) space.

## Code Example: Dijkstra’s Algorithm and Topological Sort
Let’s apply these techniques to two problems: *Find shortest paths from a source node* and *Topological sort of a DAG*.

### Dijkstra’s Algorithm
Given a weighted graph (adjacency list), find shortest distances from a source node.

```java
import java.util.*;

public class Solution {
    public int[] dijkstra(int vertices, List<List<int[]>> adjList, int source) {
        int[] distances = new int[vertices];
        Arrays.fill(distances, Integer.MAX_VALUE);
        distances[source] = 0;
        
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]); // [node, distance]
        pq.offer(new int[] {source, 0});
        
        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int node = curr[0];
            int dist = curr[1];
            
            if (dist > distances[node]) continue; // Skip outdated entries
            
            for (int[] neighbor : adjList.get(node)) {
                int nextNode = neighbor[0];
                int weight = neighbor[1];
                if (dist + weight < distances[nextNode]) {
                    distances[nextNode] = dist + weight;
                    pq.offer(new int[] {nextNode, distances[nextNode]});
                }
            }
        }
        
        return distances;
    }
}
```
- **Big O**: O((V + E) log V) time (priority queue operations), O(V) space (queue, distances).
- **Technique**: Dijkstra’s algorithm with a priority queue for shortest paths.
- **Edge Cases**: Handles disconnected nodes, single node, unreachable nodes.

### Topological Sort (Kahn’s Algorithm)
Given a DAG (adjacency list), return a topological order.

```java
import java.util.*;

public class Solution {
    public List<Integer> topologicalSort(int vertices, List<List<Integer>> adjList) {
        List<Integer> result = new ArrayList<>();
        int[] inDegree = new int[vertices];
        Queue<Integer> queue = new LinkedList<>();
        
        // Calculate in-degrees
        for (int node = 0; node < vertices; node++) {
            for (int neighbor : adjList.get(node)) {
                inDegree[neighbor]++;
            }
        }
        
        // Add nodes with in-degree 0
        for (int i = 0; i < vertices; i++) {
            if (inDegree[i] == 0) {
                queue.offer(i);
            }
        }
        
        // Process queue
        while (!queue.isEmpty()) {
            int node = queue.poll();
            result.add(node);
            
            for (int neighbor : adjList.get(node)) {
                if (--inDegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }
        
        return result.size() == vertices ? result : new ArrayList<>(); // Check for cycle
    }
}
```
- **Big O**: O(V + E) time (process all nodes and edges), O(V) space (queue, in-degree array).
- **Technique**: Kahn’s algorithm using a queue for topological sort.
- **Edge Cases**: Handles cycles (returns empty list), empty graph, single node.

**Systematic Approach**:
- Clarified inputs (graph as adjacency list, source for Dijkstra).
- Explored naive solutions (e.g., O(V²) for shortest paths, DFS for topological sort).
- Optimized with Dijkstra’s priority queue and Kahn’s in-degree approach.
- Tested edge cases (e.g., disconnected graphs, cycles).

## Real-World Application
Imagine optimizing routes in a ride-sharing app, where Dijkstra’s algorithm finds the shortest path between locations, minimizing travel time. Similarly, topological sorting schedules tasks in a build system, ensuring dependencies are resolved correctly. These techniques—shortest paths for optimization, topological sort for ordering—improve system efficiency and demonstrate your ability to mentor teams on robust solutions.

## Practice Problems
Apply shortest paths and topological sort with these LeetCode problems:
- **Medium**: [Network Delay Time](https://leetcode.com/problems/network-delay-time/) (Dijkstra’s algorithm).
- **Medium**: [Course Schedule II](https://leetcode.com/problems/course-schedule-ii/) (topological sort).
- **Hard**: [Minimum Cost to Connect All Points](https://leetcode.com/problems/min-cost-to-connect-all-points/) (Prim’s, similar to Dijkstra).
- **Hard**: [Alien Dictionary](https://leetcode.com/problems/alien-dictionary/) (topological sort).

Try solving one problem in Java, using the systematic approach: clarify, explore, analyze, code, and explain.

## Conclusion
Dijkstra’s algorithm and topological sort are essential for writing efficient, scalable Java code for graph problems. By mastering these techniques, you’ll optimize real-world systems, solve complex challenges, and teach others effectively. These skills are your next step in becoming a better software engineer.

**Next Step**: Explore [Heaps: Priority Queue Patterns](/sections/algorithms/heaps-priority-queues) to dive into heap algorithms, or check out [all sections](/sections/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>