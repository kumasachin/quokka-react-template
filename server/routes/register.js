import express from "express";
import registerHandler from "../../api/register.js";

const router = express.Router();

router.all("/", async (req, res, next) => {
  try {
    await registerHandler(req, res);
  } catch (err) {
    next(err);
  }
});

export { router as registerRouter };
