# 18.3a DOCA SDK: applications, libraries, and services for DPU programming

#### 🏷️ The AI Data Center Networking — Moving Petabytes Without Latency > 18 NVIDIA Data Processing Units (DPUs) — Offloading Infrastructure > 18.3 DOCA — The DPU Programming Framework

## 🌐 Context Introduction

Welcome to the world of Data Processing Units (DPUs). Think of a DPU as a specialized processor designed to handle data movement and infrastructure tasks that would otherwise consume valuable CPU cycles. The **DOCA SDK** (Data Center Infrastructure-on-a-Chip Architecture) is NVIDIA's software framework that allows you to program these DPUs. For new engineers, DOCA is the bridge that lets you offload networking, storage, and security tasks from the main CPU to the DPU, freeing up compute resources for actual AI workloads.

---

## 🧩 What is the DOCA SDK?

The DOCA SDK is a comprehensive software development kit that provides:

- **Applications** – Ready-to-use programs that solve common data center problems
- **Libraries** – Pre-built code modules you can integrate into your own applications
- **Services** – Background processes that run on the DPU to manage infrastructure

Together, these components let you build high-performance, secure, and efficient data center solutions without needing to become a hardware expert.

---

## ⚙️ DOCA Applications

DOCA applications are pre-built, production-ready programs that run on the DPU. They solve specific infrastructure challenges out of the box.

| Application | Purpose | Key Benefit |
|-------------|---------|-------------|
| **DOCA Flow** | Manages network traffic rules and packet processing | Offloads complex networking from CPU |
| **DOCA Firefly** | Provides time synchronization (PTP) for distributed systems | Ensures nanosecond-level clock accuracy |
| **DOCA Telemetry** | Monitors DPU health, performance, and network metrics | Gives visibility without CPU overhead |
| **DOCA Compression** | Handles data compression/decompression at line rate | Accelerates storage and data transfer |
| **DOCa Crypto** | Performs encryption/decryption operations | Secures data without slowing the CPU |

**How engineers use them:** You can deploy these applications directly on the DPU using a simple configuration file. For example, to enable packet filtering, you would configure a **DOCA Flow** rule set and load it onto the DPU. No custom coding required.

---

## 📚 DOCA Libraries

DOCA libraries are the building blocks for custom DPU programming. They provide APIs (Application Programming Interfaces) that let you write your own applications that run on the DPU.

### Key Libraries Explained Simply

- **📦 libdoca_common** – Core utilities for memory management, logging, and error handling. Think of it as the "glue" that all other libraries depend on.
- **🌐 libdoca_eth** – Ethernet networking functions. Lets you send and receive packets, manage MAC addresses, and configure network interfaces directly from the DPU.
- **💾 libdoca_dma** – Direct Memory Access operations. Enables high-speed data movement between the DPU, host CPU, and other devices without CPU intervention.
- **🔐 libdoca_security** – Security functions for authentication, encryption, and access control. Protects data as it moves through the DPU.
- **⏱️ libdoca_timer** – Precise timing and scheduling. Useful for applications that need to trigger events at exact intervals.

**How engineers use them:** You write C or Python code that calls these library functions. For instance, to create a custom packet filter, you would use **libdoca_eth** to capture packets and **libdoca_flow** to apply filtering rules. The libraries handle all the low-level DPU hardware interactions.

---

## 🛠️ DOCA Services

DOCA services are background processes that run continuously on the DPU, managing infrastructure tasks automatically.

### Core Services

- **🔄 DOCA Orchestration Service** – Manages the lifecycle of other DOCA applications and services. It starts, stops, and monitors everything running on the DPU.
- **📊 DOCA Monitoring Service** – Collects performance metrics (CPU usage, memory, network throughput) and exposes them via standard APIs (e.g., Prometheus).
- **🔗 DOCA Network Service** – Handles basic network configuration like IP addressing, routing, and VLAN setup. It ensures the DPU is always connected correctly.
- **🛡️ DOCA Security Service** – Enforces security policies, manages certificates, and monitors for suspicious activity on the DPU.

**How engineers use them:** Services are typically configured through a **YAML configuration file** that you provide when the DPU boots. For example, to enable monitoring, you would set **monitoring_enabled: true** in the service configuration. The service then runs automatically without further intervention.

---

## 🕵️ How DOCA Components Work Together

Here's a simple workflow showing how applications, libraries, and services interact:

1. **Boot** – The DOCA Orchestration Service starts and loads your configuration
2. **Initialize** – Your application (e.g., a custom packet inspector) uses **libdoca_eth** to open a network interface on the DPU
3. **Process** – The application calls **libdoca_dma** to move packet data to memory, then applies rules using **DOCA Flow** library functions
4. **Monitor** – The DOCA Monitoring Service automatically tracks how many packets are being processed and reports back to your management system
5. **Secure** – The DOCA Security Service ensures only authorized applications can access sensitive network data

---

## 📊 Comparison: Traditional CPU vs. DPU with DOCA

| Aspect | Traditional CPU Approach | DPU with DOCA Approach |
|--------|------------------------|------------------------|
| **Packet Processing** | CPU handles every packet, consuming cores | DPU handles packets at line rate, CPU stays free |
| **Security** | Software firewalls on CPU, adding latency | Hardware-accelerated security on DPU |
| **Storage** | CPU manages data compression and encryption | DPU offloads these tasks transparently |
| **Monitoring** | Agents on CPU consume resources | Dedicated telemetry on DPU with zero CPU impact |
| **Programming** | Complex kernel modules and drivers needed | Simple DOCA APIs and pre-built applications |

---

## 🚀 Getting Started as a New Engineer

1. **Start with applications** – Deploy **DOCA Flow** or **DOCA Telemetry** first to see immediate benefits without writing code
2. **Explore the libraries** – Read the DOCA API documentation for **libdoca_eth** and **libdoca_dma** to understand basic operations
3. **Write a simple program** – Create a "hello world" for DPU that sends a test packet using **libdoca_eth**
4. **Use the services** – Configure the **DOCA Monitoring Service** to export metrics to your existing dashboards
5. **Iterate** – Gradually replace CPU-based infrastructure tasks with DPU-accelerated versions

---

## ✅ Key Takeaways for Engineers

- **DOCA is your toolkit** – It provides everything you need to program DPUs without hardware expertise
- **Applications are ready-to-run** – Use them for common tasks like networking and security
- **Libraries are for custom work** – Write your own DPU programs using familiar C or Python
- **Services run automatically** – Configure them once and they manage infrastructure continuously
- **Start simple** – Deploy a pre-built application first, then move to custom programming

The DOCA SDK transforms the DPU from a mysterious hardware component into a programmable, powerful tool that makes your data center infrastructure faster, more secure, and more efficient. As you gain experience, you'll discover that DOCA lets you focus on solving problems rather than managing hardware.