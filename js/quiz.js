/**
 * =====================================================
 * Interactive Quiz System
 * =====================================================
 */

console.log('📝 Quiz module loading...');

// Quiz questions database
const quizQuestions = [
    {
        question: 'ما هي أقوى أنواع القوى بين الجزيئات؟',
        options: [
            'قوى لندن التشتتية',
            'قوى ثنائي القطب',
            'الرابطة الهيدروجينية',
            'قوى فان دير فالس'
        ],
        correct: 2,
        explanation: 'الرابطة الهيدروجينية هي أقوى أنواع القوى بين الجزيئات، وتتراوح طاقتها بين 10-40 kJ/mol.'
    },
    {
        question: 'أي من الجزيئات التالية يمكن أن يكون روابط هيدروجينية؟',
        options: [
            'CH₄',
            'H₂O',
            'CO₂',
            'CCl₄'
        ],
        correct: 1,
        explanation: 'الماء (H₂O) يحتوي على ذرة هيدروجين مرتبطة بذرة أكسجين شديدة السالبية، مما يسمح بتكوين روابط هيدروجينية.'
    },
    {
        question: 'لماذا يطفو الجليد على الماء؟',
        options: [
            'لأن الجليد أخف من الماء',
            'بسبب الروابط الهيدروجينية التي تخلق بنية مفتوحة',
            'لأن الماء أثقل من الجليد',
            'بسبب قوى لندن'
        ],
        correct: 1,
        explanation: 'الروابط الهيدروجينية في الجليد تنتج بنية بلورية منتظمة ومفتوحة، مما يجعل كثافة الجليد (0.92 g/cm³) أقل من كثافة الماء (1.00 g/cm³).'
    },
    {
        question: 'ما هي الذرة الأكثر سالبية كهربائية؟',
        options: [
            'الأكسجين (O)',
            'النيتروجين (N)',
            'الفلور (F)',
            'الكلور (Cl)'
        ],
        correct: 2,
        explanation: 'الفلور (F) هو الأكثر سالبية كهربائية بقيمة 3.98 على مقياس بولنج.'
    },
    {
        question: 'أي من المركبات التالية له أعلى درجة غليان؟',
        options: [
            'HCl',
            'HBr',
            'HF',
            'HI'
        ],
        correct: 2,
        explanation: 'HF له أعلى درجة غليان (20°C) بسبب الروابط الهيدروجينية القوية، على الرغم من أنه الأخف وزناً.'
    },
    {
        question: 'قوى لندن التشتتية توجد في:',
        options: [
            'الجزيئات القطبية فقط',
            'الجزيئات غير القطبية فقط',
            'جميع الجزيئات',
            'الجزيئات الأيونية فقط'
        ],
        correct: 2,
        explanation: 'قوى لندن التشتتية توجد في جميع الجزيئات، سواء كانت قطبية أو غير قطبية.'
    },
    {
        question: 'ما هو فرق السالبية الكهربائية المطلوب لتكوين رابطة قطبية؟',
        options: [
            'أقل من 0.4',
            'بين 0.4 و 1.7',
            'أكبر من 1.7',
            'يجب أن يكون صفر'
        ],
        correct: 1,
        explanation: 'الرابطة القطبية تتكون عندما يكون فرق السالبية الكهربائية بين 0.4 و 1.7.'
    },
    {
        question: 'أي من الجزيئات التالية غير قطبي؟',
        options: [
            'H₂O',
            'NH₃',
            'CO₂',
            'HCl'
        ],
        correct: 2,
        explanation: 'CO₂ جزيء غير قطبي لأنه خطي ومتماثل، على الرغم من أن الروابط C=O قطبية، إلا أن العزوم تلغي بعضها.'
    },
    {
        question: 'كلما زادت قوة الترابط بين الجزيئات:',
        options: [
            'تقل درجة الغليان',
            'تزداد درجة الغليان',
            'لا تتأثر درجة الغليان',
            'تنخفض الكثافة'
        ],
        correct: 1,
        explanation: 'كلما زادت قوة الترابط بين الجزيئات، زادت الطاقة اللازمة لتبخير المادة، وبالتالي تزداد درجة الغليان.'
    },
    {
        question: 'الزاوية بين روابط H-O-H في جزيء الماء تساوي:',
        options: [
            '90°',
            '104.5°',
            '109.5°',
            '120°'
        ],
        correct: 1,
        explanation: 'الزاوية بين روابط H-O-H في جزيء الماء تساوي 104.5° بسبب الشكل المنحني للجزيء.'
    }
];

// Quiz state
let currentQuestionIndex = 0;
let quizScore = 0;
let userAnswers = [];

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeQuiz();
});

function initializeQuiz() {
    const quizContent = document.getElementById('quiz-content');
    if (!quizContent) return;

    // Load first question
    loadQuestion(0);

    // Setup navigation buttons
    setupQuizNavigation();

    // Update total questions
    const totalQuestionsEl = document.getElementById('total-questions');
    if (totalQuestionsEl) {
        totalQuestionsEl.textContent = quizQuestions.length;
    }

    console.log('✅ Quiz initialized with', quizQuestions.length, 'questions');
}

function loadQuestion(index) {
    const quizContent = document.getElementById('quiz-content');
    if (!quizContent || !quizQuestions[index]) return;

    currentQuestionIndex = index;
    const question = quizQuestions[index];

    // Create question HTML
    const questionHTML = `
        <div class="question-card active">
            <h3 class="question-text">${question.question}</h3>
            <ul class="options-list">
                ${question.options.map((option, i) => `
                    <li class="option-item" data-option="${i}">
                        <div class="option-label">${String.fromCharCode(65 + i)}</div>
                        <div class="option-text">${option}</div>
                    </li>
                `).join('')}
            </ul>
            <div class="feedback-box" id="feedback-box"></div>
        </div>
    `;

    quizContent.innerHTML = questionHTML;

    // Add click listeners to options
    const optionItems = quizContent.querySelectorAll('.option-item');
    optionItems.forEach(item => {
        item.addEventListener('click', () => handleOptionClick(item, index));
    });

    // Update progress
    updateQuizProgress();

    // Update navigation buttons
    updateNavigationButtons();
}

function handleOptionClick(item, questionIndex) {
    // Prevent re-answering
    if (userAnswers[questionIndex] !== undefined) return;

    const selectedOption = parseInt(item.getAttribute('data-option'));
    const question = quizQuestions[questionIndex];
    const isCorrect = selectedOption === question.correct;

    // Mark the selected option
    item.classList.add(isCorrect ? 'correct' : 'incorrect');

    // Also mark the correct answer if user was wrong
    if (!isCorrect) {
        const correctOption = document.querySelector(`[data-option="${question.correct}"]`);
        if (correctOption) {
            correctOption.classList.add('correct');
        }
    }

    // Disable all options
    const allOptions = document.querySelectorAll('.option-item');
    allOptions.forEach(opt => {
        opt.style.pointerEvents = 'none';
    });

    // Save answer
    userAnswers[questionIndex] = selectedOption;

    // Update score
    if (isCorrect) {
        quizScore += 10;
        updateScore(10);
    }

    // Show feedback
    showFeedback(isCorrect, question.explanation);

    // Update progress
    updateQuizProgress();
}

function showFeedback(isCorrect, explanation) {
    const feedbackBox = document.getElementById('feedback-box');
    if (!feedbackBox) return;

    feedbackBox.className = `feedback-box show ${isCorrect ? 'correct' : 'incorrect'}`;
    feedbackBox.innerHTML = `
        <h4>${isCorrect ? '✓ إجابة صحيحة!' : '✗ إجابة خاطئة'}</h4>
        <p>${explanation}</p>
    `;
}

function setupQuizNavigation() {
    const prevBtn = document.getElementById('prev-question');
    const nextBtn = document.getElementById('next-question');
    const submitBtn = document.getElementById('submit-quiz');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentQuestionIndex > 0) {
                loadQuestion(currentQuestionIndex - 1);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentQuestionIndex < quizQuestions.length - 1) {
                loadQuestion(currentQuestionIndex + 1);
            }
        });
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', showQuizResults);
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-question');
    const nextBtn = document.getElementById('next-question');
    const submitBtn = document.getElementById('submit-quiz');

    // Disable/enable previous button
    if (prevBtn) {
        prevBtn.disabled = currentQuestionIndex === 0;
    }

    // Show/hide next and submit buttons
    if (currentQuestionIndex === quizQuestions.length - 1) {
        if (nextBtn) nextBtn.style.display = 'none';
        if (submitBtn) submitBtn.style.display = 'flex';
    } else {
        if (nextBtn) nextBtn.style.display = 'flex';
        if (submitBtn) submitBtn.style.display = 'none';
    }
}

function updateQuizProgress() {
    const currentQuestionEl = document.getElementById('current-question');
    const quizScoreEl = document.getElementById('quiz-score');
    const progressFill = document.getElementById('quiz-progress-fill');

    if (currentQuestionEl) {
        currentQuestionEl.textContent = currentQuestionIndex + 1;
    }

    if (quizScoreEl) {
        quizScoreEl.textContent = quizScore;
    }

    if (progressFill) {
        const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
        progressFill.style.width = `${progress}%`;
    }
}

function showQuizResults() {
    const answeredQuestions = userAnswers.filter(a => a !== undefined).length;

    if (answeredQuestions < quizQuestions.length) {
        if (!confirm(`لقد أجبت على ${answeredQuestions} من ${quizQuestions.length} أسئلة. هل تريد إنهاء الاختبار؟`)) {
            return;
        }
    }

    const correctAnswers = userAnswers.filter((answer, index) => {
        return answer === quizQuestions[index].correct;
    }).length;

    const percentage = Math.round((correctAnswers / quizQuestions.length) * 100);

    let performanceMessage = '';
    let performanceColor = '';

    if (percentage >= 90) {
        performanceMessage = 'ممتاز! أنت خبير في قوى الترابط بين الجزيئات! 🌟';
        performanceColor = '#27AE60';
    } else if (percentage >= 70) {
        performanceMessage = 'جيد جداً! لديك فهم قوي للموضوع! 👏';
        performanceColor = '#3498DB';
    } else if (percentage >= 50) {
        performanceMessage = 'جيد! لكن يمكنك المراجعة لتحسين فهمك 📚';
        performanceColor = '#F39C12';
    } else {
        performanceMessage = 'يحتاج إلى مراجعة! حاول مراجعة الدرس مرة أخرى 💪';
        performanceColor = '#E74C3C';
    }

    // Hide quiz content
    const quizContent = document.getElementById('quiz-content');
    const quizNavigation = document.querySelector('.quiz-navigation');

    if (quizContent) quizContent.style.display = 'none';
    if (quizNavigation) quizNavigation.style.display = 'none';

    // Show results
    const resultsContainer = document.getElementById('quiz-results');
    if (resultsContainer) {
        resultsContainer.style.display = 'block';
        resultsContainer.innerHTML = `
            <div style="animation: fadeIn 0.5s ease;">
                <h3>نتيجة الاختبار</h3>
                <div class="score-display-large" style="color: ${performanceColor};">
                    ${percentage}%
                </div>
                <p class="performance-message" style="font-size: 1.2rem; color: ${performanceColor};">
                    ${performanceMessage}
                </p>
                <div style="background: #ECF0F1; border-radius: 12px; padding: 2rem; margin: 2rem 0;">
                    <p style="font-size: 1.1rem; margin-bottom: 1rem;">
                        <strong>الأسئلة الصحيحة:</strong> ${correctAnswers} من ${quizQuestions.length}
                    </p>
                    <p style="font-size: 1.1rem; margin-bottom: 1rem;">
                        <strong>النقاط المكتسبة:</strong> ${correctAnswers * 10}
                    </p>
                    <p style="font-size: 1.1rem;">
                        <strong>الإجمالي:</strong> ${quizScore} نقطة
                    </p>
                </div>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <button class="btn-primary" onclick="restartQuiz()">
                        <i class="fas fa-redo"></i> إعادة الاختبار
                    </button>
                    <button class="btn-secondary" onclick="navigateToSection('intro')">
                        <i class="fas fa-home"></i> العودة للبداية
                    </button>
                </div>
            </div>
        `;
    }

    // Update section progress
    if (typeof updateSectionProgress === 'function') {
        updateSectionProgress('quiz', 100);
    }

    // Show notification
    if (typeof showNotification === 'function') {
        showNotification(`أحسنت! حصلت على ${percentage}%`, 'success');
    }

    // Unlock master badge if perfect score
    if (percentage === 100) {
        if (typeof unlockBadge === 'function') {
            unlockBadge('master');
        }
    }
}

function restartQuiz() {
    // Reset state
    currentQuestionIndex = 0;
    quizScore = 0;
    userAnswers = [];

    // Show quiz content again
    const quizContent = document.getElementById('quiz-content');
    const quizNavigation = document.querySelector('.quiz-navigation');
    const resultsContainer = document.getElementById('quiz-results');

    if (quizContent) quizContent.style.display = 'block';
    if (quizNavigation) quizNavigation.style.display = 'flex';
    if (resultsContainer) resultsContainer.style.display = 'none';

    // Load first question
    loadQuestion(0);

    // Update score display
    const quizScoreEl = document.getElementById('quiz-score');
    if (quizScoreEl) {
        quizScoreEl.textContent = '0';
    }

    if (typeof showNotification === 'function') {
        showNotification('تم إعادة تعيين الاختبار', 'info');
    }
}

// Export functions to global scope
window.restartQuiz = restartQuiz;

console.log('✅ Quiz module loaded!');
