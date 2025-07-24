import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "employer", "admin"],
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    bio:{
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    resume: {
      type: String,
      default: "",
    },
    education:
    {
      type: String,
      default: "",
    },
    experience:
    {
       type: String,
      default: "",
    },
    skills:
    {
       type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
