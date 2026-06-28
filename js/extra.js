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
        // Retrieve last saved playback speed or default to 1x
        const savedSpeed = localStorage.getItem("nca-tts-speed") || "1";

        // Create the player element
        const ttsContainer = document.createElement("div");
        ttsContainer.className = "tts-player-container";
        ttsContainer.innerHTML = `
            <div class="tts-controls">
                <button class="tts-btn" id="tts-prev-btn" title="Previous Sentence">⏮</button>
                <button class="tts-btn tts-btn-play" id="tts-play-btn">▶ <span class="tts-btn-text">Play</span></button>
                <button class="tts-btn" id="tts-next-btn" title="Next Sentence">⏭</button>
                <button class="tts-btn" id="tts-stop-btn" disabled>■ <span class="tts-btn-text">Stop</span></button>
                <button class="tts-btn" id="tts-jump-btn" title="Toggle Tap-to-Jump Mode">🎯 <span class="tts-btn-text">Jump Mode</span></button>
            </div>
            <div class="tts-speed-container">
                <span>Speed:</span>
                <select class="tts-speed-select" id="tts-speed">
                    <option value="1" ${savedSpeed === "1" ? "selected" : ""}>1x</option>
                    <option value="1.25" ${savedSpeed === "1.25" ? "selected" : ""}>1.25x</option>
                    <option value="1.5" ${savedSpeed === "1.5" ? "selected" : ""}>1.5x</option>
                    <option value="2" ${savedSpeed === "2" ? "selected" : ""}>2x</option>
                </select>
            </div>
        `;

        // Insert right after lesson tags
        lessonTags.parentNode.insertBefore(ttsContainer, lessonTags.nextSibling);

        const playBtn = document.getElementById("tts-play-btn");
        const stopBtn = document.getElementById("tts-stop-btn");
        const prevBtn = document.getElementById("tts-prev-btn");
        const nextBtn = document.getElementById("tts-next-btn");
        const jumpBtn = document.getElementById("tts-jump-btn");
        const speedSelect = document.getElementById("tts-speed");
        const statusText = document.getElementById("tts-status") || {};

        let synth = window.speechSynthesis;
        let sentences = [];
        let currentSentenceIndex = 0;
        let isSpeaking = false;
        let isPaused = false;
        let isJumpModeActive = false;
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
                    if (['h2', 'h3', 'h4', 'p', 'li', 'blockquote'].includes(tag)) {
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
                        let cleanSentence = s.trim();
                        try {
                            // Strip emojis/pictographs
                            cleanSentence = cleanSentence.replace(/\p{Extended_Pictographic}/gu, '');
                        } catch (e) {
                            // Fallback for older browsers
                            cleanSentence = cleanSentence.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF]/g, '');
                        }
                        // Clean up any double spaces left behind by stripped emojis
                        cleanSentence = cleanSentence.replace(/\s+/g, ' ').trim();

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
            utterance.rate = parseFloat(speedSelect.value) || 1.0;

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

        function jumpToSentence(index) {
            if (index >= 0 && index < sentences.length) {
                currentSentenceIndex = index;
                cancelCurrentSpeech();

                // Force play from the selected sentence
                isSpeaking = true;
                isPaused = false;
                playBtn.innerHTML = '⏸ <span class="tts-btn-text">Pause</span>';
                playBtn.classList.add("active");
                stopBtn.disabled = false;

                if (isJumpModeActive) {
                    statusText.textContent = "Reading (Jump Mode)...";
                } else {
                    statusText.textContent = "Reading...";
                }

                speakCurrentSentence();
            }
        }

        function nextSentence() {
            if (sentences.length === 0) {
                prepareTextChunks();
            }
            if (sentences.length === 0) return;

            if (currentSentenceIndex < sentences.length - 1) {
                currentSentenceIndex++;
                if (isSpeaking && !isPaused) {
                    cancelCurrentSpeech();
                    speakCurrentSentence();
                } else {
                    // Update highlight and scroll
                    clearHighlights();
                    const activeElement = paragraphsElements[currentSentenceIndex];
                    if (activeElement) {
                        activeElement.classList.add("tts-reading-highlight");
                        const rect = activeElement.getBoundingClientRect();
                        if (rect.top < 0 || rect.bottom > window.innerHeight) {
                            activeElement.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                    }
                }
            }
        }

        function prevSentence() {
            if (sentences.length === 0) {
                prepareTextChunks();
            }
            if (sentences.length === 0) return;

            if (currentSentenceIndex > 0) {
                currentSentenceIndex--;
                if (isSpeaking && !isPaused) {
                    cancelCurrentSpeech();
                    speakCurrentSentence();
                } else {
                    // Update highlight and scroll
                    clearHighlights();
                    const activeElement = paragraphsElements[currentSentenceIndex];
                    if (activeElement) {
                        activeElement.classList.add("tts-reading-highlight");
                        const rect = activeElement.getBoundingClientRect();
                        if (rect.top < 0 || rect.bottom > window.innerHeight) {
                            activeElement.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                    }
                }
            }
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
            
            playBtn.innerHTML = '⏸ <span class="tts-btn-text">Pause</span>';
            playBtn.classList.add("active");
            stopBtn.disabled = false;
            
            if (isJumpModeActive) {
                statusText.textContent = "Reading (Jump Mode)...";
            } else {
                statusText.textContent = "Reading...";
            }

            speakCurrentSentence();
        }

        function pauseSpeech() {
            if (!synth) return;
            isPaused = true;
            synth.pause();
            playBtn.innerHTML = '▶ <span class="tts-btn-text">Resume</span>';
            playBtn.classList.remove("active");
            
            if (isJumpModeActive) {
                statusText.textContent = "Paused (Jump Mode)";
            } else {
                statusText.textContent = "Paused";
            }
        }

        function resumeSpeech() {
            if (!synth) return;
            isPaused = false;
            synth.resume();
            playBtn.innerHTML = '⏸ <span class="tts-btn-text">Pause</span>';
            playBtn.classList.add("active");
            
            if (isJumpModeActive) {
                statusText.textContent = "Reading (Jump Mode)...";
            } else {
                statusText.textContent = "Reading...";
            }
            
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
            
            playBtn.innerHTML = '▶ <span class="tts-btn-text">Play</span>';
            playBtn.classList.remove("active");
            stopBtn.disabled = true;
            
            if (isJumpModeActive) {
                statusText.textContent = "🎯 Jump Mode Active: Tap any paragraph";
            } else {
                statusText.textContent = "Speaker Idle";
            }
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

        prevBtn.addEventListener("click", function () {
            prevSentence();
        });

        nextBtn.addEventListener("click", function () {
            nextSentence();
        });

        jumpBtn.addEventListener("click", function () {
            isJumpModeActive = !isJumpModeActive;
            if (isJumpModeActive) {
                jumpBtn.classList.add("active");
                articleBody.classList.add("tts-jump-mode-active");
                statusText.textContent = "🎯 Jump Mode Active: Tap any paragraph";
            } else {
                jumpBtn.classList.remove("active");
                articleBody.classList.remove("tts-jump-mode-active");
                if (isSpeaking && !isPaused) {
                    statusText.textContent = "Reading...";
                } else if (isSpeaking && isPaused) {
                    statusText.textContent = "Paused";
                } else {
                    statusText.textContent = "Speaker Idle";
                }
            }
        });

        // Click handler on articleBody for Jump Mode
        articleBody.addEventListener("click", function (event) {
            if (!isJumpModeActive) return;

            // Find the closest readable element
            const targetElement = event.target.closest('h2, h3, h4, p, li, blockquote');
            if (targetElement && articleBody.contains(targetElement)) {
                // Ignore clicks on links or buttons inside the element
                if (event.target.tagName.toLowerCase() === 'a' || event.target.closest('a') || event.target.closest('button')) {
                    return;
                }

                if (sentences.length === 0) {
                    prepareTextChunks();
                }

                const targetIndex = paragraphsElements.indexOf(targetElement);
                if (targetIndex !== -1) {
                    event.preventDefault();
                    jumpToSentence(targetIndex);
                }
            }
        });

        speedSelect.addEventListener("change", function () {
            // Save preferred speed to localStorage
            localStorage.setItem("nca-tts-speed", speedSelect.value);

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

    // --- 6. INTERACTIVE PRACTICE QUIZ SIMULATOR ---
    const quizContainer = document.getElementById("quiz-container");
    if (quizContainer) {
        // Hide default page navigation buttons
        const footerNav = document.querySelector(".rst-footer-buttons") || document.querySelector('[aria-label="footer navigation"]');
        if (footerNav) {
            footerNav.style.setProperty("display", "none", "important");
        }

        let activeSet = null;
        let currentQuestionIndex = 0;
        let score = 0;
        let activeFilter = "all";
        let searchQuery = "";

        const quizSets = window.NCA_QUIZ_SETS || [];

        function renderExamHub() {
            quizContainer.innerHTML = `
                <div class="quiz-hub-header">
                    <h3>🏆 Practice Exam Hub</h3>
                    <p>Select any of the 25 custom mock exams below. Each exam contains 20 unique questions aligned with actual candidate reports for the NVIDIA NCA-AIIO certification. A score of 70% or higher is required to pass.</p>
                </div>
                
                <div class="quiz-hub-controls">
                    <div class="quiz-search-wrapper">
                        <span class="quiz-search-icon">🔍</span>
                        <input type="text" id="quiz-search" placeholder="Search practice exams..." value="${searchQuery}">
                    </div>
                    <div class="quiz-filters" id="quiz-filters">
                        <button class="quiz-filter-btn ${activeFilter === 'all' ? 'active' : ''}" data-filter="all">All</button>
                        <button class="quiz-filter-btn ${activeFilter === 'not_started' ? 'active' : ''}" data-filter="not_started">Not Started</button>
                        <button class="quiz-filter-btn ${activeFilter === 'passed' ? 'active' : ''}" data-filter="passed">Passed</button>
                        <button class="quiz-filter-btn ${activeFilter === 'failed' ? 'active' : ''}" data-filter="failed">Failed</button>
                    </div>
                </div>
                
                <div class="quiz-hub-grid" id="quiz-hub-grid"></div>
            `;

            // Wire up search events
            const searchInput = document.getElementById("quiz-search");
            searchInput.addEventListener("input", function (e) {
                searchQuery = e.target.value.toLowerCase();
                filterAndRenderCards();
            });

            // Wire up filter buttons
            const filterContainer = document.getElementById("quiz-filters");
            filterContainer.addEventListener("click", function (e) {
                const btn = e.target.closest(".quiz-filter-btn");
                if (btn) {
                    document.querySelectorAll(".quiz-filter-btn").forEach(el => el.classList.remove("active"));
                    btn.classList.add("active");
                    activeFilter = btn.getAttribute("data-filter");
                    filterAndRenderCards();
                }
            });

            filterAndRenderCards();
        }

        function filterAndRenderCards() {
            const grid = document.getElementById("quiz-hub-grid");
            if (!grid) return;
            grid.innerHTML = "";

            if (!quizSets || quizSets.length === 0) {
                grid.innerHTML = `
                    <div style="grid-column: 1/-1; padding: 30px; text-align: center; color: #ef4444; background: #fef2f2; border-radius: 6px; border: 1px solid #fee2e2;">
                        <h4>⚠️ Practice Exam Database Not Generated</h4>
                        <p>To run the 25 practice exams, you must first generate the questions database by running the generator tool: <code>python generate_quiz_questions.py</code>.</p>
                    </div>
                `;
                return;
            }

            let visibleCount = 0;

            quizSets.forEach(set => {
                const savedScore = localStorage.getItem(`nca-quiz-score-${set.id}`);
                let status = "not_started";
                let scoreText = "N/A";
                let badgeClass = "badge-empty";
                let badgeText = "Not Started";

                if (savedScore !== null) {
                    const percent = parseInt(savedScore, 10);
                    scoreText = `${percent}%`;
                    if (percent >= 70) {
                        status = "passed";
                        badgeClass = "badge-pass";
                        badgeText = "Passed";
                    } else {
                        status = "failed";
                        badgeClass = "badge-fail";
                        badgeText = "Failed";
                    }
                }

                // Filter checks
                const matchesSearch = set.title.toLowerCase().includes(searchQuery) || set.description.toLowerCase().includes(searchQuery);
                let matchesFilter = true;
                if (activeFilter === "not_started" && status !== "not_started") matchesFilter = false;
                if (activeFilter === "passed" && status !== "passed") matchesFilter = false;
                if (activeFilter === "failed" && status !== "failed") matchesFilter = false;

                if (matchesSearch && matchesFilter) {
                    visibleCount++;
                    const card = document.createElement("div");
                    card.className = "quiz-hub-card";
                    card.innerHTML = `
                        <div class="quiz-card-badge-row">
                            <span class="quiz-card-badge ${badgeClass}">${badgeText}</span>
                            <span class="quiz-card-score-lbl">High Score: <strong>${scoreText}</strong></span>
                        </div>
                        <h4 class="quiz-card-title">${set.title}</h4>
                        <p class="quiz-card-desc">${set.description}</p>
                        <button class="quiz-card-start-btn" data-id="${set.id}">
                            ${status === 'not_started' ? 'Start Exam 🚀' : 'Retake Exam 🔄'}
                        </button>
                    `;

                    card.querySelector(".quiz-card-start-btn").addEventListener("click", function () {
                        startExam(set);
                    });

                    grid.appendChild(card);
                }
            });

            if (visibleCount === 0) {
                grid.innerHTML = `
                    <div style="grid-column: 1/-1; padding: 40px; text-align: center; color: #64748b;">
                        <p style="font-size: 1.2em; font-weight: 600; margin-bottom: 5px;">No Exams Found</p>
                        <p style="font-size: 0.9em;">Adjust your search or filter tags and try again.</p>
                    </div>
                `;
            }
        }

        function startExam(set) {
            activeSet = set;
            currentQuestionIndex = 0;
            score = 0;
            renderQuestion();
        }

        function renderQuestion() {
            const q = activeSet.questions[currentQuestionIndex];
            const totalQ = activeSet.questions.length;
            const progressPercent = Math.round((currentQuestionIndex / totalQ) * 100);

            quizContainer.innerHTML = `
                <div class="quiz-header-bar">
                    <button class="quiz-exit-btn" id="quiz-exit-btn">← Exit to Hub</button>
                    <span class="quiz-header-title">${activeSet.title}</span>
                </div>
                <div class="quiz-progress-text">Question ${currentQuestionIndex + 1} of ${totalQ}</div>
                <div class="quiz-progress-bar-bg">
                    <div class="quiz-progress-bar-fill" style="width: ${progressPercent}%;"></div>
                </div>
                <div class="quiz-card" id="quiz-card-${q.id}">
                    <div class="quiz-question-text">${q.question}</div>
                    <div class="quiz-options-list" id="options-list"></div>
                    <div class="quiz-explanation" id="quiz-explanation">
                        <div class="quiz-explanation-title">💡 Explanation & Rationale:</div>
                        <div class="quiz-explanation-text">${q.explanation}</div>
                    </div>
                    <div class="quiz-action-bar" id="quiz-action-bar"></div>
                </div>
            `;

            // Wire up exit button
            document.getElementById("quiz-exit-btn").addEventListener("click", function () {
                if (confirm("Are you sure you want to exit? Your progress in this attempt will be lost.")) {
                    activeSet = null;
                    renderExamHub();
                }
            });

            const optionsList = document.getElementById("options-list");
            const optionLetters = ["A", "B", "C", "D"];

            q.options.forEach((optText, idx) => {
                const optBtn = document.createElement("button");
                optBtn.className = "quiz-option";
                optBtn.innerHTML = `
                    <span class="quiz-option-marker">${optionLetters[idx]}</span>
                    <span class="quiz-option-text">${optText}</span>
                `;
                
                optBtn.addEventListener("click", function () {
                    handleOptionClick(idx, optBtn);
                });
                
                optionsList.appendChild(optBtn);
            });
        }

        function handleOptionClick(selectedIndex, selectedBtn) {
            const q = activeSet.questions[currentQuestionIndex];
            const optionsList = document.getElementById("options-list");
            const optionButtons = optionsList.getElementsByClassName("quiz-option");
            const explanationDiv = document.getElementById("quiz-explanation");
            const actionBar = document.getElementById("quiz-action-bar");

            // Disable all option buttons
            for (let i = 0; i < optionButtons.length; i++) {
                optionButtons[i].classList.add("disabled");
            }

            // Check if selected is correct
            const isCorrect = selectedIndex === q.correctAnswer;
            if (isCorrect) {
                selectedBtn.classList.add("correct");
                score++;
            } else {
                selectedBtn.classList.add("incorrect");
                if (q.correctAnswer >= 0 && q.correctAnswer < optionButtons.length) {
                    optionButtons[q.correctAnswer].classList.add("correct");
                }
            }

            // Show explanation
            explanationDiv.classList.add("visible");

            // Add Next button
            const isLast = currentQuestionIndex === activeSet.questions.length - 1;
            const nextBtn = document.createElement("button");
            nextBtn.className = "quiz-next-btn";
            nextBtn.textContent = isLast ? "Finish Exam 🏁" : "Next Question ⏭";
            nextBtn.addEventListener("click", function () {
                currentQuestionIndex++;
                if (currentQuestionIndex < activeSet.questions.length) {
                    renderQuestion();
                } else {
                    renderResults();
                }
            });
            actionBar.appendChild(nextBtn);
            
            // Scroll next button into view if off-screen
            nextBtn.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }

        function renderResults() {
            const totalQ = activeSet.questions.length;
            const percent = Math.round((score / totalQ) * 100);
            const isPass = percent >= 70; // 70% passing score
            
            // Save score to local storage if higher than existing
            const currentHigh = localStorage.getItem(`nca-quiz-score-${activeSet.id}`);
            if (currentHigh === null || percent > parseInt(currentHigh, 10)) {
                localStorage.setItem(`nca-quiz-score-${activeSet.id}`, percent.toString());
            }

            quizContainer.innerHTML = `
                <div class="quiz-scorecard">
                    <h3>🎓 Practice Exam Results</h3>
                    <p style="font-size: 1.1em; font-weight: 600; color: #64748b; margin-top: -5px; margin-bottom: 20px;">
                        ${activeSet.title}
                    </p>
                    
                    <div class="quiz-scorecard-result">
                        <div class="quiz-score-circle ${isPass ? 'pass' : 'fail'}">
                            <span class="quiz-score-num">${percent}%</span>
                            <span class="quiz-score-label">${score} / ${totalQ} Correct</span>
                        </div>
                        <div class="quiz-status-badge ${isPass ? 'pass' : 'fail'}">
                            ${isPass ? '✅ PASSED' : '❌ FAILED'}
                        </div>
                    </div>
                    
                    <p style="margin-bottom: 25px; max-width: 500px; line-height: 1.5; color: #475569;">
                        ${isPass 
                            ? 'Excellent work! You have shown a strong conceptual understanding of NVIDIA GPU architectures, InfiniBand networking, software stacks, and monitoring commands. You are in good shape for the certification exam!' 
                            : 'Do not worry! Review the exam blueprint chapters in the AI Kaboom Study Hub, pay close attention to DCGM/nvidia-smi commands, networking configurations, and try again when you are ready.'
                        }
                    </p>
                    
                    <div class="quiz-details-grid">
                        <div class="quiz-detail-card">
                            <div class="quiz-detail-val">${score}</div>
                            <div class="quiz-detail-lbl">Correct</div>
                        </div>
                        <div class="quiz-detail-card">
                            <div class="quiz-detail-val">${totalQ - score}</div>
                            <div class="quiz-detail-lbl">Incorrect</div>
                        </div>
                        <div class="quiz-detail-card">
                            <div class="quiz-detail-val">70%</div>
                            <div class="quiz-detail-lbl">Passing Score</div>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
                        <button class="quiz-retry-btn" id="quiz-retry-btn" style="background-color: #3b82f6;">🔄 Retake Exam</button>
                        <button class="quiz-retry-btn" id="quiz-hub-btn" style="background-color: #6c757d;">🏠 Return to Hub</button>
                    </div>
                </div>
            `;

            document.getElementById("quiz-retry-btn").addEventListener("click", function() {
                startExam(activeSet);
            });
            document.getElementById("quiz-hub-btn").addEventListener("click", function() {
                activeSet = null;
                renderExamHub();
            });
        }

        // Initialize by loading the hub
        renderExamHub();
    }

    // --- 7. EXAM MOCK TEST SIMULATOR ---
    const mockContainer = document.getElementById("mock-test-container");
    if (mockContainer) {
        let pool = window.NCA_MOCK_TEST_POOL || null;
        let testQuestions = [];
        let userAnswers = []; // stores selected index (0, 1, 2, 3)
        let currentQuestionIndex = 0;
        let timerInterval = null;
        let timeRemaining = 3600; // 60 minutes in seconds
        let isSubmitted = false;

        // Hide default page navigation buttons on the mock test page
        const footerNav = document.querySelector(".rst-footer-buttons") || document.querySelector('[aria-label="footer navigation"]');
        if (footerNav) {
            footerNav.style.setProperty("display", "none", "important");
        }

        function renderMockHome() {
            if (!pool || !pool.questions || pool.questions.length === 0) {
                mockContainer.innerHTML = `
                    <div style="padding: 20px; text-align: center; color: #ef4444;">
                        <h4>⚠️ Mock Test Pool Not Found</h4>
                        <p>Unable to load the mock exam questions. Please verify that the question source files are correctly compiled.</p>
                    </div>
                `;
                return;
            }

            const highscore = localStorage.getItem("nca-mock-highscore");
            let scoreHTML = `<p style="font-size: 0.9em; color: #64748b;">No attempts recorded yet. Take the mock test to track your high score!</p>`;
            if (highscore !== null) {
                const percent = parseInt(highscore, 10);
                const isPass = percent >= 70;
                scoreHTML = `
                    <div class="mock-score-pill ${isPass ? 'pass' : 'fail'}">
                        <strong>High Score: ${percent}%</strong> (${isPass ? 'PASSED' : 'FAILED'})
                    </div>
                `;
            }

            mockContainer.innerHTML = `
                <div class="mock-home-card">
                    <div class="mock-badge">OFFICIAL BLUEPRINT</div>
                    <h2>📝 NVIDIA Certified Associate (NCA-AIIO) Exam Simulator</h2>
                    <p style="margin-bottom: 20px; color: #475569;">Simulate the real exam environment. This simulator dynamically selects 50 questions from our vetted pool of ${pool.questions.length} questions, matching the exact percentage weights of the official NVIDIA blueprint.</p>
                    
                    <div class="mock-rules-grid">
                        <div class="mock-rule-item">⏱️ <strong>Time Limit:</strong> 60 minutes</div>
                        <div class="mock-rule-item">❓ <strong>Total Questions:</strong> 50 MCQs</div>
                        <div class="mock-rule-item">🎯 <strong>Passing Score:</strong> 70% (35/50)</div>
                        <div class="mock-rule-item">🛠️ <strong>No Auto-Check:</strong> Answers revealed only after submission</div>
                    </div>
                    
                    <div class="mock-blueprint-table">
                        <div class="mock-bp-row header">
                            <span>Domain</span>
                            <span>Weight</span>
                            <span>Questions</span>
                        </div>
                        <div class="mock-bp-row">
                            <span>Essential AI Knowledge</span>
                            <span>38%</span>
                            <span>19 questions</span>
                        </div>
                        <div class="mock-bp-row">
                            <span>AI Infrastructure</span>
                            <span>40%</span>
                            <span>20 questions</span>
                        </div>
                        <div class="mock-bp-row">
                            <span>AI Operations</span>
                            <span>22%</span>
                            <span>11 questions</span>
                        </div>
                    </div>
                    
                    <div class="mock-highscore-section">
                        ${scoreHTML}
                    </div>
                    
                    <button class="mock-start-btn" id="mock-start-btn">Start Mock Test 🚀</button>
                </div>
            `;

            document.getElementById("mock-start-btn").addEventListener("click", startMockTest);
        }

        function shuffleArray(arr) {
            let shuffled = arr.slice();
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        }

        function startMockTest() {
            // Select questions proportionally
            const questions = pool.questions;
            
            const essential = shuffleArray(questions.filter(q => q.section === "Essential AI Knowledge"));
            const infra = shuffleArray(questions.filter(q => q.section === "AI Infrastructure"));
            const ops = shuffleArray(questions.filter(q => q.section === "AI Operations"));

            // Check if we have enough questions
            if (essential.length < 19 || infra.length < 20 || ops.length < 11) {
                alert(`Error: Question pool contains insufficient questions. Essential: ${essential.length}/19, Infra: ${infra.length}/20, Ops: ${ops.length}/11`);
                return;
            }

            // Slice out required counts
            const selected = [
                ...essential.slice(0, 19),
                ...infra.slice(0, 20),
                ...ops.slice(0, 11)
            ];

            // Shuffling the final set so categories are mixed
            testQuestions = shuffleArray(selected);
            userAnswers = Array(50).fill(null);
            currentQuestionIndex = 0;
            timeRemaining = 3600;
            isSubmitted = false;

            // Start Timer
            startTimer();

            // Render first question
            renderQuestion();
        }

        function startTimer() {
            if (timerInterval) clearInterval(timerInterval);
            timerInterval = setInterval(function () {
                timeRemaining--;
                updateTimerDisplay();
                if (timeRemaining <= 0) {
                    clearInterval(timerInterval);
                    autoSubmitTest();
                }
            }, 1000);
        }

        function updateTimerDisplay() {
            const timerEl = document.getElementById("mock-timer");
            if (!timerEl) return;
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;
            timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            if (timeRemaining < 300) { // under 5 minutes, turn timer red
                timerEl.classList.add("danger");
            } else {
                timerEl.classList.remove("danger");
            }
        }

        function renderQuestion() {
            const q = testQuestions[currentQuestionIndex];
            const answeredCount = userAnswers.filter(a => a !== null).length;
            const percentage = Math.round((currentQuestionIndex / 50) * 100);

            const optionLetters = ["A", "B", "C", "D"];
            const letterToIdxMap = {"A": 0, "B": 1, "C": 2, "D": 3};

            mockContainer.innerHTML = `
                <div class="mock-test-header">
                    <div class="mock-title-grp">
                        <button class="mock-exit-btn" id="mock-exit-btn">← Exit</button>
                        <span>Exam Simulator</span>
                    </div>
                    <div class="mock-stats-grp">
                        <span class="mock-stat-badge">Answered: ${answeredCount} / 50</span>
                        <span class="mock-timer-badge" id="mock-timer-wrap">⏱️ <span id="mock-timer"></span></span>
                    </div>
                </div>
                
                <div class="quiz-progress-bar-bg" style="margin-top: 10px;">
                    <div class="quiz-progress-bar-fill" style="width: ${percentage}%;"></div>
                </div>
                
                <div class="mock-question-card">
                    <div class="mock-card-meta">Domain: ${q.section} | Difficulty: ${q.difficulty}</div>
                    <div class="quiz-question-text" style="font-size: 1.15em; margin-bottom: 20px;">Question ${currentQuestionIndex + 1}: ${q.question}</div>
                    
                    <div class="quiz-options-list" id="mock-options-list"></div>
                    
                    <div class="mock-action-bar">
                        <button class="mock-nav-btn" id="mock-prev-btn" ${currentQuestionIndex === 0 ? 'disabled' : ''}>◀ Prev</button>
                        <button class="mock-nav-btn" id="mock-next-btn" ${currentQuestionIndex === 49 ? 'disabled' : ''}>Next ▶</button>
                        <button class="mock-submit-btn" id="mock-submit-btn-quiz">Submit Exam 🏁</button>
                    </div>
                </div>
            `;

            updateTimerDisplay();

            // Wire up exit
            document.getElementById("mock-exit-btn").addEventListener("click", function () {
                if (confirm("Are you sure you want to exit? Your answers will be lost and this attempt will be deleted.")) {
                    clearInterval(timerInterval);
                    renderMockHome();
                }
            });

            // Wire up navigation
            document.getElementById("mock-prev-btn").addEventListener("click", function () {
                if (currentQuestionIndex > 0) {
                    currentQuestionIndex--;
                    renderQuestion();
                }
            });

            document.getElementById("mock-next-btn").addEventListener("click", function () {
                if (currentQuestionIndex < 49) {
                    currentQuestionIndex++;
                    renderQuestion();
                }
            });

            // Wire up submit
            document.getElementById("mock-submit-btn-quiz").addEventListener("click", function () {
                const unanswered = 50 - userAnswers.filter(a => a !== null).length;
                let msg = "Are you sure you want to submit the exam?";
                if (unanswered > 0) {
                    msg = `Warning: You have ${unanswered} unanswered questions. Are you sure you want to submit the exam?`;
                }
                if (confirm(msg)) {
                    submitExam();
                }
            });

            // Render options
            const optionsList = document.getElementById("mock-options-list");
            const selectedIdx = userAnswers[currentQuestionIndex];

            q.options.forEach((optText, idx) => {
                const optBtn = document.createElement("button");
                optBtn.className = "quiz-option";
                if (selectedIdx === idx) {
                    optBtn.classList.add("selected");
                }

                optBtn.innerHTML = `
                    <span class="quiz-option-marker">${optionLetters[idx]}</span>
                    <span class="quiz-option-text">${optText}</span>
                `;

                optBtn.addEventListener("click", function () {
                    userAnswers[currentQuestionIndex] = idx;
                    // Re-render to show selection highlight
                    renderQuestion();
                });

                optionsList.appendChild(optBtn);
            });
        }

        function autoSubmitTest() {
            alert("Time is up! The exam is being submitted automatically.");
            submitExam();
        }

        function submitExam() {
            if (timerInterval) clearInterval(timerInterval);
            isSubmitted = true;

            // Calculate results
            let correctCount = 0;
            let essentialCorrect = 0;
            let infraCorrect = 0;
            let opsCorrect = 0;

            const letterToIdxMap = {"A": 0, "B": 1, "C": 2, "D": 3};

            testQuestions.forEach((q, idx) => {
                const correctIdx = letterToIdxMap[q.answer];
                const userIdx = userAnswers[idx];
                const isCorrect = userIdx === correctIdx;

                if (isCorrect) {
                    correctCount++;
                    if (q.section === "Essential AI Knowledge") essentialCorrect++;
                    else if (q.section === "AI Infrastructure") infraCorrect++;
                    else if (q.section === "AI Operations") opsCorrect++;
                }
            });

            const percent = Math.round((correctCount / 50) * 100);
            const isPass = percent >= 70; // 70% passing score (35 questions)

            // Save high score
            const currentHigh = localStorage.getItem("nca-mock-highscore");
            if (currentHigh === null || percent > parseInt(currentHigh, 10)) {
                localStorage.setItem("nca-mock-highscore", percent.toString());
            }

            renderResults(percent, correctCount, essentialCorrect, infraCorrect, opsCorrect);
        }

        function renderResults(percent, correctCount, essentialCorrect, infraCorrect, opsCorrect) {
            const isPass = percent >= 70;

            mockContainer.innerHTML = `
                <div class="quiz-scorecard" style="max-width: 700px; margin: 0 auto; text-align: left; padding: 25px;">
                    <h3 style="text-align: center; margin-bottom: 20px;">🎓 Mock Exam Results</h3>
                    
                    <div class="quiz-scorecard-result" style="margin-bottom: 30px;">
                        <div class="quiz-score-circle ${isPass ? 'pass' : 'fail'}">
                            <span class="quiz-score-num">${percent}%</span>
                            <span class="quiz-score-label">${correctCount} / 50 Correct</span>
                        </div>
                        <div class="quiz-status-badge ${isPass ? 'pass' : 'fail'}">
                            ${isPass ? '✅ PASSED' : '❌ FAILED'}
                        </div>
                    </div>
                    
                    <p style="margin-bottom: 25px; line-height: 1.5; color: #475569; text-align: center;">
                        ${isPass 
                            ? 'Congratulations! You have passed the simulated exam. Your conceptual knowledge across hardware, operations, and AI stack layers matches the requirements of the official proctored NVIDIA exam.'
                            : 'You did not pass this attempt. Review the domain breakdown below to find your weak topics, study the respective lessons, and try again when you are ready!'
                        }
                    </p>
                    
                    <h4 style="margin-top: 20px; font-weight: 700; color: #1e293b;">📊 Category Analysis</h4>
                    <div class="mock-category-breakdown">
                        <div class="mock-cat-perf-row">
                            <span class="mock-cat-name">Essential AI Knowledge (Goal: 19)</span>
                            <span class="mock-cat-score font-bold ${essentialCorrect >= 13 ? 'text-green' : 'text-red'}">${essentialCorrect} / 19</span>
                        </div>
                        <div class="mock-cat-perf-row">
                            <span class="mock-cat-name">AI Infrastructure (Goal: 20)</span>
                            <span class="mock-cat-score font-bold ${infraCorrect >= 14 ? 'text-green' : 'text-red'}">${infraCorrect} / 20</span>
                        </div>
                        <div class="mock-cat-perf-row">
                            <span class="mock-cat-name">AI Operations (Goal: 11)</span>
                            <span class="mock-cat-score font-bold ${opsCorrect >= 8 ? 'text-green' : 'text-red'}">${opsCorrect} / 11</span>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 15px; justify-content: center; margin-top: 30px; margin-bottom: 40px;">
                        <button class="quiz-retry-btn" id="mock-retry-btn" style="background-color: #3b82f6;">🔄 Retake Mock Exam</button>
                        <button class="quiz-retry-btn" id="mock-home-btn" style="background-color: #6c757d;">🏠 Return to Home</button>
                    </div>
                    
                    <hr style="border: 0; border-top: 1px solid #cbd5e1; margin-bottom: 25px;">
                    
                    <h4 style="font-weight: 700; color: #1e293b; margin-bottom: 15px;">🔍 Question Review</h4>
                    <div class="mock-review-list" id="mock-review-list"></div>
                </div>
            `;

            document.getElementById("mock-retry-btn").addEventListener("click", startMockTest);
            document.getElementById("mock-home-btn").addEventListener("click", renderMockHome);

            const reviewList = document.getElementById("mock-review-list");
            const letterToIdxMap = {"A": 0, "B": 1, "C": 2, "D": 3};
            const optionLetters = ["A", "B", "C", "D"];

            testQuestions.forEach((q, qidx) => {
                const correctIdx = letterToIdxMap[q.answer];
                const userIdx = userAnswers[qidx];
                const isCorrect = userIdx === correctIdx;

                const reviewCard = document.createElement("div");
                reviewCard.className = `mock-review-card ${isCorrect ? 'correct' : 'incorrect'}`;
                
                let reviewOptionsHTML = "";
                q.options.forEach((optText, oidx) => {
                    let optClass = "";
                    if (oidx === correctIdx) optClass = "correct";
                    else if (oidx === userIdx) optClass = "incorrect";

                    reviewOptionsHTML += `
                        <div class="mock-review-opt ${optClass}">
                            <span class="mock-review-marker">${optionLetters[oidx]}</span>
                            <span>${optText}</span>
                        </div>
                    `;
                });

                reviewCard.innerHTML = `
                    <div class="mock-review-meta">Question ${qidx + 1} of 50 | ${q.section} | Status: ${isCorrect ? '✅ Correct' : '❌ Incorrect'}</div>
                    <div class="mock-review-question">${q.question}</div>
                    <div class="mock-review-options">${reviewOptionsHTML}</div>
                    <div class="mock-review-explanation">
                        <strong>Explanation:</strong> ${q.explanation}
                    </div>
                `;

                reviewList.appendChild(reviewCard);
            });
        }

        // Load simulator home
        renderMockHome();
    }
});


