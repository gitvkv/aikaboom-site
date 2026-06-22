# 38.2a nvidia-smi command cheat sheet: 30 most useful flags and queries

#### 🏷️ The Exam Preparation & Certification Mastery > 38 Reference Appendices and Quick-Reference Guides > 38.2 Command Quick Reference

---

## 🧠 Context Introduction

The **nvidia-smi** tool is the primary command-line utility for monitoring and managing NVIDIA GPUs. For new engineers entering AI infrastructure and operations, this tool provides real-time visibility into GPU health, utilization, memory usage, and running processes. Mastering these 30 flags and queries will help you quickly diagnose performance issues, verify GPU availability, and ensure your AI workloads are running efficiently.

---

## ⚙️ Basic GPU Information Queries

These commands give you the fundamental details about your GPU hardware and driver setup.

- **List all GPUs with basic info** — Use **nvidia-smi** (no flags) to display a summary table of all GPUs, including temperature, power usage, memory, and utilization.
- **Query GPU count** — Use **nvidia-smi --list-gpus** to show only the GPU index and name for each device.
- **Show driver and CUDA version** — Use **nvidia-smi --query** to display the installed driver version and CUDA toolkit version.
- **Display GPU UUID** — Use **nvidia-smi --query-gpu=uuid --format=csv** to retrieve the unique identifier for each GPU.
- **Show GPU index and name** — Use **nvidia-smi --query-gpu=index,name --format=csv** for a clean, machine-readable output.

---

## 📊 Memory and Utilization Monitoring

These flags help you track how much GPU memory is being used and how busy the compute cores are.

- **Memory usage per GPU** — Use **nvidia-smi --query-gpu=memory.used,memory.total --format=csv** to see used vs. total memory.
- **Free memory check** — Use **nvidia-smi --query-gpu=memory.free --format=csv** to quickly identify available memory.
- **GPU utilization percentage** — Use **nvidia-smi --query-gpu=utilization.gpu --format=csv** to see the percentage of time the GPU cores are active.
- **Memory utilization percentage** — Use **nvidia-smi --query-gpu=utilization.memory --format=csv** to monitor memory bandwidth usage.
- **Combined utilization report** — Use **nvidia-smi --query-gpu=utilization.gpu,utilization.memory,memory.used,memory.total --format=csv** for a comprehensive utilization snapshot.

---

## 🛠️ Process and Application Monitoring

Identify which processes are using the GPU and how much resource they consume.

- **List all GPU processes** — Use **nvidia-smi --query-compute-apps=pid,process_name,used_memory --format=csv** to see running applications and their memory usage.
- **Show processes per GPU** — Use **nvidia-smi pmon** to display a live table of processes with GPU and memory utilization per process.
- **Kill a GPU process** — Use **nvidia-smi --gpu-reset** to reset the GPU and terminate all running processes (use with caution).
- **Show process details with PID** — Use **nvidia-smi --query-gpu=index --format=csv -l 1** combined with process queries to track PID-level activity.
- **Identify orphaned processes** — Use **nvidia-smi --query-compute-apps=pid --format=csv** to list all PIDs, then cross-reference with your system process manager.

---

## 🕵️ Advanced Diagnostics and Error Checking

These flags help you detect hardware issues, thermal problems, and power constraints.

- **Check GPU temperature** — Use **nvidia-smi --query-gpu=temperature.gpu --format=csv** to see the current temperature in Celsius.
- **Monitor power consumption** — Use **nvidia-smi --query-gpu=power.draw --format=csv** to see current power draw in watts.
- **View power limit** — Use **nvidia-smi --query-gpu=power.limit --format=csv** to check the maximum allowed power draw.
- **Check for ECC errors** — Use **nvidia-smi --query-gpu=ecc.errors.corrected.volatile.device_memory,ecc.errors.uncorrected.volatile.device_memory --format=csv** to detect memory errors.
- **Show GPU clock speeds** — Use **nvidia-smi --query-gpu=clocks.current.graphics,clocks.current.memory --format=csv** to verify clock frequencies.

---

## 🔄 Continuous Monitoring and Logging

For ongoing observation during training or inference workloads.

- **Live refresh every second** — Use **nvidia-smi --loop=1** to update the display every second.
- **Live refresh with specific interval** — Use **nvidia-smi -l 5** to refresh every 5 seconds (replace 5 with any number).
- **Log output to file** — Use **nvidia-smi --query-gpu=timestamp,name,utilization.gpu,memory.used --format=csv --filename=gpu_log.csv** to save monitoring data.
- **Append to existing log** — Use **nvidia-smi --query-gpu=timestamp,utilization.gpu --format=csv >> gpu_log.csv** to add data without overwriting.
- **Monitor specific GPU only** — Use **nvidia-smi --id=0 --loop=1** to monitor only GPU index 0 (replace 0 with desired index).

---

## 📈 Performance and Configuration Queries

Understand GPU configuration and performance characteristics.

- **Show compute mode** — Use **nvidia-smi --query-gpu=compute_mode --format=csv** to see if the GPU is in Default, Exclusive, or Prohibited mode.
- **Display persistence mode** — Use **nvidia-smi --query-gpu=persistence_mode --format=csv** to check if persistence mode is enabled (reduces driver overhead).
- **View PCIe link speed** — Use **nvidia-smi --query-gpu=pcie.link.gen.current,pcie.link.width.current --format=csv** to verify PCIe bandwidth.
- **Check driver model** — Use **nvidia-smi --query-gpu=driver_model.current --format=csv** to see if using WDDM or TCC (Windows only).
- **Show supported clocks** — Use **nvidia-smi --query-supported-clocks** to list all valid memory and graphics clock combinations.

---

## 🧪 Quick Reference Comparison Table

| Category | Flag/Query | Typical Use Case |
|---|---|---|
| Basic Info | **nvidia-smi** | Quick system overview |
| Memory | **--query-gpu=memory.used** | Check memory pressure |
| Utilization | **--query-gpu=utilization.gpu** | Monitor compute load |
| Processes | **--query-compute-apps** | Identify resource hogs |
| Temperature | **--query-gpu=temperature.gpu** | Thermal monitoring |
| Power | **--query-gpu=power.draw** | Power consumption check |
| Errors | **--query-gpu=ecc.errors** | Hardware reliability |
| Live Refresh | **--loop=1** | Real-time monitoring |
| Logging | **--filename=log.csv** | Historical data collection |
| Specific GPU | **--id=0** | Isolate single device |

---

## 💡 Pro Tips for New Engineers

- **Start with no flags** — Run **nvidia-smi** alone first to get comfortable with the default output layout.
- **Use CSV format for scripting** — Adding **--format=csv** makes output easy to parse with tools like **awk** or **grep**.
- **Combine multiple queries** — Separate attributes with commas in the **--query-gpu** flag to get custom reports.
- **Watch for "No running processes"** — If you see this, your GPU is idle and available for new workloads.
- **Check for "ERR!" in output** — This indicates a hardware or driver issue that needs immediate attention.

---

## ✅ Summary

Mastering these 30 **nvidia-smi** flags and queries gives you the essential toolkit for managing GPU resources in any AI infrastructure environment. Practice running these commands in different scenarios — during training, inference, and idle periods — to build intuition for what healthy GPU behavior looks like. This knowledge is foundational for the NVIDIA-Certified Associate exam and for daily operations in AI infrastructure.