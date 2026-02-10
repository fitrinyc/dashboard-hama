import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";

// Responsibilities: implement authentication logic
export const authenticate = async (username, password) => {
  // 🔍 LOG 1: input dari frontend
  console.log("LOGIN TRY:", username, password);

  // 🔍 LOG 2: hasil query user
  const user = await User.findOne({ username });
  console.log("USER FOUND:", user);

  if (!user) {
    throw new Error("Username tidak terdaftar di sistem");
  }

  // 🔍 LOG 3: hasil compare password
  const isMatch = await bcrypt.compare(password, user.password);
  console.log("PASSWORD MATCH:", isMatch);

  if (!isMatch) {
    throw new Error("Password tidak valid");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    config.jwtSecret,
    { expiresIn: "1d" }
  );

  return { user, token };
};

export const registerUser = async (userData) => {
  const { username, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  return user;
};
