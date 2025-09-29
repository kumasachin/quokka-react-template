import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock the schema before importing the component
vi.mock("../../forms/schemas/policy", () => ({
  policyFormSchema: {
    parse: vi.fn(),
  },
  PolicyFormData: {},
}));

import { policyFormSchema } from "../../forms/schemas/policy";

// Mock all MUI components to avoid file table overflow
vi.mock("@mui/material", () => ({
  Box: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Typography: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Alert: ({ children, ...props }: any) => (
    <div role="alert" {...props}>
      {children}
    </div>
  ),
  CircularProgress: () => <div>CircularProgress</div>,
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

// Mock design system components
vi.mock("../../design-system/components", () => ({
  TextField: ({ value, onChange, error, helperText, label, ...props }: any) => (
    <div>
      <label>{label}</label>
      <input
        value={value}
        onChange={onChange}
        data-testid={`text-field-${label?.toLowerCase().replace(/\s+/g, "-")}`}
        {...props}
      />
      {error && <div className="error">{helperText}</div>}
    </div>
  ),
  Select: ({ fieldLabel, value, onChange, options, ...props }: any) => (
    <div>
      <label>{fieldLabel}</label>
      <select
        value={value}
        onChange={onChange}
        data-testid={`select-${fieldLabel?.toLowerCase().replace(/\s+/g, "-")}`}
        {...props}
      >
        {options?.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  ),
  Switch: ({ switchLabel, checked, onChange, ...props }: any) => (
    <div>
      <label>{switchLabel}</label>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        data-testid={`switch-${switchLabel
          ?.toLowerCase()
          .replace(/\s+/g, "-")}`}
        {...props}
      />
    </div>
  ),
}));

// Mock hooks
const mockUseUpdatePolicy = vi.fn();
const mockUseToast = vi.fn();

vi.mock("../../hooks/usePolicies", () => ({
  useUpdatePolicy: () => mockUseUpdatePolicy(),
}));

vi.mock("../../hooks/useToast", () => ({
  useToast: () => mockUseToast(),
}));

// Mock schema
vi.mock("../../../forms/schemas/policy", () => ({
  policyFormSchema: {
    parse: vi.fn(),
  },
  PolicyFormData: {},
}));

import PolicySchemaDemo from "../PolicySchemaDemo";

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

describe("PolicySchemaDemo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders form with all fields", () => {
    const mockToast = { error: vi.fn(), success: vi.fn() };
    mockUseToast.mockReturnValue(mockToast);
    mockUseUpdatePolicy.mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
    });

    renderWithProviders(<PolicySchemaDemo />);

    expect(screen.getByTestId("policy-schema-demo-title")).toBeInTheDocument();
    expect(
      screen.getByTestId("policy-schema-demo-description")
    ).toBeInTheDocument();
    expect(screen.getByTestId("policy-name-field")).toBeInTheDocument();
    expect(screen.getByTestId("policy-type-select")).toBeInTheDocument();
    expect(screen.getByTestId("policy-description-field")).toBeInTheDocument();
    expect(screen.getByTestId("policy-priority-select")).toBeInTheDocument();
    expect(screen.getByTestId("policy-enabled-switch")).toBeInTheDocument();
    expect(screen.getByTestId("policy-update-button")).toBeInTheDocument();
    expect(screen.getByTestId("policy-validate-button")).toBeInTheDocument();
  });

  it("updates form data when inputs change", () => {
    const mockToast = { error: vi.fn(), success: vi.fn() };
    mockUseToast.mockReturnValue(mockToast);
    mockUseUpdatePolicy.mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
    });

    renderWithProviders(<PolicySchemaDemo />);

    const nameInput = screen.getByTestId("policy-name-field");
    fireEvent.change(nameInput, { target: { value: "Test Policy" } });

    const typeSelect = screen.getByTestId("policy-type-select");
    fireEvent.change(typeSelect, { target: { value: "firewall" } });

    const descriptionInput = screen.getByTestId("policy-description-field");
    fireEvent.change(descriptionInput, {
      target: { value: "Test description" },
    });

    const prioritySelect = screen.getByTestId("policy-priority-select");
    fireEvent.change(prioritySelect, { target: { value: "high" } });

    const enabledSwitch = screen.getByTestId("policy-enabled-switch");
    fireEvent.click(enabledSwitch);
  });

  it("shows validation errors when schema validation fails", () => {
    const mockToast = { error: vi.fn(), success: vi.fn() };
    mockUseToast.mockReturnValue(mockToast);
    mockUseUpdatePolicy.mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
    });

    // Mock schema validation to fail
    const mockParse = vi.fn().mockImplementation(() => {
      throw {
        errors: [
          { path: ["name"], message: "Name is required" },
          { path: ["description"], message: "Description is required" },
        ],
      };
    });

    // Access the mocked schema
    policyFormSchema.parse = mockParse;
    renderWithProviders(<PolicySchemaDemo />);

    const validateButton = screen.getByTestId("policy-validate-button");
    fireEvent.click(validateButton);

    expect(screen.getByTestId("policy-validation-error")).toBeInTheDocument();
  });

  it("shows success message when validation passes", () => {
    const mockToast = { error: vi.fn(), success: vi.fn() };
    mockUseToast.mockReturnValue(mockToast);
    mockUseUpdatePolicy.mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
    });

    // Mock schema validation to pass
    policyFormSchema.parse = vi.fn();

    renderWithProviders(<PolicySchemaDemo />);

    const validateButton = screen.getByTestId("policy-validate-button");
    fireEvent.click(validateButton);

    expect(screen.getByTestId("policy-validation-success")).toBeInTheDocument();
  });

  it("submits form successfully when validation passes", async () => {
    const mockToast = { error: vi.fn(), success: vi.fn() };
    const mockMutateAsync = vi.fn().mockResolvedValue({});
    mockUseToast.mockReturnValue(mockToast);
    mockUseUpdatePolicy.mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    });

    // Mock schema validation to pass
    policyFormSchema.parse = vi.fn();

    renderWithProviders(<PolicySchemaDemo />);

    // Fill in required form fields
    const nameField = screen.getByTestId("policy-name-field");
    const descriptionField = screen.getByTestId("policy-description-field");

    fireEvent.change(nameField, { target: { value: "Test Policy" } });
    fireEvent.change(descriptionField, {
      target: {
        value:
          "This is a test policy description that meets the minimum length requirement.",
      },
    });

    const form = screen.getByTestId("policy-schema-demo-form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalled();
      expect(mockToast.success).toHaveBeenCalledWith(
        "Policy updated successfully!"
      );
    });
  });

  it("shows error when form submission fails", async () => {
    const mockToast = { error: vi.fn(), success: vi.fn() };
    const mockMutateAsync = vi.fn().mockRejectedValue(new Error("API Error"));
    mockUseToast.mockReturnValue(mockToast);
    mockUseUpdatePolicy.mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    });

    // Mock schema validation to pass
    policyFormSchema.parse = vi.fn();

    renderWithProviders(<PolicySchemaDemo />);

    // Fill in required form fields
    const nameField = screen.getByTestId("policy-name-field");
    const descriptionField = screen.getByTestId("policy-description-field");

    fireEvent.change(nameField, { target: { value: "Test Policy" } });
    fireEvent.change(descriptionField, {
      target: {
        value:
          "This is a test policy description that meets the minimum length requirement.",
      },
    });

    const form = screen.getByTestId("policy-schema-demo-form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith(
        "Failed to update policy. Changes have been reverted."
      );
    });
  });

  it("shows loading state during submission", () => {
    const mockToast = { error: vi.fn(), success: vi.fn() };
    mockUseToast.mockReturnValue(mockToast);
    mockUseUpdatePolicy.mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: true,
    });

    renderWithProviders(<PolicySchemaDemo />);

    expect(screen.getByTestId("policy-update-button")).toHaveTextContent(
      "Updating..."
    );
    expect(screen.getByTestId("policy-updating-alert")).toBeInTheDocument();
  });

  it("prevents submission when validation fails", () => {
    const mockToast = { error: vi.fn(), success: vi.fn() };
    const mockMutateAsync = vi.fn();
    mockUseToast.mockReturnValue(mockToast);
    mockUseUpdatePolicy.mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    });

    // Mock schema validation to fail
    const mockParse = vi.fn().mockImplementation(() => {
      throw {
        errors: [{ path: ["name"], message: "Name is required" }],
      };
    });
    policyFormSchema.parse = mockParse;

    renderWithProviders(<PolicySchemaDemo />);

    const form = screen.getByTestId("policy-schema-demo-form");
    fireEvent.submit(form);

    expect(mockMutateAsync).not.toHaveBeenCalled();
    expect(mockToast.error).toHaveBeenCalledWith(
      "Please fix validation errors before submitting"
    );
  });
});
