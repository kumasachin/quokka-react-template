import { useState } from "react";
import { Header } from "../design-system/components";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Policy, Error } from "@mui/icons-material";
import { usePolicies, useUpdatePolicy } from "../queries/policies";
import { useToast } from "../hooks";
import OptimisticUpdateDemo from "../components/OptimisticUpdateDemo";
import PolicySchemaDemo from "../components/PolicySchemaDemo";

const statusColors = {
  active: "success" as const,
  inactive: "error" as const,
  draft: "warning" as const,
};

const priorityColors = {
  low: "default" as const,
  medium: "info" as const,
  high: "warning" as const,
  critical: "error" as const,
};

const PoliciesPage = () => {
  const [selectedType, setSelectedType] = useState<string>("");
  const {
    data: policiesData,
    isLoading,
    error,
  } = usePolicies(selectedType || undefined);
  const updatePolicyMutation = useUpdatePolicy();
  const toast = useToast();

  const handleStatusToggle = async (
    policyId: string,
    currentStatus: string
  ) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    try {
      await updatePolicyMutation.mutateAsync({
        id: policyId,
        updates: { status: newStatus },
      });
      toast.success(
        `Policy ${
          newStatus === "active" ? "activated" : "deactivated"
        } successfully`
      );
    } catch (error) {
      toast.error("Failed to update policy status");
    }
  };

  const policyTypes = [
    "security",
    "firewall",
    "access",
    "backup",
    "compliance",
  ];

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Header
          title="Policies Management"
          subtitle="Configure and monitor security policies"
          prefix={<Error sx={{ color: "error.main" }} />}
        />
        <Alert severity="error" sx={{ mt: 2 }}>
          Failed to load policies. Please try again later.
        </Alert>
      </Box>
    );
  }

  const policies = policiesData?.data || [];

  return (
    <Box>
      <Header
        title="Policies Management"
        subtitle="Configure and monitor security policies"
        prefix={<Policy sx={{ color: "info.main" }} />}
      />

      <Box sx={{ mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Type</InputLabel>
          <Select
            value={selectedType}
            label="Filter by Type"
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <MenuItem value="">All Types</MenuItem>
            {policyTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <OptimisticUpdateDemo />

      <PolicySchemaDemo />

      <Typography variant="body1" sx={{ mb: 2 }}>
        Showing {policies.length} {selectedType ? `${selectedType} ` : ""}
        policies
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {policies.map((policy) => (
          <Card
            key={policy.id}
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Typography variant="h6" component="h3">
                  {policy.name}
                </Typography>
                <Chip label={policy.type} size="small" variant="outlined" />
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {policy.description}
              </Typography>

              <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                <Chip
                  label={policy.status}
                  color={statusColors[policy.status]}
                  size="small"
                />
                <Chip
                  label={policy.priority}
                  color={priorityColors[policy.priority]}
                  size="small"
                />
              </Box>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mb: 1 }}
              >
                Rules: {policy.rules.length}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mb: 2 }}
              >
                Updated: {new Date(policy.updatedAt).toLocaleDateString()}
              </Typography>

              <Button
                variant="outlined"
                size="small"
                onClick={() => handleStatusToggle(policy.id, policy.status)}
                disabled={updatePolicyMutation.isPending}
                color={policy.status === "active" ? "error" : "success"}
                fullWidth
              >
                {policy.status === "active" ? "Deactivate" : "Activate"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {policies.length === 0 && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No policies found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedType
              ? `No ${selectedType} policies available`
              : "No policies have been created yet"}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PoliciesPage;
