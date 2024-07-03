/**
 * Enum representing the names of various resources used in the application.
 * This enum is used to provide a consistent and type-safe way to reference resources.
 * Each enum value corresponds to a unique resource name string.
 * @enum {string}
 */
export var ResourceNames;
(function (ResourceNames) {
    /**
     * The name of the dirt color texture resource.
     * This texture is used to represent the color of dirt in the environment.
     */
    ResourceNames["DirtColorTexture"] = "dirtColorTexture";
    /**
     * The name of the stones color texture resource.
     * This texture is used to represent the color of stones in the environment.
     */
    ResourceNames["StonesColorTexture"] = "stonesColorTexture";
    /**
     * The name of the Ohio submarine model resource.
     * This GLTF model represents the Ohio class submarine in the scene.
     */
    ResourceNames["OhioSubmarineModel"] = "ohioSubmarineModel";
    /**
     * The name of the Typhoon submarine model resource.
     * This GLTF model represents the Typhoon class submarine in the scene.
     */
    ResourceNames["TyphoonSubmarineModel"] = "typhoonSubmarineModel";
})(ResourceNames || (ResourceNames = {}));
