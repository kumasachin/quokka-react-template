import express from "express";
import { devices } from "../data/mockData.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.json(devices);
  } catch (err) {
    console.error("Error fetching devices:", err);
    res.status(500).json({
      success: false,
      error: "Couldn't load devices",
      message: err.message,
    });
  }
});

router.get("/:id", (req, res) => {
  try {
    const deviceId = req.params.id;
    const device = devices.find((d) => d.id === deviceId);

    if (!device) {
      return res.status(404).json({
        success: false,
        error: "Device not found",
        message: `No device with ID: ${deviceId}`,
      });
    }

    res.json(device);
  } catch (err) {
    console.error("Error getting device:", err);
    res.status(500).json({
      success: false,
      error: "Something went wrong",
      message: err.message,
    });
  }
});

router.patch("/:id", (req, res) => {
  try {
    const deviceId = req.params.id;
    const updates = req.body;

    const deviceIndex = devices.findIndex((d) => d.id === deviceId);
    if (deviceIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Device not found",
        message: `Can't find device: ${deviceId}`,
      });
    }

    const updatedDevice = {
      ...devices[deviceIndex],
      ...updates,
      id: deviceId,
      lastUpdated: new Date().toISOString(),
    };

    devices[deviceIndex] = updatedDevice;

    res.json(updatedDevice);
  } catch (err) {
    console.error("Device update failed:", err);
    res.status(500).json({
      success: false,
      error: "Update failed",
      message: err.message,
    });
  }
});

export { router as devicesRouter };
