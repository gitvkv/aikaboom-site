# 13.4b DGX A100: NVIDIA's complete system — HGX + 2x AMD EPYC + networking

Welcome to the world of enterprise AI infrastructure. The NVIDIA DGX A100 is not just a server; it is a fully integrated AI supercomputer in a box. For new engineers, think of it as the "reference design" that combines NVIDIA's most advanced GPU technology (the HGX baseboard), powerful host CPUs (AMD EPYC), and high-speed networking into one turnkey system. This topic breaks down how these components work together to accelerate deep learning training and inference.

---

#### 🏷️ The Nvidia GPU Architecture — The Silicon at the Heart of AI Infrastructure > 13 Multi-GPU Interconnects — Scaling Beyond One GPU > 13.4 HGX and DGX Platforms — The Reference AI Server Architectures

---

## 🔍 Context: Why a Complete System Matters

In AI workloads, the bottleneck is often not the GPU alone, but how data moves between GPUs, CPUs, and across the network. The DGX A100 eliminates guesswork by providing a pre-validated, balanced architecture. Engineers can focus on training models instead of troubleshooting hardware compatibility. This system is designed for **scalability** — you can start with one DGX and later connect multiple units to form a cluster.

---

## ⚙️ The Three Pillars of DGX A100

The DGX A100 is built around three core components that work in harmony:

### 1. 🖥️ HGX Baseboard (The GPU Hub)
- Contains **8x NVIDIA A100 Tensor Core GPUs** connected via **NVSwitch**.
- NVSwitch provides **600 GB/s** of bandwidth per GPU, enabling all-to-all communication.
- This is the heart of the system — it allows GPUs to share data without touching the CPU.

### 2. 🧠 2x AMD EPYC CPUs (The Host Processors)
- Two **AMD EPYC 7742** (64 cores each) or similar high-core-count processors.
- These handle data loading, preprocessing, and orchestration of GPU tasks.
- They connect to the HGX via **PCIe Gen4** lanes, ensuring fast data transfer to GPUs.

### 3. 🌐 Networking (The Cluster Glue)
- **8x NVIDIA ConnectX-6** 200 Gb/s HDR InfiniBand or **8x 100 Gb/s Ethernet** ports.
- Enables **GPU Direct RDMA** — GPUs can talk directly to each other across the network without CPU involvement.
- This is critical for multi-node training (e.g., using NVIDIA NCCL).

---

## 📊 How They Connect: A Simplified Data Flow

| Component | Role | Connection Type | Key Spec |
|-----------|------|----------------|----------|
| A100 GPUs (x8) | Compute | NVSwitch (internal) | 600 GB/s per GPU |
| AMD EPYC CPUs (x2) | Host processing | PCIe Gen4 | 128 lanes total |
| ConnectX-6 NICs (x8) | Networking | PCIe Gen4 | 200 Gb/s per port |
| NVSwitch | GPU interconnect | Proprietary | 2.4 TB/s total bisection |

**Data Flow Example:**
1. **CPU** loads a batch of images from storage.
2. Data moves over **PCIe** to GPU memory.
3. GPUs process in parallel, sharing intermediate results via **NVSwitch**.
4. Final gradients are sent across **InfiniBand** to other DGX nodes.

---

## 🛠️ Why This Matters for Engineers

- **No Bottlenecks:** The balanced design ensures GPUs are never starved of data.
- **Easy Scaling:** Adding more DGX units is plug-and-play — the networking is pre-configured.
- **Software Ready:** Comes with **NVIDIA Base Command** and **DGX OS** for management.
- **Power & Cooling:** 6.5 kW per unit, liquid-cooled GPUs for sustained performance.

---

## 🕵️ Real-World Analogy

Think of the DGX A100 as a **highway system**:
- **GPUs** are the cars (fast compute).
- **NVSwitch** is the interchange (no traffic jams between cars).
- **AMD EPYC** is the traffic control center (manages entry/exit).
- **Networking** is the highway connecting cities (multiple DGX units).

Without any one of these, traffic (data) would slow down.

---

## ✅ Key Takeaways for New Engineers

- The DGX A100 is a **complete, validated system** — not a collection of parts.
- **HGX** provides the GPU-to-GPU fabric; **AMD EPYC** handles host tasks; **networking** enables cluster scaling.
- For training large models (e.g., GPT-3, BERT), this architecture is the industry standard.
- When troubleshooting, start with the **NVSwitch** and **NCCL** settings — they are the most common performance levers.

---

> **Next Step:** Explore how to monitor these components using **NVIDIA DCGM** (Data Center GPU Manager) or **Prometheus + Grafana** for real-time telemetry.