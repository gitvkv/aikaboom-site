# 12.2b SXM (Server PCI Express Module): direct baseboard mounting, TDP 700W+

#### 🏷️ The Nvidia GPU Architecture — The Silicon at the Heart of AI Infrastructure > 12 NVIDIA GPU Generations & Form Factors > 12.2 Data Center GPU Form Factors

## 📖 Context Introduction

When you first look at a data center GPU, you might expect something that looks like a graphics card you'd install in a desktop PC. The **SXM (Server PCI Express Module)** form factor is different — it's designed specifically for high-performance AI and HPC workloads inside enterprise servers. Unlike standard PCIe slot cards, SXM GPUs mount **directly onto the server's baseboard** (motherboard) using a specialized connector. This direct connection allows for much higher power delivery and faster data transfer between the GPU and the rest of the system.

The most important number to remember for this topic is **700W+ TDP** — these GPUs can consume over 700 watts of power under full load, which is more than 3x what a typical high-end desktop GPU uses. This power level requires specialized cooling, power delivery, and server chassis design.

---

## ⚙️ What Makes SXM Different from Standard PCIe GPUs?

| Feature | Standard PCIe GPU | SXM GPU |
|---------|-------------------|---------|
| **Mounting** | Plugs into a PCIe slot on the riser card | Directly soldered or socketed onto the baseboard |
| **Power Delivery** | Limited by PCIe slot (75W) + auxiliary cables (up to ~300W total) | Dedicated power connectors on the baseboard (700W+) |
| **Cooling** | Typically fan-cooled, air exhaust | Liquid cooling or high-performance air cooling (server-level) |
| **Interconnect** | PCIe Gen 4/5 lanes | NVLink bridges for GPU-to-GPU communication |
| **Physical Size** | Fits standard server slots | Custom form factor, requires specific server chassis |
| **Use Case** | General compute, graphics, light AI | Heavy AI training, large-scale HPC |

---

## 🛠️ Direct Baseboard Mounting Explained

**Direct baseboard mounting** means the GPU is not on a removable card. Instead:

- The GPU module sits on a dedicated socket or is soldered directly to the server's main circuit board.
- This eliminates the need for PCIe riser cables or slot connectors.
- The connection is **shorter and more reliable**, reducing signal loss at high speeds.
- Power delivery traces are wider and thicker, allowing for the 700W+ power draw without overheating the board.

**Why does this matter for engineers?**
- You cannot simply swap an SXM GPU like a PCIe card — it requires server disassembly.
- The baseboard must be designed specifically for SXM modules.
- Cooling systems (liquid cold plates or high-CFM fans) are integrated into the chassis, not the GPU itself.

---

## 🔥 Understanding the 700W+ TDP

**TDP (Thermal Design Power)** of 700W+ means the GPU can generate over 700 watts of heat at maximum load. To put this in perspective:

- A typical household microwave uses about 1000W.
- A standard server CPU uses 150–300W.
- An SXM GPU at 700W+ is essentially a **small space heater** inside your server.

**Cooling requirements for 700W+ TDP:**
- **Liquid cooling** is common in high-density deployments (e.g., NVIDIA DGX systems).
- **Air cooling** requires high-speed fans and large heatsinks, often with direct airflow channels.
- The server chassis must have **redundant cooling** to prevent thermal shutdown.

**Power delivery requirements:**
- The baseboard must have **thick copper traces** and **multiple power phases** to handle 700W+.
- Power connectors are typically **12V or 48V** high-current inputs.
- The server's power supply unit (PSU) must be rated for the total system power (e.g., 4x SXM GPUs = 2800W+ just for GPUs).

---

## 🕵️ Common SXM Form Factors You'll Encounter

| SXM Version | Typical GPU | TDP Range | Cooling Type |
|-------------|-------------|-----------|--------------|
| SXM2 | V100 | 300–350W | Air or liquid |
| SXM3 | A100 | 400–500W | Liquid preferred |
| SXM4 | H100 | 700–800W | Liquid required |
| SXM5 | B200 | 700–1000W | Liquid required |

---

## 📊 Key Engineering Considerations for SXM Deployments

- **Chassis compatibility:** Not every server can accept SXM GPUs. You need a server specifically designed with SXM sockets (e.g., NVIDIA DGX, Supermicro SYS-420GP, Dell PowerEdge XE series).
- **Power budgeting:** A single server with 8x SXM GPUs at 700W each = 5600W just for GPUs. Add CPUs, memory, storage, and networking, and total system power can exceed 10kW.
- **Cooling infrastructure:** For liquid-cooled SXM systems, you need a facility with **coolant distribution units (CDUs)** and proper plumbing.
- **NVLink topology:** SXM GPUs connect to each other via NVLink bridges on the baseboard. This creates a high-speed GPU interconnect (up to 900 GB/s) that is critical for AI training performance.
- **Serviceability:** Replacing an SXM GPU often requires removing the entire cooling assembly and sometimes the baseboard. Plan for longer maintenance windows.

---

## ✅ Summary for New Engineers

- **SXM = Server PCI Express Module** — a direct-mount GPU form factor for data centers.
- **Direct baseboard mounting** means the GPU is attached to the motherboard, not a PCIe slot.
- **700W+ TDP** requires liquid cooling, high-current power delivery, and specialized server chassis.
- You will see SXM GPUs in high-end AI training systems like NVIDIA DGX and HGX platforms.
- When planning infrastructure, always account for power, cooling, and physical space for SXM-based servers.

**Remember:** If you see a GPU that looks like a flat, rectangular module with no fans and a metal mounting bracket, and the server has liquid cooling tubes running to it — you're looking at an SXM GPU.