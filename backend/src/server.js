import { createServer } from "http";

import { Server } from "socket.io";

import app from "./app.js";
import config from "./config/index.js";
import { connectDB } from "./database/mongoose.js";
import { setupMqtt } from "./integrations/mqtt/mqttHandler.js";

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: true, methods: ["GET", "POST"], credentials: true },
  transports: ["polling", "websocket"],
});

const PORT = config.port;

httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`SERVER LIVE ON PORT: ${PORT}`);
  console.log(
    `DB URL being used: ${config.dbUrl.split("@")[1] ? `***@${config.dbUrl.split("@")[1]}` : config.dbUrl}`,
  );
  console.log("Connecting to services...");
  connectDB().catch((error) => console.error("DB Connect Fail:", error.message));
  setupMqtt(io);
});

process.on("uncaughtException", (error) => {
  console.error("CRITICAL ERROR (Uncaught):", error);
});

process.on("unhandledRejection", (reason) => {
  console.error("CRITICAL ERROR (Unhandled):", reason);
});
