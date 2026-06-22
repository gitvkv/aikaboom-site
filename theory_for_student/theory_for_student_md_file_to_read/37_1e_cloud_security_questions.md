# 37.1e Parts X–XI: Cloud and Security — 40 questions with rationales

#### 🏷️ The Exam Preparation & Certification Mastery > 37 Comprehensive Practice Assessments > 37.1 Domain Practice Quiz Bank (350+ Questions)

Welcome, new engineer! This section covers two critical domains for the NVIDIA-Certified Associate: AI Infrastructure and Operations exam. **Cloud** focuses on deploying and managing AI workloads in cloud environments, while **Security** addresses protecting data, models, and infrastructure. Below are 40 practice questions with rationales to help you build foundational knowledge.

---

## ⚙️ Part X: Cloud — 20 Questions

### 📊 Cloud Deployment Models (5 Questions)

1. **Question:** Which cloud deployment model provides dedicated infrastructure for a single organization with no multi-tenant sharing?  
   **Rationale:** Private cloud offers exclusive use, enhancing security and control for sensitive AI workloads.

2. **Question:** What is the primary advantage of a hybrid cloud for AI workloads?  
   **Rationale:** It combines on-premises control with cloud scalability, ideal for burst training or data sovereignty.

3. **Question:** In a public cloud, who is responsible for securing the physical data center?  
   **Rationale:** The cloud provider handles physical security; the customer secures their data and applications.

4. **Question:** Which model uses a pay-as-you-go pricing structure for GPU instances?  
   **Rationale:** Public cloud offers on-demand pricing, reducing upfront costs for AI experimentation.

5. **Question:** What is a key security concern with multi-tenant cloud environments?  
   **Rationale:** Data isolation between tenants must be enforced to prevent unauthorized access.

---

### 🛠️ Cloud Services for AI (5 Questions)

6. **Question:** Which cloud service provides managed GPU clusters for training large models?  
   **Rationale:** Services like NVIDIA DGX Cloud offer pre-configured, scalable GPU infrastructure.

7. **Question:** What is the purpose of a cloud object storage service in AI pipelines?  
   **Rationale:** It stores datasets, model artifacts, and logs with high durability and accessibility.

8. **Question:** Which service enables serverless inference for trained models?  
   **Rationale:** Managed inference endpoints automatically scale based on request volume.

9. **Question:** How does a cloud load balancer benefit distributed AI training?  
   **Rationale:** It distributes traffic across GPU nodes, optimizing resource utilization.

10. **Question:** What is a cloud virtual private cloud (VPC) used for in AI deployments?  
    **Rationale:** It provides isolated network segments for secure communication between AI components.

---

### 📈 Cost and Resource Management (5 Questions)

11. **Question:** Which pricing model is best for long-running AI training jobs?  
    **Rationale:** Reserved instances offer lower costs for predictable, continuous workloads.

12. **Question:** What tool helps monitor GPU utilization in the cloud?  
    **Rationale:** Cloud monitoring dashboards track metrics like memory usage and temperature.

13. **Question:** How can you reduce costs for non-critical AI experiments?  
    **Rationale:** Use preemptible or spot instances, which are cheaper but can be terminated.

14. **Question:** What is the purpose of auto-scaling in cloud AI infrastructure?  
    **Rationale:** It dynamically adjusts resources based on workload demand, avoiding over-provisioning.

15. **Question:** Which cloud feature allows tagging resources for cost allocation?  
    **Rationale:** Resource tags help track spending by project, team, or environment.

---

### 🔄 Data Transfer and Networking (5 Questions)

16. **Question:** What service accelerates data transfer to the cloud for large datasets?  
    **Rationale:** Services like AWS Snowball or Azure Data Box physically ship storage devices.

17. **Question:** Why is low-latency networking critical for distributed AI training?  
    **Rationale:** It reduces communication overhead between GPUs, speeding up synchronization.

18. **Question:** What is a cloud direct connect service used for?  
    **Rationale:** It establishes a dedicated private network link from on-premises to the cloud.

19. **Question:** How does a content delivery network (CDN) benefit AI inference?  
    **Rationale:** It caches model outputs near users, reducing latency for real-time applications.

20. **Question:** What protocol is commonly used for streaming data to cloud AI pipelines?  
    **Rationale:** Apache Kafka or similar message queues handle real-time data ingestion.

---

## 🕵️ Part XI: Security — 20 Questions

### 🔐 Data Protection (5 Questions)

21. **Question:** What is encryption at rest used for in AI systems?  
    **Rationale:** It protects stored data (datasets, models) from unauthorized access.

22. **Question:** Which encryption method secures data during transfer between cloud services?  
    **Rationale:** TLS/SSL encrypts data in transit, preventing interception.

23. **Question:** What is a data loss prevention (DLP) policy in AI workflows?  
    **Rationale:** It prevents sensitive data from being accidentally shared or leaked.

24. **Question:** How can you ensure compliance with data residency regulations?  
    **Rationale:** Deploy AI infrastructure in specific geographic regions to meet legal requirements.

25. **Question:** What is the purpose of a key management service (KMS)?  
    **Rationale:** It centrally manages encryption keys for cloud resources.

---

### 🛡️ Access Control (5 Questions)

26. **Question:** What is the principle of least privilege in AI infrastructure?  
    **Rationale:** Users and services get only the permissions needed to perform their tasks.

27. **Question:** Which authentication method is recommended for API access to AI services?  
    **Rationale:** OAuth 2.0 tokens provide secure, scoped access without sharing passwords.

28. **Question:** What is a role-based access control (RBAC) policy?  
    **Rationale:** It assigns permissions based on job functions (e.g., data scientist vs. admin).

29. **Question:** How can you secure access to a cloud GPU instance?  
    **Rationale:** Use SSH keys instead of passwords, and restrict inbound traffic with security groups.

30. **Question:** What is multi-factor authentication (MFA) used for?  
    **Rationale:** It adds a second verification layer, reducing the risk of credential theft.

---

### 🧠 Model and Pipeline Security (5 Questions)

31. **Question:** What is model poisoning in AI security?  
    **Rationale:** Attackers inject malicious data during training to corrupt model behavior.

32. **Question:** How can you detect adversarial attacks on inference endpoints?  
    **Rationale:** Monitor input anomalies and use validation checks to flag suspicious requests.

33. **Question:** What is the purpose of a model registry with access controls?  
    **Rationale:** It version-controls models and restricts who can deploy or modify them.

34. **Question:** Why should you scan container images for vulnerabilities?  
    **Rationale:** Containers may contain outdated libraries that attackers can exploit.

35. **Question:** What is a secure enclave (TEE) used for in AI?  
    **Rationale:** It protects sensitive data and models during processing, even from the cloud provider.

---

### 📋 Compliance and Auditing (5 Questions)

36. **Question:** What is the purpose of audit logs in AI infrastructure?  
    **Rationale:** They track who accessed what and when, aiding in forensic investigations.

37. **Question:** Which compliance framework is common for healthcare AI workloads?  
    **Rationale:** HIPAA governs the handling of protected health information (PHI).

38. **Question:** How can you automate security compliance checks?  
    **Rationale:** Use cloud security posture management (CSPM) tools to scan configurations.

39. **Question:** What is a vulnerability assessment in AI systems?  
    **Rationale:** It identifies weaknesses in software, configurations, or dependencies.

40. **Question:** Why is regular patching important for AI infrastructure?  
    **Rationale:** It fixes known security flaws that attackers could exploit.

---

## 📊 Comparison Table: Cloud vs. On-Premises Security Responsibilities

| Aspect | Cloud (IaaS) | On-Premises |
|--------|--------------|-------------|
| Physical security | Provider-managed | Organization-managed |
| Data encryption | Customer-managed keys | Customer-managed keys |
| Network security | Shared responsibility | Full control |
| Compliance audits | Provider assists | Self-managed |
| Patching | Customer patches OS/apps | Customer patches everything |

---

## 🛠️ Key Takeaways for New Engineers

- **Cloud** enables scalable, cost-effective AI but requires careful resource management.
- **Security** must be integrated from the start — not added later.
- **Shared responsibility** means you secure data, access, and applications; the provider secures the infrastructure.
- **Automation** (e.g., monitoring, patching) reduces human error and improves compliance.

Keep these concepts in mind as you prepare for the certification. Practice with real cloud consoles and security tools to solidify your understanding. Good luck!