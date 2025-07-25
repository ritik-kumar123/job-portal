import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const { id } = req.user;
    const {
      title,
      company,
      description,
      location,
      salary,
      type,
      requirements,
      benefits,
      jobLevel,
      education,
      experience,
    } = req.body;

    if (
      !title ||
      !company ||
      !description ||
      !location ||
      !salary ||
      !type ||
      !requirements ||
      !benefits ||
      !jobLevel ||
      !education ||
      !experience
    ) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const job = await Job.create({
      title,
      company,
      description,
      location,
      salary,
      type,
      requirements,
      benefits,
      jobLevel,
      education,
      experience,
      createdBy: id,
    });

    return res.json({
      success: true,
      message: "Job posted successfully",
      job,
    });
  } catch (error) {
    console.error("Error posting job:", error);
    return res
      .json({ success: false, message: "Internal server error" });
  }
};

export const getEmployerJobs = async (req, res) => {
  try {
    const { id } = req.user;
    const jobs = await Job.find({ createdBy: id })
      .populate("company")
      .sort({ createdAt: -1 });

    return res.json({ success: true, jobs });
  } catch (error) {
    console.error("Error fetching employer jobs:", error);
    return res
      .json({ success: false, message: "Internal server error" });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("company")
      .sort({ createdAt: -1 });

    return res.json({ success: true, jobs });
  } catch (error) {
    console.error("Error fetching all jobs:", error);
    return res
      .json({ success: false, message: "Internal server error" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.user;
    const { id: jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    if (job.createdBy.toString() !== id) {
      return res
        .json({ success: false, message: "Unauthorized action" });
    }

    await job.deleteOne();
    return res.json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    return res
      .json({ success: false, message: "Internal server error" });
  }
};
