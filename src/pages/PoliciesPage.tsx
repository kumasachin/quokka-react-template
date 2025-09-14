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
import { Policy, Error, Edit, Delete } from "@mui/icons-material";
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
    <Box
      sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 3, maxWidth: 1400, mx: "auto" }}
    >
      <Header
        title="Policies Management"
        subtitle="Configure and monitor security policies"
        prefix={<Policy sx={{ color: "info.main" }} />}
      />

      {/* Controls Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
          p: 3,
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
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
            sx={{ minWidth: 200, flexShrink: 0 }}
          />

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            {policies.length} {selectedType ? `${selectedType} ` : ""}
            {policies.length === 1 ? "policy" : "policies"} found
          </Typography>
        </Box>

        <Button variant="primary" onClick={handleCreatePolicy}>
          + Create Policy
        </Button>
      </Box>

      {/* Policies Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(auto-fit, minmax(360px, 1fr))",
            lg: "repeat(auto-fit, minmax(380px, 1fr))",
          },
          gap: { xs: 2, sm: 3, md: 4 },
          mb: 4,
        }}
      >
        {policies.map((policy) => (
          <Card
            key={policy.id}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              },
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ flexGrow: 1, p: 3 }}>
              {/* Header Section */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 3,
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    lineHeight: 1.3,
                    color: "text.primary",
                    flex: 1,
                    mr: 2,
                  }}
                >
                  {policy.name}
                </Typography>
                <Chip
                  label={policy.type}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontWeight: 500,
                    textTransform: "capitalize",
                    borderRadius: 2,
                  }}
                />
              </Box>

              {/* Description */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 3,
                  lineHeight: 1.5,
                  minHeight: "3em",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {policy.description}
              </Typography>

              {/* Status and Priority Chips */}
              <Box sx={{ display: "flex", gap: 1.5, mb: 3, flexWrap: "wrap" }}>
                <Chip
                  label={policy.status}
                  color={statusColors[policy.status]}
                  size="small"
                  sx={{ fontWeight: 500, borderRadius: 2 }}
                />
                <Chip
                  label={policy.priority}
                  color={priorityColors[policy.priority]}
                  size="small"
                  sx={{ fontWeight: 500, borderRadius: 2 }}
                />
              </Box>

              {/* Metadata */}
              <Box sx={{ mb: 3, space: 1 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: "block",
                    mb: 0.5,
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  {policy.rules.length} Rules Configured
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: "block",
                    fontWeight: 400,
                  }}
                >
                  Last updated {new Date(policy.updatedAt).toLocaleDateString()}
                </Typography>
              </Box>

              {/* Action Buttons */}
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  pt: 2,
                  borderTop: "1px solid",
                  borderColor: "divider",
                  mt: "auto",
                }}
              >
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
                  sx={{
                    "&:hover": { backgroundColor: "action.hover" },
                    borderRadius: 1.5,
                  }}
                >
                  <Edit fontSize="small" />
                </IconButton>

                <IconButton
                  size="small"
                  onClick={() => handleDeletePolicy(policy.id)}
                  color="error"
                  sx={{
                    "&:hover": {
                      backgroundColor: "error.main",
                      color: "white",
                    },
                    borderRadius: 1.5,
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Empty State */}
      {policies.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            px: 4,
            backgroundColor: "background.paper",
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <Policy sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 1, fontWeight: 500 }}
          >
            No policies found
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, maxWidth: 400, mx: "auto" }}
          >
            {selectedType
              ? `No ${selectedType} policies are currently configured. Try selecting a different filter or create a new ${selectedType} policy.`
              : "Get started by creating your first security policy to manage access and compliance across your organization."}
          </Typography>
          <Button variant="primary" onClick={handleCreatePolicy}>
            + Create Your First Policy
          </Button>
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
