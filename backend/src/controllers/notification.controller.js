import NotificationService from "../services/notification.service.js";

class NotificationController {
  static async create(req, res) {
    try {
      const notification = await NotificationService.createNotification(req.body);
      res.status(201).json({ success: true, data: notification });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const notifications = await NotificationService.getAllNotifications();
      res.json({ success: true, data: notifications });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getUnread(req, res) {
    try {
      const notifications = await NotificationService.getUnreadNotifications();
      res.json({ success: true, data: notifications });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async markAsRead(req, res) {
    try {
      const notification = await NotificationService.markAsRead(req.params.id);
      res.json({ success: true, data: notification });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async markAllAsRead(req, res) {
    try {
      await NotificationService.markAllAsRead();
      res.json({ success: true, message: "Semua notifikasi ditandai sudah dibaca" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await NotificationService.deleteNotification(req.params.id);
      res.json({ success: true, message: "Notifikasi dihapus" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getCount(req, res) {
    try {
      const count = await NotificationService.getUnreadCount();
      res.json({ success: true, data: { count } });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default NotificationController;
