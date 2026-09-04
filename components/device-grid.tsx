"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";

import DeviceCanvas from "./device-canvas";
import Keyboard from "./devices/keyboard";
import MacbookPro from "./devices/macbook-pro";
import Mouse from "./devices/mouse";
import Phone from "./devices/phone";
import type { ProceduralModel } from "./devices/model-types";
import { devices, type DeviceItem, type DeviceModelType } from "@/config/devices";
import { getDeviceAnimationMetadata } from "@/lib/device-transition.mjs";
import { getDeviceIdFromObserverTarget } from "@/lib/device-visibility.mjs";

type RenderMode = "always" | "demand" | "fallback";

const MODEL_REGISTRY: Record<DeviceModelType, ProceduralModel> = {
  "macbook-pro": MacbookPro,
  keyboard: Keyboard,
  mouse: Mouse,
  phone: Phone,
};

interface DeviceTileProps {
  device: DeviceItem;
  isActive: boolean;
  isInteractive: boolean;
  isVisible: boolean;
  index: number;
  renderMode: RenderMode;
  totalCount: number;
  registerTile: (id: string, node: HTMLDivElement | null) => void;
  onActiveChange: (id: string | null) => void;
  onRenderModeChange: (id: string, mode: RenderMode) => void;
}

const DeviceTile = memo(function DeviceTile({
  device,
  isActive,
  isInteractive,
  isVisible,
  index,
  renderMode,
  totalCount,
  registerTile,
  onActiveChange,
  onRenderModeChange,
}: DeviceTileProps) {
  const register = useCallback(
    (node: HTMLDivElement | null) => registerTile(device.id, node),
    [device.id, registerTile],
  );
  const handleRenderModeChange = useCallback(
    (mode: RenderMode) => onRenderModeChange(device.id, mode),
    [device.id, onRenderModeChange],
  );
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      onActiveChange(null);
    }
  };
  const transitionMetadata = getDeviceAnimationMetadata(index, totalCount);
  const animationMetadata = {
    "--device-entry-x": `${transitionMetadata.entryX}vw`,
    "--device-entry-y": `${transitionMetadata.entryY}vh`,
    "--device-delay": `${transitionMetadata.delay}ms`,
  } as React.CSSProperties;

  return (
    <div
      className={`g-item item device-item${device.tileVariant === "half" ? " is-wide" : ""}${isActive ? " is-active" : ""}`}
      data-device-id={device.id}
      data-device-index={index}
      style={animationMetadata}
    >
      <div
        ref={register}
        aria-label={device.accessibleLabel}
        className="g-item-wrap item-wrap device-tile"
        data-category-label="Device"
        data-device-visible={isVisible ? "true" : "false"}
        data-device-interactive={isInteractive ? "true" : "false"}
        data-render-mode={renderMode}
        data-title={device.name}
        role="img"
        tabIndex={isInteractive ? 0 : -1}
        onBlur={handleBlur}
        onFocus={() => onActiveChange(device.id)}
        onMouseEnter={() => onActiveChange(device.id)}
        onMouseLeave={() => onActiveChange(null)}
      >
        <div className="g-item-content item-content device-item-content">
          <DeviceCanvas
            isActive={isActive}
            isVisible={isVisible}
            modelComponent={MODEL_REGISTRY[device.modelType]}
            modelType={device.modelType}
            name={device.name}
            onRenderModeChange={handleRenderModeChange}
          />
        </div>
      </div>
    </div>
  );
});

interface DeviceGridProps {
  isInteractive?: boolean;
}

export default function DeviceGrid({ isInteractive = false }: DeviceGridProps) {
  const tileRefs = useRef(new Map<string, HTMLDivElement>());
  const [activeId, setActiveId] = useState<string | null>(null);
  const [visibleIds, setVisibleIds] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(devices.map((device) => [device.id, false])),
  );
  const [renderModes, setRenderModes] = useState<Record<string, RenderMode>>(() =>
    Object.fromEntries(devices.map((device) => [device.id, "fallback"])),
  );

  const registerTile = useCallback((id: string, node: HTMLDivElement | null) => {
    if (node) tileRefs.current.set(id, node);
    else tileRefs.current.delete(id);
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setVisibleIds(Object.fromEntries(devices.map((device) => [device.id, true])));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleIds((current) => {
          const next = { ...current };
          entries.forEach((entry) => {
            const id = getDeviceIdFromObserverTarget(entry.target as HTMLElement);
            if (id) next[id] = entry.isIntersecting;
          });
          return next;
        });
      },
      { rootMargin: "24px 0px" },
    );

    tileRefs.current.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const updateRenderMode = useCallback((id: string, mode: RenderMode) => {
    setRenderModes((current) => {
      if (current[id] === mode) return current;
      return { ...current, [id]: mode };
    });
  }, []);

  return (
    <div className="g-grid-wrap device-grid-wrap">
      <div className="g-grid title-big device-grid" id="portfolio">
        {devices.map((device, index) => (
          <DeviceTile
            key={device.id}
            device={device}
            isActive={activeId === device.id}
            isInteractive={isInteractive}
            isVisible={visibleIds[device.id] ?? true}
            index={index}
            registerTile={registerTile}
            renderMode={renderModes[device.id] ?? "fallback"}
            totalCount={devices.length}
            onActiveChange={setActiveId}
            onRenderModeChange={updateRenderMode}
          />
        ))}
      </div>

      <div aria-hidden="true" className="g-big-title-caption">
        <div className="g-caption-outer">
          <div className="g-caption-inner">
            <div className="g-hover-caption">
              <h2 className="g-caption-title" />
              <p className="g-caption-cat" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
