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
 * This class handles the loading of different types of resources such as models,
 * textures, cube textures, and audio files. It tracks the loading progress and emits
 * events when resources are ready for use.
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
            audioLoader: new THREE.AudioLoader(),
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
                    }, (xhr) => { }, // onProgress callback
                        (error) => console.error(`Error loading GLTFModel: ${source.name}`, error));
                    break;
                case ResourceTypes.Texture:
                    this.loaders.textureLoader.load(source.path, (file) => {
                        this.sourceLoaded(source, file);
                    }, (xhr) => { }, // onProgress callback
                        (error) => console.error(`Error loading Texture: ${source.name}`, error));
                    break;
                case ResourceTypes.CubeTexture:
                    this.loaders.cubeTextureLoader.load(source.path, (file) => {
                        this.sourceLoaded(source, file);
                    },
                        (xhr) => { }, // onProgress callback
                        (error) => console.error(`Error loading CubeTexture: ${source.name}`, error));
                    break;
                case ResourceTypes.Audio:
                    this.loaders.audioLoader.load(source.path, (file) => {
                        this.sourceLoaded(source, file);
                    },
                        (xhr) => { }, // onProgress callback
                        (error) => console.error(`Error loading audio: ${source.name}`, error));
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
        this.emitProgress();
        if (this.loaded === this.toLoad) {
            this.trigger(Events.ResourcesReady);
        }
    }

    /**
     * Emits progress updates for the loading process.
     * This method calculates the loading progress and triggers the corresponding
     * event to notify listeners about the current loading status.
     *
     * @private
     */
    emitProgress() {
        this.progress = this.loaded / this.toLoad;
        this.trigger(Events.ResourceProgress);
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
