import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import DevicePage from "./pages/DevicePage";
import PatchPage from "./pages/PatchPage";
import FirewallPage from "./pages/FirewallPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navigation />
        <Box sx={{ flexGrow: 1, width: "100%" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/device" element={<DevicePage />} />
            <Route path="/patch" element={<PatchPage />} />
            <Route path="/firewall" element={<FirewallPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
