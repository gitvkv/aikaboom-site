# 22.1d Driver and CUDA version compatibility matrix

#### 🏷️ The Nvidia Software Stack — Bridging Silicon and Python > 22 Base Drivers, CUDA, and Core Libraries > 22.1 NVIDIA Data Center GPU Drivers

---

## 🔍 Context Introduction

When you install an NVIDIA GPU driver on a system, you are not just installing a piece of software that makes the GPU work. You are also installing a specific version of the CUDA runtime that the driver supports. This relationship between the **NVIDIA driver version** and the **CUDA toolkit version** is defined by a **compatibility matrix**.

Think of it like this: the driver is the bridge between your operating system and the GPU hardware. CUDA is the language and tools you use to talk to the GPU. If the bridge (driver) is too old, it won't understand the language (CUDA) you are speaking. The compatibility matrix tells you exactly which driver version is required for each CUDA toolkit version.

---

## ⚙️ Why This Matters for New Engineers

- **You cannot run a newer CUDA toolkit with an older driver.** The driver must be at least as new as the CUDA toolkit you want to use.
- **You can run an older CUDA toolkit with a newer driver.** This is called *forward compatibility* — a newer driver can support older CUDA versions.
- **Mismatching driver and CUDA versions** will result in errors like *"CUDA driver version is insufficient for CUDA runtime version"* or *"libcuda.so not found"*.

---

## 📊 The Compatibility Matrix (Simplified)

Below is a simplified version of the official NVIDIA compatibility matrix. This is not the full list, but it covers the most common versions you will encounter as a new engineer.

| NVIDIA Driver Version (Minimum) | CUDA Toolkit Version | Notes |
|----------------------------------|----------------------|-------|
| 450.80.02                        | 11.0                 | First CUDA 11 release |
| 455.23.05                        | 11.1                 | Minor update |
| 460.27.04                        | 11.2                 | Common in data center setups |
| 465.19.01                        | 11.3                 | Added support for newer GPUs |
| 470.42.01                        | 11.4                 | Long-lived branch |
| 495.29.05                        | 11.5                 | Major driver branch change |
| 510.39.01                        | 11.6                 | Improved container support |
| 515.43.04                        | 11.7                 | Common in modern deployments |
| 520.61.05                        | 11.8                 | Latest CUDA 11.x release |
| 525.60.13                        | 12.0                 | First CUDA 12 release |
| 530.30.02                        | 12.1                 | Minor update |
| 535.54.03                        | 12.2                 | Current stable branch |
| 545.23.06                        | 12.3                 | Latest as of this writing |

**Key takeaway:** If you want to use CUDA 12.2, your driver must be at least version **535.54.03** or newer.

---

## 🛠️ How to Check Your Current Driver and CUDA Version

To find out what driver and CUDA version you have on your system, you can use the following methods:

- **Check the driver version:** Run **nvidia-smi** (without any arguments). The driver version appears in the top-right corner of the output.
- **Check the CUDA version:** Run **nvidia-smi** again — the CUDA version is shown in the top-left corner, labeled as *"CUDA Version"*.
- **Check the installed CUDA toolkit:** If you have the CUDA toolkit installed, run **nvcc --version**. This shows the toolkit version, which may differ from the driver's reported CUDA version.

**Important:** The CUDA version shown by **nvidia-smi** is the version of the CUDA runtime built into the driver. The CUDA version shown by **nvcc** is the version of the CUDA toolkit you installed. These two must be compatible.

---

## 🕵️ Common Compatibility Scenarios

- **Scenario A — New driver, old CUDA toolkit:** This works fine. Example: Driver 535.54.03 with CUDA Toolkit 11.8. The driver supports older CUDA versions.
- **Scenario B — Old driver, new CUDA toolkit:** This fails. Example: Driver 450.80.02 with CUDA Toolkit 12.0. The driver is too old to understand CUDA 12 commands.
- **Scenario C — Matching versions:** This is the safest. Example: Driver 535.54.03 with CUDA Toolkit 12.2. Everything is designed to work together.

---

## 📌 Best Practices for New Engineers

- **Always install the latest stable driver** from the NVIDIA Data Center GPU Driver page. This gives you the widest CUDA compatibility.
- **When installing a new CUDA toolkit, check the matrix first.** Do not assume any driver will work.
- **Use containerized environments (like NVIDIA Docker)** to avoid driver-CUDA conflicts. The container uses the host driver but can run any compatible CUDA toolkit inside.
- **Document your driver and CUDA versions** in your project's README or configuration file. This saves hours of debugging later.

---

## ✅ Summary

The Driver and CUDA version compatibility matrix is your roadmap for ensuring your GPU software stack works correctly. As a new engineer, remember this simple rule:

> **The driver must be at least as new as the CUDA toolkit you want to use.**

Keep the matrix handy, check your versions with **nvidia-smi** and **nvcc --version**, and always plan your upgrades with compatibility in mind. This will save you from the most common GPU-related errors in AI infrastructure operations.