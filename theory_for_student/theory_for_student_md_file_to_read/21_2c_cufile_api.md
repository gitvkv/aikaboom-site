# 21.2c cuFile API: the GDS programming interface for AI frameworks

#### 🏷️ The AI Data Center Networking — Moving Petabytes Without Latency > 21 Accelerating the Storage Pipeline — GPUDirect Storage > 21.2 GPUDirect Storage (GDS) — Direct NVMe-to-GPU Transfers

## 📖 Context Introduction

In modern AI training and inference, data movement is often the bottleneck. Traditionally, data travels from storage (like NVMe SSDs) to CPU memory, then to GPU memory — a slow, multi-hop journey. **GPUDirect Storage (GDS)** changes this by allowing data to move directly from NVMe storage into GPU memory, bypassing the CPU entirely. The **cuFile API** is the programming interface that enables AI frameworks (like PyTorch, TensorFlow, or custom CUDA applications) to leverage GDS. This guide explains cuFile in simple terms for new engineers.

---

## ⚙️ What is the cuFile API?

The **cuFile API** is a set of C/C++ functions provided by NVIDIA that allows developers to read and write data directly between GPU memory and storage devices (NVMe SSDs) without involving CPU memory as an intermediary.

- **Purpose**: Eliminate the CPU as a middleman for data transfers.
- **Key Benefit**: Reduces latency and increases throughput for large datasets.
- **Use Case**: Ideal for AI workloads where massive datasets (e.g., images, video, text) are repeatedly loaded during training.

---

## 🛠️ How cuFile Works (Simplified)

1. **Register GPU Memory**: You tell cuFile which GPU memory buffer you want to use.
2. **Open a File**: You open a file on a GDS-compatible NVMe drive.
3. **Direct Transfer**: cuFile reads data from the file directly into the registered GPU memory (or writes from GPU memory to the file).
4. **No CPU Copy**: The CPU is not involved in moving the data — it only orchestrates the operation.

---

## 📊 cuFile vs. Traditional File I/O

| Feature | Traditional File I/O | cuFile API (GDS) |
|---------|----------------------|------------------|
| Data path | Storage → CPU RAM → GPU RAM | Storage → GPU RAM (direct) |
| CPU involvement | High (copies data) | Low (only orchestrates) |
| Latency | Higher (extra hops) | Lower (direct path) |
| Throughput | Limited by CPU memory bandwidth | Limited by NVMe and GPU bandwidth |
| Complexity | Simple (standard file APIs) | Moderate (requires GPU memory registration) |
| Best for | Small files, infrequent transfers | Large files, frequent transfers (AI training) |

---

## 🕵️ Key cuFile API Functions (Conceptual Overview)

The cuFile API provides a handful of core functions. Here’s what they do in plain language:

- **cuFileDriverOpen()** — Initializes the cuFile driver (done once at application start).
- **cuFileDriverClose()** — Shuts down the cuFile driver (done once at application end).
- **cuFileHandleRegister()** — Registers a file handle for GDS operations.
- **cuFileHandleDeregister()** — Unregisters a file handle.
- **cuFileBufRegister()** — Registers a GPU memory buffer for direct I/O.
- **cuFileBufDeregister()** — Unregisters a GPU memory buffer.
- **cuFileRead()** — Reads data from a file directly into registered GPU memory.
- **cuFileWrite()** — Writes data from registered GPU memory directly to a file.

---

## 🧩 Simple Workflow Example (No Code Block)

For reference, here is a typical sequence of steps for using cuFile in an AI framework:

1. Initialize the cuFile driver with **cuFileDriverOpen()**.
2. Open a file on an NVMe drive using standard **fopen()**.
3. Register the file handle with **cuFileHandleRegister()**.
4. Allocate GPU memory (e.g., with **cudaMalloc()**).
5. Register the GPU memory buffer with **cuFileBufRegister()**.
6. Call **cuFileRead()** to read data from the file directly into the GPU buffer.
7. Use the data in your GPU kernel or AI model.
8. When done, call **cuFileBufDeregister()** and **cuFileHandleDeregister()**.
9. Close the file and shut down the cuFile driver with **cuFileDriverClose()**.

📤 Output: Data is now in GPU memory without ever touching the CPU.

---

## 🔧 Integration with AI Frameworks

Most AI frameworks (like PyTorch and TensorFlow) do not expose cuFile directly to end users. Instead, they integrate it internally through custom data loaders or plugins.

- **PyTorch**: Uses cuFile via the **NVIDIA DALI** (Data Loading Library) or custom **CUDA Python** extensions.
- **TensorFlow**: Uses cuFile via **TensorFlow I/O** or custom ops.
- **Custom CUDA Applications**: Engineers can call cuFile functions directly in C/C++ code.

**Key Point**: As a new engineer, you typically don't need to write cuFile code yourself — you configure your framework to use GDS, and the framework handles the cuFile calls internally.

---

## ✅ Prerequisites for Using cuFile

- **Hardware**: NVIDIA GPU (Volta or newer), NVMe SSD, and a system with GDS support.
- **Software**: NVIDIA driver (R470+), CUDA Toolkit (11.4+), and the **nvidia-fs** kernel module.
- **Configuration**: The NVMe drive must be mounted with the **nvidia-fs** filesystem or use a GDS-compatible filesystem (e.g., XFS, ext4 with direct I/O).

---

## 🚀 Benefits for AI Engineers

- **Faster Training**: Reduces data loading time, especially for large datasets.
- **Higher GPU Utilization**: GPUs spend less time waiting for data.
- **Lower CPU Overhead**: Frees CPU cores for other tasks (e.g., preprocessing).
- **Scalability**: Works well with multi-GPU and multi-node setups.

---

## ⚠️ Common Pitfalls for New Engineers

- **Not all storage is GDS-compatible**: Only NVMe drives with proper drivers work.
- **Memory registration overhead**: Registering GPU buffers has a cost — reuse buffers when possible.
- **File alignment**: cuFile requires file offsets and buffer sizes to be aligned to 4KB boundaries.
- **Error handling**: Always check return codes from cuFile functions (they return error codes like **CUDA_ERROR_INVALID_VALUE**).

---

## 📚 Summary

The **cuFile API** is the programming interface for **GPUDirect Storage (GDS)** , enabling direct data transfers between NVMe storage and GPU memory. It eliminates CPU bottlenecks, reduces latency, and boosts throughput for AI workloads. While you may not write cuFile code directly, understanding its role helps you configure AI frameworks for optimal performance.

**Next Step**: Check if your system supports GDS by running **nvidia-smi topo -m** and looking for "NV" links between GPUs and NVMe drives. If supported, explore your AI framework's GDS documentation to enable it.