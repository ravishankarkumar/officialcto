---
title: IaC with Terraform
description: Learn Infrastructure as Code (IaC) with Terraform — provisioning AWS/GCP/OCI resources, key concepts, patterns, and a practical HCL example for system design interviews and real-world engineering.
image: /images/cg_terraform.png
---

# Infrastructure as Code (IaC) with Terraform

Cloud infrastructure today is far too complex to manage by hand. **Infrastructure as Code (IaC)** brings software engineering practices to infrastructure: automation, version control, repeatability, and modular design. Among all IaC tools, **Terraform** has become the industry standard thanks to its cloud-agnostic design and strong ecosystem.

This guide covers Terraform fundamentals, a practical AWS example, and the interview-ready patterns you’ll need to explain in FAANG interviews or apply in real-world engineering.

![Terraform](/images/gg_terraform.png)


## 1. Why IaC with Terraform?
- **Definition**: Manage infrastructure using code instead of manual clicks.  
- **Benefits**: Consistency, repeatability, automation, modularity.  
- **Alternatives**: AWS CloudFormation, Azure ARM templates, Pulumi.  
- **Why Terraform**: Cloud-agnostic, strong ecosystem of providers, open-source, declarative.


## 2. Core Terraform Concepts
- **HCL (HashiCorp Configuration Language)**: Declarative syntax for resources.  
- **Providers**: Plugins for AWS, GCP, Azure, OCI, Kubernetes, etc.  
- **State**: Tracks the real-world infrastructure (`terraform.tfstate`).  
- **Modules**: Reusable building blocks for cleaner, DRY infrastructure.  
- **Workflow**:  
  1. `terraform init` — initialize.  
  2. `terraform plan` — preview changes.  
  3. `terraform apply` — create/update resources.  
  4. `terraform destroy` — clean up.  



## 3. Practical Example: AWS VPC + EC2 + S3
A minimal Terraform example to create a VPC, subnet, EC2 instance, and S3 bucket.

```hcl
provider "aws" {
  region = "us-east-1"
}

# Variables for customization
variable "bucket_name" {
  type    = string
  default = "my-terraform-bucket-example"
}

# VPC
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  tags = { Name = "main-vpc" }
}

# Subnet
resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
  tags = { Name = "public-subnet" }
}

# EC2 Instance
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0" # Amazon Linux 2
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.public.id
  tags = { Name = "web-server" }
}

# S3 Bucket
resource "aws_s3_bucket" "data" {
  bucket = var.bucket_name
  acl    = "private"
  tags   = { Name = "data-bucket" }
}

# Outputs
output "instance_ip" {
  value = aws_instance.web.public_ip
}
output "bucket_name" {
  value = aws_s3_bucket.data.bucket
}
```

**Best practices**:
- Store credentials in `~/.aws/credentials` or use IAM roles, never inline.  
- Split into modules for larger projects (e.g., `vpc`, `compute`, `storage`).  
- Use remote state (e.g., S3 + DynamoDB lock) for teams.  
- Add lifecycle rules and tags for cost visibility.



## 4. Terraform in Distributed Systems
Terraform is used to provision:  
- **Compute**: EC2, GKE nodes, OCI compute.  
- **Networking**: VPCs, load balancers, firewalls.  
- **Storage**: S3, GCS, OCI Object Storage.  
- **Databases**: RDS, Cloud SQL, DynamoDB.  

In distributed systems design:  
- Use **modules** for repeatable patterns (e.g., web service stack).  
- **Environment isolation**: dev / stage / prod.  
- **CI/CD integration**: Run `terraform plan` and `terraform apply` in pipelines.  



## 5. Common Terraform Patterns
- **Modular architecture**: Reusable modules for VPC, DB, app clusters.  
- **Remote state**: Store in S3/GCS/Azure Blob with locking.  
- **Workspaces**: Manage environments (dev, staging, prod).  
- **GitOps workflow**: PR → review → pipeline → terraform apply.  
- **Secrets**: Use cloud-native secrets managers, not inline variables.  



## 6. Interview & Real-World Tips
- **Know the basics**: service mapping (EC2 ⇄ Compute Engine ⇄ OCI Compute).  
- **Explain scaling**: stateless services, autoscaling, LB.  
- **Discuss security**: IAM roles, least privilege, encryption.  
- **Trade-offs**: Manual vs automated, cost vs availability.  
- **Concrete examples**: S3 bucket with lifecycle rules, or Terraform module reuse.  
- **STAR format**: Be ready with one story of IaC automation → cost savings / faster deployment.  

Example response:  
> “I automated VPC + EC2 + S3 provisioning with Terraform, reducing deployment time from 2 days to 30 minutes and cutting costs 15% by adding S3 lifecycle rules.”



## 7. Final Notes
Terraform + IaC is a **must-know skill** for interviews and real-world cloud engineering. Master:  
- Service mapping (compute, storage, networking).  
- Terraform workflow (init, plan, apply).  
- Patterns: modular design, state management, remote backends.  

**Next**: [Containerization: Docker and Kubernetes](/interview-section/fundamentals/infra-cloud/containerization)  



<footer>
  <p>Connect: <a href="https://github.com/your-profile">GitHub</a> | <a href="https://linkedin.com/in/your-profile">LinkedIn</a></p>
  <p>Contact: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
