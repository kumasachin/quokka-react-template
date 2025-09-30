import React from "react";
import {
  CircularProgress as MuiCircularProgress,
  CircularProgressProps as MuiCircularProgressProps,
} from "@mui/material";

export interface CircularProgressProps extends MuiCircularProgressProps {}

export const CircularProgress = React.forwardRef<
  HTMLDivElement,
  CircularProgressProps
>((props, ref) => {
  return <MuiCircularProgress ref={ref} {...props} />;
});

CircularProgress.displayName = "CircularProgress";
