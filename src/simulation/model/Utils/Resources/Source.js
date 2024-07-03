/**
 * Class representing a resource source descriptor.
 * Specifies the name, type, and path(s) of a resource to be loaded.
 *
 * @class
 */
class Source {
    /**
     * Creates an instance of Source.
     *
     * @param {string} name - Name of the resource.
     * @param {ResourceTypes} type - Type of the resource.
     * @param {string | string[]} path - Path(s) to the resource file(s).
     * @constructor
     */
    constructor(name, type, path) {
        this.name = name;
        this.type = type;
        this.path = path;
    }
}
export default Source;
