"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents the submarine by combining constant parameters and variable state.
 * @class
 */
class Submarine {
    /**
     * Constructs an instance of Submarine.
     * @param {SubmarineConstants} constants - The constant parameters of the submarine.
     * @param {SubmarineState} state - The variable state of the submarine.
     */
    constructor(constants, state) {
        this.constants = constants;
        this.state = state;
    }
    /**
     * Retrieves the constant parameters of the submarine.
     * @returns {SubmarineConstants} The constant parameters of the submarine.
     */
    getConstants() {
        return this.constants;
    }
    /**
     * Sets the constant parameters of the submarine.
     * @param {SubmarineConstants} constants - The new constant parameters of the submarine.
     */
    setConstants(constants) {
        this.constants = constants;
    }
    /**
     * Retrieves the variable state of the submarine.
     * @returns {SubmarineState} The variable state of the submarine.
     */
    getState() {
        return this.state;
    }
    /**
     * Sets the variable state of the submarine.
     * @param {SubmarineState} state - The new variable state of the submarine.
     */
    setState(state) {
        this.state = state;
    }
}
exports.default = Submarine;
