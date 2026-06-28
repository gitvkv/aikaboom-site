# 5.1c iostat: block device I/O throughput — identifying storage bottlenecks

#### 🏷️ The Operating System Layer — Linux for AI Infrastructure Operators > 5 Storage & Resource Management for AI Workloads > 5.1 Linux Resource Monitoring — Understanding System Load

---

## 🔍 Context Introduction

When training large AI models or running inference pipelines, your storage system must keep up with the data demands of GPUs and CPUs. If your storage is slow, your expensive compute resources will sit idle waiting for data. The **iostat** command is a critical tool for monitoring block device I/O (input/output) throughput and identifying storage bottlenecks. This guide will help you understand what iostat reports and how to interpret the numbers to keep your AI infrastructure running smoothly.

---

## ⚙️ What is iostat?

**iostat** is a Linux utility that reports **Central Processing Unit (CPU) statistics** and **input/output statistics for storage devices**. For AI workloads, we focus on the block device reports to understand:

- How fast data is being read from or written to disks
- Whether the storage system is saturated (overloaded)
- How long I/O operations are taking (latency)

---

## 📊 Key Metrics Explained

When you run iostat, you will see several columns. Here are the most important ones for identifying storage bottlenecks:

| Metric | Full Name | What It Tells You |
|--------|-----------|-------------------|
| **r/s** | Reads per second | Number of read requests issued to the device per second |
| **w/s** | Writes per second | Number of write requests issued to the device per second |
| **rkB/s** | Kilobytes read per second | Amount of data read from the device per second |
| **wkB/s** | Kilobytes written per second | Amount of data written to the device per second |
| **await** | Average I/O wait time (ms) | Average time for I/O requests to be served (includes queue time + service time) |
| **svctm** | Average service time (ms) | Actual time the device takes to process an I/O request (excluding queue time) |
| **%util** | Device utilization percentage | Percentage of time the device was busy processing I/O requests |

---

## 🕵️ How to Identify Storage Bottlenecks

Look for these warning signs in your iostat output:

- **High %util (near 100%)** — The device is saturated and cannot handle more I/O. This is a clear bottleneck.
- **High await (greater than 10-20ms for SSDs)** — I/O requests are waiting in a queue. This indicates the storage cannot keep up with demand.
- **Large difference between await and svctm** — If await is much larger than svctm, requests are spending significant time waiting in a queue (congestion).
- **Low throughput despite high utilization** — If the device is 100% busy but only delivering low rkB/s or wkB/s, the device may be slow (e.g., an HDD instead of an SSD).

---

### 📊 Visual Representation: iostat I/O Data Flow and Bottleneck Points
This flowchart details how iostat monitors data throughput (rkB/s, wkB/s) and wait times (await) between system memory, the OS kernel, and physical block storage.

```mermaid
flowchart LR
    CPU["CPU / Application"] -->|I/O Request| Kernel["OS Kernel Queue"]
    Kernel -->|await (Wait Time)| Disk["Physical Disk (%util)"]
    Disk -->|rkB/s (Read)| CPU
    Disk -->|wkB/s (Write)| CPU

    classDef cpu fill:#eafaf1,stroke:#76b900,stroke-width:2px,rx:6px,ry:6px;
    classDef memory fill:#f0f7ff,stroke:#3498db,stroke-width:1.5px,rx:4px,ry:4px;
    classDef system fill:#f1f5f9,stroke:#64748b,stroke-width:1.5px;

    class CPU cpu;
    class Disk memory;
    class Kernel system;
```

## 🛠️ Practical Interpretation for AI Workloads

AI workloads typically involve:

- **Reading large datasets** (training data, model checkpoints)
- **Writing checkpoints** (saving model weights during training)
- **Reading model files** (for inference)

**Scenario 1: Training is slow, and iostat shows high await and %util near 100%**
- Your storage is the bottleneck. The GPUs are waiting for data.
- Possible fixes: Use faster storage (NVMe SSDs), increase parallelism, or pre-load data into memory.

**Scenario 2: iostat shows low %util but high await**
- The storage device itself may be slow, or there is contention from other processes.
- Check if other applications are also using the same storage device.

**Scenario 3: rkB/s is very high but w/s is low**
- You are reading data heavily (common during training). Ensure your read path is optimized (e.g., using direct I/O or memory-mapped files).

---

## 📋 Example Workflow for New Engineers

1. **Run iostat** to get a live view of your storage performance. Use an interval (e.g., every 2 seconds) to see changes over time.
2. **Focus on the device** that holds your AI data (e.g., **sda**, **nvme0n1**).
3. **Check %util first** — if it is above 80-90%, your storage is likely a bottleneck.
4. **Check await** — if it is above 10ms for SSDs or 50ms for HDDs, investigate further.
5. **Compare rkB/s and wkB/s** to your expected workload. If they are lower than expected, your storage may be limiting throughput.

---

## 🧠 Key Takeaways

- **iostat** is your go-to tool for monitoring storage performance in AI infrastructure.
- **%util** and **await** are the most important metrics for identifying bottlenecks.
- High utilization + high await = storage is saturated.
- Always consider the type of storage (SSD vs. HDD) when interpreting values.
- For AI workloads, storage bottlenecks directly impact training and inference speed.

---

## 📚 Next Steps

- Learn to combine iostat with other tools like **iotop** (to see which processes are using I/O) and **dstat** (for a broader system view).
- Practice running iostat on a test system while copying large files to see how metrics change.
- Understand your storage topology: Is it local NVMe, a network filesystem (NFS), or a distributed storage system? Each has different performance characteristics.

---

*Remember: In AI infrastructure, storage is often the hidden bottleneck. Mastering iostat will help you keep your GPUs fed and your training jobs fast.*