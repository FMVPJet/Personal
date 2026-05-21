"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { badgeProfile } from "@/app/badge-profile";
import ProfileHome from "@/components/profile-home";

const BadgeCanvas = dynamic(() => import("@/components/badge-canvas"), {
  ssr: false,
});

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
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
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
          aria-label={`Switch to ${nextThemeLabel.toLowerCase()} mode`}
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

      {cardOpen ? <BadgeCanvas onClose={() => setCardOpen(false)} /> : null}
    </div>
  );
}
