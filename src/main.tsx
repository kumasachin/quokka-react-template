import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App.tsx";
import { theme } from "./design-system/theme";
import "./index.css";

const renderApp = () => {
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
};

// Start MSW conditionally
async function startApp() {
  if (import.meta.env.DEV || import.meta.env.MODE === "test") {
    try {
      const { startMocking } = await import("./mocks");
      await startMocking();
    } catch (err) {
      // Continue without mocks if they fail to load
    }
  }

  renderApp();
}

startApp();
