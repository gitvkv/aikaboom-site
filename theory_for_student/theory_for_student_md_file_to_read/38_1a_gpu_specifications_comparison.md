# 38.1a GPU Specifications Comparison Table: V100 → A100 → H100 → H200 → B200

#### 🏷️ The Exam Preparation & Certification Mastery > 38 Reference Appendices and Quick-Reference Guides > 38.1 Hardware Quick Reference

---

## 🧠 Context Introduction

As AI workloads grow in complexity, understanding the evolution of NVIDIA's data center GPUs is essential for engineers planning, deploying, or optimizing AI infrastructure. This guide compares five key GPU generations—**V100, A100, H100, H200, and B200**—focusing on specifications that directly impact training, inference, and memory-bound operations. Use this as a quick reference to match the right GPU to your workload requirements.

---

## ⚙️ Key Specifications at a Glance

The table below highlights the most critical hardware differences across generations. Focus on **memory capacity, memory bandwidth, and Tensor Core performance** as these drive AI workload efficiency.

| Specification | V100 (Volta) | A100 (Ampere) | H100 (Hopper) | H200 (Hopper+) | B200 (Blackwell) |
|---|---|---|---|---|---|
| **GPU Architecture** | Volta | Ampere | Hopper | Hopper (Enhanced) | Blackwell |
| **Transistors** | 21.1B | 54.2B | 80B | 80B | 208B |
| **Memory Type** | HBM2 | HBM2e | HBM3 | HBM3e | HBM4 |
| **Memory Capacity** | 16 GB / 32 GB | 40 GB / 80 GB | 80 GB | 141 GB | 192 GB |
| **Memory Bandwidth** | 900 GB/s | 2.0 TB/s | 3.35 TB/s | 4.8 TB/s | 8.0 TB/s |
| **Tensor Cores (per GPU)** | 640 (Gen 1) | 432 (Gen 3) | 528 (Gen 4) | 528 (Gen 4) | 1,680 (Gen 5) |
| **FP32 (TFLOPS)** | 15.7 | 19.5 | 60 | 60 | 90 |
| **FP16/TF32 (TFLOPS)** | 125 (FP16) | 312 (TF32) | 989 (TF32) | 989 (TF32) | 2,250 (TF32) |
| **Interconnect (NVLink)** | NVLink 2.0 (300 GB/s) | NVLink 3.0 (600 GB/s) | NVLink 4.0 (900 GB/s) | NVLink 4.0 (900 GB/s) | NVLink 5.0 (1.8 TB/s) |
| **TDP (Thermal Design Power)** | 300W | 400W | 700W | 700W | 1,000W |

---

## 📊 Architecture Evolution Highlights

### 🟢 V100 (Volta) — The Foundation
- Introduced **Tensor Cores** for mixed-precision training.
- First GPU with **NVLink 2.0** for fast multi-GPU scaling.
- Best suited for early deep learning models (ResNet, BERT-base).

### 🔵 A100 (Ampere) — The Workhorse
- Added **Multi-Instance GPU (MIG)** for partitioning into up to 7 smaller GPUs.
- Support for **TF32** precision, simplifying mixed-precision workflows.
- Doubled memory bandwidth over V100, critical for large batch training.

### 🟣 H100 (Hopper) — The Transformer Engine
- Introduced **Transformer Engine** for automatic FP8 precision in transformer models.
- **NVLink 4.0** with 900 GB/s per GPU—ideal for large-scale model parallelism.
- 3x FP32 performance over A100 for general compute.

### 🟠 H200 (Hopper+) — The Memory Beast
- Same architecture as H100 but with **141 GB HBM3e** memory.
- **4.8 TB/s bandwidth**—perfect for memory-bound workloads like large language models (LLMs) with 70B+ parameters.
- No change in Tensor Core count or compute performance.

### 🔴 B200 (Blackwell) — The Next Leap
- **208 billion transistors**—largest GPU ever built.
- **1,680 Gen 5 Tensor Cores** with support for **FP4** precision.
- **8 TB/s memory bandwidth** enables training of trillion-parameter models.
- NVLink 5.0 doubles inter-GPU bandwidth to 1.8 TB/s.

---

## 🛠️ When to Choose Which GPU

- **V100**: Budget-friendly option for inference or small-scale training (models under 10B parameters).
- **A100**: Best all-rounder for mixed workloads (training + inference) with MIG flexibility.
- **H100**: Ideal for large transformer models (GPT-3, LLaMA-2) where compute is the bottleneck.
- **H200**: Choose when memory capacity or bandwidth is the limiting factor (e.g., long-context LLMs).
- **B200**: Reserved for cutting-edge research or production systems requiring maximum compute and memory.

---

## 🕵️ Practical Considerations for Engineers

- **Power and Cooling**: H100, H200, and B200 require liquid cooling in dense clusters. V100 and A100 can run on air cooling.
- **Interconnect Planning**: For multi-GPU training, ensure your server supports the required NVLink generation. Mixing GPU generations on the same NVSwitch fabric is not supported.
- **Memory Bandwidth vs. Capacity**: H200's 4.8 TB/s bandwidth is 43% higher than H100, but compute performance is identical. Use H200 for inference on large models where memory access dominates latency.
- **Precision Support**: B200's FP4 support can reduce memory usage by 75% compared to FP16, but requires model quantization. Not all frameworks support FP4 yet.

---

## 📚 Quick Reference Summary

For the **NVIDIA-Certified Associate: AI Infrastructure and Operations** exam, focus on these three takeaways:

1. **Memory bandwidth** scales faster than compute across generations—H200 and B200 are bandwidth monsters.
2. **Tensor Core generations** determine mixed-precision efficiency—Gen 5 (B200) is 2.5x faster than Gen 4 (H100/H200).
3. **NVLink bandwidth** doubles every two generations—critical for scaling beyond 4 GPUs.

Use this table to quickly identify which GPU fits your workload's bottleneck: compute-bound (H100), memory-bound (H200), or both (B200).