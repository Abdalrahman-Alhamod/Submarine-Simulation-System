import SubmarineConstants from './SubmarineConstants';
import SubmarineState from './SubmarineState';

/**
 * Represents the submarine by combining constant parameters and variable state.
 * @class
 */
class Submarine {
    /**
     * The constant parameters of the submarine.
     * @private
     */
    private constants: SubmarineConstants;

    /**
     * The variable state of the submarine.
     * @private
     */
    private state: SubmarineState;

    /**
     * Constructs an instance of Submarine.
     * @param {SubmarineConstants} constants - The constant parameters of the submarine.
     * @param {SubmarineState} state - The variable state of the submarine.
     */
    constructor(constants: SubmarineConstants, state: SubmarineState) {
        this.constants = constants;
        this.state = state;
    }

    /**
     * Retrieves the constant parameters of the submarine.
     * @returns {SubmarineConstants} The constant parameters of the submarine.
     */
    getConstants(): SubmarineConstants {
        return this.constants;
    }

    /**
     * Sets the constant parameters of the submarine.
     * @param {SubmarineConstants} constants - The new constant parameters of the submarine.
     */
    setConstants(constants: SubmarineConstants): void {
        this.constants = constants;
    }

    /**
     * Retrieves the variable state of the submarine.
     * @returns {SubmarineState} The variable state of the submarine.
     */
    getState(): SubmarineState {
        return this.state;
    }

    /**
     * Sets the variable state of the submarine.
     * @param {SubmarineState} state - The new variable state of the submarine.
     */
    setState(state: SubmarineState): void {
        this.state = state;
    }

    // Additional methods for updating state, simulating physics, etc. can be added here
}

export default Submarine;
