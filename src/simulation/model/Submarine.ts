import EventEmitter from '../controller/Utils/EventEmitter';
import SubmarineConstants from './SubmarineConstants';
import SubmarineState from './SubmarineState';
import { SubmarineType } from './SubmarineType';
/**
 * Represents the submarine by combining constant parameters and variable state.
 * @class
 */
class Submarine extends EventEmitter {
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
    * The type of the submarine, indicating its classification.
    * @private
    */
    private type: SubmarineType;

    /**
     * Constructs an instance of the Submarine class.
     * 
     * @param {SubmarineConstants} constants - The constant parameters defining the submarine's characteristics.
     * @param {SubmarineState} state - The variable state of the submarine.
     * @param {SubmarineType} type - The type of the submarine.
     */
    constructor(constants: SubmarineConstants, state: SubmarineState, type: SubmarineType) {
        super()
        this.constants = constants;
        this.state = state;
        this.type = type
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

    /**
     * Retrieves the type of the submarine.
     * 
     * @returns {SubmarineType} The type of the submarine.
     */
    getType(): SubmarineType {
        return this.type;
    }

}

export default Submarine;
