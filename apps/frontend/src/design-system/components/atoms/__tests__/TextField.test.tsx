import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TextField } from "../TextField";

// Mock MUI components
let idCounter = 0;
vi.mock("@mui/material", () => ({
  TextField: React.forwardRef((props: any, ref) => {
    const {
      multiline,
      rows,
      label,
      error,
      helperText,
      fullWidth,
      inputProps,
      InputProps,
      id,
      ...inputPropsRest
    } = props;

    // Generate unique ID if not provided
    const fieldId = id || `textfield-${idCounter++}`;

    if (multiline) {
      return React.createElement(
        "div",
        null,
        label && React.createElement("label", { htmlFor: fieldId }, label),
        React.createElement("textarea", {
          ...inputPropsRest,
          ...inputProps,
          ...InputProps,
          ref,
          rows: rows || 4,
          id: fieldId,
          "aria-invalid": error ? "true" : "false",
          style: fullWidth ? { width: "100%" } : undefined,
        }),
        helperText &&
          React.createElement(
            "div",
            { role: error ? "alert" : undefined },
            helperText
          )
      );
    }

    return React.createElement(
      "div",
      null,
      label && React.createElement("label", { htmlFor: fieldId }, label),
      React.createElement("input", {
        ...inputPropsRest,
        ...inputProps,
        ...InputProps,
        ref,
        type: inputPropsRest.type || "text",
        id: fieldId,
        "aria-invalid": error ? "true" : "false",
        style: fullWidth ? { width: "100%" } : undefined,
      }),
      helperText &&
        React.createElement(
          "div",
          { role: error ? "alert" : undefined },
          helperText
        )
    );
  }),
  FormHelperText: ({ children, error, ...props }: any) =>
    React.createElement(
      "div",
      { ...props, role: error ? "alert" : undefined },
      children
    ),
}));

describe("TextField", () => {
  it("renders with default props", () => {
    render(<TextField label="Test Field" />);

    const input = screen.getByLabelText("Test Field");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("renders with custom props", () => {
    render(
      <TextField
        label="Email"
        type="email"
        placeholder="Enter your email"
        required
        data-testid="email-field"
      />
    );

    const input = screen.getByTestId("email-field");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("placeholder", "Enter your email");
    expect(input).toHaveAttribute("required");
  });

  it("handles value changes", () => {
    const handleChange = vi.fn();
    render(<TextField label="Name" value="" onChange={handleChange} />);

    const input = screen.getByLabelText("Name");
    fireEvent.change(input, { target: { value: "John Doe" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("shows error state and helper text", () => {
    render(
      <TextField
        label="Email"
        error
        helperText="Invalid email address"
        value="invalid-email"
      />
    );

    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");

    expect(screen.getByText("Invalid email address")).toBeInTheDocument();
  });

  it("shows helper text without error", () => {
    render(
      <TextField
        label="Password"
        helperText="Must be at least 8 characters"
        value=""
      />
    );

    expect(
      screen.getByText("Must be at least 8 characters")
    ).toBeInTheDocument();
  });

  it("supports multiline textarea", () => {
    render(
      <TextField
        label="Description"
        multiline
        rows={4}
        value="Test description"
      />
    );

    const textarea = screen.getByLabelText("Description");
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea).toHaveAttribute("rows", "4");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<TextField ref={ref} label="Ref Test" />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it.skip("generates unique IDs when not provided", () => {
    const { rerender } = render(<TextField label="Field 1" />);
    const input1 = screen.getByLabelText("Field 1");

    rerender(<TextField label="Field 2" />);
    const input2 = screen.getByLabelText("Field 2");

    // IDs should be different
    expect(input1.id).not.toBe(input2.id);
  });

  it("uses provided ID", () => {
    render(<TextField label="Custom ID" id="custom-field" />);

    const input = screen.getByLabelText("Custom ID");
    expect(input).toHaveAttribute("id", "custom-field");
  });

  it("passes through additional props", () => {
    render(
      <TextField label="Test" autoComplete="off" className="custom-class" />
    );

    const input = screen.getByLabelText("Test");
    expect(input).toHaveAttribute("autocomplete", "off");
  });
});
