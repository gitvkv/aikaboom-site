document.addEventListener("DOMContentLoaded", function () {
    // Prefix for localStorage keys to prevent collisions
    const KEY_PREFIX = "nca-completion-";

    // --- 1. LESSON PAGE COMPLETION BUTTON ---
    const completionPlaceholder = document.querySelector(".lesson-completion");
    if (completionPlaceholder) {
        const lessonId = completionPlaceholder.getAttribute("data-lesson-id");
        if (lessonId) {
            // Create the button
            const btn = document.createElement("button");
            btn.className = "completion-btn";
            
            const isCompleted = localStorage.getItem(KEY_PREFIX + lessonId) === "true";
            if (isCompleted) {
                btn.classList.add("completed");
                btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Completed`;
            } else {
                btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg> Mark as Complete`;
            }

            btn.addEventListener("click", function () {
                const currentStatus = localStorage.getItem(KEY_PREFIX + lessonId) === "true";
                const newStatus = !currentStatus;
                localStorage.setItem(KEY_PREFIX + lessonId, newStatus ? "true" : "false");
                
                if (newStatus) {
                    btn.classList.add("completed");
                    btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Completed`;
                } else {
                    btn.classList.remove("completed");
                    btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg> Mark as Complete`;
                }
                
                // If there's a roadmap on the same page (e.g. testing), refresh it
                updateRoadmapUI();
            });

            completionPlaceholder.appendChild(btn);
        }
    }

    // --- 2. ROADMAP PAGES: BADGES & PROGRESS ---
    function updateRoadmapUI() {
        const badges = document.querySelectorAll(".roadmap-badge");
        if (badges.length > 0) {
            let completedCount = 0;
            
            badges.forEach(function (badge) {
                const lessonId = badge.getAttribute("data-lesson-id");
                if (lessonId) {
                    const isCompleted = localStorage.getItem(KEY_PREFIX + lessonId) === "true";
                    if (isCompleted) {
                        badge.textContent = "✅";
                        badge.className = "roadmap-badge completed";
                        completedCount++;
                    } else {
                        badge.textContent = "⬜";
                        badge.className = "roadmap-badge incomplete";
                    }
                }
            });

            // Update progress bar
            const progressBar = document.querySelector(".progress-bar");
            if (progressBar) {
                const total = badges.length;
                const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;
                progressBar.style.width = percentage + "%";
                progressBar.textContent = percentage + "%";
            }
        }
    }

    // Initialize roadmap UI elements
    updateRoadmapUI();

    // --- 3. BACKUP & RESTORE UTILITY WIDGET ---
    const badges = document.querySelectorAll(".roadmap-badge");
    if (badges.length > 0) {
        const mainContent = document.querySelector("[role='main']") || document.querySelector("article");
        if (mainContent && !document.querySelector(".progress-utility-widget")) {
            const widget = document.createElement("div");
            widget.className = "progress-utility-widget";
            widget.innerHTML = `
                <h4>💾 Backup & Restore Progress</h4>
                <p>Save your progress to a file, or restore progress from a previous backup file.</p>
                <button class="widget-btn" id="backup-btn">Backup Progress</button>
                <button class="widget-btn widget-btn-restore" id="restore-btn">Restore Progress</button>
                <input type="file" id="restore-file-input" accept=".json">
            `;
            mainContent.appendChild(widget);

            // Wire up backup
            document.getElementById("backup-btn").addEventListener("click", function () {
                const progressData = {};
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key.startsWith(KEY_PREFIX)) {
                        progressData[key] = localStorage.getItem(key);
                    }
                }
                const blob = new Blob([JSON.stringify(progressData, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "aikaboom-progress-backup.json";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });

            // Wire up restore
            const fileInput = document.getElementById("restore-file-input");
            document.getElementById("restore-btn").addEventListener("click", function () {
                fileInput.click();
            });

            fileInput.addEventListener("change", function (event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        try {
                            const progressData = JSON.parse(e.target.result);
                            let count = 0;
                            Object.keys(progressData).forEach(function (key) {
                                if (key.startsWith(KEY_PREFIX)) {
                                    localStorage.setItem(key, progressData[key]);
                                    count++;
                                }
                            });
                            alert("Successfully restored " + count + " progress items! Refreshing page...");
                            window.location.reload();
                        } catch (err) {
                            alert("Error parsing backup file. Please ensure it is a valid backup JSON.");
                        }
                    };
                    reader.readAsText(file);
                }
            });
        }
    }

    // --- 4. INTERACTIVE SIDEBAR ACCORDION TOGGLES ---
    function initAccordion() {
        const captions = document.querySelectorAll(".wy-menu-vertical p.caption");
        
        captions.forEach(function (caption) {
            const nextUl = caption.nextElementSibling;
            if (!nextUl || nextUl.tagName !== "UL") return;
            
            // Check if this module is currently active
            const isActive = nextUl.classList.contains("current") || nextUl.querySelector(".current") !== null;
            
            if (isActive) {
                caption.classList.add("expanded");
                nextUl.classList.add("expanded");
            }
            
            caption.addEventListener("click", function () {
                const isCurrentlyExpanded = nextUl.classList.contains("expanded");
                
                // Collapse all modules
                captions.forEach(function (otherCap) {
                    otherCap.classList.remove("expanded");
                    const otherUl = otherCap.nextElementSibling;
                    if (otherUl && otherUl.tagName === "UL") {
                        otherUl.classList.remove("expanded");
                    }
                });
                
                // If the clicked one was not expanded, expand it
                if (!isCurrentlyExpanded) {
                    caption.classList.add("expanded");
                    nextUl.classList.add("expanded");
                }
            });
        });
    }

    // Run accordion initialization when ready
    if (document.readyState === "complete") {
        initAccordion();
    } else {
        window.addEventListener("load", initAccordion);
    }

    // --- 5. READ ALOUD (TEXT-TO-SPEECH) ENGINE ---
    const lessonTags = document.querySelector(".lesson-tags");
    const articleBody = document.querySelector('[itemprop="articleBody"]');

    if (lessonTags && articleBody) {
        // Create the player element
        const ttsContainer = document.createElement("div");
        ttsContainer.className = "tts-player-container";
        ttsContainer.innerHTML = `
            <div class="tts-controls">
                <button class="tts-btn tts-btn-play" id="tts-play-btn">▶ Play</button>
                <button class="tts-btn" id="tts-stop-btn" disabled>■ Stop</button>
            </div>
            <div class="tts-speed-container">
                <span>Speed:</span>
                <select class="tts-speed-select" id="tts-speed">
                    <option value="1">1x</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5" selected>1.5x</option>
                    <option value="2">2x</option>
                </select>
            </div>
            <div class="tts-status" id="tts-status">Speaker Idle</div>
        `;

        // Insert right after lesson tags
        lessonTags.parentNode.insertBefore(ttsContainer, lessonTags.nextSibling);

        const playBtn = document.getElementById("tts-play-btn");
        const stopBtn = document.getElementById("tts-stop-btn");
        const speedSelect = document.getElementById("tts-speed");
        const statusText = document.getElementById("tts-status");

        let synth = window.speechSynthesis;
        let sentences = [];
        let currentSentenceIndex = 0;
        let isSpeaking = false;
        let isPaused = false;
        let selectedVoice = null;
        let paragraphsElements = []; // Store references to highlight paragraphs
        let currentUtterance = null; // Store active utterance to clear event handlers during cancel

        // Helper to cancel speech safely without triggering premature onend events
        function cancelCurrentSpeech() {
            if (currentUtterance) {
                currentUtterance.onend = null;
                currentUtterance.onerror = null;
                currentUtterance = null;
            }
            if (synth) {
                synth.cancel();
            }
        }

        // Parse article content into clean readable text units
        function prepareTextChunks() {
            // Find all visible paragraphs, list items, blockquotes, and headings
            // and associate text with DOM nodes so we can highlight them
            const walk = document.createTreeWalker(articleBody, NodeFilter.SHOW_ELEMENT, {
                acceptNode: function(node) {
                    const tag = node.tagName.toLowerCase();
                    // Skip ignored nodes
                    if (node.closest('.lesson-completion') || node.closest('.lesson-tags') || tag === 'pre' || tag === 'code' || tag === 'a' && node.closest('.start-learning-btn')) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    if (['h1', 'h2', 'h3', 'h4', 'p', 'li', 'blockquote'].includes(tag)) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    return NodeFilter.FILTER_SKIP;
                }
            });

            let node;
            paragraphsElements = [];
            sentences = [];

            while (node = walk.nextNode()) {
                const text = node.innerText.trim();
                if (text) {
                    // Split the element's text into sentences
                    // This regex splits on sentence endings but keeps punctuation
                    const elementSentences = text.split(/(?<=[.!?])\s+/);
                    elementSentences.forEach(s => {
                        const cleanSentence = s.trim();
                        if (cleanSentence.length > 1) {
                            sentences.push(cleanSentence);
                            paragraphsElements.push(node); // Map sentence to its DOM element for highlighting
                        }
                    });
                }
            }
        }

        // Load voices and select the best one
        function loadVoices() {
            if (!synth) return;
            const voices = synth.getVoices();
            // Look for Google, Microsoft, or natural voices containing "english" or code "en-"
            selectedVoice = voices.find(v => v.lang.toLowerCase().startsWith("en-us") && v.name.toLowerCase().includes("natural")) ||
                            voices.find(v => v.lang.toLowerCase().startsWith("en") && v.name.toLowerCase().includes("natural")) ||
                            voices.find(v => v.lang.toLowerCase().startsWith("en-us") && v.name.toLowerCase().includes("google")) ||
                            voices.find(v => v.lang.toLowerCase().startsWith("en-us")) ||
                            voices.find(v => v.lang.toLowerCase().startsWith("en")) ||
                            voices[0];
        }

        // Run voice loading (speechSynthesis.onvoiceschanged is needed for Chrome)
        loadVoices();
        if (synth && synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = loadVoices;
        }

        function clearHighlights() {
            document.querySelectorAll(".tts-reading-highlight").forEach(el => {
                el.classList.remove("tts-reading-highlight");
            });
        }

        function speakCurrentSentence() {
            if (!synth || currentSentenceIndex >= sentences.length) {
                stopSpeech();
                return;
            }

            const sentenceText = sentences[currentSentenceIndex];
            const activeElement = paragraphsElements[currentSentenceIndex];

            // Highlight active element
            clearHighlights();
            if (activeElement) {
                activeElement.classList.add("tts-reading-highlight");
                // Scroll it into view smoothly if it's off-screen
                const rect = activeElement.getBoundingClientRect();
                if (rect.top < 0 || rect.bottom > window.innerHeight) {
                    activeElement.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            }

            const utterance = new SpeechSynthesisUtterance(sentenceText);
            currentUtterance = utterance;
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }
            utterance.rate = parseFloat(speedSelect.value) || 1.5;

            utterance.onend = function () {
                currentUtterance = null;
                if (isSpeaking && !isPaused) {
                    currentSentenceIndex++;
                    speakCurrentSentence();
                }
            };

            utterance.onerror = function (e) {
                currentUtterance = null;
                console.error("TTS SpeechSynthesisUtterance error:", e);
                // Advance to next sentence on error to prevent freezing
                if (isSpeaking && !isPaused) {
                    currentSentenceIndex++;
                    speakCurrentSentence();
                }
            };

            synth.speak(utterance);
        }

        function startSpeech() {
            if (sentences.length === 0) {
                prepareTextChunks();
            }

            if (sentences.length === 0) {
                statusText.textContent = "No text found to read.";
                return;
            }

            cancelCurrentSpeech(); // Stop any current reading safely
            isSpeaking = true;
            isPaused = false;
            currentSentenceIndex = 0; // Always start fresh on Play click
            
            playBtn.textContent = "⏸ Pause";
            playBtn.classList.add("active");
            stopBtn.disabled = false;
            statusText.textContent = "Reading...";

            speakCurrentSentence();
        }

        function pauseSpeech() {
            if (!synth) return;
            isPaused = true;
            synth.pause();
            playBtn.textContent = "▶ Resume";
            playBtn.classList.remove("active");
            statusText.textContent = "Paused";
        }

        function resumeSpeech() {
            if (!synth) return;
            isPaused = false;
            synth.resume();
            playBtn.textContent = "⏸ Pause";
            playBtn.classList.add("active");
            statusText.textContent = "Reading...";
            
            // Web Speech API bug fallback: sometimes resume() doesn't fire correctly in Chrome
            // If the voice is still paused after 500ms, force-cancel and restart from active sentence
            setTimeout(() => {
                if (isSpeaking && !isPaused && !synth.speaking) {
                    cancelCurrentSpeech();
                    speakCurrentSentence();
                }
            }, 300);
        }

        function stopSpeech() {
            isSpeaking = false;
            isPaused = false;
            cancelCurrentSpeech();
            clearHighlights();
            currentSentenceIndex = 0;
            
            playBtn.textContent = "▶ Play";
            playBtn.classList.remove("active");
            stopBtn.disabled = true;
            statusText.textContent = "Speaker Idle";
        }

        playBtn.addEventListener("click", function () {
            if (!isSpeaking) {
                startSpeech();
            } else if (isPaused) {
                resumeSpeech();
            } else {
                pauseSpeech();
            }
        });

        stopBtn.addEventListener("click", function () {
            stopSpeech();
        });

        speedSelect.addEventListener("change", function () {
            if (isSpeaking) {
                // If speaking, stop and restart from the current sentence index to apply speed change immediately
                const wasPaused = isPaused;
                cancelCurrentSpeech();
                if (!wasPaused) {
                    speakCurrentSentence();
                }
            }
        });

        // Crucial Page-Change Safety: Stop speech if user navigates away
        window.addEventListener("beforeunload", cancelCurrentSpeech);
        window.addEventListener("unload", cancelCurrentSpeech);

    }
});

