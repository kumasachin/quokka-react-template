import { createTheme as createMuiTheme } from "@mui/material/styles";
import { colors, spacing, typography } from "../tokens";

const createTheme = () => {
  return createMuiTheme({
    palette: {
      primary: {
        light: colors.primary.light,
        main: colors.primary.base,
        dark: colors.primary.dark,
        contrastText: colors.white,
      },
      secondary: {
        light: colors.gray.light,
        main: colors.gray.base,
        dark: colors.gray.dark,
        contrastText: colors.white,
      },
      text: {
        primary: colors.text.primary,
        secondary: colors.text.secondary,
        disabled: colors.text.muted,
      },
      background: {
        default: colors.background.primary,
        paper: colors.background.secondary,
      },
      success: {
        main: colors.success,
      },
      warning: {
        main: colors.warning,
      },
      error: {
        main: colors.error,
      },
      info: {
        main: colors.info,
      },
    },
    typography: {
      fontFamily: typography.fontFamily,
      fontSize: 16,
      h1: { fontSize: typography.fontSize["3xl"] },
      h2: { fontSize: typography.fontSize["2xl"] },
      h3: { fontSize: typography.fontSize.xl },
      h4: { fontSize: typography.fontSize.lg },
      h5: { fontSize: typography.fontSize.base },
      h6: { fontSize: typography.fontSize.sm },
      body1: { fontSize: typography.fontSize.base },
      body2: { fontSize: typography.fontSize.sm },
      caption: { fontSize: typography.fontSize.xs },
    },
    spacing: (factor: number) => `${parseInt(spacing.sm) * factor}px`,
  });
};

export const theme = createTheme();
export type Theme = typeof theme;
