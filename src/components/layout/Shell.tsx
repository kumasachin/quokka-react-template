import React from "react";
import {
  Box,
  Container,
  Tab,
  Tabs,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Typography } from "../../design-system/components";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Security } from "@mui/icons-material";

const WrapperTemplate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const tabs = [
    { path: "/", label: "Dashboard" },
    { path: "/devices", label: "Devices" },
    { path: "/patches", label: "Patches" },
    { path: "/firewall", label: "Firewall" },
    { path: "/settings", label: "Settings" },
  ];

  const currentTabIndex = tabs.findIndex(
    (tab) =>
      location.pathname === tab.path ||
      (tab.path !== "/" && location.pathname.startsWith(tab.path))
  );

  const handleTabChange = (_, newValue) => {
    navigate(tabs[newValue].path);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "background.default",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        component="header"
        sx={{
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          boxShadow: 1,
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              py: 2,
              gap: 2,
            }}
          >
            <Security sx={{ fontSize: 32 }} />
            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: 600,
                color: "inherit",
                flexGrow: isMobile ? 1 : 0,
              }}
            >
              CyberSmart Platform
            </Typography>
          </Box>
        </Container>
      </Box>

      <Box
        component="nav"
        sx={{
          backgroundColor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
          position: "sticky",
          top: 0,
          zIndex: theme.zIndex.appBar - 1,
        }}
      >
        <Container maxWidth="xl">
          <Tabs
            value={currentTabIndex >= 0 ? currentTabIndex : 0}
            onChange={handleTabChange}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile}
            sx={{
              minHeight: 48,
              "& .MuiTab-root": {
                minHeight: 48,
                textTransform: "none",
                fontWeight: 500,
              },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab key={tab.path} label={tab.label} />
            ))}
          </Tabs>
        </Container>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          backgroundColor: "background.default",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            py: { xs: 2, sm: 3, md: 4 },
            px: { xs: 2, sm: 3 },
            minHeight: "calc(100vh - 160px)",
          }}
        >
          <Outlet />
        </Container>
      </Box>

      <Box
        component="footer"
        sx={{
          backgroundColor: "background.paper",
          borderTop: 1,
          borderColor: "divider",
          py: 2,
          mt: "auto",
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2025 CyberSmart Platform. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default WrapperTemplate;
