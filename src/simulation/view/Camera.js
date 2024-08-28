import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
/**
 * Camera class for managing the perspective camera and its controls.
 * Uses Three.js for 3D rendering and interaction.
 *
 * @class
 */
class Camera {
    /**
     * Creates an instance of Camera.
     * Initializes the camera and controls.
     *
     * @param {Simulator} simulator - The simulator instance containing scene, canvas, and sizes.
     * @constructor
     */
    constructor(simulator) {
        this.simulator = simulator;
        this.scene = this.simulator.scene;
        this.canvas = this.simulator.canvas;
        this.sizes = this.simulator.sizes;
        this.isFreeCamera = false;
        this.setInstance();
        this.setControls();
    }
    /**
     * Initializes the perspective camera instance.
     * Sets up the camera position and adds it to the scene.
     *
     * @private
     */
    setInstance() {
        this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 10000);
        this.instance.position.set(-30, 20, -30);
        this.scene.add(this.instance);
    }
    /**
     * Initializes the OrbitControls for camera interaction.
     * Configures the controls and attaches them to the camera.
     *
     * @private
     */
    setControls() {
        this.controls = new OrbitControls(this.instance, this.canvas);
        this.controls.enablePan = false;
        this.controls.enableDamping = true;
        this.controls.maxDistance = 150;
        this.controls.listenToKeyEvents(window);
    }
    /**
     * Resize the camera aspect ratio when the simulator size changes.
     *
     * @public
     */
    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }
    switchCamera() {
        
        if (this.isFreeCamera) {
            // Convert to orbit
            this.controls.enabled = true;
            document.exitPointerLock();
            this.controls = new OrbitControls(this.instance, this.canvas);
            this.controls.enablePan = false;
            this.controls.enableDamping = true;
            this.controls.maxDistance = 150;
            this.controls.listenToKeyEvents(window);

        } else {
            // Convert to free
            this.controls.target = this.instance.position
            this.controls.enabled = false;
            this.simulator.renderer.instance.domElement.requestPointerLock();
        }
        this.isFreeCamera = !this.isFreeCamera;

    }
    /**
     * Update the camera controls.
     *
     * @public
     */
    update() {
        this.controls.update();
    }
    /**
     * Update the target for the camera controls.
     *
     * @param {THREE.Vector3} target - The new target position for the camera.
     * @public
     */
    updateTarget(target) {
        if (!this.isFreeCamera) {
            this.controls.target = target;
        }
    }
    /**
     * Disposes of the camera controls and cleans up resources.
     *
     * This method disposes the OrbitControls instance, ensuring all associated
     * resources are properly released to avoid memory leaks.
     *
     * @public
     */
    dispose() {
        this.controls.dispose();
    }
    /**
     * Returns the instance of the perspective camera.
     *
     * This method provides access to the internal THREE.PerspectiveCamera instance,
     * allowing external classes or functions to interact with the camera directly.
     *
     * @returns {THREE.PerspectiveCamera} The perspective camera instance.
     * @public
     */
    getInstance() {
        return this.instance;
    }
}
export default Camera;
