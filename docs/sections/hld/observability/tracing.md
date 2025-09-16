---
title: Distributed Tracing in Distributed Systems
description: Understanding distributed tracing with Jaeger, OpenTelemetry, and how it helps debug microservices in system design.
---

# Distributed Tracing (Jaeger, OpenTelemetry)

In microservices and distributed systems, a single user request may touch **dozens of services**.  
**Distributed tracing** provides end-to-end visibility into these requests.

---

## 1. Why Distributed Tracing?

- Debug latency across multiple services.  
- Find bottlenecks in service calls.  
- Correlate logs/metrics with request flow.  
- Improve MTTR (mean time to recovery).  

---

## 2. How Tracing Works

- Each request assigned a **trace ID**.  
- Each service call within request → **span**.  
- Trace = collection of spans showing the full request path.  

### Example
```
Trace ID: 12345
  Span A: API Gateway (50ms)
  Span B: Auth Service (20ms)
  Span C: DB Query (200ms)
```

---

## 3. Tools

### Jaeger
- Open-source, CNCF project.  
- Collects, stores, and visualizes traces.  
- Integrates with Kubernetes, Istio.  

### OpenTelemetry
- Open standard for telemetry data.  
- Supports **traces, metrics, logs**.  
- Vendor-neutral → export to Jaeger, Datadog, etc.  

### Zipkin
- Early open-source tracing tool.  
- Still used, but less popular vs Jaeger.  

---

## 4. Real-World Usage

- **Uber** → built Jaeger for large-scale tracing.  
- **Google Dapper** → research paper that inspired modern tracing.  
- **Istio Service Mesh** → built-in tracing with OpenTelemetry.  

---

## 5. Best Practices

- Propagate trace IDs across all services.  
- Use correlation IDs in logs.  
- Sample traces (don’t trace every request in high-QPS systems).  
- Combine with metrics + logging for full observability.  

---

## 6. Interview Tips

- Say: *“I’d use distributed tracing (Jaeger, OpenTelemetry) to debug latency across services.”*  
- Mention **trace ID + spans** explicitly.  
- Show awareness of performance overhead.  

---

## 7. Diagram

```
[ Client Request ] → [ API Gateway (Span 1) ]
         ↓
   [ Service A (Span 2) ] → [ Service B (Span 3) ]
         ↓
       [ Database (Span 4) ]
```

---

## 8. Next Steps

- Learn about [Alerting Systems](/sections/hld/observability/alerting.md).  
- Explore [Soft Skills for HLD Interviews](/sections/hld/soft-skills-hld.md).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
