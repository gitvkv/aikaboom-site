# 30.1g nvidia-smi pmon: per-process monitoring — identifying which PID uses GPU

#### 🏷️ The Virtualization and Cloud — Extending AI Infrastructure Beyond Bare Metal > 30 GPU Diagnostics and nvidia-smi Mastery > 30.1 nvidia-smi — The Primary GPU Management Tool

When running AI workloads, multiple processes may compete for GPU resources. The **nvidia-smi pmon** command helps engineers identify exactly which process (by its Process ID or PID) is using the GPU, how much memory it consumes, and what type of compute activity it performs. This is essential for troubleshooting performance issues, debugging runaway processes, and ensuring fair resource allocation across shared GPU environments.

---

## ⚙️ What Does nvidia-smi pmon Show?

The **pmon** (process monitor) mode provides a real-time, per-process view of GPU utilization. Unlike the standard **nvidia-smi** output, which shows overall GPU health, **pmon** breaks down activity by individual processes running on each GPU.

Key details displayed include:
- **GPU Index** — which GPU the process is using
- **PID** — the unique process identifier
- **Type** — whether the process is a compute (C) or graphics (G) workload
- **SM Utilization** — percentage of streaming multiprocessor usage
- **Memory Utilization** — percentage of GPU memory used
- **Memory Usage** — actual memory consumed (in MB)
- **Encoder/Decoder Usage** — if applicable

---

## 🕵️ How to Interpret the Output

When you run the command, you will see a table-like output with columns for each GPU and its active processes. Each row represents one process on one GPU.

For example, a typical output might show:
- **GPU 0** has a process with **PID 12345** using **85% SM** and **2048 MB** of memory
- **GPU 1** has a process with **PID 67890** using **12% SM** and **512 MB** of memory

This allows engineers to quickly spot which PID is consuming the most resources, helping to identify:
- A training job that is monopolizing the GPU
- A stalled process that is not releasing memory
- Multiple processes competing for the same GPU

---

## 📊 Comparison: nvidia-smi vs nvidia-smi pmon

| Feature | Standard nvidia-smi | nvidia-smi pmon |
|---------|---------------------|-----------------|
| View type | Overall GPU summary | Per-process breakdown |
| Shows PIDs | No (only driver info) | Yes |
| Real-time updates | Static snapshot | Continuous monitoring |
| SM utilization per process | No | Yes |
| Best for | Quick health check | Deep process-level debugging |

---

## 🛠️ Practical Use Cases for Engineers

- **Identifying resource hogs** — When a GPU is running at 100% and you need to know which PID is responsible
- **Debugging memory leaks** — Spot processes that gradually consume more memory over time
- **Killing runaway processes** — Once you have the PID, you can terminate the process safely
- **Capacity planning** — Understand how many processes can run concurrently on a single GPU
- **Multi-user environments** — Track which user's processes are using which GPU

---

## 🧪 Example Workflow

1. Run the **pmon** command to start monitoring all GPUs
2. Observe the output and note the **PID** of the process using the most resources
3. Cross-reference the PID with system tools (like **top** or **ps**) to identify the application name
4. Decide whether to adjust the workload, kill the process, or move it to another GPU

---

## ⚠️ Important Notes

- The **pmon** command runs continuously until you stop it (usually with **Ctrl+C**)
- It refreshes every second by default, giving near-real-time visibility
- Some processes may appear briefly if they are short-lived
- Virtualization and containerized workloads (like Docker) will show the PID from inside the container, which may differ from the host PID in some configurations

---

## ✅ Summary

**nvidia-smi pmon** is a powerful tool for engineers who need to understand exactly which processes are using GPU resources. By identifying PIDs, memory usage, and compute activity, it enables precise troubleshooting and efficient resource management in AI infrastructure environments. Mastering this command is a key step toward becoming proficient in GPU diagnostics and operations.