---
title: REST Architecture
description: Learn the principles of REST architecture, its constraints, benefits, and real-world applications, with examples of REST APIs for system design interviews and scalable web applications.
image: /images/cg_rest.png

---

# REST Architecture

The **Representational State Transfer (REST)** architecture is one of the most widely used styles for designing **networked applications**. REST provides a set of architectural constraints that enable scalable, reliable, and stateless communication between clients and servers. Today, REST underpins most web APIs, from social media platforms to enterprise-grade distributed systems.


## What is REST?
REST is an **architectural style** for building **distributed systems**, introduced by **Roy Fielding** in his 2000 doctoral dissertation.  

The key idea is to treat everything as a **resource** (e.g., a user, a document, an order), which can be uniquely identified by a **URI** and manipulated using a **uniform interface** (typically HTTP methods like `GET`, `POST`, `PUT`, and `DELETE`).

![REST Architecture](/images/cg_rest.png)


## Core Principles of REST
REST is guided by six core architectural constraints:

### 1. **Client-Server**
- Separation of concerns: The client (frontend) is decoupled from the server (backend).
- Example: A React frontend calling a Node.js REST API.

### 2. **Statelessness**
- Each request from the client contains all necessary information (no stored session on the server).
- Example: Each API call includes an **Authorization token**.

### 3. **Cacheability**
- Responses must explicitly indicate whether they are cacheable.
- Example: HTTP headers (`Cache-Control`, `ETag`) allow browsers to reuse responses.

### 4. **Uniform Interface**
- A standard, consistent way of interacting with resources.
- Example: 
  - `GET /users/1` → Fetch user with ID=1.
  - `POST /users` → Create a new user.

### 5. **Layered System**
- Clients don’t know if they’re connected directly to the server or through intermediaries (e.g., load balancers, proxies).
- Example: Using **CDNs** in front of REST APIs.

### 6. **Code on Demand (Optional)**
- Servers can return executable code (like JavaScript) to clients.
- Rarely used, but still part of REST’s definition.



## RESTful Resource Representation
- **Resources**: Anything identifiable (users, products, orders).
- **URIs**: Each resource has a unique URI.
  - Example: `/api/v1/products/42`
- **Representations**: Resources can be represented in formats like **JSON**, **XML**, or **HTML**.

### Example: JSON Response
```json
{
  "id": 42,
  "name": "Wireless Mouse",
  "price": 19.99,
  "in_stock": true
}
```



## RESTful HTTP Methods
REST leverages HTTP methods to perform actions on resources:

| Method   | Description                        | Example Endpoint       |
|----------|------------------------------------|------------------------|
| **GET**  | Retrieve resource(s)              | `GET /users/1`         |
| **POST** | Create a new resource             | `POST /users`          |
| **PUT**  | Update a resource (replace fully) | `PUT /users/1`         |
| **PATCH**| Update a resource (partial)       | `PATCH /users/1`       |
| **DELETE** | Remove a resource               | `DELETE /users/1`      |



## Example REST API Workflow
Imagine an **e-commerce system** with resources like `users`, `products`, and `orders`.

1. **Create User**:  
   `POST /users` → Creates a new user.  

2. **List Products**:  
   `GET /products` → Returns all products.  

3. **Place Order**:  
   `POST /orders` → Places a new order.  

4. **Update Order**:  
   `PUT /orders/123` → Updates order #123.  

5. **Cancel Order**:  
   `DELETE /orders/123` → Deletes order #123.  



## Benefits of REST
- **Simplicity**: Easy to understand and widely adopted.
- **Scalability**: Statelessness and cacheability make it scalable.
- **Flexibility**: Supports multiple representations (JSON, XML).
- **Interoperability**: Works across different platforms and languages.
- **Performance**: Caching reduces repeated server load.



## Challenges of REST
- **Over-fetching & Under-fetching**: Clients may get too much or too little data.
- **Statelessness Overhead**: Each request must include all context.
- **Complex Transactions**: REST struggles with multi-step, atomic operations.
- **Versioning**: Managing evolving APIs can be tricky (`/api/v1/...` vs `/api/v2/...`).



## REST vs Alternatives
| Feature            | REST             | GraphQL                  | gRPC                |
|--------------------|------------------|--------------------------|---------------------|
| **Style**          | Resource-based   | Query-based              | RPC-based           |
| **Data Fetching**  | Fixed endpoints  | Flexible queries          | Contracts (Protobuf)|
| **Performance**    | Moderate         | Efficient for clients     | High (binary)       |
| **Use Case**       | General APIs     | Mobile apps, dashboards   | Microservices       |



## Security Considerations
- **Authentication**: Use OAuth2 or JWT for stateless authentication.
- **Rate Limiting**: Prevent abuse with throttling.
- **HTTPS**: Always encrypt requests/responses.
- **Input Validation**: Prevent SQL injection, XSS, etc.



## Real-World Context
- **Interviews**: Commonly asked in system design rounds — “Design a REST API for X.”
- **Industry Use**: REST APIs power Google Maps, Twitter, GitHub, and countless services.
- **Best Practices**:
  - Use **plural nouns** for resources (`/users` not `/getUser`).
  - Provide meaningful HTTP status codes (e.g., `200 OK`, `404 Not Found`).
  - Document APIs with **OpenAPI/Swagger**.



## Further Reading
- *RESTful Web APIs* by Leonard Richardson
- Roy Fielding’s Dissertation: [Architectural Styles and the Design of Network-based Software Architectures](https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm)
- Swagger/OpenAPI Documentation
