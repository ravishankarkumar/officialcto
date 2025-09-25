---
title: Storage- SSD vs HDD, File Systems
description: Deep dive into storage technologies, comparing SSDs vs HDDs, NAND flash types, endurance, file systems, and their real-world implications. Essential for system design interviews and storage engineering.
---

# Storage: SSD vs HDD, File Systems

Storage is a critical layer in the **memory hierarchy**, providing **persistent storage** for data even when power is off.  
This article explores **Hard Disk Drives (HDDs)** vs **Solid-State Drives (SSDs)**, key performance trade-offs, and the role of **file systems**.  
Designed for **system design interviews** and **engineering awareness**.


## 1. Storage in the Memory Hierarchy

Storage devices are slower than CPU caches or RAM but much larger and cheaper. They are ideal for long-term storage of programs, data, and logs.  

- **Registers / Cache** → Nanoseconds, very small.  
- **RAM (DRAM)** → Tens of nanoseconds, volatile.  
- **Storage (SSD/HDD)** → Microseconds to milliseconds, persistent.  
- **Archival (tapes, cloud cold storage)** → Seconds to minutes, very large.  



## 2. HDD vs SSD: Core Comparison

### Hard Disk Drives (HDDs)
- **Technology**: Spinning magnetic platters + mechanical read/write heads.  
- **Latency**: ~5–10 ms (seek + rotational delay).  
- **Speed**: 80–160 MB/s typical.  
- **Capacity**: High (500 GB–20+ TB).  
- **Cost**: $0.02–$0.05/GB.  
- **Durability**: Vulnerable to shock, vibration, and wear.  
- **Power Consumption**: Higher (spinning + moving parts).  
- **Use Cases**: Bulk storage, backups, archival.  

### Solid-State Drives (SSDs)
- **Technology**: NAND flash memory, no moving parts.  
- **Latency**: ~50–200 µs (orders of magnitude faster than HDDs).  
- **Speed**: 500 MB/s (SATA SSDs) → 7 GB/s (PCIe NVMe).  
- **Capacity**: Commonly 128 GB–8 TB (larger enterprise SSDs exist).  
- **Cost**: $0.08–$0.20/GB.  
- **Durability**: Resistant to shock, but limited by **write endurance**.  
- **Power Consumption**: Lower.  
- **Use Cases**: OS drives, databases, gaming, high-performance workloads.  

### Latency Comparison
| Device Type | Latency |
|-------------|----------|
| Registers   | < 1 ns   |
| Cache (L1)  | ~1 ns    |
| RAM (DRAM)  | 50–100 ns|
| SSD (NVMe)  | 50–200 µs|
| HDD         | 5–10 ms  |



## 3. SSD NAND Flash Types & Endurance

SSDs store data in NAND cells, which wear out after many writes. The type of NAND affects **performance, cost, and endurance**:  

- **SLC (Single-Level Cell)** → 1 bit/cell. Fastest, most durable (~100k writes), expensive.  
- **MLC (Multi-Level Cell)** → 2 bits/cell. Balanced performance, ~10k writes.  
- **TLC (Triple-Level Cell)** → 3 bits/cell. Common in consumer SSDs, cheaper, ~3k writes.  
- **QLC (Quad-Level Cell)** → 4 bits/cell. Highest density, cheapest, lowest endurance (~1k writes).  

### SSD Endurance Metrics
- **TBW (Terabytes Written)** → How much data can be written over lifetime.  
- **DWPD (Drive Writes Per Day)** → How many times the drive’s full capacity can be written per day.  

**Interview Tip**: Be ready to explain why enterprise databases prefer **MLC/SLC** SSDs despite higher cost (endurance).



## 4. SSD Variants

- **SATA SSDs** → Limited by SATA interface (max ~600 MB/s).  
- **NVMe SSDs (PCIe)** → Leverage PCIe lanes, speeds up to 7 GB/s.  
- **M.2 / U.2 form factors** → Compact connectors used in laptops and servers.  
- **Enterprise SSDs** → Larger capacity, higher endurance (often with power-loss protection).  



## 5. File Systems

A **file system** organizes how data is stored, named, and retrieved. It sits between the OS and hardware.  

### Common File Systems
1. **FAT32**  
   - Pros: Widely compatible.  
   - Cons: 4 GB file size limit, no permissions.  

2. **NTFS** (Windows)  
   - Pros: Large files, journaling, encryption, permissions.  
   - Cons: Limited cross-platform support.  

3. **ext4** (Linux)  
   - Pros: Journaling, large files, crash recovery.  
   - Cons: Linux-specific.  

4. **APFS** (Apple)  
   - Pros: Optimized for SSDs, snapshots, encryption.  
   - Cons: Apple ecosystem only.  

5. **ZFS**  
   - Pros: Data integrity, snapshots, RAID-like features, deduplication.  
   - Cons: Complex setup, high memory usage.  



## 6. File Systems & SSD Optimization

File systems influence SSD lifetime and performance:  
- **TRIM/Discard** → Informs SSD which blocks are free, avoiding unnecessary writes.  
- **Wear Leveling** → Evenly distributes writes across cells.  
- **Journaling FS (NTFS, ext4)** → Protects against crashes, but adds write amplification.  

**Interview Tip**: Be able to explain why **FAT32 on SSD** is inefficient (no TRIM support).  



## 7. Real-World Context

- **Interview Relevance**  
  - HDD vs SSD latency and throughput.  
  - NAND types and endurance.  
  - File system features (journaling, TRIM).  

- **Engineering Practice**  
  - Use SSDs for databases, logs, and random-access workloads.  
  - HDDs still win for cold storage and cost-sensitive bulk data.  

- **Modern Trends**  
  - **NVMe SSDs** dominate performance markets.  
  - **ZNS (Zoned Namespace SSDs)** optimize write patterns.  
  - **Intel Optane (3D XPoint)** offered ultra-low latency (now discontinued, but concept lives in NVM research).  



## 8. Further Reading
- *Computer Organization and Design* — Patterson & Hennessy  
- *Operating System Concepts* — Silberschatz, Galvin, Gagne  
- Intel & Samsung SSD whitepapers  
- Research on file systems for SSD optimization  


<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
