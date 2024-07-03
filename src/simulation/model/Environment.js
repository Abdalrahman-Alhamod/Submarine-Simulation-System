/**
 * Represents the environment for submarine simulation.
 * @class
 */
class Environment {
    /**
     * Creates an instance of Environment.
     * @param {number} gravity - The initial gravity value.
     * @param {number} waterDensity - The initial water density value.
     */
    constructor(gravity, waterDensity) {
        this.gravity = gravity;
        this.waterDensity = waterDensity;
    }
    /**
     * Updates the environment variables.
     * @param {number} gravity - The new gravity value to set.
     * @param {number} waterDensity - The new water density value to set.
     */
    updateVariables(gravity, waterDensity) {
        this.gravity = gravity;
        this.waterDensity = waterDensity;
    }
    /**
     * Gets the current gravity value of the environment.
     * @returns {number} The current gravity value.
     */
    getGravity() {
        return this.gravity;
    }
    /**
     * Sets the gravity value of the environment.
     * @param {number} gravity - The new gravity value to set.
     */
    setGravity(gravity) {
        this.gravity = gravity;
    }
    /**
     * Gets the current water density value of the environment.
     * @returns {number} The current water density value.
     */
    getWaterDensity() {
        return this.waterDensity;
    }
    /**
     * Sets the water density value of the environment.
     * @param {number} waterDensity - The new water density value to set.
     */
    setWaterDensity(waterDensity) {
        this.waterDensity = waterDensity;
    }
}
export default Environment;
