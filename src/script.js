import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import GUI from 'lil-gui'

/**
 * Debug
 */
const gui = new GUI({ width: 300 })
// gui.close()

// gui.hide()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(10000);
axesHelper
scene.add(axesHelper)


/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10000, 10000),
    new THREE.MeshBasicMaterial({
        color: '#070619',
    })
)
floor.position.y = -10
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Surface
 */
const surface = new THREE.Mesh(
    new THREE.PlaneGeometry(10000, 10000),
    new THREE.MeshBasicMaterial({
        color: '#07066F',
        side: THREE.DoubleSide
    })
)

surface.position.y = 10
surface.receiveShadow = true
surface.rotation.x = - Math.PI * 0.5
scene.add(surface)

/**
 * Ocean effect
 */
scene.background = new THREE.Color(0x07062e);

scene.fog = new THREE.Fog(0x07062e, 1, 100);

/**
 * Lights
 */
const color = new THREE.Color(0xeeeeee)
// Ambient Light: Lower intensity to avoid overexposure
const ambientLight = new THREE.AmbientLight(color, 0.6);
scene.add(ambientLight);

const createDirectionalLight = (color, intensity, position) => {
    const light = new THREE.DirectionalLight(color, intensity);
    light.castShadow = true;
    light.shadow.mapSize.set(1024, 1024);
    light.shadow.camera.far = 5000;
    light.shadow.camera.left = -10;
    light.shadow.camera.top = 10;
    light.shadow.camera.right = 10;
    light.shadow.camera.bottom = -10;
    light.position.set(...position);
    return light;
};

// Create and add lights
const directionalLight = createDirectionalLight(color, 10, [10, 5, 10]);
scene.add(directionalLight);

const directionalLight2 = createDirectionalLight(color, 10, [-10, 5, 10]);
scene.add(directionalLight2);

// const directionalLight3 = createDirectionalLight(color, 10, [10, 5, -10]);
// scene.add(directionalLight3);


const pointLight = new THREE.PointLight(color, 10.5);
pointLight.position.set(2, 3, 2);
scene.add(pointLight);

const spotLight = new THREE.SpotLight(color, 10.7);
spotLight.position.set(15, 40, 35);
spotLight.angle = Math.PI / 6;
spotLight.penumbra = 0.1;
spotLight.decay = 2;
spotLight.distance = 200;
spotLight.castShadow = true;
spotLight.shadow.mapSize.set(2048, 2048);
scene.add(spotLight);


/**
 * Model
 */
const gtflLoader = new GLTFLoader();
let submarine = null
gtflLoader.load('models/OhioSubmarine/scene.gltf', function (gltf) {
    submarine = gltf.scene
    submarine.scale.set(0.05, 0.05, 0.05)
    submarine.rotation.y = Math.PI
    scene.add(submarine);

}, undefined, function (error) {

    console.error(error);

});

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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(-3, 2, -3)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
// controls.autoRotate = true
// controls.autoRotateSpeed = 20
controls.enablePan = false
controls.enableDamping = true;
controls.maxDistance = 10
controls.listenToKeyEvents(window);

/**
 * Objects
 */
const geometry = new THREE.ConeGeometry(1, 3, 4, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x111177 });

for (let i = 0; i < 5000; i++) {

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 1000;
    mesh.position.y = 0;
    mesh.position.z = (Math.random() - 0.5) * 1000;
    scene.add(mesh);
}


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

/**
 * Simulation
 */
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

submarineParametersFolder.destroy()

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
const interval = 10;
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

        if (submarine != null) {
            submarine.position.z = x

            // controls.lookAt(submarine.position)
            //controls.position = submarine.position
            //camera.lookAt(submarine.position)

            // camera.position.set(-2, 1, submarine.position.z - 3)
            // controls.update()

            controls.target = submarine.position
        }

        currentTick++;

        updateAcceleration();

        console.log("\n")
    }
}

window.setInterval(updateVelocity, interval);

/**
 * Update
 */
let previousTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update controls
    controls.update(deltaTime)

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