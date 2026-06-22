# 37.1c Part VI–VII: Storage and Software Stack — 70 questions with rationales

#### 🏷️ The Exam Preparation & Certification Mastery > 37 Comprehensive Practice Assessments > 37.1 Domain Practice Quiz Bank (350+ Questions)

## 📘 Context Introduction

Welcome, new engineers! This section covers two critical pillars of AI infrastructure: **Storage** and the **Software Stack**. In the world of AI and machine learning, data is the fuel, and the software stack is the engine. Understanding how storage systems handle massive datasets and how the software layers (from drivers to orchestration tools) work together is essential for building and operating reliable AI pipelines. This practice bank of 70 questions will help you solidify these foundational concepts.

---

## ⚙️ Part VI: Storage — 35 Questions

### 🗂️ Key Storage Concepts for AI Workloads

- **Data Lakes vs. Data Warehouses**: Data lakes store raw, unstructured data (e.g., images, logs), while warehouses store structured, processed data for queries.
- **Object Storage**: Ideal for large, immutable files (e.g., model checkpoints, training datasets). Examples: Amazon S3, MinIO.
- **Block Storage**: Used for high-performance, low-latency access (e.g., databases, OS volumes). Examples: NVMe drives, EBS.
- **File Storage**: Shared access for multiple nodes (e.g., NFS, Lustre). Critical for distributed training.
- **NVMe over Fabrics (NVMe-oF)**: Extends fast NVMe storage across a network, reducing latency for GPU clusters.

### 📊 Storage Performance Metrics

| Metric | Description | Why It Matters |
|--------|-------------|----------------|
| **IOPS** | Input/Output Operations Per Second | Measures random read/write speed |
| **Throughput** | Data transfer rate (MB/s or GB/s) | Measures sequential read/write speed |
| **Latency** | Time per operation (microseconds) | Critical for real-time inference |
| **Capacity** | Total storage available (TB/PB) | Must fit datasets and checkpoints |

### 🛠️ Storage in AI Pipelines

- **Training Data**: Often stored in object storage or parallel file systems (e.g., Lustre) for high throughput.
- **Model Checkpoints**: Saved periodically to block or file storage for fault tolerance.
- **Inference Serving**: Requires low-latency access to model artifacts, often cached on local SSDs.

### 🕵️ Sample Questions (with Rationales)

**Question 1**: Which storage type is most suitable for storing raw, unstructured training data in a data lake?
- A) Block storage
- B) Object storage
- C) File storage
- D) Tape storage

**Rationale**: B) Object storage is designed for large amounts of unstructured data and scales horizontally. It is cost-effective and supports versioning, making it ideal for data lakes.

**Question 2**: What is the primary advantage of using NVMe over Fabrics (NVMe-oF) in an AI cluster?
- A) Lower cost per gigabyte
- B) Higher IOPS and lower latency compared to traditional network storage
- C) Easier to manage with Kubernetes
- D) Supports only block storage protocols

**Rationale**: B) NVMe-oF extends the low-latency, high-IOPS benefits of NVMe drives across a network, which is critical for GPU-bound training jobs that need fast data access.

**Question 3**: During distributed training, why is a parallel file system like Lustre often preferred over NFS?
- A) Lustre is cheaper to deploy
- B) Lustre provides higher aggregate throughput for concurrent reads/writes from many nodes
- C) NFS does not support POSIX compliance
- D) Lustre is easier to configure

**Rationale**: B) Lustre is designed for high-performance computing and can stripe data across multiple servers, providing much higher throughput for many clients accessing data simultaneously, which is common in distributed training.

---

## 🖥️ Part VII: Software Stack — 35 Questions

### 🧩 Layers of the AI Software Stack

- **Hardware Drivers**: NVIDIA GPU drivers (e.g., R470, R525), CUDA toolkit, and cuDNN libraries.
- **Container Runtime**: Docker or containerd for packaging AI applications.
- **Orchestration**: Kubernetes (K8s) for managing containerized workloads at scale.
- **AI Frameworks**: PyTorch, TensorFlow, JAX, and their dependencies.
- **Model Serving**: Triton Inference Server, TensorFlow Serving, TorchServe.
- **Monitoring & Logging**: Prometheus, Grafana, ELK stack for observability.

### 🛠️ Key Software Components

- **CUDA Toolkit**: Provides libraries and tools for GPU-accelerated computing.
- **NVIDIA Container Toolkit (nvidia-docker2)**: Enables Docker containers to access GPUs.
- **Kubernetes Device Plugin**: Manages GPU allocation in K8s clusters.
- **MLOps Tools**: MLflow, Kubeflow, and DVC for pipeline orchestration and versioning.

### 📊 Comparison: Common AI Software Stacks

| Component | On-Premises | Cloud (AWS/GCP/Azure) |
|-----------|-------------|-----------------------|
| **GPU Drivers** | Manual install | Pre-installed on GPU instances |
| **Container Runtime** | Docker + nvidia-docker2 | EKS/GKE with GPU support |
| **Orchestration** | Self-managed K8s | Managed K8s (EKS, GKE, AKS) |
| **Model Serving** | Triton Inference Server | SageMaker, Vertex AI |
| **Monitoring** | Prometheus + Grafana | CloudWatch, Stackdriver |

### 🕵️ Sample Questions (with Rationales)

**Question 4**: What is the purpose of the NVIDIA Container Toolkit (nvidia-docker2)?
- A) To run Docker containers without a GPU
- B) To allow Docker containers to access NVIDIA GPUs
- C) To replace Kubernetes for orchestration
- D) To compile PyTorch models

**Rationale**: B) The NVIDIA Container Toolkit (nvidia-docker2) mounts the GPU driver and CUDA libraries into containers, enabling GPU acceleration inside Docker.

**Question 5**: In a Kubernetes cluster, which component is responsible for scheduling GPU-enabled pods?
- A) kubelet
- B) kube-scheduler with device plugin
- C) etcd
- D) kube-proxy

**Rationale**: B) The kube-scheduler uses the NVIDIA device plugin to discover GPU resources and schedule pods that request GPUs onto appropriate nodes.

**Question 6**: Which of the following is NOT a typical layer in the AI software stack?
- A) Container runtime
- B) Database management system (DBMS)
- C) AI framework (e.g., PyTorch)
- D) Model serving infrastructure

**Rationale**: B) While a DBMS may be used in some pipelines, it is not a core layer of the AI software stack. The stack focuses on drivers, containers, orchestration, frameworks, and serving.

**Question 7**: Why is it important to match the CUDA toolkit version with the GPU driver version?
- A) To ensure the GPU fan speed is optimized
- B) To guarantee compatibility and avoid runtime errors
- C) To reduce power consumption
- D) To enable multi-GPU communication only

**Rationale**: B) CUDA toolkit and GPU drivers must be compatible; mismatched versions can cause library loading failures, kernel crashes, or undefined behavior.

---

## 📝 Final Tips for New Engineers

- **Storage**: Always consider the data access pattern (random vs. sequential) and scale (single node vs. cluster) when choosing storage.
- **Software Stack**: Start with official NVIDIA documentation for driver and CUDA installation. Use containers to avoid dependency hell.
- **Practice**: Deploy a simple PyTorch model on a single GPU with Docker, then scale to multiple GPUs with Kubernetes to understand the stack end-to-end.

---

*Good luck with your certification journey! These 70 questions will test your understanding of how storage and software work together to power AI workloads.*