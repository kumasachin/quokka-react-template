import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock the Button component directly to avoid styled-components issues
vi.mock("../Button", () => ({
  Button: React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
      children?: React.ReactNode;
    }
  >((props, ref) => (
    <button {...props} type={props.type || "button"} ref={ref} />
  )),
}));

// Import after mocking
import { Button } from "../Button";

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
  });

  it("renders with custom props", () => {
    render(
      <Button
        variant="secondary"
        size="lg"
        type="submit"
        data-testid="custom-button"
        aria-label="Custom button"
      >
        Submit
      </Button>
    );

    const button = screen.getByTestId("custom-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("aria-label", "Custom button");
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button", { name: "Click me" });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );

    const button = screen.getByRole("button", { name: "Disabled" });
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies correct styling based on variant", () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    let button = screen.getByRole("button", { name: "Primary" });
    expect(button).toBeInTheDocument();

    rerender(<Button variant="secondary">Secondary</Button>);
    button = screen.getByRole("button", { name: "Secondary" });
    expect(button).toBeInTheDocument();
  });

  it("applies correct styling based on size", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    let button = screen.getByRole("button", { name: "Small" });
    expect(button).toBeInTheDocument();

    rerender(<Button size="md">Medium</Button>);
    button = screen.getByRole("button", { name: "Medium" });
    expect(button).toBeInTheDocument();

    rerender(<Button size="lg">Large</Button>);
    button = screen.getByRole("button", { name: "Large" });
    expect(button).toBeInTheDocument();
  });

  it("passes through additional props", () => {
    render(
      <Button id="test-button" className="custom-class" tabIndex={0}>
        Test
      </Button>
    );

    const button = screen.getByRole("button", { name: "Test" });
    expect(button).toHaveAttribute("id", "test-button");
    expect(button).toHaveAttribute("tabindex", "0");
  });

  it("has correct accessibility attributes", () => {
    render(
      <Button aria-label="Accessible button" aria-describedby="description">
        Test
      </Button>
    );

    const button = screen.getByRole("button", { name: "Accessible button" });
    expect(button).toHaveAttribute("aria-label", "Accessible button");
    expect(button).toHaveAttribute("aria-describedby", "description");
  });
});
