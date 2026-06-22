# 33.3b Strong isolation: complete hardware partitioning for multi-tenant cloud environments

#### 🏷️ The Virtualization and Cloud — Extending AI Infrastructure Beyond Bare Metal > 33 GPU Virtualization — vGPU and AI in Virtual Machines > 33.3 MIG and vGPU Combination (Hopper+)

---

## 🧭 Context Introduction

In multi-tenant cloud environments, multiple customers or workloads share the same physical GPU hardware. The challenge is ensuring that one tenant's workload does not interfere with another's — whether through performance degradation, security breaches, or resource contention. **Strong isolation** solves this by completely partitioning the hardware at the physical level, giving each tenant their own dedicated slice of the GPU with no shared components. This is especially critical for AI workloads where data privacy, predictable performance, and strict SLAs are non-negotiable.

---

## ⚙️ What Is Strong Isolation?

Strong isolation means that each tenant's GPU partition operates as if it were a completely separate physical GPU. There is **no shared memory, no shared cache, and no shared compute units** between partitions. This is achieved through hardware-level partitioning technologies like **NVIDIA Multi-Instance GPU (MIG)**.

Key characteristics:
- 🧩 **Hardware-enforced boundaries** — Partitions cannot access each other's memory or processing resources.
- 🔒 **Security by design** — No risk of data leakage or side-channel attacks between tenants.
- 📈 **Predictable performance** — Each partition gets guaranteed, non-overlapping resources.
- 🛡️ **Fault isolation** — A crash or error in one partition does not affect others.

---

## 🛠️ How It Works: Complete Hardware Partitioning

Unlike software-based virtualization (e.g., vGPU), which shares GPU resources through a hypervisor layer, MIG physically carves the GPU into separate instances at the silicon level.

| Feature | Software-Based Isolation (vGPU) | Hardware-Based Isolation (MIG) |
|---------|--------------------------------|--------------------------------|
| 🔐 Security | Relies on hypervisor isolation | Hardware-enforced, no shared resources |
| 📊 Performance | Subject to resource contention | Guaranteed, dedicated resources |
| 🧠 Memory | Shared memory pool | Dedicated memory per partition |
| ⚡ Fault Tolerance | One VM can impact others | Fully isolated failure domains |
| 🎯 Use Case | Lightweight multi-tenancy | Strict SLAs, regulated industries |

---

## 🕵️ When to Use Strong Isolation (MIG)

Strong isolation is ideal when:
- 🏢 **Multi-tenant cloud providers** need to guarantee SLAs to different customers.
- 🏥 **Healthcare or finance** workloads require strict data privacy and compliance.
- 🧪 **AI model training** demands consistent, predictable performance across runs.
- 🔄 **Mixed workloads** (inference + training) must run simultaneously without interference.

---

## 📊 MIG Profiles on Hopper GPUs (Example)

On NVIDIA Hopper architecture GPUs (e.g., H100), MIG supports several partition profiles. Each profile carves the GPU into a specific number of instances with dedicated resources.

| MIG Profile | GPU Instances | Memory per Instance | Compute Units per Instance |
|-------------|---------------|---------------------|----------------------------|
| 1g.10gb | 7 | 10 GB | 1 slice |
| 2g.20gb | 3 | 20 GB | 2 slices |
| 3g.40gb | 2 | 40 GB | 3 slices |
| 7g.80gb | 1 | 80 GB | Full GPU |

Each instance is fully isolated — no sharing of L2 cache, memory controllers, or streaming multiprocessors.

---

## 🧩 Combining MIG with vGPU (Hopper+)

On Hopper and later architectures, MIG can be combined with vGPU to create **nested isolation**:
- **Layer 1 (Hardware)**: MIG partitions the physical GPU into isolated hardware slices.
- **Layer 2 (Software)**: Each MIG slice can then be virtualized using vGPU to support multiple VMs per slice.

This combination gives cloud providers maximum flexibility:
- 🎛️ Fine-grained resource allocation
- 🔐 Strong security at the hardware level
- 🖥️ Support for legacy vGPU-based workflows

---

## ✅ Benefits for Multi-Tenant Cloud Environments

- **🔒 Zero-trust security** — Tenants cannot access each other's data, even through hardware side channels.
- **📈 SLA compliance** — Each tenant gets guaranteed compute and memory resources.
- **🔄 Dynamic reconfiguration** — MIG profiles can be changed without rebooting the GPU (on supported hardware).
- **💰 Cost efficiency** — One physical GPU can serve multiple tenants with full isolation, reducing hardware costs.

---

## ⚠️ Important Considerations

- **GPU model dependency** — MIG is only available on NVIDIA Ampere (A100, A30) and Hopper (H100, H200) architectures and newer.
- **Profile limitations** — Not all MIG profiles are available on all GPUs; check the NVIDIA documentation for your specific model.
- **Driver support** — Requires NVIDIA driver version 470.42.01 or later (for A100) and appropriate guest drivers.
- **Workload compatibility** — Some AI frameworks may need configuration to recognize MIG instances correctly.

---

## 🧪 Quick Validation Checklist for Engineers

When deploying strong isolation in a multi-tenant cloud environment, verify:
- [ ] ✅ The GPU supports MIG (check with **nvidia-smi** — look for "MIG" in the output).
- [ ] ✅ MIG is enabled in the GPU BIOS or via the NVIDIA management tool.
- [ ] ✅ Each tenant's VM is assigned to a specific MIG instance (not the full GPU).
- [ ] ✅ Memory and compute resources match the expected MIG profile.
- [ ] ✅ No cross-instance communication is possible (test with a simple data-sharing attempt).

---

## 📚 Summary

Strong isolation through complete hardware partitioning is the gold standard for multi-tenant AI cloud environments. By using NVIDIA MIG on Hopper+ GPUs, engineers can give each tenant a dedicated, secure, and predictable slice of GPU resources — without compromising on performance or security. When combined with vGPU, this approach offers the best of both worlds: hardware-level isolation and software-level flexibility.