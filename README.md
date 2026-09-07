# Jet Kwok — Personal Portfolio

Personal portfolio for Jet Kwok, a Computer Vision Engineer and MLOps engineer based in Zhengzhou, China.

The site combines an editorial portfolio layout with an interactive device archive, real device models, and project case studies.

## Features

- Interactive 3D device grid built with React Three Fiber and Drei
- Optimized GLB models with KTX2 and Meshopt support
- GSAP page entrance, hover, parallax, and scroll-reveal motion
- PhotoSwipe image lightboxes and project carousels
- About and project detail pages with shared navigation and layout rules
- Responsive layouts and reduced-motion support

## Stack

- Next.js 15
- React 19 and TypeScript
- React Three Fiber, Drei, and Three.js
- GSAP
- PhotoSwipe
- Tailwind CSS 4

## Getting started

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Build for production:

```bash
npm run build
```

Run the production build:

```bash
npm run start
```

## Verification

```bash
npm run lint
npm test
```

## Asset notes

Optimized device models live in `public/assets/devices/optimized/` and are committed to the repository. Original downloaded GLB files should remain local and are ignored by Git.

## Preview alongside development

Use a separate build directory when the development server is already running:

```bash
NEXT_DIST_DIR=.next-preview npm run build
NEXT_DIST_DIR=.next-preview npm run start -- --port 3001
```

The homepage loads the 3D renderer only when the device archive is open and a tile
is visible. Closing the archive releases its canvases. The archive supports a
scrollable mobile layout, keyboard focus restoration, and reduced motion.
