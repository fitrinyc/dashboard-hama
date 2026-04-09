import Notification from "../models/notification.model.js";

class NotificationRepository {
  static async create(data) {
    return await Notification.create(data);
  }

  static async getAll() {
    return await Notification.find().sort({ waktu: -1 });
  }

  static async getUnread() {
    return await Notification.find({ status: "belum_dibaca" }).sort({ waktu: -1 });
  }

  static async markAsRead(id) {
    return await Notification.findByIdAndUpdate(id, { status: "dibaca" }, { new: true });
  }

  static async markAllAsRead() {
    return await Notification.updateMany({ status: "belum_dibaca" }, { status: "dibaca" });
  }

  static async delete(id) {
    return await Notification.findByIdAndDelete(id);
  }

  static async getCount() {
    return await Notification.countDocuments({ status: "belum_dibaca" });
  }
}

export default NotificationRepository;
