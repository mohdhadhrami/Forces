/**
 * =====================================================
 * Molecular Forces Interactive Lesson - Main JavaScript
 * =====================================================
 */

// =====================================================
// GLOBAL VARIABLES & STATE
// =====================================================
let currentSection = 'intro';
let currentTheme = 'light';
let totalScore = 0;
let sectionProgress = {
    intro: 0,
    'van-der-waals': 0,
    'hydrogen-bond': 0,
    'physical-properties': 0,
    'electronegativity': 0,
    'virtual-lab': 0,
    'quiz': 0
};
let unlockedBadges = [];

// Molecule Database
const moleculeDatabase = {
    'H2O': {
        name: 'الماء',
        formula: 'H₂O',
        force: 'رابطة هيدروجينية',
        boilingPoint: 100,
        polarity: 'قطبي',
        shape: 'منحنية (104.5°)',
        description: 'الماء جزيء قطبي يحتوي على روابط هيدروجينية قوية'
    },
    'NH3': {
        name: 'الأمونيا',
        formula: 'NH₃',
        force: 'رابطة هيدروجينية',
        boilingPoint: -33,
        polarity: 'قطبي',
        shape: 'هرم ثلاثي (107°)',
        description: 'الأمونيا جزيء قطبي مع روابط هيدروجينية'
    },
    'HF': {
        name: 'فلوريد الهيدروجين',
        formula: 'HF',
        force: 'رابطة هيدروجينية',
        boilingPoint: 20,
        polarity: 'قطبي جداً',
        shape: 'خطي',
        description: 'HF له أقوى رابطة هيدروجينية بسبب كهرسلبية الفلور العالية'
    },
    'HCl': {
        name: 'كلوريد الهيدروجين',
        formula: 'HCl',
        force: 'ثنائي القطب - ثنائي القطب',
        boilingPoint: -85,
        polarity: 'قطبي',
        shape: 'خطي',
        description: 'HCl جزيء قطبي مع قوى ثنائي القطب'
    },
    'CH4': {
        name: 'الميثان',
        formula: 'CH₄',
        force: 'قوى لندن',
        boilingPoint: -164,
        polarity: 'غير قطبي',
        shape: 'رباعي السطوح',
        description: 'الميثان جزيء غير قطبي مع قوى لندن فقط'
    },
    'CO2': {
        name: 'ثاني أكسيد الكربون',
        formula: 'CO₂',
        force: 'قوى لندن',
        boilingPoint: -78,
        polarity: 'غير قطبي',
        shape: 'خطي',
        description: 'CO₂ جزيء خطي غير قطبي'
    },
    'H2S': {
        name: 'كبريتيد الهيدروجين',
        formula: 'H₂S',
        force: 'ثنائي القطب - ثنائي القطب',
        boilingPoint: -60,
        polarity: 'قطبي ضعيف',
        shape: 'منحنية',
        description: 'H₂S جزيء قطبي مع قوى ثنائي القطب'
    },
    'PH3': {
        name: 'فوسفين',
        formula: 'PH₃',
        force: 'ثنائي القطب - ثنائي القطب',
        boilingPoint: -88,
        polarity: 'قطبي ضعيف',
        shape: 'هرم ثلاثي',
        description: 'PH₃ جزيء قطبي مع قوى ثنائي القطب ضعيفة'
    },
    'HBr': {
        name: 'بروميد الهيدروجين',
        formula: 'HBr',
        force: 'ثنائي القطب - ثنائي القطب',
        boilingPoint: -67,
        polarity: 'قطبي',
        shape: 'خطي',
        description: 'HBr جزيء قطبي مع قوى ثنائي القطب'
    },
    'HI': {
        name: 'يوديد الهيدروجين',
        formula: 'HI',
        force: 'ثنائي القطب - ثنائي القطب',
        boilingPoint: -35,
        polarity: 'قطبي ضعيف',
        shape: 'خطي',
        description: 'HI جزيء قطبي مع قوى ثنائي القطب'
    }
};

// =====================================================
// INITIALIZATION
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🧪 Molecular Forces Lesson Loading...');

    // Initialize all components
    initializeLoading();
    initializeNavigation();
    initializeTabs();
    initializeTheme();
    initializeMobileMenu();
    initializeScrollAnimations();
    initializeTableSort();
    initializeInteractiveElements();
    loadProgress();

    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }

    console.log('✅ All systems ready!');
});

// =====================================================
// LOADING SCREEN
// =====================================================
function initializeLoading() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 1500);
    });
}

// =====================================================
// NAVIGATION SYSTEM
// =====================================================
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');
            navigateToSection(sectionId);

            // Close mobile menu if open
            closeMobileMenu();
        });
    });

    // Update progress on scroll
    window.addEventListener('scroll', updateProgressBar);
}

function navigateToSection(sectionId) {
    console.log(`📍 Navigating to: ${sectionId}`);

    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');

        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        const activeNav = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeNav) {
            activeNav.classList.add('active');
        }

        // Update current section
        currentSection = sectionId;

        // Update section progress
        updateSectionProgress(sectionId, 50);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Save progress
        saveProgress();
    }
}

// =====================================================
// TABS SYSTEM
// =====================================================
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            const tabsContainer = button.closest('.tabs-container');

            // Deactivate all tabs and contents in this container
            tabsContainer.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            tabsContainer.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            // Activate selected tab and content
            button.classList.add('active');
            const targetContent = tabsContainer.querySelector(`#${tabName}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');

                // Re-initialize 3D models in the newly visible tab
                setTimeout(() => {
                    const models = targetContent.querySelectorAll('.model-3d');
                    models.forEach(modelContainer => {
                        if (modelContainer.id && modelContainer.children.length === 0) {
                            const containerId = modelContainer.id;
                            console.log(`🔄 Re-initializing 3D model: ${containerId}`);

                            if (containerId.includes('water') || containerId.includes('h2o')) {
                                if (typeof createWaterMolecule === 'function') {
                                    createWaterMolecule(containerId);
                                }
                            } else if (containerId.includes('ammonia') || containerId.includes('nh3')) {
                                if (typeof createAmmoniaMolecule === 'function') {
                                    createAmmoniaMolecule(containerId);
                                }
                            } else if (containerId.includes('hf')) {
                                if (typeof createHFMolecule === 'function') {
                                    createHFMolecule(containerId);
                                }
                            } else if (containerId.includes('london')) {
                                if (typeof createLondonForcesDemo === 'function') {
                                    createLondonForcesDemo(containerId);
                                }
                            } else if (containerId.includes('dipole')) {
                                if (typeof createDipoleDemo === 'function') {
                                    createDipoleDemo(containerId);
                                }
                            }
                        }
                    });
                }, 100); // Small delay to ensure tab is fully visible
            }
        });
    });
}

// =====================================================
// THEME TOGGLE (DARK/LIGHT MODE)
// =====================================================
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);

            // Add animation
            themeToggle.classList.add('animate-pulse');
            setTimeout(() => {
                themeToggle.classList.remove('animate-pulse');
            }, 500);
        });
    }
}

function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    console.log(`🎨 Theme changed to: ${theme}`);
}

// =====================================================
// MOBILE MENU
// =====================================================
function initializeMobileMenu() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const closeSidebar = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            if (sidebar) {
                sidebar.classList.add('active');
            }
        });
    }

    if (closeSidebar) {
        closeSidebar.addEventListener('click', closeMobileMenu);
    }

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (sidebar && sidebar.classList.contains('active')) {
            if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });
}

function closeMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.remove('active');
    }
}

// =====================================================
// PROGRESS TRACKING
// =====================================================
function updateProgressBar() {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;

    const windowHeight = window.innerHeight;
    const documentHeight = mainContent.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

    const progressBar = document.getElementById('main-progress-bar');
    if (progressBar) {
        progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    }
}

function updateSectionProgress(sectionId, progress) {
    sectionProgress[sectionId] = Math.max(sectionProgress[sectionId], progress);

    // Update UI
    const navItem = document.querySelector(`[data-section="${sectionId}"]`);
    if (navItem) {
        const indicator = navItem.querySelector('.progress-indicator');
        if (indicator) {
            indicator.textContent = `${sectionProgress[sectionId]}%`;
        }
    }

    // Check for badges
    checkBadges();
}

// =====================================================
// SCORE SYSTEM
// =====================================================
function updateScore(points) {
    totalScore += points;
    const scoreDisplay = document.getElementById('total-score');
    if (scoreDisplay) {
        scoreDisplay.textContent = totalScore;

        // Add animation
        scoreDisplay.parentElement.classList.add('animate-pulse');
        setTimeout(() => {
            scoreDisplay.parentElement.classList.remove('animate-pulse');
        }, 500);
    }

    saveProgress();
}

// =====================================================
// BADGES SYSTEM
// =====================================================
function checkBadges() {
    // First Step Badge
    if (!unlockedBadges.includes('first-step') && Object.values(sectionProgress).some(p => p > 0)) {
        unlockBadge('first-step');
    }

    // Scientist Badge
    if (!unlockedBadges.includes('scientist') && Object.values(sectionProgress).filter(p => p >= 50).length >= 3) {
        unlockBadge('scientist');
    }

    // Master Badge
    if (!unlockedBadges.includes('master') && Object.values(sectionProgress).every(p => p >= 80)) {
        unlockBadge('master');
    }
}

function unlockBadge(badgeId) {
    unlockedBadges.push(badgeId);

    const badge = document.querySelector(`[data-badge="${badgeId}"]`);
    if (badge) {
        badge.classList.remove('locked');
        badge.classList.add('unlocked');

        // Show notification
        showNotification(`🏆 إنجاز جديد: ${badge.querySelector('span').textContent}`, 'success');

        // Add points
        updateScore(50);
    }

    saveProgress();
}

// =====================================================
// NOTIFICATIONS
// =====================================================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27AE60' : type === 'error' ? '#E74C3C' : '#3498DB'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        font-family: 'Cairo', sans-serif;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// =====================================================
// TABLE SORTING
// =====================================================
function initializeTableSort() {
    const sortableTables = document.querySelectorAll('.sortable-table');

    sortableTables.forEach(table => {
        const headers = table.querySelectorAll('th[data-sort]');

        headers.forEach((header, index) => {
            header.addEventListener('click', () => {
                sortTable(table, index, header);
            });
        });
    });
}

function sortTable(table, columnIndex, header) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    // Determine sort direction
    const isAscending = header.classList.contains('sorted-asc');

    // Remove all sort classes
    table.querySelectorAll('th').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
    });

    // Add appropriate sort class
    header.classList.add(isAscending ? 'sorted-desc' : 'sorted-asc');

    // Sort rows
    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent.trim();
        const bValue = b.cells[columnIndex].textContent.trim();

        // Try to parse as numbers
        const aNum = parseFloat(aValue.replace(/[^0-9.-]/g, ''));
        const bNum = parseFloat(bValue.replace(/[^0-9.-]/g, ''));

        if (!isNaN(aNum) && !isNaN(bNum)) {
            return isAscending ? bNum - aNum : aNum - bNum;
        } else {
            return isAscending ? bValue.localeCompare(aValue, 'ar') : aValue.localeCompare(bValue, 'ar');
        }
    });

    // Re-append rows
    rows.forEach(row => tbody.appendChild(row));
}

// =====================================================
// INTERACTIVE ELEMENTS
// =====================================================
function initializeInteractiveElements() {
    // Force cards hover effect
    const forceCards = document.querySelectorAll('.force-card');
    forceCards.forEach(card => {
        card.addEventListener('click', () => {
            showNotification('تم تحديد نوع القوة!', 'info');
        });
    });

    // Demo buttons
    const demoButtons = document.querySelectorAll('.btn-demo');
    demoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parent = this.closest('.demo-controls');
            if (parent) {
                parent.querySelectorAll('.btn-demo').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}

// =====================================================
// POLARITY CALCULATOR
// =====================================================
function calculatePolarity() {
    const atom1 = parseFloat(document.getElementById('atom1-select').value);
    const atom2 = parseFloat(document.getElementById('atom2-select').value);

    const deltaEN = Math.abs(atom1 - atom2).toFixed(2);

    let bondType = '';
    let bondTypeClass = '';

    if (deltaEN < 0.4) {
        bondType = 'رابطة غير قطبية';
        bondTypeClass = 'nonpolar';
    } else if (deltaEN < 1.7) {
        bondType = 'رابطة قطبية';
        bondTypeClass = 'polar';
    } else {
        bondType = 'رابطة أيونية';
        bondTypeClass = 'ionic';
    }

    // Update results
    document.getElementById('delta-value').textContent = deltaEN;
    document.getElementById('bond-type').textContent = bondType;

    const resultCard = document.querySelector('.result-card');
    if (resultCard) {
        resultCard.className = `result-card ${bondTypeClass}`;
        resultCard.style.animation = 'none';
        setTimeout(() => {
            resultCard.style.animation = 'fadeIn 0.5s ease';
        }, 10);
    }

    // Visual representation
    const polarityVisual = document.getElementById('polarity-visual');
    if (polarityVisual) {
        polarityVisual.innerHTML = `
            <div style="width: ${Math.min(deltaEN * 50, 100)}%; height: 20px; background: linear-gradient(90deg,
                ${bondTypeClass === 'nonpolar' ? '#F39C12' : bondTypeClass === 'polar' ? '#3498DB' : '#E74C3C'},
                ${bondTypeClass === 'nonpolar' ? '#E67E22' : bondTypeClass === 'polar' ? '#2980B9' : '#C0392B'}
            ); border-radius: 10px; transition: all 0.5s ease;"></div>
        `;
    }

    // Add points
    updateScore(10);
    showNotification('تم حساب فرق السالبية الكهربائية!', 'success');
}

// =====================================================
// MOLECULE COMPARISON
// =====================================================
function compareMolecules() {
    const molecule1Key = document.getElementById('compare-molecule-1').value;
    const molecule2Key = document.getElementById('compare-molecule-2').value;

    const molecule1 = moleculeDatabase[molecule1Key];
    const molecule2 = moleculeDatabase[molecule2Key];

    if (!molecule1 || !molecule2) {
        showNotification('خطأ في اختيار الجزيئات', 'error');
        return;
    }

    console.log(`Comparing ${molecule1Key} vs ${molecule2Key}`);

    const comparisonResults = document.getElementById('comparison-results');
    if (comparisonResults) {
        comparisonResults.classList.add('active');
        comparisonResults.style.animation = 'fadeIn 0.5s ease';
    }

    // Update names
    document.getElementById('comp-name-1').textContent = molecule1.formula + ' (' + molecule1.name + ')';
    document.getElementById('comp-name-2').textContent = molecule2.formula + ' (' + molecule2.name + ')';

    // Update data
    const compData1 = document.getElementById('comp-data-1');
    const compData2 = document.getElementById('comp-data-2');

    if (compData1) {
        compData1.innerHTML = `
            <div class="comp-property"><strong>نوع القوة:</strong> ${molecule1.force}</div>
            <div class="comp-property"><strong>درجة الغليان:</strong> ${molecule1.boilingPoint}°C</div>
            <div class="comp-property"><strong>القطبية:</strong> ${molecule1.polarity}</div>
            <div class="comp-property"><strong>الشكل:</strong> ${molecule1.shape}</div>
        `;
    }

    if (compData2) {
        compData2.innerHTML = `
            <div class="comp-property"><strong>نوع القوة:</strong> ${molecule2.force}</div>
            <div class="comp-property"><strong>درجة الغليان:</strong> ${molecule2.boilingPoint}°C</div>
            <div class="comp-property"><strong>القطبية:</strong> ${molecule2.polarity}</div>
            <div class="comp-property"><strong>الشكل:</strong> ${molecule2.shape}</div>
        `;
    }

    // Create comparison chart if Chart.js is available
    if (typeof Chart !== 'undefined') {
        const compChart = document.getElementById('comparison-chart');
        if (compChart) {
            const ctx = compChart.getContext('2d');

            // Destroy old chart if exists
            if (window.comparisonChartInstance) {
                window.comparisonChartInstance.destroy();
            }

            window.comparisonChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['درجة الغليان (°C)'],
                    datasets: [{
                        label: molecule1.formula,
                        data: [molecule1.boilingPoint],
                        backgroundColor: 'rgba(52, 152, 219, 0.8)',
                        borderColor: '#3498DB',
                        borderWidth: 2
                    }, {
                        label: molecule2.formula,
                        data: [molecule2.boilingPoint],
                        backgroundColor: 'rgba(231, 76, 60, 0.8)',
                        borderColor: '#E74C3C',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            labels: {
                                font: { family: 'Cairo' }
                            }
                        }
                    },
                    scales: {
                        y: {
                            ticks: {
                                font: { family: 'Cairo' }
                            }
                        },
                        x: {
                            ticks: {
                                font: { family: 'Cairo' }
                            }
                        }
                    }
                }
            });
        }
    }

    // Add points
    updateScore(15);
    showNotification('تمت المقارنة بنجاح!', 'success');
}

// =====================================================
// SIMULATION CONTROLS
// =====================================================
function resetModel(modelType) {
    console.log(`Resetting ${modelType} model`);
    showNotification('تم إعادة ضبط النموذج', 'info');
}

function animateModel(modelType) {
    console.log(`Animating ${modelType} model`);
    showNotification('بدأت الحركة!', 'success');
}

function startFlowSimulation() {
    const liquidSelector = document.getElementById('liquid-selector');
    const liquid = liquidSelector ? liquidSelector.value : 'water';

    console.log(`Starting flow simulation for: ${liquid}`);
    showNotification(`بدأت محاكاة جريان ${liquid === 'water' ? 'الماء' : liquid === 'oil' ? 'الزيت' : 'العسل'}`, 'success');

    // Animate liquid drop
    const liquidDrop = document.querySelector('.liquid-drop');
    if (liquidDrop) {
        liquidDrop.style.animation = 'none';
        setTimeout(() => {
            const speed = liquid === 'water' ? '3s' : liquid === 'oil' ? '6s' : '12s';
            liquidDrop.style.animation = `drop-water ${speed} ease-in infinite`;
        }, 10);
    }
}

// Temperature slider
document.addEventListener('DOMContentLoaded', () => {
    const tempSlider = document.getElementById('temp-slider');
    const tempValue = document.getElementById('temp-value');
    const currentState = document.getElementById('current-state');
    const stateDescription = document.getElementById('state-description');
    const kineticFill = document.getElementById('kinetic-fill');

    if (tempSlider) {
        tempSlider.addEventListener('input', (e) => {
            const temp = parseInt(e.target.value);
            if (tempValue) tempValue.textContent = temp;

            // Update state
            let state = '';
            let description = '';
            let energyPercent = 0;

            if (temp < 0) {
                state = 'صلب';
                description = 'الجزيئات مرتبة بشكل منتظم وحركتها محدودة جداً';
                energyPercent = ((temp + 100) / 100) * 30;
            } else if (temp < 100) {
                state = 'سائل';
                description = 'الجزيئات قريبة من بعضها وتتحرك بحرية نسبياً';
                energyPercent = 30 + (temp / 100) * 40;
            } else {
                state = 'غاز';
                description = 'الجزيئات متباعدة وتتحرك بسرعة عالية';
                energyPercent = 70 + ((temp - 100) / 50) * 30;
            }

            if (currentState) currentState.textContent = state;
            if (stateDescription) stateDescription.textContent = description;
            if (kineticFill) kineticFill.style.width = `${Math.min(energyPercent, 100)}%`;
        });
    }
});

// Surface tension slider
document.addEventListener('DOMContentLoaded', () => {
    const tensionSlider = document.getElementById('tension-slider');
    const tensionResult = document.getElementById('tension-result');

    if (tensionSlider) {
        tensionSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);

            if (value >= 7) {
                tensionResult.textContent = 'الحشرة تطفو ✓';
                tensionResult.style.color = '#27AE60';
            } else {
                tensionResult.textContent = 'الحشرة تغرق ✗';
                tensionResult.style.color = '#E74C3C';
            }
        });
    }
});

// =====================================================
// ICE VS LIQUID WATER INTERACTIVE DEMO
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    const demoButtons = document.querySelectorAll('.btn-demo[data-state]');
    const vizContainer = document.getElementById('water-state-visualization');

    if (demoButtons.length > 0 && vizContainer) {
        // Initialize with ice structure
        if (typeof createIceStructure === 'function') {
            createIceStructure('water-state-visualization');
        }

        demoButtons.forEach(button => {
            button.addEventListener('click', () => {
                const state = button.getAttribute('data-state');

                // Update active button
                demoButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Clear existing visualization
                vizContainer.innerHTML = '';

                // Create appropriate visualization
                if (state === 'ice') {
                    if (typeof createIceStructure === 'function') {
                        createIceStructure('water-state-visualization');
                    } else {
                        console.error('createIceStructure function not found');
                    }
                } else if (state === 'liquid') {
                    if (typeof createLiquidWaterStructure === 'function') {
                        createLiquidWaterStructure('water-state-visualization');
                    } else {
                        console.error('createLiquidWaterStructure function not found');
                    }
                }
            });
        });
    }
});

// =====================================================
// INTERACTIVE DECISION TREE
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    const decisionTree = document.getElementById('decision-tree');
    const resetBtn = document.getElementById('tree-reset-btn');

    if (!decisionTree || !resetBtn) return;

    // Function to reset the tree
    function resetTree() {
        // Hide all child nodes
        const allNodes = decisionTree.querySelectorAll('.tree-node:not(.root)');
        allNodes.forEach(node => {
            node.classList.remove('active');
        });

        // Show all branches of the root node
        const rootBranches = decisionTree.querySelectorAll('.tree-node.root > .node-branches > .branch');
        rootBranches.forEach(branch => {
            branch.classList.remove('hidden');
        });
    }

    // Function to handle branch clicks
    function handleBranchClick(branch) {
        // Find the next tree node within this branch
        const nextNode = branch.querySelector('.tree-node');

        if (nextNode) {
            // Check if this is a final result node
            const isResult = nextNode.classList.contains('result');

            if (isResult) {
                // Show the result with animation
                setTimeout(() => {
                    nextNode.classList.add('active');
                }, 100);
            } else {
                // Show the next question
                setTimeout(() => {
                    nextNode.classList.add('active');
                }, 100);

                // Add click handlers to the next level branches
                const nextBranches = nextNode.querySelectorAll(':scope > .node-branches > .branch');
                nextBranches.forEach(nextBranch => {
                    nextBranch.addEventListener('click', (e) => {
                        e.stopPropagation();
                        handleBranchClick(nextBranch);
                    }, { once: true });
                });
            }

            // Hide the sibling branch (the other option)
            const parentBranches = branch.parentElement;
            if (parentBranches) {
                const allBranches = parentBranches.querySelectorAll(':scope > .branch');
                allBranches.forEach(b => {
                    if (b !== branch) {
                        b.classList.add('hidden');
                    }
                });
            }
        }
    }

    // Initialize: Add click handlers to root branches
    const rootBranches = decisionTree.querySelectorAll('.tree-node.root > .node-branches > .branch');
    rootBranches.forEach(branch => {
        branch.addEventListener('click', (e) => {
            e.stopPropagation();
            handleBranchClick(branch);
        }, { once: true });
    });

    // Reset button handler
    resetBtn.addEventListener('click', () => {
        resetTree();

        // Re-initialize click handlers
        const rootBranches = decisionTree.querySelectorAll('.tree-node.root > .node-branches > .branch');
        rootBranches.forEach(branch => {
            // Remove old listeners by cloning
            const newBranch = branch.cloneNode(true);
            branch.parentNode.replaceChild(newBranch, branch);

            newBranch.addEventListener('click', (e) => {
                e.stopPropagation();
                handleBranchClick(newBranch);
            }, { once: true });
        });
    });

    // Initial reset to set up the tree
    resetTree();
});

// =====================================================
// VIRTUAL LAB - MOLECULE BUILDER
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    const moleculeButtons = document.querySelectorAll('.molecule-btn');

    moleculeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const moleculeKey = button.getAttribute('data-molecule');
            const moleculeData = moleculeDatabase[moleculeKey];

            if (moleculeData) {
                // Update active button
                moleculeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Update properties display
                document.getElementById('prop-formula').textContent = moleculeData.formula;
                document.getElementById('prop-force').textContent = moleculeData.force;
                document.getElementById('prop-bp').textContent = moleculeData.boilingPoint + '°C';
                document.getElementById('prop-polarity').textContent = moleculeData.polarity;
                document.getElementById('prop-shape').textContent = moleculeData.shape;

                // Update 3D model
                const labMolecule3d = document.getElementById('lab-molecule-3d');
                if (labMolecule3d) {
                    labMolecule3d.innerHTML = '';

                    // Call appropriate 3D model function
                    if (moleculeKey === 'H2O' && typeof createWaterMolecule === 'function') {
                        createWaterMolecule('lab-molecule-3d');
                    } else if (moleculeKey === 'NH3' && typeof createAmmoniaMolecule === 'function') {
                        createAmmoniaMolecule('lab-molecule-3d');
                    } else if (moleculeKey === 'HF' && typeof createHFMolecule === 'function') {
                        createHFMolecule('lab-molecule-3d');
                    } else if (moleculeKey === 'HCl' && typeof createHClMolecule === 'function') {
                        createHClMolecule('lab-molecule-3d');
                    } else if (moleculeKey === 'CH4' && typeof createMethaneMolecule === 'function') {
                        createMethaneMolecule('lab-molecule-3d');
                    } else if (moleculeKey === 'CO2' && typeof createCO2Molecule === 'function') {
                        createCO2Molecule('lab-molecule-3d');
                    } else if (typeof createGenericMolecule === 'function') {
                        createGenericMolecule('lab-molecule-3d', moleculeKey.toLowerCase());
                    }
                }

                showNotification(`تم اختيار ${moleculeData.name}`, 'success');
                updateScore(5);
            }
        });
    });
});

// =====================================================
// PROGRESS PERSISTENCE
// =====================================================
function saveProgress() {
    const progressData = {
        currentSection,
        sectionProgress,
        totalScore,
        unlockedBadges,
        timestamp: Date.now()
    };

    localStorage.setItem('molecularForcesProgress', JSON.stringify(progressData));
    console.log('💾 Progress saved');
}

function loadProgress() {
    const savedData = localStorage.getItem('molecularForcesProgress');

    if (savedData) {
        try {
            const data = JSON.parse(savedData);

            sectionProgress = data.sectionProgress || sectionProgress;
            totalScore = data.totalScore || 0;
            unlockedBadges = data.unlockedBadges || [];

            // Update UI
            document.getElementById('total-score').textContent = totalScore;

            // Update section progress indicators
            Object.keys(sectionProgress).forEach(sectionId => {
                updateSectionProgress(sectionId, sectionProgress[sectionId]);
            });

            // Restore unlocked badges
            unlockedBadges.forEach(badgeId => {
                const badge = document.querySelector(`[data-badge="${badgeId}"]`);
                if (badge) {
                    badge.classList.remove('locked');
                    badge.classList.add('unlocked');
                }
            });

            console.log('📂 Progress loaded');
        } catch (error) {
            console.error('Error loading progress:', error);
        }
    }
}

function resetProgress() {
    if (confirm('هل أنت متأكد من إعادة تعيين كل التقدم؟')) {
        localStorage.removeItem('molecularForcesProgress');
        location.reload();
    }
}

// =====================================================
// SCROLL ANIMATIONS
// =====================================================
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.force-card, .chart-card, .property-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease';
        observer.observe(el);
    });
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler
window.addEventListener('scroll', debounce(updateProgressBar, 100));

// =====================================================
// KEYBOARD SHORTCUTS
// =====================================================
document.addEventListener('keydown', (e) => {
    // Ctrl + D: Toggle dark mode
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }

    // Ctrl + R: Reset progress (with confirmation)
    if (e.ctrlKey && e.key === 'r' && e.shiftKey) {
        e.preventDefault();
        resetProgress();
    }
});

// =====================================================
// INTERACTIVE QUESTION - CHLORINE PUZZLE
// =====================================================
let attemptCount = 0;
const MAX_ATTEMPTS = 3;

const encouragementMessages = [
    "محاولة رائعة! 🌟 فكر أكثر في خصائص الذرات الصغيرة مقارنة بالكبيرة...",
    "أنت على الطريق الصحيح! 💡 حجم الذرة له دور مهم في تكوين الروابط...",
    "تقريباً هناك! 🎯 تذكر: السالبية الكهربائية ليست العامل الوحيد!"
];

function handleAttempt() {
    const answerInput = document.getElementById('answer-input');
    const attemptsLeftEl = document.getElementById('attempts-left');
    const encouragementMessage = document.getElementById('encouragement-message');
    const encouragementText = document.getElementById('encouragement-text');
    const answerSection = document.getElementById('answer-section');
    const attemptSection = document.getElementById('attempt-section');
    const submitBtn = document.getElementById('submit-attempt');

    // Check if input is empty
    if (!answerInput.value.trim()) {
        encouragementText.textContent = "⚠️ يرجى كتابة إجابتك أولاً!";
        encouragementMessage.style.display = 'block';
        encouragementMessage.style.background = 'rgba(230, 126, 34, 0.1)';
        encouragementMessage.style.borderColor = '#e67e22';
        return;
    }

    attemptCount++;
    const attemptsLeft = MAX_ATTEMPTS - attemptCount;

    // Update attempts counter
    attemptsLeftEl.textContent = attemptsLeft;

    if (attemptCount < MAX_ATTEMPTS) {
        // Show encouragement message
        encouragementText.textContent = encouragementMessages[attemptCount - 1];
        encouragementMessage.style.display = 'block';
        encouragementMessage.style.background = 'rgba(52, 152, 219, 0.1)';
        encouragementMessage.style.borderColor = '#3498db';

        // Add animation
        encouragementMessage.classList.add('fade-in');

        // Clear input for next attempt
        answerInput.value = '';
        answerInput.placeholder = `المحاولة ${attemptCount + 1}... واصل التفكير!`;

        // Change button text
        if (attemptCount === MAX_ATTEMPTS - 1) {
            submitBtn.innerHTML = '<i class="fas fa-eye"></i> المحاولة الأخيرة - اكتشف الإجابة!';
            submitBtn.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
        }
    } else {
        // Reveal answer after 3 attempts
        encouragementText.textContent = "🎉 رائع! لقد أكملت المحاولات الثلاث. الآن شاهد الإجابة الكاملة!";
        encouragementMessage.style.display = 'block';
        encouragementMessage.style.background = 'rgba(39, 174, 96, 0.1)';
        encouragementMessage.style.borderColor = '#27ae60';

        // Hide attempt section and show answer with animation
        setTimeout(() => {
            attemptSection.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            attemptSection.style.opacity = '0';
            attemptSection.style.transform = 'translateY(-20px)';

            setTimeout(() => {
                attemptSection.style.display = 'none';
                answerSection.style.display = 'block';
                answerSection.style.opacity = '0';
                answerSection.style.transform = 'translateY(20px)';

                // Trigger animation
                setTimeout(() => {
                    answerSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    answerSection.style.opacity = '1';
                    answerSection.style.transform = 'translateY(0)';

                    // Scroll to answer
                    answerSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                    // Show confetti effect (optional)
                    showConfetti();
                }, 100);
            }, 500);
        }, 1500);
    }

    // Add pulse animation to attempts counter
    attemptsLeftEl.parentElement.classList.add('pulse-animation');
    setTimeout(() => {
        attemptsLeftEl.parentElement.classList.remove('pulse-animation');
    }, 600);
}

function showConfetti() {
    // Simple confetti effect using emojis
    const confettiEmojis = ['🎉', '✨', '🌟', '💡', '⚡', '🔬', '🧪'];
    const answerSection = document.getElementById('answer-section');

    for (let i = 0; i < 15; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        answerSection.appendChild(confetti);

        // Remove after animation
        setTimeout(() => confetti.remove(), 3000);
    }
}

// =====================================================
// EXPORT FUNCTIONS TO GLOBAL SCOPE
// =====================================================
window.navigateToSection = navigateToSection;
window.calculatePolarity = calculatePolarity;
window.compareMolecules = compareMolecules;
window.resetModel = resetModel;
window.animateModel = animateModel;
window.startFlowSimulation = startFlowSimulation;
window.updateScore = updateScore;
window.showNotification = showNotification;
window.handleAttempt = handleAttempt;

// =====================================================
// PERFORMANCE MONITORING
// =====================================================
if (performance && performance.mark) {
    performance.mark('app-initialized');
    console.log('⚡ Performance metrics available');
}

console.log('🎉 Main JavaScript loaded successfully!');
