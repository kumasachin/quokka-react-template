import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryProvider } from "./providers";
import WrapperTemplate from "./components/layout/WrapperTemplate";
import HomePage from "./pages/HomePage";
import DevicePage from "./pages/DevicePage";
import PatchPage from "./pages/PatchPage";
import FirewallPage from "./pages/FirewallPage";
import PoliciesPage from "./pages/PoliciesPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

function App() {
  return (
    <QueryProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WrapperTemplate />}>
            <Route index element={<HomePage />} />
            <Route path="devices" element={<DevicePage />} />
            <Route path="patches" element={<PatchPage />} />
            <Route path="firewall" element={<FirewallPage />} />
            <Route path="policies" element={<PoliciesPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </QueryProvider>
  );
}

export default App;
