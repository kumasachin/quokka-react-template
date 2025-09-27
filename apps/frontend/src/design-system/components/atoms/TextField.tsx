import React from "react";
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
  FormHelperText,
} from "@mui/material";

export interface TextFieldProps extends Omit<MuiTextFieldProps, "variant"> {
  variant?: "outlined" | "filled" | "standard";
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      variant = "outlined",
      fullWidth = true,
      error,
      helperText,
      id,
      label,
      ...props
    },
    ref
  ) => {
    const fieldId =
      id || `textfield-${Math.random().toString(36).substr(2, 9)}`;
    const helperTextId = helperText ? `${fieldId}-helper` : undefined;
    const errorTextId = error ? `${fieldId}-error` : undefined;

    return (
      <>
        <MuiTextField
          ref={ref}
          id={fieldId}
          variant={variant}
          fullWidth={fullWidth}
          error={error}
          label={label}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={helperTextId || errorTextId}
          {...props}
        />
        {helperText && (
          <FormHelperText
            id={helperTextId}
            error={error}
            role={error ? "alert" : undefined}
            aria-live={error ? "polite" : undefined}
          >
            {helperText}
          </FormHelperText>
        )}
      </>
    );
  }
);

TextField.displayName = "TextField";
