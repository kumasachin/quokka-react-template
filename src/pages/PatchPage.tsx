import React from "react";
import { Typography, Card, Header, Button } from "../design-system/components";
import { Box, CardContent } from "@mui/material";
import { BugReport } from "@mui/icons-material";
import { usePatches, useInstallPatch } from "../hooks";

const PatchPage = () => {
  const { data: patches, isLoading } = usePatches();
  const installPatch = useInstallPatch();

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
              : "This demonstrates the centralized API client with axios interceptors."}
          </Typography>
          <Button
            variant="primary"
            onClick={() => {
              console.log(
                "API client will attempt to fetch patches with error handling"
              );
            }}
          >
            Refresh Patches
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PatchPage;
