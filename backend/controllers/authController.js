import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Register a user
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const image = req.file?.filename || null;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      image,
    });

    return res.json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};

// Login user or admin
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Admin login
 if (
   email === process.env.ADMIN_EMAIL &&
   password === process.env.ADMIN_PASSWORD
 ) {
   const token = jwt.sign(
     {
       email: process.env.ADMIN_EMAIL,
       role: "admin", // ✅ ADD THIS!
     },
     process.env.JWT_SECRET_KEY,
     { expiresIn: "1d" }
   );

   res.cookie("token", token, {
     httpOnly: true,
     sameSite: "Lax",
     secure: false,
     maxAge: 24 * 60 * 60 * 1000,
   });

   return res.json({
     success: true,
     message: "Admin logged in successfully",
     user: { email: process.env.ADMIN_EMAIL, role: "admin" },
   });
 }

    // User login
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false, // true in production
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      user,
      message: "User logged in successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};

// Logout user
export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: false,
  });

  return res.json({ success: true, message: "Logout successfully" });
};
