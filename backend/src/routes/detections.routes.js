import express from "express";
import { listDetections, listTodayDetections, createDetection, simulateDetection } from "../controllers/detections.controller.js";
import { validateDetection } from "../middlewares/validation.middleware.js";

const router = express.Router();

router.get("/", listDetections);
router.get("/today", listTodayDetections);
router.post("/", validateDetection, createDetection);
router.post("/simulate", validateDetection, simulateDetection);

export default router;
