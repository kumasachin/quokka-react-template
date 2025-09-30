import React from "react";
import { Chip, ChipProps } from "@mui/material";

export type StatusType =
  | "active"
  | "inactive"
  | "draft"
  | "online"
  | "offline"
  | "maintenance";

export interface StatusChipProps extends Omit<ChipProps, "color"> {
  status: StatusType;
  variant?: "filled" | "outlined";
}

const statusColors: Record<StatusType, ChipProps["color"]> = {
  active: "success",
  inactive: "error",
  draft: "warning",
  online: "success",
  offline: "error",
  maintenance: "warning",
};

export const StatusChip: React.FC<StatusChipProps> = ({
  status,
  variant = "filled",
  size = "small",
  sx,
  ...props
}) => {
  return (
    <Chip
      label={status.charAt(0).toUpperCase() + status.slice(1)}
      color={statusColors[status]}
      variant={variant}
      size={size}
      sx={{
        fontWeight: 500,
        borderRadius: 2,
        ...sx,
      }}
      {...props}
    />
  );
};
