import React from "react";
import { Alert as MuiAlert, AlertProps as MuiAlertProps } from "@mui/material";

export interface AlertProps extends MuiAlertProps {}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (props, ref) => {
    return <MuiAlert ref={ref} {...props} />;
  }
);

Alert.displayName = "Alert";
