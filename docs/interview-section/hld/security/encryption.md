---
title: TLS & Encryption (At Rest vs In Transit)
description: Understanding TLS, encryption at rest, and encryption in transit for securing distributed systems.
---

# TLS & Encryption (At Rest vs In Transit)

In distributed systems, encryption ensures **confidentiality, integrity, and trust**.  
It protects against eavesdropping, tampering, and unauthorized access.

---

## 1. Encryption in Transit

- Protects data while moving between clients, services, or regions.  
- Prevents **man-in-the-middle attacks**.  

### TLS (Transport Layer Security)
- Successor of SSL.  
- Provides encryption + authentication (certificates).  
- Widely used in HTTPS, gRPC, SMTP, etc.  

### Example
- HTTPS → ensures requests between browser and server are encrypted.  
- gRPC with TLS → secure microservice-to-microservice calls.  

---

## 2. Encryption at Rest

- Protects data stored on disk (databases, files, backups).  
- Prevents attackers from reading data if storage is stolen.  

### Techniques
- **Full-disk encryption** → OS-level, e.g., LUKS.  
- **Database-level encryption** → field or column encryption.  
- **Object storage encryption** → S3, GCS auto-encrypt data.  

---

## 3. Key Management

- Encryption is only as strong as its **key management**.  
- Centralized services: AWS KMS, GCP KMS, HashiCorp Vault.  
- Best practices:  
  - Rotate keys regularly.  
  - Least privilege for access.  
  - Use Hardware Security Modules (HSMs).  

---

## 4. Trade-offs

| Type              | Pros                        | Cons                        |
|-------------------|-----------------------------|-----------------------------|
| In Transit (TLS)  | Prevents eavesdropping      | Latency overhead (small)    |
| At Rest           | Protects stolen media       | Key management complexity   |

---

## 5. Real-World Examples

- **TLS Everywhere** → Google enforces encrypted connections internally.  
- **AWS S3** → auto-encrypts objects at rest with AES-256 or KMS.  
- **PostgreSQL** → supports TLS for client connections + TDE for storage.  

---

## 6. Interview Tips

- Always mention **encryption at rest + in transit** for security questions.  
- Say: *“I’d enforce TLS for service communication and enable storage-level encryption with managed keys.”*  
- Mention KMS/Vault when asked about **key rotation**.  

---

## 7. Diagram

```
[ Client ] ⇄ TLS ⇄ [ Service A ] ⇄ TLS ⇄ [ Service B ]
                    | (encrypted storage at rest)
```

---

## 8. Next Steps

- Learn about [Rate Limiting & Throttling](/interview-section/hld/security/rate-limiting.md).  
- Explore [DDoS Protection](/interview-section/hld/security/ddos.md).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
