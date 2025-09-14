import express from "express";
import { patches } from "../data/mockData.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const sortedPatches = [...patches].sort((a, b) => {
      const severityOrder = { critical: 0, medium: 1, low: 2 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    });

    res.json(sortedPatches);
  } catch (err) {
    console.error("Error fetching patches:", err);
    res.status(500).json({
      success: false,
      error: "Couldn't load patches",
      message: err.message,
    });
  }
});

router.post("/:id/install", (req, res) => {
  try {
    const patchId = req.params.id;
    const patchIndex = patches.findIndex((p) => p.id === patchId);

    if (patchIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Patch not found",
        message: `Can't find patch: ${patchId}`,
      });
    }

    const patch = patches[patchIndex];

    if (patch.status === "installed") {
      return res.status(400).json({
        success: false,
        error: "Already installed",
        message: `Patch "${patch.title}" is already installed`,
      });
    }

    patches[patchIndex] = {
      ...patch,
      status: "installed",
      installedAt: new Date().toISOString(),
    };

    res.json({
      success: true,
      data: patches[patchIndex],
      message: `Successfully installed "${patch.title}"`,
    });
  } catch (err) {
    console.error("Patch installation failed:", err);
    res.status(500).json({
      success: false,
      error: "Installation failed",
      message: err.message,
    });
  }
});

export { router as patchesRouter };
