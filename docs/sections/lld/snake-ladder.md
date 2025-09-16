---
title: Design Snake and Ladder Game
description: Learn low-level system design for a Snake and Ladder game in Java, focusing on board representation and dice mechanics for scalable, robust applications.
---

# Design Snake and Ladder Game

## Overview
Welcome to the fourteenth lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Designing a Snake and Ladder game is a classic LLD problem that tests your ability to model game logic with dynamic board interactions using OOP principles. In this 25-minute lesson, we explore the **low-level design of a Snake and Ladder game**, covering board representation (e.g., grid with snakes and ladders), dice mechanics, and game rules (e.g., win conditions, player movement). Whether building a board game application or preparing for FAANG interviews, this lecture equips you to design modular, scalable systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Design Patterns*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **low-level design** principles for a Snake and Ladder game with board representation and dice mechanics.
- Learn to model **classes**, **relationships**, and **functionality** in Java.
- Apply **OOP principles** (Section 2, Lecture 1), **design patterns** (Section 3), **design principles** (Section 4), and **HLD concepts** (Section 5) to LLD.
- Write clean, modular Java code (Section 9).

## Why Snake and Ladder Game Design Matters
Snake and Ladder is a common FAANG interview problem that tests your ability to model game logic, dynamic board interactions, and rule enforcement. Drawing from my experience designing rule-based systems, I’ve applied OOP principles to ensure maintainability and extensibility in similar applications. This lecture prepares you to design robust systems and articulate your approach clearly, showcasing your mentorship skills.

In software engineering, Snake and Ladder game design helps you:
- **Model Game Logic**: Represent board states, snakes, and ladders.
- **Implement Dynamics**: Handle dice rolls and player movement.
- **Enforce Rules**: Implement win conditions and edge cases.
- **Teach Effectively**: Share practical LLD strategies.

## Key Concepts
### 1. Snake and Ladder Components
- **Board Representation**: Grid (e.g., 1–100) with snakes (move down) and ladders (move up).
- **Dice Mechanics**: Random number generator for player moves (1–6).
- **Game Rules**:
  - Players take turns rolling a die to move.
  - Landing on a snake’s head moves to its tail; landing on a ladder’s bottom moves to its top.
  - Win by reaching or exceeding the final cell (100).
- **Edge Cases**: Invalid moves, multiple players landing on the same cell, game over states.

### 2. Design Patterns
- **Strategy Pattern** (Section 3, Lecture 4): For dice rolling (extensible for custom dice).
- **State Pattern** (Section 3, Lecture 5): For game state management (optional).
- **Singleton Pattern** (Section 3, Lecture 1): For game instance (optional).

### 3. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and polymorphism for player and board classes.
- **Design Patterns** (Section 3): Strategy and State patterns.
- **Design Principles** (Section 4): SoC (Lecture 11) separates board and game logic; KISS (Lecture 8) simplifies design.
- **HLD** (Section 5):
  - LLD Intro (Lecture 1): Builds on class design.
  - Database Design (Lecture 2): Persisting game state (optional).
  - API Design (Lecture 3): Exposing game controls.
  - Concurrency Handling (Lecture 4): Thread-safe moves (optional).
  - Error Handling (Lecture 5): Handling invalid moves.
  - Parking Lot (Lecture 6): Similar entity modeling.
  - Elevator System (Lecture 7): Similar state-driven design.
  - Vending Machine (Lecture 8): Similar rule-based logic.
  - ATM Machine (Lecture 9): Similar transactional design.
  - Restaurant Management (Lecture 10): Similar entity management.
  - Library Management (Lecture 11): Similar inventory and user logic.
  - Chess Game (Lecture 12): Similar game logic and board management.
  - Tic-Tac-Toe (Lecture 13): Similar board and rule enforcement.
- **Clean Code** (Section 9): Meaningful names for classes and methods.

### 4. Use Case
Design a Snake and Ladder game for an application, supporting board management, dice rolls, and rule enforcement.

## System Design
### Architecture
```
[Client] --> [GameController]
                |
                v
            [SnakeLadderGame]
                |
                v
           [Board] --> [Player]
           [Dice]
```

- **Classes**:
  - `Player`: Represents players with positions.
  - `Board`: Manages grid, snakes, and ladders.
  - `Dice`: Handles random rolls (1–6).
  - `SnakeLadderGame`: Manages game state and rules.
  - `GameController`: Exposes API for moves.
- **Functionality**: Initialize board with snakes/ladders, roll dice, move players, check win conditions.
- **Trade-Offs**:
  - Board Representation: Array (simple, fixed) vs. graph (flexible, complex).
  - Dice Mechanics: Random (simple) vs. deterministic (testable, complex).

## Code Example: Snake and Ladder Game
Below is a Java implementation of a Snake and Ladder game with board and dice management.

```java
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

// Custom exception
public class GameException extends Exception {
    public GameException(String message) {
        super(message);
    }
}

// Player class
public class Player {
    private String name;
    private int position;

    public Player(String name) {
        this.name = name;
        this.position = 1; // Start at position 1
    }

    public String getName() {
        return name;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }
}

// Dice class
public class Dice {
    private Random random;

    public Dice() {
        this.random = new Random();
    }

    public int roll() {
        return random.nextInt(6) + 1; // 1 to 6
    }
}

// Board class
public class Board {
    private Map<Integer, Integer> snakes;
    private Map<Integer, Integer> ladders;
    private static final int SIZE = 100;

    public Board() {
        this.snakes = new HashMap<>();
        this.ladders = new HashMap<>();
        initializeSnakesAndLadders();
    }

    private void initializeSnakesAndLadders() {
        // Example snakes: head -> tail
        snakes.put(16, 6);
        snakes.put(47, 26);
        // Example ladders: bottom -> top
        ladders.put(4, 14);
        ladders.put(9, 31);
    }

    public int getNextPosition(int currentPosition, int roll) throws GameException {
        int newPosition = currentPosition + roll;
        if (newPosition > SIZE) {
            throw new GameException("Move exceeds board size: " + newPosition);
        }
        newPosition = snakes.getOrDefault(newPosition, newPosition);
        newPosition = ladders.getOrDefault(newPosition, newPosition);
        return newPosition;
    }

    public boolean isWinningPosition(int position) {
        return position >= SIZE;
    }
}

// Game class
public class SnakeLadderGame {
    private Board board;
    private List<Player> players;
    private Player currentPlayer;
    private Dice dice;
    private boolean gameOver;

    public SnakeLadderGame(List<String> playerNames) {
        this.board = new Board();
        this.players = new ArrayList<>();
        for (String name : playerNames) {
            players.add(new Player(name));
        }
        this.currentPlayer = players.get(0);
        this.dice = new Dice();
        this.gameOver = false;
    }

    public void makeMove() throws GameException {
        if (gameOver) {
            throw new GameException("Game is over");
        }
        int roll = dice.roll();
        int newPosition = board.getNextPosition(currentPlayer.getPosition(), roll);
        currentPlayer.setPosition(newPosition);
        System.out.println(currentPlayer.getName() + " rolled " + roll + ", moved to " + newPosition);
        if (board.isWinningPosition(newPosition)) {
            gameOver = true;
            System.out.println(currentPlayer.getName() + " wins!");
            return;
        }
        int nextPlayerIndex = (players.indexOf(currentPlayer) + 1) % players.size();
        currentPlayer = players.get(nextPlayerIndex);
    }

    public boolean isGameOver() {
        return gameOver;
    }

    public Player getCurrentPlayer() {
        return currentPlayer;
    }
}

// Controller for API interactions
public class GameController {
    private final SnakeLadderGame game;

    public GameController(SnakeLadderGame game) {
        this.game = game;
    }

    public void handleMakeMove() {
        try {
            game.makeMove();
        } catch (GameException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}

// Client to demonstrate usage
public class SnakeLadderClient {
    public static void main(String[] args) {
        List<String> playerNames = List.of("Alice", "Bob");
        SnakeLadderGame game = new SnakeLadderGame(playerNames);
        GameController controller = new GameController(game);

        // Normal flow: Play until a win
        while (!game.isGameOver()) {
            controller.handleMakeMove();
        }

        // Edge case: Move after game over
        controller.handleMakeMove();
        // Output (example, varies due to random dice):
        // Alice rolled 4, moved to 14
        // Bob rolled 3, moved to 4
        // Alice rolled 5, moved to 19
        // ...
        // Alice rolled 6, moved to 100
        // Alice wins!
        // Error: Game is over
    }
}
```
- **LLD Principles**:
  - **Board Representation**: `Board` uses maps for snakes and ladders, array-like positions (1–100).
  - **Dice Mechanics**: `Dice` generates random rolls (1–6).
  - **Rules**: `SnakeLadderGame` handles player moves and win conditions.
  - **Classes**: `Player`, `Board`, `Dice`, `SnakeLadderGame`, `GameController`.
  - **Design Patterns**: Strategy (extensible for dice), State (extensible for game states).
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates board and game logic; KISS (Lecture 8) simplifies implementation.
- **Big O**: O(1) for `makeMove`, `getNextPosition` (HashMap lookups).
- **Edge Cases**: Handles moves exceeding board size, game over states.

**UML Diagram**:
```
[Client] --> [GameController]
                |
                v
            [SnakeLadderGame]
                |
                v
           [Board] --> [Player]
           [Dice]
```

## Real-World Application
Imagine designing a Snake and Ladder game for a mobile or web application, supporting board management and dice mechanics with modular design. This LLD—aligned with HLD principles from Section 5 (e.g., Chess Game, Lecture 12, for game logic)—ensures simplicity and reliability, critical for game systems.

## Practice Exercises
Practice Snake and Ladder design with these exercises:
- **Easy**: Design a UML diagram and Java code for a simple Snake and Ladder board.
- **Medium**: Implement a Snake and Ladder game with basic dice rolls and player movement.
- **Medium**: Design an LLD for a Snake and Ladder game with snakes, ladders, and win conditions.
- **Hard**: Architect a Snake and Ladder game with Java, integrating a design pattern (e.g., Strategy for dice mechanics).

Try designing one system in Java with a UML diagram, explaining board and dice management.

## Conclusion
Mastering the design of a Snake and Ladder game equips you to build modular, rule-driven Java systems, enhancing your LLD skills. This lecture builds on HLD concepts and game design principles from your prior work, preparing you for FAANG interviews and real-world applications.

**Next Step**: Explore [Design a Deck of Cards](/sections/lld/deck-of-cards) to continue your LLD journey, or check out [all sections](/sections/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>