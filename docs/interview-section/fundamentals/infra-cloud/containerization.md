---
title: Containerization - Docker & Kubernetes
description: Learn containerization with Docker and orchestration with Kubernetes — core concepts, practical Java app example (Dockerfile + Kubernetes YAML), and FAANG interview tips.
image: /images/cp_container.png
---

# Containerization: Docker & Kubernetes

Modern cloud-native systems run on **containers**. Docker packages your app with all dependencies; Kubernetes orchestrates those containers across machines for **scalability, resilience, and automation**.  
This lesson gives you the fundamentals, a **practical example (Java app)**, and **interview-ready insights**.

![Containers](/images/cp_container.png)


## What you’ll learn
- **Docker basics**: images, containers, Dockerfiles.  
- **Kubernetes basics**: pods, deployments, services, scaling.  
- How Docker and Kubernetes fit into **distributed systems**.  
- A **Java app example** with Dockerfile + Kubernetes YAML.  
- **Interview-ready tips** for FAANG and system design interviews.



## 1. Why Containers?
- **Before**: Apps deployed on bare-metal or VMs → heavy, inconsistent.  
- **Now**: Containers = lightweight, portable units → “works everywhere”.  

**Benefits**:
- Portability: same environment across dev, test, prod.  
- Isolation: each container has its own runtime.  
- Efficiency: share host OS kernel, smaller footprint than VMs.  
- Speed: fast start/stop compared to full VM.  



## 2. Docker: Packaging Apps
**Definition**: Docker turns your app into an image (blueprint), which you can run as containers.  

- **Image**: Template with code + runtime.  
- **Container**: Running instance of an image.  
- **Dockerfile**: Recipe for building an image.  

**Example use case**: Package a Java REST API into an image → run anywhere (local, AWS ECS, Kubernetes).



## 3. Kubernetes: Orchestrating Containers
**Definition**: Kubernetes (K8s) automates deployment, scaling, and management of containers.  

- **Pod**: Smallest deployable unit (usually 1 container).  
- **Deployment**: Manages replica sets (scaling, rolling updates).  
- **Service**: Exposes pods inside/outside the cluster.  
- **Autoscaling**: Adjust replicas based on CPU, requests, custom metrics.  

**Example use case**: Run a microservice across 3 replicas, expose it via a LoadBalancer.



## 4. Containers in Distributed Systems
- **Docker**: Ensures consistency across microservices.  
- **Kubernetes**: Ensures availability and scalability.  
- Together: foundation for modern distributed systems (FAANG, startups, cloud-native apps).  



## 5. Practical Example — Java App
### Dockerfile
```dockerfile
# Base image: Java 17 slim
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy built JAR
COPY target/my-app-1.0.jar my-app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "my-app.jar"]
```

### Kubernetes Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: my-app:1.0
        ports:
        - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  selector:
    app: my-app
  ports:
    - port: 80
      targetPort: 8080
  type: LoadBalancer
```

**Workflow**:
1. Build JAR (`mvn package`).  
2. Build + push image: `docker build -t my-app:1.0 .` → `docker push my-app:1.0`.  
3. Deploy: `kubectl apply -f deployment.yaml`.  



## 6. Interview-Ready Insights
- **Design pattern**: “Stateless API servers + autoscaling + load balancer”.  
- **Scaling**: Kubernetes handles replicas & rollouts.  
- **Security**: Use secrets/config maps; avoid hardcoding credentials.  
- **Trade-offs**: Containers are portable; VMs offer stronger isolation.  

**Sample FAANG-style response**:  
> “I’d package the service into a Docker image, deploy via Kubernetes with 3 replicas, expose it through a LoadBalancer service, and configure autoscaling — ensuring high availability and scalability.”



## 7. FAANG-Specific Tips
- **Amazon (EKS)**: Emphasize AWS EKS, IAM roles, cost optimization.  
- **Google (GKE)**: Highlight scalability, integration with GCP.  
- **Meta**: Show rapid deployment & low latency focus.  
- **Netflix**: Highlight autonomy in designing resilient systems.  



## 8. Practice Exercise
**Task**: Containerize a simple REST API and deploy with Kubernetes.  
1. Write a Dockerfile.  
2. Deploy with a Kubernetes YAML (2 replicas).  
3. Craft a **STAR response** around outcomes (latency ↓, uptime ↑, cost savings).  



## 9. Quick Reference
- Docker Docs: [docker.com](https://www.docker.com)  
- Kubernetes Docs: [kubernetes.io](https://kubernetes.io)  
- *Kubernetes Up & Running* — Kelsey Hightower  
- *Designing Data-Intensive Applications* — Martin Kleppmann  



## Conclusion
Docker + Kubernetes = the **default skillset** for modern cloud engineers.  
They let you run **portable apps (Docker)** and **scale them globally (Kubernetes)**.  
For interviews: focus on **stateless design, scaling patterns, and security**.

**Next**: [Distributed Systems: CAP & Consensus](/interview-section/fundamentals/infra-cloud/distributed-systems-cap-consensus)



<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
