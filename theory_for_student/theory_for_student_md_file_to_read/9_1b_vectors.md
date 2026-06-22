# 9.1b Vectors: 1D arrays — a word embedding, a bias term

#### 🏷️ The Mathematical Imperative — Why AI Demands Specialized Hardware > 9 The Mathematics of Deep Learning — Tensors, Operations & Numerical Precision > 9.1 Data Structures in Deep Learning

---

## 🧭 Context Introduction

In deep learning, data is organized into structures called **tensors**. The simplest tensor is a **vector**, which is a 1-dimensional (1D) array of numbers. Think of it as a simple list. Two critical places you'll encounter vectors in AI are **word embeddings** and **bias terms**. Understanding these will help you grasp how models represent language and adjust their predictions.

---

## 📊 What is a Vector (1D Array)?

A vector is an ordered collection of numbers. In programming terms, it's like a list or an array with one dimension.

- **Shape**: A vector has a shape of `(n,)` where `n` is the number of elements.
- **Example**: `[0.5, -1.2, 3.8, 0.0]` is a vector of length 4.
- **In AI**: Vectors are the building blocks for everything from single data points to layers in a neural network.

---

## 🧠 Word Embeddings — Representing Words as Vectors

A **word embedding** is a vector that represents a word's meaning. Instead of using a single number for a word (like "cat = 1"), we use a list of numbers (e.g., 300 numbers) to capture relationships like "king - man + woman ≈ queen".

### Key Points:
- **Dense representation**: Each number in the vector is a learned feature (e.g., "gender", "royalty", "size").
- **Fixed length**: All words in a model have the same vector length (e.g., 100, 300, or 768 dimensions).
- **Learned from data**: The model adjusts these numbers during training so similar words have similar vectors.

### Example (simplified):
- Word "king" → vector: `[0.8, 0.2, -0.1, 0.5]`
- Word "queen" → vector: `[0.7, 0.1, -0.2, 0.6]`
- Notice the numbers are close — this reflects semantic similarity.

---

## ⚖️ Bias Terms — The Adjustable Offset

A **bias term** is another vector, but much simpler. It's a single value (or a small vector) added to a layer's output to shift it up or down. Think of it like the "intercept" in a linear equation: `y = mx + b` where `b` is the bias.

### Why Bias Matters:
- **Helps models fit data**: Without bias, the model's output would always pass through the origin (0,0), which is rarely realistic.
- **Learned during training**: Like weights, bias values are adjusted to minimize error.
- **Shape**: In a layer with 10 neurons, the bias is a vector of 10 numbers — one per neuron.

### Example:
- A layer computes: `output = (input * weight) + bias`
- If the weighted sum is `[2.0, -1.5]` and bias is `[0.1, -0.3]`, the final output is `[2.1, -1.8]`.

---

## 🛠️ Comparison: Word Embedding vs. Bias Term

| Feature | Word Embedding | Bias Term |
|---------|----------------|-----------|
| **Purpose** | Represents meaning of a word | Shifts output of a neuron |
| **Dimensionality** | High (e.g., 100–768) | Low (1 per neuron) |
| **Learned?** | Yes, from training data | Yes, from training data |
| **Role in model** | Input representation | Internal adjustment |
| **Example shape** | `(300,)` for a word | `(10,)` for a layer with 10 neurons |

---

## 🕵️ Why This Matters for Engineers

- **Memory usage**: Word embeddings can be large. A vocabulary of 50,000 words with 300-dimension vectors uses 50,000 × 300 = 15 million numbers. This impacts GPU memory.
- **Initialization**: Both embeddings and biases are initialized with small random values before training.
- **Operations**: Adding a bias vector to a matrix of activations is a simple element-wise addition — a fast operation on GPUs.

---

## 💡 Simple Mental Model

- **Word embedding** = A "fingerprint" for a word — a unique list of numbers that describes its meaning.
- **Bias term** = A "tweak" — a small adjustment that helps the model make better predictions.

Both are just 1D arrays (vectors), but they serve very different purposes in the deep learning pipeline.

---

## 🔍 Quick Check — Can You Answer?

- What is the shape of a vector with 5 elements? *(Answer: (5,))*
- Why do we need bias terms in a neural network? *(Answer: To allow the model to fit data that doesn't pass through the origin.)*
- How does a word embedding help a model understand language? *(Answer: By representing words as dense vectors that capture semantic relationships.)*