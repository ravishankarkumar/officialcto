# **Burninator: Accelerating GPU Ingestion in OCI’s AI Data Centers**

When Oracle Cloud Infrastructure (OCI) started scaling its AI data centers—such as Abilene with 65,000+ GPUs—the bottleneck wasn’t hardware availability. It was **ingestion throughput**: how fast newly-installed GPU racks could be validated, wired, stressed, and handed off into production.

I joined the Burninator team at a point when this bottleneck was threatening deployment timelines. The system existed, but it was **slow, sequential, and fragile**, requiring constant human intervention. The ask was clear:
**Make the ingestion pipeline fast, resilient, and automation-first.**

Because of NDA constraints, I’ll stay high-level and speak in terms of general industry patterns for hyperscale GPU operations.



## Background: What Burninator Did

Every new GPU rack entering the data center needed to be “burned in”:

* Stress test GPUs
* Validate wiring/topology
* PXE-boot and configure nodes
* Bring up NICs and fabric
* Deploy telemetry/agent software
* Handover to downstream teams

To do this at scale, Burninator used a **three-tier control plane**:

### 1. Manager

A persistent controller that watched for new racks, generated burn-in requests, and spawned orchestrators.

### 2. Orchestrator

One per rack.
It executed a directed graph of steps—some sequential, some parallel—and launched Kubernetes job pods for each GPU or node-level test.

### 3. Job Pods

Isolated test executors (stress, wiring checks, agent install, NIC validation).
Jobs ran on Kubernetes, allowing easy scaling across thousands of nodes.

This was the intended design. But real-world GPU clusters rarely behave ideally.



## The Problem: Latency, Fragility & Human Dependence

Before optimization, ingestion throughput suffered because:

### 1. Sequential execution

Even unrelated steps were serialized.
If *one* GPU failed PXE boot, NIC bring-up, or reported wiring mismatches, the **entire rack stalled**.

### 2. Hardware issues surfaced late

GB200 hardware was unavailable for months, so much of the system was not battle-tested. Real edge-cases surfaced only when racks arrived in volume—exactly when the team was already behind schedule.

### 3. Manual intervention dominated

Ops engineers constantly unblocked racks:

* Restarting stuck pods
* Re-triggering PXE boot
* Debugging NIC drivers
* Fixing partially deployed agents

This made the pipeline **expensive and non-scalable**, and racks sometimes idled for days.

When I was moved to this team, it was partly to enable around-the-clock progress across geographies and partly to **stabilize and accelerate** the pipeline.



## Where I Started: A Running but Sub-optimal System

The system wasn’t broken. It was simply not performing at hyperscale.
My role was to **unlock throughput** without redesigning everything from scratch.



## My Contributions

### 1. Parallelized the Execution Graph

I redesigned the orchestrator’s flow so **independent steps ran concurrently**, instead of waiting on slow, unrelated tasks.

Examples (generalized):

* GPU stress tests could run in parallel with wiring validation.
* NIC bring-up for one node no longer blocked telemetry installs for others.
* Rack-level steps ran concurrently when dependencies allowed.

This alone removed large, artificial delays.



### 2. Eliminated Sequential Bottlenecks

I removed blocking waits, rewrote retry semantics, and fixed ordering bugs in the execution DAG.

This ensured:

* Long-tail GPUs no longer held the entire rack hostage.
* Orchestrators made forward progress even with partial failures.
* Pods restarted cleanly with idempotent behavior.



### 3. Fixed Mission-Critical Failures

Many real-world issues only surfaced on actual hardware:

* PXE boot loops
* NIC driver initialization races
* Misreported or partially wired GPU topologies
* Telemetry agent installs hanging in specific edge cases

I diagnosed and fixed these categories of bugs, which improved **stability and predictability** of the entire ingestion workflow.



### 4. Built Runbooks, Operational Workflows & Documentation

Prior to this, tribal knowledge lived in Slack threads and the heads of a few engineers.

I created:

* End-to-end runbooks for debugging racks
* Stable workflows for common failure paths
* Step-by-step escalation and verification guides
* Documentation that enabled internal AI agents to assist engineers

This dramatically reduced onboarding time and made the system **operator-independent**.



## The Result

### 3× Throughput Increase

Racks were ingested **three times faster** due to parallelization, retry correctness, and removal of bottlenecks.

###  ~70% Reduction in Human Intervention

Runbooks + automation cut manual touches drastically, enabling the same team to handle far more racks in parallel.

### A Stable, Repeatable, Scalable Ingestion Pipeline

Burninator became consistent enough to rely on for large-scale AI cluster deployment schedules.



## Lessons Learned

### 1. Parallelism is the default for hyperscale

Sequential logic is the enemy when deploying thousands of GPUs per week.
Execution DAGs must assume concurrency, retries, and partial failures.

### 2. Operational tooling is as important as code

Runbooks, workflows, and clarity reduce downtime more than any single optimization.

### 3. Modular architectures (Manager → Orchestrator → Pods) age well

A clean separation of control, coordination, and execution made it possible to improve performance incrementally without rewriting the system.



## Closing Thoughts

This project wasn’t about inventing a new system.
It was about making a critical, existing system **fast, reliable, and production-ready at hyperscale**—right when OCI’s AI expansion demanded it.

