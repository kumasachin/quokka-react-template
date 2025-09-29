import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Typography } from "../Typography";

describe("Typography", () => {
  it("renders with default props", () => {
    render(<Typography>Default text</Typography>);

    const element = screen.getByText("Default text");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("P"); // MUI Typography defaults to paragraph
  });

  it("renders with different variants", () => {
    const { rerender } = render(
      <Typography variant="h1">Heading 1</Typography>
    );
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

    rerender(<Typography variant="h2">Heading 2</Typography>);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();

    rerender(<Typography variant="body1">Body text</Typography>);
    expect(screen.getByText("Body text")).toBeInTheDocument();
  });

  it("applies color prop correctly", () => {
    render(<Typography color="primary">Primary color text</Typography>);

    const element = screen.getByText("Primary color text");
    expect(element).toBeInTheDocument();
  });

  it("passes through additional props", () => {
    render(
      <Typography
        id="test-typography"
        className="custom-class"
        data-testid="typography-element"
      >
        Test text
      </Typography>
    );

    const element = screen.getByTestId("typography-element");
    expect(element).toHaveAttribute("id", "test-typography");
    expect(element).toHaveClass("custom-class");
  });

  it("renders children correctly", () => {
    render(
      <Typography>
        <span>Nested</span> content
      </Typography>
    );

    expect(screen.getByText("Nested")).toBeInTheDocument();
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Typography ref={ref}>Ref test</Typography>);

    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
