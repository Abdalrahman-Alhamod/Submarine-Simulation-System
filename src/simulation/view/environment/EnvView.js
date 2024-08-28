import * as TIME from "./scripts/Time.js";
import * as SCENE from "./scripts/Scene.js";
import * as INPUT from "./scripts/Input.js";
import * as CONTROL from "./scripts/Control.js";
import * as UI from "./scripts/UI.js";
import * as DEBUG from "./scripts/Debug.js";
import * as SETTINGS from "./shaders/Settings.js";
import Camera from '../Camera.js';
export function init(simulator) {
  TIME.Start();
  SETTINGS.Start();
  SCENE.Start(simulator);
  INPUT.Start();
  CONTROL.Start();
  UI.Start();
  DEBUG.Start();
}

export function update(controlCamera) {
  DEBUG.Begin();

  TIME.Update();
  SCENE.Update();
  INPUT.Update();

  CONTROL.Update(controlCamera);
  UI.Update();
  DEBUG.Update(controlCamera);

  DEBUG.End();
}
