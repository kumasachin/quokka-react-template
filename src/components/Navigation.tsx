import React from "react";
import { AppBar, Toolbar, Box } from "@mui/material";
import { Typography, Button } from "../design-system/components";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/device", label: "Devices" },
    { path: "/patch", label: "Patches" },
    { path: "/firewall", label: "Firewall" },
  ];

  return (
    <AppBar position="static" elevation={0} sx={{ mb: 3 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          CyberSmart Platform
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "contained" : "text"}
              onClick={() => navigate(item.path)}
              sx={{ color: "white" }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
