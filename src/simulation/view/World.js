import { Events } from "../controller/Utils/Events";
import SceneEnvironment from "./SceneEnvironment";
import SubmarineView from "./SubmarineView";
/**
 * World class is responsible for managing the overall scene, including initialization
 * and updating of different components such as the environment.
 *
 *  @class
 */
class World {
    /**
     * Constructor for the World class.
     * Initializes the simulator, scene, and resources.
     * Sets up the environment after resources are loaded.
     * Initializes the SubmarineView after resources are loaded.
     *
     * @param {Simulator} simulator - The simulator instance.
     */
    constructor(simulator) {
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
