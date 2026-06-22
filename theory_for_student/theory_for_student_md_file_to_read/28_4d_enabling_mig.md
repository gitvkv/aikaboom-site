# 28.4d Enabling MIG: nvidia-smi -i 0 --mig-mode=1 and rebooting

#### 🏷️ The Cluster Orchestration — Managing the GPU Fleet at Scale > 28 Advanced GPU Resource Management — MIG, MPS, and Time-Slicing > 28.4 Multi-Instance GPU (MIG) — Hardware-Level GPU Partitioning

---

## 🧠 Context Introduction

Multi-Instance GPU (MIG) is a hardware-level feature available on NVIDIA Ampere and newer GPU architectures (such as A100, A30, H100, and H200). It allows a single physical GPU to be partitioned into multiple smaller, isolated GPU instances. Each instance has its own dedicated memory, cache, and compute resources — making them behave like independent GPUs.

Before you can use MIG, you must **enable MIG mode** on the GPU. This is done using the **nvidia-smi** command with the **--mig-mode** flag, followed by a system reboot. This topic walks you through that process step by step.

---

## ⚙️ What Does Enabling MIG Mode Do?

- **Activates MIG capability** on the specified GPU (identified by its index, e.g., `0`).
- Prepares the GPU driver to accept MIG partition configurations.
- Requires a **system reboot** to take full effect.
- Once enabled, the GPU can be partitioned into up to 7 instances (depending on the GPU model).

---

## 🛠️ Step-by-Step: Enabling MIG Mode

### 1. Identify the GPU
- Use the command: **nvidia-smi**
- Look for the GPU index (e.g., `0`, `1`, `2`) of the GPU you want to enable MIG on.
- Confirm the GPU supports MIG (A100, A30, H100, H200, etc.).

### 2. Enable MIG Mode
- Run the following command on the target GPU (index `0` in this example):
  **nvidia-smi -i 0 --mig-mode=1**
- The `-i 0` flag specifies GPU index 0.
- The `--mig-mode=1` flag enables MIG mode (use `0` to disable).

### 3. Reboot the System
- After the command completes, you must reboot the system for the change to take effect.
- Use: **sudo reboot** or the appropriate reboot command for your OS.

### 4. Verify MIG Mode is Enabled
- After reboot, run: **nvidia-smi**
- Look for the line: **MIG Mode: Enabled** under the GPU information.
- If you see **Disabled**, the process was not completed successfully.

---

## 📊 MIG Mode States

| State | Command | Description |
|-------|---------|-------------|
| Disabled | **nvidia-smi -i 0 --mig-mode=0** | MIG is off. GPU runs as a single unit. |
| Enabled | **nvidia-smi -i 0 --mig-mode=1** | MIG is on. GPU can be partitioned. |
| Pending | After command, before reboot | MIG mode is set but not active until reboot. |

---

## 🕵️ Common Issues and Troubleshooting

- **"MIG mode is not supported"** — The GPU does not support MIG. Check the GPU model.
- **"GPU is in use"** — Stop any running processes on the GPU before enabling MIG.
- **MIG mode shows "Disabled" after reboot** — The command may not have persisted. Re-run the enable command and reboot again.
- **System does not boot after enabling MIG** — This is rare. Boot into recovery mode and disable MIG using **nvidia-smi -i 0 --mig-mode=0**.

---

## ✅ Key Takeaways

- MIG mode must be **enabled once per GPU** and persists across reboots.
- A **system reboot** is mandatory after enabling MIG mode.
- After enabling, you can create MIG partitions using **nvidia-smi mig -cgi** commands.
- MIG is ideal for workloads that require **isolation**, **guaranteed performance**, and **multi-tenant GPU sharing**.

---

## 📝 Quick Reference

For reference, the command to enable MIG mode on GPU index 0 is:

```
nvidia-smi -i 0 --mig-mode=1
```

📤 **Output:** The command will return no output if successful. You will see a message like **"Reboot required"** if the change is pending.

For reference, the command to verify MIG mode after reboot is:

```
nvidia-smi
```

📤 **Output:** Look for the line **MIG Mode: Enabled** under the GPU details. If you see **Disabled**, MIG is not active.