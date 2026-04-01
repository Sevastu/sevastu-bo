export type ThemeConfig = {
  primaryColor: string;
  backgroundColor: string;
  cardColor: string;
  textColor: string;
  borderColor: string;
  successColor: string;
  warningColor: string;
  errorColor: string;
};

export const DEFAULT_THEME: ThemeConfig = {
  primaryColor: "#3b82f6",
  backgroundColor: "#ffffff",
  cardColor: "#ffffff",
  textColor: "#0f172a",
  borderColor: "#e2e8f0",
  successColor: "#22c55e",
  warningColor: "#f59e0b",
  errorColor: "#ef4444",
};

export const DARK_THEME_DEFAULTS: Partial<ThemeConfig> = {
  backgroundColor: "#020617",
  cardColor: "#0f172a",
  textColor: "#f8fafc",
  borderColor: "#1e293b",
};

const THEME_STORAGE_KEY = "sevastu-admin-theme";

export function getStoredTheme(): ThemeConfig {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (!stored) return DEFAULT_THEME;
  try {
    return { ...DEFAULT_THEME, ...JSON.parse(stored) };
  } catch (e) {
    return DEFAULT_THEME;
  }
}

export function saveTheme(theme: ThemeConfig) {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
}

export function applyTheme(theme: ThemeConfig) {
  if (typeof window === "undefined") return;
  const root = document.documentElement;
  
  Object.entries(theme).forEach(([key, value]) => {
    // Convert camelCase to kebab-case for CSS variables
    const cssVar = `--${key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()}`;
    root.style.setProperty(cssVar, value);
  });
}

export function resetTheme() {
  if (typeof window === "undefined") return DEFAULT_THEME;
  localStorage.removeItem(THEME_STORAGE_KEY);
  applyTheme(DEFAULT_THEME);
  return DEFAULT_THEME;
}
