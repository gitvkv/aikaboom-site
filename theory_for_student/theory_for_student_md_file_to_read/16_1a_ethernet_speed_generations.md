# 16.1a 10/25/40/100/200/400/800 GbE: generational progression and use cases per tier

#### 🏷️ The AI Data Center Networking — Moving Petabytes Without Latency > 16 High-Speed Ethernet for AI — Spectrum-X, RoCEv2, and Lossless Fabrics > 16.1 Modern Ethernet Speeds for AI

---

## 🧠 Context Introduction

In AI infrastructure, data moves at incredible speeds between GPUs, storage systems, and compute nodes. Ethernet has evolved dramatically to keep up. For new engineers, understanding the generational progression from **10 GbE to 800 GbE** is essential — each speed tier serves a specific purpose in the AI data center, from management traffic to high-bandwidth GPU interconnects.

This guide breaks down each Ethernet speed, its place in the generational timeline, and where you'll encounter it in real-world AI deployments.

---

## ⚙️ The Generational Progression at a Glance

Ethernet speeds have doubled roughly every 4–5 years. Here's the lineage:

| Speed | Era Introduced | Key Technology | Typical Use in AI |
|-------|----------------|----------------|-------------------|
| **10 GbE** | Mid-2000s | Copper (SFP+) or Fiber | Management networks, legacy storage |
| **25 GbE** | Mid-2010s | SFP28 | Compute-to-ToR (Top of Rack) links, medium-scale AI clusters |
| **40 GbE** | Early 2010s | QSFP+ | Older aggregation links, some HPC clusters |
| **100 GbE** | Mid-2010s | QSFP28 | Current standard for AI training cluster backbones |
| **200 GbE** | Late 2010s | QSFP56 | High-end GPU-to-GPU interconnects, next-gen storage |
| **400 GbE** | Early 2020s | QSFP-DD / OSFP | Modern AI fabric spine links, large-scale distributed training |
| **800 GbE** | Mid-2020s | QSFP-DD800 / OSFP | Cutting-edge AI supercomputing, lossless RoCEv2 fabrics |

---

## 🛠️ Use Cases Per Tier

### 🔹 10 GbE — The Management & Legacy Tier
- **Where you see it:** Out-of-band management ports on servers, BMC (Baseboard Management Controller) networks, legacy storage arrays.
- **AI relevance:** Almost never used for AI data traffic. It's the "slow lane" for monitoring and configuration.
- **Key point:** If you're connecting a GPU server for AI training, 10 GbE is for IPMI/iDRAC, not for data.

### 🔹 25 GbE — The Compute Access Tier
- **Where you see it:** Top-of-Rack switches connecting individual GPU servers in small-to-medium clusters.
- **AI relevance:** Common for inference servers or smaller training clusters where bandwidth per GPU is moderate.
- **Key point:** 25 GbE offers a good balance of cost and performance for leaf (access) layers in AI fabrics.

### 🔹 40 GbE — The Transitional Tier
- **Where you see it:** Older HPC clusters, some storage backends.
- **AI relevance:** Mostly legacy. Avoid for new AI deployments — it's been superseded by 100 GbE.
- **Key point:** You'll encounter it in brownfield environments, but it's not recommended for greenfield AI builds.

### 🔹 100 GbE — The Workhorse Tier
- **Where you see it:** Spine switches in AI clusters, GPU-to-GPU interconnects via RoCEv2, storage fabric links.
- **AI relevance:** The current sweet spot for most AI training clusters. Many NVIDIA DGX systems use 100 GbE for data plane traffic.
- **Key point:** If you're building an AI cluster today, 100 GbE is your baseline for the compute fabric.

### 🔹 200 GbE — The High-Performance Tier
- **Where you see it:** Direct GPU-to-GPU links in high-end clusters, next-generation storage arrays.
- **AI relevance:** Emerging for large language model (LLM) training where model parallelism demands extreme bandwidth.
- **Key point:** Often used in combination with 400 GbE spines — 200 GbE for leaf links, 400 GbE for spine uplinks.

### 🔹 400 GbE — The AI Fabric Backbone
- **Where you see it:** Spine switches in large-scale AI fabrics, connecting multiple 100/200 GbE leaf switches.
- **AI relevance:** Essential for distributed training across hundreds or thousands of GPUs. NVIDIA Spectrum-4 switches support 400 GbE natively.
- **Key point:** 400 GbE is the current standard for the "fat tree" spine layer in AI data centers.

### 🔹 800 GbE — The Frontier Tier
- **Where you see it:** Cutting-edge AI supercomputers, next-gen DGX systems, experimental lossless fabrics.
- **AI relevance:** Designed for the next wave of AI workloads requiring petabyte-scale data movement with near-zero latency.
- **Key point:** Still emerging in 2025, but expect 800 GbE to become the new standard for GPU interconnects within 2–3 years.

---

## 📊 Comparison Table: Speed vs. AI Workload Fit

| Speed | Latency (typical) | Best For | Avoid For |
|-------|-------------------|----------|-----------|
| **10 GbE** | ~5–10 µs | Management, monitoring | Any AI data traffic |
| **25 GbE** | ~2–5 µs | Small inference clusters, leaf access | Large-scale training |
| **40 GbE** | ~3–6 µs | Legacy HPC | New AI deployments |
| **100 GbE** | ~1–3 µs | Mainstream AI training, RoCEv2 fabrics | Extreme-scale LLM training |
| **200 GbE** | ~0.5–2 µs | High-end GPU interconnects | Budget-constrained builds |
| **400 GbE** | ~0.3–1 µs | Spine layer, large distributed training | Small clusters |
| **800 GbE** | ~0.1–0.5 µs | Frontier AI supercomputing | Current cost-sensitive projects |

---

## 🕵️ How to Choose the Right Speed for Your AI Tier

When designing an AI network fabric, follow this simple tiered approach:

- **Management tier:** Always **10 GbE** — it's cheap, reliable, and sufficient for monitoring.
- **Compute leaf (ToR) tier:** Use **100 GbE** or **200 GbE** depending on GPU generation. For NVIDIA H100 clusters, 100 GbE per GPU is typical. For B200 or next-gen, plan for 200 GbE per GPU.
- **Spine tier:** Use **400 GbE** to aggregate multiple leaf switches. For massive clusters, consider **800 GbE** spines.
- **Storage tier:** Match storage speed to compute. If your GPUs use 100 GbE, your storage fabric should also be 100 GbE or higher to avoid bottlenecks.

---

## 🧩 Real-World Example: A Typical AI Cluster Topology

Imagine a cluster with 64 NVIDIA H100 GPUs (8 per server, 8 servers total):

- **Each server** connects to a ToR switch via **8x 100 GbE** links (one per GPU).
- **The ToR switch** uplinks to a spine switch via **4x 400 GbE** links.
- **The spine switch** connects to storage and other spine switches via **400 GbE**.
- **Management network** uses **10 GbE** for server BMCs and switch management ports.

This design ensures no single link is a bottleneck during distributed training.

---

## ✅ Key Takeaways for New Engineers

- **Ethernet speeds are doubling every 4–5 years** — plan for the next generation when designing new clusters.
- **100 GbE is the current baseline** for AI training fabrics. Don't build new clusters with less.
- **400 GbE is the spine standard** for large-scale AI. It's where most of your budget will go.
- **800 GbE is the future** — start learning about it now, but expect premium pricing initially.
- **Always match speed tiers** — mixing 25 GbE with 400 GbE in the same data path creates bottlenecks.
- **Lossless Ethernet (RoCEv2)** is critical for AI — higher speeds enable lower latency, but only if your fabric supports PFC (Priority Flow Control) and ECN (Explicit Congestion Notification).

---

## 📚 Further Reading (within this guide)

- Section 16.2: RoCEv2 and Lossless Fabrics
- Section 16.3: Spectrum-X Architecture for AI
- Section 16.4: Cabling and Optics for High-Speed Ethernet

---

*Remember: In AI infrastructure, bandwidth is never "enough" — always plan for the next speed tier up from what you think you need today.*