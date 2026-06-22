# 30.3d nccl-tests: validating collective communication performance across all GPUs

#### 🏷️ The Virtualization and Cloud — Extending AI Infrastructure Beyond Bare Metal > 30 GPU Diagnostics and nvidia-smi Mastery > 30.3 GPU Benchmarking and Validation Tools

---

## 🌐 Context Introduction

When you're working with multiple GPUs in a system—whether for training large AI models or running distributed inference—the GPUs need to talk to each other quickly and reliably. This communication happens through a technology called **NVIDIA Collective Communications Library (NCCL)**. The **nccl-tests** suite is a set of benchmarking tools that helps you validate whether all GPUs in your system are communicating efficiently. Think of it as a "speed test" for your GPU-to-GPU connections.

For a new engineer, understanding how well your GPUs communicate is critical because slow or broken communication can cripple AI workloads, even if each individual GPU is perfectly healthy.

---

## ⚙️ What Are nccl-tests?

**nccl-tests** are small programs that run specific communication patterns (called "collective operations") across all GPUs in a system. These patterns include:

- **AllReduce** — Each GPU contributes data, and all GPUs receive the final combined result (like summing numbers from every GPU).
- **AllGather** — Each GPU shares its data with every other GPU.
- **Broadcast** — One GPU sends data to all other GPUs.
- **ReduceScatter** — Combines data from all GPUs and distributes parts back to each GPU.

The tests measure two key metrics:
- **Bandwidth** — How much data can be transferred per second (like the width of a pipe).
- **Latency** — How long it takes for a single message to travel (like the delay in a phone call).

---

## 🛠️ How nccl-tests Work

The nccl-tests suite runs a series of benchmarks that automatically detect all available GPUs in your system. Here's the general flow:

1. **Discovery** — The tool identifies how many GPUs are present and their topology (how they're connected via NVLink, PCIe, or network).
2. **Communication Pattern** — You select which collective operation to test (e.g., AllReduce).
3. **Data Size Sweep** — The test runs with different message sizes, from tiny (like 1 byte) to huge (like 256 MB or more).
4. **Measurement** — For each size, the tool records bandwidth and latency.
5. **Validation** — The test checks that all GPUs produced the correct result (data integrity).

---

## 📊 Key Metrics to Understand

| Metric | What It Measures | Why It Matters |
|--------|------------------|----------------|
| **Bus Bandwidth** | Actual data transfer rate per GPU (GB/s) | Higher is better for fast training |
| **Algo Bandwidth** | Effective throughput including overhead | Shows real-world performance |
| **Time** | Duration of each operation (microseconds) | Lower is better for quick synchronization |
| **Size** | Amount of data transferred (bytes) | Tests performance across small to large messages |
| **Count** | Number of elements per GPU | Helps validate data integrity |

---

## 🕵️ Interpreting nccl-tests Results

When you run nccl-tests, you'll see output that looks like this (but remember, we're not using code blocks for this):

**For reference:**
```
# nThreads:1 nGpus:4 minBytes:8 maxBytes:1073741824 step:2(factor)
```

**📤 Output:** A table with columns for Size, Time, AlgoBandwidth, and BusBandwidth.

Here's how to read the results:

- **Size column** — Shows the message size in bytes (e.g., 8, 16, 32, ... up to 1 GB).
- **Time column** — The time taken for that operation in microseconds (µs). Lower is better.
- **AlgoBandwidth** — The effective bandwidth in GB/s. Higher is better.
- **BusBandwidth** — The raw hardware bandwidth in GB/s. This should be close to your GPU interconnect's theoretical maximum.

**Red flags to watch for:**
- Bandwidth drops significantly for large message sizes (could indicate a bottleneck).
- One GPU shows much lower bandwidth than others (could indicate a faulty NVLink cable or PCIe slot).
- The test fails with an error (could indicate a driver issue, NCCL version mismatch, or hardware problem).

---

## ✅ When to Run nccl-tests

As a new engineer, you should run nccl-tests in these scenarios:

- **Initial system validation** — After setting up a new multi-GPU server, run nccl-tests to confirm all GPUs communicate properly.
- **After hardware changes** — If you add or replace GPUs, cables, or switches.
- **Performance troubleshooting** — When AI training jobs are slower than expected, nccl-tests can reveal if communication is the bottleneck.
- **Driver or NCCL updates** — After updating NVIDIA drivers or the NCCL library, run tests to ensure nothing broke.
- **Regular health checks** — Schedule periodic runs (e.g., weekly) to catch gradual performance degradation.

---

## 📈 Common Performance Targets (Example Values)

These are rough guidelines for modern systems with 4 or 8 GPUs connected via NVLink:

| GPU Interconnect | Expected BusBandwidth (GB/s) | Typical Latency (µs) |
|------------------|------------------------------|----------------------|
| NVLink 3.0 (4 GPUs) | 300–600 GB/s | 5–20 µs |
| NVLink 4.0 (8 GPUs) | 600–900 GB/s | 3–15 µs |
| PCIe Gen4 x16 | 25–32 GB/s | 10–50 µs |
| InfiniBand (network) | 12–25 GB/s | 100–500 µs |

**Note:** Actual numbers depend on your specific hardware, driver version, and NCCL configuration.

---

## 🧩 Troubleshooting Common Issues

If nccl-tests show poor performance or errors, here's a quick checklist:

- **Check GPU topology** — Use **nvidia-smi topo -m** to see how GPUs are connected. Look for unexpected PCIe switches or non-NVLink connections.
- **Verify NCCL version** — Run **nccl-tests --version** to confirm you're using a recent, compatible version.
- **Check environment variables** — Variables like **NCCL_DEBUG=INFO** can reveal detailed logs about communication paths.
- **Inspect hardware** — Loose NVLink cables, dusty PCIe slots, or overheating GPUs can cause issues.
- **Test one GPU pair at a time** — If all GPUs fail, test just two GPUs to isolate the problem.

---

## 🔁 Summary

**nccl-tests** is your go-to tool for validating that all GPUs in your system can communicate efficiently. As an engineer new to AI infrastructure, mastering this tool helps you:

- Confirm your hardware is set up correctly.
- Identify performance bottlenecks before they impact AI workloads.
- Diagnose communication issues quickly when problems arise.
- Ensure your system is ready for distributed training or inference.

Remember: **Fast GPUs are useless if they can't talk to each other.** nccl-tests gives you the confidence that your multi-GPU system is performing at its best.

---

*Next in this series: 30.3e — GPU stress testing with gpu-burn and cuda-samples*