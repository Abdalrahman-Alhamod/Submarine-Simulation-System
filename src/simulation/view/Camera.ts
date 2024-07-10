import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Simulator from './Simulator';


/**
 * Camera class for managing the perspective camera and its controls.
 * Uses Three.js for 3D rendering and interaction.
 * 
 * @class
 */
class Camera {
    /**
     * Instance of the perspective camera.
     * 
     * @type {THREE.PerspectiveCamera}
     * @private
     */
    private instance!: THREE.PerspectiveCamera;

    /**
     * Orbit controls for the camera.
     * 
     * @type {OrbitControls}
     * @private
     */
    private controls!: OrbitControls;

    /**
     * Reference to the simulator instance containing canvas, scene, and sizes.
     * 
     * @type {Simulator}
     * @private
     */
    private simulator: Simulator;

    /**
     * Three.js scene where the camera is placed.
     * 
     * @type {THREE.Scene}
     * @private
     */
    private scene: THREE.Scene;

    /**
     * HTML canvas element where the scene is rendered.
     * 
     * @type {HTMLCanvasElement}
     * @private
     */
    private canvas: HTMLCanvasElement;

    /**
     * Sizes (width and height) of the canvas and renderer.
     * 
     * @type {{ width: number, height: number }}
     * @private
     */
    private sizes: { width: number, height: number };

    /**
     * Creates an instance of Camera.
     * Initializes the camera and controls.
     * 
     * @param {Simulator} simulator - The simulator instance containing scene, canvas, and sizes.
     * @constructor
     */
    constructor(simulator: Simulator) {
        this.simulator = simulator;
        this.scene = this.simulator.scene;
        this.canvas = this.simulator.canvas;
        this.sizes = this.simulator.sizes;

        this.setInstance();
        this.setControls();
    }

    /**
     * Initializes the perspective camera instance.
     * Sets up the camera position and adds it to the scene.
     * 
     * @private
     */
    private setInstance(): void {
        this.instance = new THREE.PerspectiveCamera(
            75,
            this.sizes.width / this.sizes.height,
            0.1,
            10000
        );
        this.instance.position.set(-30, 20, -30);
        this.scene.add(this.instance);
    }

    /**
     * Initializes the OrbitControls for camera interaction.
     * Configures the controls and attaches them to the camera.
     * 
     * @private
     */
    private setControls(): void {
        this.controls = new OrbitControls(this.instance, this.canvas);
        this.controls.enablePan = false
        this.controls.enableDamping = true;
        this.controls.maxDistance = 150
        this.controls.listenToKeyEvents(window);
    }

    /**
     * Resize the camera aspect ratio when the simulator size changes.
     * 
     * @public
     */
    public resize(): void {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    /**
     * Update the camera controls.
     * 
     * @public
     */
    public update(): void {
        this.controls.update();
    }

    /**
     * Update the target for the camera controls.
     * 
     * @param {THREE.Vector3} target - The new target position for the camera.
     * @public
     */
    public updateTarget(target: THREE.Vector3): void {
        this.controls.target = target;
    }

    /**
     * Disposes of the camera controls and cleans up resources.
     * 
     * This method disposes the OrbitControls instance, ensuring all associated
     * resources are properly released to avoid memory leaks.
     * 
     * @public
     */
    public dispose(): void {
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
    public getInstance(): THREE.PerspectiveCamera {
        return this.instance;
    }

}

export default Camera; 