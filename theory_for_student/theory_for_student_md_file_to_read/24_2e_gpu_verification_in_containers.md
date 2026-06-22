# 24.2e Verifying GPU access: nvidia-smi inside a container

#### 🏷️ The Nvidia Software Stack — Bridging Silicon and Python > 24 GPU-Accelerated Containers — The NVIDIA Container Toolkit > 24.2 NVIDIA Container Toolkit — The Right Way to Expose GPUs

---

## 🔍 Context Introduction

When you run an AI workload inside a container, the container does not automatically see or use the host machine's GPUs. Even if the host has powerful NVIDIA GPUs installed, the container lives in an isolated environment. The NVIDIA Container Toolkit bridges this gap by mounting the necessary drivers and libraries into the container. The most fundamental check to confirm this bridge is working is to run **nvidia-smi** inside the container. This command reports GPU status, driver version, and GPU utilization — exactly what you need to verify that your container has proper GPU access.

---

## ⚙️ What Does nvidia-smi Do?

- **nvidia-smi** (NVIDIA System Management Interface) is a command-line utility that queries the GPU state.
- When run inside a container, it confirms that the container can communicate with the physical GPU hardware.
- It displays:
  - Driver version
  - CUDA version
  - GPU name and UUID
  - Memory usage (total, used, free)
  - GPU utilization percentage
  - Running processes on the GPU

---

## 🛠️ How to Verify GPU Access in a Container

To verify GPU access, you run a simple test container that executes **nvidia-smi**. The key is to use the correct runtime flag when starting the container.

**Step-by-step process:**

1. **Pull a base CUDA image** — Use an official NVIDIA CUDA image from a container registry (e.g., nvidia/cuda:12.2.0-base-ubuntu22.04).
2. **Run the container with GPU access** — Use the **--gpus all** flag (or **--gpus '"device=0"'** for a specific GPU) when starting the container.
3. **Execute nvidia-smi inside the container** — The container will run the command and output GPU information.

For reference:
```
docker run --gpus all nvidia/cuda:12.2.0-base-ubuntu22.04 nvidia-smi
```

📤 Output: A table showing GPU name (e.g., NVIDIA A100 80GB), driver version (e.g., 535.129.03), CUDA version (e.g., 12.2), memory stats, and utilization.

---

## 🕵️ What to Look For in the Output

When you run the verification, check these key items:

- **Driver Version** — Should match the driver installed on the host machine. If it shows "N/A" or a different version, the container is not seeing the host driver correctly.
- **GPU Name** — Should show the actual physical GPU model (e.g., A100, V100, RTX 4090). If it shows "No devices were found," GPU access failed.
- **Memory Usage** — Should show realistic values (e.g., "0 MiB / 81920 MiB" for an A100). If all values are zero or "N/A," the GPU is not accessible.
- **Processes** — Should list any running processes using the GPU. For a fresh container, this will likely be empty.

---

## 📊 Common Issues and Troubleshooting

| Symptom | Likely Cause | What to Check |
|---------|--------------|---------------|
| **nvidia-smi not found** | NVIDIA Container Toolkit not installed on host | Verify the toolkit is installed and configured |
| **No devices were found** | Container runtime not configured for GPUs | Ensure **--gpus all** flag is used |
| **Driver version mismatch** | Host driver is outdated or missing | Update NVIDIA driver on the host |
| **Permission denied** | User inside container lacks GPU access | Run container with **--privileged** or check user permissions |
| **CUDA version mismatch** | Container image has incompatible CUDA | Use a CUDA image that matches the host driver version |

---

## ✅ Best Practices for New Engineers

- **Always verify GPU access first** — Before running any AI training or inference workload, run **nvidia-smi** inside the container to confirm the GPU is visible.
- **Use the same CUDA version** — Match the CUDA version in your container image to the CUDA version supported by your host driver (check with **nvidia-smi** on the host).
- **Check multiple GPUs** — If your host has multiple GPUs, test with **--gpus all** and then with **--gpus '"device=0"'** to ensure individual device access works.
- **Keep the container lightweight** — For verification, use a minimal base image like **nvidia/cuda:base** instead of a full development image.
- **Document your findings** — Record the driver version, GPU model, and CUDA version for each environment you work with.

---

## 🧪 Real-World Scenario Example

Imagine you are setting up a training pipeline for a large language model. Before launching the training script, you run the verification command. The output shows an NVIDIA A100 GPU with 80 GB of memory and the correct driver version. This confirms that your container environment is ready for GPU-accelerated training. If the output instead shows "No devices were found," you know to check the container runtime configuration before proceeding further.

---

## 📌 Key Takeaway

**nvidia-smi inside a container** is the single most important diagnostic command for GPU-accelerated containers. It confirms that the entire software stack — from the host driver through the NVIDIA Container Toolkit to the container runtime — is working correctly. Make it a habit to run this check every time you start a new container for AI workloads.