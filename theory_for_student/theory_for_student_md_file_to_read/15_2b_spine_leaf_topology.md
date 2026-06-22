# 15.2b Spine-Leaf (Clos) topology: equal-cost paths and predictable low latency

#### 🏷️ The AI Data Center Networking — Moving Petabytes Without Latency > 15 The AI Traffic Problem — Why Standard Networks Fail AI Clusters > 15.2 Network Topology Designs for AI Clusters

---

## 🌐 Context: Why Traditional Networks Struggle with AI

AI training workloads, especially large language models and deep learning, generate massive east-west traffic — data moving between GPUs and servers within the same cluster. Traditional three-tier networks (core, aggregation, access) create bottlenecks because traffic must pass through a single path, causing congestion and unpredictable latency. The **Spine-Leaf (Clos) topology** solves this by providing multiple parallel paths and consistent low latency.

---

## ⚙️ What Is Spine-Leaf (Clos) Topology?

Spine-Leaf is a two-layer network design where every **leaf switch** connects to every **spine switch** in a full mesh. This creates a non-blocking fabric where any server can reach any other server with the same number of hops.

- **Leaf switches**: Connect to servers (compute nodes) and act as the entry/exit point for traffic.
- **Spine switches**: Connect only to leaf switches and provide high-speed forwarding between leaves.
- **Full mesh**: Every leaf has a link to every spine — no single point of failure.

---

## 🕵️ Equal-Cost Paths: The Magic of Multipathing

In a Spine-Leaf design, traffic from one leaf to another has **multiple equal-cost paths** — one through each spine switch. This is called **Equal-Cost Multi-Path (ECMP)** routing.

- **How it works**: When a leaf sends data to another leaf, it can choose any spine switch because all paths have the same cost (same number of hops).
- **Load balancing**: Traffic is spread across all available spines, preventing any single link from becoming saturated.
- **Resilience**: If one spine fails, traffic instantly uses the remaining spines — no downtime.

### 📊 Example: 4-Spine, 8-Leaf Topology

| Component | Count | Role |
|-----------|-------|------|
| Spine switches | 4 | High-speed forwarding between leaves |
| Leaf switches | 8 | Connect to servers (e.g., 48 ports each) |
| Links per leaf | 4 | One link to each spine |
| Total paths between leaves | 4 | One path per spine |

**Key insight**: With 4 spines, you get 4 equal-cost paths between any two servers — this is the foundation of predictable performance.

---

## 📉 Predictable Low Latency: Why It Matters for AI

AI training is sensitive to latency variation. If one packet takes longer than expected, the entire training step can stall. Spine-Leaf guarantees **consistent low latency** because:

- **Fixed hop count**: Every packet travels exactly 2 hops (leaf → spine → leaf) regardless of destination.
- **No congestion**: ECMP spreads traffic evenly, so no single link becomes overloaded.
- **Deterministic behavior**: Latency is predictable — no spikes from routing changes or link failures.

### 🛠️ How Engineers Verify Predictable Latency

Engineers use network monitoring tools to measure latency between leaf switches. The expected result is that latency remains stable even under high load.

**For reference:**
```
ping -c 100 -i 0.01 10.0.1.2
```
📤 **Output:** `rtt min/avg/max/mdev = 0.123/0.127/0.131/0.002 ms`

The low **mdev** (mean deviation) value confirms predictable latency — variation is less than 0.01 ms.

---

## 🆚 Comparison: Traditional vs. Spine-Leaf for AI

| Feature | Traditional Three-Tier | Spine-Leaf (Clos) |
|---------|----------------------|-------------------|
| Path count | 1 (single path) | Multiple (N spines) |
| Latency | Variable (depends on load) | Predictable (fixed hops) |
| Scalability | Limited (core becomes bottleneck) | Linear (add spines/leaves) |
| Failure impact | High (single link failure) | Minimal (traffic rebalances) |
| AI workload fit | Poor | Excellent |

---

## 🧠 Key Takeaways for New Engineers

- **Spine-Leaf is the standard** for AI clusters because it eliminates network bottlenecks.
- **Equal-cost paths** mean you can add more spines to increase bandwidth without redesigning the network.
- **Predictable low latency** is critical for GPU-to-GPU communication in distributed training.
- **ECMP** automatically balances traffic — no manual tuning required.
- **Always monitor** latency and link utilization to ensure the fabric is performing as expected.

---

## ✅ Summary

The Spine-Leaf (Clos) topology is the backbone of modern AI data centers. By providing multiple equal-cost paths and predictable low latency, it enables AI workloads to scale efficiently. For new engineers, understanding this design is the first step toward building and operating high-performance AI infrastructure.