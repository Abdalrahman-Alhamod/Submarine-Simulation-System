/**
 * Represents a parsed event name with namespace support.
 * 
 * The `Name` interface is used to define the structure of an object that holds
 * detailed information about an event name. This structure helps in managing
 * and organizing event listeners within the `EventEmitter` class.
 * 
 * Event names can be simple (e.g., `stateUpdate`) or namespaced (e.g., `stateUpdate.base`).
 * The `Name` interface provides a way to store and handle these parsed names.
 * 
 * @interface
 */
interface Name {
    /**
     * The original event name string as provided.
     * 
     * @type {string}
     */
    original: string;

    /**
     * The base part of the event name.
     * 
     * @type {string}
     */
    value: string;

    /**
     * The namespace to which the event belongs.
     * 
     * If no namespace is specified, this defaults to `base`.
     * 
     * @type {string}
     */
    namespace: string;
}

export default Name;