import React from "react";
import { Header } from "../design-system/components";
import {
  Box,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Typography } from "../design-system/components";
import { Settings } from "@mui/icons-material";

const SettingsPage = () => {
  return (
    <Box>
      <Header
        title="System Settings"
        subtitle="Configure platform preferences"
        prefix={<Settings sx={{ color: "info.main" }} />}
      />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Security Preferences
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Real-time threat monitoring"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Automatic security updates"
              />
              <FormControlLabel control={<Switch />} label="Email alerts" />
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              System Configuration
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Detailed logging"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Performance optimization"
              />
              <FormControlLabel control={<Switch />} label="Debug mode" />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default SettingsPage;
