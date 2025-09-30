import { AppBar, Toolbar, Box } from "@mui/material";
import { Typography, Button } from "../design-system/components";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation("navigation");

  const navItems = [
    { path: "/", label: t("home") },
    { path: "/devices", label: t("devices") },
    { path: "/patches", label: t("patches") },
    { path: "/firewall", label: t("firewall") },
    { path: "/policies", label: t("policies") },
    { path: "/settings", label: t("settings") },
  ];

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ mb: 3 }}
      data-testid="navigation"
    >
      <Toolbar data-testid="navigation-toolbar">
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
          data-testid="navigation-title"
        >
          {t("title")}
        </Typography>
        <Box
          sx={{ display: "flex", gap: 2, alignItems: "center" }}
          data-testid="navigation-content"
        >
          <Box
            component="nav"
            role="navigation"
            aria-label="Main navigation"
            sx={{ display: "flex", gap: 1 }}
            data-testid="navigation-menu"
          >
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={
                  location.pathname === item.path ? "primary" : "secondary"
                }
                onClick={() => navigate(item.path)}
                aria-current={
                  location.pathname === item.path ? "page" : undefined
                }
                data-testid={`nav-tab-${item.path.slice(1) || "home"}`}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          <LanguageSwitcher />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
