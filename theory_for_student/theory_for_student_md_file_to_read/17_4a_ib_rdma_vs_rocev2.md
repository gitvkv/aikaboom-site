# 17.4a IB RDMA vs. RoCEv2: native vs. encapsulated RDMA

#### 🏷️ The AI Data Center Networking — Moving Petabytes Without Latency > 17 InfiniBand Architecture — The Gold Standard for AI Cluster Networking > 17.4 RDMA over InfiniBand — Maximum Performance Data Transfer

---

## 🌐 Context Introduction

In AI data centers, moving massive amounts of data between GPUs and servers with minimal delay is critical. **Remote Direct Memory Access (RDMA)** allows one computer to directly access the memory of another computer without involving the CPU, the operating system, or the network stack. This dramatically reduces latency and CPU overhead.

There are two primary ways to implement RDMA in modern AI clusters:

- **InfiniBand (IB) RDMA** — A native, purpose-built RDMA technology.
- **RDMA over Converged Ethernet version 2 (RoCEv2)** — An RDMA implementation that runs on top of standard Ethernet networks.

The key difference between them is that IB RDMA is **native** (designed from the ground up for RDMA), while RoCEv2 is **encapsulated** (RDMA packets are wrapped inside standard Ethernet frames).

---

## ⚙️ What Is Native RDMA (InfiniBand)?

InfiniBand is a high-speed, low-latency networking technology designed specifically for high-performance computing (HPC) and AI workloads.

- **Native design** — The entire hardware and protocol stack is built for RDMA. There is no translation or encapsulation.
- **Hardware offload** — The InfiniBand Host Channel Adapter (HCA) handles all RDMA operations directly, bypassing the CPU.
- **Lossless fabric** — InfiniBand uses credit-based flow control, meaning data is never dropped in the network. This is essential for RDMA performance.
- **Lowest latency** — Because there is no encapsulation overhead, InfiniBand achieves the lowest possible latency for RDMA operations.
- **Common in AI clusters** — Most large-scale NVIDIA DGX SuperPODs and AI supercomputers use InfiniBand as the primary interconnect.

---

## 🛠️ What Is Encapsulated RDMA (RoCEv2)?

RoCEv2 is a standard that allows RDMA to run over standard Ethernet networks. It encapsulates RDMA packets inside UDP/IP packets.

- **Encapsulation overhead** — RDMA data is wrapped in a UDP header, an IP header, and an Ethernet header. This adds extra bytes to every packet.
- **Runs on standard Ethernet** — RoCEv2 can use existing Ethernet switches and cables, which are often cheaper and more widely available than InfiniBand hardware.
- **Requires lossless Ethernet** — Standard Ethernet can drop packets under congestion. For RoCEv2 to work well, the network must be configured with **Priority Flow Control (PFC)** to prevent packet loss.
- **Higher latency than InfiniBand** — The encapsulation and the need for PFC introduce small but measurable latency increases.
- **Common in smaller clusters** — RoCEv2 is popular in environments where engineers want to use existing Ethernet infrastructure or where InfiniBand hardware is not available.

---

## 📊 Comparison Table: IB RDMA vs. RoCEv2

| Feature | InfiniBand RDMA (Native) | RoCEv2 (Encapsulated) |
| :--- | :--- | :--- |
| **Design** | Native RDMA from the ground up | RDMA encapsulated in UDP/IP over Ethernet |
| **Latency** | Lowest possible (sub-microsecond) | Slightly higher due to encapsulation |
| **Packet Loss** | None (credit-based flow control) | Must be managed with PFC (Priority Flow Control) |
| **Hardware** | Specialized InfiniBand HCAs and switches | Standard Ethernet NICs and switches (with RDMA support) |
| **Cost** | Higher (specialized hardware) | Lower (uses existing Ethernet gear) |
| **Maturity in AI** | Gold standard for large AI clusters | Growing adoption, especially in smaller setups |
| **CPU Offload** | Full hardware offload | Full hardware offload (on supported NICs) |
| **Ecosystem** | Tightly integrated with NVIDIA GPUs and CUDA | Broad ecosystem, but requires careful tuning |

---

## 🕵️ When to Use Each Technology

### ✅ Choose InfiniBand RDMA when:
- You are building a large-scale AI cluster (hundreds or thousands of GPUs).
- You need the absolute lowest latency for distributed training.
- You can invest in specialized InfiniBand switches and cables.
- You want a proven, turnkey solution for AI workloads.

### ✅ Choose RoCEv2 when:
- You are building a smaller AI cluster (tens of GPUs).
- You already have a high-quality Ethernet infrastructure.
- You need to reduce hardware costs.
- You are comfortable tuning Ethernet networks for lossless operation (PFC configuration).

---

## 🔍 Key Takeaway for New Engineers

- **InfiniBand is the gold standard** for AI networking because it is native, lossless, and delivers the lowest latency. It is the default choice for NVIDIA-certified AI infrastructure.
- **RoCEv2 is a viable alternative** that brings RDMA to Ethernet. It works well when configured correctly, but it requires careful network tuning to avoid packet loss and performance degradation.
- **The choice depends on scale, budget, and existing infrastructure.** For new engineers, understanding that InfiniBand is "native" and RoCEv2 is "encapsulated" is the first step to knowing why one might be preferred over the other.

---

## 🧠 Quick Memory Aid

| Concept | Analogy |
| :--- | :--- |
| **Native RDMA (InfiniBand)** | A dedicated express lane for data — no stops, no detours. |
| **Encapsulated RDMA (RoCEv2)** | A package shipped inside a standard box — it gets there, but with extra wrapping and handling. |

---

*This guide is part of the NVIDIA-Certified Associate: AI Infrastructure and Operations learning path.*