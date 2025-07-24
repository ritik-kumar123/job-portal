import { User } from "../models/user.model.js";

// Get logged-in user
export const getLoggedInUser = async (req, res) => {
  try {
    const { id } = req.user;  
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};

// Update profile
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, email, phone, location,education, experience, skills, about } = req.body;
    const updates = {
      name,
      email,
      phone,
      location,
      education,
      experience,
      skills,
      bio: about,
    };

    if (req.files?.profileImage?.[0]) {
      updates.image = req.files.profileImage[0].filename;
    }
    if (req.files?.resume?.[0]) {
      updates.resume = req.files.resume[0].filename;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res.json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("-password");
    return res.json({ success: true, students });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};

//Get all Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: { $in: ["student", "employer"] },
    }).select("-password");

    return res.json({ success: true, users });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

