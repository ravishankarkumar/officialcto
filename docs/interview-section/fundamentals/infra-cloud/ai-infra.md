---
title: GPU and AI Infra - Telemetry and Observability
description: Learn telemetry and observability for GPU-based AI infrastructure, with a Java-based telemetry collection example for data center monitoring, tailored for FAANG interviews and scalable system design.
image: /images/unsplash-datacenter-rack.jpg
---

# GPU and AI Infra: Telemetry and Observability

## Overview
Modern AI workloads depend heavily on **GPU infrastructure** for training and inference. These GPUs are expensive, power-hungry, and critical for production systems. Downtime, overheating, or inefficiency can result in wasted resources and delayed projects. This makes **telemetry and observability** essential: monitoring GPU health, collecting system metrics, and enabling automated responses.

In this article, we’ll explore:
- Telemetry basics for GPU clusters.
- Observability pillars (metrics, logs, traces).
- Alerts and automation strategies.
- A practical Java example for telemetry collection.
- Interview-focused insights and practice exercises.

By the end, you’ll understand how to design monitoring systems for GPU infrastructure — a frequent topic in FAANG interviews and large-scale system design discussions.

![AI Datacenter Rack](/images/unsplash-datacenter-rack.jpg)


## Why Telemetry and Observability Matter
- **GPU utilization and cost**: Training large models can cost millions of dollars. Underutilized GPUs waste money.
- **Reliability**: Detect overheating, failing drivers, or kernel errors early.
- **Scalability**: Monitor across thousands of GPUs in a distributed cluster.
- **Optimization**: Collect data to improve scheduling, cooling, and performance.

In short: **Telemetry keeps the system alive. Observability helps you understand why.**



## Telemetry in GPU-Based AI Infrastructure
**Telemetry** is the process of collecting and transmitting metrics from GPUs and nodes.

### Common Metrics
- **Utilization (%)**: How busy the GPU cores are.
- **Memory usage (MB/GB)**: Detects OOM conditions.
- **Temperature (°C)**: Prevents hardware failures.
- **Power consumption (W)**: Tracks energy efficiency.
- **Error rates**: CUDA errors, ECC memory faults.

### Tools & Frameworks
- **NVIDIA DCGM (Data Center GPU Manager)**: Low-level telemetry for NVIDIA GPUs.
- **Prometheus**: Metrics collection and scraping.
- **Elasticsearch + Kibana**: Storing and visualizing telemetry data.

### Example Use Case
Monitor 1,000 GPUs in a data center to:
- Detect overheating GPUs and migrate workloads.
- Spot idle GPUs for better scheduling.
- Provide dashboards for operators.



## Observability: Metrics, Logs, and Traces
Telemetry feeds into **observability**, which goes beyond raw metrics.

### 1. Metrics
- Quantitative values (utilization, latency, throughput).
- Aggregated and queried over time.
- Example: “Average GPU utilization over last 5 minutes.”

### 2. Logs
- Unstructured/semi-structured events.
- GPU driver errors, OOM crashes, fan failures.
- Example: “GPU 02 reported driver crash at timestamp X.”

### 3. Traces
- Distributed traces capture job execution across GPUs.
- Helps debug bottlenecks in multi-GPU training.
- Example: “Training job spent 40% waiting for gradients to sync.”

### Putting it Together
- **Metrics** tell you what’s wrong (utilization dropped).
- **Logs** explain the event (driver crash).
- **Traces** show the bigger picture (delayed training step).



## Alerts and Automation
Observability isn’t enough without **alerts** and automated remediation.

### Alerts
- **Threshold-based**: GPU temp > 85°C, memory > 90%.
- **Anomaly-based**: Sudden utilization drop compared to baseline.
- **Composite rules**: Multiple metrics (high power + high temp).

### Automated Actions
- **Auto-scaling**: Add GPUs if workload spikes.
- **Job rescheduling**: Move jobs off failing GPUs.
- **Cooling adjustment**: Trigger additional fans/AC.

**Goal**: Detect and fix issues before they impact users.



## Code Example: Java Telemetry Collector
Below is a Java program simulating GPU telemetry collection and sending metrics to a monitoring endpoint (e.g., Prometheus Pushgateway, Elasticsearch).

```java
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import org.json.JSONObject;

public class GPUTelemetryCollector {
    private final String telemetryEndpoint;
    private final Random random;

    public GPUTelemetryCollector(String telemetryEndpoint) {
        this.telemetryEndpoint = telemetryEndpoint;
        this.random = new Random();
    }

    public void collectAndSendMetrics(String gpuId) throws Exception {
        Map<String, Object> metrics = new HashMap<>();
        metrics.put("gpu_id", gpuId);
        metrics.put("timestamp", System.currentTimeMillis());
        metrics.put("utilization_percent", random.nextDouble() * 100);
        metrics.put("temperature_celsius", 50 + random.nextDouble() * 30);
        metrics.put("memory_usage_mb", random.nextInt(16000));

        JSONObject json = new JSONObject(metrics);

        URL url = new URL(telemetryEndpoint);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setDoOutput(true);
        conn.getOutputStream().write(json.toString().getBytes());

        int responseCode = conn.getResponseCode();
        if (responseCode == 200 || responseCode == 201) {
            System.out.println("Telemetry sent: " + json);
        } else {
            System.err.println("Failed to send telemetry: HTTP " + responseCode);
        }
    }

    public static void main(String[] args) throws Exception {
        GPUTelemetryCollector collector = new GPUTelemetryCollector("http://localhost:9200/gpu-metrics/_doc");
        collector.collectAndSendMetrics("gpu-001");
    }
}
```

### Explanation
- Collects simulated metrics (utilization, temperature, memory).
- Sends metrics via HTTP POST to a monitoring endpoint.
- Can be extended with real GPU APIs (e.g., NVIDIA DCGM bindings).



## Interview Insights
A common FAANG interview prompt: *“Design a monitoring system for a GPU cluster.”*

**How to answer:**
1. Collect telemetry (GPU utilization, temperature, memory).
2. Store in Prometheus/Elasticsearch.
3. Build dashboards with Grafana/Kibana.
4. Add alerts (thresholds, anomalies).
5. Automate responses (reschedule jobs, auto-scale).

### STAR Example (Amazon - CloudWatch)
- **Situation**: “Our training cluster needed GPU monitoring.”
- **Task**: “I was responsible for observability.”
- **Action**: “I set up telemetry pipelines to CloudWatch with custom metrics.”
- **Result**: “We reduced GPU idle time by 20% and improved reliability.”



## Practice Exercise
**Problem**: Design a telemetry pipeline for 100 GPUs in a cluster.
1. Define metrics (utilization, memory, temp).
2. Pick a storage backend (Prometheus, Elasticsearch).
3. Add alerts (e.g., temp > 85°C).
4. Describe automation (e.g., job migration).
5. Write a 100–150 word STAR response tailored to Amazon, Google, or Netflix.



## Conclusion
Telemetry and observability are the foundation of reliable, scalable GPU-based AI infrastructure. They:
- Detect issues early.
- Improve GPU utilization and cost efficiency.
- Enable automation for resilience.

Mastering these concepts equips you for FAANG interviews and for running production AI systems at scale.

**Next Step**: Explore [Microservices Pitfalls and Best Practices](/interview-section/fundamentals/infra-cloud/microservices).



<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>

