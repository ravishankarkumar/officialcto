---
title: CDN Basics
description: This article provides a clear and comprehensive overview of Content Delivery Networks (CDNs), explaining their purpose, architecture, and benefits. It’s designed for system design interviews and engineers seeking to understand how CDNs improve web performance and scalability.
image: /images/cg_cdn.png
---

# CDN Basics

This article provides a clear and comprehensive overview of **Content Delivery Networks (CDNs)**, explaining their purpose, architecture, and benefits. It’s designed for system design interviews and engineers seeking to understand how CDNs improve web performance and scalability.

![CDN](/images/cg_cdn.png)

## What is a CDN?
A **Content Delivery Network (CDN)** is a distributed network of servers strategically placed across multiple geographic locations to deliver web content (e.g., HTML, images, videos, scripts) to users with low latency and high reliability. CDNs cache content closer to users, reducing the distance data travels and alleviating load on origin servers.

### Key Functions
- **Content Caching**: Stores copies of static content (e.g., images, CSS, videos) on **edge servers** near users.
- **Load Balancing**: Distributes traffic across multiple servers to prevent overloading.
- **Latency Reduction**: Serves content from the nearest server to minimize round-trip time (RTT).
- **Scalability**: Handles traffic spikes by distributing requests across the network.
- **Security**: Provides features like DDoS protection and Web Application Firewalls (WAFs).



## How CDNs Work
CDNs operate by caching content at **edge servers** and intelligently routing user requests to the nearest or most optimal server. Here’s the process:

### CDN Workflow
1. **User Request**:
   - A user accesses a website (e.g., `www.example.com`) via a browser.
   - The browser sends a DNS query to resolve the domain, which is routed to the CDN’s DNS system.

2. **DNS Resolution**:
   - The CDN’s DNS returns the IP address of an **edge server** closest to the user (using **anycast** or geolocation-based routing).
   - This ensures the request goes to a server with low latency.

3. **Edge Server Response**:
   - If the requested content (e.g., an image) is cached on the edge server (**cache hit**), it’s delivered immediately.
   - If not cached (**cache miss**), the edge server fetches the content from the **origin server** (the website’s main server), caches it, and delivers it to the user.

4. **Content Delivery**:
   - The edge server sends the content to the user, often optimized (e.g., compressed images, minified scripts).
   - Cached content is stored for future requests, respecting the **TTL (Time to Live)** set by the origin server.

5. **Origin Server Offloading**:
   - The origin server handles only cache misses or dynamic content (e.g., API responses), reducing its load.

### Example
- A user in Tokyo requests `www.example.com/image.jpg`.
- The CDN routes the request to a Tokyo edge server.
- If cached, the image is served instantly; if not, the edge server fetches it from the origin (e.g., in New York), caches it, and serves it.



## CDN Architecture
CDNs consist of several key components:

- **Edge Servers**: Servers located in **Points of Presence (PoPs)** worldwide, caching and serving content to users.
- **Origin Server**: The primary server hosting the website’s content, serving as the source for uncached or dynamic content.
- **DNS System**: Routes user requests to the nearest edge server using techniques like **anycast** or **GeoDNS**.
- **Content Management**: Tools to configure caching rules, TTLs, and content optimization.
- **Security Layer**: Features like DDoS mitigation, WAFs, and TLS termination for HTTPS.

### Caching Strategies
- **Static Content**: Cache assets like images, CSS, and JavaScript with long TTLs.
- **Dynamic Content**: Use techniques like **Edge Side Includes (ESI)** or dynamic caching for personalized content.
- **Purge Mechanisms**: Allow manual or automated cache invalidation when content updates.
- **Prefetching**: Proactively cache content based on predicted user behavior.



## Benefits of CDNs
- **Reduced Latency**: Content served from nearby edge servers minimizes RTT, improving page load times.
- **Improved Scalability**: Handles traffic spikes (e.g., during sales or viral events) by distributing load.
- **Enhanced Reliability**: Multiple edge servers ensure availability even if some fail or the origin server is down.
- **Bandwidth Savings**: Offloads traffic from the origin server, reducing hosting costs.
- **Security Enhancements**: Mitigates DDoS attacks, enforces HTTPS, and filters malicious traffic via WAFs.
- **Global Reach**: Serves users worldwide efficiently with geographically distributed PoPs.



## Challenges of CDNs
- **Cache Invalidation**: Updating cached content (e.g., after a website change) can be delayed by TTLs.
- **Dynamic Content**: CDNs are less effective for highly personalized or frequently changing content.
- **Cost**: While bandwidth costs decrease, CDN services (e.g., Cloudflare, Akamai) have subscription or usage fees.
- **Configuration Complexity**: Misconfigured caching or security rules can cause issues (e.g., stale content, blocked legitimate users).
- **Dependency**: Reliance on third-party CDNs introduces potential points of failure or vendor lock-in.



## Common CDN Providers
- **Cloudflare**: Offers CDN, DDoS protection, WAF, and DNS services.
- **Akamai**: Enterprise-grade CDN with extensive PoPs and advanced security.
- **Amazon CloudFront**: Integrated with AWS, ideal for dynamic and static content.
- **Fastly**: Focuses on real-time content delivery and edge computing.
- **Microsoft Azure CDN**: Integrated with Azure services for scalability.



## Real-World Context
- **Interview Relevance**: System design interviews often involve CDNs in scenarios like “Design a scalable video streaming platform.” Explain how CDNs reduce latency, handle traffic, and integrate with DNS or load balancers.
- **Practical Use**: CDNs are critical for websites, e-commerce, streaming services (e.g., Netflix, YouTube), and APIs, ensuring fast and reliable content delivery.
- **Modern Trends**:
  - **Edge Computing**: CDNs are evolving to run lightweight compute tasks (e.g., Cloudflare Workers, Fastly Compute@Edge).
  - **Zero Trust Security**: Integrating CDNs with zero-trust models for secure access.
  - **Dynamic Content Acceleration**: Techniques like dynamic caching and prefetching improve performance for personalized content.



## Further Reading
- *Computer Networking: A Top-Down Approach* by Kurose & Ross
- Cloudflare’s Learning Center on CDNs and Edge Computing
- AWS CloudFront Documentation
- Blogs from Akamai, Fastly, and Cloudflare on CDN advancements