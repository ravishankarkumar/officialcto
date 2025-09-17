---
title: Authentication vs Authorization
description: Understanding authentication vs authorization in distributed systems, with OAuth2, JWT, and RBAC explained for HLD interviews.
---

# Authentication vs Authorization (OAuth2, JWT, RBAC)

In distributed systems, **security** starts with ensuring the right people and services can access the right resources.  
This is achieved with **authentication** and **authorization**.

---

## 1. Authentication

- Verifies **who you are**.  
- Example: logging in with username/password, fingerprint, or OAuth provider.  
- Common methods:  
  - Passwords, biometrics.  
  - Single Sign-On (SSO).  
  - OAuth2 flows (Google, GitHub login).  

---

## 2. Authorization

- Verifies **what you can do**.  
- Example: you’re authenticated as a user, but can you access admin dashboard?  
- Enforced via **policies** (roles, permissions, attributes).  

---

## 3. OAuth2

- Industry standard for **delegated access**.  
- Lets users grant access to apps without sharing credentials.  

### Flows
1. **Authorization Code Flow** (most common, web apps).  
2. **Client Credentials Flow** (service-to-service).  
3. **Implicit & PKCE** (mobile/SPA apps).  

### Example
- Login with Google → app gets token to access profile data.  

---

## 4. JWT (JSON Web Tokens)

- Compact, stateless way to transmit identity.  
- Encoded & signed (not encrypted by default).  
- Contains **claims** (e.g., user id, role, expiry).  

### Example Token Payload
```json
{
  "sub": "123456",
  "role": "admin",
  "exp": 1716239022
}
```

- Verifiable with signature, no DB lookup needed.  

---

## 5. RBAC (Role-Based Access Control)

- Users assigned roles, roles have permissions.  
- Example:  
  - Role `admin` → can delete users.  
  - Role `viewer` → can only read data.  

### Variants
- **ABAC** (Attribute-based access control).  
- **PBAC** (Policy-based access control).  

---

## 6. Real-World Examples

- **Google Cloud IAM** → RBAC + policies.  
- **AWS Cognito** → authentication + JWT issuance.  
- **Auth0** → OAuth2 + JWT provider.  

---

## 7. Interview Tips

- Always clarify difference: **AuthN = identity, AuthZ = permissions**.  
- Mention OAuth2 & JWT for web-scale systems.  
- Say: *“I’d use RBAC for internal apps, OAuth2 + JWT for external-facing APIs.”*  

---

## 8. Diagram

```
[ User Login ] → [ Authentication (OAuth2) ]
         ↓
 [ JWT issued ] → [ Authorization via RBAC policies ]
```

---

## 9. Next Steps

- Learn about [TLS & Encryption](/interview-section/hld/security/encryption.md).  
- Explore [Rate Limiting & Throttling](/interview-section/hld/security/rate-limiting.md).  

---

<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
