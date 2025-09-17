---
title: HTTP & HTTPS Basics
description: Introduction to HTTP and HTTPS protocols, how they work, their differences, and why they are important.
---

# HTTP & HTTPS Basics

The **HyperText Transfer Protocol (HTTP)** powers the web.  
It defines how clients (like browsers) and servers exchange data.  

Its secure version, **HTTPS**, ensures safe communication using encryption.  

---

## 1. What is HTTP?

- HTTP is a **stateless, application-layer protocol**.  
- It defines how **requests** (from client) and **responses** (from server) are structured.  
- Works on **port 80** (default).  

### Structure of HTTP
1. **Request**: method, path, headers, optional body.  
   - Example:  
     ```
     GET /index.html HTTP/1.1
     Host: example.com
     ```
2. **Response**: status code, headers, body.  
   - Example:  
     ```
     HTTP/1.1 200 OK
     Content-Type: text/html
     <html>...</html>
     ```

### Common Methods
- **GET** → retrieve data.  
- **POST** → send data.  
- **PUT** → update resource.  
- **DELETE** → remove resource.  

---

## 2. What is HTTPS?

- HTTPS = HTTP + **SSL/TLS encryption**.  
- Works on **port 443**.  
- Ensures:  
  - **Confidentiality** → data is encrypted.  
  - **Integrity** → data not tampered with.  
  - **Authentication** → verifies server identity with certificates.  

### TLS Handshake (Simplified)
1. Client says: *"I want to talk securely."*  
2. Server provides **SSL certificate**.  
3. Client verifies certificate.  
4. Keys exchanged → secure channel established.  

---

## 3. Key Differences: HTTP vs HTTPS

| Feature        | HTTP                   | HTTPS                           |
|----------------|------------------------|---------------------------------|
| Port           | 80                     | 443                             |
| Security       | None                   | Encrypted with TLS              |
| Certificates   | Not required           | Requires SSL/TLS certificate    |
| Performance    | Slightly faster (no TLS)| Modern TLS is optimized, overhead minimal |
| SEO / Ranking  | Neutral                | Favored by search engines       |

---

## 4. Real-World Importance

- Modern browsers **mark HTTP sites as “Not Secure”**.  
- HTTPS is **mandatory** for:  
  - Payments, logins, personal data.  
  - APIs, cloud services.  
- Tools like **Let’s Encrypt** make SSL free.  

---

## 5. Interview Tips

- If asked *“How does HTTPS work?”*:  
  - Mention **TLS handshake**, encryption, certificates.  
- If asked *“Why not HTTP?”*:  
  - Say: *Because data can be intercepted (MITM attack).*  
- Good analogy: HTTP is a **postcard** (anyone can read), HTTPS is a **sealed envelope**.  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
