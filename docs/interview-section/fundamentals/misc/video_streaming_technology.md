---
title: Video Streaming Technologies
description: A short overview of video streaming technologies, covering key protocols and tools used in delivering video at scale.
---

# Video Streaming Technologies

Video streaming is the process of delivering video content over the internet in real time without requiring full downloads. Modern streaming systems combine **protocols, codecs, and delivery networks** to ensure low latency, scalability, and quality of experience.


## Key Protocols
1. **HTTP Live Streaming (HLS)**  
   - Developed by Apple, widely used.  
   - Breaks video into small segments delivered over HTTP.  
   - Supports adaptive bitrate streaming (ABR).  

2. **Dynamic Adaptive Streaming over HTTP (MPEG-DASH)**  
   - Industry-standard alternative to HLS.  
   - Codec-agnostic, works across devices.  
   - Provides ABR with standardized manifest files.  

3. **Real-Time Messaging Protocol (RTMP)**  
   - Legacy protocol from Adobe Flash.  
   - Still used for **ingest** (sending video to platforms like YouTube, Twitch).  

4. **WebRTC**  
   - Real-time, peer-to-peer streaming.  
   - Ideal for low-latency applications (video calls, live interactions).  

5. **Smooth Streaming** (Microsoft, now less common)  
   - Similar to HLS, integrated into Microsoft ecosystem.  


## Supporting Technologies
- **Codecs**:  
  - **H.264/AVC** – Most widely supported.  
  - **H.265/HEVC** – Better compression, newer.  
  - **AV1** – Open-source, royalty-free, efficient codec.  

- **CDNs (Content Delivery Networks)**:  
  - Distribute video segments globally for scalability.  
  - Examples: Cloudflare, Akamai, AWS CloudFront.  

- **Adaptive Bitrate Streaming**:  
  - Adjusts video quality dynamically based on user bandwidth.  

- **DRM (Digital Rights Management)**:  
  - Protects video content from unauthorized access.  
  - Examples: Widevine, PlayReady, FairPlay.  



## Real-World Examples
- **Netflix**: Uses MPEG-DASH with custom ABR logic and CDNs.  
- **YouTube**: Uses DASH + HLS, supports AV1 codec.  
- **Twitch**: Uses HLS for delivery, RTMP for ingest.  
- **Zoom/Meet**: Relies on WebRTC for low-latency video calls.  



## Interview Tip
If asked *“How would you design a video streaming service?”*, mention:  
- **Protocols**: HLS/DASH for delivery, RTMP/WebRTC for ingestion.  
- **CDNs** for scalability.  
- **ABR** for varying bandwidth conditions.  
- **Codecs** for compression efficiency.  


