import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'

/**
 * Debug
 */
const gui = new GUI({ width: 300 })
// gui.close()

// gui.hide()

const parameters = {
    color: 0xff0000,
    spin: () => {
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
    }
}

gui
    .addColor(parameters, 'color')
    .onChange(() => {
        material.color.set(parameters.color)
    })

gui.add(parameters, 'spin')

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: parameters.color, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Debug
 */
gui
    .add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('elevation')

gui.add(mesh, 'visible')

gui.add(material, 'wireframe')

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const round = (num) => {
    var roundDigits = 1E4;
    var num = Math.round(num * roundDigits);
    num /= roundDigits;
    return num;
}

const calculateCrossSectionalArea = (radius) => {
    return Math.PI * Math.pow(radius, 2)
}

var meterPerSecond = () => {
    return velocity;
}

var kiloMeterPerHour = () => {
    return round(velocity * 3.6);
}

var knots = () => {
    return round(velocity * 1.943844);
}

let preset = {};
const submarineParameters = {
    emptyMass: 0,
    totalMass: 0,
    maxDepth: 0,
    length: 0,
    width: 0,
    volume: 0,
    rotorDiameter: 0,
    rotorRoundPerSecond: 0,
    sternPlaneArea: 0,
    rudderPlaneArea: 0,
    fairwaterPlaneArea: 0,
    cDrag: 0,
    kt: 0,
    cStern: 0,
    cRudder: 0,
    cFairetwater: 0,
    waterDensity: 0,
    savePreset() {
        // save current values to an object
        preset = gui.save();
        loadButton.enable();
    },
    loadPreset() {
        gui.load(preset);
    },
    speed: 0,
    rpm: 0,
    currentSpeed: meterPerSecond,
    positionX: 0,
    positionY: 0,
    positionZ: 0,

}
const submarineParametersFolder = gui.addFolder("Submarine Parameters")
submarineParametersFolder
    .add(submarineParameters, 'emptyMass')
    .name("Empty Mass")
submarineParametersFolder
    .add(submarineParameters, 'totalMass')
    .name("Total Mass")
submarineParametersFolder
    .add(submarineParameters, 'maxDepth')
    .name("Max Depth")
submarineParametersFolder
    .add(submarineParameters, 'length')
    .name("Length")
submarineParametersFolder
    .add(submarineParameters, 'width')
    .name("Width")
submarineParametersFolder
    .add(submarineParameters, 'volume')
    .name("Volume")
submarineParametersFolder
    .add(submarineParameters, 'rotorDiameter')
    .name("Rotor Diameter")
submarineParametersFolder
    .add(submarineParameters, 'rotorRoundPerSecond')
    .name("Rotor Rounds Per Second")
submarineParametersFolder
    .add(submarineParameters, 'sternPlaneArea')
    .name("Stern Plane Area")
submarineParametersFolder
    .add(submarineParameters, 'rudderPlaneArea')
    .name("Rudder Plane Area")
submarineParametersFolder
    .add(submarineParameters, 'fairwaterPlaneArea')
    .name("Fairwater Plane Area")
submarineParametersFolder
    .add(submarineParameters, 'cDrag')
    .name("Drag Coefficient")
submarineParametersFolder
    .add(submarineParameters, 'kt')
    .name("Thrust Coefficient")
submarineParametersFolder
    .add(submarineParameters, 'cStern')
    .name("Stern Coefficient")
submarineParametersFolder
    .add(submarineParameters, 'cRudder')
    .name("Rudder Coefficient")
submarineParametersFolder
    .add(submarineParameters, 'cFairetwater')
    .name("Fairwater Coefficient")
submarineParametersFolder
    .add(submarineParameters, 'waterDensity')
    .name("Water Density")

submarineParametersFolder.add(submarineParameters, 'savePreset').name("Save Preset")
const loadButton = submarineParametersFolder.add(submarineParameters, 'loadPreset').name("Load Preset")
loadButton.disable()
submarineParametersFolder.close()

gui.add(submarineParameters, 'rpm').name("Rotor RPM").listen().disable()
gui.add(submarineParameters, 'currentSpeed', { Knots: knots, km: kiloMeterPerHour, ms: meterPerSecond }).name("Speed Unit")
gui.add(submarineParameters, 'speed').name("Speed").listen().disable()
gui.add(submarineParameters, 'positionX').name("Position X").listen().disable()
gui.add(submarineParameters, 'positionY').name("Position Y").listen().disable()
gui.add(submarineParameters, 'positionZ').name("Position Z").listen().disable()

const mass = 48000000;
const gravity = 9.8;
const height = 175;
const width = 23;
const volume = 46829.27;
const cd = 1.9;
const waterDensity = 1025;
const kt = 0.317622429678;
// const kt = 0.4;
var rotorRoundPerSecond = 0;
const fanDiameter = 7;
const crossSectionalArea = 415.48;
var velocity = 0;

const weight = mass * gravity;
console.log("Weight = " + weight);
const buoyancy = waterDensity * gravity * volume;
console.log("Buoyancy = " + buoyancy);
var thrust = kt * waterDensity * Math.pow(rotorRoundPerSecond, 2) * Math.pow(fanDiameter, 4);
console.log("Thrust = " + thrust);
var drag = cd * 0.5 * waterDensity * crossSectionalArea * Math.pow(velocity, 2);
console.log("Drag = " + drag);

var forces = thrust - drag;
console.log("Forces = " + forces);
var acceleration = forces / mass;
console.log("Acceleration = " + acceleration);

const timeToReachMaxRotation = 40;

var increatMotorRotation = () => {
    if (rotorRoundPerSecond < 10) {
        rotorRoundPerSecond += 10 / (timeToReachMaxRotation * (1000 / interval))
        rotorRoundPerSecond = round(rotorRoundPerSecond)
        submarineParameters.rpm = rotorRoundPerSecond * 60;
    }
}

const updateAcceleration = () => {
    thrust = kt * waterDensity * Math.pow(rotorRoundPerSecond, 2) * Math.pow(fanDiameter, 4);
    thrust = round(thrust);
    drag = cd * 0.5 * waterDensity * crossSectionalArea * Math.pow(velocity, 2);
    drag = round(drag);
    forces = thrust - drag;
    forces = round(forces);
    acceleration = forces / mass;
    acceleration = round(acceleration);
    console.log("Update Thrust = " + thrust);
    console.log("Update Drag = " + drag);
    console.log("Update Forces = " + forces);
    console.log("Update Acceleration = " + acceleration);
}


var velocity0 = 0;
const interval = 100;
var time = 0;
var currentTick = 0;
var ticks = 10000;
// var ticks = 1 / 0;
var x = 0, x0 = 0;
var speed = 0;
const updateVelocity = () => {
    if (currentTick <= ticks) {
        console.log("\n")
        console.log("======= TICK : " + currentTick + " ========")

        increatMotorRotation();
        console.info("# Motor RPS : " + rotorRoundPerSecond)

        speed = velocity * 3.6;
        speed = round(speed);
        console.info("# Speed : " + speed + " KM")

        time = interval / 1000;
        time = round(time)

        velocity = acceleration * time + velocity0
        velocity = round(velocity);
        submarineParameters.speed = submarineParameters.currentSpeed();
        console.log("Current Velocity = " + velocity);

        velocity0 = velocity

        x = 0.5 * acceleration * Math.pow(time, 2) + velocity * time + x0;
        x = round(x);
        submarineParameters.positionX = x;
        console.log("X = " + x);

        x0 = x;

        currentTick++;

        updateAcceleration();

        console.log("\n")
    }
}

window.setInterval(updateVelocity, interval);

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


/*
import gsap from 'gsap'

// Axes Helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper)

window.addEventListener('resize', () => {
    // Update Sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update Renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        }
        else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }
})

*/