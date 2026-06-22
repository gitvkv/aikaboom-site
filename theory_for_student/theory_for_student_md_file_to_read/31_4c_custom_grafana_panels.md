# 31.4c Building custom panels: GPU utilization heatmaps, memory trend charts

#### 🏷️ The Virtualization and Cloud — Extending AI Infrastructure Beyond Bare Metal > 31 Cluster-Wide Telemetry — DCGM, Prometheus, and Grafana > 31.4 Grafana — Visualizing Cluster Health

---

## 🌱 Context Introduction

When managing an AI cluster, you need to quickly spot which GPUs are overworked, underutilized, or running out of memory. Raw numbers in a table are hard to scan. Custom Grafana panels — like **heatmaps** and **trend charts** — turn that data into visual stories. This guide walks you through building two essential panels: a GPU utilization heatmap (to see usage patterns across time and GPUs) and a memory trend chart (to track memory consumption over time). No prior Grafana experience needed.

---

## 📊 GPU Utilization Heatmap — Spotting Hot and Cold GPUs

A heatmap uses color intensity to show GPU utilization across multiple GPUs over time. Dark red means high usage; blue means idle.

### ⚙️ What You Need Before Starting
- A Prometheus data source already connected to your Grafana instance
- DCGM metrics being scraped (specifically **DCGM_FI_DEV_GPU_UTIL**)
- At least one GPU node sending data

### 🛠️ Building the Heatmap Panel

1. **Create a new panel** in your Grafana dashboard. Click **Add panel** → **New panel**.
2. **Select your Prometheus data source** from the dropdown.
3. **Choose the visualization type** — set it to **Heatmap** from the right-hand panel.
4. **Write the query** to pull GPU utilization. Use the metric name **DCGM_FI_DEV_GPU_UTIL** and filter by your GPU host or cluster. For example, you might filter by a job name like **nvidia_gpu_exporter**.
5. **Configure the Y-axis** to show GPU device IDs (e.g., **gpu0**, **gpu1**, **gpu2**). This tells you which GPU is being visualized.
6. **Set the X-axis** to **Time** — this is automatic in Grafana.
7. **Adjust color scheme** — choose a **red-yellow-green** palette. Red = high utilization, green = low utilization.
8. **Set the bucket size** — for utilization, a bucket size of **10%** works well (0-10%, 10-20%, etc.).
9. **Name the panel** something like **GPU Utilization Heatmap — Last 6 Hours**.

### 🕵️ Reading the Heatmap
- **Dark red blocks** = GPU is near 100% utilization
- **Blue or green blocks** = GPU is idle or lightly used
- **Vertical stripes** = a single GPU spiking over time
- **Horizontal bands** = a GPU consistently at a certain utilization level

---

## 📈 Memory Trend Chart — Watching Memory Consumption Over Time

A time-series line chart shows how GPU memory usage changes. This helps you spot memory leaks or sudden allocation spikes.

### ⚙️ What You Need
- Same Prometheus data source
- DCGM metric **DCGM_FI_DEV_FB_USED** (framebuffer memory used, in bytes)
- Optional: **DCGM_FI_DEV_FB_TOTAL** for total memory per GPU

### 🛠️ Building the Memory Trend Panel

1. **Add another new panel** in your dashboard.
2. **Select visualization type** — choose **Time series** (line chart).
3. **Write the query** for memory used. Use **DCGM_FI_DEV_FB_USED** and filter by GPU device ID. You may want to convert bytes to gigabytes by dividing by **1,073,741,824** (1024³) in the query.
4. **Add a second query** for total memory (optional). Use **DCGM_FI_DEV_FB_TOTAL** and apply the same byte-to-GB conversion.
5. **Configure the legend** — show the GPU device name (e.g., **gpu0**, **gpu1**) so each line is labeled.
6. **Set Y-axis unit** to **gigabytes** (under **Standard options** → **Unit** → **Data** → **bytes(SI)** → then scale to **gigabytes**).
7. **Add a threshold** — draw a horizontal line at 80% of total memory to warn when a GPU is nearly full. Set the threshold value to **0.8 * total_memory_in_GB**.
8. **Name the panel** **GPU Memory Usage — Last 24 Hours**.

### 🕵️ Reading the Trend Chart
- **Steady upward slope** = memory leak or growing workload
- **Flat line near top** = GPU is memory-bound
- **Sudden spikes** = batch job launching or data loading
- **Drops** = job completion or memory cleanup

---

## 📋 Comparison Table: Heatmap vs. Trend Chart

| Feature | GPU Utilization Heatmap | Memory Trend Chart |
|---------|------------------------|---------------------|
| **Best for** | Spotting idle vs. busy GPUs across time | Tracking memory consumption patterns |
| **X-axis** | Time | Time |
| **Y-axis** | GPU device IDs | Memory in GB |
| **Color meaning** | Utilization intensity (red = high) | N/A (line chart) |
| **Multiple GPUs** | Yes, all shown at once | Yes, one line per GPU |
| **Alert use** | Underutilization or overutilization | Memory leaks or near-full GPUs |

---

## 🛠️ Tips for New Engineers

- **Start with one GPU** — build your heatmap or trend chart for a single GPU first, then expand to all GPUs.
- **Use template variables** — create a variable for **hostname** or **gpu_id** so you can switch between GPUs without editing the panel.
- **Set a reasonable time range** — 6 hours for heatmaps (to see patterns), 24 hours for memory trends (to catch leaks).
- **Add a legend** — always label your lines or heatmap cells so you know which GPU is which.
- **Test with real data** — run a GPU-intensive job (like a small AI training script) and watch your panels update live.

---

## ✅ Summary

You now know how to build two powerful custom Grafana panels:

- **GPU Utilization Heatmap** — visualizes which GPUs are hot or cold over time
- **Memory Trend Chart** — tracks memory usage per GPU to catch leaks or spikes

These panels turn raw DCGM metrics into actionable visuals, helping you keep your AI cluster healthy and efficient. As you get comfortable, experiment with combining both panels on a single dashboard for a complete GPU health overview.