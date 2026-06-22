# 32.3a BCM user and project management: creating accounts, setting GPU quotas

#### 🏷️ The Virtualization and Cloud — Extending AI Infrastructure Beyond Bare Metal > 32 Enterprise Cluster Management — NVIDIA Base Command Manager > 32.3 Workload Management with BCM

Welcome, new engineer! This section introduces you to managing users and projects in NVIDIA Base Command Manager (BCM). Think of BCM as the "air traffic control" for your AI cluster — it decides who gets to run jobs and how many GPUs they can use. Understanding user and project management is essential for keeping your AI infrastructure organized, fair, and secure.

---

## 🧭 Context: Why User & Project Management Matters

In a shared AI cluster, multiple engineers and teams need access to GPUs. Without proper management, one user could consume all resources, leaving others stuck. BCM solves this by:

- **Creating accounts** so only authorized people can submit jobs.
- **Organizing users into projects** (e.g., "Research Team A" or "Production Inference").
- **Setting GPU quotas** to limit how many GPUs a user or project can use at once.

This ensures fair resource sharing, cost tracking, and operational stability.

---

## ⚙️ Creating User Accounts in BCM

User accounts in BCM are like keys to the cluster. Each user gets a unique identity that BCM uses to track their jobs and resource usage.

- **What you need to create a user:** A username, a home directory path, and optionally a default project assignment.
- **How it works:** BCM stores user information in its internal database, which syncs with the cluster's scheduler (like Slurm or LSF).
- **Key details:**
  - Each user must have a unique username.
  - Users can belong to one or more projects.
  - BCM can create local accounts or integrate with existing LDAP/Active Directory systems.

> **Example user creation flow:**  
> You specify a username (e.g., `alice`), a home directory (e.g., `/home/alice`), and assign her to a project called `research`. BCM then creates the account and sets up her environment.

---

## 📂 Managing Projects in BCM

Projects are logical groups that bundle users, resources, and quotas together. They help you organize work by team, department, or purpose.

- **Why use projects?** They simplify billing, resource allocation, and access control.
- **Project properties:**
  - **Name:** A unique identifier (e.g., `nlp-team`).
  - **Members:** A list of usernames belonging to the project.
  - **Quota:** The maximum number of GPUs the entire project can use simultaneously.
  - **Priority:** Determines which project gets resources first when there's contention.

| Concept | Purpose | Example |
|---------|---------|---------|
| User Account | Individual identity for job submission | `alice` |
| Project | Group of users with shared resources | `nlp-team` |
| GPU Quota | Limit on GPU usage per user or project | Max 8 GPUs for `nlp-team` |

---

## 🛠️ Setting GPU Quotas

GPU quotas prevent any single user or project from monopolizing the cluster. You can set quotas at two levels:

1. **Per-user quota:** Limits how many GPUs a specific user can use at once.
2. **Per-project quota:** Limits how many GPUs the entire project can use collectively.

- **How quotas work:** When a user submits a job requesting GPUs, BCM checks the quota. If the request would exceed the limit, the job waits until GPUs are freed.
- **Best practices:**
  - Set per-user quotas to prevent one person from taking all GPUs.
  - Set per-project quotas to ensure fair distribution across teams.
  - Adjust quotas dynamically based on cluster load or business needs.

> **Example quota scenario:**  
> Project `research` has a quota of 16 GPUs. User `bob` has a personal quota of 4 GPUs. If `bob` tries to submit a job requesting 6 GPUs, BCM will reject it because it exceeds his personal limit — even if the project still has available capacity.

---

## 🕵️ Verification and Monitoring

After setting up users, projects, and quotas, you should verify everything is working correctly.

- **Check user existence:** BCM provides a way to list all registered users and their details.
- **View project members:** You can see which users belong to which project.
- **Inspect current quotas:** BCM shows the configured limits for each user and project.
- **Monitor usage:** BCM tracks how many GPUs each user/project is currently using versus their quota.

> **Example verification output:**  
> User `alice` — Project: `research` — GPU Quota: 4 GPUs — Currently Using: 2 GPUs

---

## ✅ Summary

| Task | Key Takeaway |
|------|--------------|
| Creating accounts | Each user gets a unique identity to access the cluster. |
| Managing projects | Projects group users and resources for easier administration. |
| Setting GPU quotas | Quotas ensure fair GPU distribution and prevent resource hogging. |
| Verification | Always check that users, projects, and quotas are correctly applied. |

You now have the foundational knowledge to manage users and GPU quotas in BCM. This keeps your AI cluster organized, fair, and ready for everyone to do their best work.