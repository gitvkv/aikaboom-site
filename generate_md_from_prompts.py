#!/usr/bin/env python3
"""generate_md_from_prompts.py - Process prompt files through local Ollama LLM"""
import sys
import os
import time
import re
import requests
from pathlib import Path
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed

# ----------------------------------------------------------------------
# CONFIGURATION
# ----------------------------------------------------------------------
PROMPT_DIR = Path(
    r"C:\Users\vivek\Downloads\Nvidia Project\File Structure\theory_for_student\theory_for_student_md_prompt"
)
OUTPUT_DIR = Path(
    r"C:\Users\vivek\Downloads\Nvidia Project\File Structure\theory_for_student\theory_for_student_md_file_to_read"
)

# --- Primary LLM: Ollama (local) ---
OLLAMA_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "gemma4"

# --- Fallback LLM: DeepSeek V4 Pro (cloud API) ---
DEEPSEEK_API_KEY = os.environ.get("DEEPSEEK_API_KEY", "")
DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions"
DEEPSEEK_MODEL = "deepseek-chat"   # DeepSeek V4 Pro chat model
# ----------------------------------------------------------------------

# (limit is now asked interactively at startup)
REQUEST_TIMEOUT = 300
TEMPERATURE = 0.4


def get_prompt_files(prompt_dir: Path):
    """Return sorted list of prompt files in numerical/natural order."""
    if not prompt_dir.exists():
        raise FileNotFoundError(f"Prompt directory not found: {prompt_dir}")
    
    def natural_sort_key(path: Path):
        # Match pattern major_minorSuffix_
        match = re.match(r"^(\d+)_(\d+)([a-zA-Z]*)", path.name)
        if match:
            return (int(match.group(1)), int(match.group(2)), match.group(3), path.name)
        return (999, 0, "", path.name)

    files = sorted(
        (p for p in prompt_dir.iterdir() if p.is_file()),
        key=natural_sort_key
    )
    if not files:
        raise FileNotFoundError(f"No files found in {prompt_dir}")
    return files


def strip_outer_code_fence(text: str) -> str:
    """Strip outer code fence if present."""
    lines = text.strip().splitlines()
    if len(lines) >= 2 and lines[0].startswith("```") and lines[-1].strip() == "```":
        return "\n".join(lines[1:-1]).strip()
    return text


def call_ollama(prompt_text: str) -> str:
    """Send prompt to Ollama and return response text."""
    payload = {
        "model": OLLAMA_MODEL,
        "prompt": prompt_text,
        "stream": False,
        "options": {"temperature": TEMPERATURE},
    }
    response = requests.post(OLLAMA_URL, json=payload, timeout=REQUEST_TIMEOUT)
    response.raise_for_status()
    data = response.json()
    return data.get("response", "").strip()


def call_deepseek(prompt_text: str) -> str:
    """Send prompt to DeepSeek V4 Pro API and return response text.

    Raises ValueError if DEEPSEEK_API_KEY is not set.
    """
    api_key = DEEPSEEK_API_KEY.strip()
    if not api_key:
        raise ValueError(
            "DeepSeek API key is not set. Please provide it in DEEPSEEK_API_KEY "
            "or as the environment variable DEEPSEEK_API_KEY."
        )

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    # DeepSeek uses an OpenAI-compatible chat completions endpoint
    payload = {
        "model": DEEPSEEK_MODEL,
        "messages": [
            {"role": "user", "content": prompt_text}
        ],
        "temperature": TEMPERATURE,
        "max_tokens": 4096,
    }

    response = requests.post(
        DEEPSEEK_API_URL, json=payload, headers=headers, timeout=REQUEST_TIMEOUT
    )
    response.raise_for_status()
    data = response.json()

    # Extract text from the assistant's reply
    choices = data.get("choices", [])
    if choices:
        msg = choices[0].get("message", {})
        return msg.get("content", "").strip()
    return ""


def call_api_with_retry(api_call_func, prompt_text: str, print_lock, max_retries=3) -> str:
    """Wrapper to call LLM APIs with exponential backoff for rate limits or network issues."""
    delay = 2
    for attempt in range(1, max_retries + 1):
        try:
            return api_call_func(prompt_text)
        except requests.exceptions.HTTPError as e:
            # Check specifically for rate limiting (429)
            if e.response is not None and e.response.status_code == 429:
                with print_lock:
                    print(f"    [WARNING] Rate limit hit (429). Retrying in {delay}s (Attempt {attempt}/{max_retries})...")
                time.sleep(delay)
                delay *= 2
            else:
                raise e
        except (requests.exceptions.ConnectionError, requests.exceptions.Timeout) as e:
            with print_lock:
                print(f"    [WARNING] Network issue: {e}. Retrying in {delay}s (Attempt {attempt}/{max_retries})...")
            time.sleep(delay)
            delay *= 2
    # One final attempt without catching exceptions
    return api_call_func(prompt_text)


def process_single_file(
    prompt_file: Path,
    index: int,
    total_files: int,
    primary_call,
    secondary_call,
    primary_name,
    secondary_name,
    print_lock
) -> str:
    """Processes a single prompt file: checks, loads, queries LLM, and writes output."""
    output_path = OUTPUT_DIR / (prompt_file.stem + ".md")

    # Thread-safe check and print
    if output_path.exists():
        with print_lock:
            print(f"[{index}/{total_files}] Skipping {prompt_file.name} (already exists)")
        return "skipped"

    with print_lock:
        print(f"[{index}/{total_files}] Processing: {prompt_file.name}")

    try:
        prompt_text = prompt_file.read_text(encoding="utf-8")
    except Exception as e:
        with print_lock:
            print(f"[{index}/{total_files}] ERROR reading {prompt_file.name}: {e}")
        return "error"

    start = time.time()
    raw_reply = None

    # --- Primary attempt ---
    try:
        raw_reply = call_api_with_retry(primary_call, prompt_text, print_lock)
    except Exception as e:
        with print_lock:
            print(f"  [{index}/{total_files}] Primary ({primary_name}) failed for {prompt_file.name}: {e}")

    # --- Fallback if primary returned nothing ---
    if not raw_reply:
        with print_lock:
            print(f"  [{index}/{total_files}] [FALLBACK] Trying {secondary_name} for {prompt_file.name}...")
        try:
            raw_reply = call_api_with_retry(secondary_call, prompt_text, print_lock)
            with print_lock:
                print(f"  [{index}/{total_files}] {secondary_name} returned a response.")
        except Exception as e:
            with print_lock:
                print(f"  [{index}/{total_files}] Fallback ({secondary_name}) also failed for {prompt_file.name}: {e}")

    elapsed = time.time() - start

    if not raw_reply:
        with print_lock:
            print(f"  [{index}/{total_files}] WARNING: Empty response from both models, skipping save.\n")
        return "failed"

    try:
        md_content = strip_outer_code_fence(raw_reply)
        output_path.write_text(md_content, encoding="utf-8")
        with print_lock:
            print(f"  [{index}/{total_files}] Saved -> {output_path.name}  ({elapsed:.1f}s, {len(md_content)} chars)\n")
        return "saved"
    except Exception as e:
        with print_lock:
            print(f"  [{index}/{total_files}] ERROR saving {prompt_file.name}: {e}")
        return "error"


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Allow DeepSeek API key to also come from environment variable (overrides hardcoded)
    env_key = os.environ.get("DEEPSEEK_API_KEY", "")
    if env_key:
        globals()["DEEPSEEK_API_KEY"] = env_key
        print("[INFO] Using DeepSeek API key from environment variable.\n")

    # ---- Gather all prompt files ----
    try:
        all_prompt_files = get_prompt_files(PROMPT_DIR)
    except FileNotFoundError as e:
        print(f"ERROR: {e}")
        sys.exit(1)

    total_available = len(all_prompt_files)
    print(f"Total prompt files available: {total_available}\n")

    # ---- (1) How many files to process? ----
    while True:
        user_input = input(
            "How many prompt files would you like to process?\n"
            "Enter a number or 'all' for everything: "
        ).strip().lower()
        if user_input == "all":
            limit = None
            break
        try:
            limit = int(user_input)
            if limit > 0:
                break
            print("Please enter a positive number.\n")
        except ValueError:
            print("Invalid input. Type a number or 'all'.\n")

    prompt_files = all_prompt_files[:limit] if limit is not None else all_prompt_files
    print(f"\nWill process {len(prompt_files)} file(s).\n")

    # ---- (2) Choose primary model ----
    print("Available models:")
    print("  1) Ollama  (local  - gemma4)")
    print("  2) DeepSeek V4 Pro  (cloud)")
    while True:
        choice = input("Select the PRIMARY model (1 or 2): ").strip()
        if choice == "1":
            primary_call = call_ollama
            primary_name = "Ollama (gemma4)"
            secondary_call = call_deepseek
            secondary_name = "DeepSeek V4 Pro"
            break
        elif choice == "2":
            primary_call = call_deepseek
            primary_name = "DeepSeek V4 Pro"
            secondary_call = call_ollama
            secondary_name = "Ollama (gemma4)"
            break
        else:
            print("Invalid choice. Please enter 1 or 2.\n")

    # ---- (3) Thread count input ----
    while True:
        thread_input = input(
            "Enter the number of concurrent threads to use (default is 5): "
        ).strip()
        if not thread_input:
            max_workers = 5
            break
        try:
            max_workers = int(thread_input)
            if max_workers > 0:
                break
            print("Please enter a positive number.\n")
        except ValueError:
            print("Invalid input. Type a positive integer.\n")

    print(f"\nPrimary:   {primary_name}")
    print(f"Fallback:  {secondary_name}")
    print(f"Workers:   {max_workers} concurrent threads\n")

    # ======= Main processing loop =======
    print_lock = threading.Lock()
    start_all = time.time()
    total_files = len(prompt_files)
    results = {}

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {
            executor.submit(
                process_single_file,
                prompt_file,
                i,
                total_files,
                primary_call,
                secondary_call,
                primary_name,
                secondary_name,
                print_lock
            ): prompt_file
            for i, prompt_file in enumerate(prompt_files, start=1)
        }

        for future in as_completed(futures):
            prompt_file = futures[future]
            try:
                status = future.result()
                results[status] = results.get(status, 0) + 1
            except Exception as e:
                with print_lock:
                    print(f"ERROR: Thread processing {prompt_file.name} raised exception: {e}")
                results["error"] = results.get("error", 0) + 1

    elapsed_all = time.time() - start_all
    print("Done.")
    print(f"Total time elapsed: {elapsed_all:.1f} seconds.")
    print("Summary of results:")
    for status, count in results.items():
        print(f"  - {status}: {count} file(s)")


if __name__ == "__main__":
    main()