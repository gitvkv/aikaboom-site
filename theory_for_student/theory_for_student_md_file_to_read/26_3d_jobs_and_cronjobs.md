# 26.3d Jobs and CronJobs: batch workloads with completion semantics — AI training runs

#### 🏷️ The Cluster Orchestration — Managing the GPU Fleet at Scale > 26 Kubernetes Fundamentals — Container Orchestration from Scratch > 26.3 Core Kubernetes Objects for AI Workloads

## 🌐 Context Introduction

When you run an AI training job, you don't want the container to keep running forever like a web server. Instead, you want it to train the model, save the results, and then stop. This is where **Jobs** and **CronJobs** come in. These Kubernetes objects are designed for batch workloads that have a clear start and finish — known as **completion semantics**. For new engineers, think of them as "run this task once and exit" (Job) or "run this task on a schedule" (CronJob).

---

## ⚙️ What is a Job?

A **Job** creates one or more Pods and ensures that a specified number of them successfully terminate. Once the Pods complete their work (exit with code 0), the Job is considered finished.

- **Purpose:** Run a batch task to completion (e.g., training a model, preprocessing data, running a validation script).
- **Key behavior:** The Job tracks how many Pods have completed successfully. If a Pod fails, the Job can restart it (depending on your settings).
- **Use case for AI:** A single training run that takes hours or days. You submit the Job, wait for it to complete, then collect the output (model weights, logs).

**Example scenario:** You have a training script that loads data, trains a neural network for 100 epochs, and saves the model to a shared storage volume. A Job ensures this runs exactly once.

---

## 🕐 What is a CronJob?

A **CronJob** is like a Job, but it runs on a repeating schedule. It creates Jobs at specific times, just like a cron timer on Linux.

- **Purpose:** Automate recurring batch tasks (e.g., nightly retraining, hourly data ingestion, weekly model evaluation).
- **Key behavior:** You define a schedule using standard cron syntax (e.g., `0 2 * * *` for 2 AM daily). The CronJob creates a new Job object each time the schedule fires.
- **Use case for AI:** Periodic retraining of a model with fresh data, or running daily evaluation benchmarks.

**Example scenario:** Every night at midnight, you want to retrain your recommendation model using the day's new user interactions. A CronJob creates a Job that runs the training script automatically.

---

## 📊 Comparison: Job vs. CronJob

| Feature | Job | CronJob |
|---------|-----|---------|
| **Execution** | Runs once (or a fixed number of times) | Runs on a repeating schedule |
| **Trigger** | Manual submission via API or CLI | Automatic based on cron expression |
| **Completion** | Waits for all Pods to finish | Creates a new Job each cycle |
| **AI Use Case** | Single training run, one-off data processing | Periodic retraining, scheduled evaluations |
| **Restart Policy** | Configurable (OnFailure, Never) | Inherits from the created Job |
| **History** | No automatic cleanup | Can retain or delete completed Jobs |

---

## 🛠️ How Jobs Work for AI Training Runs

When you submit an AI training Job, here's what happens under the hood:

- **Pod creation:** Kubernetes creates one or more Pods running your training container (e.g., a PyTorch or TensorFlow image).
- **Resource allocation:** The Pod requests GPUs, CPUs, and memory. The scheduler finds a node with available resources.
- **Execution:** The training script runs inside the container. It might load data from a PersistentVolume, train the model, and save checkpoints.
- **Completion:** When the script exits with code 0, the Pod terminates. The Job marks itself as complete.
- **Failure handling:** If the script crashes (non-zero exit), the Job can restart the Pod (if `restartPolicy: OnFailure`) or leave it failed (if `restartPolicy: Never`).

**Key concept — parallelism:** You can run multiple training workers in parallel by setting `spec.parallelism`. For example, you might run 4 Pods to perform hyperparameter tuning, each training a different configuration. The Job completes when all Pods finish.

---

## 🕵️ How CronJobs Automate Training Schedules

CronJobs add a scheduling layer on top of Jobs. Here's how they work:

- **Schedule definition:** You write a cron expression like `0 3 * * 1` (every Monday at 3 AM) or `*/30 * * * *` (every 30 minutes).
- **Job creation:** At each scheduled time, the CronJob controller creates a new Job object with the exact same Pod template.
- **Concurrency policy:** You control what happens if a previous Job is still running when the next schedule fires. Options include:
  - **Allow:** Run multiple Jobs concurrently (use with caution for GPU contention).
  - **Forbid:** Skip the new run if the previous one hasn't finished.
  - **Replace:** Cancel the old Job and start a new one.
- **History limits:** You can set how many successful and failed Jobs to keep (e.g., keep only the last 3 successful runs) to avoid cluttering the cluster.

**Example schedule for AI:** A CronJob that runs every Sunday at 2 AM to retrain a model with the week's data, using `Forbid` concurrency to prevent overlapping runs.

---

## 🔄 Completion Semantics Explained

The term "completion semantics" means Kubernetes treats the workload as **finite** — it has a defined end state. This is different from long-running services (like web servers) that are expected to run indefinitely.

- **For Jobs:** The end state is "all Pods succeeded." The Job object stays in the cluster (so you can inspect logs) but doesn't consume resources.
- **For CronJobs:** The end state is "the current Job finished." The CronJob then waits for the next schedule to fire.
- **Why it matters for AI:** Training runs are inherently finite. You don't want a training Pod to restart after it finishes — you want it to stop and save results. Jobs guarantee this behavior.

**Practical implication:** If your training script exits with code 0, Kubernetes will not restart it. If it crashes, you can configure automatic retries. This gives you fine-grained control over failure recovery.

---

## 📝 Best Practices for AI Training Jobs

- **Use PersistentVolumes for model outputs:** Mount a shared volume so the trained model is saved even if the Pod is deleted.
- **Set resource limits:** Always specify GPU, CPU, and memory requests/limits to avoid resource contention.
- **Enable logging:** Use sidecar containers or external logging (e.g., stdout) to capture training metrics and errors.
- **Handle preemption:** For long-running Jobs, consider using checkpointing so the Job can resume from the last saved state if interrupted.
- **Monitor with Jobs:** Use `kubectl get jobs` and `kubectl logs <pod-name>` to track progress and debug failures.

**For CronJobs specifically:**
- Set `startingDeadlineSeconds` to prevent missed schedules from piling up.
- Use `successfulJobsHistoryLimit` and `failedJobsHistoryLimit` to keep the cluster clean.
- Test the cron expression carefully — a mistyped schedule can cause unexpected behavior.

---

## 🧠 Summary

- **Jobs** are for one-time batch workloads that run to completion — perfect for a single AI training session.
- **CronJobs** are for scheduled, recurring batch workloads — ideal for automated retraining pipelines.
- Both use **completion semantics**, meaning they stop when the work is done, unlike long-running services.
- For AI training, Jobs give you control over parallelism, retries, and resource usage, while CronJobs add time-based automation.

As a new engineer, start by running a simple Job that trains a small model. Once comfortable, create a CronJob to retrain it nightly. This hands-on practice will solidify your understanding of batch workloads in Kubernetes.