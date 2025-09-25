---
title: Real-Time Communication on the Web
description: Overview of WebSockets, Server-Sent Events (SSE), long polling, and short polling, with use cases and trade-offs.
---

# Real-Time Communication on the Web

Modern applications increasingly require **real-time communication** — from chat apps to stock tickers and multiplayer games. Several technologies exist to achieve this, each with trade-offs.


## 1. Short Polling
- **How it works**: Client sends requests at fixed intervals (e.g., every 5 seconds) to check for new data.
- **Advantages**: Simple to implement, works with any server setup.
- **Disadvantages**: High latency (up to polling interval), inefficient network usage.
- **Use Cases**: Rarely used in production today, suitable only for low-frequency updates.



## 2. Long Polling (Comet)
- **How it works**: Client sends a request; server holds it open until new data is available or a timeout occurs. Once response is sent, client reopens the request.
- **Advantages**: Better latency than short polling, compatible with HTTP/1.1 servers.
- **Disadvantages**: Still resource-intensive; each new message requires a new HTTP request.
- **Use Cases**: Early chat apps, notifications before WebSockets became common.



## 3. Server-Sent Events (SSE)
- **How it works**: Client establishes a one-way persistent connection (`EventSource` API). Server can push messages to the client over HTTP.
- **Advantages**:
  - Lightweight, uses simple HTTP (port 80/443).
  - Auto-reconnect built-in.
  - Ideal for streaming updates.
- **Disadvantages**:
  - **One-way only** (server → client).
  - Not supported in all browsers (though widely available).
- **Use Cases**: Stock price feeds, dashboards, live news, telemetry.

**Example (JavaScript - SSE):**
```javascript
const evtSource = new EventSource("/events");
evtSource.onmessage = (event) => {
  console.log("New event:", event.data);
};
```



## 4. WebSockets
- **How it works**: Starts as HTTP handshake, then upgrades to a **persistent, full-duplex TCP connection**.
- **Advantages**:
  - **Bidirectional**: Client ↔ Server.
  - Low latency, lightweight frames.
  - Efficient for frequent or chatty communication.
- **Disadvantages**:
  - Slightly more complex setup (server support required).
  - May require load balancer/proxy adjustments.
- **Use Cases**: Chat apps, collaborative editors, online gaming, IoT.

**Example (JavaScript - WebSocket):**
```javascript
const socket = new WebSocket("ws://localhost:8080");
socket.onopen = () => socket.send("Hello Server");
socket.onmessage = (event) => console.log(event.data);
```



## Comparison Table

| Feature              | Short Polling        | Long Polling        | SSE (Server-Sent Events) | WebSockets          |
|----------------------|----------------------|---------------------|---------------------------|---------------------|
| Direction            | Client → Server      | Client → Server     | Server → Client only      | Bidirectional       |
| Latency              | High (interval-based)| Medium              | Low                       | Very Low            |
| Overhead             | High (many requests) | Medium              | Low                       | Very Low            |
| Complexity           | Low                  | Medium              | Low                       | Medium              |
| Best For             | Rare updates         | Legacy apps         | Feeds, dashboards         | Real-time apps      |



## Interview Tip
If asked *“How do you design a real-time notification system?”*, compare:
- **Polling**: Simple but inefficient.
- **SSE**: Great for one-way streams.
- **WebSockets**: Best for chat and interactive apps.  

Then mention trade-offs in scalability, latency, and complexity.



## Real-World Context
- **Slack / WhatsApp Web**: WebSockets for chat.  
- **Twitter Feed / Stock Tickers**: SSE for continuous streams.  
- **Legacy Systems**: Long polling still used where WebSockets aren’t supported.  


