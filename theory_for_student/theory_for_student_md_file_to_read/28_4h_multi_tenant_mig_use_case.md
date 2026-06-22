# 28.4h Multi-tenant SaaS use case: giving different customers their own H100 slice

#### 🏷️ The Cluster Orchestration — Managing the GPU Fleet at Scale > 28 Advanced GPU Resource Management — MIG, MPS, and Time-Slicing > 28.4 Multi-Instance GPU (MIG) — Hardware-Level GPU Partitioning

## 📖 Context Introduction

Imagine you run a cloud service where multiple customers (tenants) share a single powerful NVIDIA H100 GPU. Each customer expects dedicated performance, isolation, and security — as if they owned the entire GPU. This is the core challenge of a **multi-tenant SaaS** environment.

NVIDIA's **Multi-Instance GPU (MIG)** technology solves this by physically partitioning one H100 GPU into up to seven smaller, fully isolated GPU instances. Each instance has its own memory, cache, and compute units — no sharing, no interference. This guide walks you through how to give each customer their own H100 slice using MIG.

---

## ⚙️ What is MIG and Why Does It Matter for SaaS?

MIG is a hardware-level feature on NVIDIA H100 (and A100) GPUs that splits a single GPU into multiple independent instances.

- **Each instance behaves like a separate GPU** — with dedicated memory, L2 cache, and compute engines.
- **No performance interference** — one customer's workload cannot affect another's.
- **Hardware isolation** — security boundaries are enforced at the silicon level.
- **Flexible sizing** — you can create different instance sizes (e.g., 1g.10gb, 2g.20gb, 3g.40gb, 4g.40gb, 7g.80gb).

For a SaaS platform, this means you can:
- Offer tiered GPU plans (small, medium, large) to different customers.
- Guarantee resource availability for each tenant.
- Maximize GPU utilization across your fleet.

---

## 🛠️ How to Set Up MIG for Multi-Tenant SaaS

### Step 1: Enable MIG Mode on the GPU

First, you must enable MIG mode on the physical GPU. This is done at the system level.

- **Enable MIG mode**: Use the NVIDIA management tool to set MIG mode to enabled.
- **Verify MIG status**: Check that MIG mode is active and the GPU is ready for partitioning.

### Step 2: Define GPU Instance Profiles

Each customer needs a specific slice. You define these as **GPU Instance (GI) profiles**. Common profiles for H100 include:

| Profile Name | Memory | Compute Slices | Use Case Example |
|--------------|--------|----------------|------------------|
| 1g.10gb | 10 GB | 1 | Light inference, small batch jobs |
| 2g.20gb | 20 GB | 2 | Medium model training, batch inference |
| 3g.40gb | 40 GB | 3 | Large model fine-tuning |
| 4g.40gb | 40 GB | 4 | Multi-model serving |
| 7g.80gb | 80 GB | 7 | Full GPU for single tenant |

### Step 3: Create GPU Instances for Each Customer

For each tenant, you create a dedicated GPU instance using the appropriate profile.

- **Create a GPU instance**: Specify the profile (e.g., 1g.10gb) and assign it a unique ID.
- **Create a compute instance**: Inside each GPU instance, create a compute instance (CI) that the customer's workload will use.

### Step 4: Assign Customers to Their GPU Instances

Once instances are created, map each customer to their dedicated slice.

- **Customer A** gets GPU instance 0 (1g.10gb).
- **Customer B** gets GPU instance 1 (2g.20gb).
- **Customer C** gets GPU instance 2 (3g.40gb).

Each customer sees only their own instance — they cannot see or access other instances.

### Step 5: Run Workloads on Customer Slices

Customers run their AI workloads (training, inference, etc.) directly on their assigned GPU instance.

- **Customer A runs a small model**: Uses 10 GB memory, no impact on others.
- **Customer B runs a medium model**: Uses 20 GB memory, fully isolated.
- **Customer C runs a large model**: Uses 40 GB memory, dedicated compute.

---

## 📊 Comparison: MIG vs. Other Multi-Tenant Approaches

| Feature | MIG (Hardware Partitioning) | Time-Slicing (Software Sharing) | MPS (Software Sharing) |
|---------|-----------------------------|----------------------------------|------------------------|
| **Isolation** | Hardware-level, full isolation | Software-level, partial isolation | Software-level, partial isolation |
| **Performance Guarantee** | Yes, dedicated resources | No, resources are time-shared | No, resources are shared |
| **Security** | High (hardware boundaries) | Medium (software boundaries) | Medium (software boundaries) |
| **Max Instances per GPU** | Up to 7 on H100 | Unlimited (but performance degrades) | Up to 48 on H100 |
| **Best For** | SaaS with strict SLAs | Batch jobs, low-priority tasks | High-throughput inference |

---

## 🕵️ Monitoring and Managing Customer Slices

As an engineer managing the fleet, you need visibility into each customer's slice.

- **Check instance status**: Verify that all GPU instances are active and healthy.
- **Monitor memory usage**: Ensure no customer exceeds their allocated memory.
- **Track compute utilization**: See if a customer is using their full compute slice.
- **Detect failures**: Identify if a GPU instance has crashed or needs resetting.

### Common Monitoring Metrics

- **GPU Instance ID**: Unique identifier for each customer's slice.
- **Memory Used vs. Allocated**: How much of the 10 GB, 20 GB, etc. is in use.
- **Compute Utilization %**: How busy the compute engines are.
- **Error Counts**: Any hardware errors on that specific slice.

---

## 🚀 Best Practices for Multi-Tenant SaaS with MIG

- **Start with smaller slices**: Test with 1g.10gb profiles before scaling up.
- **Use a scheduler**: Integrate MIG with Kubernetes or Slurm to automate instance creation and customer assignment.
- **Set resource limits**: Even with MIG, enforce container-level limits (CPU, memory) for additional safety.
- **Plan for GPU failures**: If a physical GPU fails, all its MIG instances go down. Have redundancy across multiple GPUs.
- **Monitor tenant isolation**: Regularly verify that one customer cannot access another's data or compute.

---

## ✅ Summary

MIG transforms one H100 GPU into a multi-tenant powerhouse. Each customer gets their own hardware-isolated slice with guaranteed performance and security. For a SaaS platform, this means:

- **Predictable performance** — no noisy neighbors.
- **Strong security** — hardware-level isolation.
- **Flexible pricing** — offer different GPU sizes.
- **High utilization** — fill the GPU with multiple tenants.

By following the steps above, you can confidently give each customer their own H100 slice, turning a single GPU into a profitable, scalable SaaS offering.