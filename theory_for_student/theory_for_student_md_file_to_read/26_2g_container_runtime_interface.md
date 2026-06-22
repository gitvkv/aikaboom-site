# 26.2g Container Runtime Interface (CRI): containerd and CRI-O as Docker replacements

#### 🏷️ The Cluster Orchestration — Managing the GPU Fleet at Scale > 26 Kubernetes Fundamentals — Container Orchestration from Scratch > 26.2 Kubernetes Architecture — Control Plane and Worker Nodes

---

## 🔍 Context: Why the Shift from Docker?

For years, Docker was the default container runtime in Kubernetes. However, Kubernetes introduced the **Container Runtime Interface (CRI)** to standardize how it interacts with different runtimes. Docker was not CRI-compliant out of the box, requiring a translation layer called **dockershim**. Starting with Kubernetes 1.24, dockershim was removed, pushing engineers to adopt native CRI-compliant runtimes like **containerd** and **CRI-O**.

This change simplifies the stack, improves performance, and aligns with open-source standards—especially important when managing GPU-accelerated workloads in AI infrastructure.

---

## ⚙️ What is the Container Runtime Interface (CRI)?

The CRI is a plugin interface that enables Kubernetes to use any container runtime that implements its API. It defines two main gRPC services:

- **RuntimeService**: Manages pods and containers (create, start, stop, delete).
- **ImageService**: Manages container images (pull, list, remove).

By using CRI, Kubernetes decouples orchestration from runtime specifics, allowing you to swap runtimes without changing the cluster.

---

## 🛠️ containerd: The Industry Standard

**containerd** is a core container runtime originally extracted from Docker. It is now a graduated CNCF project and the default runtime in many Kubernetes distributions (e.g., Docker Desktop, Rancher, and Amazon EKS).

Key characteristics:

- **Lightweight**: Designed to manage the complete container lifecycle on a single node.
- **CRI-native**: Built-in CRI implementation (via the `cri` plugin) means no extra translation layer.
- **Performance**: Lower overhead compared to Docker, especially for pull and start operations.
- **GPU support**: Works seamlessly with NVIDIA Container Toolkit for GPU-accelerated workloads.

---

## 🕵️ CRI-O: The Kubernetes-Native Alternative

**CRI-O** is a lightweight runtime built specifically for Kubernetes. It was created to be a minimal, CRI-compliant runtime without the extra features found in Docker or containerd.

Key characteristics:

- **Purpose-built**: Designed exclusively for Kubernetes, not for general container use.
- **Minimal footprint**: Only includes what Kubernetes needs—no Docker CLI, no daemon for non-Kubernetes use.
- **Security focus**: Supports advanced security features like SELinux and seccomp profiles out of the box.
- **OpenShift default**: Used as the default runtime in Red Hat OpenShift.

---

## 📊 Comparison: containerd vs. CRI-O vs. Docker (Legacy)

| Feature | Docker (Legacy) | containerd | CRI-O |
|---------|----------------|------------|-------|
| **CRI compliance** | Requires dockershim (removed) | Native CRI plugin | Native CRI |
| **Kubernetes default** | No (deprecated) | Yes (kubeadm, EKS, AKS) | Yes (OpenShift, some distros) |
| **Performance** | Moderate (extra layer) | High (direct CRI) | High (minimal) |
| **GPU support** | Via nvidia-docker2 | Via NVIDIA Container Toolkit | Via NVIDIA Container Toolkit |
| **Image management** | Full Docker CLI | ctr, crictl, nerdctl | crictl, podman |
| **Community** | Large but shifting | CNCF graduated | CNCF incubating |
| **Use case** | Development, legacy | General production, AI/ML | Security-focused, OpenShift |

---

## 🧩 How They Fit in AI Infrastructure

For AI workloads, both containerd and CRI-O support the **NVIDIA Container Toolkit**, which enables GPU access inside containers. The choice often depends on your ecosystem:

- **containerd** is widely adopted in cloud-managed Kubernetes (EKS, AKS, GKE) and is the default in **NVIDIA GPU Operator** deployments.
- **CRI-O** is preferred in environments with strict security requirements or when using Red Hat OpenShift.

Both runtimes handle the same core tasks: pulling GPU-enabled images (e.g., from NVIDIA NGC), starting containers with GPU device plugins, and managing pod lifecycles.

---

## 🔄 Migration Path from Docker

If you are still using Docker as the runtime, here is the general migration approach:

1. **Check your Kubernetes version**: If running 1.24+, dockershim is already removed. You must switch to containerd or CRI-O.
2. **Drain and cordon nodes**: Safely move workloads off each node.
3. **Install the new runtime**: Use your distribution's package manager to install containerd or CRI-O.
4. **Configure the CRI socket**: Update the kubelet configuration to point to the new runtime socket (e.g., `/run/containerd/containerd.sock` or `/var/run/crio/crio.sock`).
5. **Restart kubelet**: The node will re-register with the new runtime.
6. **Verify with crictl**: Use the **crictl** command-line tool (common to both runtimes) to inspect pods and containers.

For reference:
```
crictl pods
crictl images
crictl ps
```

📤 Output: Lists all running pods, cached images, and active containers on the node.

---

## ✅ Key Takeaways for New Engineers

- **Docker is no longer the default**—containerd and CRI-O are the modern standards.
- **Both are CRI-compliant**, meaning Kubernetes talks to them directly without extra translation.
- **GPU support is identical**—the NVIDIA Container Toolkit works with both runtimes.
- **containerd** is more common in general Kubernetes deployments; **CRI-O** is popular in security-conscious or Red Hat environments.
- **crictl** is your friend—it works with both runtimes for debugging and inspection.

Understanding these runtimes is essential for managing AI infrastructure, as they are the foundation for running GPU-accelerated containers at scale.