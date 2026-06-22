# 4.3b Octal notation: 755, 644, 600 — what every combination means

#### 🏷️ The Operating System Layer — Linux for AI Infrastructure Operators > 4 Core Linux Administration for AI Operators > 4.3 Linux Permissions — Controlling Access to AI Resources

---

## 🔍 Context Introduction

When working with AI infrastructure, you will frequently need to control who can read, write, or execute files and directories. Linux uses a simple but powerful permission system based on **octal (base-8) notation**. Three numbers — like **755**, **644**, and **600** — are the most common permission sets you will encounter. Understanding what each digit means is essential for securing AI models, datasets, configuration files, and scripts.

---

## ⚙️ How Octal Permissions Work

Each octal digit represents a set of three permissions for a specific user group:

- **Owner** (the user who owns the file)
- **Group** (users in the file's group)
- **Others** (everyone else)

Each permission type has a numeric value:

| Permission | Symbol | Numeric Value |
|------------|--------|---------------|
| Read       | r      | 4             |
| Write      | w      | 2             |
| Execute    | x      | 1             |
| No permission | -   | 0             |

To calculate a permission digit, add the values of the permissions you want to grant.

---

## 🧮 Breaking Down the Three Most Common Combinations

### 755 — Standard for Executable Scripts and Directories

- **Owner**: 7 (read + write + execute = 4 + 2 + 1)
- **Group**: 5 (read + execute = 4 + 1)
- **Others**: 5 (read + execute = 4 + 1)

**What it means**: The owner has full control. Everyone else can read and execute the file or directory but cannot modify it.

**When to use**: For AI training scripts, model inference scripts, and directories containing datasets that multiple users need to access.

---

### 644 — Standard for Configuration Files and Text Files

- **Owner**: 6 (read + write = 4 + 2)
- **Group**: 4 (read only)
- **Others**: 4 (read only)

**What it means**: The owner can read and modify the file. Everyone else can only read it.

**When to use**: For AI model configuration files (YAML, JSON, TOML), log files, documentation, and dataset metadata files.

---

### 600 — Private Files for Sensitive Data

- **Owner**: 6 (read + write = 4 + 2)
- **Group**: 0 (no permissions)
- **Others**: 0 (no permissions)

**What it means**: Only the owner can read or write the file. No one else has any access.

**When to use**: For API keys, database passwords, private SSH keys, and any sensitive AI model weights or proprietary training data.

---

## 📊 Quick Reference Table

| Octal | Owner | Group | Others | Common Use Case |
|-------|-------|-------|--------|-----------------|
| 755   | rwx   | r-x   | r-x    | Scripts, directories, executables |
| 644   | rw-   | r--   | r--    | Configuration files, logs, text files |
| 600   | rw-   | ---   | ---    | Private keys, secrets, sensitive data |

---

## 🕵️ How to Read an Octal Permission String

When you see a permission string like **rwxr-xr-x**, it maps directly to octal:

- First three characters (rwx) = owner = 7
- Next three characters (r-x) = group = 5
- Last three characters (r-x) = others = 5

So **rwxr-xr-x** equals **755**.

---

## 🛠️ Practical Examples for AI Infrastructure

**For a training script that everyone needs to run but only you should edit:**
- Use **755**

**For a model configuration file that others need to read but not modify:**
- Use **644**

**For a file containing your cloud provider API credentials:**
- Use **600**

**For a shared dataset directory where users need to browse and read files:**
- Use **755** on the directory itself
- Use **644** on the files inside

---

## ✅ Key Takeaways for New Engineers

- The first digit always controls the **owner**, the second controls the **group**, and the third controls **others**.
- **755** is the most permissive safe default — it gives full control to the owner and read+execute to everyone else.
- **644** is the standard for files that should not be executed.
- **600** is for secrets — never use anything more permissive for sensitive AI infrastructure files.
- Always apply the **principle of least privilege**: grant only the permissions necessary for the task.

---

## 📝 Final Note

As you manage AI infrastructure, you will see these three octal combinations constantly. Memorize them:

- **755** = owner can do everything, others can read and execute
- **644** = owner can read and write, others can only read
- **600** = only the owner can read or write

This simple knowledge will help you keep your AI models, datasets, and infrastructure secure from the start.