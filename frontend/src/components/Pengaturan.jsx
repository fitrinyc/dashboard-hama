export default function Pengaturan() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">⚙️ Pengaturan</h2>
      <p>Kelola pengaturan perangkat, topik MQTT, dan profil pengguna.</p>
      <div className="bg-white p-6 rounded-2xl shadow mt-4">
        <label htmlFor="mqtt-topic" className="block font-semibold mb-2">Topik MQTT</label>
        <input
          type="text"
          id="mqtt-topic"
          name="mqtt-topic"
          placeholder="iot/hama"
          className="border p-2 w-full rounded"
        />
        <button className="bg-green-600 text-white px-4 py-2 mt-3 rounded hover:bg-green-700">Simpan</button>
      </div>
    </div>
  );
}
