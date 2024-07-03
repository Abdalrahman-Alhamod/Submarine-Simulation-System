import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import EventEmitter from '../../../controller/Utils/EventEmitter';
import Source from './Source';
import { ResourceTypes } from './ResourcesTypes';
import { Events } from '../../../controller/Utils/Events';
import { ResourceNames } from './ResourcesNames';

/**
 * Resources class for managing and loading various types of assets asynchronously.
 * Extends EventEmitter to handle event-driven architecture.
 * 
 * @class
 * @extends EventEmitter
 */
class Resources extends EventEmitter {
    /**
     * Array of resource descriptors.
     * Each descriptor specifies the name, type, and path(s) of a resource to be loaded.
     * 
     * @type {Source[]}
     * @private
     */
    private sources: Source[];

    /**
     * Object storing loaded items keyed by their names.
     * 
     * @type {Object}
     * @private
     */
    private items: { [name: string]: any };

    /**
     * Total number of resources to load.
     * 
     * @type {number}
     * @private
     */
    private toLoad: number;

    /**
     * Number of resources already loaded.
     * 
     * @type {number}
     * @private
     */
    private loaded: number;

    /**
     * Loaders for different types of resources.
     * 
     * @type {{ gltfLoader: GLTFLoader; textureLoader: THREE.TextureLoader; cubeTextureLoader: THREE.CubeTextureLoader; dracoLoader: DRACOLoader }}
     * @private
     */
    private loaders!: {
        gltfLoader: GLTFLoader;
        textureLoader: THREE.TextureLoader;
        cubeTextureLoader: THREE.CubeTextureLoader;
        dracoLoader: DRACOLoader;
    };

    /**
     * Creates an instance of Resources.
     * Initializes loaders and starts loading resources.
     * 
     * @param {Source[]} sources - Array of Source instances describing each resource to load.
     * @constructor
     */
    constructor(sources: Source[]) {
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
    private setLoaders(): void {
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
    private startLoading(): void {
        for (const source of this.sources) {
            switch (source.type) {
                case ResourceTypes.GLTFModel:
                    this.loaders.gltfLoader.load(source.path as string, (file) => {
                        this.sourceLoaded(source, file);
                    });
                    break;
                case ResourceTypes.Texture:
                    this.loaders.textureLoader.load(source.path as string, (file) => {
                        this.sourceLoaded(source, file);
                    });
                    break;
                case ResourceTypes.CubeTexture:
                    this.loaders.cubeTextureLoader.load(source.path as string[], (file) => {
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
    private sourceLoaded(source: Source, file: any): void {
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
    public getResource(name: ResourceNames | string): any {
        return this.items[name];
    }
}

export default Resources;
