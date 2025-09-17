---
title: APIs — REST vs GraphQL
description: Understanding REST and GraphQL APIs, their trade-offs, use cases, and interview tips for high-level design.
---

# APIs — REST vs GraphQL

APIs are the backbone of communication between clients and servers.  
In system design, you’ll often be asked: **“Would you use REST or GraphQL?”**.  
Both are widely used, but they solve different problems.

---

## 1. REST (Representational State Transfer)

- Resource-based API style.  
- Endpoints map to resources (`/users`, `/orders`, `/products`).  
- Uses HTTP verbs: `GET`, `POST`, `PUT`, `DELETE`.  
- Data usually in JSON.  

### Pros
- Simple and widely adopted.  
- Easy to cache (HTTP caching, CDNs).  
- Strong separation of concerns.  
- Mature tooling (Postman, Swagger, OpenAPI).  

### Cons
- Over-fetching: client may get more data than needed.  
- Under-fetching: may require multiple API calls to get all data.  
- Fixed endpoints, less flexible.  

### Best for
- CRUD-style applications.  
- Systems where caching is important (e.g., e-commerce product APIs).  
- Simpler architectures with well-defined resources.  

---

## 2. GraphQL

- Query language for APIs, developed by Facebook.  
- Single endpoint (`/graphql`).  
- Clients specify exactly what data they need.  
- Strongly typed schema.  

### Pros
- No over-fetching or under-fetching — client gets exactly what it requests.  
- Great for mobile/slow networks (efficient data transfer).  
- Strong typing improves client/server contract.  
- Good for aggregating data from multiple sources.  

### Cons
- Harder to cache (queries are dynamic).  
- More complex to implement.  
- Can result in expensive queries if not rate-limited.  
- Tooling still evolving compared to REST.  

### Best for
- Complex applications with diverse clients (web, iOS, Android).  
- Systems where bandwidth efficiency is important.  
- Aggregating data from multiple backends.  

---

## 3. REST vs GraphQL Comparison

| Feature         | REST                     | GraphQL                  |
|-----------------|--------------------------|--------------------------|
| Data fetching   | Fixed endpoints, may over/under-fetch | Flexible, exact data |
| Number of calls | Often multiple            | Usually one               |
| Caching         | Easy with HTTP/CDN       | Harder, needs custom logic |
| Schema          | Implicit (docs-driven)   | Explicit, strongly typed  |
| Complexity      | Simpler to implement     | More complex to implement |
| Tooling         | Mature (OpenAPI, Swagger)| Improving (Apollo, Relay) |

---

## 4. Hybrid Approaches

- Some companies use **both**.  
- REST for simple resources (good caching).  
- GraphQL for complex data aggregation.  

Example:  
- Twitter uses REST for most APIs, GraphQL for some modern clients.  

---

## 5. Interview Tips

- Don’t say “GraphQL is always better.” Show trade-offs.  
- If caching/CDN is critical → **REST**.  
- If flexibility and mobile optimization matter → **GraphQL**.  
- Mention **security concerns** (GraphQL queries can be too deep → need query depth limiting).  
- Say: *“I’d start with REST for simplicity, but if clients need flexible queries, I’d consider GraphQL.”*  

---

## 6. Next Steps

- Learn about [Load Balancing](/interview-section/hld/networking/load-balancing.md).  
- Explore [CDNs & Edge Computing](/interview-section/hld/networking/cdns-edge.md).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
