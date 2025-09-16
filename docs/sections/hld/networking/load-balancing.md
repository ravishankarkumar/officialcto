---
title: Load Balancing — L4 vs L7, Algorithms
description: Understanding load balancing in distributed systems, differences between Layer 4 and Layer 7, common algorithms, and interview trade-offs.
---

# Load Balancing — L4 vs L7, Algorithms

Load balancing ensures traffic is distributed across multiple servers, improving **availability, scalability, and reliability**.  
In system design, you’ll often mention **load balancers (LBs)** early when discussing horizontal scaling.

---

## 1. Why Load Balancing?

- Prevents a single server from being overwhelmed.  
- Improves throughput and reduces latency.  
- Enables fault tolerance (if one server dies, traffic is rerouted).  
- Provides flexibility (rolling upgrades, canary deployments).  

---

## 2. L4 vs L7 Load Balancing

### Layer 4 (Transport Layer)
- Works at **TCP/UDP level**.  
- Forwards packets without inspecting content.  
- Very fast, low overhead.  

**Examples**: AWS NLB, HAProxy (TCP mode).  

**Use cases**: raw TCP/UDP traffic, gaming servers, VoIP.  

---

### Layer 7 (Application Layer)
- Works at **HTTP/HTTPS level**.  
- Can inspect request content (headers, paths, cookies).  
- Allows smart routing (e.g., `/api` → API servers, `/static` → CDN).  

**Examples**: AWS ALB, Nginx, Envoy, Traefik.  

**Use cases**: web applications, APIs, microservices.  

---

## 3. Load Balancing Algorithms

### 3.1 Round Robin
- Cycles through servers sequentially.  
- Simple and fair if servers are similar.  
- Weakness: doesn’t account for server load differences.  

---

### 3.2 Least Connections
- Routes to server with the fewest active connections.  
- Good for variable request lengths.  
- Can overload fastest servers if traffic is uneven.  

---

### 3.3 Weighted Round Robin
- Assigns weights to servers (e.g., Server A = 2× capacity).  
- Requests distributed proportionally.  

---

### 3.4 Consistent Hashing
- Routes based on hash of client (e.g., `userID % N`).  
- Ensures same client/request goes to same server.  
- Useful for caching & session stickiness.  
- Weakness: requires rebalancing when servers change.  

---

### 3.5 Random
- Randomly selects a backend.  
- Surprisingly effective in some scenarios.  

---

## 4. Advanced Load Balancing Features

- **Health checks**: detect and remove unhealthy servers.  
- **Sticky sessions**: keep user bound to one server (not ideal for scaling).  
- **SSL termination**: decrypt TLS at LB, offload CPU from servers.  
- **Rate limiting**: throttle abusive clients.  
- **Global load balancing**: route to nearest region (DNS-based, Anycast).  

---

## 5. Trade-offs & Interview Tips

- **L4 vs L7**:  
  - L4 is faster, less flexible.  
  - L7 is smarter, more expensive.  
- **Algorithm choice**:  
  - Round robin → uniform traffic.  
  - Least connections → variable workloads.  
  - Consistent hashing → caching/session workloads.  
- Always mention **health checks + failover**.  
- For global scale: mention **CDNs + DNS load balancing**.  

---

## 6. Diagram (Conceptual)

```
        Client Requests
              |
        +-----+-----+
        | Load Balancer |
        +-----+-----+
        |           |
   Server A     Server B
```

---

## 7. Next Steps

- Explore [CDNs & Edge Computing](/sections/hld/networking/cdns-edge.md).  
- Learn about [Event-driven Architectures](/sections/hld/scalability/event-driven.md).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
