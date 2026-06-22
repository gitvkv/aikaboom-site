# 13.1c Tensor Parallelism: splitting individual layers (attention heads) across GPUs

#### 🏷️ The Nvidia GPU Architecture — The Silicon at the Heart of AI Infrastructure > 13 Multi-GPU Interconnects — Scaling Beyond One GPU > 13.1 Why Multi-GPU Communication Is Critical for AI Training

## 🧭 Context Introduction

When training large language models (LLMs) like GPT or Llama, a single GPU cannot hold the entire model in memory. Even if it could, the computation would be too slow. **Tensor Parallelism** solves this by splitting a single neural network layer — specifically the attention heads inside a transformer — across multiple GPUs. Each GPU holds a piece of the layer and works in parallel, then the results are combined.

Think of it like a team of chefs: instead of one chef cooking an entire meal, each chef prepares one ingredient, and they assemble the dish together at the end.

---

## ⚙️ What Is Tensor Parallelism?

- **Tensor Parallelism (TP)** divides the weight matrices of a single layer across multiple GPUs.
- Each GPU computes its portion of the forward pass simultaneously.
- After computation, GPUs communicate to combine partial results (using **all-reduce** or **all-gather** operations).
- This is different from **Data Parallelism** (where each GPU has a full copy of the model but processes different data batches).

---

## 🧠 How Attention Heads Are Split

In a transformer model, the **multi-head attention** layer contains multiple attention heads. With Tensor Parallelism:

- **Head splitting**: Each GPU is assigned a subset of attention heads.
- **Weight splitting**: The weight matrices (Q, K, V, and output projection) are divided column-wise or row-wise across GPUs.
- **Parallel computation**: Each GPU computes its assigned heads independently.
- **Result combination**: Partial outputs are gathered and concatenated to form the full attention output.

---

## 📊 Comparison: Tensor Parallelism vs. Other Parallelism Strategies

| Feature | Tensor Parallelism | Data Parallelism | Pipeline Parallelism |
|---------|-------------------|------------------|----------------------|
| **What is split?** | Single layer weights (attention heads) | Entire model copy per GPU | Different layers across GPUs |
| **Communication** | High (every forward/backward step) | Low (only gradients) | Medium (activations between stages) |
| **Memory savings** | Reduces per-GPU memory for weights | No memory savings for weights | Reduces memory for activations |
| **Best for** | Very large models that don't fit on one GPU | Scaling training with large batch sizes | Deep models with many layers |
| **Example** | Splitting 32 attention heads across 4 GPUs (8 heads each) | 4 GPUs each training on different data batches | GPU1: layers 1-4, GPU2: layers 5-8 |

---

## 🛠️ How Tensor Parallelism Works in Practice

### Step-by-step flow for a single transformer layer:

1. **Input tensor** (e.g., batch size × sequence length × hidden dimension) is broadcast to all GPUs.
2. **Weight splitting**: The Q, K, V weight matrices are split column-wise across GPUs.
3. **Parallel computation**: Each GPU computes its portion of attention heads.
4. **All-reduce communication**: GPUs exchange partial results to compute the full attention output.
5. **Output projection**: The output weight matrix is split row-wise, and results are combined via another all-reduce.

---

## 🕵️ Why Communication Matters

- Tensor Parallelism requires **frequent all-reduce operations** after every layer.
- This creates high bandwidth demand between GPUs.
- **NVIDIA NVLink** and **NVSwitch** are critical — they provide high-speed, low-latency connections that make TP efficient.
- Without fast interconnects, the communication overhead would negate the benefits of parallelism.

---

## 🧩 Practical Example: Splitting 8 Attention Heads Across 2 GPUs

For reference:
```
# Conceptual layout (not actual code)
# Model: 8 attention heads, hidden size = 1024

# GPU 0 gets heads 0-3 (4 heads)
# GPU 1 gets heads 4-7 (4 heads)

# Each GPU holds:
#   Q weights for its 4 heads: shape [1024, 512]
#   K weights for its 4 heads: shape [1024, 512]
#   V weights for its 4 heads: shape [1024, 512]
#   Output projection weights: shape [1024, 1024] (split row-wise)

# Forward pass:
# GPU 0 computes attention for heads 0-3
# GPU 1 computes attention for heads 4-7
# Both GPUs all-reduce to combine outputs
```

📤 **Output**: Each GPU produces a partial attention output of shape [batch, seq_len, 512]. After all-reduce, the full output is [batch, seq_len, 1024].

---

## ✅ Key Takeaways for New Engineers

- **Tensor Parallelism = splitting a single layer's work across GPUs** — not the whole model.
- **Attention heads are the natural split point** in transformer models.
- **Communication is frequent and heavy** — NVLink/NVSwitch are essential.
- **TP is typically combined** with Data Parallelism and Pipeline Parallelism for maximum efficiency (called **3D Parallelism**).
- **Memory savings**: Each GPU holds only a fraction of the model weights, enabling training of models that would otherwise be impossible on a single GPU.

---

## 📚 Further Learning Path

1. Understand **NVLink topology** and how GPUs are physically connected.
2. Experiment with **Megatron-LM** or **NVIDIA NeMo** — both support Tensor Parallelism natively.
3. Learn about **sequence parallelism** (a variant that splits along the sequence dimension).
4. Study **all-reduce algorithms** (ring all-reduce vs. tree all-reduce) to understand communication patterns.

> **Remember**: Tensor Parallelism is a powerful tool, but it requires careful tuning of the parallelism degree (number of GPUs per tensor-parallel group) to balance computation and communication overhead.