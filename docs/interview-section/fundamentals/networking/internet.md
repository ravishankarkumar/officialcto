---
title: How the Internet Works
description: A high-level overview of how the internet works — covering DNS, IP addressing, routing, and NAT.
---

# How the Internet Works (DNS, IP, Routing, NAT)

The internet is a massive network of **networks**.  
When you type `www.example.com` in your browser, many systems work together to deliver the page back to you.  

This article covers the **core building blocks**: DNS, IP addresses, routing, and NAT.

---

## 1. DNS (Domain Name System)

- Humans prefer names like `google.com`, but computers use IP addresses.  
- **DNS translates domain names → IP addresses.**  
- Example:  
  - `www.google.com` → `142.250.183.68`.  

### DNS Process
1. Browser checks **local cache**.  
2. Asks **DNS resolver** (usually your ISP or 8.8.8.8).  
3. Resolver queries **root servers** → **TLD servers** → **authoritative servers**.  
4. IP address returned to browser.  

---

## 2. IP Addressing

Every device on the internet needs a unique identifier.  
This is provided by the **IP address**.

- **IPv4**: 32-bit, ~4.3 billion addresses (e.g., `192.168.1.1`).  
- **IPv6**: 128-bit, virtually unlimited (e.g., `2001:db8::1`).  

### Types of IPs
- **Public IPs** → used on the internet.  
- **Private IPs** → used inside local networks (`192.168.x.x`, `10.x.x.x`).  

---

## 3. Routing

The internet is a **network of routers**.  
Routers decide how packets travel from **source → destination**.

- Routers use **routing tables** and **protocols** (like BGP).  
- Data is sent in **packets**, each packet can take a different path.  
- **Redundancy** ensures resilience — if one path fails, packets reroute.  

### Example
- You → ISP → regional backbone → internet exchange → destination server.  

---

## 4. NAT (Network Address Translation)

Problem: IPv4 doesn’t have enough addresses.  
Solution: **NAT allows many private devices to share one public IP.**  

### How NAT Works
- Inside your home: devices have **private IPs** (`192.168.0.2`, `192.168.0.3`).  
- Router has **one public IP** (`103.24.55.12`).  
- NAT rewrites packet headers: maps internal → external.  

### Variants
- **Static NAT**: one-to-one mapping.  
- **Dynamic NAT**: many-to-many.  
- **PAT (Port Address Translation)**: many devices share one IP via different port numbers (used in home routers).  

---

## 5. Putting It All Together

When you open `example.com` in your browser:
1. **DNS lookup** → find IP of server.  
2. **Browser sends HTTP(S) request** → packets formed.  
3. **Packets routed** across ISPs/backbones to destination.  
4. **NAT** may rewrite IPs along the way.  
5. Server responds → page rendered.  

---

## 6. Interview Tips

- Always connect **DNS, IP, Routing, NAT** when asked *“How does the internet work?”*  
- Mention **IPv4 vs IPv6** limitations.  
- Bring up **BGP** for routing in large-scale systems.  
- NAT is crucial for explaining **private vs public networks**.  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
