# 27.2b NicClusterPolicy CRD: configuring RDMA devices across all nodes

#### 🏷️ The Cluster Orchestration — Managing the GPU Fleet at Scale > 27 Kubernetes for AI — NVIDIA GPU and Network Operators > 27.2 The NVIDIA Network Operator — Automating RDMA and InfiniBand in K8s

---

## 🌐 Context Introduction

When you are managing a Kubernetes cluster with multiple GPU nodes, each node may have RDMA (Remote Direct Memory Access) capable network devices. These devices allow data to move directly between the memory of different servers without involving the CPU, which is critical for high-performance AI workloads like distributed training.

The **NicClusterPolicy** Custom Resource Definition (CRD) is the tool you use to tell the NVIDIA Network Operator how to configure these RDMA devices **across all nodes** in your cluster. Instead of logging into each node and manually configuring network settings, you define a single policy, and the Operator applies it everywhere.

---

## ⚙️ What is the NicClusterPolicy CRD?

The NicClusterPolicy is a Kubernetes custom resource that defines the desired state of network configurations for your entire cluster. It acts as a single source of truth for:

- **Which RDMA devices** should be configured
- **How those devices** should be configured (e.g., which drivers, firmware, or settings)
- **Where the configuration** should be applied (all nodes, or specific node groups)

Think of it as a blueprint: you write the blueprint once, and the Network Operator builds the network configuration on every node automatically.

---

## 🛠️ Key Components of a NicClusterPolicy

A NicClusterPolicy resource contains several important sections. Here is what each one does:

- **📌 `spec.rdmaConfig`** — Defines the RDMA device configuration. This includes:
  - The type of RDMA device (e.g., ConnectX-5, ConnectX-6)
  - The driver version to use
  - Any specific firmware settings

- **📌 `spec.nodeSelector`** — Controls which nodes receive the configuration. You can target:
  - All nodes (empty selector)
  - Nodes with specific labels (e.g., `gpu-node: "true"`)
  - Nodes in a specific availability zone

- **📌 `spec.ibConfig`** — If you are using InfiniBand instead of RoCE (RDMA over Converged Ethernet), this section defines the InfiniBand-specific settings.

- **📌 `spec.ofedDriver`** — Specifies the NVIDIA OFED (OpenFabrics Enterprise Distribution) driver version. This driver is required for RDMA to work on NVIDIA network cards.

---

## 📊 How Configuration Flows Across Nodes

The process is straightforward. Here is how the NicClusterPolicy works in practice:

1. **You create the policy** — You define the NicClusterPolicy YAML file and apply it to the cluster.
2. **The Operator detects the policy** — The NVIDIA Network Operator watches for changes to NicClusterPolicy resources.
3. **The Operator reads the spec** — It extracts the RDMA configuration, driver version, and node selector.
4. **The Operator applies the configuration** — It runs the necessary commands on each targeted node to:
   - Install or update the OFED driver
   - Configure the RDMA devices
   - Restart any required services
5. **The Operator reports status** — The NicClusterPolicy resource is updated with the current state of each node.

---

## 🕵️ Common Configuration Scenarios

Here are two typical use cases for the NicClusterPolicy:

| Scenario | What You Configure | Why It Matters |
|----------|-------------------|----------------|
| **All nodes use the same RDMA card** | Set `spec.rdmaConfig` with the device type and driver version. Leave `nodeSelector` empty. | Every node gets identical RDMA settings, ensuring consistent performance across the cluster. |
| **Different nodes have different RDMA cards** | Create multiple NicClusterPolicy resources, each with a different `nodeSelector` and `spec.rdmaConfig`. | You can mix older and newer network hardware without conflicts. |

---

## ✅ Best Practices for New Engineers

- **🔍 Start simple** — Begin with a single NicClusterPolicy that targets all nodes. This reduces complexity while you learn.
- **📋 Use labels wisely** — If your cluster has heterogeneous hardware, label your nodes clearly (e.g., `network-type: connectx6`) and use those labels in your `nodeSelector`.
- **🔄 Check the status** — After applying a NicClusterPolicy, always verify that the Operator has successfully configured the nodes. Look for status fields in the resource.
- **📝 Keep driver versions consistent** — Using different OFED driver versions on different nodes can cause communication failures. The NicClusterPolicy helps you enforce consistency.
- **🧪 Test on a single node first** — Before rolling out a configuration to all nodes, apply the policy with a `nodeSelector` that targets only one test node.

---

## 🚀 Summary

The NicClusterPolicy CRD is your central control point for RDMA device configuration in a Kubernetes cluster. It removes the need for manual, per-node network setup and ensures that every GPU node in your fleet is configured identically and correctly. By mastering this single resource, you gain the ability to scale your AI infrastructure reliably and efficiently.

Remember: **one policy, many nodes, consistent results.**