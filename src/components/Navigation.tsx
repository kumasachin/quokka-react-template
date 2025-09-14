import { AppBar, Toolbar, Box } from "@mui/material";
import { Typography, Button } from "../design-system/components";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { path: "/", label: t("navigation.home") },
    { path: "/devices", label: t("navigation.devices") },
    { path: "/patches", label: t("navigation.patches") },
    { path: "/firewall", label: t("navigation.firewall") },
    { path: "/policies", label: t("navigation.policies") },
  ];

  return (
    <AppBar position="static" elevation={0} sx={{ mb: 3 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {t("navigation.title")}
        </Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box
            component="nav"
            role="navigation"
            aria-label="Main navigation"
            sx={{ display: "flex", gap: 1 }}
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
                data-testid={`nav-${item.path.slice(1) || "home"}`}
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
