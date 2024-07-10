// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import GUI from 'lil-gui'
// import { CSG } from 'three-csg-ts';

// /**
//  * Debug
//  */
// const gui = new GUI({ width: 300 })
// // gui.close()
// // gui.hide()

// /**
//  * Base
//  */
// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()

// const objectsScaleFactor = 1

// /**
//  * Axes Helper
//  */
// const scaneControls = {
//     axesHelper: true,
// }

// const axesHelper = new THREE.AxesHelper(10000);
// scene.add(axesHelper)
// gui
//     .add(scaneControls, 'axesHelper')
//     .name('Show Axes')
//     .onChange(
//         (isShowed) => {
//             if (isShowed) { scene.add(axesHelper) }
//             else { scene.remove(axesHelper) }
//         }
//     )

// /**
//  * Textures
//  */
// const textureLoader = new THREE.TextureLoader()
// const dirtTexture = textureLoader.load('/textures/env/dirt.jpg')
// dirtTexture.repeat.x = 1000
// dirtTexture.repeat.y = 1000
// dirtTexture.wrapS = THREE.MirroredRepeatWrapping
// dirtTexture.wrapT = THREE.MirroredRepeatWrapping
// const stonesTexture = textureLoader.load('/textures/env/stones.jpg')

// /**
//  * Floor
//  */
// const floorGeometry = new THREE.PlaneGeometry(10000, 10000)
// const floorMaterial = new THREE.MeshBasicMaterial()
// floorMaterial.map = dirtTexture
// floorMaterial.color = new THREE.Color('#07066F')
// const floor = new THREE.Mesh(floorGeometry, floorMaterial)
// floor.position.y = -150 * objectsScaleFactor
// floor.receiveShadow = true
// floor.rotation.x = - Math.PI * 0.5
// scene.add(floor)

// /**
//  * Surface
//  */
// const surface = new THREE.Mesh(
//     new THREE.PlaneGeometry(10000, 10000),
//     new THREE.MeshBasicMaterial({
//         color: '#07066F',
//         side: THREE.DoubleSide
//     })
// )
// surface.position.y = 150 * objectsScaleFactor
// surface.rotation.x = - Math.PI * 0.5
// scene.add(surface)

// /**
//  * Ocean effect
//  */
// scene.background = new THREE.Color(0x07062e);
// scene.fog = new THREE.Fog(0x07062e, 1, 10000);

// /**
//  * Lights
//  */
// const color = new THREE.Color('#0706FF')
// const ambientLight = new THREE.AmbientLight(color, 0.6);

// scene.add(ambientLight);

// const createDirectionalLight = (color, intensity, position) => {
//     const light = new THREE.DirectionalLight(color, intensity);
//     light.castShadow = true;
//     light.shadow.mapSize.set(1024, 1024);
//     light.shadow.camera.far = 5000;
//     light.shadow.camera.left = -10;
//     light.shadow.camera.top = 10;
//     light.shadow.camera.right = 10;
//     light.shadow.camera.bottom = -10;
//     light.position.set(...position);
//     return light;
// };

// // Create and add lights
// const directionalLight = createDirectionalLight(color, 10, [10, 5, 10]);
// scene.add(directionalLight);

// const directionalLight2 = createDirectionalLight(color, 10, [-10, 5, 10]);
// scene.add(directionalLight2);

// const pointLight = new THREE.PointLight(color, 10.5);
// pointLight.position.set(2, 3, 2);
// scene.add(pointLight);

// const spotLight = new THREE.SpotLight(color, 10.7);
// spotLight.position.set(15, 40, 35);
// spotLight.angle = Math.PI / 6;
// spotLight.penumbra = 0.1;
// spotLight.decay = 2;
// spotLight.distance = 200;
// spotLight.castShadow = true;
// spotLight.shadow.mapSize.set(2048, 2048);
// scene.add(spotLight);
// const getCrossSectionArea = () => {

//     // Perform CSG subtraction
//     // const ellipsoidCSG = CSG.fromMesh(this.submarineEllipsoidMesh);
//     // const planeCSG = CSG.fromMesh(this.cuttingPlaneMesh);
//     // const intersectionCSG = ellipsoidCSG.intersect(planeCSG); // Intersection will give you the submerged part
//     // const intersectionMesh = CSG.toMesh(intersectionCSG, new THREE.Matrix4());
//     // const vertices = intersectionMesh.geometry.attributes.position; // Ensure this is accurate
//     // const area = this.calculatePolygonArea(vertices);
//     // console.log('Cross-sectional area:', area);
//     // this.submarine.getState().getCurrentOrientation()
//     // Assume you have the submarine's Euler angles
//     const submarineEuler = new THREE.Euler(0, 0, 0, 'XYZ');

//     // Create a quaternion from the Euler angles
//     const submarineQuaternion = new THREE.Quaternion().setFromEuler(submarineEuler);

//     // Define the submarine's forward direction in local coordinates
//     const submarineForward = new THREE.Vector3(0, 0, 1);

//     // Transform the forward direction vector by the submarine's orientation
//     const worldForward = submarineForward.applyQuaternion(submarineQuaternion);

//     // Assume you have the velocity vector of the submarine
//     const submarineVelocity = new THREE.Vector3(0, 10, 10);

//     // Normalize both vectors to get their directions
//     worldForward.normalize();
//     submarineVelocity.normalize();

//     // Calculate the dot product
//     const dotProduct = worldForward.dot(submarineVelocity);

//     // Calculate the angle in radians
//     const angleInRadians = Math.acos(dotProduct);

//     // Convert the angle to degrees (optional)
//     const angleInDegrees = THREE.MathUtils.radToDeg(angleInRadians);

//     console.log("Angle between submarine main axis and speed vector: ", angleInDegrees, "degrees");

// }
// const getSubmergedVolume = () => {
//     const a = 6.5;
//     const b = 6.5;
//     const c = 85;
//     const x0 = 0;
//     const y0 = -50;
//     const z0 = 0;

//     // Rotation matrix for the ellipsoid (assuming you have this from Euler angles or quaternions)
//     const rotationMatrix = new THREE.Matrix4();
//     // Apply your rotation here
//     rotationMatrix.makeRotationFromEuler(new THREE.Euler(0, 0, 0));

//     // Voxelization
//     const voxelSize = 1; // Adjust for accuracy/performance
//     let submergedVolume1 = 0;

//     // Iterate through voxels inside the bounding box of the ellipsoid
//     for (let x = -a; x <= a; x += voxelSize) {
//         for (let y = -b; y <= b; y += voxelSize) {
//             for (let z = -c; z <= c; z += voxelSize) {
//                 // Check if the voxel point is inside the ellipsoid
//                 if ((x * x) / (a * a) + (y * y) / (b * b) + (z * z) / (c * c) <= 1) {
//                     // Transform voxel point to world coordinates
//                     const ellipsoidPoint = new THREE.Vector3(x, y, z);
//                     const worldPoint = ellipsoidPoint.applyMatrix4(rotationMatrix).add(new THREE.Vector3(x0, y0, z0));

//                     // Check if the voxel is submerged below the plane y=0 in world coordinates
//                     if (worldPoint.y <= 0) {
//                         submergedVolume1 += voxelSize * voxelSize * voxelSize; // Add voxel volume to submerged volume
//                     }
//                 }
//             }
//         }
//     }

//     console.log("Submerged Volume:", submergedVolume1);
// }
// /**
//  * Model
//  */
// const gtflLoader = new GLTFLoader();
// let submarine = new THREE.Scene();
// const submarineModelPath = 'models/OhioSubmarine/glb/ohio-submarine.glb'
// gtflLoader.load(submarineModelPath, function (gltf) {
//     submarine = gltf.scene
//     submarine.rotation.y = Math.PI
//     const boundingBox = new THREE.Box3().setFromObject(submarine);
//     const initialLength = boundingBox.max.z - boundingBox.min.z;
//     let desiredLength = ohioSubmarineParamters.length * objectsScaleFactor;
//     const scaleFactor = desiredLength / initialLength;
//     submarine.scale.set(scaleFactor, scaleFactor, scaleFactor);
//     scene.add(submarine);

//     const waterLevel = 150;
//     const clippingPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -waterLevel);
//     const submarineMaterial = gltf.scene.children[0].children[0].children[0].children[0].children[0].clippingPlanes

//     const ellipsoidGeometry = new THREE.SphereGeometry(0.5, 32, 32);

//     const additionalSpace = ((ohioSubmarineParamters.width + ohioSubmarineParamters.length) / 2) * 0.08;
//     console.log(additionalSpace)
//     ellipsoidGeometry.scale(ohioSubmarineParamters.width + additionalSpace, ohioSubmarineParamters.width + additionalSpace, ohioSubmarineParamters.length + additionalSpace);
//     const ellipsoidMesh = new THREE.Mesh(ellipsoidGeometry, new THREE.MeshBasicMaterial());
//     // scene.add(ellipsoidMesh);
//     console.log((ohioSubmarineParamters.width + additionalSpace) * 0.5)
//     console.log((ohioSubmarineParamters.length + additionalSpace) * 0.5)
//     console.log(getVolume(ellipsoidGeometry))
//     // submarine.material.clippingPlanes = [clippingPlane];

//     const box = new THREE.Mesh(
//         new THREE.BoxGeometry(100, 100, 200),
//         new THREE.MeshBasicMaterial({
//             color: '#07066F',
//             side: THREE.DoubleSide
//         })
//     );

//     const plane = new THREE.Mesh(
//         new THREE.BoxGeometry(100, 0.1, 200),
//         new THREE.MeshBasicMaterial({
//             color: '#FFFFFF',
//             side: THREE.DoubleSide
//         })
//     );
//     box.position.y = box.position.y + 50
//     // scene.add(box)

//     box.updateMatrix();
//     ellipsoidMesh.updateMatrix();
//     const subRes = CSG.subtract(ellipsoidMesh, box);
//     subRes.position.y = 50
//     // scene.add(subRes)
//     console.log(getVolume(subRes.geometry))
//     // getCrossSectionArea.call()
//     // getSubmergedVolume.call()

// }, undefined, function (error) {

//     console.error(error);

// });

// function getVolume(geometry) {
//     if (!geometry.isBufferGeometry) {
//         console.log("'geometry' must be an indexed or non-indexed buffer geometry");
//         return 0;
//     }
//     var isIndexed = geometry.index !== null;
//     let position = geometry.attributes.position;
//     let sum = 0;
//     let p1 = new THREE.Vector3(),
//         p2 = new THREE.Vector3(),
//         p3 = new THREE.Vector3();
//     if (!isIndexed) {
//         let faces = position.count / 3;
//         for (let i = 0; i < faces; i++) {
//             p1.fromBufferAttribute(position, i * 3 + 0);
//             p2.fromBufferAttribute(position, i * 3 + 1);
//             p3.fromBufferAttribute(position, i * 3 + 2);
//             sum += signedVolumeOfTriangle(p1, p2, p3);
//         }
//     }
//     else {
//         let index = geometry.index;
//         let faces = index.count / 3;
//         for (let i = 0; i < faces; i++) {
//             p1.fromBufferAttribute(position, index.array[i * 3 + 0]);
//             p2.fromBufferAttribute(position, index.array[i * 3 + 1]);
//             p3.fromBufferAttribute(position, index.array[i * 3 + 2]);
//             sum += signedVolumeOfTriangle(p1, p2, p3);
//         }
//     }
//     return sum;
// }

// function signedVolumeOfTriangle(p1, p2, p3) {
//     return p1.dot(p2.cross(p3)) / 6.0;
// }

// /**
//  * Sizes
//  */
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// window.addEventListener('resize', () => {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000 * objectsScaleFactor)
// camera.position.set(-30 * objectsScaleFactor, 20 * objectsScaleFactor, -30 * objectsScaleFactor)
// scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// // controls.autoRotate = true
// // controls.autoRotateSpeed = 20
// controls.enablePan = false
// controls.enableDamping = true;
// controls.maxDistance = 150 * objectsScaleFactor
// controls.listenToKeyEvents(window);

// /**
//  * Objects
//  */
// const geometry = new THREE.ConeGeometry(10 * objectsScaleFactor, 30 * objectsScaleFactor, 4, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x111177 });
// material.map = stonesTexture
// for (let i = 0; i < 5000; i++) {
//     const mesh = new THREE.Mesh(geometry, material);
//     mesh.position.x = (Math.random() - 0.5) * 20000 * objectsScaleFactor;
//     mesh.position.y = (Math.random() - 0.5) * 150 * objectsScaleFactor;
//     mesh.position.z = (Math.random() - 0.5) * 20000 * objectsScaleFactor;
//     scene.add(mesh);
// }


// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })
// renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFSoftShadowMap
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// /**
//  * Simulation
//  */
// const round = (num) => {
//     let roundDigits = 1E6;
//     let number = Math.round(num * roundDigits);
//     number /= roundDigits;
//     return number;
// }

// const calculateCrossSectionalArea = (radius) => {
//     return Math.PI * Math.pow(radius, 2)
// }

// let meterPerSecond = () => {
//     return velocity;
// }

// let kiloMeterPerHour = () => {
//     return round(velocity * 3.6);
// }

// let knots = () => {
//     return round(velocity * 1.943844);
// }

// const ohioSubmarineParamters = {
//     emptyMass: 16764000,
//     totalMass: 36528000,
//     addedWaterMass: 16764000,
//     maxDepth: 240,
//     length: 170,
//     width: 13,
//     volume: 32710.243902,
//     submergedVolume: 32710.243902,
//     rotorDiameter: 4,
//     rotorRoundPerSecond: 10,
//     sternPlaneArea: 15,
//     rudderPlaneArea: 10,
//     fairwaterPlaneArea: 4,
//     cDrag: 1.9,
//     kt: 0.8044923775964,
//     cStern: 1.5,
//     cRudder: 0.8,
//     cFairetwater: 0.3,
//     waterDensity: 1025,
//     gravity: 9.8,
//     loadPreset() {
//         submarineParametersFolder.load(preset);
//     },
//     weight: 0,
//     buoyancy: 0,
//     thrust: 0,
//     drag: 0,
//     acceleration: 0,
//     speed: 0,
//     rpm: 0,
//     currentSpeed: meterPerSecond,
//     positionX: 0,
//     positionY: 0,
//     positionZ: 0,
//     currentDepth: 150,
//     vector: new THREE.Vector3(0, 0, 1)
// }

// const typhoonSubmarineParamters = {
//     emptyMass: 23200000,
//     totalMass: 48000000,
//     addedWaterMass: 8680000,
//     maxDepth: 400,
//     length: 175,
//     width: 23,
//     volume: 31102.439025,
//     submergedVolume: 31102.439025,
//     rotorDiameter: 7,
//     rotorRoundPerSecond: 10,
//     sternPlaneArea: 20,
//     rudderPlaneArea: 12,
//     fairwaterPlaneArea: 5,
//     cDrag: 1.9,
//     kt: 0.317622429678,
//     cStern: 1.7,
//     cRudder: 0.78,
//     cFairetwater: 0.5,
//     waterDensity: 1025,
//     gravity: 9.8,
//     loadPreset() {
//         submarineParametersFolder.load(preset);
//     },
//     weight: 0,
//     buoyancy: 0,
//     thrust: 0,
//     drag: 0,
//     acceleration: 0,
//     speed: 0,
//     rpm: 0,
//     currentSpeed: meterPerSecond,
//     positionX: 0,
//     positionY: 0,
//     positionZ: 0,
//     currentDepth: 150,
//     vector: new THREE.Vector3(0, 0, 1)
// }

// // Function to update currentMass GUI element max value
// const updateCurrentMassMaxValue = (maxValue) => {
//     const currentMassController = submarineParametersFolder.controllers.find(controller => controller.property === 'addedWaterMass');
//     currentMassController.max(maxValue);
//     currentMassController.updateDisplay();
// };

// const switchSubmarineParameters = (submarineType) => {
//     let newParams;

//     if (submarineType === 'Ohio') {
//         newParams = ohioSubmarineParamters;
//     } else if (submarineType === 'Typhoon') {
//         newParams = typhoonSubmarineParamters;
//     }

//     // Manually update each parameter
//     for (let key in newParams) {
//         submarineParametersFolder.controllers.forEach(controller => {
//             if (controller.property === key) {
//                 controller.setValue(newParams[key]);
//             }
//         });
//     }

//     // Update the max value of currentMass
//     updateCurrentMassMaxValue(newParams.totalMass - newParams.emptyMass);

//     // Reset submarine model
//     if (submarine != null) {
//         scene.remove(submarine);
//     }

//     const submarineModelPath = submarineType === 'Ohio'
//         ? 'models/OhioSubmarine/glb/ohio-submarine.glb'
//         : 'models/TyphoonSubmarine/glb/typhoon-submarine.glb';

//     gtflLoader.load(submarineModelPath, function (gltf) {
//         submarine = gltf.scene;
//         const boundingBox = new THREE.Box3().setFromObject(submarine);
//         const initialLength = boundingBox.max.z - boundingBox.min.z;
//         let desiredLength;
//         if (submarineType === 'Ohio') {
//             desiredLength = ohioSubmarineParamters.length;
//             submarine.rotation.y = Math.PI
//         } else if (submarineType === 'Typhoon') {
//             desiredLength = typhoonSubmarineParamters.length;
//         }
//         const scaleFactor = (desiredLength * objectsScaleFactor) / initialLength;
//         submarine.scale.set(scaleFactor, scaleFactor, scaleFactor);
//         scene.add(submarine);
//     }, undefined, function (error) {
//         console.error(error);
//     });
//     preset = submarineParametersFolder.save();
//     simulationControls.resetSimulation()
// };

// const submarineOptions = {
//     type: 'Ohio',
// };


// let submarineParameters = { ...ohioSubmarineParamters }
// const submarineParametersFolder = gui.addFolder("Submarine Parameters")
// submarineParametersFolder.add(submarineOptions, 'type', ['Ohio', 'Typhoon']).name("Select Submarine").onChange((type) => { switchSubmarineParameters(type) });
// submarineParametersFolder
//     .add(submarineParameters, 'emptyMass')
//     .name("Empty Mass (Kg)")
// submarineParametersFolder
//     .add(submarineParameters, 'totalMass')
//     .name("Total Mass (Kg)")
// submarineParametersFolder
//     .add(submarineParameters, 'addedWaterMass')
//     .name("Water in Tanks (L)")
//     .min(0)
//     .max(submarineParameters.totalMass - submarineParameters.emptyMass)
//     .step(100)
// submarineParametersFolder
//     .add(submarineParameters, 'maxDepth')
//     .name("Max Depth (m)")
// submarineParametersFolder
//     .add(submarineParameters, 'length')
//     .name("Length (m)")
// submarineParametersFolder
//     .add(submarineParameters, 'width')
//     .name("Width (m)")
// submarineParametersFolder
//     .add(submarineParameters, 'volume')
//     .name("Volume (m³)")
// submarineParametersFolder
//     .add(submarineParameters, 'rotorDiameter')
//     .name("Rotor Diameter (m)")
// submarineParametersFolder
//     .add(submarineParameters, 'rotorRoundPerSecond')
//     .name("Rotor Rounds Per Second (RPS)")
// submarineParametersFolder
//     .add(submarineParameters, 'sternPlaneArea')
//     .name("Stern Plane Area (m²)")
// submarineParametersFolder
//     .add(submarineParameters, 'rudderPlaneArea')
//     .name("Rudder Plane Area (m²)")
// submarineParametersFolder
//     .add(submarineParameters, 'fairwaterPlaneArea')
//     .name("Fairwater Plane Area (m²)")
// submarineParametersFolder
//     .add(submarineParameters, 'cDrag')
//     .name("Drag Coefficient")
// submarineParametersFolder
//     .add(submarineParameters, 'kt')
//     .name("Thrust Coefficient")
// submarineParametersFolder
//     .add(submarineParameters, 'cStern')
//     .name("Stern Coefficient")
// submarineParametersFolder
//     .add(submarineParameters, 'cRudder')
//     .name("Rudder Coefficient")
// submarineParametersFolder
//     .add(submarineParameters, 'cFairetwater')
//     .name("Fairwater Coefficient")
// submarineParametersFolder
//     .add(submarineParameters, 'waterDensity')
//     .name("Water Density (kg/m³)")
// submarineParametersFolder
//     .add(submarineParameters, 'gravity')
//     .name("Gravity (m/s²)")

// let preset = submarineParametersFolder.save();
// submarineParametersFolder.add(submarineParameters, 'loadPreset').name("Load Preset")
// submarineParametersFolder.close()

// let simulate = false;
// let intervalId;
// let elapsedTime = 0;
// let startTime = 0;
// const simulationControls = {
//     time: 0,
//     startSimulation: () => {
//         if (!simulate) {
//             simulate = true;
//             startTime = Date.now() - elapsedTime;
//             intervalId = window.setInterval(updateVelocity, interval);
//             startButton.disable();
//             pauseBotton.enable();
//             resetButton.enable()
//         }
//     },
//     pauseSimulation: () => {
//         if (simulate) {
//             simulate = false;
//             elapsedTime = Date.now() - startTime;
//             clearInterval(intervalId);
//             startButton.enable();
//             pauseBotton.disable();
//         }
//     },
//     resetSimulation: () => {
//         simulate = false;
//         clearInterval(intervalId);
//         elapsedTime = 0;
//         startTime = 0;
//         currentTick = 0;
//         velocity0 = 0;
//         x0 = 0;
//         velocity = 0;
//         rotorRoundPerSecond = 0;

//         // Reset submarine parameters
//         submarineParameters.weight = (submarineParameters.emptyMass + submarineParameters.addedWaterMass) * submarineParameters.gravity;
//         submarineParameters.buoyancy = submarineParameters.waterDensity * submarineParameters.gravity * submarineParameters.volume;
//         submarineParameters.speed = 0;
//         submarineParameters.positionX = 0;
//         submarineParameters.positionY = 0;
//         submarineParameters.positionZ = 0;
//         submarineParameters.thrust = 0;
//         submarineParameters.drag = 0;
//         submarineParameters.acceleration = 0;
//         submarineParameters.rpm = 0;

//         // Reset GUI elements
//         simulationControls.time = 0;

//         // Reset submarine position in the scene
//         if (submarine != null) {
//             submarine.position.set(0, 0, 0);
//             controls.target = submarine.position;
//         }

//         startButton.enable();
//         pauseBotton.disable();
//         resetButton.disable();
//     }
// }

// const SimulationFolder = gui.addFolder("Simulation")
// SimulationFolder.add(simulationControls, 'time').name("Elapsed Time (s)").listen().disable()
// const startButton = SimulationFolder.add(simulationControls, 'startSimulation').name("Start Simulation").listen()
// const pauseBotton = SimulationFolder.add(simulationControls, 'pauseSimulation').name("Pause Simulation").listen()
// pauseBotton.disable()
// const resetButton = SimulationFolder.add(simulationControls, 'resetSimulation').name("Reset Simulation").listen()
// resetButton.disable()
// SimulationFolder.add(submarineParameters, 'weight').name("Weight (N)").listen().disable()
// SimulationFolder.add(submarineParameters, 'buoyancy').name("Buoyancy (N)").listen().disable()
// SimulationFolder.add(submarineParameters, 'thrust').name("Thrust (N)").listen().disable()
// SimulationFolder.add(submarineParameters, 'drag').name("Drag (N)").listen().disable()
// SimulationFolder.add(submarineParameters, 'currentDepth').name("Current Depth (m)").listen().disable()
// SimulationFolder.add(submarineParameters, 'submergedVolume').name("Submegred Volume (m³)").listen().disable()
// SimulationFolder.add(submarineParameters, 'acceleration').name("Acceleration (m/s²)").listen().disable()
// SimulationFolder.add(submarineParameters, 'rpm').name("Rotor RPM").listen().disable()
// SimulationFolder.add(submarineParameters, 'currentSpeed', { "knots": knots, "km/h": kiloMeterPerHour, "m/s": meterPerSecond }).name("Speed Unit")
// SimulationFolder.add(submarineParameters, 'speed').name("Speed").listen().disable()
// SimulationFolder.add(submarineParameters, 'positionX').name("Position X").listen().disable()
// SimulationFolder.add(submarineParameters, 'positionY').name("Position Y").listen().disable()
// SimulationFolder.add(submarineParameters, 'positionZ').name("Position Z").listen().disable()

// let rotorRoundPerSecond = 0;
// let velocity = 0;

// // // submarineParameters.weight = (submarineParameters.emptyMass + submarineParameters.addedWaterMass) * submarineParameters.gravity;
// // let weight = (submarineParameters.emptyMass + submarineParameters.addedWaterMass) * submarineParameters.gravity
// // // let weightVector = new THREE.Vector3(0, -submarineParameters.weight, 0);
// // // submarineParameters.buoyancy = submarineParameters.waterDensity * submarineParameters.gravity * submarineParameters.volume;
// // let boyency = submarineParameters.waterDensity * submarineParameters.gravity * submarineParameters.submergedVolume
// // // let buoyancyVector = new THREE.Vector3(0, submarineParameters.buoyancy, 0);
// // let thrust = submarineParameters.kt * submarineParameters.waterDensity * Math.pow(rotorRoundPerSecond, 2) * Math.pow(submarineParameters.rotorDiameter, 4);
// // // let thrustVector = new THREE.Vector3(0, 0, 0)
// // // thrustVector.copy(submarineParameters.vector)
// // // thrustVector.multiplyScalar(thrust)
// // let drag = submarineParameters.cDrag * 0.5 * submarineParameters.waterDensity * calculateCrossSectionalArea(submarineParameters.width / 2) * Math.pow(velocity, 2);
// // // let dragVector = new THREE.Vector3(0, 0, 0)
// // // dragVector.copy(submarineParameters.vector)
// // // dragVector.multiplyScalar(-1 * drag)
// // // let forcesVector = new THREE.Vector3(0, 0, 0)
// // // forcesVector.addVectors(weightVector, buoyancyVector, thrustVector, dragVector)
// // // let forces = thrust - drag;
// // let forces = boyency - weight
// // let acceleration = forces / (submarineParameters.emptyMass + submarineParameters.addedWaterMass);
// let weight = new THREE.Vector3(0, 1, 0), boyency = new THREE.Vector3(0, -1, 0), thrust = submarineParameters.vector.clone(), drag = 0, forces = 0, acceleration = 0;

// const timeToReachMaxRotation = 40;

// let increatMotorRotation = () => {
//     if (rotorRoundPerSecond < submarineParameters.rotorRoundPerSecond) {
//         rotorRoundPerSecond += submarineParameters.rotorRoundPerSecond / (timeToReachMaxRotation * (1000 / interval))
//         rotorRoundPerSecond = round(rotorRoundPerSecond)
//         submarineParameters.rpm = rotorRoundPerSecond * 60;
//     }
// }
// let tempDepth = 0;
// const updateAcceleration = () => {
//     tempDepth = surface.position.y - submarine.position.y
//     tempDepth += submarineParameters.width / 2
//     if (tempDepth >= 0) {
//         submarineParameters.currentDepth = tempDepth
//     } else {
//         submarineParameters.currentDepth = 0
//     }
//     // submarineParameters.currentDepth = submarine.position.distanceTo(surface.position)

//     if (submarineParameters.currentDepth >= submarineParameters.width) {
//         submarineParameters.submergedVolume = submarineParameters.volume
//     } else {
//         submarineParameters.submergedVolume = (submarineParameters.currentDepth / submarineParameters.width) * submarineParameters.volume;
//     }

//     weight = (submarineParameters.emptyMass + submarineParameters.addedWaterMass) * submarineParameters.gravity
//     weight = round(weight);

//     boyency = submarineParameters.waterDensity * submarineParameters.gravity * submarineParameters.submergedVolume
//     boyency = round(boyency);

//     thrust = submarineParameters.kt * submarineParameters.waterDensity * Math.pow(rotorRoundPerSecond, 2) * Math.pow(submarineParameters.rotorDiameter, 4);
//     thrust = round(thrust);

//     drag = submarineParameters.cDrag * 0.5 * submarineParameters.waterDensity * calculateCrossSectionalArea(submarineParameters.width / 2) * Math.pow(velocity, 2);
//     drag = round(drag);

//     // forces = thrust - drag;
//     forces = boyency - weight
//     forces = round(forces);

//     acceleration = forces / (submarineParameters.emptyMass + submarineParameters.addedWaterMass);
//     acceleration = round(acceleration);

//     submarineParameters.weight = weight
//     submarineParameters.buoyancy = boyency
//     submarineParameters.thrust = thrust
//     submarineParameters.drag = drag
//     submarineParameters.acceleration = acceleration
// }

// updateAcceleration.call()

// let velocity0 = 0;
// const interval = 10;
// let time = 0;
// let currentTick = 0;
// let ticks = Infinity;
// let x = 0, x0 = 0;
// const updateVelocity = () => {
//     if (currentTick <= ticks) {

//         increatMotorRotation();

//         time = interval / 1000;
//         time = round(time)

//         velocity = acceleration * time + velocity0
//         velocity = round(velocity);
//         submarineParameters.speed = submarineParameters.currentSpeed();
//         velocity0 = velocity

//         x = 0.5 * acceleration * Math.pow(time, 2) + velocity * time + x0;
//         x = round(x);
//         submarineParameters.positionX = x;
//         x0 = x;

//         if (submarine != null) {
//             submarine.position.y = x

//             // controls.lookAt(submarine.position)
//             // controls.position = submarine.position
//             // camera.lookAt(submarine.position)
//             // camera.position.set(-2, 1, submarine.position.z - 3)
//             // controls.update()

//             controls.target = submarine.position
//         }

//         currentTick++;

//         updateAcceleration();

//         // console.log("\n")
//         // console.log("======= TICK : " + currentTick + " ========")
//         // console.info("# Motor RPS : " + rotorRoundPerSecond)
//         // speed = velocity * 3.6;
//         // speed = round(speed);
//         // console.info("# Speed : " + speed + " KM")
//         // console.log("Update Thrust = " + thrust);
//         // console.log("Update Drag = " + drag);
//         // console.log("Update Forces = " + forces);
//         // console.log("Update Acceleration = " + acceleration);
//         // console.log("Current Velocity = " + velocity);
//         // console.log("X = " + x);
//         // console.log("\n")
//     }
// }

// /**
//  * Update
//  */
// // const clock = new THREE.Clock()
// // let previousTime = 0
// const tick = () => {
//     // const elapsedTime = clock.getElapsedTime()
//     // const deltaTime = elapsedTime - previousTime
//     // previousTime = elapsedTime

//     // Update elapsed time if the simulation is running
//     if (simulate) {
//         elapsedTime = Date.now() - startTime;
//         simulationControls.time = (elapsedTime / 1000).toFixed(2); // Display time in seconds
//     }

//     // Update controls
//     controls.update()

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()

import { default as Simulator } from "./simulation/view/Simulator";
new Simulator(document.querySelector('canvas.webgl'))