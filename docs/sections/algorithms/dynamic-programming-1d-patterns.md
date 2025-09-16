---
title: 1D Dynamic Programming
description: Master 1D dynamic programming in Java to solve problems efficiently with memoization and tabulation, with practical examples for better software engineering.
---

# 1D Dynamic Programming

## Overview
Dynamic programming (DP) transforms complex problems into manageable subproblems, making it a cornerstone of efficient algorithm design. In this ninth lesson of the *Official CTO* journey, we explore **1D dynamic programming**, focusing on memoization and tabulation techniques to solve problems like Fibonacci and House Robber. Whether optimizing resource allocation in a cloud system or maximizing profits in an e-commerce platform, these techniques sharpen your coding craft. By mastering 1D DP, you’ll write robust Java code and mentor others effectively.

Inspired by *Cracking the Coding Interview* and LeetCode, this 25-minute lesson covers the concepts, a practical Java example, and practice problems to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand **1D dynamic programming** and its applications.
- Learn **memoization** and **tabulation** for optimizing recursive solutions.
- Apply these techniques to optimize Java code for sequence-based problems.
- Solve real-world challenges with efficient algorithms.

## Why 1D Dynamic Programming Matters
Dynamic programming is a game-changer for problems with overlapping subproblems and optimal substructure. Early in my career, I optimized a resource allocation system in a cloud environment, using 1D DP to maximize efficiency without redundant computations. These techniques—memoization for caching, tabulation for iteration—are critical for scalable code. Explaining them clearly showcases your mentorship skills.

In software engineering, 1D DP helps you:
- **Optimize Performance**: Reduce time complexity (e.g., O(2^n) to O(n)).
- **Simplify Code**: Write clean, maintainable solutions.
- **Teach Effectively**: Break down complex problems for teams.

## Key Concepts
### 1. 1D Dynamic Programming
1D DP solves problems where solutions depend on a linear sequence of subproblems, stored in a 1D array or cache.

**Characteristics**:
- **Overlapping Subproblems**: Reuse solutions to avoid recomputation.
- **Optimal Substructure**: Solution built from optimal subproblem solutions.

**Use Cases**:
- Computing Fibonacci numbers.
- Maximizing profits in a sequence (e.g., House Robber).

### 2. Memoization
Memoization caches results of recursive calls to avoid redundant computations.

**How It Works**:
- Store subproblem results in a cache (e.g., HashMap or array).
- Check cache before computing.

**Time Complexity**: O(n) time, O(n) space (cache).

### 3. Tabulation
Tabulation uses iteration to build solutions bottom-up, filling a DP array.

**How It Works**:
- Initialize a DP array with base cases.
- Iterate to compute solutions for larger subproblems.

**Time Complexity**: O(n) time, O(n) space (can optimize to O(1) in some cases).

## Code Example: House Robber
Let’s apply 1D DP to a classic problem: *Given an array of integers representing house values, find the maximum amount you can rob without robbing adjacent houses.*

### Recursive Solution (No DP)
```java
public class Solution {
    public int rob(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        return robRecursive(nums, nums.length - 1);
    }
    
    private int robRecursive(int[] nums, int i) {
        if (i < 0) return 0;
        return Math.max(robRecursive(nums, i - 1), nums[i] + robRecursive(nums, i - 2));
    }
}
```
- **Big O**: O(2^n) time (exponential recursion), O(n) space (recursion stack).
- **Issue**: Inefficient for large arrays due to redundant computations.

### Memoized Solution
```java
public class Solution {
    public int rob(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        Integer[] memo = new Integer[nums.length];
        return robMemo(nums, nums.length - 1, memo);
    }
    
    private int robMemo(int[] nums, int i, Integer[] memo) {
        if (i < 0) return 0;
        if (memo[i] != null) return memo[i];
        memo[i] = Math.max(robMemo(nums, i - 1, memo), nums[i] + robMemo(nums, i - 2, memo));
        return memo[i];
    }
}
```
- **Big O**: O(n) time (each index computed once), O(n) space (memo array).
- **Technique**: Memoization caches results to avoid recomputation.

### Tabulated Solution (Optimized Space)
```java
public class Solution {
    public int rob(int[] nums) {
        if (nums == null || nums.length == 0) return 0;
        if (nums.length == 1) return nums[0];
        
        int prev2 = 0; // i-2
        int prev1 = nums[0]; // i-1
        
        for (int i = 1; i < nums.length; i++) {
            int current = Math.max(prev1, nums[i] + prev2);
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    }
}
```
- **Big O**: O(n) time (single pass), O(1) space (two variables).
- **Technique**: Tabulation uses iteration, optimizing space by tracking only two previous states.
- **Edge Cases**: Handles empty array, single house, two houses.

**Systematic Approach**:
- Clarified input (array of house values).
- Explored naive recursive solution (O(2^n)).
- Optimized with memoization (O(n) time, O(n) space) and tabulation (O(n) time, O(1) space).
- Tested edge cases (e.g., empty array, one house).

## Real-World Application
Imagine optimizing resource allocation in a cloud system, where you need to select non-adjacent resources to maximize capacity without conflicts. 1D DP, like the House Robber solution, ensures efficient selection in O(n) time, avoiding exponential recomputation. This technique—leveraging DP for optimization—improves system performance and demonstrates your ability to mentor teams on scalable solutions.

## Practice Problems
Apply 1D dynamic programming with these LeetCode problems:
- **Easy**: [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) (Fibonacci-like DP).
- **Medium**: [House Robber](https://leetcode.com/problems/house-robber/) (1D DP).
- **Medium**: [Min Cost Climbing Stairs](https://leetcode.com/problems/min-cost-climbing-stairs/) (1D DP).
- **Hard**: [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/) (1D DP).

Try solving one problem in Java, using the systematic approach: clarify, explore, analyze, code, and explain.

## Conclusion
1D dynamic programming is essential for writing efficient, scalable Java code for sequence-based problems. By mastering memoization and tabulation, you’ll optimize real-world systems, solve complex challenges, and teach others effectively. These skills are your next step in becoming a better software engineer.

**Next Step**: Explore [2D/Multi-DP Patterns](/sections/algorithms/dynamic-programming-2d-patterns) to dive into advanced DP algorithms, or check out [all sections](/sections/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>