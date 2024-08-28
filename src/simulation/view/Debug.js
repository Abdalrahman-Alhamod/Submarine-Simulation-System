import GUI from "lil-gui";
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
  constructor({ title, bottom, top, left, right, width }) {
    this.active = true; // Debugging is always active
    this.gui = new GUI({ title: title, width: width }); // Initialize GUI with width option

    // Set the position using JavaScript
    const guiDomElement = this.gui.domElement;

    // Example: move the GUI to the bottom-left corner
    guiDomElement.style.position = "absolute";
    guiDomElement.style.bottom = bottom;
    guiDomElement.style.left = left;
    guiDomElement.style.top = top; // Reset the top position
    guiDomElement.style.right = right; // Reset the right position
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
