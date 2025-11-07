/**
 * =====================================================
 * 3D Models with Three.js
 * =====================================================
 */

// This file contains placeholder functions for 3D models
// In a full implementation, this would use Three.js to render interactive 3D molecules

console.log('🎨 3D Models module loading...');

// Placeholder: Initialize 3D models when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initialize3DModels();
});

function initialize3DModels() {
    // Find all 3D model containers
    const modelContainers = document.querySelectorAll('.model-3d');

    modelContainers.forEach((container, index) => {
        // Add placeholder content
        container.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: white; text-align: center; padding: 20px;">
                <i class="fas fa-cube" style="font-size: 4rem; margin-bottom: 1rem; animation: rotate 3s linear infinite;"></i>
                <p style="font-size: 1.2rem; font-weight: 600;">نموذج ثلاثي الأبعاد تفاعلي</p>
                <p style="font-size: 0.9rem; opacity: 0.8;">استخدم الماوس للدوران والتكبير</p>
                <small style="margin-top: 1rem; opacity: 0.6;">يتم التحميل باستخدام Three.js</small>
            </div>
        `;

        // Add mouse interaction
        container.addEventListener('mouseenter', () => {
            container.style.transform = 'scale(1.02)';
            container.style.transition = 'transform 0.3s ease';
        });

        container.addEventListener('mouseleave', () => {
            container.style.transform = 'scale(1)';
        });
    });

    console.log(`✅ Initialized ${modelContainers.length} 3D model containers`);
}

// Example function for creating a water molecule (H2O)
function createWaterMolecule(containerId) {
    console.log(`Creating water molecule in ${containerId}`);

    // Placeholder implementation
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white;">
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">
                        <span style="color: #ff4444;">O</span>
                        <br>
                        <span style="display: inline-block; margin: 0 10px; color: #4444ff;">H</span>
                        <span style="display: inline-block; margin: 0 10px; color: #4444ff;">H</span>
                    </div>
                    <p style="font-size: 1rem;">جزيء الماء H₂O</p>
                    <small style="opacity: 0.7;">الزاوية: 104.5°</small>
                </div>
            </div>
        `;
    }
}

// Example function for ammonia (NH3)
function createAmmoniaMolecule(containerId) {
    console.log(`Creating ammonia molecule in ${containerId}`);

    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white;">
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">
                        <span style="color: #4444ff;">N</span>
                        <br>
                        <span style="display: inline-block; margin: 0 5px; color: #ffffff;">H</span>
                        <span style="display: inline-block; margin: 0 5px; color: #ffffff;">H</span>
                        <span style="display: inline-block; margin: 0 5px; color: #ffffff;">H</span>
                    </div>
                    <p style="font-size: 1rem;">جزيء الأمونيا NH₃</p>
                    <small style="opacity: 0.7;">هرم ثلاثي</small>
                </div>
            </div>
        `;
    }
}

// Export functions
window.createWaterMolecule = createWaterMolecule;
window.createAmmoniaMolecule = createAmmoniaMolecule;

console.log('✅ 3D Models module loaded!');
