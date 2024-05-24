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

const objectsScaleFactor = 0.1

/**
 * Axes Helper
 */
const scaneControls = {
    axesHelper: true,
}

const axesHelper = new THREE.AxesHelper(10000);
scene.add(axesHelper)
gui
    .add(scaneControls, 'axesHelper')
    .name('Show Axes')
    .onChange(
        (isShowed) => {
            if (isShowed) { scene.add(axesHelper) }
            else { scene.remove(axesHelper) }
        }
    )

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const dirtTexture = textureLoader.load('/textures/env/dirt.jpg')
dirtTexture.repeat.x = 1000
dirtTexture.repeat.y = 1000
dirtTexture.wrapS = THREE.MirroredRepeatWrapping
dirtTexture.wrapT = THREE.MirroredRepeatWrapping
const stonesTexture = textureLoader.load('/textures/env/stones.jpg')

/**
 * Floor
 */
const floorGeometry = new THREE.PlaneGeometry(10000, 10000)
const floorMaterial = new THREE.MeshBasicMaterial()
floorMaterial.map = dirtTexture
floorMaterial.color = new THREE.Color('#07066F')
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.position.y = -150 * objectsScaleFactor
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
surface.position.y = 150 * objectsScaleFactor
surface.rotation.x = - Math.PI * 0.5
scene.add(surface)

/**
 * Ocean effect
 */
scene.background = new THREE.Color(0x07062e);
scene.fog = new THREE.Fog(0x07062e, 1, 10000);

/**
 * Lights
 */
const color = new THREE.Color('#0706FF')
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
const submarineModelPath = 'models/OhioSubmarine/glb/ohio-submarine.glb'
gtflLoader.load(submarineModelPath, function (gltf) {
    submarine = gltf.scene
    submarine.rotation.y = Math.PI
    const boundingBox = new THREE.Box3().setFromObject(submarine);
    const initialLength = boundingBox.max.z - boundingBox.min.z;
    let desiredLength = ohioSubmarineParamters.length * objectsScaleFactor;
    const scaleFactor = desiredLength / initialLength;
    submarine.scale.set(scaleFactor, scaleFactor, scaleFactor);
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000 * objectsScaleFactor)
camera.position.set(-30 * objectsScaleFactor, 20 * objectsScaleFactor, -30 * objectsScaleFactor)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
// controls.autoRotate = true
// controls.autoRotateSpeed = 20
controls.enablePan = false
controls.enableDamping = true;
controls.maxDistance = 150 * objectsScaleFactor
controls.listenToKeyEvents(window);

/**
 * Objects
 */
const geometry = new THREE.ConeGeometry(10 * objectsScaleFactor, 30 * objectsScaleFactor, 4, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x111177 });
material.map = stonesTexture
for (let i = 0; i < 5000; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 20000 * objectsScaleFactor;
    mesh.position.y = (Math.random() - 0.5) * 150 * objectsScaleFactor;
    mesh.position.z = (Math.random() - 0.5) * 20000 * objectsScaleFactor;
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

const ohioSubmarineParamters = {
    emptyMass: 16764000,
    totalMass: 18750000,
    maxDepth: 240,
    length: 170,
    width: 13,
    volume: 18292.683,
    rotorDiameter: 4,
    rotorRoundPerSecond: 10,
    sternPlaneArea: 15,
    rudderPlaneArea: 10,
    fairwaterPlaneArea: 4,
    cDrag: 1.9,
    kt: 0.8044923775964,
    cStern: 1.5,
    cRudder: 0.8,
    cFairetwater: 0.3,
    waterDensity: 1025,
    gravity: 9.8,
    loadPreset() {
        submarineParametersFolder.load(preset);
    },
    weight: 0,
    buoyancy: 0,
    thrust: 0,
    drag: 0,
    acceleration: 0,
    speed: 0,
    rpm: 0,
    currentSpeed: meterPerSecond,
    positionX: 0,
    positionY: 0,
    positionZ: 0,

}

const typhoonSubmarineParamters = {
    emptyMass: 23200000,
    totalMass: 48000000,
    maxDepth: 400,
    length: 175,
    width: 23,
    volume: 46829.27,
    rotorDiameter: 7,
    rotorRoundPerSecond: 10,
    sternPlaneArea: 20,
    rudderPlaneArea: 12,
    fairwaterPlaneArea: 5,
    cDrag: 1.9,
    kt: 0.317622429678,
    cStern: 1.7,
    cRudder: 0.78,
    cFairetwater: 0.5,
    waterDensity: 1025,
    gravity: 9.8,
    loadPreset() {
        submarineParametersFolder.load(preset);
    },
    weight: 0,
    buoyancy: 0,
    thrust: 0,
    drag: 0,
    acceleration: 0,
    speed: 0,
    rpm: 0,
    currentSpeed: meterPerSecond,
    positionX: 0,
    positionY: 0,
    positionZ: 0,

}

const switchSubmarineParameters = (submarineType) => {
    let newParams;

    if (submarineType === 'Ohio') {
        newParams = ohioSubmarineParamters;
    } else if (submarineType === 'Typhoon') {
        newParams = typhoonSubmarineParamters;
    }

    // Manually update each parameter
    for (let key in newParams) {
        submarineParametersFolder.controllers.forEach(controller => {
            if (controller.property === key) {
                controller.setValue(newParams[key]);
            }
        });
    }

    // Reset submarine model
    if (submarine != null) {
        scene.remove(submarine);
    }

    const submarineModelPath = submarineType === 'Ohio'
        ? 'models/OhioSubmarine/glb/ohio-submarine.glb'
        : 'models/TyphoonSubmarine/glb/typhoon-submarine.glb';

    gtflLoader.load(submarineModelPath, function (gltf) {
        submarine = gltf.scene;
        const boundingBox = new THREE.Box3().setFromObject(submarine);
        const initialLength = boundingBox.max.z - boundingBox.min.z;
        let desiredLength;
        if (submarineType === 'Ohio') {
            desiredLength = ohioSubmarineParamters.length;
            submarine.rotation.y = Math.PI
        } else if (submarineType === 'Typhoon') {
            desiredLength = typhoonSubmarineParamters.length;
        }
        const scaleFactor = (desiredLength * objectsScaleFactor) / initialLength;
        submarine.scale.set(scaleFactor, scaleFactor, scaleFactor);
        scene.add(submarine);
    }, undefined, function (error) {
        console.error(error);
    });
    preset = submarineParametersFolder.save();
    simulationControls.resetSimulation()
};

const submarineOptions = {
    type: 'Ohio',
};


let submarineParameters = { ...ohioSubmarineParamters }
const submarineParametersFolder = gui.addFolder("Submarine Parameters")
submarineParametersFolder.add(submarineOptions, 'type', ['Ohio', 'Typhoon']).name("Select Submarine").onChange((type) => { switchSubmarineParameters(type) });
submarineParametersFolder
    .add(submarineParameters, 'emptyMass')
    .name("Empty Mass (Kg)")
submarineParametersFolder
    .add(submarineParameters, 'totalMass')
    .name("Total Mass (Kg)")
submarineParametersFolder
    .add(submarineParameters, 'maxDepth')
    .name("Max Depth (m)")
submarineParametersFolder
    .add(submarineParameters, 'length')
    .name("Length (m)")
submarineParametersFolder
    .add(submarineParameters, 'width')
    .name("Width (m)")
submarineParametersFolder
    .add(submarineParameters, 'volume')
    .name("Volume (m³)")
submarineParametersFolder
    .add(submarineParameters, 'rotorDiameter')
    .name("Rotor Diameter (m)")
submarineParametersFolder
    .add(submarineParameters, 'rotorRoundPerSecond')
    .name("Rotor Rounds Per Second (RPS)")
submarineParametersFolder
    .add(submarineParameters, 'sternPlaneArea')
    .name("Stern Plane Area (m²)")
submarineParametersFolder
    .add(submarineParameters, 'rudderPlaneArea')
    .name("Rudder Plane Area (m²)")
submarineParametersFolder
    .add(submarineParameters, 'fairwaterPlaneArea')
    .name("Fairwater Plane Area (m²)")
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
    .name("Water Density (kg/m³)")
submarineParametersFolder
    .add(submarineParameters, 'gravity')
    .name("Gravity (m/s²)")

let preset = submarineParametersFolder.save();
submarineParametersFolder.add(submarineParameters, 'loadPreset').name("Load Preset")
submarineParametersFolder.close()

let simulate = false;
let intervalId;
let elapsedTime = 0;
let startTime = 0;
const simulationControls = {
    time: 0,
    startSimulation: () => {
        if (!simulate) {
            simulate = true;
            startTime = Date.now() - elapsedTime;
            intervalId = window.setInterval(updateVelocity, interval);
            startButton.disable();
            pauseBotton.enable();
            resetButton.enable()
        }
    },
    pauseSimulation: () => {
        if (simulate) {
            simulate = false;
            elapsedTime = Date.now() - startTime;
            clearInterval(intervalId);
            startButton.enable();
            pauseBotton.disable();
        }
    },
    resetSimulation: () => {
        simulate = false;
        clearInterval(intervalId);
        elapsedTime = 0;
        startTime = 0;
        currentTick = 0;
        velocity0 = 0;
        x0 = 0;
        velocity = 0;
        rotorRoundPerSecond = 0;

        // Reset submarine parameters
        submarineParameters.weight = submarineParameters.totalMass * submarineParameters.gravity;
        submarineParameters.buoyancy = submarineParameters.waterDensity * submarineParameters.gravity * submarineParameters.volume;
        submarineParameters.speed = 0;
        submarineParameters.positionX = 0;
        submarineParameters.positionY = 0;
        submarineParameters.positionZ = 0;
        submarineParameters.thrust = 0;
        submarineParameters.drag = 0;
        submarineParameters.acceleration = 0;
        submarineParameters.rpm = 0;

        // Reset GUI elements
        simulationControls.time = 0;

        // Reset submarine position in the scene
        if (submarine != null) {
            submarine.position.set(0, 0, 0);
            controls.target = submarine.position;
        }

        startButton.enable();
        pauseBotton.disable();
        resetButton.disable();
    }
}

const SimulationFolder = gui.addFolder("Simulation")
SimulationFolder.add(simulationControls, 'time').name("Elapsed Time (s)").listen().disable()
const startButton = SimulationFolder.add(simulationControls, 'startSimulation').name("Start Simulation").listen()
const pauseBotton = SimulationFolder.add(simulationControls, 'pauseSimulation').name("Pause Simulation").listen()
pauseBotton.disable()
const resetButton = SimulationFolder.add(simulationControls, 'resetSimulation').name("Reset Simulation").listen()
resetButton.disable()
SimulationFolder.add(submarineParameters, 'weight').name("Weight (N)").listen().disable()
SimulationFolder.add(submarineParameters, 'buoyancy').name("Buoyancy (N)").listen().disable()
SimulationFolder.add(submarineParameters, 'thrust').name("Thrust (N)").listen().disable()
SimulationFolder.add(submarineParameters, 'drag').name("Drag (N)").listen().disable()
SimulationFolder.add(submarineParameters, 'acceleration').name("Acceleration (m/s²)").listen().disable()
SimulationFolder.add(submarineParameters, 'rpm').name("Rotor RPM").listen().disable()
SimulationFolder.add(submarineParameters, 'currentSpeed', { "knots": knots, "km/h": kiloMeterPerHour, "m/s": meterPerSecond }).name("Speed Unit")
SimulationFolder.add(submarineParameters, 'speed').name("Speed").listen().disable()
SimulationFolder.add(submarineParameters, 'positionX').name("Position X").listen().disable()
SimulationFolder.add(submarineParameters, 'positionY').name("Position Y").listen().disable()
SimulationFolder.add(submarineParameters, 'positionZ').name("Position Z").listen().disable()

var rotorRoundPerSecond = 0;
var velocity = 0;

submarineParameters.weight = submarineParameters.totalMass * submarineParameters.gravity;
submarineParameters.buoyancy = submarineParameters.waterDensity * submarineParameters.gravity * submarineParameters.volume;
var thrust = submarineParameters.kt * submarineParameters.waterDensity * Math.pow(rotorRoundPerSecond, 2) * Math.pow(submarineParameters.rotorDiameter, 4);
var drag = submarineParameters.cDrag * 0.5 * submarineParameters.waterDensity * calculateCrossSectionalArea(submarineParameters.width / 2) * Math.pow(velocity, 2);
var forces = thrust - drag;
var acceleration = forces / submarineParameters.totalMass;

const timeToReachMaxRotation = 40;

var increatMotorRotation = () => {
    if (rotorRoundPerSecond < submarineParameters.rotorRoundPerSecond) {
        rotorRoundPerSecond += submarineParameters.rotorRoundPerSecond / (timeToReachMaxRotation * (1000 / interval))
        rotorRoundPerSecond = round(rotorRoundPerSecond)
        submarineParameters.rpm = rotorRoundPerSecond * 60;
    }
}

const updateAcceleration = () => {
    thrust = submarineParameters.kt * submarineParameters.waterDensity * Math.pow(rotorRoundPerSecond, 2) * Math.pow(submarineParameters.rotorDiameter, 4);
    thrust = round(thrust);
    drag = submarineParameters.cDrag * 0.5 * submarineParameters.waterDensity * calculateCrossSectionalArea(submarineParameters.width / 2) * Math.pow(velocity, 2);
    drag = round(drag);
    forces = thrust - drag;
    forces = round(forces);
    acceleration = forces / submarineParameters.totalMass;
    acceleration = round(acceleration);

    submarineParameters.thrust = thrust
    submarineParameters.drag = drag
    submarineParameters.acceleration = acceleration
}


var velocity0 = 0;
const interval = 10;
var time = 0;
var currentTick = 0;
var ticks = Infinity;
var x = 0, x0 = 0;
var speed = 0;
const updateVelocity = () => {
    if (currentTick <= ticks) {

        increatMotorRotation();

        time = interval / 1000;
        time = round(time)

        velocity = acceleration * time + velocity0
        velocity = round(velocity);
        submarineParameters.speed = submarineParameters.currentSpeed();
        velocity0 = velocity

        x = 0.5 * acceleration * Math.pow(time, 2) + velocity * time + x0;
        x = round(x);
        submarineParameters.positionX = x;
        x0 = x;

        if (submarine != null) {
            submarine.position.z = x

            // controls.lookAt(submarine.position)
            // controls.position = submarine.position
            // camera.lookAt(submarine.position)
            // camera.position.set(-2, 1, submarine.position.z - 3)
            // controls.update()

            controls.target = submarine.position
        }

        currentTick++;

        updateAcceleration();

        // console.log("\n")
        // console.log("======= TICK : " + currentTick + " ========")
        // console.info("# Motor RPS : " + rotorRoundPerSecond)
        // speed = velocity * 3.6;
        // speed = round(speed);
        // console.info("# Speed : " + speed + " KM")
        // console.log("Update Thrust = " + thrust);
        // console.log("Update Drag = " + drag);
        // console.log("Update Forces = " + forces);
        // console.log("Update Acceleration = " + acceleration);
        // console.log("Current Velocity = " + velocity);
        // console.log("X = " + x);
        // console.log("\n")
    }
}

/**
 * Update
 */
// const clock = new THREE.Clock()
// let previousTime = 0
const tick = () => {
    // const elapsedTime = clock.getElapsedTime()
    // const deltaTime = elapsedTime - previousTime
    // previousTime = elapsedTime

    // Update elapsed time if the simulation is running
    if (simulate) {
        elapsedTime = Date.now() - startTime;
        simulationControls.time = (elapsedTime / 1000).toFixed(2); // Display time in seconds
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
