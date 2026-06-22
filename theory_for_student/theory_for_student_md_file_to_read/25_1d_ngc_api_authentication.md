# 25.1d NGC API key authentication: generating and configuring access

#### 🏷️ The Nvidia Software Stack — Bridging Silicon and Python > 25 NVIDIA NGC, AI Enterprise, and NIMs > 25.1 The NGC Catalog — NVIDIA's Accelerated Software Hub

Welcome, new engineer! This section covers one of the most fundamental security steps when working with NVIDIA's ecosystem: **NGC API key authentication**. Think of an API key as a digital passport that allows your tools, scripts, and containers to securely access NVIDIA's software catalog, download pre-trained models, pull container images, and interact with NVIDIA AI Enterprise services.

---

## 🔍 Context: Why Do You Need an NGC API Key?

When you work with NVIDIA's accelerated software stack, you often need to pull container images from NVIDIA's private registry (nvcr.io), download models from the NGC Catalog, or authenticate against NVIDIA AI Enterprise. Without an API key, these operations will fail with authentication errors. The key ensures that:
- Only authorized users access NVIDIA's software.
- Usage can be tracked and managed.
- You can access both public and private repositories.

---

## ⚙️ Step 1: Generating Your NGC API Key

To generate an API key, you must first have an NVIDIA NGC account. Once logged in:

- Navigate to the **NGC Setup** page (accessible from your profile menu).
- Locate the **API Keys** section.
- Click **Generate API Key**.
- A new key will appear — **copy it immediately**. You will not be able to see it again after leaving the page.
- Give your key a descriptive name (e.g., "Dev Workstation Key") to track its purpose.

**Important notes about your key:**
- Each key is tied to your NGC account and its associated teams/organizations.
- You can generate multiple keys for different environments (e.g., one for local development, one for production).
- Keys do not expire by default, but you can revoke them at any time.

---

## 🛠️ Step 2: Configuring Access — Where to Use Your API Key

Once you have your key, you need to configure it in your environment. The most common places to use it:

### 🔐 Docker / Container Runtime Authentication
When pulling containers from **nvcr.io**, you must log in using your API key as the password.

**For reference:**
```
docker login nvcr.io
```
- **Username:** `$oauthtoken` (this is a literal string, not your email)
- **Password:** Your actual NGC API key

📤 **Output:** `Login Succeeded`

### 🐍 NGC CLI Configuration
If you use the NGC CLI tool, you can configure your key globally:

**For reference:**
```
ngc config set
```
- You will be prompted for your API key.
- The CLI stores it in a configuration file at `~/.ngc/config`.

📤 **Output:** `API key set successfully`

### 🌐 Environment Variables for Scripts and Automation
For automated workflows, set the key as an environment variable:

**For reference:**
```
export NGC_API_KEY=your_actual_api_key_here
```
- Many NVIDIA tools automatically read this variable.
- Add this line to your `~/.bashrc` or `~/.zshrc` for persistence.

---

## 🕵️ Step 3: Verifying Your Authentication Works

After configuring your key, always verify it works:

- **Docker:** Run `docker pull nvcr.io/nvidia/cuda:12.2.0-base-ubuntu22.04` — it should download without errors.
- **NGC CLI:** Run `ngc registry image list` — you should see a list of available images.
- **Python SDK:** Use the `nvidia-ngc` Python package to test programmatic access.

If you see authentication errors, double-check:
- The key was copied correctly (no extra spaces).
- The key has not been revoked.
- You are using the correct username (`$oauthtoken`) for Docker.

---

## 📊 Comparison: API Key vs. Other Authentication Methods

| Method | Use Case | Security Level | Best For |
|--------|----------|----------------|----------|
| **NGC API Key** | Docker login, CLI, scripts | High (revocable) | Most engineers |
| **OAuth Token** | Web-based access, CI/CD | Very High (short-lived) | Automated pipelines |
| **Personal Access Token (PAT)** | GitHub/GitLab integration | High | Version control workflows |
| **SSO / SAML** | Enterprise single sign-on | Very High | Large organizations |

---

## 🧹 Best Practices for API Key Management

- **Never share your API key** in code repositories, chat messages, or logs.
- **Use environment variables** instead of hardcoding keys in scripts.
- **Rotate keys periodically** — generate a new key and revoke the old one.
- **Use separate keys** for development, staging, and production environments.
- **Revoke compromised keys immediately** from the NGC portal.

---

## ✅ Summary

You now understand how to generate, configure, and verify NGC API key authentication. This single step unlocks access to NVIDIA's entire accelerated software ecosystem — from container registries to AI models. Keep your keys secure, and you'll be ready to pull, deploy, and run NVIDIA's software stack with confidence.