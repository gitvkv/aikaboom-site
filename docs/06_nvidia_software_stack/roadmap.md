# 🗺️ Roadmap: The Nvidia Software Stack — Bridging Silicon and Python

Below is the syllabus timeline of lessons in this module. Track your study progress here.

## 📈 Progress
<div class="progress-container">
  <div class="progress-bar">0%</div>
</div>
---

### 📁 22 Base Drivers, CUDA, and Core Libraries
*   <span class="roadmap-badge" data-lesson-id="22_1a_nvidia_driver_branches"></span> [22.1a Driver branches: Data Center (production), Long-Term Support (LTS), and latest](chapter_22/22.1a_221a_driver_branches.md)
*   <span class="roadmap-badge" data-lesson-id="22_1b_nvidia_driver_installation"></span> [22.1b Installation methods: apt/dnf repository (recommended) vs .run file (manual)](chapter_22/22.1b_221b_installation_methods.md)
*   <span class="roadmap-badge" data-lesson-id="22_1c_dkms_basics"></span> [22.1c DKMS (Dynamic Kernel Module Support): auto-rebuilding drivers after kernel updates](chapter_22/22.1c_221c_dkms_dynamic_kernel_module_support.md)
*   <span class="roadmap-badge" data-lesson-id="22_1d_driver_cuda_compatibility"></span> [22.1d Driver and CUDA version compatibility matrix](chapter_22/22.1d_221d_driver_and_cuda_version_compatibility_matrix.md)
*   <span class="roadmap-badge" data-lesson-id="22_1e_driver_troubleshooting"></span> [22.1e Troubleshooting: nvidia-smi: no devices found and Xid error 79 (GPU fallen off bus)](chapter_22/22.1e_221e_troubleshooting.md)
*   <span class="roadmap-badge" data-lesson-id="22_2a_cuda_programming_model"></span> [22.2a CUDA programming model: grids, blocks, and threads mapped to GPU hardware](chapter_22/22.2a_222a_cuda_programming_model.md)
*   <span class="roadmap-badge" data-lesson-id="22_2b_cuda_toolkit_components"></span> [22.2b CUDA Toolkit components: nvcc compiler, runtime libraries, and development headers](chapter_22/22.2b_222b_cuda_toolkit_components.md)
*   <span class="roadmap-badge" data-lesson-id="22_2c_cuda_toolkit_versioning"></span> [22.2c CUDA Toolkit versioning: major.minor and backward/forward compatibility rules](chapter_22/22.2c_222c_cuda_toolkit_versioning.md)
*   <span class="roadmap-badge" data-lesson-id="22_2d_cublas_library"></span> [22.2d cuBLAS: GPU-accelerated BLAS (Basic Linear Algebra Subroutines) library](chapter_22/22.2d_222d_cublas.md)
*   <span class="roadmap-badge" data-lesson-id="22_2e_cufft_library"></span> [22.2e cuFFT: Fast Fourier Transform acceleration for signal processing workloads](chapter_22/22.2e_222e_cufft.md)
*   <span class="roadmap-badge" data-lesson-id="22_2f_cusparse_library"></span> [22.2f cuSPARSE: sparse matrix operations critical for certain Transformer optimizations](chapter_22/22.2f_222f_cusparse.md)
*   <span class="roadmap-badge" data-lesson-id="22_2g_cuda_graphs"></span> [22.2g CUDA Graphs: pre-compiling GPU execution graphs for reduced launch overhead](chapter_22/22.2g_222g_cuda_graphs.md)
*   <span class="roadmap-badge" data-lesson-id="22_3a_cudnn_role"></span> [22.3a cuDNN's role: hardware-optimized implementations of convolutions, pooling, activations](chapter_22/22.3a_223a_cudnns_role.md)
*   <span class="roadmap-badge" data-lesson-id="22_3b_cudnn_heuristics"></span> [22.3b cuDNN heuristics: auto-selecting the best algorithm for given input shapes](chapter_22/22.3b_223b_cudnn_heuristics.md)
*   <span class="roadmap-badge" data-lesson-id="22_3c_cudnn_compatibility"></span> [22.3c cuDNN versioning and compatibility with PyTorch and TensorFlow](chapter_22/22.3c_223c_cudnn_versioning_and_compatibility_with_pytorch_and_tensorflow.md)
*   <span class="roadmap-badge" data-lesson-id="22_4a_nccl_collective_operations"></span> [22.4a NCCL operations: AllReduce, AllGather, Reduce, Broadcast, ReduceScatter](chapter_22/22.4a_224a_nccl_operations.md)
*   <span class="roadmap-badge" data-lesson-id="22_4b_nccl_topology_detection"></span> [22.4b NCCL topology detection: auto-selecting NVLink, PCIe, or InfiniBand for communication](chapter_22/22.4b_224b_nccl_topology_detection.md)
*   <span class="roadmap-badge" data-lesson-id="22_4c_nccl_tuning_variables"></span> [22.4c NCCL environment variables for tuning: NCCL_DEBUG, NCCL_IB_HCA, NCCL_NET_GDR_LEVEL](chapter_22/22.4c_224c_nccl_environment_variables_for_tuning.md)

### 📁 23 Containerization Fundamentals — Docker from First Principles
*   <span class="roadmap-badge" data-lesson-id="23_1a_python_environment_problems"></span> [23.1a Why Python environments break: conflicting library versions, system package collisions](chapter_23/23.1a_231a_why_python_environments_break.md)
*   <span class="roadmap-badge" data-lesson-id="23_1b_virtual_machines_vs_containers"></span> [23.1b Virtual machines vs. containers: isolation with and without a hypervisor](chapter_23/23.1b_231b_virtual_machines_vs_containers.md)
*   <span class="roadmap-badge" data-lesson-id="23_1c_container_promise"></span> [23.1c The container promise: 'works on my machine' becomes deployable everywhere](chapter_23/23.1c_231c_the_container_promise.md)
*   <span class="roadmap-badge" data-lesson-id="23_2a_pid_namespace"></span> [23.2a PID namespace: isolated process trees — container processes see only themselves](chapter_23/23.2a_232a_pid_namespace.md)
*   <span class="roadmap-badge" data-lesson-id="23_2b_network_namespace"></span> [23.2b Network namespace: isolated network stacks, interfaces, and routing tables](chapter_23/23.2b_232b_network_namespace.md)
*   <span class="roadmap-badge" data-lesson-id="23_2c_mount_namespace"></span> [23.2c Mount namespace: isolated filesystem views with bind mounts](chapter_23/23.2c_232c_mount_namespace.md)
*   <span class="roadmap-badge" data-lesson-id="23_2d_cgroups_v1_v2"></span> [23.2d Cgroups v1 and v2: resource limits for CPU, memory, and I/O per container](chapter_23/23.2d_232d_cgroups_v1_and_v2.md)
*   <span class="roadmap-badge" data-lesson-id="23_2e_overlay_filesystems"></span> [23.2e Union filesystems (overlay2): layered image architecture explained](chapter_23/23.2e_232e_union_filesystems_overlay2.md)
*   <span class="roadmap-badge" data-lesson-id="23_3a_images_vs_containers"></span> [23.3a Images vs. containers: the blueprint vs. the running instance](chapter_23/23.3a_233a_images_vs_containers.md)
*   <span class="roadmap-badge" data-lesson-id="23_3b_dockerfile_anatomy"></span> [23.3b Dockerfile anatomy: FROM, RUN, COPY, ENV, EXPOSE, ENTRYPOINT, CMD](chapter_23/23.3b_233b_dockerfile_anatomy.md)
*   <span class="roadmap-badge" data-lesson-id="23_3c_docker_build_process"></span> [23.3c Building images: docker build, layer caching, and .dockerignore optimization](chapter_23/23.3c_233c_building_images.md)
*   <span class="roadmap-badge" data-lesson-id="23_3d_docker_run_basics"></span> [23.3d Running containers: docker run flags (--rm, -d, -p, -v, --name, --network)](chapter_23/23.3d_233d_running_containers.md)
*   <span class="roadmap-badge" data-lesson-id="23_3e_container_volume_mounts"></span> [23.3e Volume mounts: -v and --mount for persisting training datasets and checkpoints](chapter_23/23.3e_233e_volume_mounts.md)
*   <span class="roadmap-badge" data-lesson-id="23_3f_container_networking"></span> [23.3f Networking: bridge, host, and none modes — choosing for performance](chapter_23/23.3f_233f_networking.md)
*   <span class="roadmap-badge" data-lesson-id="23_3g_docker_compose"></span> [23.3g Docker Compose: multi-container service definitions in YAML](chapter_23/23.3g_233g_docker_compose.md)
*   <span class="roadmap-badge" data-lesson-id="23_3h_container_registries"></span> [23.3h Registry operations: docker pull, push, tag, and using private registries](chapter_23/23.3h_233h_registry_operations.md)
*   <span class="roadmap-badge" data-lesson-id="23_3i_multistage_builds"></span> [23.3i Multi-stage builds: separating build and runtime environments to minimize image size](chapter_23/23.3i_233i_multi.md)

### 📁 24 GPU-Accelerated Containers — The NVIDIA Container Toolkit
*   <span class="roadmap-badge" data-lesson-id="24_1a_nvidia_device_files"></span> [24.1a Device files: /dev/nvidia0, /dev/nvidiactl, /dev/nvidia-uvm — what each does](chapter_24/24.1a_241a_device_files.md)
*   <span class="roadmap-badge" data-lesson-id="24_1b_nvidia_driver_libraries"></span> [24.1b Driver libraries: libcuda.so, libnvidia-ml.so — must be accessible inside containers](chapter_24/24.1b_241b_driver_libraries.md)
*   <span class="roadmap-badge" data-lesson-id="24_1c_manual_gpu_container_mounts"></span> [24.1c The old way: manual --device and -v driver mounts — error-prone and brittle](chapter_24/24.1c_241c_the_old_way.md)
*   <span class="roadmap-badge" data-lesson-id="24_2a_nvidia_container_runtime"></span> [24.2a NVIDIA Container Runtime: a shim that injects GPU devices into container specs](chapter_24/24.2a_242a_nvidia_container_runtime.md)
*   <span class="roadmap-badge" data-lesson-id="24_2b_nvidia_container_toolkit_installation"></span> [24.2b Installation: nvidia-container-toolkit package and docker daemon configuration](chapter_24/24.2b_242b_installation.md)
*   <span class="roadmap-badge" data-lesson-id="24_2c_gpu_selection_in_containers"></span> [24.2c Using --gpus all, --gpus 2, --gpus 'device=0,1': selecting GPUs per container](chapter_24/24.2c_242c_using.md)
*   <span class="roadmap-badge" data-lesson-id="24_2d_nvidia_container_environment_variables"></span> [24.2d NVIDIA_VISIBLE_DEVICES and NVIDIA_DRIVER_CAPABILITIES environment variables](chapter_24/24.2d_242d_nvidia_visible_devices_and_nvidia_driver_capabilities_environment_variables.md)
*   <span class="roadmap-badge" data-lesson-id="24_2e_gpu_verification_in_containers"></span> [24.2e Verifying GPU access: nvidia-smi inside a container](chapter_24/24.2e_242e_verifying_gpu_access.md)
*   <span class="roadmap-badge" data-lesson-id="24_3a_cdi_specification"></span> [24.3a CDI specification: declarative JSON device definitions for any hardware](chapter_24/24.3a_243a_cdi_specification.md)
*   <span class="roadmap-badge" data-lesson-id="24_3b_generating_cdi_specs"></span> [24.3b Generating CDI specs: nvidia-cdi-hook generate](chapter_24/24.3b_243b_generating_cdi_specs.md)
*   <span class="roadmap-badge" data-lesson-id="24_3c_cdi_with_containerd_and_crio"></span> [24.3c CDI with containerd and CRI-O: Kubernetes-compatible GPU exposure](chapter_24/24.3c_243c_cdi_with_containerd_and_cri.md)
*   <span class="roadmap-badge" data-lesson-id="24_3d_cdi_modern_gpu_exposure"></span> [24.3d Why CDI replaces the hook-based approach for modern Kubernetes deployments](chapter_24/24.3d_243d_why_cdi_replaces_the_hook.md)

### 📁 25 NVIDIA NGC, AI Enterprise, and NIMs
*   <span class="roadmap-badge" data-lesson-id="25_1a_ngc_overview"></span> [25.1a What NGC provides: optimized containers, pre-trained models, Helm charts, resources](chapter_25/25.1a_251a_what_ngc_provides.md)
*   <span class="roadmap-badge" data-lesson-id="25_1b_ngc_container_registry"></span> [25.1b NGC container registry: docker pull nvcr.io/nvidia/pytorch:24.01-py3](chapter_25/25.1b_251b_ngc_container_registry.md)
*   <span class="roadmap-badge" data-lesson-id="25_1c_ngc_pytorch_container"></span> [25.1c NVIDIA PyTorch container: what is pre-installed and why it differs from pip PyTorch](chapter_25/25.1c_251c_nvidia_pytorch_container.md)
*   <span class="roadmap-badge" data-lesson-id="25_1d_ngc_api_authentication"></span> [25.1d NGC API key authentication: generating and configuring access](chapter_25/25.1d_251d_ngc_api_key_authentication.md)
*   <span class="roadmap-badge" data-lesson-id="25_1e_ngc_cli"></span> [25.1e NGC CLI: programmatic access to download models and resources](chapter_25/25.1e_251e_ngc_cli.md)
*   <span class="roadmap-badge" data-lesson-id="25_2a_nvaie_overview"></span> [25.2a What NVAIE provides: enterprise support SLAs, security patching, certified stacks](chapter_25/25.2a_252a_what_nvaie_provides.md)
*   <span class="roadmap-badge" data-lesson-id="25_2b_nvaie_licensing"></span> [25.2b NVAIE licensing: per-GPU subscriptions and vGPU license server configuration](chapter_25/25.2b_252b_nvaie_licensing.md)
*   <span class="roadmap-badge" data-lesson-id="25_2c_nvaie_certified_containers"></span> [25.2c NVAIE certified containers: tested combinations of driver/CUDA/framework versions](chapter_25/25.2c_252c_nvaie_certified_containers.md)
*   <span class="roadmap-badge" data-lesson-id="25_2d_nvaie_cve_patching"></span> [25.2d CVE patching lifecycle: how NVIDIA responds to security vulnerabilities in its stack](chapter_25/25.2d_252d_cve_patching_lifecycle.md)
*   <span class="roadmap-badge" data-lesson-id="25_3a_nim_overview"></span> [25.3a What NIM is: a pre-packaged, optimized inference engine in a container](chapter_25/25.3a_253a_what_nim_is.md)
*   <span class="roadmap-badge" data-lesson-id="25_3b_nim_components"></span> [25.3b NIM components: TensorRT-LLM engine, Triton server, OpenAI-compatible API](chapter_25/25.3b_253b_nim_components.md)
*   <span class="roadmap-badge" data-lesson-id="25_3c_nim_deployment"></span> [25.3c Deploying a NIM locally: docker run + --gpus + API key](chapter_25/25.3c_253c_deploying_a_nim_locally.md)
*   <span class="roadmap-badge" data-lesson-id="25_3d_available_nims"></span> [25.3d Available NIMs: Llama 3, Mistral, Stable Diffusion, and domain-specific models](chapter_25/25.3d_253d_available_nims.md)
*   <span class="roadmap-badge" data-lesson-id="25_3e_nim_model_caching"></span> [25.3e NIM caching: model weight caching on host for faster restart times](chapter_25/25.3e_253e_nim_caching.md)
*   <span class="roadmap-badge" data-lesson-id="25_4a_tensorrt_overview"></span> [25.4a TensorRT: graph optimization, layer fusion, and precision calibration](chapter_25/25.4a_254a_tensorrt.md)
*   <span class="roadmap-badge" data-lesson-id="25_4b_tensorrt_llm"></span> [25.4b TensorRT-LLM: NVIDIA's open-source LLM inference library with kernel optimizations](chapter_25/25.4b_254b_tensorrt.md)
*   <span class="roadmap-badge" data-lesson-id="25_4c_continuous_batching"></span> [25.4c In-flight batching (continuous batching): GPU utilization for dynamic inference](chapter_25/25.4c_254c_in.md)
*   <span class="roadmap-badge" data-lesson-id="25_4d_paged_kv_cache"></span> [25.4d Paged KV cache: managing memory for thousands of concurrent inference requests](chapter_25/25.4d_254d_paged_kv_cache.md)
*   <span class="roadmap-badge" data-lesson-id="25_5a_triton_architecture"></span> [25.5a Triton architecture: model repository, backends, and the C++ inference core](chapter_25/25.5a_255a_triton_architecture.md)
*   <span class="roadmap-badge" data-lesson-id="25_5b_triton_backends"></span> [25.5b Supported backends: TensorRT, ONNX, PyTorch TorchScript, Python, OpenVINO](chapter_25/25.5b_255b_supported_backends.md)
*   <span class="roadmap-badge" data-lesson-id="25_5c_dynamic_batching"></span> [25.5c Dynamic batching and model instances for maximum GPU utilization](chapter_25/25.5c_255c_dynamic_batching_and_model_instances_for_maximum_gpu_utilization.md)
*   <span class="roadmap-badge" data-lesson-id="25_5d_triton_apis_and_metrics"></span> [25.5d gRPC and REST APIs, Prometheus metrics, and model lifecycle management](chapter_25/25.5d_255d_grpc_and_rest_apis_prometheus_metrics_and_model_lifecycle_management.md)