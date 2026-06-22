# 2.4b CCTV, auditing, and chain-of-custody for hardware

#### 🏷️ The Physical Realm — Data Center Foundations & Hardware Architecture > 2 Data Center Facility Operations > 2.4 Physical Security & Access Control

---

## 🌐 Context Introduction

When you walk into a data center, you are entering one of the most secure environments on the planet. Physical security isn't just about locks and badges — it's about knowing exactly who was where, when, and what they touched. This topic covers three essential pillars of physical security: **CCTV** (closed-circuit television) for continuous monitoring, **auditing** for verifying access logs and events, and **chain-of-custody** for tracking hardware from arrival to decommissioning. For new engineers, think of this as the "paper trail" and "video evidence" that keeps the data center trustworthy.

---

## 📹 What is CCTV in a Data Center?

CCTV is the backbone of visual monitoring. It records every movement in and around the facility.

- **Purpose**: Deter unauthorized access, record incidents, and provide evidence for investigations.
- **Placement**: Cameras are positioned at all entry/exit points, server aisles, loading docks, and storage cages.
- **Retention**: Footage is typically kept for 30 to 90 days, depending on compliance requirements.
- **Types of cameras**:
  - Fixed cameras for constant monitoring of specific areas.
  - PTZ (pan-tilt-zoom) cameras for covering large, open spaces.
  - Thermal cameras for detecting body heat near restricted zones.

> 💡 **Key point**: CCTV is not just for catching bad actors — it also helps engineers prove that hardware was handled correctly during maintenance.

---

## 📋 What is Auditing in Physical Security?

Auditing is the process of reviewing logs, footage, and access records to verify that security policies were followed.

- **Access logs**: Every badge swipe, biometric scan, or door open event is recorded with a timestamp and user ID.
- **Video review**: Engineers or security teams cross-reference CCTV footage with access logs to confirm identities.
- **Compliance checks**: Audits ensure the data center meets standards like SOC 2, ISO 27001, or HIPAA.
- **Frequency**: Audits can be daily (spot checks), weekly (log reviews), or monthly (full reconciliation).

**Example of an audit finding**:
- **Issue**: A badge swipe at 3:00 AM for a server room that was not scheduled.
- **Action**: Security reviews CCTV footage to see if the person was authorized or if the badge was cloned.

---

## 🔗 What is Chain-of-Custody for Hardware?

Chain-of-custody is a documented trail that shows who handled a piece of hardware — from the moment it arrives at the loading dock until it is decommissioned or destroyed.

- **Why it matters**: It proves that hardware was not tampered with, swapped, or stolen during its lifecycle.
- **When it is used**:
  - Receiving new servers or storage devices.
  - Moving hardware between racks or cages.
  - Returning faulty equipment to vendors.
  - Destroying drives or decommissioning assets.

**Typical chain-of-custody steps**:
1. **Receiving**: Hardware is logged with serial number, date, and receiving engineer's signature.
2. **Staging**: Hardware is moved to a secure staging area — each movement is recorded.
3. **Installation**: The engineer who racks the hardware signs off on the location and time.
4. **Maintenance**: Any repair or replacement is logged with before-and-after photos.
5. **Decommissioning**: Drives are wiped or physically destroyed, and a certificate of destruction is issued.

---

## 🆚 Comparison: CCTV vs. Auditing vs. Chain-of-Custody

| Feature | CCTV | Auditing | Chain-of-Custody |
|---------|------|----------|------------------|
| **Primary purpose** | Visual recording | Verification of events | Tracking hardware ownership |
| **Data type** | Video footage | Logs, reports, timestamps | Signatures, serial numbers, dates |
| **Retention period** | 30–90 days | Permanent (log archives) | Until hardware is destroyed |
| **Who uses it** | Security team, investigators | Compliance officers, engineers | Engineers, asset managers |
| **Example** | Camera captures someone entering a cage | Log shows badge swipe at 2:00 PM | Paperwork shows drive was wiped on Jan 5 |

---

## 🕵️ Real-World Scenario for Engineers

Imagine you are tasked with replacing a failed hard drive in a secure server cage.

1. **Before entering**: Your badge swipe is logged, and CCTV records your entry.
2. **At the cage**: You sign a chain-of-custody form, noting the serial number of the old drive.
3. **During replacement**: You handle the drive on a clean, monitored bench — CCTV captures every move.
4. **After replacement**: You log the new drive's serial number and sign off on the form.
5. **Audit later**: A compliance officer reviews the CCTV footage, access logs, and chain-of-custody form to confirm the drive was not removed from the facility.

> ✅ **Result**: The data center can prove that the drive was properly handled and never left the secure zone.

---

## ⚠️ Common Pitfalls for New Engineers

- **Skipping the sign-off**: Always fill out chain-of-custody forms immediately — do not rely on memory.
- **Ignoring camera blind spots**: Know where cameras are and avoid handling sensitive hardware in unmonitored areas.
- **Assuming logs are enough**: Logs can be faked — always cross-reference with CCTV when possible.
- **Forgetting to log decommissioning**: A drive that is not logged as destroyed can be considered a security risk in an audit.

---

## ✅ Key Takeaways

- **CCTV** provides visual evidence of all physical movements in the data center.
- **Auditing** ensures that access logs and video footage match up to confirm proper behavior.
- **Chain-of-custody** creates a verifiable paper trail for every piece of hardware.
- These three systems work together to protect the integrity of the data center and its assets.
- As an engineer, your role is to follow procedures, document every action, and cooperate with audits.

---

*Next step: Review your data center's physical security policy and locate the nearest CCTV camera and chain-of-custody logbook during your next walkthrough.*