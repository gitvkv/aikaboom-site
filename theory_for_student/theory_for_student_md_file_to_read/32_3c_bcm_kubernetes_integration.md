# 32.3c Kubernetes integration: BCM as the provisioning layer beneath a K8s cluster

#### 🏷️ The Virtualization and Cloud — Extending AI Infrastructure Beyond Bare Metal > 32 Enterprise Cluster Management — NVIDIA Base Command Manager > 32.3 Workload Management with BCM

---

## 🧭 Context Introduction

When you work with Kubernetes (K8s) in an AI environment, you typically think about containers, pods, and orchestration. But before Kubernetes can even start scheduling workloads, it needs compute resources — servers, GPUs, networking, and storage. This is where **NVIDIA Base Command Manager (BCM)** comes in.

BCM acts as the **provisioning layer** underneath your Kubernetes cluster. Think of it as the "foundation" that sets up and manages the physical or virtual machines that Kubernetes will later manage as worker nodes. BCM handles the hardware lifecycle — powering nodes on/off, installing operating systems, configuring GPUs, and ensuring the cluster is healthy — so Kubernetes can focus purely on container orchestration.

For a new engineer, the key insight is: **BCM provisions the infrastructure; Kubernetes runs the workloads on top of it.**

---

## ⚙️ How BCM Integrates with Kubernetes

BCM does not replace Kubernetes. Instead, it works **beneath** it. Here is how the integration typically works:

- **Node Provisioning**: BCM discovers and provisions bare-metal servers or virtual machines. It installs the OS, NVIDIA drivers, container runtime (like Docker or containerd), and Kubernetes components (kubelet, kube-proxy).
- **Node Lifecycle Management**: BCM monitors hardware health. If a node fails, BCM can automatically reprovision a replacement or power-cycle the faulty node.
- **GPU Configuration**: BCM ensures NVIDIA GPUs are properly configured and visible to Kubernetes via the NVIDIA device plugin.
- **Network Setup**: BCM configures high-speed networking (e.g., InfiniBand or NVIDIA ConnectX) so Kubernetes pods can communicate efficiently.
- **Scaling**: When Kubernetes needs more nodes (e.g., during a burst of AI training jobs), BCM can dynamically provision additional servers and add them to the cluster.

---

## 🛠️ BCM as the "Provisioning Layer" — What Does That Mean?

Imagine building a house. Kubernetes is the interior design and room management. BCM is the **foundation, walls, and roof** — the structural layer that makes everything else possible.

| **Layer** | **Role** | **Managed By** |
|-----------|----------|----------------|
| Application | AI training, inference, data processing | Kubernetes |
| Orchestration | Scheduling containers, managing pods | Kubernetes |
| Node Management | OS, drivers, GPU config, health monitoring | BCM |
| Hardware | Servers, GPUs, networking, storage | BCM (via IPMI, Redfish, etc.) |

---

## 🕵️ Key Integration Points

Here are the specific ways BCM and Kubernetes interact:

- **Node Registration**: BCM registers each provisioned node with the Kubernetes API server. The node appears as a **worker node** ready to accept pods.
- **Labeling and Taints**: BCM can automatically apply labels (e.g., `gpu-type=A100`) and taints to nodes so Kubernetes schedules workloads appropriately.
- **Health Checks**: BCM continuously monitors node health. If a node becomes unhealthy, BCM can **drain** it from Kubernetes (move pods away) and then reprovision it.
- **GPU Partitioning**: For multi-instance GPU (MIG) or GPU sharing, BCM configures the GPU partitions, and Kubernetes sees each partition as a separate resource.
- **Image Management**: BCM manages the OS and driver images used to provision nodes. This ensures every node in the Kubernetes cluster has identical software stacks.

---

## 🔄 Typical Workflow: BCM + Kubernetes in Action

1. **BCM discovers** a pool of bare-metal servers in your data center.
2. **BCM provisions** a subset of servers as Kubernetes worker nodes — installing Ubuntu, NVIDIA drivers, Docker, kubelet, and the NVIDIA device plugin.
3. **BCM registers** each node with the Kubernetes control plane (which may be running on separate BCM-provisioned nodes).
4. **Kubernetes schedules** AI training jobs (e.g., using Kubeflow or NVIDIA AI Enterprise) onto the GPU-equipped nodes.
5. **BCM monitors** node health. If a GPU fails, BCM automatically removes the node from Kubernetes, reprovisions it, and adds it back.
6. **When demand drops**, BCM can power off unused nodes to save energy, and Kubernetes automatically reschedules workloads to remaining nodes.

---

## ✅ Benefits for Engineers

- **Simplified Operations**: You do not need to manually install OS, drivers, or Kubernetes on each server. BCM automates it all.
- **Consistent Environments**: Every node in the cluster has identical software — no more "it works on my machine" issues.
- **Faster Scaling**: Adding 100 GPU nodes to your Kubernetes cluster is a single BCM command, not a weekend of manual work.
- **Hardware Awareness**: BCM knows the physical topology (which GPU is in which PCIe slot, which switch connects which node). Kubernetes can use this for optimal workload placement.

---

## 🧩 Summary

| **Question** | **Answer** |
|--------------|------------|
| What does BCM do for Kubernetes? | Provisions, configures, and manages the physical/virtual nodes that Kubernetes runs on. |
| Does BCM replace Kubernetes? | No. BCM handles infrastructure; Kubernetes handles containers. |
| What happens if a node fails? | BCM detects it, drains it from Kubernetes, reprovisions it, and adds it back. |
| Can BCM add nodes dynamically? | Yes. BCM can provision new nodes on demand and register them with Kubernetes. |

---

## 🚀 Final Takeaway for New Engineers

Think of BCM as the **"behind-the-scenes" manager** that keeps your Kubernetes cluster's hardware healthy and ready. When you see a Kubernetes node in your cluster, remember that BCM likely provisioned it, configured its GPUs, and is constantly monitoring it. Without BCM, you would be manually racking servers, installing OS, and troubleshooting driver issues — which is exactly what BCM automates for you.

As you learn more, you will see that BCM and Kubernetes together form a powerful stack for AI workloads: BCM provides the **reliable, scalable infrastructure**, and Kubernetes provides the **flexible, efficient orchestration**.