# 4-device React Three Fiber homepage

## Status

Approved by the user on 2026-09-03. This specification covers the next homepage change in the existing Boyang Hu-inspired portfolio rebuild.

## Goal

Replace the homepage's clickable photography/project grid with four non-navigating product tiles rendered as real-time 3D scenes. Preserve the current grid rhythm, header, menu, source-inspired hover treatment, and responsive behavior while presenting a black 14-inch MacBook Pro-style device alongside a keyboard, mouse, and phone.

## Scope

### In scope

- Keep the existing four-tile grid layout and its visual spacing.
- Replace each tile's background photo and project link with a client-side React Three Fiber canvas.
- Add four procedural device components built from Three.js geometry and materials:
  - MacBook Pro 14-inch-style laptop in black/space-black finish.
  - Compact low-profile keyboard with a keycap matrix.
  - Rounded black mouse with wheel and button seam.
  - Dark phone slab with glass face and camera module.
- Add a device data configuration containing id, name, label, tile size, and model renderer.
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

`app/page.tsx` will render `GalleryShell` with `DeviceGrid` instead of `PhotoGrid`. `DeviceGrid` owns four tiles and the global hover caption. It does not create detail links.

### Components

- `components/device-grid.tsx`: maps the four configured devices into the existing `.g-grid`/`.g-item` layout, owns hover state and source-style caption animation hooks.
- `components/device-canvas.tsx`: client-only R3F scene wrapper, camera, lights, orbit interaction, presentation motion, accessibility label, and WebGL-safe fallback.
- `components/devices/macbook-pro.tsx`: composed laptop geometry and screen content.
- `components/devices/keyboard.tsx`: composed base and keycap geometry.
- `components/devices/mouse.tsx`: composed shell, wheel, and button seam.
- `components/devices/phone.tsx`: composed body, glass, camera island, and lens details.
- `config/devices.ts`: serializable device metadata and stable ordering.

The model components will receive a small shared model-props interface (for example `compact`, `accent`, and `interactive`) so the canvas can size them consistently without coupling the models to homepage layout.

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

- Each tile has a `role="img"`-style accessible label through the canvas wrapper and a visible text label on hover/focus.
- Pointer enter triggers the existing GSAP caption reveal and a small model emphasis scale.
- Pointer leave reverses the caption and emphasis.
- Pointer drag rotates the model through OrbitControls or an equivalent bounded control.
- Auto-rotation is intentionally subtle and pauses during direct manipulation.
- `prefers-reduced-motion: reduce` disables auto-rotation and nonessential emphasis tweens.
- Coarse pointers use a static camera presentation and normal page scrolling; they do not require drag gestures.
- No tile click navigation is introduced.

## Performance and resilience

- Load R3F/Three code only in the client component boundary.
- Use a low device-pixel-ratio cap for canvases to avoid four full-resolution WebGL surfaces.
- Keep geometry procedural and shared where practical; avoid per-frame allocations.
- Use one short render loop per visible canvas and pause/stop motion when the tile is off-screen if this can be done without breaking interaction.
- Provide a non-WebGL fallback tile with the device name and a neutral dark silhouette/gradient so the homepage is still usable if WebGL is unavailable.

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
   - all four canvases render without console/runtime errors;
   - hover/focus reveals the correct device names;
   - pointer rotation works on at least the MacBook tile;
   - mobile/reduced-motion behavior does not force an animation loop.
4. `git diff --check` passes.

## Known fidelity boundary

The four devices are visual, procedural approximations created from primitives. The MacBook is intentionally described as “MacBook Pro 14-inch-style” in the implementation to avoid implying a manufacturer-supplied CAD asset. A future exact model can be considered separately if the user supplies or licenses a model file.
