"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeSwitchCard = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-16 h-16" />
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="no-drag w-full h-full flex flex-col items-center justify-center gap-3 transition-all hover:scale-105"
      aria-label="Toggle theme"
    >
      <div className="text-5xl">
        {isDark ? (
          <FiMoon className="text-blue-400" />
        ) : (
          <FiSun className="text-yellow-500" />
        )}
      </div>
      <span className="text-sm font-medium">
        {isDark ? "Dark" : "Light"}
      </span>
    </button>
  );
};

export default ThemeSwitchCard;
