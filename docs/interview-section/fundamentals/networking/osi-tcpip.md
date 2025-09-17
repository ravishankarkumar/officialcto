---
title: OSI vs TCP/IP Model
description: Understanding the OSI and TCP/IP models, their layers, roles, and importance in computer networking.
---

# OSI vs TCP/IP Model

Networking is the backbone of modern distributed systems.  
To understand **how data travels across the internet**, we need a clear picture of the **OSI model** and the **TCP/IP model**.

---

## 1. OSI Model (Open Systems Interconnection)

The OSI model is a **conceptual framework** created by ISO to standardize network communication.  
It divides communication into **7 layers**, each with a specific role.

### Layers of OSI Model

1. **Physical Layer**  
   - Deals with raw data transmission (bits).  
   - Cables, switches, radio frequencies.  

2. **Data Link Layer**  
   - Provides node-to-node delivery.  
   - Error detection & correction.  
   - Examples: Ethernet, Wi-Fi (802.11).  

3. **Network Layer**  
   - Responsible for addressing & routing.  
   - Example: IP (IPv4, IPv6).  

4. **Transport Layer**  
   - End-to-end communication, reliability.  
   - TCP (reliable), UDP (fast, unreliable).  

5. **Session Layer**  
   - Manages sessions (open/close connections).  
   - Example: NetBIOS, RPC.  

6. **Presentation Layer**  
   - Data translation, encryption, compression.  
   - Example: SSL/TLS, JPEG, ASCII.  

7. **Application Layer**  
   - User-facing services.  
   - Example: HTTP, FTP, SMTP, DNS.  

---

## 2. TCP/IP Model (Internet Protocol Suite)

The **TCP/IP model** is the practical framework used in the real internet.  
It has **4 layers** (sometimes 5, depending on variant).

### Layers of TCP/IP Model

1. **Network Access Layer**  
   - Combines OSI Physical + Data Link.  
   - Deals with MAC addresses, Ethernet, Wi-Fi.  

2. **Internet Layer**  
   - Equivalent to OSI Network Layer.  
   - Provides addressing & routing (IP).  

3. **Transport Layer**  
   - Same as OSI Transport Layer.  
   - TCP, UDP.  

4. **Application Layer**  
   - Combines OSI Application + Presentation + Session.  
   - Example: HTTP, HTTPS, FTP, DNS, SMTP.  

---

## 3. OSI vs TCP/IP: Side-by-Side

| OSI Model (7 Layers)         | TCP/IP Model (4 Layers)      | Example Protocols         |
|-------------------------------|-------------------------------|---------------------------|
| 7. Application                | Application                  | HTTP, FTP, SMTP, DNS      |
| 6. Presentation               | Application                  | SSL/TLS, JPEG, ASCII      |
| 5. Session                    | Application                  | RPC, NetBIOS              |
| 4. Transport                  | Transport                    | TCP, UDP                  |
| 3. Network                    | Internet                     | IP, ICMP, ARP             |
| 2. Data Link                  | Network Access               | Ethernet, Wi-Fi           |
| 1. Physical                   | Network Access               | Cables, radio signals     |

---

## 4. Key Differences

- **OSI** is a **theoretical model**, rarely used directly in implementations.  
- **TCP/IP** is a **practical model**, used in the real internet.  
- OSI separates **Presentation** and **Session** layers, TCP/IP merges them into Application.  
- TCP/IP is simpler, OSI is more descriptive.  

---

## 5. Interview Tips

- When asked: *“Why learn OSI if the internet uses TCP/IP?”* →  
  - OSI gives a **structured mental model** for networking.  
  - TCP/IP is how it works in practice.  

- Mnemonic for OSI (bottom to top):  
  **Please Do Not Throw Sausage Pizza Away**  
  *(Physical, Data link, Network, Transport, Session, Presentation, Application)*  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
