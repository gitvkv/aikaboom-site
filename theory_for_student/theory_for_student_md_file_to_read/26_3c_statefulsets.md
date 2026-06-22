# 26.3c StatefulSets: ordered Pod creation with stable network identities — for databases

#### 🏷️ The Cluster Orchestration — Managing the GPU Fleet at Scale > 26 Kubernetes Fundamentals — Container Orchestration from Scratch > 26.3 Core Kubernetes Objects for AI Workloads

## 📘 Context Introduction

When you run databases or stateful AI workloads (like model training checkpoints or vector databases), you need each Pod to have a **stable identity** that persists across restarts. Unlike Deployments, which treat Pods as interchangeable, StatefulSets guarantee that each Pod gets a unique, sticky network name and a persistent storage binding. This is critical for databases where Pod A must always know it is "Pod A" and reconnect to the same data volume.

---

## ⚙️ What Makes StatefulSets Different

- **Ordered Pod creation** — Pods start one at a time, in sequence (0, 1, 2...), and each must be ready before the next begins.
- **Stable network identities** — Each Pod gets a predictable hostname (e.g., `mydb-0`, `mydb-1`) that does not change when the Pod is rescheduled.
- **Stable storage** — Each Pod is bound to its own PersistentVolumeClaim (PVC) that survives Pod restarts.
- **Ordered graceful shutdown** — Pods terminate in reverse order (last created, first destroyed).

---

## 🛠️ How StatefulSets Work for Databases

### Pod Identity and Headless Services

StatefulSets rely on a **headless Service** (a Service with `clusterIP: None`) to provide DNS records for each Pod. This allows database clients to connect directly to `pod-name.service-name.namespace.svc.cluster.local`.

**Example scenario for a PostgreSQL cluster:**
- Pod `pg-0` is always the primary database.
- Pod `pg-1` and `pg-2` are replicas.
- When `pg-0` restarts, it keeps the same network identity and reattaches to its original data volume.

### Ordered Pod Lifecycle

| Phase | Behavior | Why It Matters for Databases |
|-------|----------|------------------------------|
| **Creation** | Pods start in order: 0 → 1 → 2 | Prevents replicas from connecting before the primary is ready |
| **Scaling up** | New Pods are appended at the end | Existing Pods keep their ordinal numbers |
| **Scaling down** | Highest ordinal Pods are removed first | Protects the primary (ordinal 0) from accidental deletion |
| **Rolling update** | Pods update one by one in reverse order | Ensures at least one replica is always available |

---

## 🕵️ Stable Network Identities Explained

Each Pod in a StatefulSet gets a hostname based on its **ordinal index** (starting at 0). The format is:

**`<statefulset-name>-<ordinal>.<service-name>.<namespace>.svc.cluster.local`**

For example, if you have a StatefulSet named `redis-cluster` with 3 replicas and a headless Service named `redis`, the Pods are reachable at:
- `redis-cluster-0.redis.default.svc.cluster.local`
- `redis-cluster-1.redis.default.svc.cluster.local`
- `redis-cluster-2.redis.default.svc.cluster.local`

This stability means database applications can hardcode connection strings without worrying about Pod IP changes.

---

## 📊 Comparison: StatefulSet vs. Deployment

| Feature | Deployment | StatefulSet |
|---------|-----------|-------------|
| Pod identity | Random, ephemeral | Predictable, ordinal-based |
| Storage binding | Shared or ephemeral | Dedicated PVC per Pod |
| Pod ordering | Parallel creation | Sequential creation |
| Use case | Stateless apps (web servers, APIs) | Stateful apps (databases, message queues) |
| Scaling behavior | Any Pod can be terminated | Highest ordinal removed first |

---

## 🧩 Practical Example: Database Cluster Setup

To run a database like MySQL or Cassandra with StatefulSets, you typically:

1. **Define a headless Service** — This provides DNS records for each Pod.
2. **Create a StatefulSet** — Specify the container image, replicas, and volume claim templates.
3. **Mount persistent storage** — Each Pod gets its own PVC from the template.
4. **Configure the database** — Use the Pod's hostname (via environment variables or DNS) to set up replication.

**For reference:**
```
apiVersion: v1
kind: Service
metadata:
  name: mydb
spec:
  clusterIP: None
  selector:
    app: mydb
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mydb
spec:
  serviceName: mydb
  replicas: 3
  selector:
    matchLabels:
      app: mydb
  template:
    metadata:
      labels:
        app: mydb
    spec:
      containers:
      - name: database
        image: postgres:15
        volumeMounts:
        - name: data
          mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 10Gi
```

📤 Output: When applied, three Pods (`mydb-0`, `mydb-1`, `mydb-2`) are created sequentially. Each Pod mounts its own 10GB persistent volume. The headless Service `mydb` allows Pods to discover each other via DNS.

---

## ✅ Key Takeaways for New Engineers

- **StatefulSets are for pets, not cattle** — Each Pod is unique and irreplaceable.
- **Always pair with a headless Service** — Without it, stable network identities do not work.
- **Use volumeClaimTemplates** — This ensures each Pod gets its own storage, not shared storage.
- **Expect slower startup** — Ordered creation means databases take longer to deploy than stateless apps.
- **Plan for scaling carefully** — Scaling down removes the highest ordinal Pod first, which may be a replica, not the primary.

---

## 🔍 Common Pitfalls to Avoid

- ❌ **Forgetting the headless Service** — Pods will not have stable DNS names.
- ❌ **Using ReadWriteMany volumes** — StatefulSets work best with ReadWriteOnce volumes for data isolation.
- ❌ **Assuming Pods are interchangeable** — Do not use a Deployment for databases; you will lose data on Pod restarts.
- ❌ **Scaling down too aggressively** — Always verify which Pod (primary vs. replica) will be removed first.

---

## 🚀 Next Steps for Learning

- Practice deploying a simple PostgreSQL StatefulSet in a test cluster.
- Experiment with scaling up and down to observe Pod creation and termination order.
- Check the DNS resolution of each Pod using `nslookup` or `dig` from another Pod.
- Simulate a Pod failure and verify that the replacement Pod retains its original identity and storage.