# 27.2a What the Network Operator automates: OFED drivers, RDMA device plugin, SR-IOV

#### 🏷️ The Cluster Orchestration — Managing the GPU Fleet at Scale > 27 Kubernetes for AI — NVIDIA GPU and Network Operators > 27.2 The NVIDIA Network Operator — Automating RDMA and InfiniBand in K8s

---

## 🧭 Context Introduction

When you run AI workloads on Kubernetes, the GPUs are only half the story. The other half is **networking** — specifically, how fast and efficiently your GPUs can talk to each other and to storage. This is where **RDMA** (Remote Direct Memory Access) and **InfiniBand** come in. They allow data to move directly between GPUs without involving the CPU, which is critical for distributed training.

The **NVIDIA Network Operator** is a Kubernetes operator that automates the complex setup of these high-performance networking components. Instead of manually installing drivers, plugins, and configuring virtual functions on every node, the operator handles it all for you. This topic covers the three main things the Network Operator automates: **OFED drivers**, the **RDMA device plugin**, and **SR-IOV**.

---

## ⚙️ What is the NVIDIA Network Operator?

The NVIDIA Network Operator is a Kubernetes-native tool that deploys and manages networking software for RDMA and InfiniBand across your cluster. It ensures every node has the correct drivers, device plugins, and network configurations so your AI workloads can communicate at full speed.

**Key benefit:** It turns a multi-step, error-prone manual process into a single declarative configuration.

---

## 🛠️ 1. OFED Drivers (OpenFabrics Enterprise Distribution)

OFED is a software stack that enables RDMA over InfiniBand and Ethernet (RoCE). It includes kernel drivers, libraries, and tools.

### What the Network Operator automates:
- **Driver installation:** Automatically installs the correct OFED driver version on every node that has compatible hardware (Mellanox ConnectX NICs or BlueField DPUs).
- **Driver updates:** When you update the operator configuration, it rolls out new driver versions across the cluster without manual intervention.
- **Driver validation:** Checks that the driver is loaded and functional after installation.

### Why it matters for engineers:
Without the operator, you would need to SSH into every node, install the driver, reboot, and verify. The operator does this as a Kubernetes DaemonSet — it runs a pod on each node that handles the installation.

---

## 🕵️ 2. RDMA Device Plugin

The RDMA device plugin is a Kubernetes device plugin that exposes RDMA-capable devices (like InfiniBand HCAs or ConnectX NICs) to your pods. It allows pods to request RDMA resources just like they request GPUs or CPU.

### What the Network Operator automates:
- **Plugin deployment:** Deploys the RDMA device plugin as a DaemonSet across all nodes.
- **Resource registration:** Registers RDMA devices with the kubelet so they appear as allocatable resources (e.g., `nvidia.com/rdma`).
- **Device sharing:** Configures how multiple pods can share a single physical NIC (via SR-IOV or other methods).

### Example of how it looks in a pod spec:
For reference:
```
apiVersion: v1
kind: Pod
metadata:
  name: rdma-pod
spec:
  containers:
  - name: app
    image: nvcr.io/nvidia/tensorflow:latest
    resources:
      requests:
        nvidia.com/rdma: 1
      limits:
        nvidia.com/rdma: 1
```

📤 **Output:** The pod is scheduled on a node with an available RDMA device, and the device is mounted inside the container.

---

## 🔌 3. SR-IOV (Single Root I/O Virtualization)

SR-IOV allows a single physical network interface (like a ConnectX-6 NIC) to appear as multiple virtual functions (VFs). Each VF can be assigned directly to a pod, giving it near-native performance.

### What the Network Operator automates:
- **VF creation:** Automatically creates the correct number of virtual functions on each NIC based on your configuration.
- **VF assignment:** Works with the RDMA device plugin to assign VFs to pods that request them.
- **Network configuration:** Sets up MAC addresses, IP addresses, and VLANs for each VF.
- **Policy enforcement:** Ensures that VFs are properly isolated between pods.

### Comparison: Without vs. With the Network Operator

| Aspect | Without Operator (Manual) | With Operator (Automated) |
|--------|--------------------------|---------------------------|
| OFED driver installation | SSH into each node, run commands, reboot | Operator deploys as DaemonSet, auto-installs |
| RDMA device registration | Manually edit kubelet config, restart | Operator registers devices automatically |
| SR-IOV VF creation | Use `mlxconfig` and `ip link` on each node | Operator creates VFs from a ConfigMap |
| Scaling to 100+ nodes | Days of manual work | Minutes with a single YAML apply |
| Error handling | Manual debugging per node | Operator logs and retries automatically |

---

## 🔄 How They Work Together

The three components form a stack:

1. **OFED drivers** provide the foundation — the kernel-level RDMA support.
2. **The RDMA device plugin** builds on that to expose RDMA resources to Kubernetes.
3. **SR-IOV** extends this by allowing multiple pods to share a single NIC efficiently.

The Network Operator orchestrates all three. When you apply a configuration, it:
- Installs OFED drivers on nodes that need them.
- Deploys the RDMA device plugin to register devices.
- Configures SR-IOV virtual functions according to your spec.

---

## 🧪 Practical Insight for New Engineers

When you first join a team working with AI infrastructure, you will likely encounter a cluster that already has the Network Operator installed. Your job will be to:

- **Check the operator status:** Look for the Network Operator pods in the `nvidia-network-operator` namespace.
- **Verify driver versions:** The operator logs will show which OFED version is installed on each node.
- **Troubleshoot pod networking:** If a pod cannot use RDMA, check that the RDMA device plugin is running and that SR-IOV VFs are available.

**Common pitfall:** Forgetting to label nodes. The operator only works on nodes with the label `nvidia.com/network-operator=true`. If a node is missing this label, it will not get drivers or plugins.

---

## ✅ Summary

The NVIDIA Network Operator automates three critical networking components for AI workloads:

- **OFED drivers** — the low-level RDMA software stack.
- **RDMA device plugin** — exposes RDMA devices to Kubernetes.
- **SR-IOV** — virtualizes NICs for pod-level assignment.

Together, they enable high-performance, GPU-to-GPU communication without manual node-by-node configuration. For engineers new to AI infrastructure, understanding this automation is the first step to managing large-scale GPU clusters effectively.