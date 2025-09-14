import React from "react";
import { Typography, Card, Header } from "../design-system/components";
import { Box, CardContent } from "@mui/material";

const DevicePage = () => {
  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Header
        title="Device Management"
        subtitle="Monitor and manage all your network devices from one place"
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
