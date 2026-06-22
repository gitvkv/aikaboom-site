# 22.4c NCCL environment variables for tuning: NCCL_DEBUG, NCCL_IB_HCA, NCCL_NET_GDR_LEVEL

#### 🏷️ The Nvidia Software Stack — Bridging Silicon and Python > 22 Base Drivers, CUDA, and Core Libraries > 22.4 NCCL — GPU Collective Communications

---

## 🔍 Context Introduction

When you run multi-GPU training or inference workloads, the NVIDIA Collective Communications Library (NCCL) handles all the behind-the-scenes data exchange between GPUs. Think of NCCL as a high-speed traffic controller for GPU-to-GPU communication. To get the best performance, you sometimes need to tell NCCL exactly how to behave. That's where **environment variables** come in. These are simple settings you can adjust before launching your workload to control debugging, network selection, and data transfer paths. This guide covers three essential NCCL environment variables that every engineer working with AI infrastructure should understand.

---

## ⚙️ NCCL_DEBUG — Understanding What NCCL Is Doing

**What it does:** This variable controls how much information NCCL prints to the console. It is your primary diagnostic tool when something goes wrong or when you want to verify your setup.

**Common values and their use cases:**

- **NCCL_DEBUG=WARN** — Only prints warnings and errors. Use this for normal production runs to keep logs clean.
- **NCCL_DEBUG=INFO** — Prints detailed information about topology detection, network selection, and communication setup. Use this when setting up a new system or troubleshooting.
- **NCCL_DEBUG=VERSION** — Prints only the NCCL version at startup. Useful for quickly confirming which library version is loaded.
- **NCCL_DEBUG=TRACE** — Prints every single communication operation. Extremely verbose. Only use for deep debugging with small workloads.

**📤 Output example (conceptual):** When you set **NCCL_DEBUG=INFO**, you will see lines like "NCCL INFO Using network: IB" or "NCCL INFO Ring 0: rank 0 using GPU 0 on node 0". This tells you exactly which network and GPUs NCCL selected.

---

## 🛠️ NCCL_IB_HCA — Choosing Which InfiniBand Adapter to Use

**What it does:** InfiniBand (IB) is a high-speed networking technology commonly used in GPU clusters. This variable tells NCCL which specific InfiniBand Host Channel Adapter (HCA) to use for communication. If you have multiple IB cards, this is how you select the right one.

**How to use it:**

- **NCCL_IB_HCA=mlx5_0** — Use only the first Mellanox ConnectX adapter (typically the first one detected).
- **NCCL_IB_HCA=mlx5_0:1,mlx5_1:1** — Use two specific adapters with explicit port selection.
- **NCCL_IB_HCA=^mlx5_1** — The caret (^) means "exclude this adapter." Use all adapters except mlx5_1.
- **NCCL_IB_HCA=default** — Let NCCL automatically detect and use all available IB adapters.

**🕵️ When to tune this:** If your system has multiple IB adapters but some are connected to different networks (e.g., storage vs. compute), you may need to explicitly select the compute-facing adapter. If NCCL picks the wrong one, performance will suffer.

---

## 📊 NCCL_NET_GDR_LEVEL — Controlling GPU Direct RDMA

**What it does:** GPU Direct RDMA (GDR) allows data to move directly between a GPU and a network adapter without passing through the CPU or system memory. This is much faster but requires specific hardware support. This variable controls how aggressively NCCL uses GDR.

**Common values and their meanings:**

| Value | Behavior | When to Use |
|-------|----------|-------------|
| **0** | Disable GDR completely | When you suspect GDR is causing crashes or instability |
| **1** | Enable GDR for local node communication only | Safe default for most systems |
| **2** | Enable GDR for both local and cross-node communication | Best performance, but requires full hardware support |
| **3** | Enable GDR with additional optimizations | Advanced tuning for specific hardware configurations |
| **5** | Maximum GDR usage (most aggressive) | Only for systems with verified GDR support on all paths |

**📤 Output example (conceptual):** With **NCCL_NET_GDR_LEVEL=2**, NCCL will attempt to use GPU Direct RDMA for all inter-node transfers. If the hardware does not support it, NCCL will fall back to slower CPU-mediated transfers.

---

## 🧩 Putting It All Together — A Practical Example

For a typical multi-node training setup with InfiniBand, you might set these variables together before launching your training script:

**For reference:**
```
export NCCL_DEBUG=WARN
export NCCL_IB_HCA=mlx5_0
export NCCL_NET_GDR_LEVEL=1
```

**📤 Output:** With these settings, NCCL will only print warnings (keeping logs clean), use only the first InfiniBand adapter (mlx5_0), and enable GPU Direct RDMA only for local node transfers (safe default).

---

## ✅ Quick Troubleshooting Checklist

- **If training is slow:** Set **NCCL_DEBUG=INFO** and check which network NCCL selected. Look for "Using network: IB" (good) vs. "Using network: Socket" (slow fallback).
- **If you see "No IB devices found":** Verify your InfiniBand drivers are loaded and set **NCCL_IB_HCA** to the correct adapter name.
- **If you get crashes with GDR errors:** Set **NCCL_NET_GDR_LEVEL=0** to disable GDR completely and test if the crashes stop.
- **If you have multiple IB adapters:** Use **NCCL_IB_HCA=^** followed by the adapter you want to exclude, or list specific adapters explicitly.

---

## 📚 Summary

These three environment variables give you direct control over NCCL's behavior without changing any code. **NCCL_DEBUG** helps you see what is happening, **NCCL_IB_HCA** lets you pick the right network hardware, and **NCCL_NET_GDR_LEVEL** controls how aggressively data bypasses the CPU. Start with safe defaults (WARN, default adapter, GDR level 1), then tune based on what you observe in the debug output.