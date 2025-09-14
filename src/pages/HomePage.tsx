import React from "react";
import { Box, Typography, Grid, CardContent } from "@mui/material";
import { Button, Card, Header } from "../design-system/components";
import { Home } from "@mui/icons-material";

const HomePage = () => {
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

      <Grid container spacing={3}>
        {features.map((feature) => (
          <Grid item xs={12} md={4} key={feature.title}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {feature.description}
                </Typography>
                <Button variant="primary" href={feature.path} component="a">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
