# 11.2a GDDR5, GDDR6, GDDR6X: generational improvements in bandwidth

#### 🏷️ The Nvidia GPU Architecture — The Silicon at the Heart of AI Infrastructure > 11 GPU Memory Subsystems — VRAM, Bandwidth, and the Capacity Crisis > 11.2 GDDR Memory — Traditional GPU Memory

Welcome to the world of GPU memory! If you're new to AI infrastructure, think of GDDR memory as the high-speed working desk for your GPU. Just as a cluttered desk slows down your work, slow memory makes your GPU wait for data. GDDR5, GDDR6, and GDDR6X are successive generations of this memory technology, each designed to move data faster so your AI models train quicker.

---

## 🧠 Context: Why Memory Bandwidth Matters

In AI workloads, the GPU spends most of its time doing math on large matrices. But before it can compute, it must fetch data from memory. **Memory bandwidth** is the amount of data the GPU can read from or write to memory per second. Higher bandwidth means less waiting and faster training.

- **GDDR = Graphics Double Data Rate** — a type of synchronous dynamic random-access memory (SDRAM) optimized for graphics and compute.
- Each generation improves **data rate** (MHz), **bus width** (bits), and **power efficiency**.
- The result: more gigabytes per second (GB/s) of bandwidth.

---

## ⚙️ GDDR5 — The Foundation

GDDR5 was the standard for many years, powering GPUs like the NVIDIA GTX 900 and 10 series.

- **Data rate**: Up to 8 Gbps (gigabits per second per pin)
- **Bus width**: Typically 256-bit or 384-bit
- **Bandwidth**: Up to ~336 GB/s (on high-end cards)
- **Voltage**: 1.5V (relatively high power)
- **Key limitation**: Reached practical speed limits around 8 Gbps due to signal integrity issues.

**Real-world example**: An NVIDIA GTX 1080 Ti uses GDDR5X (an enhanced variant) with ~484 GB/s bandwidth — enough for many AI inference tasks but limiting for large models.

---

## 📊 GDDR6 — The Workhorse

GDDR6 became the mainstream choice for NVIDIA RTX 20 and 30 series GPUs, and many data center cards like the A10.

- **Data rate**: 12–16 Gbps per pin
- **Bus width**: 192-bit to 384-bit
- **Bandwidth**: Up to ~768 GB/s (e.g., RTX 3090)
- **Voltage**: 1.35V (lower power than GDDR5)
- **Key improvements**:
  - Two independent 16-bit channels per chip (instead of one 32-bit channel) — better parallelism
  - Higher density (up to 16 Gb per chip)
  - Improved error correction (ECC support in some variants)

**Why engineers care**: GDDR6 doubled bandwidth over GDDR5 while reducing power per bit. This means you can train larger models without overheating your data center.

---

## 🚀 GDDR6X — The Speed Demon

GDDR6X is NVIDIA's latest innovation, debuting on the RTX 30 series (e.g., RTX 3080, 3090) and continuing in RTX 40 series.

- **Data rate**: 19–21 Gbps per pin (up to 24 Gbps in newer implementations)
- **Bus width**: 384-bit (typical for high-end)
- **Bandwidth**: Up to ~1,008 GB/s (RTX 3090 Ti) and beyond
- **Voltage**: 1.35V (same as GDDR6)
- **Key innovation**: **PAM4 (Pulse Amplitude Modulation with 4 levels)** signaling
  - Traditional GDDR uses NRZ (Non-Return-to-Zero) — 1 bit per clock cycle
  - PAM4 encodes 2 bits per clock cycle by using 4 voltage levels
  - This doubles data rate without increasing clock speed

**Trade-off**: PAM4 is more sensitive to noise and requires better signal integrity design. This is why GDDR6X modules run hotter and may need active cooling.

---

## 🕵️ Comparison Table: GDDR5 vs GDDR6 vs GDDR6X

| Feature | GDDR5 | GDDR6 | GDDR6X |
|---------|-------|-------|--------|
| **Max data rate per pin** | 8 Gbps | 16 Gbps | 21+ Gbps |
| **Typical bus width** | 256–384 bit | 192–384 bit | 384 bit |
| **Max bandwidth (example)** | ~336 GB/s | ~768 GB/s | ~1,008 GB/s |
| **Voltage** | 1.5V | 1.35V | 1.35V |
| **Signaling** | NRZ (1 bit/cycle) | NRZ (1 bit/cycle) | PAM4 (2 bits/cycle) |
| **Channels per chip** | 1 (32-bit) | 2 (16-bit each) | 2 (16-bit each) |
| **Power efficiency** | Baseline | ~40% better | ~15% better than GDDR6 |
| **Heat generation** | Moderate | Low | Higher (needs better cooling) |
| **Typical use case** | Older GPUs, entry-level | Mid-range to high-end | Flagship gaming & AI |

---

## 🛠️ Practical Impact for AI Engineers

When choosing or configuring a GPU for AI workloads, consider these bandwidth implications:

- **Model size vs bandwidth**: A model with 10 billion parameters (40 GB in FP32) needs high bandwidth to feed the compute units. GDDR6X can transfer the entire model in ~40 ms vs ~80 ms for GDDR5.
- **Batch size trade-offs**: Larger batches need more memory bandwidth. GDDR6X allows you to push bigger batches without bottlenecking.
- **Mixed precision training**: Using FP16 or BF16 halves data size, effectively doubling bandwidth utilization. GDDR6X with FP16 can achieve ~2 TB/s effective bandwidth.
- **Power budgeting**: GDDR6X consumes more power per module. In a dense server with 8 GPUs, this adds up. You may need better cooling or lower clock speeds.

**Example scenario**: Training a large language model (LLM) on an NVIDIA A100 (HBM2e memory, ~2 TB/s) vs an RTX 3090 (GDDR6X, ~936 GB/s). The A100's higher bandwidth means it can process more tokens per second, but the RTX 3090 is more cost-effective for smaller models.

---

## 🔍 Key Takeaways for New Engineers

1. **Bandwidth is the bottleneck** — Not compute speed. A fast GPU with slow memory is like a sports car on a dirt road.
2. **GDDR6X is not always better** — It runs hotter and costs more. GDDR6 is still excellent for many AI tasks.
3. **Watch the bus width** — A 384-bit bus with GDDR6 can outperform a 256-bit bus with GDDR6X in some cases.
4. **Future trends** — HBM (High Bandwidth Memory) is even faster but more expensive. GDDR7 is on the horizon with even higher data rates.

Remember: In AI infrastructure, memory bandwidth directly translates to training speed. Understanding these generational improvements helps you make informed decisions when selecting GPUs for your workloads.