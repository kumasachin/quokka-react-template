import React from "react";
import {
  Checkbox as MuiCheckbox,
  FormControlLabel as MuiFormControlLabel,
  CheckboxProps as MuiCheckboxProps,
} from "@mui/material";

export interface CheckboxProps extends Omit<MuiCheckboxProps, "color"> {
  checkboxLabel?: string;
  color?: "primary" | "secondary" | "default";
  labelPlacement?: "start" | "end" | "top" | "bottom";
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    { checkboxLabel, color = "primary", labelPlacement = "end", ...props },
    ref
  ) => {
    const checkboxElement = <MuiCheckbox ref={ref} color={color} {...props} />;

    if (checkboxLabel) {
      return (
        <MuiFormControlLabel
          control={checkboxElement}
          label={checkboxLabel}
          labelPlacement={labelPlacement}
        />
      );
    }

    return checkboxElement;
  }
);

Checkbox.displayName = "Checkbox";
