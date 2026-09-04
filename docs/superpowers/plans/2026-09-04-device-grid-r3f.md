# Procedural Device Grid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage's eight clickable photo/project items with four non-navigating procedural React Three Fiber device tiles for a black 14-inch MacBook Pro-style laptop, keyboard, mouse, and phone.

**Architecture:** Keep `GalleryShell` and the existing `.g-grid`/`.g-item` layout. Replace `PhotoGrid` with a client-side `DeviceGrid` driven by serializable `config/devices.ts` records. `DeviceGrid` owns the typed `modelType` → model-component registry and passes the resolved component into a client-only `DeviceCanvas`; `DeviceCanvas` hosts that procedural model and its interaction policy. `SourceMotion` remains the single owner of the global hover caption while `DeviceGrid` owns model emphasis and accessibility state.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, `three`, `@react-three/fiber`, `@react-three/drei`, GSAP 3.15, IntersectionObserver, Node tests already used by the project, and browser verification.

---

## File map

### Create

- `config/devices.ts` — serializable four-device records with `modelType`, name, label, and `tileVariant`.
- `components/device-grid.tsx` — four-tile homepage grid, hover/focus state, caption data attributes, no links.
- `components/device-canvas.tsx` — client-only R3F Canvas boundary, camera/lights/controls, reduced-motion and visibility policy, WebGL fallback.
- `components/devices/model-types.ts` — shared minimal model props and model registry types.
- `components/devices/macbook-pro.tsx` — procedural black laptop model.
- `components/devices/keyboard.tsx` — procedural low-profile keyboard model.
- `components/devices/mouse.tsx` — procedural rounded mouse model.
- `components/devices/phone.tsx` — procedural dark phone model.
- `tests/device-grid.test.mjs` — pure configuration/contract tests for four devices and non-link behavior.

### Modify

- `app/page.tsx` — render `DeviceGrid` instead of `PhotoGrid`.
- `components/source-motion.tsx` — target `.g-item-wrap` tile wrappers instead of anchors and read device caption data attributes.
- `styles/gallery.css` — add device tile/canvas/fallback/focus styles.
- `package.json` and `package-lock.json` — add React 19-compatible `three`, `@react-three/fiber`, and `@react-three/drei` releases.

### Leave unchanged

- `components/photo-grid.tsx` — keep the old project grid available for reference or future route-specific use, but do not import it from the homepage.
- Project detail routes, Blog, About, PhotoSwipe, and existing source-motion modules unrelated to the homepage grid.
- `card.glb` — never load it.

---

### Task 0: Capture and protect the existing worktree baseline

**Files:**

- Read only: current worktree status and diffs.

- [ ] **Step 1: Record the baseline before touching implementation files**

Run:

```bash
git status --short
git diff --name-status
git ls-files --others --exclude-standard
```

Save the output outside the repository if needed for comparison. The current project is known to contain pre-existing modifications and untracked files; they belong to the user and must not be discarded or silently included in unrelated commits.

- [ ] **Step 2: Inspect overlap before each edit**

For any file already modified at baseline (`app/page.tsx`, `package.json`, `package-lock.json`, `styles/gallery.css`, `components/source-motion.tsx`, or tests), inspect the current contents and apply only the requested hunks with `apply_patch`. Do not use reset/checkout/clean commands and do not stage broad globs.

- [ ] **Step 3: Establish the staging rule**

When a touched file contains baseline work, review `git diff` and stage only the directly related hunks with `git add --patch` or leave the combined file unstaged for the user. At final verification, compare status against the captured baseline rather than expecting a clean worktree.

### Task 1: Add the R3F runtime dependencies

**Files:**

- Modify: `/Users/taotao/Project/Personal/package.json`
- Modify: `/Users/taotao/Project/Personal/package-lock.json`

- [ ] **Step 1: Install the required packages**

Run from `/Users/taotao/Project/Personal`:

```bash
npm install three @react-three/fiber @react-three/drei
```

Expected: `package.json` contains all three packages and `npm install` completes without changing unrelated dependencies.

- [ ] **Step 2: Verify the dependency graph**

```bash
npm ls three @react-three/fiber @react-three/drei
```

Expected: one resolved version for each package and no invalid peer dependency error for React 19.

- [ ] **Step 3: Review and stage only the dependency diff**

```bash
git diff -- package.json package-lock.json
git add --patch package.json package-lock.json
git diff --cached --name-only
```

The staged diff must contain only the three requested dependency additions and their lockfile resolution. If the dependency files contain unrelated baseline changes that cannot be separated safely, leave them unstaged and report that in the final handoff. Commit only after reviewing the staged diff:

```bash
git commit -m "feat: add react three fiber runtime"
```

### Task 2: Define device data and model contracts

**Files:**

- Create: `/Users/taotao/Project/Personal/config/devices.ts`
- Create: `/Users/taotao/Project/Personal/components/devices/model-types.ts`
- Create: `/Users/taotao/Project/Personal/tests/device-grid.test.mjs`

- [ ] **Step 1: Write executable data-contract tests**

Because the existing test command runs Node directly and does not have a TypeScript loader, keep this test executable as `.mjs`: read `config/devices.ts` as text and assert the exported source contains the exact four IDs/order, required fields (`id`, `modelType`, `name`, `accessibleLabel`, `tileVariant`), and no `href`, `slug`, or project destination. Browser verification will cover rendered DOM behavior.

- [ ] **Step 2: Run the focused test**

```bash
node --test tests/device-grid.test.mjs
```

Expected: FAIL because the device config does not yet exist.

- [ ] **Step 3: Implement the serializable records**

Use a required `id` plus literal unions for `modelType` (`"macbook-pro" | "keyboard" | "mouse" | "phone"`) and `tileVariant` (`"full" | "half"`). Use the approved grid rhythm: MacBook full, keyboard half, mouse full, phone half. Keep `accessibleLabel` equal to the visible `name` for this iteration so the DOM contract can use `aria-label={name}` without ambiguity. Do not store React components in the config.

Define a minimal model component contract:

```ts
export interface ProceduralModelProps {
  scale?: number;
}
```

Keep the registry in `DeviceGrid` and pass a resolved `React.ComponentType<ProceduralModelProps>` into `DeviceCanvas`; do not make `DeviceCanvas` resolve from config and do not put React components in the serializable config. Registry type validation is completed in Task 5 after `DeviceGrid` owns the registry.

- [ ] **Step 4: Run the focused test**

```bash
node --test tests/device-grid.test.mjs
```

Expected: PASS.

- [ ] **Step 5: Commit the data contract**

```bash
git add config/devices.ts components/devices/model-types.ts tests/device-grid.test.mjs
git commit -m "feat: define procedural device catalog"
```

### Task 3: Build the four procedural device models

**Files:**

- Create: `/Users/taotao/Project/Personal/components/devices/macbook-pro.tsx`
- Create: `/Users/taotao/Project/Personal/components/devices/keyboard.tsx`
- Create: `/Users/taotao/Project/Personal/components/devices/mouse.tsx`
- Create: `/Users/taotao/Project/Personal/components/devices/phone.tsx`

- [ ] **Step 1: Implement the laptop model**

Use Drei `RoundedBox` and native Three materials for a black anodized base, thin display lid, bezel, dark reflective screen, hinge, keyboard deck, bounded key grid, trackpad, and feet. Keep the model centered near the origin with its own sensible local scale. Screen content must be procedural rather than an external image.

- [ ] **Step 2: Implement the keyboard model**

Use a rounded base and reusable keycap primitive. Keep total keycaps at or below 80; include visibly wider space/shift/return keys without per-frame allocations.

- [ ] **Step 3: Implement the mouse model**

Use a rounded/capsule shell with a separate top shell, center seam, and recessed wheel. Keep it low-poly enough for a small tile.

- [ ] **Step 4: Implement the phone model**

Use a rounded slab body, inset glass face, side buttons, camera island, and lens pieces. Tilt it slightly so the silhouette reads in the grid.

- [ ] **Step 5: Check each model export contract**

Export each model as a `React.ComponentType<ProceduralModelProps>`. Every model must use stable geometry/material objects and avoid per-frame allocations; this applies to the laptop, keyboard, mouse, and phone, not only the keyboard. Registry mapping is checked in Task 5, where the registry is owned.

- [ ] **Step 6: Run type checking**

```bash
npx tsc --noEmit
```

Expected: PASS for the new model components.

- [ ] **Step 7: Commit the model components**

```bash
git add components/devices/model-types.ts components/devices/macbook-pro.tsx components/devices/keyboard.tsx components/devices/mouse.tsx components/devices/phone.tsx
git diff --cached --name-only
git commit -m "feat: add procedural device models"
```

Stage only these exact newly-created model paths; never stage the entire `components/devices` directory.

### Task 4: Build the R3F Canvas and resilience policy

**Files:**

- Create: `/Users/taotao/Project/Personal/components/device-canvas.tsx`

- [ ] **Step 1: Implement the Canvas boundary**

Create a client component with a top-level `"use client"` directive accepting a resolved `modelComponent`, `name`, `accessibleLabel`, and `isActive`. Do not import or resolve the registry here. Render a perspective camera, ambient light, one directional light, low-resolution contact shadow, and bounded `OrbitControls`. Cap DPR at `1.5` on desktop and `1.25` on coarse pointers. Browser-only capability and media-query checks must run after mount; the initial hydration-safe state renders the named static fallback/loading surface. The semantic wrapper, not the inner Canvas, owns `role="img"`, `tabIndex={0}`, and `aria-label={name}`.

- [ ] **Step 2: Implement motion policy**

Use `prefers-reduced-motion` and pointer capability checks. Desktop visible tiles use `frameloop="always"` only while auto-rotation is enabled and the tile is visible; reduced-motion/coarse-pointer tiles use `frameloop="demand"` with no auto-rotation. On OrbitControls `onChange`, call `invalidate()` while direct manipulation is active; on `onStart`/`onEnd`, pause/resume auto-rotation. The tile IntersectionObserver switches an off-screen tile to demand mode with no invalidation and restores the continuous mode when it re-enters. Use `enablePan={false}`, `minPolarAngle={1.05}`, `maxPolarAngle={1.75}`, `minDistance={3.8}`, and `maxDistance={7}` (or tighter values if the model needs them).

- [ ] **Step 3: Implement fallback behavior**

Add a post-mount WebGL capability check before mounting the scene and a React error boundary around the Canvas. Support debug query parameters `?device-webgl=off` and `?device-webgl=error` only when `process.env.NODE_ENV !== "production"`; production must ignore these test hooks. Render a neutral dark fallback silhouette/gradient with the same visible name and accessible label if WebGL is unavailable or the scene errors. Keep the fallback DOM discoverable for tests.

- [ ] **Step 4: Add focus and touch semantics**

The semantic wrapper must expose `role="img"`, `tabIndex={0}`, and `aria-label={name}`; `accessibleLabel` must equal `name` in the config and is used as the fallback text contract. Coarse pointers keep the name visible, do not render OrbitControls, and do not require model dragging. All R3F and browser-only hooks remain behind the client boundary and mount-time checks.

- [ ] **Step 5: Run type checking and build**

```bash
npx tsc --noEmit
npm run build
```

Expected: both commands PASS and all existing routes still generate. DeviceCanvas must remain safe for SSR/hydration because all browser-only checks are deferred until mount.

- [ ] **Step 6: Hand off the Canvas boundary for grid integration**

```bash
git diff -- components/device-canvas.tsx
```

Do not stage `styles/gallery.css` in this task; CSS ownership belongs to Task 5.

### Task 5: Replace the homepage grid and wire source-style hover captions

**Files:**

- Create: `/Users/taotao/Project/Personal/components/device-grid.tsx`
- Modify: `/Users/taotao/Project/Personal/app/page.tsx`
- Modify: `/Users/taotao/Project/Personal/components/source-motion.tsx`
- Modify: `/Users/taotao/Project/Personal/styles/gallery.css`
- Modify: `/Users/taotao/Project/Personal/tests/device-grid.test.mjs`

- [ ] **Step 1: Extend the homepage contract test**

Assert that the four device records contain no `href`, `slug`, or project destination and that the labels match the four approved device names.

- [ ] **Step 2: Implement `DeviceGrid`**

Add a top-level `"use client"` directive. Render the existing `#portfolio.title-big.g-grid` structure with four `.g-item` wrappers and `.g-item-wrap` non-link elements. Add `data-title` and `data-category-label` equivalents for the global caption. Apply `is-wide` only from `tileVariant`; define and type the local `modelType` → component registry here, then pass the resolved component to `DeviceCanvas`. Assert the registry covers all four model types at compile time. Track active/hover/focus device state only for model emphasis. Add `data-device-visible` and `data-render-mode` attributes so visibility/demand-mode behavior is observable during verification. The tile wrapper owns `role="img"`, `tabIndex={0}`, and `aria-label={name}` through `DeviceCanvas`.

- [ ] **Step 3: Remove the homepage filter UI**

Do not render the old categories button/sidebar from `PhotoGrid`. Keep `PhotoGrid` untouched for reference, but ensure `app/page.tsx` imports only `DeviceGrid`.

- [ ] **Step 4: Retarget `SourceMotion`**

Change the portfolio hover selector from anchor elements to generic `HTMLElement` tile wrappers. Keep `SourceMotion` as the single owner of the global `.g-big-title-caption` GSAP show/hide behavior; do not add duplicate caption listeners in `DeviceGrid`.

- [ ] **Step 5: Update homepage CSS**

Preserve grid widths, margins, and responsive breakpoints. Add model-stage sizing, focus state, fallback state, and always-visible coarse-pointer labels. Require the existing two-column layout at desktop/tablet, one-column stacking below the mobile breakpoint, and a reduced canvas height on narrow screens. Ensure the existing `.g-main` flow-root/footer fix remains intact.

- [ ] **Step 6: Run focused and full tests**

```bash
node --test tests/device-grid.test.mjs
npm test
```

Expected: both PASS; existing project data tests remain green. The `.mjs` contract test must not import `config/devices.ts` directly.

- [ ] **Step 7: Commit the homepage integration**

```bash
git diff -- app/page.tsx components/device-grid.tsx components/source-motion.tsx styles/gallery.css tests/device-grid.test.mjs
git add --patch app/page.tsx components/device-grid.tsx components/source-motion.tsx styles/gallery.css tests/device-grid.test.mjs
git diff --cached --name-only
```

Review staged hunks before committing; do not stage unrelated baseline changes. New files wholly owned by this feature may be staged by exact path; if any target path was already baseline-untracked, separate its content manually and leave ambiguous hunks unstaged. Commit only the reviewed staged hunks.

### Task 6: Browser verification and cleanup

**Files:**

- Read only by default. If verification uncovers a directly related defect, modify the exact affected file and rerun the relevant checks; do not use a placeholder path or stage unrelated baseline work.

- [ ] **Step 1: Run the production build**

```bash
npm run build
```

Expected: successful compilation, lint/type validation, and generation of the existing routes.

- [ ] **Step 2: Start the production server**

```bash
npm run start
```

Use a browser on the served port for verification; do not run dev and build concurrently.

- [ ] **Step 3: Verify homepage structure**

Confirm there are exactly four `.g-item` device tiles, no homepage project `href`, no filter sidebar, and the footer remains below the grid. Confirm every tile has `role="img"`, `tabIndex="0"`, and its expected `aria-label`.

- [ ] **Step 4: Verify visible 3D behavior**

Confirm four device scenes render; hover/focus reveals the correct names; the MacBook tile can be dragged to rotate; auto-rotation is subtle; model emphasis does not move the global caption out of view. Capture console/page errors and require zero runtime errors.

- [ ] **Step 5: Verify fallback and motion modes**

Run the development server for the test-only query hooks, navigate with `?device-webgl=off` and `?device-webgl=error`, and confirm every fallback displays the expected device name and accessible label without crashing. Use reduced-motion and a narrow/coarse-pointer viewport to confirm one-column stacking, reduced canvas height, names remain readable, `data-render-mode="demand"` is exposed, auto-rotation is disabled, OrbitControls are absent, and page scrolling is not trapped by the canvas. Scroll tiles out of view and back into view to confirm the `data-device-visible` and render-mode values switch and recover. Run the production server separately to confirm the debug hooks are ignored.

- [ ] **Step 6: Run final static checks**

```bash
npm test
git diff --check
git status --short
```

Expected: tests pass, no whitespace errors, and the final status is compared with the Task 0 baseline. Do not require a clean worktree and do not stage or alter unrelated pre-existing changes. If a directly related verification fix is needed, patch the exact file, review only that diff, and commit it only after confirming it does not include baseline hunks.

## Acceptance criteria

- Homepage contains exactly four device tiles and no image cards or homepage project links.
- MacBook, keyboard, mouse, and phone are visible as procedural R3F geometry without loading `card.glb`.
- Hover/focus reveals the matching device name through the existing GSAP caption system.
- Desktop supports bounded drag rotation and subtle auto-rotation; touch/reduced-motion modes avoid continuous animation.
- WebGL failures degrade to an accessible named fallback.
- Existing site shell, routes, tests, and build remain healthy.
