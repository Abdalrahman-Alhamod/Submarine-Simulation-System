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
     * Current timestamp in milliseconds.
     * Used to calculate delta time and elapsed time.
     * @type {number}
     * @private
     */
    private current: number;

    /**
     * Start timestamp when the Time instance is created.
     * Used to calculate elapsed time since the start.
     * @type {number}
     * @private
     */
    private startTime: number;

    /**
     * Time difference between the current frame and the previous frame in milliseconds.
     * Represents the time elapsed since the last frame.
     * @type {number}
     * @private
     */
    private delta: number;

    /**
     * Total elapsed time since the Time instance was created.
     * Represents the cumulative time passed since the start.
     * @type {number}
     * @private
     */
    public elapsed: number;

    /**
     * Interval ID for the periodic time update interval.
     * Used to manage and clear the interval when needed.
     * @type {number | undefined}
     * @private
     */
    private tickIntervalId?: number;

    isRunning: boolean;

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
        this.startTime = this.current;
        this.delta = 0;
        this.elapsed = 0;
        this.tickIntervalId = undefined;
        this.isRunning = false

        // Start the animation frame loop
        window.requestAnimationFrame(() => {
            this.tick();
        });


    }

    /**
     * Animation frame loop for rendering and updating time-related variables.
     * Triggers 'frameTick' event on each animation frame.
     * @private
     */
    private tick(): void {

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
    private startInterval(): void {
        const interval = 10; // Adjust interval time (in milliseconds) as needed
        this.tickIntervalId = window.setInterval(() => {
            // Trigger 'clockTick' event at every interval
            this.trigger(Events.ClockTick);
            const currentTime = Date.now();
            this.delta = currentTime - this.current;
            this.current = currentTime;
            this.elapsed = this.current - this.startTime;
            // Perform calculations or simulation updates here
            // Example: updateSimulation();
        }, interval);
    }

    /**
     * Stop interval for periodic calculations.
     * Call this method when pausing or resetting the simulation.
     * @private
     */
    private stopInterval(): void {
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
    public pause(): void {
        this.isRunning = false
        this.elapsed = Date.now() - this.startTime;
        this.stopInterval();
    }

    public start(): void {
        this.isRunning = true
        this.startTime = Date.now();
        this.startInterval();
    }

    /**
     * Resume the time-related operations.
     * Call this method to resume time updates after pausing.
     * @public
     */
    public resume(): void {
        this.isRunning = true
        this.current = Date.now();
        this.startTime = Date.now() - this.elapsed;
        this.startInterval();
    }

    /**
     * Reset the time-related variables and intervals.
     * Call this method to reset time and stop ongoing calculations.
     * @public
     */
    public reset(): void {
        this.current = Date.now();
        this.startTime = this.current;
        this.delta = 0;
        this.elapsed = 0;
        this.pause(); // Stop all intervals and animation frames
    }

    /**
     * Get the current timestamp in milliseconds.
     * @returns {number} The current timestamp.
     * @public
     */
    public getCurrentTime(): number {
        return this.current;
    }

    /**
     * Get the start timestamp when the Time instance was created.
     * @returns {number} The start timestamp.
     * @public
     */
    public getStartTime(): number {
        return this.startTime;
    }

    /**
     * Get the time difference between the current frame and the previous frame in milliseconds.
     * @returns {number} The delta time.
     * @public
     */
    public getDeltaTime(): number {
        return this.delta;
    }

    /**
     * Get the total elapsed time since the Time instance was created.
     * @returns {number} The elapsed time.
     * @public
     */
    public getElapsedTime(): number {
        return this.elapsed;
    }
}

export default Time;
