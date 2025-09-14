import React from "react";
import styled from "styled-components";
import { theme } from "../theme";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
}

const StyledButton = styled.button<ButtonProps>`
  border: none;
  border-radius: 6px;
  font-family: ${theme.typography.fontFamily};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};

  /* Variant styles */
  background-color: ${(props) =>
    props.variant === "secondary"
      ? theme.palette.secondary.main
      : theme.palette.primary.main};
  color: ${theme.palette.common.white};

  /* Size styles */
  padding: ${(props) => {
    switch (props.size) {
      case "sm":
        return `${theme.spacing.xs} ${theme.spacing.sm}`;
      case "lg":
        return `${theme.spacing.sm} ${theme.spacing.lg}`;
      default:
        return `${theme.spacing.sm} ${theme.spacing.md}`;
    }
  }};

  font-size: ${(props) => {
    switch (props.size) {
      case "sm":
        return theme.typography.fontSize.sm;
      case "lg":
        return theme.typography.fontSize.lg;
      default:
        return theme.typography.fontSize.base;
    }
  }};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </StyledButton>
  );
};
