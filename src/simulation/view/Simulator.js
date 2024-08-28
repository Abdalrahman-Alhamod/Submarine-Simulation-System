import * as THREE from "three";
import Resources from "../model/Utils/Resources/Resources";
import Sizes from "../model/Utils/Sizes";
import Time from "../model/Utils/Time";
import Renderer from "./Renderer";
import World from "./World";
import Sources from "../model/Utils/Resources/Sources";
import { Events } from "../controller/Utils/Events";
import Camera from "./Camera";
import Environment from "../model/Environment";
import Physics from "../controller/Physics";
import Submarines from "../model/Submarines";
import GUI from 'lil-gui';
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
   * Creates an instance of the Simulator class.
   * Initializes all necessary components and sets up event listeners.
   *
   * @param {HTMLCanvasElement} canvas - The HTML canvas element for rendering.
   * @constructor
   */
  constructor(canvas) {
    /**
     * Singleton instance of the Simulator class.
     *
     * @type {Simulator}
     * @private
     */
    this.instance = null;
    // Singleton pattern
    if (this.instance) {
      return this.instance;
    }
    this.instance = this;
    // Set canvas
    this.canvas = canvas;
    // Initialize components
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(Sources);
    this.camera = new Camera(this);
    this.renderer = new Renderer(this);
    this.world = new World(this);
    this.environment = new Environment(9.8, 1025);
    this.submarines = new Submarines();
    this.physics = new Physics(this);
    this.time.on(Events.ClockTick, () => this.physics.simulateStep());
    // Subscribe to resize event
    this.sizes.on(Events.Resize, () => this.resize());
    // Subscribe to frame tick event
    this.time.on(Events.FrameTick, () => this.update());

    // Setup the loading screen with lil-gui
    this.setupLoadingScreen();

    // Listen for resource loading events
    this.resources.on(Events.ResourceProgress, () => {
      this.gui.controllers[0].setValue(this.resources.progress * 100);
    });

    this.resources.on(Events.ResourcesReady, () => {
      // Remove or hide the loading screen once resources are ready
      this.gui.destroy();
    });
  }
  setupLoadingScreen() {
    // Initialize lil-gui
    this.gui = new GUI({ title: 'Loading...', autoPlace: false });

    document.body.appendChild(this.gui.domElement);

    // Apply custom CSS class for better styling
    this.gui.domElement.classList.add('loading');

    // Use a number display instead of a slider
    this.progressController = this.gui.add({ Progress: 0 }, 'Progress', 0, 100).step(1).listen().disable();

  }
  /**
   * Handles resize event by updating camera and renderer dimensions.
   *
   * @public
   */
  resize() {
    this.camera.resize();
    this.renderer.resize();
  }
  /**
   * Updates the simulation state on each frame tick.
   *
   * @public
   */
  update() {
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
  destroy() {
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
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });
    // Dispose camera, renderer, and debug
    this.camera.dispose();
    this.renderer.dispose();
    if (this.controlGUI.active) {
      this.controlGUI.dispose();
    }
  }
}
export default Simulator;
