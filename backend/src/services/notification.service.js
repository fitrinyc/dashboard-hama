import NotificationRepository from "../repositories/notification.repository.js";

class NotificationService {
  static async createNotification(data) {
    return await NotificationRepository.create(data);
  }

  static async getAllNotifications() {
    return await NotificationRepository.getAll();
  }

  static async getUnreadNotifications() {
    return await NotificationRepository.getUnread();
  }

  static async markAsRead(id) {
    return await NotificationRepository.markAsRead(id);
  }

  static async markAllAsRead() {
    return await NotificationRepository.markAllAsRead();
  }

  static async deleteNotification(id) {
    return await NotificationRepository.delete(id);
  }

  static async getUnreadCount() {
    return await NotificationRepository.getCount();
  }
}

export default NotificationService;
