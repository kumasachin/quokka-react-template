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
  error?: boolean;
  helperText?: string;
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
    {
      switchLabel,
      color = "primary",
      labelPlacement = "end",
      error,
      helperText,
      id,
      ...props
    },
    ref
  ) => {
    const fieldId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;
    const helperTextId = helperText ? `${fieldId}-helper` : undefined;
    const errorTextId = error ? `${fieldId}-error` : undefined;

    const switchElement = (
      <MuiSwitch
        ref={ref}
        id={fieldId}
        color={color}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={helperTextId || errorTextId}
        {...props}
      />
    );

    if (switchLabel) {
      return (
        <div>
          <FormControlLabel
            control={switchElement}
            label={switchLabel}
            labelPlacement={labelPlacement}
          />
          {helperText && (
            <div
              id={helperTextId}
              role={error ? "alert" : undefined}
              aria-live={error ? "polite" : undefined}
              style={{
                fontSize: "0.75rem",
                color: error ? "#f44336" : "#666",
                marginTop: "3px",
                marginLeft: labelPlacement === "start" ? 0 : "32px",
              }}
            >
              {helperText}
            </div>
          )}
        </div>
      );
    }

    return (
      <div>
        {switchElement}
        {helperText && (
          <div
            id={helperTextId}
            role={error ? "alert" : undefined}
            aria-live={error ? "polite" : undefined}
            style={{
              fontSize: "0.75rem",
              color: error ? "#f44336" : "#666",
              marginTop: "3px",
            }}
          >
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

FormControlLabel.displayName = "FormControlLabel";
Switch.displayName = "Switch";
