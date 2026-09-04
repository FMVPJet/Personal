import assert from "node:assert/strict";
import test from "node:test";

import {
  getDeviceAnimationMetadata,
  getDeviceEntryVector,
  getDeviceTransitionDelay,
  getDeviceTransitionDuration,
} from "../lib/device-transition.mjs";

function assertVector(vector, expectedX, expectedY) {
  assert.ok(Math.abs(vector.x - expectedX) < 0.000001, `x should be ${expectedX}`);
  assert.ok(Math.abs(vector.y - expectedY) < 0.000001, `y should be ${expectedY}`);
}

test("four device models enter from the corners matching their grid positions", () => {
  const vectors = [0, 1, 2, 3].map((index) => getDeviceEntryVector(index, 4));

  assertVector(vectors[0], -52, -42);
  assertVector(vectors[1], 52, -42);
  assertVector(vectors[2], -52, 42);
  assertVector(vectors[3], 52, 42);
});

test("non-four model counts use evenly spaced clockwise perimeter vectors", () => {
  const vector = getDeviceEntryVector(1, 5);
  const angle = -Math.PI / 2 + (2 * Math.PI) / 5;

  assertVector(vector, Math.cos(angle) * 58, Math.sin(angle) * 48);
});

test("device transition timing scales with the model index and count", () => {
  assert.equal(getDeviceTransitionDelay(0), 0);
  assert.equal(getDeviceTransitionDelay(3), 270);
  assert.equal(getDeviceTransitionDuration(1), 760);
  assert.equal(getDeviceTransitionDuration(4), 1030);
  assert.equal(getDeviceTransitionDuration(0), 760);
});

test("animation metadata combines vector, delay, and duration", () => {
  assert.deepEqual(getDeviceAnimationMetadata(2, 4), {
    entryX: -52,
    entryY: 42,
    delay: 180,
    duration: 1030,
  });
});
