# 35.3a RBAC (Role-Based Access Control): controlling who can submit GPU jobs

#### 🏷️ The AI Infrastructure Security & Compliance > 35 Securing the AI Infrastructure Stack > 35.3 Kubernetes Security for AI Clusters

---

## 🔍 Context Introduction

In an AI cluster, GPU resources are expensive and limited. Without proper controls, anyone on the team could accidentally (or intentionally) submit jobs that consume all available GPUs, blocking critical training workloads. **Role-Based Access Control (RBAC)** is the mechanism that lets you define **who** can do **what** with GPU resources in Kubernetes. Think of it as a security guard at the door of your GPU cluster — only people with the right badge (role) can enter and submit jobs.

---

## ⚙️ What is RBAC in Kubernetes?

RBAC is a built-in Kubernetes authorization method that controls access to the API server. It works by:

- **Users or Service Accounts** (who is making the request)
- **Roles or ClusterRoles** (what permissions they have)
- **RoleBindings or ClusterRoleBindings** (connecting the user to the role)

For GPU job submission, you typically restrict access to specific **namespaces** and **resources** like Pods, Jobs, and PersistentVolumeClaims.

---

## 🛠️ Key Components for GPU Job Access

| Component | Purpose | Example for GPU Jobs |
|-----------|---------|----------------------|
| **User/ServiceAccount** | Identity requesting access | `ml-engineer@company.com` or `training-bot` |
| **Role** | Set of permissions within a namespace | Can create Pods, list Jobs, get GPU metrics |
| **ClusterRole** | Set of permissions across all namespaces | Can view all GPU nodes, manage node labels |
| **RoleBinding** | Attaches a Role to a user in a namespace | Binds `ml-engineer` to `gpu-training` namespace |
| **ClusterRoleBinding** | Attaches a ClusterRole to a user cluster-wide | Binds `admin` to view all GPU usage |

---

## 🕵️ How RBAC Controls GPU Job Submission

When an engineer submits a GPU job (e.g., a PyTorch training script), Kubernetes checks:

1. **Authentication**: Is the user who they claim to be? (via certificates, tokens, or OIDC)
2. **Authorization**: Does the user have permission to create a Pod with GPU resource requests?
3. **Admission Control**: Are there additional policies (like resource quotas) that apply?

If the user lacks the RBAC permission to create Pods or request `nvidia.com/gpu` resources, the API server rejects the request with a **403 Forbidden** error.

---

## 📊 Comparison: RBAC vs. No RBAC for GPU Jobs

| Aspect | Without RBAC | With RBAC |
|--------|--------------|-----------|
| **Who can submit jobs** | Anyone with cluster access | Only authorized users/teams |
| **GPU resource contention** | High — anyone can consume all GPUs | Low — controlled by permissions |
| **Audit trail** | None | Kubernetes audit logs track who did what |
| **Namespace isolation** | Not enforced | Each team gets a namespace with its own RBAC |
| **Accidental job deletion** | Possible by any user | Only users with delete permissions |

---

## 🧩 Practical RBAC Strategy for GPU Clusters

For a typical AI team, you might define these roles:

- **GPU-Admin**: Full access to all GPU resources, nodes, and namespaces
- **GPU-Developer**: Can submit and manage jobs in their team's namespace only
- **GPU-Viewer**: Can see GPU usage and job status but cannot submit or modify jobs
- **GPU-Batch**: Service account for automated CI/CD pipelines that submit training jobs

---

## 🚦 Common RBAC Pitfalls for New Engineers

- **Overly permissive roles**: Giving `cluster-admin` to everyone defeats the purpose of RBAC
- **Forgetting ServiceAccounts**: Automated jobs (e.g., from a CI pipeline) need their own RBAC, not a human user's credentials
- **Missing resource limits**: RBAC controls who can submit, but you still need **ResourceQuotas** to limit how many GPUs each user can consume
- **Not testing permissions**: Always verify with `kubectl auth can-i` before assuming a role works

---

## ✅ Summary

RBAC is your first line of defense for GPU resource governance. By defining clear roles and binding them to specific users or service accounts, you ensure that only authorized engineers can submit GPU jobs — protecting both your expensive hardware and your team's productivity.

**Key takeaway**: Start with the principle of **least privilege** — give each user or service account only the permissions they absolutely need to do their job. You can always add more permissions later, but it's hard to take them back after a resource contention incident.