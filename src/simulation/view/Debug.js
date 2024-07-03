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
    close() {
        this.gui.close();
    }
    /**
     * Hides the debugging interface.
     *
     * This method hides the entire GUI container.
     */
    hide() {
        this.gui.hide();
    }
    /**
     * Shows the debugging interface.
     *
     * This method shows the GUI container if it was hidden.
     */
    show() {
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
    dispose() {
        this.gui.destroy();
    }
}
export default Debug;
