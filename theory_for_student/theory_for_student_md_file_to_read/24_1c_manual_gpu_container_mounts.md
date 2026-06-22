# 24.1c The old way: manual `--device` and `-v` driver mounts — error-prone and brittle

#### 🏷️ The Nvidia Software Stack — Bridging Silicon and Python > 24 GPU-Accelerated Containers — The NVIDIA Container Toolkit > 24.1 The GPU Visibility Problem — Why Docker Cannot See a GPU Natively

Before the NVIDIA Container Toolkit existed, engineers had to manually expose GPU hardware to Docker containers. This approach required directly mapping physical devices and driver libraries into the container using Docker's `--device` and `-v` (volume) flags. While it worked in theory, it was notoriously fragile and difficult to maintain across different systems.

---

## ⚙️ What Was the "Old Way"?

The manual approach involved two core steps:
- **Mounting the GPU device files** — using `--device` to give the container access to the NVIDIA GPU hardware (e.g., `/dev/nvidia0`, `/dev/nvidiactl`).
- **Mounting the driver libraries** — using `-v` to copy the NVIDIA driver's shared libraries (`.so` files) from the host into the container's filesystem.

This process required the engineer to know exactly which device files and library paths existed on the host machine.

---

## 🕵️ Why It Was Error-Prone and Brittle

| Problem | Explanation |
|---------|-------------|
| **Driver version mismatch** | If the container expected a different driver version than the host, the mounted libraries would fail silently or crash. |
| **Missing device files** | Not all GPUs expose the same device nodes. A container built for one GPU might fail on another. |
| **Hardcoded paths** | The mount commands assumed specific file locations. A different Linux distribution or driver installation path would break the setup. |
| **No portability** | The `docker run` command with manual mounts could not be shared across teams or environments without modification. |
| **No error feedback** | The container might start but fail at runtime with cryptic errors like "CUDA driver version is insufficient" or "cannot open shared object file." |
| **Security risks** | Exposing raw device files and entire driver directories gave the container more access than necessary. |

---

## 🛠️ A Typical Manual Setup (Conceptual)

The engineer would construct a `docker run` command that included:

- A list of `--device` flags for each GPU device node
- A list of `-v` flags for each driver library directory
- Environment variables to tell the container where to find the libraries

This command was often:
- **Long** — 10+ flags were common
- **Fragile** — a single typo or missing file would break everything
- **Non-reproducible** — the command worked only on the exact host it was written for

---

## 📊 Comparison: Old Way vs. Modern NVIDIA Container Toolkit

| Aspect | Old Manual Mounts | NVIDIA Container Toolkit |
|--------|------------------|--------------------------|
| Setup effort | High — must know host details | Low — single `--gpus` flag |
| Portability | None — host-specific | High — works across systems |
| Error handling | Silent failures at runtime | Clear errors at container start |
| Maintenance | Manual updates for driver changes | Automatic detection |
| Security | Overly permissive device access | Controlled, minimal access |
| Team collaboration | Impossible to share reliably | Easy to share via Dockerfiles |

---

## 🧠 Key Takeaway for New Engineers

If you ever encounter old documentation or scripts that use `--device` and `-v` to mount NVIDIA drivers, recognize this as the **legacy approach**. It was the only option before the NVIDIA Container Toolkit, but it introduced significant operational risk.

The modern solution — using `--gpus all` or `--runtime=nvidia` — handles all of this complexity automatically. The NVIDIA Container Toolkit:
- Detects the correct driver version on the host
- Mounts only the necessary device files
- Injects the correct library paths
- Provides consistent behavior across different Linux distributions

**Remember:** If you see manual device mounts in a production setup, it's a strong signal that the environment needs to be updated to use the NVIDIA Container Toolkit. This will reduce errors, improve security, and make your container deployments truly portable.

---

## 🔍 Summary

The old manual approach to GPU visibility in Docker was:
- **Error-prone** — easy to miss a device or library
- **Brittle** — broke with driver updates or system changes
- **Non-portable** — could not be reused across environments

The NVIDIA Container Toolkit solved these problems by automating device detection, library injection, and version matching. As a new engineer, your focus should be on learning the modern `--gpus` workflow, not the legacy manual mount technique.