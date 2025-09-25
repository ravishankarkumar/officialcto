---
title: CI/CD Pipelines
description: A practical guide to Continuous Integration and Continuous Deployment (CI/CD) pipelines — concepts, benefits, pitfalls, GitHub Actions examples, and interview preparation for scalable systems.
image: /images/cg_cicd.png
---

# CI/CD Pipelines

Modern engineering teams ship code fast and reliably thanks to **CI/CD pipelines**. These pipelines automate the journey from developer commit → tests → build → deployment, ensuring that software reaches users quickly without compromising on quality. For distributed systems and microservices, CI/CD becomes even more critical: it keeps services aligned, reduces manual toil, and ensures resilience.

![CI/CD Pipeline](/images/gg_cicd.png)



## 1. Why CI/CD Pipelines Matter
- **Speed**: Push code to production multiple times a day without fear.  
- **Quality**: Automated tests catch bugs early.  
- **Reliability**: Rollbacks and staged deployments reduce downtime.  
- **Scalability**: In microservices, pipelines scale with the number of services.  
- **Culture**: CI/CD is at the heart of DevOps — shifting teams toward automation-first practices.  

Case study:  
- **Amazon** pioneered automated deployment pipelines to support thousands of microservices, enabling “You build it, you run it.”  
- **Google** uses CI/CD at massive scale with **Borg** and later Kubernetes, proving reliability at planetary scale.  
- **Meta** pushes code **thousands of times per day** with staged rollouts and monitoring baked in.



## 2. Continuous Integration (CI)
**Definition:** Automatically build and test every change to ensure that code integrates cleanly.  

### Key steps:
1. **Commit** → developers push code.  
2. **Build** → code compiled, dependencies installed.  
3. **Test** → unit/integration tests run automatically.  
4. **Artifact** → a build artifact (e.g., JAR, Docker image) is created.  

**Benefits:**
- Detects integration issues early.  
- Keeps the main branch deployable.  
- Encourages small, frequent commits.  



## 3. Continuous Deployment (CD)
**Definition:** Automatically deploy validated builds to staging or production environments.  

### Techniques:
- **Blue/Green Deployment** → run two environments, flip traffic gradually.  
- **Canary Release** → send a small % of traffic to the new version before full rollout.  
- **Rolling Update** → replace pods or VMs gradually.  
- **Rollback** → revert automatically if errors spike.  

**Benefits:**
- Reduce human error.  
- Minimize downtime.  
- Deliver features faster.  



## 4. CI/CD Workflow (End-to-End)
1. Developer pushes code → triggers pipeline.  
2. Pipeline builds & runs automated tests.  
3. Application is containerized (Docker).  
4. Image is pushed to a registry.  
5. Deployment manifests (Kubernetes, Terraform) applied.  
6. Monitoring/alerts verify success.  
7. If metrics fail → rollback triggered.  

Think of it as: **Commit → Build → Test → Package → Deploy → Monitor.**



## 5. Pitfalls of CI/CD
- **Over-complex pipelines** → fragile YAML spaghetti.  
- **Slow builds/tests** → developers skip CI if it takes >30 minutes.  
- **Weak rollback strategy** → teams panic when deploys fail.  
- **Insufficient observability** → deploys succeed but silent bugs leak to production.  
- **One pipeline fits all** → ignoring microservice-specific needs leads to bottlenecks.  

Case study:  
- **Etsy** once had long, brittle deploy cycles; they invested in CI/CD and now ship dozens of times per day.  
- **Netflix** developed **Spinnaker** to solve pipeline scale issues for microservices.



## 6. Best Practices
- **Keep pipelines fast** → parallelize builds/tests.  
- **Shift-left testing** → run unit & integration tests before merge.  
- **Use Infrastructure as Code (IaC)** → pipelines should provision infra automatically.  
- **Automated rollback** → every production deploy must be reversible.  
- **Security checks** → add dependency scanning & secrets detection to the pipeline.  
- **Observability baked-in** → monitor deployment metrics automatically.  
- **Environment parity** → dev/staging/prod should be identical via containers.  



## 7. CI/CD Example with GitHub Actions
### Pipeline (`.github/workflows/cicd.yml`)
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build-test-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up JDK 17
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'
      
      - name: Build & test
        run: mvn clean verify
      
      - name: Build Docker image
        run: docker build -t my-app:${{ github.sha }} .
      
      - name: Push to Docker Hub
        run: |
          echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push my-app:${{ github.sha }}
      
      - name: Deploy to Kubernetes
        run: kubectl apply -f k8s/deployment.yaml
```

### Sample Java Microservice
```java
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}

@RestController
class HealthController {
    @GetMapping("/health")
    public String health() { return "Healthy"; }
}
```



## 8. Interview Preparation
### What to highlight:
- **Pipeline stages**: CI (build, test), CD (deploy, monitor).  
- **Resilience**: rollbacks, canary, observability.  
- **Scaling pipelines**: 1 → 100s of microservices.  
- **Tradeoffs**: GitHub Actions for simplicity vs. Jenkins/Spinnaker for flexibility.  

### Example 2-sentence answer:
> “I’d design a CI/CD pipeline with GitHub Actions that builds, tests, and containerizes the app, then deploys to Kubernetes with a canary rollout. If metrics degrade, the pipeline automatically rolls back.”  



## 9. Quick Reference
- **Books**: *Continuous Delivery* (Humble & Farley).  
- **Tools**: GitHub Actions, Jenkins, Spinnaker, ArgoCD.  
- **Patterns**: Blue/Green, Canary, Rolling updates.  



## 10. Final Notes
CI/CD is not just tooling — it’s culture, speed, and safety combined. Whether in interviews or real-world projects, show that you can:  
- explain the workflow,  
- call out pitfalls,  
- and design resilient pipelines.  

That’s the difference between “deploys work” and “deploys scale.”

**Next**: [Security in Infra: Fraud Prevention](/interview-section/fundamentals/infra-cloud/security-infra).

---
