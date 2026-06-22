# 19.2c SAN (Storage Area Network): block-level access over Fibre Channel or iSCSI

#### 🏷️ The AI Data Center Networking — Moving Petabytes Without Latency > 19 Enterprise Storage Architectures for AI > 19.2 Storage Tiers and Connectivity Models

---

## 📘 Context Introduction

When you work with AI workloads, you quickly learn that storage is not just about saving files — it's about moving data *fast* and *reliably*. A **Storage Area Network (SAN)** is a dedicated, high-speed network that provides **block-level storage** to servers. Unlike a regular network drive (NAS) that shares files, a SAN makes storage appear as if it's a local hard drive directly attached to the server.

For AI infrastructure, SANs are critical because they allow multiple GPU servers to access the same high-performance storage simultaneously, with very low latency. The two most common ways to connect to a SAN are **Fibre Channel** and **iSCSI**.

---

## ⚙️ What is Block-Level Access?

- **Block-level access** means the server reads and writes raw data blocks (like sectors on a hard drive) rather than whole files.
- The server's operating system sees the SAN storage as a local disk — it can format it, partition it, and manage its own file system.
- This is different from **file-level access** (like NFS or SMB), where the storage appliance manages the file system and the server just asks for files.

---

## 🧱 How a SAN Works (Simple View)

1. **Servers** (called *initiators*) send read/write commands.
2. **Storage arrays** (called *targets*) receive those commands and perform the actual disk I/O.
3. A **dedicated network** (Fibre Channel or Ethernet with iSCSI) connects them.
4. Data is transferred in fixed-size blocks (typically 512 bytes to 4 KB).

---

## 🔌 Two Main Connectivity Options

### 1. Fibre Channel (FC)

- Uses **optical fiber cables** and specialized **Fibre Channel switches**.
- Extremely **low latency** and **high throughput** (up to 128 Gbps today).
- Requires dedicated hardware (Host Bus Adapters or HBAs in servers, FC switches in the network).
- Most common in **mission-critical enterprise AI** and **data centers** where performance is non-negotiable.

### 2. iSCSI (Internet Small Computer System Interface)

- Runs **over standard Ethernet** networks (using TCP/IP).
- No special cables needed — uses the same network as your regular data traffic (or a dedicated VLAN).
- Lower cost because it uses standard Network Interface Cards (NICs) and Ethernet switches.
- Performance is slightly lower than Fibre Channel due to TCP/IP overhead, but still excellent for many AI workloads.

---

## 📊 Comparison Table: Fibre Channel vs. iSCSI

| Feature | Fibre Channel | iSCSI |
|---------|---------------|-------|
| **Network type** | Dedicated Fibre Channel fabric | Standard Ethernet (TCP/IP) |
| **Typical speed** | 16–128 Gbps | 1–100 Gbps (Ethernet) |
| **Latency** | Very low (microseconds) | Low (milliseconds) |
| **Hardware needed** | HBAs + FC switches | Standard NICs + Ethernet switches |
| **Cost** | Higher (specialized hardware) | Lower (uses existing network) |
| **Distance limit** | Up to 10 km (with optics) | Unlimited (over IP networks) |
| **Best for** | High-performance AI training, databases | General AI inference, backup, cost-sensitive deployments |

---

## 🛠️ When to Use SAN in AI Infrastructure

- **Multi-GPU training clusters** — multiple servers need to read/write the same dataset simultaneously.
- **Checkpointing** — saving model state every few minutes without slowing down training.
- **High-throughput data pipelines** — feeding data to GPUs as fast as they can consume it.
- **Shared storage for inference** — multiple inference servers access the same model weights.

---

## 🕵️ Key Concepts for New Engineers

- **LUN (Logical Unit Number)** — a single "virtual disk" presented to a server over the SAN. Think of it as a drive letter or mount point.
- **Zoning (Fibre Channel)** — a security mechanism that controls which servers can see which storage targets.
- **IQN (iSCSI Qualified Name)** — a unique identifier for iSCSI initiators and targets (e.g., `iqn.2024-01.com.example:storage1`).
- **Multipathing** — using multiple physical paths between server and storage for redundancy and load balancing.

---

## 🔍 Simple Example: iSCSI Connection (Conceptual)

When an engineer connects a server to an iSCSI SAN, the typical steps are:

1. **Install iSCSI initiator software** on the server (built into most operating systems).
2. **Discover the target** — the server sends a discovery request to the storage array's IP address.
3. **Log in** — the server authenticates and establishes a session with the target.
4. **Mount the LUN** — the server sees a new disk, formats it (e.g., ext4 or XFS), and mounts it to a directory.

The result: the server now has a local-looking drive that is actually stored on the SAN array.

---

## ✅ Summary

- A **SAN** provides **block-level storage** over a dedicated network.
- **Fibre Channel** is the high-performance, low-latency option (but more expensive).
- **iSCSI** is the cost-effective, flexible option using standard Ethernet.
- For AI workloads, SANs enable **shared, fast storage** that multiple GPU servers can access simultaneously.
- Understanding SAN basics helps you troubleshoot performance issues and design scalable AI storage solutions.

---

*Next topic in this section: 19.2d NAS (Network Attached Storage) — file-level access over NFS or SMB.*