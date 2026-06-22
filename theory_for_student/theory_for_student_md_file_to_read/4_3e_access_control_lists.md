# 4.3e ACLs (Access Control Lists): getfacl and setfacl for granular control

#### 🏷️ The Operating System Layer — Linux for AI Infrastructure Operators > 4 Core Linux Administration for AI Operators > 4.3 Linux Permissions — Controlling Access to AI Resources

---

## 🌐 Context Introduction

In AI infrastructure, multiple users and automated processes often need to access the same datasets, model checkpoints, and configuration files. Standard Linux permissions (owner, group, others) are often too rigid. **Access Control Lists (ACLs)** give you fine-grained control by allowing you to set permissions for specific users or groups beyond the traditional three-tier model. This is essential when managing shared AI resources like training data directories or model registries.

---

## ⚙️ What Are ACLs?

ACLs extend the standard Linux permission model. Instead of only setting read, write, and execute for the file owner, a single group, and everyone else, ACLs let you define permissions for:

- **Individual users** (by username or UID)
- **Multiple groups** (by group name or GID)
- **Default permissions** for new files created inside a directory

This granularity is critical in AI workflows where, for example, a data scientist needs write access to a dataset, but a model evaluator only needs read access — and both are in different groups.

---

## 🛠️ Key Tools: getfacl and setfacl

Two commands are used to manage ACLs:

- **getfacl** — View the current ACLs on a file or directory.
- **setfacl** — Modify ACLs on a file or directory.

Both commands are part of the **acl** package, which is typically pre-installed on most Linux distributions used for AI infrastructure.

---

## 🕵️ Viewing ACLs with getfacl

Use **getfacl** to inspect the current permissions. The output shows:

- The file owner and owning group
- Standard permissions (owner, group, others)
- Any additional user or group entries
- Mask (the maximum effective permission for named users and groups)
- Default entries (if set on a directory)

For reference:

```
getfacl /data/training_set
```

📤 Output:  
**# file: /data/training_set**  
**# owner: alice**  
**# group: datascience**  
**user::rwx**  
**user:bob:r-x**  
**group::r-x**  
**mask::r-x**  
**other::---**

This shows that the user **bob** has read and execute access, even though the "others" permission is set to none.

---

## ✏️ Setting ACLs with setfacl

Use **setfacl** to add, modify, or remove ACL entries. The general pattern is:

- **setfacl -m** to modify (add or change an entry)
- **setfacl -x** to remove an entry
- **setfacl -b** to remove all ACL entries (revert to standard permissions)

### Common Use Cases for AI Infrastructure

| Use Case | Command Pattern | Explanation |
|----------|----------------|-------------|
| Grant a specific user read/write access | **setfacl -m u:charlie:rwx /data/model_v2** | User charlie gets full access to the model directory |
| Grant a group read-only access | **setfacl -m g:mlops:r-x /data/training_set** | The mlops group can list and read files |
| Remove a specific user's ACL entry | **setfacl -x u:charlie /data/model_v2** | Removes charlie's custom ACL entry |
| Set default ACLs for a directory | **setfacl -m d:u:alice:rwx /data/shared** | New files created in /data/shared will automatically give alice read/write/execute |
| Remove all ACLs | **setfacl -b /data/training_set** | Reverts to standard Unix permissions |

---

## 📊 Understanding the ACL Mask

The **mask** is a critical concept. It defines the maximum effective permissions for all named users and groups (not the file owner or the owning group). If the mask is **r-x**, then even if you set a user to **rwx**, their effective permissions will be **r-x**.

- The mask is automatically recalculated when you add or modify ACL entries.
- You can explicitly set the mask with **setfacl -m m::rwx**.

For reference:

```
setfacl -m m::rw /data/shared
```

This forces the mask to read-write, limiting all named users and groups to at most read and write (no execute).

---

## 🔁 Default ACLs for Directories

When working with AI datasets or model repositories, you often want new files to inherit specific permissions. **Default ACLs** (prefixed with **d:**) achieve this.

For reference:

```
setfacl -m d:u:deploy:rx /models/production
```

📤 Output:  
Any new file or directory created inside **/models/production** will automatically grant the user **deploy** read and execute permissions.

To view default ACLs, use **getfacl** on the directory. They appear as lines starting with **default:**.

---

## ✅ Best Practices for AI Infrastructure

- **Use ACLs sparingly** — Overusing ACLs can make permission management complex. Prefer standard group-based permissions when possible.
- **Document ACLs** — When you set custom ACLs, document them in your infrastructure notes or configuration management scripts.
- **Test with getfacl** — Always verify your ACL changes with **getfacl** before assuming they work.
- **Combine with umask** — Default ACLs interact with the system umask. Ensure your umask does not accidentally restrict ACL permissions.
- **Avoid ACLs on system binaries** — Only use ACLs on data directories, model stores, and configuration files — never on system executables.

---

## 🧪 Quick Reference: Common ACL Operations

| Operation | Command |
|-----------|---------|
| View ACLs | **getfacl filename** |
| Add user permission | **setfacl -m u:username:rwx filename** |
| Add group permission | **setfacl -m g:groupname:rx filename** |
| Remove user ACL | **setfacl -x u:username filename** |
| Set default ACL on directory | **setfacl -m d:u:username:rwx directory** |
| Remove all ACLs | **setfacl -b filename** |
| Set mask explicitly | **setfacl -m m::rx filename** |

---

## 📚 Summary

ACLs with **getfacl** and **setfacl** give you the precision needed to manage access in multi-user AI environments. By understanding how to view, set, and remove ACLs — including default ACLs and the mask — you can securely share datasets, models, and scripts without compromising security or operational flexibility. Start with simple use cases (granting one extra user access) and gradually adopt default ACLs for shared directories.