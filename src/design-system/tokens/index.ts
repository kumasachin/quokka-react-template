const teal = {
  lightest: "#f0fdfa",
  light: "#99f6e4",
  medium: "#2dd4bf",
  base: "#14b8a6",
  dark: "#0d9488",
  darkest: "#115e59",
};

const neutral = {
  lightest: "#f9fafb",
  light: "#e5e7eb",
  medium: "#9ca3af",
  base: "#6b7280",
  dark: "#374151",
  darkest: "#111827",
};

export const colors = {
  primary: teal,
  gray: neutral,
  white: "#ffffff",
  black: "#000000",

  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  info: teal.base,

  text: {
    primary: neutral.darkest,
    secondary: neutral.dark,
    muted: neutral.base,
    inverse: "#ffffff",
  },

  background: {
    primary: "#ffffff",
    secondary: neutral.lightest,
    tertiary: neutral.light,
  },
};

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
};

export const typography = {
  fontFamily: "Inter, system-ui , sans-serif",
  fontSize: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
  },
};

export const borderDepth = {
  none: "0px",
  sm: "2px",
  base: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  full: "9999px",
};
