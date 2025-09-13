import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";
import { ExpandMore, Update } from "@mui/icons-material";
import { Header } from "../design-system/components";
import { usePolicies } from "../hooks/usePolicies";
import PolicySchemaDemo from "../components/PolicySchemaDemo";

const PatchPage = () => {
  const [expandedPolicy, setExpandedPolicy] = useState<string | false>(false);
  const { data: policiesData, isLoading, error } = usePolicies("backup");

  const handleAccordionChange =
    (policyId: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedPolicy(isExpanded ? policyId : false);
    };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "error";
      case "draft":
        return "warning";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "default";
      case "medium":
        return "info";
      case "high":
        return "warning";
      case "critical":
        return "error";
      default:
        return "default";
    }
  };

  if (isLoading) {
    return (
      <Box>
        <Header
          title="Patch Policies"
          subtitle="Manage security patch deployment policies"
          prefix={<Update sx={{ color: "primary.main" }} />}
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
          title="Patch Policies"
          subtitle="Manage security patch deployment policies"
          prefix={<Update sx={{ color: "error.main" }} />}
        />
        <Alert severity="error" sx={{ mt: 2 }}>
          Failed to load patch policies. Please try again later.
        </Alert>
      </Box>
    );
  }

  const policies = policiesData?.data || [];

  return (
    <Box>
      <Header
        title="Patch Policies"
        subtitle="Manage security patch deployment policies"
        prefix={<Update sx={{ color: "primary.main" }} />}
      />

      {policies.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Update sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Patch Policies Found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create your first patch deployment policy to get started
          </Typography>
        </Box>
      ) : (
        <Box sx={{ mt: 3 }}>
          {policies.map((policy) => (
            <Box key={policy.id} sx={{ mb: 2 }}>
              <Accordion
                expanded={expandedPolicy === policy.id}
                onChange={handleAccordionChange(policy.id)}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "100%",
                    }}
                  >
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      {policy.name}
                    </Typography>
                    <Chip
                      label={policy.status}
                      color={getStatusColor(policy.status) as any}
                      size="small"
                    />
                    <Chip
                      label={policy.priority}
                      color={getPriorityColor(policy.priority) as any}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      {policy.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Last updated:{" "}
                      {new Date(policy.updatedAt).toLocaleDateString()}
                    </Typography>
                  </Box>

                  <PolicyForm initialData={policy} />
                </AccordionDetails>
              </Accordion>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

const PolicyForm = ({ initialData }: { initialData: any }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Edit Policy: {initialData.name}
        </Typography>
        <PolicySchemaDemo />
      </CardContent>
    </Card>
  );
};

export default PatchPage;
