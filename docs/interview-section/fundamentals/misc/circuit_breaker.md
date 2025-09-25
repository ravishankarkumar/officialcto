---
title: Circuit Breaker Pattern
description: A short overview of the Circuit Breaker pattern in distributed systems, explaining its purpose, states, and benefits.
---

# Circuit Breaker Pattern

The **Circuit Breaker Pattern** is a resilience design pattern used in **distributed systems** and **microservices** to prevent cascading failures when a dependent service is unavailable or slow.



## Why It’s Needed
In microservices, one failing service can overload others if retries keep happening. Without control, this may lead to **system-wide outages**.



## How It Works
A circuit breaker acts like an **electrical fuse**:

1. **Closed State**  
   - Requests flow normally.  
   - Failures are monitored.  

2. **Open State**  
   - After a threshold of failures is reached, the breaker "opens."  
   - Requests fail fast without calling the service.  

3. **Half-Open State**  
   - After a cooldown, a limited number of test requests are allowed.  
   - If successful → back to **Closed**.  
   - If failing → stay **Open**.


## Benefits
- **Fail Fast**: Prevents wasting resources on failing services.  
- **Stability**: Stops cascading failures across microservices.  
- **Recovery**: Gradually restores requests when services recover.  


## Example (Java – Resilience4j)
```java
CircuitBreaker circuitBreaker = CircuitBreaker.ofDefaults("serviceA");

Supplier<String> decoratedSupplier = 
  CircuitBreaker.decorateSupplier(circuitBreaker, () -> callRemoteService());

String result = Try.ofSupplier(decoratedSupplier)
                  .recover(throwable -> "Fallback response")
                  .get();
```

## Real-World Usage
- Netflix Hystrix (legacy, now replaced by Resilience4j).
- Resilience4j for Java microservices.
- Spring Cloud supports circuit breakers in distributed systems.

## Interview Tip

If asked in a system design interview:
*“How would you prevent cascading failures when a microservice is down?”* → Mention the Circuit Breaker Pattern with fallback logic.