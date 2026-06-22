# 8.2a Arithmetic intensity: FLOPs per byte of memory accessed

#### 🏷️ The Mathematical Imperative — Why AI Demands Specialized Hardware > 8 The CPU-GPU Compute Divide — Why CPUs Cannot Scale for AI > 8.2 Roofline Model — Visualizing Compute vs. Memory Bottlenecks

---

## 🧭 Context Introduction

When you run an AI workload—like training a neural network or running inference—your hardware is doing two things simultaneously: **computing** (performing math operations) and **moving data** (reading/writing from memory). The ratio between these two activities is called **arithmetic intensity**. It answers a simple but powerful question: *For every byte of data I load from memory, how many floating-point operations (FLOPs) am I performing?*

Understanding arithmetic intensity helps you predict whether your workload will be **compute-bound** (limited by how fast the processor can crunch numbers) or **memory-bound** (limited by how fast data can be moved). This is the foundation of the Roofline Model, which we'll explore in later sections.

---

## ⚙️ What Is Arithmetic Intensity?

Arithmetic intensity is defined as:

**Arithmetic Intensity = Total FLOPs / Total Bytes of Memory Accessed**

- **FLOPs**: Floating-point operations (e.g., multiply, add, fused multiply-add)
- **Bytes of memory accessed**: Data read from and written to DRAM, HBM, or other memory

A higher arithmetic intensity means you are doing more computation per data load—which is generally good for performance. A lower arithmetic intensity means you are spending more time moving data than computing.

---

## 📊 Why Does Arithmetic Intensity Matter?

- **Determines bottleneck type**: Low arithmetic intensity → memory-bound. High arithmetic intensity → compute-bound.
- **Guides hardware selection**: GPUs with high memory bandwidth (like NVIDIA H100) excel at low-intensity workloads. CPUs with high clock speeds may handle high-intensity workloads better.
- **Optimizes kernel design**: Engineers can restructure algorithms to increase arithmetic intensity (e.g., fusing operations, using larger batch sizes).

---

## 🛠️ Real-World Examples

| Workload | Typical Arithmetic Intensity | Bottleneck |
|---|---|---|
| Vector addition (element-wise) | ~0.5 FLOPs/byte | Memory-bound |
| Matrix multiplication (large) | ~10–100 FLOPs/byte | Compute-bound |
| Convolution (small filters) | ~1–5 FLOPs/byte | Memory-bound |
| Transformer attention | ~2–10 FLOPs/byte | Mixed |

---

## 🕵️ How to Calculate Arithmetic Intensity

Let's walk through a simple example: **multiplying two matrices** of size **N x N**.

**Step 1: Count FLOPs**
- Each output element requires N multiplications and N-1 additions ≈ 2N FLOPs
- Total FLOPs = 2N³

**Step 2: Count bytes accessed**
- Two input matrices: 2 * N² elements
- One output matrix: N² elements
- Total elements = 3N²
- If each element is 4 bytes (float32): Total bytes = 3N² * 4 = 12N²

**Step 3: Compute arithmetic intensity**
- Arithmetic intensity = 2N³ / 12N² = N/6

For N=1024: Arithmetic intensity ≈ 170 FLOPs/byte → **Compute-bound**

---

## 🧪 Visualizing Arithmetic Intensity on the Roofline

The Roofline Model plots **performance (FLOPs/sec)** vs. **arithmetic intensity (FLOPs/byte)**. The "roof" is defined by:

- **Memory bandwidth ceiling** (slanted line): Performance limited by data movement
- **Compute ceiling** (flat line): Performance limited by processor speed

**Key insight**: 
- Workloads to the **left** of the ridge point are **memory-bound**
- Workloads to the **right** are **compute-bound**

---

## 🛠️ Practical Tips for Engineers

- **Profile your kernels**: Use tools like **NVIDIA Nsight Compute** or **nvprof** to measure actual FLOPs and memory traffic.
- **Increase arithmetic intensity**:
  - Fuse multiple small operations into one kernel
  - Use larger batch sizes
  - Prefetch data to shared memory (on GPUs)
- **Match workload to hardware**:
  - Low arithmetic intensity → high memory bandwidth GPU (e.g., H100, A100)
  - High arithmetic intensity → high compute throughput GPU or CPU

---

## ✅ Key Takeaways

- Arithmetic intensity = FLOPs per byte of memory accessed
- Low intensity → memory-bound; high intensity → compute-bound
- The Roofline Model uses arithmetic intensity to visualize performance limits
- Engineers can optimize AI workloads by increasing arithmetic intensity or choosing hardware that matches the bottleneck

---

## 📚 Further Reading

- NVIDIA Developer Blog: "Roofline Model for Deep Learning"
- NVIDIA Nsight Compute documentation
- "Performance Analysis of Deep Learning Workloads Using Roofline Model"