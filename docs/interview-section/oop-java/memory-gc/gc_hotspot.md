---
title: GC Implementations in HotSpot JVM
description: Overview of different garbage collectors in HotSpot JVM, including Serial, Parallel, CMS, G1, ZGC, and Shenandoah. Trade-offs between throughput, pause-time, and footprint, with interview tips on choosing collectors for low-latency systems.
---

# GC Implementations in HotSpot JVM

The Java HotSpot JVM provides multiple garbage collectors (GCs), each optimized for different workloads and performance goals. Choosing the right collector depends on whether you prioritize **throughput, latency, or memory footprint**. Let’s explore the most widely used collectors, their trade-offs, and what interviewers expect you to know.

---

## 1. Serial GC

- **How it works:** Uses a single-threaded mark-sweep-compact algorithm for both young and old generations.
- **Best suited for:**
  - Single-CPU machines.
  - Small heaps (e.g., desktop applications, embedded systems).
- **Pros:**
  - Very low overhead.
  - Simple and predictable.
- **Cons:**
  - Long stop-the-world (STW) pauses.
  - Not scalable to modern multi-core systems.

👉 **JVM Flag:** `-XX:+UseSerialGC`

---

## 2. Parallel GC (Throughput Collector)

- **How it works:** Similar to Serial GC but uses multiple threads for both minor and major collections.
- **Best suited for:**
  - Applications where throughput is more important than latency.
  - Batch jobs, scientific computing, data processing.
- **Pros:**
  - High throughput on multi-core CPUs.
  - Easy to tune.
- **Cons:**
  - Still stop-the-world.
  - Pause times increase with heap size.

👉 **JVM Flag:** `-XX:+UseParallelGC`

---

## 3. Concurrent Mark-Sweep (CMS)

- **How it works:** Performs most of the mark phase concurrently with the application to reduce pause times. Uses multiple threads.
- **Best suited for:**
  - Low-latency applications where responsiveness is critical.
- **Pros:**
  - Reduces long pauses compared to Serial/Parallel.
  - Concurrent marking avoids full STW scans.
- **Cons:**
  - Fragmentation issues (no compaction in concurrent phase).
  - Higher CPU usage due to concurrent threads.
  - Deprecated in newer JVM versions (replaced by G1).

👉 **JVM Flag:** `-XX:+UseConcMarkSweepGC`

---

## 4. G1 (Garbage First) GC

- **How it works:** Splits the heap into many regions and collects them incrementally, prioritizing regions with the most garbage (“garbage first”). Uses concurrent marking and evacuation.
- **Best suited for:**
  - Large heaps (multi-GB).
  - Applications needing predictable pause times.
- **Pros:**
  - Compacts memory incrementally (no fragmentation).
  - Predictable pauses (configurable with `-XX:MaxGCPauseMillis`).
- **Cons:**
  - More tuning complexity.
  - Slightly higher overhead compared to Parallel GC.

👉 **JVM Flag:** `-XX:+UseG1GC`

---

## 5. ZGC (Z Garbage Collector)

- **How it works:** A low-latency GC designed for **sub-10ms pauses**, regardless of heap size. Uses colored pointers and load barriers.
- **Best suited for:**
  - Extremely low-latency systems.
  - Large heaps (up to terabytes).
- **Pros:**
  - Pause times scale **independent of heap size**.
  - Concurrent compaction → no fragmentation.
- **Cons:**
  - Higher memory overhead.
  - Still relatively new; fewer production deployments compared to G1.

👉 **JVM Flag:** `-XX:+UseZGC`

---

## 6. Shenandoah GC

- **How it works:** Similar to ZGC with concurrent compaction, but developed by Red Hat. Focused on **low-pause times**.
- **Best suited for:**
  - Low-latency workloads.
  - Applications sensitive to pause-time spikes.
- **Pros:**
  - Pause times in the low milliseconds.
  - Concurrent compaction.
- **Cons:**
  - Higher CPU usage.
  - Slightly higher memory footprint.

👉 **JVM Flag:** `-XX:+UseShenandoahGC`

---

## Trade-offs: Throughput vs Pause-time vs Footprint

| Collector   | Pause Time | Throughput | Footprint | Best For |
|-------------|------------|------------|-----------|----------|
| Serial      | High       | Medium     | Low       | Small apps, single-core |
| Parallel    | High       | High       | Medium    | Batch jobs, throughput-focused apps |
| CMS         | Medium     | Medium     | Medium    | Low-latency, deprecated |
| G1          | Medium     | High       | Medium    | Large heaps, predictable pauses |
| ZGC         | Very Low   | Medium     | High      | Low-latency, large heaps |
| Shenandoah  | Very Low   | Medium     | High      | Pause-sensitive systems |

👉 **Rule of Thumb:**
- **Throughput priority → Parallel GC.**
- **Balanced, large heap → G1.**
- **Ultra-low latency → ZGC or Shenandoah.**

---

## Interview Focus: Low-Latency GC Choice

**Question:** *“Which GC would you choose for a low-latency system?”*

**Answer Outline:**
- CMS was historically used but is deprecated.
- Modern choices: **ZGC** or **Shenandoah**, both designed for low-pause operation.
- G1 can be tuned for relatively low pauses, but ZGC/Shenandoah guarantee sub-10ms pause times.
- Choice depends on JVM version, production support, and heap size.

---

## Summary

- HotSpot offers multiple GCs, each optimized for different goals.
- **Serial/Parallel:** Simpler, higher pauses, good for smaller or throughput-heavy workloads.
- **CMS/G1:** Mid-ground, G1 is now the default.
- **ZGC/Shenandoah:** Cutting-edge, low-latency collectors.

👉 For interviews, emphasize:
- Trade-offs between throughput vs latency.
- Why G1 is default in modern JVMs.
- Why ZGC/Shenandoah are the future for **low-latency systems**.

