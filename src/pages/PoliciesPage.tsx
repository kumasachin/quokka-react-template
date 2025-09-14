import { useState } from "react";
import { Header, Select, Button } from "../design-system/components";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";
import {
  Policy,
  Error,
  Add,
  MoreVert,
  Edit,
  Delete,
} from "@mui/icons-material";
import { usePolicies, useUpdatePolicy } from "../hooks/usePolicies";
import { useDeletePolicy } from "../hooks/usePolicies";
import { useToast } from "../hooks";
import PolicyFormModal from "../components/PolicyFormModal";
import { Policy as PolicyType } from "../api/policies";

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
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<PolicyType | null>(null);

  const {
    data: policiesData,
    isLoading,
    error,
  } = usePolicies(selectedType || undefined);
  const updatePolicyMutation = useUpdatePolicy();
  const deletePolicy = useDeletePolicy();
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

  const handleCreatePolicy = () => {
    setEditingPolicy(null);
    setFormModalOpen(true);
  };

  const handleEditPolicy = (policy: PolicyType) => {
    setEditingPolicy(policy);
    setFormModalOpen(true);
  };

  const handleDeletePolicy = async (policyId: string) => {
    if (confirm("Are you sure you want to delete this policy?")) {
      try {
        await deletePolicy.mutateAsync(policyId);
        toast.success("Policy deleted successfully");
      } catch (error) {
        toast.error("Failed to delete policy");
      }
    }
  };

  const handleCloseModal = () => {
    setFormModalOpen(false);
    setEditingPolicy(null);
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Select
          fieldLabel="Filter by Type"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as string)}
          options={[
            { value: "", label: "All Types" },
            ...policyTypes.map((type) => ({
              value: type,
              label: type.charAt(0).toUpperCase() + type.slice(1),
            })),
          ]}
          sx={{ minWidth: 110 }}
        />

        <Button variant="primary" onClick={handleCreatePolicy}>
          Create Policy
        </Button>
      </Box>

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

              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleStatusToggle(policy.id, policy.status)}
                  disabled={updatePolicyMutation.isPending}
                >
                  {policy.status === "active" ? "Deactivate" : "Activate"}
                </Button>

                <IconButton
                  size="small"
                  onClick={() => handleEditPolicy(policy)}
                  sx={{ ml: 1 }}
                >
                  <Edit fontSize="small" />
                </IconButton>

                <IconButton
                  size="small"
                  onClick={() => handleDeletePolicy(policy.id)}
                  color="error"
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
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

      {/* Policy Form Modal */}
      <PolicyFormModal
        open={formModalOpen}
        onClose={handleCloseModal}
        policy={editingPolicy}
      />
    </Box>
  );
};

export default PoliciesPage;
