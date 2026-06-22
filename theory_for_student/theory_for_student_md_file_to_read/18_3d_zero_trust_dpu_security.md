# 18.3d Zero-Trust security enforcement at the DPU: traffic isolation between tenants

#### 🏷️ The AI Data Center Networking — Moving Petabytes Without Latency > 18 NVIDIA Data Processing Units (DPUs) — Offloading Infrastructure > 18.3 DOCA — The DPU Programming Framework

---

## 🔍 Context Introduction

In modern AI data centers, multiple tenants (such as different teams, customers, or applications) often share the same physical infrastructure. Without proper isolation, one tenant's traffic could accidentally or maliciously interfere with another's — leading to security breaches, data leaks, or performance degradation.

Zero-Trust security means **never trust, always verify**. Applied to the DPU (Data Processing Unit), this principle ensures that every packet is checked and isolated before it reaches its destination. The NVIDIA BlueField DPU enforces traffic isolation directly at the hardware level, so tenants cannot see or affect each other's data — even if they share the same physical network.

---

## ⚙️ What Is Traffic Isolation Between Tenants?

Traffic isolation means that network traffic belonging to Tenant A is completely separated from traffic belonging to Tenant B. This is achieved by:

- **Assigning unique virtual networks** (VLANs or VXLANs) to each tenant.
- **Enforcing access rules** at the DPU's programmable pipeline.
- **Blocking cross-tenant communication** unless explicitly allowed by policy.

In a Zero-Trust model, the DPU acts as a **gatekeeper** — it inspects every packet, verifies the tenant identity, and drops anything that doesn't match the allowed policy.

---

## 🛠️ How the DPU Enforces Zero-Trust Isolation

The BlueField DPU uses its built-in **programmable data path** (via DOCA and eBPF) to enforce isolation. Here's the flow:

1. **Packet arrives** at the DPU's network port.
2. **Tenant identity is extracted** from the packet header (e.g., VXLAN Network Identifier or VLAN tag).
3. **Policy check** — the DPU compares the packet against a pre-loaded rule table.
4. **Action** — if the packet is allowed, it is forwarded to the host CPU. If not, it is dropped immediately.

This happens at **line rate** (up to 200 Gbps) without involving the host CPU, so performance is not impacted.

---

## 🕵️ Key Components for Zero-Trust Isolation

| Component | Role in Traffic Isolation |
|-----------|---------------------------|
| **BlueField DPU** | Hardware enforcement point — inspects and filters all traffic |
| **DOCA Flow** | Programmable rules engine — defines which traffic is allowed between tenants |
| **VXLAN / VLAN tags** | Tenant identifiers embedded in packet headers |
| **eBPF programs** | Custom logic loaded into the DPU for advanced filtering |
| **Host CPU** | Only sees traffic that passes DPU validation — never exposed to raw tenant traffic |

---

## 📊 Example: Two Tenants Sharing a Physical Server

Imagine a single server with one BlueField DPU. Two tenants are running on the same host:

- **Tenant A** — uses VXLAN ID 100
- **Tenant B** — uses VXLAN ID 200

Without isolation, Tenant A could potentially send packets to Tenant B's virtual machine. With Zero-Trust enforcement at the DPU:

- The DPU is programmed to **only forward packets** where the source and destination VXLAN IDs match the same tenant.
- A packet from Tenant A (VXLAN 100) addressed to Tenant B (VXLAN 200) is **dropped at the DPU** — it never reaches the host.
- A packet from Tenant A to another resource within Tenant A's network is **forwarded normally**.

---

## 🧩 Implementing Isolation with DOCA

To configure traffic isolation, engineers use the DOCA Flow API to define rules. The general approach is:

1. **Identify tenant boundaries** — decide which VXLAN or VLAN IDs belong to each tenant.
2. **Create flow rules** — for each tenant, allow traffic only within its own ID range.
3. **Load rules onto the DPU** — the DPU applies these rules to every incoming packet.
4. **Monitor and audit** — use DOCA telemetry to verify that no cross-tenant packets are being forwarded.

For reference, a simplified rule structure might look like:

```
flow create ingress
  pattern eth / vxlan vni is 100 / end
  actions jump tenant_A_table / end

flow create ingress
  pattern eth / vxlan vni is 200 / end
  actions jump tenant_B_table / end
```

📤 **Output:** Each tenant's traffic is directed to its own rule table, where only intra-tenant flows are allowed.

---

## ✅ Benefits of DPU-Based Zero-Trust Isolation

- **Hardware-level enforcement** — cannot be bypassed by software bugs or misconfigurations on the host.
- **No performance penalty** — filtering happens at line rate, separate from the host CPU.
- **Simplified compliance** — audit logs from the DPU show exactly which packets were allowed or dropped.
- **Multi-tenant safety** — tenants can share infrastructure without risk of data leakage.

---

## 🧠 Key Takeaways for New Engineers

- **Zero-Trust means verify everything** — the DPU checks every packet, even between tenants on the same host.
- **Traffic isolation is not optional** in multi-tenant AI data centers — it is a security requirement.
- **The DPU does the heavy lifting** — the host CPU never sees unauthorized traffic.
- **DOCA Flow is your tool** for defining and managing isolation rules.
- **Start simple** — define clear tenant IDs (VXLAN or VLAN) and build rules that only allow intra-tenant communication.

---

## 🔗 Related Topics

- **18.3a** — DPU architecture and offloading fundamentals
- **18.3b** — DOCA programming model overview
- **18.3c** — Secure boot and attestation with the DPU
- **18.3e** — Encrypted traffic handling at the DPU

---

*This guide is part of the NVIDIA-Certified Associate: AI Infrastructure and Operations curriculum. Focus on understanding the **why** behind isolation — the DPU makes Zero-Trust practical at scale.*