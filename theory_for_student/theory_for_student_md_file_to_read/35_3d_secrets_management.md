# 35.3d Secrets management: HashiCorp Vault and sealed secrets for API keys and model credentials

#### 🏷️ The AI Infrastructure Security & Compliance > 35 Securing the AI Infrastructure Stack > 35.3 Kubernetes Security for AI Clusters

---

## 🔍 Context Introduction

When you run AI workloads in Kubernetes, your models and pipelines often need access to sensitive information like API keys for external services (e.g., NVIDIA AI Enterprise, Hugging Face, or cloud providers) and model credentials (e.g., access tokens for private model registries). Storing these secrets in plain text inside configuration files or environment variables is a major security risk.

This topic introduces two popular approaches to manage secrets in AI infrastructure: **HashiCorp Vault** (a centralized secrets engine) and **Sealed Secrets** (a Kubernetes-native encryption method). Both help engineers keep API keys and model credentials safe without slowing down deployment workflows.

---

## ⚙️ Why Secrets Management Matters for AI Workloads

- **API keys** for model inference endpoints (e.g., NVIDIA Triton Inference Server) must never be hardcoded.
- **Model credentials** (e.g., private container registry tokens for pulling GPU-optimized models) need rotation and access control.
- **Compliance requirements** (e.g., SOC 2, HIPAA) demand that secrets are encrypted at rest and in transit.
- **Human error** is reduced when secrets are automated and not shared via email or chat.

---

## 🛠️ HashiCorp Vault: Centralized Secrets Engine

HashiCorp Vault acts as a secure, centralized vault that stores, manages, and controls access to secrets. It integrates with Kubernetes via a sidecar or CSI driver.

### Key Concepts

- **Dynamic Secrets**: Vault can generate short-lived credentials on demand (e.g., temporary API keys that expire after 1 hour).
- **Lease & Renewal**: Each secret has a time-to-live (TTL). Pods must renew the lease before it expires.
- **Policy-based Access**: You define who (which service account or pod) can read which secrets.
- **Audit Logging**: Every access to a secret is logged for security reviews.

### How It Works with AI Clusters

1. An AI training pod requests an API key for NVIDIA NGC.
2. Vault authenticates the pod using its Kubernetes service account token.
3. Vault returns the API key with a short TTL (e.g., 24 hours).
4. The pod uses the key, and Vault automatically revokes it after the TTL.

### Pros and Cons

| ✅ Pros | ❌ Cons |
|---------|---------|
| Centralized management across multiple clusters | Requires running and maintaining a Vault cluster |
| Dynamic secrets with automatic rotation | Adds latency for each secret request |
| Fine-grained access policies | More complex initial setup |
| Strong audit trail | Sidecar or CSI driver overhead |

---

## 🔐 Sealed Secrets: Kubernetes-Native Encryption

Sealed Secrets (by Bitnami) encrypts your Kubernetes Secrets into a custom resource called **SealedSecret**. Only a controller running in your cluster can decrypt it back into a regular Kubernetes Secret.

### Key Concepts

- **Encryption at Rest**: You create a SealedSecret YAML file that contains an encrypted version of your secret data.
- **Cluster-Specific**: The encryption key is unique to each cluster. A SealedSecret created for cluster A cannot be decrypted by cluster B.
- **GitOps Friendly**: You can safely commit SealedSecret YAML files to Git repositories because they are encrypted.
- **No Runtime Dependencies**: Once decrypted, the secret is a standard Kubernetes Secret — no sidecar needed.

### How It Works with AI Clusters

1. An engineer creates a SealedSecret from a plain Kubernetes Secret using the **kubeseal** CLI tool.
2. The encrypted SealedSecret YAML is stored in Git alongside the AI pipeline manifests.
3. When deployed, the Sealed Secrets controller decrypts it and creates a standard Kubernetes Secret.
4. Your AI pod mounts the Secret as an environment variable or volume.

### Pros and Cons

| ✅ Pros | ❌ Cons |
|---------|---------|
| Simple to use — no external service to run | Secrets are static — no automatic rotation |
| GitOps compatible (safe to commit to Git) | Encryption key is cluster-specific (backup needed) |
| No runtime overhead after decryption | Cannot generate dynamic/temporary secrets |
| Works offline (no network dependency) | Less granular access control than Vault |

---

## 🕵️ Comparison: When to Use Which

| Feature | HashiCorp Vault | Sealed Secrets |
|---------|----------------|----------------|
| **Secret type** | Dynamic (short-lived) | Static (long-lived) |
| **Rotation** | Automatic | Manual (re-encrypt) |
| **Setup complexity** | High (requires Vault cluster) | Low (install controller once) |
| **GitOps compatibility** | Requires Vault Agent injector | Native (encrypted YAML in Git) |
| **Audit logging** | Built-in | Kubernetes audit logs only |
| **Best for** | Multi-cluster, high-security environments | Single cluster, CI/CD pipelines |

---

## 🧩 Practical Guidance for New Engineers

- **Start with Sealed Secrets** if you are new to Kubernetes and want a simple, Git-friendly way to store API keys for your AI models. It requires minimal infrastructure.
- **Graduate to HashiCorp Vault** when you need automatic secret rotation, cross-cluster secret sharing, or compliance-level audit trails.
- **Never store secrets in plain text** in configuration files, Docker images, or environment variable definitions.
- **Use Kubernetes RBAC** alongside both tools to control which pods can access which secrets.
- **Test secret rotation** by simulating a credential expiry in a staging environment before moving to production.

---

## 📚 Summary

Secrets management is a foundational skill for AI infrastructure and operations. **HashiCorp Vault** provides enterprise-grade, dynamic secret management with strong access controls and auditing — ideal for large-scale, multi-cluster AI deployments. **Sealed Secrets** offers a simpler, Kubernetes-native approach that works seamlessly with GitOps workflows, making it perfect for smaller teams or single-cluster setups.

Choose the tool that matches your team's operational maturity and security requirements. Both are widely used in NVIDIA-Certified environments to protect API keys and model credentials.