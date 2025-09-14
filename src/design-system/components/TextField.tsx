import React from "react";
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";

export interface TextFieldProps extends MuiTextFieldProps {}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ variant = "outlined", fullWidth = true, ...props }, ref) => {
    return (
      <MuiTextField
        ref={ref}
        variant={variant}
        fullWidth={fullWidth}
        {...props}
      />
    );
  }
);

TextField.displayName = "TextField";
