# 23.2a PID namespace: isolated process trees — container processes see only themselves

#### 🏷️ The Nvidia Software Stack — Bridging Silicon and Python > 23 Containerization Fundamentals — Docker from First Principles > 23.2 Linux Namespaces and Cgroups — How Containers Work at the Kernel Level

---

## 🌱 Context Introduction

When you run a container, you expect it to behave like a lightweight, isolated environment. One of the most critical isolation mechanisms is the **PID (Process ID) namespace**. Without it, every process inside a container could see—and potentially interact with—processes running on the host or in other containers. The PID namespace solves this by giving each container its own **private process tree**, starting from PID 1.

Think of it like this: on a normal Linux system, every process has a unique number (PID). The host sees everything. But inside a container, the PID namespace **remaps** those numbers so the container only sees its own processes. The container's first process becomes PID 1 inside that namespace, and it has no knowledge of anything outside.

---

## ⚙️ How PID Namespaces Work — The Core Idea

- **Isolation of process trees**: Each PID namespace has its own numbering starting from PID 1.
- **Container sees only itself**: A process inside a container cannot see or signal processes in the host or other containers.
- **Host sees everything**: The host system still sees all processes, including those inside containers, but with their original host-level PIDs.
- **Nested namespaces**: PID namespaces can be nested. A container inside a container (Docker-in-Docker) creates a deeper hierarchy.

---

## 🕵️ What Happens When You Look Inside a Container

When you run a command like **ps aux** inside a container, you will only see:
- The container's own processes (e.g., the main application, shell, init process).
- No host processes (like systemd, cron, or other containers).

The container's PID 1 is typically the entrypoint command (e.g., **python app.py** or **/bin/bash**). If that process exits, the container stops.

---

## 📊 Comparison: Host vs. Container Process View

| Aspect | Host System | Inside a Container (PID Namespace) |
|--------|-------------|-------------------------------------|
| **Process visibility** | All processes on the machine | Only processes inside the container |
| **PID numbering** | Global, unique across the system | Local, starts at PID 1 |
| **Can see other containers?** | Yes | No |
| **Can see host processes?** | Yes | No |
| **PID 1** | Usually systemd or init | The container's entrypoint process |

---

## 🛠️ Practical Implications for Engineers

- **Process management**: You cannot kill a host process from inside a container. This prevents accidental or malicious interference.
- **Signal handling**: Sending a signal (like **SIGTERM**) from inside a container only affects processes within that namespace.
- **Debugging**: If a container misbehaves, you must check its logs or exec into it. You cannot rely on host-level tools like **top** or **htop** to see what's happening inside—they show host PIDs, not container PIDs.
- **Init process responsibility**: The container's PID 1 must handle orphaned child processes properly. If it doesn't, zombie processes can accumulate inside the container.

---

## 🔍 Real-World Example (Without Code Blocks)

Imagine you have a host running two containers: **Container A** (running a Python web app) and **Container B** (running a database).

- On the host, you see PID 1234 for the Python app and PID 5678 for the database.
- Inside **Container A**, running **ps aux** shows only PID 1 (the Python app) and maybe a shell if you exec into it.
- Inside **Container B**, running **ps aux** shows only PID 1 (the database process).
- Neither container can see the other's processes, even though the host sees both.

---

## 🧩 Key Takeaway

The PID namespace is the reason containers feel like separate machines. It gives each container its own **private process universe**, starting from PID 1. For engineers, this means:
- You manage processes inside the container, not from the host.
- You must design your container's entrypoint to handle signals and child processes correctly.
- Debugging requires entering the container's namespace (via **docker exec** or similar tools).

Without PID namespaces, containers would be just chroot jails—isolated filesystems but with shared, visible process trees. That would break the fundamental promise of container isolation.

---

## ✅ Summary

| Concept | Explanation |
|---------|-------------|
| **PID namespace** | Isolates process trees so containers see only their own processes |
| **PID 1 inside container** | The container's entrypoint process |
| **Host visibility** | Host sees all processes, including container ones |
| **Cross-container visibility** | None — containers are isolated from each other |
| **Practical use** | Prevents interference, enables lightweight virtualization |

> 💡 **Remember**: When you run a container, you are creating a new PID namespace. The container lives in its own process bubble, completely unaware of the host's busy process world outside.