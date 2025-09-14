import React from "react";
import { Box, BoxProps } from "@mui/material";
import { Typography, TypographyProps } from "../atoms";

export interface HeaderProps {
  title: string;
  subtitle?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  gutterBottom?: boolean;
  sx?: BoxProps["sx"];
  align?: "left" | "center" | "right";
  prefix?: React.ReactNode;
  titleProps?: Partial<TypographyProps>;
  subtitleProps?: Partial<TypographyProps>;
}

const getVariant = (level: number): TypographyProps["variant"] => {
  const variants = { 1: "h1", 2: "h2", 3: "h3", 4: "h4", 5: "h5", 6: "h6" };
  return variants[level] || "h3";
};

const getAlignment = (align: string) => {
  if (align === "center") return "center";
  if (align === "right") return "flex-end";
  return "flex-start";
};

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  level = 3,
  gutterBottom = true,
  sx,
  align = "left",
  prefix,
  titleProps,
  subtitleProps,
}) => {
  const titleVariant = getVariant(level);
  const subtitleVariant = level < 6 ? getVariant(level + 1) : "body1";

  return (
    <Box
      sx={{
        textAlign: align,
        mb: gutterBottom ? 3 : 0,
        display: "flex",
        flexDirection: "column",
        alignItems: getAlignment(align),
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: prefix ? 1 : 0,
          width: "100%",
          justifyContent: getAlignment(align),
        }}
      >
        {prefix && (
          <Box sx={{ display: "flex", alignItems: "center" }}>{prefix}</Box>
        )}

        <Typography
          variant={titleVariant}
          gutterBottom={Boolean(subtitle)}
          {...titleProps}
        >
          {title}
        </Typography>
      </Box>

      {subtitle && (
        <Typography
          variant={subtitleVariant}
          color="text.secondary"
          {...subtitleProps}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};
