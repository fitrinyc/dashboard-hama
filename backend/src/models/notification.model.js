import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  jenis_hama: { type: String, required: true },
  jumlah: { type: Number, required: true },
  lokasi: { type: String },
  message: { type: String, required: true },
  status: { type: String, enum: ["belum_dibaca", "dibaca"], default: "belum_dibaca" },
  waktu: { type: Date, default: Date.now },
});

// Fix typo in enum
notificationSchema.path("status").enumValues = ["belum_dibaca", "dibaca"];

export default mongoose.model("Notification", notificationSchema);
