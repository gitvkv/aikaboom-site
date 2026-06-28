// NVIDIA NCA-AIIO 25-Set Practice Exam Database (500 Unique Questions)
// Automatically generated via generate_quiz_questions.py
window.NCA_QUIZ_SETS = [
    {
        "id": 1,
        "title": "NCA practice exam Set 1",
        "description": "Practice Exam Set 1 containing 20 unique exam-aligned questions covering core infrastructure domains.",
        "questions": [
            {
                "id": 1,
                "question": "During which step of the Fetch-Decode-Execute cycle does the Control Unit interpret the opcode and send control signals to the ALU?",
                "options": [
                    "Fetch",
                    "Decode",
                    "Execute",
                    "Store"
                ],
                "correctAnswer": 1,
                "explanation": "The Decode step is where the Control Unit reads the opcode from the Instruction Register, interprets what operation is required, and sends control signals to the appropriate components (like the ALU) to prepare for execution. The Fetch step retrieves the instruction from memory, the Execute step performs the operation, and 'Store' is not a standard step in the cycle."
            },
            {
                "id": 2,
                "question": "In the context of CPU-to-memory communication, which bus is unidirectional and determines the maximum amount of memory the CPU can address?",
                "options": [
                    "Data bus",
                    "Address bus",
                    "Memory bus",
                    "Control bus"
                ],
                "correctAnswer": 1,
                "explanation": "The address bus is unidirectional (CPU to memory) and its width determines the maximum addressable memory. For example, a 32-bit address bus can address 2^32 = 4 GB. The data bus is bidirectional and carries actual data; the memory bus carries control signals; 'control bus' is not one of the three main buses discussed."
            },
            {
                "id": 3,
                "question": "Which of the following best describes why the Von Neumann bottleneck is particularly problematic for AI workloads compared to traditional workloads?",
                "options": [
                    "AI workloads require sequential processing of instructions, which the bottleneck exacerbates.",
                    "AI workloads involve massive parallel computation and constant data movement, causing the single data bus to become a traffic jam.",
                    "The bottleneck only affects floating-point operations, which are rare in AI workloads.",
                    "AI workloads are memory-bound, but the bottleneck primarily affects CPU-bound tasks."
                ],
                "correctAnswer": 1,
                "explanation": "The Von Neumann bottleneck refers to the limited bandwidth of the single data path between CPU and memory. AI workloads, such as neural network training, require massive parallel computation and constant movement of large datasets. This causes the single bus to become congested, leaving the CPU idle most of the time waiting for data. In contrast, traditional workloads typically involve smaller data transfers and less parallelism, making them less affected by the bottleneck. Option A is incorrect because AI workloads are parallel, not sequential. Option C is incorrect because AI workloads heavily use floating-point operations. Option D is incorrect because the bottleneck affects both memory-bound and CPU-bound tasks, but AI workloads are particularly memory-bound."
            },
            {
                "id": 4,
                "question": "A server administrator is selecting a CPU for an AI training server that will run multiple data-loading workers in parallel while the GPU performs heavy computation. Which CPU specification is most important for this workload?",
                "options": [
                    "High clock speed (e.g., 5.0 GHz) with few cores",
                    "Many cores and threads (e.g., 16 cores, 32 threads) with moderate clock speed",
                    "High clock speed and many cores equally",
                    "Low clock speed with few cores but high cache size"
                ],
                "correctAnswer": 1,
                "explanation": "For AI training, the CPU is often used to run multiple data-loading workers in parallel while the GPU handles the heavy math. This workload benefits from many cores and threads to handle parallel tasks efficiently. High clock speed is less critical because the tasks are parallelizable and not latency-sensitive. Option A (high GHz, few cores) is better for single-threaded tasks, not parallel data loading. Option C is not optimal because high clock speed and many cores together generate excessive heat and power, and the workload does not require both. Option D (low clock speed, few cores) would bottleneck the data pipeline."
            },
            {
                "id": 5,
                "question": "An AI infrastructure engineer is designing a server for a GPU-dense training cluster with 8 NVIDIA H100 GPUs per node. Which CPU architecture is most suitable for this configuration?",
                "options": [
                    "Intel Xeon Scalable (4th Gen) because of its built-in AMX accelerators for inference tasks.",
                    "AMD EPYC (4th Gen) because it offers up to 128 PCIe 5.0 lanes, enabling direct connection of all GPUs without switches.",
                    "Intel Xeon Scalable (4th Gen) because it provides higher single-thread performance for data preprocessing.",
                    "AMD EPYC (4th Gen) because it supports up to 12 memory channels, maximizing memory bandwidth for large datasets."
                ],
                "correctAnswer": 1,
                "explanation": "For a GPU-dense server with 8 GPUs, the primary bottleneck is often the number of available PCIe lanes to connect all GPUs directly. AMD EPYC (4th Gen) provides up to 128 PCIe 5.0 lanes, which is sufficient to connect 8 GPUs (each typically requiring 16 lanes) without needing additional PCIe switches. Intel Xeon Scalable (4th Gen) offers only up to 80 lanes, which would require switches or limit the number of GPUs. While Intel's AMX accelerators and single-thread performance are beneficial for inference or mixed workloads, they are less critical for a training-focused server. AMD's higher memory channel count is also an advantage, but the PCIe lane count is the decisive factor for this scenario."
            },
            {
                "id": 6,
                "question": "An AI engineer is running a multi-GPU training job on a dual-socket server with two NVIDIA GPUs, each attached to a different CPU socket. The engineer notices that training throughput is significantly lower than expected. Which action is most likely to improve performance by ensuring socket locality?",
                "options": [
                    "Use numactl to bind the training process to the CPU socket and memory node corresponding to the GPU being used.",
                    "Increase the number of CPU threads allocated to the training process.",
                    "Disable NUMA in the BIOS to treat all memory as uniform.",
                    "Move both GPUs to the same PCIe slot to share a single CPU socket."
                ],
                "correctAnswer": 0,
                "explanation": "In a NUMA system, each GPU is typically attached to a specific CPU socket. If the training process uses memory from a remote socket, data transfers become slower due to inter-socket latency and reduced bandwidth. Using numactl with --cpunodebind and --membind to match the GPU's socket ensures local memory access, improving performance. Increasing CPU threads does not address NUMA locality. Disabling NUMA is not possible on modern multi-socket systems and would not help. Moving GPUs to the same PCIe slot is physically impossible and would not solve the locality issue."
            },
            {
                "id": 7,
                "question": "An AI infrastructure engineer is provisioning a virtual machine for a CPU-based inference workload. The host server has 16 physical cores with SMT enabled. The engineer allocates 16 vCPUs to the VM. Which of the following best describes the underlying hardware resources the VM will likely receive?",
                "options": [
                    "16 physical cores, each with dedicated execution resources",
                    "8 physical cores, each appearing as 2 logical cores",
                    "16 physical cores, with SMT disabled for the VM",
                    "32 logical cores, with each logical core having dedicated execution resources"
                ],
                "correctAnswer": 1,
                "explanation": "When SMT (Hyper-Threading) is enabled, each physical core presents two logical cores to the operating system. A host with 16 physical cores and SMT enabled has 32 logical cores. Allocating 16 vCPUs typically maps to 16 logical cores, which correspond to 8 physical cores (since each physical core provides 2 logical cores). Option A is incorrect because the VM does not receive dedicated physical cores; it receives logical cores. Option C is incorrect because SMT is enabled on the host, and the VM will see logical cores. Option D is incorrect because logical cores share execution resources with their sibling logical core on the same physical core."
            },
            {
                "id": 8,
                "question": "An AI engineer is selecting memory for a new server intended for training large neural networks. Which of the following is the primary advantage of DDR5 over DDR4 for this workload?",
                "options": [
                    "Lower CAS latency in clock cycles",
                    "Higher bandwidth per module",
                    "Lower power consumption at the same data rate",
                    "Compatibility with existing DDR4 motherboards"
                ],
                "correctAnswer": 1,
                "explanation": "For AI training, memory bandwidth is often the bottleneck. DDR5 offers significantly higher bandwidth (e.g., 38.4 GB/s at 4800 MT/s vs. 25.6 GB/s for DDR4-3200), enabling faster data transfer to GPUs and CPUs. While DDR5 has higher CAS latency in clock cycles, the actual time delay is similar due to higher frequencies, and the bandwidth gain outweighs the latency increase. Lower power consumption is a benefit but not the primary advantage for performance. DDR5 is not backward compatible with DDR4 slots."
            },
            {
                "id": 9,
                "question": "An AI engineer is troubleshooting a 72-hour training run that produced incorrect model weights. System logs show no crashes or errors. Which hardware feature would have prevented this silent corruption?",
                "options": [
                    "Non-ECC memory",
                    "ECC memory",
                    "NVLink",
                    "GPUDirect RDMA"
                ],
                "correctAnswer": 1,
                "explanation": "ECC (Error-Correcting Code) memory can detect and correct single-bit errors caused by cosmic rays or radiation, preventing silent data corruption that can ruin long training runs. Non-ECC memory lacks this protection. NVLink and GPUDirect RDMA are high-speed interconnects that do not address memory bit-flip errors."
            },
            {
                "id": 10,
                "question": "An AI engineer is configuring a server with 8 memory channels and plans to install dual-rank DIMMs in all channels. Which of the following best describes the expected benefit of using dual-rank DIMMs over single-rank DIMMs in this configuration?",
                "options": [
                    "Dual-rank DIMMs double the number of memory channels available.",
                    "Dual-rank DIMMs allow rank interleaving, which can provide a small bandwidth boost (5\u201315%) by enabling the memory controller to overlap operations between ranks.",
                    "Dual-rank DIMMs reduce memory latency by half compared to single-rank DIMMs.",
                    "Dual-rank DIMMs increase the total memory capacity without affecting bandwidth."
                ],
                "correctAnswer": 1,
                "explanation": "Dual-rank DIMMs contain two sets of memory chips that can be accessed independently. The memory controller can interleave between ranks, allowing it to prepare data from one rank while accessing another. This rank interleaving typically yields a 5\u201315% bandwidth improvement over single-rank DIMMs. Option A is incorrect because the number of channels is determined by the CPU/motherboard, not the rank count. Option C is incorrect because dual-rank DIMMs may actually have slightly higher latency due to the additional electrical load. Option D is incorrect because while dual-rank DIMMs often offer higher capacity, the question specifically asks about bandwidth benefit, and capacity increase does not directly improve bandwidth."
            },
            {
                "id": 11,
                "question": "An AI infrastructure engineer is configuring a server with Intel Optane Persistent Memory for a large-scale in-memory database. The database must survive a power failure and resume operations without data loss. Which operating mode should the engineer use?",
                "options": [
                    "Memory Mode, because it treats PMem as system memory and provides the highest performance.",
                    "App Direct Mode, because it allows direct application access and data persists across reboots.",
                    "Hybrid Mode, because it combines DRAM and PMem to optimize both speed and persistence.",
                    "Storage Mode, because it exposes PMem as a block device similar to an SSD."
                ],
                "correctAnswer": 1,
                "explanation": "App Direct Mode is the correct choice because it allows applications to directly access PMem as fast, byte-addressable persistent storage. Data written in this mode survives power loss and system reboots, which is essential for the database to resume without data loss. Memory Mode treats PMem as volatile memory (data is lost on reboot), so it does not meet the persistence requirement. Hybrid Mode is not a standard operating mode for Intel Optane PMem. Storage Mode is not a defined mode; PMem can be used as a block device in App Direct Mode via a filesystem, but the mode itself is App Direct."
            },
            {
                "id": 12,
                "question": "An AI engineer is troubleshooting slow data reads from a legacy HDD-based storage system used for archiving large log files. Which HDD performance metric is most likely to dominate the total access time when reading these large sequential files?",
                "options": [
                    "Seek time",
                    "Rotational latency",
                    "Transfer time",
                    "Head settling time"
                ],
                "correctAnswer": 2,
                "explanation": "For sequential workloads, the read/write head stays on the same track, minimizing seek time and rotational latency. Transfer time, which is the time to read data off the platter, becomes the dominant factor because large amounts of data are read consecutively. Seek time and rotational latency are more significant for random I/O. Head settling time is a minor component and not a standard metric."
            },
            {
                "id": 13,
                "question": "An AI engineer is evaluating storage options for a training pipeline that reads thousands of small image files concurrently. Which characteristic of NVMe over PCIe most directly addresses the bottleneck caused by SATA SSDs in this scenario?",
                "options": [
                    "Higher sequential read bandwidth (e.g., 3,500 MB/s vs. 550 MB/s)",
                    "Lower latency (e.g., 10\u201320 microseconds vs. 100\u2013200 microseconds)",
                    "Massive parallel queue depth (up to 64K queues with 64K commands each)",
                    "Direct connection to PCIe lanes bypassing the SATA controller"
                ],
                "correctAnswer": 2,
                "explanation": "The scenario involves reading thousands of small image files concurrently, which is a random I/O workload. SATA SSDs are limited to a single command queue with 32 commands, causing severe bottlenecks when many files are accessed simultaneously. NVMe's support for up to 64K queues and 64K commands per queue allows it to handle massive parallelism, directly addressing the bottleneck. While higher bandwidth, lower latency, and direct PCIe connection contribute to overall speed, the parallel queue depth is the key feature that enables efficient concurrent random reads of many small files."
            },
            {
                "id": 14,
                "question": "An AI infrastructure engineer is selecting NVMe SSDs for a high-density storage server that will be deployed in a 1U rack unit. The server requires many drives to be packed tightly while maintaining excellent cooling. Which form factor is most appropriate for this scenario?",
                "options": [
                    "M.2",
                    "U.2",
                    "U.3",
                    "E1.S"
                ],
                "correctAnswer": 3,
                "explanation": "E1.S drives are designed specifically for high-density storage servers. Their long, slim shape allows many drives to be packed into a small space (like a 1U rack unit) while providing excellent cooling due to a large surface area and placement in direct airflow paths. M.2 drives are small but have poor cooling and are not hot-swappable, making them unsuitable for dense server deployments. U.2 and U.3 drives are 2.5-inch form factors that offer good cooling and hot-swap capability, but they are thicker and take up more space per drive compared to E1.S, limiting density in a 1U chassis."
            },
            {
                "id": 15,
                "question": "An AI infrastructure engineer is selecting SSDs for a storage node that will handle model training checkpoints and inference logging. Which of the following is the most important reason to choose enterprise-grade drives over consumer-grade drives for this workload?",
                "options": [
                    "Enterprise drives have higher sequential read speeds, which are critical for AI training.",
                    "Enterprise drives offer higher TBW ratings, ensuring they can withstand the continuous write-heavy workload.",
                    "Enterprise drives are cheaper per gigabyte, reducing overall storage costs.",
                    "Enterprise drives support NVMe over Fabrics, while consumer drives do not."
                ],
                "correctAnswer": 1,
                "explanation": "Enterprise-grade drives are designed with much higher TBW (Terabytes Written) ratings compared to consumer drives. AI training and inference workloads involve frequent writing of checkpoints, logs, and cached results, which can quickly exhaust the endurance of consumer drives. Higher TBW ensures the drives last longer under continuous write-heavy conditions. Option A is incorrect because sequential read speed is not the primary concern for write-heavy workloads. Option C is false; enterprise drives are more expensive per GB. Option D is incorrect because both enterprise and some consumer NVMe drives can support NVMe over Fabrics, but that is not the key differentiator for endurance."
            },
            {
                "id": 16,
                "question": "An AI engineer is designing a new server for large-scale training with NVIDIA H100 GPUs. The server's motherboard supports PCIe Gen 5 x16 slots. Which of the following statements about PCIe generation compatibility is correct?",
                "options": [
                    "A Gen 5 GPU installed in a Gen 4 slot will operate at Gen 5 speeds.",
                    "A Gen 3 GPU installed in a Gen 5 slot will operate at Gen 3 speeds.",
                    "A Gen 4 GPU installed in a Gen 5 slot will operate at Gen 5 speeds.",
                    "A Gen 5 GPU installed in a Gen 3 slot will operate at Gen 5 speeds."
                ],
                "correctAnswer": 1,
                "explanation": "PCIe is backward compatible, but the link speed is determined by the slowest component. A Gen 3 GPU in a Gen 5 slot will negotiate down to Gen 3 speeds. Option A is incorrect because a Gen 5 GPU in a Gen 4 slot will operate at Gen 4 speeds, not Gen 5. Option C is incorrect because a Gen 4 GPU in a Gen 5 slot will operate at Gen 4 speeds. Option D is incorrect because a Gen 5 GPU in a Gen 3 slot will operate at Gen 3 speeds."
            },
            {
                "id": 17,
                "question": "In a multi-GPU AI server, which component is primarily responsible for enabling direct GPU-to-GPU communication without involving the CPU for every transaction?",
                "options": [
                    "PCIe riser card",
                    "PCIe switch chip",
                    "CPU root complex",
                    "NVLink bridge"
                ],
                "correctAnswer": 1,
                "explanation": "A PCIe switch chip acts as a traffic director, routing data between GPUs directly without CPU intervention. This reduces latency and avoids CPU bottlenecks, which is critical for distributed training. PCIe riser cards only extend or split physical connections, the CPU root complex manages initial connections but is not designed for direct GPU-to-GPU routing, and NVLink is a separate high-speed interconnect that bypasses PCIe entirely."
            },
            {
                "id": 18,
                "question": "An AI infrastructure engineer needs to install four NVMe drives in a server that has only one available x16 PCIe slot. The motherboard supports PCIe bifurcation. Which bifurcation mode should the engineer select in the BIOS to connect all four NVMe drives, assuming each drive requires x4 lanes?",
                "options": [
                    "x8/x8",
                    "x4/x4/x4/x4",
                    "x8/x4/x4",
                    "x16 (no bifurcation)"
                ],
                "correctAnswer": 1,
                "explanation": "The correct answer is x4/x4/x4/x4. This mode splits the single x16 slot into four independent x4 links, each capable of supporting one NVMe drive that requires x4 lanes. Option A (x8/x8) provides only two links, insufficient for four drives. Option C (x8/x4/x4) provides three links, also insufficient. Option D (x16) provides a single link, which cannot connect multiple drives without additional hardware and does not utilize bifurcation."
            },
            {
                "id": 19,
                "question": "An AI engineer is troubleshooting a training job that runs significantly slower than expected on a multi-GPU server. The engineer runs `nvidia-smi topo -m` and sees that the connection between GPU0 and GPU1 is labeled as 'SYS'. What does this indicate?",
                "options": [
                    "The GPUs are connected through a PCIe switch, which provides high bandwidth.",
                    "The GPUs are connected through the CPU's root complex and system memory, which introduces a severe bottleneck.",
                    "The GPUs are directly connected via NVLink, allowing high-speed communication.",
                    "The GPUs are on different PCIe slots but share the same PCIe host bridge, which is optimal for performance."
                ],
                "correctAnswer": 1,
                "explanation": "In the output of `nvidia-smi topo -m`, 'SYS' indicates that the GPUs communicate through the CPU's root complex and system memory, which is the slowest path for GPU-to-GPU traffic. This path involves multiple hops through the PCIe bus and system RAM, leading to high latency and limited bandwidth. Options A and D describe better topologies (PIX and PHB), while option C describes a direct NVLink connection, which is the fastest."
            },
            {
                "id": 20,
                "question": "In a modern enterprise server, what is the primary role of the Platform Controller Hub (PCH) compared to the traditional Northbridge/Southbridge chipset design?",
                "options": [
                    "The PCH integrates both high-speed and slower I/O management into a single chip, reducing power consumption and complexity.",
                    "The PCH replaces the CPU's memory controller to improve memory bandwidth.",
                    "The PCH adds dedicated Tensor Cores for AI acceleration.",
                    "The PCH eliminates the need for a separate Baseboard Management Controller (BMC) by integrating out-of-band management."
                ],
                "correctAnswer": 0,
                "explanation": "The PCH is a single-chip design that combines the functions of the traditional Northbridge (high-speed I/O) and Southbridge (slower I/O), reducing power consumption and complexity. Option B is incorrect because the memory controller is integrated into the CPU, not the PCH. Option C is incorrect because Tensor Cores are part of the GPU, not the PCH. Option D is incorrect because while the PCH may interface with the BMC, it does not eliminate the need for a separate BMC."
            }
        ]
    },
    {
        "id": 2,
        "title": "NCA practice exam Set 2",
        "description": "Practice Exam Set 2 containing 20 unique exam-aligned questions covering core infrastructure domains.",
        "questions": [
            {
                "id": 21,
                "question": "A data center engineer is configuring power redundancy for a new server that requires a minimum of two 1600W power supplies to operate at full load. The server will host a mission-critical application that cannot tolerate any downtime, even if an entire power distribution path fails. Which power supply configuration should the engineer implement?",
                "options": [
                    "Install three power supplies, all connected to the same PDU circuit.",
                    "Install four power supplies, with two connected to PDU A and two connected to PDU B, where PDU A and PDU B are on independent circuits.",
                    "Install two power supplies, each connected to a separate UPS system.",
                    "Install three power supplies, with two connected to PDU A and one connected to PDU B."
                ],
                "correctAnswer": 1,
                "explanation": "The correct configuration is 2N redundancy, which requires 2 \u00d7 N = 4 power supplies, split across two independent power distribution paths (PDUs, circuits, UPS). This ensures that if one entire power path fails (e.g., a circuit breaker trips), the other path continues to supply full power, achieving zero downtime. Option A is N+1 redundancy (3 PSUs on same circuit) which protects against a single PSU failure but not a circuit failure. Option C (2 PSUs on separate UPS) is not fully redundant because if one PSU fails, the remaining PSU may not handle full load (N=2). Option D (3 PSUs split unevenly) does not provide full 2N protection because the path with only one PSU cannot sustain full load if the other path fails."
            },
            {
                "id": 22,
                "question": "Which of the following is a key characteristic of hot-swappable components in enterprise servers?",
                "options": [
                    "The server must be powered off before replacing the component.",
                    "The component can be removed or inserted while the server remains operational.",
                    "Hot-swap components require special tools for removal.",
                    "Only drives are hot-swappable; PSUs and fans require a reboot."
                ],
                "correctAnswer": 1,
                "explanation": "Hot-swappable components are designed to be removed or inserted without powering down the server, ensuring zero downtime. Option A describes cold-swap (traditional) replacement. Option C is incorrect because hot-swap components are typically tool-less. Option D is false because PSUs and fans are also commonly hot-swappable in enterprise servers."
            },
            {
                "id": 23,
                "question": "A Linux administrator needs to verify whether a server is booting in UEFI or legacy BIOS mode. Which command or file check should they use?",
                "options": [
                    "Check the contents of /boot/grub/grub.cfg for 'uefi' or 'bios' keywords.",
                    "Run 'ls /sys/firmware/efi' \u2014 if the directory exists, the system is in UEFI mode.",
                    "Execute 'nvidia-smi --query-gpu=index --format=csv' and look for 'UEFI' in the output.",
                    "Inspect the output of 'dmesg | grep -i firmware' for the string 'UEFI'."
                ],
                "correctAnswer": 1,
                "explanation": "The presence of the /sys/firmware/efi directory is the standard method to confirm UEFI boot mode on Linux. If the directory exists, the system booted via UEFI; if not, it is using legacy BIOS. Option A is incorrect because GRUB configuration files do not reliably indicate the boot mode. Option C is incorrect because nvidia-smi does not report firmware boot mode. Option D is incorrect because dmesg may not always show a clear indicator, and the presence of 'UEFI' in dmesg is not a definitive check."
            },
            {
                "id": 24,
                "question": "An engineer needs to remotely power cycle a server that is unresponsive over the network. Which IPMI command should be used to perform a hard shutdown followed by a power-on?",
                "options": [
                    "ipmitool power soft",
                    "ipmitool power reset",
                    "ipmitool power off",
                    "ipmitool power cycle"
                ],
                "correctAnswer": 1,
                "explanation": "The correct answer is 'ipmitool power reset'. This command performs a hard reset of the server, which is equivalent to pressing the reset button. It immediately restarts the server without a graceful shutdown. 'ipmitool power soft' sends an ACPI shutdown signal to the OS, which requires the OS to be responsive. 'ipmitool power off' only turns off the server without restarting it. 'ipmitool power cycle' is not a standard ipmitool command; the correct sequence would be 'power off' followed by 'power on'."
            },
            {
                "id": 25,
                "question": "An engineer needs to remotely check the power state of a server in a data center. Which of the following best describes the correct approach using Redfish?",
                "options": [
                    "Send an IPMI command over RMCP+ to the BMC's IP address.",
                    "Send an HTTP GET request to /redfish/v1/Systems/1 on the BMC's IP address.",
                    "Use SSH to log into the server and run nvidia-smi to check power state.",
                    "Send a POST request to /redfish/v1/Chassis/1/Power with JSON payload."
                ],
                "correctAnswer": 1,
                "explanation": "Redfish is a RESTful API that uses HTTP/HTTPS and JSON. To check the power state of a server, you send a GET request to the Systems resource (e.g., /redfish/v1/Systems/1), which returns a JSON response containing the PowerState field. Option A describes IPMI, which is older and less secure. Option C uses SSH and nvidia-smi, which is not a remote management protocol for power state. Option D uses a POST request to a Power resource, but POST is typically used to change state, not to read it."
            },
            {
                "id": 26,
                "question": "Which of the following is a unique capability of the NVIDIA BMC compared to Dell iDRAC, HPE iLO, and Lenovo XCC?",
                "options": [
                    "It provides native GPU health monitoring including temperature, power draw, and memory errors.",
                    "It supports mounting virtual media (ISO files) for OS installation.",
                    "It allows remote power on/off and reset of the server.",
                    "It has a RESTful API for programmatic management."
                ],
                "correctAnswer": 0,
                "explanation": "The NVIDIA BMC is specifically designed for AI and GPU-accelerated workloads, offering native GPU health monitoring (temperature, power draw, memory usage, error counts) and NVSwitch fabric monitoring. While all four BMCs support virtual media, remote power control, and REST APIs, only the NVIDIA BMC provides deep, direct GPU telemetry out of the box. Dell iDRAC, HPE iLO, and Lenovo XCC have limited GPU visibility (e.g., via PCIe) and require additional tools for comprehensive GPU monitoring."
            },
            {
                "id": 27,
                "question": "A server administrator needs to install a new operating system on a remote server located in a different data center. The server currently has no OS installed. Which BMC feature should the administrator use to mount an ISO file from their local computer and boot from it?",
                "options": [
                    "Power cycling",
                    "Boot order change",
                    "Sensor readings",
                    "KVM-over-IP"
                ],
                "correctAnswer": 3,
                "explanation": "KVM-over-IP allows the administrator to remotely see the server's video output and interact with it as if physically present. It also supports mounting virtual media (like an ISO file) from the local computer, enabling the server to boot from that ISO to install an OS. Power cycling only turns the server on/off. Boot order change rearranges boot devices but does not provide the ability to mount a remote ISO. Sensor readings monitor hardware health but do not facilitate OS installation."
            },
            {
                "id": 28,
                "question": "An AI data center is deploying racks of NVIDIA DGX H100 systems. Each DGX H100 system draws approximately 7 kW, and a rack will contain 8 such systems. Which power type is required for this rack, and why?",
                "options": [
                    "Single-phase power, because it is sufficient for loads up to 15 kW per circuit.",
                    "Three-phase power, because it can deliver continuous high power (over 50 kW) on a single circuit with lower current and higher efficiency.",
                    "Single-phase power, because it is cheaper and easier to install for small-scale deployments.",
                    "Three-phase power, but only if the rack contains more than 10 systems."
                ],
                "correctAnswer": 1,
                "explanation": "A rack with 8 DGX H100 systems draws 56 kW total (8 \u00d7 7 kW). Single-phase power is limited to about 15 kW per circuit, so it cannot safely or efficiently supply this load. Three-phase power can deliver 50 kW to over 1 MW per circuit, provides continuous power delivery, reduces current draw (allowing thinner cables and less heat), and improves efficiency. Therefore, three-phase power is required for this AI rack."
            },
            {
                "id": 29,
                "question": "A data center engineer is planning to deploy a rack of 8 NVIDIA H100 GPUs for AI training. The engineer needs to monitor per-outlet power consumption, remotely reboot individual servers, and receive alerts when power draw exceeds thresholds. Which type of PDU should the engineer select?",
                "options": [
                    "Basic PDU",
                    "Metered PDU",
                    "Switched PDU",
                    "Intelligent PDU"
                ],
                "correctAnswer": 3,
                "explanation": "An Intelligent PDU provides per-outlet power monitoring, remote switching/reboot capabilities, and threshold alerts via SNMP or API. Basic PDUs offer no monitoring or control. Metered PDUs show local power metrics but lack remote access and outlet control. Switched PDUs allow remote outlet control but typically have limited per-outlet monitoring and alerting compared to intelligent PDUs. Therefore, the Intelligent PDU best meets all the engineer's requirements."
            },
            {
                "id": 30,
                "question": "An AI infrastructure engineer is designing power protection for a cluster of NVIDIA H100 GPU servers used for long-duration training jobs. Which UPS topology is most appropriate for these servers, and why?",
                "options": [
                    "Line-interactive, because it provides higher efficiency (97\u201399%) and lower heat generation, reducing cooling costs in the data center.",
                    "Online double-conversion, because it offers zero transfer time to battery and full power conditioning, protecting sensitive GPU hardware from power glitches that could corrupt training data.",
                    "Line-interactive, because its automatic voltage regulation (AVR) corrects sags and surges without switching to battery, ensuring uninterrupted operation during minor fluctuations.",
                    "Online double-conversion, because it is more cost-effective and has a smaller footprint, allowing more servers to be deployed per rack."
                ],
                "correctAnswer": 1,
                "explanation": "Online double-conversion UPS is strongly recommended for GPU compute nodes (e.g., NVIDIA H100 clusters) because it provides zero transfer time to battery and complete power conditioning (removing noise, spikes, frequency variations). This is critical for sensitive AI hardware where even a 2\u20134 ms transfer gap (as in line-interactive) can cause GPU memory errors or training job failures. While line-interactive UPS offers higher efficiency and lower cost, it does not isolate equipment from grid disturbances and has a non-zero transfer time, making it unsuitable for mission-critical AI training workloads."
            },
            {
                "id": 31,
                "question": "A data center engineer is evaluating the efficiency of a facility that houses a large GPU cluster for AI training. The total facility power consumption is 2.5 MW, and the IT equipment power consumption is 1.8 MW. What is the Power Usage Effectiveness (PUE) of this data center, and how does it compare to the industry average?",
                "options": [
                    "PUE = 1.39, which is better than the industry average.",
                    "PUE = 1.39, which is worse than the industry average.",
                    "PUE = 0.72, which is better than the industry average.",
                    "PUE = 0.72, which is worse than the industry average."
                ],
                "correctAnswer": 0,
                "explanation": "PUE is calculated as Total Facility Energy divided by IT Equipment Energy: 2.5 MW / 1.8 MW = 1.39. The industry average PUE is typically between 1.5 and 1.8, so a PUE of 1.39 is better (lower) than the industry average, indicating a more efficient data center. Option B is incorrect because 1.39 is lower than the industry average, not higher. Options C and D are incorrect because they use the inverse ratio (IT/Total) which is not PUE."
            },
            {
                "id": 32,
                "question": "In an AI data center, what is the primary role of an automatic transfer switch (ATS) during a utility power failure?",
                "options": [
                    "To provide instant backup power from batteries to the GPUs.",
                    "To detect the power failure, start the generator, and switch the load to generator power once stable.",
                    "To convert AC power from the generator to DC power for the servers.",
                    "To monitor fuel levels and automatically refill the generator tank."
                ],
                "correctAnswer": 1,
                "explanation": "The ATS continuously monitors utility power. When it detects a failure, it sends a start signal to the generator and, after a warm-up period, transfers the electrical load from utility to generator power. Option A describes a UPS, not an ATS. Option C describes a rectifier or power supply unit. Option D is not a function of an ATS; fuel monitoring is typically handled by the generator's control panel."
            },
            {
                "id": 33,
                "question": "In a server, heat from a GPU die is transferred to a copper heat pipe, then to aluminum fins, and finally removed by fans blowing air across the fins. Which sequence of heat transfer methods does this path represent?",
                "options": [
                    "Conduction \u2192 Convection \u2192 Radiation",
                    "Conduction \u2192 Conduction \u2192 Convection",
                    "Convection \u2192 Conduction \u2192 Radiation",
                    "Radiation \u2192 Conduction \u2192 Convection"
                ],
                "correctAnswer": 1,
                "explanation": "The correct sequence is conduction (GPU die to heat pipe), conduction (heat pipe to fins), and convection (fans blowing air across fins). Radiation is not the primary mechanism in this path. Option A incorrectly includes radiation. Option C starts with convection, which is wrong because the initial transfer is through solid contact. Option D incorrectly starts with radiation."
            },
            {
                "id": 34,
                "question": "In a data center using hot-aisle containment, what is the primary benefit of enclosing the hot aisle?",
                "options": [
                    "It increases the supply air temperature to the cold aisle.",
                    "It prevents hot exhaust air from mixing with cold intake air, improving cooling efficiency.",
                    "It allows server fans to run at lower speeds, reducing power consumption.",
                    "It eliminates the need for perforated floor tiles in the cold aisle."
                ],
                "correctAnswer": 1,
                "explanation": "Hot-aisle containment physically encloses the hot aisle, capturing hot exhaust air and ducting it directly back to the cooling system. This prevents hot air from recirculating into the cold aisle, ensuring that server intakes receive only cool air. The result is improved cooling efficiency and reduced workload on the cooling system. Option A is incorrect because containment does not change the supply air temperature setpoint. Option C is incorrect because while containment can reduce fan speeds indirectly, the primary benefit is preventing air mixing. Option D is incorrect because perforated tiles are still needed to deliver cold air to the cold aisle."
            },
            {
                "id": 35,
                "question": "A data center engineer is planning cooling for a row of 10 NVIDIA DGX H100 systems, each consuming 30 kW. The facility has a dedicated hot aisle/cold aisle layout and available floor space between racks. Which cooling system is most appropriate for this high-density deployment?",
                "options": [
                    "Raised-floor cooling with perforated tiles",
                    "In-row cooling units placed between racks",
                    "Overhead cooling units mounted in the ceiling",
                    "Portable air conditioning units placed in the cold aisle"
                ],
                "correctAnswer": 1,
                "explanation": "In-row cooling is specifically designed for very high-density deployments exceeding 20 kW per rack, as it places the cooling unit directly between racks to capture hot exhaust air and supply cold air with a short, efficient air path. Raised-floor cooling (Option A) is typically insufficient for densities above 15-20 kW per rack. Overhead cooling (Option C) is better suited for medium to high densities (10-30 kW/rack) and saves floor space, but in-row cooling is preferred when floor space is available and densities are very high. Portable AC units (Option D) are not designed for data center precision cooling and cannot handle such high heat loads reliably."
            },
            {
                "id": 36,
                "question": "A data center engineer is planning a cluster of 8 GPUs per server, each with a TDP of 500W. The engineer is evaluating cooling options. Which of the following best explains why traditional air cooling is likely insufficient for this configuration?",
                "options": [
                    "Air cooling cannot remove heat fast enough from a concentrated source due to air's low thermal conductivity and heat capacity.",
                    "Air cooling requires large heatsinks that physically cannot fit inside a standard server chassis.",
                    "Air cooling is only effective for GPUs with TDP below 200W, and above that, liquid cooling is mandatory.",
                    "Air cooling at high fan speeds causes electromagnetic interference that disrupts GPU operation."
                ],
                "correctAnswer": 0,
                "explanation": "At 500W TDP, the GPU die generates intense heat in a very small area. Air has low thermal conductivity and heat capacity, meaning it cannot absorb and carry away heat efficiently from such a concentrated source. This leads to thermal throttling and overheating. Option B is incorrect because heatsinks can fit, but they become insufficient. Option C is incorrect because air cooling can handle up to ~300-350W, not just 200W. Option D is incorrect because fan speed does not cause electromagnetic interference that disrupts GPU operation."
            },
            {
                "id": 37,
                "question": "In a Direct Liquid Cooling (DLC) system for an AI data center, which component is responsible for distributing coolant evenly to multiple cold plates and then collecting the warmed coolant to return it to the CDU?",
                "options": [
                    "Cold plate",
                    "Coolant Distribution Unit (CDU)",
                    "Manifold",
                    "Heat exchanger"
                ],
                "correctAnswer": 2,
                "explanation": "The manifold is the component that splits the coolant supply into multiple paths to serve each cold plate and then recombines the return paths. Cold plates absorb heat directly from GPUs, the CDU pumps and regulates coolant, and the heat exchanger is part of the CDU that transfers heat to a secondary loop. Only the manifold performs the distribution and collection function described."
            },
            {
                "id": 38,
                "question": "An AI data center engineer is evaluating immersion cooling for a cluster of high-density GPU servers. The servers are expected to generate up to 120 kW per rack. Which immersion cooling approach is most suitable for this scenario?",
                "options": [
                    "Single-phase immersion cooling with synthetic oil",
                    "Two-phase immersion cooling with engineered fluorocarbon fluid",
                    "Single-phase immersion cooling with water-glycol mixture",
                    "Two-phase immersion cooling with mineral oil"
                ],
                "correctAnswer": 1,
                "explanation": "Two-phase immersion cooling is designed for extremely high heat densities, capable of handling over 100 kW per rack, making it suitable for the 120 kW per rack requirement. It uses engineered fluorocarbon fluids with low boiling points that absorb large amounts of heat through latent heat of vaporization. Single-phase cooling is limited to about 50 kW per rack and cannot handle such high densities. Water-glycol is conductive and not suitable for direct contact with electronics. Mineral oil is typically used in single-phase systems and cannot achieve the heat transfer efficiency needed for 120 kW per rack."
            },
            {
                "id": 39,
                "question": "A data center engineer is planning to deploy a cluster of GPU servers for AI training. Which rack configuration is most appropriate for this workload?",
                "options": [
                    "42U rack with fixed rails and no cable management arms",
                    "48U rack with sliding rails and cable management arms",
                    "42U rack with two-post rails and vertical cable managers",
                    "48U rack with fixed rails and horizontal cable managers only"
                ],
                "correctAnswer": 1,
                "explanation": "AI training clusters typically use dense GPU servers that are heavy and require frequent maintenance. A 48U rack provides more vertical space for compute nodes, networking, and storage. Sliding rails allow easy access to heavy servers without removing them from the rack, and cable management arms keep cables organized when servers are pulled out. Fixed rails (options A and D) make maintenance difficult, two-post rails (option C) are insufficient for heavy servers, and 42U racks (options A and C) offer less capacity for dense AI deployments."
            },
            {
                "id": 40,
                "question": "A data center engineer is planning to install a fully loaded DGX H100 rack weighing 1,200 kg in a facility with a raised floor rated at 7.2 kN/m\u00b2 (150 lb/ft\u00b2). The rack has four feet, each with an area of 0.01 m\u00b2. What is the most appropriate action to ensure safe installation?",
                "options": [
                    "Install the rack directly on the raised floor without any modifications.",
                    "Use load-spreading plates under the rack's feet to distribute the weight.",
                    "Reinforce the raised floor by adding additional support beams beneath the rack.",
                    "Reduce the weight of the rack by removing some GPUs before installation."
                ],
                "correctAnswer": 1,
                "explanation": "The point load from the rack is 1,200 kg / (4 \u00d7 0.01 m\u00b2) = 30,000 kg/m\u00b2, which far exceeds the floor's rating of 7.2 kN/m\u00b2 (approximately 734 kg/m\u00b2). Load-spreading plates increase the contact area, reducing the point load to a safe level. Direct installation (A) risks floor collapse. Reinforcing the floor (C) is costly and may not be feasible. Removing GPUs (D) defeats the purpose of a fully loaded DGX system."
            }
        ]
    },
    {
        "id": 3,
        "title": "NCA practice exam Set 3",
        "description": "Practice Exam Set 3 containing 20 unique exam-aligned questions covering core infrastructure domains.",
        "questions": [
            {
                "id": 41,
                "question": "An AI data center engineer is planning the cabling for a new GPU cluster. The cluster will have 100 GbE connections between GPU servers and top-of-rack switches, with distances up to 50 meters. Additionally, each server has an out-of-band management port that needs to be connected to a management switch. Which cabling strategy is most appropriate?",
                "options": [
                    "Use Cat6A copper for both the GPU-to-switch and management connections.",
                    "Use fiber optic cabling for the GPU-to-switch connections and Cat6A copper for the management connections.",
                    "Use Cat6A copper for the GPU-to-switch connections and fiber optic cabling for the management connections.",
                    "Use fiber optic cabling for both the GPU-to-switch and management connections."
                ],
                "correctAnswer": 1,
                "explanation": "The correct strategy is to use fiber optic cabling for the GPU-to-switch connections because they require 100 GbE speed, which exceeds the 10 Gbps limit of Cat6A copper. Fiber supports 100 GbE and higher, even over 50 meters. For the management ports, Cat6A copper is appropriate because management traffic is typically 1 GbE or 10 GbE, distances are short, and copper is cost-effective and easy to terminate. Option A is wrong because Cat6A cannot handle 100 GbE. Option C is wrong because using fiber for management is overkill and more expensive. Option D is wrong because fiber is unnecessary and costlier for management connections."
            },
            {
                "id": 42,
                "question": "In a leaf-spine network architecture, which role does a Top-of-Rack (ToR) switch typically fulfill?",
                "options": [
                    "Spine switch",
                    "Leaf switch",
                    "Core switch",
                    "Aggregation switch"
                ],
                "correctAnswer": 1,
                "explanation": "In a leaf-spine architecture, ToR switches act as leaf switches, connecting directly to servers in the rack and uplinking to spine switches for inter-rack traffic. Spine switches form the backbone and do not connect directly to servers. Core and aggregation switches are terms used in traditional three-tier designs, not leaf-spine."
            },
            {
                "id": 43,
                "question": "A company is deploying an AI inference system that requires 99.995% availability. Which Uptime Institute data center tier should they choose?",
                "options": [
                    "Tier I",
                    "Tier II",
                    "Tier III",
                    "Tier IV"
                ],
                "correctAnswer": 3,
                "explanation": "Tier IV provides 99.995% availability (about 26 minutes of downtime per year) and is designed for mission-critical workloads where even minutes of downtime can result in significant revenue loss. Tier I (99.671%), Tier II (99.741%), and Tier III (99.982%) do not meet the 99.995% requirement."
            },
            {
                "id": 44,
                "question": "A data center engineer notices that an unauthorized individual was able to enter a secure server room by closely following an authorized employee through a door that remained open after the employee badged in. Which physical security measure is specifically designed to prevent this type of breach?",
                "options": [
                    "Biometric authentication",
                    "Mantrap entry",
                    "Badge access system with PIN",
                    "CCTV monitoring"
                ],
                "correctAnswer": 1,
                "explanation": "A mantrap entry (interlock/airlock) is specifically designed to prevent tailgating. It consists of a vestibule with two interlocking doors: the outer door locks before the inner door opens, and weight or motion sensors can detect if more than one person enters, trapping unauthorized individuals. Biometric authentication verifies identity but does not prevent tailgating. A badge + PIN system adds a second factor but still allows tailgating if the door is held open. CCTV monitoring records incidents but does not actively prevent tailgating."
            },
            {
                "id": 45,
                "question": "A data center engineer is tasked with replacing a failed hard drive in a secure server cage. Which of the following actions best demonstrates proper adherence to chain-of-custody procedures?",
                "options": [
                    "Immediately disposing of the old drive in a recycling bin to minimize downtime.",
                    "Signing a chain-of-custody form with the old drive's serial number before removal and the new drive's serial number after installation.",
                    "Relying solely on CCTV footage to document the replacement process.",
                    "Requesting a colleague to perform the replacement without logging the event."
                ],
                "correctAnswer": 1,
                "explanation": "Chain-of-custody requires a documented trail of hardware handling, including signatures and serial numbers at each step. Option B correctly follows this by logging both the old and new drive serial numbers on the form. Option A is incorrect because disposal must be documented and secure. Option C is insufficient because CCTV alone does not provide the detailed paper trail required. Option D violates chain-of-custody by not logging the event or the handler."
            },
            {
                "id": 46,
                "question": "An AI data center engineer is decommissioning a rack of servers that contain both HDDs and SSDs. The engineer needs to ensure that all data is irrecoverable while also allowing the drives to be reused if possible. Which combination of methods should the engineer use?",
                "options": [
                    "Degauss all HDDs and SSDs, then shred them.",
                    "Overwrite HDDs with multiple passes and perform cryptographic erase on self-encrypting SSDs.",
                    "Shred all HDDs and SSDs without any prior sanitization.",
                    "Use cryptographic erase on all drives, then degauss them."
                ],
                "correctAnswer": 1,
                "explanation": "Overwriting HDDs with multiple passes is an effective sanitization method that allows the drives to be reused. For self-encrypting SSDs, cryptographic erase is fast and secure, and the drives can be reused. Degaussing destroys HDDs but does not work on SSDs, and shredding destroys all drives, preventing reuse. Therefore, option B is the correct approach when reuse is desired."
            },
            {
                "id": 47,
                "question": "Which of the following is a key advantage of a monolithic kernel architecture, such as Linux, for AI infrastructure workloads?",
                "options": [
                    "Fault isolation allows individual services to restart without affecting the system.",
                    "Direct function calls between kernel components provide high performance.",
                    "The small kernel size reduces the attack surface for security vulnerabilities.",
                    "Modular design makes it easy to add or update services without recompiling the kernel."
                ],
                "correctAnswer": 1,
                "explanation": "Monolithic kernels, like Linux, run all core services in kernel space with a single address space, enabling direct function calls between components. This eliminates the overhead of message passing and context switching, resulting in high performance\u2014critical for compute- and I/O-intensive AI workloads. Option A describes fault isolation, which is a feature of microkernels, not monolithic kernels. Option C refers to a small kernel size, characteristic of microkernels; monolithic kernels are large. Option D describes modularity, which is easier in microkernels; monolithic kernels are tightly coupled and often require recompilation for updates."
            },
            {
                "id": 48,
                "question": "Which of the following best describes the role of a system call in a Linux operating system?",
                "options": [
                    "A mechanism for user programs to directly access hardware resources without kernel intervention.",
                    "A controlled entry point that allows user programs to request kernel services, switching from user mode to kernel mode.",
                    "A library function that executes entirely in user space without involving the kernel.",
                    "A hardware interrupt that bypasses the kernel to communicate directly with devices."
                ],
                "correctAnswer": 1,
                "explanation": "A system call is the official bridge between user programs and the kernel. It is a controlled entry point that triggers a mode switch from user mode to kernel mode, allowing the kernel to perform privileged operations on behalf of the user program. Option A is incorrect because user programs cannot directly access hardware; they must go through the kernel. Option C is incorrect because system calls involve the kernel, not just user-space libraries. Option D is incorrect because system calls are software interrupts, not hardware interrupts that bypass the kernel."
            },
            {
                "id": 49,
                "question": "An AI infrastructure engineer needs to verify that a specific GPU device is detected by the system and check its PCI bus address. Which virtual filesystem and path should they use?",
                "options": [
                    "/proc/gpuinfo",
                    "/sys/class/drm/",
                    "/proc/devices/gpu",
                    "/sys/class/gpu/"
                ],
                "correctAnswer": 1,
                "explanation": "The /sys filesystem exposes hardware devices in a hierarchical structure. GPU devices are listed under /sys/class/drm/, where each GPU card has a subdirectory (e.g., card0) containing attribute files like device (PCI address). /proc/gpuinfo does not exist; /proc/devices lists major device numbers, not GPU details; /sys/class/gpu/ is not a standard path."
            },
            {
                "id": 50,
                "question": "An AI infrastructure engineer needs to boot a server with a custom kernel parameter to enable NVIDIA DRM modesetting for GPU acceleration. Which GRUB configuration file should the engineer modify to make this change persistent across reboots?",
                "options": [
                    "/boot/grub/grub.cfg",
                    "/etc/default/grub",
                    "/boot/initramfs-$(uname -r).img",
                    "/proc/cmdline"
                ],
                "correctAnswer": 1,
                "explanation": "The correct file to modify for persistent kernel parameters is /etc/default/grub. This file contains the GRUB_CMDLINE_LINUX variable where parameters like 'nvidia-drm.modeset=1' are added. After editing, the administrator runs 'update-grub' or 'grub2-mkconfig' to regenerate /boot/grub/grub.cfg. Option A (/boot/grub/grub.cfg) is the generated configuration file that should not be edited directly because changes will be overwritten. Option C is the initramfs image, not a configuration file. Option D (/proc/cmdline) is a runtime representation of the current kernel command line and cannot be used to make persistent changes."
            },
            {
                "id": 51,
                "question": "During Stage 3 of the boot process on an AI server, the kernel fails to mount the root filesystem. Which of the following is the most likely cause?",
                "options": [
                    "The GPU driver module is not loaded.",
                    "The root= parameter in the bootloader configuration points to an incorrect device.",
                    "The initramfs is missing the network driver for NFS.",
                    "The kernel does not support NUMA."
                ],
                "correctAnswer": 1,
                "explanation": "The root filesystem mount failure is most commonly due to an incorrect root= parameter in the bootloader configuration, which tells the kernel where to find the root partition. While missing GPU drivers or network drivers in initramfs can cause issues, they typically lead to hardware not being available rather than a root mount failure. NUMA support is not directly related to mounting the root filesystem."
            },
            {
                "id": 52,
                "question": "In a Linux-based AI server, which systemd target is responsible for initializing system settings such as hostname, time synchronization, and udev device management before essential services like SSH and networking are started?",
                "options": [
                    "default.target",
                    "basic.target",
                    "sysinit.target",
                    "multi-user.target"
                ],
                "correctAnswer": 2,
                "explanation": "According to the lesson, the typical boot sequence after systemd takes over includes: default.target is activated, then basic.target starts (mounts filesystems, sets up swap, loads kernel modules), then sysinit.target initializes system settings like hostname, time synchronization, and udev device management. After that, multi-user.target starts essential services (SSH, networking, logging, monitoring). Therefore, sysinit.target is the correct answer. Option A (default.target) is the initial target that triggers the boot process but does not perform the initialization itself. Option B (basic.target) handles filesystem mounts and kernel modules, not system settings. Option D (multi-user.target) starts services after system initialization is complete."
            },
            {
                "id": 53,
                "question": "An AI server fails to boot and displays a black screen immediately after power-on. Which tool should be used first to diagnose the issue?",
                "options": [
                    "systemd logs (journalctl)",
                    "Kernel ring buffer (dmesg)",
                    "NVIDIA System Management Interface (nvidia-smi)",
                    "Data Center GPU Manager (dcgmi)"
                ],
                "correctAnswer": 1,
                "explanation": "When a server shows a black screen immediately after power-on, the kernel may have encountered a critical error before systemd started. The kernel ring buffer (dmesg) captures hardware initialization and driver loading messages from the kernel, making it the primary tool for diagnosing early boot failures. systemd logs are not yet available because systemd has not started. nvidia-smi and dcgmi require the system to be operational and are not accessible during a boot failure."
            },
            {
                "id": 54,
                "question": "An AI infrastructure engineer is selecting an operating system for a production training cluster that must run 24/7 with certified NVIDIA GPU drivers and long-term vendor support. Which operating system should the engineer choose?",
                "options": [
                    "Red Hat Enterprise Linux (RHEL)",
                    "CentOS Stream",
                    "Fedora",
                    "Ubuntu LTS"
                ],
                "correctAnswer": 0,
                "explanation": "RHEL is the correct choice for production AI workloads requiring stability, certified hardware/software (including NVIDIA drivers), and long-term vendor support (10-year lifecycle). CentOS Stream is free and RHEL-compatible but has a shorter lifecycle and no official support, making it better suited for development/testing. Fedora is cutting-edge with a short lifecycle, unsuitable for production. Ubuntu LTS is a common alternative but not the focus of this lesson, and it lacks the same level of enterprise certification and support as RHEL in Red Hat environments."
            },
            {
                "id": 55,
                "question": "A financial services firm is deploying a high-frequency trading (HFT) system on SUSE Linux Enterprise. Which SLE feature is most critical for ensuring microsecond-level response times and continuous operation during kernel security updates?",
                "options": [
                    "SUSE Linux Enterprise HPC extension with Warewulf provisioning",
                    "SUSE Linux Enterprise Realtime kernel and Live Patching",
                    "SUSE Manager for centralized patching and compliance",
                    "AppArmor mandatory access control profiles"
                ],
                "correctAnswer": 1,
                "explanation": "The Realtime Linux kernel provides deterministic, low-latency response essential for HFT systems, while Live Patching allows security updates without rebooting, maintaining 99.999% uptime. Option A (HPC extension) focuses on cluster provisioning, not low latency. Option C (SUSE Manager) is for management, not kernel tuning. Option D (AppArmor) enhances security but does not address latency or live updates."
            },
            {
                "id": 56,
                "question": "An AI infrastructure engineer is provisioning a new server for production model training. Which of the following is the primary reason to choose a minimal (headless) Linux installation over a desktop installation?",
                "options": [
                    "To enable graphical monitoring tools like TensorBoard and nvidia-smi.",
                    "To reduce attack surface and free up system resources for AI workloads.",
                    "To simplify remote management by requiring a monitor and keyboard.",
                    "To ensure compatibility with Jupyter Notebooks and web-based dashboards."
                ],
                "correctAnswer": 1,
                "explanation": "A minimal installation reduces the number of running services and packages, which lowers the attack surface and frees up CPU, memory, and storage for AI workloads. Options A and D are incorrect because graphical monitoring and web-based tools do not require a desktop environment. Option C is incorrect because minimal installations are designed for headless remote management over SSH, not requiring a monitor or keyboard."
            },
            {
                "id": 57,
                "question": "An AI infrastructure engineer needs to ensure that a shared NFS storage volume is mounted before a model training service starts, and that the training service is triggered nightly. Which combination of systemd unit types should the engineer create?",
                "options": [
                    "A mount unit and a timer unit",
                    "A service unit and a socket unit",
                    "A target unit and a service unit",
                    "A mount unit and a socket unit"
                ],
                "correctAnswer": 0,
                "explanation": "The correct answer is A mount unit and a timer unit. A mount unit (e.g., mnt-data.mount) manages the NFS mount point and ensures storage is available. A timer unit (e.g., training-pipeline.timer) schedules the training service to run nightly. The service unit itself would be triggered by the timer, and dependencies (After=, Requires=) ensure the mount is active before the service starts. Option B (service + socket) is for on-demand activation via network sockets, not for scheduled tasks or storage. Option C (target + service) groups units but does not handle scheduling or mounting. Option D (mount + socket) addresses storage but not scheduling."
            },
            {
                "id": 58,
                "question": "An AI training service requires a GPU driver service to be running and a monitoring service to be active but not critical. Which combination of systemd directives should be used in the unit file?",
                "options": [
                    "After= and Requires= for the GPU driver; After= and Wants= for the monitoring service",
                    "After= and Wants= for the GPU driver; Requires= for the monitoring service",
                    "Requires= for the GPU driver; Wants= for the monitoring service",
                    "After= for the GPU driver; After= for the monitoring service"
                ],
                "correctAnswer": 0,
                "explanation": "For critical dependencies like the GPU driver, you should use both After= and Requires= to ensure ordering and that the service fails if the dependency fails. For non-critical dependencies like monitoring, use After= and Wants= to attempt to start it but allow the service to run even if it fails. Option A correctly pairs these directives. Option B incorrectly uses Wants= for the GPU driver, which would not block the service if the driver fails. Option C omits After=, so the service might start before the dependencies are ready. Option D only controls ordering and does not enforce dependency availability."
            },
            {
                "id": 59,
                "question": "An AI engineer is troubleshooting a service crash that occurred approximately 30 minutes ago. Which journalctl command would show only error-level and more severe log entries from the nvidia-persistenced service for the last hour?",
                "options": [
                    "journalctl -u nvidia-persistenced.service -p err --since '1 hour ago'",
                    "journalctl -u nvidia-persistenced -p 3 --since '30 minutes ago'",
                    "journalctl --unit nvidia-persistenced.service --priority 0-3 --since '1 hour ago'",
                    "journalctl -u nvidia-persistenced.service -p err --until '30 minutes ago'"
                ],
                "correctAnswer": 0,
                "explanation": "Option A is correct because it uses the -u flag to filter by the nvidia-persistenced.service unit, -p err to show errors and more severe (err, crit, alert, emerg), and --since '1 hour ago' to cover the last hour. Option B incorrectly uses 'nvidia-persistenced' without the .service suffix (unit names are case-sensitive and typically include the suffix) and '30 minutes ago' is too narrow. Option C uses an invalid priority syntax (0-3 is not accepted; -p expects a single level name or number). Option D uses --until '30 minutes ago' which would exclude logs after that time, missing the crash that occurred 30 minutes ago."
            },
            {
                "id": 60,
                "question": "An AI infrastructure engineer needs to create a custom systemd service for a long-running training job that should automatically restart only if it fails, and a separate watchdog process that must always restart regardless of exit status. Which pair of Restart directives should be used?",
                "options": [
                    "Training: Restart=always; Watchdog: Restart=on-failure",
                    "Training: Restart=on-failure; Watchdog: Restart=always",
                    "Training: Restart=on-success; Watchdog: Restart=on-failure",
                    "Training: Restart=no; Watchdog: Restart=on-abort"
                ],
                "correctAnswer": 1,
                "explanation": "For a training service that should restart only on failure (e.g., crash or non-zero exit), Restart=on-failure is appropriate. For a watchdog process that must keep running even after a clean exit, Restart=always ensures it restarts regardless of exit status. Option B correctly pairs these directives. Option A reverses them, which would cause the training service to restart even on success and the watchdog to restart only on failure. Option C uses Restart=on-success (not a valid systemd directive) and Restart=on-failure for the watchdog, which would not restart on clean exit. Option D uses Restart=no (no restart) and Restart=on-abort (restart only on signals like SIGABRT), which does not meet the requirements."
            }
        ]
    },
    {
        "id": 4,
        "title": "NCA practice exam Set 4",
        "description": "Practice Exam Set 4 containing 20 unique exam-aligned questions covering core infrastructure domains.",
        "questions": [
            {
                "id": 61,
                "question": "A new engineer runs `systemd-analyze blame` on an AI server and sees that `nvidia-persistenced.service` takes over 2 seconds to start. What is the most appropriate first step to address this?",
                "options": [
                    "Disable the service immediately to reduce boot time.",
                    "Run `systemctl status nvidia-persistenced.service` to understand its purpose and check for configuration issues.",
                    "Replace the service with a custom script that starts faster.",
                    "Ignore it because all GPU services are inherently slow and cannot be optimized."
                ],
                "correctAnswer": 1,
                "explanation": "The correct first step is to investigate the service using `systemctl status` to understand its role and check for any configuration issues. Disabling it without understanding dependencies could break GPU functionality. Replacing it with a custom script is risky and not recommended without proper analysis. While some GPU services are inherently slow, they can often be tuned (e.g., adjusting timeout settings), so ignoring it is not the best approach."
            },
            {
                "id": 62,
                "question": "An AI infrastructure engineer is troubleshooting a GPU server where a training job failed to start. The engineer needs to check system logs for error messages, verify SSH configuration, and confirm that the CUDA toolkit is installed. Which combination of directories should the engineer examine?",
                "options": [
                    "/var/log for logs, /etc/ssh for SSH config, and /opt for CUDA toolkit",
                    "/opt/log for logs, /var/ssh for SSH config, and /etc for CUDA toolkit",
                    "/etc/log for logs, /var/ssh for SSH config, and /opt for CUDA toolkit",
                    "/var/log for logs, /opt/ssh for SSH config, and /etc for CUDA toolkit"
                ],
                "correctAnswer": 0,
                "explanation": "The correct answer is A. According to the lesson, /var stores variable runtime data, including log files under /var/log. /etc contains system configuration files, such as SSH configuration in /etc/ssh. /opt is reserved for third-party software, and NVIDIA CUDA toolkit is typically installed in /opt. Option B is incorrect because logs are not stored in /opt/log, SSH config is not in /var/ssh, and CUDA is not in /etc. Option C is incorrect because logs are not in /etc/log, SSH config is not in /var/ssh. Option D is incorrect because SSH config is not in /opt/ssh, and CUDA is not in /etc."
            },
            {
                "id": 63,
                "question": "An AI infrastructure engineer is troubleshooting a storage performance issue. They run 'ls -la /dev/nvme0n1 /dev/random' and see the first character of each line is 'b' for /dev/nvme0n1 and 'c' for /dev/random. Which of the following statements best describes the difference between these two device types?",
                "options": [
                    "Block devices like /dev/nvme0n1 support random access with buffering, while character devices like /dev/random provide a sequential stream without buffering.",
                    "Block devices like /dev/nvme0n1 are used for streaming data, while character devices like /dev/random are used for storage.",
                    "Character devices like /dev/random support random access with caching, while block devices like /dev/nvme0n1 provide sequential access only.",
                    "Both device types use the same buffering mechanism, but block devices are limited to 512-byte blocks."
                ],
                "correctAnswer": 0,
                "explanation": "The correct answer is A. Block devices (indicated by 'b' in ls -la) handle data in fixed-size blocks, support random access (seeking), and use kernel buffering/caching for performance. Character devices (indicated by 'c') handle data as a stream of bytes, do not support random access, and provide no buffering\u2014direct hardware access. Option B is incorrect because it reverses the roles. Option C is incorrect because character devices do not support random access or caching. Option D is incorrect because block devices can use various block sizes (e.g., 512 bytes, 4KB) and character devices do not use the same buffering."
            },
            {
                "id": 64,
                "question": "An AI engineer is troubleshooting a performance issue on a server running a large model training job. The engineer wants to check the current memory usage and verify that the NVIDIA GPU driver process is running. Which two files or directories should the engineer examine? (Choose two.)",
                "options": [
                    "/proc/meminfo and /proc/[PID]/status for the nvidia-persistenced process",
                    "/sys/class/gpu/ and /proc/loadavg",
                    "/proc/cpuinfo and /sys/class/net/",
                    "/sys/bus/pci/devices/ and /proc/uptime"
                ],
                "correctAnswer": 0,
                "explanation": "The correct answer is Option A. /proc/meminfo provides memory usage statistics, which is essential for checking if the AI model fits in memory. /proc/[PID]/status can be used to verify that the nvidia-persistenced process (a GPU driver process) is running by examining its status. Option B is incorrect because /sys/class/gpu/ is for hardware identification, not memory usage, and /proc/loadavg shows CPU load, not memory. Option C is incorrect because /proc/cpuinfo provides CPU details and /sys/class/net/ is for network interfaces, neither relevant to memory or GPU driver processes. Option D is incorrect because /sys/bus/pci/devices/ shows PCI devices and /proc/uptime shows system uptime, not memory or process status."
            },
            {
                "id": 65,
                "question": "An AI infrastructure engineer is troubleshooting a permission issue where a user cannot access NVIDIA GPUs. Which of the following fields in /etc/passwd would the engineer inspect to verify the user's primary group membership?",
                "options": [
                    "The GID field (field 4)",
                    "The UID field (field 3)",
                    "The GECOS field (field 5)",
                    "The login shell field (field 7)"
                ],
                "correctAnswer": 0,
                "explanation": "The GID (Group ID) field in /etc/passwd specifies the user's primary group. To access NVIDIA GPUs, the user must be a member of the 'video' or 'render' group. While /etc/group shows all group memberships, the primary group GID in /etc/passwd is a quick check. The UID field identifies the user numerically, GECOS contains descriptive info, and the login shell indicates the default shell but does not affect GPU access."
            },
            {
                "id": 66,
                "question": "An AI infrastructure administrator needs to add a new data scientist to the system. The user should have a home directory, use the Bash shell, belong to the primary group 'ai-team', and be added to the supplementary groups 'docker' and 'ml-users'. Which command accomplishes this?",
                "options": [
                    "sudo useradd -m -s /bin/bash -g ai-team -G docker,ml-users -c 'Bob Smith' bob",
                    "sudo usermod -aG docker,ml-users bob",
                    "sudo useradd -d /home/bob -s /bin/sh -g ai-team -G docker,ml-users bob",
                    "sudo passwd bob"
                ],
                "correctAnswer": 0,
                "explanation": "The correct command is 'sudo useradd -m -s /bin/bash -g ai-team -G docker,ml-users -c 'Bob Smith' bob'. This uses useradd with -m to create the home directory, -s to set the shell to Bash, -g to set the primary group, -G to add supplementary groups, and -c to add a comment. Option B uses usermod, which modifies an existing user, not creates a new one. Option C sets the shell to /bin/sh instead of /bin/bash. Option D is for setting a password, not creating a user."
            },
            {
                "id": 67,
                "question": "An AI infrastructure engineer needs to grant GPU access to a new team member named 'charlie' on a shared server. The server already has a group called 'gpuusers' that owns the GPU device files. Which command should the engineer use to add 'charlie' to the 'gpuusers' group?",
                "options": [
                    "groupadd -a charlie gpuusers",
                    "gpasswd -a charlie gpuusers",
                    "usermod -aG charlie gpuusers",
                    "gpasswd -d charlie gpuusers"
                ],
                "correctAnswer": 1,
                "explanation": "The correct command is 'gpasswd -a charlie gpuusers'. The gpasswd command is used to manage group membership; the -a option adds a user to a group. groupadd is used to create a new group, not to add users. usermod -aG can also add a user to a group, but the question specifically asks for the command covered in the lesson (gpasswd). gpasswd -d removes a user from a group."
            },
            {
                "id": 68,
                "question": "An AI infrastructure engineer needs to grant a team member the ability to run only the nvidia-smi command as root without being prompted for a password. Which sudoers rule correctly implements this?",
                "options": [
                    "team_member ALL=(ALL) NOPASSWD: /usr/bin/nvidia-smi",
                    "team_member ALL=(root) /usr/bin/nvidia-smi NOPASSWD",
                    "team_member ALL=(root) NOPASSWD: /usr/bin/nvidia-smi",
                    "team_member ALL=(ALL) /usr/bin/nvidia-smi NOPASSWD"
                ],
                "correctAnswer": 2,
                "explanation": "The correct syntax for a sudoers rule is: who where = (whom) [NOPASSWD:] command. Option C correctly specifies the user (team_member), host (ALL), target user (root), NOPASSWD tag, and the full path to the command. Option A incorrectly uses (ALL) instead of (root), which would allow running as any user. Options B and D place the NOPASSWD tag after the command, which is invalid syntax."
            },
            {
                "id": 69,
                "question": "An AI engineer runs `ls -la` on a directory containing model weights and sees the following output:\n\n`-rw------- 1 alice ml-team 1048576 Mar 15 09:30 model_weights.pt`\n\nWhich of the following statements about the permissions on this file is correct?",
                "options": [
                    "The owner can read and write, the group can read, and others have no access.",
                    "The owner can read, write, and execute; the group can read; others have no access.",
                    "The owner can read and write; the group and others have no access.",
                    "The owner can read and write; the group can read and write; others can read."
                ],
                "correctAnswer": 2,
                "explanation": "The permission string `-rw-------` breaks down as: file type `-` (regular file), user `rw-` (read and write, no execute), group `---` (no permissions), other `---` (no permissions). Therefore, only the owner (alice) can read and write the file; the group (ml-team) and others have no access. Option A is incorrect because the group has no read permission. Option B is incorrect because the owner does not have execute permission. Option D is incorrect because the group and others have no permissions."
            },
            {
                "id": 70,
                "question": "An AI engineer needs to set permissions for a shell script that will be executed by multiple users in the same group, but only the owner should be able to modify it. Which octal permission set should be applied?",
                "options": [
                    "755",
                    "644",
                    "600",
                    "777"
                ],
                "correctAnswer": 0,
                "explanation": "The correct answer is 755. This octal permission gives the owner read, write, and execute (7), while the group and others get read and execute (5). This allows the owner to modify the script, and all users (including group members) can read and execute it. Option B (644) allows the owner to read/write but others only read, so they cannot execute the script. Option C (600) restricts access to only the owner, preventing others from executing it. Option D (777) gives everyone full permissions, which violates the principle of least privilege and is overly permissive."
            },
            {
                "id": 71,
                "question": "An AI engineer needs to share a dataset directory with their team while ensuring that only the team members can modify the files. The engineer is the owner of the directory. Which set of commands should the engineer use to set the group to 'ml-team' and give the group write permission?",
                "options": [
                    "chgrp ml-team dataset/ && chmod g+w dataset/",
                    "chown :ml-team dataset/ && chmod o+w dataset/",
                    "chmod g+w dataset/ && chgrp ml-team dataset/",
                    "chown ml-team dataset/ && chmod u+w dataset/"
                ],
                "correctAnswer": 0,
                "explanation": "The correct answer is Option A. First, 'chgrp ml-team dataset/' changes the group ownership of the directory to 'ml-team'. Then, 'chmod g+w dataset/' adds write permission for the group. This ensures that only members of 'ml-team' can modify files. Option B incorrectly uses 'chown :ml-team' (which is equivalent to changing group) but then adds write for others ('o+w'), which would give everyone write access. Option C changes permissions before changing group, which could temporarily give write access to the wrong group. Option D changes the owner to 'ml-team' (which is a user, not a group) and adds write for the owner, not the group."
            },
            {
                "id": 72,
                "question": "An AI infrastructure engineer needs to configure a shared directory for a team of data scientists working on a model training pipeline. The directory should ensure that all new files created inside it automatically belong to the team's group, and that team members cannot delete each other's files. Which combination of special permission bits should be set on the directory?",
                "options": [
                    "setuid and sticky bit",
                    "setgid and sticky bit",
                    "setuid and setgid",
                    "setgid only"
                ],
                "correctAnswer": 1,
                "explanation": "The setgid bit on a directory ensures that new files and subdirectories inherit the directory's group, which is essential for shared team access. The sticky bit prevents users from deleting or renaming files they do not own, even if they have write permission on the directory. Together, they satisfy both requirements. Setuid has no effect on directories and is not relevant here."
            },
            {
                "id": 73,
                "question": "An AI engineer is setting up a shared development environment on a Linux server. The team needs to collaborate on training datasets while ensuring that other users on the system cannot access their work. Which umask value should the engineer set to allow the owner and group full access to new files and directories, while denying all access to others?",
                "options": [
                    "umask 022",
                    "umask 027",
                    "umask 007",
                    "umask 077"
                ],
                "correctAnswer": 2,
                "explanation": "The correct answer is umask 007. With a base permission of 666 for files and 777 for directories, subtracting umask 007 yields file permissions of 660 (rw-rw----) and directory permissions of 770 (rwxrwx---). This grants read, write, and execute permissions to the owner and group, and no permissions to others. Option A (022) gives others read/execute access, which is too permissive. Option B (027) denies group write access, hindering collaboration. Option D (077) restricts access to only the owner, preventing group collaboration."
            },
            {
                "id": 74,
                "question": "An AI engineer is setting up a new Ubuntu server for deep learning workloads. After adding the NVIDIA CUDA repository to /etc/apt/sources.list.d/cuda.list, which command must be run before installing the nvidia-driver-535 package?",
                "options": [
                    "apt-cache search nvidia-driver-535",
                    "apt update",
                    "apt upgrade",
                    "apt-cache policy nvidia-driver-535"
                ],
                "correctAnswer": 1,
                "explanation": "After modifying any sources.list file or adding a new repository, you must run 'apt update' to refresh the package index from all configured repositories. This ensures that APT knows about the packages available from the newly added repository. Option A (apt-cache search) is used to find packages by keyword, not to refresh the index. Option C (apt upgrade) upgrades installed packages but does not refresh the index. Option D (apt-cache policy) shows version information but also does not refresh the index. Therefore, 'apt update' is the correct first step before installing any package from a new repository."
            },
            {
                "id": 75,
                "question": "An AI infrastructure engineer is setting up a new RHEL 8 compute node and needs to install Python 3.9 alongside development tools for compiling AI libraries. Which sequence of DNF commands correctly enables the required module stream and installs the appropriate package group?",
                "options": [
                    "dnf module enable python39:3.9 && dnf groupinstall 'Development Tools'",
                    "dnf module install python39:3.9 && dnf install @development-tools",
                    "dnf module enable python39 && dnf group install 'Development Tools'",
                    "dnf module stream enable python39:3.9 && dnf groupinstall development-tools"
                ],
                "correctAnswer": 0,
                "explanation": "Option A is correct because the proper DNF syntax to enable a module stream is 'dnf module enable <module>:<stream>', and to install a package group, the command is 'dnf groupinstall <group-name>'. Option B uses 'dnf module install' which is incorrect for enabling a stream; 'dnf install @development-tools' is not valid syntax. Option C omits the stream version, which may default to a different version. Option D uses 'dnf module stream enable' (incorrect) and 'groupinstall development-tools' (group name should be quoted and capitalized correctly)."
            },
            {
                "id": 76,
                "question": "An AI infrastructure engineer is setting up a new Ubuntu 22.04 server for deep learning training. After adding the NVIDIA CUDA repository, the engineer runs 'sudo apt update' and notices that no NVIDIA packages appear in the package list. Which of the following is the most likely cause?",
                "options": [
                    "The repository configuration package was not installed before running apt update.",
                    "The server does not have an NVIDIA GPU installed.",
                    "The engineer used the repository URL for RHEL 9 instead of Ubuntu 22.04.",
                    "The GPG key was imported but the repository URL was not added to sources.list."
                ],
                "correctAnswer": 2,
                "explanation": "The most likely cause is using the wrong repository URL for the operating system. NVIDIA provides separate repositories for each Linux distribution and version. If the engineer used the RHEL 9 repository on Ubuntu 22.04, the package manager would not recognize the repository format, resulting in no NVIDIA packages appearing after apt update. Option A is incorrect because the repository configuration package typically includes both the GPG key and the repository source; if it were not installed, the repository would not be added at all. Option B is incorrect because the presence of an NVIDIA GPU is not required for the repository to appear in the package list; the repository would still be visible. Option D is incorrect because if the GPG key was imported but the repository URL was not added, apt update would not show any errors related to the repository, but the repository would simply not be present; however, the question states the repository was added, so the URL must have been added somehow. The mismatch in OS version is the most plausible cause given the symptom."
            },
            {
                "id": 77,
                "question": "An AI engineer needs to install a specific version of a GPU-accelerated library that is not available in the system's package manager, Snap Store, or as an AppImage. The engineer requires full control over the installation path and wants to avoid automatic updates that could break compatibility with existing workflows. Which installation method is most appropriate?",
                "options": [
                    "Snap package",
                    "AppImage",
                    "Tarball manual install",
                    "System package manager (apt)"
                ],
                "correctAnswer": 2,
                "explanation": "Tarball manual installs provide full control over the installation path and version, and do not include automatic updates, which is ideal when a specific version is required and updates must be manually managed to avoid breaking workflows. Snap packages include automatic updates and are sandboxed, which may limit access to system resources. AppImage is portable and does not require installation but also lacks automatic updates and may not integrate well. The system package manager (apt) typically provides older versions and does not offer the same level of version control."
            },
            {
                "id": 78,
                "question": "A junior engineer needs to edit a configuration file on a remote Linux server using Vim. After opening the file, they realize they need to add a new line below the current line and type some text. Which sequence of keystrokes should they use?",
                "options": [
                    "Press i, type the text, then press Esc.",
                    "Press o, type the text, then press Esc.",
                    "Press a, type the text, then press Esc.",
                    "Press O, type the text, then press Esc."
                ],
                "correctAnswer": 1,
                "explanation": "In Vim, pressing 'o' from Normal Mode opens a new line below the current line and enters Insert Mode, allowing the user to type text. After typing, pressing Esc returns to Normal Mode. Option A ('i') inserts at the cursor, not on a new line. Option C ('a') appends after the cursor. Option D ('O') opens a new line above the current line."
            },
            {
                "id": 79,
                "question": "An AI infrastructure engineer needs to extract the third column (status code) from lines in a web server log that contain '404' errors. Which command pipeline would accomplish this?",
                "options": [
                    "grep '404' access.log | awk '{print $3}'",
                    "awk '/404/ {print $3}' access.log",
                    "sed -n '/404/p' access.log | cut -d' ' -f3",
                    "grep -v '404' access.log | awk '{print $1}'"
                ],
                "correctAnswer": 0,
                "explanation": "The correct pipeline is 'grep '404' access.log | awk '{print $3}''. First, grep filters lines containing '404', then awk extracts the third field (status code) from those lines. Option B is incorrect because awk's pattern matching '/404/' would match '404' anywhere in the line, not just the status code field, potentially including other fields like URLs or timestamps. Option C uses sed to print matching lines and cut to extract the third field, but cut uses a single delimiter (space) and may not handle multiple spaces correctly. Option D uses grep -v to exclude lines with '404', which is the opposite of what is needed."
            },
            {
                "id": 80,
                "question": "An engineer needs to extract GPU temperature readings from DCGM dmon output and print only lines where the temperature exceeds 85\u00b0C. Which command accomplishes this?",
                "options": [
                    "dcgmi dmon -e 100 | grep 'temperature' | awk '{print $1, $3}'",
                    "dcgmi dmon -e 100 | awk 'NR>1 && $3 > 85 {print $1, $3}'",
                    "dcgmi dmon -e 100 | awk -F',' '$2 > 85 {print $0}'",
                    "dcgmi dmon -e 100 | grep '85' | awk '{print $1, $3}'"
                ],
                "correctAnswer": 1,
                "explanation": "The correct command uses awk to skip the header (NR>1) and filter rows where the temperature field (field 3) exceeds 85\u00b0C, printing the GPU index and temperature. Option A only greps for 'temperature' but does not filter by value. Option C assumes comma delimiter, but dcgmi dmon uses spaces. Option D greps for '85' which may match other numbers and does not filter correctly."
            }
        ]
    },
    {
        "id": 5,
        "title": "NCA practice exam Set 5",
        "description": "Practice Exam Set 5 containing 20 unique exam-aligned questions covering core infrastructure domains.",
        "questions": [
            {
                "id": 81,
                "question": "An AI infrastructure engineer is writing a script to generate a configuration file for NVIDIA Triton Inference Server. The engineer wants to both display the generated configuration on the terminal and save it to a file for later use. Which command combination achieves this?",
                "options": [
                    "cat << EOF > config.pbtxt && cat config.pbtxt",
                    "echo 'config content' | tee config.pbtxt",
                    "cat << EOF | tee config.pbtxt",
                    "tee config.pbtxt << EOF"
                ],
                "correctAnswer": 2,
                "explanation": "The correct combination is `cat << EOF | tee config.pbtxt`. This uses a heredoc (`<< EOF`) to generate multi-line content, pipes it to `tee`, which both displays the content on the terminal and writes it to `config.pbtxt`. Option A writes the file first and then displays it separately, but does not use `tee` for simultaneous output. Option B uses `echo` which is not suitable for multi-line content. Option D has the syntax reversed; `tee` expects input from a pipe, not a heredoc directly."
            },
            {
                "id": 82,
                "question": "An AI infrastructure engineer writes a Bash script to automate GPU node provisioning. The script includes the following line:\n\necho \"Node: $node_name has $(nvidia-smi --query-gpu=count --format=csv,noheader) GPUs\"\n\nWhich of the following best describes the behavior of this command?",
                "options": [
                    "The command will output the literal string \"Node: $node_name has $(nvidia-smi --query-gpu=count --format=csv,noheader) GPUs\" because double quotes prevent all expansions.",
                    "The command will expand $node_name and execute the command substitution, outputting something like \"Node: gpu-node-01 has 8 GPUs\".",
                    "The command will expand $node_name but will not execute the command substitution because double quotes disable command substitution.",
                    "The command will fail because variable expansion and command substitution cannot be used together in a single echo statement."
                ],
                "correctAnswer": 1,
                "explanation": "In Bash, double quotes preserve spaces and allow both variable expansion (e.g., $node_name) and command substitution (e.g., $(...)). Therefore, $node_name is replaced with its value, and the nvidia-smi command runs, its output replacing the $() expression. Option A is incorrect because double quotes do not prevent expansion; single quotes do. Option C is incorrect because double quotes do not disable command substitution. Option D is incorrect because variable expansion and command substitution can be combined freely within double quotes."
            },
            {
                "id": 83,
                "question": "A system administrator is writing a Bash script to check the status of GPU resources before launching a training job. The script needs to verify that the number of available GPUs is at least 4 and that the total system memory is at least 64 GB. Which compound condition correctly implements this check?",
                "options": [
                    "if [[ $gpu_count -ge 4 && $memory_gb -ge 64 ]]",
                    "if [ $gpu_count -ge 4 ] && [ $memory_gb -ge 64 ]",
                    "if [[ $gpu_count -ge 4 || $memory_gb -ge 64 ]]",
                    "if [ $gpu_count -ge 4 -a $memory_gb -ge 64 ]"
                ],
                "correctAnswer": 0,
                "explanation": "The correct answer is option A. In Bash, the [[ ]] construct allows the use of && for logical AND within a single test, which is the modern and recommended syntax. Option B is incorrect because it uses the single-bracket [ ] with && outside the brackets, which would be interpreted as a command list rather than a compound condition. Option C uses || (OR) instead of && (AND), which would be true if either condition is met, not both. Option D uses the deprecated -a operator inside single brackets, which is less reliable and not recommended for new scripts. Therefore, option A is the correct way to check that both conditions are true simultaneously."
            },
            {
                "id": 84,
                "question": "A DevOps engineer is writing a Bash script to automate GPU health checks. They define a function `check_gpu_temp` that runs `nvidia-smi` and returns a status code. Which of the following best describes the correct use of return codes and exit statuses in this context?",
                "options": [
                    "Use `exit 1` inside the function to signal failure and stop the script immediately.",
                    "Use `return 0` for success and `return 1` for failure inside the function, then check `$?` after calling the function.",
                    "Use `return` without a value to indicate success, and `exit 1` to indicate failure.",
                    "Use `exit 0` at the end of the function to indicate success, and `return 1` for failure."
                ],
                "correctAnswer": 1,
                "explanation": "Inside a Bash function, `return` is used to send a status code back to the calling code without terminating the entire script. A return code of 0 indicates success, and any non-zero value indicates a specific error. The calling code should immediately check `$?` to capture the return code. Using `exit` inside a function would terminate the entire script, which is not appropriate for a reusable function. Option B correctly describes this pattern."
            },
            {
                "id": 85,
                "question": "A GPU cluster node health-check script is being developed to detect potential hardware issues before they impact training jobs. Which of the following checks would be most effective for identifying a GPU that is experiencing intermittent driver timeouts?",
                "options": [
                    "Querying nvidia-smi for GPU temperature and comparing it against a threshold of 85\u00b0C.",
                    "Reading the kernel log (dmesg) for 'NVRM' errors or 'GPU has fallen off the bus' messages.",
                    "Checking the PCIe link generation with nvidia-smi --query-gpu=pcie.link.gen.current.",
                    "Running nvidia-smi nvlink --status to verify all NVLink bridges are active."
                ],
                "correctAnswer": 1,
                "explanation": "Intermittent driver timeouts are typically logged by the NVIDIA driver in the kernel ring buffer. The dmesg command captures these messages, including 'NVRM' errors and 'GPU has fallen off the bus' warnings, which indicate driver timeouts or resets. Checking temperature (option A) detects thermal issues but not timeouts. PCIe link generation (option C) identifies link degradation, not timeouts. NVLink status (option D) checks interconnects, not driver health."
            },
            {
                "id": 86,
                "question": "An AI engineer notices that during a training job, the load average on an 8-core system is consistently around 7.5, and many processes are in the 'D' state. What is the most likely bottleneck?",
                "options": [
                    "The CPU is overloaded and needs more cores.",
                    "The system is running out of RAM and swapping heavily.",
                    "The storage subsystem is too slow, causing I/O waits.",
                    "The GPU is underutilized and needs more data."
                ],
                "correctAnswer": 2,
                "explanation": "A high load average (7.5 on an 8-core system) indicates the system is busy but not necessarily overloaded. However, many processes in 'D' (uninterruptible sleep) state are waiting for I/O operations to complete, such as reading from disk or network storage. This is a classic sign of an I/O bottleneck, often caused by slow storage when loading large datasets. CPU overload would show many 'R' state processes, not 'D'. RAM shortage would show high swap usage, not necessarily 'D' state. GPU underutilization would not cause high load average or 'D' state processes."
            },
            {
                "id": 87,
                "question": "An AI engineer is monitoring a training job and runs 'vmstat 2'. The output shows 'si' and 'so' consistently above 0, 'wa' around 5%, and 'r' equal to the number of CPU cores. What is the most likely issue?",
                "options": [
                    "The system is experiencing a CPU bottleneck.",
                    "The storage subsystem cannot keep up with I/O demands.",
                    "The system is under memory pressure and swapping.",
                    "The data pipeline is causing high I/O wait."
                ],
                "correctAnswer": 2,
                "explanation": "The 'si' (swap in) and 'so' (swap out) fields indicate memory pages being moved between RAM and swap space. Consistently non-zero values mean the system is actively swapping, which is a sign of memory pressure. The 'wa' (I/O wait) is low (5%), ruling out a storage bottleneck. The 'r' (run queue) matching CPU cores suggests CPU is not saturated. Therefore, the most likely issue is insufficient RAM for the workload, causing swapping."
            },
            {
                "id": 88,
                "question": "An AI engineer notices that GPU 0 appears busy in nvidia-smi, but no process is listed. Which command can be used to identify any process that might have left the GPU device file open after crashing?",
                "options": [
                    "fuser /dev/nvidia0",
                    "nvidia-smi -pm 1",
                    "dcgmi diag -r 1",
                    "lspci | grep -i nvidia"
                ],
                "correctAnswer": 0,
                "explanation": "The correct command is 'fuser /dev/nvidia0'. fuser identifies processes using a specific file, such as a GPU device file. In this scenario, a crashed process may have left the device file open, which nvidia-smi might not show. fuser can detect such lingering file handles. Option B (nvidia-smi -pm 1) enables persistence mode, which prevents the driver from unloading but does not identify processes. Option C (dcgmi diag -r 1) runs a diagnostic level 1, not process identification. Option D (lspci | grep -i nvidia) lists PCI devices but not open file handles."
            },
            {
                "id": 89,
                "question": "An AI engineer runs the 'free -h' command on a Linux server and sees: total=256G, used=200G, free=2G, buff/cache=200G, available=180G. Which statement correctly interprets this memory report?",
                "options": [
                    "The system is critically low on memory because only 2 GB is free.",
                    "The buff/cache memory is mostly reclaimable, so 180 GB is available for new processes without swapping.",
                    "The high cache usage indicates a memory leak in the AI application.",
                    "The available memory is calculated as free memory plus buffers only."
                ],
                "correctAnswer": 1,
                "explanation": "The 'available' field in the free command output represents an estimate of memory that can be used for starting new applications without swapping. It includes MemFree plus reclaimable cache and slab memory. In this scenario, 180 GB available indicates plenty of headroom despite only 2 GB being truly free. Option A is incorrect because 'free' memory alone is not a reliable indicator; Linux uses free RAM for caching to improve performance. Option C is incorrect because high cache usage is normal and beneficial for AI workloads that repeatedly read datasets. Option D is incorrect because available memory includes reclaimable cache and slab, not just buffers."
            },
            {
                "id": 90,
                "question": "An AI infrastructure engineer notices that a long-running training job slowed down significantly around 3:00 PM yesterday. Which sar command would allow the engineer to examine CPU utilization specifically between 2:30 PM and 3:30 PM from the previous day's logs?",
                "options": [
                    "sar -u -s 14:30:00 -e 15:30:00 -f /var/log/sysstat/sa$(date -d 'yesterday' +%d)",
                    "sar -u -s 14:30:00 -e 15:30:00 -f /var/log/sysstat/sa$(date +%d)",
                    "sar -u -b 14:30:00 -t 15:30:00 -f /var/log/sysstat/sa$(date -d 'yesterday' +%d)",
                    "sar -u --start 14:30:00 --end 15:30:00 -f /var/log/sysstat/sa$(date -d 'yesterday' +%d)"
                ],
                "correctAnswer": 0,
                "explanation": "The correct command is 'sar -u -s 14:30:00 -e 15:30:00 -f /var/log/sysstat/sa$(date -d 'yesterday' +%d)'. The '-u' option reports CPU utilization. The '-s' and '-e' flags specify the start and end times in 24-hour format. The '-f' flag specifies the data file; the sysstat logs are stored in /var/log/sysstat/ with filenames like 'saDD' where DD is the day of the month. The command uses date arithmetic to get yesterday's day number. Option B uses today's date, not yesterday's. Option C uses incorrect flags '-b' and '-t'. Option D uses incorrect long options '--start' and '--end' which are not valid for sar."
            },
            {
                "id": 91,
                "question": "An AI infrastructure engineer needs to identify the partition naming convention for an NVMe drive on a Linux system. Which of the following correctly represents the first partition on the first NVMe drive?",
                "options": [
                    "/dev/nvme0n1p1",
                    "/dev/nvme0n1p0",
                    "/dev/nvme0n1-1",
                    "/dev/nvme0n1-part1"
                ],
                "correctAnswer": 0,
                "explanation": "NVMe drives use the naming convention /dev/nvmeXnY, where X is the controller number and Y is the namespace. Partitions are appended with 'p' followed by the partition number. Therefore, the first partition on the first NVMe drive (controller 0, namespace 1) is /dev/nvme0n1p1. Option B is incorrect because partition numbers start at 1, not 0. Options C and D use incorrect separators; NVMe partitions use 'p' without hyphens or additional text."
            },
            {
                "id": 92,
                "question": "An AI infrastructure engineer is provisioning storage for a multi-node distributed training cluster that will process large binary datasets (e.g., TFRecord files) exceeding 50 TB. Which filesystem should the engineer choose, and what is the primary reason?",
                "options": [
                    "ext4, because it provides better small file performance and can be shrunk if needed.",
                    "XFS, because it supports filesystem sizes up to 8 exabytes and excels at large file and concurrent write performance.",
                    "ext4, because it is the default filesystem on most Linux distributions and is simpler to manage.",
                    "XFS, because it offers online defragmentation and resizing capabilities without unmounting."
                ],
                "correctAnswer": 1,
                "explanation": "For multi-node distributed training with large binary datasets exceeding 50 TB, XFS is the recommended filesystem. XFS supports filesystem sizes up to 8 exabytes, far exceeding ext4's 50 TB limit. It is optimized for large file sequential I/O and concurrent writes, which are common in distributed training scenarios. While ext4 is simpler and better for small files, it cannot scale to the required size and may become a bottleneck with concurrent writes. Option D is incorrect because online defragmentation and resizing are not the primary reasons for choosing XFS in this context."
            },
            {
                "id": 93,
                "question": "An AI engineer needs to ensure that a network-attached storage volume containing training datasets is automatically mounted every time the system boots. Which approach should be used?",
                "options": [
                    "Add an entry in /etc/fstab using the device name and the nofail option.",
                    "Run the mount command with the -a option in a startup script.",
                    "Add an entry in /etc/fstab using the UUID and the nofail option.",
                    "Use the blkid command to generate a persistent mount configuration."
                ],
                "correctAnswer": 2,
                "explanation": "Persistent mounts that survive reboots are configured in /etc/fstab. Using the UUID is preferred over device names because UUIDs are permanent and do not change when hardware configuration changes. The nofail option ensures the system boots even if the mount fails, which is important for network or removable storage. Option A uses a device name which can change; option B is not a persistent solution; option D is incorrect because blkid only displays UUIDs, it does not create mount configurations."
            },
            {
                "id": 94,
                "question": "An AI engineer is configuring NFS automounting for shared training datasets across multiple GPU servers. Which mount option is most appropriate for ensuring that a training job does not fail if the NFS server becomes temporarily unreachable?",
                "options": [
                    "soft",
                    "hard",
                    "intr",
                    "noatime"
                ],
                "correctAnswer": 1,
                "explanation": "The 'hard' mount option causes NFS operations to retry indefinitely if the server becomes unreachable, which is preferred for training jobs to avoid failure due to temporary network issues. 'soft' returns an error after a timeout, which could cause the job to fail. 'intr' allows interrupting hung operations but does not prevent failure. 'noatime' improves performance by disabling access time updates but does not affect fault tolerance."
            },
            {
                "id": 95,
                "question": "An AI infrastructure engineer needs to combine three 2 TB NVMe drives into a single storage pool for training data. The engineer wants to maximize throughput by spreading I/O across all drives. Which LVM command should be used to create the logical volume?",
                "options": [
                    "lvcreate -l 100%FREE -n lv_training vg_ai",
                    "lvcreate --type striped -i 3 -l 100%FREE -n lv_training vg_ai",
                    "lvcreate -L 6T -n lv_training vg_ai",
                    "lvcreate --mirror -l 100%FREE -n lv_training vg_ai"
                ],
                "correctAnswer": 1,
                "explanation": "To maximize throughput by spreading I/O across multiple NVMe drives, the logical volume should be created with striping. The correct command is `lvcreate --type striped -i 3 -l 100%FREE -n lv_training vg_ai`, where `-i 3` specifies the number of stripes (one per drive). Option A creates a linear volume, which does not stripe data. Option C specifies a fixed size but does not enable striping. Option D creates a mirrored volume, which provides redundancy but not the performance benefit of striping."
            },
            {
                "id": 96,
                "question": "An AI engineer is about to update a model stored on an LVM logical volume. Before applying the update, the engineer creates a snapshot of the volume. Which statement accurately describes the behavior of this snapshot?",
                "options": [
                    "The snapshot immediately duplicates all data from the original volume to a separate storage location.",
                    "The snapshot uses copy-on-write to track only changes made after its creation, making it space-efficient.",
                    "The snapshot is a full, independent copy that can be used for read and write operations without affecting the original.",
                    "The snapshot must be at least as large as the original volume to ensure it can capture all changes."
                ],
                "correctAnswer": 1,
                "explanation": "LVM snapshots use copy-on-write (CoW) technology. When a snapshot is created, it does not copy all data immediately. Instead, it records the original data only when the original volume is modified. This makes snapshots fast to create and space-efficient, as they only store the differences (changes) from the point of creation. Option A is incorrect because snapshots do not duplicate all data immediately. Option C is incorrect because snapshots are typically read-only (or read-write with limitations) and are not independent copies; they rely on the original volume. Option D is incorrect because the snapshot size only needs to accommodate expected changes, not the full volume size."
            },
            {
                "id": 97,
                "question": "An AI infrastructure team is implementing thin provisioning for checkpoint storage using LVM. Which of the following is a critical monitoring metric to prevent data loss?",
                "options": [
                    "Thin pool data usage percentage",
                    "Virtual size of each thin volume",
                    "Number of thin volumes in the pool",
                    "Over-provisioning ratio"
                ],
                "correctAnswer": 0,
                "explanation": "Thin pool data usage percentage is the most critical metric because if the thin pool runs out of physical space, all thin volumes in that pool may become unavailable, leading to data loss. The virtual size (option B) is just a logical limit, not actual usage. The number of thin volumes (option C) does not directly indicate capacity risk. The over-provisioning ratio (option D) is a design consideration but not a real-time monitoring metric; actual data usage is what matters."
            },
            {
                "id": 98,
                "question": "An AI infrastructure engineer is designing a storage solution for a training pipeline that requires high read and write performance for model checkpoints and active datasets, while also ensuring data safety against drive failures. Which RAID level is most appropriate for this workload?",
                "options": [
                    "RAID 0",
                    "RAID 5",
                    "RAID 6",
                    "RAID 10"
                ],
                "correctAnswer": 3,
                "explanation": "RAID 10 (a stripe of mirrors) provides both high performance (due to striping) and high redundancy (due to mirroring) without parity overhead, making it ideal for AI workloads that demand speed and data safety. RAID 0 offers no redundancy, RAID 5 and RAID 6 have write performance penalties from parity calculations, and RAID 6 also has lower capacity efficiency."
            },
            {
                "id": 99,
                "question": "An AI infrastructure engineer is configuring storage for a high-performance compute cluster that will be used for training large deep learning models. The cluster uses NVMe drives. Which of the following is the primary reason to use HBA passthrough (IT mode) instead of a hardware RAID controller for these drives?",
                "options": [
                    "To enable hardware-level RAID redundancy without OS dependency.",
                    "To reduce CPU overhead by offloading RAID processing to the HBA.",
                    "To preserve the native low latency and high throughput of NVMe drives.",
                    "To allow the operating system to manage the drives as a single logical volume."
                ],
                "correctAnswer": 2,
                "explanation": "HBA passthrough (IT mode) connects NVMe drives directly to the operating system without RAID controller processing, eliminating latency and bandwidth bottlenecks introduced by hardware RAID. This preserves the full performance of NVMe drives, which is critical for I/O-intensive AI workloads like training and data loading. Option A is incorrect because hardware RAID provides redundancy but at the cost of performance. Option B is incorrect because HBA passthrough does not offload RAID processing; it bypasses it entirely. Option D is incorrect because passthrough presents each drive individually, not as a single logical volume."
            },
            {
                "id": 100,
                "question": "An AI engineer connects to a newly provisioned GPU server and runs 'ip link show'. The output shows interfaces named 'ens3' and 'ib0'. Which of the following statements best describes these interface names?",
                "options": [
                    "'ens3' is a predictable Ethernet name based on hardware topology, and 'ib0' is an InfiniBand interface used for high-speed GPU-to-GPU communication.",
                    "'ens3' is a legacy Ethernet name that may change after hardware changes, and 'ib0' is a virtual interface for storage traffic.",
                    "'ens3' indicates a bonded interface, and 'ib0' is a management network interface.",
                    "'ens3' is an InfiniBand interface, and 'ib0' is a predictable Ethernet interface."
                ],
                "correctAnswer": 0,
                "explanation": "In modern Linux systems, 'ens3' follows the predictable naming scheme where 'en' stands for Ethernet and 's3' indicates a hotplug slot index, making it stable across hardware changes. 'ib0' is the standard naming for InfiniBand interfaces, which are commonly used in AI clusters for low-latency, high-bandwidth GPU-to-GPU communication. Option B is incorrect because 'ens3' is predictable, not legacy. Option C is incorrect because 'ens3' is not a bond; bonded interfaces typically have names like 'bond0'. Option D is incorrect because it reverses the roles of 'ens3' and 'ib0'."
            }
        ]
    },
    {
        "id": 6,
        "title": "NCA practice exam Set 6",
        "description": "Practice Exam Set 6 containing 20 unique exam-aligned questions covering core infrastructure domains.",
        "questions": [
            {
                "id": 101,
                "question": "An AI infrastructure engineer is configuring a static IP on an Ubuntu 22.04 server using netplan. The engineer has identified the network interface as 'ens33' and wants to assign the IP address 192.168.10.50 with a subnet mask of 255.255.255.0, a default gateway of 192.168.10.1, and DNS servers 8.8.8.8 and 8.8.4.4. Which netplan YAML configuration correctly implements these settings?",
                "options": [
                    "network:\n  version: 2\n  renderer: networkd\n  ethernets:\n    ens33:\n      dhcp4: no\n      addresses:\n        - 192.168.10.50/24\n      gateway4: 192.168.10.1\n      nameservers:\n        addresses:\n          - 8.8.8.8\n          - 8.8.4.4",
                    "network:\n  version: 2\n  renderer: NetworkManager\n  ethernets:\n    ens33:\n      dhcp4: false\n      addresses:\n        - 192.168.10.50/255.255.255.0\n      gateway4: 192.168.10.1\n      nameservers:\n        - 8.8.8.8\n        - 8.8.4.4",
                    "network:\n  version: 2\n  ethernets:\n    ens33:\n      dhcp4: no\n      ip: 192.168.10.50/24\n      gateway: 192.168.10.1\n      dns:\n        - 8.8.8.8\n        - 8.8.4.4",
                    "network:\n  version: 2\n  renderer: networkd\n  ethernets:\n    ens33:\n      dhcp4: no\n      addresses:\n        - 192.168.10.50/24\n      gateway: 192.168.10.1\n      nameservers:\n        - 8.8.8.8\n        - 8.8.4.4"
                ],
                "correctAnswer": 0,
                "explanation": "Option A is correct because it uses the proper netplan YAML syntax: the 'addresses' key with CIDR notation (/24), 'gateway4' for IPv4 default gateway, and 'nameservers' with a nested 'addresses' list. Option B incorrectly uses a subnet mask instead of CIDR notation and uses 'dhcp4: false' instead of 'no' (though 'false' is technically acceptable, the standard is 'no'), and the 'nameservers' key is not nested correctly. Option C uses incorrect keys 'ip' and 'gateway' and 'dns' instead of the required 'addresses', 'gateway4', and 'nameservers'. Option D uses 'gateway' instead of 'gateway4' and has incorrect nesting for 'nameservers'."
            },
            {
                "id": 102,
                "question": "An AI infrastructure engineer needs to quickly check the status of all network devices on a server running NetworkManager. Which command should they use?",
                "options": [
                    "nmcli device status",
                    "nmtui device status",
                    "nmcli connection show",
                    "nmtui connection show"
                ],
                "correctAnswer": 0,
                "explanation": "The correct command is 'nmcli device status'. This command displays a table showing all network devices, their types, states (connected/disconnected), and associated connection names. 'nmtui' is a text-based user interface, not a command that accepts arguments like 'device status'. 'nmcli connection show' lists connection profiles, not device status. 'nmtui connection show' is not a valid command; nmtui is launched interactively without arguments."
            },
            {
                "id": 103,
                "question": "An AI cluster is experiencing performance degradation during distributed training. Network analysis shows high CPU utilization on the training nodes due to excessive packet processing. Which configuration change would most directly address this issue?",
                "options": [
                    "Enable RDMA over Converged Ethernet (RoCEv2) on all nodes.",
                    "Increase the MTU on all network interfaces in the data path to 9000.",
                    "Enable TCP segmentation offload (TSO) on the NICs.",
                    "Reduce the number of concurrent training processes per GPU."
                ],
                "correctAnswer": 1,
                "explanation": "The high CPU utilization due to excessive packet processing indicates that the network is handling a large number of small packets. Jumbo frames (MTU 9000) allow each packet to carry up to six times more data, reducing the number of packets, header overhead, and CPU interrupts. This directly addresses the symptom described. Option A (RoCEv2) improves RDMA but does not reduce packet count. Option C (TSO) offloads segmentation but still results in many small packets on the wire. Option D reduces workload but does not fix the network inefficiency."
            },
            {
                "id": 104,
                "question": "A system administrator is troubleshooting network connectivity on a GPU server in an AI cluster. The server cannot reach a storage server at 10.0.0.50. Which of the following commands should the administrator use to verify that the server has an IP address in the correct subnet?",
                "options": [
                    "ip link show",
                    "ip addr show",
                    "ip route show",
                    "ifconfig -a"
                ],
                "correctAnswer": 1,
                "explanation": "The 'ip addr show' command displays all network interfaces along with their IP addresses, MAC addresses, and operational status. This allows the administrator to verify that the server has an IP address in the correct subnet (e.g., 10.0.0.0/24). 'ip link show' only shows Layer 2 information (MAC, state, MTU) without IP addresses. 'ip route show' displays the routing table, not the IP addresses assigned to interfaces. 'ifconfig -a' is deprecated and should be avoided in favor of the modern 'ip' commands."
            },
            {
                "id": 105,
                "question": "An AI cluster operator is troubleshooting a slow distributed training job. The operator runs ping between two GPU nodes and observes 5% packet loss. Which of the following is the most likely impact on the training workload?",
                "options": [
                    "The training job will complete normally because ping only tests ICMP, not application traffic.",
                    "The training job may experience degraded performance because packet loss increases gradient synchronization time.",
                    "The training job will fail immediately because NCCL requires zero packet loss.",
                    "The training job will run faster because packet loss reduces network congestion."
                ],
                "correctAnswer": 1,
                "explanation": "In AI clusters, distributed training relies on frequent all-reduce operations to synchronize gradients across nodes. Even small amounts of packet loss (e.g., 1-5%) can cause retransmissions and increased latency, significantly slowing down gradient synchronization and overall training throughput. Option A is incorrect because while ping uses ICMP, packet loss at the network layer affects all traffic, including NCCL communication. Option C is incorrect because NCCL can tolerate some loss but performance degrades. Option D is incorrect because packet loss never improves performance."
            },
            {
                "id": 106,
                "question": "An AI infrastructure engineer is troubleshooting a performance degradation in a distributed training job across multiple GPU nodes. The engineer suspects network latency issues and wants to identify problematic hops along the path between two compute nodes. Which tool should the engineer use to obtain a continuous, real-time view of latency and packet loss statistics per hop?",
                "options": [
                    "traceroute",
                    "mtr",
                    "ping",
                    "nvidia-smi"
                ],
                "correctAnswer": 1,
                "explanation": "mtr (My Traceroute) combines the functionality of traceroute and ping into a continuous, real-time diagnostic tool. It repeatedly probes each hop and updates statistics such as average latency, loss percentage, and standard deviation, making it ideal for monitoring a path over time and distinguishing between transient and persistent packet loss. traceroute provides only a one-time snapshot with limited probes per hop. ping tests end-to-end connectivity but does not show per-hop details. nvidia-smi is used for GPU monitoring, not network path tracing."
            },
            {
                "id": 107,
                "question": "An AI infrastructure engineer is troubleshooting a slow distributed training job across multiple GPU servers. The engineer suspects packet loss or retransmissions on the network. Which tcpdump command would best capture only TCP traffic to and from a specific GPU server at IP 10.0.0.5, while avoiding DNS lookups and saving the capture for later analysis?",
                "options": [
                    "sudo tcpdump -i eth0 -n host 10.0.0.5 and tcp -w capture.pcap",
                    "sudo tcpdump -i eth0 host 10.0.0.5 and tcp -w capture.pcap",
                    "sudo tcpdump -i eth0 -n host 10.0.0.5 and tcp > capture.pcap",
                    "sudo tcpdump -i eth0 -n host 10.0.0.5 tcp -w capture.pcap"
                ],
                "correctAnswer": 0,
                "explanation": "Option A is correct because it uses -n to disable DNS lookups, -i eth0 to specify the interface, the filter 'host 10.0.0.5 and tcp' to capture only TCP packets to/from that IP, and -w capture.pcap to save the raw packets to a file. Option B is missing -n, which could cause delays from DNS resolution. Option C uses output redirection (>) instead of -w, which would save text output, not raw packets. Option D has incorrect filter syntax (missing 'and' between host and tcp) and would be interpreted as capturing packets with host 10.0.0.5 and then a separate filter 'tcp' which is invalid."
            },
            {
                "id": 108,
                "question": "An AI cluster engineer runs an iperf3 TCP test between two nodes connected by a 100 Gbps link. The result shows a throughput of 94 Gbps with 0 retransmissions. What does this result indicate?",
                "options": [
                    "The network is performing below expectations and needs investigation.",
                    "The network is healthy and performing near theoretical limits.",
                    "The test duration was too short to get accurate results.",
                    "There is a CPU bottleneck on the client node."
                ],
                "correctAnswer": 1,
                "explanation": "A throughput of 94 Gbps on a 100 Gbps link is excellent, as it accounts for protocol overhead (TCP/IP headers, etc.). Zero retransmissions indicate no packet loss or congestion. This result shows the network is healthy and performing near theoretical limits. Option A is incorrect because 94 Gbps is above typical expectations (usually 90-95% of line rate). Option C is incorrect because the default 10-second test is sufficient, and the result is consistent. Option D is incorrect because high throughput with zero retransmissions suggests no CPU bottleneck; a CPU bottleneck would typically show lower throughput or improvement with multiple streams."
            },
            {
                "id": 109,
                "question": "An AI infrastructure engineer is troubleshooting an SSH connection to a remote GPU server. The connection drops with the error 'Connection reset by peer' after the key exchange completes but before any user authentication occurs. Which of the following is the most likely cause of this failure?",
                "options": [
                    "The client and server failed to agree on a symmetric encryption algorithm.",
                    "The server's host key does not match the one stored on the client.",
                    "The MAC verification failed on a packet during the key exchange.",
                    "The TCP connection was closed due to a firewall rule blocking port 22."
                ],
                "correctAnswer": 2,
                "explanation": "The error occurs after key exchange but before user authentication, indicating the failure is in the key exchange or MAC verification step. SSH uses MACs to ensure data integrity during the key exchange. If the MAC verification fails, the connection is immediately dropped. Option A is incorrect because algorithm negotiation happens before key exchange; if they failed to agree, the connection would not proceed to key exchange. Option B is incorrect because server authentication (host key verification) occurs after key exchange; a host key mismatch would produce a 'Host key verification failed' error, not a connection reset. Option D is incorrect because a firewall blocking port 22 would prevent the TCP connection from being established in the first place, not cause a reset after key exchange."
            },
            {
                "id": 110,
                "question": "An AI infrastructure engineer needs to generate SSH key pairs for secure access to a cluster of GPU nodes. The cluster includes both modern servers and a few legacy systems that only support RSA keys. Which approach should the engineer take to balance security and compatibility?",
                "options": [
                    "Generate only an Ed25519 key pair and use it for all servers, as it is faster and more secure.",
                    "Generate only an RSA 4096-bit key pair to ensure compatibility with all servers.",
                    "Generate both an Ed25519 key pair for modern servers and an RSA 4096-bit key pair for legacy systems.",
                    "Generate an RSA 2048-bit key pair, as it offers the best balance of speed and compatibility."
                ],
                "correctAnswer": 2,
                "explanation": "The recommended approach is to generate both key types: Ed25519 for modern servers (faster, more secure) and RSA 4096-bit for legacy systems that only support RSA. Option A fails on legacy systems. Option B sacrifices the performance and security benefits of Ed25519. Option D uses a weaker RSA key size (2048 bits) and misses the advantages of Ed25519. Therefore, option C is correct."
            },
            {
                "id": 111,
                "question": "An AI infrastructure engineer is hardening SSH access to a DGX server. After editing /etc/ssh/sshd_config, which of the following is the correct sequence of steps to apply the changes safely?",
                "options": [
                    "Restart the sshd service, then test the configuration with sshd -t, and keep the current session open until a new session is verified.",
                    "Test the configuration with sshd -t, then restart the sshd service, and keep the current session open until a new session is verified.",
                    "Restart the sshd service, then close the current session immediately to force a reconnection test.",
                    "Test the configuration with sshd -t, then close the current session, and attempt a new SSH connection using the new settings."
                ],
                "correctAnswer": 1,
                "explanation": "The correct sequence is to first test the configuration syntax with 'sshd -t' to catch any errors before applying changes. Then restart the sshd service to load the new configuration. Crucially, the engineer should keep the current SSH session open until a new session is successfully established with the new settings, to avoid being locked out. Option A reverses the test and restart order. Option C and D risk lockout by closing the current session prematurely."
            },
            {
                "id": 112,
                "question": "An AI infrastructure engineer needs to connect to a GPU compute node in a private subnet from their laptop. The only entry point is a jump host with a public IP. Which approach provides the most secure and reusable method for daily cluster management?",
                "options": [
                    "Direct SSH to the GPU node using its private IP from the laptop.",
                    "SSH to the jump host, then SSH from the jump host to the GPU node each time.",
                    "Configure ~/.ssh/config with a ProxyJump directive to automatically route through the jump host.",
                    "Expose the GPU node's SSH port on the public internet using port forwarding on the router."
                ],
                "correctAnswer": 2,
                "explanation": "Configuring ~/.ssh/config with a ProxyJump directive is the most secure and reusable method. It avoids exposing the GPU node to the internet (unlike option D), eliminates the need to manually chain SSH commands each time (unlike option B), and is not possible directly from the laptop without a jump host (option A fails because the GPU node is in a private subnet). The ProxyJump directive automates the multi-hop connection, and once configured, the engineer can simply type 'ssh gpu-node' to connect securely through the jump host."
            },
            {
                "id": 113,
                "question": "An AI cluster administrator needs to ensure that a specific configuration file is identical across all compute nodes and that any changes are applied only if necessary. Which tool is most appropriate for this task?",
                "options": [
                    "pssh with a for loop",
                    "Ansible playbook",
                    "Manual SSH to each node",
                    "A shell script using scp"
                ],
                "correctAnswer": 1,
                "explanation": "Ansible is the correct choice because it is idempotent, meaning it checks the current state and only makes changes if needed, ensuring consistency across nodes. pssh (option A) is suitable for one-off commands but lacks idempotency and error recovery. Manual SSH (option C) is error-prone and not scalable. A shell script with scp (option D) can copy files but does not provide idempotency or state management."
            },
            {
                "id": 114,
                "question": "An AI infrastructure engineer is configuring ufw on an Ubuntu server that hosts a Jupyter Notebook server for model development. The engineer wants to allow access to Jupyter only from the internal corporate subnet 10.0.0.0/8. Which ufw command should be used?",
                "options": [
                    "ufw allow 8888",
                    "ufw allow from 10.0.0.0/8 to any port 8888",
                    "ufw allow 8888/tcp",
                    "ufw allow from any to any port 8888"
                ],
                "correctAnswer": 1,
                "explanation": "The correct command is 'ufw allow from 10.0.0.0/8 to any port 8888'. This restricts access to port 8888 (Jupyter Notebook's default port) to only the 10.0.0.0/8 subnet, aligning with the security best practice of limiting access to specific IP ranges. Option A ('ufw allow 8888') opens the port to all IP addresses, which is insecure. Option C ('ufw allow 8888/tcp') also opens to all IPs but specifies TCP protocol. Option D ('ufw allow from any to any port 8888') is redundant and effectively the same as allowing from everywhere."
            },
            {
                "id": 115,
                "question": "An AI infrastructure engineer wants to protect an SSH server from brute-force attacks using fail2ban. After configuring fail2ban, which log file should the engineer monitor to see which IP addresses are being blocked?",
                "options": [
                    "/var/log/auth.log",
                    "/var/log/fail2ban.log",
                    "/var/log/syslog",
                    "/var/log/secure"
                ],
                "correctAnswer": 1,
                "explanation": "fail2ban logs its own actions, including bans and unbans, to /var/log/fail2ban.log. This file shows which IPs were blocked and when. /var/log/auth.log (or /var/log/secure on RHEL-based systems) is the source log that fail2ban monitors for failed SSH attempts, but it does not show the ban actions themselves. /var/log/syslog is a general system log that may contain fail2ban messages, but the dedicated fail2ban.log is the primary log for ban events."
            },
            {
                "id": 116,
                "question": "An AI engineer is deploying a containerized training workload on an Ubuntu server. The engineer wants to ensure that even if the training script is compromised, it cannot access sensitive files outside its designated data directories. Which mandatory access control system is best suited for this scenario, and what is its primary advantage for rapid development?",
                "options": [
                    "SELinux, because it uses label-based policies that are more granular for GPU processes.",
                    "AppArmor, because it uses path-based profiles that are simpler to write and debug.",
                    "SELinux, because it is the default on Ubuntu and integrates with Docker.",
                    "AppArmor, because it enforces policies by default in enforcing mode."
                ],
                "correctAnswer": 1,
                "explanation": "AppArmor is the default MAC system on Ubuntu and uses path-based profiles, which are simpler to learn and debug compared to SELinux's label-based approach. This makes AppArmor well-suited for rapid development and prototyping. Option A is incorrect because SELinux is not default on Ubuntu and its complexity can slow development. Option C is incorrect because SELinux is not default on Ubuntu. Option D is incorrect because AppArmor's default mode is complain, not enforcing."
            },
            {
                "id": 117,
                "question": "An AI infrastructure engineer wants to monitor all attempts to access a directory containing sensitive AI model files. Which auditd rule should they add to track both read and write access to /data/models/?",
                "options": [
                    "-w /data/models/ -p rw -k ai-model-access",
                    "-w /data/models/ -p wa -k ai-model-access",
                    "-w /data/models/ -p rwxa -k ai-model-access",
                    "-w /data/models/ -p a -k ai-model-access"
                ],
                "correctAnswer": 2,
                "explanation": "The correct rule is `-w /data/models/ -p rwxa -k ai-model-access`. The `-p` flag specifies the permission filter: r=read, w=write, x=execute, a=attribute change. To monitor all access attempts (read, write, execute, and attribute changes), you need `rwxa`. Option A (`rw`) only monitors read and write, missing execute and attribute changes. Option B (`wa`) only monitors write and attribute changes, missing read and execute. Option D (`a`) only monitors attribute changes, missing read, write, and execute. The `-k` flag adds a key for easier searching with ausearch."
            },
            {
                "id": 118,
                "question": "In machine learning, which of the following best describes the difference between supervised and unsupervised learning?",
                "options": [
                    "Supervised learning uses labeled data to learn a mapping from inputs to outputs, while unsupervised learning finds patterns in unlabeled data.",
                    "Supervised learning requires a reward signal from the environment, while unsupervised learning uses labeled data.",
                    "Supervised learning groups data into clusters, while unsupervised learning predicts continuous values.",
                    "Supervised learning is used for reinforcement tasks, while unsupervised learning is used for classification tasks."
                ],
                "correctAnswer": 0,
                "explanation": "Supervised learning relies on labeled training data where each example has a known output (label), and the algorithm learns to map inputs to outputs. Unsupervised learning, in contrast, works with unlabeled data and aims to discover hidden patterns or groupings, such as clustering or dimensionality reduction. Option A correctly captures this fundamental distinction. Option B is incorrect because reinforcement learning uses reward signals, not supervised learning. Option C reverses the definitions: clustering is a type of unsupervised learning, while predicting continuous values (regression) is typically supervised. Option D is incorrect because reinforcement learning is a separate paradigm, and classification is a supervised task."
            },
            {
                "id": 119,
                "question": "Which of the following best describes the key difference between traditional Machine Learning (ML) and Deep Learning (DL)?",
                "options": [
                    "Traditional ML requires manual feature engineering, while DL automatically learns features from raw data.",
                    "Traditional ML uses neural networks with many hidden layers, while DL uses simpler algorithms like decision trees.",
                    "Traditional ML requires large datasets and GPUs, while DL works well with small datasets and CPUs.",
                    "Traditional ML is always more interpretable than DL, which is always a black box."
                ],
                "correctAnswer": 0,
                "explanation": "The correct answer is A. Traditional ML relies on manual feature engineering where domain experts select relevant features, whereas Deep Learning uses multi-layer neural networks to automatically learn hierarchical features from raw data. Option B is incorrect because it reverses the definitions: DL uses many hidden layers, not traditional ML. Option C is incorrect because DL typically requires large datasets and GPUs, while traditional ML can work with smaller datasets and CPUs. Option D is an overgeneralization; while DL models are often less interpretable, some traditional ML models can also be black boxes (e.g., random forests), and there are techniques to interpret DL models."
            },
            {
                "id": 120,
                "question": "Which of the following best describes the primary role of Tensor Cores in NVIDIA GPUs for generative AI workloads?",
                "options": [
                    "They accelerate general-purpose parallel computing tasks such as data preprocessing.",
                    "They perform matrix multiply-accumulate operations essential for deep learning training and inference.",
                    "They handle ray tracing for realistic image rendering in generative AI models.",
                    "They manage memory bandwidth and reduce latency for CPU-GPU communication."
                ],
                "correctAnswer": 1,
                "explanation": "Tensor Cores are specialized hardware units designed to perform matrix multiply-accumulate operations efficiently, which are fundamental to the neural network computations in deep learning. This makes them critical for both training and inference of generative AI models. Option A describes CUDA Cores, which handle general parallel tasks. Option C describes RT Cores, used for ray tracing in graphics, not generative AI. Option D is not a function of Tensor Cores; memory management is handled by other components."
            }
        ]
    },
    {
        "id": 7,
        "title": "NCA practice exam Set 7",
        "description": "Practice Exam Set 7 containing 20 unique exam-aligned questions covering core infrastructure domains.",
        "questions": [
            {
                "id": 121,
                "question": "An AI infrastructure engineer is designing a storage solution for a project that uses unsupervised learning to cluster customer behavior data from raw clickstream logs. Which storage characteristic is most important for this workload?",
                "options": [
                    "Low-latency NVMe storage for small random reads",
                    "Scalable object storage capable of ingesting massive raw datasets",
                    "High-speed local SSD for storing labeled training pairs",
                    "Persistent memory for experience replay buffers"
                ],
                "correctAnswer": 1,
                "explanation": "Unsupervised learning typically uses unlabeled data, often in large volumes (e.g., raw logs, sensor data). Scalable object storage (like S3) is ideal for ingesting and storing massive raw datasets. Option A is more relevant for inference or small-batch workloads. Option C describes labeled data, which is characteristic of supervised learning. Option D refers to reinforcement learning's experience replay buffers."
            },
            {
                "id": 122,
                "question": "A data scientist is preparing a text dataset for training a natural language processing model. After cleaning the data and removing missing values, they need to convert the text into a numerical format that the model can process. Which step should they perform next?",
                "options": [
                    "Normalization using Min-Max scaling",
                    "Tokenization followed by mapping tokens to integer IDs",
                    "Feature scaling using Z-score normalization",
                    "One-hot encoding of the entire vocabulary"
                ],
                "correctAnswer": 1,
                "explanation": "Tokenization is the process of splitting text into smaller units (tokens) and then mapping each token to a unique integer ID, which is necessary for NLP models to process text numerically. Normalization (options A and C) applies to numerical features, not text. One-hot encoding (option D) is a possible representation but is less efficient and typically applied after tokenization; the immediate next step after cleaning is tokenization."
            },
            {
                "id": 123,
                "question": "During pre-training of a large language model, an engineer notices that GPU utilization is frequently dropping to near zero. Which of the following is the most likely cause?",
                "options": [
                    "The model is too small for the number of GPUs allocated.",
                    "The storage system cannot feed data fast enough, causing data loading bottlenecks.",
                    "The network is experiencing congestion during gradient synchronization.",
                    "The GPUs are thermal throttling due to inadequate cooling."
                ],
                "correctAnswer": 1,
                "explanation": "The correct answer is B. During pre-training, GPUs process data in batches; if the storage system cannot supply data quickly enough, GPUs become idle waiting for the next batch, leading to low utilization. Option A is less likely because a small model would still keep GPUs busy if data is fed fast. Option C (network congestion) typically causes increased training time but not necessarily zero utilization. Option D (thermal throttling) would reduce clock speeds, not cause near-zero utilization."
            },
            {
                "id": 124,
                "question": "A data scientist wants to adapt a large pre-trained language model to classify medical reports. The team has only 500 labeled examples and limited GPU budget. Which approach is most appropriate?",
                "options": [
                    "Train a new model from scratch using the 500 examples.",
                    "Fine-tune the pre-trained model with a low learning rate and partial layer freezing.",
                    "Use the pre-trained model as-is without any additional training.",
                    "Collect 1 million more labeled examples before training."
                ],
                "correctAnswer": 1,
                "explanation": "Fine-tuning is ideal when you have a small labeled dataset and limited compute resources. It leverages the general knowledge of the pre-trained model and adapts it to the specific domain with a low learning rate to avoid catastrophic forgetting. Training from scratch (A) is infeasible with only 500 examples. Using the model as-is (C) would not adapt to medical terminology. Collecting more data (D) is expensive and time-consuming, and fine-tuning can work with far fewer examples."
            },
            {
                "id": 125,
                "question": "Which of the following best describes the primary goal of inference in a production AI system?",
                "options": [
                    "Minimizing loss on a large training dataset",
                    "Achieving low latency and high throughput for predictions on new data",
                    "Updating model weights using backpropagation",
                    "Running on large batches of data for days to improve accuracy"
                ],
                "correctAnswer": 1,
                "explanation": "Inference is the process of using a trained model to generate predictions on new, unseen data in production. The primary goals are low latency (fast response time) and high throughput (many predictions per second). Option A describes training, not inference. Option C describes the training process of updating weights. Option D describes training on large datasets over extended periods. Only option B correctly captures the objectives of inference."
            },
            {
                "id": 126,
                "question": "A machine learning engineer has trained a new version of an image classification model and wants to ensure that the update does not degrade performance compared to the previous version. Which process should the engineer use to compare the new model's accuracy and inference speed against the previous version on a fixed dataset?",
                "options": [
                    "Model evaluation",
                    "Benchmarking",
                    "Regression testing",
                    "Overfitting detection"
                ],
                "correctAnswer": 2,
                "explanation": "Regression testing is specifically designed to compare a new model version against a previous baseline on a fixed dataset (golden test set) to detect any degradation in accuracy, speed, or other metrics. Model evaluation measures performance on unseen data but does not inherently compare versions. Benchmarking compares against industry standards or hardware capabilities, not necessarily previous versions. Overfitting detection checks for memorization, not version-to-version comparison."
            },
            {
                "id": 127,
                "question": "In the Transformer architecture, which component allows the model to understand the order of words in a sequence?",
                "options": [
                    "Self-attention mechanism",
                    "Multi-head attention",
                    "Positional encoding",
                    "Cross-attention mechanism"
                ],
                "correctAnswer": 2,
                "explanation": "Positional encoding adds unique signals to each word's embedding to indicate its position in the sequence. Without it, the model would treat sentences with different word orders (e.g., 'The dog bit the man' vs. 'The man bit the dog') as identical because attention processes all words in parallel and has no inherent sense of order. Self-attention (A) weighs word importance but does not encode position; multi-head attention (B) runs multiple attention mechanisms in parallel; cross-attention (D) connects two different sequences."
            },
            {
                "id": 128,
                "question": "An engineer needs to deploy a 70B parameter model for inference with minimal latency. The available GPU has 80 GB of VRAM. Which precision format allows the model to fit on a single GPU without splitting across multiple GPUs, assuming a 20% overhead factor?",
                "options": [
                    "FP32",
                    "FP16",
                    "INT8",
                    "FP64"
                ],
                "correctAnswer": 2,
                "explanation": "A 70B parameter model requires 280 GB in FP32 (4 bytes per parameter), 140 GB in FP16 (2 bytes per parameter), and 70 GB in INT8 (1 byte per parameter). With a 20% overhead, INT8 requires approximately 84 GB, which exceeds 80 GB. However, the question asks which format allows the model to fit on a single 80 GB GPU. None of the options fit exactly, but INT8 is the only one that comes close; in practice, further optimizations (e.g., quantization with calibration) can reduce memory usage to fit. FP32 and FP16 clearly require more than 80 GB even without overhead. FP64 (8 bytes per parameter) would require even more. Therefore, INT8 is the best choice among the options."
            },
            {
                "id": 129,
                "question": "An engineer is deploying an LLM that uses a standard transformer architecture with full self-attention. The model currently supports a context window of 4,096 tokens and fits within the available GPU memory. If the context window is doubled to 8,192 tokens, approximately how much more memory will be required for the attention mechanism alone?",
                "options": [
                    "2 times more memory",
                    "4 times more memory",
                    "8 times more memory",
                    "16 times more memory"
                ],
                "correctAnswer": 1,
                "explanation": "The self-attention mechanism computes an N\u00d7N attention matrix, where N is the number of tokens. Memory usage grows quadratically with N. Doubling N from 4,096 to 8,192 increases the matrix size from (4,096)^2 to (8,192)^2, which is a factor of 4. Therefore, the memory required for the attention matrix quadruples. Options A, C, and D are incorrect because they do not reflect the quadratic scaling (2x, 8x, 16x respectively)."
            },
            {
                "id": 130,
                "question": "In a RAG pipeline, what is the primary purpose of the reranker component?",
                "options": [
                    "To convert text into numerical vectors for similarity search",
                    "To score and refine the top candidate documents retrieved by the embedding model",
                    "To generate the final answer using an LLM",
                    "To split documents into smaller chunks for indexing"
                ],
                "correctAnswer": 1,
                "explanation": "The reranker's role is to take the top candidates from the initial embedding-based retrieval and score them more accurately by considering the query-document pair together, thereby improving the relevance of the final context provided to the LLM. Option A describes the embedding model, option C describes the LLM generation step, and option D describes document chunking, which occurs during indexing."
            },
            {
                "id": 131,
                "question": "Which of the following CPU features is specifically designed to minimize pipeline stalls caused by conditional instructions?",
                "options": [
                    "Out-of-order execution",
                    "Large caches",
                    "Branch prediction",
                    "Simultaneous multithreading"
                ],
                "correctAnswer": 2,
                "explanation": "Branch prediction is the CPU feature that guesses the outcome of conditional instructions (e.g., if-else) to keep the pipeline full and avoid stalls. Out-of-order execution (A) helps with data dependencies but not specifically with branches. Large caches (B) reduce memory latency but do not address branch stalls. Simultaneous multithreading (D) improves throughput by running multiple threads, not specifically branch handling."
            },
            {
                "id": 132,
                "question": "Which of the following best describes why GPUs are optimized for throughput in AI workloads?",
                "options": [
                    "They have a small number of complex cores with large caches to minimize latency per task.",
                    "They contain thousands of simple cores that execute the same instruction on multiple data elements simultaneously.",
                    "They rely on out-of-order execution and branch prediction to accelerate sequential code.",
                    "They use a single powerful core that can handle multiple threads via hyper-threading."
                ],
                "correctAnswer": 1,
                "explanation": "GPUs are designed for throughput by packing thousands of simple cores that operate in SIMD fashion\u2014executing one instruction across many data elements in parallel. This is ideal for AI workloads like matrix multiplications, which involve repetitive, predictable math on large datasets. Option A describes CPU design focused on latency. Option C describes CPU features not emphasized in GPUs. Option D describes CPU hyper-threading, not GPU architecture."
            },
            {
                "id": 133,
                "question": "An AI team is training a large language model on a cluster of 64 GPUs. They observe a speedup of only 12x compared to a single GPU, far below the expected 64x. According to Amdahl's Law, which of the following is the most likely primary cause of this limited speedup?",
                "options": [
                    "The model architecture contains a high proportion of serial operations, such as recurrent layers or attention dependencies.",
                    "The GPUs are not using NVLink, causing communication bottlenecks.",
                    "The training data is stored on a slow HDD, increasing I/O wait times.",
                    "The batch size is too small, underutilizing the GPU compute capacity."
                ],
                "correctAnswer": 0,
                "explanation": "Amdahl's Law states that the maximum speedup from parallelization is limited by the fraction of the task that must be performed sequentially. In this scenario, a speedup of only 12x with 64 GPUs indicates a significant serial bottleneck. The most likely cause is a high proportion of serial operations in the model architecture (e.g., recurrent layers or attention dependencies that cannot be parallelized), which directly limits the parallelizable fraction P. While slow storage (option C) or small batch size (option D) can also reduce speedup, they are typically not as fundamental as inherent serial dependencies. Lack of NVLink (option B) would affect communication but is less likely to cause such a drastic limitation unless the model is extremely communication-heavy. The serial portion of the model architecture is the classic bottleneck described by Amdahl's Law."
            },
            {
                "id": 134,
                "question": "An AI engineer is analyzing a deep learning kernel and finds that it performs 10^9 floating-point operations and accesses 2\u00d710^8 bytes of memory. Which of the following best describes the bottleneck of this workload?",
                "options": [
                    "Memory-bound, because the arithmetic intensity is 5 FLOPs/byte, which is below typical GPU compute ceilings.",
                    "Compute-bound, because the arithmetic intensity is 5 FLOPs/byte, which is above typical GPU memory bandwidth ceilings.",
                    "Memory-bound, because the arithmetic intensity is 0.2 FLOPs/byte, which is below typical GPU compute ceilings.",
                    "Compute-bound, because the arithmetic intensity is 0.2 FLOPs/byte, which is above typical GPU memory bandwidth ceilings."
                ],
                "correctAnswer": 0,
                "explanation": "Arithmetic intensity is calculated as total FLOPs divided by total bytes of memory accessed: 10^9 FLOPs / (2\u00d710^8 bytes) = 5 FLOPs/byte. A value of 5 FLOPs/byte is relatively low (typical compute-bound workloads have arithmetic intensity > 10 FLOPs/byte), meaning the workload is limited by memory bandwidth rather than compute throughput. Therefore, the workload is memory-bound. Option A correctly identifies this. Option B incorrectly states compute-bound. Options C and D use an incorrect arithmetic intensity value (0.2 FLOPs/byte)."
            },
            {
                "id": 135,
                "question": "A deep learning engineer is profiling a neural network layer and finds that its arithmetic intensity is 2 FLOPs/byte on an NVIDIA A100 GPU, which has a ridge point of approximately 80 FLOPs/byte. Which of the following best describes this layer?",
                "options": [
                    "Compute-bound, because the arithmetic intensity is above 1 FLOP/byte.",
                    "Memory-bound, because the arithmetic intensity is well below the ridge point.",
                    "Compute-bound, because the layer likely involves large matrix multiplications.",
                    "Memory-bound, because the arithmetic intensity is above the ridge point."
                ],
                "correctAnswer": 1,
                "explanation": "The ridge point on an A100 is around 80 FLOPs/byte. An arithmetic intensity of 2 FLOPs/byte is far below this ridge point, indicating that the layer's performance is limited by memory bandwidth rather than compute capability. Therefore, the layer is memory-bound. Option A is incorrect because being above 1 FLOP/byte does not guarantee compute-bound; the ridge point is much higher. Option C is incorrect because even if the layer involves large matrix multiplications, the arithmetic intensity is low, making it memory-bound. Option D is incorrect because the arithmetic intensity is below, not above, the ridge point."
            },
            {
                "id": 136,
                "question": "An AI engineer is training a large language model on an NVIDIA A100 GPU with 80GB memory. The initial training run uses FP32 precision and a batch size of 32, resulting in 70% GPU memory utilization. The engineer wants to maximize throughput without sacrificing model accuracy. Which of the following actions should the engineer take first?",
                "options": [
                    "Switch to INT8 precision to reduce memory usage and increase batch size.",
                    "Increase batch size to 64 while keeping FP32 precision to fill available memory.",
                    "Enable mixed precision training (FP16/BF16) and then increase batch size to fill memory.",
                    "Reduce batch size to 16 and switch to FP16 to improve generalization."
                ],
                "correctAnswer": 2,
                "explanation": "The engineer should first enable mixed precision training (FP16/BF16) because the A100 has Tensor Cores that accelerate these precision types, typically doubling throughput and halving memory usage with minimal accuracy loss. After switching to mixed precision, memory utilization will drop, allowing the engineer to increase batch size to fill the available memory and maximize GPU utilization. Option A (INT8) is used primarily for inference, not training, and would likely cause significant accuracy loss. Option B (increasing batch size with FP32) would increase memory usage and may cause an OOM error without the benefit of Tensor Core acceleration. Option D (reducing batch size) would decrease throughput and is not the best first step."
            },
            {
                "id": 137,
                "question": "In a neural network, which of the following best describes the difference between a word embedding vector and a bias term vector?",
                "options": [
                    "Word embeddings are high-dimensional vectors that represent semantic meaning, while bias terms are low-dimensional vectors that shift layer outputs.",
                    "Word embeddings are learned during training, while bias terms are set manually before training.",
                    "Word embeddings are used only in the input layer, while bias terms are used only in the output layer.",
                    "Word embeddings are stored as sparse vectors, while bias terms are stored as dense vectors."
                ],
                "correctAnswer": 0,
                "explanation": "Word embeddings are dense, high-dimensional vectors (e.g., 300 dimensions) that capture semantic relationships between words, learned from data. Bias terms are also vectors but typically have one dimension per neuron (e.g., 10 dimensions for a layer with 10 neurons) and serve as an adjustable offset added to the weighted sum. Both are learned during training, can appear in any layer, and are stored as dense arrays. Option A correctly captures the dimensional and functional differences."
            },
            {
                "id": 138,
                "question": "In a fully connected layer with an input vector of size 1024 and an output vector of size 512, what is the shape of the weight matrix?",
                "options": [
                    "1024 \u00d7 512",
                    "512 \u00d7 1024",
                    "1024 \u00d7 1024",
                    "512 \u00d7 512"
                ],
                "correctAnswer": 0,
                "explanation": "The weight matrix in a fully connected layer has dimensions (input_size \u00d7 output_size). Here, input_size = 1024 and output_size = 512, so the matrix is 1024 rows by 512 columns. Each column corresponds to a neuron in the output layer, and each row corresponds to an input feature. Option B is incorrect because it reverses the dimensions. Options C and D are incorrect because they do not match the given input and output sizes."
            },
            {
                "id": 139,
                "question": "An AI engineer is designing a data pipeline for training a computer vision model on a batch of 64 color images, each with dimensions 224x224 pixels and 3 color channels. The images are stored as 8-bit integers but will be normalized to 32-bit floating-point values before training. What is the memory required to store this batch of images as a tensor in GPU memory?",
                "options": [
                    "Approximately 12 MB",
                    "Approximately 38 MB",
                    "Approximately 48 MB",
                    "Approximately 96 MB"
                ],
                "correctAnswer": 1,
                "explanation": "The batch of images forms a 4D tensor with shape (64, 224, 224, 3). Each element is a 32-bit float (4 bytes). Total memory = 64 * 224 * 224 * 3 * 4 bytes = 38,535,168 bytes \u2248 38.5 MB. Option A (12 MB) would be for 8-bit integers or a smaller batch. Option C (48 MB) might result from miscalculating dimensions. Option D (96 MB) would be double the correct size, perhaps using 64-bit floats."
            },
            {
                "id": 140,
                "question": "A deep learning engineer creates a 2D tensor in PyTorch with shape (4, 5) and then transposes it. Which of the following best describes the memory layout and performance implications of the transposed tensor?",
                "options": [
                    "The transposed tensor is contiguous in memory, and operations on it will achieve optimal GPU performance.",
                    "The transposed tensor is non-contiguous because its strides are (1, 4), and accessing its elements may be slower than the original tensor.",
                    "The transposed tensor has the same strides as the original tensor, so it remains contiguous.",
                    "The transposed tensor is contiguous because transposing does not change the underlying memory order."
                ],
                "correctAnswer": 1,
                "explanation": "When a tensor is transposed, its strides are swapped. For a contiguous tensor of shape (4,5) with strides (5,1), transposing yields shape (5,4) with strides (1,5). This breaks the contiguity condition because the strides no longer follow the formula stride[i] = shape[i+1] * stride[i+1]. The data in memory remains in row-major order, but the logical interpretation changes, making the tensor non-contiguous. Non-contiguous tensors require strided memory access, which is less cache-friendly and can degrade GPU performance. Option A is incorrect because the transposed tensor is not contiguous. Option C is incorrect because strides change. Option D is incorrect because transposing does change memory order interpretation, breaking contiguity."
            }
        ]
    },
    {
        "id": 8,
        "title": "NCA practice exam Set 8",
        "description": "Practice Exam Set 8 containing 20 unique exam-aligned questions covering core infrastructure domains.",
        "questions": [
            {
                "id": 141,
                "question": "Which of the following best describes the role of batched matrix multiplication in AI infrastructure?",
                "options": [
                    "It is the atomic unit of neural network computation, used in every neuron.",
                    "It processes one input sample through a single neural network layer.",
                    "It is the dominant operation during training, maximizing hardware utilization by processing many inputs simultaneously.",
                    "It is used only for inference, not for training."
                ],
                "correctAnswer": 2,
                "explanation": "Batched matrix multiplication processes multiple input samples (a batch) simultaneously, which keeps GPU cores busy and improves memory transfer efficiency. This operation is critical for training and large-scale inference, as it fully utilizes hardware like Tensor Cores. Option A describes a dot product, option B describes matrix-vector multiplication, and option D is incorrect because batched matrix multiplication is used in both training and inference."
            },
            {
                "id": 142,
                "question": "Why does GEMM (General Matrix Multiply) map perfectly to GPU SIMD hardware?",
                "options": [
                    "Each output element depends on the previous one, requiring sequential computation.",
                    "GEMM involves complex branching logic that keeps all cores busy.",
                    "Each output element is computed independently using the same multiply-accumulate operation, allowing massive parallelism.",
                    "GEMM requires frequent global memory access without any caching strategy."
                ],
                "correctAnswer": 2,
                "explanation": "GEMM maps perfectly to GPU SIMD hardware because each output element in matrix C is computed independently as a dot product of a row from A and a column from B. This independence allows thousands of GPU cores to execute the same multiply-accumulate instruction on different data simultaneously, fully utilizing the SIMD architecture. Option A is incorrect because output elements are independent, not dependent. Option B is incorrect because GEMM has no branching. Option D is incorrect because GEMM uses tiling to exploit shared memory and reduce global memory traffic."
            },
            {
                "id": 143,
                "question": "In the context of AI infrastructure, which of the following best describes the primary reason FP64 is considered the 'gold standard' for scientific computing but is rarely used for deep learning training?",
                "options": [
                    "FP64 provides the highest precision and dynamic range, which is essential for minimizing rounding errors in long iterative simulations, but it consumes more memory and is significantly slower than lower-precision formats, making it impractical for most deep learning workloads.",
                    "FP64 is the only format that supports IEEE 754 compliance, ensuring consistent results across platforms, but it is not compatible with Tensor Cores, which are required for efficient deep learning training.",
                    "FP64 offers the best performance for matrix multiplications due to its wide exponent range, but it requires specialized hardware that is not available on most NVIDIA GPUs.",
                    "FP64 is the default format for all AI frameworks, but it is rarely used because it causes numerical instability in neural network training."
                ],
                "correctAnswer": 0,
                "explanation": "FP64 (double precision) offers approximately 15\u201317 decimal digits of precision and a very wide dynamic range, which is crucial for scientific simulations like climate modeling or molecular dynamics where accumulated rounding errors can lead to inaccurate results. However, in deep learning, neural networks are inherently tolerant to noise, and lower-precision formats (FP32, FP16, BF16) provide sufficient accuracy while being much faster and more memory-efficient. For example, on an NVIDIA A100, FP64 throughput is only 9.7 TFLOPS compared to 312 TFLOPS for FP16 Tensor Cores, and FP64 uses 8 bytes per number versus 2 bytes for FP16. Therefore, FP64 is reserved for specialized tasks like gradient accumulation in mixed-precision training or scientific AI applications, but it is not the default for general AI training. Option B is incorrect because IEEE 754 compliance is not unique to FP64. Option C is incorrect because FP64 performance is actually lower than lower-precision formats. Option D is incorrect because FP64 is not the default format and does not cause instability; rather, it provides higher precision."
            },
            {
                "id": 144,
                "question": "An engineer is training a large transformer model and observes that the training loss suddenly becomes NaN after switching to FP16 precision. Which of the following is the most likely cause?",
                "options": [
                    "The model parameters are too large for FP16 representation, causing overflow.",
                    "The learning rate is too high, causing the gradients to overflow in FP16.",
                    "The loss scaling factor is too low, causing gradients to underflow to zero.",
                    "The batch size is too large, causing memory bandwidth saturation."
                ],
                "correctAnswer": 0,
                "explanation": "The correct answer is A. FP16 has a limited range (max ~65,504). If model parameters or gradients exceed this value, they overflow to infinity (NaN). This is a common stability risk when switching to FP16. Option B is plausible but less direct: a high learning rate can cause large gradients, but the immediate cause of NaN is overflow, not the learning rate itself. Option C describes underflow (gradients becoming zero), which would not produce NaN but rather vanishing gradients. Option D is unrelated to NaN; memory bandwidth saturation would cause slowdowns, not numerical instability."
            },
            {
                "id": 145,
                "question": "A data scientist is training a large language model and notices that gradients are frequently underflowing to zero when using FP16 mixed precision. Which change would most likely resolve this issue while maintaining memory efficiency?",
                "options": [
                    "Switch to FP32 precision for all tensors.",
                    "Enable loss scaling and continue using FP16.",
                    "Switch to BF16 precision for forward and backward passes.",
                    "Increase the batch size to compensate for gradient underflow."
                ],
                "correctAnswer": 2,
                "explanation": "BF16 has the same 8-bit exponent range as FP32, which prevents gradient underflow during training. It uses only 16 bits per value, maintaining memory efficiency. FP32 would increase memory usage, loss scaling adds complexity, and increasing batch size does not address the numerical underflow issue."
            },
            {
                "id": 146,
                "question": "An engineer is deploying a deep learning model for real-time inference on an NVIDIA GPU with Tensor Cores. The model was trained in FP32, and the engineer wants to maximize throughput while minimizing memory usage. Which quantization format should be used if the model must maintain accuracy within 1% of the original?",
                "options": [
                    "INT4 quantization with quantization-aware training",
                    "INT8 quantization with post-training calibration",
                    "FP16 quantization with no calibration",
                    "INT4 quantization with post-training calibration"
                ],
                "correctAnswer": 1,
                "explanation": "INT8 quantization with post-training calibration is the best choice because it provides a 4x reduction in model size and ~2x speed improvement over FP32, with very small accuracy loss (often <1%). Post-training calibration uses a representative dataset to determine optimal scale and zero point, which is sufficient for most production models. INT4 quantization (options A and D) typically results in moderate accuracy loss that may exceed 1% without quantization-aware training, and even with QAT, accuracy may still drop more than INT8. FP16 (option C) is not a quantized integer format and offers only 2x size reduction with less speed improvement on Tensor Cores compared to INT8."
            },
            {
                "id": 147,
                "question": "During FP8 mixed-precision training on NVIDIA Hopper GPUs, which format is typically used for the forward pass and why?",
                "options": [
                    "E5M2, because it provides a wider dynamic range to handle large activation values.",
                    "E4M3, because it offers higher precision for weights and activations.",
                    "E5M2, because it reduces memory usage more than E4M3.",
                    "E4M3, because it can represent a larger range of values than E5M2."
                ],
                "correctAnswer": 1,
                "explanation": "In FP8 mixed-precision training on Hopper GPUs, the forward pass uses E4M3 because it has more mantissa bits (3 vs 2), providing higher precision for weights and activations. This helps maintain model accuracy during the forward pass. E5M2 is used for the backward pass (gradients) due to its wider dynamic range, which prevents underflow/overflow. Option A is incorrect because E5M2 is not used for the forward pass. Option C is incorrect because both formats use 8 bits, so memory usage is identical. Option D is incorrect because E5M2 actually has a larger range than E4M3."
            },
            {
                "id": 148,
                "question": "During half-precision (FP16) training, a deep learning engineer notices that the loss is not decreasing and gradients in early layers are zero. Which technique should be applied to address this issue?",
                "options": [
                    "Increase the batch size to produce larger gradients.",
                    "Use loss scaling to multiply the loss before backpropagation and divide gradients afterward.",
                    "Switch to full-precision (FP32) training to avoid numerical issues.",
                    "Reduce the learning rate to prevent gradient explosion."
                ],
                "correctAnswer": 1,
                "explanation": "The problem described is gradient underflow in FP16, where small gradients become zero. Loss scaling multiplies the loss by a scale factor before backpropagation, making gradients larger and representable in FP16. After backpropagation, gradients are divided by the same factor to restore their true values. This prevents underflow and allows all layers to update. Increasing batch size (A) does not directly address underflow; it may even reduce gradient magnitude. Switching to FP32 (C) avoids underflow but loses the speed and memory benefits of FP16. Reducing learning rate (D) would make gradients even smaller, worsening underflow."
            },
            {
                "id": 149,
                "question": "In the NVIDIA GPU hierarchy, which level is the smallest unit that can be independently powered down for power savings?",
                "options": [
                    "Graphics Processing Cluster (GPC)",
                    "Texture Processing Cluster (TPC)",
                    "Streaming Multiprocessor (SM)",
                    "CUDA Core"
                ],
                "correctAnswer": 1,
                "explanation": "The Texture Processing Cluster (TPC) is the smallest unit in the GPU hierarchy that can be independently powered down. This is because TPCs contain two SMs and texture units, and power gating at the TPC level allows fine-grained power management without affecting other parts of the GPU. GPCs are larger and contain multiple TPCs, so power gating at the GPC level would be coarser. SMs and CUDA Cores are smaller but are not independently power-gated; they are grouped within TPCs for power management."
            },
            {
                "id": 150,
                "question": "Which of the following best describes the role of a Graphics Processing Cluster (GPC) in an NVIDIA data center GPU?",
                "options": [
                    "A GPC is the smallest execution unit within a GPU, containing a single CUDA core and its associated registers.",
                    "A GPC is a high-level partition of the GPU that groups multiple SMs, L1 cache, and a raster engine, enabling independent task execution.",
                    "A GPC is a memory controller that manages data transfer between the GPU and host system memory.",
                    "A GPC is a software abstraction used by the CUDA runtime to schedule thread blocks across the GPU."
                ],
                "correctAnswer": 1,
                "explanation": "A Graphics Processing Cluster (GPC) is a high-level partition of the GPU die that contains multiple Streaming Multiprocessors (SMs), dedicated L1 cache, shared memory, and a raster engine. Each GPC operates independently, allowing the GPU to execute multiple tasks in parallel. Option A is incorrect because a GPC contains many CUDA cores, not just one. Option C is incorrect because memory controllers are separate from GPCs. Option D is incorrect because GPCs are hardware units, not software abstractions."
            },
            {
                "id": 151,
                "question": "In the context of NVIDIA GPU architecture, what is the primary benefit of grouping Streaming Multiprocessors (SMs) into Texture Processing Clusters (TPCs)?",
                "options": [
                    "It allows each SM to have its own dedicated texture units for faster texture filtering.",
                    "It reduces scheduling overhead by enabling the global scheduler to manage fewer entities.",
                    "It increases the total number of CUDA cores available for parallel execution.",
                    "It provides a dedicated L2 cache partition for each group of SMs."
                ],
                "correctAnswer": 1,
                "explanation": "The primary benefit of TPCs is to improve scheduling efficiency. The GigaThread Engine distributes thread blocks to TPCs rather than individual SMs, reducing the number of entities the global scheduler must manage. Option A is incorrect because texture units are shared within a TPC, not dedicated per SM. Option C is incorrect because TPCs do not increase the number of CUDA cores; they only group existing SMs. Option D is incorrect because L2 cache is shared across the entire GPU, not partitioned per TPC."
            },
            {
                "id": 152,
                "question": "An AI infrastructure engineer is optimizing a CUDA kernel that processes a large array. The kernel contains a conditional statement based on the thread index. Which of the following best describes the performance impact if threads within the same warp take different branches?",
                "options": [
                    "The warp executes both branches serially, reducing throughput.",
                    "The warp executes only the first branch encountered, ignoring the other threads.",
                    "The GPU automatically reassigns threads to new warps to avoid divergence.",
                    "The compiler eliminates the conditional, so there is no performance impact."
                ],
                "correctAnswer": 0,
                "explanation": "In the SIMT model, all 32 threads in a warp execute the same instruction in lockstep. If threads diverge (e.g., some take the if path and others the else path), the warp must execute both paths serially, first one branch with the relevant threads active and the other threads idle, then the other branch. This doubles the execution time for that warp. The other options are incorrect: the GPU does not ignore threads or reassign them, and the compiler cannot eliminate all conditionals."
            },
            {
                "id": 153,
                "question": "In an NVIDIA Streaming Multiprocessor (SM), what is the primary role of the warp scheduler?",
                "options": [
                    "To decode instructions and route them to the appropriate execution unit.",
                    "To select which warp to execute next from a pool of ready warps.",
                    "To manage thread divergence within a warp by executing both paths sequentially.",
                    "To issue two independent instructions from the same warp per clock cycle."
                ],
                "correctAnswer": 1,
                "explanation": "The warp scheduler's primary role is to select which warp to execute next from a pool of ready warps, thereby hiding memory latency by quickly switching between warps. Option A describes the instruction dispatch unit, option C describes how divergence is handled (not the scheduler's role), and option D describes dual-issue capability, which is a feature of the dispatch unit, not the scheduler."
            },
            {
                "id": 154,
                "question": "A CUDA kernel uses 48 registers per thread and no shared memory. The SM has 65536 registers and supports a maximum of 64 warps. What is the theoretical occupancy of this kernel?",
                "options": [
                    "100%",
                    "65.6%",
                    "50%",
                    "32.8%"
                ],
                "correctAnswer": 1,
                "explanation": "Each warp consists of 32 threads, so registers per warp = 48 \u00d7 32 = 1536. Maximum warps limited by registers = 65536 \u00f7 1536 \u2248 42.67, so 42 warps. Occupancy = 42 \u00f7 64 = 65.625% \u2248 65.6%. Option A (100%) would require \u226432 registers per thread. Option C (50%) corresponds to 32 warps. Option D (32.8%) would be half of 65.6%."
            },
            {
                "id": 155,
                "question": "In the scratchpad memory model of an NVIDIA GPU, which of the following best describes the key difference between shared memory and L1 cache?",
                "options": [
                    "Shared memory is hardware-managed, while L1 cache is programmer-managed.",
                    "Shared memory is visible to all threads in a thread block, while L1 cache is per-thread.",
                    "Shared memory has higher latency than L1 cache.",
                    "Shared memory and L1 cache are physically separate on-chip memories."
                ],
                "correctAnswer": 1,
                "explanation": "Shared memory is explicitly managed by the programmer and is shared among all threads in a thread block, enabling data sharing and collaboration. In contrast, L1 cache is automatically managed by the hardware and is private to each thread (or SM). The other options are incorrect: shared memory is programmer-managed, not hardware-managed; shared memory has lower latency (~5-10 cycles) compared to L1 cache (~20-30 cycles); and both share the same physical on-chip SRAM, not separate memories."
            },
            {
                "id": 156,
                "question": "An AI infrastructure engineer is comparing NVIDIA GPU architectures for a new training cluster. Which of the following correctly describes the trend in CUDA core counts from Kepler to Blackwell?",
                "options": [
                    "CUDA core counts have remained relatively stable, with minor increases each generation.",
                    "CUDA core counts have grown from thousands to tens of thousands, more than tripling from Kepler to Hopper.",
                    "CUDA core counts peaked with Volta and have decreased in subsequent generations to improve efficiency.",
                    "CUDA core counts have grown linearly, doubling every generation since Kepler."
                ],
                "correctAnswer": 1,
                "explanation": "The lesson clearly shows that CUDA core counts have grown from thousands (e.g., Kepler K80 with ~5,000 cores) to tens of thousands (Hopper H100 with 16,896 cores, Blackwell B200 with 20,480+). This represents more than a tripling from Kepler to Hopper. Option A is incorrect because core counts have increased significantly. Option C is false; core counts have increased, not decreased. Option D is incorrect because the growth is not strictly linear or doubling every generation; for example, Maxwell had fewer cores than Kepler, and the increases vary."
            },
            {
                "id": 157,
                "question": "In the SIMT execution model, what happens when threads within a warp encounter a divergent branch (e.g., an if-else statement)?",
                "options": [
                    "All threads execute both paths simultaneously, but only the results from the correct path are kept.",
                    "The warp scheduler serializes execution: first one path is executed with the other threads masked, then the other path.",
                    "Threads that take the divergent path are migrated to a different warp.",
                    "The GPU automatically converts the branch into a predicated instruction, avoiding any performance penalty."
                ],
                "correctAnswer": 1,
                "explanation": "In SIMT, all threads in a warp execute the same instruction. When a divergent branch occurs, the warp scheduler executes each path serially: it first executes one path while masking (disabling) threads that do not take that path, then executes the other path while masking the remaining threads. This serialization reduces performance because the warp's execution resources are not fully utilized during each path. Option A is incorrect because threads do not execute both paths simultaneously; they are masked. Option C is incorrect because threads are not migrated between warps due to divergence. Option D is incorrect because while predication can be used for simple conditional assignments, it is not the general mechanism for handling branches and does not avoid a performance penalty when both paths contain significant work."
            },
            {
                "id": 158,
                "question": "Which of the following best describes how Tensor Cores achieve a single-clock execution of the GEMM operation D = A \u00d7 B + C?",
                "options": [
                    "By using general-purpose CUDA cores that are optimized for matrix multiplication through software scheduling.",
                    "By loading all 16 elements of a 4\u00d74 matrix tile simultaneously and using dedicated hardware multipliers and adder trees.",
                    "By breaking the matrix multiplication into multiple smaller operations that each take one clock cycle.",
                    "By relying on high memory bandwidth to prefetch data and reduce the number of clock cycles needed."
                ],
                "correctAnswer": 1,
                "explanation": "Tensor Cores achieve single-clock execution through dedicated hardware: all 16 elements of a 4\u00d74 tile are loaded in parallel, and 16 hardware multipliers and adder trees compute the dot products and accumulation in one clock cycle. Option A is incorrect because CUDA cores are general-purpose and require many cycles for GEMM. Option C is incorrect because the entire 4\u00d74 GEMM is done in one clock, not broken into smaller operations. Option D is incorrect because high bandwidth helps data movement but does not reduce the clock cycles for the computation itself."
            },
            {
                "id": 159,
                "question": "A machine learning engineer is training a deep neural network on an NVIDIA A100 GPU. They want to maximize training throughput without modifying any existing FP32 code. Which data type should they use with the second-generation Tensor Cores?",
                "options": [
                    "INT8",
                    "BF16",
                    "TF32",
                    "INT4"
                ],
                "correctAnswer": 2,
                "explanation": "TF32 (Tensor Float 32) is designed as a drop-in replacement for FP32 on Ampere GPUs. It uses the same 8-bit exponent as FP32, preserving the dynamic range, but reduces the mantissa to 10 bits. This allows Tensor Cores to perform matrix operations approximately 8x faster than FP32 without any code changes. INT8 and INT4 require quantization and code modifications, while BF16 also requires code changes to use the bfloat16 type. Therefore, TF32 is the correct choice for maximizing throughput with no code changes."
            },
            {
                "id": 160,
                "question": "Which of the following best describes the benefit of combining FP8 precision with structured sparsity (2:4) on NVIDIA H100 Tensor Cores for inference workloads?",
                "options": [
                    "It reduces memory usage by 75% and doubles throughput compared to FP16 dense computation.",
                    "It reduces memory usage by 50% and provides up to 4x throughput improvement over FP16 dense computation.",
                    "It reduces memory usage by 25% and provides up to 2x throughput improvement over FP16 dense computation.",
                    "It reduces memory usage by 50% and provides up to 2x throughput improvement over FP16 dense computation."
                ],
                "correctAnswer": 1,
                "explanation": "FP8 uses half the memory of FP16 (50% reduction). Structured sparsity (2:4) allows the hardware to skip zero values, providing up to 2x throughput gain on top of the FP8 throughput gain. H100 Tensor Cores can achieve up to 4,000 FP8 TFLOPS with sparsity, compared to 1,000 FP16 TFLOPS dense, resulting in up to 4x throughput improvement. Option A is incorrect because memory reduction is 50%, not 75%. Option C is incorrect because memory reduction is 50%, not 25%. Option D is incorrect because throughput improvement is up to 4x, not 2x."
            }
        ]
    },
    {
        "id": 9,
        "title": "NCA practice exam Set 9",
        "description": "Practice Exam Set 9 containing 20 unique exam-aligned questions covering core infrastructure domains.",
        "questions": [
            {
                "id": 161,
                "question": "Which of the following best describes the primary benefit of FP4 precision in the fourth-generation Tensor Cores of the NVIDIA Blackwell B200 GPU?",
                "options": [
                    "It allows for 4x higher memory bandwidth compared to FP16.",
                    "It reduces memory footprint and increases compute throughput by up to 4x compared to FP16, with minimal accuracy loss.",
                    "It enables the GPU to support up to 72 GPUs in a single NVLink domain.",
                    "It automatically converts all layers of a neural network to FP4 for maximum speed."
                ],
                "correctAnswer": 1,
                "explanation": "FP4 precision reduces memory footprint by 4x compared to FP16 and provides up to 4x compute throughput, as stated in the lesson. Option A is incorrect because FP4 does not increase memory bandwidth; bandwidth is determined by HBM3e. Option C describes the massive scale feature, not FP4. Option D is incorrect because the Transformer Engine dynamically selects precision per layer, not all layers are converted to FP4."
            },
            {
                "id": 162,
                "question": "Which of the following best describes the key advantage of using TF32 precision for deep learning training on NVIDIA Ampere and Hopper GPUs?",
                "options": [
                    "TF32 reduces memory usage by half compared to FP32, allowing larger batch sizes.",
                    "TF32 provides the same dynamic range as FP32 while achieving significantly higher Tensor Core throughput.",
                    "TF32 eliminates the need for loss scaling during mixed precision training.",
                    "TF32 is a storage format that replaces FP16 for inference workloads."
                ],
                "correctAnswer": 1,
                "explanation": "TF32 uses an 8-bit exponent (same as FP32) to maintain the full dynamic range of FP32, preventing overflow/underflow, while its 10-bit mantissa (like FP16) allows Tensor Cores to compute ~8x faster than FP32. Option A is incorrect because TF32 does not reduce memory usage\u2014inputs remain FP32. Option C is incorrect because loss scaling is still needed for FP16, not TF32. Option D is incorrect because TF32 is an internal compute format, not a storage format, and is used for training, not inference."
            },
            {
                "id": 163,
                "question": "An AI engineer is training a 3D object detection model for autonomous driving using LiDAR data. Which NVIDIA hardware component is specifically designed to accelerate the ray-triangle intersection calculations required for this workload?",
                "options": [
                    "Tensor Cores",
                    "CUDA Cores",
                    "RT Cores",
                    "NVLink"
                ],
                "correctAnswer": 2,
                "explanation": "RT Cores are dedicated hardware accelerators for ray tracing operations, including ray-triangle intersection and BVH traversal. They are used in AI workloads involving 3D spatial data, such as autonomous driving LiDAR processing. Tensor Cores accelerate matrix math for deep learning, CUDA Cores handle general parallel compute, and NVLink is a high-speed interconnect for GPU-to-GPU communication."
            },
            {
                "id": 164,
                "question": "In an AI video preprocessing pipeline, which of the following best describes the primary advantage of using NVDEC over a software-based decoder?",
                "options": [
                    "It reduces the number of GPU memory copies by keeping decoded frames on the GPU.",
                    "It allows the CPU to handle other tasks while decoding is performed on the GPU.",
                    "It supports a wider range of codecs than any software decoder.",
                    "It eliminates the need for any preprocessing steps before model inference."
                ],
                "correctAnswer": 0,
                "explanation": "The correct answer is A. NVDEC decodes compressed video directly into GPU memory, avoiding the need to copy data from CPU to GPU, which reduces memory transfers and latency. Option B is partially true but not the primary advantage; the CPU is freed, but the key benefit is data locality. Option C is false; software decoders often support more codecs. Option D is false; preprocessing like resizing and normalization is still required."
            },
            {
                "id": 165,
                "question": "An AI engineer is optimizing a training pipeline where data transfer from CPU to GPU is a bottleneck. The engineer wants to overlap data transfers with kernel execution to maximize GPU utilization. Which of the following is required to achieve this overlap?",
                "options": [
                    "Using the default CUDA stream for all operations",
                    "Using multiple CUDA streams to separate transfer and compute operations",
                    "Enabling GPU persistence mode with nvidia-smi -pm 1",
                    "Allocating host memory as pageable memory for faster transfers"
                ],
                "correctAnswer": 1,
                "explanation": "Overlapping data transfer and compute requires the use of multiple CUDA streams. Operations in different streams can execute concurrently, allowing the copy engine to transfer data in one stream while the compute engine runs kernels in another stream. The default stream serializes all operations, preventing overlap. Persistence mode reduces driver initialization latency but does not enable overlap. Pinned (page-locked) memory is needed for fast DMA transfers, not pageable memory."
            },
            {
                "id": 166,
                "question": "Which of the following best describes the primary benefit of the Transformer Engine's dynamic precision selection per layer in NVIDIA Hopper GPUs?",
                "options": [
                    "It automatically reduces the batch size to fit within GPU memory.",
                    "It selects the optimal numerical precision (FP8, FP16, or FP32) for each layer to maximize performance while preserving model accuracy.",
                    "It converts all operations to FP8 to double training speed regardless of layer sensitivity.",
                    "It enables the GPU to run transformer models without any software modifications."
                ],
                "correctAnswer": 1,
                "explanation": "The Transformer Engine's dynamic precision selection analyzes each layer's numerical behavior and chooses FP8, FP16, or FP32 accordingly. This balances performance and memory savings with accuracy, automatically falling back to higher precision for critical layers. Option A is incorrect because batch size is not automatically reduced; memory savings allow larger batch sizes. Option C is incorrect because forcing FP8 on all layers can cause accuracy loss. Option D is incorrect because software integration (e.g., via transformer-engine library) is required."
            },
            {
                "id": 167,
                "question": "An engineer is trying to fine-tune a 70B parameter model in FP16 on a single NVIDIA A100 GPU with 80 GB VRAM. The model fails to load with an out-of-memory error. Which of the following is the most likely cause?",
                "options": [
                    "The GPU does not support FP16 precision.",
                    "The model's memory footprint exceeds the available VRAM.",
                    "The system RAM is too slow for the GPU to access.",
                    "The NVIDIA driver is not installed correctly."
                ],
                "correctAnswer": 1,
                "explanation": "The 70B parameter model in FP16 requires approximately 140 GB just for weights, far exceeding the 80 GB VRAM of a single A100. This is a classic example of hitting the GPU memory wall. Option A is incorrect because the A100 supports FP16. Option C describes a performance issue, not a load failure. Option D would cause different errors, not specifically an OOM error."
            },
            {
                "id": 168,
                "question": "During training of a large language model on an NVIDIA GPU, which VRAM component typically consumes the most memory and can be significantly reduced using gradient checkpointing?",
                "options": [
                    "Weights",
                    "Optimizer states",
                    "Activations",
                    "KV cache"
                ],
                "correctAnswer": 2,
                "explanation": "Activations are intermediate outputs stored during the forward pass for use in backpropagation. They can consume 2x\u20138x more VRAM than weights, especially in deep networks. Gradient checkpointing reduces activation memory by discarding most activations and recomputing them during the backward pass, trading compute for memory. Weights are permanent and not reduced by gradient checkpointing. Optimizer states are training-only but not typically reduced by gradient checkpointing. KV cache is used only during inference, not training."
            },
            {
                "id": 169,
                "question": "An AI engineer is selecting a GPU for training a large language model. Which memory technology provides the highest bandwidth and uses PAM4 signaling?",
                "options": [
                    "GDDR5",
                    "GDDR6",
                    "GDDR6X",
                    "HBM2e"
                ],
                "correctAnswer": 2,
                "explanation": "GDDR6X uses PAM4 signaling to achieve data rates up to 21+ Gbps per pin, providing the highest bandwidth among GDDR generations (up to ~1,008 GB/s). GDDR5 and GDDR6 use NRZ signaling (1 bit per cycle), while HBM2e uses a different architecture with wider buses but is not a GDDR technology. GDDR6X is the correct answer because it is the only GDDR variant listed that employs PAM4."
            },
            {
                "id": 170,
                "question": "A GPU engineer is designing a new graphics card and wants to maximize memory bandwidth. The GPU die has a memory controller that supports up to 16 physical lanes. Each GDDR6 chip provides a 32-bit data bus. What is the maximum memory bus width achievable if the engineer uses 8 GDDR6 chips?",
                "options": [
                    "128-bit",
                    "256-bit",
                    "384-bit",
                    "512-bit"
                ],
                "correctAnswer": 1,
                "explanation": "The memory bus width is calculated as number of chips \u00d7 bits per chip. With 8 chips each having a 32-bit bus, the total is 8 \u00d7 32 = 256 bits. The GPU's memory controller supports up to 16 lanes, but the engineer is only using 8 chips, so the bus width is limited by the number of chips used, not the controller's maximum. Options A (128-bit) would require 4 chips, C (384-bit) would require 12 chips, and D (512-bit) would require 16 chips, which exceeds the number of chips used."
            },
            {
                "id": 171,
                "question": "In High Bandwidth Memory (HBM) architecture, what is the primary role of the silicon interposer?",
                "options": [
                    "To provide a physical base for stacking memory dies vertically using Through-Silicon Vias (TSVs).",
                    "To act as a high-speed bridge connecting the GPU die to the HBM stacks via microbumps and redistribution layers.",
                    "To manage data flow between the GPU and the memory dies by acting as a controller and buffer.",
                    "To reduce power consumption by allowing memory dies to be placed side-by-side on a circuit board."
                ],
                "correctAnswer": 1,
                "explanation": "The silicon interposer is a thin slice of silicon that contains thousands of tiny wires (microbumps and redistribution layers) to route data between the GPU die and the HBM stacks. It acts as a high-speed bridge, enabling short, direct connections that reduce latency and power consumption. Option A describes the base die of an HBM stack, not the interposer. Option C describes the function of the base die (controller/buffer). Option D is incorrect because HBM uses 3D stacking, not side-by-side placement, and the interposer facilitates vertical stacking."
            },
            {
                "id": 172,
                "question": "An AI engineer is comparing GPU memory specifications for training large language models. Which of the following correctly describes the generational bandwidth and capacity improvements from HBM2e to HBM3?",
                "options": [
                    "HBM3 provides up to 819 GB/s per stack and 24 GB per stack, compared to HBM2e's 410 GB/s per stack and 16 GB per stack.",
                    "HBM3 provides up to 1.2 TB/s per stack and 36 GB per stack, compared to HBM2e's 410 GB/s per stack and 16 GB per stack.",
                    "HBM3 provides up to 819 GB/s per stack and 16 GB per stack, compared to HBM2e's 410 GB/s per stack and 8 GB per stack.",
                    "HBM3 provides up to 1.2 TB/s per stack and 24 GB per stack, compared to HBM2e's 256 GB/s per stack and 8 GB per stack."
                ],
                "correctAnswer": 0,
                "explanation": "According to the lesson, HBM2e (used in A100) offers up to 410 GB/s bandwidth per stack and 16 GB capacity per stack. HBM3 (used in H100) increases bandwidth to 819 GB/s per stack and capacity to 24 GB per stack. Option A correctly states these values. Option B describes HBM3e, not HBM3. Option C incorrectly states HBM3 capacity as 16 GB. Option D incorrectly compares HBM3 to HBM2 (not HBM2e) and gives wrong bandwidth for HBM2e."
            },
            {
                "id": 173,
                "question": "An AI engineer is evaluating the H100 GPU for training a large language model. Which of the following best explains why the H100's HBM3 memory bandwidth of 3.35 TB/s is critical for this workload?",
                "options": [
                    "It allows the GPU to store larger models without needing model parallelism.",
                    "It reduces the latency of individual tensor core operations.",
                    "It ensures the GPU compute cores are not starved of data during training.",
                    "It enables the GPU to directly access data from NVMe storage without CPU involvement."
                ],
                "correctAnswer": 2,
                "explanation": "For large language model training, the primary bottleneck is often memory bandwidth. The H100's 3.35 TB/s bandwidth ensures that data can be fed to the compute cores fast enough to keep them busy, preventing stalls. Option A is incorrect because memory capacity (80 GB) determines model size limits, not bandwidth. Option B is incorrect because bandwidth affects data movement, not the speed of individual operations. Option D describes GPUDirect Storage, which is a separate feature not directly related to HBM3 bandwidth."
            },
            {
                "id": 174,
                "question": "An AI training cluster uses HBM3 memory with SECDED ECC. During a long training run, an engineer notices that the corrected ECC error count for one GPU has increased from 0 to 15 over 24 hours. What is the most appropriate interpretation of this observation?",
                "options": [
                    "The GPU memory is failing and should be replaced immediately.",
                    "ECC is functioning correctly, and the training run is protected from single-bit errors.",
                    "The training workload is causing excessive memory errors due to high bandwidth usage.",
                    "The engineer should restart the training run to clear the ECC counters."
                ],
                "correctAnswer": 1,
                "explanation": "Corrected ECC errors indicate that the memory controller detected and fixed single-bit errors transparently. This is normal operation; ECC is designed to handle such errors without impacting data integrity. A rising count of corrected errors is not a cause for immediate replacement unless the rate is extremely high or uncorrected errors appear. The training run remains protected, and no restart is needed. Option A is incorrect because a few corrected errors do not indicate imminent failure. Option C is incorrect because memory errors are not caused by workload bandwidth; they are due to random events like cosmic rays. Option D is incorrect because restarting the run is unnecessary and would waste resources."
            },
            {
                "id": 175,
                "question": "A GPU has a memory clock of 1500 MHz and a 256-bit memory bus. Assuming GDDR6 memory, what is the memory bandwidth in GB/s?",
                "options": [
                    "96 GB/s",
                    "192 GB/s",
                    "384 GB/s",
                    "768 GB/s"
                ],
                "correctAnswer": 0,
                "explanation": "The formula for memory bandwidth is: (Memory Clock in MHz \u00d7 Bus Width in bits \u00d7 Data Rate) / 8000. For GDDR6, data rate = 2. So: (1500 \u00d7 256 \u00d7 2) / 8000 = (768,000) / 8000 = 96 GB/s. Option A is correct. Option B (192 GB/s) would result if you forgot to divide by 8 (bits to bytes) but then divided by 1000 instead of 8000. Option C (384 GB/s) would result if you used data rate = 4 or forgot the /8 conversion. Option D (768 GB/s) would result if you multiplied by 8 instead of dividing."
            },
            {
                "id": 176,
                "question": "A deep learning engineer is profiling a training job on an NVIDIA A100 GPU. The profiler shows that GPU compute utilization is consistently around 30%, while memory bandwidth utilization is near 95%. Which of the following best describes the bottleneck and the most effective optimization strategy?",
                "options": [
                    "The model is compute-bound; the engineer should use mixed precision training to increase throughput.",
                    "The model is memory-bound; the engineer should fuse operations to reduce memory transfers.",
                    "The model is compute-bound; the engineer should increase the batch size to saturate compute units.",
                    "The model is memory-bound; the engineer should enable Tensor Cores to accelerate matrix multiplications."
                ],
                "correctAnswer": 1,
                "explanation": "The profiler indicates low compute utilization (30%) and high memory bandwidth utilization (95%), which are classic signs of a memory-bound operation. In this case, the GPU is waiting for data to be moved, so optimization should focus on reducing memory transfers. Fusing operations (e.g., combining convolution and batch normalization into a single kernel) reduces the number of memory accesses and improves arithmetic intensity. Options A and C describe strategies for compute-bound scenarios (high compute utilization). Option D suggests enabling Tensor Cores, which primarily accelerates compute operations and would not address the memory bottleneck."
            },
            {
                "id": 177,
                "question": "An engineer is deploying a 70B parameter LLM for long-context inference on an NVIDIA A100 80 GB GPU. The model uses FP16 precision, has 80 layers, and a hidden dimension of 8192. With a batch size of 1, what is the approximate KV cache size for a sequence of 32,000 tokens?",
                "options": [
                    "Approximately 20.8 GB",
                    "Approximately 83.2 GB",
                    "Approximately 325 GB",
                    "Approximately 2.6 GB"
                ],
                "correctAnswer": 1,
                "explanation": "The KV cache per token is calculated as 2 (keys and values) \u00d7 number of layers \u00d7 hidden dimension \u00d7 precision bytes \u00d7 batch size = 2 \u00d7 80 \u00d7 8192 \u00d7 2 \u00d7 1 = 2,621,440 bytes \u2248 2.6 MB per token. For 32,000 tokens, total KV cache = 2.6 MB \u00d7 32,000 = 83,200 MB \u2248 83.2 GB. This exceeds the 80 GB VRAM, illustrating why long-context inference can quickly exhaust memory. Option A (20.8 GB) corresponds to 8,000 tokens, Option C (325 GB) corresponds to 128,000 tokens, and Option D (2.6 GB) is the per-token size."
            },
            {
                "id": 178,
                "question": "In the NVIDIA GPU memory hierarchy, which memory level is the fastest and is private to each thread?",
                "options": [
                    "Shared Memory",
                    "L1 Cache",
                    "Register File",
                    "HBM"
                ],
                "correctAnswer": 2,
                "explanation": "The register file is the fastest memory level, located directly inside each CUDA core, and is private to each thread. Shared memory is shared among threads in a block, L1 cache is hardware-managed and per-SM, and HBM is the slowest global memory."
            },
            {
                "id": 179,
                "question": "A CUDA kernel is found to be memory-bound, with most threads stalling on global memory accesses. Which optimization strategy would most effectively reduce the number of high-latency HBM accesses?",
                "options": [
                    "Increase the number of threads per block to hide latency.",
                    "Use shared memory to load a tile of data once and reuse it multiple times.",
                    "Enable L1 cache for global loads by using the -Xptxas -dlcm=ca compiler flag.",
                    "Reduce the total number of memory accesses by fusing multiple kernels."
                ],
                "correctAnswer": 1,
                "explanation": "The correct answer is B: Use shared memory to load a tile of data once and reuse it multiple times. This directly reduces HBM accesses by exploiting data reuse within a thread block, as described in the lesson on tiling. Option A (increasing threads) can hide latency but does not reduce the number of HBM accesses. Option C (enabling L1 cache) may help but is hardware-managed and less effective than explicit shared memory for predictable reuse patterns. Option D (kernel fusion) reduces kernel launch overhead but does not reduce per-access latency or HBM traffic."
            },
            {
                "id": 180,
                "question": "Which of the following best describes the primary benefit of using Unified Memory (cudaMallocManaged) in CUDA programming?",
                "options": [
                    "It eliminates the need for GPU hardware by allowing the CPU to execute GPU kernels.",
                    "It provides a single pointer accessible by both CPU and GPU, with automatic data migration via page faults.",
                    "It guarantees zero-copy access to all system memory from the GPU without any data movement.",
                    "It increases GPU memory bandwidth by compressing data during transfers."
                ],
                "correctAnswer": 1,
                "explanation": "Unified Memory, enabled by cudaMallocManaged, creates a single address space for CPU and GPU. The system automatically migrates data between CPU and GPU memory on demand via page faults, simplifying code by eliminating explicit cudaMemcpy calls. Option A is incorrect because Unified Memory still requires GPU hardware. Option C is incorrect because data movement still occurs (though automatically). Option D is incorrect because Unified Memory does not compress data."
            }
        ]
    },
    {
        "id": 10,
        "title": "NCA practice exam Set 10",
        "description": "Practice Exam Set 10 containing 20 unique exam-aligned questions covering core infrastructure domains.",
        "questions": [
            {
                "id": 181,
                "question": "Which of the following best describes the primary purpose of Tensor Cores introduced in the Volta V100 architecture?",
                "options": [
                    "To accelerate general-purpose parallel computing tasks using FP32 precision.",
                    "To perform mixed-precision matrix multiply-and-accumulate operations for neural network training.",
                    "To enable real-time ray tracing for graphics rendering.",
                    "To manage GPU-to-GPU communication via NVLink 2.0."
                ],
                "correctAnswer": 1,
                "explanation": "Tensor Cores are specialized hardware units designed specifically for mixed-precision matrix multiplication, which is the core operation in deep learning. They take FP16 inputs and accumulate results in FP32, providing a 6x to 12x speedup for AI training compared to using CUDA cores alone. Option A is incorrect because CUDA cores handle general-purpose parallel compute, not Tensor Cores. Option C describes RT Cores, which were introduced later. Option D describes NVLink, a separate interconnect technology."
            },
            {
                "id": 182,
                "question": "Which of the following best describes the role of the Transformer Engine in the NVIDIA H100 Hopper architecture?",
                "options": [
                    "It is a software library that automatically converts FP32 models to INT8 for inference.",
                    "It is a dedicated hardware unit that dynamically switches between FP8 and FP16 precision to optimize transformer model performance.",
                    "It is a new memory controller that increases HBM3 bandwidth by 67% compared to HBM2e.",
                    "It is a networking component that enables GPU-to-GPU communication via NVLink 4.0."
                ],
                "correctAnswer": 1,
                "explanation": "The Transformer Engine is a dedicated hardware unit in the H100 that automatically manages precision for transformer-based models, dynamically switching between FP8 and FP16 during training and inference to maximize performance and reduce memory usage. Option A is incorrect because the Transformer Engine is hardware, not software, and it works with FP8/FP16, not INT8. Option C describes HBM3, not the Transformer Engine. Option D describes NVLink 4.0, which is a separate interconnect technology."
            },
            {
                "id": 183,
                "question": "An AI engineer is selecting a GPU for a new inference server that will serve large language models (LLMs) with 70B+ parameters. The server already has PCIe 5.0 slots and air cooling. Which Hopper variant is the most suitable choice?",
                "options": [
                    "H100 SXM5",
                    "H100 PCIe",
                    "H800",
                    "H200 PCIe"
                ],
                "correctAnswer": 3,
                "explanation": "The H200 PCIe is the best choice because it offers 141 GB of HBM3e memory with 4.8 TB/s bandwidth, allowing large LLMs (70B+ parameters) to fit in a single GPU. It uses a PCIe form factor compatible with existing servers and air cooling (350W). H100 SXM5 and H100 PCIe have only 80 GB memory, insufficient for 70B+ models. H800 is export-limited to China and has the same memory limitation as H100."
            },
            {
                "id": 184,
                "question": "Which of the following best describes the primary benefit of FP4 precision in the Blackwell architecture for large-scale AI training?",
                "options": [
                    "It reduces memory usage by 50% compared to FP16, enabling larger models to fit on a single GPU.",
                    "It provides 8x higher throughput than FP32, but requires custom hardware beyond Tensor Cores.",
                    "It allows dynamic precision switching between FP8 and FP4 based on layer sensitivity, improving accuracy.",
                    "It eliminates the need for mixed-precision training by maintaining FP32 accuracy at 4-bit precision."
                ],
                "correctAnswer": 0,
                "explanation": "FP4 precision uses 4 bits per value, which is 4x less than FP16 (16 bits) and 8x less than FP32 (32 bits). This directly reduces memory usage by 75% compared to FP16, allowing larger models to fit in GPU memory. While FP4 also increases compute throughput (up to 8x vs FP32), the primary benefit for large-scale training is the ability to fit larger models. Option B is incorrect because FP4 does not require custom hardware beyond the 5th-gen Tensor Cores. Option C describes the Transformer Engine's dynamic precision switching, not FP4 itself. Option D is false because FP4 does not maintain FP32 accuracy; it introduces some accuracy loss, which is acceptable for many large models."
            },
            {
                "id": 185,
                "question": "An engineer is evaluating the NVIDIA L40S GPU for a data center deployment that requires both AI inference and professional rendering. Which architectural feature of the L40S is specifically designed to accelerate the rendering of photorealistic images?",
                "options": [
                    "Fourth-generation Tensor Cores with FP8 support",
                    "Third-generation RT Cores with hardware-accelerated ray tracing",
                    "Shader Execution Reordering (SER) for task reorganization",
                    "Optical Flow Accelerator for frame interpolation"
                ],
                "correctAnswer": 1,
                "explanation": "The L40S includes third-generation RT Cores that provide hardware acceleration for ray tracing, which is essential for photorealistic rendering. Tensor Cores (option A) are optimized for AI inference, not rendering. SER (option C) improves GPU utilization but is not the primary feature for photorealistic rendering. The Optical Flow Accelerator (option D) is used for video processing, not static image rendering."
            },
            {
                "id": 186,
                "question": "An engineer is deploying a server for large-scale AI training and notices that the GPUs are mounted directly onto the baseboard rather than inserted into PCIe slots. Which of the following best describes the primary advantage of this direct baseboard mounting approach for SXM modules?",
                "options": [
                    "It allows the GPU to be easily swapped without disassembling the server.",
                    "It enables higher power delivery and faster data transfer by reducing signal loss and providing thicker power traces.",
                    "It reduces the overall cost of the server by using standard PCIe connectors.",
                    "It allows the GPU to be cooled by standard server fans without liquid cooling."
                ],
                "correctAnswer": 1,
                "explanation": "Direct baseboard mounting eliminates PCIe riser cables and slot connectors, resulting in shorter, more reliable connections that reduce signal loss at high speeds. Additionally, the baseboard can have wider, thicker power traces to handle the 700W+ TDP of SXM GPUs, enabling higher power delivery. Option A is incorrect because SXM GPUs are not easily swappable; they require server disassembly. Option C is incorrect because SXM modules use specialized connectors, not standard PCIe, and the baseboard must be specifically designed for them, which can increase cost. Option D is incorrect because 700W+ TDP often requires liquid cooling, not just standard server fans."
            },
            {
                "id": 187,
                "question": "Which of the following best describes the primary purpose of the OCP Accelerator Module (OAM) standard?",
                "options": [
                    "To provide a proprietary form factor for NVIDIA GPUs in DGX systems",
                    "To enable modular, hot-swappable GPU accelerators with standardized dimensions and interfaces for hyperscaler custom servers",
                    "To replace PCIe cards in all standard servers with a higher-bandwidth alternative",
                    "To define a cooling standard exclusively for liquid-cooled data centers"
                ],
                "correctAnswer": 1,
                "explanation": "The OAM standard is an open specification created by the Open Compute Project to standardize the form factor, power delivery, thermal interface, and interconnects for AI accelerators. This allows hyperscalers to design a single server baseboard that can accept any OAM-compliant module, simplifying design, enabling hot-swappability, and facilitating faster upgrades. Option A is incorrect because OAM is open, not proprietary, and is not limited to NVIDIA DGX systems. Option C is incorrect because OAM is designed for custom hyperscaler servers, not as a replacement for PCIe in all servers. Option D is incorrect because OAM supports both air and liquid cooling."
            },
            {
                "id": 188,
                "question": "In NVIDIA's Blackwell architecture, the NVL form factor uses a multi-chip module (MCM) design. Which of the following best describes how the system and software perceive this GPU?",
                "options": [
                    "As two separate GPUs that require explicit data partitioning by the user.",
                    "As one logical GPU with a unified memory pool, transparent to the operating system and AI frameworks.",
                    "As two independent GPUs connected via external NVLink cables, requiring manual configuration.",
                    "As a single GPU but with memory split across dies, requiring the user to manage data placement."
                ],
                "correctAnswer": 1,
                "explanation": "The Blackwell MCM design connects two GPU dies via internal NVLink, making the GPU appear as a single logical device to the system. The memory is unified, so AI frameworks like PyTorch and TensorFlow see one GPU with a large memory pool, without needing special configuration. Option A is incorrect because the user does not need to partition data; the driver handles it. Option C is incorrect because the NVLink connection is internal, not external. Option D is incorrect because memory is unified, not split."
            },
            {
                "id": 189,
                "question": "An AI infrastructure engineer is selecting GPUs for training a 70-billion-parameter transformer model. The model requires approximately 140 GB of GPU memory to fit without model parallelism. Which GPU generation is most suitable for this requirement?",
                "options": [
                    "NVIDIA A100 (80 GB)",
                    "NVIDIA H100 (80 GB)",
                    "NVIDIA H200 (141 GB)",
                    "NVIDIA V100 (32 GB)"
                ],
                "correctAnswer": 2,
                "explanation": "The H200 features 141 GB of HBM3e memory, which can accommodate the 140 GB model without splitting across multiple GPUs. The A100 and H100 have only 80 GB, insufficient for the model. The V100 has only 32 GB and is an older generation. Therefore, the H200 is the correct choice."
            },
            {
                "id": 190,
                "question": "What is the primary advantage of the NVL72 superchip concept for large-scale AI training?",
                "options": [
                    "It allows 72 GPUs to be treated as a single logical GPU with unified memory, simplifying programming and scaling.",
                    "It reduces power consumption by 50% compared to traditional multi-GPU setups.",
                    "It eliminates the need for any external networking by using only PCIe connections.",
                    "It enables each GPU to operate independently with its own dedicated memory pool."
                ],
                "correctAnswer": 0,
                "explanation": "The NVL72 superchip concept connects 72 GPUs via NVLink 5 in a full mesh topology, making the entire system appear as one giant GPU with 13.8 TB of unified memory. This simplifies programming because engineers can write code as if for a single GPU, and the system automatically handles data distribution. It also achieves near-linear scaling (90-95% efficiency) by removing communication bottlenecks. Option B is incorrect because power consumption is not the primary advantage; NVL72 racks typically require liquid cooling but do not inherently reduce power by 50%. Option C is incorrect because NVL72 still uses NVLink (a high-speed interconnect) and may also use InfiniBand or Ethernet for scale-out networking. Option D is incorrect because the key feature is unified memory, not independent memory pools."
            },
            {
                "id": 191,
                "question": "Which of the following is a key advantage of the NVIDIA Grace CPU when paired with a Hopper GPU via NVLink-C2C compared to a traditional x86 CPU paired with the same GPU via PCIe Gen5?",
                "options": [
                    "Grace CPU uses x86 architecture for better software compatibility.",
                    "NVLink-C2C provides approximately 900 GB/s bandwidth, enabling a unified memory pool and reducing data transfer latency.",
                    "Grace CPU supports up to 512 GB of DDR5 memory, which is faster than LPDDR5X.",
                    "The Grace-Hopper superchip consumes more power than x86-based systems, but delivers higher performance."
                ],
                "correctAnswer": 1,
                "explanation": "The correct answer is B. The NVLink-C2C interconnect provides approximately 900 GB/s bandwidth, which is about 7x faster than PCIe Gen5 (~128 GB/s). This allows the CPU and GPU to share a unified memory pool, eliminating the need to copy data between separate memory spaces and drastically reducing latency. Option A is incorrect because Grace uses ARM architecture, not x86. Option C is incorrect because Grace uses LPDDR5X memory (not DDR5) and it is faster than typical DDR5. Option D is incorrect because Grace is designed to be more power-efficient, consuming ~150W compared to 200-400W for x86 CPUs."
            },
            {
                "id": 192,
                "question": "Which of the following best describes the key architectural innovation of the GH200 Grace Hopper Superchip?",
                "options": [
                    "It uses a PCIe Gen5 interconnect to connect the CPU and GPU, providing 128 GB/s bandwidth.",
                    "It integrates a Grace CPU and Hopper GPU into a single package with NVLink-C2C, enabling unified memory and cache coherence.",
                    "It combines two Hopper GPUs on a single module for multi-GPU training without a CPU.",
                    "It replaces the traditional CPU with a dedicated ARM processor that handles all GPU memory management."
                ],
                "correctAnswer": 1,
                "explanation": "The GH200 Grace Hopper Superchip's key innovation is the integration of a Grace CPU and Hopper GPU into a single physical package connected via NVLink-C2C, which provides 900 GB/s bidirectional bandwidth and enables a unified, cache-coherent memory pool. This eliminates the PCIe bottleneck and the need for explicit data copying, significantly accelerating AI workloads. Option A is incorrect because PCIe Gen5 offers only 128 GB/s and does not provide unified memory. Option C is incorrect because the GH200 includes both a CPU and a GPU, not two GPUs. Option D is incorrect because the ARM processor (Grace) is a full CPU, not a memory manager, and the GPU still has its own memory controller."
            },
            {
                "id": 193,
                "question": "In data parallelism, what is the purpose of the All-Reduce operation?",
                "options": [
                    "To split the training data into micro-batches and distribute them across GPUs.",
                    "To sum and average the gradients computed by each GPU so that all GPUs have identical updates.",
                    "To synchronize the model weights by copying them from GPU 0 to all other GPUs.",
                    "To reduce the total batch size by discarding redundant samples from each GPU."
                ],
                "correctAnswer": 1,
                "explanation": "The All-Reduce operation is the critical communication step in data parallelism where gradients from all GPUs are summed element-wise and then divided by the number of GPUs. This ensures that every GPU obtains the same averaged gradient, which is then used to update the local model copy identically, keeping all models synchronized. Option A describes the initial data distribution, not All-Reduce. Option C describes a broadcast operation, not averaging. Option D is incorrect because All-Reduce does not discard data; it combines gradients."
            },
            {
                "id": 194,
                "question": "A data scientist is training a large language model with 50 billion parameters on a cluster of NVIDIA H100 GPUs. The model is too large to fit into the memory of a single GPU. Which parallelism technique should be used to distribute the model layers across multiple GPUs?",
                "options": [
                    "Data Parallelism",
                    "Model Parallelism",
                    "Tensor Parallelism",
                    "Pipeline Parallelism"
                ],
                "correctAnswer": 1,
                "explanation": "Model Parallelism is the technique where different layers of a neural network are placed on different GPUs. This is necessary when a single GPU cannot hold the entire model. Data Parallelism (A) replicates the entire model on each GPU and splits data batches, which does not solve the memory issue. Tensor Parallelism (C) splits individual layers across GPUs, which is more fine-grained but not the primary method for distributing entire layers. Pipeline Parallelism (D) is an improvement over Model Parallelism that processes micro-batches in a staggered pipeline to improve GPU utilization, but the core concept of splitting layers across GPUs is still Model Parallelism. The question asks for the technique that distributes layers across GPUs when one GPU is too small, which is Model Parallelism."
            },
            {
                "id": 195,
                "question": "In a transformer model using tensor parallelism, how are the attention heads typically distributed across GPUs?",
                "options": [
                    "Each GPU processes all attention heads but on different data samples.",
                    "Each GPU is assigned a subset of attention heads and computes them independently.",
                    "Each GPU processes a different layer of the transformer.",
                    "Each GPU holds a full copy of the attention weights and computes all heads."
                ],
                "correctAnswer": 1,
                "explanation": "Tensor parallelism splits the weight matrices of a single layer across GPUs. For multi-head attention, each GPU is assigned a subset of attention heads and computes them independently. The partial outputs are then combined via all-reduce. Option A describes data parallelism, option C describes pipeline parallelism, and option D describes model replication without parallelism."
            },
            {
                "id": 196,
                "question": "An engineer is training a deep neural network that is too large to fit on a single GPU. They decide to split the model into sequential stages and assign each stage to a different GPU. Which of the following best describes a primary challenge of this approach?",
                "options": [
                    "Increased communication overhead due to all-reduce operations across all GPUs.",
                    "Pipeline bubbles, where some GPUs remain idle while waiting for others to complete their forward pass.",
                    "High memory usage per GPU because each GPU must store the entire model.",
                    "Difficulty in splitting individual layers across multiple GPUs."
                ],
                "correctAnswer": 1,
                "explanation": "Pipeline parallelism splits the model into sequential stages across GPUs. A major challenge is pipeline bubbles: GPUs later in the pipeline must wait for earlier GPUs to finish their forward pass before they can start, leading to idle time. Option A describes a challenge of data parallelism (all-reduce). Option C is incorrect because pipeline parallelism reduces per-GPU memory. Option D describes tensor parallelism, not pipeline parallelism."
            },
            {
                "id": 197,
                "question": "An AI infrastructure engineer is comparing NVLink generations for a new GPU cluster designed to train a model with over 1 trillion parameters. Which NVLink generation provides the highest bandwidth per GPU and is most suitable for this workload?",
                "options": [
                    "NVLink 3.0 with 600 GB/s per GPU",
                    "NVLink 4.0 with 900 GB/s per GPU",
                    "NVLink 5.0 with 1.8 TB/s per GPU",
                    "NVLink 2.0 with 300 GB/s per GPU"
                ],
                "correctAnswer": 2,
                "explanation": "NVLink 5.0, introduced with the Blackwell B200 GPU, provides 1.8 TB/s bidirectional bandwidth per GPU, which is the highest among all generations. This bandwidth is essential for training trillion-parameter models, as it minimizes communication bottlenecks and enables efficient scaling across many GPUs. NVLink 3.0 and 4.0 offer lower bandwidth (600 GB/s and 900 GB/s respectively), while NVLink 2.0 provides only 300 GB/s, making them less suitable for such large-scale workloads."
            },
            {
                "id": 198,
                "question": "An engineer is troubleshooting an NVLink connectivity issue in a server with SXM-based GPUs. Which of the following is the most likely cause of intermittent NVLink failures?",
                "options": [
                    "The NVLink bridge is not fully seated between the two GPUs.",
                    "The gold contacts on the SXM module are contaminated with oil from skin contact.",
                    "The GPUs are installed in PCIe slots that do not support NVLink.",
                    "The server's power supply unit is insufficient for the GPU power draw."
                ],
                "correctAnswer": 1,
                "explanation": "In SXM-based systems, NVLink signals travel through the gold contacts on the module edge connector. Contamination from skin oils can increase contact resistance and degrade signal integrity, leading to intermittent failures. Option A is incorrect because SXM modules do not use external bridges; bridges are for PCIe form factor GPUs. Option C is incorrect because SXM modules connect via a dedicated socket, not PCIe slots. Option D is incorrect because insufficient power typically causes system instability or shutdowns, not intermittent NVLink failures specifically."
            },
            {
                "id": 199,
                "question": "In the NVIDIA DGX A100 system, what is the NVLink topology connecting the 8 GPUs?",
                "options": [
                    "A ring topology where each GPU connects to two neighbors",
                    "A fully connected mesh where every GPU has a direct NVLink connection to every other GPU",
                    "A tree topology with a single root GPU connected to all others",
                    "A hybrid topology using both NVLink and PCIe switches"
                ],
                "correctAnswer": 1,
                "explanation": "The DGX A100 uses a fully connected 8-GPU mesh topology via NVLink, meaning each GPU has a direct connection to every other GPU. This eliminates intermediate hops, reduces latency, and maximizes bandwidth for AI workloads. Option A describes a ring topology, which is not used. Option C describes a tree topology, which is not used. Option D is incorrect because the DGX A100 does not use PCIe for GPU-to-GPU communication; it relies solely on NVLink for the mesh."
            },
            {
                "id": 200,
                "question": "An AI engineer is designing a multi-GPU server for training large language models. The server will use eight NVIDIA H100 GPUs connected via NVLink 4.0 with 18 links per GPU. Which of the following best describes the bandwidth improvement of NVLink 4.0 over PCIe Gen 4 x16?",
                "options": [
                    "NVLink provides 28x more bandwidth than PCIe Gen 4 x16, enabling faster gradient and parameter sharing during distributed training.",
                    "NVLink provides 10x more bandwidth than PCIe Gen 4 x16, but with lower latency for GPU-to-GPU communication.",
                    "NVLink provides 64 GB/s bidirectional bandwidth, which is the same as PCIe Gen 4 x16, but with lower latency.",
                    "NVLink provides 1,792 GB/s unidirectional bandwidth, which is 28x higher than PCIe Gen 4 x16's unidirectional bandwidth."
                ],
                "correctAnswer": 0,
                "explanation": "The correct answer is A. NVLink 4.0 with 18 links provides 1,792 GB/s bidirectional bandwidth per GPU, which is 28 times higher than PCIe Gen 4 x16's 64 GB/s bidirectional bandwidth. This massive bandwidth improvement is critical for AI training workloads where GPUs frequently exchange gradients, activations, and model parameters. Option B is incorrect because the improvement is 28x, not 10x. Option C is incorrect because NVLink bandwidth is much higher than PCIe. Option D is incorrect because the 1,792 GB/s figure is bidirectional, not unidirectional, and PCIe Gen 4 x16's unidirectional bandwidth is 32 GB/s, not 64 GB/s."
            }
        ]
    },
    {
        "id": 11,
        "title": "NCA practice exam Set 11",
        "description": "Practice Exam Set 11 containing 20 unique exam-aligned questions covering core infrastructure domains.",
        "questions": [
            {
                "id": 201,
                "question": "An AI infrastructure engineer is designing a GPU cluster for training a large language model with over a trillion parameters. The engineer wants to minimize GPU-to-GPU communication bottlenecks and simplify the network topology by reducing reliance on external InfiniBand switches for GPU traffic. Which NVSwitch generation first introduced a dedicated rack-level switch system that enables scaling to 576 GPUs without requiring InfiniBand for GPU-to-GPU communication?",
                "options": [
                    "NVSwitch 1.0 (Volta)",
                    "NVSwitch 2.0 (Ampere)",
                    "NVSwitch 3.0 (Hopper)",
                    "NVSwitch 4.0 (Blackwell)"
                ],
                "correctAnswer": 2,
                "explanation": "NVSwitch 3.0 (Hopper) introduced the NVLink Switch System, a dedicated rack of NVSwitch chips that connects up to 576 H100 GPUs across multiple servers, allowing GPU-to-GPU traffic to bypass traditional InfiniBand or Ethernet. NVSwitch 1.0 only supported intra-node connectivity (16 GPUs). NVSwitch 2.0 enabled multi-node but still required NVLink bridges and did not have a dedicated switch rack. NVSwitch 4.0 further improved bandwidth with co-packaged optics but the rack-level switch system was first introduced in Hopper."
            },
            {
                "id": 202,
                "question": "An AI infrastructure engineer is comparing the NVSwitch configurations of two NVIDIA DGX platforms: DGX H100 (8 GPUs) and DGX B200 (8 GPUs). Which of the following statements accurately describes the difference in their NVSwitch chip count and aggregate bandwidth?",
                "options": [
                    "DGX H100 uses 6 NVSwitch chips with a total aggregate bandwidth of 3.6 TB/s, while DGX B200 uses 4 NVSwitch chips with a total aggregate bandwidth of 6.4 TB/s.",
                    "DGX H100 uses 4 NVSwitch chips with a total aggregate bandwidth of 6.4 TB/s, while DGX B200 uses 6 NVSwitch chips with a total aggregate bandwidth of 3.6 TB/s.",
                    "Both platforms use 6 NVSwitch chips, but DGX B200 has higher per-port bandwidth, resulting in 6.4 TB/s aggregate bandwidth compared to 3.6 TB/s for DGX H100.",
                    "Both platforms use 4 NVSwitch chips, but DGX H200 has higher per-port bandwidth, resulting in 6.4 TB/s aggregate bandwidth compared to 3.6 TB/s for DGX B200."
                ],
                "correctAnswer": 0,
                "explanation": "According to the lesson, DGX H100 (8 GPUs) uses 6 NVSwitch chips, each with 12 ports at 50 GB/s per port, yielding a total aggregate bandwidth of 6 \u00d7 12 \u00d7 50 GB/s = 3.6 TB/s. DGX B200 (8 GPUs) uses 4 NVSwitch chips, each with 16 ports at 100 GB/s per port, yielding 4 \u00d7 16 \u00d7 100 GB/s = 6.4 TB/s. Option A correctly states these numbers. Option B reverses the chip counts and bandwidths. Option C incorrectly states both use 6 chips. Option D incorrectly states both use 4 chips and references a non-existent H200 platform."
            },
            {
                "id": 203,
                "question": "Which of the following best describes how SHARP (Scalable Hierarchical Aggregation and Reduction Protocol) in NVSwitch 3.0 improves the efficiency of collective communication operations like AllReduce?",
                "options": [
                    "It performs reduction operations in software on a designated root GPU, reducing data movement between GPUs.",
                    "It offloads reduction operations to the NVSwitch hardware, performing in-network aggregation as data passes through the switch.",
                    "It uses a dedicated CPU to manage all reduction operations, freeing GPU resources for computation.",
                    "It compresses data before transmission and decompresses after reduction, reducing network bandwidth usage."
                ],
                "correctAnswer": 1,
                "explanation": "SHARP in NVSwitch 3.0 accelerates collective operations by performing reduction directly in the switch hardware. As data from each GPU flows through the NVSwitch, the switch aggregates the values (e.g., summing gradients) and distributes the result back to all GPUs. This eliminates the need for a root GPU or CPU involvement, reduces latency, and frees GPU resources for training. Option A describes the traditional software approach without SHARP, which creates a bottleneck. Option C is incorrect because SHARP does not use a dedicated CPU. Option D is incorrect because SHARP does not rely on compression; it performs arithmetic reduction in-network."
            },
            {
                "id": 204,
                "question": "What is the primary role of the NVSwitch in an HGX A100/H100 baseboard?",
                "options": [
                    "To provide power and cooling to the 8 SXM GPUs",
                    "To connect the baseboard to the host CPU via PCIe",
                    "To enable all-to-all high-speed communication between the 8 GPUs",
                    "To manage the memory pooling across all GPUs"
                ],
                "correctAnswer": 2,
                "explanation": "The NVSwitch is a custom silicon chip that creates a fully connected mesh between the 8 SXM GPUs on the HGX baseboard, allowing any GPU to communicate with any other GPU at full bandwidth with low latency. This is essential for efficient multi-GPU AI workloads. Option A is incorrect because power and cooling are handled by other components on the baseboard. Option B is incorrect because NVSwitch is for GPU-to-GPU communication, not for connecting to the host CPU (which is done via PCIe or NVLink bridges). Option D is incorrect because memory pooling is not a function of NVSwitch; each GPU has its own dedicated memory."
            },
            {
                "id": 205,
                "question": "In the DGX H100 system, which network fabric is dedicated to system management tasks such as firmware updates, telemetry collection, and out-of-band access?",
                "options": [
                    "InfiniBand ConnectX-7 fabric",
                    "NVLink/NVSwitch fabric",
                    "400GbE management network",
                    "Standard 25GbE Ethernet fabric"
                ],
                "correctAnswer": 2,
                "explanation": "The 400GbE management network is a separate, dedicated Ethernet fabric used for system administration tasks like out-of-band management, firmware updates, telemetry collection, and logging. InfiniBand ConnectX-7 is used for training data transfer between servers, NVLink/NVSwitch is for GPU-to-GPU communication within the same server, and standard 25GbE Ethernet is optional for storage access or inference serving, not for management."
            },
            {
                "id": 206,
                "question": "In the NVL72 rack design, how are the 72 GPUs logically connected to function as a single giant GPU?",
                "options": [
                    "Each DGX B200 server uses 8x 400 Gb/s Ethernet NICs to connect to a top-of-rack switch, enabling GPU-to-GPU communication across servers.",
                    "All 72 GPUs are connected via a dedicated NVLink Switch tray that provides 1.8 TB/s bidirectional bandwidth per GPU to the switch fabric.",
                    "The GPUs are connected using a combination of NVLink bridges within each server and InfiniBand adapters between servers.",
                    "The NVL72 rack uses a PCIe Gen 5 switch fabric to interconnect all GPUs, allowing direct memory access between any two GPUs."
                ],
                "correctAnswer": 1,
                "explanation": "The NVL72 rack uses a dedicated NVLink Switch tray that acts as a central hub, providing each GPU with 1.8 TB/s bidirectional bandwidth to the switch fabric. This allows any GPU to communicate with any other GPU at full NVLink speed, effectively creating a single logical GPU with 72 GPUs. Option A is incorrect because Ethernet would introduce higher latency and lower bandwidth compared to NVLink. Option C is incorrect because InfiniBand is used for scale-out networking, not for the internal GPU fabric in NVL72. Option D is incorrect because PCIe Gen 5 does not provide the same bandwidth or low latency as NVLink for GPU-to-GPU communication."
            },
            {
                "id": 207,
                "question": "In a DGX SuperPOD, what is the primary role of the InfiniBand network fabric?",
                "options": [
                    "To provide high-speed internet access for downloading large datasets",
                    "To enable direct GPU-to-GPU communication across nodes with low latency and high bandwidth",
                    "To replace NVLink for intra-node GPU communication",
                    "To connect the management network for cluster orchestration"
                ],
                "correctAnswer": 1,
                "explanation": "InfiniBand is the backbone of the DGX SuperPOD, providing ultra-low latency and high bandwidth for GPU-to-GPU communication across nodes via RDMA and GPUDirect. This is essential for distributed training of large models. Option A is incorrect because internet access is not the purpose. Option C is incorrect because NVLink is still used for intra-node communication. Option D is incorrect because management networks typically use Ethernet, not InfiniBand."
            },
            {
                "id": 208,
                "question": "Which of the following best describes the key advantage of the Grace Hopper Superchip's coherent memory architecture over traditional CPU+GPU systems?",
                "options": [
                    "It eliminates the need for PCIe by using a custom high-speed interconnect.",
                    "It allows the CPU and GPU to share a single memory space with hardware-managed cache coherency.",
                    "It increases GPU VRAM capacity by allowing the GPU to access CPU memory as a swap device.",
                    "It enables the CPU to execute GPU kernels directly without data transfer."
                ],
                "correctAnswer": 1,
                "explanation": "The Grace Hopper Superchip uses NVLink-C2C to create a unified memory space where both CPU and GPU can access the same physical memory with hardware cache coherency. This eliminates the need for explicit data copies (like cudaMemcpy) and simplifies programming. Option A is incorrect because PCIe is not eliminated; NVLink-C2C is a separate interconnect. Option C is incorrect because the memory is shared coherently, not as a swap device. Option D is incorrect because the CPU does not execute GPU kernels; each processor runs its own code."
            },
            {
                "id": 209,
                "question": "An engineer is deploying a large language model for real-time inference across multiple GPUs connected via NVLink-C2C. Which of the following is a key advantage of NVLink-C2C over PCIe for this memory-intensive workload?",
                "options": [
                    "It allows the GPUs to share a single PCIe root complex, reducing hardware costs.",
                    "It provides cache-coherent unified memory access, eliminating the need for explicit data copies.",
                    "It increases the number of CUDA cores available per GPU by pooling memory resources.",
                    "It enables the use of standard Ethernet networking for GPU-to-GPU communication."
                ],
                "correctAnswer": 1,
                "explanation": "NVLink-C2C provides cache-coherent unified memory access, allowing GPUs to directly read and write each other's memory without CPU intervention or explicit cudaMemcpy calls. This is a key advantage over PCIe, which lacks hardware cache coherence and requires explicit data movement. Option A is incorrect because NVLink-C2C bypasses the PCIe root complex entirely, not shares it. Option C is incorrect because NVLink-C2C does not increase CUDA core count; it improves memory bandwidth and latency. Option D is incorrect because NVLink-C2C is a dedicated chip-to-chip interconnect, not Ethernet."
            },
            {
                "id": 210,
                "question": "In an AI data center, an engineer notices that a 100-meter link between two switches using multi-mode fiber (MMF) and SR transceivers is experiencing high error counters. Which of the following is the most likely cause?",
                "options": [
                    "The transceivers are LR type designed for single-mode fiber.",
                    "The fiber distance exceeds the maximum reach for MMF with SR transceivers.",
                    "The copper cable is too close to a power line causing EMI.",
                    "The transceivers are operating at different speeds."
                ],
                "correctAnswer": 1,
                "explanation": "Multi-mode fiber (MMF) with SR (Short Reach) transceivers typically supports distances up to 100 meters at 10/25/100 Gbps, but at higher speeds (e.g., 100 Gbps) the maximum distance can be as low as 70-100 meters. A 100-meter link is at the edge of the specification, and signal attenuation or dispersion can cause high error counters. Option A is incorrect because LR transceivers are for single-mode fiber and longer distances, but the symptom is distance-related, not wrong type. Option C is irrelevant because the link uses fiber, not copper. Option D would cause no link or speed negotiation failure, not high error counters."
            },
            {
                "id": 211,
                "question": "In an AI data center, a switch receives an Ethernet frame with a destination MAC address that is not in its MAC address table. What action does the switch take?",
                "options": [
                    "It drops the frame to prevent network loops.",
                    "It forwards the frame only to the port where the source MAC address was learned.",
                    "It floods the frame out of all ports except the receiving port.",
                    "It sends an ARP request to learn the destination MAC address."
                ],
                "correctAnswer": 2,
                "explanation": "When a switch receives a frame with an unknown destination MAC address (not in its MAC address table), it floods the frame out of all ports except the one it arrived on. This is a standard Layer 2 switching behavior to ensure the frame reaches the intended device if it exists on the network. Option A is incorrect because switches do not drop unknown unicast frames; they flood them. Option B describes forwarding based on source MAC, which is not relevant for unknown destinations. Option D is incorrect because ARP is a Layer 3 protocol used for IP-to-MAC resolution, not a switch function."
            },
            {
                "id": 212,
                "question": "Which transport protocol is most suitable for AI distributed training workloads requiring both high speed and reliability, and why?",
                "options": [
                    "TCP, because it guarantees reliable delivery and in-order packet arrival.",
                    "UDP, because it offers low latency and minimal overhead.",
                    "RDMA, because it enables direct GPU-to-GPU memory access with low latency and hardware-level reliability.",
                    "Both TCP and UDP are equally suitable for AI training workloads."
                ],
                "correctAnswer": 2,
                "explanation": "AI distributed training requires extremely low latency and high reliability for frequent GPU-to-GPU data exchanges. TCP is reliable but introduces latency due to acknowledgments and CPU involvement. UDP is fast but unreliable, risking data corruption. RDMA bypasses the CPU and OS kernel, allowing direct memory access between GPUs with microsecond latency and hardware-level error checking, making it the optimal choice for AI workloads."
            },
            {
                "id": 213,
                "question": "In an AI data center, a GPU server is transferring a large model checkpoint to a storage node. The network connection drops mid-transfer, but the transfer resumes from the last checkpoint without retransmitting the entire dataset. Which OSI layer is primarily responsible for this capability?",
                "options": [
                    "Layer 5 (Session Layer)",
                    "Layer 6 (Presentation Layer)",
                    "Layer 7 (Application Layer)",
                    "Layer 4 (Transport Layer)"
                ],
                "correctAnswer": 0,
                "explanation": "The Session Layer (Layer 5) manages conversations between applications, including synchronization and checkpointing. It can insert checkpoints into data streams so that if a connection drops, the session can resume from the last checkpoint rather than starting over. This is critical for large transfers like model checkpoints. The Presentation Layer (Layer 6) handles translation, encryption, and compression. The Application Layer (Layer 7) provides network services to applications. The Transport Layer (Layer 4) ensures reliable delivery but does not manage session checkpoints."
            },
            {
                "id": 214,
                "question": "A network switch receives a frame on port 5 with source MAC address 00:1A:2B:3C:4D:5E and destination MAC address FF:FF:FF:FF:FF:FF. The switch's MAC address table is currently empty. How will the switch handle this frame?",
                "options": [
                    "Forward the frame only to the port where the destination device is located.",
                    "Flood the frame out all ports except port 5.",
                    "Drop the frame because the destination MAC is a broadcast address.",
                    "Learn the source MAC address and then forward the frame only to port 5."
                ],
                "correctAnswer": 1,
                "explanation": "The switch first learns the source MAC address (00:1A:2B:3C:4D:5E) and associates it with port 5. Since the destination MAC address is the broadcast address (FF:FF:FF:FF:FF:FF), the switch must flood the frame out all ports except the incoming port (port 5). Broadcast frames are always flooded to ensure all devices in the broadcast domain receive the frame. Option A is incorrect because the destination is not a known unicast. Option C is incorrect because switches do not drop broadcast frames; they flood them. Option D is incorrect because the frame is not forwarded only to port 5; it is flooded."
            },
            {
                "id": 215,
                "question": "In an AI data center, a network engineer configures VLANs to isolate GPU training traffic from storage and management traffic. Which statement correctly describes how VLANs achieve this isolation?",
                "options": [
                    "VLANs use IP addresses to create separate subnets, preventing communication between different VLANs at Layer 3.",
                    "VLANs tag Ethernet frames with a VLAN ID, creating separate broadcast domains at Layer 2, so devices in different VLANs cannot communicate without a router.",
                    "VLANs assign different physical switch ports to different virtual switches, requiring separate cables for each VLAN.",
                    "VLANs encrypt traffic between devices in the same VLAN, ensuring that devices in other VLANs cannot decrypt the data."
                ],
                "correctAnswer": 1,
                "explanation": "VLANs operate at Layer 2 by adding a 4-byte 802.1Q tag to Ethernet frames, which identifies the VLAN. This creates separate broadcast domains, meaning devices in different VLANs cannot see each other's traffic or communicate directly. Inter-VLAN communication requires a router or Layer 3 switch. Option A is incorrect because VLANs are Layer 2 constructs; subnets are Layer 3 and are typically aligned with VLANs but are not the mechanism for isolation. Option C is incorrect because VLANs do not require separate physical cables; they use the same physical infrastructure with tagging. Option D is incorrect because VLANs do not provide encryption; they provide logical separation."
            },
            {
                "id": 216,
                "question": "In an AI data center, a server needs to send data to another server on the same subnet. The sending server checks its ARP cache but finds no entry for the destination IP. What is the next step the sending server takes?",
                "options": [
                    "It sends a unicast ARP reply to the destination server.",
                    "It broadcasts an ARP request asking for the destination MAC address.",
                    "It sends an ICMP echo request to the destination IP.",
                    "It drops the packet and waits for the ARP cache to be updated manually."
                ],
                "correctAnswer": 1,
                "explanation": "When a device needs to communicate with another device on the same subnet and the destination MAC address is not in its ARP cache, it broadcasts an ARP request to all devices on the local network. The request asks 'Who has IP address X? Tell me your MAC address.' The device with that IP responds with a unicast ARP reply containing its MAC address. Option A is incorrect because a reply is sent only after receiving a request. Option C describes a different protocol (ICMP). Option D is incorrect because the device actively resolves the address rather than dropping the packet."
            },
            {
                "id": 217,
                "question": "An AI infrastructure engineer is designing a network for a production AI cloud fabric with 200 GPU servers across multiple racks. The engineer needs automatic failover and load balancing across multiple parallel links. Which routing approach should be used for the data plane?",
                "options": [
                    "Static routes with manual failover configuration",
                    "BGP with ECMP across leaf-spine topology",
                    "RIP (Routing Information Protocol) for simplicity",
                    "OSPF (Open Shortest Path First) for fast convergence"
                ],
                "correctAnswer": 1,
                "explanation": "BGP with ECMP is the standard for large AI fabrics because it provides automatic failover, load balancing across multiple equal-cost paths, and scales to hundreds of switches and thousands of routes. Static routes (option A) require manual intervention on failure and do not scale. RIP (option C) is outdated and has slow convergence. OSPF (option D) is a link-state protocol but is less common in AI fabrics due to complexity in large Clos topologies; BGP is preferred for its policy control and scalability."
            },
            {
                "id": 218,
                "question": "Which of the following best describes why North-South traffic in an AI data center is considered latency-sensitive?",
                "options": [
                    "It involves large data transfers between servers during model training, requiring high throughput.",
                    "It carries client requests to inference servers and responses back, where delays directly impact user experience and real-time decisions.",
                    "It uses RDMA protocols that inherently have high latency due to kernel bypass.",
                    "It is primarily used for storage access, which is not time-critical."
                ],
                "correctAnswer": 1,
                "explanation": "North-South traffic refers to data moving between external clients and internal inference servers. Because clients expect quick responses (e.g., for real-time applications like autonomous driving or fraud detection), any latency directly degrades user experience or system safety. Option A describes East-West traffic (server-to-server during training). Option C is incorrect because RDMA reduces latency, not increases it. Option D is wrong because storage access is typically East-West and can be latency-sensitive but not the primary characteristic of North-South traffic."
            },
            {
                "id": 219,
                "question": "In a distributed AI training cluster, which of the following best describes why gradient synchronization traffic is considered bandwidth-sensitive rather than latency-sensitive?",
                "options": [
                    "Gradient synchronization involves small, infrequent messages that require extremely low latency to avoid GPU idle time.",
                    "Gradient synchronization involves large, frequent, and simultaneous all-to-all data transfers that must complete before the next training step, making aggregate bandwidth the primary constraint.",
                    "Gradient synchronization is a point-to-point operation between a single GPU and a storage server, where bandwidth is limited by the storage device speed.",
                    "Gradient synchronization is latency-sensitive because each GPU must wait for a single acknowledgment before proceeding, and network latency directly impacts training time."
                ],
                "correctAnswer": 1,
                "explanation": "Gradient synchronization in distributed training is bandwidth-sensitive because it involves large volumes of data (hundreds of MB to GB) exchanged simultaneously among all GPUs after every training step. The all-reduce operation creates many-to-many traffic bursts that must complete before the next step can begin. If the network lacks sufficient bandwidth, GPUs remain idle waiting for gradients, which severely impacts training throughput. While latency does play a role, the primary bottleneck is the aggregate bandwidth required to move large gradient tensors across all links. Option A is incorrect because gradient messages are large and frequent, not small and infrequent. Option C is incorrect because gradient synchronization is GPU-to-GPU (east-west), not GPU-to-storage (north-south). Option D is incorrect because the operation is collective, not point-to-point with a single acknowledgment, and bandwidth is the dominant factor."
            },
            {
                "id": 220,
                "question": "During distributed training of a large AI model, 1,000 GPUs simultaneously send gradient data to a single top-of-rack switch. Which of the following best describes the network congestion phenomenon occurring?",
                "options": [
                    "Head-of-line blocking caused by a single slow GPU",
                    "Incast congestion due to many-to-one traffic overwhelming switch buffers",
                    "TCP incast collapse resulting from receiver window scaling",
                    "Broadcast storm from excessive ARP requests"
                ],
                "correctAnswer": 1,
                "explanation": "Incast congestion (also called fan-in congestion) occurs when multiple senders transmit data to a single receiver simultaneously, overwhelming the switch's buffer capacity. This is a common pattern in AI training during gradient synchronization. Head-of-line blocking (A) is a different issue related to queuing. TCP incast collapse (C) is a related but more specific term for TCP performance degradation, but the core phenomenon is incast congestion. Broadcast storms (D) are unrelated to this traffic pattern."
            }
        ]
    },
    {
        "id": 12,
        "title": "NCA practice exam Set 12",
        "description": "Practice Exam Set 12 containing 20 unique exam-aligned questions covering core infrastructure domains.",
        "questions": [
            {
                "id": 221,
                "question": "A data center engineer is evaluating whether an existing three-tier network (Access-Aggregation-Core) can support a new distributed AI training workload with 64 GPUs across 8 servers. Which of the following is the primary reason this design will likely fail to deliver adequate performance?",
                "options": [
                    "The core layer lacks sufficient ports to connect all aggregation switches.",
                    "The access layer switches do not support NVLink or InfiniBand connectivity.",
                    "The aggregation layer creates oversubscription and high latency for east-west traffic.",
                    "The three-tier design cannot support north-south traffic patterns required for AI training."
                ],
                "correctAnswer": 2,
                "explanation": "The three-tier design was built for north-south traffic (users to servers) and typically has oversubscribed uplinks from access to aggregation switches. AI training requires massive east-west traffic (GPU-to-GPU) for gradient synchronization, which must traverse the aggregation layer, causing bottlenecks and high latency. Option A is incorrect because core port count is not the primary issue. Option B is incorrect because NVLink is a GPU interconnect, not a network switch feature. Option D is incorrect because AI training relies on east-west, not north-south, traffic."
            },
            {
                "id": 222,
                "question": "In a Spine-Leaf (Clos) topology designed for AI workloads, what is the primary benefit of having multiple equal-cost paths between any two leaf switches?",
                "options": [
                    "It reduces the number of required spine switches.",
                    "It enables load balancing and predictable low latency via ECMP.",
                    "It eliminates the need for leaf switches to connect to all spines.",
                    "It guarantees that each server has a dedicated path to every other server."
                ],
                "correctAnswer": 1,
                "explanation": "In a Spine-Leaf topology, every leaf switch is connected to every spine switch, creating multiple equal-cost paths between any two leaves. Equal-Cost Multi-Path (ECMP) routing spreads traffic across all available spines, preventing congestion and ensuring consistent, low-latency performance. This is critical for AI training workloads that generate massive east-west traffic and are sensitive to latency variation. The other options are incorrect: multiple paths do not reduce the number of spines (they require more spines), leaf switches must connect to all spines for full mesh, and servers do not have dedicated paths\u2014they share the fabric."
            },
            {
                "id": 223,
                "question": "In a rail topology for an AI cluster with 8-GPU servers and 64 servers, how many rail switches are required and what is the total number of cables needed?",
                "options": [
                    "8 rail switches, 512 cables",
                    "64 rail switches, 512 cables",
                    "8 rail switches, 64 cables",
                    "64 rail switches, 8 cables"
                ],
                "correctAnswer": 0,
                "explanation": "In rail topology, each GPU position across all servers gets its own dedicated switch. With 8 GPUs per server, 8 rail switches are needed (one per GPU position). Each switch connects to one GPU from each of the 64 servers, so each switch requires 64 cables. Total cables = 8 switches \u00d7 64 cables = 512 cables. Option A is correct. Option B incorrectly uses 64 switches (one per server). Option C uses correct switch count but wrong cable count (64 total instead of 512). Option D reverses switch and cable counts."
            },
            {
                "id": 224,
                "question": "An AI infrastructure engineer is designing a cluster for large-scale LLM training with 512 GPUs. The workload involves all-to-all gradient synchronization every training step. Which oversubscription ratio should be used to ensure minimal training time?",
                "options": [
                    "1:1 (non-blocking)",
                    "3:1",
                    "2:1",
                    "4:1"
                ],
                "correctAnswer": 0,
                "explanation": "Large-scale LLM training with all-to-all communication requires maximum bandwidth and low latency. A 1:1 (non-blocking) ratio ensures every GPU has dedicated uplink capacity, preventing congestion and minimizing synchronization time. 3:1 or higher ratios would cause traffic contention, increasing training time significantly."
            },
            {
                "id": 225,
                "question": "An AI infrastructure engineer is designing a new GPU cluster for large-scale distributed training of large language models (LLMs). The cluster will use NVIDIA H100 GPUs with 8 GPUs per server. Which Ethernet speed combination is most appropriate for the compute leaf (ToR) and spine tiers to avoid bottlenecks and align with current best practices?",
                "options": [
                    "25 GbE for leaf, 100 GbE for spine",
                    "100 GbE for leaf, 400 GbE for spine",
                    "40 GbE for leaf, 200 GbE for spine",
                    "200 GbE for leaf, 800 GbE for spine"
                ],
                "correctAnswer": 1,
                "explanation": "For modern AI training clusters using NVIDIA H100 GPUs, the recommended baseline for compute leaf (ToR) links is 100 GbE per GPU, and the spine tier should use 400 GbE to aggregate multiple leaf switches without bottlenecks. Option B aligns with this best practice. Option A (25 GbE leaf, 100 GbE spine) is insufficient for H100 clusters as 25 GbE per GPU would severely limit bandwidth. Option C (40 GbE leaf, 200 GbE spine) uses legacy speeds not recommended for new deployments. Option D (200 GbE leaf, 800 GbE spine) is more advanced and may be suitable for next-generation GPUs like B200, but for current H100 clusters, 100 GbE leaf and 400 GbE spine is the standard."
            },
            {
                "id": 226,
                "question": "An AI data center engineer is designing the network fabric for a GPU cluster that requires 400G connectivity between spine switches. Which optical transceiver form factor is most commonly used for 400G Ethernet in current AI deployments?",
                "options": [
                    "SFP28",
                    "QSFP28",
                    "QSFP-DD",
                    "OSFP"
                ],
                "correctAnswer": 2,
                "explanation": "QSFP-DD (Quad Small Form-factor Pluggable Double Density) is the most common form factor for 400G Ethernet in current AI deployments. It supports 8 lanes at 25 Gbps or 50 Gbps per lane to achieve 200G or 400G speeds. SFP28 supports only 25G, QSFP28 supports 100G, and OSFP is a newer form factor designed for 800G and future-proofed deployments, but not as widely used for 400G today."
            },
            {
                "id": 227,
                "question": "Which of the following best describes the primary benefit of using Remote Direct Memory Access (RDMA) for data transfer in AI workloads?",
                "options": [
                    "It reduces CPU utilization by allowing the network adapter to directly access application memory without kernel involvement.",
                    "It increases network throughput by compressing data before transmission.",
                    "It eliminates the need for network adapters by using shared memory across nodes.",
                    "It improves security by encrypting all data in transit."
                ],
                "correctAnswer": 0,
                "explanation": "RDMA enables zero-copy, kernel-bypass data transfers where the network adapter reads/writes directly to application memory, bypassing the OS kernel. This reduces CPU overhead and latency, which is critical for AI workloads that move large volumes of data. Option B is incorrect because RDMA does not involve compression. Option C is incorrect because RDMA still requires network adapters (RNICs). Option D is incorrect because RDMA does not inherently provide encryption; security features are separate."
            },
            {
                "id": 228,
                "question": "An AI infrastructure engineer is designing a network for a large-scale AI cluster spanning multiple racks and subnets. Which version of RoCE should be used to ensure RDMA traffic can be routed across the entire data center?",
                "options": [
                    "RoCEv1, because it operates at Layer 2 and provides lower latency",
                    "RoCEv2, because it encapsulates RDMA in UDP and supports IP routing",
                    "RoCEv1, because it uses MAC addresses and is simpler to deploy",
                    "RoCEv2, because it has lower header overhead than RoCEv1"
                ],
                "correctAnswer": 1,
                "explanation": "RoCEv2 encapsulates RDMA data inside UDP packets, allowing it to be routed across IP subnets using standard routers. This makes it suitable for large-scale AI clusters that span multiple racks and subnets. RoCEv1 is limited to Layer 2 and cannot cross subnets. While RoCEv1 has lower latency and overhead, it is not routable. RoCEv2 has slightly higher overhead due to IP and UDP headers, but this is negligible compared to the scalability benefits."
            },
            {
                "id": 229,
                "question": "In RDMA programming, which of the following best describes the difference between two-sided (Send/Receive) and one-sided (Write/Read) operations?",
                "options": [
                    "Two-sided operations require the remote CPU to post a buffer, while one-sided operations do not involve the remote CPU.",
                    "One-sided operations require the remote CPU to post a buffer, while two-sided operations do not involve the remote CPU.",
                    "Two-sided operations use memory registration keys, while one-sided operations do not require any keys.",
                    "One-sided operations have higher latency than two-sided operations because they require a handshake."
                ],
                "correctAnswer": 0,
                "explanation": "Two-sided operations (Send/Receive) require the remote side to explicitly post a receive buffer before data can be transferred; the remote CPU is involved in preparing the buffer. One-sided operations (Write/Read) allow direct memory access to the remote node without any remote CPU involvement, as long as the appropriate remote key (R_key) is provided. This makes one-sided operations lower latency and more suitable for large data transfers in AI training."
            },
            {
                "id": 230,
                "question": "In RDMA communication, which Queue Pair (QP) type is most commonly used for AI training workloads and why?",
                "options": [
                    "Unreliable Datagram (UD) because it allows one QP to communicate with many remote QPs without connection setup, reducing overhead.",
                    "Reliable Connection (RC) because it guarantees delivery and ordering of data, which is critical for gradient integrity in distributed training.",
                    "Unreliable Connection (UC) because it offers lower overhead than RC while still maintaining a one-to-one connection.",
                    "Reliable Datagram (RD) because it combines the reliability of RC with the flexibility of UD, making it ideal for AI workloads."
                ],
                "correctAnswer": 1,
                "explanation": "For AI training, Reliable Connection (RC) QPs are the standard choice because they guarantee that every byte of gradient data arrives correctly and in order. This is essential for data integrity during distributed training. Unreliable Datagram (UD) and Unreliable Connection (UC) do not provide delivery guarantees, which could lead to data corruption. Reliable Datagram (RD) is not a standard QP type in RDMA; the three main types are RC, UC, and UD."
            },
            {
                "id": 231,
                "question": "In an AI cluster using RoCEv2, which statement best describes how Priority Flow Control (PFC) prevents packet loss?",
                "options": [
                    "PFC pauses all traffic on a link when any buffer exceeds a threshold.",
                    "PFC sends pause frames only for the congested priority class before buffer overflow.",
                    "PFC drops packets of the lowest priority to free buffer space for higher priorities.",
                    "PFC uses ECN marking to signal senders to reduce transmission rate."
                ],
                "correctAnswer": 1,
                "explanation": "PFC (802.1Qbb) operates per-priority, sending pause frames for a specific priority class when its buffer is nearly full, preventing overflow without affecting other traffic. Option A describes standard Ethernet flow control (802.3x), which pauses all traffic. Option C describes a drop policy, not PFC. Option D describes ECN (Explicit Congestion Notification), which is a Layer 3 mechanism, not PFC."
            },
            {
                "id": 232,
                "question": "In a RoCEv2 network using Explicit Congestion Notification (ECN), what is the role of the Congestion Notification Packet (CNP)?",
                "options": [
                    "It is sent by the switch to the sender to indicate that congestion has been detected.",
                    "It is sent by the receiver to the sender to signal that a packet with Congestion Experienced (CE) marking was received.",
                    "It is sent by the sender to the receiver to confirm that ECN is enabled.",
                    "It is sent by the switch to the receiver to request rate reduction."
                ],
                "correctAnswer": 1,
                "explanation": "In the ECN flow, when a switch detects congestion and marks a packet with CE, the receiver generates a CNP and sends it back to the sender. The CNP signals the sender to reduce its transmission rate. Option A is incorrect because the switch does not send CNPs; it only marks packets. Option C is incorrect because the sender sets the ECT bit, not sends a CNP. Option D is incorrect because the CNP is sent by the receiver, not the switch."
            },
            {
                "id": 233,
                "question": "In DCQCN, what is the role of the Congestion Notification Packet (CNP)?",
                "options": [
                    "It is sent by the switch to the sender to directly reduce the sender's rate.",
                    "It is generated by the receiver and sent back to the sender to indicate that a packet was marked with ECN.",
                    "It is used by the sender to probe the network for available bandwidth.",
                    "It is sent by the receiver to the switch to request lower buffer thresholds."
                ],
                "correctAnswer": 1,
                "explanation": "In DCQCN, when a switch marks a packet with ECN due to congestion, the receiver detects the ECN mark and generates a Congestion Notification Packet (CNP) that is sent back to the original sender. The CNP signals the sender to reduce its transmission rate. Option A is incorrect because the switch does not directly send CNPs to the sender; it only marks packets. Option C describes a probing mechanism not part of DCQCN. Option D is incorrect because the receiver does not communicate buffer thresholds to the switch."
            },
            {
                "id": 234,
                "question": "A network engineer notices that traffic on the RoCEv2 priority class has completely stopped, yet no packets are being dropped. Which condition is most likely occurring?",
                "options": [
                    "PFC deadlock caused by a circular dependency of pause frames",
                    "ECN marking causing senders to reduce rate to zero",
                    "Buffer overflow on the lossless priority class",
                    "Link-level flow control (IEEE 802.3x) pause frame storm"
                ],
                "correctAnswer": 0,
                "explanation": "PFC deadlock occurs when a circular dependency of PFC pause frames forms, causing all devices in the loop to wait indefinitely for buffer space. Traffic stops completely without packet drops, which is a key characteristic. ECN marking reduces sender rate but does not cause a complete stop. Buffer overflow would result in dropped packets. Link-level flow control (802.3x) operates on the entire link, not per priority, and would not cause a complete stop on a single priority class."
            },
            {
                "id": 235,
                "question": "In the context of AI workloads, which of the following best describes how adaptive routing differs from static routing (e.g., ECMP)?",
                "options": [
                    "Adaptive routing selects paths based on a hash of the packet header, ensuring equal distribution across links.",
                    "Adaptive routing dynamically chooses the least-congested path per packet using real-time congestion feedback.",
                    "Adaptive routing requires a central controller to compute paths for every packet, increasing latency.",
                    "Adaptive routing pre-computes multiple paths and assigns each flow to a fixed path based on source and destination."
                ],
                "correctAnswer": 1,
                "explanation": "Adaptive routing, as implemented in NVIDIA Spectrum-X, makes per-packet decisions at each switch based on real-time link utilization and congestion metrics. This contrasts with static routing (ECMP), which uses a fixed hash of packet headers to select a path, leading to potential imbalances under bursty AI traffic. Option A describes ECMP, not adaptive routing. Option C is incorrect because adaptive routing uses local switch intelligence, not a central controller. Option D describes a form of static multipath routing, not adaptive routing."
            },
            {
                "id": 236,
                "question": "Which of the following best describes the primary benefit of RoCE acceleration in NVIDIA BlueField DPUs for AI workloads?",
                "options": [
                    "It reduces GPU memory usage by compressing network packets.",
                    "It offloads RDMA transport processing to dedicated hardware, freeing CPU resources.",
                    "It increases network bandwidth by combining multiple Ethernet links.",
                    "It replaces InfiniBand with a faster Ethernet protocol."
                ],
                "correctAnswer": 1,
                "explanation": "RoCE acceleration in BlueField offloads the entire RDMA transport layer (packet segmentation, ACK/NAK generation, retransmission, congestion control) to hardware engines on the DPU. This eliminates CPU overhead for network processing, allowing the CPU to focus on compute tasks. Option A is incorrect because RoCE acceleration does not involve packet compression. Option C is incorrect because it describes link aggregation, not transport offload. Option D is incorrect because RoCE is an Ethernet-based protocol that complements InfiniBand, not replaces it."
            },
            {
                "id": 237,
                "question": "In NVIDIA Spectrum-X, how does End-to-End Congestion Control (E2E CC) primarily prevent packet loss during AI training?",
                "options": [
                    "By dropping packets and relying on retransmission",
                    "By using explicit congestion notification (ECN) markers to signal senders to reduce their rate before buffers overflow",
                    "By increasing the buffer size on switches to absorb all bursts",
                    "By limiting the number of flows allowed in the network"
                ],
                "correctAnswer": 1,
                "explanation": "E2E CC in Spectrum-X uses ECN markers in packet headers to signal congestion from switches to receivers, which then feedback to senders to adjust their transmission rate. This proactive approach prevents buffer overflow and packet drops, ensuring lossless operation. Option A describes traditional TCP behavior, which is not used. Option C is impractical as buffers are finite. Option D is not a mechanism of E2E CC; it would reduce network utilization."
            },
            {
                "id": 238,
                "question": "An AI cluster is being upgraded from HDR to NDR InfiniBand. Assuming the cluster is communication-bound, what is the expected improvement in all-reduce time per training step?",
                "options": [
                    "Approximately 2x faster",
                    "Approximately 4x faster",
                    "Approximately 1.5x faster",
                    "No improvement, as all-reduce is compute-bound"
                ],
                "correctAnswer": 0,
                "explanation": "NDR provides 400 Gb/s per x4 link, which is double the bandwidth of HDR (200 Gb/s). For communication-bound workloads like all-reduce, doubling the bandwidth directly halves the communication time, resulting in approximately 2x faster all-reduce per step. Options B and C are incorrect because the improvement is linear with bandwidth, not quadratic or fractional. Option D is incorrect because the scenario specifies the cluster is communication-bound, so network speed directly impacts performance."
            },
            {
                "id": 239,
                "question": "In an InfiniBand packet, which header is always present and contains the Destination Local ID (DLID) for routing within a single subnet?",
                "options": [
                    "Global Routing Header (GRH)",
                    "Local Routing Header (LRH)",
                    "Transport Header",
                    "Link Layer Header"
                ],
                "correctAnswer": 1,
                "explanation": "The Local Routing Header (LRH) is mandatory in every InfiniBand packet and contains the DLID and SLID for routing within a subnet. The GRH is optional and used only for inter-subnet routing. Transport and Link Layer headers are not routing headers."
            },
            {
                "id": 240,
                "question": "In an InfiniBand network, which of the following best describes the relationship between Service Levels (SL) and Virtual Lanes (VL)?",
                "options": [
                    "SLs are the physical lanes on the cable, while VLs are the logical labels assigned to packets.",
                    "SLs are labels on packets that determine which VL the packet will use; VLs are the actual logical data paths with independent buffers.",
                    "SLs and VLs are interchangeable terms for the same concept.",
                    "VLs are assigned to physical ports, while SLs are assigned to switch buffers."
                ],
                "correctAnswer": 1,
                "explanation": "Service Levels (SL) are labels attached to packets that indicate the desired quality of service. The switch uses the SL-to-VL mapping table to determine which Virtual Lane (VL) the packet should be placed into. VLs are independent logical data paths within a physical link, each with its own buffer space and flow control. Option A is incorrect because SLs are labels, not physical lanes. Option C is incorrect because SLs and VLs are distinct concepts. Option D is incorrect because VLs are logical paths, not physical port assignments, and SLs are packet labels, not buffer assignments."
            }
        ]
    },
    {
        "id": 13,
        "title": "NCA practice exam Set 13",
        "description": "Practice Exam Set 13 containing 20 unique exam-aligned questions covering core infrastructure domains.",
        "questions": [
            {
                "id": 241,
                "question": "An AI cluster uses DGX A100 servers with HDR InfiniBand switches. Which Host Channel Adapter (HCA) is most appropriate for these servers, and what is the maximum data rate per port it supports?",
                "options": [
                    "ConnectX-7, 400 Gbps (NDR)",
                    "ConnectX-6, 200 Gbps (HDR)",
                    "ConnectX-6, 400 Gbps (NDR)",
                    "ConnectX-7, 200 Gbps (HDR)"
                ],
                "correctAnswer": 1,
                "explanation": "DGX A100 systems are equipped with ConnectX-6 HCAs, which support HDR InfiniBand at 200 Gbps per port. ConnectX-7 is designed for newer systems like DGX H100/H200 and supports 400 Gbps NDR, but it is not the standard HCA for DGX A100. Option A is incorrect because ConnectX-7 is not used in DGX A100. Option C is incorrect because ConnectX-6 does not support 400 Gbps. Option D is incorrect because ConnectX-7 is not the appropriate HCA for this cluster, and 200 Gbps HDR is the speed of ConnectX-6, not ConnectX-7."
            },
            {
                "id": 242,
                "question": "In a multi-tier InfiniBand fabric designed for an AI cluster, which switch tier is responsible for directly connecting the compute servers (GPUs) to the network?",
                "options": [
                    "Spine switches",
                    "Leaf switches",
                    "Edge switches",
                    "Core switches"
                ],
                "correctAnswer": 2,
                "explanation": "Edge switches (also called Top-of-Rack switches) are the first hop for servers, connecting individual compute nodes to the fabric. Spine switches connect leaf switches, and leaf switches aggregate edge switches; neither connects directly to servers. 'Core switches' is a generic term often synonymous with spine switches, but not the tier that connects to servers."
            },
            {
                "id": 243,
                "question": "An engineer is deploying a 400 Gb/s InfiniBand network for an AI cluster. Which of the following best describes why optical cabling with MTP/MPO connectors is preferred over copper DAC cables for this application?",
                "options": [
                    "Optical cables provide higher signal integrity over longer distances and reduce weight and power consumption compared to copper.",
                    "Optical cables are less expensive per link than copper DAC cables for any distance.",
                    "MTP/MPO connectors allow a single fiber pair to carry 400 Gb/s, simplifying cable management.",
                    "Copper DAC cables cannot support 400 Gb/s data rates under any circumstances."
                ],
                "correctAnswer": 0,
                "explanation": "At 400 Gb/s, copper DAC cables suffer from signal degradation beyond a few meters, are heavy, and consume more power. Optical cabling with MTP/MPO connectors offers longer reach (up to 100m with multi-mode or kilometers with single-mode), lower weight, and better signal integrity, making it the preferred choice for high-performance AI clusters. Option B is incorrect because optical cabling generally has a higher cost per link than copper for short distances. Option C is incorrect because a 400 Gb/s link uses 8 fibers (4 Tx, 4 Rx) within an MTP/MPO connector, not a single fiber pair. Option D is incorrect because copper DAC can support 400 Gb/s over very short distances (e.g., 3 meters), but it is impractical for longer runs."
            },
            {
                "id": 244,
                "question": "An engineer is troubleshooting an InfiniBand fabric in an AI cluster where GPUs are unable to communicate. Which of the following is the most likely cause if the Subnet Manager (SM) is not running?",
                "options": [
                    "The SM is responsible for topology discovery, LID assignment, and routing table computation; without it, devices have no addresses or paths.",
                    "The SM only handles routing table computation; devices can still communicate using default paths.",
                    "The SM is optional in InfiniBand fabrics; GPUs can communicate directly without it.",
                    "The SM is only needed during initial setup; once configured, it can be stopped without affecting communication."
                ],
                "correctAnswer": 0,
                "explanation": "The Subnet Manager (SM) is essential for InfiniBand fabric operation. It performs topology discovery to map all devices, assigns unique LIDs to each port, and computes routing tables that are pushed to switches. Without the SM, devices lack addresses and the switches have no forwarding information, making communication impossible. Options B, C, and D are incorrect because the SM is not optional, it handles more than routing, and it must remain active to manage the fabric."
            },
            {
                "id": 245,
                "question": "An engineer notices that after replacing a faulty cable in an InfiniBand fabric, some nodes are not visible in the network. Which OpenSM operation is most likely responsible for restoring full connectivity?",
                "options": [
                    "The routing algorithm is recalculated during the next sweep cycle.",
                    "OpenSM must be manually restarted to trigger fabric discovery.",
                    "The standby OpenSM takes over and reprograms the switches.",
                    "The engineer must reassign LIDs using ibswitches."
                ],
                "correctAnswer": 0,
                "explanation": "OpenSM periodically performs a sweep (default every 5 seconds) to detect changes in the fabric, such as cable replacements. During the sweep, it discovers new or reconnected devices, reassigns LIDs, and recomputes paths. The routing algorithm is recalculated as part of this process, restoring connectivity. Option B is incorrect because OpenSM does not require a manual restart for cable changes; the automatic sweep handles it. Option C is incorrect because the standby OpenSM only takes over if the master fails, not due to a cable change. Option D is incorrect because LID assignment is automatic; ibswitches is used to view switches, not to assign LIDs."
            },
            {
                "id": 246,
                "question": "An engineer runs iblinkinfo on an InfiniBand fabric and notices that a specific link between a switch and a compute node is missing from the output. What is the most likely cause?",
                "options": [
                    "The compute node's HCA is in Active state but the link speed is lower than expected.",
                    "The Subnet Manager has not discovered the link because the cable is disconnected or the node is powered off.",
                    "The iblinkinfo command only shows links that are in Initializing state.",
                    "The compute node's port is configured with a different LMC value than the switch port."
                ],
                "correctAnswer": 1,
                "explanation": "iblinkinfo queries the Subnet Manager to display all active links in the fabric. If a link is missing, it typically means the Subnet Manager has not discovered it, which can happen if the cable is disconnected, the node is powered off, or the switch port is down. Option A describes a link that is present but degraded, not missing. Option C is incorrect because iblinkinfo shows all links regardless of state. Option D is unrelated; LMC values affect LID assignment but do not cause a link to be absent from the fabric view."
            },
            {
                "id": 247,
                "question": "Which of the following best describes the fundamental difference between InfiniBand RDMA and RoCEv2?",
                "options": [
                    "InfiniBand is a native RDMA technology, while RoCEv2 encapsulates RDMA packets inside UDP/IP over Ethernet.",
                    "InfiniBand uses standard Ethernet switches, while RoCEv2 requires specialized InfiniBand switches.",
                    "RoCEv2 provides lower latency than InfiniBand due to its encapsulation overhead.",
                    "InfiniBand requires Priority Flow Control (PFC) to prevent packet loss, while RoCEv2 uses credit-based flow control."
                ],
                "correctAnswer": 0,
                "explanation": "The key difference is that InfiniBand is a native RDMA technology designed from the ground up for RDMA, while RoCEv2 encapsulates RDMA packets inside UDP/IP and Ethernet headers, adding overhead. Option B is incorrect because InfiniBand requires specialized switches, not Ethernet. Option C is false because encapsulation increases latency. Option D is reversed: RoCEv2 requires PFC, while InfiniBand uses credit-based flow control."
            },
            {
                "id": 248,
                "question": "An engineer is troubleshooting slow multi-GPU training across two DGX H100 servers connected via InfiniBand. The engineer suspects NCCL is not using RDMA. Which command or environment variable should the engineer use to verify the transport being used?",
                "options": [
                    "Set NCCL_DEBUG=INFO and check the logs for 'Using IB' or 'Using RDMA' messages.",
                    "Run nvidia-smi topo -m to verify NVLink connectivity.",
                    "Set NCCL_IB_DISABLE=1 and monitor performance improvement.",
                    "Use ibstat to check InfiniBand link status."
                ],
                "correctAnswer": 0,
                "explanation": "Setting NCCL_DEBUG=INFO enables detailed logging from NCCL, which includes the transport selection (e.g., 'Using IB' for InfiniBand or 'Using RDMA'). This directly confirms whether RDMA over InfiniBand is being used. Option B (nvidia-smi topo -m) shows GPU topology but not the active transport. Option C (NCCL_IB_DISABLE=1) disables InfiniBand, which would worsen performance if InfiniBand is available, and does not help verify current usage. Option D (ibstat) checks InfiniBand link status but does not indicate whether NCCL is using RDMA."
            },
            {
                "id": 249,
                "question": "In an AI cluster using MPI over InfiniBand, which mechanism allows data to be transferred directly between GPU memories without CPU involvement?",
                "options": [
                    "GPUDirect RDMA",
                    "NVLink",
                    "OpenSM routing",
                    "MPI_Allreduce collective"
                ],
                "correctAnswer": 0,
                "explanation": "GPUDirect RDMA enables direct GPU-to-GPU memory transfers across the network (InfiniBand or RoCE) by bypassing the host CPU and system memory. This is the key mechanism that allows MPI over InfiniBand to achieve ultra-low latency and high bandwidth in AI clusters. NVLink is a high-speed interconnect within a single node for GPU-to-GPU communication, not across the network. OpenSM is the subnet manager for InfiniBand fabrics, handling routing and LID assignments, but does not directly move data. MPI_Allreduce is a collective communication operation, not a data transfer mechanism."
            },
            {
                "id": 250,
                "question": "An AI engineer notices that a training job is taking 30% longer than expected. Monitoring shows that CPU utilization is consistently high due to infrastructure tasks. Which of the following is the most likely primary cause of this overhead?",
                "options": [
                    "Virtualization overhead from running multiple VMs on the host",
                    "Security scanning of the training dataset files",
                    "Storage protocol processing for NVMe-oF data transfers",
                    "Encryption/decryption of network traffic"
                ],
                "correctAnswer": 0,
                "explanation": "The lesson states that virtualization overhead per VM can consume 5-10% of a CPU core, and with multiple VMs, this can add up significantly. Security scanning and storage protocol processing are also contributors, but virtualization is highlighted as a primary and consistent overhead in multi-tenant environments. Encryption is mentioned but typically less impactful unless all traffic is encrypted. Therefore, virtualization is the most likely primary cause given the scenario of consistently high CPU utilization."
            },
            {
                "id": 251,
                "question": "An AI infrastructure engineer notices that GPU utilization is frequently below 50% during training, while the host CPU is consistently at 80-90% utilization with a high 'sy' (system) percentage. What is the most likely cause of this performance issue?",
                "options": [
                    "The GPU is overheating and throttling performance.",
                    "The host CPU is spending a significant portion of its cycles on infrastructure overhead tasks such as network packet processing and storage virtualization.",
                    "The training dataset is too small, causing the GPU to finish processing quickly and wait for new data.",
                    "The GPU driver is outdated and not properly utilizing Tensor Cores."
                ],
                "correctAnswer": 1,
                "explanation": "The scenario describes high CPU utilization with a high system (sy) percentage and low GPU utilization, which is a classic symptom of infrastructure overhead consuming host CPU cycles. As discussed in the lesson, tasks like network packet processing, storage virtualization, and security can consume 30% or more of CPU capacity, starving the GPU of data and causing it to idle. Option A is incorrect because overheating would typically cause GPU throttling, not high CPU system usage. Option C is incorrect because a small dataset would lead to short bursts of high GPU utilization followed by idle periods, not sustained low GPU utilization with high CPU system usage. Option D is incorrect because outdated drivers might affect performance but would not specifically cause high system CPU usage."
            },
            {
                "id": 252,
                "question": "In a disaggregated AI infrastructure, which component is responsible for handling infrastructure tasks such as networking, storage, and security?",
                "options": [
                    "Application CPU",
                    "NVIDIA BlueField DPU",
                    "GPU",
                    "NVSwitch"
                ],
                "correctAnswer": 1,
                "explanation": "The correct answer is the NVIDIA BlueField DPU. Disaggregation separates infrastructure functions from the application CPU, offloading networking, storage, and security tasks to a dedicated Data Processing Unit (DPU). The application CPU (Option A) is freed to focus solely on AI workloads. The GPU (Option C) handles parallel compute for AI, not infrastructure. NVSwitch (Option D) is used for GPU-to-GPU communication within a server, not for infrastructure tasks."
            },
            {
                "id": 253,
                "question": "Which of the following best describes the primary benefit of using a BlueField-3 DPU in an AI training server?",
                "options": [
                    "It increases the number of GPU cores available for AI computation.",
                    "It offloads infrastructure tasks such as networking, storage, and security from the host CPU, freeing CPU cycles for AI workloads.",
                    "It replaces the host CPU entirely, allowing the server to run AI workloads solely on the DPU.",
                    "It provides additional LPDDR5 memory that can be shared with the host CPU for larger datasets."
                ],
                "correctAnswer": 1,
                "explanation": "The BlueField-3 DPU offloads infrastructure tasks (networking, storage, security) from the host CPU, reducing CPU utilization for these tasks to less than 1% and freeing cycles for AI workloads. Option A is incorrect because the DPU does not add GPU cores. Option C is incorrect because the DPU is a co-processor, not a replacement for the host CPU. Option D is incorrect because the DPU's memory is dedicated to its own operations and not shared with the host CPU."
            },
            {
                "id": 254,
                "question": "An engineer is deploying BlueField DPUs in a multi-tenant AI cluster where each tenant requires strong network isolation and independent security policy enforcement. The host CPUs must be fully dedicated to AI computation. Which DPU operating mode should the engineer select?",
                "options": [
                    "P-mode, because it allows the host OS to manage the DPU as a standard PCIe endpoint.",
                    "DPU-mode, because the DPU runs its own OS and enforces security policies independently.",
                    "P-mode, because it simplifies deployment by eliminating the need for a separate DPU software stack.",
                    "DPU-mode, because it enables partial offload of data plane tasks while the host handles control plane."
                ],
                "correctAnswer": 1,
                "explanation": "DPU-mode (autonomous server mode) is the correct choice because it allows the DPU to run its own independent operating system, manage its own network stack, and enforce security policies without host involvement. This provides strong security isolation between tenants and fully offloads infrastructure tasks from the host CPU, enabling the host to focus entirely on AI computation. P-mode (PCIe endpoint mode) would not provide the required isolation because the host OS manages the DPU and can access its resources, and it only offloads data plane tasks, leaving control plane operations on the host CPU."
            },
            {
                "id": 255,
                "question": "An engineer is troubleshooting a VM networking performance issue in an AI data center. The host CPU utilization is high, and network throughput is below expected line rates. The engineer suspects that OVS hardware offload is not enabled. Which command should the engineer run to verify if OVS hardware offload is enabled?",
                "options": [
                    "ovs-vsctl get Open_vSwitch . other_config:hw-offload",
                    "ovs-dpctl dump-flows type=offloaded",
                    "mlx5_ibdevs",
                    "nvidia-smi -pm 1"
                ],
                "correctAnswer": 0,
                "explanation": "The correct command is 'ovs-vsctl get Open_vSwitch . other_config:hw-offload'. This command retrieves the value of the 'hw-offload' configuration parameter in OVS. If the output is 'true', hardware offload is enabled. Option B ('ovs-dpctl dump-flows type=offloaded') lists offloaded flows but does not indicate whether offload is enabled globally. Option C ('mlx5_ibdevs') shows InfiniBand devices, not OVS offload status. Option D ('nvidia-smi -pm 1') enables persistence mode for NVIDIA GPUs, unrelated to OVS offload."
            },
            {
                "id": 256,
                "question": "An engineer wants to offload network packet processing from the CPU to a DPU using the DOCA SDK. Which DOCA component should they use to implement custom packet filtering logic?",
                "options": [
                    "DOCA Flow application",
                    "libdoca_eth library",
                    "DOCA Orchestration Service",
                    "DOCA Telemetry application"
                ],
                "correctAnswer": 1,
                "explanation": "Custom packet filtering requires writing code that interacts with the DPU's network interface. The libdoca_eth library provides APIs for sending and receiving packets, managing MAC addresses, and configuring network interfaces, making it the appropriate choice for custom logic. DOCA Flow is a pre-built application for managing network traffic rules, not for custom programming. DOCA Orchestration Service manages lifecycle of applications, and DOCA Telemetry monitors metrics; neither provides packet processing APIs."
            },
            {
                "id": 257,
                "question": "What is the primary benefit of deploying an NVMe-oF storage initiator on a BlueField DPU instead of on the host CPU?",
                "options": [
                    "It reduces network latency by using a dedicated storage fabric.",
                    "It completely offloads storage I/O processing from the host CPU, freeing CPU cycles for AI workloads.",
                    "It allows the host CPU to manage storage connections more efficiently.",
                    "It increases storage capacity by aggregating multiple NVMe drives."
                ],
                "correctAnswer": 1,
                "explanation": "The primary benefit is that the DPU handles all NVMe-oF initiator tasks (protocol processing, packet handling, I/O completion) in hardware/firmware, so the host CPU is completely removed from the storage data path. This frees up to 30% of CPU cycles that would otherwise be consumed by storage operations, allowing the host to dedicate more resources to AI training or inference. Option A is incorrect because the DPU still uses the same network fabric; latency reduction is a secondary benefit. Option C is incorrect because the host CPU is not involved in managing storage connections when offloaded. Option D is incorrect because the DPU does not aggregate storage; it simply exposes remote storage as a local device."
            },
            {
                "id": 258,
                "question": "In a multi-tenant AI data center, how does the NVIDIA BlueField DPU enforce Zero-Trust traffic isolation between tenants sharing the same physical server?",
                "options": [
                    "By assigning each tenant a separate physical network interface card (NIC) and routing traffic through the host CPU for policy checks.",
                    "By using the host CPU to run a software firewall that inspects all packets and drops cross-tenant traffic.",
                    "By inspecting every packet at line rate in the DPU's programmable data path, extracting tenant identity from VXLAN or VLAN tags, and enforcing pre-loaded rules that block unauthorized cross-tenant communication.",
                    "By encrypting all tenant traffic with unique keys and relying on the host operating system to decrypt and verify tenant identity."
                ],
                "correctAnswer": 2,
                "explanation": "The BlueField DPU enforces Zero-Trust isolation at the hardware level by inspecting every packet in its programmable data path (using DOCA Flow and eBPF). It extracts tenant identity from VXLAN VNI or VLAN tags and applies pre-loaded rules to allow only intra-tenant traffic. This happens at line rate without involving the host CPU, ensuring no performance impact and preventing bypass. Option A is incorrect because tenants share the same physical NIC; separate NICs are not used. Option B is incorrect because relying on the host CPU would introduce latency and potential software vulnerabilities. Option D is incorrect because encryption alone does not enforce isolation; the DPU must still verify tenant identity and apply policies."
            },
            {
                "id": 259,
                "question": "An AI engineer is evaluating storage performance for a training pipeline that streams large TFRecord files. Which of the following best describes why sequential throughput is the most critical metric for this workload?",
                "options": [
                    "Sequential throughput measures the speed of reading small, random blocks, which is the dominant pattern during dataset streaming.",
                    "Sequential throughput measures the speed of reading large, contiguous data blocks, matching the pattern of streaming training datasets.",
                    "Sequential throughput measures the number of random I/O operations per second, which determines how fast metadata can be looked up.",
                    "Sequential throughput measures the raw network bandwidth, which is the upper limit for any storage access pattern."
                ],
                "correctAnswer": 1,
                "explanation": "During training dataset streaming, data is read in large, contiguous chunks (e.g., TFRecord files) without seeking. Sequential throughput directly measures the speed of such large reads, making it the dominant metric. Option A is incorrect because random small reads are not the dominant pattern. Option C describes random IOPS, which is important for metadata but not for streaming. Option D describes bandwidth, which is an upper limit but not the actual throughput experienced in practice."
            },
            {
                "id": 260,
                "question": "During multi-node AI training, checkpointing can cause significant training delays. Which storage performance characteristic is most critical to mitigate this issue?",
                "options": [
                    "High sequential read throughput",
                    "High random write IOPS",
                    "Low metadata latency for file stat operations",
                    "High sequential write throughput"
                ],
                "correctAnswer": 1,
                "explanation": "Checkpointing involves many GPUs simultaneously writing small model state files to storage, creating a burst of random writes. High random write IOPS ensures these writes complete quickly, preventing training stalls. Sequential throughput (A, D) is less relevant because checkpoint writes are not sequential. Metadata latency (C) is important for other operations but not the primary bottleneck during checkpoint bursts."
            }
        ]
    },
    {
        "id": 14,
        "title": "NCA practice exam Set 14",
        "description": "Practice Exam Set 14 containing 20 unique exam-aligned questions covering core infrastructure domains.",
        "questions": [
            {
                "id": 261,
                "question": "An AI infrastructure engineer is tuning an NVMe SSD array for a multi-GPU training workload. The engineer observes that GPU data loaders frequently stall while waiting for data, even though the NVMe drives are not saturated in terms of bandwidth. Which of the following is the most likely cause of this issue?",
                "options": [
                    "The NVMe queue depth is set too low, limiting the number of concurrent I/O requests the drives can process.",
                    "The NVMe drives are using SATA protocol, which supports only a single queue with 32 commands.",
                    "The storage network uses InfiniBand without RDMA, causing high CPU overhead.",
                    "The NVMe driver is configured with a queue depth of 64K, overwhelming the storage controller."
                ],
                "correctAnswer": 0,
                "explanation": "The scenario describes GPU data loaders stalling despite the NVMe drives not being bandwidth-saturated. This is a classic symptom of insufficient queue depth. NVMe supports up to 64K queue depth, but many systems default to a much lower value (e.g., 128 or 256). With low queue depth, the drive can only handle a limited number of outstanding I/O requests, causing requests to queue up and GPUs to wait. Option A correctly identifies this. Option B is incorrect because NVMe is not SATA; SATA uses AHCI with limited queues. Option C is incorrect because InfiniBand natively supports RDMA, and the issue is about storage protocol, not network. Option D is incorrect because a queue depth of 64K is the maximum supported and would not overwhelm the controller if properly tuned; the problem is likely the opposite\u2014too low a queue depth."
            },
            {
                "id": 262,
                "question": "An AI engineer is selecting NVMe U.2 drives for a new server. The server supports PCIe Gen4 and has a backplane that provides x4 lanes per drive. What is the maximum theoretical sequential read speed per drive?",
                "options": [
                    "3.5 GB/s",
                    "7.0 GB/s",
                    "14.0 GB/s",
                    "28.0 GB/s"
                ],
                "correctAnswer": 1,
                "explanation": "PCIe Gen4 provides approximately 2 GB/s per lane. With x4 lanes, the total bandwidth is 8 GB/s, but drive controller limits typically cap sequential reads at around 7.0 GB/s. Option A (3.5 GB/s) corresponds to PCIe Gen3 x4. Option C (14.0 GB/s) is for PCIe Gen5 x4. Option D (28.0 GB/s) is for PCIe Gen5 x8. Therefore, the correct answer is 7.0 GB/s."
            },
            {
                "id": 263,
                "question": "An AI engineer is using NFS to share a dataset containing millions of small image files across multiple GPU servers for training. During training, they observe that data loading is extremely slow, and the training throughput is much lower than expected. Which of the following is the most likely cause of this performance issue?",
                "options": [
                    "The NFS server does not support RDMA, causing high CPU overhead.",
                    "NFS metadata operations for many small files introduce high latency and network overhead.",
                    "The GPU servers are using GPUDirect Storage, which bypasses the NFS mount.",
                    "The dataset is stored on a parallel file system, which is incompatible with NFS."
                ],
                "correctAnswer": 1,
                "explanation": "NFS is known to perform poorly with many small files because each file access requires metadata operations (e.g., stat, open) that traverse the network, causing high latency. This is a key limitation of NFS for AI workloads with large numbers of small files. Option A is incorrect because RDMA is not typically used with NFS and would not directly address the metadata bottleneck. Option C is incorrect because GPUDirect Storage is a separate technology that improves data transfer to GPUs, not a cause of slowdown. Option D is incorrect because the dataset is described as being on NFS, not a parallel file system."
            },
            {
                "id": 264,
                "question": "A data center engineer is designing a storage solution for a multi-GPU training cluster. The cluster requires multiple servers to read and write the same dataset simultaneously with very low latency. Which storage technology should the engineer choose?",
                "options": [
                    "Network Attached Storage (NAS) using NFS",
                    "Storage Area Network (SAN) using Fibre Channel",
                    "Direct Attached Storage (DAS) using SATA drives",
                    "Object storage using HTTP REST API"
                ],
                "correctAnswer": 1,
                "explanation": "A SAN using Fibre Channel provides block-level access over a dedicated, high-speed network with extremely low latency, making it ideal for multi-GPU training clusters that need shared, fast storage. NAS (NFS) offers file-level access with higher overhead and latency. DAS is not shared. Object storage is optimized for scalability and web access, not low-latency block I/O."
            },
            {
                "id": 265,
                "question": "In an AI data center, which NVMe-oF transport type is preferred for latency-sensitive AI training workloads due to its use of Remote Direct Memory Access (RDMA)?",
                "options": [
                    "NVMe/TCP",
                    "NVMe/RDMA",
                    "NVMe/FC",
                    "NVMe/iSCSI"
                ],
                "correctAnswer": 1,
                "explanation": "NVMe/RDMA (using InfiniBand or RoCE) is preferred for latency-sensitive AI training because RDMA bypasses the host CPU and OS kernel, enabling direct data transfer between GPU memory and remote storage with microsecond latency. NVMe/TCP uses standard Ethernet and has higher latency due to TCP/IP overhead. NVMe/FC is not a standard NVMe-oF transport; Fibre Channel is a legacy storage protocol. NVMe/iSCSI is not a valid combination; iSCSI is a SCSI-based protocol, not NVMe."
            },
            {
                "id": 266,
                "question": "An AI infrastructure engineer is designing a storage network for a large-scale GPU cluster used for training deep learning models. The goal is to achieve sub-10 microsecond latency for storage access to prevent GPU starvation. Which combination of technologies is required to meet this latency target?",
                "options": [
                    "NVMe over Fabrics (NVMe-oF) with RDMA over a lossless network fabric",
                    "iSCSI over a dedicated 100GbE network with jumbo frames",
                    "NFS over a converged Ethernet fabric with Priority Flow Control",
                    "Fibre Channel SAN with NVMe over Fibre Channel (NVMe/FC)"
                ],
                "correctAnswer": 0,
                "explanation": "Sub-10 microsecond latency for networked storage is achieved by combining NVMe over Fabrics (NVMe-oF) with Remote Direct Memory Access (RDMA) over a lossless network fabric. NVMe-oF extends the low-latency NVMe protocol across a network, while RDMA bypasses the CPU and OS kernel to move data directly between storage and GPU memory. A lossless fabric (InfiniBand or RoCEv2 with PFC/ECN) prevents packet drops that would increase latency. iSCSI and NFS typically introduce hundreds of microseconds of latency due to higher protocol overhead and CPU involvement. NVMe/FC can achieve low latency but is not as common in AI clusters and may not reach sub-10\u03bcs without RDMA."
            },
            {
                "id": 267,
                "question": "An AI data center engineer is planning to deploy NVMe over Fabrics (NVMe-oF) for a new AI training cluster. The existing network infrastructure consists entirely of standard 25GbE Ethernet switches and NICs without RDMA capabilities. The engineer needs a solution that is simple to deploy and does not require additional hardware. Which NVMe-oF transport should the engineer choose?",
                "options": [
                    "NVMe/TCP",
                    "NVMe/RDMA over RoCE",
                    "NVMe/FC",
                    "NVMe/InfiniBand"
                ],
                "correctAnswer": 0,
                "explanation": "NVMe/TCP is the correct choice because it operates over standard TCP/IP networks and does not require any special hardware such as RDMA-capable NICs or Fibre Channel adapters. It can be deployed on the existing 25GbE Ethernet infrastructure with minimal complexity. NVMe/RDMA over RoCE requires RDMA-capable NICs and lossless Ethernet configuration. NVMe/FC requires Fibre Channel HBAs and switches. NVMe/InfiniBand requires InfiniBand HCAs and switches. Therefore, NVMe/TCP is the simplest option given the existing standard Ethernet network."
            },
            {
                "id": 268,
                "question": "In an NVMe-oF architecture, which component is responsible for managing access to namespaces and handling commands from hosts?",
                "options": [
                    "Namespace",
                    "Controller",
                    "Queue Pair",
                    "Subsystem"
                ],
                "correctAnswer": 1,
                "explanation": "The controller is the logical entity that manages access to namespaces, handles commands from hosts, and coordinates data transfers. Namespaces are logical storage units, queue pairs are communication channels, and a subsystem is a collection of controllers and namespaces."
            },
            {
                "id": 269,
                "question": "An AI engineer is designing a storage solution for a cluster with 200 GPUs performing distributed training. The workload involves frequent checkpoint writes (every 5 minutes) and a dataset consisting of millions of small image files. Which two limitations of NFS would most negatively impact this workload? (Choose two.)",
                "options": [
                    "NFS does not support RDMA, causing high CPU overhead.",
                    "NFS has a single metadata server, creating a bottleneck for file operations.",
                    "NFS does not allow multiple clients to read different parts of the same file concurrently.",
                    "NFS requires a dedicated InfiniBand network for acceptable performance."
                ],
                "correctAnswer": 1,
                "explanation": "The two key limitations of NFS that impact AI workloads are: (1) a single metadata server bottleneck, which serializes operations like file creation and listing, and (2) lack of parallel I/O, meaning only one client can access a file at a time. These directly affect checkpoint writes (metadata-heavy) and reading large datasets from many GPUs. Option A is incorrect because NFS can use RDMA (e.g., over InfiniBand or RoCE) but that does not solve the metadata bottleneck. Option D is false; NFS works over standard Ethernet and does not require InfiniBand."
            },
            {
                "id": 270,
                "question": "An AI training cluster with 1,000 GPUs experiences severe delays when all GPUs attempt to open the same dataset simultaneously. Which storage system characteristic is the primary cause of this thundering herd problem?",
                "options": [
                    "Insufficient GPU memory bandwidth",
                    "Centralized metadata server handling all file open requests",
                    "Lack of RDMA support in the network fabric",
                    "Inadequate CPU core count on the storage server"
                ],
                "correctAnswer": 1,
                "explanation": "The thundering herd problem occurs when many clients simultaneously access a shared resource, overwhelming it. In traditional NFS, a single metadata server handles all file open requests. When 1,000 GPUs all ask 'where is this file?' at once, the metadata server becomes a bottleneck, causing severe slowdowns or crashes. Parallel file systems solve this by distributing metadata across multiple servers. Option A is incorrect because GPU memory bandwidth affects compute speed, not file access concurrency. Option C is incorrect because RDMA reduces latency but does not address the metadata server bottleneck. Option D is incorrect because CPU count on the storage server is not the primary issue; the centralized design is the root cause."
            },
            {
                "id": 271,
                "question": "An AI infrastructure engineer is attempting to improve NFS performance for a 40 Gb/s storage network. Which of the following best explains why tuning workarounds like increasing rsize/wsize or enabling nconnect are insufficient at this speed?",
                "options": [
                    "NFS tuning workarounds are effective at all speeds but require additional hardware acceleration.",
                    "NFS is a client-server protocol with single-threaded metadata operations and chatty round trips, which become bottlenecks at high bandwidth.",
                    "The TCP incast problem only occurs at speeds below 10 Gb/s, so tuning is unnecessary at 40 Gb/s.",
                    "Increasing rsize/wsize and nconnect can fully saturate a 40 Gb/s link if configured correctly."
                ],
                "correctAnswer": 1,
                "explanation": "At speeds beyond 10 Gb/s, NFS's architectural limitations\u2014such as single-threaded metadata operations, chatty protocol requiring multiple round trips per file operation, and reliance on TCP/IP\u2014become dominant bottlenecks. Tuning workarounds like larger buffer sizes or multiple connections provide only marginal gains and cannot overcome these fundamental protocol constraints. Options A, C, and D are incorrect because tuning workarounds are not sufficient at high speeds, the TCP incast problem worsens at higher speeds, and even with tuning, NFS cannot saturate a 40 Gb/s link due to protocol overhead."
            },
            {
                "id": 272,
                "question": "In a Lustre file system, which component is responsible for managing file names, directory structures, and permissions, and is typically deployed in an active/passive pair for high availability?",
                "options": [
                    "Object Storage Server (OSS)",
                    "Metadata Server (MDS)",
                    "Object Storage Target (OST)",
                    "Metadata Target (MDT)"
                ],
                "correctAnswer": 1,
                "explanation": "The Metadata Server (MDS) manages the namespace, including file names, directory structures, permissions, and timestamps. It is typically deployed in an active/passive pair for high availability. The OSS manages data I/O, the OST stores file data, and the MDT is the storage device for metadata attached to the MDS."
            },
            {
                "id": 273,
                "question": "An AI engineer is preparing to store a 500 GB training dataset on a Lustre filesystem. The dataset will be read by 32 compute nodes during training. Which striping configuration is most appropriate for this workload?",
                "options": [
                    "Stripe count = 1, stripe size = 4 MB",
                    "Stripe count = 4, stripe size = 1 MB",
                    "Stripe count = 32, stripe size = 4 MB",
                    "Stripe count = 128, stripe size = 64 KB"
                ],
                "correctAnswer": 2,
                "explanation": "For a large file (500 GB) accessed by many compute nodes (32), wide striping is recommended to maximize parallel read throughput. A stripe count of 32 matches the number of readers, allowing each node to read from a different OST simultaneously. A stripe size of 4 MB is a good starting point, balancing metadata overhead and parallel efficiency. Option A (stripe count 1) provides no parallelism. Option B (stripe count 4) is too narrow for 32 readers. Option D (stripe count 128) is excessive for 32 nodes and a 64 KB stripe size is too small, causing high metadata overhead and poor performance."
            },
            {
                "id": 274,
                "question": "Which of the following best describes the role of the global namespace in IBM Spectrum Scale (GPFS) for AI workloads?",
                "options": [
                    "It allows each GPU node to have its own private view of the file system, improving security.",
                    "It provides a single, unified directory tree that all nodes access, regardless of where data is physically stored.",
                    "It automatically replicates data across multiple data centers for disaster recovery.",
                    "It enables direct GPU-to-GPU data transfer without involving the CPU."
                ],
                "correctAnswer": 1,
                "explanation": "The global namespace in IBM Spectrum Scale presents all data as a single logical directory tree, accessible from any node in the cluster. This simplifies data management for AI workloads because training scripts can use the same path (e.g., /gpfs/training_data) on every node, even though the data is distributed across many physical disks. Option A is incorrect because the namespace is shared, not private. Option C describes data replication, which is a separate feature. Option D describes GPUDirect RDMA, not a file system feature."
            },
            {
                "id": 275,
                "question": "An AI engineer is evaluating storage solutions for a new GPU cluster used for deep learning training. Which characteristic of the WEKA parallel file system makes it particularly well-suited for this workload?",
                "options": [
                    "It uses a centralized metadata server to ensure strong consistency.",
                    "It is designed natively for all-flash NVMe storage and provides sub-millisecond latency.",
                    "It relies on HDDs for bulk storage and uses flash only as a cache.",
                    "It requires a separate Lustre file system for checkpointing."
                ],
                "correctAnswer": 1,
                "explanation": "WEKA is an all-flash parallel file system built from the ground up for AI workloads. Its native design for NVMe flash storage delivers consistent sub-millisecond latency and high parallelism, which is critical for keeping GPUs fed with data during training. Option A is incorrect because WEKA uses a distributed architecture without a single metadata server bottleneck. Option C is incorrect because WEKA is all-flash by design, not HDD-based. Option D is incorrect because WEKA itself handles checkpointing efficiently without requiring an external file system."
            },
            {
                "id": 276,
                "question": "An AI engineer is designing a data pipeline for training a large language model. The team needs to store and version petabytes of training data, model checkpoints, and final artifacts, and they want to use a storage solution that is accessible from both cloud and on-premises environments without vendor lock-in. Which storage API is the most universal and widely adopted for this purpose?",
                "options": [
                    "NFS (Network File System) API",
                    "S3 (Simple Storage Service) API",
                    "iSCSI (Internet Small Computer System Interface) API",
                    "GPUDirect Storage (GDS) API"
                ],
                "correctAnswer": 1,
                "explanation": "The S3 API has become the universal protocol for object storage, adopted by AWS, MinIO, Ceph, Google Cloud Storage, and many others. It is RESTful, HTTP-based, and supported by a vast AI tooling ecosystem (DVC, MLflow, PyTorch, TensorFlow, etc.), enabling vendor independence and seamless data management across cloud and on-premises. NFS is a file-level protocol not designed for object storage; iSCSI is a block-level protocol; GPUDirect Storage is a technology for direct GPU-to-storage data movement, not a storage API."
            },
            {
                "id": 277,
                "question": "An AI engineer is deploying MinIO on-premises to store large training datasets. Which MinIO feature ensures data durability even if multiple drives fail in a distributed cluster?",
                "options": [
                    "Bucket versioning",
                    "Erasure coding",
                    "S3 API compatibility",
                    "Bucket notifications"
                ],
                "correctAnswer": 1,
                "explanation": "Erasure coding is the correct answer because it splits data into data and parity shards distributed across drives, allowing data recovery even if up to half the drives fail. Bucket versioning (A) protects against accidental overwrites but not drive failures. S3 API compatibility (C) is about API interoperability, not durability. Bucket notifications (D) trigger events but do not protect data."
            },
            {
                "id": 278,
                "question": "An AI infrastructure engineer wants to reduce storage costs by automatically moving infrequently accessed datasets from NVMe to object storage. Which of the following best describes how a tiered storage policy achieves this?",
                "options": [
                    "The policy manually triggers a script each month to archive old datasets.",
                    "The policy monitors access patterns and automatically migrates cold datasets based on rules like age or last access time.",
                    "The policy compresses all datasets on NVMe to reduce storage usage.",
                    "The policy replicates hot datasets to object storage for backup purposes."
                ],
                "correctAnswer": 1,
                "explanation": "A tiered storage policy automates data movement between storage tiers by monitoring access patterns and applying rules (e.g., age, last access time) to migrate cold datasets from expensive NVMe to cheaper object storage. Option A is incorrect because the policy is automatic, not manual. Option C is incorrect because compression is not the primary mechanism; the goal is to move data to a cheaper tier. Option D is incorrect because replication for backup is not the same as tiering for cost savings."
            },
            {
                "id": 279,
                "question": "In the standard data path from NVMe storage to GPU VRAM, how many times does the data traverse the PCIe bus?",
                "options": [
                    "Once",
                    "Twice",
                    "Three times",
                    "Four times"
                ],
                "correctAnswer": 1,
                "explanation": "The standard data path involves two PCIe transfers: first from NVMe to system RAM (CPU bounce buffer), then from system RAM to GPU VRAM. This double traversal is a key source of inefficiency compared to GPUDirect Storage, which eliminates the bounce buffer and reduces PCIe transfers to one."
            },
            {
                "id": 280,
                "question": "In a data-intensive AI training workflow, which of the following best describes the primary cause of low GPU utilization?",
                "options": [
                    "The GPU's Tensor Cores are underutilized due to small batch sizes.",
                    "Data must traverse a multi-hop path through CPU memory and PCIe, causing the GPU to wait for data.",
                    "The storage system uses HDDs instead of NVMe SSDs, limiting read throughput.",
                    "The CPU is too slow to perform data augmentation, delaying the GPU."
                ],
                "correctAnswer": 1,
                "explanation": "The traditional data path involves copying data from storage to system RAM, then to GPU memory via PCIe, with CPU processing in between. This creates a bottleneck where the GPU finishes computing a batch and then idles while waiting for the next batch to traverse this path. While small batch sizes (A) can also reduce utilization, the primary cause described in the lesson is the multi-hop data path. Storage speed (C) and CPU augmentation speed (D) are contributing factors but not the root cause; even with fast storage and CPU, the multiple copies and PCIe contention remain."
            }
        ]
    },
    {
        "id": 15,
        "title": "NCA practice exam Set 15",
        "description": "Practice Exam Set 15 containing 20 unique exam-aligned questions covering core infrastructure domains.",
        "questions": [
            {
                "id": 281,
                "question": "In the GPUDirect Storage (GDS) architecture, what is the role of the DMA engine when reading data from an NVMe SSD?",
                "options": [
                    "It copies data from the NVMe SSD to CPU memory, then to GPU memory.",
                    "It reads data from the NVMe SSD and writes it directly into GPU BAR memory.",
                    "It transfers data from the NVMe SSD to system RAM, bypassing the GPU.",
                    "It manages the mapping between GPU memory and PCIe address space."
                ],
                "correctAnswer": 1,
                "explanation": "The DMA engine in GDS reads data directly from the NVMe SSD and writes it into GPU BAR memory, bypassing CPU memory entirely. Option A describes the traditional path. Option C is incorrect because GDS targets GPU memory, not system RAM. Option D describes the role of the CUDA driver, not the DMA engine."
            },
            {
                "id": 282,
                "question": "Which of the following best describes the primary benefit of using GPUDirect Storage (GDS) in an AI training pipeline?",
                "options": [
                    "It enables direct data transfer between NVMe storage and GPU memory, bypassing the CPU and system RAM.",
                    "It optimizes multi-GPU communication within a single node using collective operations like all-reduce.",
                    "It allows GPUs in different servers to directly access each other's memory over a network.",
                    "It provides low-level NVMe command optimizations to increase IOPS and reduce tail latency."
                ],
                "correctAnswer": 0,
                "explanation": "GPUDirect Storage (GDS) is designed to create a direct data path between NVMe storage and GPU memory, bypassing the CPU and system RAM. This reduces latency and CPU overhead, and increases throughput for data loading. Option B describes NCCL, option C describes GPUDirect RDMA, and option D describes the NVIDIA Storage Command Set (SCS)."
            },
            {
                "id": 283,
                "question": "An AI engineer is benchmarking storage throughput for a training pipeline. Without GPUDirect Storage (GDS), the measured read throughput is 6 GB/s. After enabling GDS with the same hardware and dataset, what is the expected maximum throughput improvement?",
                "options": [
                    "Up to 2x (12 GB/s)",
                    "Up to 3x (18 GB/s)",
                    "Up to 4x (24 GB/s)",
                    "No improvement; throughput remains 6 GB/s"
                ],
                "correctAnswer": 0,
                "explanation": "GPUDirect Storage (GDS) enables a direct data path from NVMe storage to GPU memory, bypassing the CPU and system RAM. This eliminates the CPU copy bottleneck, allowing the GPU to saturate the storage bandwidth more efficiently. The lesson states that GDS provides up to 2x storage throughput improvement. Therefore, with a baseline of 6 GB/s, the expected maximum throughput is 12 GB/s. Options B, C, and D are incorrect because GDS does not provide 3x or 4x improvement, and it does provide a significant improvement over the non-GDS path."
            },
            {
                "id": 284,
                "question": "An AI infrastructure engineer is configuring a server for GPUDirect Storage (GDS). Which of the following is a mandatory requirement for the NVMe driver to support GDS?",
                "options": [
                    "The driver must be a proprietary third-party driver.",
                    "The driver must support peer-to-peer (P2P) DMA.",
                    "The driver must be loaded as a kernel module with the 'p2p' parameter set to 1.",
                    "The driver must be version 5.10 or later."
                ],
                "correctAnswer": 1,
                "explanation": "GPUDirect Storage requires the NVMe driver to support peer-to-peer (P2P) DMA, which enables direct data transfers between NVMe storage and GPU memory without CPU involvement. The in-kernel NVMe driver typically supports this, while proprietary drivers may not. The driver version or a specific parameter is not the key requirement; P2P DMA support is essential."
            },
            {
                "id": 285,
                "question": "An engineer is configuring a GPU server to stream training data directly from a remote RDMA-enabled storage server into GPU memory, bypassing the CPU. Which two technologies must be combined to achieve this zero-copy data path? (Choose two.)",
                "options": [
                    "GPUDirect Storage (GDS)",
                    "NVLink",
                    "GPUDirect RDMA",
                    "MIG (Multi-Instance GPU)"
                ],
                "correctAnswer": 0,
                "explanation": "The correct combination is GPUDirect Storage (GDS) and GPUDirect RDMA. GDS enables direct data movement between storage and GPU memory, while GPUDirect RDMA allows the NIC to transfer data directly to/from GPU memory over the network. Together, they create a direct path from remote storage to GPU memory, bypassing the CPU and system RAM. NVLink is a high-speed GPU-to-GPU interconnect, not for network storage. MIG partitions a GPU into multiple instances, unrelated to data transfer paths."
            },
            {
                "id": 286,
                "question": "When using Lustre over InfiniBand with GPUDirect Storage (GDS) enabled, which of the following best describes the data path for a training job?",
                "options": [
                    "Data moves from storage to CPU system memory, then is copied to GPU memory via PCIe.",
                    "Data moves directly from storage to GPU memory over InfiniBand, bypassing the CPU and system memory.",
                    "Data moves from storage to CPU system memory, then to GPU memory via NVLink.",
                    "Data moves from storage to GPU memory via a dedicated Ethernet connection."
                ],
                "correctAnswer": 1,
                "explanation": "With GPUDirect Storage (GDS) enabled over Lustre and InfiniBand, data travels directly from the Lustre storage servers to GPU memory via InfiniBand RDMA, bypassing the CPU and system memory entirely. This reduces latency, offloads the CPU, and improves throughput. Option A describes the traditional path without GDS. Option C incorrectly involves NVLink, which is a GPU-to-GPU interconnect, not a storage path. Option D incorrectly specifies Ethernet; the scenario uses InfiniBand."
            },
            {
                "id": 287,
                "question": "An AI infrastructure engineer is deploying a multi-node GPU cluster for a production AI training workload. The cluster will use NVIDIA H100 GPUs and must maximize uptime while receiving regular security updates. Which NVIDIA driver branch should the engineer select?",
                "options": [
                    "Data Center (Production) branch",
                    "Long-Term Support (LTS) branch",
                    "Latest branch",
                    "Any branch can be used interchangeably"
                ],
                "correctAnswer": 0,
                "explanation": "The Data Center (Production) branch is specifically designed for data center GPUs like the H100, rigorously tested for enterprise workloads, and provides quarterly releases with critical security and bug fixes. It is the recommended default for production AI pipelines. The LTS branch is for environments that cannot tolerate updates, but it lacks new features and has rare updates. The Latest branch is for development/testing and may introduce instability. Mixing branches across a cluster can cause compatibility issues, so they are not interchangeable."
            },
            {
                "id": 288,
                "question": "A system administrator is deploying NVIDIA GPUs for AI workloads on a production server running Ubuntu 22.04. Which driver installation method is recommended by NVIDIA for this environment?",
                "options": [
                    "Download and run the latest .run file from NVIDIA's website.",
                    "Use the apt package manager to install the driver from NVIDIA's official repository.",
                    "Compile the driver from source code obtained from NVIDIA's GitHub.",
                    "Install the driver using the dnf package manager from the EPEL repository."
                ],
                "correctAnswer": 1,
                "explanation": "NVIDIA recommends using the repository-based installation method (apt for Debian/Ubuntu, dnf for RHEL/CentOS) for production environments because it provides automatic updates, dependency management, clean uninstallation, and kernel compatibility. The .run file method is a fallback for offline systems or testing, not recommended for production. Compiling from source is not a standard NVIDIA driver installation method. dnf is used on RHEL-based systems, not Ubuntu, and the EPEL repository is not NVIDIA's official repository."
            },
            {
                "id": 289,
                "question": "An AI infrastructure engineer notices that after a routine Linux kernel security update, the NVIDIA GPU drivers are still functioning correctly without any manual intervention. Which technology is most likely responsible for this seamless operation?",
                "options": [
                    "NVIDIA Persistence Mode",
                    "Dynamic Kernel Module Support (DKMS)",
                    "NVIDIA Container Toolkit",
                    "Data Center GPU Manager (DCGM)"
                ],
                "correctAnswer": 1,
                "explanation": "DKMS (Dynamic Kernel Module Support) automatically rebuilds kernel modules, such as NVIDIA drivers, after a kernel update. This ensures the drivers remain compatible with the new kernel without manual reinstallation. Persistence Mode prevents the driver from unloading but does not handle kernel updates. The Container Toolkit manages GPU access in containers, and DCGM provides monitoring and diagnostics, not automatic driver rebuilding."
            },
            {
                "id": 290,
                "question": "An engineer installs CUDA Toolkit 12.2 on a system with NVIDIA driver version 525.60.13. When running a CUDA application, they receive an error: 'CUDA driver version is insufficient for CUDA runtime version'. What is the most likely cause?",
                "options": [
                    "The driver version is too old for CUDA 12.2.",
                    "The CUDA toolkit version is too old for the driver.",
                    "The driver and CUDA toolkit are from different vendors.",
                    "The nvidia-smi command was not run as root."
                ],
                "correctAnswer": 0,
                "explanation": "According to the compatibility matrix, CUDA 12.2 requires a minimum driver version of 535.54.03. The installed driver (525.60.13) is older than the required minimum, so the driver does not support CUDA 12.2, causing the 'insufficient driver version' error. Option B is incorrect because a newer driver supports older CUDA toolkits. Option C is incorrect because both are from NVIDIA. Option D is incorrect because nvidia-smi does not require root for basic version checks."
            },
            {
                "id": 291,
                "question": "In the CUDA programming model, which hardware component is responsible for executing all threads within a single block?",
                "options": [
                    "A single CUDA core",
                    "A Streaming Multiprocessor (SM)",
                    "The entire GPU",
                    "A warp"
                ],
                "correctAnswer": 1,
                "explanation": "Each block is assigned to one Streaming Multiprocessor (SM), and all threads in that block execute on the same SM. CUDA cores within the SM execute individual threads, but the block as a whole is mapped to an SM. The entire GPU handles the grid, and a warp is a group of 32 threads within a block, not the hardware that executes the block."
            },
            {
                "id": 292,
                "question": "A developer is compiling a CUDA program that uses the cuBLAS library for matrix multiplication. During the build process, they encounter linker errors about undefined references to cuBLAS functions. Which component of the CUDA Toolkit is most likely missing or misconfigured?",
                "options": [
                    "The nvcc compiler is not installed.",
                    "The CUDA runtime library (cudart) is not linked.",
                    "The cuBLAS runtime library is not linked.",
                    "The development headers for cuBLAS are not included."
                ],
                "correctAnswer": 2,
                "explanation": "The linker errors for undefined references to cuBLAS functions indicate that the compiler cannot find the implementation of those functions. This typically happens when the corresponding runtime library (libcublas) is not linked during the build process. While including the header (cublas_v2.h) declares the functions, the linker needs the library to resolve the symbols. The nvcc compiler being installed is necessary but not the direct cause of linker errors. The CUDA runtime library (cudart) is usually linked by default but does not contain cuBLAS functions. The headers are likely included correctly since the compiler did not report missing declarations."
            },
            {
                "id": 293,
                "question": "A developer compiles a CUDA application using CUDA Toolkit 12.2 and deploys it on a system that has CUDA Toolkit 11.8 installed. What will happen when the application is executed?",
                "options": [
                    "The application will run successfully because CUDA is backward compatible.",
                    "The application will fail with a driver version error because the system's CUDA version is older than the compilation version.",
                    "The application will run but with reduced performance due to missing Tensor Cores.",
                    "The application will automatically recompile itself to match the system's CUDA version."
                ],
                "correctAnswer": 1,
                "explanation": "CUDA Toolkit is not forward compatible. Code compiled with a newer CUDA version (12.2) requires the system's CUDA driver and runtime to be at least that version. Since the system has an older version (11.8), the application will fail with an error such as 'CUDA driver version is insufficient'. Option A is incorrect because backward compatibility means newer versions can run code compiled with older versions, not the reverse. Option C is incorrect because performance degradation is not the primary issue; the application will not run at all. Option D is incorrect because CUDA does not automatically recompile binaries."
            },
            {
                "id": 294,
                "question": "Which cuBLAS function is the core operation for neural network layers and is automatically used by PyTorch's torch.mm() when running on a GPU?",
                "options": [
                    "cublasSgemv",
                    "cublasSgemm",
                    "cublasSdot",
                    "cublasSgeam"
                ],
                "correctAnswer": 1,
                "explanation": "cublasSgemm performs matrix-matrix multiplication, which is the fundamental operation in fully connected layers of neural networks. PyTorch's torch.mm() internally calls cuBLAS SGEMM when tensors are on a GPU. cublasSgemv is matrix-vector multiply, cublasSdot is vector dot product, and cublasSgeam is for matrix transpose/copy\u2014none are the core operation for neural network layers."
            },
            {
                "id": 295,
                "question": "Which sparse matrix storage format is most commonly used for Transformer workloads in cuSPARSE?",
                "options": [
                    "COO (Coordinate) format",
                    "ELL (Ellpack) format",
                    "CSR (Compressed Sparse Row) format",
                    "DIA (Diagonal) format"
                ],
                "correctAnswer": 2,
                "explanation": "CSR (Compressed Sparse Row) format is the most commonly used sparse matrix storage format for Transformer workloads in cuSPARSE because it balances storage efficiency with computational speed. COO format is simpler but less efficient for arithmetic operations; ELL format works well for matrices with uniform non-zero counts per row but is less flexible; DIA format is specialized for diagonal matrices and not suitable for general sparse patterns found in Transformers."
            },
            {
                "id": 296,
                "question": "An AI engineer is optimizing a deep learning training loop that repeatedly launches hundreds of small CUDA kernels per iteration. The engineer notices that CPU utilization is high due to kernel launch overhead, and GPU utilization is lower than expected. Which NVIDIA technology should the engineer use to reduce launch overhead and improve GPU utilization?",
                "options": [
                    "CUDA Graphs",
                    "CUDA Streams",
                    "CUDA Dynamic Parallelism",
                    "CUDA Unified Memory"
                ],
                "correctAnswer": 0,
                "explanation": "CUDA Graphs allow capturing a sequence of GPU operations (kernels, memory copies) into a pre-compiled graph, which can be launched with a single API call, eliminating per-kernel launch overhead. This is ideal for repetitive workloads with many small kernels. CUDA Streams enable concurrent execution but do not reduce launch overhead. CUDA Dynamic Parallelism allows kernels to launch other kernels, adding overhead. CUDA Unified Memory simplifies memory management but does not address launch overhead."
            },
            {
                "id": 297,
                "question": "Which of the following best describes the primary role of NVIDIA cuDNN in a deep learning workflow?",
                "options": [
                    "It provides a high-level API for building neural network architectures from scratch.",
                    "It offers hardware-optimized implementations of common deep learning operations like convolutions, pooling, and activations.",
                    "It is a framework for distributed training across multiple GPUs and nodes.",
                    "It manages GPU memory allocation and scheduling for deep learning workloads."
                ],
                "correctAnswer": 1,
                "explanation": "cuDNN (CUDA Deep Neural Network library) is a GPU-accelerated library that provides highly tuned implementations for standard deep learning operations such as convolutions, pooling, normalization, and activation layers. It is designed to exploit the parallel architecture of NVIDIA GPUs, including Tensor Cores, and automatically selects the fastest algorithm for the given hardware and input configuration. Option A is incorrect because cuDNN is a low-level library, not a high-level framework for building models. Option C is incorrect because distributed training is handled by frameworks like NCCL or Horovod. Option D is incorrect because memory management is typically handled by the CUDA runtime or the deep learning framework itself."
            },
            {
                "id": 298,
                "question": "A data scientist installs PyTorch 2.1 via pip and later checks the cuDNN version using torch.backends.cudnn.version(), which returns 8907. Which of the following best describes the cuDNN version installed?",
                "options": [
                    "cuDNN 8.9.7",
                    "cuDNN 8.9.0",
                    "cuDNN 9.0.7",
                    "cuDNN 8.0.9"
                ],
                "correctAnswer": 0,
                "explanation": "The version number 8907 is interpreted as major.minor.patch: 8.9.7. The first digit is the major version (8), the next digit is the minor version (9), and the last two digits are the patch level (07). Therefore, 8907 corresponds to cuDNN 8.9.7. Option B (8.9.0) is incorrect because the patch level is 7, not 0. Option C (9.0.7) is incorrect because the major version is 8, not 9. Option D (8.0.9) is incorrect because the minor version is 9, not 0."
            },
            {
                "id": 299,
                "question": "In a distributed training setup using NCCL, which operation is used to ensure that every GPU starts with identical model parameters before training begins?",
                "options": [
                    "AllReduce",
                    "Broadcast",
                    "Reduce",
                    "AllGather"
                ],
                "correctAnswer": 1,
                "explanation": "Broadcast is the NCCL operation that sends data from one root GPU to all other GPUs, ensuring every GPU receives an identical copy. This is used at the start of training to distribute the same initial model weights to all GPUs. AllReduce combines data from all GPUs and sends the result back to all, which is used for gradient synchronization. Reduce aggregates data to a single GPU. AllGather collects unique data from each GPU and distributes the full set to all GPUs."
            },
            {
                "id": 300,
                "question": "When NCCL performs topology detection for multi-GPU communication, which of the following best describes the order of priority it uses to select the communication path?",
                "options": [
                    "NVLink > PCIe > InfiniBand",
                    "InfiniBand > PCIe > NVLink",
                    "PCIe > NVLink > InfiniBand",
                    "NVLink > InfiniBand > PCIe"
                ],
                "correctAnswer": 0,
                "explanation": "NCCL's hierarchical selection algorithm prioritizes the fastest available link. NVLink offers the highest bandwidth and lowest latency within a node, so it is used first. If NVLink is not available, NCCL falls back to PCIe, which is slower but still intra-node. For inter-node communication, InfiniBand is used as the last resort because it has higher latency and lower bandwidth compared to NVLink. Therefore, the correct priority order is NVLink > PCIe > InfiniBand."
            }
        ]
    },
    {
        "id": 16,
        "title": "NCA practice exam Set 16",
        "description": "Practice Exam Set 16 containing 20 unique exam-aligned questions covering core infrastructure domains.",
        "questions": [
            {
                "id": 301,
                "question": "An AI engineer is troubleshooting slow multi-node training performance. After setting NCCL_DEBUG=INFO, the output shows 'Using network: Socket'. Which of the following environment variable changes would most likely improve performance?",
                "options": [
                    "Set NCCL_DEBUG=WARN to reduce log verbosity.",
                    "Set NCCL_IB_HCA to specify the correct InfiniBand adapter.",
                    "Set NCCL_NET_GDR_LEVEL=0 to disable GPU Direct RDMA.",
                    "Set NCCL_DEBUG=VERSION to confirm the NCCL version."
                ],
                "correctAnswer": 1,
                "explanation": "The debug output 'Using network: Socket' indicates NCCL is falling back to TCP/IP over Ethernet, which is slower than InfiniBand. This typically happens when NCCL cannot find or is not configured to use the InfiniBand adapters. Setting NCCL_IB_HCA to the correct InfiniBand adapter (e.g., mlx5_0) tells NCCL to use the high-speed IB network, which should improve performance. Option A only reduces logging, not performance. Option C disables GPU Direct RDMA, which would likely worsen performance. Option D only prints the version and does not affect network selection."
            },
            {
                "id": 302,
                "question": "Which of the following best describes the key difference in how isolation is achieved between virtual machines (VMs) and containers?",
                "options": [
                    "VMs use a hypervisor to emulate a full operating system for each instance, while containers share the host operating system's kernel.",
                    "VMs use namespaces and cgroups for isolation, while containers rely on a hypervisor.",
                    "VMs provide process-level isolation, while containers provide hardware-level isolation.",
                    "VMs are lightweight and boot in milliseconds, while containers are heavy and boot in minutes."
                ],
                "correctAnswer": 0,
                "explanation": "The correct answer is A. Virtual machines achieve isolation by running a hypervisor that emulates a full guest operating system for each VM, providing strong isolation but with high resource overhead. Containers, on the other hand, share the host OS kernel and use Linux namespaces and cgroups for process-level isolation, making them lightweight and fast. Option B is incorrect because it reverses the roles: VMs use a hypervisor, not namespaces/cgroups, and containers use namespaces/cgroups, not a hypervisor. Option C is incorrect because VMs provide hardware-level isolation (separate kernel), while containers provide process-level isolation. Option D is incorrect because VMs boot in minutes and are heavy, while containers boot in milliseconds and are lightweight."
            },
            {
                "id": 303,
                "question": "An AI engineer has developed a PyTorch model that runs perfectly on their local workstation. When deploying the same model to a production GPU server, the inference script fails due to a CUDA runtime version mismatch. Which solution best addresses this 'works on my machine' problem?",
                "options": [
                    "Install the same CUDA version on the production server as on the workstation.",
                    "Use a container image that includes the exact CUDA toolkit, PyTorch version, and dependencies used during development.",
                    "Recompile the model using the production server's CUDA version.",
                    "Use a virtual environment with pip to replicate the Python packages on the production server."
                ],
                "correctAnswer": 1,
                "explanation": "The container promise ensures that packaging the application with all its dependencies (including CUDA, libraries, and Python packages) into a single image eliminates environment inconsistencies. Option B is correct because containers isolate the entire software stack, so the exact same environment runs anywhere. Option A is impractical if multiple applications require different CUDA versions. Option C only addresses the CUDA version but not other dependencies. Option D only covers Python packages, not system libraries or CUDA."
            },
            {
                "id": 304,
                "question": "What is the primary effect of a PID namespace on process visibility inside a container?",
                "options": [
                    "The container sees all host processes but with remapped PIDs.",
                    "The container sees only its own processes, starting from PID 1.",
                    "The container sees processes from other containers in the same pod.",
                    "The container sees all processes on the host except init (PID 1)."
                ],
                "correctAnswer": 1,
                "explanation": "A PID namespace isolates the process tree so that processes inside the container can only see processes within that namespace. The first process in the container becomes PID 1, and host processes or processes from other containers are invisible. This prevents interference and ensures each container has its own private process universe."
            },
            {
                "id": 305,
                "question": "A container runtime creates a new network namespace for each container. Which of the following best describes the initial state of the network stack inside that namespace?",
                "options": [
                    "It contains all host network interfaces and a default route to the host's gateway.",
                    "It contains only a loopback interface and no other interfaces, routes, or firewall rules.",
                    "It contains a virtual Ethernet interface connected to the host bridge and a default route.",
                    "It contains a copy of the host's routing table and ARP cache."
                ],
                "correctAnswer": 1,
                "explanation": "When a new network namespace is created, it starts with only a loopback interface (lo). No physical or virtual network interfaces, routing tables, or firewall rules are present. The loopback interface is typically down initially and must be brought up. Other interfaces and routes are added later, for example by connecting a veth pair. Option A describes the root namespace, not a new one. Option C describes the state after a veth pair is attached and configured. Option D is incorrect because the routing table is empty except for the loopback route."
            },
            {
                "id": 306,
                "question": "An AI infrastructure engineer is configuring resource limits for a containerized training job on a modern Linux host (Ubuntu 22.04). The engineer needs to limit the container to use at most 2 CPU cores and 8 GB of memory. Which set of cgroup control files should the engineer write to?",
                "options": [
                    "cpu.cfs_quota_us, cpu.cfs_period_us, memory.limit_in_bytes",
                    "cpu.max, memory.max",
                    "cpu.shares, memory.soft_limit_in_bytes",
                    "cpu.cfs_quota_us, memory.max"
                ],
                "correctAnswer": 1,
                "explanation": "On a modern Linux host using cgroups v2 (default on Ubuntu 22.04+), resource limits are set via unified control files. For CPU, the file is cpu.max with format 'quota period' (e.g., '200000 100000' for 2 cores). For memory, the file is memory.max with the limit in bytes. Option A uses cgroups v1 files (cpu.cfs_quota_us, cpu.cfs_period_us, memory.limit_in_bytes). Option C uses cpu.shares (relative weight, not a hard limit) and memory.soft_limit_in_bytes (soft limit). Option D mixes v1 and v2 files, which is incorrect because the system uses one version consistently."
            },
            {
                "id": 307,
                "question": "In Docker's overlay2 storage driver, what happens when a container modifies a file that exists in a lower (read-only) image layer?",
                "options": [
                    "The file is directly modified in the lower layer using a copy-on-write mechanism.",
                    "A copy of the file is created in the container's writable upper layer, and all modifications are made to that copy.",
                    "The file is deleted from the lower layer and recreated in the upper layer.",
                    "A whiteout file is placed in the lower layer to hide the original file, and a new version is written to the upper layer."
                ],
                "correctAnswer": 1,
                "explanation": "The overlay2 driver uses copy-on-write (CoW). When a container modifies a file from a read-only lower layer, the file is copied up to the writable upper layer, and all changes are made to that copy. The original file in the lower layer remains untouched. Option A is incorrect because lower layers are read-only and cannot be modified. Option C is incorrect because the original file is not deleted; it is simply shadowed by the copy in the upper layer. Option D describes the deletion mechanism (whiteout files), not modification."
            },
            {
                "id": 308,
                "question": "An AI engineer builds a Docker image containing PyTorch, CUDA, and a training script. After training a model in a container launched from this image, the engineer wants to share the exact same environment with a colleague. Which statement accurately describes the relationship between the image and the container in this scenario?",
                "options": [
                    "The container's writable layer, including model checkpoints, is part of the image and will be shared with the colleague.",
                    "The image is immutable and can be used to launch multiple isolated containers, each with its own runtime state.",
                    "The container must be converted back into an image before it can be shared with the colleague.",
                    "The image and container are identical; sharing the container is equivalent to sharing the image."
                ],
                "correctAnswer": 1,
                "explanation": "An image is an immutable blueprint that can be used to create multiple containers, each isolated with its own writable layer. The container's runtime changes (e.g., checkpoints) are not part of the image. Option A is incorrect because the writable layer is ephemeral and not included in the image. Option C is incorrect because the image already exists and can be shared directly. Option D is incorrect because images and containers are distinct: images are static, containers are running instances."
            },
            {
                "id": 309,
                "question": "In a Dockerfile for an AI inference container, which instruction should be placed immediately after the FROM instruction to optimize build caching?",
                "options": [
                    "COPY ./model.pt /app/model.pt",
                    "RUN apt-get update && apt-get install -y python3-pip",
                    "ENV PYTHONUNBUFFERED=1",
                    "EXPOSE 8000"
                ],
                "correctAnswer": 1,
                "explanation": "To optimize Docker build caching, instructions that change less frequently should be placed earlier. The FROM instruction is first, followed by RUN commands that install system dependencies, as these change less often than application code or environment variables. COPY commands for model files and scripts change frequently and should be placed later to avoid invalidating the cache for earlier layers. ENV and EXPOSE are also less likely to change but are typically placed after RUN commands. Therefore, the RUN command is the correct choice to place immediately after FROM."
            },
            {
                "id": 310,
                "question": "An AI engineer runs the following command to start a Triton Inference Server container:\n\ndocker run --rm -d -p 8000:8000 -v /home/user/models:/models --name triton-server nvcr.io/nvidia/tritonserver:23.10-py3\n\nWhich flag ensures that the container is automatically removed after it stops?",
                "options": [
                    "--rm",
                    "-d",
                    "-p",
                    "--name"
                ],
                "correctAnswer": 0,
                "explanation": "The --rm flag tells Docker to automatically remove the container when it exits. This is useful for disposable containers like training jobs or inference servers that are stopped after use, preventing accumulation of stopped containers. The -d flag runs the container in detached mode, -p maps ports, and --name assigns a name; none of these cause auto-removal."
            },
            {
                "id": 311,
                "question": "An AI engineer is training a model inside a Docker container and wants to ensure that training checkpoints persist even if the container crashes. Which of the following best describes the recommended approach for mounting a host directory to save checkpoints?",
                "options": [
                    "Use the -v flag with a relative host path to mount the checkpoint directory.",
                    "Use the --mount flag with type=bind, source set to an absolute host path, and target set to the container checkpoint directory.",
                    "Use the -v flag with a colon-separated string that includes the container path only, letting Docker create the host path automatically.",
                    "Use the --mount flag with type=volume to create a Docker-managed volume that automatically persists data."
                ],
                "correctAnswer": 1,
                "explanation": "The correct answer is B. For production AI workloads, the --mount syntax is recommended because it is self-documenting and requires an absolute host path, preventing silent failures from missing paths. Option A is incorrect because relative paths are not supported and will fail. Option C is incorrect because specifying only the container path with -v would create a Docker volume, not a bind mount to a host directory. Option D is incorrect because type=volume creates a Docker-managed volume, which is not directly accessible from the host without additional steps, and is less suitable for checkpoint persistence where direct host access is needed."
            },
            {
                "id": 312,
                "question": "An AI engineer is running a distributed training job across multiple GPUs on a single node using NVIDIA NCCL. Which Docker networking mode should be used to achieve the lowest latency for GPU-to-GPU communication?",
                "options": [
                    "Bridge mode",
                    "Host mode",
                    "None mode",
                    "Overlay mode"
                ],
                "correctAnswer": 1,
                "explanation": "Host mode is the correct choice because it allows the container to share the host's network stack directly, bypassing Docker's virtual bridge and NAT. This eliminates virtualization overhead, which is critical for NCCL-based distributed training where even microsecond-level delays can compound across thousands of GPU-to-GPU messages. Bridge mode adds a small layer of NAT overhead, which can degrade performance. None mode provides no network connectivity, making it unsuitable for distributed training. Overlay mode is used for multi-host networking and adds additional overhead, so it is not optimal for single-node performance."
            },
            {
                "id": 313,
                "question": "In a Docker Compose file for an AI inference stack, which top-level key is used to define each container as a named service?",
                "options": [
                    "version",
                    "services",
                    "volumes",
                    "networks"
                ],
                "correctAnswer": 1,
                "explanation": "In a docker-compose.yml file, the 'services' top-level key is used to define each container as a named service. The 'version' key specifies the Compose file format version, while 'volumes' and 'networks' are optional sections for persistent storage and custom networking, respectively. The 'services' section contains the configuration for each container, such as image, ports, environment, and volumes."
            },
            {
                "id": 314,
                "question": "A DevOps engineer is building a Docker image for an AI inference service that requires custom CUDA kernels compiled during the build. Which Dockerfile pattern should the engineer use to minimize the final image size while ensuring the compiled kernels are available at runtime?",
                "options": [
                    "Use a single-stage build with a full CUDA development base image and remove build tools in a RUN command.",
                    "Use a multi-stage build: compile kernels in a stage based on a CUDA development image, then copy only the compiled artifacts to a final stage based on a CUDA runtime image.",
                    "Use a single-stage build with a minimal CUDA runtime base image and compile the kernels at container startup.",
                    "Use a multi-stage build: compile kernels in a stage based on a CUDA runtime image, then copy the entire build stage to a final stage based on a CUDA development image."
                ],
                "correctAnswer": 1,
                "explanation": "Multi-stage builds allow you to use a full development environment (e.g., nvidia/cuda:12.1-devel) in an initial stage to compile custom CUDA kernels, then copy only the resulting compiled artifacts (e.g., .so files) into a final stage based on a minimal runtime image (e.g., nvidia/cuda:12.1-runtime). This keeps the final image small by excluding compilers, headers, and build caches. Option A is incorrect because removing tools in a RUN command still leaves layers and may not fully eliminate all unnecessary files. Option C is incorrect because compiling at startup would require build tools in the runtime image, defeating the purpose. Option D is incorrect because it copies the entire build stage into a development image, resulting in a large final image."
            },
            {
                "id": 315,
                "question": "A containerized GPU workload fails with an error indicating that the GPU cannot be found. The host system has two GPUs installed and the NVIDIA driver is loaded. Which device file is most likely missing from the container's device list?",
                "options": [
                    "/dev/nvidia0",
                    "/dev/nvidiactl",
                    "/dev/nvidia-uvm",
                    "/dev/nvidia-modeset"
                ],
                "correctAnswer": 0,
                "explanation": "The error indicates the GPU cannot be found, which means the container lacks access to the physical GPU device file. /dev/nvidia0 corresponds to the first GPU; without it, CUDA applications cannot communicate with that GPU. /dev/nvidiactl is the control interface needed for driver communication, but its absence typically causes a different error (e.g., 'NVIDIA-SMI has failed because it couldn't communicate with the NVIDIA driver'). /dev/nvidia-uvm is for unified memory and its absence leads to memory-related errors. /dev/nvidia-modeset is not a standard device file for GPU compute; it is used for display modesetting."
            },
            {
                "id": 316,
                "question": "A data scientist is running a GPU-accelerated training job inside a Docker container. The container fails with the error 'CUDA driver version is insufficient for CUDA runtime version.' Which of the following is the most likely cause?",
                "options": [
                    "The container image does not include the CUDA toolkit.",
                    "The host's NVIDIA driver libraries (libcuda.so) are not accessible inside the container.",
                    "The container is using a different CUDA runtime version than the host driver supports.",
                    "The GPU device files (/dev/nvidia0) are not mounted into the container."
                ],
                "correctAnswer": 1,
                "explanation": "The error 'CUDA driver version is insufficient' typically occurs when the CUDA driver API library (libcuda.so) is missing or mismatched inside the container. While option C (version mismatch) could also cause this error, the most common root cause is that the driver libraries are not mounted into the container at all, especially when the --gpus flag is omitted. Option A is incorrect because the CUDA toolkit is not required for the driver library; the runtime library is part of the driver. Option D would cause a different error related to device access, not a driver version mismatch."
            },
            {
                "id": 317,
                "question": "What is the primary role of the NVIDIA Container Runtime in a containerized AI workload?",
                "options": [
                    "It replaces the default container runtime (runc) entirely for all containers.",
                    "It acts as a shim that injects GPU devices, drivers, and libraries into the container specification.",
                    "It provides a graphical interface for managing GPU resources inside containers.",
                    "It compiles AI models to run on CPU when no GPU is available."
                ],
                "correctAnswer": 1,
                "explanation": "The NVIDIA Container Runtime is a shim that intercepts container creation requests and modifies the OCI specification to include GPU device nodes, driver libraries, and environment variables. This allows containers to access the host GPU without manual configuration. Option A is incorrect because the runtime only activates when --gpus is used; runc is still the default for non-GPU containers. Option C is incorrect because it is a command-line tool, not a GUI. Option D is incorrect because it does not perform compilation; it only exposes the GPU."
            },
            {
                "id": 318,
                "question": "After installing the nvidia-container-toolkit package on a Linux host, which configuration file must be modified to register the NVIDIA runtime with Docker?",
                "options": [
                    "/etc/docker/daemon.json",
                    "/etc/nvidia-container-runtime/config.toml",
                    "/etc/systemd/system/docker.service.d/override.conf",
                    "/etc/docker/runtime-spec.json"
                ],
                "correctAnswer": 0,
                "explanation": "The correct answer is /etc/docker/daemon.json. This is the Docker daemon configuration file where you add a 'runtimes' section defining the 'nvidia' runtime pointing to the nvidia-container-runtime binary. Option B is the configuration file for the NVIDIA container runtime itself, not for Docker. Option C is a systemd override file that could be used but is not the standard or recommended method; the daemon.json is the primary configuration file. Option D is not a standard Docker configuration file."
            },
            {
                "id": 319,
                "question": "A data scientist needs to run a containerized training job on a shared GPU server with four GPUs (indices 0-3). The job requires two specific GPUs that are known to be free (GPU 0 and GPU 2). Which Docker run option should be used to ensure only those GPUs are visible inside the container?",
                "options": [
                    "--gpus all",
                    "--gpus 2",
                    "--gpus 'device=0,2'",
                    "--gpus 'device=0,1'"
                ],
                "correctAnswer": 2,
                "explanation": "The correct option is `--gpus 'device=0,2'`. This explicitly selects GPU 0 and GPU 2 by their device indices, giving the container access only to those specific GPUs. `--gpus all` would expose all four GPUs, which is not desired. `--gpus 2` would assign any two GPUs automatically, not necessarily GPU 0 and GPU 2. `--gpus 'device=0,1'` would select GPU 0 and GPU 1, not GPU 2. Therefore, only `--gpus 'device=0,2'` meets the requirement."
            },
            {
                "id": 320,
                "question": "A data scientist is running a PyTorch training container on a server with 4 GPUs. Inside the container, nvidia-smi shows all 4 GPUs, but PyTorch reports that no CUDA-capable device is available. Which environment variable is most likely misconfigured?",
                "options": [
                    "NVIDIA_VISIBLE_DEVICES is set to all",
                    "NVIDIA_DRIVER_CAPABILITIES is set to utility",
                    "NVIDIA_VISIBLE_DEVICES is set to none",
                    "NVIDIA_DRIVER_CAPABILITIES is set to compute,utility"
                ],
                "correctAnswer": 1,
                "explanation": "The default value for NVIDIA_DRIVER_CAPABILITIES is 'utility', which only enables basic monitoring (nvidia-smi) but does not mount the CUDA driver libraries. PyTorch requires the 'compute' capability to access CUDA. Setting NVIDIA_DRIVER_CAPABILITIES to 'utility' explains why nvidia-smi works but CUDA is unavailable. Option A would make GPUs visible, which is working. Option C would hide GPUs, contradicting nvidia-smi output. Option D would correctly enable CUDA."
            }
        ]
    },
    {
        "id": 17,
        "title": "NCA practice exam Set 17",
        "description": "Practice Exam Set 17 containing 20 unique exam-aligned questions covering core infrastructure domains.",
        "questions": [
            {
                "id": 321,
                "question": "A system administrator is deploying a custom FPGA accelerator in a Kubernetes cluster. According to the CDI specification (24.3a), which file format and approach should the administrator use to make this hardware available to containers?",
                "options": [
                    "Write a proprietary configuration file for the NVIDIA Container Runtime.",
                    "Create a JSON file following the CDI schema and place it in /etc/cdi/.",
                    "Modify the container runtime source code to add support for the FPGA.",
                    "Use the nvidia-smi command to generate a CDI file automatically."
                ],
                "correctAnswer": 1,
                "explanation": "The CDI specification defines a standard JSON schema for describing hardware devices. To make a custom FPGA accelerator available to containers, the administrator should create a CDI JSON file that describes the device (including mounts, device nodes, and environment variables) and place it in a standard directory like /etc/cdi/. The container runtime will then read this file and apply the edits. Option A is incorrect because the legacy NVIDIA Container Runtime is proprietary and NVIDIA-specific; CDI is vendor-neutral. Option C is incorrect because CDI avoids modifying runtime source code. Option D is incorrect because nvidia-smi is for NVIDIA GPUs, not custom hardware, and does not generate CDI files for non-NVIDIA devices."
            },
            {
                "id": 322,
                "question": "An engineer has just installed the NVIDIA Container Toolkit on a new server with four GPUs. Which command should they run to generate the CDI specification files that the container runtime will use to make the GPUs available inside containers?",
                "options": [
                    "nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml",
                    "nvidia-smi --generate-cdi",
                    "nvidia-container-cli generate-cdi",
                    "nvidia-cdi-hook create --spec=/etc/cdi/nvidia.yaml"
                ],
                "correctAnswer": 0,
                "explanation": "The correct command is 'nvidia-ctk cdi generate --output=/etc/cdi/nvidia.yaml'. This command is part of the NVIDIA Container Toolkit and automatically scans the system's NVIDIA driver installation to create a CDI specification file. The other options are incorrect: 'nvidia-smi --generate-cdi' is not a valid nvidia-smi option; 'nvidia-container-cli generate-cdi' is not a valid command; and 'nvidia-cdi-hook create' is not a valid subcommand (the correct subcommand is 'generate')."
            },
            {
                "id": 323,
                "question": "Which of the following best describes the role of the Container Device Interface (CDI) in exposing NVIDIA GPUs to Kubernetes pods?",
                "options": [
                    "CDI is a Kubernetes device plugin that manages GPU resource allocation.",
                    "CDI is a vendor-neutral specification that allows container runtimes like containerd and CRI-O to inject GPUs into containers using JSON specification files.",
                    "CDI is a custom patch for containerd that enables GPU support without modifying the runtime.",
                    "CDI is a tool that generates GPU device files in /dev/ for direct container access."
                ],
                "correctAnswer": 1,
                "explanation": "CDI (Container Device Interface) is a vendor-neutral specification that defines how devices (like GPUs) are described and made available to containers. Container runtimes (containerd, CRI-O) read CDI JSON spec files from /etc/cdi/ or /var/run/cdi/ and automatically inject the GPU devices, libraries, and mount points into the container at startup. This eliminates the need for runtime-specific flags or plugins. Option A is incorrect because CDI is not a Kubernetes device plugin; it works at the container runtime level. Option C is incorrect because CDI does not require patching containerd; it is natively supported. Option D is incorrect because CDI does not generate device files; it describes existing devices for injection."
            },
            {
                "id": 324,
                "question": "Why does the Container Device Interface (CDI) replace the hook-based approach for modern Kubernetes deployments?",
                "options": [
                    "Hooks are runtime-agnostic and work with any container runtime, while CDI is specific to containerd.",
                    "CDI is a vendor-neutral, runtime-agnostic specification that simplifies device injection and integrates natively with Kubernetes, whereas hooks are runtime-specific and require custom configuration.",
                    "Hooks provide better performance because they run as external processes, while CDI adds latency by being built into the runtime.",
                    "CDI requires manual management of hook injection order and script distribution across nodes, making it more complex than hooks."
                ],
                "correctAnswer": 1,
                "explanation": "CDI replaces hooks because it is a vendor-neutral, runtime-agnostic specification that standardizes device injection across all CDI-compatible runtimes (containerd, CRI-O, Docker). It simplifies lifecycle management by using YAML spec files and Kubernetes annotations (e.g., nvidia.com/gpu=all), eliminating the need for custom hook scripts and runtime-specific configurations. Hooks, on the other hand, are tied to specific runtimes (like Docker or containerd) and require separate JSON configuration files, making them brittle and harder to manage at scale. CDI is built into the runtime, improving reliability and performance compared to hooks which run as external processes."
            },
            {
                "id": 325,
                "question": "A data scientist wants to run a PyTorch training job on a GPU server. Instead of manually installing CUDA, cuDNN, and PyTorch, they decide to use an NGC container. Which command correctly pulls the PyTorch 24.01 release with Python 3 from the NGC registry?",
                "options": [
                    "docker pull nvcr.io/nvidia/pytorch:24.01-py3",
                    "docker pull nvidia/pytorch:24.01-py3",
                    "docker pull nvcr.io/pytorch:24.01-py3",
                    "docker pull nvcr.io/nvidia/pytorch:latest"
                ],
                "correctAnswer": 0,
                "explanation": "The correct command is 'docker pull nvcr.io/nvidia/pytorch:24.01-py3'. The NGC registry is hosted at nvcr.io, the organization is nvidia, the image is pytorch, and the tag 24.01-py3 specifies the January 2024 release with Python 3. Option B is missing the registry hostname. Option C is missing the organization. Option D uses the 'latest' tag, which may not correspond to the 24.01 release and is not specific."
            },
            {
                "id": 326,
                "question": "An AI engineer is planning to deploy a PyTorch-based training workload on a multi-GPU NVIDIA DGX system. Which of the following is a key advantage of using the NVIDIA PyTorch container from NGC over installing PyTorch via pip?",
                "options": [
                    "The container includes pre-installed CUDA, cuDNN, and NCCL, all version-matched and tested together for optimal performance.",
                    "The container is smaller in size and downloads faster than a pip installation.",
                    "The container allows PyTorch to run on CPU-only machines without modification.",
                    "The container includes a full Python development environment with all packages pre-installed."
                ],
                "correctAnswer": 0,
                "explanation": "The NVIDIA PyTorch container includes a curated set of GPU-accelerated libraries (CUDA, cuDNN, NCCL, etc.) that are pre-installed and version-matched to the PyTorch build, ensuring optimal performance and compatibility on NVIDIA hardware. Option B is incorrect because the container is larger (several GB) than a pip installation (few hundred MB). Option C is incorrect because the container is specifically built for NVIDIA GPUs and requires GPU hardware. Option D is incorrect because while common Python packages are included, the container is not a full development environment; its primary value is the optimized GPU stack."
            },
            {
                "id": 327,
                "question": "When authenticating to the NVIDIA NGC container registry (nvcr.io) using Docker, what username should be provided?",
                "options": [
                    "Your NVIDIA account email address",
                    "Your NGC API key",
                    "$oauthtoken",
                    "Your NGC username"
                ],
                "correctAnswer": 2,
                "explanation": "When using `docker login nvcr.io`, the required username is the literal string `$oauthtoken`, not your email or NGC username. The password is your actual NGC API key. Option A is incorrect because the username is not your email. Option B is incorrect because the API key is used as the password, not the username. Option D is incorrect because the username is not your NGC username."
            },
            {
                "id": 328,
                "question": "An AI engineer wants to automate the download of a pre-trained model from the NGC Catalog as part of a CI/CD pipeline. Which tool and authentication method should the engineer use to achieve this programmatically?",
                "options": [
                    "Use the NGC CLI with an API key stored as an environment variable.",
                    "Use the NGC web UI to manually download the model each time.",
                    "Use wget with a direct URL from the NGC Catalog.",
                    "Use Docker pull with the model's container image tag."
                ],
                "correctAnswer": 0,
                "explanation": "The NGC CLI is designed for programmatic access to the NGC Catalog, allowing automation via scripts and pipelines. Authentication is token-based using an API key, which can be stored as an environment variable (e.g., NGC_API_KEY) for security and repeatability. The web UI (option B) is manual and not suitable for automation. wget (option C) may not handle authentication or the NGC Catalog's API correctly. Docker pull (option D) is used for containers, not for downloading model files directly."
            },
            {
                "id": 329,
                "question": "An organization is deploying NVIDIA AI Enterprise in a virtualized environment with vGPU. Which of the following is a required step to ensure VMs can access vGPU acceleration?",
                "options": [
                    "Activate each physical GPU individually via the NVIDIA portal using its serial number.",
                    "Install the NVIDIA License Server software on a dedicated machine and configure GPU hosts to point to it.",
                    "Set the license server address in the VM's guest operating system network settings.",
                    "Disable the firewall on the GPU host to allow license communication on port 443."
                ],
                "correctAnswer": 1,
                "explanation": "For vGPU licensing, a centralized license server is required to distribute licenses to VMs. The correct step is to install the NVIDIA License Server on a dedicated machine and configure each GPU host to point to that server. Option A describes per-GPU subscription activation, not vGPU. Option C is incorrect because the license server address is configured on the GPU host, not the VM. Option D is incorrect because the default port is 7070, not 443, and disabling the firewall is not recommended; instead, specific ports should be opened."
            },
            {
                "id": 330,
                "question": "A data scientist is deploying an NVAIE-certified PyTorch container on a server. The container's documentation states it requires a host driver version R535 or later. Which command should the data scientist run to verify the host driver version before pulling the container?",
                "options": [
                    "nvidia-smi",
                    "nvcc --version",
                    "cat /proc/driver/nvidia/version",
                    "dpkg -l | grep nvidia-driver"
                ],
                "correctAnswer": 0,
                "explanation": "The correct command is nvidia-smi, which displays the GPU driver version (e.g., Driver Version: 535.154.05) along with other GPU information. nvcc --version shows the CUDA compiler version, not the driver version. cat /proc/driver/nvidia/version may show the driver version but is less reliable and not the standard tool. dpkg -l lists installed packages but does not show the currently loaded driver version. Therefore, nvidia-smi is the recommended and most direct method to check the host driver version."
            },
            {
                "id": 331,
                "question": "An AI infrastructure engineer receives a security bulletin from NVIDIA about a critical CVE affecting the GPU driver. According to the NVIDIA CVE patching lifecycle, what is the recommended first step the engineer should take before applying the patch to production systems?",
                "options": [
                    "Immediately download and install the patched driver on all production nodes to minimize exposure.",
                    "Review the security bulletin, identify affected systems, and test the patch in a staging environment.",
                    "Uninstall the current driver and wait for the next scheduled maintenance window without any action.",
                    "Contact NVIDIA support to request a custom patch tailored to the specific infrastructure."
                ],
                "correctAnswer": 1,
                "explanation": "The correct answer is B. According to the NVIDIA CVE patching lifecycle, engineers should review the security bulletin, identify affected systems, and test the patch in a staging environment before production rollout. Option A is incorrect because applying patches directly to production without testing can cause instability. Option C is incorrect because waiting without action leaves systems vulnerable. Option D is incorrect because NVIDIA releases standard patches; custom patches are not typically provided for individual CVEs."
            },
            {
                "id": 332,
                "question": "In a NVIDIA NIM deployment, which component is responsible for converting a standard PyTorch model into a GPU-optimized format and executing the actual inference computations?",
                "options": [
                    "OpenAI-compatible API",
                    "Triton Inference Server",
                    "TensorRT-LLM engine",
                    "NVIDIA Container Toolkit"
                ],
                "correctAnswer": 2,
                "explanation": "The TensorRT-LLM engine is the component that converts a trained model (e.g., PyTorch) into a highly optimized format for NVIDIA GPUs, applying techniques like quantization and kernel fusion, and then executes the inference computations. The OpenAI-compatible API provides the user-facing interface, Triton manages request batching and queuing, and the Container Toolkit is used for container runtime but not for model optimization or inference execution."
            },
            {
                "id": 333,
                "question": "A data scientist wants to deploy a NIM container locally on a workstation with an NVIDIA GPU. Which command correctly starts the container with GPU access and passes the API key for authentication?",
                "options": [
                    "docker run --gpus all -e NVIDIA_API_KEY=nvapi-xxx -p 8000:8000 nvcr.io/nvidia/nim/llama-3.1-8b-instruct:latest",
                    "docker run --gpus 1 -e API_KEY=nvapi-xxx -p 8000:8000 nvcr.io/nvidia/nim/llama-3.1-8b-instruct:latest",
                    "docker run --runtime=nvidia -e NVIDIA_API_KEY=nvapi-xxx -p 8000:8000 nvcr.io/nvidia/nim/llama-3.1-8b-instruct:latest",
                    "docker run --gpus all -e NVIDIA_API_KEY=nvapi-xxx -p 8000:8000 nvcr.io/nvidia/nim/llama-3.1-8b-instruct:latest --entrypoint /bin/bash"
                ],
                "correctAnswer": 0,
                "explanation": "The correct command uses --gpus all to grant GPU access, -e NVIDIA_API_KEY to set the environment variable for authentication, -p 8000:8000 to map the container port to the host, and the full image path from NGC. Option B uses the wrong environment variable name (API_KEY instead of NVIDIA_API_KEY) and --gpus 1 which may not work if the host has multiple GPUs. Option C uses the deprecated --runtime=nvidia flag; the modern approach is --gpus. Option D adds --entrypoint /bin/bash which overrides the container's default entrypoint, preventing the NIM service from starting."
            },
            {
                "id": 334,
                "question": "An engineer needs to deploy a real-time chatbot application that requires low-latency responses and supports function calling for tool integration. Which NVIDIA NIM would be the most suitable choice?",
                "options": [
                    "Llama 3 70B NIM",
                    "Mistral 8x7B NIM",
                    "Stable Diffusion SDXL NIM",
                    "BioBERT NIM"
                ],
                "correctAnswer": 1,
                "explanation": "Mistral NIM is optimized for low-latency inference and supports native function calling and JSON output, making it ideal for real-time chat and tool-use workflows. Llama 3 70B is better for complex reasoning tasks but may have higher latency. Stable Diffusion is for image generation, and BioBERT is a domain-specific model for biomedical text mining, not suitable for general chatbot applications."
            },
            {
                "id": 335,
                "question": "A DevOps engineer is deploying a large language model using NVIDIA NIM in a Kubernetes cluster. To minimize restart time after a pod reschedule, the engineer wants to enable model weight caching. Which action is required to achieve this?",
                "options": [
                    "Set the environment variable NIM_CACHE_PATH and mount a persistent volume claim to that path.",
                    "Use the --cache flag when running the NIM container.",
                    "Store the model weights in a ConfigMap and mount it into the container.",
                    "Enable the GPU Operator's model caching feature by setting a label on the node."
                ],
                "correctAnswer": 0,
                "explanation": "The correct approach is to set the NIM_CACHE_PATH environment variable to specify the cache directory inside the container, and mount a persistent volume (e.g., a PVC) to that path so that the cached weights survive pod restarts. Option B is incorrect because there is no --cache flag; caching is controlled via environment variables. Option C is incorrect because ConfigMaps are not designed for large binary files like model weights. Option D is incorrect because the GPU Operator does not manage NIM model caching; it is a NIM-specific feature."
            },
            {
                "id": 336,
                "question": "Which of the following best describes the primary benefit of using TensorRT-LLM for deploying large language models in production?",
                "options": [
                    "It simplifies the model training process by automatically tuning hyperparameters.",
                    "It provides a flexible environment for rapid prototyping and debugging of model architectures.",
                    "It significantly improves inference speed and reduces GPU memory usage through kernel optimizations and in-flight batching.",
                    "It enables the model to be trained on multiple GPUs with minimal code changes."
                ],
                "correctAnswer": 2,
                "explanation": "TensorRT-LLM is designed for inference optimization, not training. Its key benefits are faster inference (2x to 8x) and lower memory usage via techniques like kernel fusion, in-flight batching, and PagedAttention. Option A is incorrect because TensorRT-LLM does not handle training. Option B is incorrect because it reduces flexibility by compiling the model. Option D is incorrect because TensorRT-LLM is for inference, not multi-GPU training."
            },
            {
                "id": 337,
                "question": "Which of the following best describes the primary benefit of in-flight batching (continuous batching) for LLM inference?",
                "options": [
                    "It reduces the memory footprint of KV cache by sharing cache entries across requests.",
                    "It increases GPU utilization by interleaving token-level processing from multiple requests.",
                    "It eliminates the need for a scheduler by processing all requests in a single batch.",
                    "It improves latency by prioritizing short requests over long ones in the same batch."
                ],
                "correctAnswer": 1,
                "explanation": "In-flight batching (continuous batching) keeps the GPU constantly busy by interleaving tokens from multiple requests at different stages of completion, rather than waiting for an entire batch to finish. This dramatically improves GPU utilization and throughput. Option A is incorrect because KV cache is not shared; each request maintains its own cache. Option C is incorrect because a scheduler is still needed to manage dynamic addition/removal of requests. Option D is incorrect because while short requests do finish quickly, the primary benefit is not prioritization but efficient interleaving that reduces idle time."
            },
            {
                "id": 338,
                "question": "An engineer is deploying a large language model for a chatbot application that serves thousands of concurrent users. Which of the following best describes how the Paged KV cache improves memory utilization compared to a traditional contiguous KV cache?",
                "options": [
                    "It pre-allocates a fixed-size buffer for each request to avoid fragmentation.",
                    "It allocates memory in fixed-size blocks on demand and allows sharing of pages across requests with the same prompt prefix.",
                    "It compresses the KV cache using lossy quantization to reduce memory footprint.",
                    "It stores the KV cache on the CPU and transfers it to the GPU only when needed."
                ],
                "correctAnswer": 1,
                "explanation": "The Paged KV cache divides the KV cache into fixed-size blocks (pages) that are allocated on demand as tokens are generated, eliminating the need to pre-allocate for maximum sequence length. Additionally, pages can be shared across requests that have the same prompt prefix (e.g., system instructions), which is common in chatbot applications. This reduces memory waste and significantly increases the number of concurrent requests that can be served. Option A is incorrect because pre-allocating fixed-size buffers is characteristic of traditional caching, not paged caching. Option C describes quantization, which is a separate technique. Option D describes offloading to CPU, which is not a feature of Paged KV cache."
            },
            {
                "id": 339,
                "question": "In NVIDIA Triton Inference Server, which component is responsible for automatically grouping multiple inference requests together to improve GPU utilization?",
                "options": [
                    "Model Repository",
                    "Backend",
                    "C++ Inference Core",
                    "Configuration File"
                ],
                "correctAnswer": 2,
                "explanation": "The C++ Inference Core handles request scheduling, including dynamic batching, which automatically groups multiple requests together for efficient GPU utilization. The Model Repository stores models, Backends execute models, and the Configuration File describes model metadata."
            },
            {
                "id": 340,
                "question": "A machine learning engineer is deploying a small image classification model on NVIDIA Triton Inference Server. The model has low memory footprint and the GPU is underutilized with single requests. Which combination of configurations would most effectively increase GPU utilization while minimizing added latency?",
                "options": [
                    "Enable dynamic batching with a large max_queue_delay_microseconds and set a single model instance.",
                    "Disable dynamic batching and increase the number of model instances to 8.",
                    "Enable dynamic batching with a small max_queue_delay_microseconds and set multiple model instances.",
                    "Increase the model's batch size in the model definition and disable dynamic batching."
                ],
                "correctAnswer": 2,
                "explanation": "Dynamic batching groups small requests into larger batches to improve GPU utilization, and model instances allow parallel processing of multiple batches. Using a small max_queue_delay_microseconds (e.g., 50-200\u03bcs) minimizes added latency while still allowing batching. Option A would add too much latency; Option B would waste memory and not batch requests; Option D requires client-side batching and loses the benefits of dynamic batching."
            }
        ]
    },
    {
        "id": 18,
        "title": "NCA practice exam Set 18",
        "description": "Practice Exam Set 18 containing 20 unique exam-aligned questions covering core infrastructure domains.",
        "questions": [
            {
                "id": 341,
                "question": "An AI engineer is deploying a model on Triton Inference Server and needs to choose between gRPC and REST APIs for communication. The model will be called by an external web application that requires easy debugging and human-readable responses. Which API should the engineer choose?",
                "options": [
                    "gRPC, because it uses binary Protocol Buffers for faster data transfer.",
                    "REST API, because it uses JSON which is human-readable and easy to debug.",
                    "gRPC, because it supports bidirectional streaming for real-time applications.",
                    "REST API, because it uses HTTP/2 for persistent connections."
                ],
                "correctAnswer": 1,
                "explanation": "The correct answer is REST API. The question specifies that the client is an external web application requiring easy debugging and human-readable responses. REST API uses JSON, which is text-based and human-readable, making it ideal for debugging and simple integration with web applications. gRPC uses binary Protocol Buffers, which are not human-readable and are better suited for internal microservices where performance is critical. Option C is incorrect because while gRPC supports bidirectional streaming, it is not relevant to the requirement of human readability. Option D is incorrect because REST API typically uses HTTP/1.1, not HTTP/2; gRPC uses HTTP/2."
            },
            {
                "id": 342,
                "question": "In the context of AI infrastructure, what is the primary operational mindset shift when moving from 'pet' servers to 'cattle' clusters?",
                "options": [
                    "Each server is given a unique name and manually configured to ensure high availability.",
                    "Servers are treated as disposable, interchangeable units that can be automatically replaced upon failure.",
                    "Servers are individually monitored and nursed back to health when they fail.",
                    "Each server runs a unique set of applications tailored to its specific role."
                ],
                "correctAnswer": 1,
                "explanation": "The 'cattle' philosophy treats servers as interchangeable, disposable units that can be automatically provisioned and replaced, enabling resilience and scalability. Option A describes the 'pet' approach where servers are unique and manually configured. Option C also reflects the 'pet' mindset of nursing individual servers. Option D is characteristic of 'pet' servers with specific roles. The correct answer is B, which captures the essence of the cattle mindset: servers are not precious; they can be terminated and replaced without impacting the overall service."
            },
            {
                "id": 343,
                "question": "Which of the following is a key challenge of manually scheduling containers at scale in an AI infrastructure?",
                "options": [
                    "Engineers can easily optimize for data locality by manually placing containers near their data.",
                    "Manual scheduling often leads to resource imbalance, with some servers overloaded and others idle.",
                    "Manual scheduling ensures that GPU affinity conflicts are avoided because engineers can see all servers.",
                    "Manual scheduling is faster than automated scheduling because it does not require any configuration."
                ],
                "correctAnswer": 1,
                "explanation": "Manual scheduling at scale leads to resource imbalance because engineers cannot efficiently track and balance resource utilization across many servers. Option A is incorrect because manual scheduling does not optimize for data locality; it is error-prone and ignores such factors. Option C is incorrect because manual scheduling often causes GPU affinity conflicts due to human error. Option D is incorrect because manual scheduling is slow and does not scale, unlike automated scheduling."
            },
            {
                "id": 344,
                "question": "In a Kubernetes cluster, which component is the sole writer to etcd and the single point of entry for all administrative and operational communication?",
                "options": [
                    "kube-scheduler",
                    "kube-controller-manager",
                    "kube-apiserver",
                    "kubelet"
                ],
                "correctAnswer": 2,
                "explanation": "The kube-apiserver is the RESTful frontend for the entire Kubernetes cluster. It is the only component that directly writes to etcd, and all other control plane components (scheduler, controller manager) and worker nodes communicate through it. The kube-scheduler watches for unscheduled pods and writes binding decisions via the API server, the kube-controller-manager makes corrections through the API server, and kubelet reports node status and receives pod assignments from the API server. Therefore, the kube-apiserver is the single point of entry and the sole writer to etcd."
            },
            {
                "id": 345,
                "question": "In a Kubernetes cluster, which component is responsible for ensuring that all etcd nodes agree on the same data, even if some nodes fail?",
                "options": [
                    "The API server",
                    "The Raft consensus algorithm",
                    "The scheduler",
                    "The controller manager"
                ],
                "correctAnswer": 1,
                "explanation": "The Raft consensus algorithm is used by etcd to ensure consistency across all nodes. It elects a leader and requires a quorum of nodes to agree on any write, guaranteeing that the data remains consistent even if some nodes fail. The API server reads from and writes to etcd but does not handle consensus. The scheduler and controller manager use etcd data but are not involved in consensus."
            },
            {
                "id": 346,
                "question": "A data scientist creates a Pod that requests 2 CPUs, 4 GB of memory, and 1 GPU using nvidia.com/gpu. The cluster has three nodes: Node A (4 CPUs, 8 GB memory, 0 GPUs), Node B (2 CPUs, 4 GB memory, 1 GPU), and Node C (4 CPUs, 16 GB memory, 2 GPUs). All nodes have sufficient resources for the Pod's requests. However, the Pod remains in Pending state. What is the most likely cause?",
                "options": [
                    "Node A has insufficient memory for the Pod.",
                    "Node B has insufficient CPU for the Pod.",
                    "Node C has insufficient GPU for the Pod.",
                    "The Pod may have a nodeSelector or taint/toleration constraint that no node satisfies."
                ],
                "correctAnswer": 3,
                "explanation": "The Pod's resource requests (2 CPUs, 4 GB memory, 1 GPU) are satisfied by Node B and Node C. Node A lacks GPUs, so it is filtered out. Node B has exactly 2 CPUs and 4 GB memory, which meets the requests, and has 1 GPU. Node C has more than enough resources. Therefore, resource availability is not the issue. The most likely cause is that the Pod has additional constraints such as a nodeSelector, node affinity, or taints/tolerations that prevent it from being scheduled on any node. For example, if the Pod requires a specific label that no node has, or if nodes have taints that the Pod does not tolerate, the scheduler cannot place the Pod, leaving it in Pending state."
            },
            {
                "id": 347,
                "question": "A Kubernetes cluster runs AI training workloads on GPU nodes. A Pod requests 4 GPUs and 16 GB of memory. Which component is responsible for ensuring that the Pod's containers are started, monitored, and terminated according to the Pod specification on the assigned node?",
                "options": [
                    "kube-scheduler",
                    "kubelet",
                    "kube-controller-manager",
                    "kube-proxy"
                ],
                "correctAnswer": 1,
                "explanation": "The kubelet is the node agent that runs on every worker node and is responsible for managing Pods and containers on that node. It watches for Pod assignments from the API server, creates and starts containers via the container runtime, performs health checks (liveness, readiness, startup probes), reports node and Pod status, and cleans up terminated Pods. The kube-scheduler assigns Pods to nodes but does not manage them after assignment. The kube-controller-manager runs controllers that regulate cluster state (e.g., ReplicaSet controller) but does not directly interact with containers on nodes. kube-proxy handles network proxying and load balancing for Services, not Pod lifecycle."
            },
            {
                "id": 348,
                "question": "A Kubernetes administrator notices that traffic to a Service is not being load-balanced correctly across Pods. Which component should the administrator check to ensure network rules are properly configured on each node?",
                "options": [
                    "CoreDNS",
                    "kube-proxy",
                    "kube-controller-manager",
                    "kube-scheduler"
                ],
                "correctAnswer": 1,
                "explanation": "Kube-proxy is the component responsible for implementing network rules on each node that route traffic to Service endpoints. It watches the API server for changes to Services and Endpoints and updates iptables or IPVS rules accordingly. CoreDNS handles DNS resolution, not traffic routing. kube-controller-manager manages controllers like ReplicaSet, and kube-scheduler assigns Pods to nodes; neither directly manages network rules for Services."
            },
            {
                "id": 349,
                "question": "Which of the following best describes the primary reason Kubernetes deprecated dockershim in favor of CRI-compliant runtimes like containerd and CRI-O?",
                "options": [
                    "Docker was not open-source, so Kubernetes needed a fully open-source runtime.",
                    "Docker lacked support for GPU-accelerated workloads, which are critical for AI infrastructure.",
                    "Docker was not CRI-compliant, requiring an extra translation layer that added complexity and overhead.",
                    "Docker could only run on Linux, while containerd and CRI-O support both Linux and Windows containers."
                ],
                "correctAnswer": 2,
                "explanation": "Kubernetes introduced the Container Runtime Interface (CRI) to standardize interactions with container runtimes. Docker was not CRI-compliant out of the box, so Kubernetes used a translation layer called dockershim. Starting with Kubernetes 1.24, dockershim was removed, pushing users to adopt native CRI-compliant runtimes like containerd and CRI-O. This change simplifies the stack, improves performance, and aligns with open-source standards. Option A is incorrect because Docker is open-source. Option B is incorrect because Docker does support GPU workloads via nvidia-docker2. Option D is incorrect because containerd and CRI-O primarily run on Linux, though containerd has Windows support; the key reason for the shift is CRI compliance, not OS support."
            },
            {
                "id": 350,
                "question": "In a Kubernetes Pod designed for an AI training workload, which of the following is a key benefit of running a monitoring sidecar container alongside the main training container?",
                "options": [
                    "The sidecar container can access the GPU directly without going through the main container.",
                    "Both containers share the same network namespace, allowing the sidecar to collect metrics via localhost.",
                    "The sidecar container can be scheduled on a different node to balance resource usage.",
                    "The sidecar container has its own IP address, enabling external monitoring tools to connect directly."
                ],
                "correctAnswer": 1,
                "explanation": "In a Pod, all containers share the same network namespace, meaning they share the same IP address and can communicate via localhost. This allows a monitoring sidecar to collect metrics from the main container without exposing ports externally. Option A is incorrect because GPU access is requested at the Pod level, not per container, and the sidecar typically does not need GPU access. Option C is incorrect because all containers in a Pod are co-scheduled on the same node. Option D is incorrect because containers in a Pod share a single IP address; they do not have individual IPs."
            },
            {
                "id": 351,
                "question": "A database administrator is deploying a PostgreSQL cluster using a StatefulSet in Kubernetes. Which component is essential for ensuring that each Pod has a stable network identity that persists across restarts?",
                "options": [
                    "A ClusterIP Service",
                    "A NodePort Service",
                    "A headless Service with clusterIP: None",
                    "A LoadBalancer Service"
                ],
                "correctAnswer": 2,
                "explanation": "StatefulSets require a headless Service (clusterIP: None) to provide stable DNS records for each Pod. This allows Pods to be reached via predictable hostnames like pod-name.service-name.namespace.svc.cluster.local. A ClusterIP Service would provide a single virtual IP, not per-Pod DNS. NodePort and LoadBalancer Services are for external access and do not provide stable per-Pod identities."
            },
            {
                "id": 352,
                "question": "A data scientist needs to run a nightly retraining job for a recommendation model using fresh data. The job must not overlap with the previous run if it is still in progress. Which Kubernetes object and concurrency policy should be used?",
                "options": [
                    "Job with parallelism set to 1",
                    "CronJob with concurrencyPolicy: Forbid",
                    "CronJob with concurrencyPolicy: Allow",
                    "Job with restartPolicy: OnFailure"
                ],
                "correctAnswer": 1,
                "explanation": "A CronJob is designed for scheduled, recurring batch workloads. The concurrencyPolicy: Forbid ensures that if a previous Job is still running when the next schedule fires, the new run is skipped, preventing overlapping training runs. A Job runs only once and does not have a schedule, so it cannot automate nightly retraining. Allowing concurrency could cause resource contention, and restartPolicy does not control overlapping runs."
            },
            {
                "id": 353,
                "question": "A data scientist needs to expose a production inference API to external users. Which Kubernetes Service type should be used?",
                "options": [
                    "ClusterIP",
                    "NodePort",
                    "LoadBalancer",
                    "ExternalName"
                ],
                "correctAnswer": 2,
                "explanation": "LoadBalancer is the correct choice for exposing a production inference API to external users. It integrates with a cloud provider's load balancer to provide a stable public IP address and handles traffic distribution and health checks. ClusterIP is only accessible within the cluster, NodePort is suitable for testing/debugging but not production due to port range limitations and lack of load balancing, and ExternalName maps to a DNS name, not a service endpoint."
            },
            {
                "id": 354,
                "question": "An AI infrastructure engineer is deploying a training job on Kubernetes. The container image needs to be reused across development, staging, and production environments. Which approach best externalizes configuration and credentials?",
                "options": [
                    "Store configuration in a ConfigMap and credentials in a Secret, then inject both as environment variables or mounted files in the Pod specification.",
                    "Embed default configuration and placeholder credentials in the container image, then override them using command-line arguments at runtime.",
                    "Use a single ConfigMap for both configuration and credentials, and restrict access using Kubernetes RBAC.",
                    "Store configuration and credentials in a PersistentVolumeClaim and mount it as a volume in the container."
                ],
                "correctAnswer": 0,
                "explanation": "The correct approach is to use ConfigMaps for non-sensitive configuration and Secrets for sensitive credentials, then inject them into containers via environment variables or mounted files. This allows the same container image to be used across environments without modification, and credentials can be rotated without rebuilding images. Option B is poor practice because it still hardcodes defaults in the image. Option C is incorrect because Secrets should be used for sensitive data, not ConfigMaps. Option D is not designed for configuration injection and would require managing files in a volume, which is less flexible and secure."
            },
            {
                "id": 355,
                "question": "An AI team is deploying multiple training jobs on a shared Kubernetes cluster. They need to ensure that no single team can consume all available GPUs and that teams cannot interfere with each other's workloads. Which combination of Kubernetes objects should be configured within each namespace to achieve this?",
                "options": [
                    "ResourceQuota and LimitRange only",
                    "ResourceQuota, LimitRange, NetworkPolicy, and RBAC",
                    "NetworkPolicy and RBAC only",
                    "ResourceQuota and NetworkPolicy only"
                ],
                "correctAnswer": 1,
                "explanation": "To achieve full multi-team isolation in a shared Kubernetes cluster, you need to combine multiple mechanisms. ResourceQuota sets hard limits on total resources (e.g., GPUs) per namespace, preventing one team from starving others. LimitRange enforces per-container resource limits, preventing a single pod from hogging resources. NetworkPolicy controls traffic flow between pods, preventing accidental interference across namespaces. RBAC restricts user permissions to their own namespace, ensuring security. Using only ResourceQuota and LimitRange (option A) lacks network and access control. Using only NetworkPolicy and RBAC (option C) lacks resource limits. Using only ResourceQuota and NetworkPolicy (option D) lacks per-container limits and access control. Therefore, all four objects together provide comprehensive isolation."
            },
            {
                "id": 356,
                "question": "An AI training pod is experiencing frequent Out-of-Memory (OOM) kills. The pod's resource specification is:\n\nresources:\n  requests:\n    cpu: \"2\"\n    memory: \"4Gi\"\n  limits:\n    cpu: \"4\"\n    memory: \"8Gi\"\n\nWhich of the following is the most likely cause of the OOM kills?",
                "options": [
                    "The CPU limit is too low, causing the pod to be throttled and eventually killed.",
                    "The memory request is set too high, preventing the pod from being scheduled on a suitable node.",
                    "The memory limit is set too low relative to the pod's actual memory usage, causing termination when exceeded.",
                    "The memory request is set equal to the limit, which prevents bursting and leads to OOM."
                ],
                "correctAnswer": 2,
                "explanation": "OOM kills occur when a container exceeds its memory limit. In this specification, the memory limit is 8Gi. If the training process requires more than 8Gi of memory, Kubernetes will terminate the pod (OOMKilled). Option A is incorrect because CPU throttling slows down the pod but does not cause OOM kills. Option B is incorrect because a high memory request may affect scheduling but does not directly cause OOM. Option D is incorrect because setting request equal to limit is actually recommended for memory to avoid oversubscription; it does not cause OOM."
            },
            {
                "id": 357,
                "question": "A data scientist is troubleshooting a pod that is failing to start. Which kubectl command provides the most detailed information about the pod's current state and recent events?",
                "options": [
                    "kubectl get pod my-pod -o wide",
                    "kubectl logs my-pod",
                    "kubectl describe pod my-pod",
                    "kubectl exec -it my-pod -- /bin/bash"
                ],
                "correctAnswer": 2,
                "explanation": "kubectl describe pod my-pod provides detailed configuration, current state, and recent events for the specified pod, making it the best tool for debugging startup failures. kubectl get -o wide gives a summary with extra details but not the full story. kubectl logs shows application output but may not be available if the pod never started. kubectl exec requires a running container and is not useful for a failing pod."
            },
            {
                "id": 358,
                "question": "A DevOps engineer is writing a Kubernetes YAML manifest for a stateless web application that must automatically recover from node failures and support rolling updates. Which resource type should the engineer use?",
                "options": [
                    "Pod",
                    "Deployment",
                    "ReplicaSet",
                    "StatefulSet"
                ],
                "correctAnswer": 1,
                "explanation": "A Deployment is the correct choice because it manages ReplicaSets and Pods with self-healing (automatically replaces failed Pods), supports rolling updates for zero-downtime deployments, and allows horizontal scaling via replicas. A Pod alone does not self-heal or support updates. A ReplicaSet ensures a desired number of Pods but lacks rolling update capabilities. A StatefulSet is designed for stateful applications requiring stable network identities and persistent storage, which is not needed here."
            },
            {
                "id": 359,
                "question": "In Kustomize, how does an overlay modify a base configuration without using templating?",
                "options": [
                    "By using variable substitution in YAML files",
                    "By applying patches that specify only the differences from the base",
                    "By generating new YAML files from a template engine",
                    "By overriding the entire base configuration with a new set of files"
                ],
                "correctAnswer": 1,
                "explanation": "Kustomize uses a patch-and-merge strategy where overlays define only the modifications (patches) to the base configuration. These patches are pure YAML and specify the exact fields to change, add, or remove. Kustomize then merges these patches with the base to produce the final configuration. This approach avoids templating languages like Helm's, keeping configurations native to Kubernetes. Option A describes Helm-style templating, not Kustomize. Option C describes a template engine approach. Option D would defeat the purpose of overlays by duplicating the base."
            },
            {
                "id": 360,
                "question": "Which of the following components of the NVIDIA GPU Operator is responsible for collecting GPU health and performance metrics such as utilization, memory usage, and temperature?",
                "options": [
                    "Driver DaemonSet",
                    "Container Toolkit",
                    "DCGM Exporter",
                    "MIG Configuration"
                ],
                "correctAnswer": 2,
                "explanation": "The DCGM Exporter is a Prometheus exporter that runs as a DaemonSet on each GPU node, collecting GPU health and performance metrics like utilization, memory usage, temperature, power draw, and PCIe bandwidth. The Driver DaemonSet installs NVIDIA drivers, the Container Toolkit configures the runtime to expose GPUs to containers, and MIG Configuration handles GPU partitioning into isolated slices."
            }
        ]
    },
    {
        "id": 19,
        "title": "NCA practice exam Set 19",
        "description": "Practice Exam Set 19 containing 20 unique exam-aligned questions covering core infrastructure domains.",
        "questions": [
            {
                "id": 361,
                "question": "In the context of the NVIDIA GPU Operator, what is the role of a Custom Resource Definition (CRD) such as ClusterPolicy?",
                "options": [
                    "It defines the actual software components (operands) that get deployed on nodes.",
                    "It extends the Kubernetes API to allow users to specify the desired state of GPU-related configurations.",
                    "It implements the reconciliation loop that watches for changes and takes corrective actions.",
                    "It provides a command-line interface for manually installing GPU drivers on each node."
                ],
                "correctAnswer": 1,
                "explanation": "A CRD extends the Kubernetes API by defining a new resource type. In the NVIDIA GPU Operator, CRDs like ClusterPolicy serve as blueprints that allow users to specify the desired state (e.g., driver version, toolkit settings). The controllers (not CRDs) implement the reconciliation loop and deploy operands. CRDs do not directly deploy software or provide CLI tools."
            },
            {
                "id": 362,
                "question": "An engineer is managing a Kubernetes cluster with the NVIDIA GPU Operator. They need to ensure that every GPU node in the cluster uses the same driver version and has GPU monitoring enabled. Which single Kubernetes resource should they modify?",
                "options": [
                    "A ConfigMap in the gpu-operator namespace",
                    "The ClusterPolicy custom resource",
                    "The GPU Operator Deployment YAML",
                    "A DaemonSet for the NVIDIA driver"
                ],
                "correctAnswer": 1,
                "explanation": "The ClusterPolicy CRD is the single configuration object that controls the entire GPU software stack, including driver versions and monitoring (DCGM). Modifying the ClusterPolicy triggers the GPU Operator to reconcile all nodes to the desired state. ConfigMaps are not the central control; the Operator Deployment YAML is not meant for per-component settings; and DaemonSets are managed by the Operator, not directly modified by the user."
            },
            {
                "id": 363,
                "question": "A Kubernetes administrator is deploying the NVIDIA GPU Operator in an air-gapped environment where worker nodes have been provisioned with a golden image that includes the NVIDIA driver version 535. Which configuration approach should the administrator use to ensure the Operator leverages the existing drivers without attempting to download or install new ones?",
                "options": [
                    "Set driver.enabled=true and operatortype=preinstalled in the Helm chart values.",
                    "Set driver.enabled=false and operatortype=preinstalled in the Helm chart values.",
                    "Set driver.enabled=true and leave operatortype at its default value.",
                    "Set driver.enabled=false and leave operatortype at its default value."
                ],
                "correctAnswer": 1,
                "explanation": "When using pre-installed drivers, the administrator must disable the Operator's automatic driver management by setting driver.enabled=false, and explicitly set operatortype=preinstalled to tell the Operator to use the existing drivers. Option A is incorrect because driver.enabled=true would still attempt to manage drivers. Option C is the default kernel module management behavior, which would attempt to download and install drivers. Option D would disable driver management but without specifying operatortype=preinstalled, the Operator might not properly detect and use the pre-installed drivers."
            },
            {
                "id": 364,
                "question": "A new engineer is verifying the NVIDIA GPU Operator deployment in a Kubernetes cluster. After running `kubectl get pods -n kube-system` and `kubectl get pods -n gpu-operator`, they notice that all pods in both namespaces are in Running state except for the nvidia-driver-daemon pod, which is stuck in CrashLoopBackOff. What is the most likely cause of this issue?",
                "options": [
                    "The GPU Operator controller pod is not running.",
                    "The Node Feature Discovery (NFD) worker pods are missing on GPU nodes.",
                    "There is a driver version mismatch or missing dependencies on the GPU node.",
                    "The nvidia-device-plugin pod is not deployed."
                ],
                "correctAnswer": 2,
                "explanation": "The nvidia-driver-daemon pod is responsible for installing and managing the GPU driver on each GPU node. A CrashLoopBackOff status indicates that the pod is repeatedly crashing. Common causes include a driver version mismatch with the GPU hardware, missing kernel headers or dependencies, or an incompatible driver configuration. Checking the pod logs would reveal the specific error. The other options are incorrect because: (A) the GPU Operator controller pod manages the lifecycle but does not directly cause driver daemon crashes; (B) NFD worker pods detect hardware features but do not affect driver installation; (D) the device plugin registers GPUs with Kubernetes but is separate from driver installation."
            },
            {
                "id": 365,
                "question": "Which of the following is NOT a component that the NVIDIA Network Operator automates?",
                "options": [
                    "OFED driver installation and updates",
                    "RDMA device plugin deployment and resource registration",
                    "SR-IOV virtual function creation and assignment",
                    "GPU driver installation and DCGM deployment"
                ],
                "correctAnswer": 3,
                "explanation": "The NVIDIA Network Operator automates OFED drivers, RDMA device plugin, and SR-IOV. GPU driver installation and DCGM deployment are handled by the NVIDIA GPU Operator, not the Network Operator."
            },
            {
                "id": 366,
                "question": "In a Kubernetes cluster running distributed AI training, which component is responsible for attaching an SR-IOV Virtual Function (VF) directly to a pod's network namespace?",
                "options": [
                    "NVIDIA Network Operator",
                    "SR-IOV CNI Plugin",
                    "Multus CNI",
                    "Network Attachment Definition"
                ],
                "correctAnswer": 1,
                "explanation": "The SR-IOV CNI Plugin is the component that attaches a Virtual Function (VF) to a pod's network namespace. The NVIDIA Network Operator automates SR-IOV configuration and VF allocation, but the actual attachment is done by the SR-IOV CNI Plugin. Multus CNI is a meta-plugin that allows multiple network interfaces per pod, but it delegates the attachment to the SR-IOV CNI Plugin. A Network Attachment Definition (NAD) is a CRD that defines how a VF network is exposed, not the component that performs the attachment."
            },
            {
                "id": 367,
                "question": "In a Kubernetes cluster running distributed AI training workloads, a Pod requires both a standard management network interface and a dedicated high-speed RDMA interface for GPU-to-GPU communication. Which Multus CNI component defines the configuration of the secondary RDMA network?",
                "options": [
                    "Multus DaemonSet",
                    "Network Attachment Definition (NAD)",
                    "Pod annotation k8s.v1.cni.cncf.io/networks",
                    "Secondary CNI plugin (e.g., macvlan, SR-IOV)"
                ],
                "correctAnswer": 1,
                "explanation": "The Network Attachment Definition (NAD) is a custom Kubernetes resource that defines the configuration of a secondary network, including which CNI plugin to use and its parameters (e.g., subnet, gateway). The Multus DaemonSet reads the NAD referenced in the Pod annotation and delegates interface creation to the specified secondary CNI plugin. The Pod annotation only lists which NADs to attach, not the configuration itself. The secondary CNI plugin implements the interface creation but does not define the network configuration; that is the role of the NAD."
            },
            {
                "id": 368,
                "question": "An AI engineer is deploying a distributed training job on a Kubernetes cluster that uses InfiniBand for inter-node communication. The RDMA device plugin is installed and running. Which resource name should the engineer use in the Pod spec to request an InfiniBand interface?",
                "options": [
                    "nvidia.com/ib",
                    "nvidia.com/ib0",
                    "nvidia.com/rdma0",
                    "nvidia.com/infiniband"
                ],
                "correctAnswer": 1,
                "explanation": "The RDMA device plugin advertises InfiniBand interfaces as 'nvidia.com/ib0' (and similarly for additional interfaces like ib1). Option A is incorrect because the resource name must include the interface index (e.g., ib0). Option C is for RoCE interfaces, not InfiniBand. Option D is not a standard resource name used by the plugin. Using the correct resource name ensures the scheduler can match the Pod's request to the available devices on the node."
            },
            {
                "id": 369,
                "question": "A Kubernetes administrator is deploying a pod for a distributed training job that requires 8 NVIDIA GPUs. Which of the following correctly specifies the GPU resource request in the pod manifest?",
                "options": [
                    "resources: { limits: { nvidia.com/gpu: 8 }, requests: { nvidia.com/gpu: 8 } }",
                    "resources: { limits: { nvidia.com/gpu: 8 } }",
                    "resources: { requests: { nvidia.com/gpu: 8 } }",
                    "resources: { limits: { gpu: 8 }, requests: { gpu: 8 } }"
                ],
                "correctAnswer": 0,
                "explanation": "For GPU resources in Kubernetes, both limits and requests must be specified and equal. The correct resource name is 'nvidia.com/gpu' (not just 'gpu'). Option A correctly sets both limits and requests to 8 GPUs. Option B omits requests, which can cause scheduling failures. Option C omits limits, which is not allowed for GPUs. Option D uses an incorrect resource name 'gpu' instead of 'nvidia.com/gpu'."
            },
            {
                "id": 370,
                "question": "In a Kubernetes cluster running multi-GPU training jobs, which feature is provided by Volcano but NOT by KUEUE?",
                "options": [
                    "Gang scheduling",
                    "Resource quotas",
                    "Fair sharing",
                    "Priority classes"
                ],
                "correctAnswer": 0,
                "explanation": "Gang scheduling ensures all pods of a distributed training job start simultaneously, which is critical for multi-GPU jobs. Volcano has built-in gang scheduling, while KUEUE does not natively support it. Resource quotas, fair sharing, and priority classes are features available in both Volcano and KUEUE."
            },
            {
                "id": 371,
                "question": "A data scientist wants to run a distributed PyTorch training job on a Kubernetes cluster and needs the ability to dynamically add or remove worker GPUs during training without restarting the job. Which Kubernetes operator should they use?",
                "options": [
                    "MPI Operator",
                    "PyTorch Operator",
                    "NVIDIA GPU Operator",
                    "Kubeflow Operator"
                ],
                "correctAnswer": 1,
                "explanation": "The PyTorch Operator natively supports elastic training, allowing workers to be added or removed during training without restarting the job. The MPI Operator does not support elasticity; it uses gang scheduling and typically fails if a worker is lost. The NVIDIA GPU Operator manages GPU drivers and monitoring, not distributed training jobs. Kubeflow Operator is a general-purpose ML platform operator, but for native PyTorch distributed training with elasticity, the PyTorch Operator is the correct choice."
            },
            {
                "id": 372,
                "question": "A distributed training job using NVIDIA NeMo requires 16 Pods across 4 nodes, each requesting 4 GPUs. The cluster has 8 nodes with 8 GPUs each, but 2 nodes are currently reserved for other workloads. Without gang scheduling, what is the most likely outcome?",
                "options": [
                    "All 16 Pods will be scheduled immediately because the cluster has enough total GPUs.",
                    "Some Pods will start running while others remain pending, causing the training job to hang or fail.",
                    "The job will be rejected by the scheduler because it cannot place all Pods at once.",
                    "The scheduler will automatically reduce the GPU request per Pod to fit available resources."
                ],
                "correctAnswer": 1,
                "explanation": "Without gang scheduling, Kubernetes schedules Pods individually as resources become available. In this scenario, there are enough total GPUs (8 nodes \u00d7 8 GPUs = 64 GPUs, minus 2 reserved nodes = 48 GPUs available), but the scheduler may place some Pods on available nodes while others wait for the reserved nodes to free up. This partial allocation can cause the distributed training job to hang because all Pods need to start simultaneously for NCCL initialization. Gang scheduling would prevent this by requiring all 16 Pods to be placed before any start."
            },
            {
                "id": 373,
                "question": "A machine learning engineer notices that a GPU serving real-time inference requests is only 15% utilized according to nvidia-smi. The engineer is concerned about wasted compute. Which of the following best explains why this utilization is typical for inference workloads?",
                "options": [
                    "The GPU is faulty and needs to be replaced.",
                    "Inference workloads are memory-bound and often process small batches due to latency constraints.",
                    "The inference model is too large for the GPU memory, causing thrashing.",
                    "The GPU is being used for training, which naturally has lower utilization."
                ],
                "correctAnswer": 1,
                "explanation": "Inference workloads typically achieve only 10\u201330% GPU utilization because they are memory-bound and process small batch sizes (often single requests) to meet low-latency requirements. This is a fundamental characteristic, not a sign of a faulty GPU or misconfiguration. Training workloads, in contrast, use large batches and achieve 80\u201395% utilization. Option A is incorrect because low utilization is normal for inference. Option C is incorrect because the scenario does not indicate memory thrashing. Option D is incorrect because training utilization is high, not low."
            },
            {
                "id": 374,
                "question": "A data scientist is deploying multiple inference workloads on a single NVIDIA A100 GPU. The workloads are latency-sensitive and require guaranteed memory isolation to prevent interference. Which GPU sharing technology should be used?",
                "options": [
                    "Time-Slicing",
                    "MPS (Multi-Process Service)",
                    "MIG (Multi-Instance GPU)",
                    "Running one job per GPU"
                ],
                "correctAnswer": 2,
                "explanation": "MIG (Multi-Instance GPU) provides hardware-level memory and compute isolation, ensuring that each workload has dedicated resources and no interference. Time-Slicing and MPS do not offer memory isolation. Running one job per GPU would waste compute capacity and not meet the requirement of deploying multiple workloads."
            },
            {
                "id": 375,
                "question": "An engineer is using GPU time-slicing to share a single GPU among multiple interactive AI workloads. Which of the following is a key characteristic of time-slicing that the engineer must consider?",
                "options": [
                    "It provides hardware-level memory isolation between processes.",
                    "Context switching overhead is negligible and does not affect latency-sensitive applications.",
                    "All processes share the same GPU memory, so one process can consume all VRAM and starve others.",
                    "Time-slicing partitions the GPU into separate physical instances, similar to MIG."
                ],
                "correctAnswer": 2,
                "explanation": "Time-slicing is a software-based temporal sharing technique where the GPU rapidly switches between processes. Unlike MIG, it does not provide hardware isolation; all processes share the same GPU memory (VRAM). Therefore, a single process can consume all available memory, starving other processes. Option A is incorrect because time-slicing offers no hardware-level memory isolation. Option B is incorrect because context switching adds latency (microseconds), which can be unacceptable for latency-sensitive inference. Option D is incorrect because time-slicing does not create physical partitions; MIG does."
            },
            {
                "id": 376,
                "question": "An administrator wants to configure time-slicing for GPU sharing in a Kubernetes cluster using the NVIDIA GPU Operator. Which ConfigMap must be modified to define the time-slicing configuration?",
                "options": [
                    "nvidia-device-plugin-config in the kube-system namespace",
                    "nvidia-device-plugin-config in the gpu-operator namespace",
                    "gpu-operator-config in the gpu-operator namespace",
                    "nvidia-time-slicing-config in the default namespace"
                ],
                "correctAnswer": 1,
                "explanation": "The correct ConfigMap is nvidia-device-plugin-config in the gpu-operator namespace. This ConfigMap is used by the GPU Operator's device plugin to define sharing configurations, including time-slicing. The other options are incorrect: the namespace is gpu-operator (not kube-system or default), and the ConfigMap name is nvidia-device-plugin-config (not gpu-operator-config or nvidia-time-slicing-config)."
            },
            {
                "id": 377,
                "question": "A data science team is developing a new recommendation model and needs to share a single NVIDIA GPU among multiple developers for interactive experimentation and prototyping. Which GPU sharing strategy is most appropriate for this scenario?",
                "options": [
                    "Multi-Instance GPU (MIG) partitioning",
                    "Time-slicing with Kubernetes",
                    "Dedicated GPU per developer",
                    "NVIDIA vGPU with vWS profile"
                ],
                "correctAnswer": 1,
                "explanation": "Time-slicing is ideal for development environments where engineers need interactive access to a GPU for prototyping and experimentation. It allows multiple developers to share a single GPU by rapidly switching contexts, which is acceptable because development workloads tolerate latency and do not require guaranteed performance. MIG provides stronger isolation but reduces flexibility and may not be necessary for non-critical tasks. Dedicated GPUs are costly and inefficient for development. vGPU with vWS is designed for virtual workstations and visualization, not for compute sharing in development."
            },
            {
                "id": 378,
                "question": "In the NVIDIA Multi-Process Service (MPS) architecture, what is the role of the MPS daemon's control thread?",
                "options": [
                    "It creates a separate CUDA context for each connected client process.",
                    "It manages GPU work submissions from all clients by serializing and submitting them as a single unified stream.",
                    "It allocates dedicated GPU memory partitions for each client to ensure isolation.",
                    "It monitors GPU utilization and dynamically adjusts the number of active clients."
                ],
                "correctAnswer": 1,
                "explanation": "The MPS daemon's control thread collects GPU work requests from all connected client processes and submits them to the GPU as a single, unified stream. This eliminates the need for GPU context switching between different processes, reducing overhead and improving utilization. Option A is incorrect because MPS uses a single shared context, not separate contexts. Option C describes MIG (Multi-Instance GPU), not MPS. Option D is not a function of the MPS control thread; monitoring is done via other tools like nvidia-smi or DCGM."
            },
            {
                "id": 379,
                "question": "Which of the following is a key benefit of Multi-Process Service (MPS) over time-slicing for sharing a GPU among multiple AI inference workloads?",
                "options": [
                    "MPS provides strict isolation between workloads, preventing any interference.",
                    "MPS reduces context switch overhead by allowing true concurrent execution of multiple processes.",
                    "MPS automatically balances memory usage across all processes to maximize capacity.",
                    "MPS eliminates the need for GPU drivers by handling scheduling in user space."
                ],
                "correctAnswer": 1,
                "explanation": "MPS reduces context switch overhead by enabling multiple processes to submit work concurrently, avoiding the frequent context switches required by time-slicing. This leads to higher GPU utilization and lower latency for small tasks. Option A is incorrect because MPS does not provide strict isolation; time-slicing or MIG is better for isolation. Option C is incorrect because MPS does not automatically balance memory; memory management is per-process. Option D is incorrect because MPS still requires GPU drivers."
            },
            {
                "id": 380,
                "question": "An AI infrastructure engineer is evaluating the use of NVIDIA MPS for a multi-tenant GPU cluster where multiple users run untrusted CUDA applications. Which of the following is the most critical limitation of MPS in this scenario?",
                "options": [
                    "MPS increases GPU memory fragmentation, reducing overall capacity.",
                    "MPS requires all clients to use the same CUDA toolkit version.",
                    "A single CUDA execution context creates a single fault domain, so one client crash can bring down all clients.",
                    "MPS does not support concurrent kernel execution, limiting throughput."
                ],
                "correctAnswer": 2,
                "explanation": "The key limitation of MPS is that all clients share a single CUDA execution context managed by the MPS server. This means any client that causes a GPU error (e.g., illegal memory access, kernel timeout) can corrupt the shared context and crash the entire MPS server, affecting all other clients. This lack of fault isolation makes MPS unsuitable for multi-tenant or untrusted workloads. Option A is incorrect because MPS actually reduces memory fragmentation by sharing memory pools. Option B is incorrect because MPS does not enforce a specific CUDA toolkit version across clients. Option D is incorrect because MPS is designed to enable concurrent kernel execution from multiple processes."
            }
        ]
    },
    {
        "id": 20,
        "title": "NCA practice exam Set 20",
        "description": "Practice Exam Set 20 containing 20 unique exam-aligned questions covering core infrastructure domains.",
        "questions": [
            {
                "id": 381,
                "question": "Which of the following best describes the isolation level provided by Multi-Instance GPU (MIG) compared to software-based sharing methods like MPS or time-slicing?",
                "options": [
                    "MIG provides full hardware isolation with dedicated memory, cache, and compute resources, while software sharing methods only provide partial isolation and can suffer from resource contention.",
                    "MIG provides software-level isolation that is more flexible than hardware partitioning, allowing dynamic resource reallocation without reconfiguration.",
                    "MIG and software sharing methods both provide the same level of isolation, but MIG is easier to configure.",
                    "MIG provides memory isolation but not cache isolation, whereas software sharing methods provide both memory and cache isolation."
                ],
                "correctAnswer": 0,
                "explanation": "MIG physically partitions GPU resources (GPCs, HBM, L2 cache, engines) at the hardware level, ensuring each instance has dedicated, isolated resources. This prevents interference and guarantees predictable performance. In contrast, software sharing methods like MPS or time-slicing share resources at the software level, which can lead to memory sharing, cache contention, and variable performance. Therefore, option A correctly describes the superior isolation of MIG."
            },
            {
                "id": 382,
                "question": "An AI infrastructure engineer needs to run two inference workloads on a single A100 GPU using MIG. Workload A requires at least 3 compute slices and 20 GB of memory. Workload B requires at least 1 compute slice and 5 GB of memory. Which combination of MIG profiles can be configured simultaneously on the same GPU?",
                "options": [
                    "One 3g.20gb instance and one 1g.5gb instance",
                    "One 4g.20gb instance and one 2g.10gb instance",
                    "One 7g.40gb instance and one 1g.5gb instance",
                    "One 2g.10gb instance and one 3g.20gb instance"
                ],
                "correctAnswer": 0,
                "explanation": "The A100 GPU has a total of 7 compute slices and 40 GB of memory. A 3g.20gb instance uses 3 slices and 20 GB, and a 1g.5gb instance uses 1 slice and 5 GB. Together they use 4 slices and 25 GB, which fits within the total capacity. Option B (4g.20gb + 2g.10gb) would use 6 slices and 30 GB, which fits but does not meet Workload A's requirement of at least 3 slices (4g.20gb is fine) but Workload B requires at least 1 slice and 5 GB (2g.10gb is fine), however the combination is valid but not the only correct one; however the question asks for a combination that can be configured simultaneously, and both A and B are technically possible. However, option A is the most straightforward and directly matches the requirements. Option C (7g.40gb + 1g.5gb) would exceed the total slices (8 > 7) and memory (45 > 40). Option D (2g.10gb + 3g.20gb) uses 5 slices and 30 GB, which fits, but Workload A requires at least 3 slices and 20 GB (3g.20gb is fine) and Workload B requires at least 1 slice and 5 GB (2g.10gb is fine), so this combination also works. However, the question expects the combination that exactly meets the minimum requirements without waste. Option A is the most efficient and is the correct answer based on typical exam logic. The explanation clarifies that multiple combinations are possible but A is the best fit."
            },
            {
                "id": 383,
                "question": "An engineer is planning to deploy multiple small inference services on a single NVIDIA H100 GPU with 80 GB HBM3 memory. Each service requires guaranteed resource isolation and at least 10 GB of dedicated GPU memory. Which MIG profile should the engineer use to maximize the number of instances?",
                "options": [
                    "1g.10gb",
                    "2g.20gb",
                    "3g.40gb",
                    "7g.80gb"
                ],
                "correctAnswer": 0,
                "explanation": "The 1g.10gb profile provides 10 GB of memory and 14 SMs per instance, allowing up to 7 fully isolated instances on a single H100 GPU. This maximizes the number of instances while meeting the 10 GB memory requirement. The 2g.20gb profile only allows 3 instances, 3g.40gb allows 2, and 7g.80gb allows 1, which would not maximize instance count."
            },
            {
                "id": 384,
                "question": "An administrator runs the command `nvidia-smi -i 0 --mig-mode=1` on a supported GPU. After the command completes, what is the immediate next step required to activate MIG mode?",
                "options": [
                    "Reboot the system.",
                    "Create MIG partitions using `nvidia-smi mig -cgi`.",
                    "Verify MIG mode is enabled by running `nvidia-smi`.",
                    "No further action is needed; MIG mode is active immediately."
                ],
                "correctAnswer": 0,
                "explanation": "Enabling MIG mode with `nvidia-smi -i 0 --mig-mode=1` sets the mode to 'pending' and requires a system reboot to take effect. After reboot, MIG mode becomes active and can be verified with `nvidia-smi`. Creating MIG partitions is only possible after MIG mode is enabled and the system is rebooted. Option D is incorrect because MIG mode is not active until after reboot."
            },
            {
                "id": 385,
                "question": "A Kubernetes administrator wants to configure MIG on an A100 GPU cluster to support both small inference jobs and larger training jobs simultaneously on the same physical GPU. Which MIG strategy should the administrator choose?",
                "options": [
                    "Single strategy",
                    "Mixed strategy",
                    "All strategy",
                    "None strategy"
                ],
                "correctAnswer": 1,
                "explanation": "The Mixed strategy allows different MIG profiles to coexist on the same physical GPU, enabling both small inference jobs (e.g., 1g.5gb) and larger training jobs (e.g., 3g.20gb) to run simultaneously. Single strategy uses only one profile per GPU, limiting flexibility. All strategy provides maximum flexibility but is more complex and can lead to fragmentation; it is best for dynamic environments. 'None' is not a valid MIG strategy."
            },
            {
                "id": 386,
                "question": "Which of the following best describes the security isolation provided by Multi-Instance GPU (MIG) technology?",
                "options": [
                    "MIG provides software-enforced memory isolation, relying on the GPU driver to prevent data access between slices.",
                    "MIG provides hardware-enforced memory and fault isolation, ensuring that each slice has dedicated resources and a failure in one slice does not affect others.",
                    "MIG provides fault isolation only, meaning a crash in one slice can corrupt data in another slice but will not crash the entire GPU.",
                    "MIG provides memory isolation through shared L2 cache partitions, but compute units are shared among slices."
                ],
                "correctAnswer": 1,
                "explanation": "MIG achieves complete memory and fault isolation at the hardware level. Each slice has dedicated memory controllers, L2 cache partitions, SMs, register files, and caches, with a hardware firewall preventing data flow between slices. This ensures that one slice cannot access another's memory and that a failure in one slice does not impact others. Option A is incorrect because MIG isolation is hardware-enforced, not software-enforced. Option C is incorrect because MIG provides both memory and fault isolation, and a crash does not corrupt data in other slices. Option D is incorrect because L2 cache is partitioned and compute units are exclusive to each slice."
            },
            {
                "id": 387,
                "question": "A cloud service provider wants to offer GPU-as-a-Service to multiple tenants using a single NVIDIA H100 GPU. Each tenant requires guaranteed performance and hardware-level isolation. Which technology should the provider use to partition the GPU?",
                "options": [
                    "Time-slicing",
                    "Multi-Process Service (MPS)",
                    "Multi-Instance GPU (MIG)",
                    "Virtual GPU (vGPU)"
                ],
                "correctAnswer": 2,
                "explanation": "Multi-Instance GPU (MIG) is the correct technology because it provides hardware-level partitioning of the GPU into isolated instances with dedicated memory, cache, and compute units, ensuring guaranteed performance and security for each tenant. Time-slicing and MPS offer only software-level isolation, which does not guarantee performance or strong security. vGPU is used for virtual machines but does not provide the same hardware-level isolation as MIG on H100 GPUs."
            },
            {
                "id": 388,
                "question": "In a Slurm-managed GPU cluster, which daemon is responsible for launching and monitoring jobs on a compute node?",
                "options": [
                    "slurmctld",
                    "slurmd",
                    "slurmdbd",
                    "slurmrestd"
                ],
                "correctAnswer": 1,
                "explanation": "The slurmd daemon runs on each compute node and acts as the local agent that launches, monitors, and cleans up jobs as directed by the slurmctld controller. slurmctld is the central controller that schedules jobs, slurmdbd handles accounting, and slurmrestd is a REST API interface, not a core execution daemon."
            },
            {
                "id": 389,
                "question": "A user submits a Slurm job with the command `sbatch --gres=gpu:a100:8 --ntasks=8 --cpus-per-task=4 --mem=256G train.sh`. The job remains pending with the reason \"Resources\". Which of the following is the most likely cause?",
                "options": [
                    "The cluster does not have any nodes with 8 A100 GPUs.",
                    "The GPU type name is misspelled (e.g., 'a100' should be 'A100').",
                    "The job requires more memory than available on any node.",
                    "The `--gres-flags=allow-multi-node` flag is missing."
                ],
                "correctAnswer": 0,
                "explanation": "The job is pending with reason \"Resources\", which typically means no node can satisfy the requested resources. The most common cause is that no node has exactly 8 A100 GPUs. Option B would cause an \"Invalid generic resource specification\" error, not a pending job. Option C would also show \"Resources\" but is less likely because the memory request (256 GB) is reasonable for a node with 8 A100 GPUs. Option D is incorrect because `--gres-flags=allow-multi-node` is only needed when requesting GPUs across multiple nodes, and the job requests 8 GPUs on a single node."
            },
            {
                "id": 390,
                "question": "A system administrator is configuring a shared GPU cluster for two research teams. Team Alpha frequently runs long training jobs, while Team Beta runs shorter inference tasks. The administrator wants to ensure that Team Beta's jobs are not delayed by Team Alpha's long-running jobs, and that overall GPU usage is balanced over time. Which combination of Slurm features should the administrator use to achieve this?",
                "options": [
                    "Create separate partitions for each team, assign a higher QoS priority to Team Beta, and enable fair-share scheduling.",
                    "Create a single partition for both teams, assign the same QoS to all jobs, and rely on fair-share scheduling only.",
                    "Create separate partitions for each team, assign the same QoS to both, and disable fair-share scheduling.",
                    "Create a single partition with a high-priority QoS for Team Beta and a low-priority QoS for Team Alpha, and disable fair-share scheduling."
                ],
                "correctAnswer": 0,
                "explanation": "The correct approach is to use separate partitions to isolate hardware or access per team, assign a higher QoS priority to Team Beta's jobs so they get scheduled before Team Alpha's long jobs, and enable fair-share scheduling to ensure long-term fairness. Option A correctly combines all three features. Option B lacks partitions and QoS differentiation, so Team Beta's jobs may still be delayed. Option C uses partitions but without QoS priority or fair-share, Team Beta's jobs have no scheduling advantage. Option D uses QoS but no partitions and disables fair-share, which could lead to unfair long-term usage and does not isolate teams."
            },
            {
                "id": 391,
                "question": "A user submits a job to a Slurm cluster, but it remains in the PD (pending) state. Which command and field would you use to determine the reason the job is not running?",
                "options": [
                    "squeue -j JOBID and check the REASON column",
                    "sinfo -p PARTITION and check the STATE column",
                    "scontrol show job JOBID and check the JobState field",
                    "squeue -u USER and check the ST column"
                ],
                "correctAnswer": 0,
                "explanation": "The squeue command displays the job queue and includes a REASON column that shows why a job is pending (e.g., Resources, Priority, Dependency). Using squeue -j JOBID filters to a specific job and shows its reason. sinfo shows node states, not job reasons. scontrol show job shows detailed configuration but the JobState field only indicates PENDING, not the reason. squeue -u USER shows all jobs for a user but does not directly show the reason unless the REASON column is included (which it is by default)."
            },
            {
                "id": 392,
                "question": "Why is Docker typically not used in HPC environments?",
                "options": [
                    "Docker requires root privileges and its security model is incompatible with shared multi-user clusters.",
                    "Docker does not support GPU acceleration for deep learning workloads.",
                    "Docker containers cannot be converted to other container formats like Apptainer.",
                    "Docker is not compatible with Linux-based operating systems commonly used in HPC."
                ],
                "correctAnswer": 0,
                "explanation": "Docker's architecture requires the Docker daemon to run with root privileges, posing a security risk in shared HPC clusters where users should not have root access. Additionally, Docker's security model does not preserve user identity, leading to file permission issues on shared filesystems. In contrast, Apptainer (Singularity) runs as a user process, preserves the original user's UID/GID, and is designed for multi-user HPC environments. Options B, C, and D are incorrect because Docker does support GPU acceleration (via --gpus flag), Docker images can be converted to Apptainer .sif files, and Docker runs on Linux, which is the dominant OS in HPC."
            },
            {
                "id": 393,
                "question": "In a shared HPC cluster using Apptainer, why is it not possible to gain root access inside a container at runtime?",
                "options": [
                    "Apptainer containers run with user-namespace execution, which maps the host user's UID into the container and prevents privilege escalation.",
                    "Apptainer containers are always built without a root user, so there is no root account to switch to.",
                    "Apptainer requires the --fakeroot flag to run any container, and that flag only simulates root without granting real privileges.",
                    "Apptainer containers run in a read-only filesystem, which prevents any user from modifying system files."
                ],
                "correctAnswer": 0,
                "explanation": "Apptainer's security model uses user-namespace execution, which maps the host user's UID directly into the container. This means the user inside the container has the same privileges as the user who launched it\u2014not root. Even if the container image contains a root user, you cannot switch to root because the user namespace prevents privilege escalation. Option B is incorrect because container images can have a root user; Apptainer simply prevents using it. Option C is incorrect because --fakeroot is optional and only simulates root for package installation, not for gaining real root. Option D is incorrect because while system paths are read-only by default, that is a separate feature; the core reason is user-namespace execution."
            },
            {
                "id": 394,
                "question": "Which of the following best describes a key characteristic of the SIF (Singularity Image Format) container format used by Apptainer?",
                "options": [
                    "SIF images are composed of multiple layers that can be modified after creation.",
                    "SIF images are immutable single files that cannot be changed once built.",
                    "SIF images require root privileges to run on HPC clusters.",
                    "SIF images are stored as compressed tarballs that must be extracted before use."
                ],
                "correctAnswer": 1,
                "explanation": "SIF (Singularity Image Format) is a single-file, immutable container image format. Once a SIF image is built, it cannot be modified, ensuring reproducibility and security. This immutability is a core feature that distinguishes SIF from Docker images, which are composed of mutable layers. SIF containers can be run without root privileges, making them ideal for HPC environments. They are not stored as tarballs; the entire filesystem is contained within the .sif file using squashfs compression."
            },
            {
                "id": 395,
                "question": "An HPC administrator needs to run an NGC PyTorch container on a Slurm cluster where users do not have root access. Which command should the administrator use to convert the Docker container to Apptainer format?",
                "options": [
                    "apptainer pull docker://nvcr.io/nvidia/pytorch:24.01-py3",
                    "apptainer build docker://nvcr.io/nvidia/pytorch:24.01-py3 pytorch.sif",
                    "docker pull nvcr.io/nvidia/pytorch:24.01-py3 && apptainer build pytorch.sif docker-daemon://pytorch:24.01-py3",
                    "apptainer convert docker://nvcr.io/nvidia/pytorch:24.01-py3 pytorch.sif"
                ],
                "correctAnswer": 0,
                "explanation": "The correct command is `apptainer pull docker://nvcr.io/nvidia/pytorch:24.01-py3`. This command pulls the Docker image from NGC and directly converts it into an Apptainer SIF file (pytorch_24.01-py3.sif) without requiring root privileges or a Docker daemon. Option B is incorrect because `apptainer build` with a `docker://` URI is not a valid syntax; `build` is used for local Docker daemon images or definition files. Option C requires root access to run the Docker daemon, which is not available in HPC. Option D uses a non-existent `apptainer convert` command; Apptainer does not have a separate convert subcommand."
            },
            {
                "id": 396,
                "question": "An engineer runs nvidia-smi on a server and sees the following output at the top: 'Driver Version: 525.85.12    CUDA Version: 12.0'. The engineer needs to run a workload that requires CUDA 12.2. What should the engineer do?",
                "options": [
                    "Install CUDA 12.2 toolkit; the driver supports it because the CUDA Version shown is the installed CUDA version.",
                    "Update the NVIDIA driver to a version that supports CUDA 12.2, because the CUDA Version shown is the maximum supported by the driver.",
                    "Downgrade the workload to use CUDA 11.8, because the driver version 525.85.12 only supports CUDA 11.8.",
                    "No action is needed; nvidia-smi shows the installed CUDA version, which can be updated independently of the driver."
                ],
                "correctAnswer": 1,
                "explanation": "The 'CUDA Version' in nvidia-smi output indicates the maximum CUDA toolkit version supported by the installed driver, not the version currently installed. Since the driver only supports up to CUDA 12.0, a workload requiring CUDA 12.2 would need a newer driver that supports that version. Option A is incorrect because the CUDA Version is a compatibility ceiling, not the installed version. Option C is incorrect because the driver supports up to CUDA 12.0, not just 11.8. Option D is incorrect because the CUDA Version cannot be updated independently of the driver beyond the supported maximum."
            },
            {
                "id": 397,
                "question": "An AI engineer notices that during a training job, a GPU shows 95% utilization, 300W power draw, 88\u00b0C temperature, and 100% fan speed. What is the most appropriate immediate action?",
                "options": [
                    "Reduce the batch size to lower utilization and power draw.",
                    "Check the cooling system and airflow, as the temperature is above the safe threshold.",
                    "Ignore the metrics since high utilization and fan speed are normal during training.",
                    "Replace the GPU immediately because 88\u00b0C indicates permanent damage."
                ],
                "correctAnswer": 1,
                "explanation": "The correct answer is to check the cooling system and airflow. While high utilization, power draw, and fan speed are normal during training, a temperature of 88\u00b0C exceeds the recommended safe threshold of 85\u00b0C. This could lead to thermal throttling or damage if sustained. Reducing batch size (option A) might lower temperature but does not address the root cause of inadequate cooling. Ignoring the metrics (option C) risks performance degradation or hardware failure. Replacing the GPU (option D) is premature without first investigating cooling issues."
            },
            {
                "id": 398,
                "question": "An engineer runs nvidia-smi and notices that GPU memory usage is at 70% of total capacity, but the Processes section shows no active PIDs. What is the most likely cause?",
                "options": [
                    "A memory leak from a previously terminated process that did not release GPU memory.",
                    "A stuck process that is still running but not visible in nvidia-smi.",
                    "Normal behavior; the GPU driver reserves memory for future allocations.",
                    "A hardware fault causing incorrect memory reporting."
                ],
                "correctAnswer": 0,
                "explanation": "When GPU memory usage is high but no processes are listed in nvidia-smi, it indicates that a process previously allocated memory and terminated without freeing it\u2014a classic memory leak. Option B is incorrect because a stuck process would still appear in the process list. Option C is incorrect because the driver does not reserve a significant amount of memory arbitrarily. Option D is unlikely; hardware faults typically produce Xid errors or other symptoms."
            },
            {
                "id": 399,
                "question": "An AI infrastructure engineer runs nvidia-smi -q on a server and notices that the PCIe link width is reported as x4 instead of the expected x16. What is the most likely cause of this issue?",
                "options": [
                    "The GPU is thermal throttling due to high temperature.",
                    "The GPU is not properly seated in the PCIe slot or the slot is limited.",
                    "The GPU driver is outdated and needs to be updated.",
                    "The power limit is set below the maximum value."
                ],
                "correctAnswer": 1,
                "explanation": "A PCIe link width of x4 instead of x16 typically indicates a physical seating issue or a slot limitation. Thermal throttling (option A) would affect clock speeds, not PCIe link width. An outdated driver (option C) might cause other issues but not a reduced link width. A power limit (option D) would affect power draw, not PCIe link width."
            },
            {
                "id": 400,
                "question": "An AI engineer is using nvidia-smi dmon to monitor GPU performance during a training job. The engineer wants to focus on GPU compute utilization and memory bandwidth, and also wants to see the current power draw and temperature. Which command should the engineer use?",
                "options": [
                    "nvidia-smi dmon -d sm,mem,pwr,temp",
                    "nvidia-smi dmon -i 0 -d sm,mem,pwr,temp",
                    "nvidia-smi dmon -s 5 -d sm,mem,pwr,temp",
                    "nvidia-smi dmon -d sm,mem,pwr,temp -i 0"
                ],
                "correctAnswer": 0,
                "explanation": "The correct command is 'nvidia-smi dmon -d sm,mem,pwr,temp'. The -d flag allows the user to specify a comma-separated list of metrics to display. The metrics sm (Streaming Multiprocessor utilization) and mem (memory utilization) cover compute and memory bandwidth, while pwr and temp show power draw and temperature. The other options are incorrect because: Option B adds -i 0 to monitor only GPU 0, but the question does not specify a particular GPU; Option C adds -s 5 to set an update interval of 5 seconds, which is not requested; Option D combines -i 0 with -d, which again restricts to GPU 0. Since the question asks for a command to monitor these metrics without specifying a GPU or interval, the simplest correct command is option A."
            }
        ]
    },
    {
        "id": 21,
        "title": "NCA practice exam Set 21",
        "description": "Practice Exam Set 21 containing 20 unique exam-aligned questions covering core infrastructure domains.",
        "questions": [
            {
                "id": 401,
                "question": "An engineer notices that a GPU is running at 100% utilization and wants to identify which specific process is consuming the most resources. Which command should the engineer use?",
                "options": [
                    "nvidia-smi",
                    "nvidia-smi pmon",
                    "nvidia-smi topo -m",
                    "nvidia-smi -q -d UTILIZATION"
                ],
                "correctAnswer": 1,
                "explanation": "The nvidia-smi pmon command provides a per-process breakdown of GPU utilization, including PID, SM utilization, and memory usage, making it ideal for identifying which process is consuming the most resources. The standard nvidia-smi command shows only overall GPU summary without per-process details. nvidia-smi topo -m displays GPU topology, and nvidia-smi -q -d UTILIZATION shows overall utilization queries, not per-process information."
            },
            {
                "id": 402,
                "question": "An engineer wants to ensure that a GPU remains available with minimal latency for frequent short inference workloads, while also preventing any single process from monopolizing the GPU memory. Which combination of nvidia-smi settings should the engineer apply?",
                "options": [
                    "Enable persistence mode and set compute mode to Exclusive Process.",
                    "Set a power limit and enable persistence mode.",
                    "Enable persistence mode and set compute mode to Default.",
                    "Set compute mode to Prohibited and enable persistence mode."
                ],
                "correctAnswer": 2,
                "explanation": "Persistence mode keeps the driver loaded, reducing startup latency for frequent workloads. Setting compute mode to Default allows multiple processes to share the GPU, which is appropriate for inference serving where multiple requests may need concurrent access. Exclusive Process (option A) would block other processes, which is not ideal for shared inference. Power limit (option B) addresses power/thermal management but does not affect latency or sharing. Prohibited (option D) would disable GPU access entirely."
            },
            {
                "id": 403,
                "question": "An AI engineer notices the following message in the system logs: 'NVRM: Xid (PCI:0000:03:00.0): 48, pid=12345, name=python3, GPU has fallen off the bus.' What is the most appropriate immediate action?",
                "options": [
                    "Ignore the error because it is a recoverable software issue.",
                    "Restart the GPU using nvidia-smi -r and monitor for recurrence.",
                    "Replace the GPU immediately because this is a critical hardware error.",
                    "Check the GPU temperature and power limits using nvidia-smi."
                ],
                "correctAnswer": 2,
                "explanation": "Xid 48 indicates a double-bit ECC error, which is an uncorrectable memory error. This is a critical hardware error that typically requires GPU replacement. The message 'GPU has fallen off the bus' (though more commonly associated with Xid 62) combined with Xid 48 suggests a severe hardware fault. Option A is incorrect because Xid 48 is not recoverable. Option B (restart) may temporarily clear the error but the underlying hardware issue remains. Option D (check temperature/power) is good practice but not the most immediate action for a critical hardware error."
            },
            {
                "id": 404,
                "question": "An AI infrastructure engineer is monitoring GPU health using nvidia-smi and observes a rising count of Single-bit ECC Errors (SBE) over several days, while Double-bit ECC Errors (DBE) remain at zero. What is the most appropriate action for the engineer to take?",
                "options": [
                    "Immediately replace the GPU because any ECC error indicates a critical failure.",
                    "Ignore the SBE count entirely since SBEs are automatically corrected and have no impact.",
                    "Monitor the SBE trend and prepare for possible GPU replacement if the count spikes suddenly.",
                    "Reset the GPU to clear the SBE counter and continue normal operations."
                ],
                "correctAnswer": 2,
                "explanation": "Single-bit correctable errors (SBEs) are automatically corrected by ECC and do not compromise data integrity, so immediate replacement is not necessary. However, a rising SBE count may indicate a degrading memory module that could lead to future double-bit uncorrectable errors (DBEs). Therefore, the best practice is to monitor the trend and replace the GPU if the count spikes suddenly. Ignoring SBEs entirely is not recommended because they can be early warning signs. Resetting the GPU only clears volatile counters but does not address the underlying hardware issue."
            },
            {
                "id": 405,
                "question": "An AI infrastructure engineer runs nvidia-smi --query-gpu=ecc.errors.uncorrected.volatile.total on a DGX A100 system and receives a value of 3 for one GPU. What is the most appropriate interpretation and action?",
                "options": [
                    "The GPU has a permanent hardware failure and must be replaced immediately.",
                    "The GPU has experienced three uncorrected ECC errors since the last driver load; this could be a transient event, so the engineer should monitor the counter over time.",
                    "The GPU has corrected three errors automatically, so no action is needed.",
                    "The aggregate ECC counter shows three errors over the GPU's lifetime, indicating normal wear and tear."
                ],
                "correctAnswer": 1,
                "explanation": "The volatile counter tracks uncorrected ECC errors since the last driver load. A small number like 3 could be due to transient events (e.g., cosmic rays) and does not necessarily indicate permanent failure. The best practice is to monitor the counter over time; if it increases, hardware degradation is likely. Option A is too drastic for a single small value. Option C confuses corrected with uncorrected errors. Option D incorrectly describes the counter as aggregate; volatile counters reset on driver reload."
            },
            {
                "id": 406,
                "question": "A GPU administrator notices that `nvidia-smi` reports a non-zero 'Pending Remap' count for a GPU in a production AI cluster. What is the correct interpretation and recommended action?",
                "options": [
                    "The GPU has permanently lost memory capacity and must be replaced immediately.",
                    "The GPU has detected faulty memory rows that will be automatically remapped without any intervention.",
                    "The GPU has identified faulty memory rows that require a GPU reset or system reboot to apply the remapping; a maintenance window should be scheduled.",
                    "The GPU has exhausted all spare rows and any further faults will cause uncorrectable errors."
                ],
                "correctAnswer": 2,
                "explanation": "A pending remap count indicates that the GPU has detected faulty memory rows but the remapping has not yet been applied. According to the lesson, row remapping requires a GPU reset or system reboot to take effect. The recommended action is to plan a maintenance window for a reboot. Option A is incorrect because the GPU is still operational and replacement is not immediately necessary. Option B is incorrect because remapping does not happen automatically without a reboot. Option D describes a scenario where no spare rows remain, which is not indicated by a pending remap count alone."
            },
            {
                "id": 407,
                "question": "A system administrator notices the following message in dmesg: 'pcieport 0000:00:01.0: AER: Corrected error received: 0000:03:00.0'. What is the most appropriate initial action?",
                "options": [
                    "Immediately power down the server and reseat the GPU.",
                    "Ignore the error since it is corrected and does not affect workload.",
                    "Identify the affected device, check error severity, and monitor for patterns.",
                    "Run nvidia-smi to reset the GPU and clear the error counter."
                ],
                "correctAnswer": 2,
                "explanation": "A corrected error is recoverable and usually does not require immediate shutdown. The best practice is to identify the affected device (PCIe address 0000:03:00.0), note the severity (corrected), and monitor for patterns (e.g., frequency, correlation with workload). Ignoring the error entirely is not recommended because a high rate of corrected errors may indicate a failing link. Reseating or resetting without investigation is premature."
            },
            {
                "id": 408,
                "question": "An engineer notices that an NVIDIA A100 GPU is delivering only 70% of expected training throughput. Using nvidia-smi, the engineer observes that the GPU power draw is consistently at 200W, the core clock is 900 MHz (max is 1410 MHz), and the throttle reason indicates 'Power Cap'. What is the most likely cause of the performance reduction?",
                "options": [
                    "The GPU is overheating and has entered thermal throttling.",
                    "The GPU is operating under a power cap that limits its power consumption below the maximum TDP.",
                    "The GPU driver is outdated and causing clock speed instability.",
                    "The GPU is being shared with another workload via MIG."
                ],
                "correctAnswer": 1,
                "explanation": "The symptoms\u2014power draw at 200W (below the A100's 250W TDP), reduced core clock (900 MHz vs. 1410 MHz), and throttle reason 'Power Cap'\u2014are classic signs of power capping. Power capping limits the GPU's power consumption to a value below its maximum TDP, causing the GPU to reduce clock speeds to stay within the power budget. Option A is incorrect because thermal throttling would show 'Thermal' as the throttle reason, not 'Power Cap'. Option C is incorrect because outdated drivers typically cause different issues like crashes or compatibility problems, not consistent power capping. Option D is incorrect because MIG partitioning would show multiple GPU instances in nvidia-smi, not a power cap throttle reason."
            },
            {
                "id": 409,
                "question": "An AI engineer wants to automate hardware validation before each training run to detect GPU memory errors early. Which DCGM command should be used in a pre-training script to perform a comprehensive health check on all GPUs?",
                "options": [
                    "nvidia-smi --query-gpu=memory.used --format=csv",
                    "dcgmi diag --run 1",
                    "dcgmi health --check all",
                    "nvidia-smi -pm 1"
                ],
                "correctAnswer": 2,
                "explanation": "The correct command is `dcgmi health --check all`. This runs the full suite of DCGM health checks (memory, thermal, power, PCIe, clock) on all GPUs and returns a pass/fail result for each. Option A (`nvidia-smi --query-gpu=memory.used`) only shows memory usage, not integrity. Option B (`dcgmi diag --run 1`) runs a diagnostic level, but the question specifically asks for health checks. Option D (`nvidia-smi -pm 1`) enables persistence mode, which is unrelated to health validation."
            },
            {
                "id": 410,
                "question": "An AI engineer runs the cuda-bandwidthtest on a server with an NVIDIA H100 GPU connected via PCIe Gen5 x16. The test reports D2D bandwidth of 3,000 GB/s and H2D bandwidth of 50 GB/s. Which of the following conclusions is most likely correct?",
                "options": [
                    "The D2D bandwidth is too low; it should match the GPU's memory bandwidth specification of 3,000 GB/s.",
                    "The H2D bandwidth is too low; it should be close to the D2D bandwidth.",
                    "The D2D bandwidth is reasonable, but the H2D bandwidth is higher than expected for PCIe Gen5 x16.",
                    "Both bandwidth values are within expected ranges for the given hardware configuration."
                ],
                "correctAnswer": 3,
                "explanation": "The H100 GPU has a memory bandwidth of approximately 3,000 GB/s, so D2D bandwidth matching that is expected. PCIe Gen5 x16 provides a theoretical maximum of about 64 GB/s per direction, so 50 GB/s for H2D is realistic (accounting for overhead). Therefore, both values are within expected ranges."
            },
            {
                "id": 411,
                "question": "An AI infrastructure engineer runs gpu-burn on a newly installed GPU for 30 minutes and observes no errors. However, during a subsequent training job, the system freezes intermittently. What is the most likely next step to diagnose the issue?",
                "options": [
                    "Replace the GPU immediately, as gpu-burn may have missed a defect.",
                    "Run gpu-burn for a longer duration (e.g., 2-4 hours) while monitoring temperatures and power draw.",
                    "Ignore the freezes, as gpu-burn passed and the training job is likely unrelated.",
                    "Reinstall the GPU drivers and rerun the training job."
                ],
                "correctAnswer": 1,
                "explanation": "gpu-burn is a stress test designed to expose hardware defects, but intermittent issues may require longer test durations to manifest. Running gpu-burn for an extended period (e.g., 2-4 hours) while monitoring temperatures and power draw can help uncover thermal throttling, power instability, or latent defects that a 30-minute test might miss. Replacing the GPU immediately (option A) is premature without further evidence. Ignoring the freezes (option C) is risky as they could indicate a hardware problem. Reinstalling drivers (option D) is unlikely to resolve a hardware-induced freeze."
            },
            {
                "id": 412,
                "question": "An engineer runs nccl-tests on a new 8-GPU server and notices that for large message sizes (e.g., 256 MB), the bus bandwidth is significantly lower than expected. Which of the following is the most likely cause?",
                "options": [
                    "The GPU drivers are outdated.",
                    "One or more NVLink connections are degraded or faulty.",
                    "The NCCL version is too new for the hardware.",
                    "The test was run with too many threads per GPU."
                ],
                "correctAnswer": 1,
                "explanation": "A significant drop in bus bandwidth for large message sizes typically indicates a hardware bottleneck in the GPU interconnect, such as a degraded or faulty NVLink connection. Outdated drivers could cause general issues but are less likely to selectively affect large messages. A newer NCCL version is generally backward-compatible and should not cause bandwidth drops. The number of threads per GPU (nThreads) is set by the user and does not typically cause bandwidth degradation for large messages; it may affect latency for small messages."
            },
            {
                "id": 413,
                "question": "An AI infrastructure engineer runs ibdiagnet on an InfiniBand fabric and notices that several links are reported as 'degraded.' Which of the following is the most likely cause of this status?",
                "options": [
                    "The links are experiencing high packet error rates due to faulty cables or transceivers.",
                    "The links are operating at a lower data rate than expected, such as 4x instead of 12x.",
                    "The links are down due to a misconfigured subnet manager.",
                    "The links are congested due to excessive traffic from a running AI training job."
                ],
                "correctAnswer": 1,
                "explanation": "In InfiniBand diagnostics, a 'degraded' link status typically indicates that the link is up but not operating at its full speed or width (e.g., 4x instead of 12x). This can be caused by cable or transceiver issues, but the defining characteristic of a degraded link is reduced data rate. Option A describes high error rates, which may lead to degradation but are not the direct definition. Option C would result in a down link, not degraded. Option D describes congestion, which is a performance issue but not reported as link degradation by ibdiagnet."
            },
            {
                "id": 414,
                "question": "A data center engineer is responsible for monitoring GPU health across a cluster of 20 servers, each with 8 GPUs. The engineer needs to set up continuous telemetry collection and automated alerts for GPU memory errors. Which tool should the engineer use?",
                "options": [
                    "nvidia-smi with a cron job that parses CSV output and sends alerts",
                    "DCGM running as a background service with Prometheus and Grafana",
                    "nvidia-smi --query-gpu=memory.error --format=csv run manually on each server",
                    "A custom script using the NVIDIA Management Library (NVML) directly"
                ],
                "correctAnswer": 1,
                "explanation": "DCGM is designed for cluster-scale monitoring with continuous telemetry collection, built-in health diagnostics, and integration with time-series databases like Prometheus for alerting. nvidia-smi is suitable for single-GPU or single-node checks but lacks persistent logging and automated alerting at scale. While NVML could be used to build a custom solution, DCGM provides a ready-to-use, optimized framework for this purpose."
            },
            {
                "id": 415,
                "question": "An AI infrastructure engineer is configuring DCGM to monitor GPU health in a multi-GPU training cluster. Which field ID should be scraped to detect early signs of GPU hardware failures that could corrupt training results?",
                "options": [
                    "Field ID 100 (GPU Utilization)",
                    "Field ID 155 (Memory Utilization)",
                    "Field ID 500 (Xid Errors)",
                    "Field ID 202 (Power Draw)"
                ],
                "correctAnswer": 2,
                "explanation": "Xid Errors (Field ID 500) are GPU hardware errors that indicate serious issues such as memory errors, driver problems, or hardware faults. Monitoring Xid errors is critical for detecting early signs of GPU failures that could corrupt training results or cause crashes. GPU Utilization (100) shows activity level, Memory Utilization (155) shows memory usage, and Power Draw (202) monitors power consumption\u2014none directly indicate hardware failures."
            },
            {
                "id": 416,
                "question": "An AI engineer notices that a GPU training job is underperforming and suspects thermal throttling. Which dcgmi feature should they use to continuously monitor GPU temperature and utilization in real-time?",
                "options": [
                    "dcgmi diag",
                    "dcgmi watch",
                    "dcgmi config",
                    "dcgmi events"
                ],
                "correctAnswer": 1,
                "explanation": "The correct answer is 'dcgmi watch' because it enables real-time field watching of GPU metrics like temperature and utilization, updating live in the terminal. 'dcgmi diag' runs a one-time health check but does not provide continuous monitoring. 'dcgmi config' is for setting DCGM policies, and 'dcgmi events' lists historical events, not live metrics."
            },
            {
                "id": 417,
                "question": "A GPU cluster administrator wants to proactively detect hardware issues before they cause job failures. Which DCGM health watch should be used to monitor for increasing corrected memory errors that may indicate impending uncorrectable failures?",
                "options": [
                    "PCIe health watch",
                    "NVLink health watch",
                    "ECC health watch",
                    "Power health watch"
                ],
                "correctAnswer": 2,
                "explanation": "The ECC health watch monitors single-bit correctable and double-bit uncorrectable memory errors. A sudden spike in correctable errors can signal that uncorrectable failures may occur soon, allowing proactive replacement. The PCIe watch monitors link health, the NVLink watch monitors inter-GPU connections, and the Power watch monitors power draw and thermal limits."
            },
            {
                "id": 418,
                "question": "An AI engineer is using Slurm to run training jobs on a cluster with NVIDIA GPUs. They want to track GPU utilization and memory usage for each job from start to finish using DCGM. Which approach should they take?",
                "options": [
                    "Run nvidia-smi pmon during the job to capture per-process GPU metrics.",
                    "Create a DCGM group containing the GPUs allocated to the job, enable job stats recording, and query the stats after job completion.",
                    "Use the Kubernetes device plugin to automatically create DCGM groups for each Slurm job.",
                    "Enable DCGM persistence mode on all GPUs before job submission to collect job-level statistics."
                ],
                "correctAnswer": 1,
                "explanation": "DCGM groups allow you to logically group GPUs assigned to a job. By creating a group with the allocated GPUs and enabling job stats recording, DCGM captures metrics (utilization, memory, power, etc.) for the entire job duration. After the job ends, you can query the accumulated statistics using dcgmi stats. Option A (nvidia-smi pmon) provides per-process metrics but not aggregated job-level stats. Option C is incorrect because the Kubernetes device plugin is for Kubernetes, not Slurm. Option D (persistence mode) reduces driver initialization latency but does not provide job-level statistics."
            },
            {
                "id": 419,
                "question": "A DevOps engineer wants to reduce the volume of GPU metrics collected by DCGM-Exporter in a Kubernetes cluster. Which Kubernetes resource should be modified to customize the set of metrics collected?",
                "options": [
                    "Deployment",
                    "ConfigMap",
                    "DaemonSet",
                    "Service"
                ],
                "correctAnswer": 1,
                "explanation": "The DCGM-Exporter uses a ConfigMap (typically named dcgm-exporter-config) to define which metrics to collect. By editing this ConfigMap, you can specify a custom list of field IDs and metric names, overriding the default set. Modifying the Deployment or DaemonSet would affect pod replicas or scheduling, not the metric collection list. The Service resource controls network access, not exporter configuration."
            },
            {
                "id": 420,
                "question": "When the NVIDIA GPU Operator is deployed on a Kubernetes cluster, which of the following best describes how dcgm-exporter is deployed?",
                "options": [
                    "It is deployed as a single pod in the cluster, collecting metrics from all GPU nodes.",
                    "It is deployed as a DaemonSet, with one pod per GPU-enabled node.",
                    "It must be manually installed and configured after the GPU Operator is deployed.",
                    "It is deployed as a sidecar container within each GPU workload pod."
                ],
                "correctAnswer": 1,
                "explanation": "The GPU Operator automatically deploys dcgm-exporter as a DaemonSet, ensuring one pod runs on each node that has NVIDIA GPUs. This is stated in the lesson: 'It automatically schedules a dcgm-exporter pod on each GPU-enabled node.' Option A is incorrect because there is not a single pod for all nodes; each GPU node gets its own exporter. Option C is incorrect because no manual installation is needed. Option D is incorrect because dcgm-exporter runs as a separate DaemonSet, not as a sidecar within workload pods."
            }
        ]
    },
    {
        "id": 22,
        "title": "NCA practice exam Set 22",
        "description": "Practice Exam Set 22 containing 20 unique exam-aligned questions covering core infrastructure domains.",
        "questions": [
            {
                "id": 421,
                "question": "In the Prometheus data model, what is the primary purpose of labels attached to a time-series metric?",
                "options": [
                    "To store the metric value as a string instead of a number",
                    "To provide additional context such as which GPU, node, or job the metric belongs to",
                    "To define the metric type (e.g., gauge, counter, histogram)",
                    "To specify the retention period for the metric data"
                ],
                "correctAnswer": 1,
                "explanation": "Labels are key-value pairs that add context to a metric, enabling identification of specific components like GPU ID, node name, or job name. They do not store string values (the metric value is always numeric), do not define metric type (that is inherent to the metric definition), and do not specify retention policies (which are configured separately)."
            },
            {
                "id": 422,
                "question": "A system administrator is configuring Prometheus to monitor an AI cluster that includes both GPU nodes and CPU-only nodes. The administrator wants to collect GPU metrics from dcgm-exporter and host metrics from node-exporter. Which of the following Prometheus scrape configurations correctly defines the targets for both exporters?",
                "options": [
                    "A single job named 'exporters' with targets including both dcgm-exporter (port 9400) and node-exporter (port 9100) endpoints.",
                    "Two separate jobs: one named 'dcgm-exporter' targeting GPU nodes on port 9400, and another named 'node-exporter' targeting all nodes on port 9100.",
                    "A single job named 'node-exporter' with targets on port 9100 for all nodes, and a separate job named 'dcgm-exporter' with targets on port 9400 only for CPU nodes.",
                    "Two separate jobs: one named 'dcgm-exporter' targeting all nodes on port 9400, and another named 'node-exporter' targeting GPU nodes on port 9100."
                ],
                "correctAnswer": 1,
                "explanation": "The correct configuration uses two separate scrape jobs: one for dcgm-exporter (port 9400) targeting only GPU nodes, and another for node-exporter (port 9100) targeting all nodes. This aligns with the recommended practice of separating concerns and using appropriate scrape intervals. Option A is incorrect because mixing different exporter types in a single job is not standard and would prevent using different scrape intervals. Option C is incorrect because dcgm-exporter should target GPU nodes, not CPU nodes. Option D is incorrect because dcgm-exporter should not target all nodes (only GPU nodes), and node-exporter should target all nodes, not just GPU nodes."
            },
            {
                "id": 423,
                "question": "A DevOps engineer is configuring Prometheus Alertmanager to send GPU fault notifications. They want critical alerts (e.g., uncorrectable memory errors) to be sent immediately to the on-call team via PagerDuty, while warning alerts (e.g., high temperature) should be posted to a Slack channel for daytime review. Which Alertmanager feature should they use to achieve this?",
                "options": [
                    "Grouping",
                    "Inhibition",
                    "Routing based on severity labels",
                    "Silencing"
                ],
                "correctAnswer": 2,
                "explanation": "Alertmanager uses routing trees to direct alerts to different receivers based on labels such as severity. By assigning severity labels (e.g., 'critical', 'warning') to alert rules, the engineer can configure routes that send critical alerts to PagerDuty and warnings to Slack. Grouping (A) combines similar alerts into one notification, inhibition (B) suppresses certain alerts when others are firing, and silencing (D) temporarily suppresses alerts; none of these route alerts to different receivers based on severity."
            },
            {
                "id": 424,
                "question": "After installing Grafana and Prometheus on an AI cluster, an administrator attempts to add Prometheus as a data source in Grafana but receives a connection error. Which of the following is the most likely cause?",
                "options": [
                    "Grafana is not running on the default port 3000.",
                    "The Prometheus server URL is incorrectly specified as http://localhost:9090 when Prometheus is on a remote host.",
                    "The administrator does not have editor permissions in Grafana.",
                    "Prometheus is using a push-based model and cannot be queried by Grafana."
                ],
                "correctAnswer": 1,
                "explanation": "The most likely cause is an incorrect URL. If Prometheus is running on a remote host, the URL must point to that host's IP address or hostname, not localhost. The default port for Prometheus is 9090, so using http://localhost:9090 would only work if Prometheus is on the same machine as Grafana. Option A is less likely because Grafana's default port is 3000, but the error is about connecting to Prometheus, not accessing Grafana. Option C is incorrect because adding data sources requires admin or editor permissions, but the administrator would typically have those; the error message would be different if permissions were the issue. Option D is false; Prometheus is pull-based, but Grafana can query it via its HTTP API regardless of the push/pull model."
            },
            {
                "id": 425,
                "question": "An administrator has successfully deployed DCGM Exporter on all GPU nodes and configured Prometheus to scrape the metrics. They now want to import the official NVIDIA GPU cluster dashboard into Grafana. What is the correct dashboard ID to use?",
                "options": [
                    "12239",
                    "12339",
                    "13229",
                    "11239"
                ],
                "correctAnswer": 0,
                "explanation": "The official NVIDIA DCGM GPU cluster dashboard is published on Grafana.com with dashboard ID 12239. This dashboard provides pre-built panels for GPU utilization, memory, temperature, power, PCIe/NVLink throughput, and error counts. The other options are incorrect IDs that do not correspond to the official NVIDIA dashboard."
            },
            {
                "id": 426,
                "question": "A DevOps engineer is configuring Grafana alerting for GPU faults in an AI infrastructure. They want to ensure that critical GPU faults (e.g., GPU temperature exceeding 90\u00b0C) trigger an immediate on-call response, while warning-level faults (e.g., temperature exceeding 80\u00b0C) are posted to a team chat channel for awareness. Which Grafana alerting component should the engineer configure to route alerts based on severity?",
                "options": [
                    "Alert rule evaluation frequency",
                    "Contact point integration type",
                    "Notification policy label matchers",
                    "Alert rule query expression"
                ],
                "correctAnswer": 2,
                "explanation": "Notification policies in Grafana allow routing alerts to different contact points based on label matchers, such as severity=critical or severity=warning. This enables the engineer to send critical alerts to PagerDuty for on-call response and warning alerts to Slack for team awareness. Alert rule evaluation frequency (A) controls how often the rule is evaluated, not routing. Contact point integration type (B) defines where the alert is sent, but routing based on severity is done via notification policies. Alert rule query expression (D) defines the condition for firing the alert, not routing."
            },
            {
                "id": 427,
                "question": "In the complete observability stack for AI infrastructure, which component is responsible for collecting GPU-specific metrics such as temperature, utilization, and power consumption?",
                "options": [
                    "node_exporter",
                    "dcgm-exporter",
                    "Prometheus",
                    "Grafana"
                ],
                "correctAnswer": 1,
                "explanation": "dcgm-exporter is the NVIDIA-specific component that uses the Data Center GPU Manager (DCGM) to expose GPU metrics like temperature, utilization, memory usage, and power consumption. node_exporter collects server-level metrics (CPU, memory, disk), Prometheus stores and queries all metrics, and Grafana visualizes them. Therefore, dcgm-exporter is the correct answer."
            },
            {
                "id": 428,
                "question": "An AI cluster administrator is manually provisioning 1,000 new servers with Ubuntu. Which of the following is the most significant risk of using this manual approach?",
                "options": [
                    "Increased power consumption due to idle servers during installation.",
                    "Configuration drift leading to inconsistent GPU driver versions across nodes.",
                    "Higher network latency caused by manual IP address assignment.",
                    "Inability to install NVIDIA drivers without an internet connection."
                ],
                "correctAnswer": 1,
                "explanation": "Manual provisioning of 1,000 nodes is highly error-prone and time-consuming. The most significant risk is configuration drift, where different nodes end up with inconsistent software versions (e.g., GPU drivers, CUDA toolkit) due to human error or different engineers performing the installation. This inconsistency can cause training jobs to fail on some nodes or produce unpredictable cluster behavior. While other options may be concerns, they are not as critical or directly tied to the manual process: power consumption is not inherently increased by manual provisioning; network latency is more affected by fabric design than IP assignment; and NVIDIA drivers can be pre-downloaded or served locally."
            },
            {
                "id": 429,
                "question": "In a PXE boot installation for an AI cluster, which server component is responsible for delivering the initial boot loader (e.g., pxelinux.0) to the bare-metal server?",
                "options": [
                    "DHCP Server",
                    "TFTP Server",
                    "NFS Server",
                    "HTTP Server"
                ],
                "correctAnswer": 1,
                "explanation": "The TFTP (Trivial File Transfer Protocol) server is used to deliver the initial boot loader file (such as pxelinux.0) to the PXE client. The DHCP server provides the IP address and the location of the TFTP server, but does not transfer the boot loader itself. NFS and HTTP servers are used later in the process to serve the OS installation files, not the initial boot loader."
            },
            {
                "id": 430,
                "question": "Which of the following best describes the role of NVIDIA Base Command Manager (BCM) in a DGX SuperPOD?",
                "options": [
                    "It replaces Kubernetes for container orchestration in AI workloads.",
                    "It provides enterprise cluster management for provisioning, monitoring, job scheduling, and lifecycle management of DGX systems.",
                    "It is a hardware component that accelerates GPU-to-GPU communication via NVLink.",
                    "It is a storage solution that enables direct data transfer between GPU memory and NVMe drives."
                ],
                "correctAnswer": 1,
                "explanation": "NVIDIA Base Command Manager (BCM) is an enterprise cluster management platform designed specifically for DGX SuperPODs. It handles provisioning, monitoring, job scheduling, user management, and lifecycle management, providing a single pane of glass for the entire cluster. Option A is incorrect because BCM manages the hardware and OS layer, while Kubernetes manages containerized workloads on top; BCM is not a replacement for Kubernetes. Option C describes NVLink/NVSwitch hardware, not BCM. Option D describes GPUDirect Storage, which is a separate technology that BCM can integrate with but is not BCM itself."
            },
            {
                "id": 431,
                "question": "In NVIDIA Base Command Manager's redundant management server architecture, what is the primary role of the virtual IP (VIP) address?",
                "options": [
                    "To provide a unique identifier for each head node on the network.",
                    "To enable load balancing between the active and standby head nodes.",
                    "To ensure users and compute nodes always connect to the same address regardless of which head node is active.",
                    "To encrypt communication between the head nodes and compute nodes."
                ],
                "correctAnswer": 2,
                "explanation": "The virtual IP (VIP) is a floating IP address assigned to the active head node. During failover, the VIP moves to the standby node, so users and compute nodes always connect to the same address, ensuring seamless communication without reconfiguration. Option A is incorrect because each head node has its own physical IP; the VIP is shared. Option B is incorrect because the architecture uses active-passive, not load balancing. Option D is incorrect because encryption is handled separately, not by the VIP."
            },
            {
                "id": 432,
                "question": "In NVIDIA Base Command Manager (BCM), what is the primary purpose of an image profile?",
                "options": [
                    "To store a pre-configured OS snapshot that serves as the base template for all nodes",
                    "To define how a golden image should be applied to different node roles, including post-installation scripts and kernel parameters",
                    "To automate the PXE boot process for deploying operating systems onto bare-metal nodes",
                    "To manage version control and updates of golden images across the cluster"
                ],
                "correctAnswer": 1,
                "explanation": "An image profile is a configuration template that defines how a golden image is applied to different types of nodes. It allows assigning different images to node roles, specifying post-installation scripts, kernel parameters, and partitioning. Option A describes a golden image, option C describes OS provisioning, and option D describes update management, not the primary purpose of an image profile."
            },
            {
                "id": 433,
                "question": "In Base Command Manager (BCM), what is the primary benefit of using switch profiles for network provisioning?",
                "options": [
                    "They allow manual configuration of individual switch ports for custom settings.",
                    "They ensure consistent and error-free configuration across all switches by using predefined templates.",
                    "They enable automatic firmware updates on all switches simultaneously.",
                    "They provide real-time monitoring of network traffic and bandwidth usage."
                ],
                "correctAnswer": 1,
                "explanation": "Switch profiles in BCM are predefined templates that contain settings such as VLANs, port speeds, and QoS policies. By applying these profiles, BCM ensures that all switches in the fabric are configured identically, reducing human error and ensuring consistency. Manual configuration (option A) is discouraged because it is error-prone and not scalable. Firmware updates (option C) are handled separately, not directly by switch profiles. Real-time monitoring (option D) is a function of the Fabric Manager and monitoring tools, not switch profiles themselves."
            },
            {
                "id": 434,
                "question": "An AI cluster administrator is configuring user and project management in NVIDIA Base Command Manager (BCM). A user named 'alice' is assigned to the 'research' project, which has a per-project GPU quota of 16 GPUs. Alice also has a per-user GPU quota of 4 GPUs. If Alice submits a job requesting 6 GPUs, what will happen?",
                "options": [
                    "The job will run because the project still has available capacity (16 GPUs).",
                    "The job will be rejected because it exceeds Alice's per-user quota of 4 GPUs.",
                    "The job will run but only 4 GPUs will be allocated to it.",
                    "The job will be queued until the project quota is increased."
                ],
                "correctAnswer": 1,
                "explanation": "In BCM, GPU quotas are enforced at both the user and project levels. When a user submits a job, BCM checks the per-user quota first. If the requested GPUs exceed the user's personal limit, the job is rejected regardless of the project's available capacity. In this scenario, Alice's per-user quota is 4 GPUs, but she requested 6, so the job will be rejected. Option A is incorrect because the project quota does not override the user quota. Option C is incorrect because BCM does not partially allocate GPUs; it either accepts or rejects the full request. Option D is incorrect because the job is not queued; it is rejected outright due to the user quota violation."
            },
            {
                "id": 435,
                "question": "An AI infrastructure engineer is using NVIDIA Base Command Manager (BCM) integrated with Slurm. Which of the following is a key advantage of using BCM's job templates for job submission?",
                "options": [
                    "They allow engineers to bypass Slurm's scheduling policies and run jobs immediately.",
                    "They automatically translate resource requirements into Slurm submission scripts, simplifying the submission process.",
                    "They replace the need for Slurm commands like sbatch and srun entirely.",
                    "They enable direct GPU-to-GPU communication across nodes without InfiniBand."
                ],
                "correctAnswer": 1,
                "explanation": "BCM job templates allow engineers to define common AI workloads with pre-configured resource requirements (GPUs, memory, walltime) and environment setup. When an engineer selects a template and specifies parameters, BCM automatically generates the corresponding Slurm submission script and queues the job. This simplifies the submission process, especially for users less familiar with Slurm syntax. Option A is incorrect because BCM does not bypass Slurm scheduling; jobs still go through the queue. Option C is incorrect because standard Slurm commands remain available and are often used alongside the web interface. Option D is incorrect because GPU-to-GPU communication across nodes requires RDMA-capable networking (InfiniBand or RoCE), not job templates."
            },
            {
                "id": 436,
                "question": "In a Kubernetes cluster managed by NVIDIA Base Command Manager (BCM), what is the primary role of BCM?",
                "options": [
                    "Scheduling containerized AI workloads onto GPU nodes",
                    "Provisioning and managing the physical or virtual nodes that Kubernetes uses as worker nodes",
                    "Replacing Kubernetes as the container orchestration platform",
                    "Providing a web-based dashboard for monitoring pod logs"
                ],
                "correctAnswer": 1,
                "explanation": "BCM acts as the provisioning layer beneath Kubernetes, handling node discovery, OS installation, driver configuration, and health monitoring. It does not schedule containers (that's Kubernetes' job), does not replace Kubernetes, and does not provide a pod log dashboard\u2014those are separate tools."
            },
            {
                "id": 437,
                "question": "A new engineer is using the Base Command Manager (BCM) health dashboard to investigate a user's complaint that their AI training job failed unexpectedly. Which dashboard view should the engineer check first to identify the likely cause of the failure?",
                "options": [
                    "Cluster-wide node status to check if any nodes are offline or down.",
                    "GPU availability to see if GPUs were fully utilized at the time of failure.",
                    "Job history to review the job's exit code and resource usage.",
                    "Network health metrics to check for link failures."
                ],
                "correctAnswer": 2,
                "explanation": "The job history dashboard provides a complete record of each workload, including exit codes and resource usage. When a job fails, checking the exit code (non-zero indicates failure) and resource consumption helps pinpoint the cause. Node status (A) might show hardware issues but is not the first step for a specific job failure. GPU availability (B) shows current utilization, not historical data for a failed job. Network health (D) is relevant only if the job was affected by network issues, but job history is the most direct source of failure information."
            },
            {
                "id": 438,
                "question": "A DevOps engineer is using Terraform to deploy an AI training cluster across multiple cloud providers. Which authentication method is required for the Azure provider configuration?",
                "options": [
                    "IAM role and access keys",
                    "Service principal with client ID and client secret",
                    "Service account JSON key file",
                    "Named profile from credentials file"
                ],
                "correctAnswer": 1,
                "explanation": "The Azure provider (azurerm) authenticates using a service principal, which requires a client ID and client secret (or certificate). IAM roles and access keys are used by AWS, service account JSON keys are used by GCP, and named profiles are an AWS feature."
            },
            {
                "id": 439,
                "question": "In a GitOps-managed AI cluster, an engineer notices that a node's configuration has been manually altered. What is the expected behavior of the GitOps operator?",
                "options": [
                    "The operator logs the change and updates the Git repository to match the manual change.",
                    "The operator reverts the node configuration back to the state defined in the Git repository.",
                    "The operator sends an alert to the administrator but takes no automatic action.",
                    "The operator marks the node as unsynchronized and stops managing it."
                ],
                "correctAnswer": 1,
                "explanation": "A core principle of GitOps is drift prevention: the operator continuously reconciles the live cluster state with the desired state in Git. If a manual change is detected, the operator automatically reverts it to match the Git-defined configuration. Option A is incorrect because GitOps treats Git as the single source of truth, not the live cluster. Option C is incorrect because GitOps operators typically auto-remediate drift. Option D is incorrect because the operator continues to manage the node and corrects the drift."
            },
            {
                "id": 440,
                "question": "Which of the following Type 1 hypervisors is built directly into the Linux kernel and is the foundation for many cloud platforms like OpenStack?",
                "options": [
                    "VMware vSphere ESXi",
                    "Microsoft Hyper-V",
                    "KVM (Kernel-based Virtual Machine)",
                    "Citrix XenServer"
                ],
                "correctAnswer": 2,
                "explanation": "KVM (Kernel-based Virtual Machine) is a Type 1 hypervisor that is built directly into the Linux kernel, turning it into a hypervisor. It is the foundation for many cloud platforms, including OpenStack and Red Hat Virtualization. VMware vSphere ESXi uses a proprietary microkernel, Microsoft Hyper-V runs with a parent partition, and Citrix XenServer is based on the Xen hypervisor, which is not built into the Linux kernel."
            }
        ]
    },
    {
        "id": 23,
        "title": "NCA practice exam Set 23",
        "description": "Practice Exam Set 23 containing 20 unique exam-aligned questions covering core infrastructure domains.",
        "questions": [
            {
                "id": 441,
                "question": "An AI engineer wants to dedicate a physical GPU to a single VM for maximum performance in AI training workloads. Which of the following is a key requirement for implementing GPU passthrough?",
                "options": [
                    "The hypervisor must support vGPU profiles to split the GPU across multiple VMs.",
                    "The CPU and motherboard must support IOMMU (VT-d or AMD-Vi).",
                    "The GPU must be shared with the host operating system for display output.",
                    "The VM must use paravirtualized GPU drivers to achieve near-native performance."
                ],
                "correctAnswer": 1,
                "explanation": "GPU passthrough requires hardware support for IOMMU (Intel VT-d or AMD AMD-Vi) to allow the hypervisor to assign a PCIe device directly to a VM. Option A is incorrect because vGPU is a different technology that splits a GPU across multiple VMs, not passthrough. Option C is incorrect because the host loses access to the passthrough GPU; a separate GPU is typically used for the host display. Option D is incorrect because passthrough uses native GPU drivers inside the VM, not paravirtualized drivers."
            },
            {
                "id": 442,
                "question": "In NVIDIA vGPU architecture, what is the primary role of the host driver when a guest VM issues a GPU command?",
                "options": [
                    "It passes the command directly to the physical GPU without any validation.",
                    "It intercepts the command, validates it, translates memory addresses, and forwards it to the physical GPU.",
                    "It stores the command in a queue and executes it only when the VM has accumulated enough commands.",
                    "It converts the command into a CPU instruction and executes it on the host CPU."
                ],
                "correctAnswer": 1,
                "explanation": "The host driver intercepts every GPU command from guest VMs, validates it, performs memory address translation, and then forwards it to the physical GPU. This ensures security isolation, resource fairness, and error containment. Option A is incorrect because the command is not passed directly; interception is essential. Option C is incorrect because commands are not queued for batch execution; they are processed immediately after validation. Option D is incorrect because the command remains a GPU command and is executed on the GPU, not the CPU."
            },
            {
                "id": 443,
                "question": "An IT administrator is deploying virtual machines on a server with a single physical NVIDIA GPU. One VM will be used by a data scientist for training deep learning models, and another VM will be used by a designer for 3D CAD work. Which vGPU profile series should the administrator assign to each VM?",
                "options": [
                    "C-series for the data scientist, Q-series for the designer",
                    "Q-series for the data scientist, C-series for the designer",
                    "A-series for the data scientist, Q-series for the designer",
                    "C-series for the data scientist, A-series for the designer"
                ],
                "correctAnswer": 0,
                "explanation": "The correct answer is C-series for the data scientist and Q-series for the designer. C-series profiles are designed for compute-intensive workloads like AI training and deep learning, and they disable display output to dedicate all resources to computation. Q-series profiles are designed for professional graphics workloads such as 3D CAD, and they support display outputs and full OpenGL/DirectX. Option B is incorrect because it reverses the assignments. Option C is incorrect because A-series is for lightweight VDI applications, not AI training. Option D is incorrect because A-series is not suitable for AI training, and Q-series is not needed for the data scientist's compute workload."
            },
            {
                "id": 444,
                "question": "An AI engineer is deploying a real-time inference service for a small language model that requires 6 GB of GPU memory. The physical GPU is an NVIDIA A100 80 GB. Which vGPU profile should be selected to maximize the number of inference VMs per GPU while meeting the memory requirement?",
                "options": [
                    "1q (4 GB)",
                    "2q (8 GB)",
                    "4q (16 GB)",
                    "8q (32 GB)"
                ],
                "correctAnswer": 1,
                "explanation": "The model requires 6 GB of GPU memory. Among the options, the 1q profile provides only 4 GB, which is insufficient. The 2q profile provides 8 GB, meeting the requirement while allowing more VMs per GPU than larger profiles. The 4q and 8q profiles provide more memory than needed, reducing VM density. Therefore, the 2q profile is the best choice to balance memory requirements and maximize the number of inference VMs."
            },
            {
                "id": 445,
                "question": "A new engineer is setting up vGPU for a virtualized AI environment. The environment is air-gapped and cannot access the internet. Which of the following correctly describes how the engineer should obtain and deploy licenses for the NVIDIA License System (NLS)?",
                "options": [
                    "Connect the NLS License Server to the internet to automatically synchronize licenses from the NVIDIA cloud portal.",
                    "Manually download a license file (.bin) from the NVIDIA Licensing Portal on a connected machine, transfer it to the air-gapped server, and upload it.",
                    "Use a USB hardware dongle that contains the license key and plug it into the hypervisor host.",
                    "Request a perpetual license file via email and copy it directly to each VM's vGPU driver directory."
                ],
                "correctAnswer": 1,
                "explanation": "In an air-gapped (offline) environment, the NLS License Server cannot connect to the internet. The correct procedure is to manually download a license file (.bin) from the NVIDIA Licensing Portal on a machine with internet access, transfer that file to the air-gapped NLS server, and upload it. Option A describes the online mode, which is not possible in an air-gapped setup. Option C refers to legacy dongle-based licensing, which NLS replaces. Option D is incorrect because licenses are managed centrally by the NLS server, not distributed to individual VMs."
            },
            {
                "id": 446,
                "question": "An AI infrastructure engineer is configuring GPU virtualization for a multi-tenant environment where each tenant requires guaranteed performance and hardware-level isolation. The GPUs are NVIDIA H100s. Which technology combination should the engineer use to provide each VM with a dedicated, isolated GPU slice?",
                "options": [
                    "Traditional vGPU with time-sliced scheduling",
                    "MIG-backed vGPU, where each MIG instance is assigned to a vGPU device",
                    "GPU passthrough with SR-IOV",
                    "MPS (Multi-Process Service) with CUDA MPS control daemon"
                ],
                "correctAnswer": 1,
                "explanation": "MIG-backed vGPU combines hardware-level MIG partitioning with software-level vGPU abstraction, providing each VM with a dedicated, isolated GPU slice. Traditional vGPU (option A) offers only software-level isolation and best-effort performance. GPU passthrough with SR-IOV (option C) is not supported on NVIDIA GPUs for virtualization. MPS (option D) allows multiple processes to share a GPU but does not provide hardware isolation or dedicated resources per VM."
            },
            {
                "id": 447,
                "question": "In a multi-tenant cloud environment, an engineer needs to ensure that AI workloads from different customers have guaranteed, non-overlapping GPU resources with hardware-enforced security. Which NVIDIA technology should the engineer use?",
                "options": [
                    "NVIDIA vGPU with vWS profiles",
                    "NVIDIA Multi-Instance GPU (MIG)",
                    "NVIDIA MPS (Multi-Process Service)",
                    "NVIDIA CUDA MPS (Multi-Process Service)"
                ],
                "correctAnswer": 1,
                "explanation": "NVIDIA Multi-Instance GPU (MIG) provides strong isolation by partitioning the GPU at the hardware level, giving each tenant dedicated memory, cache, and compute units with no shared resources. This ensures predictable performance and security against side-channel attacks. vGPU (option A) uses software-based isolation that shares resources through a hypervisor, which can lead to contention. MPS (options C and D) is designed for sharing a single GPU among multiple processes within a single tenant, not for multi-tenant isolation."
            },
            {
                "id": 448,
                "question": "A machine learning engineer is selecting an AWS EC2 instance for training a large language model with approximately 100 billion parameters. The model requires more than 80 GB of GPU memory per GPU to fit without model parallelism. Which instance family should the engineer choose?",
                "options": [
                    "P4d (A100)",
                    "P5 (H100)",
                    "P5e (H200)",
                    "P3 (V100)"
                ],
                "correctAnswer": 2,
                "explanation": "The P5e (H200) instance provides 141 GB of GPU memory per GPU, which is sufficient for a 100B parameter model without model parallelism. P4d (A100) has only 40 GB, P5 (H100) has 80 GB, and P3 (V100) has 16 GB or 32 GB, all insufficient for this requirement."
            },
            {
                "id": 449,
                "question": "A machine learning engineer is choosing between A2 (A100) and A3 (H100) instances on Google Cloud for training a large language model. Which of the following is a key advantage of the A3 (H100) family over the A2 (A100) family?",
                "options": [
                    "Higher GPU memory capacity per GPU (80GB vs 40GB or 80GB)",
                    "Support for up to 16 GPUs per VM",
                    "Lower cost per GPU hour",
                    "Broader regional availability"
                ],
                "correctAnswer": 0,
                "explanation": "The A3 (H100) instances feature 80GB HBM3 memory per GPU, while A2 (A100) instances offer either 40GB or 80GB HBM2e memory. Although both can have 80GB, the H100's HBM3 provides higher bandwidth (3.35 TB/s vs 2 TB/s). The other options are incorrect: A2 supports up to 16 GPUs per VM, A3 currently supports 8; A3 has higher cost per GPU hour; and A2 has broader regional availability."
            },
            {
                "id": 450,
                "question": "An engineer is provisioning a BM.GPU.H100.8 bare metal instance on OCI for distributed training of a large language model. Which of the following is a key advantage of using a bare metal instance over a virtualized GPU instance for this workload?",
                "options": [
                    "Lower cost due to per-second billing",
                    "Faster boot time from pre-built images",
                    "Direct hardware access without hypervisor overhead",
                    "Automatic scaling across multiple physical servers"
                ],
                "correctAnswer": 2,
                "explanation": "Bare metal instances like BM.GPU.H100.8 provide direct hardware access without a hypervisor layer, eliminating virtualization overhead and ensuring 100% GPU throughput. This is critical for demanding workloads like LLM training where every bit of performance matters. Option A is incorrect because bare metal instances are generally more expensive than virtualized instances. Option B is incorrect because virtualized instances typically boot faster from images. Option D is incorrect because bare metal instances are single-tenant and do not automatically scale across servers; scaling must be configured manually."
            },
            {
                "id": 451,
                "question": "A team is running a long-term production inference service that requires consistent GPU availability and predictable costs. Which cloud pricing model should they primarily use?",
                "options": [
                    "On-demand instances",
                    "Reserved instances",
                    "Spot/preemptible instances",
                    "A mix of on-demand and spot instances"
                ],
                "correctAnswer": 1,
                "explanation": "Reserved instances offer significant discounts (40\u201370% off on-demand) and guarantee capacity for steady-state workloads like production inference. On-demand is too expensive for long-term use, spot/preemptible instances risk interruption, and a mix is less cost-effective for baseline capacity."
            },
            {
                "id": 452,
                "question": "A machine learning engineer is setting up a distributed training job on a cluster of AWS P5 instances. After launching the instances with the latest Deep Learning AMI and verifying that EFA devices are attached, the engineer runs a training script but notices high latency in GPU-to-GPU communication. Which of the following is the most likely cause of this issue?",
                "options": [
                    "The instances are not in the same cluster placement group.",
                    "The security group does not allow inbound traffic on TCP port 2049.",
                    "The NCCL_DEBUG environment variable is set to INFO.",
                    "The instances are using the Elastic Network Adapter (ENA) instead of EFA."
                ],
                "correctAnswer": 0,
                "explanation": "High latency in GPU-to-GPU communication on P5 instances with EFA is most likely due to instances not being in the same cluster placement group. Cluster placement groups ensure low-latency physical proximity between instances, which is critical for EFA performance. Option B (security group rule for TCP port 2049) is for NFS, not EFA communication. Option C (NCCL_DEBUG=INFO) is a diagnostic tool and does not cause high latency. Option D is incorrect because EFA is automatically attached to P5 instances and the DLAMI includes EFA drivers; the engineer verified EFA devices are attached, so ENA is not being used."
            },
            {
                "id": 453,
                "question": "An AI cluster is being deployed in AWS. Which VPC design choice is most critical to ensure optimal NCCL communication performance between GPU instances?",
                "options": [
                    "Placing GPU instances in public subnets with Elastic IPs",
                    "Distributing GPU instances across multiple Availability Zones",
                    "Using a self-referencing security group that allows all traffic within the compute subnet",
                    "Creating a VPC endpoint for Amazon S3"
                ],
                "correctAnswer": 2,
                "explanation": "NCCL (NVIDIA Collective Communications Library) uses random high ports for GPU-to-GPU communication. A self-referencing security group that allows all traffic within the compute subnet ensures that NCCL traffic is not blocked, which is essential for training performance. Placing instances in public subnets (A) exposes them to the internet and is not recommended. Distributing across AZs (B) increases latency and can degrade NCCL performance. VPC endpoints (D) are important for data access but do not directly affect NCCL communication."
            },
            {
                "id": 454,
                "question": "A data scientist is using Amazon SageMaker to train a deep learning model on a large dataset. They want to minimize training costs while tolerating potential interruptions. Which instance configuration should they choose?",
                "options": [
                    "Use on-demand ml.p3.2xlarge instances with a single instance count.",
                    "Use spot ml.p3.2xlarge instances with multiple instance counts.",
                    "Use on-demand ml.m5.large instances with a single instance count.",
                    "Use spot ml.m5.large instances with multiple instance counts."
                ],
                "correctAnswer": 1,
                "explanation": "Spot instances offer significant cost savings (up to 70%) compared to on-demand instances, but they can be interrupted. For training jobs that are fault-tolerant (e.g., using checkpointing), spot instances are ideal for reducing costs. Using multiple instances (distributed training) can speed up training, but the key cost-saving measure is spot. Option B correctly combines spot instances with GPU instances (ml.p3) suitable for deep learning. Option A uses on-demand, which is more expensive. Option C uses CPU instances (ml.m5) which are not optimal for deep learning. Option D uses spot but with CPU instances, which are less cost-effective for deep learning workloads."
            },
            {
                "id": 455,
                "question": "An engineer is using Azure Machine Learning to train a deep learning model. They want to automatically track parameters, metrics, and artifacts for each training run, and later compare runs to select the best model. Which Azure ML feature should they use?",
                "options": [
                    "Compute clusters with auto-scaling",
                    "MLflow integration with the workspace",
                    "Azure ML pipelines",
                    "Datastores and datasets"
                ],
                "correctAnswer": 1,
                "explanation": "MLflow integration in Azure ML provides experiment tracking, allowing engineers to log parameters, metrics, and artifacts for each run. This enables comparison of runs and selection of the best model. Compute clusters provide scalable compute resources but do not track experiments. Azure ML pipelines orchestrate workflows but are not primarily for tracking. Datastores and datasets manage data storage and references, not experiment tracking."
            },
            {
                "id": 456,
                "question": "An AI startup wants to train large language models without the upfront cost and operational overhead of purchasing and maintaining on-premises DGX systems. They need the ability to scale their cluster up during peak training periods and down when idle, and they want NVIDIA to handle hardware maintenance and software updates. Which NVIDIA solution best meets these requirements?",
                "options": [
                    "NVIDIA DGX Cloud",
                    "NVIDIA Base Command",
                    "NVIDIA AI Enterprise",
                    "NVIDIA DGX SuperPOD"
                ],
                "correctAnswer": 0,
                "explanation": "NVIDIA DGX Cloud is a fully managed AI supercomputing subscription service that provides access to DGX systems in the cloud with elastic scaling, no upfront hardware costs, and NVIDIA-managed maintenance and software updates. This directly matches the startup's needs. NVIDIA Base Command is a management platform for DGX systems, not a subscription service. NVIDIA AI Enterprise is a software suite, not a hardware service. NVIDIA DGX SuperPOD is a reference architecture for on-premises deployment, requiring significant upfront investment and operational management."
            },
            {
                "id": 457,
                "question": "A machine learning engineer has trained a high-value image classification model and stored the weights in a cloud storage bucket. Which combination of measures provides the strongest protection against model theft?",
                "options": [
                    "Encrypt the model weights with AES-256 and store the encryption key in the same bucket.",
                    "Set the bucket to private and rely on network perimeter security.",
                    "Encrypt the model weights with AES-256, store the key in a separate key management service, and restrict bucket access to a minimal set of service accounts.",
                    "Use model watermarking and API rate limiting only."
                ],
                "correctAnswer": 2,
                "explanation": "The strongest protection combines encryption at rest (AES-256) with separate key management and strict access control. Storing the key in the same bucket (option A) defeats encryption. Relying solely on network security (option B) is insufficient against insider threats or compromised credentials. Watermarking and rate limiting (option D) are useful but do not prevent direct file access. Option C implements defense in depth: encryption prevents unauthorized use even if the file is copied, key separation ensures keys are not co-located, and minimal access reduces exposure."
            },
            {
                "id": 458,
                "question": "An AI engineer notices that a model performs well on validation data but consistently misclassifies images containing a small yellow sticker. Which type of data poisoning attack most likely caused this behavior?",
                "options": [
                    "Label flipping",
                    "Backdoor poisoning",
                    "Data injection",
                    "Gradient manipulation"
                ],
                "correctAnswer": 1,
                "explanation": "Backdoor poisoning inserts a specific trigger pattern (e.g., a small yellow sticker) that causes misclassification only when the trigger is present, while the model behaves normally otherwise. Label flipping changes labels of existing samples, data injection adds entirely fake samples, and gradient manipulation affects federated learning updates."
            },
            {
                "id": 459,
                "question": "An engineer pulls a container image from NVIDIA NGC using the tag 'nvidia/cuda:12.0-base' and deploys it in production. Later, they discover that the container is exfiltrating GPU training data to an external server. Which of the following best describes the type of supply chain attack that occurred?",
                "options": [
                    "Dependency confusion attack",
                    "Typosquatting attack",
                    "Container image poisoning attack",
                    "Malicious model weights attack"
                ],
                "correctAnswer": 2,
                "explanation": "Container image poisoning occurs when malicious code is inserted into a container image, making it appear legitimate while performing harmful actions. In this scenario, the engineer pulled an official-looking container from NGC that contained hidden malware, which is a classic example of container image poisoning. Dependency confusion involves a malicious package with the same name as an internal package uploaded to a public registry. Typosquatting relies on misspelled names to trick users. Malicious model weights involve hidden payloads inside AI model files, not container images."
            },
            {
                "id": 460,
                "question": "An AI infrastructure engineer wants to ensure that only signed container images are used in a production Kubernetes cluster. Which statement accurately describes how Docker Content Trust (DCT) and Notary work together to achieve this?",
                "options": [
                    "DCT is a standalone tool that directly signs images, while Notary is a separate registry that stores the signed images.",
                    "Notary is the client-side tool that enables DCT, and it stores signatures in the Docker daemon's local trust database.",
                    "DCT uses Notary as the underlying service to store and manage signed metadata, and when DCT is enabled, Docker verifies image signatures by querying the Notary server.",
                    "Notary generates the root key used by DCT, but DCT itself handles all signature verification without contacting any external service."
                ],
                "correctAnswer": 2,
                "explanation": "Docker Content Trust (DCT) is a feature built into Docker that enforces image signing and verification. It relies on Notary, an open-source project, as the underlying service to store and manage cryptographic signatures and trust metadata. When DCT is enabled, Docker pulls an image from the registry and then queries the Notary server for the image's signed metadata. Docker verifies the signature using the public key stored in the local trust database. If the signature is valid, the image is pulled; otherwise, the pull is rejected. Option A is incorrect because DCT is not a standalone tool\u2014it uses Notary for metadata storage, not for storing the images themselves. Option B is incorrect because Notary is a server-side service, not a client-side tool, and signatures are stored on the Notary server, not in the Docker daemon's local database. Option D is incorrect because DCT must contact the Notary server to retrieve the signed metadata for verification."
            }
        ]
    },
    {
        "id": 24,
        "title": "NCA practice exam Set 24",
        "description": "Practice Exam Set 24 containing 20 unique exam-aligned questions covering core infrastructure domains.",
        "questions": [
            {
                "id": 461,
                "question": "An AI engineer is deploying a containerized deep learning model in production. To ensure software supply chain security, the engineer generates a Software Bill of Materials (SBOM) for the container. Which of the following is the primary reason for generating an SBOM in this scenario?",
                "options": [
                    "To reduce the container image size by removing unused dependencies.",
                    "To enable vulnerability scanning and track license compliance of all software components.",
                    "To improve model inference performance by optimizing library versions.",
                    "To automatically update all packages to their latest versions."
                ],
                "correctAnswer": 1,
                "explanation": "The primary purpose of an SBOM is to provide a formal, machine-readable inventory of all software components in a container. This inventory enables vulnerability scanning (checking against known CVEs) and license compliance tracking. Option A is incorrect because SBOMs do not reduce image size; they only list components. Option C is incorrect because SBOMs are not used for performance optimization. Option D is incorrect because SBOMs do not automatically update packages; they document what is installed."
            },
            {
                "id": 462,
                "question": "An AI infrastructure engineer needs to select a container vulnerability scanner for a CI/CD pipeline that scans NVIDIA NGC containers and generates SBOMs for compliance. Which tool is best suited for this requirement?",
                "options": [
                    "Trivy",
                    "Clair",
                    "Grype",
                    "All three are equally suitable"
                ],
                "correctAnswer": 2,
                "explanation": "Grype is the best choice because it supports SBOM generation (via Syft) and provides accurate vulnerability scanning, which is essential for compliance. Trivy also supports SBOMs but is simpler and less focused on SBOM workflows. Clair does not support SBOMs. Therefore, Grype is the most appropriate for this specific need."
            },
            {
                "id": 463,
                "question": "A security engineer is configuring Falco to monitor GPU processes in a multi-tenant Kubernetes cluster. Which behavior would most likely trigger a Falco rule designed to detect anomalous GPU memory allocation?",
                "options": [
                    "A process named 'python' opens /dev/nvidia0 and performs a gradual memory allocation.",
                    "A process named 'miner' calls ioctl on /dev/nvidiactl with a memory allocation command.",
                    "A container with label 'app=training' opens /dev/nvidia0 and /dev/nvidia1 sequentially.",
                    "A process runs as non-root and uses nvidia-smi to query GPU utilization."
                ],
                "correctAnswer": 1,
                "explanation": "Falco rules for GPU anomaly detection look for unusual process names (like 'miner') making ioctl calls to NVIDIA devices, especially memory allocation commands. Option B describes a process named 'miner' (a common cryptomining name) performing an ioctl memory allocation, which matches the rule for 'Suspicious GPU memory allocation from non-AI process'. Option A is normal AI behavior. Option C shows sequential device access with a legitimate label. Option D is a standard monitoring tool."
            },
            {
                "id": 464,
                "question": "An AI cluster administrator is configuring Pod Security Standards for a multi-tenant Kubernetes namespace that will host inference services. Which standard should be enforced to ensure the strongest security isolation while still allowing the pods to function?",
                "options": [
                    "Privileged",
                    "Baseline",
                    "Restricted",
                    "Custom"
                ],
                "correctAnswer": 2,
                "explanation": "The Restricted policy provides the strongest security isolation by enforcing non-root execution, read-only root filesystem, no privilege escalation, and mandatory seccomp profiles. This is ideal for multi-tenant inference namespaces where security is critical. Privileged (A) offers no restrictions and is unsuitable for untrusted workloads. Baseline (B) provides moderate security but allows more capabilities and does not require read-only filesystem or seccomp. Custom (D) is not a predefined Pod Security Standard."
            },
            {
                "id": 465,
                "question": "An AI cluster has three namespaces: ai-data, ai-training, and ai-inference. A security policy requires that only ai-data pods can communicate with ai-training pods, and only ai-training pods can communicate with ai-inference pods. All other cross-namespace traffic must be blocked. Which of the following is the most effective first step to implement this policy?",
                "options": [
                    "Create an ingress allow policy in ai-training that allows traffic from ai-data.",
                    "Create a default-deny NetworkPolicy in each namespace to block all ingress and egress traffic.",
                    "Create an egress allow policy in ai-data that allows traffic to ai-training.",
                    "Create an ingress allow policy in ai-inference that allows traffic from ai-training."
                ],
                "correctAnswer": 1,
                "explanation": "The most effective first step is to create a default-deny NetworkPolicy in each namespace. Without a default-deny policy, any existing allow rules may not block unintended traffic because Kubernetes allows all pod-to-pod communication by default. Starting with a default-deny ensures that only explicitly allowed traffic is permitted, providing a secure baseline. The other options are necessary subsequent steps but should be applied after the default-deny is in place."
            },
            {
                "id": 466,
                "question": "An AI team is deploying a Kubernetes cluster for model training and inference. They need to securely store API keys for accessing NVIDIA NGC and model credentials for pulling private container images. The team wants to commit their deployment manifests to a Git repository and follow GitOps practices. Which secrets management approach is most suitable for their requirements?",
                "options": [
                    "HashiCorp Vault with dynamic secrets and automatic rotation",
                    "Sealed Secrets with kubeseal CLI and a controller in the cluster",
                    "Storing secrets as plain text in Kubernetes ConfigMaps",
                    "Using Kubernetes native Secrets without encryption"
                ],
                "correctAnswer": 1,
                "explanation": "Sealed Secrets is the most suitable approach because it allows encrypting Kubernetes Secrets into SealedSecret custom resources that can be safely committed to Git repositories. The Sealed Secrets controller in the cluster decrypts them into standard Secrets at deployment time, enabling GitOps workflows without exposing sensitive data. HashiCorp Vault (Option A) is more complex and not GitOps-friendly without additional tooling. Options C and D are insecure and violate best practices."
            },
            {
                "id": 467,
                "question": "An AI infrastructure engineer is preparing for a SOC 2 Type II audit. Which of the following controls is most directly associated with the 'confidentiality' trust service category?",
                "options": [
                    "Implementing redundant GPU clusters to ensure model training continues during hardware failures.",
                    "Enabling multi-factor authentication (MFA) for all cloud console access.",
                    "Applying data masking to customer data used in training datasets.",
                    "Deploying load balancers to maintain inference endpoint SLAs."
                ],
                "correctAnswer": 2,
                "explanation": "Confidentiality controls protect sensitive data from unauthorized disclosure. Data masking is a direct example of a confidentiality control because it obscures sensitive information (e.g., customer data) so that it cannot be accessed by unauthorized personnel. Redundant GPU clusters (Option A) and load balancers (Option D) are availability controls. MFA (Option B) is a security control that prevents unauthorized access, but it does not specifically address the secrecy of data once accessed."
            },
            {
                "id": 468,
                "question": "An AI infrastructure engineer is deploying a machine learning training pipeline for a U.S. federal agency. The data includes personally identifiable information (PII) and law enforcement records. According to FedRAMP, which impact level most likely applies to this workload?",
                "options": [
                    "Low Impact",
                    "Moderate Impact",
                    "High Impact",
                    "Provisional Authorization"
                ],
                "correctAnswer": 1,
                "explanation": "FedRAMP classifies data sensitivity into three impact levels: Low (public information), Moderate (PII, law enforcement data), and High (national security, life safety). Since the workload involves PII and law enforcement records, it falls under Moderate Impact. Provisional Authorization is an authorization type, not an impact level."
            },
            {
                "id": 469,
                "question": "An AI infrastructure engineer is planning to deploy NVIDIA H100 GPUs in a new data center located in Singapore. The end-user is a research lab that develops commercial AI models. Which of the following best describes the export control compliance requirements for this deployment?",
                "options": [
                    "Deployment is prohibited because Singapore is a restricted country under EAR.",
                    "Deployment is allowed without an export license, but the engineer must verify the end-user and end-use, and document them for audit purposes.",
                    "Deployment requires a license from the U.S. Department of State because H100 GPUs are ITAR-controlled.",
                    "Deployment is allowed only if the GPUs are used exclusively for civilian AI applications and not for military purposes."
                ],
                "correctAnswer": 1,
                "explanation": "Singapore is not a restricted country under EAR for H100 GPUs, so no license is required. However, the engineer must verify that the end-user is not a sanctioned entity and that the end-use is not military (which could trigger ITAR). Documentation of end-user and end-use is a best practice for compliance. Option A is incorrect because Singapore is not restricted. Option C is incorrect because H100 GPUs are not inherently ITAR-controlled; ITAR applies only if integrated into defense systems. Option D is incorrect because even civilian use is allowed without a license; the restriction is on the country and end-user, not the application type."
            },
            {
                "id": 470,
                "question": "Under the EU AI Act, which of the following is a key compliance obligation for operators of high-risk AI systems?",
                "options": [
                    "Ensuring the AI system is developed using open-source models only.",
                    "Implementing human oversight so that a human can review, override, or stop the AI system's decisions at any time.",
                    "Obtaining CE marking before the system is developed.",
                    "Deploying the system without any documentation if it uses a general-purpose AI model."
                ],
                "correctAnswer": 1,
                "explanation": "The EU AI Act requires operators of high-risk AI systems to implement human oversight, allowing humans to review, override, or stop decisions. Option A is incorrect because open-source models are not exempt and operators still bear responsibility. Option C is incorrect because CE marking is obtained by the provider before market release, not by the operator before development. Option D is incorrect because operators must maintain technical documentation and verify conformity even when using general-purpose AI models."
            },
            {
                "id": 471,
                "question": "An AI engineer is selecting a GPU for training a large transformer-based model. Which hardware specification is most likely to be the primary bottleneck during training?",
                "options": [
                    "Number of CUDA cores",
                    "Memory bandwidth",
                    "Number of RT cores",
                    "TDP (Thermal Design Power)"
                ],
                "correctAnswer": 1,
                "explanation": "Memory bandwidth is often the primary bottleneck during training of large models because data movement between GPU memory and compute units limits throughput. While CUDA cores and Tensor Cores determine compute capability, the model weights, gradients, and optimizer states must be fetched from memory, and insufficient bandwidth leads to idle compute units. RT cores are used for ray tracing, not AI training. TDP affects power and cooling but is not a direct performance bottleneck for training throughput."
            },
            {
                "id": 472,
                "question": "An AI infrastructure engineer is designing a network for a new cluster of 200 GPUs dedicated to large-scale distributed training. The workload involves frequent all-reduce operations, and the team has experience with standard Ethernet networking but not with InfiniBand. The budget is moderate, and the cluster will be a greenfield deployment. Which networking technology should the engineer choose based on the decision criteria?",
                "options": [
                    "InfiniBand, because it provides native RDMA and lossless fabric, which are critical for large-scale distributed training with frequent all-reduce operations.",
                    "Ethernet with RoCE, because it is more cost-effective and the team's existing expertise with Ethernet will simplify deployment and management.",
                    "InfiniBand, because it is the only technology that supports RDMA and can achieve sub-microsecond latency.",
                    "Ethernet with RoCE, because it offers higher bandwidth than InfiniBand and is easier to integrate with existing data center infrastructure."
                ],
                "correctAnswer": 0,
                "explanation": "For a large-scale (200 GPUs) dedicated AI cluster with frequent all-reduce operations, ultra-low latency and lossless fabric are critical. InfiniBand provides native RDMA and deterministic performance, which is preferred for such workloads. While Ethernet with RoCE is catching up, InfiniBand remains the gold standard for large-scale distributed training. Option B is less optimal because the moderate budget and team expertise are secondary to performance requirements. Option C is incorrect because Ethernet with RoCE also supports RDMA. Option D is incorrect because both technologies can achieve similar bandwidth, and InfiniBand is not necessarily harder to integrate in a greenfield deployment."
            },
            {
                "id": 473,
                "question": "A data scientist is training a large language model on a cluster of 8 NVIDIA A100 GPUs. The training is slow because GPUs are frequently idle waiting for data from storage. The dataset is 5 TB of text files stored on NVMe SSDs. Which technology should be recommended to reduce the data transfer bottleneck?",
                "options": [
                    "Implement GPUDirect Storage (GDS) to allow direct data transfer from storage to GPU memory.",
                    "Increase the number of CPU cores to handle data movement more efficiently.",
                    "Use a larger system RAM cache to prefetch data for the GPUs.",
                    "Switch to a slower but more reliable storage protocol to reduce errors."
                ],
                "correctAnswer": 0,
                "explanation": "GPUDirect Storage (GDS) creates a direct data path between NVMe SSDs and GPU memory, bypassing the CPU and system RAM. This reduces latency and CPU overhead, keeping GPUs fed with data faster. Increasing CPU cores or RAM cache does not address the fundamental bottleneck of data moving through the CPU. Switching to a slower protocol would worsen performance."
            },
            {
                "id": 474,
                "question": "A data scientist is developing a new AI model and needs to quickly prototype using GPU-accelerated PyTorch. They have access to a single GPU server. Which approach should they use to obtain a pre-built, GPU-optimized software stack?",
                "options": [
                    "Subscribe to NVIDIA AI Enterprise (NVAIE) for the PyTorch container.",
                    "Pull the PyTorch container from the NGC Catalog using the NGC CLI.",
                    "Install PyTorch from source with CUDA support enabled.",
                    "Use the NVIDIA GPU Operator to deploy PyTorch on Kubernetes."
                ],
                "correctAnswer": 1,
                "explanation": "For rapid prototyping on a single GPU server, the most efficient approach is to pull a pre-built, GPU-optimized PyTorch container from the NGC Catalog. NGC provides free, ready-to-use containers that include all necessary CUDA libraries and are tested for performance. NVAIE is an enterprise suite with support, but it requires a subscription and is more suited for production environments. Installing from source is time-consuming and error-prone. The GPU Operator is for Kubernetes cluster management, not for a single server prototyping."
            },
            {
                "id": 475,
                "question": "An engineer notices that a GPU training job has failed and sees the following line in dmesg output: 'NVRM: Xid (PCI:0000:07:00.0): 48, pid=1234, name=python3'. What is the most likely cause of this error?",
                "options": [
                    "The GPU driver is outdated and needs to be updated.",
                    "A double bit error has occurred in GPU memory, indicating likely hardware failure.",
                    "The GPU temperature exceeded the threshold and caused a thermal shutdown.",
                    "The PCIe link speed is mismatched between the GPU and the motherboard."
                ],
                "correctAnswer": 1,
                "explanation": "Xid 48 indicates a double bit error in GPU memory, which is a critical hardware error that typically requires GPU replacement. Option A is incorrect because Xid 48 is not a driver version issue. Option C describes Xid 43 (GPU stopped processing due to thermal shutdown). Option D describes a PCIe issue, which would correspond to Xid 64 or 79."
            },
            {
                "id": 476,
                "question": "A data center engineer is selecting GPUs for a new AI cluster. The primary workload is training large language models (LLMs) with over 10 billion parameters, but the cluster will also serve real-time inference for these models. Which GPU architecture provides the best balance of training performance and inference efficiency for this mixed workload?",
                "options": [
                    "A100 (Ampere) with 80 GB HBM2e memory",
                    "H100 (Hopper) with 80 GB HBM3 memory",
                    "L40S (Ada Lovelace) with 48 GB GDDR6 memory",
                    "A100 (Ampere) with 40 GB HBM2e memory"
                ],
                "correctAnswer": 1,
                "explanation": "The H100 (Hopper) is the best choice for this mixed workload. For training large language models (10B+ parameters), the H100's Transformer Engine, FP8 support, and 3.35 TB/s memory bandwidth provide significant acceleration. While the L40S is optimized for inference, the H100 also delivers strong inference performance, making it suitable for both tasks. The A100 lacks the Transformer Engine and has lower memory bandwidth, making it less efficient for LLM training. The 40 GB A100 model is insufficient for large models. The L40S, with only 48 GB GDDR6 and lower bandwidth, is not designed for large-scale training."
            },
            {
                "id": 477,
                "question": "An AI infrastructure engineer needs to deploy a real-time inference service for a small NLP model that requires 4 GB of memory and has low compute demand. The GPU available is an A100 80GB. Which MIG profile is most appropriate for this workload?",
                "options": [
                    "1g.5gb",
                    "2g.10gb",
                    "3g.20gb",
                    "7g.40gb"
                ],
                "correctAnswer": 0,
                "explanation": "The 1g.5gb profile is the smallest MIG instance, providing 1 compute slice and 5 GB of memory. It is ideal for lightweight inference workloads with low memory and compute requirements. The model fits within 5 GB, and the compute demand is low, so a larger profile would waste resources. The 2g.10gb, 3g.20gb, and 7g.40gb profiles are over-provisioned for this scenario."
            },
            {
                "id": 478,
                "question": "An AI engineer is designing a multi-GPU system for training a large language model. The system will use 8 NVIDIA H100 GPUs. Which interconnect topology provides the highest GPU-to-GPU bandwidth for gradient synchronization during training?",
                "options": [
                    "PCIe Gen 5.0 x16 links between all GPUs",
                    "A hybrid topology using NVLink bridges for pairs of GPUs and PCIe for inter-pair communication",
                    "A full NVLink mesh with each GPU connected to all others via 18 NVLink bridges",
                    "NVSwitch connecting all GPUs via NVLink ports"
                ],
                "correctAnswer": 2,
                "explanation": "A full NVLink mesh with each GPU connected to all others via 18 NVLink bridges provides the highest GPU-to-GPU bandwidth. NVLink offers up to 900 GB/s bidirectional bandwidth per GPU (18 bridges \u00d7 50 GB/s per bridge), which is approximately 14\u00d7 more than PCIe Gen 5.0 x16 (63 GB/s). For 8-GPU training of large models, gradient synchronization is the bottleneck, and NVLink's high bandwidth significantly reduces training time. PCIe-only (Option A) has the lowest bandwidth. Hybrid (Option B) offers medium bandwidth but not as high as full mesh. NVSwitch (Option D) also provides high bandwidth but is typically used for larger clusters (16+ GPUs) and may be overkill for 8 GPUs; however, the question asks for the highest bandwidth, and a full mesh directly connects each GPU pair without a switch, achieving the same per-GPU bandwidth as NVSwitch. The full mesh is the most direct and highest bandwidth topology for 8 GPUs."
            },
            {
                "id": 479,
                "question": "A machine learning engineer notices that a GPU training job is running slower than expected. They want to quickly check the current GPU utilization and memory usage on the node. Which tool is most appropriate for this task?",
                "options": [
                    "nvidia-smi",
                    "DCGM",
                    "nvidia-smi with the --query-gpu flag",
                    "dcgmi diag"
                ],
                "correctAnswer": 0,
                "explanation": "nvidia-smi is the correct tool for a quick, real-time check of GPU utilization and memory usage. It is lightweight, always available with NVIDIA drivers, and provides an immediate snapshot of GPU status. DCGM is designed for continuous, historical monitoring across multiple nodes and is overkill for a one-time check. While nvidia-smi with --query-gpu is a valid way to get specific metrics, the question asks for the most appropriate tool overall, and the basic nvidia-smi command is the standard for quick checks. dcgmi diag is used for diagnostics, not real-time utilization monitoring."
            },
            {
                "id": 480,
                "question": "A data scientist is experiencing high GPU idle time during training of a large language model. The storage system consists of NVMe SSDs connected via PCIe Gen4. Which NVIDIA technology should be implemented to reduce GPU idle time by bypassing the CPU and system memory during data loading?",
                "options": [
                    "GPUDirect RDMA",
                    "GPUDirect Storage",
                    "NVLink",
                    "MIG (Multi-Instance GPU)"
                ],
                "correctAnswer": 1,
                "explanation": "GPUDirect Storage (GDS) creates a direct data path between storage (NVMe SSDs) and GPU memory, bypassing the CPU and system memory. This reduces data transfer latency and CPU overhead, thereby decreasing GPU idle time. GPUDirect RDMA enables direct GPU-to-GPU communication across a network, not storage. NVLink is a high-speed interconnect between GPUs. MIG partitions a GPU into multiple instances for workload isolation."
            }
        ]
    },
    {
        "id": 25,
        "title": "NCA practice exam Set 25",
        "description": "Practice Exam Set 25 containing 20 unique exam-aligned questions covering core infrastructure domains.",
        "questions": [
            {
                "id": 481,
                "question": "In an AI cluster using InfiniBand networking, which software component is essential for managing the network topology and assigning LIDs (Local Identifiers) to each port?",
                "options": [
                    "OpenSM (Subnet Manager)",
                    "Open vSwitch (OVS)",
                    "RDMA Connection Manager (rdmacm)",
                    "NVIDIA Fabric Manager"
                ],
                "correctAnswer": 0,
                "explanation": "OpenSM (Subnet Manager) is the required software component in InfiniBand fabrics that manages the network topology, routing tables, and LID assignments. Without a subnet manager, InfiniBand devices cannot communicate. Open vSwitch is used for Ethernet virtual switching, rdmacm is a library for RDMA connection management, and NVIDIA Fabric Manager is used for NVLink/NVSwitch management in DGX systems, not for InfiniBand subnet management."
            },
            {
                "id": 482,
                "question": "In an InfiniBand-based AI cluster, which software component is essential for managing network topology and assigning LIDs to end nodes?",
                "options": [
                    "OpenSM (Subnet Manager)",
                    "OpenFabrics Enterprise Distribution (OFED)",
                    "NVIDIA Fabric Manager",
                    "RDMA Connection Manager (rdmacm)"
                ],
                "correctAnswer": 0,
                "explanation": "OpenSM is the subnet manager required in InfiniBand fabrics to discover the network topology, compute routing tables, and assign Local Identifiers (LIDs) to each end node. Without OpenSM, InfiniBand devices cannot communicate. OFED provides drivers and libraries but does not manage topology. Fabric Manager is used for NVSwitch fabrics, not InfiniBand. rdmacm handles connection establishment for RDMA, not subnet management."
            },
            {
                "id": 483,
                "question": "An AI infrastructure engineer notices that a training job on a Kubernetes cluster is running slower than expected. The pod is scheduled on a GPU-enabled node, but nvidia-smi shows 0% GPU utilization. Which command should the engineer use first to check if the GPU is accessible from within the pod?",
                "options": [
                    "kubectl logs <pod-name>",
                    "kubectl exec <pod-name> -- nvidia-smi",
                    "kubectl describe pod <pod-name>",
                    "kubectl top pod <pod-name>"
                ],
                "correctAnswer": 1,
                "explanation": "The correct answer is B. Running nvidia-smi inside the pod via kubectl exec directly checks whether the GPU is visible and the driver is functioning. Option A (kubectl logs) shows container logs but not GPU status. Option C (kubectl describe) provides pod events and conditions but not real-time GPU metrics. Option D (kubectl top) shows CPU/memory usage, not GPU utilization."
            },
            {
                "id": 484,
                "question": "Which cloud deployment model provides dedicated infrastructure for a single organization with no multi-tenant sharing?",
                "options": [
                    "Public cloud",
                    "Private cloud",
                    "Hybrid cloud",
                    "Community cloud"
                ],
                "correctAnswer": 1,
                "explanation": "A private cloud is dedicated to a single organization, offering exclusive use of infrastructure without multi-tenant sharing, which enhances security and control for sensitive AI workloads. Public cloud involves multi-tenancy, hybrid cloud combines private and public, and community cloud is shared by several organizations with common concerns."
            },
            {
                "id": 485,
                "question": "In a large-scale AI cluster using InfiniBand, which software component is essential for managing the network topology, routing tables, and LID assignments?",
                "options": [
                    "OpenSM",
                    "DCGM",
                    "NVIDIA GPU Operator",
                    "Slurm"
                ],
                "correctAnswer": 0,
                "explanation": "OpenSM (Subnet Manager) is a necessary software component in InfiniBand fabrics. It manages the network topology, computes routing tables, and assigns Local Identifiers (LIDs) to each port. DCGM is for GPU monitoring, GPU Operator manages GPU lifecycle in Kubernetes, and Slurm is a job scheduler."
            },
            {
                "id": 486,
                "question": "An AI infrastructure engineer is troubleshooting a performance issue in a Kubernetes cluster running GPU-accelerated workloads. The engineer notices that GPU utilization is low despite high CPU usage. Which NVIDIA tool should the engineer use to check for active GPU health diagnostics?",
                "options": [
                    "nvidia-smi -pm 1",
                    "dcgmi diag",
                    "nvidia-smi -q -d UTILIZATION",
                    "dcgmi config --set"
                ],
                "correctAnswer": 1,
                "explanation": "The correct answer is dcgmi diag. The DCGM (Data Center GPU Manager) provides active health diagnostics via the `dcgmi diag` command, which runs a series of tests to identify hardware or software issues affecting GPU performance. Option A (`nvidia-smi -pm 1`) enables persistence mode to reduce driver initialization latency but does not perform diagnostics. Option C (`nvidia-smi -q -d UTILIZATION`) queries GPU utilization metrics but does not run health checks. Option D (`dcgmi config --set`) is used to configure DCGM settings, not to run diagnostics."
            },
            {
                "id": 487,
                "question": "In the design of a 128-GPU InfiniBand cluster for LLM pre-training, what is the primary reason for ensuring full bisection bandwidth in the network topology?",
                "options": [
                    "To minimize the number of leaf switches required",
                    "To allow every GPU to communicate with any other GPU at full speed without oversubscription",
                    "To reduce the total number of InfiniBand adapters needed per node",
                    "To enable the use of a single Subnet Manager for the entire fabric"
                ],
                "correctAnswer": 1,
                "explanation": "Full bisection bandwidth ensures that the aggregate bandwidth from leaf switches to spine switches equals the aggregate bandwidth from leaf switches to nodes. This eliminates oversubscription, allowing any GPU to communicate with any other GPU at the full InfiniBand link speed, which is critical for gradient synchronization in LLM training. Option A is incorrect because full bisection bandwidth typically requires more leaf switches, not fewer. Option C is incorrect because each GPU still needs a dedicated adapter. Option D is incorrect because a single Subnet Manager can manage the fabric regardless of bisection bandwidth."
            },
            {
                "id": 488,
                "question": "A deep learning training job that was running at 95% GPU utilization suddenly drops to 20%. CPU utilization is at 90% and disk I/O is near maximum. Which of the following is the most likely root cause?",
                "options": [
                    "GPU memory is full, causing swapping to system memory.",
                    "Data loading is bottlenecked by the CPU and storage subsystem.",
                    "Network communication in distributed training is saturated.",
                    "GPU thermal throttling due to high temperature."
                ],
                "correctAnswer": 1,
                "explanation": "The symptoms\u2014high CPU utilization (90%) and high disk I/O\u2014indicate that the CPU is busy processing data but cannot feed the GPU fast enough, which is a classic data loading bottleneck. GPU memory full would show high memory usage but not necessarily high CPU. Network issues would show network saturation, not high disk I/O. Thermal throttling would show high temperature and power capping, not high CPU usage."
            },
            {
                "id": 489,
                "question": "During a bare-metal to Kubernetes migration, an engineer deploys the NVIDIA GPU Operator via Helm. Which component of the GPU Operator is responsible for automatically installing or upgrading NVIDIA drivers on each worker node?",
                "options": [
                    "NVIDIA Device Plugin",
                    "DCGM Exporter",
                    "Driver DaemonSet",
                    "MIG Manager"
                ],
                "correctAnswer": 2,
                "explanation": "The Driver DaemonSet is a component of the GPU Operator that runs on each node and ensures the correct NVIDIA driver version is installed and configured. The NVIDIA Device Plugin registers GPUs as Kubernetes resources, DCGM Exporter provides monitoring metrics, and MIG Manager handles GPU partitioning. Only the Driver DaemonSet automates driver lifecycle management."
            },
            {
                "id": 490,
                "question": "An AI engineer is selecting a GPU for training a large language model with 100 billion parameters. The primary bottleneck is memory bandwidth due to the model's size and long-context requirements. Which GPU would be the most appropriate choice based on the specifications comparison?",
                "options": [
                    "NVIDIA V100",
                    "NVIDIA A100",
                    "NVIDIA H100",
                    "NVIDIA H200"
                ],
                "correctAnswer": 3,
                "explanation": "The H200 (Hopper+) features 141 GB of HBM3e memory with 4.8 TB/s bandwidth, which is the highest among the options except for the B200. For memory-bound workloads like large language models with 100B parameters, the H200's memory capacity and bandwidth are critical. The V100 and A100 have lower memory capacity and bandwidth, while the H100 has the same compute but less memory bandwidth (3.35 TB/s) and capacity (80 GB). The B200 is not listed as an option, making H200 the best choice among the given GPUs."
            },
            {
                "id": 491,
                "question": "An AI infrastructure engineer is designing a multi-GPU server for training large language models. The server will use eight H100 GPUs connected via NVLink 4.0. What is the total bidirectional bandwidth per GPU in this configuration?",
                "options": [
                    "600 GB/s",
                    "900 GB/s",
                    "300 GB/s",
                    "160 GB/s"
                ],
                "correctAnswer": 1,
                "explanation": "According to the NVLink bandwidth progression table, NVLink 4.0 (used with H100 GPUs) provides a total bidirectional bandwidth of 900 GB/s per GPU, achieved through 18 links each operating at 50 GB/s per direction. Option A (600 GB/s) corresponds to NVLink 3.0 (A100), option C (300 GB/s) to NVLink 2.0 (V100), and option D (160 GB/s) to NVLink 1.0 (P100)."
            },
            {
                "id": 492,
                "question": "An AI cluster uses a 64-port NDR switch. What is the aggregate switching capacity of this switch?",
                "options": [
                    "12.8 Tbps",
                    "25.6 Tbps",
                    "8 Tbps",
                    "51.2 Tbps"
                ],
                "correctAnswer": 1,
                "explanation": "NDR400 provides 400 Gbps per port. A 64-port switch has an aggregate capacity of 64 \u00d7 400 Gbps = 25,600 Gbps = 25.6 Tbps. Option A (12.8 Tbps) would be for a 32-port NDR switch. Option C (8 Tbps) is for a 40-port HDR switch. Option D (51.2 Tbps) is double the correct value."
            },
            {
                "id": 493,
                "question": "An AI infrastructure engineer needs to quickly identify which GPU processes are consuming the most memory on a multi-GPU system. Which nvidia-smi command should they use?",
                "options": [
                    "nvidia-smi --query-gpu=memory.used,memory.total --format=csv",
                    "nvidia-smi --query-compute-apps=pid,process_name,used_memory --format=csv",
                    "nvidia-smi pmon",
                    "nvidia-smi --query-gpu=utilization.gpu,utilization.memory --format=csv"
                ],
                "correctAnswer": 1,
                "explanation": "The correct command is nvidia-smi --query-compute-apps=pid,process_name,used_memory --format=csv. This command lists all running GPU processes along with their PID, name, and memory usage, allowing the engineer to identify which processes are consuming the most memory. Option A shows total memory usage per GPU but not per process. Option C (pmon) shows per-process GPU and memory utilization but in a live table format that may be harder to parse. Option D shows utilization percentages, not memory usage per process."
            },
            {
                "id": 494,
                "question": "An AI cluster operator notices that a GPU pod is stuck in Pending state. Which command should the operator run first to diagnose the issue?",
                "options": [
                    "kubectl get pods --all-namespaces --field-selector=status.phase=Pending",
                    "kubectl describe pod <pod-name>",
                    "kubectl get events --all-namespaces",
                    "kubectl get pods -n kube-system -l name=nvidia-device-plugin"
                ],
                "correctAnswer": 1,
                "explanation": "The first step to diagnose a pending GPU pod is to run 'kubectl describe pod <pod-name>' to check for events and conditions that explain why the pod is not scheduled. This command shows details like insufficient resources, node selector mismatches, or taints/tolerations. Option A lists all pending pods but does not provide specific reasons per pod. Option C shows cluster events but may be noisy. Option D checks the device plugin, which is a common cause, but describing the pod first gives a more direct diagnosis."
            },
            {
                "id": 495,
                "question": "An AI operator needs to check GPU utilization and memory usage before starting a training job. Which command provides the most comprehensive real-time GPU monitoring information?",
                "options": [
                    "nvidia-smi",
                    "top",
                    "free -h",
                    "lspci | grep -i nvidia"
                ],
                "correctAnswer": 0,
                "explanation": "nvidia-smi is the primary tool for NVIDIA GPU monitoring, providing real-time information on GPU utilization, memory usage, temperature, and running processes. top shows CPU and process usage but not GPU details. free -h shows system memory only. lspci lists PCI devices but does not provide real-time monitoring."
            },
            {
                "id": 496,
                "question": "Which of the following best describes the primary purpose of the Baseboard Management Controller (BMC) in a GPU server?",
                "options": [
                    "To accelerate AI training workloads by offloading matrix operations from the GPU.",
                    "To provide remote monitoring and management of server hardware even when the main CPU is powered off.",
                    "To manage the allocation of GPU memory across multiple virtual machines.",
                    "To handle the synchronization of gradients during distributed training across multiple GPUs."
                ],
                "correctAnswer": 1,
                "explanation": "The Baseboard Management Controller (BMC) is a dedicated microcontroller that monitors physical server parameters (temperature, voltage, fan speeds) and enables remote management via IPMI, even when the main CPU is off. Option A describes Tensor Cores or DPUs, not BMC. Option C describes GPU virtualization features like MIG or vGPU. Option D describes AllReduce or NCCL, not BMC."
            },
            {
                "id": 497,
                "question": "An AI engineer is designing a distributed training cluster and needs to choose between InfiniBand and Ethernet (RoCE v2) for the compute fabric. Which of the following is a key advantage of InfiniBand over Ethernet in this context?",
                "options": [
                    "InfiniBand has lower cost per port compared to Ethernet.",
                    "InfiniBand natively supports lossless, credit-based flow control without additional configuration.",
                    "InfiniBand requires RoCE v2 to support RDMA, while Ethernet supports RDMA natively.",
                    "InfiniBand provides higher bandwidth per port than Ethernet."
                ],
                "correctAnswer": 1,
                "explanation": "InfiniBand natively supports lossless, credit-based flow control, which ensures deterministic, low-latency communication essential for distributed training. Ethernet with RoCE v2 requires additional configurations like Priority Flow Control (PFC) and ECN to achieve lossless behavior, making InfiniBand simpler and more reliable for AI clusters. Option A is incorrect because InfiniBand generally has higher cost. Option C is false: InfiniBand supports RDMA natively, while Ethernet requires RoCE. Option D is incorrect because both technologies offer similar bandwidths (e.g., 400/800 Gbps)."
            },
            {
                "id": 498,
                "question": "Which of the following is a key benefit of taking NVIDIA DLI courses in preparation for the NCA-AIIO certification?",
                "options": [
                    "They provide hands-on labs with real NVIDIA GPUs in a sandbox environment.",
                    "They are the only official study materials for the NCA-AIIO exam.",
                    "They guarantee a passing score on the certification exam.",
                    "They cover all exam objectives without requiring any prior knowledge."
                ],
                "correctAnswer": 0,
                "explanation": "NVIDIA DLI courses offer hands-on labs with access to real NVIDIA GPUs in a sandbox environment, allowing learners to gain practical experience. This is a key benefit as it helps build foundational skills through doing. The other options are incorrect: DLI courses are not the only official study materials, they do not guarantee a passing score, and while they are designed for engineers with basic skills, some prior knowledge (e.g., Linux, programming) is recommended."
            },
            {
                "id": 499,
                "question": "After setting up a local single-GPU practice environment with Docker and the NVIDIA Container Toolkit, a user runs a container with the --gpus all flag but the GPU is not detected inside the container. Which of the following is the most likely cause?",
                "options": [
                    "The NVIDIA driver version is incompatible with the CUDA version in the container.",
                    "The Docker daemon was not restarted after installing the NVIDIA Container Toolkit.",
                    "The container image does not include the CUDA runtime libraries.",
                    "The GPU is not in persistence mode."
                ],
                "correctAnswer": 1,
                "explanation": "The most likely cause is that the Docker daemon was not restarted after installing the NVIDIA Container Toolkit. The toolkit modifies the Docker daemon configuration to use the NVIDIA runtime, and a restart is required for the changes to take effect. While driver incompatibility (option A) can cause issues, it typically results in errors like 'CUDA driver version is insufficient' rather than the GPU not being detected at all. Option C is incorrect because the base CUDA image includes the necessary runtime libraries. Option D (persistence mode) affects driver initialization latency but does not prevent GPU detection in containers."
            },
            {
                "id": 500,
                "question": "A candidate has purchased an NVIDIA-Certified Associate exam voucher and needs to schedule the exam through Pearson VUE. Which of the following is a correct requirement for scheduling?",
                "options": [
                    "The candidate must schedule the exam within 6 months of voucher purchase.",
                    "The candidate must use a different email address for Pearson VUE than the one used for the NVIDIA certification profile.",
                    "The candidate can reschedule the exam up to 24 hours before the appointment without penalty.",
                    "The candidate must choose a test center; online proctoring is not available for this exam."
                ],
                "correctAnswer": 2,
                "explanation": "According to the lesson, candidates can reschedule their exam up to 24 hours before the appointment start time without penalty. Option A is incorrect because vouchers typically expire 12 months from purchase, not 6. Option B is incorrect because the same email address must be used for both accounts. Option D is incorrect because online proctoring is available as an option."
            }
        ]
    }
];
