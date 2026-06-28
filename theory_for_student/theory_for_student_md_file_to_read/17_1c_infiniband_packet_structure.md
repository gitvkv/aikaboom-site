# 17.1c InfiniBand packet structure: Local Routing Header (LRH) and Global Routing Header (GRH)

#### 🏷️ The AI Data Center Networking — Moving Petabytes Without Latency > 17 InfiniBand Architecture — The Gold Standard for AI Cluster Networking > 17.1 InfiniBand Fundamentals — A Different Networking Philosophy

---

## 🌐 Context Introduction

When you send data across an AI cluster, that data travels inside **packets**. In InfiniBand, these packets are not just raw data — they carry special headers that tell the network exactly where to go and how to get there. Think of these headers like the address and routing instructions on a package you ship through a courier service.

For new engineers, understanding the **Local Routing Header (LRH)** and **Global Routing Header (GRH)** is essential because they determine how data moves within a single subnet (local) or across multiple subnets (global). This is the foundation of InfiniBand's ability to deliver **ultra-low latency** and **high throughput** in AI workloads.

---

## ⚙️ InfiniBand Packet Structure Overview

Every InfiniBand packet has a layered structure. The two most important routing layers are:

- **LRH (Local Routing Header)** — Always present. Handles routing within the same subnet.
- **GRH (Global Routing Header)** — Optional. Used when the packet must travel across different subnets.

The packet structure looks like this (simplified):

**Start of Packet** → **LRH** → **[GRH]** → **Transport Headers** → **Payload** → **CRC** → **End of Packet**

> The GRH is only added when the destination is in a different subnet. For local communication, the GRH is omitted to save bandwidth and reduce latency.

---

## 🕵️ Local Routing Header (LRH) — The "Local Address"

The LRH is the **mandatory** header in every InfiniBand packet. It contains the information needed to route the packet within a single subnet (a group of switches and endpoints managed together).

### Key Fields in the LRH:

| Field | Size | Purpose |
|-------|------|---------|
| **VL (Virtual Lane)** | 4 bits | Identifies which virtual lane the packet uses for traffic management |
| **LVer (Link Version)** | 4 bits | Version of the link protocol (always 0 for current standards) |
| **SL (Service Level)** | 4 bits | Defines the quality of service (QoS) priority for the packet |
| **LNH (L_Key/N_Key Header)** | 2 bits | Indicates whether a GRH follows the LRH |
| **DLID (Destination Local ID)** | 16 bits | The local address of the destination port |
| **SLID (Source Local ID)** | 16 bits | The local address of the source port |
| **Packet Length** | 11 bits | Total size of the packet in bytes |

### 🛠️ How Engineers Use LRH:

- **DLID and SLID** are like MAC addresses in Ethernet — they identify the source and destination within the local network.
- **VL** helps prioritize different types of traffic (e.g., AI training data vs. management traffic).
- **SL** allows engineers to set different priority levels for different data flows.

> **Key takeaway:** Every InfiniBand packet has an LRH. Without it, the packet cannot be routed even one hop.

---

### 📊 Visual Representation: InfiniBand Packet Framing Layout
This diagram details the headers of an InfiniBand packet, showing Local Routing (LRH), Base Transport (BTH), Payload, and Integrity checks.

```mermaid
flowchart LR
    LRH["Local Routing Header (LID Addresses)"] --> BTH["Base Transport Header (QP Index)"]
    BTH --> Payload["RDMA Message (Data)"]
    Payload --> ICR["ICRC + VCRC (Integrity Checks)"]

    classDef cpu fill:#eafaf1,stroke:#76b900,stroke-width:2px,rx:6px,ry:6px;
    classDef memory fill:#f0f7ff,stroke:#3498db,stroke-width:1.5px,rx:4px,ry:4px;
    classDef system fill:#f1f5f9,stroke:#64748b,stroke-width:1.5px;

    class LRH cpu;
    class BTH,Payload memory;
    class ICR system;
```

## 🌍 Global Routing Header (GRH) — The "Inter-Subnet Passport"

The GRH is **optional** and only appears when a packet needs to travel from one InfiniBand subnet to another. It is based on **IPv6-style addressing** (128-bit addresses) and provides global routing information.

### Key Fields in the GRH:

| Field | Size | Purpose |
|-------|------|---------|
| **IP Version** | 4 bits | Always set to 6 (indicating IPv6-style format) |
| **Traffic Class** | 8 bits | Used for QoS and traffic differentiation |
| **Flow Label** | 20 bits | Identifies a specific flow for load balancing |
| **Payload Length** | 16 bits | Length of the remaining packet after the GRH |
| **Next Header** | 8 bits | Indicates the type of header following the GRH |
| **Hop Limit** | 8 bits | Decremented at each router; packet dropped when it reaches 0 |
| **SGID (Source GID)** | 128 bits | Global unique identifier of the source port |
| **DGID (Destination GID)** | 128 bits | Global unique identifier of the destination port |

### 🛠️ How Engineers Use GRH:

- **SGID and DGID** are globally unique addresses, similar to public IP addresses on the internet.
- **Hop Limit** prevents packets from looping forever in complex multi-subnet topologies.
- **Flow Label** helps load-balance traffic across multiple paths in a large cluster.

> **Key takeaway:** The GRH is only added when crossing subnet boundaries. Inside a single subnet, it is omitted to reduce overhead.

---

## 📊 Comparison Table: LRH vs. GRH

| Feature | LRH | GRH |
|---------|-----|-----|
| **Presence** | Always present | Optional (only for inter-subnet) |
| **Address Size** | 16-bit Local IDs (LID) | 128-bit Global IDs (GID) |
| **Scope** | Within a single subnet | Across multiple subnets |
| **Overhead** | 8 bytes | 40 bytes |
| **Routing Type** | Switch-based (LID lookup) | Router-based (GID lookup) |
| **QoS Support** | Via SL and VL fields | Via Traffic Class field |

---

## 🧠 Simple Analogy for New Engineers

Think of an AI cluster like a large office building:

- **LRH** is like the **room number** inside the building. It tells the mail carrier exactly which office to deliver to.
- **GRH** is like the **full street address** including city, state, and zip code. You only need this if the package is coming from a different building (subnet).

If you are sending a memo to someone in the same office, you just write the room number (LRH). If you are mailing a package from another city, you write the full address (LRH + GRH).

---

## ✅ Summary for Engineers

- **Every InfiniBand packet** has an LRH — it is mandatory and handles local routing.
- **GRH is optional** — it is added only when the destination is in a different subnet.
- **LRH uses 16-bit LIDs** for addressing; **GRH uses 128-bit GIDs** for global addressing.
- **Removing the GRH** for local traffic reduces packet overhead, which directly improves latency and throughput — critical for AI workloads.
- As an engineer, you will configure **LID assignments** for local routing and **GID tables** for inter-subnet communication when designing large-scale AI clusters.

> 💡 **Pro tip:** When troubleshooting connectivity issues in an InfiniBand cluster, always check the LRH first (local routing) before investigating GRH issues (global routing). Most problems are local.