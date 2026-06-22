# 11.2c Where GDDR is used today: NVIDIA RTX cards, A2, some inference cards

#### 🏷️ The Nvidia GPU Architecture — The Silicon at the Heart of AI Infrastructure > 11 GPU Memory Subsystems — VRAM, Bandwidth, and the Capacity Crisis > 11.2 GDDR Memory — Traditional GPU Memory

GDDR (Graphics Double Data Rate) memory is the workhorse of modern GPU computing. While newer memory types like HBM (High Bandwidth Memory) dominate high-end data center accelerators, GDDR remains widely deployed across many NVIDIA products due to its balance of cost, capacity, and performance. Understanding where GDDR is used helps engineers make informed decisions about hardware selection for AI workloads.

---

## 🧠 Context: Why GDDR Still Matters

GDDR memory is a type of VRAM (Video RAM) optimized for high bandwidth and parallel access patterns. It is cheaper to manufacture than HBM, supports larger capacities per module, and is easier to integrate into standard PCB designs. For many AI inference tasks and smaller-scale training workloads, GDDR provides sufficient performance at a fraction of the cost of HBM-based solutions.

---

## ⚙️ NVIDIA RTX Cards — The Consumer-to-Professional Bridge

NVIDIA's RTX series (e.g., RTX 3090, RTX 4090, RTX 6000 Ada) uses GDDR6 or GDDR6X memory. These cards are popular among engineers for:

- **AI prototyping and experimentation** — Lower cost compared to data center GPUs
- **Small-to-medium model training** — Models that fit within 24–48 GB of VRAM
- **Inference serving at scale** — When deployed in clusters for cost-sensitive applications
- **Edge AI and workstations** — Local inference for real-time applications

**Key characteristics:**
- Memory type: GDDR6 or GDDR6X
- Typical capacities: 12 GB to 48 GB
- Bandwidth: 600 GB/s to 1,000+ GB/s (GDDR6X)
- Power consumption: 250–450 W per card

**Common use cases:**
- Fine-tuning large language models (LLMs) with parameter-efficient methods
- Running diffusion models (Stable Diffusion, DALL-E)
- Real-time video analytics and computer vision
- Game AI and simulation environments

---

## 🖥️ NVIDIA A2 — Low-Power Inference Specialist

The NVIDIA A2 is a low-profile, low-power GPU designed specifically for AI inference at the edge and in dense server configurations. It uses GDDR6 memory.

**Key characteristics:**
- Memory type: GDDR6
- Capacity: 16 GB
- Bandwidth: 200 GB/s
- Power consumption: 40–60 W (passive cooling)
- Form factor: Single-slot, low-profile

**Why GDDR is used here:**
- Cost efficiency for inference-only workloads
- Adequate bandwidth for batch inference of small-to-medium models
- Low power envelope allows dense deployment (up to 8–10 cards per server)

**Common use cases:**
- Real-time inference for recommendation systems
- Voice assistants and speech recognition
- Lightweight NLP models (BERT, DistilBERT)
- Video transcoding with AI enhancement

---

## 🕵️ Inference Cards — The GDDR Workhorses

Several NVIDIA inference-focused cards rely on GDDR memory to balance cost and performance:

| Card Model | Memory Type | Capacity | Bandwidth | Power | Primary Use Case |
|------------|-------------|----------|-----------|-------|------------------|
| **T4** | GDDR6 | 16 GB | 320 GB/s | 70 W | Cloud inference, video AI |
| **L4** | GDDR6 | 24 GB | 300 GB/s | 72 W | Modern inference, small LLMs |
| **A10** | GDDR6 | 24 GB | 600 GB/s | 150 W | Mid-range inference, multi-model serving |
| **A16** | GDDR6 | 64 GB (4x16) | 4x200 GB/s | 250 W | Multi-tenant inference, virtualization |

**Why GDDR dominates inference cards:**
- Inference workloads are often memory-bandwidth-bound, not compute-bound
- GDDR provides sufficient bandwidth for batch sizes of 1–32
- Lower cost per GB compared to HBM
- Easier to scale horizontally across many cards

---

## 📊 Comparison: GDDR vs HBM in Real-World AI Workloads

| Aspect | GDDR (RTX, A2, T4) | HBM (A100, H100, H200) |
|--------|---------------------|-------------------------|
| **Cost per GB** | Lower | Higher (3–5x) |
| **Maximum capacity** | 48 GB (RTX 6000) | 80 GB (H100), 141 GB (H200) |
| **Bandwidth** | 200–1,000 GB/s | 1,500–3,350 GB/s |
| **Power efficiency** | Moderate | High (per GB/s) |
| **Best for** | Inference, small training, prototyping | Large-scale training, massive models |
| **Deployment density** | High (low power) | Low (high power, cooling needs) |

---

## 🛠️ Practical Guidance for Engineers

When selecting hardware for AI workloads, consider these GDDR-based options:

**Choose GDDR (RTX, A2, T4, L4) when:**
- Your model fits within 24–48 GB of VRAM
- You are running inference with batch sizes of 1–16
- Cost per deployment is a primary concern
- Power or space constraints limit HBM-based GPUs
- You need rapid prototyping and experimentation

**Avoid GDDR when:**
- Training models larger than 24 GB (use HBM or multi-GPU)
- Running inference with very large batch sizes (64+)
- Workloads require sustained high-bandwidth memory access
- You need the highest possible memory bandwidth (1.5+ TB/s)

---

## 🔍 Key Takeaway

GDDR memory is not obsolete — it is strategically deployed across NVIDIA's product lineup where cost, capacity, and power efficiency matter more than raw bandwidth. For engineers building AI infrastructure, understanding the trade-offs between GDDR and HBM is essential for designing cost-effective, scalable systems. The RTX series, A2, T4, L4, and A10 cards all demonstrate that GDDR remains a vital component in the AI hardware ecosystem, especially for inference workloads and smaller-scale training.