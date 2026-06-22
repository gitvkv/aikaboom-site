# 26.2e Kubelet: the node agent — ensuring Pods are running as declared

#### 🏷️ The Cluster Orchestration — Managing the GPU Fleet at Scale > 26 Kubernetes Fundamentals — Container Orchestration from Scratch > 26.2 Kubernetes Architecture — Control Plane and Worker Nodes

---

## 🔍 Context Introduction

Imagine you are responsible for a large fleet of GPU-powered servers running AI workloads. You declare that a specific AI training job should run as a Pod with 4 GPUs and 16GB of memory. But who actually makes sure that Pod starts, stays healthy, and matches your declaration on that specific machine? That is the job of **Kubelet** — the primary node agent that runs on every worker node in your Kubernetes cluster.

Kubelet is the bridge between your cluster's brain (the control plane) and the actual hardware (the node). It ensures that the containers described in Pod specifications are running and healthy. Without Kubelet, your declarations would remain just words on a server — never translated into running workloads.

---

## ⚙️ What is Kubelet?

Kubelet is a small, self-contained binary that runs on every node in a Kubernetes cluster. It acts as the node's personal supervisor, constantly checking in with the control plane and managing the containers on its node.

Key characteristics:
- **Node-level agent**: Each node has exactly one Kubelet process
- **Pod lifecycle manager**: Creates, monitors, and terminates Pods
- **Control plane communicator**: Listens to the API server for Pod assignments
- **Health reporter**: Continuously reports node and Pod status back to the control plane
- **Resource enforcer**: Ensures containers do not exceed declared resource limits

---

## 🛠️ How Kubelet Works — The Core Loop

Kubelet operates on a continuous loop that keeps your Pods in sync with your declarations. Here is the simplified flow:

### 1. 📡 Watch for Pod Assignments
Kubelet constantly watches the Kubernetes API server for Pods that are scheduled to its node. When the scheduler assigns a Pod to this node, Kubelet receives the Pod specification.

### 2. 🏗️ Create and Start Containers
Kubelet translates the Pod specification into container runtime commands. It works with a container runtime (like Docker or containerd) to:
- Pull container images
- Create container filesystems
- Set up networking
- Start the container processes

### 3. ❤️ Health Monitoring
Kubelet performs three types of health checks on running containers:
- **Liveness probes**: Is the container still alive? If not, restart it.
- **Readiness probes**: Is the container ready to serve traffic? If not, remove it from service.
- **Startup probes**: Has the container finished initializing? Delay other checks until ready.

### 4. 📊 Status Reporting
Kubelet periodically reports back to the API server with:
- Node status (Ready, NotReady, DiskPressure, MemoryPressure)
- Pod status (Running, Pending, Failed)
- Resource usage (CPU, memory, GPU utilization)
- Container restart counts

### 5. 🧹 Cleanup and Termination
When a Pod is deleted or rescheduled, Kubelet:
- Stops the containers gracefully
- Cleans up container filesystems
- Removes network interfaces
- Reports Pod termination to the API server

---

## 📊 Kubelet vs. Other Node Components

| Component | Role | What it does |
|-----------|------|--------------|
| **Kubelet** | Node agent | Manages Pods and containers on the node |
| **Container Runtime** | Container engine | Actually runs containers (Docker, containerd, CRI-O) |
| **kube-proxy** | Network proxy | Manages network rules and load balancing |
| **cAdvisor** | Resource monitor | Collects resource usage metrics (integrated into Kubelet) |

---

## 🕵️ Key Responsibilities in Detail

### ✅ Pod Reconciliation
Kubelet's most important job is **reconciliation** — ensuring the actual state matches the desired state. If a container crashes, Kubelet detects it and restarts it. If a Pod is deleted, Kubelet cleans up. This loop runs continuously, typically every few seconds.

### 🧮 Resource Management
Kubelet enforces resource limits declared in Pod specifications:
- **CPU limits**: Throttles containers that exceed their CPU allocation
- **Memory limits**: Kills containers that exceed memory limits (OOM kill)
- **GPU allocation**: Ensures only the declared number of GPUs are assigned to a Pod
- **Ephemeral storage**: Monitors local disk usage and evicts Pods if needed

### 🏥 Node Health Monitoring
Kubelet monitors the overall health of its node:
- **Disk pressure**: Low disk space triggers Pod eviction
- **Memory pressure**: Low memory triggers Pod eviction
- **PID pressure**: Too many processes triggers Pod eviction
- **Node conditions**: Reports Ready, NetworkUnavailable, etc.

### 🔐 Security and Isolation
Kubelet enforces security contexts defined in Pod specifications:
- Runs containers as specified users
- Applies seccomp and AppArmor profiles
- Manages volume mounts and permissions
- Enforces Pod Security Standards

---

## 🧩 Kubelet in the AI Infrastructure Context

For AI workloads on GPU nodes, Kubelet plays a critical role:

### GPU-Aware Scheduling
When a Pod requests GPUs, Kubelet:
1. Checks if the node has available GPUs
2. Assigns specific GPU devices to the Pod
3. Ensures no other Pod uses the same GPU
4. Reports GPU health and utilization back to the control plane

### Handling Large Models
For AI training with large models:
- Kubelet manages the lifecycle of Pods that may use hundreds of GB of memory
- It monitors for OOM kills and triggers restarts
- It reports node resource pressure to prevent scheduling new Pods on overloaded nodes

### Multi-Node Training
In distributed training scenarios:
- Kubelet ensures all Pods in a training job start simultaneously
- It reports Pod readiness so the job coordinator knows when to begin training
- It handles graceful shutdowns when training completes

---

## 🔄 Common Kubelet Scenarios

### Scenario 1: Pod Crash Loop
A container crashes immediately after starting. Kubelet:
- Detects the crash via container runtime
- Reports the crash to the API server
- Restarts the container (with exponential backoff)
- Updates Pod status to CrashLoopBackOff

### Scenario 2: Node Failure
A node loses network connectivity. Kubelet:
- Cannot report status to the API server
- After a timeout (default 40 seconds), the control plane marks the node as NotReady
- Pods on the failed node are rescheduled to healthy nodes
- When the node recovers, Kubelet reconnects and reconciles Pods

### Scenario 3: Resource Exhaustion
A Pod exceeds its memory limit. Kubelet:
- The container runtime kills the offending container (OOM kill)
- Kubelet detects the container termination
- Restarts the container if restart policy allows
- Reports the OOM event in Pod events

---

## 🎯 Key Takeaways for New Engineers

1. **Kubelet is the node's brain** — it translates cluster-level declarations into actual running containers
2. **Kubelet never creates Pods on its own** — it only runs Pods assigned by the scheduler
3. **Kubelet is self-healing** — it automatically restarts failed containers and cleans up terminated Pods
4. **Kubelet reports everything** — node health, Pod status, resource usage, and events are all reported to the control plane
5. **Kubelet works with container runtimes** — it does not run containers directly but delegates to Docker, containerd, or CRI-O
6. **GPU management is transparent** — Kubelet handles GPU allocation and isolation automatically when GPUs are requested

---

## 📚 Quick Reference

**What Kubelet does:**
- Watches for Pod assignments from the API server
- Creates, starts, and monitors containers
- Reports node and Pod status
- Enforces resource limits
- Handles container restarts and cleanup

**What Kubelet does NOT do:**
- Schedule Pods (that is the scheduler's job)
- Manage networking rules (that is kube-proxy's job)
- Store cluster state (that is etcd's job)
- Serve API requests (that is the API server's job)

**Where to find Kubelet:**
- Runs as a systemd service on each node: typically named **kubelet.service**
- Configuration file location: typically **/var/lib/kubelet/config.yaml**
- Logs location: typically **/var/log/kubelet.log** or accessible via **journalctl**

---

## 🚀 Next Steps

As you continue learning about Kubernetes architecture, you will encounter:
- **Static Pods**: Pods managed directly by Kubelet without the API server
- **Pod eviction**: How Kubelet removes Pods under resource pressure
- **Node problem detector**: A tool that enhances Kubelet's node monitoring
- **Device plugins**: How Kubelet discovers and manages specialized hardware like GPUs

Remember: Kubelet is your node's faithful servant — it never sleeps, never questions, and always ensures your declared Pods are running as intended.