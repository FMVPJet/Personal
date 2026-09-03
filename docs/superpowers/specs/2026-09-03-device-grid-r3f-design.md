# 4-device React Three Fiber homepage

## Status

Approved by the user on 2026-09-03. This specification covers the next homepage change in the existing Boyang Hu-inspired portfolio rebuild.

## Goal

Replace the homepage's clickable photography/project grid with four non-navigating product tiles rendered as real-time 3D scenes. Preserve the current grid rhythm, header, menu, source-inspired hover treatment, and responsive behavior while presenting a black 14-inch MacBook Pro-style device alongside a keyboard, mouse, and phone.

## Scope

### In scope

- Keep the existing `.g-grid`/`.g-item` CSS grid rhythm and visual spacing, but replace the current eight photo data items with exactly four device items for this iteration.
- Remove the homepage category/filter sidebar because project categories no longer apply to the device collection. Keep the global header, menu, footer, and site-level navigation.
- Replace each tile's background photo and project link with a client-side React Three Fiber canvas. The four tiles use the existing full/half-height rhythm through an explicit `tileVariant` field: MacBook full-height, keyboard half-height, mouse full-height, and phone half-height.
- Add four procedural device components built from Three.js geometry and materials:
  - MacBook Pro 14-inch-style laptop in black/space-black finish.
  - Compact low-profile keyboard with a keycap matrix.
  - Rounded black mouse with wheel and button seam.
  - Dark phone slab with glass face and camera module.
- Add a serializable device data configuration containing id, name, accessible label, `tileVariant`, and a `modelType` identifier. Keep the `modelType` → React component registry inside the client-side `DeviceGrid` module; do not put React component references in the data object.
- Preserve the current GSAP hover caption behavior, changing its content to the device name.
- Support a subtle automatic presentation motion on pointer-capable desktop devices and stop/reduce motion for touch or reduced-motion users.
- Keep pointer dragging for gentle model inspection within each tile, with bounded zoom/rotation behavior so the page remains usable.
- Remove homepage navigation from the four device tiles. Existing About, Blog, and project detail routes remain available through the site shell where applicable.

### Out of scope

- Loading or depending on `card.glb`.
- Creating an industrial/CAD-accurate Apple model.
- Adding a GLB/GLTF import path in this iteration.
- Building device detail pages, exploded views, or a product configurator.
- Reworking unrelated About, Blog, or project-detail content.

## Design direction

The page remains editorial and monochrome: white canvas, black/dark graphite devices, restrained gray labels, and the existing source-inspired large hover caption. The model should read as a product object inside the same airy grid rather than as a full-screen game scene. Each tile has enough padding for the silhouette and a soft ground shadow to separate the device from the white background.

## Architecture

### Homepage composition

`app/page.tsx` will render `GalleryShell` with `DeviceGrid` instead of `PhotoGrid`. `DeviceGrid` owns four tiles and per-tile model emphasis state. It does not create detail links or render the old filter UI. The existing `SourceMotion` remains the single owner of the global caption animation.

### Components

- `components/device-grid.tsx`: maps the four configured devices into the existing `.g-grid`/`.g-item` layout, owns model emphasis state, assigns `data-title`/`data-category-label` equivalents for the caption, and renders no links.
- `components/device-canvas.tsx`: client-only R3F scene wrapper, camera, lights, orbit interaction, presentation motion, accessibility label, and WebGL-safe fallback.
- `components/devices/macbook-pro.tsx`: composed laptop geometry and screen content.
- `components/devices/keyboard.tsx`: composed base and keycap geometry.
- `components/devices/mouse.tsx`: composed shell, wheel, and button seam.
- `components/devices/phone.tsx`: composed body, glass, camera island, and lens details.
- `config/devices.ts`: serializable device metadata (`modelType`, not a renderer) and stable ordering.

The model components will receive only a minimal shared geometry prop, such as `scale?: number`. `DeviceCanvas` owns interaction state, camera behavior, motion policy, and materials that are common to all models. A client-only registry maps `modelType` values to the four model components.

### Dependencies

Add and lock these runtime packages in `package.json`/`package-lock.json`, using React 19-compatible releases selected at implementation time:

- `three` for the WebGL scene and core geometry/materials.
- `@react-three/fiber` for the React renderer and Canvas.
- `@react-three/drei` for `RoundedBox`, `OrbitControls`, `ContactShadows`, and supporting helpers.

## Geometry and visual behavior

### MacBook Pro-style laptop

- Use rounded boxes or custom bevelled boxes for the display lid and base.
- Use a thin black display bezel with a dark reflective screen plane.
- Use a separated keyboard deck, low-profile key grid, trackpad, hinge strip, and four feet.
- Use a subtle screen gradient/abstract UI composition rather than a photographic texture.
- Use `metalness` and controlled `roughness` to suggest anodized black aluminum without over-bright reflections.

### Keyboard

- Use one rounded base and a reusable keycap primitive laid out in rows.
- Vary key widths for the space bar, return, shift, and modifier keys.
- Keep key count intentionally bounded for performance at tile scale.

### Mouse

- Use a rounded/capsule shell with a separate top shell plane.
- Add a recessed wheel and center seam using dark graphite geometry.

### Phone

- Use a rounded slab body, inset glass face, side-button details, and a camera island with lenses.
- Keep the phone slightly angled to make the silhouette readable at grid size.

## Interaction

- Each non-navigating tile is a focusable element with `role="img"`, `tabIndex={0}`, and `aria-label={name}`. Device names are always visible on coarse/touch pointers and visible on keyboard focus.
- `DeviceGrid` handles pointer/focus state for model emphasis. `SourceMotion` is updated to target `.g-item-wrap` tile elements rather than anchors and remains the only owner of the global GSAP caption listeners; the two responsibilities must not create duplicate caption effects.
- Pointer enter/focus triggers the existing GSAP caption reveal and a small model emphasis scale.
- Pointer leave/blur reverses the caption and emphasis.
- Pointer drag rotates the model through OrbitControls or an equivalent bounded control.
- Auto-rotation is intentionally subtle and pauses during direct manipulation.
- `prefers-reduced-motion: reduce` disables auto-rotation and nonessential emphasis tweens.
- Coarse pointers use a static camera presentation, keep the name visible, and use `touch-action: pan-y` so normal page scrolling wins over model inspection.
- No tile click navigation is introduced.

## Performance and resilience

- Load R3F/Three code only in the client component boundary.
- Render no more than four WebGL contexts. Cap desktop DPR at `1.5` and coarse-pointer DPR at `1.25`.
- Keep geometry procedural and shared where practical; avoid per-frame allocations.
- Use `frameloop="always"` only for visible desktop tiles with auto-rotation. Use `frameloop="demand"` for reduced-motion/coarse-pointer tiles and invalidate only during direct interaction. An `IntersectionObserver` must pause auto-rotation and switch off continuous rendering when a tile leaves the viewport, then resume when it re-enters.
- Limit the keyboard to a bounded keycap count (no more than 80 keycaps per scene), use low-resolution contact shadows, and keep one directional light plus ambient lighting per scene.
- Wrap each Canvas in a WebGL capability check and React error boundary. If WebGL is unavailable or a scene errors, render a neutral dark silhouette/gradient with the same visible device name and accessible label.

## Responsive behavior

- Desktop/tablet: preserve the existing two-column grid and allow model inspection.
- Narrow mobile: stack the four tiles using existing responsive grid rules, reduce canvas height, disable automatic motion, and keep names visible on focus/tap-compatible states.
- Header/menu behavior remains unchanged.

## Validation

1. `npm test` continues to pass existing content/model tests.
2. `npm run build` passes with the R3F dependencies and all route generation intact.
3. Browser verification confirms:
   - exactly four homepage device tiles;
   - no homepage tile has a project `href`;
   - the filter sidebar is absent on the homepage;
   - when WebGL is available, all four canvases render without console/runtime errors;
   - when WebGL is unavailable/simulated unavailable, each tile shows its accessible fallback name instead of crashing;
   - hover/focus reveals the correct device names;
   - pointer rotation works on at least the MacBook tile;
   - mobile/reduced-motion behavior uses demand rendering and does not force an animation loop;
   - off-screen tiles pause and resume rendering through the visibility observer.
4. `git diff --check` passes.

## Known fidelity boundary

The four devices are visual, procedural approximations created from primitives. The MacBook is intentionally described as “MacBook Pro 14-inch-style” in the implementation to avoid implying a manufacturer-supplied CAD asset. A future exact model can be considered separately if the user supplies or licenses a model file.
