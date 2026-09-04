"use client";

import LoadedModel from "./loaded-model";
import type { ProceduralModelProps } from "./model-types";

const MODEL_PATH = "/assets/devices/optimized/keychron-k8.glb";

export default function Keyboard({ scale = 1 }: ProceduralModelProps) {
  return (
    <LoadedModel
      path={MODEL_PATH}
      scale={scale * 1.08}
      position={[0, -0.1, 0]}
      rotation={[-0.04, 0.08, 0]}
    />
  );
}
