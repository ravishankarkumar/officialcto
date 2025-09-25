---
title: Common Terms in Infrastructure and System Design
description: Quick reference for important system design terms like Anycast IP, Bloom Filters, RAID, and related concepts.
---

# Common Terms in Infrastructure and System Design

In system design and infrastructure discussions, engineers often encounter recurring concepts. Here are some **common terms** explained simply with examples.

---

## 1. Anycast IP
- **Definition**: A network addressing method where the same IP address is assigned to multiple servers across different locations.  
- **How It Works**: User requests are automatically routed to the **nearest or best-performing server** using BGP routing.  
- **Use Case**: DNS root servers, CDNs like Cloudflare, Google DNS (`8.8.8.8`).  
- **Benefit**: Reduces latency, improves availability, and enables DDoS mitigation.

---

## 2. Bloom Filters
- **Definition**: A **probabilistic data structure** used to test if an element is in a set. It can return **false positives** but never **false negatives**.  
- **How It Works**: Uses multiple hash functions to map items into a bit array.  
- **Example**:  
  - Checking if a URL might be in a database of malicious URLs.  
  - If Bloom filter says “not present,” it’s guaranteed not to be there.  
  - If it says “present,” you need to check in the actual DB.  
- **Use Case**: Databases (Cassandra, HBase), caching systems, web browsers.  
- **Benefit**: Space-efficient, very fast lookups.

---

## 3. RAID (Redundant Array of Independent Disks)
- **Definition**: A storage technology that combines multiple disks to improve **performance, redundancy, or both**.  
- **Common RAID Levels**:
  - **RAID 0 (Striping)**: Data split across disks → High performance, **no redundancy**.  
  - **RAID 1 (Mirroring)**: Data duplicated across disks → Redundancy, fault tolerance.  
  - **RAID 5 (Parity)**: Data + parity distributed → Good balance of performance + redundancy.  
  - **RAID 10 (1+0)**: Combines mirroring + striping → High performance + redundancy.  
- **Use Case**: Data centers, enterprise storage, databases.  
- **Benefit**: Protects against disk failures (except RAID 0), improves throughput.

---

## 4. Other Useful Terms
- **Sharding**: Splitting a database into smaller, more manageable pieces (shards).  
- **Consistent Hashing**: Technique for distributing requests/data evenly across servers (used in load balancers, caches).  
- **Checkpointing**: Periodically saving the state of a system so it can recover quickly after failure.  
- **Quorum**: Minimum number of nodes required to agree in distributed systems (used in Paxos, Raft, Cassandra).  
- **Backpressure**: A mechanism in streaming systems where consumers can signal producers to slow down.  

---

## Real-World Context
- **Interviews**: Expect questions like *“How does Anycast improve CDN performance?”* or *“Explain Bloom filters in caching.”*  
- **Practical Use**: These concepts underpin databases, storage, networking, and distributed systems we use daily.  
