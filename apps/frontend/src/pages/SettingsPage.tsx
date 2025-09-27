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
import { useFeatureFlagsStore } from "../state";
import { useToast } from "../hooks";

const SettingsPage = () => {
  const { flags, setFlag } = useFeatureFlagsStore();
  const toast = useToast();
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
              Feature Flags
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={flags.enableNotifications}
                    onChange={(e) => {
                      setFlag("enableNotifications", e.target.checked);
                      toast.success("Notifications setting updated");
                    }}
                  />
                }
                label="Enable notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={flags.enableAdvancedReports}
                    onChange={(e) =>
                      setFlag("enableAdvancedReports", e.target.checked)
                    }
                  />
                }
                label="Advanced reports"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={flags.enableBetaFeatures}
                    onChange={(e) =>
                      setFlag("enableBetaFeatures", e.target.checked)
                    }
                  />
                }
                label="Beta features"
              />
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
