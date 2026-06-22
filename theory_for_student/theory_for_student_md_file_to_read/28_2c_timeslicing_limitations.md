# 28.2c Limitations: no memory isolation, no fault isolation, no QoS guarantees

#### 🏷️ The Cluster Orchestration — Managing the GPU Fleet at Scale > 28 Advanced GPU Resource Management — MIG, MPS, and Time-Slicing > 28.2 Time-Slicing — Temporal GPU Sharing

---

## 📘 Context Introduction

Time-slicing is a GPU sharing technique where multiple workloads take turns using the same GPU over very short time intervals (typically milliseconds). While this approach is simple to configure and allows many users to share a single GPU, it comes with three significant limitations that engineers must understand before deploying it in production environments.

Unlike Multi-Instance GPU (MIG), which provides hardware-level partitioning, time-slicing operates purely at the software scheduler level. This means it lacks critical guarantees that are essential for predictable, secure, and reliable AI workloads.

---

## ⚙️ Limitation 1: No Memory Isolation

**What it means:** When using time-slicing, all workloads sharing the GPU have access to the same GPU memory (VRAM). There is no hardware barrier preventing one workload from consuming all available memory.

**Key consequences:**
- A single runaway process can consume all GPU memory, causing other workloads to fail with out-of-memory (OOM) errors
- Memory usage is not capped per workload — any job can grow to fill the entire VRAM
- There is no way to guarantee that a critical inference job will have enough memory available when needed
- Debugging memory conflicts becomes difficult because the issue appears as a global GPU failure rather than a per-workload problem

**Real-world impact:** If you run a large training job alongside a real-time inference service using time-slicing, the training job could allocate all available memory, causing the inference service to crash unexpectedly.

---

## 🛡️ Limitation 2: No Fault Isolation

**What it means:** A crash or error in one workload can affect or bring down all other workloads sharing the same GPU through time-slicing.

**Key consequences:**
- If one workload triggers a GPU reset (e.g., due to a driver crash or illegal memory access), all workloads on that GPU are terminated
- A misbehaving workload can corrupt shared GPU state, leading to incorrect results for other workloads
- There is no hardware boundary to contain errors — faults propagate across all time-sliced jobs
- Recovery requires restarting all workloads, not just the failed one

**Real-world impact:** A buggy training script that causes a GPU exception will kill not only that training job but also any other inference or development workloads sharing the same GPU.

---

## 📊 Limitation 3: No QoS Guarantees

**What it means:** Quality of Service (QoS) guarantees — such as minimum compute time, maximum latency, or predictable throughput — are not possible with time-slicing.

**Key consequences:**
- Workloads compete for GPU time without any priority mechanism
- A compute-heavy job can starve other workloads of GPU cycles
- Latency for inference workloads becomes unpredictable because they must wait for other jobs to finish their time slices
- There is no way to reserve a specific percentage of GPU compute for critical workloads
- Performance varies based on the number and type of concurrent workloads

**Real-world impact:** A real-time video processing pipeline might experience frame drops or delays because a batch training job is consuming most of the GPU time slices.

---

## 🕵️ Comparison Table: Time-Slicing vs. MIG

| Feature | Time-Slicing | MIG (Multi-Instance GPU) |
|---------|--------------|--------------------------|
| Memory isolation | ❌ No — shared VRAM | ✅ Yes — dedicated memory per partition |
| Fault isolation | ❌ No — one crash affects all | ✅ Yes — hardware-level isolation |
| QoS guarantees | ❌ No — best-effort scheduling | ✅ Yes — guaranteed compute and memory |
| Configuration complexity | Low — simple to enable | High — requires partition setup |
| GPU support | All modern NVIDIA GPUs | A100, H100, and newer data center GPUs |

---

## 🛠️ When to Use Time-Slicing Despite These Limitations

Time-slicing is still useful in specific scenarios where its limitations are acceptable:

- **Development and testing environments** where workloads are non-critical and can tolerate interruptions
- **Low-utilization clusters** where GPU contention is rare and workloads are small
- **Batch processing jobs** where completion time is not critical and occasional delays are acceptable
- **Prototyping** before moving to MIG or dedicated GPU allocation for production

---

## ✅ Summary for Engineers

| Limitation | What to Watch For | Mitigation Strategy |
|------------|-------------------|---------------------|
| No memory isolation | Unexpected OOM errors in shared workloads | Monitor GPU memory usage per process; set memory limits at the application level |
| No fault isolation | Cascading failures across workloads | Run critical workloads on dedicated GPUs or MIG partitions |
| No QoS guarantees | Unpredictable latency and throughput | Use MIG for production inference; reserve time-slicing for non-critical batch jobs |

**Key takeaway:** Time-slicing is a simple sharing mechanism but lacks the hardware-level guarantees needed for production AI workloads. For environments requiring predictable performance, security, and reliability, consider using MIG or dedicated GPU allocation instead.