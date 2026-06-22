# 16.3a Why Ethernet drops packets and why RDMA cannot tolerate packet loss

#### 🏷️ The AI Data Center Networking — Moving Petabytes Without Latency > 16 High-Speed Ethernet for AI — Spectrum-X, RoCEv2, and Lossless Fabrics > 16.3 Lossless Ethernet Configuration for RoCEv2

---

## 🌐 Context Introduction

In AI data centers, networks move massive amounts of data between GPUs, storage, and compute nodes. Traditional Ethernet was designed for general-purpose traffic (web browsing, email, file transfers) where a dropped packet is simply retransmitted. However, AI workloads using Remote Direct Memory Access (RDMA) over Converged Ethernet (RoCEv2) have zero tolerance for packet loss. Understanding *why* Ethernet drops packets and *why* RDMA cannot handle those drops is critical for engineers building high-performance AI infrastructure.

---

## ⚙️ Why Ethernet Drops Packets

Ethernet networks drop packets primarily due to **congestion** and **buffer exhaustion**. Here's how it happens:

- **Switch buffer overflow**: When multiple data flows arrive at a switch port faster than it can forward them, packets queue in the switch's memory buffer. If the buffer fills completely, the switch drops incoming packets.
- **Tail-drop behavior**: Standard Ethernet switches use a "first-in, first-out" queue. When the queue is full, any new packet is simply discarded (dropped at the tail).
- **Micro-bursts**: AI training generates sudden, short bursts of traffic (micro-bursts) that overwhelm switch buffers before congestion control algorithms can react.
- **Link errors**: Physical layer issues (bad cables, faulty transceivers, electromagnetic interference) can corrupt packets, causing them to be dropped at the receiver.
- **Flow control mismatches**: Without proper flow control, a fast sender can overwhelm a slow receiver, causing the receiver's input buffer to overflow.

### 📊 Key Reasons for Packet Drops in Ethernet

| Cause | Description | Frequency in AI Networks |
|-------|-------------|--------------------------|
| Buffer overflow | Switch memory exhausted during congestion | Very common |
| Micro-bursts | Sudden traffic spikes from synchronized GPU communication | Extremely common |
| Link errors | Physical layer corruption | Rare with proper cabling |
| Tail-drop | Default drop behavior when queues are full | Default behavior |
| Receiver overflow | Receiver cannot process packets fast enough | Common without flow control |

---

## 🕵️ Why RDMA Cannot Tolerate Packet Loss

RDMA (Remote Direct Memory Access) allows one computer to directly read/write memory of another computer without involving the remote CPU. This zero-copy, kernel-bypass mechanism is essential for AI training speed. However, it has a critical weakness: **it cannot recover from packet loss gracefully**.

### 🧠 The Core Problem: RDMA's Design Assumptions

- **Hardware-based retransmission is slow**: RDMA relies on the network adapter (NIC) to handle retransmissions, not the CPU. When a packet is lost, the NIC must detect the loss, request retransmission, and reorder packets — all in hardware. This process is **10-100x slower** than the normal data transfer rate.
- **Loss causes head-of-line blocking**: RDMA traffic is ordered. A single lost packet blocks all subsequent packets in that flow until the lost packet is retransmitted and acknowledged. This stalls the entire GPU-to-GPU communication pipeline.
- **AI training is synchronous**: In distributed training (e.g., all-reduce operations), all GPUs must complete their communication step before the next computation step begins. A single packet loss delays one GPU, causing **all GPUs to wait**. This idle time directly increases training time.
- **Throughput collapse**: Studies show that even **0.1% packet loss** can reduce RDMA throughput by **50-90%** because the retransmission mechanism cannot keep up with the data rate.

### 🔄 Comparison: TCP vs. RDMA Behavior on Packet Loss

| Aspect | TCP (Traditional Ethernet) | RDMA (RoCEv2) |
|--------|---------------------------|---------------|
| Loss recovery | CPU-based, slow but robust | NIC-based, fast but fragile |
| Impact of 0.1% loss | ~1-5% throughput reduction | ~50-90% throughput reduction |
| Head-of-line blocking | Minimal (out-of-order delivery) | Severe (ordered delivery required) |
| CPU involvement | High (kernel processing) | Zero (kernel bypass) |
| Tolerance to loss | High (designed for lossy networks) | Extremely low (requires lossless fabric) |

---

## 🛠️ Why Standard Ethernet Fails for RDMA

Standard Ethernet was designed with **"best effort"** delivery — it tries its best but accepts that packets may be lost. This works for TCP because:

- TCP uses **sliding window** and **slow start** to recover from loss.
- TCP retransmissions happen in software (CPU), which can handle occasional drops.
- TCP traffic is typically **asynchronous** — a delay in one flow doesn't block others.

RDMA, however, requires **lossless delivery** because:

- RDMA operations are **synchronous** — a single loss stalls the entire operation.
- RDMA NICs have **limited retry buffers** — they cannot queue many retransmissions.
- AI training uses **all-to-all communication patterns** — every GPU talks to every other GPU simultaneously, creating massive congestion.

---

## 🔧 The Solution: Lossless Ethernet for RoCEv2

To make Ethernet work for RDMA, engineers must configure **lossless Ethernet** using:

- **Priority Flow Control (PFC)**: Pause specific traffic classes (e.g., RDMA traffic) when buffers are near full, preventing drops.
- **Explicit Congestion Notification (ECN)**: Mark packets instead of dropping them, signaling senders to slow down.
- **Data Center Quantized Congestion Notification (DCQCN)**: An end-to-end congestion control algorithm that uses ECN marks to adjust sending rates.
- **Deep buffers**: Switches with large memory buffers to absorb micro-bursts without dropping packets.

### 📋 Key Takeaway for Engineers

> **Standard Ethernet drops packets because it was designed for loss-tolerant TCP traffic. RDMA cannot tolerate packet loss because even a single drop causes massive performance collapse in synchronous AI training. Therefore, AI data centers must deploy lossless Ethernet configurations (PFC, ECN, DCQCN) to enable RoCEv2.**

---

## ✅ Summary Checklist for New Engineers

- ✅ Understand that Ethernet drops packets due to buffer overflow, micro-bursts, and tail-drop behavior.
- ✅ Recognize that RDMA is designed for zero-copy, low-latency data transfer with no tolerance for loss.
- ✅ Know that even 0.1% packet loss can cripple RDMA throughput by 50-90%.
- ✅ Learn that lossless Ethernet (PFC, ECN, DCQCN) is mandatory for RoCEv2 in AI data centers.
- ✅ Remember: **Lossless fabric = RDMA works. Lossy fabric = AI training stalls.**