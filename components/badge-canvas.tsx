"use client";

import { extend } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF, useTexture } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

import Band from "@/components/band";

extend({ MeshLineGeometry, MeshLineMaterial });
useGLTF.preload("/assets/3d/card.glb");
useTexture.preload("/assets/images/tag_texture.png");
useTexture.preload("/assets/images/badge_front.png");

export default function BadgeCanvas({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-30">
      <div
        data-testid="card-overlay-close"
        className="absolute inset-0 bg-[rgba(255,255,255,0.04)] backdrop-blur-[10px] dark:bg-[rgba(9,13,24,0.1)]"
      />
      <div className="pointer-events-none absolute inset-0">
        <div className="pointer-events-auto relative h-full w-full">
          <Canvas
            camera={{ position: [0, 0, 13], fov: 25 }}
            style={{ backgroundColor: "transparent" }}
            onPointerMissed={onClose}
          >
            <ambientLight intensity={Math.PI} />
            <Physics debug={false} interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
              <Band viewState="intro" displayMode="fullscreen" />
            </Physics>
            <Environment background={false} blur={0.75}>
              <Lightformer
                intensity={2}
                color="white"
                position={[0, -1, 5]}
                rotation={[0, 0, Math.PI / 3]}
                scale={[100, 0.1, 1]}
              />
              <Lightformer
                intensity={3}
                color="white"
                position={[-1, -1, 1]}
                rotation={[0, 0, Math.PI / 3]}
                scale={[100, 0.1, 1]}
              />
              <Lightformer
                intensity={3}
                color="white"
                position={[1, 1, 1]}
                rotation={[0, 0, Math.PI / 3]}
                scale={[100, 0.1, 1]}
              />
              <Lightformer
                intensity={10}
                color="white"
                position={[-10, 0, 14]}
                rotation={[0, Math.PI / 2, Math.PI / 3]}
                scale={[100, 10, 1]}
              />
            </Environment>
          </Canvas>
        </div>
      </div>
    </div>
  );
}
