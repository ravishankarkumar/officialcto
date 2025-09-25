---
title: Cloud Fundamentals - AWS / GCP / Azure / OCI
description: Practical cloud fundamentals for AWS, GCP, Azure, and OCI — compute, storage, networking, security, design patterns, interview tips and a Java S3 example (AWS SDK v2).
image: /images/cp_clouds.png
---

# Cloud Fundamentals: AWS / GCP / Azure / OCI

Cloud platforms power modern, scalable systems. This concise lecture gives you the essentials for AWS, GCP, Azure, and OCI — what to know for interviews, how to reason about trade-offs when designing systems, and a practical Java example for object storage (S3). Read this before diving into IaC, containers, or system design questions.

![Clouds](/images/cp_clouds.png)


## What you’ll learn
- Core services and analogues across AWS / GCP / Azure / OCI (compute, storage, networking).  
- How to reason about cost, availability, and scalability.  
- Security essentials (IAM, RBAC, encryption, least privilege).  
- Practical Java example: uploading to S3 (AWS SDK v2).  
- Interview-ready patterns, answers and a short checklist.


## 1. Cloud in one line
**Cloud = on-demand, pay-as-you-go compute & storage + managed services that let you build scalable, resilient systems without owning data-centers.**

Key benefits: elasticity (scale up/down), managed infrastructure (databases, queues, caches), global footprint and operational velocity.


## 2. Core services (quick mapping)

| Role | AWS | GCP | Azure | OCI | Purpose |
|------|-----|-----|-------|-----|---------|
| Compute | EC2, Lambda, ECS/EKS | Compute Engine, Cloud Functions, GKE | Virtual Machines, Functions, AKS | Compute Instances, Functions, Container Engine | Run code/containers/serverless |
| Object storage | S3 | Cloud Storage | Blob Storage | Object Storage | Cheap, durable blob storage |
| Block storage | EBS | Persistent Disk | Managed Disks | Block Volume | Attach to VMs |
| Managed DB | RDS / Aurora, DynamoDB | Cloud SQL / Bigtable / Firestore | Azure SQL DB, Cosmos DB | DB Systems | Managed relational / NoSQL |
| Networking | VPC, Route53, ELB | VPC, Cloud DNS, Load Balancing | VNet, Azure DNS, Load Balancer | VCN, DNS, Load Balancer | Isolation, DNS, LB |
| Identity | IAM | IAM | Azure AD / RBAC | IAM | AuthZ/AuthN and roles |
| Serverless infra | Lambda, Fargate | Cloud Functions, Cloud Run | Functions, Logic Apps | Functions | Event-driven / FaaS |
| Monitoring | CloudWatch | Cloud Monitoring | Azure Monitor | Monitoring | Metrics, logs, alerts |

> Note: Each provider offers many managed services (ML, data pipelines, analytics). For interviews, focus on compute, storage, networking, identity and monitoring.


## 3. Storage: object vs block vs file
- **Object (S3 / Cloud Storage / Blob Storage / OCI Object)** — best for files, images, backups. Highly durable, eventual consistency options, strong lifecycle policies.  
- **Block (EBS / Persistent Disk / Managed Disks / Block Volume)** — low-latency attachable volumes for databases or filesystems.  
- **File (EFS / Filestore / Azure Files)** — shared POSIX file systems for multiple VMs.  

**Design tip:** Use object storage for large numbers of immutable files; use block storage for databases; use file storage for shared file access.


## 4. Networking & VPC basics
- **VPC/VCN/VNet**: virtual private network for your cloud resources — subnets, route tables, gateways.  
- **Public vs private subnets**: Put internet-facing components (LB) in public subnets; databases in private subnets.  
- **Load Balancers**: distribute traffic across instances and across AZs/regions.  
- **DNS**: Route53 / Cloud DNS / Azure DNS provides routing and health checks.  
- **Edge**: CDNs (CloudFront / Cloud CDN / Azure CDN) cache static content closer to users — reduces latency and origin load.  

**Security tip:** Put sensitive data behind private subnets + NAT + security groups (firewall rules).


## 5. Security essentials
- **IAM & least privilege**: always assign precise roles/permissions; avoid long-lived root keys.  
- **Encryption**: encrypt data in transit (TLS) and at rest (KMS, CMEK). Providers expose KMS/HSM.  
- **Network controls**: Security groups, NACLs, private subnets, and VPC endpoints for storage.  
- **Audit & monitoring**: Enable CloudTrail / Audit Logs / Azure Monitor and centralize logs for forensic & compliance.  
- **Secrets management**: Use secrets managers (AWS Secrets Manager / GCP Secret Manager / Azure Key Vault).  

**Interview note:** Mention IAM roles, principle of least privilege, and KMS when discussing security.


## 6. Scalability, availability & cost tradeoffs
- **Scale horizontally** (stateless services behind LB) vs vertically (bigger VM). Horizontal scales better for web services.  
- **Regional/zone choices**: Multi-AZ improves availability; multi-region improves survivability at higher cost.  
- **Autoscaling**: scale based on CPU, requests, custom metrics.  
- **Cost tools**: use cost allocation tags, budgets and lifecycle policies (e.g., S3 lifecycle to Glacier).  

**Tradeoff example**: Highly consistent, low-latency DB vs cheaper eventual-consistency store for analytics — choose based on SLAs and cost.


## 7. Common cloud patterns to mention in interviews
- **Stateless API servers + autoscaling group behind LB.**  
- **Worker queue pattern**: enqueue tasks (SQS / Pub/Sub / Service Bus) → workers process asynchronously.  
- **Cache-aside**: Redis/ElastiCache/Memcache/Redis Cache in front of DB for read-heavy workloads.  
- **Sharded storage / partitioning** for high throughput.  
- **Circuit breaker & retries** for resilient inter-service calls.  
- **Blue/green or canary deployments** for safe rollouts.  
- **Event-driven architecture** for decoupling (SNS/SQS / Pub/Sub / Event Grid).  


## 8. Practical: Uploading to S3 (Java, AWS SDK v2)
Modernized, minimal example using AWS SDK v2. This demonstrates basic object upload; in production use IAM roles, retries, multipart upload for large files, and presigned URLs for client uploads.

```java
// Maven coordinates:
// <dependency>
//   <groupId>software.amazon.awssdk</groupId>
//   <artifactId>s3</artifactId>
//   <version>2.x.x</version>
// </dependency>

import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import java.nio.file.Path;

public class S3Uploader {
    private final S3Client s3;

    public S3Uploader(Region region) {
        this.s3 = S3Client.builder()
                         .region(region)
                         .credentialsProvider(DefaultCredentialsProvider.create()) // prefer IAM role
                         .build();
    }

    public void upload(String bucket, String key, Path filePath) {
        PutObjectRequest req = PutObjectRequest.builder()
                                               .bucket(bucket)
                                               .key(key)
                                               .build();
        s3.putObject(req, RequestBody.fromFile(filePath));
        System.out.println("Uploaded " + key + " to " + bucket);
    }

    public void close() { s3.close(); }

    public static void main(String[] args) {
        Region region = Region.US_EAST_1;
        S3Uploader uploader = new S3Uploader(region);
        try {
            uploader.upload("my-bucket", "example.txt", Path.of("path/to/example.txt"));
        } finally {
            uploader.close();
        }
    }
}
```

**Notes & best practices**
- Use **IAM roles** (EC2/ECS task role / Workload Identity on GCP / Managed Identity in Azure) instead of embedding credentials.  
- For large files, use **multipart upload** to improve reliability and parallelism.  
- For browser/client uploads, generate **presigned URLs** server-side so clients can PUT directly to S3 without credentials.  
- Add retry/backoff and instrument upload metrics.


## 9. Operational concerns & monitoring
- **Logs**: Centralize (CloudWatch / Cloud Monitoring / Azure Monitor / Logging) and set retention.  
- **Metrics & alerts**: Track error rates, latency, CPU, queue depth — set SLO/SLIs and alerts.  
- **Tracing**: Distributed tracing (X-Ray / OpenTelemetry / Azure Application Insights).  
- **Runbooks & incident response**: Have documented steps for common failures.


## 10. Interview & Real-World Takeaways

- **Checklist**:  
  - Map services: EC2 ⇄ Compute Engine ⇄ VM ⇄ Compute Instance.  
  - Show scaling: stateless services + autoscaling + LB.  
  - Mention security: IAM / RBAC, KMS, least privilege.  
  - Call out trade-offs: cost vs availability vs latency.  
  - Include observability: metrics, logs, traces.  

- **FAANG/Big Tech Interview Tips**:  
  - **Amazon** → emphasize S3, lifecycle policies, cost optimization.  
  - **Google** → emphasize scalability, global consistency.  
  - **Microsoft** → emphasize enterprise workloads, hybrid cloud (Azure Arc).  
  - **Meta/Netflix** → emphasize speed, autonomy, measurable results.  

- **2-sentence answer template**:  
  > “I’d store user uploads in Blob Storage (or S3/Cloud Storage), generate presigned URLs for client upload, trigger a Function/Lambda for processing, and move cold data to archival tier. This balances cost, security, and scalability.”  

- **Real-World Note**:  
  Mastering service analogues, patterns, and security basics equips you to answer 80% of cloud questions in interviews **and** to design practical, production-grade systems.


## 11. Quick reference & resources
- AWS Docs: S3, EC2, VPC, IAM, Lambda  
- GCP Docs: Cloud Storage, Compute Engine, VPC, IAM  
- Azure Docs: Blob Storage, VNet, Functions, Azure AD  
- OCI Docs: Object Storage, Compute, VCN  
- *Designing Data-Intensive Applications* — Martin Kleppmann  
- Practice: deploy a simple web app + storage + CDN in a cloud free tier


<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
