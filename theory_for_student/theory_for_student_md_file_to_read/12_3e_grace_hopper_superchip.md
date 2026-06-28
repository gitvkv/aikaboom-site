# 12.3e GH200 Grace Hopper Superchip: CPU+GPU unified memory via NVLink-C2C

#### 🏷️ The Nvidia GPU Architecture — The Silicon at the Heart of AI Infrastructure > 12 NVIDIA GPU Generations & Form Factors > 12.3 The NVIDIA Product Portfolio for Data Centers

---

## 🧠 Context Introduction

The GH200 Grace Hopper Superchip represents a fundamental shift in how CPUs and GPUs work together. Traditionally, a CPU and GPU communicate over a PCIe bus, which creates a bottleneck — data must travel back and forth, and memory is kept separate. The GH200 changes this by physically combining a **Grace CPU** and a **Hopper GPU** into a single superchip, connected by a revolutionary high-speed link called **NVLink-C2C**. This allows the CPU and GPU to share a unified memory pool, dramatically reducing data movement and accelerating AI workloads.

For new engineers, think of it like this: instead of two coworkers passing notes across a room (PCIe), they now share a single notebook they can both write in simultaneously (unified memory).

---

## ⚙️ What is the GH200 Grace Hopper Superchip?

The GH200 is not just a GPU or a CPU — it is a **complete system-on-a-chip** that integrates:

- **Grace CPU** — an ARM-based processor designed by NVIDIA for high-performance computing
- **Hopper GPU** — the H100 GPU architecture, optimized for AI training and inference
- **NVLink-C2C** — a custom, high-bandwidth, low-latency interconnect that bonds the CPU and GPU

Key characteristics:

- **Unified memory pool**: The CPU and GPU share the same physical memory (up to 480GB of LPDDR5X memory for the CPU + 96GB of HBM3 for the GPU, accessible by both)
- **Bandwidth**: NVLink-C2C provides **900 GB/s** of bidirectional bandwidth between CPU and GPU — over 7x faster than PCIe Gen5
- **Coherency**: The memory is cache-coherent, meaning both processors see the same data without needing to manually copy it

---

## 🛠️ How NVLink-C2C Works

NVLink-C2C is the secret sauce. It is a **chip-to-chip interconnect** that connects the Grace CPU and Hopper GPU directly, bypassing traditional PCIe lanes.

| Feature | Traditional PCIe Gen5 | NVLink-C2C |
|---------|----------------------|------------|
| Bandwidth (bidirectional) | 128 GB/s | 900 GB/s |
| Latency | ~1 microsecond | ~100 nanoseconds |
| Memory model | Separate (CPU and GPU have distinct memory) | Unified (shared memory pool) |
| Data transfer | Requires explicit copy (e.g., cudaMemcpy) | Automatic via cache coherence |
| Power efficiency | Higher overhead | Lower power per bit transferred |

**How it works in practice:**

- When the CPU writes data to a memory address, the GPU can read it instantly without a copy operation
- The NVLink-C2C controller manages cache coherency, ensuring both processors see the latest version of data
- This eliminates the "PCIe bottleneck" that often limits AI workload performance

---

### 📊 Visual Representation: GH200 Grace Hopper Superchip Interconnect
This diagram displays the GH200 Grace Hopper Superchip, showing how the Grace CPU and Hopper GPU are connected via a bidirectional NVLink-C2C bus.

```mermaid
flowchart LR
    Grace["Grace CPU (LPDDR5X)"] -->|"NVLink-C2C (900 GB/s)"| Hopper["Hopper GPU (HBM3)"]
    Hopper -->|Unified memory coherency| Grace

    classDef cpu fill:#eafaf1,stroke:#76b900,stroke-width:2px,rx:6px,ry:6px;
    classDef memory fill:#f0f7ff,stroke:#3498db,stroke-width:1.5px,rx:4px,ry:4px;
    classDef system fill:#f1f5f9,stroke:#64748b,stroke-width:1.5px;

    class Hopper cpu;
    class Grace memory;
```

## 📊 Why This Matters for AI Workloads

AI training and inference involve massive data movement. With traditional architectures, engineers spend significant time optimizing data transfers between CPU and GPU memory. The GH200 eliminates this overhead.

**Real-world benefits:**

- **Faster training**: Large language models (LLMs) and recommendation systems see 2-3x speedups because data doesn't need to be copied back and forth
- **Simpler code**: Engineers no longer need to manually manage memory transfers — the unified memory model handles it automatically
- **Larger models**: The combined memory pool (up to ~576GB total) allows running models that would otherwise exceed GPU-only memory
- **Lower power**: Less data movement means less energy consumption per training run

---

## 🕵️ Key Technical Details for New Engineers

Here are the essential facts you need to know:

- **The GH200 is a single physical package**: The Grace CPU and Hopper GPU are on the same module, connected by NVLink-C2C. It is not two separate chips on a board.
- **NVLink-C2C is not NVLink**: NVLink connects multiple GPUs together. NVLink-C2C is specifically for CPU-to-GPU connection within the superchip.
- **Memory is physically separate but logically unified**: The CPU has its own LPDDR5X memory, and the GPU has its own HBM3 memory. NVLink-C2C makes them appear as one pool to the programmer.
- **It supports NVIDIA's Grace Hopper architecture**: This is the foundation for NVIDIA's next-generation DGX systems and HGX baseboards.

**Example of how memory access works:**

For reference:
```
// Traditional approach (PCIe) — requires explicit copy
cpu_data = malloc(size);
gpu_data = cudaMalloc(size);
cudaMemcpy(gpu_data, cpu_data, size, cudaMemcpyHostToDevice);
// Now GPU can use gpu_data

// GH200 approach (unified memory) — no copy needed
unified_data = cudaMallocManaged(size);
// Both CPU and GPU can access unified_data directly
```

📤 **Output**: The GH200 version requires fewer lines of code and eliminates the performance cost of the copy operation.

---

## 🧩 Where Does the GH200 Fit in the NVIDIA Portfolio?

The GH200 sits at the top of NVIDIA's data center product line for AI workloads:

- **H100 SXM**: Traditional GPU-only card, requires separate CPU server
- **H100 PCIe**: Lower-power GPU card for existing servers
- **GH200 Grace Hopper**: Integrated CPU+GPU superchip for maximum performance and efficiency
- **DGX GH200**: A full system with multiple GH200 superchips connected via NVLink

The GH200 is designed for:
- Large-scale AI training (LLMs, diffusion models)
- High-performance computing (HPC) simulations
- Real-time AI inference at scale
- Memory-bound workloads that don't fit in GPU-only memory

---

## ✅ Summary for New Engineers

| Concept | Takeaway |
|---------|----------|
| GH200 | A single superchip combining a Grace CPU and Hopper GPU |
| NVLink-C2C | The high-speed interconnect that bonds them (900 GB/s) |
| Unified memory | CPU and GPU share memory — no manual data copying |
| Benefit | Faster AI training, simpler code, larger model support |
| Use case | Data centers running large-scale AI and HPC workloads |

**Remember**: The GH200 is not just "a faster GPU" — it is a fundamentally new architecture that redefines how CPUs and GPUs collaborate. For engineers entering AI infrastructure, understanding this unified memory model is critical because it changes how you design, deploy, and optimize AI systems.