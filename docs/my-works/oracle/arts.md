
# ARTS: Building Telemetry & Monitoring for OCI’s AI Data Centers

*By Ravi Shankar – Senior Software Engineer, Oracle Cloud Infrastructure*
*Published on officialcto.com*



## **Introduction**

In 2024, I had the opportunity to contribute to one of the most ambitious AI infrastructure build-outs in the world: Oracle Cloud Infrastructure’s (OCI) **Stargate initiative** with OpenAI. Public sources have documented Oracle’s investment into NVIDIA’s GB200 GPUs and the construction of massive AI regions like Abilene, Texas — a facility eventually targeting over **450,000 GPUs**.

During my tenure, our team was responsible for the telemetry and monitoring layer for a subset of this ecosystem: around **65,000 GPUs** across multiple racks, switches, and liquid-cooling configurations. My focus was on the backend infrastructure that ingests, aggregates, and exposes GPU health signals to downstream systems such as SCADA.

> **NDA Note:**
> All details below are based on publicly known information and generalized industry practices. Specific proprietary internals, configurations, topology details, or customer information are intentionally excluded.



## **Why ARTS Was Needed**

The Abilene facility was provisioned as a **child site of an existing OCI region**, introducing several non-standard infra patterns. It also included NVIDIA’s newest hardware generations (GB200, NVL72-class systems, and proprietary liquid cooling elements), each needing fine-grained visibility to maintain uptime.

Every GPU rack included:

* 18 GPUs
* 18 ILOMs
* 9 NVSwitches
* Custom cooling and connectivity infrastructure

The challenge was straightforward but enormous in scale: **collect, process, and act upon telemetry for tens of thousands of GPUs in near real-time**, while integrating with industrial systems (SCADA) responsible for physical safety.

Telemetry included:

* Temperatures
* Fault events
* Connectivity/heartbeat
* Health status
* Link-level anomalies

Even small blind spots could cascade into large-scale downstream failures. ARTS (AI Rack Telemetry Service) was the platform created to ingest, validate, aggregate, and push this data reliably.



## **The Problem Space**

Several constraints made this project unique:

### **1. We couldn't reuse existing internal codebases**

Because of partnership boundaries with OpenAI, all infrastructure for telemetry had to be built **from scratch**, including:

* APIs
* Aggregation layers
* IaC
* Deployment pipelines
* Integration modules

This forced us to create a clean, modern stack without legacy baggage.

### **2. Real-time monitoring with zero tolerance for stale data**

GPU agents emitted telemetry frequently. If an API or DB slowed down, queueing or batching could create “lagging” data — unacceptable for safety systems.

### **3. Integration with SCADA — an industrial engineering domain**

SCADA systems are designed for factories, power plants, and cooling systems, not cloud GPU fleets. Bridging the two worlds required careful modeling and controlled escalation paths.



## **High-Level Architecture**

*(Abstracted version, NDA-safe)*

```
GPU Agents  →  Telemetry API (Micronaut)  →  Oracle DB (64GB, HA Replica)
                                      ↓
                               Aggregation Engine
                                      ↓
                      Abnormality Detector (Cron + Shedlock)
                                      ↓
                       SCADA Integrations (MQTT / HTTP)
```

My direct contributions spanned the **API layer**, **aggregation logic**, **SCADA publisher**, and **IaC provisioning**.



## **Why We Chose the Technologies We Did**

(These decisions were made collectively across engineering and architecture teams; I’m describing the rationale, not claiming sole ownership.)



### **1. Java + Micronaut for the Backend**

Most OCI backend systems are Java-based, which streamlined onboarding and support.

**Micronaut**, specifically, gave us:

* **Fast startup** due to compile-time DI
* **Low memory footprint** → more pods per node
* **Kubernetes-native integration**
* **Mature ecosystem for resilience patterns (interceptors, circuit breakers)**
* **Oracle-backed open source**, which meant faster security-patch cycles

In a system that runs **hundreds of pods** under heavy telemetry ingestion, these optimizations matter significantly.



### **2. Oracle Database (64GB RAM + replicas)**

Although telemetry systems often default to NoSQL, Oracle DB was chosen because:

* It offers **strong consistency guarantees**, important for SCADA-driven decision paths.
* HA replicas and backup automation reduce operational burden.
* Oracle DB has evolved significantly — it now performs competitively in high-write scenarios.
* Native OCI integration simplified monitoring, scaling, and access control.



### **3. Shepherd (OCI IaC) + OKE (OCI Managed Kubernetes)**

We used **Shepherd** (OCI’s Terraform-equivalent) to define:

* DB clusters
* Kubernetes clusters
* Network configs
* IAM policies
* Microservice deployments

Benefits:

* Declarative reproducibility
* Zero-drift across environments
* Built-in OCI security best practices
* Fast provisioning cycles

For orchestration, **OKE** was chosen over raw Kubernetes because:

* It handles patching, scaling, node upgrades, cert rotation
* Allows teams to focus on service logic, not cluster operations
* Integrates cleanly with Oracle’s monitoring/logging stack

Given the scale and timeline, this choice eliminated entire classes of operational risk.



### **4. No Kafka (On Purpose)**

We debated queueing systems extensively. Ultimately, telemetry was pushed **directly to the API**, without Kafka or SQS-like buffers, because:

* Retries by agents ensured freshness; queues would introduce **stale data**.
* Telemetry load was predictable and uniform.
* Avoiding queues cut down on operational overhead (brokers, partitions, lag).
* Eliminated backpressure scenarios that could cascade into SCADA triggers.

This was a simplicity-over-complexity decision that paid off.



### **5. Shedlock for Distributed Cron Coordination**

The platform needed scheduled tasks to:

* Pull aggregated telemetry
* Detect abnormalities
* Publish alerts to SCADA

With **multiple microservice instances**, Shedlock ensured:

* Only **one instance runs the cron** at a time
* DB-backed locks prevent duplicate SCADA messages
* Clean, deterministic scheduling



## **My Role & Contributions**

Here are the concrete responsibilities I owned:

### **1. Implemented the Telemetry Ingestion Service**

* Designed Micronaut-based REST APIs for GPU agents
* Implemented validation, schema modeling, and ingestion flows
* Handled retry semantics and failure cases
* Optimized ingestion to minimize DB write overhead

### **2. Designed and Built the Aggregation Layer**

* Modeled GPU health, temp, fault, and connectivity aggregation
* Created transformation pipelines for real-time visibility
* Built internal endpoints for reliability engineering dashboards

### **3. Led SCADA Integration**

* Implemented MQTT and HTTP integrations
* Added circuit-breaker patterns to prevent cascading failures
* Defined abnormality mapping rules used by operators
* Built structured payloads consumed by SCADA dashboards

### **4. Authored Shepherd/Terraform Modules for Provisioning**

* Provisioned DBs, OKE clusters, VCNs, microservice deployments
* Added RBAC, encryption policies, and network-hardening defaults
* Ensured reproducible dev/stage/prod environments

### **5. Achieved 90%+ Test Coverage**

After returning from a short medical break, I used AI-assisted tooling to cover:

* API-level unit tests
* Integration tests
* Fault-injection scenarios

This gave us confidence during load-simulations and security reviews.



## **Execution Challenges**

### **1. New Tech Stack Under Tight Deadlines**

Coming from a Node.js background, I had never used:

* Java enterprise patterns
* Micronaut
* Shepherd
* SCADA protocols

The learning curve was steep, but I ramped up quickly by:

* Pairing with senior teammates
* Studying internal patterns
* Incrementally building components end-to-end

### **2. Scale Testing**

We simulated ingestion loads equivalent to thousands of racks.
Bottlenecks surfaced around:

* DB write amplification
* SCADA back-pressure
* Aggregation frequency

These were resolved via:

* Batch write strategies
* Circuit-breaking
* Tuning retention and indexing logic

### **3. Safety-Oriented Development**

Unlike typical cloud features, telemetry interacts *indirectly* with physical infrastructure.
This raised the bar for:

* Idempotency
* Failure isolation
* Alert correctness
* Time-to-detection guarantees



## **Outcome**

The ARTS platform was delivered **ahead of schedule**, and provided:

* Real-time visibility into **65,000+ GPUs**
* Unified telemetry ingestion
* Actionable SCADA alerts
* High availability and low operational overhead

It became a foundational layer supporting OCI’s AI datacenter expansion.



## **Key Lessons Learned**

1. **IaC is non-negotiable for scale** — zero-drift environments save months during infra evolution.
2. **Telemetry systems succeed only when data modeling is done well**, not just when collection is fast.
3. **Integrating cloud infra with SCADA** is a fascinating collision of industrial engineering and distributed systems.
4. **Simplicity beats theoretical elegance** — avoiding Kafka was a big win.
5. **Stepping into unfamiliar tech stacks under pressure accelerates career growth**; Micronaut and Terraform are now core skills.



## **Final Thoughts**

Working on ARTS was one of the most intense and rewarding engineering experiences of my career. It blended:

* large-scale distributed systems
* real-time telemetry
* industrial engineering
* cloud infrastructure
* safety-critical design

It also taught me how fast teams can move when constraints force clarity and focus.

If you’re curious about how modern AI datacenters operate under the hood, or want to chat about large-scale telemetry design, feel free to reach out.

