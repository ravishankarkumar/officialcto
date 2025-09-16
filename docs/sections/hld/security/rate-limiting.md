---
title: Rate Limiting & Throttling
description: How rate limiting and throttling protect distributed systems from abuse, overuse, and ensure fair resource allocation.
---

# Rate Limiting & Throttling

Distributed systems need to protect themselves from **abuse, overload, and uneven usage**.  
Two key techniques are **rate limiting** and **throttling**.

---

## 1. Rate Limiting

### Concept
- Restricts the **number of requests per user/IP/service** in a given time window.  
- Prevents abuse (e.g., brute force login, API spamming).  

### Algorithms
1. **Fixed Window**  
   - Allow X requests per second/minute.  
   - Simple but can allow bursts at window edges.  

2. **Sliding Window**  
   - Tracks requests in rolling intervals.  
   - Smoother than fixed window.  

3. **Token Bucket**  
   - Tokens added at fixed rate.  
   - Each request consumes a token.  
   - Allows bursts within limits.  

4. **Leaky Bucket**  
   - Requests flow at constant rate.  
   - Excess requests dropped.  

---

## 2. Throttling

### Concept
- Slows down requests when usage exceeds threshold.  
- Instead of blocking, adds **delays or reduced priority**.  

### Example
- Streaming service reduces video quality if bandwidth is limited.  
- API may degrade response speed under heavy load.  

---

## 3. Use Cases

- **APIs** → prevent one user from hogging resources.  
- **Login systems** → prevent brute force attacks.  
- **Databases** → protect from overload.  
- **Streaming/CDNs** → adaptive throttling under load.  

---

## 4. Real-World Examples

- **NGINX / Envoy** → built-in rate limiting modules.  
- **Cloudflare / AWS API Gateway** → configurable per-client rate limits.  
- **Twitter API** → strict per-user and per-app limits.  

---

## 5. Interview Tips

- Say: *“I’d use rate limiting to prevent abuse and throttling to gracefully handle overload.”*  
- Mention algorithms (token bucket, leaky bucket).  
- Tie to security (prevent DDoS) and fairness (all clients get share).  

---

## 6. Diagram

```
[ Client Requests ] → [ Rate Limiter ] → [ Service ]
```

- Excess requests dropped (rate limit) or delayed (throttle).  

---

## 7. Next Steps

- Learn about [DDoS Protection](/sections/hld/security/ddos.md).  
- Explore [Monitoring](/sections/hld/observability/monitoring.md).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
