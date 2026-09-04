# Procedural Device Grid Implementation Plan

> For agentic workers: REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

Goal: Replace the homepage's eight clickable photo/project items with four non-navigating procedural React Three Fiber device tiles: black 14-inch MacBook Pro-style laptop, keyboard, mouse, and phone.

Architecture: Keep GalleryShell and the existing .g-grid/.g-item layout. Replace PhotoGrid with a client-side DeviceGrid driven by serializable config/devices.ts records. DeviceGrid owns the typed modelType-to-component registry and passes the resolved component into a client-only DeviceCanvas. DeviceCanvas renders only the inner model stage. The .g-item-wrap is the single semantic/focus/pointer/visibility root, and SourceMotion remains the only owner of the global hover caption.

Tech stack: Next.js 15 App Router, React 19, TypeScript, three, @react-three/fiber, @react-three/drei, GSAP 3.15, IntersectionObserver, existing Node tests, and browser verification.

---

## File map

Create:

- config/devices.ts — serializable four-device records with id, modelType, name, accessibleLabel, and tileVariant.
- components/device-grid.tsx — client homepage grid, model registry, single semantic tile roots, model emphasis state.
- components/device-canvas.tsx — client-only R3F scene, camera/lights/controls, motion policy, WebGL fallback; no second focusable wrapper.
- components/devices/model-types.ts — shared minimal model props/component types.
- components/devices/macbook-pro.tsx — procedural black laptop model.
- components/devices/keyboard.tsx — procedural low-profile keyboard model.
- components/devices/mouse.tsx — procedural rounded mouse model.
- components/devices/phone.tsx — procedural dark phone model.
- tests/device-grid.test.mjs — executable source-contract tests; it does not import TypeScript directly.

Modify:

- app/page.tsx — render DeviceGrid instead of PhotoGrid.
- components/source-motion.tsx — target generic .g-item-wrap elements instead of anchors.
- styles/gallery.css — device stage, fallback, focus, coarse-pointer, and mobile styles.
- package.json and package-lock.json — add React 19-compatible three, @react-three/fiber, and @react-three/drei releases.

Leave unchanged:

- components/photo-grid.tsx — retain for reference/future project use but remove it from the homepage import.
- Existing project detail routes, Blog, About, PhotoSwipe, and unrelated source-motion behavior.
- public/assets/3d/card.glb — never load it.

---

### Task 0: Capture and protect the existing worktree baseline

Files: read only.

- [ ] Step 1: Capture all baseline states.

Run:

    git status --short
    git diff --name-status
    git diff --cached --name-status
    git diff --cached
    git ls-files --others --exclude-standard

The current worktree contains pre-existing modifications, staged changes, and untracked files that belong to the user.

- [ ] Step 2: Inspect overlap before each edit.

For any baseline-modified path (app/page.tsx, package.json, package-lock.json, styles/gallery.css, components/source-motion.tsx, or tests), inspect both unstaged and staged diffs, then apply only requested hunks with apply_patch. Never use reset, checkout, clean, or broad staging globs.

- [ ] Step 3: Define staging handling.

For a feature-owned new file, inspect it with:

    git diff --no-index /dev/null <exact-file> || true

Then stage only that exact path. For a baseline-untracked file, separate pre-existing content from feature content or leave it unstaged. Before every commit, inspect git diff --cached --name-only and git diff --cached. Compare final status with this baseline instead of expecting a clean worktree.

### Task 1: Add R3F runtime dependencies

Files:

- Modify: /Users/taotao/Project/Personal/package.json
- Modify: /Users/taotao/Project/Personal/package-lock.json

- [ ] Step 1: Install required packages.

    npm install three @react-three/fiber @react-three/drei

Expected: package.json contains these packages and no unrelated dependency changes.

- [ ] Step 2: Verify the dependency graph.

    npm ls three @react-three/fiber @react-three/drei

Expected: one resolved, React 19-compatible version for each package and no invalid peer dependency error.

- [ ] Step 3: Review and commit only the dependency diff.

    git diff -- package.json package-lock.json
    git add --patch package.json package-lock.json
    git diff --cached --name-only
    git diff --cached
    git commit -m "feat: add react three fiber runtime"

If baseline dependency changes cannot be separated safely, leave the files unstaged and report that in the handoff.

### Task 2: Define device data and model contracts

Files:

- Create: /Users/taotao/Project/Personal/config/devices.ts
- Create: /Users/taotao/Project/Personal/components/devices/model-types.ts
- Create: /Users/taotao/Project/Personal/tests/device-grid.test.mjs

- [ ] Step 1: Write the executable contract test.

Read config/devices.ts as text so the existing Node test command needs no TypeScript loader. Assert exact IDs and order: macbook-pro, keyboard, mouse, phone. Assert required fields: id, modelType, name, accessibleLabel, tileVariant. Assert accessibleLabel equals name and no href, slug, or project destination exists.

- [ ] Step 2: Run the focused test.

    node --test tests/device-grid.test.mjs

Expected: FAIL because config/devices.ts does not exist.

- [ ] Step 3: Implement the serializable catalog.

Use literal unions for modelType and tileVariant. Use full-height MacBook and mouse tiles, half-height keyboard and phone tiles. Do not store React components in config.

Define the minimal model contract:

    export interface ProceduralModelProps {
      scale?: number;
    }
    export type ProceduralModel = React.ComponentType<ProceduralModelProps>;

The model registry is created and checked in Task 5 inside DeviceGrid.

- [ ] Step 4: Run the focused test again.

    node --test tests/device-grid.test.mjs

Expected: PASS.

- [ ] Step 5: Review and commit exact new paths.

    git diff --no-index /dev/null config/devices.ts || true
    git diff --no-index /dev/null components/devices/model-types.ts || true
    git diff --no-index /dev/null tests/device-grid.test.mjs || true
    git add -- config/devices.ts components/devices/model-types.ts tests/device-grid.test.mjs
    git diff --cached --name-only
    git commit -m "feat: define procedural device catalog"

If any path was baseline-untracked, do not stage ambiguous content.

### Task 3: Build the four procedural device models

Files:

- Create: /Users/taotao/Project/Personal/components/devices/macbook-pro.tsx
- Create: /Users/taotao/Project/Personal/components/devices/keyboard.tsx
- Create: /Users/taotao/Project/Personal/components/devices/mouse.tsx
- Create: /Users/taotao/Project/Personal/components/devices/phone.tsx

- [ ] Step 1: Implement the laptop model.

Use Drei RoundedBox and Three materials for a black anodized base, thin display lid, bezel, dark glass screen, hinge, keyboard deck, bounded key grid, trackpad, and feet. Screen content is procedural geometry, not an external image.

- [ ] Step 2: Implement the keyboard model.

Use one rounded base and reusable keycap geometry. Keep the keycap count at or below 80 and vary space, shift, and return widths.

- [ ] Step 3: Implement the mouse model.

Use a rounded/capsule shell, top shell, center seam, and recessed wheel. Keep geometry appropriate for a small tile.

- [ ] Step 4: Implement the phone model.

Use a rounded slab body, inset glass face, side buttons, camera island, and lens pieces. Tilt it slightly for silhouette readability.

- [ ] Step 5: Enforce the no-per-frame-allocation rule.

All four models create stable arrays/geometries/materials outside per-frame callbacks and allocate no new Three objects during animation or pointer movement.

- [ ] Step 6: Run type checking.

    npx tsc --noEmit

Expected: PASS for the model components.

- [ ] Step 7: Review and commit exact model paths.

    git add -- components/devices/macbook-pro.tsx components/devices/keyboard.tsx components/devices/mouse.tsx components/devices/phone.tsx
    git diff --cached --name-only
    git commit -m "feat: add procedural device models"

### Task 4: Build the R3F Canvas and resilience policy

Files:

- Create: /Users/taotao/Project/Personal/components/device-canvas.tsx

- [ ] Step 1: Implement the client Canvas boundary.

Add a top-level "use client" directive. Accept a resolved modelComponent, name, isActive, and visibility/motion inputs. Do not import or resolve the registry here. Render a perspective camera, ambient light, one directional light, low-resolution contact shadow, and bounded OrbitControls. Render only an inner .device-model-stage with aria-hidden true; the parent .g-item-wrap owns semantics.

- [ ] Step 2: Implement browser-only initialization.

Run WebGL capability, pointer-capability, reduced-motion, and query-parameter checks only after mount. Keep the initial hydration-safe state as a static named loading/fallback surface. Use test-only device-webgl=off and device-webgl=error hooks only when process.env.NODE_ENV is not production; production ignores them.

- [ ] Step 3: Implement motion and controls.

Use frameloop always only for visible desktop tiles with auto-rotation. Use frameloop demand for reduced-motion, coarse-pointer, and off-screen tiles. On OrbitControls onChange, call invalidate during direct manipulation; pause/resume auto-rotation in onStart/onEnd. Use enablePan false, minPolarAngle 1.05, maxPolarAngle 1.75, minDistance 3.8, and maxDistance 7. Do not render OrbitControls for coarse pointers.

- [ ] Step 4: Implement fallback and error boundary.

Check WebGL before mounting the scene and wrap Canvas in a React error boundary. On unsupported/error states, render a neutral dark silhouette/gradient with the same visible name and a discoverable fallback marker.

- [ ] Step 5: Run type checking and build.

    npx tsc --noEmit
    npm run build

Expected: both PASS and all existing routes generate.

- [ ] Step 6: Review and commit the exact Canvas file.

    git diff --no-index /dev/null components/device-canvas.tsx || true
    git add -- components/device-canvas.tsx
    git diff --cached --name-only
    git commit -m "feat: add resilient device canvas"

If the file is baseline-untracked or includes baseline content, separate it before staging. Do not stage CSS in this task.

### Task 5: Replace the homepage grid and wire source-style hover captions

Files:

- Create: /Users/taotao/Project/Personal/components/device-grid.tsx
- Modify: /Users/taotao/Project/Personal/app/page.tsx
- Modify: /Users/taotao/Project/Personal/components/source-motion.tsx
- Modify: /Users/taotao/Project/Personal/styles/gallery.css
- Modify: /Users/taotao/Project/Personal/tests/device-grid.test.mjs

- [ ] Step 1: Implement the client DeviceGrid.

Add a top-level "use client" directive. Define and type the modelType-to-component registry in this file and assert it covers all four model types. Render exactly four .g-item wrappers and .g-item-wrap non-link elements inside #portfolio.title-big.g-grid. The .g-item-wrap itself is the only semantic/focus/pointer/visibility root: it owns role img, tabIndex 0, aria-label name, touch-action pan-y, data-title, data-category-label, data-device-visible, and data-render-mode. Pass the resolved model component to DeviceCanvas; do not add a nested focusable wrapper.

- [ ] Step 2: Track visibility and model emphasis.

Use one IntersectionObserver for all tile roots to set visible state. Pointer/focus handlers update model emphasis only and do not duplicate the global caption animation. Keep device names visible on coarse pointers and keyboard focus.

- [ ] Step 3: Remove homepage photo/filter behavior.

Change app/page.tsx to import only DeviceGrid. Do not render old photo backgrounds, project links, or category/filter sidebar. Keep PhotoGrid untouched outside the homepage.

- [ ] Step 4: Retarget SourceMotion.

Change portfolio hover binding to generic HTMLElement .g-item-wrap elements. Keep SourceMotion as the only owner of global .g-big-title-caption GSAP show/hide behavior and read the device data attributes.

- [ ] Step 5: Add layout and accessibility CSS.

Preserve the current desktop/tablet two-column rhythm and full/half tile variants. Require one-column stacking and a reduced Canvas height below the mobile breakpoint. Add model-stage sizing, focus outline, fallback styling, coarse-pointer always-visible names, and retain the existing .g-main flow-root/footer fix.

- [ ] Step 6: Run focused and full tests.

    node --test tests/device-grid.test.mjs
    npm test

Expected: both PASS; the .mjs test remains free of direct TypeScript imports.

- [ ] Step 7: Review and stage only the integration diff.

    git diff -- app/page.tsx components/source-motion.tsx styles/gallery.css tests/device-grid.test.mjs
    git diff --no-index /dev/null components/device-grid.tsx || true
    git add --patch app/page.tsx components/source-motion.tsx styles/gallery.css tests/device-grid.test.mjs
    git add -- components/device-grid.tsx
    git diff --cached --name-only
    git diff --cached
    git commit -m "feat: replace homepage photos with device grid"

Do not stage unrelated baseline changes. If any target was baseline-untracked, separate its content first.

### Task 6: Browser verification and final checks

Files: read only by default. Modify only an exact feature file if verification exposes a directly related defect.

- [ ] Step 1: Verify the production build separately.

    npm run build
    npm run start

Do not run development and production build processes concurrently.

- [ ] Step 2: Verify the homepage DOM contract.

Confirm exactly four .g-item tiles, no tile href, no filter sidebar, four expected names, role img, tabIndex 0, correct aria-label, and footer placement below the grid.

- [ ] Step 3: Verify WebGL interaction.

Capture console/page errors and require zero runtime errors. Confirm all four scenes render, hover/focus reveals names, MacBook drag rotation works, auto-rotation is subtle, and model emphasis does not move the global caption.

- [ ] Step 4: Verify fallback and motion modes.

Run the development server and test device-webgl=off and device-webgl=error; every tile must show the expected fallback name without crashing. Test reduced-motion and a narrow/coarse-pointer viewport: one-column stacking, reduced Canvas height, visible names, data-render-mode demand, no auto-rotation, no OrbitControls, and normal page scrolling. Scroll tiles out of and back into view to verify data-device-visible and render-mode transitions. Run production with the same query parameters to confirm debug hooks are ignored.

- [ ] Step 5: Run final static checks.

    npm test
    git diff --check
    git diff --cached --check
    git status --short

Expected: tests pass, no whitespace errors, and final status is compared with the Task 0 baseline. Do not require a clean worktree.

## Acceptance criteria

- Homepage contains exactly four device tiles and no image cards, project links, or homepage filter UI.
- MacBook, keyboard, mouse, and phone are visible as procedural R3F geometry without loading card.glb.
- Hover/focus reveals the matching device name through the existing GSAP caption system.
- Desktop supports bounded drag rotation and subtle auto-rotation; touch/reduced-motion/off-screen modes use demand rendering and avoid continuous animation.
- WebGL failures degrade to accessible named fallbacks.
- Existing site shell, routes, tests, and build remain healthy.
