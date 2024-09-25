import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement); // Append to the container

const gradientTexture = new THREE.TextureLoader().load('gradient.png'); // Load your gradient image
scene.background = gradientTexture; // Set the scene's background to the gradient

// Declare the black hole variable in the outer scope
let blackHole; // Move this declaration outside of the loader

// Load the black hole model
const loader = new GLTFLoader();
loader.load('blackhole/scene.gltf', (gltf) => {
    blackHole = gltf.scene; // Assign to the outer scoped variable
    scene.add(blackHole);

    // Position the black hole
    blackHole.position.set(0, 0, -5); // Adjust distance as needed
    
    // Scale the black hole for better visibility
    blackHole.scale.set(10, 10, 10); // Increase values for larger size
    
}, undefined, (error) => {
    console.error(error);
});

// Create a ground plane
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x4caf50, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
scene.remove(plane); // Add the plane to the scene

// Create a cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0, 1.5, 0); // Position the cube above the plane
scene.remove(cube); // Add the cube to the scene

// Create a simple light source
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Strong white light
directionalLight.position.set(5, 10, 5).normalize();
scene.add(directionalLight);

// Set camera position
camera.position.set(0, 5, 15);
camera.lookAt(0, 0, 0);

// Animation loop
const animate = function () {
    requestAnimationFrame(animate);

    // Rotate the cube for some animation
    if (cube) { // Check if the cube exists
        cube.rotation.x += 0.01; // Rotate cube on X axis
        cube.rotation.y += 0.01; // Rotate cube on Y axis
    }

    // Rotate the black hole if it exists
    if (blackHole) {
        blackHole.rotation.y += 0.001; // Rotate black hole on Y axis
    }

    renderer.render(scene, camera);
};

// Handle window resizing
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Start the animation
animate();

