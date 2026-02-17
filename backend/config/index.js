import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 8081,
  apiPrefix: "/v1",
  dbUrl: process.env.MONGO_URL || process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET || "smart_farm_secret_key",
};
