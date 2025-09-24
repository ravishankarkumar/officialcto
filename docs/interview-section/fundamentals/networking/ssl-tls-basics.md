---
title: SSL/TLS Basics
description: An overview of SSL/TLS protocols, their purpose, handshake process, versions, role of Certificate Authorities (CAs), and real-world importance.
---

# SSL/TLS Basics

The **SSL (Secure Sockets Layer)** and its successor **TLS (Transport Layer Security)** are cryptographic protocols that provide **secure communication over the internet**.  

They are the backbone of secure browsing, online banking, e-commerce, and APIs.  
Today, SSL is considered obsolete, and TLS (especially TLS 1.3) is the standard.  



## 1. Why SSL/TLS?

Without encryption, internet traffic can be intercepted or tampered with.  
SSL/TLS ensures:

- **Confidentiality** → data is encrypted, outsiders can’t read it.  
- **Integrity** → ensures data isn’t modified in transit.  
- **Authentication** → certificates verify you’re talking to the correct server.  



## 2. How SSL/TLS Works (Simplified Handshake)

When a client (browser) connects to a server (`https://example.com`), the TLS handshake occurs:

1. **Client Hello**  
   - Browser proposes supported TLS versions, cipher suites.  

2. **Server Hello**  
   - Server picks best supported version and cipher suite.  
   - Sends back its **digital certificate** (X.509).  

3. **Certificate Validation**  
   - Browser checks if certificate is trusted and not expired/revoked.  

4. **Key Exchange**  
   - Browser and server exchange cryptographic keys (RSA, Diffie–Hellman, or ECDHE).  

5. **Session Keys Established**  
   - Both sides derive a shared session key.  

6. **Secure Communication**  
   - All future HTTP traffic is encrypted using symmetric encryption (fast).  



## 3. Certificate Authorities (CAs) and the Chain of Trust

![HTTPS Security](/images/gg_https_security.png)

A **digital certificate** is only trustworthy if issued by a trusted entity.  
That’s where **Certificate Authorities (CAs)** come in.

### What is a Certificate Authority?
- A **CA is a trusted third party** that issues digital certificates.  
- Certificates bind a **public key** to a domain (e.g., `example.com`).  
- Examples: DigiCert, Sectigo, GlobalSign, Let’s Encrypt.  

### The Chain of Trust
1. **Root CA**  
   - Trusted by operating systems and browsers.  
   - Root certificates are pre-installed in your device/browser.  

2. **Intermediate CA**  
   - Root CAs delegate to intermediates for security.  
   - Intermediates sign server certificates.  

3. **Server Certificate**  
   - Installed on the website (e.g., `example.com`).  
   - Proves the site’s identity to the browser.  

Your browser verifies this chain:  
`Server Certificate → Intermediate CA → Root CA (trusted in OS/browser)`  

### Certificate Validation Steps
- Is the certificate signed by a trusted CA?  
- Is the domain name correct (`example.com`)?  
- Is it valid (not expired/revoked)?  
- Does the signature match (not tampered)?  

If any step fails, you see browser warnings like *“Your connection is not private”*.  


## 4. Self-signed Certificates (Detailed)

**Definition:**  
A **self-signed certificate** is a certificate that is signed with its own private key rather than by a trusted CA. In other words, the issuer and the subject are the same.

### Typical Uses
- **Development and testing** (local environments).  
- **Internal services** where an external CA is unnecessary and the environment is controlled.  
- **IoT devices** and appliances that cannot easily obtain CA-signed certificates.  
- Short-term or experimental setups.

### How they differ from CA-signed certificates
- **No third‑party validation.** A browser or client cannot automatically trust a self-signed certificate because there is no chain to a trusted root.  
- **No public trust** unless you explicitly add the certificate (or its signing root) to the client's trust store.  
- **No Certificate Transparency** for public auditing unless you publish it manually.

### Browser and Client Behavior
- Browsers **display warnings** when encountering self-signed certs (e.g., "Your connection is not private").  
- Users can **manually accept** or **import** the cert into their OS/browser trust store (not recommended for public sites).  
- In automated systems (CI, APIs) you can configure clients to trust specific self-signed certificates or disable verification (dangerous).

### Creating a Self-signed Certificate (example)
```bash
# Generate a private key and a self-signed cert valid for 365 days
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes   -subj "/CN=example.local"
```

### Making a Locally Trusted Root (better for internal use)
1. Create a root CA private key and self-signed root certificate.  
2. Create a CSR for the server.  
3. Sign the server CSR with the root CA to produce a certificate.  
4. Install the root CA certificate into client trust stores (OS, browsers, mobile MDM).  

This approach mimics a CA hierarchy but is **private** and should be protected carefully.

### Security Implications & Risks
- **Susceptible to spoofing/MITM** if an attacker can trick clients into trusting a malicious cert.  
- **No external revocation mechanism** (CRL/OCSP) that browsers will rely on publicly.  
- **Not suitable for public-facing services**—use a CA-signed certificate instead.

### Best Practices
- Use **self-signed certs only** for development, testing, or tightly controlled internal systems.  
- For internal deployments use a **private CA** (root + intermediates) and provision trust via enterprise tooling (MDM, configuration management).  
- **Never override browser warnings** on production, public websites.  
- Prefer automated CA issuance (ACME/Let’s Encrypt) for public services.


## 5. SSL vs TLS

- **SSL (Secure Sockets Layer)**  
  - Created by Netscape in the 1990s.  
  - Versions SSL 2.0 and 3.0 are **deprecated** (insecure).  

- **TLS (Transport Layer Security)**  
  - Standardized successor to SSL.  
  - Stronger cryptography and better security guarantees.  
  - All modern secure communication uses **TLS**.  



## 6. TLS Versions

| Version     | Year | Status           | Key Features                                              |
|-------------|------|------------------|-----------------------------------------------------------|
| SSL 2.0     | 1995 | Deprecated       | First widely deployed SSL, insecure.                      |
| SSL 3.0     | 1996 | Deprecated       | Improved security, but vulnerable (POODLE attack).        |
| TLS 1.0     | 1999 | Deprecated       | First TLS standard (RFC 2246).                            |
| TLS 1.1     | 2006 | Deprecated       | Better protection against CBC attacks.                    |
| TLS 1.2     | 2008 | Widely supported | Strong cryptography, customizable ciphers.                |
| TLS 1.3     | 2018 | Current standard | Simplified handshake, faster, only modern ciphers allowed.|



## 7. Key Features of TLS

- **Encryption**: Protects confidentiality (AES, ChaCha20).  
- **Integrity**: Ensures messages aren’t altered (HMAC).  
- **Authentication**: Certificates issued by trusted Certificate Authorities (CAs).  
- **Forward Secrecy**: TLS 1.3 enforces ephemeral key exchanges (ECDHE).  



## 8. Real-World Importance

- **Browsers**: Padlock 🔒 indicates active TLS.  
- **E-commerce**: Protects credit card transactions.  
- **APIs & Cloud Services**: All major APIs require TLS.  
- **Compliance**: GDPR, PCI-DSS, HIPAA mandate secure connections.  
- **Performance**: TLS 1.3 is faster due to fewer round trips.  



## 9. Interview Notes

- *“Is SSL still used?”* → No, SSL is deprecated. Use TLS (1.2 or 1.3).  
- *“Why TLS 1.3?”* → Faster, more secure, removes legacy ciphers.  
- *“What does a certificate do?”* → Proves server identity (issued by a CA).  
- *“What is a CA?”* → A trusted authority that issues certificates forming a chain of trust.  
- *“Asymmetric vs Symmetric in TLS?”* → Handshake uses **asymmetric**; data transfer uses **symmetric** for speed.  


<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>
