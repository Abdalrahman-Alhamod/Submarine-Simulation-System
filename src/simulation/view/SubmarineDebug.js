import { Events } from "../controller/Utils/Events";
import { SubmarineType } from "../model/SubmarineType";
import Debug from "./Debug";
import * as THREE from "three";
/**
 * SubmarineDebug class is responsible for setting up and managing the debugging
 * GUI for submarines in the simulator. It allows users to switch between submarines
 * and adjust their attributes and controls in real-time.
 *
 * @class
 */
class SubmarineDebug {
  /**
   * Constructor for the SubmarineDebug class.
   * Sets up submarine related debug controls.
   *
   * @param {Simulator} simulator - The simulator instance.
   */
  constructor(simulator) {
    this.simulator = simulator;
    this.submarine = this.simulator.submarines.getCurrentSubmarine();
    this.controlsdPanel = this.simulator.controlGUI.gui;
    this.submarineAttributesPanel = this.simulator.submarineAttributesGUI.gui;
    this.forcesPanel = this.simulator.forcesGUI.gui;
    this.linearMotiondPanel = this.simulator.linearMotionGUI.gui;
    this.angularMotionPanel = this.simulator.angularMotionGUI.gui;
    this.folders = [];
    this.initSelectSubmarineControl();
    this.initDebugGUI();
    this.simulator.submarines.on(Events.SwitchSubmarine, () => {
      this.submarine = this.simulator.submarines.getCurrentSubmarine();
      this.folders.forEach((gui) => {
        gui.destroy();
      });
      this.initGUIs();
      this.initSelectSubmarineControl();
      this.initDebugGUI();
    });
  }
  /**
   * Initializes the GUI control for selecting the submarine type.
   * Adds a dropdown menu to the debug GUI allowing users to switch between different submarine types.
   */
  initSelectSubmarineControl() {
    const submarineOptions = {
      type: this.simulator.submarines.getCurrentSubmarine().getType(),
    };
    this.controlsdPanel
      .add(submarineOptions, "type", [
        SubmarineType.Typhoon,
        SubmarineType.Ohio,
      ])
      .name("Select Submarine")
      .onChange((type) => {
        this.simulator.submarines.switchSubmarine(type);
      });
  }
  initGUIs() {
    this.simulator.controlGUI = new Debug({
      title: "Controls",
      top: "50px",
      bottom: "auto",
      left: "auth",
      right: "10px",
      width: 320,
    });
    this.simulator.submarineAttributesGUI = new Debug({
      title: "Submarine Attributes",
      top: "406px",
      bottom: "auto",
      left: "auto",
      right: "10px",
      width: 250,
    });
    this.simulator.forcesGUI = new Debug({
      title: "Forces",
      top: "105px",
      bottom: "auto",
      left: "10px",
      right: "auto",
      width: 200,
    });
    this.simulator.linearMotionGUI = new Debug({
      title: "Linear Motion",
      top: "240px",
      bottom: "auto",
      left: "10px",
      right: "auto",
      width: 200,
    });
    this.simulator.angularMotionGUI = new Debug({
      title: "Angular Motion",
      top: "577px",
      bottom: "auto",
      left: "10px",
      right: "auto",
      width: 200,
    });
    this.controlsdPanel = this.simulator.controlGUI.gui;
    this.submarineAttributesPanel = this.simulator.submarineAttributesGUI.gui;
    this.forcesPanel = this.simulator.forcesGUI.gui;
    this.linearMotiondPanel = this.simulator.linearMotionGUI.gui;
    this.angularMotionPanel = this.simulator.angularMotionGUI.gui;
    this.simulator.world.environment.setupAxesHelper();

  }
  /**
   * Initializes the debug GUI with submarine attributes and controls.
   */
  initDebugGUI() {
    const isConstantsFolderEnabled = true;
    const submarineConstantsFolder = this.submarineAttributesPanel;
    this.folders.push(submarineConstantsFolder);
    const submarineConstants = this.submarine.getConstants();
    submarineConstantsFolder
      .add(submarineConstants, "emptyMass")
      .name("Empty Mass (Kg)");
    submarineConstantsFolder
      .add(submarineConstants, "maxMass")
      .name("Max Mass (Kg)");
    submarineConstantsFolder
      .add(submarineConstants, "ballastTankCapacity")
      .name("Ballast Tank Capacity (m³)");
    submarineConstantsFolder.add(submarineConstants, "width").name("Width (m)");
    submarineConstantsFolder
      .add(submarineConstants, "length")
      .name("Length (m)");
    submarineConstantsFolder
      .add(submarineConstants, "volume")
      .name("Volume (m³)");
    submarineConstantsFolder
      .add(submarineConstants, "rotorDiameter")
      .name("Rotor Diameter (m)");
    submarineConstantsFolder
      .add(submarineConstants, "maxRotorRPS")
      .name("Rotor Rounds Per Second (RPS)");
    submarineConstantsFolder
      .add(submarineConstants, "sternPlaneArea")
      .name("Stern Plane Area (m²)");
    submarineConstantsFolder
      .add(submarineConstants, "rudderPlaneArea")
      .name("Rudder Plane Area (m²)");
    submarineConstantsFolder
      .add(submarineConstants, "fairwaterPlaneArea")
      .name("Fairwater Plane Area (m²)");
    submarineConstantsFolder
      .add(submarineConstants, "dragCoefficient")
      .name("Drag Coefficient");
    submarineConstantsFolder
      .add(submarineConstants, "thrustCoefficient")
      .name("Thrust Coefficient");
    submarineConstantsFolder
      .add(submarineConstants, "sternCoefficient")
      .name("Stern Coefficient");
    submarineConstantsFolder
      .add(submarineConstants, "rudderCoefficient")
      .name("Rudder Coefficient");
    submarineConstantsFolder
      .add(submarineConstants, "fairwaterCoefficient")
      .name("Fairwater Coefficient");
    submarineConstantsFolder.controllers.forEach((controller) => {
      if (isConstantsFolderEnabled) {
        controller.enable();
      } else {
        controller.disable();
      }
    });
    const submarineVariablesFolder = this.controlsdPanel;
    this.folders.push(submarineVariablesFolder);
    const submarineVariables = this.submarine.getState();
    submarineVariablesFolder
      .add(submarineVariables, "currentTotalWaterMass")
      .name("Total Water in Tanks (m³)")
      .min(0)
      .max(submarineConstants.getBallastTankCapacity())
      .listen(true)
      .onChange((value) => {
        submarineVariables.setCurrentTotalWaterMass(value);
      });
    submarineVariablesFolder
      .add(submarineVariables, "currentWaterMassFrontTank")
      .name("Water in Front Tank (m³)")
      .min(0)
      .max(submarineConstants.getBallastTankCapacity() / 2)
      .listen(true)
      .onChange((value) => {
        submarineVariables.setCurrentWaterMassFrontTank(value);
      });
    submarineVariablesFolder
      .add(submarineVariables, "currentWaterMassBackTank")
      .name("Water in Back Tank (m³)")
      .min(0)
      .max(submarineConstants.getBallastTankCapacity() / 2)
      .listen(true)
      .onChange((value) => {
        submarineVariables.setCurrentWaterMassBackTank(value);
      });
    submarineVariablesFolder
      .add(submarineVariables, "currentRotorRPS")
      .name("Rotor RPS (s)")
      .min(0)
      .max(submarineConstants.getMaxRotorRPS())
      .step(0.01);
    submarineVariablesFolder
      .add(submarineVariables, "sternAngle")
      .name("Stern Angle (°)")
      .min(-30)
      .max(30)
      .step(1);
    // .listen(true)
    // .onChange((value) => {
    //     this.simulator.world.submarineView.setRudderRotation(THREE.MathUtils.degToRad(Math.PI));
    // });
    submarineVariablesFolder
      .add(submarineVariables, "rudderAngle")
      .name("Rudder Angle (°)")
      .min(-30)
      .max(30)
      .step(1);
    submarineVariablesFolder
      .add(submarineVariables, "fairwaterAngle")
      .name("Fairwater Angle (°)")
      .min(-30)
      .max(30)
      .step(1);
    const forcesFolder = this.forcesPanel;
    this.folders.push(forcesFolder);
    // simulationFolder
    //     .add(this.simulator.time, 'start')
    //     .name("Start")
    // simulationFolder
    //     .add(submarineVariables, 'currentDepth')
    //     .name("Depth (m)")
    //     .disable()
    //     .listen(true)
    forcesFolder
      .add(submarineVariables, "weight")
      .name("Weight (N)")
      .disable()
      .listen(true);
    forcesFolder
      .add(submarineVariables, "buoyancy")
      .name("Buoyancy (N)")
      .disable()
      .listen(true);
    forcesFolder
      .add(submarineVariables, "drag")
      .name("Drag (N)")
      .disable()
      .listen(true);
    forcesFolder
      .add(submarineVariables, "thrust")
      .name("Thrust (N)")
      .disable()
      .listen(true);
    const linearMovementFolder = this.linearMotiondPanel;
    const linearAccelerationFolder = linearMovementFolder.addFolder(
      "Linear Acceleration (m/s²)"
    );
    this.folders.push(linearMovementFolder);
    linearAccelerationFolder
      .add(submarineVariables.currentAcceleration, "x")
      .name("X")
      .disable()
      .listen(true);
    linearAccelerationFolder
      .add(submarineVariables.currentAcceleration, "y")
      .name("Y")
      .disable()
      .listen(true);
    linearAccelerationFolder
      .add(submarineVariables.currentAcceleration, "z")
      .name("Z")
      .disable()
      .listen(true);
    const linearVelocityFolder = linearMovementFolder.addFolder(
      "Linear Velocity (m/s)"
    );
    linearVelocityFolder
      .add(submarineVariables.currentSpeed, "x")
      .name("X")
      .disable()
      .listen(true);
    linearVelocityFolder
      .add(submarineVariables.currentSpeed, "y")
      .name("Y")
      .disable()
      .listen(true);
    linearVelocityFolder
      .add(submarineVariables.currentSpeed, "z")
      .name("Z")
      .disable()
      .listen(true);
    const positionFolder = linearMovementFolder.addFolder("Position (m)");
    positionFolder
      .add(submarineVariables.currentPosition, "x")
      .name("X")
      .disable()
      .listen(true);
    positionFolder
      .add(submarineVariables.currentPosition, "y")
      .name("Y")
      .disable()
      .listen(true);
    positionFolder
      .add(submarineVariables.currentPosition, "z")
      .name("Z")
      .disable()
      .listen(true);
    const angularMovementFolder = this.angularMotionPanel;
    this.folders.push(angularMovementFolder);
    const angularAccelerationFolder = angularMovementFolder.addFolder(
      "Angular Acceleration (rad/s²)"
    );
    angularAccelerationFolder
      .add(submarineVariables.angularAcceleration, "x")
      .name("X")
      .disable()
      .listen(true);
    angularAccelerationFolder
      .add(submarineVariables.angularAcceleration, "y")
      .name("Y")
      .disable()
      .listen(true);
    angularAccelerationFolder
      .add(submarineVariables.angularAcceleration, "z")
      .name("Z")
      .disable()
      .listen(true);
    const angularVelocityFolder = angularMovementFolder.addFolder(
      "Angular Velocity (rad/s)"
    );
    angularVelocityFolder
      .add(submarineVariables.angularVelocity, "x")
      .name("X")
      .disable()
      .listen(true);
    angularVelocityFolder
      .add(submarineVariables.angularVelocity, "y")
      .name("Y")
      .disable()
      .listen(true);
    angularVelocityFolder
      .add(submarineVariables.angularVelocity, "z")
      .name("Z")
      .disable()
      .listen(true);
    const orientationFolder =
      angularMovementFolder.addFolder("Orientation (rad)");
    orientationFolder
      .add(submarineVariables.currentOrientation, "x")
      .name("X")
      .disable()
      .listen(true);
    orientationFolder
      .add(submarineVariables.currentOrientation, "y")
      .name("Y")
      .disable()
      .listen(true);
    orientationFolder
      .add(submarineVariables.currentOrientation, "z")
      .name("Z")
      .disable()
      .listen(true);
    let simulate = this.simulator.time.isRunning;
    const simulationControls = {
      time: "0",
      startSimulation: () => {
        if (!simulate) {
          simulate = true;
          if (startButton._name == "Resume Simulation") {
            this.simulator.time.resume();
          } else {
            this.simulator.time.start();
          }
          startButton.disable();
          pauseBotton.enable();
        }
      },
      pauseSimulation: () => {
        if (simulate) {
          simulate = false;
          this.simulator.time.pause();
          startButton.enable();
          startButton.name("Resume Simulation");
          pauseBotton.disable();
          this.simulator.world.submarineView.engineSound.pause();
        }
      },
    };
    this.simulator.time.on(Events.FrameTick, () => {
      const elapsedTime = this.simulator.time.elapsed;
      simulationControls.time = (elapsedTime / 1000).toFixed(2);
    });
    const timeFolder = this.controlsdPanel.addFolder("Time");
    this.folders.push(timeFolder);
    timeFolder
      .add(simulationControls, "time")
      .name("Elapsed Time (s)")
      .listen()
      .disable();
    const startButton = timeFolder
      .add(simulationControls, "startSimulation")
      .name("Start Simulation")
      .listen();
    const pauseBotton = timeFolder
      .add(simulationControls, "pauseSimulation")
      .name("Pause Simulation")
      .listen();
    if (this.simulator.time.isRunning) {
      startButton.disable();
    } else {
      pauseBotton.disable();
    }
    // const documentationFolder = this.controlsdPanel
    //   .addFolder("Documentation")
    //   .close();
    // this.folders.push(documentationFolder);
    // const documentationControls = {
    //   openDocs: () => {
    //     window.open("../../../docs/index.html", "_blank");
    //   },
    // };
    // documentationFolder
    //   .add(documentationControls, "openDocs")
    //   .name("Open Docs Website");
  }
}
export default SubmarineDebug;
