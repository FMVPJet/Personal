"use client";

import { useEffect, useState } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF, useTexture } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

import { badgeProfile } from "@/app/badge-profile";
import Band from "@/components/band";
import ProfileHome from "@/components/profile-home";

extend({ MeshLineGeometry, MeshLineMaterial });
useGLTF.preload("/assets/3d/card.glb");
useTexture.preload("/assets/images/tag_texture.png");
useTexture.preload("/assets/images/badge_front.png");

const readStorage = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore storage write failures in private mode or blocked contexts.
  }
};

export default function PersonalPage() {
  const [theme, setTheme] = useState<"light" | "dark" | null>("dark");
  const [hydrated, setHydrated] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);

  useEffect(() => {
    const domTheme = document.documentElement.getAttribute("data-theme");
    const savedTheme = readStorage("theme-mode");
    const nextTheme =
      savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : domTheme === "light" || domTheme === "dark"
          ? domTheme
          : "dark";

    setTheme(nextTheme);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || !theme) return;
    document.documentElement.setAttribute("data-theme", theme);
    writeStorage("theme-mode", theme);
  }, [hydrated, theme]);

  const resolvedTheme = theme ?? "dark";
  const controlsReady = hydrated && Boolean(theme);
  const nextThemeLabel = resolvedTheme === "dark" ? "LIGHT" : "DARK";

  return (
    <div className="page-bg relative h-screen h-[100svh] h-[100dvh] overflow-hidden">
      <div className={`page-utility ${controlsReady ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        <button
          data-testid="theme-toggle"
          type="button"
          disabled={!controlsReady}
          onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
          className={`page-utility-button ${
            resolvedTheme === "dark"
              ? "text-white/52 hover:text-white"
              : "text-black/48 hover:text-black"
          }`}
        >
          {nextThemeLabel}
        </button>
      </div>

      <div className="page-noise" aria-hidden="true" />

      <section className="relative z-10 h-full">
        <ProfileHome
          profile={badgeProfile}
          theme={resolvedTheme}
          onOpenCard={() => setCardOpen(true)}
        />
      </section>

      {cardOpen ? (
        <div className="fixed inset-0 z-30" aria-hidden={!cardOpen}>
          <div
            data-testid="card-overlay-close"
            className="absolute inset-0 bg-[rgba(255,255,255,0.04)] backdrop-blur-[10px] dark:bg-[rgba(9,13,24,0.1)]"
          />
          <div className="pointer-events-none absolute inset-0">
            <div className="pointer-events-auto relative h-full w-full">
              <Canvas
                camera={{ position: [0, 0, 13], fov: 25 }}
                style={{ backgroundColor: "transparent" }}
                onPointerMissed={() => setCardOpen(false)}
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
      ) : null}
    </div>
  );
}
