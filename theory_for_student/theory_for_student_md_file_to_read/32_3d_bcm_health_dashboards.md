# 32.3d Health dashboards: cluster-wide node status, GPU availability, and job history

#### 🏷️ The Virtualization and Cloud — Extending AI Infrastructure Beyond Bare Metal > 32 Enterprise Cluster Management — NVIDIA Base Command Manager > 32.3 Workload Management with BCM

---

## 📘 Context Introduction

When managing an AI cluster, you need to know three things at a glance: **are my nodes healthy?**, **are my GPUs free?**, and **what jobs have run?**. Health dashboards in NVIDIA Base Command Manager (BCM) give you a single-pane-of-glass view of all this information. For new engineers, think of these dashboards as the "instrument panel" of your AI infrastructure — they help you spot problems before they impact users and understand how your cluster is being utilized.

---

## 🖥️ Cluster-Wide Node Status

The node status dashboard shows the **health and state** of every compute node in your cluster. This is your first stop when troubleshooting performance issues or hardware failures.

### 🔍 What you'll see
- **Node name** — unique identifier for each server
- **State** — online, offline, draining, or down
- **CPU load** — current utilization percentage
- **Memory usage** — RAM consumption
- **Network health** — link status and bandwidth
- **Last heartbeat** — when BCM last heard from the node

### 🛠️ Common node states explained

| State | Meaning | What to do |
|-------|---------|------------|
| ✅ Online | Node is healthy and accepting jobs | Nothing |
| ⚠️ Draining | Node is finishing current jobs, then will go offline | Wait or check for maintenance |
| ❌ Offline | Node is intentionally taken out of service | Check maintenance schedule |
| 🔴 Down | Node is unresponsive or has hardware failure | Investigate immediately |

---

## 🎮 GPU Availability

GPU availability is the **most critical metric** in an AI cluster. The dashboard shows which GPUs are free, which are in use, and how much memory each GPU is consuming.

### 📊 Key GPU metrics displayed
- **GPU index** — physical GPU slot (e.g., GPU 0, GPU 1)
- **Utilization %** — how busy the GPU is
- **Memory used / total** — VRAM consumption
- **Temperature** — thermal status
- **Power draw** — current wattage
- **Process list** — which jobs are using the GPU

### 🕵️ How to interpret GPU availability

- **Green** = GPU is free and ready for new jobs
- **Yellow** = GPU is partially utilized (some memory free)
- **Red** = GPU is fully utilized or has an error

**Example scenario:** If you see 4 GPUs in a node, but only 2 are showing as available, you know that node can only accept half its normal workload. You might need to check what's consuming the other two GPUs.

---

## 📜 Job History

Job history provides a **complete record** of every workload that has run on your cluster. This is essential for capacity planning, debugging failed jobs, and auditing usage.

### 📋 What job history includes
- **Job ID** — unique identifier
- **User** — who submitted the job
- **Job name** — descriptive name (e.g., "training_run_v3")
- **State** — completed, failed, cancelled, or running
- **Start time** — when execution began
- **End time** — when execution finished
- **Duration** — total wall time
- **Resources used** — GPUs, CPUs, memory consumed
- **Exit code** — success (0) or error code

### 🧠 How to use job history

- **Find failed jobs** — look for non-zero exit codes and investigate logs
- **Track GPU usage** — see which users consumed the most GPU hours
- **Identify bottlenecks** — jobs that ran longer than expected may indicate resource contention
- **Plan capacity** — review peak usage times to decide when to add more nodes

---

## 🗺️ Bringing It All Together

The health dashboard is not just a collection of numbers — it's a **decision-making tool**. Here's how a new engineer might use it day-to-day:

1. **Morning check** — Look at node status to see if any nodes went down overnight
2. **Job submission** — Check GPU availability to find free resources for your workload
3. **Troubleshooting** — If a job fails, check job history for exit codes and resource usage
4. **Capacity planning** — Review weekly trends to see if you need more GPUs

---

## ✅ Key Takeaways for New Engineers

- **Node status** tells you if your hardware is healthy
- **GPU availability** shows you where you can run AI workloads
- **Job history** helps you learn from past runs and plan for the future
- These three views together give you **complete visibility** into your cluster's health and performance
- Always start with the dashboard before diving into logs or command-line tools

---

> 💡 **Pro tip:** Set up alerts for nodes that go offline or GPUs that hit high temperatures. This way, you'll know about problems before users report them.