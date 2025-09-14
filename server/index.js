import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { policiesRouter } from "./routes/policies.js";
import { healthRouter } from "./routes/health.js";
import { devicesRouter } from "./routes/devices.js";
import { systemRouter } from "./routes/system.js";
import { patchesRouter } from "./routes/patches.js";
import { firewallRouter } from "./routes/firewall.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

app.use("/health", healthRouter);
app.use("/api/policies", policiesRouter);
app.use("/api/devices", devicesRouter);
app.use("/api/system", systemRouter);
app.use("/api/patches", patchesRouter);
app.use("/api/firewall", firewallRouter);

app.get("/", (req, res) => {
  res.json({
    message: "CyberSmart BFF Server",
    version: "1.0.0",
    status: "running",
  });
});

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Not Found",
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(err.status || 500).json({
    success: false,
    error:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 CyberSmart BFF Server running on port ${PORT}`);
  console.log(`📊 Health endpoint: http://localhost:${PORT}/health`);
  console.log(`📋 API endpoints available:`);
  console.log(`   • Policies: http://localhost:${PORT}/api/policies`);
  console.log(`   • Devices: http://localhost:${PORT}/api/devices`);
  console.log(`   • System: http://localhost:${PORT}/api/system`);
  console.log(`   • Patches: http://localhost:${PORT}/api/patches`);
  console.log(`   • Firewall: http://localhost:${PORT}/api/firewall`);
});

export default app;
