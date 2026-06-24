#!/usr/bin/env python3
"""
generate_quiz_questions.py - Programmatically generate 500 unique, exam-aligned questions 
grouped into 25 practice exams (20 questions each) using the DeepSeek API.
"""

import os
import sys
import json
import time
import re
import requests
import threading
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

# --- CONFIGURATION ---
BASE_DIR = Path(__file__).parent.resolve()
RAW_MD_DIR = BASE_DIR / "theory_for_student" / "theory_for_student_md_file_to_read"
CHECKPOINT_PATH = BASE_DIR / "quiz_generation_checkpoint.json"
OUTPUT_JS_PATH = BASE_DIR / "theme_src/js/quiz_questions.js"
CONTEXT_PATH = BASE_DIR / "exam_blueprint_context.md"

DEEPSEEK_API_KEY = os.environ.get("DEEPSEEK_API_KEY", "").strip()
DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions"
DEEPSEEK_MODEL = "deepseek-chat"

NUM_THREADS = 8
MAX_RETRIES = 5
INITIAL_BACKOFF = 2.0

# Thread Lock for console logging and checkpoint file writes
lock = threading.Lock()

def print_log(msg: str):
    with lock:
        print(f"[{time.strftime('%H:%M:%S')}] {msg}")
        sys.stdout.flush()

def natural_sort_key(path: Path):
    # Match pattern major_minorSuffix_
    match = re.match(r"^(\d+)_(\d+)([a-zA-Z]*)", path.name)
    if match:
        return (int(match.group(1)), int(match.group(2)), match.group(3), path.name)
    return (999, 0, "", path.name)

def clean_json_text(text: str) -> str:
    text = text.strip()
    if text.startswith("```"):
        # Remove opening fence
        lines = text.splitlines()
        if lines[0].startswith("```"):
            lines = lines[1:]
        # Remove closing fence
        if lines and lines[-1].strip() == "```":
            lines = lines[:-1]
        text = "\n".join(lines).strip()
    return text

def call_deepseek_with_retry(prompt: str) -> dict:
    if not DEEPSEEK_API_KEY:
        raise ValueError("DEEPSEEK_API_KEY environment variable is not set. Please export it first.")

    headers = {
        "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": DEEPSEEK_MODEL,
        "messages": [
            {"role": "system", "content": "You are a professional NVIDIA certification exam writer who outputs raw JSON only."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.3,
        "response_format": {"type": "json_object"}
    }

    backoff = INITIAL_BACKOFF
    for attempt in range(MAX_RETRIES):
        try:
            response = requests.post(DEEPSEEK_API_URL, json=payload, headers=headers, timeout=120)
            
            # Rate limiting or temporary server issues
            if response.status_code == 429:
                print_log(f"Rate limited (429). Retrying in {backoff}s...")
                time.sleep(backoff)
                backoff *= 2
                continue
                
            response.raise_for_status()
            res_data = response.json()
            raw_content = res_data["choices"][0]["message"]["content"].strip()
            
            # Parse JSON
            cleaned_json = clean_json_text(raw_content)
            parsed_data = json.loads(cleaned_json)
            
            # Validate structure
            required_keys = ["question", "options", "correctAnswer", "explanation"]
            if not all(k in parsed_data for k in required_keys):
                raise ValueError("Missing keys in DeepSeek response")
            if not isinstance(parsed_data["options"], list) or len(parsed_data["options"]) != 4:
                raise ValueError("options must be a list of exactly 4 strings")
            if not isinstance(parsed_data["correctAnswer"], int) or not (0 <= parsed_data["correctAnswer"] <= 3):
                raise ValueError("correctAnswer must be an integer between 0 and 3")
                
            return parsed_data
            
        except Exception as e:
            print_log(f"Attempt {attempt + 1} failed: {e}")
            if attempt == MAX_RETRIES - 1:
                raise e
            time.sleep(backoff)
            backoff *= 2
            
    raise RuntimeError("Failed to generate question after maximum retries.")

def generate_question_for_file(file_path: Path, exam_context: str) -> dict:
    lesson_title = file_path.stem.replace("_", " ")
    lesson_content = file_path.read_text(encoding="utf-8")
    
    # Strip excessive markdown headers or sitemaps to reduce tokens
    lines = lesson_content.splitlines()
    clean_lines = []
    for line in lines:
        if line.strip().startswith("#### 🏷️"):
            continue
        clean_lines.append(line)
    lesson_content = "\n".join(clean_lines[:150]) # limit to first 150 lines to keep context slim
    
    prompt = f"""You are an expert NVIDIA-Certified Associate (NCA-AIIO) exam developer.
Your task is to write one highly realistic, exam-aligned multiple-choice question for the certification exam.

The question must be directly based on the following lesson from our study guide:
---
Lesson Title: {lesson_title}
Lesson Content:
{lesson_content}
---

To ensure the question matches the style, tone, and difficulty of the actual exam, here is a list of real exam questions, topics, and patterns reported by past candidates:
---
{exam_context}
---

Guidelines:
1. The question must be clear, concise, and conceptual. Avoid unnecessary trivia or overly wordy scenarios.
2. Focus on core topics like command usage (nvidia-smi, dcgmi), hardware designs (NVLink, NVSwitch, H100 vs A100, MIG vs MPS), networking (InfiniBand, RoCEv2, OpenSM, LIDs), storage access patterns, and troubleshooting (Xid errors).
3. Provide exactly 4 options.
4. Provide a detailed explanation of why the correct option is right and the others are wrong.
5. Make sure the question is unique and doesn't duplicate the sample questions exactly, but matches their professional tone.

You MUST return ONLY a raw JSON object (do not wrap in markdown ```json or ``` blocks, do not include any other text) with the following structure:
{{
    "question": "The question text?",
    "options": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
    ],
    "correctAnswer": 0,
    "explanation": "Detailed explanation here."
}}
"""
    return call_deepseek_with_retry(prompt)

def load_checkpoint() -> dict:
    if CHECKPOINT_PATH.exists():
        try:
            return json.loads(CHECKPOINT_PATH.read_text(encoding="utf-8"))
        except Exception:
            print_log("[WARNING] Checkpoint file corrupted. Starting fresh.")
    return {"generated": {}}

def save_checkpoint(checkpoint_data: dict):
    with lock:
        CHECKPOINT_PATH.write_text(json.dumps(checkpoint_data, indent=2), encoding="utf-8")

def main():
    print_log("--- Starting Exam Questions Generation Tool ---")
    
    if not DEEPSEEK_API_KEY:
        print_log("[ERROR] DEEPSEEK_API_KEY environment variable is missing!")
        print_log("Please run: $env:DEEPSEEK_API_KEY='your_key_here' (in PowerShell) and try again.")
        sys.exit(1)
        
    if not RAW_MD_DIR.exists():
        print_log(f"[ERROR] Lessons directory not found at: {RAW_MD_DIR}")
        sys.exit(1)
        
    if not CONTEXT_PATH.exists():
        print_log(f"[ERROR] Exam blueprint context file missing at: {CONTEXT_PATH}")
        sys.exit(1)
        
    # Read exam context
    exam_context = CONTEXT_PATH.read_text(encoding="utf-8")
    
    # 1. Get all lesson files and sort them naturally
    all_files = sorted(
        [p for p in RAW_MD_DIR.iterdir() if p.is_file() and p.suffix == ".md"],
        key=natural_sort_key
    )
    total_lessons = len(all_files)
    print_log(f"Found {total_lessons} lesson files in source directory.")
    
    # 2. Select exactly 500 files uniformly
    # Formula: indices = [int(i * total_lessons / 500) for i in range(500)]
    selected_files = [all_files[int(i * total_lessons / 500)] for i in range(500)]
    print_log(f"Selected exactly {len(selected_files)} files uniformly across the syllabus.")
    
    # 3. Load checkpoint
    checkpoint = load_checkpoint()
    generated_questions = checkpoint["generated"]
    print_log(f"Loaded checkpoint. {len(generated_questions)} / 500 questions already generated.")
    
    # Filter files that still need generation
    files_to_process = [f for f in selected_files if f.name not in generated_questions]
    
    if not files_to_process:
        print_log("All 500 questions are already generated in checkpoint!")
    else:
        print_log(f"Starting parallel generation of {len(files_to_process)} questions using {NUM_THREADS} threads...")
        
        # Thread function to process a single file
        def worker(file_path: Path):
            fname = file_path.name
            try:
                q_data = generate_question_for_file(file_path, exam_context)
                
                # Save to checkpoint
                with lock:
                    generated_questions[fname] = q_data
                save_checkpoint(checkpoint)
                
                print_log(f"[SUCCESS] Generated question for {fname} ({len(generated_questions)}/500)")
            except Exception as e:
                print_log(f"[ERROR] Failed to generate question for {fname}: {e}")
                
        # Run thread pool
        with ThreadPoolExecutor(max_workers=NUM_THREADS) as executor:
            futures = [executor.submit(worker, f) for f in files_to_process]
            for future in as_completed(futures):
                pass # wait for all to finish
                
    # Re-verify total count
    checkpoint = load_checkpoint()
    generated_questions = checkpoint["generated"]
    if len(generated_questions) < 500:
        print_log(f"[WARNING] Only {len(generated_questions)}/500 questions are generated. Please run the script again to fill missing questions.")
        sys.exit(1)
        
    # 4. Bundle questions into 25 sets of 20
    print_log("Packaging questions into 25 practice exam sets...")
    
    # Sort files naturally so the quiz sets group logically by course chapters
    ordered_files = sorted(
        [Path(k) for k in generated_questions.keys()],
        key=natural_sort_key
    )
    
    quiz_sets = []
    question_id_counter = 1
    
    for set_idx in range(25):
        set_id = set_idx + 1
        set_title = f"NCA practice exam Set {set_id}"
        
        # Select 20 questions for this set
        set_questions = []
        for q_idx in range(20):
            file_name = ordered_files[set_idx * 20 + q_idx].name
            raw_q = generated_questions[file_name]
            
            # Map into standard quiz question structure
            set_questions.append({
                "id": question_id_counter,
                "question": raw_q["question"],
                "options": raw_q["options"],
                "correctAnswer": raw_q["correctAnswer"],
                "explanation": raw_q["explanation"]
            })
            question_id_counter += 1
            
        # Select focus description based on starting/ending question indices
        start_num = set_idx * 20 + 1
        end_num = (set_idx + 1) * 20
        desc = f"Practice Exam Set {set_id} containing 20 unique exam-aligned questions covering core infrastructure domains."
        
        quiz_sets.append({
            "id": set_id,
            "title": set_title,
            "description": desc,
            "questions": set_questions
        })
        
    # 5. Write to final JS file
    print_log(f"Writing packed questions database to: {OUTPUT_JS_PATH}")
    OUTPUT_JS_PATH.parent.mkdir(parents=True, exist_ok=True)
    
    js_content = f"""// NVIDIA NCA-AIIO 25-Set Practice Exam Database (500 Unique Questions)
// Automatically generated via generate_quiz_questions.py
window.NCA_QUIZ_SETS = {json.dumps(quiz_sets, indent=4)};
"""
    OUTPUT_JS_PATH.write_text(js_content, encoding="utf-8")
    
    # 6. Copy to docs assets folder
    dest_js = BASE_DIR / "docs/js/quiz_questions.js"
    dest_js.parent.mkdir(parents=True, exist_ok=True)
    dest_js.write_text(js_content, encoding="utf-8")
    
    # Clean up checkpoint
    if CHECKPOINT_PATH.exists():
        os.remove(CHECKPOINT_PATH)
        
    print_log("--- GENERATION COMPLETE! 500 unique questions written to quiz_questions.js ---")

if __name__ == "__main__":
    main()
