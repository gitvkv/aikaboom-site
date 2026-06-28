# 6.3c ssh-copy-id and authorized_keys: passwordless authentication

#### 🏷️ The Operating System Layer — Linux for AI Infrastructure Operators > 6 Linux Networking & Security Hardening > 6.3 SSH — Secure Remote Access for Cluster Management

---

## 🌐 Context Introduction

When managing AI infrastructure, you will frequently need to connect to remote servers — whether to check GPU utilization, restart a service, or deploy a model update. Typing a password every time is slow, insecure, and breaks automation. Passwordless SSH authentication solves this by using cryptographic key pairs instead of passwords. This topic covers two essential tools: **ssh-copy-id** (which helps you deploy your public key) and **authorized_keys** (the file that tells a server which keys to trust).

---

## ⚙️ What is Passwordless SSH Authentication?

Passwordless authentication works by exchanging a **public key** (which you can share freely) and a **private key** (which you keep secret). When you connect, the server checks if your public key is listed in a special file called **authorized_keys**. If it matches, you are granted access without a password.

- **Public key** — placed on the remote server.
- **Private key** — stays on your local machine (never share it).
- **authorized_keys file** — the list of approved public keys on the server.

---

## 🛠️ The authorized_keys File

The **authorized_keys** file lives on the remote server, typically at:

**~/.ssh/authorized_keys**

This file contains one public key per line. Each line is a long string starting with **ssh-rsa**, **ssh-ed25519**, or similar.

Key points:
- The file must be owned by the user you are logging in as.
- Permissions must be strict: only the owner can read/write (mode **600**).
- The parent **.ssh** directory must have mode **700** (only owner can access).

If permissions are wrong, SSH will ignore the file and fall back to password authentication.

---

## 🔑 What is ssh-copy-id?

**ssh-copy-id** is a helper tool that automatically copies your public key to a remote server and places it in the correct **authorized_keys** file with proper permissions.

How it works:
1. You run **ssh-copy-id** with the remote username and server address.
2. You enter the remote user's password one last time.
3. The tool appends your public key to **~/.ssh/authorized_keys** on the remote server.
4. It sets correct file permissions automatically.

After this, you can SSH to that server without a password.

---

## 📊 Comparison: Manual Setup vs. ssh-copy-id

| Feature | Manual Setup | ssh-copy-id |
|---|---|---|
| Steps required | 3–4 manual steps | 1 command |
| Permission handling | You must set manually | Done automatically |
| Risk of mistakes | High (wrong directory, wrong permissions) | Low |
| Best for | Learning or debugging | Daily operations |
| Requires password | Yes (to copy the key) | Yes (one time only) |

---

### 📊 Visual Representation: Authorized Keys Registry Registration
This flowchart illustrates how ssh-copy-id logs into a remote server to append the client's public key to the remote authorized_keys file.

```mermaid
flowchart LR
    Client["Client (id_ed25519.pub)"] -->|ssh-copy-id command| Remote["Remote Server"]
    Remote -->|Appends key to| Auth["~/.ssh/authorized_keys"]

    classDef cpu fill:#eafaf1,stroke:#76b900,stroke-width:2px,rx:6px,ry:6px;
    classDef memory fill:#f0f7ff,stroke:#3498db,stroke-width:1.5px,rx:4px,ry:4px;
    classDef system fill:#f1f5f9,stroke:#64748b,stroke-width:1.5px;

    class Client cpu;
    class Auth memory;
    class Remote system;
```

## 🕵️ How authorized_keys Works Under the Hood

When you initiate an SSH connection:

1. Your client sends a request to the server.
2. The server checks if your username has an **authorized_keys** file.
3. The server reads the file and compares your public key against the list.
4. If a match is found, the server sends a challenge encrypted with your public key.
5. Your client decrypts the challenge using your private key and sends back the proof.
6. Access is granted — no password needed.

This process is called **public-key cryptography** and is the foundation of secure, automated access in AI infrastructure.

---

## ✅ Best Practices for Engineers

- **Use Ed25519 keys** — they are shorter, faster, and more secure than RSA.
- **Never share your private key** — treat it like a password.
- **Keep authorized_keys clean** — remove old or unused keys.
- **Use passphrase-protected private keys** — adds a layer of security if your laptop is stolen.
- **Test after setup** — always verify you can log in without a password before closing your current session.

---

## 🚨 Common Pitfalls

- **Wrong permissions** — SSH is strict. If **authorized_keys** is readable by others, it will be ignored.
- **Wrong file location** — The file must be in the home directory of the user you are connecting as.
- **Key mismatch** — You copied the wrong public key, or the private key is not the one your client is using.
- **SELinux or AppArmor** — Some hardened systems block SSH key authentication. Check security policies.

---

## 🔁 Workflow Summary

1. Generate a key pair on your local machine.
2. Use **ssh-copy-id** to copy the public key to the remote server.
3. Verify passwordless login with a simple SSH command.
4. If it fails, check permissions and file locations on the remote server.

---

## 📌 Key Takeaway

Passwordless SSH authentication using **ssh-copy-id** and **authorized_keys** is a fundamental skill for anyone managing AI infrastructure. It enables automation, improves security, and saves time. Once you set it up correctly, you will rarely need to type a password again for routine server access.

