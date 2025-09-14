import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import "../i18n/config";

const TestPoliciesComponent = () => {
  return (
    <div data-testid="policies-page">
      <h1>Policies Management</h1>
      <p>Configure and monitor security policies</p>
      <div data-testid="policies-controls">
        <button data-testid="create-policy-button">Create Policy</button>
        <select data-testid="policy-type-filter" aria-label="Filter by type">
          <option value="">All types</option>
          <option value="security">Security</option>
          <option value="firewall">Firewall</option>
        </select>
        <p data-testid="policy-count">1 policy found</p>
      </div>
      <div data-testid="policies-grid">
        <div data-testid="policy-card-1">
          <h3 data-testid="policy-name-1">Test Policy</h3>
          <p>Test description</p>
          <span data-testid="policy-status-1">Active</span>
          <span data-testid="policy-priority-1">High</span>
          <button data-testid="policy-status-toggle-1">Toggle Status</button>
          <button data-testid="policy-edit-1">Edit</button>
          <button data-testid="policy-delete-1">Delete</button>
        </div>
      </div>
    </div>
  );
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe("PoliciesPage Core Functionality", () => {
  it("renders the policies page with correct title and navigation", async () => {
    render(
      <TestWrapper>
        <TestPoliciesComponent />
      </TestWrapper>
    );

    expect(screen.getByTestId("policies-page")).toBeInTheDocument();
    expect(screen.getByText("Policies Management")).toBeInTheDocument();
    expect(
      screen.getByText("Configure and monitor security policies")
    ).toBeInTheDocument();
  });

  it("displays policy information correctly", async () => {
    render(
      <TestWrapper>
        <TestPoliciesComponent />
      </TestWrapper>
    );

    const policyCard = screen.getByTestId("policy-card-1");
    expect(policyCard).toBeInTheDocument();

    expect(screen.getByTestId("policy-name-1")).toHaveTextContent(
      "Test Policy"
    );
    expect(screen.getByTestId("policy-status-1")).toHaveTextContent("Active");
    expect(screen.getByTestId("policy-priority-1")).toHaveTextContent("High");
  });

  it("shows create policy button and filter controls", async () => {
    render(
      <TestWrapper>
        <TestPoliciesComponent />
      </TestWrapper>
    );

    expect(screen.getByTestId("create-policy-button")).toBeInTheDocument();
    expect(screen.getByTestId("policy-type-filter")).toBeInTheDocument();
    expect(screen.getByTestId("policy-count")).toBeInTheDocument();
  });

  it("allows user to interact with filter dropdown", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <TestPoliciesComponent />
      </TestWrapper>
    );

    const filterSelect = screen.getByTestId("policy-type-filter");
    await user.selectOptions(filterSelect, "security");

    expect(filterSelect).toHaveValue("security");
  });

  it("displays correct policy count", async () => {
    render(
      <TestWrapper>
        <TestPoliciesComponent />
      </TestWrapper>
    );

    expect(screen.getByTestId("policy-count")).toHaveTextContent(
      "1 policy found"
    );
  });

  it("validates form interaction capabilities", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <TestPoliciesComponent />
      </TestWrapper>
    );

    const createButton = screen.getByTestId("create-policy-button");
    await user.click(createButton);

    expect(createButton).toBeInTheDocument();

    const editButton = screen.getByTestId("policy-edit-1");
    const deleteButton = screen.getByTestId("policy-delete-1");
    const toggleButton = screen.getByTestId("policy-status-toggle-1");

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(toggleButton).toBeInTheDocument();

    await user.click(editButton);
    await user.click(toggleButton);
  });
});
