"use client";

import {
  Component,
  Suspense,
  type ErrorInfo,
  type ReactNode,
  useEffect,
  useState,
  useRef,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Html, OrbitControls, useProgress } from "@react-three/drei";
import type { Group } from "three";

import type { DeviceModelType } from "@/config/devices";
import type { ProceduralModel } from "./devices/model-types";

type RenderMode = "always" | "demand" | "fallback";

interface DeviceCanvasProps {
  modelComponent: ProceduralModel;
  modelType: DeviceModelType;
  name: string;
  isActive: boolean;
  isVisible: boolean;
  onRenderModeChange?: (mode: RenderMode) => void;
}

interface SceneErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
  onError: (error: Error, info: ErrorInfo) => void;
}

interface SceneErrorBoundaryState {
  hasError: boolean;
}

class SceneErrorBoundary extends Component<
  SceneErrorBoundaryProps,
  SceneErrorBoundaryState
> {
  state: SceneErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): SceneErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError(error, info);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

function canCreateWebGLContext() {
  const canvas = document.createElement("canvas");
  try {
    return Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

function StaticFallback({ name }: { name: string }) {
  return (
    <div className="device-fallback" data-device-fallback="true">
      <span className="device-fallback-shape" aria-hidden="true" />
      <span className="device-fallback-name">{name}</span>
    </div>
  );
}

function StageMessage({ children }: { children: ReactNode }) {
  return (
    <div className="device-stage-message" aria-hidden="true">
      <span className="device-stage-spinner" />
      <span>{children}</span>
    </div>
  );
}

function SceneLoading() {
  const { progress } = useProgress();
  return <Html center>{`Loading 3D model ${Math.round(progress)}%`}</Html>;
}

function DebugSceneError(): ReactNode {
  throw new Error("Forced device scene error for development verification.");
}

function DeviceScene({
  modelComponent: Model,
  isActive,
  isContinuous,
  coarsePointer,
  forceError,
  target,
}: {
  modelComponent: ProceduralModel;
  isActive: boolean;
  isContinuous: boolean;
  coarsePointer: boolean;
  forceError: boolean;
  target: [number, number, number];
}) {
  const groupRef = useRef<Group>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const { gl, invalidate } = useThree();

  useFrame(({ clock }, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const targetScale = isActive ? 1.045 : 1;
    const currentScale = group.scale.x;
    const nextScale = currentScale + (targetScale - currentScale) * Math.min(1, delta * 7);
    group.scale.setScalar(nextScale);

    if (isContinuous && !isInteracting) {
      group.rotation.y = Math.sin(clock.elapsedTime * 0.36) * 0.14;
    }

    if (isContinuous || Math.abs(targetScale - nextScale) > 0.001) {
      invalidate();
    }
  });

  useEffect(() => {
    invalidate();
  }, [invalidate, isActive]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      // OrbitControls sets the canvas to `none` when it connects. Keep
      // vertical swipes available for the surrounding mobile archive.
      gl.domElement.style.touchAction = coarsePointer ? "pan-y" : "none";
    });

    return () => window.cancelAnimationFrame(frame);
  }, [coarsePointer, gl]);

  if (forceError) return <DebugSceneError />;

  return (
    <>
      <ambientLight intensity={1.65} />
      <directionalLight position={[4, 7, 5]} intensity={3.2} color="#ffffff" />
      <directionalLight position={[-4, 2, -3]} intensity={1.15} color="#9fd7ff" />
      <group ref={groupRef} position={[0, -0.35, 0]}>
        <Model scale={1} />
      </group>
      <ContactShadows
        position={[0, -1.02, 0]}
        opacity={0.2}
        scale={7}
        blur={2.4}
        far={4.2}
        resolution={128}
        frames={1}
      />
      <OrbitControls
        makeDefault
        // OrbitControls treats every mobile one-finger gesture as rotation,
        // which steals vertical swipes from the surrounding device archive.
        enableRotate={!coarsePointer}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={1.05}
        maxPolarAngle={1.75}
        target={target}
        onChange={() => invalidate()}
        onStart={() => setIsInteracting(true)}
        onEnd={() => setIsInteracting(false)}
      />
    </>
  );
}

export default function DeviceCanvas({
  modelComponent,
  modelType,
  name,
  isActive,
  isVisible,
  onRenderModeChange,
}: DeviceCanvasProps) {
  const [status, setStatus] = useState<"pending" | "ready" | "fallback" | "error">("pending");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [coarsePointer, setCoarsePointer] = useState(false);
  const [forceError, setForceError] = useState(false);

  const cameraPresets: Record<
    DeviceModelType,
    { position: [number, number, number]; target: [number, number, number]; fov: number }
  > = {
    "macbook-pro": { position: [5.9, 5.4, 7.9], target: [0, 0.8, 0], fov: 40 },
    keyboard: { position: [5.6, 5.6, 6.8], target: [0, 0.1, 0], fov: 39 },
    mouse: { position: [4.8, 3.8, 6.1], target: [0, 0.3, 0], fov: 40 },
    phone: { position: [2.8, 3.3, 4.6], target: [0, 0.15, 0], fov: 36 },
  };
  const camera = cameraPresets[modelType];

  useEffect(() => {
    if (!isVisible) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    setReducedMotion(mediaQuery.matches);
    setCoarsePointer(pointerQuery.matches);

    const debugMode =
      process.env.NODE_ENV !== "production"
        ? new URLSearchParams(window.location.search).get("device-webgl")
        : null;

    if (debugMode === "off") {
      setStatus("fallback");
      return;
    }

    if (debugMode === "error") {
      setForceError(true);
      setStatus("ready");
      return;
    }

    setStatus(canCreateWebGLContext() ? "ready" : "fallback");
  }, [isVisible]);

  const isContinuous =
    status === "ready" && isVisible && isActive && !reducedMotion && !coarsePointer;
  const renderMode: RenderMode = status !== "ready" ? "fallback" : isContinuous ? "always" : "demand";

  useEffect(() => {
    onRenderModeChange?.(renderMode);
  }, [onRenderModeChange, renderMode]);

  if (!isVisible && status === "ready") {
    return (
      <div
        className={`device-model-stage device-model-stage-${modelType}`}
        aria-hidden="true"
        data-render-mode="lazy"
      />
    );
  }

  if (status !== "ready") {
    if (!isVisible && status === "pending") {
      return (
        <div
          className={`device-model-stage device-model-stage-${modelType}`}
          aria-hidden="true"
          data-render-mode="lazy"
        />
      );
    }

    if (status === "pending") {
      return (
        <div
          className={`device-model-stage device-model-stage-${modelType}`}
          aria-hidden="true"
          data-render-mode="loading"
        >
          <StageMessage>Loading 3D model</StageMessage>
        </div>
      );
    }

    return (
      <div
        className={`device-model-stage device-model-stage-${modelType}`}
        aria-hidden="true"
        data-render-mode="fallback"
      >
        <StaticFallback name={name} />
      </div>
    );
  }

  const fallback = (
    <div
      className={`device-model-stage device-model-stage-${modelType}`}
      aria-hidden="true"
      data-render-mode="fallback"
    >
      <StaticFallback name={name} />
    </div>
  );

  return (
    <SceneErrorBoundary
      fallback={fallback}
      onError={() => {
        setStatus("error");
      }}
    >
      <div
        className={`device-model-stage device-model-stage-${modelType}`}
        aria-hidden="true"
        data-render-mode={renderMode}
      >
        <Canvas
          dpr={coarsePointer ? [1, 1.15] : [1, 1.25]}
          frameloop={isContinuous ? "always" : "demand"}
          camera={{ position: camera.position, fov: camera.fov, near: 0.1, far: 100 }}
          gl={{ antialias: !coarsePointer, alpha: true, powerPreference: "high-performance" }}
        >
          <Suspense fallback={<SceneLoading />}>
            <DeviceScene
              modelComponent={modelComponent}
              isActive={isActive}
              isContinuous={isContinuous}
              coarsePointer={coarsePointer}
              forceError={forceError}
              target={camera.target}
            />
          </Suspense>
        </Canvas>
      </div>
    </SceneErrorBoundary>
  );
}
