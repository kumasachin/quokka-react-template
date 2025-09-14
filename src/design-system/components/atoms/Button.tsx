import React from "react";
import styled from "styled-components";

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
  font-family: ${(props) => props.theme.typography.fontFamily};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};

  background-color: ${(props) =>
    props.variant === "secondary"
      ? props.theme.palette.secondary.main
      : props.theme.palette.primary.main};
  color: ${(props) => props.theme.palette.common.white};

  padding: ${(props) => {
    switch (props.size) {
      case "sm":
        return `${props.theme.spacing(1)} ${props.theme.spacing(2)}`;
      case "lg":
        return `${props.theme.spacing(2)} ${props.theme.spacing(4)}`;
      default:
        return `${props.theme.spacing(2)} ${props.theme.spacing(3)}`;
    }
  }};

  font-size: ${(props) => {
    switch (props.size) {
      case "sm":
        return "14px";
      case "lg":
        return "18px";
      default:
        return "16px";
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
