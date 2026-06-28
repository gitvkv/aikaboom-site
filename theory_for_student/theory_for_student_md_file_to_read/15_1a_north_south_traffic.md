# 15.1a North-South traffic: client requests to inference servers — latency-sensitive

#### 🏷️ The AI Data Center Networking — Moving Petabytes Without Latency > 15 The AI Traffic Problem — Why Standard Networks Fail AI Clusters > 15.1 Traffic Patterns in AI Clusters

---

## 🌐 Context Introduction

In an AI data center, not all traffic flows the same way. **North-South traffic** refers to data moving between the outside world (clients, users, or external applications) and the internal AI infrastructure (inference servers). Unlike East-West traffic (server-to-server communication during model training), North-South traffic is **latency-sensitive** — meaning every millisecond of delay directly impacts the user experience.

For a new engineer, think of it like ordering a coffee: you (the client) send a request, the barista (inference server) processes it, and you expect your coffee quickly. If the barista is slow or the line is long, you get frustrated. In AI, this "coffee" is a prediction or classification result, and delays can break real-time applications like autonomous driving, fraud detection, or voice assistants.

---

## ⚙️ What Is North-South Traffic in AI?

- **Definition**: Traffic that enters or exits the AI cluster boundary — from external clients to inference servers, and back.
- **Direction**: Client → Load Balancer → Inference Server → Client.
- **Examples**:
  - A mobile app sending an image to a cloud-based object detection model.
  - A web API requesting a text completion from a large language model (LLM).
  - A self-driving car sending sensor data to an edge inference server.
- **Key Characteristic**: Each request is small (kilobytes to megabytes), but the response must arrive in **real-time** (milliseconds to seconds).

---

## 🕵️ Why Is North-South Traffic Latency-Sensitive?

| Factor | Impact on Latency | Why It Matters |
|--------|-------------------|----------------|
| **User Experience** | High latency = slow app response | Users abandon apps if response > 2 seconds |
| **Real-Time Decisions** | Delays cause missed opportunities | Fraud detection must block a transaction in < 100ms |
| **Safety-Critical Systems** | Latency can cause accidents | Autonomous braking requires < 10ms response |
| **Session State** | Long waits break user sessions | Chatbots lose context if responses are delayed |

**Example Scenario**: A ride-sharing app uses an AI model to estimate arrival time. If the North-South network adds 500ms of latency, the user sees a stale ETA, leading to poor routing decisions and customer complaints.

---

## 🛠️ How North-South Traffic Flows in an AI Cluster

1. **Client Request** — A user or application sends an HTTP/gRPC request to the AI service endpoint.
2. **Load Balancer** — Distributes incoming requests across multiple inference servers to avoid overload.
3. **Inference Server** — Runs the AI model (e.g., TensorFlow Serving, NVIDIA Triton Inference Server) and generates a prediction.
4. **Response** — The result is sent back through the same path to the client.

**Key Network Components**:
- **External Router/Firewall** — First point of entry; must inspect packets quickly.
- **Load Balancer** — Often uses **Layer 7 (application-level)** routing to understand request content.
- **Top-of-Rack (ToR) Switch** — Connects inference servers to the cluster network.
- **Spine Switch** — Aggregates traffic from multiple ToR switches (if cluster is large).

---

## 📊 Traffic Characteristics: North-South vs. East-West

| Feature | North-South Traffic | East-West Traffic |
|---------|---------------------|-------------------|
| **Direction** | In/out of cluster | Between servers inside cluster |
| **Packet Size** | Small (KB – MB) | Large (GB – TB) |
| **Latency Requirement** | Ultra-low (ms) | Moderate (seconds) |
| **Volume** | Low to moderate | Very high (petabytes) |
| **Protocol** | HTTP, gRPC, REST | RDMA, NVLink, InfiniBand |
| **Bottleneck** | Load balancer, firewall | Network bandwidth, congestion |

---

### 📊 Visual Representation: North-South Internet-to-Server Flow
This diagram displays how North-South traffic routes from the external web gateway down into server host interfaces.

```mermaid
flowchart LR
    Internet["External Internet"] -->|North-South| Firewall["Firewall / Load Balancer"]
    Firewall --> Switch["Access Switch"]
    Switch --> Servers["Compute Nodes"]

    classDef cpu fill:#eafaf1,stroke:#76b900,stroke-width:2px,rx:6px,ry:6px;
    classDef memory fill:#f0f7ff,stroke:#3498db,stroke-width:1.5px,rx:4px,ry:4px;
    classDef system fill:#f1f5f9,stroke:#64748b,stroke-width:1.5px;

    class Servers cpu;
    class Firewall memory;
    class Internet,Switch system;
```

## ⚡ Challenges for Engineers Managing North-South Traffic

- **Load Balancer Saturation** — Too many client requests can overwhelm the load balancer, causing dropped packets or timeouts.
- **TLS/SSL Decryption Overhead** — Encrypted requests (HTTPS) require decryption before routing, adding latency.
- **Inference Server Cold Starts** — If servers are idle, they may need to load the model from disk, causing initial delays.
- **Network Jitter** — Inconsistent packet arrival times make it hard to guarantee response deadlines.
- **Firewall Rules** — Security policies can slow down packet inspection.

**Real-World Example**: A video streaming service uses AI for content moderation. If North-South latency spikes above 200ms, users see buffering or inappropriate content slips through.

---

## 🧰 Best Practices for Reducing North-South Latency

- **Use Edge Inference** — Deploy smaller models closer to users (e.g., on CDN nodes) to reduce network hops.
- **Optimize Load Balancers** — Use hardware-based load balancers (e.g., NVIDIA ConnectX SmartNICs) for faster packet processing.
- **Enable HTTP/2 or gRPC** — Multiplex multiple requests over a single connection to reduce handshake overhead.
- **Pre-warm Inference Servers** — Keep models loaded in memory and maintain idle connections.
- **Monitor with Telemetry** — Use tools like **NVIDIA NetQ** or **Prometheus** to track latency percentiles (p50, p95, p99).
- **Implement Caching** — Cache frequent inference results at the load balancer or proxy layer.

---

## 📈 Key Metrics to Watch

- **Request Latency (p99)** — The worst-case delay for 99% of requests. Target: < 100ms for real-time apps.
- **Throughput (RPS)** — Requests per second the system can handle before latency spikes.
- **Error Rate** — Percentage of requests that time out or return errors.
- **Connection Pool Utilization** — How many idle vs. active connections exist between load balancer and inference servers.

---

## 🧪 Simple Test: Simulating North-South Latency

For reference, you can simulate a client request to an inference server using a Python script:

```python
import requests
import time

# Replace with your inference server endpoint
url = "http://inference-server:8000/v1/models/my_model:predict"

# Sample input data
payload = {"instances": [[1.0, 2.0, 3.0]]}

start_time = time.time()
response = requests.post(url, json=payload)
end_time = time.time()

latency_ms = (end_time - start_time) * 1000
print(f"Request latency: {latency_ms:.2f} ms")
print(f"Response status: {response.status_code}")
```

📤 **Output**:  
`Request latency: 45.23 ms`  
`Response status: 200`

---

## ✅ Summary

- **North-South traffic** is the bridge between external clients and internal AI inference servers.
- It is **latency-sensitive** because users and real-time systems cannot tolerate delays.
- Engineers must optimize load balancers, network paths, and server readiness to keep response times low.
- Monitoring p99 latency and throughput is critical for maintaining service-level agreements (SLAs).

> 💡 **Key Takeaway**: In AI infrastructure, North-South traffic is the "front door" — if it's slow, everything feels slow. Focus on reducing every millisecond from client to server and back.