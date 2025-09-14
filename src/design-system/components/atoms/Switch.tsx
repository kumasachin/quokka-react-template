import React from "react";
import {
  Switch as MuiSwitch,
  FormControlLabel as MuiFormControlLabel,
  SwitchProps as MuiSwitchProps,
  FormControlLabelProps as MuiFormControlLabelProps,
} from "@mui/material";

export interface SwitchProps extends Omit<MuiSwitchProps, "color"> {
  switchLabel?: string;
  color?: "primary" | "secondary" | "default";
  labelPlacement?: "start" | "end" | "top" | "bottom";
}

export interface FormControlLabelProps
  extends Omit<MuiFormControlLabelProps, "control"> {
  control: React.ReactElement;
}

export const FormControlLabel = React.forwardRef<
  HTMLLabelElement,
  FormControlLabelProps
>((props, ref) => {
  return <MuiFormControlLabel ref={ref} {...props} />;
});

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    { switchLabel, color = "primary", labelPlacement = "end", ...props },
    ref
  ) => {
    const switchElement = <MuiSwitch ref={ref} color={color} {...props} />;

    if (switchLabel) {
      return (
        <FormControlLabel
          control={switchElement}
          label={switchLabel}
          labelPlacement={labelPlacement}
        />
      );
    }

    return switchElement;
  }
);

FormControlLabel.displayName = "FormControlLabel";
Switch.displayName = "Switch";
