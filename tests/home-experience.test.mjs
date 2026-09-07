import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const pageSource = readFileSync("app/page.tsx", "utf8");
const aboutSource = readFileSync("components/about-section.tsx", "utf8");
const gridSource = readFileSync("components/device-grid.tsx", "utf8");
const stylesSource = readFileSync("styles/gallery.css", "utf8");
const experienceSource = existsSync("components/home-experience.tsx")
  ? readFileSync("components/home-experience.tsx", "utf8")
  : "";

test("homepage owns the profile and device views without a device route", () => {
  assert.match(pageSource, /HomeExperience/);
  assert.doesNotMatch(pageSource, /DeviceGrid|href=["']\/devices/);
  assert.match(aboutSource, /<button[\s\S]*Devices[\s\S]*<\/button>/);
  assert.doesNotMatch(aboutSource, /href=["']\/devices/);
});

test("home experience coordinates view state, accessibility, and focus", () => {
  assert.match(experienceSource, /useState/);
  assert.match(experienceSource, /["']profile["']/);
  assert.match(experienceSource, /["']devices["']/);
  assert.match(experienceSource, /is-exiting/);
  assert.match(experienceSource, /is-device-ready/);
  assert.match(experienceSource, /Escape/);
  assert.match(experienceSource, /useRef/);
  assert.match(experienceSource, /inert/);
  assert.match(experienceSource, /aria-hidden/);
  assert.match(experienceSource, /onPointerDownCapture/);
  assert.match(experienceSource, /onPointerCancelCapture/);
  assert.match(experienceSource, /closest\(["']\.device-item["']\)/);
  assert.match(experienceSource, /gestureRef/);
});

test("device grid derives animation metadata and focusability from its data", () => {
  assert.match(gridSource, /isInteractive/);
  assert.match(gridSource, /getDeviceAnimationMetadata/);
  assert.match(gridSource, /devices\.length/);
  assert.match(gridSource, /tabIndex=\{isInteractive \? 0 : -1\}/);
  assert.match(gridSource, /style=\{[^}]*animationMetadata/s);
});

test("homepage styles define the radial device overlay states", () => {
  assert.match(stylesSource, /\.g-home-experience/);
  assert.match(stylesSource, /\.g-device-view/);
  assert.match(experienceSource, /--device-transition-duration/);
  assert.match(stylesSource, /--device-entry-x/);
  assert.match(stylesSource, /760ms/);
  assert.match(stylesSource, /90ms/);
  assert.match(stylesSource, /cubic-bezier\(0\.22, 0\.8, 0\.18, 1\)/);
  assert.match(stylesSource, /prefers-reduced-motion: reduce[\s\S]*\.g-device-view/);
});

test("homepage profile fades in progressively during device exit", () => {
  assert.match(stylesSource, /\.g-home-experience\.g-view-devices\.is-exiting \.g-about-long-page/);
  assert.match(stylesSource, /@keyframes g-profile-return/);
  assert.match(stylesSource, /g-profile-return 720ms/);
  assert.match(stylesSource, /220ms both/);
});

test("homepage profile keeps the avatar close to the bio copy", () => {
  assert.match(stylesSource, /\.g-about-row\.g-about-bio\s*\{[\s\S]*gap:\s*clamp\(32px, 4vw, 64px\);/);
});
