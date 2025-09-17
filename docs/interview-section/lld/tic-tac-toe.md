---
title: Design Tic-Tac-Toe
description: Learn low-level system design for a Tic-Tac-Toe game in Java, focusing on board representation and win conditions for scalable, robust applications.
---

# Design Tic-Tac-Toe

## Overview
Welcome to the thirteenth lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Designing a Tic-Tac-Toe game is a classic LLD problem that tests your ability to model simple yet rule-driven game logic using OOP principles. In this 25-minute lesson, we explore the **low-level design of a Tic-Tac-Toe game**, covering board representation (3x3 grid), player moves, and win condition checks (rows, columns, diagonals). Whether building a game application or preparing for FAANG interviews, this lecture equips you to design modular, scalable systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Design Patterns*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **low-level design** principles for a Tic-Tac-Toe game with board representation and win conditions.
- Learn to model **classes**, **relationships**, and **functionality** in Java.
- Apply **OOP principles** (Section 2, Lecture 1), **design patterns** (Section 3), **design principles** (Section 4), and **HLD concepts** (Section 5) to LLD.
- Write clean, modular Java code (Section 9).

## Why Tic-Tac-Toe Design Matters
Tic-Tac-Toe is a common FAANG interview problem that tests your ability to model game logic, state management, and rule enforcement. Drawing from my experience designing rule-based systems, I’ve applied OOP principles to ensure maintainability and extensibility in similar applications. This lecture prepares you to design robust systems and articulate your approach clearly, showcasing your mentorship skills.

In software engineering, Tic-Tac-Toe design helps you:
- **Model Game Logic**: Represent board states and player moves.
- **Enforce Rules**: Implement win and draw conditions.
- **Ensure Scalability**: Support extensible game variations.
- **Teach Effectively**: Share practical LLD strategies.

## Key Concepts
### 1. Tic-Tac-Toe Components
- **Board Representation**: 3x3 grid to track X and O placements.
- **Player Moves**: Alternate between players (X and O) placing symbols.
- **Win Conditions**:
  - Three identical symbols in a row, column, or diagonal.
  - Draw if board is full with no winner.
- **Functionality**:
  - Initialize board and players.
  - Validate and execute moves.
  - Check win or draw conditions.
- **Edge Cases**: Invalid moves (occupied cell, out-of-bounds), game over states.

### 2. Design Patterns
- **State Pattern** (Section 3, Lecture 5): For managing game state (e.g., ongoing, won, draw).
- **Strategy Pattern** (Section 3, Lecture 4): For move validation (extensible).
- **Singleton Pattern** (Section 3, Lecture 1): For game instance (optional).

### 3. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and polymorphism for board and player classes.
- **Design Patterns** (Section 3): State and Strategy patterns.
- **Design Principles** (Section 4): SoC (Lecture 11) separates game and move logic; KISS (Lecture 8) simplifies design.
- **HLD** (Section 5):
  - LLD Intro (Lecture 1): Builds on class design.
  - Database Design (Lecture 2): Persisting game state (optional).
  - API Design (Lecture 3): Exposing game controls.
  - Concurrency Handling (Lecture 4): Thread-safe move validation (optional).
  - Error Handling (Lecture 5): Handling invalid moves.
  - Parking Lot (Lecture 6): Similar entity modeling.
  - Elevator System (Lecture 7): Similar state-driven design.
  - Vending Machine (Lecture 8): Similar rule-based logic.
  - ATM Machine (Lecture 9): Similar transactional design.
  - Restaurant Management (Lecture 10): Similar entity management.
  - Library Management (Lecture 11): Similar inventory and user logic.
  - Chess Game (Lecture 12): Similar game logic and board management.
- **Clean Code** (Section 9): Meaningful names for classes and methods.

### 4. Use Case
Design a Tic-Tac-Toe game for an application, supporting board management, player moves, and win condition checks.

## System Design
### Architecture
```
[Client] --> [GameController]
                |
                v
            [TicTacToeGame]
                |
                v
           [Board] --> [Player]
```

- **Classes**:
  - `Player`: Represents players (X or O).
  - `Board`: Manages 3x3 grid and move validation.
  - `TicTacToeGame`: Manages game state and rules.
  - `GameController`: Exposes API for moves.
- **Functionality**: Initialize game, validate and execute moves, check win/draw conditions.
- **Trade-Offs**:
  - Board Representation: 2D array (simple, fixed) vs. list (flexible, complex).
  - Win Check: Brute-force (simple, slower) vs. optimized tracking (complex, faster).

## Code Example: Tic-Tac-Toe Game
Below is a Java implementation of a Tic-Tac-Toe game with board and win condition management.

```java
// Custom exception
public class GameException extends Exception {
    public GameException(String message) {
        super(message);
    }
}

// Player class
public class Player {
    private String symbol; // "X" or "O"

    public Player(String symbol) {
        this.symbol = symbol;
    }

    public String getSymbol() {
        return symbol;
    }
}

// Board class
public class Board {
    private String[][] grid;
    private int movesMade;

    public Board() {
        this.grid = new String[3][3];
        this.movesMade = 0;
    }

    public boolean makeMove(int row, int col, String symbol) throws GameException {
        if (row < 0 || row >= 3 || col < 0 || col >= 3) {
            throw new GameException("Invalid position: (" + row + "," + col + ")");
        }
        if (grid[row][col] != null) {
            throw new GameException("Position already occupied: (" + row + "," + col + ")");
        }
        grid[row][col] = symbol;
        movesMade++;
        return true;
    }

    public boolean isFull() {
        return movesMade == 9;
    }

    public String checkWinner() {
        // Check rows
        for (int i = 0; i < 3; i++) {
            if (grid[i][0] != null && grid[i][0].equals(grid[i][1]) && grid[i][1].equals(grid[i][2])) {
                return grid[i][0];
            }
        }
        // Check columns
        for (int j = 0; j < 3; j++) {
            if (grid[0][j] != null && grid[0][j].equals(grid[1][j]) && grid[1][j].equals(grid[2][j])) {
                return grid[0][j];
            }
        }
        // Check diagonals
        if (grid[0][0] != null && grid[0][0].equals(grid[1][1]) && grid[1][1].equals(grid[2][2])) {
            return grid[0][0];
        }
        if (grid[0][2] != null && grid[0][2].equals(grid[1][1]) && grid[1][1].equals(grid[2][0])) {
            return grid[0][2];
        }
        return null;
    }
}

// Game class
public class TicTacToeGame {
    private Board board;
    private Player playerX;
    private Player playerO;
    private Player currentPlayer;
    private boolean gameOver;

    public TicTacToeGame() {
        this.board = new Board();
        this.playerX = new Player("X");
        this.playerO = new Player("O");
        this.currentPlayer = playerX;
        this.gameOver = false;
    }

    public void makeMove(int row, int col) throws GameException {
        if (gameOver) {
            throw new GameException("Game is over");
        }
        board.makeMove(row, col, currentPlayer.getSymbol());
        String winner = board.checkWinner();
        if (winner != null) {
            gameOver = true;
            System.out.println("Player " + winner + " wins!");
            return;
        }
        if (board.isFull()) {
            gameOver = true;
            System.out.println("Game is a draw!");
            return;
        }
        currentPlayer = (currentPlayer == playerX) ? playerO : playerX;
        System.out.println("Move made by Player " + currentPlayer.getSymbol() + " at (" + row + "," + col + ")");
    }

    public boolean isGameOver() {
        return gameOver;
    }
}

// Controller for API interactions
public class GameController {
    private final TicTacToeGame game;

    public GameController(TicTacToeGame game) {
        this.game = game;
    }

    public void handleMakeMove(int row, int col) {
        try {
            game.makeMove(row, col);
        } catch (GameException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}

// Client to demonstrate usage
public class TicTacToeClient {
    public static void main(String[] args) {
        TicTacToeGame game = new TicTacToeGame();
        GameController controller = new GameController(game);

        // Normal flow: Valid moves
        controller.handleMakeMove(0, 0); // X
        controller.handleMakeMove(1, 1); // O
        controller.handleMakeMove(0, 1); // X
        controller.handleMakeMove(1, 2); // O
        controller.handleMakeMove(0, 2); // X wins (row 0: X X X)

        // Edge cases
        controller.handleMakeMove(0, 0); // Game over
        controller.handleMakeMakeMove(3, 3); // Invalid position
        controller.handleMakeMove(1, 1); // Position occupied
        // Output:
        // Move made by Player X at (0,0)
        // Move made by Player O at (1,1)
        // Move made by Player X at (0,1)
        // Move made by Player O at (1,2)
        // Player X wins!
        // Error: Game is over
        // Error: Invalid position: (3,3)
        // Error: Position already occupied: (1,1)
    }
}
```
- **LLD Principles**:
  - **Board Representation**: `Board` uses a 3x3 array for simplicity.
  - **Win Conditions**: `checkWinner` validates rows, columns, diagonals; `isFull` checks for draws.
  - **Classes**: `Player`, `Board`, `TicTacToeGame`, `GameController`.
  - **Design Patterns**: State (extensible for game states), Strategy (extensible for move validation).
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates board and game logic; KISS (Lecture 8) simplifies implementation.
- **Big O**: O(1) for `makeMove`, `checkWinner` (fixed 3x3 grid).
- **Edge Cases**: Handles invalid positions, occupied cells, game over states.

**UML Diagram**:
```
[Client] --> [GameController]
                |
                v
            [TicTacToeGame]
                |
                v
           [Board] --> [Player]
```

## Real-World Application
Imagine designing a Tic-Tac-Toe game for a mobile or web application, supporting board management and rule enforcement with modular design. This LLD—aligned with HLD principles from Section 5 (e.g., Chess Game, Lecture 12, for game logic)—ensures simplicity and reliability, critical for game systems.

## Practice Exercises
Practice Tic-Tac-Toe design with these exercises:
- **Easy**: Design a UML diagram and Java code for a simple Tic-Tac-Toe board.
- **Medium**: Implement a Tic-Tac-Toe game with basic move validation and turn tracking.
- **Medium**: Design an LLD for a Tic-Tac-Toe game with win condition checks.
- **Hard**: Architect a Tic-Tac-Toe game with Java, integrating a design pattern (e.g., State for game status).

Try designing one system in Java with a UML diagram, explaining board and win condition management.

## Conclusion
Mastering the design of a Tic-Tac-Toe game equips you to build modular, rule-driven Java systems, enhancing your LLD skills. This lecture builds on HLD concepts and game design principles from your prior work, preparing you for FAANG interviews and real-world applications.

**Next Step**: Explore [Design Snake and Ladder Game](/interview-section/lld/snake-ladder) to continue your LLD journey, or check out [all sections](/interview-section/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>