import express from "express";
import authHandler from "../../api/auth.js";
import registerHandler from "../../api/register.js";
import resetHandler from "../../api/reset-password.js";

const router = express.Router();

// POST /api/auth/login -> authHandler (login)
router.post("/login", async (req, res, next) => {
  try {
    await authHandler(req, res);
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/signup -> registerHandler (signup)
router.post("/signup", async (req, res, next) => {
  try {
    await registerHandler(req, res);
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/reset -> resetHandler (password reset)
router.post("/reset", async (req, res, next) => {
  try {
    await resetHandler(req, res);
  } catch (err) {
    next(err);
  }
});

// Backwards-compatible root handler: existing clients may POST to /api/auth
router.all("/", async (req, res, next) => {
  try {
    await authHandler(req, res);
  } catch (err) {
    next(err);
  }
});

export { router as authRouter };
