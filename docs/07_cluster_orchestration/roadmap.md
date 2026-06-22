# 🗺️ Roadmap: The Cluster Orchestration — Managing the GPU Fleet at Scale

Below is the syllabus timeline of lessons in this module. Track your study progress here.

## 📈 Progress
<div class="progress-container">
  <div class="progress-bar">0%</div>
</div>
---

### 📁 26 Kubernetes Fundamentals — Container Orchestration from Scratch
*   <span class="roadmap-badge" data-lesson-id="26_1a_pets_vs_cattle"></span> [26.1a From 'pet' servers to 'cattle' clusters: the philosophy shift](chapter_26/26.1a_261a_from_pet_servers_to_cattle_clusters.md)
*   <span class="roadmap-badge" data-lesson-id="26_1b_container_scaling_challenges"></span> [26.1b The problem with running containers manually at scale: scheduling, failure, upgrades](chapter_26/26.1b_261b_the_problem_with_running_containers_manually_at_scale.md)
*   <span class="roadmap-badge" data-lesson-id="26_1c_kubernetes_automation"></span> [26.1c What Kubernetes automates: placement, health-checking, scaling, networking, storage](chapter_26/26.1c_261c_what_kubernetes_automates.md)
*   <span class="roadmap-badge" data-lesson-id="26_2a_kube_apiserver"></span> [26.2a API Server (kube-apiserver): the REST frontend — all control plane communication](chapter_26/26.2a_262a_api_server_kube.md)
*   <span class="roadmap-badge" data-lesson-id="26_2b_etcd"></span> [26.2b etcd: the distributed key-value store — the authoritative cluster state](chapter_26/26.2b_262b_etcd.md)
*   <span class="roadmap-badge" data-lesson-id="26_2c_kube_scheduler"></span> [26.2c Scheduler (kube-scheduler): matching Pods to Nodes based on resources and constraints](chapter_26/26.2c_262c_scheduler_kube.md)
*   <span class="roadmap-badge" data-lesson-id="26_2d_controller_manager"></span> [26.2d Controller Manager: Deployment controller, ReplicaSet controller, Node controller](chapter_26/26.2d_262d_controller_manager.md)
*   <span class="roadmap-badge" data-lesson-id="26_2e_kubelet"></span> [26.2e Kubelet: the node agent — ensuring Pods are running as declared](chapter_26/26.2e_262e_kubelet.md)
*   <span class="roadmap-badge" data-lesson-id="26_2f_kube_proxy"></span> [26.2f Kube-proxy: network rules for Service routing on each node](chapter_26/26.2f_262f_kube.md)
*   <span class="roadmap-badge" data-lesson-id="26_2g_container_runtime_interface"></span> [26.2g Container Runtime Interface (CRI): containerd and CRI-O as Docker replacements](chapter_26/26.2g_262g_container_runtime_interface_cri.md)
*   <span class="roadmap-badge" data-lesson-id="26_3a_kubernetes_pods"></span> [26.3a Pods: the smallest deployable unit — one or more containers sharing network/storage](chapter_26/26.3a_263a_pods.md)
*   <span class="roadmap-badge" data-lesson-id="26_3b_kubernetes_deployments"></span> [26.3b Deployments: declarative Pod management with rolling updates and rollbacks](chapter_26/26.3b_263b_deployments.md)
*   <span class="roadmap-badge" data-lesson-id="26_3c_statefulsets"></span> [26.3c StatefulSets: ordered Pod creation with stable network identities — for databases](chapter_26/26.3c_263c_statefulsets.md)
*   <span class="roadmap-badge" data-lesson-id="26_3d_jobs_and_cronjobs"></span> [26.3d Jobs and CronJobs: batch workloads with completion semantics — AI training runs](chapter_26/26.3d_263d_jobs_and_cronjobs.md)
*   <span class="roadmap-badge" data-lesson-id="26_3e_kubernetes_services"></span> [26.3e Services: stable networking endpoints for Pods (ClusterIP, NodePort, LoadBalancer)](chapter_26/26.3e_263e_services.md)
*   <span class="roadmap-badge" data-lesson-id="26_3f_configmaps_and_secrets"></span> [26.3f ConfigMaps and Secrets: externalizing configuration and credentials from containers](chapter_26/26.3f_263f_configmaps_and_secrets.md)
*   <span class="roadmap-badge" data-lesson-id="26_3g_persistent_volumes_and_claims"></span> [26.3g PersistentVolumes (PV) and PersistentVolumeClaims (PVC): durable storage in K8s](chapter_26/26.3g_263g_persistentvolumes_pv_and_persistentvolumeclaims_pvc.md)
*   <span class="roadmap-badge" data-lesson-id="26_3h_kubernetes_namespaces"></span> [26.3h Namespaces: multi-team isolation within one cluster](chapter_26/26.3h_263h_namespaces.md)
*   <span class="roadmap-badge" data-lesson-id="26_3i_resource_requests_and_limits"></span> [26.3i Resource Requests and Limits: CPU and memory budgets for every Pod](chapter_26/26.3i_263i_resource_requests_and_limits.md)
*   <span class="roadmap-badge" data-lesson-id="26_4a_kubectl_essential_commands"></span> [26.4a kubectl get, describe, logs, exec, apply, delete — the essential verb set](chapter_26/26.4a_264a_kubectl_get_describe_logs_exec_apply_delete.md)
*   <span class="roadmap-badge" data-lesson-id="26_4b_kubernetes_yaml_manifests"></span> [26.4b YAML manifests: writing and applying Deployment and Pod specs](chapter_26/26.4b_264b_yaml_manifests.md)
*   <span class="roadmap-badge" data-lesson-id="26_4c_helm_basics"></span> [26.4c Helm: the package manager for Kubernetes — charts, values, and releases](chapter_26/26.4c_264c_helm.md)
*   <span class="roadmap-badge" data-lesson-id="26_4d_kustomize_basics"></span> [26.4d kustomize: overlay-based configuration management without templating](chapter_26/26.4d_264d_kustomize.md)

### 📁 27 Kubernetes for AI — NVIDIA GPU and Network Operators
*   <span class="roadmap-badge" data-lesson-id="27_1a_gpu_operator_overview"></span> [27.1a What the GPU Operator automates: driver DaemonSet, container toolkit, DCGM exporter, MIG config](chapter_27/27.1a_271a_what_the_gpu_operator_automates.md)
*   <span class="roadmap-badge" data-lesson-id="27_1b_operator_architecture"></span> [27.1b Operator architecture: the operator pattern and Custom Resource Definitions (CRDs)](chapter_27/27.1b_271b_operator_architecture.md)
*   <span class="roadmap-badge" data-lesson-id="27_1c_gpu_operator_installation"></span> [27.1c Installing the GPU Operator via Helm: values.yaml configuration options](chapter_27/27.1c_271c_installing_the_gpu_operator_via_helm.md)
*   <span class="roadmap-badge" data-lesson-id="27_1d_clusterpolicy_crd"></span> [27.1d ClusterPolicy CRD: the single object that controls the entire GPU software stack](chapter_27/27.1d_271d_clusterpolicy_crd.md)
*   <span class="roadmap-badge" data-lesson-id="27_1e_preinstalled_driver_strategy"></span> [27.1e Using pre-installed drivers: operatortype=preinstalled vs. kernel module management](chapter_27/27.1e_271e_using_pre.md)
*   <span class="roadmap-badge" data-lesson-id="27_1f_gpu_operator_verification"></span> [27.1f Verifying GPU Operator: pod status across kube-system and gpu-operator namespaces](chapter_27/27.1f_271f_verifying_gpu_operator.md)
*   <span class="roadmap-badge" data-lesson-id="27_2a_network_operator_overview"></span> [27.2a What the Network Operator automates: OFED drivers, RDMA device plugin, SR-IOV](chapter_27/27.2a_272a_what_the_network_operator_automates.md)
*   <span class="roadmap-badge" data-lesson-id="27_2b_nicclusterpolicy_crd"></span> [27.2b NicClusterPolicy CRD: configuring RDMA devices across all nodes](chapter_27/27.2b_272b_nicclusterpolicy_crd.md)
*   <span class="roadmap-badge" data-lesson-id="27_2c_sriov_basics"></span> [27.2c SR-IOV (Single Root I/O Virtualization): virtual functions for containers](chapter_27/27.2c_272c_sr.md)
*   <span class="roadmap-badge" data-lesson-id="27_2d_multus_cni"></span> [27.2d Multus CNI: attaching multiple network interfaces to AI training Pods](chapter_27/27.2d_272d_multus_cni.md)
*   <span class="roadmap-badge" data-lesson-id="27_2e_rdma_device_plugin"></span> [27.2e RDMA device plugin: advertising ib0 and rdma resources to the K8s scheduler](chapter_27/27.2e_272e_rdma_device_plugin.md)
*   <span class="roadmap-badge" data-lesson-id="27_3a_gpu_requests_in_pods"></span> [27.3a Requesting GPUs in Pod spec: resources.limits.nvidia.com/gpu: 8](chapter_27/27.3a_273a_requesting_gpus_in_pod_spec.md)
*   <span class="roadmap-badge" data-lesson-id="27_3b_node_affinity_and_taints"></span> [27.3b Node affinity and taints/tolerations: directing GPU workloads to GPU nodes](chapter_27/27.3b_273b_node_affinity_and_taintstolerations.md)
*   <span class="roadmap-badge" data-lesson-id="27_3c_volcano_and_kueue"></span> [27.3c Volcano and KUEUE: batch scheduling frameworks for multi-GPU training jobs in K8s](chapter_27/27.3c_273c_volcano_and_kueue.md)
*   <span class="roadmap-badge" data-lesson-id="27_3d_mpi_and_pytorch_operators"></span> [27.3d MPI Operator and PyTorch Operator: running distributed training jobs in K8s](chapter_27/27.3d_273d_mpi_operator_and_pytorch_operator.md)
*   <span class="roadmap-badge" data-lesson-id="27_3e_gang_scheduling"></span> [27.3e Gang scheduling: all-or-nothing Pod placement for multi-node training](chapter_27/27.3e_273e_gang_scheduling.md)

### 📁 28 Advanced GPU Resource Management — MIG, MPS, and Time-Slicing
*   <span class="roadmap-badge" data-lesson-id="28_1a_gpu_utilization_challenges"></span> [28.1a GPU utilization on inference workloads: often 10–30% of peak throughput](chapter_28/28.1a_281a_gpu_utilization_on_inference_workloads.md)
*   <span class="roadmap-badge" data-lesson-id="28_1b_gpu_multi_tenancy"></span> [28.1b The multi-tenancy challenge: sharing expensive GPUs safely between teams](chapter_28/28.1b_281b_the_multi.md)
*   <span class="roadmap-badge" data-lesson-id="28_1c_timeslicing_mps_mig_comparison"></span> [28.1c Three technologies compared: Time-Slicing vs MPS vs MIG — the decision framework](chapter_28/28.1c_281c_three_technologies_compared.md)
*   <span class="roadmap-badge" data-lesson-id="28_2a_gpu_timeslicing"></span> [28.2a How time-slicing works: GPU context switching between processes](chapter_28/28.2a_282a_how_time.md)
*   <span class="roadmap-badge" data-lesson-id="28_2b_kubernetes_timeslicing_configuration"></span> [28.2b Configuring time-slicing in Kubernetes via GPU Operator configmap](chapter_28/28.2b_282b_configuring_time.md)
*   <span class="roadmap-badge" data-lesson-id="28_2c_timeslicing_limitations"></span> [28.2c Limitations: no memory isolation, no fault isolation, no QoS guarantees](chapter_28/28.2c_282c_limitations.md)
*   <span class="roadmap-badge" data-lesson-id="28_2d_timeslicing_use_cases"></span> [28.2d When to use: development environments, low-priority inference, cost optimization](chapter_28/28.2d_282d_when_to_use.md)
*   <span class="roadmap-badge" data-lesson-id="28_3a_mps_architecture"></span> [28.3a MPS architecture: a daemon that funnels multiple CUDA contexts through one control thread](chapter_28/28.3a_283a_mps_architecture.md)
*   <span class="roadmap-badge" data-lesson-id="28_3b_mps_benefits"></span> [28.3b Benefits: lower context switch overhead vs time-slicing, true concurrent execution](chapter_28/28.3b_283b_benefits.md)
*   <span class="roadmap-badge" data-lesson-id="28_3c_mps_limitations"></span> [28.3c Limitations: single CUDA execution context = single fault domain](chapter_28/28.3c_283c_limitations.md)
*   <span class="roadmap-badge" data-lesson-id="28_3d_mps_configuration"></span> [28.3d Enabling MPS: nvidia-cuda-mps-control daemon and K8s configuration](chapter_28/28.3d_283d_enabling_mps.md)
*   <span class="roadmap-badge" data-lesson-id="28_4a_mig_architecture"></span> [28.4a MIG architecture: physically partitioning the GPC, HBM, L2 cache, and engines](chapter_28/28.4a_284a_mig_architecture.md)
*   <span class="roadmap-badge" data-lesson-id="28_4b_a100_mig_profiles"></span> [28.4b MIG instance profiles on A100: 1g.5gb, 2g.10gb, 3g.20gb, 4g.20gb, 7g.40gb](chapter_28/28.4b_284b_mig_instance_profiles_on_a100.md)
*   <span class="roadmap-badge" data-lesson-id="28_4c_h100_mig_profiles"></span> [28.4c MIG instance profiles on H100: new profiles with 80 GB HBM3 distribution](chapter_28/28.4c_284c_mig_instance_profiles_on_h100.md)
*   <span class="roadmap-badge" data-lesson-id="28_4d_enabling_mig"></span> [28.4d Enabling MIG: nvidia-smi -i 0 --mig-mode=1 and rebooting](chapter_28/28.4d_284d_enabling_mig.md)
*   <span class="roadmap-badge" data-lesson-id="28_4e_managing_mig_instances"></span> [28.4e Creating, listing, and destroying MIG instances and compute instances](chapter_28/28.4e_284e_creating_listing_and_destroying_mig_instances_and_compute_instances.md)
*   <span class="roadmap-badge" data-lesson-id="28_4f_mig_in_kubernetes"></span> [28.4f MIG in Kubernetes: GPU Operator MIG strategy (single, mixed, all)](chapter_28/28.4f_284f_mig_in_kubernetes.md)
*   <span class="roadmap-badge" data-lesson-id="28_4g_mig_security_isolation"></span> [28.4g Security guarantees: complete memory isolation and fault isolation between MIG slices](chapter_28/28.4g_284g_security_guarantees.md)
*   <span class="roadmap-badge" data-lesson-id="28_4h_multi_tenant_mig_use_case"></span> [28.4h Multi-tenant SaaS use case: giving different customers their own H100 slice](chapter_28/28.4h_284h_multi.md)

### 📁 29 Traditional HPC Schedulers — Slurm and Apptainer
*   <span class="roadmap-badge" data-lesson-id="29_1a_slurm_architecture"></span> [29.1a Slurm architecture: slurmctld (controller), slurmd (node daemon), slurmdb (accounting)](chapter_29/29.1a_291a_slurm_architecture.md)
*   <span class="roadmap-badge" data-lesson-id="29_1b_slurm_job_submission"></span> [29.1b Job submission: sbatch scripts, #SBATCH directives, and job arrays](chapter_29/29.1b_291b_job_submission.md)
*   <span class="roadmap-badge" data-lesson-id="29_1c_slurm_gpu_requests"></span> [29.1c Requesting GPUs in Slurm: --gres=gpu:a100:8 and GRES configuration](chapter_29/29.1c_291c_requesting_gpus_in_slurm.md)
*   <span class="roadmap-badge" data-lesson-id="29_1d_slurm_partitions_qos_fairshare"></span> [29.1d Slurm partitions, QoS, and fair-share scheduling for multi-team GPU access](chapter_29/29.1d_291d_slurm_partitions_qos_and_fair.md)
*   <span class="roadmap-badge" data-lesson-id="29_1e_slurm_monitoring_commands"></span> [29.1e squeue, sinfo, scontrol show job: monitoring and diagnosing job states](chapter_29/29.1e_291e_squeue_sinfo_scontrol_show_job.md)
*   <span class="roadmap-badge" data-lesson-id="29_1f_slurm_vs_kubernetes"></span> [29.1f Slurm vs. Kubernetes: choosing the right scheduler for your AI workload type](chapter_29/29.1f_291f_slurm_vs_kubernetes.md)
*   <span class="roadmap-badge" data-lesson-id="29_2a_why_hpc_avoids_docker"></span> [29.2a Why Docker is not used in HPC: root requirement and security model](chapter_29/29.2a_292a_why_docker_is_not_used_in_hpc.md)
*   <span class="roadmap-badge" data-lesson-id="29_2b_apptainer_security_model"></span> [29.2b Apptainer's security model: user-namespace execution, no root inside container](chapter_29/29.2b_292b_apptainers_security_model.md)
*   <span class="roadmap-badge" data-lesson-id="29_2c_singularity_image_format"></span> [29.2c SIF (Singularity Image Format): single-file immutable container images](chapter_29/29.2c_292c_sif_singularity_image_format.md)
*   <span class="roadmap-badge" data-lesson-id="29_2d_converting_docker_to_apptainer"></span> [29.2d Converting Docker/NGC containers to Apptainer format](chapter_29/29.2d_292d_converting_dockerngc_containers_to_apptainer_format.md)
*   <span class="roadmap-badge" data-lesson-id="29_2e_gpu_workloads_with_apptainer"></span> [29.2e Running GPU workloads with Apptainer: --nv flag for NVIDIA support](chapter_29/29.2e_292e_running_gpu_workloads_with_apptainer.md)