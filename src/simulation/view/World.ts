import Simulator from "./Simulator";
import { Events } from "../controller/Utils/Events";
import Resources from "../model/Utils/Resources/Resources";
import SceneEnvironment from "./SceneEnvironment";
import * as THREE from 'three';

/**
 * World class is responsible for managing the overall scene, including initialization
 * and updating of different components such as the environment.
 */
class World {
    /**
     * The simulator instance managing the overall application state.
     * @type {Simulator}
     */
    simulator: Simulator;

    /**
     * The Three.js scene object where all 3D objects are added.
     * @type {THREE.Scene}
     */
    scene: THREE.Scene;

    /**
     * The environment instance responsible for setting up the visual aspects of the scene.
     * @type {SceneEnvironment}
     */
    environment!: SceneEnvironment;

    /**
     * Resources instance to handle loading and management of assets.
     * @type {Resources}
     */
    resources: Resources;

    /**
     * Constructor for the World class.
     * Initializes the simulator, scene, and resources.
     * Sets up the environment after resources are loaded.
     * 
     * @param {Simulator} simulator - The simulator instance.
     */
    constructor(simulator: Simulator) {
        this.simulator = simulator;
        this.scene = this.simulator.scene;
        this.resources = this.simulator.resources;

        // Wait for resources to be ready before setting up the environment
        this.resources.on(Events.ResourcesReady, () => {
            
            this.environment = new SceneEnvironment(this.simulator);
        });

        // Test mesh (if needed)
        // const testMesh = new THREE.Mesh(
        //   new THREE.BoxGeometry(1, 1, 1),
        //   new THREE.MeshStandardMaterial()
        // );
        // this.scene.add(testMesh);
    }

    /**
     * Update method to handle per-frame updates.
     * Called on each frame to update the components in the scene.
     */
    update() {
        // Update logic for various components can be added here
    }
}
export default World; 
