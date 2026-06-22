# 22.3c cuDNN versioning and compatibility with PyTorch and TensorFlow

#### 🏷️ The Nvidia Software Stack — Bridging Silicon and Python > 22 Base Drivers, CUDA, and Core Libraries > 22.3 cuDNN — Deep Learning Primitives Library

---

## 🧠 Context Introduction

When you install PyTorch or TensorFlow, you're not just installing a deep learning framework — you're also installing a chain of software that connects your Python code to the GPU hardware. At the heart of this chain lies **cuDNN** (CUDA Deep Neural Network library). cuDNN provides highly optimized implementations of operations like convolutions, pooling, normalization, and activation functions.

The challenge for new engineers is that **cuDNN has its own versioning system**, and not every version of cuDNN works with every version of PyTorch or TensorFlow. Mismatches can lead to cryptic errors, performance degradation, or outright failures. This topic explains how cuDNN versioning works and how to ensure compatibility.

---

## ⚙️ How cuDNN Versioning Works

cuDNN uses a **three-part version number**: **Major.Minor.Patch** (e.g., 8.9.7).

- **Major version** — Indicates significant architectural changes. Frameworks often require a specific major version.
- **Minor version** — Adds new features or optimizations. Usually backward-compatible within the same major version.
- **Patch version** — Bug fixes and minor improvements. Almost always safe to upgrade.

**Key point:** PyTorch and TensorFlow are compiled against a *specific* cuDNN version. They will work with that exact version or a *patch-compatible* version (same major.minor, higher patch).

---

## 🛠️ Checking Your cuDNN Version

To see which cuDNN version is installed on your system, you can check the library file directly. The version is embedded in the filename or can be queried.

**For reference:**
```
cat /usr/include/cudnn_version.h | grep CUDNN_MAJOR -A 2
```

📤 Output:  
**#define CUDNN_MAJOR 8**  
**#define CUDNN_MINOR 9**  
**#define CUDNN_PATCHLEVEL 7**

Alternatively, if you're inside a Python environment, you can check which cuDNN version a framework is using:

**For reference:**
```python
import torch
print(torch.backends.cudnn.version())
```

📤 Output:  
**8907** (this means cuDNN 8.9.7)

---

## 📊 Compatibility Matrix — cuDNN, PyTorch, and TensorFlow

The table below shows common compatible pairings. Always check the official documentation for the exact version you are installing, as compatibility changes with each release.

| cuDNN Version | PyTorch Version (example) | TensorFlow Version (example) | Notes |
|---------------|---------------------------|------------------------------|-------|
| 8.0.x | 1.7 – 1.8 | 2.4 – 2.5 | Older, limited feature set |
| 8.2.x | 1.9 – 1.10 | 2.6 – 2.7 | Added support for sparse operations |
| 8.4.x | 1.11 – 1.12 | 2.8 – 2.9 | Improved convolution algorithms |
| 8.6.x | 1.13 – 2.0 | 2.10 – 2.11 | Added support for FP8 on H100 |
| 8.9.x | 2.1 – 2.2 | 2.12 – 2.14 | Latest stable for many production setups |
| 9.0.x | 2.3+ | 2.15+ | Requires CUDA 12.x; new architecture support |

**Important:** Using a cuDNN version that is *too new* for your framework can cause missing symbol errors. Using a version that is *too old* may cause performance degradation or missing features.

---

## 🕵️ How to Ensure Compatibility

When setting up a new environment, follow these steps:

1. **Choose your framework version first** — Decide which PyTorch or TensorFlow version you need (based on model requirements or project constraints).

2. **Check the framework's official installation guide** — PyTorch and TensorFlow documentation explicitly state which cuDNN version they were tested with.

3. **Match CUDA version** — cuDNN requires a specific CUDA toolkit version. For example, cuDNN 8.9.x requires CUDA 11.x, while cuDNN 9.0.x requires CUDA 12.x.

4. **Use container images** — The easiest way to avoid version conflicts is to use NVIDIA's official Docker containers (e.g., `nvcr.io/nvidia/pytorch:xx.xx`), which bundle a tested combination of CUDA, cuDNN, and the framework.

5. **Avoid mixing installations** — Do not install cuDNN system-wide *and* inside a conda environment. Stick to one method (preferably the one provided by the framework's package manager).

---

## 🧪 Common Pitfalls and How to Avoid Them

- **Pitfall: Installing cuDNN via `apt` and then installing PyTorch via `pip`**  
  *Solution:* Use PyTorch's own CUDA/cuDNN bundled version (installed via `pip install torch`). The system-wide cuDNN will be ignored.

- **Pitfall: Upgrading cuDNN without upgrading the framework**  
  *Solution:* Always upgrade the framework at the same time, or stick to the version that was tested together.

- **Pitfall: Using a cuDNN version that is too new for your GPU driver**  
  *Solution:* Check the minimum driver version required by cuDNN. For cuDNN 8.9.x, you need driver version 525.60.13 or later.

---

## ✅ Summary Checklist for New Engineers

- [ ] Determine which framework version you need.
- [ ] Check the framework's official compatibility table.
- [ ] Install the matching CUDA toolkit version.
- [ ] Install the matching cuDNN version (or use a bundled framework installation).
- [ ] Verify the installation by printing the cuDNN version from within the framework.
- [ ] If using containers, pull an official NVIDIA container that matches your requirements.

---

## 📚 Further Reading

- NVIDIA cuDNN Release Notes — lists supported CUDA versions and known issues.
- PyTorch installation guide — shows which CUDA/cuDNN versions are bundled with each release.
- TensorFlow build from source guide — documents exact cuDNN versions used for testing.

---

*Remember: The goal is not to memorize every version number, but to understand the dependency chain. When in doubt, use a container image — it removes the guesswork entirely.*