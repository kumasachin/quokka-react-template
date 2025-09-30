import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
  Button: ({
    children,
    ...props
  }: {
    children?: ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }) => <button {...props}>{children}</button>,
  Typography: ({
    children,
    ...props
  }: {
    children?: ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }) => <div {...props}>{children}</div>,
  Paper: ({
    children,
    ...props
  }: {
    children?: ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }) => <div {...props}>{children}</div>,
}));

// Mock the queries
const mockUsePolicies = vi.fn();
const mockUseUpdatePolicy = vi.fn();

vi.mock("../../queries/policies", () => ({
  usePolicies: () => mockUsePolicies(),
  useUpdatePolicy: () => mockUseUpdatePolicy(),
}));

import OptimisticUpdateDemo from "../OptimisticUpdateDemo";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  );
};

describe("OptimisticUpdateDemo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state when no policies data", () => {
    mockUsePolicies.mockReturnValue({
      data: null,
      isLoading: true,
    });
    mockUseUpdatePolicy.mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
      isError: false,
    });

    renderWithProviders(<OptimisticUpdateDemo />);

    expect(screen.getByText("Optimistic Update Demo")).toBeInTheDocument();
    expect(screen.queryByText("First Policy:")).not.toBeInTheDocument();
  });

  it("renders policy information when data is available", () => {
    const mockPolicy = {
      id: "policy-1",
      name: "Test Policy",
      status: "active",
      updatedAt: "2025-09-29T10:00:00Z",
    };

    mockUsePolicies.mockReturnValue({
      data: { data: [mockPolicy] },
    });
    mockUseUpdatePolicy.mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
      isError: false,
    });

    renderWithProviders(<OptimisticUpdateDemo />);

    expect(screen.getByText("Optimistic Update Demo")).toBeInTheDocument();
    expect(screen.getByText("First Policy: Test Policy")).toBeInTheDocument();
    expect(screen.getByText("Current Status:")).toBeInTheDocument();
    expect(screen.getByText("active")).toBeInTheDocument();
    expect(screen.getByText(/Last Updated:/)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Toggle Status" })
    ).toBeInTheDocument();
  });

  it("shows updating state when mutation is pending", () => {
    const mockPolicy = {
      id: "policy-1",
      name: "Test Policy",
      status: "active",
      updatedAt: "2025-09-29T10:00:00Z",
    };

    mockUsePolicies.mockReturnValue({
      data: { data: [mockPolicy] },
    });

    mockUseUpdatePolicy.mockReturnValue({
      mutate: vi.fn(),
      isPending: true,
      isError: false,
    });

    renderWithProviders(<OptimisticUpdateDemo />);

    const button = screen.getByRole("button", { name: "Updating..." });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("calls update mutation when toggle button is clicked", () => {
    const mockPolicy = {
      id: "policy-1",
      name: "Test Policy",
      status: "active",
      updatedAt: "2025-09-29T10:00:00Z",
    };

    const mockMutate = vi.fn();

    mockUsePolicies.mockReturnValue({
      data: { data: [mockPolicy] },
    });

    mockUseUpdatePolicy.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      isError: false,
    });

    renderWithProviders(<OptimisticUpdateDemo />);

    const button = screen.getByRole("button", { name: "Toggle Status" });
    fireEvent.click(button);

    expect(mockMutate).toHaveBeenCalledWith({
      id: "policy-1",
      updates: { status: "inactive" },
    });
  });

  it("toggles from inactive to active", () => {
    const mockPolicy = {
      id: "policy-1",
      name: "Test Policy",
      status: "inactive",
      updatedAt: "2025-09-29T10:00:00Z",
    };

    const mockMutate = vi.fn();

    mockUsePolicies.mockReturnValue({
      data: { data: [mockPolicy] },
    });

    mockUseUpdatePolicy.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      isError: false,
    });

    renderWithProviders(<OptimisticUpdateDemo />);

    const button = screen.getByRole("button", { name: "Toggle Status" });
    fireEvent.click(button);

    expect(mockMutate).toHaveBeenCalledWith({
      id: "policy-1",
      updates: { status: "active" },
    });
  });

  it("shows error message when mutation fails", () => {
    const mockPolicy = {
      id: "policy-1",
      name: "Test Policy",
      status: "active",
      updatedAt: "2025-09-29T10:00:00Z",
    };

    mockUsePolicies.mockReturnValue({
      data: { data: [mockPolicy] },
    });

    mockUseUpdatePolicy.mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
      isError: true,
    });

    renderWithProviders(<OptimisticUpdateDemo />);

    expect(
      screen.getByText("Update failed - changes rolled back")
    ).toBeInTheDocument();
  });

  it("does not render when no policies available", () => {
    mockUsePolicies.mockReturnValue({
      data: { data: [] },
    });
    mockUseUpdatePolicy.mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
      isError: false,
    });

    renderWithProviders(<OptimisticUpdateDemo />);

    expect(screen.getByText("Optimistic Update Demo")).toBeInTheDocument();
    expect(screen.queryByText("First Policy:")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
