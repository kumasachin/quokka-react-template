import { colors, spacing, typography } from "../tokens";

const createTheme = () => {
  return {
    palette: {
      primary: {
        lightest: colors.primary.lightest,
        light: colors.primary.light,
        medium: colors.primary.medium,
        main: colors.primary.base,
        dark: colors.primary.dark,
        darkest: colors.primary.darkest,
      },
      secondary: {
        lightest: colors.gray.lightest,
        light: colors.gray.light,
        medium: colors.gray.medium,
        main: colors.gray.base,
        dark: colors.gray.dark,
        darkest: colors.gray.darkest,
      },
      text: {
        primary: colors.text.primary,
        secondary: colors.text.secondary,
        disabled: colors.text.muted,
        hint: colors.text.muted,
      },
      background: {
        default: colors.background.primary,
        paper: colors.background.secondary,
        surface: colors.background.tertiary,
      },
      common: {
        black: colors.black,
        white: colors.white,
      },
      status: {
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        info: colors.info,
      },
    },
    typography: {
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
    },
    spacing,
  };
};

export const theme = createTheme();
export type Theme = typeof theme;
