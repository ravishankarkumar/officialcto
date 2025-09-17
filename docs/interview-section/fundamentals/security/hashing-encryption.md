# Hashing vs Encryption

This article explains the differences between **hashing** and **encryption**, two critical concepts in security. It’s designed for system design interviews and to enhance understanding of secure system design.

---

## What is Hashing?
**Hashing** is a one-way process that transforms input data (of any size) into a fixed-size output, called a **hash value** or **digest**, using a mathematical function. It is **irreversible**, meaning you cannot retrieve the original data from the hash.

### Key Characteristics of Hashing
- **Deterministic**: The same input always produces the same hash.
- **Fixed Output Size**: Regardless of input size, the output is a fixed length (e.g., 256 bits for SHA-256).
- **Collision Resistance**: It’s computationally hard for two different inputs to produce the same hash.
- **Fast Computation**: Hash functions are designed to be quick.
- **Preimage Resistance**: You cannot reverse-engineer the input from the hash.
- **Avalanche Effect**: Small changes in input cause significant changes in the output hash.

### Common Hashing Algorithms
- **MD5**: Fast but insecure due to collision vulnerabilities (not recommended for security).
- **SHA-1**: Deprecated for security purposes due to weaknesses.
- **SHA-256/SHA-3**: Secure, widely used in modern applications (e.g., blockchain, digital signatures).
- **bcrypt**: Designed for password hashing, adds salt and work factor to resist brute-force attacks.
- **Argon2**: Memory-hard function, resistant to GPU-based attacks, winner of the 2015 Password Hashing Competition.

### Use Cases
- **Password Storage**: Store hashed passwords (with salt) to prevent recovery of plaintext passwords.
- **Data Integrity**: Verify file or message integrity (e.g., checksums for downloads).
- **Digital Signatures**: Hash a message and sign the hash to ensure authenticity.
- **Blockchain**: Hashing links blocks and secures transactions (e.g., Bitcoin uses SHA-256).

---

## What is Encryption?
**Encryption** is a two-way process that transforms **plaintext** into **ciphertext** using a key, making data unreadable without the key. It is **reversible**, allowing decryption back to the original data with the correct key.

### Key Characteristics of Encryption
- **Reversible**: Decryption recovers the original data using a key.
- **Key Dependency**: Security relies on the secrecy and strength of the key.
- **Confidentiality**: Protects data from unauthorized access.
- **Variable Output Size**: Ciphertext size typically scales with input size.

### Types of Encryption
1. **Symmetric Encryption**:
   - Same key for encryption and decryption.
   - Examples: **AES** (Advanced Encryption Standard), **DES** (outdated).
   - Fast and suitable for large data but requires secure key exchange.
2. **Asymmetric Encryption**:
   - Uses a public key for encryption and a private key for decryption.
   - Examples: **RSA**, **ECC** (Elliptic Curve Cryptography).
   - Slower, used for key exchange or small data (e.g., SSL/TLS handshake).

### Use Cases
- **Secure Communication**: Encrypt data in transit (e.g., HTTPS via TLS).
- **Data Protection**: Encrypt sensitive data at rest (e.g., disk encryption).
- **Key Exchange**: Asymmetric encryption secures symmetric keys (e.g., in SSL/TLS).
- **Digital Signatures**: Encrypt a hash with a private key to prove authenticity.

---

## Key Differences: Hashing vs Encryption
| Aspect               | Hashing                                 | Encryption                              |
|----------------------|-----------------------------------------|-----------------------------------------|
| **Purpose**          | Data integrity, non-reversible mapping | Data confidentiality, reversible       |
| **Reversibility**    | One-way (irreversible)                 | Two-way (reversible with key)          |
| **Output**           | Fixed-size hash/digest                 | Variable-size ciphertext               |
| **Key Usage**        | No key (or salt for password hashing)  | Requires key(s)                        |
| **Examples**         | SHA-256, bcrypt                        | AES, RSA                               |
| **Use Case**         | Password storage, checksums            | Secure communication, data protection   |
| **Performance**      | Fast, lightweight                      | Slower, especially asymmetric          |

### Analogy
- **Hashing**: Like a fingerprint—unique to the input, but you can’t recreate the person from it.
- **Encryption**: Like locking a box—you can unlock it with the right key to access the contents.

---

## Practical Considerations
- **Hashing for Passwords**:
  - Always use a **salt** (random data) to prevent rainbow table attacks.
  - Use slow, memory-hard functions like bcrypt or Argon2 to resist brute-force attacks.
- **Encryption for Data**:
  - Symmetric encryption (e.g., AES-256) is preferred for large data due to speed.
  - Asymmetric encryption (e.g., RSA) is used for secure key exchange or small data.
- **Common Mistakes**:
  - Using weak hash functions (e.g., MD5, SHA-1) for security-critical tasks.
  - Failing to secure encryption keys, leading to compromised data.
  - Confusing hashing with encryption (e.g., storing encrypted passwords instead of hashed).

---

## Real-World Context
- **Interview Relevance**: System design interviews often involve securing data (e.g., "Design a secure API"). Explain when to hash (e.g., passwords) vs. encrypt (e.g., API payloads).
- **Practical Use**: Hashing ensures data integrity in databases or blockchain; encryption secures HTTPS traffic and cloud storage.
- **Modern Trends**: Post-quantum cryptography for encryption (e.g., NIST’s quantum-resistant algorithms) and GPU-resistant hashing (e.g., Argon2) are gaining traction.

---

## Further Reading
- *Cryptography and Network Security* by William Stallings
- OWASP Password Storage Cheat Sheet
- NIST SP 800-63B (Digital Identity Guidelines)
- Blogs from Cloudflare, Okta, and AWS on security practices