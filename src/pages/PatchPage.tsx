import React from "react";
import { Typography, Card, Header, Button } from "../design-system/components";
import { Box, CardContent } from "@mui/material";
import { BugReport } from "@mui/icons-material";
import { usePatches, useInstallPatch, useToast } from "../hooks";

const PatchPage = () => {
  const { data: patches, isLoading } = usePatches();
  const installPatch = useInstallPatch();
  const toast = useToast();

  return (
    <Box>
      <Header
        title="Patch Management"
        subtitle="Keep your systems up-to-date with security patches"
        prefix={<BugReport sx={{ color: "warning.main" }} />}
      />

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Security Patches
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {isLoading
              ? "Loading patches..."
              : "Test the toast notifications below."}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="primary"
              onClick={() => toast.success("Patches refreshed successfully!")}
            >
              Success Toast
            </Button>
            <Button
              variant="secondary"
              onClick={() => toast.error("Failed to install patch")}
            >
              Error Toast
            </Button>
            <Button
              variant="primary"
              onClick={() => toast.warning("System restart required")}
            >
              Warning Toast
            </Button>
            <Button
              variant="secondary"
              onClick={() => toast.info("New patches available")}
            >
              Info Toast
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PatchPage;
