import * as THREE from 'three';
import { SubmarineType } from '../model/SubmarineType';
import { ResourceNames } from '../model/Utils/Resources/ResourcesNames';
import { Events } from '../controller/Utils/Events';
import SubmarineDebug from './SubmarineDebug';
/**
 * Class representing the view of a submarine in the scene.
 * Manages the loading, initialization, and updating of submarine models.
 *
 * @class
 */
class SubmarineView {
    /**
     * Constructor for the SubmarineView class.
     * Initializes submarines scene models.
     * Sets up the initial submarine and debug tools.
     *
     * @param {Simulator} simulator - The simulator instance.
     */
    constructor(simulator) {
        this.simulator = simulator;
        this.resources = this.simulator.resources;
        this.scene = this.simulator.scene;
        this.submarines = this.simulator.submarines;
        this.items = {};
        this.submarineData = this.simulator.submarines.getCurrentSubmarine();
        this.initSubmarines();
        const submarineType = this.submarineData.getType();
        this.submarineScene = this.items[submarineType];
        this.scene.add(this.submarineScene);
        new SubmarineDebug(this.simulator);
        this.simulator.submarines.on(Events.SwitchSubmarine, () => {
            this.setSubmarineDataAndScene();
        });
        this.submarineData.on(Events.SubmarineUpdate, () => {
            this.setFanRotation(THREE.MathUtils.degToRad(this.submarineData.getState().getCurrentRotorRPS() * ((Math.PI * 2))));
            this.setSternRotation(THREE.MathUtils.degToRad(this.submarineData.getState().getSternAngle()));
            this.setRudderRotation(THREE.MathUtils.degToRad(this.submarineData.getState().rudderAngle));
            this.setFiarwaterRotation(THREE.MathUtils.degToRad(this.submarineData.getState().getFairwaterAngle()));
            this.updateSubmarine();
            this.simulator.camera.updateTarget(this.submarineScene.position);
        });
    }
    /**
     * Sets the current submarine data and updates the scene with the corresponding submarine model.
     */
    setSubmarineDataAndScene() {
        this.submarineData = this.simulator.submarines.getCurrentSubmarine();
        this.scene.remove(this.submarineScene);
        const submarineType = this.submarineData.getType();
        this.submarineScene = this.items[submarineType];
        this.scene.add(this.submarineScene);
    }
    setFanRotation(angle) {
        this.items[SubmarineType.Typhoon].children[0].children[3].rotation.y -= angle;
        this.items[SubmarineType.Typhoon].children[0].children[4].rotation.y += angle;
    }
    setRudderRotation(angle) {
        this.items[SubmarineType.Typhoon].children[0].children[5].rotation.z = - angle;
    }
    setFiarwaterRotation(angle) {
        this.items[SubmarineType.Typhoon].children[0].children[1].rotation.x = angle;
    }
    setSternRotation(angle) {
        this.items[SubmarineType.Typhoon].children[0].children[2].rotation.x = - angle;
    }
    /**
     * Initializes the submarine meshes for different submarine types and stores them in the items map.
     */
    initSubmarines() {
        const ohioSubmarine = this.initOhioSubmarineMesh();
        this.items[SubmarineType.Ohio] = ohioSubmarine;
        const typhoonSubmarine = this.initTyhpponSubmarineMesh();
        this.items[SubmarineType.Typhoon] = typhoonSubmarine;
    }
    /**
     * Initializes the Ohio submarine mesh by loading it from resources, applying necessary transformations,
     * and baking its rotation into the geometry.
     *
     * @returns {THREE.Scene} - The transformed Ohio submarine scene.
     */
    initOhioSubmarineMesh() {
        const ohioSubmarineScene = this.getSceneFromResource(ResourceNames.OhioSubmarineModel, SubmarineType.Ohio);
        ohioSubmarineScene.rotation.y = Math.PI;
        this.bakeRotationIntoGeometry(ohioSubmarineScene);
        ohioSubmarineScene.rotation.y = 0;
        return ohioSubmarineScene;
    }
    /**
    * Initializes the Typhoon submarine mesh by loading it from resources.
    *
    * @returns {THREE.Scene} - The Typhoon submarine scene.
    */
    initTyhpponSubmarineMesh() {
        const typhoonSubmarineScene = this.getSceneFromResource(ResourceNames.TyphoonSubmarineModel, SubmarineType.Typhoon);
        return typhoonSubmarineScene;
    }
    /**
     * Retrieves the submarine scene from the given resource and scales it according to the desired length.
     *
     * @param {ResourceNames} resourceName - The name of the resource to load.
     * @param {SubmarineType} submarineType - The type of the submarine.
     * @returns {THREE.Scene} - The scaled submarine scene.
     */
    getSceneFromResource(resourceName, submarineType) {
        const submarineGTFL = this.resources.getResource(resourceName);
        const submarineScene = submarineGTFL.scene;
        const boundingBox = new THREE.Box3().setFromObject(submarineScene);
        const initialLength = boundingBox.max.z - boundingBox.min.z;
        const desiredLength = this.submarines.getSubmarine(submarineType).getConstants().getLength();
        const scaleFactor = desiredLength / initialLength;
        submarineScene.scale.set(scaleFactor, scaleFactor, scaleFactor);
        return submarineScene;
    }
    /**
    * Updates the submarine's position and orientation in the scene based on its current state.
    */
    updateSubmarine() {
        this.submarineScene.position.copy(this.submarineData.getState().getCurrentPosition());
        this.submarineScene.quaternion.copy(this.submarineData.getState().getCurrentOrientation());
    }
    /**
    * Function to bake rotation into geometry.
    * Ensures the object's world matrix is up-to-date and applies the world matrix to the geometry.
    *
    * @param {THREE.Object3D} object - The object whose rotation to bake into its geometry.
    */
    bakeRotationIntoGeometry(object) {
        object.updateMatrixWorld(true); // Ensure the world matrix is up-to-date
        object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                const geometry = child.geometry;
                geometry.applyMatrix4(object.matrixWorld); // Apply world matrix to geometry
                geometry.computeVertexNormals(); // Recompute vertex normals
                child.position.set(0, 0, 0); // Reset position
                child.rotation.set(0, 0, 0); // Reset rotation
                child.scale.set(1, 1, 1); // Reset scale
                child.updateMatrixWorld(true); // Update matrix
            }
        });
    }
}
export default SubmarineView;
