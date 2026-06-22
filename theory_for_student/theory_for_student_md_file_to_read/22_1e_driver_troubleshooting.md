# 22.1e Troubleshooting: nvidia-smi: no devices found and Xid error 79 (GPU fallen off bus)

#### 🏷️ The Nvidia Software Stack — Bridging Silicon and Python > 22 Base Drivers, CUDA, and Core Libraries > 22.1 NVIDIA Data Center GPU Drivers

## 🧠 Context Introduction

When working with NVIDIA GPUs in a data center or AI training environment, two of the most alarming errors you can encounter are **nvidia-smi reporting "no devices found"** and an **Xid error 79** indicating a GPU has "fallen off the bus." These errors mean the operating system can no longer communicate with one or more GPUs. For new engineers, this can feel like a hardware failure, but often the root cause is a software or configuration issue. This guide breaks down what these errors mean, why they happen, and how to systematically troubleshoot them.

---

## ⚙️ What Does "nvidia-smi: no devices found" Mean?

The **nvidia-smi** command is the primary tool for monitoring NVIDIA GPU status. When it returns "no devices found," it means the NVIDIA driver cannot detect any GPU hardware connected to the PCIe bus.

- **Possible causes:**
  - The NVIDIA kernel driver is not loaded or has crashed.
  - The GPU is in a bad power state (e.g., after a suspend/resume cycle).
  - The PCIe connection between the GPU and motherboard is unstable.
  - The GPU firmware or hardware has encountered a fatal error.

---

## 🕵️ What is Xid Error 79 (GPU Fallen Off Bus)?

**Xid errors** are NVIDIA driver error messages logged to the system kernel ring buffer (visible via **dmesg**). **Xid 79** specifically indicates that the GPU has "fallen off the bus" — meaning the driver has lost all communication with the GPU hardware.

- **Key characteristics:**
  - The GPU is no longer visible to the operating system.
  - The error is often accompanied by a system log entry like: **"NVRM: GPU at PCI:0000:XX:00.0 has fallen off the bus."**
  - This can be a transient error (recoverable with a reset) or a permanent hardware failure.

---

## 🛠️ Common Causes and Comparison Table

| Cause | Description | Typical Scenario |
|-------|-------------|------------------|
| **Driver crash or unload** | The NVIDIA kernel module (nvidia.ko) has crashed or been unloaded. | After a system update or driver reinstallation. |
| **Power management issue** | The GPU entered a low-power state and failed to wake up. | After system suspend/resume or GPU idle timeout. |
| **PCIe link instability** | Physical or electrical issues on the PCIe bus. | Loose GPU seating, riser cable problems, or motherboard slot issues. |
| **GPU overheating** | Thermal shutdown caused the GPU to disconnect. | High ambient temperature or failed cooling fan. |
| **Hardware failure** | Permanent GPU or motherboard component failure. | After a power surge or age-related degradation. |

---

## 📊 Step-by-Step Troubleshooting Process

### 1️⃣ Verify the Driver Status

- First, check if the NVIDIA kernel module is loaded. Use the **lsmod** command and look for **nvidia** and **nvidia_uvm** modules.
- If they are not listed, the driver is not loaded. You may need to reload it or reinstall the driver.

### 2️⃣ Check System Logs for Xid Errors

- Use the **dmesg** command to view kernel messages. Look for lines containing **"NVRM: Xid"** or **"fallen off the bus"**.
- The log will show the PCIe address of the affected GPU (e.g., **0000:04:00.0**). This helps identify which physical GPU slot is failing.

### 3️⃣ Perform a GPU Reset (Software Method)

- If the error is transient, you can attempt to reset the GPU without rebooting the entire server.
- First, try to unload and reload the NVIDIA driver:
  - Unload the driver modules using **rmmod** for **nvidia_uvm**, **nvidia_drm**, **nvidia_modeset**, and **nvidia** (in that order).
  - Then reload the driver using **modprobe nvidia**.
- After reloading, run **nvidia-smi** again to see if the GPU is detected.

### 4️⃣ Check Physical Connections

- If the software reset fails, power down the system completely.
- Reseat the GPU in its PCIe slot. Ensure it is firmly seated and the power cables (if any) are connected properly.
- For rack-mounted servers, check that the GPU riser cables are not loose or damaged.

### 5️⃣ Test with a Different PCIe Slot

- If possible, move the GPU to a different PCIe slot on the motherboard. This helps isolate whether the issue is with the GPU itself or the motherboard slot.

### 6️⃣ Monitor GPU Temperature and Power

- Use **nvidia-smi** to check the temperature and power draw of any remaining working GPUs. If the failed GPU was overheating, it may have shut down to protect itself.
- Ensure the server's cooling system (fans, airflow) is functioning correctly.

---

## 🔄 Recovery Actions After Identifying the Cause

- **If the driver crashed:** Reload the driver as described in step 3. If the crash recurs, consider updating or downgrading the NVIDIA driver version.
- **If the GPU fell off the bus due to power management:** Disable GPU power management features in the system BIOS or use the **nvidia-persistenced** service to keep the GPU awake.
- **If the PCIe link is unstable:** Replace the riser cable or move the GPU to a different slot. In some cases, reducing the PCIe link speed in the BIOS (e.g., from Gen4 to Gen3) can stabilize the connection.
- **If hardware failure is suspected:** The GPU may need to be replaced. Contact your hardware vendor for warranty support.

---

## 🧪 Example Troubleshooting Workflow

**Scenario:** After a system reboot, **nvidia-smi** shows **"No devices were found"** and **dmesg** contains **"NVRM: Xid: 79, GPU has fallen off the bus."**

**Step 1:** Check if the NVIDIA driver is loaded.

For reference:
```
lsmod | grep nvidia
```
📤 Output: **No output** (meaning the driver is not loaded).

**Step 2:** Reload the driver.

For reference:
```
modprobe nvidia
```
📤 Output: **No output** (successful load).

**Step 3:** Run **nvidia-smi** again.

📤 Output: **GPU detected and showing correct information.**

**Step 4:** Check **dmesg** for any new errors.

📤 Output: **No new Xid errors.**

**Result:** The issue was a driver that failed to load after reboot. Reloading it resolved the problem.

---

## ✅ Summary

- **"nvidia-smi: no devices found"** and **Xid error 79** are serious but often recoverable errors.
- Always start by checking the driver status and system logs.
- A software reset (reloading the driver) resolves many transient issues.
- If the problem persists, investigate physical connections, power management, and hardware health.
- Document the PCIe address of the failing GPU to track recurring issues.

By following this systematic approach, new engineers can confidently diagnose and resolve these common GPU communication errors in AI infrastructure environments.