import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./db/mongoose.js";
import config from "./config/index.js";
import { setupMqtt } from "./mqttHandler.js";
import authRoutes from "./src/routes/auth.routes.js";
import detectionsRoutes from "./src/routes/detections.routes.js";
import analysisRoutes from "./src/routes/analysis.routes.js";
import User from "./src/models/user.model.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());

// Configure CORS
const allowedOrigins = [
    "https://dahsboard-hama.vercel.app",
    "https://dashboard-hama.vercel.app",
    "https://dashbaord-hama.vercel.app",
    "https://sitani-smart.vercel.app",
    "http://localhost:5173",
    "http://127.0.0.1:5173"
];

app.use(cors({
    origin: (origin, callback) => {
        // Dynamically allow the origin of the request
        // This is useful for debugging and ensures credentials always work
        callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With", "token"]
}));

// 2. Health Check
app.get("/", (req, res) => {
    res.json({
        status: "Backend SiTani Smart is Running! 🚀",
        db: mongoose.connection.readyState === 1 ? "Connected ✅" : "Connecting/Error ⚠️",
        timestamp: new Date()
    });
});

// 3. API Routes
app.use(`/api${config.apiPrefix}/auth`, authRoutes);
app.use(`/api${config.apiPrefix}/detections`, detectionsRoutes);
app.use(`/api${config.apiPrefix}/analysis`, analysisRoutes);

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: { origin: true, methods: ["GET", "POST"], credentials: true },
    transports: ["polling", "websocket"]
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 SERVER LIVE ON PORT: ${PORT}`);

    // START SERVICES AFTER SERVER IS LIVE
    console.log("📡 Connecting to services...");
    connectDB().catch(err => console.error("❌ DB Connect Fail:", err.message));
    setupMqtt(io);
});

process.on('uncaughtException', (err) => {
    console.error('❌ CRITICAL ERROR (Uncaught):', err);
});

process.on('unhandledRejection', (reason) => {
    console.error('❌ CRITICAL ERROR (Unhandled):', reason);
});
