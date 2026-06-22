# 28.1a GPU utilization on inference workloads: often 10–30% of peak throughput

#### 🏷️ The Cluster Orchestration — Managing the GPU Fleet at Scale > 28 Advanced GPU Resource Management — MIG, MPS, and Time-Slicing > 28.1 The Wasted Compute Problem — Why One Job per GPU Is Inefficient

## 📘 Context Introduction

When you deploy a machine learning model for inference (making predictions on new data), you might expect the GPU to run at full speed. However, in real-world production environments, inference workloads typically use only **10–30% of the GPU's maximum compute capacity**. This is known as the **wasted compute problem** — a critical concept for engineers managing AI infrastructure.

Understanding why this happens helps you design more efficient systems and avoid over-provisioning expensive GPU resources.

---

## ⚙️ Why Inference Workloads Underutilize GPUs

Unlike training (which processes large batches of data continuously), inference workloads have different characteristics that lead to low utilization:

- **Small batch sizes** — Many inference requests arrive one at a time (e.g., a single image or text prompt), so the GPU processes tiny batches instead of filling its memory.
- **Memory-bound operations** — Inference often spends more time moving data between GPU memory and compute units than actually computing.
- **Latency requirements** — Real-time applications (like chatbots or recommendation engines) need fast responses, so you cannot wait to accumulate large batches.
- **Model size vs. compute** — A model may be small enough that the GPU finishes processing in microseconds, then sits idle waiting for the next request.

---

## 📊 Typical GPU Utilization Breakdown for Inference

| Workload Type | GPU Utilization (% of peak) | Reason |
|---------------|-----------------------------|--------|
| Batch training | 80–95% | Large batches keep compute units busy |
| Online inference (single request) | 10–30% | Small batches, memory-bound, low latency |
| Batch inference (queued requests) | 40–70% | Larger batches possible, but still limited |
| Real-time streaming inference | 5–20% | Strict latency limits prevent batching |

---

## 🕵️ The Real-World Impact

Low GPU utilization has several consequences for your infrastructure:

- **Wasted hardware cost** — You pay for 100% of the GPU but only use 10–30% of its capability.
- **Inefficient cluster scaling** — You might need more GPUs than necessary to handle the same request volume.
- **Higher energy per prediction** — The GPU draws near-full power even when underutilized.
- **Opportunity cost** — The same GPU could serve multiple models or handle other workloads simultaneously.

---

## 🛠️ How Engineers Address This Problem

To improve GPU utilization on inference workloads, engineers use several techniques:

- **Batching requests** — Collect multiple inference requests over a short time window and process them together.
- **Model optimization** — Use techniques like quantization (reducing precision) or pruning to make models smaller and faster.
- **Multi-model serving** — Run multiple models on the same GPU using frameworks like NVIDIA Triton Inference Server.
- **GPU sharing technologies** — Use MIG (Multi-Instance GPU), MPS (Multi-Process Service), or time-slicing to partition the GPU.
- **Dynamic batching** — Automatically adjust batch size based on incoming request rate and latency targets.

---

## ✅ Key Takeaways for New Engineers

- **Expect low utilization** — 10–30% is normal for single-request inference, not a sign of misconfiguration.
- **Measure before optimizing** — Use tools like **nvidia-smi** or **NVIDIA DCGM** to check actual utilization.
- **Batch when possible** — Even small batches (2–4 requests) can double or triple utilization.
- **Consider GPU sharing** — MIG and time-slicing let you run multiple inference workloads on one GPU.
- **Monitor latency** — Improving utilization should not break your service-level agreements (SLAs) for response time.

---

## 🔍 Example: Measuring GPU Utilization for Inference

To see this in practice, you can monitor a GPU serving inference requests. The output from monitoring tools typically shows:

- **GPU-Util** — The percentage of time the GPU compute units were busy (often 10–30% for inference).
- **Memory-Util** — The percentage of GPU memory bandwidth used (often higher than compute utilization).
- **Power Draw** — The actual power consumption compared to the maximum rated power.

For reference, a typical monitoring command might look like:

```
nvidia-smi --query-gpu=utilization.gpu,utilization.memory,power.draw --format=csv -l 1
```

📤 **Output:**  
`utilization.gpu [%], utilization.memory [%], power.draw [W]`  
`12 %, 45 %, 85.23 W`  
`15 %, 50 %, 92.10 W`  
`8 %, 38 %, 72.45 W`

Notice the **GPU utilization** stays low (8–15%) while **memory utilization** is higher (38–50%) — this is the classic inference pattern.

---

## 📚 Summary

The 10–30% GPU utilization on inference workloads is not a bug — it is a fundamental characteristic of how inference works. As an engineer managing AI infrastructure, your goal is not to force 100% utilization, but to **maximize throughput within latency constraints** while minimizing wasted compute. Understanding this concept is the first step toward building efficient, cost-effective inference systems at scale.