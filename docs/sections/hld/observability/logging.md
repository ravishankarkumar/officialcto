---
title: Centralized Logging in Distributed Systems
description: Understanding centralized logging, with ELK stack, Splunk, and best practices for observability.
---

# Centralized Logging (ELK, Splunk)

Logs capture **events and errors** happening in a system.  
In distributed systems, logs from many services need to be **aggregated and centralized** for effective debugging and monitoring.

---

## 1. Why Centralized Logging?

- Debugging failures across microservices.  
- Searching logs efficiently.  
- Correlating logs from multiple sources.  
- Compliance and auditing.  

---

## 2. Key Components

### Log Collection
- Agents/forwarders collect logs.  
- Examples: Filebeat, Fluentd, Logstash.  

### Central Storage
- Logs ingested into central system.  
- Must handle large volumes.  

### Analysis & Search
- Tools for querying, filtering, visualizing logs.  

---

## 3. Popular Tools

### ELK Stack (Elasticsearch, Logstash, Kibana)
- **Elasticsearch** → stores and indexes logs.  
- **Logstash/Beats** → collect and process logs.  
- **Kibana** → visualize and search logs.  

### Splunk
- Enterprise log analysis platform.  
- Advanced querying, alerting, dashboards.  
- Paid, but powerful.  

### Others
- Graylog, Loki (Grafana).  
- Cloud-native: AWS CloudWatch Logs, GCP Logging.  

---

## 4. Best Practices

- Use structured logging (JSON) for easier search.  
- Include request IDs / trace IDs for correlation.  
- Rotate and archive old logs.  
- Control log volume (avoid flooding with debug logs).  
- Secure logs (contain sensitive info).  

---

## 5. Real-World Examples

- **Netflix** → centralized ELK stack for observability.  
- **Uber** → custom log aggregation pipeline.  
- **Kubernetes** → logs collected via Fluentd to Elasticsearch.  

---

## 6. Interview Tips

- Say: *“I’d centralize logs using ELK or Splunk to debug across microservices.”*  
- Mention structured logging + trace IDs.  
- Highlight trade-offs: ELK open-source vs Splunk enterprise.  

---

## 7. Diagram

```
[ Service Logs ] → [ Log Forwarder ] → [ Central Log System (ELK/Splunk) ] → [ Dashboard & Search ]
```

---

## 8. Next Steps

- Learn about [Distributed Tracing](/sections/hld/observability/tracing.md).  
- Explore [Alerting Systems](/sections/hld/observability/alerting.md).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
