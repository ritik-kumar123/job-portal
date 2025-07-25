import { User } from "../models/user.model.js";

// ✅ Get logged-in user
export const getLoggedInUser = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching logged-in user:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, email, phone, location, education, experience, skills, about } = req.body;

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
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Get all students
export const getAllStudents = async (req, res) => 
  {
  try 
  {
    const students = await User.find({ role: "student" }).select("-password");
    return res.json({ success: true, students });
  } catch (error) {
    console.error("Error fetching students:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
