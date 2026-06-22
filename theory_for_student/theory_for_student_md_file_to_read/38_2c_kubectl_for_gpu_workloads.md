# 38.2c kubectl for GPU workloads: 25 essential commands for AI cluster operators

#### 🏷️ The Exam Preparation & Certification Mastery > 38 Reference Appendices and Quick-Reference Guides > 38.2 Command Quick Reference

---

## 🧠 Context Introduction

As an engineer working with AI infrastructure, you'll spend a lot of time managing GPU-accelerated workloads in Kubernetes clusters. GPUs are expensive, scarce resources, and misconfiguring them can waste money or crash training jobs. This guide covers **25 essential kubectl commands** that every AI cluster operator should know — from checking GPU availability to debugging failed training pods. These commands will help you monitor, troubleshoot, and optimize your GPU workloads efficiently.

---

## ⚙️ Section 1: GPU Resource Discovery & Node Status

These commands help you understand what GPU hardware is available in your cluster.

- **Check which nodes have GPUs:** Use **kubectl get nodes -o wide** and look for the **nvidia.com/gpu** capacity in the node's allocatable resources.
- **View detailed GPU node labels:** Run **kubectl describe node <node-name>** and scroll to the **Labels** section. Look for labels like **gpu-type** or **nvidia.com/gpu.product**.
- **List all GPU resources across the cluster:** Execute **kubectl get nodes -o json** and filter with **jq** to extract **status.allocatable** entries containing **nvidia.com/gpu**.
- **Check GPU driver version on a node:** Use **kubectl get node <node-name> -o yaml** and look for the annotation **nvidia.com/gpu.driver.version**.
- **Verify GPU memory and compute capability:** Run **kubectl describe node <node-name>** and examine the **Capacity** section for **nvidia.com/gpu.memory** and **nvidia.com/gpu.compute** values.

📤 Output: For a healthy GPU node, you should see values like **nvidia.com/gpu: 8** (8 GPUs) and **nvidia.com/gpu.memory: 80960** (80 GB per GPU).

---

## 🛠️ Section 2: Pod & Workload Management for GPU Jobs

These commands help you deploy, inspect, and manage GPU-accelerated pods.

- **List all GPU-requesting pods:** Run **kubectl get pods --all-namespaces -o wide** and filter for pods with **nvidia.com/gpu** in their resource requests.
- **Check if a pod is using GPUs:** Execute **kubectl describe pod <pod-name>** and look for **nvidia.com/gpu** under **Requests** and **Limits**.
- **View GPU utilization for a running pod:** Use **kubectl exec -it <pod-name> -- nvidia-smi** to see real-time GPU usage inside the container.
- **Get pod logs for GPU errors:** Run **kubectl logs <pod-name>** and search for keywords like **CUDA_ERROR**, **out of memory**, or **NVIDIA driver**.
- **Restart a stuck GPU pod:** Execute **kubectl delete pod <pod-name>** — the pod will be recreated if it's part of a Deployment or StatefulSet.

📤 Output: A healthy GPU pod will show **nvidia.com/gpu: 1** in its resource requests and **nvidia-smi** will display active processes.

---

## 📊 Section 3: Monitoring GPU Utilization & Metrics

These commands help you track GPU usage across your cluster.

- **Check cluster-wide GPU allocation:** Run **kubectl describe nodes** and sum the **Allocated resources** for **nvidia.com/gpu** across all nodes.
- **View GPU metrics with Prometheus:** Use **kubectl get --raw /api/v1/namespaces/monitoring/services/prometheus:9090/proxy/api/v1/query?query=DCGM_FI_DEV_GPU_UTIL** to get utilization percentages.
- **Monitor GPU memory usage per pod:** Execute **kubectl top pod --containers** and look for **nvidia.com/gpu-memory** in the output.
- **List all GPU pods sorted by age:** Run **kubectl get pods --all-namespaces --sort-by=.metadata.creationTimestamp** and filter for GPU-requesting pods.
- **Check pending GPU pods:** Use **kubectl get pods --all-namespaces --field-selector=status.phase=Pending** and investigate why GPUs aren't being allocated.

📤 Output: A healthy cluster shows GPU utilization between 70-95% for training jobs, with less than 5% of GPU pods in Pending state.

---

## 🕵️ Section 4: Debugging & Troubleshooting GPU Issues

These commands help you diagnose common GPU problems in AI workloads.

- **Check for GPU pod evictions:** Run **kubectl get events --all-namespaces** and filter for **Evicted** or **FailedScheduling** events related to GPU pods.
- **Verify NVIDIA device plugin is running:** Execute **kubectl get pods -n kube-system -l name=nvidia-device-plugin** — you should see one pod per GPU node.
- **Test GPU access inside a pod:** Use **kubectl run gpu-test --image=nvidia/cuda:12.0-base -- nvidia-smi** to verify GPU passthrough works.
- **Check for GPU memory fragmentation:** Run **kubectl exec <pod-name> -- nvidia-smi -q -d MEMORY** and look for **Fragmentation** metrics.
- **View pod resource limits vs. requests:** Execute **kubectl describe pod <pod-name>** and compare **Requests** (guaranteed) vs. **Limits** (maximum allowed) for **nvidia.com/gpu**.

📤 Output: A healthy device plugin shows **Ready: True** status. Fragmentation below 10% is normal; above 30% may require pod rescheduling.

---

## 🔄 Section 5: Scaling & Resource Optimization

These commands help you optimize GPU resource usage across your AI cluster.

- **Scale a GPU deployment up/down:** Use **kubectl scale deployment <deployment-name> --replicas=<number>** to adjust the number of GPU pods.
- **Check GPU pod distribution across nodes:** Run **kubectl get pods -o wide --selector=app=<your-app>** and verify GPUs are spread evenly.
- **View pending GPU resource requests:** Execute **kubectl describe nodes** and check **Allocated resources** vs. **Capacity** for **nvidia.com/gpu**.
- **Identify underutilized GPU nodes:** Use **kubectl top nodes** and compare GPU utilization (via **nvidia-smi** on each node) against CPU/memory usage.
- **Check for GPU resource quotas:** Run **kubectl describe resourcequota -n <namespace>** to see limits on **nvidia.com/gpu** per namespace.

📤 Output: Optimal distribution shows each GPU node running 1-2 training pods, with no node exceeding 90% GPU allocation.

---

## 📋 Comparison Table: Common GPU Workload States

| State | Command to Check | Healthy Indicator | Troubleshooting Tip |
|-------|-----------------|-------------------|---------------------|
| **Pending (no GPUs)** | **kubectl get pods --field-selector=status.phase=Pending** | Fewer than 5 pods pending | Check node GPU capacity and device plugin status |
| **Running (using GPUs)** | **kubectl describe pod <pod> \| grep nvidia.com/gpu** | GPU count matches request | Verify **nvidia-smi** shows active processes |
| **CrashLoopBackOff** | **kubectl logs <pod> --previous** | No CUDA errors in logs | Check GPU memory limits and driver compatibility |
| **OOMKilled** | **kubectl describe pod <pod> \| grep -A5 "Last State"** | No OOM events in 24 hours | Increase GPU memory limit or reduce batch size |
| **Evicted** | **kubectl get events --field-selector=reason=Evicted** | Zero evictions per week | Check node pressure and pod priority class |

---

## ✅ Quick Reference: 25 Commands Summary

For reference:
```
# GPU Discovery
kubectl get nodes -o wide
kubectl describe node <node-name>
kubectl get nodes -o json | jq '.items[].status.allocatable'
kubectl get node <node-name> -o yaml
kubectl describe node <node-name>

# Pod Management
kubectl get pods --all-namespaces -o wide
kubectl describe pod <pod-name>
kubectl exec -it <pod-name> -- nvidia-smi
kubectl logs <pod-name>
kubectl delete pod <pod-name>

# Monitoring
kubectl describe nodes
kubectl get --raw /api/v1/...
kubectl top pod --containers
kubectl get pods --sort-by=.metadata.creationTimestamp
kubectl get pods --field-selector=status.phase=Pending

# Debugging
kubectl get events --all-namespaces
kubectl get pods -n kube-system -l name=nvidia-device-plugin
kubectl run gpu-test --image=nvidia/cuda:12.0-base -- nvidia-smi
kubectl exec <pod-name> -- nvidia-smi -q -d MEMORY
kubectl describe pod <pod-name>

# Scaling & Optimization
kubectl scale deployment <deployment-name> --replicas=<number>
kubectl get pods -o wide --selector=app=<your-app>
kubectl describe nodes
kubectl top nodes
kubectl describe resourcequota -n <namespace>
```

📤 Output: These 25 commands cover 90% of daily GPU workload management tasks. Bookmark this list for your exam and day-to-day operations.

---

## 🎯 Final Tips for New Engineers

- **Always verify GPU access** with **nvidia-smi** before assuming a pod can use GPUs.
- **Check the NVIDIA device plugin** first when GPUs aren't being allocated — it's the most common failure point.
- **Use pod resource requests** (not just limits) to guarantee GPU availability for critical training jobs.
- **Monitor GPU memory** as closely as GPU compute — out-of-memory errors are the #1 cause of training failures.
- **Practice these commands** on a test cluster before your exam. Muscle memory for **kubectl describe** and **kubectl logs** will save you during troubleshooting.