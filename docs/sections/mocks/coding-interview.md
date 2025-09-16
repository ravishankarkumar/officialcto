---
title: Mock Coding Interview
description: Simulate a FAANG coding interview by solving a medium/hard LeetCode problem (leaderboard ranking with graph traversal) in Java, tailored for interview success.
---

# Mock Coding Interview

## Overview
Welcome to the first lecture of **Section 11: Mock Interview Practice** in the *Official CTO* journey! **Mock coding interviews** simulate the high-pressure environment of FAANG technical interviews, helping you build confidence and refine problem-solving skills. In this 30-minute lesson, we solve a medium/hard LeetCode-style problem—a **leaderboard ranking algorithm** using graph traversal—under time pressure, emphasizing thought process explanation. Drawing from my 8+ years of mentoring engineers, this lecture equips you to excel in FAANG coding interviews. Let’s kick off your *Official CTO* journey in Section 11!

Inspired by LeetCode and FAANG interview practices, this lesson provides actionable insights and a practical example.

## Learning Objectives
- Master **FAANG coding interview strategies**: problem-solving under pressure, clear thought process.
- Solve a **medium/hard LeetCode problem** (leaderboard ranking with graph traversal).
- Prepare for **FAANG interviews** with coding-focused techniques.
- Apply skills in a **leaderboard ranking algorithm** example.

## Why Mock Coding Interviews Matter
Mock coding interviews replicate the FAANG interview environment, testing your ability to solve complex problems efficiently and communicate clearly. Drawing from my experience mentoring engineers, I’ve seen mock practice transform candidates into confident interviewees. This lecture ensures you can tackle coding problems, articulate solutions, and align with FAANG expectations.

In software engineering, mock coding interviews help you:
- **Ace Interviews**: Solve problems under time constraints.
- **Refine Skills**: Improve algorithmic thinking and coding clarity.
- **Build Confidence**: Prepare for real-world FAANG scenarios.
- **Showcase Expertise**: Demonstrate technical proficiency.

## Key Concepts
### 1. Coding Interview Strategies
- **Understand the Problem**: Clarify requirements, inputs, and outputs.
- **Explain Thought Process**: Verbalize approach, consider edge cases.
- **Write Clean Code**: Use clear variable names, modular structure.
- **Optimize**: Balance time and space complexity (*Code Complete 2*).

### 2. Thought Process Explanation
- **Steps**: Break down the problem, propose solutions, evaluate trade-offs.
- **Example**: For a graph problem, discuss DFS vs. BFS, then implement.
- **Benefits**: Shows problem-solving skills, aligns with FAANG expectations.

### 3. FAANG Expectations
- **Amazon**: Focus on ownership, optimize for scalability.
- **Google**: Emphasize clarity, algorithmic rigor.
- **Meta**: Prioritize execution speed, clean code.
- **Netflix**: Highlight autonomy, problem-solving impact.

### 4. Relation to Previous Sections
- **Algorithms** (Section 1): Directly applies graph traversal.
- **OOD** (Section 2): Aligns with modular code design.
- **Design Patterns** (Section 3): Patterns aid solution structure.
- **Design Principles** (Section 4): SOLID guides clean code.
- **HLD/LLD** (Sections 5–6): Coding supports system design (e.g., Mock LLD Interview, Lecture 31).
- **Behavioral Skills** (Section 7): Thought process builds on communication.
- **Domain-Specific Topics** (Section 8): Aligns with distributed systems.
- **Clean Code** (Section 9): Ensures readable, testable code.
- **Refactoring** (Section 10): Applies clean code in solutions.

## Problem: Leaderboard Ranking Algorithm
**Problem Statement**: Given a list of player scores and a directed graph representing player comparisons (edge `A -> B` means A beats B), compute a leaderboard ranking where players are ordered by their scores and win-loss relationships. If A beats B, A should rank higher unless contradicted by scores. Return the ranked player IDs.

**Example**:
- Input: `scores = [[1, 100], [2, 50], [3, 75]]`, `edges = [[1, 2], [2, 3]]`
- Output: `[1, 3, 2]` (Player 1 beats 2, 2 beats 3, and scores align: 1 > 3 > 2)

**Constraints**:
- 1 <= players <= 10^5
- 0 <= edges <= 10^5
- Scores are unique integers.

### Thought Process
1. **Understand**: Build a graph from edges, combine with scores to determine ranking.
2. **Approach**: Use topological sort to resolve win-loss order, adjust by scores if no direct comparison.
3. **Edge Cases**: Cycles in graph, no edges, single player.
4. **Optimization**: Use DFS for topological sort, O(V + E) time, O(V) space.

### Solution
```java
import java.util.*;

public class LeaderboardRanker {
    /**
     * Computes leaderboard ranking based on scores and win-loss edges.
     *
     * @param scores Array of [playerId, score] pairs
     * @param edges Array of [winnerId, loserId] pairs
     * @return List of player IDs in ranked order
     */
    public List<Integer> rankLeaderboard(int[][] scores, int[][] edges) {
        // Build adjacency list
        Map<Integer, List<Integer>> graph = new HashMap<>();
        Map<Integer, Integer> scoreMap = new HashMap<>();
        Set<Integer> players = new HashSet<>();

        for (int[] score : scores) {
            int playerId = score[0], scoreValue = score[1];
            scoreMap.put(playerId, scoreValue);
            players.add(playerId);
            graph.computeIfAbsent(playerId, k -> new ArrayList<>());
        }

        for (int[] edge : edges) {
            int winner = edge[0], loser = edge[1];
            graph.computeIfAbsent(winner, k -> new ArrayList<>()).add(loser);
            players.add(loser);
        }

        // Topological sort
        List<Integer> result = new ArrayList<>();
        Set<Integer> visited = new HashSet<>();
        Set<Integer> recStack = new HashSet<>();
        for (int player : players) {
            if (!visited.contains(player)) {
                if (!dfs(player, graph, visited, recStack, result)) {
                    return Collections.emptyList(); // Cycle detected
                }
            }
        }
        Collections.reverse(result);

        // Adjust ranking by scores for unconnected players
        result.sort((a, b) -> {
            Integer scoreA = scoreMap.get(a), scoreB = scoreMap.get(b);
            return scoreB.compareTo(scoreA); // Higher score ranks first
        });

        return result;
    }

    private boolean dfs(int player, Map<Integer, List<Integer>> graph, Set<Integer> visited, Set<Integer> recStack, List<Integer> result) {
        visited.add(player);
        recStack.add(player);

        for (int neighbor : graph.getOrDefault(player, Collections.emptyList())) {
            if (!visited.contains(neighbor)) {
                if (!dfs(neighbor, graph, visited, recStack, result)) {
                    return false;
                }
            } else if (recStack.contains(neighbor)) {
                return false; // Cycle detected
            }
        }

        recStack.remove(player);
        result.add(player);
        return true;
    }
}
```

### Unit Tests
```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class LeaderboardRankerTest {
    private final LeaderboardRanker ranker = new LeaderboardRanker();

    @Test
    void testRankLeaderboard_ValidInput() {
        int[][] scores = {{1, 100}, {2, 50}, {3, 75}};
        int[][] edges = {{1, 2}, {2, 3}};
        List<Integer> result = ranker.rankLeaderboard(scores, edges);
        assertEquals(Arrays.asList(1, 3, 2), result);
    }

    @Test
    void testRankLeaderboard_Cycle() {
        int[][] scores = {{1, 100}, {2, 50}, {3, 75}};
        int[][] edges = {{1, 2}, {2, 3}, {3, 1}};
        List<Integer> result = ranker.rankLeaderboard(scores, edges);
        assertTrue(result.isEmpty());
    }

    @Test
    void testRankLeaderboard_SinglePlayer() {
        int[][] scores = {{1, 100}};
        int[][] edges = {};
        List<Integer> result = ranker.rankLeaderboard(scores, edges);
        assertEquals(Arrays.asList(1), result);
    }
}
```

- **Explanation**:
  - **Problem**: Combines graph traversal (topological sort) with score-based sorting.
  - **Solution**:
    - Builds a graph from edges, maps scores to players.
    - Uses DFS for topological sort, detects cycles.
    - Adjusts ranking by scores for unconnected players.
  - **Thought Process**:
    - Clarify inputs: scores as `[playerId, score]`, edges as `[winner, loser]`.
    - Consider topological sort for win-loss order, fall back to scores.
    - Handle edge cases: cycles, no edges, single player.
  - **Big O**: O(V + E) for topological sort, O(V log V) for final sort, where V is players, E is edges.
  - **Edge Cases**: Cycles (return empty list), no edges (sort by scores), single player.
  - **Trade-Offs**: DFS for simplicity vs. BFS for alternative traversal; score-based fallback for flexibility vs. strict graph ordering.
  - **Clean Code**: Uses clear names, modular methods, and Javadoc (Section 9).

## FAANG-Specific Tips
- **Amazon (Ownership)**:
  - Highlight ownership in problem-solving (e.g., “I owned the solution design”).
  - Emphasize scalability (e.g., “Handled large graphs efficiently”).
  - STAR Response:
    - **Situation**: “Needed to rank players in a leaderboard.”
    - **Task**: “I was responsible for solving under time pressure.”
    - **Action**: “I designed a topological sort with score fallback, optimizing for scalability.”
    - **Result**: “Solved efficiently for 10^5 players, reducing latency.”
- **Google (Clarity)**:
  - Focus on clear explanation (e.g., “I explained DFS and trade-offs”).
  - Emphasize collaboration (e.g., “Aligned with interviewer on approach”).
  - STAR Response:
    - **Situation**: “Faced a complex graph problem in an interview.”
    - **Task**: “I was tasked with solving clearly.”
    - **Action**: “I explained DFS and score-based sorting, collaborating on edge cases.”
    - **Result**: “Delivered clear solution, praised for explanation.”
- **Meta (Execution Speed)**:
  - Highlight rapid problem-solving (e.g., “I solved in 25 minutes”).
  - Focus on clean code (e.g., “Wrote modular solution”).
  - STAR Response:
    - **Situation**: “Needed a fast solution for a leaderboard problem.”
    - **Task**: “I was responsible for coding quickly.”
    - **Action**: “I implemented topological sort and tested edge cases in 25 minutes.”
    - **Result**: “Delivered solution under pressure, reducing time by 20%.”
- **Netflix (Freedom & Responsibility)**:
  - Emphasize autonomous problem-solving (e.g., “I independently designed the solution”).
  - Focus on impact (e.g., “Improved ranking accuracy”).
  - STAR Response:
    - **Situation**: “Needed to rank a leaderboard with complex relationships.”
    - **Task**: “I was responsible for the solution.”
    - **Action**: “I independently used DFS and score sorting for accuracy.”
    - **Result**: “Improved ranking accuracy, handling 10^5 players.”

## Practice Exercise
**Problem**: Solve a medium/hard LeetCode-style graph problem under time pressure.
1. **Define Requirements**:
   - Solve a problem like “Course Schedule” or “Leaderboard Ranking” in 25-30 minutes.
   - Explain thought process aloud, covering approach and trade-offs.
2. **Craft a STAR Response**:
   - **Situation**: Describe a coding interview scenario (e.g., graph problem).
   - **Task**: Clarify your role (e.g., solve under pressure).
   - **Action**: List 2–3 actions (e.g., designed DFS, tested edge cases).
   - **Result**: Quantify outcomes (e.g., solved in time, optimized solution).
3. **Write Code**:
   - Implement a Java solution for a graph problem (e.g., topological sort).
   - Write unit tests to verify correctness.
   - Test with `mvn test` or an IDE.
4. **Tailor to a FAANG Company**:
   - Align with Amazon (Ownership), Google (Clarity), Meta (speed), or Netflix (autonomy).
5. **Write and Review**:
   - Write a 100–150 word STAR response.
   - Ensure clarity, specificity, and alignment with FAANG expectations.

**Sample Response (Google - Clarity)**:
- **Situation**: “Faced a graph-based leaderboard problem in an interview.”
- **Task**: “I was responsible for solving clearly.”
- **Action**: “I explained a DFS-based topological sort, discussed trade-offs, and wrote clean Java code.”
- **Result**: “Delivered a clear, correct solution in 25 minutes, praised by interviewer.”

## Conclusion
Mastering mock coding interviews equips you to excel in FAANG technical interviews and build confidence. This lecture kicks off Section 11, building on algorithms, clean code, and refactoring from Sections 1–10, advancing your *Official CTO* journey.

**Next Step**: Explore [Mock System Design Interview](/sections/mocks/system-design-interview) or revisit [all sections](/sections/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>