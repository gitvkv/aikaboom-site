# 31.1c DCGM field IDs: the complete list of GPU metrics available for scraping

#### 🏷️ The Virtualization and Cloud — Extending AI Infrastructure Beyond Bare Metal > 31 Cluster-Wide Telemetry — DCGM, Prometheus, and Grafana > 31.1 Data Center GPU Manager (DCGM)

---

## 🧠 Context Introduction

When you are managing AI workloads across multiple GPUs, you need a way to monitor their health, performance, and utilization. **DCGM (Data Center GPU Manager)** from NVIDIA provides a rich set of metrics — each identified by a unique **field ID**. These field IDs are the building blocks for scraping GPU telemetry into monitoring tools like Prometheus and Grafana. This guide gives you the complete list of available GPU metrics, organized by category, so you can pick exactly what to monitor.

---

## ⚙️ What Are DCGM Field IDs?

DCGM field IDs are numeric identifiers that map to specific GPU metrics. For example:
- **Field ID 100** represents GPU utilization.
- **Field ID 155** represents memory utilization.

When you configure DCGM to export metrics, you specify which field IDs to collect. This lets you focus on the data that matters most for your AI workloads — avoiding unnecessary overhead from metrics you don't need.

---

## 📊 Complete List of DCGM Field IDs by Category

Below is the full set of GPU metrics available through DCGM, grouped by what they measure. Each entry shows the **Field ID**, **Metric Name**, and a simple description.

### 🟢 GPU Utilization & Activity

| Field ID | Metric Name | Description |
|----------|-------------|-------------|
| 100 | GPU Utilization (%) | Percentage of time GPU cores were active |
| 101 | SM Occupancy (%) | Average number of warps resident per SM |
| 102 | Tensor Core Activity (%) | Utilization of Tensor Cores (AI-specific) |
| 103 | FP32 Activity (%) | Utilization of FP32 CUDA cores |

### 🔵 Memory Metrics

| Field ID | Metric Name | Description |
|----------|-------------|-------------|
| 155 | Memory Utilization (%) | Percentage of GPU memory in use |
| 156 | Free Memory (MiB) | Amount of free GPU memory |
| 157 | Used Memory (MiB) | Amount of GPU memory currently used |
| 158 | Total Memory (MiB) | Total GPU memory capacity |
| 159 | Memory Bandwidth Utilization (%) | Percentage of memory bandwidth used |

### 🟡 Temperature & Power

| Field ID | Metric Name | Description |
|----------|-------------|-------------|
| 200 | GPU Temperature (°C) | Current GPU temperature |
| 201 | Memory Temperature (°C) | Current memory module temperature |
| 202 | Power Draw (mW) | Current GPU power consumption |
| 203 | Power Limit (mW) | Maximum allowed power draw |
| 204 | Thermal Limit Status | Whether GPU is throttling due to temperature |

### 🟠 Clock Speeds

| Field ID | Metric Name | Description |
|----------|-------------|-------------|
| 300 | GPU Clock (MHz) | Current core clock frequency |
| 301 | Memory Clock (MHz) | Current memory clock frequency |
| 302 | SM Clock (MHz) | Streaming Multiprocessor clock speed |
| 303 | Video Clock (MHz) | Video encoder/decoder clock speed |

### 🔴 PCIe & Fabric

| Field ID | Metric Name | Description |
|----------|-------------|-------------|
| 400 | PCIe Link Generation | Current PCIe generation (e.g., Gen4, Gen5) |
| 401 | PCIe Link Width | Number of PCIe lanes active |
| 402 | PCIe Rx Throughput (MB/s) | Data received via PCIe |
| 403 | PCIe Tx Throughput (MB/s) | Data sent via PCIe |
| 404 | NVLink Bandwidth (MB/s) | Data transfer over NVLink (multi-GPU) |

### 🟣 Error & Health Counters

| Field ID | Metric Name | Description |
|----------|-------------|-------------|
| 500 | Xid Errors | Count of GPU hardware errors |
| 501 | ECC Single Bit Errors | Correctable memory errors |
| 502 | ECC Double Bit Errors | Uncorrectable memory errors |
| 503 | Retired Pages | Memory pages retired due to errors |
| 504 | Power Violation Count | Number of times power limit was exceeded |

### 🟤 Process & Compute

| Field ID | Metric Name | Description |
|----------|-------------|-------------|
| 600 | Running Processes | Number of active GPU processes |
| 601 | Compute Mode | Current compute mode (Default, Exclusive, etc.) |
| 602 | GPU Time (%) | Percentage of time GPU spent on compute |
| 603 | Memory Time (%) | Percentage of time GPU spent on memory operations |

---

## 🛠️ How to Use These Field IDs in Practice

When configuring DCGM for scraping, you specify which field IDs to collect. Here is how you would typically do it:

### For DCGM Exporter (Prometheus Integration)

The DCGM Exporter uses a configuration file where you list the field IDs you want. For example:

**For reference:**
```bash
# Example configuration snippet for dcgm-exporter
# File: /etc/dcgm-exporter/dcp-metrics-included.csv
# Format: field_id, metric_name, help_text, labels
100, gpu_utilization, GPU utilization percentage, gpu
155, mem_utilization, Memory utilization percentage, gpu
200, gpu_temp, GPU temperature in Celsius, gpu
202, power_draw, GPU power draw in milliwatts, gpu
```

**📤 Output:** The exporter will then expose these metrics at an HTTP endpoint (default port 9400) for Prometheus to scrape.

### For Direct DCGM API Calls

If you are using the DCGM library directly in Python or C++, you reference field IDs like this:

**For reference:**
```python
import pydcgm
# Connect to DCGM engine
dcgm = pydcgm.DcgmHandle()
# Get GPU utilization (field ID 100)
utilization = dcgm.GetEntityGroupEntities(
    entityGroupId=0,  # GPU group
    fieldIds=[100, 155, 200]
)
```

**📤 Output:** The API returns a dictionary with field ID values for each GPU.

---

## 🕵️ Choosing the Right Metrics for AI Workloads

Not all field IDs are equally important for AI infrastructure. Here is a quick guide for new engineers:

### ✅ Essential for AI Training
- **Field ID 100** (GPU Utilization) — See if your GPU is busy
- **Field ID 155** (Memory Utilization) — Check if you are running out of memory
- **Field ID 102** (Tensor Core Activity) — Measure AI-specific compute usage
- **Field ID 202** (Power Draw) — Monitor power consumption and cooling needs
- **Field ID 500** (Xid Errors) — Detect hardware failures early

### ✅ Important for Multi-GPU Clusters
- **Field ID 404** (NVLink Bandwidth) — Ensure GPUs communicate efficiently
- **Field ID 400-403** (PCIe Metrics) — Check for bottlenecks in data transfer
- **Field ID 501-502** (ECC Errors) — Catch memory reliability issues

### ✅ Nice-to-Have for Deep Diagnostics
- **Field ID 101** (SM Occupancy) — Optimize kernel launch configurations
- **Field ID 300-303** (Clock Speeds) — Verify GPU is not throttling
- **Field ID 600** (Running Processes) — See which jobs are active

---

## 📋 Summary Table: Quick Reference

| Category | Key Field IDs | Why It Matters |
|----------|---------------|----------------|
| Utilization | 100, 101, 102 | How busy is your GPU? |
| Memory | 155, 156, 157 | Are you hitting memory limits? |
| Temperature | 200, 201 | Is your GPU overheating? |
| Power | 202, 203 | Are you within power budget? |
| Errors | 500, 501, 502 | Is the GPU healthy? |
| Interconnect | 400, 404 | Is data transfer a bottleneck? |

---

## ✅ Final Tips for New Engineers

- **Start small** — Begin with field IDs 100, 155, 200, and 202. Add more as you understand your workload.
- **Use the DCGM diagnostic tool** — It automatically checks many of these metrics to validate GPU health.
- **Watch for Xid errors (ID 500)** — These are critical; they often indicate hardware failure or driver issues.
- **Monitor memory utilization (ID 155)** closely — AI models often fail when memory runs out.
- **Remember that field IDs are numeric** — Always reference them by number, not just name, when configuring scrapers.

With this complete list of DCGM field IDs, you can now build a targeted monitoring strategy for your AI infrastructure — collecting only the metrics that matter for your specific workloads.