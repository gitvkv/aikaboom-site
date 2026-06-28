# AI Kaboom Diagram Rules

## 📊 Diagram Placement Rules
* **Crucial Rule:** Never place a diagram directly under the main title or the page's introductory header, and never place it immediately below a section heading before the text starts.
* **For Conceptual/Theory Pages (Software, Workflows, and Logical Cycles):**
  * Place the Mermaid diagram at the **very end** of the corresponding section's text write-up (e.g., after the paragraphs, lists, or steps in that section are fully written).
  * *Reasoning:* Allows the student to read the textual explanation first, using the diagram at the end of the section as a visual summary and synthesis.
* **For Hardware Architecture Pages (Cables, Boards, and Layouts):**
  * Place the Mermaid diagram **immediately following the specifications table or component lists** (Option 2).
  * *Reasoning:* Acts as a visual synthesis of physical connections after reading specs.
* **Fallback Rule (If neither of the above is applicable):**
  * Place the Mermaid diagram **directly below the Summary section** at the bottom of the page.
  * *Reasoning:* Serves as a final visual wrap-up and quick review card.

## 📝 Diagram Formatting Guidelines
* **Diagram Title & Caption (Required for ALL Diagrams):**
  * Every diagram must be preceded by a specific sub-header (e.g., `### 📊 Visual Architecture: [Title]`) and a **1-to-2 line write-up/caption** explaining exactly what the diagram illustrates. Never let the diagram float without a title and caption.
* **Layout Direction:**
  * For long linear flowcharts (like the *Fetch-Decode-Execute cycle*), always use **horizontal layout (`flowchart LR`)** instead of vertical (`flowchart TD`) to minimize vertical reading space and prevent excessive scrolling.
* **Visual Symmetry & Alignment:**
  * Design diagrams with a focus on visual symmetry, clean alignment, and balanced nodes to ensure a premium, state-of-the-art tech aesthetic.

## 🎨 Diagram Styling Rules
* **NVIDIA Green (`#76b900`):** Use for active compute/processors (GPUs, TPUs, accelerators) using `classDef cpu`.
* **Tech Blue (`#3498db`):** Use for local memory and registers (RAM, HBM, cache hierarchy) using `classDef memory`.
* **Slate Grey (`#64748b`):** Use for connection lines, system buses, and structural groups using `classDef system`.
