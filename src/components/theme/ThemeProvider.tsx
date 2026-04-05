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
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Prevent flash of incorrect theme
    const stored = getStoredTheme();
    const isDarkMode = localStorage.getItem("theme") === "dark" ||
                       (!localStorage.getItem("theme") && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDark(isDarkMode);
    setTheme(stored);
    applyTheme(stored);
    
    // Apply dark class to html element
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    setIsInitialized(true);
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
    
    // Add transition class for smooth theme switching
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    
    // Remove transition after animation completes
    setTimeout(() => {
      document.documentElement.style.transition = '';
    }, 300);
  };

  // Don't render children until theme is initialized to prevent flash
  if (!isInitialized) {
    return null;
  }

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
