# 4.5e Heredocs and tee: redirecting output while still displaying it

#### 🏷️ The Operating System Layer — Linux for AI Infrastructure Operators > 4 Core Linux Administration for AI Operators > 4.5 Text Processing — Manipulating Configuration and Log Files

## 🌐 Context Introduction

When working with AI infrastructure, you often need to write configuration files, log processing scripts, or automation routines. Two powerful tools help you manage text output effectively:

- **Heredocs** allow you to embed multi-line text directly inside scripts without needing separate files.
- **tee** lets you send command output to both the terminal (so you can see it) and a file (so you can save it) at the same time.

Combined, these tools help engineers create readable automation scripts while preserving visibility into what's happening — essential for debugging AI pipeline configurations and system logs.

---

## 📜 What is a Heredoc?

A heredoc (short for "here document") is a way to pass multiple lines of text as input to a command directly from within a script or terminal session. Think of it as a multi-line string that you can redirect into a file, a command, or a variable.

**Key characteristics:**
- Starts with **<<** followed by a delimiter word (commonly **EOF**, **END**, or **DELIM**).
- Ends with the same delimiter word on its own line.
- Everything between the start and end delimiters is treated as input text.
- You can use variables inside heredocs (they get expanded) unless you quote the delimiter.

**Common use cases in AI infrastructure:**
- Writing configuration files for AI frameworks (e.g., TensorFlow, PyTorch, NVIDIA Triton Inference Server).
- Generating job scripts for SLURM or Kubernetes.
- Creating systemd service files for AI model serving.

---

## 🧪 What is tee?

The **tee** command reads from standard input and writes to both standard output (your terminal) and one or more files simultaneously. Its name comes from the T-shaped pipe fitting in plumbing — it splits the flow in two directions.

**Why it matters for AI operations:**
- You can see real-time output while also saving it to a log file for later analysis.
- Useful when running long training jobs or inference benchmarks where you want both live monitoring and permanent records.
- Helps debug pipeline errors without losing terminal history.

---

## ⚙️ How Heredocs Work

**Basic structure:**
- Use the syntax: **command << DELIMITER** followed by your text, then **DELIMITER** on its own line.
- The command receives the text as standard input.

**Example scenario:**
- You want to create a configuration file for an AI model server.
- Instead of using a text editor, you write the file directly from a script.

**Variable behavior:**
- Unquoted delimiter (e.g., **<< EOF**): Variables like **$HOME** or **$USER** are expanded to their values.
- Quoted delimiter (e.g., **<< 'EOF'** or **<< "EOF"**): Variables are treated as literal text — no expansion occurs.

**Indentation note:**
- If you use **<<-** instead of **<<**, you can indent the delimiter with tabs (but not spaces) for cleaner script formatting.

---

## 🛠️ How tee Works

**Basic usage:**
- Pipe a command's output into **tee** followed by a filename.
- Example: **your_command | tee output.txt**
- The output appears on your terminal AND gets written to **output.txt**.

**Appending vs overwriting:**
- **tee output.txt** overwrites the file each time.
- **tee -a output.txt** appends to the file without deleting existing content.

**Multiple files:**
- You can write to several files at once: **your_command | tee file1.txt file2.txt**

**Suppressing terminal output:**
- If you only want to save to a file but not display, redirect tee's output to **/dev/null**: **your_command | tee file.txt > /dev/null**

---

## 🔄 Combining Heredocs with tee

This is where the real power emerges for AI infrastructure tasks. You can use a heredoc to generate multi-line content and pipe it through **tee** to both display the content and save it to a file.

**Typical workflow:**
1. Use a heredoc to define the content (e.g., a YAML config for an AI model).
2. Pipe the heredoc output into **tee**.
3. Specify the target filename for **tee**.
4. The content appears on your terminal for verification and is written to the file simultaneously.

**Why this combination is valuable:**
- You can review the configuration before it's saved.
- No need for separate **cat** or **echo** commands for each line.
- Perfect for automation scripts where you want both visibility and persistence.

---

## 📊 Comparison: Heredoc vs tee vs Combined

| Tool | Primary Purpose | Output Destination | Typical Use Case |
|------|----------------|-------------------|------------------|
| **Heredoc alone** | Generate multi-line text input | Redirected to a command or file | Writing config files silently in scripts |
| **tee alone** | Duplicate output stream | Terminal + file(s) | Logging command output while monitoring |
| **Heredoc + tee** | Generate AND duplicate text | Terminal + file(s) simultaneously | Creating config files with live verification |

---

## 🕵️ Practical Tips for New Engineers

**When to use heredocs:**
- You need to create configuration files inside automation scripts.
- You want to avoid opening text editors during deployment.
- You're generating repetitive content (e.g., multiple similar config blocks).

**When to use tee:**
- You want to save command output for later review.
- You're debugging a process and need both live and recorded output.
- You're running long operations and want to monitor progress while logging.

**When to combine them:**
- You're writing a configuration file and want to confirm its contents immediately.
- You're generating a script or template and want to see what gets saved.
- You're teaching or demonstrating — the live output helps others understand.

**Common pitfalls to avoid:**
- Forgetting the closing delimiter in a heredoc — the script will hang waiting for input.
- Using spaces instead of tabs with **<<-** — only tabs are recognized for indentation.
- Overwriting important log files with **tee** instead of using **-a** for append.
- Not quoting the delimiter when you want literal variable names in the output.

---

## 🧠 Summary

- **Heredocs** provide a clean way to embed multi-line text in scripts for AI infrastructure tasks.
- **tee** lets you see output while saving it — essential for logging and debugging.
- **Combining them** gives you both content generation and live verification in one step.
- Mastering these tools helps you write more efficient, readable, and maintainable automation scripts for AI operations.

As you work with AI infrastructure, you'll find yourself using heredocs and tee regularly — whether you're configuring NVIDIA GPUs, setting up model serving endpoints, or writing pipeline definitions. Practice combining them, and you'll save time and reduce errors in your daily operations.