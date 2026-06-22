# 25.3d Available NIMs: Llama 3, Mistral, Stable Diffusion, and domain-specific models

#### 🏷️ The Nvidia Software Stack — Bridging Silicon and Python > 25 NVIDIA NGC, AI Enterprise, and NIMs > 25.3 NVIDIA NIM (Inference Microservices)

## 🌐 Context Introduction

NVIDIA NIM (NVIDIA Inference Microservices) provides pre-built, optimized containers that make it easy to deploy popular AI models for inference. For new engineers, think of NIMs as "ready-to-serve" packages that handle all the complex GPU optimization, so you can focus on using the model rather than configuring it. This section covers four key categories of available NIMs: Llama 3, Mistral, Stable Diffusion, and domain-specific models.

---

## 🦙 Llama 3 NIM

Llama 3 is Meta's latest large language model (LLM) family, optimized for text generation, chat, and reasoning tasks.

**Key characteristics:**
- Available in 8B, 70B, and 405B parameter sizes
- Supports context windows up to 128K tokens
- Excels at instruction following and multi-turn conversations
- Pre-optimized for NVIDIA GPUs with TensorRT-LLM

**Common use cases:**
- Building chatbots and virtual assistants
- Content generation and summarization
- Code generation and debugging
- Question-answering systems

**Example deployment approach:**
- Pull the NIM container from NGC
- Specify the model variant (e.g., Llama 3 8B or 70B)
- Configure inference parameters like max tokens and temperature
- Expose a REST API endpoint for your application

---

## 🌬️ Mistral NIM

Mistral is a family of efficient, open-weight LLMs known for strong performance with smaller model sizes.

**Key characteristics:**
- Available in 7B, 8x7B (Mixtral), and 8x22B sizes
- Uses Mixture of Experts (MoE) architecture for efficiency
- Supports native function calling and JSON output
- Optimized for low-latency inference

**Common use cases:**
- Real-time chat applications
- Structured data extraction
- Tool-use and agent workflows
- Edge deployment scenarios

**Comparison with Llama 3:**

| Feature | Llama 3 | Mistral |
|---------|---------|---------|
| Model sizes | 8B, 70B, 405B | 7B, 8x7B, 8x22B |
| Architecture | Dense transformer | Dense + MoE |
| Context window | Up to 128K tokens | Up to 32K tokens |
| Strength | Large-scale reasoning | Efficiency & speed |
| Best for | Complex tasks | Real-time apps |

---

## 🎨 Stable Diffusion NIM

Stable Diffusion is a family of text-to-image generation models that create images from textual descriptions.

**Key characteristics:**
- Supports SD 1.5, SD 2.1, SDXL, and SD3 variants
- Generates images at resolutions up to 1024x1024
- Includes safety checker and NSFW filtering
- Optimized for batch processing and high throughput

**Common use cases:**
- Generating marketing visuals and concept art
- Creating variations of existing images (img2img)
- Inpainting and outpainting
- Style transfer and artistic exploration

**Key parameters you can control:**
- **Prompt:** The text description of the desired image
- **Negative prompt:** Things to avoid in the image
- **Guidance scale:** How closely to follow the prompt (higher = more strict)
- **Steps:** Number of denoising iterations (higher = more detail)
- **Seed:** Random seed for reproducible results

---

## 🏥 Domain-Specific Models NIMs

Domain-specific NIMs are pre-trained or fine-tuned models optimized for particular industries or tasks.

**Available domain categories:**

- **🏥 Healthcare & Life Sciences:**
  - BioBERT for biomedical text mining
  - MONAI for medical image analysis
  - Drug discovery models (e.g., MolMIM)

- **💼 Financial Services:**
  - FinBERT for financial sentiment analysis
  - Fraud detection models
  - Risk assessment LLMs

- **🏭 Manufacturing & Industrial:**
  - Visual inspection models for defect detection
  - Predictive maintenance models
  - Digital twin simulation models

- **🎮 Media & Entertainment:**
  - Audio transcription models (Whisper)
  - Video understanding models
  - 3D generation models

**How to find domain-specific NIMs:**
- Browse the NVIDIA NGC catalog
- Filter by "Domain" or "Industry"
- Look for models tagged with specific use cases
- Check for pre-built workflows and example applications

---

## 🛠️ Choosing the Right NIM

**Decision framework for new engineers:**

1. **Define your task:** Text generation, image creation, or domain-specific analysis?
2. **Consider latency requirements:** Real-time (Mistral) vs. batch (Llama 3 large)
3. **Evaluate hardware:** Smaller models (7B-8B) run on single GPUs; larger models need multi-GPU
4. **Check licensing:** Open models (Llama 3, Mistral) vs. proprietary domain models
5. **Test with sample prompts:** Use the NGC playground or local deployment

**Quick reference:**

| If you need... | Choose... |
|----------------|-----------|
| General text generation | Llama 3 |
| Fast, efficient chat | Mistral |
| Image generation | Stable Diffusion |
| Medical analysis | Healthcare NIMs |
| Financial insights | Financial NIMs |

---

## 🚀 Getting Started with NIMs

**Basic workflow for any NIM:**

1. **Access NGC:** Create an NVIDIA NGC account and generate an API key
2. **Pull the NIM container:** Use the NGC CLI or Docker to download the optimized container
3. **Configure the model:** Set environment variables for model path, GPU count, and inference parameters
4. **Start the server:** Launch the container with Docker or Kubernetes
5. **Send requests:** Use REST API calls (HTTP POST) to send prompts and receive responses
6. **Monitor performance:** Check logs and metrics for latency, throughput, and GPU utilization

**Best practices for new engineers:**
- Start with smaller model variants to understand the workflow
- Use the default parameters first, then experiment with tuning
- Monitor GPU memory usage to avoid out-of-memory errors
- Test with a single request before scaling to production loads
- Review NVIDIA's official documentation for each specific NIM

---

## ✅ Summary

NVIDIA NIMs provide a streamlined path to deploying state-of-the-art AI models. Llama 3 excels at complex reasoning tasks, Mistral offers efficiency for real-time applications, Stable Diffusion powers image generation, and domain-specific models address specialized industry needs. By understanding the strengths and use cases of each category, new engineers can quickly select and deploy the right NIM for their projects without deep expertise in GPU optimization or model serving infrastructure.