# 4.4c Adding NVIDIA package repositories for drivers and CUDA

#### 🏷️ The Operating System Layer — Linux for AI Infrastructure Operators > 4 Core Linux Administration for AI Operators > 4.4 Package Management — Installing Software on Linux

---

## 🧠 Context Introduction

When setting up a machine for AI workloads, you need NVIDIA drivers and CUDA toolkit to unlock GPU acceleration. Instead of manually downloading files from a website, you can add NVIDIA's official package repositories to your Linux system. This allows you to install, update, and manage NVIDIA software using the same package manager (like `apt` or `dnf`) that you already use for other software. This section explains how to add those repositories correctly and safely.

---

## ⚙️ What Are Package Repositories?

A package repository is a central storage location from which your system retrieves and installs software. By adding NVIDIA's repository, you tell your system: *"When I ask for NVIDIA drivers or CUDA, look here first."*

Key benefits:
- **Automatic updates** — when NVIDIA releases a new driver, your system can update it like any other package.
- **Dependency resolution** — the package manager handles all required libraries automatically.
- **Version control** — you can choose stable, long-term support (LTS) or newer feature releases.

---

## 🛠️ Prerequisites Before Adding Repositories

Before you add any NVIDIA repository, ensure your system meets these requirements:

- **A supported Linux distribution** — Ubuntu, Debian, RHEL, Rocky Linux, or SLES are common.
- **Root or sudo access** — adding repositories requires administrative privileges.
- **An internet connection** — the repository is hosted on NVIDIA's servers.
- **A compatible GPU** — NVIDIA Tesla, Quadro, or GeForce RTX series for AI workloads.

---

## 📦 Two Main Repository Types

NVIDIA provides two primary repository categories:

| Repository Type | Purpose | Typical Contents |
|----------------|---------|------------------|
| **Driver Repository** | Contains GPU drivers for your specific OS and kernel version | `nvidia-driver`, `nvidia-kernel`, `nvidia-settings` |
| **CUDA Repository** | Contains the CUDA toolkit and related libraries | `cuda-toolkit`, `cuda-runtime`, `cuda-libraries` |

You may need one or both depending on your workload:
- **Inference only** → Driver repository is sufficient.
- **Training or development** → Both driver and CUDA repositories are required.

---

## 🕵️ How to Add NVIDIA Repositories (Conceptual Steps)

The process varies slightly by Linux distribution, but the logic is the same:

1. **Download the repository configuration package** from NVIDIA's official site.
2. **Install the configuration package** — this adds the repository URL and GPG key to your system.
3. **Update your package list** — so your system knows about the new software available.
4. **Verify the repository is active** — check that your system can see NVIDIA packages.

For reference:
```
# Example for Ubuntu/Debian-based systems
sudo apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/3bf863cc.pub
sudo add-apt-repository "deb https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/ /"
sudo apt update
```

📤 **Output:** A successful update will show lines like `Get:14 https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64 InRelease`.

For reference:
```
# Example for RHEL/Rocky Linux systems
sudo dnf config-manager --add-repo https://developer.download.nvidia.com/compute/cuda/repos/rhel9/x86_64/cuda-rhel9.repo
sudo dnf clean all
sudo dnf makecache
```

📤 **Output:** The `makecache` command will list available NVIDIA packages like `nvidia-driver` and `cuda-toolkit`.

---

## ✅ Verifying the Repository Is Working

After adding the repository, you can confirm it is active by searching for NVIDIA packages:

For reference:
```
apt search nvidia-driver
```

📤 **Output:** You should see packages like `nvidia-driver-535`, `nvidia-driver-545`, etc., with descriptions.

For reference:
```
dnf list available | grep nvidia
```

📤 **Output:** A list of available NVIDIA packages, including driver versions and CUDA toolkit variants.

---

## 🧪 Common Pitfalls and How to Avoid Them

| Pitfall | Why It Happens | How to Avoid |
|---------|----------------|--------------|
| **Wrong repository for your OS** | Using Ubuntu repo on Debian, or RHEL repo on Fedora | Always match the repository to your exact distribution and version |
| **Missing GPG key** | System refuses to trust unsigned packages | Always import the GPG key before adding the repository |
| **Conflicting repositories** | Having both NVIDIA and third-party driver repos | Remove or disable non-NVIDIA GPU driver repositories |
| **Outdated package cache** | System doesn't know about new packages | Run `apt update` or `dnf makecache` after adding the repo |

---

## 🔐 Security Best Practices

- **Always use the official NVIDIA repository** — never third-party mirrors.
- **Verify the GPG key fingerprint** — NVIDIA publishes their key fingerprints on their official documentation.
- **Use HTTPS** — ensure the repository URL starts with `https://` to encrypt the connection.
- **Pin the repository version** — for production systems, consider pinning to a specific CUDA version to avoid unexpected upgrades.

---

## 🧰 Summary

Adding NVIDIA package repositories is a foundational skill for anyone managing AI infrastructure. It transforms manual driver and CUDA installation into a clean, automated process managed by your system's package manager. Once the repository is added, you can install, update, and remove NVIDIA software just like any other Linux package — making your life as an engineer much simpler.

---

*Next step: After adding the repository, proceed to install the NVIDIA driver and CUDA toolkit using your package manager.*