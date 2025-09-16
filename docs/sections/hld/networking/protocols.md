---
title: Networking Protocols — HTTP, HTTPS, gRPC, WebSockets
description: Overview of HTTP/HTTPS, gRPC, and WebSockets for high-level design interviews and scalable systems.
---

# Networking Protocols — HTTP, HTTPS, gRPC, WebSockets

Every distributed system relies on **network protocols** to communicate between clients, servers, and services.  
In system design interviews, you should know the trade-offs between **HTTP, HTTPS, gRPC, and WebSockets**.

---

## 1. HTTP

- **Hypertext Transfer Protocol** — foundation of web communication.  
- Request/response model: client sends request, server responds.  
- Stateless by default (each request independent).  

### Features
- Human-readable text-based format.  
- Widely supported (browsers, APIs).  
- Simple to debug.  

### Limitations
- Verbose (larger payloads).  
- Overhead of headers.  
- Not ideal for high-performance or streaming use cases.  

---

## 2. HTTPS

- Secure version of HTTP using **TLS encryption**.  
- Ensures **confidentiality, integrity, and authenticity**.  
- Mandatory for modern applications (SEO ranking, browser requirements).  

### Interview Tip
Always assume **HTTPS by default** unless explicitly told otherwise.  
Say: *“I’ll use HTTPS for secure communication.”*  

---

## 3. gRPC

- **gRPC (Google Remote Procedure Call)** — high-performance RPC framework.  
- Uses **HTTP/2** under the hood.  
- Data encoded in **Protocol Buffers (Protobuf)** (binary, compact).  

### Features
- Bi-directional streaming supported.  
- Faster and smaller payloads compared to JSON/HTTP APIs.  
- Strong typing via `.proto` definitions.  
- Good for service-to-service (microservices) communication.  

### Limitations
- Not human-readable (harder to debug).  
- Browser support limited (usually needs a proxy).  
- Steeper learning curve than REST.  

### Use Cases
- Microservices in high-performance systems.  
- Real-time systems (chat, IoT, data pipelines).  

---

## 4. WebSockets

- Protocol enabling **persistent, full-duplex communication** between client and server.  
- Unlike HTTP (request/response), WebSockets allow **server to push data** to clients.  

### Features
- Single TCP connection stays open.  
- Low-latency, real-time updates.  
- Supported in browsers and backend servers.  

### Limitations
- More complex than stateless HTTP.  
- Scaling requires sticky sessions or external pub/sub.  
- Not suitable for every use case (extra infra complexity).  

### Use Cases
- Chat apps (WhatsApp Web, Slack).  
- Live dashboards (trading apps, monitoring).  
- Multiplayer games.  
- Collaborative editing (Google Docs).  

---

## 5. Comparison Table

| Protocol   | Style              | Performance | Use Case |
|------------|--------------------|-------------|----------|
| HTTP       | Request/response   | Moderate    | Simple APIs, websites |
| HTTPS      | Request/response   | Moderate    | Secure web, all production APIs |
| gRPC       | RPC over HTTP/2    | High        | Microservices, streaming, IoT |
| WebSockets | Full-duplex stream | Very High   | Chat, gaming, real-time apps |

---

## 6. Interview Tips

- Always default to **HTTPS** for security.  
- Mention **gRPC** for microservices when performance/efficiency matters.  
- Mention **WebSockets** for real-time, bi-directional apps.  
- Clarify trade-offs: *“If debugging and browser support are priorities, I’d stick with REST/HTTP. For efficiency, I’d use gRPC.”*  

---

## 7. Next Steps

- Explore [APIs: REST vs GraphQL](/sections/hld/networking/apis.md).  
- Learn about [Load Balancing](/sections/hld/networking/load-balancing.md).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
