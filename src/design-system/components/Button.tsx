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

const StyledButton = styled.button<
  Pick<ButtonProps, "variant" | "size" | "disabled">
>`
  border: none;
  border-radius: ${theme.borderDepth.md};
  font-family: ${theme.typography.fontFamily.sans.join(", ")};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};

  ${(props) => {
    switch (props.variant) {
      case "secondary":
        return `
          background-color: ${theme.colors.gray.base};
          color: ${theme.colors.white};
        `;
      case "primary":
      default:
        return `
          background-color: ${theme.colors.primary.base};
          color: ${theme.colors.white};
        `;
    }
  }}

  ${(props) => {
    switch (props.size) {
      case "sm":
        return `
          padding: ${theme.spacing.xs} ${theme.spacing.sm};
          font-size: ${theme.typography.fontSize.sm};
        `;
      case "lg":
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.lg};
          font-size: ${theme.typography.fontSize.lg};
        `;
      case "md":
      default:
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.typography.fontSize.base};
        `;
    }
  }}

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
