# 24.3c CDI with containerd and CRI-O: Kubernetes-compatible GPU exposure

#### 🏷️ The Nvidia Software Stack — Bridging Silicon and Python > 24 GPU-Accelerated Containers — The NVIDIA Container Toolkit > 24.3 Container Device Interface (CDI) — The Modern Standard

---

## 🌐 Context Introduction

When you run a container that needs access to an NVIDIA GPU, the container runtime must know how to "inject" the GPU into the container's environment. Older methods required modifying the container runtime itself (like Docker's `--gpus` flag). The **Container Device Interface (CDI)** is a modern, vendor-neutral standard that allows container runtimes like **containerd** and **CRI-O** to expose GPUs to Kubernetes pods without custom patches or forks. This makes GPU management cleaner, more portable, and Kubernetes-native.

---

## ⚙️ What is CDI and Why Does It Matter?

- **CDI (Container Device Interface)** is a specification that defines how devices (like GPUs) are described and made available to containers.
- It works by placing a **JSON specification file** on the host system that describes the GPU device paths, driver libraries, and mount points.
- The container runtime (containerd or CRI-O) reads these CDI specs and automatically injects the GPU into the container at startup.
- **Key benefit:** No need for runtime-specific flags or plugins — CDI is a standard that all runtimes can adopt.

---

## 🛠️ How CDI Works with containerd and CRI-O

Both **containerd** and **CRI-O** are high-level container runtimes used by Kubernetes. They both support CDI natively in recent versions.

### 🔹 containerd
- containerd reads CDI specifications from a default directory (typically `/etc/cdi/` or `/var/run/cdi/`).
- When a Kubernetes pod requests a GPU (via a resource limit like `nvidia.com/gpu`), containerd looks up the CDI spec for that device.
- It then mounts the necessary GPU devices, libraries, and files into the container.

### 🔹 CRI-O
- CRI-O also supports CDI by reading the same CDI specification files.
- It uses the `CDI_DEVICES` environment variable or annotation in the pod spec to identify which GPU to inject.
- The process is identical in spirit: the runtime reads the spec and mounts the GPU resources.

---

## 📊 Comparison: containerd vs CRI-O with CDI

| Feature | containerd | CRI-O |
|---------|------------|-------|
| **CDI Support** | Native since v1.6+ | Native since v1.20+ |
| **Default CDI Path** | `/etc/cdi/` or `/var/run/cdi/` | `/etc/cdi/` or `/var/run/cdi/` |
| **GPU Discovery** | Uses NVIDIA Container Toolkit to generate CDI specs | Same — relies on `nvidia-ctk` tool |
| **Kubernetes Integration** | Via `nvidia.com/gpu` resource in pod spec | Via `nvidia.com/gpu` resource in pod spec |
| **Configuration Complexity** | Low — just install toolkit and generate specs | Low — same process |

---

## 🕵️ The NVIDIA Container Toolkit's Role

The **NVIDIA Container Toolkit** (specifically the `nvidia-ctk` command) is responsible for generating the CDI specification files on the host. Here's the high-level flow:

1. **Install** the NVIDIA Container Toolkit on each GPU node.
2. **Run** the CDI spec generator (part of the toolkit) to create JSON files in `/etc/cdi/`.
3. **Verify** that the CDI specs are present — they describe each GPU as a named device (e.g., `nvidia.com/gpu=0`).
4. **Kubernetes** then uses these device names in pod resource requests.

---

## 🧩 How Kubernetes Pods Request GPUs via CDI

When you define a pod that needs a GPU, you specify it in the pod spec like this:

- **Resource request:** `nvidia.com/gpu: 1` in the `resources.limits` section.
- The Kubernetes device manager (kubelet) sees this request and communicates with the container runtime (containerd or CRI-O).
- The runtime looks up the CDI spec for `nvidia.com/gpu` and mounts the appropriate device files into the container.

**Important:** The pod does not need to know about CDI — it just requests the GPU resource. CDI is an implementation detail handled by the runtime.

---

## ✅ Benefits of CDI for Engineers

- **No runtime modifications:** You don't need a custom Docker or containerd build.
- **Vendor-neutral:** Works with any runtime that supports CDI (containerd, CRI-O, Podman, etc.).
- **Cleaner Kubernetes integration:** GPU requests are standard Kubernetes resource requests.
- **Easier debugging:** CDI specs are plain JSON files you can inspect.
- **Future-proof:** CDI is becoming the standard for all device exposure in containers.

---

## 🔍 Verification Steps (Conceptual)

To confirm CDI is working with your runtime:

1. **Check that CDI spec files exist** in `/etc/cdi/` — you should see files like `nvidia.yaml` or `nvidia.json`.
2. **Run a test container** that requests a GPU and verify it can run `nvidia-smi` inside.
3. **Inspect the container's device list** — you should see the NVIDIA devices (e.g., `/dev/nvidia0`, `/dev/nvidiactl`).
4. **Check runtime logs** for any CDI-related errors or successful device injection messages.

---

## 🧠 Key Takeaways

- **CDI** is a modern, standard way to expose GPUs to containers in Kubernetes.
- Both **containerd** and **CRI-O** support CDI natively.
- The **NVIDIA Container Toolkit** generates the CDI specs that describe each GPU.
- Engineers only need to install the toolkit and generate specs — no custom runtime configuration is required.
- CDI makes GPU-aware containers portable across different runtimes and Kubernetes distributions.

---

## 📚 Further Reading

- NVIDIA Container Toolkit documentation
- containerd CDI documentation
- CRI-O CDI documentation
- Kubernetes device plugin framework

---

*This guide is part of the NVIDIA-Certified Associate: AI Infrastructure and Operations curriculum.*