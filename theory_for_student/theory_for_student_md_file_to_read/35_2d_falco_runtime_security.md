# 35.2d Runtime security: Falco for detecting anomalous GPU process behavior

#### 🏷️ The AI Infrastructure Security & Compliance > 35 Securing the AI Infrastructure Stack > 35.2 Securing The Nvidia Software Stack

---

## 🔍 Context Introduction

When running AI workloads on NVIDIA GPUs, you need to ensure that only authorized processes interact with your GPU hardware. Malicious or misconfigured processes can steal sensitive data, consume GPU resources unfairly, or even damage hardware. **Falco** is an open-source runtime security tool that monitors system calls in real-time. By extending Falco with GPU-aware rules, engineers can detect anomalous GPU process behavior—such as unexpected processes accessing NVIDIA devices or unusual memory allocation patterns.

---

## ⚙️ What is Falco and Why GPU Monitoring Matters

- **Falco** is a cloud-native runtime security project originally created by Sysdig. It uses kernel-level instrumentation to observe system calls (syscalls) and trigger alerts based on custom rules.
- **GPU-aware Falco** adds the ability to monitor interactions with NVIDIA GPU devices (e.g., `/dev/nvidia*`, `/proc/driver/nvidia*`).
- **Why it matters for AI Infrastructure**: AI workloads often run in shared environments (multi-tenant Kubernetes clusters, shared GPU servers). A rogue container or user process could:
  - Launch unauthorized GPU computations (cryptomining).
  - Exfiltrate model weights or training data via GPU memory.
  - Cause GPU driver crashes by sending malformed commands.

---

## 🕵️ How Falco Detects Anomalous GPU Behavior

Falco works by:
1. **Observing syscalls** made by processes (e.g., `open`, `ioctl`, `mmap`).
2. **Matching syscalls against rules** defined in YAML files.
3. **Triggering alerts** (to stdout, syslog, or external systems like Slack or PagerDuty) when a rule condition is met.

For GPU monitoring, Falco rules look for:
- Processes opening NVIDIA device files (`/dev/nvidia0`, `/dev/nvidiactl`) without proper authorization.
- Unusual `ioctl` calls to GPU devices (e.g., memory allocation requests from non-AI workloads).
- Processes running with unexpected container labels or namespaces accessing GPU resources.

---

## 🛠️ Key Falco Rules for GPU Anomaly Detection

Below are simplified examples of Falco rules tailored for GPU monitoring. These are conceptual—actual rules are written in YAML format.

**Rule 1: Detect unauthorized GPU device access**
- **Condition**: A process opens `/dev/nvidia*` but does not belong to an allowed container image or user.
- **Alert**: "Unauthorized process attempted GPU access"
- **Severity**: Critical

**Rule 2: Detect unusual GPU memory allocation**
- **Condition**: A process calls `ioctl` on `/dev/nvidia*` with a memory allocation command, but the process name is not a known AI framework (e.g., `python`, `tensorflow`, `pytorch`).
- **Alert**: "Suspicious GPU memory allocation from non-AI process"
- **Severity**: High

**Rule 3: Detect GPU resource exhaustion attacks**
- **Condition**: A single process opens multiple GPU devices simultaneously (e.g., more than 4) within a short time window.
- **Alert**: "Potential GPU resource exhaustion attack detected"
- **Severity**: Medium

---

## 📊 Comparison: Normal vs. Anomalous GPU Process Behavior

| Aspect | Normal GPU Process | Anomalous GPU Process |
|--------|-------------------|-----------------------|
| **Process name** | `python`, `pytorch`, `tensorflow`, `nvidia-smi` | `miner`, `crypt`, `xmr`, unknown binary |
| **Device access pattern** | Opens 1–2 GPU devices, uses standard `ioctl` calls | Opens many devices rapidly, uses unusual `ioctl` commands |
| **Container labels** | `app=training`, `job=model-x` | No labels, or labels like `app=unknown` |
| **Memory allocation** | Gradual, within expected limits | Sudden large allocations, or repeated small allocations |
| **User namespace** | Runs under non-root or dedicated service account | Runs as root or with `privileged: true` |

---

## 🚀 Practical Workflow for Engineers

1. **Install Falco** on your GPU server or Kubernetes node (using Helm or package manager).
2. **Enable GPU-specific plugins** or custom rules (Falco supports plugins for extended syscall monitoring).
3. **Define custom rules** for your environment:
   - Whitelist known AI container images (e.g., `nvcr.io/nvidia/*`).
   - Blacklist known cryptomining process names.
   - Set thresholds for GPU device open counts per process.
4. **Test your rules** by simulating an attack (e.g., running a dummy process that opens `/dev/nvidia0`).
5. **Integrate alerts** with your monitoring stack (Prometheus, Slack, email).

---

## ✅ Key Takeaways for New Engineers

- **Falco is not a replacement for antivirus**—it monitors behavior, not file signatures.
- **GPU monitoring requires custom rules** because standard Falco rules do not understand NVIDIA device semantics.
- **Start simple**: Begin with rules that detect unexpected processes opening GPU devices, then add more complex rules over time.
- **False positives are normal**: Tune your rules by adjusting process whitelists and time windows.
- **Combine with other tools**: Use Falco alongside NVIDIA MIG (Multi-Instance GPU) and Kubernetes Pod Security Policies for defense in depth.

---

## 📚 Further Learning

- Read the official Falco documentation on custom rule writing.
- Explore the NVIDIA GPU Operator for Kubernetes, which includes Falco integration.
- Practice by setting up a test environment with a single GPU and simulating benign vs. malicious process behavior.

---

*Remember: Runtime security is a continuous process. Regularly review Falco alerts and update your rules as your AI infrastructure evolves.*