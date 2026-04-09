import { validateDetectionPayload } from "../validators/detection.validator.js";

export const validateDetection = (req, res, next) => {
  const result = validateDetectionPayload(req.body);

  if (!result.isValid) {
    return res.status(422).json({
      success: false,
      message: "Payload deteksi tidak valid.",
      errors: result.errors,
    });
  }

  next();
};
