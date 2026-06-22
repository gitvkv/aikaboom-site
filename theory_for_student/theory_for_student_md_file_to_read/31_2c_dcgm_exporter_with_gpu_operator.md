# 31.2c GPU Operator deployment: dcgm-exporter is automatically deployed and configured

#### 🏷️ The Virtualization and Cloud — Extending AI Infrastructure Beyond Bare Metal > 31 Cluster-Wide Telemetry — DCGM, Prometheus, and Grafana > 31.2 DCGM-Exporter — Bridging GPU Metrics to Prometheus

---

## 📘 Context Introduction

When you deploy the NVIDIA GPU Operator on a Kubernetes cluster, it doesn't just manage GPU drivers and containers. It also automatically sets up monitoring components. One of the most important of these is **dcgm-exporter** — a service that collects GPU metrics using NVIDIA's DCGM (Data Center GPU Manager) and exposes them in a format that Prometheus can scrape.

For new engineers, this means: **you don't need to manually install or configure dcgm-exporter**. The GPU Operator handles it for you as part of its deployment. This section explains what happens behind the scenes and what you can expect.

---

## ⚙️ How Automatic Deployment Works

When the GPU Operator is installed using Helm or the Operator Lifecycle Manager, it includes a component called the **Node Feature Discovery** and **GPU Operator DaemonSet**. During deployment:

- The operator detects which nodes have NVIDIA GPUs.
- It automatically schedules a **dcgm-exporter pod** on each GPU-enabled node.
- The exporter starts collecting metrics immediately without any manual configuration.
- A **Service** and **ServiceMonitor** (for Prometheus Operator users) are also created automatically.

This eliminates the need for engineers to manually set up metric exporters or worry about configuration files.

---

## 📊 What dcgm-exporter Collects

The automatically deployed dcgm-exporter gathers a standard set of GPU metrics. Here are the most important ones:

- **GPU Utilization** — Percentage of time the GPU was busy
- **Memory Utilization** — How much GPU memory is in use
- **Temperature** — Current GPU temperature in Celsius
- **Power Draw** — Instantaneous power consumption in watts
- **Memory Bandwidth** — Percentage of memory bandwidth used
- **PCIe Throughput** — Data transfer rates over the PCIe bus
- **GPU Clock Speeds** — Current core and memory clock frequencies
- **ECC Errors** — Error correction code events (if supported)
- **XID Errors** — Critical GPU hardware errors

All metrics are exposed on port **9400** by default, which is the standard dcgm-exporter endpoint.

---

## 🛠️ Default Configuration Details

When the GPU Operator deploys dcgm-exporter, it uses sensible defaults. Here is what gets configured automatically:

| Component | Default Behavior |
|-----------|------------------|
| **Deployment method** | DaemonSet (one pod per GPU node) |
| **Exposed port** | 9400 |
| **Metrics path** | /metrics |
| **Collection interval** | Every 10 seconds |
| **Prometheus ServiceMonitor** | Created if Prometheus Operator is detected |
| **Resource limits** | Set based on node GPU count |
| **Log level** | INFO |

Engineers can override these defaults by modifying the GPU Operator's Helm values, but for most use cases, the automatic configuration works perfectly.

---

## 🕵️ Verifying the Automatic Deployment

After the GPU Operator is installed, you can confirm that dcgm-exporter is running by checking for pods with the name containing **dcgm-exporter** on your GPU nodes. The pod status should show **Running**.

To see the metrics being collected, you can access the exporter's endpoint directly. The output will be a plain text list of GPU metrics in Prometheus exposition format, with each metric prefixed by **DCGM_** (for example, **DCGM_FI_DEV_GPU_UTIL**).

If you are using Prometheus, you can verify that the metrics are being scraped by checking the Prometheus target status page — the dcgm-exporter targets should show as **UP**.

---

## 🔄 Relationship with Other GPU Operator Components

The automatic deployment of dcgm-exporter is part of a larger ecosystem within the GPU Operator:

- **GPU Driver DaemonSet** — Installs NVIDIA drivers on each node
- **Container Toolkit DaemonSet** — Configures Docker/containerd for GPU access
- **DCGM DaemonSet** — Runs the DCGM host engine (required by dcgm-exporter)
- **dcgm-exporter DaemonSet** — Collects and exposes metrics (automatically deployed)
- **Prometheus ServiceMonitor** — Tells Prometheus where to scrape (if applicable)

The dcgm-exporter depends on the DCGM host engine being present, which is also deployed automatically by the GPU Operator.

---

## ✅ Key Takeaways for New Engineers

- **No manual setup needed** — The GPU Operator handles dcgm-exporter deployment automatically.
- **One exporter per GPU node** — Each node with GPUs gets its own dcgm-exporter pod.
- **Standard metrics** — All common GPU health and performance metrics are collected.
- **Prometheus-ready** — Metrics are exposed in Prometheus format on port 9400.
- **Customizable** — While defaults work well, you can adjust configuration via Helm values.
- **Part of a larger system** — dcgm-exporter works alongside other GPU Operator components.

This automatic deployment is one of the key benefits of using the GPU Operator — it significantly reduces the operational overhead of monitoring GPU infrastructure.