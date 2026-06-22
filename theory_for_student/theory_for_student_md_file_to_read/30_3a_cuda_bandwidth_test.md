# 30.3a cuda-bandwidthtest: validating memory bandwidth — H2D, D2H, D2D

#### 🏷️ The Virtualization and Cloud — Extending AI Infrastructure Beyond Bare Metal > 30 GPU Diagnostics and nvidia-smi Mastery > 30.3 GPU Benchmarking and Validation Tools

---

## 🧠 Context Introduction

When working with AI workloads, data movement between the CPU (host) and GPU (device) is often a bottleneck. The **cuda-bandwidthtest** tool helps engineers measure how fast data can travel in three critical directions:

- **H2D** (Host to Device) — CPU sending data to GPU memory
- **D2H** (Device to Host) — GPU sending results back to CPU memory
- **D2D** (Device to Device) — GPU copying data within its own memory

Understanding these bandwidth values helps engineers identify if slow data transfers are limiting AI training or inference performance.

---

## ⚙️ What Does cuda-bandwidthtest Measure?

The tool performs simple memory copy operations and reports the achieved bandwidth in **GB/s** (gigabytes per second). It compares the measured speed against the theoretical maximum bandwidth of your GPU.

| Transfer Type | Direction | Typical Use Case |
|---------------|-----------|------------------|
| H2D | Host → GPU | Loading training data, model weights |
| D2H | GPU → Host | Retrieving inference results, model checkpoints |
| D2D | GPU → GPU | Internal tensor operations, layer-to-layer data flow |

---

## 🛠️ How to Run the Test

The **cuda-bandwidthtest** is included in the **CUDA Samples** package. Engineers can run it directly from the command line.

**For reference:**
```
cuda-bandwidthtest
```

📤 Output: The tool will display a table showing transfer sizes (from 1 MB to 64 MB or more) and the corresponding bandwidth for H2D, D2H, and D2D transfers.

---

## 📊 Interpreting the Results

When you run the test, look for these key indicators:

- **D2D bandwidth** should be the highest — typically close to the GPU's memory bandwidth specification
- **H2D and D2H bandwidth** will be lower — limited by PCIe generation and link width
- **Consistency** — values should remain stable across multiple runs (within 5-10% variation)

**Example expected behavior:**
- A modern GPU with PCIe Gen4 x16 might show D2D bandwidth of **900+ GB/s**
- H2D/D2H bandwidth might show **25-32 GB/s** depending on system configuration

---

## 🕵️ Common Issues and Troubleshooting

If bandwidth values are lower than expected, consider these checks:

- **PCIe link speed** — Ensure the GPU is running at the correct PCIe generation (check with nvidia-smi)
- **CPU memory type** — Using slower DDR4 vs. faster DDR5 can impact H2D/D2H performance
- **System load** — Other processes consuming memory bandwidth can reduce test results
- **GPU power state** — Ensure the GPU is not in a low-power state (P8 instead of P0)

---

## ✅ Validation Checklist for Engineers

- [ ] Run the test at least 3 times and record average values
- [ ] Compare D2D bandwidth against GPU specification sheet
- [ ] Verify H2D/D2H bandwidth matches expected PCIe throughput
- [ ] Check that results are consistent across multiple GPUs in the same system
- [ ] Document baseline values for future comparison after system changes

---

## 📝 Summary

The **cuda-bandwidthtest** is a simple but powerful validation tool. By measuring H2D, D2H, and D2D memory bandwidth, engineers can quickly confirm that their AI infrastructure's data pathways are performing as expected. Low bandwidth values often point to configuration issues that, once resolved, can significantly improve overall AI workload performance.