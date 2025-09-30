import {
  Typography,
  Card,
  Header,
  StatusChip,
} from "../design-system/components";
import { Box, CardContent, Skeleton } from "@mui/material";
import { Dashboard } from "@mui/icons-material";
import { useDevices } from "../hooks";
import { useTranslation } from "react-i18next";

const DevicePage = () => {
  const { t } = useTranslation();
  const { data: devices, isLoading, error } = useDevices();

  return (
    <Box>
      <Header
        title={t("devices.title")}
        subtitle={t("devices.subtitle")}
        prefix={<Dashboard sx={{ color: "primary.main" }} />}
      />

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {t("devices.connectedDevices")}
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {t("devices.loadError")}
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
                      <StatusChip
                        status={device.status}
                        data-testid={`device-status-${device.id}`}
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
