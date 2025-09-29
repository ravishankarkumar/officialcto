---

title: "Building a clean Tic‑Tac‑Toe in Java — a practical LLD walkthrough"
description: "A concise, publish-ready article that explains a compact Tic‑Tac‑Toe implementation in Java, the design choices behind it, and practical next steps for improvement."
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Building a clean Tic‑Tac‑Toe in Java

Tic‑Tac‑Toe is deceptively simple: the rules are trivial, but designing a clean, maintainable implementation surfaces important Low‑Level Design (LLD) ideas — domain modeling, clear APIs, testability, and extension points. In this article we present a compact Java implementation, explain the choices behind it, and provide a prioritized TODO list for turning a correct toy into production‑quality code.

---

## TL;DR

This implementation uses small, focused types:

* `Move` — an immutable `record` that represents a play.
* `Player` — an enum for `O` and `X` with a symbol and helper.
* `Board` — maintains the `Player[][]` grid, validates moves, and detects winners.
* `Game` — drives turn flow, keeps a move history, and integrates with a simple console UI.

The code is intentionally compact so we can discuss design trade‑offs and follow‑ups such as efficient win checking, `MoveResult` semantics, undo/replay, and pluggable AI.

---

## The code (essential excerpts)

> Full source is available in the project repository; below are the minimal snippets readers need to understand the design.

### Move (immutable)

```java
public record Move(int row, int col, Player player) { }
```

### Player (enum)

```java
public enum Player {
    O('O'), X('X');

    private final char symbol;
    Player(char symbol) { this.symbol = symbol; }
    public char getSymbol() { return symbol; }
    public Player switchPlayer() { return this == O ? X : O; }
}
```

### Board (state + validation)

```java
public class Board {
    private final Player[][] board;

    public Board(int n) { board = new Player[n][n]; }

    public void makeMove(Move move) {
        int row = move.row();
        int col = move.col();
        if (row < 0 || col < 0 || row >= board.length || col >= board.length) {
            throw new IllegalArgumentException("The position is incorrect");
        }
        if (board[row][col] != null) {
            throw new PositionOccupiedException("The position is already occupied");
        }
        board[row][col] = move.player();
    }

    // printBoard() and getWinner() scan rows/cols/diags (omitted for brevity)
}
```

### Game (controller)

```java
public class Game {
    private final Board board;
    private final List<Move> moves = new ArrayList<>();
    private Player currentPlayer;

    public Game() {
        this.board = new Board(3);
        this.currentPlayer = Player.O;
    }

    public Optional<Player> play(int row, int col) {
        Move m = new Move(row, col, currentPlayer);
        board.makeMove(m);
        moves.add(m);
        currentPlayer = currentPlayer.switchPlayer();
        return board.getWinner();
    }
}
```

The console driver reads two integers per move and uses `Game.play` until a winner is returned.

---

## Why this design works (and what to call out in interviews)

1. **Small, focused types** — each class has a single responsibility: `Move` is a value, `Board` owns state and rules, `Game` orchestrates play. This separation keeps the design testable and extensible.

2. **Immutability where it matters** — `Move` is immutable by design (`record`). That makes the move history safe, simple, and ideal for replay or serialization.

3. **Explicit domain types** — using `Player` as an enum prevents magic characters and communicates intent to readers and compilers.

4. **Simple, correct logic** — the code is straightforward and easy to reason about, which is often a stronger signal in interviews than clever but brittle optimizations.

When explaining this design in an interview, emphasize the trade‑offs: the simple `getWinner()` implementation is easy to verify but not optimal; the next step is to make winner detection incremental (O(n) per move) and make `makeMove` return a structured result so the controller knows whether to stop or continue.

---

## Practical improvements (prioritized)

Below are concrete changes you can make, ordered by impact.

### 1) Return a `MoveResult` from `makeMove`

**Why:** make the contract explicit: did this move win the game, fill the board (draw), or should the game continue? This avoids separate full-board scans and prevents ambiguous state transitions.

```java
public enum MoveResult { WIN, DRAW, CONTINUE }
```

Change `Board.makeMove(Move)` to return `MoveResult`.

### 2) Efficient win checking (O(n) per move)

**Why:** the current `getWinner()` scans the entire board. Instead, after applying a move at `(r,c)` check only:

* row `r`,
* column `c`,
* main diagonal if `r == c`,
* anti-diagonal if `r + c == n - 1`.

This keeps move handling linear in board size.

### 3) Add `toString()` and `isFull()` to `Board`

`toString()` makes tests and logs tidy; `isFull()` helps detect draws.

### 4) Add an undo / replay mechanism (Command or Memento)

Use the **Command** pattern (let `Move` implement `apply(Board)` and `revert(Board)`), or snapshot the board for Memento‑style undo. Because moves are small, Command is simple and memory‑efficient.

### 5) Pluggable player strategies (AI)

Introduce a `PlayerStrategy` interface and build `HumanStrategy`, `RandomStrategy`, and `MinimaxStrategy`. This cleanly separates input from game logic.

### 6) Extract `WinChecker` (Strategy pattern)

If you want to support variants like `k-in-a-row` or rectangular boards, extract the win rule into a `WinChecker` interface and plug implementations.

### 7) Harden the console driver

* Use a single `Scanner` in `try-with-resources`.
* Validate input with `hasNextInt()`.
* Handle exceptions gracefully and do not create a `Scanner` inside the loop.

### 8) Add unit tests (JUnit)

Write tests for:

* occupied position error,
* invalid coordinates,
* row/column/diagonal wins,
* draw handling,
* undo/replay behavior.

---

## Complexity summary

* **Space:** O(n²) for `Player[][]`.
* **Current winner check:** O(n²) per call if scanning whole board; if called after every move, that makes play O(n²) per move.
* **Improved winner check (per‑move):** O(n) per move using the last‑move optimization.
* **History:** O(m) where `m ≤ n²`.

---

## Patterns used and where to apply them

* **Command** — for undo/replay (let `Move` apply/revert itself).
* **Strategy** — for pluggable AIs or different win rules (`PlayerStrategy` and `WinChecker`).
* **Observer** — for UI updates: `Game` emits events and the UI listens.
* **Factory / Builder** — for configuring games (board size, win length, starting player).

Mentioning these patterns during an interview — and why you’d choose them — is often more important than fully implementing them in the first pass.

---

## Suggested TODO list (copyable)

* [ ] Change `Board.makeMove` to return `MoveResult` (`WIN`, `DRAW`, `CONTINUE`).
* [ ] Implement efficient per‑move win checking.
* [ ] Add `toString()` and `isFull()` to `Board`.
* [ ] Implement `undo()` via Command pattern and expose `replay()`.
* [ ] Add `PlayerStrategy` and a basic `RandomStrategy` AI.
* [ ] Extract `WinChecker` for `k-in-a-row` support.
* [ ] Harden `Main` with input validation and single `Scanner`.
* [ ] Write JUnit tests for board rules and game flow.
* [ ] Add `GameListener` events for UI decoupling.

---

## Closing notes

This small project is a great vehicle for demonstrating LLD skills. The starting code is correct and readable — the next step is to show you can evolve it without breaking behavior: make the winner check incremental, return explicit results from `makeMove`, and introduce small patterns (Command, Strategy) that make the code extensible and testable.