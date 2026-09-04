"use client";

import LoadedModel from "./loaded-model";
import type { ProceduralModelProps } from "./model-types";

const MODEL_PATH = "/assets/devices/optimized/macbook-pro-14-inch-m5.glb";

export default function MacbookPro({ scale = 1 }: ProceduralModelProps) {
  return <LoadedModel path={MODEL_PATH} scale={scale * 8.5} position={[0, -0.02, 0]} />;
}
