import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { Html, useGLTF, useTexture } from "@react-three/drei";
import { useFrame, ReactThreeFiber, extend, useThree } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  RigidBody,
  interactionGroups,
  type RapierRigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import type { GLTF } from "three-stdlib";

extend({ MeshLineGeometry, MeshLineMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: ReactThreeFiber.Object3DNode<
        MeshLineGeometry,
        typeof MeshLineGeometry
      >;
      meshLineMaterial: ReactThreeFiber.Object3DNode<
        MeshLineMaterial,
        typeof MeshLineMaterial
      >;
    }
  }
}

const segmentProps = {
  type: "dynamic",
  canSleep: true,
  colliders: false,
  angularDamping: 2,
  linearDamping: 2,
} as const;

const TRANSITION_DAMP = 4.8;

export type BadgeProfile = {
  name: string;
  title: string;
  heroSummary: string;
  email: string;
  github: string;
  avatarUrl?: string;
  resumeUrl: string;
};

export type BadgeViewState =
  | "intro"
  | "transitioningToHome"
  | "home"
  | "transitioningToIntro";

type CardGLTF = GLTF & {
  nodes: {
    card: THREE.Mesh;
    clip: THREE.Mesh;
    clamp: THREE.Mesh;
  };
  materials: {
    base: THREE.MeshStandardMaterial;
    metal: THREE.Material | THREE.Material[];
  };
};

const applyMaterialOpacity = (
  material: THREE.Material | THREE.Material[],
  opacity: number
) => {
  const target = Array.isArray(material) ? material : [material];
  target.forEach((entry) => {
    const mutable = entry as THREE.Material & {
      opacity?: number;
      transparent?: boolean;
    };
    mutable.transparent = true;
    mutable.opacity = opacity;
    mutable.needsUpdate = true;
  });
};

export default function Band({
  maxSpeed = 50,
  minSpeed = 10,
  viewState,
  displayMode = "default",
}: {
  maxSpeed?: number;
  minSpeed?: number;
  viewState: BadgeViewState;
  displayMode?: "default" | "modal" | "fullscreen";
}) {
  const band = useRef<THREE.Mesh<MeshLineGeometry, MeshLineMaterial>>(null);
  const strapMaterial = useRef<MeshLineMaterial>(null);
  const fixed = useRef<RapierRigidBody>(null);
  const j1 = useRef<RapierRigidBody>(null);
  const j2 = useRef<RapierRigidBody>(null);
  const j3 = useRef<RapierRigidBody>(null);
  const card = useRef<RapierRigidBody>(null);
  const visual = useRef<THREE.Group>(null);
  const shellMaterial = useRef<THREE.MeshPhysicalMaterial>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const size = useThree((state) => state.size);

  const tmp = useMemo(
    () => ({
      vec: new THREE.Vector3(),
      ang: new THREE.Vector3(),
      rot: new THREE.Vector3(),
      dir: new THREE.Vector3(),
    }),
    []
  );
  const transitionProgress = useRef(0);
  const j1Lerped = useRef(new THREE.Vector3());
  const j2Lerped = useRef(new THREE.Vector3());

  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);
  const allowDrag = viewState === "intro";

  const { nodes, materials } = useGLTF("/assets/3d/card.glb") as CardGLTF;
  const strapTexture = useTexture("/assets/images/tag_texture.png");
  const faceTexture = useTexture("/assets/images/badge_front.png");

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );

  const isCompactViewport = size.width <= 768;
  const markerSize = useMemo(() => {
    if (isCompactViewport) {
      return { width: 196, height: 274 };
    }
    return displayMode === "fullscreen"
      ? { width: 240, height: 336 }
      : displayMode === "modal"
      ? { width: 300, height: 420 }
      : { width: 240, height: 336 };
  }, [displayMode, isCompactViewport]);
  const strapResolution = useMemo(() => new THREE.Vector2(2, 1), []);
  const noCollisionGroup = useMemo(() => interactionGroups(0, []), []);
  const baseScale = isCompactViewport
    ? 1.82
    : displayMode === "fullscreen"
    ? 2.25
    : displayMode === "modal"
    ? 3.05
    : 2.25;
  const baseY = isCompactViewport
    ? -1.02
    : displayMode === "fullscreen"
    ? -1.25
    : displayMode === "modal"
    ? -1.38
    : -1.25;
  const distanceFactor = isCompactViewport
    ? 0.68
    : displayMode === "fullscreen"
    ? 0.82
    : displayMode === "modal"
    ? 1.02
    : 0.82;

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ]);

  useEffect(() => {
    strapTexture.wrapS = strapTexture.wrapT = THREE.RepeatWrapping;
    strapTexture.repeat.set(-3, 1);
  }, [strapTexture]);

  useEffect(() => {
    faceTexture.colorSpace = THREE.SRGBColorSpace;
    faceTexture.flipY = false;
    faceTexture.needsUpdate = true;
  }, [faceTexture]);

  useEffect(() => {
    if (!allowDrag && dragged) drag(false);
  }, [allowDrag, dragged]);

  useEffect(() => {
    if (!allowDrag) {
      document.body.style.cursor = "auto";
      return undefined;
    }
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [allowDrag, hovered, dragged]);

  useEffect(() => {
    if (!dragged) return undefined;

    const endDrag = () => drag(false);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    window.addEventListener("blur", endDrag);
    return () => {
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
      window.removeEventListener("blur", endDrag);
    };
  }, [dragged]);

  useEffect(() => {
    applyMaterialOpacity(materials.metal, 1);
    return () => {
      applyMaterialOpacity(materials.metal, 1);
    };
  }, [materials.metal]);

  useFrame((state, delta) => {
    if (
      !fixed.current ||
      !j1.current ||
      !j2.current ||
      !j3.current ||
      !band.current ||
      !card.current ||
      !visual.current
    ) {
      return;
    }

    if (dragged && allowDrag) {
      tmp.vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      tmp.dir.copy(tmp.vec).sub(state.camera.position).normalize();
      tmp.vec.add(tmp.dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current.setNextKinematicTranslation({
        x: tmp.vec.x - dragged.x,
        y: tmp.vec.y - dragged.y,
        z: tmp.vec.z - dragged.z,
      });
    }

    const j1Pos = j1.current.translation();
    const j1Dist = Math.max(0.1, Math.min(1, j1Lerped.current.distanceTo(j1Pos)));
    j1Lerped.current.lerp(j1Pos, delta * (minSpeed + j1Dist * (maxSpeed - minSpeed)));

    const j2Pos = j2.current.translation();
    const j2Dist = Math.max(0.1, Math.min(1, j2Lerped.current.distanceTo(j2Pos)));
    j2Lerped.current.lerp(j2Pos, delta * (minSpeed + j2Dist * (maxSpeed - minSpeed)));

    curve.points[0].copy(j3.current.translation());
    curve.points[1].copy(j2Lerped.current);
    curve.points[2].copy(j1Lerped.current);
    curve.points[3].copy(fixed.current.translation());
    band.current.geometry.setPoints(curve.getPoints(32));

    tmp.ang.copy(card.current.angvel());
    tmp.rot.copy(card.current.rotation());
    card.current.setAngvel(
      { x: tmp.ang.x, y: tmp.ang.y - tmp.rot.y * 0.25, z: tmp.ang.z },
      false
    );

    const targetProgress =
      viewState === "transitioningToHome" || viewState === "home" ? 1 : 0;
    transitionProgress.current = THREE.MathUtils.damp(
      transitionProgress.current,
      targetProgress,
      TRANSITION_DAMP,
      delta
    );

    const progress = transitionProgress.current;
    visual.current.position.set(
      0,
      THREE.MathUtils.lerp(baseY, -0.85, progress),
      THREE.MathUtils.lerp(-0.05, 1.25, progress)
    );
    visual.current.rotation.set(
      THREE.MathUtils.lerp(0, -0.32, progress),
      THREE.MathUtils.lerp(0, 1.18, progress),
      THREE.MathUtils.lerp(0, -0.1, progress)
    );
    visual.current.scale.setScalar(THREE.MathUtils.lerp(baseScale, 4.4, progress));

    if (shellMaterial.current) {
      shellMaterial.current.transparent = true;
      shellMaterial.current.opacity = THREE.MathUtils.lerp(1, 0.12, progress);
    }

    if (strapMaterial.current) {
      strapMaterial.current.opacity = THREE.MathUtils.lerp(1, 0, progress);
    }

    applyMaterialOpacity(materials.metal, THREE.MathUtils.lerp(1, 0.12, progress));

    if (markerRef.current) {
      markerRef.current.style.opacity = `${THREE.MathUtils.lerp(0.06, 0, progress)}`;
    }
  });

  curve.curveType = "chordal";

  return (
    <>
      <group position={[0, 4.6, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} collisionGroups={noCollisionGroup} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} collisionGroups={noCollisionGroup} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} collisionGroups={noCollisionGroup} />
        </RigidBody>

        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged && allowDrag ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} collisionGroups={noCollisionGroup} />
          <group
            ref={visual}
            scale={baseScale}
            position={[0, baseY, -0.05]}
            onPointerOver={() => allowDrag && hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(event) => {
              event.stopPropagation();
              (
                event.target as unknown as { releasePointerCapture?: (id: number) => void }
              ).releasePointerCapture?.(event.pointerId);
              drag(false);
            }}
            onPointerDown={(event) => {
              event.stopPropagation();
              if (!allowDrag || !card.current) return;
              (
                event.target as unknown as { setPointerCapture?: (id: number) => void }
              ).setPointerCapture?.(event.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(event.point)
                  .sub(tmp.vec.copy(card.current.translation()))
              );
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                ref={shellMaterial}
                map={faceTexture}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.04}
                roughness={0.2}
                metalness={0.88}
                envMapIntensity={1.08}
                iridescence={0}
                sheen={0.03}
                sheenRoughness={0.4}
              />
            </mesh>
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />

            <Html
              transform
              center
              wrapperClass="card-html-face"
              position={[0, 0.1, 0.06]}
              distanceFactor={distanceFactor}
              style={{ pointerEvents: "none" }}
            >
              <div
                ref={markerRef}
                data-testid="card-face"
                data-drag-state={dragged ? "dragging" : "idle"}
                data-view-state={viewState}
                style={{
                  width: markerSize.width,
                  height: markerSize.height,
                  borderRadius: 24,
                  background: "transparent",
                  border: "1px solid transparent",
                  opacity: 0.06,
                }}
              />
            </Html>
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          ref={strapMaterial}
          color="white"
          depthTest={false}
          resolution={strapResolution}
          useMap={1}
          map={strapTexture}
          repeat={new THREE.Vector2(-3, 1)}
          lineWidth={1}
          transparent
          opacity={1}
        />
      </mesh>
    </>
  );
}
