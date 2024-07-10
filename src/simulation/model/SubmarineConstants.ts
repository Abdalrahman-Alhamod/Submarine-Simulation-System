import * as THREE from 'three';

/**
 * Represents the constant parameters of the submarine.
 * @class
 */
class SubmarineConstants {
    /**
     * The empty mass of the submarine (no water) in kilograms.
     * @private
     */
    private emptyMass: number;

    /**
     * The maximum mass of the submarine (filled with water) in kilograms.
     * @private
     */
    private maxMass: number;

    /**
     * The length of the submarine in meters.
     * @private
     */
    private length: number;

    /**
     * The width of the submarine in meters.
     * @private
     */
    private width: number;

    /**
     * The radius of the submarine in meters (half of the width).
     * @private
     */
    private radius: number;

    /**
     * The volume of the submarine in cubic meters.
     * @private
     */
    private volume: number;

    /**
     * The diameter of the rotor in meters.
     * @private
     */
    private rotorDiameter: number;

    /**
     * The maximum rotor rounds per second (RPS).
     * @private
     */
    private maxRotorRPS: number;

    /**
     * The area of the stern plane in square meters.
     * @private
     */
    private sternPlaneArea: number;

    /**
     * The area of the rudder plane in square meters.
     * @private
     */
    private rudderPlaneArea: number;

    /**
     * The area of the fairwater plane in square meters.
     * @private
     */
    private fairwaterPlaneArea: number;

    /**
     * The drag coefficient of the submarine.
     * @private
     */
    private dragCoefficient: number;

    /**
     * The thrust coefficient of the submarine.
     * @private
     */
    private thrustCoefficient: number;

    /**
     * The stern coefficient of the submarine.
     * @private
     */
    private sternCoefficient: number;

    /**
     * The rudder coefficient of the submarine.
     * @private
     */
    private rudderCoefficient: number;

    /**
     * The fairwater coefficient of the submarine.
     * @private
     */
    private fairwaterCoefficient: number;


    /**
     * The center of buoyancy of the submarine.
     * @private
     */
    private centerOfBuoyancy: THREE.Vector3;

    /**
     * The surface area of the submarine in square meters.
     * @private
     */
    private surfaceArea: number;

    /**
     * The ballast tank capacity of the submarine in cubic meters.
     * @private
     */
    private ballastTankCapacity: number;

    /**
     * Creates an instance of SubmarineConstants.
     * @param {number} emptyMass - The empty mass of the submarine.
     * @param {number} maxMass - The maximum mass of the submarine.
     * @param {number} length - The length of the submarine.
     * @param {number} width - The width of the submarine.
     * @param {number} volume - The volume of the submarine.
     * @param {number} rotorDiameter - The diameter of the rotor.
     * @param {number} maxRotorRPS - The maximum rotor rounds per second.
     * @param {number} sternPlaneArea - The area of the stern plane.
     * @param {number} rudderPlaneArea - The area of the rudder plane.
     * @param {number} fairwaterPlaneArea - The area of the fairwater plane.
     * @param {number} dragCoefficient - The drag coefficient of the submarine.
     * @param {number} thrustCoefficient - The thrust coefficient of the submarine.
     * @param {number} sternCoefficient - The stern coefficient of the submarine.
     * @param {number} rudderCoefficient - The rudder coefficient of the submarine.
     * @param {number} fairwaterCoefficient - The fairwater coefficient of the submarine.
     * @param {THREE.Vector3} centerOfBuoyancy - The center of buoyancy of the submarine.
     * @param {number} surfaceArea - The surface area of the submarine.
     * @param {number} ballastTankCapacity - The ballast tank capacity of the submarine.
     */
    constructor(
        emptyMass: number,
        maxMass: number,
        length: number,
        width: number,
        volume: number,
        rotorDiameter: number,
        maxRotorRPS: number,
        sternPlaneArea: number,
        rudderPlaneArea: number,
        fairwaterPlaneArea: number,
        dragCoefficient: number,
        thrustCoefficient: number,
        sternCoefficient: number,
        rudderCoefficient: number,
        fairwaterCoefficient: number,
        centerOfBuoyancy: THREE.Vector3,
        surfaceArea: number,
        ballastTankCapacity: number
    ) {
        this.emptyMass = emptyMass;
        this.maxMass = maxMass;
        this.length = length;
        this.width = width;
        this.radius = width / 2;
        this.volume = volume;
        this.rotorDiameter = rotorDiameter;
        this.maxRotorRPS = maxRotorRPS;
        this.sternPlaneArea = sternPlaneArea;
        this.rudderPlaneArea = rudderPlaneArea;
        this.fairwaterPlaneArea = fairwaterPlaneArea;
        this.dragCoefficient = dragCoefficient;
        this.thrustCoefficient = thrustCoefficient;
        this.sternCoefficient = sternCoefficient;
        this.rudderCoefficient = rudderCoefficient;
        this.fairwaterCoefficient = fairwaterCoefficient;
        this.centerOfBuoyancy = centerOfBuoyancy;
        this.surfaceArea = surfaceArea;
        this.ballastTankCapacity = ballastTankCapacity;
    }

    /**
     * Gets the empty mass of the submarine.
     * @returns {number} The empty mass.
     */
    getEmptyMass(): number {
        return this.emptyMass;
    }

    /**
     * Sets the empty mass of the submarine.
     * @param {number} emptyMass - The new empty mass.
     */
    setEmptyMass(emptyMass: number): void {
        this.emptyMass = emptyMass;
    }

    /**
     * Gets the maximum mass of the submarine.
     * @returns {number} The maximum mass.
     */
    getMaxMass(): number {
        return this.maxMass;
    }

    /**
     * Sets the maximum mass of the submarine.
     * @param {number} maxMass - The new maximum mass.
     */
    setMaxMass(maxMass: number): void {
        this.maxMass = maxMass;
    }

    /**
     * Gets the length of the submarine.
     * @returns {number} The length.
     */
    getLength(): number {
        return this.length;
    }

    /**
     * Sets the length of the submarine.
     * @param {number} length - The new length.
     */
    setLength(length: number): void {
        this.length = length;
    }

    /**
     * Gets the width of the submarine.
     * @returns {number} The width.
     */
    getWidth(): number {
        return this.width;
    }

    /**
     * Sets the width of the submarine.
     * @param {number} width - The new width.
     */
    setWidth(width: number): void {
        this.width = width;
        this.radius = width / 2;
    }

    /**
     * Gets the radius of the submarine.
     * @returns {number} The radius.
     */
    getRadius(): number {
        return this.radius;
    }

    /**
     * Sets the radius of the submarine.
     * @param {number} radius - The new radius.
     */
    setRadius(radius: number): void {
        this.radius = radius;
        this.width = radius * 2;
    }

    /**
     * Gets the volume of the submarine.
     * @returns {number} The volume.
     */
    getVolume(): number {
        return this.volume;
    }

    /**
     * Sets the volume of the submarine.
     * @param {number} volume - The new volume.
     */
    setVolume(volume: number): void {
        this.volume = volume;
    }

    /**
     * Gets the diameter of the rotor.
     * @returns {number} The rotor diameter.
     */
    getRotorDiameter(): number {
        return this.rotorDiameter;
    }

    /**
     * Sets the diameter of the rotor.
     * @param {number} rotorDiameter - The new rotor diameter.
     */
    setRotorDiameter(rotorDiameter: number): void {
        this.rotorDiameter = rotorDiameter;
    }

    /**
     * Gets the maximum rotor rounds per second (RPS).
     * @returns {number} The maximum rotor RPS.
     */
    getMaxRotorRPS(): number {
        return this.maxRotorRPS;
    }

    /**
     * Sets the maximum rotor rounds per second (RPS).
     * @param {number} maxRotorRPS - The new maximum rotor RPS.
     */
    setMaxRotorRPS(maxRotorRPS: number): void {
        this.maxRotorRPS = maxRotorRPS;
    }

    /**
     * Gets the area of the stern plane.
     * @returns {number} The stern plane area.
     */
    getSternPlaneArea(): number {
        return this.sternPlaneArea;
    }

    /**
     * Sets the area of the stern plane.
     * @param {number} sternPlaneArea - The new stern plane area.
     */
    setSternPlaneArea(sternPlaneArea: number): void {
        this.sternPlaneArea = sternPlaneArea;
    }

    /**
     * Gets the area of the rudder plane.
     * @returns {number} The rudder plane area.
     */
    getRudderPlaneArea(): number {
        return this.rudderPlaneArea;
    }

    /**
     * Sets the area of the rudder plane.
     * @param {number} rudderPlaneArea - The new rudder plane area.
     */
    setRudderPlaneArea(rudderPlaneArea: number): void {
        this.rudderPlaneArea = rudderPlaneArea;
    }

    /**
     * Gets the area of the fairwater plane.
     * @returns {number} The fairwater plane area.
     */
    getFairwaterPlaneArea(): number {
        return this.fairwaterPlaneArea;
    }

    /**
     * Sets the area of the fairwater plane.
     * @param {number} fairwaterPlaneArea - The new fairwater plane area.
     */
    setFairwaterPlaneArea(fairwaterPlaneArea: number): void {
        this.fairwaterPlaneArea = fairwaterPlaneArea;
    }

    /**
     * Gets the drag coefficient of the submarine.
     * @returns {number} The drag coefficient.
     */
    getDragCoefficient(): number {
        return this.dragCoefficient;
    }

    /**
     * Sets the drag coefficient of the submarine.
     * @param {number} dragCoefficient - The new drag coefficient.
     */
    setDragCoefficient(dragCoefficient: number): void {
        this.dragCoefficient = dragCoefficient;
    }

    /**
     * Gets the thrust coefficient of the submarine.
     * @returns {number} The thrust coefficient.
     */
    getThrustCoefficient(): number {
        return this.thrustCoefficient;
    }

    /**
     * Sets the thrust coefficient of the submarine.
     * @param {number} thrustCoefficient - The new thrust coefficient.
     */
    setThrustCoefficient(thrustCoefficient: number): void {
        this.thrustCoefficient = thrustCoefficient;
    }

    /**
     * Gets the stern coefficient of the submarine.
     * @returns {number} The stern coefficient.
     */
    getSternCoefficient(): number {
        return this.sternCoefficient;
    }

    /**
     * Sets the stern coefficient of the submarine.
     * @param {number} sternCoefficient - The new stern coefficient.
     */
    setSternCoefficient(sternCoefficient: number): void {
        this.sternCoefficient = sternCoefficient;
    }

    /**
     * Gets the rudder coefficient of the submarine.
     * @returns {number} The rudder coefficient.
     */
    getRudderCoefficient(): number {
        return this.rudderCoefficient;
    }

    /**
     * Sets the rudder coefficient of the submarine.
     * @param {number} rudderCoefficient - The new rudder coefficient.
     */
    setRudderCoefficient(rudderCoefficient: number): void {
        this.rudderCoefficient = rudderCoefficient;
    }

    /**
     * Gets the fairwater coefficient of the submarine.
     * @returns {number} The fairwater coefficient.
     */
    getFairwaterCoefficient(): number {
        return this.fairwaterCoefficient;
    }

    /**
     * Sets the fairwater coefficient of the submarine.
     * @param {number} fairwaterCoefficient - The new fairwater coefficient.
     */
    setFairwaterCoefficient(fairwaterCoefficient: number): void {
        this.fairwaterCoefficient = fairwaterCoefficient;
    }

    /**
     * Gets the center of buoyancy of the submarine.
     * @returns {THREE.Vector3} The center of buoyancy.
     */
    getCenterOfBuoyancy(): THREE.Vector3 {
        return this.centerOfBuoyancy;
    }

    /**
     * Sets the center of buoyancy of the submarine.
     * @param {THREE.Vector3} centerOfBuoyancy - The new center of buoyancy.
     */
    setCenterOfBuoyancy(centerOfBuoyancy: THREE.Vector3): void {
        this.centerOfBuoyancy = centerOfBuoyancy;
    }

    /**
     * Gets the surface area of the submarine.
     * @returns {number} The surface area.
     */
    getSurfaceArea(): number {
        return this.surfaceArea;
    }

    /**
     * Sets the surface area of the submarine.
     * @param {number} surfaceArea - The new surface area.
     */
    setSurfaceArea(surfaceArea: number): void {
        this.surfaceArea = surfaceArea;
    }

    /**
     * Gets the ballast tank capacity of the submarine.
     * @returns {number} The ballast tank capacity.
     */
    getBallastTankCapacity(): number {
        return this.ballastTankCapacity;
    }

    /**
     * Sets the ballast tank capacity of the submarine.
     * @param {number} ballastTankCapacity - The new ballast tank capacity.
     */
    setBallastTankCapacity(ballastTankCapacity: number): void {
        this.ballastTankCapacity = ballastTankCapacity;
    }
}

export default SubmarineConstants;