import React from "react";
import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from "@mui/material";

export interface TypographyProps extends MuiTypographyProps {}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ color = "textPrimary", ...props }, ref) => {
    return <MuiTypography ref={ref} color={color} {...props} />;
  }
);

Typography.displayName = "Typography";
