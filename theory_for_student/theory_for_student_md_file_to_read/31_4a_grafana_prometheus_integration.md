# 31.4a Connecting Grafana to Prometheus as a data source

#### 🏷️ The Virtualization and Cloud — Extending AI Infrastructure Beyond Bare Metal > 31 Cluster-Wide Telemetry — DCGM, Prometheus, and Grafana > 31.4 Grafana — Visualizing Cluster Health

---

## 🧠 Context Introduction

Once you have Prometheus collecting metrics from your AI cluster (like GPU utilization, memory usage, and temperature via DCGM), the next step is to visualize that data. Grafana is the tool that turns raw numbers into dashboards, charts, and alerts. To make this work, you must first connect Grafana to Prometheus as a **data source** — think of it as telling Grafana where to find all the telemetry information it needs to display.

---

## ⚙️ What Is a Data Source in Grafana?

A data source is simply a connection configuration that tells Grafana where to query metrics from. Prometheus is one of the most common data sources for AI infrastructure monitoring because it stores time-series data efficiently.

**Key points:**
- Grafana does **not** store data itself — it relies on data sources like Prometheus.
- You can connect multiple Prometheus instances to a single Grafana instance.
- Each data source has a unique name and URL that Grafana uses to fetch metrics.

---

## 🛠️ Prerequisites Before Connecting

Before you begin, ensure the following are in place:

- ✅ **Prometheus is running** and accessible from the Grafana server (check the URL and port, typically **http://localhost:9090** or a remote IP).
- ✅ **Grafana is installed and running** (default access at **http://localhost:3000**).
- ✅ **Network connectivity** exists between Grafana and Prometheus (no firewall blocking port 9090).
- ✅ You have **admin or editor permissions** in Grafana to add data sources.

---

## 📊 Step-by-Step: Connecting Grafana to Prometheus

Follow these steps to add Prometheus as a data source in Grafana:

1. **Log in to Grafana** — open your browser and go to **http://localhost:3000** (default credentials are **admin / admin**).

2. **Navigate to Configuration** — click the **gear icon** (⚙️) on the left sidebar, then select **Data Sources**.

3. **Add a new data source** — click the **+ Add data source** button (blue button at the top).

4. **Select Prometheus** — from the list of supported data sources, choose **Prometheus**.

5. **Configure the connection**:
   - **Name**: Give it a descriptive name like **Prometheus - AI Cluster**.
   - **URL**: Enter the Prometheus server address. For example:
     - If Prometheus is on the same machine: **http://localhost:9090**
     - If Prometheus is on another server: **http://192.168.1.100:9090**
   - **Access**: Leave as **Server** (default) — this means Grafana will proxy requests to Prometheus.

6. **Save & Test** — click the **Save & Test** button at the bottom. Grafana will attempt to connect and show a green success message if everything works.

---

## 🕵️ Verifying the Connection

After saving, you can verify the connection is working:

- Look for a **green checkmark** next to the data source name in the list.
- Click **Explore** (compass icon on the left sidebar) and select your new Prometheus data source.
- Type a simple query like **up** and press **Enter**. You should see a graph with data points.

---

## 📋 Comparison: Prometheus vs Other Data Sources

| Feature | Prometheus | Other Sources (e.g., InfluxDB, Graphite) |
|---------|------------|------------------------------------------|
| **Data format** | Time-series with labels | Varies (tags, fields, etc.) |
| **Query language** | PromQL (Prometheus Query Language) | SQL-like or custom |
| **Best for** | GPU metrics, container monitoring, AI workloads | General-purpose metrics, IoT |
| **Pull vs Push** | Pull-based (Prometheus scrapes targets) | Often push-based (agents send data) |
| **Integration with DCGM** | Native support via **dcgm-exporter** | Requires custom adapters |

---

## 🧩 Troubleshooting Common Issues

If the connection fails, check these common problems:

- **Wrong URL** — Ensure you are using the correct Prometheus address and port (default **9090**).
- **Firewall blocking** — Verify that port **9090** is open between Grafana and Prometheus.
- **Authentication required** — If Prometheus has basic auth, you must provide credentials in the Grafana data source settings under **Auth**.
- **Grafana version mismatch** — Older Grafana versions may not support newer Prometheus features. Update both tools to recent versions.

---

## ✅ Summary

Connecting Grafana to Prometheus is a straightforward process that unlocks the power of visual monitoring for your AI infrastructure. Once connected, you can build dashboards that show real-time GPU utilization, memory trends, and cluster health — all from the metrics Prometheus collects from DCGM and other exporters.

**Next step:** After the data source is connected, you can start creating dashboards and setting up alerts to keep your AI cluster running smoothly.