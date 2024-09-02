import { BufferGeometry, Group, Line, LineBasicMaterial, Vector3 } from "three";
import { body, camera, cameraForward, scene } from "./Scene.js";
import { Simulator } from "../EnvView.js";
import { deltaTime } from "./Time.js";
import * as SeaFloor from "../scene/SeaFloor.js";
export const debugging = true;

let showPanel = debugging;
export let showAll = debugging;
export let showFps = debugging;
export let showCpu = debugging;
export let showMem = debugging;
export let showPos = debugging;
export let showCameraType = debugging;
export let showCollisionDetection = debugging;
export let isCollisionDetected = false;
export function setCollistionDetection(value) {
  isCollisionDetected = value;
}

export let showSeaBottomBoundBox = false;
export let showSubmarineBoundBox = false;

export let showAllPanels = true;
export let showControlsPanel = true;
export let showSubmarineAttributesPanel = true;
export let showEnvironmentAttributesPanel = true;
export let showForcesPanel = true;
export let showLinearMotionPanel = true;
export let showAngularMotionPanel = true;

export let enableSubmarineSound = true;
export let enableEnvironmentSound = true;

export function changeShowAll(value) {
  showAll = value;
}
export function allVisible(value) {
  showAll = value;
  fpsVisible(showAll);
  cpuVisible(showAll);
  memVisible(showAll);
  posVisible(showAll);
  cameraTypeVisible(showAll);
  collisionDetectionVisible(showAll);
}
export function fpsVisible(value) {
  showFps = value;
  showPanel = showFps || showCpu || showMem || showPos || showCameraType || showCollisionDetection;
  debugPanel.style.display = showPanel ? "block" : "none";
  fpsDiv.style.display = showFps ? "block" : "none";
}
export function cpuVisible(value) {
  showCpu = value;
  showPanel = showFps || showCpu || showMem || showPos || showCameraType || showCollisionDetection;
  debugPanel.style.display = showPanel ? "block" : "none";
  cpuDiv.style.display = showCpu ? "block" : "none";
}
export function memVisible(value) {
  showMem = value;
  showPanel = showFps || showCpu || showMem || showPos || showCameraType || showCollisionDetection;
  debugPanel.style.display = showPanel ? "block" : "none";
  memDiv.style.display = showMem ? "block" : "none";
}
export function posVisible(value) {
  showPos = value;
  showPanel = showFps || showCpu || showMem || showPos || showCameraType || showCollisionDetection;
  debugPanel.style.display = showPanel ? "block" : "none";
  posDiv.style.display = showPos ? "block" : "none";
}
export function cameraTypeVisible(value) {
  showCameraType = value;
  showPanel = showFps || showCpu || showMem || showPos || showCameraType || showCollisionDetection;
  debugPanel.style.display = showPanel ? "block" : "none";
  cameraTypeDiv.style.display = showCameraType ? "block" : "none";
}
export function collisionDetectionVisible(value) {
  showCollisionDetection = value;
  showPanel = showFps || showCpu || showMem || showPos || showCameraType || showCollisionDetection;
  debugPanel.style.display = showPanel ? "block" : "none";
  collisionDetectionDiv.style.display = showCollisionDetection ? "block" : "none";
}
export function seaBottomBoundBoxVisible(value) {
  showSeaBottomBoundBox = value;
  if (value) {
    scene.add(SeaFloor.boundingBoxesDebugScene);
  } else {
    scene.remove(SeaFloor.boundingBoxesDebugScene)
  }
}
export function submarineBoundBoxBoxVisible(value) {
  showSubmarineBoundBox = value;
  if (value) {
    scene.add(SeaFloor.submarineBoundingBoxScene);
  } else {
    scene.remove(SeaFloor.submarineBoundingBoxScene)
  }
}

export function changeShowAllPanels(value) {
  showAllPanels = value;
}
export function allPanelsVisible(value) {
  showAllPanels = value;
  controlsPanelVisible(showAllPanels);
  submarineAttributesPanelVisible(showAllPanels);
  environmentAttributesPanelVisible(showAllPanels);
  forcesPanelVisible(showAllPanels);
  linearMotionPanelVisible(showAllPanels);
  angularMotionPanelVisible(showAllPanels);
}
export function controlsPanelVisible(value) {
  showControlsPanel = value;
  if (value) {
    Simulator.controlGUI.gui.show();
  } else {
    Simulator.controlGUI.gui.hide()
  }
}
export function submarineAttributesPanelVisible(value) {
  showSubmarineAttributesPanel = value;
  if (value) {
    Simulator.submarineAttributesGUI.gui.show();
  } else {
    Simulator.submarineAttributesGUI.gui.hide()
  }
}
export function environmentAttributesPanelVisible(value) {
  showEnvironmentAttributesPanel = value;
  if (value) {
    Simulator.environmentAttributesGUI.gui.show();
  } else {
    Simulator.environmentAttributesGUI.gui.hide()
  }
}
export function forcesPanelVisible(value) {
  showForcesPanel = value;
  if (value) {
    Simulator.forcesGUI.gui.show();
  } else {
    Simulator.forcesGUI.gui.hide()
  }
}
export function linearMotionPanelVisible(value) {
  showLinearMotionPanel = value;
  if (value) {
    Simulator.linearMotionGUI.gui.show();
  } else {
    Simulator.linearMotionGUI.gui.hide()
  }
}
export function angularMotionPanelVisible(value) {
  showAngularMotionPanel = value;
  if (value) {
    Simulator.angularMotionGUI.gui.show();
  } else {
    Simulator.angularMotionGUI.gui.hide()
  }
}

export function submarineSoundEnable(value) {
  enableSubmarineSound = value;
  if (value) {
    Simulator.world.submarineView.engineSound.play();
  } else {
    Simulator.world.submarineView.engineSound.stop()
  }
}

export function environmentSoundEnable(value) {
  enableEnvironmentSound = value;
  if (value) {
    Simulator.world.underWaterSound.play();
    Simulator.world.wavesSound.play();
  } else {
    Simulator.world.underWaterSound.stop();
    Simulator.world.wavesSound.stop();
  }
}

const debugPanel = document.createElement("debug");
const fpsDiv = document.createElement("div");
const cpuDiv = document.createElement("div");
const memDiv = document.createElement("div");
const posDiv = document.createElement("div");
const cameraTypeDiv = document.createElement("div");
const collisionDetectionDiv = document.createElement("div");

let fps = 0;
let frameTime = 0;
let deltaTimeSum = 0;
let cpuTime = 0;
let cpuUsage = 0;
let mem = 0;
let lastRefresh = 0;
let frameCount = 0;
let cpuSum = 0;
let cpuDeltaSum = 0;
let lastFrame = 0;

let now, a;

export function Start() {
  debugPanel.style.display = showPanel ? "block" : "none";
  fpsDiv.style.display = showFps ? "block" : "none";
  cpuDiv.style.display = showCpu ? "block" : "none";
  memDiv.style.display = showMem ? "block" : "none";
  posDiv.style.display = showPos ? "block" : "none";
  cameraTypeDiv.style.display = showCameraType ? "block" : "none";
  collisionDetectionDiv.style.display = showCollisionDetection ? "block" : "none";

  debugPanel.appendChild(fpsDiv);
  debugPanel.appendChild(cpuDiv);
  debugPanel.appendChild(memDiv);
  debugPanel.appendChild(posDiv);
  debugPanel.appendChild(cameraTypeDiv);
  debugPanel.appendChild(collisionDetectionDiv);

  body.appendChild(debugPanel);

  allVisible(showAll);

  lastRefresh = performance.now();
}

export function Update(controlCamera) {
  frameCount++;
  deltaTimeSum += deltaTime;
  now = performance.now();
  cpuDeltaSum += now - lastFrame;
  lastFrame = now;

  if (lastRefresh + 500 <= now) {
    frameTime = deltaTimeSum / frameCount;
    fps = Math.round((1 / frameTime) * 10) / 10;
    frameTime = Math.round(frameTime * 10000) / 10;
    cpuTime = Math.round((cpuSum / frameCount) * 10) / 10;
    cpuUsage = Math.round((cpuTime / (cpuDeltaSum / frameCount)) * 1000) / 10;

    frameCount = 0;
    deltaTimeSum = 0;
    cpuSum = 0;
    cpuDeltaSum = 0;

    mem = performance.memory;

    lastRefresh = now;
  }

  fpsDiv.textContent = "FPS: " + fps + " (" + frameTime + " MS)";
  cpuDiv.textContent = "CPU: " + cpuTime + " MS (" + cpuUsage + "%)";

  if (mem) {
    memDiv.textContent =
      "Memory: " +
      Math.round((mem.usedJSHeapSize / 1048576) * 10) / 10 +
      " MB / " +
      Math.round(mem.jsHeapSizeLimit / 104857.6) / 10 +
      " MB";
  } else {
    memDiv.textContent = "Memory: cannot measure";
  }

  posDiv.textContent =
    "Camera Position: " +
    Math.round(camera.position.x * 10) / 10 +
    ", " +
    Math.round(camera.position.y * 10) / 10 +
    ", " +
    Math.round(camera.position.z * 10) / 10;

  cameraTypeDiv.textContent =
    "Camera Type: " + (controlCamera.isFreeCamera ? "Free" : "Orbit")

  collisionDetectionDiv.textContent =
    "Collision: " + (isCollisionDetected ? "Detected" : "None")

}

let beginTime = 0;

export function Begin() {
  beginTime = performance.now();
}

export function End() {
  cpuSum += performance.now() - beginTime;
}
