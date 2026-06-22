# 3.2b Stage 2: GRUB bootloader — menu, kernel selection, and initrd/initramfs

#### 🏷️ The Operating System Layer — Linux for AI Infrastructure Operators > 3 Linux System Fundamentals — The OS From the Ground Up > 3.2 The Linux Boot Process — From Power-On to Login Prompt

---

## 🧠 Context Introduction

After the BIOS or UEFI firmware hands control to the bootloader, the next critical stage is the **GRUB (Grand Unified Bootloader)**. For engineers working with AI infrastructure, understanding GRUB is essential because it controls which Linux kernel and initial filesystem are loaded — directly impacting system stability, driver availability, and GPU initialization.

GRUB acts as the bridge between the firmware and the operating system kernel. It presents a menu, allows kernel selection, and loads the **initrd** (initial RAM disk) or **initramfs** (initial RAM filesystem) before the actual root filesystem is mounted.

---

## ⚙️ The GRUB Menu — Your First Interactive Choice

When a server boots, GRUB displays a menu (often hidden by default in production systems) that allows you to:

- **Select which kernel version** to boot (useful when testing new kernels or rolling back after an update)
- **Add or modify boot parameters** (e.g., enabling debug logging, setting GPU memory limits, or specifying a different root device)
- **Boot into recovery or single-user mode** for troubleshooting

The menu is typically configured in the file located at **/boot/grub/grub.cfg** (or **/boot/grub2/grub.cfg** on RHEL-based systems). Engineers rarely edit this file directly — instead, they modify templates in **/etc/default/grub** and regenerate the configuration.

---

## 🛠️ Kernel Selection — Why It Matters for AI Workloads

The kernel is the core of the Linux operating system. During GRUB stage, you can choose between multiple installed kernels. This is particularly important for AI infrastructure because:

- **Newer kernels** may include better support for NVIDIA GPUs, newer drivers, or performance improvements
- **Older kernels** might be needed for compatibility with specific driver versions or proprietary software
- **Custom kernels** can be compiled with specific features (e.g., real-time scheduling, huge page support) for AI training workloads

GRUB lists available kernels by their version number, and you can select one using arrow keys before the timeout expires.

---

## 📦 initrd / initramfs — The Temporary Root Filesystem

Before the kernel can mount the actual root filesystem (e.g., an NVMe drive or network storage), it needs essential drivers and modules. This is where **initrd** (initial RAM disk) or **initramfs** (initial RAM filesystem) comes in.

### What it contains:
- **Storage drivers** (NVMe, SATA, RAID controllers)
- **Filesystem drivers** (ext4, XFS, Btrfs)
- **Network drivers** (for network-booted systems)
- **GPU drivers** (sometimes needed for early console output)
- **A minimal init system** that mounts the real root filesystem

### How it works:
1. GRUB loads the kernel and the initramfs image into memory
2. The kernel extracts the initramfs into a temporary RAM-based filesystem
3. The initramfs runs a small script that loads necessary drivers
4. It then mounts the actual root filesystem and hands control to the real init system (systemd)

---

## 📊 Comparison: initrd vs initramfs

| Feature | initrd | initramfs |
|---------|--------|-----------|
| **Type** | Block device (RAM disk) | RAM-based filesystem (tmpfs) |
| **Size** | Fixed size, often wasteful | Dynamic, grows as needed |
| **Performance** | Slower (block device overhead) | Faster (direct memory access) |
| **Modern usage** | Legacy systems | All modern Linux distributions |
| **File format** | Compressed filesystem image (e.g., ext2) | Compressed cpio archive |

Most AI infrastructure servers today use **initramfs** because it is more flexible and efficient.

---

## 🕵️ Common GRUB Parameters for AI Infrastructure

When booting a server for AI workloads, engineers may add or modify these kernel parameters in the GRUB menu:

- **nomodeset** — Prevents the kernel from changing display modes; useful when GPU drivers are not yet loaded
- **nvidia-drm.modeset=1** — Enables NVIDIA Direct Rendering Manager for GPU acceleration
- **systemd.unit=multi-user.target** — Boots to text mode (no GUI), saving memory for compute tasks
- **rd.debug** — Enables debug logging in the initramfs for troubleshooting boot failures
- **panic=10** — Reboots automatically 10 seconds after a kernel panic (useful for headless servers)

---

## 🔄 Typical GRUB Boot Flow (Simplified)

1. BIOS/UEFI loads GRUB from the disk's boot sector
2. GRUB reads its configuration file (**/boot/grub/grub.cfg**)
3. GRUB displays the menu (or uses a default selection after timeout)
4. You select a kernel (or the default is chosen automatically)
5. GRUB loads the selected **vmlinuz** (kernel) and **initramfs** images into memory
6. GRUB passes control to the kernel with any specified parameters
7. The kernel decompresses and initializes, then runs the initramfs
8. The initramfs loads drivers and mounts the real root filesystem
9. Control is handed to **systemd** (or another init system) to complete the boot

---

## ✅ Key Takeaways for New Engineers

- GRUB is the bootloader that lets you choose which kernel and boot parameters to use
- The **initramfs** is a temporary filesystem that provides drivers needed to mount the real root
- Kernel selection is critical for AI systems — newer kernels often have better GPU support
- GRUB parameters can be modified temporarily (at boot) or permanently (via configuration files)
- Understanding GRUB helps you recover from boot failures and optimize system startup for AI workloads

---

## 📚 Further Learning Path

- Explore the **/boot** directory to see installed kernels and initramfs images
- Practice editing **/etc/default/grub** and running **update-grub** (or **grub2-mkconfig**) to regenerate the boot configuration
- Learn how to boot into **single-user mode** for emergency maintenance
- Study how NVIDIA drivers are loaded during the initramfs stage for GPU-enabled systems