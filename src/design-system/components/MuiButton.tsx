import React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

export interface ButtonProps extends Omit<MuiButtonProps, "variant"> {
  variant?: "primary" | "secondary" | "text" | "outlined";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", ...props }, ref) => {
    const muiVariant =
      variant === "primary"
        ? "contained"
        : variant === "secondary"
        ? "outlined"
        : variant;

    const color =
      variant === "primary"
        ? "primary"
        : variant === "secondary"
        ? "secondary"
        : "primary";

    return (
      <MuiButton
        ref={ref}
        variant={muiVariant as MuiButtonProps["variant"]}
        color={color}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
