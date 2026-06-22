# 33.1c GPU passthrough (PCIe passthrough): dedicating one GPU to one VM

#### 🏷️ The Virtualization and Cloud — Extending AI Infrastructure Beyond Bare Metal > 33 GPU Virtualization — vGPU and AI in Virtual Machines > 33.1 Hypervisors and Virtual Machines for AI

---

## 🌐 Context Introduction

When you run AI workloads in virtual machines (VMs), you often need direct access to a physical GPU for maximum performance. **GPU passthrough** (also called PCIe passthrough) is a technique that dedicates an entire physical GPU to a single VM. This gives the VM exclusive, low-latency access to the GPU hardware, bypassing the hypervisor for GPU operations.

Think of it like giving one VM its own dedicated graphics card — no sharing, no virtualization overhead for the GPU. This is ideal for AI training, inference, or rendering tasks where you need full GPU power inside a virtualized environment.

---

## ⚙️ How GPU Passthrough Works

- The hypervisor (like VMware ESXi, KVM, or XenServer) assigns a physical PCIe device (the GPU) directly to a VM.
- The VM's operating system sees the GPU as if it were physically installed in its own hardware.
- GPU drivers run natively inside the VM — no special virtualization drivers are needed.
- The hypervisor acts only as a bridge for PCIe configuration and interrupts, not for GPU compute operations.
- This results in near-native GPU performance inside the VM.

---

## 🛠️ Key Requirements for GPU Passthrough

- **Hardware support**: The CPU and motherboard must support **IOMMU** (Input-Output Memory Management Unit) — Intel calls this VT-d, AMD calls it AMD-Vi.
- **GPU support**: Not all GPUs support passthrough. NVIDIA Quadro, Tesla, and some GeForce cards work, but consumer cards may have limitations.
- **Hypervisor support**: The hypervisor must support PCIe passthrough (most enterprise hypervisors do).
- **Dedicated GPU**: The GPU cannot be shared with the host or other VMs — it is exclusively assigned to one VM.
- **Driver installation**: The VM must have the correct GPU drivers installed (e.g., NVIDIA drivers for CUDA workloads).

---

## ✅ Advantages of GPU Passthrough

- **Full GPU performance**: No virtualization overhead — the VM gets 95-100% of native GPU performance.
- **Native driver support**: Use standard NVIDIA or AMD drivers inside the VM.
- **Compatibility**: Works with any GPU-accelerated application (CUDA, TensorFlow, PyTorch, etc.).
- **Isolation**: One VM's GPU workload does not affect other VMs.

---

## ❌ Limitations of GPU Passthrough

- **One GPU per VM**: You cannot split a single GPU across multiple VMs (that requires vGPU or MIG).
- **No live migration**: You cannot move a VM with a passthrough GPU to another host while it is running.
- **Hardware dependency**: Requires specific CPU and motherboard features (IOMMU).
- **Host GPU loss**: The host operating system loses access to that GPU — you may need a separate GPU for the host display.

---

## 📊 Comparison: GPU Passthrough vs. vGPU vs. Bare Metal

| Feature | GPU Passthrough | vGPU (Virtual GPU) | Bare Metal |
|---------|----------------|-------------------|------------|
| **GPU sharing** | One GPU per VM | One GPU split across multiple VMs | One GPU per physical machine |
| **Performance** | Near-native (95-100%) | Good, but some overhead | 100% native |
| **VM density** | Low (1 GPU = 1 VM) | High (1 GPU = many VMs) | Not applicable |
| **Live migration** | Not supported | Supported (with some limitations) | Not applicable |
| **Use case** | High-performance AI training, single VM | Multi-tenant AI inference, VDI | Maximum performance, no virtualization |
| **Driver complexity** | Simple (native drivers in VM) | Requires vGPU manager and licensed drivers | Simple (native drivers) |

---

## 🕵️ When to Use GPU Passthrough

- You need **maximum GPU performance** inside a VM for AI training or inference.
- You have **dedicated GPUs** available for each VM (no need to share).
- You are running **single-tenant workloads** where isolation is more important than density.
- You want to use **standard NVIDIA CUDA tools** without special virtualization software.

---

## 🧩 Typical Workflow for Setting Up GPU Passthrough

1. **Enable IOMMU in BIOS/UEFI** — Turn on VT-d (Intel) or AMD-Vi (AMD).
2. **Configure the hypervisor** — Enable PCIe passthrough and identify the GPU's PCIe address.
3. **Detach the GPU from the host** — Remove the GPU driver from the host OS so it does not claim the device.
4. **Assign the GPU to the VM** — In the hypervisor management interface, add the GPU as a PCIe device to the VM.
5. **Install GPU drivers in the VM** — Boot the VM and install the appropriate NVIDIA or AMD drivers.
6. **Verify GPU access** — Inside the VM, run a GPU detection tool (like **nvidia-smi** for NVIDIA GPUs) to confirm the GPU is visible and working.

---

## 💡 Practical Tips for New Engineers

- **Test with a non-critical GPU first** — Passthrough configuration can be tricky; start with a test GPU.
- **Check your GPU's passthrough compatibility** — Some consumer GPUs have reset bugs or driver restrictions.
- **Use a separate GPU for the host** — If your host needs a display, keep one GPU for the host and passthrough the others.
- **Monitor GPU temperature and power** — The VM's GPU management tools (like **nvidia-smi**) still work inside the VM.
- **Plan for no live migration** — If you need to move VMs between hosts, consider vGPU or other solutions instead.

---

## 🔁 Summary

GPU passthrough is a straightforward way to give a virtual machine exclusive, high-performance access to a physical GPU. It is ideal for AI workloads that demand full GPU power without virtualization overhead. While it limits GPU sharing and live migration, it offers the closest experience to running on bare metal — making it a valuable tool in your AI infrastructure toolkit.