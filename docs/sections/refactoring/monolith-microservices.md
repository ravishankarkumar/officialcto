---
title: Refactoring Case Study - Monolith to Microservices
description: Learn to refactor a monolithic e-commerce platform to microservices using Extract Class, Move Method, and Remove Middle Man, tailored for FAANG interviews.
---

# Refactoring Case Study: Monolith to Microservices

## Overview
Welcome to the seventh and final lecture of **Section 10: Mastering Refactoring** in the *Official CTO* journey! Refactoring a **monolith to microservices** is a critical skill for building scalable, maintainable systems in FAANG environments. In this 25-minute lesson, we explore **Extract Class**, **Move Method**, and **Remove Middle Man** techniques to address code smells like **Divergent Change** and **Inappropriate Intimacy**, as outlined in *Refactoring* by Martin Fowler and *Code Complete 2* (Chapter 24). Using a Java-based example of an e-commerce platform, we’ll prepare you for FAANG interviews and real-world projects. Drawing from my 8+ years of mentoring engineers, this lecture equips you to transition legacy systems effectively. Let’s complete your *Official CTO* journey in Section 10!

Inspired by *Refactoring*, *Code Complete 2*, and Refactoring.Guru, this lesson provides actionable insights and a practical example.

## Learning Objectives
- Master **refactoring techniques**: Extract Class, Move Method, Remove Middle Man.
- Learn to **address Divergent Change and Inappropriate Intimacy** in monolithic systems.
- Prepare for **FAANG interviews** with microservices refactoring questions.
- Apply refactoring in an **e-commerce platform** case study.

## Why Refactoring to Microservices Matters
Refactoring monoliths to microservices enhances scalability, maintainability, and team autonomy, key for FAANG interviews. Drawing from my experience mentoring engineers, I’ve seen microservices refactoring distinguish candidates in system design and leadership roles. This lecture ensures you can modularize codebases, articulate benefits, and align with industry standards.

In software engineering, refactoring to microservices helps you:
- **Ace Interviews**: Demonstrate system design and refactoring skills.
- **Reduce Technical Debt**: Simplify maintenance and scaling.
- **Enhance Scalability**: Enable independent service deployment.
- **Improve Collaboration**: Support team autonomy with modular code.

## Key Concepts
### 1. Extract Class
- **Definition**: Create new classes to separate responsibilities (*Refactoring* by Fowler).
- **Benefits**: Addresses Divergent Change by isolating unrelated logic.
- **Example**: Extract order processing from a monolithic e-commerce class.

### 2. Move Method
- **Definition**: Move methods to appropriate classes for better cohesion (*Refactoring*).
- **Benefits**: Reduces Inappropriate Intimacy by aligning methods with data.
- **Example**: Move payment logic to a dedicated payment service.

### 3. Remove Middle Man
- **Definition**: Eliminate unnecessary intermediaries to simplify interactions (*Refactoring*).
- **Benefits**: Reduces complexity in service communication.
- **Example**: Remove redundant e-commerce manager class.

### 4. Code Smells
- **Divergent Change**: A class changes for unrelated reasons (e.g., order and payment logic).
- **Inappropriate Intimacy**: Classes overly depend on each other’s internals.
- **Fixes**: Use Extract Class and Move Method to modularize.

### 5. Role in FAANG Interviews
- Technical questions test microservices refactoring (e.g., “Refactor this monolith to microservices”).
- Behavioral questions assess experience (e.g., “Tell me about a time you modularized a system”).
- Align with company priorities (e.g., Amazon’s scalability, Netflix’s autonomy).

### 6. Relation to Previous Sections
- **Algorithms** (Section 1): Refactoring clarifies algorithmic logic.
- **OOD** (Section 2): Aligns with cohesive class design.
- **Design Patterns** (Section 3): Supports modular patterns.
- **Design Principles** (Section 4): Builds on SOLID principles.
- **HLD/LLD** (Sections 5–6): Refactoring supports system design (e.g., Mock LLD Interview, Lecture 31).
- **Behavioral Skills** (Section 7): Articulating refactoring builds on communication (Lecture 2).
- **Domain-Specific Topics** (Section 8): Refactoring aligns with microservices (Lecture 7).
- **Clean Code** (Section 9): Builds on readability, modularity, error handling, testability, documentation.
- **Refactoring Intro** (Section 10, Lecture 1): Builds on refactoring goals.
- **Code Smells** (Section 10, Lecture 2): Addresses Divergent Change, Inappropriate Intimacy.
- **Simplifying Code** (Section 10, Lecture 3): Complements simplification techniques.
- **Patterns and Principles** (Section 10, Lecture 4): Builds on SOLID and patterns.
- **Concurrency and Performance** (Section 10, Lecture 5): Supports scalable microservices.

## Code Example: Refactoring an E-commerce Platform
Below is a Java example showing a monolithic e-commerce system with code smells, followed by its refactored microservices version.

### Before Refactoring (Monolith)
```java
public class ECommerceManager {
    private List<Order> orders = new ArrayList<>();
    private Map<String, Double> payments = new HashMap<>();

    public String processOrderAndPayment(String userId, String productId, int quantity, double amount, String paymentDetails) {
        // Validate order
        if (userId == null || productId == null || quantity <= 0 || amount <= 0 || paymentDetails == null) {
            return "Invalid order or payment details";
        }

        // Create order
        Order order = new Order(userId, productId, quantity);
        orders.add(order);

        // Process payment
        String paymentResult = "";
        if (paymentDetails.length() == 16) {
            payments.put(userId + "_" + productId, amount);
            paymentResult = "Payment processed: " + amount;
        } else {
            paymentResult = "Invalid payment details";
        }

        // Log order and payment
        System.out.println("Order: " + order + ", Payment: " + paymentResult);
        return "Order processed: " + order.getId();
    }
}

class Order {
    private final String id;
    private final String userId;
    private final String productId;
    private final int quantity;

    public Order(String userId, String productId, int quantity) {
        this.id = UUID.randomUUID().toString();
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
    }

    public String getId() {
        return id;
    }
}
```

### After Refactoring (Microservices)
```java
/**
 * Manages orders in the e-commerce system.
 */
public class OrderService {
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    /**
     * Creates an order for a user.
     *
     * @param request Order request with user ID, product ID, and quantity
     * @return OrderResult with order details or error
     */
    public OrderResult createOrder(OrderRequest request) {
        if (request == null || request.getUserId() == null || request.getProductId() == null || request.getQuantity() <= 0) {
            return new OrderResult(false, null, "Invalid order details");
        }

        Order order = new Order(UUID.randomUUID().toString(), request.getUserId(), request.getProductId(), request.getQuantity());
        orderRepository.save(order);
        return new OrderResult(true, order.getId(), "Order created");
    }
}

/**
 * Manages payments in the e-commerce system.
 */
public class PaymentService {
    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    /**
     * Processes a payment for an order.
     *
     * @param request Payment request with user ID, order ID, amount, and details
     * @return PaymentResult with payment status or error
     */
    public PaymentResult processPayment(PaymentRequest request) {
        if (request == null || request.getUserId() == null || request.getOrderId() == null || request.getAmount() <= 0 || request.getPaymentDetails() == null) {
            return new PaymentResult(false, "Invalid payment details");
        }

        if (request.getPaymentDetails().length() != 16) {
            return new PaymentResult(false, "Invalid payment details");
        }

        paymentRepository.save(request.getUserId(), request.getOrderId(), request.getAmount());
        return new PaymentResult(true, "Payment processed: " + request.getAmount());
    }
}

/**
 * Represents an order request.
 */
public class OrderRequest {
    private final String userId;
    private final String productId;
    private final int quantity;

    public OrderRequest(String userId, String productId, int quantity) {
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
    }

    public String getUserId() { return userId; }
    public String getProductId() { return productId; }
    public int getQuantity() { return quantity; }
}

/**
 * Represents a payment request.
 */
public class PaymentRequest {
    private final String userId;
    private final String orderId;
    private final double amount;
    private final String paymentDetails;

    public PaymentRequest(String userId, String orderId, double amount, String paymentDetails) {
        this.userId = userId;
        this.orderId = orderId;
        this.amount = amount;
        this.paymentDetails = paymentDetails;
    }

    public String getUserId() { return userId; }
    public String getOrderId() { return orderId; }
    public double getAmount() { return amount; }
    public String getPaymentDetails() { return paymentDetails; }
}

/**
 * Represents an order.
 */
public class Order {
    private final String id;
    private final String userId;
    private final String productId;
    private final int quantity;

    public Order(String id, String userId, String productId, int quantity) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
    }

    public String getId() { return id; }
}

/**
 * Represents an order result.
 */
public class OrderResult {
    private final boolean isSuccessful;
    private final String orderId;
    private final String message;

    public OrderResult(boolean isSuccessful, String orderId, String message) {
        this.isSuccessful = isSuccessful;
        this.orderId = orderId;
        this.message = message;
    }

    public boolean isSuccessful() { return isSuccessful; }
    public String getOrderId() { return orderId; }
    public String getMessage() { return message; }
}

/**
 * Represents a payment result.
 */
public class PaymentResult {
    private final boolean isSuccessful;
    private final String message;

    public PaymentResult(boolean isSuccessful, String message) {
        this.isSuccessful = isSuccessful;
        this.message = message;
    }

    public boolean isSuccessful() { return isSuccessful; }
    public String getMessage() { return message; }
}

interface OrderRepository {
    void save(Order order);
}

interface PaymentRepository {
    void save(String userId, String orderId, double amount);
}
```

### Unit Tests
```java
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class OrderServiceTest {
    private OrderRepository orderRepository;
    private OrderService orderService;

    @BeforeEach
    void setUp() {
        orderRepository = mock(OrderRepository.class);
        orderService = new OrderService(orderRepository);
    }

    @Test
    void testCreateOrder_Success() {
        OrderRequest request = new OrderRequest("user123", "product456", 2);
        OrderResult result = orderService.createOrder(request);

        assertTrue(result.isSuccessful());
        assertNotNull(result.getOrderId());
        verify(orderRepository).save(any(Order.class));
    }

    @Test
    void testCreateOrder_InvalidRequest() {
        OrderRequest request = new OrderRequest(null, "product456", 2);
        OrderResult result = orderService.createOrder(request);

        assertFalse(result.isSuccessful());
        assertEquals("Invalid order details", result.getMessage());
    }
}

class PaymentServiceTest {
    private PaymentRepository paymentRepository;
    private PaymentService paymentService;

    @BeforeEach
    void setUp() {
        paymentRepository = mock(PaymentRepository.class);
        paymentService = new PaymentService(paymentRepository);
    }

    @Test
    void testProcessPayment_Success() {
        PaymentRequest request = new PaymentRequest("user123", "order789", 100.0, "1234567890123456");
        PaymentResult result = paymentService.processPayment(request);

        assertTrue(result.isSuccessful());
        assertEquals("Payment processed: 100.0", result.getMessage());
        verify(paymentRepository).save("user123", "order789", 100.0);
    }

    @Test
    void testProcessPayment_InvalidDetails() {
        PaymentRequest request = new PaymentRequest("user123", "order789", 100.0, "123");
        PaymentResult result = paymentService.processPayment(request);

        assertFalse(result.isSuccessful());
        assertEquals("Invalid payment details", result.getMessage());
    }
}
```

- **Explanation**:
  - **Before Refactoring**: The monolithic `ECommerceManager` has Divergent Change (handles orders and payments) and Inappropriate Intimacy (tightly coupled logic).
  - **After Refactoring**:
    - **Extract Class**: Splits into `OrderService` and `PaymentService` to separate responsibilities.
    - **Move Method**: Moves payment logic to `PaymentService`.
    - **Remove Middle Man**: Eliminates `ECommerceManager` as an unnecessary intermediary.
  - **Test-Driven**: Unit tests ensure behavior preservation (*Refactoring* by Fowler).
  - **Improvements**: Enhances scalability, maintainability, and team autonomy.
- **Setup**:
  - Add dependencies: `org.junit.jupiter:junit-jupiter`, `org.mockito:mockito-core`.
  - Run tests with `mvn test` or an IDE.
- **Big O**: O(1) for order and payment operations (excluding repository calls).
- **Edge Cases**: Handles null requests, invalid inputs, and payment failures.
- **Trade-Offs**: Microservices for scalability vs. monolith for simplicity; separate services for autonomy vs. single class for cohesion.

## FAANG-Specific Tips
- **Amazon (Ownership)**:
  - Highlight ownership in refactoring (e.g., “I modularized a monolith”).
  - Emphasize scalability (e.g., “Enabled scalable e-commerce services”).
  - STAR Response:
    - **Situation**: “Our e-commerce monolith was hard to scale.”
    - **Task**: “I was responsible for refactoring.”
    - **Action**: “I applied Extract Class and Move Method to create microservices.”
    - **Result**: “Improved scalability, reducing deployment time by 30%.”
- **Google (Clarity)**:
  - Focus on Google’s Java Style Guide (e.g., “I refactored for clear services”).
  - Emphasize collaboration (e.g., “Aligned with team on microservices”).
  - STAR Response:
    - **Situation**: “Our monolith had unclear logic.”
    - **Task**: “I was tasked with refactoring.”
    - **Action**: “I used Extract Class per Google’s style guide, collaborating on reviews.”
    - **Result**: “Improved clarity, praised by team.”
- **Meta (Execution Speed)**:
  - Highlight rapid refactoring (e.g., “I refactored in a sprint”).
  - Focus on maintainability (e.g., “Enabled faster updates”).
  - STAR Response:
    - **Situation**: “Our monolith slowed development.”
    - **Task**: “I was responsible for refactoring.”
    - **Action**: “I quickly applied Move Method and Remove Middle Man.”
    - **Result**: “Reduced maintenance time by 25%.”
- **Netflix (Freedom & Responsibility)**:
  - Emphasize autonomous refactoring (e.g., “I independently modularized code”).
  - Focus on high-impact outcomes (e.g., “Improved service autonomy”).
  - STAR Response:
    - **Situation**: “Our monolith hindered team autonomy.”
    - **Task**: “I was responsible for improvements.”
    - **Action**: “I independently applied Extract Class and Move Method.”
    - **Result**: “Enabled independent deployments, boosting autonomy.”

## Practice Exercise
**Problem**: Refactor a monolithic e-commerce system to microservices.
1. **Define Requirements**:
   - Apply Extract Class, Move Method, and Remove Middle Man.
   - Ensure behavior preservation with unit tests.
2. **Craft a STAR Response**:
   - **Situation**: Describe a project with a monolithic codebase (e.g., e-commerce platform).
   - **Task**: Clarify your role (e.g., code refactorer).
   - **Action**: List 2–3 actions (e.g., extracted classes, moved methods).
   - **Result**: Quantify outcomes (e.g., improved scalability, reduced maintenance).
3. **Write Refactored Code**:
   - Refactor a Java class into microservices using specified techniques.
   - Write unit tests to verify behavior.
   - Test with `mvn test`.
4. **Tailor to a FAANG Company**:
   - Align with Amazon (Ownership), Google (Clarity), Meta (speed), or Netflix (autonomy).
5. **Write and Review**:
   - Write a 100–150 word STAR response.
   - Ensure clarity, specificity, and alignment with microservices refactoring principles.

**Sample Response (Netflix - Freedom & Responsibility)**:
- **Situation**: “Our e-commerce monolith hindered team autonomy.”
- **Task**: “As lead, I was responsible for refactoring.”
- **Action**: “I independently applied Extract Class and Move Method to create order and payment microservices, ensuring test coverage.”
- **Result**: “Enabled independent deployments, improving team autonomy by 30%.”

## Conclusion
Mastering refactoring from monolith to microservices equips you to excel in FAANG interviews and build scalable systems. This lecture completes Section 10, building on refactoring goals, code smells, simplification, patterns, concurrency, and advanced techniques from Lectures 1–6, advancing your *Official CTO* journey.

**Next Step**: Revisit [all sections](/sections/) to explore other topics or refine your skills.

---

<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>