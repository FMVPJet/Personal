"use client";

import LoadedModel from "./loaded-model";
import type { ProceduralModelProps } from "./model-types";

const MODEL_PATH = "/assets/devices/optimized/logitech-mx-master-2s.glb";

export default function Mouse({ scale = 1 }: ProceduralModelProps) {
  return (
    <LoadedModel
      path={MODEL_PATH}
      scale={scale * 0.82}
      position={[0, 0.03, 0]}
      rotation={[0.02, -0.18, 0.02]}
    />
  );
}
