import React from "react";
import { theme } from "../theme";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
}: ButtonProps) => {
  const baseStyles: React.CSSProperties = {
    border: "none",
    borderRadius: "6px",
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: theme.typography.fontWeight.medium,
    transition: "all 0.2s ease",
    opacity: disabled ? 0.6 : 1,
    fontFamily: theme.typography.fontFamily.sans.join(", "),
  };

  const variantStyles = {
    primary: {
      backgroundColor: theme.colors.primary.base,
      color: theme.colors.white,
    },
    secondary: {
      backgroundColor: theme.colors.gray.base,
      color: theme.colors.white,
    },
  };

  const sizeStyles = {
    sm: {
      padding: theme.spacing.xs + " " + theme.spacing.sm,
      fontSize: theme.typography.fontSize.sm,
    },
    md: {
      padding: theme.spacing.sm + " " + theme.spacing.md,
      fontSize: theme.typography.fontSize.base,
    },
    lg: {
      padding: theme.spacing.sm + " " + theme.spacing.lg,
      fontSize: theme.typography.fontSize.lg,
    },
  };

  const buttonStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
  };

  return (
    <button
      style={buttonStyles}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};
