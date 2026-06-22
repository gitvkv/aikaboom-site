# 29.2e Running GPU workloads with Apptainer: --nv flag for NVIDIA support

#### 🏷️ The Cluster Orchestration — Managing the GPU Fleet at Scale > 29 Traditional HPC Schedulers — Slurm and Apptainer > 29.2 Apptainer (Singularity) — HPC-Native Containerization

---

## 🌐 Context Introduction

When you run AI workloads in a high-performance computing (HPC) environment, you often need to use NVIDIA GPUs for accelerated training or inference. Apptainer (formerly known as Singularity) is a container runtime designed for HPC systems. Unlike Docker, Apptainer runs containers as the current user without root privileges, making it secure and compatible with shared cluster environments.

However, by default, Apptainer containers cannot see or use the host's NVIDIA GPUs. To enable GPU access, you must use the **`--nv` flag** when launching your container. This flag tells Apptainer to mount the necessary NVIDIA drivers, libraries, and runtime components into the container so your AI frameworks (like PyTorch or TensorFlow) can detect and utilize the GPUs.

---

## ⚙️ What Does the `--nv` Flag Do?

The `--nv` flag performs three critical actions:

- **Mounts NVIDIA driver libraries** from the host into the container, allowing GPU communication.
- **Exposes the NVIDIA Management Library (NVML)** for monitoring GPU status.
- **Sets up the NVIDIA Container Toolkit** runtime, which is required for CUDA-enabled applications.

Without `--nv`, your container will run on CPU only, even if GPUs are available on the host.

---

## 🛠️ How to Use the `--nv` Flag

When launching an Apptainer container for GPU workloads, you simply add the `--nv` flag to your run or exec command. Here is the general pattern:

**For reference:**
```
apptainer run --nv my_container.sif
```

Or, to execute a specific command inside the container:

**For reference:**
```
apptainer exec --nv my_container.sif python train_model.py
```

The `--nv` flag must come **before** the container image name. If you forget it, your GPU will not be accessible.

---

## 🕵️ Verifying GPU Access Inside the Container

After launching your container with `--nv`, you should verify that the GPU is visible. Inside the container, you can run NVIDIA's diagnostic tools.

**For reference:**
```
nvidia-smi
```

📤 **Output:** You should see a table listing your GPU(s), driver version, CUDA version, and memory usage. If you see an error like "command not found" or "no devices were found," the `--nv` flag was not used correctly.

---

## 📊 Comparison: With vs. Without `--nv`

| Feature | Without `--nv` | With `--nv` |
|---------|----------------|-------------|
| GPU visibility | ❌ Not visible | ✅ Fully visible |
| CUDA libraries | ❌ Not available | ✅ Mounted from host |
| nvidia-smi command | ❌ Not found | ✅ Works normally |
| AI framework acceleration | ❌ CPU only | ✅ GPU accelerated |
| Performance | Slower for AI tasks | Maximum throughput |

---

## 🧠 Best Practices for New Engineers

- **Always use `--nv`** when running any container that contains GPU-accelerated code (PyTorch, TensorFlow, CUDA samples, etc.).
- **Combine with `--bind`** if you need to mount additional directories (e.g., datasets or model checkpoints).
- **Check your container image** — ensure it was built with CUDA support (e.g., images from NVIDIA GPU Cloud or official PyTorch/TensorFlow GPU images).
- **Test with `nvidia-smi`** first before running a long training job to confirm GPU access.
- **Remember that `--nv` is Apptainer-specific** — other container runtimes (like Docker) use different flags (e.g., `--gpus all`).

---

## 🚀 Example Workflow

Here is a typical workflow for an engineer running a GPU training job with Apptainer:

1. **Pull or build a GPU-enabled container image** (e.g., `pytorch:latest-gpu`).
2. **Launch the container with `--nv`** and bind your working directory.
3. **Run `nvidia-smi` inside the container** to confirm GPU access.
4. **Execute your training script** (e.g., `python train.py`).
5. **Monitor GPU utilization** using `nvidia-smi` periodically.

**For reference:**
```
apptainer exec --nv --bind /home/user/data:/data pytorch_gpu.sif nvidia-smi
```

📤 **Output:** Shows GPU details, confirming the container can use the hardware.

---

## ⚠️ Common Pitfalls

- **Forgetting the `--nv` flag** — the most frequent mistake. Your job will run on CPU silently.
- **Using a CPU-only container image** — even with `--nv`, a container built without CUDA libraries will not accelerate.
- **Running on a node without GPUs** — check your Slurm allocation or job script to ensure GPU resources are requested.
- **Mixing `--nv` with other flags incorrectly** — place `--nv` right after `run` or `exec`, before the image name.

---

## ✅ Summary

The `--nv` flag is your key to unlocking GPU acceleration in Apptainer containers. It seamlessly bridges the host's NVIDIA drivers with your containerized AI workloads. For new engineers, remember this simple rule: **no `--nv`, no GPU**. Always include it, verify with `nvidia-smi`, and you will be ready to train models at scale in any HPC environment.