# 4.1a Filesystem Hierarchy Standard (FHS): the purpose of every top-level directory

#### 🏷️ The Operating System Layer — Linux for AI Infrastructure Operators > 4 Core Linux Administration for AI Operators > 4.1 Navigating the Linux Filesystem

---

## 🌱 Context Introduction

When you start working with AI infrastructure, you will spend a lot of time inside a Linux operating system. Every Linux system follows a standardized directory layout called the **Filesystem Hierarchy Standard (FHS)**. This standard defines where files, programs, configuration data, and logs live. Understanding the purpose of each top-level directory helps you navigate servers, troubleshoot issues, and manage AI workloads efficiently. Think of it as the blueprint for your server's filing cabinet.

---

## 📂 The Top-Level Directories at a Glance

Below is a quick reference table showing every top-level directory and its primary purpose. Use this as a cheat sheet when exploring a new system.

| Directory | Purpose |
|-----------|---------|
| **/** | Root directory — the starting point of the entire filesystem |
| **/bin** | Essential user command binaries (e.g., `ls`, `cp`) |
| **/boot** | Boot loader files and Linux kernel |
| **/dev** | Device files (hardware represented as files) |
| **/etc** | System-wide configuration files |
| **/home** | Personal directories for users |
| **/lib** | Essential shared libraries and kernel modules |
| **/media** | Mount point for removable media (USB drives, CDs) |
| **/mnt** | Temporary mount point for filesystems |
| **/opt** | Optional third-party software packages |
| **/proc** | Virtual filesystem for process and kernel information |
| **/root** | Home directory for the root user |
| **/run** | Runtime variable data (since boot) |
| **/sbin** | Essential system administration binaries |
| **/srv** | Service data (e.g., web server files) |
| **/sys** | Virtual filesystem for hardware and kernel info |
| **/tmp** | Temporary files (deleted on reboot) |
| **/usr** | Secondary hierarchy for user utilities and applications |
| **/var** | Variable data (logs, databases, spool files) |

---

## ⚙️ /bin — Essential User Binaries

This directory contains the most basic commands that every user needs to run a system. These binaries are available even in single-user mode or recovery scenarios.

- **What lives here:** Commands like `ls`, `cp`, `mv`, `cat`, `echo`, `bash`
- **Why it matters for AI:** You will use these commands constantly to inspect files, move datasets, and run scripts.
- **Key point:** On modern systems, **/bin** is often a symbolic link to **/usr/bin**.

---

## 🛠️ /boot — Boot Loader Files

The **/boot** directory holds everything needed to start the operating system. It is critical for system recovery and kernel updates.

- **What lives here:** The Linux kernel (often named `vmlinuz`), initial RAM disk (`initrd`), and boot loader configuration (e.g., GRUB).
- **Why it matters for AI:** When you update the kernel or install GPU drivers, files here may change. Running out of space in **/boot** can prevent system updates.

---

## 🧩 /dev — Device Files

In Linux, every hardware component is represented as a file inside **/dev**. This makes it easy for programs to interact with hardware using standard file operations.

- **What lives here:** Files like **/dev/sda** (first hard drive), **/dev/nvidia0** (first NVIDIA GPU), **/dev/null** (data sink)
- **Why it matters for AI:** GPU devices appear here. When you run AI workloads, your software reads and writes to these device files to communicate with the GPU.

---

## 📋 /etc — Configuration Files

This is the brain of your system configuration. Almost every application stores its settings here.

- **What lives here:** Network settings, user accounts, service configurations, and environment variables.
- **Why it matters for AI:** You will edit files here to configure NVIDIA drivers, set up networking for distributed training, or adjust system limits for large datasets.

---

## 🏠 /home — User Home Directories

Each regular user gets a personal folder under **/home**. This is where personal files, scripts, and configurations live.

- **What lives here:** Folders like **/home/alice**, **/home/bob**, each containing Desktop, Documents, and hidden configuration files (e.g., `.bashrc`).
- **Why it matters for AI:** Your AI projects, datasets, and Python virtual environments typically reside here.

---

## 🔧 /lib — Essential Shared Libraries

Programs depend on shared libraries (similar to DLLs on Windows) to function. The **/lib** directory holds the most critical ones.

- **What lives here:** Library files like `libc.so`, kernel modules in **/lib/modules**
- **Why it matters for AI:** GPU drivers and CUDA libraries may place components here. If a library is missing, your AI software will fail to start.

---

## 💿 /media — Removable Media

When you plug in a USB drive or insert a CD, the system automatically mounts it under **/media**.

- **What lives here:** Subdirectories like **/media/usb0**, **/media/cdrom**
- **Why it matters for AI:** Useful for transferring datasets or models via external drives.

---

## 📦 /mnt — Temporary Mount Point

System administrators use **/mnt** to manually mount filesystems for temporary access.

- **What lives here:** Typically empty until you mount something (e.g., a network share or external storage).
- **Why it matters for AI:** You might mount a network filesystem (NFS) here to access shared datasets across a cluster.

---

## 🧰 /opt — Optional Software

Third-party software that is not part of the default Linux distribution is often installed here.

- **What lives here:** Packages like NVIDIA CUDA Toolkit, MATLAB, or commercial AI frameworks.
- **Why it matters for AI:** Many AI tools install into **/opt** to keep them separate from system files.

---

## 🧠 /proc — Process Information (Virtual)

This is a virtual filesystem that exists only in memory. It provides real-time information about running processes and the kernel.

- **What lives here:** Directories for each process (e.g., **/proc/1** for the init process), and files like **/proc/cpuinfo**, **/proc/meminfo**
- **Why it matters for AI:** You can check GPU memory usage, CPU details, and running processes without installing extra tools.

---

## 👑 /root — Root User's Home

The superuser (root) has a separate home directory outside **/home**. This ensures root's files are available even if **/home** is not mounted.

- **What lives here:** Root's personal configuration files and scripts.
- **Why it matters for AI:** You will use root access to install system-wide AI dependencies and configure hardware.

---

## 🏃 /run — Runtime Variable Data

This directory holds information about the system since it was booted. It is cleared on every reboot.

- **What lives here:** PID files, lock files, and sockets for running services.
- **Why it matters for AI:** Services like Docker or NVIDIA container runtime store runtime data here.

---

## 🛡️ /sbin — System Administration Binaries

Similar to **/bin**, but these commands are intended for system administration tasks.

- **What lives here:** Commands like `fdisk`, `mkfs`, `iptables`, `shutdown`
- **Why it matters for AI:** You will use these to partition disks, format storage, or configure network firewalls for AI clusters.

---

## 🌐 /srv — Service Data

This directory is reserved for data served by the system, such as web or FTP servers.

- **What lives here:** Subdirectories like **/srv/www** for web content, **/srv/ftp** for FTP files.
- **Why it matters for AI:** If you host model repositories or dataset downloads, they may live here.

---

## 🔬 /sys — System Information (Virtual)

Similar to **/proc**, **/sys** is a virtual filesystem that exposes kernel and hardware information in a structured way.

- **What lives here:** Information about devices, drivers, and kernel parameters.
- **Why it matters for AI:** You can check GPU power states, PCIe bus details, and driver versions here.

---

## 🗑️ /tmp — Temporary Files

Any user or program can write temporary files here. Contents are typically deleted on reboot.

- **What lives here:** Temporary downloads, cache files, and scratch space.
- **Why it matters for AI:** AI training scripts often use **/tmp** for intermediate data or model checkpoints during execution.

---

## 📚 /usr — User System Resources

This is the largest directory on most systems. It contains user utilities, applications, libraries, documentation, and source code.

- **What lives here:** Subdirectories like **/usr/bin** (more commands), **/usr/lib** (libraries), **/usr/share** (shared data), **/usr/local** (locally compiled software)
- **Why it matters for AI:** Most AI frameworks (Python, PyTorch, TensorFlow) install into **/usr/local** or **/usr/lib**. Your PATH environment variable often includes **/usr/bin** and **/usr/local/bin**.

---

## 📈 /var — Variable Data

This directory holds data that changes frequently during system operation.

- **What lives here:** Log files (**/var/log**), databases (**/var/lib**), print spools (**/var/spool**), and temporary caches (**/var/cache**)
- **Why it matters for AI:** Logs from AI training jobs, database files for model metadata, and cache directories for package managers all live here. Monitoring **/var** disk usage is critical because logs can grow quickly.

---

## 🧭 Quick Navigation Tips for New Engineers

- **Always check disk space** before starting a large AI job. Use the command **df -h** to see usage on **/**, **/home**, and **/var**.
- **Configuration files** are almost always under **/etc**. If you need to change how a service behaves, look there first.
- **GPU devices** appear as files under **/dev**. The NVIDIA driver creates entries like **/dev/nvidia0**, **/dev/nvidia1**, etc.
- **Temporary space** in **/tmp** is useful but not persistent. Never store important data there.
- **User data** belongs in **/home**. Keep your AI projects organized in subdirectories there.

---

## ✅ Summary

The Filesystem Hierarchy Standard gives every Linux system a predictable layout. As an engineer working with AI infrastructure, knowing where to find binaries, configurations, logs, and hardware interfaces saves you time and prevents mistakes. Use the table at the top of this guide as your quick reference, and explore each directory on a test system to build muscle memory.