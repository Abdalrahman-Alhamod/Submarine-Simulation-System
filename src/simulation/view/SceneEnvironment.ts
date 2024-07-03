import Simulator from "./Simulator";
import * as THREE from 'three';
import Resources from "../model/Utils/Resources/Resources";
import { ResourceNames } from "../model/Utils/Resources/ResourcesNames";
import GUI from 'lil-gui';

/**
 * Environment class to manage and set up the 3D environment in the simulation.
 * Handles setting up textures, lights, floor, surface, and other elements.
 * 
 * @class
 */
class SceneEnvironment {
    /**
     * The simulator instance that manages the entire simulation.
     * @type {Simulator}
     */
    simulator: Simulator;

    /**
     * The Three.js scene where objects are added.
     * @type {THREE.Scene}
     */
    scene: THREE.Scene;

    /**
     * The debug panel instance for controlling various debug options.
     * @type {GUI}
     */
    debugPanel: GUI;

    /**
     * The resources instance for managing and accessing loaded resources.
     * @type {Resources}
     */
    resources: Resources;

    /**
     * A flag for showing the axes helper for visualizing the axes in the scene.
     * @type {boolean}
     * @private
     */
    private showAxesHelper!: boolean;

    /**
     * The texture for the dirt surface.
     * @type {THREE.Texture}
     * @private
     */
    private dirtTexture!: THREE.Texture;

    /**
     * The texture for the stones surface.
     * @type {THREE.Texture}
     * @private
     */
    private stonesTexture!: THREE.Texture;

    /**
     * The color of the water in the environment.
     * @type {string}
     */
    waterColor: string;

    /**
     * Creates an instance of Environment.
     * 
     * @param {Simulator} simulator - The simulator instance that manages the entire simulation.
     * @constructor
     */
    constructor(simulator: Simulator) {
        this.simulator = simulator;
        this.scene = this.simulator.scene;
        this.debugPanel = this.simulator.debug.gui;
        this.resources = this.simulator.resources;

        this.waterColor = '#07066F';
        this.setupAxesHelper();
        this.setupTextures();
        this.createFloor();
        this.createSurface();
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
    private setupAxesHelper(): void {
        let axesHelper = new THREE.AxesHelper(10000);
        this.showAxesHelper = true
        this.scene.add(axesHelper);
        this.debugPanel
            .add(this, 'showAxesHelper')
            .name('Show Axes')
            .onChange((isShowed: boolean) => {
                if (isShowed) {
                    this.scene.add(axesHelper);
                } else {
                    this.scene.remove(axesHelper);
                }
            });
    }

    /**
     * Loads and sets up textures for the environment.
     * 
     * @private
     */
    private setupTextures(): void {
        this.dirtTexture = this.resources.getResource(ResourceNames.DirtColorTexture);
        this.dirtTexture.repeat.set(1000, 1000);
        this.dirtTexture.wrapS = THREE.MirroredRepeatWrapping;
        this.dirtTexture.wrapT = THREE.MirroredRepeatWrapping;

        this.stonesTexture = this.resources.getResource(ResourceNames.StonesColorTexture);
    }

    /**
     * Creates the floor mesh and adds it to the scene.
     * 
     * @private
     */
    private createFloor(): void {
        const floorGeometry = new THREE.PlaneGeometry(10000, 10000);
        const floorMaterial = new THREE.MeshBasicMaterial({
            map: this.dirtTexture,
            color: new THREE.Color(this.waterColor)
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.y = -150;
        floor.receiveShadow = true;
        floor.rotation.x = -Math.PI * 0.5;
        this.scene.add(floor);
    }

    /**
     * Creates the surface mesh and adds it to the scene.
     * 
     * @private
     */
    private createSurface(): void {
        const surface = new THREE.Mesh(
            new THREE.PlaneGeometry(10000, 10000),
            new THREE.MeshBasicMaterial({
                color: this.waterColor,
                side: THREE.DoubleSide
            })
        );
        surface.position.y = 150;
        surface.rotation.x = -Math.PI * 0.5;
        this.scene.add(surface);
    }

    /**
     * Sets up the ocean effect by adjusting the scene background and fog.
     * 
     * @private
     */
    private setupOceanEffect(): void {
        this.scene.background = new THREE.Color(this.waterColor);
        this.scene.fog = new THREE.Fog(this.waterColor, 1, 10000);
    }

    /**
     * Sets up the lights in the scene.
     * Includes ambient light, directional lights, point light, and spot light.
     * 
     * @private
     */
    private setupLights(): void {
        const color = new THREE.Color(this.waterColor);
        const ambientLight = new THREE.AmbientLight(color, 0.6);
        this.scene.add(ambientLight);

        const createDirectionalLight = (color: THREE.Color, intensity: number, position: [number, number, number]): THREE.DirectionalLight => {
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
     * Adds random cone objects to the scene for visual variety.
     * 
     * @private
     */
    private addRandomObjects(): void {
        const geometry = new THREE.ConeGeometry(10, 30, 4, 1);
        const material = new THREE.MeshBasicMaterial({ color: this.waterColor, map: this.stonesTexture });

        for (let i = 0; i < 5000; i++) {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = (Math.random() - 0.5) * 20000;
            mesh.position.y = (Math.random() - 0.5) * 150;
            mesh.position.z = (Math.random() - 0.5) * 20000;
            this.scene.add(mesh);
        }
    }
}

export default SceneEnvironment; 