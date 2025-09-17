---
title: Graceful Degradation in Distributed Systems
description: How to design systems that continue providing partial functionality during failures — graceful degradation strategies.
---

# Graceful Degradation

When systems fail, they shouldn’t fail completely.  
**Graceful degradation** means continuing to provide **partial service** rather than a full outage.  

---

## 1. Why Graceful Degradation?

- Improves user experience during failures.  
- Maintains business continuity (some features still usable).  
- Builds resilience into large-scale systems.  

---

## 2. Examples of Graceful Degradation

1. **E-commerce**  
   - Checkout service down → users can still browse products.  
   - Payment fallback (retry later, or alternate gateway).  

2. **Streaming (Netflix, YouTube)**  
   - HD unavailable → fallback to SD video.  
   - Continue serving cached recommendations if backend is slow.  

3. **Social Media**  
   - Feed service down → still allow posting or messaging.  
   - Show cached timeline if live updates unavailable.  

4. **Maps & Navigation**  
   - Live traffic unavailable → still show static map.  

---

## 3. Strategies for Graceful Degradation

- **Caching**: serve stale data if fresh data unavailable.  
- **Fallbacks**: switch to backup systems or reduced functionality.  
- **Feature flags**: disable non-critical features dynamically.  
- **Partial results**: return partial data instead of failing request.  
- **Circuit breakers**: avoid cascading failures by cutting off failing dependencies.  

---

## 4. Benefits vs Trade-offs

| Benefit                   | Trade-off                |
|----------------------------|--------------------------|
| Improves availability      | Users may see outdated data |
| Reduces downtime impact    | Extra complexity to design |
| Enhances resilience        | Not always possible for critical features |

---

## 5. Real-World Systems

- **Netflix** → Chaos Engineering tests ensure services degrade gracefully.  
- **Amazon** → continues product browsing even if recommendation service fails.  
- **Slack** → allows messaging even when file uploads fail.  

---

## 6. Interview Tips

- Always mention graceful degradation for **resiliency questions**.  
- Say: *“If payment fails, system should still let users browse products.”*  
- Tie to user experience: *“Better a degraded system than a down system.”*  
- Mention feature prioritization (critical vs optional).  

---

## 7. Diagram

```
   [ Normal Service ] → All features work.
   [ Failure Detected ] → Non-critical features disabled, core continues.
```

---

## 8. Next Steps

- Learn about [Circuit Breakers, Retries, Timeouts](/interview-section/hld/reliability/circuit-breakers.md).  
- Explore [Authentication & Authorization](/interview-section/hld/security/authentication-authorization.md).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
