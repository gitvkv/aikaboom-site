# 23.2c Mount namespace: isolated filesystem views with bind mounts

#### 🏷️ The Nvidia Software Stack — Bridging Silicon and Python > 23 Containerization Fundamentals — Docker from First Principles > 23.2 Linux Namespaces and Cgroups — How Containers Work at the Kernel Level

---

## 🔍 Context Introduction

When you run a container, you expect it to see its own filesystem — separate from the host and from other containers. This isolation is achieved through **mount namespaces**. A mount namespace gives a process its own view of the filesystem tree. Inside that namespace, you can mount, unmount, and rearrange filesystems without affecting the host or other namespaces.

**Bind mounts** are a powerful technique used within mount namespaces. They allow you to "attach" an existing directory or file from the host into the container's filesystem at a different location. This is how containers share data with the host (e.g., mounting a GPU driver directory or a dataset folder) without copying everything.

---

## ⚙️ What Is a Mount Namespace?

- A mount namespace creates an **isolated copy** of the mount table for a process and its children.
- Every process starts in the host's initial mount namespace (the "root" namespace).
- When a container starts, Linux creates a **new mount namespace** for it.
- Inside that namespace, the process sees only the mounts that were created inside it — plus any inherited mounts from the parent namespace (unless explicitly unshared).
- Changes to mounts inside a namespace are **invisible** to other namespaces.

---

## 🛠️ What Are Bind Mounts?

- A bind mount takes an existing directory or file and **re-mounts it** at another location in the same filesystem tree.
- The bind mount does **not copy** data — it creates a second access point to the same underlying inode.
- Inside a mount namespace, bind mounts allow you to **selectively expose** parts of the host filesystem to the container.
- Common use cases:
  - Mounting the NVIDIA driver directory into a GPU container.
  - Sharing a dataset directory between host and container.
  - Providing configuration files from the host to the container.

---

## 🕵️ How Mount Namespaces and Bind Mounts Work Together

| Concept | What It Does | Why It Matters for AI Infrastructure |
|---------|--------------|--------------------------------------|
| **Mount Namespace** | Isolates the filesystem view per process group | Prevents containers from seeing or modifying host mounts |
| **Bind Mount** | Re-mounts an existing path at a new location | Allows controlled sharing of host directories into containers |
| **Combined** | Bind mounts are created inside the new namespace | The container sees only the shared paths, not the entire host filesystem |

---

## 📊 Key Points for New Engineers

- **Mount namespaces are created automatically** when you start a container with Docker or containerd.
- **Bind mounts are specified at container runtime** (e.g., via Docker's `--mount` or `--volume` flags).
- **Inside the container**, the bind mount appears as a normal directory — the process does not know it's a bind mount.
- **Changes made inside the container** to a bind-mounted directory are visible on the host (and vice versa), because they point to the same data.
- **Mount propagation** controls whether mounts inside the namespace are visible to the host or other namespaces. For AI workloads, you typically use **slave** or **private** propagation to avoid leaking container mounts to the host.

---

## 🧪 Simple Example Walkthrough

Imagine you have a host directory called **/data/datasets** containing training data. You want a container to access this data without copying it.

- The host's mount namespace sees **/data/datasets** as a normal directory.
- When the container starts, a new mount namespace is created for it.
- Inside that namespace, a bind mount is created: **/data/datasets** is bound to **/workspace/data** inside the container.
- The container process sees **/workspace/data** and can read/write files there.
- The host still sees **/data/datasets** — and any changes made by the container are immediately visible on the host.

---

## 🧩 Why This Matters for AI Infrastructure

- **GPU drivers**: Containers need access to NVIDIA kernel modules and libraries. Bind mounts expose **/usr/lib/x86_64-linux-gnu/libcuda.so** and similar files into the container's mount namespace.
- **Model weights**: Large AI models (e.g., LLMs) are stored on host storage. Bind mounts allow containers to load them without copying.
- **Logs and checkpoints**: Training logs and model checkpoints written inside the container are immediately available on the host via bind mounts.
- **Security**: Mount namespaces prevent a compromised container from mounting host filesystems or accessing sensitive host directories.

---

## ✅ Summary

- **Mount namespaces** give each container its own isolated filesystem view.
- **Bind mounts** are the mechanism to selectively share host directories into that isolated view.
- Together, they enable efficient, secure data sharing for AI workloads — from GPU drivers to training datasets.
- As an engineer working with NVIDIA AI infrastructure, understanding mount namespaces and bind mounts helps you debug container storage issues, design efficient data pipelines, and maintain security boundaries.