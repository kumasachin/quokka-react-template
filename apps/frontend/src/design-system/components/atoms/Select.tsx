import React from "react";
import {
  Select as MuiSelect,
  FormControl as MuiFormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  SelectProps as MuiSelectProps,
  FormControlProps as MuiFormControlProps,
} from "@mui/material";

export interface SelectProps extends Omit<MuiSelectProps, "variant"> {
  fieldLabel: string;
  options: Array<{ value: string; label: string }>;
  variant?: "outlined" | "filled" | "standard";
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
}

export interface FormControlProps extends MuiFormControlProps {
  fullWidth?: boolean;
}

export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ fullWidth = true, ...props }, ref) => {
    return <MuiFormControl ref={ref} fullWidth={fullWidth} {...props} />;
  }
);

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      fieldLabel,
      options,
      variant = "outlined",
      fullWidth = true,
      error,
      helperText,
      id,
      ...props
    },
    ref
  ) => {
    const fieldId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const labelId = `${fieldId}-label`;
    const helperTextId = helperText ? `${fieldId}-helper` : undefined;
    const errorTextId = error ? `${fieldId}-error` : undefined;

    return (
      <>
        <FormControl fullWidth={fullWidth} variant={variant} error={error}>
          <InputLabel id={labelId}>{fieldLabel}</InputLabel>
          <MuiSelect
            ref={ref}
            id={fieldId}
            labelId={labelId}
            label={fieldLabel}
            variant={variant}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={helperTextId || errorTextId}
            {...props}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </MuiSelect>
          {helperText && (
            <FormHelperText
              id={helperTextId}
              role={error ? "alert" : undefined}
              aria-live={error ? "polite" : undefined}
            >
              {helperText}
            </FormHelperText>
          )}
        </FormControl>
      </>
    );
  }
);

FormControl.displayName = "FormControl";
Select.displayName = "Select";
