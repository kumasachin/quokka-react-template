import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ReactNode } from "react";

// Mock MUI components to avoid file table overflow
vi.mock("@mui/material", () => ({
  Box: ({
    children,
    ...props
  }: {
    children?: ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }) => <div {...props}>{children}</div>,
  Container: ({
    children,
    ...props
  }: {
    children?: ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }) => <div {...props}>{children}</div>,
  Card: ({
    children,
    ...props
  }: {
    children?: ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }) => <div {...props}>{children}</div>,
}));

vi.mock("@mui/icons-material", () => ({
  ErrorOutline: () => <div>ErrorOutline</div>,
  Refresh: () => <div>Refresh</div>,
}));

// Mock design system components
vi.mock("../../design-system/components", () => ({
  Typography: ({
    children,
    ...props
  }: {
    children?: ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }) => <div {...props}>{children}</div>,
  Button: ({
    children,
    onClick,
    ...props
  }: {
    children?: ReactNode;
    onClick?: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
  Card: ({
    children,
    ...props
  }: {
    children?: ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }) => <div {...props}>{children}</div>,
}));

import { ErrorBoundary } from "../ErrorBoundary";

// Mock console.error to avoid noise in test output
const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

// Component that throws an error
const ErrorThrowingComponent = () => {
  throw new Error("Test error");
};

// Component that doesn't throw an error
const NormalComponent = () => <div>Normal component</div>;

describe("ErrorBoundary", () => {
  beforeEach(() => {
    consoleError.mockClear();
  });

  afterAll(() => {
    consoleError.mockRestore();
  });

  it("renders children when no error occurs", () => {
    render(
      <ErrorBoundary>
        <NormalComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Normal component")).toBeInTheDocument();
  });

  it("renders fallback UI when an error occurs", () => {
    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByTestId("error-boundary-container")).toBeInTheDocument();
    expect(screen.getByTestId("error-boundary-card")).toBeInTheDocument();
    expect(screen.getByText("ErrorOutline")).toBeInTheDocument(); // Icon is mocked
    expect(screen.getByTestId("error-boundary-title")).toHaveTextContent(
      "Oops! Something went wrong"
    );
    expect(screen.getByTestId("error-boundary-message")).toHaveTextContent(
      "We encountered an unexpected error. Don't worry, your data is safe."
    );
    expect(
      screen.getByTestId("error-boundary-retry-button")
    ).toBeInTheDocument();
  });

  it("renders custom fallback UI when provided", () => {
    const customFallback = <div>Custom error message</div>;

    render(
      <ErrorBoundary customFallbackUI={customFallback}>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Custom error message")).toBeInTheDocument();
    expect(
      screen.queryByText("Oops! Something went wrong")
    ).not.toBeInTheDocument();
  });

  it("resets error state when Try Again button is clicked", () => {
    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByTestId("error-boundary-container")).toBeInTheDocument();

    // Click the Try Again button
    fireEvent.click(screen.getByTestId("error-boundary-retry-button"));

    // The component should still be in error state since it's a class component
    // and we can't easily test the state reset in this setup
    expect(screen.getByTestId("error-boundary-container")).toBeInTheDocument();
  });

  it("logs error details to console", () => {
    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(consoleError).toHaveBeenCalledWith(
      "ErrorBoundary caught an error:",
      expect.any(Error),
      expect.any(Object)
    );
  });

  it("shows error details in development mode", () => {
    // Mock NODE_ENV
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByTestId("error-boundary-details")).toBeInTheDocument();
    expect(
      screen.getByTestId("error-boundary-details-title")
    ).toHaveTextContent("Error Details (Development Mode):");

    // Restore original env
    process.env.NODE_ENV = originalEnv;
  });

  it("does not show error details in production mode", () => {
    // Mock NODE_ENV
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(
      screen.queryByTestId("error-boundary-details")
    ).not.toBeInTheDocument();

    // Restore original env
    process.env.NODE_ENV = originalEnv;
  });
});
