import React from "react";
import { Typography, Card, Header } from "../design-system/components";
import { Box, CardContent } from "@mui/material";
import { Dashboard } from "@mui/icons-material";

const DevicePage = () => {
  return (
    <Box>
      <Header
        title="Device Management"
        subtitle="Monitor and manage all your network devices"
        prefix={<Dashboard sx={{ color: "primary.main" }} />}
      />

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Device Dashboard
          </Typography>
          <Typography variant="body1">
            This is a placeholder for the device management page. Here you would
            typically find device inventory, status monitoring, and device
            configuration options.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DevicePage;
