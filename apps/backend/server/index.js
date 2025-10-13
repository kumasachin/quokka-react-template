import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "../../.env.development" });

import { policiesRouter } from "./routes/policies.js";
import { healthRouter } from "./routes/health.js";
import { devicesRouter } from "./routes/devices.js";
import { systemRouter } from "./routes/system.js";
import { patchesRouter } from "./routes/patches.js";
import { firewallRouter } from "./routes/firewall.js";

const app = express();
const PORT = process.env.PORT || 3002;

app.use(helmet());
app.use(compression());

// Configure CORS for both local development and production
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://localhost:5174", // Vite dev server backup port
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
  // Add your production frontend URL here
  "https://your-frontend-app.vercel.app",
].filter(Boolean);

console.log("CORS allowed origins:", allowedOrigins);
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.some(
          (allowedOrigin) =>
            origin.startsWith(allowedOrigin) || allowedOrigin.includes(origin)
        )
      ) {
        return callback(null, true);
      }

      const msg =
        "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    },
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
    message: "Cybero BFF Server",
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

// Only start server if not in serverless environment (Vercel, Netlify, etc.)
if (
  !process.env.VERCEL &&
  !process.env.NETLIFY &&
  !process.env.AWS_LAMBDA_FUNCTION_NAME
) {
  app.listen(PORT, () => {
    console.log(`🚀 Cybero BFF Server running on port ${PORT}`);
    console.log(`📊 Health endpoint: http://localhost:${PORT}/health`);
    console.log(`📋 API endpoints available:`);
    console.log(`   • Policies: http://localhost:${PORT}/api/policies`);
    console.log(`   • Devices: http://localhost:${PORT}/api/devices`);
    console.log(`   • System: http://localhost:${PORT}/api/system`);
    console.log(`   • Patches: http://localhost:${PORT}/api/patches`);
    console.log(`   • Firewall: http://localhost:${PORT}/api/firewall`);
  });
}

export default app;
