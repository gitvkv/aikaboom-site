# 34.1e On-demand vs. reserved vs. spot/preemptible pricing strategies for AI workloads

#### 🏷️ The Virtualization and Cloud — Extending AI Infrastructure Beyond Bare Metal > 34 Cloud AI Infrastructure — AWS, Azure, GCP, and Oracle > 34.1 GPU Instance Types Across Clouds

## 🌐 Context Introduction

When running AI workloads in the cloud, one of the most important decisions you'll make is how to pay for your GPU instances. Cloud providers offer three main pricing models: **on-demand**, **reserved**, and **spot/preemptible**. Each model has different trade-offs between cost, flexibility, and reliability. Understanding these differences helps you optimize your AI infrastructure budget while keeping your training and inference jobs running smoothly.

---

## ⚙️ On-Demand Pricing

**On-demand** is the most straightforward pricing model. You pay for compute capacity by the hour (or second) with no long-term commitments.

- **How it works**: You launch a GPU instance, use it for as long as you need, and stop paying when you terminate it.
- **Best for**: Short-term experiments, development, testing, or unpredictable workloads.
- **Cost**: Highest per-hour rate among the three models.
- **Flexibility**: Maximum — you can start and stop instances at any time.
- **Availability**: Guaranteed — your instance will run until you stop it.

**Example use case**: A data scientist testing a new model architecture for a few hours. They can launch an on-demand GPU instance, run their experiment, and shut it down immediately after.

---

## 📊 Reserved Pricing

**Reserved instances** (also called reserved capacity or committed use) involve signing a contract for a specific instance type in a specific region for a term of 1 or 3 years.

- **How it works**: You commit to paying for a GPU instance for a set period, regardless of whether you use it.
- **Best for**: Steady-state production workloads, long-running training jobs, or services that must run 24/7.
- **Cost**: Significant discount (40–70% off on-demand rates).
- **Flexibility**: Low — you are locked into a specific instance type and region.
- **Availability**: Guaranteed — your capacity is reserved.

**Example use case**: A production inference service that needs to serve predictions around the clock. The team reserves GPU instances for the entire year to save costs.

---

## 🕵️ Spot/Preemptible Pricing

**Spot instances** (AWS/GCP) or **preemptible VMs** (GCP) offer unused cloud capacity at heavily discounted rates. The trade-off is that the cloud provider can reclaim this capacity at any time with short notice.

- **How it works**: You bid on spare compute capacity. Your instance runs until the provider needs the capacity back (typically with a 30-second to 2-minute warning).
- **Best for**: Fault-tolerant, interruptible workloads like hyperparameter tuning, batch processing, or distributed training with checkpointing.
- **Cost**: Lowest per-hour rate (60–90% off on-demand).
- **Flexibility**: High — you can launch and terminate instances freely.
- **Availability**: Not guaranteed — your instance can be terminated at any moment.

**Example use case**: A team running hundreds of parallel hyperparameter sweeps. If some instances are preempted, the remaining ones continue, and the interrupted jobs restart from the last checkpoint.

---

## 🛠️ Comparison Table

| Feature | On-Demand | Reserved | Spot/Preemptible |
|---------|-----------|----------|------------------|
| **Cost** | Highest | Medium (40–70% discount) | Lowest (60–90% discount) |
| **Commitment** | None | 1 or 3 years | None |
| **Availability** | Guaranteed | Guaranteed | Not guaranteed |
| **Flexibility** | Maximum | Low | High |
| **Best for** | Short-term, unpredictable workloads | Steady-state, production workloads | Fault-tolerant, interruptible workloads |
| **Interruption risk** | None | None | High |

---

## 💡 Strategies for AI Workloads

Here are practical strategies for combining these pricing models:

### 🧪 Development and Experimentation
- Use **on-demand** instances for short experiments and debugging.
- Keep costs low by shutting down instances when not in use.

### 🏭 Production Training
- Use **reserved** instances for long-running training jobs that must complete on schedule.
- Supplement with **spot** instances for additional parallel workers (with checkpointing).

### 🚀 Hyperparameter Tuning
- Use **spot/preemptible** instances for the bulk of your tuning jobs.
- Use **on-demand** for the final validation runs to ensure completion.

### 🌐 Inference Serving
- Use **reserved** instances for baseline capacity that handles steady traffic.
- Use **on-demand** or **spot** instances to handle traffic spikes.

---

## 🧠 Key Takeaways for New Engineers

- **Always start with on-demand** when you are learning or testing. It gives you maximum flexibility.
- **Move to reserved** once you know your workload patterns and need to run consistently.
- **Use spot/preemptible** for any workload that can handle interruptions — this is where you save the most money.
- **Combine models** for the best results. A mixed strategy often provides the right balance of cost and reliability.
- **Implement checkpointing** in your training code so that spot/preemptible interruptions don't waste progress.

---

## 📝 Summary

| Pricing Model | When to Use | Cost Savings |
|---------------|-------------|--------------|
| On-Demand | Short-term, unpredictable workloads | 0% (baseline) |
| Reserved | Steady-state, production workloads | 40–70% |
| Spot/Preemptible | Fault-tolerant, interruptible workloads | 60–90% |

By understanding these three pricing strategies, you can design an AI infrastructure that is both cost-effective and reliable — a key skill for any engineer working with cloud-based AI workloads.