# 16.3d DCQCN (Data Center Quantized Congestion Notification): the RDMA congestion algorithm

#### 🏷️ The AI Data Center Networking — Moving Petabytes Without Latency > 16 High-Speed Ethernet for AI — Spectrum-X, RoCEv2, and Lossless Fabrics > 16.3 Lossless Ethernet Configuration for RoCEv2

---

## 🧭 Context Introduction

In an AI data center, thousands of GPUs communicate simultaneously during training jobs. When using RDMA over Converged Ethernet (RoCEv2), the network must handle congestion without dropping packets — because a single dropped packet can stall an entire training iteration. **DCQCN (Data Center Quantized Congestion Notification)** is the algorithm that makes this possible. It is a congestion control mechanism designed specifically for lossless Ethernet fabrics running RoCEv2 traffic.

Think of DCQCN as a smart traffic controller that detects when a network switch is getting overwhelmed and tells the sending GPUs to slow down — before any packets are lost.

---

## ⚙️ How DCQCN Works — The Three-Step Process

DCQCN operates in three distinct phases:

- **🔍 Congestion Detection (at the Switch)** — When a switch port's buffer usage exceeds a configured threshold, the switch marks the passing packets with a Congestion Notification Message (CNM). This is done by setting the Explicit Congestion Notification (ECN) bits in the IP header.

- **📨 Notification Delivery (Switch to Receiver)** — The marked packet travels to the destination GPU (the receiver). The receiver generates a special Congestion Notification Packet (CNP) and sends it back to the original sender.

- **⏬ Rate Reduction (at the Sender)** — When the sender receives the CNP, it reduces its transmission rate. The sender then gradually increases its rate again (like a slow recovery) until another CNP arrives.

---

## 📊 Key Parameters in DCQCN

DCQCN relies on several tunable parameters. Here are the most important ones for engineers to understand:

| Parameter | Full Name | What It Controls |
|-----------|-----------|------------------|
| **Kmin** | Minimum Threshold | When buffer occupancy is below this value, no ECN marking occurs |
| **Kmax** | Maximum Threshold | When buffer occupancy is above this value, all packets are marked |
| **Pmax** | Maximum Marking Probability | The probability of marking when buffer is between Kmin and Kmax |
| **Alpha** | Rate Increase Factor | How aggressively the sender increases its rate after slowing down |
| **G** | Rate Decrease Factor | How much the sender reduces its rate when a CNP arrives |
| **Time Reset** | Timer for Rate Recovery | How long the sender waits before trying to increase rate again |

---

## 🛠️ Practical Configuration Example

When configuring DCQCN on a NVIDIA Spectrum switch, engineers typically set the following values. These are not commands but conceptual settings you would apply:

- **Set ECN marking threshold (Kmin)** to **150 KB** of buffer usage
- **Set ECN marking threshold (Kmax)** to **300 KB** of buffer usage
- **Set maximum marking probability (Pmax)** to **100%** (aggressive marking)
- **Configure rate decrease factor (G)** to **1/2** (cut rate in half on each CNP)
- **Set rate increase timer** to **55 microseconds** (how fast to recover)

> 💡 **Tip:** In practice, the exact values depend on your workload. For AI training with large messages, you want faster reaction (lower Kmin) and slower recovery (longer timers).

---

## 🕵️ Why DCQCN Matters for AI Workloads

AI training has unique traffic patterns that make DCQCN essential:

- **🐘 Elephant Flows** — AI training generates massive data transfers (hundreds of MB to GB). These "elephant flows" can easily congest switch buffers.
- **⏱️ All-to-All Communication** — During collective operations (like AllReduce), every GPU sends data to every other GPU simultaneously, creating incast congestion.
- **🚫 Zero Tolerance for Packet Loss** — RDMA requires lossless delivery. A single dropped packet causes the entire training job to stall while waiting for retransmission.

DCQCN prevents packet loss by proactively slowing down senders before buffers overflow.

---

## 🔄 DCQCN vs. Other Congestion Algorithms

| Feature | DCQCN | Traditional TCP (CUBIC) | DCB (Priority Flow Control) |
|---------|-------|------------------------|-----------------------------|
| **Reaction Speed** | Microseconds | Milliseconds | Instant (backpressure) |
| **Packet Loss Tolerance** | Zero (lossless) | Tolerates drops | Zero (lossless) |
| **Scalability** | Excellent for AI clusters | Poor for RDMA | Good but can cause deadlocks |
| **Control Type** | End-to-end (sender reacts) | End-to-end | Hop-by-hop (switch to switch) |
| **Best For** | RoCEv2 in AI fabrics | General internet traffic | Legacy lossless Ethernet |

---

## ✅ Summary for New Engineers

- **DCQCN** is the congestion control algorithm that makes RoCEv2 work reliably in AI data centers.
- It uses **ECN marking** at switches to notify senders when congestion is building.
- The algorithm **reduces sender rates** when congestion is detected and **gradually increases** rates when the network is clear.
- Key parameters like **Kmin, Kmax, and G** are tunable to match your specific AI workload.
- Without DCQCN, AI training jobs would suffer from packet loss, causing severe performance degradation.

> 🧠 **Remember:** In AI infrastructure, the network is just as important as the GPUs. DCQCN is the brain that keeps the network running smoothly under extreme pressure.