"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  ThemeConfig, 
  getStoredTheme, 
  applyTheme, 
  saveTheme as saveThemeToStorage, 
  DEFAULT_THEME,
  resetTheme as resetThemeInService
} from "@/lib/theme";

type ThemeContextType = {
  theme: ThemeConfig;
  updateTheme: (newTheme: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
  isDark: boolean;
  toggleDark: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeConfig>(DEFAULT_THEME);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Initial load
    const stored = getStoredTheme();
    setTheme(stored);
    applyTheme(stored);

    // Initial dark mode check
    const isDarkMode = document.documentElement.classList.contains("dark") || 
                       localStorage.getItem("theme") === "dark";
    setIsDark(isDarkMode);
    if (isDarkMode) document.documentElement.classList.add("dark");
  }, []);

  const updateTheme = (newTheme: Partial<ThemeConfig>) => {
    const updated = { ...theme, ...newTheme };
    setTheme(updated);
    applyTheme(updated);
    saveThemeToStorage(updated);
  };

  const resetTheme = () => {
    const defaultTheme = resetThemeInService();
    setTheme(defaultTheme);
  };

  const toggleDark = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, resetTheme, isDark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
