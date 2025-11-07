/**
 * =====================================================
 * Charts and Data Visualization
 * =====================================================
 */

console.log('📊 Charts module loading...');

// Wait for Chart.js to load
document.addEventListener('DOMContentLoaded', () => {
    if (typeof Chart !== 'undefined') {
        initializeAllCharts();
    } else {
        console.warn('Chart.js not loaded yet, waiting...');
        setTimeout(initializeAllCharts, 1000);
    }
});

function initializeAllCharts() {
    // Group 15 Chart (NH3, PH3, AsH3)
    createGroup15Chart();

    // Group 16 Chart (H2O, H2S, H2Se, H2Te)
    createGroup16Chart();

    // Halides Chart (HF, HCl, HBr, HI)
    createHalidesChart();

    // Unified Interactive Chart
    createUnifiedChart();

    // Electronegativity Chart
    createElectronegativityChart();

    // Van der Waals Comparison Chart
    createVDWComparisonChart();

    console.log('✅ All charts initialized');
}

// Group 15 Boiling Points Chart
function createGroup15Chart() {
    const canvas = document.getElementById('group15-chart');
    if (!canvas || typeof Chart === 'undefined') return;

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['NH₃', 'PH₃', 'AsH₃', 'SbH₃'],
            datasets: [{
                label: 'درجة الغليان (°C)',
                data: [-33, -88, -62, -17],
                borderColor: '#3498DB',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 3,
                pointRadius: 6,
                pointBackgroundColor: '#3498DB',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        font: { size: 14, family: 'Cairo' },
                        color: '#2C3E50'
                    }
                },
                tooltip: {
                    backgroundColor: '#2C3E50',
                    titleFont: { size: 14, family: 'Cairo' },
                    bodyFont: { size: 13, family: 'Cairo' },
                    padding: 12,
                    displayColors: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'درجة الغليان (°C)',
                        font: { size: 14, family: 'Cairo' },
                        color: '#2C3E50'
                    },
                    ticks: {
                        font: { family: 'Cairo' },
                        color: '#7F8C8D'
                    },
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                x: {
                    ticks: {
                        font: { family: 'Cairo', size: 13 },
                        color: '#2C3E50'
                    },
                    grid: { display: false }
                }
            }
        }
    });
}

// Group 16 Boiling Points Chart
function createGroup16Chart() {
    const canvas = document.getElementById('group16-chart');
    if (!canvas || typeof Chart === 'undefined') return;

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['H₂O', 'H₂S', 'H₂Se', 'H₂Te'],
            datasets: [{
                label: 'درجة الغليان (°C)',
                data: [100, -60, -41, -2],
                backgroundColor: [
                    'rgba(39, 174, 96, 0.8)',
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(52, 152, 219, 0.8)'
                ],
                borderColor: [
                    '#27AE60',
                    '#3498DB',
                    '#3498DB',
                    '#3498DB'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#2C3E50',
                    titleFont: { size: 14, family: 'Cairo' },
                    bodyFont: { size: 13, family: 'Cairo' },
                    padding: 12
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'درجة الغليان (°C)',
                        font: { size: 14, family: 'Cairo' },
                        color: '#2C3E50'
                    },
                    ticks: {
                        font: { family: 'Cairo' },
                        color: '#7F8C8D'
                    },
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                x: {
                    ticks: {
                        font: { family: 'Cairo', size: 13 },
                        color: '#2C3E50'
                    },
                    grid: { display: false }
                }
            }
        }
    });
}

// Halides Boiling Points Chart
function createHalidesChart() {
    const canvas = document.getElementById('halides-bp-chart');
    if (!canvas || typeof Chart === 'undefined') return;

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['HF', 'HCl', 'HBr', 'HI'],
            datasets: [{
                label: 'درجة الغليان (°C)',
                data: [20, -85, -67, -35],
                borderColor: '#E74C3C',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                borderWidth: 3,
                pointRadius: 6,
                pointBackgroundColor: function(context) {
                    const index = context.dataIndex;
                    return index === 0 ? '#27AE60' : '#E74C3C';
                },
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        font: { size: 14, family: 'Cairo' },
                        color: '#2C3E50'
                    }
                },
                tooltip: {
                    backgroundColor: '#2C3E50',
                    titleFont: { size: 14, family: 'Cairo' },
                    bodyFont: { size: 13, family: 'Cairo' },
                    padding: 12,
                    displayColors: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'درجة الغليان (°C)',
                        font: { size: 14, family: 'Cairo' },
                        color: '#2C3E50'
                    },
                    ticks: {
                        font: { family: 'Cairo' },
                        color: '#7F8C8D'
                    },
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                x: {
                    ticks: {
                        font: { family: 'Cairo', size: 13 },
                        color: '#2C3E50'
                    },
                    grid: { display: false }
                }
            }
        }
    });

    // Also create for halide comparison in hydrogen bond section
    const halidesChart = document.getElementById('halides-chart');
    if (halidesChart) {
        const ctx2 = halidesChart.getContext('2d');
        new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: ['HF', 'HCl', 'HBr', 'HI'],
                datasets: [{
                    label: 'درجة الغليان (°C)',
                    data: [20, -85, -67, -35],
                    backgroundColor: [
                        'rgba(39, 174, 96, 0.8)',
                        'rgba(52, 152, 219, 0.8)',
                        'rgba(52, 152, 219, 0.8)',
                        'rgba(52, 152, 219, 0.8)'
                    ],
                    borderColor: [
                        '#27AE60',
                        '#3498DB',
                        '#3498DB',
                        '#3498DB'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'درجة الغليان (°C)',
                            font: { size: 14, family: 'Cairo' }
                        },
                        ticks: { font: { family: 'Cairo' } }
                    },
                    x: {
                        ticks: { font: { family: 'Cairo', size: 13 } }
                    }
                }
            }
        });
    }
}

// Unified Interactive Chart
let unifiedChartInstance = null;

function createUnifiedChart() {
    const canvas = document.getElementById('unified-chart');
    if (!canvas || typeof Chart === 'undefined') return;

    const ctx = canvas.getContext('2d');

    // Define all datasets
    const datasets = [
        {
            label: 'المجموعة 15',
            data: [
                { x: 'NH₃', y: -33 },
                { x: 'PH₃', y: -88 },
                { x: 'AsH₃', y: -62 },
                { x: 'SbH₃', y: -17 }
            ],
            borderColor: '#3498DB',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            borderWidth: 3,
            pointRadius: 6,
            pointBackgroundColor: '#3498DB',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            tension: 0.4,
            hidden: false,
            group: 'group15'
        },
        {
            label: 'المجموعة 16',
            data: [
                { x: 'H₂O', y: 100 },
                { x: 'H₂S', y: -60 },
                { x: 'H₂Se', y: -41 },
                { x: 'H₂Te', y: -2 }
            ],
            borderColor: '#27AE60',
            backgroundColor: 'rgba(39, 174, 96, 0.1)',
            borderWidth: 3,
            pointRadius: 6,
            pointBackgroundColor: '#27AE60',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            tension: 0.4,
            hidden: false,
            group: 'group16'
        },
        {
            label: 'هاليدات الهيدروجين',
            data: [
                { x: 'HF', y: 20 },
                { x: 'HCl', y: -85 },
                { x: 'HBr', y: -67 },
                { x: 'HI', y: -35 }
            ],
            borderColor: '#E74C3C',
            backgroundColor: 'rgba(231, 76, 60, 0.1)',
            borderWidth: 3,
            pointRadius: 6,
            pointBackgroundColor: '#E74C3C',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            tension: 0.4,
            hidden: false,
            group: 'halides'
        }
    ];

    unifiedChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: { size: 14, family: 'Cairo' },
                        color: '#2C3E50',
                        usePointStyle: true,
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: '#2C3E50',
                    titleFont: { size: 14, family: 'Cairo' },
                    bodyFont: { size: 13, family: 'Cairo' },
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '°C';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'درجة الغليان (°C)',
                        font: { size: 14, family: 'Cairo' },
                        color: '#2C3E50'
                    },
                    ticks: {
                        font: { family: 'Cairo' },
                        color: '#7F8C8D'
                    },
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                x: {
                    type: 'category',
                    ticks: {
                        font: { family: 'Cairo', size: 13 },
                        color: '#2C3E50'
                    },
                    grid: { display: false }
                }
            }
        }
    });

    // Add checkbox event listeners
    document.getElementById('toggle-group15')?.addEventListener('change', (e) => {
        const dataset = unifiedChartInstance.data.datasets.find(ds => ds.group === 'group15');
        if (dataset) {
            dataset.hidden = !e.target.checked;
            unifiedChartInstance.update();
        }
    });

    document.getElementById('toggle-group16')?.addEventListener('change', (e) => {
        const dataset = unifiedChartInstance.data.datasets.find(ds => ds.group === 'group16');
        if (dataset) {
            dataset.hidden = !e.target.checked;
            unifiedChartInstance.update();
        }
    });

    document.getElementById('toggle-halides')?.addEventListener('change', (e) => {
        const dataset = unifiedChartInstance.data.datasets.find(ds => ds.group === 'halides');
        if (dataset) {
            dataset.hidden = !e.target.checked;
            unifiedChartInstance.update();
        }
    });
}

// Electronegativity Chart
function createElectronegativityChart() {
    const canvas = document.getElementById('electronegativity-chart');
    if (!canvas || typeof Chart === 'undefined') return;

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['F', 'O', 'Cl', 'N', 'Br', 'C', 'S', 'H'],
            datasets: [{
                label: 'السالبية الكهربائية',
                data: [3.98, 3.44, 3.16, 3.04, 2.96, 2.55, 2.58, 2.20],
                backgroundColor: [
                    'rgba(231, 76, 60, 0.8)',
                    'rgba(39, 174, 96, 0.8)',
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(22, 160, 133, 0.8)',
                    'rgba(22, 160, 133, 0.8)',
                    'rgba(22, 160, 133, 0.8)',
                    'rgba(243, 156, 18, 0.8)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#2C3E50',
                    titleFont: { size: 14, family: 'Cairo' },
                    bodyFont: { size: 13, family: 'Cairo' },
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return `السالبية الكهربائية: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 4,
                    title: {
                        display: true,
                        text: 'السالبية الكهربائية',
                        font: { size: 14, family: 'Cairo' },
                        color: '#2C3E50'
                    },
                    ticks: {
                        font: { family: 'Cairo' },
                        color: '#7F8C8D'
                    },
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                x: {
                    ticks: {
                        font: { family: 'Cairo', size: 14, weight: 'bold' },
                        color: '#2C3E50'
                    },
                    grid: { display: false }
                }
            }
        }
    });
}

// Van der Waals Comparison Chart
function createVDWComparisonChart() {
    const canvas = document.getElementById('vdw-comparison-chart');
    if (!canvas || typeof Chart === 'undefined') return;

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['قوى لندن', 'ثنائي القطب', 'رابطة هيدروجينية', 'رابطة تساهمية'],
            datasets: [{
                label: 'الطاقة (kJ/mol)',
                data: [20, 6, 25, 400],
                backgroundColor: [
                    'rgba(243, 156, 18, 0.8)',
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(39, 174, 96, 0.8)',
                    'rgba(231, 76, 60, 0.8)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#2C3E50',
                    titleFont: { size: 14, family: 'Cairo' },
                    bodyFont: { size: 13, family: 'Cairo' },
                    padding: 12
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'الطاقة (kJ/mol)',
                        font: { size: 14, family: 'Cairo' },
                        color: '#2C3E50'
                    },
                    ticks: {
                        font: { family: 'Cairo' },
                        color: '#7F8C8D'
                    },
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                x: {
                    ticks: {
                        font: { family: 'Cairo', size: 12 },
                        color: '#2C3E50'
                    },
                    grid: { display: false }
                }
            }
        }
    });
}

// Comparison Chart for Virtual Lab
function createComparisonChart(molecule1, molecule2) {
    const canvas = document.getElementById('comparison-chart');
    if (!canvas || typeof Chart === 'undefined') return;

    // Sample data
    const data1 = {
        bp: Math.random() * 100 - 50,
        molar: Math.random() * 50 + 10,
        strength: Math.random() * 40
    };

    const data2 = {
        bp: Math.random() * 100 - 50,
        molar: Math.random() * 50 + 10,
        strength: Math.random() * 40
    };

    const ctx = canvas.getContext('2d');

    // Destroy existing chart if any
    if (window.comparisonChartInstance) {
        window.comparisonChartInstance.destroy();
    }

    window.comparisonChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['درجة الغليان', 'الكتلة المولية', 'قوة الترابط'],
            datasets: [
                {
                    label: molecule1,
                    data: [data1.bp, data1.molar, data1.strength],
                    borderColor: '#3498DB',
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderWidth: 2
                },
                {
                    label: molecule2,
                    data: [data2.bp, data2.molar, data2.strength],
                    borderColor: '#E74C3C',
                    backgroundColor: 'rgba(231, 76, 60, 0.2)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        font: { size: 14, family: 'Cairo' },
                        color: '#2C3E50'
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    ticks: {
                        font: { family: 'Cairo' },
                        color: '#7F8C8D'
                    },
                    pointLabels: {
                        font: { family: 'Cairo', size: 12 },
                        color: '#2C3E50'
                    }
                }
            }
        }
    });
}

// Export function
window.createComparisonChart = createComparisonChart;

console.log('✅ Charts module loaded!');
