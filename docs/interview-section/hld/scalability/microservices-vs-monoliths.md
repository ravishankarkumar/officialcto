---
title: Microservices vs Monoliths
description: Comparing monolithic and microservice architectures, their trade-offs, and when to use them in system design.
---

# Microservices vs Monoliths

When scaling applications, one of the most common architectural decisions is whether to build a **monolith** or adopt **microservices**.  
Both have trade-offs, and in system design interviews, you should show awareness of when to use which.

---

## 1. Monolithic Architecture

### What It Is
- Entire application packaged and deployed as a single unit.  
- All modules (UI, business logic, database access) run together.  

### Advantages
- **Simplicity**: easier to develop, test, deploy.  
- **Performance**: no network calls between modules.  
- **Good for small teams/startups**.  

### Disadvantages
- **Scalability bottlenecks**: can only scale whole app, not modules independently.  
- **Tight coupling**: small change may require redeploying entire app.  
- **Harder to adopt new tech**: locked into stack.  
- **Slows down large teams**.  

### Example
- Early versions of Instagram, Twitter (Rails monoliths).  

---

## 2. Microservices Architecture

### What It Is
- Application broken into **independent services**.  
- Each service handles a specific domain (auth, payments, search).  
- Services communicate via APIs (HTTP, gRPC, messaging).  

### Advantages
- **Independent scaling**: scale heavy services separately (e.g., payments).  
- **Tech flexibility**: each service can use best tech stack.  
- **Fault isolation**: one service failure doesn’t crash entire system.  
- **Faster team velocity**: teams own different services.  

### Disadvantages
- **Complexity**: distributed systems overhead (network, failures, monitoring).  
- **Operational overhead**: CI/CD, observability, infra automation required.  
- **Data consistency challenges**: transactions across services are hard.  
- **Latency**: inter-service network calls add delay.  

### Example
- Netflix: hundreds of microservices for streaming, recommendations, billing.  
- Uber: moved from monolith to microservices at scale.  

---

## 3. Monolith vs Microservices — Comparison

| Feature          | Monolith                        | Microservices                  |
|------------------|---------------------------------|--------------------------------|
| Development      | Simple, fast for small teams    | Complex, requires coordination |
| Deployment       | Single unit                     | Independent services           |
| Scaling          | Entire app                      | Per-service scaling            |
| Fault isolation  | Entire app affected             | Localized failures             |
| Tech stack       | One unified stack               | Polyglot possible              |
| Ops complexity   | Low                             | High (monitoring, orchestration) |

---

## 4. Real-World Strategy

- **Start with a monolith** → fastest to build MVP.  
- **Evolve into microservices** when scale/complexity demands.  
- Many companies adopt a **modular monolith** as middle ground:  
  - Well-structured modules inside monolith.  
  - Easier migration to microservices later.  

---

## 5. Interview Tips

- Never say “always use microservices.”  
- Show awareness of trade-offs: *“I’d start with a monolith for speed, but migrate to microservices as the team/system scales.”*  
- Mention **DevOps maturity**: microservices only work well with strong CI/CD, monitoring, and automation.  
- Call out **data consistency** challenges in microservices.  

---

## 6. Next Steps

- Learn about [Event-driven Architectures](/interview-section/hld/scalability/event-driven.md).  
- Explore [CAP Theorem & PACELC](/interview-section/hld/distributed/cap-pacelc.md).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
