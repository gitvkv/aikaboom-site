# 1.6c Redundant power supplies: N+1 and 2N configurations for zero downtime

#### 🏷️ The Physical Realm — Data Center Foundations & Hardware Architecture > 1 What Is a Computer? Core Architecture for Absolute Beginners > 1.6 Enterprise Server Anatomy — What Makes a Server Different from a Desktop

---

## 🌱 Context Introduction

In enterprise data centers, power failures are not a matter of *if* but *when*. A single power supply failure can bring down an entire server, causing costly downtime. Redundant power supplies solve this by providing backup power paths. For new engineers, understanding **N+1** and **2N** configurations is essential — these are the two most common redundancy models used to achieve zero downtime during power supply failures.

Think of it like this: if your server needs **N** power supplies to run, redundancy means you have extra units ready to take over instantly if one fails.

---

## ⚙️ What is "N" in Power Redundancy?

- **N** = The minimum number of power supplies required to run the server at full load.
- Example: If a server needs **two** 1000W power supplies to power all components, then **N = 2**.

---

## 🛠️ N+1 Redundancy — The Practical Standard

**N+1** means you have **one extra** power supply beyond what is needed.

### How it works:
- You install **N+1** power supplies (e.g., 3 units when only 2 are needed).
- If one power supply fails, the remaining **N** units continue to supply full power.
- The server does not shut down — zero downtime is achieved.

### Key characteristics:
- ✅ **Cost-effective**: Only one extra unit is added.
- ✅ **Common in most enterprise servers**: Many servers ship with N+1 as default.
- ❌ **Single point of failure still exists**: If the power distribution (e.g., a single PDU or circuit) fails, the server still goes down.

### Real-world example:
| Component | N (Minimum) | N+1 Configuration |
|-----------|-------------|-------------------|
| Power supplies | 2 | 3 units installed |
| Power cords | 2 | 3 cords connected |
| PDU circuits | 1 | 2 circuits (optional) |

---

## 🕵️ 2N Redundancy — Maximum Protection

**2N** means you have **twice** the number of power supplies needed — a full duplicate of everything.

### How it works:
- You install **2 × N** power supplies (e.g., 4 units when only 2 are needed).
- Each power supply is connected to a **separate, independent power source** (different PDU, different UPS, different electrical circuit).
- If **one entire power path** fails (e.g., a circuit breaker trips), the other path still provides full power.

### Key characteristics:
- ✅ **Zero single points of failure**: Both the power supply and the power source are duplicated.
- ✅ **True fault tolerance**: The server can survive a power supply failure *and* a power distribution failure.
- ❌ **Expensive**: Requires double the hardware, space, and electrical infrastructure.
- ❌ **Overkill for most workloads**: Typically used only for mission-critical systems (e.g., financial trading, emergency services).

### Real-world example:
| Component | N (Minimum) | 2N Configuration |
|-----------|-------------|------------------|
| Power supplies | 2 | 4 units installed |
| Power cords | 2 | 4 cords (2 per PSU) |
| PDU circuits | 1 | 2 independent circuits |
| UPS systems | 1 | 2 separate UPS units |

---

## 📊 Comparison Table: N+1 vs 2N

| Feature | N+1 | 2N |
|---------|-----|----|
| Number of extra units | 1 | N (full duplicate) |
| Cost | Low | High (2× hardware) |
| Survives a PSU failure | ✅ Yes | ✅ Yes |
| Survives a circuit/PDU failure | ❌ No | ✅ Yes |
| Survives a UPS failure | ❌ No | ✅ Yes |
| Typical use case | General enterprise servers | Mission-critical systems |
| Power efficiency | Good (all units share load) | Lower (units run at partial load) |
| Space required | Minimal | Double |

---

## 🔌 How to Identify Redundancy in a Server

For a new engineer, here is how you can check which configuration a server uses:

1. **Look at the back of the server**: Count the number of power supply slots vs. installed units.
   - If you see **3 slots but only 2 filled**, that is **N+1** (assuming N=2).
   - If you see **4 slots all filled**, that could be **2N** (assuming N=2).

2. **Check the power cords**: 
   - **N+1**: All cords usually plug into the same PDU or circuit.
   - **2N**: Cords are split between two separate PDUs or circuits (often labeled "A" and "B").

3. **Read the server's BIOS or management interface** (e.g., iDRAC, iLO, BMC):
   - Look for **Power Supply Redundancy Mode** settings.
   - Common modes: **N+1** (default), **2N**, or **No Redundancy**.

---

## 🧠 Key Takeaways for New Engineers

- **N+1** is the standard for most enterprise servers — it protects against a single power supply failure.
- **2N** is for systems that cannot tolerate any downtime, even if an entire power distribution path fails.
- **Zero downtime** means the server stays on during a failure — this is achieved by having redundant power supplies that take over instantly (no reboot required).
- **Always verify** the actual configuration: just because a server has multiple power supplies does not mean it is truly redundant — check the cabling and power sources.
- **Power redundancy is only one piece of the puzzle**: You also need redundant cooling, networking, and storage for true high availability.

---

## 📝 Quick Reference Card

```
N+1 Configuration:
  - N = Minimum PSUs needed
  - Install N+1 PSUs
  - All PSUs share load
  - Survives 1 PSU failure
  - Does NOT survive circuit failure

2N Configuration:
  - N = Minimum PSUs needed
  - Install 2N PSUs
  - Split across 2 independent power sources
  - Survives 1 PSU failure
  - Survives 1 circuit failure
  - Survives 1 UPS failure
```

---

*Remember: Redundant power supplies are your first line of defense against unplanned downtime. Always design for the failure scenario that matters most to your workload.*