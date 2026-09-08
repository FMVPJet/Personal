import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const cursorSource = readFileSync("components/magic-cursor.tsx", "utf8");
const canvasSource = readFileSync("components/device-canvas.tsx", "utf8");

test("magic cursor only schedules animation frames while the pointer moves", () => {
  assert.match(cursorSource, /requestAnimationFrame/);
  assert.match(cursorSource, /cancelAnimationFrame/);
  assert.doesNotMatch(cursorSource, /gsap\.ticker\.add/);
});

test("coarse pointer device canvases avoid antialiasing work", () => {
  assert.match(canvasSource, /antialias:\s*!coarsePointer/);
});

test("coarse pointer device canvases use a sharper bounded pixel ratio", () => {
  assert.match(canvasSource, /dpr=\{coarsePointer \? \[1, 1\.75\] : \[1, 1\.25\]\}/);
});
