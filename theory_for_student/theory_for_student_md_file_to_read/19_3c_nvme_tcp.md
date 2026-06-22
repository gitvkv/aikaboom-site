# 19.3c NVMe/TCP: NVMe over standard TCP/IP — simpler deployment, higher latency

#### 🏷️ The AI Data Center Networking — Moving Petabytes Without Latency > 19 Enterprise Storage Architectures for AI > 19.3 NVMe over Fabrics (NVMe-oF) — Networked Storage Without Compromise

---

## 🌐 Context Introduction

In modern AI data centers, storage must keep pace with fast GPUs and high-speed interconnects. NVMe over Fabrics (NVMe-oF) allows engineers to connect NVMe storage devices over a network, rather than keeping them directly attached to a server. Among the NVMe-oF transport options, **NVMe/TCP** stands out because it uses standard TCP/IP networking — the same protocol that powers the internet. This makes it much simpler to deploy, but it comes with a trade-off: higher latency compared to other NVMe-oF transports like RDMA or Fibre Channel.

For new engineers, think of NVMe/TCP as the "plug-and-play" option for networked NVMe storage. It works over your existing Ethernet infrastructure without requiring special hardware or complex configuration.

---

## ⚙️ What is NVMe/TCP?

NVMe/TCP is a transport protocol that encapsulates NVMe commands and data inside standard TCP packets. It allows a server (called the **initiator**) to access NVMe storage devices on a remote system (called the **target**) over a regular TCP/IP network.

Key characteristics:
- **Uses standard TCP/IP** — no need for RDMA-capable NICs or special switches
- **Works over any Ethernet network** — from 1GbE to 100GbE and beyond
- **Initiator and target communicate** like a client-server model
- **NVMe commands are tunneled** through TCP connections

---

## 🛠️ How NVMe/TCP Works (Simplified)

1. **Target Setup** — A storage server exposes its NVMe namespaces (logical storage units) over TCP.
2. **Initiator Connection** — A compute server establishes a TCP connection to the target's IP address and port.
3. **Command Exchange** — NVMe submission and completion queues are mapped over the TCP stream.
4. **Data Transfer** — Read/write operations flow as TCP payloads.

The entire process feels like accessing a local NVMe drive, but the data travels over the network.

---

## 📊 NVMe/TCP vs. Other NVMe-oF Transports

| Feature | NVMe/TCP | NVMe/RDMA (RoCE/InfiniBand) | NVMe/FC (Fibre Channel) |
|---|---|---|---|
| **Network Type** | Standard Ethernet | RDMA-capable Ethernet or InfiniBand | Fibre Channel SAN |
| **Hardware Required** | Standard NICs | RDMA-capable NICs (e.g., ConnectX) | FC HBAs and switches |
| **Deployment Complexity** | Low — no special config | Medium — requires RDMA setup | High — dedicated SAN |
| **Latency** | Higher (TCP overhead) | Very low (kernel bypass) | Low |
| **CPU Overhead** | Higher (TCP stack processing) | Low (offloaded to NIC) | Low |
| **Best For** | Simplicity, existing networks | Performance-critical AI workloads | Legacy enterprise storage |

---

## ✅ Advantages of NVMe/TCP

- **Simple Deployment** — No new hardware or specialized networking knowledge required
- **Works on Existing Infrastructure** — Uses the same switches, cables, and NICs already in your data center
- **Easy Troubleshooting** — Standard TCP tools (ping, traceroute, netstat) work for diagnostics
- **No Vendor Lock-in** — Works with any standard Ethernet gear
- **Scalable** — Can leverage existing network management and monitoring tools

---

## ❌ Disadvantages of NVMe/TCP

- **Higher Latency** — TCP adds protocol overhead (acknowledgments, retransmissions, congestion control)
- **Higher CPU Usage** — The TCP stack consumes CPU cycles on both initiator and target
- **Not Ideal for Ultra-Low Latency** — AI training workloads that require microsecond-level response times may suffer
- **Bandwidth Overhead** — TCP headers and flow control reduce effective throughput compared to RDMA

---

## 🕵️ When to Use NVMe/TCP

NVMe/TCP is a great choice when:

- You are building a **new AI storage environment** and want to start simple
- Your existing network is **standard Ethernet** and you want to avoid new hardware investments
- Your AI workloads are **throughput-sensitive** but not latency-critical (e.g., large batch inference, data staging)
- You need **rapid prototyping** or a proof-of-concept for NVMe-oF

Avoid NVMe/TCP when:

- Your AI training requires **microsecond-level latency** (use RDMA instead)
- You have **strict CPU budget** on your compute nodes
- You are building a **high-frequency trading** or real-time inference system

---

## 🧰 Practical Deployment Example (Conceptual)

Here is how a simple NVMe/TCP connection is established, using command-line tools on Linux:

**On the target (storage server):**

First, load the NVMe target kernel module. Then, create a target subsystem with a unique NQN (NVMe Qualified Name). Add a namespace pointing to your local NVMe device. Finally, enable the TCP port listener (default is 4420).

**On the initiator (compute server):**

Load the NVMe initiator module. Discover available targets by connecting to the target's IP address. Log in to the desired target subsystem. A new NVMe block device appears (e.g., /dev/nvme0n1), which you can format and mount like any local drive.

📤 Output: After login, the initiator sees a new NVMe block device ready for use.

---

## 🔍 Key Takeaways for New Engineers

- **NVMe/TCP is the easiest way** to get started with networked NVMe storage
- **Latency is higher** than RDMA or FC, but often acceptable for many AI workloads
- **No special hardware** — your existing Ethernet network is sufficient
- **Think of it as "NVMe over Ethernet"** — simple, reliable, and widely supported
- **Start here** if you are new to NVMe-oF, then graduate to RDMA if latency becomes a bottleneck

---

## 📚 Summary

NVMe/TCP brings the speed of NVMe storage to standard TCP/IP networks. It sacrifices some performance for simplicity, making it an ideal entry point for engineers deploying AI storage infrastructure. While not the fastest NVMe-oF transport, its ease of use and compatibility with existing networks make it a valuable tool in any AI data center architect's toolkit.