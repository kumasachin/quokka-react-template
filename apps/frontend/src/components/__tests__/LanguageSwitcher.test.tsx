import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LanguageSwitcher from "../LanguageSwitcher";

describe("LanguageSwitcher", () => {
  it("renders language chip with flag and name", () => {
    render(<LanguageSwitcher />);

    expect(screen.getByTestId("language-switcher")).toBeInTheDocument();
    // Should show the English flag and name
    expect(screen.getByText("🇺🇸")).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<LanguageSwitcher />);

    const chip = screen.getByTestId("language-switcher-chip");
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveAttribute("aria-label", "Current language: English");
  });

  it("renders with outlined variant and small size", () => {
    render(<LanguageSwitcher />);

    const chip = screen.getByTestId("language-switcher-chip");
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveClass("MuiChip-outlined");
  });

  it("renders flag as aria-hidden", () => {
    render(<LanguageSwitcher />);

    const flag = screen.getByText("🇺🇸");
    expect(flag).toHaveAttribute("aria-hidden", "true");
  });
});
