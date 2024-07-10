import * as THREE from 'three';
import Resources from '../model/Utils/Resources/Resources';
import Sizes from '../model/Utils/Sizes';
import Time from '../model/Utils/Time';
import Debug from './Debug';
import Renderer from './Renderer';
import World from './World';
import Sources from '../model/Utils/Resources/Sources';
import { Events } from '../controller/Utils/Events';
import Camera from './Camera';
import Environment from '../model/Environment';
import Physics from '../controller/Physics';
import Submarines from '../model/Submarines';

/**
 * Simulator class for managing the WebGL-based simulation environment.
 * 
 * This class integrates components for scene rendering, resource management,
 * time handling, debugging, and world simulation.
 * 
 * @class
 */
class Simulator {
    /**
     * Singleton instance of the Simulator class.
     * 
     * @type {Simulator}
     * @private
     */
    private instance: Simulator | null = null;

    /**
     * HTML canvas element where the simulation is rendered.
     * 
     * @type {HTMLCanvasElement}
     * @public
     */
    public canvas!: HTMLCanvasElement;

    /**
     * Debugging interface for monitoring and controlling simulation parameters.
     * 
     * @type {Debug}
     * @public
     */
    public debug!: Debug;

    /**
     * Sizes instance for managing canvas dimensions and resizing events.
     * 
     * @type {Sizes}
     * @public
     */
    public sizes!: Sizes;

    /**
     * Time instance for managing simulation time and frame updates.
     * 
     * @type {Time}
     * @public
     */
    public time!: Time;

    /**
     * Three.js scene instance where objects and entities are placed.
     * 
     * @type {THREE.Scene}
     * @public
     */
    public scene!: THREE.Scene;

    /**
     * Resources instance for loading and managing external assets.
     * 
     * @type {Resources}
     * @public
     */
    public resources!: Resources;

    /**
     * Camera instance for controlling the view and perspective of the scene.
     * 
     * @type {Camera}
     * @public
     */
    public camera!: Camera;

    /**
     * Renderer instance for rendering the 3D scene onto the canvas.
     * 
     * @type {Renderer}
     * @public
     */
    public renderer!: Renderer;

    /**
     * World instance for simulating and managing the 3D world environment.
     * 
     * @type {World}
     * @public
     */
    public world!: World;

    /**
     * Physics instance for managing the physical simulation of the environment.
     * 
     * @type {Physics}
     * @public
     */
    public physics!: Physics;

    /**
     * Submarines instance for managing the collection of submarines in the simulation.
     * 
     * @type {Submarines}
     * @public
     */
    public submarines!: Submarines;

    /**
     * Environment instance for managing environmental properties such as gravity and water density.
     * 
     * @type {Environment}
     * @public
     */
    public environment!: Environment;

    /**
     * Creates an instance of the Simulator class.
     * Initializes all necessary components and sets up event listeners.
     * 
     * @param {HTMLCanvasElement} canvas - The HTML canvas element for rendering.
     * @constructor
     */
    constructor(canvas: HTMLCanvasElement) {
        // Singleton pattern
        if (this.instance) {
            return this.instance;
        }
        this.instance = this;

        // Set canvas
        this.canvas = canvas;

        // Initialize components
        this.debug = new Debug();
        this.sizes = new Sizes();
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.resources = new Resources(Sources);
        this.camera = new Camera(this);
        this.renderer = new Renderer(this);
        this.world = new World(this);
        this.environment = new Environment(9.8, 1025);
        this.submarines = new Submarines();
        this.physics = new Physics(this)

        this.time.on(Events.ClockTick, () => this.physics.simulateStep());
        // Subscribe to resize event
        this.sizes.on(Events.Resize, () => this.resize());

        // Subscribe to frame tick event
        this.time.on(Events.FrameTick, () => this.update());
    }

    /**
     * Handles resize event by updating camera and renderer dimensions.
     * 
     * @public
     */
    public resize(): void {
        this.camera.resize();
        this.renderer.resize();
    }

    /**
     * Updates the simulation state on each frame tick.
     * 
     * @public
     */
    public update(): void {
        this.camera.update();
        this.world.update();
        this.renderer.update();
    }

    /**
     * Destroys the simulator instance and cleans up resources.
     * 
     * This method unsubscribes from events, disposes resources, and clears scene objects.
     * 
     * @public
     */
    public destroy(): void {
        // Unsubscribe from events
        this.sizes.off(Events.Resize);
        this.time.off(Events.FrameTick);
        this.time.off(Events.ClockTick);
        this.time.off(Events.ResourcesReady);

        // Traverse scene and dispose objects
        this.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose();
                for (const key in child.material) {
                    const value = child.material[key];
                    if (value && typeof value.dispose === 'function') {
                        value.dispose();
                    }
                }
            }
        });

        // Dispose camera, renderer, and debug
        this.camera.dispose();
        this.renderer.dispose();
        if (this.debug.active) {
            this.debug.dispose();
        }
    }
}
export default Simulator;