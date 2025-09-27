import express from "express";
import { v4 as uuidv4 } from "uuid";
import { mockPolicies } from "../data/policies.js";

const router = express.Router();

let policies = [...mockPolicies];

router.get("/", (req, res) => {
  try {
    const { type } = req.query;

    let filteredPolicies = policies;
    if (type) {
      filteredPolicies = policies.filter((policy) => policy.type === type);
    }

    res.json({
      success: true,
      data: filteredPolicies,
      total: filteredPolicies.length,
      filters: type ? { type } : null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch policies",
      message: error.message,
    });
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const policy = policies.find((p) => p.id === id);

    if (!policy) {
      return res.status(404).json({
        success: false,
        error: "Policy not found",
        message: `Policy with ID ${id} does not exist`,
      });
    }

    res.json({
      success: true,
      data: policy,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch policy",
      message: error.message,
    });
  }
});

router.post("/", (req, res) => {
  try {
    const newPolicyData = req.body;

    if (
      !newPolicyData.name ||
      !newPolicyData.type ||
      !newPolicyData.description
    ) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
        message: "Name, type, and description are required",
      });
    }

    const newPolicy = {
      ...newPolicyData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: newPolicyData.createdBy || "user@cybersmart.com",
    };

    policies.push(newPolicy);

    res.status(201).json({
      success: true,
      data: newPolicy,
      message: "Policy created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to create policy",
      message: error.message,
    });
  }
});

router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const policyIndex = policies.findIndex((p) => p.id === id);
    if (policyIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Policy not found",
        message: `Policy with ID ${id} does not exist`,
      });
    }

    policies[policyIndex] = {
      ...policies[policyIndex],
      ...updates,
      id,
      updatedAt: new Date().toISOString(),
    };

    res.json({
      success: true,
      data: policies[policyIndex],
      message: "Policy updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update policy",
      message: error.message,
    });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const policyIndex = policies.findIndex((p) => p.id === id);

    if (policyIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Policy not found",
        message: `Policy with ID ${id} does not exist`,
      });
    }

    const deletedPolicy = policies.splice(policyIndex, 1)[0];

    res.json({
      success: true,
      data: deletedPolicy,
      message: "Policy deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete policy",
      message: error.message,
    });
  }
});

export { router as policiesRouter };
