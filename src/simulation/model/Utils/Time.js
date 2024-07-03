import EventEmitter from "../../controller/Utils/EventEmitter";
import { Events } from "../../controller/Utils/Events";
/**
 * Time class that manages time-related operations and triggers events on each tick.
 * Extends EventEmitter to handle event-driven architecture.
 *
 * @class
 */
class Time extends EventEmitter {
    /**
     * Creates an instance of Time.
     * Initializes the current time and start time to the current timestamp.
     * Starts the animation frame loop and the periodic interval for time updates.
     *
     * @constructor
     */
    constructor() {
        super();
        this.current = Date.now();
        this.start = this.current;
        this.delta = 0;
        this.elapsed = 0;
        this.tickIntervalId = undefined;
        // Start the animation frame loop
        window.requestAnimationFrame(() => {
            this.tick();
        });
        // Start the interval for periodic calculations
        this.startInterval();
    }
    /**
     * Animation frame loop for rendering and updating time-related variables.
     * Triggers 'frameTick' event on each animation frame.
     * @private
     */
    tick() {
        const currentTime = Date.now();
        this.delta = currentTime - this.current;
        this.current = currentTime;
        this.elapsed = this.current - this.start;
        // Trigger 'frameTick' event
        this.trigger(Events.FrameTick);
        // Continue animation frame loop
        window.requestAnimationFrame(() => {
            this.tick();
        });
    }
    /**
     * Start interval for periodic calculations.
     * Adjust the interval as needed for your specific simulation requirements.
     * @private
     */
    startInterval() {
        const interval = 10; // Adjust interval time (in milliseconds) as needed
        this.tickIntervalId = window.setInterval(() => {
            // Trigger 'clockTick' event at every interval
            this.trigger(Events.ClockTick);
            // Perform calculations or simulation updates here
            // Example: updateSimulation();
        }, interval);
    }
    /**
     * Stop interval for periodic calculations.
     * Call this method when pausing or resetting the simulation.
     * @private
     */
    stopInterval() {
        if (this.tickIntervalId) {
            window.clearInterval(this.tickIntervalId);
            this.tickIntervalId = undefined;
        }
    }
    /**
     * Pause the time-related operations.
     * Call this method when pausing the simulation or stopping time updates.
     * @public
     */
    pause() {
        window.cancelAnimationFrame(this.current);
        this.stopInterval();
    }
    /**
     * Resume the time-related operations.
     * Call this method to resume time updates after pausing.
     * @public
     */
    resume() {
        this.current = Date.now();
        window.requestAnimationFrame(() => {
            this.tick();
        });
        this.startInterval();
    }
    /**
     * Reset the time-related variables and intervals.
     * Call this method to reset time and stop ongoing calculations.
     * @public
     */
    reset() {
        this.current = Date.now();
        this.start = this.current;
        this.delta = 0;
        this.elapsed = 0;
        this.pause(); // Stop all intervals and animation frames
    }
    /**
     * Get the current timestamp in milliseconds.
     * @returns {number} The current timestamp.
     * @public
     */
    getCurrentTime() {
        return this.current;
    }
    /**
     * Get the start timestamp when the Time instance was created.
     * @returns {number} The start timestamp.
     * @public
     */
    getStartTime() {
        return this.start;
    }
    /**
     * Get the time difference between the current frame and the previous frame in milliseconds.
     * @returns {number} The delta time.
     * @public
     */
    getDeltaTime() {
        return this.delta;
    }
    /**
     * Get the total elapsed time since the Time instance was created.
     * @returns {number} The elapsed time.
     * @public
     */
    getElapsedTime() {
        return this.elapsed;
    }
}
export default Time;
