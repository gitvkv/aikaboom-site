# 35.2a Verifying container image signatures: Docker Content Trust (DCT) and Notary

#### 🏷️ The AI Infrastructure Security & Compliance > 35 Securing the AI Infrastructure Stack > 35.2 Securing The Nvidia Software Stack

---

## 🌐 Context Introduction

When engineers pull container images from registries (like Docker Hub or NVIDIA NGC), how can they be sure the image hasn't been tampered with or replaced by a malicious version? This is where **container image signing** comes in. Docker Content Trust (DCT) and Notary provide a way to cryptographically sign images, ensuring that the image you pull is exactly what the publisher intended. For AI infrastructure, where models and software stacks are critical, verifying signatures is a foundational security practice.

---

## 🔍 What is Docker Content Trust (DCT)?

Docker Content Trust is a feature built into Docker that enables **signing and verification** of container images. It uses a client-side mechanism to ensure image integrity and publisher authenticity.

- **How it works**: DCT leverages a **Notary server** to manage cryptographic signatures and metadata.
- **Key concept**: When DCT is enabled, Docker will only pull images that have been signed by a trusted publisher.
- **Default state**: DCT is **disabled** by default. Engineers must explicitly enable it.

---

## 🛠️ What is Notary?

Notary is the underlying open-source project that powers Docker Content Trust. It is a service for publishing and verifying **trusted collections** of content.

- **Role**: Notary manages **trusted metadata** (like image digests and signatures) in a secure, tamper-evident way.
- **Components**:
  - **Notary server**: Stores the signed metadata.
  - **Notary client**: Used by engineers to sign and verify content.
  - **Trusted root key**: The top-level key used to sign all other keys in the trust chain.
- **Relationship to DCT**: DCT is the Docker-specific implementation that uses Notary under the hood.

---

## ⚙️ How DCT and Notary Work Together

The flow for signing and verifying images involves several steps:

- **Signing an image**:
  1. Engineer enables DCT on their local Docker client.
  2. Docker pushes the image to a registry.
  3. Docker automatically sends image metadata to the Notary server.
  4. The engineer uses a **signing key** (private key) to sign the image.
  5. The Notary server stores the signature and metadata.

- **Verifying an image**:
  1. Engineer enables DCT on their Docker client.
  2. Docker pulls the image from the registry.
  3. Docker queries the Notary server for the image's signed metadata.
  4. Docker verifies the signature using the **public key** (stored in the trust database).
  5. If the signature is valid, the image is pulled. If not, the pull is rejected.

---

## 🕵️ Key Concepts: Trust Keys

DCT uses a hierarchy of keys to manage trust:

- **Root key**: The most important key. Used to sign all other keys. Must be stored offline and backed up securely.
- **Targets key**: Signs the metadata that lists which image tags are trusted.
- **Snapshot key**: Signs the metadata that lists all versions of the trust data.
- **Timestamp key**: Automatically rotated, ensures freshness of trust data.

---

## 📊 Comparison: DCT Enabled vs. Disabled

| Feature | DCT Disabled | DCT Enabled |
|---------|--------------|-------------|
| Image signature verification | ❌ Not performed | ✅ Performed automatically |
| Pull behavior | Pulls any image regardless of signature | Pulls only signed images |
| Security level | Low (no tamper detection) | High (tamper-proof) |
| Use case | Development/testing | Production AI workloads |
| Performance impact | None | Slight overhead for signature check |

---

## 🧪 Practical Workflow for Engineers

Here is a simplified workflow for using DCT in an AI infrastructure context:

1. **Enable DCT** on your Docker client by setting an environment variable.
2. **Generate a signing key** using the Docker Notary client.
3. **Tag and push** your AI container image to a registry (e.g., NVIDIA NGC).
4. **Sign the image** by pushing it with DCT enabled.
5. **Verify the image** by pulling it with DCT enabled on another machine.
6. **Audit trust data** by inspecting the Notary server metadata.

---

## ⚠️ Important Considerations

- **Key management**: Losing the root key means you cannot sign new images or verify old ones. Store it securely offline.
- **Registry support**: Not all registries support DCT. NVIDIA NGC and Docker Hub do.
- **Performance**: Signature verification adds a small delay to image pulls, but is negligible for most AI workloads.
- **CI/CD integration**: DCT can be integrated into automated pipelines to ensure only signed images are deployed to production.

---

## ✅ Summary

- **Docker Content Trust (DCT)** is a feature that enforces image signing and verification.
- **Notary** is the underlying service that stores and manages trust metadata.
- DCT uses a **key hierarchy** (root, targets, snapshot, timestamp) to secure the trust chain.
- Enabling DCT ensures that only **authentic, untampered** images are used in your AI infrastructure.
- For new engineers, the key takeaway is: **always enable DCT in production environments** to prevent supply chain attacks.

---

## 📚 Additional Resources

- Docker official documentation on Content Trust
- Notary project repository and architecture overview
- NVIDIA NGC security best practices for container images