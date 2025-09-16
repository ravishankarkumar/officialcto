---
title: Circuit Breakers, Retries & Timeouts
description: Fault handling patterns in distributed systems — how to use circuit breakers, retries, and timeouts to build resilient systems.
---

# Circuit Breakers, Retries & Timeouts

Failures are inevitable in distributed systems.  
The goal is not to **avoid all failures**, but to **handle them gracefully**.  
Three key patterns for fault handling are **circuit breakers, retries, and timeouts**.

---

## 1. Circuit Breakers

### Concept
- Prevents cascading failures by **stopping requests to failing services**.  
- Inspired by electrical circuit breakers.  

### States
1. **Closed** → normal operation, requests flow.  
2. **Open** → requests blocked (service considered down).  
3. **Half-open** → limited test requests allowed; if succeed → back to closed.  

### Benefits
- Protects system from overload.  
- Fails fast (better UX than long waits).  
- Allows recovery once service is healthy.  

### Example
- Netflix Hystrix (popular circuit breaker library).  
- Resilience4j (Java).  

---

## 2. Retries

### Concept
- Retry failed requests automatically.  
- Useful for transient errors (network blips, timeouts).  

### Best Practices
- Use **exponential backoff** (retry after increasing delays).  
- Add **jitter** (randomness) to avoid thundering herd.  
- Set retry limits to prevent infinite loops.  

### Pitfalls
- Blind retries can worsen overload.  
- Should integrate with circuit breakers.  

---

## 3. Timeouts

### Concept
- Every network call should have a **timeout**.  
- Prevents requests from hanging indefinitely.  

### Best Practices
- Use sensible timeout values per service.  
- Tune based on SLA/latency expectations.  
- Combine with retries for resilience.  

---

## 4. How They Work Together

- **Timeouts** prevent requests from hanging.  
- **Retries** handle transient failures.  
- **Circuit breakers** prevent repeated retries to failing services.  

Together → resilient, self-healing systems.  

---

## 5. Real-World Examples

- **Netflix** → Hystrix for circuit breakers, exponential backoff retries.  
- **AWS SDKs** → built-in retries with backoff.  
- **Google Cloud** → enforces deadlines & timeouts by default.  

---

## 6. Interview Tips

- Always mention these when asked about **resiliency**.  
- Say: *“I’d use timeouts + retries with exponential backoff, plus circuit breakers to prevent overload.”*  
- Show awareness of pitfalls (retry storms, improper timeouts).  

---

## 7. Diagram

```
[ Client ] → Request → [ Service A ]
             (timeout set, retries with backoff)
             If failure persists → [ Circuit Breaker trips ]
```

---

## 8. Next Steps

- Explore [Authentication & Authorization](/sections/hld/security/authentication-authorization.md).  
- Learn about [Monitoring](/sections/hld/observability/monitoring.md).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
