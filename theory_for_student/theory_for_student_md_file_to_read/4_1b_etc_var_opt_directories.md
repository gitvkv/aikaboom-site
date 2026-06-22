# 4.1b /etc — system configuration files; /var — variable runtime data; /opt — third-party software

#### 🏷️ The Operating System Layer — Linux for AI Infrastructure Operators > 4 Core Linux Administration for AI Operators > 4.1 Navigating the Linux Filesystem

## 📘 Context Introduction

When you start working with AI infrastructure, you will quickly realize that Linux is the backbone of almost every system — from training servers to inference endpoints. Three directories in particular will become your daily companions: **/etc**, **/var**, and **/opt**. Understanding what lives in each one helps you configure systems, troubleshoot issues, and install software without breaking anything. Think of these folders as the "control room," the "log book," and the "tool shed" of your AI infrastructure.

---

## ⚙️ /etc — System Configuration Files

The **/etc** directory (short for "et cetera") holds all the **plain-text configuration files** that control how your system and its services behave. This is where you make changes to networking, user accounts, security settings, and software behavior.

### 🔑 What you'll find in /etc

- **Network settings** — Files that define IP addresses, DNS servers, and hostnames.
- **User and group definitions** — Files that store local user accounts and passwords (hashed).
- **Service configurations** — Settings for SSH, NTP (time sync), logging, and more.
- **Security policies** — Rules for firewalls, sudo access, and authentication.

### 🧠 Why this matters for AI operators

- When setting up a new GPU server, you will edit files in **/etc** to configure network interfaces and enable remote access.
- If a training job fails to connect to storage, you might check **/etc** for DNS or mount settings.
- Security hardening (like disabling root login) is done entirely through files in **/etc**.

---

## 📊 /var — Variable Runtime Data

The **/var** directory stores **data that changes frequently** while the system is running. This includes logs, temporary files, databases, and print queues. The name stands for "variable" — because the contents grow and shrink over time.

### 🔑 What you'll find in /var

- **Log files** — System logs, application logs, and kernel messages (under **/var/log**).
- **Spool data** — Print jobs, email queues, and scheduled tasks.
- **Temporary runtime files** — Lock files, process IDs, and cached data.
- **Database storage** — Some databases store their data in **/var/lib**.

### 🧠 Why this matters for AI operators

- When a GPU job crashes, the first place to look for error messages is **/var/log**.
- Monitoring disk usage on **/var** is critical — logs can fill up a disk and cause system failures.
- AI frameworks like PyTorch or TensorFlow may write debug logs to **/var** if configured.

---

## 🛠️ /opt — Third-Party Software

The **/opt** directory is reserved for **optional or third-party software** that is not part of the default operating system installation. This keeps custom applications separate from system files, making upgrades and removals cleaner.

### 🔑 What you'll find in /opt

- **Commercial software** — NVIDIA drivers, CUDA toolkit, and other vendor packages.
- **Custom AI tools** — Frameworks like TensorFlow or PyTorch installed from source or binary.
- **Self-contained applications** — Software that includes all its dependencies in one folder.

### 🧠 Why this matters for AI operators

- NVIDIA's GPU drivers and CUDA are often installed in **/opt** to avoid conflicting with system packages.
- When you install an AI framework manually (not through a package manager), it usually goes into **/opt**.
- Removing software from **/opt** is as simple as deleting its folder — no dependency chaos.

---

## 🕵️ Quick Comparison Table

| Directory | Purpose | Common Contents | AI Operator Use Case |
|-----------|---------|-----------------|----------------------|
| **/etc** | Static configuration | Network configs, user accounts, service settings | Editing SSH config, setting up NFS mounts |
| **/var** | Variable runtime data | Logs, databases, spool files | Checking GPU driver logs, monitoring disk space |
| **/opt** | Third-party software | NVIDIA drivers, CUDA, custom AI tools | Installing CUDA toolkit, managing AI frameworks |

---

## 🧩 How They Work Together in AI Infrastructure

Imagine you are setting up a new AI training server:

1. You install **NVIDIA drivers and CUDA** — they go into **/opt**.
2. You configure **network and SSH access** — you edit files in **/etc**.
3. You start a training job — logs and runtime data are written to **/var/log** and **/var/lib**.

If something goes wrong:
- Check **/var/log** for error messages.
- Verify settings in **/etc** are correct.
- Confirm the software in **/opt** is properly installed.

---

## ✅ Key Takeaways for New Engineers

- **/etc** is your configuration hub — treat it with care and always back up files before editing.
- **/var** is your diagnostic goldmine — learn to read log files quickly.
- **/opt** keeps your custom AI tools isolated — use it to avoid breaking system packages.
- Never delete files from **/etc** or **/var** without understanding what they do.
- Always check disk space on **/var** — logs can grow fast during long training runs.

---

*Master these three directories, and you will navigate any Linux-based AI infrastructure with confidence.*