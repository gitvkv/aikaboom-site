# 11.2b GDDR physical packaging: mounted chips on PCB, width limited by board lanes

#### 🏷️ The Nvidia GPU Architecture — The Silicon at the Heart of AI Infrastructure > 11 GPU Memory Subsystems — VRAM, Bandwidth, and the Capacity Crisis > 11.2 GDDR Memory — Traditional GPU Memory

## 🧠 Context Introduction

When you look at a modern GPU, you'll notice several small black chips arranged around the main processor. Those are **GDDR memory chips** — the high-speed VRAM that stores textures, frame buffers, and AI model weights. But how these chips are physically attached to the circuit board (PCB) matters a lot for performance. This topic explains the physical packaging of GDDR memory: how chips are mounted on the PCB and why the memory bus width is limited by the number of board lanes available.

---

## ⚙️ How GDDR Chips Are Mounted on the PCB

GDDR memory chips are **surface-mounted** directly onto the printed circuit board (PCB). Each chip is a small, rectangular package with dozens of tiny solder balls underneath (called a BGA — Ball Grid Array). These solder balls connect the chip's internal circuits to the copper traces on the PCB.

Key points about mounting:
- **Each GDDR chip** has its own dedicated data bus (typically 32 bits wide per chip).
- **Multiple chips** are placed around the GPU die, usually in a symmetrical pattern.
- **Traces** (thin copper wires) run from each memory chip to the GPU's memory controller on the die.
- **Signal integrity** is critical — longer traces or poorly routed traces can cause data errors at high speeds.

---

## 📊 The "Width" Problem: Why Board Lanes Are the Bottleneck

The **memory bus width** (e.g., 256-bit, 384-bit) is the total number of bits the GPU can read from or write to memory in a single clock cycle. This width is determined by:

- **Number of GDDR chips** × **bits per chip** = total bus width

For example:
- 8 chips × 32 bits each = 256-bit bus
- 12 chips × 32 bits each = 384-bit bus

But here's the catch: **the PCB has a limited number of physical lanes** (copper traces) that can run from the GPU to the memory chips without causing interference or signal degradation. This limitation comes from:

- **PCB layer count** — more layers cost more money and increase complexity.
- **Trace length** — longer traces introduce latency and signal loss.
- **Crosstalk** — adjacent traces can interfere with each other at high frequencies.
- **Power delivery** — more memory chips require more power and more decoupling capacitors.

---

## 🛠️ Physical Constraints in Practice

| Constraint | Impact on Memory Width |
|------------|------------------------|
| **PCB size** | Larger boards can fit more chips, but cost and form factor limit this. |
| **Number of PCB layers** | More layers allow more traces, but increase manufacturing cost. |
| **Signal integrity** | High-speed GDDR (like GDDR6X) requires careful trace routing, limiting how many lanes can be packed together. |
| **Thermal management** | More chips generate more heat, requiring better cooling solutions. |
| **GPU die size** | The GPU's memory controller has a fixed number of physical pins — this sets the maximum number of lanes. |

---

## 🕵️ Real-World Example: Comparing Memory Configurations

Let's look at two common GPU memory configurations to see how physical packaging affects width:

**Entry-level GPU (e.g., RTX 4060):**
- 6 GDDR6 chips
- Each chip: 32-bit bus
- Total bus width: 6 × 32 = **192-bit**
- Chips are mounted on one side of the PCB, in a compact layout.

**High-end GPU (e.g., RTX 4090):**
- 12 GDDR6X chips
- Each chip: 32-bit bus
- Total bus width: 12 × 32 = **384-bit**
- Chips are mounted on both sides of the PCB (some on front, some on back) to fit within the board's physical dimensions.

---

## 🔍 Why Can't We Just Add More Chips?

You might wonder: *why not just put 16 chips for a 512-bit bus?* Here's why that's difficult:

1. **PCB real estate** — The GPU die is only so big; there's limited space around it for memory chips.
2. **Trace routing complexity** — Each additional chip requires 32+ traces to the GPU. At high speeds, these traces must be exactly the same length to avoid timing skew.
3. **Power delivery** — More chips draw more current, requiring thicker power planes and more capacitors.
4. **Cost** — High-layer-count PCBs with complex routing are expensive to manufacture.

---

## 📈 Summary Table: GDDR Physical Packaging Trade-offs

| Factor | Benefit of More Chips | Limitation |
|--------|----------------------|------------|
| **Bus width** | Higher bandwidth (more bits per cycle) | PCB trace count and routing complexity |
| **Capacity** | More VRAM for large models | Physical space on PCB |
| **Cost** | N/A | More chips + complex PCB = higher cost |
| **Power** | N/A | More chips = higher power draw and heat |

---

## 🧪 Key Takeaway for New Engineers

When you see a GPU spec sheet listing a **256-bit** or **384-bit** memory bus, remember that number isn't arbitrary — it's a direct result of how many GDDR chips the engineers could physically fit around the GPU die and reliably connect using the available PCB lanes. The memory bus width is a fundamental design constraint that balances **performance**, **cost**, **power**, and **physical space**.

As AI workloads demand more memory bandwidth, engineers are pushing the limits of GDDR packaging — using faster chips (GDDR6X), more layers in the PCB, and even stacking chips (3D packaging) to overcome the lane limitation.