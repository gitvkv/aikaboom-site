# 🗺️ Roadmap: The Virtualization and Cloud — Extending AI Infrastructure Beyond Bare Metal

Below is the syllabus timeline of lessons in this module. Track your study progress here.

## 📈 Progress
<div class="progress-container">
  <div class="progress-bar">0%</div>
</div>
---

### 📁 30 GPU Diagnostics and nvidia-smi Mastery
*   <span class="roadmap-badge" data-lesson-id="30_1a_nvidia_smi_basics"></span> [30.1a nvidia-smi basic output: reading driver version, CUDA version, GPU list](chapter_30/30.1a_301a_nvidia.md)
*   <span class="roadmap-badge" data-lesson-id="30_1b_gpu_power_temperature_utilization"></span> [30.1b Power draw, temperature, fan speed, and utilization columns](chapter_30/30.1b_301b_power_draw_temperature_fan_speed_and_utilization_columns.md)
*   <span class="roadmap-badge" data-lesson-id="30_1c_gpu_memory_monitoring"></span> [30.1c Memory used vs. total: identifying memory leaks and stuck processes](chapter_30/30.1c_301c_memory_used_vs_total.md)
*   <span class="roadmap-badge" data-lesson-id="30_1d_nvidia_smi_query_mode"></span> [30.1d nvidia-smi -q: exhaustive GPU information dump](chapter_30/30.1d_301d_nvidia.md)
*   <span class="roadmap-badge" data-lesson-id="30_1e_gpu_topology_matrix"></span> [30.1e nvidia-smi topo -m: printing the GPU interconnect topology matrix](chapter_30/30.1e_301e_nvidia.md)
*   <span class="roadmap-badge" data-lesson-id="30_1f_nvidia_smi_dmon"></span> [30.1f nvidia-smi dmon: continuous device monitoring with configurable metrics](chapter_30/30.1f_301f_nvidia.md)
*   <span class="roadmap-badge" data-lesson-id="30_1g_nvidia_smi_pmon"></span> [30.1g nvidia-smi pmon: per-process monitoring — identifying which PID uses GPU](chapter_30/30.1g_301g_nvidia.md)
*   <span class="roadmap-badge" data-lesson-id="30_1h_gpu_control_operations"></span> [30.1h Controlling GPUs: set-power-limit, set-compute-mode, persistence-mode](chapter_30/30.1h_301h_controlling_gpus.md)
*   <span class="roadmap-badge" data-lesson-id="30_2a_nvidia_xid_errors"></span> [30.2a Xid errors: NVIDIA's GPU error taxonomy — the complete Xid reference](chapter_30/30.2a_302a_xid_errors.md)
*   <span class="roadmap-badge" data-lesson-id="30_2b_critical_xid_errors"></span> [30.2b Critical Xids: 63 (Row Remapping), 74 (NVLink Error), 79 (GPU Fallen Off Bus), 94 (DBE)](chapter_30/30.2b_302b_critical_xids.md)
*   <span class="roadmap-badge" data-lesson-id="30_2c_ecc_error_types"></span> [30.2c ECC error types: Single-bit correctable (SBE) vs. Double-bit uncorrectable (DBE)](chapter_30/30.2c_302c_ecc_error_types.md)
*   <span class="roadmap-badge" data-lesson-id="30_2d_querying_ecc_counters"></span> [30.2d nvidia-smi --query-gpu=ecc.errors.uncorrected.volatile.total: querying ECC counters](chapter_30/30.2d_302d_nvidia.md)
*   <span class="roadmap-badge" data-lesson-id="30_2e_row_remapping"></span> [30.2e Row Remapping: VRAM repair mechanism and pending remapping reboots](chapter_30/30.2e_302e_row_remapping.md)
*   <span class="roadmap-badge" data-lesson-id="30_2f_pcie_advanced_error_reporting"></span> [30.2f PCIe AER (Advanced Error Reporting): kernel-level PCIe error decoding](chapter_30/30.2f_302f_pcie_aer_advanced_error_reporting.md)
*   <span class="roadmap-badge" data-lesson-id="30_2g_thermal_throttling"></span> [30.2g Thermal throttling events: reading p-state and clock throttle reasons](chapter_30/30.2g_302g_thermal_throttling_events.md)
*   <span class="roadmap-badge" data-lesson-id="30_2h_power_capping"></span> [30.2h Power capping: when TDP limits cause performance reduction](chapter_30/30.2h_302h_power_capping.md)
*   <span class="roadmap-badge" data-lesson-id="30_2i_dcgm_health_checks"></span> [30.2i NVIDIA DCGM health checks: automating hardware validation before training runs](chapter_30/30.2i_302i_nvidia_dcgm_health_checks.md)
*   <span class="roadmap-badge" data-lesson-id="30_3a_cuda_bandwidth_test"></span> [30.3a cuda-bandwidthtest: validating memory bandwidth — H2D, D2H, D2D](chapter_30/30.3a_303a_cuda.md)
*   <span class="roadmap-badge" data-lesson-id="30_3b_dcgm_diagnostics"></span> [30.3b dcgmDiag: NVIDIA's hardware diagnostic tool for pre-flight cluster checks](chapter_30/30.3b_303b_dcgmdiag.md)
*   <span class="roadmap-badge" data-lesson-id="30_3c_gpu_burn_stress_testing"></span> [30.3c gpu-burn: stress testing GPU compute and memory to identify hardware defects](chapter_30/30.3c_303c_gpu.md)
*   <span class="roadmap-badge" data-lesson-id="30_3d_nccl_tests"></span> [30.3d nccl-tests: validating collective communication performance across all GPUs](chapter_30/30.3d_303d_nccl.md)
*   <span class="roadmap-badge" data-lesson-id="30_3e_infiniband_diagnostics"></span> [30.3e ibdiagnet and perfquery: InfiniBand fabric diagnostics and performance counters](chapter_30/30.3e_303e_ibdiagnet_and_perfquery.md)

### 📁 31 Cluster-Wide Telemetry — DCGM, Prometheus, and Grafana
*   <span class="roadmap-badge" data-lesson-id="31_1a_dcgm_vs_nvidia_smi"></span> [31.1a DCGM vs. nvidia-smi: cluster-scale vs single-GPU monitoring](chapter_31/31.1a_311a_dcgm_vs_nvidia.md)
*   <span class="roadmap-badge" data-lesson-id="31_1b_dcgm_architecture"></span> [31.1b DCGM architecture: nv-hostengine, libdcgm, and the DCGM API](chapter_31/31.1b_311b_dcgm_architecture.md)
*   <span class="roadmap-badge" data-lesson-id="31_1c_dcgm_field_ids"></span> [31.1c DCGM field IDs: the complete list of GPU metrics available for scraping](chapter_31/31.1c_311c_dcgm_field_ids.md)
*   <span class="roadmap-badge" data-lesson-id="31_1d_dcgmi_cli"></span> [31.1d dcgmi: the DCGM CLI for interactive diagnostics and field watching](chapter_31/31.1d_311d_dcgmi.md)
*   <span class="roadmap-badge" data-lesson-id="31_1e_dcgm_health_watches"></span> [31.1e DCGM health watches: proactive monitoring for ECC, PCIe, NVLink, and power](chapter_31/31.1e_311e_dcgm_health_watches.md)
*   <span class="roadmap-badge" data-lesson-id="31_1f_dcgm_groups_and_job_stats"></span> [31.1f DCGM groups and job stats: tracking GPU usage per Slurm or Kubernetes job](chapter_31/31.1f_311f_dcgm_groups_and_job_stats.md)
*   <span class="roadmap-badge" data-lesson-id="31_2a_dcgm_exporter_architecture"></span> [31.2a dcgm-exporter architecture: a Kubernetes DaemonSet exposing /metrics endpoint](chapter_31/31.2a_312a_dcgm.md)
*   <span class="roadmap-badge" data-lesson-id="31_2b_dcgm_exporter_configuration"></span> [31.2b Customizing collected metrics: the dcgm-exporter configmap](chapter_31/31.2b_312b_customizing_collected_metrics.md)
*   <span class="roadmap-badge" data-lesson-id="31_2c_dcgm_exporter_with_gpu_operator"></span> [31.2c GPU Operator deployment: dcgm-exporter is automatically deployed and configured](chapter_31/31.2c_312c_gpu_operator_deployment.md)
*   <span class="roadmap-badge" data-lesson-id="31_3a_prometheus_data_model"></span> [31.3a Prometheus data model: time-series metrics with labels](chapter_31/31.3a_313a_prometheus_data_model.md)
*   <span class="roadmap-badge" data-lesson-id="31_3b_prometheus_scrape_configuration"></span> [31.3b Prometheus scrape configuration: targeting dcgm-exporter and node-exporter](chapter_31/31.3b_313b_prometheus_scrape_configuration.md)
*   <span class="roadmap-badge" data-lesson-id="31_3c_promql_basics"></span> [31.3c PromQL basics: querying GPU temperature, utilization, and memory across nodes](chapter_31/31.3c_313c_promql_basics.md)
*   <span class="roadmap-badge" data-lesson-id="31_3d_prometheus_alerting"></span> [31.3d Alerting rules: Prometheus alertmanager for GPU fault notifications](chapter_31/31.3d_313d_alerting_rules.md)
*   <span class="roadmap-badge" data-lesson-id="31_4a_grafana_prometheus_integration"></span> [31.4a Connecting Grafana to Prometheus as a data source](chapter_31/31.4a_314a_connecting_grafana_to_prometheus_as_a_data_source.md)
*   <span class="roadmap-badge" data-lesson-id="31_4b_nvidia_dcgm_dashboard"></span> [31.4b NVIDIA DCGM Grafana dashboard: importing the official GPU cluster dashboard](chapter_31/31.4b_314b_nvidia_dcgm_grafana_dashboard.md)
*   <span class="roadmap-badge" data-lesson-id="31_4c_custom_grafana_panels"></span> [31.4c Building custom panels: GPU utilization heatmaps, memory trend charts](chapter_31/31.4c_314c_building_custom_panels.md)
*   <span class="roadmap-badge" data-lesson-id="31_4d_grafana_alerting"></span> [31.4d Alerting in Grafana: PagerDuty, Slack, and email integration for GPU faults](chapter_31/31.4d_314d_alerting_in_grafana.md)
*   <span class="roadmap-badge" data-lesson-id="31_4e_gpu_observability_stack"></span> [31.4e The complete observability stack: node_exporter + dcgm-exporter + Prometheus + Grafana](chapter_31/31.4e_314e_the_complete_observability_stack.md)

### 📁 32 Enterprise Cluster Management — NVIDIA Base Command Manager
*   <span class="roadmap-badge" data-lesson-id="32_1a_manual_provisioning_challenges"></span> [32.1a Manual provisioning pain: installing Ubuntu on 1000 nodes one by one](chapter_32/32.1a_321a_manual_provisioning_pain.md)
*   <span class="roadmap-badge" data-lesson-id="32_1b_pxe_boot_installation"></span> [32.1b PXE boot and network installation: the baseline automated approach](chapter_32/32.1b_321b_pxe_boot_and_network_installation.md)
*   <span class="roadmap-badge" data-lesson-id="32_1c_configuration_drift"></span> [32.1c Configuration drift: why manually managed clusters diverge from their intended state](chapter_32/32.1c_321c_configuration_drift.md)
*   <span class="roadmap-badge" data-lesson-id="32_2a_bcm_overview"></span> [32.2a BCM overview: the enterprise cluster management platform for DGX SuperPOD](chapter_32/32.2a_322a_bcm_overview.md)
*   <span class="roadmap-badge" data-lesson-id="32_2b_bcm_head_node_architecture"></span> [32.2b BCM head node architecture: redundant management servers](chapter_32/32.2b_322b_bcm_head_node_architecture.md)
*   <span class="roadmap-badge" data-lesson-id="32_2c_bcm_image_management"></span> [32.2c Software image management: golden images, image profiles, and OS provisioning](chapter_32/32.2c_322c_software_image_management.md)
*   <span class="roadmap-badge" data-lesson-id="32_2d_bcm_network_provisioning"></span> [32.2d Network provisioning: automated switch configuration and fabric setup via BCM](chapter_32/32.2d_322d_network_provisioning.md)
*   <span class="roadmap-badge" data-lesson-id="32_2e_bcm_gpu_stack_deployment"></span> [32.2e GPU stack deployment: driver, CUDA, container toolkit pushed cluster-wide](chapter_32/32.2e_322e_gpu_stack_deployment.md)
*   <span class="roadmap-badge" data-lesson-id="32_3a_bcm_user_project_management"></span> [32.3a BCM user and project management: creating accounts, setting GPU quotas](chapter_32/32.3a_323a_bcm_user_and_project_management.md)
*   <span class="roadmap-badge" data-lesson-id="32_3b_bcm_slurm_management"></span> [32.3b Integrated Slurm management: job submission, monitoring, and accounting through BCM](chapter_32/32.3b_323b_integrated_slurm_management.md)
*   <span class="roadmap-badge" data-lesson-id="32_3c_bcm_kubernetes_integration"></span> [32.3c Kubernetes integration: BCM as the provisioning layer beneath a K8s cluster](chapter_32/32.3c_323c_kubernetes_integration.md)
*   <span class="roadmap-badge" data-lesson-id="32_3d_bcm_health_dashboards"></span> [32.3d Health dashboards: cluster-wide node status, GPU availability, and job history](chapter_32/32.3d_323d_health_dashboards.md)
*   <span class="roadmap-badge" data-lesson-id="32_4a_ansible_for_gpu_clusters"></span> [32.4a Ansible for GPU cluster configuration: playbooks, roles, and inventory management](chapter_32/32.4a_324a_ansible_for_gpu_cluster_configuration.md)
*   <span class="roadmap-badge" data-lesson-id="32_4b_terraform_for_ai_infrastructure"></span> [32.4b Terraform for cloud-based AI infrastructure: provider configurations for AWS, Azure, GCP](chapter_32/32.4b_324b_terraform_for_cloud.md)
*   <span class="roadmap-badge" data-lesson-id="32_4c_gitops_for_cluster_management"></span> [32.4c GitOps: managing cluster configuration as version-controlled YAML in Git repositories](chapter_32/32.4c_324c_gitops.md)

### 📁 33 GPU Virtualization — vGPU and AI in Virtual Machines
*   <span class="roadmap-badge" data-lesson-id="33_1a_type1_hypervisors"></span> [33.1a Type 1 (bare-metal) hypervisors: VMware vSphere ESXi, Microsoft Hyper-V, KVM](chapter_33/33.1a_331a_type_1_bare.md)
*   <span class="roadmap-badge" data-lesson-id="33_1b_type2_hypervisors"></span> [33.1b Type 2 hypervisors: VirtualBox, VMware Workstation — for development only](chapter_33/33.1b_331b_type_2_hypervisors.md)
*   <span class="roadmap-badge" data-lesson-id="33_1c_gpu_passthrough"></span> [33.1c GPU passthrough (PCIe passthrough): dedicating one GPU to one VM](chapter_33/33.1c_331c_gpu_passthrough_pcie_passthrough.md)
*   <span class="roadmap-badge" data-lesson-id="33_2a_vgpu_architecture"></span> [33.2a vGPU architecture: host driver intercepts GPU commands from guest VMs](chapter_33/33.2a_332a_vgpu_architecture.md)
*   <span class="roadmap-badge" data-lesson-id="33_2b_vgpu_profiles"></span> [33.2b vGPU profiles: Q-series (Quadro/Workstation), C-series (Compute/AI), A-series (apps)](chapter_33/33.2b_332b_vgpu_profiles.md)
*   <span class="roadmap-badge" data-lesson-id="33_2c_virtual_compute_server"></span> [33.2c NVIDIA Virtual Compute Server (vCS): vGPU profiles for AI training and inference VMs](chapter_33/33.2c_332c_nvidia_virtual_compute_server_vcs.md)
*   <span class="roadmap-badge" data-lesson-id="33_2d_vgpu_manager_installation"></span> [33.2d vGPU Manager installation on ESXi and KVM hosts](chapter_33/33.2d_332d_vgpu_manager_installation_on_esxi_and_kvm_hosts.md)
*   <span class="roadmap-badge" data-lesson-id="33_2e_nvidia_license_system"></span> [33.2e vGPU licensing server: NVIDIA License System (NLS) and license management](chapter_33/33.2e_332e_vgpu_licensing_server.md)
*   <span class="roadmap-badge" data-lesson-id="33_3a_mig_backed_vgpu"></span> [33.3a MIG-backed vGPU: using MIG instances as the underlying resource for vGPU](chapter_33/33.3a_333a_mig.md)
*   <span class="roadmap-badge" data-lesson-id="33_3b_vgpu_hardware_isolation"></span> [33.3b Strong isolation: complete hardware partitioning for multi-tenant cloud environments](chapter_33/33.3b_333b_strong_isolation.md)

### 📁 34 Cloud AI Infrastructure — AWS, Azure, GCP, and Oracle
*   <span class="roadmap-badge" data-lesson-id="34_1a_aws_gpu_instances"></span> [34.1a AWS EC2: P4d (A100), P5 (H100), P5e (H200) instance families](chapter_34/34.1a_341a_aws_ec2.md)
*   <span class="roadmap-badge" data-lesson-id="34_1b_azure_gpu_instances"></span> [34.1b Azure: NDv5 (H100), NDmv4 (A100) VM series](chapter_34/34.1b_341b_azure.md)
*   <span class="roadmap-badge" data-lesson-id="34_1c_google_cloud_gpu_instances"></span> [34.1c Google Cloud: A3 (H100), A2 (A100) machine types](chapter_34/34.1c_341c_google_cloud.md)
*   <span class="roadmap-badge" data-lesson-id="34_1d_oci_gpu_instances"></span> [34.1d Oracle Cloud Infrastructure (OCI): BM.GPU.H100.8 bare metal instances](chapter_34/34.1d_341d_oracle_cloud_infrastructure_oci.md)
*   <span class="roadmap-badge" data-lesson-id="34_1e_cloud_pricing_strategies"></span> [34.1e On-demand vs. reserved vs. spot/preemptible pricing strategies for AI workloads](chapter_34/34.1e_341e_on.md)
*   <span class="roadmap-badge" data-lesson-id="34_2a_aws_efa_networking"></span> [34.2a Elastic Fabric Adapter (EFA) on AWS: low-latency networking for P5 clusters](chapter_34/34.2a_342a_elastic_fabric_adapter_efa_on_aws.md)
*   <span class="roadmap-badge" data-lesson-id="34_2b_cloud_placement_groups"></span> [34.2b Placement groups: packing instances in the same physical rack for minimum latency](chapter_34/34.2b_342b_placement_groups.md)
*   <span class="roadmap-badge" data-lesson-id="34_2c_vpc_design_for_ai_clusters"></span> [34.2c VPC design for AI clusters: subnets, security groups, and VPC endpoints](chapter_34/34.2c_342c_vpc_design_for_ai_clusters.md)
*   <span class="roadmap-badge" data-lesson-id="34_3a_amazon_sagemaker"></span> [34.3a Amazon SageMaker: managed training jobs and endpoint deployment](chapter_34/34.3a_343a_amazon_sagemaker.md)
*   <span class="roadmap-badge" data-lesson-id="34_3b_azure_machine_learning"></span> [34.3b Azure Machine Learning: workspaces, compute clusters, and MLflow integration](chapter_34/34.3b_343b_azure_machine_learning.md)
*   <span class="roadmap-badge" data-lesson-id="34_3c_google_vertex_ai"></span> [34.3c Google Vertex AI: training pipelines and model registry](chapter_34/34.3c_343c_google_vertex_ai.md)
*   <span class="roadmap-badge" data-lesson-id="34_3d_dgx_cloud"></span> [34.3d NVIDIA DGX Cloud: NVIDIA-managed AI supercomputing as a subscription service](chapter_34/34.3d_343d_nvidia_dgx_cloud.md)