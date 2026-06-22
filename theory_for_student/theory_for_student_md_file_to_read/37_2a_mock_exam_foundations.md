# 37.2a Mock Exam 1: Foundational focus — infrastructure, hardware, and networking

#### 🏷️ The Exam Preparation & Certification Mastery > 37 Comprehensive Practice Assessments > 37.2 Three Full-Length Timed Mock Exams

---

## 🧭 Context Introduction

Welcome to your first mock exam in the NVIDIA-Certified Associate: AI Infrastructure and Operations track. This assessment is designed for new engineers who are building foundational knowledge in AI infrastructure. The focus here is on **hardware components**, **networking fundamentals**, and **infrastructure concepts** that underpin modern AI workloads. Think of this as a warm-up — it tests your understanding of the physical and logical building blocks before diving into more complex operational scenarios.

---

## ⚙️ Exam Overview

- **Format**: 20 multiple-choice questions
- **Time Limit**: 30 minutes
- **Focus Areas**: GPU hardware, server architectures, network topologies, and storage basics
- **Target Audience**: Engineers new to AI infrastructure and operations
- **Passing Score**: 70% (14 out of 20 correct)

---

## 🛠️ Key Topics Covered

### 🔲 GPU Hardware Fundamentals
- Understanding NVIDIA GPU models (A100, H100, V100)
- GPU memory types (HBM2e, HBM3) and capacity
- NVLink and NVSwitch interconnects
- Thermal design power (TDP) and cooling requirements

### 🖥️ Server and Rack Architecture
- DGX systems (DGX A100, DGX H100)
- Standard rack configurations (42U, 48U)
- Power distribution units (PDUs) and redundant power supplies
- Cable management and airflow considerations

### 🌐 Networking Essentials
- InfiniBand vs. Ethernet for AI workloads
- Network interface cards (NICs) and smartNICs
- Topologies: Fat-tree, Dragonfly, and Torus
- Latency and bandwidth requirements for distributed training

### 💾 Storage Concepts
- NVMe vs. SATA SSDs
- Parallel file systems (Lustre, GPUDirect Storage)
- Storage tiers: hot, warm, cold
- Data ingestion pipelines

---

## 📊 Comparison Table: GPU Models for AI

| Feature | NVIDIA A100 | NVIDIA H100 | NVIDIA V100 |
|---------|-------------|-------------|-------------|
| **Architecture** | Ampere | Hopper | Volta |
| **Memory** | 40GB/80GB HBM2e | 80GB HBM3 | 16GB/32GB HBM2 |
| **Memory Bandwidth** | 2.0 TB/s | 3.35 TB/s | 900 GB/s |
| **NVLink Support** | Yes (600 GB/s) | Yes (900 GB/s) | Yes (300 GB/s) |
| **Typical Use Case** | General AI training | Large language models | Legacy AI workloads |
| **TDP** | 400W | 700W | 300W |

---

## 🕵️ Sample Exam Questions (With Explanations)

### Question 1
**Which GPU interconnect technology allows direct GPU-to-GPU communication without going through the CPU?**

- **A)** PCIe Gen 4
- **B)** NVLink
- **C)** Ethernet
- **D)** SATA

**✅ Correct Answer: B) NVLink**

*Explanation*: NVLink is NVIDIA's high-speed direct GPU-to-GPU interconnect. It bypasses the CPU and PCIe bus, enabling faster data transfer between GPUs — critical for multi-GPU training.

---

### Question 2
**In a standard 42U rack, how many DGX H100 systems can typically be installed when accounting for power and cooling constraints?**

- **A)** 8
- **B)** 4
- **C)** 16
- **D)** 2

**✅ Correct Answer: B) 4**

*Explanation*: Each DGX H100 system occupies approximately 6U of rack space and requires significant power (up to 10.2 kW). With power and cooling limits, most data centers can safely install 4 DGX H100 systems per 42U rack.

---

### Question 3
**Which network topology is most commonly used in large-scale AI clusters for its fault tolerance and scalability?**

- **A)** Star topology
- **B)** Bus topology
- **C)** Fat-tree topology
- **D)** Ring topology

**✅ Correct Answer: C) Fat-tree topology**

*Explanation*: Fat-tree topology provides multiple redundant paths between nodes, high bisection bandwidth, and scales well for distributed AI training. It's the preferred choice for clusters using InfiniBand or high-speed Ethernet.

---

## 📋 Study Tips for New Engineers

- **Focus on hardware specifications**: Memorize key specs for A100, H100, and V100 GPUs — memory size, bandwidth, and interconnect type.
- **Understand networking basics**: Know the difference between InfiniBand (low latency, RDMA) and Ethernet (general purpose, higher latency).
- **Practice with rack layouts**: Visualize how GPUs, CPUs, NICs, and storage fit into a standard rack.
- **Review power and cooling**: AI infrastructure generates significant heat — understand TDP and airflow requirements.
- **Use NVIDIA documentation**: The official NVIDIA DGX and GPU datasheets are your best friends.

---

## ✅ Final Checklist Before the Exam

- [ ] I can name three NVIDIA GPU models and their memory capacities.
- [ ] I understand the role of NVLink in multi-GPU communication.
- [ ] I can explain the difference between InfiniBand and Ethernet.
- [ ] I know what a fat-tree topology looks like.
- [ ] I can calculate basic power requirements for a DGX system.
- [ ] I am familiar with NVMe and GPUDirect Storage concepts.

---

## 🚀 Next Steps

After completing this mock exam, review your incorrect answers and revisit the corresponding topics. Then move on to **Mock Exam 2** (Intermediate focus — software, orchestration, and monitoring) to build on this foundation.

Good luck, and remember — AI infrastructure is about connecting the right hardware with the right network to make GPUs work efficiently together. You've got this!