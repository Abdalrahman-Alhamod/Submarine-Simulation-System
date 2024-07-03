"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents the constant parameters of the submarine.
 * @class
 */
class SubmarineConstants {
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
     * @param {THREE.Vector3} centerOfMass - The center of mass of the submarine.
     * @param {THREE.Vector3} centerOfBuoyancy - The center of buoyancy of the submarine.
     * @param {number} momentOfInertia - The moment of inertia of the submarine.
     * @param {number} surfaceArea - The surface area of the submarine.
     * @param {number} ballastTankCapacity - The ballast tank capacity of the submarine.
     */
    constructor(emptyMass, maxMass, length, width, volume, rotorDiameter, maxRotorRPS, sternPlaneArea, rudderPlaneArea, fairwaterPlaneArea, dragCoefficient, thrustCoefficient, sternCoefficient, rudderCoefficient, fairwaterCoefficient, centerOfMass, centerOfBuoyancy, momentOfInertia, surfaceArea, ballastTankCapacity) {
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
        this.centerOfMass = centerOfMass;
        this.centerOfBuoyancy = centerOfBuoyancy;
        this.momentOfInertia = momentOfInertia;
        this.surfaceArea = surfaceArea;
        this.ballastTankCapacity = ballastTankCapacity;
    }
    /**
     * Gets the empty mass of the submarine.
     * @returns {number} The empty mass.
     */
    getEmptyMass() {
        return this.emptyMass;
    }
    /**
     * Sets the empty mass of the submarine.
     * @param {number} emptyMass - The new empty mass.
     */
    setEmptyMass(emptyMass) {
        this.emptyMass = emptyMass;
    }
    /**
     * Gets the maximum mass of the submarine.
     * @returns {number} The maximum mass.
     */
    getMaxMass() {
        return this.maxMass;
    }
    /**
     * Sets the maximum mass of the submarine.
     * @param {number} maxMass - The new maximum mass.
     */
    setMaxMass(maxMass) {
        this.maxMass = maxMass;
    }
    /**
     * Gets the length of the submarine.
     * @returns {number} The length.
     */
    getLength() {
        return this.length;
    }
    /**
     * Sets the length of the submarine.
     * @param {number} length - The new length.
     */
    setLength(length) {
        this.length = length;
    }
    /**
     * Gets the width of the submarine.
     * @returns {number} The width.
     */
    getWidth() {
        return this.width;
    }
    /**
     * Sets the width of the submarine.
     * @param {number} width - The new width.
     */
    setWidth(width) {
        this.width = width;
        this.radius = width / 2;
    }
    /**
     * Gets the radius of the submarine.
     * @returns {number} The radius.
     */
    getRadius() {
        return this.radius;
    }
    /**
     * Sets the radius of the submarine.
     * @param {number} radius - The new radius.
     */
    setRadius(radius) {
        this.radius = radius;
        this.width = radius * 2;
    }
    /**
     * Gets the volume of the submarine.
     * @returns {number} The volume.
     */
    getVolume() {
        return this.volume;
    }
    /**
     * Sets the volume of the submarine.
     * @param {number} volume - The new volume.
     */
    setVolume(volume) {
        this.volume = volume;
    }
    /**
     * Gets the diameter of the rotor.
     * @returns {number} The rotor diameter.
     */
    getRotorDiameter() {
        return this.rotorDiameter;
    }
    /**
     * Sets the diameter of the rotor.
     * @param {number} rotorDiameter - The new rotor diameter.
     */
    setRotorDiameter(rotorDiameter) {
        this.rotorDiameter = rotorDiameter;
    }
    /**
     * Gets the maximum rotor rounds per second (RPS).
     * @returns {number} The maximum rotor RPS.
     */
    getMaxRotorRPS() {
        return this.maxRotorRPS;
    }
    /**
     * Sets the maximum rotor rounds per second (RPS).
     * @param {number} maxRotorRPS - The new maximum rotor RPS.
     */
    setMaxRotorRPS(maxRotorRPS) {
        this.maxRotorRPS = maxRotorRPS;
    }
    /**
     * Gets the area of the stern plane.
     * @returns {number} The stern plane area.
     */
    getSternPlaneArea() {
        return this.sternPlaneArea;
    }
    /**
     * Sets the area of the stern plane.
     * @param {number} sternPlaneArea - The new stern plane area.
     */
    setSternPlaneArea(sternPlaneArea) {
        this.sternPlaneArea = sternPlaneArea;
    }
    /**
     * Gets the area of the rudder plane.
     * @returns {number} The rudder plane area.
     */
    getRudderPlaneArea() {
        return this.rudderPlaneArea;
    }
    /**
     * Sets the area of the rudder plane.
     * @param {number} rudderPlaneArea - The new rudder plane area.
     */
    setRudderPlaneArea(rudderPlaneArea) {
        this.rudderPlaneArea = rudderPlaneArea;
    }
    /**
     * Gets the area of the fairwater plane.
     * @returns {number} The fairwater plane area.
     */
    getFairwaterPlaneArea() {
        return this.fairwaterPlaneArea;
    }
    /**
     * Sets the area of the fairwater plane.
     * @param {number} fairwaterPlaneArea - The new fairwater plane area.
     */
    setFairwaterPlaneArea(fairwaterPlaneArea) {
        this.fairwaterPlaneArea = fairwaterPlaneArea;
    }
    /**
     * Gets the drag coefficient of the submarine.
     * @returns {number} The drag coefficient.
     */
    getDragCoefficient() {
        return this.dragCoefficient;
    }
    /**
     * Sets the drag coefficient of the submarine.
     * @param {number} dragCoefficient - The new drag coefficient.
     */
    setDragCoefficient(dragCoefficient) {
        this.dragCoefficient = dragCoefficient;
    }
    /**
     * Gets the thrust coefficient of the submarine.
     * @returns {number} The thrust coefficient.
     */
    getThrustCoefficient() {
        return this.thrustCoefficient;
    }
    /**
     * Sets the thrust coefficient of the submarine.
     * @param {number} thrustCoefficient - The new thrust coefficient.
     */
    setThrustCoefficient(thrustCoefficient) {
        this.thrustCoefficient = thrustCoefficient;
    }
    /**
     * Gets the stern coefficient of the submarine.
     * @returns {number} The stern coefficient.
     */
    getSternCoefficient() {
        return this.sternCoefficient;
    }
    /**
     * Sets the stern coefficient of the submarine.
     * @param {number} sternCoefficient - The new stern coefficient.
     */
    setSternCoefficient(sternCoefficient) {
        this.sternCoefficient = sternCoefficient;
    }
    /**
     * Gets the rudder coefficient of the submarine.
     * @returns {number} The rudder coefficient.
     */
    getRudderCoefficient() {
        return this.rudderCoefficient;
    }
    /**
     * Sets the rudder coefficient of the submarine.
     * @param {number} rudderCoefficient - The new rudder coefficient.
     */
    setRudderCoefficient(rudderCoefficient) {
        this.rudderCoefficient = rudderCoefficient;
    }
    /**
     * Gets the fairwater coefficient of the submarine.
     * @returns {number} The fairwater coefficient.
     */
    getFairwaterCoefficient() {
        return this.fairwaterCoefficient;
    }
    /**
     * Sets the fairwater coefficient of the submarine.
     * @param {number} fairwaterCoefficient - The new fairwater coefficient.
     */
    setFairwaterCoefficient(fairwaterCoefficient) {
        this.fairwaterCoefficient = fairwaterCoefficient;
    }
    /**
     * Gets the center of mass of the submarine.
     * @returns {THREE.Vector3} The center of mass.
     */
    getCenterOfMass() {
        return this.centerOfMass;
    }
    /**
     * Sets the center of mass of the submarine.
     * @param {THREE.Vector3} centerOfMass - The new center of mass.
     */
    setCenterOfMass(centerOfMass) {
        this.centerOfMass = centerOfMass;
    }
    /**
     * Gets the center of buoyancy of the submarine.
     * @returns {THREE.Vector3} The center of buoyancy.
     */
    getCenterOfBuoyancy() {
        return this.centerOfBuoyancy;
    }
    /**
     * Sets the center of buoyancy of the submarine.
     * @param {THREE.Vector3} centerOfBuoyancy - The new center of buoyancy.
     */
    setCenterOfBuoyancy(centerOfBuoyancy) {
        this.centerOfBuoyancy = centerOfBuoyancy;
    }
    /**
     * Gets the moment of inertia of the submarine.
     * @returns {number} The moment of inertia.
     */
    getMomentOfInertia() {
        return this.momentOfInertia;
    }
    /**
     * Sets the moment of inertia of the submarine.
     * @param {number} momentOfInertia - The new moment of inertia.
     */
    setMomentOfInertia(momentOfInertia) {
        this.momentOfInertia = momentOfInertia;
    }
    /**
     * Gets the surface area of the submarine.
     * @returns {number} The surface area.
     */
    getSurfaceArea() {
        return this.surfaceArea;
    }
    /**
     * Sets the surface area of the submarine.
     * @param {number} surfaceArea - The new surface area.
     */
    setSurfaceArea(surfaceArea) {
        this.surfaceArea = surfaceArea;
    }
    /**
     * Gets the ballast tank capacity of the submarine.
     * @returns {number} The ballast tank capacity.
     */
    getBallastTankCapacity() {
        return this.ballastTankCapacity;
    }
    /**
     * Sets the ballast tank capacity of the submarine.
     * @param {number} ballastTankCapacity - The new ballast tank capacity.
     */
    setBallastTankCapacity(ballastTankCapacity) {
        this.ballastTankCapacity = ballastTankCapacity;
    }
}
exports.default = SubmarineConstants;
