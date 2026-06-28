import os
import sys
import re
import shutil
import time
from pathlib import Path

# --- 1. AUTO-DEPENDENCY CHECKER FOR OPENPYXL ---
try:
    import openpyxl
except ImportError:
    import subprocess
    print("[INFO] openpyxl not found. Installing now...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "openpyxl"])
    import openpyxl

# --- 2. CONFIGURATION PATHS ---
BASE_DIR = Path(__file__).parent.resolve()
EXCEL_PATH = BASE_DIR / "File Structure in Excel.xlsx"
RAW_MD_DIR = BASE_DIR / "theory_for_student" / "theory_for_student_md_file_to_read"
DOCS_DIR = BASE_DIR / "docs"
THEME_SRC_DIR = BASE_DIR / "theme_src"

print(f"Base Directory: {BASE_DIR}")
print(f"Excel Path:     {EXCEL_PATH}")
print(f"Raw MD Dir:     {RAW_MD_DIR}")
print(f"Docs Dir:       {DOCS_DIR}")

# --- 3. HELPER FUNCTIONS ---
def slugify(text: str) -> str:
    """Creates a clean, file-system safe slug from text."""
    # Split by standard dividers and take first part to keep names short
    for divider in ["–", "—", "-", ":", "?"]:
        text = text.split(divider)[0]
    # Remove 'The ' from the beginning
    text = text.strip()
    if text.lower().startswith("the "):
        text = text[4:]
    # Remove special characters
    text = re.sub(r'[^\w\s-]', '', text).strip().lower()
    return re.sub(r'[-\s]+', '_', text)

def parse_num_key(num_str: str):
    """Splits dotted numbers into tuple of ints for natural sorting (e.g. '1.10' -> (1, 10))."""
    if not num_str:
        return (999,)
    # Extract digit segments
    digits = re.findall(r'\d+', str(num_str))
    return tuple(int(d) for d in digits)

def parse_lesson_sort_key(lesson_num: str):
    """Parses subtopic IDs like '1.1a' or '10_2b' to natural key."""
    # Replace underscore with dot for uniform parsing
    num_str = lesson_num.replace('_', '.')
    match = re.match(r"^(\d+)\.(\d+)([a-zA-Z]*)", num_str)
    if match:
        return (int(match.group(1)), int(match.group(2)), match.group(3))
    return (999, 0, "")

def clean_display_name(num: str, name: str) -> str:
    """Strips the duplicate subtopic number from the beginning of the lesson name if present."""
    num_str = num.strip()
    name_str = name.strip()
    if name_str.startswith(num_str):
        name_str = name_str[len(num_str):].strip()
    # Strip any trailing colons, dashes, or spaces left behind
    name_str = re.sub(r'^[:\-\s—–]+', '', name_str).strip()
    return name_str

# --- 4. EXCEL DATA INGESTION & HIERARCHY MAPPING ---
def load_taxonomy():
    wb = openpyxl.load_workbook(EXCEL_PATH, data_only=True)
    # Load sheet 'summary' specifically, fallback to active sheet if not found
    sheet = wb["summary"] if "summary" in wb.sheetnames else wb.active
    
    # Rows structure list
    raw_rows = []
    
    # Identify headers and map column letters
    headers = {}
    for col_idx in range(1, sheet.max_column + 1):
        cell_val = sheet.cell(row=1, column=col_idx).value
        if cell_val:
            headers[cell_val.strip().upper()] = col_idx
            
    # Key column names to find
    col_part = headers.get("PART", 1)
    col_chap_idx = headers.get("CHAPTER", 3)
    col_chap_name = headers.get("CHAPTER NAME", 4)
    col_topic_idx = headers.get("TOPIC NUMBER", 5)
    col_topic_name = headers.get("TOPIC NAME", 6)
    col_subtopic_idx = headers.get("SUB TOPIC NUMBER", 7)
    col_subtopic = headers.get("SUB TOPIC", 8)
    col_file_name = headers.get("FILE NAME", 9)
    
    # Read rows
    for row_idx in range(2, sheet.max_row + 1):
        part = sheet.cell(row=row_idx, column=col_part).value
        chap_num = sheet.cell(row=row_idx, column=col_chap_idx).value
        chap_name = sheet.cell(row=row_idx, column=col_chap_name).value
        topic_num = sheet.cell(row=row_idx, column=col_topic_idx).value
        topic_name = sheet.cell(row=row_idx, column=col_topic_name).value
        subtopic_num = sheet.cell(row=row_idx, column=col_subtopic_idx).value
        subtopic = sheet.cell(row=row_idx, column=col_subtopic).value
        file_name = sheet.cell(row=row_idx, column=col_file_name).value
        
        if part and file_name:
            part_str = str(part).strip()
            # User overrides for Module names
            part_str = part_str.replace("The AI Infrastructure Security & Compliance", "The AI Infra Security & Compliance")
            part_str = part_str.replace("The Exam Preparation & Certification Mastery", "The Exam Prep & Certification")
            
            raw_rows.append({
                "part": part_str,
                "chap_num": str(chap_num).strip() if chap_num else "",
                "chap_name": str(chap_name).strip() if chap_name else "",
                "topic_num": str(topic_num).strip() if topic_num else "",
                "topic_name": str(topic_name).strip() if topic_name else "",
                "subtopic_num": str(subtopic_num).strip() if subtopic_num else "",
                "subtopic": str(subtopic).strip() if subtopic else "",
                "file_name": str(file_name).strip()
            })
            
    # Group rows hierarchical
    # Structure: Part -> Chapter -> Topic -> Lesson
    parts_dict = {}
    
    for row in raw_rows:
        p_name = row["part"]
        c_num = row["chap_num"]
        c_name = row["chap_name"]
        t_num = row["topic_num"]
        t_name = row["topic_name"]
        l_num = row["subtopic_num"]
        l_name = row["subtopic"]
        fname = row["file_name"]
        
        if p_name not in parts_dict:
            parts_dict[p_name] = {
                "name": p_name,
                "min_chap": 999,
                "chapters": {}
            }
            
        part_data = parts_dict[p_name]
        try:
            c_val = int(c_num) if c_num else 999
            if c_val < part_data["min_chap"]:
                part_data["min_chap"] = c_val
        except ValueError:
            pass
            
        chaps = part_data["chapters"]
        if c_name not in chaps:
            chaps[c_name] = {
                "name": c_name,
                "num": c_num,
                "topics": {}
            }
            
        topics = chaps[c_name]["topics"]
        if t_name not in topics:
            topics[t_name] = {
                "name": t_name,
                "num": t_num,
                "lessons": []
            }
            
        topics[t_name]["lessons"].append({
            "num": l_num,
            "name": l_name,
            "file_name": fname
        })
        
    # Sort structure naturally
    sorted_parts = []
    
    # 1. Sort Parts chronologically by their first Chapter number
    for p_name, p_data in sorted(parts_dict.items(), key=lambda x: x[1]["min_chap"]):
        part_idx = len(sorted_parts) + 1
        p_slug = f"{part_idx:02d}_{slugify(p_name)}"
        
        sorted_chaps = []
        # 2. Sort Chapters by numeric Chapter Number
        for c_name, c_data in sorted(p_data["chapters"].items(), key=lambda x: parse_num_key(x[1]["num"])):
            c_slug = f"chapter_{c_data['num']}"
            
            sorted_topics = []
            # 3. Sort Topics by numeric Topic Number
            for t_name, t_data in sorted(c_data["topics"].items(), key=lambda x: parse_num_key(x[1]["num"])):
                
                # 4. Sort Lessons by Subtopic ID (e.g. 1.1a, 1.1b)
                sorted_lessons = sorted(t_data["lessons"], key=lambda x: parse_lesson_sort_key(x["num"]))
                
                sorted_topics.append({
                    "name": t_name,
                    "num": t_data["num"],
                    "lessons": sorted_lessons
                })
                
            sorted_chaps.append({
                "name": c_name,
                "num": c_data["num"],
                "slug": c_slug,
                "topics": sorted_topics
            })
            
        sorted_parts.append({
            "name": p_name,
            "idx": part_idx,
            "slug": p_slug,
            "chapters": sorted_chaps
        })
        
    return sorted_parts

# --- 5. MAIN BUILD ENGINE ---
def build_site():
    print("\n--- Starting build pipeline ---")
    
    # Clear output docs directory
    if DOCS_DIR.exists():
        print(f"Clearing existing docs folder: {DOCS_DIR}")
        shutil.rmtree(DOCS_DIR)
    DOCS_DIR.mkdir(parents=True, exist_ok=True)
    
    # Load and parse Excel
    parts = load_taxonomy()
    
    # Track stats
    lessons_copied = 0
    lessons_missing = []
    
    # Navigation list for mkdocs.yml
    nav_tree = []
    
    # Write rich landing page index.md
    index_path = DOCS_DIR / "index.md"
    index_content = """# 🚀 AI Kaboom: The AI Infrastructure & NVIDIA NCA Study Hub

Welcome to **AI Kaboom**, the ultimate community-driven portal designed to help you master AI Infrastructure and ace the **NVIDIA-Certified Associate: AI Infrastructure and Operations (NCA-AIIO)** exam.

Whether you are a Cluster Administrator, DevOps Engineer, Systems Architect, System Engineer, Network Engineer, Cloud Engineer, or an AI aspirant, this hub bridges the gap between hardware mechanics and software orchestration. 

<a href="01_physical_realm/roadmap/" class="start-learning-btn">🚀 Start Learning for Free</a>

---



## 🎯 Our Mission: Build the Go-To AI Infrastructure Community
AI is transforming the world, but it runs on physical realities: silicon, optics, copper, and cooling. Standard software engineering resources don't cover the intricacies of InfiniBand routing, GPUDirect Storage, or MIG GPU partitioning.

**AI Kaboom is built to be the community home for Engineers.** 
Over time, we aim to grow this platform into a collaborative knowledge base. We invite you to learn, participate, and build the future of AI Operations together.

*Created with dedication by **Vivek Kumar**. I am also still learning, and there is a long way to go—let's walk this path together!*

> [!TIP]
> **Help Us Grow the Hub:**
> We want this platform to grow alongside the field of AI Infrastructure. If you are preparing for the NCA-AIIO exam or already operating clusters in production, your feedback is invaluable. Once you complete your exam, share your success and help us keep these study guides up-to-date and comprehensive.

---

## 🎓 NVIDIA NCA-AIIO Certification Pathway
This portal is mapped directly to the official NVIDIA NCA-AIIO exam blueprint, covering all core domains:

1.  **AI Infrastructure Fundamentals** (Von Neumann architecture, CPU/GPU roles, BIOS/UEFI)
2.  **GPU Architecture & Systems** (Tensor Cores, HBM3, NVLink topologies, DGX design)
3.  **Networking for AI** (InfiniBand architecture, RoCEv2 fabrics, switch rails, Spectrum-X)
4.  **Storage for AI** (NAND Flash internals, NVMe over PCIe, GPUDirect Storage)
5.  **Software Stack & Containerization** (CUDA compilation, NCCL communication, NGC catalog)
6.  **Cluster Orchestration** (Kubernetes GPU Operator, Multi-Instance GPU (MIG), Slurm)
7.  **Monitoring & Operations** (NVIDIA System Management (NVML), DCGM metrics, Xid errors)

---

## 🛠️ Interactive Learning Tools
Make the most of your learning journey with our built-in study widgets:
*   **Progress Tracking:** Click **"Mark as Complete"** at the top of any lesson page to save your study status.
*   **Module Roadmaps:** Visit the **Roadmap** page under any module to see your real-time syllabus checklist and completion percentage.
*   **Progress Backup:** Use the **Backup & Restore Progress** widget at the bottom of any roadmap to download your progress as a `.json` backup file or restore it on another browser.

> [!IMPORTANT]
> All progress data is saved **locally in your browser** (`localStorage`), ensuring your privacy and data ownership.

---

## 🗺️ How to Begin
Select any topic from the left sidebar to jump straight into a lesson, or click the **Roadmap** link of any module to see the entire syllabus timeline. 

*Let's build, scale, and learn AI infrastructure together!*
"""
    index_path.write_text(index_content, encoding="utf-8")
    nav_tree.append({"Home": "index.md"})
    
    # Write Practice Quiz placeholder
    quiz_path = DOCS_DIR / "practice_quiz.md"
    quiz_content = """# 🏆 NCA-AIIO Practice Exam Simulator

Test your knowledge with this interactive 20-question practice simulator. Questions are designed to match the style, difficulty, and high-yield domains of the official NVIDIA-Certified Associate exam.

<div id="quiz-container"></div>
"""
    quiz_path.write_text(quiz_content, encoding="utf-8")
    nav_tree.append({"Practice Quiz": "practice_quiz.md"})
    
    # Write Exam Mock Test placeholder
    mock_test_path = DOCS_DIR / "mock_test.md"
    mock_test_content = """# 📝 NVIDIA NCA-AIIO Exam Mock Test Simulator

Simulate the actual proctored exam experience. This simulator dynamically generates a randomized **50-question** exam from a high-quality pool of questions, aligned with the official weight distributions.

<div id="mock-test-container"></div>
"""
    mock_test_path.write_text(mock_test_content, encoding="utf-8")
    nav_tree.append({"Exam Mock Test": "mock_test.md"})
    
    # Write CNAME for custom domain routing on GitHub Pages
    cname_path = DOCS_DIR / "CNAME"
    cname_path.write_text("aikaboom.com\n", encoding="utf-8")
    
    # Build each Module (Part)
    for part in parts:
        part_dir = DOCS_DIR / part["slug"]
        part_dir.mkdir(parents=True, exist_ok=True)
        
        # Navigation element for this module
        part_nav = []
        
        # Roadmap filename
        roadmap_rel_path = f"{part['slug']}/roadmap.md"
        part_nav.append({"Roadmap": roadmap_rel_path})
        
        # Keep track of lessons inside this module for roadmap generation
        module_lessons = []
        
        for chap in part["chapters"]:
            chap_dir = part_dir / chap["slug"]
            chap_dir.mkdir(parents=True, exist_ok=True)
            
            chap_nav = []
            
            for topic in chap["topics"]:
                topic_nav = []
                
                for lesson in topic["lessons"]:
                    raw_file = RAW_MD_DIR / lesson["file_name"]
                    
                    if not raw_file.exists():
                        lessons_missing.append(lesson["file_name"])
                        continue
                        
                    # Copy and format lesson page
                    dest_file_name = f"{lesson['num']}_{slugify(lesson['name'])}.md"
                    dest_path = chap_dir / dest_file_name
                    
                    # Read content
                    content = raw_file.read_text(encoding="utf-8")
                    
                    # Clean title formatting and inject completion & tag badges
                    lesson_id = lesson["file_name"].replace(".md", "")
                    
                    # Extract short display names for badges
                    part_short = part["name"].split("–")[0].split("—")[0].replace("The ", "").strip()
                    chap_short = chap["name"].split("–")[0].split("—")[0].strip()
                    # Strip chapter index from chap_short if starts with numbers
                    chap_short = re.sub(r'^\d+\s+', '', chap_short)
                    
                    # Search and modify contents to add markers after header
                    lines = content.splitlines()
                    new_lines = []
                    title_found = False
                    
                    for line in lines:
                        # Skip the raw, long hierarchy tag line
                        if line.strip().startswith("#### 🏷️"):
                            continue
                            
                        new_lines.append(line)
                        if not title_found and line.startswith("# "):
                            new_lines.append("")
                            new_lines.append(f'<div class="lesson-completion" data-lesson-id="{lesson_id}"></div>')
                            new_lines.append('<div class="lesson-tags">')
                            new_lines.append(f'  <span class="lesson-tag">📦 {part_short}</span>')
                            new_lines.append(f'  <span class="lesson-tag">📖 {chap_short}</span>')
                            new_lines.append('</div>')
                            new_lines.append("")
                            title_found = True
                            
                    formatted_content = "\n".join(new_lines)
                    dest_path.write_text(formatted_content, encoding="utf-8")
                    
                    # Track for roadmap
                    lesson_rel_path = f"{chap['slug']}/{dest_file_name}"
                    module_lessons.append({
                        "id": lesson_id,
                        "num": lesson["num"],
                        "name": clean_display_name(lesson["num"], lesson["name"]),
                        "rel_path": lesson_rel_path,
                        "chap_name": chap["name"]
                    })
                    
                    # Add to topic nav list
                    lesson_title = f"{lesson['num']} {clean_display_name(lesson['num'], lesson['name'])}"
                    topic_nav.append({lesson_title: f"{part['slug']}/{chap['slug']}/{dest_file_name}"})
                    lessons_copied += 1
                
                # Add topic to chapter nav if it has lessons
                if topic_nav:
                    # If topic name contains code number, use it directly
                    chap_nav.append({topic["name"]: topic_nav})
            
            # Add chapter to part nav if it has topics
            if chap_nav:
                part_nav.append({chap["name"]: chap_nav})
                
        # Add module to global nav
        # Shorten module title for the sidebar to keep it clean and prevent overflow
        part_short_title = part['name']
        for divider in ["–", "—", "-", ":"]:
            part_short_title = part_short_title.split(divider)[0]
        part_short_title = part_short_title.strip()
        
        # Remove leading "The " (case-insensitive) if present
        if part_short_title.lower().startswith("the "):
            part_short_title = part_short_title[4:].strip()
            
        part_title = f"{part['idx']}. {part_short_title}"
        nav_tree.append({part_title: part_nav})
        
        # Generate module roadmap.md timeline syllabus
        roadmap_path = part_dir / "roadmap.md"
        roadmap_content = []
        roadmap_content.append(f"# 🗺️ Roadmap: {part['name']}")
        roadmap_content.append("\nBelow is the syllabus timeline of lessons in this module. Track your study progress here.\n")
        
        # Progress bar
        roadmap_content.append("## 📈 Progress")
        roadmap_content.append('<div class="progress-container">')
        roadmap_content.append('  <div class="progress-bar">0%</div>')
        roadmap_content.append('</div>\n---')
        
        # Group roadmap items by chapter
        current_chap = None
        for item in module_lessons:
            if item["chap_name"] != current_chap:
                current_chap = item["chap_name"]
                roadmap_content.append(f"\n### 📁 {current_chap}")
            # Add syllabus checklist item
            roadmap_content.append(f"*   <span class=\"roadmap-badge\" data-lesson-id=\"{item['id']}\"></span> [{item['num']} {item['name']}]({item['rel_path']})")
            
        roadmap_path.write_text("\n".join(roadmap_content), encoding="utf-8")
        print(f"Generated Module {part['idx']} Roadmap with {len(module_lessons)} lessons.")
        
    # --- 6. AUTO-COMPILE MKDOCS.YML CONFIG ---
    print("\nWriting mkdocs.yml...")
    
    # Custom dumper to keep yml clean and properly indented
    def dump_nav(items, indent=4):
        yml_lines = []
        for item in items:
            if isinstance(item, str):
                yml_lines.append(" " * indent + f"- {item}")
            elif isinstance(item, dict):
                for k, v in item.items():
                    # Handle single string mapping
                    if isinstance(v, str):
                        # Escaped quotes if keys contain colons
                        k_safe = f'"{k}"' if ":" in k or "#" in k else k
                        yml_lines.append(" " * indent + f"- {k_safe}: {v}")
                    # Handle list mappings (nested navigation)
                    elif isinstance(v, list):
                        k_safe = f'"{k}"' if ":" in k or "#" in k else k
                        yml_lines.append(" " * indent + f"- {k_safe}:")
                        yml_lines.extend(dump_nav(v, indent + 4))
        return yml_lines

    config_lines = [
        "site_name: AI Kaboom Study Hub",
        "site_url: https://aikaboom.com",
        "site_description: NVIDIA-Certified Associate AI Infrastructure and Operations Study Guide",
        "theme:",
        "    name: readthedocs",
        "    highlightjs: true",
        "    analytics:",
        "        gtag: G-S6TG130NVW",
        "markdown_extensions:",
        "    - admonition",
        "    - toc:",
        "        permalink: true",
        "extra_css:",
        "    - stylesheets/extra.css",
        "extra_javascript:",
        "    - js/quiz_questions.js",
        "    - js/mock_test_questions.js",
        "    - js/extra.js",
        "nav:"
    ]
    
    config_lines.extend(dump_nav(nav_tree, 4))
    
    config_path = BASE_DIR / "mkdocs.yml"
    config_path.write_text("\n".join(config_lines), encoding="utf-8")
    print(f"Saved mkdocs.yml at {config_path}")
    
    # --- 7. STATIC THEME ASSET REPLICATION ---
    print("\nCopying static stylesheets and scripts...")
    dest_css = DOCS_DIR / "stylesheets" / "extra.css"
    dest_js = DOCS_DIR / "js" / "extra.js"
    dest_quiz = DOCS_DIR / "js" / "quiz_questions.js"
    dest_mock = DOCS_DIR / "js" / "mock_test_questions.js"
    
    dest_css.parent.mkdir(parents=True, exist_ok=True)
    dest_js.parent.mkdir(parents=True, exist_ok=True)
    
    shutil.copy2(THEME_SRC_DIR / "stylesheets" / "extra.css", dest_css)
    shutil.copy2(THEME_SRC_DIR / "js" / "extra.js", dest_js)
    shutil.copy2(THEME_SRC_DIR / "js" / "quiz_questions.js", dest_quiz)
    
    # Copy mock test questions database if it exists
    src_mock_path = THEME_SRC_DIR / "js" / "mock_test_questions.js"
    if src_mock_path.exists():
        shutil.copy2(src_mock_path, dest_mock)
    print("Assets successfully copied.")
    
    # Summary of Build
    print("\n--- BUILD COMPLETE ---")
    print(f"Total Lessons Compiled: {lessons_copied}")
    if lessons_missing:
        print(f"[WARNING] Missing {len(lessons_missing)} files from Excel sheet.")
        # print first few missing files
        for f in lessons_missing[:5]:
            print(f"  - Missing: {f}")
        if len(lessons_missing) > 5:
            print("  - ...")

if __name__ == "__main__":
    build_site()
