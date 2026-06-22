# 36.1f Domain 6 analysis: The Cluster Orchestration — GPU Operator and MIG deep dives

#### 🏷️ The Exam Preparation & Certification Mastery > 36 NCA-AIIO Blueprint Deep Dive — Domain-by-Domain Analysis > 36.1 Official Exam Blueprint Domain Breakdown and Weightings

Welcome, new engineer! This section of the NCA-AIIO blueprint focuses on how we manage GPU resources at scale inside Kubernetes clusters. You will learn about two critical tools: the **NVIDIA GPU Operator** (which automates GPU management) and **Multi-Instance GPU (MIG)** (which splits a single physical GPU into smaller, isolated partitions). Let's break these down simply.

---

## 🧭 Context: Why Cluster Orchestration Matters

In modern AI infrastructure, you rarely run workloads on a single machine. Instead, you use a cluster of servers managed by Kubernetes. The challenge is that GPUs are specialized hardware that Kubernetes does not natively understand. The **GPU Operator** bridges this gap, while **MIG** helps you maximize utilization by sharing a GPU among multiple smaller jobs.

---

## ⚙️ Section 1: The NVIDIA GPU Operator — What It Does

The GPU Operator is a Kubernetes "operator" (a custom controller) that automates everything needed to make GPUs available to your containers.

**Key responsibilities of the GPU Operator:**

- **Driver Management:** Automatically installs and upgrades the NVIDIA driver on each node in the cluster.
- **Container Runtime Integration:** Configures the container runtime (like containerd or CRI-O) to recognize GPU devices.
- **Device Plugin Deployment:** Deploys the NVIDIA device plugin, which tells Kubernetes how many GPUs are available on each node.
- **Monitoring & Health Checks:** Sets up tools like DCGM (Data Center GPU Manager) to monitor GPU health and performance.
- **MIG Support:** Enables and configures MIG partitions automatically (more on this below).

**How it simplifies your life:**

- Without the GPU Operator, you would need to manually install drivers, configure the runtime, and manage device plugins on every node.
- With the GPU Operator, you simply install it once via Helm, and it handles the rest.

---

## 🛠️ Section 2: Deep Dive — GPU Operator Components

The GPU Operator is not a single piece of software; it is a collection of containers and controllers that work together.

**Core components of the GPU Operator:**

- **Operator Lifecycle Manager (OLM):** The brain that watches for custom resources and reconciles the desired state.
- **Node Feature Discovery (NFD):** Detects which nodes have GPUs and labels them automatically.
- **GPU Feature Discovery:** Identifies specific GPU capabilities (e.g., MIG support, driver version).
- **NVIDIA Container Toolkit:** Provides the `nvidia-container-runtime` so containers can access GPUs.
- **DCGM Exporter:** Exports GPU metrics (temperature, memory usage, power) to Prometheus.
- **MIG Manager:** Handles partitioning of GPUs into MIG devices.

**Installation flow (simplified):**

1. You install the GPU Operator using a Helm chart.
2. The operator deploys NFD to label nodes with GPU presence.
3. It installs the NVIDIA driver on each GPU node (if not already present).
4. It configures the container runtime and deploys the device plugin.
5. Finally, it deploys monitoring and MIG management components.

---

## 🕵️ Section 3: Multi-Instance GPU (MIG) — The Basics

MIG is a feature available on NVIDIA Ampere and later architectures (e.g., A100, H100). It allows you to partition a single physical GPU into up to seven smaller, fully isolated GPU instances.

**Why MIG matters:**

- **Better Utilization:** Instead of running one large job that uses 100% of a GPU, you can run multiple smaller jobs on the same GPU.
- **Isolation:** Each MIG instance has its own dedicated memory, cache, and compute units. One job cannot interfere with another.
- **Cost Efficiency:** You pay for one physical GPU but get multiple virtual GPUs.

**MIG profiles (example for A100 80GB):**

- **1g.5gb:** 1 compute slice, 5 GB memory (smallest profile)
- **2g.10gb:** 2 compute slices, 10 GB memory
- **3g.20gb:** 3 compute slices, 20 GB memory
- **4g.20gb:** 4 compute slices, 20 GB memory
- **7g.40gb:** 7 compute slices, 40 GB memory (largest profile)

---

## 📊 Section 4: MIG Deep Dive — How It Works with Kubernetes

MIG is powerful, but it adds complexity. The GPU Operator handles this complexity for you.

**How MIG is configured in a cluster:**

1. **Enable MIG on the GPU:** The GPU Operator can set the MIG mode on each GPU (enabled or disabled).
2. **Define MIG profiles:** You create a `MigConfig` custom resource that specifies which profiles to create on each GPU.
3. **Expose MIG devices:** The device plugin then advertises each MIG instance as a separate "GPU" to Kubernetes.
4. **Schedule workloads:** Your pods request a specific MIG profile using a resource label (e.g., `nvidia.com/mig-1g.5gb`).

**Comparison: Without MIG vs. With MIG**

| Aspect | Without MIG | With MIG |
|--------|-------------|----------|
| GPU sharing | One pod gets the entire GPU | Multiple pods share one GPU |
| Isolation | None (if sharing via time-slicing) | Full hardware isolation |
| Resource granularity | Whole GPU only | Fine-grained (e.g., 5GB slices) |
| Use case | Large training jobs | Inference, small batch jobs |
| Complexity | Simple | Requires MIG-aware scheduling |

---

## 🧰 Section 5: Practical Considerations for New Engineers

**When to use the GPU Operator:**

- You are managing a Kubernetes cluster with NVIDIA GPUs.
- You want to automate driver updates and runtime configuration.
- You need MIG support without manual configuration.

**When to use MIG:**

- You have A100 or H100 GPUs and run many small inference jobs.
- You want to maximize GPU utilization without sacrificing isolation.
- You need guaranteed performance for each workload (no noisy neighbors).

**Common pitfalls to avoid:**

- **Forgetting to label nodes:** The GPU Operator relies on NFD labels. If nodes are not labeled correctly, GPUs will not be discovered.
- **Using MIG with incompatible workloads:** Some workloads (e.g., NCCL-based multi-GPU training) do not work well with MIG because they expect direct GPU-to-GPU communication.
- **Over-provisioning MIG instances:** Creating too many small MIG instances can lead to memory fragmentation and reduced performance.

---

## ✅ Summary: Key Takeaways for the Exam

- The **GPU Operator** automates GPU management in Kubernetes — drivers, runtime, device plugin, and monitoring.
- **MIG** splits a physical GPU into isolated partitions, each with dedicated resources.
- The GPU Operator includes a **MIG Manager** that handles MIG configuration automatically.
- MIG profiles are defined by compute slices and memory (e.g., `1g.5gb`, `7g.40gb`).
- Use MIG when you need **isolation** and **fine-grained resource allocation** for inference workloads.
- Avoid MIG for workloads that require **direct GPU-to-GPU communication** (e.g., distributed training).

You now have a solid foundation for understanding how cluster orchestration works with GPUs. Remember: the GPU Operator is your automation friend, and MIG is your efficiency tool. Use them wisely!