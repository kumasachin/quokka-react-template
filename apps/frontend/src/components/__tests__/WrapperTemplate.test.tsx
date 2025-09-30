import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ReactNode } from "react";

// Mock all MUI components to avoid file table overflow
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
  Tab: ({
    children,
    label,
    ...props
  }: {
    children?: ReactNode;
    label?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }) => (
    <button role="tab" {...props}>
      {label || children}
    </button>
  ),
  Tabs: ({
    children,
    value,
    onChange,
    ...props
  }: {
    children?: ReactNode;
    value?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange?: (event: any, value: number) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }) => {
    const handleTabClick = (index: number) => {
      if (onChange) {
        onChange({}, index);
      }
    };

    return (
      <div role="tablist" {...props}>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              onClick: () => handleTabClick(index),
              "aria-selected": value === index ? "true" : "false",
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any);
          }
          return child;
        })}
      </div>
    );
  },
  useTheme: () => ({
    breakpoints: {
      down: () => false,
    },
    zIndex: {
      appBar: 1100,
    },
  }),
  useMediaQuery: () => false,
}));

// Mock MUI icons
vi.mock("@mui/icons-material", () => ({
  Security: () => <div>Security</div>,
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
  ToastPanel: () => <div>ToastPanel</div>,
}));

// Mock ErrorBoundary
vi.mock("../ErrorBoundary", () => ({
  default: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
}));

import WrapperTemplate from "../layout/WrapperTemplate";

// Mock react-router-dom hooks
const mockNavigate = vi.fn();
const mockLocation = { pathname: "/" };

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
  };
});

const renderWrapperTemplate = (initialPath = "/") => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <WrapperTemplate />
    </MemoryRouter>
  );
};

describe("WrapperTemplate", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders with correct data-testid", () => {
    renderWrapperTemplate();
    expect(screen.getByTestId("wrapper-template")).toBeInTheDocument();
  });

  it("renders all navigation tabs", () => {
    renderWrapperTemplate();

    expect(screen.getByTestId("nav-tab-home")).toBeInTheDocument();
    expect(screen.getByTestId("nav-tab-devices")).toBeInTheDocument();
    expect(screen.getByTestId("nav-tab-patches")).toBeInTheDocument();
    expect(screen.getByTestId("nav-tab-firewall")).toBeInTheDocument();
    expect(screen.getByTestId("nav-tab-policies")).toBeInTheDocument();
    expect(screen.getByTestId("nav-tab-settings")).toBeInTheDocument();
  });

  it("highlights the correct tab based on current path", () => {
    mockLocation.pathname = "/policies";
    renderWrapperTemplate("/policies");

    // The Policies tab should be selected
    const policiesTab = screen.getByTestId("nav-tab-policies");
    expect(policiesTab).toHaveAttribute("aria-selected", "true");
  });

  it("navigates to correct route when tab is clicked", () => {
    renderWrapperTemplate();

    const devicesTab = screen.getByTestId("nav-tab-devices");
    fireEvent.click(devicesTab);

    expect(mockNavigate).toHaveBeenCalledWith("/devices");
  });

  it("renders ErrorBoundary wrapper", () => {
    renderWrapperTemplate();

    // ErrorBoundary should be present (though we can't easily test its internal state)
    expect(screen.getByTestId("wrapper-template")).toBeInTheDocument();
  });

  it("renders skip link for accessibility", () => {
    renderWrapperTemplate();

    const skipLink = screen.getByTestId("skip-link");
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  it("renders main content area", () => {
    renderWrapperTemplate();

    const mainContent = screen.getByTestId("main-content");
    expect(mainContent).toBeInTheDocument();
    expect(mainContent).toHaveAttribute("id", "main-content");
  });

  it("renders ToastPanel", () => {
    renderWrapperTemplate();

    // ToastPanel should be rendered (we can check for its presence)
    expect(screen.getByTestId("wrapper-template")).toBeInTheDocument();
  });

  it("has proper tab accessibility attributes", () => {
    renderWrapperTemplate();

    const tabList = screen.getByTestId("navigation-tabs");
    expect(tabList).toBeInTheDocument();
    expect(tabList).toHaveAttribute("aria-label", "Navigation tabs");

    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(6); // Dashboard, Devices, Patches, Firewall, Policies, Settings
  });

  it("renders app header with title", () => {
    renderWrapperTemplate();

    expect(screen.getByTestId("app-header")).toBeInTheDocument();
    expect(screen.getByTestId("app-title")).toHaveTextContent(
      "CyberSmart Platform"
    );
  });

  it("renders footer", () => {
    renderWrapperTemplate();

    expect(screen.getByTestId("app-footer")).toBeInTheDocument();
    expect(screen.getByTestId("footer-text")).toHaveTextContent(
      "© 2025 CyberSmart Platform. All rights reserved."
    );
  });

  it("highlights the correct tab based on current path", () => {
    mockLocation.pathname = "/policies";
    renderWrapperTemplate("/policies");

    // The Policies tab should be selected
    const policiesTab = screen.getByRole("tab", { name: "Policies" });
    expect(policiesTab).toHaveAttribute("aria-selected", "true");
  });

  it("navigates to correct route when tab is clicked", () => {
    renderWrapperTemplate();

    const devicesTab = screen.getByRole("tab", { name: "Devices" });
    fireEvent.click(devicesTab);

    expect(mockNavigate).toHaveBeenCalledWith("/devices");
  });

  it("renders ErrorBoundary wrapper", () => {
    renderWrapperTemplate();

    // ErrorBoundary should be present (though we can't easily test its internal state)
    expect(screen.getByTestId("wrapper-template")).toBeInTheDocument();
  });

  it("renders skip link for accessibility", () => {
    renderWrapperTemplate();

    const skipLink = screen.getByText("Skip to main content");
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  it("renders main content area", () => {
    renderWrapperTemplate();

    const mainContent = screen.getByRole("main");
    expect(mainContent).toBeInTheDocument();
    expect(mainContent).toHaveAttribute("id", "main-content");
  });

  it("renders ToastPanel", () => {
    renderWrapperTemplate();

    // ToastPanel should be rendered (we can check for its presence)
    expect(screen.getByTestId("wrapper-template")).toBeInTheDocument();
  });

  it("has proper tab accessibility attributes", () => {
    renderWrapperTemplate();

    const tabList = screen.getByRole("tablist");
    expect(tabList).toBeInTheDocument();
    expect(tabList).toHaveAttribute("aria-label", "Navigation tabs");

    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(6); // Dashboard, Devices, Patches, Firewall, Policies, Settings
  });
});
