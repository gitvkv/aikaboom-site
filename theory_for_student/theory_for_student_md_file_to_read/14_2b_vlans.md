# 14.2b VLANs (Virtual LANs): segmenting one physical network into isolated logical networks

#### 🏷️ The AI Data Center Networking — Moving Petabytes Without Latency > 14 Enterprise Networking Baseline > 14.2 Ethernet Fundamentals — Switching, VLANs, and IP Routing

---

## 🌐 Context Introduction

Imagine you have a single physical network switch in your AI data center. Without VLANs, every device connected to that switch can talk to every other device. This creates two big problems for AI workloads:

1. **Security risk** — Your training servers and storage arrays are on the same "flat" network as less critical systems.
2. **Performance issues** — Broadcast traffic (like ARP requests) from one group of devices floods the entire network, wasting bandwidth.

**VLANs solve this** by carving one physical switch into multiple virtual switches. Devices in VLAN 10 cannot see or talk to devices in VLAN 20 unless you explicitly route between them. This is essential for AI infrastructure where you need to isolate:
- Management traffic from data traffic
- GPU cluster traffic from storage traffic
- Production workloads from testing environments

---

## ⚙️ How VLANs Work — The Simple Analogy

Think of a physical switch as a large office building. Without VLANs, every room has an open door to every other room. With VLANs, you create separate floors with locked doors.

| Without VLANs | With VLANs |
|---------------|------------|
| One big, noisy network | Multiple quiet, private networks |
| All devices see all traffic | Devices only see traffic in their VLAN |
| Security is weak | Security is strong by default |
| Broadcast storms affect everyone | Broadcasts stay within the VLAN |

**Key concept:** VLANs operate at Layer 2 (the data link layer) of the OSI model. They don't need IP addresses to work — they just tag Ethernet frames with a VLAN ID.

---

## 🛠️ VLAN Tagging — The 802.1Q Standard

To make VLANs work across multiple switches, engineers use **VLAN tagging**. This adds a small 4-byte tag to each Ethernet frame that identifies which VLAN the traffic belongs to.

**How it looks in practice:**

- **Access port** — A switch port that belongs to one VLAN. Used for connecting servers, GPUs, or storage devices.
- **Trunk port** — A switch port that carries multiple VLANs. Used for connecting switches to each other or to routers.

**Example scenario in an AI cluster:**

- **VLAN 100** — GPU training traffic (high bandwidth, low latency)
- **VLAN 200** — Storage traffic (NFS, iSCSI)
- **VLAN 300** — Management traffic (SSH, monitoring)

A server with a single network cable can be on VLAN 100, while the switch uplink to the core router carries all three VLANs as tagged traffic.

---

## 📊 VLANs in AI Infrastructure — Why They Matter

AI workloads generate massive amounts of east-west traffic (server-to-server). Without VLANs, this traffic competes with management and storage traffic, causing:

- **Packet loss** during GPU collective operations (like NCCL all-reduce)
- **Jitter** that slows down distributed training
- **Security holes** where a compromised management server could access training data

**Typical VLAN segmentation for an AI cluster:**

| VLAN ID | Purpose | Traffic Type | Latency Sensitivity |
|---------|---------|--------------|---------------------|
| 10 | GPU Compute | RDMA, NCCL | Extremely high |
| 20 | Storage | NFS, NVMe-oF | High |
| 30 | Management | SSH, SNMP | Low |
| 40 | In-Band Management | BMC, IPMI | Low |
| 50 | External Access | API, web UI | Medium |

---

## 🕵️ Common VLAN Configuration Mistakes (and How to Avoid Them)

New engineers often make these errors:

1. **Forgetting to create the VLAN on all switches** — If VLAN 10 exists on switch A but not switch B, traffic gets dropped.
2. **Mismatched trunk ports** — One switch expects tagged traffic, the other expects untagged traffic.
3. **Native VLAN mismatch** — The default VLAN (usually VLAN 1) on trunk ports must match on both ends.
4. **VLAN pruning** — Not removing unused VLANs from trunk ports wastes bandwidth.

**Best practice:** Always document your VLAN plan before touching any switch. Use a consistent naming convention like:
- **VLAN 10** — AI-GPU
- **VLAN 20** — AI-STORAGE
- **VLAN 30** — AI-MGMT

---

## 🔄 VLANs vs. Subnets — The Relationship

VLANs and subnets work together but are not the same thing:

- **VLAN** = Layer 2 boundary (broadcast domain)
- **Subnet** = Layer 3 boundary (IP network)

**Rule of thumb:** One VLAN = One subnet. For example:
- VLAN 10 uses subnet 192.168.10.0/24
- VLAN 20 uses subnet 192.168.20.0/24

To communicate between VLANs, you need a **router** or a **Layer 3 switch** that performs inter-VLAN routing. In AI data centers, this is often a top-of-rack (ToR) switch that also handles RDMA traffic.

---

## ✅ Key Takeaways for New Engineers

- VLANs let you create multiple isolated networks on one physical switch
- Use **access ports** for end devices, **trunk ports** for switch-to-switch connections
- Always tag VLANs on trunk links using 802.1Q
- One VLAN = One subnet = One broadcast domain
- VLANs are essential for AI infrastructure to separate GPU, storage, and management traffic
- Document your VLAN plan — it saves hours of troubleshooting later

**Remember:** In an AI data center, a misconfigured VLAN can silently drop RDMA traffic, causing training jobs to fail with cryptic errors. Always verify VLAN membership with a simple ping test between devices in the same VLAN before assuming the network works.