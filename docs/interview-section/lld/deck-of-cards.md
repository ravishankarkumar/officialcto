---
title: Design a Deck of Cards
description: Learn low-level system design for a deck of cards in Java, focusing on card representation, shuffling, and dealing for scalable, robust applications.
---

# Design a Deck of Cards

## Overview
Welcome to the fifteenth lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Designing a deck of cards system is a classic LLD problem that tests your ability to model game components using OOP principles. In this 25-minute lesson, we explore the **low-level design of a deck of cards system**, covering card representation (e.g., suits, ranks), shuffling mechanics, and dealing functionality. Whether building a card game application or preparing for FAANG interviews, this lecture equips you to design modular, scalable systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Design Patterns*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **low-level design** principles for a deck of cards system with card representation, shuffling, and dealing.
- Learn to model **classes**, **relationships**, and **functionality** in Java.
- Apply **OOP principles** (Section 2, Lecture 1), **design patterns** (Section 3), **design principles** (Section 4), and **HLD concepts** (Section 5) to LLD.
- Write clean, modular Java code (Section 9).

## Why Deck of Cards Design Matters
A deck of cards system is a common FAANG interview problem that tests your ability to model simple yet flexible game components. Drawing from my experience designing rule-based systems, I’ve applied OOP principles to ensure maintainability and extensibility in similar applications. This lecture prepares you to design robust systems and articulate your approach clearly, showcasing your mentorship skills.

In software engineering, deck of cards design helps you:
- **Model Game Components**: Represent cards, suits, and ranks.
- **Implement Mechanics**: Handle shuffling and dealing.
- **Ensure Flexibility**: Support various card games.
- **Teach Effectively**: Share practical LLD strategies.

## Key Concepts
### 1. Deck of Cards Components
- **Card Representation**: Cards with suits (e.g., Hearts, Spades) and ranks (e.g., Ace, King).
- **Shuffling**: Randomize card order (e.g., Fisher-Yates algorithm).
- **Dealing**: Distribute cards to players.
- **Functionality**:
  - Create a standard 52-card deck.
  - Shuffle the deck.
  - Deal cards to players or hands.
- **Edge Cases**: Empty deck, invalid card counts, duplicate cards.

### 2. Design Patterns
- **Factory Pattern** (Section 3, Lecture 2): For creating card objects.
- **Strategy Pattern** (Section 3, Lecture 4): For shuffling algorithms (extensible).
- **Iterator Pattern** (Section 3, Lecture 7): For dealing cards.

### 3. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and polymorphism for card and deck classes.
- **Design Patterns** (Section 3): Factory, Strategy, and Iterator patterns.
- **Design Principles** (Section 4): SoC (Lecture 11) separates card and deck logic; KISS (Lecture 8) simplifies design.
- **HLD** (Section 5):
  - LLD Intro (Lecture 1): Builds on class design.
  - Database Design (Lecture 2): Persisting game state (optional).
  - API Design (Lecture 3): Exposing deck controls.
  - Concurrency Handling (Lecture 4): Thread-safe dealing (optional).
  - Error Handling (Lecture 5): Handling invalid card operations.
  - Parking Lot (Lecture 6): Similar entity modeling.
  - Elevator System (Lecture 7): Similar state-driven design.
  - Vending Machine (Lecture 8): Similar rule-based logic.
  - ATM Machine (Lecture 9): Similar transactional design.
  - Restaurant Management (Lecture 10): Similar entity management.
  - Library Management (Lecture 11): Similar inventory logic.
  - Chess Game (Lecture 12): Similar game logic.
  - Tic-Tac-Toe (Lecture 13): Similar board management.
  - Snake and Ladder (Lecture 14): Similar game mechanics.
- **Clean Code** (Section 9): Meaningful names for classes and methods.

### 4. Use Case
Design a deck of cards system for a card game application, supporting card creation, shuffling, and dealing.

## System Design
### Architecture
```
[Client] --> [DeckController]
                |
                v
            [Deck]
                |
                v
           [Card]
```

- **Classes**:
  - `Card`: Represents a card with suit and rank.
  - `Deck`: Manages a collection of cards, shuffling, and dealing.
  - `DeckController`: Exposes API for deck operations.
- **Functionality**: Initialize deck, shuffle cards, deal cards.
- **Trade-Offs**:
  - Shuffling: Fisher-Yates (efficient, in-place) vs. random swaps (simpler, less efficient).
  - Storage: List (flexible, dynamic) vs. array (fixed, faster).

## Code Example: Deck of Cards System
Below is a Java implementation of a deck of cards system with shuffling and dealing.

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

// Custom exception
public class DeckException extends Exception {
    public DeckException(String message) {
        super(message);
    }
}

// Card class
public class Card {
    private String suit;
    private String rank;

    public Card(String suit, String rank) {
        this.suit = suit;
        this.rank = rank;
    }

    public String getSuit() {
        return suit;
    }

    public String getRank() {
        return rank;
    }

    @Override
    public String toString() {
        return rank + " of " + suit;
    }
}

// Deck class
public class Deck {
    private List<Card> cards;
    private Random random;

    public Deck() {
        this.cards = new ArrayList<>();
        this.random = new Random();
        initializeDeck();
    }

    private void initializeDeck() {
        String[] suits = {"Hearts", "Diamonds", "Clubs", "Spades"};
        String[] ranks = {"Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"};
        for (String suit : suits) {
            for (String rank : ranks) {
                cards.add(new Card(suit, rank));
            }
        }
    }

    public void shuffle() {
        // Fisher-Yates shuffle
        for (int i = cards.size() - 1; i > 0; i--) {
            int j = random.nextInt(i + 1);
            Card temp = cards.get(i);
            cards.set(i, cards.get(j));
            cards.set(j, temp);
        }
        System.out.println("Deck shuffled");
    }

    public List<Card> deal(int numCards) throws DeckException {
        if (numCards <= 0 || numCards > cards.size()) {
            throw new DeckException("Invalid number of cards to deal: " + numCards);
        }
        List<Card> dealtCards = new ArrayList<>();
        for (int i = 0; i < numCards; i++) {
            dealtCards.add(cards.remove(0));
        }
        System.out.println("Dealt " + numCards + " cards");
        return dealtCards;
    }

    public int getRemainingCards() {
        return cards.size();
    }
}

// Controller for API interactions
public class DeckController {
    private final Deck deck;

    public DeckController(Deck deck) {
        this.deck = deck;
    }

    public void handleShuffle() {
        deck.shuffle();
    }

    public List<Card> handleDeal(int numCards) {
        try {
            return deck.deal(numCards);
        } catch (DeckException e) {
            System.err.println("Error: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    public int handleGetRemainingCards() {
        return deck.getRemainingCards();
    }
}

// Client to demonstrate usage
public class DeckClient {
    public static void main(String[] args) {
        Deck deck = new Deck();
        DeckController controller = new DeckController(deck);

        // Normal flow
        controller.handleShuffle();
        List<Card> hand1 = controller.handleDeal(5);
        System.out.println("Hand 1: " + hand1);
        System.out.println("Remaining cards: " + controller.handleGetRemainingCards());

        // Edge cases
        controller.handleDeal(50); // Too many cards
        controller.handleDeal(0);  // Invalid number
        // Output:
        // Deck shuffled
        // Dealt 5 cards
        // Hand 1: [Ace of Hearts, 2 of Diamonds, ..., 5 of Clubs]
        // Remaining cards: 47
        // Error: Invalid number of cards to deal: 50
        // Error: Invalid number of cards to deal: 0
    }
}
```
- **LLD Principles**:
  - **Card Representation**: `Card` encapsulates suit and rank.
  - **Shuffling**: `Deck` uses Fisher-Yates for efficient randomization.
  - **Dealing**: `deal` distributes cards and updates deck state.
  - **Classes**: `Card`, `Deck`, `DeckController`.
  - **Design Patterns**: Factory (extensible for cards), Strategy (extensible for shuffling), Iterator (for dealing).
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates card and deck logic; KISS (Lecture 8) simplifies implementation.
- **Big O**: O(n) for `shuffle` (Fisher-Yates), O(k) for `deal` (k = number of cards).
- **Edge Cases**: Handles invalid deal counts, empty deck.

**UML Diagram**:
```
[Client] --> [DeckController]
                |
                v
            [Deck]
                |
                v
           [Card]
```

## Real-World Application
Imagine designing a deck of cards system for a card game application, supporting shuffling and dealing with modular design. This LLD—aligned with HLD principles from Section 5 (e.g., Chess Game, Lecture 12, for game logic)—ensures flexibility and reliability, critical for game systems.

## Practice Exercises
Practice deck of cards design with these exercises:
- **Easy**: Design a UML diagram and Java code for a simple deck with one suit.
- **Medium**: Implement a deck system with basic shuffling and dealing.
- **Medium**: Design an LLD for a deck of cards with multiple suits and ranks.
- **Hard**: Architect a deck system with Java, integrating multiple design patterns (e.g., Factory, Strategy).

Try designing one system in Java with a UML diagram, explaining card representation and shuffling.

## Conclusion
Mastering the design of a deck of cards system equips you to build modular, flexible Java systems, enhancing your LLD skills. This lecture builds on HLD concepts and game design principles from your prior work, preparing you for FAANG interviews and real-world applications.

**Next Step**: Explore [Design an LRU Cache](/interview-section/lld/lru-cache) to continue your LLD journey, or check out [all sections](/interview-section/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>