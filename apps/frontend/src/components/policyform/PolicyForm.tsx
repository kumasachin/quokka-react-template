import React from "react";
import { Box, Alert } from "@mui/material";
import { TextField, Select, Button } from "../../design-system/components";

export interface PolicyFormData {
  name: string;
  type: string;
  description: string;
  status: string;
  priority: string;
}

export interface PolicyFormProps {
  formData: Partial<PolicyFormData>;
  errors: Record<string, string>;
  onChange: (field: keyof PolicyFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
  isEdit?: boolean;
  submitButtonText?: string;
  showSubmitButton?: boolean;
}

export const PolicyForm: React.FC<PolicyFormProps> = ({
  formData,
  errors,
  onChange,
  onSubmit,
  isLoading = false,
  isEdit = false,
  submitButtonText,
  showSubmitButton = true,
}) => {
  const isFormValid = formData.name && formData.type && formData.description;

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ pt: 1 }}
      data-testid="policy-form"
      noValidate
    >
      <TextField
        fullWidth
        label="Policy Name"
        value={formData.name || ""}
        onChange={(e) => onChange("name", e.target.value)}
        error={!!errors.name}
        helperText={errors.name}
        sx={{ mb: 2 }}
        placeholder="Enter policy name"
        data-testid="policy-name-input"
        required
      />

      <Select
        fieldLabel="Type"
        value={formData.type || "security"}
        onChange={(e) => onChange("type", e.target.value as string)}
        options={[
          { value: "security", label: "Security" },
          { value: "firewall", label: "Firewall" },
          { value: "access", label: "Access" },
          { value: "backup", label: "Backup" },
          { value: "compliance", label: "Compliance" },
        ]}
        error={!!errors.type}
        helperText={errors.type}
        sx={{ mb: 2 }}
        data-testid="policy-type-select"
        required
      />

      <TextField
        fullWidth
        label="Description"
        multiline
        rows={3}
        value={formData.description || ""}
        onChange={(e) => onChange("description", e.target.value)}
        error={!!errors.description}
        helperText={errors.description}
        sx={{ mb: 2 }}
        placeholder="Describe what this policy does..."
        data-testid="policy-description-input"
      />

      <Select
        fieldLabel="Status"
        value={formData.status || "draft"}
        onChange={(e) => onChange("status", e.target.value as string)}
        options={[
          { value: "draft", label: "Draft" },
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
        ]}
        error={!!errors.status}
        helperText={errors.status}
        sx={{ mb: 2 }}
        data-testid="policy-status-select"
        required
      />

      <Select
        fieldLabel="Priority"
        value={formData.priority || "medium"}
        onChange={(e) => onChange("priority", e.target.value as string)}
        options={[
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" },
          { value: "critical", label: "Critical" },
        ]}
        error={!!errors.priority}
        helperText={errors.priority}
        sx={{ mb: 2 }}
        data-testid="policy-priority-select"
      />

      {Object.keys(errors).length > 0 && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          data-testid="form-validation-errors"
        >
          Please fix the validation errors above.
        </Alert>
      )}

      {showSubmitButton && (
        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="primary"
            disabled={!isFormValid || isLoading}
            data-testid="submit-button"
          >
            {submitButtonText || (isEdit ? "Update Policy" : "Create Policy")}
          </Button>
        </Box>
      )}
    </Box>
  );
};
