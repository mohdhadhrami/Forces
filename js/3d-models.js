/**
 * =====================================================
 * 3D Models with Three.js
 * Interactive Molecular Visualization
 * =====================================================
 */

console.log('🎨 3D Models module loading...');

// Store all scenes and renderers for cleanup
const activeScenes = [];

// Check if Three.js is loaded
function isThreeJSLoaded() {
    return typeof THREE !== 'undefined';
}

// Initialize all 3D models when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Wait for Three.js to load
    if (isThreeJSLoaded()) {
        initialize3DModels();
    } else {
        console.warn('⏳ Three.js not loaded yet, waiting...');
        setTimeout(() => {
            if (isThreeJSLoaded()) {
                initialize3DModels();
            } else {
                initializeFallbackModels();
            }
        }, 1000);
    }
});

/**
 * Initialize all 3D model containers
 */
function initialize3DModels() {
    const modelContainers = document.querySelectorAll('.model-3d');

    modelContainers.forEach((container, index) => {
        const containerId = container.id;

        // Create appropriate molecule based on container ID
        if (containerId) {
            console.log(`🔍 Found container: ${containerId}`);

            if (containerId.includes('water') || containerId.includes('h2o')) {
                createWaterMolecule(containerId);
            } else if (containerId.includes('ammonia') || containerId.includes('nh3')) {
                createAmmoniaMolecule(containerId);
            } else if (containerId.includes('hf')) {
                createHFMolecule(containerId);
            } else if (containerId.includes('london')) {
                createLondonForcesDemo(containerId);
            } else if (containerId.includes('dipole')) {
                createDipoleDemo(containerId);
            } else if (containerId.includes('lab-molecule')) {
                createGenericMolecule(containerId, 'lab');
            } else {
                createGenericMolecule(containerId, 'generic');
            }
        } else {
            // Assign ID if not present
            const newId = `model-${Date.now()}-${index}`;
            container.id = newId;
            createGenericMolecule(newId, 'generic');
        }
    });

    console.log(`✅ Initialized ${modelContainers.length} 3D model containers`);
}

/**
 * Fallback for when Three.js is not available
 */
function initializeFallbackModels() {
    console.warn('⚠️ Three.js not available, using fallback visualizations');

    const modelContainers = document.querySelectorAll('.model-3d');

    modelContainers.forEach((container) => {
        container.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: white; text-align: center; padding: 20px;">
                <div style="position: relative; width: 120px; height: 120px; margin-bottom: 1rem;">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 60px; height: 60px; background: radial-gradient(circle, #ff6b6b, #c92a2a); border-radius: 50%; animation: pulse 2s infinite;"></div>
                    <div style="position: absolute; top: 20%; left: 20%; width: 30px; height: 30px; background: radial-gradient(circle, #4dabf7, #1971c2); border-radius: 50%; animation: orbit 3s linear infinite;"></div>
                    <div style="position: absolute; top: 20%; right: 20%; width: 30px; height: 30px; background: radial-gradient(circle, #4dabf7, #1971c2); border-radius: 50%; animation: orbit 3s linear infinite; animation-delay: 1.5s;"></div>
                </div>
                <p style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem;">نموذج جزيئي تفاعلي</p>
                <p style="font-size: 0.9rem; opacity: 0.8;">يتطلب Three.js للعرض الكامل</p>
            </div>
            <style>
                @keyframes pulse {
                    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                    50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
                }
                @keyframes orbit {
                    0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
                    100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
                }
            </style>
        `;
    });
}

/**
 * Create a basic Three.js scene
 */
function createScene(container) {
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 10;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.4);
    pointLight.position.set(-5, -5, 5);
    scene.add(pointLight);

    return { scene, camera, renderer };
}

/**
 * Add mouse rotation controls
 */
function addMouseControls(container, camera, renderer, scene) {
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotation = { x: 0, y: 0 };

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    container.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;

            rotation.y += deltaX * 0.01;
            rotation.x += deltaY * 0.01;

            scene.rotation.y = rotation.y;
            scene.rotation.x = rotation.x;

            previousMousePosition = { x: e.clientX, y: e.clientY };
        }
    });

    container.addEventListener('mouseup', () => {
        isDragging = false;
    });

    container.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    // Touch controls for mobile
    container.addEventListener('touchstart', (e) => {
        isDragging = true;
        previousMousePosition = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
    });

    container.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const deltaX = e.touches[0].clientX - previousMousePosition.x;
            const deltaY = e.touches[0].clientY - previousMousePosition.y;

            rotation.y += deltaX * 0.01;
            rotation.x += deltaY * 0.01;

            scene.rotation.y = rotation.y;
            scene.rotation.x = rotation.x;

            previousMousePosition = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
        }
    });

    container.addEventListener('touchend', () => {
        isDragging = false;
    });
}

/**
 * Create an atom (sphere)
 */
function createAtom(radius, color) {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshPhongMaterial({
        color: color,
        shininess: 100,
        specular: 0x444444
    });
    return new THREE.Mesh(geometry, material);
}

/**
 * Create a bond (cylinder)
 */
function createBond(start, end, color = 0xcccccc) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();

    const geometry = new THREE.CylinderGeometry(0.1, 0.1, length, 8);
    const material = new THREE.MeshPhongMaterial({ color: color });
    const bond = new THREE.Mesh(geometry, material);

    bond.position.copy(start).add(direction.multiplyScalar(0.5));
    bond.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction.normalize()
    );

    return bond;
}

/**
 * Create Water Molecule (H2O)
 */
function createWaterMolecule(containerId) {
    if (!isThreeJSLoaded()) {
        console.warn('Three.js not loaded for', containerId);
        return;
    }

    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ''; // Clear existing content

    const { scene, camera, renderer } = createScene(container);

    // Oxygen atom (red)
    const oxygen = createAtom(0.8, 0xff4444);
    oxygen.position.set(0, 0, 0);
    scene.add(oxygen);

    // Hydrogen atoms (white/light blue)
    const hydrogen1 = createAtom(0.5, 0x4dabf7);
    const hydrogen2 = createAtom(0.5, 0x4dabf7);

    // H2O has a 104.5° angle
    const angle = (104.5 / 2) * (Math.PI / 180);
    const bondLength = 1.5;

    hydrogen1.position.set(
        Math.sin(angle) * bondLength,
        -Math.cos(angle) * bondLength,
        0
    );
    hydrogen2.position.set(
        -Math.sin(angle) * bondLength,
        -Math.cos(angle) * bondLength,
        0
    );

    scene.add(hydrogen1);
    scene.add(hydrogen2);

    // Bonds
    const bond1 = createBond(oxygen.position, hydrogen1.position);
    const bond2 = createBond(oxygen.position, hydrogen2.position);
    scene.add(bond1);
    scene.add(bond2);

    // Add mouse controls
    addMouseControls(container, camera, renderer, scene);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        scene.rotation.y += 0.002; // Slow auto-rotation
        renderer.render(scene, camera);
    }
    animate();

    // Store for cleanup
    activeScenes.push({ renderer, container });

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}

/**
 * Create Ammonia Molecule (NH3)
 */
function createAmmoniaMolecule(containerId) {
    if (!isThreeJSLoaded()) {
        console.warn('Three.js not loaded for', containerId);
        return;
    }

    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    const { scene, camera, renderer } = createScene(container);

    // Nitrogen atom (blue)
    const nitrogen = createAtom(0.8, 0x4dabf7);
    nitrogen.position.set(0, 0, 0);
    scene.add(nitrogen);

    // Hydrogen atoms (white)
    const hydrogens = [];
    const bondLength = 1.5;
    const angle = 107 * (Math.PI / 180); // NH3 bond angle

    for (let i = 0; i < 3; i++) {
        const hydrogen = createAtom(0.5, 0xeeeeee);
        const theta = (i * 120 * Math.PI / 180);

        hydrogen.position.set(
            Math.cos(theta) * bondLength * Math.sin(angle / 2),
            -bondLength * Math.cos(angle / 2),
            Math.sin(theta) * bondLength * Math.sin(angle / 2)
        );

        hydrogens.push(hydrogen);
        scene.add(hydrogen);

        // Add bond
        const bond = createBond(nitrogen.position, hydrogen.position);
        scene.add(bond);
    }

    addMouseControls(container, camera, renderer, scene);

    function animate() {
        requestAnimationFrame(animate);
        scene.rotation.y += 0.002;
        renderer.render(scene, camera);
    }
    animate();

    activeScenes.push({ renderer, container });
}

/**
 * Create HF Molecule
 */
function createHFMolecule(containerId) {
    if (!isThreeJSLoaded()) {
        console.warn('Three.js not loaded for', containerId);
        return;
    }

    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    const { scene, camera, renderer } = createScene(container);

    // Fluorine atom (green)
    const fluorine = createAtom(0.7, 0x51cf66);
    fluorine.position.set(-1, 0, 0);
    scene.add(fluorine);

    // Hydrogen atom
    const hydrogen = createAtom(0.5, 0xeeeeee);
    hydrogen.position.set(1, 0, 0);
    scene.add(hydrogen);

    // Bond
    const bond = createBond(fluorine.position, hydrogen.position);
    scene.add(bond);

    // Add partial charges visualization
    const chargeGeometry = new THREE.RingGeometry(0.3, 0.4, 32);
    const negativeMaterial = new THREE.MeshBasicMaterial({
        color: 0xff6b6b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
    });
    const positiveMateriaal = new THREE.MeshBasicMaterial({
        color: 0x4dabf7,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
    });

    const negativeCharge = new THREE.Mesh(chargeGeometry, negativeMaterial);
    negativeCharge.position.copy(fluorine.position);
    negativeCharge.position.z = 0.1;
    scene.add(negativeCharge);

    const positiveCharge = new THREE.Mesh(chargeGeometry, positiveMateriaal);
    positiveCharge.position.copy(hydrogen.position);
    positiveCharge.position.z = 0.1;
    scene.add(positiveCharge);

    addMouseControls(container, camera, renderer, scene);

    function animate() {
        requestAnimationFrame(animate);
        scene.rotation.y += 0.002;
        negativeCharge.rotation.z += 0.02;
        positiveCharge.rotation.z -= 0.02;
        renderer.render(scene, camera);
    }
    animate();

    activeScenes.push({ renderer, container });
}

/**
 * Create a generic molecule for demos
 */
function createGenericMolecule(containerId, type = 'generic') {
    if (!isThreeJSLoaded()) {
        console.warn('Three.js not loaded for', containerId);
        return;
    }

    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    const { scene, camera, renderer } = createScene(container);

    // Create a simple molecular structure
    const centralAtom = createAtom(0.8, 0x51cf66);
    centralAtom.position.set(0, 0, 0);
    scene.add(centralAtom);

    // Add surrounding atoms
    for (let i = 0; i < 4; i++) {
        const angle = (i * 90) * (Math.PI / 180);
        const atom = createAtom(0.5, 0x4dabf7);
        atom.position.set(
            Math.cos(angle) * 2,
            Math.sin(angle) * 2,
            0
        );
        scene.add(atom);

        const bond = createBond(centralAtom.position, atom.position);
        scene.add(bond);
    }

    addMouseControls(container, camera, renderer, scene);

    function animate() {
        requestAnimationFrame(animate);
        scene.rotation.y += 0.003;
        scene.rotation.x += 0.001;
        renderer.render(scene, camera);
    }
    animate();

    activeScenes.push({ renderer, container });
}

/**
 * Create London Forces demonstration
 */
function createLondonForcesDemo(containerId) {
    if (!isThreeJSLoaded()) {
        console.warn('Three.js not loaded for', containerId);
        return;
    }

    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    const { scene, camera, renderer } = createScene(container);

    // Create two non-polar molecules (e.g., I2)
    const atom1a = createAtom(0.8, 0x9c27b0);
    atom1a.position.set(-2, 1, 0);
    scene.add(atom1a);

    const atom1b = createAtom(0.8, 0x9c27b0);
    atom1b.position.set(-3.5, 1, 0);
    scene.add(atom1b);

    const bond1 = createBond(atom1a.position, atom1b.position, 0xcccccc);
    scene.add(bond1);

    // Second molecule
    const atom2a = createAtom(0.8, 0x9c27b0);
    atom2a.position.set(2, -1, 0);
    scene.add(atom2a);

    const atom2b = createAtom(0.8, 0x9c27b0);
    atom2b.position.set(3.5, -1, 0);
    scene.add(atom2b);

    const bond2 = createBond(atom2a.position, atom2b.position, 0xcccccc);
    scene.add(bond2);

    // Add electron clouds (transient dipoles)
    const cloudGeometry = new THREE.SphereGeometry(1.2, 16, 16);
    const cloudMaterial = new THREE.MeshBasicMaterial({
        color: 0x4dabf7,
        transparent: true,
        opacity: 0.2,
        wireframe: true
    });

    const cloud1 = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloud1.position.set(-2.75, 1, 0);
    scene.add(cloud1);

    const cloud2 = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloud2.position.set(2.75, -1, 0);
    scene.add(cloud2);

    addMouseControls(container, camera, renderer, scene);

    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.02;

        // Animate electron clouds to show temporary dipoles
        cloud1.scale.x = 1 + Math.sin(time) * 0.2;
        cloud2.scale.x = 1 + Math.sin(time + Math.PI) * 0.2;

        scene.rotation.y += 0.002;
        renderer.render(scene, camera);
    }
    animate();

    activeScenes.push({ renderer, container });
}

/**
 * Create Dipole-Dipole demonstration
 */
function createDipoleDemo(containerId) {
    if (!isThreeJSLoaded()) {
        console.warn('Three.js not loaded for', containerId);
        return;
    }

    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    const { scene, camera, renderer } = createScene(container);

    // Create two HCl molecules showing dipole-dipole interaction

    // First HCl molecule
    const h1 = createAtom(0.5, 0xeeeeee);
    h1.position.set(-2, 1, 0);
    scene.add(h1);

    const cl1 = createAtom(0.8, 0x51cf66);
    cl1.position.set(-3.5, 1, 0);
    scene.add(cl1);

    const bond1 = createBond(h1.position, cl1.position);
    scene.add(bond1);

    // Add charge indicators
    const positiveGeometry = new THREE.RingGeometry(0.2, 0.3, 16);
    const positiveMaterial = new THREE.MeshBasicMaterial({
        color: 0xff6b6b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
    });
    const positive1 = new THREE.Mesh(positiveGeometry, positiveMaterial);
    positive1.position.set(h1.position.x, h1.position.y, 0.2);
    scene.add(positive1);

    const negativeMaterial = new THREE.MeshBasicMaterial({
        color: 0x4dabf7,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
    });
    const negative1 = new THREE.Mesh(positiveGeometry, negativeMaterial);
    negative1.position.set(cl1.position.x, cl1.position.y, 0.2);
    scene.add(negative1);

    // Second HCl molecule
    const h2 = createAtom(0.5, 0xeeeeee);
    h2.position.set(2, -1, 0);
    scene.add(h2);

    const cl2 = createAtom(0.8, 0x51cf66);
    cl2.position.set(3.5, -1, 0);
    scene.add(cl2);

    const bond2 = createBond(h2.position, cl2.position);
    scene.add(bond2);

    const positive2 = new THREE.Mesh(positiveGeometry, positiveMaterial);
    positive2.position.set(h2.position.x, h2.position.y, 0.2);
    scene.add(positive2);

    const negative2 = new THREE.Mesh(positiveGeometry, negativeMaterial);
    negative2.position.set(cl2.position.x, cl2.position.y, 0.2);
    scene.add(negative2);

    // Add attraction line between opposite charges
    const attractionGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(h1.position.x, h1.position.y, 0),
        new THREE.Vector3(cl2.position.x, cl2.position.y, 0)
    ]);
    const attractionMaterial = new THREE.LineDashedMaterial({
        color: 0xffff00,
        dashSize: 0.2,
        gapSize: 0.1,
        linewidth: 2
    });
    const attractionLine = new THREE.Line(attractionGeometry, attractionMaterial);
    attractionLine.computeLineDistances();
    scene.add(attractionLine);

    addMouseControls(container, camera, renderer, scene);

    function animate() {
        requestAnimationFrame(animate);

        // Rotate charge indicators
        positive1.rotation.z += 0.02;
        negative1.rotation.z -= 0.02;
        positive2.rotation.z += 0.02;
        negative2.rotation.z -= 0.02;

        scene.rotation.y += 0.002;
        renderer.render(scene, camera);
    }
    animate();

    activeScenes.push({ renderer, container });
}

/**
 * Cleanup function
 */
function cleanup3DModels() {
    activeScenes.forEach(({ renderer, container }) => {
        if (renderer) {
            renderer.dispose();
            if (container && renderer.domElement) {
                container.removeChild(renderer.domElement);
            }
        }
    });
    activeScenes.length = 0;
}

// Export functions to global scope
window.createWaterMolecule = createWaterMolecule;
window.createAmmoniaMolecule = createAmmoniaMolecule;
window.createHFMolecule = createHFMolecule;
window.createGenericMolecule = createGenericMolecule;
window.createLondonForcesDemo = createLondonForcesDemo;
window.createDipoleDemo = createDipoleDemo;
window.cleanup3DModels = cleanup3DModels;

console.log('✅ 3D Models module loaded!');
