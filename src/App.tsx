import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryProvider } from "./providers";
import WrapperTemplate from "./components/layout/WrapperTemplate";
import { Typography } from "./design-system";
import "./App.css";

// Lazy load pages for code splitting
const HomePage = lazy(() => import("./pages/HomePage"));
const DevicePage = lazy(() => import("./pages/DevicePage"));
const PatchPage = lazy(() => import("./pages/PatchPage"));
const FirewallPage = lazy(() => import("./pages/FirewallPage"));
const PoliciesPage = lazy(() => import("./pages/PoliciesPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Loading component for Suspense fallback
const PageLoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "200px",
      flexDirection: "column",
      gap: "16px",
    }}
  >
    <div
      style={{
        width: "32px",
        height: "32px",
        border: "3px solid #f3f3f3",
        borderTop: "3px solid #1976d2",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
    <Typography variant="body2" color="textSecondary">
      Loading page...
    </Typography>
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

function App() {
  return (
    <QueryProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WrapperTemplate />}>
            <Route
              index
              element={
                <Suspense fallback={<PageLoadingSpinner />}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path="devices"
              element={
                <Suspense fallback={<PageLoadingSpinner />}>
                  <DevicePage />
                </Suspense>
              }
            />
            <Route
              path="patches"
              element={
                <Suspense fallback={<PageLoadingSpinner />}>
                  <PatchPage />
                </Suspense>
              }
            />
            <Route
              path="firewall"
              element={
                <Suspense fallback={<PageLoadingSpinner />}>
                  <FirewallPage />
                </Suspense>
              }
            />
            <Route
              path="policies"
              element={
                <Suspense fallback={<PageLoadingSpinner />}>
                  <PoliciesPage />
                </Suspense>
              }
            />
            <Route
              path="settings"
              element={
                <Suspense fallback={<PageLoadingSpinner />}>
                  <SettingsPage />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<PageLoadingSpinner />}>
                  <NotFoundPage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </Router>
    </QueryProvider>
  );
}

export default App;
