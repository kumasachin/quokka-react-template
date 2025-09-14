import React from "react";
import { Typography, Card, Header } from "../design-system/components";
import { Box, CardContent } from "@mui/material";

const FirewallPage = () => {
  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Header
        title="Firewall Configuration"
        subtitle="Configure and monitor firewall rules and security policies"
      />

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Network Security
          </Typography>
          <Typography variant="body1">
            This is a placeholder for the firewall configuration page. Here you
            would manage firewall rules, monitor network traffic, configure
            security policies, and view threat analytics.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FirewallPage;
