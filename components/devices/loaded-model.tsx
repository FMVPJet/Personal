"use client";

import { useCallback, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { Clone, useGLTF } from "@react-three/drei";
import { KTX2Loader } from "three-stdlib";

let sharedKtx2Loader: KTX2Loader | null = null;

interface LoadedModelProps {
  path: string;
  scale: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function LoadedModel({
  path,
  scale,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: LoadedModelProps) {
  const gl = useThree((state) => state.gl);
  const ktx2Loader = useMemo(() => {
    if (!sharedKtx2Loader) {
      sharedKtx2Loader = new KTX2Loader();
      sharedKtx2Loader.setTranscoderPath("/basis/");
      sharedKtx2Loader.detectSupport(gl);
    }
    return sharedKtx2Loader;
  }, [gl]);
  const extendLoader = useCallback(
    (loader: { setKTX2Loader: (ktx2Loader: KTX2Loader) => void }) => {
      loader.setKTX2Loader(ktx2Loader);
    },
    [ktx2Loader],
  );
  const { scene } = useGLTF(path, false, true, extendLoader);

  return <Clone object={scene} position={position} rotation={rotation} scale={scale} />;
}
