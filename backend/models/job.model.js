import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  type:
  {
    type:String,
    required: true,
  },
  requirements: {
    type: [String],
    default: [],
  },
  benefits: {
    type: [String],
    default: [],
  },
  jobLevel: {
     type: String,
    required: true
  },
  education: {
    type:String,
  },
  experience:
  {
    type:String,
  },
  createdBy:
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
},
{
    timestamps:true,
}
);

export const Job = mongoose.model("Job",jobSchema);
