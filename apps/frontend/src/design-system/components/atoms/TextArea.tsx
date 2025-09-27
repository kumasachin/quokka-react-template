import React from "react";
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";

export interface TextAreaProps
  extends Omit<MuiTextFieldProps, "variant" | "multiline"> {
  variant?: "outlined" | "filled" | "standard";
  minRows?: number;
  maxRows?: number;
}

export const TextArea = React.forwardRef<HTMLDivElement, TextAreaProps>(
  (
    {
      variant = "outlined",
      fullWidth = true,
      minRows = 3,
      maxRows = 6,
      ...props
    },
    ref
  ) => {
    return (
      <MuiTextField
        ref={ref}
        variant={variant}
        fullWidth={fullWidth}
        multiline
        minRows={minRows}
        maxRows={maxRows}
        {...props}
      />
    );
  }
);

TextArea.displayName = "TextArea";
