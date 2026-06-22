# 🗺️ Roadmap: The AI Data Center Networking — Moving Petabytes Without Latency

Below is the syllabus timeline of lessons in this module. Track your study progress here.

## 📈 Progress
<div class="progress-container">
  <div class="progress-bar">0%</div>
</div>
---

### 📁 14 Enterprise Networking Baseline
*   <span class="roadmap-badge" data-lesson-id="14_1a_osi_layer1_physical"></span> [14.1a Layer 1 (Physical): cables, signals, optical fiber, and transceivers](chapter_14/14.1a_141a_layer_1_physical.md)
*   <span class="roadmap-badge" data-lesson-id="14_1b_osi_layer2_data_link"></span> [14.1b Layer 2 (Data Link): Ethernet frames, MAC addresses, and switches](chapter_14/14.1b_141b_layer_2_data_link.md)
*   <span class="roadmap-badge" data-lesson-id="14_1c_osi_layer3_network"></span> [14.1c Layer 3 (Network): IP addresses, routing, and routers](chapter_14/14.1c_141c_layer_3_network.md)
*   <span class="roadmap-badge" data-lesson-id="14_1d_osi_layer4_transport"></span> [14.1d Layer 4 (Transport): TCP (reliable) vs. UDP (fast) — and why AI uses RDMA instead](chapter_14/14.1d_141d_layer_4_transport.md)
*   <span class="roadmap-badge" data-lesson-id="14_1e_osi_layers5_to7"></span> [14.1e Layers 5–7 (Session/Presentation/Application): HTTP, TLS, application protocols](chapter_14/14.1e_141e_layers_5.md)
*   <span class="roadmap-badge" data-lesson-id="14_2a_switch_forwarding_basics"></span> [14.2a How a network switch works: MAC address tables and frame forwarding](chapter_14/14.2a_142a_how_a_network_switch_works.md)
*   <span class="roadmap-badge" data-lesson-id="14_2b_vlans"></span> [14.2b VLANs (Virtual LANs): segmenting one physical network into isolated logical networks](chapter_14/14.2b_142b_vlans_virtual_lans.md)
*   <span class="roadmap-badge" data-lesson-id="14_2c_ip_addressing_and_cidr"></span> [14.2c IP addressing: Class A/B/C, CIDR notation, and subnetting for AI clusters](chapter_14/14.2c_142c_ip_addressing.md)
*   <span class="roadmap-badge" data-lesson-id="14_2d_arp_protocol"></span> [14.2d ARP (Address Resolution Protocol): resolving IP addresses to MAC addresses](chapter_14/14.2d_142d_arp_address_resolution_protocol.md)
*   <span class="roadmap-badge" data-lesson-id="14_2e_routing_protocols_overview"></span> [14.2e Routing protocols overview: static routes, BGP for large AI cloud fabrics](chapter_14/14.2e_142e_routing_protocols_overview.md)

### 📁 15 The AI Traffic Problem — Why Standard Networks Fail AI Clusters
*   <span class="roadmap-badge" data-lesson-id="15_1a_north_south_traffic"></span> [15.1a North-South traffic: client requests to inference servers — latency-sensitive](chapter_15/15.1a_151a_north.md)
*   <span class="roadmap-badge" data-lesson-id="15_1b_east_west_traffic"></span> [15.1b East-West traffic: GPU-to-GPU gradient synchronization — bandwidth-sensitive](chapter_15/15.1b_151b_east.md)
*   <span class="roadmap-badge" data-lesson-id="15_1c_all_to_all_communication"></span> [15.1c All-to-All communication: the AllReduce collective and its network demands](chapter_15/15.1c_151c_all.md)
*   <span class="roadmap-badge" data-lesson-id="15_1d_incast_and_fan_in_congestion"></span> [15.1d Incast and fan-in congestion: when 1000 GPUs send to one switch simultaneously](chapter_15/15.1d_151d_incast_and_fan.md)
*   <span class="roadmap-badge" data-lesson-id="15_2a_three_tier_architecture"></span> [15.2a Three-tier (Access-Aggregation-Core): the traditional enterprise design and why it fails AI](chapter_15/15.2a_152a_three.md)
*   <span class="roadmap-badge" data-lesson-id="15_2b_spine_leaf_topology"></span> [15.2b Spine-Leaf (Clos) topology: equal-cost paths and predictable low latency](chapter_15/15.2b_152b_spine.md)
*   <span class="roadmap-badge" data-lesson-id="15_2c_fat_tree_topology"></span> [15.2c Fat-Tree topology: non-blocking bandwidth in high-performance clusters](chapter_15/15.2c_152c_fat.md)
*   <span class="roadmap-badge" data-lesson-id="15_2d_rail_topology"></span> [15.2d Rail topology: dedicated switch rails per GPU across all nodes](chapter_15/15.2d_152d_rail_topology.md)
*   <span class="roadmap-badge" data-lesson-id="15_2e_oversubscription_ratios"></span> [15.2e Oversubscription ratios: 1:1 (non-blocking) vs 3:1 and when each is acceptable](chapter_15/15.2e_152e_oversubscription_ratios.md)

### 📁 16 High-Speed Ethernet for AI — Spectrum-X, RoCEv2, and Lossless Fabrics
*   <span class="roadmap-badge" data-lesson-id="16_1a_ethernet_speed_generations"></span> [16.1a 10/25/40/100/200/400/800 GbE: generational progression and use cases per tier](chapter_16/16.1a_161a_102540100200400800_gbe.md)
*   <span class="roadmap-badge" data-lesson-id="16_1b_optical_transceivers"></span> [16.1b Optical transceivers: SFP28, QSFP28, QSFP-DD, OSFP — form factors and speeds](chapter_16/16.1b_161b_optical_transceivers.md)
*   <span class="roadmap-badge" data-lesson-id="16_1c_dac_vs_aoc_vs_optics"></span> [16.1c Direct Attach Copper (DAC) vs. Active Optical Cable (AOC) vs. pluggable optics](chapter_16/16.1c_161c_direct_attach_copper_dac_vs_active_optical_cable_aoc_vs_pluggable_optics.md)
*   <span class="roadmap-badge" data-lesson-id="16_2a_rdma_basics"></span> [16.2a What RDMA is: zero-copy, kernel-bypass data transfer directly between memory regions](chapter_16/16.2a_162a_what_rdma_is.md)
*   <span class="roadmap-badge" data-lesson-id="16_2b_rocev1_vs_rocev2"></span> [16.2b RoCEv1 vs. RoCEv2: routable UDP vs. Layer 2 only](chapter_16/16.2b_162b_rocev1_vs_rocev2.md)
*   <span class="roadmap-badge" data-lesson-id="16_2c_rdma_verbs"></span> [16.2c RDMA Verbs: the programming interface for Send, Receive, Write, and Read operations](chapter_16/16.2c_162c_rdma_verbs.md)
*   <span class="roadmap-badge" data-lesson-id="16_2d_rdma_queue_pairs"></span> [16.2d Queue Pairs (QPs): the communication endpoints in RDMA](chapter_16/16.2d_162d_queue_pairs_qps.md)
*   <span class="roadmap-badge" data-lesson-id="16_3a_rdma_packet_loss_challenges"></span> [16.3a Why Ethernet drops packets and why RDMA cannot tolerate packet loss](chapter_16/16.3a_163a_why_ethernet_drops_packets_and_why_rdma_cannot_tolerate_packet_loss.md)
*   <span class="roadmap-badge" data-lesson-id="16_3b_priority_flow_control"></span> [16.3b Priority Flow Control (PFC): per-priority pause frames to stop congestion](chapter_16/16.3b_163b_priority_flow_control_pfc.md)
*   <span class="roadmap-badge" data-lesson-id="16_3c_explicit_congestion_notification"></span> [16.3c Explicit Congestion Notification (ECN): end-to-end congestion signaling](chapter_16/16.3c_163c_explicit_congestion_notification_ecn.md)
*   <span class="roadmap-badge" data-lesson-id="16_3d_dcqcn_congestion_control"></span> [16.3d DCQCN (Data Center Quantized Congestion Notification): the RDMA congestion algorithm](chapter_16/16.3d_163d_dcqcn_data_center_quantized_congestion_notification.md)
*   <span class="roadmap-badge" data-lesson-id="16_3e_pfc_deadlock_mitigation"></span> [16.3e PFC deadlock risks and mitigation strategies](chapter_16/16.3e_163e_pfc_deadlock_risks_and_mitigation_strategies.md)
*   <span class="roadmap-badge" data-lesson-id="16_4a_spectrum_x_architecture"></span> [16.4a Spectrum-X architecture: Spectrum-4 switch ASIC + BlueField-3 DPU](chapter_16/16.4a_164a_spectrum.md)
*   <span class="roadmap-badge" data-lesson-id="16_4b_adaptive_routing"></span> [16.4b Adaptive Routing: dynamically selecting the least-congested path per packet](chapter_16/16.4b_164b_adaptive_routing.md)
*   <span class="roadmap-badge" data-lesson-id="16_4c_bluefield_roce_acceleration"></span> [16.4c RoCE Acceleration in BlueField: hardware offload of transport processing](chapter_16/16.4c_164c_roce_acceleration_in_bluefield.md)
*   <span class="roadmap-badge" data-lesson-id="16_4d_end_to_end_congestion_control"></span> [16.4d End-to-End congestion control (E2E CC) for AI workloads](chapter_16/16.4d_164d_end.md)

### 📁 17 InfiniBand Architecture — The Gold Standard for AI Cluster Networking
*   <span class="roadmap-badge" data-lesson-id="17_1a_infiniband_vs_ethernet"></span> [17.1a InfiniBand vs Ethernet: channel-based vs packet-switched, lossless by design](chapter_17/17.1a_171a_infiniband_vs_ethernet.md)
*   <span class="roadmap-badge" data-lesson-id="17_1b_infiniband_speed_generations"></span> [17.1b InfiniBand speeds: SDR, DDR, QDR, FDR, EDR, HDR (200 Gb/s), NDR (400 Gb/s), XDR preview](chapter_17/17.1b_171b_infiniband_speeds.md)
*   <span class="roadmap-badge" data-lesson-id="17_1c_infiniband_packet_structure"></span> [17.1c InfiniBand packet structure: Local Routing Header (LRH) and Global Routing Header (GRH)](chapter_17/17.1c_171c_infiniband_packet_structure.md)
*   <span class="roadmap-badge" data-lesson-id="17_1d_virtual_lanes"></span> [17.1d Virtual Lanes (VLs): providing QoS and deadlock avoidance in InfiniBand](chapter_17/17.1d_171d_virtual_lanes_vls.md)
*   <span class="roadmap-badge" data-lesson-id="17_2a_host_channel_adapters"></span> [17.2a HCAs (Host Channel Adapters): InfiniBand NICs — ConnectX-6, ConnectX-7 series](chapter_17/17.2a_172a_hcas_host_channel_adapters.md)
*   <span class="roadmap-badge" data-lesson-id="17_2b_infiniband_switches"></span> [17.2b InfiniBand switches: Quantum (HDR) and Quantum-2 (NDR) switch chips](chapter_17/17.2b_172b_infiniband_switches.md)
*   <span class="roadmap-badge" data-lesson-id="17_2c_multi_tier_ib_fabrics"></span> [17.2c Multi-tier IB fabrics: edge switches, leaf switches, spine switches](chapter_17/17.2c_172c_multi.md)
*   <span class="roadmap-badge" data-lesson-id="17_2d_infiniband_optical_cabling"></span> [17.2d Optical cabling and MTP/MPO connectors for 400 Gb/s IB links](chapter_17/17.2d_172d_optical_cabling_and_mtpmpo_connectors_for_400_gbs_ib_links.md)
*   <span class="roadmap-badge" data-lesson-id="17_3a_subnet_manager"></span> [17.3a Subnet Manager (SM): topology discovery, LID assignment, and routing table computation](chapter_17/17.3a_173a_subnet_manager_sm.md)
*   <span class="roadmap-badge" data-lesson-id="17_3b_opensm"></span> [17.3b OpenSM: the open-source subnet manager for InfiniBand](chapter_17/17.3b_173b_opensm.md)
*   <span class="roadmap-badge" data-lesson-id="17_3c_sm_high_availability"></span> [17.3c SM high availability: master and standby redundancy](chapter_17/17.3c_173c_sm_high_availability.md)
*   <span class="roadmap-badge" data-lesson-id="17_3d_ib_fabric_verification"></span> [17.3d ibstat, ibstatus, iblinkinfo: verifying IB link state and fabric topology](chapter_17/17.3d_173d_ibstat_ibstatus_iblinkinfo.md)
*   <span class="roadmap-badge" data-lesson-id="17_4a_ib_rdma_vs_rocev2"></span> [17.4a IB RDMA vs. RoCEv2: native vs. encapsulated RDMA](chapter_17/17.4a_174a_ib_rdma_vs_rocev2.md)
*   <span class="roadmap-badge" data-lesson-id="17_4b_nccl_library"></span> [17.4b NCCL (NVIDIA Collective Communications Library): the RDMA library for GPU-to-GPU](chapter_17/17.4b_174b_nccl_nvidia_collective_communications_library.md)
*   <span class="roadmap-badge" data-lesson-id="17_4c_mpi_over_infiniband"></span> [17.4c MPI (Message Passing Interface) over InfiniBand: HPC heritage in AI clusters](chapter_17/17.4c_174c_mpi_message_passing_interface_over_infiniband.md)
*   <span class="roadmap-badge" data-lesson-id="17_4d_gpudirect_rdma"></span> [17.4d GPUDirect RDMA: transferring data directly between GPU VRAM and network HCA](chapter_17/17.4d_174d_gpudirect_rdma.md)

### 📁 18 NVIDIA Data Processing Units (DPUs) — Offloading Infrastructure
*   <span class="roadmap-badge" data-lesson-id="18_1a_infrastructure_cpu_overhead"></span> [18.1a How virtualization, security scanning, and storage protocols consume CPU cycles](chapter_18/18.1a_181a_how_virtualization_security_scanning_and_storage_protocols_consume_cpu_cycles.md)
*   <span class="roadmap-badge" data-lesson-id="18_1b_quantifying_lost_compute"></span> [18.1b Quantifying lost compute: 30%+ of host CPU consumed by infrastructure overhead](chapter_18/18.1b_181b_quantifying_lost_compute.md)
*   <span class="roadmap-badge" data-lesson-id="18_1c_infrastructure_disaggregation"></span> [18.1c Disaggregation: separating infrastructure functions from the application CPU](chapter_18/18.1c_181c_disaggregation.md)
*   <span class="roadmap-badge" data-lesson-id="18_2a_bluefield2_dpu"></span> [18.2a BlueField-2: ConnectX-6 NIC + ARM cores + on-chip memory](chapter_18/18.2a_182a_bluefield.md)
*   <span class="roadmap-badge" data-lesson-id="18_2b_bluefield3_dpu"></span> [18.2b BlueField-3: ConnectX-7 NIC + 16 Arm A78 cores + 32 GB LPDDR5 — a full server on a card](chapter_18/18.2b_182b_bluefield.md)
*   <span class="roadmap-badge" data-lesson-id="18_2c_dpu_operating_modes"></span> [18.2c P-mode vs DPU-mode: the DPU as a PCIe endpoint vs. autonomous server](chapter_18/18.2c_182c_p.md)
*   <span class="roadmap-badge" data-lesson-id="18_2d_ovs_hardware_offload"></span> [18.2d OVS (Open vSwitch) hardware offload: accelerating VM networking](chapter_18/18.2d_182d_ovs_open_vswitch_hardware_offload.md)
*   <span class="roadmap-badge" data-lesson-id="18_3a_doca_sdk"></span> [18.3a DOCA SDK: applications, libraries, and services for DPU programming](chapter_18/18.3a_183a_doca_sdk.md)
*   <span class="roadmap-badge" data-lesson-id="18_3b_doca_frameworks"></span> [18.3b DOCA Firewall, DOCA DMA, DOCA RDMA: built-in application frameworks](chapter_18/18.3b_183b_doca_firewall_doca_dma_doca_rdma.md)
*   <span class="roadmap-badge" data-lesson-id="18_3c_nvme_of_on_dpu"></span> [18.3c Deploying storage initiators (NVMe-oF) on the DPU: freeing the host CPU entirely](chapter_18/18.3c_183c_deploying_storage_initiators_nvme.md)
*   <span class="roadmap-badge" data-lesson-id="18_3d_zero_trust_dpu_security"></span> [18.3d Zero-Trust security enforcement at the DPU: traffic isolation between tenants](chapter_18/18.3d_183d_zero.md)

### 📁 19 Enterprise Storage Architectures for AI
*   <span class="roadmap-badge" data-lesson-id="19_1a_sequential_throughput"></span> [19.1a Sequential throughput (MB/s): training dataset streaming — dominated by large reads](chapter_19/19.1a_191a_sequential_throughput_mbs.md)
*   <span class="roadmap-badge" data-lesson-id="19_1b_random_iops"></span> [19.1b Random IOPS (I/O per second): checkpoint and metadata access patterns](chapter_19/19.1b_191b_random_iops_io_per_second.md)
*   <span class="roadmap-badge" data-lesson-id="19_1c_storage_latency"></span> [19.1c Latency (microseconds to milliseconds): read latency for inference serving](chapter_19/19.1c_191c_latency_microseconds_to_milliseconds.md)
*   <span class="roadmap-badge" data-lesson-id="19_1d_queue_depth"></span> [19.1d Queue depth: how many concurrent I/O requests NVMe can process (64K QD)](chapter_19/19.1d_191d_queue_depth.md)
*   <span class="roadmap-badge" data-lesson-id="19_2a_direct_attached_storage"></span> [19.2a DAS (Direct Attached Storage): NVMe U.2/E3 drives in the server — maximum speed](chapter_19/19.2a_192a_das_direct_attached_storage.md)
*   <span class="roadmap-badge" data-lesson-id="19_2b_network_attached_storage"></span> [19.2b NAS (Network Attached Storage): NFS shares for datasets — convenient but limited](chapter_19/19.2b_192b_nas_network_attached_storage.md)
*   <span class="roadmap-badge" data-lesson-id="19_2c_storage_area_network"></span> [19.2c SAN (Storage Area Network): block-level access over Fibre Channel or iSCSI](chapter_19/19.2c_192c_san_storage_area_network.md)
*   <span class="roadmap-badge" data-lesson-id="19_2d_all_flash_arrays"></span> [19.2d All-Flash Arrays (AFA): enterprise flash storage platforms and their AI use cases](chapter_19/19.2d_192d_all.md)
*   <span class="roadmap-badge" data-lesson-id="19_3a_nvme_over_fabrics"></span> [19.3a NVMe-oF concepts: extending the NVMe protocol over a network fabric](chapter_19/19.3a_193a_nvme.md)
*   <span class="roadmap-badge" data-lesson-id="19_3b_nvme_rdma"></span> [19.3b NVMe/RDMA: NVMe over InfiniBand or RoCEv2 — sub-10μs latency](chapter_19/19.3b_193b_nvmerdma.md)
*   <span class="roadmap-badge" data-lesson-id="19_3c_nvme_tcp"></span> [19.3c NVMe/TCP: NVMe over standard TCP/IP — simpler deployment, higher latency](chapter_19/19.3c_193c_nvmetcp.md)
*   <span class="roadmap-badge" data-lesson-id="19_3d_nvme_fc"></span> [19.3d NVMe/FC: NVMe over Fibre Channel for traditional SAN environments](chapter_19/19.3d_193d_nvmefc.md)
*   <span class="roadmap-badge" data-lesson-id="19_3e_nvme_of_architecture"></span> [19.3e Namespaces, controllers, and queue pairs in NVMe-oF architecture](chapter_19/19.3e_193e_namespaces_controllers_and_queue_pairs_in_nvme.md)

### 📁 20 Parallel File Systems — Shared Storage for AI Clusters at Scale
*   <span class="roadmap-badge" data-lesson-id="20_1a_nfs_limitations"></span> [20.1a NFS limitations: single server metadata bottleneck, no parallel I/O](chapter_20/20.1a_201a_nfs_limitations.md)
*   <span class="roadmap-badge" data-lesson-id="20_1b_thundering_herd_problem"></span> [20.1b The thundering herd problem: 1000 GPUs opening the same dataset simultaneously](chapter_20/20.1b_201b_the_thundering_herd_problem.md)
*   <span class="roadmap-badge" data-lesson-id="20_1c_nfs_tuning_limitations"></span> [20.1c NFS tuning workarounds and why they are insufficient beyond 10 Gb/s](chapter_20/20.1c_201c_nfs_tuning_workarounds_and_why_they_are_insufficient_beyond_10_gbs.md)
*   <span class="roadmap-badge" data-lesson-id="20_2a_lustre_filesystem"></span> [20.2a Lustre: the dominant open-source parallel file system for HPC and AI](chapter_20/20.2a_202a_lustre.md)
*   <span class="roadmap-badge" data-lesson-id="20_2b_lustre_components"></span> [20.2b Lustre components: MDS (Metadata Servers), MDTs, OSS (Object Storage Servers), OSTs](chapter_20/20.2b_202b_lustre_components.md)
*   <span class="roadmap-badge" data-lesson-id="20_2c_lustre_striping"></span> [20.2c Lustre striping: distributing a single file across multiple OSTs for parallel reads](chapter_20/20.2c_202c_lustre_striping.md)
*   <span class="roadmap-badge" data-lesson-id="20_2d_ibm_spectrum_scale_gpfs"></span> [20.2d IBM Spectrum Scale (GPFS): enterprise parallel filesystem with global namespace](chapter_20/20.2d_202d_ibm_spectrum_scale_gpfs.md)
*   <span class="roadmap-badge" data-lesson-id="20_2e_weka_parallel_filesystem"></span> [20.2e WEKA: all-flash parallel file system designed natively for AI workloads](chapter_20/20.2e_202e_weka.md)
*   <span class="roadmap-badge" data-lesson-id="20_2f_vast_data_architecture"></span> [20.2f VAST Data: disaggregated NFS+S3 architecture for massive unstructured AI datasets](chapter_20/20.2f_202f_vast_data.md)
*   <span class="roadmap-badge" data-lesson-id="20_3a_s3_api"></span> [20.3a S3 API: the universal object storage protocol and its AI tooling ecosystem](chapter_20/20.3a_203a_s3_api.md)
*   <span class="roadmap-badge" data-lesson-id="20_3b_minio_object_storage"></span> [20.3b MinIO: S3-compatible object storage deployable on-premises](chapter_20/20.3b_203b_minio.md)
*   <span class="roadmap-badge" data-lesson-id="20_3c_tiered_storage_policies"></span> [20.3c Tiered storage policies: moving cold datasets from NVMe to object storage automatically](chapter_20/20.3c_203c_tiered_storage_policies.md)

### 📁 21 Accelerating the Storage Pipeline — GPUDirect Storage
*   <span class="roadmap-badge" data-lesson-id="21_1a_standard_data_path"></span> [21.1a Standard path: NVMe → PCIe → System RAM (CPU bounce buffer) → PCIe → GPU VRAM](chapter_21/21.1a_211a_standard_path.md)
*   <span class="roadmap-badge" data-lesson-id="21_1b_cpu_copy_bottleneck"></span> [21.1b The CPU copy bottleneck: memory bandwidth consumed by unnecessary staging](chapter_21/21.1b_211b_the_cpu_copy_bottleneck.md)
*   <span class="roadmap-badge" data-lesson-id="21_1c_gpu_utilization_limits"></span> [21.1c How this limits GPU utilization during data-intensive training](chapter_21/21.1c_211c_how_this_limits_gpu_utilization_during_data.md)
*   <span class="roadmap-badge" data-lesson-id="21_2a_gpudirect_storage_architecture"></span> [21.2a GDS architecture: DMA engine reads from NVMe directly into GPU BAR memory](chapter_21/21.2a_212a_gds_architecture.md)
*   <span class="roadmap-badge" data-lesson-id="21_2b_magnum_io_sdk"></span> [21.2b NVIDIA Magnum IO SDK: the suite of IO acceleration libraries](chapter_21/21.2b_212b_nvidia_magnum_io_sdk.md)
*   <span class="roadmap-badge" data-lesson-id="21_2c_cufile_api"></span> [21.2c cuFile API: the GDS programming interface for AI frameworks](chapter_21/21.2c_212c_cufile_api.md)
*   <span class="roadmap-badge" data-lesson-id="21_2d_gpudirect_storage_performance"></span> [21.2d Performance improvements: up to 2x storage throughput with GDS enabled](chapter_21/21.2d_212d_performance_improvements.md)
*   <span class="roadmap-badge" data-lesson-id="21_2e_gpudirect_storage_requirements"></span> [21.2e Requirements: compatible NVMe drivers, supported Linux kernels, GDS package](chapter_21/21.2e_212e_requirements.md)
*   <span class="roadmap-badge" data-lesson-id="21_3a_gds_and_gpudirect_rdma"></span> [21.3a Combining GDS and GPUDirect RDMA for network storage servers](chapter_21/21.3a_213a_combining_gds_and_gpudirect_rdma_for_network_storage_servers.md)
*   <span class="roadmap-badge" data-lesson-id="21_3b_storage_fabric_scenarios"></span> [21.3b Storage fabric scenarios: Lustre over InfiniBand with GDS enabled](chapter_21/21.3b_213b_storage_fabric_scenarios.md)
*   <span class="roadmap-badge" data-lesson-id="21_3c_dataset_precaching_strategies"></span> [21.3c Dataset pre-caching strategies and prefetch pipelines](chapter_21/21.3c_213c_dataset_pre.md)