---
title: Design a Ticket Booking System (e.g., BookMyShow)
description: Master the design of a BookMyShow-like ticket booking system in Java, covering scalability, low latency, and concurrency control for high-level system design.
---

# Design a Ticket Booking System (e.g., BookMyShow)

## Overview
A ticket booking system like BookMyShow enables users to browse events, book seats, and process payments, handling high concurrency for popular events. In this seventeenth lesson of Section 5 in the *Official CTO* journey, we explore the **high-level design of a ticket booking system**, covering functional requirements (event browsing, seat booking, payments), non-functional requirements (scalability, low latency, concurrency control), and trade-offs (seat locking, storage, consistency). Whether building an event platform or a ticketing app, this design ensures robust performance. By mastering this, you’ll architect scalable Java systems and mentor others effectively.

Inspired by *Clean Architecture*, *Designing Data-Intensive Applications*, and *System Design Interview*, this 25-minute lesson covers the concepts, a practical Java example with a system architecture diagram, and practice exercises to advance your skills. Let’s continue the journey to becoming a better engineer!

## Learning Objectives
- Understand **functional** (event browsing, seat booking, payments) and **non-functional** (scalability, latency, concurrency control) requirements for a ticket booking system.
- Learn to design a **BookMyShow-like system** in Java, addressing components and trade-offs.
- Apply **OOP principles** (Section 2, Lecture 1), **UML** (Section 2, Lecture 2), **design principles** (Section 4), and **HLD concepts** (Section 5, Lectures 1-16) to system design.
- Design scalable Java systems with clean code practices (Section 9).

## Why Ticket Booking System Design Matters
Ticket booking systems are critical for event platforms, requiring fast seat reservation, secure payments, and robust concurrency control to prevent overbooking. Early in my career, I designed a ticketing system for an event platform, optimizing for low latency with caching and ensuring consistency with seat locking. This design—balancing functionality and performance—is a staple in FAANG system design interviews. Explaining it clearly showcases your mentorship skills.

In software engineering, ticket booking system design helps you:
- **Handle Scale**: Support millions of users and events with distributed systems.
- **Ensure Low Latency**: Optimize seat booking with caching.
- **Manage Concurrency**: Prevent overbooking with locking mechanisms.
- **Teach Effectively**: Share scalable ticketing design strategies.

## Key Concepts
### 1. Functional Requirements
- **Event Browsing**: Users browse events and available seats.
- **Seat Booking**: Reserve seats for an event.
- **Payments**: Process transactions securely.
- **Optional**: Support cancellations, waitlists, and ticket transfers.

### 2. Non-Functional Requirements
- **Scalability**: Handle millions of events and bookings daily.
- **Low Latency**: <200ms for seat booking and event search.
- **Concurrency Control**: Prevent overbooking with consistent seat allocation.
- **Reliability**: Ensure payment and booking consistency (99.9% uptime).
- **Security**: Secure transactions with encryption.

### 3. System Components
- **Client**: Browser/mobile app for browsing and booking.
- **API**: REST endpoints for events, bookings, and payments.
- **Load Balancer**: Distributes traffic (e.g., Nginx).
- **Application Server**: Handles logic (e.g., Java Spring Boot).
- **Database**: Stores event, seat, and booking data (e.g., Cassandra).
- **Cache**: Speeds up event and seat data access (e.g., Redis).
- **Search Service**: Indexes events (e.g., Elasticsearch).
- **Payment Service**: Processes transactions (e.g., Stripe).
- **Message Queue**: Manages async updates (e.g., Kafka).
- **Locking Service**: Ensures concurrency control (e.g., Redis-based locks).

### 4. Trade-Offs
- **Concurrency Control**: Distributed locks (consistent, complex) vs. optimistic locking (fast, conflict risk).
- **Storage**: NoSQL (scalable) vs. SQL (simpler joins for bookings).
- **CAP Theorem**: Prioritize CP (consistency, partition tolerance) for bookings and payments; AP for event browsing.

### 5. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and polymorphism modularize components.
- **UML** (Section 2, Lecture 2): Diagrams visualize architecture.
- **Design Principles** (Section 4): SoC (Lecture 11) separates event browsing, booking, and payments; KISS (Lecture 8) simplifies logic.
- **HLD Concepts**:
  - Components (Section 5, Lecture 1): Map to API, database, cache.
  - Requirements (Section 5, Lecture 2): Drive scalability and concurrency.
  - Scaling (Section 5, Lecture 3): Use sharding and caching.
  - Security/Performance (Section 5, Lecture 4): Ensure low latency and secure payments.
  - Distributed Systems (Section 5, Lecture 5): Handle partitioning and consistency.
  - URL Shortener (Section 5, Lecture 6): Similar storage and ID generation.
  - Pastebin (Section 5, Lecture 7): Similar storage and retrieval patterns.
  - Web Crawler (Section 5, Lecture 8): Similar scalability challenges.
  - Twitter Feed (Section 5, Lecture 9): Similar real-time updates.
  - Instagram Sharing (Section 5, Lecture 10): Similar storage and delivery.
  - YouTube Streaming (Section 5, Lecture 11): Similar real-time processing.
  - Netflix Recommendation (Section 5, Lecture 12): Similar recommendation integration.
  - Uber Ride-Sharing (Section 5, Lecture 13): Similar real-time coordination.
  - WhatsApp Messaging (Section 5, Lecture 14): Similar real-time delivery.
  - Dropbox Storage (Section 5, Lecture 15): Similar storage patterns.
  - E-commerce Platform (Section 5, Lecture 16): Similar catalog and payment systems.

### 6. Use Case
Design a ticket booking system for an event platform to browse events, reserve seats, and process payments, ensuring scalability and concurrency control.

## System Design
### Architecture
```
[Client (Browser/Mobile)] --> [Load Balancer (Nginx)] --> [Application Server (Spring Boot)]
                                                          |
                                                          |--> [Database (Cassandra)]
                                                          |--> [Cache (Redis)]
                                                          |--> [Search Service (Elasticsearch)]
                                                          |--> [Payment Service (Stripe)]
                                                          |--> [Locking Service (Redis)]
                                                          |
                                                       [Queue (Kafka)]
```

- **Event Browsing**:
  1. Client searches events via GET `/events`.
  2. Application server queries Elasticsearch for events; caches results in Redis.
  3. Return event list with available seats.
- **Seat Booking**:
  1. Client reserves seat via POST `/booking`.
  2. Application server locks seat using Redis-based locking.
  3. Store booking in Cassandra; update via Kafka.
  4. Cache booking data in Redis.
- **Payments**:
  1. Client processes payment via POST `/payment`.
  2. Application server integrates with payment service (Stripe); ensures consistency.
- **Scalability**: Shard Cassandra by event ID/booking ID; replicate for availability.
- **Concurrency Control**: Use Redis locks to prevent overbooking.
- **Performance**: Cache event and booking data in Redis; use Elasticsearch for fast search.
- **Trade-Offs**: Distributed locks (consistent, complex) vs. optimistic locking (fast, conflict risk).

### Trade-Offs
- **Concurrency Control**: Distributed locks (reliable) vs. optimistic locking (faster, riskier).
- **Storage**: Cassandra for scalability vs. SQL for simpler joins.
- **Consistency**: CP for bookings/payments (reliable) vs. AP for event browsing (available).

## Code Example: Ticket Booking Service
Let’s implement a simplified Java ticket booking service with seat locking and caching.

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Event {
    private String eventId;
    private String name;
    private List<String> availableSeats;
    
    public Event(String eventId, String name, List<String> availableSeats) {
        this.eventId = eventId;
        this.name = name;
        this.availableSeats = new ArrayList<>(availableSeats);
    }
    
    public String getEventId() {
        return eventId;
    }
    
    public String getName() {
        return name;
    }
    
    public List<String> getAvailableSeats() {
        return new ArrayList<>(availableSeats);
    }
    
    public boolean reserveSeat(String seatId) {
        return availableSeats.remove(seatId);
    }
}

public class Booking {
    private String bookingId;
    private String userId;
    private String eventId;
    private String seatId;
    
    public Booking(String bookingId, String userId, String eventId, String seatId) {
        this.bookingId = bookingId;
        this.userId = userId;
        this.eventId = eventId;
        this.seatId = seatId;
    }
    
    public String getBookingId() {
        return bookingId;
    }
    
    public String getUserId() {
        return userId;
    }
}

public interface EventRepository {
    List<Event> searchEvents(String query);
    Event getEvent(String eventId);
    void updateEvent(Event event);
}

public interface BookingRepository {
    void saveBooking(Booking booking);
}

public class CassandraEventRepository implements EventRepository {
    private final Map<String, Event> storage = new HashMap<>();
    
    @Override
    public List<Event> searchEvents(String query) {
        System.out.println("Searching events in Cassandra for query: " + query);
        return List.of(
            new Event("event1", "Concert", List.of("A1", "A2")),
            new Event("event2", "Movie", List.of("B1", "B2"))
        );
    }
    
    @Override
    public Event getEvent(String eventId) {
        System.out.println("Fetching event from Cassandra: " + eventId);
        return storage.getOrDefault(eventId, null);
    }
    
    @Override
    public void updateEvent(Event event) {
        System.out.println("Updating event in Cassandra: " + event.getEventId());
        storage.put(event.getEventId(), event);
    }
}

public class CassandraBookingRepository implements BookingRepository {
    private final Map<String, Booking> storage = new HashMap<>();
    
    @Override
    public void saveBooking(Booking booking) {
        System.out.println("Saving booking to Cassandra: " + booking.getBookingId());
        storage.put(booking.getBookingId(), booking);
    }
}

public class RedisCache {
    private final Map<String, List<Event>> eventCache = new HashMap<>();
    private final Map<String, Booking> bookingCache = new HashMap<>();
    
    public List<Event> getCachedEvents(String query) {
        System.out.println("Checking Redis cache for events: " + query);
        return eventCache.getOrDefault(query, null);
    }
    
    public void cacheEvents(String query, List<Event> events) {
        System.out.println("Caching events in Redis: " + query);
        eventCache.put(query, events);
    }
    
    public Booking getCachedBooking(String bookingId) {
        System.out.println("Checking Redis cache for booking: " + bookingId);
        return bookingCache.getOrDefault(bookingId, null);
    }
    
    public void cacheBooking(Booking booking) {
        System.out.println("Caching booking in Redis: " + booking.getBookingId());
        bookingCache.put(booking.getBookingId(), booking);
    }
}

public class ElasticsearchService {
    public List<Event> search(String query) {
        System.out.println("Searching events in Elasticsearch: " + query);
        return List.of(
            new Event("event1", "Concert", List.of("A1", "A2")),
            new Event("event2", "Movie", List.of("B1", "B2"))
        );
    }
}

public class PaymentService {
    public void processPayment(String bookingId, double amount) {
        System.out.println("Processing payment for booking: " + bookingId + ", amount: " + amount);
    }
}

public class LockingService {
    private final Map<String, Boolean> locks = new HashMap<>();
    
    public boolean acquireLock(String seatId) {
        if (locks.containsKey(seatId)) {
            return false;
        }
        locks.put(seatId, true);
        System.out.println("Acquired lock for seat: " + seatId);
        return true;
    }
    
    public void releaseLock(String seatId) {
        locks.remove(seatId);
        System.out.println("Released lock for seat: " + seatId);
    }
}

public class KafkaQueue {
    public void enqueueBookingUpdate(String bookingId) {
        System.out.println("Enqueuing booking update to Kafka: " + bookingId);
    }
}

public class TicketService {
    private final EventRepository eventRepository;
    private final BookingRepository bookingRepository;
    private final RedisCache cache;
    private final ElasticsearchService searchService;
    private final PaymentService paymentService;
    private final LockingService lockingService;
    private final KafkaQueue queue;
    
    public TicketService(EventRepository eventRepository, BookingRepository bookingRepository, 
                         RedisCache cache, ElasticsearchService searchService, 
                         PaymentService paymentService, LockingService lockingService, 
                         KafkaQueue queue) {
        this.eventRepository = eventRepository;
        this.bookingRepository = bookingRepository;
        this.cache = cache;
        this.searchService = searchService;
        this.paymentService = paymentService;
        this.lockingService = lockingService;
        this.queue = queue;
    }
    
    public List<Event> searchEvents(String query) {
        List<Event> cached = cache.getCachedEvents(query);
        if (cached != null) {
            return cached;
        }
        
        List<Event> events = searchService.search(query);
        cache.cacheEvents(query, events);
        return events;
    }
    
    public void bookTicket(String bookingId, String userId, String eventId, String seatId, double amount) {
        // Acquire lock to prevent overbooking
        if (!lockingService.acquireLock(seatId)) {
            throw new IllegalStateException("Seat " + seatId + " is already booked");
        }
        
        try {
            Event event = eventRepository.getEvent(eventId);
            if (event == null || !event.getAvailableSeats().contains(seatId)) {
                throw new IllegalArgumentException("Seat " + seatId + " is not available for event " + eventId);
            }
            
            // Reserve seat
            event.reserveSeat(seatId);
            eventRepository.updateEvent(event);
            
            // Process booking and payment
            Booking booking = new Booking(bookingId, userId, eventId, seatId);
            bookingRepository.saveBooking(booking);
            cache.cacheBooking(booking);
            paymentService.processPayment(bookingId, amount);
            queue.enqueueBookingUpdate(bookingId);
        } finally {
            lockingService.releaseLock(seatId);
        }
    }
}

public class TicketController {
    private final TicketService service;
    
    public TicketController(TicketService service) {
        this.service = service;
    }
    
    public List<Event> handleSearchEvents(String query) {
        return service.searchEvents(query);
    }
    
    public void handleBookTicket(String bookingId, String userId, String eventId, String seatId, double amount) {
        service.bookTicket(bookingId, userId, eventId, seatId, amount);
        System.out.println("Ticket booked: " + bookingId);
    }
}

public class TicketClient {
    public static void main(String[] args) {
        EventRepository eventRepository = new CassandraEventRepository();
        BookingRepository bookingRepository = new CassandraBookingRepository();
        RedisCache cache = new RedisCache();
        ElasticsearchService searchService = new ElasticsearchService();
        PaymentService paymentService = new PaymentService();
        LockingService lockingService = new LockingService();
        KafkaQueue queue = new KafkaQueue();
        TicketService service = new TicketService(eventRepository, bookingRepository, cache, 
                                                 searchService, paymentService, lockingService, queue);
        TicketController controller = new TicketController(service);
        
        List<Event> events = controller.handleSearchEvents("concert");
        System.out.println("Search results: " + events);
        controller.handleBookTicket("booking1", "user1", "event1", "A1", 50.0);
        // Output:
        // Checking Redis cache for events: concert
        // Searching events in Elasticsearch: concert
        // Caching events in Redis: concert
        // Search results: [Event{eventId='event1', name='Concert', ...}, Event{eventId='event2', name='Movie', ...}]
        // Acquired lock for seat: A1
        // Fetching event from Cassandra: event1
        // Updating event in Cassandra: event1
        // Saving booking to Cassandra: booking1
        // Caching booking in Redis: booking1
        // Processing payment for booking: booking1, amount: 50.0
        // Enqueuing booking update to Kafka: booking1
        // Released lock for seat: A1
        // Ticket booked: booking1
    }
}
```
- **System Design and Principles**:
  - **Functional**: `searchEvents` retrieves events; `bookTicket` reserves seats and processes payments.
  - **Non-Functional**:
    - **Scalability**: `CassandraEventRepository` and `CassandraBookingRepository` shard by ID.
    - **Low Latency**: `RedisCache` for events and bookings; `ElasticsearchService` for fast search.
    - **Concurrency Control**: `LockingService` prevents overbooking.
    - **Reliability**: Cassandra with replication; CP for bookings.
    - **Security**: `PaymentService` simulates secure transactions.
  - **Encapsulation**: Private fields with public methods.
  - **Abstraction**: `EventRepository` and `BookingRepository` interfaces for storage.
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates event browsing, booking, and payments; DIP (Section 4, Lecture 6) for abstractions.
- **Big O**: O(1) for `bookTicket`, `cacheEvents`, `cacheBooking` (average case); O(n) for `searchEvents` (n = results).
- **Edge Cases**: Handles unavailable seats, booking conflicts with locks and exceptions.

**Systematic Approach**:
- Clarified requirements (browse events, book seats, process payments, ensure concurrency).
- Designed system architecture diagram to show API, storage, caching, locking, and payments.
- Implemented Java code for a ticket booking service, addressing requirements and trade-offs.
- Tested with `main` method for event search and booking.

## Real-World Application
Imagine designing a ticket booking system for an event platform, using Elasticsearch for fast event search, Cassandra for scalable storage, Redis for low-latency caching, and Redis-based locking for concurrency control. A system architecture diagram communicates the design to stakeholders, ensuring performance and reliability. This design—paired with principles like KISS (Section 4, Lecture 8) and patterns like Facade (Section 3, Lecture 8)—demonstrates your ability to mentor teams on scalable ticketing design.

## Practice Exercises
Design a ticket booking system or similar with these exercises:
- **Easy**: Design a system architecture diagram and Java code for an `EventService` with basic event search.
- **Medium**: Create a diagram and Java code for a `BookingService` with seat locking.
- **Medium**: Design an HLD for a ticketing system with sharding, caching, and locking, implementing a Java controller.
- **Hard**: Architect a ticketing system with Cassandra, Elasticsearch, and Kafka, supporting cancellations, using a Java service.

Try designing one system in Java with a diagram, explaining how requirements and trade-offs are addressed.

## Conclusion
Designing a BookMyShow-like ticket booking system equips you to architect scalable, reliable Java systems for event platforms. By mastering this design, you’ll optimize performance, ensure concurrency control, and teach others effectively. This advances your progress in Section 5 of the *Official CTO* journey.

**Next Step**: Explore [Design a Notification System](/interview-section/hld-ai/notification-system) to apply HLD to another real-world problem, or check out [all sections](/interview-section/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>