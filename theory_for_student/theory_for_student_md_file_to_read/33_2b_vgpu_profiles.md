# 33.2b vGPU profiles: Q-series (Quadro/Workstation), C-series (Compute/AI), A-series (apps)

#### 🏷️ The Virtualization and Cloud — Extending AI Infrastructure Beyond Bare Metal > 33 GPU Virtualization — vGPU and AI in Virtual Machines > 33.2 NVIDIA vGPU — Sharing GPUs Across Multiple VMs

---

## 🔍 Context Introduction

When you share a physical NVIDIA GPU across multiple virtual machines (VMs) using vGPU technology, you need to choose the right *profile* for each VM. Think of a vGPU profile as a **predefined slice** of the GPU's capabilities — it determines how much memory, compute power, and graphics performance each VM gets. NVIDIA offers three main profile families: **Q-series**, **C-series**, and **A-series**. Each is designed for a specific type of workload, and picking the wrong one can lead to poor performance or unexpected behavior.

---

## ⚙️ What Are vGPU Profiles?

A vGPU profile defines the resources allocated to a single VM from the physical GPU. These resources include:

- **Frame buffer (video memory)** — how much GPU memory the VM can use
- **Compute units** — how many CUDA cores or Tensor Cores are available
- **Display capabilities** — whether the VM can output to a monitor

Each profile is named with a letter (Q, C, or A) followed by a number (e.g., Q‑4, C‑8, A‑2). The letter indicates the **use case**, and the number typically represents the amount of frame buffer in gigabytes.

---

## 📊 Profile Families at a Glance

| Profile Family | Full Name | Primary Use Case | Key Features |
|----------------|-----------|------------------|--------------|
| **Q-series** | Quadro / Workstation | Professional graphics, CAD, 3D rendering | Full OpenGL/DirectX support, display outputs, ISV certification |
| **C-series** | Compute / AI | AI training, deep learning, HPC | CUDA, Tensor Cores, no display output, optimized for batch processing |
| **A-series** | Apps | Virtual desktop applications (VDI) | Lightweight graphics, application streaming, lower memory footprint |

---

## 🛠️ Deep Dive into Each Series

### 🖥️ Q-series (Quadro / Workstation)

The Q-series profiles are designed for **professional graphics workloads**. If a VM needs to run applications like AutoCAD, SolidWorks, or Blender with full GPU acceleration, you want a Q-series profile.

**Key characteristics:**
- Supports **display outputs** — the VM can drive physical monitors
- Full support for **OpenGL** and **DirectX** APIs
- Certified for **ISV (Independent Software Vendor)** applications
- Includes **NVIDIA Quadro drivers** inside the VM
- Typically used in **design, engineering, and media** environments

**When to use Q-series:**
- You need to render 3D models with high polygon counts
- The VM must output video to a physical display
- The application requires Quadro-specific driver optimizations

---

### 🧮 C-series (Compute / AI)

The C-series profiles are built for **compute-intensive workloads** — specifically AI training, inference, and scientific simulations. These profiles **disable display output** to dedicate all GPU resources to computation.

**Key characteristics:**
- **No display output** — the VM cannot drive monitors
- Full access to **CUDA cores** and **Tensor Cores**
- Optimized for **batch processing** and parallel workloads
- Uses **NVIDIA Compute drivers** inside the VM
- Supports **NVIDIA AI Enterprise** software stack

**When to use C-series:**
- You are training deep learning models (PyTorch, TensorFlow)
- Running inference pipelines for AI applications
- Performing HPC simulations (molecular dynamics, weather modeling)
- The VM does not need a graphical desktop

---

### 🖱️ A-series (Apps)

The A-series profiles are designed for **virtual desktop infrastructure (VDI)** and **application streaming**. They provide a balance between graphics performance and resource efficiency, making them ideal for office productivity and light creative work.

**Key characteristics:**
- Supports **display outputs** for virtual desktop sessions
- Optimized for **application streaming** (e.g., Microsoft Remote Desktop, VMware Horizon)
- Lower memory footprint compared to Q-series
- Good for **office applications, web browsing, and video playback**
- Uses **NVIDIA GRID drivers** inside the VM

**When to use A-series:**
- You are deploying virtual desktops for knowledge workers
- Users need to run Microsoft Office, web browsers, or video conferencing
- You want to maximize the number of VMs per physical GPU
- Lightweight graphics acceleration is sufficient

---

## 🕵️ How to Choose the Right Profile

Choosing between Q, C, and A series depends on three questions:

1. **Does the VM need a display output?**
   - Yes → Q-series or A-series
   - No → C-series

2. **What is the primary workload?**
   - Professional 3D graphics → Q-series
   - AI/ML training or HPC → C-series
   - Office productivity or app streaming → A-series

3. **How many VMs do you need per GPU?**
   - Few VMs with high performance → Q-series or C-series (larger profiles)
   - Many VMs with moderate performance → A-series (smaller profiles)

---

## 🧪 Practical Example: Mapping Workloads to Profiles

Imagine you have one physical NVIDIA A100 GPU with 40 GB of memory. You want to support three different VMs:

- **VM1:** A designer running SolidWorks (needs display output, high graphics performance)
  - **Profile:** Q‑16 (16 GB frame buffer, Quadro drivers)

- **VM2:** A data scientist training a neural network (no display needed, needs CUDA)
  - **Profile:** C‑16 (16 GB frame buffer, Compute drivers)

- **VM3:** A remote worker using Microsoft Office (needs display, light graphics)
  - **Profile:** A‑8 (8 GB frame buffer, GRID drivers)

Total allocated: 16 + 16 + 8 = 40 GB — exactly matching the physical GPU memory.

---

## ✅ Key Takeaways for New Engineers

- **Q-series** = Professional graphics + display output (think: CAD, 3D rendering)
- **C-series** = Compute + no display (think: AI training, HPC)
- **A-series** = Virtual desktops + light graphics (think: office apps, VDI)
- The **letter** tells you the workload type; the **number** tells you the memory allocation
- Always match the **driver type** inside the VM to the profile series (Quadro, Compute, or GRID)
- You can mix different profile series on the same physical GPU, as long as total memory does not exceed the GPU's capacity

---

## 📚 Further Learning

- NVIDIA vGPU documentation: *NVIDIA Virtual GPU Software Documentation*
- Profile compatibility matrix: *NVIDIA vGPU Supported GPUs and Profiles*
- Driver selection guide: *NVIDIA vGPU Driver Types and Installation*