import {
  Box,
  Container,
  Tab,
  Tabs,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Typography, ToastPanel } from "../../design-system/components";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Security } from "@mui/icons-material";
import ErrorBoundary from "../ErrorBoundary";

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
    { path: "/policies", label: "Policies" },
    { path: "/settings", label: "Settings" },
  ];

  const currentTabIndex = tabs.findIndex(
    (tab) =>
      location.pathname === tab.path ||
      (tab.path !== "/" && location.pathname.startsWith(tab.path))
  );

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    navigate(tabs[newValue].path);
  };

  return (
    <Box
      data-testid="wrapper-template"
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "background.default",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Skip to main content link for keyboard navigation */}
      <Box
        component="a"
        href="#main-content"
        data-testid="skip-link"
        sx={{
          position: "absolute",
          top: -40,
          left: 6,
          background: "primary.main",
          color: "primary.contrastText",
          padding: "8px 16px",
          borderRadius: 1,
          textDecoration: "none",
          zIndex: 9999,
          "&:focus": {
            top: 6,
          },
        }}
      >
        Skip to main content
      </Box>

      <Box
        component="header"
        role="banner"
        data-testid="app-header"
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
            <Security sx={{ fontSize: 32 }} aria-hidden="true" />
            <Typography
              variant="h5"
              component="h1"
              data-testid="app-title"
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
        role="navigation"
        aria-label="Main navigation"
        data-testid="main-navigation"
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
            aria-label="Navigation tabs"
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
              <Tab
                key={tab.path}
                label={tab.label}
                id={`nav-tab-${index}`}
                aria-controls={`nav-tabpanel-${index}`}
              />
            ))}
          </Tabs>
        </Container>
      </Box>

      <Box
        component="main"
        role="main"
        id="main-content"
        tabIndex={-1}
        data-testid="main-content"
        sx={{
          flexGrow: 1,
          width: "100%",
          backgroundColor: "background.default",
          outline: "none",
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
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
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
      <ToastPanel />
    </Box>
  );
};

export default WrapperTemplate;
