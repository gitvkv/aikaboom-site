# 24.2b Installation: nvidia-container-toolkit package and docker daemon configuration

#### 🏷️ The Nvidia Software Stack — Bridging Silicon and Python > 24 GPU-Accelerated Containers — The NVIDIA Container Toolkit > 24.2 NVIDIA Container Toolkit — The Right Way to Expose GPUs

## 🧭 Context Introduction

Before you can run GPU-accelerated containers, your host system needs a small but critical piece of software: the **NVIDIA Container Toolkit**. This toolkit acts as a bridge between Docker (or other container runtimes) and your NVIDIA GPU drivers. Without it, your containers simply won't see the GPU hardware.

Think of it this way: Docker knows how to manage processes and filesystems, but it doesn't natively understand how to talk to an NVIDIA GPU. The `nvidia-container-toolkit` package installs the necessary hook that tells Docker, "Hey, when a container requests a GPU, here's how to make that work."

This guide walks you through installing that package and configuring the Docker daemon to use it. By the end, you'll be able to launch containers that can leverage GPU acceleration.

---

## ⚙️ What is the nvidia-container-toolkit Package?

The **nvidia-container-toolkit** is a collection of libraries and utilities that enable GPU access inside containers. It includes:

- **nvidia-container-runtime**: A modified container runtime that injects NVIDIA drivers and libraries into the container.
- **nvidia-container-cli**: A command-line interface for configuring GPU access.
- **libnvidia-container**: The core library that handles the low-level GPU device mounting.

When you install this package, it registers itself as a runtime option for Docker. You then configure Docker to use this runtime as the default or as an optional runtime for specific containers.

---

## 🛠️ Installation Steps Overview

The installation process follows this logical flow:

1. **Set up the NVIDIA package repository** — This tells your system's package manager where to find the toolkit.
2. **Install the nvidia-container-toolkit package** — This places the runtime and libraries on your system.
3. **Configure the Docker daemon** — This tells Docker to use the NVIDIA runtime.
4. **Restart Docker** — This applies the configuration changes.
5. **Verify the installation** — This confirms everything is working.

---

## 📦 Step 1: Setting Up the Repository

Before installing, your system needs to know about NVIDIA's package repository. This is done by adding a repository configuration file and importing the GPG key.

**What happens here:**
- A repository file is created at `/etc/apt/sources.list.d/nvidia-container-toolkit.list` (for Debian/Ubuntu systems).
- The NVIDIA GPG key is downloaded and added to your system's trusted keys.
- The package list is updated so your system knows about the available packages.

For RHEL/CentOS/Fedora systems, the process is similar but uses YUM or DNF repositories instead.

---

## 📥 Step 2: Installing the Package

Once the repository is configured, you install the package using your system's package manager.

**What happens here:**
- The package manager downloads and installs the `nvidia-container-toolkit` package.
- This also installs dependencies like `libnvidia-container` and `nvidia-container-runtime`.
- The runtime binary is placed at `/usr/bin/nvidia-container-runtime`.

---

## 🔧 Step 3: Configuring the Docker Daemon

This is the most critical step. You need to tell Docker's daemon (the background service that manages containers) about the NVIDIA runtime.

**What happens here:**
- You modify the Docker daemon configuration file, typically located at `/etc/docker/daemon.json`.
- You add a `runtimes` section that defines the `nvidia` runtime.
- You specify the path to the NVIDIA container runtime binary.

**Example of what the configuration looks like conceptually:**

The `daemon.json` file should contain a JSON object with a `runtimes` key. Inside that, you define an `nvidia` runtime that points to the `nvidia-container-runtime` executable. You may also set the `default-runtime` to `nvidia` if you want all containers to automatically see GPUs.

---

## 🔄 Step 4: Restarting Docker

After modifying the configuration, you must restart the Docker daemon for the changes to take effect.

**What happens here:**
- The Docker service is stopped and started again.
- On restart, Docker reads the updated `daemon.json` file.
- The NVIDIA runtime is now registered and available.

---

## ✅ Step 5: Verifying the Installation

To confirm everything is working, you run a test container that requests a GPU.

**What happens here:**
- You run a container using the `nvidia` runtime.
- You specify environment variables or device requests that tell the runtime to expose the GPU.
- Inside the container, you run a command like `nvidia-smi` to verify the GPU is visible.

**Expected outcome:**
- The container starts successfully.
- Running `nvidia-smi` inside the container shows your GPU model, driver version, and CUDA version.
- You see no errors about missing devices or drivers.

---

## 📊 Comparison: Before vs. After Installation

| Aspect | Before Installation | After Installation |
|--------|-------------------|-------------------|
| Container GPU access | ❌ Not possible | ✅ Fully available |
| Docker runtime options | Only `runc` | `runc` + `nvidia` |
| `nvidia-smi` inside container | Error: command not found | Shows GPU details |
| Container performance | CPU-only | Full GPU acceleration |

---

## 🕵️ Common Pitfalls and Troubleshooting

**Pitfall 1: Missing NVIDIA Drivers**
- The toolkit requires the NVIDIA driver to already be installed on the host.
- Verify with `nvidia-smi` on the host before proceeding.

**Pitfall 2: Docker Not Restarted**
- If you forget to restart Docker, the new runtime won't be available.
- Always restart Docker after modifying `daemon.json`.

**Pitfall 3: Incorrect daemon.json Syntax**
- JSON is strict. A missing comma or extra bracket will cause Docker to fail to start.
- Validate your JSON with a linter before restarting Docker.

**Pitfall 4: Permission Issues**
- The Docker socket requires root or docker group membership.
- Ensure your user is in the `docker` group.

---

## 📝 Summary

Installing the NVIDIA Container Toolkit and configuring the Docker daemon is a straightforward process that unlocks GPU acceleration for your containers. The key takeaways are:

- The toolkit provides a runtime that bridges Docker and NVIDIA drivers.
- Configuration is done through Docker's `daemon.json` file.
- Always verify with a test container after installation.
- The most common issues are missing drivers, incorrect JSON syntax, and forgetting to restart Docker.

Once this is set up, you're ready to run GPU-accelerated workloads like AI model training, inference, and data processing inside containers.