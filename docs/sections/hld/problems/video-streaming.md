---
title: Video Streaming (YouTube / Netflix)
description: Design a video streaming system covering upload, transcoding, storage, CDN delivery, scalability, and trade-offs.
---

# Video Streaming (YouTube / Netflix)

Design a video streaming system that supports uploading, storing, transcoding, and streaming videos to millions of users worldwide. This system tests your ability to handle **large media files, high bandwidth delivery, and global scalability**.

---

## 1. Requirements

### Functional
- Users can upload videos.  
- Videos can be streamed on-demand (progressive download or adaptive bitrate).  
- Support search, recommendations, comments, likes.  
- Support multiple devices (web, mobile, TV).  

### Non-functional
- Low startup latency (<2s).  
- Smooth playback with adaptive bitrate.  
- High availability and fault tolerance.  
- Handle millions of concurrent viewers.  
- Cost-effective storage and bandwidth.  

Optional: live streaming, offline downloads, DRM protection.

---

## 2. Workload & Capacity (Example)

- 10M DAU, avg 1 video uploaded/day → 10M uploads/day.  
- Avg video size = 100MB → 1PB new storage/day.  
- 100M daily viewers, avg 1 hour/day → ~100M streaming hours/day.  
- 1 hour @ 2Mbps ≈ 0.9GB → ~90PB/day bandwidth.  

Massive bandwidth → must use CDNs + caching.

---

## 3. High-Level Architecture

1. **Upload Service**  
   - Accept video file from client.  
   - Store raw file in **blob storage** (e.g., S3, HDFS).  
   - Generate metadata entry in DB.  

2. **Transcoding Pipeline**  
   - Convert uploaded video into multiple bitrates/resolutions (240p → 4K).  
   - Use distributed processing (FFmpeg, GPU clusters).  
   - Output HLS/DASH segments for adaptive streaming.  

3. **Storage Layer**  
   - Original + transcoded video stored in object storage.  
   - Metadata DB stores video info (title, tags, owner, resolutions).  

4. **Content Delivery Network (CDN)**  
   - Distribute video segments globally.  
   - Edge caches for low-latency streaming.  
   - Pre-fetch popular content.  

5. **Streaming Service**  
   - Client requests video → manifest file (M3U8/DASH).  
   - Player fetches segments based on network conditions (adaptive bitrate).  

6. **Recommendation & Search**  
   - Index videos for search.  
   - ML-based recommendations (collaborative + content-based).  

---

## 4. Video Streaming Workflow

1. **Upload** → Client uploads → Upload Service stores raw → metadata entry created.  
2. **Transcoding** → Async pipeline generates multiple versions → update metadata with available streams.  
3. **Delivery** → Client requests manifest → fetches video segments via CDN.  
4. **Adaptive Bitrate (ABR)** → player switches quality dynamically based on bandwidth/CPU.  

---

## 5. Storage Design

- Use object storage (S3, GCS) for durability.  
- Cold storage for old/unpopular videos.  
- Replication across regions for availability.  
- Metadata in SQL/NoSQL DB (Postgres, DynamoDB).  

---

## 6. CDN & Edge Optimization

- Cache popular videos at CDN edge servers.  
- Use Anycast routing for nearest edge.  
- Pre-fetch trending videos.  
- P2P delivery (optional, e.g., WebRTC-based).  

---

## 7. Scalability Challenges

- **Upload spikes** → buffer with queues.  
- **Transcoding cost** → GPU farms, distributed workers.  
- **Popular video surge (viral)** → CDN must absorb traffic.  
- **Cold start** → mitigate with prefetch, multiple bitrates.  

---

## 8. Security & DRM

- Token-based authentication for streaming.  
- DRM systems (Widevine, FairPlay).  
- Prevent hotlinking (signed URLs).  
- Watermarking for anti-piracy.  

---

## 9. Monitoring & Metrics

- Startup latency, buffering ratio, playback errors.  
- CDN cache hit ratio.  
- Transcoding pipeline throughput.  
- Storage growth and cost.  

---

## 10. Trade-offs

- **Precompute (transcoding all resolutions) vs on-demand**: precompute = more storage, on-demand = slower availability.  
- **Global CDN vs regional storage**: global = faster but costly.  
- **Adaptive bitrate** improves UX but requires more compute + manifest complexity.  

---

## 11. Real-World Examples

- **YouTube**: global CDN, ML-based recommendations, ads pipeline.  
- **Netflix**: Open Connect CDN, ABR streaming, heavy ML personalization.  

---

## 12. Interview Tips

- Start with requirements + capacity math.  
- Cover upload → transcoding → storage → delivery → playback.  
- Mention CDNs early for scalability.  
- Bring up adaptive bitrate streaming.  
- Mention cost trade-offs (storage vs compute).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
