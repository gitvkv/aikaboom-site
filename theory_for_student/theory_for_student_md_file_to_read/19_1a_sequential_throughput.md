# 19.1a Sequential throughput (MB/s): training dataset streaming — dominated by large reads

#### 🏷️ The AI Data Center Networking — Moving Petabytes Without Latency > 19 Enterprise Storage Architectures for AI > 19.1 Storage Performance Metrics — What Matters for AI

---

## 🧠 Context Introduction

When training an AI model, your GPU spends most of its time crunching numbers. But before it can compute, it needs data — lots of it. That data comes from storage, and the speed at which storage can feed data to the GPU is critical.

**Sequential throughput** measures how fast your storage system can read large, contiguous chunks of data. In AI training, this is the dominant pattern when you stream your training dataset: you read one large file (or a large chunk of a file) after another, without jumping around.

Think of it like a conveyor belt moving boxes. Sequential throughput is how many boxes per second the belt can deliver when the boxes are stacked in a single, unbroken line.

---

## ⚙️ Why Large Reads Dominate in Training Dataset Streaming

- **Training datasets are often stored as large files** (e.g., TFRecord, HDF5, or raw image archives). Each file can be hundreds of megabytes to gigabytes.
- **The GPU wants data in large batches** — typically 100 MB to several GB at a time.
- **Storage systems optimize for sequential access** because the read head (or flash controller) doesn't need to seek — it just keeps reading from where it left off.
- **Random reads (small, scattered I/O)** are much slower and are not the bottleneck during dataset streaming.

---

## 📊 Sequential Throughput vs. Other Metrics

| Metric | What It Measures | Why It Matters for AI |
|--------|------------------|-----------------------|
| **Sequential throughput (MB/s)** | Speed of reading large, contiguous data blocks | Dominates during dataset loading — feeds the GPU pipeline |
| **Random IOPS** | Number of small, random read/write operations per second | Important for metadata lookups or checkpointing, not for streaming |
| **Latency (ms)** | Time to complete a single I/O request | Critical for real-time inference, less so for bulk training |
| **Bandwidth (Gbps)** | Raw network or storage link speed | Upper limit for throughput — but real throughput is often lower |

---

## 🛠️ How to Measure Sequential Throughput

You can measure sequential throughput using standard Linux tools. The key is to read a large file (or a large portion of a file) in one continuous pass.

**For reference — example measurement command:**

```
dd if=/path/to/large/training/file of=/dev/null bs=1M count=1024
```

**📤 Output:**  
`1073741824 bytes (1.1 GB, 1.0 GiB) copied, 2.345 s, 458 MB/s`

- **bs=1M** means read in 1 MB chunks (large reads)
- **count=1024** means read 1024 chunks (1 GB total)
- The output shows **458 MB/s** — that's your sequential throughput

> 💡 **Tip:** Always test with a file size that matches your typical training batch size. If your GPU consumes 2 GB per batch, test with a 2 GB file.

---

## 🕵️ What Affects Sequential Throughput in AI Infrastructure

- **Storage media type** — NVMe SSDs deliver 3–7 GB/s per drive; HDDs deliver 150–250 MB/s
- **RAID or JBOD configuration** — Striping across drives increases throughput linearly
- **Filesystem overhead** — Some filesystems (e.g., XFS, ext4) handle large sequential reads better than others
- **Network filesystem (NFS, GPFS, Lustre)** — Remote storage adds network latency; sequential throughput depends on network bandwidth
- **Data pipeline software** — Tools like NVIDIA DALI or PyTorch DataLoader can prefetch and cache, reducing the impact of storage speed

---

## ✅ Key Takeaways for New Engineers

- **Sequential throughput is the #1 metric for training dataset streaming.** If your storage can't deliver data fast enough, your GPU will stall.
- **Large reads (1 MB or bigger) are the norm** — never test with tiny block sizes (like 4 KB) when evaluating training performance.
- **Match your storage throughput to your GPU consumption rate.** For example, if your GPU processes 2 GB/s, your storage must deliver at least 2 GB/s sequential throughput.
- **Monitor this metric during training** — if you see GPU utilization drop below 90%, your storage throughput might be the bottleneck.

---

## 📈 Real-World Example

Imagine you have:
- 8x NVIDIA A100 GPUs, each consuming 1.5 GB/s of training data
- Total required throughput: **12 GB/s**
- Your storage system delivers **8 GB/s** sequential throughput

**Result:** Your GPUs will be idle 33% of the time, waiting for data. The solution is to either:
- Add more NVMe drives to increase throughput
- Use a distributed filesystem (like GPFS or Lustre) that aggregates throughput from multiple nodes
- Implement data caching or preprocessing to reduce the load on raw storage

---

## 🔁 Summary

Sequential throughput (MB/s) is the speed at which your storage can feed large, contiguous data to your AI training pipeline. It's the dominant metric for dataset streaming because training data is read in large, sequential chunks. Measure it with large block sizes, match it to your GPU consumption rate, and always keep an eye on it — because a slow storage pipeline means a slow training job.