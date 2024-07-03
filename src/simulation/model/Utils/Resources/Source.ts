import { ResourceTypes } from "./ResourcesTypes";

/**
 * Class representing a resource source descriptor.
 * Specifies the name, type, and path(s) of a resource to be loaded.
 * 
 * @class
 */
class Source {
    /**
     * Name of the resource.
     * @type {string}
     */
    public name: string;

    /**
     * Type of the resource (e.g., GLTFModel, Texture, CubeTexture).
     * @type {ResourceTypes}
     */
    public type: ResourceTypes;

    /**
     * Path(s) to the resource file(s).
     * @type {string | string[]}
     */
    public path: string | string[];

    /**
     * Creates an instance of Source.
     * 
     * @param {string} name - Name of the resource.
     * @param {ResourceTypes} type - Type of the resource.
     * @param {string | string[]} path - Path(s) to the resource file(s).
     * @constructor
     */
    constructor(name: string, type: ResourceTypes, path: string | string[]) {
        this.name = name;
        this.type = type;
        this.path = path;
    }
}
export default Source;