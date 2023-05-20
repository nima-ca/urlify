"use client";

import { FC } from "react";
import { MoonIcon } from "./ui/icons/Moon";
import { SunIcon } from "./ui/icons/Sun";
import { useTheme } from "next-themes";
import { colorModes } from "@src/lib/enum";

const ThemeToggle: FC = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === colorModes.DARK;

  return (
    <span
      onClick={() => setTheme(isDark ? colorModes.LIGHT : colorModes.DARK)}
      className="flex justify-center items-center w-10 h-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-all cursor-pointer"
    >
      {isDark ? (
        <MoonIcon className="w-6 h-6 text-slate-900 dark:text-slate-300" />
      ) : (
        <SunIcon className="w-6 h-6 text-slate-900 dark:text-slate-300" />
      )}
    </span>
  );
};

export default ThemeToggle;
