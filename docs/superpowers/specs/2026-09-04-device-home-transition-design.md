# Homepage Device Transition Design

## Context

The homepage currently links to a separate `/devices` page that renders the interactive 3D device catalog. The desired experience is a single homepage at `/`: clicking the `Devices` control should replace the profile hero with the device catalog through a radial convergence animation.

## Goals

- Keep the browser URL at `/` for both profile and device states.
- Hide the homepage text and avatar while device mode is active.
- Bring device models in from the surrounding edges and settle into the existing device grid.
- Keep each model independently interactive after it arrives.
- Allow future models to participate without hard-coded four-model layout logic.
- Preserve the existing blank-space exit behavior without treating a model rotation as an exit click.
- Respect reduced-motion preferences and keyboard accessibility.

## Chosen direction

Use the selected A interaction: radial convergence. Four current models enter from the viewport corners in `devices` array order—top-left, top-right, bottom-right, bottom-left—with a short stagger, then resolve into their normal grid positions. For future model counts, entry vectors are generated deterministically from each model's index and total count rather than relying on fixed `nth-child` rules. Counts other than four use evenly spaced perimeter angles, starting at the top and proceeding clockwise; the four-model case keeps the corner positions for the selected composition.

## Architecture

1. Keep `app/page.tsx` as the only user-facing page for this experience.
2. Add a client-side homepage experience/orchestrator that owns a `profile` / `devices` view state and renders `AboutSection` and `DeviceGrid` together.
3. Convert the `Devices` control from a route link into an accessible button callback.
4. Keep `DeviceGrid` mounted in both states so WebGL canvases do not unmount and remount during every transition.
5. Remove the standalone `app/devices/page.tsx` route and its dedicated-page-only styles/behavior. `/devices` is no longer an exposed route and should resolve through Next's normal not-found page.

## State and interaction flow

### Entering device mode

1. User activates the `Devices` button.
2. The orchestrator changes the root state to `devices`.
3. Profile content fades and moves out, then becomes non-interactive through both `inert` and `aria-hidden`.
4. Device items animate from their generated edge vectors to their grid positions with a small index-based delay.
5. Device tiles remain non-interactive until the convergence window completes, then become interactive.

### Exiting device mode

1. User clicks the blank page area or presses `Escape`.
2. The experience sets an exit-transition marker while keeping the device view active.
3. Device items immediately become non-interactive and reverse toward their edge vectors.
4. During exit, profile content remains `visibility: hidden` and non-interactive so it cannot overlap the departing models.
5. After the longest model exit completes at `760ms + (count - 1) * 90ms`, the device layer becomes visually hidden, the view returns to `profile`, and profile content fades back in over `420ms`; focus then returns to the `Devices` button.

The blank page area means any target in the device experience that is not contained by `.device-item`; it includes the device section, grid wrapper, and surrounding page whitespace. Model canvases, fallback surfaces, tile wrappers, and their descendants are not blank space. Pointer gestures that start inside `.device-item` must be marked as model gestures. If their release produces a click whose final target is outside the tile, that click is consumed instead of exiting device mode. Pointer cancel clears the gesture marker.

## Motion and layout

- Use a view state (`profile` / `devices`) and an exit-transition marker on the experience root, plus a readiness marker for the device layer. Keep the device view marker active throughout exit so the model layer can finish its reverse animation before profile content is revealed.
- Keep the device layer positioned over the hero without changing the URL or triggering a navigation.
- Animate `transform`, `opacity`, and `visibility`; do not animate layout dimensions.
- Use deterministic index-based CSS custom properties or inline variables for entry translation, rotation, scale, and delay. The four-model vectors are `(-52vw, -42vh)`, `(52vw, -42vh)`, `(52vw, 42vh)`, and `(-52vw, 42vh)` in array order. Other counts use `x = cos(angle) * 58vw` and `y = sin(angle) * 48vh`, with `angle = -PI / 2 + index * 2PI / count`.
- Use `760ms` for model travel, `90ms` per-index stagger, and `cubic-bezier(0.22, 0.8, 0.18, 1)` for convergence and reversal. The device layer becomes interactive after `760ms + (count - 1) * 90ms`; exit disables interaction immediately and hides the layer after that same duration. Profile fade-in uses `420ms` after the device layer is hidden.
- Preserve the existing responsive two-column device grid on desktop and one-column behavior on narrow screens.
- Add a `prefers-reduced-motion: reduce` path that disables travel and scale/rotation animation, uses a `1ms` state transition, and makes the device layer ready on the next render.

## Accessibility and failure behavior

- The `Devices` control is a button with a visible focus state and `aria-pressed` reflecting the current view.
- Hidden profile content is marked `inert` and `aria-hidden` while device mode is active.
- Hidden device content is marked `inert` and `aria-hidden` while profile mode is active.
- On entry, focus moves to a focusable, visually hidden device-region label; on exit, focus returns to the `Devices` button. `Escape` exits device mode from anywhere in the experience.
- Model fallback/error rendering remains unchanged; a failed WebGL context must not prevent the state transition or blank-space exit.
- The device state is local UI state only; refresh returns to the profile state at `/`.

## Testing and verification

- Static regression tests verify that the homepage owns both views, no production code contains `/devices` navigation, and the standalone route is removed.
- Interaction-oriented tests verify the state toggle, blank-space exit, model-gesture suppression, generated animation metadata, readiness timing, focus handoff, Escape exit, and reduced-motion handling.
- Run the full Node test suite and `npm run build`.
- Perform a browser smoke check at `/`: enter device mode, confirm profile content hides, confirm models converge, rotate a model, click blank space to exit, and confirm the URL remains `/`.

## Out of scope

- Persisting device mode across refreshes.
- Adding new model assets as part of this change.
- Changing the models' geometry, materials, or individual controls.
- Adding a new route or query parameter for device mode.
