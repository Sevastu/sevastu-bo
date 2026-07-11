export const THEME_COLORS = {
  success: 'hsl(var(--success))',
  warning: 'hsl(var(--warning))',
  error: 'hsl(var(--destructive))',
  info: 'hsl(var(--info))',
  neutral: 'hsl(var(--muted))',
} as const;

export type ThemeColorKey = keyof typeof THEME_COLORS;
