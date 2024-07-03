/**
 * Represents the environment for submarine simulation.
 * @class
 */
class Environment {
    /**
     * Gravity of the environment in meters per second squared (m/s^2).
     * @private
     */
    private gravity: number;

    /**
     * Water density of the environment in kilograms per cubic meter (kg/m^3).
     * @private
     */
    private waterDensity: number;

    /**
     * Creates an instance of Environment.
     * @param {number} gravity - The initial gravity value.
     * @param {number} waterDensity - The initial water density value.
     */
    constructor(gravity: number, waterDensity: number) {
        this.gravity = gravity;
        this.waterDensity = waterDensity;
    }

    /**
     * Updates the environment variables.
     * @param {number} gravity - The new gravity value to set.
     * @param {number} waterDensity - The new water density value to set.
     */
    updateVariables(gravity: number, waterDensity: number): void {
        this.gravity = gravity;
        this.waterDensity = waterDensity;
    }

    /**
     * Gets the current gravity value of the environment.
     * @returns {number} The current gravity value.
     */
    getGravity(): number {
        return this.gravity;
    }

    /**
     * Sets the gravity value of the environment.
     * @param {number} gravity - The new gravity value to set.
     */
    setGravity(gravity: number): void {
        this.gravity = gravity;
    }

    /**
     * Gets the current water density value of the environment.
     * @returns {number} The current water density value.
     */
    getWaterDensity(): number {
        return this.waterDensity;
    }

    /**
     * Sets the water density value of the environment.
     * @param {number} waterDensity - The new water density value to set.
     */
    setWaterDensity(waterDensity: number): void {
        this.waterDensity = waterDensity;
    }
}

export default Environment;