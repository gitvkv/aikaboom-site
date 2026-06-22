# 34.1d Oracle Cloud Infrastructure (OCI): BM.GPU.H100.8 bare metal instances

#### 🏷️ The Virtualization and Cloud — Extending AI Infrastructure Beyond Bare Metal > 34 Cloud AI Infrastructure — AWS, Azure, GCP, and Oracle > 34.1 GPU Instance Types Across Clouds

---

## 🌐 Context Introduction

Oracle Cloud Infrastructure (OCI) offers high-performance bare metal instances designed for the most demanding AI and machine learning workloads. The **BM.GPU.H100.8** instance is a flagship offering that provides direct access to NVIDIA H100 Tensor Core GPUs without any virtualization overhead. For new engineers, think of this as having a dedicated supercomputer in the cloud — no hypervisor, no shared resources, just raw GPU power for training large language models, running scientific simulations, or processing massive datasets.

---

## ⚙️ What Is a Bare Metal Instance?

Bare metal means you get the entire physical server to yourself. Unlike virtual machines (VMs) where multiple customers share the same hardware, a bare metal instance gives you:

- **Direct hardware access** — No hypervisor layer between your OS and the GPUs
- **Full performance** — Every GPU core, every memory channel is yours
- **Customizable software stack** — You control the kernel, drivers, and libraries
- **Consistent latency** — No "noisy neighbor" effects from other tenants

The BM.GPU.H100.8 is a **single-tenant** instance, meaning only your workload runs on that server.

---

## 📊 BM.GPU.H100.8 Instance Specifications

| Component | Specification |
|-----------|---------------|
| **GPUs** | 8 x NVIDIA H100 (80 GB HBM3 each) |
| **GPU Memory Total** | 640 GB HBM3 |
| **CPU** | 2 x AMD EPYC (96 cores total) |
| **System Memory** | 2 TB DDR5 |
| **Networking** | 800 Gbps (8 x 100 Gbps RDMA) |
| **Local Storage** | 8 x 6.4 TB NVMe SSD (51.2 TB total) |
| **GPU Interconnect** | NVLink & NVSwitch (900 GB/s per GPU) |

---

## 🛠️ Key Use Cases for New Engineers

- **Large Language Model (LLM) Training** — Train models with hundreds of billions of parameters
- **Multi-GPU Distributed Training** — Use all 8 GPUs together via NVLink for near-linear scaling
- **Scientific Computing** — Molecular dynamics, climate modeling, and quantum chemistry simulations
- **High-Frequency Inference** — Serve AI models with ultra-low latency requirements
- **Custom Kernel Development** — Write and test CUDA kernels with full hardware access

---

## 🕵️ How It Differs from Virtualized Instances

| Feature | BM.GPU.H100.8 (Bare Metal) | Virtualized GPU Instance |
|---------|----------------------------|--------------------------|
| **Performance** | 100% GPU throughput | ~95-98% (small overhead) |
| **Customization** | Full OS and driver control | Limited to provided images |
| **Isolation** | Physical isolation | Logical isolation |
| **Boot Time** | Minutes (provisioning) | Seconds (from image) |
| **Cost** | Higher (reserved/pay-as-you-go) | Lower (per-second billing) |
| **Best For** | Production training, research | Development, testing, inference |

---

## 🔧 Provisioning a BM.GPU.H100.8 Instance

To get started, engineers typically follow these steps in the OCI Console or via the OCI CLI:

1. **Create a Compartment** — Organize your resources
2. **Set Up Networking** — Create a Virtual Cloud Network (VCN) with a public subnet
3. **Choose an Image** — Select an Oracle Linux or Ubuntu image with GPU drivers pre-installed
4. **Select Shape** — Choose **BM.GPU.H100.8** as the instance shape
5. **Configure Storage** — Attach block volumes or use local NVMe
6. **Add SSH Keys** — For secure access after provisioning
7. **Launch the Instance** — Wait for provisioning (typically 5-10 minutes)

After launch, you can SSH into the instance and verify GPU availability using the NVIDIA tools.

---

## 📈 Performance Considerations for New Engineers

- **NVLink is critical** — Always use NVLink for multi-GPU communication. Without it, GPUs talk over PCIe which is much slower.
- **RDMA networking** — For multi-node training, use the 800 Gbps RDMA fabric. Standard TCP/IP will bottleneck your workload.
- **Local NVMe storage** — Use the local SSDs for temporary data (checkpoints, datasets). They are fast but ephemeral — data is lost if the instance is terminated.
- **GPU memory management** — Each H100 has 80 GB. With 8 GPUs, you have 640 GB total. Plan your model parallelism accordingly (e.g., tensor parallelism, pipeline parallelism).

---

## 💡 Common Workflow Example

A typical workflow for training a large model on BM.GPU.H100.8:

1. **Provision the instance** with Oracle Linux 8
2. **Install dependencies** — NVIDIA drivers, CUDA toolkit, cuDNN, NCCL, and PyTorch/TensorFlow
3. **Upload your dataset** to the local NVMe drives for fast I/O
4. **Configure distributed training** — Use NCCL with NVLink backend
5. **Run your training script** — Monitor GPU utilization with **nvidia-smi**
6. **Save checkpoints** to object storage (OCI Object Storage) for durability
7. **Terminate the instance** when done to avoid ongoing costs

---

## 🧠 Tips for New Engineers

- **Start small** — Test your code on a single GPU instance first (e.g., VM.GPU.A10) before scaling to 8 GPUs
- **Use OCI's GPU images** — They come with pre-installed drivers and libraries, saving hours of setup time
- **Monitor costs** — BM.GPU.H100.8 instances are expensive. Use OCI Budgets and Alarms to track spending
- **Leverage OCI CLI** — Automate provisioning with scripts to avoid manual errors
- **Check region availability** — Not all OCI regions have H100 capacity. Use the OCI Console to verify

---

## 🔗 Related Resources for Further Learning

- OCI Documentation: Bare Metal GPU Instances
- NVIDIA H100 Tensor Core GPU Architecture Whitepaper
- NCCL Documentation for Multi-GPU Communication
- OCI CLI Reference for Instance Management

---

*This guide is part of the NVIDIA-Certified Associate: AI Infrastructure and Operations curriculum. For new engineers, the BM.GPU.H100.8 represents the pinnacle of cloud GPU performance — master this instance, and you'll understand the foundation of modern AI infrastructure.*