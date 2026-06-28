# 28.3c Limitations: single CUDA execution context = single fault domain

#### 🏷️ The Cluster Orchestration — Managing the GPU Fleet at Scale > 28 Advanced GPU Resource Management — MIG, MPS, and Time-Slicing > 28.3 Multi-Process Service (MPS) — Concurrent GPU Compute

---

## 🔍 Context Introduction

When engineers begin working with NVIDIA Multi-Process Service (MPS), they often focus on its benefits — better GPU utilization, reduced overhead, and concurrent kernel execution. However, a critical limitation exists that every engineer must understand: **a single CUDA execution context represents a single fault domain**. This means that if one application or process within an MPS client group crashes or encounters an error, it can bring down the entire MPS server and all other clients sharing that context. This section explains why this happens and what it means for your AI infrastructure.

---

## ⚙️ What Is a CUDA Execution Context?

- A **CUDA execution context** is the environment created when a CUDA application initializes (e.g., calling `cudaSetDevice()` or `cudaMalloc()`).
- It includes:
  - Device memory allocations
  - Streams and events
  - Kernel launch queues
  - Hardware state (registers, shared memory, etc.)
- In MPS, **all connected clients share a single CUDA context** managed by the MPS server daemon.

---

## 🛠️ The Single Fault Domain Problem

- **Definition**: A fault domain is the boundary within which a failure (crash, hang, or error) can affect other processes.
- In MPS, because all clients operate under **one CUDA context**, any client that causes:
  - An illegal memory access
  - A kernel timeout (e.g., TDR — Timeout Detection and Recovery)
  - A driver-level error
  - A GPU hang

...can corrupt or crash the shared context, affecting **all other clients** connected to that MPS server.

---


### 📊 Visual Representation: MPS Shared Context Crash Propagation
This flowchart demonstrates how a memory access crash in one client process can propagate and terminate all other clients in the shared context.

```mermaid
flowchart LR
    Client1["Client 1 (Memory fault / SegFault)"] -->|Shared context crash| MPSDaemon["MPS Control Server"]
    MPSDaemon -->|Force teardown| Client2["Client 2 (Terminated / Lost computation)"]

    classDef cpu fill:#eafaf1,stroke:#76b900,stroke-width:2px,rx:6px,ry:6px;
    classDef memory fill:#f0f7ff,stroke:#3498db,stroke-width:1.5px,rx:4px,ry:4px;
    classDef system fill:#f1f5f9,stroke:#64748b,stroke-width:1.5px;

    class MPSDaemon cpu;
    class Client1,Client2 memory;
```


## 📊 Comparison: MPS vs. Separate Contexts

| Feature | MPS (Single Context) | Separate CUDA Contexts (No MPS) |
|---------|----------------------|----------------------------------|
| Fault isolation | ❌ **None** — one client crash can take down all clients | ✅ **Full isolation** — each client has its own context |
| Resource sharing | ✅ High — memory, streams, and kernels shared | ❌ Low — each context has separate resources |
| Overhead | ✅ Low — single context reduces driver overhead | ❌ Higher — multiple contexts increase overhead |
| Error recovery | ❌ Complex — requires restarting entire MPS server | ✅ Simple — only the failed process needs restart |
| Use case | ✅ Best for trusted, homogeneous workloads | ✅ Best for multi-tenant or untrusted workloads |

---

## 🕵️ Real-World Example of the Limitation

Imagine you have three AI training jobs running under one MPS server:

- **Job A**: Training a large language model
- **Job B**: Running inference on a smaller model
- **Job C**: Data preprocessing using CUDA

If **Job B** encounters a memory corruption bug and triggers a GPU driver reset, the **entire MPS server** will crash. This means:
- Job A loses hours of training progress (unless checkpointed)
- Job C's preprocessing pipeline fails
- All three jobs must be restarted after the MPS server is relaunched

---

## 🧠 Key Takeaways for Engineers

- **MPS is not suitable for fault-tolerant or multi-tenant environments** where process isolation is critical.
- Always consider using **MIG (Multi-Instance GPU)** or **time-slicing** when fault isolation is a requirement.
- If you must use MPS with untrusted or experimental code, implement:
  - Frequent checkpointing
  - External monitoring (e.g., health checks on MPS server)
  - Automatic restart mechanisms for the MPS daemon
- For production AI pipelines, **prefer separate CUDA contexts** (no MPS) or **MIG partitions** to guarantee that one failing job does not impact others.

---

## 📌 Summary

| Aspect | Detail |
|--------|--------|
| **Limitation** | Single CUDA execution context = single fault domain |
| **Impact** | One client crash can kill all clients sharing the MPS server |
| **Root cause** | MPS clients share a unified CUDA context managed by the MPS daemon |
| **Mitigation** | Use MIG, time-slicing, or separate contexts for fault isolation |
| **Best practice** | Reserve MPS for trusted, homogeneous workloads with checkpointing |

---

> **Remember**: MPS trades fault isolation for performance and resource sharing. As an engineer, understanding this trade-off is essential to designing robust AI infrastructure at scale.