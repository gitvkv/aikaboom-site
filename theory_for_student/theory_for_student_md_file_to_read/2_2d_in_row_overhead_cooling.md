# 2.2d In-row and overhead cooling systems for high-density deployments

#### 🏷️ The Physical Realm — Data Center Foundations & Hardware Architecture > 2 Data Center Facility Operations > 2.2 Thermal Management — Keeping Petaflops Cool

---

## 🌡️ Context Introduction

As AI workloads like training large language models or running real-time inference scale up, the hardware generating the heat (GPUs, CPUs, memory modules) becomes incredibly dense. A single rack of NVIDIA DGX systems can consume 30–40 kW or more. Traditional raised-floor cooling (where cold air comes up through floor tiles) often cannot keep up with these "hot spots." This is where **in-row** and **overhead** cooling systems come into play. They bring the cooling source much closer to the heat source, allowing for higher density, better efficiency, and more predictable thermal management.

---

## ⚙️ What Are In-Row Cooling Systems?

In-row cooling units are placed directly between server racks in the same row. They capture hot exhaust air from the back of the racks, cool it, and then supply cold air to the front of the racks.

- **How it works:** Hot air exits the rear of the rack → enters the in-row cooler → passes over chilled water coils → cold air is blown out the front of the unit into the cold aisle.
- **Key benefit:** Very short air path, meaning less mixing of hot and cold air (higher efficiency).
- **Typical deployment:** Used in high-density zones where racks exceed 15–20 kW per rack.

---

## ☁️ What Are Overhead Cooling Systems?

Overhead cooling systems are mounted above the racks, typically in the ceiling plenum or suspended from the ceiling grid. They supply cold air downward directly into the cold aisle or use a ducted system.

- **How it works:** Chilled water or refrigerant flows through coils in the overhead unit → fans blow cold air down into the cold aisle → hot air rises naturally or is pulled back into the return plenum.
- **Key benefit:** Frees up floor space (no units on the data center floor) and allows for flexible rack layouts.
- **Typical deployment:** Used in retrofit scenarios or where floor space is at a premium.

---

## 🛠️ Comparison Table: In-Row vs. Overhead Cooling

| Feature | In-Row Cooling | Overhead Cooling |
|---------|----------------|------------------|
| **Placement** | Between racks in the row | Above racks (ceiling-mounted) |
| **Air path** | Short, direct (rear-to-front) | Vertical, downward (cold aisle) |
| **Floor space usage** | Occupies floor space between racks | Frees up all floor space |
| **Best for** | Very high density (20–50+ kW/rack) | Medium to high density (10–30 kW/rack) |
| **Installation complexity** | Moderate (requires chilled water piping to row) | Higher (requires ceiling structural support and ducting) |
| **Service access** | Easy (at floor level) | More difficult (requires ladder or lift) |
| **Retrofit friendliness** | Good (can be added to existing rows) | Moderate (may require ceiling modifications) |

---

## 🕵️ When to Use Which System

- **Use in-row cooling when:**
  - Rack power density exceeds 20 kW per rack.
  - You have a dedicated hot aisle/cold aisle layout.
  - You need precise, localized cooling for specific "hot spot" racks.
  - Floor space is available between racks.

- **Use overhead cooling when:**
  - You want to maximize floor space for additional racks.
  - The data center has a high ceiling (at least 3–4 meters).
  - You are retrofitting an existing facility with limited floor space.
  - Rack densities are in the 10–30 kW range.

---

## 📊 Key Design Considerations for Engineers

- **Chilled water temperature:** Higher supply temperatures (e.g., 18–22°C) improve chiller efficiency but require larger airflow or coil surface area.
- **Airflow management:** Always ensure hot and cold air are fully separated. Use blanking panels, brush grommets, and aisle containment (doors or curtains).
- **Redundancy:** Plan for N+1 cooling units. If one in-row unit fails, the remaining units must handle the full load.
- **Monitoring:** Use temperature sensors at the rack inlet (front) and outlet (rear) to verify cooling effectiveness. Target inlet temperatures of 18–27°C per ASHRAE guidelines.
- **Power and water:** In-row units need both electrical power (for fans and controls) and chilled water piping. Overhead units may also require condensate drain lines.

---

## 🧠 Simple Analogy for New Engineers

Think of a crowded room at a party:

- **Raised-floor cooling** is like a single air conditioner in the corner of the room — it works, but people near the AC are cold, and people far away are hot.
- **In-row cooling** is like having a small fan and cooler placed every few meters along the wall — everyone gets fresh air directly.
- **Overhead cooling** is like ceiling-mounted air vents in an airplane — cool air comes from above, and warm air rises away from you.

For AI clusters, you want the "in-row" or "overhead" approach because the heat load is so intense that a single distant cooling source just won't cut it.

---

## ✅ Summary

- **In-row cooling** places cooling units between racks for short, efficient air paths — ideal for very high density (20+ kW/rack).
- **Overhead cooling** mounts units above racks to save floor space — good for medium to high density (10–30 kW/rack).
- Both systems are essential for modern AI infrastructure because they handle the extreme heat generated by GPU clusters.
- Always combine these systems with proper aisle containment and monitoring to ensure reliable operation.

---

*Next step for new engineers: Look at the power and cooling specifications for an NVIDIA DGX H100 or B200 system, then calculate how many in-row or overhead units you would need for a row of 10 such systems.*