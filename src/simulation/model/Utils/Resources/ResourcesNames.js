/**
 * Enum representing the names of various resources used in the application.
 * This enum is used to provide a consistent and type-safe way to reference resources.
 * Each enum value corresponds to a unique resource name string.
 *
 * Usage example:
 * ```javascript
 * import { ResourceNames } from './ResourceNames';
 *
 * const textureName = ResourceNames.DirtColorTexture; // Use the DirtColorTexture resource name
 * ```
 *
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

    /**
     * The name of the engine sound resource.
     * This audio file is used to play the engine sounds of the submarine.
     */
    ResourceNames["EngineSound"] = "engineSound";

    /**
     * The name of the waves sound resource.
     * This audio file is used to simulate the sound of waves in the environment.
     */
    ResourceNames["WavesSound"] = "wavesSound";

    /**
     * The name of the underwater sound resource.
     * This audio file is used to simulate sounds that occur underwater.
     */
    ResourceNames["UnderWaterSound"] = "underWaterSound";
})(ResourceNames || (ResourceNames = {}));
