---
title: HTTP & HTTPS Basics
description: A factual overview of HTTP and HTTPS protocols, their methods, differences, and evolution across versions (1.0, 1.1, 2, 3).
---

# HTTP & HTTPS Basics

The **HyperText Transfer Protocol (HTTP)** powers the modern web.  
It defines how clients (browsers, apps) and servers communicate by exchanging **requests** and **responses**.  

Its secure counterpart, **HTTPS**, adds encryption and authentication through **TLS (Transport Layer Security)**.  


## 1. What is HTTP?

- **Protocol**: Application-layer, stateless.  
- **Default port**: 80.  
- **Model**: Request → Response.  

### Structure
- **Request**: method, path, headers, optional body.  
- **Response**: status line, headers, body.  

Example:  

**Request**
```
GET /index.html HTTP/1.1
Host: example.com
```

**Response**
```
HTTP/1.1 200 OK
Content-Type: text/html
<html>...</html>
```


## 2. HTTP Methods (Complete List)

HTTP defines several methods, each with a specific purpose:

| Method     | Description                                                                 |
|------------|-----------------------------------------------------------------------------|
| **GET**    | Retrieve a resource.                                                        |
| **HEAD**   | Retrieve headers only (no body). Useful for metadata checks.                |
| **POST**   | Submit data to a resource (e.g., form submission).                          |
| **PUT**    | Create or replace a resource at a given URI.                                |
| **DELETE** | Remove a resource.                                                          |
| **PATCH**  | Apply partial modifications to a resource.                                  |
| **OPTIONS**| Query server for supported methods and capabilities.                        |
| **TRACE**  | Debugging method that echoes the received request.                          |
| **CONNECT**| Establish a tunnel (often used for HTTPS through an HTTP proxy).            |


## 3. What is HTTPS?

- **Definition**: HTTP + **TLS/SSL encryption**.  
- **Default port**: 443.  
- **Guarantees**:  
  - **Confidentiality** → encrypted data.  
  - **Integrity** → prevents tampering.  
  - **Authentication** → verifies server identity via certificates.  

### Simplified TLS Handshake
1. Client requests secure session.  
2. Server provides SSL/TLS certificate.  
3. Client validates certificate.  
4. Both negotiate session keys.  
5. All HTTP traffic is encrypted.  


## 4. HTTP vs HTTPS

| Feature        | HTTP                          | HTTPS                           |
|----------------|-------------------------------|---------------------------------|
| Port           | 80                            | 443                             |
| Security       | None                          | Encrypted with TLS              |
| Certificates   | Not required                  | Requires SSL/TLS certificate    |
| Performance    | Slightly faster (legacy view) | Modern TLS is highly optimized  |
| Browser Label  | "Not Secure"                  | Padlock 🔒 + “Secure”           |
| SEO Ranking    | Neutral                       | Favored by Google               |


## 5. HTTP Versions

### **HTTP/1.0 (1996)**
- Each request/response required a new TCP connection.  
- Very inefficient for multiple resources (HTML, CSS, JS).  

### **HTTP/1.1 (1997)**
- Introduced **persistent connections** (keep-alive).  
- Added **chunked transfer encoding**, caching headers, and pipelining.  
- Became the dominant version for decades.  

### **HTTP/2 (2015)**
- Based on **binary framing** (not text).  
- **Multiplexing** → multiple requests over a single connection.  
- **Header compression (HPACK)** for efficiency.  
- Server push capability.  
- Significant performance improvements.  

### **HTTP/3 (2022)**
- Runs over **QUIC (UDP-based)** instead of TCP.  
- Faster handshakes and lower latency.  
- Built-in encryption (TLS 1.3).  
- Designed for modern internet usage (mobile networks, video streaming).  


## 6. Real-World Importance

- Modern browsers **mark HTTP sites as insecure**.  
- HTTPS is **mandatory** for:  
  - Online banking, e-commerce, logins.  
  - APIs, mobile apps, cloud services.  
- Free SSL options exist (e.g., **Let’s Encrypt**).  


## 7. Interview Notes

- *“How does HTTPS work?”* → Mention **TLS handshake**, **certificates**, and **encryption**.  
- *“Why not HTTP?”* → Say: *Because it exposes traffic to interception and tampering (MITM attacks).*  
- *“Which HTTP version is fastest today?”* → **HTTP/3**, due to QUIC over UDP.  


<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
