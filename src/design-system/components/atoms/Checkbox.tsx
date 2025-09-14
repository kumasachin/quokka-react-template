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
  error?: boolean;
  helperText?: string;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      checkboxLabel,
      color = "primary",
      labelPlacement = "end",
      error,
      helperText,
      id,
      ...props
    },
    ref
  ) => {
    const fieldId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const helperTextId = helperText ? `${fieldId}-helper` : undefined;
    const errorTextId = error ? `${fieldId}-error` : undefined;

    const checkboxElement = (
      <MuiCheckbox
        ref={ref}
        id={fieldId}
        color={color}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={helperTextId || errorTextId}
        {...props}
      />
    );

    if (checkboxLabel) {
      return (
        <div>
          <MuiFormControlLabel
            control={checkboxElement}
            label={checkboxLabel}
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
        {checkboxElement}
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

Checkbox.displayName = "Checkbox";
