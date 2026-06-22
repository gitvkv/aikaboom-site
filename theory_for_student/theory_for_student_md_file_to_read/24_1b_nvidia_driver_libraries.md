# 24.1b Driver libraries: libcuda.so, libnvidia-ml.so — must be accessible inside containers

#### 🏷️ The Nvidia Software Stack — Bridging Silicon and Python > 24 GPU-Accelerated Containers — The NVIDIA Container Toolkit > 24.1 The GPU Visibility Problem — Why Docker Cannot See a GPU Natively

---

## 🧠 Context — Why This Matters

When you run a container with Docker, it starts as an isolated environment with its own filesystem. By default, it has **no access** to the host's GPU drivers or libraries. This means even if your host machine has an NVIDIA GPU installed, a container cannot use it unless you explicitly provide access to two critical driver libraries:

- **libcuda.so** — The core CUDA runtime library that allows applications to communicate with the GPU.
- **libnvidia-ml.so** — The NVIDIA Management Library that provides monitoring and management functions (like checking GPU utilization or memory usage).

Without these libraries inside the container, any GPU-accelerated application will fail with errors like "CUDA driver version is insufficient" or "cannot open libcuda.so.1".

---

## ⚙️ What Are These Libraries?

| Library | Full Name | Purpose |
|---------|-----------|---------|
| **libcuda.so** | CUDA Driver API Library | Provides the low-level interface between applications and the GPU hardware. Required for any CUDA-based computation. |
| **libnvidia-ml.so** | NVIDIA Management Library | Enables monitoring tools (like `nvidia-smi`) to query GPU status, temperature, memory usage, and process information. |

Both libraries are part of the **NVIDIA driver package** installed on the host system. They are **not** included in standard container images.

---

## 🕵️ The Problem — Containers Are Blind by Default

Docker containers are designed to be lightweight and isolated. They do not automatically inherit:

- Host device files (like `/dev/nvidia0`)
- Host driver libraries (like `/usr/lib/x86_64-linux-gnu/libcuda.so`)
- Host kernel modules (like `nvidia.ko`)

This means a container running a GPU workload will fail unless you explicitly mount these resources into the container's filesystem.

---

## 🛠️ How the NVIDIA Container Toolkit Solves This

The NVIDIA Container Toolkit (formerly nvidia-docker2) automates the process of making these libraries accessible. When you run a container with the `--gpus` flag, the toolkit:

1. **Mounts the NVIDIA driver libraries** from the host into the container at runtime.
2. **Creates the necessary device files** (`/dev/nvidia0`, `/dev/nvidiactl`, etc.) inside the container.
3. **Sets environment variables** (like `NVIDIA_VISIBLE_DEVICES` and `NVIDIA_DRIVER_CAPABILITIES`) to control GPU access.

The key libraries that must be accessible are:

- **libcuda.so** — Located at `/usr/lib/x86_64-linux-gnu/libcuda.so` on the host
- **libnvidia-ml.so** — Located at `/usr/lib/x86_64-linux-gnu/libnvidia-ml.so` on the host

---

## 📊 What Happens When They Are Missing

If these libraries are not accessible inside the container, you will encounter:

| Symptom | Likely Cause |
|---------|--------------|
| Application crashes with "CUDA driver version is insufficient" | `libcuda.so` is missing or mismatched |
| `nvidia-smi` returns "command not found" | `libnvidia-ml.so` is not available |
| Python script fails with "Could not load dynamic library libcuda.so.1" | The CUDA driver library path is not mounted |
| Container runs but GPU is not detected | Device files or driver libraries are not accessible |

---

## ✅ How to Verify Libraries Are Accessible

To confirm that these libraries are available inside a running container, you can:

1. **Check the container's library path** — Look for the files in `/usr/lib/x86_64-linux-gnu/` or `/usr/lib64/`
2. **Use `ldconfig`** to list all cached libraries and verify `libcuda.so` and `libnvidia-ml.so` appear
3. **Run a simple CUDA application** (like `nvidia-smi`) to confirm the GPU is detected

If the libraries are missing, the NVIDIA Container Toolkit is not properly configured or the container was started without the `--gpus` flag.

---

## 🧪 Practical Verification Steps

For reference, here is how you would verify library accessibility:

```
docker run --gpus all nvidia/cuda:12.0-base nvidia-smi
```

📤 **Output:** Should display GPU information (model, memory, driver version). If you see an error about missing libraries, the driver libraries are not accessible.

For reference, to check inside a running container:

```
docker exec -it <container_name> ldconfig -p | grep libcuda
```

📤 **Output:** Should show paths like `libcuda.so.1` and `libnvidia-ml.so.1` if libraries are properly mounted.

---

## 🔁 Common Mistakes to Avoid

- ❌ **Using a base image without CUDA** — Standard Ubuntu or Python images do not include NVIDIA libraries
- ❌ **Forgetting the `--gpus` flag** — Without it, no GPU resources are mounted
- ❌ **Mixing driver versions** — The host driver version must match what the container expects
- ❌ **Assuming `nvidia-smi` is in the container** — It requires `libnvidia-ml.so` to be accessible

---

## 📌 Key Takeaway

For any GPU-accelerated container to work, **libcuda.so** and **libnvidia-ml.so** must be accessible from inside the container. The NVIDIA Container Toolkit handles this automatically when you use the `--gpus` flag, but understanding these libraries helps you troubleshoot when things go wrong. Always verify library accessibility as a first step when debugging GPU-related container issues.