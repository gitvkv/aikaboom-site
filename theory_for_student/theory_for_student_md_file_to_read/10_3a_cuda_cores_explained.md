# 10.3a What CUDA cores actually are: integer, FP32, and FP64 execution units

#### 🏷️ The Nvidia GPU Architecture — The Silicon at the Heart of AI Infrastructure > 10 GPU Microarchitecture — Inside an NVIDIA Data Center GPU > 10.3 CUDA Cores — General-Purpose Parallel Compute

When you hear about NVIDIA GPUs powering AI workloads, the term "CUDA core" comes up constantly. But what exactly is a CUDA core? It's not a physical core like a CPU core — it's a streamlined execution unit designed for parallel math. This section breaks down the three main types of CUDA core execution units: integer, FP32, and FP64.

---

## 🧠 Context: Why CUDA cores matter for AI

Modern AI workloads (training neural networks, running inference) rely heavily on massive parallel computations. CUDA cores are the tiny workers inside a GPU that perform these calculations simultaneously. Understanding the differences between integer, FP32, and FP64 execution units helps you choose the right GPU for your workload and optimize performance.

---

## ⚙️ What is a CUDA core?

- A CUDA core is a **single execution unit** inside an NVIDIA GPU's Streaming Multiprocessor (SM).
- It performs one arithmetic operation per clock cycle (in ideal conditions).
- Each SM contains hundreds of CUDA cores, and a modern data center GPU may have thousands.
- CUDA cores are **not** full processors — they are specialized for math operations.

---

## 📊 The three types of CUDA core execution units

### 🧮 Integer Execution Units (INT)

- Perform **integer arithmetic** (whole numbers, no decimals).
- Used for: address calculations, loop counters, indexing, and some data preprocessing.
- **Precision**: Exact (no rounding errors).
- **Speed**: Very fast, but less common in AI training.
- **Typical use**: Data loading, memory addressing, and control flow in kernels.

### 🔢 FP32 Execution Units (Single Precision)

- Perform **32-bit floating-point** arithmetic (numbers with decimals).
- Used for: most AI training and inference (especially older models).
- **Precision**: ~7 decimal digits of accuracy.
- **Speed**: Standard speed for most GPU workloads.
- **Typical use**: Matrix multiplications, convolutions, and activation functions in deep learning.

### 🧪 FP64 Execution Units (Double Precision)

- Perform **64-bit floating-point** arithmetic (high-precision decimals).
- Used for: scientific simulations, weather modeling, and financial calculations.
- **Precision**: ~15-16 decimal digits of accuracy.
- **Speed**: Slower than FP32 (often 2x to 32x slower depending on GPU).
- **Typical use**: HPC (High-Performance Computing) where accuracy is critical.

---

## 🕵️ Comparison table: INT vs FP32 vs FP64

| Feature | Integer (INT) | FP32 (Single Precision) | FP64 (Double Precision) |
|---------|---------------|-------------------------|-------------------------|
| **Data type** | Whole numbers | 32-bit floating point | 64-bit floating point |
| **Decimal support** | No | Yes | Yes |
| **Precision** | Exact | ~7 digits | ~15-16 digits |
| **Speed** | Fastest | Fast | Slowest |
| **AI training use** | Rare (data prep) | Common | Rare (specialized) |
| **Scientific use** | Low | Moderate | High |
| **Example operation** | `a = b + c` (integers) | `a = b * 0.5f` | `a = b * 0.5` (double) |

---

## 🛠️ How engineers choose the right CUDA core type

- **For deep learning training**: FP32 is the standard. Newer GPUs also support mixed precision (FP16) for speed.
- **For inference**: INT8 or FP16 are often used for faster, lower-power execution.
- **For scientific HPC**: FP64 is essential for simulations requiring high accuracy.
- **For general GPU programming**: Use FP32 unless you specifically need integer or double precision.

---

## 🧪 Practical example: CUDA core usage in a kernel

Below is a simple CUDA kernel showing how different execution units are used. Note that the compiler automatically maps operations to the correct CUDA core type.

```cuda
// For reference: CUDA kernel example
__global__ void example_kernel(float *a, float *b, float *c, int *d) {
    int idx = threadIdx.x;          // Integer operation (INT core)
    float temp = a[idx] * b[idx];   // FP32 operation (FP32 core)
    c[idx] = temp + 1.0f;           // FP32 operation (FP32 core)
    d[idx] = (int)temp;             // Integer conversion (INT core)
}
```

📤 **Output**: The kernel uses INT cores for indexing and conversion, and FP32 cores for the multiplication and addition.

---

## 🧰 Key takeaways for new engineers

- **CUDA cores are not CPUs** — they are simple math units designed for parallelism.
- **FP32 cores** are the workhorses of AI training.
- **FP64 cores** are slower but necessary for scientific accuracy.
- **Integer cores** handle bookkeeping tasks like memory addressing.
- When selecting a GPU, check the **FP32 performance** for AI workloads, and **FP64 performance** for HPC.

---

## 📚 Summary

| CUDA Core Type | Best For | Speed vs FP32 |
|----------------|----------|---------------|
| Integer (INT) | Indexing, control logic | ~2x faster |
| FP32 | AI training, inference | Baseline (1x) |
| FP64 | Scientific simulations | ~2x to 32x slower |

Understanding these three execution unit types helps you write efficient GPU code and choose the right hardware for your AI infrastructure. As you progress, you'll learn how mixed precision (using FP16 and INT8) further optimizes modern AI workloads.