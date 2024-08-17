import * as THREE from 'three';
import { Events } from "./Utils/Events";
import { CSG } from 'three-csg-ts';
/**
 * Represents the physics simulation for a submarine within an environment.
 * Manages the dynamics and forces acting on the submarine.
 *
 * @class
 */
class Phyiscs {
    /**
    * Constructs an instance of the Physics class.
    * Initializes necessary attributes and subscribes to submarine state changes.
    *
    * @param {Simulator} simulator - The simulator instance managing the environment.
    */
    constructor(simulator) {
        this.simulator = simulator;
        this.env = this.simulator.environment;
        this.submarine = this.simulator.submarines.getCurrentSubmarine();
        this.submarineConstant = this.submarine.getConstants();
        this.submarineState = this.submarine.getState();
        this.arrowHelper = {};
        this.simulator.submarines.on(Events.SwitchSubmarine, () => {
            const submarine = this.simulator.submarines.getCurrentSubmarine();
            this.submarineConstant = submarine.getConstants();
            this.submarineState = submarine.getState();
        });
        // this.initCSG_Geometries();
        this.dt = 0.01; // 10 Milleisecnods
    }
    /**
     * Performs one simulation step for the submarine.
     * Updates linear and angular motion based on current forces and torques.
     */
    simulateStep() {
        this.simulateLinearMotion();
        this.simulateAngularMotion();
        this.submarine.trigger(Events.SubmarineUpdate);
    }
    /**
     * Simulates linear motion of the submarine based on forces (buoyancy, weight, thrust, drag).
     */
    simulateLinearMotion() {
        const weight = this.getWeight();
        const buoyancy = this.getBuoyancy();
        const thrust = this.getThrust();
        const drag = this.getDrag();
        const weightVector = new THREE.Vector3(0, -weight, 0); // Gravity is downward
        const buoyancyVector = new THREE.Vector3(0, buoyancy, 0); // Buoyancy is upward
        // Assume thrust direction is along submarine's forward axis
        const thrustDirection = this.submarineState.getForwardAxis();
        const thrustVector = thrustDirection.clone().multiplyScalar(thrust);
        // Assume drag direction is opposite to current velocity
        const velocity = this.submarineState.getCurrentSpeed();
        const dragDirection = velocity.clone().normalize();
        const dragVector = dragDirection.clone().multiplyScalar(drag);
        // Calculate acceleration vector
        const totalForce = weightVector.clone()
            .add(buoyancyVector)
            .add(thrustVector)
            .sub(dragVector);
        // const mass = this.getWeight() / this.env.getGravity(); // Assuming mass = weight / gravity
        const mass = this.submarineState.getCurrentMass(); // Assuming mass = weight / gravity
        const acceleration = totalForce.clone().divideScalar(mass);
        // Update velocity
        const currentVelocity = this.submarineState.getCurrentSpeed();
        const newVelocity = currentVelocity.clone().add(acceleration.clone().multiplyScalar(this.dt));
        // Update position
        const currentPosition = this.submarineState.getCurrentPosition();
        const newPosition = currentPosition.clone().add(newVelocity.clone().multiplyScalar(this.dt));
        // Set new state in submarine
        // console.log('Simulate')
        // console.log(acceleration)
        // console.log(newVelocity)
        // console.log(newPosition)
        this.submarineState.setWeight(weight);
        this.submarineState.setBuoyancy(buoyancy);
        this.submarineState.setThrust(thrust);
        this.submarineState.setDrag(drag);
        this.submarineState.setCurrentDepth(this.getCurrentDepth());
        this.submarineState.setCurrentAcceleration(acceleration);
        this.submarineState.setCurrentSpeed(newVelocity);
        this.submarineState.setCurrentPosition(newPosition);
    }
    /**
    * Simulates angular motion of the submarine based on torques (stern, rudder, fairwater, friction, weight).
    */
    simulateAngularMotion() {
        const state = this.submarineState;
        const sternTorque = this.getSternTorque();
        const rudderTorque = this.getRudderTorque();
        const fairwaterTorque = this.getFairwaterTorque();
        const frictionTorque = this.getFrictionTorque();
        const weightTorque = this.getWeightTorque();
        const netTorque = new THREE.Vector3();
        netTorque.add(sternTorque);
        netTorque.add(rudderTorque);
        netTorque.add(fairwaterTorque);
        netTorque.add(frictionTorque);
        netTorque.add(weightTorque);
        const I = this.getMomentOfInertia();
        // Calculate angular acceleration
        const alpha = netTorque.clone().applyMatrix3(I.clone().invert());
        // Update angular velocity
        const omega = state.getAngularVelocity();
        const newOmega = omega.clone().add(alpha.multiplyScalar(this.dt));
        // Update orientation
        const angleOfRotation = newOmega.length() * this.dt;
        const rotationAxis = newOmega.clone().normalize();
        const quaternionChange = new THREE.Quaternion().setFromAxisAngle(rotationAxis, angleOfRotation);
        let quaternion = state.getCurrentOrientation();
        quaternion = quaternion.multiply(quaternionChange);
        quaternion.normalize();
        state.setAngularAcceleration(alpha);
        state.setAngularVelocity(newOmega);
        state.setCurrentOrientation(quaternion);
    }
    /**
    * Retrieves the weight acting on the submarine based on its current mass and gravity.
    *
    * @returns {number} The weight acting on the submarine.
    */
    getWeight() {
        const mass = this.submarineState.getCurrentMass();
        const gravity = this.env.getGravity();
        const weight = mass * gravity;
        return weight;
    }
    /**
    * Retrieves the buoyant force acting on the submarine based on its submerged volume and water density.
    *
    * @returns {number} The buoyant force acting on the submarine.
    */
    getBuoyancy() {
        const waterDensity = this.env.getWaterDensity();
        const gravity = this.env.getGravity();
        const submergedVolume = this.getSubmergedVolume();
        const buoyancy = waterDensity * gravity * submergedVolume;
        return buoyancy;
    }
    /**
    * Retrieves the thrust force acting on the submarine based on current rotor speed and coefficients.
    *
    * @returns {number} The thrust force acting on the submarine.
    */
    getThrust() {
        const thrustCoefficient = this.submarineConstant.getThrustCoefficient();
        const waterDensity = this.env.getWaterDensity();
        const currentRotorRPS = this.submarineState.getCurrentRotorRPS();
        const rotorDiameter = this.submarineConstant.getRotorDiameter();
        const thrust = thrustCoefficient * waterDensity * Math.pow(currentRotorRPS, 2) * Math.pow(rotorDiameter, 4);
        return thrust;
    }
    /**
    * Retrieves the drag force acting on the submarine based on current velocity and drag coefficients.
    *
    * @returns {number} The drag force acting on the submarine.
    */
    getDrag() {
        const dragCoefficient = this.submarineConstant.getDragCoefficient();
        const waterDensity = this.env.getWaterDensity();
        const crossSectionalArea = this.getCrossSectionArea();
        const currentVelocity = this.submarineState.getCurrentSpeed().length();
        const drag = dragCoefficient * 0.5 * waterDensity * crossSectionalArea * Math.pow(currentVelocity, 2);
        return drag;
    }
    /**
   * Retrieves the moment of inertia tensor for the submarine based on its current dimensions and mass.
   *
   * @returns {THREE.Matrix3} The moment of inertia tensor.
   */
    getMomentOfInertia() {
        const constants = this.submarineConstant;
        const a = constants.getLength() / 2;
        const b = constants.getWidth() / 2;
        const c = constants.getWidth() / 2;
        const mass = this.submarineState.getCurrentMass();
        const Ixx = (1 / 5) * mass * (b * b + c * c);
        const Iyy = (1 / 5) * mass * (a * a + c * c);
        const Izz = (1 / 5) * mass * (a * a + b * b);
        return new THREE.Matrix3().set(Ixx, 0, 0, 0, Iyy, 0, 0, 0, Izz);
    }
    /**
     * Retrieves the torque produced by the stern planes of the submarine.
     *
     * @returns {THREE.Vector3} The torque produced by the stern planes.
     */
    getSternTorque() {
        const force = this.getSternPlaneForce();
        const leverArm = this.submarineConstant.getLength() / 2;
        return force.multiplyScalar(leverArm);
    }
    /**
  * Retrieves the torque produced by the rudder of the submarine.
  *
  * @returns {THREE.Vector3} The torque produced by the rudder.
  */
    getRudderTorque() {
        const force = this.getRudderPlaneForce();
        const leverArm = this.submarineConstant.getLength() / 2;
        return force.multiplyScalar(leverArm);
    }
    /**
   * Retrieves the torque produced by the fairwater planes of the submarine.
   *
   * @returns {THREE.Vector3} The torque produced by the fairwater planes.
   */
    getFairwaterTorque() {
        const force = this.getFairwaterPlaneForce();
        const leverArm = (this.submarineConstant.getLength() / 2) * 0.8;
        return force.multiplyScalar(leverArm);
    }
    /**
   * Retrieves the torque produced by angular friction of the submarine.
   *
   * @returns {THREE.Vector3} The torque produced by angular friction.
   */
    getFrictionTorque() {
        const force = this.getAngularFrictionForce();
        const leverArm = this.submarineConstant.getLength() / 2;
        // Two toques
        return force.multiplyScalar(leverArm).multiplyScalar(2);
    }
    /**
    * Retrieves the torque produced by the weight of water in the submarine's tanks.
    *
    * @returns {THREE.Vector3} The torque produced by the weight of water in the tanks.
    */
    getWeightTorque() {
        const weight = this.getTankWeight();
        const forceDirection = new THREE.Vector3(0, 1, 0).cross(this.submarineState.getForwardAxis());
        const force = forceDirection.multiplyScalar(weight);
        const com = this.submarineState.getCenterOfMass();
        const leverArm = com.length();
        // If water in back tank, inverse direction
        if (com.z < 0) {
            force.multiplyScalar(-1);
        }
        return force.multiplyScalar(leverArm);
    }
    /**
   * Retrieves the weight of water in the submarine's tanks.
   *
   * @returns {number} The weight of water in the submarine's tanks.
   */
    getTankWeight() {
        const mass = this.submarineState.getTanksDifferenceMass();
        const gravity = this.env.getGravity();
        const weight = mass * gravity;
        return weight;
    }
    /**
    * Retrieves the force acting on the stern planes of the submarine.
    *
    * @returns {THREE.Vector3} The force acting on the stern planes.
    */
    getSternPlaneForce() {
        const sternCoefficient = this.submarineConstant.getSternCoefficient();
        const sternPlaneArea = this.submarineConstant.getSternPlaneArea();
        const sternAngle = this.submarineState.getSternAngle();
        const forceMagnitude = this.calculatePlaneForce(sternCoefficient, sternPlaneArea, sternAngle);
        const forceDirection = new THREE.Vector3(1, 0, 0).applyQuaternion(this.submarineState.getCurrentOrientation()); // Assuming force is applied along the negative z-axis
        return forceDirection.multiplyScalar(forceMagnitude);
    }
    /**
    * Retrieves the force acting on the rudder of the submarine.
    *
    * @returns {THREE.Vector3} The force acting on the rudder.
    */
    getRudderPlaneForce() {
        const rudderCoefficient = this.submarineConstant.getRudderCoefficient();
        const rudderPlaneArea = this.submarineConstant.getRudderPlaneArea();
        const rudderAngle = this.submarineState.getRudderAngle();
        const forceMagnitude = this.calculatePlaneForce(rudderCoefficient, rudderPlaneArea, rudderAngle);
        const forceDirection = new THREE.Vector3(0, 1, 0).applyQuaternion(this.submarineState.getCurrentOrientation()); // Assuming force is applied along the negative x-axis
        return forceDirection.multiplyScalar(forceMagnitude);
    }
    /**
   * Retrieves the force acting on the fairwater planes of the submarine.
   *
   * @returns {THREE.Vector3} The force acting on the fairwater planes.
   */
    getFairwaterPlaneForce() {
        const fairwaterCoefficient = this.submarineConstant.getFairwaterCoefficient();
        const fairwaterPlaneArea = this.submarineConstant.getFairwaterPlaneArea();
        const fairwaterAngle = this.submarineState.getFairwaterAngle();
        const forceMagnitude = this.calculatePlaneForce(fairwaterCoefficient, fairwaterPlaneArea, fairwaterAngle);
        const forceDirection = new THREE.Vector3(1, 0, 0).applyQuaternion(this.submarineState.getCurrentOrientation()); // Assuming force is applied along the negative z-axis
        return forceDirection.multiplyScalar(forceMagnitude);
    }
    /**
   * Calculates the force acting on a plane surface based on coefficient, area, and angle.
   *
   * @param {number} coefficient - Coefficient of force.
   * @param {number} area - Area of the plane surface.
   * @param {number} angle - Angle of attack of the plane surface.
   * @returns {number} The force magnitude acting on the plane surface.
   */
    calculatePlaneForce(coefficient, area, angle) {
        const waterDensity = this.env.getWaterDensity();
        const forwardAxis = this.submarineState.getForwardAxis();
        const velocity = this.submarineState.getCurrentSpeed();
        const speed = velocity.dot(forwardAxis); // Forward Velocity Magnitude
        const sin = Math.sin(THREE.MathUtils.degToRad(angle));
        const force = 0.5 * coefficient * waterDensity * area * Math.pow(speed, 2) * sin;
        return force;
    }
    /**
     * Retrieves the angular friction force acting on the submarine.
     *
     * @returns {THREE.Vector3} The angular friction force acting on the submarine.
     */
    getAngularFrictionForce() {
        const dragCoefficient = this.submarineConstant.getDragCoefficient();
        const waterDensity = this.env.getWaterDensity();
        const angularVelocity = this.submarineState.getAngularVelocity().length();
        const radius = this.submarineConstant.getRadius();
        const forceMagnitude = 0.2 * Math.PI * dragCoefficient * waterDensity * Math.pow(angularVelocity, 2) * Math.pow(radius, 5);
        const forceDirection = this.submarineState.getAngularVelocity().clone().negate().normalize();
        return forceDirection.multiplyScalar(forceMagnitude);
    }
    /**
    * Retrieves the current depth of the submarine.
    *
    * @returns {number} The current depth of the submarine.
    */
    getCurrentDepth() {
        const depth = this.submarineState.getCurrentPosition().y * -1;
        return depth;
    }
    /**
    * Calculates the submerged volume of the submarine based on its ellipsoid shape and current orientation.
    *
    * @returns {number} The submerged volume of the submarine.
    */
    getSubmergedVolume() {
        // Optimization - If totaly submerged, don't calculate the submerged part
        if (this.getCurrentDepth() > this.submarineConstant.getLength() / 2) {
            return this.submarineConstant.getVolume();
        }
        const a = this.submarineConstant.getRadius();
        const b = a;
        const c = this.submarineConstant.getLength() / 2;
        const x0 = this.submarineState.getCurrentPosition().x;
        const y0 = this.submarineState.getCurrentPosition().y;
        const z0 = this.submarineState.getCurrentPosition().z;
        const ellipsoidTotalVolume = (4 / 3) * Math.PI * a * b * c;
        // console.log('Total Volume :' + ellipsoidTotalVolume);
        // Rotation matrix for the ellipsoid (assuming you have this from Euler angles or quaternions)
        const rotationMatrix = new THREE.Matrix4();
        // Apply your rotation here
        rotationMatrix.makeRotationFromQuaternion(this.submarineState.getCurrentOrientation());
        // or
        // rotationMatrix.makeRotationFromQuaternion(new THREE.Quaternion(...));
        // Voxelization
        const voxelSize = 1; // Adjust for accuracy/performance
        let ellipsoidSubmergedVolume = 0;
        // Iterate through voxels inside the bounding box of the ellipsoid
        for (let x = -a; x <= a; x += voxelSize) {
            for (let y = -b; y <= b; y += voxelSize) {
                for (let z = -c; z <= c; z += voxelSize) {
                    // Check if the voxel point is inside the ellipsoid
                    if ((x * x) / (a * a) + (y * y) / (b * b) + (z * z) / (c * c) <= 1) {
                        // Transform voxel point to world coordinates
                        const ellipsoidPoint = new THREE.Vector3(x, y, z);
                        const worldPoint = ellipsoidPoint.applyMatrix4(rotationMatrix).add(new THREE.Vector3(x0, y0, z0));
                        // Check if the voxel is submerged below the plane y=0 in world coordinates
                        if (worldPoint.y <= 0) {
                            ellipsoidSubmergedVolume += voxelSize * voxelSize * voxelSize; // Add voxel volume to submerged volume
                        }
                    }
                }
            }
        }
        // console.log("Ellipsoid Submerged Volume:", ellipsoidSubmergedVolume);
        const ratio = ellipsoidSubmergedVolume / ellipsoidTotalVolume;
        // console.log('Ration :' + ratio);
        const submergedVolume = this.submarineConstant.getVolume() * ratio;
        // console.log("Submerged Volume:", submergedVolume);
        return submergedVolume;
    }
    /**
     * Calculates the cross-sectional area of the submarine perpendicular to its forward direction.
     *
     * @returns {number} The cross-sectional area of the submarine.
     */
    getCrossSectionArea() {
        // Define the submarine's forward direction in local coordinates
        const submarineForward = new THREE.Vector3(0, 0, 1);
        // Transform the forward direction vector by the submarine's orientation
        const worldForward = submarineForward.applyQuaternion(this.submarineState.getCurrentOrientation());
        // Assume you have the velocity vector of the submarine
        const submarineVelocity = new THREE.Vector3().copy(this.submarineState.getCurrentSpeed());
        // Normalize both vectors to get their directions
        worldForward.normalize();
        submarineVelocity.normalize();
        // Calculate the dot product
        const dotProduct = worldForward.dot(submarineVelocity);
        // Calculate the angle in radians
        const angleInRadians = Math.acos(dotProduct);
        const radius = this.submarineConstant.getRadius();
        const length = this.submarineConstant.getLength() / 2;
        const cos = Math.cos(angleInRadians);
        const sin = Math.sin(angleInRadians);
        const a = radius;
        const formula = Math.pow(radius, 2) * Math.pow(cos, 2) + Math.pow(length, 2) * Math.pow(sin, 2);
        const b = Math.sqrt(formula);
        const area = a * b * Math.PI;
        // console.log("Angle between submarine main axis and speed vector: ", angleInDegrees, "degrees");
        // console.log('Cross-sectional area:', area);
        return area;
    }
    // Helpers
    /**
    * Initializes CSG (Constructive Solid Geometry) geometries for the submarine.
    *
    * @remarks This method sets up the ellipsoid mesh, surface box, and cutting plane for CSG operations.
    */
    initCSG_Geometries() {
        this.initSubmarineEllipsoidMesh();
        this.submarine.on(Events.SubmarineUpdate, () => {
            this.updateSubmarineEllipsoidMeshPositionAndOrietntation();
        });
        this.initSurfaceBoxMesh();
        this.initCuttingPlaneMesh();
    }
    /**
    * Retrieves the cross-sectional area of the submarine using CSG operations.
    *
    * @returns {number} The cross-sectional area of the submarine using CSG operations.
    */
    getCrossSectionalAreaCSG() {
        // Perform CSG intersection
        const ellipsoidCSG = CSG.fromMesh(this.submarineEllipsoidMesh);
        const planeCSG = CSG.fromMesh(this.cuttingPlaneMesh);
        const intersectionCSG = ellipsoidCSG.intersect(planeCSG);
        const intersectionMesh = CSG.toMesh(intersectionCSG, new THREE.Matrix4());
        const vertices = intersectionMesh.geometry.attributes.position;
        const area = this.calculatePolygonArea(vertices);
        console.log('Cross-sectional area:', area);
        return area;
    }
    /**
    * Retrieves the cross-sectional area of the submarine using CSG operations.
    *
    * @returns {number} The cross-sectional area of the submarine using CSG operations.
    */
    getSubmergedVolumeCSG() {
        this.submarineEllipsoidMesh.updateMatrix();
        this.surfaceBoxMesh.updateMatrix();
        const subtractResMesh = CSG.subtract(this.submarineEllipsoidMesh, this.surfaceBoxMesh);
        const subtractResVolume = this.getVolume(subtractResMesh.geometry);
        const ratio = subtractResVolume / this.submarineEllipsoidVolume;
        const submergedVolume = this.submarineConstant.getVolume() * ratio;
        return submergedVolume;
    }
    /**
   * Initializes the ellipsoid mesh representing the submarine for CSG operations.
   */
    initSubmarineEllipsoidMesh() {
        const ellipsoidGeometry = new THREE.SphereGeometry(0.5, 128, 128);
        const radius = this.submarineConstant.getRadius();
        const length = this.submarineConstant.getLength();
        const additionalSpace = ((radius + length) / 2) * 0.08;
        ellipsoidGeometry.scale(radius + additionalSpace, radius + additionalSpace, length + additionalSpace);
        const ellipsoidMesh = new THREE.Mesh(ellipsoidGeometry, new THREE.MeshBasicMaterial());
        this.submarineEllipsoidVolume = this.getVolume(ellipsoidMesh.geometry);
        this.submarineEllipsoidMesh = ellipsoidMesh;
    }
    /**
     * Initializes the surface box mesh used in CSG operations.
     */
    initSurfaceBoxMesh() {
        const surfaceBox = new THREE.Mesh(new THREE.BoxGeometry(100, 0.1, 200), new THREE.MeshBasicMaterial());
        surfaceBox.position.y += surfaceBox.position.y / 2;
        this.surfaceBoxMesh = surfaceBox;
    }
    /**
   * Updates the position and orientation of the submarine ellipsoid mesh for CSG operations.
   */
    updateSubmarineEllipsoidMeshPositionAndOrietntation() {
        const currentPosition = this.submarineState.getCurrentPosition();
        const currentOrientation = this.submarineState.getCurrentOrientation();
        // Assuming currentPosition is a THREE.Vector3
        this.submarineEllipsoidMesh.position.copy(currentPosition);
        // Assuming currentOrientation is a THREE.Vector3 containing Euler angles (pitch, yaw, roll)
        this.submarineEllipsoidMesh.quaternion.copy(currentOrientation);
    }
    /**
     * Initializes the cutting plane mesh used in CSG operations.
     */
    initCuttingPlaneMesh() {
        const planeGeometry = new THREE.BoxGeometry(1000, 0.01, 1000);
        const planeMesh = new THREE.Mesh(planeGeometry, new THREE.MeshBasicMaterial());
        this.cuttingPlaneMesh = planeMesh;
    }
    // Utils
    /**
     * Draws a vector as an arrow in the simulator for visualization.
     *
     * @param {THREE.Vector3} vector - The vector to be visualized as an arrow.
     * @param {string} name - The name identifier for the arrow helper.
     * @param {THREE.ColorRepresentation} color - The color of the arrow.
     */
    drawVectorAsArrow(vector, name, color) {
        this.simulator.scene.remove(this.arrowHelper[name]);
        const origin = this.submarineState.getCurrentPosition();
        const length = vector.length();
        this.arrowHelper[name] = new THREE.ArrowHelper(vector, origin, length, color);
        this.simulator.scene.add(this.arrowHelper[name]);
    }
    /**
     * Calculates the area of a polygon defined by vertices using the shoelace formula.
     *
     * @param {THREE.BufferAttribute | THREE.InterleavedBufferAttribute} vertices - The vertices of the polygon.
     * @returns {number} The area of the polygon.
     */
    calculatePolygonArea(vertices) {
        let area = 0;
        const vector1 = new THREE.Vector3();
        const vector2 = new THREE.Vector3();
        for (let i = 0; i < vertices.count; i++) {
            vector1.fromBufferAttribute(vertices, i);
            vector1.fromBufferAttribute(vertices, (i + 1) % vertices.count);
            area += vector1.x * vector2.z - vector1.z * vector2.x;
        }
        return Math.abs(area) / 2;
    }
    /**
   * Retrieves the volume of a geometry using the signed volume of triangles method.
   *
   * @param {THREE.BufferGeometry} geometry - The geometry whose volume is to be calculated.
   * @returns {number} The volume of the geometry.
   */
    getVolume(geometry) {
        var isIndexed = geometry.index !== null;
        let position = geometry.attributes.position;
        let sum = 0;
        let p1 = new THREE.Vector3(), p2 = new THREE.Vector3(), p3 = new THREE.Vector3();
        if (!isIndexed) {
            let faces = position.count / 3;
            for (let i = 0; i < faces; i++) {
                p1.fromBufferAttribute(position, i * 3 + 0);
                p2.fromBufferAttribute(position, i * 3 + 1);
                p3.fromBufferAttribute(position, i * 3 + 2);
                sum += this.signedVolumeOfTriangle(p1, p2, p3);
            }
        }
        else {
            let index = geometry.index;
            let faces = index.count / 3;
            for (let i = 0; i < faces; i++) {
                p1.fromBufferAttribute(position, index.array[i * 3 + 0]);
                p2.fromBufferAttribute(position, index.array[i * 3 + 1]);
                p3.fromBufferAttribute(position, index.array[i * 3 + 2]);
                sum += this.signedVolumeOfTriangle(p1, p2, p3);
            }
        }
        return sum;
    }
    /**
     * Retrieves the volume of an ellipsoid geometry using the formula for an ellipsoid volume.
     * @param {number} p1 - The semi-major axis of the ellipsoid.
     * @param {number} p2 - The semi-minor axis of the ellipsoid.
     * @param {number} p3 - The semi-minor axis of the ellipsoid.
     * @returns {number} The volume of the ellipsoid.
     */
    signedVolumeOfTriangle(p1, p2, p3) {
        return p1.dot(p2.cross(p3)) / 6.0;
    }
}
export default Phyiscs;
