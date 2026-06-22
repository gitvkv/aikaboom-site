# 20.2c Lustre striping: distributing a single file across multiple OSTs for parallel reads

#### 🏷️ The AI Data Center Networking — Moving Petabytes Without Latency > 20 Parallel File Systems — Shared Storage for AI Clusters at Scale > 20.2 Parallel File System Architectures

## 🔍 Context Introduction

When training large AI models, a single dataset file (like a massive training corpus or checkpoint) can be hundreds of gigabytes or even terabytes in size. If that file lives on just one storage device, only one compute node can read from it at a time — creating a bottleneck.

**Lustre striping** solves this by chopping that single file into smaller chunks and spreading them across multiple **Object Storage Targets (OSTs)**. This allows many compute nodes to read different parts of the file simultaneously, dramatically speeding up data loading for AI workloads.

---

## ⚙️ What is Lustre Striping?

Lustre striping is the mechanism that distributes a file's data across multiple OSTs in a Lustre parallel file system. Think of it like a team of workers each holding a section of a long scroll — they can all unroll their part at the same time.

Key concepts:
- **OST (Object Storage Target):** A physical storage device (disk or SSD) that holds chunks of file data.
- **Stripe count:** The number of OSTs a file is spread across.
- **Stripe size:** The size of each chunk placed on an OST.
- **Stripe index:** Which OST gets the first chunk of the file.

---

## 📊 How Striping Enables Parallel Reads

Without striping, a single file lives on one OST. Only one compute node can read from that OST at a time. With striping, the file is broken into pieces across multiple OSTs, and multiple compute nodes can read different pieces simultaneously.

| Scenario | Number of OSTs | Read Performance | Best For |
|----------|---------------|------------------|----------|
| No striping (stripe count = 1) | 1 | Slow, single-stream reads | Small files, metadata-heavy workloads |
| Moderate striping (stripe count = 4–8) | 4–8 | Good parallel throughput | Medium datasets, checkpoint files |
| Heavy striping (stripe count = 16–128) | 16–128 | Excellent parallel throughput | Large training datasets, model checkpoints |

---

## 🛠️ How Striping Works in Practice

When a file is created on a Lustre filesystem, the system decides how to stripe it. This decision can be made:
- **At filesystem level:** A default striping pattern is applied to all new files.
- **At directory level:** All files created inside a specific directory inherit that directory's striping settings.
- **Per file:** Individual files can be given custom striping parameters.

The process:
1. The file is divided into chunks of size equal to the stripe size.
2. Chunk 1 goes to OST 0, chunk 2 to OST 1, chunk 3 to OST 2, and so on.
3. When the stripe count is reached, the pattern wraps back to OST 0.
4. Each OST stores its chunk independently, allowing parallel reads.

---

## 🕵️ Checking Striping Configuration

To see how a file is striped, engineers use the Lustre tool **lfs** (Lustre File System). Here is how you would check striping on a file:

**For reference:**
```
lfs getstripe /path/to/your/file
```

📤 **Output:** This command shows the stripe count, stripe size, and a list of which OSTs hold each chunk of the file. For example, you might see output indicating a stripe count of 4, a stripe size of 1MB, and OST indices like 0, 1, 2, 3.

To check the default striping for a directory:

**For reference:**
```
lfs getstripe -d /path/to/directory
```

📤 **Output:** This displays the default stripe count and stripe size that will be applied to any new files created in that directory.

---

## 🎯 Setting Striping for AI Workloads

For AI training datasets, engineers typically want **wide striping** (high stripe count) to maximize parallel read throughput. Here is how to set it:

**Setting default striping on a directory:**

**For reference:**
```
lfs setstripe -c 8 -S 4M /path/to/dataset_directory
```

📤 **Output:** No output on success. This sets the directory so that any new file created inside it will be striped across 8 OSTs with a stripe size of 4 megabytes.

**Setting striping on a specific file at creation time:**

**For reference:**
```
lfs setstripe -c 16 -S 1M /path/to/new_file.h5
```

📤 **Output:** No output on success. The file will be striped across 16 OSTs with 1MB chunks.

---

## 🧠 Best Practices for AI Engineers

- **Large files ( > 10GB ):** Use stripe counts of 8–32 for good parallel read performance. Larger stripe counts (64–128) can help for very large files accessed by many compute nodes simultaneously.
- **Small files ( < 1GB ):** Keep stripe count low (1–2). Small files don't benefit from striping and can waste OST space.
- **Checkpoint files:** Use moderate striping (4–8) to balance write speed during checkpointing and read speed during recovery.
- **Training datasets:** Use wide striping (16–64) for datasets that are read by many data loaders in parallel.
- **Stripe size:** Start with 1MB–4MB. Larger stripe sizes reduce metadata overhead but can cause uneven distribution for small files.

---

## ⚠️ Common Pitfalls to Avoid

- **Over-striping small files:** Spreading a 100KB file across 16 OSTs wastes space and creates metadata overhead with no performance gain.
- **Ignoring OST capacity:** If one OST is nearly full, striping a large file across it can cause out-of-space errors. Use **lfs df** to check OST usage.
- **Changing striping on existing files:** Striping is set at file creation time. You cannot change striping on a file that already has data — you must copy it to a new file with the desired striping.
- **Not testing:** Always test your striping configuration with a representative workload before running large training jobs.

---

## 🔄 Summary

Lustre striping is a fundamental technique for achieving parallel I/O performance in AI infrastructure. By distributing a single file across multiple OSTs, engineers enable multiple compute nodes to read different parts of the file simultaneously — turning a potential bottleneck into a high-speed data pipeline.

Remember: **wider striping for large files accessed by many readers, narrow striping for small files or metadata-heavy operations.** Use the **lfs** tool to inspect and set striping, and always verify your configuration with real workloads.