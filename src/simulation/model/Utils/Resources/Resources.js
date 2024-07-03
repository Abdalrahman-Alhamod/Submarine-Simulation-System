import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import EventEmitter from '../../../controller/Utils/EventEmitter';
import { ResourceTypes } from './ResourcesTypes';
import { Events } from '../../../controller/Utils/Events';
/**
 * Resources class for managing and loading various types of assets asynchronously.
 * Extends EventEmitter to handle event-driven architecture.
 *
 * @class
 * @extends EventEmitter
 */
class Resources extends EventEmitter {
    /**
     * Creates an instance of Resources.
     * Initializes loaders and starts loading resources.
     *
     * @param {Source[]} sources - Array of Source instances describing each resource to load.
     * @constructor
     */
    constructor(sources) {
        super();
        this.sources = sources;
        this.items = {};
        this.toLoad = this.sources.length;
        this.loaded = 0;
        this.setLoaders();
        this.startLoading();
    }
    /**
     * Initializes various loaders needed for different resource types.
     *
     * @private
     */
    setLoaders() {
        this.loaders = {
            gltfLoader: new GLTFLoader(),
            textureLoader: new THREE.TextureLoader(),
            cubeTextureLoader: new THREE.CubeTextureLoader(),
            dracoLoader: new DRACOLoader(),
        };
    }
    /**
     * Starts loading each resource based on its type.
     * Triggers corresponding loaders and handles successful loading with sourceLoaded().
     *
     * @private
     */
    startLoading() {
        for (const source of this.sources) {
            switch (source.type) {
                case ResourceTypes.GLTFModel:
                    this.loaders.gltfLoader.load(source.path, (file) => {
                        this.sourceLoaded(source, file);
                    });
                    break;
                case ResourceTypes.Texture:
                    this.loaders.textureLoader.load(source.path, (file) => {
                        this.sourceLoaded(source, file);
                    });
                    break;
                case ResourceTypes.CubeTexture:
                    this.loaders.cubeTextureLoader.load(source.path, (file) => {
                        this.sourceLoaded(source, file);
                    });
                    break;
                default:
                    console.warn(`Unknown resource type: ${source.type}`);
                    break;
            }
        }
    }
    /**
     * Handles successful loading of a resource.
     * Stores the loaded file in this.items with the source name and triggers 'ready' event
     * when all resources are loaded.
     *
     * @param {Source} source - Description of the loaded resource.
     * @param {any} file - Loaded file object (depends on the loader used).
     * @private
     */
    sourceLoaded(source, file) {
        this.items[source.name] = file;
        this.loaded++;
        if (this.loaded === this.toLoad) {
            this.trigger(Events.ResourcesReady);
        }
    }
    /**
     * Retrieves a loaded resource by its name.
     * The name can be a string or a value from the ResourceNames enum.
     *
     * @param {ResourceNames | string} name - The name of the resource to retrieve.
     * @returns {any} - The loaded resource, or undefined if not found.
     */
    getResource(name) {
        return this.items[name];
    }
}
export default Resources;
