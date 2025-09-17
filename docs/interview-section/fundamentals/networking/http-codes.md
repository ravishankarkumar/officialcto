---
title: Common HTTP Status Codes
description: Overview of HTTP status codes (2xx, 3xx, 4xx, 5xx), their meanings, and real-world examples.
---

# Common HTTP Status Codes

When a client (browser, API client) makes a request to a server, the server responds with a **status code**.  
These codes are **standardized** by the HTTP specification and tell us the **result of the request**.  

---

## 1. Structure of HTTP Codes

- **3-digit numbers** grouped by category:  

| Code Range | Category         | Meaning                               |
|------------|------------------|---------------------------------------|
| 1xx        | Informational    | Request received, processing continues|
| 2xx        | Success          | Request was successful                |
| 3xx        | Redirection      | Further action needed (redirects)     |
| 4xx        | Client Error     | Bad request from the client           |
| 5xx        | Server Error     | Server failed to fulfill request      |

---

## 2. Success Codes (2xx)

- **200 OK** → Request succeeded.  
- **201 Created** → New resource created (e.g., POST /users).  
- **204 No Content** → Success, but no response body.  

---

## 3. Redirection Codes (3xx)

- **301 Moved Permanently** → Resource moved, update bookmarks.  
- **302 Found** → Temporary redirect.  
- **304 Not Modified** → Use cached version, no need to re-download.  

---

## 4. Client Error Codes (4xx)

- **400 Bad Request** → Invalid request syntax.  
- **401 Unauthorized** → Authentication required.  
- **403 Forbidden** → Authenticated, but not allowed.  
- **404 Not Found** → Resource doesn’t exist.  
- **429 Too Many Requests** → Rate limiting applied.  

---

## 5. Server Error Codes (5xx)

- **500 Internal Server Error** → Generic server failure.  
- **502 Bad Gateway** → Upstream server returned invalid response.  
- **503 Service Unavailable** → Server overloaded or down for maintenance.  
- **504 Gateway Timeout** → Upstream server didn’t respond in time.  

---

## 6. Interview Tips

- Be ready to explain **404 vs 403 vs 401** (common confusion).  
- For **performance/system design** interviews, mention:  
  - **304** helps reduce bandwidth (cache).  
  - **429** is critical for **rate limiting APIs**.  
- **5xx** errors → usually infra issue, **4xx** → client issue.  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
