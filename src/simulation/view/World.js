import { Events } from "../controller/Utils/Events";
import SceneEnvironment from "./SceneEnvironment";
import SubmarineView from "./SubmarineView";
import * as EnvView from "./environment/EnvView.js";
import Debug from "./Debug";
import * as THREE from 'three';
import { ResourceNames } from '../model/Utils/Resources/ResourcesNames';
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
            this.simulator.controlGUI = new Debug({
                title: "Controls",
                top: "50px",
                bottom: "auto",
                left: "auth",
                right: "10px",
                width: 320,
            });
            this.simulator.submarineAttributesGUI = new Debug({
                title: "Submarine Attributes",
                top: "406px",
                bottom: "auto",
                left: "auto",
                right: "10px",
                width: 250,
            });
            this.simulator.forcesGUI = new Debug({
                title: "Forces",
                top: "105px",
                bottom: "auto",
                left: "10px",
                right: "auto",
                width: 200,
            });
            this.simulator.linearMotionGUI = new Debug({
                title: "Linear Motion",
                top: "240px",
                bottom: "auto",
                left: "10px",
                right: "auto",
                width: 200,
            });
            this.simulator.angularMotionGUI = new Debug({
                title: "Angular Motion",
                top: "577px",
                bottom: "auto",
                left: "10px",
                right: "auto",
                width: 200,
            });
            this.environment = new SceneEnvironment(this.simulator);
            this.submarineView = new SubmarineView(this.simulator);
            this.simulator.time.startUI();

            const listener = new THREE.AudioListener();
            const wavesSound = new THREE.Audio(listener);
            const underwaterSound = new THREE.Audio(listener);
            this.listener = listener;
            this.simulator.camera.instance.add(this.listener);


            const wavesSoundBuffer = this.resources.getResource(ResourceNames.WavesSound);
            wavesSound.setBuffer(wavesSoundBuffer);
            wavesSound.setLoop(true);
            wavesSound.setVolume(0.1);
            wavesSound.play()
            this.wavesSound = wavesSound;

            const underWaterSoundBuffer = this.resources.getResource(ResourceNames.UnderWaterSound);
            underwaterSound.setBuffer(underWaterSoundBuffer);
            underwaterSound.setLoop(true);
            underwaterSound.setVolume(0.1);
            this.underWaterSound = underwaterSound;
        });

        // Test mesh (if needed)
        // const testMesh = new THREE.Mesh(
        //   new THREE.BoxGeometry(1, 1, 1),
        //   new THREE.MeshStandardMaterial()
        // );
        // this.scene.add(testMesh);
    }
    // Ensure the AudioContext is resumed after user interaction
    resumeAudioContext() {
        if (this.listener.context.state === 'suspended') {
            this.listener.context.resume().then(() => {
                console.log('AudioContext resumed');
            });
        }
    }

    updateBackgroundSounds() {
        const yPosition = this.simulator.camera.instance.position.y; // Get the submarine's y position
        if (!(this.listener.context.state === 'suspended')) {
            if (yPosition >= 0) { // Assume y >= 0 means above water
                if (!this.wavesSound.isPlaying) {
                    this.wavesSound.play(); // Play waves sound if not already playing
                }
                this.underWaterSound.pause(); // Stop underwater sound
            } else { // Assume y < 0 means below water
                if (!this.underWaterSound.isPlaying) {
                    this.underWaterSound.play(); // Play underwater sound if not already playing
                }
                this.wavesSound.pause(); // Stop waves sound
            }
        }
    }

    /**
     * Update method to handle per-frame updates.
     * Called on each frame to update the components in the scene.
     */
    update() {
        // Update logic for various components can be added here
        EnvView.update(this.simulator.camera);
        this.submarineView.update();
        this.updateBackgroundSounds();
    }
}
export default World;
