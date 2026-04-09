import express from "express";
import NotificationController from "../controllers/notification.controller.js";

const router = express.Router();

router.post("/", NotificationController.create);
router.get("/", NotificationController.getAll);
router.get("/unread", NotificationController.getUnread);
router.get("/count", NotificationController.getCount);
router.put("/:id/read", NotificationController.markAsRead);
router.put("/read-all", NotificationController.markAllAsRead);
router.delete("/:id", NotificationController.delete);

export default router;
