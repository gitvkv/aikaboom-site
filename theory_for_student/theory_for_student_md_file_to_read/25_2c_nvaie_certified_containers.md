# 25.2c NVAIE certified containers: tested combinations of driver/CUDA/framework versions

#### 🏷️ The Nvidia Software Stack — Bridging Silicon and Python > 25 NVIDIA NGC, AI Enterprise, and NIMs > 25.2 NVIDIA AI Enterprise (NVAIE) — Production Support for AI

---

## 🧭 Context Introduction

When you start working with NVIDIA AI Enterprise (NVAIE), you'll quickly notice that not every combination of GPU driver, CUDA version, and AI framework (like PyTorch or TensorFlow) works together smoothly. This is where **NVAIE certified containers** come in.

Think of these containers as **pre-tested, pre-bundled software packages**. NVIDIA has already done the hard work of verifying that a specific driver version works with a specific CUDA toolkit and a specific framework version. As a new engineer, this means you can skip the guesswork and avoid common "dependency hell" problems.

---

## ⚙️ What Are NVAIE Certified Containers?

- **Pre-validated stacks**: Each container is a tested combination of:
  - **GPU Driver** (e.g., R535, R550)
  - **CUDA version** (e.g., 11.8, 12.4)
  - **AI Framework** (e.g., PyTorch 2.3, TensorFlow 2.15)
- **Production-ready**: These combinations are verified for stability, performance, and security in enterprise environments.
- **Available via NGC**: You pull these containers from NVIDIA GPU Cloud (NGC) using container tools like Docker or Podman.

---

## 📊 Why Tested Combinations Matter

- **Avoids silent failures**: An untested combo might run but produce wrong numerical results or crash under load.
- **Guarantees driver compatibility**: The container expects a minimum host driver version. Using an older driver can cause runtime errors.
- **Simplifies troubleshooting**: If something breaks, you know the issue is not in the software stack — it's in your configuration or data.

---

## 🛠️ Example of a Certified Combination Table

Below is a simplified example of what a certified combination looks like. Actual combinations change with each NVAIE release.

| Container Name | Host Driver Min | CUDA Version | Framework Version | Notes |
|----------------|----------------|--------------|-------------------|-------|
| PyTorch 2.3    | R535 or later   | 12.1         | 2.3.0             | Optimized for training |
| TensorFlow 2.15| R535 or later   | 12.1         | 2.15.0            | Optimized for inference |
| Triton Server  | R535 or later   | 12.1         | 23.10             | For model serving |
| CUDA 12.4 Base | R550 or later   | 12.4         | N/A               | Minimal base image |

**Key takeaway**: Always check the **"Host Driver Minimum"** column. If your server runs an older driver (e.g., R470), you must upgrade before using these containers.

---

## 🕵️ How to Verify Your Host Driver Matches

Before pulling an NVAIE container, you need to check your host's GPU driver version.

- **Check driver version**: Run the command **nvidia-smi** on your host. Look for the line that says **Driver Version** (e.g., 535.154.05).
- **Compare with container requirements**: The container's documentation on NGC will state a minimum driver version (e.g., "Requires driver R535 or later").
- **Upgrade if needed**: If your driver is older, update it from NVIDIA's driver download page before pulling the container.

---

## 🧩 Common Pitfalls for New Engineers

- **Mixing CUDA versions**: The container's CUDA is inside the container — you do not need to install CUDA on your host. But the host driver must support that CUDA version.
- **Ignoring driver updates**: A container built for CUDA 12.4 will not work with a driver from the R470 branch. Always match the driver branch (R535, R550, etc.).
- **Assuming all containers are interchangeable**: A PyTorch container from NGC is not the same as a community-built one. NVAIE containers have enterprise support and longer testing cycles.

---

## ✅ Quick Checklist for Using NVAIE Certified Containers

1. **Identify your framework** (e.g., PyTorch, TensorFlow, Triton).
2. **Check the NGC catalog** for the latest certified container for that framework.
3. **Note the minimum host driver version** listed in the container's description.
4. **Verify your host driver** using **nvidia-smi**.
5. **Pull the container** using your container runtime (e.g., Docker).
6. **Run the container** — it will automatically use the correct CUDA and libraries inside.

---

## 📌 Final Thought

As a new engineer, treat NVAIE certified containers as **your safety net**. They eliminate the most common source of AI infrastructure failures: mismatched software versions. Always use a certified combination for production workloads, and you'll spend less time debugging and more time building.

---

*Next in this series: 25.2d — NVAIE support lifecycle and versioning policies.*