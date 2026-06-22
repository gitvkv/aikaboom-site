# 25.3e NIM caching: model weight caching on host for faster restart times

#### 🏷️ The Nvidia Software Stack — Bridging Silicon and Python > 25 NVIDIA NGC, AI Enterprise, and NIMs > 25.3 NVIDIA NIM (Inference Microservices)

## 🧠 Context Introduction

When you deploy an AI model using NVIDIA NIM (NVIDIA Inference Microservice), the model's **weights** (the learned parameters that define how the model behaves) must be loaded into GPU memory before inference can begin. This loading process can take several minutes for large models (e.g., 70B+ parameter LLMs). If a NIM container restarts — due to updates, scaling events, or failures — you would normally wait for those weights to be fetched again from remote storage (like NGC or cloud storage). This is where **NIM caching** comes in: it stores model weights on the host filesystem so that restart times are dramatically reduced.

---

## ⚙️ What Is Model Weight Caching?

Model weight caching is a mechanism where NIM saves a copy of the downloaded model weights to a **local directory on the host machine** (the server running the NIM container). On subsequent restarts, NIM checks this cache first. If the weights are found locally, it loads them directly from disk instead of re-downloading them from the network.

**Key benefit:** Restart times drop from minutes to seconds.

---

## 🛠️ How It Works

- When you launch a NIM container for the first time, NIM downloads the model weights from NVIDIA NGC (or another source) and stores them in a specified cache directory.
- The cache directory is mounted as a **volume** inside the container.
- On subsequent container restarts (even on a different host, if the same cache volume is available), NIM detects the cached weights and loads them directly.
- The cache is persistent — it survives container removal and re-creation, as long as the host directory remains intact.

---

## 📊 Comparison: Without Cache vs. With Cache

| Aspect | Without Caching | With Caching |
|--------|----------------|--------------|
| **First startup** | Downloads full model weights (minutes) | Downloads full model weights (minutes) |
| **Restart time** | Re-downloads all weights (minutes) | Loads from local disk (seconds) |
| **Network dependency** | Required every restart | Only required for first launch |
| **Disk space usage** | Minimal (no local copy) | High (stores full model weights) |
| **Ideal for** | Ephemeral, single-use containers | Long-running, frequently restarted services |

---

## 🕵️ Where to Store the Cache

The cache directory is typically placed on a **fast local SSD** attached to the host machine. For production deployments, consider:

- A dedicated **NVMe SSD** partition for model weights.
- A **shared filesystem** (e.g., NFS) if multiple hosts need access to the same cache — but be aware of network latency.
- A **persistent volume claim (PVC)** in Kubernetes environments.

**Important:** The cache directory must be writable by the NIM container's user and have enough free space for the model(s) you plan to cache. A single large LLM (e.g., Llama 3 70B) can require 140+ GB of disk space.

---

## 🧪 Practical Example (No Code Blocks)

To enable caching, you set an environment variable when starting the NIM container. For example:

**For reference:**
```
docker run --gpus all \
  -e NIM_CACHE_PATH=/opt/nim/cache \
  -v /host/cache/directory:/opt/nim/cache \
  nvcr.io/nvidia/nim:llama-3.1-8b-instruct
```

📤 **Output:** On first run, you will see log messages indicating that weights are being downloaded and cached. On subsequent runs, you will see messages like "Loading model weights from cache" and the container will be ready in seconds.

---

## ✅ Best Practices for Engineers

- **Pre-cache models** during image build or as a separate initialization step — this avoids download delays during production scaling events.
- **Monitor disk usage** on the cache volume — large models can fill up space quickly.
- **Use the same cache path** across all NIM containers for the same model to maximize cache hits.
- **Consider cache eviction policies** — if disk space is limited, you may need to manually remove old cached models.
- **Test restart times** with and without caching to quantify the improvement for your specific model and hardware.

---

## 📌 Summary

- **NIM caching** stores model weights on the host filesystem.
- It **dramatically reduces restart times** from minutes to seconds.
- The cache is enabled by setting a single environment variable and mounting a host directory.
- It is essential for production deployments where uptime and fast recovery matter.

By using model weight caching, you make your AI infrastructure more resilient and responsive — a key skill for any engineer working with NVIDIA NIM.