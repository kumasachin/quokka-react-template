import React, { useState } from "react";
import { Box, Alert } from "@mui/material";
import { TextField, Select, Button } from "../../design-system/components";
import { policyFormSchema } from "../../forms/schemas/policy";
import type { PolicyFormData, PolicyFormProps } from "../../types";

export { type PolicyFormData };

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
  const [blurredFields, setBlurredFields] = useState<Set<string>>(new Set());
  const [blurErrors, setBlurErrors] = useState<Record<string, string>>({});

  const isFormValid = formData.name && formData.type && formData.description;

  const validateField = (fieldName: string, value: string) => {
    try {
      // Create a partial schema for the specific field
      const fieldSchema = policyFormSchema.pick({
        [fieldName]: true,
      } as Record<string, true>);
      fieldSchema.parse({ [fieldName]: value });
      return "";
    } catch (error) {
      if (error && typeof error === "object" && "errors" in error) {
        const fieldError = (
          error.errors as Array<{ path: string[]; message: string }>
        )?.find((err) => err.path[0] === fieldName);

        if (fieldError?.message) {
          return fieldError.message;
        }
      }

      // Provide sensible fallback messages based on field type
      const trimmedValue = value.trim();
      switch (fieldName) {
        case "name":
          if (trimmedValue.length === 0) {
            return "Policy name is required";
          } else if (trimmedValue.length < 3) {
            return "Policy name must be at least 3 characters long";
          } else if (trimmedValue.length > 100) {
            return "Policy name cannot exceed 100 characters";
          } else {
            return "Policy name can only contain letters, numbers, spaces, hyphens, and underscores";
          }

        case "description":
          if (trimmedValue.length === 0) {
            return "Description is required";
          } else if (trimmedValue.length < 10) {
            return "Description must be at least 10 characters long";
          } else if (trimmedValue.length > 500) {
            return "Description cannot exceed 500 characters";
          } else {
            return "Please provide a valid description";
          }

        case "type":
          return "Please select a valid policy type";

        case "status":
          return "Please select a valid status";

        case "priority":
          return "Please select a valid priority level";

        default:
          return "This field is required";
      }
    }
  };

  const handleBlur = (fieldName: string) => {
    const value = (formData[fieldName as keyof PolicyFormData] as string) || "";
    const error = validateField(fieldName, value);

    setBlurredFields((prev) => new Set(prev).add(fieldName));
    setBlurErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  const getFieldError = (fieldName: string) => {
    return blurredFields.has(fieldName) ? blurErrors[fieldName] : "";
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ pt: 1 }}
      data-testid="policy-form"
      noValidate
    >
      {errors.name && (
        <Alert severity="error" sx={{ mb: 1 }}>
          {errors.name}
        </Alert>
      )}
      {getFieldError("name") && (
        <Alert severity="error" sx={{ mb: 1 }}>
          {getFieldError("name")}
        </Alert>
      )}
      <TextField
        fullWidth
        label="Policy Name"
        value={formData.name || ""}
        onChange={(e) => onChange("name", e.target.value)}
        onBlur={() => handleBlur("name")}
        error={!!errors.name || !!getFieldError("name")}
        sx={{ mb: 2 }}
        placeholder="Enter policy name"
        data-testid="policy-name-input"
        required
      />

      {errors.type && (
        <Alert severity="error" sx={{ mb: 1 }}>
          {errors.type}
        </Alert>
      )}
      {getFieldError("type") && (
        <Alert severity="error" sx={{ mb: 1 }}>
          {getFieldError("type")}
        </Alert>
      )}
      <Select
        fieldLabel="Type"
        value={formData.type || "security"}
        onChange={(e) => onChange("type", e.target.value as string)}
        onBlur={() => handleBlur("type")}
        options={[
          { value: "security", label: "Security" },
          { value: "firewall", label: "Firewall" },
          { value: "access", label: "Access" },
          { value: "backup", label: "Backup" },
          { value: "compliance", label: "Compliance" },
        ]}
        error={!!errors.type || !!getFieldError("type")}
        sx={{ mb: 2 }}
        data-testid="policy-type-select"
        required
      />

      {errors.description && (
        <Alert severity="error" sx={{ mb: 1 }}>
          {errors.description}
        </Alert>
      )}
      {getFieldError("description") && (
        <Alert severity="error" sx={{ mb: 1 }}>
          {getFieldError("description")}
        </Alert>
      )}
      <TextField
        fullWidth
        label="Description"
        multiline
        rows={3}
        value={formData.description || ""}
        onChange={(e) => onChange("description", e.target.value)}
        onBlur={() => handleBlur("description")}
        error={!!errors.description || !!getFieldError("description")}
        sx={{ mb: 2 }}
        placeholder="Describe what this policy does..."
        data-testid="policy-description-input"
      />

      {errors.status && (
        <Alert severity="error" sx={{ mb: 1 }}>
          {errors.status}
        </Alert>
      )}
      {getFieldError("status") && (
        <Alert severity="error" sx={{ mb: 1 }}>
          {getFieldError("status")}
        </Alert>
      )}
      <Select
        fieldLabel="Status"
        value={formData.status || "draft"}
        onChange={(e) => onChange("status", e.target.value as string)}
        onBlur={() => handleBlur("status")}
        options={[
          { value: "draft", label: "Draft" },
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
        ]}
        error={!!errors.status || !!getFieldError("status")}
        sx={{ mb: 2 }}
        data-testid="policy-status-select"
        required
      />

      {errors.priority && (
        <Alert severity="error" sx={{ mb: 1 }}>
          {errors.priority}
        </Alert>
      )}
      {getFieldError("priority") && (
        <Alert severity="error" sx={{ mb: 1 }}>
          {getFieldError("priority")}
        </Alert>
      )}
      <Select
        fieldLabel="Priority"
        value={formData.priority || "medium"}
        onChange={(e) => onChange("priority", e.target.value as string)}
        onBlur={() => handleBlur("priority")}
        options={[
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" },
          { value: "critical", label: "Critical" },
        ]}
        error={!!errors.priority || !!getFieldError("priority")}
        sx={{ mb: 2 }}
        data-testid="policy-priority-select"
      />

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
