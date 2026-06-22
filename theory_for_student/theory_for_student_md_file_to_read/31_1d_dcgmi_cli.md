# 31.1d dcgmi: the DCGM CLI for interactive diagnostics and field watching

#### 🏷️ The Virtualization and Cloud — Extending AI Infrastructure Beyond Bare Metal > 31 Cluster-Wide Telemetry — DCGM, Prometheus, and Grafana > 31.1 Data Center GPU Manager (DCGM)

## 🔍 Context Introduction

When managing AI infrastructure, you need tools that let you quickly check the health and performance of NVIDIA GPUs without setting up complex monitoring dashboards. **dcgmi** (DCGM Command Line Interface) is your go-to interactive tool for real-time diagnostics and field watching. Think of it as a swiss army knife for GPU telemetry — it gives you instant visibility into GPU metrics, helps you troubleshoot issues, and lets you monitor key fields (like temperature, power, or memory usage) continuously. Unlike full monitoring stacks, dcgmi runs directly from your terminal, making it perfect for quick checks during development, testing, or incident response.

---

## ⚙️ What is dcgmi?

**dcgmi** is the command-line interface for NVIDIA Data Center GPU Manager (DCGM). It provides:

- **Interactive diagnostics** — Run health checks on GPUs to detect problems like thermal throttling, ECC errors, or power issues
- **Field watching** — Continuously monitor specific GPU metrics (fields) in real-time, similar to using **top** for CPU
- **Configuration and management** — Set policies, enable/disable features, and manage DCGM itself
- **No external dependencies** — Works directly on the host without needing Prometheus or Grafana

---

## 🛠️ Key Capabilities of dcgmi

| Capability | What It Does | When to Use It |
|------------|--------------|----------------|
| **Health Monitoring** | Runs predefined diagnostic checks on GPU health (thermal, power, memory, etc.) | Before deploying a workload, or when investigating performance issues |
| **Field Watching** | Continuously displays selected GPU metrics (fields) in a live-updating table | During training or inference to spot anomalies in real-time |
| **Configuration** | Sets DCGM policies like power limits, clock speeds, or ECC settings | When tuning GPU behavior for specific workloads |
| **Group Management** | Creates logical groups of GPUs for batch operations | When managing multiple GPUs in a single node |
| **Event Monitoring** | Lists recent events like GPU resets, errors, or configuration changes | During post-mortem analysis after a failure |

---

## 🕵️ Interactive Diagnostics with dcgmi

The diagnostic feature runs a series of health checks against your GPUs. These checks cover:

- **Thermal** — Checks if GPU temperatures are within safe limits
- **Power** — Verifies power consumption is not exceeding thresholds
- **Memory** — Tests GPU memory for errors or degradation
- **Compute** — Validates that compute capabilities are functioning correctly
- **NVLink** — Ensures inter-GPU connections are healthy (for multi-GPU setups)

**How it works:**
- You run a diagnostic command, and dcgmi executes all checks sequentially
- Results are displayed as **PASS**, **WARN**, or **FAIL** for each category
- If a check fails, dcgmi provides a description of the issue and recommended actions

**Example flow:**
1. You start a new training job and notice lower-than-expected performance
2. You run a diagnostic to check if any GPUs have thermal throttling or memory errors
3. dcgmi reports a **WARN** on thermal for one GPU — you investigate cooling or workload distribution

---

## 📊 Field Watching — Real-Time GPU Monitoring

Field watching is the most interactive feature of dcgmi. It lets you:

- **Select specific metrics** to monitor (e.g., GPU utilization, memory usage, temperature, power draw)
- **Watch them update live** in a terminal table — refresh rates are configurable
- **Filter by GPU** — watch all GPUs or a specific subset
- **Export data** — save field values to a file for later analysis

**Common fields to watch:**

| Field Name | What It Measures | Why It Matters |
|------------|------------------|----------------|
| **GPU Utilization** | Percentage of time GPU cores are busy | Indicates if your workload is GPU-bound |
| **Memory Utilization** | Percentage of GPU memory in use | Helps detect memory leaks or oversubscription |
| **Temperature** | Current GPU temperature in Celsius | Critical for preventing thermal throttling |
| **Power Draw** | Current power consumption in Watts | Useful for power budgeting and efficiency tuning |
| **Memory Clock** | Current memory clock speed in MHz | Can indicate dynamic clock adjustments |
| **PCIe Throughput** | Data transfer rate over PCIe bus | Important for data-intensive workloads |

**How to use field watching:**
1. Start a field watch session with your chosen metrics
2. The terminal displays a live table that updates every few seconds
3. You can pause, resume, or stop the watch at any time
4. Watch for sudden spikes in temperature or drops in utilization — these often signal problems

---

## 🧰 Practical Use Cases for New Engineers

### Case 1: Quick Health Check Before a Job
- Run a diagnostic to verify all GPUs are healthy before starting a long training run
- If any GPU reports **FAIL** on memory, you can exclude it from the workload

### Case 2: Spotting Thermal Throttling During Training
- Start a field watch on **temperature** and **GPU utilization**
- If temperature hits 85°C and utilization drops suddenly, you are likely throttling
- Adjust cooling or reduce power limits to stabilize performance

### Case 3: Investigating Memory Issues
- Watch **memory utilization** over time during inference
- If memory usage keeps increasing without releasing, you may have a memory leak in your application

### Case 4: Comparing GPU Performance
- Run field watching on multiple GPUs simultaneously
- If one GPU shows significantly lower utilization than others, check for workload imbalance or hardware issues

---

## 🧩 How dcgmi Fits into the Bigger Picture

While dcgmi is excellent for interactive, on-the-spot diagnostics, it is not designed for long-term historical monitoring. Here is how it complements other tools:

| Tool | Purpose | Best For |
|------|---------|----------|
| **dcgmi** | Interactive, real-time diagnostics and field watching | Quick checks, troubleshooting, ad-hoc monitoring |
| **DCGM Exporter** | Exports metrics to Prometheus | Long-term data collection and alerting |
| **Grafana** | Visualizes historical metrics | Dashboards, trend analysis, and reporting |
| **nvidia-smi** | Basic GPU status | Simple one-off queries (less detailed than dcgmi) |

**Rule of thumb:** Use **dcgmi** when you are at the terminal and need answers *now*. Use **Prometheus + Grafana** when you need to track trends over hours or days.

---

## ✅ Summary

- **dcgmi** is the interactive CLI for NVIDIA DCGM, designed for real-time GPU diagnostics and monitoring
- **Diagnostics** run comprehensive health checks covering thermal, power, memory, compute, and NVLink
- **Field watching** lets you monitor specific GPU metrics live in your terminal
- It is ideal for quick troubleshooting, pre-job health checks, and spotting anomalies during active workloads
- For long-term monitoring, pair dcgmi with DCGM Exporter, Prometheus, and Grafana

> **Key takeaway:** dcgmi is your first line of defense when something feels wrong with your GPUs. Learn to use it for interactive diagnostics, and you will save hours of debugging time.