import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const homeSource = readFileSync("app/page.tsx", "utf8");
const aboutSource = readFileSync("components/about-section.tsx", "utf8");
const experienceSource = readFileSync("components/home-experience.tsx", "utf8");
const canvasSource = readFileSync("components/device-canvas.tsx", "utf8");
const phoneSource = readFileSync("components/devices/phone.tsx", "utf8");
const galleryShellSource = readFileSync("components/gallery-shell.tsx", "utf8");
const stylesSource = readFileSync("styles/gallery.css", "utf8");

test("homepage owns the device view without a dedicated devices route", () => {
  assert.match(homeSource, /HomeExperience/);
  assert.match(experienceSource, /AboutSection/);
  assert.match(experienceSource, /DeviceGrid/);
  assert.match(aboutSource, /onDevicesClick/);
  assert.doesNotMatch(aboutSource, /href="\/devices"|from "next\/link"/);
  assert.equal(existsSync("app/devices/page.tsx"), false);
});

test("gallery shell does not render the social and contact footer block", () => {
  assert.doesNotMatch(galleryShellSource, /Follow me on|Say hello at|add me on WeChat/);
  assert.doesNotMatch(galleryShellSource, /g-footer-container/);
});

test("homepage exits from blank space while protecting device gestures", () => {
  assert.match(experienceSource, /onClick=\{handleBlankClick\}/);
  assert.match(experienceSource, /onPointerDownCapture=\{handlePointerDownCapture\}/);
  assert.match(experienceSource, /onPointerCancelCapture=\{handlePointerCancelCapture\}/);
  assert.match(experienceSource, /closest\("\.device-model-hit-area"\)/);
  assert.match(experienceSource, /exitDevices\(\)/);
  assert.doesNotMatch(experienceSource, /router\.push|g-devices-back|Back home/);
  assert.doesNotMatch(stylesSource, /\.g-devices-back|\.g-devices-page/);
});

test("device gestures retain their origin marker through an outside release", () => {
  assert.match(experienceSource, /startedOnDevice/);
  assert.match(experienceSource, /if \(clickedInsideDevice \|\| gestureRef\.current\.startedOnDevice\)/);
  assert.match(experienceSource, /gestureRef\.current\.startedOnDevice = false/);
});

test("only the model hit area owns device rotation gestures", () => {
  assert.match(canvasSource, /device-model-hit-area/);
  assert.match(canvasSource, /domElement=\{interactionElement\}/);
  assert.match(stylesSource, /\.device-model-hit-area[\s\S]*pointer-events:\s*auto;/);
});

test("mobile device canvases preserve vertical page scrolling", () => {
  assert.match(stylesSource, /\.g-device-view\s*\{[\s\S]*touch-action:\s*pan-y;/);
  assert.match(
    stylesSource,
    /\.device-model-hit-area\s*\{[\s\S]*touch-action:\s*pan-y\s*!important;/,
  );
});

test("mobile device swipes scroll vertically while preserving model rotation", () => {
  assert.doesNotMatch(canvasSource, /enableRotate=\{!coarsePointer\}/);
  assert.match(
    stylesSource,
    /@media\s*\(pointer:\s*coarse\)[\s\S]*\.device-model-hit-area\s*\{[\s\S]*touch-action:\s*pan-y\s*!important;/,
  );
});

test("device view stays visually clean without archive chrome", () => {
  assert.doesNotMatch(experienceSource, /g-device-toolbar|Back to profile|Everyday essentials|g-device-hint/);
  assert.doesNotMatch(stylesSource, /g-device-toolbar|g-device-hint/);
});

test("phone model meets the shared contact shadow plane", () => {
  assert.match(phoneSource, /position=\{\[0, 0\.55, 0\]\}/);
});
