---
title: Design a Movie Ticket Booking System
description: Learn low-level system design for a movie ticket booking system in Java, focusing on seat management and locking for scalable, robust applications.
---

# Design a Movie Ticket Booking System

## Overview
Welcome to the nineteenth lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Designing a movie ticket booking system is a practical LLD problem that tests your ability to manage resources and ensure concurrency using OOP principles. In this 25-minute lesson, we explore the **low-level design of a movie ticket booking system**, covering seat management, locking mechanisms to prevent double-booking, and booking functionality. Whether building a cinema booking application or preparing for FAANG interviews, this lecture equips you to design modular, scalable systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Design Patterns*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **low-level design** principles for a movie ticket booking system with seat management and locking.
- Learn to model **classes**, **relationships**, and **functionality** in Java.
- Apply **OOP principles** (Section 2, Lecture 1), **design patterns** (Section 3), **design principles** (Section 4), and **HLD concepts** (Section 5) to LLD.
- Write clean, modular Java code (Section 9).

## Why Movie Ticket Booking System Design Matters
A movie ticket booking system is a common FAANG interview problem that tests your ability to manage concurrent resource allocation and ensure data consistency. Drawing from my experience designing reservation systems, I’ve applied OOP principles to ensure reliability and scalability in similar applications. This lecture prepares you to design robust systems and articulate your approach clearly, showcasing your mentorship skills.

In software engineering, movie ticket booking system design helps you:
- **Manage Resources**: Handle seat allocation efficiently.
- **Ensure Concurrency**: Prevent double-booking with locking.
- **Enhance Scalability**: Support high-traffic booking scenarios.
- **Teach Effectively**: Share practical LLD strategies.

## Key Concepts
### 1. Movie Ticket Booking System Components
- **Seat Management**: Track available and booked seats for shows.
- **Locking Mechanism**: Prevent concurrent booking of the same seat.
- **Functionality**:
  - List available seats for a show.
  - Book a seat with payment confirmation.
  - Release seats if booking fails.
- **Edge Cases**: Concurrent bookings, unavailable seats, payment failures.

### 2. Design Patterns
- **Strategy Pattern** (Section 3, Lecture 4): For booking strategies (e.g., single seat, group).
- **Singleton Pattern** (Section 3, Lecture 1): For theater instance.
- **Observer Pattern** (Section 3, Lecture 6): For notifying booking updates.

### 3. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and polymorphism for seat and booking classes.
- **Design Patterns** (Section 3): Strategy, Singleton, and Observer patterns.
- **Design Principles** (Section 4): SoC (Lecture 11) separates seat and booking logic; KISS (Lecture 8) simplifies design.
- **HLD** (Section 5):
  - Ticket Booking System (Lecture 17): High-level booking concepts.
  - LLD Intro (Lecture 1): Builds on class design.
  - Database Design (Lecture 2): Persisting seat data.
  - API Design (Lecture 3): Exposing booking controls.
  - Concurrency Handling (Lecture 4): Thread-safe seat locking.
  - Error Handling (Lecture 5): Handling booking failures.
  - Parking Lot (Lecture 6): Similar resource management.
  - Elevator System (Lecture 7): Similar state-driven design.
  - Vending Machine (Lecture 8): Similar transactional logic.
  - ATM Machine (Lecture 9): Similar transactional design.
  - Restaurant Management (Lecture 10): Similar reservation system.
  - Library Management (Lecture 11): Similar resource tracking.
  - Chess Game (Lecture 12): Similar rule enforcement.
  - Tic-Tac-Toe (Lecture 13): Similar logic.
  - Snake and Ladder (Lecture 14): Similar mechanics.
  - Deck of Cards (Lecture 15): Similar entity management.
  - LRU Cache (Lecture 16): Similar data structure usage.
  - Rate Limiter (Lecture 17): Similar concurrency control.
  - Text Editor (Lecture 18): Similar operation management.
- **Clean Code** (Section 9): Meaningful names for classes and methods.

### 4. Use Case
Design a movie ticket booking system for a cinema, supporting seat selection, locking, and booking with thread-safety.

## System Design
### Architecture
```
[Client] --> [BookingController]
                |
                v
            [BookingService]
                |
                v
           [Theater] --> [Show] --> [Seat]
           [Booking]
```

- **Classes**:
  - `Seat`: Represents a seat with availability status.
  - `Show`: Manages seats for a movie show.
  - `Theater`: Singleton managing shows.
  - `Booking`: Tracks booking details.
  - `BookingService`: Handles business logic with locking.
  - `BookingController`: Exposes API.
- **Functionality**: List available seats, lock and book seats, handle payments.
- **Trade-Offs**:
  - Locking: Pessimistic (simple, contention) vs. optimistic (complex, scalable).
  - Storage: In-memory (fast, volatile) vs. database (persistent, slower).

## Code Example: Movie Ticket Booking System
Below is a Java implementation of a movie ticket booking system with seat management and locking.

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.locks.ReentrantLock;

// Custom exceptions
public class BookingException extends Exception {
    public BookingException(String message) {
        super(message);
    }
}

// Seat class
public class Seat {
    private String seatId;
    private boolean booked;
    private final ReentrantLock lock;

    public Seat(String seatId) {
        this.seatId = seatId;
        this.booked = false;
        this.lock = new ReentrantLock();
    }

    public String getSeatId() {
        return seatId;
    }

    public boolean isBooked() {
        return booked;
    }

    public boolean lock() {
        return lock.tryLock();
    }

    public void unlock() {
        lock.unlock();
    }

    public void book() {
        booked = true;
    }

    public void release() {
        booked = false;
    }
}

// Show class
public class Show {
    private String showId;
    private String movieTitle;
    private List<Seat> seats;

    public Show(String showId, String movieTitle, int numSeats) {
        this.showId = showId;
        this.movieTitle = movieTitle;
        this.seats = new ArrayList<>();
        for (int i = 0; i < numSeats; i++) {
            seats.add(new Seat(showId + "-S" + (i + 1)));
        }
    }

    public List<Seat> getAvailableSeats() {
        List<Seat> available = new ArrayList<>();
        for (Seat seat : seats) {
            if (!seat.isBooked()) {
                available.add(seat);
            }
        }
        return available;
    }

    public Seat getSeat(String seatId) {
        for (Seat seat : seats) {
            if (seat.getSeatId().equals(seatId)) {
                return seat;
            }
        }
        return null;
    }
}

// Booking class
public class Booking {
    private String bookingId;
    private String showId;
    private String seatId;
    private String userId;

    public Booking(String bookingId, String showId, String seatId, String userId) {
        this.bookingId = bookingId;
        this.showId = showId;
        this.seatId = seatId;
        this.userId = userId;
    }

    public String getBookingId() {
        return bookingId;
    }
}

// Theater class (Singleton)
public class Theater {
    private static Theater instance;
    private Map<String, Show> shows;

    private Theater() {
        this.shows = new HashMap<>();
    }

    public static Theater getInstance() {
        if (instance == null) {
            instance = new Theater();
        }
        return instance;
    }

    public void addShow(Show show) {
        shows.put(show.showId, show);
    }

    public Show getShow(String showId) {
        return shows.get(showId);
    }
}

// Service layer
public class BookingService {
    private final Theater theater;

    public BookingService(Theater theater) {
        this.theater = theater;
    }

    public List<Seat> getAvailableSeats(String showId) throws BookingException {
        Show show = theater.getShow(showId);
        if (show == null) {
            throw new BookingException("Show not found: " + showId);
        }
        return show.getAvailableSeats();
    }

    public String bookSeat(String showId, String seatId, String userId) throws BookingException {
        Show show = theater.getShow(showId);
        if (show == null) {
            throw new BookingException("Show not found: " + showId);
        }
        Seat seat = show.getSeat(seatId);
        if (seat == null) {
            throw new BookingException("Seat not found: " + seatId);
        }
        if (!seat.lock()) {
            throw new BookingException("Seat already locked: " + seatId);
        }
        try {
            if (seat.isBooked()) {
                throw new BookingException("Seat already booked: " + seatId);
            }
            // Simulate payment processing
            boolean paymentSuccess = processPayment(userId, seatId);
            if (!paymentSuccess) {
                throw new BookingException("Payment failed for seat: " + seatId);
            }
            seat.book();
            String bookingId = "booking-" + System.currentTimeMillis();
            System.out.println("Booked seat: " + seatId + " for user: " + userId);
            return bookingId;
        } finally {
            seat.unlock();
        }
    }

    private boolean processPayment(String userId, String seatId) {
        // Simulated payment
        System.out.println("Processing payment for user: " + userId + ", seat: " + seatId);
        return true;
    }
}

// Controller for API interactions
public class BookingController {
    private final BookingService service;

    public BookingController(BookingService service) {
        this.service = service;
    }

    public List<Seat> handleGetAvailableSeats(String showId) {
        try {
            return service.getAvailableSeats(showId);
        } catch (BookingException e) {
            System.err.println("Error: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    public String handleBookSeat(String showId, String seatId, String userId) {
        try {
            return service.bookSeat(showId, seatId, userId);
        } catch (BookingException e) {
            System.err.println("Error: " + e.getMessage());
            return null;
        }
    }
}

// Client to demonstrate usage
public class BookingClient {
    public static void main(String[] args) {
        Theater theater = Theater.getInstance();
        theater.addShow(new Show("show1", "Avengers", 5));
        BookingService service = new BookingService(theater);
        BookingController controller = new BookingController(service);

        // Normal flow
        List<Seat> availableSeats = controller.handleGetAvailableSeats("show1");
        System.out.println("Available seats: " + availableSeats.size());
        String bookingId = controller.handleBookSeat("show1", "show1-S1", "user1");
        System.out.println("Booking ID: " + bookingId);

        // Edge cases
        controller.handleBookSeat("show1", "show1-S1", "user2"); // Already booked
        controller.handleBookSeat("show2", "show2-S1", "user1"); // Invalid show
        controller.handleBookSeat("show1", "show1-S10", "user1"); // Invalid seat
        // Output:
        // Available seats: 5
        // Processing payment for user: user1, seat: show1-S1
        // Booked seat: show1-S1 for user: user1
        // Booking ID: booking-<timestamp>
        // Error: Seat already booked: show1-S1
        // Error: Show not found: show2
        // Error: Seat not found: show1-S10
    }
}
```
- **LLD Principles**:
  - **Seat Management**: `Seat` tracks availability with locking.
  - **Locking**: `ReentrantLock` ensures thread-safe booking.
  - **Classes**: `Seat`, `Show`, `Booking`, `Theater`, `BookingService`, `BookingController`.
  - **Design Patterns**: Singleton (`Theater`), Strategy (extensible booking), Observer (extensible for notifications).
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates seat and booking logic; DIP (Section 4, Lecture 6) for extensibility.
- **Big O**: O(n) for `getAvailableSeats` (n = seats), O(1) for `bookSeat` (HashMap lookup).
- **Edge Cases**: Handles already booked seats, invalid shows/seats, payment failures.

**UML Diagram**:
```
[Client] --> [BookingController]
                |
                v
            [BookingService]
                |
                v
           [Theater]
                |
                v
           [Show] --> [Seat]
           [Booking]
```

## Real-World Application
Imagine designing a movie ticket booking system for a cinema, supporting seat selection and concurrent booking with thread-safety. This LLD—aligned with HLD principles from Section 5 (e.g., Ticket Booking System, Lecture 17)—ensures reliability and scalability, critical for high-traffic systems.

## Practice Exercises
Practice movie ticket booking system design with these exercises:
- **Easy**: Design a UML diagram and Java code for a simple seat management system.
- **Medium**: Implement a booking system with single-seat booking and no locking.
- **Medium**: Design an LLD for a movie ticket booking system with locking.
- **Hard**: Architect a movie ticket booking system with Java, integrating multiple design patterns (e.g., Strategy, Observer).

Try designing one system in Java with a UML diagram, explaining seat management and locking.

## Conclusion
Mastering the design of a movie ticket booking system equips you to build modular, thread-safe Java systems, enhancing your LLD skills. This lecture builds on HLD concepts and reservation system principles, preparing you for FAANG interviews and real-world applications.

**Next Step**: Explore [Design a File System](/interview-section/lld/file-system) to continue your LLD journey, or check out [all sections](/interview-section/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>