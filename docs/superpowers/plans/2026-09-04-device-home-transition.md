# Homepage Device Transition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the standalone device catalog into an in-place homepage state where the profile hides and data-driven 3D models converge from the surrounding edges while the URL remains `/`.

**Architecture:** A new client `HomeExperience` owns the profile/device view state, transition lifecycle, focus management, Escape handling, and blank-space exit gesture. `AboutSection` and `DeviceGrid` remain focused children; the grid stays mounted and receives generated per-item animation metadata so WebGL state survives transitions. CSS state classes handle the visual overlay and reversible motion.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, CSS transitions, React Three Fiber/Drei, Node’s built-in test runner.

---

## File map

- Create `components/home-experience.tsx`: client-side view-state orchestrator and transition lifecycle.
- Create `lib/device-transition.mjs`: deterministic entry-vector and timing helpers shared by the grid and tests.
- Modify `app/page.tsx`: render `HomeExperience` as the only homepage content.
- Modify `components/about-section.tsx`: accept orchestrator props and render `Devices` as an accessible state button.
- Modify `components/device-grid.tsx`: accept interactivity state and attach generated animation variables to each tile.
- Modify `styles/gallery.css`: add the homepage/device overlay states, radial motion, readiness gating, focus helper, and reduced-motion behavior; remove dedicated-page-only device rules.
- Delete `app/devices/page.tsx`: remove the standalone route.
- Modify `tests/home-hero.test.mjs`: update expectations from route link to state button.
- Modify `tests/devices-page.test.mjs`: replace standalone-page tests with homepage ownership, no-route, and gesture-state assertions.
- Create `tests/device-transition.test.mjs`: unit-test deterministic vectors and timing for one, three, four, and five-plus models.
- Create `tests/home-experience.test.mjs`: source-level regression tests for view state, accessibility attributes, focus/keyboard behavior, readiness, and gesture suppression.

## Task 1: Define deterministic transition metadata

**Files:**
- Create: `lib/device-transition.mjs`
- Create: `tests/device-transition.test.mjs`

- [ ] **Step 1: Write failing helper tests.**

  Test `getDeviceEntryVector(index, count)` for the four-model order `(-52,-42)`, `(52,-42)`, `(52,42)`, `(-52,42)`; test non-four counts using the top-origin clockwise perimeter formula; test `getDeviceTransitionDuration(count)` returns `760 + max(0, count - 1) * 90`; test each index delay is `index * 90`.

- [ ] **Step 2: Run the focused tests and confirm the expected failure.**

  Run: `node --test tests/device-transition.test.mjs`

  Expected: FAIL because `lib/device-transition.mjs` does not exist yet.

- [ ] **Step 3: Implement the minimal helper.**

  Export pure functions for vector, delay, duration, and CSS-variable-ready metadata. Use the explicit corner table only when `count === 4`; otherwise use `angle = -Math.PI / 2 + index * 2 * Math.PI / count`, with `x = Math.cos(angle) * 58` and `y = Math.sin(angle) * 48`. Clamp invalid/empty counts so tests and rendering never produce `NaN`.

- [ ] **Step 4: Run the focused tests and confirm they pass.**

  Run: `node --test tests/device-transition.test.mjs`

  Expected: all vector/timing cases PASS.

## Task 2: Add the homepage state orchestrator

**Files:**
- Create: `components/home-experience.tsx`
- Modify: `app/page.tsx`
- Modify: `components/about-section.tsx`
- Create: `tests/home-experience.test.mjs`
- Modify: `tests/home-hero.test.mjs`

- [ ] **Step 1: Write failing source regression tests.**

  Assert the homepage renders `HomeExperience` and no longer references `/devices` or `DeviceGrid` directly; assert the experience has `profile`/`devices` state, `is-exiting`, `is-device-ready`, an `Escape` listener, focus refs, `inert`/`aria-hidden`, and a `Devices` button callback. Assert pointer-cancel clears the gesture marker, pointerdown checks the nearest `.device-item` ancestor (including canvas/fallback descendants), and blank click consumes a gesture that began inside a device. Preserve the existing hero content-order and no-card-easter-egg assertions.

- [ ] **Step 2: Run the focused tests and confirm the expected failures.**

  Run: `node --test tests/home-experience.test.mjs tests/home-hero.test.mjs`

  Expected: FAIL on the old route-link/direct-grid expectations and missing orchestrator source.

- [ ] **Step 3: Implement `HomeExperience` and update the button contract.**

  Move the homepage JSX under `HomeExperience`. Keep `DeviceGrid` mounted, track `view`, `isExiting`, and `isDeviceReady`, and schedule readiness at `760 + (devices.length - 1) * 90` ms. On exit, keep device mode visually active while models reverse, hide the layer after the same duration, then restore profile and focus the `Devices` button. Register `Escape` to exit. Record pointerdown origin with `event.target.closest(".device-item")`, clear it on `pointercancel`, and in the root click handler consume both clicks inside `.device-item` and clicks outside it whose pointerdown began in a model; only a click that began and ended outside a model exits device mode.

  Make `AboutSection` a client component with an `onDevicesClick` callback, `aria-pressed`, a button ref, and hidden/inert props. Replace the `next/link` device link with a button. `app/page.tsx` should render `GalleryShell` and `HomeExperience` only.

- [ ] **Step 4: Run the focused tests and confirm they pass.**

  Run: `node --test tests/home-experience.test.mjs tests/home-hero.test.mjs`

  Expected: all homepage state and hero regression tests PASS.

## Task 3: Make the device grid transition-aware and extensible

**Files:**
- Modify: `components/device-grid.tsx`
- Modify: `lib/device-transition.mjs` if helper metadata needs a non-breaking adjustment.
- Modify: `tests/device-transition.test.mjs`
- Modify: `tests/home-experience.test.mjs`

- [ ] **Step 1: Extend failing tests for grid metadata and readiness.**

  Assert each mapped device receives index/count-derived CSS variables and that non-ready tiles use `tabIndex={-1}` / the non-interactive state while ready tiles restore `tabIndex={0}`. Assert the device count is read from the `devices` data, not hard-coded to four.

- [ ] **Step 2: Run the focused tests and confirm the expected failure.**

  Run: `node --test tests/device-transition.test.mjs tests/home-experience.test.mjs`

  Expected: FAIL on missing grid metadata/readiness behavior.

- [ ] **Step 3: Implement the minimal grid changes.**

  Add an `isInteractive` prop to `DeviceGrid` and `DeviceTile`; use the transition helper for per-item inline custom properties; gate tile focus and pointer interaction based on `isInteractive`. Keep existing model registry, visibility observer, fallback rendering, and rotation controls unchanged.

- [ ] **Step 4: Run the focused tests and confirm they pass.**

  Run: `node --test tests/device-transition.test.mjs tests/home-experience.test.mjs`

  Expected: all metadata/readiness tests PASS.

## Task 4: Implement the radial overlay motion and responsive states

**Files:**
- Modify: `styles/gallery.css`
- Modify: `tests/home-experience.test.mjs`

- [ ] **Step 1: Write failing CSS/source assertions.**

  Assert the stylesheet contains the experience/device state selectors, the `760ms` transition, `90ms` stagger variable usage, the selected easing, reduced-motion overrides, and profile/device visibility contracts.

- [ ] **Step 2: Run the focused tests and confirm the expected failure.**

  Run: `node --test tests/home-experience.test.mjs`

  Expected: FAIL because the overlay-state selectors do not exist.

- [ ] **Step 3: Add the visual implementation.**

  Position the device layer over the full hero without changing document URL. In profile mode, hide and inert the device layer; in device mode, fade/translate the profile away and animate each tile from its custom vector into the existing grid position with index delay. Keep the device layer non-interactive until ready; disable it immediately during exit. After the exit window, hide the layer and reveal the profile. Add a visually hidden, focusable device-region label and preserve desktop/mobile grid rules. Add reduced-motion rules that remove travel/scale/rotation while making the layer ready on the next render.

  Detect reduced motion with `window.matchMedia("(prefers-reduced-motion: reduce)")` in the orchestrator. Use `requestAnimationFrame` (not the full animation timer) to mark the device layer ready when reduced motion is active; use the deterministic duration timer otherwise.

- [ ] **Step 4: Run the focused tests and confirm they pass.**

  Run: `node --test tests/home-experience.test.mjs`

  Expected: all motion/accessibility source assertions PASS.

## Task 5: Remove the standalone route and update regression coverage

**Files:**
- Delete: `app/devices/page.tsx`
- Modify: `tests/devices-page.test.mjs`
- Modify: `styles/gallery.css`

- [ ] **Step 1: Write/update failing route-ownership tests.**

  Assert the standalone page file is absent, the homepage is the sole production owner of `DeviceGrid`, no production code contains `href="/devices"` or `router.push("/devices")`, and dedicated-page-only selectors are absent. Preserve the footer/social removal regression.

- [ ] **Step 2: Run the focused tests and confirm the expected failure.**

  Run: `node --test tests/devices-page.test.mjs`

  Expected: FAIL while the old route file and old expectations remain.

- [ ] **Step 3: Remove the route and stale dedicated-page code.**

  Delete `app/devices/page.tsx`, remove obsolete `.g-devices-page`/dedicated-page-only styles, and update the tests to inspect the new homepage architecture.

- [ ] **Step 4: Run the focused tests and confirm they pass.**

  Run: `node --test tests/devices-page.test.mjs`

  Expected: all route-ownership tests PASS.

## Task 6: Full verification and browser smoke check

**Files:**
- No planned source changes; fix only if verification exposes an issue.

- [ ] **Step 1: Run the complete regression suite.**

  Run: `npm test`

  Expected: zero failures.

- [ ] **Step 2: Run the production build.**

  Run: `npm run build`

  Expected: Next compilation, type checking, static generation, and route collection succeed. `/` is present; `/devices` is not listed.

- [ ] **Step 3: Run a fresh browser smoke check at `/`.**

  Start the app with `npm run dev`, open `http://localhost:3000/` in the in-app browser, and use these observable hooks: `[data-view="profile"]`, `[data-view="devices"]`, `[data-device-ready="true"]`, `.g-about-long-page`, `.g-device-view`, and `.device-item`. Verify the URL remains `/`; clicking the `Devices` button hides the profile and converges the models; each model remains rotatable after `[data-device-ready="true"]`; rotating a model toward the edge does not exit; blank-space click and `Escape` restore the profile; focus returns to `Devices`; reduced-motion mode skips travel. If browser automation is unavailable, perform this exact sequence manually in the browser and record any visible failure before changing code.

- [ ] **Step 4: Review the final diff and status.**

  Run: `git diff --check` and `git status --short`.

  Expected: no whitespace errors, only intended implementation files changed, and no generated cache files staged.
