import { useState } from "react";
import {
  Header,
  Select,
  Button,
  PolicyCard,
  StatusType,
  PriorityType,
  CircularProgress,
  Alert,
  PageSection,
  EmptyState,
} from "../design-system/components";
import { Box, Typography } from "@mui/material";
import { Policy, Error } from "@mui/icons-material";
import { usePolicies, useUpdatePolicy } from "../hooks/usePolicies";
import { useDeletePolicy } from "../hooks/usePolicies";
import { useToast } from "../hooks";
import PolicyFormModal from "../components/policyform/PolicyFormModal";
import { Policy as PolicyType } from "../api/policies";
import { useTranslation } from "react-i18next";

const PoliciesPage = () => {
  const { t } = useTranslation();
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
      toast.success(t(`policies.messages.${newStatus}`));
    } catch (error) {
      toast.error(t("policies.messages.statusUpdateError"));
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
    if (confirm(t("policies.messages.deleteConfirm"))) {
      try {
        await deletePolicy.mutateAsync(policyId);
        toast.success(t("policies.messages.deleted"));
      } catch (error) {
        toast.error(t("policies.messages.deleteError"));
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
          title={t("policies.title")}
          subtitle={t("policies.subtitle")}
          prefix={<Error sx={{ color: "error.main" }} />}
        />
        <Alert severity="error" sx={{ mt: 2 }}>
          {t("policies.loadError")}
        </Alert>
      </Box>
    );
  }

  const policies = policiesData?.data || [];

  return (
    <Box
      data-testid="policies-page"
      role="main"
      aria-labelledby="policies-page-title"
    >
      <Header
        title={t("policies.title")}
        subtitle={t("policies.subtitle")}
        prefix={<Policy sx={{ color: "info.main" }} aria-hidden="true" />}
      />

      <PageSection
        component="section"
        variant="elevated"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
        }}
        data-testid="policies-controls"
        aria-label="Policy management controls"
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Select
            fieldLabel={t("policies.filterByType")}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as string)}
            options={[
              { value: "", label: t("policies.allTypes") },
              ...policyTypes.map((type) => ({
                value: type,
                label: t(`policies.type.${type}`),
              })),
            ]}
            sx={{ minWidth: 200, flexShrink: 0 }}
            data-testid="policy-type-filter"
            aria-label="Filter policies by type"
          />

          <Typography
            variant="h6"
            color="text.secondary"
            data-testid="policy-count"
            aria-live="polite"
            aria-label={`${policies.length} ${
              policies.length === 1 ? "policy" : "policies"
            } found`}
            sx={{ whiteSpace: "nowrap", flexShrink: 0 }}
          >
            {t(
              policies.length === 1
                ? "policies.policyFound"
                : "policies.policiesFound",
              { count: policies.length }
            )}
          </Typography>
        </Box>

        <Button
          variant="primary"
          onClick={handleCreatePolicy}
          data-testid="create-policy-button"
          aria-label="Create new policy"
        >
          + {t("policies.createPolicy")}
        </Button>
      </PageSection>

      <Box
        component="section"
        aria-label="Policy list"
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
        data-testid="policies-grid"
      >
        {policies.map((policy) => (
          <PolicyCard
            key={policy.id}
            id={policy.id}
            name={policy.name}
            description={policy.description}
            type={policy.type}
            status={policy.status as StatusType}
            priority={policy.priority as PriorityType}
            rulesCount={policy.rules?.length || 0}
            updatedAt={policy.updatedAt}
            onEdit={() => handleEditPolicy(policy)}
            onDelete={() => handleDeletePolicy(policy.id)}
            onStatusToggle={() => handleStatusToggle(policy.id, policy.status)}
            isUpdating={updatePolicyMutation.isPending}
          />
        ))}
      </Box>

      {policies.length === 0 && (
        <EmptyState
          icon={<Policy sx={{ fontSize: 48, color: "text.disabled" }} />}
          title={t("policies.noPolicy")}
          description={
            selectedType
              ? t("policies.noPolicyFiltered", {
                  type: t(`policies.type.${selectedType}`),
                })
              : t("policies.noPolicyDescription")
          }
          action={{
            label: `+ ${t("policies.createFirstPolicy")}`,
            onClick: handleCreatePolicy,
          }}
          data-testid="empty-state"
        />
      )}

      <PolicyFormModal
        open={formModalOpen}
        onClose={handleCloseModal}
        policy={editingPolicy}
      />
    </Box>
  );
};

export default PoliciesPage;
