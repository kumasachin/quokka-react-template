import express from "express";
import { firewallRules } from "../data/mockData.js";

const router = express.Router();

router.get("/rules", (req, res) => {
  try {
    res.json(firewallRules);
  } catch (err) {
    console.error("Oops, something went wrong fetching firewall rules:", err);
    res.status(500).json({
      success: false,
      error: "Could not load firewall rules",
      message: err.message,
    });
  }
});

router.post("/rules", (req, res) => {
  try {
    const ruleData = req.body;

    if (!ruleData.name || !ruleData.action) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
        message: "Firewall rule needs at least a name and action",
      });
    }

    const newRule = {
      ...ruleData,
      id: `fw_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    firewallRules.push(newRule);

    res.status(201).json({
      success: true,
      data: newRule,
      message: "New firewall rule added!",
    });
  } catch (err) {
    console.error("Failed to create firewall rule:", err);
    res.status(500).json({
      success: false,
      error: "Couldn't create the rule",
      message: err.message,
    });
  }
});

router.put("/rules/:id", (req, res) => {
  try {
    const ruleId = req.params.id;
    const updates = req.body;

    const ruleIndex = firewallRules.findIndex((rule) => rule.id === ruleId);

    if (ruleIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Rule not found",
        message: `No firewall rule found with ID: ${ruleId}`,
      });
    }

    const updatedRule = {
      ...firewallRules[ruleIndex],
      ...updates,
      id: ruleId,
      updatedAt: new Date().toISOString(),
    };

    firewallRules[ruleIndex] = updatedRule;

    res.json({
      success: true,
      data: updatedRule,
      message: "Rule updated!",
    });
  } catch (err) {
    console.error("Error updating firewall rule:", err);
    res.status(500).json({
      success: false,
      error: "Update failed",
      message: err.message,
    });
  }
});

export { router as firewallRouter };
