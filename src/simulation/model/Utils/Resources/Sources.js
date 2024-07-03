import Source from "./Source";
import { ResourceTypes } from "./ResourcesTypes";
import { ResourceNames } from "./ResourcesNames";
/**
 * Array of resource descriptors.
 * Each descriptor specifies the name, type, and path(s) of a resource to be loaded.
 *
 * @type {Source[]}
 */
export default [
    // new Source(
    //     'environmentMapTexture',
    //     ResourceTypes.CubeTexture,
    //     [
    //         'textures/environmentMap/px.jpg',
    //         'textures/environmentMap/nx.jpg',
    //         'textures/environmentMap/py.jpg',
    //         'textures/environmentMap/ny.jpg',
    //         'textures/environmentMap/pz.jpg',
    //         'textures/environmentMap/nz.jpg',
    //     ]
    // ),
    new Source(ResourceNames.DirtColorTexture, ResourceTypes.Texture, 'textures/env/dirt.jpg'),
    new Source(ResourceNames.StonesColorTexture, ResourceTypes.Texture, 'textures/env/stones.jpg'),
    new Source(ResourceNames.OhioSubmarineModel, ResourceTypes.GLTFModel, 'models/OhioSubmarine/glb/ohio-submarine.glb'),
    new Source(ResourceNames.TyphoonSubmarineModel, ResourceTypes.GLTFModel, 'models/TyphoonSubmarine/glb/typhoon-submarine.glb'),
];
