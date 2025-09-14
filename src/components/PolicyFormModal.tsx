import React, { useState, useEffect } from "react";
import {
  Box,
  Alert,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { TextField, Select } from "../design-system/components";
import { policyFormSchema, PolicyFormData } from "../forms/schemas/policy";
import { useCreatePolicy, useUpdatePolicy } from "../hooks/usePolicies";
import { useToast } from "../hooks/useToast";
import { Policy } from "../api/policies";

interface PolicyFormModalProps {
  open: boolean;
  onClose: () => void;
  policy?: Policy | null;
}

const PolicyFormModal = ({ open, onClose, policy }: PolicyFormModalProps) => {
  const isEdit = !!policy;

  const [formData, setFormData] = useState<Partial<PolicyFormData>>({
    name: "",
    type: "security",
    description: "",
    status: "draft",
    priority: "medium",
    enabled: true,
    rules: [
      {
        id: "rule-1",
        condition: 'user.role === "admin"',
        action: "allow",
        enabled: true,
      },
    ],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const createPolicyMutation = useCreatePolicy();
  const updatePolicyMutation = useUpdatePolicy();
  const toast = useToast();

  useEffect(() => {
    if (policy) {
      setFormData({
        name: policy.name,
        type: policy.type,
        description: policy.description,
        status: policy.status,
        priority: policy.priority,
        enabled: policy.status === "active",
        rules: policy.rules.map((rule) => ({
          ...rule,
          action: rule.action as any,
        })),
      });
    } else {
      setFormData({
        name: "",
        type: "security",
        description: "",
        status: "draft",
        priority: "medium",
        enabled: false,
        rules: [
          {
            id: "rule-1",
            condition: 'user.role === "admin"',
            action: "allow",
            enabled: true,
          },
        ],
      });
    }
    setErrors({});
  }, [policy, open]);

  const validateForm = () => {
    try {
      policyFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const fieldErrors: Record<string, string> = {};
      error.errors?.forEach((err: any) => {
        fieldErrors[err.path.join(".")] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix validation errors before submitting");
      return;
    }

    try {
      if (isEdit && policy) {
        toast.success("Updating policy...", 1000);

        await updatePolicyMutation.mutateAsync({
          id: policy.id,
          updates: formData as Partial<PolicyFormData>,
        });
        toast.success("Policy updated successfully!");
      } else {
        toast.success("Creating policy...", 1000);

        await createPolicyMutation.mutateAsync(
          formData as Omit<Policy, "id" | "createdAt" | "updatedAt">
        );
        toast.success("Policy created successfully!");
      }
      onClose();
    } catch (error) {
      toast.error(
        isEdit
          ? "Failed to update policy. Changes have been reverted."
          : "Failed to create policy"
      );
    }
  };

  const isLoading =
    createPolicyMutation.isPending || updatePolicyMutation.isPending;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      data-testid="policy-form-modal"
    >
      <DialogTitle data-testid="policy-form-title">
        {isEdit ? `Edit Policy: ${policy?.name}` : "Create New Policy"}
      </DialogTitle>

      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ pt: 1 }}
          data-testid="policy-form"
        >
          <TextField
            fullWidth
            label="Policy Name"
            value={formData.name || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            error={!!errors.name}
            helperText={errors.name}
            sx={{ mb: 2 }}
            placeholder="Enter policy name"
            data-testid="policy-name-input"
          />

          <Select
            fieldLabel="Type"
            value={formData.type || "security"}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, type: e.target.value as any }))
            }
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
          />

          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            value={formData.description || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            error={!!errors.description}
            helperText={errors.description}
            sx={{ mb: 2 }}
            placeholder="Describe what this policy does..."
            data-testid="policy-description-input"
          />

          <Select
            fieldLabel="Status"
            value={formData.status || "draft"}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                status: e.target.value as any,
              }))
            }
            options={[
              { value: "draft", label: "Draft" },
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
            error={!!errors.status}
            helperText={errors.status}
            sx={{ mb: 2 }}
            data-testid="policy-status-select"
          />

          <Select
            fieldLabel="Priority"
            value={formData.priority || "medium"}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                priority: e.target.value as any,
              }))
            }
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
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }} data-testid="policy-form-actions">
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={isLoading}
          data-testid="cancel-button"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isLoading}
          data-testid="submit-button"
        >
          {isLoading ? <CircularProgress size={20} sx={{ mr: 1 }} /> : null}
          {isEdit ? "Update Policy" : "Create Policy"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PolicyFormModal;
