"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { devices } from "@/config/devices";
import { getDeviceTransitionDuration } from "@/lib/device-transition.mjs";

import AboutSection from "./about-section";
import DeviceGrid from "./device-grid";

type HomeView = "profile" | "devices";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export default function HomeExperience() {
  const [view, setView] = useState<HomeView>("profile");
  const [isExiting, setIsExiting] = useState(false);
  const [isDeviceReady, setIsDeviceReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const gestureRef = useRef({ startedOnDevice: false });
  const devicesButtonRef = useRef<HTMLButtonElement>(null);
  const deviceHeadingRef = useRef<HTMLHeadingElement>(null);
  const focusDeviceViewRef = useRef(false);
  const restoreProfileFocusRef = useRef(false);
  const exitTimerRef = useRef<number | null>(null);

  const transitionDuration = getDeviceTransitionDuration(devices.length);

  const clearExitTimer = useCallback(() => {
    if (exitTimerRef.current === null) return;
    window.clearTimeout(exitTimerRef.current);
    exitTimerRef.current = null;
  }, []);

  const enterDevices = useCallback(() => {
    clearExitTimer();
    focusDeviceViewRef.current = true;
    restoreProfileFocusRef.current = false;
    setIsExiting(false);
    setIsDeviceReady(false);
    setView("devices");
  }, [clearExitTimer]);

  const exitDevices = useCallback(() => {
    if (view !== "devices" || isExiting) return;

    clearExitTimer();
    restoreProfileFocusRef.current = true;
    setIsExiting(true);
    setIsDeviceReady(false);

    if (prefersReducedMotion) {
      setView("profile");
      setIsExiting(false);
      return;
    }

    exitTimerRef.current = window.setTimeout(() => {
      exitTimerRef.current = null;
      setView("profile");
      setIsExiting(false);
    }, transitionDuration);
  }, [clearExitTimer, isExiting, prefersReducedMotion, transitionDuration, view]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener?.("change", updatePreference);
    return () => mediaQuery.removeEventListener?.("change", updatePreference);
  }, []);

  useEffect(() => {
    if (view !== "devices" || isExiting) return;

    if (prefersReducedMotion) {
      const frame = window.requestAnimationFrame(() => setIsDeviceReady(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const timer = window.setTimeout(() => setIsDeviceReady(true), transitionDuration);
    return () => window.clearTimeout(timer);
  }, [isExiting, prefersReducedMotion, transitionDuration, view]);

  useEffect(() => {
    if (view === "devices" && !isExiting && focusDeviceViewRef.current) {
      focusDeviceViewRef.current = false;
      deviceHeadingRef.current?.focus();
    }

    if (view === "profile" && !isExiting && restoreProfileFocusRef.current) {
      restoreProfileFocusRef.current = false;
      devicesButtonRef.current?.focus();
    }
  }, [isExiting, view]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || view !== "devices") return;
      event.preventDefault();
      exitDevices();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [exitDevices, view]);

  useEffect(() => () => clearExitTimer(), [clearExitTimer]);

  const handlePointerDownCapture = (event: React.PointerEvent<HTMLElement>) => {
    gestureRef.current.startedOnDevice =
      event.target instanceof Element && Boolean(event.target.closest(".device-item"));
  };

  const handlePointerCancelCapture = () => {
    gestureRef.current.startedOnDevice = false;
  };

  const handleBlankClick = (event: React.MouseEvent<HTMLElement>) => {
    if (view !== "devices" || isExiting) return;

    const clickedInsideDevice =
      event.target instanceof Element && Boolean(event.target.closest(".device-item"));
    if (clickedInsideDevice || gestureRef.current.startedOnDevice) {
      gestureRef.current.startedOnDevice = false;
      return;
    }

    exitDevices();
  };

  const profileHidden = view !== "profile" || isExiting;
  const deviceLayerHidden = view !== "devices" || isExiting;
  const deviceInteractive = view === "devices" && isDeviceReady && !isExiting;

  return (
    <div
      className={`g-home-experience g-view-${view}${isExiting ? " is-exiting" : ""}${isDeviceReady ? " is-device-ready" : ""}`}
      data-device-ready={deviceInteractive ? "true" : "false"}
      data-view={view}
      style={{ "--device-transition-duration": `${transitionDuration}ms` } as React.CSSProperties}
      onClick={handleBlankClick}
      onPointerCancelCapture={handlePointerCancelCapture}
      onPointerDownCapture={handlePointerDownCapture}
    >
      <AboutSection
        devicesButtonRef={devicesButtonRef}
        isDevicesActive={view !== "profile"}
        isHidden={profileHidden}
        onDevicesClick={enterDevices}
      />

      <section
        aria-hidden={deviceLayerHidden}
        aria-labelledby="device-view-heading"
        className="g-device-view"
        inert={deviceLayerHidden}
      >
        <h2 ref={deviceHeadingRef} className="g-sr-only" id="device-view-heading" tabIndex={-1}>
          Devices
        </h2>
        <DeviceGrid isInteractive={deviceInteractive} />
      </section>
    </div>
  );
}
