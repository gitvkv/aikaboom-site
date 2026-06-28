# 29.2b Apptainer's security model: user-namespace execution, no root inside container

#### 🏷️ The Cluster Orchestration — Managing the GPU Fleet at Scale > 29 Traditional HPC Schedulers — Slurm and Apptainer > 29.2 Apptainer (Singularity) — HPC-Native Containerization

---

## 🔍 Context Introduction

In High-Performance Computing (HPC) environments, security is a top priority — especially when multiple engineers share the same GPU cluster. Traditional containers (like Docker) require **root privileges** to run, which creates a security risk in shared environments. Apptainer (formerly Singularity) solves this by using **user-namespace execution**, meaning the container runs with the **same user privileges as the person launching it** — and there is **no root access inside the container**.

This makes Apptainer the standard container runtime for HPC clusters, including those managed by Slurm.

---

## ⚙️ How User-Namespace Execution Works

- Apptainer maps the **host user's UID (User ID)** directly into the container.
- Inside the container, the user appears as **the same user** — not as root.
- The container cannot escalate privileges or access files owned by other users on the host.
- This is fundamentally different from Docker, where the container runs as root by default.

### Key Benefits of User-Namespace Execution

- **No privilege escalation**: The container cannot gain root access on the host.
- **File ownership integrity**: Files created inside the container are owned by the user who ran it.
- **Multi-user safety**: Multiple engineers can run containers simultaneously without interfering with each other's files or processes.
- **No SUID risk**: Set-User-ID (SUID) binaries inside the container are ignored for security.

---

## 🛡️ No Root Inside Container — Explained Simply

- In Apptainer, even if a container image was built with a root user, **you cannot become root at runtime**.
- The `--fakeroot` option exists, but it only simulates root for package installation — it does **not** grant real root privileges.
- This prevents malicious or accidental system-wide changes inside the container.

### What This Means for Engineers

- You can run any application inside the container, but you **cannot modify system files** (like `/etc/passwd` or kernel parameters).
- If your application needs to install packages at runtime, you must either:
  - Build those packages into the image beforehand.
  - Use the `--fakeroot` option (with cluster administrator approval).
- The container's filesystem is **read-only by default** for system paths.

---


### 📊 Visual Representation: Apptainer User Privilege Mapping
This diagram displays how Apptainer runs containerized processes directly under the caller's standard non-root user UID to enforce security.

```mermaid
flowchart LR
    User["Host User (UID 1001)"] -->|apptainer run| Container["Container process"]
    Container -->|Enforce standard UID| Safe["Standard User (UID 1001 / No root elevation)"]

    classDef cpu fill:#eafaf1,stroke:#76b900,stroke-width:2px,rx:6px,ry:6px;
    classDef memory fill:#f0f7ff,stroke:#3498db,stroke-width:1.5px,rx:4px,ry:4px;
    classDef system fill:#f1f5f9,stroke:#64748b,stroke-width:1.5px;

    class Safe cpu;
    class Container memory;
    class User system;
```


## 🕵️ Comparison: Apptainer vs. Docker Security Model

| Feature | Apptainer | Docker |
|---------|-----------|--------|
| Default user inside container | Same as host user | Root |
| Root access possible at runtime | No (unless `--fakeroot` is used) | Yes |
| User namespace mapping | Automatic UID mapping | Requires manual configuration |
| SUID binaries inside container | Ignored (no effect) | Executed with root privileges |
| Multi-tenant safety | High (designed for shared HPC) | Low (requires extra security layers) |
| File ownership on host | Matches the user who ran the container | Often owned by root |

---

## 🛠️ Practical Implications for Daily Work

- **Building images**: You can build Apptainer images (`.sif` files) on your local machine or a build node, then transfer them to the cluster.
- **Running containers**: Use Apptainer's `run` or `exec` commands — they will automatically apply user-namespace isolation.
- **GPU access**: Apptainer integrates with NVIDIA Container Toolkit, so you can use GPUs inside the container without special privileges.
- **Shared storage**: If you mount a shared filesystem (like NFS or Lustre), files you create inside the container will have your UID — not root.

---

## ✅ Summary

- Apptainer's security model is built for **shared, multi-user HPC environments**.
- **User-namespace execution** ensures you run as yourself — not as root.
- **No root inside container** prevents privilege escalation and protects the host system.
- This design makes Apptainer the **trusted container runtime** for Slurm-managed GPU clusters.

> 💡 **Key takeaway for new engineers**: With Apptainer, you get the portability of containers without the security risks of running as root. Always build your dependencies into the image, and never rely on runtime root access for your workflows.