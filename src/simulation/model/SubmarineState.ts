import * as THREE from 'three';

/**
 * Represents the variable state of the submarine during simulation.
 * @class
 */
class SubmarineState {
    /**
     * The current total water mass inside the submarine in cubic meters (m³).
     * This includes the combined water mass from both front and back ballast tanks.
     * @private
     */
    private currentTotalWaterMass: number;

    /**
     * The current water mass in the front ballast tank in cubic meters (m³).
     * @private
     */
    private currentWaterMassFrontTank: number;

    /**
     * The current water mass in the back ballast tank in cubic meters (m³).
     * @private
     */
    private currentWaterMassBackTank: number;

    /**
     * The current rounds per second (RPS) of the rotor.
     * @private
     */
    private currentRotorRPS: number;

    /**
     * The volume of the submarine submerged underwater in cubic meters (m³).
     * @private
     */
    private submergedVolume: number;

    /**
     * The current depth of the submarine in meters (m).
     * @private
     */
    private currentDepth: number;

    /**
     * The current speed of the submarine in meters per second (m/s) as a Vector3.
     * @private
     */
    private currentSpeed: THREE.Vector3;

    /**
     * The current acceleration of the submarine in meters per second squared (m/s²) as a Vector3.
     * @private
     */
    private currentAcceleration: THREE.Vector3;

    /**
     * The current position of the submarine in 3D space as a Vector3.
     * @private
     */
    private currentPosition: THREE.Vector3;

    /**
     * The current orientation of the submarine (pitch, yaw, roll) in radians as a Vector3.
     * @private
     */
    private currentOrientation: THREE.Vector3;

    /**
     * The current angular velocity of the submarine in radians per second (rad/s) as a Vector3.
     * @private
     */
    private angularVelocity: THREE.Vector3;

    /**
     * The current angular acceleration of the submarine in radians per second squared (rad/s²) as a Vector3.
     * @private
     */
    private angularAcceleration: THREE.Vector3;

    /**
     * The weight of the submarine in newtons (N).
     * @private
     */
    private weight: number;

    /**
     * The buoyancy force acting on the submarine in newtons (N).
     * @private
     */
    private buoyancy: number;

    /**
     * The drag force acting on the submarine in newtons (N).
     * @private
     */
    private drag: number;

    /**
     * The thrust force produced by the submarine in newtons (N).
     * @private
     */
    private thrust: number;

    /**
     * The angle of the stern plane in radians (rad).
     * @private
     */
    private sternAngle: number;

    /**
     * The angle of the rudder plane in radians (rad).
     * @private
     */
    private rudderAngle: number;

    /**
     * The angle of the fairwater plane in radians (rad).
     * @private
     */
    private fairwaterAngle: number;

    /**
     * Creates an instance of SubmarineState.
     * @param {number} currentTotalWaterMass - The initial current total water mass inside the submarine.
     * @param {number} currentWaterMassFrontTank - The initial current water mass in the front tank.
     * @param {number} currentWaterMassBackTank - The initial current water mass in the back tank.
     * @param {number} currentRotorRPS - The initial current rotor rounds per second (RPS).
     * @param {number} submergedVolume - The initial submerged volume of the submarine.
     * @param {number} currentDepth - The initial current depth of the submarine.
     * @param {THREE.Vector3} currentSpeed - The initial current speed of the submarine.
     * @param {THREE.Vector3} currentAcceleration - The initial current acceleration of the submarine.
     * @param {THREE.Vector3} currentPosition - The initial current position of the submarine.
     * @param {THREE.Vector3} currentOrientation - The initial current orientation of the submarine.
     * @param {THREE.Vector3} angularVelocity - The initial angular velocity of the submarine.
     * @param {THREE.Vector3} angularAcceleration - The initial angular acceleration of the submarine.
     * @param {number} weight - The initial weight of the submarine.
     * @param {number} buoyancy - The initial buoyancy force acting on the submarine.
     * @param {number} drag - The initial drag force acting on the submarine.
     * @param {number} thrust - The initial thrust force produced by the submarine.
     * @param {number} sternAngle - The initial angle of the stern plane.
     * @param {number} rudderAngle - The initial angle of the rudder plane.
     * @param {number} fairwaterAngle - The initial angle of the fairwater plane.
     */
    constructor(
        currentTotalWaterMass: number,
        currentWaterMassFrontTank: number,
        currentWaterMassBackTank: number,
        currentRotorRPS: number,
        submergedVolume: number,
        currentDepth: number,
        currentSpeed: THREE.Vector3,
        currentAcceleration: THREE.Vector3,
        currentPosition: THREE.Vector3,
        currentOrientation: THREE.Vector3,
        angularVelocity: THREE.Vector3,
        angularAcceleration: THREE.Vector3,
        weight: number,
        buoyancy: number,
        drag: number,
        thrust: number,
        sternAngle: number,
        rudderAngle: number,
        fairwaterAngle: number
    ) {
        this.currentTotalWaterMass = currentTotalWaterMass;
        this.currentWaterMassFrontTank = currentWaterMassFrontTank;
        this.currentWaterMassBackTank = currentWaterMassBackTank;
        this.currentRotorRPS = currentRotorRPS;
        this.submergedVolume = submergedVolume;
        this.currentDepth = currentDepth;
        this.currentSpeed = currentSpeed;
        this.currentAcceleration = currentAcceleration;
        this.currentPosition = currentPosition;
        this.currentOrientation = currentOrientation;
        this.angularVelocity = angularVelocity;
        this.angularAcceleration = angularAcceleration;
        this.weight = weight;
        this.buoyancy = buoyancy;
        this.drag = drag;
        this.thrust = thrust;
        this.sternAngle = sternAngle;
        this.rudderAngle = rudderAngle;
        this.fairwaterAngle = fairwaterAngle;
    }

    /**
     * Gets the current total water mass inside the submarine.
     * @returns {number} The current total water mass inside the submarine in cubic meters (m³).
     */
    getCurrentTotalWaterMass(): number {
        return this.currentTotalWaterMass;
    }

    /**
     * Sets the current total water mass inside the submarine.
     * @param {number} currentTotalWaterMass - The new current total water mass inside the submarine.
     */
    setCurrentTotalWaterMass(currentTotalWaterMass: number): void {
        this.currentTotalWaterMass = currentTotalWaterMass;
    }

    /**
     * Gets the current water mass in the front ballast tank.
     * @returns {number} The current water mass in the front ballast tank in cubic meters (m³).
     */
    getCurrentWaterMassFrontTank(): number {
        return this.currentWaterMassFrontTank;
    }

    /**
     * Sets the current water mass in the front ballast tank.
     * @param {number} currentWaterMassFrontTank - The new current water mass in the front ballast tank.
     */
    setCurrentWaterMassFrontTank(currentWaterMassFrontTank: number): void {
        this.currentWaterMassFrontTank = currentWaterMassFrontTank;
    }

    /**
     * Gets the current water mass in the back ballast tank.
     * @returns {number} The current water mass in the back ballast tank in cubic meters (m³).
     */
    getCurrentWaterMassBackTank(): number {
        return this.currentWaterMassBackTank;
    }

    /**
     * Sets the current water mass in the back ballast tank.
     * @param {number} currentWaterMassBackTank - The new current water mass in the back ballast tank.
     */
    setCurrentWaterMassBackTank(currentWaterMassBackTank: number): void {
        this.currentWaterMassBackTank = currentWaterMassBackTank;
    }

    /**
     * Gets the current rounds per second (RPS) of the rotor.
     * @returns {number} The current rotor rounds per second (RPS).
     */
    getCurrentRotorRPS(): number {
        return this.currentRotorRPS;
    }

    /**
     * Sets the current rounds per second (RPS) of the rotor.
     * @param {number} currentRotorRPS - The new current rotor rounds per second (RPS).
     */
    setCurrentRotorRPS(currentRotorRPS: number): void {
        this.currentRotorRPS = currentRotorRPS;
    }

    /**
     * Gets the submerged volume of the submarine.
     * @returns {number} The submerged volume of the submarine in cubic meters (m³).
     */
    getSubmergedVolume(): number {
        return this.submergedVolume;
    }

    /**
     * Sets the submerged volume of the submarine.
     * @param {number} submergedVolume - The new submerged volume of the submarine.
     */
    setSubmergedVolume(submergedVolume: number): void {
        this.submergedVolume = submergedVolume;
    }

    /**
     * Gets the current depth of the submarine.
     * @returns {number} The current depth of the submarine in meters (m).
     */
    getCurrentDepth(): number {
        return this.currentDepth;
    }

    /**
     * Sets the current depth of the submarine.
     * @param {number} currentDepth - The new current depth of the submarine.
     */
    setCurrentDepth(currentDepth: number): void {
        this.currentDepth = currentDepth;
    }

    /**
     * Gets the current speed of the submarine.
     * @returns {THREE.Vector3} The current speed of the submarine as a Vector3.
     */
    getCurrentSpeed(): THREE.Vector3 {
        return this.currentSpeed.clone();
    }

    /**
     * Sets the current speed of the submarine.
     * @param {THREE.Vector3} currentSpeed - The new current speed of the submarine as a Vector3.
     */
    setCurrentSpeed(currentSpeed: THREE.Vector3): void {
        this.currentSpeed.copy(currentSpeed);
    }

    /**
     * Gets the current acceleration of the submarine.
     * @returns {THREE.Vector3} The current acceleration of the submarine as a Vector3.
     */
    getCurrentAcceleration(): THREE.Vector3 {
        return this.currentAcceleration.clone();
    }

    /**
     * Sets the current acceleration of the submarine.
     * @param {THREE.Vector3} currentAcceleration - The new current acceleration of the submarine as a Vector3.
     */
    setCurrentAcceleration(currentAcceleration: THREE.Vector3): void {
        this.currentAcceleration.copy(currentAcceleration);
    }

    /**
     * Gets the current position of the submarine.
     * @returns {THREE.Vector3} The current position of the submarine in 3D space as a Vector3.
     */
    getCurrentPosition(): THREE.Vector3 {
        return this.currentPosition.clone();
    }

    /**
     * Sets the current position of the submarine.
     * @param {THREE.Vector3} currentPosition - The new current position of the submarine in 3D space as a Vector3.
     */
    setCurrentPosition(currentPosition: THREE.Vector3): void {
        this.currentPosition.copy(currentPosition);
    }

    /**
     * Gets the current orientation of the submarine.
     * @returns {THREE.Vector3} The current orientation of the submarine (pitch, yaw, roll) in radians as a Vector3.
     */
    getCurrentOrientation(): THREE.Vector3 {
        return this.currentOrientation.clone();
    }

    /**
     * Sets the current orientation of the submarine.
     * @param {THREE.Vector3} currentOrientation - The new current orientation of the submarine (pitch, yaw, roll) in radians as a Vector3.
     */
    setCurrentOrientation(currentOrientation: THREE.Vector3): void {
        this.currentOrientation.copy(currentOrientation);
    }

    /**
     * Gets the current angular velocity of the submarine.
     * @returns {THREE.Vector3} The current angular velocity of the submarine in radians per second (rad/s) as a Vector3.
     */
    getAngularVelocity(): THREE.Vector3 {
        return this.angularVelocity.clone();
    }

    /**
     * Sets the current angular velocity of the submarine.
     * @param {THREE.Vector3} angularVelocity - The new current angular velocity of the submarine in radians per second (rad/s) as a Vector3.
     */
    setAngularVelocity(angularVelocity: THREE.Vector3): void {
        this.angularVelocity.copy(angularVelocity);
    }

    /**
     * Gets the current angular acceleration of the submarine.
     * @returns {THREE.Vector3} The current angular acceleration of the submarine in radians per second squared (rad/s²) as a Vector3.
     */
    getAngularAcceleration(): THREE.Vector3 {
        return this.angularAcceleration.clone();
    }

    /**
     * Sets the current angular acceleration of the submarine.
     * @param {THREE.Vector3} angularAcceleration - The new current angular acceleration of the submarine in radians per second squared (rad/s²) as a Vector3.
     */
    setAngularAcceleration(angularAcceleration: THREE.Vector3): void {
        this.angularAcceleration.copy(angularAcceleration);
    }

    /**
     * Gets the weight of the submarine.
     * @returns {number} The weight of the submarine in newtons (N).
     */
    getWeight(): number {
        return this.weight;
    }

    /**
     * Sets the weight of the submarine.
     * @param {number} weight - The new weight of the submarine in newtons (N).
     */
    setWeight(weight: number): void {
        this.weight = weight;
    }

    /**
     * Gets the buoyancy force acting on the submarine.
     * @returns {number} The buoyancy force acting on the submarine in newtons (N).
     */
    getBuoyancy(): number {
        return this.buoyancy;
    }

    /**
     * Sets the buoyancy force acting on the submarine.
     * @param {number} buoyancy - The new buoyancy force acting on the submarine in newtons (N).
     */
    setBuoyancy(buoyancy: number): void {
        this.buoyancy = buoyancy;
    }

    /**
     * Gets the drag force acting on the submarine.
     * @returns {number} The drag force acting on the submarine in newtons (N).
     */
    getDrag(): number {
        return this.drag;
    }

    /**
     * Sets the drag force acting on the submarine.
     * @param {number} drag - The new drag force acting on the submarine in newtons (N).
     */
    setDrag(drag: number): void {
        this.drag = drag;
    }

    /**
     * Gets the thrust force produced by the submarine.
     * @returns {number} The thrust force produced by the submarine in newtons (N).
     */
    getThrust(): number {
        return this.thrust;
    }

    /**
     * Sets the thrust force produced by the submarine.
     * @param {number} thrust - The new thrust force produced by the submarine in newtons (N).
     */
    setThrust(thrust: number): void {
        this.thrust = thrust;
    }

    /**
     * Gets the angle of the stern plane.
     * @returns {number} The angle of the stern plane in radians (rad).
     */
    getSternAngle(): number {
        return this.sternAngle;
    }

    /**
     * Sets the angle of the stern plane.
     * @param {number} sternAngle - The new angle of the stern plane in radians (rad).
     */
    setSternAngle(sternAngle: number): void {
        this.sternAngle = sternAngle;
    }

    /**
     * Gets the angle of the rudder plane.
     * @returns {number} The angle of the rudder plane in radians (rad).
     */
    getRudderAngle(): number {
        return this.rudderAngle;
    }

    /**
     * Sets the angle of the rudder plane.
     * @param {number} rudderAngle - The new angle of the rudder plane in radians (rad).
     */
    setRudderAngle(rudderAngle: number): void {
        this.rudderAngle = rudderAngle;
    }

    /**
     * Gets the angle of the fairwater plane.
     * @returns {number} The angle of the fairwater plane in radians (rad).
     */
    getFairwaterAngle(): number {
        return this.fairwaterAngle;
    }

    /**
     * Sets the angle of the fairwater plane.
     * @param {number} fairwaterAngle - The new angle of the fairwater plane in radians (rad).
     */
    setFairwaterAngle(fairwaterAngle: number): void {
        this.fairwaterAngle = fairwaterAngle;
    }
}

export default SubmarineState;
