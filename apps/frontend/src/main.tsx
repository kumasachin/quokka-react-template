import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App.tsx";
import { theme } from "./design-system/theme";
import "./index.css";
import "./i18n/config";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </StyledThemeProvider>
    </MuiThemeProvider>
  </StrictMode>
);
