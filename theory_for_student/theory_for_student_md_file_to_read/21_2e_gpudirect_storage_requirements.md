# 21.2e Requirements: compatible NVMe drivers, supported Linux kernels, GDS package

#### 🏷️ The AI Data Center Networking — Moving Petabytes Without Latency > 21 Accelerating the Storage Pipeline — GPUDirect Storage > 21.2 GPUDirect Storage (GDS) — Direct NVMe-to-GPU Transfers

---

## 🧠 Context Introduction

GPUDirect Storage (GDS) is a technology that creates a direct data path between NVMe storage and GPU memory, bypassing the CPU and system RAM. This dramatically reduces latency and increases throughput for AI workloads that need to move large datasets into GPUs for training or inference. However, for GDS to work correctly, your system must meet specific hardware and software requirements. This guide covers the three essential components: **compatible NVMe drivers**, **supported Linux kernels**, and the **GDS package itself**.

---

## ⚙️ Compatible NVMe Drivers

The NVMe driver is the software layer that allows your operating system to communicate with NVMe solid-state drives. For GDS to function, this driver must support a feature called **peer-to-peer (P2P) DMA**, which enables direct memory transfers between the NVMe device and the GPU without CPU involvement.

### Key Requirements:
- **Driver must support P2P DMA** — This is non-negotiable for GDS.
- **Use the in-kernel NVMe driver** — The standard NVMe driver included with the Linux kernel is typically sufficient.
- **Avoid proprietary or third-party NVMe drivers** — Unless they explicitly state GDS compatibility.
- **Check your NVMe device firmware** — Some enterprise NVMe drives require firmware updates to enable P2P DMA.

### How to verify:
- Run the command: **nvme list** — This shows all detected NVMe devices.
- Check the driver in use: **lsmod | grep nvme** — Look for the **nvme** and **nvme_core** modules.
- Confirm P2P support: **cat /sys/class/nvme/nvme0/device/p2p** — If this file exists and shows **1**, P2P is enabled.

---

## 🐧 Supported Linux Kernels

GDS relies on specific kernel features, particularly around **PCIe peer-to-peer** and **large page support**. NVIDIA tests and certifies GDS against specific kernel versions. Using an unsupported kernel may cause GDS to fail or behave unpredictably.

### Supported Kernel Versions (as of latest GDS release):
| Kernel Series | Status | Notes |
|---------------|--------|-------|
| **5.4.x** | ✅ Supported | Common on Ubuntu 20.04 LTS |
| **5.10.x** | ✅ Supported | Common on Debian 11 and RHEL 8.4+ |
| **5.15.x** | ✅ Supported | Common on Ubuntu 22.04 LTS |
| **6.1.x** | ✅ Supported | Common on RHEL 9.x |
| **6.2.x** | ⚠️ Partial | Some features may require patches |
| **6.5+** | ❌ Not recommended | Not officially validated |

### Important kernel configuration options:
- **CONFIG_PCI_P2PDMA** must be set to **y** or **m**.
- **CONFIG_HUGETLB_PAGE** must be enabled.
- **CONFIG_NUMA** should be enabled for optimal performance.

### How to check your kernel version:
- Run: **uname -r** — This prints your current kernel version.
- Verify kernel config: **cat /boot/config-$(uname -r) | grep CONFIG_PCI_P2PDMA** — Look for **=y** or **=m**.

---

## 📦 GDS Package

The GDS package contains the user-space libraries and tools needed to enable GPUDirect Storage. It is distributed by NVIDIA as part of the **CUDA Toolkit** or as a standalone package.

### Package Components:
- **libgds.so** — The core GDS library that applications link against.
- **gdscheck** — A diagnostic tool to verify your system meets GDS requirements.
- **gdscopy** — A utility for testing GDS data transfers.
- **gdsio** — A benchmarking tool for measuring GDS performance.

### Installation Methods:
- **Via CUDA Toolkit** — GDS is included starting from CUDA 11.4. Install the full toolkit or select the GDS component.
- **Standalone package** — Available from NVIDIA's developer site for systems that don't need the full CUDA toolkit.
- **Package manager** — On supported Linux distributions, you can use **apt** or **yum** to install the **nvidia-gds** package.

### Post-Installation Verification:
- Run: **gdscheck -a** — This performs a comprehensive system check and reports any issues.
- Expected output: A summary showing **PASS** for all checks, including NVMe driver, kernel, and GPU compatibility.
- If any check fails, the tool provides specific guidance on what needs to be fixed.

---

## 🕵️ System Compatibility Checklist

Before deploying GDS in production, verify each of these requirements:

- ✅ **NVMe drives** are enterprise-class and support P2P DMA (check with your drive vendor).
- ✅ **NVMe driver** is the in-kernel driver (not a proprietary one).
- ✅ **Linux kernel** is on the supported list (5.4, 5.10, 5.15, or 6.1 series).
- ✅ **Kernel config** has **CONFIG_PCI_P2PDMA** enabled.
- ✅ **NVIDIA GPU** is a supported model (Tesla T4, A100, H100, or newer).
- ✅ **NVIDIA driver** is version 470 or later (check with **nvidia-smi**).
- ✅ **CUDA Toolkit** version 11.4 or later is installed.
- ✅ **GDS package** is installed and **gdscheck -a** passes all tests.

---

## 🛠️ Troubleshooting Common Issues

| Issue | Likely Cause | Solution |
|-------|--------------|----------|
| **gdscheck fails on NVMe driver** | Driver doesn't support P2P | Update to a newer kernel or check drive firmware |
| **gdscheck fails on kernel** | Kernel version is too old or too new | Use a supported kernel from the table above |
| **gdscheck fails on GPU** | GPU or NVIDIA driver is too old | Update NVIDIA driver to 470+ and use a supported GPU |
| **GDS transfers are slow** | NUMA mismatch between GPU and NVMe | Ensure GPU and NVMe are on the same PCIe root complex |
| **gdsio reports errors** | Hardware or driver incompatibility | Run **gdscheck -a** and follow its recommendations |

---

## ✅ Summary

GPUDirect Storage is a powerful tool for accelerating AI data pipelines, but it requires careful attention to system configuration. The three pillars — **compatible NVMe drivers**, **supported Linux kernels**, and the **GDS package** — must all be in place for GDS to work. Always start by running **gdscheck -a** after installation to validate your setup. When in doubt, stick with the kernel versions and drivers that NVIDIA has explicitly tested and certified.