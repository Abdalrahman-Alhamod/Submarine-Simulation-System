import Simulator from "./Simulator";
import { Events } from "../controller/Utils/Events";
import Resources from "../model/Utils/Resources/Resources";
import SceneEnvironment from "./SceneEnvironment";
import * as THREE from 'three';
import SubmarineView from "./SubmarineView";

/**
 * World class is responsible for managing the overall scene, including initialization
 * and updating of different components such as the environment.
 * 
 *  @class
 */
class World {
    /**
     * The simulator instance managing the overall application state.
     * @type {Simulator}
     */
    private simulator: Simulator;

    /**
     * The Three.js scene object where all 3D objects are added.
     * @type {THREE.Scene}
     */
    private scene: THREE.Scene;

    /**
     * The environment instance responsible for setting up the visual aspects of the scene.
     * @type {SceneEnvironment}
     */
    private environment!: SceneEnvironment;

    /**
     * Resources instance to handle loading and management of assets.
     * @type {Resources}
     */
    private resources: Resources;

    /**
     * The SubmarineView instance responsible for managing the visual representation of the submarine.
     * @type {SubmarineView}
     */
    private submarineView!: SubmarineView;

    /**
     * Constructor for the World class.
     * Initializes the simulator, scene, and resources.
     * Sets up the environment after resources are loaded.
     * Initializes the SubmarineView after resources are loaded.
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
            this.submarineView = new SubmarineView(this.simulator);
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
