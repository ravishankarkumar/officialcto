---
title: CDN Caching
description: Understanding how Content Delivery Networks (CDNs) cache static and dynamic content, reduce latency, and improve scalability in distributed systems.
---

# CDN Caching

When users are **geographically distributed**, latency becomes a major problem.  
Even if your backend responds in milliseconds, network hops across continents can add hundreds of milliseconds.  

**Content Delivery Networks (CDNs)** solve this by caching content at **edge locations closer to users**.

---

## 1. What is a CDN?

A **CDN (Content Delivery Network)** is a globally distributed network of edge servers that cache content.  
Users are routed to the nearest edge node, reducing latency and offloading traffic from origin servers.

### Typical flow
1. User requests a resource (image, video, API).  
2. Request goes to nearest CDN edge node.  
3. If **cache hit** → return cached content.  
4. If **cache miss** → fetch from origin → cache at edge → return to user.  

---

## 2. What Can CDNs Cache?

- **Static Content**  
  - HTML, CSS, JS, images, videos, downloads.  
- **Dynamic Content (with rules)**  
  - API responses, GraphQL queries, personalized pages (with cache keys, cookies, headers).  
- **Edge Compute**  
  - Some CDNs (e.g., Cloudflare Workers, AWS Lambda@Edge) can run code at edge.  

---

## 3. CDN Caching Strategies

### 3.1 Cache-Control Headers
- `Cache-Control: max-age=3600` → cache for 1 hour.  
- `Cache-Control: no-cache` → validate before serving.  
- `Cache-Control: no-store` → don’t cache.  

### 3.2 Content Invalidation
- Purge cache manually (e.g., after product update).  
- Invalidate based on URL patterns, keys, or tags.  

### 3.3 Cache Keys
- Define what makes a response unique (e.g., `/product?id=123&lang=en`).  
- Can include query params, cookies, or headers.  

### 3.4 Stale-While-Revalidate
- Serve stale content immediately.  
- In background, fetch fresh content and update cache.  

---

## 4. Benefits of CDN Caching

- **Lower latency** → serve from nearby edge.  
- **Reduced load** on origin servers.  
- **Higher availability** (CDNs often absorb DDoS).  
- **Scalability**: handle sudden traffic spikes (product launches, viral videos).  
- **Cost savings**: fewer requests hitting origin.  

---

## 5. Limitations & Pitfalls

- **Personalized content** is harder to cache.  
- **Stale content** may be served if invalidation fails.  
- **Cache stampede**: many requests miss cache at same time → origin overload.  
- **Cost**: CDNs charge for data transfer.  

---

## 6. Example Use Cases

- Video streaming (Netflix, YouTube).  
- Static websites (CDNs like Vercel, Netlify).  
- E-commerce product images.  
- News sites with traffic spikes.  
- Global SaaS applications serving APIs worldwide.  

---

## 7. Interview Tips

- Always mention CDNs when talking about **global scalability**.  
- State that CDNs reduce **latency + origin load**.  
- Be aware of **cache invalidation strategies**.  
- Mention **edge computing** for modern use cases.  

---

## 8. Next Steps

- Learn about [Cache Invalidation & Hot Keys](/sections/hld/caching/pitfalls.md).  
- Explore [Load Balancing in Networking](/sections/hld/networking/load-balancing.md).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
