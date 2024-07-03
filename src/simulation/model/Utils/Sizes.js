import EventEmitter from '../../controller/Utils/EventEmitter';
import { Events } from '../../controller/Utils/Events';
/**
 * Sizes class to manage window size and related events.
 * Extends EventEmitter to emit 'resize' events.
 * @class
 */
class Sizes extends EventEmitter {
    /**
     * Creates an instance of Sizes.
     * Initializes width, height, and pixel ratio based on window dimensions.
     * Sets up a resize event listener to update dimensions and trigger 'resize' events.
     * @constructor
     */
    constructor() {
        super(); // Call the constructor of the EventEmitter
        // Initialize sizes and pixel ratio based on current window dimensions
        this._width = window.innerWidth;
        this._height = window.innerHeight;
        this._pixelRatio = Math.min(window.devicePixelRatio, 2);
        // Setup resize event listener to update sizes and trigger 'resize' event
        window.addEventListener(Events.Resize, () => {
            this._width = window.innerWidth;
            this._height = window.innerHeight;
            this._pixelRatio = Math.min(window.devicePixelRatio, 2);
            // this.trigger(Events.Resize, [this._width, this._height, this._pixelRatio]);
            this.trigger(Events.Resize);
        });
    }
    /**
     * Getter for the width of the window.
     * @returns {number} The current width of the window.
     */
    get width() {
        return this._width;
    }
    /**
     * Setter for the width of the window.
     * @param {number} value - The new width value to set.
     */
    set width(value) {
        this._width = value;
    }
    /**
     * Getter for the height of the window.
     * @returns {number} The current height of the window.
     */
    get height() {
        return this._height;
    }
    /**
     * Setter for the height of the window.
     * @param {number} value - The new height value to set.
     */
    set height(value) {
        this._height = value;
    }
    /**
     * Getter for the pixel ratio of the window.
     * @returns {number} The current pixel ratio of the window.
     */
    get pixelRatio() {
        return this._pixelRatio;
    }
    /**
     * Setter for the pixel ratio of the window.
     * @param {number} value - The new pixel ratio value to set.
     */
    set pixelRatio(value) {
        this._pixelRatio = value;
    }
}
export default Sizes;
