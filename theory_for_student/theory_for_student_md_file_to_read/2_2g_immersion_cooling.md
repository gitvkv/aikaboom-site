# 2.2g Immersion cooling: single-phase vs two-phase dielectric fluid

#### 🏷️ The Physical Realm — Data Center Foundations & Hardware Architecture > 2 Data Center Facility Operations > 2.2 Thermal Management — Keeping Petaflops Cool

---

## 🌊 Context Introduction

As AI workloads grow denser and more power-hungry, traditional air cooling struggles to keep up. Engineers are increasingly turning to **immersion cooling** — a method where servers are submerged in a non-conductive (dielectric) fluid. This approach removes heat far more efficiently than air, reduces fan noise, and allows for higher compute density.

There are two main types of immersion cooling: **single-phase** and **two-phase**. The key difference lies in how the dielectric fluid handles heat transfer.

---

## ⚙️ What Is Dielectric Fluid?

Dielectric fluid is a specially engineered liquid that:
- Does **not** conduct electricity, so it safely contacts electronics.
- Has high thermal conductivity to absorb heat from components.
- Is chemically stable and non-corrosive.

Common examples include synthetic oils (single-phase) and engineered fluorocarbons (two-phase).

---

## 🧊 Single-Phase Immersion Cooling

In single-phase cooling, the dielectric fluid **remains in liquid form** throughout the entire process.

**How it works:**
- Servers are fully submerged in a tank of dielectric fluid.
- Heat from components transfers directly into the fluid.
- The warmed fluid is pumped to a heat exchanger (e.g., a radiator or cooling tower).
- After cooling down, the fluid returns to the tank — no phase change occurs.

**Key characteristics:**
- ✅ Simpler system design — no vapor handling needed.
- ✅ Lower fluid cost compared to two-phase fluids.
- ✅ Easier maintenance and fluid replacement.
- ❌ Requires pumps and external heat rejection equipment.
- ❌ Fluid temperature must stay below its boiling point.

**Typical fluid temperature range:** 40°C to 60°C (104°F to 140°F)

---

## 💨 Two-Phase Immersion Cooling

In two-phase cooling, the dielectric fluid **boils** when it contacts hot components, turning into vapor. The vapor then condenses back into liquid.

**How it works:**
- Servers are submerged in a tank with a low-boiling-point dielectric fluid.
- Heat from components causes the fluid to boil (phase change from liquid to vapor).
- Vapor rises to the top of the tank, where it contacts a cooled condenser.
- The vapor condenses back into liquid (phase change from vapor to liquid).
- The liquid drips back into the tank — no pumps needed for circulation.

**Key characteristics:**
- ✅ Extremely efficient heat transfer (boiling absorbs large amounts of heat).
- ✅ No pumps required for fluid circulation (passive operation).
- ✅ Can handle very high heat densities (over 100 kW per rack).
- ❌ More expensive dielectric fluids (e.g., fluorocarbons).
- ❌ Requires careful vapor containment and condenser maintenance.
- ❌ Fluid loss can occur through evaporation or leaks.

**Typical fluid boiling point:** 34°C to 50°C (93°F to 122°F)

---

## 📊 Comparison Table: Single-Phase vs Two-Phase

| Feature | Single-Phase | Two-Phase |
|---------|--------------|-----------|
| **Phase change** | No (liquid stays liquid) | Yes (liquid boils to vapor, then condenses) |
| **Heat transfer efficiency** | Good | Excellent (due to latent heat of vaporization) |
| **Pump required** | Yes (for fluid circulation) | No (natural convection and condensation) |
| **Fluid cost** | Lower (synthetic oils) | Higher (engineered fluorocarbons) |
| **System complexity** | Moderate (pumps, heat exchangers) | Higher (vapor containment, condensers) |
| **Heat density capability** | Up to ~50 kW per rack | Over 100 kW per rack |
| **Maintenance** | Easier (fluid replacement) | More involved (vapor handling) |
| **Typical fluid temperature** | 40°C – 60°C | Boiling point ~34°C – 50°C |

---

## 🛠️ When to Use Each Approach

**Choose single-phase when:**
- You need a simpler, lower-cost solution.
- Heat densities are moderate (under 50 kW per rack).
- Maintenance simplicity is a priority.
- You have access to reliable pumps and heat exchangers.

**Choose two-phase when:**
- You are dealing with extremely high heat densities (e.g., next-gen GPUs).
- You want to eliminate pump energy and moving parts.
- You have budget for premium dielectric fluids.
- You can manage vapor containment and condenser systems.

---

## 🕵️ Real-World Considerations for Engineers

**Fluid compatibility:**
- Always verify that the dielectric fluid is compatible with server materials (e.g., plastics, seals, coatings).
- Some fluids can swell or degrade certain gaskets over time.

**Safety and handling:**
- Two-phase fluids may have lower toxicity but can be heavier than air — proper ventilation is critical.
- Single-phase oils are generally non-toxic but can be slippery and messy during maintenance.

**Leak detection:**
- For single-phase: Look for puddles or drops around pumps and fittings.
- For two-phase: Use vapor sensors and check condenser seals regularly.

**Cooling loop integration:**
- Both systems typically connect to a facility's chilled water loop or dry cooler.
- Single-phase requires a heat exchanger (e.g., plate-and-frame).
- Two-phase uses a condenser that may need its own cooling source.

---

## ✅ Summary

| Aspect | Single-Phase | Two-Phase |
|--------|--------------|-----------|
| **Fluid state** | Always liquid | Liquid ↔ Vapor |
| **Pumps** | Required | Not required |
| **Heat removal** | Sensible heat only | Latent heat (boiling) |
| **Best for** | Moderate density, lower cost | High density, maximum efficiency |

Both methods are proven for AI infrastructure. The choice depends on your heat density, budget, and operational comfort with phase-change systems. As AI compute continues to scale, immersion cooling — in either form — will become an essential tool in the engineer's thermal management toolkit.