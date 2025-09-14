import React from "react";
import {
  Select as MuiSelect,
  FormControl as MuiFormControl,
  InputLabel,
  MenuItem,
  SelectProps as MuiSelectProps,
  FormControlProps as MuiFormControlProps,
} from "@mui/material";

export interface SelectProps extends Omit<MuiSelectProps, "variant"> {
  fieldLabel: string;
  options: Array<{ value: string; label: string }>;
  variant?: "outlined" | "filled" | "standard";
  fullWidth?: boolean;
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
    { fieldLabel, options, variant = "outlined", fullWidth = true, ...props },
    ref
  ) => {
    const labelId = `${fieldLabel.toLowerCase().replace(/\s+/g, "-")}-label`;

    return (
      <FormControl fullWidth={fullWidth} variant={variant}>
        <InputLabel id={labelId}>{fieldLabel}</InputLabel>
        <MuiSelect
          ref={ref}
          labelId={labelId}
          label={fieldLabel}
          variant={variant}
          {...props}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    );
  }
);

FormControl.displayName = "FormControl";
Select.displayName = "Select";
