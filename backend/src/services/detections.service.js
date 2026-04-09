import Detection from "../models/detection.model.js";
import { normalizeDetectionPayload } from "../validators/detection.validator.js";

// Responsibilities: business logic for detections
export const fetchLatestDetections = async (limit = 50) => {
  // Ambil data deteksi, urutkan berdasarkan waktu descending (Sesuai Class Diagram)
  return await Detection.getDataTerbaru(limit);
};

export const fetchTodayDetections = async () => {
  return await Detection.getTodayDetections();
};

export const createDetectionRecord = async (payload, options = {}) => {
  const normalizedPayload = normalizeDetectionPayload(payload, options.source || "sensor");
  const detection = new Detection(normalizedPayload);
  return await detection.save();
};

