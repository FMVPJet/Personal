"use client";

import type { ComponentProps } from "react";
import DeviceCanvas from "./device-canvas";
import Keyboard from "./devices/keyboard";
import MacbookPro from "./devices/macbook-pro";
import Mouse from "./devices/mouse";
import Phone from "./devices/phone";
import type { ProceduralModel } from "./devices/model-types";
import type { DeviceModelType } from "@/config/devices";

const MODEL_REGISTRY: Record<DeviceModelType, ProceduralModel> = {
  "macbook-pro": MacbookPro,
  keyboard: Keyboard,
  mouse: Mouse,
  phone: Phone,
};

export default function DeviceRenderer(props: Omit<ComponentProps<typeof DeviceCanvas>, "modelComponent">) {
  return <DeviceCanvas {...props} modelComponent={MODEL_REGISTRY[props.modelType]} />;
}
