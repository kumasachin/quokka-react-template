import React from "react";
import { Chip, ChipProps } from "@mui/material";

export type PriorityType = "low" | "medium" | "high" | "critical";

export interface PriorityChipProps extends Omit<ChipProps, "color"> {
  priority: PriorityType;
  variant?: "filled" | "outlined";
}

const priorityColors: Record<PriorityType, ChipProps["color"]> = {
  low: "default",
  medium: "info",
  high: "warning",
  critical: "error",
};

export const PriorityChip: React.FC<PriorityChipProps> = ({
  priority,
  variant = "outlined",
  size = "small",
  sx,
  ...props
}) => {
  return (
    <Chip
      label={priority.charAt(0).toUpperCase() + priority.slice(1)}
      color={priorityColors[priority]}
      variant={variant}
      size={size}
      sx={{
        fontWeight: 500,
        borderRadius: 2,
        textTransform: "capitalize",
        ...sx,
      }}
      {...props}
    />
  );
};
