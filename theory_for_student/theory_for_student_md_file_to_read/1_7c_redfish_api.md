# 1.7c Redfish API: the modern RESTful replacement for IPMI

#### 🏷️ The Physical Realm — Data Center Foundations & Hardware Architecture > 1 What Is a Computer? Core Architecture for Absolute Beginners > 1.7 Out-of-Band Management — Controlling Servers Without Being Present

---

## 🌐 Context Introduction

For decades, engineers managed servers remotely using **IPMI (Intelligent Platform Management Interface)** — a text-based, command-line tool that worked over a dedicated management network. While functional, IPMI has limitations: it is complex, insecure by default, and difficult to integrate with modern automation tools.

Enter **Redfish** — a modern, RESTful API standard developed by the DMTF (Distributed Management Task Force). Redfish uses **HTTP/HTTPS** and **JSON** to manage hardware, making it much easier to use with scripts, cloud-native tools, and modern programming languages. Think of it as "IPMI for the cloud era."

---

## ⚙️ What Is Redfish?

Redfish is an **open-standard API** that allows engineers to monitor, configure, and control server hardware remotely — without needing to be physically present in the data center.

Key characteristics:
- **RESTful** — uses standard HTTP methods (GET, POST, PATCH, DELETE)
- **JSON-based** — data is returned in easy-to-read JSON format
- **Secure** — supports HTTPS, authentication, and role-based access
- **Scalable** — can manage single servers or entire racks
- **Vendor-neutral** — works across Dell, HPE, Supermicro, Lenovo, and others

---

## 🕵️ How Redfish Compares to IPMI

| Feature | IPMI | Redfish |
|---------|------|---------|
| **Protocol** | Binary (RMCP+) | HTTP/HTTPS (REST) |
| **Data format** | Raw bytes / IPMI commands | JSON |
| **Security** | Weak (plaintext often used) | Strong (TLS, authentication) |
| **Ease of use** | Requires specialized tools | Works with curl, Python, Postman |
| **Automation** | Difficult to script | Easy to integrate with Ansible, Terraform |
| **Scalability** | Single server at a time | Single server or entire rack |
| **Modern tooling** | Limited | Cloud-native, CI/CD friendly |

---

## 🛠️ Core Concepts of Redfish

### 📡 Resource Tree
Redfish organizes hardware into a **tree of resources**, each accessible via a unique URL. Common resources include:

- **Systems** — the main server (CPU, memory, storage)
- **Chassis** — physical enclosure (power supplies, fans, temperature)
- **Managers** — the BMC (Baseboard Management Controller) itself
- **Power** — power state and consumption
- **Thermal** — temperature sensors and fan speeds
- **Storage** — drives and RAID controllers

### 🔗 Example Resource Paths
- **Server system info:** `/redfish/v1/Systems/1`
- **Power supplies:** `/redfish/v1/Chassis/1/Power`
- **BMC firmware:** `/redfish/v1/Managers/1`

### 🔐 Authentication
Redfish uses standard HTTP authentication:
- **Basic Auth** — username and password (over HTTPS only)
- **Session-based** — login once, get a session token
- **Token-based** — use API keys for automation

---

## 📊 Common Use Cases for Engineers

### 🔍 Monitoring Hardware Health
- Check server power state (on/off)
- View CPU temperature and fan speeds
- Monitor disk drive status (healthy/failed)
- Read system event logs

### ⚡ Controlling Server Power
- Power on, power off, or restart a server
- Perform a graceful shutdown or hard reset
- Set power-on delay or boot order

### 🛡️ Firmware and BIOS Management
- View current firmware versions
- Update BIOS or BMC firmware remotely
- Change BIOS settings (e.g., boot mode, power profile)

### 🔄 Automation and Orchestration
- Integrate with Ansible, Terraform, or custom Python scripts
- Automate server provisioning in data centers
- Collect telemetry data for monitoring dashboards

---

## 🧪 Simple Example Workflow

**Scenario:** An engineer needs to check if a server is powered on.

1. **Send a GET request** to the Redfish endpoint for the server's power state.
2. **Receive JSON response** containing the current power state.
3. **Parse the JSON** to extract the value (e.g., "On" or "Off").

**For reference:**
```
GET /redfish/v1/Systems/1
Host: 192.168.1.100
Authorization: Basic base64(username:password)
Accept: application/json
```

📤 **Output:** `{"PowerState": "On", "Status": {"State": "Enabled", "Health": "OK"}}`

---

## ✅ Advantages Over IPMI

- **Easier to learn** — if you know HTTP and JSON, you already know most of Redfish
- **Better security** — built-in support for HTTPS and authentication
- **More automation-friendly** — works with modern tools like curl, Python, and Ansible
- **Vendor-agnostic** — same API works across different hardware brands
- **Richer data** — JSON provides structured, human-readable information

---

## 🧩 Getting Started as a New Engineer

1. **Find the Redfish endpoint** for your server (usually `https://<BMC-IP>/redfish/v1/`)
2. **Test with a browser** — many BMCs have a web interface that shows Redfish data
3. **Use curl** to send simple GET requests (e.g., `curl -k https://admin:password@192.168.1.100/redfish/v1/Systems/1`)
4. **Explore the resource tree** — start with `/redfish/v1/` and follow the links
5. **Read the vendor documentation** — each manufacturer may have slight differences

---

## 📚 Key Takeaways

- **Redfish is the modern replacement for IPMI** — simpler, more secure, and automation-ready
- **It uses standard web technologies** — HTTP, JSON, and REST
- **It works across all major server vendors** — Dell, HPE, Supermicro, Lenovo, etc.
- **It is essential for modern data center operations** — especially for cloud-native and DevOps workflows
- **Start small** — just checking power state or temperature is a great first step

---

> 💡 **Pro Tip:** If you can use a web browser to check a server's health, you can use Redfish. The API is just the same data, but in a machine-readable format.