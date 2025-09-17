# Public Key Cryptography (RSA, SSL/TLS)

This article explores **public key cryptography**, focusing on **RSA** and its application in **SSL/TLS**. It provides a clear understanding for system design interviews and practical security engineering.

---

## What is Public Key Cryptography?
**Public key cryptography**, also known as asymmetric cryptography, uses a pair of keys—a **public key** and a **private key**—to secure data. The public key is shared openly, while the private key is kept secret. This approach enables secure communication, authentication, and data integrity without sharing a secret key.

### Key Principles
- **Public Key**: Used to encrypt data or verify signatures. Anyone can access it.
- **Private Key**: Used to decrypt data or create signatures. Only the owner has it.
- **Asymmetry**: Operations with one key (e.g., encryption) can only be reversed with the other (e.g., decryption).

---

## RSA: The Foundation
**RSA** (Rivest-Shamir-Adleman) is a widely used public key algorithm based on the mathematical difficulty of factoring large prime numbers.

### How RSA Works
1. **Key Generation**:
   - Choose two large prime numbers, \( p \) and \( q \).
   - Compute the modulus \( n = p \times q \).
   - Calculate the totient \( \phi(n) = (p-1)(q-1) \).
   - Select a public exponent \( e \) (commonly 65537) that is coprime with \( \phi(n) \).
   - Compute the private exponent \( d \) such that \( d \times e \equiv 1 \pmod{\phi(n)} \).
   - Public key: \( (e, n) \). Private key: \( (d, n) \).

2. **Encryption**:
   - A message \( m \) is encrypted using the public key: \( c = m^e \pmod{n} \).
   - \( c \) is the ciphertext sent to the recipient.

3. **Decryption**:
   - The recipient uses the private key to decrypt: \( m = c^d \pmod{n} \).

4. **Digital Signatures**:
   - To sign a message, hash it (e.g., SHA-256) and encrypt the hash with the private key.
   - The recipient verifies the signature by decrypting it with the public key and comparing it to the message’s hash.