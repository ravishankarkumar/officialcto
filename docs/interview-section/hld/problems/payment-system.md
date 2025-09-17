---
title: Payment System Design
description: Design a payment system covering flows, consistency, fraud prevention, scalability, and trade-offs.
---

# Payment System

Design a payment system that allows users to pay securely, integrates with banks and third-party gateways, and ensures consistency and fraud protection. This problem tests your ability to design **strongly consistent, secure, and fault-tolerant systems**.

---

## 1. Requirements

### Functional
- Initiate and process payments (credit/debit cards, wallets, bank transfers).  
- Support refunds and chargebacks.  
- Handle multiple currencies.  
- Generate receipts and transaction history.  
- Integrate with external gateways (Visa, Mastercard, PayPal, Stripe).  

### Non-functional
- High availability (99.99%).  
- Strong consistency (no double spending).  
- Low latency (<2s).  
- PCI-DSS compliance, encryption.  
- Fraud detection and prevention.  

Optional: recurring payments, split payments, loyalty points.

---

## 2. Payment Flow

1. User initiates payment via client.  
2. Payment Service creates transaction entry (pending).  
3. Validate payment details (card number, balance, limits).  
4. Call external gateway/bank API → authorization/settlement.  
5. If success → mark transaction success, update balances, notify user.  
6. If failure → rollback transaction, notify user.  
7. Store transaction log for reconciliation.  

---

## 3. High-Level Architecture

- **API Gateway** → entry point for payment requests.  
- **Payment Service** → core logic, idempotent APIs.  
- **Ledger/Transaction DB** → strongly consistent DB for transactions.  
- **Fraud Detection Service** → real-time checks on transactions.  
- **Notification Service** → receipts, alerts.  
- **Reconciliation Service** → batch settlement with banks/gateways.  
- **External Gateways** → Visa, MasterCard, PayPal, etc.  

---

## 4. Database Design

- **Ledger DB**: append-only transaction records (ACID, SQL).  
- **User Accounts DB**: balances, wallets.  
- **Idempotency Keys**: ensure retries don’t duplicate transactions.  
- **Audit Logs**: immutable history for compliance.  

---

## 5. Scaling Strategies

- **Partition transactions** by userID/merchantID.  
- **Async processing** for reconciliation/settlement.  
- **Caching** for exchange rates, merchant configs.  
- **High availability** with replication, failover.  

---

## 6. Security Considerations

- PCI-DSS compliance (don’t store raw card data).  
- Encrypt sensitive data (at rest + in transit).  
- Tokenization for cards.  
- Rate limiting and anomaly detection.  
- 2FA for high-value transactions.  

---

## 7. Fraud Detection

- Rules-based (velocity limits, geolocation mismatch).  
- ML-based (anomaly detection, user behavior).  
- Blacklists and device fingerprinting.  
- Real-time blocking or flagging.  

---

## 8. Monitoring & Metrics

- Transaction success/failure rates.  
- Gateway latency and errors.  
- Fraud false positives/negatives.  
- Reconciliation mismatches.  

---

## 9. Trade-offs

- **Strong consistency vs availability**: payments need strong consistency, may sacrifice availability.  
- **Synchronous vs async settlement**: sync = instant confirmation but slower; async = faster UX but eventual settlement.  
- **Fraud strictness vs false positives**: tighter checks reduce fraud but may block legit transactions.  

---

## 10. Extensions

- Support recurring/subscription billing.  
- Multi-currency wallets.  
- Split payments between merchants.  
- Loyalty programs.  

---

## 11. Real-world Examples

- **Stripe**: APIs, idempotency keys, global reliability.  
- **PayPal**: fraud detection systems at scale.  
- **Visa/MasterCard**: global settlement networks.  

---

## 12. Interview Tips

- Emphasize **idempotency** and **strong consistency**.  
- Draw payment flow with gateway interaction.  
- Call out PCI compliance and fraud detection.  
- Discuss trade-offs in sync vs async settlement.  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
