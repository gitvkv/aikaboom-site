# 13.3c NVSwitch chip count per platform and total aggregate bandwidth

#### 🏷️ The Nvidia GPU Architecture — The Silicon at the Heart of AI Infrastructure > 13 Multi-GPU Interconnects — Scaling Beyond One GPU > 13.3 NVSwitch — All-to-All GPU Interconnect Fabric

---

## 🔍 Context Introduction

When engineers build large-scale AI clusters, connecting multiple GPUs efficiently becomes critical. The **NVSwitch** is Nvidia's dedicated high-speed interconnect chip that enables all-to-all communication between GPUs inside a single server node. Think of it as a super-fast traffic router for data moving between GPUs — without it, scaling AI training across many GPUs would be bottlenecked by slower connections.

This section explains how many NVSwitch chips exist in different Nvidia GPU platforms and what total bandwidth those chips provide collectively.

---

## ⚙️ What Is an NVSwitch Chip?

- Each **NVSwitch chip** is a physical silicon component that provides a set of high-speed ports for connecting GPUs.
- It acts like a **crossbar switch** — any GPU can talk directly to any other GPU through the NVSwitch fabric.
- NVSwitch chips are mounted on the server motherboard or on a separate NVSwitch board, depending on the platform.
- The number of NVSwitch chips per platform determines how many GPU-to-GPU connections are available and the total aggregate bandwidth.

---

## 📊 NVSwitch Chip Count per Platform

Different Nvidia GPU platforms use different numbers of NVSwitch chips. Here is a simple breakdown:

| Platform | Number of NVSwitch Chips | Number of Supported GPUs | Notes |
|----------|--------------------------|--------------------------|-------|
| **DGX A100** | 6 NVSwitch chips | 8 A100 GPUs | Each chip provides 12 NVLink ports (6 per direction) |
| **DGX H100** | 6 NVSwitch chips | 8 H100 GPUs | Similar layout to A100, but with higher bandwidth per port |
| **DGX B200** | 4 NVSwitch chips | 8 B200 GPUs | Newer design with fewer chips but higher per-chip bandwidth |
| **HGX A100 (4-GPU)** | 2 NVSwitch chips | 4 A100 GPUs | Smaller configuration for entry-level multi-GPU systems |
| **HGX H100 (4-GPU)** | 2 NVSwitch chips | 4 H100 GPUs | Compact version for smaller AI workloads |

**Key observation:** The number of NVSwitch chips does not always scale linearly with GPU count. Newer platforms like DGX B200 achieve the same all-to-all connectivity with fewer chips by using higher-bandwidth ports.

---

## 🛠️ Total Aggregate Bandwidth Explained

**Aggregate bandwidth** means the total amount of data that can be transferred per second across all NVSwitch chips in the system. This is measured in **gigabytes per second (GB/s)** or **terabytes per second (TB/s)**.

### How It Works

- Each NVSwitch chip has a certain number of **NVLink ports**.
- Each NVLink port operates at a specific speed (e.g., 50 GB/s per direction for H100).
- The total aggregate bandwidth is calculated as:
  - **Number of NVSwitch chips × Number of ports per chip × Bandwidth per port**

### Bandwidth Comparison Table

| Platform | NVSwitch Chip Count | Ports per Chip | Bandwidth per Port (one direction) | Total Aggregate Bandwidth |
|----------|---------------------|----------------|-------------------------------------|---------------------------|
| **DGX A100** | 6 chips | 12 ports | 50 GB/s | 3.6 TB/s |
| **DGX H100** | 6 chips | 12 ports | 50 GB/s | 3.6 TB/s |
| **DGX B200** | 4 chips | 16 ports | 100 GB/s | 6.4 TB/s |
| **HGX A100 (4-GPU)** | 2 chips | 12 ports | 50 GB/s | 1.2 TB/s |
| **HGX H100 (4-GPU)** | 2 chips | 12 ports | 50 GB/s | 1.2 TB/s |

**Important note:** The bandwidth numbers above represent **bidirectional** aggregate bandwidth (data flowing in both directions simultaneously). For unidirectional calculations, divide by 2.

---

## 🕵️ Why Chip Count and Bandwidth Matter for Engineers

- **Training large AI models** requires moving massive amounts of data between GPUs. Higher aggregate bandwidth means faster training times.
- **Fewer NVSwitch chips** can reduce system cost and power consumption, but only if per-chip bandwidth is high enough.
- **Platform selection** depends on your workload: DGX B200 offers the highest bandwidth with fewer chips, while DGX A100/H100 provide proven reliability with more chips.
- **Bottleneck identification**: If your AI training is slow, check whether the NVSwitch bandwidth is saturated. Tools like **nvidia-smi** can show NVLink traffic.
- **Future-proofing**: Newer platforms like B200 use faster ports (100 GB/s vs 50 GB/s), meaning you get more bandwidth with less hardware.

---

## 📝 Summary for New Engineers

- **NVSwitch chip count** varies by platform: 2 chips for 4-GPU systems, 4–6 chips for 8-GPU systems.
- **Total aggregate bandwidth** is the sum of all NVSwitch chip bandwidths — higher is better for AI workloads.
- **DGX B200** achieves the highest bandwidth (6.4 TB/s) with only 4 NVSwitch chips, thanks to faster ports.
- **DGX A100 and H100** use 6 chips to deliver 3.6 TB/s — still very fast, but less efficient per chip.
- Always consider the **bandwidth per GPU** when designing AI clusters: divide total aggregate bandwidth by the number of GPUs to see how much bandwidth each GPU gets.

---

## 🔗 Related Topics to Explore Next

- **NVLink vs NVSwitch** — Understand the difference between the GPU-to-GPU cable (NVLink) and the switch fabric (NVSwitch).
- **NVSwitch topologies** — How chips are physically wired to GPUs (e.g., fully connected vs. partially connected).
- **Bandwidth vs. latency** — Why both matter for distributed AI training.
- **NVSwitch in multi-node clusters** — How NVSwitch connects GPUs inside a node, and how InfiniBand connects nodes externally.