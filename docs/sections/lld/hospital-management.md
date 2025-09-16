---
title: Design a Hospital Management System
description: Learn low-level system design for a hospital management system in Java, focusing on patient and appointment management for scalable, robust applications.
---

# Design a Hospital Management System

## Overview
Welcome to the twenty-fifth lecture of **Section 6: Low-Level System Design** in the *Official CTO* journey! Designing a hospital management system is a practical LLD problem that tests your ability to model complex resource and user interactions using OOP principles. In this 25-minute lesson, we explore the **low-level design of a hospital management system**, covering patient management, appointment scheduling, and related functionality like booking and canceling appointments. Whether building a hospital management application or preparing for FAANG interviews, this lecture equips you to design modular, scalable systems. Let’s dive into LLD and continue the journey to becoming a better engineer!

Inspired by *Clean Architecture*, *Design Patterns*, and *Refactoring*, this lesson provides a practical Java example with a UML diagram and practice exercises, aligning with OOP principles and industry standards.

## Learning Objectives
- Understand **low-level design** principles for a hospital management system with patient and appointment management.
- Learn to model **classes**, **relationships**, and **functionality** in Java.
- Apply **OOP principles** (Section 2, Lecture 1), **design patterns** (Section 3), **design principles** (Section 4), and **HLD concepts** (Section 5) to LLD.
- Write clean, modular Java code (Section 9).

## Why Hospital Management System Design Matters
A hospital management system is a valuable LLD exercise that tests your ability to model complex interactions like patient records and appointment scheduling, common in FAANG interviews. Drawing from my experience designing resource management systems, I’ve applied OOP principles to ensure maintainability and scalability in similar applications. This lecture prepares you to design robust systems and articulate your approach clearly, showcasing your mentorship skills.

In software engineering, hospital management system design helps you:
- **Model Complex Systems**: Represent patients, doctors, and appointments.
- **Ensure Scalability**: Handle multiple patients and schedules.
- **Improve Maintainability**: Create modular, testable code.
- **Teach Effectively**: Share practical LLD strategies.

## Key Concepts
### 1. Hospital Management System Components
- **Patient Management**: Track patient details (e.g., ID, name, medical history).
- **Appointment Scheduling**: Manage doctor-patient appointments with time slots.
- **Functionality**:
  - Register patients and doctors.
  - Book and cancel appointments.
  - List available time slots.
- **Edge Cases**: Overlapping appointments, unavailable doctors, invalid patient data.

### 2. Design Patterns
- **Singleton Pattern** (Section 3, Lecture 1): For hospital system instance.
- **Strategy Pattern** (Section 3, Lecture 4): For scheduling strategies (extensible).
- **Observer Pattern** (Section 3, Lecture 6): For notifying appointment updates.

### 3. Relation to Previous Sections
- **OOP** (Section 2, Lecture 1): Encapsulation and inheritance for patient and appointment classes.
- **Design Patterns** (Section 3): Singleton, Strategy, and Observer patterns.
- **Design Principles** (Section 4): SoC (Lecture 11) separates patient and appointment logic; KISS (Lecture 8) simplifies design.
- **HLD** (Section 5):
  - Ticket Booking System (Lecture 17): Similar reservation concepts.
  - LLD Intro (Lecture 1): Builds on class design.
  - Database Design (Lecture 2): Persisting patient and appointment data.
  - API Design (Lecture 3): Exposing hospital controls.
  - Concurrency Handling (Lecture 4): Thread-safe appointment booking.
  - Error Handling (Lecture 5): Handling invalid inputs.
  - Parking Lot (Lecture 6): Similar resource management.
  - Elevator System (Lecture 7): Similar state-driven design.
  - Vending Machine (Lecture 8): Similar operation logic.
  - ATM Machine (Lecture 9): Similar transactional design.
  - Restaurant Management (Lecture 10): Similar reservation system.
  - Library Management (Lecture 11): Similar resource tracking.
  - Chess Game (Lecture 12): Similar rule enforcement.
  - Tic-Tac-Toe (Lecture 13): Similar logic.
  - Snake and Ladder (Lecture 14): Similar mechanics.
  - Deck of Cards (Lecture 15): Similar entity management.
  - LRU Cache (Lecture 16): Similar data structure usage.
  - Rate Limiter (Lecture 17): Similar operation control.
  - Text Editor (Lecture 18): Similar operation management.
  - Movie Ticket Booking (Lecture 19): Similar resource allocation.
  - File System (Lecture 20): Similar hierarchical structure.
  - Logger (Lecture 21): Similar operation logging.
  - URL Parser (Lecture 22): Similar data processing.
  - Q&A System (Lecture 23): Similar user interaction modeling.
  - Traffic Light Controller (Lecture 24): Similar state-driven design.
- **Clean Code** (Section 9): Meaningful names for classes and methods.

### 4. Use Case
Design a hospital management system for a hospital, supporting patient registration, doctor scheduling, and appointment management.

## System Design
### Architecture
```
[Client] --> [HospitalController]
                |
                v
            [HospitalService]
                |
                v
           [Hospital] --> [Patient] --> [Appointment]
                          [Doctor]
```

- **Classes**:
  - `Patient`: Represents patient details.
  - `Doctor`: Represents doctor details and availability.
  - `Appointment`: Manages appointment details (patient, doctor, time).
  - `Hospital`: Singleton managing patients, doctors, and appointments.
  - `HospitalService`: Handles business logic.
  - `HospitalController`: Exposes API.
- **Functionality**: Register patients/doctors, book/cancel appointments, list available slots.
- **Trade-Offs**:
  - Scheduling: First-come-first-serve (simple, suboptimal) vs. priority-based (complex, efficient).
  - Storage: In-memory (fast, volatile) vs. database (persistent, slower).

## Code Example: Hospital Management System
Below is a Java implementation of a hospital management system with patient and appointment management.

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Custom exceptions
public class HospitalException extends Exception {
    public HospitalException(String message) {
        super(message);
    }
}

// Patient class
public class Patient {
    private String patientId;
    private String name;

    public Patient(String patientId, String name) {
        this.patientId = patientId;
        this.name = name;
    }

    public String getPatientId() {
        return patientId;
    }

    public String getName() {
        return name;
    }
}

// Doctor class
public class Doctor {
    private String doctorId;
    private String name;
    private List<Long> availableSlots;

    public Doctor(String doctorId, String name) {
        this.doctorId = doctorId;
        this.name = name;
        this.availableSlots = new ArrayList<>();
        // Initialize sample slots (epoch times)
        long currentTime = System.currentTimeMillis();
        for (int i = 0; i < 5; i++) {
            availableSlots.add(currentTime + (i * 3600_000)); // Hourly slots
        }
    }

    public String getDoctorId() {
        return doctorId;
    }

    public List<Long> getAvailableSlots() {
        return new ArrayList<>(availableSlots);
    }

    public void bookSlot(long slotTime) throws HospitalException {
        if (!availableSlots.contains(slotTime)) {
            throw new HospitalException("Slot not available: " + slotTime);
        }
        availableSlots.remove(slotTime);
    }

    public void releaseSlot(long slotTime) {
        availableSlots.add(slotTime);
    }
}

// Appointment class
public class Appointment {
    private String appointmentId;
    private String patientId;
    private String doctorId;
    private long slotTime;

    public Appointment(String appointmentId, String patientId, String doctorId, long slotTime) {
        this.appointmentId = appointmentId;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.slotTime = slotTime;
    }

    public String getAppointmentId() {
        return appointmentId;
    }

    public String getPatientId() {
        return patientId;
    }

    public String getDoctorId() {
        return doctorId;
    }

    public long getSlotTime() {
        return slotTime;
    }
}

// Hospital class (Singleton)
public class Hospital {
    private static Hospital instance;
    private Map<String, Patient> patients;
    private Map<String, Doctor> doctors;
    private Map<String, Appointment> appointments;

    private Hospital() {
        this.patients = new HashMap<>();
        this.doctors = new HashMap<>();
        this.appointments = new HashMap<>();
    }

    public static Hospital getInstance() {
        if (instance == null) {
            instance = new Hospital();
        }
        return instance;
    }

    public void addPatient(Patient patient) throws HospitalException {
        if (patients.containsKey(patient.getPatientId())) {
            throw new HospitalException("Patient already exists: " + patient.getPatientId());
        }
        patients.put(patient.getPatientId(), patient);
    }

    public void addDoctor(Doctor doctor) throws HospitalException {
        if (doctors.containsKey(doctor.getDoctorId())) {
            throw new HospitalException("Doctor already exists: " + doctor.getDoctorId());
        }
        doctors.put(doctor.getDoctorId(), doctor);
    }

    public Patient getPatient(String patientId) {
        return patients.get(patientId);
    }

    public Doctor getDoctor(String doctorId) {
        return doctors.get(doctorId);
    }

    public void addAppointment(Appointment appointment) throws HospitalException {
        if (appointments.containsKey(appointment.getAppointmentId())) {
            throw new HospitalException("Appointment already exists: " + appointment.getAppointmentId());
        }
        appointments.put(appointment.getAppointmentId(), appointment);
    }

    public Appointment getAppointment(String appointmentId) {
        return appointments.get(appointmentId);
    }

    public void removeAppointment(String appointmentId) {
        appointments.remove(appointmentId);
    }
}

// Service layer
public class HospitalService {
    private final Hospital hospital;

    public HospitalService(Hospital hospital) {
        this.hospital = hospital;
    }

    public void registerPatient(String patientId, String name) throws HospitalException {
        hospital.addPatient(new Patient(patientId, name));
        System.out.println("Registered patient: " + name);
    }

    public void registerDoctor(String doctorId, String name) throws HospitalException {
        hospital.addDoctor(new Doctor(doctorId, name));
        System.out.println("Registered doctor: " + name);
    }

    public List<Long> getAvailableSlots(String doctorId) throws HospitalException {
        Doctor doctor = hospital.getDoctor(doctorId);
        if (doctor == null) {
            throw new HospitalException("Doctor not found: " + doctorId);
        }
        return doctor.getAvailableSlots();
    }

    public String bookAppointment(String appointmentId, String patientId, String doctorId, long slotTime) throws HospitalException {
        Patient patient = hospital.getPatient(patientId);
        Doctor doctor = hospital.getDoctor(doctorId);
        if (patient == null) {
            throw new HospitalException("Patient not found: " + patientId);
        }
        if (doctor == null) {
            throw new HospitalException("Doctor not found: " + doctorId);
        }
        doctor.bookSlot(slotTime);
        Appointment appointment = new Appointment(appointmentId, patientId, doctorId, slotTime);
        hospital.addAppointment(appointment);
        System.out.println("Booked appointment: " + appointmentId);
        return appointmentId;
    }

    public void cancelAppointment(String appointmentId) throws HospitalException {
        Appointment appointment = hospital.getAppointment(appointmentId);
        if (appointment == null) {
            throw new HospitalException("Appointment not found: " + appointmentId);
        }
        Doctor doctor = hospital.getDoctor(appointment.getDoctorId());
        if (doctor == null) {
            throw new HospitalException("Doctor not found: " + appointment.getDoctorId());
        }
        doctor.releaseSlot(appointment.getSlotTime());
        hospital.removeAppointment(appointmentId);
        System.out.println("Cancelled appointment: " + appointmentId);
    }
}

// Controller for API interactions
public class HospitalController {
    private final HospitalService service;

    public HospitalController(HospitalService service) {
        this.service = service;
    }

    public void handleRegisterPatient(String patientId, String name) {
        try {
            service.registerPatient(patientId, name);
        } catch (HospitalException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public void handleRegisterDoctor(String doctorId, String name) {
        try {
            service.registerDoctor(doctorId, name);
        } catch (HospitalException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    public List<Long> handleGetAvailableSlots(String doctorId) {
        try {
            return service.getAvailableSlots(doctorId);
        } catch (HospitalException e) {
            System.err.println("Error: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    public String handleBookAppointment(String appointmentId, String patientId, String doctorId, long slotTime) {
        try {
            return service.bookAppointment(appointmentId, patientId, doctorId, slotTime);
        } catch (HospitalException e) {
            System.err.println("Error: " + e.getMessage());
            return null;
        }
    }

    public void handleCancelAppointment(String appointmentId) {
        try {
            service.cancelAppointment(appointmentId);
        } catch (HospitalException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}

// Client to demonstrate usage
public class HospitalClient {
    public static void main(String[] args) {
        Hospital hospital = Hospital.getInstance();
        HospitalService service = new HospitalService(hospital);
        HospitalController controller = new HospitalController(service);

        // Normal flow
        controller.handleRegisterPatient("p1", "Alice");
        controller.handleRegisterDoctor("d1", "Dr. Smith");
        List<Long> slots = controller.handleGetAvailableSlots("d1");
        System.out.println("Available slots: " + slots.size());
        controller.handleBookAppointment("a1", "p1", "d1", slots.get(0));
        controller.handleCancelAppointment("a1");

        // Edge cases
        controller.handleBookAppointment("a2", "p2", "d1", slots.get(0)); // Invalid patient
        controller.handleBookAppointment("a2", "p1", "d2", slots.get(0)); // Invalid doctor
        controller.handleBookAppointment("a2", "p1", "d1", System.currentTimeMillis() + 100); // Invalid slot
        controller.handleCancelAppointment("a3"); // Invalid appointment
        // Output:
        // Registered patient: Alice
        // Registered doctor: Dr. Smith
        // Available slots: 5
        // Booked appointment: a1
        // Cancelled appointment: a1
        // Error: Patient not found: p2
        // Error: Doctor not found: d2
        // Error: Slot not available: <timestamp>
        // Error: Appointment not found: a3
    }
}
```
- **LLD Principles**:
  - **Patient Management**: `Patient` stores patient details.
  - **Appointment Scheduling**: `Doctor` manages slots; `Appointment` links patients and doctors.
  - **Classes**: `Patient`, `Doctor`, `Appointment`, `Hospital`, `HospitalService`, `HospitalController`.
  - **Design Patterns**: Singleton (`Hospital`), Strategy (extensible scheduling), Observer (extensible for notifications).
  - **Clean Code**: Meaningful names, modularity (Section 9).
  - **Design Principles**: SoC (Section 4, Lecture 11) separates patient and appointment logic; DIP (Section 4, Lecture 6) for extensibility.
- **Big O**: O(1) for `addPatient`, `addDoctor`, `bookAppointment` (HashMap); O(n) for slot checking (n = slots).
- **Edge Cases**: Handles invalid patients, doctors, slots, and appointments.

**UML Diagram**:
```
[Client] --> [HospitalController]
                |
                v
            [HospitalService]
                |
                v
           [Hospital]
                |
                v
           [Patient] --> [Appointment]
           [Doctor]
```

## Real-World Application
Imagine designing a hospital management system for a hospital, supporting patient registration and appointment scheduling with modular design. This LLD—aligned with HLD principles from Section 5 (e.g., Ticket Booking System, Lecture 17)—ensures scalability and reliability, critical for healthcare systems.

## Practice Exercises
Practice hospital management system design with these exercises:
- **Easy**: Design a UML diagram and Java code for a simple patient registration system.
- **Medium**: Implement a hospital system with patient and appointment booking.
- **Medium**: Design an LLD for a hospital system with doctor scheduling and slot management.
- **Hard**: Architect a hospital system with Java, integrating multiple design patterns (e.g., Strategy, Observer).

Try designing one system in Java with a UML diagram, explaining patient and appointment management.

## Conclusion
Mastering the design of a hospital management system equips you to build modular, scalable Java systems, enhancing your LLD skills. This lecture builds on HLD concepts and reservation system principles, preparing you for FAANG interviews and real-world applications.

**Next Step**: Explore [Design a Parking lot System](/sections/lld/parking-lot) to continue your LLD journey, or check out [all sections](/sections/).

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>