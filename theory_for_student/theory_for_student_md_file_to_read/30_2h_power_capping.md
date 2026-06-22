# 30.2h Power capping: when TDP limits cause performance reduction

#### 🏷️ The Virtualization and Cloud — Extending AI Infrastructure Beyond Bare Metal > 30 GPU Diagnostics and nvidia-smi Mastery > 30.2 Hardware Error Detection and Diagnosis

---

## 🔍 Context Introduction

When you deploy AI workloads on NVIDIA GPUs, you expect maximum performance. However, GPUs have a **Thermal Design Power (TDP)** limit — a maximum amount of power the GPU is designed to consume safely. If your system or workload pushes the GPU beyond this limit, the GPU automatically **reduces its clock speed** (throttles) to stay within the power budget. This is called **power capping**.

For new engineers, think of it like a car's speed limiter: the engine can go faster, but the limiter cuts power to prevent overheating or damage. In AI infrastructure, power capping can silently reduce training throughput, inference speed, and overall job completion time.

---

## ⚙️ What is TDP and Power Capping?

- **TDP (Thermal Design Power)**: The maximum amount of heat a GPU is designed to dissipate under normal operation. Measured in watts (W).
- **Power capping**: A hardware or software mechanism that limits the GPU's power consumption to a value **below** its maximum TDP.
- **Why it happens**: To protect the GPU from overheating, to meet data center power budgets, or to comply with facility cooling limits.

---

## 📊 How Power Capping Affects Performance

When a GPU hits its power cap, it **reduces core clock speed** and **memory clock speed**. This directly impacts:

- **Training throughput**: Fewer floating-point operations per second (FLOPS)
- **Inference latency**: Slower response times for model predictions
- **Batch processing**: Smaller batches or longer iteration times

---

## 🕵️ Detecting Power Capping

You can detect power capping using **nvidia-smi** — the primary NVIDIA GPU monitoring tool. Look for these signs:

- **Power draw** is consistently at or near the power limit (e.g., 250W for an A100)
- **GPU clock speed** is lower than the maximum rated clock
- **Throttle reasons** show "Power Cap" or "Thermal" in the status

### Key nvidia-smi fields to check:

| Field | What to look for | Meaning |
|-------|------------------|---------|
| **Power Draw** | Value close to Power Limit | GPU is hitting the cap |
| **Clocks** | Core/Memory below max | Performance is reduced |
| **Throttle Reasons** | "Power Cap" active | Power capping is engaged |

---

## 🛠️ Common Causes of Power Capping

- **Insufficient power supply**: The PSU cannot deliver enough wattage to all GPUs simultaneously.
- **Data center power limits**: Facility-level power caps enforced by management software.
- **Cooling constraints**: High ambient temperature forces the GPU to reduce power to stay cool.
- **BIOS or firmware settings**: Server BIOS may enforce power limits for stability.
- **Software power limits**: Tools like **nvidia-smi** can set a manual power cap.

---

## 📈 Comparison: Normal vs. Power-Capped GPU

| Metric | Normal Operation | Power-Capped Operation |
|--------|------------------|------------------------|
| **Power Draw** | 250W (max) | 200W (capped) |
| **Core Clock** | 1410 MHz | 900 MHz |
| **Memory Clock** | 1215 MHz | 1000 MHz |
| **Training Throughput** | 100% | ~70% |
| **Inference Latency** | 10 ms | 15 ms |

---

## 🔧 How to Resolve Power Capping

1. **Check power supply capacity**: Ensure your PSU can handle the total TDP of all GPUs plus system overhead.
2. **Adjust power limits**: Use **nvidia-smi** to increase the power limit (if hardware allows). Example: set power limit to 250W.
3. **Improve cooling**: Lower ambient temperature, improve airflow, or add liquid cooling.
4. **Review BIOS settings**: Disable any power-saving or power-limiting features.
5. **Monitor continuously**: Use **nvidia-smi** or **DCGM** (Data Center GPU Manager) to track power draw over time.

---

## 🧠 Key Takeaways for New Engineers

- **Power capping is silent**: Your GPU may be running at 70% performance without any error messages.
- **Always check power draw** when troubleshooting slow AI workloads.
- **TDP is not a suggestion** — it's a hard limit enforced by hardware.
- **Power capping is not a defect** — it's a protective feature. But it can be misconfigured.
- **Use monitoring tools** to detect power capping before blaming the model or code.

---

## 📚 Summary

Power capping is a common but often overlooked cause of performance reduction in AI infrastructure. By understanding TDP limits, monitoring power draw, and adjusting system configurations, you can ensure your GPUs run at full capacity. Always start your diagnostics with **nvidia-smi** to check power, clocks, and throttle reasons — it's your first line of defense against hidden performance loss.