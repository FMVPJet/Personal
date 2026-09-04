import test from "node:test";
import assert from "node:assert/strict";

import { getDeviceIdFromObserverTarget } from "../lib/device-visibility.mjs";

test("observer target can resolve a device id from its ancestor", () => {
  const deviceTile = { dataset: { deviceId: "macbook-pro" }, parentElement: null };
  const innerCanvasStage = { dataset: {}, parentElement: deviceTile };

  assert.equal(getDeviceIdFromObserverTarget(innerCanvasStage), "macbook-pro");
});
