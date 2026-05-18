/* ============================================================
   ExamBuddy Nigeria - CBT Engine
   Dynamic question fetching and exam management via Supabase
   ============================================================ */

(function () {
  if (typeof window === 'undefined') return;

  // CBT Engine State
  const CBT = {
    // Configuration
    DURATION_SECS: 45 * 60, // 45 minutes default
    LS_KEY: 'exambuddy_cbt_state',

    // Runtime state
    examType: '', // 'JAMB', 'WAEC', 'NECO'
    attemptId: null,
    questions: [], // Array of question objects from API
    answers: {}, // { questionId: 'A'|'B'|'C'|'D' }
    reviewed: {}, // { questionId: true }
    current: 0,
    timerSecs: 0,
    timerInt: null,
    submitted: false,
    loading: false,
    error: null,

    // Subject display names
    SUBJECT_NAMES: {
      'use-of-english': 'Use of English',
      'mathematics': 'Mathematics',
      'biology': 'Biology',
      'chemistry': 'Chemistry',
      'physics': 'Physics',
      'economics': 'Economics',
      'government': 'Government',
      'literature': 'Literature',
      'geography': 'Geography',
      'commerce': 'Commerce',
      'accounting': 'Accounting',
      'crs': 'CRS / IRS',
      'irs': 'CRS / IRS'
    }
  };

  // Utility functions
  function generateAttemptId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return window.crypto.randomUUID();
    }
    return 'attempt_' + Math.random().toString(36).slice(2) + Date.now();
  }

  function showLoading(message = 'Loading...') {
    const loader = document.getElementById('cbtLoader');
    if (loader) {
      loader.querySelector('.loader-text').textContent = message;
      loader.style.display = 'flex';
    }
  }

  function hideLoading() {
    const loader = document.getElementById('cbtLoader');
    if (loader) {
      loader.style.display = 'none';
    }
  }

  function showError(message) {
    const errorEl = document.getElementById('cbtError');
    if (errorEl) {
      errorEl.querySelector('.error-text').textContent = message;
      errorEl.style.display = 'block';
    }
    CBT.error = message;
  }

  function hideError() {
    const errorEl = document.getElementById('cbtError');
    if (errorEl) {
      errorEl.style.display = 'none';
    }
    CBT.error = null;
  }

  // Fetch subjects for the exam type
  async function fetchSubjects(examType) {
    try {
      const data = await window.ebApi.fetchSubjects(examType);
      return data.map(subject => ({
        key: subject.slug,
        name: subject.name,
        description: subject.description
      }));
    } catch (error) {
      console.error('[CBT] Failed to fetch subjects:', error);
      throw new Error('Failed to load subjects. Please try again.');
    }
  }

  // Fetch questions based on configuration
  async function fetchQuestions(options) {
    try {
      CBT.loading = true;
      showLoading('Fetching questions...');

      const questions = await window.ebApi.fetchQuestions({
        exam: options.exam,
        subjects: options.subjects,
        count: options.count || 40,
        year: options.year || undefined,
        category: options.category || undefined
      });

      if (!Array.isArray(questions)) {
        throw new Error('Invalid response format from Supabase');
      }

      return questions.map(q => ({
        id: q.id,
        subjectKey: q.subject_slug || q.subject,
        subjectName: CBT.SUBJECT_NAMES[q.subject_slug] || q.subject || q.subjectName || q.subject_slug,
        category: q.category,
        year: q.year,
        question: q.question,
        options: q.options,
        answer: q.answer,
        explanation: q.explanation,
        difficulty: q.difficulty
      }));

    } catch (error) {
      console.error('[CBT] Failed to fetch questions:', error);
      throw error;
    } finally {
      CBT.loading = false;
      hideLoading();
    }
  }

  // Save individual answer
  async function saveAnswer(questionId, answer) {
    CBT.answers[questionId] = answer;

    try {
      const progress = {
        attemptId: CBT.attemptId,
        answers: { ...CBT.answers },
        current: CBT.current,
        reviewed: CBT.reviewed,
        timerSecs: CBT.timerSecs,
        lastUpdated: new Date().toISOString()
      };

      await window.ebApi.saveProgress(CBT.examType, progress);
    } catch (error) {
      console.warn('[CBT] Failed to save answer remotely, storing locally:', error);
    }
  }

  // Save exam progress
  async function saveProgress() {
    try {
      const progress = {
        attemptId: CBT.attemptId,
        answers: CBT.answers,
        reviewed: CBT.reviewed,
        current: CBT.current,
        timerSecs: CBT.timerSecs,
        lastUpdated: new Date().toISOString()
      };

      await window.ebApi.saveProgress(CBT.examType, progress);
    } catch (error) {
      console.warn('[CBT] Failed to save progress:', error);
    }
  }

  // Load saved progress
  async function loadProgress() {
    try {
      const progress = await window.ebApi.getProgress(CBT.examType);
      if (progress) {
        CBT.attemptId = progress.attemptId || CBT.attemptId || generateAttemptId();
        CBT.answers = progress.answers || {};
        CBT.reviewed = progress.reviewed || {};
        CBT.current = progress.current || 0;
        CBT.timerSecs = progress.timerSecs || CBT.DURATION_SECS;
        return progress;
      }
    } catch (error) {
      console.warn('[CBT] Failed to load progress:', error);
    }
    return null;
  }

  // Submit exam and save results
  async function submitExam() {
    if (CBT.submitted) return;

    try {
      CBT.submitted = true;
      showLoading('Submitting exam...');

      // Calculate results
      const results = calculateResults();

      // Save to Supabase
      await window.ebApi.saveResult(CBT.examType, results);

      // Clear progress and finalise
      if (window.ebAuth.isAuthenticated()) {
        await window.ebApi.saveProgress(CBT.examType, null);
      }

      hideLoading();
      showResults(results);
      return results;

    } catch (error) {
      console.error('[CBT] Failed to submit exam:', error);
      CBT.submitted = false;
      hideLoading();
      throw error;
    }
  }

  // Calculate exam results
  function calculateResults() {
    let correct = 0;
    let wrong = 0;
    let skipped = 0;
    const subjectBreakdown = {};

    CBT.questions.forEach(q => {
      const userAnswer = CBT.answers[q.id];
      const isCorrect = userAnswer === q.answer;

      if (!userAnswer) {
        skipped++;
      } else if (isCorrect) {
        correct++;
      } else {
        wrong++;
      }

      // Subject breakdown
      if (!subjectBreakdown[q.subjectKey]) {
        subjectBreakdown[q.subjectKey] = {
          name: q.subjectName,
          total: 0,
          correct: 0,
          wrong: 0,
          skipped: 0
        };
      }

      subjectBreakdown[q.subjectKey].total++;
      if (!userAnswer) {
        subjectBreakdown[q.subjectKey].skipped++;
      } else if (isCorrect) {
        subjectBreakdown[q.subjectKey].correct++;
      } else {
        subjectBreakdown[q.subjectKey].wrong++;
      }
    });

    const total = CBT.questions.length;
    const scorePct = Math.round((correct / total) * 100);

    return {
      pct: scorePct,
      correct,
      wrong,
      skipped,
      total,
      timeTaken: formatTime(CBT.DURATION_SECS - CBT.timerSecs),
      subjects: subjectBreakdown
    };
  }

  // Timer functions
  function startTimer() {
    if (CBT.timerInt) clearInterval(CBT.timerInt);

    CBT.timerInt = setInterval(() => {
      CBT.timerSecs--;
      updateTimerDisplay();

      if (CBT.timerSecs <= 0) {
        clearInterval(CBT.timerInt);
        autoSubmit();
      }

      // Save progress every 30 seconds
      if (CBT.timerSecs % 30 === 0) {
        saveProgress();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const timerEl = document.getElementById('cbtTimer');
    if (!timerEl) return;

    const mins = Math.floor(CBT.timerSecs / 60);
    const secs = CBT.timerSecs % 60;
    const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    timerEl.textContent = timeStr;

    // Visual warnings
    timerEl.classList.remove('warning', 'danger');
    if (CBT.timerSecs <= 300) { // 5 minutes
      timerEl.classList.add('warning');
    }
    if (CBT.timerSecs <= 60) { // 1 minute
      timerEl.classList.add('danger');
    }
  }

  function autoSubmit() {
    alert('Time is up! Your exam will be submitted automatically.');
    submitExam().then(results => {
      showResults(results);
    }).catch(error => {
      showError('Failed to submit exam. Please refresh and try again.');
    });
  }

  // UI Update functions
  function renderQuestion(index) {
    const q = CBT.questions[index];
    if (!q) return;

    const container = document.getElementById('cbtQuestionContainer');
    if (!container) return;

    const userAnswer = CBT.answers[q.id];
    const isReviewed = CBT.reviewed[q.id];

    container.innerHTML = `
      <div class="cbt-question">
        <div class="cbt-q-header">
          <div class="cbt-q-meta">
            <span class="cbt-q-subject">${q.subjectName}</span>
            <span class="cbt-q-year">${q.year}</span>
            ${isReviewed ? '<span class="cbt-reviewed">✓ Reviewed</span>' : ''}
          </div>
          <div class="cbt-q-number">${index + 1} of ${CBT.questions.length}</div>
        </div>

        <div class="cbt-q-text">${q.question}</div>

        <div class="cbt-options">
          ${Object.entries(q.options).map(([key, text]) => `
            <label class="cbt-option ${userAnswer === key ? 'selected' : ''}" data-option="${key}">
              <input type="radio" name="q-${q.id}" value="${key}" ${userAnswer === key ? 'checked' : ''}>
              <span class="cbt-option-letter">${key}</span>
              <span class="cbt-option-text">${text}</span>
            </label>
          `).join('')}
        </div>

        <div class="cbt-q-actions">
          <button class="cbt-btn-review" onclick="window.CBTEngine.toggleReview(${q.id})">
            ${isReviewed ? 'Unmark' : 'Mark for Review'}
          </button>
        </div>
      </div>
    `;

    // Add event listeners
    container.querySelectorAll('.cbt-option').forEach(option => {
      option.addEventListener('click', () => {
        const selectedOption = option.dataset.option;
        selectAnswer(q.id, selectedOption);
      });
    });
  }

  function selectAnswer(questionId, answer) {
    CBT.answers[questionId] = answer;
    saveAnswer(questionId, answer);
    renderQuestion(CBT.current);
    updatePalette();
  }

  function toggleReview(questionId) {
    CBT.reviewed[questionId] = !CBT.reviewed[questionId];
    saveProgress();
    renderQuestion(CBT.current);
    updatePalette();
  }

  function updatePalette() {
    const palette = document.getElementById('cbtPalette');
    if (!palette) return;

    palette.innerHTML = CBT.questions.map((q, i) => {
      const userAnswer = CBT.answers[q.id];
      const isReviewed = CBT.reviewed[q.id];
      const isCurrent = i === CBT.current;

      let classes = 'cbt-palette-item';
      if (isCurrent) classes += ' current';
      if (userAnswer) classes += ' answered';
      if (isReviewed) classes += ' reviewed';

      return `<button class="${classes}" onclick="window.CBTEngine.goToQuestion(${i})">${i + 1}</button>`;
    }).join('');
  }

  function goToQuestion(index) {
    if (index < 0 || index >= CBT.questions.length) return;
    CBT.current = index;
    renderQuestion(index);
    updatePalette();
  }

  function showResults(results) {
    // Implementation depends on the specific UI
    // This should be handled by the page-specific code
    window.dispatchEvent(new CustomEvent('cbt:exam-completed', { detail: results }));
  }

  // Public API
  window.CBTEngine = {
    CBT,

    // Initialization
    async init(examType) {
      CBT.examType = examType;
      CBT.timerSecs = CBT.DURATION_SECS;

      try {
        hideError();

        // Try to load saved progress first
        const savedProgress = await loadProgress();
        if (savedProgress && confirm('You have unsaved progress. Resume?')) {
          // Progress already loaded
          return { resumed: true };
        }

        return { resumed: false };

      } catch (error) {
        showError(error.message);
        throw error;
      }
    },

    // Launch exam with configuration
    async launch(options) {
      try {
        hideError();
        showLoading('Preparing exam...');

        const questions = await fetchQuestions(options);

        if (!questions.length) {
          throw new Error('No questions found for the selected criteria. Please adjust your filters.');
        }

        CBT.questions = questions;
        CBT.answers = {};
        CBT.reviewed = {};
        CBT.current = 0;
        CBT.submitted = false;
        CBT.timerSecs = options.duration * 60 || CBT.DURATION_SECS;

        // Save initial progress
        await saveProgress();

        hideLoading();
        return CBT.questions;

      } catch (error) {
        hideLoading();
        showError(error.message);
        throw error;
      }
    },

    // Navigation
    nextQuestion() {
      if (CBT.current < CBT.questions.length - 1) {
        CBT.current++;
        renderQuestion(CBT.current);
        updatePalette();
      }
    },

    prevQuestion() {
      if (CBT.current > 0) {
        CBT.current--;
        renderQuestion(CBT.current);
        updatePalette();
      }
    },

    goToQuestion,
    toggleReview,

    // Exam control
    startTimer,
    submitExam,

    // UI updates
    renderQuestion,
    updatePalette,
    updateTimerDisplay,

    // Utilities
    fetchSubjects,
    calculateResults,
    formatTime,

    // State getters
    getCurrentQuestion: () => CBT.questions[CBT.current],
    getProgress: () => ({
      current: CBT.current,
      total: CBT.questions.length,
      answered: Object.keys(CBT.answers).length,
      reviewed: Object.keys(CBT.reviewed).length,
      timeLeft: CBT.timerSecs
    })
  };

  // Utility function
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  }

})();