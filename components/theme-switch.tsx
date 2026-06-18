"use client";

import { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import clsx from "clsx";

import { SunIcon, MoonIcon } from "@/components/icons";

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reserve space before mount to avoid layout shift in the tab pill.
  if (!mounted) {
    return <div className="w-8 h-8" aria-hidden="true" />;
  }

  const isLight = theme === "light";

  return (
    <button
      type="button"
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      className={clsx(
        "flex items-center justify-center w-8 h-8 rounded-full",
        "text-default-600 hover:text-default-900",
        "transition-colors cursor-pointer",
        className,
      )}
      onClick={() => setTheme(isLight ? "dark" : "light")}
    >
      {isLight ? (
        <SunIcon className="w-5 h-5" />
      ) : (
        <MoonIcon className="w-5 h-5" />
      )}
    </button>
  );
};
