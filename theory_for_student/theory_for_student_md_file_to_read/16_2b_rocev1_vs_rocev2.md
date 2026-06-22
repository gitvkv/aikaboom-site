# 16.2b RoCEv1 vs. RoCEv2: routable UDP vs. Layer 2 only

#### 🏷️ The AI Data Center Networking — Moving Petabytes Without Latency > 16 High-Speed Ethernet for AI — Spectrum-X, RoCEv2, and Lossless Fabrics > 16.2 RDMA over Converged Ethernet v2 (RoCEv2)

## 🌐 Context Introduction

In AI data centers, moving massive amounts of data between GPUs and storage nodes with minimal delay is critical. **RDMA (Remote Direct Memory Access)** allows one computer to directly access the memory of another computer without involving the CPU, dramatically reducing latency. **RoCE (RDMA over Converged Ethernet)** brings this capability to standard Ethernet networks. However, there are two versions: **RoCEv1** and **RoCEv2**. Understanding the difference is essential for engineers deploying AI infrastructure, as it impacts network scalability, routing, and performance.

---

## ⚙️ What is RoCEv1?

RoCEv1 is the original implementation of RDMA over Ethernet. It operates at **Layer 2 (Data Link Layer)** of the OSI model, meaning it relies on **MAC addresses** and **Ethernet frames** for communication.

- **Layer:** Layer 2 only (Ethernet)
- **Encapsulation:** RDMA data is placed directly into Ethernet frames
- **Routing:** **Not routable** — it cannot cross subnets or VLANs without special bridging
- **Use Case:** Small, flat networks where all devices are on the same broadcast domain (e.g., a single rack or cluster)
- **Key Limitation:** Cannot be used across different IP subnets, limiting scalability in large AI clusters

---

## 🚀 What is RoCEv2?

RoCEv2 is the enhanced version that addresses the scalability limitations of RoCEv1. It operates at **Layer 3 (Network Layer)** by encapsulating RDMA data inside **UDP (User Datagram Protocol)** packets.

- **Layer:** Layer 3 (Network) — uses IP and UDP headers
- **Encapsulation:** RDMA data → UDP header → IP header → Ethernet frame
- **Routing:** **Routable** — can traverse multiple subnets and VLANs using standard IP routers
- **Use Case:** Large-scale AI data centers, multi-rack clusters, and geographically distributed infrastructure
- **Key Advantage:** Enables RDMA communication across entire data center networks without requiring flat Layer 2 domains

---

## 📊 Comparison Table: RoCEv1 vs. RoCEv2

| Feature | RoCEv1 | RoCEv2 |
|---------|--------|--------|
| **OSI Layer** | Layer 2 (Ethernet) | Layer 3 (IP/UDP) |
| **Encapsulation** | Direct Ethernet frame | UDP over IP over Ethernet |
| **Routable** | ❌ No (Layer 2 only) | ✅ Yes (IP routing) |
| **Network Scalability** | Limited to single broadcast domain | Scales across subnets and VLANs |
| **Congestion Handling** | Relies on lossless Ethernet (PFC) | Uses ECN (Explicit Congestion Notification) + PFC |
| **Header Overhead** | Lower (no IP/UDP headers) | Slightly higher (IP + UDP headers) |
| **Latency** | Slightly lower (no routing delays) | Slightly higher (routing adds minimal latency) |
| **Deployment Complexity** | Simple (flat network) | Moderate (requires IP routing config) |
| **AI Cluster Suitability** | Small clusters (1-2 racks) | Large clusters (10+ racks, multi-zone) |

---

## 🕵️ Key Differences Explained Simply

### 1. **Routability (The Biggest Difference)**
- **RoCEv1** is like a local phone call — it only works within the same building (same subnet).
- **RoCEv2** is like a long-distance call — it can connect across different buildings (different subnets) using IP routing.

### 2. **Encapsulation Overhead**
- **RoCEv1** has lower overhead because it skips IP and UDP headers.
- **RoCEv2** adds a UDP header (8 bytes) and an IP header (20 bytes for IPv4), but this small overhead is negligible compared to the scalability benefits.

### 3. **Congestion Management**
- **RoCEv1** relies entirely on **Priority Flow Control (PFC)** to prevent packet loss — this can cause head-of-line blocking.
- **RoCEv2** can use **ECN (Explicit Congestion Notification)** in addition to PFC, allowing smarter congestion handling at the network layer.

### 4. **Port Number Usage**
- **RoCEv2** uses a specific UDP destination port (default **4791**) to identify RDMA traffic. This allows routers and switches to apply QoS policies specifically to RoCE traffic.

---

## 🛠️ When to Use Which?

### ✅ Use **RoCEv1** when:
- You have a **small, flat network** (single rack or single VLAN)
- All devices are within the same Layer 2 broadcast domain
- You want the absolute lowest latency without any routing overhead
- You are building a proof-of-concept or lab environment

### ✅ Use **RoCEv2** when:
- You are building a **large-scale AI cluster** (multiple racks, multiple subnets)
- You need to connect GPUs across different network zones or data halls
- You want to leverage **standard IP routing** for network segmentation and security
- You need **ECN-based congestion control** for better performance under heavy load
- You are deploying NVIDIA Spectrum-X or similar high-performance Ethernet fabrics

---

## 📈 Real-World Impact for AI Infrastructure

In modern AI data centers, **RoCEv2 is the standard choice** because:

- **Scalability:** AI clusters often span hundreds of nodes across multiple racks and subnets. RoCEv2 allows RDMA traffic to flow seamlessly across these boundaries.
- **Interoperability:** RoCEv2 works with standard IP routers and switches, making it easier to integrate with existing data center networks.
- **Performance:** The slight overhead of UDP/IP headers is far outweighed by the ability to use advanced routing and congestion control mechanisms.
- **Future-Proofing:** As AI workloads grow, the ability to route RDMA traffic across larger networks becomes essential.

---

## 🔑 Summary

| Aspect | RoCEv1 | RoCEv2 |
|--------|--------|--------|
| **Layer** | Layer 2 (Ethernet) | Layer 3 (IP/UDP) |
| **Routable** | No | Yes |
| **Best for** | Small, flat networks | Large, routed networks |
| **AI Data Center** | Rarely used | Industry standard |

**Bottom line:** For any AI infrastructure deployment beyond a single rack, **use RoCEv2**. It provides the routing flexibility and congestion management needed to move petabytes of data with minimal latency across large-scale Ethernet fabrics.