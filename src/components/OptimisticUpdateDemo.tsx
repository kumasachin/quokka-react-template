import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { usePolicies, useUpdatePolicy } from "../queries/policies";

const OptimisticUpdateDemo = () => {
  const { data: policiesData } = usePolicies();
  const updatePolicyMutation = useUpdatePolicy();

  const toggleFirstPolicyStatus = () => {
    const firstPolicy = policiesData?.data?.[0];
    if (!firstPolicy) return;

    const newStatus = firstPolicy.status === "active" ? "inactive" : "active";

    updatePolicyMutation.mutate({
      id: firstPolicy.id,
      updates: { status: newStatus },
    });
  };

  const firstPolicy = policiesData?.data?.[0];

  return (
    <Paper sx={{ p: 3, m: 2 }}>
      <Typography variant="h6" gutterBottom>
        Optimistic Update Demo
      </Typography>

      {firstPolicy && (
        <Box>
          <Typography variant="body2" gutterBottom>
            First Policy: {firstPolicy.name}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Current Status: <strong>{firstPolicy.status}</strong>
          </Typography>
          <Typography variant="body2" gutterBottom>
            Last Updated: {new Date(firstPolicy.updatedAt).toLocaleTimeString()}
          </Typography>

          <Button
            variant="contained"
            onClick={toggleFirstPolicyStatus}
            disabled={updatePolicyMutation.isPending}
            sx={{ mt: 2 }}
          >
            {updatePolicyMutation.isPending ? "Updating..." : "Toggle Status"}
          </Button>

          {updatePolicyMutation.isError && (
            <Typography
              color="error"
              variant="caption"
              display="block"
              sx={{ mt: 1 }}
            >
              Update failed - changes rolled back
            </Typography>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default OptimisticUpdateDemo;
