import React, { useState, useRef, useCallback } from "react";
import { Box } from "@mui/material";
import { Security } from "@mui/icons-material";
import {
  Typography,
  CircularProgress,
  Alert,
  Button,
  Header,
  ExpandableCard,
} from "../design-system/components";
import { usePolicies } from "../hooks/usePolicies";
import {
  PolicyFormContainer,
  PolicyFormContainerRef,
} from "../components/policyform/PolicyFormContainer";

const FirewallPage = () => {
  const [expandedPolicy, setExpandedPolicy] = useState<string | false>(false);
  const [formValidity, setFormValidity] = useState<Record<string, boolean>>({});
  const [formChanges, setFormChanges] = useState<Record<string, boolean>>({});
  const formRefs = useRef<Record<string, PolicyFormContainerRef | null>>({});

  const { data: policiesData, isLoading, error } = usePolicies("firewall");

  const handleAccordionChange =
    (policyId: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedPolicy(isExpanded ? policyId : false);
    };

  const handleValidityChange = useCallback(
    (policyId: string) => (isValid: boolean) => {
      setFormValidity((prev) => ({ ...prev, [policyId]: isValid }));
    },
    []
  );

  const handleChangesChange = useCallback(
    (policyId: string) => (hasChanges: boolean) => {
      setFormChanges((prev) => ({ ...prev, [policyId]: hasChanges }));
    },
    []
  );

  const handleSubmit = (policyId: string) => () => {
    formRefs.current[policyId]?.submit();
  };

  if (isLoading) {
    return (
      <Box>
        <Header
          title="Firewall Policies"
          subtitle="Configure and monitor firewall security policies"
          prefix={<Security sx={{ color: "primary.main" }} />}
        />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Header
          title="Firewall Policies"
          subtitle="Configure and monitor firewall security policies"
          prefix={<Security sx={{ color: "error.main" }} />}
        />
        <Alert severity="error" sx={{ mt: 2 }}>
          Failed to load firewall policies. Please try again later.
        </Alert>
      </Box>
    );
  }

  const policies = policiesData?.data || [];

  return (
    <Box>
      <Header
        title="Firewall Policies"
        subtitle="Configure and monitor firewall security policies"
        prefix={<Security sx={{ color: "primary.main" }} />}
      />

      {policies.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Security sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Firewall Policies Found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create your first firewall security policy to get started
          </Typography>
        </Box>
      ) : (
        <Box sx={{ mt: 3 }}>
          {policies.map((policy) => (
            <Box key={policy.id} sx={{ mb: 2 }}>
              <ExpandableCard
                title={policy.name}
                status={policy.status}
                priority={policy.priority}
                expanded={expandedPolicy === policy.id}
                onChange={handleAccordionChange(policy.id)}
              >
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {policy.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Last updated:{" "}
                    {new Date(policy.updatedAt).toLocaleDateString()}
                  </Typography>
                </Box>

                <PolicyFormContainer
                  ref={(ref) => (formRefs.current[policy.id] = ref)}
                  initialData={policy}
                  onValidityChange={handleValidityChange(policy.id)}
                  onChangesChange={handleChangesChange(policy.id)}
                  showSubmitButton={false}
                />

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "flex-end",
                    mt: 3,
                    pt: 2,
                    borderTop: 1,
                    borderColor: "divider",
                  }}
                >
                  <Button
                    variant="primary"
                    onClick={handleSubmit(policy.id)}
                    disabled={
                      !formValidity[policy.id] || !formChanges[policy.id]
                    }
                    data-testid={`submit-button-${policy.id}`}
                  >
                    Update Policy
                  </Button>
                </Box>
              </ExpandableCard>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default FirewallPage;
