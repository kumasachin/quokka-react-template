import express from "express";
import { systemStats } from "../data/mockData.js";

const router = express.Router();

router.get("/stats", (req, res) => {
  try {
    const stats = {
      ...systemStats,
      lastUpdated: new Date().toISOString(),
      cpuUsage: Math.floor(Math.random() * 20) + 10,
      memoryUsage: Math.floor(Math.random() * 30) + 40,
      diskUsage: Math.floor(Math.random() * 15) + 65,
    };

    res.json(stats);
  } catch (err) {
    console.error("Error getting system stats:", err);
    res.status(500).json({
      success: false,
      error: "Can't load system stats right now",
      message: err.message,
    });
  }
});

export { router as systemRouter };
