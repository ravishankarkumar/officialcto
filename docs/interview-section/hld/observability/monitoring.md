---
title: Monitoring in Distributed Systems
description: Understanding monitoring in distributed systems, with tools like Prometheus, Datadog, and key metrics for observability.
---

# Monitoring (Prometheus, Datadog)

Monitoring is the foundation of **observability**.  
It ensures we know the **health, performance, and usage** of distributed systems.

---

## 1. Why Monitoring Matters?

- Detect failures early (before users notice).  
- Understand performance bottlenecks.  
- Provide data for scaling decisions.  
- Meet SLAs/SLOs for reliability.  

---

## 2. What to Monitor?

### Golden Signals (Google SRE)
1. **Latency** → time to serve requests.  
2. **Traffic** → how many requests/queries.  
3. **Errors** → failure rate (5xx, timeouts).  
4. **Saturation** → resource usage (CPU, memory, DB connections).  

### Other Metrics
- Availability (uptime).  
- Queue length (backlog).  
- Cache hit ratio.  

---

## 3. Monitoring Tools

### Prometheus
- Open-source monitoring + alerting.  
- Time-series database.  
- Pull-based (scrapes metrics endpoints).  
- Works with Grafana dashboards.  

### Datadog
- Cloud monitoring SaaS.  
- Auto-integrations (DBs, queues, containers).  
- Offers metrics + logs + tracing (all-in-one).  

### Others
- New Relic, CloudWatch, Grafana Cloud.  

---

## 4. Best Practices

- Define **SLIs, SLOs, SLAs** clearly.  
- Monitor both infra (CPU, memory) and app metrics (QPS, errors).  
- Use dashboards for visibility.  
- Combine monitoring with alerting.  

---

## 5. Interview Tips

- Say: *“I’d monitor latency, traffic, errors, and saturation (Golden Signals).”*  
- Mention Prometheus + Grafana for open-source, Datadog for SaaS.  
- Show awareness of SLAs (business expectations).  

---

## 6. Diagram

```
[ Service ] → [ Metrics Exporter ] → [ Prometheus / Datadog ] → [ Dashboards + Alerts ]
```

---

## 7. Next Steps

- Learn about [Centralized Logging](/interview-section/hld/observability/logging.md).  
- Explore [Distributed Tracing](/interview-section/hld/observability/tracing.md).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
