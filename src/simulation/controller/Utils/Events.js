/**
 * Enum defining various events used in the application.
 *
 * This enum provides a centralized place to define event names used throughout
 * the application. Each event name is associated with a specific string value.
 *
 * Usage example:
 * ```
 * import { Events } from './Events';
 *
 * const eventName = Events.Resize; // Use the Resize event name
 * ```
 *
 * @enum {string}
 */
export var Events;
(function (Events) {
    /**
     * Event emitted when the window is resized.
     *
     * This event is triggered whenever the browser window dimensions change.
     */
    Events["Resize"] = "resize";
    /**
     * Event emitted on each frame tick.
     *
     * This event is triggered every time `requestAnimationFrame` is called,
     * typically 60 times per second in modern browsers.
     */
    Events["FrameTick"] = "frameTick";
    /**
     * Event emitted on each clock tick interval.
     *
     * This event is triggered at regular intervals set by the `interval`
     * parameter in the `Time` class, for example, every 10 milliseconds.
     */
    Events["ClockTick"] = "clockTick";
    /**
    * Event emitted when all resources are loaded and ready for use.
    *
    * This event indicates that all assets specified in the resources array
    * have been successfully loaded and are ready for application use.
    */
    Events["ResourcesReady"] = "resourcesReady";
    // Add more event names as needed
})(Events || (Events = {}));
