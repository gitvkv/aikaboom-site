# 4.4d Pinning package versions to prevent accidental upgrades of GPU drivers

#### 🏷️ The Operating System Layer — Linux for AI Infrastructure Operators > 4 Core Linux Administration for AI Operators > 4.4 Package Management — Installing Software on Linux

---

## 🧠 Context Introduction

In AI infrastructure, GPU drivers are a critical component. An accidental upgrade of a GPU driver can break your entire AI workload — models may fail to load, CUDA versions may become incompatible, and training jobs can crash unexpectedly. To prevent this, engineers use a technique called **package pinning**, which locks a specific version of a package so that system updates or routine upgrades do not replace it.

This topic explains why pinning is essential, how it works, and how to apply it to GPU drivers in a Linux environment.

---

## ⚙️ Why Pin GPU Driver Versions?

- **Stability** — AI frameworks (like PyTorch or TensorFlow) are tightly coupled with specific CUDA and driver versions. An unexpected upgrade can break compatibility.
- **Reproducibility** — Pinned versions ensure that every system in your cluster runs the exact same driver, making debugging and scaling predictable.
- **Avoiding downtime** — A driver upgrade may require a reboot. Pinning prevents unplanned reboots during critical training runs.
- **Security control** — You can manually review and approve driver updates rather than accepting automatic changes.

---

## 🛠️ How Package Pinning Works

Package pinning uses a configuration file that tells the system's package manager (like **APT** on Ubuntu/Debian) to hold a package at its current version. The package manager will skip that package during upgrades unless you explicitly remove the pin.

### Key Concepts

- **Hold** — A directive that prevents a package from being upgraded, removed, or changed.
- **Pin priority** — A number that defines the preference for a package version. A priority of **1001** or higher forces that version to be installed.
- **Package manager** — The tool (e.g., **apt**, **apt-mark**) that reads pinning rules.

---

## 🕵️ Identifying the GPU Driver Package

Before pinning, you need to know the exact package name of your GPU driver. Typically, NVIDIA drivers are installed as:

- **nvidia-driver-XXX** (e.g., nvidia-driver-535)
- **nvidia-kernel-dkms**
- **nvidia-utils-XXX**
- **nvidia-dkms-XXX**

You can identify the installed driver package by checking the package manager's list or querying the driver version directly.

---

## 📊 Comparison: Pinning vs. Not Pinning

| Aspect | Without Pinning | With Pinning |
|--------|----------------|--------------|
| **Driver stability** | Vulnerable to accidental upgrades | Locked to a known good version |
| **AI workload reliability** | May break after system update | Consistent across updates |
| **Maintenance effort** | Low initially, high when issues arise | Moderate setup, low ongoing effort |
| **Security patching** | Automatic (may break things) | Manual review required |
| **Reboot frequency** | Unplanned reboots possible | Controlled, planned reboots only |

---

## 🧩 How to Pin a Package (Conceptual Steps)

The process involves two main methods. Below are the steps described in plain text — no commands are shown in code blocks.

### Method 1: Using apt-mark hold

1. Identify the exact package name of your GPU driver (e.g., **nvidia-driver-535**).
2. Run the **apt-mark hold** command followed by the package name.
3. The package is now marked as **held back** — it will not be upgraded, removed, or changed by any **apt upgrade** or **apt dist-upgrade**.
4. To verify, you can check the hold status of the package. The output will show **Hold** or **Set to hold** for that package.
5. To remove the hold later, use **apt-mark unhold** with the same package name.

### Method 2: Using a Preferences File (Advanced)

1. Create a new file in the **/etc/apt/preferences.d/** directory (e.g., **nvidia-pin**).
2. Inside the file, specify the package name and a pin priority of **1001**.
3. The package manager will now always prefer the currently installed version over any newer version.
4. This method is useful if you want to pin multiple packages or set complex rules.

---

## ✅ Best Practices for Engineers

- **Pin all GPU-related packages** — Not just the driver, but also **nvidia-kernel-dkms**, **nvidia-utils**, and **nvidia-dkms** to avoid partial upgrades.
- **Document your pins** — Keep a record of which packages are pinned and why. This helps when onboarding new team members.
- **Test upgrades in a staging environment** — Before unpinning and upgrading, test the new driver on a non-production system.
- **Use version control** — Store your pinning configuration files in a repository (e.g., Git) so they can be replicated across machines.
- **Monitor for security updates** — Pinning does not mean ignoring security. Regularly check for critical driver patches and apply them manually after testing.

---

## 🧪 Common Pitfalls to Avoid

- **Pinning only the driver, not the kernel module** — The **nvidia-kernel-dkms** package can still be upgraded, causing a mismatch.
- **Forgetting to pin after a fresh install** — Always pin immediately after installing the correct driver version.
- **Using a pin priority that is too low** — A priority below **1001** may allow the package to be upgraded if a newer version is available.
- **Not verifying the hold** — Always confirm that the hold is active after setting it.

---

## 🔁 Unpinning and Upgrading Safely

When you are ready to upgrade your GPU driver:

1. **Test the new driver** on a non-production system first.
2. **Remove the hold** on the old driver package.
3. **Install the new driver** manually.
4. **Re-pin** the new driver version to lock it.
5. **Reboot** if required, and verify that AI workloads run correctly.

---

## 📌 Summary

Package pinning is a simple but powerful technique to protect your AI infrastructure from accidental GPU driver upgrades. By holding the driver at a known, tested version, you ensure stability, reproducibility, and control over your environment. Every engineer working with AI infrastructure should understand how to pin packages and incorporate this practice into their standard operating procedures.

---

*End of topic 4.4d*