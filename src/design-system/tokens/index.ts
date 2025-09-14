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

  text: {
    primary: neutral.darkest,
    secondary: neutral.dark,
    muted: neutral.base,
    inverse: "#ffffff",
  },
};

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
  "3xl": "64px",
};

export const typography = {
  fontFamily: {
    sans: ["Inter", "system-ui", "sans-serif"],
  },
  fontSize: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
};
