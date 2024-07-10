/**
 * Enum defining various submarine types used in the simulation.
 * 
 * This enum provides a centralized place to define the submarine types supported
 * by the application. Each type is associated with a specific string value.
 * 
 * Usage example:
 * ```
 * import { SubmarineType } from './SubmarineType';
 * 
 * const currentSubmarine = SubmarineType.Ohio; // Use the Ohio submarine type
 * ```
 * 
 * @enum {string}
 */
export enum SubmarineType {
    /**
     * Ohio class submarine type.
     * Represents the Ohio class submarine.
     */
    Ohio = 'Ohio',

    /**
     * Typhoon class submarine type.
     * Represents the Typhoon class submarine.
     */
    Typhoon = 'Typhoon',
}
