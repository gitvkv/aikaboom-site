# 5.3c Snapshots: point-in-time copies for backup before model updates

#### 🏷️ The Operating System Layer — Linux for AI Infrastructure Operators > 5 Storage & Resource Management for AI Workloads > 5.3 Logical Volume Management (LVM) — Flexible Storage Pools

---

## 📘 Context Introduction

When working with AI models, updates and retraining happen frequently. Before applying any change—whether it's a new model version, a configuration tweak, or a dataset replacement—you need a safety net. **Snapshots** in Logical Volume Management (LVM) provide exactly that: a **point-in-time copy** of your storage volume. Think of it like taking a photograph of your data at a specific moment. If something goes wrong during the update, you can instantly revert to that snapshot, avoiding costly downtime or data loss.

---

## ⚙️ What Is a Snapshot?

A snapshot is a **read-only or read-write copy** of a logical volume at a specific moment. It does not duplicate all data immediately. Instead, it tracks changes made after the snapshot was created. This makes snapshots:

- **Fast** to create (seconds, not hours)
- **Space-efficient** (only stores differences)
- **Reversible** (you can restore the original state)

---

## 🛠️ How Snapshots Work in AI Workflows

Before updating a model or dataset, engineers typically follow this pattern:

1. **Create a snapshot** of the volume containing the model files or training data.
2. **Apply the update** (e.g., replace model weights, modify configuration).
3. **Test the new model** for performance or accuracy.
4. **If successful** — delete the snapshot.
5. **If failed** — revert to the snapshot to restore the previous state.

This process protects against:
- Corrupted model files
- Incompatible dataset changes
- Accidental deletions during updates

---

## 📊 Snapshot Types Comparison

| Feature | Read-Only Snapshot | Read-Write Snapshot |
|---------|-------------------|---------------------|
| Can modify data after creation | ❌ No | ✅ Yes |
| Use case | Backup before update | Testing changes without affecting original |
| Storage growth | Fixed (only tracks original changes) | Grows as new data is written |
| Restore method | Replace original volume | Merge or discard changes |

---

## 🕵️ Key Concepts for New Engineers

- **Copy-on-Write (CoW)** — The snapshot does not copy data until the original volume changes. Only then does it store the old data.
- **Snapshot size** — Must be large enough to hold all changes made after creation. If it fills up, the snapshot becomes invalid.
- **Thin provisioning** — Snapshots work best with thin volumes, where space is allocated on demand.
- **Performance impact** — Heavy write activity on the original volume can slow down snapshot operations.

---

## 📝 Practical Workflow Example

**Scenario:** You are about to update a model stored on a logical volume named **ai_models**.

**Step 1 — Check current volume status**  
Engineers first verify the volume exists and has enough free space.  
For reference:  
```
lvdisplay /dev/vg_ai/ai_models
```  
📤 Output: Shows volume size, current usage, and status.

**Step 2 — Create a snapshot**  
A snapshot named **ai_models_snap** is created with enough space to track changes.  
For reference:  
```
lvcreate --size 10G --snapshot --name ai_models_snap /dev/vg_ai/ai_models
```  
📤 Output: Logical volume "ai_models_snap" created.

**Step 3 — Perform the model update**  
Replace the model files, update configurations, or run a training script.

**Step 4 — Test the new model**  
Run validation tests. If everything works, proceed to cleanup.

**Step 5 — Remove the snapshot**  
If the update is successful, delete the snapshot to free space.  
For reference:  
```
lvremove /dev/vg_ai/ai_models_snap
```  
📤 Output: Logical volume "ai_models_snap" successfully removed.

**Step 6 — Restore if needed**  
If the update fails, revert to the snapshot.  
For reference:  
```
lvconvert --merge /dev/vg_ai/ai_models_snap
```  
📤 Output: Snapshot merged, original volume restored.

---

## ✅ Best Practices for AI Workloads

- **Always snapshot before any model update** — even small changes can cause unexpected issues.
- **Allocate snapshot size based on expected changes** — for large dataset updates, allocate more space.
- **Monitor snapshot usage** — a full snapshot becomes unusable and can cause data loss.
- **Use descriptive snapshot names** — include timestamps or version numbers for easy identification.
- **Automate snapshot creation** — script the process to ensure consistency across updates.

---

## 🧠 Summary

Snapshots are a simple yet powerful tool for protecting AI infrastructure during model updates. They allow engineers to experiment confidently, knowing they can always roll back to a known good state. By integrating snapshots into your update workflow, you reduce risk and maintain data integrity—essential for reliable AI operations.