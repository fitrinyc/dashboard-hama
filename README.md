# Dashboard Monitoring dan Rekomendasi Hama

Sistem ini merupakan aplikasi dashboard monitoring hama berbasis web untuk membantu proses pemantauan deteksi hama, melihat data historis, dan menampilkan rekomendasi tindakan berdasarkan data yang masuk. Aplikasi dibangun dengan arsitektur frontend-backend menggunakan React.js, Node.js, Express, MongoDB, serta integrasi MQTT untuk menerima data sensor secara real-time.

## Fitur Utama

- Login pengguna untuk masuk ke dashboard
- Dashboard monitoring data deteksi hama
- Halaman deteksi hari ini
- Visualisasi chart / grafik deteksi hama
- Rekomendasi tindakan berdasarkan data deteksi
- Notifikasi peringatan hama secara real-time
- Simulasi input data melalui Postman
- Dukungan penerimaan data sensor melalui MQTT

## Teknologi yang Digunakan

- Frontend: React.js, Vite, Tailwind CSS, Axios, Recharts, Socket.IO Client
- Backend: Node.js, Express.js, Mongoose, JWT, bcryptjs, MQTT, Socket.IO
- Database: MongoDB
- Integrasi real-time: MQTT dan Socket.IO

## Struktur Proyek

```text
dashboard_hama/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── integrations/
│   │   │   └── mqtt/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── features/
│   │   ├── layouts/
│   │   ├── mqtt/
│   │   ├── pages/
│   │   ├── shared/
│   │   └── main.jsx
│   └── package.json
├── arsitektur_mvc.html
└── README.md
```

## Arsitektur Singkat

Alur utama sistem:

- `Login.jsx -> auth.controller.js -> auth.service.js -> user.model.js -> MongoDB`
- `Dashboard.jsx / DeteksiHariIni.jsx / ChartHama.jsx -> detections.controller.js -> detections.service.js -> detection.model.js -> MongoDB`
- `Rekomendasi.jsx -> analysis.controller.js -> analysis.service.js -> detection.model.js -> MongoDB`
- `Notification Feature -> notification.controller.js -> notification.service.js -> notification.model.js -> MongoDB`

Alur data sensor:

- `Perangkat IoT / Sensor -> mqttHandler.js -> detection.model.js -> MongoDB`
- Jika ambang batas terlampaui, `mqttHandler.js` juga membuat data ke `notification.model.js`

## Struktur Backend yang Aktif

### Controller

- `analysis.controller.js`
- `auth.controller.js`
- `detections.controller.js`
- `notification.controller.js`

### Service

- `analysis.service.js`
- `auth.service.js`
- `detections.service.js`
- `notification.service.js`

### Model

- `detection.model.js`
- `hama.model.js`
- `notification.model.js`
- `recommendation.model.js`
- `rule.model.js`
- `user.model.js`

Catatan:

- Pada implementasi saat ini, alur utama paling aktif menggunakan `user.model.js`, `detection.model.js`, dan `notification.model.js`.
- `hama.model.js`, `rule.model.js`, dan `recommendation.model.js` tersedia di project, tetapi belum menjadi bagian utama dari alur operasional dashboard saat ini.

## Konfigurasi Environment

### Backend

Buat file `.env` di folder `backend/` atau sesuaikan environment project kamu:

```env
PORT=8081
MONGO_URL=mongodb://localhost:27017/dashboard_hama
JWT_SECRET=smart_farm_secret_key
MQTT_URL=mqtt://broker.emqx.io:1883
MQTT_TOPIC=iot/hama/tempuran_smart_farm_99
```

### Frontend

Buat file `.env` di folder `frontend/`:

```env
VITE_API_URL=http://localhost:8081
VITE_WS_URL=http://localhost:8081
```

## Cara Menjalankan Aplikasi

### 1. Jalankan backend

```bash
cd backend
npm install
npm run dev
```

Backend akan berjalan di:

```text
http://localhost:8081
```

### 2. Jalankan frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend umumnya berjalan di:

```text
http://localhost:5173
```

## Akun Default

Saat backend pertama kali terhubung ke database, sistem akan membuat akun admin default jika belum ada:

- Username: `admin`
- Password: `admin123`

## Dokumentasi Sistem dan Penggunaan

Dokumentasi ini disusun untuk membantu pengguna maupun pengembang memahami struktur sistem, cara konfigurasi, serta langkah pengoperasian aplikasi dashboard monitoring hama.

### 1. Login ke sistem

Langkah penggunaan:

1. Buka halaman login frontend.
2. Masukkan username dan password.
3. Tekan tombol masuk.
4. Jika data benar, pengguna akan diarahkan ke dashboard utama.

### 2. Melihat dashboard monitoring

Pada halaman dashboard, pengguna dapat:

- melihat ringkasan data monitoring
- memantau data deteksi terbaru
- membuka halaman lain melalui sidebar navigasi

### 3. Melihat data deteksi hari ini

Halaman `DeteksiHariIni` digunakan untuk:

- melihat daftar deteksi yang terjadi pada hari berjalan
- memantau data terbaru dari sistem

### 4. Melihat grafik deteksi

Halaman `ChartHama` dan `RiwayatGrafik` digunakan untuk:

- melihat tren data deteksi
- memahami pola kemunculan hama berdasarkan data historis

### 5. Membaca rekomendasi sistem

Halaman `Rekomendasi` menampilkan hasil analisis dari data deteksi yang tersimpan. Sistem membaca data dari collection detection, lalu menghitung status dan saran tindakan berdasarkan frekuensi kemunculan hama.

### 6. Membaca notifikasi

Sistem menyediakan notifikasi peringatan ketika data deteksi tertentu melewati ambang batas. Notifikasi ini dapat ditampilkan pada dashboard dan juga disimpan ke database agar dapat dibaca kembali.

## Endpoint API Utama

### Auth

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/register`

### Detections

- `GET /api/v1/detections`
- `GET /api/v1/detections/today`
- `POST /api/v1/detections`
- `POST /api/v1/detections/simulate`

### Analysis

- `GET /api/v1/analysis`

### Notifications

- `POST /api/v1/notifications`
- `GET /api/v1/notifications`
- `GET /api/v1/notifications/unread`
- `GET /api/v1/notifications/count`
- `PUT /api/v1/notifications/:id/read`
- `PUT /api/v1/notifications/read-all`
- `DELETE /api/v1/notifications/:id`

## Simulasi Data Menggunakan Postman

Untuk kebutuhan demo, kamu dapat mengirim data simulasi ke endpoint:

```text
POST /api/v1/detections/simulate
```

Contoh body JSON:

```json
{
  "jenis_hama": "Tikus",
  "jumlah": 12,
  "lokasi": "Sawah Tempuran",
  "sumber_alat": "Postman Simulator"
}
```

Hasilnya:

- data deteksi akan tersimpan ke database
- halaman dashboard dan deteksi hari ini dapat membaca data baru
- rekomendasi akan berubah mengikuti data deteksi yang masuk

## Seed Data

Seed data (data dummy) tidak disertakan. Untuk demo/testing, silakan inject data manual via Postman atau lewat alur normal aplikasi.

Akun admin default dibuat otomatis saat backend pertama kali terhubung ke database (jika belum ada).

## Persiapan Demo ke Dosen

Sebelum demo, disarankan melakukan pengecekan berikut:

1. Pastikan MongoDB aktif dan backend berhasil terkoneksi.
2. Jalankan backend dan frontend tanpa error.
3. Login menggunakan akun admin default.
4. Pastikan halaman dashboard, deteksi hari ini, chart, dan rekomendasi dapat dibuka.
5. Uji endpoint simulasi Postman dengan data seperti `jumlah: 12` untuk `Tikus`.
6. Pastikan data hasil simulasi muncul di dashboard dan memengaruhi rekomendasi / notifikasi.

## Publikasi ke GitHub

Langkah yang disarankan:

```bash
git status
git add .
git commit -m "docs: add project README and update dashboard structure"
git push origin main
```

Sebelum push:

- pastikan file `.env` tidak ikut ter-commit
- cek kembali apakah data sensitif tidak ada di repository
- review isi `README.md`

## Pengembangan Lanjutan

Beberapa pengembangan yang dapat dilakukan ke depan:

- deployment frontend dan backend ke hosting publik
- penggunaan domain agar akses lebih mudah saat demo / presentasi
- integrasi perangkat IoT secara penuh
- optimalisasi rule engine agar `rule.model.js` dan `recommendation.model.js` dipakai lebih aktif
- penambahan dokumentasi API dan screenshot antarmuka

## Lisensi

Project ini disusun untuk kebutuhan pengembangan sistem dashboard monitoring dan rekomendasi hama serta dokumentasi akademik / skripsi.
