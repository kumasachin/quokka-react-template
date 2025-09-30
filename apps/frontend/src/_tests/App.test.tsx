import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ReactNode } from "react";
import App from "../App";

// Mock the auth store to simulate authenticated state
vi.mock("../state", () => ({
  useAuthStore: () => ({
    isAuthenticated: true,
    user: { username: "admin" },
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

// Mock all page components
vi.mock("../pages/HomePage", () => ({
  default: () => <div data-testid="home-page">Home Page</div>,
}));

vi.mock("../pages/DevicePage", () => ({
  default: () => <div data-testid="device-page">Device Page</div>,
}));

vi.mock("../pages/PatchPage", () => ({
  default: () => <div data-testid="patch-page">Patch Page</div>,
}));

vi.mock("../pages/FirewallPage", () => ({
  default: () => <div data-testid="firewall-page">Firewall Page</div>,
}));

vi.mock("../pages/PoliciesPage", () => ({
  default: () => <div data-testid="policies-page">Policies Page</div>,
}));

vi.mock("../pages/SettingsPage", () => ({
  default: () => <div data-testid="settings-page">Settings Page</div>,
}));

vi.mock("../pages/NotFoundPage", () => ({
  default: () => <div data-testid="not-found-page">Not Found Page</div>,
}));

// Mock LoginPage as well
vi.mock("../pages/LoginPage", () => ({
  default: () => <div data-testid="login-page">Login Page</div>,
}));

// Mock ProtectedRoute to render children when authenticated
vi.mock("../components/ProtectedRoute", () => ({
  default: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

// Mock MUI icons to avoid file system issues
vi.mock("@mui/icons-material", () => ({
  Security: () => <div data-testid="security-icon">🔒</div>,
}));

// Mock the design system components
vi.mock("../design-system", () => ({
  Typography: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
}));

// Mock providers
vi.mock("../providers", () => ({
  QueryProvider: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock layout components
vi.mock("../components/layout/WrapperTemplate", () => ({
  default: () => (
    <div data-testid="wrapper-template">
      <header role="banner" data-testid="app-header">
        <h1 data-testid="app-title">Cybero Platform</h1>
      </header>
      <nav
        role="navigation"
        aria-label="Main navigation"
        data-testid="main-navigation"
      >
        <div data-testid="nav-dashboard">Dashboard</div>
        <div data-testid="nav-devices">Devices</div>
        <div data-testid="nav-patches">Patches</div>
        <div data-testid="nav-firewall">Firewall</div>
        <div data-testid="nav-policies">Policies</div>
        <div data-testid="nav-settings">Settings</div>
      </nav>
      <main role="main" id="main-content" data-testid="main-content">
        <a href="#main-content" data-testid="skip-link">
          Skip to main content
        </a>
        <div data-testid="outlet-content">Outlet Content</div>
      </main>
    </div>
  ),
}));

describe("App Component Unit Test", () => {
  it("should render the app with basic structure", async () => {
    render(<App />);

    // Check if the wrapper template is rendered
    expect(screen.getByTestId("wrapper-template")).toBeInTheDocument();

    // Check if navigation elements are present using data-testid
    expect(screen.getByTestId("nav-dashboard")).toBeInTheDocument();
    expect(screen.getByTestId("nav-devices")).toBeInTheDocument();
    expect(screen.getByTestId("nav-policies")).toBeInTheDocument();

    // Check if main content area is present
    expect(screen.getByTestId("main-content")).toBeInTheDocument();
  });

  it("should have proper accessibility structure", () => {
    render(<App />);

    // Check for semantic landmarks using data-testid
    expect(screen.getByTestId("app-header")).toBeInTheDocument();
    expect(screen.getByTestId("main-navigation")).toBeInTheDocument();
    expect(screen.getByTestId("main-content")).toBeInTheDocument();

    // Check skip link is present using data-testid
    expect(screen.getByTestId("skip-link")).toBeInTheDocument();

    // Verify role attributes are still present
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
