import Detection from "../models/detection.model.js";

// Rule table per pest type — IF frekuensi_deteksi <= maxFrekuensi THEN status + saran
const ruleTable = {
  wereng: [
    { maxFrekuensi: 0, status: "Normal", saran: "Tidak ada tindakan khusus. Pantau lahan secara berkala." },
    { maxFrekuensi: 2, status: "Waspada", saran: "Intensifkan pengamatan harian. Siapkan insektisida botani sebagai tindakan preventif." },
    { maxFrekuensi: Infinity, status: "Bahaya", saran: "Segera aplikasikan insektisida kimia sesuai dosis anjuran. Laporkan ke PPL setempat." },
  ],
  tikus: [
    { maxFrekuensi: 0, status: "Normal", saran: "Tidak ada tindakan khusus. Periksa kondisi pematang sawah secara rutin." },
    { maxFrekuensi: 2, status: "Waspada", saran: "Pasang perangkap TBS/LTBS di pematang lahan. Tingkatkan frekuensi pemantauan." },
    { maxFrekuensi: Infinity, status: "Bahaya", saran: "Lakukan gropyokan massal bersama kelompok tani. Gunakan rodentisida sesuai rekomendasi PPL." },
  ],
  burung: [
    { maxFrekuensi: 0, status: "Normal", saran: "Tidak ada tindakan khusus." },
    { maxFrekuensi: 3, status: "Waspada", saran: "Aktifkan pengusir suara otomatis. Lakukan patroli pagi dan sore hari." },
    { maxFrekuensi: Infinity, status: "Bahaya", saran: "Koordinasikan pengusiran massal bersama kelompok tani di sekitar lahan." },
  ],
};

export const getRecommendations = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const detections = await Detection.find({ waktu_deteksi: { $gte: today } });

  const frekuensi = { wereng: 0, tikus: 0, burung: 0 };
  detections.forEach((d) => {
    const jenis = d.jenis_hama?.toLowerCase();
    if (frekuensi[jenis] !== undefined) frekuensi[jenis]++;
  });

  const hasil = Object.entries(frekuensi).map(([jenis, freq]) => {
    const rules = ruleTable[jenis];
    const rule = rules.find((r) => freq <= r.maxFrekuensi);
    return {
      jenis_hama: jenis,
      frekuensi_deteksi: freq,
      status: rule.status,
      saran: rule.saran,
    };
  });

  return hasil;
};
