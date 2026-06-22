# 17.1b InfiniBand speeds: SDR, DDR, QDR, FDR, EDR, HDR (200 Gb/s), NDR (400 Gb/s), XDR preview

#### 🏷️ The AI Data Center Networking — Moving Petabytes Without Latency > 17 InfiniBand Architecture — The Gold Standard for AI Cluster Networking > 17.1 InfiniBand Fundamentals — A Different Networking Philosophy

---

## 🌐 Context Introduction

InfiniBand is the backbone of modern AI clusters, connecting thousands of GPUs with ultra-low latency and high bandwidth. Unlike traditional Ethernet, InfiniBand was designed from the ground up for high-performance computing (HPC) and AI workloads. As an engineer new to this field, understanding InfiniBand speeds is critical — these speeds determine how fast your AI models can train and how efficiently your cluster communicates. Each generation (SDR through XDR) represents a leap in data transfer capability, directly impacting the performance of distributed training jobs.

---

## ⚙️ What Are InfiniBand Speeds?

InfiniBand speeds refer to the data transfer rate per lane (or per link) in a single direction. Each generation uses a different signaling technology to achieve higher throughput. The key metric is **Gb/s (Gigabits per second)** per lane, and most modern InfiniBand links use **4 lanes** (x4) for a total link speed.

- **SDR (Single Data Rate):** The original standard, 2.5 Gb/s per lane.
- **DDR (Double Data Rate):** Doubles the signaling rate to 5 Gb/s per lane.
- **QDR (Quad Data Rate):** Quadruples to 10 Gb/s per lane.
- **FDR (Fourteen Data Rate):** 14.0625 Gb/s per lane (often rounded to 14 Gb/s).
- **EDR (Enhanced Data Rate):** 25 Gb/s per lane.
- **HDR (High Data Rate):** 50 Gb/s per lane — commonly referred to as **200 Gb/s** for a x4 link.
- **NDR (Next Data Rate):** 100 Gb/s per lane — commonly referred to as **400 Gb/s** for a x4 link.
- **XDR (eXtreme Data Rate):** Preview stage — expected 200 Gb/s per lane, targeting **800 Gb/s** for a x4 link.

---

## 📊 Speed Comparison Table

| Generation | Per-Lane Speed | x4 Link Speed (Common) | Year Introduced |
|------------|----------------|------------------------|-----------------|
| SDR        | 2.5 Gb/s       | 10 Gb/s               | 2001            |
| DDR        | 5 Gb/s         | 20 Gb/s               | 2004            |
| QDR        | 10 Gb/s        | 40 Gb/s               | 2007            |
| FDR        | 14 Gb/s        | 56 Gb/s               | 2011            |
| EDR        | 25 Gb/s        | 100 Gb/s              | 2014            |
| HDR        | 50 Gb/s        | 200 Gb/s              | 2017            |
| NDR        | 100 Gb/s       | 400 Gb/s              | 2021            |
| XDR        | 200 Gb/s (preview) | 800 Gb/s (preview) | Expected 2025+ |

> **Note:** The "x4 link speed" is the most common configuration in AI clusters today. For example, HDR at 200 Gb/s means each cable or port delivers 200 Gbps of bandwidth in one direction.

---

## 🛠️ Why Speed Matters for AI Infrastructure

AI training involves moving massive amounts of data between GPUs. The faster the InfiniBand speed, the less time GPUs spend waiting for data. Here's how each speed tier impacts real-world AI workloads:

- **SDR/DDR/QDR:** Legacy speeds. Suitable for small clusters or older HPC systems. Not recommended for modern AI training.
- **FDR:** Still used in some older clusters. Provides 56 Gb/s per link — adequate for small-to-medium models but becomes a bottleneck for large-scale distributed training.
- **EDR:** 100 Gb/s per link. A common choice for mid-range AI clusters. Supports efficient all-reduce operations for models up to a few hundred GPUs.
- **HDR (200 Gb/s):** The current sweet spot for most AI clusters. Balances cost and performance. Handles large language models (LLMs) with thousands of GPUs effectively.
- **NDR (400 Gb/s):** The latest standard. Designed for next-generation AI supercomputers. Reduces training time for massive models (e.g., GPT-4 scale) by 2x compared to HDR.
- **XDR (800 Gb/s preview):** Future-proofing for exascale AI. Expected to support clusters with tens of thousands of GPUs without network bottlenecks.

---

## 🕵️ How to Identify InfiniBand Speed in Your Cluster

As an engineer, you'll often need to check what speed your InfiniBand adapters and switches are running at. Here's how to do it using common tools:

**Using `ibstat` (Infiniband Statistics):**

Run the command: **`ibstat`**

Look for the line that says **"Rate:"** in the output. It will show something like:
- **Rate: 200 (HDR)** — means you're running at HDR speed (200 Gb/s)
- **Rate: 400 (NDR)** — means you're running at NDR speed (400 Gb/s)

**Using `ibv_devinfo` (InfiniBand Device Info):**

Run the command: **`ibv_devinfo`**

Look for the **"link_layer:"** and **"active_speed:"** fields. The active speed will be displayed as:
- **active_speed: 25.0 Gbps (EDR)**
- **active_speed: 50.0 Gbps (HDR)**
- **active_speed: 100.0 Gbps (NDR)**

**Using `ibdiagnet` (InfiniBand Diagnostic Network Tool):**

Run the command: **`ibdiagnet -r`**

This generates a report. Look for the **"Link Speed"** column in the output. It will list each port's speed, such as:
- **Link Speed: 4X HDR**
- **Link Speed: 4X NDR**

---

## 📈 Practical Example: HDR vs NDR for AI Training

Consider a cluster with 1,000 GPUs training a large language model. The network must perform an **all-reduce** operation after each training step to synchronize gradients.

- **With HDR (200 Gb/s):** The all-reduce completes in approximately **1.2 seconds** per step.
- **With NDR (400 Gb/s):** The all-reduce completes in approximately **0.6 seconds** per step.

This 2x improvement in network speed directly translates to **2x faster training** for communication-bound workloads. For a model that takes 10 days to train on HDR, NDR would reduce it to 5 days.

---

## 🔮 XDR Preview — What's Coming Next

XDR (eXtreme Data Rate) is currently in preview and development. Key details:

- **Per-lane speed:** 200 Gb/s
- **x4 link speed:** 800 Gb/s
- **Expected benefits:** Enables clusters with 100,000+ GPUs without network bottlenecks. Supports future AI models with trillions of parameters.
- **Challenges:** Requires new optical transceivers and switch silicon. Higher power consumption per port.
- **Availability:** Expected in production systems around 2025–2026.

As an engineer, you should start planning for XDR if you're building a cluster that will operate for 5+ years. Backward compatibility is maintained — XDR switches can run at NDR or HDR speeds with appropriate cables.

---

## ✅ Key Takeaways for New Engineers

- InfiniBand speeds double approximately every 3-4 years (SDR → DDR → QDR → FDR → EDR → HDR → NDR → XDR).
- **HDR (200 Gb/s)** is the current standard for most AI clusters.
- **NDR (400 Gb/s)** is the latest generation, offering 2x bandwidth over HDR.
- **XDR (800 Gb/s preview)** is the future, targeting exascale AI workloads.
- Always check the **Rate** or **active_speed** field in tools like **`ibstat`** or **`ibv_devinfo`** to confirm your cluster's speed.
- Faster speeds reduce training time for communication-heavy AI models, directly impacting your cluster's productivity.

---

*Next topic: 17.1c InfiniBand topologies — fat-tree, dragonfly, and hypercube*