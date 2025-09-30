import React from "react";
import { Box, BoxProps } from "@mui/material";

export interface PageSectionProps extends BoxProps {
  variant?: "default" | "elevated" | "outlined";
}

const PageSection = React.forwardRef<HTMLDivElement, PageSectionProps>(
  ({ variant = "default", sx, ...props }, ref) => {
    const getVariantStyles = () => {
      switch (variant) {
        case "elevated":
          return {
            p: 3,
            backgroundColor: "background.paper",
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            border: "1px solid",
            borderColor: "divider",
          };
        case "outlined":
          return {
            p: 3,
            backgroundColor: "background.paper",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "none",
          };
        default:
          return {};
      }
    };

    return (
      <Box
        ref={ref}
        sx={{
          ...getVariantStyles(),
          ...sx,
        }}
        {...props}
      />
    );
  }
);

PageSection.displayName = "PageSection";

export default PageSection;
