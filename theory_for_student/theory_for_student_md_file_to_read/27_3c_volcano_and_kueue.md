# 27.3c Volcano and KUEUE: batch scheduling frameworks for multi-GPU training jobs in K8s

#### 🏷️ The Cluster Orchestration — Managing the GPU Fleet at Scale > 27 Kubernetes for AI — NVIDIA GPU and Network Operators > 27.3 Running AI Training Jobs in Kubernetes

## 🧠 Context Introduction

When running AI training jobs in Kubernetes, standard Kubernetes scheduling has limitations. It treats each pod independently and doesn't understand the special needs of multi-GPU training jobs — like gang scheduling (all pods must start together) or queue management (fairly sharing GPU resources across teams). This is where **Volcano** and **KUEUE** come in. They are batch scheduling frameworks that extend Kubernetes to handle these complex AI workloads efficiently.

---

## ⚙️ What is Volcano?

Volcano is a batch scheduling system designed for high-performance workloads like AI, machine learning, and big data. It adds advanced scheduling capabilities to Kubernetes.

**Key features of Volcano:**
- **Gang scheduling** — Ensures all pods of a distributed training job start at the same time (critical for multi-GPU jobs)
- **Queue management** — Organizes jobs into queues with resource quotas
- **Fair sharing** — Distributes GPU resources fairly among different teams or projects
- **Task topology** — Understands relationships between pods (e.g., parameter server vs. worker)
- **Preemption** — Can preempt lower-priority jobs to make room for higher-priority ones

**How Volcano works at a high level:**
- You define a **Queue** (a resource pool with limits)
- You submit a **Job** (a group of pods that must run together)
- Volcano ensures all pods in the job are scheduled simultaneously or not at all
- Volcano manages resource sharing across multiple queues

---

## 📊 What is KUEUE?

KUEUE (pronounced "queue") is a Kubernetes-native job queueing system. It manages batch jobs as a unit, controlling how many jobs run at once and how resources are shared.

**Key features of KUEUE:**
- **Resource quotas** — Defines how much GPU, CPU, and memory each team can use
- **Job admission** — Controls which jobs are allowed to start based on available resources
- **Fair sharing** — Distributes resources proportionally among different users or teams
- **Priority classes** — Higher-priority jobs can skip ahead in the queue
- **Cluster-level and namespace-level quotas** — Manage resources at different scopes

**How KUEUE works at a high level:**
- You create a **ResourceFlavor** (defines available hardware like A100 GPUs)
- You create a **ClusterQueue** (a pool of resources with limits)
- You create a **LocalQueue** (a namespace-scoped queue that points to a ClusterQueue)
- You submit jobs to the LocalQueue
- KUEUE decides when each job can start based on available resources and priority

---

## 🛠️ Volcano vs. KUEUE — When to Use Which

| Feature | Volcano | KUEUE |
|---------|---------|-------|
| **Primary focus** | Advanced scheduling (gang, topology) | Job queueing and resource management |
| **Gang scheduling** | ✅ Built-in | ❌ Not natively supported |
| **Queue management** | ✅ Yes | ✅ Yes |
| **Fair sharing** | ✅ Yes | ✅ Yes |
| **Priority & preemption** | ✅ Yes | ✅ Yes |
| **Multi-framework support** | Spark, TensorFlow, PyTorch, MPI | Any batch job (Job, PyTorchJob, etc.) |
| **Best for** | Complex distributed training jobs | General batch job queueing across teams |

---

## 🕵️ How They Work Together

In many production environments, engineers use **both** Volcano and KUEUE together:

1. **KUEUE manages the queue** — It controls which jobs are admitted based on resource quotas and priority
2. **Volcano handles the scheduling** — Once a job is admitted, Volcano ensures gang scheduling and optimal placement of pods across GPU nodes

**Typical workflow:**
- A team submits a PyTorch training job to a **LocalQueue** in their namespace
- KUEUE checks if resources are available in the **ClusterQueue**
- If resources are available, KUEUE admits the job and marks it as ready
- Volcano then takes over and schedules all pods of that job simultaneously across GPU nodes
- If resources are not available, the job waits in the queue until resources free up

---

## 📦 Key Concepts to Remember

**For Volcano:**
- **Queue** — A named resource pool with minimum and maximum resource limits
- **Job** — A group of pods that must be scheduled together (gang scheduling)
- **Task** — A group of pods that share the same template (e.g., all workers)
- **PodGroup** — The underlying Kubernetes resource that Volcano creates to track gang scheduling

**For KUEUE:**
- **ResourceFlavor** — Defines a type of hardware resource (e.g., NVIDIA A100 GPU)
- **ClusterQueue** — A cluster-wide pool of resources with quotas
- **LocalQueue** — A namespace-scoped queue that points to a ClusterQueue
- **Workload** — The KUEUE object that tracks a job's status in the queue

---

## 🚀 Practical Example Scenario

Imagine a Kubernetes cluster with 8 NVIDIA A100 GPUs shared by two teams:

**Team A** has a high-priority training job requiring 4 GPUs (gang scheduled)
**Team B** has a lower-priority job requiring 2 GPUs

**Without KUEUE and Volcano:**
- Both jobs might start at the same time, causing resource contention
- The 4-GPU job might fail if all 4 GPUs aren't available simultaneously

**With KUEUE and Volcano:**
- KUEUE admits Team A's job first (higher priority)
- Volcano schedules all 4 pods of Team A's job at once on 4 GPUs
- Team B's job waits until Team A's job finishes
- Once Team A's job completes, KUEUE admits Team B's job
- Volcano schedules Team B's 2 pods on available GPUs

---

## ✅ Summary

- **Volcano** is for advanced scheduling needs like gang scheduling and task topology
- **KUEUE** is for managing job queues and resource quotas across teams
- **Together**, they provide a complete solution for running multi-GPU training jobs in Kubernetes
- Engineers use both to ensure fair resource sharing, efficient GPU utilization, and reliable job execution

Both frameworks are open-source and widely adopted in AI infrastructure environments. Learning them is essential for managing GPU clusters at scale.