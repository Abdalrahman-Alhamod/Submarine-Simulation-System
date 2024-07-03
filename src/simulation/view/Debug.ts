import GUI from 'lil-gui';

/**
 * Debug class for managing the mandatory debugging interface of the simulator.
 * 
 * This class initializes the debugging interface using the `lil-gui` library,
 * which is essential for monitoring and controlling the simulation parameters.
 * The debugging interface is mandatory and always active in the simulator.
 * 
 * @class
 */
class Debug {
    /**
     * Indicates whether the debugging interface is active.
     * 
     * This attribute is always set to `true` since debugging is mandatory in the simulator.
     * 
     * @type {boolean}
     */
    public active: boolean;

    /**
     * The GUI instance from `lil-gui` used for debugging controls.
     * 
     * @type {GUI}
     */
    public gui: GUI;

    /**
     * Creates an instance of the Debug class.
     * 
     * Initializes the debugging interface with a specified width.
     * The interface is always created because debugging is mandatory.
     * 
     * @constructor
     */
    constructor() {
        this.active = true; // Debugging is always active
        this.gui = new GUI({ width: 300 }); // Initialize GUI with width option
    }

    /**
     * Closes the debugging interface.
     * 
     * This method hides the GUI interface.
     */
    public close(): void {
        this.gui.close();
    }

    /**
     * Hides the debugging interface.
     * 
     * This method hides the entire GUI container.
     */
    public hide(): void {
        this.gui.hide();
    }

    /**
     * Shows the debugging interface.
     * 
     * This method shows the GUI container if it was hidden.
     */
    public show(): void {
        this.gui.show();
    }

    /**
     * Disposes of the debugging interface and cleans up resources.
     * 
     * This method destroys the `lil-gui` instance, ensuring all associated
     * resources are properly released to avoid memory leaks.
     * 
     * @public
     */
    public dispose(): void {
        this.gui.destroy();
    }

}

export default Debug;
