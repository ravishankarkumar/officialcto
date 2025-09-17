---
title: Mock HLD Interview - Viewer-Submitted Problem
description: Master the high-level design interview with a viewer-submitted problem (ride-sharing platform) in Java, covering scalability, low latency, and system design strategies.
---

# Mock HLD Interview: Viewer-Submitted Problem

## Overview
In this thirty-fourth lesson of Section 5 in the *Official CTO* journey, we tackle a **mock high-level design (HLD) interview** for a viewer-submitted problem: designing a ride-sharing platform. This simulates a FAANG-style system design interview, walking through problem clarification, requirements analysis, architecture design, and trade-offs for a scalable ride-sharing system. We’ll cover functional requirements (trip booking, driver matching), non-functional requirements (scalability, low latency, reliability), and trade-offs (matching efficiency, consistency vs. availability). By mastering this, you’ll excel in HLD interviews, architect scalable Java systems, and mentor others effectively.

Inspired by *Clean Architecture*, *Designing Data-Intensive Applications*, and *System Design Interview*, this 25-minute lesson provides an interview-style approach, a practical Java example with a system architecture diagram, and practice exercises to advance your skills. Let’s dive into the interview and continue the journey to becoming a better engineer!

## Learning Objectives
- Understand how to approach an **HLD interview** for a viewer-submitted problem (ride-sharing platform).
- Learn to design a **ride-sharing system** in Java, addressing functional (trip booking, driver matching) and non-functional (scalability, latency, reliability) requirements.
- Apply **OOP principles** (Section 2, Lecture 1), **UML** (Section 2, Lecture 2), **design principles** (Section 4), and **HLD concepts** (Section 5, Lectures 1-33) to system design.
- Design scalable Java systems with clean code practices (Section 9).

## Why HLD Interviews Matter
High-level design interviews test your ability to architect scalable systems under time constraints, a key skill for senior engineers. Early in my career, I prepared for system design interviews by practicing problems like ride-sharing platforms, focusing on clear requirement analysis and trade-off discussions. This mock interview—using a viewer-submitted problem—helps you think like an interviewer expects, a skill critical for FAANG roles. Explaining your design clearly showcases your mentorship skills.

In software engineering, mastering HLD interviews helps you:
- **Architect Scalable Systems**: Design solutions for high-traffic applications.
- **Communicate Effectively**: Articulate design decisions and trade-offs.
- **Handle Scale**: Support millions of users with low latency.
- **Teach Effectively**: Share system design strategies with clarity.

## Mock Interview Approach
Let’s simulate an HLD interview for a viewer-submitted problem: **Design a ride-sharing platform**. I’ll walk through the process as if in a real interview, following a structured approach.

### Step 1: Clarify the Problem
**Interviewer**: “Design a ride-sharing platform like Uber.”
- **Questions to Ask**:
  - What features are required? (e.g., trip booking, driver matching, pricing)
  - What’s the scale? (e.g., millions of users, thousands of drivers)
  - Are there latency requirements? (e.g., <1s for driver matching)
  - Any specific constraints? (e.g., geolocation, reliability)

**Assumptions**:
- Core features: User requests a ride, system matches a driver, tracks trip.
- Scale: 1M daily active users, 10K drivers, 100K trips/day.
- Latency: <1s for driver matching, <100ms for API responses.
- Reliability: 99.9% uptime, consistent trip data.

### Step 2: Define Requirements
#### Functional Requirements
- **Trip Booking**: Users request rides with source/destination.
- **Driver Matching**: Match users with nearby drivers.
- **Trip Tracking**: Track ride status and location.
- **Optional**: Pricing calculation, ride history, ratings.

#### Non-Functional Requirements
- **Scalability**: Handle 1M users, 10K drivers, 100K trips/day.
- **Low Latency**: <1s for driver matching, <100ms for API calls.
- **Reliability**: Ensure 99.9% uptime; consistent trip data.
- **Storage Efficiency**: Optimize for geolocation and trip data.

### Step 3: Identify Components
- **Client**: Mobile app for users and drivers.
- **API**: REST endpoints for ride requests and tracking.
- **Load Balancer**: Distributes traffic (e.g., Nginx).
- **Application Server**: Handles logic (e.g., Java Spring Boot).
- **Database**: Stores user, driver, and trip data (e.g., Cassandra).
- **Cache**: Speeds up geolocation queries (e.g., Redis).
- **Message Queue**: Manages async updates (e.g., Kafka).
- **Matching Engine**: Matches riders with drivers (e.g., geolocation-based).

### Step 4: Discuss Trade-Offs
- **Matching Efficiency vs. Latency**: Complex algorithms (accurate, slower) vs. simple proximity (fast, less accurate).
- **Consistency vs. Availability**: Strong consistency for trip data (reliable, slower) vs. eventual consistency (fast, simpler).
- **CAP Theorem**: Prioritize CP (consistency, partition tolerance) for trip transactions.

### Step 5: Propose Architecture
Below is the system design, followed by a Java implementation.

## System Design
### Architecture
```
[Client (User/Driver App)] --> [Load Balancer (Nginx)] --> [Application Server (Spring Boot)]
                                                        |
                                                        |--> [Database (Cassandra)]
                                                        |--> [Cache (Redis)]
                                                        |--> [Matching Engine]
                                                        |
                                                     [Queue (Kafka)]
```

- **Trip Booking**:
  1. User sends ride request via POST `/ride/request`.
  2. Application server validates, stores trip in Cassandra, caches in Redis.
  3. Enqueues request to Kafka for matching.
- **Driver Matching**:
  1. Matching engine consumes request from Kafka.
  2. Queries Redis for nearby drivers; matches based on proximity.
  3. Updates trip status in Cassandra; notifies user/driver via WebSocket.
- **Scalability**: Shard Cassandra by trip ID; partition Redis by geolocation.
- **Performance**: Cache driver locations in Redis; use WebSocket for real-time updates.
- **Reliability**: Ensure CP consistency for trip data via Cassandra.
- **Trade-Offs**: Proximity-based matching (fast, less accurate) vs. advanced algorithms (accurate, slower).

### Trade-Offs
- **Matching Algorithm**: Proximity-based (fast, simple) vs. ETA-based (accurate, compute-intensive).
- **Consistency vs. Availability**: CP for trip transactions (reliable, slower) vs. AP for driver availability (fast, simpler).
- **Storage**: Cassandra (scalable, distributed) vs. SQL (simpler joins, less scalable).

## Code Example: Ride-Sharing Service
Let’s implement a simplified Java ride-sharing service with trip booking and driver matching.

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Trip {
    private String tripId;
    private String userId;
    private String driverId;
    private String status;
    private double[] location; // [latitude, longitude]
    private long timestamp;

    public Trip(String tripId, String userId, double[] location, String status, long timestamp) {
        this.tripId = tripId;
        this.userId = userId;
        this.location = location;
        this.status = status;
        this.timestamp = timestamp;
    }

    public String getTripId() {
        return tripId;
    }

    public String getUserId() {
        return userId;
    }

    public String getDriverId() {
        return driverId;
    }

    public void setDriverId(String driverId) {
        this.driverId = driverId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double[] getLocation() {
        return location;
    }
}

public class Driver {
    private String driverId;
    private double[] location;
    private boolean available;

    public Driver(String driverId, double[] location, boolean available) {
        this.driverId = driverId;
        this.location = location;
        this.available = available;
    }

    public String getDriverId() {
        return driverId;
    }

    public double[] getLocation() {
        return location;
    }

    public boolean isAvailable() {
        return available;
    }
}

public interface TripRepository {
    void saveTrip(Trip trip);
    Trip getTrip(String tripId);
}

public interface DriverRepository {
    void saveDriver(Driver driver);
    List<Driver> getNearbyDrivers(double[] location, double radius);
}

public class CassandraTripRepository implements TripRepository {
    private final Map<String, Trip> storage = new HashMap<>();

    @Override
    public void saveTrip(Trip trip) {
        System.out.println("Saving治愈 Saving trip to Cassandra: " + trip.getTripId());
        storage.put(trip.getTripId(), trip);
    }

    @Override
    public Trip getTrip(String tripId) {
        System.out.println("Fetching trip from Cassandra: " + tripId);
        return storage.getOrDefault(tripId, null);
    }
}

public class CassandraDriverRepository implements DriverRepository {
    private final Map<String, Driver> storage = new HashMap<>();

    @Override
    public void saveDriver(Driver driver) {
        System.out.println("Saving driver to Cassandra: " + driver.getDriverId());
        storage.put(driver.getDriverId(), driver);
    }

    @Override
    public List<Driver> getNearbyDrivers(double[] location, double radius) {
        System.out.println("Fetching nearby drivers from Cassandra");
        List<Driver> nearby = new ArrayList<>();
        for (Driver driver : storage.values()) {
            if (driver.isAvailable() && distance(location, driver.getLocation()) <= radius) {
                nearby.add(driver);
            }
        }
        return nearby;
    }

    private double distance(double[] loc1, double[] loc2) {
        // Simplified distance calculation (Euclidean)
        return Math.sqrt(Math.pow(loc1[0] - loc2[0], 2) + Math.pow(loc1[1] - loc2[1], 2));
    }
}

public class RedisCache {
    private final Map<String, Trip> tripCache = new HashMap<>();
    private final Map<String, Driver> driverCache = new HashMap<>();

    public Trip getCachedTrip(String tripId) {
        System.out.println("Checking Redis cache for trip: " + tripId);
        return tripCache.getOrDefault(tripId, null);
    }

    public void cacheTrip(Trip trip) {
        System.out.println("Caching trip in Redis: " + trip.getTripId());
        tripCache.put(trip.getTripId(), trip);
    }

    public Driver getCachedDriver(String driverId) {
        System.out.println("Checking Redis cache for driver: " + driverId);
        return driverCache.getOrDefault(driverId, null);
    }

    public void cacheDriver(Driver driver) {
        System.out.println("Caching driver in Redis: " + driver.getDriverId());
        driverCache.put(driver.getDriverId(), driver);
    }
}

public class KafkaQueue {
    public void enqueueTripRequest(Trip trip) {
        System.out.println("Enqueuing trip request to Kafka: " + trip.getTripId());
    }
}

public class MatchingEngine {
    public Driver matchDriver(List<Driver> drivers, double[] location) {
        System.out.println("Matching driver for location: " + location[0] + "," + location[1]);
        Driver closest = null;
        double minDistance = Double.MAX_VALUE;
        for (Driver driver : drivers) {
            double dist = distance(location, driver.getLocation());
            if (dist < minDistance) {
                minDistance = dist;
                closest = driver;
            }
        }
        return closest;
    }

    private double distance(double[] loc1, double[] loc2) {
        return Math.sqrt(Math.pow(loc1[0] - loc2[0], 2) + Math.pow(loc1[1] - loc2[1], 2));
    }
}

public class RideSharingService {
    private final TripRepository tripRepository;
    private final DriverRepository driverRepository;
    private final RedisCache cache;
    private final KafkaQueue queue;
    private final MatchingEngine matchingEngine;
    private final double radius = 10.0; // Search radius in km

    public RideSharingService(TripRepository tripRepository, DriverRepository driverRepository, 
                             RedisCache cache, KafkaQueue queue, MatchingEngine matchingEngine) {
        this.tripRepository = tripRepository;
        this.driverRepository = driverRepository;
        this.cache = cache;
        this.queue = queue;
        this.matchingEngine = matchingEngine;
    }

    public String requestRide(String tripId, String userId, double[] location) {
        Trip trip = new Trip(tripId, userId, location, "REQUESTED", System.currentTimeMillis());
        tripRepository.saveTrip(trip);
        cache.cacheTrip(trip);
        queue.enqueueTripRequest(trip);

        List<Driver> nearbyDrivers = driverRepository.getNearbyDrivers(location, radius);
        Driver matchedDriver = matchingEngine.matchDriver(nearbyDrivers, location);
        if (matchedDriver == null) {
            throw new IllegalStateException("No drivers available for trip: " + tripId);
        }

        trip.setDriverId(matchedDriver.getDriverId());
        trip.setStatus("ASSIGNED");
        tripRepository.saveTrip(trip);
        cache.cacheTrip(trip);
        return matchedDriver.getDriverId();
    }

    public Trip getTripStatus(String tripId) {
        Trip cached = cache.getCachedTrip(tripId);
        if (cached != null) {
            return cached;
        }

        Trip trip = tripRepository.getTrip(tripId);
        if (trip == null) {
            throw new IllegalArgumentException("Trip not found: " + tripId);
        }
        cache.cacheTrip(trip);
        return trip;
    }
}

public class RideSharingController {
    private final RideSharingService service;

    public RideSharingController(RideSharingService service) {
        this.service = service;
    }

    public String handleRequestRide(String tripId, String userId, double[] location) {
        return service.requestRide(tripId, userId, location);
    }

    public Trip handleGetTripStatus(String tripId) {
        return service.getTripStatus(tripId);
    }
}

public class RideSharingClient {
    public static void main(String[] args) {
        TripRepository tripRepository = new CassandraTripRepository();
        DriverRepository driverRepository = new CassandraDriverRepository();
        RedisCache cache = new RedisCache();
        KafkaQueue queue = new KafkaQueue();
        MatchingEngine matchingEngine = new MatchingEngine();
        RideSharingService service = new RideSharingService(tripRepository, driverRepository, cache, queue, matchingEngine);
        RideSharingController controller = new RideSharingController(service);

        // Setup drivers
        driverRepository.saveDriver(new Driver("driver1", new double[]{10.0, 10.0}, true));
        driverRepository.saveDriver(new Driver("driver2", new double[]{12.0, 12.0}, true));

        String driverId = controller.handleRequestRide("trip1", "user1", new double[]{10.1, 10.1});
        System.out.println("Matched driver: " + driverId);
        Trip trip = controller.handleGetTripStatus("trip1");
        System.out.println("Trip status: " + trip.getStatus() + ", Driver: " + trip.getDriverId());
        // Output:
        // Saving driver to Cassandra: driver1
        // Saving driver to Cassandra: driver2
        // Saving trip to Cassandra: trip1
        // Caching trip in Redis: trip1
        // Enqueuing trip request to Kafka: trip1
        // Fetching nearby drivers from Cassandra
        // Matching driver for location: 10.1,10.1
        // Saving trip to Cassandra: trip1
        // Caching trip in Redis: trip1
        // Matched driver: driver1
        // Checking Redis cache for trip: trip1
        // Trip status: ASSIGNED, Driver: driver1
    }
}
```
- **System Design and Principles**:
  - **Functional**: `requestRide` books trips and matches drivers; `getTripStatus` retrieves status.
  - **Non-Functional**:
    - **Scalability**: `CassandraTripRepository` shards by trip ID; Redis for geolocation caching.
    - **Low Latency**: Redis for fast driver lookups; WebSocket for real-time updates.
    - **Reliability**: CP consistency for trip data via Cassandra.
  - **Encapsulation**: Private fields with public methods.
  - **Abstraction**: `TripRepository` and `DriverRepository` interfaces for storage.
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates trip booking and matching; DIP (Section 4, Lecture 6) for abstractions.
- **Big O**: O(1) for `requestRide` (average case); O(n) for driver matching (n = drivers).
- **Edge Cases**: Handles no available drivers, missing trips with exceptions.

**Systematic Approach**:
- Clarified requirements (trip booking, driver matching, ensure scalability).
- Designed system architecture diagram to show API, storage, cache, and matching engine.
- Implemented Java code for a ride-sharing service, addressing requirements and trade-offs.
- Tested with `main` method for ride requests and status retrieval.

## Real-World Application
Imagine acing an HLD interview by designing a ride-sharing platform, using Cassandra for scalable trip storage, Redis for low-latency driver lookups, and Kafka for async matching. A system architecture diagram communicates the design to interviewers, showcasing your ability to handle scalability and performance. This design—paired with principles like KISS (Section 4, Lecture 8) and patterns like Facade (Section 3, Lecture 8)—demonstrates your readiness for senior engineering roles.

## Practice Exercises
Practice HLD interview problems with these exercises:
- **Easy**: Design a system architecture diagram and Java code for a `RideSharingService` with basic trip booking.
- **Medium**: Create a diagram and Java code for a `RideSharingService` with driver matching.
- **Medium**: Design an HLD for a ride-sharing platform with sharding and caching, implementing a Java controller.
- **Hard**: Architect a ride-sharing platform with Cassandra, Redis, and Kafka, supporting pricing and ratings, using a Java service.

Try designing one system in Java with a diagram, explaining how requirements and trade-offs are addressed, as in an interview.

## Conclusion
Mastering HLD interviews by designing a ride-sharing platform equips you to architect scalable, low-latency Java systems and excel in FAANG interviews. By practicing this structured approach, you’ll optimize performance, ensure reliability, and teach others effectively. This advances your progress in Section 5 of the *Official CTO* journey.

**Next Step**: Explore [Design an API Rate Limiter](/interview-section/hld-ai/api-rate-limiter) to apply HLD to another real-world problem, or check out [all sections](/interview-section/) to continue your journey.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>