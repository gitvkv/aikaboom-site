# 6.2f iperf3: measuring raw network throughput between cluster nodes

#### 🏷️ The Operating System Layer — Linux for AI Infrastructure Operators > 6 Linux Networking & Security Hardening > 6.2 Network Troubleshooting for AI Cluster Operators

---

## 🌐 Context Introduction

In AI clusters, data moves constantly between nodes — during distributed training, model checkpointing, and data loading. If the network is slow or unreliable, your training jobs will stall. **iperf3** is a simple, powerful tool that measures the *raw* throughput between two machines. It strips away application overhead and tells you exactly how fast your network fabric can push data. For new engineers, this is your first diagnostic step when something feels "slow" in the cluster.

---

## ⚙️ What Does iperf3 Measure?

iperf3 tests the **maximum achievable bandwidth** between a client and a server over a specified time period. It reports:

- **Throughput** (in Gbps or Mbps) — how much data moved per second
- **Retransmissions** — packets that had to be resent (indicates congestion or errors)
- **Jitter** (for UDP tests) — variation in packet arrival times

The tool works in two modes:
- **TCP mode** (default) — simulates reliable, connection-oriented traffic
- **UDP mode** — simulates loss-tolerant, real-time traffic (useful for InfiniBand or RDMA testing)

---

## 🛠️ How iperf3 Works in a Cluster

iperf3 uses a **client-server model**:

- One node acts as the **server** (listens for connections)
- Another node acts as the **client** (initiates the traffic flow)

You run the server first, then the client points to the server's IP address. The test runs for a set duration (default 10 seconds) and reports results at the end.

---

## 📊 Key Metrics to Understand

| Metric | What It Tells You | Good Value for AI Cluster |
|--------|-------------------|---------------------------|
| **Throughput** | Raw speed of the link | Should match or exceed your NIC speed (e.g., 100 Gbps for 100GbE) |
| **Retransmissions** | Packet loss or congestion | Ideally 0; anything above 0.1% needs investigation |
| **Jitter** (UDP) | Stability of the connection | Under 1 ms for most AI workloads |
| **Bandwidth** | Maximum capacity | Should be close to theoretical link speed minus protocol overhead |

---

## 🕵️ When to Use iperf3 in AI Operations

Use iperf3 when you suspect:

- **Slow training performance** — network might be the bottleneck
- **Intermittent disconnections** — retransmissions indicate packet loss
- **After hardware changes** — new cables, switches, or NICs installed
- **Before deploying a new workload** — baseline the network first
- **Comparing two paths** — test direct connect vs. through a switch

---

## 🧪 Typical Test Scenarios

**Scenario 1: Single-stream TCP test**
- Run the server on Node A
- Run the client on Node B, pointing to Node A's IP
- Result shows the throughput for one TCP connection

**Scenario 2: Multi-stream TCP test**
- Run the server on Node A
- Run the client with multiple parallel streams (e.g., 4 or 8)
- Result shows aggregate throughput across all streams
- Useful for identifying if a single stream is CPU-limited

**Scenario 3: UDP test (for RDMA or InfiniBand)**
- Run the server in UDP mode on Node A
- Run the client in UDP mode with a target bandwidth
- Result shows actual throughput, jitter, and packet loss

---

## 📈 Interpreting Results

**Good result example:**
- Throughput: **94 Gbps** on a 100 Gbps link
- Retransmissions: **0**
- This means your network is healthy and performing near theoretical limits

**Bad result example:**
- Throughput: **12 Gbps** on a 100 Gbps link
- Retransmissions: **450**
- This indicates a serious problem — likely a bad cable, misconfigured switch port, or CPU bottleneck on one node

---

## 🔍 Common Issues iperf3 Can Reveal

- **Cable or transceiver failure** — throughput drops significantly, retransmissions spike
- **MTU mismatch** — throughput is lower than expected, especially with large data sizes
- **Flow control misconfiguration** — one side is overwhelming the other
- **CPU bottleneck** — single-stream tests show low throughput, but multi-stream tests improve
- **Switch congestion** — throughput varies wildly between test runs
- **Driver or firmware issues** — consistent low throughput across all tests

---

## ✅ Best Practices for New Engineers

- **Test in both directions** — run client on Node A and Node B separately
- **Use multiple streams** — AI traffic is often parallel; test with 4–8 streams
- **Test with realistic durations** — 30 seconds minimum; 60 seconds is better
- **Document your baselines** — record throughput values when the cluster is healthy
- **Test during quiet hours** — avoid interfering with active training jobs
- **Always check retransmissions** — high throughput with high retransmissions is not good
- **Compare against expected link speed** — know your NIC and switch specifications

---

## 🧠 Why This Matters for AI Infrastructure

AI training is **network-bound** in many cases. When you have hundreds of GPUs communicating gradients, even a 10% network loss can double training time. iperf3 gives you a quick, reliable way to verify that your physical and logical network layers are performing correctly before you blame the software stack.

---

## 📚 Summary

iperf3 is your **network speedometer** for AI clusters. It tells you the raw throughput between any two nodes, helping you isolate whether performance issues are caused by the network or by something else. Master this tool early — it will save you hours of debugging later.

**Remember:** Always test with the same parameters you expect your workload to use. If your training uses 8 parallel data streams, test with 8 iperf3 streams. If it uses UDP, test with UDP. Match the test to the reality.