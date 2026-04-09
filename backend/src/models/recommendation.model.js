import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema({
  jenis_hama: { type: String, required: true },       // wereng / tikus / burung
  frekuensi_deteksi: { type: Number, required: true }, // jumlah deteksi hari ini
  status: { type: String, required: true },            // Normal / Waspada / Bahaya
  saran: { type: String, required: true },             // teks rekomendasi tindakan
  waktu: { type: Date, default: Date.now },
});

export default mongoose.model("Recommendation", recommendationSchema);
