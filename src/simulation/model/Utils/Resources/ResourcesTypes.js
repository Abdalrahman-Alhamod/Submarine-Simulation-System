/**
 * Enum defining various resource types used in the application.
 *
 * This enum provides a centralized place to define resource types supported
 * by the application. Each type is associated with a specific string value.
 *
 * Usage example:
 * ```
 * import { ResourceTypes } from './ResourceTypes';
 *
 * const textureType = ResourceTypes.Texture; // Use the Texture resource type
 * ```
 *
 * @enum {string}
 */
export var ResourceTypes;
(function (ResourceTypes) {
    /**
     * GLTF model resource type.
     * Represents a 3D model in GLTF format.
     */
    ResourceTypes["GLTFModel"] = "gltfModel";
    /**
     * Texture resource type.
     * Represents an image or texture file.
     */
    ResourceTypes["Texture"] = "texture";
    /**
     * Cube texture resource type.
     * Represents a cube map texture with multiple faces.
     */
    ResourceTypes["CubeTexture"] = "cubeTexture";
})(ResourceTypes || (ResourceTypes = {}));
