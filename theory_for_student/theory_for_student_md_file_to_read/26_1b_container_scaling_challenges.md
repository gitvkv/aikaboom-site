# 26.1b The problem with running containers manually at scale: scheduling, failure, upgrades

#### 🏷️ The Cluster Orchestration — Managing the GPU Fleet at Scale > 26 Kubernetes Fundamentals — Container Orchestration from Scratch > 26.1 Why Kubernetes Exists — The Problem of Scale

---

## 🧭 Context Introduction

Imagine you have a single GPU server running a few AI training containers. You can easily start them, check their logs, and restart them if they crash. Now imagine scaling that to 100 servers with 1,000 containers running different AI workloads — training models, serving inference, preprocessing data. Doing this manually becomes impossible. This section explains the three core problems that emerge when you try to run containers manually at scale: **scheduling**, **failure handling**, and **upgrades**.

---

## ⚙️ The Scheduling Problem — Where Does Each Container Go?

When you have many containers and many servers, you need to decide which container runs on which server. Doing this manually leads to chaos.

**Key issues with manual scheduling:**

- **Resource imbalance**: Some servers become overloaded with GPU-intensive training jobs, while others sit idle.
- **GPU affinity conflicts**: Two containers might both need the same GPU, causing conflicts or performance degradation.
- **Manual placement errors**: Engineers might accidentally place a memory-heavy container on a server with insufficient RAM.
- **No optimization**: Without automation, you cannot optimize for factors like data locality (placing containers near their data) or network bandwidth.

**What happens in practice:**

- An engineer manually checks server utilization dashboards.
- They pick a server with available GPUs.
- They SSH into that server and run the container.
- If the container fails, they manually move it to another server.

This process is slow, error-prone, and does not scale beyond a handful of containers.

---

## 🛠️ The Failure Problem — Containers Crash, Servers Die

Containers are ephemeral by design — they can crash, run out of memory, or be killed by the OS. At scale, failures are not exceptions; they are the norm.

**Common failure scenarios:**

- **Container crashes**: A training script hits a bug and exits unexpectedly.
- **Node failures**: A server's power supply fails or its GPU driver crashes.
- **Resource exhaustion**: A container consumes all available memory and gets killed by the kernel.
- **Network partitions**: A server becomes unreachable due to network issues.

**Manual failure handling is broken:**

- Engineers must constantly monitor dashboards for red alerts.
- When a container fails, someone must manually restart it on the same or different server.
- If a server goes down, all containers on that server are lost until someone intervenes.
- There is no automatic recovery — every failure requires human attention.

**The result:** Downtime increases, AI training jobs are delayed, and engineers spend their time firefighting instead of building.

---

## 🔄 The Upgrade Problem — Updating Without Breaking Everything

AI workloads evolve constantly — new model versions, updated dependencies, or security patches require container updates. Doing this manually at scale is a nightmare.

**Challenges with manual upgrades:**

- **Rolling updates are tedious**: You must stop one container, update it, start it, verify it works, then move to the next — all manually.
- **Version conflicts**: Different containers may need different versions of libraries or CUDA drivers.
- **No rollback capability**: If an update breaks something, you must manually revert each container.
- **Downtime during upgrades**: Without automation, you often have to stop all containers to update them, causing service interruptions.

**What manual upgrades look like:**

- An engineer creates a new container image with updated code.
- They SSH into each server, stop the old container, pull the new image, and start it.
- If something goes wrong, they scramble to find the old image and restart it.
- For 100 servers, this takes hours or days.

---

## 📊 Comparison: Manual vs. Orchestrated Container Management

| Aspect | Manual Management | Orchestrated Management (e.g., Kubernetes) |
|--------|-------------------|---------------------------------------------|
| **Scheduling** | Engineer picks a server manually | Scheduler automatically places containers based on resource needs |
| **Failure handling** | Engineer detects and restarts containers manually | System automatically restarts failed containers on healthy servers |
| **Upgrades** | Engineer updates containers one by one | System performs rolling updates with automatic rollback |
| **Scalability** | Breaks beyond ~10 containers | Handles thousands of containers across hundreds of servers |
| **Resource utilization** | Often imbalanced | Optimized through bin-packing and resource quotas |
| **Recovery time** | Minutes to hours (human response) | Seconds to minutes (automated) |

---

## 🕵️ Why This Matters for AI Infrastructure

AI workloads have unique characteristics that make these problems worse:

- **GPU scarcity**: GPUs are expensive and limited. Poor scheduling wastes valuable compute resources.
- **Long-running jobs**: AI training can take days or weeks. A single failure can waste hours of compute time.
- **Dependency on drivers**: Containers need specific CUDA versions and GPU drivers. Manual upgrades risk breaking compatibility.
- **Data locality**: Training data is often large (terabytes). Moving containers to the data is better than moving data to containers — manual scheduling ignores this.

**The bottom line:** Running containers manually at scale is like trying to juggle 100 balls while riding a unicycle — it might work for a moment, but one mistake brings everything down. This is exactly why container orchestration platforms like Kubernetes exist: to automate scheduling, handle failures gracefully, and enable safe upgrades without human intervention.

---

## ✅ Key Takeaways for New Engineers

- **Scheduling** is not just about placement — it's about optimizing resource usage and avoiding conflicts.
- **Failure** is inevitable at scale — the goal is not to prevent failures but to recover from them automatically.
- **Upgrades** must be safe, incremental, and reversible — manual updates are too risky for production AI workloads.
- **Orchestration** turns these manual, error-prone tasks into automated, reliable processes.

As you learn Kubernetes, remember that every feature — from Pods and Deployments to Services and Ingress — exists to solve one of these three core problems at scale.