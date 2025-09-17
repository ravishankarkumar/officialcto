---
title: Alerting in Distributed Systems
description: Understanding alerting systems like PagerDuty and OpsGenie, best practices for incident response and system reliability.
---

# Alerting (PagerDuty, OpsGenie)

Monitoring and logging provide visibility, but without **alerting**, critical issues may go unnoticed.  
Alerting ensures the right people are notified **at the right time**.

---

## 1. Why Alerting Matters?

- Detect issues early before customers notice.  
- Reduce **MTTR (Mean Time to Recovery)**.  
- Ensure SLAs and reliability targets are met.  
- Provide escalation for urgent incidents.  

---

## 2. Key Alerting Concepts

- **Threshold-based Alerts** → trigger when metric exceeds limit (e.g., CPU > 80%).  
- **Anomaly Detection** → alerts on unusual patterns.  
- **Error Budgets** → tied to SLOs, alert when budget consumed.  
- **Escalation Policies** → notify on-call → escalate if no response.  

---

## 3. Alerting Tools

### PagerDuty
- Industry leader in incident management.  
- Supports on-call rotations, escalation, runbooks.  
- Integrates with monitoring tools (Prometheus, Datadog).  

### OpsGenie
- Similar to PagerDuty.  
- Offers on-call scheduling, incident response automation.  
- Now part of Atlassian (Jira integration).  

### Others
- VictorOps, Squadcast.  
- Cloud-native: AWS CloudWatch Alarms, GCP Alerting.  

---

## 4. Best Practices

- Avoid alert fatigue → only alert on actionable issues.  
- Use severity levels (critical, warning, info).  
- Always link alerts to **dashboards/runbooks**.  
- Automate incident tracking (tickets, Slack alerts).  
- Rotate on-call fairly.  

---

## 5. Real-World Examples

- **Google SRE** → error budgets drive alerting.  
- **Netflix** → automated incident response pipelines.  
- **Startups** → simple setup with CloudWatch + PagerDuty.  

---

## 6. Interview Tips

- Say: *“I’d integrate monitoring with alerting tools like PagerDuty or OpsGenie.”*  
- Emphasize escalation and runbooks.  
- Show awareness of alert fatigue.  

---

## 7. Diagram

```
[ Metrics/Logs/Traces ] → [ Alerting System (PagerDuty/OpsGenie) ]
            ↓
     [ On-call Engineer Notified ]
```

---

## 8. Next Steps

- Move to [Soft Skills for HLD Interviews](/interview-section/hld/soft-skills-hld.md).  
- Revisit [Circuit Breakers, Retries & Timeouts](/interview-section/hld/reliability/circuit-breakers.md).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
