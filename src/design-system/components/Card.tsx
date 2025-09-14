import React, { forwardRef } from "react";
import { Card as MuiCard, CardProps as MuiCardProps } from "@mui/material";

export interface CardProps extends MuiCardProps {}

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { elevation = 2, ...otherProps } = props;

  return <MuiCard ref={ref} elevation={elevation} {...otherProps} />;
});

Card.displayName = "Card";
