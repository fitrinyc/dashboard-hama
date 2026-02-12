import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./db/mongoose.js";
import config from "./config/index.js";
import { setupMqtt } from "./mqttHandler.js";
import authRoutes from "./src/routes/auth.routes.js";
import detectionsRoutes from "./src/routes/detections.routes.js";
import analysisRoutes from "./src/routes/analysis.routes.js";

const app = express();

// 1. CORS Configuration
const allowedOrigins = [
    "https://dashboard-hama.vercel.app",
    "https://dahsboard-hama.vercel.app",
    "http://localhost:5173"
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);

        const isAllowed = allowedOrigins.includes(origin) ||
            origin.endsWith(".vercel.app") ||
            origin.includes("localhost");

        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With"]
}));

// 2. Preflight OPTIONS
app.options("*", cors());

// 3. Request Logger
app.use((req, res, next) => {
    console.log(`>>> [${req.method}] ${req.url} | Origin: ${req.headers.origin}`);
    next();
});

// 4. Body Parser
app.use(express.json());

// 5. Health Check
app.get("/", (req, res) => {
    res.json({ status: "Backend SiTani Smart is Running! 🚀", timestamp: new Date() });
});


/* =========================
   HTTP + SOCKET SERVER
========================= */
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
                callback(null, true);
            } else {
                callback(null, true);
            }
        },
        methods: ["GET", "POST"],
        credentials: true
    },
    transports: ["polling", "websocket"]
});

/* =========================
   DATABASE & MQTT
========================= */
connectDB();
setupMqtt(io);

/* =========================
   ROUTES
========================= */
app.use(`/api${config.apiPrefix}/auth`, authRoutes);
app.use(`/api${config.apiPrefix}/detections`, detectionsRoutes);
app.use(`/api${config.apiPrefix}/analysis`, analysisRoutes);

/* =========================
   ERROR HANDLERS
========================= */
process.on('uncaughtException', (err) => {
    console.error('❌ UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ UNHANDLED REJECTION at:', promise, 'reason:', reason);
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`\n\n*****************************************`);
    console.log(`🚀 SITANI-SMART-V6 IS LIVE!`);
    console.log(`📡 PORT: ${PORT} | HOST: 0.0.0.0`);
    console.log(`*****************************************\n`);
});
