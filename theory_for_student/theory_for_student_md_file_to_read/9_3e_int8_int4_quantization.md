# 9.3e INT8 and INT4: quantized formats for inference acceleration — how quantization works

#### 🏷️ The Mathematical Imperative — Why AI Demands Specialized Hardware > 9 The Mathematics of Deep Learning — Tensors, Operations & Numerical Precision > 9.3 Numerical Precision and Data Types — The Speed-Accuracy Tradeoff

## 🧠 Context Introduction

When you train a neural network, you typically use **FP32** (32-bit floating point) or **FP16** (16-bit floating point) precision. These formats provide high accuracy because they store numbers with many decimal places. However, during **inference** (when the model is actually making predictions), you can often use much smaller number formats — like **INT8** (8-bit integer) or **INT4** (4-bit integer) — without significantly hurting accuracy.

This process is called **quantization**. It shrinks the model size and dramatically speeds up inference on NVIDIA GPUs, especially on hardware with dedicated **Tensor Cores** that are optimized for low-precision math.

---

## ⚙️ What Is Quantization?

Quantization is the process of **mapping a large range of floating-point numbers** (like -3.14, 0.001, 127.5) into a **smaller range of integer values** (like -128 to 127 for INT8, or -8 to 7 for INT4).

Think of it like compressing a high-resolution photo into a smaller file — you lose some detail, but the picture is still recognizable.

### Key idea:
- **FP32** uses 32 bits per number → high precision, slow, large memory
- **INT8** uses 8 bits per number → lower precision, fast, small memory
- **INT4** uses 4 bits per number → even lower precision, fastest, smallest memory

---

## 📊 How Quantization Works — Step by Step

### Step 1: Determine the Range
First, you look at the **minimum and maximum values** in your tensor (e.g., all the weights in a layer). For example:
- Min value: **-2.5**
- Max value: **3.0**

### Step 2: Choose a Scale Factor
You calculate a **scale** (a multiplier) and a **zero point** (an offset) to map the floating-point range into the integer range.

For **symmetric quantization** (common for weights):
- Scale = (max - min) / (127 - (-128)) for INT8
- Zero point = 0 (no offset)

For **asymmetric quantization** (common for activations):
- Scale = (max - min) / (255) for INT8
- Zero point = round(-min / scale)

### Step 3: Convert Each Number
Every FP32 value is transformed using the formula:

**INT_value = round(FP_value / scale) + zero_point**

### Step 4: Inference with Integers
During inference, the GPU performs all matrix multiplications using **integer arithmetic** (INT8 or INT4), which is much faster than floating-point math. The results are then converted back to floating point for the next layer.

---

## 🛠️ INT8 vs INT4 — Comparison Table

| Feature | INT8 | INT4 |
|---------|------|------|
| **Bits per value** | 8 bits | 4 bits |
| **Range of values** | -128 to 127 | -8 to 7 |
| **Model size reduction** | 4x smaller than FP32 | 8x smaller than FP32 |
| **Speed improvement** | ~2x faster than FP32 | ~4x faster than FP32 |
| **Accuracy loss** | Very small (often <1%) | Moderate (may require fine-tuning) |
| **Best for** | Most production models | Edge devices, very low latency |

---

## 🕵️ When to Use INT8 vs INT4

- **Use INT8** when you need high accuracy and can afford a small speed boost. Most NVIDIA GPUs with Tensor Cores (Volta, Turing, Ampere, Hopper) support INT8 natively.
- **Use INT4** when you are deploying on very constrained hardware (e.g., edge devices, mobile) or need maximum throughput. INT4 requires special support and often needs **calibration** or **quantization-aware training** to maintain accuracy.

---

## 🧪 Practical Example — Quantizing a Single Value

Imagine you have a weight value of **0.75** in FP32, and your scale is **0.01** with zero point **0** (symmetric INT8 quantization):

- INT8 value = round(0.75 / 0.01) + 0 = round(75) = **75**
- During inference, the GPU reads **75** instead of **0.75**
- When the result is needed, the GPU multiplies back: **75 * 0.01 = 0.75**

This simple mapping allows the GPU to do all heavy math with small integers.

---

## 🔧 Tools for Quantization on NVIDIA GPUs

Engineers typically use these tools to apply quantization:

- **TensorRT** — NVIDIA's inference optimizer. It automatically converts FP32 models to INT8 or INT4 during optimization.
- **PyTorch Quantization API** — Provides functions like `torch.quantization.quantize_dynamic()` for post-training quantization.
- **NVIDIA TAO Toolkit** — Offers built-in quantization-aware training (QAT) for fine-tuning models to work with INT8/INT4.

---

## ⚠️ Important Considerations

- **Calibration dataset** — For INT8 quantization, you need a small representative dataset to determine the optimal scale and zero point. TensorRT calls this "calibration."
- **Quantization-aware training (QAT)** — If accuracy drops too much, you can train the model with simulated quantization so it learns to be robust to lower precision.
- **Layer sensitivity** — Some layers (e.g., the first and last layers) are more sensitive to quantization. Engineers often keep those in FP16 or FP32.

---

## ✅ Summary

- **INT8 and INT4** are quantized integer formats that accelerate inference by using fewer bits per number.
- Quantization works by mapping floating-point values to a smaller integer range using a scale and zero point.
- INT8 offers a good balance of speed and accuracy; INT4 offers maximum speed but may require special training.
- Use **TensorRT**, **PyTorch Quantization**, or **TAO Toolkit** to apply quantization to your models.
- Always validate accuracy after quantization — a small loss is expected, but large drops may require QAT.

By mastering quantization, you can deploy models that run **faster, use less memory, and cost less to operate** — all while maintaining near-original accuracy.