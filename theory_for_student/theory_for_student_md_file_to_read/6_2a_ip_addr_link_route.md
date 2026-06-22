# 6.2a ip addr, ip link, ip route: the modern replacements for ifconfig and route

#### 🏷️ The Operating System Layer — Linux for AI Infrastructure Operators > 6 Linux Networking & Security Hardening > 6.2 Network Troubleshooting for AI Cluster Operators

---

## 🌐 Context Introduction

In AI infrastructure, network connectivity is critical — from data transfer between GPU nodes to accessing storage systems. Older tools like **ifconfig** and **route** have been used for decades, but they are now deprecated in modern Linux distributions. The **ip** command suite (**ip addr**, **ip link**, **ip route**) is the modern replacement, offering more detailed output, better scripting support, and full compatibility with today's networking features (like virtual interfaces, bridges, and namespaces). For new engineers working with NVIDIA-Certified systems, mastering these commands is essential for troubleshooting and configuring AI cluster networks.

---

## ⚙️ Why Replace ifconfig and route?

- **ifconfig** and **route** are from the **net-tools** package, which is no longer actively maintained.
- The **ip** commands come from the **iproute2** package, which is the standard on all modern Linux distributions (Ubuntu 20.04+, RHEL 8+, etc.).
- **ip** commands provide more information, support for advanced networking (e.g., VLANs, bridges, tunnels), and consistent output formatting.
- **ifconfig** can show incorrect statistics for virtual interfaces used in containerized environments (like Docker or Kubernetes).

---

## 🛠️ The Three Core ip Commands

### 1. **ip addr** — View and Configure IP Addresses

- **ip addr** replaces **ifconfig -a** for listing all network interfaces and their IP addresses.
- It shows:
  - Interface name (e.g., eth0, ens3, ib0 for InfiniBand)
  - MAC address (link/ether)
  - IPv4 and IPv6 addresses
  - Interface state (UP/DOWN)
  - Broadcast and scope information

**For reference:**
```
ip addr show
```
📤 Output: Shows all interfaces with their IP addresses, MAC addresses, and operational status.

**For reference:**
```
ip addr show eth0
```
📤 Output: Shows details only for the eth0 interface.

**Key fields to understand:**
- **inet** — IPv4 address (e.g., 192.168.1.10/24)
- **inet6** — IPv6 address
- **state UP** — Interface is active and ready
- **state DOWN** — Interface is disabled or not connected

---

### 2. **ip link** — Manage Network Interface Hardware

- **ip link** focuses on the **data link layer** (Layer 2) — the physical or virtual network interface itself.
- It replaces **ifconfig** for tasks like bringing interfaces up/down and viewing MAC addresses.

**For reference:**
```
ip link show
```
📤 Output: Lists all interfaces with their MAC addresses, MTU size, and operational state.

**For reference:**
```
ip link set eth0 up
```
📤 Output: No output on success — brings the eth0 interface online.

**For reference:**
```
ip link set eth0 down
```
📤 Output: No output on success — takes the eth0 interface offline.

**Common use cases:**
- Checking if a cable is plugged in (look for **state UP**)
- Resetting a network interface after configuration changes
- Viewing the **MTU** (Maximum Transmission Unit) — important for InfiniBand or high-performance networks

---

### 3. **ip route** — View and Manage Routing Tables

- **ip route** replaces **route -n** for viewing and modifying the kernel routing table.
- It shows how packets are forwarded to different networks.

**For reference:**
```
ip route show
```
📤 Output: Displays the routing table, including default gateway and directly connected networks.

**For reference:**
```
ip route add 10.0.0.0/8 via 192.168.1.1 dev eth0
```
📤 Output: No output on success — adds a static route to the 10.0.0.0/8 network via the gateway at 192.168.1.1.

**Key routing concepts:**
- **default via** — The default gateway (used for traffic not matching other routes)
- **dev** — The interface used to reach a network
- **proto kernel** — Routes automatically added by the kernel when an interface gets an IP address

---

## 📊 Comparison Table: Old vs. New

| Task | Old Command (deprecated) | New Command (modern) | What It Shows |
|------|--------------------------|----------------------|---------------|
| View all interfaces | **ifconfig -a** | **ip addr show** | IP addresses, MAC, state |
| View specific interface | **ifconfig eth0** | **ip addr show eth0** | Same as above, filtered |
| Bring interface up | **ifconfig eth0 up** | **ip link set eth0 up** | No output (success) |
| Bring interface down | **ifconfig eth0 down** | **ip link set eth0 down** | No output (success) |
| View routing table | **route -n** | **ip route show** | Destinations, gateways, interfaces |
| Add a static route | **route add -net 10.0.0.0/8 gw 192.168.1.1** | **ip route add 10.0.0.0/8 via 192.168.1.1** | No output (success) |
| Delete a route | **route del -net 10.0.0.0/8** | **ip route del 10.0.0.0/8** | No output (success) |

---

## 🕵️ Practical Troubleshooting for AI Cluster Operators

When diagnosing network issues in an AI cluster (e.g., slow data transfer between GPU nodes), use these **ip** commands in sequence:

1. **Check interface status** — Use **ip link show** to verify all interfaces are **state UP**.
2. **Verify IP addresses** — Use **ip addr show** to confirm each node has the correct IP address on the right subnet.
3. **Inspect routing** — Use **ip route show** to ensure the default gateway and any static routes (e.g., to storage networks) are present.
4. **Test connectivity** — Use **ping** (not an ip command, but complementary) to check reachability.

**Example scenario:** If a GPU node cannot reach a storage server at 10.0.0.50:
- Run **ip addr show** — confirm the node has an IP in the 10.0.0.0/24 range.
- Run **ip route show** — confirm there is a route for 10.0.0.0/24 or a default gateway.
- If the interface is **state DOWN**, run **ip link set <interface> up** to enable it.

---

## ✅ Key Takeaways for New Engineers

- Always use **ip addr**, **ip link**, and **ip route** instead of **ifconfig** and **route**.
- The **ip** commands are part of the **iproute2** package, which is pre-installed on all modern Linux distributions.
- For AI infrastructure, pay special attention to:
  - **Interface state** (UP/DOWN) — a down interface means no connectivity.
  - **MTU settings** — mismatched MTU can cause packet loss in high-performance networks.
  - **Routing table** — missing routes can isolate nodes from storage or management networks.
- The output of **ip** commands is script-friendly — you can parse it with tools like **grep**, **awk**, or **jq** for automation.

---

## 📚 Further Learning

- Practice running **ip addr show**, **ip link show**, and **ip route show** on any Linux machine (even a virtual machine or cloud instance).
- Compare the output of **ifconfig** (if available) with **ip addr** to see the additional details provided by the modern tool.
- For NVIDIA-Certified systems, familiarize yourself with **ibstat** and **ibstatus** for InfiniBand-specific diagnostics — these complement the **ip** commands for high-speed interconnects.