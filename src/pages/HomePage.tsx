import { Box, Typography, CardContent, Skeleton } from "@mui/material";
import { Button, Card, Header } from "../design-system/components";
import { Home } from "@mui/icons-material";
import { useSystemStats } from "../hooks";
import { useFeatureFlagsStore } from "../state";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const { data: stats, isLoading: statsLoading } = useSystemStats();
  const { isEnabled } = useFeatureFlagsStore();

  const features = [
    {
      title: "Device Management",
      description:
        "Monitor and manage all your network devices from one place.",
      path: "/devices",
    },
    {
      title: "Patch Management",
      description:
        "Keep your systems up-to-date with automated patch deployment.",
      path: "/patches",
    },
    {
      title: "Firewall Control",
      description:
        "Configure and monitor your firewall rules and security policies.",
      path: "/firewall",
    },
  ];

  return (
    <Box>
      <Header
        title="Welcome to CyberSmart"
        subtitle="Your comprehensive cybersecurity management platform"
        prefix={<Home sx={{ color: "primary.main" }} />}
        align="center"
        sx={{ mb: 4 }}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h6" color="primary" gutterBottom>
              Active Devices
            </Typography>
            <Typography variant="h3">
              {statsLoading ? <Skeleton width={60} /> : stats?.devices}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6" color="warning.main" gutterBottom>
              Pending Patches
            </Typography>
            <Typography variant="h3">
              {statsLoading ? <Skeleton width={40} /> : stats?.patches}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6" color="error.main" gutterBottom>
              Threats Detected
            </Typography>
            <Typography variant="h3">
              {statsLoading ? <Skeleton width={30} /> : stats?.threats}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6" color="success.main" gutterBottom>
              System Uptime
            </Typography>
            <Typography variant="h3">
              {statsLoading ? <Skeleton width={80} /> : stats?.uptime}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {features.map((feature) => (
          <Card
            key={feature.title}
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {feature.description}
              </Typography>
              <Button variant="primary" onClick={() => navigate(feature.path)}>
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {isEnabled("enableNotifications") && (
        <Box
          sx={{ mt: 3, p: 2, backgroundColor: "info.light", borderRadius: 1 }}
        >
          <Typography variant="body2" color="info.contrastText">
            ℹ️ Notifications are enabled via feature flags
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
