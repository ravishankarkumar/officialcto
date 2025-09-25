---
title: Public Key Cryptography (RSA, SSL/TLS)
description: Deep dive into public key cryptography, RSA, digital signatures, and their role in SSL/TLS. Includes examples, modern perspectives, and interview tips for system design and security engineering.
image: /images/cg_cryptography.png
---

# Public Key Cryptography (RSA, SSL/TLS)

**Public key cryptography**, also called **asymmetric cryptography**, is the backbone of secure communication on the internet.  
It powers **HTTPS**, **digital signatures**, and modern authentication systems.  
This article explores **RSA**, how it works, its role in **SSL/TLS**, and modern perspectives.


## 1. Why Public Key Cryptography?

Before public key cryptography, systems relied on **symmetric encryption** (same key for encryption & decryption).  
Problem → **Key Distribution**: How do you securely share the secret key over an insecure network?  

**Asymmetric cryptography solves this**:  
- Each user has a **public key** (shareable) and a **private key** (kept secret).  
- Data encrypted with one can only be decrypted with the other.  

✅ This enables secure communication without pre-sharing a secret key.

![Symmetric vs Asymmetrics cryptography](/images/cg_cryptography.png)


## 2. RSA: The Foundation

**RSA** (Rivest–Shamir–Adleman, 1977) is one of the earliest and most widely used asymmetric algorithms.  
Its security relies on the difficulty of factoring very large integers.

![RSA Algorithm](/images/cg_rsa.png)

### 2.1 How RSA Works

1. **Key Generation**
   - Choose two large primes $p$ and $q$.  
   - Compute $n = p \times q$.  
   - Compute $\varphi(n) = (p - 1)(q - 1)$.  
   - Choose a public exponent $e$ (commonly $65537$) such that $\gcd(e, \varphi(n)) = 1$.  
   - Compute the private exponent $d$ such that $d \times e \equiv 1 \pmod{\varphi(n)}$.  
   - Public key: $(e, n)$; Private key: $(d, n)$.  

2. **Encryption**
   - Sender computes $c = m^e \bmod n$.  
   - $c$ is the ciphertext sent to the recipient.  

3. **Decryption**
   - Recipient computes $m = c^d \bmod n$.  

4. **Digital Signatures**
   - Sender hashes the message to produce $h$ and computes the signature $s = h^d \bmod n$.  
   - Recipient verifies by computing $h' = s^e \bmod n$ and checking $h' = h$.  

---

### 2.2 Example (Small Numbers)

_Note: toy example for illustration only (not secure)._

- Let $p = 61$ and $q = 53$, so $n = 3233$.  
- Then $\varphi(n) = (61 - 1)(53 - 1) = 3120$.  
- Choose $e = 17$ (which is coprime with 3120).  
- Compute $d = 2753$ (the modular inverse of 17 modulo 3120).  
- Public key: $(17, 3233)$; Private key: $(2753, 3233)$.  

Encrypt message $m = 65$:  
- $c = 65^{17} \bmod 3233 = 2790$.  

Decrypt:  
- $m = 2790^{2753} \bmod 3233 = 65$.



## 3. Limitations of RSA

- **Performance** → RSA is computationally expensive for large data.  
- **Padding Requirements** → Raw RSA is insecure; use padding schemes such as OAEP for encryption and PSS for signatures.  
- **Lack of Forward Secrecy** → If a server's long-term private key is compromised, past sessions using RSA key exchange can be decrypted.  
- **Key Size** → Secure RSA generally requires 2048–4096 bit keys (larger than comparable ECC keys).  

📌 **Why not use RSA for everything?** → RSA is typically used to securely exchange a symmetric session key (e.g., for AES), and symmetric ciphers are used for bulk data encryption.



## 4. Public Key Cryptography in SSL/TLS

Public key cryptography is fundamental to **HTTPS (SSL/TLS)**, which secures web communication.

### 4.1 TLS Handshake (Simplified)

1. **Client Hello** → Browser sends supported ciphers and a random nonce.  
2. **Server Hello** → Server responds with chosen cipher suite and its certificate (containing the server's public key).  
3. **Key Exchange** →
   - Older TLS used RSA to encrypt a session key.  
   - Modern TLS (1.3) prefers ephemeral Diffie–Hellman (usually ECDHE) for forward secrecy.  
4. **Session Key Established** → Both parties derive the same symmetric session key from exchanged material.  
5. **Secure Communication** → Application data is encrypted with a symmetric cipher (e.g., AES-GCM or ChaCha20-Poly1305).  

### 4.2 Certificates & Certificate Authorities (CAs)

- Servers prove identity using X.509 certificates signed by trusted Certificate Authorities (CAs).  
- Browsers and OSes maintain root CA trust stores; a certificate chain is validated up to a trusted root.  

📌 **Interview Tip**: Explain why TLS combines asymmetric cryptography (for auth/key exchange) with symmetric cryptography (for performance).



## 5. Modern Cryptography Beyond RSA

- **Elliptic Curve Cryptography (ECC)** → Provides similar security with much smaller key sizes (e.g., a 256-bit EC key ≈ 3072-bit RSA). Algorithms: ECDSA (signatures), ECDHE (ephemeral key exchange).  
- **TLS 1.3** → Emphasizes ephemeral Diffie–Hellman (ECDHE) for forward secrecy and removes many older insecure options.  
- **Post-Quantum Cryptography (PQC)** → Quantum algorithms (e.g., Shor's algorithm) could break RSA/ECC. NIST is standardizing PQC algorithms (e.g., CRYSTALS-Kyber for KEMs).



## 6. Real-World Context & Interview Tips

- **Interview Relevance**
  - Know RSA key generation and why RSA is used for key exchange (and not for bulk encryption).  
  - Be able to describe a TLS handshake at a high level and explain forward secrecy.  

- **Practical Use**
  - RSA/ECC are used for HTTPS, SSH, software signing, and secure messaging.  

- **Analogy**
  - RSA is like a locked mailbox: the public key is the slot (anyone can drop a message in), while the private key is the physical key to open the mailbox.



## 7. Further Reading

- *Cryptography and Network Security* — William Stallings  
- *Applied Cryptography* — Bruce Schneier  
- RFC 8446 (TLS 1.3 Specification)  
- NIST Post-Quantum Cryptography Project



<footer>
  <p>Connect: <a href="https://www.linkedin.com/in/ravi-shankar-a725b0225/">LinkedIn</a></p>
  <p>&copy; 2025 Official CTO. All rights reserved.</p>
</footer>