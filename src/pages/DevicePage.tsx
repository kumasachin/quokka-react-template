import { Typography, Card, Header } from "../design-system/components";
import { Box, CardContent, Chip, Skeleton } from "@mui/material";
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

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 2,
            }}
          >
            {isLoading
              ? [...Array(4)].map((_, index) => (
                  <Card key={index} variant="outlined">
                    <CardContent>
                      <Skeleton variant="text" width="60%" />
                      <Skeleton variant="text" width="40%" />
                      <Skeleton variant="rectangular" width={80} height={24} />
                    </CardContent>
                  </Card>
                ))
              : devices?.map((device) => (
                  <Card key={device.id} variant="outlined">
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
                ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DevicePage;
