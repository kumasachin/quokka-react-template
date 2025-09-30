import React from "react";
import { Box, BoxProps, Typography } from "@mui/material";
import { Button } from "../atoms";

export interface EmptyStateProps extends BoxProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, sx, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          textAlign: "center",
          py: 8,
          px: 4,
          backgroundColor: "background.paper",
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          ...sx,
        }}
        {...props}
      >
        {icon && <Box sx={{ mb: 2 }}>{icon}</Box>}
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ mb: 1, fontWeight: 500 }}
        >
          {title}
        </Typography>
        {description && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, maxWidth: 400, mx: "auto" }}
          >
            {description}
          </Typography>
        )}
        {action && (
          <Button variant="primary" onClick={action.onClick}>
            {action.label}
          </Button>
        )}
      </Box>
    );
  }
);

EmptyState.displayName = "EmptyState";

export default EmptyState;
