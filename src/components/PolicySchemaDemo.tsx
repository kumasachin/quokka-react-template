import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { policyFormSchema, PolicyFormData } from "../forms/schemas/policy";
import { useUpdatePolicy } from "../hooks/usePolicies";
import { useToast } from "../hooks/useToast";

const PolicySchemaDemo = () => {
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
  const [isValid, setIsValid] = useState(false);
  const [policyId] = useState("demo-policy-123");

  const updatePolicyMutation = useUpdatePolicy();
  const toast = useToast();

  const validateForm = () => {
    try {
      policyFormSchema.parse(formData);
      setErrors({});
      setIsValid(true);
      return true;
    } catch (error: any) {
      const fieldErrors: Record<string, string> = {};
      error.errors?.forEach((err: any) => {
        fieldErrors[err.path.join(".")] = err.message;
      });
      setErrors(fieldErrors);
      setIsValid(false);
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
      await updatePolicyMutation.mutateAsync({
        id: policyId,
        updates: formData as Partial<PolicyFormData>,
      });
      toast.success("Policy updated successfully!");
    } catch (error) {
      toast.error("Failed to update policy. Changes have been reverted.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, maxWidth: 600 }}>
      <Typography variant="h6" gutterBottom>
        Policy Update Form with Optimistic Updates
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        This form demonstrates optimistic updates with automatic rollback on
        error. Changes appear immediately and are reverted if the update fails.
      </Typography>

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
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Type</InputLabel>
        <Select
          value={formData.type || "security"}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, type: e.target.value as any }))
          }
        >
          <MenuItem value="security">Security</MenuItem>
          <MenuItem value="firewall">Firewall</MenuItem>
          <MenuItem value="access">Access</MenuItem>
          <MenuItem value="backup">Backup</MenuItem>
          <MenuItem value="compliance">Compliance</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        multiline
        rows={3}
        label="Description"
        value={formData.description || ""}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, description: e.target.value }))
        }
        error={!!errors.description}
        helperText={errors.description}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Priority</InputLabel>
        <Select
          value={formData.priority || "medium"}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              priority: e.target.value as any,
            }))
          }
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="critical">Critical</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Switch
            checked={formData.enabled || false}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, enabled: e.target.checked }))
            }
          />
        }
        label="Enabled"
        sx={{ mb: 2 }}
      />

      {errors.rules && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Rules: {errors.rules}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        disabled={updatePolicyMutation.isPending}
        startIcon={
          updatePolicyMutation.isPending ? (
            <CircularProgress size={16} />
          ) : undefined
        }
        sx={{ mr: 2 }}
      >
        {updatePolicyMutation.isPending ? "Updating..." : "Update Policy"}
      </Button>

      <Button
        variant="outlined"
        onClick={validateForm}
        disabled={updatePolicyMutation.isPending}
        sx={{ mr: 2 }}
      >
        Validate Schema
      </Button>

      {updatePolicyMutation.isPending && (
        <Alert severity="info" sx={{ mt: 2 }}>
          Updating policy... Changes will be visible immediately and rolled back
          if there's an error.
        </Alert>
      )}

      {isValid && !updatePolicyMutation.isPending && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Schema validation passed! All fields are valid.
        </Alert>
      )}

      {Object.keys(errors).length > 0 && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Please fix the validation errors above.
        </Alert>
      )}
    </Box>
  );
};

export default PolicySchemaDemo;
