import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import config from "../config/index.js";
import User from "../models/user.model.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.dbUrl);
    console.log("MongoDB connected");

    const adminExists = await User.findOne({ username: "admin" });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        username: "admin",
        email: "admin@sitani.com",
        password: hashedPassword,
        role: "admin",
      });
      console.log("Default admin created: admin / admin123");
    }
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default connectDB;
