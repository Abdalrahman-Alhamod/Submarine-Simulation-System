import * as THREE from 'three';
import { ResourceNames } from "../model/Utils/Resources/ResourcesNames";
/**
 * Environment class to manage and set up the 3D environment in the simulation.
 * Handles setting up textures, lights, floor, surface, and other elements.
 *
 * @class
 */
class SceneEnvironment {
    /**
     * Creates an instance of Environment.
     *
     * @param {Simulator} simulator - The simulator instance that manages the entire simulation.
     * @constructor
     */
    constructor(simulator) {
        this.simulator = simulator;
        this.scene = this.simulator.scene;
        this.debugPanel = this.simulator.debug.gui;
        this.resources = this.simulator.resources;
        this.waterColor = '#07066F';
        this.setupAxesHelper();
        this.setupTextures();
        this.createSeaBottom();
        this.createSeaSurface();
        this.setupOceanEffect();
        this.setupLights();
        this.addRandomObjects();
    }
    /**
     * Sets up the axes helper for debugging purposes.
     * Allows toggling the visibility of the axes helper through the debug panel.
     *
     * @private
     */
    setupAxesHelper() {
        let axesHelper = new THREE.AxesHelper(10000);
        this.showAxesHelper = true;
        this.scene.add(axesHelper);
        this.debugPanel
            .add(this, 'showAxesHelper')
            .name('Show Axes')
            .onChange((isShowed) => {
            if (isShowed) {
                this.scene.add(axesHelper);
            }
            else {
                this.scene.remove(axesHelper);
            }
        });
    }
    /**
     * Loads and sets up textures for the environment.
     *
     * @private
     */
    setupTextures() {
        this.dirtTexture = this.resources.getResource(ResourceNames.DirtColorTexture);
        this.dirtTexture.repeat.set(1000, 1000);
        this.dirtTexture.wrapS = THREE.MirroredRepeatWrapping;
        this.dirtTexture.wrapT = THREE.MirroredRepeatWrapping;
        this.stonesTexture = this.resources.getResource(ResourceNames.StonesColorTexture);
    }
    /**
     * Sets up the lights in the scene.
     * Includes ambient light, directional lights, point light, and spot light.
     *
     * @private
     */
    setupLights() {
        const color = new THREE.Color(this.waterColor);
        const ambientLight = new THREE.AmbientLight(color, 0.6);
        this.scene.add(ambientLight);
        const createDirectionalLight = (color, intensity, position) => {
            const light = new THREE.DirectionalLight(color, intensity);
            light.castShadow = true;
            light.shadow.mapSize.set(1024, 1024);
            light.shadow.camera.far = 5000;
            light.shadow.camera.left = -10;
            light.shadow.camera.top = 10;
            light.shadow.camera.right = 10;
            light.shadow.camera.bottom = -10;
            light.position.set(...position);
            return light;
        };
        const directionalLight1 = createDirectionalLight(color, 10, [10, 5, 10]);
        this.scene.add(directionalLight1);
        const directionalLight2 = createDirectionalLight(color, 10, [-10, 5, 10]);
        this.scene.add(directionalLight2);
        const pointLight = new THREE.PointLight(color, 10.5);
        pointLight.position.set(2, 3, 2);
        this.scene.add(pointLight);
        const spotLight = new THREE.SpotLight(color, 10.7);
        spotLight.position.set(15, 40, 35);
        spotLight.angle = Math.PI / 6;
        spotLight.penumbra = 0.1;
        spotLight.decay = 2;
        spotLight.distance = 200;
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.set(2048, 2048);
        this.scene.add(spotLight);
    }
    /**
     * Creates the sea bottom plane with the appropriate texture and position.
     *
     * @private
     */
    createSeaBottom() {
        const seaBottomGeometry = new THREE.PlaneGeometry(20000, 20000);
        const seaBottomMaterial = new THREE.MeshBasicMaterial({
            map: this.dirtTexture,
            color: new THREE.Color(this.waterColor),
            side: THREE.DoubleSide
        });
        const seaBottom = new THREE.Mesh(seaBottomGeometry, seaBottomMaterial);
        seaBottom.position.y = -1500; // Sea bottom below sea level
        seaBottom.receiveShadow = true;
        seaBottom.rotation.x = -Math.PI * 0.5;
        this.scene.add(seaBottom);
    }
    /**
     * Creates the sea surface plane with the appropriate texture and position.
     *
     * @private
     */
    createSeaSurface() {
        const seaSurfaceGeometry = new THREE.PlaneGeometry(20000, 20000);
        const seaSurfaceMaterial = new THREE.MeshBasicMaterial({
            map: this.dirtTexture,
            color: new THREE.Color(this.waterColor),
            side: THREE.DoubleSide
        });
        const seaSurface = new THREE.Mesh(seaSurfaceGeometry, seaSurfaceMaterial);
        seaSurface.position.y = 0; // Sea level at origin
        seaSurface.rotation.x = -Math.PI * 0.5;
        this.scene.add(seaSurface);
    }
    /**
     * Sets up the ocean effect including background color and fog.
     *
     * @private
     */
    setupOceanEffect() {
        this.scene.background = new THREE.Color(this.waterColor);
        this.scene.fog = new THREE.Fog(this.waterColor, 1, 2000);
    }
    /**
     * Adds random objects to the scene for visual complexity.
     * Uses cone geometry and stone texture.
     *
     * @private
     */
    addRandomObjects() {
        const geometry = new THREE.ConeGeometry(10, 30, 4, 1);
        const material = new THREE.MeshBasicMaterial({ color: '#AAAA00', map: this.stonesTexture });
        for (let i = 0; i < 5000; i++) {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = (Math.random() - 0.5) * 20000;
            mesh.position.y = Math.random() * -500; // Only place objects below sea level
            mesh.position.z = (Math.random() - 0.5) * 20000;
            this.scene.add(mesh);
        }
    }
}
export default SceneEnvironment;
