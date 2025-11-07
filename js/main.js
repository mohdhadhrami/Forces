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
    const molecule1 = document.getElementById('compare-molecule-1').value;
    const molecule2 = document.getElementById('compare-molecule-2').value;

    console.log(`Comparing ${molecule1} vs ${molecule2}`);

    const comparisonResults = document.getElementById('comparison-results');
    if (comparisonResults) {
        comparisonResults.classList.add('active');
        comparisonResults.style.animation = 'fadeIn 0.5s ease';
    }

    // Update names
    document.getElementById('comp-name-1').textContent = molecule1;
    document.getElementById('comp-name-2').textContent = molecule2;

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

// =====================================================
// PERFORMANCE MONITORING
// =====================================================
if (performance && performance.mark) {
    performance.mark('app-initialized');
    console.log('⚡ Performance metrics available');
}

console.log('🎉 Main JavaScript loaded successfully!');
