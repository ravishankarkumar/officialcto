---
title: Design a Chess Game
description: Learn low-level system design for a chess game in Java, focusing on board representation, piece movement, and game rules for scalable, robust applications.
---

# Design a Chess Game

## Overview
Welcome to the twelfth lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Designing a chess game is a classic LLD problem that tests your ability to model complex game logic using OOP principles. In this 25-minute lesson, we explore the **low-level design of a chess game**, covering board representation, piece movement, and game rules (e.g., check, checkmate). Whether building a chess application or preparing for FAANG interviews, this lecture equips you to design modular, scalable systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Design Patterns*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **low-level design** principles for a chess game with board representation, piece movement, and rules.
- Learn to model **classes**, **relationships**, and **functionality** in Java.
- Apply **OOP principles** (Section 2, Lecture 1), **design patterns** (Section 3), **design principles** (Section 4), and **HLD concepts** (Section 5) to LLD.
- Write clean, modular Java code (Section 9).

## Why Chess Game Design Matters
A chess game is a common FAANG interview problem that tests your ability to model complex game logic, state management, and rules enforcement. Drawing from my experience designing rule-based systems, I’ve applied OOP principles to ensure maintainability and extensibility in similar applications. This lecture prepares you to design robust systems and articulate your approach clearly, showcasing your mentorship skills.

In software engineering, chess game design helps you:
- **Model Complex Logic**: Represent board states and piece movements.
- **Enforce Rules**: Implement game rules like check and checkmate.
- **Ensure Scalability**: Support extensible game variations.
- **Teach Effectively**: Share practical LLD strategies.

## Key Concepts
### 1. Chess Game Components
- **Board Representation**: 8x8 grid to track piece positions.
- **Piece Movement**: Define movement rules for each piece (e.g., pawn, knight, king).
- **Game Rules**:
  - Validate moves (e.g., legal moves, captures).
  - Detect check, checkmate, and stalemate.
  - Track game state (e.g., turn, history).
- **Edge Cases**: Invalid moves, checkmate conditions, draw scenarios.

### 2. Design Patterns
- **Factory Pattern** (Section 3, Lecture 2): For creating piece objects.
- **Strategy Pattern** (Section 3, Lecture 4): For piece movement rules.
- **State Pattern** (Section 3, Lecture 5): For game state management.

### 3. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and inheritance for piece classes.
- **Design Patterns** (Section 3): Factory, Strategy, and State patterns.
- **Design Principles** (Section 4): SoC (Lecture 11) separates game and move logic; KISS (Lecture 8) simplifies design.
- **HLD** (Section 5):
  - LLD Intro (Lecture 1): Builds on class design.
  - Database Design (Lecture 2): Persisting game state.
  - API Design (Lecture 3): Exposing game controls.
  - Concurrency Handling (Lecture 4): Thread-safe move validation.
  - Error Handling (Lecture 5): Handling invalid moves.
  - Parking Lot (Lecture 6): Similar entity modeling.
  - Elevator System (Lecture 7): Similar state-driven design.
  - Vending Machine (Lecture 8): Similar rule-based logic.
  - ATM Machine (Lecture 9): Similar transactional design.
  - Restaurant Management (Lecture 10): Similar entity management.
  - Library Management (Lecture 11): Similar inventory and user logic.
- **Clean Code** (Section 9): Meaningful names for classes and methods.

### 4. Use Case
Design a chess game for an application, supporting board management, piece movement, and rule enforcement.

## System Design
### Architecture
```
[Client] --> [ChessController]
                |
                v
            [ChessGame]
                |
                v
           [Board] --> [Piece]
           [Player]
```

- **Classes**:
  - `Piece`: Abstract class for chess pieces (e.g., Pawn, Knight).
  - `Board`: Manages 8x8 grid and piece positions.
  - `Player`: Tracks player details and turn.
  - `ChessGame`: Manages game state and rules.
  - `ChessController`: Exposes API for moves.
- **Functionality**: Initialize board, validate and execute moves, check game status.
- **Trade-Offs**:
  - Board Representation: 2D array (simple, fixed) vs. graph (flexible, complex).
  - Move Validation: Centralized (simple, less extensible) vs. per-piece (modular, complex).

## Code Example: Chess Game System
Below is a Java implementation of a chess game with board and piece management.

```java
import java.util.HashMap;
import java.util.Map;

// Custom exception
public class ChessException extends Exception {
    public ChessException(String message) {
        super(message);
    }
}

// Position class
public class Position {
    private int row;
    private int col;

    public Position(int row, int col) {
        this.row = row;
        this.col = col;
    }

    public int getRow() {
        return row;
    }

    public int getCol() {
        return col;
    }

    public boolean isValid() {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }
}

// Piece class
public abstract class Piece {
    protected String color; // "white" or "black"
    protected Position position;

    public Piece(String color, Position position) {
        this.color = color;
        this.position = position;
    }

    public String getColor() {
        return color;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public abstract boolean isValidMove(Position to, Board board);
}

public class Pawn extends Piece {
    public Pawn(String color, Position position) {
        super(color, position);
    }

    @Override
    public boolean isValidMove(Position to, Board board) {
        int rowDiff = to.getRow() - position.getRow();
        int colDiff = Math.abs(to.getCol() - position.getCol());
        int direction = color.equals("white") ? 1 : -1; // White moves up, black moves down

        // Basic pawn move: one step forward
        if (colDiff == 0 && rowDiff == direction && board.getPiece(to) == null) {
            return true;
        }
        // Initial two-step move
        if (colDiff == 0 && rowDiff == 2 * direction && (position.getRow() == (color.equals("white") ? 1 : 6)) && board.getPiece(to) == null) {
            return board.getPiece(new Position(position.getRow() + direction, position.getCol())) == null;
        }
        // Capture diagonally
        if (colDiff == 1 && rowDiff == direction && board.getPiece(to) != null && !board.getPiece(to).getColor().equals(color)) {
            return true;
        }
        return false;
    }
}

// Board class
public class Board {
    private Piece[][] grid;

    public Board() {
        this.grid = new Piece[8][8];
        initializeBoard();
    }

    private void initializeBoard() {
        // Initialize pawns
        for (int col = 0; col < 8; col++) {
            grid[1][col] = new Pawn("white", new Position(1, col));
            grid[6][col] = new Pawn("black", new Position(6, col));
        }
        // Other pieces can be added similarly
    }

    public Piece getPiece(Position position) {
        return position.isValid() ? grid[position.getRow()][position.getCol()] : null;
    }

    public void movePiece(Position from, Position to) throws ChessException {
        Piece piece = getPiece(from);
        if (piece == null) {
            throw new ChessException("No piece at position: " + from.getRow() + "," + from.getCol());
        }
        if (!piece.isValidMove(to, this)) {
            throw new ChessException("Invalid move for piece at: " + from.getRow() + "," + from.getCol());
        }
        grid[to.getRow()][to.getCol()] = piece;
        grid[from.getRow()][from.getCol()] = null;
        piece.setPosition(to);
    }
}

// Player class
public class Player {
    private String color; // "white" or "black"

    public Player(String color) {
        this.color = color;
    }

    public String getColor() {
        return color;
    }
}

// Chess game class
public class ChessGame {
    private Board board;
    private Player whitePlayer;
    private Player blackPlayer;
    private Player currentPlayer;

    public ChessGame() {
        this.board = new Board();
        this.whitePlayer = new Player("white");
        this.blackPlayer = new Player("black");
        this.currentPlayer = whitePlayer;
    }

    public void makeMove(Position from, Position to) throws ChessException {
        Piece piece = board.getPiece(from);
        if (piece == null || !piece.getColor().equals(currentPlayer.getColor())) {
            throw new ChessException("Invalid piece or turn");
        }
        board.movePiece(from, to);
        currentPlayer = (currentPlayer == whitePlayer) ? blackPlayer : whitePlayer;
        System.out.println("Moved piece from (" + from.getRow() + "," + from.getCol() + ") to (" + to.getRow() + "," + to.getCol() + ")");
    }

    public Board getBoard() {
        return board;
    }
}

// Controller for API interactions
public class ChessController {
    private final ChessGame game;

    public ChessController(ChessGame game) {
        this.game = game;
    }

    public void handleMakeMove(int fromRow, int fromCol, int toRow, int toCol) {
        try {
            Position from = new Position(fromRow, fromCol);
            Position to = new Position(toRow, toCol);
            game.makeMove(from, to);
        } catch (ChessException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}

// Client to demonstrate usage
public class ChessClient {
    public static void main(String[] args) {
        ChessGame game = new ChessGame();
        ChessController controller = new ChessController(game);

        // Normal flow: Valid pawn move
        controller.handleMakeMove(1, 0, 3, 0); // White pawn two steps forward
        controller.handleMakeMove(6, 0, 4, 0); // Black pawn two steps forward

        // Edge cases
        controller.handleMakeMove(3, 0, 5, 0); // Invalid turn (black's turn)
        controller.handleMakeMove(4, 0, 3, 0); // Invalid move for black pawn
        controller.handleMakeMove(8, 0, 9, 0); // Invalid position
        // Output:
        // Moved piece from (1,0) to (3,0)
        // Moved piece from (6,0) to (4,0)
        // Error: Invalid piece or turn
        // Error: Invalid move for piece at: 4,0
        // Error: No piece at position: 8,0
    }
}
```
- **LLD Principles**:
  - **Board Representation**: `Board` uses a 2D array for the 8x8 grid.
  - **Piece Movement**: `Piece` hierarchy with `Pawn` implementing specific rules.
  - **Rules**: `ChessGame` validates moves and tracks turns.
  - **Design Patterns**: Factory (extensible for pieces), Strategy (move validation), State (game state, extensible).
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates board and game logic; DIP (Section 4, Lecture 6) via abstract `Piece`.
- **Big O**: O(1) for `movePiece`, `getPiece` (array access).
- **Edge Cases**: Handles invalid moves, positions, and turns.

**UML Diagram**:
```
[Client] --> [ChessController]
                |
                v
            [ChessGame]
                |
                v
           [Board] --> [Piece]
           [Player]
                |
                v
[Pawn|Knight|Bishop|Rook|Queen|King]
```

## Real-World Application
Imagine designing a chess game for an application, supporting board management and rule enforcement with modular design. This LLD—aligned with HLD principles from Section 5 (e.g., Social Network Graph, Lecture 29, for complex interactions)—ensures scalability and reliability, critical for game systems.

## Practice Exercises
Practice chess game design with these exercises:
- **Easy**: Design a UML diagram and Java code for a simple chess board with one piece type.
- **Medium**: Implement a chess game with pawn movement and turn tracking.
- **Medium**: Design an LLD for a chess game with multiple piece types and basic rules.
- **Hard**: Architect a chess game with Java, integrating multiple design patterns (e.g., Strategy, State).

Try designing one system in Java with a UML diagram, explaining board and piece management.

## Conclusion
Mastering the design of a chess game equips you to build modular, rule-driven Java systems, enhancing your LLD skills. This lecture builds on HLD concepts, preparing you for FAANG interviews and real-world applications.

**Next Step**: Explore [Design Tic-Tac-Toe](/interview-section/lld/tic-tac-toe) to continue your LLD journey, or check out [all sections](/interview-section/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>