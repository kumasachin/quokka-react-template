import React from "react";
import { Typography, Card, Header } from "../design-system/components";
import { Box, CardContent, Chip, Grid, Skeleton } from "@mui/material";
import { Dashboard } from "@mui/icons-material";
import { useDevices } from "../hooks";

const DevicePage = () => {
  const { data: devices, isLoading, error } = useDevices();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "success";
      case "offline":
        return "error";
      case "maintenance":
        return "warning";
      default:
        return "default";
    }
  };

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
            Connected Devices
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              Failed to load devices. Please try again.
            </Typography>
          )}

          <Grid container spacing={2}>
            {isLoading
              ? [...Array(4)].map((_, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card variant="outlined">
                      <CardContent>
                        <Skeleton variant="text" width="60%" />
                        <Skeleton variant="text" width="40%" />
                        <Skeleton
                          variant="rectangular"
                          width={80}
                          height={24}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              : devices?.map((device) => (
                  <Grid item xs={12} sm={6} md={4} key={device.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {device.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          Last seen: {device.lastSeen}
                        </Typography>
                        <Chip
                          label={device.status}
                          color={getStatusColor(device.status) as any}
                          size="small"
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DevicePage;
