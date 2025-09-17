# Storage: SSD vs HDD, File Systems

This article covers **storage technologies** in computer systems, comparing **Solid-State Drives (SSDs)** and **Hard Disk Drives (HDDs)**, and exploring **file systems**. It’s designed for system design interviews and to build engineering awareness of storage fundamentals.

---

## Storage in the Memory Hierarchy
Storage devices, such as **SSDs** and **HDDs**, are part of the memory hierarchy, providing **persistent storage** for data that must be retained even when power is off. They are slower but much larger and cheaper than RAM or caches, making them ideal for long-term data storage.

---

## HDD vs SSD: A Comparison

### **Hard Disk Drives (HDDs)**
- **Technology**: Use spinning magnetic disks (platters) and mechanical read/write heads to store and retrieve data.
- **Speed**: Slower due to mechanical components. Typical read/write speeds are 80–160 MB/s, with latency from disk rotation (e.g., 5400 or 7200 RPM) and head movement.
- **Capacity**: High, often ranging from 500 GB to 20 TB or more, making them cost-effective for large-scale storage.
- **Cost**: Cheaper per GB (e.g., $0.02–$0.05/GB).
- **Durability**: Prone to failure from physical shock, vibration, or wear of mechanical parts.
- **Use Cases**: Archival storage, data centers for bulk storage, consumer desktops/laptops where cost is a priority.
- **Power Consumption**: Higher due to spinning platters and moving heads.

### **Solid-State Drives (SSDs)**
- **Technology**: Use flash memory (NAND-based) with no moving parts, storing data in memory cells.
- **Speed**: Much faster, with read/write speeds of 500 MB/s to 7 GB/s (for NVMe SSDs) and lower latency due to instant data access.
- **Capacity**: Typically 128 GB to 8 TB, though larger capacities are emerging.
- **Cost**: More expensive per GB (e.g., $0.08–$0.20/GB), though prices are decreasing.
- **Durability**: More resistant to physical shock, but limited by write endurance (flash cells wear out after a finite number of write cycles).
- **Use Cases**: Operating system drives, high-performance applications, databases, gaming, and modern laptops.
- **Power Consumption**: Lower, as there are no mechanical components.

### **Key Differences**
| Feature              | HDD                     | SSD                     |
|----------------------|-------------------------|-------------------------|
| **Technology**       | Magnetic platters       | NAND flash memory       |
| **Read/Write Speed** | 80–160 MB/s             | 500 MB/s–7 GB/s         |
| **Latency**          | Higher (ms)             | Lower (µs)              |
| **Cost per GB**      | Lower ($0.02–$0.05)     | Higher ($0.08–$0.20)    |
| **Durability**       | Less durable            | More durable (shock)    |
| **Capacity**         | Up to 20 TB+            | Up to 8 TB (common)     |
| **Power Usage**      | Higher                  | Lower                   |

### **SSD Variants**
- **SATA SSDs**: Use the same interface as HDDs, offering moderate speed improvements (up to 600 MB/s).
- **NVMe SSDs**: Use PCIe interfaces, providing significantly faster speeds (up to 7 GB/s) for high-performance applications.

---

## File Systems
A **file system** organizes and manages data on storage devices, defining how files are named, stored, and retrieved. It acts as an intermediary between the operating system and storage hardware.

### Common File Systems
1. **FAT32 (File Allocation Table)**:
   - Used in older systems and removable drives (e.g., USBs).
   - Pros: Wide compatibility.
   - Cons: Limited to 4 GB file sizes, 32 GB partition sizes, no advanced features like permissions.
2. **NTFS (New Technology File System)**:
   - Default for Windows systems.
   - Pros: Supports large files/partitions, encryption, compression, and permissions.
   - Cons: Limited compatibility with non-Windows systems.
3. **ext4 (Fourth Extended File System)**:
   - Common for Linux systems.
   - Pros: Supports large files/partitions, journaling for crash recovery, good performance.
   - Cons: Less compatible with non-Linux systems.
4. **APFS (Apple File System)**:
   - Used by macOS and iOS.
   - Pros: Optimized for SSDs, supports snapshots, encryption, and space sharing.
   - Cons: Apple-specific, limited cross-platform support.
5. **ZFS**:
   - Used in advanced systems (e.g., FreeBSD, some Linux).
   - Pros: Data integrity, snapshots, deduplication, and RAID-like features.
   - Cons: High memory usage, complex setup.

### File System Functions
- **File Organization**: Stores files in a hierarchical structure (directories/folders).
- **Metadata Management**: Tracks file attributes (e.g., name, size, permissions, timestamps).
- **Journaling**: Logs changes to prevent data loss during crashes (e.g., in NTFS, ext4).
- **Partitioning**: Divides storage into logical sections for different file systems or operating systems.

### File System Considerations
- **Performance**: File systems optimized for SSDs (e.g., APFS) reduce wear and improve speed.
- **Compatibility**: Choose based on OS and device requirements (e.g., FAT32 for USB drives).
- **Reliability**: Journaling and error-checking features (e.g., ZFS) enhance data integrity.
- **Security**: File systems like NTFS and APFS support encryption and access controls.

---

## Real-World Context
- **Interview Relevance**: Understanding SSD vs HDD trade-offs and file system choices is critical for system design interviews, especially when discussing storage scalability, performance, or reliability.
- **Practical Use**: Engineers select storage and file systems based on workload (e.g., SSDs for databases, HDDs for backups) and optimize software for specific file system features.
- **Modern Trends**: NVMe SSDs dominate high-performance systems, while technologies like **Optane** (Intel’s 3D XPoint) and **ZNS (Zoned Namespaces)** SSDs are emerging for specialized workloads.

---

## Further Reading
- *Computer Organization and Design* by Patterson & Hennessy
- *Operating System Concepts* by Silberschatz, Galvin, Gagne
- Documentation on NTFS, ext4, and ZFS
- Blogs from storage vendors (e.g., Samsung, Western Digital) on SSD/HDD advancements