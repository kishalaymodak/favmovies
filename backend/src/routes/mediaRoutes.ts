import express from "express";
import {
  getMedia,
  createMedia,
  updateMedia,
  deleteMedia,
} from "../controllers/mediaController";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.use(authenticate);

router.get("/", getMedia);
router.post("/", createMedia);
router.put("/:id", updateMedia);
router.delete("/:id", deleteMedia);

export default router;
