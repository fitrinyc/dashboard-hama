import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./db/mongoose.js";
import config from "./config/index.js";
import { setupMqtt } from "./mqttHandler.js";

const app = express();

app.use((req, res, next) => {
    const origin = req.headers.origin;
    // Sangat Agresif: Izinkan semua domain .vercel.app, localhost, atau domain Railway sendiri
    if (origin && (origin.endsWith(".vercel.app") || origin.includes("localhost") || origin.includes("railway.app"))) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    } else {
        // Fallback jika tidak ada origin (misal request server-to-server)
        res.setHeader("Access-Control-Allow-Origin", "*");
    }

    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");

    // Tangani OPTIONS (Pre-flight) secara instan dengan status 200
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});

// Hapus parser tambahan yang mungkin mengganggu jika ditaruh di atas
app.use(express.json());

/* =========================
   HTTP + SOCKET SERVER
========================= */
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        credentials: true
    },
    transports: ["polling", "websocket"] // Match frontend
});

/* =========================
   DATABASE & MQTT
========================= */
connectDB();
setupMqtt(io);

/* =========================
   ROUTES
========================= */
import authRoutes from "./src/routes/auth.routes.js";
import detectionsRoutes from "./src/routes/detections.routes.js";
import analysisRoutes from "./src/routes/analysis.routes.js";

app.use(`/api${config.apiPrefix}/auth`, authRoutes);
app.use(`/api${config.apiPrefix}/detections`, detectionsRoutes);
app.use(`/api${config.apiPrefix}/analysis`, analysisRoutes);

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
