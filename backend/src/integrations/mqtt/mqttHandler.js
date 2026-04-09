import mqtt from "mqtt";

import Detection from "../../models/detection.model.js";
import Notification from "../../models/notification.model.js";

const AMBANG_BATAS = { wereng: 2, tikus: 2, burung: 3 };

export const setupMqtt = (io) => {
  const client = mqtt.connect(process.env.MQTT_URL || "mqtt://broker.emqx.io:1883");
  const topic = process.env.MQTT_TOPIC || "iot/hama/tempuran_smart_farm_99";

  client.on("connect", () => {
    console.log("MQTT Connected");
    client.subscribe(topic, (error) => {
      if (!error) {
        console.log(`Subscribed to: ${topic}`);
      }
    });
  });

  client.on("message", async (receivedTopic, message) => {
    try {
      const data = JSON.parse(message.toString());
      console.log("Data IoT diterima:", data, "topic:", receivedTopic);

      const payload = { ...data, waktu_deteksi: data.waktu || new Date() };
      await Detection.simpanData(payload);

      io.emit("new-detection", data);

      const jenis = data.jenis_hama?.toLowerCase();
      const batas = AMBANG_BATAS[jenis] ?? 10;

      if (data.jumlah > batas) {
        const notif = await Notification.create({
          jenis_hama: data.jenis_hama,
          jumlah: data.jumlah,
          lokasi: data.lokasi || "Sawah Tempuran",
          message: `Peringatan! ${data.jenis_hama} terdeteksi ${data.jumlah} ekor di ${data.lokasi || "Sawah Tempuran"}. Segera ambil tindakan!`,
          status: "belum_dibaca",
        });

        io.emit("hama-alert", {
          message: notif.message,
          data,
        });
        console.log("Notifikasi dikirim:", notif.message);
      }
    } catch (error) {
      console.error("Error memproses data IoT:", error);
    }
  });
};
