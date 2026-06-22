# 30.1h Controlling GPUs: set-power-limit, set-compute-mode, persistence-mode

Welcome, new engineer! This section introduces three essential `nvidia-smi` controls that help you manage how your GPUs behave in production or development environments. These commands are like the "settings panel" for your GPU hardware — they let you limit power draw, restrict access, and keep the GPU ready for work.

#### 🏷️ The Virtualization and Cloud — Extending AI Infrastructure Beyond Bare Metal > 30 GPU Diagnostics and nvidia-smi Mastery > 30.1 nvidia-smi — The Primary GPU Management Tool

---

## ⚙️ Context: Why Control GPUs?

GPUs are powerful but can be power-hungry, noisy, and shared among multiple users or workloads. Without proper controls, a single runaway process could:
- Overheat the system by drawing maximum power.
- Block other users from accessing the GPU.
- Cause slow startup times when workloads begin.

The three controls covered here solve these problems directly.

---

## 🛠️ 1. Setting a Power Limit (`set-power-limit`)

**What it does:** Limits the maximum power (in watts) your GPU can draw. This is useful for reducing heat, lowering electricity costs, or staying within a data center power budget.

**When to use it:**
- You want to run a GPU at lower power to save energy or reduce fan noise.
- You are testing or benchmarking under constrained power conditions.
- You need to prevent a GPU from exceeding a certain thermal threshold.

**How it works (conceptually):**
- You specify a power limit value (e.g., 150 watts) for a specific GPU.
- The GPU driver will throttle performance to stay at or below that limit.
- The limit is persistent until you change it or reboot (if persistence mode is enabled — see below).

**Key points:**
- The minimum and maximum power limits vary by GPU model. You can check the current range with `nvidia-smi -q -d POWER`.
- Setting a limit too low may cause performance degradation.
- This setting is per GPU, not per system.

---

## 🔒 2. Setting Compute Mode (`set-compute-mode`)

**What it does:** Controls how many processes can use the GPU at the same time. This is critical for shared environments where you want to prevent one user from monopolizing the GPU.

**Available modes (from most restrictive to least):**

| Mode | Behavior | Use Case |
|------|----------|----------|
| **Exclusive Process** | Only one process can use the GPU at a time. | Single-user training jobs that need full GPU memory. |
| **Exclusive Thread** | Only one thread from one process can use the GPU. | Rare; used for debugging or single-thread workloads. |
| **Prohibited** | No process can use the GPU. | Temporarily disabling a GPU for maintenance. |
| **Default** | Multiple processes can share the GPU. | Normal multi-user or multi-workload environments. |

**When to use it:**
- You want to reserve a GPU for a specific job.
- You need to prevent accidental GPU sharing that could cause out-of-memory errors.
- You are debugging a GPU and want to lock it to a single process.

**Key points:**
- Changing compute mode requires root or sudo privileges.
- The mode takes effect immediately for new processes; existing processes are unaffected.
- After a reboot, the mode resets to **Default** unless persistence mode is on.

---

## 🔄 3. Persistence Mode (`persistence-mode`)

**What it does:** Keeps the NVIDIA driver loaded in memory even when no process is using the GPU. This eliminates the startup delay when a new workload begins.

**Why it matters:**
- Without persistence mode, the driver unloads when the last process exits. The next process must reload the driver, causing a delay of several seconds.
- With persistence mode enabled, the driver stays ready, so workloads start instantly.

**When to use it:**
- You run frequent, short GPU workloads (e.g., inference serving, batch jobs).
- You want to reduce latency for the first GPU operation after idle periods.
- You are managing a production server where uptime and responsiveness matter.

**Key points:**
- Persistence mode consumes a small amount of memory (typically a few MB) even when idle.
- It is recommended for most production and development servers.
- It can be enabled globally or per GPU.

---

## 📊 Comparison Table: When to Use Each Control

| Control | Purpose | Persists After Reboot? | Requires Root? |
|---------|---------|------------------------|----------------|
| **set-power-limit** | Limit power draw | No (unless persistence mode is on) | Yes |
| **set-compute-mode** | Restrict GPU access | No (resets to Default) | Yes |
| **persistence-mode** | Keep driver loaded | Yes (if set at system level) | Yes |

---

## 🧠 Practical Tips for New Engineers

- **Always check current settings first** before making changes. Use `nvidia-smi -q` to see power limits, compute mode, and persistence mode status.
- **Combine persistence mode with power limits** for a stable, low-latency GPU environment.
- **Use compute mode carefully** in shared environments — setting a GPU to "Exclusive Process" can block other users unexpectedly.
- **Test your changes** by running a small workload after applying a setting to confirm it behaves as expected.
- **Document your GPU configurations** so other engineers know what limits or modes are in place.

---

## ✅ Summary

- **set-power-limit** controls how much power the GPU can consume — great for thermal and energy management.
- **set-compute-mode** controls who can use the GPU — essential for multi-user environments.
- **persistence-mode** keeps the GPU driver ready — reduces latency for frequent workloads.

Mastering these three controls gives you fine-grained authority over your GPU infrastructure, helping you balance performance, power, and access in any AI workload scenario.