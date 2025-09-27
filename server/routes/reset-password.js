import express from "express";
import resetHandler from "../../api/reset-password.js";

const router = express.Router();

router.all("/", async (req, res, next) => {
  try {
    await resetHandler(req, res);
  } catch (err) {
    next(err);
  }
});

export { router as resetPasswordRouter };
