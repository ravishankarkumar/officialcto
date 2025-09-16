---
title: E-commerce Checkout (Amazon)
description: Design an e-commerce checkout system covering cart, order management, payment, inventory, scalability, and trade-offs.
---

# E-commerce Checkout (Amazon)

Design an e-commerce checkout system that allows users to add products to a cart, place an order, process payments, and manage inventory. This problem tests your ability to design **transactional systems with high availability and scalability**.

---

## 1. Requirements

### Functional
- Browse products, add to cart, update/remove items.  
- Place order → checkout flow.  
- Payment processing (credit card, wallets, etc.).  
- Inventory management (stock updates).  
- Order history, receipts, notifications.  

### Non-functional
- High availability (no downtime).  
- Data consistency (orders must not oversell inventory).  
- Low latency checkout (<2s).  
- Scalability for flash sales (high concurrent users).  

Optional: coupons, recommendations, personalized pricing.

---

## 2. Capacity Estimation (Example)

- 50M DAU, 5% checkout/day → 2.5M orders/day.  
- Seconds/day = 86,400 → ~29 orders/sec avg.  
- Peak factor ×10 → ~300 orders/sec peak.  
- Each order ≈ 1KB → ~2.5GB/day storage.  
- Product catalog ≈ 10M items, ~1KB metadata each → ~10GB.  

---

## 3. High-Level Architecture

1. **Frontend Service** → product browsing, cart UI.  
2. **Cart Service** → manages cart state (in-memory + persistent store).  
3. **Order Service** → validates cart, creates order entry, initiates payment.  
4. **Payment Service** → external payment gateway integration.  
5. **Inventory Service** → checks/reserves stock, decrements on success.  
6. **Notification Service** → send email/SMS/Push confirmations.  
7. **Database Layer** → product catalog DB, orders DB, inventory DB.  
8. **Cache Layer** → Redis/Memcached for hot catalog and cart items.  
9. **Message Queue** → async updates (e.g., Kafka/SQS).  

---

## 4. Checkout Flow

1. User → adds items to cart (Cart Service stores in Redis + DB).  
2. User clicks Checkout → Order Service validates → calls Inventory Service to reserve stock.  
3. Payment Service processes payment via external gateway.  
4. If payment success → confirm order, decrement stock, send notification.  
5. If failure → release reserved stock, notify user.  

---

## 5. Database Design

- **Product Catalog**: SQL/NoSQL DB with product info.  
- **Orders**: relational DB for transactions (Postgres, MySQL).  
- **Inventory**: strong consistency required; may use distributed lock or atomic DB operations.  
- **Cart**: ephemeral, store in Redis with TTL + persistent backup.  

---

## 6. Inventory Management

- Use **pessimistic locking** (reserve stock before checkout).  
- Or **optimistic concurrency** (check stock at commit time).  
- Avoid overselling with atomic DB updates or distributed lock (e.g., Redlock in Redis).  
- For flash sales → use queue + stock counter decrement.  

---

## 7. Payment Handling

- Integrate with gateways (Stripe, PayPal, Razorpay).  
- Use **idempotency keys** to avoid duplicate charges.  
- Support retries with exponential backoff.  
- Store only tokens (PCI compliance).  

---

## 8. Scaling Considerations

- **Catalog**: cache popular items at edge/CDN.  
- **Cart**: store in Redis (fast reads/writes).  
- **Orders**: shard by userID/orderID for scalability.  
- **Inventory**: highly contended; partition by product ID, use atomic counters.  
- **Async workflows**: use event-driven updates for notifications, shipping.  

---

## 9. Monitoring & Metrics

- Order success/failure rates.  
- Payment latency, retries.  
- Inventory consistency (oversell detection).  
- Cart abandonment rate.  

---

## 10. Trade-offs

- **Consistency vs availability**: inventory updates need strong consistency → may sacrifice availability.  
- **Pessimistic vs optimistic locking**: pessimistic avoids oversell but reduces concurrency.  
- **Synchronous vs async notifications**: async better for latency.  
- **SQL vs NoSQL**: orders → SQL for ACID, catalog → NoSQL for scale.  

---

## 11. Extensions

- Personalized recommendations at checkout.  
- Coupons & dynamic pricing.  
- Integration with logistics/shipping.  
- Multi-currency support.  

---

## 12. Interview Tips

- Start with requirements and QPS math.  
- Walk through **checkout flow clearly** (cart → order → payment → inventory → notification).  
- Emphasize strong consistency for inventory.  
- Mention payment idempotency keys.  
- Discuss caching for catalog and cart.  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
